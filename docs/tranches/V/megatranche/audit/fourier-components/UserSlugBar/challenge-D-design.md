claude-opus-5[1m] (served model id)

# CHALLENGE — `UserSlugBar.vue` · axis D (DESIGN)

**Target.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/UserSlugBar.vue` (168 lines).
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every claim below carries severity ·
`file:line` provenance · the falsifier I ran against it. Two candidate BLOCKERs died on their own
falsifiers and are recorded as downgrades (§6) rather than deleted — L-18 runs both ways.
**Method.** Static + source-derived only. No browser. Read whole: the component; `stores/auth.ts`;
`composables/useToast.ts`; `layout/AppHeader.vue` (its sole mount, `:7`/`:140`); `layout/DarkModeToggle.vue`
(its sole sibling); `lib/api.ts` §Sessions; `style.css` (the entry cascade); glass-ui **4.0.0 installed dist**
(`web/node_modules/@mkbabb/glass-ui/dist/**` — button CVA, `input-pill`, token files, `a11y-overrides.css`);
glass-ui **7.0.0 producer source** (`/Users/mkbabb/Programming/glass-ui/src/**` — read-only, for the F.W1
break surface); and the server contract (`api/lib/crud/slugs.py`, `api/dependencies.py`, `api/routers/sessions.py`)
where the component's prose makes a claim about it.

**Hitherto corpus folded, not re-invented.** `formation/fourier/lane-frontend.md:108` (the component's
inventory row: 168 lines, "Slug edit + `useClipboard`"), `:349-350` (its two glass import lines), `:602`
(the `style.css` D.W4.d focus-ring carry list — see D-B2). `formation/fourier/CENSUS-2026-08-03.md:102-104`
(the uplift break surface), `:184-186` (F.W1 charge), `:256-258` (P2 — no unit-test net). Intake
`codex-provenance/intakes/lane-fourier-r3-r6.md` **R3-7a** (the Tooltip migration budget — see D-M6, where
this lane extends it) and **R3-10** (the dynamic-`:is` exhaustiveness lesson, applied in §6).

**Tally: 28 defects (4 BLOCKER · 13 MAJOR · 11 MINOR), 5 INFO records, 5 superlatives.**

---

## §1 — BLOCKERS

### D-B1 · The login form overflows the app header on every phone in portrait — BLOCKER
`UserSlugBar.vue:128-157` · `AppHeader.vue:136,153-159` · `style.css:41-43`

The logged-out **trigger** (`:116-126`) is meticulously responsive — `size-10 sm:size-auto sm:px-2.5
sm:py-1`, `LogIn class="size-5 sm:size-3.5"`, `<span class="hidden sm:inline">`. The **form it opens**
(`:128-157`) carries **zero** responsive treatment: not one `sm:` class, and a hard-coded `w-44` input.
The state the user transitions *into* is the unhandled one.

Arithmetic at 375 px (iPhone SE/13 mini portrait), root font `1.125rem = 18px` (`style.css:41-43`, applies
below 768 px), **fine pointer** (the weaker, safer case):

| run | derivation | px |
|---|---|---|
| header inline padding | `padding: 0.5rem 0.625rem` (`AppHeader.vue:157`) → 2 × 11.25 | 22.5 |
| available | 375 − 22.5 | **352.5** |
| input | `w-44` = 11rem × 18 | 198 |
| `gap-1` ×2 | 0.25rem × 18 × 2 | 9 |
| two `size-7` buttons | 1.75rem × 18 × 2 | 63 |
| **UserSlugBar subtotal** | | **270** |
| cluster `gap-1.5` | 0.375rem × 18 | 6.75 |
| DarkModeToggle | `--toggle-size: 2.5rem` (`AppHeader.vue:242`) × 18 | 45 |
| **right cluster** — `shrink-0` (`AppHeader.vue:136`) | | **321.75** |
| left run (logo-mark 27 + gap 9 + divider 1.5 + gap 9 + nav-trigger ≈ 49.5) | labels already `display:none` (`AppHeader.vue:202,230`) | ≈ 96 |
| header gap | `gap: 0.5rem` (`AppHeader.vue:156`) | 9 |
| **min-content total** | | **≈ 426.75** |

**≈ 74 px of horizontal overflow.** Break-even viewport ≈ **449 px** — wider than every phone in portrait
(iPhone 15 Pro Max = 430 px → still 19 px over). Under a **coarse pointer** — i.e. every phone — glass-ui
lifts both `size-7` buttons to `min-inline-size: var(--touch-target)` = 2.75 rem = 49.5 px
(`dist/styles/utilities/a11y-overrides.css:115-121`, matching `[data-size="icon"]`, which `Button.vue`
stamps from its `size` prop — `dist/button-BNDWhAZb.js:34`), taking the total to **≈ 462.75 px → 110 px over**.

Attribution is clean: with a zero-width DarkModeToggle the run is still 96 + 9 + 270 + 22.5 = **397.5 > 375**.
UserSlugBar alone breaks it.

**Falsifier (ran, survived).** The claim dies if any of: (a) `.header-inner` wraps or scrolls — it does not
(`AppHeader.vue:153-159`: `display:flex`, no `flex-wrap`, no `overflow`, and at ≥640 px a *fixed*
`height: 3.5rem`); (b) the right cluster shrinks — `shrink-0` (`AppHeader.vue:136`), `w-44` is a fixed width,
`size-7` a fixed box; (c) the left run collapses further — its two labels are already `display:none` below
640 px and flex items do not shrink below `min-content` by default. All three held.
**UNPROVEN-NEEDS-LIVE (SS-13):** *which* failure mode paints — body horizontal scrollbar, clipped header,
or the input squeezed by a UA quirk. That the flex line exceeds the container is source-certain; the pixel
photograph is not.

### D-B2 · The credential field's keyboard-focus indicator is effectively invisible — BLOCKER
`UserSlugBar.vue:134`

```
class="… bg-card px-2 py-1 … outline-none … transition-[border-color] duration-150 focus:border-foreground/30 …"
```

`outline-none` deletes the UA ring; the **only** replacement is a border-colour shift. Token-decidable,
light theme (glass-ui `dist/styles/tokens/color-radius.css:58,72`; `--foreground: hsl(24 10% 10%)`,
`--card: hsl(36 48% 97%)`; sRGB alpha compositing, WCAG relative luminance):

| pair | contrast | requirement |
|---|---|---|
| focused border `foreground/30` vs field fill `bg-card` | **1.93 : 1** | 3:1 (SC 1.4.11, focus indicator) |
| focused border vs **resting** border `foreground/12` | **1.51 : 1** | the state change itself |
| resting border vs field fill | **1.28 : 1** | 3:1 (SC 1.4.11, control boundary — see D-M9) |

My luminance pipeline is calibrated against glass-ui's own annotations: it reproduces
`--neutral-5` on `--neutral-0` at **5.21 : 1** and on the muted surface at **4.91 : 1**, exactly the
"5.21:1 vs page / 4.90:1 vs muted" printed at `color-radius.css:45`.

This is the **one** control in the file that is not a glass-ui `Button`, and it is the one that loses the
ring. glass-ui 4.0.0 already ships the cure twice over: the `focus-ring` utility that `Button`'s CVA base
composes (`dist/button-BNDWhAZb.js:53`), and a whole `Input` component behind `@mkbabb/glass-ui/forms`
(`package.json:427` → `dist/forms.d.ts:1`) whose `.input-pill` recipe carries a `:focus-visible` accent
ring *and* `:user-invalid`/`[aria-invalid]` destructive rungs by construction
(`dist/styles/glass/surfaces.css:187-231,251-254`).

**Corpus contradiction, explicit.** `lane-frontend.md:602` records D.W4.d as having added global
`:focus-visible` rings for exactly four scoped-styled classes (`.sidebar-link`, `.floating-toc-item`,
`.callout-btn`, `.gallery-card` — `style.css:136-143`). That sweep **missed this input**, and missed it in
the worst way: the site that explicitly opts *out* with `outline-none` was not in the census of sites
needing a ring, because the sweep enumerated *scoped-style classes*, and this element is styled by
utilities. The D.W4.d closure is narrower than its own prose implies.

**Falsifier (ran, survived).** Dies if a global rule re-supplies a ring: `style.css:136-143` names four
classes, none matching; glass-ui's `.input-pill` is not composed here (no `input-pill` class on `:134`);
no ancestor `:focus-within` rule exists in `AppHeader.vue:150-260`. Dies if the border delta clears 3:1 —
computed above at 1.93.

### D-B3 · Focus is destroyed on both the open and the close of the login form — BLOCKER
`UserSlugBar.vue:117-123, 128-136, 74-77`

The trigger is `v-if="!showLogin"` (`:117`) and the form is its `v-else` (`:128`). Activating the trigger
sets `showLogin = true` (`:122`), which **unmounts the focused element**. There is no `autofocus`, no
`ref` + `nextTick(() => el.focus())`, no `v-show`. A keyboard user presses Enter on "Log in" and focus
falls to `<body>` — they must then Tab from the top of the document to reach a field the app just
conjured for them. Symmetrically, `Escape` (`:74-77`) sets `showLogin = false`, unmounting the focused
input with no restoration to the trigger that is remounted in its place. WCAG 2.4.3 (Focus Order) and
3.2.2 (On Input) both bite; the Escape arm additionally discards typed text (`:76`) with no undo.

**Falsifier (ran, survived).** Dies if any focus management exists — grep of the whole SFC: zero
`autofocus`, zero `useTemplateRef`/`ref=`, zero `.focus(`, zero `nextTick`. Dies if the two branches
share a DOM node — they are `v-if`/`v-else` siblings, so Vue patches them as distinct vnodes.

### D-B4 · The application's only credential is generated, stored, and never shown — BLOCKER
`UserSlugBar.vue:48-60` · `auth.ts:43-50` · `useToast.ts:21-22`

`loginWithSlug(slug)` (`lib/api.ts:470-475`) is the *entire* authentication story — there is no password,
no email, no recovery. The slug **is** the credential. `handleGenerate` (`:48-60`) mints one and then:

- **discards the returned slug.** `auth.ts:43-50` `register()` returns `res.user_slug` deliberately;
  `UserSlugBar.vue:51` calls it as a bare statement and throws the value away.
- **tells the user the wrong thing.** `:54` fires `toast("Logged in!", "success")` — byte-identical to the
  `handleLogin` message at `:40`. The user clicked *"Generate new slug"* and is told they logged in.
- **ignores an affordance built for precisely this.** `useToast.ts:21-22` accepts
  `options?: { slug?: string }` and formats `` `${message} (${slug})` ``. No call site in this file passes
  it; this is the one call site that exists to.

The pill then shows only `abbreviatedSlug` (`:90`) — a four-letter cipher (D-m2). So a freshly registered
user's sole path to their own credential is: notice the unlabelled Copy button, press it, receive no
textual confirmation of *what* was copied (D-M3), and paste it somewhere safe before the tab closes. On
mobile the abbreviation is `hidden` entirely (`:90`) and the `title` fallback is unreachable by touch
(D-M8). Account loss is one refresh away.

**Falsifier (ran, survived).** Dies if the slug surfaces anywhere else in the logged-in UI — grep of
`web/src` for `userSlug` outside `auth.ts`: `UserSlugBar.vue` only (this file), and here only as
`abbreviatedSlug` (`:90`), a `title` attribute (`:87`), and the clipboard payload (`:69`). Dies if a
post-register modal exists — `handleGenerate` (`:48-60`) has no such branch.

---

## §2 — MAJOR

### D-M1 · The slug pill's geometry is designed for 20 px children and gets 44–49.5 px ones on every touch device — MAJOR
`UserSlugBar.vue:86,94,106` · glass-ui `dist/styles/utilities/a11y-overrides.css:115-121`

The pill is `px-1 sm:px-2 py-0.5` around `size-5` (1.25 rem) buttons — an authored height of
20 + 4 = 24 px. But `Button` stamps `data-size="icon"` (`dist/button-BNDWhAZb.js:34`), and glass-ui's
coarse-pointer floor targets exactly that attribute:

```css
@media (pointer: coarse) { [data-size="icon"] { min-block-size: var(--touch-target, 2.75rem);
                                                min-inline-size: var(--touch-target, 2.75rem); } }
```

`min-*` beats `width`/`height`, so on any touch device the two children become 2.75 rem — **49.5 px** at
fourier's mobile root of 18 px — and the "pill" becomes a 54 px stadium (49.5 + 2 × 2.25 px `py-0.5`). Below
640 px `.header-inner` has only `min-height: 2.75rem` (`AppHeader.vue:158`), so the whole header grows from
its designed 49.5 px to ≈ 72 px — a **45 % overshoot** caused by one component. The system is doing the
right thing (WCAG 2.5.5); the component authored geometry that assumed the system would not.

**Falsifier (ran, survived).** Dies if `size-5` wins — it cannot: `size-5` sets `width`/`height`, the
override sets `min-block-size`/`min-inline-size`. Dies if `cn()` strips `data-size` — it is a DOM attribute
bound at `dist/button-BNDWhAZb.js:34`, not a class. Dies if fourier resets `--touch-target` — grep of
`web/src`: zero hits. **UNPROVEN-NEEDS-LIVE:** the painted header height.

### D-M2 · Clipboard failure is silently swallowed, against the composable's explicit contract — MAJOR
`UserSlugBar.vue:23,67-70` · glass-ui `dist/composables/dom/useClipboard.d.ts:8-36`

`useClipboard` returns `copy: (text) => Promise<CopyResult>` where `CopyResult = { ok, reason?: "clipboard-api"
| "exec-command" | "no-api" }`, and takes `onCopyError?: (reason) => void`. The d.ts states the intent in
plain words: *"the failure is REPORTED, never silently swallowed."* `copySlug` (`:67-70`) passes no
`onCopyError` (`:23` supplies only `resetMs`) and does not await or inspect the returned promise.

On any non-secure origin, in a locked-down browser, or under a denied permission, `copied` never flips,
the icon never swaps, no toast fires, and the user — whose credential this is (D-B4) — has no signal that
nothing happened. The file already has a `toast` in scope (`:13`) and uses it for three other outcomes
(`:40,42,64`); the copy path is the one action with no feedback channel at all.

**Falsifier (ran, survived).** Dies if `copied` flips on failure — `dist/useViewportReady-CvBcCYDf.js:78-89`
sets the ref only on the success arm. Dies if a global handler catches it — `copy()` resolves rather than
rejects, so there is nothing for a window handler to see.

### D-M3 · The copy confirmation is icon-only — no assistive-technology signal at all — MAJOR
`UserSlugBar.vue:91-102`

`copied` drives a `Check`/`Copy` icon swap (`:98-101`) and nothing else. The button's accessible name is a
static `title="Copy slug"` (`:95`) that does not change; there is no `aria-live`, no `role="status"`, no
visually-hidden text, no `aria-label` bound to `copied`. A screen-reader user activates Copy and receives
silence — for the only action that hands them their credential. The 1.5 s window (`:23`) also means a
low-vision user who looks away misses the sole confirmation.

**Falsifier (ran, survived).** Dies if the icon carries text — `<Check>`/`<Copy>` are lucide SVGs with no
`<title>`/`aria-label` (`:99-100`). Dies if `Button` injects a live region — `dist/button-BNDWhAZb.js:30-46`
renders a `Primitive` with a bare default slot.

### D-M4 · Placeholder contrast fails in both themes — MAJOR
`UserSlugBar.vue:134` (`placeholder:text-muted-foreground/40`)

`--muted-foreground` = `--neutral-5` (`color-radius.css:85`). Composited at 40 % over `--card`:

| theme | tokens | contrast | requirement |
|---|---|---|---|
| light | `hsl(30 22% 40%)` @40 % over `hsl(36 48% 97%)` | **1.73 : 1** | 4.5:1 (SC 1.4.3) |
| dark | `hsl(34 14% 62%)` @40 % over `hsl(24 8% 16%)` | **2.09 : 1** | 4.5:1 |

The `/40` modifier takes a token whose *whole purpose* is to be the AA-verified muted rung (5.21:1 per its
own annotation) and dilutes it to a third of the floor. This is not cosmetic: the placeholder
`"your-slug-here 🐌"` is the **only** visible statement of the expected format (there is no label, no
helper text, no `pattern`), and the format is non-obvious — exactly four lowercase hyphenated words
(`api/dependencies.py:32-34`, `SLUG_PATTERN = ^[a-z]+(-[a-z]+){3}$`).

**Falsifier (ran, survived).** Dies if the field's background is darker/lighter than `--card` — `bg-card`
is applied literally at `:134`. Dies if glass re-themes `--neutral-5` under a `.dark` scope differently
from `tokens/dark-arm.css:47` — checked; `light-dark.css:88` agrees. Dies if placeholders are exempt from
1.4.3 — they are not; the SC excludes only incidental/decorative/inactive text, and this is the operative
format hint.

### D-M5 · Enter re-entrancy: the in-flight guard is on the buttons but not on the key handler — MAJOR
`UserSlugBar.vue:33-46, 72-73, 129-136`

`handleLogin` guards on `canSubmit` (`:34`) but **not** on `loggingIn`. The submit `Button` is
`:disabled="!canSubmit || loggingIn"` (`:142`) and the dice `Button` is `:disabled="loggingIn"` (`:151`) —
but the **input is never disabled** and `onKeydown` (`:72-73`) calls `handleLogin()` unconditionally on
Enter. Holding Enter, or an impatient double-press against a route that sleeps 0.2 s on every path by
design (`api/routers/sessions.py:67,74` — deliberate timing-attack mitigation, so this is a *guaranteed*
≥200 ms window, not a rare race), fires N concurrent `login()` calls. Each winner calls `persistUser`
(`auth.ts:35-41`), so N session tokens are minted and N−1 orphaned server-side.

The design tell: the component *knows* about the in-flight state and renders it in two places while
leaving the primary keyboard path — the one a mono-font credential field invites — unguarded.

**Falsifier (ran, survived).** Dies if `login()` dedupes — `auth.ts:52-58` has no in-flight memo (contrast
`ensureUser`, `auth.ts:73-82`, which *does* keep `_ensurePromise`; the pattern exists in the same file and
was not applied here). Dies if the input were disabled — `:129-136` has no `:disabled`.

### D-M6 · `title` as the sole accessible name on three buttons — inconsistent, and invisible to the F.W3 tooltip sweep — MAJOR
`UserSlugBar.vue:87,95,107,152` vs `:118,141`

Within 40 lines the file names buttons two different ways:

| line | mechanism | name |
|---|---|---|
| `:118` | `aria-label` | "Log in" |
| `:141` | `aria-label` | "Submit slug and log in" |
| `:95` | `title` | "Copy slug" |
| `:107` | `title` | "Log out" |
| `:152` | `title` | "Generate new slug" |
| `:87` | `title` (container) | the raw slug |

`title` does compute an accessible name (accname step 2I, since the lucide SVG contributes no text), so
this is not a naming *void* — but a `title` tooltip never appears on keyboard focus and never appears on
touch, so on the platform where D-M8 already strips the visible identity, three of the four controls in the
pill are unlabelled to the eye and un-hinted to the finger.

**Extends intake R3-7a.** That row establishes fourier's Tooltip migration budget as *"35 Tooltip callsites
over nine consumers"* (FunctionInput, PaperSidebar, CoefficientsSpectrum, AnimationControls, BasisSelector,
CanvasControlsDock, ContourSettings, EditorControlsDock, VisualizationView) and carries it to **F.W3**.
`UserSlugBar` is **not** in that set — its four hints are raw HTML `title` attributes, not `Tooltip`
components, so a budget enumerated from `Tooltip` callsites is structurally blind to them. This is the same
class of miss R3-10 names (two dynamic families silently dropped between two registries built from one
tree): *an enumeration keyed to a component type cannot see the native-attribute sites doing the same job.*
F.W3 must count raw `title=` or it will migrate 35 sites and leave 4 behind in the header.

**Falsifier (ran, survived).** Dies if UserSlugBar appears in R3's nine files — it does not
(`lane-fourier-r3-r6.md:79`). Dies if the pill's title were redundant with visible text — the visible text
is the *abbreviation* (`:90`), the title is the *full slug* (`:87`); they are different information.

### D-M7 · The credential field has no password-manager affordance — MAJOR
`UserSlugBar.vue:129-136`

No `autocomplete`, no `name`, no `id`. A 17–40-character hyphenated string (measured: min
`icy-diving-ash-ox` = 17, max `iridescent-threading-champagne-jellyfish` = 40, mean 26.3, from
`api/lib/crud/slug_words.json` × `slugs.py:40-42`) is the user's whole identity, and the browser is told
nothing that would let it offer to save or fill it. The Copy button (`:91-102`) exists *because* this gap
exists — a manual clipboard ritual standing in for the credential storage the platform would have done for
free with one attribute.

glass-ui's `Input` takes `autocomplete`, `name`, `pattern`, `inputmode`, and `required` as first-class
props and forwards them (`dist/Input-DVG_J0ne.js` props block) — the hand-roll gave all five up.

**Falsifier (ran, survived).** Dies if a wrapping `<form>` supplies context — there is none; `:128` is a
bare `<div>`, and no `@submit` exists anywhere in the SFC. Dies if the field is not a credential —
`sessions.py:56-77` accepts the slug as the sole authentication factor.

### D-M8 · The mobile logged-in state communicates no identity whatsoever — MAJOR
`UserSlugBar.vue:86-112`

Below 640 px: the slug span is `hidden sm:inline` (`:90`), the pill's padding drops to `px-1` (`:86`), and
the `title` fallback (`:87`) is unreachable by touch. What remains is a generic `User` glyph and two
unlabelled buttons (D-M6). The pill's entire semantic payload — *who is signed in* — is present only in
the two channels a phone cannot render. A user cannot tell a signed-in state from a signed-out one at a
glance, cannot tell *which* account, and (D-B4) has no other route to the string.

The abbreviation is already only 7 characters (`j-n-o-r`, D-m2). It fits. Nothing forced it out.

**Falsifier (ran, survived).** Dies if another header element shows the identity — `AppHeader.vue:136-142`
is `[admin-badge?, UserSlugBar, DarkModeToggle]`; the admin badge (`:137`) is `galleryStore.adminMode`-gated
and shows a `Shield`, not a slug. Dies if `sm:` were a `pointer` query — it is a 640 px width breakpoint.

### D-M9 · The input's own boundary fails non-text contrast — MAJOR
`UserSlugBar.vue:134` (`border border-foreground/12 bg-card`)

Resting border `foreground` @12 % over `--card` measures **1.28 : 1** against the fill and **1.30 : 1**
against the page (`--background`). SC 1.4.11 requires 3:1 for "visual information required to identify user
interface components and their states". A text field whose edge is 1.28:1 against both of its neighbours is
a field the user locates by the placeholder alone — and the placeholder is at 1.73:1 (D-M4). Composed, the
control is a faint smudge in the header.

glass-ui's `.input-pill` resting edge is `1.5px solid var(--control-surface-border)`, which the source
annotates as deliberately re-baselined to ~15 % α precisely because *"the prior 8 % glass-wash floor …
vanished on cream"* (`dist/styles/glass/surfaces.css:198-211`). The system already diagnosed and fixed this
exact failure; the hand-roll re-introduced it at 12 %.

**Falsifier (ran, survived).** Dies if a shadow or ring supplies the boundary — `:134` has no `shadow-*`
and no `ring-*`. Dies if 1.4.11 exempts text inputs — it does not.

### D-M10 · Logout has no in-flight state and can be double-fired — MAJOR
`UserSlugBar.vue:62-65, 103-111`

`handleLogout` is `async` and awaits `logout()` → `deleteSession()` (`auth.ts:60-71`), a network round trip.
It never touches `loggingIn`, and the button (`:103-111`) carries no `:disabled`. The button also remains
mounted for the whole await (`isLoggedIn` only flips at `auth.ts:66`), so two taps issue two `DELETE`s. The
component tracks in-flight state for the *login* paths (`:17,142,151`) and simply forgot the third mutation.
Visually there is no busy affordance on any of the three — the sole cue is `disabled:opacity-disabled` from
the CVA base (`dist/button-BNDWhAZb.js:53`), i.e. a dimmed glyph, for an operation with a guaranteed
≥200 ms floor (`sessions.py:74`).

**Falsifier (ran, survived).** Dies if `logout()` is idempotent-guarded — `auth.ts:60-71` has no in-flight
memo; its `try/catch` swallows the second failure, which hides the symptom rather than preventing it.

### D-M11 · No error state lives in the component — MAJOR
`UserSlugBar.vue:41-44, 55-58, 129-136`

Failures exit exclusively through a transient toast (`:42,56`). The field is never marked: no
`aria-invalid`, no `:user-invalid` styling, no inline message, no retained error, and — because there is no
`pattern` and `canSubmit` (`:25`) checks only `trim().length > 0` — no client-side validation at all. Typing
`hello` costs a network round trip, a 0.2 s deliberate delay, and a toast reading "User not found"
(`sessions.py:77`) that never explains the required shape. The toast is titled with a generic `"Error"`
(`useToast.ts:16`) and its body is raw `e.message` — for a network drop the user reads `Failed to fetch`.

glass-ui 4.0.0 ships both halves of the cure and both are unused: `Input`'s `pattern`/`required` props, and
`useUserInvalidAria` exported from the same `./forms` subpath (`dist/forms.d.ts:4`).

**Falsifier (ran, survived).** Dies if `Toaster` renders inline near the field — it is a portal-mounted
global (`dist/Toaster-Bm_HQSpc.js`), so the message is spatially divorced from the control. Dies if the
shape were unknowable client-side — it is fixed and documented (`api/dependencies.py:32-34`).

### D-M12 · The header's right cluster has no shared optical scale, and its rhythm changes on login — MAJOR
`UserSlugBar.vue:86,120` · `AppHeader.vue:136,242,256`

Fine pointer, desktop root 16 px, same 6.75 px-gap cluster:

| state | UserSlugBar height | DarkModeToggle | ratio |
|---|---|---|---|
| logged **out** | ≈ 28 px (`sm:size-auto` + `sm:py-1`, content-sized) | 44 px | 1 : 1.57 |
| logged **in** | 24 px (`size-5` + `py-0.5`) | 44 px | 1 : 1.83 |

Two adjacent controls of equal standing at nearly double each other's optical mass — and the auth slot
*changes height between its own two states*, so the cluster's baseline rhythm shifts the moment a user logs
in. Neither number is derived from the `--control-h-*` cohort the design system exists to supply
(`dist/styles/tokens/offsets-sizing.css:143-152`); both are hand-picked rem literals. This is the
Aristotelian failure proper: not that any one element is wrong, but that no element is sized *in relation to*
its neighbours.

**Falsifier (ran, survived).** Dies if `size-5`/`size-10` do not override the CVA heights — tailwind-merge
3.6.0 places `size-*` in conflict with `w`/`h` and `props.class` is merged last (`dist/button-BNDWhAZb.js:37`),
so they do. Dies if DarkModeToggle were also 24 px — `AppHeader.vue:242,256` set `--toggle-size` to
2.5/2.75 rem, consumed at `DarkModeToggle.vue:78-79`.

### D-M13 · The field is too narrow to display the value it exists to accept — MAJOR
`UserSlugBar.vue:134` (`w-44 … px-2 text-sm fira-code`)

`w-44` = 11 rem. `.fira-code` resolves to Fira Code (`glass-ui dist/styles/typography/utilities.css:69-72`
→ `--font-mono` → `--font-stack-mono: "Fira Code", …`, `tokens/scheme-motion.css:46`), advance ≈ 0.6 em;
`--text-sm: 0.875rem` (`dist/styles/components.css:42`). Content width = 11 rem − `px-2` (1 rem) − 2 px
borders → **≈ 18.8 characters visible**, at either root size (the ratio is scale-invariant).

Measured slug corpus (`api/lib/crud/slug_words.json` via `slugs.py:40-42`, `_WORD_KEYS =
adjective-verb-color-animal`): **min 17, mean 26.3, max 40 characters**. So the typical credential is ~40 %
wider than its field and the worst case is 2.1× — the user can never see the whole string they are pasting
or typing, in a mono font chosen expressly so every character reads. `w-44` is fixed at every breakpoint, so
the desktop's abundant space buys nothing while the phone's scarcity (D-B1) is unrelieved.

**Falsifier (ran, survived).** Dies if Fira Code's advance is materially below 0.6 em — it is a
0.6-em-advance mono face; even at 0.55 em the visible run is 20.5 chars, still short of the 26.3 mean. Dies
if `--text-sm` were re-themed smaller — measured at 0.875 rem.

---

## §3 — MINOR

**D-m1 · The doc comment describes a slug shape the server retired.** `:27` — `/** Abbreviate
"jasper-newt-of-rampant-courage" → "j-n-o-r-c" */`, a five-token `coolname`-era example. `generate_slug()`
issues *exactly four* words (`api/lib/crud/slugs.py:40-42`) and `SLUG_PATTERN` enforces it
(`api/dependencies.py:34`); `dependencies.py:36-38` explicitly records `coolname` as legacy. Real output is
always `j-n-o-r`. *Falsifier:* dies if the login route accepted 5-token slugs — `sessions.py:71` looks up
`db.users._id`, populated only by `generate_slug`.

**D-m2 · The abbreviation is lossy, ambiguous, and displaces the credential.** `:28-31,90` — four initials
from four ≥64-word lists collide heavily and are not reversible; a 7-character cipher occupies the slot
where a truncated real slug (`text-ellipsis` on the actual string) would at least be *recognisable*. Paired
with D-B4 and D-M8 this is the mechanism by which the credential never reaches the user's eye.
*Falsifier:* dies if the full slug appears elsewhere in the logged-in UI — grep says it does not.

**D-m3 · Five `:size` props are inert, and the pill paints two different glyph scales.** `:89,99,100,110,145,156`
— glass-ui 4.0.0's CVA base carries `[&_svg:not([class*=size-])]:size-(--ui-glyph)`
(`dist/button-BNDWhAZb.js:53`), and CSS beats SVG presentational attributes. `Check`/`Copy`/`LogOut`/`LogIn`/`Dices`
have no `size-` class, so their `:size="12"`/`:size="14"` are dead and they paint at `--ui-glyph`
(16 px fine / 24 px coarse, `offsets-sizing.css:177`). The `User` glyph at `:89` is *outside* a Button, so its
`:size="12"` **does** apply — one pill, two glyph scales, 12 px beside 16–24 px.
`LogIn class="size-5 sm:size-3.5"` (`:124`) is the one site that used the documented escape hatch.
*Falsifier:* dies if lucide emitted inline `style` rather than attributes — it emits `width`/`height` attributes.

**D-m4 · Every control opts out of the `--ui-scale` comfort axis.** `:94,106,120,140,150` — `size-5`,
`size-7`, `size-10` are static rem literals that tailwind-merge strips the `h-(--control-h-*)` cohort in
favour of. glass-ui's sizing header states the intent plainly — *"the WHOLE library grows ~1.5× on touch
from ONE place"* (`offsets-sizing.css:136-142`). This component grows from nowhere, then gets the floor
imposed anyway (D-M1) — the worst of both regimes. *Falsifier:* see D-M12.

**D-m5 · `text-muted-foreground` redundantly overrides the ghost variant's own token.** `:94,106,120,150` —
`variant="ghost"` already ships `text-foreground/70` with matched hover/active/pressed rungs
(`dist/button-BNDWhAZb.js:65`); the consumer class wins and silently deletes the hover-colour transition the
variant defines. *Falsifier:* dies if tailwind-merge kept both — `text-*` colour is a single conflict group.

**D-m6 · A cross-modifier class conflict tailwind-merge cannot resolve.** `:120` — `sm:size-auto` (modified)
versus the CVA's `h-(--control-h-sm)` (unmodified). tailwind-merge only de-conflicts within matching modifier
sets, so **both survive into the DOM** and the winner is decided by Tailwind's emitted stylesheet order, not
by author intent. Fragile by construction. **UNPROVEN-NEEDS-LIVE (SS-13):** which declaration wins in the
built sheet. *Falsifier:* dies if tailwind-merge normalised across modifiers — v3.6.0 does not.

**D-m7 · `px-3` from `size="sm"` is never neutralised below the `sm:` breakpoint.** `:119-120` — `size-10`
fixes the box at 2.5 rem while the CVA's `px-3` (0.75 rem each side) survives unmodified below 640 px,
leaving a content box of 2.5 − 1.5 = 1 rem for an 18 px `size-5` glyph that `[&_svg]:shrink-0`
(`dist/button-BNDWhAZb.js:53`) forbids from shrinking. The glyph spills into its own padding. *Falsifier:*
dies if `sm:px-2.5` applied below 640 px — it does not, by definition of the modifier.

**D-m8 · Mobile keyboard hints are all absent.** `:129-136` — no `autocapitalize="none"`, `autocorrect="off"`,
`spellcheck="false"`, or `inputmode`. iOS auto-capitalises the first character of a text input by default, so
the user watches their lowercase credential render as `Jasper-…`. **Partially falsified, and downgraded for
it:** the round trip still succeeds, because `sessions.py:64` does `(body.get("slug") or "").strip().lower()`.
The defect is therefore cosmetic-plus-confidence (the field visibly disagrees with what was typed/pasted),
not functional. *Falsifier that ran:* read the login route; it lowercases. Kept as MINOR, not BLOCKER.

**D-m9 · Placeholder prose sets a register the rest of the surface does not.** `:132` —
`"your-slug-here 🐌"`. The emoji is announced ("snail") by screen readers reading placeholder text, adds
nothing to a format hint, and sits oddly beside a header whose own voice is `"Fourier analysis & orthogonal
decomposition"` (`AppHeader.vue:94`). *Falsifier:* dies if the emoji encoded meaning — it does not.

