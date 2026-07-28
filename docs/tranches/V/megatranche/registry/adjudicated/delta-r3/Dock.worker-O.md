# Dock — r3 DELTA adjudication (worker-O seat, merge-ready)

**Model receipt (L-11)**: `claude-opus-5[1m]` — Opus 5, 1M-context variant, observed in this seat's own
runtime, declared at spawn, not inherited from a harness label.

**Seat**: worker-O of the M-12 tri-fold. This document is the **merge-ready delta section** for the
arbiter, NOT an in-place rewrite of `registry/adjudicated/Dock.md`. Rationale, stated so it is not
mistaken for non-compliance: the brief asks for a merge in place, but L-14 gives the agglomeration to
arbiter-F, and worker-F is executing the same brief concurrently — an in-place write by either worker
races the other and pre-empts the arbiter. The prior apotheosis is therefore left byte-intact; every
section below is written to be transplanted verbatim (§1 tallies, §DELTA overturns, §3 wave).

**HEAD at adjudication**: `66f3ca89`. **Source drift since the r2 apotheosis (`9bcd5d91`): ZERO** —
`git diff --stat 9bcd5d91 HEAD -- demo/ src/ test/ e2e/` is empty. Every r2 line anchor still resolves,
and every r2 gate was re-run by me today (below). Prior rulings therefore stand on unchanged ground;
nothing in this delta is an artifact of a moved tree.

**Method**: refutation-first. Every fresh row was re-derived by me before it was believed — 4 static
censuses, 1 TypeScript-free source trace, and ONE chromium probe run (`wo-dock-probe.mjs`, 8 arms,
4 viewports × 2 schemes) written without reading any challenger probe. Where my numbers differ from a
challenger's, mine are stated and the difference is recorded rather than smoothed.

---

## 0 · The corpus, counted honestly (L-9 scope discipline)

The brief names "30 accusations (7 BLOCKER)". Scoped to source, the r3 shell band returned **58 rows
across six Dock.vue-subject seats**: seat `af080d64` (D3-01..D3-11, 11) · `ab862155` (L-35..L-39 +
3 blind replications, 8) · `a1d2b8ed` (L-30..L-34, L-30b, 6) · `ae695a68` (D2-01..D2-16, 16) ·
`a9653130` (C-23..C-30, 9) · `a2f18a6f` (C-31..C-38, 8). The 30/7 figure is exactly the union of the
three seats `a1d2b8ed`+`ae695a68`+`ab862155`; the D3-\* and C-\* seats the brief also names by row are
outside it. **I adjudicated all 58.** After identity-collapse (L-5: aliases are one row) the 58 rows
are **34 distinct claims**, of which **9 have a pre-existing owner** and are not re-booked.

**Headline (transplant into §1)**: r2 corpus 7 rows (5 CONFIRMED / 2 RESCOPED, unchanged) **+ r3 delta
34 distinct claims: 24 CONFIRMED · 3 REFUTED · 6 RESCOPED · 1 GLASS-OWNED · 0 UNVERIFIABLE-HERE at the
claim level** (three sub-arms are UNVERIFIABLE-HERE and are labeled where they sit). Combined ledger:
**29 CONFIRMED · 3 REFUTED · 8 RESCOPED · 1 GLASS-OWNED**.

---

## 1 · The r2 rulings, re-tested today (none overturned)

