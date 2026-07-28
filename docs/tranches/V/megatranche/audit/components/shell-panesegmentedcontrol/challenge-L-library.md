# CHALLENGE-L — library structure · `demo/shell/PaneSegmentedControl.vue`

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`), the tier declared at
spawn. Seat declaration matches served model; no inherited/undeclared seat. NOT a defect.

- Axis: **L — the library is improperly structured.**
- Subject: `/Users/mkbabb/Programming/value.js/demo/shell/PaneSegmentedControl.vue` (52 lines).
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Verdict: **DEFECTIVE.**

---

## 0. The gate question, answered first

CARRY-LEDGER `docs/tranches/V/reformation/CARRY-LEDGER.md:22` (W47):

> `PaneSegmentedControl` 1→0 (it lives ALIVE at `demo/shell/` for exactly this gate)

**Measured usage count = 1. The gate is NOT vacuous.** Repo-wide search over
`*.vue *.ts *.js *.json` excluding `node_modules`:

```
$ grep -rn "PaneSegmentedControl" --include="*.vue" --include="*.ts" --include="*.js" --include="*.json" .
demo/shell/dock/Dock.vue:15:import PaneSegmentedControl from "../PaneSegmentedControl.vue";
demo/shell/dock/Dock.vue:192:    <!-- Mobile pane toggle — Ae-5: PaneSegmentedControl owns this control (one owner). -->
demo/shell/dock/Dock.vue:198:        <PaneSegmentedControl
```

(every other hit is prose in `docs/tranches/{R,N}/…`).

- **The single consumer:** `demo/shell/dock/Dock.vue` — import at `:15`, render at `:198-203`.
- **It is not re-exported.** `demo/shell/dock/index.ts` exports only `GlassDock`,
  `DockLayerGroup`, `DockLayer` (re-exported from `@mkbabb/glass-ui/dock`) and `Dock`. There is
  no `demo/shell/index.ts` at all (`ls demo/shell/` → 4 files + `dock/`). So the component has
  **zero public surface and exactly one private consumer**.
- **The exact replacement** is named in §5 (L-1 cure). It is not a rename or a move — it is a
  deletion, and the concept it half-owns goes back to `useViewManager` / `viewSchema`.

The gate is sound on the merits. **The gate's parenthetical is the defect**: "it lives ALIVE at
`demo/shell/` for exactly this gate" concedes that the file's location is being maintained to
service a counting metric rather than a module boundary. Structure held in place by an audit
counter is structure with no owner. See L-1.

---

## 1. Every import, traced to its home

`demo/shell/PaneSegmentedControl.vue` has exactly two imports:

| Line | Specifier | Home | Boundary verdict |
|---|---|---|---|
| `:17` | `import { computed } from "vue"` | framework | legal |
| `:18` | `import { SegmentedTabs } from "@mkbabb/glass-ui/tabs"` | `@mkbabb/glass-ui@7.0.0`, published subpath | **legal — verified** |

Verified the glass-ui subpath is a real published export, not a deep path:

```
$ node -e "const p=require('./node_modules/@mkbabb/glass-ui/package.json');
           console.log(p.version); console.log(JSON.stringify(p.exports['./tabs']))"
7.0.0
{"types":"./dist/tabs.d.ts","import":"./dist/tabs.js"}
```

`SegmentedTabs` is a named export of that subpath
(`node_modules/@mkbabb/glass-ui/dist/components/tabs/index.d.ts:1`). A real consumer could write
this import verbatim. **No deep-import defect.**

### `@mkbabb/value.js` — negative proof

The component imports **nothing** from the library. That is not an evasion of the question; it is
the answer, and the surrounding consumption path is clean too:

```
$ node -e "const p=require('./package.json'); console.log(Object.keys(p.exports))"
[ './color', './value', './css', './easing', './math', './transform', './quantize' ]

