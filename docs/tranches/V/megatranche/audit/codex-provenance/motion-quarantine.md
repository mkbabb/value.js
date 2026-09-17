# MOTION QUARANTINE — the 46 Codex report-authored challenge files

**Seat.** Sweep every motion / animation / transition / reduced-motion / PRM assertion in the
46 REPORT-AUTHORED challenge files and adjudicate each against BOTH app-wide guards.

**Method.** Docs-only. Live dev stack (`http://localhost:9000`, API `:3000`). Four Playwright
probes under `evidence-motion-quarantine/`, each measured at `reducedMotion: "no-preference"`
AND `"reduce"`. Every ruling below carries a `file:line` into live bytes plus a probe key.

## Receipt

| | |
|---|---|
| HEAD | `41450f026bb51d5a96e328175bc9168c37047eec` |
| tree | `b431561b21cc861b9925a456b8d3bca9d4966d8d` |
| subject set | the 46 `REPORT-AUTHORED` rows of `registry/HYDRATION-LEDGER.md` (= `closure.newCanonicalReports: 46`, `coordination/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-2026-08-03.json`) |
| glass-ui | `@mkbabb/glass-ui` **7.0.0** |
| probes | `evidence-motion-quarantine/probe.mjs`, `probe2-skeleton.mjs`, `probe3-gradientpane.mjs`, `probe4-real-elements.mjs` → `RESULTS*.json` |
| runtime commands | 8 browser contexts (4 probes × 2 motion states); product changes **0** |

---

## §1 · The two guards, as SERVED bytes

Both guards are in the live cascade. Import chain, verified:

- **Guard 1 — demo global neutraliser.** `demo/styles/animations.css:184-193`, reached at
  `demo/styles/foundation.css:76` (`@import "./animations.css"`).
  sha256 `a64eb64fc847b1f1feffe49fd8b211f2aa335f43ceeac8bb626095e89968444b`.
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
  Plus a deliberate overlay carve-out at `:202-212` (`[data-state="open"|"closed"]` keep a
  150 ms **opacity-only** fade — later source order, so it wins the equal-specificity tie).

- **Guard 2 — glass-ui a11y-overrides.** `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css:1`,
  reached at `foundation.css:56` (`@import "@mkbabb/glass-ui/styles"`) →
  `dist/styles/index.css` → `@import "./accessibility.css"` → `@import "./utilities/a11y-overrides.css"`.
  sha256 `511e861a88fd2436f63395b6a2bbf32a60f4ade93d4f4d77473bad8a38e428d7`.
  ```css
  @media (prefers-reduced-motion: reduce) {
      *:not([data-allow-motion]) { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
      *:not([data-allow-motion]) { transition-duration: 0.1s !important;
          transition-property: opacity, color, background-color, border-color, box-shadow !important; }
      [data-allow-motion] { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important; }
  }
  ```

**Cascade winner (measured, not reasoned).** `*:not([data-allow-motion])` scores (0,1,0) against
Guard 1's `*` (0,0,0), so **Guard 2 wins `transition-*`**. The consequence is stronger than either
guard alone: under `reduce` the transition **property list itself** is rewritten to
`opacity, color, background-color, border-color, box-shadow` — `transform`, `max-height`,
`border-radius`, `filter` are *removed from the transition set entirely*, not merely shortened.
Guard 1 still supplies `scroll-behavior` and the `*::before/::after` reach.

`probe.mjs` block `B.reduce`, every carrier:
`transition-property: opacity, color, background-color, border-color, box-shadow` /
`transition-duration: 0.1s` / `animation-duration: 1e-05s` / `animation-iteration-count: 1`.
The `[data-allow-motion]` escape hatch does **not** leak: `control.allowMotion` still reads
`animation-duration: 1e-05s`, `animation-iteration-count: 1`.

`probe.mjs` block `A.servedGuards` additionally enumerates **21** `prefers-reduced-motion` media
rules in the served CSSOM (2 global neutralisers + 1 demo overlay carve-out + 18 producer
component-level blocks). The corpus never cited any of them.

---

## §2 · Ruling convention

| ruling | meaning |
|---|---|
| **TRUE** | the assertion holds against live bytes + both guards |
| **FALSE** | contradicted by live bytes or by measurement. Includes *verification obligations already discharged* — a cell asserting "reduced motion is unsettled here" when measurement settles it |
| **UNPROVEN** | not truth-apt against bytes (prescriptive target) or a design judgment requiring evidence outside this sweep |

Rows are limb-split where one sentence makes two separable claims.

---

## §3 · The assertion table — 34 rows across 16 files

