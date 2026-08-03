# CHALLENGE-L — library structure · `FlagReportDialog.vue`

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`), spawned with an explicit
Opus 5 declaration. The seat is declared, not inherited. No DEFECT on the receipt axis.

## Subject and provenance

| | |
|---|---|
| Subject | `demo/palettes/browser/dialog/FlagReportDialog.vue` (101 lines, area `palettes`) |
| Sole host | `demo/palettes/BrowsePane.vue:167-174` (via barrel `./browser/dialog`) |
| Declared HEAD | `c654824e` |
| **Actual HEAD at audit time** | **`ed047306`** — the tree moved under the brief; all line numbers below are against `ed047306` |
| Dev server | `http://localhost:9000` → HTTP 200 |
| Typecheck gate | `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**, and `--listFiles \| grep -c FlagReportDialog` → **1** (the file *is* in the program) |

Verdict: **DEFECTIVE**. Nine findings, two BLOCKER. The strongest is not a style nit — a
**destructive moderation action renders pixel-identical to its own Cancel button**, because the
`variant` prop it passes was deleted from the design system and the demo's alias layer laundered
the dead API forward past a green typecheck.

---

## The import graph, traced to ground

Every import in the subject, resolved to its real home (resolution taken from the Vite dev server's
own transform output, not inferred):

```
$ curl -s 'http://localhost:9000/@fs/.../dialog/FlagReportDialog.vue' | grep '^import'
import { ref } from ".../node_modules/.vite/deps/vue.js?v=fb04632a"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle }
  from ".../demo/ui/dialog/index.ts"
import { Button }                       from ".../demo/ui/button/index.ts"
import { RadioGroup, RadioGroupItem }   from ".../demo/ui/radio-group/index.ts"
import { Loader2 }                      from ".../node_modules/.vite/deps/@lucide_vue.js"
```

Findings on the graph itself:

- **No boundary is crossed the wrong way.** Nothing reaches into the shell, boot, or a deep `src/`
  internal. There is no `@src/*` import, no `../../../../` escape out of `palettes`. On the
  *direction* question the component is clean — I record that as a negative proof, not an omission.
- **The component imports nothing from `@mkbabb/value.js` at all.** It is a pure form surface. So
  the "false proof of the public API" charge does not land against this file directly — but the
  library structure *underneath* it carries a real instance of that defect (**L-7**).
- **`import type` law (#8) is satisfied**: the file has zero type-only imports to mark. Not a
  violation, and not a credit either.

What *is* wrong is the middle hop: all three component imports go through `demo/ui/*`, which is
not a module — it is an alias table.

---

## L-1 · `demo/ui/*` is a 19-barrel pure alias layer over glass-ui — BLOCKER

**Defect.** `demo/ui/` contains no implementation. Every one of its 19 barrels is a one-line
re-export of a component glass-ui already ships. It is a rename table standing between the demo and
its design system, and it is the single mechanism that makes L-2 possible.

**Evidence.** Full dump of the layer:

```
$ for d in demo/ui/*/; do echo "=== $d"; cat "$d/index.ts"; done
=== demo/ui/button/       export { Button } from "@mkbabb/glass-ui";
=== demo/ui/dialog/       export { Dialog, DialogClose, DialogTrigger, DialogHeader, DialogTitle,
                                   DialogDescription, DialogContent, DialogFooter } from "@mkbabb/glass-ui";
=== demo/ui/radio-group/  export { RadioGroup, RadioGroupItem } from "@mkbabb/glass-ui";
… 16 more, all identical in shape
```

Zero local `.vue` files exist anywhere under `demo/ui/`. The `alert` barrel still carries the
comment recording its own conversion from implementation to re-export ("This barrel previously held
a local shadcn-vue re-implementation … B.W2 converted it to a re-export"). The layer's *stated*
purpose is already discharged; what remains is the shim.

**Dual path, measured.** The same `Dialog` concept is reached two different ways inside one
directory family:

```
$ grep -rn '"\.\./.*ui/dialog"' demo
demo/palettes/browser/dialog/VersionHistoryDrawer.vue:111
demo/palettes/browser/dialog/MigratePalettesDialog.vue:52
demo/palettes/browser/dialog/FlagReportDialog.vue:63          ← subject