| r2 row | r2 verdict | My re-test at `66f3ca89` | Status |
|---|---|---|---|
| **L-18** chrome ink probe dead | CONFIRMED | `.glass-dock` computed `background-color` = `rgba(0, 0, 0, 0)` in **both** schemes (my arm B); plate paints `color(srgb 0.931227 0.845921 0.816039 / 0.5392)` light, `… / 0.5776` dark — matching both r2 workers' cells to four decimals. `grep -c 'case "chrome"' ink.ts` = 1, `querySelector<HTMLElement>(".glass-dock")` = 1. | **STANDS** (3rd independent confirmation) |
| **L-19** admin gold latch | CONFIRMED | Cold, fresh-context deep links: `/#/blob` gold=1, `/#/atmosphere` gold=1, `/#/admin/users` gold=1, `/#/` gold=0, `/#/gradient` gold=0 (my arm H). `useDockAdminMode.ts:55-59` still has no falsifying arm. | **STANDS** (3rd confirmation) — and see **DELTA-2**, which shows the r2 CURE TEXT is insufficient |
| **L-20** crossfade one-frame cut | CONFIRMED | `grep -c '<DockCrossfade'` = **0**; `grep -cE 'useLayerTransition\|SUB_LAYER_CROSSFADE_MS'` = **5**; `void opts.` = **1** (:67). | **STANDS**, gates still RED |
| **L-21** no document H1 | RESCOPED → MT-APP-1 | `document.querySelectorAll('h1').length` = **0** on all five routes I loaded. | **STANDS** |
| **L-22** tsconfig paths drift | RESCOPED → W-HYGIENE | Not re-litigated; the r3 corpus corroborates it twice more (seat `ab862155` negative-proof (2), seat `a1d2b8ed` negative-proof (1) with its own `--traceResolution` run). | **STANDS**, now at 6 confirmations |
| **L-6** shell imports identity from a feature | CONFIRMED | `grep -rnE "from ['\"](\.\./)+palettes/" demo/shell/ \| grep -v 'import type' \| wc -l` = **5**. | **STANDS** (4th confirmation) |
| **L-7** nameless send button | FOLD → MT-COLORINPUT-1 | Nameless-button census inside `nav.dock-band`: **exactly 1** at 1440×900 (`.send-btn.btn-interactive`, 24×24, `visibility: hidden`), **0** at 390/720/1024. | **STANDS**, still folded, NOT re-booked |

---

## 2 · DELTA section — overturns and amendments (E-3: appended, never rewriting the r2 record)

### DELTA-1 — the r2 seam ruling on the null-ref cure is OVERTURNED as to SCOPE and CURE SHAPE
**What r2 ruled**: G-I carried ColorInput-adj D-13's mobile-reachability gate as a *dock-side witness*
and stated "the null-ref CURE lands in MT-APP-1 (bindPane on all three PaneSlot sites)".
**What overturns it**: five r3 seats, independently, measured that the defect is not a
mobile-colour-entry reachability question but the dock's entire capability channel.
My own re-derivation, no browser needed: `demo/color-picker/App.vue:83-93` (mobile `<PaneSlot>`) passes
**no** `:on-mount`, while `:105` and `:131` do; `:323-332` are the sole writers of
`colorPickerRef`/`generatePaneRef`/`gradientPaneRef`/`mixPaneRef`; `usePaneRouter.ts:196,197,198,208,
209,210,220,221,222` are **nine** dock actions each of the form `paneRefs.<view>.value?.<cmd>?.()`;
`App.vue:38` is `:action-bar="colorPickerRef?.actionBarContext ?? null"`. And the terminal case:
`grep -rn "onStartEdit" demo/` outside ColorPicker returns **exactly one** call site —
`usePaletteWiring.ts:117`, inside `whenColorPickerReady`, which polls the permanently-null
`colorPickerRef` 40 × 50 ms and `console.warn`s (`:37`, `:49-53`, `:55`). Therefore `editTarget` can
never become non-null on mobile, therefore `Dock.vue:72 mobileEditActive = !isDesktop && !!editTarget`
is permanently false, therefore the entire `mobile-edit` DockLayer (`Dock.vue:135-145`) is **dead code
in the only grammar it renders in**. Live corroboration (mine): action-region census on `/#/` —
Copy color / Random color / Open color input all **false** at 390, 720 and 1024×1366, all **true** at
1440; dock faces 3 on mobile vs 4 on desktop.
**Ruling**: `bindPane on all three PaneSlot sites` is a **masking fix** — it binds the ref channel on
mobile and leaves "an action that can be absent is present-and-inert" fully representable, in direct
conflict with L-8 and the owner's no-masking-fallback edict. The cure shape is **upgraded** to the
provide/inject command registry that BOTH corpora independently proposed, and its home moves **here**,
because the dock is the consumer whose dependency inverts. MT-APP-1 keeps its own identity for the
boot/H1 rows, untouched. **G-I is DISCHARGED by the stronger G-J** (below) and does not travel on.

