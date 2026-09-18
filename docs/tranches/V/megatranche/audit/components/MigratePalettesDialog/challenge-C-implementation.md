# CHALLENGE-C — MigratePalettesDialog.vue · implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. No inheritance, no undeclared substitution. Receipt honoured.

- Subject: `demo/palettes/browser/dialog/MigratePalettesDialog.vue` (97 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Live probe: `http://localhost:9000` (WebKit-less Chromium via Playwright MCP), read-only except
  a `localStorage` seed that I restored afterwards.
- Screenshot evidence committed to this directory:
  `evidence-migrate-dialog-regenerate-light.png` (the dialog, live, `mode="regenerate"`, 2 local
  palettes, light theme, device scale 2).

---

## VERDICT: **DEFECTIVE**

15 findings. The component is a 97-line pure view, and taken alone it renders. But *as
implemented* — view plus the composable that is its entire behaviour (`demo/palettes/useSlugMigration.ts`)
— it is a modal that asks a consequential question, offers three buttons whose labels do not
describe what they do, can be dismissed in three ways that silently abandon the user's action,
publishes the user's data to a throwaway identity they can never recover, never reports success or
failure through any channel, and is guarded by exactly one test that has been reading a **deleted
file path** since commit `a61094e3` — a test that CI does not run.

### The owner's `Migrate*` question, answered first

> *Determine whether this is a one-shot user-facing data operation (legitimate) or a compatibility
> shim that should be RETIRED with the consumer migrated at the root.*

**RULING: legitimate by kind, defective by construction. Do NOT retire the dialog.**

It is not a back-compat shim. There is no old format, no version gate, no dual read path, no
deprecated API being bridged. It is a *disposition prompt at an identity boundary*: the user is
about to change who they are (switch slug / regenerate slug) and holds N browser-local palettes.
Asking is correct product behaviour; `feedback_no_backwards_compat` is not engaged by its
existence.

**But the flow it fronts does contain a real edict-2 violation** — a second, weaker, divergent
implementation of "publish a local palette" (`publishAllLocal`) living beside the canonical one
(`usePaletteActions.onPublish`). That dual path is what must be retired, not the dialog. See C-4.

And the *premise the dialog states is false*, which is the deeper problem: local palettes are
**device-scoped, not account-scoped**. Nothing in the codebase clears `localStorage["color-palettes"]`
on login, logout, or regenerate (proof in C-6). The palettes are in no danger at all. The dialog
interrupts a flow to solve a problem that does not exist, and its third button is labelled for a
destruction that never happens.

---

## Evidence conventions

`file:line` for source. Pasted shell output for commands. Numbers from the live page are labelled
MEASURED. Anything I could not execute is labelled **HYPOTHESIS** and says so in its own sentence.

---

## C-1 · MAJOR — Escape / X / outside-click close the dialog and **silently abandon the user's action**. Zero network, zero feedback, zero record.

**File:** `demo/palettes/browser/dialog/MigratePalettesDialog.vue:2,58,69-72` ·
`demo/palettes/useSlugMigration.ts:91-104`

The component declares `open` as a two-way model and emits `respond` from exactly three places —
the three buttons (lines 18, 26, 34). Every *other* way the dialog can close emits nothing:

- reka-ui `DialogRoot` Escape handling (default on),
- outside pointer-down (default on),
- the glass-ui close button, which `DialogContent` renders by default —
  `node_modules/@mkbabb/glass-ui/dist/dialog-TNRDkcE4.js`: `showClose: { type: Boolean, default: !0 }`.

The caller has already committed to the action before the dialog opens: `onRegenerateSlug`
(`useSlugMigration.ts:91`) parks the whole operation in `pendingMigrateAction` and returns. If
`respond` never fires, `onMigrateRespond` never runs, the closure is never invoked, and **the slug
regeneration the user asked for simply does not happen** — with no error, no toast, no console
line, nothing.

### Reproduction (MEASURED, live, this session)

```js
// 1 · seed two local palettes, hard reload
localStorage.setItem('color-palettes', JSON.stringify({version:1, palettes:[…2 local…]}));
location.reload();

// 2 · fire the production handler (SlugEditLayer.vue:107 → pm.onRegenerateSlug())
document.querySelector('button[aria-label="Generate new slug"]').click();
// → { storeCount: 2,
//     dialogText: "What about your palettes?\n\nYou have 2 local palettes. What would you like
//                  to do before regenerating your slug?\n\nPublish, then regenerate\n
//                  Just regenerate\nClose" }

// 3 · instrument fetch, then press Escape
window.__net = []; const of = window.fetch;
window.fetch = function(...a){ window.__net.push(String(a[0])); return of.apply(this,a); };
```
Playwright `page.keyboard.press('Escape')`, then:
```
{
  "dialogOpen": false,
  "slugAfter": null,          // slug UNCHANGED — regenerate never ran
  "fetches": [],              // ZERO network requests
  "activeEl": "BODY",         // focus dropped to the document body
  "errorText": [],            // no "failed" / "error" text anywhere in the DOM
  "storeCount": 2
}
```

The user pressed a button labelled *Generate new slug*, was asked a question, pressed Escape, and
the application did nothing and said nothing. There is no state in which the user learns their
request was dropped.

**Mechanism.** A modal that gates a committed side effect must treat *dismissal* as a member of the
response domain. Here the response domain (`MigrateChoice`) has no `cancel` member and the `open`
model has no `false` handler, so dismissal falls through a hole in the contract.

**Secondary, same hole:** `pendingMigrateAction` is left non-null after a dismissal
(`useSlugMigration.ts:107-108` only nulls it inside `onMigrateRespond`). The closure — which
captures the target slug string — survives until the next `onSlugSwitch`/`onRegenerateSlug`
overwrites it. Harmless today only because nothing else reads it; it is a live latch left armed.

**Cure (gestalt, not patch).** Make dismissal a first-class answer. `MigrateChoice` becomes
`"publish" | "transfer" | "discard" | "cancel"`; the component wires
`@update:open="v => { if (!v) onRespond('cancel') }"` so *every* close path funnels through one
emit; `onMigrateRespond` clears the latch on `cancel` and the slug bar returns to its pre-flight
state. One exit, no hole.

---

## C-2 · MAJOR — "Publish, then …" can publish every local palette to a **throwaway identity the user never sees and can never recover**. The `ensureUser` dependency was wired for exactly this and is never called.

**File:** `demo/palettes/useSlugMigration.ts:15,32-49` vs. `demo/palettes/usePaletteActions.ts:40-58`

```
$ grep -n "deps\." demo/palettes/useSlugMigration.ts
22:        const fn = deps.setActiveTab;
24:        else deps.activeTab.value = tab;
35:            for (const palette of deps.savedPalettes.value) {
53:            deps.clearUserSlug();
54:            deps.adminLogin(value);
59:        if (deps.savedPalettes.value.length > 0) {
65:                await deps.userLogin(value);
75:            await deps.userLogin(value);
92:        if (deps.savedPalettes.value.length > 0) {
98:            await deps.userRegenerate();
102:            await deps.userRegenerate();
```

`deps.ensureUser` (declared `useSlugMigration.ts:15`) and `deps.userLogout` (line 11) appear in the
dependency contract and **appear nowhere in the body**. `publishAllLocal` calls only
`session.ensureSession()` (line 34).

The two calls are not interchangeable:

| | `usePaletteActions.onPublish` (canonical) | `useSlugMigration.publishAllLocal` (this dialog) |
|---|---|---|
| identity | `await ensureUser()` — **persists the slug** (`useUserAuth.ts:73` → `persist(slug, token)` writes `palette-user-slug`) | `session.ensureSession()` only |
| on no token | n/a — user exists first | `useSession.ts:36-38` mints a session via `createSession()` and `persistToken(res.token, **false**)` → sessionStorage; **the returned `userSlug` is discarded** |
| errors | returns `{ success, message }`, surfaced by the caller | per-palette `catch {}` (line 42), outer `console.warn` (line 47) |

And `POST /sessions` is **not** an anonymous handshake — it registers a user:
`api/src/modules/session/routes.ts:32` → `registerSession(...)`, and
`useUserAuth.register()` reads `res.userSlug` off exactly that response
(`demo/platform/auth/useUserAuth.ts:66-74`).

So for a visitor with local palettes and no slug, "Publish, then regenerate" does:
`ensureSession()` → **server mints a brand-new user**, client keeps the token in sessionStorage and
throws the slug away → N palettes are POSTed under that ghost slug → `userRegenerate()`
(`useUserAuth.ts:112`) deletes that session and registers a *different* user. The palettes are now
public, owned by an identity that exists only in a discarded HTTP response.

### That state is reachable and I measured it

At the moment the dialog was open with two local palettes, live:

```
{ "before": { "slug": null, "dialogOpen": true, "active": "Publish, then regenerate" } }
```
`localStorage["palette-user-slug"] === null` **and** the primary button is focused and armed. I did
not click it — clicking would write to the real API, outside this seat's read-only remit. The
consequence chain after the click is read from source, not executed; I label the *consequence*
CONFIRMED-BY-CODE and the *precondition* MEASURED.

**Cure.** Delete `publishAllLocal` and call the canonical `onPublish` (C-4). It calls `ensureUser()`
first, by construction. Failing that: `await deps.ensureUser()` at the head of `publishAllLocal` —
the dependency is already injected and already unused.

---

## C-3 · MAJOR — the publish is **not idempotent, transitions no state, and reports nothing**. Choosing "Publish" twice is silently a no-op; choosing it once re-arms the same dialog forever.

**File:** `demo/palettes/useSlugMigration.ts:32-49` · `demo/palettes/usePaletteStore.ts:51-55`

`publishAllLocal` POSTs each palette and **never touches the local store**: no
`updatePalette(id, { isLocal: false })`, no `deletePalette`. But "saved/local" is defined *by that
flag*:

```ts
// demo/palettes/usePaletteStore.ts:51
const savedPalettes = computed(() =>
    getStore().value.palettes.filter(
        (p): p is Palette & { id: string } => p.isLocal && p.id != null,
    ),
);
```

Consequences, all from source:

1. After a successful publish the count is unchanged, so the very next switch/regenerate re-opens
   this dialog with the identical `count` and the identical question. The dialog can never be
   satisfied.
2. Re-publishing collides. `slug` is **globally unique across all users**:
   `api/src/platform/db/db.ts:41` — `db.collection("palettes").createIndex({ slug: 1 }, { unique: true })`.
   The duplicate-key path is `api/src/modules/palette/service/crud.ts:133-137` → `ConflictError`
   (409). The client swallows it: `useSlugMigration.ts:42` `} catch { // Skip failures (e.g. duplicate slugs) }`.
3. The same 409 fires on the **first** attempt whenever the palette's name-derived slug is already
   taken by any user anywhere — `createSlug(name)` on "Sunset" is `sunset`. Silently skipped.
4. No success channel either. `onMigrateRespond` (line 106-116) returns `void` and its only failure
   handling is `console.warn("Migration action failed:", e?.message)`.

Compound with C-1's flow: choose "Publish, then switch" with a slug that 404s → the palettes are
published to the *old* account, `userLogin` throws, the throw is caught at line 112 and
`console.warn`ed, the user remains signed in as before and **is told nothing**. A partial,
irreversible, invisible completion.

**Cure.** One publish verb that returns a result; the caller flips `isLocal` on success (or the
store adopts the server row), surfaces a count of published/skipped/failed, and treats the dialog
as satisfied only when the local set is empty.

---

## C-4 · MAJOR — dual publish path. `publishAllLocal` is a second, weaker implementation of `onPublish`. This is the edict-2 ("no dual paths") violation in this flow.

**File:** `demo/palettes/useSlugMigration.ts:32-49` and `demo/palettes/usePaletteActions.ts:40-58`

Both call `createAndSavePalette({name, slug, colors})`. One (`onPublish`) establishes identity,
distinguishes session failure from publish failure, and returns a typed result the UI renders. The
other drops identity (C-2), collapses both failure classes into `catch {}` (C-3), and returns
`void`. The dialog's primary action runs the weaker one.

This is precisely the shape `feedback_no_backwards_compat` and "no god modules / focused modules
with real encapsulation" forbid: a divergent copy that quietly loses invariants the original holds.

**Cure.** `useSlugMigration` takes `publish: (p: Palette) => Promise<Result>` as a dependency —
the same function `usePaletteActions` exposes — and maps it over the local set. `publishAllLocal`
is deleted. The unused `ensureUser`/`userLogout` deps go with it.

---

## C-5 · MAJOR — vacuous gate. The **only** test that names this component has been reading a deleted path since `a61094e3`, and CI never runs it.

**File:** `e2e/smoke/oracles/o10d-display-voice-census.spec.ts:448-471`

```ts
const sfc = readFileSync(fileURLToPath(new URL(
    "../../../demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue",
    import.meta.url)), "utf8");
```

```
$ node --input-type=module -e "…resolve that exact URL…"
resolves to: /Users/mkbabb/Programming/value.js/demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue
THROWS: ENOENT

$ ls /Users/mkbabb/Programming/value.js/demo/@
ls: /Users/mkbabb/Programming/value.js/demo/@: No such file or directory

$ git log --oneline --diff-filter=D -1 -- 'demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue'
a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)
```

The `readFileSync` is at the top of the test body, so the test does not skip — it **errors**. Nobody
noticed because the e2e suite is not in CI:

```
$ grep -n "run:" -A2 .github/workflows/ci.yml
32: - run: npm ci
33: - run: npm run lint
34: - run: npx vue-tsc -p tsconfig.lib.json --noEmit
35: - run: npx vue-tsc -p tsconfig.demo.json --noEmit
36: - run: npm run build
37: - run: npm test
50: - run: node scripts/ci/verify-packed-surface.mjs …
70: - run: npx tsc --noEmit      (api job)
71: - run: npm test              (api job)
```
No `playwright` step in either job. (I did not execute the spec: `playwright.config.ts`'s second
`webServer` builds `dist/gh-pages` when absent, a multi-minute cost, and the ENOENT is deterministic
and already proven above.)

Unit coverage is zero:
```
$ find demo/test -type f
demo/test/glass/aurora-bracket.test.ts
demo/test/glass/aurora-motion.test.ts
demo/test/export/byte-exact.test.ts
```
(`demo/test/palettes/api/` exists and is **empty**; `vite.config.ts:21` includes `demo/test/**/*.ts`.)

**The exact mutations that keep the suite green** — every one of them:
- delete the `v-if="mode === 'switch'"` transfer button entirely;
- swap the `publish` and `discard` emit arguments so the buttons do each other's jobs;
- delete the `emit("respond", choice)` line so no button does anything;
- hard-code `count` to `1`;
- invert every `mode === "switch"` ternary.

The single surviving assertion greps *one line* of the file for `font-display` and `font-medium`. It
is a typography byte-check, not a behaviour gate.

**Cure.** A `demo/test/palettes/useSlugMigration.test.ts` that drives the composable with a fake
transport and asserts the contract: dismissal cancels and clears the latch; publish flips `isLocal`;
a 409 is reported not swallowed; regenerate never publishes to an unpersisted identity. Then fix
o10d's path or delete it — a census oracle that has pointed at a deleted tree for a whole tranche is
worse than no oracle, because it reads as coverage.

---

## C-6 · MINOR — "discard" discards nothing; the dialog's stated premise is false.

**File:** `MigratePalettesDialog.vue:34,94-96` · `useSlugMigration.ts:61-70,94-99`

`choice === "discard"` reaches `pendingMigrateAction` and takes the branch that simply *skips the
publish*: switch mode → `userLogin(value); setActiveTab("saved")`; regenerate mode → `userRegenerate()`.
Nothing is deleted. Nothing is even marked.

And nothing else in the tree clears the store on an identity change:
```
$ grep -rn "color-palettes\|store.value.palettes = " demo/ | grep -v node_modules
demo/palettes/usePaletteStore.ts:6:const STORAGE_KEY = "color-palettes";
demo/palettes/usePaletteStore.ts:166:    store.value.palettes = reordered;   ← reorder only
```
`clearAuth()` (`useUserAuth.ts:44-48`) touches `palette-user-slug` and the token. Not the palettes.

MEASURED confirmation: after the full open-then-Escape cycle above, `storeCount: 2`, unchanged.

So the copy — *"You have 2 local palettes. What would you like to do before regenerating your slug?"*
— implies a decision point that does not exist. The honest question is "do you also want to publish
these before you change identity?", which is a checkbox, not a three-way modal.

Also at `MigratePalettesDialog.vue:74-78`:
```ts
const title = computed(() =>
    mode === "switch"
        ? "What about your palettes?"
        : "What about your palettes?",
);
```
Both branches are byte-identical. A `computed` with a dead dependency and a dead ternary — either
the two modes were meant to differ and the second string was never written, or the ternary is
noise. Either way it is a `computed` that can be a string constant.

---

## C-7 · MINOR — `transfer` is unimplemented in `regenerate` mode. Only a template `v-if` stands between the user and a silent no-op.

**File:** `MigratePalettesDialog.vue:22-30,56` · `useSlugMigration.ts:94-99`

The emitted type is `MigrateChoice = "publish" | "transfer" | "discard"` — mode-independent. The
regenerate action handles two of the three:

```ts
pendingMigrateAction.value = async (choice) => {
    if (choice === "publish") { await publishAllLocal(); }
    await deps.userRegenerate();          // "transfer" lands here == "discard"
};
```

If `transfer` ever reaches it, the palettes are silently not transferred. The only guard is
`v-if="mode === 'switch'"` in the template. A type that admits states the handler cannot serve,
policed by a render condition, is a latent correctness hole — and it is also a **product gap**:
`transfer` (publish *after* the identity change, `useSlugMigration.ts:66-68`) is exactly what a user
regenerating their slug wants, and it is the one mode where it is unavailable.

**Cure.** Type the choice per mode (`type SwitchChoice = …; type RegenChoice = …`) or implement
transfer for regenerate. Do not leave a v-if as the type system.

---

## C-8 · MINOR — accessibility: 16×16 close target; no `aria-live`/`aria-busy` for a multi-second async operation; no pending state on any button.

**MEASURED**, live, dialog open:

```
{ "aria": { "labelledby": "reka-dialog-title-v-145",
            "describedby": "reka-dialog-description-v-146" },
  "box": { "w": 384, "h": 238 },
  "btns": [ { "t": "Publish, then regenerate", "w": 334, "h": 40 },
            { "t": "Just regenerate",          "w": 334, "h": 40 },
            { "t": "Close",                    "w": 16,  "h": 16 } ],
  "focused": "Publish, then regenerate" }
```

- The **close button measures 16×16 CSS px with zero padding** —
  `computedStyle.padding === "0px 0px 0px 0px"`. WCAG 2.2 SC 2.5.8 minimum is 24×24. This is this
  component's contribution to the audit's `smallTapTargets` class (`REPORT.md:31` — 60 across the
  matrix). Origin is the glass-ui root (`dialog-TNRDkcE4.js`: the `DialogClose` carries only
  `absolute right-… top-… rounded-sm opacity-70` around a `w-4 h-4` icon), so the fix belongs in
  glass-ui per edict 4 — but the demo mounts it by taking `showClose`'s default.
- Title/description wiring is correct (reka-ui `aria-labelledby`/`aria-describedby` both present),
  and initial focus lands on the primary button. Those are sound.
- **Nothing announces the outcome.** Every button closes the dialog instantly
  (`MigratePalettesDialog.vue:70`) while `publishAllLocal` then runs *N sequential* `await`ed POSTs
  plus a login/regenerate round-trip. There is no `aria-live` region, no `aria-busy`, no spinner,
  no disabled state, no toast — for a screen-reader user the interaction ends in silence, and for
  everyone else it ends in silence too (C-1/C-3).
- Focus after close measured `document.activeElement === BODY`. **Caveat, honestly stated:** I
  triggered the dialog by invoking the production click handler programmatically, so reka-ui had no
  genuine focus origin to restore — this specific measurement is contaminated and I do not claim it
  as proof. The *structural* defect underneath is provable by reading:
  `demo/shell/dock/layers/SlugEditLayer.vue:107` is `@click="slugEditMode = false; pm.onRegenerateSlug()"`
  — the trigger hides its own layer in the same handler that opens the dialog, so whatever element
  reka-ui restores focus to is already hidden by the time the dialog closes. Focus restoration
  cannot succeed by construction.

---

## C-9 · MINOR — measured contrast failure on the description: **3.63 : 1** against 4.5 : 1 required.

Decoded from the live screenshot (`evidence-migrate-dialog-regenerate-light.png`, 768×480 device px
= 384×240 CSS at DPR 2), sampling the description band and taking the *lightest* background pixel
present — which biases the number **in the component's favour**:

```
$ node px.js evidence-migrate-dialog-regenerate-light.png "DESCRIPTION,110,200,90,540"
DESCRIPTION darkest [112, 89, 66]  lightest [210, 188, 183]  CR 3.63
```
(`px.js` = a throwaway zlib/PNG-unfilter decoder written to this session's scratchpad; it inflates
the IDAT stream, un-filters the scanlines, and reports the min/max WCAG relative luminance in a
band. The band `y∈[110,200)` device px = CSS y 55–100 = the two description lines; that the darkest
pixel in it is exactly the description's own computed `rgb(112,89,66)` confirms the band placement.)

`rgb(112,89,66)` is the authoritative computed colour of the `DialogDescription`
(`getComputedStyle(...).color === "rgb(112, 89, 66)"`, and `--muted-foreground` resolves
`light-dark(hsl(30 22% 40%), hsl(34 14% 62%))`). The text is `text-small` — normal-size text, so
4.5:1 applies, not 3:1.

The mechanism is structural, not a token choice: the dialog surface is
`oklab(0.903549 0.0153586 0.0142464 / 0.705088)` with `backdrop-filter: blur(11px) saturate(1.6)` —
**70% opaque over whatever the app is rendering behind it**. In my capture that was the pink accent
plate. The composited background is unbounded, so no fixed foreground token can guarantee AA.

---

## C-10 · MINOR — the per-instance `text-muted-foreground` on the tertiary button is **inert**. Measured. Edict-5 violation that also fails to achieve its own intent.

**File:** `MigratePalettesDialog.vue:33`

```
ghostClass:        "button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover
                    cursor-pointer font-display justify-start gap-2 text-muted-foreground rounded-full"
ghostColor:        "rgb(0, 0, 0)"      ← the button carrying text-muted-foreground
probeMutedColor:   "rgb(112, 89, 66)"  ← a bare <span class="text-muted-foreground"> injected into
                                          the same dialog, same computed-style call
publishColor:      "rgb(0, 0, 0)"      ← the PRIMARY button
```

The utility is overridden by the glass-ui `Button` root's own colour rule. The dismissive action
therefore renders with **exactly the same label colour as the primary action** — visible in
`evidence-migrate-dialog-regenerate-light.png`: two identically-weighted black serif labels, the
only distinction a thin pink ring on the first. The intended hierarchy does not exist.

This is the textbook demonstration of why the owner's rule is *style at the root*: the
per-instance override silently lost, and nothing failed loudly.

---

## C-11 · INFO — `rounded-dialog` on line 3 is redundant; glass-ui's root already applies it.

**File:** `MigratePalettesDialog.vue:3` — `<DialogContent class="rounded-dialog max-w-sm">`

```
node_modules/@mkbabb/glass-ui/dist/dialog-TNRDkcE4.js
  X = a(() => e(t("floating"), "rounded-dialog"))     // cn(surface("floating"), "rounded-dialog")
```
Corroborated by this repo's own record: `docs/tranches/A/research/Ad-interactive-states.md:199` —
"glass-ui `DialogContent` already composes `rounded-dialog`". Dead class, second instance of the
edict-5 pattern in a 97-line file.

---

## C-12 · INFO — `export type MigrateChoice` is dead surface, and its union is hand-copied three times.

`MigratePalettesDialog.vue:56` exports the type. (Legal in `<script setup>` — the compiler exempts
type-only exports: `@vue/compiler-sfc` guards with `node.type === "ExportNamedDeclaration" &&
node.exportKind !== "type"`. Not a build error.)

Nobody imports it — `grep -rn "MigrateChoice" demo src test e2e api` returns only the four lines
inside the component itself — and the barrel (`dialog/index.ts:6-9`) does not re-export it. Meanwhile
the identical union is retyped by hand at `useSlugMigration.ts:29` and `:106`. Three declarations of
one domain, none of them the source of truth.

---

## C-13 · INFO — two prominent comments assert a build configuration that `package.json` contradicts.

`demo/color-picker/App.vue:170-175` and `demo/palettes/browser/dialog/index.ts:2-5` both state that
"the root `package.json` marks `./demo/**` side-effecting" and that this defeats tree-shaking of the
sibling dialogs.

```
$ grep -n "sideEffects" -A4 -B2 package.json
19-    "type": "module",
20:    "sideEffects": false,
```
There is no `./demo/**` mark. The comments document a build state that no longer exists — stale
scaffolding that will mislead the next reader into preserving a workaround for a solved problem.
**HYPOTHESIS** (not executed): whether the eager `App.vue` chunk still drags
`FlagReportDialog`/`VersionHistoryDrawer` through the barrel is a build-output question I did not
answer, because there is no `dist/` in the tree and building it was out of proportion to the
finding.

---

## C-14 · MINOR — the flow's error channel is **dead code**. `slugBarRef` is never bound; `PaletteSlugBar.vue` is never mounted.

```
$ grep -rn "PaletteSlugBar\|slugBarRef" demo/ | grep -v node_modules
demo/palettes/browser/index.ts:44:      export { PaletteSlugBar } from "./slug";
demo/palettes/useSlugMigration.ts:6:    import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:   const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/useSlugMigration.ts:84:   if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
demo/palettes/useSlugMigration.ts:85:   else if (status === 404) slugBarRef.value?.setError("Slug not found.");
demo/palettes/useSlugMigration.ts:86:   else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
demo/palettes/useSlugMigration.ts:87:   else slugBarRef.value?.setError(…);
demo/palettes/browser/slug/index.ts:3: export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
```

No `<PaletteSlugBar` anywhere. The live slug UI is `demo/shell/dock/layers/SlugEditLayer.vue` —
confirmed live: the buttons present in the DOM are `aria-label="Switch to slug"` and
`aria-label="Generate new slug"` (SlugEditLayer.vue:94,106), **not** PaletteSlugBar's
`"Account menu"` / `"Sign in with slug"`.

So `slugBarRef.value` is permanently `null` and all four `setError` calls — the entire authored
error copy for 409/404/429 — are unreachable no-ops. The dedicated S.W2 fix at
`useSlugMigration.ts:78-82` ("branch on the typed `ApiProblem.status` … so those branches matched
nothing and the authored copy below never showed") repaired the *predicate* of a branch whose
*consequent* cannot render.

And the live caller does not await either: `SlugEditLayer.vue:54` calls
`pm.onSlugSwitch(...)` with no `await`, so its own `catch` at line 57 can never see the composable's
failure. There is no path by which "Slug not found." reaches a user.

`PaletteSlugBar.vue` itself (244 lines) is an orphaned duplicate of SlugEditLayer — same
`looksLikeSlug`, same `normalizeTokenInput`, same 409/404/429 mapping. Dead code and a dual path,
edict-2.

---

## C-15 · INFO — `publishAllLocal` serialises its POSTs.

`useSlugMigration.ts:35-45` awaits inside a `for` loop: N palettes = N sequential round-trips, all
of them behind a dialog that has already closed and shows no progress. At a 100 ms RTT a user with
30 local palettes waits 3 s in complete silence before their account switch even begins. Bounded
concurrency (or a batch endpoint) is the idiomatic shape; the ordering carries no semantics.

---

## Negative results — what I attacked and found SOUND

These are the hazards this seat is charged with, checked and cleared. Recorded so the absence is
evidence, not omission.

1. **`defineModel` async round-trip (the repo's named hazard).** `open` is a `WritableComputedRef`
   (`MigratePalettesDialog.vue:58`) and `onRespond` writes `open.value = false` *before* emitting
   (lines 70-71). A stale read after write would be the classic bug — but nothing in the component
   reads `open` after writing it, so no local `shallowRef` cache is required. A same-tick double-emit
   is additionally defended in the composable: `onMigrateRespond` nulls `pendingMigrateAction`
   *before* awaiting (`useSlugMigration.ts:107-108`), so a second `respond` is a no-op. No defect.
2. **`ValueUnit` nesting accumulation.** The component touches no colour values; `count` is a
   number and `mode` a string literal. Not applicable.
3. **oklch→HSV hue drift / `stableHue`.** No colour model in this component. Not applicable.
4. **rAF loops (the PRM-RAF epidemic).** The component owns none. The two `requestAnimationFrame`
   calls in the rendered subtree are glass-ui's dialog stage animation, and they are properly gated
   and torn down: `dialog-TNRDkcE4.js` `W()` cancels both handles and `v(K)` (`onScopeDispose`)
   runs the reset. Not this component's defect.
5. **WebGL / context loss.** None mounted here. The one console error in the whole visual matrix
   (`REPORT.md:17`, "WebGL: context lost") is on `/#/` and belongs to the hero blob.
6. **Leaked listeners / observers / unbounded growth.** The component registers no listeners,
   observers, timers, or subscriptions; three `computed`s and one function. Clean.
7. **Domain-boundary inputs.** `count` at 0 renders "You have 0 local palettes" — grammatical, and
   unreachable through the composable (`length > 0` guards at lines 59 and 92). Negative/NaN/Infinity
   are unconstructible: `count` is bound to `Array.prototype.length`
   (`App.vue:154`). The pluralisation `n !== 1 ? "s" : ""` (line 82) is correct at 0, 1 and 2 —
   MEASURED at 2: *"You have 2 local palettes"*.
8. **Parsing / `parseCssColor` crash class.** This component parses nothing. Not applicable.
9. **`verbatimModuleSyntax`.** The only imports are `computed` (value), three SFC components
   (values), and three lucide icons (values). No type-only import is mis-declared. Compliant.
10. **Vue 3.5 idiom.** Reactive props destructure is used correctly (`MigratePalettesDialog.vue:60`),
    and `count`/`mode` are read inside `computed`s where destructure reactivity holds. No
    `useTemplateRef` is needed — the component holds no element refs. Compliant.
11. **`@lucide/vue` is the real dependency** (`package.json:87: "@lucide/vue": "^1.16.0"`), not a
    stale `lucide-vue-next` reference. All three imported icons are used.
12. **Dialog labelling.** `aria-labelledby` and `aria-describedby` are both present and resolve
    (MEASURED). The nameless-button count for `/#/palettes` in the visual REPORT (1 per desktop
    matrix, `REPORT.md:97,104`) is **not** attributable to this component — the dialog is
    session-gated and was never open during that capture, and all three of its action buttons carry
    text labels.
13. **Zero console errors** on `/#/palettes` in the visual matrix (`REPORT.md:120,135,150,165`), and
    zero during my live open/close cycle. The dialog does not throw.

---

## Defect families (for the ledger)

| family | mechanism | findings |
|---|---|---|
| **A · the silent void** | committed side effects with no outcome channel — no cancel path, no success signal, no error surface, no live region | C-1, C-3, C-8, C-14 |
| **B · identity loss** | a network identity is minted and discarded inside a data-publishing path | C-2 |
| **C · no state transition** | the operation does not change the state that gates it, so it is neither idempotent nor terminal | C-3 |
| **D · dual path / dead code** | a divergent second implementation plus three dead surfaces | C-4, C-12, C-13, C-14 |
| **E · labels ≠ effects** | copy asserts a premise and consequences the code does not implement | C-6, C-7 |
| **F · per-instance styling** | overrides applied at the leaf, silently losing to the root | C-9, C-10, C-11 |
| **G · vacuous gate** | the only test reads a deleted path and asserts typography | C-5 |

## The one cure, if only one lands

**C-2.** Every other finding degrades an experience. C-2 takes the user's data and attaches it,
publicly and permanently, to an identity that is destroyed in the same gesture — and the dependency
that prevents it (`ensureUser`) is already injected into the composable and simply never called.