$ grep -rn "@mkbabb/glass-ui/dialog" demo
demo/palettes/PalettesPane.vue:148
demo/palettes/browser/admin/AdminUsersPanel.vue:197
```

Three files via the alias, two via the published subpath — same symbols, same package, two spellings.
Repo-wide: 29 barrel imports vs 37 bare-root `from "@mkbabb/glass-ui"` imports vs 17 distinct direct
subpaths.

**Mechanism.** A rename table is a legacy shim by definition — it exists so that call sites written
against the *old* vendor need not be migrated. Owner edict #2 forbids exactly this ("no aliases,
migration shims, dual paths"). Worse, the barrel is a **type-erasing hop**: it re-exports the value
binding without restating the contract, so a call site can keep passing a prop the real component
deleted and nothing on the path objects. That is not hypothetical — see L-2.

**Reproduction.** `cat demo/ui/button/index.ts` → one line, no implementation. Then the two greps
above, verbatim.

**Cure.** Delete `demo/ui/` entirely; rewrite the 29 call sites to the published glass-ui subpaths
(`@mkbabb/glass-ui/dialog`, `/button`, and root for `RadioGroup`, which glass-ui exports from
`dist/index.d.ts:17` but has no dedicated subpath for). This is a mechanical codemod, it removes a
directory rather than adding one (KISS-positive), and it makes L-2 a **compile error** instead of a
silent visual regression. It also deletes 51 `../../../ui/*` relative-path hops repo-wide.

---

## L-2 · `variant="outline"` / `variant="destructive"` are dead props — the destructive action renders identical to Cancel — BLOCKER

**Defect.** `FlagReportDialog.vue:38` passes `variant="outline"` and `:41` passes
`variant="destructive"`. Glass 7's `Button` **has no `variant` prop**. Both land as inert
fallthrough DOM attributes; both buttons fall back to the same defaults; the destructive
moderation command is visually indistinguishable from Cancel.

**Evidence — the contract.** `node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6-19`:

```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone;                 // semantic intent, orthogonal to emphasis
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;
    type?: ButtonHTMLAttributes["type"];
    disabled?: ButtonHTMLAttributes["disabled"];
    class?: HTMLAttributes["class"];
}
```

No `variant`. The axis was split into `emphasis` (visual priority) × `tone` (semantic intent).

**Evidence — the live DOM.** I mounted the real SFC off the Vite dev server module graph
(`import('http://localhost:9000/@fs/…/FlagReportDialog.vue')`), rendered it with
`paletteName:'Shady Spam'`, and read computed style off both footer buttons:

```json
[
 {"text":"Cancel","attrs":["data-slot=button","data-emphasis=secondary","data-tone=neutral","variant=outline"],
  "bg":"oklab(0.721321 0.00495294 0.0108792 / 0.6)","color":"rgb(0, 0, 0)","w":85.6,"h":40},
 {"text":"Report","attrs":["data-slot=button","data-emphasis=secondary","data-tone=neutral","variant=destructive"],
  "bg":"oklab(0.721321 0.00495294 0.0108792 / 0.6)","color":"rgb(0, 0, 0)","w":83.7,"h":40}
]
```

Read it precisely:

- `variant=outline` / `variant=destructive` appear as **raw HTML attributes**, not as resolved props —
  the signature of Vue attribute fallthrough onto the root element.
- `data-emphasis=secondary` and `data-tone=neutral` are **identical on both** — the component's
  declared defaults (`emphasis: "secondary"`, `tone: "neutral"` per the `.d.ts` defaults block).
- **Computed background is byte-identical**: `oklab(0.721321 0.00495294 0.0108792 / 0.6)` on both.
  Same `color`. Same class list modulo `glass-capsule-hover`.

**Evidence — the pixels.** `evidence/flagreport-probe.png` (attached). Cancel and Report render as
two identical neutral glass capsules. Nothing marks Report as destructive: not fill, not text
colour, not border. A user about to file an irreversible moderation report against another user's
palette is given a button that looks exactly like the escape hatch beside it. The screenshot happens
to capture the *app's own* instance ("Sunset Over the Bay"), not my probe mount — so this is the
production render path, not a mounting artifact.

**Evidence — the gate is blind.** `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**, and
`--listFiles | grep -c FlagReportDialog` → **1**. The file is compiled and the dead prop passes.

**Mechanism.** Two compounding structural faults, not a typo:
1. `demo/ui/button/index.ts` re-exports the *value* without restating the *contract*, so the shadcn-era
   `variant` vocabulary survives at call sites long after the vendor deleted it (this is L-1 cashing out).
2. Vue permits unknown attributes to fall through to the root element, so neither the template
   compiler nor `vue-tsc` can distinguish "prop I meant" from "attribute I set".

Together: a design-system API removal produced **zero** signal — not a type error, not a runtime
warning, not a console message — only a silent semantic regression on the most dangerous control in
the component.

**Blast radius.** Not local. `DEFECT-LEDGER.md:22422` records a fleet script finding **51
`<Button variant=…>` sites across 22 files**, and independently confirms
`grep -o "outline\|ghost" …/button-Bu9F4uU6.js` → **zero matches** in the shipped chunk. This
component is one instance of a repo-wide dead-vocabulary class.

**Reproduction.** Open `/#/browse`, open a non-owned palette's menu → Report; or mount the SFC as
above. Read `getComputedStyle` on both footer buttons — the backgrounds match exactly.

**Cure.** `variant="outline"` → `emphasis="secondary"`; `variant="destructive"` →
`emphasis="primary" tone="destructive"`. Then execute L-1 so the class cannot recur: with the alias
layer gone and imports pointing at `@mkbabb/glass-ui/button`, `vue-tsc` types the props directly and
every one of the 51 sites becomes a compile error rather than a silent visual defect.

---

## L-3 · `FLAG_REASONS` has two homes — the enum is hand-copied into the template — MAJOR

**Defect.** The flag-reason vocabulary is owned by the API and re-declared, unlinked, in the
component; the type is widened to `string` at both intervening layers, so the copy is unenforced.

**Evidence.** The authoritative home — `api/src/modules/palette/model.ts:25-26`:

```ts
export const FLAG_REASONS = ["inappropriate", "spam", "copyright", "other"] as const;
export type FlagReason = (typeof FLAG_REASONS)[number];
```

Enforced at the wire — `api/src/modules/palette/schema.ts:70-73`:

```ts
export const flagPaletteBody = z.object({
    reason: z.enum(FLAG_REASONS),
    detail: z.string().max(500).optional(),
});
```

The hand-copy — `FlagReportDialog.vue:79-84`:

```ts
const reasons = [
    { value: "inappropriate", label: "Inappropriate content" },
    { value: "spam",          label: "Spam" },
    { value: "copyright",     label: "Copyright violation" },
    { value: "other",         label: "Other" },
];
```

Same four values, same order, zero type relationship. The widening happens twice:
`demo/palettes/types.ts:103-108` types `Flag.reason` as `string` (not `FlagReason`), and the
subject's own emit at `:76` declares `submit: [reason: string, detail: string | undefined]`.
`demo/palettes/api/palettes.ts:153-156` continues `reason: string` all the way to `fetch`.

**Mechanism.** Unique semantic ownership is violated: one concept, two homes, no link. Because both
demo-side types are `string`, a typo in the template array (or a fifth reason added server-side)
typechecks green and fails at runtime as a 400 from `z.enum`. The `detail` `maxlength="500"` at
`:33` is a third hand-copy of `z.string().max(500)` from the same schema line.

**Reproduction.** Change `"copyright"` to `"copywrite"` at `FlagReportDialog.vue:82`. `vue-tsc` →
exit 0. Clicking that radio then Report POSTs an invalid body; the API rejects with 400; the user
sees nothing (see L-6).

**Cure.** The enum's home is the API model. Export the const from a demo-visible contract module and
derive both the type and the radio list from it, so the four labels are the *only* demo-side data:

```ts
import { FLAG_REASONS, type FlagReason } from "@/palettes/contract/flags";
const REASON_LABELS: Record<FlagReason, string> = {
    inappropriate: "Inappropriate content", spam: "Spam",
    copyright: "Copyright violation",       other: "Other",
};
```

with `submit: [reason: FlagReason, detail: string | undefined]`. Adding a server-side reason then
*fails the demo build* until a label is supplied — the correct failure direction. The `500` likewise
becomes one exported constant.

---

## L-4 · a raw `<textarea>` where glass-ui ships `Textarea` — sole site in the demo — MAJOR

**Defect.** `FlagReportDialog.vue:29-34` hand-cuts a bare `<textarea>` with hand-written utility
classes. glass-ui ships a `Textarea` primitive. This is the **only** raw textarea in the demo, and
the glass primitive is used **zero** times.

**Evidence — census:**

```
$ grep -rn "<textarea" demo
demo/palettes/browser/dialog/FlagReportDialog.vue:29        ← the only hit

$ grep -rn "Textarea" demo
(no output)
```

**Evidence — the primitive exists and is reachable.**
`node_modules/@mkbabb/glass-ui/dist/forms.d.ts`:

```ts
export * from "./components/input";
export * from "./components/textarea";      ← here
export * from "./components/combobox";
export { useUserInvalidAria, … } from "./composables/dom/useUserInvalidAria";
```

`components/textarea/Textarea.vue.d.ts` types `TextareaProps` with `size`, `invalid`, `resize`
defaults and an `update:modelValue` emit. The demo **already consumes this exact subpath** —
`demo/ui/input/index.ts` is `export { Input } from "@mkbabb/glass-ui/forms";`, used by four files
(`CurrentPaletteEditor`, `AdminAuditPanel`, `AdminTagsPanel`, `SearchFilterBar`). The sibling
primitive was adopted; this one was hand-rolled beside it.

**Evidence — the hand-roll is measurably off-system.** Live computed style on the rendered textarea:

```json
{"cls":"h-20 rounded-input border border-input bg-background px-3 py-2 text-small resize-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
 "w":398,"h":80,"radius":"4px","bg":"rgb(251, 250, 248)","border":"rgb(198, 180, 159)",
 "ariaLabel":null,"labelledby":null,"id":""}
```

`ariaLabel: null`, `labelledby: null`, `id: ""` — **the control has no accessible name at all**.
Its only description is a placeholder, which assistive tech does not treat as a name and which
vanishes on first keystroke. In the screenshot it also reads as a flat opaque slab against the glass
dialog around it — it never receives the `glass-wash` / surface treatment its neighbours get,
because it is not a glass component.

**Mechanism.** Edict #4: glass-ui is the design system; primitives belong there. Field anatomy —
ground, radius, border token, invalid state, focus ring, accessible name — is exactly what a design
system exists to own once. Hand-cutting it re-derives six decisions per site and, as measured here,
silently drops one of them (the name).

**Reproduction.** Mount the dialog; `document.querySelector('[role=dialog] textarea')` →
`getAttribute('aria-label')` is `null`, `id` is `""`, and no `<label>` points at it (the four
`<label for>` elements all target radios).

**Cure.** `import { Textarea } from "@mkbabb/glass-ui/forms"` and delete the class string. Pair it
with glass-ui's `LabeledField` (subpath `./labeled-field`, already published) so the "Additional
details" name is structural rather than placeholder-only. Both the radius drift (L-8) and the
missing name disappear as a consequence, not as separate fixes.

---

## L-5 · `submitting` is owned by the wrong module — the spinner is unreachable code — MAJOR

**Defect.** The dialog owns a loading flag for work it does not perform. The parent performs the
async call; the dialog's flag is set and cleared inside one synchronous block, so the spinner at
`:46` can never render.

**Evidence — the code.** `FlagReportDialog.vue:90-100`:

```ts
async function onSubmit() {
    if (!reason.value) return;
    submitting.value = true;
    try {
        emit("submit", reason.value, detail.value.trim() || undefined);   // ← synchronous
    } finally {
        submitting.value = false;                                          // ← same tick
        reason.value = ""; detail.value = "";
    }
}
```

There is no `await` inside the `try`. Vue emits invoke listeners synchronously; the parent's
`async onFlagSubmit` (`BrowsePane.vue:296-300`) returns a promise that `emit` discards. So
`submitting` is `true` for zero rendered frames — Vue batches renders to the microtask queue and the
flag is already `false` by then.

**Evidence — measured, four sampling phases across a real submit:**

```json
{"emitted":[["submit","spam",null]],
 "spinnerTimeline":[{"phase":"sync-after-click","spin":false,"dt":0.2},
                    {"phase":"microtask","spin":false},
                    {"phase":"raf","spin":false},
                    {"phase":"+300ms","spin":false}]}
```

`.animate-spin` is absent at every phase. The `Loader2` import at `:66` and its render at `:46` are
dead code.

**Mechanism.** State placed in the module that does not own the operation. The in-flight condition
belongs to whoever holds the promise — `BrowsePane`. Compounding it, glass-ui's `Button` **already
owns this affordance**: `ButtonProps.loading` is documented in `Button.vue.d.ts:16` as "Marks an
in-flight command and suppresses activation until it settles." The component re-implemented, with a
manual icon and a manual `:disabled`, a primitive the design system ships — and the
re-implementation does not work.

**Second-order defect.** The same `finally` clears `reason`/`detail` **before** the parent's request
resolves. If the POST fails, the dialog's selection is already wiped and its Report button is
disabled by `!reason` at `:43`. The user is left holding an emptied form.

**Reproduction.** Mount, select Spam, click Report, poll `.animate-spin` at sync / microtask / rAF /
+300 ms — `false` at all four (pasted above).

**Cure.** Delete `submitting`, the `Loader2` import, the `try/finally`, and the `async`. Make the
emit's contract awaitable and let the host own the flag:

```ts
const emit = defineEmits<{ submit: [reason: FlagReason, detail?: string] }>();
```

and in `BrowsePane`, hold a `reportPending` ref, bind `<Button :loading="reportPending">`, and clear
the form only on success. Net: −10 lines in the dialog, one dead import gone, and the affordance
actually works because glass-ui implements it.

---

## L-6 · the failure path has no owner — a failed report closes the dialog like a success — MAJOR

**Defect.** A failed moderation report is swallowed to `console.warn` and the dialog closes exactly
as it does on success. No module owns the error surface, and this violates a precept the codebase
has already ruled.

**Evidence.** `demo/palettes/useAdminFlagged.ts:119-131`:

```ts
/** User-facing flag/report — no admin token required. */
async function report(paletteSlug: string, reason: string, detail?: string)
    : Promise<{ flagged: boolean } | undefined> {
    try { return await flagPalette(paletteSlug, reason, detail); }
    catch (e) { console.warn("Failed to flag palette:", e); return undefined; }
}
```

`BrowsePane.vue:296-300` — the host never inspects the result:

```ts
async function onFlagSubmit(reason: string, detail: string | undefined) {
    if (!flagPalette.value) return;
    await pm.flagged.report(flagPalette.value.slug, reason, detail);   // resolves undefined on failure
    flagDialogOpen.value = false;                                       // closes regardless
}
```

Because `report` swallows, the `await` never rejects, so `flagDialogOpen = false` always runs.
Success and failure are indistinguishable to the user.

**Evidence — the precept already exists.** The composable sitting in the *same barrel*,
`useDialogBrowseActions.ts:39-46`, records the ruling verbatim:

> F2: host-supplied surface for a failed fork. … When absent (the dialog host today), a fork failure
> logs — **never a silent swallow on the pane path.**

and implements it (`onForkError` at `:71-75`). The flag path is the identical shape — a
user-triggered remote mutation on the pane — and did not receive the same treatment.

**Mechanism.** The error surface is a concept with **no home**: `report()` decided unilaterally to
swallow, so the host cannot observe failure even if it wanted to. Ownership was resolved by the
lowest layer discarding information the upper layer needed.

**Reproduction.** Stop the API (or `page.route('**/flag', r => r.abort())`), open the dialog, select
a reason, click Report. The dialog closes; the only trace is a `console.warn`. The palette is not
flagged.

**Cure.** Stop swallowing in `report()` — let it reject. Give `onFlagSubmit` the same
`onForkError`-shaped feedback surface F2 already established, routing onto the palette card's
`showFeedback` exactly as `onSave` / `onDeleteOwned` / `onFork` do, and close the dialog only on
success. This is applying an existing ruled pattern to the one path that missed it, not inventing a
mechanism.

---

## L-7 · `tsconfig.demo.json#paths` and `package.json#exports` have drifted — three phantom subpaths — MAJOR

