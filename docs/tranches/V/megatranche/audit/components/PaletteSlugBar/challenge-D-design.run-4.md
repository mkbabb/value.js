# CHALLENGE-D — `PaletteSlugBar.vue` · design axis · run-4

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. That is the tier
this seat was spawned with, declared explicitly in the seat brief. Not inherited, not Fable, not
Sonnet, not Haiku. An undeclared or inherited seat is a DEFECT; this one is declared.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines, area `palettes`).
Base: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Prior runs preserved verbatim at `./challenge-D-design.run-1.md`, `run-2`, `run-3`.
New probes this run: `./probes/psb-wrap.mjs`, `./probes/psb-role.mjs`.

**Scope law honoured.** I wrote only under
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/` (this file, the `run-3` archive, two
probes). Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was edited. Browser work was read-only navigation plus
transient DOM injection removed inside the same `evaluate`.

---

## 0. Verdict

**DEFECTIVE — BLOCKER.**

The standing BLOCKER is not mine to claim: three prior runs established that this component renders
on zero routes. I re-derived it in one command (§1) and accept it. **This run's job was to find what
the previous three did not**, and the answer is that the orphan is not merely homeless — **its
authored design is unimplementable at the mandated viewport arms and unannounceable to two of the
three input modalities**, and both failures are inherited from recipes that ship live next door.

The four new findings, in severity order:

- **D-19** — the identity pill has **no containment law at all**. Measured: at the 390px arm the
  longest real slug renders as a **two-line lozenge, 45.28px tall against a 25.69px single line**;
  at 320px even the *median* slug wraps. The `whitespace-nowrap` patch the three shipping siblings
  hand-apply does not fix it — it converts the wrap into a **92.63px overflow past the pane at
  320px**. Neither branch was designed.
- **D-20** — the *only* explanation of what a slug is announces as **nothing on desktop** (reka
  `HoverCard*`: `role` occurrences = **0**) and as **`role="dialog"` on touch**, on a `<span>`
  measured at `tabIndex: -1`. The design system already ships `Tooltip` (`role="tooltip"` +
  auto-wired `aria-describedby`), and five demo components consume it.
- **D-21** — the **admin state is a trap**: the pill is state-switched, the menu is not, so an
  admin gets no `Logout` row and *is* offered a regenerate action that fires against an identity
  the admin branch has already cleared.
- **D-22** — the failure message is authored **outside the mode it belongs to** and **no path
  clears it**: cancel, Escape and the exposed `resetEditMode()` all leave it pinned under a form
  that no longer exists.

Plus two register violations (**D-23**, **D-24**) and one system-boundary observation (**D-25**).

Disposition is unchanged from run-3: **DELETE** — but §6 records that **three of the four new
findings do not die with the file**, because they are recipe-level and still live on the surfaces
that ship.

---

## 1. What this run did differently

Runs 1–3 converged on the orphan and worked outward from it. I took the premise literally — *assume
the design is wrong* — and asked a different question: **if this component were mounted tomorrow
exactly as authored, what would break, and is the breakage local or inherited?** That reframing is
what surfaced D-19 (inherited from `.slug-pill`'s root recipe), D-20 (inherited from the
hover-`Popover` idiom), and D-25.

I also deliberately re-measured one prior claim rather than confirming it, and **it did not
survive** — see §5.1. Run-1 concluded the pill "simply overflows"; measured inside the real
constrained pane, the as-authored pill **wraps** and the *patched* pill overflows. Same recipe,
opposite failure mode, and the correction inverts the cure.

The zero-render fact, re-derived in one command (all matches are a barrel line and a **type-only**
import — no `<PaletteSlugBar` tag exists anywhere):

```
$ grep -rn "<PaletteSlugBar\|slug-bar\|SlugBar" demo/ e2e/ test/ | grep -v browser/slug/index.ts | grep -v browser/index.ts
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
e2e/smoke/flows/login-register.spec.ts:6: * The SlugBar live-app surface is only inside the PaletteDialog
```

---

## 2. Visual truth first

Two captures from the mega-tranche Safari matrix, read directly.

**`shots/safari-desktop-dark/palettes.png`** — the `My Palettes` pane header is
`headline → subhead → search`. There is **no slug bar**. Identity lives in the dock band at the top
of the frame: a `Login` pill and an `@mbabb` pill, both in the mono chrome voice, both inside the one
glass surface. That is the composition the constitution describes.

**`shots/safari-mobile-light/palettes.png`** — the dock collapses to
`palette-glyph · Picker/Palettes segmented · ⋮`. Identity has folded entirely into the `⋮`. The pane
header below is again `headline → subhead → search`, straight into `Start a new palette`. Again no
slug bar.

The negative observation is the load-bearing one, and it is a *positive* proof: the header
composition is complete without this component in **both** matrices. Nothing in either frame is
waiting for a bar. There is no void where it used to sit, no orphaned gap, no rhythm break. The
design that shipped did not lose an element — it **subtracted** one, which is exactly what
`SUBTRACTION.md` / `PROPORTION-AUDIT §5.6` ("subtraction precedes explanation") asks for.

Consequently the honest design judgement on the *visible* axis is: the pane header is right, and the
subject is the thing that would make it wrong. Everything below is measured on the authored recipe,
in the live cascade, injected into the pane it was authored for.

---

## 3. New findings

### D-19 · MAJOR — the identity pill has no containment law; both of its failure modes ship

**The recipe.** `demo/styles/foundation.css:585-587`:

```css
.slug-pill {
    @apply text-mono-small font-bold px-2 py-0.5 rounded-full border;
}
```

No `white-space`. No `max-inline-size`. No `min-inline-size: 0`. No `overflow` / `text-overflow`. The
comment two lines above (`:580-582`) says it exists so the chip "was copy-pasted at 5+ sites" no
longer is — yet **three of its four consumers immediately hand-patch it back**:

| site | patch applied per instance |
|---|---|
| `demo/shell/dock/menus/ProfileSection.vue:73`, `:96` | `whitespace-nowrap` |
| `demo/shell/dock/menus/MobileMenuDropdown.vue:48`, `:67` | `whitespace-nowrap` |
| `demo/palettes/browser/admin/AdminUsersPanel.vue:98`, `:167` | `flex items-baseline min-w-0 max-w-full` / `inline-block align-middle mx-0.5` |
| **`demo/palettes/browser/slug/PaletteSlugBar.vue:48`, `:65`** | **none** |

Four consumers, three different containment strategies, one with none. That is edict 5 inverted: the
root was extracted for *paint* and left un-extracted for *geometry*, so every consumer re-decides
geometry per instance — which is precisely the copy-paste the extraction claimed to end.

**The corpus.** A user slug is `adjective-verb-color-animal`
(`api/src/modules/session/slugWords.ts:99-104`). Longest possible member of each list: `iridescent` /
`threading` / `champagne` / `jellyfish` → **40 characters with three soft-wrap opportunities**, since
hyphens are break opportunities in CSS by default.

**Measured** — `probes/psb-wrap.mjs`, injected into the live `My Palettes` pane at
`http://localhost:9000/#/palettes`, WebKit, at the `PROPORTION-AUDIT §2` viewport arms:

