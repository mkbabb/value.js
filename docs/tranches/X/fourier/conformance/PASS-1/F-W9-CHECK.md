# F-W9 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 1)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W9.md` (276 lines, 74,350 B)
**Corpus authority**: the 66 `fr-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` + the two in-tree carries `carry/F-W1-CARRY.md` (W1) and `carry/F-W4-CARRY.md` (W4)
**Measured**: 2026-08-28, read-only, against fourier `HEAD cd26c65` (28 dirty rows) and value.js `tranche-u`
**Verdict**: **DEFECTIVE** — 1 BLOCKER-weight escape · 3 MAJOR · 3 MEDIUM · 2 LOW

---

## §0 Method

The X·P terminal method: enumerate every adjudicated row **id** in the corpus whose terminal
disposition routes to F-W9 under **any** markup, then ask of each — is it carried as a row, folded
under a named identity, or excluded with a reason? Escapes are named by bytes.

**Markup census first** (so no routing form is missed):

```
$ ls fr-*.md | wc -l                          → 66
$ grep -o 'F\.W9'      fr-*.md | wc -l        → 54
$ grep -o 'F\.W9/W10'  fr-*.md | wc -l        → 54     (every occurrence is the paired form)
$ grep -l 'F\.W9/W10'  fr-*.md | wc -l        → 25 records
$ grep -o 'F\.W10'     fr-*.md | wc -l        →  0     (no bare-F.W10 routing exists)
$ grep -o 'W9'         fr-*.md | wc -l        → 54     (no F·W9 / F-W9 / bare-W9 variant exists)
```

The spec's §2.1 counts (54 / 25 / 0 / 66) **reproduce exactly**. There is exactly **one** routing
markup in the corpus, so no dotted or prose variant hides a row inside the registry. The escape hunt
therefore moves to (a) coverage-void rows in the 41 records that carry **no** F.W9 digraph, and
(b) the two authorized carry ledgers.

---

## §1 ID-KEYED CENSUS — the 54 F.W9 lines, classified

### §1a Boilerplate routing-law lines — **14**, mint zero rows (verified line-by-line)

| # | anchor | form |
|---|---|---|
| 1 | `fr-AdminAuditLog.md:31` | "Routing targets are the census lane taxonomy (… · F.W9/W10)" |
| 2 | `fr-AdminFlaggedPanel.md:38` | "Routing law: … **F.W9/W10** · **NO-WAVE-OWNER**" |
| 3 | `fr-AdminUserList.md:28` | "Routing law: … **F.W9/W10** · **NO-WAVE-OWNER** … **GLASS-OWNED**" |
| 4 | `fr-CanvasOverlayButton.md:36` | "Routing law (census lane taxonomy): … **F.W9/W10** close" |
| 5 | `fr-CoefficientsPanel.md:29` | "Routing law: … **F.W9/W10** …" |
| 6 | `fr-ContourPreview.md:30` | "The census taxonomy anchors: F.W0 … F.W9/W10" |
| 7 | `fr-EquationView.md:41` | "Routes: … **F.W9/W10** coverage · **GLASS-RELAY**" |
| 8 | `fr-FrequencyGraph.md:29` | "Routing law: … **F.W9/W10** …" |
| 9 | `fr-GalleryAdminBanner.md:33` | "Routing targets are the census lane taxonomy (… F.W9/W10)" |
| 10 | `fr-GalleryView.md:30` | "F.W* targets follow the census lane taxonomy (…)" |
| 11 | `fr-HarmonicLevelGrid.md:36` | "Routing per the census lane taxonomy (…)" |
| 12 | `fr-InfoCard.md:33` | "Routing per the census lane taxonomy (…)" |
| 13 | `fr-PaperView.md:35` | "Routes: … **F.W9/W10** coverage · **GLASS-RELAY** · **LATEX-RELAY**" |
| 14 | `fr-VisualizationView.md:39` | "Routing: … **F.W9/W10** close · **NO-WAVE-OWNER**" |

Spec §2.1 claims 14 boilerplate lines minting zero rows. **CONFIRMED.** §5's exclusion row
("The 14 boilerplate routing-law lines … Boilerplate **mints no rows**") is correct.

### §1b Verdict-prose / dissent-record mentions — **14**, dated adjudication bytes, mint zero rows

`fr-AdminAuditLog:142` · `fr-AdminFlaggedPanel:169` · `fr-App:142` · `fr-ContourPreview:137` ·
`fr-EquationModeToggle:93` · `fr-EquationResult:127` · `fr-GalleryAdminBanner:122` ·
`fr-GallerySearchBar:124` · `fr-PaperArticleWindow:157` · `fr-PaperArticleWindow:186` ·
`fr-PaperArticleWindow:247` · `fr-PaperArticleWindow:254` · `fr-PaperSidebar:124` · `fr-PaperView:214`

Spec §2.1 splits this residue as "2 same-identity restatements · 12 verdict-prose mentions"
(= 14). This check's split is 3 restatements (`fr-App:142` C-13 · `fr-EquationModeToggle:93`
FR-EMT-11 dissent · `fr-PaperArticleWindow:186` R2-7→PAW-50) + 11 verdict prose. **The bucket
boundary differs by one; the residue total (14) and the minted-row total (26) are identical, and
every one of the three restatement bytes is carried in the spec's own cells** (App C-13 four-wave
chain · FR-EMT-11's dissent quoted verbatim · PAW-50 booked). **No row escapes on this seam** —
recorded as a taxonomy nuance, not a defect.

### §1c THE 26 MINTED IDENTITIES — id-for-id booking table

`14 + 14 + 26 = 54` ✓. All 26 traced to a banked id at a live anchor (anti-rename verified: every
id below was re-grepped in its own record).

