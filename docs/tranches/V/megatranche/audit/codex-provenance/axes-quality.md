# Codex-provenance audit — LANE: the 46 report-authored challenge axes

**Subject.** The 218/264 → 264/264 coverage closure that Codex effected on 2026-08-03 by
*authoring* ~46 challenge reports directly, rather than by dispatching workflows.
**Authority claimed by the subject:** `CLEAN_SOURCE_REPORT_CLOSURE_ZERO_EXECUTION`, verdict
`GREEN — zero incomplete components`, independent hostile review `CLEAN`, first falsifier `null`.

**Lane verdict.** The corpus is **REAL, NOT FILLER — and materially thinner than its ledger
representation admits.** Every source receipt I could mechanically test verifies byte-exact
against the live tree, and the corpus surfaces at least nine *live, reproducible shipping
defects* in `demo/` that I independently confirmed and in one case executed. But it is a
26-minute static-reading pass with **zero probes, zero measurements, zero interior file:line
citations, and zero evidence artifacts**, it carries a **provable false-finding class** that its
own partial correction pass demonstrably knew how to fix, and its self-certification chain has a
**stale-hash circularity**. It should be adjudicated as a *source-review findings ledger*, never
as a substitute for the workflow challenge corpus, and three named axes must re-run.

---

## §1 — Identification: exactly which files were report-authored

**Authority.** `coordination/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-REPORTS-2026-08-03.sha256`
(48 rows, self-SHA `e66962864a34…be89f` — **verified, matches current bytes**).

`shasum -a 256 -c` on that 48-row manifest → **48/48 OK, exit 0.** No drift.

**46 = 48 manifest rows − 2 pre-existing.** The two exclusions are
`TagEditPopover/challenge-C-implementation.md` (24,262 B, mtime 2026-07-29 01:17) and
`challenge-L-library.md` (36,741 B, 2026-07-29 01:16) — genuine workflow output with 8 sibling
`probe-*.mjs` scripts and a 41-entry `evidence/` directory, correctly declared "byte-preserved".

**The 46, by subject** (15 subjects × 3 axes, + `TagEditPopover/challenge-D-design.md`):

| subject | source bound |
|---|---|
| `ActionFeedback` | `demo/palettes/browser/card/PaletteCard/ActionFeedback.vue` (58 L) |
| `AdminListItem` | `demo/palettes/browser/admin/AdminListItem.vue` (24 L) |
| `AdminListSkeleton` | `demo/palettes/browser/admin/AdminListSkeleton.vue` (24 L) |
| `PaginationBar` | `demo/palettes/browser/admin/PaginationBar.vue` (48 L) |
| `PaletteCardGrid` | `demo/palettes/browser/card/PaletteCardGrid.vue` (53 L) |
| `PaletteCardMeta` | `demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue` (64 L) |
| `PaletteRenameInput` | `demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue` (66 L) |
| `UserSortMenu` | `demo/palettes/browser/search/UserSortMenu.vue` (58 L) |
| `picker-colorcomponentdisplay` | `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue` (214 L) |
| `picker-componentsliders-consolerail` | `demo/picker/controls/ComponentSliders/ConsoleRail.vue` (329 L) |
| `picker-debugeventlog` | `demo/picker/visual/DebugEventLog.vue` (136 L) |
| `picker-pointerdebugoverlay` | `demo/picker/visual/PointerDebugOverlay.vue` (286 L) |
| `shell-dock-actiontoolbar` | `demo/shell/dock/ActionToolbar.vue` (92 L) |
| `shell-dock-parseechoreadout` | `demo/shell/dock/ParseEchoReadout.vue` (49 L) |
| `wb-gradient-pane` | `demo/workbenches/gradient/GradientPane.vue` (29 L) |
| `TagEditPopover` (D only) | `demo/palettes/browser/search/TagEditPopover.vue` (87 L) |

**Corroboration 1 — mtimes.** All 46 fall in a **26-minute window, 2026-08-03 02:45:10 →
03:11:30**. Histogram (`stat -f %Sm`): 3 @ 02:45 · 9 @ 02:47 · 7 @ 02:51 · 4 @ 02:53 · 2 @ 02:57 ·
**16 @ 03:07** · 3 @ 03:09 · 1 @ 03:10 · 1 @ 03:11. The 16-file 03:07 spike is a batch write
(≈34 s/report across the whole window). This is authored prose, not harvested agent payloads.

