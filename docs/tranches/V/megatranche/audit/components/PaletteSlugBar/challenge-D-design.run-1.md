# CHALLENGE-D — `PaletteSlugBar.vue` · design

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context arm) — the tier this seat was
spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** The premise handed to this seat was "the design is wrong." It is worse than wrong:
**the design is not there.** `demo/palettes/browser/slug/PaletteSlugBar.vue` has **no render path
anywhere in the repository**. Its sole historical host was deleted 17 days ago, in the same commit
that "modernized" this file. It renders on 0 of 12 live routes.

Everything below flows from that one fact, and the worst consequence is not that a dead file
persists — it is **D-2**: the shipped application's *only* login-failure copy is imperatively
pushed into this orphan through a template ref that is never bound. **A wrong slug in the live dock
produces no error, anywhere, ever.** The design defect is the topology: this component privatised
the error surface behind `defineExpose`, so deleting its host silently deleted the app's failure
affordance and nothing — not TypeScript, not a test, not the e2e smoke — noticed.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines).
Base: branch `tranche-u`, HEAD `c654824e`.

---

## 1. Visual truth first

The instruction was to open the Safari captures for this component's routes and look. I did. **The
component is not in any of them, because it is in no route.**

| capture | what the palettes area actually shows |
|---|---|
| `visual/shots/safari-desktop-light/palettes.png` | `My Palettes` panel: heading, sub-line, search, "Start a new palette", empty plate. **No identity row, no slug pill, no account affordance.** The only account control on screen is the dock's `Login` pill (that is `ProfileSection.vue`, not this component). |
| `visual/shots/safari-mobile-dark/palettes.png` | Same panel, single column. **No account affordance visible at all** — it is folded behind the dock's `⋮` (`MobileMenuDropdown.vue`). |

Live confirmation, Playwright against the running dev server at `http://localhost:9000`, walking 12
routes and counting this component's four unique DOM markers:

```js
for (const r of ['/#/','/#/palettes','/#/browse','/#/extract','/#/mix','/#/generate',
                 '/#/gradient','/#/easing','/#/atmosphere','/#/blob','/#/about','/#/admin/users']) {
  location.hash = r.replace('/#',''); await sleep(700);
  out.push({ route: r,
    accountMenu:    document.querySelectorAll('[aria-label="Account menu"]').length,
    signInSlug:     document.querySelectorAll('[aria-label="Sign in with slug"]').length,
    cancelSlugEdit: document.querySelectorAll('[aria-label="Cancel slug edit"]').length,
    slugPill:       document.querySelectorAll('.slug-pill').length });
}
```

Result — **all four counters are `0` on all twelve routes**:

```
/#/            accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/palettes    accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/browse      accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/extract     accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/mix         accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/generate    accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/gradient    accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/easing      accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/atmosphere  accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/blob        accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/about       accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
/#/admin/users accountMenu:0 signInSlug:0 cancelSlugEdit:0 slugPill:0
```

`visual/REPORT.md` therefore cannot contain a row implicating this component: its 60 captures
across 15 routes never rendered it. **Its absence is the finding.** Because it never mounts, every
subsequent finding in this report had to be produced by mounting it under `@vue/test-utils`
(probes archived at `./probes/`, reproduced verbatim below) or by measuring its exact class
recipes injected into the live document.

---

## 2. Defects

### D-1 · BLOCKER — the component has no render path; it is an orphan the sweep polished instead of killing

Repo-wide grep for a template instantiation:

```
$ grep -rn "PaletteSlugBar\|slugBarRef" --include="*.vue" --include="*.ts" . \
      --exclude-dir=node_modules --exclude-dir=dist
demo/palettes/browser/slug/index.ts:3:   export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
demo/palettes/browser/index.ts:44:       export { PaletteSlugBar } from "./slug";
demo/palettes/useSlugMigration.ts:6:     import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/useSlugMigration.ts:84-87: slugBarRef.value?.setError(...)
demo/palettes/useSlugMigration.ts:121:   slugBarRef,
```

Two barrel re-exports and one **`import type`**. Zero `<PaletteSlugBar>` tags. The last commit in
which `<PaletteSlugBar` appeared inside a template is `95993197` — and it appeared there only in
the deletion diff:

```
$ git log --all --oneline -S "<PaletteSlugBar" | head -3
7cae8bd0 docs(V·megatranche): bank the wall-interrupted challenge harvest
95993197 refactor(T.W0 · lane t-legacy-sweep): W0-3 excisions — the dead named set + CC-6 orphan removed, code grep-zero
f6ed8682 fix(demo): streamline auth flow — logout, login button, lazy slug registration
```

The mechanism is the interesting part. `95993197`'s own message says:

> `CC-6 PaletteDialog orphan — the dialog-era shell has ZERO render path … EXCISED: PaletteDialog.vue + components/ (6 SFCs) …`

