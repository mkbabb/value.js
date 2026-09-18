claude-opus-5[1m]

# CHALLENGE · `SpeedSelect.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/SpeedSelect.vue` (70 lines)
**Axis** how this component consumes value.js (0.13 pinned) · keyframes.js (4.3) · glass-ui (^4.0.0) · the fourier API operation surface; props/emits contract quality; integration seams.
**Mode** static, read-only. No dev server, no browser tooling, no install. Every claim below is derived from a file read or a `grep`/`node -e` probe against the working tree of `/Users/mkbabb/Programming/fourier-analysis` (READ-ONLY evidence), the installed `web/node_modules/@mkbabb/glass-ui@4.0.0` + `reka-ui@2.9.10` trees, and the producer tree `/Users/mkbabb/Programming/glass-ui@7.0.0`.
**Prior** assumed DEFECTIVE. Findings that survived their own falsifier are below; findings that did **not** survive are recorded as such in §3 and §5 rather than dropped.

**Tally — defects 18 (BLOCKER 2 · MAJOR 8 · MINOR 5 · INFO 3) · superlatives 5.**

---

## §0 · The one-paragraph verdict

`SpeedSelect` is a *clean importer* and a *broken integrator*. Its import surface is the best in the
visualization directory — five glass-ui symbols off one deep subpath, zero reka-ui, zero shadow copy,
and the only fourier visualization component with **zero** exposure to the eleven removed-subpath /
three removed-dock-member sites the 4→7 uplift will cost (`lane-frontend.md §5`). Everything below
the import line then goes wrong in one consistent direction: **the component re-implements in local
CSS and local literals what the pinned producer and the pinned API already model as contracts.** It
strips the trigger chrome by hand instead of `variant="ghost"`; it pins height/font by hand instead
of `size`; it hardcodes its value domain instead of publishing a catalog the way its own sibling
easing control does; and the value it produces is welded into a versioned server atom that **no
client read path can ever hydrate and no API operation can ever update.** The value.js leg is zero —
which is a superlative on the uplift ledger and a null on this axis.

---

## §1 · Defects

### 🔴 SS-C-1 · BLOCKER · The persisted `speed` atom is write-only-at-create, unreadable, and un-updatable — while sealing version identity

**Claim.** `SpeedSelect` is the sole UI writer of `AnimationSettings.speed`, which is **atom 4 of the
5-atom remix set** that keys `set_hash` / `VisualizationVersion` (`lane-crud.md` §1.1 table, line 66;
`api/models/visualization.py:129`, `:241-245`). The full round trip is severed at three independent
points, so a user's speed selection cannot leave their own browser profile:

| Leg | Site | State |
|---|---|---|
| UI → store | `AnimationControls.vue:96`, `:117` → `stores/animation.ts:22` `speed = ref(1)` | LIVE |
| store → settings | `VisualizationView.vue:52-64` `watchDebounced(…, {debounce:500})` → `store.animationSettings.speed` | LIVE |
| settings → IndexedDB draft | `stores/workspace.ts:108` `watch([contourSettings, animationSettings], scheduleDraftSave, {deep:true})` → `_saveDraftNow()` `:92-105` | LIVE |
| settings → server (CREATE) | `stores/workspace.ts:356` `animation_settings: toRaw(animationSettings.value)` → `POST /api/visualizations` → `api/routers/visualizations.py:193-194` | LIVE — **once, at create** |
| settings → server (UPDATE) | `web/src/lib/types.ts:256-262` `VisualizationPatch = {visibility?, title?, description?, tags?, palette_slug?}` | **ABSENT client-side** |
| " | `api/models/visualization.py:198-209` `VisualizationUpdate` = `{visibility, title, description, tags, palette_slug}` + `ConfigDict(extra="forbid")` | **ABSENT server-side** |
| server → UI (read-back) | `stores/workspace.ts:~217` `animationSettings.value = {...defaultAnimationSettings(), ...viz.animation_settings}` inside `loadVisualization()` | **DEAD — zero callers** |

The read-back leg is the fatal one. `grep -rn "loadVisualization\|loadSnapshot" web/src/` returns
**only** the store's own definition (`workspace.ts:238`), the dead compatibility alias
(`workspace.ts:237-239`), and the two export lines (`:447`, `:451`). No view, composable, or router
guard calls either. The route that would need them — `/v/:visualizationSlug` (`router/index.ts:56-69`)
— mounts `VisualizationView.vue`, whose only loader is `useWorkspaceLoader`, which keys **exclusively**
on `route.params.imageSlug` (`useWorkspaceLoader.ts:25-30`) and therefore does nothing at all on
`/v/:slug`. The single live hydration of `anim.speed` is `useWorkspaceLoader.ts:57`
`if (as?.speed) anim.speed = as.speed`, whose source `store.animationSettings` is populated under
`/w/:imageSlug` from `loadDraft(slug)` — **local IndexedDB** (`workspace.ts:143-176`) — not the API.

**Consequence.** A user sets 4×, saves, publishes. The value is sealed into `set_hash` and stamped
into an immutable `VisualizationVersion` row (`visualizations.py:125-148`). It can never be corrected
(no PATCH field on either side of the wire), and no visitor — including the author on a second device
— will ever see it: they get `ANIMATION_DEFAULTS.speed = 1` (`lib/defaults.ts:23`). The control
appears to persist and does not.