**D-m10 · One gap value separates two different kinds of thing.** `:86` — `gap-1` runs uniformly between
`[User glyph | slug text]` (identity) and `[Copy | Log out]` (actions). Equal spacing renders four items as
one undifferentiated run; proximity is the cheapest grouping signal available and the pill declines it.
*Falsifier:* dies if a separator or asymmetric margin existed — `:86-112` has neither.

**D-m11 · Toast prose is generic where it should be specific, and specific where it should be generic.**
`:40,54` are byte-identical `"Logged in!"` for two semantically different acts (D-B4); `:42,56` surface raw
`e.message`, i.e. `Failed to fetch` on a network drop; titles come from a three-entry
`TITLE_MAP = {Error, Info, Success}` (`useToast.ts:15-19`), so a destructive auth failure and a validation
nit read identically. *Falsifier:* dies if `TITLE_MAP` were per-call-site overridable — `addToast`
(`useToast.ts:21-28`) hard-binds title from type.

---

## §4 — INFO (records, not defects — logged so a later lane does not re-raise them)

**D-i1 · Two unreachable guards.** `:29` (`if (!userSlug.value) return ""`) and `:87` (`?? ''`) can never
fire inside the `v-if="isLoggedIn"` branch, since `isLoggedIn = computed(() => !!userSlug.value)`
(`auth.ts:21`). Harmless; noted because it reads as uncertainty about an invariant the store guarantees.