and, eleven lines later in the **same commit**:

> `§8  PaletteSlugBar iconOnly migration — the TODO's named condition … is MET; the stale TODO excised + both icon buttons migrated off the hand-sized h-6 w-6 onto the shipped <Button iconOnly size="xs"> composition.`

`git show 95993197 --stat` confirms both in one diff:

```
 .../PaletteDialog/PaletteDialog.vue                | 368 ---------------------
 .../PaletteDialog/components/PaletteDialogHeader.vue | 101 -------------------
 .../custom/palette-browser/PaletteSlugBar.vue      |   7 +-
```

**The sweep deleted the parent and refactored the orphaned child in the same breath**, then
declared "code grep-zero". The e2e suite has been carrying the knowledge in a comment ever since:

> `e2e/smoke/flows/login-register.spec.ts:6-8` — *"The SlugBar live-app surface is only inside the
> PaletteDialog (currently unused by the App.vue shell post-D.W3 Lane A restructure)"*

Owner edict **2** (no legacy code — no dead dual paths) and **3** (KISS, no contrivance).

**Cure (gestalt, not patch):** delete `PaletteSlugBar.vue`, `slug/index.ts`, and the
`browser/index.ts:44` re-export. The live account surface already exists and is better in every
respect measured below: `demo/shell/dock/menus/ProfileSection.vue` (desktop),
`demo/shell/dock/menus/MobileMenuDropdown.vue` (narrow), `demo/shell/dock/layers/SlugEditLayer.vue`
(the edit mode). Then discharge D-2, which the deletion exposes rather than fixes.

---

### D-2 · BLOCKER — the app's only login-failure surface lives in the orphan, so login failure is silent in the shipped product

This is the finding that matters. Four links, each verified:

1. `demo/palettes/useSlugMigration.ts:83-87` — every failure branch writes into the orphan:
   ```ts
   const status = e instanceof ApiProblem ? e.status : undefined;
   if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
   else if (status === 404) slugBarRef.value?.setError("Slug not found.");
   else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
   else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
   ```
2. **`slugBarRef` is never bound to any element.** It is created at `useSlugMigration.ts:30`,
   returned at `:121`, packed into `migration` at `usePalettePorts.ts:257` — and the *only*
   consumer of `migration` in the whole demo reads three unrelated keys:
   ```
   $ grep -rn "migration\." demo/ --include="*.vue"
   demo/color-picker/App.vue:153: v-model:open="paletteManager.migration.showMigrateDialog.value"
   demo/color-picker/App.vue:155: :mode="paletteManager.migration.migrateMode.value"
   demo/color-picker/App.vue:156: @respond="paletteManager.migration.onMigrateRespond"
   ```
   `sessionPort` (`usePalettePorts.ts:132-135`) exports only `onRegenerateSlug` / `onSlugSwitch`.
   `slugBarRef.value` is permanently `null`; the `?.` swallows all four messages.
3. The live edit surface never re-implements it. `SlugEditLayer.vue:54` calls
   `pm.onSlugSwitch(...)` **un-awaited**, and `onSlugSwitch` never rethrows (it catches at
   `useSlugMigration.ts:77-88`), so `SlugEditLayer`'s own `catch` at `:57-62` is unreachable.
4. Even if it fired, `SlugEditLayer.vue` **declares `slugError` at `:13` and never renders it** —
   its template (`:75-119`) contains no `slugError` binding. And `:56` sets
   `slugEditMode.value = false` synchronously, tearing the form down before any async result.

Net: type a wrong slug in the live dock → the form closes → **nothing is shown, nothing is
announced, nothing is logged to the user**. Four carefully-authored, twice-corrected error strings
(`useSlugMigration.ts:78-82` records a *previous* repair of these same branches) reach no surface.

**Cure:** the failure state belongs to the auth composition itself, rendered declaratively by the
surface that owns the form, with `role="alert"` and `aria-describedby` on the input — not injected
imperatively into a parent-held child instance. `VISUAL-CONSTITUTION.md §7` already names the
correct home: *"Account is one modal side Dialog opened from the Dock … It owns registration/
recovery when signed out."* Give that dialog the error region; delete `setError` entirely.

---

### D-3 · MAJOR — the failure state is color-only, nameless, unannounced, and unassociated

Measured by mounting the component and calling its exposed `setError` (`probes/slugbar.test.ts`,
probe **P2**):

```
[P2] error <p> exists = true
[P2] role      = null
[P2] aria-live = null
[P2] id        = null
[P2] classes   = absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap
[P2] any aria-describedby in tree = false
[P2] any role=alert/status in tree = false
```

`PaletteSlugBar.vue:124-126`. The only channel carrying "your login failed" is the colour
`rgb(219, 36, 36)`.

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."*
Three of the four required properties are absent.

**Cure:** one status region owned by the form, `role="alert"`, `id` linked from the input's
`aria-describedby`, with a non-colour token (icon + copy) carrying the state.

