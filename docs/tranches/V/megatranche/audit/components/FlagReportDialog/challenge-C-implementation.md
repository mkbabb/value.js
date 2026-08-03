# CHALLENGE-C — `FlagReportDialog.vue` · implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE.** 101 lines, and the moderation path they own is broken in four independent ways that
a reader who admires the code will not see:

1. the form's state is **not bound to the palette it edits**, so a cancelled report on palette A
   arrives, one click later, on palette B — with A's free-text detail attached (BLOCKER, measured);
2. an **unbounded `paletteName` interpolation** blows the dialog's own layout apart at the API's
   legal 100-char maximum: title off-screen, button labels off-screen (BLOCKER, measured, screenshot);
3. **every API failure renders as success** — 401 / 404 / 409 / 5xx all close the dialog silently
   (BLOCKER, measured against a live 409 and a live 401);
4. the `submitting` ref and its `Loader2` spinner are **dead code** — provably never observable —
   so a 2.5s in-flight report shows the user nothing but a form erasing itself (MAJOR, measured).

Plus a glass-7 vocabulary residue that makes the **destructive button pixel-identical to Cancel**
(measured: same computed `background-color`, same `data-tone="neutral"`), a textarea and a radio
group with **no accessible name**, focus dumped to `<body>` on the submit path, and a single e2e
gate that stays green under every one of these.

19 findings: **4 BLOCKER · 7 MAJOR · 6 MINOR · 2 INFO.**

---

## Method + provenance

Subject: `demo/palettes/browser/dialog/FlagReportDialog.vue` (101 lines), repo
`/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

Read in full: the component; its barrel `dialog/index.ts`; its only sibling composable
`dialog/composables/useDialogBrowseActions.ts`; the sole consumer `demo/palettes/BrowsePane.vue`;
the port `demo/palettes/useAdminFlagged.ts`; the transport `demo/palettes/api/palettes.ts`;
the server contract `api/src/modules/palette/{routes/flags.ts,service/flags.ts,schema.ts,model.ts}`;
the design-system roots `@mkbabb/glass-ui@7` `Button`/`Dialog`/`RadioGroupItem`/`Textarea`/
`LabeledField` `.d.ts` + the compiled `glass-ui.js`; the one e2e gate
`e2e/smoke/flows/palette-flag.spec.ts`; the visual audit `audit/visual/REPORT.md`.

**Live probes.** Twelve Playwright probes (P1–P12) driven against the running dev server at
`http://localhost:9000`, read-only, using the repo's own `e2e/smoke/fixtures/user-auth` fixture with
per-test route overrides. Specs + screenshots preserved at
`docs/tranches/V/megatranche/audit/components/FlagReportDialog/evidence/challenge-C/`.
Runner configs lived in the session scratchpad; nothing under `src/ demo/ api/ test/ e2e/` was
touched. Every probe ran green (`5 passed`, `2 passed`, `1 passed`, `2 passed`, `1 passed`,
`1 passed`) — the numbers below are its stdout, pasted.

**Control discipline.** One candidate finding (a 1s+ stall of the dialog's enter transition, with the
dialog invisible and blurred) was **falsified** by re-running the identical trace under WebKit. See
§Negative results — I am not reporting it.

---

## Findings

| # | Severity | Defect | Mechanism family |
|---|---|---|---|
| C-1 | BLOCKER | Form state is not bound to the palette; a cancelled report re-arms on the next palette with the previous free text | M2 identity-unbound state |
| C-2 | BLOCKER | Unbounded `paletteName` interpolation destroys the dialog layout at the API's legal 100-char max | M6 unbounded interpolation |
| C-3 | BLOCKER | Every API failure (401/404/409/5xx/offline) is indistinguishable from success | M1 no acknowledgement channel |
| C-4 | BLOCKER | `submitting` + the `Loader2` spinner are provably unreachable; no in-flight affordance at all | M1 no acknowledgement channel |
| C-5 | MAJOR | `variant="destructive"` is not a glass-ui 7 prop — the destructive button renders identical to Cancel and leaks a stray DOM attribute | M3 pre-glass-7 vocabulary |
| C-6 | MAJOR | The `<textarea>` is a hand-rolled reimplementation of the shipped `glass-ui` `Textarea`, with per-instance styling | M3 pre-glass-7 vocabulary |
| C-7 | MAJOR | The `<textarea>` has no accessible name — placeholder only, which disappears on input | M4 unnamed controls |
| C-8 | MAJOR | The radio group has no accessible name; the `DialogDescription` that poses the question is not linked to it | M4 unnamed controls |
| C-9 | MAJOR | Focus is not restored on the submit path — it lands on `<body>` (the Cancel path restores correctly) | M1 no acknowledgement channel |
| C-10 | MAJOR | The one e2e gate is vacuous: five named mutations keep it green | M5 gate asserts the wire, not the machine |
| C-11 | MAJOR | `onSubmit` is a false-async: `async`/`try`/`finally` around a synchronous `emit` | M1 no acknowledgement channel |
| C-12 | MINOR | `paletteSlug` prop is accepted, destructured, and never used | M7 dead surface |
| C-13 | MINOR | `reason` is a bare `string` at three seams; no compile-time tie to the server's 4-member enum | M7 dead surface |
| C-14 | MINOR | `BrowsePane` never clears `flagPalette`; the dialog stays mounted for the session | M2 identity-unbound state |
| C-15 | MINOR | Dialog Close affordance is 16×16 — under WCAG 2.5.8's 24×24 | M8 producer geometry (relay) |
| C-16 | MINOR | Mobile footer: 0px gap between the destructive and the safe button | M8 producer geometry (relay) |
| C-17 | MINOR | `role="dialog"` carries no `aria-modal` | M8 producer geometry (relay) |
| C-18 | INFO | No unit test exists for this component at any level | M5 gate asserts the wire, not the machine |
| C-19 | INFO | The 0-flag/2nd-report loop is reachable: the Report menu item survives a successful report | M1 no acknowledgement channel |