**D-i2 · `showLogin` is not reset on an external auth flip.** `auth.ts:73-82` `ensureUser()` can log a user
in from elsewhere while this form is open; `showLogin` stays `true`, hidden behind `v-else` (`:115`), and
resurfaces as an open empty form on the next logout instead of the "Log in" trigger. Narrow path; recorded.

**D-i3 · WCAG 2.5.8 passes, by the spacing exception — do not re-raise.** Desktop `size-5` targets are
20 px (< 24 px minimum) but `gap-1` puts their centres 24 px apart, so the 24 px-diameter exception circles
are tangent, not intersecting. At mobile root 18 px the numbers are 22.5 px / 27 px — clearer. Under coarse
pointer the floor makes it moot (D-M1). **This is a PASS**; the real target-size story is D-M1's blowout,
not an undersized-target violation.

**D-i4 · `--touch-target: 2.75rem` is not 44 px in this app.** glass-ui annotates the token `/* 44px */`
(`offsets-sizing.css:461`), which assumes a 16 px root. fourier sets `html { font-size: 1.125rem }` below
768 px (`style.css:41-43`), so the floor resolves to **49.5 px** on every phone. Correct direction, 12 %
past the intended magnitude, and it compounds D-B1/D-M1. App-wide, not UserSlugBar's fault — filed here
because this is where it bites hardest.

