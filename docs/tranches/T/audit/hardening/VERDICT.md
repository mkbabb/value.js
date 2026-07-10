# VERDICT — the T hardening fleet synthesized (31 lanes)

**Lane**: verdict-synthesizer (Fable) · **Substrate**: `tranche-t` @ `ec6ab46` (docs-only above
`tranche-s-close`; `git diff tranche-s-close..HEAD -- src/ demo/ api/` = empty — the product tree is
byte-identical to the S close; every hardening lane re-confirmed this independently).
**Inputs**: all 31 `docs/tranches/T/audit/hardening/h-*.md` lane artefacts, read whole; plus one
independent re-run of the tool-artefact grep across the corpus (which found a NEW seam — see §1.2).
**This file is the fleet's single verdict**: §1 integrity ruling · §2 the consolidated MUSTFIX
work-list (deduped: 40 raw → **34**) · §3 the SHOULDFIX list (102 raw → **≈90** consolidated) ·
§4 the Q-table delta the owner re-rules · §5 dissents · §6 the h-gaps disposition. ZERO corpus/product
edits — the amend pass owns every fold below.

---

## §1 — CORPUS INTEGRITY VERDICT: **SOUND-WITH-AMENDMENTS**

The owner's charge was interruption damage — six session-limit walls, every recovery a suspect seam.
The fleet's answer, evidence first:

### §1.1 The interruption damage proper is NARROW, and it is now fully mapped

The seam-audit lanes (h-seam-fleet-resume · h-seam-charter · h-seam-plan-audit-2 · h-seam-s-state)
re-verified the recovered artefacts claim-by-claim against the live tree and the S commits. What the
six walls actually broke:

1. **Committed tool-call XML in the corpus body** — `t-deferred-census.md:257-258` and
   `t-precepts-recap.md:468-469` (`</content>`/`</invoke>` tails of the authoring Write call), the
   smoking-gun partial-completion signature. **This synthesis found a THIRD**: `h-precepts.md:226-227`
   — the hardening fleet itself shipped the same class while auditing for it, proving the class is
   ACTIVE, not historical (→ M-1).
2. **One frozen-substrate false claim** — `t-plan-audit-2.md` declares its companion
   `t-plan-audit-1.md` "NOT present / do not cite as extant" when it was landed at `385c2d2`, the
   parent of plan-audit-2's own completion commit (h-seam-plan-audit-2 SF-1).
3. **One inflated recovery self-audit** — the PP-14 completion claimed "R-ledger verbatim-diffed,
   found faithful" while the partial already carried the §2.7→D9 silent substitution a byte-diff
   would flag (h-seam-charter F2).
4. **Count drift across sessions** — the `proof:*` script count cited three ways (11/12/13; truth 12)
   across five lanes, two self-contradictory; "32 agents" (verbatim law) vs "36-lane fleet" vs "37
   lane docs" unreconciled; the known-stale "e2e 5-project" copied into both close gates while W0-4
   is chartered to fix it to 6.
5. **A two-batch authoring fingerprint** — the wave-doc status line splits vocabulary exactly at the
   W4/W5 boundary (h-synthesis-corpus-diff N-2).

That is the complete interruption-damage inventory. **No fabricated evidence, no truncated section,
no lost content was found anywhere** — h-seam-fleet-resume spot-verified 40+ file:line claims (all
exact); h-seam-s-state verified all 11 R-rows + 5 named amends against the actual S commits via
`git log -S` (all faithful, including the post-recovery W5-8/`fe30d68` states — the exact stale-
picture hazard the charge feared, CLEARED); h-seam-charter proved §12 byte-identical to SYNTHESIS §8
and all 23 S books present; h-books-folds proved the 23-book routing lossless; h-synthesis-corpus-diff
proved zero dropped wave items and all 13 AMENDED-AT-PASS-2 amendments present; the evidence lanes
(h-evidence-design-1/-2, h-evidence-censuses on 2 of 5, h-evidence-sweeps) reproduced the measured
corpus to the digit — including the linchpins (sliders dark 1.01:1 at ground `(118,86,84)`;
tabular-nums no-op 59.19/79.87/86.76; blob bead `(695,197)` live on real GPU).

### §1.2 The larger amendment load is AUTHORING debt, not interruption damage

The 34 MUSTFIX below cluster in the ratification/encoding layer (owner-word re-cuts settled silently
against the corpus's own lesson-15; a bundled Q row burying the owner's own number), the
governing-spec layer (literal placeholders like `>x`, a "verbatim" adoption that rewrites its source,
an ink floor the corpus itself calls "a named threshold" and never names), and the wave-mechanics
layer (one genuine same-round two-writer collision; file-bounds self-contradictions; a close-gate
mis-cite). These would exist without a single wall. They are exactly what a hardening fleet is for,
and none reverses a doctrine: **not one re-measured number changed a doctrine or a Q** (h-evidence-
design-1: 0 MUSTFIX), and the retirement ledger, the books, the packets' contents, and the DAG core
all verified sound.

**Ruling**: the corpus is NOT compromised — its substance survived the six walls intact and its
evidence layer is unusually trustworthy. It is also not clean: 34 consolidated MUSTFIX must fold
before the §12 ratification is put to the owner (cluster B below changes what the owner rules on)
and before any wave dispatches (clusters C–H block cold execution). **SOUND-WITH-AMENDMENTS.**

---

## §2 — THE CONSOLIDATED MUSTFIX WORK-LIST (34; deduped from 40 raw; ordered by fold priority)

Order rationale: A = immediate hygiene (minutes); B = the ratification gate itself (must precede the
owner's ruling); C–E = governing-spec + oracle repairs (must precede the waves they govern); F–H =
close-gate, census, and process repairs (before W0 dispatch).

### Cluster A — corpus-body corruption (immediate)

- **M-1 · Strip the committed tool-call XML — THREE files — and mint the standing grep.**
  Locations: `audit/lanes/t-deferred-census.md:257-258` · `audit/lanes/t-precepts-recap.md:468-469`
  · **`audit/hardening/h-precepts.md:226-227`** (new, found by this synthesis — the class is active).
  Amendment: delete the 2 trailing lines in each (no content lost); add the tool-artefact grep
  `grep -rnE '</?(content|invoke|parameter|antml)'` to every wave's §Format+lint cadence as a
  must-be-empty pre-commit step (h-exec-recovery F4 — `git diff --check` cannot see this class).
  [h-seam-fleet-resume F1/F2 + h-exec-recovery F4 + verdict-synthesis]

### Cluster B — the ratification gate (fold BEFORE the owner rules; see §4 for the net Q delta)

- **M-2 · Split Q11 into Q11a/Q11b.** `T.md:523` = `SYNTHESIS.md:582`. Q11 bundles the ×φ SIZE
  re-cut of the owner's explicit "1.5×" (governing titles AND readout; T-2 has no row of its own)
  with the readout line-lock levers — one answer forced across two axes. Amendment: Q11a = the ×φ
  size reading (default ×φ; alts literal ×1.5 / √φ); Q11b = the levers (default 1+2+lab-lever 3;
  alts blanket-2-line / fit-down). [h-q-table F1]
- **M-3 · Re-cut Q5's DEFAULT cell.** `T.md:517` = `SYNTHESIS.md:576`. The default recommends the
  C3-motivated data-strip chip AGAINST the owner's literal "Only Palettes should be rainbow", on an
  un-ratified law, and the chip may not even read as rainbow (5 saved blues render 5 blues).
  Amendment: the owner-verbatim guarded letterform ramp presented FIRST/co-equal in the DEFAULT cell;
  the chip named as the C3 re-cut the owner may decline; keep the contrast guard either way.
  [h-q-table F2; content half F-8 → §3]
- **M-4 · Surface the blob z re-cut — add Q3b; restore "for ratification" to D8.**
  `SYNTHESIS.md:209` = `T.md:193` (D8); source `t-blob-hero.md:139-142`, which wrote "Interpretation
  note FOR RATIFICATION" — the synthesis lifted the conclusion and struck the ask (a lesson-15
  violation, `T.md:490`). Amendment: Q3b — "'higher z than all' = content-stack top, chrome above
  (DEFAULT; immaterial under the flush seat) vs true top-of-all"; D8's clause marked provisional.
  [h-mandate-trace H-1 ≡ h-q-table F3(a) ≡ h-owner-words F2.2 — one defect, three lanes]