---

### C-1 · BLOCKER — the form's state is not bound to the palette it edits

**Defect.** `reason` and `detail` (`FlagReportDialog.vue:86-87`) are reset **only** inside
`onSubmit`'s `finally` (`:97-98`). Nothing resets them when the dialog closes, and nothing resets
them when `paletteName`/`paletteSlug` change. `BrowsePane` mounts the dialog once
(`BrowsePane.vue:167-174`, `v-if="flagPalette"`) and never unmounts it (`flagPalette` is never set
back to `null`), so the child instance — and its state — outlives every open/close cycle and every
palette.

**Reproduction** (probe P3, `evidence/challenge-C/flag-probe.spec.ts:184`):
open Report on "Shady Spam" → select **Copyright violation** → type `LEAKED DETAIL TEXT` →
click **Cancel** → open Report on the *different* palette "Other Palette". Measured:

```
=== REOPEN STATE ===
{
  "title": "Report Palette Why are you reporting \"Other Palette\"? ...",
  "checked": [ "reason-copyright" ],
  "textarea": "LEAKED DETAIL TEXT",
  "reportDisabled": false
}
```

**Why it is a BLOCKER, not a nit.** The dialog re-opens *pre-armed*: a reason is already selected,
the Report button is already enabled, and the free-text field still holds prose the user wrote about
a **different** palette. One stray click writes an immutable moderation record
(`api/src/modules/palette/service/flags.ts:38-47`, unique-indexed by
`(paletteSlug, reporterSlug)` — the reporter then cannot correct it, they get 409 forever) against
the wrong palette, containing text that names the wrong palette. This is a data-integrity defect in
a moderation surface, reached by the most ordinary interaction there is: change your mind, then
report someone else.

**Cure.** Bind lifetime to identity. Idiomatic Vue 3.5, KISS, inside the component:

```ts
watch(() => open, (isOpen) => { if (!isOpen) { reason.value = ""; detail.value = ""; } });
```

and drop the reset from `finally` (it belongs to the close, not to the submit). The stronger
transposition — `:key="flagPalette.slug"` on the `<FlagReportDialog>` in `BrowsePane.vue:167`, so
the instance *is* the palette — costs one attribute and makes the whole class unrepresentable.
Both, ideally: `key` for identity, `watch` for the close.

---

### C-2 · BLOCKER — unbounded `paletteName` interpolation destroys the dialog

**Defect.** `FlagReportDialog.vue:10-12` interpolates the palette name into the description with no
truncation, no `line-clamp`, no `break-words`, no `overflow-wrap`:

```html
<DialogDescription>
    Why are you reporting "{{ paletteName }}"?
</DialogDescription>
```

The server accepts names up to **100 characters** (`api/src/modules/palette/schema.ts:25` —
`paletteNameSchema = z.string().trim().min(1).max(100)`). A 100-character name with no space is
server-valid data.

**Reproduction** (probe P12, `evidence/challenge-C/flag-probe7.spec.ts`, viewport 390×844, name =
`"A".repeat(100)`):

```
=== LONG NAME GEOMETRY ===
{
  "dialog": { "w": 390, "h": 451.8, ... },
  "desc":   { "w": 998.4, "scrollW": 998, "clientW": 998,
              "overflowWrap": "normal", "wordBreak": "normal" },
  "docScrollW": 390, "innerW": 390
}
```

The description paragraph is **998px wide inside a 390px dialog** — 2.56× the viewport. Because the
header is `flex flex-col ... text-center`, the `<h2>` centres itself inside that 998px box, so its
centre lands at x≈500 in a 390px viewport.