**Defect.** The type-resolution map and the runtime export map disagree. Three declared paths point
at files that **do not exist**; two real exports have no path entry. This is the "false proof of the
public API" hazard in its exact form.

**Evidence.** Programmatic diff of the two maps:

```
$ python3 - <<'EOF'  (exports keys vs tsconfig paths keys, normalised)
exports  : ['./color', './css', './easing', './math', './quantize', './transform', './value']
tsconfig : ['.', './color', './easing', './math', './parsing', './quantize', './transform', './units']
PHANTOM (typecheck-only, no runtime export): ['.', './parsing', './units']
UNTYPED  (runtime export, no tsconfig path) : ['./css', './value']
EOF

$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory

$ ls src/subpaths/
color.ts  css.ts  easing.ts  math.ts  quantize.ts  transform.ts  value.ts   ← no parsing.ts, no units.ts
```

**Mechanism.** `vite.config.ts:37-47` **generates** its alias set from `package.json#exports`, with a
comment explicitly stating the intent: "GENERATED (not hand-rolled) so the alias set can never drift
from the exports map". `tsconfig.demo.json#paths` is hand-rolled and received no such treatment — so
the runtime map is derived and the type map is copied, and the copy rotted. The drift is one-way
dangerous: a demo file importing `@mkbabb/value.js/parsing` or the bare `@mkbabb/value.js` root would
resolve types against a stale mapping and fail at bundle time, while *proving nothing* about the
published surface. `package.json#exports` has **no `"."` key at all**, so the bare specifier is not
importable by any real consumer, yet `tsconfig` maps it.