**Falsifier.** Produce any live call site for `loadVisualization` / `loadSnapshot`, or any request
that carries `animation_settings` to a non-`POST /api/visualizations` endpoint other than the fork
path (`visualizations.py:520-521`). Either kills this finding. I ran the exhaustive greps above and
found none; the fork path mints a *new* entity and so does not constitute an update.

**Overlap.** This is the mirror of adjudicated intake row **R6-8** (`lane-fourier-r3-r6.md`): R6-8
records an operation leaf that *over*-couples to its client (`operation.method.visualization-update`
mutating because `client.method.visualization-update` did). Here the same seam fails the other way —
the client leaf **under**-covers the operation: `VisualizationPatch` (types.ts:256-262) is a strict
subset of the server's already-narrow `VisualizationUpdate`, and both are strict subsets of the atom
set they are supposed to be able to edit. The lesson R6-8 books for F.W5 (keep operation identity
independent of client identity) needs its converse booked too: **an atom that seals version identity
must have exactly one operation that can write it, and that operation must be reachable from the
client twin.**

---

### 🔴 SS-C-2 · BLOCKER · The atom `speed` multiplies has no agreed value and no readers — the sealed identity is semantically empty

**Claim.** `speed` is a *dimensionless multiplier* on `duration` (`stores/animation.ts:57`
`const dur = duration.value / speed.value`). Four independent declarations of that base disagree, and
three of `AnimationSettings`' six fields have zero readers anywhere in either tree:

| Declaration | Site | Value | Readers |
|---|---|---|---|
| Running clock | `stores/animation.ts:23` | `duration = ref(20000)` (ms) | the rAF loop — **never hydrated from `AnimationSettings`** (`useWorkspaceLoader.ts:53-58` seeds only `active_bases`, `easing`, `speed`) |
| Client type-twin default | `lib/defaults.ts:20` | `duration: 5000` | **0** |
| Server model default | `api/models/shared.py:67` | `duration: float = 30.0` (units unstated; 30 ms is absurd, so seconds — a 1000× unit fork from the client twin) | **0** |
| Client interface | `lib/types.ts:46` | `duration: number` | **0** |

Probe: `grep -rn "\.duration\b|duration:" web/src/` → the only hits outside `defaults.ts`/`types.ts`
are the unrelated morph subsystem (`useFourierMorph.ts:128,136`, `MorphPhaseConfig.vue:83,100`).
`grep -rn "\.fps|max_circles" api/routers api/services web/src` → the only hit is the fork
passthrough `visualizations.py:521`. **`fps`, `duration`, and `max_circles` are read by nothing on
either side of the wire.**

**Consequence.** Half of atom 4 is inert ballast that nonetheless enters `set_hash`, and the half that
isn't (`speed`) is a coefficient on a quantity the persisted record actively misstates. Any future
consumer that reads a `VisualizationVersion` to reproduce what the author saw — a server-side render,
an export, a fork preview, a value.js↔fourier conformance fixture (census §4 F-series) — computes a
different animation from the same "identical" atom set. A version identity that does not determine
the artifact is not an identity.

**Falsifier.** Show a reader of `AnimationSettings.duration` / `.fps` / `.max_circles`, or show that
`stores/animation.ts:23`'s `20000` is derived from the persisted atom. Neither exists in the tree.
Alternatively, rule that atom 4 is intentionally partial — that is a ruling, not a refutation, and it
belongs in the F.W-CRUD carry either way.

---

### 🟠 SS-C-3 · MAJOR · The trigger/items typographic desync — verbatim the anti-pattern the producer wrote the `size` prop to cure, and the producer names value.js as the prior offender

**Claim.** `SpeedSelect.vue:53-54` and `:65-66` set `font-family: "Fira Code", monospace` + `@apply
text-sm` **on the trigger only**. `SelectContent` portals to `<body>` (reka `SelectPortal`/`Teleport`,
`reka-ui/dist/Select/SelectContent.js`), so the five `SelectItem` rows resolve their type from the
producer's family lever, not from the scoped block:

- **Family.** Items inherit `--font-sans: "Computer Modern Serif", …` (`web/src/style.css:13-15`
  `@theme`, applied at `:18-21` `@apply … font-serif`). Producer `dist/styles/select.css` declares
  **no** `font-family` (`grep -o "font-family:[^;}]*"` → empty). ⇒ trigger renders `0.25×` in mono,
  the list renders `0.25×` in serif.
- **Size.** Items read `.text-dropdown{font-size:var(--dropdown-text)}`
  (`dist/styles/components.css`), and `--dropdown-text: var(--control-text)`
  (`dist/styles/tokens/offsets-sizing.css`) → `--control-text: calc(var(--type-small) * var(--ui-scale))`
  → `--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` (`dist/styles/typography/scale.css`).
  The trigger is pinned at `.text-sm` → `--text-sm: 0.875rem` (`dist/styles/components.css`), **fixed**.
  ⇒ the desync is 1.00× at the clamp floor, ≈1.17× at 1440 px, ≈1.26× at 1920 px, and **1.43× at the
  clamp ceiling**.