Screenshot: `evidence/challenge-C/flag-longname100-mobile.png`. Read it. The result:

- **the title "Report Palette" is gone** — pushed entirely off-screen;
- the question runs off the right edge, unreadable;
- the textarea and both footer buttons are stretched past the edge — **"Cancel" and "Report" render
  as two empty capsules with no labels**. The user cannot tell which one files the report.

`document.documentElement.scrollWidth` stays 390, so the repo's own horizontal-overflow oracle
(`REPORT.md` §horizontalOverflow — 0 defects on `/#/browse`) **cannot see this**: the overflow is
inside a clipped overlay the route-capture never opens.

**Adversarial weight.** The one palette you open this dialog for is, by definition, the one you
believe is abusive. A spammer whose palette is named with a 100-character unbroken token disables
the dialog used to report them. Desktop is not spared: `sm:max-w-md` caps the dialog at 448px, and
998 > 448.

**Cure.** The name is untrusted display data — clamp it at the point of use:
`class="break-words line-clamp-2"` on the description, or (better, and reusable across the four
surfaces that print remote palette names) a `truncateName()` in `demo/palettes/utils.ts`. Do not add
a new shared/ directory for it — `utils.ts` already exists.

---

### C-3 · BLOCKER — every API failure renders as success

**Defect.** The `submit` emit (`FlagReportDialog.vue:76`) has **no completion channel**:

```ts
submit: [reason: string, detail: string | undefined];
```

`emit()` returns `void`. The parent's handler is `async` (`BrowsePane.vue:296-300`) and its promise
is dropped on the floor. Downstream, `useAdminFlagged.report` (`useAdminFlagged.ts:120-131`) catches
**everything** and returns `undefined`:

```ts
try { return await flagPalette(paletteSlug, reason, detail); }
catch (e) { console.warn("Failed to flag palette:", e); return undefined; }
```

and `BrowsePane.onFlagSubmit` closes the dialog unconditionally on the next line
(`BrowsePane.vue:298-299`). So the user's confirmation that their report landed is *the dialog
closing* — which happens identically whether it landed or not.

The server defines four distinct rejections, all reachable:

| Status | Source | Reachable by |
|---|---|---|
| 401 | `routes/flags.ts:17` `AuthenticationError` | any user without a live session |
| 404 | `service/flags.ts:31` `NotFoundError` | palette deleted between browse and report |
| 409 | `service/flags.ts:44-46` `ConflictError "Already flagged"` | **reporting the same palette twice** |
| 400 | `service/flags.ts:33` `ValidationError` | (menu-gated today, `PaletteCardMenu.vue:144`) |

**Reproduction** (probe P4 — live 409):

```
=== AFTER 409 ===
{ "dialogPresent": false, "anyAlert": 0, "bodyHasError": false,
  "activeElement": "BODY", ... }
=== CONSOLE ===
error: Failed to load resource: the server responded with a status of 409 (Conflict)
warning: Failed to flag palette: ApiProblem: Conflict
    at Object.report (.../demo/palettes/useAdminFlagged.ts:80:11)
    at async onFlagSubmit (.../demo/palettes/BrowsePane.vue:95:4)
```

Zero alerts, zero live regions, zero error text on the page. The only trace is a `console.warn` no
user reads. Probe P5 reproduces the same silent close on a live 401
(`=== AFTER 401 === sawPost=true {"dialogPresent":false,"bodyHasError":false}`).

**Reachability of the 409 loop** (C-19, probe P6): after a *successful* report, the card's menu
still offers **Report** — measured `=== REPORT MENUITEM COUNT AFTER SUCCESSFUL REPORT === 1`. Any
user who forgets, or who wants to add detail, walks straight into a 409 and is told it worked.

**Cure — and the house already built it.** This is the one user-triggered remote mutation that was
never wired to the feedback rail everything else uses. `BrowsePane` routes `onSave`,
`onDeleteOwned`, `onSetVisibility` and `onFork` through `cardRefs[slug].showFeedback(msg, kind)`
(`BrowsePane.vue:229-262`), and `useDialogBrowseActions.ts:69` states the precept in its own words:

> `// F2: a user-triggered remote mutation must surface its failure.`

The flag path violates the precept its own cluster wrote. Three-line cure, no new abstraction:

1. `useAdminFlagged.report` **rethrows** instead of swallowing (delete the `catch`; the caller owns it);
2. `BrowsePane.onFlagSubmit` wraps in `try/catch`, closes only on success, and calls
   `cardRefs[flagPalette.value.slug]?.showFeedback(message, "error")` on failure — the identical
   shape `onForkError` already uses;
