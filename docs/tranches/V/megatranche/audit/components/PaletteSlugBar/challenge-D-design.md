# CHALLENGE-D — `PaletteSlugBar.vue` · design axis · run-5

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. That is the tier
this seat was spawned with, declared explicitly in the seat brief. Not inherited, not Fable, not
Sonnet, not Haiku.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines, area `palettes`).
Base: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Prior runs preserved verbatim at `./challenge-D-design.run-1.md` … `run-4.md`.
New probe this run: `./probes/psb-emphasis-type.mjs` (+ `.out.txt`).

**Scope law honoured.** I wrote only under
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/` — this file, the `run-4` archive, one
probe, one probe output. Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`,
`docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any `INBOX.md` was touched. Browser work was
read-only navigation plus transient DOM injection removed inside the same `evaluate`.

---

## 0. Verdict

**DEFECTIVE — BLOCKER.** Disposition unchanged: **REMOVE**.

Four prior runs established the standing BLOCKER (this component renders on zero routes) and
twenty-five findings. I re-derived the orphan fact in one command (§1) and accept it. **This run's
job was to find what four prior runs did not.**

The answer is a family nobody had opened: **the file is written against a producer API that no longer
exists, and against a type matrix it silently loses to.** Both breaks are invisible in source review
— the code reads correctly, compiles, and renders — and both change what the user actually sees.

Seven new findings, in severity order:

- **D-26 · MAJOR** — `Button variant="ghost"` (`:19`, `:31`) is a **glass-ui 6 prop that does not
  exist in glass-ui 7.0.0** (`grep -c variant` on the shipped Button chunk → **0**). The axis is
  `emphasis`, default **`"secondary"`**. So the two edit-mode controls the design drew as ghosts
  render as **filled secondary buttons** inside the SearchBar field, and `variant="ghost"` leaks to
  the DOM as a junk attribute. The producer also ships `loading`, which the file re-implements in
  four hand-rolled parts. **This escapes the orphan**: `ProfileSection.vue:60` carries the same dead
  `variant="outline"` and ships today.
- **D-27 · MAJOR** — measured: `text-small font-display` resolves to **Fraunces**, so the four
  dropdown labels and the popover title render in the *identity* family, not the control family. And
  `text-caption` (`:56`) is **not in the closed §4 matrix at all** — it resolves to Plus Jakarta Sans
  **italic 14.38px** where the matrix's help rung `text-prose` is **20.67px upright**, a 70% type at
  the worst legibility setting available. Run-4's D-11 caught only the mono-bold `Login`; the breach
  is five sites wider and in a different direction.
- **D-28 · MAJOR** — `Regenerate slug` destroys the user's identity, is styled
  `text-muted-foreground` (the **quietest** row in the menu), and confirms **only when the user has
  saved palettes** — `useSlugMigration.ts:99` regenerates silently otherwise.
- **D-29 · MINOR** — six hand-rolled `focus-visible:outline-none focus-visible:ring-2
  ring-ring/40` seats: the UA fallback is removed and the design system's focus token is replaced at
  **40% alpha**, per instance, on a translucent tier.
- **D-30 · MINOR** — hover and active are expressed **only** through `background-color`, the one
  property `forced-colors` replaces. The file contains no `forced-colors` handling
  (`grep -c` → 0), so under forced colors hover, press and rest are one appearance.
- **D-31 · MINOR** — `z-popover` (`:88`) is a per-instance stacking override on a **producer-portaled**
  `PopoverContent`; the only such use in `demo/`.
- **D-32 · MINOR** — thirteen raw spacing literals and a magic `w-56`, against §3.7's
  container-scaled token law.

Plus **D-33** (focus dropped on all three edit-mode exits), **D-34** (`isAdmin` prop shadowed by a
same-named local), **D-35** (`PopoverContent` omits the producer's `ariaLabel` while the trigger
declares `aria-haspopup="dialog"`).

And **two corrections to prior runs** (§5), one of which refines run-4's D-24 with the measurement it
was missing.

---

## 1. What this run did differently

Runs 1–3 worked outward from the orphan. Run-4 asked *"if this were mounted tomorrow, what breaks?"*
and found the containment and announcement failures. I asked a third question:

> **Does this file still speak the language of the system it imports?**

The W44 close adopted **glass-ui 7.0.0 whole**. A component abandoned before that cut keeps compiling
against the new major because Vue props are structurally typed and unknown props fall through
`$attrs` in silence. So I audited the file **against the installed producer's declared surface** and
**against the closed type matrix as rendered**, rather than as authored. That is what surfaced D-26
(a dead prop axis), D-27 (a utility that wins a cascade it should lose), and the smaller
root-vs-instance findings D-29/D-31.

The zero-render fact, re-derived independently — three hits, all a barrel line or a **type-only**
import, no `<PaletteSlugBar` tag anywhere:

```
$ grep -rn "PaletteSlugBar\|SlugBar" demo/ src/ e2e/ test/ | grep -v node_modules
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
e2e/smoke/flows/login-register.spec.ts:6: * The SlugBar live-app surface is only inside the PaletteDialog
```

and confirmed in the live DOM at `http://localhost:9000/#/palettes`:

```json
{ "slugPillCount": 1, "minH9": 0, "accountMenuButtons": 0, "cancelSlugEdit": 0,
  "slugPillOwners": [ { "text": "admin",
    "path": "span.slug-pill.cursor-default < div.hidden.lg:flex < div.dock-face-content
             < div.dock-face.is-active < div.dock-crossfade < div.dock-layer-group.horizontal" } ] }
```

All three DOM signatures unique to this component (`aria-label="Account menu"` `:84`,
`aria-label="Cancel slug edit"` `:35`, the `min-h-9` root `:2`) count **0**. The one `.slug-pill` on
the page is the Dock's.

---

## 2. Visual truth

I read `shots/safari-desktop-light/palettes.png` and `shots/safari-desktop-dark/palettes.png` — the
only route this component claims. Run-4's reading of the composition stands and I will not restate
it. Two observations it did not make:

**The shipped dock renders `Login` and `@mbabb` simultaneously**, side by side, in both schemes.
That combination is **structurally unrepresentable** in this component: `:45` `v-if="userSlug"` →
`:63` `v-else-if="isAdmin"` → `:71` `v-else` is a strict mutual exclusion. The product's real
identity state is not a three-way switch, and the orphan's state model was never the product's.
(Run-4's state table records "empty (session resolving) → ∅"; this is the positive frame evidence for
why that gap is not merely an omission but a wrong shape.)

**Dark mode does not change the judgement, and that is itself the finding.** The two captures differ
only in the ambient field and the plate luminance; the account cluster is identical mono chrome in
both. Nothing in this component is scheme-aware — `cssColorOpaque` is scheme-blind (D-3, prior runs),
`text-destructive` is a token, and `ring-ring/40` (D-29) is the same 40% in both. A component whose
only chromatic decision is a raw user color has no dark-mode treatment to critique; it has an absent
one.

No `palettes` frame exists in `shots/forced-colors-desktop/`, `keyboard-focus-desktop/`,
`reduced-motion-desktop/`, `rtl-desktop/`, `rtl-mobile/` or `zoom-200-desktop/` — each contains only
`adminusers, blob, browse, gradient, picker`. D-30 and D-33 are therefore source-level, labelled.

---

## 3. New findings

### D-26 · MAJOR — the file is written against a producer API that no longer exists; the buttons render filled where ghosts were drawn

**Mechanism.** A major-version prop rename crossed silently because unknown props fall through
`$attrs`.

`PaletteSlugBar.vue:17-39` — the two controls in the slug-edit form:

```vue
<Button type="submit" variant="ghost" icon-only size="xs" class="shrink-0"
        :disabled="!slugInput.trim() || slugSwitching"
        :aria-label="slugSwitching ? 'Signing in…' : 'Sign in with slug'">
    <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin text-muted-foreground" aria-hidden="true" />
    <ArrowRight v-else class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
</Button>
<Button type="button" variant="ghost" icon-only size="xs" …>
```