**Reproduction — labelled as latent, not live.** Current demo usage is clean:
`grep -rhn '@mkbabb/value.js[^"]*' demo -o | sort | uniq -c` yields only `/color`, `/css`, `/math`,
`/easing`, `/quantize` — all genuine exports. The subject imports no value.js at all. So this is a
**loaded trap, not a present break**: the first file to write `@mkbabb/value.js/units` gets a green
typecheck and a broken build.

**Cure.** Delete the hand-rolled `paths` block and generate it from `package.json#exports` by the
same mechanism `vite.config.ts` already uses — one source of truth for both maps. The three phantom
entries go away by construction, and `./css` / `./value` gain the coverage they lack.

---

## L-8 · `--radius-input` is 4 px; `DESIGN.md` asserts 8 px — MINOR

**Defect.** The demo's token authority states a value the token does not hold.

**Evidence.** `demo/DESIGN.md:195`:

> `rounded-input` (= `--radius-input` = 8 px) — text inputs.

Measured live on `document.documentElement`:

```json
{"radiusInputVar":"0.25rem","radiusVar":"0.25rem","taRadius":"4px"}
```

`0.25rem` = **4 px**, and the rendered textarea confirms `border-radius: 4px`. `grep -rn radius-input
demo/styles/` returns nothing — the token is not defined in the demo's own stylesheet, so it is
inheriting from glass-ui's `--radius` (also `0.25rem`), which means the demo has no independent
input radius at all.

