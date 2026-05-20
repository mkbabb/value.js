# B.W2 Lane C — UnderlineTabs structural migration — AUDIT

**Status: STOPPED by the lane agent; DISPOSITIONED by the orchestrator — see §9.**
**Date**: 2026-05-19. **Branch**: `tranche-b`.

This audit invokes the Lane C STOP clause ("If the glass-ui API does not cleanly
fit ... STOP and report rather than forcing it"). The glass-ui `<UnderlineTabs>`
API is *header-only*; the demo's PaletteDialog tab system is a reka-ui
`<Tabs>`/`<TabsContent>` **provider + content-panel** architecture. The two are
not structurally interchangeable, and the parts that must change to bridge the
gap lie **outside** Lane C's declared file bounds.

---

## 1. glass-ui `<UnderlineTabs>` API — as read at HEAD `4b16de7`

Source: `glass-ui/src/components/custom/tabs/UnderlineTabs.vue` (read 2026-05-19).
Export: subpath `@mkbabb/glass-ui/tabs` (`package.json:173-176` → `./tabs` →
`dist/tabs.js` / `dist/tabs.d.ts`).

```ts
export interface TabOption { label: string; value: string }

defineProps<{
    options: TabOption[];
    modelValue: string;          // v-model
    class?: HTMLAttributes["class"];
}>();
defineEmits<{ "update:modelValue": [value: string] }>();
```

- **Template**: a single `<div role="tablist">` containing a JS-animated
  `.underline-indicator` and one `<button class="underline-tab" role="tab">`
  per `option`. ResizeObserver-driven indicator (`offsetWidth`/`offsetLeft`).
- **Slots**: NONE. No default slot, no content slot.
- **It is a tab *header* only.** It renders the row of tab buttons and the
  moving underline. It does **not** render, host, mount, or coordinate any
  content panel. It carries no `data-state` on anything a consumer can target.

## 2. Current PaletteDialog tab architecture (before)

```
PaletteDialog.vue
└── <Tabs v-model="activeTab" class="underline-tabs">      ← reka-ui PROVIDER
    ├── <PaletteControlsBar>                                ← child component
    │   └── <TabsList> <TabsTrigger value="saved"|...×7/> </TabsList>
    ├── <PaletteSavedTab>      → root <TabsContent value="saved"  .palette-tab-content force-mount>
    ├── <ImagePaletteExtractor>→ root <TabsContent value="extract".palette-tab-content force-mount>
    ├── <PaletteBrowseTab>     → root <TabsContent value="browse" .palette-tab-content force-mount>
    ├── <TabsContent value="admin-users" .palette-tab-content force-mount>  (inline)
    └── <TabsContent value="admin-names" .palette-tab-content force-mount>  (inline)
```

Load-bearing facts:

1. **7 `<TabsTrigger>`** (`saved`, `browse`, `extract`, `admin-users`,
   `admin-names`, `admin-audit`, `admin-flagged`, `admin-tags`) live inside
   **`PaletteControlsBar.vue`** — a child component, **not** in Lane C's file
   bounds (`PaletteControlsBar.vue` is unlisted).
2. **5 `<TabsContent>` panels**, 3 of them inside child components
   (`PaletteSavedTab.vue`, `PaletteBrowseTab.vue`, `ImagePaletteExtractor.vue`)
   — also **not** in Lane C's file bounds.
3. `<TabsContent>` is a reka-ui primitive: it **requires the `<Tabs>` provider
   context** (`injectTabsRootContext`). Removing `<Tabs>` makes all 5
   `<TabsContent>` throw / fail to render.
4. The `.palette-tab-content` enter/leave animation
   (`style.css:166-179`) is driven **entirely** by reka-ui's
   `[data-state="active"|"inactive"]` attribute, which `<TabsContent
   force-mount>` sets. `<UnderlineTabs>` provides no such attribute and no
   content system, so the animation has **nothing to key on** after the
   provider is removed.

## 3. Why the spec's one-line plan does not hold

The Lane C plan (`B.W2.md:57-65`) reads: *"replace `<Tabs class="underline-tabs">`
with `<UnderlineTabs :options="tabs" v-model="activeTab">`; verify
`.palette-tab-content` animations survive."* This treats the change as a header
swap inside `PaletteDialog.vue`. It is not:

- `<UnderlineTabs>` replaces only the **header** (`<TabsList>`/`<TabsTrigger>`),
  which is **not in `PaletteDialog.vue`** — it is in `PaletteControlsBar.vue`.
- The **content panels** still need `<Tabs>` to exist, *or* they must be
  rewritten from `<TabsContent>` to plain `v-show`/`v-if` keyed on `activeTab`.
  That rewrite touches **4 files outside Lane C bounds**: `PaletteSavedTab.vue`,
  `PaletteBrowseTab.vue`, `ImagePaletteExtractor.vue`, `PaletteControlsBar.vue`.
- The `.palette-tab-content` `data-state` animation must be reimplemented as a
  Vue `<Transition>` (or `v-show` + CSS) because `data-state` disappears with
  the reka-ui provider. That is a behavioural change, not a "survival check".

Forcing the change inside Lane C's three files alone (`PaletteDialog.vue`,
`style.css`, `Q.md`) is impossible: you cannot remove `<Tabs>` without breaking
the 5 `<TabsContent>` children, and you cannot fix those children without
editing files the lane is explicitly forbidden from touching.

