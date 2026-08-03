# CHALLENGE-D — `MigratePalettesDialog.vue` · the design is wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context arm) — the tier this seat was
explicitly spawned with. Declared, not inherited.

Seat: CHALLENGE-D (design). Subject: `demo/palettes/browser/dialog/MigratePalettesDialog.vue`
(97 lines, area `palettes`). Base: branch `tranche-u`, HEAD `c654824e`.
Write scope honored: everything below `docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/`.
No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`, `scripts/dev/dev.sh` or any
`INBOX.md` was modified. All probes were read-only against the running dev server.

---

## 0. Why this report is measured, not read

The mega-tranche visual matrix **never captured this component**. It has no route; it is
session-gated behind the slug-switch / slug-regenerate journey, and
`docs/tranches/V/megatranche/audit/visual/REPORT.md` covers 15 routes × 4 matrices with no dialog
state. The e2e census admits the same in prose:

```
e2e/smoke/oracles/o10d-display-voice-census.spec.ts:449-451
    // The slug-migration dialog opens only inside the account-switch flow —
    // no cheap user path reaches it in this project. The census therefore
    // pins the SOURCE: its DialogTitle must carry the display-voice register
```

So this component has been shipping **unwitnessed**. I built the missing witness. Five read-only
WebKit probes live at `probe-D/` in this directory (`probe.mjs` … `probe5.mjs`, telemetry in
`telemetry{,2,3,4,5}.json`, 24 screenshots in `probe-D/shots/`). They seed a real local library
into `localStorage`, drive the real dock menu, and open the real dialog at
desktop-light / desktop-dark / mobile-light / mobile-dark / 320px / 200%-zoom / reduced-motion,
in both `switch` (3 actions) and `regenerate` (2 actions) modes.

Everything below is anchored to a `file:line`, a pasted measurement, or an image in `probe-D/shots/`.

---

## 1. The source, in full

```vue
demo/palettes/browser/dialog/MigratePalettesDialog.vue:1-42
<Dialog v-model:open="open">
    <DialogContent class="rounded-dialog max-w-sm">
        <DialogHeader>
            <DialogTitle class="font-display font-medium text-subheading">{{ title }}</DialogTitle>
            <DialogDescription class="text-small font-display">{{ description }}</DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-2">
            <Button variant="default" class="cursor-pointer font-display justify-start gap-2 rounded-full" …>
            <Button v-if="mode === 'switch'" variant="outline"  class="… rounded-full" …>
            <Button variant="ghost" class="… text-muted-foreground rounded-full" …>
        </div>
    </DialogContent>
</Dialog>
```

---

## 2. Visual truth

### 2.1 Desktop, `switch` mode — `probe-D/shots/desktop-light-switch-crop.png`

Three pills. **They are the same pill.** Same fill, same ink, same weight, same radius, same
height, same width. The command that uploads the user's whole library to a server and the command
that walks away from it are typographically and materially indistinguishable. There is no
primary. The dialog asks a three-way question and renders it as three identical answers.

Behind them, the page is legible *through* the modal: "Basic Informatio", "Device Dependency:",
"White Point:", "Gamut:", "Created:" and the display-sized "20.0" from the Lab readout all read
across the dialog's own text. `probe-D/shots/desktop-dark-switch-crop.png` is worse — the string
"Device Dependency:" sits directly on top of the "Publish, then switch" pill.

Everything in the dialog is Fraunces. Title, help prose, and all three control labels are one
serif voice at two sizes. Nothing tells the eye which line is a heading, which is help, and which
is a command.

### 2.2 Mobile 390 — `probe-D/shots/m-light-crop.png`

The Lab numerals ("92.0%", "88.8", "20.0") strike straight through the title and description. The
top pill wears a rose focus ring because focus was auto-placed there; **that ring is the only
visible difference between the two commands**, so the design's sole priority signal is focus,
which is not priority. Buttons are 60px tall at 21px Fraunces; the label occupies roughly the left
70% of a 334px pill, leaving a long dead tail.

### 2.3 320px — `probe-D/shots/narrow-320.png`

The composition collapses:

- the dialog is **full-bleed**: `dialogRect.x = 0`, `w = 320`, `sideMargin = 0` (`telemetry5.json.w320`).
  Its 16px corners are clipped at the viewport edges; it stops reading as a modal and reads as an
  inline slab.
- the close `×` **collides with the title ink** — "What about your palettes?×".
- "Publish, then regenerate" **wraps to two lines** and, because the pill is `justify-start` with
  the icon pinned left, the wrapped label centers itself and the globe glyph is orphaned a long
  way from the text it labels.
- header text is **centered** while the action labels stay **left**-aligned — two alignment axes
  in one 292px composition.

---

## 3. Findings

Severity: **BLOCKER** = ships a false or destructive outcome / no hierarchy at all.
**MAJOR** = violates a named canon row or an owner edict with rendered consequence.
**MINOR/INFO** = real, bounded.

---

### D-1 · BLOCKER — the action hierarchy does not exist: `variant` is a retired vocabulary and all three actions render byte-identically

`MigratePalettesDialog.vue:15,24,32` authors `variant="default" | "outline" | "ghost"`.
glass-ui 7.0.0's `Button` **has no `variant` prop**:

```
node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4-19
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // Visual priority.
    tone?: Tone;                 // Semantic intent, orthogonal to emphasis.
    size?: ButtonSize; iconOnly?: boolean; loading?: boolean; …
}
```

The producer says so in its own axis file, in as many words:

```
node_modules/@mkbabb/glass-ui/dist/components/_shared/axes.d.ts:16
/** The tone axis — the semantic status register (`--<tone>` token cohort); NEVER a `variant` member. */
```

Vue forwards the unknown prop to the host element, so the rendered DOM literally carries a dead
attribute, and every button falls to the same default emphasis. Measured
(`probe-D/telemetry2.json.deadAxis`, desktop light, `switch` mode):

| authored | rendered `data-emphasis` | `data-tone` | background | color | box-shadow | radius | w×h |
|---|---|---|---|---|---|---|---|
| `variant="default"` | `secondary` | `neutral` | `oklab(0.721325 0.00492 0.010865 / 0.6)` | `rgb(0,0,0)` | 7-layer glass rim, identical | `3.4e38px` | 334×40 |
| `variant="outline"` | `secondary` | `neutral` | `oklab(0.721325 0.00492 0.010865 / 0.6)` | `rgb(0,0,0)` | identical | `3.4e38px` | 334×40 |
| `variant="ghost"` | `secondary` | `neutral` | `oklab(0.721325 0.00492 0.010865 / 0.6)` | `rgb(0,0,0)` | identical | `3.4e38px` | 334×40 |

Every rendered attribute list contains the orphan:

```
"attrs": [ "data-slot=\"button\"", "data-emphasis=\"secondary\"", "data-tone=\"neutral\"",
           "data-size=\"md\"", …, "variant=\"default\"", … ]