$ grep -rn 'from "@mkbabb/value.js"' demo/ | wc -l
0
```

There is no `"."` root export in the map and **no demo file imports the bare specifier** — the two
facts agree, so no demo import depends on a root entry that a real consumer could not resolve. The
`vite.config.ts:37-50` self-alias set is *generated from* `package.json#exports` by anchored regex,
so a demo import that a published consumer could not write cannot resolve either. This is the
correct construction and it is working. **No false proof of the public API from this component.**

---

## 2. Findings

### L-1 · **BLOCKER** — the component is homed one directory above its only consumer; `Dock.vue:15` is the sole upward SFC edge out of the `dock/` module

**Evidence.**

`demo/shell/` contains, besides `dock/`:

```
$ ls demo/shell/
PaneSegmentedControl.vue   PaneSlot.vue   dock/
usePaneRouter.ts           useViewManager.ts   viewSchema.ts
```

`PaneSlot.vue`, `usePaneRouter.ts`, `useViewManager.ts`, `viewSchema.ts` are genuinely
shell-scoped: each has multiple consumers across `demo/picker/`, `demo/palettes/`,
`demo/color-picker/`, `demo/shell/dock/`. `PaneSegmentedControl.vue` has one consumer, and that
consumer is *inside* `dock/`.

Enumerating every `../`-parent import from every SFC under `demo/shell/dock/`:

```
$ grep -rn 'from "\.\./[^/]' demo/shell/dock/*.vue demo/shell/dock/*/*.vue
demo/shell/dock/Dock.vue:15:  import PaneSegmentedControl from "../PaneSegmentedControl.vue";   ← SFC
demo/shell/dock/Dock.vue:17:  import { VIEW_MANAGER_KEY } from "../useViewManager";              ← key
demo/shell/dock/Dock.vue:24:  import type { DockActionBar } from "../usePaneRouter";             ← type
demo/shell/dock/layers/GenericActionBar.vue:3: import ActionButton from "../ActionButton.vue";   ← intra-dock
demo/shell/dock/layers/ActionBarLayer.vue:6-7: ActionToolbar, ColorInput from "../"              ← intra-dock
  … (all remaining rows resolve to ../../ui, ../../color-session, ../../palettes, ../../platform)
```

Every other `../…Vue` edge from inside `dock/` is **intra-module** (`layers/` → `dock/`). Every
other `../` edge out of `dock/` carries a **key or a type**, never a component. `Dock.vue:15` is
the **unique case of `dock/` reaching outside its own module for a component**.

The component's own `<style>` block declares who owns it —
`demo/shell/PaneSegmentedControl.vue:39-40`:

> *"This control lives inside the dock's mobile aperture (312px at 390w)"*

and `Dock.vue:192` doubles down: *"the mobile separator PAIR is dropped … design-dock-shell P0-2"*.
Both comments describe dock geometry. The file is dock furniture stored outside `dock/`.

**Root cause, with the commit.** This is not drift — it is a single mis-homing decision:

```
$ git show --name-status --find-renames --format="" 6dc12aad | grep -i segmented
R100    demo/@/components/custom/panes/PaneSegmentedControl.vue  demo/shell/PaneSegmentedControl.vue
```

`6dc12aad feat(v-w43b)!: panes/ 16→0 — distribute/promote/relocate to feature homes (RF-15 §b 3)`
was a pure `R100` rename, zero content change. The `panes/` folder was dissolved and its 16 files
distributed **to feature homes**; this one was routed by its *name* ("Pane…" ⇒ the pane/shell
layer) rather than by its *consumer* (the dock). W43b's own stated rule — "feature homes" — was
correctly applied 15 times and mis-applied once, here.

**Reproduction.** `grep` above; deterministic, no runtime needed.

**Mechanism.** Placement by lexical name instead of by consumer set. A module boundary that a
component's name can override is not a boundary.

---

### L-2 · **MAJOR** — three disagreeing responsive authorities govern this one control; the width-only hazard `shell.css` was written to cure is re-instantiated inside the component

**Evidence — three authorities, three different mechanisms, three different predicates:**