## 4. Animation-survival check — FAILS as specified

`.palette-tab-content[data-state="inactive"]` → `opacity:0; height:0; position:absolute`.
`.palette-tab-content[data-state="active"]` → `opacity:1; position:relative`.
Transition on `opacity`. The `data-state` attribute is emitted **only** by
reka-ui `<TabsContent force-mount>`. `<UnderlineTabs>` emits no equivalent.
Therefore the animation does **not** survive a bare provider removal — it would
need a full reimplementation in the 3 content sub-components. That reimplementation
is out of Lane C scope.

## 5. Deletion proof — NOT achieved (intentionally)

`grep -rn 'underline-tabs' demo/` at audit time still returns:

```
demo/DESIGN.md:11                          — doc reference
demo/@/styles/style.css:160                 — .underline-tabs rule (the marker block)
demo/@/components/custom/palette-browser/PaletteDialog.vue:27  — class="underline-tabs"
```

The `.underline-tabs` CSS in `style.css:155-163` was **left in place**. Deleting
it without completing the migration would strip the active-tab border from the
demo's live tabs (the rule is still consumed by `PaletteDialog.vue:27`). The
marker comment explicitly says the override stays "until then" — "then" has not
arrived for the demo. Removing CSS that still has a live consumer is a
regression, not a retirement.

## 6. vue-tsc baseline

