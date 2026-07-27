# Layout Gestalt — adjudicated apotheosis (M-13 tri-fold, arbiter-F)

**MODEL RECEIPT.** `claude-fable-5` (Fable 5) — arbiter-F of the M-12/M-13 tri-fold per L-14;
observed, not inherited (L-11). Workers adjudicated: worker-F (`claude-fable-5`,
`design/layout-gestalt-worker-f.md`) · worker-O (`claude-opus-5[1m]`,
`design/layout-gestalt-worker-o.md` + `design/layout-gestalt-geo-probe.mjs`).

**Date.** 2026-07-27. **Band.** DESIGN — no source edits; deliverable = this apotheosis + wave specs.

**Method (L-14).** Both workers were attacked before either was adopted. Arbiter's own instruments
this session (every count re-run, none inherited): the full census re-measured
(`grep -rEn "@media[^{]*(min-width|max-width|min-aspect|max-aspect|orientation|aspect-ratio)"
demo --include="*.css" --include="*.vue"` → **7**, exact file:line list = worker-O's;
`grep -rEo "\b(sm|md|lg|xl|2xl):[…]+" demo --include="*.vue" | wc -l` → **58** across **28** files
(O's 58 exact; his "19 files" corrected; worker-F's "12 lg:\*" is a 4.8× under-count of mechanism B);
JS breakpoint refs → **37 / 13 files** (O exact); byte-level read of the installed
`node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/styles.css` (container-type ✓,
44.9375rem `@container` collapse ✓, unbounded `minmax(0, 61.8033989fr)/…38.1966011fr` ✓, cqi tuple ✓,
`data-has-inspector` ✓, **`overflow: clip` ✓** — O's U-4 is real);
`@container style(--configurator-size)` and both `@container dock (…)` rules present in the dist ✓;
`grep -rn InstrumentChassis demo/` → **0** ✓; `grep -rn 'container-name\|containerName' demo/` → **0** ✓
(the producer dock rules are dead code in this app — G-6 confirmed); `shell.css:19-28/59-77/82-84/
98-139/183-216` and `foundation.css:425-479` read in full; the 21/9 arm's arithmetic verified
(3440×1440 → aspect 2.389 > 2.333 → `--content-max-h = clamp(30rem, 62dvh, 38rem)` = **608px** —
O's two-axis find is exact); `VISUAL-CONSTITUTION.md` §3/§3.1/§4.2/§6.1/Atmosphere-Blob/About-Admin/
Account-recovery and `OPTICAL-BENCH-COMPOSITIONS.md` §3-§5 read verbatim; the same-day adjudication
`registry/adjudicated/App.md` read in full (decisive — see RD-1, RD-3); `ConfigSliderPane.vue:99/:208-218`
and `ConsoleRail.vue:315-328` and `App.vue:75-99/:305-311` read.

**Environment disclosure (L-12).** No browser was launched by this seat; every behavioural number
cited below is a committed reproduction (MT-F028's probe, O's geo-probe table, App.md's
triple-measured probe rows). All of it is WebKit-or-Chromium via playwright, dev server, API-less —
never real Safari (MT-F025), never the built bundle (MT-F012 is another wave's subject).

**Integrity note (L-7), binding on the first executing session.** The ENTIRE design band is
untracked today (`git ls-files docs/tranches/V/megatranche/` → 0; the tree is one `??` row).
Worker-O's "committed alongside this document" and worker-F's "committed under design/pi/" are both
prospective, not actual — the same overstatement class App.md flagged. The band's first commit
force-adds `design/`, `registry/adjudicated/`, and the probe, or none of this exists.

---

## 0. Verdict in one paragraph

**Worker-O's design is adopted as the spine; worker-F's design is refuted on its two load-bearing
mechanisms (the inner-scroll frame and the one-cut wave shape) and harvested for four genuine
contributions the spine lacked.** The workers independently converged on the decisive architectural
fact — glass-ui 7.0.0's InstrumentChassis IS the one mechanism, already installed, zero consumers —
and that convergence is grounded (this seat re-verified it byte-level), not suspicious: they diverge
on scroll model, root container type, viewport units, census, wave count, route count, and ask
granularity, which is the L-14 independence signature (same pattern App.md recorded). What decides
between them is evidence neither can argue with: canon §3 law 6 says **"one document-scrolling
stage→inspector→action sequence"** in so many words, and the same-day App adjudication CONFIRMED
D-8 with a traveling gate — `document.documentElement.scrollHeight > clientHeight` at 390×844 —
that worker-F's design would leave RED **forever** (his scroll lives inside `.pane-main`; the
document never scrolls). The same adjudication refused D-2's cure as a one-cut transposition
("an eleven-member transposition is an arc — L-1; 38% landing rate"), which is exactly worker-F's
WAVE LG-1. Worker-F wins where he was sharper: the stage-spend witness (surplus provably reaches
the protagonist), the admin subgrid one-truth, the threshold-as-published-contract ask, and the
WebGL-resize probe. The arbiter adds two catches both workers missed (the T-45 carrier dies with
`.pane-wrapper`; the dock's posture under document scroll is undesigned) and one sequencing rider
neither wrote (this band collides with MT-APP-1's files and runs after it).

---

## 1. Ruled disagreements (the tri-fold's actual work)

| id | worker-F | worker-O | RULING | Deciding evidence |
|---|---|---|---|---|
| **RD-1 · scroll model & root container** | Frame law: `.app-layout` keeps `100dvh + overflow:hidden`, promoted to `container: frame / size`; `.pane-main { overflow-y: auto }` is "THE document scroll on narrow"; the pin unit is `cqb` against the frame | Block law: `min-block-size: 100svh`, **no** overflow declaration — the document itself scrolls; `container: scene / inline-size`; `size` containment REFUSED; pin unit `svh` | **O — REFUTED for F, twice over** | (1) Canon §3 law 6 verbatim: "one **document-scrolling** stage→inspector→action sequence" — an inner scroller is not the document. (2) App.md D-8 **CONFIRMED** with the traveling gate `documentElement.scrollHeight > clientHeight` @390 — RED today, and RED forever under F's design. (3) F's `container: frame / size` is spec-incompatible with the cure: a box that must grow past the viewport with its content cannot be size-contained (contain:size computes the box ignoring content). The refutation cascades: no size container → no `cqb` → F's pin `min(42cqb, 24rem)` and his U-1 unknown evaporate; O's `40svh` ceiling stands (and is the stabler unit under URL-bar collapse — `dvh` would resize the pinned preview mid-scroll). F's real advantages (dock persistent by construction; stable dvh) are preserved as DISSENT and answered by A-2. |
| **RD-2 · the mechanism-B census** | "Tailwind lg:\* fork utilities **12**"; gate `lg:` = 0 | "**58** sm:/md:/lg: occurrences"; gate all responsive prefixes = 0 | **O** | Arbiter re-run: **58** occurrences. F's gate would close green with 46 responsive prefixes still alive — a vacuous census gate (L-2). Correction to O: **28** files, not 19. |
| **RD-3 · wave shape** | 3 waves; LG-1 = the whole transposition in one cut (shell + viewSchema axis + both router composables + chassis mounts + all census zeros), "one session" | 4 waves ordered by value-delivered-alone (block law → one mount → inline law → proving pair), each with an honest COMPLETABLE row | **O** | The same-day App adjudication refused exactly F's shape: D-2 RESCOPED — "the accusation is true; the SHAPE is refused — an eleven-member transposition is an arc (L-1; 38% landing rate)". Worker-F's OWN dissent preserved in App.md argues the same ("a transposition-first program would leave both live… against a repository whose measured delivery rate is 38%"). F's LG-1 also double-books App D-1 as "BUILD, here" — D-1 is already BUILD-owned by MT-APP-1 (App.md §Carries); an L-5 violation, struck. |
| **RD-4 · the ultrawide gate** | Blanket: scene ≥90% width @3440 except /about; plus stage@3440 > stage@1440 | Route-classed UL-3: ≥90% width AND ≥90% block extent on the 16 stage/field compositions; measure-bound routes gate on `article ∈ [60ch,72ch]` + zero empty companions; the cap is TWO-AXIS (608px block cap = ~86% of viewport area dead) | **O's law + F's witness folded in** | O's two-axis find is verified arithmetic (foundation.css:479 → 608px at 3440×1440) and MT-F028 reported the inline axis only; O's route-classing kills the "2240px paragraph" failure F's blanket gate would bless. But O's coverage gate alone can pass with a stretched rack and a starved stage — F's `stage@3440 > stage@1440` (RED today: both 512-capped) is the sharpest "the surplus reached the protagonist" oracle and enters V·L3 as a gate. |
| **RD-5 · the route table** | 16 rows | 18 rows (canon's binding inventory: eleven members + ADMIN5 + Account + storage recovery) | **O** | VISUAL-CONSTITUTION §3.1 read: the W18 ratification inventory is "each of these eleven members **plus Users, Names, Audit, Flagged, Tags, Account and unsupported/corrupt storage recovery**". Account (producer Dialog — bespoke at zero demo lines) and recovery (measure-bound article) carry layout verdicts F never issued. |
| **RD-6 · pin mechanics for the persistent stage** | `--instrument-stage-pin: min(42cqb, 24rem)` (needs the frame size-container; U-1 engine risk self-flagged) | `position: sticky; aspect-ratio: 3/2; max-block-size: 40svh` inside the container's own narrow arm | **O** (consequence of RD-1) | No size container survives the ruling, so `cqb` has no eligible container and would silently fall back to the small viewport anyway — i.e., F's unit degrades into O's, minus the clarity. `svh` is honest about what it reads. |
| **RD-7 · interiors ownership** | LG-3 is a layout-band wave (picker rack, mix rack, browse/library field, admin subgrid) | "Route interiors stay with their W18–W30 owners"; the band ships laws, not member restyling | **O's ownership + F's gates as LAW** | The D-2 rescope routes member composition to "the constitution's own owner: §3.1 W18 + the member waves" — pulling member interiors into the layout band re-creates the refused arc. But F's interior grammar is the ultrawide law's delivery mechanism and his gates are the best in either document — so §7 below binds the member waves at birth with F's gate commands written for re-use (rack wrap ≥2 cols @3440 · field density 2× · 1-col + zero h-scroll @390 · **admin subgrid one-truth**, F's structural idea, adopted — O never named subgrid). |
| **RD-8 · glass asks** | 2 asks (G-1 pin+scroll posture; G-2 threshold as published contract) | 6 asks (persistent-stage arm · scroll-confined inspector · comfort-inline · coarse-pointer rung · block-fill arm · dock containerName defect relay) | **Union, deduped** | Every O ask verified against the dist (no sticky arm, no inspector overflow rule, no comfort token, no fill arm; the dock rules measurably dead with containerName=0). F's G-1 is the union of O's G-1+G-2 — O's split is finer-grained and each half retires demo lines independently. F's threshold-contract ask survives as G-7 (O has no equivalent and his U-3 needs it). O's U-4 promoted to the G-8 candidate probe. Merged table in §6. |

### Arbiter's own catches — defects in BOTH designs

- **A-1 · The T-45 oversampled-blur carrier dies silently with `.pane-wrapper`.** shell.css:183-216
  seats the t33 rim-artifact cure on `.pane-wrapper:has(> .glass-resting)` (carrier `::before`,
  `inset: calc(-2*blur)`, clip-path back to the card) AND neutralises the card's own
  `backdrop-filter` in the same block. Both designs delete the wrapper divs; O even wrote "the T-45
  seat is orthogonal and untouched" — it cannot be: the selectors go dead, the cards regain their
  own edge-smearing filter, and the owner's original "strange clipping artifacts" RETURN. The mount
  wave (V·L2) re-seats the carrier on the region wrapper that replaces `.pane-wrapper`, with a gate
  (below). This also compounds O's U-4: the carrier deliberately paints outside its box, and the
  chassis declares `overflow: clip`.
- **A-2 · The dock's posture under document scroll is undesigned.** Canon §3 law 6 puts the mobile
  sequence "beneath the same top dock"; law 4 gives the dock a reserved band; the shell mints zero
  z-index by law (shell.css:18). Under MB-1 the dock would scroll away with the document. F's frame
  kept it persistent by construction; O never addressed it. Not designed from this chair: V·L1
  carries a named decision probe (sticky dock band vs in-flow) with the z-seat question relayed to
  the producer if sticky wins. Recorded as **U-7**.
- **A-3 · The band is untracked** (header note). Both workers' "committed" claims are prospective.
- **A-4 · shell.css:107's "CI emission canary" (`scripts/ci/css-emission-probe.mjs`) does not exist
  on disk** (`ls scripts/ci/` → `verify-packed-surface.mjs` only). Prose rot — recorded so no
  session "preserves" the `[data-layout]` witnesses for a ghost consumer.
- **A-5 · The instruments reconcile.** O "could not reproduce" MT-F028's 65% union coverage; the
  committed probe (`audit/probes/layout-utilization.mjs`) clamps boxes to the viewport
  (`Math.max(0,left)/Math.min(vw,right)`) and cannot exceed 100% — O's non-reproduction was his own
  unclamped variant, discarded correctly. Both instruments agree in direction; the gates below key
  to the COMMITTED probe, extended in place (assert mode + `docScrollable` + `.pane-container`
  box/gridCols columns + routes `#/atmosphere #/palettes #/admin/users` + 320×568 and 720×450@2
  arms). The extension is V·L1 scope; the geo-probe is adopted beside it as the pane-container
  companion.
- **A-6 · Sequencing rider (neither worker wrote it).** This band's V·L2 collides file-for-file
  with the adjudicated MT-APP-1 (App.vue, usePaneRouter.ts, useViewManager.ts, PaneSlot). The band
  executes AFTER MT-APP-1 lands: it consumes `main.ts`, required typed `onMount`, and `bindPane` —
  under one mount, `bindPane`'s slot axis collapses with the architecture. App D-1/D-12/D-13 are
  MT-APP-1's BUILDs and are NOT carried here (F's LG-1 D-1 claim struck, RD-3). App.md's D-2 axis
  bank (`right:\s*"` count in viewSchema == 0) fires GREEN at V·L2's close.

### 200%-zoom invariant (MT-F022 #4) — both designs pass, the apotheosis states it as law

Zoom is the mobile path and must stay correct. Under the one-container-tree: 1440@200% = 720 CSS px
→ chassis container ≈ 720 − 2×gutter ≈ 696px < 719 → the producer's stacked arm — the SAME path as
390, now with content parity (the zoom-200 blob amputation dies with the fork). And because the
threshold is CSS-only, crossing it — by zoom or by resize — no longer remounts a different subtree:
the three KeepAlive caches and both WebGL contexts survive, which is D-7's adjudicated cure
("the fork dies with the axis"). Witnessed at 720×450@2 in V·L2's π and at the
PROPORTION-AUDIT-mandated actual-400% arm in V·L3's π.

---

## 2. THE MECHANISM LAW (final)

> **ML-0 — One adaptation mechanism: the region's own box.** Every layout decision in `demo/` is a
> function of the containing box it affects, never the viewport. The mechanism already ships:
> glass-ui 7.0.0's `InstrumentChassis` is itself the container (`container-type: inline-size`),
> collapses stage→inspector→action at its own `@container (max-width: 44.9375rem)`, expresses the
> only two legal proportions as unbounded `fr`, and drives interior rhythm off `cqi` — with zero
> demo consumers today. The design is therefore overwhelmingly a **deletion**: 102 adaptation sites
> in 3 dialects → 1 mechanism.

- **ML-1** — Containers are `inline-size`. `size` containment is REFUSED anywhere in the scroll
  path: it would forbid the document-scrolling sequence canon §3 law 6 requires (RD-1). Recorded so
  a later wave does not "improve" it back in. Consequence: no `cqb`; the block axis is governed by
  ML-2.
- **ML-2** — The viewport is read for exactly two block-axis reservations, both honest: `100svh`
  shell floor (`min-block-size`, first-paint-stable) and `40svh` persistent-stage ceiling. `dvh`
  only where an element must track the live viewport; `lvh` never; `100vh` stays 0. (`--app-gutter`'s
  `cqi` at `:root` resolves against the small viewport by spec — the page-level measure, honestly
  spelled; O's note adopted.)
- **ML-3** — `@media` survives only for capability, never size: the 27 `prefers-*`/`forced-colors`/
  `print`/`pointer`/`hover` rules are correct and untouched. Two of today's seven size queries are
  capability questions wearing a width and are RESTATED, not deleted: ConsoleRail's
  `(max-width:1023px)` touch rung → `(pointer: coarse)` (the tree itself already made this exact
  move for config rows — ConfigSliderPane.vue:218; G-4 producer ask), and DockStatusLamp's
  `(min-width:1024px)` → the producer's own `@container dock` rules, dead today only because
  nothing passes `container-name: dock` (G-6 relay). Width/aspect/orientation `@media` in demo = **0**
  (7 today).
- **ML-4** — Intrinsic sizing before any query: `minmax()`, `clamp()`, `auto-fit`/`auto-fill`,
  `aspect-ratio`, `fr`, `min()/max()`. A `@container` arm is the last resort and must state what
  intrinsic sizing could not express.
- **ML-5** — `:has()` + the producer's `[data-has-inspector]` replace the JS layout question. JS
  holds no breakpoint: `useBreakpoint`, `isDesktop`/`isMobile`, `mobilePaneIndex`, `[data-layout]`
  and the v-if dual tree all die (37 refs / 13 files → 0). One DOM tree per route; CSS reflows it.
- **ML-6** — Logical properties throughout (canon §6.1). One honest caveat: `overflow-block`/
  `overscroll-behavior-block` support is UNVERIFIED (no browserslist, no Vite target) — V·L1 gate 5
  resolves it with one `CSS.supports` call; the physical-axis fallback ships if false, with the
  logical form banked (re-trigger in V·L1).
- **ML-7** *(arbiter, from A-1)* — A producer-cure seat is never deleted with its host selector:
  any wave that removes a class named by a standing cure block (today: `.pane-wrapper` in the T-45
  seat) re-seats the cure in the same wave, with a gate.

**Tailwind responsive prefixes carry no layout: 58 → 0** (all of `sm:/md:/lg:/xl:/2xl:`, RD-2).

---

## 3. THE ULTRAWIDE LAW (> 2000px)

The RED input is two-axis: at 3440×1440 the stage is 30.5% of viewport width AND the 21/9 arm caps
it at 608px = 45.4% of the scene band — ~86% of the viewport area dead (verified arithmetic,
foundation.css:479). `--pane-max` is a 2026-07-05 **card-comfort** ruling leaking upward into a
**page** cap it was never asked to decide.

- **UL-1** — No route's stage is bounded by a viewport-independent constant. `--pane-max`,
  `--pane-min`'s page role, `--content-max-h` and BOTH aspect arms (foundation.css:471, :479) are
  deleted outright. The scene band's own grid row is the honest cap — foundation.css:427's own
  comment already says so.
- **UL-2** — Surplus is SPENT, in order; only the last resort is margin:
  1. **The protagonist grows** (stages are `fr` + `aspect-ratio`; a 2080px meniscus is strictly
     better than 512px — a colour field's job is precision and precision is pixels).
  2. **Fields gain columns** — `repeat(auto-fill, minmax(<slip>, 1fr))`; `auto-fill` stops minting
     tracks when content runs out and degrades to (1) automatically. **Racks wrap, never stretch**
     (`auto-fit` at an 18rem control-group measure / 13rem channel measure).
  3. **Measure-bound regions hold** (prose 66ch; a slider at its comfort inline-size) and hand the
     surplus BACK to (1)/(2) — never to page gutter. Mechanically this is glass ask **G-3**; a demo
     `max-inline-size` on the inspector would be the `--pane-max` mistake at a smaller scale.
  4. **The gutter is fluid and bounded**: `--app-gutter: clamp(0.75rem, 2.5cqi, 3rem)` — 12px@390 ·
     36px@1440 · 48px@3440 (2.8%/side, earned breathing room). Replaces `--app-padding-x` and both
     workers' gutter spellings (values = O's; the 0.75rem floor lifts mobile coverage 91.8→93.8%).
- **UL-3** — The coverage gate is ROUTE-CLASSED, because a 2240px paragraph is also a defect.
  Stage/field compositions (16 of 18): content-width coverage ≥90% AND scene-band block extent ≥90%
  at 3440×1440, **AND stage inline-size @3440 > stage @1440** (F's spend witness — RED today:
  equal, both 512-capped). Measure-bound (`/about`, recovery): EXEMPT from coverage, gated instead
  on `article inline-size ∈ [60ch, 72ch]` AND zero zero-content companion boxes — the sin at 3440
  is not a narrow column, it is a narrow column beside an empty glass pane (§3 law 2).
- **UL-4** — Aspect ratio never selects a layout. Both `min-aspect-ratio` arms die. The D6-03
  portrait pathology they answered is answered by the container: a 1080-wide slab gives the chassis
  ~1030px > 719px → two-column, which on a 1750px-tall screen is CORRECT — the pathology was
  `--content-max-h` capping the pair, and that token is gone.

---

## 4. THE MOBILE LAW (full width AND height at 390; purpose exercisable; zoom = the same path)

- **MB-1 — The document scrolls.** `.app-layout { height:100dvh; overflow:hidden }` →
  `min-block-size: 100svh`, no overflow declaration. The single highest-value line in the design:
  it converts "content that does not fit is gone" into "content that does not fit is below". Canon
  §3 law 6 is today literally unsatisfiable (`docScrollable = 0` at every viewport — measured
  thrice: geo-probe, MT-F028, App.md). Discharges the adjudicated D-8 with its traveling gate.
  Dock posture under scroll = U-7 (A-2), decided by V·L1's probe, never silently.
- **MB-2 — Nothing is unmounted for being narrow.** Collapse is an axis change
  (`grid-template-columns: 1fr`), never a `v-if`. Kills the class behind App D-1 (inert mobile
  action bar) and ConfigSliderPane D-2 (31 sliders absent below 1024) structurally — L-8, one tree.
- **MB-3 — Full width means full width.** `--app-gutter` floor 12px → 93.8% at 390; the chassis'
  own `cqi` dial padding is the inner inset; one inset owner (PR-33).
- **MB-4 — Full height means the block axis is spent, not capped.** The 73–78% height voids are
  thin content in a fixed box; once the box is content-hug inside `1fr`, a short page simply ends.
  **A short page is not a defect; a short page inside a tall empty box is.** Gate: no region taller
  than its content — not "content fills the screen".
- **MB-5 — 44px is a pointer property**, not a width property: `@media (pointer: coarse)` raises
  the control rung (G-4 owns the atom). Fixes desktop touchscreens, which the width query gets
  wrong in both directions.
- **MB-6 — Zoom is the same path** (MT-F022 #4, stated in §1): the container threshold serves
  390-native and 1440@200% identically; crossing it never remounts (D-7 cure). Witnessed at
  720×450@2 and actual-400%.

### BM-1 — the bespoke discriminator (adopted verbatim from worker-O; F's "tune-while-observing" is
the same criterion, less operationally stated)

> A route earns a bespoke narrow composition **iff its controls and their observable effect live in
> different regions AND the interaction is continuous** (drag/scrub — feedback must be simultaneous
> to be feedback at all).

Canon independently mandates the outcome for exactly the two qualifying members: Atmosphere =
"**persistent** Aurora preview", Blob = "**persistent** container-scaled material preview" +
"scroll-confined inspector" (§3.1), and §7: "every select/axis has an observable effect on its live
preview". The pinned stage is canon-earned, not contrivance; and it is NOT the "simultaneous
two-stage miniature" law 6 bans (one stage + a scrolling inspector IS the mandated sequence, with
the stage sticky).

---

## 5. FINAL PER-ROUTE TABLE — canon's binding 18

`/easing` and `/about` are not yet routed (viewSchema has neither; About ships as Picker's
companion, which §3.1 forbids) — the law binds them at creation; W27/W18 own the bodies.

| # | Route | Composition | Verdict | Reason (BM-1) |
|---|---|---|---|---|
| 1 | `/` Picker | chassis `golden` | **ONE** | Meniscus is both control and effect; collapsed order puts the readout directly above the channel rail. ⚠ U-2: verify at 320×568 — the measurement decides whether it earns the persistent-stage arm, not this document. |
| 2 | `/palettes` Library | field 64–66.7 / inspector 33.3–36 | **ONE** | `auto-fill` field; selection→inspector is discrete; empty lane collapses via `:has()`/`data-has-inspector`, never JS. |
| 3 | `/browse` Browse | same | **ONE** | Isomorphic to Library; unselected → producer's inspector-absent expansion. |
| 4 | `/extract` Extract | chassis `golden` | **ONE** | Sampler acts ON the image — manipulation surface = effect surface. `touch-action: none` on the well so the drag never steals the newly-scrolling document. |
| 5 | `/mix` Mix | chassis `golden` | **ONE** | Operand rack `repeat(auto-fit, minmax(6rem,1fr))` — legible at 2, 3 and 12 from one declaration (canon §7). |
| 6 | `/generate` Generate | chassis `golden` | **ONE** | Regenerate is a discrete commit: press, then look — simultaneity not required. Height void cured by MB-4. |
| 7 | `/gradient` Gradient | chassis `golden` | **ONE** | Stops are dragged ON the meniscus; the one protagonist horizontal by nature. |
| 8 | `/easing` Easing *(to be routed, W27)* | chassis `golden`, stage `clamp(19rem, 60cqi, 22rem)` | **ONE** | Control points dragged on the curve; the canon clamp is container-relative, never viewport; strips auto-fit around it and take the ultrawide surplus. |
| 9 | `/atmosphere` | chassis `preview-dominant` | **BESPOKE-NARROW** | Continuous sliders, remote WebGL effect — BM-1 met; canon says "persistent". Shares ONE rule with /blob. |
| 10 | `/blob` | chassis `preview-dominant` | **BESPOKE-NARROW** | Same, and the measured RED: 31 sliders → 0 at 390; 3.7-screen hand-rolled scroller; the canon-forbidden settings Card. The Dock Picker\|Blob toggle dies with the architecture. |
| 11 | `/about` *(to be routed, W18)* | structural article, no chassis | **ONE** | 66ch measure at every width; UL-3 exemption; no companion, ever. |
| 12–16 | `/admin/{users,names,audit,flagged,tags}` | full-width review field, no chassis split | **ONE** | Canon: companion/right-label/pane-toggle REMOVED, not restyled; full main width. Narrow arm is row disclosure — the same region set, container-driven. ONE row anatomy on subgrid (§7 law; F's structure). |
| 17 | Account | glass `Dialog` | **PRODUCER-BESPOKE** | Side dialog wide / full-inline narrow is `dialog/placement.css` — bespoke at ZERO demo lines; a prop. |
| 18 | Storage recovery | content-hug article in Library's main | **ONE** | Measure-bound like About; never an empty library, overlay, or companion (§7 — the D-14 sequencing stays with W15/W22). |

**Tally: 15 ONE · 2 BESPOKE-NARROW (one shared 6-declaration rule → 0 lines when G-1 ships) ·
1 PRODUCER-BESPOKE.** That is "without contrivance": the bespoke arm is six declarations serving
two routes, earned by a canon clause that is otherwise unsatisfiable.

---

## 6. EXEMPLAR CSS — corrected best-of-both (sketch-grade; guesses marked)

### 6A · The shell (the whole layout surface after the cut)

```css
/* demo/styles/shell.css — after. DELETED: .pane-container(--dual), .pane-wrapper--left/--right,
   the [data-layout] witnesses, the @media dual-grid arm; foundation.css loses --pane-max,
   --pane-min's page role, --pane-gap, --content-max-h and BOTH aspect arms. */

:root {
  /* ONE gutter, fluid and bounded (UL-2.4). cqi at :root resolves against the small viewport
     per spec — the page-level measure, honestly spelled. */
  --app-gutter: clamp(0.75rem, 2.5cqi, 3rem);   /* 12px@390 · 36px@1440 · 48px@3440 */
  --rail-row-min: 2.25rem;
}
@media (pointer: coarse) { :root { --rail-row-min: 2.75rem; } }  /* MB-5 — capability, kept */

.app-layout {
  display: grid;
  grid-template-rows: auto 1fr;            /* dock band · scene band — T-31 unchanged */
  row-gap: var(--dock-gap);
  min-block-size: 100svh;                  /* MB-1/ML-2 — was height:100dvh; overflow DELETED */
  padding-block: var(--dock-inset) var(--phi-1);
  padding-inline: var(--app-gutter);
}
/* U-7 (A-2): dock posture under document scroll — sticky vs in-flow — is V·L1's probe decision;
   if sticky wins, the z-seat is a producer question, never a minted shell z-index. */

/* THE ONE CONTAINER — inline-size only; `size` is refused (ML-1). Nothing below reads the viewport. */
main.scene {
  container: scene / inline-size;
  min-inline-size: 0; min-block-size: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);   /* the LAST grid-template-columns in demo/styles */
}

/* A-1 · THE T-45 CARRIER, RE-SEATED (same tokens, same clip idiom — only the seat changes;
   the block retires wholesale on the producer P3-family rider, as before). GUESS: the seat is
   the chassis' direct wrapper (the route-scene root); the executing wave verifies against
   overflow:clip (U-4) before landing. */
.route-scene:has(> .glass-resting, > .instrument-chassis) { position: relative; }
.route-scene:has(> .glass-resting)::before { /* …identical carrier declarations, shell.css:199-208 … */ }
```

### 6B · `/blob` — the bespoke pair's exemplar (cures ConfigSliderPane D-2)

Adopted from worker-O §6B whole (chassis `preview-dominant`; Card + `.console-well` + local
scroller + local row clamp DELETED; banks `repeat(auto-fill, minmax(16rem,1fr))` so the 3.7-screen
inspector collapses to ~1 screen at 3440; density via the producer's shipped
`@container style(--configurator-size)` seam), with the narrow arm as ruled:

```css
/* THE BESPOKE NARROW ARM — 6 declarations, shared with /atmosphere; retires to ZERO lines on G-1. */
@container scene (inline-size < 45rem) {
  .scene--persistent-stage .blob-stage {
    position: sticky;                /* no z-index minted — sticky suffices in DOM order */
    inset-block-start: 0;
    aspect-ratio: 3 / 2;             /* a window, not a page */
    max-block-size: 40svh;           /* svh: URL-bar collapse cannot shrink it mid-scroll (RD-6) */
  }
  .scene--persistent-stage .instrument-inspector { overflow-block: visible; }  /* ⚠ U-1 spelling */
}
```

Degraded posture if G-1/G-2 have not shipped: the producer's stacked arm still renders ALL regions
in document flow — preview, then 31 operable rows, then actions; the 390 purpose gate passes
WITHOUT the ask (worker-F's two-stage honesty, folded into V·L4 gate 2). No local chassis clone in
the interim, ever (MT-F014's fork class; `feedback_kiss_no_contrivance`).

### 6C · `/` Picker — the ONE-layout exemplar

Adopted from worker-O §6C whole: `.picker-stage` rows `auto auto auto 1fr` with
`row-gap: var(--instrument-title-gap)` (§3.2's G is load-bearing — no local spacing token);
`.picker-meniscus` `aspect-ratio: 16/9` + `min-block-size: 6rem` + `touch-action: none` (replaces
the 5-value viewport fork `h-[20dvh] min-h-24 max-h-40 lg:h-[14rem] lg:max-h-none`);
`.picker-channels` `repeat(auto-fit, minmax(13rem, 1fr))` — 1 col @390, 2 @1440, content-exhausted
4 @3440, no query. Control-group racks elsewhere default to worker-F's 18rem measure (§7). No
narrow arm authored: BM-1 unmet; U-2 (320×568) is measured in V·L3's π, and the answer — not this
document — decides whether `.picker-stage` joins `.scene--persistent-stage`.

---

## 7. THE MEMBER-INTERIOR LAW (RD-7 — binds W18–W30 at birth; not a layout-band wave)

Per the adjudicated D-2 rescope, route interiors belong to the member program. This band binds them
with worker-F's gates, written once here for re-use; each member wave born-REDs its own interior
against them:

- **IL-1 rack wrap** — control racks are `repeat(auto-fit, minmax(18rem, 1fr))` (channel rails
  13rem): rack column count @3440 ≥ 2 (`getComputedStyle(...).gridTemplateColumns` track count).
  RED today on `/`: 1.
- **IL-2 field density** — specimen fields are `auto-fill`: visible columns @3440 ≥ 2× @1440
  (seeded fixture list while API-less; the probe injects N slips and says so — L-12).
- **IL-3 rack floor** — @390 every auto-fit/auto-fill interior = 1 column AND zero horizontal
  document scroll (`document.documentElement.scrollWidth <= clientWidth`). Must hold in the same
  run as IL-1/IL-2.
- **IL-4 admin one-truth** *(F's structure, adopted)* — exactly ONE `grid-template-columns`
  declaration in the review-list scope; rows carry `grid-template-columns: subgrid`; the narrow arm
  is the row's container-collapse disclosure. Five routes, one anatomy, per-row drift
  unrepresentable (L-8). RED today: no such structure.

---

## 8. GLASS ASKS (merged, deduped — relayed to the glass-ui BH inbox per the standing edict; none
is a local build, ever)

Already shipping, no ask (verified byte-level this session): container-type · cqi S122 tuple ·
44.9375rem container collapse · exact unbounded golden/preview-dominant fr ·
stage/inspector reserves · `[data-has-inspector]` · `@container dock` density rules ·
`@container style(--configurator-size)`.

| # | Ask | Why not local | Deletes |
|---|---|---|---|
| **G-1** | Persistent-stage collapse arm on InstrumentChassis (opt-in prop): inside its own `@container (max-width:44.9375rem)` → `.instrument-stage { position:sticky; inset-block-start: var(--instrument-stage-persist-inset,0); max-block-size: var(--instrument-stage-persist-max,40svh) }` | The rule lives inside the producer's container context; a consumer cannot enter it without duplicating the 44.9375rem threshold — minting a second mechanism | §6B's whole narrow arm (6 decls × 2 routes) → 0 |
| **G-2** | Scroll-confined inspector arm: `min-block-size:0; overflow-block:auto; overscroll-behavior-block:contain; scrollbar-gutter:stable` | Canon §3.1 names it HOUSING; housing is P122's. The demo hand-rolled it and shipped it wrong (2605/695, maskImage none) | ConfigSliderPane's scroller; absorbs U-1 into the producer |
| **G-3** | `--instrument-comfort-inline` on the inspector track, surplus returning to the stage | UL-2.3 must not become a demo cap — the `--pane-max` mistake at smaller scale | the last reason a demo would author an ultrawide cap |
| **G-4** | Coarse-pointer control rung on Slider/configurator-row (≥44×44 under `(pointer:coarse)`) | The producer owns the control atom; thumb measured 12×24 at BOTH 1440 and 390 (39 REPORT.json entries); the demo's own :218 precedent proves the idiom | ConsoleRail.vue:323 — the 7th viewport media rule; fixes desktop touchscreens |
| **G-5** | Chassis block-fill arm (`fill` prop → `block-size:100%; min-block-size:0` on chassis + composition) | OB-C §5.1: "value owns the route main and adds no grid CSS" — without it, 18 copies of `.scene-fill` | `.scene-fill` everywhere |
| **G-6** *(defect relay, not a request)* | `@container dock` rules in `dock/styles/density.css` can never match unless the consumer sets `container-name: dock` — verified dead here (demo containerName refs = 0). Default the name on `.glass-dock` or document the requirement | Producer rules gated on an undocumented consumer opt-in | — (demo fix is one line; the relay saves the next consumer) |
| **G-7** *(worker-F's, confirmation not change)* | Publish the chassis narrow threshold (44.9375rem) and stacked order as a stable named contract (token or documented constant) | Demo rehearsal probes must pin the threshold without reading dist bytes; O's U-3 needs a stable referent | dist-byte-reading in every future probe |
| **G-8** *(candidate, probe-gated)* | `overflow: visible` arm on the chassis IF U-4 reproduces: `.instrument-chassis` ships `overflow: clip` while the Picker's corner-breaking HeroBlob ornament and the T-45 carrier (`inset: calc(-2*blur)`) deliberately paint outside their box | Producer clip vs producer-adjacent cures — a consumer override would fork the material recipe | filed only on a reproduced clip; recorded now so it is not discovered as a regression |

---

## 9. FINAL WAVE SPECS — four waves (FORMATION-LAWS template)

**Sequencing rider (A-6): the band executes after MT-APP-1.** Preferred order V·L1 → V·L2 → V·L3 →
V·L4; each COMPLETABLE row states what it delivers alone. All behavioural gates key to
`node docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs` (extended per A-5 — assert
mode; `docScrollable`, `.pane-container` box + gridCols columns; routes += `#/atmosphere`,
`#/palettes`, `#/admin/users`; arms += 320×568, 720×450@2); grep gates are source-scoped,
`node_modules` excluded (L-9). π captures are `git add -f`-ed past `.gitignore:34` (L-7; and the
band itself enters git with the first commit — A-3).

```
WAVE V·L1 — THE BLOCK LAW (the shell stops capping the block axis)
  DEFECT      Mobile cannot scroll; ultrawide is height-capped at 45.4% of the scene band.
              layout-utilization.mjs + geo-probe today:
                390×844  #/     docScrollable=0        (shell.css:23,26 — 100dvh + overflow:hidden)
                3440×1440 #/    pane-container 1049.9×608 (--content-max-h = 608px, the 21/9 arm)
                grep -rc svh demo/ → 0 ; grep -c 100dvh demo/styles/shell.css → 1
  BORN        RED — all four reproduce today (triple-witnessed: geo-probe, MT-F028, App.md).
  SCOPE       demo/styles/shell.css (.app-layout per §6A), demo/styles/foundation.css (delete
              --content-max-h + both aspect @media arms + the --pane-* page-cap roles; --app-gutter
              born, --app-padding-x dies). PLUS the probe extension (A-5). EXACT END STATE:
              .app-layout min-block-size:100svh, no overflow; --content-max-h undefined;
              viewport @media 7→5.
  STRUCTURE   L-8: deleting the token makes "cap the page by viewport aspect" unrepresentable —
              no property left to set. Gates assert the product, not the absence.
  GATES       g1 the adjudicated D-8 gate verbatim: at 390×844, on every member route whose content
                 exceeds the viewport, documentElement.scrollHeight > clientHeight.
                 RED input: today's overflow:hidden → docScrollable=0 on ALL routes.
              g2 getComputedStyle(scene band).maxHeight === 'none' at 3440×1440. RED: 608px.
              g3 scene-band occupied block extent ≥90% at 3440×1440 (16 non-measure-bound).
                 RED: 45.4%.
              g4 grep -c '100dvh' demo/styles/shell.css == 0 AND grep -rc 'svh' demo/ ≥ 1.
                 RED: 1 and 0.
              g5 CSS.supports('overflow-block: auto') recorded — resolves U-1 for V·L4; if false,
                 physical-axis spellings ship and the logical form is BANKED (re-trigger below).
              g6 U-7 decision recorded: dock posture under document scroll (sticky vs in-flow),
                 probed at 390 with a scrolled document, the choice written into shell.css with
                 rationale — never silently.
  π           {390×844, 1440×900, 3440×1440} × {#/, #/blob, #/browse}; selector `.app-layout, main`;
              committed under audit/visual/layout/ (git add -f).
  DELTA       3440: block extent 45.4% → ≥90%. 390: docScrollable 0 → >0 where content exceeds.
  CARRIES     App D-8 → BUILD (the traveling gate discharges here). MT-F028 block-axis half → BUILD.
  BANKS       overflow-block: node -e "…CSS.supports('overflow-block','auto')…" — if false at any
              glass/browser bump re-run and flip the spelling.
  ENV         dev server, WebKit+Chromium. Blind to: build output (MT-F012), real Safari (MT-F025).
  COMPLETABLE YES — alone: mobile gains a scrolling document, ultrawide gains 2.2× block extent,
              the 50/50 grid untouched. Strictly better; closes on its own evidence.

WAVE V·L2 — ONE MOUNT, ONE COLUMN (the breakpoint fork dies)
  DEFECT      A JS breakpoint remounts a different subtree: 13 of 14 routes amputate a region at
              390 (text 69 vs 893 = 7.7% on #/; 0 of 31 sliders on #/blob); crossing the
              breakpoint (including BY ZOOM — D-7) destroys 3 KeepAlive caches + 2 WebGL contexts.
              grep JS breakpoint refs → 37/13 files; PaneSegmentedControl.vue present (52 LoC).
  BORN        RED — App.vue:77/94 v-if fork + :310 useBreakpoint on today's tree.
  SCOPE       (post-MT-APP-1 tree — A-6.) demo/color-picker/App.vue (one mount path; regions[]
              replaces left/right/defaultPaneIndex), demo/shell/{usePaneRouter,useViewManager,
              viewSchema}.ts, DELETE PaneSegmentedControl.vue (canon-retired, OB-C §5.2),
              demo/styles/shell.css ([data-layout] witnesses + wrappers die; **T-45 carrier
              re-seated per §6A/A-1 in the same commit**). Dock Picker|Blob toggle dies here.
  STRUCTURE   L-8: one mount path + one ordered region list — breakpoint-desynchronised liveness,
              pane amputation, and the retired pane selector become unrepresentable. (Registration
              typing is MT-APP-1's, already landed.)
  GATES       g1 parity: per-route rendered text @390 ≥ 0.9 × same route @1440 (ratio, API-less-
                 safe — U-6). RED: 69/893 = 7.7% on #/.
              g2 liveness: /#/generate Regenerate @390 → specimenChanged:true (D-1's reproduction
                 re-used as regression witness — the cure is MT-APP-1's; this wave dissolves the
                 class). RED today: false.
              g3 grep -rcE 'useBreakpoint|isDesktop|isMobile|mobilePaneIndex' demo/ == 0 (layout
                 sites). RED: 37.
              g4 test ! -e demo/shell/PaneSegmentedControl.vue. RED: exists.
              g5 zoom/state survival (D-7): cross 719px container by live resize at #/blob — the
                 WebGL canvas element identity is PRESERVED (no remount). RED today: fork remounts.
              g6 T-45 (A-1): pane-card computed backdrop-filter === 'none' AND a carrier ::before
                 with clip-path exists on every card route. RED input: the wrapper cut without the
                 re-seat (cards regain their own filter; the t33 rim returns).
              g7 viewport @media 5→3 (PaneSegmentedControl.vue:46 dies with the file; shell.css:129
                 dies with the dual grid).
  π           {390×844, 720×450@2 (the MT-F022 #4 arm — CORRECT today, must not regress),
              1440×900} × {#/, #/generate, #/blob}; committed.
  DELTA       #/blob 390: sliders 0→31 (DOM half). #/: text ratio 7.7%→≥90%. App.md's D-2 axis
              bank (right:" count == 0) flips GREEN.
  CARRIES     App D-2 → BUILD (half; V·L3 completes). App D-7 zoom-IA arm → BUILD (g5).
              App D-10 choreography residue → FOLD (physical names/delays die with the axis;
              stagger re-keys by region). ConfigSliderPane D-2 → FOLD (DOM half; composition half
              V·L4). App D-1/D-12/D-13 → NOT CARRIED (MT-APP-1 BUILDs, A-6). App D-4 → NOT CARRIED
              (named so the shell rewrite does not lose it; W19's).
  BANKS       none.
  ENV         as V·L1; behaviour + DOM presence — dev-server-witnessable; no bundle claim.
  COMPLETABLE YES — alone (on the MT-APP-1 tree): every region of every route present in a
              scrolling column at 390; the largest content delta in the program.

WAVE V·L3 — THE INLINE LAW (50/50 → canon ratio; the ultrawide cap dies; the census zeros)
  DEFECT      gridTemplateColumns "512px 512px" at 1440, 2560 AND 3440 (measured) — exact 50/50,
              11.80pp from the nearest legal ratio, hard-capped at 1049.9px → 30.5% width coverage
              (65% union) at 3440; 58 Tailwind responsive prefixes; 4 layout tokens.
  BORN        RED — shell.css:59-77/129-139 + foundation.css:440-442 on today's tree.
  SCOPE       App.vue mounts InstrumentChassis around the region slots; viewSchema.ts +1 field
              per row (proportion: "golden" | "preview-dominant" — a DATA change × 14 rows, NOT 18
              rewrites; interiors stay with W18–W30 per RD-7); shell.css loses .pane-container +
              the last grid-template-columns; the 58 prefixes → 0; U-4 probe (HeroBlob ornament +
              T-45 carrier under chassis overflow:clip) runs BEFORE adoption; if clip amputates,
              G-8 is filed and the interim posture recorded — never a consumer overflow override.
  STRUCTURE   L-8: ratio as a two-member typed producer prop — an illegal ratio is a type error;
              the shell declares no columns, so "one ratio imposed on eleven compositions" (D-3) is
              unrepresentable. Census gates remain (deletion is a count, not a structure).
  GATES       g1 ratio: .instrument-composition columns ∈ {61.8034/38.1966, 66.6667/33.3333} ±0.5px
                 on every two-region route @1440. RED: "512px 512px".
              g2 coverage: ≥90% content-width at 3440×1440 (16 non-measure-bound; probe re-run).
                 RED: 30.5% pane-container / 65% union.
              g3 spend witness (F): stage inline-size @3440 > @1440 on /, /extract, /gradient.
                 RED: equal (512-capped).
              g4 /about: article ∈ [60ch,72ch] @3440 AND zero zero-content companions. RED: About
                 renders as Picker's 50% companion (viewSchema).
              g5 grep viewport @media == 0 (ConsoleRail:323 → pointer:coarse; DockStatusLamp:70 →
                 container-name="dock" + producer rules; animations.css:17 re-homed to a container
                 arm or deleted with its consumer). RED: 3 remain post-V·L2.
              g6 grep -rEo '\b(sm|md|lg|xl|2xl):' demo --include='*.vue' | wc -l == 0. RED: 58.
              g7 grep 'pane-max|pane-min|pane-gap|content-max-h' demo/ == 0. RED: 4 tokens,
                 17 consumers.
  π           {320×568 (U-2 decider), 390×844, 1440×900, 3440×1440} × all member routes + the
              actual-400% in-app-zoom arm (PROPORTION-AUDIT:16; reachable only after V·L1).
  DELTA       3440 #/: stage 1049.9 → ≥3090px; ratio 50/50 → 61.8/38.2. U-2 answered by number.
  CARRIES     App D-3 → BUILD. App D-2 → BUILD (completes V·L2's retirement). MT-F028 inline half +
              census → BUILD.
  BANKS       G-3 comfort-inline re-trigger:
              node -e "process.exit(/--instrument-comfort-inline/.test(require('fs').readFileSync(
              'node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/styles.css',
              'utf8'))?0:1)"
  ENV         as V·L1; grep gates source-scoped (L-9).
  COMPLETABLE YES — alone: every desktop scene converts from arbitrary 50/50 to the binding
              proportion and the ultrawide cap dies. Presumes V·L1 for gate 2's height half —
              stated, not hidden.

WAVE V·L4 — THE PROVING PAIR (/blob + /atmosphere earn their narrow arm)
  DEFECT      /blob's sole purpose unreachable below 1024 (31 rows → 0; sweep: 1024→31, 1000→0);
              inspector 2605/695 = 3.7 screens, maskImage none, no affordance; housed in the
              canon-forbidden Card (ConfigSliderPane.vue:99; OB-C "no settings Card stack").
  BORN        RED — all reproduce today.
  SCOPE       demo/scenes/{blob,atmosphere}/ + ConfigSliderPane.vue (Card + .console-well + local
              row clamp :208-217 + local scroller DELETED; density via the producer's shipped
              style-query seam). Both routes = chassis preview-dominant + the shared
              .scene--persistent-stage arm (§6B). Degraded document-flow posture if G-1/G-2
              unlanded (F's honesty clause) — gates 1 and 3 pass without the asks; gate 2 is the
              arm's own witness.
  STRUCTURE   L-8 partially: one composition for both routes; the divergent narrow behaviours and
              the 0-rows state are unrepresentable. Gate 2 stays a gate ("preview visible while
              row 31 is operated" is a rendered relation, not a type).
  GATES       g1 purpose@390: #/blob — 31 [role=slider] present, all enabled, first slider operable
                 (ArrowRight changes its readout). RED: 0 sliders.
              g2 pin: scroll the LAST inspector row into view @390 — the stage rect intersects the
                 viewport with area > 0. RED: no stage in DOM today; and RED again if V·L2 landed
                 without this arm — which is what makes the arm EARNED. If G-1 unlanded: reported
                 BLOCKED-ON-G-1 with the degraded posture's scroll-to-preview distance recorded —
                 never silently waived (F's two-stage clause, adopted).
              g3 ultrawide: inspector ≥3 row columns @3440 AND scrollHeight ≤ clientHeight.
                 RED: 2605/695.
              g4 grep '<Card' ConfigSliderPane.vue == 0 AND grep 'min-block-size: clamp'
                 ConfigSliderPane.vue == 0. RED: 1 and 1.
              g5 zoom-200 (MT-F022 #4): 720×450@2 — same stacked arm, console present, action
                 region unclipped. RED today.
              g6 atmosphere protective witness: rowCount ≥ 3 @390 must not regress through the
                 recomposition (GREEN today — named protective, the L-3 exception, per F).
  π           {390×844, 720×450@2, 1440×900, 3440×1440} × {#/blob, #/atmosphere} + one
              scrolled-to-last-row frame @390 (the g2 witness); committed.
  DELTA       #/blob 390: sliders 0→31; preview-visible-during-operation false→true.
              #/blob 3440: inspector 3.7 screens → 1.
  CARRIES     ConfigSliderPane D-2 → BUILD (this wave is its cure). ConfigSliderPane D-12 (local
              row clamp) → FOLD. The control-defect rows (spectrum variant, valuetext, contrast)
              → NOT CARRIED — named so the layout wave is not credited with curing them.
  BANKS       G-1: node -e "process.exit(/position:\s*sticky/.test(require('fs').readFileSync(
              'node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/styles.css',
              'utf8'))?0:1)" — on 0, DELETE §6B's arm (6 decls → 0).
              G-2: same file, /overscroll-behavior/ — on 0, delete the demo inspector scroll rules.
  ENV         as V·L1; both routes API-free — fully valid on the dev server. WebKit AND Chromium
              (MT-F022 L-9 corollary). F's U-WebGL probe (lossless canvas resize through container
              reflow) runs in rehearsal BEFORE the wave — expected-GREEN (remount is the harder
              case, survived today), but probed, not assumed.
  COMPLETABLE PARTIALLY-ALONE, stated honestly (O's phrasing kept): gates 3+4+g5 close with no
              other wave; gates 1+2 need V·L2's one mount — if only this wave ran, it closes on
              3/4/5 with 1/2 recorded blocked-with-named-unlock, never green.
```

---

## 10. UNKNOWNS — merged, none papered over

- **U-1** `overflow-block`/`overscroll-behavior-block` support (no browserslist, no Vite target) —
  V·L1 g5 resolves; fallback written; bank armed. (O)
- **U-2** Picker at 320×568 — may earn the persistent-stage arm; V·L3's 320 π arm decides by
  measurement, not argument. (O; F's table said ONE unconditionally — O's honesty adopted.)
- **U-3** The 719px threshold against real value.js content — zero consumers have ever rendered in
  it; the first adopting wave records whether 719 is right for THESE compositions and relays a
  producer ask if not (G-7 gives it a stable referent). Never shadowed locally. (O)
- **U-4** HeroBlob ornament + T-45 carrier under chassis `overflow: clip` — probed BEFORE V·L3
  adoption; G-8 candidate. (O, sharpened by A-1)
- **U-5** Real Safari — every number here is WebKit-via-playwright; safaridriver pends the owner's
  Allow-Remote-Automation toggle (MT-F025). Unmet, not green. (O)
- **U-6** API-less dev server — data-backed absolutes unusable; parity gates are ratios; IL-2 uses
  seeded fixtures and says so; live-data re-witness owed when the API band lands. (both)
- **U-7** Dock posture under document scroll — V·L1 g6 decides with a probe; sticky implies a
  producer z-seat question. (arbiter, A-2)
- **U-8** WebGL canvas resize through container reflow at #/blob — expected-GREEN, probed in V·L4
  rehearsal. (F)

---

## 11. WHAT THE DESIGN COSTS (the owner's "fewer lines" test)

Worker-O's §9 ledger adopted, arbiter-adjusted: 102 adaptation sites → 1 mechanism; viewport
@media 7 → 0; Tailwind responsive prefixes 58 → 0; JS breakpoint refs 37 → 0; layout tokens 4
(+17 consumers) → 1 (`--app-gutter`); `PaneSegmentedControl.vue` −52 LoC; shell.css layout rules
~90 → ~40 (O said ~35; the T-45 re-seat keeps ~5 more — A-1); bespoke mobile compositions: one
implicit whole-grammar → 2 explicit arms sharing 6 declarations (→ 0 on G-1); **new demo
abstractions: 0** — no wrapper components, no shared/ dir, no local chassis clone. Additions in
full: `--app-gutter`, `--rail-row-min`, `container: scene / inline-size`, one `proportion` field
per viewSchema row, and the re-seated T-45 selector.

---

## DISSENT — preserved verbatim (L-14)

1. **Worker-F on the frame law (REFUTED at RD-1, preserved because its two advantages are real —
   the dock stays persistent by construction and `dvh` stays stable — and U-7 exists because of
   it):** "`.app-layout { height: 100dvh; display: grid; grid-template-rows: auto 1fr }` … is the
   ONLY place demo layout reads the viewport. It becomes the root container: `container: frame /
   size`. Its size is definite by construction (viewport-bound grid), so `size` containment has no
   circularity, and `cqb`/block-axis queries become available to every descendant." And: "**Document
   scroll, universally declared.** `.pane-main { overflow-y: auto; overscroll-behavior: contain }`
   at every width. On desktop … the rule is inert; on narrow, the scene flows past the band and the
   §3-law-6 one-document-scroll sequence emerges — no query, no fork." — The arbiter's answer
   stands: the sequence law says *document*-scrolling, and the adjudicated D-8 gate reads
   `documentElement`.
2. **Worker-F on the one-cut wave (REFUTED at RD-3):** "COMPLETABLE yes — if only this wave ever
   lands, the tree has one layout mechanism, full-width ultrawide, content-parity mobile, and
   D-1/D-2/D-3 closed. One session: the cut is large but it is ONE transposition already specified
   by D-2's cure; route interiors are explicitly out of scope." — Against the same-day adjudication
   of that exact shape and the measured 38% rate, refused; the four-wave decomposition delivers the
   same end state with each step closeable alone.
3. **Worker-F on interiors-as-wave (overruled at RD-7, gates preserved as §7 law):** "COMPLETABLE
   yes — each interior is independently landable; even without LG-1 the field/rack declarations
   improve the current tree (they are cap-independent). If only LG-3 ever lands, the interiors are
   elastic and the admin row anatomy is one." — Preserved as a live objection: if the member
   program stalls, F's LG-3 is the correct salvage wave and this document is its spec.
4. **Worker-O's overstatements, corrected on the record:** "58 occurrences / 19 .vue files" — the
   occurrence count is exact; the file count is **28**. "(committed alongside this document so
   every number below is re-runnable — L-9)" — the probe exists and is re-runnable but was NOT
   committed; the whole band is untracked (A-3).
5. **Both workers' shared silence, recorded:** neither design mentioned the T-45 carrier seat
   (A-1), the dock's scroll posture (A-2), or the MT-APP-1 file collision (A-6). Three misses in
   two independent seats is evidence the tri-fold needed its arbiter; they are cured above, not
   celebrated.
