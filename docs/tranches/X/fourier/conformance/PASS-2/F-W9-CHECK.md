# X·F · F-W9 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20 **PASS 2**)

**Seat**: fresh, re-derived from the bytes; nothing inherited from `conformance/PASS-1/F-W9-CHECK.md` (read only to confirm which pass-1 classes survive, never as a premise).
**Target**: `docs/tranches/X/fourier/waves/F-W9.md` (317 lines, `status: planned`).
**Corpus authority**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` + the two real carries `carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md` (R-3).
**Tree probes**: read-only against fourier HEAD `cd26c65` (`git log --oneline -1` → `cd26c65`, 2026-07-03) and value.js HEAD. No product source written; no fourier byte written.
**Verdict**: **DEFECTIVE** — 1 BLOCKER · 3 MAJOR · 3 MINOR. Census is CLEAN (0 escapes); the convictions are all in the AUTHORITY-REALITY axis.

---

## §1 CENSUS DETECTOR — both dash forms, as ordered

```
grep -rhoE 'F\.W[0-9]+[-–/][A-Za-z0-9]+' fr-*.md | sort | uniq -c
  → 120 F.W5-W8   ·   72 F.W5–W8   ·   54 F.W9/W10   (U+002D and U+2013 both swept)
grep -rnoE '[^0-9A-Za-z]W9[^0-9A-Za-z]' fr-*.md | grep -v 'F\.W9'   → 0
grep -rnoE '(^|[^9/])F\.W10' fr-*.md | wc -l                        → 0   (no bare F.W10)
grep -rlE 'F[.\-–]?W9' fr-*.md | wc -l                              → 25 records
ls fr-*.md | wc -l                                                  → 66
```

**The F.W9 routing token is slash-formed (`F.W9/W10`) and carries no dash variant** — the en-dash law produced **zero** additional identities here (it bites on `F.W5–W8`, 23 en-dash-only records, which is F.W6's problem, not this wave's). **The spec's own §2.1 probe is therefore not dash-blind for its own token.**

**54-occurrence taxonomy, re-derived independently of §2.1** (the spec consumes F-W10 §2.1's taxonomy; this seat recomputed it from scratch and it reproduces **exactly**):

| class | n | receipt |
|---|---|---|
| routing-law boilerplate (masthead lane taxonomy; mints no row) | **14** | AdminAuditLog:31 · AdminFlaggedPanel:38 · AdminUserList:28 · CanvasOverlayButton:36 · CoefficientsPanel:29 · ContourPreview:30 · EquationView:41 · FrequencyGraph:29 · GalleryAdminBanner:33 · GalleryView:30 · HarmonicLevelGrid:36 · InfoCard:33 · PaperView:35 · VisualizationView:39 |
| verdict / ruling prose (dated, immutable) | **12** | AdminAuditLog:142 · AdminFlaggedPanel:169 · ContourPreview:137 · EquationModeToggle:93 · EquationResult:127 · GalleryAdminBanner:122 · GallerySearchBar:124 · PaperArticleWindow:157/:247/:254 · PaperSidebar:124 · PaperView:214 |
| same-identity restatements | **2** | App:142 (C-13 restated) · PaperArticleWindow:186 (PAW-12's rider inside the R2-7→PAW-50 admission) |
| **routing identities** | **26** | table below |
| **total** | **54** | ✓ 14+12+2+26 |

**Seven records yield zero re-cut rows** (boilerplate-only): AdminUserList · CoefficientsPanel · CanvasOverlayButton · FrequencyGraph · HarmonicLevelGrid · InfoCard · VisualizationView. ✓ matches §2.1.

---

## §2 ID-KEYED CENSUS — 39 routed dispositions, 35 booked, 4 excluded-with-reason, **0 escapes**

### §2a The 26 registry routing identities (from the 54)

| # | record:line | id | spec disposition | carried? |
|---|---|---|---|---|
| 1 | fr-AdminAuditLog:87 | **AA-44** | §2.2 F.W9 · S1 · G-F9-3 | ✓ |
| 2 | fr-AdminFlaggedPanel:95 | **FR-AFP-42** | §2.2 F.W9 (seam-before-seat) · S1 | ✓ |
| 3 | fr-AdminFlaggedPanel:110 | **FR-AFP-49** | §2.2 F.W9 (fold; dissent preserved verbatim) · S1 | ✓ |
| 4 | fr-App:91 | **C-13 (App)** | §2.2 F.W9 · §2.4 · G-F9-1 | ✓ |
| 5 | fr-ContourPreview:71 | **38** | §2.2 F.W9 · §2.4 (both flagship cures REFUTED, carried) | ✓ |
| 6 | fr-EquationModeToggle:41 | **FR-EMT-11 (= C-16)** | §2.2 F.W9 · S2 · G-F9-5/-6 | ✓ |
| 7 | fr-EquationResult:41 | **FR-EQR-6** | §2.2 F.W9 (axe leg) · S2 | ✓ |
| 8 | fr-EquationResult:72 | **FR-EQR-31** | §2.2 F.W9 · S2 | ✓ |
| 9 | fr-EquationView:62 | **D·D-B2** | §2.2 F.W9 (axe leg) · S2 | ✓ |
| 10 | fr-EquationView:191 | **C·D-28** | §2.2 F.W9 · S2 · G-F9-6 | ✓ |
| 11 | fr-FunctionInput:80 | **C-13 = D-24** | §2.2 F.W9 (distinct id from App's C-13, stated) | ✓ |
| 12 | fr-GalleryAdminBanner:49 | **GAB-10** | §2.2 F.W9 (folds by reference → AA-44) · S1 | ✓ |
| 13 | fr-GalleryCardModal:93 | **GCM-42 (= L-14)** | §2.2 F.W9 · S4 · G-F9-9/-10 (F.W1 interaction lock) | ✓ |
| 14 | fr-GallerySearchBar:54 | **FR-GSB-17** | §2.2 F.W9 · S4 · G-F9-7 | ✓ |
| 15 | fr-GalleryView:78 | **FR-GV-36 (= L-24)** | §2.2 F.W9 · S4 | ✓ |
| 16 | fr-ImageUpload:61 | **27** | §2.2 F.W9 · S5 (15/6 pair quoted, not re-derived) | ✓ |
| 17 | fr-PaperArticleWindow:58 | **PAW-12** | §2.2 F.W9 (rider limb) · §2.4 · G-F9-14 | ✓ |
| 18 | fr-PaperArticleWindow:90 | **PAW-34** | §2.2 F.W9 · S3 | ✓ |
| 19 | fr-PaperArticleWindow:199 | **PAW-49** | §2.2 ⟨re-cut⟩ **F.W0** · §2.6 parity · §5 excluded-with-reason | ✓ excl |
| 20 | fr-PaperArticleWindow:200 | **PAW-50** | §2.2 ⟨re-cut⟩ **F.W4** decision; F.W9 EXECUTES · §2.6 · §5 | ✓ excl (decision leg) |
| 21 | fr-PaperSidebar:49 | **D-B2** | §2.2 F.W9 (axe leg) · S3 · G-F9-4 | ✓ |
| 22 | fr-PaperSidebar:58 | **C-M4** | §2.2 F.W9 · S4 (DISTINCT mechanism, never folded) | ✓ |
| 23 | fr-PaperSidebar:67 | **M7** | §2.2 F.W9 (axe + lint limb; tsconfig half = MG-θ at F.W0) | ✓ |
| 24 | fr-PaperView:120 | **D/i-1** | §2.2 F.W9 · S3 · §4a-10 coupled lock verbatim | ✓ |
| 25 | fr-Tooltip:26 | **FR-TT-1** | §2.2 ⟨re-cut⟩ **F.W10** · §2.6 · §5 · binds via G-F9-22 | ✓ excl |
| 26 | fr-UserSlugBar:53 | **FR-USB-16** | §2.2 F.W9 · S4+S5 · G-F9-7/-13 | ✓ |

### §2b By-mechanism entrants (records carry NO F.W9 digraph — verified at their coordinates)

| record:line | id | bytes verified | disposition |
|---|---|---|---|
| fr-AdminUserList:54 | **FR-AUL-16** | *"'Un-harnessable by construction' killed (ruling 3e)"*, `NO-WAVE-OWNER`, *"extend one axe keystone into the admin tab + a vitest devDependency"* ✓ | booked (devDep + axe limb); terminal home **at F.W10** ✓ |
| fr-FullscreenViewer:79 | **FV-26 (= D-23 · C-m7)** | *"the only e2e 'Fullscreen' hit is a comment (gallery.spec.ts:113…)"* ✓ (tree: `gallery.spec.ts:113` is a comment ✓) | booked · S5 · G-F9-11 |
| fr-CanvasOverlayButton:74 | **FR-COB-20 (= C-7)** | *"no test anywhere (`web/e2e` 8 specs, zero references)"*, *"dies with the file"* ✓ | booked conditionally (F8-REACH-02 HOLD is RED; **no harness for a file that may be DELETE**) |
| fr-AppHeader:108 | **FR-AH-45 · C-16** | *"no e2e touches the header's nav/logo/toggle"*, `NO-WAVE-OWNER` SS-3/SS-4 ✓ | booked (execution limb) · G-F9-12 |
| fr-PaperArticleWindow:89 | **PAW-33 · C-i-2** | *"**→ F.W1 ledger** (pin-truth row)"* ✓ | **excluded-with-reason** (§5: rides the C-19 ⊕ PAW-33 pin-truth row) |

### §2c Carry-routed dispositions

- **`F-W4-CARRY.md:555`** — verified at the byte: `| **F.W9/W10** | test + visual seats | axe on /paper (PS D-B2) · admin-mode e2e (AA-44/GAB-10) · the PaperSidebar Collapsible-root guard re-key (PS C-M4) · resolveFigure set-equality (PAW-12) — **⊘ harness before rider, flag before split (PAW-49/PAW-50).** |` — **four-for-four booked**, all four folding onto ids already counted (rows 21, 1/12, 22, 17). No new identity. ✓
- **`F-W1-CARRY.md:246`** — verified at the byte; the eight items are quoted **verbatim** in F-W9 §2.2 (string-compared against the carry line: `--shadow-cartoon` sign flip · `cartoon-surface` hover loss across 21 sites · the `.disclosure-content` body register · the tooltip re-proportion · GCM-22's `p-0` insets · the Badge rim · FR-CP-13's fused-card gap · the `text-admin-label` reversion. Plus the SS-13 residues each record names.) — **8 booked** under R-2b with gate **G-F9-23**. ✓ (This was pass-1 BLOCKER #1; it is **CURED**.)

### §2d Totals

`routedTotal = 26 + 5 + 8 = **39**` · `booked = 23 (of 26) + 4 (of 5 entrants) + 8 (checkpoint) = **35**` · `excluded-with-reason = 4` (PAW-49 → F.W0 · PAW-50's decision leg → F.W4 · FR-TT-1 → F.W10 · PAW-33 → F.W1 ledger) · **`escaped = 0`**.

No id is double-homed; no id is re-booked under a new name; the three ⟨re-cut⟩ deviations are flagged as such and carried for parity at §2.6. **M-25 census axis: PASS.**

---

## §3 AUTHORITY REALITY — every quoted authority re-resolved at the bytes

### §3a Verified TRUE (reproduce exactly)

| citation | receipt |
|---|---|
| `F-W1.md:276` eleven-limb transaction | ✓ *"The roster is ELEVEN limbs and stays eleven — it is the extent every sibling spec cites (R-4b)"* |
| `F-W1.md:294` vaul-vue INSIDE | ✓ *"FR-EQC-7's vaul-vue gate lands INSIDE the F.W1 transaction, not before."* |
| `carry/F-W1-CARRY.md:246` · `carry/F-W4-CARRY.md:555` | ✓ both exact, cited **by path** (R-3 idiom honoured) |
| `fr-NotationPills:35` FR-NP-32 | ✓ BLOCKER · *"NO-WAVE-OWNER (producer dist emitter) + glass-ui BH relay at the TOP of the FR-COB-28 packet; F.W1 SEQUENCING GATE"* — canonical **"FR-NP-32 (≡ fr-PaperSidebar M1)"** form used throughout (R-8) |
| `fr-PaperSidebar` M1 parse witness | ✓ *"postcss.parse … 35 top-level nodes; **zero** valid `@source`; one garbage at-rule literally named `` source` `` spanning **:203–222**"* — G-F9-20's ":203–222" is byte-exact |
| `fr-Tooltip:26` FR-TT-1 | ✓ **17** triggers (Editor ×10 · Canvas ×6 · Wand2 ×1) · *"BLOCKER at any F.W9/W10 axe close-gate"* · glass-ui 8.0.0 `:69-73` *"an icon-only trigger labels ITSELF"* · D-1's 16 + `:42/:49` **killed (register #8)** — all four verbatim |
| `fr-AppHeader` FR-AH-1/-7/-2 | ✓ 450,631 B · 82.5 % · 75,210 B · 348,707 B · 402,944 B — all five byte-exact |
| `fr-GalleryInfiniteGrid` FR-GIG-15 | ✓ *"chunkSize: 24 … against pages capped at 20"*, *"unreachable in the shipped tree"*, *"CONTRADICTS lane-frontend.md:568"* — and `lane-frontend.md:568` is indeed the "good hygiene" line ✓ |
| `lane-frontend §1 :48` | ✓ *"No unit-test runner — vitest is ABSENT"* |
| `fr-EquationResult` FR-EQR-3 | ✓ *"meets **four** e2e gates asserting zero console errors"* |
| `docs/tranches/M/PROGRESS.md:15-28` | ✓ M.W2 `:17` · M.W3 `:18` · M.W4 `:19` · M.W11 `:26`, all `planned` |
| `atomdiff.py:12-14` INCUMBENT guardrail (SS-4 flag) | ✓ *"KISS guardrails … the atoms are a flat BAG (not a tree / Merkle / document)"* |
| TA-4 excision claim | ✓ `api/src/lib/crud/atomdiff.ts` absent from source (only stale `api/dist/` output survives) |
| `F-W10.md` §2.2 26-identity table | ✓ **byte-identical** to F-W9's — `diff` over the two regions returns only lines 1, 3 and 40 (heading mirror, preamble, checkpoint block) |