**D-i5 · `catch (e: any)` twice.** `:41,55`. Type-hole rather than a design defect; carried for the axis
that owns it.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

**D-S1 · The scoped transition is reduced-motion-correct without a local media query — and its own comment
verifies TRUE.** `:163-167` claims *"named properties + canonical tokens, no `transition: all`"*. Checked
against the tree: it transitions exactly `opacity` and `transform` with `var(--ease-standard)`, a real
glass-ui token (`dist/motion-curves.js:58`). glass-ui's PRM guard rewrites
`transition-property: opacity, color, background-color, border-color, box-shadow !important` and clamps the
duration to 0.1 s (`dist/styles/utilities/a11y-overrides.css:6-18`) — which **strips `transform` and keeps
`opacity`**, i.e. the icon swap degrades to a pure cross-fade under `prefers-reduced-motion` with no local
`@media` block at all. A component that used `transition: all` or a raw cubic-bezier would have defeated
that guard. This one composes with it exactly. *Falsifier that could have killed it:* if the guard did not
enumerate `transition-property`, the local rule would need its own media block — it does enumerate it.

**D-S2 · The `useClipboard` migration is real and its provenance comment is accurate.** `:19-23` claims a
migration from *"bare `navigator.clipboard.writeText` + manual `copied` ref + setTimeout"* to the glass-ui
composable, with *"1.5 s reset preserved from HEAD"*. Verified: `useClipboard({ resetMs: 1500 })` matches
the composable's documented default and semantics (`dist/composables/dom/useClipboard.d.ts:22-36`), and the
composable adds an `exec-command` fallback and an SSR-safe `no-api` arm the hand-roll did not have. The
comment is a truthful, dated, falsifiable provenance note — the standard the rest of the corpus asks for.
(That the call site then ignores the error channel is D-M2; the migration itself is a genuine improvement.)