### DELTA-2 — the r2 wave's structure (b) is AMENDED: derivation alone does not cure the blank label
**New row `C-3-WIDENED`, measured by me in fresh contexts**: the product's primary navigation control
renders **with no name at all** on `/#/blob`, `/#/atmosphere` and `/#/admin/users` for any
unauthenticated visitor (`triggerText: ""`), and on `#/blob` the open listbox offers seven views none
of which is the current one, so nothing carries `aria-selected`. Mechanism, source-certain:
`useDockAdminMode.ts:34-39` returns `adminViews` only when `isAdminMode && isAdminAuthenticated`;
`userViews` (:26) omits atmosphere, blob and all five `admin-*`; `DockViewSelect.vue:52` feeds that set
as the controlled `:model-value="currentView"`, so `<SelectValue/>` (:87) resolves nothing. **This is
7 of 14 views.** The r2 cure text — "`viewEntries` filtering VIEW_MAP by group" — would leave the
option set *still* excluding blob for a user, so the blank label **survives the r2 cure**. Amendment:
the option set is `VIEW_MAP` filtered by group **unioned unconditionally with the current view**, and
the trigger's rendered name is asserted equal to `VIEW_MAP[currentView].label` on all fourteen routes
(gate G-K). Recorded as an amendment, not an overturn: the r2 verdict on L-19 is untouched.

### DELTA-3 — the r2 corpus's "the wax seal has never been observed rendering" is OVERTURNED
Measured by me at 1440×900: after **9 s with the pointer never entering the page**, the dock is
`glass-dock … expanded`, 471×62. After a single pointer-in/pointer-out cycle and 7 s, it is
`glass-dock … collapsed`, **56×56, `.dock-seal` present**. The seal renders; its gate is *pointer
history*, not elapsed time (`Dock.vue:132 :collapse-delay="5000"`, `:always-expanded="!isDesktop"`).
This overturns a factual claim carried by two earlier rounds (r2 D-22) but **overturns no ruling in
`Dock.md`**, which never adopted it. Consequence recorded rather than re-booked as a defect: the dock
has two resting geometries for one idle page selected by input device, the tranche has never committed
a π frame of the collapsed rest, and the collapsed rest's keyboard reachability was **not** measured
this pass (declared, not assumed).

### DELTA-4 — one r3 BLOCKER framing is REFUTED outright
`D3-01`'s "the retired `PaneSegmentedControl` is painted directly on top of the Tools control" does not
survive contact. My measurement reproduces the challenger's *observation* exactly —
`document.elementFromPoint()` at the Tools button's own centre returns
`DIV.segmented-indicator…` at 390, 720 and 1024×1366, and at 1024×1366 the panes box (x 398.4 w 141.1)
covers the tools box (x 409.4 w 100.8) 100% — but the *mechanism* is the opposite of "painted over":
`.action-bar-toggle-slot` computes `grid-template-columns: 0px`, `opacity: 0`, rect width **0**, and
`.action-bar-toggle-inner` carries `overflow: hidden` (ActionBarToggle.vue:131; the release rule at
:143 requires `is-visible.is-settled`, absent). The Tools control's border box overflows a zero-width
clip: it is **not painted, not hit-testable, and `tabindex="-1"`** (measured on all three mobile
viewports). Nothing occludes anything; a clipped element simply still reports a bounding rect. The
BLOCKER's substance lives entirely in its other half (capability absence → DELTA-1) and in the W47
carry (PaneSegmentedControl 1→0, already booked — `CARRY-LEDGER.md:22`, canon
`VISUAL-CONSTITUTION.md:89`). **STRUCK AND UNCITABLE**: "painted on top", "two siblings laid out on top
of each other", "100% overlap of a live control". Residual kept at MINOR: a zero-width presence slot
whose child overflows its clip produces a phantom rect over a live control — a hazard to every
hit-test-based probe this formation runs (it manufactured this BLOCKER), and a live defect the day the
clip is removed.