| # | record : line | banked identity | terminal cut | carried in F-W9? | receipt |
|---|---|---|---|---|---|
| 1 | fr-AdminAuditLog:87 | **AA-44** | F.W9 | **BOOKED** row | §2.2 r1; §2.3 S1; G-F9-3 |
| 2 | fr-AdminFlaggedPanel:95 | **FR-AFP-42** | F.W9 (test seat) | **BOOKED** row | §2.2 r2; §2.3 S1 seam-before-seat; §4a-5 |
| 3 | fr-AdminFlaggedPanel:110 | **FR-AFP-49** | F.W9 | **BOOKED** row + dissent | §2.2 r1 dissent verbatim, r2; §2.3 S1 |
| 4 | fr-App:91 | **C-13 (App)** | F.W9 | **BOOKED** row | §2.2 r3; §2.4; §4a-4 |
| 5 | fr-ContourPreview:71 | **38** | F.W9 | **BOOKED** row | §2.2 r4; §2.4 (both flagship cures REFUTED) |
| 6 | fr-EquationModeToggle:41 | **FR-EMT-11 (= C-16)** | F.W9 | **BOOKED** row + dissent | §2.2 r5; §2.3 S2; G-F9-5/-6 |
| 7 | fr-EquationResult:41 | **FR-EQR-6** (axe leg) | F.W9 | **BOOKED** row | §2.2 r6; §2.3 S2; G-F9-5 |
| 8 | fr-EquationResult:72 | **FR-EQR-31** | F.W9 | **BOOKED** row | §2.2 r6; §2.3 S2 |
| 9 | fr-EquationView:62 | **D·D-B2** (axe leg) | F.W9 | **BOOKED** row | §2.2 r7; §2.3 S2; §4a-6 |
| 10 | fr-EquationView:191 | **C·D-28** | F.W9 | **BOOKED** row | §2.2 r7; §2.3 S2; G-F9-6 |
| 11 | fr-FunctionInput:80 | **C-13 = D-24** | F.W9 | **BOOKED** row (distinct-id lock) | §2.2 r8; §2.4 "never merged" |
| 12 | fr-GalleryAdminBanner:49 | **GAB-10** (coverage half) | F.W9 | **BOOKED** fold-by-ref → AA-44 | §2.2 r9; §2.3 S1 |
| 13 | fr-GalleryCardModal:93 | **GCM-42 (= L-14)** | F.W9 | **BOOKED** row + F.W1 lock | §2.2 r10; §2.3 S4; G-F9-9/-10; §4a-9 |
| 14 | fr-GallerySearchBar:54 | **FR-GSB-17** | F.W9 | **BOOKED** row | §2.2 r11; §2.3 S4; G-F9-7 |
| 15 | fr-GalleryView:78 | **FR-GV-36 (= L-24)** | F.W9 | **BOOKED** row | §2.2 r12; §2.3 S4; G-F9-7 |
| 16 | fr-ImageUpload:61 | **27** | F.W9 | **BOOKED** row (15/6 pair quoted) | §2.2 r13; §2.3 S5; §4a-8 |
| 17 | fr-PaperArticleWindow:58 | **PAW-12** (rider limb) | F.W9 | **BOOKED** row | §2.2 r14; §2.4; G-F9-14 |
| 18 | fr-PaperArticleWindow:90 | **PAW-34 (= C-i-5)** | F.W9 | **BOOKED** row | §2.2 r14; §2.3 S3 |
| 19 | fr-PaperArticleWindow:199 | **PAW-49** | F.W0 ⟨re-cut⟩ | **CARRIED for parity, reasoned** | §2.2 r15; §2.6 r1; §5 r2 |
| 20 | fr-PaperArticleWindow:200 | **PAW-50** | F.W4 ⟨re-cut⟩ | **CARRIED**, execution booked | §2.2 r16; §2.4; §2.6 r2; §5 r4 |
| 21 | fr-PaperSidebar:49 | **D-B2** (axe leg) | F.W9 | **BOOKED** row | §2.2 r17; §2.3 S3; G-F9-4 |
| 22 | fr-PaperSidebar:58 | **C-M4** | F.W9 | **BOOKED** row (distinct mechanism) | §2.2 r18; §2.3 S4; G-F9-7 |
| 23 | fr-PaperSidebar:67 | **M7** | F.W9 | **BOOKED** row (MG-θ identity lock) | §2.2 r19; §2.4; G-F9-2 |
| 24 | fr-PaperView:120 | **D/i-1** | F.W9 | **BOOKED** row + coupled lock | §2.2 r20; §2.3 S3; §4a-10 |
| 25 | fr-Tooltip:26 | **FR-TT-1** | F.W10 ⟨re-cut⟩ | **CARRIED**, promotion lock binds | §2.2 r21; §2.6 r3; §5 r5; G-F9-22 |
| 26 | fr-UserSlugBar:53 | **FR-USB-16 (≡ r1-MISSED-5 ≡ r2-MISSED-1)** | F.W9 | **BOOKED** row + dissent | §2.2 r22; §2.3 S4/S5; §4a-8 |

**26 / 26 BOOKED.** Zero escapes among the digraph-routed identities.

### §1d Seven zero-row records (spec claim verified)

25 records carry the digraph; 18 mint identities; **7 mint none** — `fr-AdminUserList` ·
`fr-CanvasOverlayButton` · `fr-CoefficientsPanel` · `fr-FrequencyGraph` · `fr-HarmonicLevelGrid` ·
`fr-InfoCard` · `fr-VisualizationView`. Spec §2.1's "Seven records yield zero re-cut rows"
**CONFIRMED**. Two of the seven nevertheless carry REAL rows that enter **by mechanism** (below).