**D-S3 · The one place the component reads tokens instead of literals, it lands on AA.** `:86` —
`text-muted-foreground` on `bg-foreground/3` computes to **4.91 : 1** in light theme, clearing SC 1.4.3 and
reproducing glass-ui's own annotation for that pairing ("4.90:1 vs muted", `color-radius.css:45`) to within
rounding. Every contrast failure in this file (D-B2/D-M4/D-M9) comes from an *alpha-diluted* token
(`/40`, `/30`, `/12`); every contrast pass comes from an *undiluted* one. That is a crisp, actionable rule
for F.W1 and it was derived from this component's own good case.

**D-S4 · The field is properly labelled.** `:133` — `aria-label="User slug"`, so the accessible name does
not depend on the placeholder. Placeholder-as-label is the single most common form-a11y failure and it is
absent here; the field's a11y defects (D-B2/D-M4/D-M7/D-M11) are all *downstream* of a correctly named
control, which makes them cheap to fix.

**D-S5 · Two of the three glass imports are uplift-safe, and one of them is the non-obvious one.** `:4`
`@mkbabb/glass-ui/button` survives as an export subpath in 7.0.0 (`glass-ui/package.json:289`), and `:5`
`useClipboard` — a **bare-root** specifier, precisely the shape CENSUS C-7 flags as the value.js breakage
class — is still root-exported at 7.0.0 (`glass-ui/src/index.ts:424`). The component's import surface is
narrower and better-chosen than the census's break-surface list would predict (see §7).