```
vw          slug        nowrap      white-space lineBoxes   pillW       pillH       hostW       overflowPx
1440        long-40ch   as-authored normal      1           421.7       28.94       510         -64.3
1440        long-40ch   PATCHED     nowrap      1           421.7       28.94       510         -64.3
390         long-40ch   as-authored normal      2           296.01      45.28       356.04      -44.01
390         long-40ch   PATCHED     nowrap      1           362.63      25.69       356.03      22.62
390         median-32ch as-authored normal      1           293.71      25.68       356.03      -46.3
320         long-40ch   as-authored normal      2           226         45.19       286         -44
320         long-40ch   PATCHED     nowrap      1           362.63      25.59       286         92.63
320         median-32ch as-authored normal      2           226         45.19       286         -44
320         median-32ch PATCHED     nowrap      1           293.7       25.59       286         23.7

font: "Fira Code" 16.4px, border 1px
```

Read the two failure modes off the same table:

- **As authored** (no patch): at 390px a real 40-char slug becomes a **two-line stadium, 45.28px
  tall** — a `+76%` height blowout against the 25.69px single line — inside a `rounded-full` box
  whose border-radius is ~22.6px and whose vertical padding is `py-0.5` = **2px**. Two 20.6px mono
  lines crammed into a lozenge with 2px of breathing room, the second line riding the bottom arc. At
  320px the **median** slug does it too.