| # | Authority | File:line | Mechanism | Predicate |
|---|---|---|---|---|
| 1 | **Visibility** | `demo/styles/shell.css:123` | global CSS on a JS-written layout stamp | `[data-layout="desktop"]` = `min-width:1024px` **and** `min-aspect-ratio:1.1` |
| 2 | **Density** | `demo/shell/PaneSegmentedControl.vue:46-50` | component-scoped `@media` | `max-width: 639px` (**width only**) |
| 3 | **Sibling furniture** | `demo/shell/dock/Dock.vue:71` | `useMediaQuery` | `min-width: 1024px` (**width only**) |

`shell.css:118-122` states, in its own comment, the exact bug it exists to fix:

> *"The mobile pane switcher (Dock.vue's PaneSegmentedControl) is mobile-grammar only — hidden on
> desktop, shown on the portrait band so BOTH panes stay reachable at 1024×1366 (**the width-only
> `lg:hidden` it replaced marooned the second pane there**)."*

The component then re-introduces a width-only rule one level down, for its own density.

**Reproduction — measured live, `http://localhost:9000/#/gradient` @ 1024×1366 (the named band):**

```js
{ viewport: [1024, 1366],
  dataLayout: ["DIV:mobile"],        // ← authority 1 says MOBILE → control visible
  wrapperDisplay: "block", wrapperVisible: true, controlPresent: true,
  mq639: false,                      // ← authority 2 does NOT fire → no compact rung
  mq1024: true,                      // ← authority 3 says DESKTOP → siblings desktop-mode
  mqDesktopGrammar: false,
  tabPadding: "5px 12px", tabFontSize: "14px",
  tabBox: { w: 82.3, h: 31 } }
```

`5px 12px / 14px` is glass-ui's **≥640px desktop rung** verbatim
(`node_modules/@mkbabb/glass-ui/dist/components/tabs/styles/segmented.css:1` —
`@media (min-width:640px){ .segmented-tab{ padding:0.3125rem 0.75rem; font-size:0.875rem } }`).

Contrast the same probe at 390×844, `/#/palettes`:

```js
{ rootBox: { w: 121, h: 32.3 },
  tabs: [ { text:"Picker",   box:{w:57.5,h:26.3}, style:{padding:"4px 6px", fontSize:"12.179px"} },
          { text:"Palettes", box:{w:57.5,h:26.3}, style:{padding:"4px 6px", fontSize:"12.179px"} } ] }
```

**So: at 1024×1366 portrait the control renders at desktop density, inside a dock the layout stamp
has declared mobile, beside siblings that `isDesktop` has put in desktop mode.** Three answers to
one question. Not a visual break at that width (the aperture is wide enough; the visual audit
reports `horizontalOverflow: 0` across all 60 captures) — it is a *structural* incoherence that
will produce a break the moment the aperture narrows or the label set widens.

**Mechanism.** The control's responsive contract is split across three files and three
mechanisms with no single predicate. Nothing in the type system or the build can notice they
disagree.

---

### L-3 · **MAJOR** — `:deep(.segmented-tab)` reaches into a glass-ui-private class to synthesize a density variant glass-ui does not expose (edicts 4 + 5)

**Evidence.** `demo/shell/PaneSegmentedControl.vue:46-50`:

```css
@media (max-width: 639px) {
    .pane-segmented-control :deep(.segmented-tab) {
        padding: 0.25rem 0.375rem;
        font-size: var(--type-caption);
    }
}
```

`.segmented-tab` is **not** part of glass-ui's published contract. It is an internal class
emitted by the compiled SFC —
`node_modules/@mkbabb/glass-ui/dist/tabs.js:262` and `:294` (`class: "segmented-tab"`) — and
styled by the producer's own private stylesheet
(`dist/components/tabs/styles/segmented.css:1`). The component's own comment at `:42` admits the
reach: *"the producer's own `.segmented-tab` hook."* It is a hook the producer never declared.

The full `SegmentedTabsProps` surface
(`node_modules/@mkbabb/glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts:45-95`) is:
`options · ariaLabel · variant · semantics · activation · orientation · responsive · motion ·
class`. **There is no `size`, `density`, or `compact` prop.** The variant the demo needs does not
exist upstream, so the demo forged it locally out of the producer's internals.