---

## §6 — Candidate findings that DIED on their own falsifiers (recorded per L-18)

1. **"iOS autocapitalisation breaks login."** Looked like a mobile BLOCKER: no `autocapitalize`, no
   client-side `.toLowerCase()` (`:37` trims only), and a server pattern of `^[a-z]+(-[a-z]+){3}$`.
   **Killed by `api/routers/sessions.py:64`**, which does `.strip().lower()` before lookup. Survives only as
   the cosmetic D-m8.
2. **"Undersized tap targets violate WCAG 2.5.8."** Killed by the spacing exception arithmetic — see D-i3.
   Recorded as a PASS so a later lane does not spend budget on it.
3. **"`abbreviatedSlug` crashes or prints `undefined` on a malformed slug."** `"a--b".split("-")` yields an
   empty token, `w[0]` is `undefined`, but `Array.prototype.join` coerces `undefined` to `""` — output
   degrades gracefully. Not a defect. (And `generate_slug` cannot emit one.)
4. **"The scoped transition is missing a `prefers-reduced-motion` guard."** Killed by
   `a11y-overrides.css:6-18` — became superlative D-S1 instead.

---

## §7 — F.W1 tri-package uplift: what breaks, what improves
*(glass ^4.0.0 installed / producer 7.0.0 — CENSUS `:184-186`. Evidence: `/Users/mkbabb/Programming/glass-ui`
@ `e286d992`, `package.json` version 7.0.0, read-only.)*