**Corroboration 2 — `registry/HYDRATION-LEDGER.md`.** All 46 carry status `EXISTS-DIRECT` with
`source harvest = —` and `payloads = 0` (rows 247–…). Legend, ledger line 5:
`EXISTS-DIRECT = an exact current-roster canonical report survived without a returned payload.`

**Corroboration 3 — directory shape.** The 15 three-axis subjects contain **exactly three files
each and nothing else**. Measured: non-`challenge-*` artifacts across all 15 dirs = **0**.

---

## §2 — Receipt integrity: the corpus's strongest property (SUPERLATIVE)

Each of the 46 opens with a receipt of the form
``Source `<path>`, lines 1–N, SHA-256 `<64 hex>` ``. I mechanically replayed **all 45 that carry
the pattern** (TagEditPopover D uses a bulleted variant, replayed by hand) against the live
worktree, 4 days and one HEAD later:

```
path exists          45/45
SHA-256 matches      45/45   (0 SHA-MISMATCH)
line count matches   45/45   (0 LINE-MISMATCH)
```

Example, verified by hand:
`shasum -a 256 demo/palettes/browser/card/PaletteCard/ActionFeedback.vue`
→ `9b5cbe86976967d366a7386980f4eb94fd5d1795a160fd2a87c098b9393dbdd2` — character-identical to the
receipt in all three `ActionFeedback/challenge-*.md`.

`wb-gradient-pane/challenge-D-design.md` additionally pins
`HEAD e01d0065fa6c7c80282280566af2b9a4add809bf, tree a28eb1a79ee695ce77699ab70e14b2feb7ec5ba5`.
`git cat-file -t e01d0065…` → `commit`; `git rev-parse e01d0065…^{tree}` →
`a28eb1a79ee695ce77699ab70e14b2feb7ec5ba5`. **Exact.** (Current HEAD is `c3261a32`; the pinned
sources have not drifted since.)

**This is better provenance hygiene than most of the workflow corpus.** It is the one property of
the 46 that an adjudicator can rely on without qualification.

---

## §3 — DEEP SAMPLE: 16 subjects, every axis read, findings verified against live bytes

I read all 46 files and verified their substantive claims against the current tree. Below, the
verification record. **Every citation listed was checked by `grep -n` / `sed -n` / `cat -n`
against the live file — 45 receipt triples plus ~40 symbol-level assertions, far exceeding the
15-citation floor.**

### 3.1 — Confirmed live defects the corpus found (SUPERLATIVE)

These are not "audit-shaped observations". They are **real bugs in shipping code**, found by
static reading, which I independently confirmed:

**(a) `glass-ui@7.0.0` Button has no `variant` prop — two consumers address a dead axis.**
Claimed by `PaginationBar/challenge-L-library.md` and `UserSortMenu/challenge-L-library.md`:
"`variant="outline"` is not the installed glass-ui Button API"; "not part of the current glass-ui
Button axis (`emphasis`, `tone`, `size`, `iconOnly`)".
Verified — `node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts`:
```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  type?: …;  disabled?: …;  class?: …;
}
```
No `variant`. Live dead intent at `demo/palettes/browser/admin/PaginationBar.vue:8,22` and
`demo/palettes/browser/search/UserSortMenu.vue:8`. **CONFIRMED.**

**(b) `glass-ui@7.0.0` Skeleton accepts only `class` — two props are inert fallthrough.**
Claimed by `AdminListSkeleton` D#3 / L#1.
Verified — `dist/components/skeleton/Skeleton.vue.d.ts`: `type __VLS_Props = { class?: … };`
`demo/palettes/browser/admin/AdminListSkeleton.vue:13,15,16,18` pass `surface="glass"
variant="breath"` four times. **CONFIRMED.**

**(c) `glass-ui@7.0.0` Checkbox is `modelValue`/`update:modelValue` — TagEditPopover's checkbox
never reflects state and its toggle handler never fires.** Claimed by `TagEditPopover` D#2.
Verified — `dist/components/checkbox/Checkbox.vue.d.ts` declares `modelValue?: CheckedState` and
emits `"update:modelValue"`. Consumer `demo/palettes/browser/search/TagEditPopover.vue:28-29`:
```
:checked="currentTags.includes(tag.name)"
@update:checked="(checked: boolean) => onToggle(tag.name, checked)"
```
Both dead. `onToggle` (`:64`) is unreachable. **CONFIRMED — high-severity silent data loss.**

