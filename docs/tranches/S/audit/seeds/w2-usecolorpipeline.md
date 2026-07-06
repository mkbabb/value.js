# Seed w2-usecolorpipeline — the color-pipeline transposition spike

**Wave**: S.W2 · item **W2-1** · spec of record `docs/tranches/S/audit/SYNTHESIS.md §5` (transcribed in `docs/tranches/S/waves/S.W2.md`).
**Riskiest structural move retired**: the `useColorPipeline` transposition — collapse the picker's second `shallowRef` copy + the `defineModel` async round-trip into ONE App-owned model consumed directly, without breaking instant-update reactivity or the stableHue invariant.
**Verdict**: **VIABLE_WITH_AMENDMENTS**.

---

## §Intent (exact spec cite)

SYNTHESIS §5 / S.W2.md W2-1, verbatim:

> **`useColorPipeline`**: ONE model (the picker's second `shallowRef` copy retired or reduced to a pure injected consumer — resolve the `defineModel` staleness at the source, per no-backwards-compat); ONE derivation set (`cssColor`/`cssColorOpaque`/`savedColorStrings`/`safeAccentCss` — deleting the byte-identical `cssColorOpaque` twin and the DIVERGED `savedColorStrings` twin); **persistence precedence declared: URL-hash-wins-on-load** …; one `applyTokens` sink for the 4 root-token writes; keep the composable ≤400 LoC.
> Anchors: `useColorModel.ts:39-65,69-108,154-163`; `useAppColorModel.ts:18-37,74-91`; `App.vue:131-177`.

Task cut: build the skeleton composable(s), transpose ONE representative consumer (a picker slider) end-to-end, and PROVE — vue-tsc clean; the stableHue invariant preserved (cite the exact mechanism, file:line); instant-update reactivity intact on the slider-drag path. Report the TRUE blast radius against the wave doc's estimate.

No-workaround prohibitions honored: no framework invention (idiomatic Vue provide/inject only); no backwards-compat shim (the `defineModel` staleness is resolved at the source — the second model copy DIES, it is not kept as a synced twin).

---

## §What was built (file:line map)

The transposition was carried end-to-end for the picker + one representative leaf consumer (the L-channel slider). Patch: `w2-usecolorpipeline.patch` (5 files, +421/-15).

| File | Change |
|---|---|
| **`demo/@/composables/color/useColorPipeline.ts`** (NEW, **397 LoC**) | The ONE spine. Merge of `useColorModel` (picker derivations + stableHue + sub-composable wiring) and `useAppColorModel` (storage write-through + `resetToDefaults` + `applyColorString`), retargeted to the App-owned `ShallowRef<ColorModel>` with **no local copy**. Exports `UseColorPipelineReturn` (superset of both former returns). |
| `demo/color-picker/App.vue:133-149` | `useAppColorModel(model)` → `useColorPipeline(model)`; `provide(COLOR_MODEL_KEY, pipeline)`. App is the single provider of the color-state seam. |
| `demo/@/components/custom/color-picker/ColorPicker.vue:102-113` | **the core move**: `const model = defineModel<ColorModel>()` + `const colorModel = useColorModel(model)` + `provide(COLOR_MODEL_KEY, colorModel)` → `const colorModel = inject(COLOR_MODEL_KEY)!; const { model } = colorModel;`. `defineModel` and the local `useColorModel` copy are gone; the picker is a pure injected consumer. |
| `demo/@/components/custom/color-picker/keys.ts:2-5,17` | `COLOR_MODEL_KEY` + `ActionBarContext.colorModel` retyped `UseColorModelReturn` → `UseColorPipelineReturn`. |
| `demo/@/composables/usePaneRouter.ts:128-136` | color-picker `leftProps` drops the now-dead `modelValue` / `onUpdate:modelValue` prop wiring (the picker no longer takes a model prop). |

**Key mechanisms in `useColorPipeline.ts`** (cite for review):
- **ONE model, synchronous writes** — `updateModel` (`:60-65`): `next = {...model.value, patch}; lastWrittenModel = next; model.value = next`. `model` IS App's shallowRef; the write is synchronous, so every `computed` reading `model.value` recomputes on next access. No prop→emit round-trip exists to be stale against.
- **stableHue invariant, preserved bit-for-bit** — init at `:75` (`ref(initHsv.value.h.value)`); the external-origin refresh watch at `:78-98` with the `s*v>0.01` guard; the hue-drag explicit set inside `updateColorComponent` at `:232-235`; consumed by `HSVCurrentColor` at `:126-130` (`hsv.value.h.value = stableHue.value`) and threaded into `useColorParsing`/`useSliderGradients`. See §Risks retired for the equivalence argument.
- **the internal-vs-external discriminator** — the `lastWrittenModel` sentinel (`:57`, guarded at `:83`) is what distinguishes a self-originated write (slider) from an external one (URL/palette/reset). This is the SAME sentinel `useColorModel.ts:44` already used; only the `model.value = {...ext}` copy line it sat beside was removed.
- **applyTokens sink** — `:293-305`: the color-owned root-token writes (`color-picker-bg` persistence + live-background reset), one function, one `watch(cssColorOpaque, …, {immediate})`.

Left in place (dead-for-picker, intentionally): `useColorModel.ts` (still exports `NORMALIZED_COLOR_NAMES`, consumed by `useColorUrl` + `useColorNameResolution`) and `useAppColorModel.ts`. The real wave deletes both function bodies and relocates `NORMALIZED_COLOR_NAMES`; the spike leaves them to keep the diff surgical + reversible.

---

## §Verdict — VIABLE_WITH_AMENDMENTS (with evidence)

The single riskiest structural move — retiring the second `shallowRef` copy + the `defineModel` round-trip — is **VIABLE**. Evidence:

1. **vue-tsc clean** — `npm run typecheck` (lib + demo, strict-zero gate) **EXIT 0** on the transposed surface. This is the strongest single proof: the injected shape lines up across App, the pane router, `ActionBarContext`, and all **10** `COLOR_MODEL_KEY` sites without a single leaf-consumer edit.
2. **Runtime wiring resolves** — worktree dev server (`:9001`, `dist/` symlinked from mainline since `src/` is untouched) rendered the picker fully off the injected pipeline: 4 channel sliders, thumb `aria-valuenow=0.92` (the default lab L), the channel rail, the HeroBlob WebGL canvas, `--accent-live` live. No injection errors. (The only 2 console errors are the production-API CORS block on localhost — environmental, unrelated.)
3. **Instant-update PROVEN live on the slider-drag path** — one real `Home` keypress on the focused L-channel thumb (→ reka-ui `@update:model-value` → `updateColorComponent(0,'l',true)` on the injected pipeline). Every derivation moved **synchronously, in lockstep**:

   | Signal | Before | After |
   |---|---|---|
   | L slider `aria-valuenow` (the model) | `0.92` | `0` |
   | `--slider-thumb-bg` (pipeline `cssColorOpaque`) | `lab(92% 88.80 20 / 100%)` | `lab(0% 88.80 20 / 100%)` |
   | URL (`useColorUrl` model→URL) | `color=lab(92%…)` | `color=lab(0%…)` |
   | `--accent-live` (App accent watch, same model) | `oklch(0.620…)` | `lab(0% 88.80 20 / 100%)` |

   The write landed on the App-owned ref via the injected pipeline and the whole ONE derivation set + URL sync + token sink recomputed — with **no second copy and no `defineModel`**.

**Why WITH_AMENDMENTS, not plain VIABLE**: the merged composable lands at **397 LoC — 3 lines under the 400 cap**, and that is *only* because 2 of the "4 root-token writes" (`--accent-live`, `--view-hue-shift`) were left App-scoped (they read `useContrastSafeColor` / `viewManager`, not this model). Folding them in — as W2-1's "one applyTokens sink for the 4 root-token writes" reads — would breach 400 and force a decompose. The two clauses ("4 writes → one sink" ∧ "≤400 LoC") are in tension; the wave must qualify one. Plus the blast radius exceeds the anchor list (below). None of these threaten viability; they refine the wave's own bounds.

---

## §Learnings

1. **The copy was never load-bearing for correctness — only for the round-trip.** `useColorModel`'s local `shallowRef` existed solely to give synchronous read-after-write against `defineModel`'s async parent emit (MEMORY.md caveat). Remove `defineModel` (inject the shared ref instead) and the copy is fully eliminable. The `lastWrittenModel` sentinel — which is what actually implements the internal-vs-external write distinction the stableHue invariant depends on — is orthogonal to the copy and stays. This is the crux the spike set out to test, and it holds.
2. **The transposition is invisible to leaf consumers.** 10 sites inject `COLOR_MODEL_KEY`; only the provider-swap site (`ColorPicker.vue`) changed. The other **9** (`ComponentSliders`, `SpectrumCanvas`, `ColorInput`, `ParseEchoReadout`, `HeroBlob`, `ColorSpaceSelector`, `ActionBarLayer`, + the `ActionBarContext` consumers) compile and run untouched because the pipeline return is a strict superset. The dock's `ActionBarLayer` reaches the pipeline via `actionBarContext.colorModel` (a prop it re-provides), NOT a direct inject — so App-provides-once is the correct topology and reaches both the pane subtree and the dock.
3. **The W2-1 "persistence precedence" P0 premise needs re-validation before the wave declares it.** Empirically, `colorStore` (localStorage `"color-picker"`) is **write-only** — no code path restores it into `model.value` on boot. The only boot-time model write is `useColorUrl.applyUrlToModel()`. So today: URL color → URL wins; no URL color → the `defaultColorModel` hot-pink (matching the S-18/W6-1 "stale hot-pink every cold load" finding). The spec's premise "localStorage clobbers AND rewrites the hash" is **not literally present** — there is no restore to do the clobbering. The precedence work is therefore *add the missing localStorage→model restore, gated behind URL-wins*, not *demote an existing clobber*. This dovetails with W6-1's boot-seed integrity and should be sequenced with it.
4. **`savedColorStrings` divergence is a live behavioral choice, not a no-op dedup.** The two twins produce *different strings*: `useColorModel`'s (per-space, `toFormattedString`) vs `useAppColorModel`'s (`.toString()` of the whole unit). The spike made the picker's per-space version canonical; that changes what the palettes pane displays (it consumed the `.toString()` version via `App → usePaneRouter deps.savedColorStrings`). Deleting the twin is feasible, but WHICH survives is a ratifiable decision with a visible consumer.
5. **`dist/` must exist for the demo to boot** — glass-ui's dist imports `@mkbabb/value.js` → the self-alias resolves to `dist/value.js`. A fresh worktree has none; symlinking mainline `dist/` works because `src/` is untouched. (Not a W2 finding — a worktree-ergonomics note.)

## §Risks retired

- **R1 — "collapsing the second copy breaks instant-update."** RETIRED. A shallowRef write + synchronous computed read is the same guarantee whether the ref is local or injected-shared; the copy only bought round-trip defeat, which is gone. Proven live (the `Home`-press table above).
- **R2 — "the `defineModel` staleness proves non-resolvable at the source" (the §Triumvirate non-local-gate trigger).** RETIRED. It IS resolvable at the source: the picker injects the App-owned ref, so no prop→emit round-trip exists to be stale against. No synced twin, no shim — the no-backwards-compat clause is satisfiable.
- **R3 — "the stableHue invariant can't survive without the external-sync copy watch."** RETIRED. The stableHue logic is preserved *bit-for-bit*: `useColorPipeline.ts:78-98` is `useColorModel.ts:43-56` minus only the `model.value = {...ext}` copy assignment; the `s*v>0.01` guard, the init (`:75`), the hue-drag explicit set (`:232-235`), and the `lastWrittenModel` skip (`:83`) are identical. The guard is what makes a non-hue slider drag skip the hue refresh (verified: the `Home` L-drag hit the `m===lastWrittenModel` skip path).
- **R4 — "the merge can't fit ≤400 LoC."** RETIRED for the derivation-set + storage + stableHue merge (397 LoC). NOT retired if all 4 token writes are folded in — see amendment 1.

## §Spec amendments suggested (exact clause edits)

1. **W2-1 `applyTokens` ∧ ≤400-LoC tension.** Current: "one `applyTokens` sink for the 4 root-token writes … keep the composable ≤400 LoC." The 4 writes are not homogeneous: 2 are color-model-derived (`color-picker-bg`, live-bg reset) and belong in the pipeline; 2 (`--accent-live`, `--view-hue-shift`) read `useContrastSafeColor` / `viewManager` and are NOT model derivations. Folding all 4 breaches 400. **Suggested edit**: "one `applyTokens` sink for the **color-model-derived** root-token writes (`color-picker-bg`, background reset); the `--accent-live` / `--view-hue-shift` writes stay App-scoped (they consume contrast/view state, not the color model) — or, if unified, the composable decomposes the token sink to a sibling `useColorTokens` and the ≤400 cap applies per-file."
2. **W2-1 anchor list under-counts the blast radius.** The anchors name `useColorModel.ts`, `useAppColorModel.ts`, `App.vue`. The real transposition also touches **`keys.ts`** (the injected `InjectionKey`/`ActionBarContext` type), **`usePaneRouter.ts`** (drop the dead model-prop wiring), and must **relocate `NORMALIZED_COLOR_NAMES`** (2 importers: `useColorUrl`, `useColorNameResolution`) when `useColorModel.ts` is deleted. **Suggested edit**: append these three sites to the W2-1 anchor cell so the wave's file-bounds table is complete. (All mechanical; still one commit.)
3. **W2-1 persistence-precedence premise.** Re-word "the P0: shared links are non-authoritative today — localStorage clobbers AND rewrites the hash" to reflect the tree: localStorage is **write-only** (no boot restore into the model); the precedence work is to *add* a localStorage→model restore gated behind URL-wins, sequenced with W6-1. See Learning 3.
4. **W2-1 `savedColorStrings` — name the survivor.** The two twins diverge in output and the loser has a live consumer (palettes pane). **Suggested edit**: state which formula is canonical (recommend the per-space `toFormattedString` version) and require a palettes-pane display check in the wave gate.

## §Replay

From the repo root (`/Users/mkbabb/Programming/value.js`), against tranche-q HEAD (verified `git apply --check` clean at mainline `6136a47`):

```
git apply docs/tranches/S/audit/seeds/w2-usecolorpipeline.patch
npm run typecheck        # expect EXIT 0 (lib + demo strict-zero)
npm run dev              # requires dist/ (npm run build if absent); load the printed port
```

Expected result: `demo/@/composables/color/useColorPipeline.ts` is created (397 LoC); App.vue / ColorPicker.vue / keys.ts / usePaneRouter.ts are modified; typecheck is clean; the picker renders and a channel-slider drag updates the color + `--accent-live` + URL synchronously (the §Verdict table). The patch is picker-scoped: About/Extract panes still receive the model by prop (unchanged) — the full wave transposes those too. `useColorModel.ts` / `useAppColorModel.ts` remain on disk (dead-for-picker; `NORMALIZED_COLOR_NAMES` still consumed from the former).
