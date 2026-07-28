# CHALLENGE-C · `demo/shared/ui/EmptyState.vue` — implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. Seat declared, not inherited.

## Scope + method

Subject: `demo/shared/ui/EmptyState.vue` (105 lines, 8 live consumers). Read whole, plus its
dependency (`@mkbabb/glass-ui@7.0.0` `WatercolorDot`), its consumers, its style contract, and its
only two covering oracles. Live probes driven against `http://localhost:9000` with Playwright
(WebKit **and** Chromium, 1440×900), plus pixel-decoded contrast measurement (PIL 12.1.1).

Probe scripts (scratchpad, not repo):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/probe-{empty,focus,retry,deadlock,isolate,state,perf,contrast,contrast2}.mjs`

**Verdict: DEFECTIVE.** One BLOCKER (a user-reachable dead-end that survives SPA navigation), three
MAJOR, seven MINOR/INFO. Four hypotheses tried and refuted — recorded below so the next seat does
not re-spend them.

---

## C-1 · BLOCKER — activating **Retry** annihilates the Browse pane; the error plate never returns

**Reproduction** (deterministic, WebKit *and* Chromium):

```
1. http://localhost:9000/#/browse   (the commons load fails → EmptyState variant="error")
2. focus the "Retry" button, press Enter
3. wait 3s
```

**Measured result** (`probe-state.mjs`, Chromium — WebKit identical):

```
BEFORE: bodyChildElements: ["DIV[input-bar search-seated]", "DIV[grid gap-3 pb-3]"]
        browseError: "Failed to load palettes"   browsing: false   displayedBrowseLen: 0
        → alerts:1  retryButtons:1  paneText:"Browse … The commons is unreachable. Failed to load palettes Retry"

AFTER : bodyChildElements: ["DIV[input-bar search-seated]", "DIV[grid gap-3 pb-3]"]
        browseError: "Failed to load palettes"   browsing: false   displayedBrowseLen: 0
        → alerts:0  retryButtons:0  paneText:"Browse Discover palettes from the community."
```

The reactive state after the retry is **identical to before**: `browseError` is truthy,
`displayedBrowse` is empty — so `BrowsePane.vue:62`'s
`v-else-if="pm.browseError.value && displayedBrowse.length === 0"` is **TRUE** — and yet the
transition host `DIV.grid gap-3 pb-3` holds **zero element children**. The pane body is a blank
92px strip containing only the search bar. No error, no empty invitation, no control, no
announcement.

Cross-engine confirmation (`probe-deadlock.mjs`):

```
===== webkit  : AFTER one Retry (warns=2)  alerts:0 lists:0(in-pane) retryButtons:0
===== webkit  : +4s later — alerts=0 retry=0 text="Browse Discover palettes from the community."
===== chromium: AFTER one Retry (warns=2)  alerts:0 lists:0(in-pane) retryButtons:0
===== chromium: +4s later — alerts=0 retry=0 text="Browse Discover palettes from the community."
```

`warns=2` proves the second load really did reach the `catch` at `useBrowsePalettes.ts:78-81` — this
is not the stale-generation early-return path. **State says error; the DOM says nothing.**

**It does not self-heal, and SPA navigation does not recover it.** `probe-state.mjs` navigates
`/#/browse → /#/palettes → /#/browse` (hash-only, no document reload, the pane component stays
alive) and the third read is byte-identical to the second. Only a hard reload restores the pane.

### Mechanism

Two facts collide:

1. **`BrowsePane.vue:41`** wraps the three-state species chain in `<Transition name="vj-morph"
   mode="out-in">`. The leave window is `--duration-fast`; measured live: `{"fast":"0.2s",
   "normal":"0.3s","springSnappy":"calc(0.44s * 1)"}`.