The producer documents this exact failure and its sanctioned lever inline, in the type declaration
this component's `SelectTrigger` import resolves to
(`web/node_modules/@mkbabb/glass-ui/dist/components/ui/select/SelectTrigger.vue.d.ts`):

> "FONT-RUNG tiers (`display` | `audacious`) WRITE the shared picker-family `--dropdown-text` token on
> the Select SCOPE … This is the fix for **the value.js trigger-only `text-display` desync (a 1.59×
> trigger/items break)**: a consumer scaling the picker font reaches for the PROP, which sets the
> FAMILY token, NOT a trigger-local `text-*` class that leaves the items behind."

`SpeedSelect` reaches for the trigger-local `text-*` class. The `size` prop is available at the pinned
4.0.0 (`size?: 'sm' | 'default' | 'display' | 'audacious'`, same d.ts) and is unused.

**Falsifier.** Any `font-family` or `font-size` declaration that reaches the portalled
`SelectContent` from this component's cascade. There is none — scoped SFC styles cannot reach a
`<body>` teleport target, `select.css` sets no family, and the component ships no global `<style>`
block (contrast `AnimationControls.vue:203-224`, which *does* ship a global block for exactly this
reason and still does not touch the select).

---

### 🟠 SS-C-4 · MAJOR · The producer's `variant="ghost"` is re-implemented as three scoped CSS overrides

**Claim.** `SpeedSelect.vue:55-56` `border: none; background: none;` hand-strips the trigger's rest
surface. The pinned 4.0.0 `SelectTrigger` already ships that as a first-class prop —
`variant?: 'default' | 'ghost'` where the d.ts comment reads *"'default' = the shared control REST
surface (BA.W-SURFACE-AXIS scope 7 — the `.control-surface` register every form control reads at rest,
off the prior `glass-wash` gray fork); **'ghost' = transparent, no border/shadow**"*
(`dist/components/ui/select/SelectTrigger.vue.d.ts`).

**Consequence (uplift-specific).** The override wins today only on specificity — scoped
`.speed-trigger[data-v-…]` (0,2,0) beats the producer's utility classes (0,1,0). The producer's own
d.ts records that the surface moved registers at 4.0.0 ("off the prior `glass-wash` gray fork"); a
second such move at 7.0.0 that relocates border/background onto a pseudo-element, a `@layer`, or a
`box-shadow` inset will silently reinstate the chrome that `border:none` no longer addresses. The
prop is version-stable; the override is not. This is uncosted budget in `lane-frontend.md §5`, which
lists SpeedSelect nowhere because its *imports* are clean — the CSS is the real debt.

**Falsifier.** Show that `variant="ghost"` at 4.0.0 leaves residual border/background that would
still require the override. Unverifiable statically at the pixel level (see §4/SS-13), but the d.ts
contract is explicit and the burden is on the override to justify itself, not the reverse.

---

### 🟠 SS-C-5 · MAJOR · Hardcoded height/width defeats the producer's comfort cohort and lands the touch path under 44 px

**Claim.** `:50-51` `height: 1.75rem; width: 3.5rem` (28 × 56 px) and `:62-63` `height: 2rem;
width: 4rem` (32 × 64 px). The producer models exactly this axis: *"HEIGHT tiers (`sm` | `default`)
ride the `--control-h-*` comfort cohort (h-9 / h-10)"* — 36 px / 40 px
(`dist/components/ui/select/SelectTrigger.vue.d.ts`). Both local values are **below the `sm` floor**,
so the component opts out of the shared cohort entirely rather than selecting a rung within it.

**Consequence.** The `compact` instance (`AnimationControls.vue:117`) is the *mobile* path — it lives
in the `flex sm:hidden` group inside the dropdown, i.e. it exists precisely where the input is touch.
At 32 px it is 73 % of the 44 px touch minimum (Apple HIG; WCAG 2.5.5 AAA). It clears WCAG 2.5.8 AA
(24 × 24), so this is a comfort/consistency defect rather than a conformance failure — graded MAJOR
because it is a *deliberate opt-out of the producer's contract* on the axis this challenge audits, not
because it fails an AA gate.

**Falsifier.** Show `--control-h-sm` resolving below 1.75rem, or show the dock's own layout forcing a
sub-cohort height that `size="sm"` could not satisfy. `AnimationControls.vue:139-145` sizes its own
play button at `2.5rem` height — taller than either speed trigger — so the dock does not impose the
constraint.

---

### 🟠 SS-C-6 · MAJOR · `SelectValue` carries no `placeholder`: any off-domain `modelValue` renders a blank, nameless pill

**Claim.** `SpeedSelect.vue:37` is a bare `<SelectValue />`. Reka's implementation
(`reka-ui/dist/Select/SelectValue.js`) computes
`selectedLabel = […].filter(Boolean)` from the registered option set and then
`slotText = selectedLabel.length ? join(", ") : props.placeholder`, with `placeholder` defaulting to
`""`. **No matching `SelectItem` ⇒ the trigger renders the empty string** and gains
`data-placeholder=""`.

The domain is five string literals (`:38-42`); the prop is `modelValue: number` (`:13`); the server
field is `speed: float = 1.0` with **no validator, no enum, no bound** (`api/models/shared.py:69`) —
in a model whose *sibling* `ContourSettings` carries four `field_validator` clamps
(`shared.py:22-42`). So the server will persist `speed: 3.0` (or `0`, or `-2`) from
`POST /api/visualizations` or `POST /{slug}/fork` (`visualizations.py:520-521`) without complaint, and
`useWorkspaceLoader.ts:57` hydrates it into the store unconditionally.