### §3b CONVICTED — see §5 D1/D2/D4

---

## §4 GATES — born-RED, live witnesses re-run read-only

Every witness command was executed against fourier HEAD `cd26c65`. Reproductions:

| gate | witness re-run | result |
|---|---|---|
| G-F9-1 | `web/package.json` scripts = `dev,build,preview,test:e2e,test:e2e:ui`; `vitest` in neither dep block; no `vitest.config`; 0 `*.test.ts` under `src` | **RED ✓** |
| G-F9-2 | `ls web/ \| grep -iE 'eslint\|oxlint\|biome'` → 0; no `lint` script | **RED ✓** |
| G-F9-3 | `grep -rln "admin" web/e2e/ \| wc -l` → **0** | **RED ✓** |
| G-F9-4 | `grep -rln AxeBuilder web/e2e/` → exactly 2 files (ux, crud); `/paper` **is** navigated at `paper-performance.spec.ts:38` ✓ | **RED ✓** |
| G-F9-5 | `@axe-core/playwright ^4.11.3` in devDeps ✓, never pointed at `/equation` | **RED ✓** |
| G-F9-6 | `grep -rn "/equation" web/e2e/` → **one** hit, `visual-baseline.spec.ts:34` ✓ | **RED ✓** |
| G-F9-7 | `gallery.spec.ts` `:19-22` `.or()` mask ✓ · `:49-53` `.glass-dock` branch ✓ · `:57-63` `if (await filterToggle.isVisible())` ✓ · `grep -rn glass-dock web/src/` → **0** ✓ | **RED ✓** |
| G-F9-8 | `grep -rn "test.fixme" web/e2e/` → **five** call sites: ux `:110`, `:133`, `:192`, **`:212`**, crud `:630` — the spec carves `:212` by name as F.W3-homed ✓ (its in-file comment does say un-skip at W3) | **RED ✓**, pass-1 LOW #8 **CURED** |
| G-F9-9 | `gallery.spec.ts` `modal\|dialog\|card\|Open Visualizer` → **0**; **6** `test(` blocks ✓ | **RED ✓** |
| G-F9-10 | guard at `:120-133` filters `msg.type()==="error"` + `!e.includes("404")` ✓ | **RED ✓** |
| G-F9-11 | "Fullscreen" hit at `gallery.spec.ts:113` is a **comment** ✓; Teleport sites = exactly **2** (`PaperSearchModal.vue:41`, `FullscreenViewer.vue:105`) ✓ | **RED ✓** |
| G-F9-12 | `paper-performance.spec.ts:328` `getByRole("button",{name:/switch to dark mode/i})` ✓; `:329` `waitForTimeout(250)` ✓ | **RED ✓** |
| G-F9-13 | `playwright.config.ts:46-51` = exactly one `chromium`/Desktop-Chrome project ✓; 8 specs / **29** `test(` blocks ✓ | **RED ✓** |
| G-F9-14 | `grep -rn TRANSCODED_FIGURES web/src/` → `lib/figureDimensions.ts:52` + `:56` only; `PaperArticleWindow.vue` → **0** ✓; `resolveFigure` at `PaperArticleWindow.vue:44` ✓; invariant HOLDS (28 png / 26 avif / 26 webp; unpaired `fourier.png` + `maintainer-avatar.png` ✓; 26 keys = 26 `\includegraphics` ✓) | **RED ✓** — pass-1 MAJOR #2 **CURED** exactly per R-1f (registry's bare `:52` kept bare) |
| G-F9-15 | `f2fe447` exists ✓; HEAD `cd26c65` is **49** commits ahead ✓; HEAD date 2026-07-03 ✓; `git status --porcelain \| wc -l` → **28** ✓ | **RED ✓** (MEASURE-AT-OPEN correctly declared) |
| G-F9-16 | `grep -n 'conclusion\|workflow_run\|gh run\|inv-28' scripts/deploy-hook.sh` → **0** ✓; `deploy-pages.yml:48-57` carries the named `inv-28 gate` + three-clause `if:` ✓ | **RED ✓** |
| G-F9-17 | M.W11 `planned` ✓ | **RED ✓** |
| G-F9-18 | order-lock facts all byte-exact (§3a) | **RED ✓** |
| G-F9-19 | `web/Dockerfile` = **43** lines ✓; `COPY assets/` at `:24` ✓; six-file `COPY paper/…` at `:26-29` ✓; `FROM nginx:alpine AS production` `:31` ✓; printf block `:33-43` ✓; `nginx/fourier.conf` = 72 lines with 2 rate zones `:16-17` ✓ + 5 security headers `:25-29` ✓; `docker-compose.prod.yml` declares read_only/tmpfs/cap_drop/no-new-privileges/2G/256M/`--tlsMode requireTLS` + the documented `--tlsAllowConnectionsWithoutCertificates` pivot ✓ | **RED ✓** (one anchor drift — D5b) |
| G-F9-20 | HEAD pins `^3.1.0`/`^2.2.0`/`^0.10.0`/lucide `latest` vs WT `^4.0.0`/`^4.3.0`/`^0.13.0`/`^1.0.0` ✓ (git show verified); `CanvasOverlayButton.vue` = **595 B** ✓ | **RED ✓** |
| G-F9-21 | 54 / 25 records / 0 bare F.W10 / 66 records ✓ | **RED ✓** (asymmetry disclosure stale — D6) |
| G-F9-22 | FR-TT-1 promotion lock byte-exact ✓ | **RED ✓** |
| G-F9-23 | `grep -c toHaveScreenshot web/e2e/*.spec.ts` → **0 in all 8** ✓; `find . -name '*-snapshots'` → none ✓; `visual-baseline.spec.ts:48` is the π capture test ✓ writing to `docs/tranches/J/audit/screenshots/{before,after}` ✓; `.disclosure-content` → 0 in `web/src/` ✓; `text-admin-label` → 4 files ✓ | **RED ✓** (two supporting figures convicted — D3, D4) |