- **M-5 · Surface the neutral-family re-cut + promote the C3 law/ledger to a Q; correct the re-cut
  census.** The owner's "white/black" (T-10) + "gray/black/white" (T-24) land as the WARM cream/brown
  family + stone-ink `rgb(28,25,23)`/`rgb(233,230,226)` with raw `#fff`/`#000` refused
  (`SYNTHESIS.md:131` D1, `t-card-material.md:75`, `t-nav-dropdowns.md:68-73`) — the tranche's
  largest surface class, no Q (Q10 rules scope only). Amendment: one new Q row = the C3 law
  ("color = data only") + its COMPLETE sanctioned-exception ledger + the FORM question (warm family
  DEFAULT vs the owner-literal neutral-gray ALT), with Q10 as its scope sub-clause. Simultaneously
  correct the re-cut census: `SYNTHESIS.md:599` "two"→the full count; `T.md §9` lesson-15's example
  set expanded to ALL re-cuts (glass→WELL, rainbow→chip, 1.5→×φ, blob-z, neutrals, T-19 "all cases"),
  marking which carry a Q. [h-owner-words F1+F2+F4 ≡ h-q-table F4; T-19 member from h-refine-console F-6]
- **M-6 · Home the Q12 ALTERNATIVE (fitted seal-ring).** Booked only in `T.W6.md:177` prose; absent
  from `T.md §7.2` (the declared authoritative routing) and from `T.W7.md` P-7 — if the owner rules
  the fitted arm, it never lands. Amendment: add the §7.2 row ("Q12-alt fitted ring → P5 solid-ring
  register | P5 lands AND Q12 rules the arm | fires at W7") + the conditional P-7 row.
  [h-wave-w6-w7 MUSTFIX-2]

### Cluster C — governing-spec placeholders and self-contradictions (W2/W3/W4 stall or mint unratified taste)

- **M-7 · Resolve the W2-2 `>x` luma-leap placeholder.** `SYNTHESIS.md:293` (spec of record) gates on
  a literal "no >x luma leap"; the wave-doc patch is metric-less and circular against a born-RED O-1.
  Amendment: the full predicate — B0→B2 monotone OKLab L toward the derived field's L; inter-beat
  |ΔL| ≤ 0.10; per-frame ≤ 0.04; the measured ≈0.25 defect = the born-RED reference; PP-10
  tighten-only. Mirror at `T.W2.md:51,103`. [h-refine-doctrine F-1]
- **M-8 · Reconcile D3's "verbatim" beat sheet with the B2 re-cut AND fix the gate arithmetic.**
  The adopted-verbatim source says 450ms/≤1.2s (`t-load-sync.md:266`); the doctrine's own
  parenthetical says 0.9s (`SYNTHESIS.md:151-154` · `T.md:137-138` · `T.W2.md:52`); and even the
  reconciled form is internally red — B2 gated on B1-complete (740ms) + 0.9s = 1.64s > the 1.5s
  settle. Amendment: scope the adoption to B0/B1/B3/B4 verbatim; state the B2 supersession (0.9s
  decelerate, arm ≤600ms); re-cut B2's gate to `isArmed ∧ dock-plate-landed` (620ms) with settle
  ≤1.6s (ratification bracket [1.4, 1.7]s — §4); preserve the B1 stagger values untouched; annotate
  `t-load-sync.md:266`. [h-refine-doctrine F-2 + h-refine-overture F-6, merged]
- **M-9 · Name the blob ink-law floor.** `t-blob-hero.md:150` demands "a named threshold"; no corpus
  document names it (`SYNTHESIS.md:211` · `T.md:195` · `T.W4.md:62,117-122` all bind the solve's
  12ms COST, never the VALUE); the W4-5 writer stalls or mints unratified taste, and F9.R1's
  `lightnessFloor` knob has no sizing spec. Amendment: floor ∈ **[0.12, 0.20] OKLab L, default 0.15**
  (a bracket-with-default per §5-D2, owner eye-judge inside it at W8); the same bracket = the W7
  producer-knob sizing spec. [h-refine-doctrine F-3]
- **M-10 · Specify the beat-gating DAG + O-4's order predicate.** Law 4 declares strict seriality
  while the sheet's own targets require overlap (B3 ≤1.0s vs B2 ≤1.2s); B3/B4 arming events stated
  nowhere; the measured B2-vs-B4 idle race survives. Amendment (h-refine-overture §APPENDIX, ready to
  lift): named arming predicates per beat; O-4 asserts B0 < B1 < {B2, B3} < B4 ∧ B2-start < B4-start
  (an early blob chunk WAITS on the field's arm). [h-refine-overture F-1]
- **M-11 · Make W2-2's two halves compose.** The gradient ground is a background-IMAGE while the F-12
  cure animates a `<color>` @property (`style.css:527` is a solid today) — landing both re-creates
  the discrete-pick hard cut on the surface W2-2 cures. Amendment: a FIXED gradient template over
  registered per-stop properties `--saved-bg-0..3` (+ `--saved-bg` fallback), each with the 200ms
  OKLab transition; persist/write STOPS, never a gradient string. [h-refine-overture F-2]
- **M-12 · Repair the slow-font law.** `font-display: optional`-class CANNOT deliver "never a
  fallback-serif commit" (slow first visit = permanent fallback), and the alternative ("title does
  not yet ink") is uncapped FOIT colliding with the LCP reveal-only law. Amendment: ink gate =
  `document.fonts.ready` ∨ **300ms cap** → metric-compatible (`size-adjust`-tuned) fallback ink;
  "never a fallback commit" re-scoped to "never an UNTUNED fallback, never a swap-reflow".
  [h-refine-overture F-3]
- **M-13 · Close the LCP-opacity hole in the reveal-only law.** The adopted plate-land family runs
  `from { opacity: 0 } … fill both` — the LCP-owning plate can obey PI-2 to the letter and still push
  LCP paint past its stagger (~1.1s under the mandated 6× throttle) while O-24 (identity-only) stays
  green, on a metric already 2.2× red. Amendment: the LCP-owning plate's land = transform+shadow ONLY
  (opacity pinned 1); O-24 gains the first-paint-time leg (≤ B1-start + 1 frame). All transcriptions
  of PI-2/D3. [h-refine-overture F-4]
- **M-14 · Land the two dropped producer asks + resolve the phantom P6 book.** The adopted beat
  sheet's own ownership map names "dock arrive-expanded hook (new)" and "blob emerge pose (new)"
  (`t-load-sync.md:273-277`) — neither reached any packet, and `T.md:401` books "W2-4 emerge → the
  P6 engine pose" against a P6 row that does not exist; LS-5 (request the pose) and t-blob-hero:161
  (the FSM `emerging` state suffices) are in unrowed disagreement. Amendment: add the arrive-expanded
  ask to P7-L13 (with the `transitionend` interim recorded as booked-interim); EITHER add P6 row-F
  (arrival pose) and keep the book, OR ratify t-blob-hero's position and delete the book + LS-5's
  packet sentence — one answer. [h-refine-overture F-5]

### Cluster D — wave-mechanics contradictions (a cold agent halts or violates bounds)

- **M-15 · Draw the round-2 W2↔W3-5 ink dependency (the one genuine same-round two-writer
  collision).** W3-5's D6 gate ("`BG_LIGHTNESS_DARK/LIGHT` gone (grep)", `T.W3.md:129`) is
  unsatisfiable inside W3's bounds: `useViewAccents.ts:41-43,72` consumes the constants and
  `useAtmosphere` exposes no derived-lightness to thread — both W2 EXCLUSIVE boot files, same round,
  declared "disjoint" (`T.W3.md:180`) with W2 absent from §Dependencies. Amendment (pick one, encode
  by name): route the boot-side retirement + the `derivedLightness` exposure through W2's queue
  (the round-4 cross-wave-clause precedent) / reassign that half to W2 with a §Hand-off / sequence
  W3-5 after W2 — and correct the "disjoint" claim + §Dependencies either way.
  [h-wave-w2-w3 M1 ≡ h-dag D-1 — one defect, gate-angle + union-map-angle]
- **M-16 · Give the parse-that-free subpath invariant a home.** W0-2 puts `proof:subpath-budget`
  (verified: the bundle-trace that IS the invariant) in the excise-8, while `T.W1.md:44,197-198` +
  `T.W0.md:183-184` + `SYNTHESIS.md:479` all assert "the W0-2 reclassified dist gate guards it".
  Amendment: retain-**5** / excise-**7** (fold the bundle-trace into `test:dist` as the 5th gate), or
  re-home it to a named unit test and strike the three downstream assertions — same home at all four
  sites. [h-wave-w0-w1 M1]
- **M-17 · Correct the Q15 leak census to SEVEN symbols.** The keystone names 5; the live demo leaks
  7 with no public home — `getColorSpaceBound` (5 sites) + `oklabToLinearSRGBInto` (2 hot-paint
  sites, squarely Q15's own per-pixel rationale). Amendment: promote both under Q15 (additions the
  additive-only gate permits) or name their sanctioned re-derivation; note the count as regenerable.
  [h-wave-w0-w1 M2 — also a §4 Q15 delta]
- **M-18 · Re-author W4-1 off the layout-keyframe vocabulary + pin W3-4's F3 option.** "Shrink
  keyframes re-lock display-1→heading" (font-size = layout track) resurrects the exact fork W3-4
  retires and W3's gate-4 ("CDP layout track FLAT") forbids — and the consume-vs-transpose fork is
  never picked, leaving W4-1 impossible-or-stale under both. Amendment: (a) pin the F3 option in
  W3-4; (b) W4-1 = "re-target the compositor title-shrink RATIO (rest scale 1 at display-1 → stuck
  scale = heading/display-1); no font-size keyframe; gate-4 green by construction"; (c) correct the
  "W3=material / W4=geometry" framing (W3-4 owns the compositor conversion; W4 re-targets endpoints).
  [h-wave-w4-w5 M1]
- **M-19 · Carve the W6-4 O-13 slim out of the boot-chain prohibition.** The slim's targets
  (`resolveViewAccentTokens` in `boot/view-accents.ts`; `PRIMARY_VIEW_SHIFTS`/`_IDS` in
  `boot/useViewAccents.ts`) sit on BOTH Lane D's writable list (`T.W6.md:84`, which also omits
  `useViewAccents.ts`) and the do-not-touch list (`:99` "the boot chain (W2's, closed)"). Amendment:
  the explicit EXCEPT clause naming both files + the byte-preserved R1 SURVIVES set, same commit as
  the T-10 excise. [h-wave-w6-w7 MUSTFIX-1]