| # | file | line | assertion (compressed) | ruling | guard evidence |
|---|---|---|---|---|---|
| M-01 | `ActionFeedback/challenge-C-implementation.md` | 18 | required-verification cell: "…**reduced motion**, and assistive announcement" | **FALSE** | Obligation, already discharged. The file's only motion is `<Transition name="vj-celebrate">` (`ActionFeedback.vue:3`) — pure CSS. `probe.mjs B.reduce.actionFeedback.celebrateEnter` → `transition-property: opacity, color, background-color, border-color, box-shadow`, `0.1s` (vs `opacity, transform, max-height` / `0.2s` at no-preference). The whole spatial grammar is gone. Nothing left to audit. |
| M-02 | `ActionFeedback/challenge-D-design.md` | 11 | "Success and error share the same auto-dismiss lifetime and animation grammar" | **TRUE** | Bytes: `ActionFeedback.vue:30` `{ autoDismissMs: 2500 }` — one default, no variant branch; `:39-47` one watcher that never reads `props.variant`; `:3` one `<Transition name="vj-celebrate">` for both. Accurate. |
| M-03 | `ActionFeedback/challenge-D-design.md` | 15 | finding #5: "Celebration motion has no explicit reduced-motion design **in this file**" | **FALSE** | Filed as a defect under a SOURCE-RED verdict. `demo/styles/animations.css:142-166` defines the family; `:184-193` + glass-ui `a11y-overrides.css:1` govern it. Measured `B.reduce`: `animation-duration 1e-05s`, `transform`/`max-height` dropped from the transition set. The "in this file" hedge is scope-shopping — motion is governed **centrally by design**, which is the correct architecture, not a gap. |
| M-04 | `ActionFeedback/challenge-D-design.md` | 19 | "Audit …, **reduced motion**, keyboard, screen reader, phone, and desktop" | **FALSE** | Obligation, discharged — same measurement as M-01/M-03. |
| M-05 | `ActionFeedback/challenge-L-library.md` | 5 | "hand-builds a toast/status primitive from **Vue transition** plus lucide icons" | **TRUE** | `ActionFeedback.vue:3` `<Transition>`, `:21` `@lucide/vue`, zero glass-ui imports in 58 lines. Accurate as stated. |
| M-06 | `ActionFeedback/challenge-L-library.md` | 9 | "Imports are `vue` and `@lucide/vue`; there is no glass-ui alert, toast, live-region, **motion**, or button primitive" | **TRUE** | Import list is byte-exact (`:20-21`). **Material caveat:** no glass-ui motion *component* is imported, but the motion itself is entirely producer-owned via tokens — see M-07. |
| M-07 | `ActionFeedback/challenge-L-library.md` | 12 | "The transition class family is globally named and **not scoped to a producer motion token or reduced-motion policy**" | **FALSE** | Three limbs. (a) "globally named" — TRUE (`animations.css:141-166`). (b) "not scoped to a producer motion token" — **FALSE**: `animations.css:142-153` consumes six tokens, `--duration-fast`, `--ease-decelerate`, `--spring-bouncy`, `--spring-bouncy-duration`, `--duration-normal`, `--ease-accelerate`, **all** defined in `glass-ui/dist/styles/` with **zero** demo re-definitions (`grep` over `demo/` returns 0 hits for every one). (c) "not scoped to … reduced-motion policy" — **FALSE**, measured. Net FALSE. |
| M-08 | `ActionFeedback/challenge-L-library.md` | 16 | target: "A shared `ActionResult` primitive should own severity, …, and **motion**" | **UNPROVEN** | Prescriptive; not truth-apt against bytes. Its motion premise (that motion is currently unowned) is nonetheless already false — see M-07. |
| M-09 | `AdminListSkeleton/challenge-C-implementation.md` | 13 | "**Transition** from skeleton to data has no focus/announcement contract" | **TRUE** | Non-motion sense ("transition" = state change). `AdminListSkeleton.vue` is 24 lines with no focus or announcement handling; the swap is parent-owned. Accurate. |
| M-10 | `AdminListSkeleton/challenge-C-implementation.md` | 15 | "reduced motion **eliminates** the producer's default scan animation" | **TRUE** | `probe2-skeleton.mjs`: no-preference → `.skeleton[data-v-cd03d0b0]::after` = `skeleton-scan-cd03d0b0`, `5s`, `infinite`, `will-change: transform`, `transform: matrix(1,0,0,1,-88,0)`. reduce → `animationName: none`, `will-change: auto`, `transform: none`. The declaration is **absent**, not clamped, because the producer gates the whole block on `no-preference` (`glass-ui.css` char 23789). "Eliminates" is exactly right. |
| M-11 | `AdminListSkeleton/challenge-D-design.md` | 7 | verdict: "its announcement, quantity, **motion**, and long-wait behavior are unspecified" | **FALSE** | Motion limb only. The motion is fully specified — by the producer, at `glass-ui.css` char 23789, and measured eliminated under `reduce` (M-10). The file's own `:13` concedes this three lines later; the verdict line was never updated to match. |
| M-12 | `AdminListSkeleton/challenge-D-design.md` | 13 | "`surface="glass"`/`variant="breath"` are not accepted Skeleton props and are inert attrs. The installed primitive therefore runs its default scan animation, **which is already gated by `prefers-reduced-motion: no-preference`**" | **TRUE** | All three limbs verified. (a) `glass-ui/dist/components/skeleton/Skeleton.vue.d.ts` declares `__VLS_Props = { class?: HTMLAttributes["class"] }` — `surface`/`variant` fall through as inert attrs. (b) The scan runs (`probe2` no-preference). (c) Gated by `no-preference` — the **only** such gate in `glass-ui.css` (`grep -c "no-preference"` → 1). **This is the corpus's one correct reduced-motion row and the only file in 46 that cites gating at all.** |
| M-13 | `AdminListSkeleton/challenge-D-design.md` | 19 | "Audit …, **reduced motion**, 200% text, …, **transition** to ready/empty/error" | **FALSE** | Reduced-motion cell discharged (M-10/M-12). The ready/empty/error "transition" is a state contract, not motion — that limb is untouched by this sweep. |
| M-14 | `AdminListSkeleton/challenge-L-library.md` | 9 | "the installed primitive accepts only class, so repeated `surface`/`variant` are **inert** rather than producer axes" | **TRUE** | `Skeleton.vue.d.ts` as above. Byte-exact. |
| M-15 | `AdminListSkeleton/challenge-L-library.md` | 14 | target: "producer **motion tokens** owning **reduced-motion** behavior" | **UNPROVEN** | Prescriptive. Premise already satisfied: the producer owns it via the `no-preference` gate, so the target describes the shipped state rather than a change. |
| M-16 | `PaletteCardMeta/challenge-L-library.md` | 11 | "The vote button hand-owns destructive color, **pressed state**, focus behavior, and icon geometry" | **TRUE** | `PaletteCardMeta.vue:45` verbatim: `active:scale-95 active:bg-accent/70 transition-colors duration-fast`. Locally hand-authored — accurate. **Motion note:** the press is safe regardless — `probe.mjs B.reduce.paletteCardMeta.voteBtn` shows `transform` absent from the property list, so the scale never animates under `reduce`. |
| M-17 | `PaletteRenameInput/challenge-D-design.md` | 15a | "The **transition classes do not declare a reduced-motion branch**" | **FALSE** | There is no Vue `<Transition>` in this file at all; the "transition classes" are Tailwind `transition-colors` + `active:scale-95` (`PaletteRenameInput.vue:20`, `:26`). `probe.mjs` on the verbatim class string: no-preference → `color, background-color, border-color, outline-color, …` @ `0.2s`; reduce → `opacity, color, background-color, border-color, box-shadow` @ `0.1s`. The colour legs survive **by deliberate design** (glass-ui `a11y-overrides.css:1` preserves colour — non-vestibular); `active:scale-95` is not in either property list, so no spatial motion exists to gate. Both guards reach it; there is nothing missing. |
| M-18 | `PaletteRenameInput/challenge-D-design.md` | 15b | "auto-focus/select can be disorienting if editing is entered indirectly" | **UNPROVEN** | The autofocus is real and unconditional (`:53-56` `onMounted` → `focus()` + `select()`). Whether it disorients requires an entry-path study this sweep did not run. Not a motion claim. |
| M-19 | `PaletteRenameInput/challenge-L-library.md` | 10 | "The two raw icon buttons still hand-author padding, radius, hover, **active scale**, focus, and icon sizing" | **TRUE** | `:20` / `:26` verbatim — `p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 active:bg-accent/70 transition-colors … focus-visible:ring-2`. Every named property is present and locally authored. |
| M-20 | `TagEditPopover/challenge-D-design.md` | 18 | "Loading has a **spinner** but no accessible label" | **TRUE** | `TagEditPopover.vue:12` `<Loader2 class="h-4 w-4 animate-spin text-muted-foreground" />` — no `aria-label`, no `role="status"` anywhere in the file. **Motion note:** the spinner itself is governed — `probe.mjs`: no-preference `spin` / `1s` / `infinite`; reduce `1e-05s` / `1`. No motion defect rides along with the label defect. |
| M-21 | `picker-colorcomponentdisplay/challenge-D-design.md` | 12 | "intrinsic cells still **move** at digit-count boundaries such as `9.9 → 10.0`" | **TRUE** | And it is a *superlative-aware* row. `readoutReservation.ts:10-16` states the same fact as design intent: cells are INTRINSIC because per-cell `ch` `min-width` reservation was retired (it "rendered the worst case as BLANK width on every non-worst value — 39–51% of every cell was empty reservation"); "widths change only at digit-count boundaries, never per value." The report describes a deliberate trade, correctly. |
| M-22 | `picker-colorcomponentdisplay/challenge-D-design.md` | 16 | "There is no edit affordance, caret treatment, instruction, or **mode transition**" | **TRUE** | Non-motion sense (idle→edit UI mode). `ColorComponentDisplay.vue` (214 lines) contains **zero** `transition` / `animation` / `<Transition>` declarations. Accurate. |
| M-23 | `picker-colorcomponentdisplay/challenge-D-design.md` | 25 | "Audit every space/component, …, forced colors, and **reduced motion**" | **FALSE** | Vacuous cell. The component declares no motion of any kind (see M-22); anything inherited is guard-governed. Nothing to audit. |
| M-24 | `picker-componentsliders-consolerail/challenge-C-implementation.md` | 14 | "The tab pattern emits selection and **moves focus** but does not bind `aria-controls`" | **TRUE** | Non-motion sense (roving focus). `ConsoleRail.vue:26-37` — `role="tab"`, `:tabindex="railTabIndex(component)"`, `@keydown="onRailKeydown(...)"`, and no `aria-controls` attribute anywhere in the file. Accurate. |
| M-25 | `picker-componentsliders-consolerail/challenge-D-design.md` | 21a | "The live-color dot can become visually dominant or **noisy across rapid color changes**" | **UNPROVEN** | Salience judgment. Measurement narrows it: `background-color` is **not** in `.rail-dot`'s transition list (`probe4` no-preference: `transform, border-radius, filter, box-shadow` @ `0.2s, 0.6s, 0.2s, 0.2s`), so colour changes land instantly — there is no motion-derived "noise" channel. Dominance remains a design judgment this sweep does not settle. |
| M-26 | `picker-componentsliders-consolerail/challenge-D-design.md` | 21b | "no **reduced-motion**/high-contrast/forced-colors design is stated" | **FALSE** | Reduced-motion limb, refuted **three times over**. (1) `probe4.reduce.railDot` (a real mounted `WatercolorDot`, channel activated): `transition-property` clamped to `opacity, color, background-color, border-color, box-shadow` @ `0.1s` — the `transform` and the 0.6 s `border-radius` morph are gone. (2) The producer ships a dedicated block: `@media (prefers-reduced-motion: reduce){ .watercolor-swatch.watercolor-animated { transform: none } }` (`glass-ui.css` char 69648). (3) The rail's own entrance lives **entirely inside** `@media (prefers-reduced-motion: no-preference)` (`demo/styles/animations.css:43-54`, comment `:31-33` "inv-N-9 PRM: the whole utility lives inside `no-preference`") — measured `.stagger-children > *` = `stagger-child-in` / `0.3s` at no-preference vs `none` at reduce. The high-contrast/forced-colors limbs are outside this sweep and are **not** adjudicated here. |
| M-27 | `picker-componentsliders-consolerail/challenge-D-design.md` | 27 | Kronecker cells "… × keyboard/touch/pointer × **reduced-motion** × phone …" | **FALSE** | Obligation discharged by M-26's three measurements. |
| M-28 | `picker-pointerdebugoverlay/challenge-D-design.md` | 14a | "`FROZEN?` blinks every 0.5 s **forever**" | **FALSE** | `probe.mjs C1`, frozen state genuinely induced (pointerdown held 4.2 s past `FREEZE_THRESHOLD_MS`): no-preference → `blink-6d4a6a5e` / `0.5s` / `infinite`, opacity sampled `0.947`. reduce → `animation-duration: 1e-05s`, `animation-iteration-count: 1`, opacity pinned `1` across 5 samples. It blinks forever only for users who have not asked otherwise. |
| M-29 | `picker-pointerdebugoverlay/challenge-D-design.md` | 14b | "there is **no reduced-motion rule**" | **FALSE** | Two rules reach `PointerDebugOverlay.vue:179` (`animation: blink 0.5s infinite`): `demo/styles/animations.css:184-193` and glass-ui `a11y-overrides.css:1`. Both are `!important`, so the scoped `.debug-frozen[data-v-…]` (0,2,0) cannot outrank them. Neither rule is *in the file* — which is the point: motion is governed centrally, not duplicated per component. |
| M-30 | `picker-pointerdebugoverlay/challenge-D-design.md` | 14c | "the question mark weakens a diagnostic assertion" | **UNPROVEN** | Copy judgment; not a motion claim. `:17` renders the literal `FROZEN?`. |
| M-31 | `picker-pointerdebugoverlay/challenge-D-design.md` | 21 | "Audit collapsed/expanded/…, **reduced motion**, forced colors, and safe areas" | **FALSE** | Reduced-motion cell discharged. The file's *entire* motion surface is the `:179` blink (M-28/M-29) and the `.debug-btn` press at `:261-269` (`transition: filter …, transform …` + `:active { transform: scale(0.95) }`) — under `reduce` `transform` and `filter` are both struck from the property list. Nothing survives. |
| M-32 | `shell-dock-actiontoolbar/challenge-D-design.md` | 21 | "Audit idle/editing/…; keyboard/touch; **reduced motion**; and large text" | **FALSE** | `ActionToolbar.vue` (92 lines) declares **zero** transition/animation/`<Transition>`. Its children do: `ActionButton.vue:25` `transition-[transform,stroke]`, `:122-135` `animation: action-pulse 0.4s … forwards` + a `rotate(-360deg)` keyframe. `probe4` on the real `.action-icon`: no-preference `transition-property: transform, stroke`; reduce → `opacity, color, background-color, border-color, box-shadow` @ `0.1s`, `animation-duration: 1e-05s`, `animation-iteration-count: 1`. The pulse and the spin are both neutralised. |
| M-33 | `wb-gradient-pane/challenge-D-design.md` | 16 | "`h-full`, `overflow-y-auto`, and **a bottom fade** create a scroll affordance … The fade can also suggest hidden content" | **FALSE** | **There is no bottom fade.** `.pane-scroll-fade` (`GradientPane.vue:20`) is defined unscoped at `demo/shared/ui/PaneHeader.vue:54-57` and sets exactly two properties: `contain: layout style paint` and `scroll-timeline: --pane-scroll block`. `probe3` on the live mounted pane at `#/gradient`: `mask-image: none`, `-webkit-mask-image: none`, `::before` `background-image: none`, `::after` `background-image` = the paper-grain SVG data-URI (a texture, not a gradient). The class name is a misnomer surviving a retired mechanism; the report read the **name**, not the rule. |
| M-34 | `wb-gradient-pane/challenge-D-design.md` | 33 | "This D axis closes only when … with focus, **reduced-motion**, and narrow-width proofs" | **TRUE** | **The one surviving reduced-motion obligation in all 46 files** — see §4. `.pane-scroll-fade` makes GradientPane the host of the named scroll-timeline `--pane-scroll`, which drives three scroll-driven animations in `PaneHeader.vue:177-194`. Scroll-driven animations take progress from the timeline, not the clock, so both guards' `animation-duration` clamp is **inert** against them. Measured, and the obligation stands. |

