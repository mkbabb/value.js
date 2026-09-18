# CHALLENGE-C — `demo/shell/dock/layers/SlugEditLayer.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant), the
tier declared at spawn. Not inherited, not undeclared.

---

## Verdict

**DEFECTIVE.** 119 lines; 14 findings, two of them BLOCKER. The component is a login form whose
**error surface is dead code**, whose **network call is fire-and-forget** (so its spinner, its
disabled-guard and its whole `try/catch` are decorative), and whose **input classifier treats every
malformed slug as an admin token** — which routes a one-character typo into
`clearUserSlug()` + `adminLogin(<garbage>)`, i.e. it **destroys the user's session and their only
handle on their own account**. It has **zero tests** (`grep` → 0 references in `test/` and `e2e/`),
and it contributes **240 of the 398 (60.3%)** sub-24px tap-target defects in the mega-tranche's
60-capture Safari matrix.

Strongest defect: **C-1** — a typo in the slug field logs you out permanently.

---

## Evidence index

| # | Kind | Where |
|---|---|---|
| E-1 | Source read | `demo/shell/dock/layers/SlugEditLayer.vue` (whole file, 119 lines) |
| E-2 | Source read | `demo/palettes/useSlugMigration.ts`, `demo/palettes/usePalettePorts.ts`, `demo/platform/auth/useUserAuth.ts`, `demo/platform/auth/useAdminAuth.ts`, `demo/shell/dock/Dock.vue`, `demo/shell/dock/menus/ProfileSection.vue`, `api/src/modules/session/slugWords.ts` |
| E-3 | Live probe | `http://localhost:9000` — WebKit via Playwright MCP, 8 instrumented probes (geometry, focus timeline, submit behaviour, MutationObserver spinner watch, canvas text metrology) |
| E-4 | Corpus | `docs/tranches/V/megatranche/audit/visual/REPORT.json` — 60 captures, tap-target rows |
| E-5 | Screenshot | `evidence-slug-layer-open-1024.png` (this directory) — the dock **with the slug layer open**, a state no capture in the corpus contains |
| E-6 | Pure-function harness | classifier table, 17 inputs, transcribed verbatim from `SlugEditLayer.vue:25-37,45-46` |
| E-7 | Prior record | `docs/tranches/N/audit/lanes2/D5.md:50`, `docs/tranches/N/waves/N.W17.md:371`, `docs/tranches/S/audit/lanes/legacy-sweep-demo-components.md:239-245`, `docs/tranches/A/audit/HARDEN-5-coverage-gaps.md:41-48` |

---

## C-1 · BLOCKER — "anything I don't recognise is an admin token": a typo destroys the session

**Defect.** The classifier is an inverted default:

```
SlugEditLayer.vue:45-46
    const normalized = normalizeTokenInput(raw).toLowerCase();
    const isAdmin = !looksLikeSlug(normalized);
SlugEditLayer.vue:54
    pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
```

`looksLikeSlug` is `/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/` (line 26). **Every** string that is not exactly
four lowercase alpha words is declared an admin token. The port's admin branch is destructive:

```
useSlugMigration.ts:51-57
    async function onSlugSwitch(value: string, isAdmin: boolean) {
        if (isAdmin) {
            deps.clearUserSlug();          // → useUserAuth.clearSlug → clearAuth()
            deps.adminLogin(value);        // → useAdminAuth.login(token)
            setActiveTab("saved");
            return;
        }
```

`clearAuth()` (`useUserAuth.ts:43-47`) nulls the slug ref, `safeRemoveItem(localStorage,
"palette-user-slug")` and `clearPersistedToken()`. The four-word slug is the **only** handle a user
has on their account (there is no password); the session token is the only other credential and it
is wiped in the same call. `adminLogin` (`useAdminAuth.ts:35-38`) then persists the garbage into
`palette-admin-token`, and `isAuthenticated = computed(() => !!adminToken.value)`
(`useAdminAuth.ts:33`) — **any non-empty string flips the UI into admin mode**, which
`useDockAdminMode({ isAdminAuthenticated: pm.isAdminAuthenticated })` (`Dock.vue:44`) consumes to
publish the admin view entries.