**Mechanism.** A doc asserting a numeric token value, with no test binding the two, drifts the moment
the producer changes its default. Downstream: `DEFECT-LEDGER.md:72804` reasons about this surface
using the stale 8 px figure, so the bad number has already propagated into audit findings.

**Reproduction.** `getComputedStyle(document.documentElement).getPropertyValue('--radius-input')` →
`0.25rem`, against `DESIGN.md:195`'s "8 px".

**Cure.** DESIGN.md should name tokens, not transcribe their values — `rounded-input` (=
`--radius-input`) — so there is nothing to drift. If the 8 px was the *intent*, define
`--radius-input: 0.5rem` in `demo/styles/` and the doc becomes true again.

---

## L-9 · `useDialogBrowseActions` is homed under `dialog/` but its only consumer is not a dialog — MAJOR

**Defect.** A host-agnostic browse-actions composable lives inside the dialog cluster and is
re-exported from the dialog barrel. Its sole live consumer is `BrowsePane` — a pane, not a dialog —
which must import pane logic *from* `./browser/dialog`.

**Evidence.**

```
$ grep -rn "useDialogBrowseActions" demo
demo/palettes/BrowsePane.vue:199         import { useDialogBrowseActions } from "./browser/dialog";
demo/palettes/BrowsePane.vue:261         } = useDialogBrowseActions({
demo/palettes/browser/index.ts:41        useDialogBrowseActions,
demo/palettes/browser/dialog/index.ts:9  export { useDialogBrowseActions } from "./composables/useDialogBrowseActions";
demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:48
demo/palettes/useVersionHistory.ts:10    // cites `palette-browser/PaletteDialog/composables/…` ← path no longer exists
```

