# CHALLENGE-L — library structure · `demo/color-picker/ErrorBoundary.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. Declared, not inherited.

**Repo state.** The commission names HEAD `c654824e`. The branch had already advanced when this
seat opened: `git log --oneline -1` → `32b4040e docs(V·mega): r3 DELTA COMPLETE — 3 apotheoses
merged in place; scenes promoted from queue`. `demo/color-picker/ErrorBoundary.vue` is byte-identical
across that range (`git log --follow` shows its last touch at `a61094e3`, three commits before
`c654824e`), so no finding below is affected. Recorded for the record, not as a caveat.

**Verdict: DEFECTIVE.** Eleven findings, one BLOCKER. The component's single job — recover a failed
pane — does not work: the boundary latches the whole application dead across navigation and its own
Retry button, and only a full page reload restores it. That is not an implementation slip; it is a
wrong-altitude ownership defect. Error containment is owned by a component that has no relationship
to the unit that fails.

---

## Method — what I actually ran

| Probe | Artifact | Result |
|---|---|---|
| Unit probes against the **shipped** SFC (6 tests) | `probes/boundary.test.ts` + `probes/vitest.config.ts` | 6/6 pass |
| Live latch probe against the running dev server | `probes/live-latch.mjs` | pasted below |
| Effective lint boundary for this file | `npx eslint --print-config` | pasted below |
| Dev-server root exposure | `curl localhost:9000` | pasted below |
| Vue error-propagation semantics | `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:227-256` | quoted below |

```
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/vitest.config.ts
 ✓ docs/.../ErrorBoundary/probes/boundary.test.ts (6 tests) 56ms
 Test Files  1 passed (1)
      Tests  6 passed (6)
```

The probes mount the real `demo/color-picker/ErrorBoundary.vue` (aliased `@demo`), stub only
`Button`/`CircleAlert`/`RotateCcw`, and touch nothing in `demo/`. No source edits land from this seat.

---

## The import graph of this component, traced

`demo/color-picker/ErrorBoundary.vue:39-41` — three edges, total:

| Import | Home | Verdict |
|---|---|---|
| `vue` → `ref, nextTick, onErrorCaptured, useTemplateRef` | framework | fine |
| `@lucide/vue` → `CircleAlert, RotateCcw` | `devDependencies`; glass-ui declares it a **peerDependency** (`^1.16.0`), so it is the constellation's icon set, not a demo private choice; 47 demo files use it | fine |
| `../ui/button` → `Button` | `demo/ui/button/index.ts`, **one line**: `export { Button } from "@mkbabb/glass-ui";` | **L-4** |

**Nothing from `@mkbabb/value.js`.** No `@src/*` deep path, no `src/` reach, no demo→library
boundary crossing of any kind. See *Negative proofs* — this is the one axis on which the component
is clean, and it is clean by construction, not by luck.

---

# Findings

## L-1 · **BLOCKER** — the boundary latches the entire app dead across navigation; error containment is owned at an altitude that cannot know when the failure is stale

`demo/color-picker/App.vue:47-50` opens **one** `<ErrorBoundary>` around the whole two-pane grid and
closes it at `:139-141`. Its `caught` flag (`ErrorBoundary.vue:55`) is component-local state on a
component whose lifetime is the *application's*. The thing that actually failed is a **pane** — the
unit `demo/shell/PaneSlot.vue` mounts under `:key="liveKey"` (`PaneSlot.vue:113-119`), from the route
table. The boundary has no access to that key, so nothing can ever tell it the failure is stale.

The live app confirms the consequence. `probes/live-latch.mjs` walks the running Vue tree, finds the
one instance carrying an `onErrorCaptured` hook, fires it exactly as Vue's `handleError` does, then
navigates:

```
$ node docs/.../ErrorBoundary/probes/live-latch.mjs
instances_with_onErrorCaptured: [{"name":"ErrorBoundary","depth":1}]
hook_return_value: "false"
after_catch: {"alerts":["dev misconfigured — run `npm run dev`",
                        "This panel hit an unexpected error.L-probe induced render th"],
              "paneContainerPresent":false,
              "focusTag":"vj-error-boundary flex flex-col items-ce"}
after_navigation_to_/palettes: {"hash":"#/palettes",
              "alerts":["dev misconfigured — run `npm run dev`",
                        "This panel hit an unexpected error.L-probe induced render th"],
              "paneContainerPresent":false,
              "mainText":"This panel hit an unexpected error.\n\nL-probe induced render throw\n\nTry again"}
after_reload: {"alerts":1,"paneContainerPresent":true}
```

Read that third line. The user clicked a different view. **The URL changed. The content did not.**
`.pane-container` is still absent. The dock is still live and still accepts clicks, so every
subsequent navigation is a silent no-op — the app presents a working navigation affordance over a
corpse. Only `page.reload()` restores it (`after_reload`).

Reproduced in isolation at `probes/boundary.test.ts` P2 — replace the slotted component outright and
the boundary stays latched, the healthy replacement never mounts:

```ts
which.value = "good"; boom.value = false;   // the parent swaps in a healthy pane
expect(w.find('[role="alert"]').exists()).toBe(true);    // still latched
expect(w.find(".alive-GOOD").exists()).toBe(false);      // healthy pane never mounts
```

Two further consequences fall straight out of the altitude:

- **Blast radius.** P1: one sibling's throw unmounts every sibling. Live: `paneContainerPresent:false`
  after a single pane's failure — both panes die, and every `KeepAlive` cache inside the three
  `PaneSlot` sites (`App.vue:83,101,127`) is destroyed with them.
- **Dead recovery.** P3, and L-10 below.

**Mechanism.** Unique semantic ownership violated at the boundary's own altitude: *"which pane is
currently failing"* is a fact about a pane, stored on the app.

**Cure — architectural transposition, not a patch.** Containment moves **into** `PaneSlot`, where the
key already lives:

```vue
<!-- demo/shell/PaneSlot.vue -->
<Transition …>
  <KeepAlive :max="max">
    <PaneErrorBoundary :key="liveKey" @retry="remount">
      <component :is="liveComponent" :key="liveKey" v-bind="liveProps" />
    </PaneErrorBoundary>
  </KeepAlive>
</Transition>
```

`:key="liveKey"` on the boundary is the whole fix for the latch: a view change destroys the boundary
instance along with the pane it guarded, so `caught` cannot outlive its subject. Blast radius drops
from *the application* to *one slot* — a broken gradient pane costs the gradient pane, not the
picker beside it and not navigation. `App.vue` then holds **zero** boundary markup: the shell owns
pane containment, which is what a shell is for.

---

## L-2 · **MAJOR** — the error plate is a drifted hand-copy of `EmptyState`'s `error` variant

Two homes for one concept, and the constants have already diverged:

```
$ diff <(sed -n '14,27p' demo/shared/ui/EmptyState.vue) <(sed -n '15,34p' demo/color-picker/ErrorBoundary.vue)
<         class="flex flex-col items-center justify-center gap-2.5 py-8 text-center"
>         class="vj-error-boundary flex flex-col items-center justify-center gap-3 py-10 px-6 …"
<         <CircleAlert class="w-6 h-6 text-destructive/80" aria-hidden="true" />
>         <CircleAlert class="w-7 h-7 text-destructive/80" aria-hidden="true" />
<         <p class="font-display text-heading text-foreground max-w-[26ch] …">
>         <p class="font-display text-heading text-foreground max-w-[28ch] …">
<         <p v-if="detail" class="text-mono-small plate-ink max-w-[44ch] break-words">
>         <p v-if="detail" class="text-mono-small plate-ink max-w-[46ch] break-words">
<         <slot name="action" />
>         <Button variant="outline" size="sm" class="font-display mt-1" @click="reset"> … </Button>
```