**Reachability — honest grading.** The blank is **not** reachable through any *live* path today,
because SS-C-1 severs the only route by which a server-authored speed could reach `anim.speed`
(`loadVisualization` has no callers; the draft path only ever replays in-domain values the store
itself wrote). It is therefore **latent, and armed the instant `loadVisualization` is wired** — which
is the documented intent of `/v/:visualizationSlug` and the obvious fix for SS-C-1. Fixing SS-C-1
without fixing SS-C-6 converts a silent data loss into a silent blank control. Graded MAJOR rather
than BLOCKER for that reason, and flagged as **coupled: SS-C-1 and SS-C-6 must be repaired in the same
change.**

Two secondary arms of the same gap:
- `useWorkspaceLoader.ts:57` guards with `if (as?.speed)` — truthiness — so a persisted `speed: 0`
  (accepted by the server) is silently dropped. Were it not dropped, `duration/0 = Infinity` parks
  `t` at 0 permanently (`stores/animation.ts:57,64-68`).
- `String(NaN) === "NaN"` also matches no item; see SS-C-13 for how a NaN can be minted and then
  survives `structuredClone` into the IndexedDB draft (`workspace.ts:93`), making it sticky across
  reloads.

**Falsifier.** Show a `placeholder` reaching `SelectValue`, or a runtime clamp of `modelValue` to the
five-element domain. Neither exists: `grep -n "placeholder" SpeedSelect.vue` → no match; the computed
getter is an unguarded `String(props.modelValue)` (`:24`).

---

### 🟠 SS-C-7 · MAJOR · Operating the control reverses the animation: every speed change re-seeds the ping-pong into the forward half

**Claim.** The emit at `SpeedSelect.vue:26` lands on `anim.speed`, which the store watches:

```
stores/animation.ts:135-140   watch(speed, () => { if (playing.value) { stopRAF(); startLoop(); } })
stores/animation.ts:56-71     startLoop(): dur = duration/speed; startTime = now - t.value * dur
                              cycle = Math.floor(elapsed / dur);  t = cycle % 2 === 0 ? frac : 1 - frac
```

On re-seed, `elapsed = now - startTime = t * dur`, so `cycle = Math.floor(t) = 0` for all `t ∈ [0,1)`
— **even ⇒ forward**. `t` is preserved (good), but the *direction* is not: a speed change taken while
the epicycle chain is travelling through the reverse half of the ping-pong flips it to forward at the
same `t`. The visible artifact is a discontinuous reversal produced by touching a control that claims
only to scale rate.

**Falsifier.** Any stored direction/parity state that survives `startLoop()`. There is none — the
store's ping-pong parity is derived purely from `elapsed`, and `elapsed` is reconstructed from `t`
alone. Attribution note: the mechanism lives in the store, but `SpeedSelect` is its *only* trigger
(the two call sites at `AnimationControls.vue:96,117` are the only writers of `anim.speed` in the
tree), so it belongs on this component's integration-seam ledger.

---

### 🟠 SS-C-8 · MAJOR · `{ once: true }` hydration + the debounced writer = cross-navigation speed clobber

**Claim.** `useWorkspaceLoader.ts:49-59` seeds `anim.speed` under `watch(… , { once: true })`. The
route watcher immediately above it (`:34-46`) explicitly supports **in-place** navigation between
workspaces without remounting `VisualizationView`. So the second and every subsequent workspace
loaded in a session has its persisted speed **ignored** — the first one's value stays applied.

The clobber is the second half: `VisualizationView.vue:52-64` fires on `[activeBases, anim.easing,
anim.speed]` and writes `store.animationSettings = {...store.animationSettings, speed: anim.speed}`.
So the first post-navigation interaction with *any* of those three controls stamps workspace A's stale
speed onto workspace B's settings object, which `workspace.ts:108` then persists to B's draft. The
user's own recorded value for B is destroyed by a control they did not touch.

**Falsifier.** Remove `{ once: true }` — or show that `VisualizationView` remounts on every workspace
navigation. It does not: both `/v/:visualizationSlug` and `/w/:imageSlug?` resolve to the same
component (`router/index.ts:56-80`) and vue-router reuses the instance across param changes, which is
precisely why `useWorkspaceLoader.ts:34-46` exists at all.

---

### 🟠 SS-C-9 · MAJOR · The tooltip anchors on a non-focusable `<div>` — the known-bad nested-PopperRoot anchor pattern, cured for the sibling and left standing here

**Claim.** `AnimationControls.vue:94-98`:

```
<Tooltip text="Playback speed">
    <div class="hidden sm:block">
        <SpeedSelect … />
    </div>
</Tooltip>
```

`ui/tooltip/Tooltip.vue:27-30` forwards the slot through `<TooltipTrigger as-child>`, so reka merges
`data-state`, `aria-describedby`, and the pointer/focus handlers onto **the `<div>`**, not onto the
`role="combobox"` button inside it. Consequences:

1. A `<div>` is not focusable and `focus` does not bubble, so the keyboard path never opens the
   tooltip. Reka's `SelectTrigger` sets `aria-controls` / `aria-expanded` / `aria-required` /
   `aria-autocomplete` and **no** `aria-describedby` (`grep -o '"aria-[a-z]*": *[^,]*'
   reka-ui/dist/Select/SelectTrigger.js`), so nothing bridges the description to the control.
2. When the tooltip does open (pointer), `aria-describedby` sits on a decorative wrapper — the
   description is not in the combobox's accessible-description computation at all.

The repo has already diagnosed this exact class **at this exact call site's sibling** and fixed only
the sibling. `e2e/visualization-ux.spec.ts:177-179`:

> "the dropdown failed to position (Reka popper never measured) because a `<Tooltip>` (a nested Reka
> PopperRoot) wrapped the `DockDropdownTrigger` anchor → moved the tooltip inside the trigger
> (`AnimationControls.vue`)"

**Falsifier — and the part of this finding that does NOT survive.** The positioning half of that bug
does **not** reproduce here. Reka's `SelectRoot` provides its own `PopperRoot`
(`reka-ui/dist/Select/SelectRoot.js` imports `PopperRoot_default`), and the intervening
`<div class="hidden sm:block">` absorbs the tooltip's `as-child` anchor, so the Select's trigger
still injects the *nearest* popper context — its own. I claim only the a11y/description arms (1) and
(2), which are direct consequences of the anchor landing on the div and are verifiable from the
sources cited. Overlaps adjudicated intake row **R3-7a** (AnimationControls = 4 of the 35 `Tooltip`
callsites; F.W3 migration budget).

---

### 🟠 SS-C-10 · MAJOR · The value domain is a template literal, not a catalog — asymmetric with the tree's own idiom for the sibling control

**Claim.** The five speeds exist only as inline `SelectItem value=` attributes
(`SpeedSelect.vue:38-42`). Nothing else in either tree can enumerate, validate, or reuse them —
`grep -rn "0.25" web/src/ | grep -i speed` finds this file alone. The prop that carries them is
`modelValue: number` (`:13`): the type admits the entire real line for a five-element enum.

The tree's own established idiom for the adjacent control does the opposite: the easing domain lives
in `lib/easings.ts` as `ANIMATION_EASINGS` (`easings.ts:5-6` header), is re-exported by the store as
`EASING_OPTIONS` (`stores/animation.ts:10`), is typed as `AnimationEasingName` (`:11`), is consumed by
the store's `easedT` (`:27-30`), and is what `EasingPicker.vue` renders. `useWorkspaceLoader.ts:56`
even casts the persisted string through that type (`as EasingName`). There is no `lib/speeds.ts` and
no `SpeedName`. The two controls sit side by side in the same dock and one of them is contract-typed.

**Consequence.** Every downstream defect in this file is downstream of this one: SS-C-6 (nothing to
clamp against), SS-C-2 (the server has no enum to mirror), SS-C-13 (nothing to parse against).

**Falsifier.** Show a shared speed catalog. `grep -rn "SPEED\|speeds" web/src/` → no such symbol.

---

### 🟡 SS-C-11 · MINOR · `compact` is a bespoke re-implementation of the producer's `size` axis, and duplicates two-thirds of its own CSS

`SpeedSelect.vue:14` declares `compact?: boolean`, defaulted at `:16`, consumed at `:33` purely to
swap one class name. The producer's `SelectTrigger` already exposes the same intent as a typed,
token-backed enum (`size?: 'sm' | 'default' | …`, riding `--control-h-*`). The two resulting classes
(`:49-59`, `:61-69`) are 4-of-6 identical: `flex-shrink: 0`, `font-family: "Fira Code", monospace`,
`@apply text-sm`, `border-radius: 9999px` each appear twice verbatim.
**Falsifier.** Show a `compact` behaviour the `size` axis cannot express. Only the border differs
(`:67` vs `:55`), which is the `variant` axis (SS-C-4) — also already modelled.

### 🟡 SS-C-12 · MINOR · No `disabled` / `name` / `required` forwarding, though the primitive is a form control

`SelectRootProps<T> extends FormFieldProps` (`reka-ui/dist/index4.d.ts`, `SelectRootProps` block) and
reka's `SelectRoot` declares `disabled`, `name`, `required` props (`reka-ui/dist/Select/SelectRoot.js`
props table). `SpeedSelect` declares exactly two props and forwards none of them, so the control
cannot be disabled during a compute (`workspace.ts` `beginCompute`/`endCompute`) or during
`store.loading`, and cannot participate in a form. **Falsifier.** Show a consumer that needs it. None
today — hence MINOR — but the omission is what makes "disable the transport while recomputing"
unimplementable without editing this file.

### 🟡 SS-C-13 · MINOR · `parseFloat` where `Number` is exact, with no guard on the result