---

## §4 · NEW DEFECT (discovered by the sweep, asserted by none of the 46)

### MQ-1 · HIGH — the two PRM guards have a **scroll-driven blind spot**; the pane header keeps its full spatial motion under `reduce`

`demo/shared/ui/PaneHeader.vue:177-194`:

```css
@supports (animation-timeline: scroll()) {
    .pane-header::before   { animation: pane-header-veil linear both;  animation-timeline: --pane-scroll; animation-range: 0px 64px; }
    .pane-header-title     { animation: pane-title-shrink linear both; animation-timeline: --pane-scroll; animation-range: 0px 120px; }
    .pane-header-desc-wrap > p { animation: pane-desc-shrink linear both; animation-timeline: --pane-scroll; animation-range: 0px 80px; }
}
```

`pane-title-shrink` (`:205-212`) is `transform: scale(1) → scale(var(--pane-title-shrink-ratio))` —
a real spatial scale. Both guards clamp `animation-duration`; a `animation-timeline`-driven
animation ignores `animation-duration` entirely.

**Reproduction** — `probe3-gradientpane.mjs`, `#/gradient`, viewport 1440×900, `host.scrollTop = 200`:

| | `no-preference` | `reduce` |
|---|---|---|
| `.pane-header-title` `animation-name` | `pane-title-shrink-19daabcf` | `pane-title-shrink-19daabcf` |
| `.pane-header-title` `animation-duration` | `auto` | **`1e-05s`** ← guard fired |
| `.pane-header-title` `animation-timeline` | `--pane-scroll` | `--pane-scroll` |
| `.pane-header-title` `transform` @ scroll 200 | `matrix(0.805831, 0, 0, 0.805831, 0, 0)` | **`matrix(0.805831, 0, 0, 0.805831, 0, 0)`** |
| `.pane-header-title` height @ scroll 0 → 200 | 43.98 px → **35.44 px** | 43.98 px → **35.44 px** |
| `.pane-header::before` opacity @ scroll 200 | `0.9775` | `0.9775` |

The guard demonstrably fired (`1e-05s`) and was demonstrably powerless: a ~19 % spatial scale
plus an opacity scrub run **byte-identically** for a user who asked for reduced motion.

**Blast radius.** Nine sibling panes carry `.pane-scroll-fade` — Browse, Admin, About, Palettes,
Mix, Gradient, Extract, Generate, ConfigSlider (`PaneHeader.vue:43-45`). This is not a
GradientPane-local issue.

**Why it matters here.** It is the *only* reason `wb-gradient-pane/challenge-D-design.md:33`
(M-34) survives as a real obligation while the other twelve reduced-motion cells collapse. The
correct cure is a `@media (prefers-reduced-motion: reduce)` block in `PaneHeader.vue` that sets
`animation-timeline: none` (or `animation: none`) on the three selectors — the discrete end-state
still lands, the scrub does not. *No fix is applied here; docs-only seat.*

---

## §5 · Superlatives found (with the same evidence standard)

- **S-1 · Motion is governed centrally and correctly.** 21 `prefers-reduced-motion` media rules in
  the served CSSOM; two global neutralisers whose interaction is *stronger* than either alone
  (Guard 2's property-list rewrite deletes `transform`/`max-height`/`border-radius`/`filter`
  from every transition, rather than merely shortening them). No component in the 46 ships a
  duplicated local PRM copy — which is exactly what twelve of the reports mistook for absence.
- **S-2 · The `[data-allow-motion]` opt-out is not an escape hatch.** `probe.mjs B.reduce.control.allowMotion`
  → `animation-duration: 1e-05s`, `animation-iteration-count: 1`. Opting in to motion still
  cannot produce an infinite animation under `reduce`.
- **S-3 · The producer eliminates rather than clamps where it matters.** The Skeleton scan lives
  *inside* `no-preference` (`glass-ui.css` @ 23789), so under `reduce` the declaration, the
  `will-change: transform` compositor hint, and the transform all disappear — measured
  `will-change: auto`. Same idiom in the demo at `animations.css:43-54` for `stagger-children`,
  with the comment naming the invariant (`inv-N-9 PRM`).
- **S-4 · The overlay carve-out is a deliberate, ordered exception.** `animations.css:196-212`
  restores a 150 ms **opacity-only** fade for `[data-state]` primitives and documents *why* it must
  come after the global guard (equal specificity, equal `!important` → source order decides).
  Measured: `.stagger-children > *` under `reduce` reads `transition-property: opacity` /
  `0.15s` — the carve-out winning, exactly as written.

---

## §6 · Counts

| | |
|---|---|
| files swept | **46** |
| motion assertions adjudicated | **34** (across 16 files) |
| **TRUE** | **14** |
| **FALSE** | **15** |
| **UNPROVEN** | **5** |
| new defects discovered | **1** (MQ-1, HIGH) |
| superlatives recorded | **4** |

**FALSE breakdown — 15 = 8 substantive + 7 discharged obligations.**

- **8 substantive false claims:** M-03, M-07, M-11, M-17, M-26, M-28, M-29, M-33.
- **7 verification-obligation cells** that measurement already discharges: M-01, M-04, M-13,
  M-23, M-27, M-31, M-32.

Of the 13 reduced-motion raisers, **exactly one**
(`AdminListSkeleton/challenge-D-design.md:13`, M-12) checked the gating; the other twelve
asserted the gap from in-file reading alone. `demo/styles/animations.css` is cited **zero** times
in all 46 files.

**Delta against the prior pass.** `codex-provenance/axes-quality.md:278-310` named 3 materially
false claims from static reading. All 3 are **confirmed here with probes** — `ActionFeedback` L:12
(M-07), `picker-pointerdebugoverlay` D#4 (M-28 + M-29 — one carrier, two limbs),
`PaletteRenameInput` D#5 (M-17). Those 3 claims account for 4 of the 8 substantive rows. The
sweep adds **4 more false claims** the prior pass either softened or never reached, **plus one
new defect**:

| new | prior treatment | why it flips |
|---|---|---|
| M-03 `ActionFeedback` D:15 | "technically true but misleading" | it is *filed as a defect* under a SOURCE-RED verdict; as a finding it is false |
| M-11 `AdminListSkeleton` D:7 | not examined | the verdict line contradicts the same file's own corrected `:13` |
| M-26 `ConsoleRail` D:21b | "directional, not false" | three independent PRM mechanisms measured on the real mounted dot |
| M-33 `wb-gradient-pane` D:16 | not examined | not a PRM claim at all — the asserted "bottom fade" does not exist |
| MQ-1 (new defect) | not examined | the guards' scroll-driven blind spot; the reason M-34 survives |

---

## §7 · File-level disposition

### §7.1 · Fully cleared — every motion assertion TRUE (5 files)