---

### D-4 · MAJOR — the error was given no layout: absolutely positioned outside its own box, and unable to wrap

`PaletteSlugBar.vue:124` — `class="absolute left-0 -bottom-4 … whitespace-nowrap"`, inside a root
that is `relative min-h-9 mb-2` (`:2`).

Measured by injecting that exact recipe into the live document at 1440px:

```
errorP: { fontFamily: '"Fira Code"…', fontSize: "16.4px", position: "absolute",
          bottom: "-16px", left: "0px", whiteSpace: "nowrap",
          color: "rgb(219, 36, 36)", rect: { w: 312.87, h: 22.95 } }
barRect: { w: 1408, h: 36 }
```

Two independent geometry failures:

- **Overlap.** The bar is 36px tall with an 8px bottom margin. The error's box starts 16px *below*
  the bar's bottom edge and is 22.95px tall, so its ink extends `16 + 22.95 = 38.95px` past the bar
  into an 8px gutter — **30.95px of unreserved overlap** onto whatever follows. Because it is
  `absolute`, nothing below can move out of the way. An error state that was designed would have
  reserved its own line.
- **Overflow.** `white-space: nowrap` on a 312.87px string. `PROPORTION-AUDIT.md §2` and
  `VISUAL-CONSTITUTION.md §3.2` bind measurement to *1440px, 390px, 320px, and actual 400% in-app
  zoom*. At 320px the string is `312.87 / 320 = 97.8%` of the viewport **before** any container
  inline padding, and cannot wrap or truncate. At 400% zoom it is unreachable.

**Cure:** the error is a flow-participating line inside the form's own stack (the form owns its
vertical rhythm), wrapping normally, with the bar's `min-h` growing to accommodate it.

---

### D-5 · MAJOR — the two mutually-exclusive states of one slot have different size, padding, and stroke weight

`PaletteSlugBar.vue:47-52` (logged in → `.slug-pill`) and `:71-78` (logged out → hand-rolled
`<button class="… px-3 py-1 rounded-full border border-primary/30">`) occupy the **same slot**.
Measured, both recipes injected into the live `.app-layout` document at 1440px:

| | `.slug-pill` (logged in) | Login button (logged out) | delta |
|---|---:|---:|---:|
| height | **28.95px** | **32.95px** | **+4.00px** |
| padding-inline | 8px | 12px | +4px |
| padding-block | 2px | 4px | +2px |
| border-width | 1px | 1px | — |
| border-color | `rgb(198,180,159)` (`--border`) | `oklab(0.466 -0.026 0.095 / 0.3)` | different family |
| font | Fira Code 700 / 16.4px | Fira Code 700 / 16.4px | same (see D-6) |

Logging in or out **visibly resizes the bar by 4px and re-strokes it in a different colour family**.
`PROPORTION-AUDIT.md §5.7`: *"Visual glyph size, operable target size and layout reservation are
separate quantities"* — here all three move together for a state change that carries no size
meaning.

It gets worse in the elevated-contrast register. `demo/styles/foundation.css:729-750`, inside
`@media (prefers-contrast: more)`, bumps a named roster to 2px:

```css
.console-well, .app-layout .glass-resting, .app-layout .console-well,
.slug-pill, [role="tab"] { border-width: 2px; }
```

`.slug-pill` is in the roster; the hand-rolled Login `<button>` is not. So under
`prefers-contrast: more` the same slot renders **2px when signed in and 1px when signed out** —
a state-dependent stroke weight, in precisely the accessibility mode where stroke weight is the
affordance.

**Cure:** one control, one recipe. The live sibling already did this — `ProfileSection.vue:59-68`
and `:111-120` render **the same `<Button variant="outline" size="xs">`** for both states, changing
only icon and label. Comment at `ProfileSection.vue:55-57` records it as landed work (S.W5-4).

---

### D-6 · MAJOR — type-jurisdiction violation: control labels wearing the mono/value voice, bold; menu rows wearing the display voice

Measured computed style of the Login control's exact class string (`PaletteSlugBar.vue:73`) in the
live document:

```
loginBtn: { fontFamily: '"Fira Code", "Fira Code Fallback", "Fira Mono", monospace',
            fontSize: "16.4px", fontWeight: "700", lineHeight: "22.96px" }
```

`VISUAL-CONSTITUTION.md §4` closes the matrix across all eighteen compositions:

| role | required | actual |
|---|---|---|
| *control or label, including dropdown options* | `text-small`, **Plus Jakarta Sans, non-bold** | `text-mono-small font-bold` → Fira Code 700 |
| *value, code, or provenance* | `text-mono-small` (Fira Code) | — |

"Login" is a verb-label, not a value. It is wearing the provenance voice at weight 700. (The slug
*pill* is correct — a slug **is** provenance.)