- **M-20 · Key W8's single-writer law on the FILE, not the surface.** The census surfaces provably
  share files (T-2 spans picker+About on ONE anchor `ColorSpaceSelector.vue:35`; blob seat + picker
  share `ColorPicker.vue`; boot B1 + dock share `Dock.vue`) — a batch of three lane-worktrees can
  silently two-write. Amendment: at each batch cut derive a shared-file map from the filed rows'
  anchors; intersecting surfaces never ride one batch, or the rows re-home to ONE lane (`T.md §3.2`'s
  device at W8 granularity). [h-refine-hardening-wave RF-1]
- **M-21 · Fix the W6 T-17 chip-consume file routing.** Mix Selects attributed to
  `MixSourceSelector.vue` (zero Selects) — the real host is `MixConfigBar.vue` (`:56-84,92-100`), in
  NO lane's table; `GradientVisualizer.vue`'s consume is unrouted (Lane G's file, no queue clause);
  `AuroraPane.vue` (STRIP member) appears nowhere in W6. Amendment: the three edits at `T.W6.md:84`
  (+`:87-91`) per h-refine-console F-1's text. [h-refine-console F-1]

### Cluster E — oracle honesty (the slate's own non-proxy promise)

- **M-22 · Number + mint the aurora perceptibility gates (O-26/O-6b).** The 2s sub-JND / 10s ≥4/255 /
  60s no-repeat gates are the NON-proxy oracle for T-25/T-26 but sit outside O-1..O-25, are absent
  from the W0-5 born-RED mint, and their numbered stand-in O-6 is an atom-envelope PROXY the
  known-broken shader passes while the render stays invisible — the flagship visual promise
  certifiable only by un-enumerated prose. Amendment: slate row O-26 ("render, not atoms" frame-diff
  spec), added to the W0-5 mint set + the W2-5/T-25/T-26 gate rows; metricize the 2s/60s legs per
  h-refine-doctrine F-6 (§3). [h-oracle-slate F-1]
- **M-23 · Give O-9 a MOTION leg + the consume-ink-not-breath clause.** The live register W3-2 orders
  consumed SHIPS BREATHING (`PaletteCardSkeleton.vue:88` maps specimen→breath) while O-9 gates only
  presence/aria/caption — the twice-killed loading-lie resurrection passes green. Amendment: O-9 +=
  "true-empty ghost computed animation = none at rest; breath/shimmer only under their species'
  predicates; all still under PRM"; W3-2 += "consume the specimen INK recipe, NOT the host breath".
  [h-refine-console F-2]
- **M-24 · Author a buildable O-25 spec.** O-25 is a W0-6 hard-gate item whose entire spec is one
  §6.1 line; the cited lane has zero lineage content; compared quantities / CI-vs-boot / credentials
  all uninvented. Amendment: the mint spec (recommend: CF Pages production deployment source-sha ==
  the built commit, asserted as a post-deploy CI step via `wrangler pages deployment list`, creds
  precondition named) — or mark O-25 spec-pending, never a close-blocking gate. [h-exec-w0 M2]

### Cluster F — close-gate doc-truth (W8/W9)

- **M-25 · Re-point the X1/X2 verbatim firing-ops source §7 → §8 (+§5).** `T.W9.md:9,64,187` pin the
  source to `S/FINAL.md §7` (Process lessons); the firing ops are §8, the book-state §5. Amendment:
  the three-site swap (+ the SYNTHESIS:14 evidence-base line). [h-wave-w8-w9 HW-1]
- **M-26 · Fix the stale "e2e 5-project" in BOTH gates.** `T.W8.md:109` + `T.W9.md:135` vs the
  6-project tree (`smoke-perf`), a drift W0-4 is chartered to cure and the T corpus itself tracks.
  Amendment: "e2e all-project green (6 at authoring)" — drift-proof phrasing preferred (§5-D4) —
  landed with W0-4's CLAUDE.md fix. [h-wave-w8-w9 HW-2]

### Cluster G — census integrity (the E-1 execution inputs)

- **M-27 · Home the two dropped palette-browser components.** `t-coloc-components` F4/§3.2 (the
  literal decomposition input for W1) omits `CurrentPaletteEditor.vue` (305 LoC, 3 importers) and
  `VersionHistoryDrawer.vue` (164 LoC, 3 importers) entirely; executed as written they strand.
  Amendment: assign target clusters (candidates per H-EC-1), correct the root count 33→31; reconcile
  the table per H-EC-3 (§3). [h-evidence-censuses H-EC-1]
- **M-28 · Delete the phantom `palette/useAdminUsers.ts` row.** `t-coloc-composables-lib.md:95`
  fabricates a file that does not exist (only `auth/useAdminUsers.ts` is real; the same table lists
  it separately) — a fabricated work unit polluting the CL-1 plan. Amendment: delete the row; the
  palette count self-corrects to 12. [h-evidence-censuses H-EC-2]

### Cluster H — process resilience + execution readiness (the owner's charge, operationalized)

- **M-29 · Adopt the §Recovery rider — the corpus's answer to the owner's central worry is currently
  two one-line precepts no wave cites.** Zero §Recovery sections, zero PP-14/PP-15 references, zero
  completion-brief mechanics across all 10 wave docs, while T's own authoring needed the discipline
  4× and shipped 2 (now 3) still-live seams. Amendment: lift h-exec-recovery §2 (the generic
  four-step body: audit-partial → patch-brief at `audit/recovery/` → resume-work-order →
  seam-audit-at-close) + §3 (the 8 per-wave-type deltas: W1 atomic-codemod all-or-nothing +
  MOVE-MAP-first; W4 re-derive-from-last-committed-step; W7 rebuild-dist-per-resume; W9 merge-state
  audit; etc.) into the wave grammar after §Commit plan; register in `T.md §8`.
  [h-exec-recovery F1+F2+F3, merged — one work item]
- **M-30 · Rule the W0-1 "producer-inbox cite".** The S precedent's cite was a glass-ui-side relay
  commit — forbidden by T's zero-touch fence — so the gate artefact is forbidden-or-nonexistent at
  close and the doc never rules which. Amendment: (a) the cite = the value.js-side dispatch record
  (letter `## Dispatch stamp` + PROGRESS row), the relay a later booked producer/maintainer action —
  or (b) name the relay channel/owner + fence exemption. Reconcile "acked-or-recorded" with the
  hard-gate line. [h-exec-w0 M1]
- **M-31 · Give PR-7 (preserve-animations) its mechanism on W1.** No keyframe-preservation oracle
  exists; O-23 ±2% cannot see a dropped scoped `@keyframes`; the risk peaks on the ~199-file move —
  and this is a recurring OWNER grievance (memory: feedback_preserve_animations). Amendment: the W1
  keyframe/animation census gate — pre-move set of `@keyframes` + `animation(-name)` identities;
  each survives at a new home post-codemod; deletions RED. Add to the W1 gate row + the PP-8 sweep.
  [h-precepts HP-1]
- **M-32 · Make W8's and W1's true scale visible where a dispatcher looks.** W8 is the fattest wave
  in the DAG by an order of magnitude (≤36 critique pass-slots + comparable remediation batches ×
  ≤3 rounds — computed only in a sibling lane) yet its Agents line states no cap; W1 compresses ~199
  demo files into single continuous writers with UNNAMED batch granularity (contrast W4's 7 named
  steps). Amendment: a `**Scale**:` line beside every `**Agents**:` line; W8's states the worst-case
  arithmetic + "expect multi-day wall-clock"; W1's commit plan enumerates its move-batches as named,
  checkpoint-bearing phases. [h-exec-budget F1 (+§4 cross-cutting), incl. the W1 half]
- **M-33 · Fix the false "WS12 has NOT landed" premise (3 docs).** WS12's CSS-MINIFY +
  GATE-FAMILY-CONSOLIDATE landed `ee382861`/`a900a71f` (2026-07-05, ancestors of HEAD) BEFORE the
  census stamp. The windows-open CONCLUSION survives via the export map (`goo-blob` still exported;
  no `./blob`), but P2/PKT-1 + P8/A6 are now claims about a POST-minify dist. Amendment: the precise
  restatement (per H-PKT-1's text) in `t-request-packets.md` §0/§2, the letter Status block + W-1
  row, and SYNTHESIS §4 — with the fresh-rebuild re-verify noted for P2/P8 at dispatch.
  [h-packets H-PKT-1]
- **M-34 · Disposition the app's SECOND slider population.** `ConfigSliderPane.vue` (196 LoC, the
  public Atmosphere+Blob views — two of the nine primary dock views) is absent from every design
  wave while D5/W4-3/W4-4 mint the new slider language picker-only and O-18's roster carries no
  config-slider row — the named-site-not-population disease at wave level. Amendment: EITHER the
  population clause on W4-4 (console grammar extends to ConfigSliderPane) + O-18 rows, OR an explicit
  DEFERRED book with rationale + a named W8 roster row — but SAID. [h-gaps G-1]

---

## §3 — THE SHOULDFIX LIST (≈90 consolidated from 102 raw; grouped; folded where one fix strengthens another)

Each entry: `lane · finding — the fix` (corpus locations in the lane files; the amend pass reads them
directly). **Folds** are marked where several raw findings collapse into one edit.

### 3.1 Seam / fidelity / count reconciliation (10)

1. **FOLD (5 raw → 1)** — the `proof:*` count reconciles to **12 npm / 11 mjs** everywhere:
   t-legacy-sweep F5 (three "13" sites), t-docs-truth F4 (four "11" sites), t-coloc-backend F7
   ("13"→12, "19"→18 scripts/). [h-seam-fleet-resume F3/F4/F5 ≡ h-evidence-sweeps HES-1 ≡
   h-evidence-censuses H-EC-6]
2. **FOLD (3 raw → 1)** — the phantom `§2.x` doctrine refs → D-labels at all seven sites
   (`SYNTHESIS.md:56,57,99,573` · `T.md:306,307,514`); fix the SOURCE first, then T.md byte-verbatim.
   [h-seam-charter F1 ≡ h-seam-s-state F-1 ≡ h-synthesis-corpus-diff SF-2]
3. h-seam-plan-audit-2 SF-1 — the stale companion note: t-plan-audit-1 IS landed (`385c2d2`); fix
   header `:31-32` + §8.2 `:670`.
4. **FOLD (2 raw → 1)** — the DAG glyph: pull W7 out of `SYNTHESIS.md:235`'s arrow chain (it
   critical-paths a may-never-fire trigger); then T.md §3's "verbatim" label becomes true (or relabel
   "distilled"). [h-dag D-2 ≡ h-synthesis-corpus-diff SF-1]