Same glyph, same font stack, same `plate-ink` detail line, same scoped `.plate-ink` rule
**byte-identical** in both files — and gap `10px` vs `12px`, icon `24px` vs `28px`, measure `26ch` vs
`28ch`, `44ch` vs `46ch`. The comment at `ErrorBoundary.vue:12-14` *names* the duplication as
deliberate ("The plain register mirrors EmptyState's `error` variant"). Deliberate duplication is
still duplication: `EmptyState` has **7** error-variant consumers
(`BrowsePane.vue:64`, `AdminTagsPanel.vue:70`, `AdminAuditPanel.vue:44`, `AdminFlaggedPanel.vue:24`,
`AdminUsersPanel.vue:53`, `AdminNamesPanel.vue:32,82`) and this is a silent eighth that no design
change to the other seven will ever reach.

**Cure.** Extract `demo/shared/ui/ErrorPlate.vue` — glyph + statement + machine-truth detail +
`#action` slot, one set of constants. `EmptyState` composes it for `variant="error"`;
`PaneErrorBoundary` composes it and fills `#action` with its Retry. `EmptyState` sheds its error
branch entirely and becomes what its name says — the empty plate. Two concepts, two files, no
`variant` discriminator straddling them.

---

## L-3 · **MAJOR** — a terminal, unreportable sink: `return false` suppresses Vue's own logging, and the app installs no error handler anywhere

`ErrorBoundary.vue:68` returns `false`. Vue's `handleError`:

```js
// node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:227-256
if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
  return;                                    // ← line 239: EARLY RETURN
}
…
if (errorHandler) { … return; }
logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);   // ← 256, never reached
```

`logError` is what emits `"Unhandled error during execution of …"` with the component trace and
rethrows in dev. Returning `false` skips it. And there is no downstream net:

```
$ grep -rn "errorHandler\|onErrorCaptured\|unhandledrejection\|window.onerror" demo/ src/
demo/color-picker/ErrorBoundary.vue:39   (the import)
demo/color-picker/ErrorBoundary.vue:59   (the hook)
```

Four matches, all inside this one file. `demo/color-picker/index.html:205-213` is the whole boot:
`createApp(App); app.use(router); app.mount("#app")` — no `app.config.errorHandler`, no
`window.onerror`, no `unhandledrejection`. So the *only* error path in the application terminates in
a `ref<string|null>` that is rendered on screen and then discarded on Retry.

Probe P4 confirms the component reports nothing outward: on catch, `w.emitted()` deep-equals `{}` —
no event, no callback, no injected reporter.

Probe P5 confirms the other half of the hole: `onErrorCaptured` covers synchronous render/lifecycle
only. A raw `setTimeout`/promise escape — the shape of every fetch, `requestAnimationFrame` and WebGL
callback in this demo — never reaches it, and with no `unhandledrejection` handler it is lost
silently. The visual audit's one recorded console error, `safari-desktop-light /#/: WebGL: context
lost.` (`audit/visual/REPORT.md`, §consoleErrors), is exactly this class: a failure that no boundary
can catch and no handler records.

**Mechanism.** Three distinct responsibilities have been collapsed into one file and two of them have
no home at all: *containment* (shell), *presentation* (shared/ui), *reporting* (boot).

**Cure.** The boundary emits `caught: [err: unknown, info: string]` and stops owning the decision;
`demo/color-picker/` — the boot directory, whose actual job this is — installs
`app.config.errorHandler`, `window.onerror` and `unhandledrejection` in one `boot/useErrorReporting.ts`.
That is a *single* place that knows how failures are recorded, and it covers the async half the
boundary structurally cannot.

---

## L-4 · **MAJOR** — `demo/ui/` is a 19-directory back-compat alias layer over glass-ui, and it degrades the published subpath surface into a root-barrel reach

`ErrorBoundary.vue:41` reads `import { Button } from "../ui/button";`. That file, in full:

```ts
// demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

Eighteen of the nineteen `demo/ui/*` barrels are exactly this — a single re-export line, no content.
The layer documents its own provenance:

```ts
// demo/ui/alert/index.ts:1-10
// ui/alert — re-export of the glass-ui Alert primitive.
// This barrel previously held a local shadcn-vue re-implementation … B.W2 converted it to a
// re-export: glass-ui is the design system … The two consumers import from this barrel UNCHANGED.
```

