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