Its own docstring at `:2` says **"host-agnostic** fork + revert + browse-filter wiring", and `:48-56`
confirms it takes `pm` and an optional `modalStack` precisely so it needs no dialog context. Its
name and its address are both residue of a deleted host (`PaletteDialog.vue`), and
`useVersionHistory.ts:10` still cites that dead path.

**Mechanism.** The module lattice encodes history rather than dependency. `dialog/index.ts` is
documented as "palette-browser · dialog cluster — hardened public surface"; shipping a
browse-filter composable through it makes the cluster's name a lie and forces a pane→dialog edge
that the dependency graph does not actually require. It also widens the eager-chunk surface —
`DEFECT-LEDGER.md:13805` records `App.vue:176 → ../palettes/browser/dialog` pulling all four barrel
members "while only `MigratePalettesDialog` is used".

**Reproduction.** `BrowsePane.vue:199` imports from `./browser/dialog`; `BrowsePane` renders no
`PaletteDialog`. Grep above shows no other consumer.

**Cure.** Move the file to `demo/palettes/useBrowseActions.ts` (sibling of `usePaletteActions.ts`,
`useBrowsePalettes.ts` — where the pane-level composables already live), rename off the dead host,
drop the re-export from `dialog/index.ts`, and fix the stale citation at `useVersionHistory.ts:10`.
The dialog barrel then exports only dialogs.