The installed producer is `@mkbabb/glass-ui@7.0.0`. Its `Button` surface
(`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4-18`):

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // the axis
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;           // exists; declined
    …
}
```

**There is no `variant` prop, and `emphasis` defaults to `"secondary"`:**

```
$ grep -c "variant" node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js
0
$ grep -o 'emphasis: { default: "[a-z]*"' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js
emphasis: { default: "secondary"
```

Three consequences, all rendered:

1. **The wrong emphasis ships.** The design drew two quiet trailing affordances inside a search
   field; what renders is a pair of **filled secondary buttons** crowding the input. In an
   `icon-only size="xs"` seat, filled-vs-quiet is the whole visual difference — this is not a token
   nuance, it is the control reading as a primary command.
2. **`variant="ghost"` reaches the DOM.** The compiled Button sets no `inheritAttrs: false`
   (`grep -o "inheritAttrs:![a-z0-9]"` on the chunk → no match), so the unknown prop falls through as
   a junk `variant="ghost"` attribute on the rendered `<button>`.
3. **The producer's `loading` is declined for four hand-rolled parts** — `:23` the `:disabled`
   expression, `:24` a manually swapped `aria-label`, `:26` a `Loader2` glyph, `animate-spin`.
   `ButtonProps.loading` is documented *"Marks an in-flight command and suppresses activation until it
   settles"* — one boolean for all four.

**Law.** Owner edict 2 (no legacy, no dual paths — this is a glass-6 remnant surviving the W44
adoption) and edict 4 (glass-ui is the design system; use its axes). `VISUAL-CONSTITUTION.md §5`:
*"Commit uses one glass-ui action set."*

**Reproduction.** The two greps above; `node probes/psb-emphasis-type.mjs` prints them in its static
half.

**Cure.** `<Button type="submit" emphasis="quiet" icon-only size="xs" :loading="slugSwitching"
aria-label="Sign in with slug">` — the loader, the spin class, the label swap and half the
`:disabled` expression all delete. Not a rename: a subtraction of four parts down to one prop.

**This one does not die with the orphan.** `demo/shell/dock/menus/ProfileSection.vue:60` carries
`variant="outline"` — same dead axis, same silent fallthrough, on a surface that **ships**. That
belongs in the glass-ui BH relay as a consumer-side glass-6→7 sweep.

---

### D-27 · MAJOR — control labels render in Fraunces, and the help prose is off the closed matrix entirely

**Mechanism.** A font-family utility stacked on a semantic type rung, winning the cascade the rung
was supposed to own; plus a rung that is not in the matrix.

**Measured** (`probes/psb-emphasis-type.mjs`, live cascade, 1440px arm, root 16px):

| authored classes | sites | family | size | weight | style |
|---|---|---|---:|---:|---|
| `text-small font-display` | `:54` `:91` `:98` `:106` `:113` | **Fraunces** | 16.4px | 400 | normal |
| `text-small` — *the §4 control rung* | — | Plus Jakarta Sans | 16.4px | 400 | normal |
| `text-mono-small font-bold` | `:73` `Login` | **Fira Code** | 16.4px | **700** | normal |
| `text-caption` | `:56` help prose | Plus Jakarta Sans | **14.38px** | 400 | **italic** |
| `text-prose` — *the §4 help rung* | — | Plus Jakarta Sans | **20.67px** | 400 | upright |

`font-display` **wins**. So *"Copy slug"*, *"Switch account"*, *"Logout"*, *"Regenerate slug"* and
the popover title *"Your slug"* all render in Fraunces.

**Law.** `VISUAL-CONSTITUTION.md §4`, the closed type matrix:

| Semantic role | Exact glass-ui role | Family |
|---|---|---|
| control or label, **including dropdown options** | `text-small` | Plus Jakarta Sans, **non-bold** |
| value, code, or provenance | `text-mono-small` | Fira Code |
| prose/help | `text-prose` | Plus Jakarta Sans |

*"This matrix is closed across all eighteen compositions."* `PROPORTION-AUDIT.md §5.13`: *"Fraunces
owns display/identity, Plus Jakarta Sans owns headings/prose/controls, and Fira Code owns mono
roles."*

Three distinct breaches, all rendered:

1. **Dropdown options in the identity family.** Fraunces is a display serif with optical sizing; at
   16.4px in a 35px menu row it is doing identity work in a control seat. The matrix names dropdown
   options explicitly precisely so this cannot happen by drift.
2. **A control label in mono-bold.** `Login` is a *command*. Mono is reserved for value / code /
   provenance. (The **slug itself** correctly uses mono via `.slug-pill` — the file gets the
   provenance case right and the control case wrong, which is the tell that the rung was chosen for
   texture rather than role.)
3. **An off-matrix rung for help prose.** `text-caption` appears nowhere in §4. It renders *italic*
   at **70% of the help rung's size**. Two sentences of onboarding narration — already marked
   **REDUCE** by `audit/om-15-text/TEXT-CONTRIVANCE-AUDIT.md:148` — set in italic at 14.38px inside a
   224px card is the least legible configuration the design system can produce.

Run-4's D-11 recorded breach (2) only. Breaches (1) and (3) are five further sites and a different
family axis.

**Reproduction.** `node probes/psb-emphasis-type.mjs`; see `probes/psb-emphasis-type.out.txt`.

**Cure.** Delete `font-display` from every control seat, delete `font-bold` from `Login`, move the
help paragraph to `text-prose` — or, per the subtraction ruling in run-4 D-20, delete the popover
outright and let the Account surface carry the one sentence that survives.

**Relay:** `ProfileSection.vue:70` puts `font-display` on the whole `DropdownMenuContent`, so the
same Fraunces-on-controls breach ships today one level up.

---

### D-28 · MAJOR — an identity-destroying command is the quietest row, and confirms only sometimes

**Mechanism.** Visual weight inverted against consequence; confirmation gated on unrelated state.

`PaletteSlugBar.vue:112-118`:

```vue
<button v-if="…" class="… text-muted-foreground …"
        @click="slugMenuOpen = false; $emit('regenerate')">
    <RefreshCw class="w-3.5 h-3.5" />
    {{ userSlug ? 'Regenerate slug' : 'Generate slug' }}
</button>
```

`text-muted-foreground` makes it **less** prominent than `Copy slug`. What it does:
`PALETTE-CONTRACT.md §2` — rotation *"installs the new verifier, revokes the old, and invalidates
existing sessions atomically."* The user's whole identity, and every device signed in under it.

The confirmation lives in the parent and is conditional
(`demo/palettes/useSlugMigration.ts:90-100`):

```ts
async function onRegenerateSlug() {
    if (deps.savedPalettes.value.length > 0) { … showMigrateDialog.value = true; }
    else { await deps.userRegenerate(); }   // <- silent, irreversible, no undo
}
```

So a user with zero saved palettes — i.e. **the exact user in the tracked frame**
(`shots/safari-desktop-light/palettes.png` reads `No saved palettes yet.`) — destroys their identity
from a de-emphasized menu row with **no confirmation at any point**. The dialog is gated on palette
count, which is a question about *data migration*, not about *whether the command is dangerous*.

Compounding: the menu has no `DropdownMenuSeparator` (a consequence of run-4 D-13's hand-roll), so
the destructive row sits flush against `Logout` with nothing but a muted ink to distinguish them.

**Law.** `VISUAL-CONSTITUTION.md §7` — *"dangerous confirmation"*. `PROPORTION-AUDIT.md PR-11` —
*"one review anatomy with authority/state/confirmation"*. `§5`: *"Persistent operation state stays
with the entity/workspace."*

**Reproduction.** Code path, static: `:113` (`text-muted-foreground`) → `:114` (`$emit('regenerate')`)
→ `useSlugMigration.ts:91` (the `if`) → `:99` (the silent `else`). Not live-reproducible (D-1).

**Cure.** Separator above it, `tone="danger"` on the item, confirmation **unconditional** and owned
by the Account dialog. The `savedPalettes.length` branch decides what the dialog *offers*, never
whether one *appears*.

---

### D-29 · MINOR — the focus ring is hand-rolled, de-emphasized, and preceded by `outline-none`

**Evidence.** Six identical copies of

```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
```

at `:73`, `:84`, `:91`, `:98`, `:106`, `:113`. Each removes the UA's own focus indicator and replaces
it with the design system's ring token at **40% alpha**, on the glass/veil material tiers this
cluster sits over.

**Law.** Owner edict 5 — *"style at the shadcn/glass root component level, never per-instance
overrides."* `VISUAL-CONSTITUTION.md:84` — *"Focus remains visibly distinct from selection in both
schemes, forced colors and reduced transparency."* A 40%-alpha ring on a translucent surface is the
weakest reading of "visibly distinct" available, and `outline-none` removes the fallback that would
have covered forced-colors and reduced-transparency for free.

Note this is not the same finding as run-4's state-table row *"focused | partial"*: that row records
that the **pill** has no focus state. This records that the six seats which *do* have one all
de-emphasize it identically, six times, at consumer altitude.

**Reproduction.** `grep -c "ring-ring/40" demo/palettes/browser/slug/PaletteSlugBar.vue` → 6.
No `shots/keyboard-focus-desktop/palettes.png` exists to measure the rendered delta.

**Cure.** Delete all six. `Button` and `DropdownMenuItem` own their focus register at the root.

---

### D-30 · MINOR — hover and press are background-only, so both vanish under forced colors

**Evidence.** Every interactive seat's entire state vocabulary is `hover:bg-accent` +
`active:bg-accent/70` (`:73`, `:84`, `:91`, `:98`, `:106`, `:113`). No border change, no underline,
no weight change, no icon change. `background-color` is precisely the property the forced-colors UA
replaces with a system color, so under `forced-colors: active` hover, press and rest collapse to one
appearance. The press-scale that might have carried the state does not animate at all (run-4 D-10,
independently re-measured here: `transition-property` for `transition-colors duration-fast` is
`color, background-color, border-color, outline-color, text-decoration-color, fill, stroke,
--tw-gradient-*` — **no `transform`**), and 5% is not a state indicator regardless.

The file's entire `<style scoped>` is a two-line comment (`:239-243`):
`grep -c "forced-colors" demo/palettes/browser/slug/PaletteSlugBar.vue` → **0**.

This is distinct from run-4 §5.2, which correctly killed the suspicion that `.slug-pill` is missing
from the forced-colors roster. `.slug-pill` is fine. The **six raw `<button>`s** are the gap, and
they are outside every roster because they are outside every root.

**Law.** `VISUAL-CONSTITUTION.md:83` — states *"are never color-only"*.

**Reproduction.** Source-level; no `palettes` frame exists in `shots/forced-colors-desktop/`.
Labelled **HYPOTHESIS** for the rendered result, **CONFIRMED** for the source omission.

**Cure.** Dissolves with run-4 D-13 / D-26: the producer roots carry the forced-colors register.
`foundation.css:678-698` / `:728-750` show the app already handling this at root altitude — the
correct place.

---

### D-31 · MINOR — a per-instance stacking override on a producer-portaled surface

**Evidence.** `:88`:

```vue
<PopoverContent class="w-auto p-1 flex flex-col gap-0.5 z-popover" align="end" :side-offset="4">
```

`PopoverContentProps.portal` defaults to `true` (`dist/popover-BQGYXZyO.js`:
`portal: { type: Boolean, default: !0 }`), so the content is already teleported to `<body>` and owns
its own stacking context. `--z-popover` measured `130` at `:root`.

This is the **only** `z-popover` applied to a glass-ui `PopoverContent` anywhere in `demo/`:

```
$ grep -rn "z-popover" demo/ | grep -v node_modules | grep -v DESIGN.md
demo/workbenches/mix/MixSourceSelector.vue:153   (an absolutely-positioned badge, not a Popover)
demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:8   (a local overlay, not a Popover)
demo/scenes/about/markdown/Markdown.vue:381      (annotated DEAD in situ)
demo/palettes/browser/slug/PaletteSlugBar.vue:88 (a PopoverContent)
```

**Law.** Owner edict 5. `VISUAL-CONSTITUTION.md §4.2` — *"Consumer CSS may not hide a producer
divider"* is the same principle one property across: the consumer does not adjudicate a producer
surface's layering.

**Cure.** Delete the class — and with it `w-auto p-1 … gap-0.5`, since `DropdownMenuContent` (run-4
D-13) owns menu padding and row rhythm.

---

### D-32 · MINOR — thirteen raw spacing literals, one magic width, zero tokens

**Evidence.** In 127 template lines: `gap-1.5` `mb-2` `pt-0.5` `min-h-9` `px-3` `py-1` `py-1.5`
`p-1` `gap-0.5` `gap-2` `mt-1` `-bottom-4` `w-3.5 h-3.5` — plus `w-56` (224px) as the popover width
(`:54`). No `--spacing()` step, no container query, no producer token.

**Law.** `VISUAL-CONSTITUTION.md §3.7`: *"Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork and no breakpoint pile."* `PROPORTION-AUDIT.md §5.8`: *"Real rendered
relation wins over token intent."* The inverse also binds: a literal that encodes **no relation** to
the local protagonist cannot open a proportion row either. Each of these numbers is unrelated to the
pane's `C = --spacing(4)` anchor (`VISUAL-CONSTITUTION.md:54`), so the bar's rhythm is independent of
the composition it sits in.

Run-4's D-24 named `pt-0.5` and `min-h-9` as instances; this is the family, and it is the reason
D-24's floor had no derivation to check against.

**Cure.** Most vanish with run-4 D-13 and D-26 (producer roots own menu and button padding). What
survives is one row gap, which should be a `--spacing()` step off `C`.

---

### D-33 · MINOR — focus is dropped on every exit from edit mode

**Evidence.** Three exits set `slugEditMode = false`: Escape (`:14`), Cancel (`:36`), successful
submit (`:215`). Entry focuses the input (`:178-180`). **No exit restores focus** —
`grep -n "focus" PaletteSlugBar.vue` returns exactly one hit, `:179`, on entry. The `<Transition>`
at `:4` then unmounts the focused element, so focus falls to `<body>` and the next Tab restarts at
document start.

**Law.** `VISUAL-CONSTITUTION.md §5.1`: *"Dialog/Drawer/Popover open and close | producer
initial-focus rule on open; **exact connected opener on close**, otherwise the nearest surviving
owning action."*

**Reproduction.** The grep. Live reproduction impossible (D-1) — labelled **CONFIRMED** as a source
omission, **HYPOTHESIS** for the rendered focus landing.

**Cure.** Producer-owned once run-4 D-13 lands; the mode swap should return focus to the pill/Login
seat it replaced.

---

### D-34 · INFO — the `isAdmin` prop is silently shadowed by a same-named local

**Evidence.** `:151` declares prop `isAdmin?: boolean`, destructured at `:147`, read in the template
at `:64` (`v-else-if="isAdmin"`). `:205`, inside `onSlugSwitch`, declares:

```ts
const isAdmin = !looksLikeSlug(normalized);
```

Within that function the identifier means *"the submitted string looks like an admin token"* — not
*"the current session is admin"*. Two different propositions under one name, one shadowing the other,
and reactive-props-destructure makes the shadow completely silent to the reader and the compiler.
`:213` then emits it: `emit("switchSlug", …, isAdmin)`.

**Cure.** Rename the local `submittedIsAdmin`. Or, better, delete the prop and read the session port
(`SESSION_PORT_KEY`, as `SlugEditLayer.vue:8` and `ProfileSection.vue:93` already do).

---

### D-35 · INFO — the menu surface declares itself a dialog and never names itself

**Evidence.** `:84` — the trigger declares `aria-haspopup="dialog"`. `:88` — the `PopoverContent`
that it opens passes **no** `ariaLabel`, although the producer ships one and documents it precisely
for this case (`PopoverContent.vue.d.ts:11`: *"Accessible name for the hover group or click
dialog"*). The result is an announced-but-unnamed dialog containing four buttons.

This is the naming half of run-4's D-20 (which established the *role* half: `role="dialog"` on the
touch branch, no role on the desktop branch). Recorded separately because the cure differs: D-20's
cure is to stop using a Popover as a menu; this one notes that even the interim Popover had a
producer-supplied name it declined to use.

---

## 4. Convergence — independently re-derived, not restated

Findings I reached on my own path and which prior runs already own. Listed so the record shows
independent confirmation rather than inheritance; detail stays in `run-4.md`.

| prior id | claim | my independent evidence |
|---|---|---|
| D-1 | zero render path | §1 grep + live DOM signature counts, all 0 |
| D-4 | raw uncertified accent ink | measured contrast of the **frame's own color** `oklch(0.92 0.09 20)` on `--card` light = **1.31 : 1** (AA floor 4.5); light-yellow 1.13; white 1.08; navy-on-dark 1.26; even mid-gray `oklch(0.62 0 0)` only 3.37. Sanity-checked (`#000`→19.45, `#fff`→1.08). The certified path exists at `ProfileSection.vue:30-31` → `demo/color-session/ink.ts:150-181` |
| D-6 | 22 × 22px operable target | re-measured with the exact markup: **22.0 × 22.0** (`:84`), **96.5 × 33.0** (`:71`). `audit/visual/REPORT.md:34` already logs 8 small tap targets on `/#/palettes` **without** this component |
| D-10 | press scale outside `transition-property` | measured list contains no `transform`; six sites `:73 :84 :91 :98 :106 :113` |
| D-12 | dead public surface | `hasSavedPalettes` (`:150`) declared **required**, destructured `:147`, never read; `copy` (`:155`) declared, never emitted — `onCopySlug` (`:168`) writes the clipboard locally while the other three commands delegate upward, so ownership splits with no rule |
| D-13 | hand-rolled menu vs `DropdownMenu` | `demo/ui/dropdown-menu/index.ts` re-exports **14** glass-ui symbols; `ProfileSection.vue:56-90` builds the identical four commands from them |
| D-8 | dead substring error branching | `:216-224`; and the `try` at `:203-215` contains **no `await`** and no throwing call, so the `catch` is unreachable independent of the string matching. `useSlugMigration.ts:78-82` documents the same bug and its S.W2 fix — which landed in the composable and not here |
| D-5 | hover-only help on a non-focusable span | producer proof: `PopoverTrigger` with `asChild` **strips `type:"button"`** (`dist/popover-BQGYXZyO.js`: `return t.asChild ? i : { ...i, type: "button" }`) and adds no `tabindex`/`role`, so the `<span>` at `:47` cannot enter the tab order |
| D-3 / D-22 | error surface | geometry closed by arithmetic on measured values: message box **316.3 × 23.2px**, parent `min-h-9` = 36px, `mb-2` = 8px, `bottom: -1rem` = 16px ⇒ the box extends 16px below a parent with 8px of margin ⇒ **8px collision** into following content, every time. `whitespace-nowrap` + no `max-inline-size` + an unbounded server string at `:221` ⇒ unbounded horizontal overflow |

---

## 5. Corrections to prior runs

### 5.1 · Run-4 D-24 (`min-h-9`) — refined, and the reason it went wrong

Run-4 measured the **pill** arm and found the 36px floor over-reserves single-line (25.59–28.94px)
and under-reserves wrapped (45.19–45.28px). Correct. The measurement it was missing is the **other**
arm.

I measured the live `SearchBar` on the `My Palettes` pane — the same producer component this
file swaps in at `:5`:

```
div.input-bar.search-seated   height = 36.0 px      (root font-size 16px ⇒ min-h-9 = 36.0 px)
```

**Exactly 36.0.** So `min-h-9` is not an arbitrary number: it is a **measurement of one arm**,
promoted to a floor for a swap with three. It fits the edit arm to the pixel, over-reserves the pill
arm by 7–10px, and falls 9.3px short of the wrapped arm.

That sharpens the mechanism from "magic number" to something worse for a design audit: **the
reservation was fitted to whichever state the author happened to have on screen.** A `mode="out-in"`
swap needs a floor that dominates *every* arm, or a height morph (`--vj-morph-collapse` /
`-expanded`, which run-4 correctly notes were left unset). It got neither, and the arm it does fit is
the one that would have been stable anyway.

### 5.2 · Run-4 D-11 (type) — the breach is wider and in a different family

Run-4 recorded *"Fira Code + bold on a control label vs the closed §5.13 type matrix"* — the `Login`
button. Measured, that is one of **three** breaches at **six** sites, and the largest is the opposite
family: `font-display` beats `text-small` in the built cascade, so five seats render in **Fraunces**
(D-27). A reviewer acting only on run-4's D-11 would fix `Login` and leave the identity serif sitting
on every dropdown option.

### 5.3 · A suspicion I killed

**"The swap jumps because `min-h-9` under-reserves the form."** False, and worth recording because it
is the obvious guess. The SearchBar arm measures **36.0px** against a **36.0px** floor and the Login
pill measures **33.0px** — both fit. The jump run-4 identified is real but comes from the **pill**
arm (wrapping to 45.28px), not the form arm. Same finding, different cause; a cure aimed at the form
would miss.

---

## 6. Disposition

**Terminal verb: REMOVE**, unchanged from run-3/run-4. Delete `demo/palettes/browser/slug/`, the
barrel line at `demo/palettes/browser/index.ts:44`, and the dangling `slugBarRef` machinery in
`useSlugMigration.ts:6,30,84-87,121` — with the login-failure copy re-homed on `SlugEditLayer.vue`
**first**, since deleting the orphan without that step removes the app's last written copy for those
four failures.

New findings by fate:

| id | severity | dies with the file? | carry to |
|---|---|---|---|
| **D-26** | MAJOR | **no** | glass-ui BH relay + dock owner — `ProfileSection.vue:60` `variant="outline"` is the same dead axis, shipping today. A consumer-wide glass-6→7 prop sweep is the honest cure |
| **D-27** | MAJOR | **no** | `ProfileSection.vue:70` puts `font-display` on the whole `DropdownMenuContent`, so Fraunces-on-dropdown-options ships now. Carry to the account-surface owner |
| **D-28** | MAJOR | **no** | the conditional-confirmation gate lives in `useSlugMigration.ts:91-99`, which survives the delete. Carry to the account-surface / W23 owner |
| **D-29** | MINOR | yes | — |
| **D-30** | MINOR | yes | — |
| **D-31** | MINOR | yes | — |
| **D-32** | MINOR | yes | — |
| **D-33** | MINOR | yes | — |
| **D-34** | INFO | yes | — |
| **D-35** | INFO | yes | — |

**Three of ten survive the delete**, and all three are on surfaces that ship. That is the same
pattern run-4 found (three of its four new findings were recipe-level) and it is now the strongest
argument in the file's favour as an *audit artifact*: the orphan is a preserved specimen of decisions
the live surfaces still make. Delete it — but read it first, which is what these five runs did.

---

## 7. Reproductions

```bash
# zero render path (5 hits: 1 type-only import, 1 ref decl, 2 barrels, 1 e2e comment)
grep -rn "PaletteSlugBar\|SlugBar" demo/ src/ e2e/ test/ | grep -v node_modules

# D-26 — the dead prop axis and the real default
grep -c "variant" node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js            # -> 0
grep -o 'emphasis: { default: "[a-z]*"' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js
grep -n "variant=" demo/palettes/browser/slug/PaletteSlugBar.vue demo/shell/dock/menus/ProfileSection.vue

# D-27 / D-30 / D-6 / D-10 — type, motion and geometry in the live cascade
node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/psb-emphasis-type.mjs
#   -> saved at probes/psb-emphasis-type.out.txt

# D-28 — the de-emphasised destructive row and its conditional confirmation
sed -n '112,118p' demo/palettes/browser/slug/PaletteSlugBar.vue
sed -n '90,100p' demo/palettes/useSlugMigration.ts

# D-29 / D-30 / D-32 — the per-instance overrides and the literal census
grep -c "ring-ring/40"  demo/palettes/browser/slug/PaletteSlugBar.vue    # -> 6
grep -c "forced-colors" demo/palettes/browser/slug/PaletteSlugBar.vue    # -> 0
grep -c "focus"         demo/palettes/browser/slug/PaletteSlugBar.vue    # -> 1 entry site only (D-33)

# D-31 — the only z-popover on a glass-ui PopoverContent in demo/
grep -rn "z-popover" demo/ | grep -v node_modules | grep -v DESIGN.md

# D-35 / prior D-5 — the producer contracts the file declines
grep -n "ariaLabel" node_modules/@mkbabb/glass-ui/dist/components/popover/PopoverContent.vue.d.ts
grep -o 'return t.asChild ? i : { ...i, type: "button" }' node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js

# §5.1 — the SearchBar arm that min-h-9 was fitted to (dev server on :9000)
#   in-page: getComputedStyle(document.querySelector('.input-bar')).height  -> "36px"
```

Canon consulted: `docs/tranches/V/VISUAL-CONSTITUTION.md` (§2 material hierarchy, §3.1 Library
composition, §3.7 spacing, §4 type jurisdictions, §4.1 perceptual/semantic, §4.2 component register,
§5 interaction grammar, §5.1 focus/announcement, §6 motion, §6.1 direction, §7 Account),
`docs/tranches/V/PROPORTION-AUDIT.md` (§4 PR-07/PR-08/PR-11/PR-12/PR-16, §5.3/§5.5/§5.6/§5.7/§5.8/§5.13),
`docs/tranches/V/PALETTE-CONTRACT.md` (§2 cookie login, §3 canonical content).
Prior runs: `challenge-D-design.run-1.md` … `run-4.md`.