2. **The retry round-trip completes in 47 ms** (`probe-isolate.mjs`:
   `failure latency after Enter (ms): [ …, 47 ]`). `loadRemotePalettes()`
   (`useBrowsePalettes.ts:63-88`) sets `browsing=true` synchronously → branch flips
   `error → developing`; 47 ms later the rejection lands → `browsing=false`, `browseError` reset →
   branch flips `developing → error`, **entirely inside the 200 ms out-in leave**, and the
   re-entering vnode carries the *same* `key="error"` (`BrowsePane.vue:63`) as the vnode still
   leaving. The pending enter is dropped and nothing is ever mounted.

EmptyState's own contribution is the load-bearing half: **it hosts, inside the `#action` slot of a
conditionally-rendered root, the one control whose activation unmounts that root.** The component
publishes no contract for surviving its own action. `variant="error"` + a `#action` Retry is the
documented, intended usage (`EmptyState.vue:10-13`, `BrowsePane.vue:54-58`) and it is used at **six**
call sites (`BrowsePane.vue:61`, `AdminTagsPanel.vue:68`, `AdminUsersPanel.vue:51`,
`AdminFlaggedPanel.vue:22`, `AdminAuditPanel.vue:42`, `AdminNamesPanel.vue:30,80`). Only BrowsePane
sits inside a `<Transition>` today, so only BrowsePane reaches the blank-pane end state — but every
one of the six destroys its own retry control on activation (see C-2).

### Cure (architectural, not a patch)

Do not wrap an aria-live species swap in `mode="out-in"` — an assertive `role="alert"` that waits
200 ms behind someone else's leave is already lying about its own semantics. The gestalt shape: give
EmptyState a **stable root** that never unmounts, and swap only the *interior* (glyph / eyebrow /
lines) on `variant`, with the action slot rendered in a persistent footer outside the swap. Then
neither the announcement region nor the retry control is a casualty of the retry. `key="error"` and
`key="wall"` become unnecessary and the whole class of same-key-during-leave collisions disappears.

*(Guard rail for whoever implements it: do **not** collapse the two `v-if`/`v-else` roots into one
root with `:role="…"` — see the negative proof N-4.)*

---

## C-2 · MAJOR — no focus contract: activating the slot action dumps focus to `<body>`

`probe-retry.mjs`, keyboard path (WCAG 2.1.1), which avoids WebKit's click-blur:

```
focused: BUTTON:Retry
t+16   {"active":"BUTTON:Retry", "alert":true}
t+100  {"active":"BUTTON:Retry", "alert":true}
t+300  {"active":"BODY:→\nBrowse\nLogin", "alert":false}
t+2000 {"active":"BODY:…", "alert":false}
TAB DISTANCE: {"total":12,"retryIndex":-1}
```

Focus lands on `<body>`; the Retry button is absent from all 12 focusables. This is independent of
C-1: even on a *successful* retry the alert unmounts by design, so the keyboard/AT user is thrown to
the top of the document with no restoration. WCAG 2.4.3 (Focus Order). EmptyState owns both the slot
and the root's lifecycle and offers no `focus()` expose, no `autofocus` re-entry, no focus return
target.

Cure: the same one as C-1 — a control that survives the state change needs no focus rescue. Rescue
logic (`nextTick(() => btn.focus())`) would be a contrivance layered on the real defect.

---

## C-3 · MAJOR — the hard-coded `role="status"` root makes EmptyState an illegal owned child of `role="list"`

`PaletteCardGrid.vue:3` declares `role="list"`; `PaletteCardGrid.vue:21` mounts `<EmptyState>` as a
direct child of it. EmptyState's empty root is `role="status"` (`EmptyState.vue:28`).

Live (`probe-empty.mjs`, `/#/browse`):

```json
"lists": [{ "cls": "palette-card-grid grid grid-cols-1 gap-3 min-h-[120px]",
            "childRoles": ["status"] }]
```

ARIA 1.2 §`list`: *"Required Owned Elements: listitem"*. A `status` child satisfies nothing; the
list resolves to zero items with a foreign owned node. axe `aria-required-children` (serious). At
true-empty this is the list's **only** child, so the container is a list of nothing wrapping a live
region.