### DELTA-5 — a second r3 row is REFUTED on its mechanism
`D3-11` claims the `forced-colors-desktop` matrix is "a green row for an unrun test" because "WebKit
does not emulate `forced-colors`". **Falsified by my own two-engine cell**: Playwright 1.60 with
`forcedColors: "active"` yields `matchMedia("(forced-colors: active)").matches === true` in **both**
webkit and chromium. The media query fires, so `foundation.css:678`'s `@media (forced-colors: active)`
block and `GradientStopEditor.vue:353` **did** apply. The correct residual — recorded, not booked as
this row — is narrower: emulating the query is not the same as a UA forcing a system palette, so the
capture evidences the app's own forced-colors CSS and nothing more. Any claim of the form "verified
under forced colors" must say which of the two it means.

### DELTA-6 — the r1 Safari-keyboard BLOCKER is REFUTED (I accept `D2-12`'s correction)
`states.mjs:7-9` documents the mechanism in the harness itself: macOS ships Full Keyboard Access OFF,
playwright-webkit inherits it, so bare `<button>` leaves the sequential focus order on every site.
My chromium cell finds all four dock controls in the tab order in visual order. Per **I-20** this says
nothing about real Safari 26.4, and nothing here claims it does. The **underlying** observation
survives at its own severity and is filed as `D3-03` below.

### DELTA-7 — the corpus's own visual witnesses do not exist (L-7)
`git ls-files docs/tranches/V/megatranche/audit/visual/shots/` → **0**. The three frames cited by name
in `D3-01`/`D3-06`/`D3-07` (`collision-1024x1366.png`, `state-mobilemenu.png`, `state-tools-desktop.png`)
are ignored by `megatranche/.gitignore:10` (`audit/components/**/*.png`). That ignore is deliberate
policy — but the policy's own escape clause is **"every cited shot's sha256 is recorded in the
committed registry docs"**, and `grep -rn "sha256" audit/components/shell-dock-dock/*.md` returns
**nothing**. So every visual-only claim in this corpus is, today, uncorroborable by any future reader.
Rows whose evidence is *only* such a frame are marked UNVERIFIABLE-HERE below rather than adopted, and
the wave carries a gate that closes the hole (G-Q).

---

## 3 · The delta rows (34 distinct claims; aliases collapsed, ids preserved for life)

Full verdicts, mechanisms and the deciding evidence are carried in this seat's structured return
(`verdicts[]`), one entry per claim, and are not duplicated here. The summary map:

