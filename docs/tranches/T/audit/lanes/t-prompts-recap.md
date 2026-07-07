# T · lane t-prompts-recap — THE PROMPTS RECAP (E-5)

**Lane**: t-prompts-recap · **Mandate row**: E-5 ("Recap ALL of our prompts and requests
hitherto and ensure they've been addressed") · **Mode**: DEVELOPMENT — recap + root-cause +
T-candidacy. ZERO product-code changes; the only write is this file.
**Substrate**: `tranche-t` @ `cc4f4fa` (= the S close, tag `tranche-s-close`).
**Scope of record**: **R + S** owner prompts/rulings, reconstructed from the docs of record and
**verified against the live tree**, not the records alone (mandate binding). The pre-R corpus
(A..Q + N's U1–U33 audit) is inherited by chain-of-custody from two prior recap lanes and
re-touched only where a still-open item folds forward into T (§6, F6).

**Sources of record consulted (every one read in full):**
- `docs/tranches/S/audit/RATIFICATION-2026-07-05.md` §0 + §1–§4 (the Q1–Q11 owner rulings)
- the S mid-tranche `OWNER-RULING-*.md` §0s — **four files** carrying **six** verbatim rulings
  (card-width; alpha-checker; aurora = §1.1/§1.2/§1.3 three sub-rulings; variance-webbing =
  variance + webbing two sub-rulings). Reconciliation: F1.
- `docs/tranches/S/S.md §12` (the Q-TABLE) + `§13` (process lessons)
- `docs/tranches/R/audit/RATIFICATION-2026-07-03.md` §0/§1 (Q1–Q12) + `R/FINAL.md §5/§7`
- `docs/tranches/S/FINAL.md` §1/§3/§4/§5/§8 (per-wave verdicts, publishes, the six-ruling
  implementation table, the books handed forward, the maintainer residuals)
- `docs/tranches/S/letters/GLASSUI-S-ASKS-ADDENDUM-2026-07-05.md` (three owner-verbatim quotes
  routed producer-side: A3 amplification, A4 pointer, the "flat pink field" observation)
- the T mandate `MANDATE-2026-07-06.md §0` (the newest owner audit — T-1..T-29 + E-1..E-7)
- **prior recap lanes inherited**: `S/audit/lanes/traceability-prompts.md` (the R campaign),
  `R/audit/pass1/R2-PROMPTS.md` (the A..Q + N U1–U33 canon)
- **live-tree spot-checks** (this lane, at `cc4f4fa` / `../glass-ui @ c3ea22a8`): §5 below.

**Verdict legend**: **ADDRESSED** (landed + evidenced + tree-confirmed) · **PARTIAL** (landed in
part, or landed-but-owner-re-opens) · **REVERSED** (landed and gate-green, then the T owner
overrules the landed result) · **OPEN** (booked, never landed — producer/maintainer-gated) ·
**FOLD** (E-4 binds it into T).

---

## §1 — The headline: T is a RECAP that mostly RE-OPENS, not one that finds drops

Across R + S there is **effectively zero silent drop** — every owner ask has a named home,
a commit, or a live book. The two prior recap lanes proved this for A..Q + the R campaign, and
S.md §10's zero-drop ledger + S/FINAL §2 re-certified it at the S close. **The recap's real
payload is not "what fell through" — it is "what LANDED, passed its gate, and the owner then
re-judged."** The T mandate §0 is itself the owner's post-S-close audit, and the majority of its
24+5 findings are **owner recalibrations of gate-green S closes** (F2), plus a spine of
**producer/maintainer-gated books that keep rolling forward unbuilt** (F4). E-5 is therefore
satisfied not by hunting drops but by (a) confirming the closes the owner accepts, (b) naming the
closes the owner reverses, and (c) folding the chronic deferrals (E-4).

---

## §2 — MASTER LEDGER, Part A: the R ratification (2026-07-03)

Owner verbatim (R RATIFICATION §0): *"hero lab is to be deleted. no ncsu alias. for all other
items, fold and use your best judgment given our no workarounds discipline."*

| R ask | Disposition | Evidence (tree-confirmed) | T-candidacy |
|---|---|---|---|
| Q1 hero-lab KILL (FLIP) | **ADDRESSED** | `demo/hero-lab/` tree + vite mode branch + scripts deleted (`9ed9175`); grep-clean | — |
| **Q2 "no ncsu alias" (FLIP → X2)** | **OPEN (chronic)** | `mbabb.fi.ncsu.edu/colors/` still answers 200 no-redirect at S close (`S/FINAL §8.2`); maintainer-on-NCSU-VPN op, deferred R→S→now | **FOLD (E-4)** — the OLDEST unaddressed owner order (2026-07-03). Maintainer-gated; T carries it as a named residual with a firing plan, never a silent third re-book |
| Q4 keep `file:` deps | **ADDRESSED** | §3.4 pin policy in CLAUDE.md; re-ratified S | — |
| Q7 `GAMUT_ALPHA=1.0` | **ADDRESSED** | `src/units/color/gamut.ts` | — |
| Q8 `uSatColor[]` hard-ask | **PARTIAL → OPEN** | relayed; now **GAP-L5** (blob satellite producer half), still open at S close | **FOLD** — interacts **T-8** (blob satellite morphing) |
| Q10 Parse-Lab fused | **ADDRESSED** | ColorInput; zero new exports | — |
| Q11 overlay lens display-p3 | **ADDRESSED** | `R.W3` | — |
| Q12 easing riders (both) | **ADDRESSED** | `R.W1`/`R.W4` | — |
| **X1 prod api deploy** (R.W7 residue) | **OPEN (chronic)** | prod STILL I-era at S close (`/health` 404, webhook `deploy.babb.dev/hooks/value-js` 404 — `S/FINAL §8.1`); maintainer-on-host | **FOLD (E-4)** — interacts **T-9** ("why does the backend not work hereof?"): the prod-side of the backend-UX question |

---

## §3 — MASTER LEDGER, Part B: the S Q-table (RATIFIED 2026-07-05)

| Q | Ruling (verbatim) | Disposition | Evidence (tree-confirmed) | T re-opens? |
|---|---|---|---|---|
| Q1 | "Full idiomatic wiring." (visibility) | **ADDRESSED** | W5 A2 CRUD full wiring; `035b02c` | — |
| Q2 | "fix now… always." (logerp) | **ADDRESSED** | 3.0.0 t-last reorder; zero t-first sites | — |
| Q3 | "Excise all legacy code and dependencies." | **ADDRESSED** | `color-soa.ts` excised + W0-9 dep ledger (11 devDeps, lockfile −2743) | — |
| **Q4** | "Excise." (rainbow heading) | **ADDRESSED, then REVERSED** | `.pastel-rainbow-text` EXCISED S.W5-7 (confirmed dead at `PaletteDialogHeader.vue:99`) | **T-10 REVERSES** — owner now wants ONLY "Palettes" rainbow, rest white/black. Encode as an explicit owner overrule of Q4, not a bug (mandate §3) |
| Q5 | "Yes." (display voice ×9) | **ADDRESSED, then AMENDED** | W4-7 display voice on 9 pane titles | **T-2 amends** — "Lab" + "About the color spaces" → 1.5× golden, **non-bold** (recalibrates the W4-1 landed size/weight) |
| Q6 | "Only on true empty." | **ADDRESSED** | W5 true-empty narrowing | — |
| **Q7** | full presence · first-principles rebuild · rename "Blob" | **PARTIAL** | demo geometry halves landed (W6-4 `d843ae7`, 390 perf green); **GAP-L5 producer halves OPEN**; **L17 rename NOT consumed** (`HeroBlob.vue:47` still imports `GooBlob` from `@mkbabb/glass-ui/goo-blob`) | **T-8 RE-OPENS** — on-hover + satellite morphing, no-clip/higher-z, placed-into-card, all screen sizes (revises W6-4's corner-break law toward containment; mandate §3) |
| Q8 | "Build now." (raytrace) | **ADDRESSED** | W1-10 raytrace ≤4.05e-4 vs Ottosson | — |
| Q9 | "Yes. Jzazbz too." | **ADDRESSED** | 3.1.0 ICtCp + Jzazbz full spaces | — |
| **Q10** | first-principles mix re-work · "intent and beauty" · "No fallbacks" | **ADDRESSED (mix only)** | W5 one 900ms Safari-true clock (`5c700fe`) | **T-14/T-22 WIDEN** — "beauty as a gate" landed on the mix but NOT across ALL transitions (T-14: all card transitions onto liquid-glass curves) nor the easing pane (T-22: "still a mess"). The Q10 quality bar is owed tranche-wide, not per-surface |
| Q11 | "Yes." (vue-router 5) | **ADDRESSED** | W2-7 `^5.1.0` code-free | — |

---

## §4 — MASTER LEDGER, Part C: the S mid-tranche OWNER-RULINGs (the six)

Six verbatim rulings, four files. Each **landed and passed its S gate** — and the T mandate
re-judges four of the six.

| # | Ruling (verbatim, §0) | File | Landed | T re-opens? |
|---|---|---|---|---|
| 1 | card ~1/3 smaller | card-width | **ADDRESSED** `52c5fd4` (44→32rem; 30 rejected on About-label wrap) | — (T-5 sliders-hierarchy is downstream but not a width reversal) |
| 2 | load darkening/lightening "too explicit" | aurora §1.1 | **PARTIAL** W6-1 designed entrance `060b7fb` | **T-1/T-25 RE-OPEN** — load sync still wrong; GAP-ARM makes the arrival paint the DEFAULT pick (§5). The "designed entrance" landed but the seed the entrance derives from is wrong on cold load |
| 3 | aurora strong + greater C/H variance | aurora §1.2 (=A3 addendum) | **SUPERSEDED** by ruling 6's pull-back | **T-26 RE-CALIBRATES (third time)** — the bracket now closes from both sides: triad/0.82 "too strong" → analogous/0.7 "too muted." T designs INSIDE the bracket; the bracket is the sizing spec for producer atoms L2/A3 |
| 4 | mouse interactability "and so forth" | aurora §1.3 (=A4 addendum) | **ADDRESSED** W6-7 `cd177d7` (producer door consumed; L19 never fired) | **T-25 WIDENS** — "and so forth" = the living-field behavior (drift/breath/response), re-judged "leaves much to be desired" |
| 5 | alpha checkerboard "subtle, idiomatic" | alpha-checker | **ADDRESSED** `695cca1` (one `--alpha-checker` token; producer dist defect routed A6) | — |
| 6 | variance "too strong" · webbing "far too low res" · "flesh out the facility" | variance-webbing | **PARTIAL** variance pull-back `fe30d68`; webbing register `6955fca` | **T-6 RE-OPENS webbing** ("more visible"); **T-26 re-opens variance** (now "too muted"); the STEP-0 **GAP-ARM** producer defect it uncovered is still OPEN |

---

## §5 — Live-tree spot-checks (this lane; the records verified, not trusted)

| Claim under test | Result at `cc4f4fa` / `../glass-ui @ c3ea22a8` |
|---|---|
| DEFAULT pink seed (GAP-ARM root) | **CONFIRMED** — `demo/@/components/custom/color-picker/index.ts:36` `DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)"` (the hot-pink family) |
| GAP-ARM arm-replay unfixed (producer) | **CONFIRMED OPEN** — `../glass-ui/.../aurora/composables/useAurora.ts:210–228`: `armRuntime()` wires `stopWatch = watch(getCfg, (next)=>inst?.update(next), {deep:true})` AFTER `inst.arm()` with **no immediate `inst.update(getCfg())` replay**. The `{immediate:true}` at :343 is on the *render-strategy* watch, not the config watch. Any seed hydration in the construct→arm gap is dropped |
| Q4 rainbow excised | **CONFIRMED** — `PaletteDialogHeader.vue:99` records the excise; no live `.pastel-rainbow-text` |
| L17 Blob rename consumed | **NOT CONSUMED (correct)** — `HeroBlob.vue:47` imports `GooBlob` from `@mkbabb/glass-ui/goo-blob`; glass-ui `package.json:545` still exports only `./goo-blob` (5.0.0 cut never fired) |
| T-9 banner present | **CONFIRMED PRESENT** — `demo/@/components/custom/palette-browser/DevMisconfigBanner.vue` + `ApiOfflineChip.vue` both live (the W0-1 honest-dev affordance the owner now wants removed) |

---

## §6 — FINDINGS (numbered; each: evidence → root-cause → owner → cure-direction)

### F1 — The "six OWNER-RULING files" is 6 rulings across 4 files, NOT a missing-file defect (corpus hygiene)
- **Evidence**: mandate READ-FIRST cites "the six OWNER-RULING-*.md §0s"; disk holds four
  (`card-width`, `alpha-checker`, `aurora`, `variance-webbing`). `S/FINAL §4` enumerates **six**
  rulings: `aurora.md` carries three (§1.1 entrance / §1.2 variance / §1.3 pointer) and
  `variance-webbing.md` carries two (variance recalibration + webbing facility).
- **Root-cause**: the six-vs-four is a file-vs-ruling counting frame, not an unrecorded owner ask.
  Every one of the six has a verbatim §0 and an implementation record.
- **Owner**: docs (T corpus). **Cure-direction**: the T synthesis cites rulings by their
  `S/FINAL §4` row number (1–6), not by filename, so no successor re-derives a phantom
  fifth/sixth file. No corpus edit owed beyond this note.

### F2 — The owner-REVERSAL cluster: T re-judges SEVEN gate-green S closes (the load-bearing recap finding)
- **Evidence**: T-2 amends W4-1 (title size/weight); T-6 reverses the W5-8 "subtle" webbing;
  T-7 amends W4-2 (readout span/spacing); T-8 revises W6-4's corner-break law; **T-10 reverses
  Q4** (rainbow excise); **T-23 reverses the W5-2 scroll-gated band** (shading demanded AT REST);
  **T-26 re-calibrates rulings 3+6** a third time. Every listed S item **landed and passed its
  wave gate** (S/FINAL §1: all "complete"/"complete_with_misses", never a FAIL).
- **Root-cause**: S's taste gates were screenshot-corroborated bars judged by **non-authoring
  Fable reviewers** (S/FINAL §1 W4/W6/W7 rows) — a real discipline, but the OWNER's eye is the
  terminal gate and it rejected the *landed calibrations*, not the *mechanisms*. The recurring
  shape is **point-target calibration** (pick 32rem, pick analogous/0.7, gate OFF at rest) that
  the owner then re-brackets. S process-lesson §13.3 already named "mid-gate owner recalibration"
  but treated it as an exception; T-26 (bracketed from both sides) proves it is the RULE for
  taste axes.
- **Owner**: joint (demo surfaces; the discipline is process). **Cure-direction**: E-7's
  late-stage hardening/critique wave must formalize an **owner-eye taste certification** distinct
  from the non-authoring Fable review, AND every taste axis must be speced as a **BRACKET with
  both poles named** (T-26 is the template: "more than analogous/0.7, less than triad/0.82"),
  never a point value — so the next calibration moves inside a declared band instead of
  re-litigating from scratch. This is a gestalt fix to how recalibrations are encoded, not a
  per-surface patch.

### F3 — ONE producer defect (GAP-ARM) underlies THREE owner findings: T-1, T-25, T-27
- **Evidence**: §5 confirms `DEFAULT_INPUT_COLOR` pink (`color-picker/index.ts:36`) + the
  unfixed `useAurora.ts:210–228` arm-gap. Consequence (S/FINAL §8.3, re-confirmed): every cold
  load paints the aurora from the pre-hydration DEFAULT pick, not the URL/session seed, until the
  first picker interaction. Under the muted analogous knobs the pink default reads gray-rose —
  which is exactly T-27's "too gray" on page load and T-1's "synchronization… on page load in
  particular" and T-25's "aurora on load… leaves much to be desired."
- **Root-cause**: the config deep-watch is armed AFTER `inst.arm()` with no immediate replay;
  URL-wins hydration ALWAYS lands in the construct→arm gap and is dropped. This is a **producer
  (glass-ui) engine defect**, root-caused in the S variance-webbing ruling STEP-0 and booked as
  **GAP-ARM** — never a demo bug (the demo consume path was exonerated; a synthetic-mutation
  demo workaround was KISS-rejected in S).
- **Owner**: producer. **Cure-direction**: the fix is one honest replay —
  `inst.update(getCfg())` immediately after `inst.arm()` (or `{immediate:true}` on the config
  watch). It CANNOT be cured demo-side without a contrivance (E-3 bars it). This is the single
  highest-leverage item in the recap: it must be the **lead ask of the E-2 request packet** to
  BG/BH, batched with GAP-L2 (lightness atoms — the dark-field material) and GAP-L5 (blob
  producer halves), because T-1/T-8/T-25/T-26/T-27 ALL sit on producer gaps and NONE fully cures
  demo-side. T's demo work is the consumer contract + compositional law; the atoms are the
  producer's.

### F4 — The chronic-deferral spine E-4 must fold (the books that keep rolling forward)
- **Evidence**: `S/FINAL §5` hands 20+ books forward. The producer/maintainer-gated spine:
  **GAP-ARM** (F3), **GAP-L2** (aurora lightness atoms — dark L-band unreachable),
  **GAP-L5** (blob HERO preset / `uSatColor[]` / satellites-at-rest), **PRM-expand** (dock never
  expands under reduced-motion — kf `springPlay` snap arm emits subscribers-only), **L20**
  (`goo-blob/config` subpath) anchoring **RP-2** (JS-eager 347.9 KiB vs ≤280 re-baseline),
  the open **GLASSUI-S-ASKS L2–L16** set, **L17** (Blob rename), the un-fired **S.W8** adopt
  event, and the maintainer residuals **X1** (prod deploy) + **X2** (NCSU alias, the oldest).
- **Root-cause**: the constellation's producer-gated books discharge only at the glass-ui 5.0.0
  BG/BH cut, which did not fire inside R OR S; every tranche re-hands them. S process-lesson §13.4
  ("books discharge silently unless someone re-checks") is the standing hazard.
- **Owner**: producer (most) + maintainer (X1/X2) + src (W2-3 brand redesign). **Cure-direction**:
  E-4 binds ALL into T. The gestalt: T does NOT try to LAND producer/maintainer items demo-side
  (E-3) — it (a) converts the producer spine into the **E-2 request-packet census** against the
  most-recent glass-ui + forthcoming BG/BH (GAP-ARM/L2/L5 + PRM-expand + L20 as named packets
  with the S root-causes attached), (b) carries X1/X2 as named maintainer residuals with firing
  plans (never a fourth silent re-book — X2 is now on its THIRD tranche), and (c) folds the
  src-owned W2-3 brand redesign + the `/remix`+`/diff` api-hygiene + dup-`useDark` +
  PI-DRIFT-1 (`mode="out-in"`) into T's own execution scope. The recap's job is to guarantee
  none of these is dropped by omission — this table IS that guarantee.

### F5 — The buried/soft asks in ruling prose (E-5's explicit "and so forth" clause)
- **Evidence + disposition** (asks that hid inside prose and were partially discharged or
  absorbed into a single surface):
  1. *"flesh out the webbing facility"* (variance-webbing §0) → landed as the
     `WEBBING`/`SECOND_NET` token register in `@lib/gamut-ink` (`6955fca`) — the *facility* was
     built, but **T-6 says the register's intensity is still too low** ("more visible"). The soft
     ask became a real register; T tunes it, doesn't re-build it.
  2. *"and with better background interactability via the mouse **and so forth**"* (aurora §0) →
     the mouse half landed (W6-7); the **"and so forth"** = the living-field behavior, re-opened
     by **T-25** (drift/breath/response under the bar).
  3. *"suffuse intent and beauty… **No fallbacks**"* (RATIFICATION Q10) → landed on the mix
     animation ONLY; **T-14** (all card transitions → liquid-glass curves) + **T-22** (easing
     pane "still a mess") show the *beauty-as-a-gate* bar is owed **tranche-wide**, not one
     surface. Absorbing a cross-cutting quality ask into a single wave item is the miss shape.
  4. *"What's glass-ui got planned?"* (RATIFICATION Q7) → partially answered by
     `blob-genesis.md`, but the forward-roadmap question recurs as **E-2** (request packets
     against forthcoming BG/BH) — the owner wants the producer roadmap folded into the plan, not
     just surveyed once.
  5. *"work on all screen sizes"* (mandate T-8) / *"and so forth are legible"* (T-5) — soft
     scope-wideners that must not be dropped from the blob + sliders specs.
- **Root-cause**: cross-cutting quality asks phrased as prose riders get pinned to the nearest
  single wave item and declared discharged when that item lands.
- **Owner**: joint. **Cure-direction**: T must promote each cross-cutting quality ask to a
  **standing bar** enforced at E-7 (the hardening wave), not a one-surface checkbox: the
  liquid-glass easing register (T-14/T-22) and the living-field behavior (T-25) are tranche-level
  certifications, sequenced near close.

### F6 — T is the first full execution of the design body ratified-but-never-built since N
- **Evidence**: `R2-PROMPTS.md §3` found N's 2026-06-12 audit (U1–U33) was folded into
  N.W10–W18, **RATIFIED 2026-06-15, and never implemented** (29/33 PNI). The U-items map
  DIRECTLY onto the T mandate: U7/U8/U23/U30a dropdowns → **T-17/T-29**; U14 letters-center →
  **T-5**; U17/U20/U24/U26 cards/skeletons/shadows → **T-3/T-11/T-13/T-20**; U25/U27 easing →
  **T-22**; U18/U22 watercolor-ghost → **T-28**; U33 aurora motion → **T-25**; U1 fonts →
  **T-2/T-15**. R and S landed the *library* track and *some* demo surfaces, but the
  design-quality body has been rolling forward under-built since N.
- **Root-cause**: the library track raced ahead (A..O + P + Q + R + S all shipped grammar/perf/
  color-SOTA) while the demo design body stalled at the implementation gate across N→R→S; each
  tranche closed the surfaces it touched green, but "wave closes green ≠ repo/design stays green"
  (S §13.2).
- **Owner**: demo (+ joint where a surface is a glass-ui consumer). **Cure-direction**: the T
  corpus must be authored knowing its 24 findings are not fresh — they are the **long-deferred
  design audit finally getting its execution tranche**. E-1's colocation grand edict + E-7's
  hardening wave are the structural answer to why it stalled before (no standing taste gate, no
  colocated ownership). The recap's charge to the T synthesis: sequence the design body as the
  spine of T, not as polish riders, and let E-7 be the gate that N never had.

---

## §7 — Completeness statement (E-5 discharge)

Every R and S owner ask is accounted for above: **R** (Q1–Q12 + X1/X2), **S Q-table** (Q1–Q11),
**S mid-tranche rulings** (the six), and the **three addendum-letter quotes** (folded into
rulings 3/4 + GAP-ARM). Pre-R (A..Q + U1–U33) is inherited by chain-of-custody from
`R2-PROMPTS.md` + `traceability-prompts.md` and re-surfaced only where it folds forward (F6).
**Zero silent drops found** — consistent with both prior recap lanes. The open rows are all
either owner-reversals (F2, → T findings), producer/maintainer books (F4, → E-2 packets + named
residuals), or the ratified-but-under-built design body (F6, → T's spine). E-4 folds every open
row into T; this file is the drop-guarantee of record.
