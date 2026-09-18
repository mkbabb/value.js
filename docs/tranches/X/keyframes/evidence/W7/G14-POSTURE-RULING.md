SERVED MODEL: claude-fable-5-1

# KF.W7 · G14 — THE ONE FAILURE POSTURE (cluster + dialogs), RULED

**Unit**: X.KF.W7.c (phase 2, the preview/ghost/posture/fold design seat — documents only; zero keyframes.js
bytes, zero registry bytes). **Date**: 2026-09-18. **Ref of record**: keyframes.js `origin/master`
**`ae83da07`** (`evidence/W7/G12-REF-PIN.md`); HEAD `77d0e0b1` = `ae83da07` + 2 sibling commits, and
⟨cmd⟩ `git diff --stat ae83da07 HEAD -- demo/components/instrument/timeline demo/components/instrument/keyframes …`
→ **empty** — every anchor below binds at both.

**Gate**: G14 — *"The cluster's failure posture is ONE posture."* **Assertion**: *one declared failure
posture across cluster + dialogs, registered in KF.W2's posture registry (cross-referenced both ends).*
**Registry of record** (§Sequencing item 9 — it PRECEDES this ruling and did not wait on the SWAP verdict):
`docs/tranches/X/keyframes/registries/POSTURES.md` (KF.W2.a, 2026-09-17; floor **20**, self-count re-run by
this seat → **20**; **7** floor rows carry `**KF.W7**` as owner — rows **6 · 7 · 8 · 12 · 13 · 14 · 15**).

**E-3**: the spec, the registry and the conformance artifacts are IMMUTABLE; this is a dated ruling beside
them. **Executor**: `.e` (KeyframeTimeline.vue · useTimelineBuild.ts · both dialogs) and `.d`
(TimelineCaret.vue · useTimelineOps.ts) — the file split is §Disjointness'; the posture is ONE.

---

## §0 · What the baseline measured, item by item (the divergence this ruling replaces)

Every item re-read by this seat at `ae83da07`, double-run (scratchpad `w7c-measure.sh`, `diff run1 run2` → no
output):