3. the dialog stops closing itself blind — see C-4's cure, which supplies the state it needs.

---

### C-4 · BLOCKER — `submitting` and the spinner are unreachable dead code

**Defect.** `FlagReportDialog.vue:90-100`:

```ts
async function onSubmit() {
    if (!reason.value) return;
    submitting.value = true;
    try { emit("submit", reason.value, detail.value.trim() || undefined); }
    finally { submitting.value = false; reason.value = ""; detail.value = ""; }
}
```

`emit` is synchronous. There is no `await` anywhere in the function. `submitting` goes
`true → false` inside one synchronous block, so no reactive flush ever observes `true`. The
`v-if="submitting"` spinner at `:46` and the `|| submitting` disable-guard at `:43` are unreachable
by construction. The parent's real network call — `await pm.flagged.report(...)` — begins *after*
this function has already returned and cleared its own state.

**Reproduction** (probe P2: the flag POST held open for 2500ms; the DOM sampled every 100ms starting
at the click):

```
t=0    dialogOpen:true spinner:false reportDisabled:false checkedRadios:1 textarea:"some detail text" liveRegions:0
t=500  dialogOpen:true spinner:false reportDisabled:false checkedRadios:1 textarea:"some detail text" liveRegions:0
t=600  dialogOpen:true spinner:false reportDisabled:true  checkedRadios:0 textarea:""                 liveRegions:0
t=700 … t=2300  (identical: spinner:false, checkedRadios:0, textarea:"", liveRegions:0)
POSTS=1
```

`spinner:false` at **every one of 24 samples** across the full in-flight window. What the user
actually sees when they click Report on a slow connection: the radio deselects itself, their typed
detail vanishes, the button greys out, and the dialog sits there — for as long as the network takes —
with no spinner, no progress text, and `liveRegions:0` (nothing for a screen reader either).
The form erasing itself is the only feedback, and it reads as an error, not as progress.

The button-disable at t=600 is **accidental**: it comes from `!reason` after the reset, not from
`submitting`. Restore the reset to where it belongs (C-1) and the double-submit guard disappears
with it — the two defects are currently propping each other up.

**Cure.** glass-ui 7's `Button` already ships the primitive this hand-rolls:
`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts` —
`loading?: boolean` — *"Marks an in-flight command and suppresses activation until it settles."*
Delete `Loader2`, delete the `@lucide/vue` import, delete `mr-2 h-4 w-4 animate-spin`, and bind
`:loading="submitting"`. Then make `submitting` real by giving the emit a completion channel (C-3):
either the parent drives it down as a prop, or — the cleaner transposition — the dialog awaits its
own submission through a colocated `useFlagReport` composable in
`dialog/composables/` (the directory already exists, so this adds no new structure).

---

### C-5 · MAJOR — `variant="destructive"` is not a glass-ui 7 prop; the destructive button is Cancel

**Defect.** `FlagReportDialog.vue:38` and `:42` pass `variant="outline"` / `variant="destructive"`.
glass-ui 7's `ButtonProps` has **no `variant`**
(`dist/components/button/Button.vue.d.ts`): the axes are `emphasis` (`primary|secondary|quiet|text`)
and `tone`. The producer's own type file is explicit
(`dist/components/_shared/axes.d.ts`):

```ts
/** The tone axis — the semantic status register (`--<tone>` token cohort); NEVER a `variant` member. */
export declare const TONES: readonly ["neutral", "success", "warning", "info", "destructive"];
```

`variant` is therefore an unknown attribute: it falls through to the DOM and both buttons render at
the *default* emphasis and tone.

**Reproduction** (probe P8, computed styles on the live open dialog):

```
=== BUTTON PARITY ===
[ { "text": "Cancel", "strayVariantAttr": "outline",
    "emphasis": "secondary", "tone": "neutral",
    "bg": "oklab(0.721321 0.00495294 0.0108792 / 0.6)", "color": "rgb(0, 0, 0)" },
  { "text": "Report", "strayVariantAttr": "destructive",
    "emphasis": "secondary", "tone": "neutral",
    "bg": "oklab(0.721321 0.00495294 0.0108792 / 0.6)", "color": "rgb(0, 0, 0)" } ]
```

Byte-identical background, colour and border; the stray `variant="destructive"` sits in the live
DOM as a junk attribute (visible in the dumped markup, probe P6). Screenshot
`evidence/challenge-C/flag-settled-mobile.png` confirms it visually: two identical neutral capsules,
with the *destructive* one reading **weaker** than Cancel because it happens to be disabled.

A moderation action that writes an immutable record has no destructive affordance and no visual
priority over the escape hatch.

**Edict violations.** #2 (no legacy — this is pre-glass-7 shadcn vocabulary surviving the W44
"Glass 7.0.0 ADOPTED WHOLE" adoption) and #4 (glass-ui is the design system — speak its axes).