5. h-mandate-trace H-2 — restore "performance **above all**" to every E-3 encoding + a Q14 clause
   weighing the paramount framing (the one axis left red-and-deferred).
6. h-mandate-trace H-3 — one reconciling sentence: 32 agents asked → 36 lanes / 37 docs delivered
   (plan-audit split), exceeding the ask; pick one canonical phrasing.
7. h-owner-words F3 — reconcile "wildly re-structured … ALL file directories" in SYNTHESIS §5.4
   (honored as whole-tree directory re-shape; move-only by E-3; §5.4 = the bounded reading of "ALL").
8. h-overrule-ledger F-1 — restore "(unlisted)" on R9; name R6 the 4th §3-omission; add the ledger
   preamble split (7 mandate-listed / 4 corpus-added).
9. h-overrule-ledger F-2 — t-contradictions §2.4's "complete" inventory adds R5+R6 (or scopes to
   overrules with cross-ref).
10. h-seam-fleet-resume F6/F7 — composables root 6→7 (29→30); t-card-color-census §4 roll-up
    arithmetic recounted.

### 3.2 Wave mechanics (W0–W7) (20)

11. h-wave-w0-w1 S1 — dark-mode-toggle/ DISSOLVE (LEG bundle item 3) named in W0-3 or W1-demo.
12. h-wave-w0-w1 S2 — the W1 demo tree is a SHARED writer surface (keystone gates the whole
    `@src`-leaking set, ~150 import lines — not just the color codemod); reword or re-home.