**Reproduction.** The override lands and wins — measured at 390×844:
`padding: "4px 6px"` (= `0.25rem 0.375rem`) instead of glass-ui's `0.25rem 0.625rem`;
`fontSize: "12.179px"` resolved from `--type-caption` = `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)`.
Tab width 57.5px vs. an unoverridden ≈65.5px — the override buys **16px of aperture** and that is
real, load-bearing space in the 312px mobile pill. The need is genuine; the *location* is the
defect.

This is simultaneously an **edict-4 violation** (a design-system variant living in demo/ instead
of glass-ui) and an **edict-5 violation** (per-instance override instead of root-level styling).
It is also a **silent-breakage vector**: any glass-ui release that renames `.segmented-tab` or
reorders its media rungs breaks this control with no typecheck, no test, and no CI signal —
exactly the class of failure the N-tranche `BouncyTabs → SegmentedTabs` break already inflicted on
this same file (`docs/tranches/N/audit/impl/W1A.md:37`).

Per the standing **BH/BI relay edict**, the cure requires a glass-ui ask (see §5).

---

### L-4 · **MAJOR** — four stacked null guards for one schema invariant, including a masking `?? ''` that would silently blank the control

**Evidence — the invariant.** `demo/shell/viewSchema.ts:70-74`:

```ts
export interface PaneConfig {
    left: LeftPane;
    right: RightPane;          // "about" | "palettes" | "mix" | "blob" | null
    label: string;
    leftLabel: string;         // ← NEVER null
    rightLabel: string | null;
}
```

Across all 14 rows of `VIEW_MAP` (`viewSchema.ts:98-227`), `right === null` **iff**
`rightLabel === null` — exactly one row, `atmosphere` (`:161-169`), has both. `leftLabel` is a
non-empty string in all 14.

**Evidence — the four guards for that one fact:**

| # | Site | Guard | Status |
|---|---|---|---|
| 1 | `Dock.vue:197` | `v-if="…currentConfig.value.right !== null"` | live |
| 2 | `Dock.vue:200-201` | `:left-label="…leftLabel ?? ''"` · `:right-label="…rightLabel ?? ''"` | **dead + hostile** |
| 3 | `PaneSegmentedControl.vue:3` | `v-if="leftLabel && rightLabel"` | dead (given 1) |
| 4 | `PaneSegmentedControl.vue:31-32` | `{ label: leftLabel ?? "", … }` ×2 | dead (given 3) |

Guard 2 is the hostile one. `?? ''` converts *absent* into *empty string*; guard 3 tests
truthiness, and `''` is falsy. **So if guard 1 were ever relaxed — or if a future `VIEW_MAP` row
gained `right: "palettes"` with `rightLabel: null` — the control would not error, would not warn,
would not render a partial strip: it would silently render nothing at all.** That is precisely the
masking fallback edict 2 forbids.

Guard 4 is unreachable behind guard 3 and would produce a blank-labelled tab if it ever ran.

**Evidence — the props contradict the schema.** `PaneSegmentedControl.vue:22` declares
`leftLabel: string | null`. `PaneConfig.leftLabel` is `string`. The component widened a type its
only supplier narrows, then wrote two coalescing operators to service a null that cannot arrive.

**Reproduction.** NONE — this is a latent-defect finding, correctly labelled: guards 2/3/4 are
currently unreachable behind guard 1. The *dead code* and the *type contradiction* are
present-tense and verified by the citations above.

**Mechanism.** `PaneConfig` models one fact ("this view has a second pane") as **two independently
nullable fields** (`right`, `rightLabel`). Because the type system permits them to disagree, every
consumer defensively re-checks, and the checks accumulate. The guards are a symptom; the
two-field encoding is the defect.

---

### L-5 · **MINOR** — the accessible name glass-ui offers is not passed; the strip ships as an unnamed `role="group"`

**Evidence — measured live at 390×844, `/#/palettes`:**

