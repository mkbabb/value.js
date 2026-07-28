# CHALLENGE-C · `demo/shell/dock/menus/ProfileSection.vue` — the implementation is defective

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`), the tier this seat was
explicitly spawned with. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** Eleven findings, two of them BLOCKER, all but two carrying a live reproduction
against `http://localhost:9000` (branch `tranche-u`, working HEAD `4f78e57b`).

The headline: **this component owns the app's dark-mode flip control, and pulling it leaves every
certified ink in the application ONE FLIP BEHIND the scheme it is certified against — permanently,
until reload.** The whole D6/A11Y-F2 apparatus this file's own header comment invokes (lines 22–27)
is defeated by the control three lines below it (line 167).

Probe scripts (evidence, re-runnable):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/psec-probe-{a,b,c,d,e,f}.mjs`

---

## C-1 · BLOCKER — the runtime dark flip leaves every certified ink ONE FLIP BEHIND

**Repro** (`psec-probe-d.mjs`, chromium 1440×900, dev server at :9000): boot light → open the
`@mbabb` menu → click **Dark mode** → Escape → read `--accent-live` and the trigger ink. Repeat.

| # | state | `--accent-live` (the app-wide certified resting ink) | ProfileSection trigger ink (`triggerInk`) |
|---|---|---|---|
| 1 | light, cold boot | `oklch(47.118925176164% 0.188447570516 9.834deg)` | `oklch(0.471189 0.188448 9.83402)` |
| 2 | **runtime flip → dark** | `oklch(47.118925176164% 0.188447570516 …)` — **byte-identical to light** | `oklch(0.854068 0.0812368 …)` |
| 3 | **runtime flip → light** | `oklch(95.832172477266% 0.021053120065 …)` — **the DARK ink, on a LIGHT app** | `oklch(0.484064 0.0210531 …)` |
| 4 | runtime flip → dark | `oklch(95.832172477266% 0.021053120065 …)` (right, by alternation only) | `oklch(0.958322 0.0210531 …)` |

Cold-boot references for comparison (`psec-probe-a.mjs` step E, `psec-probe-c.mjs` step 4):
dark cold boot = `oklch(95.83% 0.0211 …)`, light cold boot = `oklch(47.12% 0.1884 …)`. State 3 above
is a **light** application carrying a near-white, chroma-dead (`C 0.021`) ink as its certified
accent — the exact "cream collapse" the D6 header at `useContrastSafeColor.ts:283-290` says the
apparatus exists to prevent. `--ink-ambient-l` is `0.7900` in every state, so the ambient is not the
variable; the scheme is.

Reproduced by four independent paths: mouse click (probe a, c, d), the same row twice more (probe d
states 3–4), and **keyboard** `Enter` on the row (probe f step 4 — `darkBefore:false → darkAfter:true`,
`accentLive` still `47.118925176164%`).

**Mechanism.** `useContrastSafeColor.ts:239-251`:

```ts
const liveTintCache = new Map<InkSurface, TintCacheEntry>();
function resolveLiveTintCached(surface: InkSurface): SurfaceTint | undefined {
    const darkClass = document.documentElement.classList.contains("dark");   // :242
    const epoch = probeEpoch.value;
    const hit = liveTintCache.get(surface);
    if (hit && hit.darkClass === darkClass && hit.epoch === epoch) return hit.tint;
```

The validity key is read **imperatively, at compute time**, from the DOM. `toggleDark()` sets the
vueuse `useDark` ref; vueuse writes the `dark` class from a **post-flush** watcher, while every
consuming `computed` is pulled by a **pre-flush** render effect — so the read at `:242` always sees
the *outgoing* scheme, the stale entry validates, and it is re-stamped with the outgoing key. No
tracked dependency changes afterwards (`probeEpoch` is only bumped `onMounted`), so nothing ever
re-drives: the certification stays one flip behind until a reload. The comment at `:230-232`
("a probe that raced a scheme flip self-corrects on the next reactive recompute") is empirically
false — measured stale across three consecutive flips and a subsequent colour nudge (probe b, B2/B3).

**Cure (gestalt, not patch).** Glass 7 already ships the exact instrument this needs —
`useGlobalDark().onFlipSettled(cb)`, documented in
`node_modules/@mkbabb/glass-ui/dist/composables/dark/useGlobalDark.d.ts` as "the post-flip SETTLE
hook … runs in ONE coalesced task AFTER each dark↔light flip's instant chrome paint". Register it
once, module-level, in `useContrastSafeColor.ts`:

```ts
useGlobalDark().onFlipSettled(() => probeEpoch.value++);
```

Then **delete the `darkClass` key at `:242` entirely** — the epoch becomes the sole validity truth.
That one transposition (a) fixes the staleness at the source for all nine `useSafeAccentFn` call
sites, (b) removes the *fifth* uncoordinated dark reader named in MT-F009, and (c) needs no change in
this component. What ProfileSection owes is not to be the control that strands the app.

---

## C-2 · BLOCKER — `variant="outline"` / `variant="ghost"` are DEAD PROPS under Glass 7

Glass 7's `Button` has **no `variant` prop**. Its axes are `emphasis` / `tone`
(`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:5-19`, and the compiled
props object in `dist/button-Bu9F4uU6.js`: `emphasis`, `tone`, `size`, `iconOnly`, `loading`,
`type`, `disabled`, `class`, `asChild`, `as` — no `variant`).

This file passes `variant` three times: `:60` (`outline`, the Profile trigger), `:112` (`outline`,
the Login trigger), `:136` (`ghost`, the `@mbabb` wordmark). All three fall through as a raw HTML
attribute. Measured live (`psec-probe-a.mjs`, the Login trigger's own attribute list):

```
"data-slot=\"button\"", "data-emphasis=\"secondary\"", "data-tone=\"neutral\"", "data-size=\"xs\"",
"class=\"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover gap-1.5 …\"",
"variant=\"outline\"",                       ← a literal, inert DOM attribute
```

`document.querySelectorAll('[variant]').length` = **2** on the unauthenticated home route. The
buttons render as `data-emphasis="secondary"` **wash capsules** — the glass default — not an outline
and not a ghost. The visual consequence is in the repo's own capture:
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/picker.png` — `Login` and
`@mbabb` are painted as the *same* filled pill, so the `@mbabb` "WORDMARK, not a section eyebrow"
(the S.W7-6 intent asserted at `:130-134`) reads as just another button, and the accent Login
control has no outline register to distinguish it from it.

Two riders:

- **The comment is now fiction.** `:103-110` reasons at length about "the outline variant paints its
  border via inset highlight shadows (`border: none 0px`)". That variant no longer exists; the
  comment describes a Glass-6 artefact and will mislead the next reader.
- **Half of the `:style` binding is inert.** `:63` / `:115` write `borderColor: triggerInk` on a
  button whose measured `border-top-width` is `0px` in every state (probes a/b/c/d). The same
  binding *is* live on `.slug-pill` (measured `border-top-width: 1px`, `psec-probe-e.mjs` step 2) —
  so the file carries one live and one dead use of the identical idiom.

**Vacuous gate.** The hard CI typecheck does not see any of this:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
$ echo $?
0
```

(no output, exit 0 — undeclared props on a component are fallthrough attributes and are not
type-checked). Repo-wide blast radius: `grep -rn 'variant="' demo --include="*.vue" | wc -l` → **103**.

**Cure.** Replace with the Glass 7 axes at all three sites (`emphasis="secondary"` + the certified
ink for the two triggers; `emphasis="text"` for the wordmark so it stops painting a capsule), delete
the `:103-110` comment, delete the dead `borderColor` channel. Repo-wide this is one mechanical
sweep — but it must be a sweep, not 103 local patches.

---

## C-3 · MAJOR — one click destroys the user's identity, silently, with the API unreachable

`:87` — `@click="pm.onRegenerateSlug()"`. A destructive, un-confirmed, floating promise: no
`await`, no `.catch`, no pending/disabled state, no announcement.

**Repro** (`psec-probe-e.mjs`): seed `localStorage['palette-user-slug']='audit-seat-c'`, abort every
off-origin request (the API is cross-origin here — the app itself logs
`value.js dev is MISCONFIGURED … targeting the cross-origin production API`), open the Profile menu,
click **Regenerate slug**. Measured after 2.5 s:

```json
{ "rejections": [...], "slug": null, "dialogOpen": false,
  "liveRegions": ["off:92.0%","off:88.8","off:20.0","off:82.7%"], "triggerStillThere": true }
```
```
warning: [Vue warn]: Unhandled error during execution of native event handler
  at <Primitive data-reka-collection-item="" role="menuitem" tabindex="-1" …>
```

- `localStorage['palette-user-slug']` is **null** — the identity is gone. `useUserAuth.regenerate()`
  (`demo/platform/auth/useUserAuth.ts:112-127`) removes the slug and clears the token **before**
  `createSession()`, and `useSlugMigration.onRegenerateSlug()` (`:101-103`) awaits it with no
  `try`/`catch` on the zero-saved-palettes branch. The slug is the key to the user's published
  palettes; there is no recovery path in the UI.
- **No feedback at all**: no dialog, no error copy, no `aria-live` region announcing anything (the
  only live regions on the page are the picker's channel readouts, all `aria-live="off"`).
- **The UI lies**: `triggerStillThere: true` — the trigger still reads "Profile" because the slug
  *ref* is deliberately not nulled ("avoids UI flash", `useUserAuth.ts:118`). The user sees an
  intact account that no longer exists on reload.

`:83` `pm.userLogout()` is the same unguarded shape; it happens to be safe only because
`logout()` swallows internally (`useUserAuth.ts:85-93`).

**Cure.** The port must create-then-swap (never clear-then-create) — that is the owning seat's fix.
This component's own duty: destructive rows go through the migrate dialog the file's neighbours
already use (`useSlugMigration` owns `showMigrateDialog`; the >0-palettes branch already routes
through it — the zero-palettes branch simply skips it), and the row must surface failure. No new
wrapper, no new dir: the dialog exists.

---

## C-4 · MAJOR — the Dark-mode row is a checkbox rendered as a command

`:167-177`. Measured (`psec-probe-a.mjs` step B, the rendered menu):

```json
{ "tag": "div", "role": "menuitem", "text": "Dark mode", "ariaChecked": null, "w": 200.6, "h": 44 }
```

`role="menuitem"`, `aria-checked: null`. The *only* carrier of on/off state is the `Moon`/`Sun`
glyph — and that glyph is correctly `aria-hidden="true"` (`:174-175`). A screen-reader user is
handed a command called "Dark mode" whose state is unknowable and whose activation announces
nothing.

**Cure — and it dissolves D58.i/mark M1 too.** `DropdownMenuCheckboxItem` is already exported by the
very barrel this file imports on `:9-12`
(`demo/ui/dropdown-menu/index.ts`) and renders reka's `role="menuitemcheckbox"` + `aria-checked`:

```vue
<DropdownMenuCheckboxItem :model-value="isDark" @select.prevent @update:model-value="toggleDark()">
```

That is the right primitive, it is already in the file's import surface, and it means value.js does
**not** need Glass to ship a `passive` `DarkModeToggle` variant — the outstanding W47 ask (mark M1)
can be withdrawn rather than folded. The decorative glyph stays as ornament.

---

## C-5 · MAJOR — the "chrome" live probe is DEAD under Glass 7; guard and gate agree on a ground neither measures

`useContrastSafeColor.ts:151-153` is the instrument behind this component's `triggerInk`:

```ts
if (surface === "chrome") {
    const dock = document.querySelector<HTMLElement>(".glass-dock");
    if (dock) bg = getComputedStyle(dock).backgroundColor;
}
```

Measured, all four states (probes c and d): `getComputedStyle('.glass-dock').backgroundColor` =
**`rgba(0, 0, 0, 0)`**. The band's material is painted by a *child*, `.dock-plate`:
`color(srgb 0.931227 0.845921 0.816039 / 0.5392)` light, `color(srgb 0.376885 0.293161 0.253837 / 0.5776)`
dark. Transparent → `resolveCssColorAlpha` returns `alpha 0` → `resolveLiveTint` returns `undefined`
→ **the static producer MODEL silently serves for every `useSafeAccentFn("chrome")` consumer**. That
is verbatim the failure the `:56-66` comment says the epoch machinery was built to end ("the
light-scheme profile trigger certified against the model's 0.90 while the REAL band composited
0.75 — 3.59:1 measured"). Glass 7 moved the paint; the selector-based probe died silently, because
its failure mode is a silent fallback.

Worse, the gate is blind the same way. Measured ancestry of the trigger (`psec-probe-d.mjs` step 1):
every ancestor from `button` up to `body` is `rgba(0, 0, 0, 0)`, and `plate.contains(login)` is
**`false`** — `.dock-plate` is a sibling layer, not an ancestor. The O-18 census
(`e2e/smoke/oracles/o18-contrast-census.spec.ts:142-172`) composites **ancestor** backgrounds over
`oklch(--ink-ambient-l 0 0)`, so for every dock control its ground is a flat neutral grey `0.79` —
**the same in light and dark** (`--ink-ambient-l` measured `0.7900` in both). The census therefore
certifies the profile trigger against a ground that is not painted, in a scheme it cannot
distinguish.

**Cure.** The chrome referent must be read off the element that actually paints
(`.glass-dock .dock-plate`, or better: glass-ui publishes the band's composited tint as a token the
consumer reads — the "tiers publish effective lightness" stake D6 already declares), and the probe
must **fail loudly** when it resolves α=0 instead of degenerating to the model. A silent fallback in
a contrast guard is a defect generator, not a safety net.

---

## C-6 · MAJOR (vacuous gate) — nothing tests this component

- No unit test: `grep -rln "ProfileSection" test/ demo/test/` → nothing.
- The only automated coverage is one contrast row in
  `e2e/smoke/oracles/o18-contrast-census.spec.ts:629-630` (`[data-o18="profile-trigger"]`) plus the
  `.slug-pill`. It is scheme-**cold**: `test.use({ colorScheme: scheme })` boots each scheme
  fresh (`:590-592`), so C-1 — the defect this component's own control causes — is invisible by
  construction. Its ground model omits the band painter (C-5).
- Zero coverage of: the Dark-mode row, Logout, Regenerate slug, Switch account, Copy slug, Share
  color, the admin pill branch, the logged-out Login branch (which carries the same ink and has no
  `data-o18` hook, so the census never sees it).

**Mutations that keep every gate green** (the vacuous-gate proof):
1. swap `Moon` and `Sun` at `:174-175` (state glyph inverted);
2. `@click="toggleDark()"` → `@click` at `:167` (the control does nothing);
3. delete `borderColor: triggerInk` from `:63`/`:115` (already inert);
4. `variant="outline"` → `variant="banana"` (typecheck exits 0, see C-2);
5. `useSafeAccentFn("chrome")` → `useSafeAccentFn("floating")` at `:28` (the census ground can't tell).

---

## C-7 · MINOR — `text-foreground/70` is the retired post-hoc-alpha idiom

`:138`. Measured raw ink: `oklab(0 0 0 / 0.7)` light, `oklab(0.999994 0.0000455677 0.0000200868 / 0.7)`
dark (probe b). The repo retired exactly this: `useContrastSafeColor.ts:317-319` — "the plate-caption
/ parse-echo voice; **post-hoc opacity de-emphasis is retired**" — and the O-18 census asserts
caption/echo *identity* with the certified `--ink-muted` token. The wordmark is the same de-emphasis
role wearing the abolished mechanism, and it is uncensused. Already booked once at
`docs/tranches/T/audit/w3-ink-lane-record.md:125` and never landed.
**Cure:** `color: var(--ink-muted)` (or the `chrome`-rung certified muted ink), no alpha.

---

## C-8 · MINOR — the avatar has no fallback and reaches a third-party host

`:145-147`. **Repro** (`psec-probe-e/c`): abort `https://avatars.githubusercontent.com/**`, open the
menu. Measured: `imgComplete: false`, avatar box `28×28`, rendered subtree —

```html
<span class="glass-avatar w-7 h-7" data-size="sm" data-shape="circle" data-identity="decorative">
  <span class="glass-avatar__identity" aria-hidden="true"><img role="img" src="https://avatars…">
```

— i.e. an empty circle, no `AvatarFallback`, forever. `AvatarFallback` is exported by the very
barrel imported at `:13` (`demo/ui/avatar/index.ts`) and unused. The hard-coded absolute URL
`https://avatars.githubusercontent.com/u/2848617?v=4` appears in two files (here and
`MobileMenuDropdown.vue:81`). (`decorative` itself is *correct* usage of Glass 7's
`AvatarIdentityProps` discriminated union — that part is sound.)

---

## C-9 · MINOR — the mobile twin has silently drifted

`MobileMenuDropdown.vue:21-22` claims "the desktop twin's cure, **verbatim** (ProfileSection.vue)".
It is not verbatim:

| | ProfileSection | MobileMenuDropdown |
|---|---|---|
| admin identity | `:96` `gold-shimmer`, `var(--color-gold)` | `:67` `--muted-foreground`, no shimmer |
| separator before "Regenerate slug" | `:86` yes | none |
| trigger ink rung | `chrome` + `floating` (two) | `floating` only |

The same application state renders two different identities depending on viewport. Two 90 %-identical
SFCs with an untracked delta is the copy-paste defect generator; the state (`pm.userSlug` /
`isAdminAuthenticated` / share / dark) is identical and the *rows* are the same rows.
**Cure:** one row set, one component, the responsive difference expressed as the trigger + the rung —
not a second file.

---

## C-10 · INFO — two import paths to one design system, in one file

`:6` `@mkbabb/glass-ui/dock`, `:8` `@mkbabb/glass-ui/dark` — direct. `:7`, `:9-12`, `:13` —
`../../../ui/button`, `../../../ui/dropdown-menu`, `../../../ui/avatar`, each a one-line re-export
of the same package (`demo/ui/button/index.ts` is literally
`export { Button } from "@mkbabb/glass-ui";`). That is the alias / dual-path the no-legacy edict
forbids, already booked as "architecturally a pass-through shim" at
`docs/tranches/N/audit/lanes/E2.md:132`. One file, both idioms.

---

## C-11 · INFO — `inject(SESSION_PORT_KEY)!` and the two-instrument setup

`:42` non-null-asserts an injection; absent provider ⇒ `Cannot read properties of undefined` at
render, not a named wiring error (`useSafeAccentFn` at least documents "a missing provider is a
wiring defect, surfaced loudly" — it isn't, it is the same `!`). And `:28-29` constructs
`useSafeAccentFn` twice, so this one component calls `useGlobalDark()` twice, injects
`INK_AMBIENT_KEY` twice and registers two `onMounted` epoch bumps — each bump invalidating the
**global** `liveTintCache` for every surface. Cheap today (9 call sites); it is the kind of
whole-cache invalidation that stops being cheap quietly.

---

## Negative proofs — what I attacked and could NOT break

Recorded so the next seat does not re-spend the probes:

- **Keyboard operability is sound.** `Enter` on the `@mbabb` trigger opens; `ArrowDown` walks to
  "Dark mode"; `Enter` activates it (`darkBefore:false → darkAfter:true`, probe f step 4); `Escape`
  closes and **restores focus to the trigger** (probe b step A3: `{tag:"BUTTON", text:"@mbabb"}`).
- **The popup mutex swap works.** Profile open → click `@mbabb`: at +400 ms the Profile trigger is
  `data-state="closed"` and `@mbabb` is `open`, stable at +2.0 s (probe f steps 1–3). The 180 ms
  `swapDelay` in `usePopupMutex` does not strand the second menu, and the `defineModel` →
  `WritableComputedRef` round-trip (`:39-40` into `Dock.vue:73-74`) never round-trips back into a
  read here — the models are write-only into reka. No stale-read hazard.
- **Tap targets pass.** Profile trigger `106.7×28`, Login `86.5×28`, `@mbabb` `76.6×28`, menu rows
  `44` tall. All ≥24 px; this component contributes **zero** rows to the visual REPORT's
  `smallTapTargets` (the 8 on `/#/` are the SlugEditLayer 22×22 trio and the 12×24 channel spans —
  `REPORT.json` `results[0].probe.a11y.smallTapTargets`).
- **All menu items are named**; this component contributes zero to `namelessButtons`.
- **No rAF loop, no listener, no observer, no timer, no async in this file** — nothing to leak, and
  no PRM-RAF exposure. No `ValueUnit` wrapping. No `parseCssColor` call. No WebGL.
- **No page errors** originate here (`pageerrors: []`, probe b) and the only console errors on the
  route are the dev API-misconfiguration warning.
- `Avatar decorative` is correct Glass 7 usage (the `AvatarIdentityProps` union).
- `verbatimModuleSyntax` is satisfied: the file has no type-only import to mark.

---

## Ranked

| id | severity | one line |
|---|---|---|
| C-1 | BLOCKER | runtime dark flip leaves every certified ink one flip behind, until reload |
| C-2 | BLOCKER | `variant="outline"`/`"ghost"` are dead props under Glass 7 — 3 sites here, 103 in demo/ |
| C-3 | MAJOR | one un-confirmed click destroys the user slug with no feedback when the API is down |
| C-4 | MAJOR | the Dark-mode row is a checkbox rendered as `role="menuitem"`, `aria-checked` null |
| C-5 | MAJOR | the `chrome` live probe reads `.glass-dock` (α=0) — silently degenerates to the model |
| C-6 | MAJOR | no test would fail if this component broke — five green-keeping mutations named |
| C-7 | MINOR | `text-foreground/70` — the retired post-hoc-alpha de-emphasis idiom |
| C-8 | MINOR | avatar: no fallback, empty circle on network failure; hard-coded third-party URL |
| C-9 | MINOR | the mobile twin has drifted from the "verbatim" copy it claims to be |
| C-10 | INFO | two import paths to one design system inside one file |
| C-11 | INFO | `inject(...)!`; two live-ink instruments per component, global cache invalidation |