```

The author's fallback attempt also fails: `class="… text-muted-foreground …"` on the discard
button (`:33`) is defeated — computed `color` is `rgb(0,0,0)`, identical to the other two, not the
`rgb(112,89,66)` that `--muted-foreground` paints on the description in the same dialog. A
per-instance utility lost to the root, which is exactly what owner edict 5 predicts.

**The gate does not catch it.** `npx vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`, zero
diagnostics. The dead axis is invisible to CI.

**Family, not incident.** `grep -rn 'variant="' demo/ --include="*.vue" | wc -l` → **103**
occurrences across **36** files; 51 of them within six lines of a `<Button`. This dialog is one
member of a repo-wide retired-vocabulary family.

Reproduction: `node docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/probe-D/probe2.mjs`
→ `telemetry2.json.deadAxis`.

**Cure (transposition, not patch).** Delete the `variant` vocabulary from this file and speak the
producer's axes at the root: `emphasis="primary"` for the publish command, `emphasis="secondary"`
for transfer, `emphasis="quiet"` for the walk-away (glass-ui already renders `quiet` as
transparent + `color: var(--muted-foreground)` —
`components/button/styles.css` `.button[data-emphasis="quiet"]` — i.e. **the exact treatment the
author hand-rolled and lost**). The repo-wide 103-instance sweep is a separate mechanical row for
the formation; a `variant`-attribute ESLint/`vue-tsc` guard is the structural cure so the family
cannot regrow.

---

### D-2 · BLOCKER — the dialog's premise is false: local palettes are never at risk, and its "discard" branch is a no-op that also *drops* error handling

The dialog asks "What about your palettes?" and offers a walk-away framed as loss ("Just switch" /
"Just regenerate", under a `SkipForward` glyph). Nothing is at stake.

- The library is device-scoped, keyed by nothing: `usePaletteStore.ts:6`
  `const STORAGE_KEY = "color-palettes";` — a flat `{version, palettes[]}` blob with no `userSlug`
  coupling.
- Switching identity does not touch it: `useUserAuth.ts:77-83` `login()` → `persist(slug, token)` →
  writes `palette-user-slug` + the token. Nothing else.
- Regenerating identity does not touch it: `useUserAuth.ts:112-127` — `deleteSession()`,
  `safeRemoveItem(SLUG_KEY)`, `clearPersistedToken()`, `createSession()`, `persist()`.
- Measured: `localCount` is **12 before, 12 at 101 ms, 12 at 8 s** across the entire
  publish-then-regenerate journey (`telemetry3.json.samples`), and **3 before / 3 after** an Esc
  dismissal in all four matrices (`telemetry.json.*.afterEsc.paletteCount`).

The canon already classifies these palettes as a first-class owner state, not a pending
liability:

> `VISUAL-CONSTITUTION.md:186` — "Device Drafts, unpublished Server Workspaces, Published
> lineages, and Trash are explicit, **non-interchangeable owner states**."

`PALETTE-CONTRACT.md:215` gives Device Draft its own canonical export identity
(`palette-draft--<canonical deviceDraftId>`). A Device Draft is *supposed* to be device-scoped.

Now the branch itself. `useSlugMigration.ts:59-73` (dialog path) versus `:74-88` (no-dialog path):

```ts
// with palettes → dialog → choice === "discard":
await deps.userLogin(value);
setActiveTab("saved");

