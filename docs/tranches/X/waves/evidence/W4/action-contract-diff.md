SERVED MODEL: claude-opus-5[1m]

# X-W4 · X.W4.d — §8 artefact 6 · `action-contract-diff.md`

`W4.md:435-437` names this artefact's three contents exactly: *"the
`SceneActionSet` definition, the deleted-symbol list (`ActionBarContext`,
`DockActionBar`, three pane refs, nine `?.()` sites), and the `any` count
before/after."* All three are below, each quoted by the command that produced
it and **double-run** (both runs printed identical values).

- **Branch** `tranche-u` · **cure commit** `e64002e9` · **pre-cure bytes**
  `f7422794` (this unit's files were byte-unchanged from the wave's open until
  `e64002e9`; `f7422794` is simply its parent).
- **Born-RED first**: the gate spec landed at **`5406a111`**
  *"the scene-action contract gate — BORN-RED, 8 of 8 failing before one product
  byte"*, before any product byte of this unit.

---

## 1. The `SceneActionSet` definition

Home: `demo/color-session/keys.ts` — beside the injection keys both ends already
share. It is **not** in `shell/usePaneRouter.ts`, because homing it there would
point `picker/ColorPicker.vue` at a module that imports the picker.

### 1.1 The token union — a CLOSED set, never `string`

```ts
export type SceneActionToken =
    | "color.reset"
    | "color.copy"
    | "color.random"
    | "color.palettes"
    | "color.extract"
    | "generate.regenerate"
    | "generate.save"
    | "generate.copyColors"
    | "gradient.reset"
    | "gradient.copyCSS"
    | "gradient.seedFromPalette"
    | "mix.clearSelection"
    | "mix.startMix"
    | "mix.copyResult";
```

**14 tokens** ⟨cmd⟩ `grep -c -E '^    \| "[a-z]+\.[A-Za-z]+"' demo/color-session/keys.ts` → `14`
(double-run: `14` · `14`). D3's falsifier demonstrates that this union is
enforced rather than decorative — see `d-falsifier.txt`.

### 1.2 The state union — TOTAL, which is what makes silence unrepresentable

```ts
export type SceneActionState =
    | { readonly kind: "ready"; readonly run: () => void }
    | { readonly kind: "blocked"; readonly reason: string }
    | { readonly kind: "unavailable"; readonly reason: string }
    | { readonly kind: "failed"; readonly detail: string; readonly run: () => void };
```

There is no fifth answer and **no `undefined`**. `resolve()` in
`shell/usePaneRouter.ts` returns one of these four on every path, so the renderer
has no branch on which it can paint a seat without a modelled state. That is
`W4.md` §2's *"an action that silently does nothing becomes unrepresentable"*,
spelled as a type.

### 1.3 The set the Dock consumes

```ts
export interface SceneAction {
    readonly token: SceneActionToken;
    readonly icon: Component;
    readonly title: string;
    readonly description: string;
    readonly rotateOnClick?: boolean;
    readonly iconClass?: string;
    readonly active?: boolean;          // AB-32's carried member
    readonly state: SceneActionState;
}

export interface SceneInputArm {
    readonly canProposeName: boolean;   // the Picker's edit arm, IN the contract
}

export interface SceneActionSet {
    readonly scene: SceneActionScene;   // "color" | "generate" | "gradient" | "mix"
    readonly label: string;
    readonly icon: Component;
    readonly actions: readonly SceneAction[];
    readonly input?: SceneInputArm;
}
```

Two riders are discharged **inside the type**, not beside it:

- **AB-32** — `SceneAction.active`. The pre-collapse `ActionToolbar.vue:46` fed
  the palette-open indicator through an `:active-style` that `DockAction` had no
  member for; a collapse without this field would have regressed the only
  palette indicator under a green gate. The spec's last test is its fence.