`SpeedSelect.vue:26` `emit("update:modelValue", parseFloat(v))`. Over the declared domain `parseFloat`
and `Number` agree, so this is latent — but `parseFloat` is the lenient parser: it truncates at the
first non-numeric character and yields `NaN` for a non-numeric prefix, unguarded. The emit is typed
`(v: number)`, and `NaN` is a `number`. A `NaN` speed propagates `dur = duration/NaN → NaN`,
`startTime = now - t*NaN → NaN`, `t = Math.floor(NaN) → NaN` (`stores/animation.ts:57,63-68`) —
a dead clock and a `NaN`-fed canvas — and then survives `structuredClone` into the IndexedDB draft
(`workspace.ts:93-104`), so it is sticky across reloads. The setter's declared parameter type is
`string` while the primitive's emit type is `AcceptableValue = string | number | bigint |
Record<string, any> | null` (`reka-ui/dist/index3.d.ts:231`) — the narrowing is by assumption, not by
guard.
**Falsifier — partially fails.** I checked whether reka can emit `null` here: `SelectRoot`'s only
model writer is `handleValueChange(value)`, driven solely by item selection, and `useVModel` runs
non-passive because `modelValue` is always supplied. So `null` is **not** reachable today and the NaN
path is latent-only. Graded MINOR accordingly.

### 🟡 SS-C-14 · MINOR · A booked style-audit carry, unremediated and still line-exact

`docs/audits/runs/2026-06-01-constellation-ui/fourier.md:26` and
`.../style-audit.md:41` both cite **`visualization/SpeedSelect.vue:57,68`** for the raw `9999px`
literal and prescribe `var(--radius-pill)`. Today's file has `border-radius: 9999px` at **line 57 and
line 68** — the citation still resolves byte-for-byte. Fourteen months, two glass-ui majors, and one
in-flight bump later, this file is unchanged.
**Falsifier.** Show `--radius-pill` undefined at the pinned glass-ui. (If so, the finding becomes an
upstream carry rather than a consumer defect — either way it is a live row.)

### 🟡 SS-C-15 · MINOR · A focusable `role="combobox"` permanently mounted inside an `aria-hidden` layer

The desktop instance is never `v-if`-gated: it is always mounted inside `GlassDock`'s expanded layer,
which the dock renders with `aria-hidden="true"` while collapsed and *without* `inert`. Two live
witnesses: `e2e/contour-extraction.spec.ts:114-119` — *"a bare `[role="combobox"]` also matches the
AnimationControls dock's SpeedSelect (which lives in the dock's collapsed/hidden expanded layer, so
`.first()` resolves to a never-visible element and the click times out)"* — and
`e2e/visualization-ux.spec.ts:168-172`, which books the axe `aria-hidden-focus` **serious** violation
against `docs/constellation/ADOPTION-ASKS.md` (glass-ui-a11y) and keeps the keystone under
`test.fixme`.
**Shared blame, stated plainly:** the missing `inert` is glass-ui's. `SpeedSelect` is graded MINOR
here as one of the two focusable occupants, and because it could self-mitigate (`v-if` on dock
expansion) without waiting for the producer. **Falsifier.** Show the dock applying `inert`, or the
select trigger carrying `tabindex="-1"` while collapsed. Neither is in the 4.0.0 dist.

### ⚪ SS-C-16 · INFO · The `v-model` seam is hand-expanded, twice

`AnimationControls.vue:96` and `:117` both write `:model-value="anim.speed" @update:model-value="anim.speed = $event"` where `v-model="anim.speed"` is exact and equivalent. Duplicated verbatim at two call sites; the component publishes a well-formed `v-model` contract (`:12-18`) that neither consumer uses.

### ⚪ SS-C-17 · INFO · Zero value.js consumption, in a file that does two colour operations by hand

`grep -n "value.js" SpeedSelect.vue` → no match. The component performs two colour operations in raw
CSS: `color: var(--muted-foreground)` (`:58`) and
`color-mix(in srgb, var(--foreground) 15%, transparent)` (`:67`). This is the CSS-side twin of the
tree's other bypass — `lib/colors.ts:21-45` `cssVarToHex` + a hand-rolled `hslToHex`, the F.W2 "hand-rolled
arms". The pinned colour library (`@mkbabb/value.js@0.13.0`, bare specifier, 5 import sites, all
`easeInOutSine`/`timingFunctions` at `lib/easings.ts:9-16` and four others per `lane-frontend.md §5`)
is used for **no** colour work anywhere in the tree. Recorded as INFO because for *this* component the
CSS `color-mix` is the correct tool — the observation is that the value.js consumption surface is
easings-only, which is exactly why the value.js leg of the tri-package deadlock is the cheapest
(`lane-frontend.md §9` carry 5) and why SpeedSelect's uplift cost on that leg is zero.

### ⚪ SS-C-18 · INFO · The two variants differ in more than their stated axis

`:58` sets `color: var(--muted-foreground)` on `.speed-trigger`; `.speed-trigger-compact` sets no
`color` and inherits `--foreground`. A prop named `compact` changes the text colour. Contrast of
either pairing over the dock's translucent surface is unverified — see §4.

---

## §2 · Superlatives (L-18 runs both ways)

### ⭐ SUP-1 · The only fourier visualization component with zero 4→7 uplift exposure on its import surface

`lane-frontend.md §5` enumerates the break surface: `./metric-badge` ×7, `./hover-card` ×2,
`./hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `type ToastVariant` ×1.
`SpeedSelect` touches none. Verified against the producer: `node -e 'Object.keys(require("/Users/mkbabb/Programming/glass-ui/package.json").exports)'` → **`./select` present at 7.0.0**, and all
five imported symbols (`Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`,
`SpeedSelect.vue:3-9`) are the reka-shaped family the producer kept. Its *import* line survives the
uplift untouched — which is precisely why the CSS overrides (SS-C-3/4/5) are the real, and currently
unbudgeted, cost. **Falsifier.** A member-level removal inside `./select` at 7.0.0. The producer
export map retains the subpath; a member diff would need the 7.0.0 `select/index.ts`, which is
consistent with the four other fourier `/select` consumers (`ContourSettings`, `GallerySearchBar`,
`AdminUserList`, `MorphPhaseConfig`) all importing the same five names.