**Cure.** `<Button emphasis="primary" tone="destructive" :loading="submitting" ...>` for Report;
`<Button emphasis="quiet">` for Cancel. **Family note:** the same dead `variant` is passed at
`MigratePalettesDialog.vue:15,24,32`, `VersionHistoryDrawer.vue:77,90`, `BrowsePane.vue:70,137` and
`PaletteCard.vue:98` — a repo-wide sweep, not a local patch. A producer-side `variant` reject
(dev-mode warning in glass-ui's Button) would make the class unrepresentable; that is a BH relay.

---

### C-6 · MAJOR — the textarea reimplements a shipped glass-ui primitive

**Defect.** `FlagReportDialog.vue:29-34` is a raw `<textarea>` carrying six per-instance utility
classes:

```html
class="h-20 rounded-input border border-input bg-background px-3 py-2 text-small resize-none
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
```

glass-ui 7 **ships a `Textarea`** —
`node_modules/@mkbabb/glass-ui/dist/components/textarea/Textarea.vue.d.ts`, exported from
`@mkbabb/glass-ui/forms` (`dist/forms.d.ts`: `export * from "./components/textarea";`) — whose props
cover every hand-rolled concern and more: `modelValue`, `placeholder`, `maxlength`, `rows`,
`resize`, `size`, `invalid`. The demo already consumes that same subpath for `Input`
(`demo/ui/input/index.ts`: `export { Input } from "@mkbabb/glass-ui/forms";`) — the seam exists and
this file walked past it.

**Measured consequence** (probe P9): `textareaBg: "rgb(251, 250, 248)"` — a fully **opaque** white
plate inside a `backdrop-filter: blur(11px) saturate(1.6)` glass overlay
(`dialogBg: oklab(0.903549 … / 0.705088)`). Visible in
`evidence/challenge-C/flag-settled-mobile.png` as a hard white rectangle breaking the glass. This is
a **carried, unremediated** finding: `docs/tranches/T/audit/lanes/t-card-color-census.md:93` booked
it as row D4 (`FlagReportDialog textarea · bg-background (opaque) · opaque | opaque | 2W`) and the
opacity is still there today.

**Edict violations.** #3 (KISS/no contrivance — do not hand-roll what exists), #4 (glass-ui is the
design system), #5 (root-level styling — these are per-instance overrides of a control the root
already styles).

**Cure.** `import { Textarea } from "@mkbabb/glass-ui/forms"` (or add it to `demo/ui/textarea/`
beside the existing `demo/ui/input/` barrel, matching house convention) and delete the class string.
If the glass rung is wrong for a dialog-nested field, fix it at the glass-ui root — that is the
edict — not with `bg-background` here.

---

### C-7 · MAJOR — the textarea has no accessible name

**Defect.** Measured (probe P1):

```
"textarea": { "id": null, "name": null, "ariaLabel": null, "labelledby": null,
              "describedby": null, "placeholder": "Additional details (optional)...",
              "maxlength": 500, "bg": "rgb(251, 250, 248)" }
```

Every naming hook is null. The accessible name falls all the way through the accname cascade to the
`placeholder` — HTML-AAM's *last-resort* fallback — which **disappears the moment the user types**.
A screen-reader user who returns to the field after typing hears an unnamed textbox. There is no
`<label>`, no `aria-label`, and the four `<label>` elements in the dialog all point at radios
(probe P1 `labels[]`).

**Cure.** glass-ui ships `LabeledField` / the `labeled-field` subpath
(`dist/components/labeled-field/`) whose props include `errorLive` — an aria-live error channel,
which is *also* the missing surface from C-3. One primitive closes two findings.

---

### C-8 · MAJOR — the radio group has no accessible name

**Defect.** Measured (probe P1):

```
"radiogroup": { "ariaLabel": null, "labelledby": null, "required": "false" }
```

The `<DialogDescription>` that poses the actual question — *"Why are you reporting …?"* — is rendered
as `<p id="reka-dialog-description-v-1-9">` and wired to the **dialog** via `aria-describedby`
(confirmed in the dumped markup, probe P6), never to the radiogroup. So a screen-reader user
arriving at the group hears `"radiogroup"` with no name, and `aria-required="false"` even though the
Report button is disabled until a reason is chosen — the requirement is enforced but not announced.

**Cure.** `aria-labelledby` on the `RadioGroup` pointing at the description id, plus `required` so
the group announces `aria-required="true"`. The individual radios are fine — they are correctly
named via `<label for>` (see §Negative results).

---

### C-9 · MAJOR — focus is not restored on the submit path

**Defect / reproduction** (probe P6, same session, three close paths):