**Reproduction (classification half EXECUTED; destructive half traced, deliberately not run
against the owner's live dev session).** Harness = verbatim transcription of lines 25-37 + 45-46:

```
$ node scratchpad/classify.mjs
raw                            | normalized(lower)          | isAdmin -> port arg
"azure-flowing-jade-otter"     | "azure-flowing-jade-otter" | false -> "azure-flowing-jade-otter"
"Azure-Flowing-Jade-Otter"     | "azure-flowing-jade-otter" | false -> "azure-flowing-jade-otter"
" azure-flowing-jade-otter "   | "azure-flowing-jade-otter" | false -> "azure-flowing-jade-otter"
"azure-flowing-jade"           | "azure-flowing-jade"       | true  -> "azure-flowing-jade"
"azure-mist"                   | "azure-mist"               | true  -> "azure-mist"
"azure-flowing-jade-otter-x"   | "azure-flowing-jade-otter-x" | true -> "azure-flowing-jade-otter-x"
"azure--flowing-jade-otter"    | "azure--flowing-jade-otter" | true  -> "azure--flowing-jade-otter"
"azure flowing jade otter"     | "azure flowing jade otter" | true  -> "azure flowing jade otter"
"\""                           | ""                         | true  -> ""
"''"                           | ""                         | true  -> ""
"ADMIN_TOKEN="                 | "admin_token="             | true  -> "ADMIN_TOKEN="
"ADMIN_TOKEN=sekret"           | "sekret"                   | true  -> "sekret"
"0"                            | "0"                        | true  -> "0"
"azure-flowing-jade-óter"      | "azure-flowing-jade-óter"  | true  -> "azure-flowing-jade-óter"
```

Server slugs are always exactly four lowercase words (`api/src/modules/session/slugWords.ts:83-89`,
`${adj}-${verb}-${color}-${animal}`), so the *happy* path is right — and that is precisely why the
failure mode is invisible in testing. Every realistic user error lands in the destructive branch:
one word dropped, one word too many, a stray double hyphen, spaces instead of hyphens, a stray
punctuation character. Note the boundary case: a lone `"` normalises to `""` (line 33-35 slices a
1-char string to empty) → `clearUserSlug()` then `adminLogin("")` — **one double-quote character
logs the user out**.

There is no confirmation, no error (see C-3), and no undo. Combined with C-6 (the placeholder that
advertises "or token" is clipped off the screen), the user has no way to know this field is
overloaded with a destructive second meaning.

**Mechanism.** Overloaded single field + inverted default. A classifier whose *unknown* bucket is
the *destructive* action.

**Cure (gestalt, not patch).** The admin token is not a user-facing concept on this surface — it is
a developer/operator credential that already has a persistence key of its own. Delete the overload:
this control accepts a **slug only**, validates against the one grammar the server actually mints
(4 lowercase words), and refuses anything else *in place* with a rendered message. If an admin
paste-box must exist, it belongs behind the admin route (`/#/admin/*`) with its own labelled field,
not multiplexed onto the login input. Should the overload be kept against that advice, the default
must invert: `isAdmin` becomes a positive test on the token grammar (e.g. the `ADMIN_TOKEN=` prefix
or a length/charset rule), never `!looksLikeSlug`.

---

## C-2 · BLOCKER — the port call is never awaited: `try/catch/finally`, the spinner and the disabled-guard are all decorative

**Defect.** `onSlugSwitch` is `async` (`useSlugMigration.ts:51`). `SlugEditLayer.vue:54` calls it
**without `await`**, inside a `try/catch/finally`:

```
SlugEditLayer.vue:42-65
    slugSwitching.value = true;
    try {
        ...
        pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);   // ← no await
        slugInput.value = "";
        slugEditMode.value = false;
    } catch (e: any) { ... }
    finally { slugSwitching.value = false; }
```

Three consequences, all measured:

1. **`catch` is unreachable for anything the port does.** A rejection from the async port becomes an
   unhandled promise rejection, not a caught error. The entire 409/404/429 ladder (lines 57-62) can
   never execute.
2. **`slugSwitching` is true for zero rendered frames** — the body contains no `await`, so `finally`
   runs in the same tick. `<Loader2 v-if="slugSwitching">` (line 97) and
   `:disabled="... || slugSwitching"` (line 95) are dead.
3. **The layer closes and clears itself before any outcome exists** (lines 55-56).

**Reproduction (EXECUTED, live, WebKit).** MutationObserver on the `<form>` watching for
`.animate-spin`, then a real `requestSubmit()`:

```
{ "t50":   { "spinnerSeen": 0, "spinnerInDom": false, "inputValue": "", "faceActive": false },
  "after": { "spinnerSeen": 0, "spinnerInDom": false, "inputValue": "", "faceActive": false },
  "dialogOpen": true,
  "net": [] }
```

At t+50 ms the layer has already closed (`faceActive:false`) and the input is already cleared —
while **zero network requests** had been issued and the port had merely opened the migrate modal
("What about your palettes? — You have 2 local palettes…", captured verbatim from `[role=dialog]`).
The spinner never appeared in 1.5 s of observation.

**Mechanism.** Fire-and-forget across an async boundary; local UI state machine advanced on *call*
rather than on *outcome*.

**Cure.** `await pm.onSlugSwitch(...)`, and close/clear **only** on success. The port must also stop
lying about its own contract: `onSlugSwitch` resolves as soon as it *opens a dialog*, so even an
awaited call does not mean "logged in" — it should return a discriminated result
(`{ kind: "done" } | { kind: "awaiting-migration" } | { kind: "error", problem }`) and this
component should render each state. Until it does, "await + close on resolve" is still a strict
improvement over closing on invocation.

---

## C-3 · MAJOR — `slugError` is written six times and rendered zero times

**Defect.** Dead state. The whole authored error vocabulary is unreachable by the eye:

```
$ grep -n "slugError" demo/shell/dock/layers/SlugEditLayer.vue
13:const slugError = ref("");
18:    slugError.value = "";
43:    slugError.value = "";
49:            slugError.value = "Already signed in.";
59:        if (msg.includes("409")) slugError.value = "Already signed in.";
60:        else if (msg.includes("404")) slugError.value = "Slug not found.";
61:        else if (msg.includes("429")) slugError.value = "Too many attempts.";
62:        else slugError.value = msg || "Login failed";

$ awk 'NR>=75' demo/shell/dock/layers/SlugEditLayer.vue | grep -c "slugError"
0
```

The worst instance is **synchronous and reachable**: line 48-52, submitting your own slug sets
`slugError = "Already signed in."` and returns. The user presses the primary button and **nothing
whatsoever happens** — no message, no close, no spinner, no network. A silent dead-end on the
component's only submit affordance.

The sibling error path is equally dead by a second mechanism: `useSlugMigration.ts:84-87` routes its
messages into `slugBarRef.value?.setError(...)`, and `slugBarRef` is **never bound to any template
ref** —

```
$ grep -rn "slugBarRef" demo/
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/useSlugMigration.ts:84..87  (the four setError calls)
demo/palettes/useSlugMigration.ts:121:        slugBarRef,
```

`PaletteSlugBar` is exported but mounted nowhere (`grep -rn "PaletteSlugBar" demo/` → declaration,
two barrel re-exports, nothing else; `e2e/smoke/flows/login-register.spec.ts:6-8` says so in prose).
So **both** halves of the login error surface are `?.`-swallowed no-ops.

**This overturns a prior audit's ruling.**
`docs/tranches/S/audit/lanes/legacy-sweep-demo-components.md:239-245` reads:

> `ColorInput.vue:234-238`, `PaletteSlugBar.vue:216-` area, `SlugEditLayer.vue:57-65` — all three
> catch blocks route the error into a user-visible field (`slugError.value = ...`) … the
> `SlugEditLayer` catch even discriminates HTTP status codes into distinct user messages
> (409/404/429). **BEFITTING-KEEP.**

The field is not user-visible. That verdict was reached by reading the assignment and not the
template.

**Cure.** The layer must own a rendered, `role="status"`/`aria-live="polite"` error slot (glass-ui
already ships the register — `FeedbackMark`/`Input` invalid states) and the port must return its
problem to the caller instead of pushing into a ref bound to a component that does not exist.

---

## C-4 · MAJOR — the retired `e.message.includes("409")` idiom survives here verbatim

**Defect.** Lines 57-62 branch on substrings of `e.message`. The repo has already ruled that idiom
broken and cured it **in the sibling file**, leaving the comment as the ruling of record:

```
useSlugMigration.ts:77-88
        } catch (e) {
            // S.W2 W2-6: branch on the typed `ApiProblem.status`, not `.message`
            // substrings — the server titles ("Already logged in as this user",
            // "User not found", "Rate limit exceeded") never contain "409"/"404"/
            // "429", so those branches matched nothing and the authored copy below
            // never showed.
            const status = e instanceof ApiProblem ? e.status : undefined;
```

`SlugEditLayer.vue` still carries the pre-cure code — dead branches by two independent mechanisms
(unreachable per C-2, and non-matching per W2-6). Edict 2 (no legacy code) violation: this is a
migration remnant that survived its own migration. Also note `catch (e: any)` — an `any` on line 57
in a `strict: true` repo.

**Cure.** Delete lines 57-62. Errors arrive as `ApiProblem` from the port (C-2's cure) and are
rendered by status.

---

## C-5 · MAJOR — three 22×22 controls and a 20-22px input: 240 of the app's 398 tap-target defects

**Defect + measurement (EXECUTED, live, layer ACTIVE — the corpus only ever measured it inert).**

At `window.innerWidth = 1024`, slug layer open, dock expanded (309 px):

```
{ "buttons": [ { "label": "Switch to slug",     "w": 22, "h": 22, "pad": "4px", "minW": "0px" },
               { "label": "Generate new slug",  "w": 22, "h": 22, "pad": "4px", "minW": "0px" },
               { "label": "Cancel",             "w": 22, "h": 22, "pad": "4px", "minW": "0px" } ],
  "inputRect": [392, 30, 160, 21.5] }
```

At `window.innerWidth = 390` (iPhone matrix), layer ACTIVE:

```
{ "vw": 390, "faceActive": true, "dock": { "x": 41, "w": 309, "right": 350 },
  "buttons": [ {"label":"Switch to slug","w":22,"h":22}, {"label":"Generate new slug","w":22,"h":22},
               {"label":"Cancel","w":22,"h":22} ], "inputW": 160, "pageOverflowX": 0 }
```

22 px = the icons' own `w-3.5 h-3.5` (14 px, lines 97-98/109/117) + the producer's 4 px compact
padding, with `min-width: 0`. WCAG 2.5.8 Target Size (Minimum) floor is 24×24. Sibling dock controls
in the same band measure 40×40 and 32×32 (snapshot boxes, `Dock.vue` main layer) — this layer is the
outlier.

**Share of the fleet defect (computed over `REPORT.json`, all 60 captures):**

```
$ python3 … REPORT.json
total small tap targets across 60 captures: 398
slug-layer attributable: 240 → 60.3 %
30 ('input','',160,23)   30 ('button','Switch to slug',22,22)
30 ('button','Generate new slug',22,22)   30 ('button','Cancel',22,22)
30 ('input','',160,20)   30 ('button','Switch to slug',23,23)
30 ('button','Generate new slug',23,23)   30 ('button','Cancel',23,23)
```

Four rows × 60 captures — this one 119-line component is **the single largest a11y-geometry
contributor in the application**, and it is charged on **every route** because the layer is always
mounted (`Dock.vue:148-150`, no `v-if`).

**Prior record — the work order exists and was never discharged.**
`docs/tranches/N/audit/lanes2/D5.md:50`:
> | Slug-edit layer buttons | **22×22** ("Generate new slug", "Cancel" — live sizes when that layer
> is active) | `layers/SlugEditLayer.vue` |

`docs/tranches/N/waves/N.W17.md:371`:
> hit-target floor on the 22/24px bespoke sites (the slug-edit + trigger ⋮ controls under the WCAG
> 2.5.8 24px floor — D5 WO-D5-2)

**Cure.** Per edicts 4 + 5 the floor is a **producer** concern: `.dock-icon-button--compact` in
glass-ui gets `min-block-size/min-inline-size: 24px` (or the `--dock-compact-control-padding` token
is raised to clear it) so every consumer of `compact` inherits the floor. Not a per-instance
`class="w-6 h-6"` here. Relay to the glass-ui BH inbox per the standing fond.

---

## C-6 · MAJOR — nameless input whose only fallback name is clipped 29% off the screen

**Defect.** Measured live: `hasAriaLabel: false`, `input.labels.length: 0`, no `aria-labelledby`.
The accessible name therefore falls back to `placeholder` — a documented anti-pattern (the name
disappears the moment the user types; WCAG 3.3.2 wants a persistent visible label) — and **that
placeholder does not fit the box**:

```
{ "font": "16.58px \"Fira Code\", …, monospace",
  "placeholder": "enter slug or token...",
  "placeholderWidthPx": 224.5,
  "inputContentWidthPx": 160,
  "overflowPx": 64.5,
  "visiblePrefix": "enter slug or t",
  "textOverflow": "clip", "overflow": "clip" }
```

`w-40` (line 85) is a hard 160 px; the string needs **224.5 px**. **64.5 px (29%) is cut mid-word,
with no ellipsis.** The screenshot confirms it — see `evidence-slug-layer-open-1024.png`, where the
field reads **"enter slug or tc"** before the → button.

This is the coupling that makes C-1 lethal: the only place the app ever admits that this field also
accepts an **admin token** is the tail of a placeholder that is never rendered.

The same 160 px box also cannot show a real slug: the mono advance measures 224.5/22 = **10.2 px per
character**, so `azure-flowing-jade-otter` (24 chars) needs **≈245 px** — the user cannot see the
whole of what they are typing, and cannot proof-read the value that, if mistyped, destroys their
account (C-1).

**Cure.** A real label (glass-ui `Input` with its label register — edict 4; this is one of the six
hand-rolled `<input>` sites the S-tranche already booked, `glassui-consume-map.md:165,208`), a
`min-w-0 flex-1` field instead of the fixed `w-40`, and a placeholder short enough for the narrowest
aperture. If the token affordance survives C-1's cure at all, it must be *labelled*, not smuggled
into a truncated hint.

---

## C-7 · MAJOR — the open-focus is a race with reka-ui's menu close; it misses about half the time

**Defect.** `onStartSlugEdit` writes the `defineModel` and focuses one `nextTick` later:

```
SlugEditLayer.vue:16-23
    slugEditMode.value = true;                      // ← defineModel round-trip to the parent
    nextTick(() => { slugInputRef.value?.focus(); });
```

The entry point is a **reka-ui DropdownMenu item** (`ProfileSection.vue:77` / `MobileMenuDropdown`,
→ `Dock.vue:61 onStartSlugEdit`). The menu's dismiss performs its own focus restoration
asynchronously *after* the item's click handler; when that restore lands after our `nextTick`, it
takes focus away and — because the main layer has just been made `inert` by the layer swap, so the
restore target is unfocusable — leaves it on `BODY`.

**Reproduction (EXECUTED, live, 4 cold-load trials, `activeElement` sampled against the slug input):**

```
trial A (fresh load): 30ms:INPUT(slug) 60:INPUT 100:INPUT … 800:INPUT      ← focus lands
trial B (fresh load): 50ms:DIV(dropdown-menu-content) 150:BODY 300:BODY 600:BODY   ← focus LOST
trial C (fresh load): 50ms:DIV 150:BODY 300:BODY 600:BODY                   ← focus LOST
   … same page, 2nd open: 50ms:INPUT 150:INPUT 300:INPUT 600:INPUT
   … same page, 3rd open: 50ms:INPUT 150:INPUT 300:INPUT 600:INPUT
```

and, from the focusin log of a losing trial, the input receives **no** `focusin` at all within
400 ms while the layer is fully active and non-inert:

```
"focusLog": ["DIV:dropdown-menu-content…","DIV:dropdown-menu-content…","DIV:dropdown-menu-content…"]
"samples": [ {"t+0","inertAncestor":null,"faceActive":true,"ae":"DIV:dropdown-menu-content"},
             {"t+200","inertAncestor":null,"faceActive":true,"ae":"BODY:relative"},
             {"t+400","inertAncestor":null,"faceActive":true,"ae":"BODY:relative"} ]
"manualFocusWorks": true      ← the element IS focusable at t+420; the component's call simply lost
```

The discriminator is visible in the samples: when the menu content is still present at t+50 ms
(`ae: DIV(dropdown-menu-content)`), its later restore wins and focus ends on `BODY`. When the menu
has already gone, the `nextTick` focus survives.

**User-visible consequence.** Click "Login", start typing — on a miss, the caret is nowhere and the
keystrokes are dropped on the document. The Escape dismissal (C-8) is dead in the same window,
because the handler is bound to the input that never got focus.

**Also missing: focus restoration on close.** Cancel/Escape/submit leave focus wherever it was; the
Login trigger is not restored. Recorded three tranches ago and never fixed —
`docs/tranches/A/audit/HARDEN-5-coverage-gaps.md:41-48`: *"The only `.focus()` calls in the demo are
five imperative input-focus calls (… `SlugEditLayer.vue:21`). **No focus trap, no focus
restore-on-close.**"*

**Mechanism.** A single-`nextTick` imperative focus racing a foreign library's asynchronous focus
restoration — the `defineModel` parent round-trip plus the layer crossfade means this component
cannot know when its own input became focusable.

**Cure.** Stop guessing at the tick. The layer's *arrival* is the event: focus on the crossfade's
arrival (a producer-owned `autofocus`/`@after-enter` contract on `DockLayer` — the right home per
edict 4), or, locally, `watch(slugEditMode, …, { flush: "post" })` + a focus attempt that retries
until `document.activeElement === el` or a short deadline elapses, plus an explicit restore of
`document.activeElement` on close. Relay the `DockLayer` autofocus contract to glass-ui.

---

## C-8 · MINOR — Escape closes the layer only when the input happens to hold focus

`@keydown.escape.stop="slugEditMode = false"` (line 86) is bound to the `<input>` alone. The layer
has four focusable controls.

**Reproduction (EXECUTED):** focus the "Generate new slug" control, dispatch Escape →

```
"escapeFromButton": { "btnFocused": true, "layerStillActive": true }
```

The dismissal contract depends on which control has focus — and, per C-7, on whether the focus race
was won. `.stop` also silently prevents any ancestor (the dock/dismissable layer) from providing the
fallback.

**Cure.** Bind the key on the layer root (the `<form>`'s wrapper) — or, better, let the producer's
`DockLayer` own dismissal for every layer, one grammar.

---

## C-9 · MINOR — the clipboard result is discarded; "Copy slug" can fail silently

```
SlugEditLayer.vue:68-70
function onCopySlug() {
    if (pm.userSlug.value) void writeClipboard(pm.userSlug.value);
}
```

The library returns a result *for this reason* —
`node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts:35-37`:
`export declare function writeClipboard(text: string): Promise<CopyResult>` with the doc comment
*"for identical call ergonomics: `const { ok } = await writeClipboard(text)`"*. The `void` throws
`ok` away, so a denied/insecure-context clipboard write is invisible.

The asymmetry is inside one menu: `ProfileSection.vue:155-156` renders
`linkCopied ? Check : Share2` + "Copied!" for **Share color**, while `ProfileSection.vue:77-78`
("Copy slug" → this component) renders nothing at all. The repo already owns the right primitive and
uses it in three siblings (`MixResultDisplay.vue:31`, `GradientEasingEditor.vue:94`,
`App.vue:191` — `useClipboard({ resetMs })` with a `status`).

**Cure.** `useClipboard` with a `status`, feeding the same Copied! affordance the neighbouring row
already has.

---

## C-10 · MINOR — `onCopySlug` does not belong to a slug **edit** layer

`Dock.vue:62` reaches through a `defineExpose` into this component to perform a clipboard action
that has nothing to do with editing (`onCopySlug` is invoked from the *profile menu*, while this
layer is not even displayed). It lives here because `pm` was already injected — the cheapest
encapsulation break. The call is `slugEditRef.value?.onCopySlug()`: a silent no-op if the ref is ever
null (e.g. the day someone adds a `v-if` to the layer).

**Cure.** Copy-slug is session-port behaviour: it belongs beside `pm` (a `copySlug()` on the session
port), invoked directly by the menu that offers it. This layer then owns exactly one concern.

---

## C-11 · MINOR — `defineExpose` publishes state no one reads

`defineExpose({ onStartSlugEdit, onCopySlug, slugSwitching })` (line 72). `Dock.vue:61-62` uses only
the two functions; `slugSwitching` is exported API that no caller consumes — and, per C-2, it is a
flag that is never observably true. Dead public surface on a component whose entire published API is
three symbols.

---

## C-12 · MINOR — a pasted admin token survives dismissal in the DOM

`slugInput` is cleared only by `onStartSlugEdit` (line 17) and by a successful submit (line 55).
Escape (line 86) and the Cancel control (line 115) close the layer with the typed value intact, in
the (inert but present) DOM, until the next open. For a field whose documented purpose includes
pasting an **admin token**, "the secret stays in the DOM after you cancel" is the wrong default.

**Cure.** Clear on close, not only on open.

---

## C-13 · INFO — root-barrel import for a symbol the narrow subpath exports

Line 6 imports `writeClipboard` from `"@mkbabb/glass-ui"` (the whole design-system entry) while
line 4 correctly uses the `"@mkbabb/glass-ui/dock"` subpath. The narrow path exists:

```
$ grep -o "export {[^}]*}" node_modules/@mkbabb/glass-ui/dist/dom.js | tr ',' '\n' | grep -i clip
 o as useClipboard
 a as writeClipboard }
```

Fleet-wide idiom (37 root-barrel imports under `demo/`), so the cure belongs at fleet level, not in
this file alone — recorded here for the library seat.

---

## C-14 · MAJOR (vacuous gate) — the component has no tests, and the mutation that keeps the suite green destroys accounts

```
$ grep -rn "SlugEditLayer\|Switch to slug\|Generate new slug\|enter slug or token\|slugEditMode\|onStartSlugEdit" test/ e2e/ | wc -l
0
$ grep -rln "@vue/test-utils\|mount(" test/ demo/test/
(no output)
```

No unit test imports the SFC; no SFC mount test exists anywhere in the repo
(`vitest.config.ts:21` includes only `test/**/*.ts` + `demo/test/**/*.ts`, neither of which mounts
components); no e2e locator selects any of its four controls. The one e2e spec that names the
surface says outright that it tests a *different* one — `e2e/smoke/flows/login-register.spec.ts:6-8`:
*"The SlugBar live-app surface is only inside the PaletteDialog (currently unused …), so the
canonical login-register exercise on the smoke level is the cold-boot auto-registration path"*.

**The exact mutation that keeps every gate green:**

```diff
-function looksLikeSlug(value: string): boolean {
-    return /^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(value);
-}
+function looksLikeSlug(_value: string): boolean {
+    return false;
+}
```

Every login — including a perfectly-typed slug — now runs the admin branch:
`clearUserSlug()` + `adminLogin(<the user's own slug>)`. `npm test` (2222 tests), `vue-tsc`, `eslint`
and the full Playwright smoke suite stay 100 % green, because nothing anywhere references this
component's behaviour. Equivalent green-keeping mutations: delete the `nextTick` focus (C-7), delete
the `catch` block entirely (C-4), delete the whole `<form>`'s `@submit` binding.

The only gate that incidentally touches this file is
`e2e/smoke/oracles/o15-dock-register.spec.ts:141` (`expect(nav.locator("[title]")).toHaveCount(0)`),
which passes over the layer's DOM because it is always mounted — a structural assertion, not a
behavioural one, and it is exactly the assertion whose own comment (line 149) declares the slug
layer out of scope.

**Cure.** The two BLOCKERs are trivially testable at the unit level without any mounting: lift
`looksLikeSlug`/`normalizeTokenInput` into a tiny pure module beside the port (they are the
contract), and table-test them against `generateSlug()`'s grammar plus the malformed corpus above.
Then one e2e leg: open the layer from the profile menu, submit a bad slug, assert a **rendered**
error and that `localStorage["palette-user-slug"]` is unchanged.

---

## Negative proofs — what I checked and found SOUND

| Hazard | Result |
|---|---|
| `type="submit"` reaching the real `<button>` through `DockControl` | **Sound.** `form.querySelector('button[type=submit]')` matched live and returned the disabled state — the attribute forwards; clicking → does submit. |
| Ungated `requestAnimationFrame` (PRM-RAF epidemic) | **N/A.** No rAF, no timers, no observers, no listeners beyond the two template bindings. Nothing to clean up; no leak, no unbounded growth. |
| WebGL / eager boot on the critical path | **N/A.** No canvas, no GL. (The one console error in the corpus, `WebGL: context lost`, is the hero blob on `/#/`.) |
| `ValueUnit` nesting accumulation | **N/A.** No color values pass through this file. |
| oklch→HSV hue drift / `stableHue` | **N/A.** |
| reka-ui slider pointer-capture leak | **N/A.** No slider. |
| `defineModel` stale-read | **No read-after-write** in this file — the model is written at 3 sites and never read back. (The round-trip is nonetheless the substrate of C-7's race.) |
| Vue 3.5 idiom (edict 7) | **Met** on the template-ref axis: `useTemplateRef<HTMLInputElement>("slugInputRef")` (line 14) matching `ref="slugInputRef"` (line 82). |
| `verbatimModuleSyntax` (edict 8) | **Met.** No type-only import is needed; all four imports are value imports. |
| Always-mounted layer leaking into the a11y tree / tab order | **Sound.** While inactive the producer marks the face `inert` + `aria-hidden="true"` (measured: `inertAncestor: true`, `ariaHiddenAncestor: true`, `focusable: false`). The corpus's tap-target rows for this component are geometric only when inactive — but they are real 22×22 targets when the layer is active (C-5). |
| Horizontal overflow / clipping of the layer | **Sound** at both probed widths: `pageOverflowX: 0` at 390 and 1024 with the layer open; the dock grows to 309 px and the Cancel control's right edge (338) stays inside the dock (350) at 390 px. |
| Global keyframes / animation deletion (edict 6) | **N/A.** The file has no `<style>` block and defines no animation. |
| God module (edict 1) | **Not violated by size** — 119 lines. But see C-10: it hosts one function that is not its concern. |

---

## Family grouping (the defect mechanisms, not the symptoms)

1. **Outcome never observed** — C-2 (no `await`), C-3 (error state never rendered), C-9 (clipboard
   result discarded). One family: *this component starts operations and never looks at what
   happened*. Cure once, at the port boundary: results are values, states are rendered.
2. **Unknown input routed to the destructive branch** — C-1, C-6 (the affordance that would warn is
   clipped away), C-4 (the messages that would explain are dead). One family: *the field is
   overloaded and the overload is invisible*.
3. **Timing guessed instead of observed** — C-7 (single `nextTick` vs a foreign async focus
   restore), C-8 (dismissal bound to the element that may not have focus). Cure: bind to the
   arrival event, own dismissal at the layer root.
4. **Geometry authored per-instance under the design system's floor** — C-5. Cure in glass-ui.
5. **No gate at all** — C-14, which is why 1-4 have survived three tranches of audits (and why the
   S-tranche marked C-3 "BEFITTING-KEEP").