- **`W4.md` §3a's D1 trigger** — *"D1 if a single `SceneActionSet` cannot express
  the Picker's edit-mode arms without an escape hatch"*. It can: `input` is an
  optional member of the set. Its presence mounts the dock's colour-input
  sub-layer and its mode toggle; its absence is why a workbench bar carries
  neither. **No escape hatch was needed and none was taken**, so the §3a
  triumvirate trigger did **not** fire.

### 1.4 The typed registry that replaced the three `ref<any>`

```ts
export interface ScenePaneTargetMap {
    generate: GenerateSceneTarget;
    gradient: GradientSceneTarget;
    mix: MixSceneTarget;
}
export type ScenePane = keyof ScenePaneTargetMap;
export type ScenePaneTargets = { readonly [S in ScenePane]: ScenePaneTargetMap[S] | null };
```

`readScenePaneTarget(scene, instance)` (`shell/usePaneRouter.ts`) verifies the
instance actually exposes that scene's commands before it will call it
registered, so *registered* is a **measured fact**, not an assumption: a pane
that renames a member never registers, and the contract surfaces it as
`unavailable` instead of degrading to a dead button.

---

## 2. The deleted-symbol list

`W4.md:436` enumerates four items; all four are gone, and two further symbols
went with them.

| # | symbol | was at | verdict |
|---|---|---|---|
| 1 | `export interface ActionBarContext` (9 members) | `demo/color-session/keys.ts:17` | **DELETED** |
| 2 | `export interface DockActionBar` | `demo/shell/usePaneRouter.ts:58` (spec cites `:49`; **DRIFTED** by `504819ea`, re-read live) | **DELETED** |
| 2b | `export interface DockAction` | `demo/shell/usePaneRouter.ts` (the row type of 2) | **DELETED** |
| 2c | `export interface PaneActionRefs` | `demo/shell/usePaneRouter.ts` (the three-`Ref<any>` bag) | **DELETED** |
| 3 | `generatePaneRef` · `gradientPaneRef` · `mixPaneRef` | `demo/color-picker/App.vue:317-319` | **DELETED** (3 of 3) |
| 4 | the nine `paneRefs.X.value?.y?.()` dispatches | `demo/shell/usePaneRouter.ts:196-222` | **DELETED** (9 of 9) |
| 5 | the Picker-priority render fork `v-if="actionBar"` / `v-else-if="genericBar"` | `demo/shell/dock/Dock.vue:156-157` | **DELETED** — one render path |

**Three of `ActionBarContext`'s nine members could never change a rendered
byte**, and they are named rather than quietly dropped: `cssColorOpaque` and
`formattedCurrentColor` were never read by the bar (it takes the `SAFE_ACCENT`
ink, and the input sub-layer reads the pipeline itself), and `colorModel` was
re-`provide`d under `COLOR_MODEL_KEY` — a key `App.vue` already provides with
**the same object**.

**`ActionToolbar.vue` leaves the render path and stays on disk.** Nothing imports
it ⟨cmd⟩ `grep -rn "ActionToolbar" demo --include='*.vue' --include='*.ts' | grep -v '^demo/shell/dock/ActionToolbar.vue'`
→ **4** hits (double-run: `4` · `4`), all **prose in comments**
(`usePaneRouter.ts:373`, `GenericActionBar.vue:8` and `:76`, `keys.ts:164`).
It is not deleted because (a) `W4.md` §4
grants this unit `modify`, not `delete`, and (b) `test/picker-blob-config.test.ts:50-51`
**reads this file's source** and pins two occurrence counts in it, while `W4.md:175`
puts `test/**` on the Do-NOT-touch list. The one-line repair for the wave that owns
both surfaces is recorded in the SFC's own header. Measured intact:
⟨cmd⟩ `npx vitest run test/picker-blob-config.test.ts` → **3 passed**.

### 2.1 The one render path, measured

```text
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/scene-action-contract.spec.ts
  exactly ONE [data-testid="scene-action-row"] in the document, on every scene
  color     → 5 seats  color.reset · color.copy · color.random · color.palettes · color.extract
  generate  → 3 seats  generate.regenerate · generate.save · generate.copyColors
  mix       → 3 seats  mix.clearSelection · mix.startMix · mix.copyResult   (zero color.* seats)
```