### ⭐ SUP-2 · Textbook consumer posture: deep subpath, zero reka-ui, zero shadow

One import statement, one subpath, five symbols, no root-barrel pull (`SpeedSelect.vue:3-9`). No
direct `reka-ui` import — matching the tree-wide `0` that `lane-frontend.md §3` calls *"the cleanest
glass-ui consumer posture in the constellation"*. No local shadcn copy; the deleted
`web/src/components/ui/select/Select.vue` is booked as retired in `docs/tranches/A/audit/W1-deletion-ledger.md:42`
with `SpeedSelect` named as the consumer that survived the retirement. The deep subpath is also what
keeps it inside the `vendor-ui` manual chunk (`vite.config.ts:40-56`) rather than dragging the barrel.
**Falsifier.** A transitive reka symbol reaching the SFC. There is none — every symbol crosses the
glass-ui boundary.

### ⭐ SUP-3 · A banked, test-cited a11y remediation whose accessible name actually computes

`aria-label="Playback speed"` (`SpeedSelect.vue:32`) is not decoration: `e2e/visualization-ux.spec.ts:181-182`
records it as the fix for an axe **`button-name` critical**. I verified the name survives the
primitive: reka's `SelectTrigger` emits `aria-controls`, `aria-expanded`, `aria-required`,
`aria-autocomplete` and **no `aria-labelledby`** (`grep -o '"aria-[a-z]*"' reka-ui/dist/Select/SelectTrigger.js`),
so nothing out-ranks `aria-label` in the accname computation. Many "fixed" aria-labels in Vue
component libraries are silently defeated by a primitive's own `aria-labelledby`; this one is not.
**Falsifier.** A `labelledby` forwarded by glass-ui's wrapper. `SelectTrigger.vue.d.ts` adds only
`class`, `variant`, `size` over `SelectTriggerProps`.

### ⭐ SUP-4 · The Tailwind-v4 scoped-`@apply` footgun is handled

`@reference "tailwindcss";` at `:48` — required for `@apply` inside an SFC `<style scoped>` block
under Tailwind v4/PostCSS (`vite.config.ts` `css.postcss.plugins:[@tailwindcss/postcss]`), and easy to
omit. The file's sibling `AnimationControls.vue` declares it in *both* its style blocks (`:131`,
`:204`), so this is a consistently applied house rule, not an accident. **Falsifier.** A build that
succeeds without it — it would not; `@apply text-sm` at `:54`/`:66` would fail to resolve.

### ⭐ SUP-5 · The `String` ⇄ `parseFloat` bridge is lossless over the entire declared domain

`String(0.25)==="0.25"`, `String(0.5)==="0.5"`, `String(1)==="1"`, `String(2)==="2"`,
`String(4)==="4"` — each matching a `SelectItem value=` exactly (`:38-42`), including the
JSON-round-trip forms (`1.0 → 1`, `2.0 → 2`) that a Python `float` wire produces. Within its domain
the string bridge never desyncs the trigger from the model. The domain is the problem (SS-C-10), not
the bridge. **Falsifier.** A domain member whose `String()` form differs from its item value — none of
the five does.

---

## §3 · Reconciliation with the hitherto corpus

| Corpus row | Disposition here |
|---|---|
| `lane-frontend.md §2` — SpeedSelect listed at 70 LOC, *"`Select` wrapper for playback speed"*, **not** flagged as a shadow | **CONFIRMED, and sharpened.** Correctly not a shadow — the shadow census is import-shaped and this component's imports are exemplary (SUP-1/2). The census's method cannot see SS-C-3/4/5, which are *CSS-shaped* re-implementations of producer props. **Method carry for F.W-UPLIFT: the 4→7 budget must include a scoped-CSS-vs-producer-prop pass, not only an import-diff pass.** |
| `lane-frontend.md §5` — the tri-package deadlock; value.js leg = 5 sites, *"the cheapest leg"* | **CONFIRMED and corroborated.** SpeedSelect adds zero value.js sites (SS-C-17). |
| `lane-frontend.md §9` carry 4 — 11 removed-subpath import sites | **CONFIRMED; SpeedSelect contributes 0** (SUP-1). |
| `lane-crud.md §1.1` — `animation_settings` = atom 4, 6 fields; `set_hash` = atom-set identity; §R-4 *"whole-snapshot duplication … a variant that changes one integer re-persists the whole bag"* | **ADOPTED AS FACT and extended.** This challenge adds that 3 of those 6 fields have **zero readers** and a 4th (`speed`) has **no read path** — so the bag being re-persisted is half-empty by construction (SS-C-1, SS-C-2). |
| Intake **R6-8** (TRUE) — *"the API operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"*; carry → F.W5 | **CITED, with the converse added.** R6-8 is the operation over-coupling to the client. SS-C-1 is the client **under**-covering the operation: `VisualizationPatch` (types.ts:256-262) ⊂ `VisualizationUpdate` (visualization.py:203-208) ⊂ the atom set. Both are the same seam failing in opposite directions; the ADMISSION KEYSTONE contract needs both rules. |
| Intake **R3-7a** (TRUE) — 35 Tooltip callsites / 9 consumers, AnimationControls = 4; carry → F.W3 | **CITED.** Two of those four wrap `SpeedSelect`; SS-C-9 makes one of them a defect row rather than a pure migration row, so the F.W3 adapter disposition must fix the *anchor target*, not merely re-point the import. |
| Intake **R5-7 / R6-5** — component-callsite-keyed derivation is blind to native element loops | **NOT APPLICABLE** here (no `v-for` in this file) — recorded so the negative is on the ledger. |
| `docs/audits/runs/2026-06-01-constellation-ui/fourier.md:26` — `SpeedSelect.vue:57,68` → `var(--radius-pill)` | **CONFIRMED UNREMEDIATED**, line-exact (SS-C-14). |
| `docs/tranches/A/audit/W1-deletion-ledger.md:42` — *"`SpeedSelect.vue` uses a native `<select>` chassis"* | **CONTRADICTED BY THE TREE.** The ledger's parenthetical is stale: today's file uses the glass-ui `Select` family (`SpeedSelect.vue:3-9`, `:31-44`) with no native `<select>` element. The row's *deletion* claim (the local shadow copy is gone) remains true and verified; only the chassis note is out of date. |