---

## L-10 · `paletteSlug` is a declared prop the component never reads — INFO

**Defect.** The component's public surface claims an input it has no use for.

**Evidence.**

```
$ grep -n "paletteSlug" demo/palettes/browser/dialog/FlagReportDialog.vue
68:const { open, paletteName, paletteSlug } = defineProps<{
71:    paletteSlug: string;
```

Two occurrences: the destructure and the type. Zero reads in template or script. The template uses
only `paletteName` (`:11`); `onSubmit` (`:90-100`) emits `reason`/`detail` only. The host already
holds the slug and uses its own copy — `BrowsePane.vue:298`
`await pm.flagged.report(flagPalette.value.slug, …)` — while still passing it in at `:171`.

**Mechanism.** A prop is a contract term. An unread required prop overstates the component's
coupling and obliges every future host to supply data that changes nothing.

**Reproduction.** The grep above: 2 hits, both declarations.

**Cure.** Delete `paletteSlug` from the props type and the destructure, and drop `:palette-slug` at
`BrowsePane.vue:171`. Under the L-5 cure the emit is already the slug-free channel, so nothing
regresses.

---

## Greenfield lattice — what I would build today

Stated concretely, no hedging. The current shape is a 101-line SFC that owns four things it should
not (a vendored enum, a hand-cut field primitive, an async flag for someone else's promise, a dead
prop) and reaches its design system through a rename table.

**1 · Delete `demo/ui/`.** Nineteen barrels, zero implementation. Import glass-ui at its published
subpaths. This is the keystone: it converts L-2's silent visual regression into a type error, and
removes 51 `../../../ui/*` hops repo-wide. It deletes a directory rather than adding one.

**2 · One contract module per domain, derived from the API model.**
`demo/palettes/contract/flags.ts` re-exports `FLAG_REASONS` / `FlagReason` / `FLAG_DETAIL_MAX` and
nothing else. `demo/palettes/types.ts` stops widening to `string`. The enum has exactly one home and
one derivation chain: `api/model.ts → contract/flags.ts → { schema, types, component }`.

**3 · The dialog becomes presentational — it owns nothing async.**

```
FlagReportDialog.vue          ~55 lines
  props:  open, paletteName
  emits:  update:open, submit:[FlagReason, string?]
  body:   glass-ui Dialog + RadioGroup + LabeledField(Textarea)
  state:  reason, detail            ← form state only; no submitting, no Loader2, no try/finally
```

The in-flight flag and the reset live in `BrowsePane`, which holds the promise;
`<Button :loading>` supplies the affordance from the design system.

**4 · Failure is a first-class return, not a `console.warn`.** `useAdminFlagged.report()` rejects;
the host routes it through the F2 feedback surface `useDialogBrowseActions` already established. One
error idiom across every user-triggered remote mutation on the pane.

**5 · Barrels name what they contain.** `browser/dialog/` exports dialogs.
`useDialogBrowseActions` → `demo/palettes/useBrowseActions.ts`, alongside the other pane composables.