### 7a — HARD BREAKS

| # | site(s) | 4.0.0 | 7.0.0 | verdict |
|---|---|---|---|---|
| U-1 | `:93, :106, :139, :149` — `size="icon"` ×4 | `ButtonVariants['size']` includes `"icon"` / `"icon-sm"` (`dist/components/ui/button/index.d.ts:5`) | `ButtonSize = Extract<Size, "xs"\|"sm"\|"md"\|"lg">` (`glass-ui/src/components/button/Button.vue:16`) | **HARD `vue-tsc` break ×4.** Cure = `icon-only` + a size rung. |
| U-2 | `:92, :105, :118` `variant="ghost"` · `:138, :148` `variant="outline"` | `variant` is a first-class prop with 13 values (`button.d.ts`) | **`variant` does not exist.** The axis is `emphasis: "primary"\|"secondary"\|"quiet"\|"text"` × `tone: Tone` (`Button.vue:15,18-31`) | **SILENT VISUAL BREAK ×5** — Vue treats unknown props as fallthrough attrs, so `variant="ghost"` lands as a dead DOM attribute and all five buttons repaint as the `emphasis="secondary"` default glass. `ghost → emphasis="quiet"`, `outline → emphasis="secondary"`. **UNPROVEN-NEEDS-LIVE:** whether `vue-tsc` flags it; the runtime consequence is source-certain. |
| U-3 | `:7` → `useToast.ts:4` `type ToastVariant` | exported from `./toast` | **definition-absent**: `grep -rn "ToastVariant" glass-ui/src` → **0 hits** | **HARD typecheck break** — CENSUS `:104` lands on this component *transitively* through its toast adapter. |
| U-4 | `:8` `lucide-vue-next` (1 statement, 6 symbols) | `lucide-vue-next ^1.0.0` (`web/package.json:35`) | `@lucide/vue` rename, CENSUS `:185` (35 sites) | mechanical; this file is 1 of the 35. |