| file | rows |
|---|---|
| `audit/components/AdminListSkeleton/challenge-C-implementation.md` | M-09, M-10 |
| `audit/components/PaletteCardMeta/challenge-L-library.md` | M-16 |
| `audit/components/PaletteRenameInput/challenge-L-library.md` | M-19 |
| `audit/components/TagEditPopover/challenge-D-design.md` | M-20 |
| `audit/components/picker-componentsliders-consolerail/challenge-C-implementation.md` | M-24 |

### §7.2 · Cleared with caveat — no FALSE, ≥1 UNPROVEN (1 file)

| file | rows |
|---|---|
| `audit/components/AdminListSkeleton/challenge-L-library.md` | M-14 TRUE, M-15 UNPROVEN (prescriptive) |

### §7.3 · STILL QUARANTINED — carries ≥1 FALSE motion assertion (10 files)

| file | false rows | must not be adopted until |
|---|---|---|
| `audit/components/ActionFeedback/challenge-C-implementation.md` | M-01 | the reduced-motion verification cell is struck |
| `audit/components/ActionFeedback/challenge-D-design.md` | M-03, M-04 | finding #5 is withdrawn or rewritten as "governed centrally" |
| `audit/components/ActionFeedback/challenge-L-library.md` | M-07 | the "no producer motion token / no reduced-motion policy" clause is withdrawn |
| `audit/components/AdminListSkeleton/challenge-D-design.md` | M-11, M-13 | the `:7` verdict line is reconciled with the file's own `:13` |
| `audit/components/PaletteRenameInput/challenge-D-design.md` | M-17 | finding #5's first limb is withdrawn |
| `audit/components/picker-colorcomponentdisplay/challenge-D-design.md` | M-23 | the vacuous reduced-motion cell is struck |
| `audit/components/picker-componentsliders-consolerail/challenge-D-design.md` | M-26, M-27 | finding #4's reduced-motion limb is withdrawn (high-contrast/forced-colors limbs survive, unadjudicated) |
| `audit/components/picker-pointerdebugoverlay/challenge-D-design.md` | M-28, M-29, M-31 | finding #4 is withdrawn — already REFUTED at `challenge-D-design-r2.md:36` |
| `audit/components/shell-dock-actiontoolbar/challenge-D-design.md` | M-32 | the reduced-motion cell is struck |
| `audit/components/wb-gradient-pane/challenge-D-design.md` | M-33 | the "bottom fade" is withdrawn. **M-34 SURVIVES** — its reduced-motion proof is genuinely owed (MQ-1) |

### §7.4 · No motion content — vacuously cleared on this axis (30 files)

| subject | axes with no motion content |
|---|---|
| `AdminListItem` | C · D · L |
| `PaginationBar` | C · D · L |
| `PaletteCardGrid` | C · D · L |
| `PaletteCardMeta` | C · D |
| `PaletteRenameInput` | C |
| `UserSortMenu` | C · D · L |
| `picker-colorcomponentdisplay` | C · L |
| `picker-componentsliders-consolerail` | L |
| `picker-debugeventlog` | C · D · L |
| `picker-pointerdebugoverlay` | C · L |
| `shell-dock-actiontoolbar` | C · L |
| `shell-dock-parseechoreadout` | C · D · L |
| `wb-gradient-pane` | C · L |

3+3+3+2+1+3+2+1+3+2+2+3+2 = **30**. With the 16 files of §7.1–§7.3 that is 46 — the full set,
no file unswept. (`ActionFeedback` and `TagEditPopover` appear in no row here: all three
`ActionFeedback` axes and the single `TagEditPopover` axis carry motion content.)

### §7.5 · Keyword collisions — matched the sweep's grep, not motion assertions

Recorded so the sweep is provably exhaustive; **not** counted in §6.

| file:line | text | why excluded |
|---|---|---|
| `UserSortMenu/challenge-C-implementation.md:5` | "the only state **transition**" | type-safety of an emit, no CSS |
| `UserSortMenu/challenge-D-design.md:12,14` | "a user **scanning** the panel", "fast **scanning**" | reading, not the Skeleton scan |
| `AdminListItem/challenge-L-library.md:11,15` | "row **frame**", "skeleton **frame**" | structural frame, not animation frame |
| `picker-debugeventlog/challenge-C-implementation.md:9` | "copies … on every reactive update … bounded O(80)" | perf claim, no motion |
| `picker-debugeventlog/challenge-D-design.md:20` | "high-frequency updates" | perf audit cell |
| `wb-gradient-pane/challenge-D-design.md:13,25` | "per-interval **easing**", "active stop/**easing**" | gradient colour interpolation, not UI motion |
| `AdminListSkeleton/challenge-D-design.md:12` | "will incur layout **shift**" | CLS claim, adjacent to M-11 but not a motion assertion |
| `ActionFeedback/challenge-C-implementation.md:13` | "after a fixed **duration**" | JS `setTimeout`, not a motion clock |

---

## §8 · Evidence index

| artifact | what it establishes |
|---|---|
| `evidence-motion-quarantine/probe.mjs` · `RESULTS.json` | §1 served-guard CSSOM enumeration (block A); the property-list clamp on 10 carriers, both modes (block B); real induced `FROZEN?` (C1); real `.channel-rail-item` / `.watercolor-swatch` (C2) |
| `evidence-motion-quarantine/probe2-skeleton.mjs` · `RESULTS-skeleton.json` | M-10, M-12 — the `no-preference` gate measured with the real SFC scope attr, both modes |
| `evidence-motion-quarantine/probe3-gradientpane.mjs` · `RESULTS-gradientpane.json` | M-33 (no bottom fade) and **MQ-1** (scroll-driven blind spot), measured at scroll 0 and 200 |
| `evidence-motion-quarantine/probe4-real-elements.mjs` · `RESULTS-real.json` | M-26 (real mounted `.rail-dot`, channel activated), M-32 (real `.action-icon`), the `stagger-children` gate |

All four probes are re-runnable against the live dev stack and write only inside their evidence
directory. **No product bytes were changed by this seat.**

---

# §9 · DATED ADDENDUM 2026-09-17 — X-W0.e (HG-11 · G-C · fold W0.7 / W0.8 / W0.14)

SERVED MODEL: claude-opus-5[1m]

**E-3 posture, read first.** This is an **addendum-beside**. **Nothing in §1–§8 is rewritten.** The
34 rulings, the four probes, MQ-1, the four superlatives, the §6 counts and the §7.1–§7.5
disposition all stand exactly as landed at `9812f951`. Where this seat measures a correction, the
correction lands **here, by addition**, and says which §7 cell it corrects and by how much. The 46
canonical `challenge-*.md` axis files are **read, never written** (C-02, W0.md `:101`); no byte of
any of them was touched by this seat.

| | |
|---|---|
| unit | **X-W0.e** — Axis Re-runs and the Motion Quarantine (CC-027) |
| authority | `docs/tranches/X/waves/W0.md` §Agent Units `:172-177` · §Scope 5 `:28` · **HG-10** `:271-274` · **HG-11** `:276-280` · §File Bounds `:96-98`,`:101` · fold `X-W0-FOLD.md` **G-C** · **W0.7** · **W0.8** · **W0.14** |
| date | 2026-09-17 |
| HEAD at measurement | `c0d70599` ⟨`git log --oneline -1`⟩ |
| glass-ui installed | **7.0.0** ⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ |
| product bytes changed | **0** — docs-only, as the landed record was |

---

## §9.0 · The two guards, re-measured at this clock — **byte-identical to §1**

A stamp that cites a guard is only worth the bytes the guard still has. Both were re-hashed here
before any stamp was written:

| guard | path : line | sha256 measured 2026-09-17 | vs §1's recorded sha |
|---|---|---|---|
| **G1** — demo global neutraliser | `demo/styles/animations.css:184-193` (carve-out `:202-212`) | `a64eb64fc847b1f1feffe49fd8b211f2aa335f43ceeac8bb626095e89968444b` | **IDENTICAL** |
| **G2** — glass-ui a11y-overrides | `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css:1` | `511e861a88fd2436f63395b6a2bbf32a60f4ade93d4f4d77473bad8a38e428d7` | **IDENTICAL** |