13. h-wave-w0-w1 S3 — the KF dispatch: a real `T/letters/KF-*.md` OR reword gate/bounds to "the §KF
    section, separate dispatch" + add the keyframes-HEAD re-stamp step. (Pairs with
    h-synthesis-corpus-diff N-1's letter/note/packet noun fix.)
14. h-wave-w2-w3 S1 — `useMarkdownColors.ts:7-8` local `BG_LIGHTNESS` shadow-duplicate → W3-5's
    routed-site list + correct t-a11y-contrast F-1's "every consumer" claim (independently fails
    gate-5's grep).
15. **FOLD (2 raw → 1)** — W2-4's HeroBlob reveal grant vs the picker-knot fence: name the exact
    seam W2 may touch (boot provides the emerge signal; HeroBlob's consume is W4's) or carve the
    exception by name. [h-wave-w2-w3 S2 ≡ h-dag D-7]
16. h-wave-w2-w3 S3 — W3-3's `.input-bar` anchor restores the producer path
    (`glass-ui/src/styles/utilities/components.css:205-228`); demo half = consumer opt-in; recipe
    rides P3/ASK-B/C.
17. **FOLD (2 raw → 1)** — PI-5's Tranche A adds R8 (`t-perf-implications.md:203-205`) + SYNTHESIS
    §3 T.W5's enumeration completes to "R1–R5 / R8 / R9–R11". [h-wave-w4-w5 S1 ≡
    h-synthesis-corpus-diff N-3]
18. h-wave-w4-w5 S2 — split the R6/R7 book row: R7 in-round via the W6 dock queue; R6
    (animations.css, W5's frozen file) fires at W7-or-successor — or grant W5 conditional authority.
19. h-wave-w4-w5 S3 — W2-3's font self-host gains the explicit tnum-retention precondition (O-10c
    depends on it) + disambiguate W4-2's index.html permission.
20. h-wave-w4-w5 S4 — route the @900px height-gate failure in §Triumvirate ("routes to ratification;
    never shrink the ×φ title").
21. h-wave-w6-w7 SF-3 — `waves/S.W8.md` → `S/waves/S.W8.md` ×5 in T.W7 + `SYNTHESIS.md:350`.
22. h-wave-w6-w7 SF-4 — R5's RETIRES names all FIVE recalibrated values (hatch 9/12 + edge 28/50 +
    stripe width).
23. h-wave-w6-w7 SF-5 — scope W7's "S.W8 INTACT" to the 18-specifier walk; the S-wave-numbered
    producer-gap paragraph marked SUPERSEDED by P-6 (note the L-number collision).
24. h-wave-w6-w7 SF-6 — "the W0-1 seed-rider-1 contract (R10; not T.W0-1)" disambiguation ×6.
25. h-dag D-3 — the round-4 `style.css` cross-wave clause (W5 motion @~86-150 · W6 netting @254-261
    · accent @223-224 read-only).
26. h-dag D-4 — reassign the readout-frac guard-then-alpha cure to W4 (W3-5 threads the contract
    only); scope the O-18/W3-5 grep accordingly.
27. h-dag D-5 — W7-when-fired runs as its own serial act at a round boundary (resolve
    "floats-into-current" vs "consumes closed").
28. h-dag D-6 — unify "wave head" (correct) over "tranche head" in `T.md §3.2` + `SYNTHESIS.md:242`.
29. h-exec-w0 S1 — `test:dist` self-builds (`npm run build && …`) + named CI home (build-and-test
    after ci.yml:148).
30. h-exec-w0 S2 — W1-api's `scripts/` regroup re-points the `test:dist` paths (or the retained-4
    are exempt) — the W0-2 deliverable must survive W1.

### 3.3 Oracles, budgets, doctrine values (13)

31. h-oracle-slate F-2 — O-10(e): computed-font-size token census (D2's own "exact shipped token"
    law is mechanically checkable and unchecked).
32. h-oracle-slate F-3 — O-3 = owner/headed-attested ANNEX, not a CI pass/fail; run-owner + cadence
    named; drop the redundant screencast-order clause.
33. h-oracle-slate F-4 — repoint the §1.2 PI row's phantom "§6.3" to O-24/O-12/O-23 + §6.2.
34. h-refine-doctrine F-4 — O-1's predicate: OKLCh hue ±30° · C ≥ 0.03 · scheme L-band; PP-10
    tighten-only. *(Values per §5-D2: record-at-mint defaults, not pre-ratified constants.)*