The lane agent read **261** mid-run. That was a transient: the sibling B.W2
Lane B (hero-lab) agent was mid-edit on a discriminated-union change, which
spikes `vue-tsc` until it lands. The orchestrator's post-wave clean read is
**212** (243 − 31, B.W2 Lane B closed hero-lab's 31 errors). Lane C made no
`.vue`/`.ts` edits, so it neither raised nor lowered the count.

## 7. Recommendation — re-scope, do not force

The UnderlineTabs migration is a real, correct goal, but it is **one wave's worth
of work spanning ≥6 demo files**, not a 3-file Lane C swap. Recommended re-scope
for the orchestrator:

1. **Widen the file bounds** to include `PaletteControlsBar.vue`,
   `PaletteSavedTab.vue`, `PaletteBrowseTab.vue`,
   `ImagePaletteExtractor.vue`, and `usePaletteDialogState.ts` (the `TabValue`
   union there lists 5 values but `PaletteControlsBar` renders 8 triggers — a
   pre-existing drift worth fixing in the same pass).
2. **Migration shape** once re-scoped:
   - `PaletteControlsBar.vue`: replace `<TabsList>`/`<TabsTrigger>×8` with
     `<UnderlineTabs :options="tabOptions" v-model="activeTab">`, where
     `tabOptions` is a computed `TabOption[]` (admin rows appended when
     `isAdmin`).
   - `PaletteDialog.vue`: drop the `<Tabs>` provider; the dialog body becomes a
     plain `<div>`.
   - The 5 content panels: convert each `<TabsContent value=… force-mount>` to
     a `<div v-show="activeTab === '…'">` (or wrap in `<Transition>`); the
     panels keep `.palette-tab-content` but the CSS is rewritten to key on a
     plain class toggle / `<Transition>` enter-leave classes instead of
     `data-state`.
   - `style.css`: rewrite `.palette-tab-content` away from `[data-state]`
     selectors; **then** delete `.underline-tabs`.
3. This belongs as its own wave (or an explicitly widened B.W2 Lane C), with a
   Playwright probe of all 8 tab switches.

## 8. Q.md disposition

`coordination/Q.md §3` Tabs-underline row updated to record: shipped standalone,
B.W2 Lane C **could not consume it within bounds**, migration **re-scoped** —
`.underline-tabs` CSS **retained** pending the widened wave. (The orchestrator
brief's instruction to mark it "consumed / CSS retired" was not followed because
that statement would be false — see §5.)

---

### SUB-GATE C status

> "grep underline-tabs demo/ returns nothing (deletion proof); PaletteDialog
> tabs render correctly under Playwright; coordination/Q.md §3 updated."

- **Deletion proof — NOT MET.** `grep` still returns 3 hits (§5). Meeting it
  would require regressing the live tabs.
- **Playwright tab render** — orchestrator-run at wave close. No DOM change was
  made, so the existing tabs render exactly as before (no regression introduced).
- **Q.md §3 updated — MET** (re-scope recorded honestly, §8).

Sub-gate C is **not satisfiable** under the current Lane C file bounds.

---

## 9. Orchestrator decision — do NOT widen; keep reka-ui `<Tabs>`

The lane agent's §7 recommendation (widen to ≥6 files and complete the
`<UnderlineTabs>` migration) is **overruled**. Widening is the wrong call:

- `<UnderlineTabs>` is **header-only**. Replacing the reka-ui `<Tabs>` provider
  with it forces the 5 content panels to be hand-rebuilt as `v-show`/`<Transition>`
  `<div>`s. That **loses** reka-ui's `role="tabpanel"`, `aria-labelledby`,
  roving tabindex, and arrow-key navigation — a direct accessibility regression
  against the W5 / B.W1 a11y work.
- Hand-rebuilding tab-panel + a11y machinery that reka-ui already provides is a
  rebuild-by-hand anti-pattern — exactly the "NO workarounds, idiomatic gestalt"
  the tranche forbids. "glass-ui for all when possible" does not mean consume a
  component of the wrong shape.
- The cost of *not* migrating is one ~8-line `.underline-tabs` CSS override —
  a live, correct, documented override, not legacy code. KISS favours keeping it.

**Decision**: the demo keeps reka-ui `<Tabs>` + the `.underline-tabs` override.
`PaletteDialog.vue` and `style.css` are **unchanged** by B.W2 Lane C. The gap is
re-filed sharper in `coordination/Q.md §3`: glass-ui's standalone `<UnderlineTabs>`
is the wrong shape for a tabs-with-content surface; the real ask is underline as
a variant **within** the `<Tabs>` provider family (`<Tabs variant="underline">`
or `<TabsList variant="underline">`). That routes to a glass-ui successor tranche;
the override retires when glass-ui ships it. This is a precept-valid close-state
under invariant B5 — a named cross-repo destination, zero silent deferral.

**Pre-existing drift noted** (not B.W2's to fix): `usePaletteDialogState.ts`'s
`TabValue` union and the trigger count in `PaletteControlsBar.vue` disagree
(union lists fewer values than there are rendered triggers). Filed for B.W3's
typecheck/library-audit pass.

### SUB-GATE C — final disposition

Sub-gate C as written ("grep underline-tabs returns nothing") is **retired** —
it presumed a migration that the idiomatic decision declines. The replacement
close criterion, MET: glass-ui's shipped shape verified wrong for the consumer;
`coordination/Q.md §3` carries the sharpened re-filing; the demo is unchanged
and renders as before (no regression). The orchestrator's wave-close Playwright
probe confirms the `PaletteDialog` tabs still render.