// with zero palettes → no dialog:
try {
    await deps.userLogin(value);
    setActiveTab("saved");
} catch (e) {
    const status = e instanceof ApiProblem ? e.status : undefined;
    if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
    else if (status === 404) slugBarRef.value?.setError("Slug not found.");
    …
}
```

The `discard` branch is **not merely equivalent to skipping the dialog — it is strictly worse**:
it is the same two statements with the typed `ApiProblem` 409/404/429 routing deleted. A user with
zero palettes who mistypes a slug is (nominally) told; a user with palettes is told nothing,
because the dialog path's only error handler is `console.warn` at `:113`.

`onRegenerateSlug` is the same shape: `:94-99` `discard` ⇒ `await deps.userRegenerate()`, which is
byte-identical to the `else` at `:102`.

Reproduction: read `useSlugMigration.ts:59-104`; then
`node probe-D/probe3.mjs` and observe `localCount: 12` at every sample.

**Cure.** Retire the dialog. Its only real verb is "publish my local Device Drafts", which is a
Library command over Library entities, not an identity-flow gate — `VISUAL-CONSTITUTION.md:101`:
"Persistent operation state stays with the entity/workspace." Slug switch becomes slug switch
(one code path, keeping the typed-error routing). Bulk publish becomes a named Library action with
a durable result. `PROPORTION-AUDIT.md §5.6`: "Subtraction precedes explanation."

---

### D-3 · BLOCKER — the commit has no state, and the measured outcome of the primary action is: nothing published, account slug destroyed, user told nothing

`MigratePalettesDialog.vue:69-72` is the architectural defect in three lines:

```ts
function onRespond(choice: MigrateChoice) {
    open.value = false;   // ← destroy the surface
    emit("respond", choice);  // ← then start the work
}
```

The dialog demolishes itself *before* the operation it commissions begins, so there is nowhere
left to render progress, partial success, or failure. Downstream, `useSlugMigration.ts:32-49`
`publishAllLocal()` swallows every per-palette error with a bare `catch {}` and the outer failure
with `console.warn`; `onMigrateRespond` at `:106-116` swallows the rest with
`console.warn("Migration action failed:", e?.message)`.

Measured journey — 12 local palettes, "Publish, then regenerate", live dev backend
(`curl … :3000/palettes` → `200`), `telemetry3.json`:

| t (ms) | dialog | `aria-busy` | status/alert/progressbar | spinners | `palette-user-slug` | local palettes |
|---|---|---|---|---|---|---|
| 101 | present | 0 | 1 (the pre-existing offline chip) | 0 | **`null`** | 12 |
| 402 | gone | 0 | 1 | 0 | `null` | 12 |
| 1001 | gone | 0 | 1 | 0 | `null` | 12 |
| 2001 | gone | 0 | 1 | 0 | `null` | 12 |
| 4001 | gone | 0 | 1 | 0 | `null` | 12 |
| 8001 | gone | 0 | 1 | 0 | `null` | 12 |

```
"network": []                     ← zero completed requests to :3000. 0 of 12 published.
"consoleAfter": [
  "error: Request header field Idempotency-Key is not allowed by Access-Control-Allow-Headers.",
  "error: Failed to load resource: …",
  "warning: Migration action failed: Backend unreachable — working locally."
]
```

The user chose the option whose entire purpose is "don't lose my work". The result: **zero
palettes published, the account handle wiped** (`useUserAuth.ts:119-120` removes `SLUG_KEY`
*before* `createSession()`, so a failed regenerate leaves `null`), and the sole report is a
console warning no user will ever see. The single `role="status"` on the page is `ApiOfflineChip`,
which was already there and says nothing about this operation.

This is the direct target of two canon rows:

> `VISUAL-CONSTITUTION.md:83` — "Selected, failed, pending, withdrawn and disabled states are
> never color-only. Role, accessible name, state/value and associated error/status are explicit."

> `PROPORTION-AUDIT.md` PR-08 — "Pending/failure/export/recovery truth only transient →
> **ADD-AFFORDANCE** … Persistent entity status/recovery."

Aggravating: the whole journey has *no* error surface at all. `useSlugMigration.ts:30` holds
`slugBarRef`, whose `setError()` is the only authored user-visible error path — and
`PaletteSlugBar` is **never mounted anywhere in the app**:

```
$ grep -rn "PaletteSlugBar\|SlugBar" demo/ --include="*.vue" --include="*.ts" \
    | grep -v "browser/slug\|useSlugMigration\|browser/index"