---

## §4 · UNPROVEN-NEEDS-LIVE register (SS-13)

Claims that require a running browser and are therefore **not asserted** above:

| # | Claim withheld | What would settle it |
|---|---|---|
| L-1 | Contrast ratio of `--muted-foreground` (`:58`) and of the inherited `--foreground` (compact, SS-C-18) over the `GlassDock` translucent surface. Note the token resolves through `--muted-foreground: contrast-color(var(--card))` in one of the glass-ui declarations — a CSS Color 5 function with narrow support — and the trigger does not sit on a `--card` surface. | Computed-style + axe colour-contrast on the expanded dock, light and dark. |
| L-2 | Whether opening the compact `Select` (portalled to `<body>`) inside the `DropdownMenu :modal="false"` (`AnimationControls.vue:103-118`) dismisses the parent menu via `pointerDownOutside`. Reka's `DismissableLayer` branch registration *may* handle the nesting; I could not settle it from the dist alone. | Open the ⋮ menu at <640 px, open the speed listbox, observe whether the menu survives. |
| L-3 | Whether the one-tick empty `optionsSet` (reka sets the off-screen `DocumentFragment` in `onMounted`, `SelectContent.js`) produces a visible blank-trigger flash on first paint. | Paint-timing capture / screenshot at first frame. |
| L-4 | The measured trigger-vs-item font delta at a given viewport (SS-C-3 gives the token algebra and the 1.00×–1.43× bound; the rendered value is viewport-dependent). | Computed `font-size`/`font-family` on the trigger and on a portalled `[role="option"]`. |
| L-5 | Whether the SS-C-4 override is still sufficient against glass-ui 7.0.0's rewritten control surface. | Build against 7.0.0 and inspect. |

---

## §5 · Carries

1. **[P0 · SS-C-1 + SS-C-6, coupled]** Wire a read path for `animation_settings` **and** add a
   `placeholder` / domain clamp in the same change, or explicitly demote `speed` out of the atom set.
   Fixing either alone converts one failure mode into another.
2. **[P0 · SS-C-2]** Rule on atom 4: either give `duration`/`fps`/`max_circles` readers and a single
   agreed unit, or shrink `AnimationSettings` to the three fields that are actually read. Version
   identity must determine the artifact.
3. **[P1 · SS-C-3/4/5]** Retire the scoped-CSS re-implementations onto `variant="ghost"` +
   `size="sm"` + the `--dropdown-text` family lever before the 4→7 hop. The producer's own d.ts names
   value.js as the prior offender on the font axis — fourier should not become the second citation.
4. **[P1 · SS-C-10]** Introduce `lib/speeds.ts` mirroring `lib/easings.ts`'s `ANIMATION_EASINGS`
   shape, and type the prop against it. This is the single change that makes SS-C-6 and SS-C-13
   unrepresentable.
5. **[P1 · SS-C-7 / SS-C-8]** Store-side: preserve ping-pong parity across `startLoop()`; drop
   `{ once: true }` on the speed/easing hydration.
6. **[P2 · SS-C-9]** F.W3 tooltip disposition must move the anchor onto the control, not merely
   re-point the import — the sibling fix is already recorded at `e2e/visualization-ux.spec.ts:177-179`.
7. **[P2 · SS-C-14]** `9999px` → `var(--radius-pill)`; a fourteen-month-old, line-exact booked carry.
8. **[P3 · SS-C-15]** Self-mitigate the `aria-hidden-focus` residual (`v-if` on dock expansion) rather
   than waiting on glass-ui's `inert`.
9. **[METHOD]** The 4→7 uplift budget in `lane-frontend.md §5` is import-shaped. SpeedSelect proves a
   component can be import-clean and still carry three producer-contract violations. Add a
   scoped-CSS-vs-producer-prop pass to the wave.