```js
{ stripTag: "DIV", stripRole: "group", stripAriaLabel: null,
  stripClasses: "segmented-tabs segmented-tabs--pill glass-capsule-track font-display",
  tabs: [ { text:"Picker",   role:null, ariaPressed:"false", ariaControls:null },
          { text:"Palettes", role:null, ariaPressed:"true",  ariaControls:null } ] }
```

`SegmentedTabsProps.ariaLabel` exists — `SegmentedTabs.vue.d.ts:50`:
*"Accessible name shared by the desktop strip and responsive Select."* The component passes
`variant` and `options` and omits it. Naming a group is the **consumer's** responsibility (only the
consumer knows what the group switches); glass-ui exposed the prop and the demo dropped it. That
is an ownership miss, on-axis for L: the boundary was drawn correctly upstream and not honoured
downstream.

`SegmentedTabOption.controls` (`SegmentedTabs.vue.d.ts:11-16`) is likewise unused — but pill
defaults to `semantics:"toggle"`, and `controls` is documented as ignored under toggle semantics,
so that omission is correct. Noted so the finding is not over-claimed.

**Reproduction.** The probe above. `REPORT.json` records `namelessButtons: 0` for this route —
the *buttons* are named by their text; it is the **group wrapper** that is anonymous, which that
probe does not test. This is a net-new finding the visual audit did not surface.

---

### L-6 · **MINOR** — a dead back-compat type re-export sits in the module that supplies this component's data (edict 2)

**Evidence.** `demo/shell/useViewManager.ts:15-18`:

```ts
// Re-export the schema types so existing consumers that import from
// `@composables/useViewManager` continue to resolve cleanly (the schema is
// the single source of truth; this re-export preserves source-compat with
// the pre-D.W3-Lane-D import paths).
export type { ViewId, LeftPane, RightPane, PaneConfig };
```

Self-described **source-compat preservation for retired import paths** — a legacy alias, which
edict 2 forbids outright. Worse, the `@composables/*` alias it names no longer exists: `W43 (RF-15)
killed the demo @… path aliases` (`vite.config.ts:68`).

Measured consumer census:

```
$ grep -rn "LeftPane\|RightPane" demo/ --include="*.vue" --include="*.ts"
demo/shell/useViewManager.ts:9,10,18   ← the shim itself
demo/shell/viewSchema.ts:5,52,66,70,71 ← the real home
```

`LeftPane` and `RightPane` are re-exported for **zero** consumers. `ViewId` and `PaneConfig` have
three live consumers each routing through the shim rather than the schema
(`dock/composables/useDockAdminMode.ts:5`, `color-picker/composables/boot/useAtmosphereBoot.ts:55`,
`palettes/usePalettePorts.ts:19`) — the shim is not merely dead, it is **actively sustaining the
wrong import direction** for three modules.

On-axis: `useViewManager`/`viewSchema` is the module that owns `leftLabel`/`rightLabel`/
`mobilePaneIndex` — i.e. every single input to the subject component. Its boundary is the one
L-4's cure must land on.

---

### L-7 · **INFO** — the `0|1 ↔ "0"|"1"` adapter with an unchecked assertion is the component's only real logic

**Evidence.** `PaneSegmentedControl.vue:9,11`:

```
:model-value="String(modelValue)"
@update:model-value="(v) => emit('update:modelValue', Number(v) as 0 | 1)"
```

`SegmentedTabs` models `modelValue: string` (`SegmentedTabs.vue.d.ts:97-99`); `mobilePaneIndex` is
`Ref<0 | 1>` (`useViewManager.ts:23`). The adapter is correct **today** only because
`tabOptions` hardcodes `value: "0" | "1"` (`:31-32`). `Number(v) as 0 | 1` is an unchecked
assertion — add a third option and it silently produces `2` typed as `0 | 1`, corrupting
`paneOverride` (`useViewManager.ts:62-72`) with no error anywhere.

Strip the four dead guards (L-4) and the CSS reach (L-3), and **this adapter is the entire
component**: a type coercion, two literal strings, and two props. That is not a module.

---

### Negative proofs (checked, clean — recorded so the report is not one-sided)