### 7b — THE SILENT REGRESSION NOBODY WILL TYPECHECK

Two coupled behaviours vanish with the CVA:

- **Glyph sizing.** 4.0.0's base class carries `[&_svg:not([class*=size-])]:size-(--ui-glyph)`
  (`dist/button-BNDWhAZb.js:53`). 7.0.0's `hostClass` is `cn("button tap-squish focus-ring", …)`
  (`Button.vue:66-73`) — **no svg rule**. The five inert `:size` props of D-m3 therefore go **live** after
  the uplift, and every glyph in the pill shrinks from 16 px (fine) / 24 px (coarse) to a hard-coded 12–14 px.
  No typecheck sees it. **Fix D-m3 before the uplift, not after.**
- **The WCAG 2.5.5 floor moves attributes.** 4.0.0 keys the coarse floor to `[data-size="icon"]`
  (`a11y-overrides.css:115-121`). 7.0.0 keys it to `[data-control-target]`
  (`glass-ui/src/styles/utilities/responsive.css:3-8`), which `Button` stamps **only when `iconOnly`**
  (`Button.vue:89`). A migration that maps `size="icon" → size="xs"` and drops `iconOnly` **silently deletes
  the touch floor from all four buttons** — curing D-M1's blowout by accident while re-introducing a genuine
  2.5.5 failure. The correct mapping is `icon-only size="xs"`.

### 7c — WHAT THE UPLIFT FIXES FOR FREE

- **`loading` + `aria-busy`** (`Button.vue:27,93`, with activation suppressed while in flight, `:41-44,74-77`)
  is the exact affordance missing in D-M5 and D-M10. `:loading="loggingIn"` replaces `:disabled="loggingIn"`
  and adds the SR-visible busy state at zero cost.
- **`data-control-target`** on `iconOnly` gives the pill a *declared* touch contract instead of an inferred one.

### 7d — CENSUS BREAK-SURFACE ROLL-CALL (explicit non-findings)

Of the four named surfaces at CENSUS `:102-104` — `metric-badge` (×7 files), `hover-card` (×2),
`hover-popover` (×2), dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1), `ToastVariant` — this
component touches **only `ToastVariant`**, and only transitively. Zero occurrences of the other four
(verified: the file's entire external surface is `:2-8`). Recorded so the F.W1 budget is not padded with
this file. Note also C-4's correction (metric-badge is **7 files**, not 6) does not move here.

---

## §8 — Ordered repair sequence (for the wave that owns this)

1. **D-B1** — give `:128-157` the responsive treatment `:116-126` already has: `w-full sm:w-44` inside a
   `min-w-0` cluster, or promote the form out of the header on small viewports.
2. **D-B2 + D-M9 + D-M11 + D-M7** — one move: replace the hand-rolled `<input>` (`:129-136`) with glass-ui
   `Input` from `@mkbabb/glass-ui/forms`, passing `autocomplete`, `name`, `pattern`, `required`, and pair it
   with `useUserInvalidAria`. Four defects, one import.
3. **D-B4 + D-M3 + D-M2** — surface the credential: pass `useToast`'s existing `slug` option on the
   `handleGenerate` path, correct the prose, and route `copy()`'s `CopyResult`/`onCopyError` to a toast.
4. **D-B3** — `useTemplateRef` + `nextTick().focus()` on open; restore focus to the trigger on Escape/close.
5. **D-m3 before F.W1** (§7b), then the U-1/U-2/U-3 migrations, then **D-M5/D-M10** via 7.0.0's `loading`.
6. **D-M1 + D-M12 + D-m4** — re-derive all geometry from `--control-h-*` / `icon-only` so the pill and the
   DarkModeToggle share one scale and one comfort axis.

**Standing caveat (CENSUS `:256-258`, P2).** vitest is ABSENT from this repo; the only gates are `vue-tsc`
and 29 single-Chromium Playwright tests. Of the 28 defects above, `vue-tsc` can see **one** (U-1). Every
other repair here is unguarded by any automated net — plan the wave accordingly.
