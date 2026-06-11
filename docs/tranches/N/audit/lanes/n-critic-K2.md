# N Charter — Critique K2 (Lens 2: completeness + internal consistency)

Adversarial review of the tranche-N charter (`docs/tranches/N/{N.md,PROGRESS.md,audit/*}`,
37-file lane base) against the lane evidence and the live tree. value.js HEAD `0cb5dd2`,
branch `tranche-f-handoff`, 2026-06-11. Every finding carries the doc location + the
primary-evidence correction.

Verdict: **sound-with-fixes.** The charter's spine (boot→type→CRUD→deploy→consume→suffuse→
library→hygiene→close) is correct and the load-bearing P0s are folded. But the completeness
sweep finds **5 genuine P1 lane findings silently dropped** (no fold/book/kill/refute), **one
invariant (inv-N-3) scoped narrower than its own claim against the tree**, **one DAG sequencing
gap (W6 needs W2.B, unwired)**, and **several count/citation contradictions** between the charter
and the lanes it cites.

---

## A. SILENTLY DROPPED P1 FINDINGS (the failure mode this lens hunts)

### A1 [P1] Session TTL 7d-vs-30d contract violation + the 7d-mint/30d-cron dead-code inconsistency — DROPPED
`D2.md:59-61,90,115` flags a **"concrete, measurable §6 violation"**: value.js mints sessions
at 7 days (`auth.ts:36 SESSION_TTL_MS = 7*24*60*60*1000`) while CRUD-CONTRACT §6 binds
`session_ttl_days = 30`. Compounding: the cron reaper targets `lastSeenAt < now−30d`
(`cron.ts:12,20`) but `expiresAt` reaps at 7d first, so the 30d cron sweep is **dead code**.
D2 rates it P1 and names a one-line fix ("session TTL 7→30 + cron reconcile").
**The charter folds none of it.** N.W3.H covers only URN + the conformance gap; inv-N-8
("contract honesty") names the URN scheme + conformance tests but not the TTL. Worse,
`synthesis.md:73` summarizes D2 as "URN divergence + a conformance matrix citing fictional
tests" — the TTL violation is dropped from the summary itself. Fix: fold the TTL=30 + cron
reconcile into N.W3 (it is the *cheapest* contract-honesty win D2 names).