The four popover rows compound it: `PaletteSlugBar.vue:91, 98, 106, 113` all carry
`text-small font-display`. `font-display` resolves to `--font-stack-display: "Fraunces", …`
(`demo/styles/foundation.css:218`) — Fraunces, which `§4` reserves for *route H1 / instrument
identity / palette identity*. Menu options are Plus Jakarta Sans control copy.

**Cure:** control copy takes the control rung. This is a one-line change per site, and it is only
worth making inside the surviving surface — another argument for D-1's deletion.

---

### D-7 · MAJOR — uncertified live-colour ink: the exact defect the repo already measured and cured everywhere else

`PaletteSlugBar.vue:47-50` paints the raw pick straight into both ink channels:

```html
<span class="slug-pill cursor-help"
      :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }">
```

Mounted render (probe **P3**):

```
[P3] pill style = color: oklch(0.7 0.2 30); border-color: oklch(0.7 0.2 30);
```

The live sibling renders the *identical pill* through the contrast guard —
`ProfileSection.vue:28-31, 72-75`:

```ts
const { safeCss: floatingSafeCss } = useSafeAccentFn("floating");
const menuInk = computed(() => floatingSafeCss(cssColorOpaque));
```

…because, quoting its own comment at `ProfileSection.vue:22-27`:

> *"the live-color identity keeps its voice but wears CERTIFIED ink — **the raw pick as text/border
> measured ≤1.28:1 on the real menu ground for roughly half of all picks per scheme.** Two hosts,
> two referents … each ink certifies against the surface it actually composites over."*

I quantified it against the project's own guard. `probes/ink.test.ts` sweeps 288 representative
picks (24 hues × 4 lightnesses × 3 chromas) through `certifyAccentInk`
(`demo/color-session/ink.ts:130`, floor `TEXT_CONTRAST_FLOOR 4.5 + CERTIFY_HEADROOM 1.25`), on the
surfaces this pill sits on, using the composited-ambient bounds the repo measured itself
(`demo/color-session/useContrastSafeColor.ts:26` — *"measured composited ambient 0.376–0.936"*):

```
[INK] tier=floating scheme=light ambientL=0.936 surfaceL=0.9872 MOVED=253/288 (87.8%)
       e.g. oklch(0.6 0.05 0)  -> oklch(50.736328396015% 0.05 0deg)
[INK] tier=floating scheme=dark  ambientL=0.376 surfaceL=0.3487 MOVED=259/288 (89.9%)
       e.g. oklch(0.45 0.05 0) -> oklch(79.009312421549% 0.05 0deg)
[INK] tier=resting  scheme=light ambientL=0.936 surfaceL=0.9606 MOVED=253/288 (87.8%)
       e.g. oklch(0.6 0.05 0)  -> oklch(48.945588581264% 0.05 0deg)
[INK] tier=resting  scheme=dark  ambientL=0.376 surfaceL=0.3176 MOVED=242/288 (84.0%)
       e.g. oklch(0.45 0.05 0) -> oklch(75.643614168512% 0.05 0deg)
```

**84.0 %–89.9 % of representative picks are rejected by the project's own guard, in both schemes.**
The examples show why: the guard has to move `oklch(0.45 0.05 0)` to `L=79%` in dark — a 34-point
lightness correction. The uncertified pill is illegible for the large majority of user colours.
`VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their rendered contrast on
the actual material tier; a token name is not evidence."*

**Cure:** the surviving surface already has it — `useSafeAccentFn(<tier>)`. No new mechanism.

---

### D-8 · MAJOR — design-system boundary: a hand-rolled menu built from a Popover and six bare `<button>`s, and a hand-rolled focus register

`PaletteSlugBar.vue:81-120` builds an account menu out of `Popover` + four plain `<button>`s.
Mounted trigger (probe **Q2**):

```html
<button class="p-1 rounded-sm hover:bg-accent …" id="reka-popover-trigger-v-0"
        type="button" aria-haspopup="dialog" aria-expanded="false" …>