"…import from this barrel unchanged" is the definition of a back-compat shim under
`feedback_no_backwards_compat` (*"Never add legacy-compat shims; migrate the consumer to the new API
at the root"*). The layer exists so that the shadcn→glass-ui migration never had to touch consumers.
Edict 2, violated 19 times, and `ErrorBoundary.vue:41` is one of the 22 imports riding it.

It is not free. glass-ui publishes a narrow `./button` subpath; the barrel reaches the **root** one:

```
$ wc -c node_modules/@mkbabb/glass-ui/dist/glass-ui.js node_modules/@mkbabb/glass-ui/dist/button.js
   25239 …/dist/glass-ui.js      (47 top-level import/export statements — the whole component graph)
      71 …/dist/button.js        (2)

$ curl -s "http://localhost:9000/@fs/.../demo/ui/button/index.ts"
export { Button } from "/@fs/.../node_modules/.vite/deps/@mkbabb_glass-ui.js?v=a019c022";

$ ls -la node_modules/.vite/deps/ | grep glass
231357  @mkbabb_glass-ui.js          ← what `../ui/button` resolves to
   103  @mkbabb_glass-ui_chip.js     ← what a narrow subpath costs
```

**231,357 bytes** of prebundle for one button, against ~100 for a narrow subpath. Eighteen barrels do
this; only `demo/ui/input/index.ts` reaches a subpath (`@mkbabb/glass-ui/forms`). Repo-wide the split
is 37 root-barrel imports vs 82 subpath imports — the alias layer is where the root-barrel habit is
concentrated.

**Honest caveat.** This edge is not the *marginal* cost on the boot path: `App.vue:194-196` already
root-barrels `useClipboard` from `@mkbabb/glass-ui`, so the 231 KB chunk is eager regardless. The
finding is the **layer**, not this one import. And the repo already knows better —
`demo/shared/utils.ts:8-18` documents the identical argument as settled practice:

> *"The demo's ONE debounce (T.W6.5 Lane M · row 12 — **the root-barrel shed**). `debounce` was the
> last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier — the full-barrel import
> that drags the scroll-timeline grammar chunk (~36 KiB gz) into the eager graph for a 40-line timer
> utility."*

The demo shed the value.js root barrel for a 40-line utility and left the glass-ui root barrel
standing behind nineteen alias directories.

**Cure.** Delete `demo/ui/` outright. Every consumer imports `@mkbabb/glass-ui/<subpath>` directly
(`ErrorBoundary` → `@mkbabb/glass-ui/button`), which is what edict 4 means by "glass-ui is the design
system" — you name it, you do not shadow it. The one genuine content file (`demo/ui/alert`'s 10 lines
of comment) becomes a note in the ADR, not a module.

---

## L-5 · **MAJOR** — the demo's import-boundary invariants are dead code: every guard glob targets a tree deleted at W43

`eslint.config.js` declares three objects of demo module-graph law — G-DEMO-1 (shared layer must not
reach up into app-root boot), G-DEMO-3a (shared must not reach feature internals), G-DEMO-3b (reach
the palette-browser through its barrel). Their file globs:

```
eslint.config.js:232-239   "demo/color-picker/**", "demo/@/components/**", "demo/@/lib/**"
eslint.config.js:275-278   "demo/@/composables/**/*.ts", "demo/@/composables/**/*.vue"
```

```
$ ls -d demo/@
ls: demo/@: No such file or directory
```

`demo/@` was deleted at `bc06a0cd feat(v-w43b)!: demo @-alias death` / `a61094e3 feat(v-w43b3)!: home
the feature UI trees; demo/@ dies (D-c)`. Every glob above matches zero files except
`demo/color-picker/**`, whose sole surviving pattern is unresolvable:

```
$ npx eslint --print-config demo/color-picker/ErrorBoundary.vue
no-restricted-imports for ErrorBoundary.vue:
[ 2, { "patterns": [ { "group": ["@components/custom/palette-browser/**/*.vue"],
                       "message": "G-DEMO-3b: reach palette-browser through its barrel seam…" } ] } ]
```

`@components` no longer exists either — `tsconfig.demo.json:33-34` says so in as many words:
*"W43 (RF-15): the demo `@…` path aliases were killed … No `@styles`/`@components`/`@utils`/`@lib`/
`@composables`/`@assets` project alias survives."*