### §1e By-mechanism entrants — **5**, all present, all anchors live

| entrant | anchor | verified byte | carried? |
|---|---|---|---|
| **FR-AUL-16** | `fr-AdminUserList:54` | "The product's only cascade-delete surface has zero automated coverage of any kind… 'Un-harnessable by construction' killed (ruling 3e)" | **BOOKED** §2.2 entrant 1; §2.4; §2.6 r4; §5 |
| **FV-26** | `fr-FullscreenViewer:79` | "the only e2e 'Fullscreen' hit is a comment (gallery.spec.ts:113, seat grep)" | **BOOKED** §2.2 entrant 2; §2.3 S5; G-F9-11 |
| **FR-COB-20** | `fr-CanvasOverlayButton:74` | "no test anywhere (`web/e2e` 8 specs, zero references)… dies with the file" | **BOOKED** §2.2 entrant 3; §2.4 (HOLD is RED) |
| **FR-AH-45** | `fr-AppHeader:108` | zero props/emits/slots, no contract (NO-WAVE-OWNER) | **BOOKED** §2.2 entrant 4; §2.3 S5; G-F9-12 |
| **PAW-33** | `fr-PaperArticleWindow:89` | "Peer ranges silently violated… **→ F.W1 ledger** (pin-truth row)" | **CARRIED for parity** §2.2 entrant 5; §2.6 r5; §5 |

Cross-check of the FV-27 teleport lock: `grep -rln '<Teleport' web/src/` → exactly two files,
`paper/search/PaperSearchModal.vue` and `visualization/FullscreenViewer.vue`. **Lock is REAL.**

### §1f Escape hunt in the 41 records carrying NO F.W9 digraph

Every coverage-void row in a non-F.W9 record was re-grepped for its terminal cut. **All route
elsewhere; none is a silent F.W9 orphan:**