35. h-refine-doctrine F-5 — O-5's red line: no inter-frame delta > 3× window median ∧ dropped-frame
    ≤ 10%; born-RED vs the 44→315ms chain. *(§5-D2 applies.)*
36. h-refine-doctrine F-6 — metricize the perceptibility 2s (<2/255) + 60s (no 5s-apart window pair
    <1/255) legs — folds INTO M-22's O-26 row. *(§5-D2 applies.)*
37. h-refine-doctrine F-7 — O-12's two hover numbers (mood floor ≥6/255 within 400ms; hover-active
    p50 ≤ 20ms as a new §6.2 row). *(§5-D2 applies.)*
38. h-refine-doctrine F-8 — O-17 → "zero letterbox; aspect ≡ 1/vb-ratio (±1px)" (the transcribed
    "≈1" reds the designed overshoot geometry under spec-precedence).
39. h-refine-doctrine F-9 — Q9's two units mapped (bracket = 27–39% added card material; the P3 knob
    ACCEPTED iff the quiet-rung rest composites inside the SAME bracket); O-11 gate-3's ink floor
    referent = the D6/O-18 rung.
40. h-refine-doctrine F-10 — the WELL tone-step bracket [6%, 10%] `--foreground` into `--card`
    (default 8%) as the P3 sizing spec (the T-26 precedent). *(§5-D2 applies.)*
41. h-refine-doctrine N-1..N-4 (promoted as one batch edit) — O-18's reference color literal
    `lab(38% 32 24)` pulled into the row; D9 breath amplitude default; O-8's ε ≤ 0.5px; P6 row-A's
    floor in frame-diff units.
42. h-refine-overture F-7 — mark the Q2-NOW (demo knobs) / Q2-FULL (P1-gated, W7 re-judge) split in
    W2-5 + O-6; the W2-5 frames are P1 sizing-spec input, not a gate failure.
43. h-refine-overture F-8 + N-1/N-3 (one persist-record edit) — `{stops, scheme, deriveVersion}`;
    scheme-mismatch falls to the ACTIVE scheme's build-time constant; shape-validated read.
44. (sic — kept with 43's batch) h-refine-overture F-9 — the W2 gates' PRM scoping (O-4/O-5/no-pop
    run PRM-OFF) + ONE PRM-ON assertion of the settled terminal composition.

### 3.4 Books, packets, precepts (9)

45. h-books-folds SF-1 — the EasingPicker SelectTrigger accessible-name contract named in P7-L7
    (CHRONIC R→S→T) + the `T.md §5` chronic roll-call.
46. h-books-folds SF-2 — the `/easing` GAP-3 watch's CHRONIC flag restored; §5 delineates 15, not 13.
47. h-books-folds N-2 (promoted) — the §7.1 book row reads "L20 + GAP-L5 + RP-2 land TOGETHER"
    (matching W7 P-3 + census §6).
48. h-packets H-PKT-2 — P3's A1/A2 row reclassed "VERIFY-AT-CUT — paint-closed at `300a30fb`
    (DARK-READABILITY-REPAIR DONE)"; strike the T-3/T-11/T-13/T-18/T-24 HALT (re-confirm at the
    5.0.0 rebuild).
49. h-packets H-PKT-3 — correct t-request-packets §3: T-16 + T-9 DO carry E-2 producer riders
    (hue-carrying primary tier; dock status-lamp primitive) → the Q16-candidates note.
50. h-packets H-PKT-4 — L15 + relay-item-8 homed in P7 (HELD-below-bar row; named a11y re-ask) or
    A10's "fold set is complete" narrowed.
51. h-precepts HP-2 — the §9 bridging clause naming the `S/FINAL §7` S-execution tier → precept IDs
    (PP-9/PP-13/PP-14/PP-8/PP-15/§3.2).
52. h-precepts HP-3 — PP-5 qualified: "no gate reads books as pass/fail; named EXPECTED-RED rows
    appear as honest-red records with packet cites".
53. h-precepts HP-4 — the H1 cascade-correctness (withTransaction) invariant named in SYNTHESIS §5.2's
    carry-list + the W1-api gate.

### 3.5 Design refinements (console / chips / shadow / W8) (15)

54. h-refine-console F-3 — Q4's alternative priced (quiet-glass un-bounds the console ground; O-18's
    referent re-prices to live composited lightness) + W4's header gains W6's ratified-outcome hedge.
55. h-refine-console F-4 — the accent letter-rail ring enters the C3 exception ledger BY NAME (or
    rules neutral); D5's three-scale sentence re-cut to the two surviving scales (R9 kills the
    first); optional W8 bracket accent-vs-neutral. *(Feeds the M-5 C3 Q row.)*
56. h-refine-console F-5 — Extract's `isProcessing` species pinned (known-imminent `shadow` breath
    per the species table; supersede the §3(a) "developing" word + the shipped `key="developing"`).
57. h-refine-console F-6 — T-19's error-exemption rider line for explicit owner assent (the third
    silent-narrowing member — folded into M-5's census + §4's annex).
58. h-refine-console F-7 — prefix the S-era Q cites: "S-Q6" (R7), "S-Q7" (R3/§6.2/T.W4) — the bare
    numbers collide with T's own Q6/Q7.
59. h-refine-console F-8 — size the Q5 chip's no-palette fallback (full-wheel 5-stop sample = honest
    rainbow, or no-chip-without-palette) + name its O-14 referent. *(Presented inside the M-3 Q5 row.)*