EXIT=1        # zero hits
```

`slugBarRef.value` is permanently `null`; every `slugBarRef.value?.setError(...)` at
`useSlugMigration.ts:84-87` is a no-op. Both branches are silent.

Reproduction: `node probe-D/probe3.mjs`.

**Cure.** Under D-2 this dialog is retired, and the bulk-publish verb moves to the Library where a
durable per-entity status already belongs. Wherever it lands, the surface must survive the
operation it commissions: keep the overlay open with `loading` on the invoked command (glass-ui
`Button` already has `loading?: boolean` and `.button[data-loading]{cursor:progress}`), then
resolve to a persistent result on the entity, never `console.warn`. Separately,
`useUserAuth.regenerate()` clearing `SLUG_KEY` before the replacement exists is a
non-atomic-identity bug that belongs to the auth seat — flagged here because this dialog is its
only trigger.

---

### D-4 · MAJOR — type jurisdiction: Fraunces on help prose and on control copy; description and command labels are the same size

`VISUAL-CONSTITUTION.md:66-78` is a closed matrix with exactly one exception (P019's Picker pair):

| role | required |
|---|---|
| prose/help | `text-prose`, Plus Jakarta Sans |
| control or label, **including dropdown options** | `text-small`, **Plus Jakarta Sans, non-bold** |

Measured (`telemetry.json['desktop-light'].regenerate`):

| element | family | size | weight | source |
|---|---|---|---|---|
| `DialogTitle` | `Fraunces` | 20.352px | 500 | `:7` `font-display font-medium text-subheading` |
| `DialogDescription` | **`Fraunces`** | **16.4px** | 400 | `:8` `text-small font-display` |
| action labels ×3 | **`Fraunces`** | **16.4px** | 500 | `:16,25,33` `font-display` |
| producer `Close` | `Plus Jakarta Sans` | 18.608px | 400 | glass-ui root (the one correct voice in the frame) |

`foundation.css:92-102` states the law the file breaks: "the three-voice law reserves Fraunces for
display rungs only". Two consequences, both visible in every screenshot:

1. help prose and commands render at **the identical size in the identical family** — the
   composition has no register separation between what you read and what you press;
2. the dialog's *only* non-Fraunces glyph is the 16px close `×`, so the producer's correct voice
   reads as the foreign one.

Note also `:7`'s comment claims a T.W4-6 ruling for "display voice at the subheading rung", but
`text-subheading` is jurisdictionally **palette identity** (`VISUAL-CONSTITUTION.md:72`), and the
matrix is declared closed. Even granting the title, nothing licenses `font-display` on `:8`, `:16`,
`:25`, `:33`.

**Cure.** Drop `font-display` from the description and all three actions; let the glass-ui control
register paint them (`text-small`, PJS, non-bold). If dialog titles are genuinely a display
surface, that is one producer-owned `DialogTitle` decision at the root, not four consumer classes.

---

### D-5 · MAJOR — three adjacent action species with no owner, and no Cancel (PR-06 · PR-07)

`PROPORTION-AUDIT.md` PR-06: *"Three adjacent action species or duplicated selected fills →
**REMOVE**. One action/selection owner."* This dialog stacks exactly three, and — per D-1 — they
are not even three species, they are one species printed three times.

Worse, none of them is a cancel. The user asked to regenerate a slug; the dialog's two visible
answers are both "proceed". The only way out is:

- the producer `×` at **16 × 16 CSS px** (`tapTargetOk: false` at every arm, `telemetry4.json`), or
- Escape / scrim click — both undiscoverable, and both landing in the undesigned state of D-7.

`VISUAL-CONSTITUTION.md:100`: "Commit uses **one** glass-ui action set. Secondary verbs disclose
within that same instrument."

And the two "safe" options are semantically opposite with labels that hide it
(`useSlugMigration.ts:61-70`):

```ts
if (choice === "publish")  await publishAllLocal();   // → files copies under the account you are LEAVING
await deps.userLogin(value);
if (choice === "transfer") await publishAllLocal();   // → files copies under the account you are ENTERING
```

"Publish, then switch" is the top, first-focused, most-primary-sounding option, and it is the one
that files your library under the identity you are abandoning. Neither label names its destination
account. Aggravating: `publishAllLocal` opens with `await session.ensureSession()`
(`useSlugMigration.ts:34`), which can auto-register a brand-new anonymous account — so the "safe"
option can file the library under an account that did not exist a second earlier.

Icon register is also off: `SkipForward` (`:36`) is a media-transport glyph ("next track") used to
mean "proceed without publishing"; `PROPORTION-AUDIT.md §5.5` — "A small icon/mark is either data,
status, labeled action, drag affordance, focus/selection register or removed."

**Cure.** After D-2 the three-way question dissolves. If any confirmation survives, it is one
glass-ui action set: one primary command + one named Cancel, with the destination account written
into the label.

---

### D-6 · MAJOR — dead per-instance overrides against a root that already decides, while every producer axis that would have solved the problem sits unused

Owner edict 5: style at the root, never per-instance. Every consumer class in this file is either
**dead** or an **override of a root decision**.

Dead — the root already does it:

| consumer class | root rule | verdict |
|---|---|---|
| `cursor-pointer` ×3 (`:16,25,33`) | `components/button/styles.css` `.button { … cursor: pointer; … }` | no-op |
| `rounded-full` ×3 (`:16,25,33`) | same rule: `border-radius: var(--radius-pill)` | no-op that *also* discards the token |
| `rounded-dialog` (`:3`) | `dialog-TNRDkcE4.js:268` — `X = cn(t("floating"), "rounded-dialog")`, already on the content root | no-op |

Override of a root decision:

| consumer class | root rule | consequence |
|---|---|---|
| `justify-start` | `.button { justify-content: center }` | the wrap-orphaned icon of §2.3 |
| `gap-2` (8px) | `.button { gap: calc(0.375rem * var(--ui-scale)) }` (6px) | off the control rhythm |
| `text-muted-foreground` | `.button { color: var(--foreground) }` | **defeated** — measured `rgb(0,0,0)` (D-1) |
| `max-w-sm` | producer width law | full-bleed at 320 (D-8) |

Meanwhile `rounded-full` renders `border-radius: 340282346638528859811704183484516925440px` inside
a dialog that publishes its own radius context — measured `--radius-ctx: 1rem`,
`--radius-dialog: 1rem`, dialog `border-radius: 16px` (`telemetry.json`). glass-ui set up a radius
context specifically so children nest correctly; this file throws it away for `FLT_MAX`.

And the producer axes this component needed are all present and all unused
(`components/dialog/DialogContent.vue.d.ts:4-21`):

```ts
export interface DialogContentProps {
    surface?: Surface;    // "glass" | "veil" | "opaque"      → D-9, the read-through
    placement?: Placement;// "center" | "top" | "bottom" | …  → D-8, the 320px sheet
    stage?: "none"|"dim"|"scale"|"immersive";                 // occlusion strength
    backdrop?: Backdrop;  // "scrim" | "graded"
    showClose?: boolean;  //                                   → D-5, retire the 16px ×
    motion?: Motion; springPreset?: SpringPreset; scroll?: boolean;
}
// emits: escapeKeyDown, pointerDownOutside, interactOutside, openAutoFocus, closeAutoFocus  → D-7
```

The component consumes **zero** of them and writes two Tailwind utilities instead, one of which is
a verbatim restatement of a class the root already applied. Owner edict 4 (glass-ui is the design
system) and edict 5 (root-level styling), together, in one attribute.

**Cure.** Delete all six dead/defeated classes. Express intent on the producer axes:
`<DialogContent surface="opaque" :placement="isNarrow ? 'bottom' : 'center'" :show-close="false" @close-auto-focus="…">`.

---

### D-7 · MAJOR — focus is dropped to `<body>` on every dismissal path; the abandoned journey is an undesigned state

> `VISUAL-CONSTITUTION.md:115` — "Dialog/Drawer/Popover open and close | producer initial-focus
> rule on open; **exact connected opener on close, otherwise the nearest surviving owning
> action**".

Measured, all four matrices (`telemetry.json.*.afterEsc`, `telemetry2.json.afterScrimClick`):

```
Escape        → { dialogPresent: false, activeElement: { tag: "BODY" }, slug: "quiet-amber-river-fox" }
scrim click   → { dialogPresent: false, active: "BODY",                 slug: "quiet-amber-river-fox" }
```

Focus lands on `<body>` in light and dark, on Escape and on outside-click. The mechanism is
structural: the opener is a `DropdownMenuItem` (`ProfileSection.vue:87`,
`MobileMenuDropdown.vue:61`) or a dock layer control (`SlugEditLayer.vue:107`) that is **unmounted
the instant the dialog opens** — `SlugEditLayer.vue:54-56` calls `pm.onSlugSwitch(...)` without
awaiting and then sets `slugEditMode.value = false` in the same tick. The constitution anticipated
exactly this and named the fallback ("the nearest surviving owning action"); nothing implements it,
and `onCloseAutoFocus` — the producer hook for it — is not bound.

State-wise, dismissal is undesigned end to end: `pendingMigrateAction` (`useSlugMigration.ts:29`)
is left non-null and stranded, the slug switch the user actually asked for silently never happens,
and no status is announced. From the user's chair: they clicked "Regenerate slug", a modal
appeared, they pressed Escape, and the application forgot the whole request without a word.

Reproduction: `node probe-D/probe.mjs` → `telemetry.json.*.afterEsc`.

---

### D-8 · MAJOR — 320px: full-bleed slab, title/close ink collision, wrap-orphaned icon, and a centered/left alignment fork

`telemetry5.json`, three viewports, one dialog:

| viewport | dialog x | dialog w | side margin | title box | close box | title→close px | title align | action align |
|---|---|---|---|---|---|---|---|---|
| 320 | **0** | **320** | **0** | 25 → 295 | 279 → 295 | **−16** | `center` | `flex-start` |
| 390 | 3 | 384 | 3 | 28 → 362 | 346 → 362 | **−16** | `center` | `flex-start` |
| 1440 | 528 | 384 | 25 | 553 → 887 | 871 → 887 | **−16** | `left` | `flex-start` |

Three separate defects fall out of one row:

1. **`max-w-sm` (384px) exceeds a 320px viewport**, so `w-full` wins and the modal loses its
   inset entirely (`x = 0`, `sideMargin = 0`). Its 16px corners clip at the screen edges. See
   `probe-D/shots/narrow-320.png`. On iPhone 14 it is 3px from each edge — the same failure, 3px
   short of total.
2. **`titleClosePx = −16` at every viewport**: the close button sits entirely inside the title's
   inline box, because the title reserves no inline-end space for the absolutely-positioned close
   (`right-(--overlay-pad-inline)`). At 1440 the title string is short enough to hide it; at 320
   the ink collides — "What about your palettes?×".
3. **The header centers while the actions stay left.** `VISUAL-CONSTITUTION.md:33` —
   "Spacing is container-scaled from glass-ui tokens. **No desktop-tight/mobile-airy fork** and no
   breakpoint pile." A centered header over left-aligned commands, switching at a breakpoint, is
   that fork.

Plus the wrap: at 320 the primary label breaks to two lines inside the pill and the globe glyph is
stranded far left of its centered label (`narrow-320.png`) — the `justify-start gap-2` recipe of
D-6 has no wrap behavior.

**Cure.** `placement="bottom"` for the narrow arm (glass-ui already folds Sheet and Dialog onto one
placement axis — `axes.d.ts:19-21`), producer-owned width, one alignment for the whole composition,
and an inline-end reserve on the title — all root decisions, none of them a consumer class.

---

### D-9 · MAJOR — the modal does not occlude: page ink reads through the decision surface

Measured (`telemetry2.json.compositedContrast`, `telemetry5.json.*.scrim`):

```
dialog background : oklab(0.903539 0.015313 0.014228 / 0.705088)   ← 29.5% transmissive
dialog backdrop   : blur(11px) saturate(1.6)
scrim background  : color(srgb 0.11 0.098 0.09 / 0.5)
scrim backdrop    : blur(1px) saturate(1.4)
body overflow     : hidden                                          ← scroll IS locked
```

Composite transmission ≈ `0.295 × 0.5 ≈ 15%` of the underlying luminance, with only 1px of scrim
blur behind the panel. That is enough for display-sized page ink to survive: every crop in
`probe-D/shots/` shows the Lab readout ("92.0%", "88.8", "20.0") and the About prose ("Basic
Informatio", "Device Dependency:", "White Point:", "Gamut:", "Created:") reading across the
dialog's own title, description and buttons.

> `VISUAL-CONSTITUTION.md:19` — "Glass **earns** its blur by revealing live content; otherwise it
> is a neutral well."
> `VISUAL-CONSTITUTION.md:82` — "Text, focus, boundaries and state meet their rendered contrast on
> the actual material tier; a token name is not evidence."

A modal that interrupts to ask an irreversible question reveals nothing worth revealing; the
content behind it is precisely what the user must stop looking at. And because the transmitted
content is arbitrary page state, the dialog's rendered text contrast is **unbounded** — it cannot
be certified, only sampled. `surface="opaque"` is one prop away (D-6).

---

### D-10 · MINOR — the only cancel affordance is a 16×16 target

`telemetry4.json`, every arm including touch (iPhone 14, 320px touch, 200% zoom):

```
{ "text": "Close", "w": 16, "h": 16, "tapTargetOk": false, ... }
```

16×16 against WCAG 2.5.8's 24×24 minimum, and against the 60px action pills two rows below it in
the same composition. `PROPORTION-AUDIT.md §5.7` — "Visual glyph size, operable target size and
layout reservation are separate quantities" — the glyph may stay 16px; the target may not. It is
producer geometry, but this component chose to lean on it as its sole exit (D-5), which is a
consumer design decision.

The mega-tranche visual report counts 60 `smallTapTargets` rows across the 15 captured routes
(`visual/REPORT.md`); this dialog silently adds one more from a state that report never reached.

---

### D-11 · MINOR — dead `title` computed: both ternary arms return the same string

```ts
MigratePalettesDialog.vue:74-78
const title = computed(() =>
    mode === "switch"
        ? "What about your palettes?"
        : "What about your palettes?",
);
```

A mode axis that resolves to nothing. Design-wise the heading never distinguishes the two journeys
it claims to serve — and code-wise it is a `computed` over a constant. Four computeds
(`:74,:80,:88,:94`) plus one `v-if` (`:23`) exist to vary two words ("switch"/"regenerate") and
show one extra button. Owner edict 3 (KISS, no contrivance).

---

### D-12 · MINOR — the component's contract type is exported, never imported, and re-spelled twice

`MigratePalettesDialog.vue:56` exports `MigrateChoice`. Consumers ignore it and hand-copy the
union:

```
useSlugMigration.ts:29   ref<((choice: "publish" | "transfer" | "discard") => Promise<void>) | null>
useSlugMigration.ts:106  async function onMigrateRespond(choice: "publish" | "transfer" | "discard")
```

`grep -rn "MigrateChoice" demo/` returns hits only inside the `.vue` itself. The "hardened public
surface" barrel does not re-export it either — `dialog/index.ts:6-9` exports three default
components and one composable, no types. Three copies of one union, free to drift.

`verbatimModuleSyntax` (edict 8) is otherwise satisfied: the file has no type-only value imports.
Vue 3.5 idioms (edict 7) are satisfied: reactive props destructure at `:60`, `defineModel` at `:58`.

---

### D-13 · MINOR — the one design guard on this file points at a path deleted in the demo move

`e2e/smoke/oracles/o10d-display-voice-census.spec.ts:448-469` is the *only* automated guard on
this component's typographic register. It reads:

```
"../../../demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue"
```

The file lives at `demo/palettes/browser/dialog/MigratePalettesDialog.vue`. Resolved and executed:

```
$ node -e "…new URL('../../../demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue', base)…"
resolves to: /Users/mkbabb/Programming/value.js/demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue
THROWS: ENOENT ENOENT: no such file or directory
```

`readFileSync` throws before any assertion runs. The register guard has been dead since the demo
restructure — which is consistent with D-4 having gone unnoticed.

---

### D-14 · INFO — no `count === 0` guard; hand-rolled pluralization; public barrel export

`:80-86` renders "You have 0 local palettes." if `count` is 0. The composable guards the call site
(`useSlugMigration.ts:59,92`), but the component is exported through two public barrels
(`dialog/index.ts:8`, `browser/index.ts:40`) with no guard of its own. Pluralization is
`const s = n !== 1 ? "s" : ""` (`:82`). Verified at the boundary (`telemetry.json`):
`count=1` → "You have 1 local palette." ✓; `count=137` → "You have 137 local palettes.", dialog
height 239 → 262px as the description takes a third line. No overflow, no truncation.

---

### D-15 · INFO — motion is clean by absence, with one producer note

The component declares no animation, no transition, no keyframe — owner edict 6 (animations are
never deleted) is not engaged, and nothing ad hoc was introduced. Measured under
`reducedMotion: "reduce"` mid-reveal (`telemetry2.json.reducedMotionMidReveal`):

```
animationName: "none", animationDuration: "0.00001s"   ← the producer keyframe IS suppressed
transitionProperty: "opacity", transitionDuration: "0.15s"
anims: [ { name: "opacity", dur: 150, playState: "running" } ]
transform: "none", scale: "none", translate: "none"     ← no geometry animates
```

Geometry resolves directly, per `VISUAL-CONSTITUTION.md:144`; a 150ms opacity fade survives. That
is producer-owned (`glass-reveal`), opacity-only, and not a consumer defect — recorded so the
formation does not re-litigate it here.

The one motion defect that *is* this component's belongs to D-3: `onRespond` (`:70`) plays the
exit animation over a mutation the user is never shown.

---

## 4. State coverage table

Every state this component can occupy, and its disposition. A state that was never designed is a
design defect.

| state | handled? | evidence |
|---|---|---|
| empty (`count === 0`) | **unguarded at the component** | `:80-86`; D-14 |
| populated (1 / 3 / 12 / 137) | yes | `telemetry.json` count arms |
| **loading / in-flight** | **absent** — surface destroyed before work starts | `:70`; D-3 |
| **error** | **absent** — `console.warn` only | `useSlugMigration.ts:42,47,113`; D-3 |
| **success** | **absent** — no durable result | D-3 |
| **dismissed (Esc / scrim / ×)** | **undesigned** — journey silently abandoned, focus → `<body>` | D-7 |
| disabled | n/a — no action can be disabled, including during flight | D-3 |
| focused | producer ring; **it is the composition's only hierarchy signal** | `m-light-crop.png`; D-1 |
| hovered | producer `.glass-capsule-hover` (scale 1.015) — identical on all three, no priority | D-1 |
| pressed | producer `tap-squish` / `--glass-btn-press-t` — identical on all three | `telemetry2.json.deadAxis` |
| selected | n/a | — |
| dragging | n/a | — |
| overflowing / truncated | no truncation; label **wraps and orphans its icon** at 320 | `narrow-320.png`; D-8 |
| RTL | untested here; `justify-start` is logical-safe, but the `right-`positioned close is producer-owned | not probed |
| reduced-motion | geometry resolves; 150ms opacity fade remains (producer) | D-15 |
| forced-colors | not evaluable in WebKit (no `forced-colors` support); shot captured for the record | `shots/forced-colors-crop.png` |
| zoom 200% | geometry holds (384px dialog in a 720px arm), close stays 16px | `telemetry4.json['zoom-200']` |
| 320px narrow | **full-bleed, ink collision, wrap** | D-8 |
| dark scheme | renders; same three-identical-pills collapse; page bleed-through worse | `desktop-dark-switch-crop.png` |

---

## 5. Verdict on the seat's framed question

*"A dialog named Migrate\* deserves scrutiny against the owner's absolute standing rule: NO legacy
code, no migration shims, no dual paths, no masking fallbacks. Determine whether this is a
one-shot user-facing data operation (legitimate) or a compatibility shim that should be RETIRED."*

**Neither.** It is not a code back-compat shim — there is no version bridge, no alias, no dual
serializer path, nothing to migrate *from*. Judged strictly against
`feedback_no_backwards_compat`, this file is clean.

It is also **not a legitimate one-shot data operation**, because the data operation it claims to
perform does not exist. Local palettes are canonical device-scoped Device Drafts
(`VISUAL-CONSTITUTION.md:186`, `PALETTE-CONTRACT.md:215`); no identity change touches them
(`useUserAuth.ts:77-83,112-127`); measured `localCount` never moves (D-2). The `discard` branch is
byte-equivalent to skipping the dialog, minus the typed error routing the skip path has.

What it actually is: **a fabricated data-safety ceremony wrapped around one real verb** — "publish
my local drafts in bulk" — that has been misfiled into the identity flow, where it has no surface
on which to report progress or failure, and where it fires a slug mutation that can destroy the
account handle with zero user-visible truth (D-3).

**Disposition: RETIRE the dialog. Re-home the one real verb.**

1. Delete `MigratePalettesDialog.vue`, its two barrel exports (`dialog/index.ts:8`,
   `browser/index.ts:40`), and the `showMigrateDialog` / `migrateMode` / `pendingMigrateAction` /
   `onMigrateRespond` machinery in `useSlugMigration.ts:27-29,59-116`.
2. `onSlugSwitch` and `onRegenerateSlug` collapse to their zero-palette branches — **one** path
   each, keeping the typed `ApiProblem` 409/404/429 routing that the dialog path discards, wired
   to a mounted error surface (`slugBarRef` is currently dead — D-3).
3. "Publish all local palettes" becomes a named Library command over Library entities, with a
   durable per-entity result, per `VISUAL-CONSTITUTION.md:101` and PR-08. That is where a bulk
   data operation can honestly show pending, partial and failed.
4. `App.vue:152-157` (a permanent shell-child modal mount) and `App.vue:176` (the eager barrel
   reach) both disappear with it — a subtraction the `App` seat has independently flagged
   (`audit/components/App/challenge-D-design.md:633`, `jury-2-architecture.md:311`).

This is subtraction before explanation (`PROPORTION-AUDIT.md §5.6`), and it removes a modal
interruption whose most likely real-world outcome, as measured, is worse than doing nothing.

---

## 6. Mechanism families

| family | members | one cure |
|---|---|---|
| **retired producer vocabulary** (`variant` on glass-ui 7) | D-1 · repo-wide: 103 hits / 36 files | speak `emphasis`/`tone`; add a structural `variant`-attribute guard, since `vue-tsc` exits 0 |
| **premise / journey fabrication** | D-2, D-5, D-11, and the whole of §5 | retire the dialog; re-home bulk publish to the Library |
| **operation truth is transient** (PR-08) | D-3, D-7 | the surface outlives the operation; durable entity status; `onCloseAutoFocus` |
| **consumer classes against a deciding root** (edicts 4+5) | D-6, D-4, D-8, D-9 | delete the six dead/defeated classes; use `surface`/`placement`/`stage`/`showClose` |
| **narrow-arm geometry** | D-8, D-10 | producer width + `placement="bottom"`; inline-end title reserve |
| **guard rot** | D-13 | repoint O-10d at `demo/palettes/browser/dialog/` |

## 7. Reproduction index

All read-only. Dev server on `:9000`, api on `:3000`.

```
node docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/probe-D/probe.mjs   # 4-matrix open + Esc + count arms   → telemetry.json
node docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/probe-D/probe2.mjs  # dead-axis + scrim + reduced-motion  → telemetry2.json
node docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/probe-D/probe3.mjs  # commit-state timeline               → telemetry3.json
node docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/probe-D/probe4.mjs  # mobile / 320 / 200%                 → telemetry4.json
node docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/probe-D/probe5.mjs  # collision / scrim / alignment        → telemetry5.json
npx vue-tsc -p tsconfig.demo.json --noEmit                                                  # EXIT=0 — the dead axis is invisible to CI
```

Screenshots: `probe-D/shots/` — `desktop-{light,dark}-{switch,regenerate}[-crop].png`,
`m-{light,dark}[-crop].png`, `narrow-320[-crop].png`, `zoom-200[-crop].png`,
`reduced-motion[-crop].png`, `forced-colors[-crop].png`, `count-{1,137}.png`,
`after-commit{,-8s}.png`.