⟨`grep -n 'prefers-reduced-motion' demo/styles/animations.css`⟩ → `43` (the `no-preference`
stagger gate) · `177` (comment) · **`184`** · **`202`**.
⟨`shasum -a 256 demo/styles/animations.css`⟩ → `a64eb64f…8444b`.
⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`⟩ →
`511e861a…e428d7`.

**Consequence.** Every CLEARED verdict in §3 keeps its evidentiary footing at this clock: the bytes
it cites are the bytes still served. Nothing in §1–§8 needed re-deriving, and nothing was.

Throughout §9, **⟨G1⟩** and **⟨G2⟩** expand to exactly the two `path:line` citations in the table
above. A stamp reading `CLEARED ⟨G1⟩+⟨G2⟩` **is** a two-guard citation by path and line in the
sense HG-11 `:277` requires; each stamped row additionally names its own carrier `path:line`, which
is more than the gate asks.

---

## §9.1 · The marker-spelling reconciliation — HG-11's literal token measures **0**, and why that is a vocabulary gap, not a coverage gap

**Measured.** ⟨`grep -c 'QUARANTINED-PENDING-TWO-GUARD-CHECK'
audit/codex-provenance/motion-quarantine.md`⟩ → **0** (double-run **0**). Corpus-wide the literal
lives in exactly **three** tracked files ⟨`git grep -ln 'QUARANTINED-PENDING-TWO-GUARD-CHECK' --
docs/`⟩ → `registry/harvest/wf_4e763b6a-224.json` · `docs/tranches/X/waves/W0.md` ·
`docs/tranches/X/execution/A/X-W0.md` — the mint site, the gate that names it, and the wave record.
**It has never appeared in the quarantine record.**

**The diagnosis, stated exactly.** HG-11 `:277` writes a **two-branch** grammar over each assertion:

> *"carries `QUARANTINED-PENDING-TWO-GUARD-CHECK` **or** a CLEARED verdict citing both guards by
> path and line"*

The landed record does not spell either token. It spells a **post-check** state space —
`TRUE`/`FALSE`/`UNPROVEN` per assertion (§2) plus a per-file `cleared` / `STILL QUARANTINED`
disposition (§7) — because **the check had already been run on every row before the record was
written**: §1 enumerates both guards as served bytes with sha256s, and every one of the 34 rows in
§3 carries a `guard evidence` cell. The gate's first token names a state — *pending* a two-guard
check — that the sweep left behind on the day it ran.

So the zero is **a vocabulary mismatch, not an unchecked assertion**. It is nonetheless a real gate
defect, because HG-11's falsifier reads over tokens (*"an assertion with neither marker nor a
two-guard citation in the record"*), and a reader grepping for the marker finds nothing.

**The reconciliation, binding for this record.** §9.3 below re-states every assertion in the gate's
own vocabulary. The mapping is one-way and total:

| record's landed convention (§2/§7, **unchanged**) | HG-11 token stamped in §9.3 | why |
|---|---|---|
| any ruling whose motion is **CSS-declared** and whose guard-evidence cell cites live bytes | **`CLEARED ⟨G1⟩+⟨G2⟩`** | the two-guard check ran and concluded — HG-11 branch 2 |
| a ruling whose subject is **not motion** (state change, roving focus, copy, prop inertness, un-animated reflow) | **`NOT-A-MOTION-ASSERTION`** | outside HG-11's subject set; the guards were checked anyway and are recorded |
| a ruling whose mechanism **neither guard can decide** | **`QUARANTINED-PENDING-TWO-GUARD-CHECK`** | the literal — HG-11 branch 1, and the only honest home for it |

**The last row is the key.** The literal marker is not decoration to be sprinkled to make a grep go
green: it names assertions for which the two-guard check **cannot conclude**. That is precisely
G-C's third disposition (§9.2). Spelling it anywhere else would be spelling a pending check over a
check that finished.

A `FALSE` ruling maps to **CLEARED**, not to a quarantine stamp, and the distinction matters:
`FALSE` means *the asserted motion gap does not exist because the guards do reach it*. The **file**
may still be un-adoptable (§7.3) while the **assertion's** two-guard status is closed. Those are two
axes, and §9.5 keeps them apart by name.

---

## §9.2 · G-C — guard reach is classified **before** a clear is spelled

**The gate.** Fold `X-W0-FOLD.md` **G-C**: *"Every motion assertion is dispositioned CSS-guarded
(clear/quarantine) **or** mechanism-out-of-guard-reach with its witness named."* Its falsifier:
*"a CLEARED verdict citing `animations.css:184` + `a11y-overrides.css` over a
`requestAnimationFrame` or `animation-timeline` assertion is a false clear spelled with two true
citations."*

**The mechanism, from fold W0.7.** Both guards are CSS `@media (prefers-reduced-motion: reduce)`
blocks clamping `animation-duration`, `animation-iteration-count`, `transition-duration` and — via
G2's property-list rewrite — the transition property set. Three assertion classes are structurally
outside that reach. All three witnesses were re-read at this clock from the adjudicated registry
(**read-only, E-3** — ⟨`git diff --name-only`⟩ over this unit's commit intersects
`registry/adjudicated/` in **0** paths):

| class | witness, verbatim from the adjudicated record | why the guards cannot decide it |
|---|---|---|
| **(a) scroll-driven timeline** | **GEN-29** (`registry/adjudicated/wb-generate-pane.md:76`): *"the pane's dominant motion is a scroll-driven scrub **both PRM guards fire on and cannot stop**"* — and **MQ-1** in this record's own §4 | an `animation-timeline`-driven animation takes progress from the timeline, not the clock; the `animation-duration` clamp fires (`1e-05s` measured) and is inert |
| **(b) JS clock** | **MX-13** (`wb-mix-animationcanvas.md:66`): *"the motion timeline is three private module constants outside the producer's duration/tempo register … **the CSS PRM neutralizers cannot reach JS constants**"*; with **MX-9** `:63`, **MX-10** `:64` (*"PRM sampled once at arm; reduce engaged mid-narration is ignored"*), **MX-45** `:77` | a `requestAnimationFrame` loop and its JS constants are not CSS declarations; no `@media` block reaches them |
| **(c) producer-internal transition** | **EY-32** (`wb-extract-imageeyedropper.md:75`): *"PRM limb rides guard-2's measured `transition-property` clamp (border-radius struck) — **cites the quarantine's own M-26 measurement in its own direction**"* | in-reach, but the *consumer-side* claim is decided by a producer-internal declaration; a consumer-only clear would be spelled over bytes the consumer does not own |

**Where each class lands inside the 46.** Measured, not assumed:

⟨`grep -nEi 'requestAnimationFrame|rAF|animation-timeline|scroll-timeline|setInterval|setTimeout'`
over the 46 REPORT-AUTHORED paths⟩ → **2** lines, **both false positives**:
`PaletteRenameInput/challenge-C-implementation.md:9` and
`picker-colorcomponentdisplay/challenge-C-implementation.md:18` — each matching the case-insensitive
`rAF` inside the word **"d-r-a-f-t"**. **Zero** assertion in the 46 names a `requestAnimationFrame`
loop, a `setInterval`/`setTimeout` motion clock, or an `animation-timeline` by name.

Therefore, inside the corpus HG-11 governs:

- **class (a) — scroll-driven timeline: populated, by two assertion-limbs** — M-34 and the new
  A-1b (§9.4). Both take the literal quarantine marker.
- **class (b) — JS clock: ZERO in-corpus assertions.** The class is real and witnessed
  (MX-9/10/13/45) but every instance is **outside** the 46. Its two nearest in-corpus neighbours —
  `shell-dock-parseechoreadout` C:14 / D:14, *"trailing-debounced for two seconds"* / *"delays
  ordinary input parsing by two seconds"* — are **input-latency** claims, not motion claims; they
  are recorded in §9.4's §7.5 extension under this record's own existing precedent for
  `ActionFeedback/challenge-C-implementation.md:13` (*"JS `setTimeout`, not a motion clock"*).
- **class (c) — producer-internal transition: ZERO in-corpus assertions.** EY-32's carrier is
  `wb-extract-imageeyedropper`, outside the 46; it **consumes** M-26 rather than contradicting it,
  and the record's §7.3 row for M-26/M-27 is untouched by it.

**G-C's falsifier, discharged by construction.** No CLEARED stamp in §9.3 sits over a
`requestAnimationFrame` or `animation-timeline` assertion, because — measured above — the 46 contain
none, and the only two timeline-carrying limbs (M-34, A-1b) are stamped
`QUARANTINED-PENDING-TWO-GUARD-CHECK`. The false clear G-C exists to forbid is not spelled anywhere
in this record.

---

## §9.3 · The assertion stamp table — all 34 §3 rows, in HG-11's vocabulary

One row per §3 row, in §3's order. `carrier` is the live byte the ruling turns on. **No §3 ruling is
changed by this table** — it re-states each row's two-guard status in the gate's own words.

| # | axis file : line | §3 ruling (unchanged) | G-C class | **HG-11 stamp** | carrier (live bytes) |
|---|---|---|---|---|---|
| M-01 | `ActionFeedback/challenge-C-implementation.md:18` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `ActionFeedback.vue:3` `<Transition name="vj-celebrate">` |
| M-02 | `ActionFeedback/challenge-D-design.md:11` | TRUE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `ActionFeedback.vue:3`,`:30`,`:39-47` |
| M-03 | `ActionFeedback/challenge-D-design.md:15` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `animations.css:142-166` |
| M-04 | `ActionFeedback/challenge-D-design.md:19` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | same as M-01/M-03 |
| M-05 | `ActionFeedback/challenge-L-library.md:5` | TRUE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `ActionFeedback.vue:3`,`:21` |
| M-06 | `ActionFeedback/challenge-L-library.md:9` | TRUE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `ActionFeedback.vue:20-21` |
| M-07 | `ActionFeedback/challenge-L-library.md:12` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `animations.css:142-153` (six producer tokens) |
| M-08 | `ActionFeedback/challenge-L-library.md:16` | UNPROVEN | CSS-guarded (premise) | **CLEARED ⟨G1⟩+⟨G2⟩** on the motion limb | prescriptive; design axis untouched |
| M-09 | `AdminListSkeleton/challenge-C-implementation.md:13` | TRUE | — | **NOT-A-MOTION-ASSERTION** | "transition" = state change (`AdminListSkeleton.vue`, 24 lines) |
| M-10 | `AdminListSkeleton/challenge-C-implementation.md:15` | TRUE | CSS-guarded (+ producer `no-preference` gate) | **CLEARED ⟨G1⟩+⟨G2⟩** + `glass-ui.css` @ char 23789 | `probe2-skeleton.mjs`: `animationName: none` under `reduce` |
| M-11 | `AdminListSkeleton/challenge-D-design.md:7` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `glass-ui.css` @ 23789 |
| M-12 | `AdminListSkeleton/challenge-D-design.md:13` | TRUE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `Skeleton.vue.d.ts`; the corpus's one gating-aware row |
| M-13 | `AdminListSkeleton/challenge-D-design.md:19` | FALSE | CSS-guarded (PRM limb) | **CLEARED ⟨G1⟩+⟨G2⟩**; ready/empty/error limb **NOT-A-MOTION-ASSERTION** | M-10/M-12's measurements |
| M-14 | `AdminListSkeleton/challenge-L-library.md:9` | TRUE | — | **NOT-A-MOTION-ASSERTION** | prop inertness, `Skeleton.vue.d.ts` |
| M-15 | `AdminListSkeleton/challenge-L-library.md:14` | UNPROVEN | CSS-guarded (premise) | **CLEARED ⟨G1⟩+⟨G2⟩** on the motion limb | producer owns it via the `no-preference` gate |
| M-16 | `PaletteCardMeta/challenge-L-library.md:11` | TRUE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `PaletteCardMeta.vue:45`; `transform` absent under `reduce` |
| M-17 | `PaletteRenameInput/challenge-D-design.md:15a` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `PaletteRenameInput.vue:20`,`:26` |
| M-18 | `PaletteRenameInput/challenge-D-design.md:15b` | UNPROVEN | — | **NOT-A-MOTION-ASSERTION** | `:53-56` autofocus; an entry-path judgment |
| M-19 | `PaletteRenameInput/challenge-L-library.md:10` | TRUE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `:20`/`:26` `active:scale-95` |
| M-20 | `TagEditPopover/challenge-D-design.md:18` | TRUE | CSS-guarded (motion note) | **CLEARED ⟨G1⟩+⟨G2⟩**; the *label* defect is a11y, not motion | `TagEditPopover.vue:12` `animate-spin` |
| M-21 | `picker-colorcomponentdisplay/challenge-D-design.md:12` | TRUE | — | **NOT-A-MOTION-ASSERTION** | **un-animated layout reflow** at digit boundaries; the SFC declares zero transition/animation (M-22) — no guard applies and none is needed |
| M-22 | `picker-colorcomponentdisplay/challenge-D-design.md:16` | TRUE | — | **NOT-A-MOTION-ASSERTION** | idle→edit UI mode; 214 lines, zero motion declarations |
| M-23 | `picker-colorcomponentdisplay/challenge-D-design.md:25` | FALSE | CSS-guarded (vacuous) | **CLEARED ⟨G1⟩+⟨G2⟩** | nothing declared; anything inherited is guard-governed |
| M-24 | `picker-componentsliders-consolerail/challenge-C-implementation.md:14` | TRUE | — | **NOT-A-MOTION-ASSERTION** | roving focus, `ConsoleRail.vue:26-37` |
| M-25 | `picker-componentsliders-consolerail/challenge-D-design.md:21a` | UNPROVEN | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** on the motion limb; salience judgment untouched | `probe4`: `background-color` absent from `.rail-dot`'s transition list |
| M-26 | `picker-componentsliders-consolerail/challenge-D-design.md:21b` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** + `glass-ui.css` @ 69648 + `animations.css:43-54` | `probe4.reduce.railDot` — three independent mechanisms |
| M-27 | `picker-componentsliders-consolerail/challenge-D-design.md:27` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | discharged by M-26 |
| M-28 | `picker-pointerdebugoverlay/challenge-D-design.md:14a` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `PointerDebugOverlay.vue:179`; `probe.mjs C1` |
| M-29 | `picker-pointerdebugoverlay/challenge-D-design.md:14b` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | both guards `!important` outrank `.debug-frozen[data-v-…]` (0,2,0) |
| M-30 | `picker-pointerdebugoverlay/challenge-D-design.md:14c` | UNPROVEN | — | **NOT-A-MOTION-ASSERTION** | copy judgment on the literal `FROZEN?` (`:17`) |
| M-31 | `picker-pointerdebugoverlay/challenge-D-design.md:21` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `:179` blink + `:261-269` press; `transform`/`filter` struck |
| M-32 | `shell-dock-actiontoolbar/challenge-D-design.md:21` | FALSE | CSS-guarded | **CLEARED ⟨G1⟩+⟨G2⟩** | `ActionButton.vue:25`,`:122-135`; `probe4` `.action-icon` |
| M-33 | `wb-gradient-pane/challenge-D-design.md:16` | FALSE | CSS-guarded (**vacuous — the asserted fade does not exist**) | **CLEARED ⟨G1⟩+⟨G2⟩** | `PaneHeader.vue:54-57`; re-measured §9.4 |
| **M-34** | `wb-gradient-pane/challenge-D-design.md:33` | TRUE | **MECHANISM-OUT-OF-GUARD-REACH** — class (a) | **QUARANTINED-PENDING-TWO-GUARD-CHECK** | `PaneHeader.vue:177-194`, witness **MQ-1** / **GEN-29** |

**Stamp counts (self-counted from the table above, double-run):** **CLEARED ⟨G1⟩+⟨G2⟩ = 26** ·
**NOT-A-MOTION-ASSERTION = 7** (M-09, M-14, M-18, M-21, M-22, M-24, M-30) ·
**QUARANTINED-PENDING-TWO-GUARD-CHECK = 1** (M-34). **26 + 7 + 1 = 34** — set-equal to §3's
row count, no row added, none dropped.

**Two grep artifacts, stated so a reader's re-count reconciles rather than diverges** (measured on
these settled bytes): (1) **M-34's cell is bold-prefixed** (`| **M-34** |`), so a naive
⟨`grep -c '^| M-'`⟩ over the table returns **33**, not 34 — M-34 is the missing one, and it is the
quarantined row. (2) **M-13 carries two limbs and therefore two stamps** — `CLEARED` on its
reduced-motion limb and `NOT-A-MOTION-ASSERTION` on its ready/empty/error limb — so
⟨`grep -c 'NOT-A-MOTION-ASSERTION'`⟩ over the table returns **8**, of which M-13 is a *secondary*
stamp. The seven named above are the rows whose **primary** stamp is `NOT-A-MOTION-ASSERTION`.
`33 (grep) + 1 (M-34) = 34`; `8 (grep) − 1 (M-13 secondary) = 7`. The arithmetic is stated, not
assumed.

**M-34 is the corpus's single surviving reduced-motion obligation**, exactly as §3 and §4 already
say. This addendum changes that fact not at all; it gives it the token the gate greps for.

---

## §9.4 · The assertions the sweep did not reach — an independent re-sweep, and **one** genuine miss

HG-11's residual RED is *"any assertion the sweep did not reach"* (W0.md `:279`). That cannot be
settled by reading the record; it takes a second, deliberately **wider** pass over the same 46
files, run by a different seat with a different vocabulary.

**Method.** A 33-token motion vocabulary — deliberately over-broad, admitting substring noise so
that nothing hides behind a word the first sweep did not think of:

⟨`grep -nEi 'motion|animat|transition|prefers-reduced|spin|blink|fade|scroll|scale|transform|duration|ease|easing|keyframe|pulse|stagger|hover|press|scan|shift|frame|move|delay|jitter|flicker|bounce|slide|morph|shimmer|glow' <the 46 REPORT-AUTHORED paths>`⟩ → **76** matching lines
(double-run **76**).

Against the record's coverage — the 34 §3 rows plus the 8 §7.5 collisions, **41** distinct
`file:line` keys — the set-difference is:

⟨`comm -23 <sweep keys, 76 unique> <covered keys, 41>`⟩ → **38** lines the record does not name.

**Adjudicated, every one.** Of the 38: **one** is a genuine motion assertion, **four** are
motion-adjacent and take §7.5-extension rows, and **33** are substring collisions in six classes.

### §9.4.1 · A-1 — **the one genuine miss**, and it is material

**`audit/components/wb-gradient-pane/challenge-C-implementation.md:15`**, verbatim:

> *"5. The wrapper owns scrolling and fades while the child owns content height. There is no
> explicit scroll-to-selection or focus-restoration contract after an imperative command."*

Two separable limbs, ruled here:

| # | limb | ruling | G-C class | **HG-11 stamp** | evidence |
|---|---|---|---|---|---|
| **A-1a** | *"the wrapper owns … **fades**"* | **FALSE** | CSS-guarded (vacuous) | **CLEARED ⟨G1⟩+⟨G2⟩** | **There is no fade.** `.pane-scroll-fade` (`demo/shared/ui/PaneHeader.vue:54-57`) sets exactly two properties — ⟨`sed -n '54,58p'`⟩ → `contain: layout style paint;` `scroll-timeline: --pane-scroll block;` — and ⟨`sed -n '54,58p' … \| grep -ci 'mask\|linear-gradient'`⟩ → **0**. Identical in kind and in cause to **M-33**: the report read the class **name**, not the rule. |
| **A-1b** | *"the wrapper owns **scrolling**"* | **TRUE** | **MECHANISM-OUT-OF-GUARD-REACH** — class (a) | **QUARANTINED-PENDING-TWO-GUARD-CHECK** | GradientPane's root `Card` carries the host class ⟨`grep -n 'pane-scroll-fade' demo/workbenches/gradient/GradientPane.vue`⟩ → `:20`, making it the host of `--pane-scroll`, which drives the three scroll-driven animations at `PaneHeader.vue:177-194` ⟨`grep -n 'animation-timeline' …`⟩ → `:180`, `:186`, `:191`. Witness: **MQ-1** (§4) / **GEN-29**. |

**Why this is material and not bookkeeping.** `wb-gradient-pane/challenge-C-implementation.md` sits
in **§7.4 — "No motion content — vacuously cleared on this axis"**, under the row
`wb-gradient-pane | C · L`. Measured, that axis **does** carry motion content, and it carries the
**same refuted "bottom fade" premise** the record ruled FALSE at M-33 on the sibling D axis. Left
unrecorded, a reader adopting the C axis would adopt a claim the record had already killed one axis
over — the precise failure §7.3's *"must not be adopted until"* column exists to prevent.

The correction is §9.5, **by addition**.

### §9.4.2 · Four motion-adjacent lines — §7.5 extension (collisions, with their guard note)

Recorded in §7.5's own idiom — *"so the sweep is provably exhaustive"* — and, like §7.5, **not**
counted in §6 or in §9.3's stamp totals.

| file : line | matched token | text (compressed) | why excluded, and its guard note |
|---|---|---|---|
| `picker-pointerdebugoverlay/challenge-L-library.md:9` | `scroll` | *"all sheet/disclosure/button/status/**scroll** styling is hand-authored"* | A **library-ownership** claim over a bounded list of styling categories; motion is not in the list. TRUE at the bytes. The `scroll` leg is reached by ⟨G1⟩'s `scroll-behavior: auto !important`; the file's real motion (the `:179` blink, the `:261-269` press) is adjudicated at M-28/M-29/M-31 on the D axis. **No re-home**: the L axis carries no FALSE row, so §7.4's disposition of it stands. |
| `picker-componentsliders-consolerail/challenge-D-design.md:18` | `scroll`,`slide` | *"If selection merely **scrolls** a slider row, a radio/listbox or toolbar pattern may be more…"* | An **ARIA-pattern** claim; the scroll is descriptive, conditional (*"if"*), and not asserted as an ungoverned motion. ⟨G1⟩ supplies `scroll-behavior: auto !important` were it read as one. |
| `shell-dock-parseechoreadout/challenge-C-implementation.md:14` | `bounce`,`slide` | *"Ordinary text input is **trailing-debounced** for two seconds"* | An **input-latency** claim, not motion. Exactly this record's existing §7.5 precedent for `ActionFeedback/challenge-C-implementation.md:13` — *"JS `setTimeout`, not a motion clock"*. `bounce` is the substring inside *"de-**bounce**d"*. **G-C note**: were it a motion claim it would be class (b), mechanism-out-of-guard-reach, witness MX-13. |
| `shell-dock-parseechoreadout/challenge-D-design.md:14` | `delay` | *"The parent **delays** ordinary input parsing by two seconds"* | Same class and same precedent as the row above. |

**These two `parseechoreadout` rows are the corpus's closest approach to G-C class (b)** — and they
fall short of it, which is the measured reason §9.2 records class (b) as having **zero** in-corpus
instances rather than asserting it from the absence of a grep hit.

### §9.4.3 · The 33 substring collisions — six classes, enumerated

Recorded so the difference closes to zero and no line is left unaccounted.

| class | matched token | count | file : line |
|---|---|---:|---|
| **hover-state** (a visual state, never animation) | `hover` | **12** | `AdminListItem/challenge-D-design.md:14,19` · `shell-dock-actiontoolbar/challenge-C-implementation.md:10,11,15,17` · `…/challenge-D-design.md:12` · `…/challenge-L-library.md:5,9,12,13,18` |
| **"press" inside a longer word** (`pressed`, `com**press**`, `sup**press**ion`, `ex**press**es`) | `press` | **8** | `PaletteCardMeta/challenge-C-implementation.md:12` · `…/challenge-D-design.md:14` · `…/challenge-L-library.md:5` · `PaletteRenameInput/challenge-D-design.md:14` · `UserSortMenu/challenge-C-implementation.md:15` · `picker-componentsliders-consolerail/challenge-D-design.md:23` · `picker-debugeventlog/challenge-D-design.md:11` · `wb-gradient-pane/challenge-D-design.md:14` |
| **"move" inside a longer word** (`re**move**`, `re**move**d`, `re**mov**al`, `mo**men**tary`) or the prescriptive verb *Move* | `move` | **5** | `TagEditPopover/challenge-D-design.md:11` · `picker-colorcomponentdisplay/challenge-C-implementation.md:9,18` · `picker-componentsliders-consolerail/challenge-C-implementation.md:10` · `wb-gradient-pane/challenge-C-implementation.md:19` |
| **"slide" inside the component path** `ComponentSliders`/`ConsoleRail`, or the word *slider* | `slide` | **4** | `picker-componentsliders-consolerail/challenge-C-implementation.md:3` · `…/challenge-D-design.md:5` · `…/challenge-L-library.md:3` · `shell-dock-parseechoreadout/challenge-D-design.md:21` |
| **"frame" as structure** (`frame**work**`, `row-frame`) — this record's existing §7.5 class, at three further sites | `frame` | **3** | `AdminListSkeleton/challenge-L-library.md:10` · `picker-componentsliders-consolerail/challenge-L-library.md:11` · `wb-gradient-pane/challenge-L-library.md:13` |
| **input-commit latency** (`delayed` commits) | `delay` | **1** | `shell-dock-parseechoreadout/challenge-C-implementation.md:17` |

**12 + 8 + 5 + 4 + 3 + 1 = 33.** With §9.4.1's **1** and §9.4.2's **4**, that is **38** — set-equal
to the measured difference. **Nothing in the 38 is unaccounted for.**

**The `frame` class is worth naming twice.** §7.5 already excludes
`AdminListItem/challenge-L-library.md:11,15` as *"structural frame, not animation frame"*. Three
further sites match the same token under the same rule; the record's rule was right and simply did
not enumerate them. That is an **extension** of §7.5, never a correction of it.

---

## §9.5 · Corrections to §7, **by addition** — one file re-homed, the arithmetic restated

**E-3.** §7.3's and §7.4's bytes are **not rewritten**. What follows is the dated delta a reader
applies on top of them.

**§7.3 gains one row:**

| file | false rows | must not be adopted until |
|---|---|---|
| `audit/components/wb-gradient-pane/challenge-C-implementation.md` | **A-1a** | the *"owns … fades"* clause is withdrawn — the same withdrawal M-33 already requires of the D axis. **A-1b SURVIVES** as a quarantined obligation (MQ-1), exactly as M-34 does. |

**§7.4's `wb-gradient-pane` row is corrected from `C · L` to `L`.** The C axis is not vacuously
cleared; it carries motion content.

**Restated arithmetic (the §7.4 sum line, re-derived, not re-written):**

| | landed §7 (`9812f951`) | **after this addendum** |
|---|---:|---:|
| §7.1 fully cleared | 5 | 5 |
| §7.2 cleared with caveat | 1 | 1 |
| §7.3 still quarantined | 10 | **11** |
| §7.4 vacuously cleared | 30 | **29** |
| **total** | **46** | **46** |

§7.4's landed sum `3+3+3+2+1+3+2+1+3+2+2+3+2 = 30` becomes `3+3+3+2+1+3+2+1+3+2+2+3+**1** = 29`
— the final term, `wb-gradient-pane`, falling from 2 (C·L) to 1 (L). **16 → 17** files in
§7.1–§7.3; **29 + 17 = 46**, the full set, still no file unswept.

**Adjudicated-assertion count** (the §6 delta, stated, not rewritten): §6's **34** rows plus
A-1a and A-1b = **36 assertion-limbs**; FALSE **15 → 16** (A-1a is the 9th substantive false claim,
joining M-03, M-07, M-11, M-17, M-26, M-28, M-29, M-33); TRUE **14 → 15** (A-1b); UNPROVEN
**5** unchanged. **Surviving reduced-motion obligations: 1 → 2** (M-34, A-1b) — **the same single
mechanism, MQ-1, asserted at two sites**, not a second defect.

---

## §9.6 · The coverage set-difference against `HYDRATION-LEDGER.md`'s 46 REPORT-AUTHORED rows — **ZERO in both directions**

HG-11 `:277` requires *"all 46 axis files present in the record's file-level disposition (including
the vacuously-cleared ones), so coverage is checkable by set-difference against
`HYDRATION-LEDGER.md`'s 46 REPORT-AUTHORED rows"*. Run, at this clock:

**Left side — the ledger.** ⟨`grep '^| audit/' registry/HYDRATION-LEDGER.md | awk -F'|' …` filtered
to `REPORT-AUTHORED`, sorted⟩ → **46** paths (double-run **46**). The ledger's own Totals line at
`:13` agrees: *"235 original · 51 payload-less (**46 report-authored** · 5 unwitnessed-direct)"*.

**Right side — this record's §7.** §7.1–§7.3 name **16** paths literally
⟨`sed -n '236,290p' motion-quarantine.md | grep -o 'audit/components/[A-Za-z0-9_-]*/challenge-[A-Za-z-]*\.md' | sort -u | wc -l`⟩ → **16**. §7.4's subject × axes table expands to **30**
(`AdminListItem` C·D·L · `PaginationBar` C·D·L · `PaletteCardGrid` C·D·L · `PaletteCardMeta` C·D ·
`PaletteRenameInput` C · `UserSortMenu` C·D·L · `picker-colorcomponentdisplay` C·L ·
`picker-componentsliders-consolerail` L · `picker-debugeventlog` C·D·L ·
`picker-pointerdebugoverlay` C·L · `shell-dock-actiontoolbar` C·L ·
`shell-dock-parseechoreadout` C·D·L · `wb-gradient-pane` C·L). **16 + 30 = 46**, and
⟨`sort -u | wc -l`⟩ → **46** — no path counted twice.

**The difference, both ways:**

| direction | command | result |
|---|---|---|
| ledger **minus** record | ⟨`comm -23 ra46.txt mq_all46.txt`⟩ | **empty — 0 rows** |
| record **minus** ledger | ⟨`comm -13 ra46.txt mq_all46.txt`⟩ | **empty — 0 rows** |

**The coverage set-difference closes to zero, exactly, in both directions.** Every REPORT-AUTHORED
row of the ledger has a file-level disposition in this record; the record disposes of no file the
ledger does not carry. HG-11's *"one of the 46 axis files absent from its disposition"* falsifier is
discharged **by enumeration**, not by assertion.

The §9.5 re-home moves `wb-gradient-pane/challenge-C-implementation.md` **between** §7 cells; it
does not leave the 46, so the set-difference is zero before and after.

---

## §9.7 · Out-of-corpus attestations, one precedent, one provenance correction, one coverage axis (fold **W0.8**)

Fold W0.8 hands this seat five zero-row attestations, a classification precedent, a dated
provenance correction and a coverage extension. Each was **re-measured here rather than inherited**
(SELF-COUNT law):

**Five zero-row attestations, re-run** ⟨`grep -ci '<subject>' motion-quarantine.md`⟩ against the
record **as it stood before this addendum**:

| subject | measured | the packet record's own attestation |
|---|---:|---|
| `AuroraPane` | **0** | *"`motion-quarantine.md` carries no aurora/atmosphere row"* |
| `CurrentPaletteEditor` (and `SwatchHoverMenu`) | **0** / **0** | *"no motion-quarantine row names CurrentPaletteEditor or SwatchHoverMenu"* |
| `EmptyState` | **0** | *"the quarantine contains **ZERO** EmptyState rows"* |
| `wb-mix` | **0** | *"a grep of the quarantine for mix rows returns none"* |
| `wb-extract-controls` | **0** | *"M-32/M-33 concern other components; M-31 likewise"* |

All five reproduce exactly. **None of these subjects is in the 46**, so none enters §9.6's
set-difference; the attestations are recorded so that a later reader cannot mistake their absence
for an omission. `ShadowPalette` likewise measures **0**.

**Classification precedent, ADOPTED not re-derived (EmptyState).** *"the nearest law (M-09/M-13)
classifies a species-swap contract as **state, not motion**"* — ES-26 is carried as a state
contract, never a PRM claim. This addendum applies the same law inside the 46 at **M-09**, **M-13**'s
second limb and **M-21** (§9.3), which is why those three carry `NOT-A-MOTION-ASSERTION` rather
than a vacuous clear.

**Dated provenance correction (ShadowPalette).** The record **exists and is tracked at this HEAD**
⟨`git ls-files --error-unmatch audit/codex-provenance/motion-quarantine.md`⟩ → TRACKED;
⟨`git log --oneline -1 -- <it>`⟩ → **`9812f951`** *"motion quarantine LIFTED with 15/34 FALSE"*.
Any provenance cell reading *"does not exist"* — including `docs/tranches/X/waves/W6.md:240` and
its gate **H2** at `:338`, whose own dated addendum already records the correction — is **dated
2026-08-03 and superseded by that landing**. Stated here once so the correction is greppable from
the record itself.

**One coverage axis the set-difference does not enumerate (AuroraPane).** From the adjudicated
record ⟨`registry/adjudicated/AuroraPane.md:10`⟩, verbatim: *"X.W6.j's transition gates are already
**MOTION-SOURCED · PENDING-QUARANTINE** by the wave's own text."* Confirmed live: `W6.md:240`,
`:327`, `:338`, `:446` and `:473` all carry the marker, and `:473` makes it binding — *"no close may
claim … a motion property still under PENDING-QUARANTINE"*.

**The quarantine's reach therefore extends into wave gate text**, an axis HG-11's set-difference —
defined over the 46 ledger rows — structurally cannot enumerate. This addendum **records the axis
and does not close it**: closing it is X.W6.j's act at its own open, against these same two guards,
and the discharge condition is now stated in one place. It is a **named residue**, not a silent one
(§9.9 R-2).

---

## §9.8 · HG-10 — the untracked half, **discharged by event** (fold **W0.14**)

HG-10's born-RED (W0.md `:273`) reads: *"the r2 artifacts exist on disk but are **untracked** — all
33 untracked files under `docs/tranches/V/megatranche/` are exactly these three slugs' r2 challenge
files and evidence probes; the ledger still carries 46 REPORT-AUTHORED rows."* Its falsifier reads
as **two** conditions: *"a named slug whose row stays REPORT-AUTHORED, **or** whose evidence stays
untracked."*

**Half one — evidence tracked. GREEN, and not by this seat's hand.** Measured at this clock,
double-run:

| probe | result |
|---|---|
| ⟨`git ls-files --others --exclude-standard docs/tranches/V/megatranche/ \| wc -l`⟩ | **0** (double-run **0**) |
| ⟨`git ls-files …/ActionFeedback/ \| grep -c 'r2'`⟩ | **6** — `challenge-L-library-r2.md` + 5 `evidence-r2/` probes |
| ⟨`git ls-files …/picker-pointerdebugoverlay/ \| grep -c 'r2'`⟩ | **2** — `challenge-D-design-r2.md` + `evidence-r2/probe.mjs` |
| ⟨`git ls-files …/picker-componentsliders-consolerail/ \| grep -c 'r2'`⟩ | **26** — `challenge-D-design-r2.md` + 25 `evidence-r2/` probes |

**6 + 2 + 26 = 34** r2 artefacts tracked; **0** untracked bytes remain under `megatranche/`. The
born-RED's 33 is a dated figure that the tree moved past before this wave opened. **This seat
created no r2 artefact and tracked none**: the half was discharged by event, exactly as fold
**W0.14** predicted — *"Measured 2026-08-28: the megatranche tree contributes **0** untracked
files."* Recorded with the receipt rather than claimed as work.

**Half two — the ledger status. STILL RED, and uncurable by this seat, by law.**
⟨`grep -c 'REPORT-AUTHORED' registry/HYDRATION-LEDGER.md`⟩ → **47** = **46 rows + the Totals line**
(SELF-COUNT law). The 46 is a **fixed constant** — `CLOSURE_MANIFEST_46` in `hydrate-reports.mjs`,
per the ledger's own definition block at `:6-8` — so re-statusing the three slugs requires a
**generator change, not a ledger edit**. Under W0.md §Disjointness `:119` (*"c and e both touch
`HYDRATION-LEDGER.md` **through the generator, never by hand**"*), that act is **X-W0.c's**, which
re-runs `hydrate-reports.mjs` after this commit lands. **A hand-edit here would be a masking
fallback and is refused.**

---

## §9.9 · Residuals — named, not silent

- **R-1 · The ledger-status half of HG-10 stays RED at this unit's close**, by design and by
  §Disjointness. Its only lawful cure is **X-W0.c's** generator replay. This unit's commit is
  sequenced **before** `.c` precisely so that replay sees the tracked r2 artefacts.
- **R-2 · The wave-gate-text coverage axis (§9.7) is recorded, not closed.** `W6.md`'s
  `MOTION-SOURCED · PENDING-QUARANTINE` marks are outside the 46 and outside this record's
  file-level disposition; **X.W6.j** discharges them at its own open against ⟨G1⟩+⟨G2⟩. No claim of
  closure is made here.
- **R-3 · MQ-1 is still an open product defect, and no cure is applied.** §4's cure shape — a
  `@media (prefers-reduced-motion: reduce)` block in `PaneHeader.vue` setting
  `animation-timeline: none` on the three selectors — remains un-executed, and `demo/` is
  **Do-NOT-touch** for this wave (W0.md `:101`). §9.4.1 adds a **second site** asserting the same
  mechanism (A-1b); it does **not** add a second defect. Nine sibling panes carry
  `.pane-scroll-fade` (§4 "Blast radius"), unchanged at this clock.
- **R-4 · §7.3's ten landed rows are untouched.** This addendum adds an eleventh
  (§9.5); it withdraws nothing, softens nothing, and re-rules nothing. Every
  *"must not be adopted until"* condition landed at `9812f951` still binds.
- **R-5 · Zero canonical axis bytes written.** ⟨`git status --porcelain -- audit/components/`⟩ over
  this unit's work → **empty**. The 46 `challenge-*.md` files are byte-identical to their state at
  this wave's open (C-02, receipts literal). The stamps live here, which is the whole reason this
  record exists.