60. h-refine-console F-9 — dispatch-protocol step 6: re-cut Q-sensitive packet rows to the ratified
    outcomes (P5's seal-rim leg marked Q12-conditional NOW).
61. h-refine-console F-10 — the spectrum-plate caption (t-2001-51, 3.84/3.36:1) named in W3-5's
    routed sites + the O-18 example set.
62. h-refine-console N-1/N-2/N-3/N-5 (one batch) — per-space glyph law generalized; console
    chassis-persistence clause into W4-4; the EmptyState dot-ghost row sheds where the card-scale
    ghost seats; grid-host ghost count default (3).
63. h-refine-hardening RF-2 — schedule the re-critique loop (pass_1 → lanes_1 → pass_2 → … ≤3);
    the halt bound becomes real arithmetic.
64. h-refine-hardening RF-3 — pole = a NAMED reproducible state (value tuple / commit / frame);
    adjective-only poles are defective package rows.
65. h-refine-hardening RF-4 — the package's BEFORE panels = the owner's own 23 shots per the §1.0
    corrected map, beside the AFTER frames.
66. h-refine-hardening RF-5 + RF-6 — the bracket-table axis roster sourced (§12 taste rows +
    wave-gate eye-judge clauses + pass-minted) AND the per-axis LANDED default + bulk-approve verb.
67. h-refine-hardening RF-7 + RF-12 — named file homes: `audit/w8-certification/{PACKAGE.md,
    VERDICT-<date>.md, passes/<surface>.p<i>.md, ROWS.md}`; W9 consumes by path.
68. h-refine-hardening RF-8 — the loop-halt residual typed BY CLASS (taste → bracket; defect →
    booked row; producer → letter) — never a bug laundered as a preference.

### 3.6 Recovery / budget / environment (8)

69. h-exec-recovery F4 (the gate half; the grep half is in M-1) — the wave-close seam-audit as a
    named §Hard-gate row (tool-artefact grep · substrate claims re-verified · worktree census).
70. h-exec-recovery F5 — every recovery/verify assertion NAMES its command + output (the
    "verbatim-diffed" over-claim class).
71. h-exec-recovery F6 — resume re-verifies substrate/sibling/producer state against the CURRENT
    tree (the plan-audit-2 frozen-claim class).
72. h-exec-budget F2 — W4's 6 forced-order commit points named as the FORMAL PP-14 resumption unit;
    expect ≥2-3 recoveries.
73. h-exec-budget F3 — W3's cap arithmetic: encode the sequencing reading ("the core lane lands its
    token queue before the 3 consumer lanes dispatch") — see §5-D1.
74. h-exec-w0 S3 — define the O-7 "scaffold" (loop + roster + resolver, asserting nothing yet) +
    its expected W0 state; h-exec-w0 N1's per-oracle born-RED vs born-GREEN-pending-W2 annotation.
75. h-gaps G-6 — the §12 ratification-package preamble (who assembles, what the owner receives,
    prose-only stated if deliberate).
76. h-gaps G-7 — the sanctioned owner live-probe environment (`npm run dev` full stack; web-only
    judges non-network surfaces only).

### 3.7 Evidence-layer corrections (8)

77. h-evidence-design-2 H-EVID2-1 — `flowDirection()` → `flowField()` in t-aurora-boot-active F-10
    (the pointer-dead crux's verifiability).
78. h-evidence-design-2 H-EVID2-2 — `#b27290` → `#b37290` (F-2/F-3).
79. h-evidence-design-2 H-EVID2-3 — T-28's seal px marked `@1440×900, body-font-conditioned` (or
    restated scale-free).
80. h-evidence-design-1 H-ED1-1 — the full computed backdrop-filter folded into t-card-material §1
    (the wash tier's `saturate()` STRENGTHENS T-CM-3).
81. h-evidence-design-1 H-ED1-2 — soften the sliders light-contrast cell to ≈1.9–2.3:1 (pixel-AA).
82. h-evidence-sweeps HES-2 — F6's evidence re-opened to name `TabsIndicator.vue` (the "underline
    register" is a pill-plate, not border-bottom; verdict STAYS; sharpen the producer ask).
83. h-evidence-sweeps HES-3 — `color-contrast.test.ts` "20 tests" → 38.
84. h-evidence-censuses H-EC-3/H-EC-4/H-EC-5 (one reconciliation edit) — the components feature
    table re-anchored to the correct 146/20,501 totals; `dock/` = 10 files with 1 external importer
    (`DockViewSelect` ← `ColorSpaceSelector`); the composables/lib §1 subdivisions corrected
    (root 7 / lib-root 6 / lib-api 13).

### 3.8 Gaps promoted to corpus items (see §6 for the full disposition) (6)

85. h-gaps G-2 — the markdown/KaTeX About-content body: one O-18 row + a W8 roster surface.
86. h-gaps G-4 — the designed NO-FIELD composition (WebGL-unavailable / context-loss): a W2-3 rider
    naming the terminal composition + re-arm rule.
87. h-gaps G-5 — DECLINE dispositions per mandated packet (P3/P5 → interim-becomes-permanent;
    P4/T-20 → escalate to the OWNER — the two-repo taste conflict is theirs).
88. h-gaps G-9 — the five micro-chrome rows (::selection · scrollbar · cursor grammar · `<title>` ·
    native-title-beyond-dock) named in the W8 roster (verify-producer-first).
89. h-gaps G-11 — the 5 admin views + auth/profile flows named BY NAME in the W8 roster.
90. h-gaps G-3 — the `theme-color` B0 sub-clause (speculative-low, on-axis, one line).

---

## §4 — THE Q-TABLE DELTA (the owner re-rules ONLY these)

The 17-row table (`T.md §12` ≡ `SYNTHESIS §8`) is byte-faithful and 12 of 17 rows cleared
adversarial re-derivation untouched. The hardening changes:

| Δ | Row | What changes | Source |
|---|---|---|---|
| **SPLIT** | **Q11 → Q11a + Q11b** | Q11a = the ×φ size reading of the owner's "1.5×" (titles + readout; default ×φ, alts ×1.5 / √φ). Q11b = the readout line-lock levers (default 1+2+lab-lever; alts blanket-2-line / fit-down). The owner's own number gets its own ruling. | M-2 |
| **RE-CUT DEFAULT** | **Q5** | The owner-verbatim guarded letterform ramp presented FIRST/co-equal in the DEFAULT cell; the data-strip chip named as the C3 re-cut the owner may decline; the no-palette fallback's two arms (full-wheel sample vs no-chip) presented inside the row. | M-3, F-8 |
| **NEW** | **Q3b (blob z-order)** | "higher z than all": DEFAULT content-stack top, chrome above (immaterial under the flush seat); ALT true top-of-all. The authoring lane asked for this ratification; the synthesis dropped the ask. | M-4 |
| **NEW** | **Q18 (the C3 law + neutral family)** | The "color = data only" law + its COMPLETE sanctioned-exception ledger (incl. the accent-ring family per F-4) ratified as one row; the FORM sub-clause: warm cream/brown + stone-ink (DEFAULT, the house atmosphere) vs the owner-literal neutral gray/white/black (ALT). Q10 becomes its scope sub-clause. | M-5 |
| **ANNEX to Q2** | boot fade + settle | The T-27 re-cut disclosed: the field fade DOUBLED 0.45→0.9s answering "too slow" (slow = the freeze/pileup, not the fade), and total settle moves ~1.0s → **[1.4, 1.7]s bracket BY DESIGN** (cadence-coherence position argued, before/after screencasts at W8). | h-q-table F3(b) + h-refine-overture F-10 |
| **ANNEX (rider lines)** | T-19 · Fraunces | T-19 "in all cases" read as all EMPTY permutations (error keeps the plain register, PR-4) — flagged for assent. The Fira-Code readout re-voice becomes a ruling ONLY if Fraunces self-host is refused. | console F-6 · h-q-table F7 |
| **SCOPE** | **Q15** | The promotion set corrects 5 → **7** symbols (`getColorSpaceBound`, `oklabToLinearSRGBInto` — the latter is Q15's own per-pixel rationale). Default unchanged in kind. | M-17 |
| **CELL VALUES** | **Q13** | If M-16's retain-5/excise-7 is taken, the split arithmetic in the default cell updates (4→5 retained; the parse-that-free bundle-trace joins `test:dist`). Default unchanged in kind. | M-16 |
| **ANNOTATE** | Q7 · Q8 | Alternatives marked "(precluded by [the one-migration edict / E-3]; recorded for completeness)" — not genuinely live. | h-q-table F5 |
| **ANNOTATE** | Q4 | "(rule per-surface; alternatives independent)" + the quiet-glass price stated (un-bounds the console ground; the ink contract re-prices to live composited lightness). | h-q-table F6 + console F-3 |
| **ANNOTATE** | Q9 | The bracket's UNIT fixed: the ratified frame is the EFFECT bracket (27–39% added card material); the P3 knob accepted iff it composites inside it. | doctrine F-9 |
| **ANNOTATE** | Q12 | The alternative arm now has a landing site (§7.2 row + W7 P-7 conditional) — no re-rule needed; the row becomes honest. | M-6 |

Net: **17 rows → 19 rows** (one split, two new) **+ 2 annexes + 6 annotations**. Everything else in
the table stands as authored — re-verified well-posed, defaults re-derivable, alternatives fair.

---

## §5 — DISSENTS (lane findings the verdict rejects, narrows, or re-selects)

No lane finding was rejected outright on its EVIDENCE — every load-bearing claim the fleet filed was
verified or independently corroborated. The dissents are on proposed RESOLUTIONS:

- **D1 · h-exec-budget F3, option (a) — REJECTED.** Raising W3's cap to "≤4" would amend E-6
  ("batches of three"), which is owner-verbatim law; a hardening lane cannot re-cut an owner edict to
  fit a wave doc's arithmetic. Adopt option (b): the sequencing clause ("the core lane lands its
  token queue before the 3 consumer lanes dispatch") — §3.6 item 73.
- **D2 · The hardening-minted NUMBERS are brackets-for-ratification, not settled doctrine.** The
  refine lanes propose specific constants on taste/threshold axes the corpus left blank (the ink
  floor [0.12,0.20]/0.15 · O-1 ±30°/C≥0.03 · O-5 3×median/10% · the perceptibility 2/255 & 1/255 ·
  O-12 6/255 & p50≤20ms · the WELL tone-step [6,10]% · the font 300ms cap · the settle [1.4,1.7]s).
  The verdict ACCEPTS the structure (each value MUST exist — that is the finding) but the specific
  numbers fold as **defaults-with-brackets under PP-10 (record-at-mint, tighten-only), owner-judged
  at their gates/W8** — never as pre-ratified constants smuggled in via a hardening pass. The two
  that re-read owner words (the settle bracket; the font behavior) additionally surface in §4.
- **D3 · h-gaps G-8 (app-level errorHandler as a W1 cargo row) — NARROWED to the lane's own option
  (b).** Adding runtime-error machinery inside the E-1 move wave is scope the move-only discipline
  ("churn-for-churn forbidden") counsels against. Default disposition: a considered-and-declined
  ledger row (G-10's table) + a W8 roster row ("thrown-error state") so the class is judged; promote
  to a wave item only if the owner elevates it.
- **D4 · h-wave-w8-w9 HW-2's literal "6" — REFINED.** The corpus's own regenerable-count precept
  (the CLAUDE.md LoC pattern: hardcoded numbers drift every wave) argues for "e2e **all-project**
  green (6 at authoring)" over a fresh hardcoded "6". Same fix, drift-proof phrasing (M-26).
- **D5 · h-refine-console F-4's "rule the rail neutral" arm — NOT unilaterally adopted.** The verdict
  routes the accent-ring question through the new Q18 exception-ledger row (+ optionally the W8
  accent-vs-neutral bracket) rather than re-cutting D5's design in the amend pass — the design
  tension is real, but it is the owner's call, and the ledger row is where they make it.
- **D6 · Severity re-grades.** h-books-folds SF-1 (EasingPicker a11y, "MUSTFIX-adjacent") stays
  SHOULDFIX — the P7 dispatch has not fired, so the fold window is open; it MUST land before W0-1
  dispatches the letter (sequencing note added to M-33's packet edits). h-packets H-PKT-2's
  strike-the-HALT is accepted with the lane's own caution intact: the DONE flip is re-verified on a
  fresh dist at dispatch (VERIFY-AT-CUT, not trusted).

---

## §6 — THE h-gaps DISPOSITION (corpus items vs recorded-speculative)

| Row | Disposition | Where it lands |
|---|---|---|
| G-1 ConfigSliderPane (2nd slider population) | **CORPUS ITEM — MUSTFIX** | M-34: W4-4 population clause + O-18 rows, OR a named DEFERRED book + W8 roster row |
| G-2 markdown/KaTeX About body | **CORPUS ITEM** | §3 #85: one O-18 row + a W8 roster surface (the inside of the owner's own twice-flagged card) |
| G-4 NO-FIELD composition (WebGL-unavailable/context-loss) | **CORPUS ITEM** | §3 #86: the W2-3 rider (persisted gradient ground = the honest terminal; re-arm once) — PP-2 demands the failure state be DESIGNED |
| G-5 producer DECLINE (esp. T-20/P4) | **CORPUS ITEM** | §3 #87: per-packet DECLINE dispositions; T-20 → owner escalation (never discovered at the W9 walk) |
| G-6 ratification-package spec | **CORPUS ITEM** | §3 #75: the 3-line §12 preamble |
| G-7 owner probe environment | **CORPUS ITEM** | §3 #76: the one-line sanctioned-environment rule (T-9's genesis was an environment artifact) |
| G-8 runtime-error containment | **RECORDED + declined-ledger row** (see §5-D3) | the G-10 table + a W8 roster row; promote only on owner elevation |
| G-3 theme-color | **CORPUS ITEM, marked speculative-low** | §3 #90: a W2-3 optional sub-clause (cheap, on the T-1/T-27 axis) |
| G-9 micro-chrome roster (5 rows) | **CORPUS ITEMS as W8 roster rows** (individually speculative) | §3 #88: pre-filter fodder, verify-producer-first — zero new waves |
| G-10 zero-item classes (i18n/print/CVD/forced-colors/zoom) | **CORPUS ITEM: the considered-and-declined table itself** | a six-line table in `T.md §5` or SYNTHESIS §6 — absence reads as judgment, not blindness; the `prefers-contrast: more` thread noted as cheapest-at-W3-5 |
| G-11 admin views by name | **CORPUS ITEM** | §3 #89: the W8 roster enumerates `admin-users/-names/-audit/-flagged/-tags` + auth/profile |
| G-12 `err.log` | **IMMEDIATE HYGIENE** | delete at the amend pass or W0-3's sweep; `*.log` added to the PP-8 residue grep |

---

## Coda — what the fleet proved that the owner should hear plainly

The six walls did NOT corrupt the corpus's substance. The product tree never moved; the recovered
artefacts verify claim-by-claim; the measured design corpus reproduces to the digit; the S-state
ledger, the books, and the packet contents are sound. The residue of the interruptions is three
2-line XML strips, one stale sentence, a handful of phantom cross-refs, and a count that drifted
three ways — all mapped, all minutes to fix, and the §Recovery rider (M-29) + the standing
tool-artefact grep (M-1) exist so the NEXT wall leaves even less. The 34 MUSTFIX are dominated not
by seam damage but by the hardening working as designed: placeholders resolved, silent owner-word
re-cuts surfaced back into the table the owner rules on, and the wave mechanics made cold-resumable.
Fold clusters A–B, re-issue the 19-row table, and the ratification STOP is safe to put to the owner.

*Verdict of the T hardening fleet — 31 lanes synthesized. ZERO corpus/product edits by this lane
beyond this file.*