```
=== FOCUS AFTER ESCAPE === {"tag":"BUTTON","id":"reason-inappropriate", ...}   (mid-exit)
=== FOCUS AFTER CANCEL === {"tag":"BUTTON","id":"reka-dropdown-menu-trigger-v-1-1",
                            "label":"Palette menu"}                             ✅ restored
=== FOCUS AFTER SUBMIT === {"tag":"BODY","id":"app", ...} dialogPresent=false    ❌ lost
```

Cancel restores focus to the invoking "Palette menu" trigger — correct. The **submit** path drops
focus to `<body>`. A keyboard or screen-reader user who files a report is teleported to the top of
the document and must re-traverse the entire shell to get back to the palette grid (WCAG 2.4.3
Focus Order / 3.2.x). The asymmetry is diagnostic: Cancel closes *through* the Dialog's own
`update:open` path, whereas submit closes by the parent flipping `flagDialogOpen` a full network
round-trip later — by which time the dismissal machinery's focus-return anchor is stale.

**Cure.** Falls out of C-3/C-4's cure: close through the same `update:open` channel Cancel uses,
synchronously on a settled result, rather than by remote-flipping the prop from an async parent
handler.

---

### C-10 · MAJOR — the one gate is vacuous (test truth)

**Coverage census.**
`grep -rln "FlagReport" demo/test test src` → **no hits**. There is no unit test.
The only coverage is `e2e/smoke/flows/palette-flag.spec.ts` (49 lines). I ran it against the live
server: **`1 passed (14.4s)`**.

Its entire assertion set is:

```ts
await page.getByRole("radio", { name: "Spam" }).click();
await page.getByRole("button", { name: "Report" }).click();
await expect.poll(() => flagBody?.reason).toBe("spam");
```

One fact: *a reason string reached the wire.* Nothing about the component's state machine.

**Mutations that keep it green** — each one a live defect above:

| Mutation | Kills | Gate |
|---|---|---|
| Delete `submitting`, the `Loader2` import, and the `v-if="submitting"` spinner (`:46`, `:88`) | C-4 | 🟢 green |
| Delete the `finally` reset (`:97-98`) | C-1 | 🟢 green |
| `emit("submit", reason.value, detail.value)` — send untrimmed `""` instead of `undefined` | detail contract | 🟢 green (spec never types into the textarea, never asserts `flagBody.detail`) |
| Delete `@click="$emit('update:open', false)"` from Cancel (`:38`) — Cancel becomes inert | dismissal | 🟢 green (spec never clicks Cancel, never asserts the dialog closes) |
| Delete `:disabled="!reason || submitting"` (`:43`) | double-submit guard | 🟢 green (spec always picks a radio first) |
| Delete `maxlength="500"` (`:33`) | boundary alignment with `z.string().max(500)` | 🟢 green |
| Swap `paletteName` for `paletteSlug` in the description (`:11`) | wrong text to the user | 🟢 green |

**Cure.** A vitest component test is the right altitude for six of these (mount, drive, assert:
reset-on-close, disabled-until-reason, spinner-visible-while-pending, error-surfaced-on-reject,
detail trimmed to `undefined`, long-name clamped). The e2e gate should additionally assert that the
dialog **closes on success and stays open with an error on 409** — the assertion whose absence let
C-3 ship.

---

### C-11 · MAJOR — `onSubmit` is a false-async

`async function onSubmit()` (`:90`) contains no `await`. The `try`/`finally` guards a synchronous
`emit` that cannot throw asynchronously, so the ceremony communicates "this is awaited work" to
every future reader while doing nothing. It is the syntactic tell of C-4: the shape of an async
submit with none of the substance. Cure: it becomes genuinely async once it awaits a real
submission (C-3/C-4), or the `async`/`try` come off.

---

### C-12 · MINOR — `paletteSlug` is dead surface