**`demo/color-picker/ErrorBoundary.vue` is governed by exactly zero enforceable import boundaries.**
Every finding in this report describes an edge that the repo intended to forbid and can no longer
detect. The guard rails were not removed; they were left pointed at a deleted tree, which reads GREEN
forever.

**Cure.** Re-aim the three rules onto the live physical homes (`demo/color-session`, `demo/palettes`,
`demo/shell`, `demo/shared`, `demo/workbenches`, `demo/scenes`, `demo/platform`), and add the layering
ban that would have caught L-6:

```js
{ files: ["demo/color-picker/**/*.vue"],
  rules: { /* the boot root may hold App.vue and boot composables only —
              a component exported from here is a mis-homing (see L-6) */ } }
```

A rule whose glob matches nothing should fail CI as loudly as a rule that is violated. A one-line
`npm run lint:boundaries` gate that asserts each declared glob matches ≥1 file is cheaper than any
of the audits that keep rediscovering these edges.

---

## L-6 · **MAJOR** — the component is homed in the Vite **root** (the boot/entry directory), not in the UI layer

`vite.config.ts` sets `root: "./demo/color-picker/"` for **both** dev and `gh-pages`. That directory
is the boot surface and nothing else — its full contents:

```
$ find demo/color-picker -type f \( -name '*.vue' -o -name '*.ts' -o -name '*.css' \)
demo/color-picker/App.vue                                  ← the root component
demo/color-picker/ErrorBoundary.vue                        ← ★ the one outlier
demo/color-picker/composables/boot/{atmosphere-calibration,ground,hydrate,useAtmosphere,
    useAtmosphereBoot,useDockArrival,useOverture,useViewAccents,view-accents}.ts, overture.css
demo/color-picker/composables/{useDevicePixelSnap,usePaletteWiring}.ts
demo/color-picker/router/{index,useDocumentTitle}.ts
demo/color-picker/vite.d.ts
```

Sixteen boot artifacts and one reusable presentational component. The mis-homing is observable over
HTTP — Vite serves the root directory's files at top-level URLs:

```
$ curl -s -o /dev/null -w "%{http_code} %{size_download}\n" http://localhost:9000/ErrorBoundary.vue
200 12546                                        ← the real transformed module
$ curl -s -o /dev/null -w "%{http_code} %{size_download}\n" http://localhost:9000/shared/ui/EmptyState.vue
200 13183                                        ← the SPA index.html fallback, i.e. not addressable
```

`ErrorBoundary.vue` is root-relative addressable; its sibling-in-concept `EmptyState.vue` is not.
That asymmetry is the module lattice telling you where the file belongs. The directory name compounds
it: `demo/color-picker/` is the **shell**, while `demo/picker/` (19 files) is the actual colour
picker — two directories named for the same thing, one of which is not that thing.

**Cure.** `demo/shell/PaneErrorBoundary.vue` (containment, beside `PaneSlot.vue` which will own it)
and `demo/shared/ui/ErrorPlate.vue` (presentation, beside `EmptyState.vue` and `PaneHeader.vue`).
`demo/color-picker/` returns to holding only what boots the app.

---

## L-7 · **MINOR** — the component's entire declared public surface is dead

It declares two props and one event (`ErrorBoundary.vue:43-53`). Against its one and only consumer:

| Surface | Declared | Actual |
|---|---|---|
| `message` | default `"This panel hit an unexpected error."` (`:44`) | `App.vue:50` passes **the identical string** |
| `retryLabel` | default `"Try again"` (`:45`) | never passed, anywhere |
| `emit("reset")` | `:53`, fired at `:74` | `App.vue:50` declares **no `@reset` listener** |

```
$ sed -n '50p' demo/color-picker/App.vue
        <ErrorBoundary message="This panel hit an unexpected error.">
```

100% speculative API for a single-consumer component — edict 3 (KISS, no contrivance). The props
should collapse to nothing, or `reset` should become the *load-bearing* `retry` the shell actually
listens to (which is the L-1 cure: the shell remounts the slot).

---