- **Patched** (the siblings' `whitespace-nowrap`): the wrap is traded for **+22.62px past the pane at
  390px and +92.63px at 320px** — a 32% overrun of the 286px content box.

There is no width at which the recipe is correct for a 40-char token. The design never decided
whether the identity string is *layout* (must fit) or *data* (must be complete), so it is neither.

**It also defeats the component's own reserve.** The root is `min-h-9` (`:2`) = 36px. The wrapped
pill measures 45.28px. The floor that exists to hold the bar steady across the `mode="out-in"` swap
is **9.28px short in exactly the case it was built for**, so the layout jumps anyway — see D-24.

**Cure (root, not patch).** Give `.slug-pill` the containment it was extracted to own:
`white-space: nowrap; min-inline-size: 0; max-inline-size: 100%; overflow: clip; text-overflow:
ellipsis;` and delete all six per-instance patches. The full string stays recoverable through the
named `Copy slug` action that already exists — identity is *data* in the clipboard and *label* in the
layout, and the two stop fighting.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/psb-wrap.mjs`
(dev server on :9000).

---

### D-20 · MAJOR — the account model's only explanation is announced as nothing, or as a dialog, and never to the keyboard

`PaletteSlugBar.vue:45-59` is the sole place in the component that explains what a slug *is* —
*"This is your unique identity. Use it to sign in from any device and access your palettes."* It is
delivered as:

```vue
<Popover v-if="userSlug" trigger="hover" :close-delay="0" :open-delay="300">
  <PopoverTrigger as-child>
    <span class="slug-pill cursor-help" :style="…">{{ userSlug }}</span>
```

glass-ui's `Popover` is a **union of two roots**, selected by pointer capability. Extracted from the
shipped bundle `node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js`:

```
$ grep -o "HoverCardRoot\|HoverCardContent\|PopoverRoot\|PopoverContent\|usesHoverRoot" … | sort | uniq -c
   1 HoverCardContent
   1 HoverCardRoot
   3 PopoverContent
   1 PopoverRoot
   3 usesHoverRoot
```

and the producer documents the switch itself
(`glass-ui/dist/components/popover/popoverContext.d.ts`):

> `true` when the fine-hover HoverCardRoot branch is live; `false` → the PopoverRoot branch (click /
> coarse-pointer-promoted hover). A coarse-pointer hover trigger resolves `false` — reka's
> `excludeTouch` leaves the hover root structurally dead on touch, so the union promotes it to the
> tap-toggle PopoverRoot.

Now the roles each branch actually publishes, measured against the installed `reka-ui`:

```
$ grep -rno "role" node_modules/reka-ui/dist/HoverCard/*.js
(no output — role occurrences = 0)

$ grep -o 'role:[^,}]\{0,20\}' node_modules/reka-ui/dist/Popover/PopoverContentImpl.js
role: "dialog"

$ grep -o 'role:[^,}]\{0,20\}' node_modules/reka-ui/dist/Tooltip/TooltipContentImpl.js
role: "tooltip"

$ grep -rno "aria-describedby" node_modules/reka-ui/dist/Tooltip/TooltipTrigger.js
88:aria-describedby
97:aria-describedby
```

So the same authored markup produces **three different, all wrong, experiences**:

| modality | branch | what the user gets |
|---|---|---|
| desktop fine pointer | `HoverCardRoot` | a visual card with **no role and no `aria-describedby`** — the explanation is not in the accessibility tree at all |
| touch / coarse pointer | promoted `PopoverRoot` | tapping an unlabeled `<span>` opens **`role="dialog"`** containing two paragraphs of prose |
| keyboard / AT | neither | unreachable — measured (`probes/psb-role.mjs`): `{"tabIndex":-1,"focused":false,"role":null}` for `<span class="slug-pill">` |

**The design system already owns the right primitive.** `demo/ui/tooltip/index.ts`:

```ts
export { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@mkbabb/glass-ui";
```

Five demo components consume it (`ColorNutritionLabel`, `ConsoleRail`, `HeroBlob`, `ColorInput`,
`CurrentPaletteEditor`); the exemplar is `CurrentPaletteEditor.vue:88-110` —
`<TooltipProvider :delay-duration="200">` → `TooltipTrigger as-child` → `TooltipContent
class="text-mono-small"`. That path yields `role="tooltip"`, auto-wires `aria-describedby` on the
trigger, and works from focus as well as hover. Reaching past it to a hover-`Popover` is an **edict 4
violation** (reuse the existing component-type name), and the a11y outcome above is the price.

**But the deeper design ruling is subtraction, not substitution.** `PROPORTION-AUDIT §5.6`:

> Add affordance when the surviving action/state is otherwise undiscoverable; do not compensate for
> an unnecessary action with tooltip proliferation. **Subtraction precedes explanation.**

and `§5.5`:

> A small icon/mark is either data, status, labeled action, drag affordance, focus/selection register
> or removed. Decorative controls and operable ornaments without names are forbidden.

A `cursor: help` chip that needs 27 words of prose to say what it is, is an identity affordance that
failed to be self-evident. The cure is the label, not the tooltip: the shipping dock surface simply
puts the slug inside a `DropdownMenuLabel` under a named `Profile` trigger
(`ProfileSection.vue:71-76`) — context supplies the meaning and nothing needs explaining.

**Reproduction:** `node …/probes/psb-role.mjs`. Note the probe's live-hover legs returned empty
(`surfaces: []`) — the dock/tooltip triggers it reached for were not open on `/palettes` — so the
*rendered* roles above are established from the installed primitive sources and the producer's own
contract, **not** from a live capture. The `tabIndex: -1` line **is** a live measurement.

---

### D-21 · MAJOR — the admin state is a trap: no exit, plus an action against an identity that was cleared

The pill is state-switched three ways (`:45` `v-if="userSlug"` → `:63` `v-else-if="isAdmin"` → `:71`
`v-else`). **The menu is not.** `:81-120` is a sibling of that whole chain and renders in every
state. Inside it:

| row | gate | admin sees it? |
|---|---|---|
| `Copy slug` (`:89`) | `v-if="userSlug"` | no |
| `Switch account` (`:97`) | ungated | **yes** |
| `Logout` (`:104`) | `v-if="userSlug"` | **no** |
| `Regenerate slug` / `Generate slug` (`:112`) | **ungated** | **yes** |

An authenticated admin therefore has **no exit affordance anywhere in the component**. The only way
out is to "Switch account" into something else — i.e. the design models *leaving* as *becoming
someone else*.

Worse, the ungated row is live. `:114` emits `regenerate`, which lands on
`useSlugMigration.onRegenerateSlug()` (`useSlugMigration.ts:91-104`) → `deps.userRegenerate()` — the
**user** slug regeneration path. But the admin branch of `onSlugSwitch` has already run
`deps.clearUserSlug()` (`useSlugMigration.ts:52-56`). So in admin state the menu offers an action
that operates on an identity the same module just cleared. The label even shifts to `Generate slug`
(`:117`, `userSlug ? 'Regenerate slug' : 'Generate slug'`) — the copy is state-aware while the
*behaviour* is not, which is the most misleading possible combination.

The two shipping surfaces do not have this hole, and the way they avoid it is instructive: both put
the entire menu **inside** the `v-if="userSlug"` template and render admin as a bare pill with no menu
at all (`ProfileSection.vue:94-99`, `MobileMenuDropdown.vue:65-67`). They are incomplete — admin
still has no logout — but they are not *lying*. The orphan is the only place a stateless menu is
painted over a stateful pill.

**Design mechanism:** one half of a two-part cluster knows the state machine and the other half does
not. The cure is structural, not a fourth `v-if`: the row set is a function of the session state, so
the state should select it once (signed-out / user / admin) the way the pill already does, instead
of each row re-deriving it from `userSlug` truthiness.

**Reproduction:** static, from the template gates listed above; unmountable in situ (D-1), so
labelled a **code-path reproduction**, not a live one.

---

### D-22 · MAJOR — the failure message lives outside its own mode, and nothing clears it

`:124-126`:

```vue
<p v-if="slugError" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">
```

It sits **outside** the `<Transition>` that wraps `:5-121`. So the error survives the mode swap by
construction. Now trace every writer and every clearer of `slugError`:

| line | operation |
|---|---|
| `:165` | `const slugError = ref("")` |
| `:174` | cleared — **`onStartSlugEdit()` only** |
| `:202` | cleared at the start of a submit |
| `:208` | set — "Already signed in as this slug." |
| `:218-221` | set — the (dead, run-3 D-8) substring branches |
| `:228` | set — via the exposed `setError()` |
| `:36` | `@click="slugEditMode = false"` — **does not clear** |
| `:14` | `@keydown.escape` → `slugEditMode = false` — **does not clear** |
| `:231-234` | `resetEditMode()` → clears `slugInput`, sets `slugEditMode = false` — **does not clear** |

The exposed reset — the one function an owner would call to return the component to rest — is the
clearest tell: it resets the *input* and the *mode* and leaves the *error*.

The rendered consequence: submit a bad slug → `setError("Slug not found.")` → press `✕` → the form
transitions out, and a red 16.4px Fira Code line stays pinned 16px below a bar that now shows a
`Login` pill or a slug chip. The message references a field that no longer exists, is associated with
nothing (`aria-describedby` / `aria-invalid` absent — run-3 D-3), and persists for the life of the
component unless the user happens to re-enter edit mode.

`PROPORTION-AUDIT §4 PR-08` disposes this family **ADD-AFFORDANCE — "Persistent entity
status/recovery"**. What is authored is persistence *without* recovery: the status outlives the
control that could act on it. That is not the row being closed; it is the row being closed backwards.

**Cure:** the error belongs to the edit mode, so it belongs *inside* the transitioned subtree and
inside the form's own layout flow (its own reserved line, not `absolute … -bottom-4`), where mode
exit destroys it for free and no clearing call has to be remembered. One placement change removes
the need for three clearers.

---

### D-23 · MINOR — raw accent ink, and it is bound live to a control the user is dragging

`:49` — `:style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"`, raw.

The shipping twin does not do this. `ProfileSection.vue:15,28-31`:

```ts
import { useSafeAccentFn } from "../../../color-session/useContrastSafeColor";
const { safeCss: chromeSafeCss }   = useSafeAccentFn("chrome");
const { safeCss: floatingSafeCss } = useSafeAccentFn("floating");
const triggerInk = computed(() => chromeSafeCss(cssColorOpaque));
const menuInk    = computed(() => floatingSafeCss(cssColorOpaque));
```

Run-3 already measured the contrast consequence (`probes/psb-ink.mjs`); I do not re-derive it. Two
things it did not say:

1. **There is no certified tier for where this pill sits.** `useSafeAccentFn` is keyed on the
   *surface* — `useContrastSafeColor.ts:21-36` documents the guard as "keyed on THE SURFACE (D6, the
   ink-on-tier contract)" with per-rung composited lightness. `"chrome"` is the dock band;
   `"floating"` is the menu plate. A pill in a **pane header** is on neither rung, so even the correct
   API has no answer for this placement. The missing certification is not an isolated oversight — it
   is a second-order symptom of D-1: an element with no home has no tier, and with no tier there is
   no ink contract to satisfy.
2. **It is chrome bound to a live drag.** `cssColorOpaque` is the currently-picked color. Bound raw
   into an inline style, the user's *identity chip* re-paints its text and border on every
   `pointermove` of the spectrum canvas. `ProfileSection` at least routes it through a `computed` on a
   guard function, which both clamps the excursion and collapses redundant writes. The design question
   underneath is whether identity may be a palette-derived surface at all: `PALETTE-CONTRACT` treats
   the slug as *identity* ("Session-derived attribution — contributor identity comes from the
   session"), not as palette content, and the forced-colors / print rosters in
   `foundation.css:678-722` and `:800-841` classify by exactly that distinction — color-*display*
   surfaces keep their ink, chrome adopts system colors. An identity chip painted in the live picked
   color is chrome pretending to be content.

---

### D-24 · MINOR — `min-h-9` is a reserve of the wrong quantity, on an axis the design system already tokenises

`:2` — `class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9"`.

Measured content height (`probes/psb-wrap.mjs`): **25.59 – 28.94px** single-line across the three
arms; **45.19 – 45.28px** wrapped. Against the 36px floor:

- single line → **7.06 – 10.41px of unowned vertical band** the bar reserves and never paints;
- wrapped → **9.19 – 9.28px short**, so the jump the floor exists to prevent happens anyway.

`PROPORTION-AUDIT §5.3`: *"Renderer, icon or touch footprints may reserve collision space only on the
axis where collision exists."* `§5.7`: *"Visual glyph size, operable target size and layout
reservation are separate quantities."* This is one magic number standing in for all three.

And the correct instrument was available and explicitly declined. `demo/styles/animations.css`
documents the morph family's height mechanism — `--vj-morph-collapse` / `--vj-morph-expanded`
(`:122`, `:131`, `:135`) — while the component's entire scoped style block is:

```css
@reference "../../../styles/foundation.css";
/* slug swap rides the morph family (R.W4 B1) — default geometry. */
```

"Default geometry" means `max-height: none` on both ends, i.e. **no height morph at all**, which is
precisely why a fixed floor had to be invented in the utility classes instead. The tokenised lever was
left unset and replaced by a hard-coded one — the exact inversion of edict 6's "tokenized, not ad
hoc". `pt-0.5` (2px) is a further off-ladder optical nudge with no token and no comment.

---

### D-25 · INFO — two competing hover-explanation primitives coexist, and the producer's tuned delays are overridden at every site

```
$ grep -rn 'trigger="hover"\|open-delay\|close-delay' demo/
demo/shell/dock/ActionButton.vue:4:        trigger="hover"
demo/shell/dock/ActionButton.vue:7:        :close-delay="0"
demo/shell/dock/ActionButton.vue:8:        :open-delay="300"
demo/shell/dock/ColorInput.vue:4:            trigger="hover"
demo/shell/dock/ColorInput.vue:5:            :close-delay="0"
demo/shell/dock/ColorInput.vue:6:            :open-delay="300"
demo/palettes/browser/slug/PaletteSlugBar.vue:45:            <Popover v-if="userSlug" trigger="hover" :close-delay="0" :open-delay="300">
```

against the producer's designed defaults, extracted from the shipped bundle:

```
$ grep -o 'openDelay: { default: [0-9]*\|closeDelay: { default: [0-9]*' …/popover-BQGYXZyO.js
openDelay: { default: 250
closeDelay: { default: 150
```

Three sites, identical override, no recorded rationale at any of them. `closeDelay: 0` removes the
150ms pointer-travel grace the producer tuned for crossing the `side-offset` gap between trigger and
content — on a `w-56` (224px) prose card the user is meant to *read*, that is the one delay that
should have been lengthened, not zeroed.

Meanwhile five other components use `Tooltip` + `TooltipProvider :delay-duration="200"`. Nothing in
the canon rules which of the two is the house explanation primitive, so the tree has drifted into
both. This is INFO because the drift is not this component's fault — but this component is the one
that used the wrong one for the wrong job (D-20).

**Also INFO, edict 7:** `:166` uses `ref<InstanceType<typeof SearchBar> | null>(null)` plus a string
`ref="searchBarRef"` where `useTemplateRef` is the house idiom — `demo/` has ~10 call sites including
`SlugEditLayer.vue` (2), the very component that superseded this one. Implementation-axis adjacent;
noted here only because it means the orphan is idiomatically older than its own replacement.

---

## 4. State enumeration — what was never designed

Every state this component can be in, judged. `∅` = no design exists.

| state | designed? | evidence |
|---|---|---|
| signed-out (Login pill) | partial | hand-rolled `<button>` `:71-78`, outside the `.slug-pill` root and outside the `prefers-contrast` roster (run-3 D-15) |
| signed-in (slug pill) | **broken** | D-19 — wraps at 390/320 |
| admin | **broken** | D-21 — no exit; ungated regenerate |
| edit / form | **broken** | run-3 D-2 — submit lands on the `<input>` |
| pending | **∅ unrenderable** | run-2/run-3 D-7 — `slugSwitching` set and cleared synchronously, never paints |
| error | **broken** | D-22 outside its mode, never cleared; run-3 D-3 overflow + no live region |
| empty (session resolving) | **∅** | no loading treatment — `userSlug: null` renders the `Login` pill, so a signed-in user sees "Login" flash before hydration |
| disabled | partial | only the submit button (`:23`); the pill and menu have no disabled register |
| focused | partial | `focus-visible:ring-2 ring-ring/40` on the buttons; the pill is **`tabIndex: -1`** (measured), so it has no focus state at all |
| hovered | yes | `hover:bg-accent` on the buttons |
| active / pressed | ad hoc | `active:scale-95` / `active:scale-[0.98]` with `transition-colors` only — the scale is not in `transition-property` (run-3 D-10) |
| selected | n/a | no selection model |
| dragging | n/a | |
| overflowing | **∅** | D-19 — no `min-w-0`, no `max-w`, no truncation anywhere in the cluster |
| truncated | **∅** | never designed; there is no ellipsis path |
| RTL | **∅** | the slug is not `dir`/isolation-wrapped (run-3 D-17); `left-0` / `-bottom-4` are physical, not logical, properties |
| reduced-motion | inherited | global guard `animations.css:184-192` neutralises the morph and freezes `animate-spin` — but the frozen spinner would then be the *only* pending signal, and pending never renders anyway (D-7) |
| forced-colors | inherited | `.slug-pill` is **not** in the tier-1 roster (`foundation.css:678-698`) and correctly takes UA `auto` — see §5.2, **not** a defect |
| prefers-contrast: more | inherited | `.slug-pill` **is** in the roster (`foundation.css:746`) → `border-width: 2px` — also not a defect |
| zoom 200% | untested | zero captures exist (component renders nowhere) |

**11 of 20 states are broken or were never designed.** The two that are *correctly* handled
(`forced-colors`, `prefers-contrast`) are handled by the root class the component happens to consume,
not by anything the component authored — which is the strongest argument for D-19's cure: put the law
in the root and the consumer inherits correctness instead of re-deciding it.

---

## 5. Negative proofs

### 5.1 A prior finding corrected

Run-1 measured the pill at **502.44px** in an unconstrained injection and concluded *"The root is a
plain `flex` with no `flex-wrap` and no `min-w-0`, so it simply overflows."*

Measured inside the real constrained pane, that is **not what happens**. As authored, `white-space`
resolves to `normal`, hyphens are break opportunities, and the flex item's `min-content` width is a
single word — so it **wraps** (2 line boxes, 45.28px) rather than overflowing. The 502px figure is
`max-content`, realised only when nothing constrains it. Overflow is what the *patched* variant does.
Both prior conclusions ("it overflows"; "the siblings at least add `whitespace-nowrap` — still no
truncation, but explicit") are therefore half-right in a way that inverts the cure: adding `nowrap` to
`PaletteSlugBar` would **create** a 92.63px overflow at 320px, not fix anything. The root needs
`nowrap` **and** `max-inline-size` **and** `text-overflow` together, or none of them help.

### 5.2 Two suspicions I killed

- **"The pill is missing from the accessibility media rosters."** False. `.slug-pill` is in the
  `prefers-contrast: more` roster (`foundation.css:728-750` → `border-width: 2px`), and its *absence*
  from the `forced-colors` tier-1 roster (`:678-698`) is **correct** under the documented two-tier
  policy (`:654-657`): color-*display* surfaces keep `forced-color-adjust: none`; chrome adopts system
  colors. An identity chip is chrome. Only the hand-rolled Login `<button>` (`:71-78`) escapes both,
  which run-3 already recorded as D-15.
- **"`verbatimModuleSyntax` is violated."** False. `:131-145` imports only values (`ref`, `nextTick`,
  `SearchBar`, `Button`, the `Popover` trio, eight icons, `writeClipboard`). There is no type-only
  import in the file to mis-declare, and `InstanceType<typeof SearchBar>` at `:166` correctly relies on
  the *value* import. Edict 8: clean.

### 5.3 What is genuinely well-made

Naming the good parts is what makes the rest a judgement rather than a hunt. `normalizeTokenInput`
(`:188-196`) is a small, focused, pure function that strips `ADMIN_TOKEN=` prefixes and matched quotes
— it correctly anticipates a real paste shape. Reactive props destructure at `:147` is the Vue 3.5
idiom. The three `aria-label`s added by W5-a11y (`:24`, `:35`, `:84`) plus `:aria-expanded` /
`aria-haspopup` on the menu trigger are real, correct work. The file is 243 lines and is not a god
module (edict 1: clean). None of that is enough — the composition is wrong at the level *above* the
code — but it is not slop.

---

## 6. Disposition

| id | severity | finding | mechanism | status |
|---|---|---|---|---|
| D-1 | BLOCKER | zero render path; contradicts `VISUAL-CONSTITUTION.md:222`; `slugBarRef` permanently `null` | orphaned composition | prior runs; re-derived §1 |
| D-2 | BLOCKER | `@submit` lands on the `<input>` via `SearchBar`'s `inheritAttrs:false`; live WebKit performs a native GET and reloads the SPA | producer-contract misuse | run-3, confirmed there |
| **D-19** | **MAJOR** | `.slug-pill` has no containment law; as-authored **wraps to 2 lines / 45.28px** at 390px, `nowrap` patch **overflows +92.63px** at 320px; 6 per-instance patches across 4 consumers | root recipe incomplete → per-instance geometry (edict 5) | **NEW, measured** |
| **D-20** | **MAJOR** | the slug explanation is `role`-less on desktop (HoverCard role count 0), `role="dialog"` on touch, unreachable by keyboard (`tabIndex: -1`); `Tooltip` exists and 5 components use it | design-system boundary (edict 4) + PR-05/PR-06 subtraction law | **NEW** |
| **D-21** | **MAJOR** | admin state has **no Logout**, and an **ungated regenerate** that fires against a cleared identity; pill is state-switched, menu is not | state machine known by half the cluster | **NEW** |
| **D-22** | **MAJOR** | error `<p>` authored outside the `<Transition>`; cancel / Escape / `resetEditMode()` all leave it set | failure surface not owned by its mode; PR-08 inverted | **NEW** |
| D-3 | MAJOR | error overflow 16px / 8px collision, `nowrap` clip, no role / live region / field association | unowned failure surface | prior runs |
| D-4 | MAJOR | raw uncertified accent ink | missed D6 certification | prior runs |
| D-5 | MAJOR | hover-only help on a non-focusable `<span>` | PR-07 | prior runs; deepened by D-20 |
| D-6 | MAJOR | 22 × 22px operable target vs SC 2.5.8's 24 × 24 | PR-12 | prior runs |
| D-7 | MAJOR | pending state structurally unrenderable | unreachable designed state | prior runs |
| D-8 | MAJOR | dead substring error-branching on a `catch` that cannot fire | legacy dual path (edict 2) | prior runs |
| D-9 | MAJOR | admin secret typed into `type="search"` | credential hygiene | prior runs |
| **D-23** | **MINOR** | raw ink **and** no certified tier exists for a pane-header pill; identity chrome re-paints on every picker `pointermove` | tier contract has no rung for a homeless element | **NEW half** |
| **D-24** | **MINOR** | `min-h-9` reserves 7.06–10.41px of unpainted band and is 9.28px short when it matters; `--vj-morph-collapse/-expanded` explicitly left unset | magic number for a tokenised lever (edict 6) | **NEW** |
| D-10 | MINOR | two press scales absent from `transition-property`; 50ms magic delay | ad-hoc motion | prior runs |
| D-11 | MINOR | Fira Code + bold on a control label vs the closed §5.13 type matrix | closed type matrix | prior runs |
| D-12 | MINOR | `hasSavedPalettes` unused; `copy` never emitted | dead public surface | prior runs |
| D-13 | MINOR | four hand-rolled rows in a `Popover` where `DropdownMenu` ships next door | design-system boundary | prior runs |
| **D-25** | **INFO** | two competing hover-explanation primitives; producer delays overridden at all 3 sites; `useTemplateRef` not used | unruled idiom drift | **NEW** |
| D-14 | INFO | zero coverage in forced-colors / RTL / zoom-200 matrices | unobserved by construction | prior runs |

**Terminal verb: REMOVE.** Delete `PaletteSlugBar.vue`, `demo/palettes/browser/slug/`, the barrel line
at `demo/palettes/browser/index.ts:44`, and the dangling `slugBarRef` machinery in
`useSlugMigration.ts:6,30,84-87,121` — with the error path re-homed on `SlugEditLayer` **first**, since
deleting the orphan without that removes the app's last written login-failure copy.

**But three of the four new findings do not die with it**, and this is the part a
delete-and-move-on disposition would lose:

- **D-19 is a root-recipe defect** — `.slug-pill` still has no containment law, and its three
  surviving consumers still hand-patch geometry per instance. Carry to the `foundation.css` owner.
- **D-20 is an idiom defect** — `ActionButton.vue` and `ColorInput.vue` still deliver explanations
  through role-less HoverCards. Carry to the dock owner **and** to the BH glass-ui relay, since the
  union's a11y behaviour is producer-side.
- **D-21's admin hole is systemic** — `ProfileSection` and `MobileMenuDropdown` also give an
  authenticated admin no exit. Carry to the account-surface owner.

Only **D-22** and **D-24** are local to the orphan and die with it.

---

## 7. Reproductions

```bash
# zero render path
grep -rn "<PaletteSlugBar\|slug-bar\|SlugBar" demo/ e2e/ test/ \
  | grep -v browser/slug/index.ts | grep -v browser/index.ts

# D-19 — wrap / overflow at the PROPORTION-AUDIT §2 arms (dev server on :9000)
node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/psb-wrap.mjs

# D-19 — the per-instance patch census
grep -rn "slug-pill" demo/

# D-20 — the roles each branch of the Popover union publishes
grep -rno "role" node_modules/reka-ui/dist/HoverCard/*.js                              # → 0 matches
grep -o 'role:[^,}]\{0,20\}' node_modules/reka-ui/dist/Popover/PopoverContentImpl.js   # → role: "dialog"
grep -o 'role:[^,}]\{0,20\}' node_modules/reka-ui/dist/Tooltip/TooltipContentImpl.js   # → role: "tooltip"
grep -o "HoverCardRoot\|PopoverRoot\|usesHoverRoot" node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js
node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/psb-role.mjs   # tabIndex: -1

# D-21 — the ungated menu rows and the cleared identity
sed -n '81,120p' demo/palettes/browser/slug/PaletteSlugBar.vue
sed -n '51,57p;91,104p' demo/palettes/useSlugMigration.ts

# D-25 — the delay overrides vs the producer defaults
grep -rn 'trigger="hover"\|open-delay\|close-delay' demo/
grep -o 'openDelay: { default: [0-9]*\|closeDelay: { default: [0-9]*' \
  node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js
```

Canon consulted: `docs/tranches/V/PROPORTION-AUDIT.md` (§2 viewport arms; §4 PR-05/PR-07/PR-08/PR-12/
PR-16; §5.3/§5.5/§5.6/§5.7/§5.13), `docs/tranches/V/VISUAL-CONSTITUTION.md:222`,
`docs/tranches/V/PALETTE-CONTRACT.md` (session-derived attribution),
`docs/tranches/V/SUBTRACTION.md`.