| row | record | measured terminal cut |
|---|---|---|
| FR-GFC-27 = L-15 | fr-GalleryFeaturedCarousel:64 | **→ F.W4** (test rider on the cure wave) |
| M-4 | fr-EditorControlsDock:86 | **→ F.W4** (repair wave's born-RED harness) |
| SS-L-09 | fr-SpeedSelect:60 | **→ F.W4** (un-fixme rides F.W3 menu re-home) |
| L-4 / D-15 / C-M3, D-10 | fr-SvgFilters:44-45 | **→ F.W3/W4** |
| m-8 = L-11 = C-14 | fr-CollapsibleSection:65 | **→ F.W3/W4** |
| i-2 = C-I6 | fr-CoefficientsSpectrum:98 | **→ F.W3/W4 rider + SS-13** |
| M-5 / C-12 / L-M-5 / D-i3 | fr-PaperSearchInput:71 | **→ F.W3/W4** (fold → banked L-11) |
| i-3 = D-i1 | fr-MobileFloatingToc:91 | **→ F.W3/W4** |
| D-L13 | fr-ConvergenceLegend:102 | **→ F.W4** |
| L-12 / C-12-coverage | fr-GalleryInfiniteGrid:81 | **→ F.W4 test rider + F.W0 rider** (fold → FR-GFC-27) |
| GM-F12 = D-18 | fr-GalleryMarquee:40 | **→ FR-GFC-27** (fold) |
| **PP-NOTEST (L-13)** | fr-PathPreview:52 | **→ F.W0** |
| K-1 coverage half | fr-DarkModeToggle:118 | both readers' coverage claims **KILLED/RATIFIED** |

**Zero escapes from the registry.** The 66-record corpus is fully accounted: 26 booked +
5 entrants + 14 boilerplate + 14 prose = the whole F.W9 surface.

### §1g THE ESCAPE — `F-W1-CARRY.md` cross-edge 9

The trial's second authority is the pair of in-tree carries. `F-W4-CARRY.md:555` publishes an
F.W9/W10 lane row and **all four of its items are booked** (axe on `/paper` = PS D-B2 ✓ ·
admin-mode e2e = AA-44/GAB-10 ✓ · PaperSidebar Collapsible-root guard re-key = PS C-M4 ✓ ·
`resolveFigure` set-equality = PAW-12 ✓; harness-before-rider / flag-before-split both carried ✓).

`F-W1-CARRY.md:246` publishes a second, **independent** F.W9 edge — and it is **nowhere in F-W9**:

> 9. **F.W1 → F.W9 / F.W10.** The visual-regression checkpoint set the uplift mints with no
> typecheck signal: `--shadow-cartoon` sign flip · `cartoon-surface` hover loss across 21 sites ·
> the `.disclosure-content` body register · the tooltip re-proportion · GCM-22's `p-0` insets ·
> the Badge rim · FR-CP-13's fused-card gap · the `text-admin-label` reversion. Plus the SS-13
> residues each record names.

Measured in **both twins**:

```
term                    F-W9.md   F-W10.md
--shadow-cartoon           0          0
cartoon-surface            0          0
visual-regression          0          0
GCM-22                     0          0
.disclosure-content        0          0
tooltip re-proportion      0          0
Badge rim                  0          0
text-admin-label           0          0
FR-CP-13                   0          0
```

F-W9 §4b's F.W1 cross-edge enumerates consequences (i)–(v) — the console-guard lock, the
console-error reading, AA-2's 37-file break surface, the FR-GIG-5 non-credit, the G33 pin leg —
and **not one of them is the visual-regression checkpoint set**. §5 (the exclusion table, which
opens "**zero CARRY rows among them**") carves nothing here either. Eight named items, routed by
an authorized in-tree carry directly at F.W9/F.W10, are **silently dropped by both halves of the
split**. This is the exact M-25 failure the spec's own binding-law block forbids.

**ESCAPED (8, by bytes)**: `--shadow-cartoon` sign flip · `cartoon-surface` hover loss across 21
sites · the `.disclosure-content` body register · the tooltip re-proportion · GCM-22's `p-0`
insets · the Badge rim · FR-CP-13's fused-card gap · the `text-admin-label` reversion.

### §1h Census totals

| quantity | value |
|---|---|
| routed to F-W9 (all authorities) | **39** |
|  — registry digraph identities | 26 |
|  — by-mechanism entrants | 5 |
|  — `F-W1-CARRY.md:246` checkpoint-set items | 8 |
| **booked** (row · named fold-identity · exclusion-with-reason) | **31** |
| **escaped** | **8** |
| registry-side escapes | **0** |
| carry-side escapes | **8** |

---

## §2 NO INVENTION / M-25 DEPTH

### §2a Anti-rename — every carried id traces to a banked id

All 26 identities + 5 entrants were re-grepped in their own records at the cited line. **31/31
resolve.** No id is re-booked under a new name; the alias law at :5 ("Banked ids keep their
identity for life; nothing below is re-booked") holds in fact. The three distinct-id locks are
each stated and each is real: App C-13 ≠ FunctionInput C-13 (two records, two rows) · FR-AFP-42
(testability) ≠ AA-44 (coverage) · C-M4 (wrong element's `data-state`) ≠ FR-GSB-17/FR-USB-16.

### §2b Named cure-shape locks / sequencing riders — where their rows land

| lock | required | present in F-W9? | receipt |
|---|---|---|---|
| **fr-PaperSearchModal same-commit riders** (D-1 + D-3 + `outline:none`) | carried, homed F.W3/W4 | **CARRIED** | §4a-12 first clause |
| **PAW-44 / LAW-3** restore-only-with-background-cure | carried | **CARRIED** | §4a-12; §2.2 r17 + §2.3 S3 ("runs AFTER PAW-1's cure + the PAW-44 scrollport decision") |
| **MPC-31 one-cut law** (MPC-3⊕10⊕13⊕8⊕22) | carried | **CARRIED** | §4a-12 |
| **FR-MSP-6 two-channel lock** | carried | **CARRIED** | §4a-12 |
| **FR-NP-32 corrupt-dist sequencing gate** | carried | **CARRIED** in substance | G-F9-20 M1 leg (the 4.0.0 dist `postcss.parse` → 35 nodes / zero valid `@source` / garbage at-rule at :203–222); §4a-2; §4b F.W0 edge. **The `FR-NP-32` id itself is not quoted** — the mechanism is carried under M1's F.W0 identity, which is the correct home. |
| **F.W3's four named anti-cures** | carried | **CARRIED** | ContourPreview 38's two REFUTED flagship cures (§2.2 r4, §2.4) · FR-AH-30's reversed rank-5 remedy (§2.2 entrant 4) · GAB-29 MetricPill "the falsifier that keeps the wave off two dead primitives" (§4b SS-3/SS-4) · fr-App C-12 as a NEGATIVE record (§4b) |
| **F.W4's derivation-law preamble + NEGATIVE ROSTER** | carried | **CARRIED** in substance | FR-CP-43/-44/-45 verbatim law ("take D's CLAIMS and L/C's LINES; re-resolve every anchor") at §4b SS-3/SS-4, honoured at §2.8 C-4; the negative roster surfaces as `fr-App C-12` (API-inert, "do not manufacture work") + `GAB-29` + the two REFUTED ContourPreview cures + FR-AH-30's reversal. §5 is a full 17-row reasoned exclusion table. |

### §2c Dissents CARRIED, not merely cited

Four dissents are quoted **verbatim**, not name-dropped:

1. **FR-AFP-49** (§2.2 r1) — "every row above incl. all four blockers is invisible to every gate
   the repo runs"; INFO ruled a scope convention (L-9.1), "never 'the debt is small'". Verified
   against `fr-AdminFlaggedPanel:110`.
2. **FR-EMT-11 / reader-2's MAJOR** (§2.2 r5) — "every other row in this record is ungated because
   of it" + "so the F.W9/W10 close cannot treat the MINOR as a statement that coverage debt is
   small." Verified byte-for-byte against `fr-EquationModeToggle:93`.
3. **FR-USB-16** (§2.2 r22) — "r2 graded MINOR; overruled at the ruling table". Verified against
   `fr-UserSlugBar:53`.
4. **worker-DU on GAB-13** (G-F9-20) — "the fleet has already elected to treat the working tree as
   the scope", with the honest conditional ("if F.W0 adopts the worktree as baseline, GAB-13
   discharges to a disclosure line and DU's grading was right all along").

Also carried: LC's MINOR sustained at R-2 (PAW-12) · DU's BLOCKER on GCM-4 + the SR composite
(GCM-4∘16∘17∘6/8) · the RE-CUT-0 boilerplate-mints-no-rows dissent. **Dissent handling is
exemplary — no defect on this axis.**

### §2d Invention check — one spec-authored anchor is INVENTED

`fr-PaperArticleWindow:58` (the PAW-12 row) states the literal with a **bare** anchor:

> `TRANSCODED_FIGURES = new Set(Object.keys(FIGURE_DIMENSIONS))` **(:52, sole assignment)**

**G-F9-14** (spec-authored §3 prose, not spliced) attaches a filename the registry never gave it:

> `TRANSCODED_FIGURES = new Set(Object.keys(FIGURE_DIMENSIONS))` (**`PaperArticleWindow:52`**, sole assignment)

Measured read-only at `cd26c65`:

```
$ grep -rn "TRANSCODED_FIGURES" web/src/
web/src/lib/figureDimensions.ts:52:const TRANSCODED_FIGURES = new Set(Object.keys(FIGURE_DIMENSIONS));
web/src/lib/figureDimensions.ts:56:    return TRANSCODED_FIGURES.has(pngFilename);
```

`PaperArticleWindow.vue` carries **zero** hits. The literal already lives in
`lib/figureDimensions.ts` — the very file §1b names as PAW-50's *relocation target*. The gate
therefore points its only witness at a file that does not contain the thing it gates, and it does
so **in the same spec that authors the FR-CP-45 law** ("re-resolve every anchor before quoting
into a wave spec", §2.8 C-4). Self-violating. (`resolveFigure` itself IS at
`PaperArticleWindow.vue:44`, so the "trapped in the SFC" half of the row is sound; the conflation
is between the two files.)

---

## §3 GATES — born-RED with a REAL witness (L-19)

All 22 gates are stamped RED. Every named path and command was executed read-only. **20 of 22
witnesses reproduce exactly.**

| gate | witness verified? | receipt |
|---|---|---|
| G-F9-1 harness | **✓** | scripts = `dev,build,preview,test:e2e,test:e2e:ui` exactly; `devDependencies.vitest` → undefined; no `vitest.config.*`; `find web/src -name '*.test.ts' -o -name '*.spec.ts'` → 0 |
| G-F9-2 lint floor | **✓** | `ls web/ \| grep -iE 'eslint\|oxlint\|biome'` → 0; no `lint` script |
| G-F9-3 admin tab + axe | **✓** | `grep -rln "admin" web/e2e/ \| wc -l` → 0 |
| G-F9-4 axe on `/paper` | **✓** | `grep -rln AxeBuilder web/e2e/` → exactly 2 (`visualization-ux.spec.ts`, `visualization-crud.spec.ts`); `paper-performance.spec.ts:38` = `page.goto("/paper", …)` — the "`/paper` IS navigated" correction is TRUE |
| G-F9-5 axe on `/equation` | **✓** | `@axe-core/playwright` = `^4.11.3` in devDeps; `checkA11y` helper at `visualization-ux.spec.ts:26-43` reads `withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"])` + serious/critical filter — exactly as quoted |
| G-F9-6 `/equation` assertion | **✓** | `grep -rn "/equation" web/e2e/` → ONE hit, `visual-baseline.spec.ts:34: { slug: "equation", path: "/equation" }` — an assertion-free slug |
| G-F9-7 vacuity | **✓** | `gallery.spec.ts:57-63` `if (await filterToggle.isVisible())`; `:66-82` body inside `isVisible().catch(() => false)`; `:49-53` `.glass-dock` branch with `grep -rn glass-dock web/src/` → **0**; `:19-22` the `.or()` mask — all four reproduce byte-for-byte |
| G-F9-8 fixme keystones | **⚠ partial** | see LOW-1 |
| G-F9-9 card/modal opened | **✓** | `gallery.spec.ts` modal/dialog/card/"Open Visualizer" → 0 |
| G-F9-10 console guard | **✓** | error-only + 404 filter confirmed |
| G-F9-11 fullscreen | **✓** | `gallery.spec.ts:113` is a **comment** ("…overlay affordance; \"Fullscreen\" is always present."); `<Teleport` → exactly 2 sites |
| G-F9-12 header nav/logo/toggle | **✓** | `paper-performance.spec.ts:328` = `getByRole("button", { name: /switch to dark mode/i })`; `:329` = `waitForTimeout(250)` — both exact |
| G-F9-13 coarse matrix | **✓** | `playwright.config.ts:46-51` = `projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }]` — one project, exact anchor |
| G-F9-14 figure set-equality | **✗** | phantom coordinate — §2d above (MAJOR) |
| G-F9-15 deploy-of-record | **✓** | `scripts/deploy-hook.sh` exists (11,746 B, executable); MEASURE-AT-OPEN posture is the honest form for an unmeasurable host SHA |
| G-F9-16 inv-28 fail-closed | **✓** | `deploy-pages.yml` carries the named "inv-28 gate" with the three-clause `if:` (`conclusion == 'success'` ∧ `head_branch == 'master'` ∧ `event == 'push'`); `grep -c 'conclusion\|workflow_run\|gh run\|inv-28' scripts/deploy-hook.sh` → **0**. Asymmetry CONFIRMED |
| G-F9-17 run id (inv-27) | **✓** | `docs/tranches/M/PROGRESS.md` — M.W2/W3/W4/W11 all `planned` |
| G-F9-18 CWV order-lock | **✓** | FR-AH-1's 450,631 B / 82.5 % / 75,210 B figures trace to `fr-AppHeader:42`; FR-AH-7 348,707 B at `:53` |
| G-F9-19 containerization | **✓** | `web/Dockerfile` = **43 lines**; `COPY assets/ public/assets/` at **:24**; six-file `COPY paper/fourier_paper.*` at **:26-29**; `FROM nginx:alpine AS production` at **:31**; printf block **:33-43**; `nginx/fourier.conf` = **72 lines**; both `infra/apache/*.template` present. **Every C-4 correction is right and every CARRY anchor it corrects was wrong** |
| G-F9-20 SHA on a parsing substrate | **✓** | fourier `git status --porcelain \| wc -l` → **28**, exact |
| G-F9-21 Δ=∅ twin table | **✓✓** | **independently proven**: extracted §2.2 from both files, isolated the 22 table rows, `difflib.unified_diff` → **0 diff lines**. The "spliced, never retyped" claim is TRUE. `F-W10.md` contains "F.W10 does not author F.W9" (×2) |
| G-F9-22 FR-TT-1 promotion | **✓** | `fr-Tooltip:26` carries the 17-count (Editor ×10 · Canvas ×6 · Wand2 ×1) and the "BLOCKER at any F.W9/W10 axe close-gate" note |

**L-19 proof-farm check**: no gate invokes a script that does not exist. Every falsifier is an
artifact-or-behaviour predicate (an axe run, a seeded mismatch, a `docker inspect` on a running
stack, a deliberate deletion reddening a spec, a run id). **Zero contrivance scripts. L-19 CLEAN.**
G-F9-7's falsifier ("a deliberate deletion of the search bar / slug bar reddens its spec") and
G-F9-2's ("fails on a seeded violation") are genuine mutation falsifiers, not greppable proofs.

**Path-existence check on §1b's EXECUTION bounds**: `web/package.json` ✓ · `web/playwright.config.ts` ✓ ·
`web/e2e/{gallery,visualization-ux,visualization-crud,visual-baseline,paper-performance}.spec.ts` ✓ ·
`web/src/lib/figureDimensions.ts` ✓ (MODIFY is correct — the file exists) ·
`.github/workflows/{ci,deploy-pages}.yml` ✓ · `scripts/{deploy-hook,pages-deploy}.sh` ✓ ·
`web/Dockerfile` ✓ · `api/Dockerfile` ✓ · `docker-compose{,.prod}.yml` ✓ · `nginx/fourier.conf` ✓ ·
`infra/apache/{api-vhosts,deploy.babb.dev}.conf.template` ✓ · `docs/tranches/M/PROGRESS.md` ✓.
`web/vitest.config.ts` and `web/eslint.config.js` are marked **CREATE** and correctly do not exist.
**Zero phantom paths in the bounds.** The one mis-anchor is `ci.yml`'s third job (MEDIUM-2).

---

## §4 E-3 + STATUS

| requirement | result | receipt |
|---|---|---|
| zero VERIFIED stamps | **PASS** | `grep -on VERIFIED` → 2 hits, both negative-posture: `:15` "VERIFIED **NO**" and `:275` "**VERIFIED is F.W10's close to stamp, never this one's**" |
| status planned everywhere | **PASS** | `:3` "status: planned"; `:15` "status stays `planned`"; `:275` "Until then: **planned**" |
| no execution verbs in current voice | **PASS** | every act is subjunctive/conditional ("would have caught", "must", "lands", "at execution"). The only indicative verbs are read-only measurement ("re-measured read-only 2026-08-28") and the `IMPLEMENTED` stamp is future-conditional ("When G-F9-1..22 are GREEN … F.W9 stamps") |
| opens no product source | **PASS** | `:15` "nothing opens product source until the owner's begin-word"; §5 final row makes it an exclusion. Read-only measurement is disclosed on its face and is permitted |
| fourier tree READ-ONLY in every witness | **PASS** | §1b carries an explicit **WRITE-SEAT DECLARATION** — "COMMISSION §2 makes fourier-tree writes **asked, never made**… These bounds are therefore a **claim of ownership over the change**, not a licence to write… **no seat presumes (b)**". `deploy-pages.yml` marked **READ**, `docs/tranches/M/PROGRESS.md` marked **ASK-ONLY**, the registry marked read-only at §1c/§5 |
| E-3 addenda-beside-not-patch | **PASS** | §1a row 2 — "Addendum-**beside** (E-3): the dated `CENSUS-2026-08-03.md` bytes are never rewritten"; §1c — "`INTAKE-ADJUDICATION-2026-08-03.md` (dated; amended beside only)"; §2.8 is itself an errata-beside table; §5 — verdict prose "dated adjudication bytes, immutable, annotated by the addendum only" |
| E13 mail | **PASS** | binding-law block + §1a row 3 APPEND-ONLY + close act |

**§4 is CLEAN.** This axis is the spec's strongest.

---

## §5 POSTURE AXES

### §5a F.W1 atomicity — **partial**

F-W9 does not let any limb land separately, and §4a-3 correctly quotes F.W1's headline. But
`F-W1.md:276` §4.4 defines the transaction as **eight** limbs:

> producer bump (glass + keyframes + value, lockstep per MPC-14) + 162-attribute Button rewrite
> (G8-preserving) + `copied`→`status` triple + lucide rename (35 imports…) + G10 disclosure
> deletions + **FR-EQC-7 vaul-vue manifest gate** + G13 manifest/lock moves + PP-REDGATE ambient
> declaration + FR-CP-13's gap decision

F-W9 §4a-3 restates **three**. Measured in F-W9: `vaul` → **0** · `RE-PIN` → **0** ·
`CSS-class census` → **0** · `FR-CP-13` → **0**. F-W1 itself carries `vaul` ×4 and `RE-PIN` ×4 and
publishes the P0 CSS-class census as `§WU-D / G5`. F-W9 defers explicitly ("that lock lives in
F.W1's spec, restated here so F.W9 never books it either"), so this is a **narrowed restatement**,
not a licence to split — LOW.

### §5b F.W0 pre-gates precede everything — **FAILS on the anchor/denominator tables (MAJOR)**

The pre-gate ordering itself is correctly bound (§4a-2 is a full enumeration; G-F9-20 is its
witness; §4b's F.W0 edge is present and reciprocal-owed). But `F-W0.md` publishes two gates whose
GREEN clause makes them **quotation obligations on every later wave**:

```
F-W0.md:199   ### G-11 — ONE corrected anchor table published; every later wave quotes it
F-W0.md:209   ### G-12 — ONE corrected-denominator table published; superseded figures FORBIDDEN downstream
              GREEN: … "Every later wave cites this table rather than a challenge file."
```

```
$ grep -c 'G-11\|G-12\|anchor table\|denominator table' F-W9.md   →  0
```

F-W9 quotes **neither**. Instead §2.8 **C-4** mints its **own** anchor-correction table under its
own law (FR-CP-45), and §2.2/§2.3/§3 re-quote denominators G-12 already owns — 8 specs · 15/6 ·
17 icon-only triggers · 2 Teleport sites · 54/25/66 · 28 dirty rows. G-12's RED witness even
resolves the same 8-spec denominator ("**8 `e2e/*.spec.ts` — the CARRY's '7' is RETRACTED at the
fold seat, 2026-08-28**") while F-W9 §2.8 **E-1** re-derives the same number against a different
contradiction (8 vs 9) with no reference to G-12. Under F-W9's own binding law — KF.W4(c) "read
every declared predecessor authority, never allowlist" and "**a gate may not re-derive its own
oracle**" — this is a self-violation: the spec allowlisted nine F.W0 items and skipped the two
that bind it hardest.

### §5c F.W0 G-9 seat vs G-F9-1 — **double-booking risk (MEDIUM)**

```
F-W0.md:189   ### G-9 — A unit-runner SEAT exists (the FLOOR's scope belongs to F.W9/W10)
              GREEN: a runner is installed, wired into `ci.yml`, and inside G-8's type scope,
                     with ONE asserting spec proving the seat live.
```

**G-F9-1's falsifier is the same predicate**: "`npm test` exists, vitest is a devDependency, ≥1
assertion runs in CI." F-W9 states the harness chain as **decision F.W4 · execution F.W9 ·
terminal record F.W10** in three places (§2.4, §4a-4, §4b F.W10) with **no F.W0 leg anywhere**.
§1d ("Explicitly NOT owned") carves `web/tsconfig.json` to F.W0 but not the runner seat. Two waves
green on one act with no disjointness sentence — the same class of collision §1a row 2 defused for
the census addendum ("two waves cannot both create one file") and left undefused here.

### §5d SS-4 waves flag owner rulings INLINE — **PASS**

§4b's F.W5–W8 edge is an exemplary both-ends declaration: "**SS-4's owner rulings are FLAGGED
INLINE, never presumed**: trie-vs-KISS (the documented anti-tree guardrail at `atomdiff.py:12-14`
is the **INCUMBENT** — dissent recorded), remix-vs-fork, born-visibility, visibility-enum,
version-`_id`, redaction parity, pagination idiom." Nothing is presumed. The inv-28 gate is
explicitly fenced off from the API contract in **three** places (§2.5 M.W3, §4b, G-F9-16). The
TA-4 prerequisite and the void-co-signature consequence are stated. OG-F1/OG-F2 and OG-V1/V2/V3
are named as owner-gated and never presumed.

### §5e F.W10's SPLIT gate stays honestly split — **PASS**

G-F9-21 ≡ G-F10-6 is declared a twin; "**neither spec stamps before this closes**" appears at
§2.1, §3 and §4a-1. The Δ=∅ claim is **independently proven true** by diff (§3 above). §2.8 E-1
discloses a defect **inside the shared bytes** and refuses to fix it unilaterally ("**No byte in
the region is edited to fix deixis** — G-F9-21 forbids a unilateral touch"), carrying the table
*including the defect* rather than breaking the twin. §2.8 E-0 discloses that three cells read from
F.W10's seat. This is the honest form, and it is the best-executed axis in the spec.

---

## §6 DEFECT REGISTER

| # | sev | claim | receipt |
|---|---|---|---|
| **1** | **BLOCKER** | `F-W1-CARRY.md:246` routes an 8-item visual-regression checkpoint set to F.W9/F.W10; **neither twin carries, folds, nor excludes any of it** — a silent drop from an authorized in-tree carry | `F-W1-CARRY.md:246` "**F.W1 → F.W9 / F.W10.** The visual-regression checkpoint set…"; in F-W9.md **and** F-W10.md: `shadow-cartoon` 0 · `cartoon-surface` 0 · `GCM-22` 0 · `disclosure-content` 0 · `Badge rim` 0 · `text-admin-label` 0 · `FR-CP-13` 0 · `visual-regression` 0. §4b's F.W1 edge lists (i)–(v), none of them this; §5 carves nothing |
| **2** | **MAJOR** | **G-F9-14's witness is a phantom coordinate** — it attributes `TRANSCODED_FIGURES` to a file that does not contain it, violating the FR-CP-45 law the same spec authors | F-W9.md:198 "(`PaperArticleWindow:52`, sole assignment)" vs `grep -rn TRANSCODED_FIGURES web/src/` → `web/src/lib/figureDimensions.ts:52` and `:56` only; `PaperArticleWindow.vue` → 0 hits. Registry gives a **bare** `:52` (`fr-PaperArticleWindow:58`); the filename is spec-added |
| **3** | **MAJOR** | **F.W0 G-11 disobeyed** — "ONE corrected anchor table published; **every later wave quotes it**". F-W9 quotes it nowhere and mints a rival anchor table at §2.8 C-4 | `F-W0.md:199`; `grep -c 'G-11\|G-12\|anchor table\|denominator table' F-W9.md` → **0** |
| **4** | **MAJOR** | **F.W0 G-12 disobeyed** — "Every later wave cites **this table** rather than a challenge file". F-W9 re-derives the denominators G-12 owns (8 specs · 15/6 · 17 · 2 Teleports · 28 dirty), and §2.8 E-1 re-litigates the 8-spec count G-12 already settled — a gate re-deriving its own oracle, against KF.W4 as quoted in F-W9's own binding law | `F-W0.md:209` GREEN clause + its RED witness "**8 `e2e/*.spec.ts` — the CARRY's '7' is RETRACTED at the fold seat, 2026-08-28**"; F-W9 §2.8 E-1 derives 8 independently, citing F-W10 §2.2, never G-12 |
| **5** | **MEDIUM** | **The "F.W9 intake CARRY" is a phantom ledger** — cited 12× as the consumed authority and as the source being corrected, with no path, and no such file in tree | `ls docs/tranches/X/fourier/carry/` → `F-W1-CARRY.md`, `F-W4-CARRY.md` **only**. F-W9 cites "the F.W9 intake CARRY … 36 rows · 22 gates · 13 cross-edges" (:3), "the CARRY's `waves/W9.md` name" (:5), "the CARRY's three value-side `boundsFiles`" (:33), "CARRY cites `:35`" (:48), "CARRY cites :31-42" (:58), "**C-1** (CARRY correction…)" (:171), "CARRY cites :20-25 … :48" (:174). Every §2.8 correction is un-auditable against its stated source |
| **6** | **MEDIUM** | **F.W0 G-9 seat leg omitted → double-booking risk.** G-F9-1's falsifier is byte-equivalent to F.W0 G-9's GREEN clause, yet F-W9's harness chain names only F.W4→F.W9→F.W10 in all three statements and §1d carves nothing | `F-W0.md:189` "G-9 — A unit-runner SEAT exists (the FLOOR's scope belongs to F.W9/W10) … GREEN: a runner is installed, **wired into `ci.yml`** … with **ONE asserting spec**" vs G-F9-1 "`npm test` exists, vitest is a devDependency, ≥1 assertion runs in CI" |
| **7** | **MEDIUM** | **`ci.yml` third job mis-named and mis-anchored** in a spec stamped "witnesses re-measured read-only 2026-08-28" and governed by its own re-resolve-every-anchor law | F-W9.md:52 "(three jobs today: `api-tests` `:37` · `web-build` `:77` · **`e2e` `:101`**)" vs `grep -n '^  [A-Za-z0-9_-]\+:$' .github/workflows/ci.yml` → `37: api-tests:` · `77: web-build:` · **`100:  e2e-tests:`** |
| **8** | **LOW** | **G-F9-8 names four `test.fixme` sites; its own witness command returns five.** No sentence carves the fifth out | `grep -rn "test.fixme" web/e2e/` → 9 lines / **5** call sites: `visualization-ux.spec.ts:110, :133, :192, :212` + `visualization-crud.spec.ts:630`. F-W9 names :110/:133/:192 + crud:630 and its falsifier reads "**All four** un-fixme'd and green". `ux:212` (`save_contour_then_recompute`) is F.W3-homed by its own comment ("Un-skip at W3"), so the row is homed elsewhere — but the gate's rendered output is a partial of the command it cites |
| **9** | **LOW** | **F.W1 atomic-transaction restatement narrows an 8-limb transaction to 3.** Deferred, not split — but a seat sequencing off F-W9 alone reads the wrong transaction | F-W9.md:216 "producer bump + 162-site prop rewrite + copied→status triple **in ONE change**" vs `F-W1.md:276` which adds lucide rename · G10 disclosure deletions · **FR-EQC-7 vaul-vue manifest gate** · G13 manifest/lock moves · PP-REDGATE · FR-CP-13's gap decision. In F-W9: `vaul` → 0 · `RE-PIN` → 0 · `CSS-class census` → 0 |

---

## §7 WHAT THE SPEC GETS RIGHT (recorded so the verdict is not read as a demolition)

- **The registry census is airtight.** 26/26 digraph identities booked, 5/5 entrants booked,
  0 registry-side escapes across all 66 records, and every one of the 41 non-F.W9 records'
  coverage-void rows independently confirmed as routed elsewhere (F.W4 / F.W3-W4 / F.W0 / killed).
- **G-F9-21's Δ=∅ claim is TRUE and independently proven.** The §2.2 tables of F-W9 and F-W10 are
  **byte-identical across all 22 rows** (`difflib` → 0 diff lines). "Spliced, never retyped" holds.
- **§2.8 E-1 is a model of honest fold discipline** — disclosing a self-contradiction *inside* the
  shared bytes and refusing to fix it unilaterally because the fix would break the twin gate.
- **20 of 22 gate witnesses reproduce exactly** at fourier `cd26c65`, including every anchor §2.8
  C-4 corrects (Dockerfile 43 lines / :24 / :26-29 / :31 / :33-43; `/equation` at :34;
  playwright projects at :46-51). C-4's corrections are right and the CARRY anchors it corrects
  were wrong.
- **C-1 / C-2 / C-3 are genuine narrowings, not softenings** — the deploy-hook health gate really
  is bounded and really does `ALERT`, so the residue is "silent *in the channel*, not in the
  script"; the inv-28 asymmetry is confirmed at zero hits vs a three-clause `if:`; and G-F9-19 is
  correctly re-cut to `docker inspect` **as-running** rather than re-reading the compose bytes.
- **§4 (E-3 + status) is CLEAN on every sub-axis**, and §1b's WRITE-SEAT DECLARATION is the
  correct posture for a value.js seat specifying work in the fourier tree.
- **Four dissents carried verbatim**, not name-dropped.

---

**VERDICT: DEFECTIVE.** routedTotal 39 · booked 31 · escaped 8 · defects 9
(1 BLOCKER · 3 MAJOR · 3 MEDIUM · 2 LOW).

The escape is not in the registry — the registry census is complete and the fold seat did that work
properly. It is in the **second authority**: `F-W1-CARRY.md`'s cross-edge 9 routes an eight-item
visual-regression checkpoint set at F.W9/F.W10 and **both** halves of the census-declared split
drop it silently. Paired with three self-violations — a gate anchored at a file that does not hold
its literal, and two F.W0 quotation obligations (G-11, G-12) allowlisted away by a spec whose own
binding law forbids exactly that — the file cannot pass PASS 1.