The mix row is the D1 defect's direct witness: `VIEW_MAP.mix` is
`left: "color-picker", right: "mix"`, the one view where **both** contracts
existed, and where the Picker priority masked the scene bar on every desktop
load. The before/after frames `action-bar-mix-desktop-{before,after}.png` show
it: **before**, `/#/mix` renders the picker's five seats plus the input toggle;
**after**, it renders the mix set's three.

---

## 3. The `any` count, before and after

Scope = `W4.md` §5 "X.W4.d"'s own Files enumeration (the wave's definition of
*the action-path files*), less `ColorPicker.vue` — see §3.2.

```text
⟨cmd⟩ grep -o -E '(<any>|: any[^A-Za-z]|as any[^A-Za-z])' <the 7 action-path files> | wc -l
run1: any_before=8  any_after=5     run2: any_before=8  any_after=5
```

**BEFORE — 8 type-level sites** (the wave baseline's divergence **d-2**
reproduces exactly: the spec's *"10"* counted two English-prose words, and the
operative eslint number is 8):

```text
App.vue:317  const generatePaneRef = ref<any>(null);
App.vue:318  const gradientPaneRef = ref<any>(null);
App.vue:319  const mixPaneRef      = ref<any>(null);
App.vue:323  function onDesktopLeftMount(el: any) {
App.vue:330  function onDesktopRightMount(el: any) {
usePaneRouter.ts:142      generate: Ref<any>;
usePaneRouter.ts:143      gradient: Ref<any>;
usePaneRouter.ts:144      mix: Ref<any>;
```

**AFTER — 0 type-level sites.** All five remaining hits are the *word* `any`
inside prose that quotes the retired code (`App.vue:350`, `:383`, `keys.ts:32`,
`:130`, `usePaneRouter.ts:211` — each of the form ``the three `ref<any>` ``).
Recorded so no closing seat is told to delete a comment.

### 3.1 The optional-chained dispatches

```text
⟨cmd⟩ grep -o -E '\?\.\(\)' demo/shell/usePaneRouter.ts | wc -l
run1: optchain_before=9  optchain_after=2     run2: optchain_before=9  optchain_after=2
```

**9 → 0 in code.** Both remaining hits are prose: `usePaneRouter.ts:135` and
`:292`, each naming the retired ``?.()`` in a comment.

### 3.2 `ColorPicker.vue` — the one scoped-out file, stated not hidden

`W4.md` §5 lists `ColorPicker.vue` among unit d's files, but **§6 D2's own
command does not scope it** (`npx eslint demo/color-picker/App.vue
demo/shell/usePaneRouter.ts demo/shell/dock/**`) and its RED census never counted
it. Its single `any` is a display-space bridge on a `ColorSpaceSelector` that
types its `modelValue` as `string`; that selector is X-W6/X-W7's file. Its
action-path bytes — the `ColorSceneTarget` it now exposes — carry no `any`. The
eslint object therefore names the seven files D2 measures and **says in its own
comment why the eighth is absent**, rather than globbing it away.

### 3.3 D2's invocation, on the landed bytes

```text
⟨cmd⟩ npx eslint demo/color-picker/App.vue demo/shell/usePaneRouter.ts demo/shell/dock/   → EXIT 0
⟨cmd⟩ npx vue-tsc -p tsconfig.demo.json --noEmit                                          → EXIT 0, 0 lines
```

At the wave's open the same eslint command **also** read exit 0 — for the wrong
reason: the rule was `"off"` at `eslint.config.js:70` and `:184`. This unit adds
ONE object, last in the flat config (last match wins), arming
`@typescript-eslint/no-explicit-any` as an **error** over the action path and
nothing else; `eslint.config.js` is shared with X-W8 and X-W9, and the diff is
**+30 / −0** ⟨cmd⟩ `git show --stat e64002e9 -- eslint.config.js`. The rule is
shown to **bite** in `d-falsifier.txt`.