## L-8 · **MINOR** — `.plate-ink` is copy-pasted into five scoped style blocks instead of living in `demo/styles/utils.css`

```
$ grep -rn "^\.plate-ink" demo/
demo/workbenches/extract/ImageDropZone.vue:109
demo/workbenches/extract/ExtractWorkbench.vue:290
demo/workbenches/extract/ExtractControls.vue:148
demo/shared/ui/EmptyState.vue:102
demo/color-picker/ErrorBoundary.vue:84
```

All five bodies are byte-identical: `color: var(--ink-muted, var(--muted-foreground));`. This is a
design-system utility class replicated five times as a per-component override, when
`demo/styles/utils.css` already holds exactly this species of shared recipe — `.section-subtitle`,
`.skeleton-ink-register`, `.fraunces`, `.fira-code`. Edict 5: root-level styling, never per-instance.
One rule in `utils.css`, five `<style scoped>` blocks deleted.

---

## L-9 · **MINOR** — `vj-error-boundary` is a dead class

```
$ grep -rn "vj-error-boundary" demo/ src/ e2e/ test/
demo/color-picker/ErrorBoundary.vue:18
```

One occurrence repo-wide. No CSS rule, no selector, no test hook, no `data-testid` either. Probe P6
confirms it is emitted into the DOM on every catch. Either it is a styling hook (then it needs a
rule) or a test hook (then it should be `data-slot="error-boundary"`, matching the
`data-slot="empty-state-trio"` convention at `EmptyState.vue:41`). As it stands it is a name with no
referent.

---

## L-10 · **MINOR** — "Try again" is a dead affordance for the deterministic case

Probe P3: with the throwing child unchanged, clicking Retry sets `caught=false`, remounts the same
subtree with the same inputs, and re-catches within the same tick. The plate never leaves the screen;
the user sees a button that visibly does nothing.

```ts
await w.find("button").trigger("click");
expect(w.find('[role="alert"]').exists()).toBe(true);   // still latched
expect(w.emitted("reset")).toBeTruthy();                 // and nobody is listening (L-7)
```

This is downstream of L-1: a meaningful retry must change *something* — refetch the pane's data,
bump the mount key. Neither is reachable from a component that owns only a boolean. Under the L-1
cure the boundary emits `retry`, `PaneSlot` bumps `liveKey`, and Retry becomes a real remount.

---

## L-11 · **INFO** — the only test of a core-shell component lives in the admin feature's e2e suite and reaches it through a feature bug

```
$ grep -rln "ErrorBoundary\|onErrorCaptured" test/ e2e/
e2e/smoke/admin/a11y-authed-admin.spec.ts
```

`e2e/smoke/admin/a11y-authed-admin.spec.ts:107-156` induces the throw by serving `{slug: null}` so
that `AdminUsersPanel`'s `slugHead(null)` throws in a `v-for`. Two structural consequences:

1. **Coupling.** Null-guard `slugHead` — an obviously correct fix, and one another audit seat will
   propose — and the demo shell's error boundary silently loses 100% of its coverage. A core
   component's only test is a hostage of a feature defect.
2. **Selector aliasing.** The assertion is
   `page.getByRole("alert").filter({visible:true}).first()`. Three independently-owned surfaces
   publish `role="alert"`: this boundary (`:19`), `EmptyState`'s error branch (`EmptyState.vue:17`),
   and `ApiOfflineChip`'s misconfigured register (`ApiOfflineChip.vue:13`). The live probe caught
   **two of them mounted simultaneously** — `after_catch.alerts` lists the misconfig chip *first* in
   DOM order, ahead of the boundary. The `aria-live` assertion on the next line happens to narrow it
   today; DOM order is doing load-bearing work it should not be doing.

**Cure.** A unit suite for the boundary in `test/` (the probes in this directory are a working
starting point — they need no browser, no auth, no fixture), plus a stable
`data-slot="error-boundary"` for the e2e to bind to. The admin spec keeps only what it is actually
about: that an admin render failure is *announced*.

---

# The greenfield lattice

Structuring this today with no legacy, three responsibilities, three homes, one direction of
dependency:

```
demo/color-picker/                     BOOT — the Vite root; only what boots the app
    index.html  App.vue  router/  composables/boot/
    composables/boot/useErrorReporting.ts    ← NEW (L-3): app.config.errorHandler +
                                               window.onerror + unhandledrejection.
                                               The ONE place that knows how a failure is recorded.
    (ErrorBoundary.vue is GONE from here — L-6)

demo/shell/                            SHELL — layout, routing-to-panes, pane lifecycle
    PaneSlot.vue                         owns <PaneErrorBoundary :key="liveKey"> — containment
                                         is scoped to the unit that mounts, and dies with it (L-1)
    PaneErrorBoundary.vue              ← NEW: onErrorCaptured → emit("caught", err, info);
                                         emit("retry"); ~25 lines, ZERO presentation.
                                         `caught` cannot outlive the pane because the KEY kills it.

demo/shared/ui/                        PRESENTATION — plates, no behaviour
    ErrorPlate.vue                     ← NEW (L-2): glyph + statement + machine-truth detail +
                                         #action slot. ONE set of constants.
    EmptyState.vue                       sheds its `error` branch and its `variant` prop —
                                         it becomes what its name says
    PaneHeader.vue

demo/styles/utils.css                    .plate-ink lands here, once (L-8)

(demo/ui/ is DELETED — L-4. Every consumer: @mkbabb/glass-ui/<subpath>, narrow, direct.)
```

Dependency direction, single and acyclic: **boot → shell → features → shared/ui → glass-ui →
value.js**. Nothing reaches up. `ErrorPlate` knows nothing about panes; `PaneErrorBoundary` knows
nothing about typography; `useErrorReporting` knows nothing about either and catches the async half
that neither can see.

The whole of `ErrorBoundary.vue` under this lattice is ~25 lines of `PaneErrorBoundary` plus a
`<ErrorPlate>` tag. Every one of L-1, L-2, L-6, L-7, L-8, L-9, L-10 dissolves — not because each was
patched, but because each was an artefact of one file trying to be three things in the wrong place.

---

# Negative proofs

The seat's premise is that the library structure is wrong. These axes are **clean**, and the evidence
that proves the negative is recorded so no later seat re-litigates them:

- **value.js consumption — clean by absence.** The component imports `vue`, `@lucide/vue`,
  `../ui/button`, and nothing else (`ErrorBoundary.vue:39-41`). No `@mkbabb/value.js` import, no
  `@src/*`, no reach into `src/`. `package.json#exports` is a closed 8-key set
  (`["./color","./value","./css","./easing","./math","./transform","./quantize"]` + root) and this
  file touches none of it. There is no false proof of the public API here: a real external consumer,
  given glass-ui, could write this file verbatim.
- **No `src/`-belongs logic.** Nothing in the file is colour, parsing, maths or transform. There is
  no library code doing this component's job and no component code doing the library's.
- **Not a god module.** 87 lines, one responsibility, no composables of its own.
- **`verbatimModuleSyntax` — nothing to violate.** Every imported binding is a value
  (`ref`, `nextTick`, `onErrorCaptured`, `useTemplateRef`, `CircleAlert`, `RotateCcw`, `Button`);
  there is no type-only import to have mis-declared.
- **Vue 3.5 idioms present and correct.** `useTemplateRef<HTMLElement>("alertRef")` at `:57` (not the
  legacy same-name `ref`); reactive props destructure with defaults at `:43-51`; typed
  `defineEmits<{ reset: [] }>()` at `:53`.
- **None of the named historical suspects touch this file.** No local `useLayerTransition`
  reimplementation; no `usePaletteExport` / `export/serializers` dual path; none of the three
  parallel `useDark` stores. It imports no composable at all.
- **The `@lucide/vue` devDependency is not a mis-declaration.** glass-ui declares it a
  **peerDependency** (`^1.16.0`), so it is the constellation's icon set; the demo is not published
  (`package.json#files` is `["dist","!dist/gh-pages",…]`), so a devDependency is the correct
  declaration for a demo-only runtime import.