### A2 [P1] Fork-count counter drift (`incrementForkCount` ungated vs `decrementForkCount` gated) — DROPPED
`D1.md:66-67` + `D1.md §5 item 4`: `decrementForkCount` (`palette.ts:169`) is gated
`{forkCount:{$gt:0}}` but `incrementForkCount` (`palette.ts:179`) is **ungated** → a
delete-then-restore of a fork when the parent's `forkCount` is already 0 permanently inflates
the public-facing count by 1. D1 rates it **P1 ("silent counter drift on a public-facing
number")** with a ~3-line fix (recompute from `countForksOf` on restore). **Zero charter
matches** (`grep -niE 'forkCount|countForksOf' N.md PROGRESS.md fold-ledger.md` → empty). N.W3
addresses TOCTOU, txns, indexes, pagination, PATCH-reads, diff, idempotency, URN — but not this
correctness bug.

### A3 [P1] Extract-pane: extraction discards population/dominance; result misrepresents the image — DROPPED
`C4.md:63-85`: the library ships `population` (`quantize/types.ts:41`) and `dominantColor()`
(`quantize/index.ts:176`); the demo consumes **neither** — `ExtractPane.vue:117-132` throws
`population` away and `PaletteColorStrip.vue:18-21` renders equal-width swatches (a ~9× weight
spread rendered identically). C4 rates it P1 with a gestalt fix (thread population end-to-end +
a dominant hero swatch). **The whole extract pane is absent from N.W6.C** (which lists KaTeX,
docs, easing-curve, mix, gradient, picker — not extract). Silent drop of the most substantive
per-pane gestalt finding in the C-corpus.

### A4 [P1] Two divergent extractor shells (ExtractPane vs ImagePaletteExtractor, ~90% copy-paste) — DROPPED
`C4.md:87-100` (+ `E1`/`A5` echo): `ExtractPane.vue` and
`image-palette-extractor/ImagePaletteExtractor.vue` are ~90% duplicate (both own
`previewDataUrl`/`colorCount`/`chromaWeight`/`runQuantize`/…), a precept-§5 one-path violation.
The charter does not fold this — and it is *masked* by V5's "ImagePaletteExtractor NOT
orphaned — KEEP" refutation (`fold-ledger.md:79`, `V5`). V5 correctly proves the file is
consumed by PaletteDialog, but "keep" does not address C4's *duplication* finding; the charter
treats V5's KEEP as closing the matter when C4's one-path violation is still open.

### A5 [P1] EditDrawer mounted-but-`display:none` dead UI (render/tooltip cost on every edit) — DROPPED
`C1.md:38-39` (P1-4): `EditDrawer.vue:115-117` ends with an unconditional
`.edit-drawer{display:none}`, yet the component is still mounted (`ColorPicker.vue:33`),
teleports to `<body>`, runs a `<Transition>`, renders two `WatercolorDot`s + diff arrow +
buttons + two TooltipProviders **invisibly on every edit**. C1 rates P1 ("delete the component
and its mount"). No charter doc mentions EditDrawer or `display:none`. Silent drop.

### A6 [P1, partial] Channel-letter rail label collision (`a` and `alpha` both render "A") — DROPPED
`C1.md:30` (P1-1): `componentLabel()` returns `charAt(0).toUpperCase()` so Lab's `a` axis and
`alpha` both render **"A"**, and `componentDescription()` cross-contaminates the tooltip. N.W1.A
does the carousel→`role="tablist"` *rename* but the label collision **survives the rename** and
is not folded. (The "letter rail" gestalt fix in C1 is folded; the data-correctness defect
inside it is not.)

---

## B. INVARIANT ENFORCEABILITY / SCOPE DEFECTS

### B1 [P1] inv-N-3 ("exactly one CSS-color→RGB resolver") is unsatisfiable by the named wave scope
N.md:181 invariant + N.md:141 N.W2.C "collapse the **2** DOM color resolvers" + N.md:101 "2 DOM
resolvers" + PROGRESS.md:13 "resolvers 2→1". But **the tree has 4 resolver functions**, not 2
(verified): `useMetaballRenderer.ts:58 cssColorToRgb`, `useMixingAnimation.ts:28 cssToRgb`,
`useGradientInterpolation.ts:37 resolveColor`, `useGradientCSS.ts:25 resolveColor` —
`A5.md:203,209` names all four and glass-ui's `useResolveTokenColor` as the canonical path;
`E1.md` named only 2. Collapsing the 2 the charter scopes leaves the 2 gradient resolvers live,
so inv-N-3's "exactly one" cannot pass. Either the wave must name all 4 (and `useImageSampler`)
or inv-N-3 must be narrowed honestly. The lanes themselves conflict (E1=2 vs A5=4) and the
charter silently adopted the smaller count into both the wave *and* the invariant.

### B2 [P2] inv-N-7 ("zero phantom classes") enforcement scope < its claim
inv-N-7 (N.md:190) asserts "every class name used in `demo/` resolves to a live rule," but the
fix list (N.W5.E + fold-ledger §5) names only the **3 V5-verified** phantoms
(`pastel-rainbow-text`, `glass-elevated`, `dashed-well`). `C1.md:32` (P1-2) documents a 4th
live phantom — `stagger-children` (`ComponentSliders.vue:4`, defined nowhere) — plus the
`:key`-forced full-remount cost it triggers. Not in the fix list. inv-N-7 as written would fail
its own audit on `stagger-children`.

### B3 [P2] inv-N-9 ("every continuous loop gates PRM") census excludes 4 live hero-lab RAF loops
inv-N-9 (N.md:194) cites "Verified census (E1): 8 RAF sites." Tree has **12** `requestAnimation
Frame` files (verified): the 8 main-app + **4 hero-lab** (`CanvasAtmosphereHero.vue`,
`WebGLAtmosphereHero.vue`, `CanvasTileHero.vue`, `WebGLTileHero.vue`). `E3.md:172` flags these
as "a separate experimental entry." If `demo/hero-lab/` is a shipped entry, inv-N-9's census is
undercounted by 4 un-audited loops; if it is dead, that should be stated (a kill, not a silent
census exclusion).

---

## C. WAVE-DAG / SEQUENCING DEFECTS

### C1 [P1] W6 needs W2.B (desktop `@source`), but the DAG only wires W6→W5→W1
N.md:150-155 DAG: "W6 needs W5"; W5 needs W1; **nothing sequences W2 before W6.** But N.W6.A's
own gate is "W0 gate = boot-green console-clean on **all 14 routes**" and `C9.md §5.1 Gate A`
states the per-pane wave "is worthless until moves 1-2 landed (desktop panes render)" — move 1
is the W2.B `@source` fix. Desktop panes are `display:none ≥1024px` until W2.B lands
(`C9.md §1.1`, K-baseline `browse-1440-light.png` fully blank). So the per-pane Fable audit at
1440×900 (C9 §5.2 mandates 1440 + 390 captures) **cannot run** while W2.B is outstanding, yet
W2 runs *parallel* to W1 with no edge to W6. Add W6 ⟵ W2.B to the DAG, or move desktop `@source`
into W1.

### C2 [P2] gh-pages-build "cohort-gated vs unilateral" left unreconciled; not a W1 gate
`E3.md F-2` rates the broken gh-pages build **P0** and states "**Tranche-N must treat the
deploy build as a gated cohort dependency, not a value.js-internal fix.**" `V1` resolves the
mechanism (FATAL #2 is local-dist-only, clean in published 3.12.0 — so a clean local dist or
3.13.0 pin fixes it unilaterally). The charter sides with V1 (treats W1 as fully unilateral) —
correct — but **never reconciles E3's standing P0 cohort claim**, and N.W1's gate
("demo mounts console-clean on a fresh server"; "e2e = green baseline") **does not include a
gh-pages build-success gate**, even though N.W4.F (CF-Pages) and N.W9 depend on a buildable
demo artifact. The deploy-build P0 is effectively folded into W1.C-by-implication but never
made an explicit gate; add `npm run gh-pages` success to a wave gate.

---

## D. COUNT / CITATION CONTRADICTIONS

### D1 [P1] withTransaction count: N.md cites D4 for "18→~13", but D4's own headline is 16
N.md:142 "right-size transactions **18**→~13 (… **D4**)". But `D4.md:8` states **"16 distinct
`withTransaction` call sites"** and walks deletions as 16→15→14 (`D4.md:35,88`). `V2.md:106`
and the tree agree on **18** (`grep 'services\.withTransaction(' minus comments = 18`,
verified). So the charter's number (18, correct) contradicts the lane it cites as authority
(D4=16). Reconcilable — V2's 18 is right; D4 conflated the 8-file `grep -rln` count — but the
citation points at the dissenting lane. Either re-cite V2 or annotate D4's error.

### D2 [P1] inter-lane conflict on Ask-3/CF-Pages "DISCHARGED vs OPEN" — A5 dissents, unrecorded
`A5.md:217-218` declares **"Ask 3 — rsync→git: DISCHARGED"** and **"Ask 5 — CF-Pages:
DISCHARGED"** (claiming `deploy.sh` already does git-push + webhook). `D3.md:201-202`,
`D6.md:269,278`, and `V3.md` say the opposite: `deploy-hook.sh` is **ABSENT** (verified:
`ls scripts/` → no deploy-hook.sh) and CF-Pages is un-CI'd → **OPEN** (N.W4.B/F). The charter
correctly sides with OPEN, but **no V-lane arbitrated this dispute** and the fold-ledger does
not record that A5 dissented and was overruled. The V-fleet's stated job was "settle every
inter-lane factual dispute"; this one slipped through.

### D3 [P2] cast-count breakdown: D1 says "25" but its own model breakdown sums to 26
`D1.md §1` headlines "exactly 25" yet its per-model breakdown is 18+5+2+1 = **26**, and D1
counts `forks.ts:191` (array) inside the Palette total while `V2.md:62-63` counts that line as
an *annotation* and `forks.ts:206` as the parenthetical 26th cast. The charter adopts V2's
"26 (incl. forks.ts:206)" — defensible — but the evidence base contains an internal arithmetic
contradiction (D1 "25" with a 26-sum) that was never flagged.

### D4 [P2] D1's "three (visibility,deletedAt,sortkey) compound indexes" reduced to one in N.W3.C
`D1.md:34 + §5 item 2` recommends **three** compound indexes (newest + voteCount + forkCount
sort variants), because all three sort paths filter `{deletedAt,visibility}` unindexed. N.W3.C
folds only **one** ("replace the lone `createdAt` with `{deletedAt,visibility,createdAt}`,
net-0"), leaving the popular/forks sort paths in-memory-filtered. The charter presents the
single-index fix as the complete scale fix; D1's evidence says the hottest sorts still lack
covering indexes. Partial fold presented as complete.

### D5 [P2] "37 distinct lanes" double-counts C8; "4 verification files" vs "5 lanes (V1–V5)"
`synthesis.md:25-26`: "**37 distinct lanes** … = 32 lane files + 4 verification files + C8v2."
But `C8.md` and `n-audit-C8v2.md` are **byte-identical** (verified `diff -q` → IDENTICAL; both
titled "LANE V4"), so there are 36 distinct contents, not 37. And `synthesis.md:15` says "5
lanes (V1–V5)" while line 26 says "4 verification files" — `n-verify-V4.md` **does not exist**
(verified `ls`); V4's content is the C8.md/C8v2 duplicate. So N.md:15/30, PROGRESS.md:40,42,
and synthesis cite "V4" as a primary-evidence source pointing at a nonexistent file (its content
lives in C8.md). Citation hygiene defect: every "V4" reference should read "C8.md/V4-redeploy."

### D6 [P2] txn target stated two ways within the charter: "~13" vs "≤14"
N.md:142 + fold-ledger §4 T7 say target "~13"; the N.W3 hard gate (N.md:142 tail) and
PROGRESS.md:14 say "≤14". A one-unit gate/target mismatch inside the same charter. Pick one.

---

## E. ITEMS CHECKED AND FOUND SOUND (no padding — recording the attack surface that held)

- B3 cache edges (var()-mutation staleness, unbounded memo growth, stale docstring) **are**
  folded — N.W7.B (`endpoint-cache fixes (B3)`). Not dropped.
- The mix-canvas LIVE PRM hole (`useMixingAnimation.ts:116,206`) **is** folded — N.W6.C +
  fold-ledger T16; E1's correction of the M-era watercolor framing is carried correctly.
- parse-that `^0.8.2`→`^0.9` (A4 rated P0) **is** folded — N.W7.A. (Critique: laundered to a
  one-liner with the P0 rating dropped, but it is dispositioned, so not a silent drop.)
- E6's phantom keyframes devDep, glass-ui devDep-stale, fourier-pin asks, the 3.13.0-gated pin
  — all folded and E6 §8 itself confirms "no contradiction found" with N.md.
- A4's 21 open kf items, MCI-5, `linear()`/`steps()` — folded into the N.W7.A 12-item ledger.
- V5's `Katex.vue`/`ImagePaletteExtractor`/`gold-shimmer` refutations — carried as
  REFUTED-KEEP correctly.
- Wave-parallelism claim (W2/W3/W4/W7 beside W1) is sound: the api lanes (W2.A/W3/W4) and the
  library lane (W7) genuinely don't touch the demo boot. **Exception:** W2.B (desktop `@source`)
  is a *demo* lane mis-filed under the "type hardening / unilateral api-capable" W2 — it both
  blocks W6 (finding C1) and is demo-visible, so it is not truly api-parallel-with-W1 the way
  the rest of W2 is.

---

## Bottom line
The charter is **sound-with-fixes**. The spine, the P0 folds, the supersede-M logic, and the
cohort/pin strategy hold under attack. The defects are concentrated in completeness (5 dropped
P1s: session-TTL, fork-count drift, extract population/dominance, extractor duplication,
EditDrawer dead-UI; + the picker label collision) and in two enforceability gaps (inv-N-3
scoped to 2 of 4 resolvers; the W6⟵W2.B DAG edge) plus citation/count drift (D4=16 vs charter
18; A5 deploy dissent unrecorded; V4-file nonexistent; "37 lanes" double-counts C8). None
sink the plan; all are addable as fold rows or DAG edges before ratification.