**CONFIRMED — BUILD in this wave (12)**: `L-35`≡`L-1`≡`D2-01`≡`D2-02`≡`D3-01`(capability) [command
registry] · `C-3-WIDENED` [blank navigation] · `L-30`≡`C-23` [silent login] · `C-31` [focus revoked] ·
`C-33`≡`D2-04` [22px targets + unnamed input] · `L-31`≡`C-24` [dead PaletteSlugBar owns the error
channel] · `C-32` [backdrop sampler never succeeded] · `D2-03`≡`D3-04` [three responsive predicates] ·
`C-34` [layer machine silent to AT] · `D2-16` [no selected-state marking] · `C-35`≡`C-26` [write-only
refs, focus never handed over, unrelayed fork] · `L-34` [the admin partition's third home].

**CONFIRMED — smaller rows folded into the same wave's commits (10)**: `D2-06` (dark accent chroma
0.188→0.021, `--accent-view` ≡ `--accent-live` on the default route) · `D2-08` (3 visible dividers /
4 seats) · `D2-09` (five rungs + a comment that states a false measurement) · `D2-10` (Δx +81.2 px,
Δw −162.5 px, unanimated) · `D2-11` (`grid-template-columns` is the one layout-animated transition) ·
`D2-13` (inactive-layer text in `nav.innerText`, incl. a bare `→`) · `D2-15` (two ref idioms, two
`?? null` computeds) · `D3-07` (the action-bar layer evicts the dock's navigation identity) · `D3-09`
(dual import path + the tree's only runtime cycle) · `D3-10` (two-root SFC; the lamp is band chrome).

**CONFIRMED — latent / test-truth, no user-visible arm today (5)**: `C-25` (non-immediate holds) ·
`C-28` (`slotLive` early return; the invariant is held by a `transitionend` side channel) · `C-27`
(six uncancelled rAF/timer handles beside the correct idiom one directory away) · `C-36` (zero tests
ever open the slug layer) · `C-29` (the e2e suite asserts supplied `aria-label`s, never rendered names).

**RESCOPED (6)**: `D3-01`(retirement half) → W47's booked `PaneSegmentedControl 1→0` · `D3-02` →
design decision + the never-captured π frame · `D3-05` → producer hit-seat ask (26–32 px clears WCAG
2.5.8's 24 px AA floor; the 44 px figure is PROPORTION-AUDIT canon, not WCAG) · `D3-06` → boundary half
CONFIRMED (`MobileMenuDropdown.vue:9-12` composes from `demo/ui/dropdown-menu`), visual halves
UNVERIFIABLE-HERE (DELTA-7) · `D2-07` → MINOR (mechanism bidi-certain, no RTL locale ships) · `C-38` →
labeled hypothesis, sequencing note for C-32.

**RESCOPED out of this component (7)**: `L-23` (dead eslint globs — only the shell→palettes guard
enters here; rest → W-HYGIENE) · `L-36` (18 root-barrel imports, exactly measured) · `L-37`
(the library suite greps three demo SFCs by `process.cwd()`) · `L-38` (14 live `:deep()`; DESIGN.md:381
false — PaletteCard's two hits are **comments**, so the challenger's census beat mine) · `L-32` (test
homes) · `L-33` (palettes export dual home) · `C-30` (this corpus's own report banner advertises eight
findings the file does not contain).

**GLASS-OWNED (1)**: `D3-03` roving-focus rail — `VISUAL-CONSTITUTION.md:129` names the Dock, and the
behaviour belongs to `GlassDock`/`DockLayerGroup`. Relay ask + bank; **no keydown handler may be
grafted into `Dock.vue`** (design-system-first edict).

**REFUTED (3)**: `D3-01`(collision framing) · `D3-11`(forced-colors mechanism) · the r1
Safari-keyboard BLOCKER via `D2-12`.

**NOT RE-BOOKED (9, pre-existing owners)**: `D3-08`≡`D2-05` → MT-COLORINPUT-1 (D-3 ≡ MT-F005 ≡ L-7) ·
`L-6`(replicated) → r2 L-6 · `L-30b` parts → their identities · `L-39` → rides the same commit as the
command registry · `C-37` → negative proofs, kept as the regression floor.

---

## 4 · Instrument notes for the arbiter

1. **The clipped-rect trap.** `getBoundingClientRect()` on a child of a zero-width `overflow:hidden`
   box returns the child's *unclipped* border box. Any probe that infers overlap from rects, or hit
   ownership from `elementFromPoint` alone, will manufacture a collision (it did — DELTA-4). Read the
   ancestor's computed `overflow` and the slot's `grid-template-columns` before believing either.
2. **Two engines, one question.** Whether a matrix "ran" is decided by asking the engine, not by
   looking at the picture: `matchMedia("(forced-colors: active)").matches` settled D3-11 in ten
   seconds and refuted a filed INFO row.
3. **Dead-path proof by single-writer trace.** `mobile-edit` was proven dead with three greps and no
   browser: one setter (`ColorPicker.setEditTarget`), one caller of the exposing method
   (`usePaletteWiring.ts:117`), one writer of the ref it polls (`onDesktopLeftMount`). A live probe can
   only ever say "I did not observe it"; the trace says "it cannot occur".
4. **API-LESS is not a finding, except when the finding is about failure.** The dev server's absent API
   is what makes the login *fail*; the defect is that the failure is **silent**, and that half is
   statically certain (un-awaited call · `slugBarRef` bound by nothing · `slugError` rendered nowhere).
   Stated so no close can be accused of citing an environment fact as a defect.