- **The component renders correctly when it renders.** `audit/visual/REPORT.md` over 4 matrices × 15
  routes = 60 Safari captures reports `pageErrors — 0`, `blankOrNearBlank — 0`, and one console error
  (`safari-desktop-light /#/: WebGL: context lost.`) which is the L-3 async class, not a render
  throw. The boundary never fired in the matrix; no screenshot shows it. The live probe's
  `after_catch` capture is the only rendered evidence of this component that exists, and the plate
  itself is correct — announced, focus-managed, named, with a visible affordance. **The a11y
  contract U-F58 shipped is genuinely met.** The defect is that the affordance it offers is a lie
  (L-1, L-10), not that the plate is wrong.

---

# Defect table

| ID | Severity | Defect | Anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | Boundary latches the whole app dead across navigation; containment owned at an altitude that cannot know the failure is stale | `App.vue:47-50,139-141` · `ErrorBoundary.vue:55` · `PaneSlot.vue:113-119` · `probes/live-latch.mjs` · P1/P2 |
| L-2 | MAJOR | Error plate is a drifted hand-copy of `EmptyState`'s `error` variant; constants already diverged | `ErrorBoundary.vue:15-34` vs `EmptyState.vue:14-27` |
| L-3 | MAJOR | Terminal unreportable sink: `return false` kills Vue's `logError`, no `errorHandler`/`onerror`/`unhandledrejection` anywhere | `ErrorBoundary.vue:68` · `runtime-core.cjs.js:238-239,256` · `index.html:205-213` · P4/P5 |
| L-4 | MAJOR | `demo/ui/*` = 19-dir back-compat alias layer over glass-ui; degrades the subpath surface to a 231 KB root-barrel reach | `ErrorBoundary.vue:41` · `demo/ui/button/index.ts:1` · `demo/ui/alert/index.ts:1-10` · measured 231357 B |
| L-5 | MAJOR | Demo import-boundary invariants are dead: every guard glob targets the deleted `demo/@`; this file has ZERO enforced boundaries | `eslint.config.js:232-239,275-278` · `ls demo/@` · `eslint --print-config` |
| L-6 | MAJOR | Homed in the Vite root (boot dir), not the UI layer; root-relative HTTP addressable while its concept-sibling is not | `vite.config.ts` root · `find demo/color-picker` · `curl` 200/12546 vs SPA fallback |
| L-7 | MINOR | Entire declared public surface is dead: `message` passed as its own default, `retryLabel` never passed, `reset` never listened | `ErrorBoundary.vue:43-53,74` · `App.vue:50` |
| L-8 | MINOR | `.plate-ink` copy-pasted into 5 scoped blocks instead of `demo/styles/utils.css` | 5 × `grep -rn "^\.plate-ink" demo/` |
| L-9 | MINOR | `vj-error-boundary` is a dead class — 1 occurrence, no rule, no selector, no test hook | `ErrorBoundary.vue:18` · P6 |
| L-10 | MINOR | "Try again" is a dead affordance for deterministic errors — remounts the same subtree with the same inputs | P3 |
| L-11 | INFO | Core-shell component's only test lives in the admin feature suite and depends on a feature bug; `role="alert"` selector aliases across 3 owners | `e2e/smoke/admin/a11y-authed-admin.spec.ts:107-156` · `probes/live-latch.mjs` `after_catch` |

**Strongest defect: L-1.** Every other finding is a mis-homing or a duplication; L-1 is the one where
the shipped product is broken for the user, and it is broken for a structural reason — the boundary
owns state about a subject it cannot observe.

---

## Probe artifacts (this directory)

- `probes/boundary.test.ts` — 6 unit probes against the shipped SFC; P1 blast radius, P2 the latch,
  P3 dead retry, P4 total swallowing, P5 async hole, P6 dead class.
- `probes/vitest.config.ts` — standalone runner
  (`npx vitest run --config docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/vitest.config.ts`).
- `probes/live-latch.mjs` — read-only Playwright probe against `localhost:9000`
  (`node docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/live-latch.mjs`).

All three are read-only. **No source edits landed from this seat.** Nothing under `src/`, `demo/`,
`api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any `INBOX.md` was written.