`FlagReportDialog.vue:68,71` declares and destructures `paletteSlug`; `grep -n "paletteSlug"` on the
file returns exactly those two lines. It is never read in template or script. `BrowsePane.vue:171`
dutifully passes it, then uses its *own* `flagPalette.value.slug` for the actual call
(`BrowsePane.vue:298`). A required prop that is pure decoration — and, ironically, the exact input
the component would need to own its submission (C-3's cure). Either use it or delete it; the current
state advertises a capability that does not exist.

---

### C-13 · MINOR — `reason` is an untyped string at three seams

`FlagReportDialog.vue:79-84` declares `reasons` as a plain (non-`as const`) array, so `r.value` is
`string`; the emit is typed `reason: string` (`:76`); `BrowsePane.onFlagSubmit(reason: string)`
(`:296`); `demo/palettes/types.ts:105` `Flag.reason: string`. The server enforces a closed set —
`api/src/modules/palette/model.ts:25`:

```ts
export const FLAG_REASONS = ["inappropriate", "spam", "copyright", "other"] as const;
```

A typo in the `reasons` array compiles clean, ships, and 400s at runtime — where C-3 then swallows
it and reports success. Cure: `as const` on `reasons` plus a client-side
`export type FlagReason = "inappropriate" | "spam" | "copyright" | "other"` in
`demo/palettes/types.ts`, threaded through the emit. Per `verbatimModuleSyntax` (edict 8) it must be
imported as `import type`.

---

### C-14 · MINOR — the dialog is never unmounted

`BrowsePane.vue:288-294` sets `flagPalette` and never clears it. `v-if="flagPalette"`
(`BrowsePane.vue:168`) therefore stays true for the rest of the session after the first Report, so
the child instance and its state persist. This is the *enabling condition* for C-1 — fixing C-1 by
`:key` also fixes this.

---

### C-15/C-16/C-17 · MINOR — producer geometry + semantics (glass-ui BH relay)

All three are `glass-ui@7` `DialogContent`/`DialogFooter` behaviours, measured through this
component and owed a BH-inbox relay per the standing E13/BH fond:

- **C-15** — the Close affordance measures **16×16** (probe P10 mobile: `"close": {"w":16,"h":16}`;
  probe P1 desktop: `w:15.9 h:14.2`), under WCAG 2.5.8 AA's 24×24 minimum. `REPORT.md` counts 4
  small tap targets on `/#/browse` with the dialog **closed**; opening it adds this one, invisible
  to the route-capture matrix.
- **C-16** — mobile footer stacking has **zero gap**: probe P10 measured Report at `y=526.4, h=40`
  (bottom 566.4) and Cancel at `y=566.4` — the destructive button and the escape hatch are flush.
  The footer class is `flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2` — the gap is
  `sm:`-gated, so it exists only where the buttons are already side by side. Visible in
  `evidence/challenge-C/flag-settled-mobile.png`.
- **C-17** — the dumped markup (probe P6) shows `role="dialog"` with `aria-labelledby`,
  `aria-describedby`, `data-state="open"` and **no `aria-modal`**, despite a working focus trap
  (probe P6 tab order cycles radio → textarea → Cancel → Close → radio). Assistive tech is not told
  the background is inert.

---

## Negative results — what I tried to break and could not

Evidence that proves the negatives, so the next seat does not re-spend the probes:

1. **The enter transition is NOT stalled — falsified.** Under headless Chromium + SwiftShader
   (probe P11) the dialog measured `filter: blur(6px)`, `opacity: 0`, three `CSSTransition`s at
   `playState:"running", currentTime:0` at t=100/400/1000ms — i.e. invisible and blurred for over a
   second, and the screenshots `flag-settled-light.png` / `flag-dialog-open.png` show an illegible
   smear. **Re-running the identical trace under WebKit** (real Safari engine) gives
   `currentTime:115` at t≈100 and fully settled (`blur(0px)`, `opacity:1`) by t≈400. The stall is a
   headless-Chromium/SwiftShader frame-starvation artifact, **not a product defect**, and I am not
   reporting it. *Methodological warning for the fleet:* any Chromium+SwiftShader screenshot of a
   `glass-reveal` overlay in this repo can capture a transparent or blurred element — the visual
   audit's choice of real Safari is what makes its overlay captures trustworthy.
2. **Escape and outside-click dismissal work.** Probe P8 traced `data-state` at 200ms intervals:
   `closed` at t=0/200/400, element gone by t=600. My earlier P6 reading of "Escape did not close"
   was the exit animation, not a defect — retracted.
3. **`<label for>` → radio activation works.** The radios render as `<button role="radio">`
   (a labelable element); clicking the *text* selects them — probe P1:
   `label[for="reason-copyright"]` click → `{"id":"reason-copyright","checked":"true"}`. The radios
   also carry real `aria-label`s (`"Inappropriate content"`, `"Spam"`, …) and measure 43.8×39.1 —
   above the 24×24 floor.
4. **The focus trap is intact.** Probe P6 tab order cycles strictly inside the dialog:
   textarea → Cancel → Close → radio → textarea → … Initial focus lands on the first radio
   (`reason-inappropriate`) without selecting it — correct roving-tabindex behaviour.
5. **The 500-char boundary is aligned.** Probe P7: typing 600 chars yields
   `typedLen=500 sentDetailLen=500` — `maxlength="500"` (`:33`) matches
   `z.string().max(500)` (`api/.../schema.ts:72`) exactly. A whitespace-only detail is correctly
   dropped: `body={"reason":"other"}` — `detail` absent, not `""`.
6. **No double-submit fires.** Probe P2 measured `POSTS=1` under a 2.5s in-flight window — though
   only accidentally, via C-4's misplaced reset.
7. **No leak surface exists.** The component registers no lifecycle hook, no listener, no observer,
   no timer, no `requestAnimationFrame`. It is immune to the constellation-wide PRM-RAF class, and
   has no WebGL, no parsing, and no `ValueUnit` contact — none of the repo's named hazards land here.
8. **No horizontal page overflow.** Probe P10 at 390px: `docScrollW: 390 === innerW: 390`, dialog
   `w:390`. (C-2's 998px overflow is *inside* the clipped overlay — which is precisely why the
   page-level oracle misses it.)
9. **`verbatimModuleSyntax` (edict 8) is satisfied.** All eight imports (`:55-66`) are value
   imports; no type-only import is mis-declared.
10. **Vue 3.5 idiom (edict 7) is satisfied.** Reactive props destructure at `:68`; no `defineModel`,
    so the `WritableComputedRef` stale-read hazard does not apply; no template refs needed.
11. **Edict 1 (no god modules) and edict 6 (animations never deleted) are satisfied.** 101 lines,
    one concern; no keyframes are defined or removed here.

---

## Mechanism families, and the one cure that closes the most

| Family | Findings | Root |
|---|---|---|
| **M1 — no acknowledgement channel** | C-3, C-4, C-9, C-11, C-19 | `submit: [reason, detail]` returns `void`; the component fires and forgets, so it cannot know, show, or survive an outcome |
| **M2 — identity-unbound state** | C-1, C-14 | the instance outlives the palette it edits; state lifetime is tied to nothing |
| **M3 — pre-glass-7 vocabulary** | C-5, C-6 | shadcn `variant` + hand-rolled controls survived the Glass 7.0.0 adoption |
| **M4 — unnamed controls** | C-7, C-8 | naming was left to placeholders and to nothing |
| **M5 — the gate asserts the wire, not the machine** | C-10, C-18 | one e2e POST assertion stands in for a whole state machine |
| **M6 — unbounded interpolation** | C-2 | untrusted remote text printed without a clamp |
| **M7 — dead surface** | C-12, C-13 | props and types that promise what the code does not do |
| **M8 — producer geometry (relay)** | C-15, C-16, C-17 | glass-ui `DialogContent`/`DialogFooter` |

**The gestalt cure.** Nine of nineteen findings dissolve from a single architectural transposition:
**let the dialog own its submission.** It already receives `paletteSlug` and ignores it (C-12).
Give the `dialog/composables/` directory — which already exists — a `useFlagReport(slug)` that calls
`pm.flagged.report` and returns `{ submit, pending, error }`; have `report` stop swallowing
(`useAdminFlagged.ts:120-131`); bind `pending` to glass-ui `Button`'s shipped `loading` prop; render
`error` through `LabeledField`'s shipped `errorLive` aria-live channel; `watch` `open` to reset; key
the instance by slug. `BrowsePane` then keeps only what a host should: opening the dialog, and
routing the failure message onto `cardRefs[slug].showFeedback` — the rail `onSave`, `onDeleteOwned`,
`onSetVisibility` and `onForkError` already ride, and the one this cluster's own comment
(`useDialogBrowseActions.ts:69`) declared mandatory.

That leaves C-2 (one clamp on the name), C-5/C-6 (the glass-7 vocabulary sweep, repo-wide),
C-8 (one `aria-labelledby`), C-10 (the tests that would have caught all of it), and the three
producer relays.

---

## Evidence index

`docs/tranches/V/megatranche/audit/components/FlagReportDialog/evidence/challenge-C/`

| File | What it shows |
|---|---|
| `flag-probe.spec.ts` | P1 a11y+geometry census · P2 in-flight sampling · P3 state leak · P4 live 409 · P5 live 401 |
| `flag-probe2.spec.ts` | P6 focus lifecycle + full dialog markup dump · P7 500-char / whitespace boundary |
| `flag-probe3.spec.ts` | P8 escape + outside-click trace, button computed-style parity |
| `flag-probe4.spec.ts` | P9 settled surface census · P10 mobile geometry |
| `flag-probe5.spec.ts` | P11 reveal-transition settle trace (run under both Chromium and WebKit) |
| `flag-probe7.spec.ts` | P12 unbounded `paletteName` at the API's 100-char cap |
| `flag-longname100-mobile.png` | **C-2** — title off-screen, unlabelled buttons, at a server-legal name |
| `flag-settled-mobile.png` | **C-5/C-6/C-16** — identical neutral capsules, 0px gap, opaque white textarea |
| `flag-settled-light.png` | the Chromium+SwiftShader smear that the WebKit control falsified (see Negative results §1) |

Runner configs were session-scratchpad only. No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`,
`docs/tranches/V/vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md` was modified by this seat.