**23 gates, 23 born-RED, every witness path/command EXISTS and re-runs.** L-19: **PASS**.

---

## §5 DEFECTS

### D1 · **BLOCKER** — §2.8 E-1 presents as F.W0 G-12's *own bytes* a quotation that exists nowhere in tree

`F-W9.md:191` reads: *"The settling authority is **F.W0's G-12** (`F-W0.md:204`), whose RED witness already publishes the figure **in its own bytes**: '**8 `e2e/*.spec.ts` — the CARRY's "7" is RETRACTED at the fold seat, 2026-08-28**'"*.

```
grep -rn "RETRACTED at the fold seat" docs/tranches/X/ docs/tranches/V/megatranche/
  → docs/tranches/X/fourier/waves/F-W9.md:191            (the spec itself)
  → docs/tranches/X/fourier/conformance/PASS-1/F-W9-CHECK.md:429   (quoting it)
  → NOWHERE ELSE
```

G-12's actual bytes (`F-W0.md:217`) read: *"**8 `e2e/*.spec.ts`** (banked ×3 — `fr-AdminFlaggedPanel:110` · `fr-CollapsibleSection:65` · `fr-CanvasOverlayButton:74` — and live-measured at the fold seat 2026-08-28; **any 7-spec figure is superseded and forbidden**)"*. Worse, `F-W0.md:48` **explicitly strikes** the very framing the invented quote restores: *"the earlier 'retraction-of-a-retraction' framing rested on a ledger that does not exist and is struck"*. The invention also re-imports the pathless **"the CARRY"** vocabulary that R-3 bans and that this very file's §5 declares *"forbidden vocabulary in this file"* — `grep -on 'the CARRY' F-W9.md` → `:191` (the breach) and `:288` (the law forbidding it).