| Claim | Verdict | Evidence |
|---|---|---|
| Deep-imports `src/` internals | **CLEAN** | zero `src/`, `@src/*` or relative-`src` imports; only imports are `vue` + `@mkbabb/glass-ui/tabs` |
| Imports value.js off the export map | **CLEAN** | imports value.js not at all; `grep -c 'from "@mkbabb/value.js"' demo/` = 0, and no `"."` root export exists — the two facts agree |
| God module | **CLEAN** | 52 lines, 18 of them a `<style>` comment; the opposite failure — too small to be a module (L-7) |
| Second implementation of this concept | **CLEAN** | 3 `SegmentedTabs` sites total (`workbenches/mix/MixSourceSelector.vue:105`, `palettes/browser/admin/AdminNamesPanel.vue:14`, this file); each models a **different** domain; only this file wraps it. `ActionBarLayer`'s `useLayerTransition` shim, `palettes/export.ts` vs `usePaletteExport.ts`, and the three `useDark` stores were checked — none touch this component's graph |
| Vue 3.5 idioms (edict 7) | **CLEAN** | reactive props destructure at `:20` is the correct 3.5 form; no `defineModel` async round-trip here, so no `shallowRef` need; no template ref needed |
| `verbatimModuleSyntax` (edict 8) | **CLEAN** | both imports are value imports; vacuously satisfied |
| Animations deleted (edict 6) | **CLEAN** | no keyframes here; glass-ui owns the indicator motion (`segmented.css` `.segmented-indicator--js`) |
| `class="font-display"` at `:10` | **CLEAN — deliberately not charged** | `class` is a **declared prop** (`SegmentedTabs.vue.d.ts:94`) and `.segmented-tab { font: inherit }` (`segmented.css:1`) is the producer's designed inheritance hook. Measured `fontFamily: "Fraunces…"` on both tabs — the mechanism works as glass-ui intends. This is sanctioned use of the public surface, **not** an edict-5 violation, and must not be swept up with L-3 |

---

## 3. The one thing I would fix first

**L-1 + L-7 together, executed as one deletion.** The file has one consumer, no public surface, no
concept it uniquely owns, and 52 lines that reduce to a type coercion. Every other finding either
lives inside it (L-3, L-4, L-5, L-7) or is only reachable by moving its boundary (L-2, L-6). Delete
it and five of seven findings have nowhere left to stand.

---

## 4. What the module lattice should be, greenfield

The concept in play is **"which of this view's two panes is showing on mobile."** It already has
exactly one home, and it is not this file:

```
demo/shell/viewSchema.ts     — pure data + types. Owns the pane pair and its labels.
demo/shell/useViewManager.ts — route-derived reactive state. Owns mobilePaneIndex + currentConfig.
demo/shell/dock/Dock.vue     — renders the dock. Owns the aperture.
@mkbabb/glass-ui/tabs        — owns the segmented control, all materials and densities.
```

Four homes, all pre-existing. `PaneSegmentedControl.vue` is a fifth that owns nothing. The correct
lattice is the four, with two boundaries repaired:

**(a) `viewSchema` — make the invariant unrepresentable-otherwise.**
Fuse the two independently-nullable fields into one nullable pair, so `right === null` and
`rightLabel === null` cannot disagree *by construction*:

```ts
export interface PaneConfig {
    left: LeftPane;
    leftLabel: string;
    right: { pane: RightPane; label: string } | null;   // was: right + rightLabel
    label: string; icon: Component; accentHueShift: number;
    defaultPaneIndex?: 0 | 1;
}
```

Three of L-4's four guards become **type errors** rather than review findings, and the `?? ''`
masking fallback has nothing left to mask. `RightPane` also loses its `| null` member, which is
the correct shape — "no right pane" is a property of the *slot*, not of the pane identity.

**(b) `useViewManager` — derive the strip once, where the state already lives.**
`ViewManager` already owns `mobilePaneIndex` and `currentConfig`. Add the one derived value the
dock needs, keeping `viewSchema` pure (no reactivity, no glass-ui) exactly as its header promises:

```ts
// on ViewManager
paneTabs: Ref<readonly { label: string; value: "0" | "1" }[] | null>;

const paneTabs = computed(() => {
    const c = currentConfig.value;
    return c.right === null
        ? null
        : ([{ label: c.leftLabel, value: "0" },
            { label: c.right.label, value: "1" }] as const);
});
```

Structurally assignable to `SegmentedTabOption[]`, so glass-ui stays out of the state module. Note
this adds **no logic to `Dock.vue`** (359 lines — not a god module yet, and edict 1 says do not
make it one).

**(c) `Dock.vue` — the render site becomes declarative, ~7 lines, zero derivation, one guard.**

```vue
<div v-if="viewManager.paneTabs.value" class="dock-mobile-panes">
    <SegmentedTabs
        :options="viewManager.paneTabs.value"
        :model-value="String(viewManager.mobilePaneIndex.value)"
        density="compact"
        aria-label="Visible pane"
        class="font-display"
        @update:model-value="(v) => (viewManager.mobilePaneIndex.value = Number(v) as 0 | 1)"
    />
</div>
```

`demo/shell/PaneSegmentedControl.vue` is **deleted**; `Dock.vue:15` and the upward SFC edge go with
it. W47's `1→0` is satisfied by deletion, which is what the gate meant.

**(d) glass-ui — the density variant belongs upstream (BH relay).**
`density?: "default" | "compact"` on `SegmentedTabsProps`, emitting
`.segmented-tabs--compact` and owning the tightened `.segmented-tab` rung internally. That kills
the `:deep` reach (L-3) at its root and gives the same need — a segmented strip inside a narrow
chrome aperture — a first-class answer any consumer can use. This is the only piece that cannot
land inside this repo; per the standing BH/BI relay edict it goes to the active glass-ui inbox as a
component-level ask, with the measured 16px aperture saving as its justification.

**(e) `useViewManager` — delete the re-export shim (L-6)** and repoint the three live
`ViewId`/`PaneConfig` importers at `./viewSchema`. `LeftPane`/`RightPane` have zero consumers and
just go.

**(f) One responsive authority, not three (L-2).**
With (d) landed, the density rung is glass-ui's and is expressed against the *component's own*
container, not the viewport. That leaves the layout stamp (`[data-layout]`, aspect-aware) as the
single app-side authority for **both** visibility and grammar — which is what `shell.css:118-122`
already argues for in prose. `Dock.vue:71`'s width-only `isDesktop` should read the same stamp;
it currently disagrees with it at 1024×1366 by measurement.

**Net:** one file deleted, one type fused, one derived ref added, one shim removed, one upstream
prop asked for. Five modules become four. Every finding in §2 is discharged by structure rather
than patched in place.

---

## 5. Finding table

| ID | Severity | Defect | Reproduction |
|---|---|---|---|
| L-1 | BLOCKER | Homed one level above its only consumer; sole upward SFC edge out of `dock/`; origin is the `R100` rename in `6dc12aad` | `grep` (deterministic) |
| L-2 | MAJOR | Three disagreeing responsive authorities; width-only density re-instantiates the hazard `shell.css:118` cured | live probe @1024×1366 |
| L-3 | MAJOR | `:deep(.segmented-tab)` forges a density variant out of glass-ui internals; no `density` prop exists upstream | live probe @390×844 |
| L-4 | MAJOR | Four stacked null guards; `?? ''` + falsy-`''` test is a silent-blank masking fallback; props widen a type the schema narrows | NONE (latent) |
| L-5 | MINOR | `ariaLabel` offered by glass-ui, not passed; strip is an unnamed `role="group"` | live probe @390×844 |
| L-6 | MINOR | Dead back-compat type re-export in the supplying module; 2 of 4 types have zero consumers | `grep` |
| L-7 | INFO | Unchecked `Number(v) as 0\|1` adapter is the component's entire content | inspection |

---

*Report: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/shell-panesegmentedcontrol/challenge-L-library.md`*
*No source edits made. Browser probes read-only.*
