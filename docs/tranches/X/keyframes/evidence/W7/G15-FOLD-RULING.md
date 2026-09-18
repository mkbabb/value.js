SERVED MODEL: claude-fable-5-1

# KF.W7 · G15 — ONE DIALOG SHELL: THE FOLD, RULED (R-7 ≡ KAD-F3), WITH N-2

**Unit**: X.KF.W7.c (documents only; zero keyframes.js bytes). **Date**: 2026-09-18. **Ref of record**:
keyframes.js `origin/master` **`ae83da07`**; both dialog files byte-identical at HEAD `77d0e0b1`
(`git diff --stat ae83da07 HEAD -- demo/components/instrument/…` → empty).

**Gate**: G15 — *"One dialog shell, or the divergence ruled in writing."* **Assertion**: the twin folds onto the
80-line shell under the pinned constraints (CSSPasteDialog's a11y composition + the twin's text-hoisting
contract; four genuine deltas preserved; **L-4's falsifier answered**) OR the fold is declined with the
falsifier's answer in writing; **every dialog-residue row's disposition is STATED before any cure is spent,
naming KAD-15 · KAD-16 · KAD-20 by id**; **N-2 is ruled wire-or-delete**.

**Executor**: `.e` (owns `CSSPasteDialog.vue` · `KeyframesAddDialog.vue` · `KeyframeTimeline.vue`).
**E-3**: dated ruling beside immutable spec/registry. **Order lock declared at §5** (the two dialog files are
also KF.W6 `.f`/`.h`/`.i`'s modify paths).

---

## §0 · The witness, re-measured (double-run identical)

`CSSPasteDialog.vue` **80** L · `KeyframesAddDialog.vue` **161** L · byte-identical `@interact-outside` guard
(CPD `:4-9` / KAD `:17-22`) and `onInput` body (CPD `:71-73` / KAD `:96-98`) · KAD nests `DialogDescription`
inside `DialogTitle` (`:24-31`, **2** `DialogDescription` tokens in that span) · `DialogHeader` unused · CPD
`initialText` **four** in-file hits (`:49 :53 :59 :67`) and **dead AT THE MOUNT** (`KeyframeTimeline.vue:135-152`
→ `:initial-text` **0**) · CPD `defineExpose({ textEl })` at **`:79`** · KAD's ONE live consumer:
`KeyframesEditor.vue:118` (import) / **`:75`** (mount, `v-model:open` + `v-model:text` + `:format` + `@submit`)
— OUTSIDE §Bounds · KAD-1's `innerHTML` sink is **CURED at the frontier** (`useHighlightCSS.ts:183 el.textContent
= s`, KF.W5.a) · `useCodeHighlight(` consumers: **2** (`KeyframesEditor.vue`, `KeyframesAddDialog.vue`) plus
its definition · the parent-owned close `useKeyframeOps.ts:183 kfControls.dialogOpen = false` (kf-KAD
superlative #2) · N-2: **1** `.label` hit (`KeyframeTimeline.vue:106`) + **1** `label` in `timelineTypes.ts`
(`:11`) — two occurrences, two commands, exactly as the spec's re-founded witness says.

---

## §1 · DISPOSITIONS FIRST — every dialog-residue row, before a cure is spent (the G15 condition)

Legend: **FOLD** = discharged by the fold itself · **CURED-IN-FOLD** = a named edit inside the fold commit ·
**W6-SWAP** = discharged by KF.W6's S-9 Textarea/well swap (stated, not spent) · **EXCLUDED→W6** = §Excluded's
three, by id · **OUT-OF-BOUNDS→owner** = the cure site is not this wave's file.

| id (bank, rung) | disposition | how / where |
|---|---|---|
| **R-7 ≡ KAD-F3** (MAJOR, both dialogs) | **FOLD — LANDED BY `.e`** | §2: one shell; KAD becomes a thin adapter over it. Direction exactly as pinned: CPD's sibling a11y composition + KAD's text-hoisting contract; four deltas preserved (§2.2). |
| **KAD-6** (MAJOR) | **FOLD** | the shell's `DialogTitle`/`DialogDescription` are siblings (`CPD:11-12`); KAD's `<h2><h3/><p/></h2>` dies with KAD's template. Declared to KF.W6: **its "stands alone at W6 iff declined" arm does not fire.** |
| **KAD-13** (MAJOR) | **CURED-IN-FOLD** (adapter half) + **OUT-OF-BOUNDS→KFED-UNIT** (parent half) | the adapter's `reformat()` calls the pure `format` and **emits `update:text`** with the result (the text-hoisting contract itself); the `format` JSDoc is corrected in the same commit (KF-CE-41). The dead triple-write `useKeyframeOps.ts:149-150` is the parent's — declared to `KF-W10.md` §6.D → the KF.W12 row (KFED-UNIT). |
| **R-4 (+KAD-9, KAD-10)** (MAJOR) | **CURED-IN-FOLD** (shell contract + both timeline mounts) · **KAD mount inherits** | G14 P2: awaitable `submit` + `loading` + in-place error node (§2.1). The KAD mount's parent handler returns `void` today → the shell does not close for it and the parent's success-only close (`useKeyframeOps.ts:183`, superlative #2) is preserved by the void-return rule; busy/error for that mount inherit when KFED-UNIT returns the promise. **KAD-9's sweep-fires-on-failure half is KAD-15's animator** (EXCLUDED→W6, below) and is not touched. |
| **R-17** (MINOR) | **CURED-IN-FOLD** | the primary `Button` is `:disabled="text.trim() === ''"` — the whitespace dead click becomes a visibly disabled action (the shell's own empty signal). **This is NOT KAD-20's empty state** (the well's placeholder/prompt — W6's). |
| **R-19** (MINOR — three dead surfaces + `defineExpose({textEl})`) | **FOLD** — two surfaces become LIVE, one dies | `initialText` **DELETED** (replaced by `defineModel("text")`, the twin's contract); `preClass` **LIVE** (the adapter passes `hljs`; merged, see R-21); `footer-extra` **LIVE** (the adapter's progress bar until KAD-15's cure); `textEl` **LIVE** — it is the fold's highlighter seam (§3). R-19 called these *"minted and never wired"*; the fold is the consumer they were minted for. |
| **R-21** (MINOR) | **CURED-IN-FOLD** | `:class="cn(WELL_BASE, props.preClass)"` — `cn` from the barrel the file already imports; replaces the REPLACE semantics. |
| **R-22** (MINOR, both casts) | **CURED-IN-FOLD** (CPD half) · **OUT-OF-BOUNDS→NO-WAVE-OWNER** (`toastGuard.ts:26-28`) | the shell's `onInput` reads `textEl.value?.innerText ?? ""` — no `EventTarget → HTMLElement` cast; KAD's duplicate dies with the fold. The guard's cast lives in `demo/components/instrument/utils/` (not §Bounds); recorded, not spent. |
| **R-23** (MINOR) | **CURED-IN-FOLD** | `@keydown.meta.enter` + `@keydown.ctrl.enter` on the well → the same submit path (Mod+Enter, the repo's first-class shortcut posture). |
| **KAD-21** (MINOR, copy) | **CURED-IN-FOLD** | adapter props: `title="Add keyframes"` · `description="Append @keyframes stops to the current animation"` (the one explanatory slot now states the non-obvious contract: **append, not merge**) · `button-label="Add keyframes"` (capitalization agrees with the title). |
| **N-2** (MAJOR) | **RULED — WIRE** (§4) | readers: marker accessible name · hover-preview caption · the composed tooltip description. Export ruled OUT with reason. |
| **L-16/L-17** (MINOR) | **AFTER the fold** (§Sequencing 7) | the two mounts differ in four strings; the in-file `v-for` over a descriptor lands in `.e`'s P9 commit once the shell's contract is settled here. NO new component (`feedback_kiss_no_contrivance`). |
| **R-3** (MAJOR, "Add" promises merge) | **NOT THIS GATE** — G6's round-trip commit (`.e`, P8) | cross-ref only; the KAD-21 copy above does not touch the timeline mounts' `description="…merge…"` — that string rides R-3's commit with its semantics (implement merge or tell the truth). |
| **KAD-15** (MINOR cluster — the progress-bar animator) | **EXCLUDED→KF.W6 by id** (`S-10 · KF-KE-21 (+KAD-15)` row) — **NOT cured here** | the fold carries the bar UNCHANGED through the shell's `footer-extra` slot (its intended consumer); the `width` animation, the missing rest state and the hoist-out-of-`DialogFooter` are W6's/KFED-UNIT's. **Structural consequence stated**: because the bar rides a SLOT, W6's hoist is a one-site edit in the adapter, not a shell change. |
| **KAD-16** (MINOR cluster — dead tokens: literal `class`, `grid`-over-flex, inert `sticky bottom-0`, `type="submit"` with no `<form>`, dead `css`/`relative`) | **EXCLUDED→KF.W6 by id** (the `KAD-3 + … + KAD-16 + …` group row) — **and it does not REACH the fold** | the fold adopts the SHELL's footer (R-7's pinned direction: *"none requires re-deciding footer"*), so KAD's footer line **`:41 class="sticky bottom-0 class grid"`** and the `type="submit"` button die with KAD's template. **W6's cells for KAD-16's footer tokens become MOOT at the fold's landing** — declared here so W6's `.i` states it rather than spending it; the `hljs css` well classes survive on the adapter's `preClass` only as `hljs` (`css` is dead — the language is passed explicitly at `useHighlightCSS.ts:197`). |
| **KAD-20** (MINOR — no empty state) | **EXCLUDED→KF.W6 by id** — **NOT cured here** | the well's placeholder/prompt is the S-9 swap's (`Textarea` `placeholder`); the shell's disabled primary (R-17) is a different signal and is not offered as KAD-20's cure. |
| **KAD-1 / KAD-2** (BLOCKER / MAJOR — the `innerHTML` sink) | **LANDED by KF.W5.a** (`useHighlightCSS.ts:183`) — not gated here, not waited on | measured at the frontier. |
| **KAD-3 · KAD-7 · KAD-19 · KAD-25 · KAD-F1 · KAD-F2 · KAD-F4 · KAD-F5 · KAD-12 · KAD-4 · KAD-8 · KAD-11 · KAD-22 · KAD-23 · KAD-14 · KAD-17 · KAD-18 · KAD-24** | **W6 / W5 / W8 / W9 as banked** — not this wave's | stated so the fold spends none: the adapter keeps `useMagicKeys` (KAD-12 → W6's registry adoption), `insertTabAtCursor` (KAD-7 → the swap restores native Tab), `hljs` (KAD-3/-4 → the swap moots), the progress bar (KAD-11 PRM → W9/W6). |

**Count discipline**: 20 rows dispositioned; the three §Excluded ids named by id with their W6 anchor rows;
zero cures spent by this seat (documents only).

---

## §2 · THE FOLD — shape, pinned constraints honoured

### §2.1 · The shell (`CSSPasteDialog.vue`, the 80-line member SURVIVES — §Bounds' "fold TARGET")

Contract after the fold (what changes is the contract; the template's a11y composition is unchanged):

```
props:   title · description · buttonLabel · buttonIcon? · preClass?        (as today, minus initialText)
         submit: (text: string) => void | Promise<void>                       (NEW — awaitable)
models:  open  = defineModel<boolean>("open", { required: true })             (as today)
         text  = defineModel<string>("text", { default: "" })                 (NEW — the twin's hoisting contract; replaces initialText + the open-watch wipe)
slots:   trigger   (NEW — rendered inside <Dialog>, before <DialogContent>; KAD's DialogTrigger lives here)
         footer-extra                                                          (as today — now LIVE)
expose:  textEl                                                                (as today — now LIVE: the highlighter seam)
state:   busy: Ref<boolean> · error: Ref<string | null>                       (NEW — P2)
```

Behaviour (G14 P2): `onSubmit` → `error = null; const r = props.submit(text)`. **If `r` is a Promise**: `busy =
true` → `await r` → **resolve**: `open = false` (the shell closes; the draft is the consumer's to clear —
KeyframeTimeline clears on its own success path, `useKeyframeOps` already does at `:185-186`) · **reject**:
`error = (e as Error).message`, the well gains `aria-invalid="true"` + `aria-describedby` → an error node inside
an `aria-live="polite"` region under the well, the dialog STAYS OPEN, the text is untouched · `finally busy =
false`. **If `r` is `void`**: the shell does nothing further — the consumer owns the close through
`v-model:open` (this is exactly KAD's parent contract today, kf-KAD superlative #2, preserved without a KAD-side
change). The primary `Button` binds `:loading="busy"` and `:disabled="text.trim() === ''"` (R-17). Mod+Enter on
the well → `onSubmit` (R-23). `onInput` → `text = textEl.value?.innerText ?? ""` (R-22). Well class →
`cn(WELL_BASE, preClass)` (R-21). The `@interact-outside` toaster guard (superlative #3) stays byte-identical.

**What the shell does NOT gain**: no highlighter, no Tab handling, no hotkey, no progress bar — the four deltas
stay in the adapter (§2.2). No `DialogHeader` adoption (R-13 → W6). No `scroll` (R-2 → W6). No Textarea (S-9 →
W6, §5's order).

### §2.2 · The adapter (`KeyframesAddDialog.vue` — the file SURVIVES as a thin adapter; the four deltas)

`KeyframesAddDialog.vue` keeps its filename, its import site and its mount contract **byte-for-byte**
(`v-model:open` · `v-model:text` · `:format` · `@submit` — `KeyframesEditor.vue:75-80` unchanged), which is what
makes the fold landable inside §Bounds: **no `KeyframesEditor.vue` edit, no repoint, no delete** — LAW A's
census (one live import) is honoured by leaving the import where it is. Inside, the 161 lines collapse to:

```
<CSSPasteDialog ref="shell" v-model:open="open" v-model:text="text"
    title="Add keyframes" description="Append @keyframes stops to the current animation"
    button-label="Add keyframes" :button-icon="FileIcon" pre-class="hljs"
    :submit="(t) => emit('submit', t)">
  <template #trigger>  <DialogTrigger as-child><button type="button" aria-label="Add keyframes" class="…same eight utilities…"><FilePlus2 class="stroke-2"/></button></DialogTrigger>  </template>
  <template #footer-extra>  <div ref="progressBarEl" class="progress-bar w-full bottom mt-2"></div>  </template>
</CSSPasteDialog>
```

1. **DialogTrigger** — the `trigger` slot, inside the shell's `<Dialog>` so reka's root context reaches it; the
   `<button aria-label="Add keyframes">` DOM shape is preserved verbatim (kf-KAD superlative #5: load-bearing for
   `useToolbarKeyboard`'s roving tabindex).
2. **Highlighting** — `useCodeHighlight(() => [shell.value?.textEl ?? null])`; `watch(() => shell.value?.textEl,
   (el) => el && highlightAll(el))` replaces the `onMounted` + `watch(addKeyframesEl)` pair (KAD-14(c)'s
   hand-rolled `{immediate:true}` dies as a by-product; its row is W5/W6's and is not claimed). See §3.
3. **Tab-insert + per-keystroke recolour** — `useEventListener(() => shell.value?.textEl, "keydown", onKeyDown)`
   (VueUse re-binds as the target changes; the shell's template stays clean); `onKeyDown` unchanged
   (`Ï` guard · Tab → `insertTabAtCursor` · `highlightAll()`), until W6's KAD-7/KAD-12 cures.
4. **Reformat** — the `useMagicKeys` watch unchanged (KAD-12 → W6); `reformat()` = `const formatted = await
   props.format(text.value); emit("update:text", formatted); setHighlightingString(shell.value?.textEl, formatted);
   highlightAll();` — **the `update:text` emit is KAD-13's cure and R-7's text-hoisting constraint in one line**;
   `window.getSelection()?.collapseToEnd()` stays (KAD-17 → W5/W6).

The progress bar rides `footer-extra` unchanged (KAD-15 → W6). `animateProgressBar()` stays in `onSubmit`'s
emit path exactly as today (KAD-9's sweep half is W6's/KFED-UNIT's). `defineModel<boolean>("open")` +
`defineModel<string>("text")` replace the hand-rolled `open` v-model (KAD-F3's `defineModel` half — the six-site
house idiom).

### §2.3 · The consumer end of the TARGET (`KeyframeTimeline.vue:135-152`)

Both mounts gain `v-model:text` (two `ref("")`s — or the descriptor's fields once L-16/L-17 lands after this)
and pass `:submit="doImport"` / `:submit="doAddCSS"` with `doImport = async (text) => { await importCSS(text);
importText.value = ""; }` — `importCSS` REJECTS on failure (G14 P2; its internal `catch → toast.error` at
`useTimelineBuild.ts:156-160` is removed so the shell surfaces the message in place; the *"No keyframes found in
CSS"* branch becomes a `throw new Error(…)`). The `@submit` emit is retired at these two mounts (the prop
replaces it). The `description="…merge…"` string is R-3's (G6) and is not touched by this commit.

---

## §3 · L-4's OPEN FALSIFIER — ANSWERED IN WRITING (kf-CSSPasteDialog residue #9)

**Question (banked)**: *"whether KeyframesAddDialog folds onto this shell across the `footer-extra` seam without
losing `<pre>` identity for `useCodeHighlight`."*

**Answer: YES — it folds, and the identity is held by the shell and published through the seam R-19 called
dead.** Mechanism, at the bytes:

1. **One `<pre>`.** The shell renders exactly one `<pre ref="textEl"><code>{{ text }}</code></pre>` (`CPD:13-18`)
   and exposes it (`:79`). `useCodeHighlight`'s ownership is a GETTER (`getOwnedElements: () => (HTMLElement |
   null | undefined)[]`, `useHighlightCSS.ts:113-114`), so `() => [shell.value?.textEl ?? null]` is a lawful
   owner set; `highlight(null)` early-returns (`:190`). No element is copied, wrapped or re-parented across the
   `footer-extra` seam — the bar and the well are siblings under one `DialogContent`, as they are today.
2. **Portal remount is harmless.** `DialogContent` unmounts its subtree on close; on reopen the `<pre>` is a NEW
   element. The W5 cure keyed the idempotence record to the element (`WeakMap<HTMLElement, string>`, `:90`), so
   the new element has no record and the first `highlightAll()` colourises — which is why the adapter's
   `watch(() => shell.value?.textEl, …)` is the correct trigger (KAD's `watch(addKeyframesEl)` did the same
   against its own ref).
3. **What the seam does NOT change.** hljs colourisation still writes `el.innerHTML = h.value` (`:198`),
   orphaning the shell's `<code>{{ text }}</code>` VDOM child — **identical to KAD today** (KAD-4's mechanism,
   the R-1 contenteditable↔VDOM class). The fold neither worsens nor cures it; it dies in W6's S-9 well swap (the
   registry's *"the well-swap MOOTS it"*). Stated so no seat reads it as a fold regression.
4. **The one cost**: the adapter reaches the well through a component ref (`InstanceType<typeof
   CSSPasteDialog>['textEl']`) instead of a template ref — one hop, typed under the now-live vue-tsc gate (OP-2
   SATISFIED).

**Falsifier for the answer**: after `.e` lands, `git grep -n 'useCodeHighlight(' -- demo/` must still return
exactly the two consumers (`KeyframesEditor.vue` + `KeyframesAddDialog.vue`), the second closing over
`shell.value?.textEl`; and a Shift+Alt+F in the open dialog must re-colourise (the mount test
`test/demo/instrument/timeline-hover-preview.test.ts` is THP's; the dialog's characterization pair is KF.W8's
`CSSPasteDialog.test.ts` / `KeyframesAddDialog.test.ts`, authored *against the shape ruled here* — §Sequencing
→ KF.W8).

---

## §4 · N-2 — RULED: WIRE (before KF.W6 opens D-9; §Sequencing 7)

**The row**: the Label `Input` (`KeyframeTimeline.vue:106 v-model="selectedKeyframe.label"`) writes
`TimelineKeyframe.label?: string` (`timelineTypes.ts:11`) which is **read by nothing**, deep-cloned into all 50
undo snapshots. KF.W6's D-9 spends a MAJOR on this control's typography; it must not spend it on an inert control.

**RULING — WIRE**, to the readers D-m4 (TimelineTrack) and THP C-10 name — *"the hover preview and export are the
obvious readers"*, *"D-m4 = banked N-2's consumer arm: the label is the one cure for both"*:

1. **The marker's accessible name** (`TimelineTrack.vue:75`): `aria-label` becomes `` `${kf.label ? `${kf.label} — ` : ""}keyframe at ${pct}% — drag or arrow to move` ``
   — N otherwise-identical `role="slider"` names become distinguishable to AT (D-m4). Owner: `.d`'s file.
2. **The hover-preview caption** (`THP:3`): the label renders beside the percent (`{{ label }} · 38%`, label
   first when present) — the identity panel shows the typed name, not only a number (THP C-10's sharpening).
   Owner: `.e`.
3. **The composed tooltip description** (`G9-A11Y-DESCRIPTION-DESIGN.md` §2): the label opens the string.
4. **Export — RULED OUT, with reason**: `@keyframes` grammar has no label slot; a CSS comment is not a contract
   the importer honours, so writing one would manufacture a round-trip fidelity claim G6 cannot keep
   (`importCSSToTimeline` is `.b`'s serial file and reads no comments). The label is **presentation-layer
   metadata of the timeline document**, persisted in state and undo history only. Stated so N-9/G6 owes
   nothing for it.

**Why not DELETE**: the control is user-authored data already persisted and undo-tracked; the wire costs three
bindings and buys a real AT distinction on N orphan sliders; deletion would retire a shipped authoring
affordance to save those bindings. **Declared to KF.W6 (`.h`)**: D-9's typography MAJOR now lands on a LIVE
control — spend it.

---

## §5 · SEQUENCING — the order lock this ruling adds, declared from this end

Both dialog files are modify paths of **KF.W6** too (`KF-W6.md` §Bounds `:79` — *"S-9 Textarea swap (shared with
KF.W7's fold — §Sequencing)"* — and the W6 record's units `.f` · `.h` · `.i`, none yet dispatched), and the
runbook §3.4 table carries **no W6∥W7 row for them**. The order is ruled here:

**FOLD FIRST (KF.W7 `.e`), SWAP SECOND (KF.W6 `.i`) — on `CSSPasteDialog.vue` and `KeyframesAddDialog.vue`.**

1. The fold reduces the S-9 swap's well count from two to one (KAD's well IS the shell's after the fold); the
   reverse order would swap CPD to `Textarea` while KAD still owns an hljs `<pre>`, and the fold would then have
   to reconcile a Textarea shell with a `<pre>` delta — L-4's falsifier in its hard form, manufactured by order.
2. KAD-6's *"stands alone at W6 iff the fold is declined"* already makes W6 wait on THIS verdict (KF-W6.md
   §Sequencing → KF.W7 binding (5)).
3. G15's ruling precedes KF.W8's characterization pair (§Sequencing → KF.W8), which is authored against the
   post-fold shape.
4. §Sequencing 7: the fold settles before L-16/L-17's descriptor (W7-internal).

**Consequence for the orchestrator (flagged, not presumed)**: KF.W6 `.f`/`.h`/`.i` commits touching
`CSSPasteDialog.vue` / `KeyframesAddDialog.vue` / `TimelineHoverPreview.vue` / `TimelineTrack.vue` /
`KeyframeTimeline.vue` / `TimelineCaret.vue` land **after** KF.W7 `.d`/`.e` close on those files — a same-file
cross-wave lock the runbook §3.4 table should carry as a row. Recorded in this unit's receipt and in the return
notes; no runbook byte is written by this seat.

---

## §6 · Verdict

**G15: GREEN as a RULING** — the fold is RULED (not declined) under the pinned constraints: CPD's sibling a11y
composition (§2.1) + KAD's text-hoisting contract (`defineModel("text")`, `update:text` on reformat — §2.1/§2.2)
+ the four genuine deltas preserved in a thin adapter (§2.2) + **L-4's falsifier answered YES with its mechanism
and its one residual named (§3)**; every dialog-residue row dispositioned BEFORE any cure, **KAD-15 · KAD-16 ·
KAD-20 named by id with their W6 anchor rows and the fold's structural effect on each stated (§1)**; **N-2 RULED
WIRE (§4)**; the fold-vs-swap order locked (§5). The BYTE half — the fold landing as ONE commit with
`KeyframesAddDialog.vue` surviving as the adapter — is `.e`'s and stays RED until it lands; `.f` re-reads §3's
falsifier at close.

**Carried by this gate** (the spec's list): R-7 ≡ KAD-F3 · KAD-6 · KAD-13 · R-17 / R-19 / R-21 / R-22 / R-23 /
KAD-21 · N-2 · L-16/L-17's sequencing.