**Class**: R-1 (fabricated / mis-keyed authority — the gravest). The *substance* (8, and G-12 owns it) is TRUE; the *quotation* is manufactured. Under this check's law — "a fabricated or drifted quote convicts" — and under R-1's own LAW ("DELETED, never paraphrased"), this convicts. Pass-1 MAJOR #4 is **not cured; it is mutated into a worse class** (rival derivation → mis-quotation).

### D2 · **MAJOR** — all 14 `F-W0.md:` coordinates are stale; not one resolves

`grep -o 'F-W0\.md:[0-9]*' F-W9.md | sort | uniq -c` → `:189` ×3 · `:199` ×3 · `:204` ×5 · `:63` ×3.

| cited | what is actually there | where the authority lives |
|---|---|---|
| `F-W0.md:189` (G-9 SEAT) | **blank line** | G-9 heading `:200`, GREEN clause `:202`, R-5 disjointness `:203` |
| `F-W0.md:199` (G-11 anchor table) | **blank line** | G-11 heading `:211`–`:214` |
| `F-W0.md:204` (G-12 denominators) | `**Owning rows**: 18, 17, 19.` (**G-9's** owning-rows line) | G-12 heading `:216`–`:219` |
| `F-W0.md:63` (SUBSTRATE-LEDGER create marker) | `` | `fourier/CLAUDE.md` | **create** — measured ABSENT 2026-08-28 | `` | the ledger row is `:65` |

The quoted *text* for G-9/G-11/G-12 does reproduce elsewhere in `F-W0.md` (so this is drift, not fabrication), but the spec's masthead certifies *"witnesses re-measured read-only 2026-08-28"*, §2.8 C-4 adopts **FR-CP-45** (*"re-resolve every anchor before quoting into a wave spec"*), and §4b makes *"divergence from either table … a defect against F.W0"*. Mitigation of record: `F-W1.md:294` carries the same stale `:199`/`:204`, so F-W0's repair moved the anchors program-wide — but the conviction is against the bytes as they stand.

### D3 · **MAJOR** — checkpoint item 1's own re-measurement is refuted at the tree

`F-W9.md:125` (checkpoint item 1, supporting G-F9-23): *"(re-measured read-only: `grep -rl -- '--shadow-cartoon' web/src/` → **2 files**)"*.

```
cd /Users/mkbabb/Programming/fourier-analysis
grep -rl -- '--shadow-cartoon' web/src/ | wc -l   → 1
grep -rn -- '--shadow-cartoon' web/src/
  web/src/components/visualization/gallery/GalleryCard.vue:193  box-shadow: var(--shadow-cartoon);
  web/src/components/visualization/gallery/GalleryCard.vue:212  box-shadow: var(--shadow-cartoon-hover);
  web/src/components/visualization/gallery/GalleryCard.vue:224      var(--shadow-cartoon);
```

**1 file, 3 hits.** A gate row's stated read-only re-measurement that does not reproduce is a false witness — the exact class the wave exists to abolish ("*a green must be cited, never asserted*").

### D4 · **MAJOR** — a G-12 denominator is quoted under a **renamed pattern**

`F-W9.md:204` (DENOMINATOR PROVENANCE) classifies *"**21 cartoon-surface sites / 14 files**"* as a **G-12 QUOTATION**, and checkpoint item 2 (`:126`) asserts *"the **21-site / 14-file shim denominator is F.W0 G-12's published figure** (`F-W0.md:204`)"*.

G-12's published figure (`F-W0.md:217`) is: *"shim **21 cartoon-card sites / 14 files** [fr-AdminAuditLog K-13, re-confirmed FR-EQC-3]"* — **`cartoon-card`**, a different pattern. At the tree:

```
grep -rl 'cartoon-surface' web/src/ → 1 file  (web/src/style.css; 3 hits — the class is APPLIED ONCE, at :108, inside the `.cartoon-card` shim)
grep -rl 'cartoon-card'    web/src/ → 15 files ;  grep -ro 'cartoon-card' web/src/ | wc -l → 25
```

The carry's own wording ("`cartoon-surface` hover loss across 21 sites") must be carried verbatim — that is not the defect. The defect is the spec's added assertion that G-12 published a `cartoon-surface` 21/14, which it did not. Quoting a G-12 denominator under a substituted pattern name is precisely what G-12's *"superseded figures FORBIDDEN downstream"* clause and KF.W4(d) forbid.

### D5 · **MINOR** — two tree anchors drift by one, in cells stamped `[re-measured]`

(a) §2.2 born-RED witness and G-F9-23 cite `visual-baseline.spec.ts` *"writes bare full-page PNGs via `page.screenshot()` at `:56-60`"*. The call is at **`:55-59`** (`:55` `await page.screenshot({`, `:56-58` its option keys, `:59` `});`, `:60` blank).
(b) §2.5 and G-F9-19 cite *"`web/Dockerfile:5-9` is now the comment recording its removal"*. `:5` is `COPY web/package.json web/package-lock.json ./`; the comment block is **`:6-10`**.

### D6 · **MINOR** — E-2's asymmetry disclosure is stale at the bytes; the twin **retyped**, it did not receive a splice

§2.8 **E-2** (`:192`) states the 8-item set *"was carried by **neither twin** at the fold"* and that the asymmetry is one-directional *"until F.W10 receives the identical bytes by splice, never retyped"*. At the live bytes `F-W10.md:105` already carries its **own, differently-worded** block: *"**F.W1 → F.W9/F.W10 — the visual-regression checkpoint set** (`carry/F-W1-CARRY.md:246`, cross-edge 9; cited BY PATH per R-3). The eight checks the uplift mints **with no typecheck signal**, verbatim from the carry: …"*. So the divergence is **two-directional** and the twin law (*spliced, never retyped*) has already been broken from the other end. G-F9-21 stays correctly RED either way; the disclosure's description of *why* is now false.

### D7 · **MINOR** — the "spliced, never retyped" preamble is not the twin's bytes

`F-W9.md:82` declares *"the preamble, table and entrant block below are carried **verbatim** from F-W10.md §2.2 — spliced, never retyped."* The **table** and **entrant block** are byte-identical (verified by `diff`), but the preamble line itself is not: F-W9 points at *"§2.8 E-0 / E-1"*, F-W10:68 at *"§2.8 (E-4/E-5)"*, with different sentence construction. The claim over-reaches its own scope by one line.

---

## §6 AXES THAT PASS

| axis | verdict | receipt |
|---|---|---|
| **ID-KEYED CENSUS (M-25)** | **PASS** | 39 routed · 35 booked · 4 excluded-with-reason · **0 escapes**; 54-occurrence taxonomy independently reproduced (14/12/2/26); 7 zero-row records confirmed; both dash forms swept |
| **NO INVENTION / M-25 depth** | **PASS** | **FR-NP-32 by id** ≡ fr-PaperSidebar M1, canonical both-witness form (R-8) at §4a-2, G-F9-20, §4b ✓ · **PAW-44 / LAW-3** restore-only-with-background-cure at §4a-12 ✓ and the S3 sequencing lock ✓ · **MPC-31** one-cut law §4a-12 ✓ · **FR-MSP-6** two-channel lock §4a-12 ✓ · **same-commit riders** (PaperSearchModal D-1+D-3+`outline:none`; **N-2's label+locator**, which is F.W9's own, at G-F9-12) ✓ · **F.W3's anti-cure discipline** honoured where F.W9's rows touch it — ContourPreview 38's **two REFUTED flagship cures** carried verbatim at §2.2/§2.4, FR-AH-30's REVERSED-remedy caution carried at the FR-AH-45 entrant, and **no** retired cure shape is prescribed · **F.W4's NEGATIVE-record law** honoured — `fr-App C-12` carried as a NEGATIVE record ("do not manufacture work"), GAB-29 carried as the falsifier that keeps the wave off two dead primitives · zero producer-side cures (SS-6 / LATEX-RELAY ask-only, restated in five places) |
| **GATES born-RED (L-19)** | **PASS** | 23/23 RED with live, re-runnable witnesses (§4); every cited path exists or carries a `create` marker with its path |
| **ATOMICITY (R-4b)** | **PASS** | §4a-3 carries R-4b's prescribed sentence **verbatim** — eleven-limb roster at `F-W1.md:276`, FR-EQC-7 vaul-vue INSIDE per `:294`, *"cited whole, never restated here"*; the struck 3-limb restatement is gone (pass-1 LOW #9 **CURED**); individual limbs are only NAMED where a local gate binds one, as R-4b permits |
| **POSTURE** | **PASS** | `status: planned` (`:3`) · four-verb IMPLEMENTED **NO** / VERIFIED **NO** · only two `VERIFIED` tokens in the file, both correct (`:15` the verb, `:317` "VERIFIED is F.W10's close to stamp") · fourier tree declared READ-ONLY with an explicit **WRITE-SEAT DECLARATION** (§1b) and F-W5's *"`fourier-analysis` is READ-ONLY, always"* carried · **SS-4 owner flags inline** (trie-vs-KISS with the `atomdiff.py:12-14` INCUMBENT dissent · remix-vs-fork · born-visibility · visibility-enum · version-`_id` · redaction parity · pagination idiom) plus OG-F1/OG-F2/OG-V1-V3 all flagged, none presumed · execution gate restated at §5's last row |
| **RULINGS ADDRESSED TO F-W9** | **6 of 7 applied** | **R-2b** ✓ (8 items booked in the shared §2.2 region, gate G-F9-23, §4a-16, §5 — pass-1 BLOCKER #1 cured) · **R-3** ✓ *except* the `:191` breach (D1) · **R-4b** ✓ verbatim · **R-5** ✓ (disjointness sentence at §2.4 + G-F9-1 + §4b; F.W0's mirror exists at `F-W0.md:203`) · **R-8** ✓ · **R-1f** ✓ exact (`figureDimensions.ts:52`; the registry's bare `:52` kept bare) · **R-9.1** ✗ (labels applied, but the coordinates are stale (D2), one quotation is manufactured (D1) and one denominator is renamed (D4)) |

---

## §7 VERDICT

**DEFECTIVE.** The wave's structure is sound and its census is clean — every routed id is carried or excluded with reason, the eight-item carry escape that convicted pass 1 is cured and gated, all 23 gates are born-RED against witnesses this seat re-ran, atomicity is cited-not-restated, and the posture (planned · read-only fourier · owner flags inline) holds without exception.

What convicts is a single axis, twice over: **the spec quotes F.W0 as an authority it did not re-read.** One quotation (E-1) is manufactured and reproduces nowhere in tree while re-importing R-3's forbidden vocabulary; all fourteen `F-W0.md` coordinates point at blank lines or the wrong row; one G-12 denominator is quoted under a pattern name G-12 never published; and one of the checkpoint set's own read-only re-measurements is off by a whole file. Pass-1's two authority defects (#3, #4) were **re-labelled rather than re-grounded** — converting a rival derivation into a mis-quotation, which is the graver class.

**Repair shape (one edit, no new authorities)**: strike the invented E-1 quotation and cite `F-W0.md:217`'s real bytes (or `F-W0.md:48`, the positive statement, which is where the 8 actually lives); re-resolve the four `F-W0.md` anchors to `:200/:202/:203`, `:211`, `:216`, `:65`; restore `cartoon-card` as the name of G-12's 21/14 denominator and state the checkpoint item's own `cartoon-surface` count honestly (1 file); correct `--shadow-cartoon` to 1 file, `page.screenshot()` to `:55-59`, and the Dockerfile comment to `:6-10`; and re-state E-2 against F-W10's live block. None of these touches a booked id, a lock, or a gate's RED state.

*Read-only everywhere except this file.*