Cure: the announcement is a *pane* concern, not an atom concern. EmptyState should render a plain
`div` and let the host own one live region (or accept the role as a prop so a list host can pass
`role="none"`). Hard-coding a landmark role inside a leaf atom that is dropped into arbitrary
containers is the mechanism — eight consumers inherit whatever the atom decides.

---

## C-4 · MAJOR — decorative ornament is announced verbatim, and plates stack live regions

`role="status"` carries implicit `aria-live="polite"` **and `aria-atomic="true"`**, so the whole
subtree is one announcement. Measured announcement strings (`probe-empty.mjs`, `probe-isolate.mjs`):

```
/#/browse      role=alert  : "The commons is unreachable. Failed to load palettes Retry"
/#/browse      role=status : "· EMPTY PLATE · No saved palettes yet. Add colors above, the…"
/#/admin/tags  statuses: 2   ("· NO TAGS MINTED · No tags yet." + "· EMPTY PLATE ·" …)
```

Three defects in one:

1. **The eyebrow leads every announcement with typographic ornament.** `EmptyState.vue:55-57` is
   not `aria-hidden`. Every plate in the app announces middots and a letterspaced plate label before
   any meaning. The component's own comment (`:6-8`, `:77`) calls it "the plate label" — a visual
   annotation. Visual annotations belong to `aria-hidden`; the dot trio right above it already gets
   this right (`:43`).
2. **Live regions stack.** `/#/browse` boots with an assertive `role="alert"` *and* a polite
   `role="status"` simultaneously; `/#/admin/tags` boots with **two** `role="status"`.
   `AdminNamesPanel.vue:42,92` can seat two more; `AdminUsersPanel.vue:138` seats one per expanded
   zero-palette user. Nothing coordinates them.
3. **`role="alert"` for content present at first paint.** The Browse error is not a response to a
   user action on load — it is the initial render. Assertive interruption is the wrong register for
   a passive first-paint state.

Cure: `aria-hidden="true"` on the eyebrow; one live region per pane, owned by the pane, with the
atom rendering plain content into it.

---

## C-5 · MINOR — dead prop: `tag="div"` × 3 (edict 2, no legacy)

`EmptyState.vue:45,46,47` pass `tag="div"` to `WatercolorDot`. glass-ui 7.0.0 has **no such prop**:

- `node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts:23-52` —
  props are exactly `color | variant | animate | cycleDuration | range | seed`.
- `dist/watercolor-dot.js` sets `inheritAttrs: !1` and reads only `attrs.class` / `attrs.style` from
  `useAttrs()` — so `tag` is not even emitted as a stray attribute.

Live DOM (`probe-empty.mjs`): `"strayTagAttr": 0`, and every dot is
`{"tag":"SPAN","attrs":"… aria-hidden=true | class=w-8 h-8 opacity-80 watercolor-swatch | data-variant=ghost …"}`.

The source asserts a `<div>`; a `<span>` ships. Residue of a retired glass-ui API, repeated at
`CurrentPaletteEditor.vue:62,64`. Cure: delete the attribute (3 sites here, 2 there).

---

## C-6 · MINOR — the `dots` prop has zero consumers (edicts 2 + 3)

`EmptyState.vue:83-88` carries a six-line doctrinal comment and a `withDefaults` entry for `dots`.

```
$ grep -rn "dots" demo/ --include="*.vue" | grep -v EmptyState.vue
demo/workbenches/gradient/.../GradientEasingEditor.vue:  (5 hits, all `specimen-dots` CSS — unrelated)
```