**6 · Generate `tsconfig#paths` from `package.json#exports`,** exactly as `vite.config.ts:37-47`
already generates its alias set. Two maps, one source; the phantom `.` / `./parsing` / `./units`
entries cease to exist by construction.

Net effect on the subject: roughly 101 → ~55 lines, one dead import removed, one dead prop removed,
four hand-copied constants replaced by one derivation, a working loading state, a visible destructive
button, a named textarea, and a failure the user can see.

---

## Findings summary

| id | severity | defect | primary evidence |
|---|---|---|---|
| L-2 | **BLOCKER** | `variant` is a dead prop; destructive button renders identical to Cancel | identical computed `bg` on both buttons; `Button.vue.d.ts:6-19` has no `variant`; `vue-tsc` exit 0 |
| L-1 | **BLOCKER** | `demo/ui/*` = 19-barrel pure alias layer; dual import path for `Dialog` | all 19 barrels are 1-line re-exports; 3 files via alias vs 2 via subpath |
| L-3 | MAJOR | `FLAG_REASONS` hand-copied from the API model, re-widened to `string` | `model.ts:25` vs `FlagReportDialog.vue:79-84` |
| L-4 | MAJOR | raw `<textarea>` where glass-ui ships `Textarea`; no accessible name | only `<textarea` in demo; `forms.d.ts` exports it; `ariaLabel:null, id:""` |
| L-5 | MAJOR | `submitting` owned by wrong module; spinner unreachable | `spin:false` at sync/microtask/rAF/+300 ms |
| L-6 | MAJOR | failed report closes dialog like a success; violates the ruled F2 precept | `useAdminFlagged.ts:119-131`; `useDialogBrowseActions.ts:39-46` |
| L-7 | MAJOR | `tsconfig#paths` vs `exports` drift — 3 phantom subpaths, files absent | map diff; `ls` → 3× No such file |
| L-9 | MAJOR | browse composable homed under `dialog/`; sole consumer is a pane | `BrowsePane.vue:199` |
| L-8 | MINOR | `DESIGN.md:195` asserts 8 px; token is `0.25rem` = 4 px | measured `--radius-input` |
| L-10 | INFO | `paletteSlug` declared, never read | grep → 2 hits, both declarations |

**Negative proofs** (checked, clean — recorded so the absence is evidence, not omission): no
feature→shell or component→boot edge; no `@src/*` or deep-`src/` import; no import of
`@mkbabb/value.js` at all, so no deep-path false proof of the public API *in this file*; edict #8
(`verbatimModuleSyntax`) has nothing to violate — zero type-only imports; no god module (the SFC is
101 lines, its host wiring is 5); no second implementation of *this* dialog anywhere in the tree
(`grep -rn FlagReportDialog demo src test e2e` → one component, one barrel, one host, two e2e specs).

## Probe log

| probe | purpose | outcome |
|---|---|---|
| `curl -s -o /dev/null -w "%{http_code}" localhost:9000` | dev server liveness | `200` |
| Playwright `/#/browse` + menu | reach the Report item | owned card only — no Report; pivoted |
| `import()` the SFC off `/@fs/…` and mount | isolate the component with controlled props | mounted; `role=dialog` present |
| `getComputedStyle` on both footer buttons | decide L-2 | identical `bg`; `variant` present as raw attr |
| 4-phase `.animate-spin` sampling across submit | decide L-5 | `false` at every phase |
| `screenshot` | decide the visual claim in L-2/L-4 | `evidence/flagreport-probe.png` |
| `vue-tsc -p tsconfig.demo.json --noEmit [--listFiles]` | decide gate blindness | exit 0; file in program |

Five browser calls total, each deciding a finding. The shared page carried concurrent seats' state
(4 tabs, a second live dialog instance); every measurement above is scoped by
`[...document.querySelectorAll('[role=dialog]')].find(d => /Shady Spam/.test(d.textContent))` to my
own mount, except the screenshot — which captured the *app's* instance and independently corroborates
L-2 on the production render path. Probe unmounted after use (`remaining: 0`).

## Scope compliance

Wrote only under `docs/tranches/V/megatranche/audit/components/FlagReportDialog/`. The Playwright
screenshot tool wrote `flagreport-probe.png` to the repo root; I moved it into
`…/FlagReportDialog/evidence/` and confirmed the root is clean. No file under `src/`, `demo/`,
`api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md` was
modified. No source edits land from this seat.