**(d) `ConsoleRail.componentDescription()` mis-resolves ICtCp's protan channel.**
Claimed by `picker-componentsliders-consolerail` C#4: "`cp` uppercases to `C` and can match
`Ct (tritan)` before the correct `Cp (protan)` row."
Verified — `ConsoleRail.vue:172-180` does `find(c => c.startsWith(upper) || c.startsWith(component))`;
`demo/color-session/colorSpaceInfo.ts:269` is
`components: ["Intensity (I)", "Ct (tritan)", "Cp (protan)"]`. **Reproduced under node:**
```
i  -> "Intensity (I)"     ct -> "Ct (tritan)"     cp -> "Ct (tritan)"   ← WRONG
```
**CONFIRMED.** (See §4 D-10 — the report *under*-called it.)

**(e) Dead public surface, three sites.**
- `ColorComponentDisplay.vue:93` declares emit `update`; the sole `emit(` in the file is `:33`
  `emit('input', …)`. Dead event. **CONFIRMED** (`ColorComponentDisplay` C#4 / L bullet 5).
- `ActionToolbar.vue:72` declares prop `canProposeName`; it appears nowhere in the file's
  92 lines. **CONFIRMED** (`shell-dock-actiontoolbar` C#1 / L bullet 6).
- `ActionToolbar.vue:91` `defineExpose({ clearHover })`; repo-wide `grep -rn clearHover demo/ src/`
  returns only the definition and the expose — **zero callers**, though
  `layers/ActionBarLayer.vue:29` does hold `ref<InstanceType<typeof ActionToolbar> | null>(null)`
  exactly as the report states. **CONFIRMED.**
- `GradientPane.vue:8` `const cssColorOpaque = inject(CSS_COLOR_KEY)!` — never read in the 29-line
  file. **CONFIRMED** (`wb-gradient-pane` C#1 / L#1).

**(f) `PointerDebugOverlay` a11y + clipboard defects.**
- `aria-controls="debug-body"` at `:13`; `grep 'id="'` over the whole file returns **nothing** —
  the reference dangles. **CONFIRMED.**
- `:123-125`: `document.execCommand("copy")` result discarded, then `copied.value = true`
  unconditionally → **false success**. **CONFIRMED.**
- `:121`/`:124` `appendChild`/`removeChild` with no `try/finally`. **CONFIRMED.**
- `:114`,`:126` anonymous `setTimeout`, no handle, and `grep onUnmounted|onScopeDispose` over the
  file → **none**. **CONFIRMED.**
- C#8 "**Action** buttons omit `type="button"`" — precisely scoped and correct: the header
  disclosure at `:9` *has* `type="button"`; the three action buttons at `:49`, `:55`, `:58` do
  not. **CONFIRMED, and correctly qualified.**

**(g) `ActionFeedback` timer lifecycle.** C#1 "the `watch` … is not immediate" — `:39-47`, no
`{ immediate: true }`. C#2 "not cleared on unmount" — `grep onUnmounted|onBeforeUnmount|
onScopeDispose` → none. C#6 "no accessible announcement" — no `role`/`aria-live` in the template.
**ALL CONFIRMED.**

### 3.2 — Cross-file / producer investigation is real where it happened (SUPERLATIVE)

`shell-dock-parseechoreadout` is the corpus's best work and it demonstrably read the producer:

| report claim | live proof |
|---|---|
| "trailing-debounced for two seconds" | `demo/color-session/useColorParsing.ts:92` `debounce(parseAndSetColor, 2000)` |
| "one channel-key-prefixed string per unique `PICKER_CHANNELS` entry plus optional alpha" | `useColorParsing.ts:94-105` — `${meta.key} …${meta.unit}`, then `parts.push('α …')` |
| "synchronous computeds from the same `model.value.color`" | `:94` and `:107` both read `model.value.color` |
| "Unknown spaces would fail upstream at the `PICKER_CHANNELS[color.space]` lookup" | `:96` |
| "Invalid-input feedback exists in parent `ColorInput.vue`" | `demo/shell/dock/ColorInput.vue:88` `>not a valid color` |
| "Enter commits immediately" | `ColorInput.vue:203` `if (e.key === "Enter")` |

`picker-debugeventlog` likewise: `MAX_EVENTS = 80` (`composables/usePointerDebug.ts:20`),
`target` truncation `.slice(0, 40)` (`:31`), `computed(() => [...events].reverse())` (`:33`),
`:key="i"` (`:10`), ordered `includes()` chain (`:36-41`), `(evt.ts / 1000).toFixed(2)` (`:14`).
**All exact.**

### 3.3 — Anti-overclaim discipline (SUPERLATIVE, and rare)

Multiple reports *refute their own naive hostile finding* in-line — evidence of a real adversarial
pass, not of report-shaped padding:

- `picker-debugeventlog` C#1: "The producer caps it at 80 events, so this is bounded O(80),
  **not an unbounded-growth defect**."
- `shell-dock-parseechoreadout` C#2/C#3: "duplicate keys are **not presently reachable**"; "stale
  or partial pairs are **not presently reachable**."
- `AdminListSkeleton` D#3: "…already gated by `prefers-reduced-motion: no-preference`; the
  remaining gap is a truthful local long-wait/calm-state contract, **not missing reduced-motion
  gating**." — I verified this against the compiled producer stylesheet:
  `glass-ui.css` contains literally
  `@media (prefers-reduced-motion:no-preference){.skeleton[data-v-cd03d0b0]:after{animation:skeleton-scan-cd03d0b0 …}}`.
  **The report is character-accurate about a third-party compiled CSS file.**
- `PaletteRenameInput` C#4: "…an **unverified** form-submit risk rather than a **proven**
  `@keydown.enter` defect."
- `TagEditPopover/challenge-D-design.md` declares its own derivation honestly: "It consumes the
  already-banked L/C source and runtime findings **as chronology**; it runs no Browser, product,
  API, or package command." It does not launder the prior workflow's runtime credit.

### 3.4 — Per-sample verdicts

| # | subject | axes read | verdict |
|---|---|---|---|
| 1 | `ActionFeedback` | C·D·L | **GENUINE** (C, D) / **ONE FALSE FINDING in L** — see D-1 |
| 2 | `AdminListItem` | C·D·L | GENUINE but LOW-YIELD (24-line slot wrapper; "SOURCE-RED" is manufactured severity) |
| 3 | `AdminListSkeleton` | C·D·L | **GENUINE, BEST-IN-CORPUS** (producer-CSS verified, self-corrected) |
| 4 | `PaginationBar` | C·D·L | **GENUINE** (dead `variant` axis confirmed) |
| 5 | `PaletteCardGrid` | C·D·L | GENUINE (all six C findings map to `:3,:7,:28,:37,:43,:51`) |
| 6 | `PaletteCardMeta` | C | GENUINE (`:37` slice(0,3), `:38` key=tag, `:46`/`:53` `?? 0`, `:51` no `aria-pressed`, `:47` `@click.stop`) |
| 7 | `PaletteRenameInput` | C·D·L | **GENUINE** in C (all 6 map to `:51,:53-56,:58-64,:5/:16,:13,:61`) / **ONE FALSE FINDING in D#5** — see D-2 |
| 8 | `UserSortMenu` | C·D·L | **GENUINE** (dead `variant="ghost"`; `aria-hidden` asymmetry `:13` vs `:23/:27/:31`) |
| 9 | `picker-colorcomponentdisplay` | C·D·L | **GENUINE** (dead `update` emit; `contenteditable` `:23`; `readoutDecimals` returns 0\|1 at `readoutReservation.ts:63`) |
| 10 | `picker-componentsliders-consolerail` | C·D·L | **GENUINE, HIGH-YIELD** (real ICtCp bug, reproduced) / D#4 carries the reduced-motion error class |
| 11 | `picker-debugeventlog` | C·D·L | **GENUINE** (all six findings exact; self-bounded) |
| 12 | `picker-pointerdebugoverlay` | C·D·L | **GENUINE** in C (7/8 exact, #8 precisely scoped) / **ONE FALSE FINDING in D#4** — see D-2 |
| 13 | `shell-dock-actiontoolbar` | C·D·L | **GENUINE** (two dead-surface findings confirmed repo-wide) |
| 14 | `shell-dock-parseechoreadout` | C·D·L | **GENUINE, BEST-IN-CORPUS** (deepest cross-file work) |
| 15 | `wb-gradient-pane` | C·D·L | **GENUINE** (dead injection; only report in the corpus with a git coordinate) |
| 16 | `TagEditPopover` (D) | D | **GENUINE and honestly derivative** (dead Checkbox API confirmed) |

**Filler count: 0.** Not one of the 46 is fabricated, hallucinated, or unanchored. Every
substantive assertion I tested resolved to a real construct at a real location.

---

## §4 — DEFECTS

### D-1 · HIGH · A materially FALSE finding — `ActionFeedback/challenge-L-library.md`

> "The transition class family is globally named and **not scoped to a producer motion token or
> reduced-motion policy**."

**Both halves are false.**

*Not scoped to a producer motion token* — `demo/styles/animations.css:142-154` defines
`.vj-celebrate-enter-active` / `-leave-active` entirely in producer tokens:
`var(--duration-fast)`, `var(--ease-decelerate)`, `var(--spring-bouncy-duration)`,
`var(--spring-bouncy)`, `var(--ease-accelerate)`. Every one of those is **glass-ui-owned** —
`--duration-fast: 0.2s` is defined in
`node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css`; `--spring-bouncy` and
`--spring-bouncy-duration` in `…/tokens/scheme-spring.css`. `grep -rn "spring-bouncy" demo/`
returns only the *consumption* site (`animations.css:145`) — the demo defines none of them.

*No reduced-motion policy* — `demo/styles/animations.css:184-193`:
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```
An app-wide guard that covers `.vj-celebrate-*` by construction. `ActionFeedback.vue`'s own
`<style scoped>` (`:50-58`) only sets geometry custom properties — nothing to override it.

**Impact:** an adjudicator acting on this L axis would open a defect against a design-system
boundary that is already correct in both respects.

### D-2 · HIGH · A *systematic* reduced-motion false-positive class the correction pass half-fixed

13 of the 48 reports raise reduced motion. **Exactly one — `AdminListSkeleton/challenge-D-design.md`
— actually checked the gating** (`grep -rli "animations.css|no-preference"` over the 48 → 1 hit).
The other 12 assert the gap from in-file reading alone. `demo/styles/animations.css` is **never
cited anywhere in the corpus**.

Three are materially false as written:

1. `ActionFeedback` L (above).
2. `picker-pointerdebugoverlay` D#4: "`FROZEN?` blinks every 0.5 s **forever; there is no
   reduced-motion rule**." — `PointerDebugOverlay.vue:179` is `animation: blink 0.5s infinite;`,
   a CSS *animation*, which the global guard pins to `animation-duration: 0.01ms !important;
   animation-iteration-count: 1 !important`. It does **not** blink forever, and there **is** a
   rule.
3. `PaletteRenameInput` D#5: "The transition classes do not declare a reduced-motion branch." —
   the classes are Tailwind `transition-colors` / `active:scale-95` (`:20`, `:26`), covered by the
   same guard.

(`ActionFeedback` D#5 hedges with "in this file" and is technically true but misleading;
`ConsoleRail` D#4 and the several "Audit … reduced motion" closure lines are directional, not
false.)

**The causal proof.** `stat`-derived batch structure shows a **partial correction pass at
03:07–03:11 touching 21 of 46 files**. `AdminListSkeleton/challenge-D-design.md` — the one that
gets reduced motion *right* — is in that batch (03:07). Every file carrying the false claim is
**outside** it: `ActionFeedback/challenge-L-library.md` **02:45** (first batch, never revised),
`ActionFeedback/challenge-D-design.md` 02:53, `picker-pointerdebugoverlay/challenge-D-design.md`
02:51, `PaletteRenameInput/challenge-D-design.md` 02:53,
`picker-componentsliders-consolerail/challenge-D-design.md` 02:51.

**The corpus demonstrably knew how to check this and applied the check to ~45 % of its own files.**
The independent hostile review nevertheless returned `CLEAN` / falsifier `null`.

### D-3 · HIGH · The "independent hostile review" certifies bytes that no longer exist

`coordination/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-INDEPENDENT-REVIEW-2026-08-03.md`
(verdict `CLEAN`, "First material falsifier: `null`") pins its reviewed tuple:

| pinned in the review | measured now | |
|---|---|---|
| report manifest `e66962864a34…` | `e66962864a34…` | **OK** |
| hydration ledger `7062709645ab…` | `7062709645ab…` | **OK** |
| completeness ledger `1c7da6f003da…` | `8b6185321518…` | **DRIFT** |
| reviewed closure **Markdown** `f44e5a0d87ef…` | `66228a35ec83…` | **NO SUCH ARTIFACT** |
| reviewed closure **JSON** `f78c6b923cc7…` | `9b6d484c0976…` | **NO SUCH ARTIFACT** |

**And the timestamps invert the dependency:**
```
2026-08-03 03:15:49  …INDEPENDENT-REVIEW-2026-08-03.md
2026-08-03 03:16:09  …CLOSURE-2026-08-03.md
2026-08-03 03:16:09  …CLOSURE-2026-08-03.json
2026-08-03 03:16:29  …CLOSURE-CHECKSUMS-2026-08-03.sha256
```
The review was written **20 seconds before** the closure documents it certifies. The
`CHECKSUMS` file, sealed 40 s after the review, records `66228a35…` / `9b6d484c…` — i.e. the
*post-review rewrite*. The pre-revision drafts `f44e5a0d…` / `f78c6b92…` are preserved nowhere in
the tree.

**Consequence: the `CLEAN` / `falsifier: null` verdict does not attach to the shipped closure
bytes.** The closure `.md` and `.json` both cite the review's hash (`15158f91…`, which does
verify) as their warrant — so the citation is one-directional and the review's own back-citation
is stale. This is a self-certification loop with a broken link, and D-1/D-2 show a first material
falsifier does in fact exist.

### D-4 · HIGH · `EXISTS-DIRECT` launders report-authored files as workflow output

`HYDRATION-LEDGER.md` totals `232 original · 51 direct`. Enumerating the 51 by subject:

```
3 each: wb-gradient-pane · shell-dock-parseechoreadout · shell-dock-genericactionbar ·
        shell-dock-actiontoolbar · picker-pointerdebugoverlay · picker-debugeventlog ·
        picker-componentsliders-consolerail · picker-colorcomponentdisplay · UserSortMenu ·
        PaletteRenameInput · PaletteCardMeta · PaletteCardGrid · PaginationBar ·
        AdminListSkeleton · AdminListItem · ActionFeedback          (= 48)
1 each: TagEditPopover(D) · wb-mix-animationcanvas · wb-extract-pane  (= 3)
```

`shell-dock-genericactionbar` is in that set — and it is **not** report-authored. Its
`challenge-C-implementation.md` (2026-07-29 14:41) carries a model seat (`gpt-5.6-sol`, `xhigh`),
dual-candidate inputs, a HEAD pin, interior citations (`GenericActionBar.vue:15-29`,
`usePaneRouter.ts:191-224`), a **"Binding browser receipt"** with real measurements
(`390×844`, `40×40`, `32×32`, direction `90°→337°`, `aria-valuenow=337` after `250 ms`), and a
terminal disposition (`DELETE`).

The ledger's single status word `EXISTS-DIRECT · payloads 0` therefore makes **a 6.7 KB
browser-proven adjudication and a 1.0 KB static read indistinguishable**. `COMPLETENESS-LEDGER.md`
then promotes every one of them to **`BANKED`**, and its footer reads
**`GREEN — zero incomplete components.`**

The closure prose warns against exactly this ("A run record saying 'completed' and a merely
present file are claims"), but the machinery erases the distinction it warns about. **A downstream
adjudicator reading only the ledgers cannot tell which of the 264 axes were probed and which were
read.**

### D-5 · MEDIUM · The closure checksum seal is currently BROKEN

```
$ shasum -a 256 -c …/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-CHECKSUMS-2026-08-03.sha256
…CLOSURE-2026-08-03.md:                OK
…CLOSURE-2026-08-03.json:              OK
…CLOSURE-REPORTS-2026-08-03.sha256:    OK
…CLOSURE-INDEPENDENT-REVIEW-…md:       OK
registry/HYDRATION-LEDGER.md:          OK
registry/COMPLETENESS-LEDGER.md:       FAILED
shasum: WARNING: 1 computed checksum did NOT match
```
`COMPLETENESS-LEDGER.md` was regenerated at 2026-08-03 10:39 (`1c7da6f0…` → `8b618532…`). Benign
in cause — the validator is meant to re-run — but the closure lists that SHA under **"Durable
evidence"**, so a durability claim in the shipped closure is false as of now.

### D-6 · MEDIUM · Evidence density collapse vs. the workflow corpus

| | 46 report-authored | 3 workflow siblings (9 canonical files) |
|---|---:|---:|
| total bytes | **74,403** | **437,594** |
| total words | **9,505** | **61,708** |
| per-file bytes | 1,006 – 2,984 | 35,058 – 104,937 |
| per-file words | 120 – 405 | 4,013 – 14,250 |
| interior citations/file | **1** (the whole-file receipt) — uniformly | 6 – 82 |
| probe scripts | **0** | 8 `.mjs` (`wb-generate-controls`), 8 (`TagEditPopover`), … |
| screenshots / frame dirs | **0** | 4 PNGs + `evidence/` (stopeditor); 5 `frames*/` (AdminUsersPanel) |
| measurement receipts | **0** | `probe-C2-implementation.json`, `probe-C2b-controls.json`, … |
| revision chains | **0** | `-r1-`, `-r2`, `.2026-07-24-pass`, `.2026-07-27-pass2`, `-r3-prior` |
| model/seat provenance | **0** | `gpt-5.6-sol` / `gpt-5.6-luna` @ `xhigh`, named |

Siblings compared: `wb-gradient-stopeditor`, `wb-generate-controls`, `AdminUsersPanel`, plus the
*leanest* workflow sibling `shell-dock-genericactionbar` (6.7–7.3 KB, 803–875 words, **26–29
interior citations each**). **Even the leanest workflow report carries ~27× the citation density
and ~4× the word count of a report-authored one.**

### D-7 · MEDIUM · Whole-file line ranges are not usable citations at scale

Every one of the 46 cites `lines 1–N` and nothing finer. Defensible for `AdminListItem` (24 L).
Not defensible for `ConsoleRail` (**329 L**), `PointerDebugOverlay` (**286 L**),
`ColorComponentDisplay` (**214 L**). I had to re-derive every anchor myself
(`ConsoleRail.vue:187` for C#1, `:184`+`:27` for C#2, `:174` for C#4, `:115`/`:128` for L#2,
`:13`/`:29` for D#1). An adjudicator inherits that entire cost, per finding, and cannot verify
drift cheaply. Contrast `shell-dock-genericactionbar`, which cites `GenericActionBar.vue:15-29`
and `usePaneRouter.ts:191-224` inline.

### D-8 · MEDIUM · Verdict monoculture makes the axis unfalsifiable as a gate

Verdict census over the 48: **43 `SOURCE-RED` · 2 `CONDITIONAL / SOURCE-RED` · 3 `DEFECTIVE`**.
Of the three `DEFECTIVE`, two are the pre-existing workflow `TagEditPopover` C/L; the third is
`TagEditPopover/challenge-D-design.md`, which inherits its severity from those. **No
report-authored file reached a non-`SOURCE-RED` disposition on its own evidence.**

A source-only pass over any real component will always find unmodelled states, so `SOURCE-RED` is
unfalsifiable by construction. `AdminListItem` — a 24-line, script-less, three-slot layout
wrapper — is `SOURCE-RED` on all three axes. That is a manufactured red, not a challenge outcome.

### D-9 · LOW · Non-uniform receipt discipline

Exactly **1 of 46** (`wb-gradient-pane/challenge-D-design.md`) pins a `HEAD`/`tree` coordinate;
the other 45 pin only the file SHA. Since the file SHA is the load-bearing binding this is not
fatal, but it means 45 reports cannot be re-sited to a repository state without external context.

### D-10 · LOW · `ConsoleRail` C#4 under-calls the bug it found

The report names only `cp`. Running the same algorithm over `jzazbz`
(`colorSpaceInfo.ts:295` → `["Lightness (Jz)", "az (red-green)", "bz (yellow-blue)"]`):
```
jz -> "jz"      ← no match at all: falls through to the raw key
az -> "az (red-green)"      bz -> "bz (yellow-blue)"
```
`jz` matches neither `"J"`-prefixed nor `"jz"`-prefixed and silently degrades to the bare channel
key. Two broken descriptions, one reported. Direction of error is *conservative* — the report
under-claims — but it shows the pass did not enumerate the registry it was reasoning about.

---

## §5 — Extrapolation and disposition

**Sampling basis.** I read **all 46** report-authored files (not a sample), verified **45/45**
source receipts mechanically, and verified ~40 interior assertions across **16 subjects and all
three axes** against live bytes. The extrapolation below is therefore near-census, not inference.

**Can adjudication trust these axes as challenge corpus?**

**PARTIALLY — with a named quarantine, and never as workflow-equivalent.**

1. **TRUST the C and L axes as a static findings ledger.** Yield is genuinely high: nine
   independently confirmed live defects, three of them cross-package API-drift bugs
   (Button/Skeleton/Checkbox) that no runtime probe on the *demo* alone would have surfaced, and
   one (the dead Checkbox binding) that silently breaks a user-facing feature. Receipts are
   byte-exact. Anti-overclaim discipline is better than several workflow reports.

2. **QUARANTINE every motion/reduced-motion assertion.** 12 of 13 were made without reading
   `demo/styles/animations.css:184-193`; three are materially false (D-1, D-2). Any finding in
   this class must be re-checked before it enters a defect ledger.

3. **RE-RUN, as workflow challenges, exactly three:**
   - `ActionFeedback` **L** — contains a confirmed false finding; the axis is unsound as written.
   - `picker-pointerdebugoverlay` **D** — confirmed false #4 plus an untested high-volume /
     export-failure surface that only a probe can settle.
   - `picker-componentsliders-consolerail` **D** — 329-line subject, whole-file citation, the
     Kronecker matrix it demands (spaces × channels × forced-colors × orientation) is exactly what
     static reading cannot supply; the C axis already proved a real bug worth a runtime cell.

   The remaining 43 do **not** need re-running for *correctness*. They need re-running only if a
   gate requires runtime, Apple-platform, or measurement evidence — which is the whole point of
   the D axis and which none of the 46 supplies.

4. **DO NOT let `264/264 GREEN` stand unqualified.** The number is true as a *file-existence and
   hash-banking* count and the closure prose says so honestly. But `HYDRATION-LEDGER`'s
   `EXISTS-DIRECT` and `COMPLETENESS-LEDGER`'s `BANKED` erase the distinction between
   browser-proven adjudication and 34-seconds-of-reading, and the `GREEN — zero incomplete
   components` footer is what a downstream reader will carry forward. **The ledger needs a fourth
   status word** separating report-authored axes from workflow-authored ones, and the 46 should
   carry it.

5. **The `CLEAN` independent review should be treated as VOID for the shipped bytes** (D-3) — it
   pins two hashes that exist nowhere, predates its subject by 20 seconds, and returned
   `falsifier: null` against a corpus containing at least three material falsifiers. If a hostile
   review is required for this closure, it must be re-issued against `66228a35…` / `9b6d484c…`.

**What was done well, stated plainly.** Given a hard capacity wall and 46 missing axes, the Codex
instance did not fabricate. It bound every report to a hashed source coordinate that still
verifies four days later, it read the *producer package* (compiled CSS and `.d.ts`) rather than
guessing, it repeatedly refused to overclaim where the naive hostile reading would have been
wrong, it labelled its own zero-runtime boundary in every single file, and it found real bugs.
The failure is not dishonesty — it is that a 26-minute static pass was allowed to close a
coverage numerator whose vocabulary cannot express the difference.

---

### Appendix — commands whose output backs this report

```
shasum -a 256 -c docs/.../VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-REPORTS-2026-08-03.sha256   # 48/48 OK
shasum -a 256 -c docs/.../VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-CHECKSUMS-2026-08-03.sha256 # 1 FAILED
git cat-file -t e01d0065fa6c7c80282280566af2b9a4add809bf                                      # commit
git rev-parse e01d0065…^{tree}                            # a28eb1a79ee695ce77699ab70e14b2feb7ec5ba5
cat node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts     # no `variant`
cat node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts # only `class`
cat node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts # modelValue only
grep -o "@media (prefers-reduced-motion:no-preference){[^@]*" …/glass-ui.css | grep -i skeleton
sed -n '140,215p' demo/styles/animations.css                                # the global guard
grep -rn "spring-bouncy" demo/ node_modules/@mkbabb/glass-ui/dist           # token ownership
grep -rn "canProposeName\|clearHover" demo/ src/                            # dead surfaces
node -e '<componentDescription replay>'                                     # cp -> "Ct (tritan)"
```

*Lane report. Read-only throughout; no product file, no `~/.codex` artifact, and no git state was
modified.*