| # | witness | the posture it ships today |
|---|---|---|
| 1 | `useTimelineBuild.ts:47-50` — `catch (e) { console.error(…); animation.value = null; }` (the sole `console.error`, **`:48`**) | **SILENT** — the failure reachable BY TYPING (C-7's ingress) is the one that never surfaces |
| 2 | `useTimelineBuild.ts` toasts at **`:121 :133 :137 :148 :155 :157`** (six lines, exact) | **TOAST** — export/import failures + successes |
| 3 | `useTimelineOps.ts:34` `toast.success("Keyframe captured …")` after a `rebuild()` that is async-typed and called as `() => void` (`:19`) | **SUCCESS-BEFORE-OUTCOME** (L-11 (KeyframeTimeline)) |
| 4 | `TimelineCaret.vue:58-65` — `if (!isNaN(val)) emit(…)`; NaN falls through to `isEditing = false` (**`:61`**) | **SILENT SWALLOW** (L-15 (TimelineCaret), ruling-dependent at the bank) |
| 5 | `KeyframeTimeline.vue:267-279` — `importCSS(text)` un-awaited, `…DialogOpen.value = false` at **`:270`/`:277`** inside `if (text.trim())` | **CLOSE-REGARDLESS-OF-PARSE** (R-4); the draft is destroyed by the shell's open-watch wipe |
| 6 | `KeyframesAddDialog.vue:133-136` — `emit("submit")` + `animateProgressBar()` unconditionally; the parent closes only on success (`useKeyframeOps.ts:183`) | **FAILURE-ONLY COMPLETION SIGNAL** (KAD-9) + **NO BUSY STATE** (KAD-10) |
| 7 | `KeyframeTimeline.vue` template `:1-154` — `v-if`/`v-else` count **1** (the selected-keyframe editor); no empty / single-frame / rebuild-failure branch | **UNEXPRESSED STATES** (D-15 (KeyframeTimeline)) |

Seven witness items, **six postures** (items 5 and 6 are one posture at two mounts). The baseline's "six
divergent postures" reproduces.

## §0.1 · The channel fact this ruling is written against — measured, banked, NOT cured here

The house failure idiom is `withErrorToastAsync` (`useKeyframeOps.ts:25-40`: `toast.error(message, {description,
duration: 10000, action: {label: "Retry", onClick: retry}})` — POSTURES.md **★ S-7**, the register's positive
exemplar #1). **Nine** demo modules import `toast` from `vue-sonner` (2.0.9). **The toast channel does not
paint**: the `<Toaster>` is mounted once (`DemoGlobalChrome.vue:28`, `Teleport to="html"`, `unstyled: true` with
Tailwind classes on the toast **items**); ⟨cmd⟩ `git grep -c 'vue-sonner/style' ae83da07 -- demo/ src/
vite.config.ts` → **0** files; ⟨cmd⟩ `grep -c 'position: *fixed\|insertRule\|createElement("style")\|adoptedStyleSheets'
node_modules/vue-sonner/lib/index.js` → **0** (the runtime injects no CSS and positions nothing); ⟨cmd⟩
`grep -n 'position: *fixed' node_modules/vue-sonner/lib/index.css` → **`:21` `:387`** — the viewport's
`position: fixed` lives ONLY in the unimported sheet. The `<ol>` therefore renders in normal flow after a
≥100dvh `<body>` inside `html{overflow:hidden}`.

**This is the banked BLOCKER `kf-DemoGlobalChrome.md` D-1/L-1/C-1** — *"the vue-sonner stylesheet is imported
nowhere; every toast is structurally unreachable"* — terminal disposition **NO-WAVE-OWNER (SS-1/SS-2), cured
structurally by the census S-9 swap (glass `./toast`); any interim import is bound by M-1 (`layer(vendor)` +
`z-toast` override, never bare)**. W5's `useHighlightCSS.ts:142-144` comment already cites the same fact.
**KF.W7 does not cure it** (`DemoGlobalChrome.vue` is outside §Bounds; a bare `import "vue-sonner/style.css"`
is M-1's convicted interim), **and this ruling is not written as if it were cured**: the posture below puts the
**in-place** arm first and treats the toast as the secondary channel with its reachability named as the
precondition it is. A ruling that routed every failure to a dead channel would be the masking fallback the
standing law forbids, dressed as a posture.

---

## §1 · THE RULING — one posture, four clauses, one precondition

> **SURFACE, NEVER SWALLOW — IN PLACE WHERE THERE IS A PLACE; OUTCOME BEFORE ACKNOWLEDGEMENT.**

- **P1 · No swallow.** No failure on an engine-bearing or value.js-bearing path in the cluster or its dialogs
  terminates in `console.error` alone, in a bare `return null`, or in a `catch {}`. Every `catch` either
  surfaces (P2/P3) or re-throws to a boundary that does. A `console.error` may accompany a surfaced failure
  (★ S-7 does); it may never be the whole of one.
- **P2 · In place, awaitable, draft-preserving (the SUBMISSION surfaces).** A failure caused at a surface the
  user is operating — the two dialogs' submit, the inline CSS editor's commit, the caret's commit — is surfaced
  AT that surface: the surface stays open, the draft is preserved, the offending control carries
  `aria-invalid="true"` and an error node it references (`aria-describedby`/`aria-errormessage`) inside an
  `aria-live="polite"` region; the primary action carries glass `Button`'s `loading` (`Button.vue.d.ts:15` —
  *"marks an in-flight command and suppresses activation until it settles"*) while in flight; **the surface
  closes ONLY on an awaited success**. The submit contract is therefore **awaitable**: `(text: string) =>
  Promise<void>` — resolve closes, reject stays. (Shape: `G15-FOLD-RULING.md` §2.1.)
- **P3 · The house channel, for failures with no place (the ENGINE surfaces).** A failure with no operable
  surface under the pointer — the rebuild after a timeline mutation, export/clipboard, a preview capture — is
  surfaced through `toast.error(message, { description, action: Retry })` (★ S-7's shape, not a new helper),
  AND the state it leaves behind is RENDERED (P4b): a failed rebuild is a visible timeline state, not a null
  engine and a log line. **Success toasts follow the awaited outcome**; none precedes it.
- **P4 · Non-failures are not failures.** (a) An uncommittable caret keystroke is a **CANCEL** — the editor
  closes and the display returns at MODEL precision (G7's compare-before-commit): L-15's *"a garbage keystroke is
  arguably a cancel"* is RULED true, because `<input type="number">` already refuses non-numeric entry and the
  only NaN path is the empty field, which is Escape's meaning. No toast, no error node. (b) Empty (0 keyframes),
  single-frame (1 keyframe; the `< 2` contract at `useTimelineBuild.ts:35`) and rebuild-failed are **STATES**
  with a rendered branch each — not errors, not toasts.
- **PRECONDITION (named, not presumed)**: P3's channel is unreachable at the bytes (§0.1). P2 is reachable
  regardless, which is why P2 carries the dialogs and the typing surface — the failures C-7 convicts. P3's
  paint is `kf-DemoGlobalChrome` D-1's NO-WAVE-OWNER cure and SS-13 probe #1; **this wave's `.f` names it in
  the close residuals with that owner**, and no seat of this wave imports the stylesheet.

---

## §2 · CONSUMERS, enumerated — each G14-carried row against the clause that binds it

| row (banked id, rung) | registry row | clause | the cure `.e`/`.d` writes (shape, not code) | owner file |
|---|---|---|---|---|
| **C-7** (MAJOR, posture arm; crash identity = megatranche R1, never re-booked) | **8** | P1 + P2 + P3 | `rebuild()` no longer swallows: `catch` → `buildError.value = (e as Error).message` (a `shallowRef<string \| null>` returned beside `animation`) + `toast.error("Failed to rebuild timeline animation", {description, action: Retry → rebuild()})`; `animation.value = null` stays (the engine IS gone). The ingress half — `onKeyframeCSSChange` — becomes P2 after L-6/C-4's delegation: the façade's parse Result failure marks the editor invalid and **does not assign `kf.vars`** (today's `:263` whole-replacement destroys on a partial parse). The **§F-2 scope correction** and the fuzz-entry note ride OUT to KF.W2/W3 unchanged. | `useTimelineBuild.ts` · `KeyframeTimeline.vue` (`.e`) |
| **L-15 (TimelineCaret)** (INFO, ruling-dependent) | **12** | P4(a) | `commitEdit`: `if (Number.isNaN(val)) { cancelEdit(); return; }` — explicit, commented (KF-CE-41: the comment names the ruling), landing INSIDE G7's compare-before-commit commit (one row with L-2/C-3/D·M-4). **UNACTIONED → RULED.** | `TimelineCaret.vue` (`.d`) |
| **L-11 (KeyframeTimeline)** (MINOR — KT's L-11, NOT the caret's) | **13** | P3 | `rebuild` typed `() => Promise<void>` at `useTimelineOps.ts:19` and **awaited**; `snapshot` toasts `Keyframe captured …` AFTER the awaited rebuild, and a rejected rebuild reaches P3 (its own toast), never `console.error` alone. | `useTimelineOps.ts` (`.d`) |
| **D-15 (KeyframeTimeline)** (MAJOR) | **14** | P4(b) + P3 | Three rendered branches in `KeyframeTimeline.vue`: **empty** (0 keyframes — a prompt naming the two entry gestures: Snapshot / Import), **single-frame** (1 keyframe — *"one more keyframe builds the animation"*), **rebuild-failed** (`buildError` rendered beside the track with the message + a Retry `Button`). Glass-conformance tail: the empty/failed states are TEXT + the existing `Button`; `useUserInvalidAria` (exported on `/forms`, measured) is P2's bridge for the **dialog** well when W6's Textarea swap lands — not spent here. **Whitespace-submit arm → R-17** (fold ruling); **closes-before-parse arm → R-4** (below). | `KeyframeTimeline.vue` (`.e`) |
| **R-4 (+ KAD-9, KAD-10)** (MAJOR) | **6 · 7 · 15** | P2 | The shell's awaitable submit + `loading` + in-place error node (`G15-FOLD-RULING.md` §2.1). Timeline mounts: `doImport`/`doAddCSS` become `async (text) => { await importCSS(text); }` with `importCSS` **rejecting** (no internal `catch` → toast; the shell surfaces the message in place); the success toast `Imported N keyframes` stays as P3's outcome toast (the count is information the close does not convey). **KAD mount**: the shell contract lands; the busy/error arms inherit when the parent returns its promise (`addKeyframesStringToAnimation` is `void withErrorToastAsync(…)` in `useKeyframeOps.ts`, OUT of §Bounds → **KFED-UNIT**, addressed to `KF-W10.md` §6.D → the KF.W12 row). Until then the KAD mount keeps today's parent-owned close (`useKeyframeOps.ts:183`), which is kf-KAD superlative #2 and is preserved by construction (§2.1's void-return rule). | `CSSPasteDialog.vue` · `KeyframeTimeline.vue` · `KeyframesAddDialog.vue` (`.e`) |

**Every G14-carried row has a clause; every KF.W7-owned registry row (6 · 7 · 8 · 12 · 13 · 14 · 15) is
consumed above; no row is re-graded** (M-25 — the rungs stated are the bank's).

## §3 · Cross-reference, BOTH ENDS — stated exactly, because this seat writes no registry byte

- **This end → the registry**: the seven rows above are cited by registry row number AND banked id; the
  registry file is named by path; its floor (20) and its KF.W7-owner count (7) are re-measured here.
- **The registry → this end**: rows 6 · 7 · 8 · 12 · 13 · 14 · 15 each carry `**KF.W7**` in their
  *disposition / owner* cell at KF.W2.a's own bytes (⟨cmd⟩ `grep -c '^| \*\*[0-9]*\*\*.*\*\*KF\.W7\*\*'
  POSTURES.md` → **7**), and the registry's §0 says of row 12 *"this registry records the posture and does not
  pre-empt the ruling"* — i.e. the registry's end already points at exactly this act.
- **What is NOT done here**: no byte of `POSTURES.md` is written (`.c`'s lock: zero registry bytes; E-3 makes
  the dated artifact immutable in any case). **The disposition word (RULED → the clause) is written back by a
  dated addendum-beside at the registry's next terminalization** — routed to **`.f`** (this wave's close
  residuals + the LEDGER event line) and to **KF.W10**'s terminal table (§Sequencing → KF.W10, the *"posture
  rows travel OUT"* leg). This ruling is the artifact that write-back cites.

## §4 · Falsifiers — how a later seat reads this ruling RED

1. Any landed `.d`/`.e` commit in this wave leaves a `catch` in `useTimelineBuild.ts` / `useTimelineOps.ts` /
   `KeyframeTimeline.vue` / `CSSPasteDialog.vue` / `KeyframesAddDialog.vue` whose only effect is
   `console.error` and/or a `return null` → **P1 RED** (⟨cmd⟩ `grep -n 'console.error' <file>` beside its
   `toast.`/`buildError`/`aria-invalid` line, or none).
2. Either `<CSSPasteDialog>` mount in `KeyframeTimeline.vue` still writes `…DialogOpen.value = false`
   synchronously in its submit handler → **P2 RED**.
3. `snapshot` toasts before `await rebuild()` → **P3 RED**.
4. `commitEdit` emits on NaN or opens a toast on NaN → **P4(a) RED**.
5. `KeyframeTimeline.vue`'s template has no empty / single-frame / rebuild-failed branch → **P4(b) RED**.
6. Any seat of this wave adds `import "vue-sonner/style.css"` (bare or otherwise) → **M-1 RED** and a
   §Bounds breach — the channel is D-1's owner's to cure.

## §5 · Verdict

**G14: GREEN as a RULING — one declared posture across cluster + dialogs (§1), every carried row assigned a
clause (§2), the KF.W2 registry cross-referenced by row and id at both ends (§3), with the toast channel's
unreachability named as the precondition it is (§0.1) rather than presumed away.** The BYTE half — the six
witness items of §0 turning — is `.d`'s and `.e`'s and stays RED until their commits land; `.f` re-reads §4's
falsifiers at close.

**Carried by this gate** (the spec's own list): C-7 (posture arm) · L-15 (TimelineCaret) · L-11
(KeyframeTimeline) · D-15 (KeyframeTimeline) · R-4 (+ KAD-9, KAD-10). **Residual with owner**:
`kf-DemoGlobalChrome` D-1/L-1/C-1 (NO-WAVE-OWNER; glass `./toast` S-9; M-1 binds any interim) — the paint of
P3, named at `.f`'s close.