```

`aria-haspopup="dialog"`. There is no `role="menu"`, no `role="menuitem"`, no arrow-key roving, no
typeahead, no producer focus law — four unrelated buttons floating in a dialog-flavoured popover.
`VISUAL-CONSTITUTION.md §5.2` specifies roving-focus behaviour for exactly this species and the
component implements none of it.

The correct primitive is already imported by the live sibling —
`ProfileSection.vue:9-12, 53-91` composes `DropdownMenu` / `DropdownMenuTrigger` /
`DropdownMenuContent` / `DropdownMenuItem` / `DropdownMenuSeparator` / `DropdownMenuLabel`.

Two further reaches past the system in the same file:

- **The Login pill is a bare `<button>`** (`:71-78`) with a hand-typed
  `px-3 py-1 rounded-full border border-primary/30 hover:bg-accent active:scale-95` recipe —
  reimplementing `<Button variant="outline" size="xs">`, the exact migration
  `ProfileSection.vue:55-58` records as already landed. Probe **P4** confirms it is a raw button
  with **no `type` attribute at all**:
  ```
  [P4] btn0 type=null aria-label=null text="Login"
       class=flex items-center gap-1.5 text-mono-small font-bold px-3 py-1 rounded-full border border-primary/30 …
  ```
- **Focus is hand-rolled on all six controls.** `:73, :84, :91, :98, :106, :113` each carry
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`. Probe **Q1** shows
  the two glass-ui `<Button>`s in the same file rendering the producer recipe instead —
  `class="button tap-squish focus-ring glass-wash glass-capsule …"`. So one component ships **two
  different focus registers side by side**, and the hand-rolled one deliberately deletes the
  outline in favour of a 40 %-alpha box-shadow ring. `demo/styles/foundation.css:674-677` states
  the consequence in its own words: *"box-shadow rings vanish in WHCM, so restore a real `outline`
  (system `Highlight`) on every operable control"* — i.e. the ring channel is exactly the one that
  cannot survive forced colors, and this component opted out of the outline that replaces it.
  `VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in both schemes,
  forced colors and reduced transparency."*
  *(Whether foundation's `:where(...)`-specificity WHCM bind at `foundation.css:699-720` is
  out-ranked by Tailwind's `focus-visible:outline-none` I could **not** measure — the component
  never mounts in a browser, so I have no forced-colors frame of it. The two-focus-register split
  and the deliberate outline deletion are CONFIRMED; total focus loss under forced-colors is a
  **HYPOTHESIS**.)*

Owner edicts **4** (glass-ui is the design system) and **5** (style at the root, not per-instance).

---

### D-9 · MAJOR — one input, two secrets, no mode: the affordance lies

`PaletteSlugBar.vue:12` — `placeholder="enter slug..."`. But `onSlugSwitch` (`:198-225`) routes on
a **shape regex**:

```ts
function looksLikeSlug(v: string) { return /^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(v); }
…
const isAdmin = !looksLikeSlug(normalized);          // :205
emit("switchSlug", isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);  // :213
```

with a helper (`:188-196`) that strips `ADMIN_TOKEN=` prefixes and surrounding quotes. So:

1. **Anything that is not four lowercase hyphenated words is submitted as an admin bearer token.**
   A user who mistypes `brave-amber-quiet-fox` as `brave-amber-quietfox` is silently escalated onto
   the rate-budgeted admin proof path. The control never says so, never changes state, never
   announces the switch.
2. **The admin path is undiscoverable** — the placeholder never mentions it. The live successor
   *fixed the copy* (`SlugEditLayer.vue:84` — `placeholder="enter slug or token..."`) and this file
   never received it: drift, in the same direction as D-1.
3. **A bearer secret is typed into a plaintext search field with no name and no autofill policy.**
   Measured attributes of the actual rendered input (probe **P5**):
   ```
   [P5] type = "search"   placeholder = "enter slug..."
   [P5] autocomplete = null   aria-label = null   spellcheck = null
   [P5] has <label> = false
   ```
   `type="search"` with no `autocomplete="off"` means the UA offers to remember it; WebKit
   additionally keeps a recent-searches list for search inputs. glass-ui's `SearchBar` accepts an
   `ariaLabel` prop (`node_modules/@mkbabb/glass-ui/dist/search.js:136`) which this call site does
   not pass, so the field has **no accessible name at all** — `VISUAL-CONSTITUTION.md §4.1`
   requires it explicitly.
4. **Contract mismatch.** `PALETTE-CONTRACT.md:106-110`: *"`POST /sessions` (and `/sessions/login`)
   take an exact `{publicHandle, recoverySecret}`."* A single-field, secret-free "type your slug to
   sign in" is not a composition of the ratified auth model; it is a different, weaker one.

**Cure:** two fields for the user path (handle + recovery secret, per contract), a separate,
explicitly-labelled admin entry, and `type="password"` / `autocomplete="off"` on anything secret.
`VISUAL-CONSTITUTION.md §7` puts all of it in the Dock-opened Account dialog owned by W23.

---

### D-10 · MAJOR — WebKit paints a second ✕ inside the field, 6px from the component's own ✕

The field is `type="search"` (glass-ui `search.js:132`, and probe **Q1** confirms it renders as
`<input type="search" placeholder="enter slug..." class="input-bar-field">`). No
`::-webkit-search-cancel-button` reset exists anywhere:

```
$ grep -rn "search-cancel-button\|search-decoration" node_modules/@mkbabb/glass-ui/dist/ demo/styles/*.css
(no output)
```

Live confirmation on the running app:

```
searchCancelResetFound: null
webkitCancelAppearance: "auto"
```

So while the field has content, WebKit — **the audit's own capture browser** — renders its native
clear glyph inside the field's right edge, `gap-1.5` (6px) from the component's own `<XIcon>`
labelled *"Cancel slug edit"* (`PaletteSlugBar.vue:29-39`). Two adjacent ✕ affordances, different
meanings (clear the text vs. abandon the mode), no visual distinction. This is what `SearchBar`
being a *search* primitive costs when it is conscripted as a login field.

**Cure:** a login field is not a search field. Use the text-input primitive; if glass-ui lacks one
at this rung, that is a producer request (edict 4), not a demo-local reset.

---

### D-11 · MINOR — motion: an untokenized magic 50 ms, a `mode="out-in"` focus race, and a no-op `max-height` arm

`PaletteSlugBar.vue:4` wraps the `v-if/v-else` pair in `<Transition name="vj-morph" mode="out-in">`.
`onStartSlugEdit` (`:172-182`):

```ts
setTimeout(() => {                      // ← 50, a bare number
    slugEditMode.value = true;
    nextTick(() => { searchBarRef.value?.inputRef?.focus(); });
}, 50);
```

Three separate issues:

- **The 50 ms is not a token.** `demo/styles/animations.css` defines `--duration-fast/normal` and
  the three `--spring-*` registers; 50 is none of them, and the comment
  (*"Delay to let the Popover fully close"*) is a timing guess about another component's internals.
  The live successor has no delay at all (`SlugEditLayer.vue:16-23`).
- **The focus almost certainly never lands (HYPOTHESIS).** Under `mode="out-in"` Vue mounts the
  incoming branch only in the outgoing branch's `afterLeave`; `nextTick` resolves long before that,
  so `searchBarRef.value` is `null` and the `?.` swallows the focus call. I could not confirm this:
  **probe P1 is NEGATIVE in jsdom** —
  ```
  [P1] input present = true   activeElement = INPUT (placeholder "enter slug...")
  [P1] focused input? = true
  ```
  because jsdom reports no transition duration, so Vue resolves the leave synchronously. The
  failure is real-browser-only, and the component mounts in no browser (D-1), so I cannot produce
  the frame. **Labelled a hypothesis.** Corroborating circumstantial evidence: the live successor
  dropped both the `Transition` and the `setTimeout` and focuses directly
  (`SlugEditLayer.vue:19-22`).
- **The `max-height` arm is dead while its side effect is not.** `animations.css:104-119` gives
  `.vj-morph-*-active` a `max-height` transition **and `overflow: hidden`**, parameterised by
  `--vj-morph-collapse` / `--vj-morph-expanded`. This site sets neither (`:239-243` — the scoped
  block is a comment and an `@reference`, nothing else), so `max-height` animates `none → none`
  while `overflow: hidden` still clips any focus ring on the element mid-swap.

**Credit where due:** reduced motion is the one motion law this component satisfies, and it does so
for free — `animations.css:80` states *"The global prefers-reduced-motion guard below neutralises
all three."* No per-site work, no violation of owner edict 6 (animations are never deleted): the
`vj-morph` family is the correct global home and this site consumes it.

---

### D-12 · MINOR — overflow, truncation, and RTL were never designed

Probe **Q3**, mounting with a 48-character slug:

```
[Q3] pill class = slug-pill cursor-help   | text len = 48
[Q3] root class = flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9
```

No `min-w-0`, no `max-w-*`, no `truncate`, not even `whitespace-nowrap`. Measured width of that
pill in the live document: **502.44px** — `1.29×` the 390px arm and `1.57×` the 320px arm, both
binding under `PROPORTION-AUDIT.md §2`. The root is a plain `flex` with no `flex-wrap` and no
`min-w-0`, so it simply overflows.

The two live siblings at least add `whitespace-nowrap` (`ProfileSection.vue:73`,
`MobileMenuDropdown.vue:48`) — still no truncation, but explicit.

RTL: `VISUAL-CONSTITUTION.md §6.1` requires *"CSS strings, hex, slugs, IDs and provenance render in
LTR-isolated spans inside RTL prose."* The slug pill (`:47-52`) has no isolation.

**Cure:** `min-w-0` on the flex parent, `truncate` + a `max-inline-size` on the pill (the full slug
already lives in the hover Popover at `:54-59` and in "Copy slug"), `dir="ltr"` / `unicode-bidi:
isolate` on the value span.

---

### D-13 · MINOR — dead contract surface: one prop, one emit, one exposed method with zero consumers

- **`hasSavedPalettes`** (`:147`, typed at `:150`) — `grep -c hasSavedPalettes` returns **2**,
  i.e. the type declaration and the destructure. It is never read. A required prop that does
  nothing forces every caller to compute and pass a value that is discarded.
- **`emit copy: []`** (`:155`) — never emitted. `grep` for `emit("copy"` / `$emit('copy'` in the
  file returns **0 hits**; `onCopySlug` (`:168-170`) writes the clipboard directly instead. Any
  consumer wiring `@copy` gets silence — a declared contract that is a lie.
- **`resetEditMode`** (`:231-234`, exposed `:236`) — zero consumers repo-wide.

Owner edict **2** (no dual paths, no dead shims).

---

### D-14 · MINOR — non-idiomatic Vue 3.5, and a re-imported bug the repo already fixed

- **Template ref idiom.** `:166` uses `const searchBarRef = ref<InstanceType<typeof SearchBar> |
  null>(null)` with the string-ref binding at `:7`. Owner edict **7** and the repo's own live
  counterpart use the 3.5 API: `SlugEditLayer.vue:2,14` —
  `useTemplateRef<HTMLInputElement>("slugInputRef")`.
- **A resurrected substring-matching bug.** `:216-221` does
  ```ts
  } catch (e: any) {
      const msg = e?.message ?? "";
      if (msg.includes("409")) slugError.value = "Already signed in as this slug.";
  ```
  `useSlugMigration.ts:78-82` documents this exact pattern as **already diagnosed and fixed**
  elsewhere:
  > *"S.W2 W2-6: branch on the typed `ApiProblem.status`, not `.message` substrings — the server
  > titles ("Already logged in as this user", "User not found", "Rate limit exceeded") never
  > contain "409"/"404"/"429", so those branches matched nothing and the authored copy below never
  > showed."*

  The orphan still carries the un-fixed version. It is a **third** copy of this dead branch set
  (the fourth lives at `SlugEditLayer.vue:57-62`, equally dead for the different reason in D-2).
  `catch (e: any)` also defeats the typed `ApiProblem` boundary the repo built.
- **Shadowing.** `:205` declares `const isAdmin = !looksLikeSlug(normalized)` inside a function
  whose enclosing scope already binds a prop named `isAdmin` (`:147`, used at `:64`). Harmless
  today only because that function does not read the prop; it is a trap for the next editor.

---

### D-15 · INFO — even if it mounted, its topology is not the ratified Account composition

`VISUAL-CONSTITUTION.md §7`, *Account and storage recovery*:

> *"Account is one modal side Dialog opened from the Dock, not a route chassis or second main. It
> owns registration/recovery when signed out and identity, recovery-credential rotation and logout
> when active; secret retention temporarily replaces its action region and never becomes a nested
> Card/Dialog. **W23 owns the rendered composition and journey** while W15 supplies auth/outbox
> state."*

`PaletteSlugBar` is an inline identity strip inside the Library body, with no
recovery-credential-rotation affordance and no secret-retention region. `PROPORTION-AUDIT.md §5.6`
also applies to its hover Popover (`:54-59`): *"do not compensate for an unnecessary action with
tooltip proliferation. Subtraction precedes explanation."* A 56-unit hover card explaining what a
slug is, attached to a `cursor-help` span, is explanation standing in for an affordance that should
not need explaining.

So the design is not merely unmounted — the shape it would take if remounted is one the
constitution has already replaced. This is the final argument for D-1's cure being deletion rather
than repair.

---

### D-16 · INFO — a retracted finding, recorded because the retraction is itself evidence

I initially flagged `border-muted-foreground` on the admin pill (`:65`) as a dead Tailwind class,
because the two live siblings pointedly avoid it with inline styles
(`ProfileSection.vue:96`, `MobileMenuDropdown.vue:67` both write
`style="border-color: var(--muted-foreground)"`) — which reads exactly like a known-broken idiom
routed around. Measured in the live document:

```
withBothClasses:  border rgb(124,102,80)  color rgb(124,102,80)
onlyTextMuted:    border rgb(198,180,159) color rgb(124,102,80)
onlyBorderMuted:  border rgb(124,102,80)  color rgb(28,25,23)
```

`border-muted-foreground` **does** resolve. **Retracted.** Recorded because the standing evidence
law earned its keep here: the inference from two siblings' avoidance was strong, plausible, and
wrong, and only the measurement caught it.

The *design* observation survives the retraction, though: the admin state renders as **grey
`muted-foreground`** here, while the live successor gives admin the ratified gold identity —
`ProfileSection.vue:96`: `class="slug-pill cursor-default whitespace-nowrap gold-shimmer"
style="border-color: var(--color-gold); color: var(--color-gold)"`. Two admin identities in one
codebase; the orphan has the un-designed one.

---

## 3. State coverage matrix

Every state this component can enter, and its disposition.

| state | reachable? | designed? | evidence |
|---|---|---|---|
| **not rendered at all** | **always** | **no — this is the defect** | D-1; 0/12 routes |
| empty (no slug, not admin) | yes | partly | Login pill; wrong voice + wrong primitive (D-5, D-6, D-8) |
| populated (slug present) | yes | partly | pill ink uncertified 84–90 % of picks (D-7) |
| admin | yes | **no** | grey `muted-foreground`, not the ratified gold (D-16) |
| loading (`slugSwitching`) | yes | partly | `Loader2 animate-spin` + `aria-label="Signing in…"` (`:24-26`) — the one state done well |
| **error** | yes | **no** | color-only, nameless, unannounced, un-laid-out (D-3, D-4) |
| disabled (submit) | yes | partly | `:disabled` set (`:23`); no visible disabled treatment beyond the producer default |
| focused | yes | **no** | two competing focus registers; outline deliberately deleted (D-8) |
| hovered | yes | yes | `hover:bg-accent` throughout |
| active / pressed | yes | yes | `active:scale-95` / `active:scale-[0.98]` |
| selected | n/a | — | no selection semantics in this species |
| dragging | n/a | — | — |
| **overflowing** | yes | **no** | 502.44px pill, no `min-w-0`/`truncate` (D-12) |
| **truncated** | **unreachable** | **no** | no truncation exists to reach (D-12) |
| **RTL** | yes | **no** | no LTR isolation on the slug value; §6.1 (D-12) |
| reduced-motion | yes | **yes** | global guard, `animations.css:80` (D-11, credit) |
| **forced-colors** | yes | **no / unmeasurable** | outline deleted on 6 controls; ring is box-shadow (D-8, hypothesis arm) |
| **zoom 200 % / 400 %** | yes | **no** | nowrap 312.87px error + 502.44px pill blow the 320px arm (D-4, D-12) |
| **prefers-contrast: more** | yes | **no** | 2px vs 1px across the two states of one slot (D-5) |
| pending→success | yes | partly | form closes; no durable confirmation (§5: *"Persistent operation state stays with the entity/workspace"*) |
| **pending→failure** | yes | **no — silent** | **D-2** |

Fourteen enumerated states. **Nine are unhandled, unstyled, or broken.** A state that was never
designed is a design defect; a state that is *unreachable because the whole component is
unreachable* is the design defect this seat was convened to find.

---

## 4. Owner-edict roll

| edict | verdict | where |
|---|---|---|
| 1 · no god modules | **PASS** | 243 lines, focused |
| 2 · no legacy code | **FAIL** | D-1 (orphan), D-13 (dead prop/emit/method), D-14 (resurrected substring bug) |
| 3 · KISS, no contrivance | **FAIL** | D-1, D-9 (one input two secrets), D-11 (magic 50 ms) |
| 4 · glass-ui is the design system | **FAIL** | D-8 (hand-rolled menu, hand-rolled pill, hand-rolled focus), D-10 (search primitive as login field) |
| 5 · root-level styling | **FAIL** | D-8 — six per-instance focus/hover/active recipes typed inline |
| 6 · animations never deleted | **PASS** | consumes the global `vj-morph` family; global PRM guard honoured |
| 7 · idiomatic Vue 3.5 | **FAIL** | D-14 — `ref()`+string ref instead of `useTemplateRef`; `catch (e: any)` |
| 8 · `verbatimModuleSyntax` | **PASS** | `:131-145` — all runtime imports; no type-only import mis-declared |

---

## 5. Reproduction

All probes archived under `./probes/`.

```bash
# 1 · the orphan proof (static)
grep -rn "PaletteSlugBar\|slugBarRef" --include="*.vue" --include="*.ts" . \
     --exclude-dir=node_modules --exclude-dir=dist
git log --all --oneline -S "<PaletteSlugBar" | head -3
git show 95993197 --stat | grep -iE "PaletteDialog|PaletteSlugBar"

# 2 · the mount probes (P1–P5, Q1–Q3) — jsdom, @vue/test-utils
npx vitest run --config docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/vitest.config.ts

# 3 · the ink-certification sweep (D-7)
npx vitest run --config .../probes/vitest.config.ts .../probes/ink.test.ts
```

`probes/vitest.config.ts` points its `include` at the scratchpad copy; repoint it at
`probes/*.test.ts` to run in place. It does **not** touch the repo's own `vitest.config.ts`.

The live-document geometry and colour measurements (D-4, D-5, D-7, D-10, D-12, D-16) were taken by
injecting each recipe's exact class string into a `.app-layout` host on the running dev server at
`http://localhost:9000` and reading `getComputedStyle` / `getBoundingClientRect`; the host was
removed afterwards. **No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`,
`scripts/dev/dev.sh`, or any `INBOX.md` was modified by this seat.** The only writes are under
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/`.

---

## 6. Strongest defect

**D-2.** The orphan (D-1) is a tidiness failure with a clean cure. D-2 is a **live, shipped,
user-facing hole**: the entire login-failure vocabulary of the application — four authored strings,
already repaired once — is pushed through `slugBarRef.value?.setError(...)` into a ref that is
never bound to anything, in a component that never mounts. A wrong slug in the production dock
fails silently. The design defect is not that a file went stale; it is that **an error surface was
made a private child capability instead of a property of the auth composition**, so the surface
could be deleted out from under the app without a single type error, test failure, or e2e signal.
Delete the component; give the Account dialog a real, declarative, announced status region.