**No consumer passes it.** The prop documents a seat ("shed ONLY where a card-scale instrument
ghost seats beside this caption") that no longer exists anywhere in the tree — the ShadowPalette
card-scale ghost was re-homed to Extract's standing-instrument face
(`PaletteCardSkeleton.vue:27`, `ShadowPalette.vue:16`). API surface + prose kept alive for a dead
case. Cure: delete the prop, the `v-if`, and the comment; the trio is unconditional.

---

## C-7 · MINOR — flat prop bag, not a discriminated union: four props silently inert

`EmptyState.vue:73-89`. `eyebrow`, `hint`, `dots` render **only** on `empty`; `detail` renders
**only** on `error`. Nothing in the type prevents the mismatch:

```vue
<EmptyState variant="error" eyebrow="· gone ·" hint="try again" dots />   <!-- type-checks; renders none of it -->
<EmptyState detail="ECONNREFUSED" />                                      <!-- type-checks; detail dropped -->
```

No compile error, no dev warning, no visible output. Cure:
`defineProps<EmptyStateEmpty | EmptyStateError>()` discriminated on `variant` — the compiler then
refuses the mismatch instead of the renderer silently swallowing it.

*(Related latent, labelled a HYPOTHESIS — no reproduction: `message` is optional and every consumer
happens to pass one or a default slot, so the empty display `<p>` is never blank today. Nothing
enforces it: `<EmptyState />` renders a `role="status"` live region whose announcement is
`"· empty plate ·"` and nothing else.)*

---

## C-8 · MINOR — per-instance override of a design-system primitive (edict 5)

`EmptyState.vue:45` `opacity-80`, `:47` `opacity-60` on `WatercolorDot`. Sizing (`w-8 h-8`) is
legitimate layout; opacity is appearance, and appearance rungs for a glass-ui primitive belong in
glass-ui. Live DOM confirms both land on the swatch class list. Cure: a de-emphasis rung on the
`ghost` variant in glass-ui (relay to the BH inbox per the standing formation invariant), or drop
the attenuation.

---

## C-9 · MINOR — off-idiom props declaration (edict 7)

```
$ grep -rln "= defineProps<" demo/ --include="*.vue" | wc -l   → 50
$ grep -rln "withDefaults("  demo/ --include="*.vue" | wc -l   →  4
   demo/shared/ui/EmptyState.vue
   demo/palettes/browser/card/PaletteCard/ActionFeedback.vue
   demo/palettes/browser/card/PaletteCard/PaletteCard.vue
   demo/palettes/browser/card/SwatchHoverMenu.vue
```

50 components use Vue 3.5 reactive props destructure; EmptyState is one of four holdouts on
`withDefaults` (`EmptyState.vue:72-91`).

---

## C-10 · MINOR — **vacuous gate**: the covering tests would stay green through real breakage

Coverage inventory. There is **no unit test for EmptyState** (`@vue/test-utils` *is* installed; no
`test/**` file mounts it). Two e2e oracles touch it:

- `e2e/smoke/oracles/o9-shadow-palette.spec.ts` — pins the trio (`toHaveCount(1)`,
  `aria-hidden="true"`, 3 `[data-variant="ghost"]`, 3 `.watercolor-ghost-stroke`), the eyebrow
  strings `"· empty plate ·"` (:195) and `"· the commons ·"` (:230), `getByRole("alert")` on the
  error plate (:255), and the primary message text.
- `e2e/smoke/oracles/o10d-display-voice-census.spec.ts:208-220` — pins
  `[role="status"] p.font-display` is on the display face.

**Exact mutations that keep the entire suite green:**

| # | mutation | what silently dies |
|---|---|---|
| a | delete `EmptyState.vue:61-63` (the `hint` `<p>`) | the how-to line on **every** empty plate app-wide. `grep -rn "Add colors above\|Publish one from My Palettes\|Save two or more palettes\|then save the set" e2e/ test/` → **0 hits** |
| b | delete `EmptyState.vue:23-25` (the `detail` `<p>`) | "the machine truth", the explicitly designed error payload (`BrowsePane.vue:54-58`: *"The raw machine string moves to the Fira detail line"*). `grep -rn "Failed to load palettes" e2e/ test/` → **0 hits** |
| c | delete the whole `<style scoped>` block (`EmptyState.vue:94-105`) | the certified P4-R2/D6 `--ink-muted` de-emphasis rung on eyebrow + hint + error detail, reverting to inherited ink. `grep -rn "plate-ink" e2e/ test/` → **0 hits** |
| d | any of C-5 · C-6 · C-7 · C-8 · C-9 | dead props, prop-shape holes, per-instance overrides |

And the gate is entirely blind to C-1/C-2: **no test anywhere activates the Retry button.** The
one oracle that reaches the error plate (`o9:243-267`) asserts its *presence* and then stops.

Cure: a unit test that mounts both variants and asserts the rendered lines + roles per prop
combination (cheap, `@vue/test-utils` is already there), plus one e2e leg that presses Retry and
asserts the pane still holds an alert *and* that focus is somewhere reachable. That leg is born-RED
today — it is the C-1 gate.

---

## C-11 · INFO — masking fallback in the token read (edict 2)

`EmptyState.vue:103` `color: var(--ink-muted, var(--muted-foreground));`. Measured live:
`--ink-muted` always resolves (`"oklch(44.687157993053% 0.003861589952 34.629978305623deg)"`), and
it re-solves per accent (see N-2). The fallback is a second path that can only ever hide a
boot-writer failure. Repeated across 8 files, so this is a fond-level call, not an EmptyState-local
one — recorded, not pressed.

---

## Negative proofs — hypotheses tried and REFUTED

**N-1 · The ghost trio is *not* a per-frame cost.** Hypothesis: three
`feTurbulence numOctaves="5"` filter graphs (7 on `/#/palettes`) re-rasterize whenever
`--accent-live` changes, since the ghost fill is `color-mix(in srgb, var(--watercolor-color) 12%,
transparent)` and the dashed stroke reads the live accent. A/B under a 150-frame accent churn with
the trio `display:none` vs visible (`probe-perf.mjs`, Chromium):

```
INVENTORY /#/palettes: {"trios":1,"swatches":7,"filters":7,"feTurbulence":7,"statuses":1}
round 0 · trio VISIBLE : median 49.9ms  p90 50.6  max 59.3
round 0 · trio HIDDEN  : median 50.1ms  p90 66.7  max 75.0
round 1 · trio VISIBLE : median 58.2ms  p90 66.7  max 75.1
round 1 · trio HIDDEN  : median 66.6ms  p90 75.0  max 91.6
```

Hiding the trio does not improve frame time — glass-ui's static-filter idiom holds. **REFUTED.**
(The page's own 50–66 ms frames under accent churn are somebody else's finding, not EmptyState's.)

**N-2 · `.plate-ink` contrast PASSES, including under live accents.** Pixel-decoded from clipped
screenshots (darkest glyph pixel vs modal plate pixel):

```
default accent   hint     5.50:1   eyebrow 5.38:1   error-detail 4.83:1
oklch(.98 .02 100)  hint 5.57:1                     error-detail 5.17:1
oklch(.5 .3 300)    hint 5.25:1                     error-detail 4.59:1
oklch(.15 .05 250)  hint 5.70:1                     error-detail 5.20:1
```

All ≥ the 4.5:1 small-text floor; `--ink-muted` visibly re-solves per accent
(`44.71% → 38.65% → 37.20%`), so the D6 clamp is real. **REFUTED as a defect** — but the error
`detail` line is consistently the thinnest margin (0.09–0.33 above floor) and is the row to watch.
*(One reading, `oklch(0.9 0.25 140)`, returned a degenerate 1.00:1 — modal pixel == darkest pixel,
a capture artifact from a mid-transition clip. Discarded, not counted either way.)*

**N-3 · No `parseCssColor` crash path.** `color="var(--accent-live)"` is never parsed: glass-ui
paints it straight through as a CSS custom property (`WatercolorDot.vue.d.ts:18-21` — *"the dot
needs no resolver"*), and only `hashString(color + seed)` consumes the literal, for the silhouette
PRNG. Live: `"bg": "color(srgb 0.665034 0 0.261497 / 0.12)"`, three distinct seeded
`border-radius` silhouettes. No parser reached. **REFUTED.**

**N-4 · The duplicated wrapper markup is LOAD-BEARING — do not "simplify" it.** `EmptyState.vue:16`
and `:28` repeat an identical class string; the obvious cleanup is one root with
`:role="variant === 'error' ? 'alert' : 'status'"`. That would make Vue patch the `role` attribute
in place, and an in-place `role` mutation does not re-fire an announcement — the species change
would go silent to AT. Two `v-if`/`v-else` branches (auto-keyed by the compiler) force node
replacement, which is what makes the swap audible. Recorded so a later simplification pass does not
regress it.

**N-5 · Local-hazard sweep, all clean.** No `defineModel` (no stale-read round trip). No
oklch→HSV roundtrip, no `stableHue`. No `ValueUnit` wrapping. No reka-ui slider, no pointer capture.
**No `requestAnimationFrame` in the component** — the only rAF in reach is glass-ui's single
`useRAFLoop`, and it is not armed here (`animate` defaults `false`; live DOM shows
`--watercolor-wobble: none` on all three dots). No WebGL. No listeners, observers, timers, network,
or async of any kind → no cleanup or leak surface. `verbatimModuleSyntax`: both imports are value
imports, no type-only import needed — compliant. `?: T | undefined` on every prop is **correct**,
not noise, under `exactOptionalPropertyTypes: true` (`tsconfig.base.json:11`).

**N-6 · Visual audit rows: EmptyState contributes zero.** `REPORT.json`, all four matrices: the
`/#/browse` `smallTapTargets` are the slug-bar controls (`22×22` "Switch to slug" / "Generate new
slug" / "Cancel") and a `160×23` input — none inside an EmptyState. `/#/browse` `namelessButtons: 0`;
Retry measures `68×36` (`probe-empty.mjs`), above the 24px floor. `blankOrNearBlank: 0`,
`pageErrors: 0`, `horizontalOverflow: 0` on every EmptyState-bearing route. **EmptyState's
contribution to the measured nameless-button and small-tap-target counts is zero.**

---

## Observation (design-adjacent, not pressed as a defect)

`shots/safari-desktop-light/browse.png` — the My Palettes plate at true-empty seats **two dashed
ghost registers ~150px apart**: `CurrentPaletteEditor.vue:95-105`'s add-slot ghost (`w-11 h-11`)
inside the "Start a new palette" card, and EmptyState's trio (`w-8/w-11/w-6`) below it. The N-3
clause EmptyState's own comment cites (`:29-38`, `:83-88`) forbids "two ghost registers **at two
scales**" — these are at *the same* scale, so the clause's letter survives. Its spirit does not.
Flagged for the design seat; the `dots` escape hatch that would express it is dead (C-6).

---

## Defect ledger

| id | severity | defect | reproduction |
|---|---|---|---|
| C-1 | **BLOCKER** | Retry annihilates the Browse pane permanently (state says error, DOM renders nothing; survives SPA nav) | `probe-state.mjs` / `probe-deadlock.mjs`, WebKit + Chromium |
| C-2 | MAJOR | slot action destroys itself; focus → `<body>`, control leaves the tab order | `probe-retry.mjs` |
| C-3 | MAJOR | `role="status"` root is an illegal owned child of `PaletteCardGrid`'s `role="list"` | `probe-empty.mjs` |
| C-4 | MAJOR | decorative eyebrow announced inside an atomic live region; live regions stack per route | `probe-empty.mjs`, `probe-isolate.mjs` |
| C-5 | MINOR | `tag="div"` × 3 — prop does not exist in glass-ui 7.0.0, silently swallowed | `.d.ts:23-52` + live `strayTagAttr: 0` |
| C-6 | MINOR | `dots` prop has zero consumers | grep |
| C-7 | MINOR | flat prop bag; 4 props silently inert per variant | `EmptyState.vue:73-89` |
| C-8 | MINOR | per-instance `opacity-*` on a glass-ui primitive | `EmptyState.vue:45,47` |
| C-9 | MINOR | `withDefaults` vs 50 reactive-destructure siblings | grep |
| C-10 | MINOR | vacuous gate — 4 named mutations keep the suite green; no unit test; Retry never pressed | grep + spec read |
| C-11 | INFO | masking `var(--ink-muted, var(--muted-foreground))` fallback | `EmptyState.vue:103` |
