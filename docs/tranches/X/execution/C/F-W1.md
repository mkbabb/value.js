SERVED MODEL: claude-opus-5[1m]

# F.W1 — execution record (Track C · X·F · fourier-analysis)

**Spec**: `docs/tranches/X/fourier/waves/F-W1.md` (read WHOLE at this seat, 735 lines / 312,373 B).
**Authority of order**: `EXECUTION-RUNBOOK.md` §1.3 (Track C), §3.4 (locks), §5 (seat law) ·
`COHESION.md` §0i.3 (ESC-1/G1 RULED) + §0j (the begin-word).
**Shape**: ONE atomic land-or-lose transaction, TWELVE limbs, `feat(fourier)!:` — *a partial
landing is the L-18 failure* (§3.4 lock table, first row).

---

## Open

**Date**: 2026-09-17, 19:11–19:2x EDT. **Seat**: seat 0 (OPEN), Track C.

### Preconditions — verified at the BYTES and in the LEDGER

The spec's `Opens after` line (`F-W1.md:7`) is a three-way conjunction: *"F.W0 closes (G2 · G3 ·
MISS-LC2 · F8-REACH-01+02) **and** the owner's begin-word **and** ESC-1 ruled (G1)"*.

| conjunct | ledger | bytes (this seat's own commands) | verdict |
|---|---|---|---|
| **F.W0 CLOSED** | Track C row: `CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))`, close `98ed52c8` · `368ae6bb`, record `execution/C/F-W0.md` present (201,477 B) | fourier HEAD `5842377` on `m/w1-bump-migration`, the close's own last commit | **MET** |
| **begin-word** | `COHESION.md` §0j, 2026-09-17, verbatim | §0j present at the bytes | **MET** |
| **ESC-1 ruled (G1)** | §0i.3 — *"**G1's cell is filled by this ruling: TAG `v8.0.0` · ADOPTED COMMIT HASH `17a11bc5`.**"* | ⟨cmd⟩ (cwd `../glass-ui`) `git tag --points-at 17a11bc5` → `v8.0.0`; `git show 17a11bc5:package.json \| grep -m1 '"version"'` → `"version": "8.0.0",` | **MET** |

**The four named F.W0 discharges, re-measured here (§4 step 2: F.W1 RECORDS them, never performs them):**

- **G2 — CORRUPT-DIST PRE-GATE.** F.W0 closed it **honest-RED, producer-owned** (its `G-4`; the
  witness `CssSyntaxError … Unterminated string: 's own'` was measured for the first time at
  F.W0's close seat). At the INSTALLED pin this seat measures the same shape: ⟨cmd⟩
  `ls -la web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` → **13,949 B**, ⟨cmd⟩
  `grep -c "@source" …/index.css` → **3**. **At the ADOPTED pin it does not exist**: COHESION
  §0i.5 measured the 8.0.0 registry tarball's `exports["./styles"] → dist/styles/index.css` at
  **1,514 bytes**, one string-interior `@source`, *"and it parses under postcss — the FR-NP-32
  comment-corruption shape is absent at 8.0.0"*. **F.W1 opens on a red build it has recorded**,
  which is exactly what §4 step 2 requires; the red is cured BY the transaction, not before it.
- **G3 — SUBSTRATE SETTLE.** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l` → **0**, double-run. F.W0's G-1 LANDED the 27/28 M.W1a paths at `1193003`
  (OG-F1 worktree-as-baseline). **The audited "installed 4.0.0 pin" is now COMMITTED bytes** —
  WU-B / FR-EQR-33(c) / GAB-13 is discharged at the bytes, not merely promised: ⟨cmd⟩
  `sed -n '/"dependencies"/,/^  }/p' web/package.json` → `"@mkbabb/glass-ui": "^4.0.0"` ·
  `"@mkbabb/keyframes.js": "^4.3.0"` · `"@mkbabb/value.js": "^0.13.0"` (the pre-F.W0 committed
  manifest carried `^3.1.0`/`^2.2.0`/`^0.10.0`).
- **MISS-LC2 — the manifest gate.** AUTHORED by F.W0 at `87ecc85`, published as
  `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` **§4.1 "THE MANIFEST GATE — the text, as F.W1
  receives it"**. Its **landing is F.W1's**, inside transaction limb 7/8 (§4 step 2's own clause:
  *"The `@lucide/vue` + `vaul-vue` DECLARE+LOCK landing is F.W1's, inside step 4 (R-4a)"*).
  Born-RED confirmed at the manifest: `@lucide/vue` has **no row** and `vaul-vue` has **no row**
  (⟨cmd⟩ `grep -n "lucide\|vaul-vue" web/package.json` → one hit only, `lucide-vue-next` at `:35`).
- **F8-REACH-01 + F8-REACH-02.** Both files **ABSENT at the bytes** — ⟨cmd⟩
  `ls web/src/components/equation/InfoCard.vue web/src/components/ui/CanvasOverlayButton.vue` →
  `No such file or directory` ×2 (deleted with FR-COB-17's 8-site `aria-pressed` lift in ONE
  commit, `5842377`, per §0j.D's G-10 ruling).

**F.W0's three published tables are present and are QUOTED, never re-performed** (cross-edge 1 /
R-9.1): `SUBSTRATE-LEDGER.md` §2.1 = **G-11** (the corrected anchor table) · §2.2 = **G-12** (the
corrected-denominator table) · §2.3 = **G-13** (the producer pin table; F.W0's close recorded
`17a11bc5`, ADOPTED PROSPECTIVE). F.W1's G1 is a **quotation of G-11/G-12/G-13 cited by gate id**,
and divergence from those tables is a defect against G-11, not a rival act.

**No prior F.W1 work exists.** Ledger status was `planned`; `execution/C/F-W1.md` did not exist;
⟨cmd⟩ `git log --oneline --all | grep -i "feat(fourier)"` → **0 hits** in the fourier repo (the
`fix(F.W1)` hits that exist are the old tranche-F API wave, a different programme). **Fresh open.**

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock (**19:11 EDT**), compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **status cell**,
never from a bare `grep -i unread`.

1. `docs/tranches/V/` (10 `.md`) + `docs/tranches/V/coordination/` (18 entries) — `INBOX.md`
   **self-excluded** (SELF-COUNT law). Newest non-self: `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`, **ours, outbound**, rowed.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**:
   ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -3` → `BK` (17:52 today) · `BJ` (08-03) ·
   `BI` (07-28); 45 dirs total, `BK` the maximum both by mtime and alphabetically after `BJ`.
   Seven entries; newest three are the 17:43 O-20 letters.
3. `../keyframes.js/docs/tranches/V/coordination/` — their `<SENDER>-INBOUND-*` grammar: every
   letter there is inbound **to** keyframes (from glass/atlas/value/speedtest), **none addressed
   to value.js**.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 28 entries, newest 08-03, all rowed;
   the atlas **Q**-lane extension (swept by the two prior Track C seats) re-swept, nothing new.

**Delta test** ⟨cmd⟩ `find <each path> -maxdepth 1 -name '*.md' -newermt '2026-09-17 18:53'`
(18:53 = the last sweep line at `INBOX.md`'s foot) → (1) `INBOX.md` **itself** (its own sweep
line) · (2) **∅** · (3) **ten files, all pre-existing letters whose mtimes were bumped by a
Track B checkout in `keyframes.js`** — no new name, no new sender, nothing value.js-addressed ·
(4) **∅** · (Q) **∅**.

**Result: 0 unrowed · 0 new `I-n` minted · a dated sweep line appended at the file end.**

**UNREAD mail IN F.W1's SCOPE — declared at the open so the close cannot forget it.** Three rows
stand `UNREAD 2026-09-17` (rowed by Track D's X.P.W2 seat 0): **I-32** (`glass-outbound-2026-09-17-valuejs-o20-disposition.md`) · **I-33** (`…-constellation-o20-relay.md`) · **I-34**
(`…-bbnf-lang-9.0.0-addendum.md`). Two of the three are **materially F.W1's**:

- **I-33 §1 is titled `## 1 · fourier-analysis (web/package.json ^4.0.0, installed 4.0.0)`** — the
  producer's own section addressed at this tree, four `fourier` hits.
- **I-32 carries producer dispositions that bear directly on named F.W1 gates**: **A-10** —
  *"The render is right, the docblock is false at both pins: reka's `SliderRoot` merges `$attrs`
  through `mergeProps` and a consumer's `@pointerdown` on our Slider fires (fourier's
  `GlassTimeline.vue:73` is the one such site…"* → this is **PD-1's deliberately-unresolved
  disjunction, answered from the producer's end**, and **G18** is its probe; **A-12** is an
  explicit `ROUTE → fourier`; **B-4**/**B-6** name `--viz-amber` and the GlassTimeline drag surface.

**Consequence carried to unit `b` and to the close**: NWO-1's roster must be reconciled against
I-32 **before** the letter is sent, so no item the producer has already disposed is re-sent
(the spec's own precedent: *"Item 7 DOCK-ACTIVE satisfied upstream — do not re-send"*), and G18's
reading must state whether the producer's A-10 answer discharges, narrows, or leaves PD-1's
disjunction — **never presume it does**. `INBOX.md` is append-only here; **no status cell was
flipped at this seat** (flipping them is the consuming unit's act, with its receipt).

---

## Baseline — the born-RED gate table, run READ-ONLY, banked BEFORE any cure

**Law**: write-then-measure; every published count double-run; quote-by-command; no count of this
file or of a live sibling (R3-3.10) — counts below are of the **frozen corpus**, the **read-only
product tree**, and the **producer AT ITS TAG**, the three lawful shapes.

| gate | verdict at open | receipt |
|---|---|---|
| **G1** RE-PIN | **RED** | ⟨cmd⟩ `grep -c "17a11bc5" F-W1.md` → **0**: the spec's G1 cell is EMPTY at its own bytes. The ruling that fills it exists (§0i.3) and is **not yet written into the wave's own record** — that is unit `a`'s act. |
| **G2** corrupt-dist (F.W0's) | **RED at the installed pin · ABSENT at the adopted pin** | installed `dist/styles/index.css` **13,949 B**, `@source` ×**3**; 8.0.0 registry tarball **1,514 B**, parses (§0i.5). Recorded, not performed (§4 step 2). |
| **G3** substrate settle (F.W0's) | **GREEN** ⚠ *green-before-cure, by predecessor* | `git status --porcelain \| wc -l` → **0**, double-run. F.W0 cured it; F.W1 inherits and records it. Declared under R.2 rather than quietly enjoyed. |
| **G4** emission pre-gate | **UNRUNNABLE-AT-OPEN** | its command is `npm run build`, which (i) **writes** `web/dist` — a read-only witness at §1 — and (ii) cannot pass while G2 is red at the installed pin. Born-RED stands at the bytes: ⟨cmd⟩ `ls -ld web/dist` → **`Jun 12 18:13`**, five days pre-installed-producer, *"stale, inadmissible"*. Routed to unit `e` (§4 Cadence: *"`npm run build` at G4 and post-cut"*). |
| **G5** P0 CSS-class census | **RED** (no census exists; all four instances live) | `paper-texture` **1** · `text-admin-label` **7 occurrences / 4 files** · `cartoon-card` **24 / 14** ⟨*divergence, below*⟩ · `btn-pill` in `web/src` **0** (as the spec states: the producer applies it, `NotationPills.vue` shadows it). |
| **G6** atomic land-or-lose | **RED by construction** | no transaction commit exists; the four zero-console-error e2e specs are present and unfiltered (`visualization-crud` · `workspace-flow` · `contour-extraction` · `gallery`, ⟨cmd⟩ `grep -c console` → **10 · 5 · 5 · 5**). |
| **G7** Button budget | **RED** (no grep of record at the adopted pin) | at the installed pin, double-run: `variant=` **122** · `size="icon"` **36** · files importing `glass-ui/button` **34** · `variant="outline"` **30 / 16 files** · `variant="ghost"` **49** · `variant="glass"` **10 / 7 files**. |
| **G8** touch-floor | **RED** | installed 4.0.0 keys `[data-size="icon"]` (⟨cmd⟩ `grep -n 'data-size="icon"' …/a11y-overrides.css` → `:116`); ⟨cmd⟩ `grep -rl 'data-control-target' web/node_modules/@mkbabb/glass-ui/dist \| wc -l` → **0**. |
| **G9** token-family sweep | **RED** | ⟨cmd⟩ `grep -rn -- "--slider-scrub" web/src \| wc -l` → **23**, `-l` → **7 files**. Reproduces the banked 23/7 exactly, double-run. |
| **G10** disclosure-deletion | **RED** (deletions unmade; witness cannot be taken) | **all five landmarks per twin reproduce the round-4 re-measurement exactly**: `CollapsibleSection.vue` → `overflow: hidden` `:55` · `animation:` `:61 :64 :69` · PRM `:66`; `ContourSettings.vue` → `overflow: hidden` `:362` **and `:425`** (the disclosed second hit outside both blocks) · `animation:` `:365 :368 :373` · PRM `:370`. |
| **G11** module resolution | **RED** | `vue-tsc -b --force` → **exit 1 / 20 diagnostics** (17 TS6133 · 1 TS6196 · 1 **TS2882** `PaperView.vue(12,8)` · 1 **TS2769** `vite.config.ts`) — reproduces F.W0's close reading exactly. Dead glass specifiers live in `web/src`: `metric-badge` ×**6**, `dropdown-menu` ×**2 files**, `hover-card` ×**2 files**, `animated-digit` ×**1** (`CoefficientsSpectrum.vue:19`). |
| **G12** easing re-point by execution | **RED · probe UNRUNNABLE-AT-OPEN** | the witness is post-uplift execution. The hazard is at the bytes: `easings.ts` `EASING_PRESETS` casts `timingFunctions[name] as EasingFn` (the `as EasingFn` that makes a wrong re-point typecheck clean and throw on the first rAF tick). |
| **G13** peer-graph closure | **RED** | ⟨cmd⟩ (cwd `web/`) `npm ls --all` → **exit 1**; `npm ls` prints **extraneous** entries (`@emnapi/*`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`). `cva`/`clsx`/`reka-ui`/`lucide-vue-next` all sit in **devDependencies** (C-3); no `vaul-vue`; no `@lucide/vue`. |
| **G14** pencil-boil floor | **RED** | read at the ADOPTED tag, ⟨cmd⟩ `git show 17a11bc5:package.json` → peers `@mkbabb/pencil-boil` **`^0.11.2`** · `@mkbabb/keyframes.js` **`^6.0.0`** · `@mkbabb/value.js` **`^4.0.0`** · `@lucide/vue` **`^1.16.0`**. Manifest today: `"@mkbabb/pencil-boil": "^0.4.1"`. **C-18.2 is LIVE at the adopted pin**: registry `latest` is **0.12.0** and `^0.11.2` ⇒ `>=0.11.2 <0.12.0` excludes it; the only in-range published versions are **0.11.0 · 0.11.2**. |
| **G15** non-credit discharge | **RED, all three legs** | (a) no close report — ⟨cmd⟩ `ls docs/tranches/X/fourier/evidence/w1` → **No such file or directory** (the whole `evidence/` dir is absent); (b) no NWO-1 packet — `docs/tranches/X/coordination/` holds **two** files (`ATLAS-TO-VALUE-2026-08-03-RULINGS.md` and F.W5's `value-to-fourier-cosign-J-diff-shape-v2.md`, landed 18:53 today; the spec's born-RED said ONE — **corrected by measurement**, and neither is an NWO packet); (c) **AA-11 holds by construction at the adopted pin** — ⟨cmd⟩ `git show 17a11bc5:package.json \| grep -c '"\./pagination":'` → **0**, so no cure *can* be planned around `./pagination`. |
| **G16** latex-paper sufficiency | **RED — and its first arm is measured UNEXECUTABLE (finding, below)** | ⟨cmd⟩ `grep -c "hsl(var(" web/node_modules/@mkbabb/latex-paper/src/vue/theme.css` → **42**, exact; ⟨cmd⟩ `grep -rn "hsl(var(" web/src \| wc -l` → **0**. The 42 sites are **producer bytes inside `node_modules`**, not fourier's. |
| **G17** cartoon-card order | **RED** (ruling gate; its product is written prose in a close report that does not exist) | `FR-EQC-3` (retire) vs `AA-4` (adopt) both unordered; neither executes here (F.W3 / F.W4 respectively). |
| **G18** binding-verification probe | **RED · probe UNRUNNABLE-AT-OPEN** | post-uplift drag. **NEW at this open**: the producer's **I-32 A-10** answers PD-1's disjunction from its own end and names `GlassTimeline.vue:73` — the gate must READ that answer, never inherit it. |
| **G19** owner rulings recorded | **RED — ONE of SEVEN ruled** | **ESC-1 RULED** at COHESION **§0i.3** (`v8.0.0` @ `17a11bc5`). **ESC-2 · ESC-3 · ESC-4 · ESC-5 · ESC-6 · ESC-7 carry NO ruling and no explicit deferral** — ⟨cmd⟩ `grep -n "ESC-2\|ESC-3\|ESC-4\|ESC-5\|ESC-6\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → **no output**. **Six open.** ESC-7 alone is **30 sites / 16 files** of `variant="outline"` with **no successor** at ≥7. |
| **G20** closure, both sources | **RED** (the run is the close seat's, and must not be this file's author) | leg (b)'s frozen operand **re-verified intact at this seat**: ⟨cmd⟩ `shasum -a 256 CENSUS-CANONICAL.md \| cut -c1-12` → **`f44362757458`**, the pinned digest; the roster reproduces **65** record lines, **330** by the parenthetical sum, **660** backticks = 330 ids — the canonical's own two independent derivations agreeing exactly. Leg (a)'s operand present: `carry/F-W1-CARRY.md`. |

**Tally: 15 RED · 1 GREEN-BEFORE-CURE (G3, by predecessor) · 2 UNRUNNABLE-AT-OPEN in the probe
half only (G4 · G12/G18 probes) · 20 gates.** (G12 and G18 are counted RED with their probe halves
declared unrunnable; G4 is counted separately because its *whole* command is unrunnable here.)

### Findings at the open — measured, none moving a gate or a bar

1. **`lucide-vue-next` is 34 / 34, not the banked 35 / 35 — and the cause is F.W0's own ruled
   deletion.** ⟨cmd⟩ `grep -rn "lucide-vue-next" web/src | wc -l` → **34**, `-l` → **34**,
   double-run. The banked *"35 import sites / 35 files"* was measured before F.W0's G-10 deleted
   `CanvasOverlayButton.vue`. The same subtraction moves **Button-importing files 35 → 34**
   (⟨cmd⟩ `grep -rln 'glass-ui/button' web/src | wc -l` → **34**). **No figure is averaged**: G7's
   grep of record re-runs at the adopted pin and its output is the sole budget; this row exists so
   the successor seat does not read the drift as a miscount.
2. **`cartoon-card` reads 24 / 14, not 21 / 14.** ⟨cmd⟩ `grep -rn "cartoon-card" web/src | wc -l`
   → **24**, `-l` → **14**, double-run. The file count reproduces exactly; the occurrence count
   does not. The banked 21 counts `.cartoon-card` **class applications**; this probe is an
   unanchored substring that also takes the `style.css:98-112` shim's own declarations and its
   comment. **Recorded as a probe-shape difference, not a census correction** — G5 owns the
   census and must state its counting unit (F.W0 G-11's law).
3. **`variant="glass"` reads 10 / 7, not the banked 9 / 7.** Files reproduce; occurrences do not.
   Rides G7's reconciliation; **not averaged**.
4. **G16's sound limb is UNEXECUTABLE as written inside this wave's bounds.** The 42
   `hsl(var(--x))` declarations are at
   `web/node_modules/@mkbabb/latex-paper/src/vue/theme.css` — **producer bytes**. Rewriting them
   in place is a local patch of `node_modules`, which standing law grades a HIGH defect, and
   `web/src` holds **0** of them. G16's disjunction therefore resolves to its **second** arm:
   **seated explicitly with a named owner**, via **NWO-5**. Unit `b` owns the ask; unit `f`
   records the seating. (The `paper/**` conditional bound at §1 stays UNOPENED unless a ruling
   seats the carry here.)
5. **`./motion-curves` does NOT exist at the adopted pin.** WU-K's cross-edge-3 sequencing
   correction — *"`@mkbabb/glass-ui/motion-curves` at the PINNED 4.0.0 re-exports every symbol
   except `timingFunctions`"* — is a **4.0.0 fact**: ⟨cmd⟩
   `git show 17a11bc5:package.json | grep -c '"\./motion-curves":'` → **0**, double-run. A palette
   or easing cure that routed through `./motion-curves` in commit #3 would **break at commit #4**.
   **M-RTC's named seat survives the hop and is the one to use**: `"./dom"` → **1** at 8.0.0, and
   `resolveTokenColor` is live in the tag's source. Binding on unit `d`.
6. **The WU-G subpath census reproduces every amendment at the adopted pin**, one command per key
   over `git show 17a11bc5:package.json`, double-run on three keys: `./dropdown-menu` **0** →
   `./menu` **1** (amendment i) · `./icon-tooltip` **0** (ii) · `./toggle-chip` **0** → `./chip`
   **1** (iii) · `./confirm-dialog` **0** (iv — adopting it manufactures a break) · `./checkbox`
   **1** (v) · `./scrolling-text` **0** (vi) · `./metric-cell` **0** (viii) · `./metric` **1**
   (GAB-2's ruled cure seat) · `./metric-badge` **0** (the 6 live imports are build-breaking at
   the hop) · `./animated-digit` **0** with `./motion` **1** and `useAnimatedNumber` present in
   the tag's source (**B-4's cure is executable at the adopted pin**) · `./hover-card` **0** ·
   `./button` **1** (AA-2's retained subpath) · `./easing` **1** (**the live cross-package
   homonym R4-6.1 qualifies at G12 — it is real at this pin**) · `./search` **1** and `./canvas`
   **1** (both present at 8.0.0; their removal is a 9.0.0 fact and is not this wave's).
   **Export-key count measured 69** by ⟨cmd⟩ `grep -c '^        "\./'` against the banked
   *"70 @ 8.0.0"* — a one-key difference that is probably this probe's indentation anchor, not a
   census move; **stated, not resolved here**, and owned by G7/G5's counting-unit discipline.
7. **All three uplift targets are REGISTRY-RESOLVABLE, so PIN-LAW is discharged as written.**
   ⟨cmd⟩ `npm view @mkbabb/glass-ui@8.0.0 version dist.shasum` → `8.0.0` / `a961e838ea5848a775759b1433d3b2c6e8f53a17`; `@mkbabb/keyframes.js@6.0.0` → `6.0.0`;
   `@mkbabb/value.js@4.0.0` → `4.0.0`. The 8.0.0 tarball's `peerDependencies` are **byte-equal to
   the tag's**, which is what makes §0i.3 receipt (2) true rather than assumed.
8. **The §0i.2 re-trigger has fired and is NOT this track's to answer.** ⟨cmd⟩
   `npm view @mkbabb/glass-ui version` → **9.0.0**. This is the X·V trigger recorded at X-W0's
   CHECK 2 as **ESC-M1** and rowed at I-32/I-34; §0i.3's fourier election stands untouched
   (its receipts are 8.0.0-specific and 9.0.0's `./canvas` removal is unpriced in every `fr-*`
   record). **Recorded, not re-opened** — re-affirming the election is the orchestrator's/owner's
   act, never a wave seat's.

---

## Unit plan

**Six units, STRICTLY SERIAL, peak concurrency 1** — `a → b → c → d → e → f`. The shape is forced,
not chosen: the wave is ONE atomic land-or-lose transaction whose §4 intra-wave order is declared
**binding**, its §3.4 lock says *"a partial landing is the L-18 failure"*, and three sibling tracks
run concurrently under the **four-workflow cap**, where *"intra-wave concurrency yields first"*
(runbook §5.1). Every unit writes `execution/C/F-W1.md`, so no two may run together in any case.
**All seats Opus** except `f` (below). Each unit's line 1 in any file it creates is its own
`SERVED MODEL:` declaration.

### Ordered groups

`[["a"], ["b"], ["c"], ["d"], ["e"], ["f"]]`

### Unit `a` — RE-PIN, the predecessor record, and the G19 escalation

- **Model**: opus. **Sections**: §2 WU-A `:60-65` · WU-B `:67-70` · §3 **G1** `:247` · §3 **G19**
  `:265` · §4 steps 1–2 `:273-274` · cross-edge 1 `:294` · WU-R `:221-229`.
- **Writable**: `docs/tranches/X/fourier/waves/F-W1.md` (**dated addendum-beside ONLY** — E-3; no
  dated cell is rewritten, and no row is inserted above `:294`, which would re-key four pinned
  coordinates in nine sibling files) · `docs/tranches/X/execution/C/F-W1.md`.
- **Gates**: **G1** (turn) · **G19** (ESC-1 leg only; the other six ESCALATE) · §4-step-2's
  recording of G2 / G3 / MISS-LC2 / F8-REACH-01+02.
- **Locks**: WU-A is the **first obligation — "nothing below sizes before it"**; G1 is a
  **quotation** of F.W0's `G-11`/`G-12`/`G-13` **cited by gate id**, never a re-resolution;
  BASELINE LAW (*the adopted tag decides regardless of what a working tree self-reports*).
- **Brief**: Append one dated addendum-beside to `F-W1.md` filling G1 from COHESION **§0i.3** —
  TAG `v8.0.0`, ADOPTED COMMIT HASH `17a11bc5` — with the ruling id cited and its four receipts
  named, never re-argued. Beside it record: (i) F.W0's four discharges as measured in §Baseline
  above; (ii) that every producer `file:line` re-resolves by quoting `SUBSTRATE-LEDGER.md`
  `G-11`/`G-12`/`G-13` by gate id; (iii) K-1's suspect-window list (FR-CP-21 · fr-App MG-β ·
  B-2's `.paper-texture` premise) re-resolved at the adopted tag, re-baselined never re-booked;
  (iv) the §Baseline findings 5 and 6 that re-key WU-K and WU-G at 8.0.0. Then **flag ESC-2…ESC-7
  INLINE as UNRULED and RETURN them** — never presume, never sweep; name the blocked rows per the
  spec's own WU-R table. Commit `docs(X·F): F.W1 G1 re-pin + F.W0 discharge record — ESC-2..ESC-7 returned`.

### Unit `b` — the relay packets (NWO-1 · NWO-5 · NWO-6) and their E13 rows

- **Model**: opus. **Sections**: §2 WU-S `:231-239` · §3 **G15** `:261` · §4 commit-plan step 2
  `:281` · cross-edges 4 · 5 · 6 `:297-299` · §5 Excluded's producer-owned row.
- **Writable**: `docs/tranches/X/coordination/` (create the three letters) ·
  `docs/tranches/V/coordination/INBOX.md` (**append-only**, one E13 row per relay) ·
  `docs/tranches/X/execution/C/F-W1.md`.
- **Gates**: **G15 (b)** and **(c)**.
- **Locks**: `../glass-ui` is **READ-ONLY always**; producer rows ride SS-6 and **never become
  frontend hacks** — *a frontend workaround for a producer defect is a wave defect*. ONE batched
  BH letter, roster cited by **row label** from `carry/F-W1-CARRY.md`, not re-derived.
- **Brief**: Author NWO-1 (the consolidated glass-ui BH letter; roster from the CARRY's own
  `"NWO-1 · FR-COB-28's consolidated glass-ui BH relay letter"` row, with **FR-NP-32 (≡
  fr-PaperSidebar M1) at TOP**, cite-both-never-substitute), NWO-5 (LATEX-RELAY: PAW-1's ask
  stated as **42 sites measured at `latex-paper/src/vue/theme.css`**, plus `fr-PaperView C-06`'s
  `ComputedRef<any>`, katex `^0.16` vs 0.17.0), NWO-6 (pencil-boil: the false `sideEffects: false`
  + `^0.11.2` excluding the published 0.12.0, with the in-range set `0.11.0 · 0.11.2` named).
  **First act: read I-32/I-33 and strike from NWO-1's roster every item the producer has already
  disposed** (the *"Item 7 DOCK-ACTIVE satisfied upstream — do not re-send"* precedent), recording
  which items were struck and why. Append one INBOX row per relay. Commit
  `docs(X·F/coordination): NWO-1 · NWO-5 · NWO-6 sent + E13 rows`.

### Unit `c` — the census acts at the adopted pin (G7 → M-7 → G5 → G14 → K-1)

- **Model**: opus. **Sections**: §4 step 3 `:275` · §3 **G7** `:253` · **G5** `:251` · **G14**
  `:260` · §2 WU-C `:72-82` (M-7 `:78`) · WU-D `:84-90` · WU-F `:103-118` (FM-2's token column
  `:108`) · WU-G `:120-128` · WU-M `:177-183`.
- **Writable**: `docs/tranches/X/fourier/evidence/w1/` (**create**) ·
  `docs/tranches/X/execution/C/F-W1.md`. **No product byte.**
- **Gates**: **G7** (the grep of record — its output becomes the sole budget) · **G5** (the P0
  CSS-class census, **AA-15's cure/break collision reconciled INSIDE the gate**) · **G14** (the
  floor read at the adopted tag) · **M-7**'s prop-level diff, which *precedes every per-file
  budget*.
- **Locks**: **do not average** the six Button figures — one grep of record or nothing, and state
  the counting unit beside every figure; G5's operand is the **WHOLE emitted roster at the adopted
  pin**, never a two-file subset (a shape-restricted operand is defective at authoring whatever it
  returns); the census reads **producer roster ⟷ local shadow**, never a consumer grep, for
  `.btn-pill`; G5 re-reads `a11y-overrides.css` **at the target** (GM-19's contingency — F.W1 owes
  the re-read, not the cure). **G4's emission build is NOT this unit's** — it needs the bumped
  install and is routed to `e`.
- **Brief**: Run G7's stripped-comment grep of record **at the adopted pin**, publish its output
  as the budget with its counting unit stated, and place the five superseded cells beside it (incl.
  the `162` attribute figure entered **as a member of the set, never as its answer**, and the
  34-not-35 drift of §Baseline finding 1). Run M-7 as a prop-level diff over every surviving
  subpath at `17a11bc5`, folding FM-2's **token-level break-surface column**, `fr-BasisSelector
  i-4` and `fr-NotationPills FR-NP-30` limb (c). Run G5 over the whole emitted roster at the
  adopted pin for `.paper-texture` · `text-admin-label` · `.cartoon-card` · `.btn-pill`, applying
  the `fr-PaperSidebar M3` one-command discriminator per class, and **reconcile AA-15's
  cure-vs-break collision in writing before either executes**; state which results are consumer
  re-targets (they land inside commit #4) and which are producer-owned (they leave on NWO-1).
  Read G14's floor at the tag and correct the three drifted registry rows as dated ledger rows.
  Re-resolve K-1's suspect window. Evidence under `evidence/w1/`; commit
  `docs(X·F/evidence/w1): the census acts at the adopted pin — G7 · M-7 · G5 · G14 · K-1`.

### Unit `d` — the `--viz-*` palette cure at the CURRENT pin (WU-E, ONE repair, SEVERABLE)

- **Model**: opus. **Sections**: §2 WU-E `:92-101` · §4 commit-plan step 3 `:282` (the ABORT
  SEMANTICS clause) · cross-edge 3 `:296` · §5 Excluded's `color2`/D-4 row.
- **Writable** (fourier, per §1): `web/src/lib/colors.ts` ·
  `web/src/components/visualization/lib/basis-display.ts` · `web/src/main.ts` ·
  `web/src/components/morph/HarmonicLevelGrid.vue` (HLG-41's dead `:style` at `:25`/`:48`) ·
  `web/src/components/visualization/EditorControlsDock.vue` (the `:123` magnet-track rider) ·
  `docs/tranches/X/execution/C/F-W1.md`.
- **Gates**: none of G1–G20 directly; the repair's **own** gate is M-β5's — *validate before D-1
  emits any hex branch, same commit*.
- **Locks**: **ONE repair, ONE commit** — D-1 ⊕ D-2 ⊕ C-4 ⊕ `fr-BasisCanvas C-4` ⊕ M-β5 ⊕ HLG-41
  ⊕ the L-7/m-9/M-β6/M-α5 riders (*curing either of D-1/D-2 alone worsens the surface*);
  **HLG-41's ORDERING EDICT** — the dead `:style` bindings die **BEFORE or WITH** the
  `cssVarToHex` cure, never after, because the cure MINTS the ~667.6 KiB-per-theme-flip trigger;
  **C-4's seat is `main.ts` before `app.mount()`**, shipping on the same lines as D-1; **`color2`
  NEVER** (throws wrapped, silently wrong unwrapped) and **D-4's getter cure is KILLED** (K-5);
  `light-dark()` arms resolve by **used-value probe read, never string parsing**; every SS-13
  witness and repair test **pins the entry route** (R-1: the split-brain is entry-conditional).
- **Brief**: Land WU-E as commit #3 at the **current** pin, re-homed to installed glass-ui 4.0.0's
  own `@mkbabb/glass-ui/dom` `resolveTokenColor`/`createTokenColorCache`/`useTokenColor` per
  **M-RTC** — and **not** through `./motion-curves`, which §Baseline finding 5 measures **absent at
  the adopted pin**, so routing through it would break at unit `e`. Honour the abort semantics as
  declared: this commit **presumes no hop** (no bare-root specifier, no ≥7 token spelling, no
  producer-deleted class) and is **not reverted if commit #4 aborts**. Commit
  `fix(fourier/viz): the --viz-* palette cure at the current pin`.

### Unit `e` — THE ATOMIC TRANSACTION (ONE `feat(fourier)!:` commit, TWELVE limbs)

- **Model**: opus. **Sections**: §4 step 4 `:276` (the roster, **cited whole, never restated**) ·
  §3 **G4** `:250` · **G6** `:252` · **G8** `:254` · **G9** `:255` · **G10** `:256` · **G11**
  `:257` · **G13** `:259` · §2 WU-C · WU-F · WU-G · WU-J `:150-156` · WU-K `:158-164` · WU-L
  `:166-175` · WU-N `:185-189` · WU-O `:191-197` · WU-P `:199-209`.
- **Writable** (fourier, per §1): `web/package.json` · `web/package-lock.json` · `web/tsconfig.json`
  · `web/vite.config.ts` · `web/env.d.ts` · `web/src/style.css` · the Button/lucide/metric/dock/
  tooltip consumer files enumerated at §1 · `web/src/components/ui/CollapsibleSection.vue` ·
  `web/src/components/visualization/ContourSettings.vue` · `web/src/composables/useToast.ts` ·
  `web/src/lib/easings.ts` · `web/src/composables/useMorphConfig.ts` ·
  `docs/tranches/X/execution/C/F-W1.md`. **`web/src/components/paper/**` stays CLOSED** unless a
  ruling seats G16's carry here. **PathPreview.vue is certified nil — the one file not opened.**
- **Gates turned**: **G4** (the one fresh `npm run build`, on the bumped install; grep the emitted
  CSS for `size-\(--ui-glyph\)` · `\.h-3\\.5` · `rounded-pill` · `animate-collapsible`) · **G6** ·
  **G8** · **G9** (acceptance only — execution is F.W3/W4) · **G10** · **G11** · **G13** · G7/G14
  applied.
- **Locks**: the **TWELVE-limb roster** is cited whole and nothing is added to it by a later
  reading; **ONE commit — a partial landing is the L-18 failure (§3.4)**; **G6's atomicity** (bump
  ⊕ the G7-sized prop rewrite ⊕ the `copied`→`status` triple in one change, else four green e2e
  specs go red for the wrong cause); **G8-preserving** (every migrated icon site carries
  `iconOnly`; a mechanical `size="md"` sweep silently drops the 44px floor); **G10's twin
  symmetry** — the two `[data-state]` `animation` shorthands ⊕ the PRM arm die on **both** twins at
  corresponding scope, and **`overflow: hidden` is EXCLUDED ON BOTH** (`:55` / `:362`; the `:425`
  hit is a different rule and is not touched); **D/M-8** — cure HOST import breaks FIRST;
  **MPC-31's ONE-CUT law**; **FR-CP-13's gap decision made ONCE, jointly with FR-CP-24's
  hairline row, in the same commit**; **M-γ's deletion is a sequenced prerequisite, not a
  tidy-up**; **AA-1's toast cure routes through `useToast` FIRST**; **MPC-21/BR-1 is
  delete-don't-rename**; **`./confirm-dialog` / MetricPill / `Metric`-as-AnimatedDigit-cure are
  KILLS, not options**; CVA stays (FMD-21). **BLOCKED until G19's ESC-2…ESC-7 carry a ruling or an
  explicit deferral with blocked rows named** — ESC-7 alone governs 30 `variant="outline"` sites
  across 16 files with no successor, and *the sweep may not proceed on the map's silence*.
- **Brief**: Execute §4 step 4's twelve limbs as ONE `feat(fourier)!:` commit at `v8.0.0` @
  `17a11bc5` / kf `^6.0.0` / value `^4.0.0` (lockstep, MPC-14): producer bump · the G7-sized
  Button re-grammar (`ghost`→`emphasis="quiet"`, `destructive`→`emphasis="primary" tone="destructive"`, **`default`→`emphasis="primary"`**, `size="icon"`→`size="md" iconOnly`,
  `outline` **per ESC-7's ruling only**) · the `copied`→`status` triple
  (`EquationResult.vue:15` · `UserSlugBar.vue:23` · `useMorphConfig.ts:58`) · the lucide rename to
  `@lucide/vue` (**34 sites at the settled bytes**, +1 `D·D-M11` inline at
  `EquationView.vue:277-279`, the 17 hand-svgs **ledgered not swept**) · G10's symmetric disclosure
  deletions · FR-EQC-7's `vaul-vue` declare+lock · G13's manifest/lock moves (cva/clsx/reka-ui/
  lucide out of devDeps; `@lucide/vue` declared+locked) · PP-REDGATE's ambient
  `declare module "@mkbabb/latex-paper/theme"` in `web/env.d.ts` (the TS2882 of record) ·
  FR-CP-13's gap decision · ExportModal M-γ's deletion · GCM-22's `p-0` retirement (**flips on
  ESC-1 — at the ruled 8.0.0 the `:where()` clamp supersedes it; state which way it went**) · the
  pencil-boil floor per G14 (an in-range **0.11.x**, never the excluded 0.12.0). Run G4's build and
  `npx vue-tsc -b --force` before the cut; `git diff --check`. Body carries the adopted hash, the
  G7 figure, the G5 census result and the ESC rulings applied. Commit
  `feat(fourier)!: the atomic tri-package uplift`.

### Unit `f` — post-transaction witnesses, the design ledger, and the close

- **Model**: **fable**. This is the wave's only judgment-and-design seat: it authors the WU-F
  **diff-review ledger with before/after screenshot rows**, the cross-edge-9 **visual-regression
  checkpoint set**, and **G17's written ordering ruling** — and under M-12 TRI-FOLD design work is
  Fable's while censuses, greps and mechanical cures are Opus's. It must also be a seat that did
  not author unit `a`'s bytes, because **G20 is run "by a seat that is not this file's author"**.
- **Sections**: §4 step 5 `:277` · commit-plan step 5 `:284` · §3 **G6** `:252` · **G10** `:256` ·
  **G12** `:258` · **G15** `:261` · **G16** `:262` · **G17** `:263` · **G18** `:264` · **G20**
  `:266` · §6 / §6·R1 / §6·R4 / §6·R5 · cross-edge 9 `:302`.
- **Writable**: `docs/tranches/X/fourier/evidence/w1/` · `docs/tranches/X/execution/C/F-W1.md` ·
  `docs/tranches/V/coordination/INBOX.md` (append-only, for the status marks it earns).
- **Gates turned**: **G6** (four e2e specs green post-cut) · **G10** (close COMPLETES **and**
  ANIMATES on all five disclosure surfaces) · **G12** (run the morph; `play()` resolves and
  `phase` returns to `"idle"`) · **G18** (a real drag fires `anim.startScrub()`,
  `anim.scrubbing === true` mid-drag — **read I-32's A-10 answer and state whether it discharges,
  narrows, or leaves PD-1's disjunction; never presume**) · **G15 (a)** · **G16**'s seating ·
  **G17**'s ruling · **G20** both legs · FR-CP-5's chevron verify.
- **Locks**: **probe parsimony (§5.2)** — ONE bounded Playwright session declared as a single
  shared capture family covering G10's five surfaces, G12's morph run, G18's drag, FR-CP-5's
  chevron and the edge-9 screenshot rows; no probe double-spent. **G15 is NOT satisfiable by
  prose alone** (*a gate a spec satisfies by writing its own prose is GREEN-at-birth*) — the close
  report **and** the transaction's commit body must each state the non-credit in terms.
  **G20's operand is the frozen canonical at `f44362757458` and nothing else** — a closure
  denominator copied from a check file FAILS BY CONSTRUCTION; the detector is **retained as
  stated**, never re-cut. **No VERIFIED stamp anywhere** — that verb is the X·F sub-tranche
  close's.
- **Brief**: Run the five post-transaction witnesses, author the WU-F diff-review ledger and the
  edge-9 checkpoint set, write G17's ordering ruling (FR-EQC-3 retire vs AA-4 adopt) as prose that
  the consuming F.W3/F.W4 waves can execute against, seat G16 with its named owner per §Baseline
  finding 4, state G15's non-credit in terms, then run **G20** both legs at the frozen operand and
  publish the escape/fabrication sets. Hand the residues to F.W3/W4/W9/W10 by name. Sweep E13
  before closing — **no wave closes with UNREAD mail in scope**, and I-32/I-33 are in scope.
  Commit `docs(X·F): F.W1 close report`.

### What this plan does not decide

- **ESC-2 … ESC-7 (six of the seven) are UNRULED and are returned, not presumed.** Unit `e` is
  BLOCKED on them. The largest is **ESC-7** — `variant="outline"` has no successor at ≥7 and
  measures **30 sites / 16 files**, reproduced at this seat.
- **G4's emission build** is deferred from the census unit to the transaction unit with its reason
  stated (it needs the bumped install; its command writes `web/dist`, a §1 read-only witness).
- **The §0i.2 glass-9.0.0 re-trigger** is recorded (finding 8) and routed to its owner; §0i.3's
  election is not re-opened here.

---

## Unit receipts

*(empty at open — each unit appends its own `### Unit <id>` block with its `SERVED MODEL:` line,
its commands, its measured outputs double-run, and its commit hash)*

### a

**SERVED MODEL: claude-opus-5[1m]**

**Unit**: `a` — RE-PIN, the predecessor record, and the G19 escalation (WU-A, the **first obligation** — *"nothing below sizes before it"*).
**Sections executed**: §2 WU-A `:60-65` · WU-B `:67-70` · WU-R `:221-229` (+ ESC-7 at §2·R2d) · §3 **G1** `:247` · §3 **G19** `:265` · §4 steps 1–2 `:273-274` · cross-edge 1 `:294`.
**Writable set honoured, hard bound**: `docs/tranches/X/fourier/waves/F-W1.md` (append-only) and this record. **No other path written.** The fourier · glass-ui · value.js product trees were **READ-ONLY** throughout (`git show` · `git grep` · `grep` · `sed` · `ls` · `wc` · `awk` only; **zero** files opened for write outside the two docs above). `scripts/dev/dev.sh` untouched and unstaged. Pathspec commits only.
**Clock**: 2026-09-17, following seat 0's open at 19:11 EDT.

#### Acts, in order

**Act 1 — read the governing bytes before measuring anything.** The spec read in sections at its true bytes (735 lines / 312,373 B at open) — §State/§1 `:1-58`, WU-A `:60-65`, WU-B `:67-70`, WU-R `:221-229`, §2·R2d `:386-393` (where ESC-7 is seated, its byte position deferred so no insert re-keys `:276`/`:294`), §3 `:243-267`, §4 `:270-286`, cross-edges `:293-304`, and the file tail `:717-735` to find the lawful append point. `COHESION.md` **§0i.3** (the ruling), **§0i.5** (the erratum — it addresses **§0i.2's** receipt (3), *not* §0i.3's), **§0j.D** (X·F's owner rows, incl. `G-10`'s F8-REACH DELETE). `execution/C/F-W1.md` §Open + §Baseline + §Unit plan. `execution/LEDGER.md`'s Track C F.W1 row.

**Act 2 — G1's BEFORE reading, taken with the record's own born-RED command.** ⟨cmd⟩ (cwd `docs/tranches/X/fourier/waves/`) `grep -c "17a11bc5" F-W1.md` → **0**. The ruling that fills the cell existed at `COHESION.md` §0i.3 and was **not written into the wave's own spec** — precisely the born-RED §Baseline declares.

**Act 3 — the pin re-verified at the producer's bytes, READ-ONLY, double-run.** The pin is a claim about bytes, so this seat re-measured rather than transcribing:
- ⟨cmd⟩ (cwd `/Users/mkbabb/Programming/glass-ui`) `git tag --points-at 17a11bc5` → `v8.0.0` · re-run → `v8.0.0`
- ⟨cmd⟩ `git rev-parse --short=8 'v8.0.0^{commit}'` → `17a11bc5` · re-run → `17a11bc5`
- ⟨cmd⟩ `git show 17a11bc5:package.json | grep -m1 '"version"'` → `    "version": "8.0.0",`

**The tag and the hash are each other's inverse at these bytes.** BASELINE LAW applied: the adopted tag decides regardless of any working tree's self-report (the producer's live `package.json` version string reads **9.0.0**; that is a **label**, never a pin — F.W0's `P-4`).

**Act 4 — the ruling quoted by command, never re-argued.** ⟨cmd⟩ (cwd `docs/tranches/X/`) `grep -o 'Ruled: 8.0.0, same tag and hash as §0i.2' COHESION.md` → `Ruled: 8.0.0, same tag and hash as §0i.2` · ⟨cmd⟩ (double-backtick form, the pattern carries backticks) ``grep -o '\*\*G1.s cell is filled by this ruling: TAG `v8.0.0` · ADOPTED COMMIT HASH `17a11bc5`.\*\*' COHESION.md`` → ``**G1's cell is filled by this ruling: TAG `v8.0.0` · ADOPTED COMMIT HASH `17a11bc5`.**`` · ⟨cmd⟩ `grep -o 'BASELINE LAW stands (the adopted tag decides regardless of any working tree.s self-report)' COHESION.md` → `BASELINE LAW stands (the adopted tag decides regardless of any working tree's self-report)`. **§0i.3's four receipts are NAMED in the addendum and re-argued nowhere** — (1) the corpus is sized for 4→8 with three break/cure families existing only at 8.0.0; (2) registry-pinned, so PIN-LAW discharges as written; (3) constellation cohesion at ONE audited hash, never `d4f7b24f`; (4) 9.0.0's `./canvas` removal unpriced in every `fr-*` record.

**Act 5 — cross-edge 1 / R-9.1: F.W0's three tables QUOTED BY GATE ID, never re-resolved.** All `grep -o` word-output against the live sibling (R3-3.10's lawful form — **no count of a live sibling was taken**), cwd `/Users/mkbabb/Programming/fourier-analysis/docs/tranches/F/`:
- **`G-11`** ⟨cmd⟩ `grep -o '### 2.1 G-11 — THE CORRECTED ANCHOR TABLE' SUBSTRATE-LEDGER.md` → `### 2.1 G-11 — THE CORRECTED ANCHOR TABLE`; ⟨cmd⟩ `grep -o 'This is the ONE table; every later X·F wave \*\*quotes\*\* it and re-performs no' SUBSTRATE-LEDGER.md` → `This is the ONE table; every later X·F wave **quotes** it and re-performs no`; its standing rule ⟨cmd⟩ `grep -o 'Producer-side evidence carries the producer COMMIT HASH, never the version string' SUBSTRATE-LEDGER.md` → `Producer-side evidence carries the producer COMMIT HASH, never the version string` (**P-4**).
- **`G-12`** ⟨cmd⟩ `grep -o '### 2.2 G-12 — THE CORRECTED-DENOMINATOR TABLE' SUBSTRATE-LEDGER.md` → `### 2.2 G-12 — THE CORRECTED-DENOMINATOR TABLE`; ⟨cmd⟩ `grep -o 'Every later X·F wave \*\*cites this table\*\* and never a' SUBSTRATE-LEDGER.md` → `Every later X·F wave **cites this table** and never a`; ⟨cmd⟩ `grep -o 'Quoting any of these downstream is a defect against G-12 on sight' SUBSTRATE-LEDGER.md` → `Quoting any of these downstream is a defect against G-12 on sight`.
- **`G-13`** ⟨cmd⟩ `grep -o '### 2.3 G-13 — THE PRODUCER PIN TABLE, THE LATTICE, AND THE ASYMMETRY' SUBSTRATE-LEDGER.md` → `### 2.3 G-13 — THE PRODUCER PIN TABLE, THE LATTICE, AND THE ASYMMETRY`; the cell this unit fills ⟨cmd⟩ `grep -o 'PROSPECTIVE — F.W1 fills this cell at adoption' SUBSTRATE-LEDGER.md` → `PROSPECTIVE — F.W1 fills this cell at adoption`; the obligation, in two commands because the sentence spans a line ⟨cmd⟩ ``grep -o 'every producer `file:line` in the' SUBSTRATE-LEDGER.md`` → ``every producer `file:line` in the`` and ⟨cmd⟩ `grep -o 'F.W1 budget is re-resolved at the ADOPTED hash before it is scheduled' SUBSTRATE-LEDGER.md` → `F.W1 budget is re-resolved at the ADOPTED hash before it is scheduled`.

**Not one producer anchor was re-resolved by this seat.** The hash is now named, so `G-13`'s obligation is **runnable for the first time**; **the running of it per budgeted coordinate is the census unit's act** (§4 step 3), against `G-11`'s table and never beside it.

**Act 6 — §4 step 2: F.W0's four discharges RE-MEASURED and RECORDED, never performed.** Substrate fourier HEAD ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short=7 HEAD` → **`5842377`**, branch `m/w1-bump-migration`. All four reproduce §Baseline **exactly**:
- **G2** — ⟨cmd⟩ `wc -c < web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` → **13949** (twice) · ⟨cmd⟩ `grep -c "@source" …/index.css` → **3** (twice) · ⟨cmd⟩ `grep -m1 '"version"' …/glass-ui/package.json` → `"version": "4.0.0",`. Red **at the installed pin**; **absent at the adopted pin** per §0i.5's 1,514-byte, postcss-parsing measurement of the 8.0.0 registry tarball. Recorded; the red is cured BY the transaction.
- **G3** — ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l` → **0**, double-run. GREEN-BEFORE-CURE **by predecessor**, declared under R.2.
- **MISS-LC2** — the gate is AUTHORED at `SUBSTRATE-LEDGER.md` **§4.1**: ⟨cmd⟩ `grep -o '### 4.1 THE MANIFEST GATE — the text, as F.W1 receives it' SUBSTRATE-LEDGER.md` → `### 4.1 THE MANIFEST GATE — the text, as F.W1 receives it` (F.W0 commit `87ecc85`). Born-RED at the manifest: ⟨cmd⟩ `grep -n "lucide\|vaul-vue" web/package.json` → **one hit only**, `35:        "lucide-vue-next": "^1.0.0",`, double-run — `@lucide/vue` **no row**, `vaul-vue` **no row**. **Its LANDING stays F.W1's**, inside the transaction (§4 step 2's own R-4a clause).
- **F8-REACH-01 + 02** — ⟨cmd⟩ `ls web/src/components/equation/InfoCard.vue web/src/components/ui/CanvasOverlayButton.vue` → `No such file or directory` **×2**. Both **ABSENT**, deleted at `5842377` under §0j.D's `G-10`.

**Act 7 — K-1's suspect window RE-RESOLVED AT THE ADOPTED TAG (re-baseline, never re-book).** The election retargeted 8.0.0, so `K-1`'s own instruction fires. All three named suspects re-resolved READ-ONLY at `17a11bc5`; **no severity re-graded, no banked id re-booked, no registry record touched (E-3)**:
- **`fr-CoefficientsPanel FR-CP-21`** — ⟨cmd⟩ `git grep -c "@utility text-admin-label" 17a11bc5 -- src/styles` → **no match (exit 1)**; the same command at `v7.0.0` → `v7.0.0:src/styles/typography/semantic.css:1`. **Premise HOLDS at the adopted tag. RE-BASELINED.**
- **`fr-App MG-β`** — ⟨cmd⟩ `git grep -n "admin-label" 17a11bc5 -- src/styles | wc -l` → **0**; ⟨cmd⟩ `git grep -n "admin-label" 17a11bc5 -- src` → **exactly one hit, and it is the allowlist**: `src/components/_shared/class-names.ts:84` (the `text-(…|admin-label|…)` regex). **So MG-β's sharpest clause — *"surviving only as a regex-allowlist entry with no rule behind it, which is worse than absence"* — is TRUE AT 8.0.0, not merely at 7.0.0.** **RE-BASELINED**; **AA-15's cure/break collision is LIVE at the adopted pin** and is `G5`'s to reconcile in writing (unit `c`).
- **`fr-App B-2`'s `.paper-texture` premise** — ⟨cmd⟩ `git grep -n "@utility paper" 17a11bc5 -- src` → **exactly two**: `src/styles/paper.css:100:@utility paper-underpaint {` · `src/styles/paper.css:125:@utility paper-grain-overlay {`; ⟨cmd⟩ `git grep -n "\.paper-texture" 17a11bc5 -- src` → **one hit, PROSE inside a comment** at `src/styles/tokens/scale-paper.css:114` — **no rule at the adopted tag**; the `--paper-texture-size` token survives at `src/styles/tokens/offsets.css:106`. **RE-BASELINED.** This **does not answer ESC-5**, which asks a severity question; it confirms the premise ESC-5 prices.

**One measured correction, travelling as a dated row and moving nothing.** `fr-FrequencyGraph.md`'s `K-1` cell states *"`git grep -n admin-label v7.0.0 -- src/styles` → 4 hits"*. **This seat measures FIVE** at that exact command, double-run (`recount: 5` / `recount2: 5`), and **enumerates rather than asserts**: `theme/bridges.css:16` · `typography.css:12` (a docblock prose mention) · `typography/scale.css:86` · `typography/semantic.css:238` · `typography/semantic.css:240`. **Counting unit: matching LINES over `src/styles`** — a different object from the `@utility` DECLARATION count, which is **1** at `v7.0.0` and **0** at `17a11bc5` and is the load-bearing figure. **Nothing moves**: at the adopted tag the figure is **0** under either unit. Routed to unit `c` (which owes the counting unit beside every figure) and to the close as an **NWO-4-class census correction** — **never** as a re-grade of `K-1`.

**Act 8 — the two measured facts that RE-KEY WU-K and WU-G at 8.0.0, re-measured and double-run.**
- **WU-K** — ⟨cmd⟩ `git show 17a11bc5:package.json | grep -c '"\./motion-curves":'` → **0** (twice). WU-K's banked sequencing correction is a **4.0.0-only** fact. **Binding on unit `d`**: a cure routed through `./motion-curves` in commit #3 lands green now and **breaks at commit #4**. **M-RTC's seat survives the hop** — ⟨cmd⟩ `… grep -c '"\./dom":'` → **1** (twice); ⟨cmd⟩ `git grep -ln "resolveTokenColor|createTokenColorCache|useTokenColor" …` run as three separate greps → `src/composables/dom/useResolveTokenColor.ts` (and `…/useTokenColor.ts`) live in the tag's source. Commit #3's ABORT SEMANTICS are untouched: it stays severable and landable at the CURRENT pin, re-homed to `/dom`, present at **both** pins.
- **WU-G** — the subpath census re-run at `17a11bc5`, one command per key, double-run on `./menu` · `./metric` · `./animated-digit` (each reproducing): `./dropdown-menu` **0** → `./menu` **1** · `./icon-tooltip` **0** · `./toggle-chip` **0** → `./chip` **1** · `./confirm-dialog` **0** · `./checkbox` **1** · `./scrolling-text` **0** · `./metric-cell` **0** · `./metric` **1** · `./metric-badge` **0** · `./animated-digit` **0** with `./motion` **1** and `useAnimatedNumber` at `src/composables/motion/number/useAnimatedNumber.ts` (**B-4's cure is executable**) · `./hover-card` **0** · `./button` **1** · `./easing` **1** (**R4-6.1's cross-package homonym is REAL at this pin**) · `./search` **1** · `./canvas` **1** (their removal is a 9.0.0 fact, not this wave's) · `./pagination` **0** (**`AA-11` holds BY CONSTRUCTION**). **Every amendment reproduces.** Disclosed and unresolved: ⟨cmd⟩ `… grep -c '^        "\./'` → **69** against the banked *"70 @ 8.0.0"* — a one-key difference, most likely this probe's indentation anchor; **stated, not averaged, not adjudicated**; owned by `G7`/`G5`'s counting-unit discipline. **No figure in the addendum depends on it.**

**Act 9 — G19's falsifier, run twice and widened once.** ⟨cmd⟩ (cwd `docs/tranches/X/`) `grep -n "ESC-2\|ESC-3\|ESC-4\|ESC-5\|ESC-6\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → **no output, exit 1** (run1) · **no output, exit 1** (run2). Widened once: ⟨cmd⟩ `grep -rln "ESC-2\|…\|ESC-7" .` (this spec and this record excluded) → `fourier/carry/F-W1-CARRY.md` · `fourier/waves/F-W2.md` · `fourier/conformance/PASS-1..PASS-5/*` · `execution/LEDGER.md` — i.e. **only where they are RAISED, never where one is ANSWERED**; ⟨cmd⟩ `grep -n "ESC-2\|…" execution/LEDGER.md` returns the F.W1 row that states the same classification in its own words. **No ruling and no explicit deferral exists for any of the six.**

**Act 10 — the landing: ONE dated addendum-beside, appended at the file's end.** New section **`F-W1.md` §8** — *"DATED ADDENDUM-BESIDE (EXECUTION, 2026-09-17): WU-A's RE-PIN DISCHARGED"* — with §8.1 (G1's filled cell + the ruling id + its four receipts named) · §8.2 (the `G-11`/`G-12`/`G-13` quotation by gate id) · §8.3 (the four discharges recorded) · §8.4 (K-1's suspect window re-resolved) · §8.5 (the two WU-K/WU-G re-keys) · §8.6 (G19: ESC-1 ruled, ESC-2…ESC-7 returned with blocked rows named) · §8.7 (what the addendum does not do).

**E-3 form proved at the diff, not asserted**: ⟨cmd⟩ `git diff --numstat -- docs/tranches/X/fourier/waves/F-W1.md` → **`103	0`** — **103 insertions, ZERO deletions**. No dated cell rewritten; **no row inserted above `:294`**. The four pinned coordinates re-read BEFORE and AFTER by ⟨cmd⟩ `sed -n '161p;227p;276p;294p' F-W1.md | cut -c1-70` and **byte-identical** both times: `:161` `| **L/B-1 + C/B-1** (BLOCKER-fold) | value 4.0.0 has no …` · `:227` `| **ESC-4** | Easing semantic drift acceptance (14/22 analytic→CubicBe` · `:276` `4. **The atomic transaction (ONE change, G6):** producer bump (glass +` · `:294` `1. **F.W0 → F.W1 (HARD predecessor).** G2 · G3 · MISS-LC2 · FR-AH-33 ·`. ⟨cmd⟩ `git diff --check` → clean (exit 0). A **pipe-balance sweep** was run over the addendum's four tables before the append — an `awk` character scan (the bar built as `sprintf("%c",124)`, so the command is pipe-free in source) reporting unescaped bars per table row — and every table is internally uniform (**4 · 4 · 5 · 5** bars), **0 ragged rows**: the §E-3·R2 defect that once broke G1's own row did not recur.

**Commit**: **`c05fc57e`** — `docs(X·F): F.W1 G1 re-pin + F.W0 discharge record — ESC-2..ESC-7 returned`.

#### Gate readings, BEFORE → AFTER

| gate | BEFORE (at open) | AFTER (this unit) | receipt |
|---|---|---|---|
| **G1** RE-PIN | **RED** — ⟨cmd⟩ `grep -c "17a11bc5" F-W1.md` → **0**; the ruling existed at §0i.3 and was not written into the wave's own spec | **GREEN** | same command → **18**, double-run. The cell is filled at §8.1: **TAG `v8.0.0` · ADOPTED COMMIT HASH `17a11bc5`**, quote-by-command ⟨cmd⟩ ``grep -o '\| \*\*ADOPTED COMMIT HASH\*\* \| \*\*`17a11bc5`\*\*' F-W1.md`` → ``\| **ADOPTED COMMIT HASH** \| **`17a11bc5`**`` *(every `\|` in this cell is a vertical bar U+007C escaped for THIS TABLE CELL and nothing more; it unescapes to a bare bar when the command is pasted, and the bar is BRE-literal inside the single quotes)*. Pin kind stated as **REGISTRY-PINNED**, as PIN-LAW's tag-vs-registry clause demands. G1 is a **QUOTATION** of `G-11`/`G-12`/`G-13` cited by gate id (§8.2) — no rival re-resolution exists |
| **G19** owner rulings | **RED — ONE of SEVEN** | **RED — ONE of SEVEN (honest; unchanged)** | **ESC-1 RULED** (§0i.3) and now recorded at §8.6 with its blocked set named UNBLOCKED. **ESC-2 · ESC-3 · ESC-4 · ESC-5 · ESC-6 · ESC-7 carry NO ruling and NO explicit deferral** — falsifier run twice, exit 1, widened once. **RETURNED with blocked rows named**, never presumed, never swept. A gate whose condition names seven answers and holds one **is not green, and this unit does not stamp it** |
| **§4 step 2** — the recording of **G2 · G3 · MISS-LC2 · F8-REACH-01+02** | not yet recorded in the spec | **RECORDED** (obligation discharged) | §8.3's table, each row re-measured at these bytes and double-run; reproduces §Baseline exactly. **G2's red is recorded, not cured here**; **G3 is green-before-cure by predecessor, declared under R.2**; **MISS-LC2's landing remains F.W1's**, inside the transaction; **F8-REACH-01+02 absent at the bytes** |

#### Residuals handed forward, by name

1. **→ unit `d` (binding).** `./motion-curves` is **ABSENT at 8.0.0**. The WU-E palette cure must route through **`./dom`** (`resolveTokenColor` / `createTokenColorCache` / `useTokenColor`), present at **both** pins. A `./motion-curves` route lands green at commit #3 and **breaks at commit #4**.
2. **→ unit `c` (G5).** **AA-15's cure/break collision is LIVE at the adopted pin**: `text-admin-label` has **no rule** at `17a11bc5` while `class-names.ts:84`'s regex still accepts it. The collision must be **reconciled in writing before either side executes** (§3 G5's own clause).
3. **→ unit `c` (counting units).** The `K-1` line-count correction (banked *"4 hits"*; measured **5** at `v7.0.0`, enumerated; the **declaration** count 1 → 0 is the load-bearing one) and the **69-vs-70** export-key probe difference. **Neither is averaged; neither moves a verdict.**
4. **→ unit `e` — BLOCKED.** The atomic transaction may not begin until **ESC-2…ESC-7** carry a ruling or an explicit deferral with blocked rows named. **ESC-7 alone governs 30 `variant="outline"` sites across 16 files with no successor**, and *the sweep may not proceed on the map's silence*.
5. **→ the owner.** **ESC-5's premise is now measured TRUE at the adopted tag** (`.paper-texture` has no rule at `17a11bc5`), which sharpens ESC-5's severity question without answering it.
6. **→ unit `f` / the close.** The spec's `§State` **Status** cell still reads `planned` and the four-verb table's `IMPLEMENTED` still reads `NO`. **This unit deliberately did not touch either** — its authority is *dated addendum-beside only*, the wave's execution state of record is `execution/LEDGER.md`'s Track C row (`OPEN 2026-09-17`), and the `IMPLEMENTED` advance is the close report's act. **Disclosed so it is a decision and not an oversight.**
7. **→ unit `b` / the close (E13).** **I-32 · I-33 · I-34 remain `UNREAD 2026-09-17`.** This unit **flipped no status cell** — flipping is the consuming unit's act, with its receipt — and appended **no** INBOX row, having sent no mail. **No wave closes with UNREAD mail in scope.**

#### Escalation RETURNED by this unit

**ESC-2 … ESC-7 — SIX owner rulings, UNRULED, flagged INLINE at `F-W1.md` §8.6 and RETURNED.** Blocked rows named per row: **ESC-2** → `fr-PaperSidebar L-4` · `M6`. **ESC-3** → `U-2`. **ESC-4** → `L/B-1` · `MPC-5/RD-5`. **ESC-5** → `B-2`. **ESC-6** → `FR-MSP-12` → `FR-COB-26`. **ESC-7** → the **30 `variant="outline"` sites / 16 files** · AA-2's sweep · G7's budget · `fr-BasisSelector M-1` · **G6's atomicity** (an unruled arm inside a land-or-lose transaction is an unbounded limb). **A seat may not defer on the owner's behalf**: the deferral G19 accepts is an *explicit* one, and naming the blocked rows is the whole of what this seat can supply.

---

### b

**SERVED MODEL: claude-opus-5[1m]**

**Unit**: `b` — the relay packets (**NWO-1 · NWO-5 · NWO-6**) and their E13 rows.
**Sections executed**: §2 **WU-S** `:231-239` · §3 **G15** `:261` · §4 commit-plan step 2 `:281` · cross-edges **4 · 5 · 6** `:297-299` · §5 **Excluded**'s producer-owned row `:511` (and `:525`, the conditional `paper/**` bound).
**Writable set honoured, hard bound**: `docs/tranches/X/coordination/` (three letters **created**) · `docs/tranches/V/coordination/INBOX.md` (**append-only**) · this record. **No other path written.** The fourier · glass-ui · latex-paper · pencil-boil trees and the npm registry were **READ-ONLY** throughout (`git show` · `git grep` · `grep` · `sed` · `ls` · `wc` · `awk` · `npm view` only). `scripts/dev/dev.sh` untouched and unstaged; `docs/tranches/V/reformation/CARRY-LEDGER.md` left dirty-as-found and unstaged. Pathspec commits only.
**Clock**: 2026-09-17, 19:4x EDT, following unit `a`'s landing at `c05fc57e`.

#### Acts, in order

**Act 1 — the seat-0 brief's FIRST obligation, discharged before a byte of NWO-1 was written: I-32 and I-33 read in full and the roster reconciled against them.** §Open declared the consequence at this seat's name (*"unit `b` reconciles NWO-1's roster against I-32 **before sending**, so no producer-disposed item is re-sent"*), and the precedent it cites is the carry's own *"item 7 record DOCK-ACTIVE is satisfied upstream — **do not re-send**"*. **I-32** (`../glass-ui/docs/tranches/BK/coordination/glass-outbound-2026-09-17-valuejs-o20-disposition.md`) was read **whole** — §A `A-1`..`A-14` · §B `B-1`..`B-7` · §C `C-1` · §D · the *"Not restated here"* tail — and **I-33** (`…-constellation-o20-relay.md`) likewise, its **§1 `fourier-analysis`** being the section addressed at this tree.

**The single largest finding of this unit, and it was not in the plan.** The roster's final member is *"`SC-1..SC-8` carry forward from COHESION §4a"*. Reading §4a to fetch them, ⟨cmd⟩ (cwd `docs/tranches/X/`) `awk 'NR>=116 && NR<=131' COHESION.md`, the register's own last row reads: **`**DISPATCHED 2026-08-28**: SC-1..SC-8 … assembled into **O-20** (`../glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md`, 26 entries; cartoon-card retired, DOCK-ACTIVE negative-ask honored)`**. **I-32 is titled *"O-20 DISPOSITION — every item of your 2026-08-28 batch, re-read against published 9.0.0"*.** So the eight SC rows were not merely *disposable* — **they are the very batch I-32 exists to answer**, and sending them again on NWO-1 would have been a **double-send of an already-answered letter**. Each of the eight maps to a named disposition, one-to-one: **SC-1→A-2 KILL · SC-2→A-6 KILL · SC-3→C-1 ANSWER+CURE-NOW · SC-4→A-5 CURE-NOW · SC-5→B-2 DECLINE+CURE-NOW · SC-6→A-3 KILL · SC-7→B-1 CURE-NOW · SC-8→A-4 KILL**. All eight struck.

**Act 2 — the reconciliation, run to completion and published as a table the producer can audit.** Every roster entry was disposed explicitly; nothing was dropped silently and nothing was struck on a resemblance.

| entry | verdict | disposing item |
|---|---|---|
| **FR-NP-32 ≡ `fr-PaperSidebar M1`** | **DISPOSED-CONFIRMED · 1 residual · kept at TOP** | I-32 **A-1 CURE-NOW** |
| FR-COB-7 · FR-COB-8 · FR-COB-6 · FR-COB-23 · FR-COB-26 · FR-MSP-12 · btn-glass hazard · DOCK-ACTIVE · M-1 · FR-EQR-7 · FR-TT-9 · PD-1 | **STRUCK** (12) | A-11a⊕A-11b ⊕ I-33 RETIRE · A-3(class) · A-11b · A-11c · A-11d · **A-12 ROUTE→fourier** · A-11e · the carry itself · B-3 · C-1 · the 8.0.0 cure · **A-10 ⊕ I-33 §1** |
| SC-1 … SC-8 | **STRUCK** (8) | A-2 · A-6 · C-1 · A-5 · B-2 · A-3 · B-1 · A-4 |
| **m-17** | **SPLIT — instance struck, remainder re-sent** | B-3 cures `cn("text-caption","text-admin-label")`; the **group table** (`text-dropdown` → text-colour, `rounded-pill` → no group) is unnamed |
| m-21 · GAB-2(a) ⊕ the 3.26:1 rung · `B-4`'s i-4 · FR-TT-6 · C-13 | **LIVE — untouched by either letter** (5) | — |

**Two disciplines held while striking.** (i) **Cite-both-never-substitute**: FR-NP-32 is carried **with** `fr-PaperSidebar M1` as two banked witnesses of one fact, and **at TOP** as §1 of the letter, because the lock says TOP and the brief says strike — the resolution is that it sits at TOP *as a confirmation with a named residual*, never as an ask re-sent. (ii) **The strike is not a silent deletion**: all 21 struck rows are **published in the letter at §2** with the disposing item quoted, and §5 ask 3 invites the producer to name any strike we got wrong — *"we would rather be told we struck too eagerly than have a live producer defect quietly leave the register."*

**Act 3 — a naming collision found and disclosed rather than reconciled away.** The carry's roster names **`B-4`'s i-4**; **I-32 and I-33 also carry a row they call `B-4`** (the `viz-easing` / `--viz-amber` row). **They are different records.** Left unstated, a reader reconciling the two letters would have matched the wrong pair and concluded i-4 was disposed. Disclosed in the letter at §2's closing note: *"Where this letter says **"B-4's i-4"** it means **ours**; where it quotes your `B-4` it says *"your B-4"*."*

**Act 4 — the live rows re-measured at the ADOPTED pin, READ-ONLY, so the letter asks with evidence.** Nothing was carried on the carry's word where a measurement was available:
- **`m-21`** — ⟨cmd⟩ (cwd `/Users/mkbabb/Programming/glass-ui`) `git grep -n -- "--slider-track-height" 17a11bc5 -- src` → `src/components/slider/styles.css:45` (docblock) · `:49` `0.75rem` · `:53` `1.25rem` · `:57` `1.75rem` · `:74` `calc(var(--slider-thumb-size, 1rem) * 1.5)` · `:88` (read with a `0.375rem` fallback). **The mechanism the ask needed is right there**: the rungs are declared on **`.glass-slider[data-size="…"]`, specificity `0,2,0`**, so a consumer's `.glass-slider` rule (`0,1,0`) **loses** and tuning requires hard-coupling to a producer-internal attribute spelling. The letter asks for a seam, and names the producer's own *inscription law* (`:45-47`, *"thumb ≤ track at every rung"*) as the constraint to **preserve, not bypass**.
- **`B-4`'s i-4 — the finding REPRODUCES and the ANCHOR HAS DRIFTED; the drift is recorded and the intent taken at the true bytes.** Banked coordinate `MIGRATION.md:738-739`. ⟨cmd⟩ `git show 17a11bc5:MIGRATION.md | grep -n "animated-digit"` → **`838:| `AnimatedDigitMode` | type | `/animated-digit` |`** and **`839:| `AnimatedDigitProps` | type | `/animated-digit` |`** — a **+100-line drift**, same two rows. Against unit `a`'s WU-G census (`./animated-digit` → **0** at `17a11bc5`), the guide routes two public type symbols to a subpath that does not exist at the version it is migrating to. **I-32's framing fact (2) is received and applied, not ignored**: `MIGRATION.md` is not in the tarball, so the row is graded a **GitHub doc row** — lower urgency, not dissolved, because the guide is what a consumer reads to plan exactly this hop.
- **`FR-TT-6` — anchor drift recorded, and the coordinate deliberately NOT guessed.** Banked `offsets.css:78-82`; ⟨cmd⟩ `git show 17a11bc5:src/styles/tokens/offsets.css | sed -n '74,86p'` shows that window is now the `--overlay-max-block` / `--overlay-pad` docblock running to `:86`. The letter gives the finding its **INTENT at the true bytes** (the tooltip chip's inverted padding ratio 2.00 → 0.79, the dropped `text-sm` line-height pairing, the demoted type rung under a comment that mis-names its own backing) and asks the producer to resolve the coordinate in their own tree **rather than having this seat re-key their file for them**.
- **`GAB-2(a)` ⊕ the 3.26:1 rung · `C-13`** — carried **by row label, un-re-derived** (WU-S's own law for this packet). Confirmed absent from both producer letters before re-sending.

**Act 5 — G15 (b)'s own operand: FR-GIG-5 assembled with its three preserved BLOCKER dissents.** The carry's NWO-1 row does **not** list FR-GIG-5; **§5 `:511` and G15 (b) do**, so it was added with that authority cited rather than invented. **Both ids are carried, neither substituted**: `FR-GIG-5` is F.W1's **non-credit LOCK** row (`F-W1-CARRY.md:149`); `FR-GIG-1` is the adjudicated drain (`docs/tranches/V/megatranche/registry/adjudicated/fr-GalleryInfiniteGrid.md`), and the dissents are **FR-GIG-1's**. Read at the registry, ⟨cmd⟩ `grep -n -i "dissent" fr-GalleryInfiniteGrid.md` → `:16` *"three BLOCKER filings preserved in dissent (L axis, C axis, reader-B)"* and `:26` (R-1) *"MAJOR (blocker-weight); three BLOCKER filings in dissent."* **All three are named in the letter by axis** — L · C · reader-B — **preserved, not re-argued**, and the record's own **re-opener** travels with them (*"if SS-13 measures the frame-cadence retry storm or a ⌈N/20⌉ burst at production scale, this grade re-opens"*), as do the two live maskers and the killed third. Both legs of the mechanism are stated (leg A: `check()` fires without consulting any intersection record, re-armed by rAF on every `isLoading` true→false edge; **leg B: the observer root is the primitive's own non-clipping `<div>`**, which is why **the loop survives 4.0.0 → 7.0.0 → 8.0.0** and no bump discharges it), and the adjudicated producer cure is the ask verbatim: **root must default `null`, or a real scroll port must be required; `check()` must consult intersection.**

**Act 6 — NWO-5, and G16's disjunction resolved by measurement rather than by preference.** §Baseline finding 4 called G16's first arm unexecutable; this seat re-measured rather than inheriting it, double-run: ⟨cmd⟩ (cwd `/Users/mkbabb/Programming/fourier-analysis`) `grep -c "hsl(var(" web/node_modules/@mkbabb/latex-paper/src/vue/theme.css` → **42 · 42**; `wc -c` → **15764**; ⟨cmd⟩ `grep -rn "hsl(var(" web/src | wc -l` → **0**. **The decisive new receipt is the manifest**: ⟨cmd⟩ `grep -n '"files"' -A4 package.json` → `"files": [ "dist", "grammar", "src/vue/theme.css" ]` — **the file is PUBLISHED producer bytes, not a stray source artifact**, which is what makes an in-place rewrite a `node_modules` patch (HIGH defect) rather than a judgement call. **G16 therefore resolves to arm two, and the named owner is the latex-paper producer** (sibling tree `/Users/mkbabb/Programming/latex-paper`, confirmed present). `web/src/components/paper/**` stays **CLOSED** (`:525`). **This seat authored the ask; it did not stamp the gate** — G16's seating is unit `f`'s reading.
- **`fr-PaperView C-06` measured at the published bytes**, because the `src/` tree is not in the tarball: ⟨cmd⟩ `grep -rn "ComputedRef<any>" .` → **`dist/vue/composables/useVirtualSectionWindow.d.ts:19` `activeId: import("vue").ComputedRef<any>;`** and **`:20` `activeRootId: …`**. The letter states the fix as the relay's (`ref<T|null>`, per §2·R2b **b.5**) and **explicitly refuses the consumer-side cast**, on the ground that a cast would restore the *appearance* of type safety at the six sites where it is absent and hide the next drift — the §5 producer-owned bar applied, not merely cited.
- **katex** — ⟨cmd⟩ `grep -n "katex" package.json` → peer `^0.16` at `:42`, **optional** at `:47-49`, devDep `^0.16` at `:60`; ⟨cmd⟩ `grep -m1 '"version"' web/node_modules/katex/package.json` → **`0.17.0`**. **0.17.0 does not satisfy `^0.16`**; it resolves only because the peer is optional, which suppresses the warning without making the pair declared-supported. Both answers (widen, or state the exclusion) are named as actionable; the present state is named as the only one that is not.
- The four WU-S gaps (**slot-type · slug-uniqueness · sourceLevel · ref**) are carried **by row label and NOT re-derived**, with the reason stated in the letter rather than hidden: re-deriving them at this seat risked publishing a shape the banked record does not hold. A second page is offered on request.

**Act 7 — NWO-6, and a MEASURED CORRECTION to this wave's own baseline, published rather than propagated.** The brief instructed this seat to name the in-range set as *"`0.11.0` · `0.11.2`"*, which is also what §Baseline's **G14** row states. **Measured at the registry, that is the in-range set of a different range.**

| ⟨cmd⟩ | output |
|---|---|
| `npm view @mkbabb/pencil-boil versions --json` | 19 versions, tail `…,"0.10.1","0.11.0","0.11.2","0.12.0"` |
| `npm view @mkbabb/pencil-boil version` | **0.12.0** (`latest`) |
| `npm view "@mkbabb/pencil-boil@^0.11.2" version` | **`0.11.2`** — run 1 |
| `npm view "@mkbabb/pencil-boil@^0.11.2" version` | **`0.11.2`** — run 2 (double-run, identical) |
| `npm view "@mkbabb/pencil-boil@^0.11.0" version` | `0.11.0` **and** `0.11.2` — two lines |

**The in-range published set of `^0.11.2` is `{0.11.2}` — ONE version.** `0.11.0 < 0.11.2`, so it is in range of **`^0.11.0`**, not of `^0.11.2`; the banked two-element set belongs to the wrong range. **WRITE-THEN-MEASURE governs over the brief's figure, so the letter publishes the measured set and says which record it corrects.** **The finding does not move** — `^0.11.2` still excludes `0.12.0`, which is the whole of **C-18.2** — but **the escape hatch is one version wide, not two**, which *sharpens* the ask: a consumer pinning "an in-range 0.11.x" has exactly one choice and no fallback. **E-3 form**: the correction travels as a row in the letter and as this receipt; **§Baseline's G14 cell is not rewritten**, and **no banked id is re-graded** (M-2's *"the v7 floor is `^0.9.2`"* stands as banked — a different object). **Binding on unit `e`**, whose brief reads *"an in-range **0.11.x**, never the excluded 0.12.0"*: **that phrase now has a unique referent, `0.11.2`.**
- **L-2's false manifest measured at the bytes**: ⟨cmd⟩ `grep -m1 '"version"' web/node_modules/@mkbabb/pencil-boil/package.json` → `"version": "0.4.1"`; ⟨cmd⟩ `grep -n '"sideEffects"' …` → **`9:  "sideEffects": false,`**. The banked **rider** is carried in terms — **deleting `SvgFilters` does NOT discharge this row** — because it is the clause most likely to be mis-read as a discharge.
- **L-i3 / C-18.1's census artifact reproduced, with its counting unit stated beside it** (the discipline §3 G5/G7 impose on every published figure): ⟨cmd⟩ `grep -rn "pencil-boil" web/src` → **four matching lines**, of which **three are `import` statements** (`FourierShapeExtractor.vue:144` · `SvgFilters.vue:3` · `svg-fourier.ts:11`) and **`SvgFilters.vue:19` is a comment**. **3 import statements / 3 files** is the load-bearing figure; **4 matching lines** is a different object. This is exactly the label-vs-list disagreement L-i3 books, reproduced at the bytes rather than taken on trust. Fourier's own declared range is ⟨cmd⟩ `grep -n "pencil-boil" web/package.json` → `17: "@mkbabb/pencil-boil": "^0.4.1"`, resolving to **0.4.1** exactly.

**Act 8 — the three letters written, then MEASURED at their settled bytes (write-then-measure, SELF-COUNT).**

| packet | path | bytes | lines |
|---|---|---|---|
| **NWO-1** | `docs/tranches/X/coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md` | **28,031** (double-run; 26,959 at first draft, before the §2 count correction below) | **323** (312 at first draft) |
| **NWO-5** | `…/fourier-to-latexpaper-2026-09-17-nwo5-latex-relay.md` | **9,787** | **161** |
| **NWO-6** | `…/fourier-to-pencilboil-2026-09-17-nwo6-manifest-and-range.md` | **8,768** | **138** |

Each file's **line 1 is its own `SERVED MODEL: claude-opus-5[1m]`** (verified by ⟨cmd⟩ `head -1` on all three).

**A self-count that caught this unit's own error before it shipped.** The letter's first draft asserted *"Struck total: 21 rows covering **19 distinct roster items**"* and, at §0, *"Nineteen roster items are struck"*. ⟨cmd⟩ `grep -c "^| S-[0-9]" <the letter>` → **21**, and the enumeration shows **21 distinct entries**, not 19. **Both sentences were corrected at the bytes before the commit**, and a full accounting was added in their place: the carry's roster holds **27 entries** when paired ids are counted separately (`FR-COB-26`⊕`FR-MSP-12` = 2; `FR-TT-9`⊕`FR-TT-6` = 2; `SC-1..SC-8` = 8), landing as **1 (§1, FR-NP-32) + 21 (§2) + 5 newly live (§3) = 27**, with `m-17`'s remainder riding L-2 as the surviving half of S-10 rather than as a twenty-eighth entry, **plus** `FR-GIG-5` from §5/G15(b) → **28 rows in the letter, 27 of 27 carry entries accounted for.** ⟨cmd⟩ `grep -c "^### L-[0-9]" <the letter>` → **7**, enumerated `L-1 FR-GIG-5` · `L-2 m-17` · `L-3 m-21` · `L-4 GAB-2(a)` · `L-5 B-4's i-4` · `L-6 FR-TT-6` · `L-7 C-13`. **No figure in any letter was carried from a plan; every one was read from the settled bytes.**

**A pipe-balance sweep was run over all three letters before the commit** (the §E-3·R2 defect that once broke G1's own row), by an `awk` character scan building the bar as `sprintf("%c",124)` so the program is bar-free in source: **NWO-1** tables `4 4 4 4` and `5 ×23` · **NWO-5** `4 ×6` and `4 ×4` · **NWO-6** `4 ×4`, `3 ×7`, `4 ×5` — **every table internally uniform, 0 ragged rows.**

**Act 9 — the E13 rows, appended, and a table-grammar defect avoided by measuring the file instead of assuming it.** Three rows minted — **O-23** (NWO-1) · **O-24** (NWO-5) · **O-25** (NWO-6) — after ⟨cmd⟩ `grep -o "^| O-[0-9]*" INBOX.md | sort -t- -k2 -n | tail` established **O-22** as the highest in use. **The first write gave them six cells**, copying the `I-n` shape. The pipe sweep over `INBOX.md` then measured the Outbound table's real grammar: the block at `66-111` mixes **`O-n` rows at 6 bars (5 cells)** with **`I-n` rows at 7 bars (6 cells, carrying a Routing column)** — two grammars, each internally uniform. **The three rows were re-cut to 5 cells**, folding Routing into the Status cell, so they match **every other `O-n` row and the table's own header** (`| # | Date | To | Letter | Status |`). Re-measured after the cut: the three rows read **6 6 6**. The pre-existing `I-n` 7-bar rows are **other seats' dated rows and were not touched** (E-3).

**Append-only proved at the diff, not asserted**: ⟨cmd⟩ `git diff --numstat -- docs/tranches/V/coordination/INBOX.md` → **`5	0`** — **5 insertions, ZERO deletions** (3 table rows + the blank line and the consumption paragraph at the foot). ⟨cmd⟩ `git diff --check` → clean, exit 0. **No status cell was flipped**: flipping is an in-place replacement, which this unit's bound (`INBOX.md`, **append-only**) does not authorise, and `I-32`/`I-33`/`I-34`'s `UNREAD` marks are **Track D's rows**, routed by their own Routing cells to **X-W0.j / the X formation mail seat** — the same refusal the F.W5 and X-W2 close seats made, for the same reason. What this seat *could* lawfully do it did: a dated **Consumption** paragraph at the file foot recording that **I-32 and I-33 were read in full and consumed here**, with the strike result, so the durable ledger carries the read even though the mark is not this seat's to move.

**Act 10 — the commit.** ⟨cmd⟩ `git add <the 4 exact paths>` then ⟨cmd⟩ `git status --porcelain -uno` → the four staged (`M INBOX.md`, `A` ×3) with **`scripts/dev/dev.sh` and `docs/tranches/V/reformation/CARRY-LEDGER.md` present-but-unstaged**, exactly as the standing arrangement requires. ⟨cmd⟩ `git diff --cached --numstat` → `5 0` · `323 0` · `161 0` · `138 0` — **627 insertions, 0 deletions**.

**The commit message is the SPEC's literal, not the plan's paraphrase.** §4 commit-plan step 2 `:281` reads *"`docs(X·F/coordination): the SS-6 BH letter + LATEX-RELAY + pencil-boil letters` — NWO-1/-5/-6, with INBOX append rows (E13)"*; §Unit plan's brief for this unit paraphrases it as *"`docs(X·F/coordination): NWO-1 · NWO-5 · NWO-6 sent + E13 rows`"*. **The spec governs**, and §4's clause also settles the family: **the letters and the INBOX rows are ONE commit** (*"with INBOX append rows"*), so they were not split.

**Commit**: **`70a87e7e`** — `docs(X·F/coordination): the SS-6 BH letter + LATEX-RELAY + pencil-boil letters`.

#### Gate readings, BEFORE → AFTER

| gate | BEFORE (at open) | AFTER (this unit) | receipt |
|---|---|---|---|
| **G15 (b)** — *FR-GIG-5 leaves on the NWO-1 relay with its three preserved BLOCKER dissents, E13 row appended* | **RED** — ⟨cmd⟩ `ls docs/tranches/X/coordination/` → **2 files** (`ATLAS-TO-VALUE-2026-08-03-RULINGS.md`, F.W5's `value-to-fourier-cosign-J-diff-shape-v2.md`), ⟨cmd⟩ `ls … \| grep -c -i nwo` → **0**. No NWO packet existed | **GREEN**, with the delivery hop named as a residual (below) | ⟨cmd⟩ `ls docs/tranches/X/coordination/` → **5 files**, `grep -c "nwo"` → **3**. On the packet: `grep -c "FR-GIG-5"` → **5**; the dissents at `:164-166` — *"three BLOCKER filings are preserved in dissent — the L axis, the C axis, and reader-B"*, with R-1's re-opener carried; the non-credit **stated in terms** at `:174-175` — *"the F.W1 tri-package uplift is **NOT** credited with curing the whole-collection pagination drain"*, with the note that the same sentence rides the transaction's commit body (G15's *"each state in terms"*). E13: ⟨cmd⟩ `grep -c "^\| O-2[345] " INBOX.md` → **3** |
| **G15 (c)** — *`AA-11`'s constraint holds: no cure planned around `./pagination`* | **GREEN-BY-CONSTRUCTION at open, unverified by this seat** | **GREEN — verified at this seat, both pins** | ⟨cmd⟩ `git show 17a11bc5:package.json \| grep -c '"\./pagination":'` → **0** (run 1) · **0** (run 2) · ⟨cmd⟩ `grep -c '"\./pagination":' web/node_modules/@mkbabb/glass-ui/package.json` → **0**. Absent from **BOTH** export maps, so **no cure *can* be planned around it**. The positive act as well as the negative: the letter states it at §4.1 with both receipts, and disclaims the near-miss explicitly at `:287` — *"L-1's ask above is a change to the infinite-scroll primitive, **not an adoption of `./pagination`**"* — so the producer cannot read the drain ask as a `./pagination` request |
| **G15 (a)** — the close report's leg | **RED** | **RED — untouched, and deliberately so** | Leg (a) is **unit `f`'s** (§Unit plan: *"**G15 (a)**"* under `f`). This seat turned (b) and (c) only. Stated so the close seat does not read silence as a claim |

#### Residuals handed forward, by name

1. **→ the X formation mail seat (the one residual under G15 (b)).** **The three packets are AUTHORED and ROWED; they are not DELIVERED.** `../glass-ui/**` is **READ-ONLY ALWAYS** (S-17) and sits outside this unit's writable set, as do the latex-paper and pencil-boil trees, so the hop into each producer's coordination dir is the mail seat's act — the same routing I-33's own Routing cell names (*"the relay into `fourier-analysis/…/INBOX.md` is the X formation mail seat's act"*). **The falsifier is stated with the verdict**: this seat grades G15 (b) **GREEN** on its three measurable conjuncts (the packet exists · it carries FR-GIG-5 with its three preserved BLOCKER dissents · the E13 row is appended). **If the close seat reads *"leaves on the NWO-1 relay"* as requiring physical delivery, (b) is RED until the mail seat hops it, and this seat does not contest that reading** — it is recorded here precisely so the re-grade is available without an archaeology.
2. **→ unit `e` (binding, and it narrows a named choice).** *"An in-range **0.11.x**"* now has a **unique referent**: the in-range published set of `^0.11.2` is **`{0.11.2}`**, one version, measured twice. `0.11.0` is **not** in that range. The §Baseline G14 cell's two-element set is corrected beside, never rewritten.
3. **→ unit `f` / G18 (binding, and NOT pre-consumed here).** I-32's **A-10** and I-33 §1's first bullet answer PD-1 from the producer's end (*"the producer ruling you asked for"*), naming `GlassTimeline.vue:73` and the measured order `reka:slideStart → reka:update → yours`. **This seat struck PD-1 from the letter as disposed; it did NOT decide what A-10 does to PD-1's disjunction.** G18 must still state whether it **discharges, narrows, or leaves** it — §Open's instruction, *"never presume it does"* — and the strike is not that statement.
4. **→ unit `f` / G16.** **NWO-5 is G16's second arm and names its owner: the latex-paper producer.** The seating's *recording* is `f`'s; this seat authored the ask and did not stamp the gate.
5. **→ unit `c` (census, three measured items that ride its counting-unit discipline).** (a) `pencil-boil` = **3 import statements / 3 files**, with **4 matching lines** as the different object and `SvgFilters.vue:19` named as the comment — L-i3's label-vs-list defect reproduced. (b) `MIGRATION.md`'s AnimatedDigit rows drifted **`:738-739` → `:838-839`** at `17a11bc5` — a **G-13 anchor re-resolution** whose kind (doc, not published bytes) matters to how it is budgeted. (c) `offsets.css:78-82` no longer bounds FR-TT-6's docblock at the adopted tag; the coordinate is left for the producer rather than guessed.
6. **→ the close (E13).** **I-32 · I-33 · I-34 still read `UNREAD 2026-09-17`, and this unit flipped none of them** — append-only bound, and the marks belong to Track D and route to X-W0.j / the mail seat. **I-32 and I-33 are nonetheless CONSUMED**, with the consumption recorded as an appended dated paragraph at `INBOX.md`'s foot. **I-34 names no F.W1 surface** (its `./search` clause is value.js's, budgeted at X-EXT-1). The close must still satisfy *"no wave closes with UNREAD mail in scope"* against rows whose durable mark is another track's to move — **flagged as the close's judgement, not resolved here.**
7. **→ the producer, and back to us.** NWO-1 §5 ask 3 invites glass-ui to **name any of the 21 strikes that is wrong**, and the letter commits to re-filing it unchanged. A strike this seat got wrong is the one failure mode of this unit that the gates cannot catch, so the correction path is built into the letter rather than left to chance.

#### Escalations

**None.** Every specified cure was executable at the bytes. The one place the brief's own figure did not survive measurement (**the `^0.11.2` in-range set**) is a **published correction under WRITE-THEN-MEASURE and E-3**, not a substituted cure: the ask, the row, the id and the grade are unchanged, and only the measured cardinality moved — from two to one, in the direction that sharpens the ask.

---

### c

**SERVED MODEL: claude-opus-5[1m]**

**Unit**: `c` — the census acts at the adopted pin (**G7 → M-7 → G5 → G14 → K-1**), §4 step 3 `:275`.
**Sections executed**: §4 step 3 `:275` · §3 **G7** `:253` · **G5** `:251` · **G14** `:260` · §2 **WU-C** `:72-82` (**M-7** `:78`) · **WU-D** `:84-90` · **WU-F** `:103-118` (**FM-2** `:108`) · **WU-G** `:120-128` · **WU-M** `:177-183`.
**Writable set honoured, hard bound**: `docs/tranches/X/fourier/evidence/w1/` (**created**; five files) · this record. **No other path written. No product byte.** The fourier · glass-ui · pencil-boil · latex-paper trees and the npm registry were **READ-ONLY** throughout (`git show` · `git grep` · `git ls-tree` · `grep` · `sed` · `awk` · `wc` · `ls` · `perl -n`/`python3` as *readers* · `npm view` only; **zero** files opened for write outside the two docs paths). `scripts/dev/dev.sh` untouched and unstaged; `docs/tranches/V/reformation/CARRY-LEDGER.md` left dirty-as-found and unstaged. Pathspec commit only. **No `git stash`, no `reset`, no force-push.**
**Clock**: 2026-09-17, ~21:5x EDT, following unit `b`'s landing at `70a87e7e`.

#### Evidence landed

| file | bytes | lines | gate |
|---|---|---|---|
| `evidence/w1/G7-BUTTON-BUDGET.md` | **15,402** | **220** | G7 |
| `evidence/w1/M7-PROP-LEVEL-DIFF.md` | **20,577** | **282** | M-7 ⊕ FM-2 |
| `evidence/w1/G5-CSS-CLASS-CENSUS.md` | **25,617** | **323** | G5 ⊕ AA-15 ⊕ GM-19 |
| `evidence/w1/G14-PENCIL-BOIL-FLOOR.md` | **9,353** | **123** | G14 |
| `evidence/w1/K1-RE-RESOLUTION.md` | **8,748** | **150** | K-1 |

Self-counted at the settled bytes, **double-run** (identical). Line 1 of each is its own
`SERVED MODEL:` line (⟨cmd⟩ `head -1 *.md` on all five). A **pipe-balance sweep counting UNESCAPED
bars only** (a bar not preceded by a backslash — the round-2 defect §E-3·R2 minutes) reports every
table internally uniform across all five files: **0 ragged rows**. ⟨cmd⟩ `git diff --check` → clean,
exit 0. ⟨cmd⟩ `git diff --cached --numstat` → `123 0` · `323 0` · `220 0` · `150 0` · `282 0` —
**1,098 insertions, 0 deletions**.

#### Acts, in order

**Act 1 — the order of §4 step 3 was executed as written, and the first act sized nothing.** The
step's order is *"G7 grep of record → M-7 prop-level diff → G5 census → G4 emission build → G14
floor read → K-1"*, and **M-7's own row says it *"precedes every per-file budget"***. Both were
honoured: G7's grep ran first because it defines the counting units every later figure is stated
in, and **no per-file budget was published before M-7's diff completed**. **G4 was NOT run** — it
needs the bumped install and its command writes `web/dist`, a §1 read-only witness; it is unit
`e`'s, as §Unit plan already routed it.

**Act 2 — G7's grep of record, DEFINED before it was run.** A "stripped-comment grep" is a probe
shape, not a flag, so the shape is published at `G7-BUTTON-BUDGET.md` §0 before any output: comment
strip with **line numbering preserved** (every removed non-newline byte replaced by a space, so a
coordinate quoted from the stripped stream is a coordinate in the real file), then tag attribution
with quoted attribute values consumed as units. The second half is not optional — D-M3's own
rejection cell convicts a rival tag-scan whose regex *"terminates at the `>` inside
`v-if="navStack.length > 0"` (PaperView.vue:398-405), dropping a real `variant="glass" size="icon"`
site"*; this probe keeps that site.

**The probe carries its own closure proof**: ⟨cmd⟩ comment-stripped `variant=` occurrences over
`web/src` → **106**; attributed `Button` **88** ⊕ `Slider` **9** ⊕ `SegmentedTabs` **3** ⊕ `Badge`
**2** ⊕ `PaperSearch` **2** ⊕ `PaperSearchInput` **1** ⊕ `PaperSearchDropdown` **1** = **106**;
**residue unattributed to any element open tag = 0**. Double-run on an independently rebuilt corpus.

**THE BUDGET** (every row double-run, every row with its counting unit): Button `variant=`
attributes **88** (86 static ⊕ 2 bound) · Button `size=` attributes **69** (icon 35 · sm 27 ·
default 6 · lg 1) · **the breaking attribute surface 129** · Button-bearing files **34** ·
`glass-ui/button` importers **34** · non-Button `variant=` **18** · comment-resident `variant=`
**16** (of which **9** are `<Button variant=`) · comment-resident `size="icon"` **1** · raw
unanchored `variant=` **122** · raw `size="icon"` **36**. Per arm: ghost **46/21** · outline
**21/14** · glass **9/7** · default **4/4** · destructive **4/4** · secondary **1/1** · link
**1/1** · bound **2/2**.

**Act 3 — the five superseded cells, placed beside the budget; FOUR of five reproduce to the
digit.** The disagreement G7 exists to arbitrate was never a measurement dispute — it was five
objects wearing the same numerals:

- **S1 `87 / 36 / 35`** (D-M3) — static `<Button variant=…>` · stripped `size="icon"` · Button files, **at the pre-`G-10` tree**: measured at `5842377^` → **87 / 36 / 35**. **EXACT.**
- **S2 `37 files / 38 / 124`** (AA-2) — files containing `<Button` · **raw** `size="icon"` · **raw** `variant=`, pre-`G-10`: ⟨cmd⟩ at `5842377^` → **37 · 38 · 124**. **EXACT, all three.**
- **S3 `9 glass / 7 files + 36 icon (35 live)`** (FR-COB-2) — **comment-stripped** glass / raw icon with the live count: → **9 / 7** stripped (raw **10 / 7**), **36** raw / **35** live. **EXACT — and this discharges §Baseline finding 3**: the banked 9 is the *stripped* unit, the 10 is the *raw* one. Resolved, not averaged.
- **S4 `96 / 77 / 35`** (fr-GalleryCard D-8, *"D's repo-scale"*) — **NOT REPRODUCIBLE at these bytes** (the same units read 106 / 128 / 41); its operand is the megatranche audit's corpus moment. **Named as a prior run, never re-cut, never averaged.**
- **S5 `icon ×38 / glass ×12`** (fr-ConvergenceTimeline) — **raw**, pre-`G-10`: → **38** and **12**. **EXACT, both.**

**Act 4 — `162` entered as a MEMBER of the set, with its unit recovered, never as the answer.**
`fr-EquationResult.md:37` states its own instrument in the same sentence — *"(124 / 38 / 21
files)"* — and this seat reproduces all three at `5842377^`: **124 · 38 · 21**. **124 + 38 = 162.**
So `162` = **raw `variant=` lines ⊕ raw `size="icon"` lines, comment-inclusive, all tags,
pre-`G-10`** — an attribute count in the sense that each grep line is one attribute occurrence,
**not** a site count and **not** a file count. **The derivation is disclosed as this seat's
reconstruction** (the record does not spell the addition), and it is offered only because a member
of a reconciliation set must carry a unit to be a member at all. The same unit at the settled bytes
reads **158**; comment-stripped all-tag **141**; **the rewrite's operand is 129**, per G7's own
clause that *"the transaction's limb is sized by THIS gate's output."*

**Act 5 — the `G-10` drift, published as arithmetic and CORRECTED: it is TWO subtractions, not
one.** §Baseline finding 1 reads it as one (*"the same subtraction moves Button-importing files 35
→ 34"*). The bytes say otherwise: the **lucide** budget lost `components/equation/InfoCard.vue:3`;
the **Button** budget lost `components/visualization/CanvasOverlayButton.vue:9`. Two different
files. ⟨cmd⟩ `git show '5842377^:…/CanvasOverlayButton.vue' | grep -n 'variant=\|size="icon"\|glass-ui/button'` → `5:` (docblock, carrying BOTH a `variant=` and a `size="icon"` mention) · `9:import { Button } …` · `18: variant="glass"` · `19: size="icon"`; ⟨cmd⟩ the same on `InfoCard.vue` → `3:import { Info } from "lucide-vue-next";` **and no Button at all**. The equality `35 → 34` in both budgets is a coincidence of cardinality, **not a shared cause** — a successor reading it as one subtraction will look for a Button in `InfoCard.vue` and find none. Every affected figure is tabled at `G7-BUTTON-BUDGET.md` §2.

**Act 6 — M-7's prop-level diff, run over every surviving subpath, and it changed the wave's shape.**
Subpath survival read by **JSON parse** of both `exports` maps, not by grep. **Five subpaths die**
under fourier's imports (`./metric-badge` 6/6 · `./hover-popover` 2/2 · `./hover-card` 2/2 ·
`./dropdown-menu` 2/2 · `./animated-digit` 1/1 = **13 import sites**). Against that, the prop diff
finds **139 breaking attribute occurrences ⊕ two deleted components at 20 callsites on a subpath
that SURVIVES**:

| break | occurrences | compiler-visible |
|---|---|---|
| `Button.variant` — the prop is gone | **88** | **no** (junk `$attrs`) |
| `Button size="icon"` — value gone | **35** | yes |
| **`Button size="default"` — value gone** | **6** | yes |
| `Slider variant="standard"` — value renamed to `scrubber` | **9** | **no** |
| `TooltipContent.collisionPadding` — prop gone | **1** | **no** |
| **`DockIconButton` — COMPONENT DELETED** (`./dock` survives) | **19 callsites / 2 files** | yes |
| **`DockDropdownTrigger` — COMPONENT DELETED** | **1 / 1** | yes |

**Two findings the banked cells do not carry.** (i) ⟨cmd⟩ `git show 17a11bc5:src/components/button/Button.vue | grep -n "retired.push"` → `:134` variant · **`:136  if (size === "icon" || size === "default")`** — **the producer's own DEV watcher names `size="default"` too**, and §4 step 4's limb-2 spelling is silent on it; the six sites fire the same `[glass-ui]` `console.error` into the same four zero-console-error e2e specs G6 protects. (ii) `./dock` is present in **both** export maps, so its two deleted members are **invisible to every import-shaped probe** — which is M-7's thesis in its sharpest available form.

**Act 7 — FALSIFICATION, before publication: four candidate breaks WITHDRAWN.** A prop diff that
over-reports is worse than none, so every `NOT A PROP` hit was re-read at the producer's bytes.
Withdrawn: `SegmentedTabs.modelValue` (3 — declared by **`defineModel`** at `SegmentedTabs.vue:145`,
which no `interface Props` scan can see) · `GlassDock.startCollapsed`/`.collapseDelay` (5 — real
props in the composable's `DockProps`, `useDockShellProps.ts:110`/`:105`) ·
`DropdownMenuContent.align`/`.sideOffset` and `TooltipContent.side`/`.sideOffset` (6 — inherited
through **`extends FloatingPlacementProps`**) · **`Tooltip.text` (33) and `Tooltip.side` (8) — not
glass-ui's component at all**, but fourier's own shim `@/components/ui/tooltip/Tooltip.vue`, whose
docblock says so; only `App.vue:4` imports from `@mkbabb/glass-ui/tooltip`, and it imports
`TooltipProvider`. **That last one alone would have been 41 phantom breaks**, the largest single
false figure available in this wave. The one survivor of the family is `Tooltip.vue:33`'s
`:collision-padding="8"`, which **confirms FR-TT-5 at the adopted pin** (`FloatingPlacementProps` =
`side | sideOffset | align | alignOffset`; the v7-era mechanism name `RETIRED_FLOATING_ATTRS` is
**absent at 8.0.0** — the effect survives, the mechanism does not).

**Measured NEGATIVES, kept in the record**: `SelectTrigger.size`/`.variant` (U-2's removal),
`DialogContent.showClose`/`.spring`/`.scrimAnimation` (fr-ExportModal M-α's three),
`Configurator.density` / `ConfiguratorRow.density` — **fourier passes NONE of them** (⟨cmd⟩ → **0**
for each term). Those removals are real and cost this tree nothing, and saying so is what stops the
transaction budgeting for them.

**Act 8 — `./metric-badge` → `./metric` PRICED, and it is not one-for-one.** Of the 7 props fourier
passes at 48 occurrences: `value` · `size` (value sets **identical**, `sm|md|lg|xl` both pins) ·
`class` · `label` · `unit` map cleanly; **`labelPosition` → `posture`** is a rename with a value
superset (`'inline'|'stacked'` ⊂ `"inline"|"stacked"|"cell"|"row"`) at **6 sites**; **`color` has NO
successor** on `MetricProps` at **4 sites** (`var(--tier-saved…)` · `var(--tier-featured…)` ·
`:color="eColor"` ×2). A mechanical port drops the tier tinting silently.

**Act 9 — FM-2's token-level break-surface column, folded into the census as the row demands.** A
`var(--x)` read is neither an import nor a prop, so no prop diff can see it. `--ring` is declared in
**3 producer sheets at 4.0.0, all emitted**, and **0 at `17a11bc5`**; fourier reads it at **5 sites
/ 4 files** (`style.css:140` · `ImageUpload.vue:200` · `GalleryCard.vue:222` · `:223` ·
`AppHeader.vue:189`) — five focus/border declarations that resolve to the initial value at the hop
with no build error, no type error, no lint. `--focus-ring` 1 → 0; its successor `--focus-ring-color`
0 → 3. **Counting-unit difference disclosed**: FM-2 banks *"six read sites / five files"*; this seat
measures **5 / 4**, and **the same 5 / 4 at `5842377^`** — so it is **not** `G-10` drift and **not** a
code change, but a unit not recoverable from these bytes. Published as measured; **FM-2 not
re-graded**; its one-edit F.W4 cure is unaffected in kind.

**Act 10 — the two M-7 riders priced INSIDE the diff, per *"priced inside this diff or not priced at
all"*.**
- **`fr-BasisSelector i-4`** — **0 subpath breaks at the ADOPTED pin** (`./slider` · `./button` ·
  `./configurator` all present at `17a11bc5`), so the thesis holds at 8 and not merely at 7. Prop
  breaks **5** (`:125` ×2 · `:140` · `:168` · `:195`) ⊕ the lucide specifier `:9`. The banked *"six"*
  does not reproduce under the unit this seat can measure at either ≥7 pin — **3** at `v7.0.0`,
  **5** at `17a11bc5`. **i-4 is INFO and is NOT re-graded**; its load-bearing claim is the shape
  `0 subpath : n prop`, confirmed and strengthened. **The file is WORSE at the adopted pin than at
  the pin it was priced against**, and the whole delta is the Slider rename.
- **`fr-NotationPills FR-NP-30` limb (c)** — **DISCHARGED BY THE HOP.** The fixed `px-3` is not in
  fourier's bytes: it is the producer's `sm` arm, `h-(--control-h-sm) rounded-pill px-3` at the
  installed pin (a `0.75rem` literal against a `--ui-scale` height) and
  `.button[data-size="sm"] { padding-inline: var(--space-atom); }` (`button/styles.css:232-235`) at
  `17a11bc5`. **A token, not a literal.** Zero consumer cost, zero F.W4 rider. **A credit row for
  the close**: one banked defect the uplift retires unasked.

**Act 11 — G5 run over the WHOLE emitted roster, with the discriminator run in BOTH forms — and the
LAW vindicated four-for-four.** `fr-PaperSidebar M3`'s two-file recipe was run against each class
alongside the whole-roster operand. Both named operands exist (`glass-ui.css` **42,082 B** ·
`styles/components.css` **60,076 B**), so no zero is a missing-file artefact:

| class | M3 two-file form @4.0.0 | WHOLE roster @4.0.0 | would M3 have been right? |
|---|---|---|---|
| `.paper-texture` | **0 / 0** | **6 artefacts**, live rule `styles/cards.css:10` | **NO** |
| `text-admin-label` | **0 / 0** | **3 artefacts**, `@utility` `typography/semantic.css:213` | **NO** |
| `.cartoon-card` | **0 / 0** | **1 artefact — and it is a COMMENT** (`cards.css:2`) | yes, by accident |
| `.btn-pill` | **0 / 0** | **8 artefacts** (reproducing the spec's eight-name list exactly) | **NO** |

**The two-file discriminator returns `0/0` for all four and is wrong on three.** §2·R2b.3 proved
this for `.btn-pill`; it holds for the whole class-set, so R2-9's clause is a measured property of
this probe and not a caution. Whole-roster column double-run **6 · 3 · 1 · 8**.

**Act 12 — the census verdicts, and one of the four P0 instances DOES NOT BREAK.**
- **`.paper-texture` (B-2) — TRUE UPLIFT BREAK.** Live rule at `cards.css:10` ⊕ dark arm `:17` at
  4.0.0; **no rule** at `17a11bc5`; **1 application** (`App.vue:24`). **The cure is executable**:
  both composing tokens survive (`--paper-clean-texture` `tokens/scale-paper.css:118` ·
  `--paper-texture-size` `tokens/offsets.css:106`), and the only surviving `@utility paper-*`
  recipes are `paper-underpaint` and `paper-grain-overlay` — **neither a drop-in**, so
  `fr-SvgFilters M-1/R-3`'s cure-constraint reproduces at the adopted pin.
- **`text-admin-label` (MG-β) — TRUE UPLIFT BREAK, the worse-than-absence kind.** `@utility`
  declarations **1 · 1 · 0** across v4.0.0 · v7.0.0 · `17a11bc5`; **7 applications / 4 files**
  (reproducing the banked 7/4 exactly); sole survivor `_shared/class-names.ts:84`'s allowlist, which
  makes `cn()` **keep** a token that paints nothing. **No byte-equivalent successor exists**: the
  closest is **`text-mono-micro`** (`typography/utilities.css:62` — mono ⊕ `--type-micro` ⊕ 0.025em)
  **plus `uppercase font-medium`**, carrying a **disclosed design delta of 10px → 11px** and a
  different tracking. WU-D's banked `--type-micro`/`--type-caption` spelling is **refined**:
  `text-mono-micro` supplies the mono half for free and `--type-caption` is the wrong arm (fluid
  where the retired rung was fixed).
- **`.cartoon-card` (FR-EQC-3/K-13) — NOT AN UPLIFT BREAK.** Its only mention in the installed
  emitted roster is a **comment** at `styles/cards.css:2` saying the recipe *"[was] removed at
  C.W5"* — i.e. it was **already definition-absent at the pin fourier is leaving**, and fourier
  already shims it (`style.css:107 @utility cartoon-card { @apply cartoon-surface; … }`).
  **`cartoon-surface` SURVIVES** (`card/styles.css:256` at `17a11bc5`), so **the shim survives the
  hop untouched** — confirming `fr-BasisCanvas D-corpus-C-1` at the adopted pin. **G5 returns
  NOTHING here for commit #4 to land.**
- **`.btn-pill` (FR-NP-13) — PRODUCER DELETION, ZERO CONSUMER CLASS LITERALS.** 8 emitted artefacts
  at 4.0.0 (the Button cva base string composes it); **0 mentions in `src` at `17a11bc5`**; **0**
  class literals in `web/src`. The live half is the **local shadow**: `NotationPills.vue:36-41`,
  with `:38 border-radius: 9999px` **hardcoding past `--radius-pill`** — which **survives** at
  `theme/radius.css:116`. **Anchor drift recorded, INTENT taken at the true bytes**: the banked
  `:38/:40` names a block that is really `:37-41`; `:38` is exactly the line the row means, and
  `:40` is `justify-content: center`, a member of the same block rather than a second radius source.

Counting units published beside every figure. `.cartoon-card`: **18 class applications / 12 files**
(load-bearing) · **24 substring occurrences / 14 files** (unanchored; the 6 non-applications
enumerated) · banked **21 / 14** superseded with **its file count reproducing exactly** · and the
shim's own comment (*"14 application sites (13 files)"*) **also** superseded — **both** its numbers
are low, which extends FR-EQC-3's *"shim's '14' … wrong"* rather than contradicting it. This
discharges §Baseline finding 2, which routed the 24-vs-21 shape difference here.

**Act 13 — AA-15's cure/break collision RECONCILED IN WRITING, before either side executes.** The
collision is measured, not argued: `@utility text-admin-label` declarations are **1 (v4.0.0) · 1
(v7.0.0) · 0 (`17a11bc5`)**, so the rung **AA-15's banked cure adopts does not exist at the adopted
pin**. Executing AA-15 as banked would add two more sites of the class MG-β books as broken —
**7 sites / 4 files → 9 / 5** — a cure that manufactures more of the defect its sibling retires.
**Four rulings, in force in this order** (full text at `G5-CSS-CLASS-CENSUS.md` §3):

1. **`fr-AdminAuditLog K-1`'s kill INVERTS, and only its PREMISE moves.** AA-15's **defect stands**
   (`text-[0.65rem]` at `AdminAuditLog.vue:134,:143` is a fourier fact, pin-independent); **AA-15's
   CURE is dead as banked**.
2. **AA-15 MUST NOT execute as written at F.W4.**
3. **ONE RUNG, DECIDED ONCE, HERE**: MG-β's re-target picks `text-mono-micro uppercase font-medium`
   and lands 7 sites / 4 files inside commit #4; **AA-15 at F.W4 re-points its two sites onto that
   same rung**, never onto `text-admin-label`.
4. **ORDER BINDING: MG-β (F.W1) FIRST, AA-15 (F.W4) SECOND** — the reverse order *is* the collision
   executing rather than being reconciled.

**No re-grade, no re-home, no cancelled relay**: AA-15 stays MAJOR at F.W4, and the
producer-restoration ask stays on NWO-1 (a restored `@utility` makes the re-target redundant, never
wrong).

**Act 14 — the split the G5 LANDING CELL requires, stated as edits.**
**CONSUMER RE-TARGETS — land inside commit #4** (3 edits, **9 application sites, 6 files**): **R1**
`.paper-texture` texture-restore from the two surviving tokens (1 site, `App.vue:24`; block lands in
`web/src/style.css`) · **R2** `text-admin-label` → `text-mono-micro uppercase font-medium` (7 sites /
4 files) · **R3** `NotationPills.vue:38` `9999px` → `var(--radius-pill)` (1 site).
**PRODUCER-OWNED — leave on NWO-1**: only the admin-label rung question, **already sent** at
`70a87e7e`; **the wave does not wait on it.** **None of R1–R3 is a frontend workaround for a
producer defect** — each lands on a token or utility the producer **publishes at the adopted pin**,
which is the §5 bar applied rather than cited. `.cartoon-card` and `.btn-pill` return **no
producer ask and no consumer edit beyond R3**.

**Act 15 — GM-19's re-read at the target: OWED, PERFORMED, and it returns NO NEW CONSEQUENCE.**
`a11y-overrides.css` read at both pins (installed **169** lines · `17a11bc5` **137**). The PRM
blanket at the adopted pin is **`*, *::before, *::after { animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important; transition-duration: 0s !important }`** — **unconditional**,
where the installed form carved `:not([data-allow-motion])`. **The masking survives and BROADENS**;
masker (ii) holds. Masker (i) also holds — `./scrolling-text` is **absent at `17a11bc5`**, so
`GalleryMarquee` still renders nowhere (FR-GFC-9). **F.W1 owes the re-read, not the cure, and this
unit stamps the re-read and nothing else.** Two nuances recorded for the successor, neither owed
here: at 8.0.0 a **narrow PRM-AUTHORIZED-SET beats the fallback by cascade LAYER, not specificity**,
so a consumer rule placed inside a layer could defeat the blanket — a route that did not exist at
the installed pin (→ F.W4 with GM-19); and the blanket's transition clock moved **0.1s → 0s** with
the `transition-property` mint deliberately dropped (→ the WU-F ledger, unit `f`).

**Act 16 — G14's floor read at the adopted tag, and the three drifted registry rows corrected as
dated rows.** ⟨cmd⟩ `git show <pin>:package.json` parsed as JSON, double-run at `17a11bc5`:
pencil-boil peer **`^0.4.1` (v4.0.0) · `^0.9.2` (v7.0.0) · `^0.11.2` optional (`17a11bc5`)**, with
the adopted tag additionally carrying a **devDependency pinned exactly `0.11.2`**. Fourier declares
`^0.4.1`. **M-2's own condition — *"correct only if G1 adopts 8"* — has fired**, so the correction of
record inverts in the direction its author anticipated:

- **D1 `fr-FourierShapeExtractor.md:100` (C-18.2)** — its *v7 attribution* is **FALSE**; its
  *conclusion* is **TRUE AND NOW UNCONDITIONAL**. **C-18.2 is LIVE at F.W1.**
- **D2 `fr-FourierMorphSvg.md:54` (FM-22)** — *"the F.W1 pencil-boil `0.4.1 → ^0.11.2` migration
  surface"* is **CORRECT AT THE ADOPTED TAG**; it is exactly the migration this wave lands. **This
  row's ratification, not its cure.**
- **D3 `kf-HeroAurora.md:9`** — **correct as a v7.0.0 transcription, and NOT the F.W1 target.**
  Quoting it as the floor would be a defect.
- **D4 `M-2`'s own headline** (*"the floor is `^0.9.2`, not `^0.11.2`"*) — **FALSE at the adopted
  tag**, by M-2's own stated condition. **M-2 is NOT re-graded**: it was right about v7.0.0, which
  is what it measured.

**M-2's constructive half was RE-DERIVED at the adopted floor rather than inherited**, because it
was argued at v0.9.2 and the wave lands v0.11.x. All five consumed symbols are present at `v0.11.2`
with **identical signatures** — `catmullRomToBezier` (`path.ts:27` at both) · `generateSunRays`
(`celestial.ts:45`) · `wobbleDiamond` (`:4`) · `wobbleStarPolygon` (`:22`) · `useLineBoil` (same arg
list, body re-implemented). ⟨cmd⟩ `diff` of the `^export function` lines on `celestial.ts` → **no
output**; on `path.ts` → **additions only**. **"No-break at this site" HOLDS at `^0.11.2`.**

**And the two legs that do not move**: the in-range published set of `^0.11.2` is **`{0.11.2}` — ONE
version** (double-run), confirming unit `b`'s correction and giving unit `e`'s *"an in-range
0.11.x"* a **unique referent**; and **L-2 splits** — the empty-loop rAF resume is **CURED** at the
floor (`v0.11.2:src/vue.ts:277` `else if (schedulerRunning && hasActiveSubscriber())`, with the
comment naming the exact defect) while the **false `sideEffects: false` is UNCHANGED at
`package.json:9` with the listener still module-scope at `:274`** — so **NWO-6's manifest leg is
measured undischarged**, exactly as its rider warns.

**Act 17 — K-1 re-resolved, census leg.** Eight re-resolutions at `17a11bc5`
(`K1-RE-RESOLUTION.md`), none re-grading a severity or touching a registry file:
**K-1.b `K-8 / SR-1`'s CONDITIONAL RE-BOOK FIRES** — `SliderVariant` is `"standard"|"spectrum"` at
v7.0.0 and **`"scrubber"|"spectrum"` at `17a11bc5`**; live surface **9 attribute callsites / 7
files** (⊕ 5 prose), so **`MPC-21/BR-1`'s "9 / 7 (+5 prose)" is exact** and **K-8/SR-1's "8 files" is
off by one** (dated correction). The cure is **delete-don't-rename** and the bytes make it free:
`variant: "standard"` **is** the installed `defaultVariants` value and `scrubber` is the 8.0.0
default, so deletion is a no-op today and correct tomorrow.
**K-1.e `fr-FrequencyGraph`'s counting unit — DISCHARGED** (unit `a`'s residual 3): matching LINES
over `src/styles` read **5 · 5 · 0** across v4.0.0 · v7.0.0 · `17a11bc5` and `@utility`
DECLARATIONS **1 · 1 · 0`. **The banked "4" is a third unit and the 5 is not a v7 artefact** — it
reproduces at v4.0.0 too. The declaration count is load-bearing; at the adopted tag every unit
agrees on **0**. **Nothing moves.**
**K-1.h the 69-vs-70 export-key residual — RESOLVED, unit named** (unit `a`'s residual 3, second
half): by JSON parse, **80 keys @ 4.0.0 · 70 @ `17a11bc5` INCLUDING the root `"."`**, i.e. **79 /
69** spelled `"./…"`. **WU-G's banked "80 @ 4.0.0 · 70 @ 8.0.0" is the whole-map unit and reproduces
exactly**; unit `a`'s probe anchored on the `./` prefix and excluded the root key. **70 − 1 root =
69.** Two units, both true, neither averaged. **Nothing moves.**
**K-1.f `B-1`'s spring-clock kill — CONFIRMED and SHARPENED**: `--spring-smooth-settle` is **0 files
at BOTH pins** (the dead claim names a token that never existed), while `--spring-present-duration`
is **0 in the whole installed dist and 13 files at `17a11bc5`** — the "real clock" is an
**8.0.0-only** fact, so quoting it as an installed-pin byte would be a pin error (→ G10, unit `e`;
→ the WU-F ledger, unit `f`).
**K-1.a · K-1.c · K-1.d · K-1.g** are recorded in the same file; K-1.d **independently reproduces
unit `a`'s two suspects with a wider operand** (whole emitted roster, not `src` alone) rather than
transcribing them.

**Act 18 — the commit.** ⟨cmd⟩ `git add <the 5 exact paths>` then `git status --porcelain -uno` →
the five staged `A`, with **`scripts/dev/dev.sh` and `docs/tranches/V/reformation/CARRY-LEDGER.md`
present-but-unstaged**, exactly as the standing arrangement requires. §4's commit plan names **no**
entry for the census evidence (its Cadence names the artefacts, not a commit), so the §Unit plan
brief's spelling is the only governing one and is used verbatim.

**Commit**: **`2a84bd5a`** — `docs(X·F/evidence/w1): the census acts at the adopted pin — G7 · M-7 · G5 · G14 · K-1`.

#### Gate readings, BEFORE → AFTER

| gate | BEFORE (§Baseline) | AFTER (this unit) | receipt |
|---|---|---|---|
| **G7** Button budget | **RED** — *"no grep of record at the adopted pin"*; six banked figures disagreeing; at the installed pin `variant=` **122** · `size="icon"` **36** · button-importers **34** · outline **30/16** · ghost **49** · glass **10/7** | **GREEN** | The grep of record is defined (§0), run, and published as the sole budget with a counting unit on every figure and its own closure proof (**106 attributed = 106 unattributed, residue 0**), double-run. Budget: **88 · 69 · 129 · 34 · 34 · 18 · 16 · 1**. **Four of the five superseded cells reproduce to the digit** once their units are named (S1 · S2 · S3 · S5); S4 is named a prior run against a corpus moment that no longer exists. **`162` entered as a member with its unit recovered (124 + 38, pre-`G-10`, raw, all-tag), never as the answer.** **Nothing averaged.** §Baseline findings 1 and 3 both discharged |
| **G5** P0 CSS-class census | **RED** — *"no census exists; all four instances live"* | **GREEN** | Run over the **whole emitted roster** at both pins, both directions (§0), with the M3 discriminator run in **both forms** and shown wrong on 3 of 4 classes. Verdicts: `.paper-texture` **BREAKS** (1 site, cure executable from surviving tokens) · `text-admin-label` **BREAKS** (7/4, no byte-equivalent successor; `text-mono-micro uppercase font-medium` with a disclosed 10px→11px delta) · `.cartoon-card` **NOT AN UPLIFT BREAK** (already absent at the installed pin; the local shim survives because `cartoon-surface` does) · `.btn-pill` **no consumer class literal**, the live half is the local shadow `:38`. **AA-15's collision reconciled in writing (4 rulings) BEFORE either side executes.** Split published: **3 consumer re-targets / 9 sites / 6 files → commit #4**; **1 producer ask already on NWO-1**. **GM-19's re-read performed: masking survives and broadens ⇒ NO new painted consequence** |
| **G14** pencil-boil floor | **RED** — floor unread at the adopted tag; three registry rows contradicting; in-range set banked as two versions | **GREEN** | Floor read at the adopted tag, double-run: **`^0.11.2`, optional**, with a devDep pinned `0.11.2` beside it. **Three drifted rows corrected as dated rows D1–D3, plus D4 against M-2's own headline** — and the inversion is G1's doing, not a miscount. **M-2's constructive half re-derived at the adopted floor and it SURVIVES** (five symbols, identical signatures, `diff` empty on `celestial.ts`). **C-18.2 LIVE, in-range set = `{0.11.2}`, one version.** **L-2 splits: mechanism CURED at the floor, manifest leg measured UNDISCHARGED** |
| **M-7** prop-level diff *(precedes every per-file budget)* | not previously run at any pin | **RUN — and it re-shaped the wave** | **5 dead subpaths / 13 import sites** vs **139 breaking attribute occurrences ⊕ 2 deleted components at 20 callsites on a SURVIVING subpath**. Two findings no banked cell carries: **`size="default"` is retired alongside `size="icon"`** (producer's own `Button.vue:136`) and **`./dock`'s member deletions are invisible to every import-shaped probe**. **Four candidate breaks falsified and withdrawn** before publication, the largest being **41 phantom `Tooltip` breaks on a component fourier owns**. FM-2's token column folded (`--ring` 3 decls → 0; **5 read sites / 4 files**). Both riders priced: **i-4 confirmed at the adopted pin and re-priced 3 → 5**; **FR-NP-30 (c) DISCHARGED BY THE HOP** |
| **G4** emission pre-gate | **UNRUNNABLE-AT-OPEN** | **untouched, deliberately** | Not this unit's (§Unit plan lock). It needs the bumped install and its command writes `web/dist`, a §1 read-only witness. Stated so the successor does not read silence as a claim |

#### Residuals handed forward, by name

1. **→ unit `e`, BINDING.** The breaking `size=` set is **`icon` (35) ⊕ `default` (6) = 41**, and the
   rewrite's attribute operand is **129**, not 123 and not 162. The producer's own DEV watcher
   (`Button.vue:136`) names both values, and **G6's four zero-console-error specs are the gate that
   catches the omission** — a split or partial sweep turns them red for the wrong cause.
2. **→ unit `e`, BINDING.** `./dock` survives but **`DockIconButton` (19 callsites / 2 files:
   `EditorControlsDock.vue` · `CanvasControlsDock.vue`) and `DockDropdownTrigger` (1 / 1:
   `AnimationControls.vue`) are DELETED**. Successors `DockControl` / `DockTrigger`
   (`dock/index.ts` at `17a11bc5`). This is the wave's second-largest single cost after
   `Button.variant` and **no import-shaped probe can see it**.
3. **→ unit `e`, BINDING.** The **three consumer re-targets R1 · R2 · R3** (9 application sites, 6
   files) land **inside commit #4** as the G5 LANDING CELL requires — they are a limb's resolution,
   never a thirteenth limb. R2's successor rung is **`text-mono-micro uppercase font-medium`** and
   it is **binding on F.W4's AA-15** by the §3 ordering ruling.
4. **→ unit `e`.** `K-8/SR-1` fired: **9 `<Slider variant="standard">` attribute callsites / 7
   files** — **delete, don't rename** (MPC-21/BR-1), free at both pins. And **`TooltipContent`'s
   `:collision-padding="8"`** (`ui/tooltip/Tooltip.vue:33`) has no prop at 8.0.0.
5. **→ unit `e`.** `MetricBadge.color` at **4 sites has NO successor** on `MetricProps`;
   `labelPosition` → `posture` is a clean rename at 6. The `./metric` port is **not** one-for-one.
6. **→ unit `f` / G19, a SHARPENING and never a ruling.** **ESC-7's operand is 21 occurrences / 14
   files** under the grep of record (comment-stripped, `Button`-attributed), not the register's
   **30 / 16** — the difference is 7 comment-resident mentions ⊕ 2 `<Badge variant="outline">` sites
   (`GalleryCard.vue:115` · `GalleryCardModal.vue:129`) that are not Buttons. **The owner is being
   asked to rule on a class whose live Button surface is smaller than the escalation states.** The
   sweep still may not proceed on the map's silence.
7. **→ unit `f` / G17 and the WU-F ledger.** `.cartoon-card` is **not an uplift break** — its 18
   applications / 12 files are already carried by a local shim that survives the hop. G17's ordering
   ruling is therefore a **design** ordering (retire vs adopt), not a break ordering, and `KILL-6`
   is untouched. The shim's own stale comment is corrected inside R1's edit (WU-F `:114`).
8. **→ unit `f` / the close.** Credit rows the uplift lands unasked: **FR-NP-30 (c)** (fixed `px-3`
   → `var(--space-atom)`) and **L-2's mechanism** (the empty-loop resume, guarded at the floor).
   Debt rows it does **not** land: **L-2's false `sideEffects: false`** and **C-18.2's one-version
   in-range set**, both live on NWO-6.
9. **→ F.W4.** FM-2's token column: **5 `var(--ring)` sites / 4 files** lose their register
   silently — one edit to `--focus-ring-color`. **GM-19**: no painted consequence at the adopted
   pin, but the **layered-`!important` route is new at 8.0.0** and is a changed hazard.
10. **→ the owner, unanswered.** **ESC-5's premise is priced further, not answered**: `.paper-texture`
    has no rule at `17a11bc5` **and** both composing tokens survive, so the restore arm is
    executable and cheap. That sharpens the severity question ESC-5 asks. **A seat may not rule on
    the owner's behalf.**
11. **→ the close (E13).** **I-32 · I-33 · I-34 still read `UNREAD 2026-09-17`; this unit flipped
    none and appended no INBOX row**, having sent no mail — its writable set holds neither path.
    The marks are Track D's and route to X-W0.j / the X formation mail seat. Unchanged from unit
    `b`'s residual 6.
12. **→ unit `f`.** **`F-W1-LOG.md` was deliberately NOT created here.** §4's Cadence names it
    beside a whole-wave evidence list (G4 · G6 · G10 · G12 · G13 · G18 entries this unit cannot
    write). Opening it now would seat a partial log that later units must reconcile. **Disclosed so
    it is a decision and not an oversight.**

#### Escalations

**None.** Every specified cure was executable at the bytes, and the two places a specified figure did
not survive measurement are **published corrections under WRITE-THEN-MEASURE and E-3**, not
substituted cures: the **34-not-35 drift is TWO subtractions in two different files** (§Act 5), and
**`size="default"` joins `size="icon"` in the breaking set** (§Act 6) — the second enlarges a limb
already chartered, adds no limb, and is handed to its owning unit by name. **No banked id was
re-graded, no dated artefact was rewritten, no registry file was touched, and no product byte was
written.**

---

### d

**SERVED MODEL: claude-opus-5[1m]**

**Unit**: `d` — the `--viz-*` palette cure at the CURRENT pin (WU-E, ONE repair, SEVERABLE).
**Sections executed**: §2 **WU-E** `:92-101` · §4 commit-plan **step 3** `:282` (the ABORT SEMANTICS clause) · **cross-edge 3** `:296` · §5 **Excluded**'s `color2` / D-4 row `:514`.
**Writable set honoured, hard bound**: `web/src/lib/colors.ts` · `web/src/components/visualization/lib/basis-display.ts` · `web/src/main.ts` · `web/src/components/morph/HarmonicLevelGrid.vue` · this record. **`web/src/components/visualization/EditorControlsDock.vue` was OPENED AND MEASURED, and is deliberately UNWRITTEN** (Act 6). **No other path written** — ⟨cmd⟩ `git status --porcelain` in fourier → **0** before the commit's `git add` and **0** after it. `glass-ui`, `latex-paper`, `value.js`'s own tree and the npm registry were **READ-ONLY** throughout (`git show` · `grep` · `sed` · `ls` · `wc` · `node` against `node_modules` only). `scripts/dev/dev.sh` untouched and unstaged. Pathspec commit.
**Clock**: 2026-09-17, following unit `c`'s landing at `dcc266f2`.
**Commit**: **`3bac3d522fa55d22eddb0c87595f06cf3c44d8dd`** (`3bac3d5`) — `fix(fourier/viz): the --viz-* palette cure at the current pin`, **ONE commit**, 4 files, **+169 / −68**.

#### Act 1 — M-RTC's seat verified at BOTH pins before a byte was written (the seat-0 brief's binding instruction)

The brief re-homes the cure to installed glass-ui 4.0.0's own `@mkbabb/glass-ui/dom` and forbids `./motion-curves`. Both halves were re-measured here rather than inherited:

- ⟨cmd⟩ (cwd `../glass-ui`) `git show 17a11bc5:package.json | grep -c '"\./motion-curves":'` → **0** — §Baseline finding 5 reproduced. **`./motion-curves` does not exist at the adopted tag**; nothing in this commit routes through it.
- ⟨cmd⟩ (cwd `web/`) `grep -c '"\./dom":' node_modules/@mkbabb/glass-ui/package.json` → **1** · ⟨cmd⟩ (cwd `../glass-ui`) `git show 17a11bc5:package.json | grep -c '"\./dom":'` → **1**. **`./dom` is present at BOTH pins**, and its `exports` block is byte-identical at the two (`types: ./dist/dom.d.ts` · `import: ./dist/dom.js`).
- The three named symbols, at both pins. Installed: ⟨cmd⟩ `cat node_modules/@mkbabb/glass-ui/dist/dom.js` → the barrel re-exports `createTokenColorCache`, `resolveTokenColor`, `useTokenColor` by name. Adopted: ⟨cmd⟩ `git show 17a11bc5:src/composables/dom/useResolveTokenColor.ts | grep -n '^export function'` → `:48 resolveTokenColor(css: string, el: HTMLElement | null): string` · `:68 createTokenColorCache(maxEntries = 256)`; `…/useTokenColor.ts` → `:72 useTokenColor(`. **Signatures byte-identical at both pins — the cure survives the hop at unit `e` and breaks nothing there.**
- **A correction to the roster, measured, not presumed**: of M-RTC's three symbols, **`useTokenColor` is the wrong leaf at this seat, twice over.** (i) It reads the DECLARED value — ⟨cmd⟩ `git show 17a11bc5:src/composables/dom/useTokenColor.ts` → `getComputedStyle(el ?? document.documentElement).getPropertyValue(prop)` — which on `light-dark(oklch(), oklch())` returns the **wrapper**, i.e. exactly the string WU-E forbids parsing. (ii) It calls `onMounted` and is therefore a component-scope composable, while C-4's seat is `main.ts` **before `app.mount()`**, where there is no instance. **The cure therefore homes on `resolveTokenColor` ⊕ `createTokenColorCache`, the two scope-free leaves, which is the pair §5 Excluded `:514` names as the remedy** (*"glass's `/dom` `resolveTokenColor`"*). `useTokenColor` is not used and is not needed.

#### Act 2 — the born-RED, measured at the bytes rather than quoted

The producer's `--viz-*` authoring, read at the installed pin: ⟨cmd⟩ `grep -rhn -- "--viz-[a-z]*:" node_modules/@mkbabb/glass-ui/dist/styles/` → `color-radius.css:263-267` `oklch(…)` ×3 ⊕ `--viz-amber: var(--section-color-5)` ⊕ `--viz-green: var(--section-color-4)` · `dark-arm.css:113-115` `oklch(…)` ×3 · `light-dark.css:145-147` `light-dark(oklch(…), oklch(…))` ×3 under `@supports (color: light-dark(white, black))` `:71`. fourier's own `style.css:120`/`:125` overrides `--viz-amber` to `hsl(35 76% 35%)` / `hsl(37 73% 67%)`.

**The live declared values** (bounded Playwright, chromium, dev server on `:5199`, both entry routes — §5.2):

| property | declared, light arm | declared, dark arm |
|---|---|---|
| `--viz-fourier` | `light-dark(oklch(0.579 0.201 30.4),  oklch(0.693 0.151 28.1))` | `oklch(0.693 0.151 28.1)` |
| `--viz-chebyshev` | `light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4))` | `oklch(0.718 0.107 268.4)` |
| `--viz-legendre` | `light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1))` | `oklch(0.739 0.134 318.1)` |
| `--viz-amber` | `hsl(35 76% 35%)` | `hsl(37 73% 67%)` |

**The pre-cure `cssVarToHex` body (`colors.ts:22-53` @ `5842377`) replayed against those exact strings** ⟨cmd⟩ `node before.mjs` →

```
light {"--viz-fourier":"#888888","--viz-chebyshev":"#888888","--viz-legendre":"#888888","--viz-amber":"#9d6515"}
dark  {"--viz-fourier":"#888888","--viz-chebyshev":"#888888","--viz-legendre":"#888888","--viz-amber":"#e8b96d"}
```

**WU-E's arithmetic of record reproduces to the byte**: *"sole survivor `--viz-amber` `#9d6515`/`#e8b96d`; four of five grey"* — `--viz-green` is the fifth, and it takes `#888888` on the same fall-through. The mechanism is named exactly: the `light-dark(…)` form carries no `hsl(` substring, is not a bare triplet and is not `rgb(`, so the three regex arms miss and control reaches the terminal `return "#888888"`; `--viz-amber` survives only because fourier's own override happens to be authored in the one form the regex reads.

#### Act 3 — the cure, as WU-E specifies it and no wider

**D-1 (ADJUDICATED BLOCKER) — `colors.ts`, 117 → 183 L.** The read is now a **used-value probe**, never a string match: `createTokenColorCache()` at module scope, and per token `tokenColors.resolve("var(--viz-…)", document.documentElement)`, which paints the wrapper onto a real CSS `color` property and reads the engine's answer back. That is the only reading in which **the cascade picks the `light-dark()` arm** and **follows the `var(--section-color-N)` alias chain**. The used value is then converted by **`colorUnit2 ∘ parseCSSColor`** — `colorUnit2(parseCSSColor(css), "rgb")`, channels via `ValueUnit.unwrapDeep`, clamped into gamut and formatted `#rrggbb`. **`color2` is NEVER used** (MG-ι); **D-4's getter cure is NOT the remedy** (K-5) — see Act 5. The third clause of D-1 is cured too: **`resolveVizColors()` no longer overwrites a brand hex with a placeholder** — an unset or unreadable property leaves its `VIZ_COLORS` entry alone, and `#888888` no longer exists anywhere in the file (⟨cmd⟩ `grep -c 888888 web/src/lib/colors.ts` → **0**).

*Two hazards found by measurement and closed in the same breath.* (i) `var(--unset)` is **guaranteed-invalid at computed-value time**, so probing an undeclared property would read back the INHERITED `color` — a plausible wrong answer rather than a miss; the pass therefore reads each property's declared value first and skips the empty ones. (ii) ⟨cmd⟩ `node probe2.mjs` measured `parseCSSColor` **throwing** on every form it cannot read (`""` · `"not-a-color"` · `"var(--x)"` · `"oklch()"` · `"currentColor"` · `"light-dark(red, blue)"`), so the failure branch is a `catch` **around the parser boundary only**, returning `null` so the authored value stands. It masks no defect of ours: it is the parser's declared failure protocol, and the branch is unreachable for a used value.

**The `@property` limb is not needed and is not taken.** D-1's identity notes *"no `@property` color registration"*; registering `<color>` syntax is one way to make a `getPropertyValue` read return a resolved value, but the used-value probe obtains the same answer **without touching a producer-owned token declaration** (the `--viz-*` family is authored in `node_modules/@mkbabb/glass-ui/dist/styles/tokens/`, and `web/src/style.css` is **not** in this unit's bound). Recorded so the omission is a decision, not a gap.

**D-2 — `basis-display.ts`, 7 → 37 L.** The module-eval value copy is **gone**: the three colours are `computed(() => VIZ_COLORS.…)` inside a `reactive` record, so `basisDisplay[k].color` is derived rather than captured. The exported type is pinned `Record<string, BasisDisplay>` **deliberately** — the seven consumers index it with a `string` variable (`BasisCanvas.vue:251` · `GalleryCard.vue:40` · `GalleryCardModal.vue:45` · `labels.ts:30` · `GallerySearchBar.vue:31` · `GalleryDraftsSection.vue:44` · `BasisSelector.vue:139`), all of them **outside this unit's bound**, and Vue's `UnwrapNestedRefs` makes the annotation land with **no cast**.

**C-4 — `main.ts`, 11 → 19 L.** `installVizColors()` is called **synchronously before `app.mount()`**, and `app.mount` is reached only through `router.isReady().then(…)`, i.e. a microtask strictly after the module body — so the ordering is a property of the bytes, not of a timing hope. The child-first race the prose at `useCoeffHover.ts:60-65` documents is closed at its root: a root `onMounted` fires **after** every child's, so a child reading the palette while it mounts used to win.

**M-β5 — the repair's own gate, turned in the same commit.** `hexToRgba`/`hexToRgb` now split through one validating `hexChannels()` (`#rgb` · `#rgba` · `#rrggbb` · `#rrggbbaa`), which **raises a named `TypeError`** instead of forwarding `NaN` into `ctx.shadowColor`/`ctx.strokeStyle`, where Canvas2D drops it without a word. The `:29` unvalidated hex fast-path is **deleted with `cssVarToHex` itself**, and the gate's own wording — *"validate before D-1 emits any hex branch"* — holds by construction: the only hex D-1 emits is `toHex()`'s clamped output, and it is emitted only after the parse succeeds.

**HLG-41, ordering edict honoured: the dead bindings die WITH the cure, in the same commit, and no later.** `HarmonicLevelGrid.vue:25` and `:48` (`:style="{ '--track-color': VIZ_COLORS.chebyshev }"`) are **deleted**, and with them the `:91` `VIZ_COLORS` import that they alone justified (286 → 283 L). They are **dead at the bytes, measured**: ⟨cmd⟩ `grep -rl -- "--slider-scrub" node_modules/@mkbabb/glass-ui/dist/` → **no output** — the installed producer consumes the `--slider-scrub-*` family **nowhere**, so `.level-slider-track`'s four declarations (`:208-214`) are inert and `--track-color` feeds only inert declarations. The edict's rationale is now live rather than theoretical: before this commit `VIZ_COLORS.chebyshev` was pinned at `#888888` through every flip, so the binding never invalidated; **the cure mints the per-theme-flip re-render trigger on a `v-for` grid**, which is precisely why the deletion may not follow it.

**L-7 — the dead `VIZ_COLORS.green` read.** ⟨cmd⟩ `grep -rno "VIZ_COLORS\.[a-zA-Z]*" web/src | sed 's/.*VIZ_COLORS\./VIZ_COLORS./' | sort | uniq -c | sort -rn` → `11 fourier · 10 golden · 7 amber · 5 chebyshev · 3 legendre · **1 green**`, and that one is **its own write at `colors.ts:95`**. Zero readers: the member and its resolve are **deleted**. The token roster is now four, not five.

**M-β6 — the unfiltered `getComputedStyle` round-trips.** Before: five calls to `getComputedStyle(document.documentElement)` per invocation, one per token, each interleaved with nothing that could share them. After: **one** `getComputedStyle` handle and one batched declared-value read for the whole pass, then a **cached** probe per unique token expression (`createTokenColorCache` — the producer's own answer: *"the un-wrap (a forced sync reflow) runs once per unique color string"*), dropped wholesale by `invalidate()` when the cascade moves. With L-7 the pass is four tokens, not five.

**A cascade channel the tree did not observe, closed where the palette lives.** `installVizColors()` also subscribes to `matchMedia("(prefers-color-scheme: dark)")`. `:root { color-scheme: light dark }` (`tokens/scheme-motion.css:24`) makes the producer's `light-dark()` arms follow the OS, and an OS flip is **not** a class mutation — the app root's `MutationObserver` watches `attributeFilter: ["class"]` only. This mirrors the producer's own pattern in `useTokenColor` (MutationObserver on class ⊕ `matchMedia` change), so it is the sanctioned shape rather than an invention.

#### Act 4 — the SS-13 witness, entry route PINNED (R-1), light ⊕ dark ⊕ back, both routes

R-1 is binding: *"the split-brain is entry-conditional … every SS-13 witness and repair test pins the entry route"*. Both routes were driven: **`/paper`** (the default target of `/` and the post-poison route named in WU-E) and **`/w/`** (the visualization entry, where `components/visualization/**` — hence `basis-display` — is evaluated). The witness imports the **live module instances over the dev-server module graph**, so it reads `VIZ_COLORS` and `basisDisplay` themselves, not a re-implementation. ⟨cmd⟩ `node witness2.mjs`, **double-run, output diff EMPTY**:

| route · arm | `VIZ_COLORS` fourier · chebyshev · legendre · amber | `basisDisplay.*.color` | `hasGreen` |
|---|---|---|---|
| `/paper` LIGHT | `#d73523` · `#3156b9` · `#9541af` · `#9d6515` | `#d73523` · `#3156b9` · `#9541af` | `false` |
| `/paper` DARK | `#eb7366` · `#88a1e7` · `#ce8ee1` · `#e8b96d` | `#eb7366` · `#88a1e7` · `#ce8ee1` | `false` |
| `/paper` BACK | `#d73523` · `#3156b9` · `#9541af` · `#9d6515` | `#d73523` · `#3156b9` · `#9541af` | `false` |
| `/w/` LIGHT | `#d73523` · `#3156b9` · `#9541af` · `#9d6515` | `#d73523` · `#3156b9` · `#9541af` | `false` |
| `/w/` DARK | `#eb7366` · `#88a1e7` · `#ce8ee1` · `#e8b96d` | `#eb7366` · `#88a1e7` · `#ce8ee1` | `false` |
| `/w/` BACK | `#d73523` · `#3156b9` · `#9541af` · `#9d6515` | `#d73523` · `#3156b9` · `#9541af` | `false` |

`PAGE ERRORS: []` on every route and every arm.

**BEFORE → AFTER, the CHROME↔CANVAS divergence closed**: `#888888 · #888888 · #888888 · #9d6515` → `#d73523 · #3156b9 · #9541af · #9d6515` (light) and `#888888 · #888888 · #888888 · #e8b96d` → `#eb7366 · #88a1e7 · #ce8ee1 · #e8b96d` (dark). **`--viz-amber` is byte-unchanged in both arms** — the one token the old path read correctly still reads identically, which is the honest check that the new path is a superset and not a re-tint.

**MG-κ's provenance claim, confirmed rather than repeated.** WU-E states *"prior pin authored HEX; `#d73523` byte-identical to `colorUnit2(oklch-token)`"*. The cured light-arm `--viz-fourier` reads **`#d73523`** — the cure does not invent a colour, it **restores the one the prior pin shipped**, and the regression is dated exactly where MG-κ dates it. ⟨cmd⟩ `node probe.mjs` shows the arithmetic standing alone: `oklch(0.579 0.201 30.4)` → `rgb(0.8433193…, 0.2083613…, 0.1371963…)` → `#d73523`, and `#d73523` → `rgb(0.8431372…, 0.2078431…, 0.1372549…)`, the two agreeing to the 8-bit byte.

**D-2's split-brain, witnessed dead**: `basisDisplay.*.color` equals `VIZ_COLORS.*` on every row above, including after a flip and after a flip back, on **both** entry routes. Before the commit it would have held `#bf4040`/`#3d72b8`/`#9545b8` — the authored fallbacks, frozen at module evaluation — against a live `VIZ_COLORS`, which is *"one basis two colours one frame"* exactly.

**M-β5, witnessed at the boundary** ⟨cmd⟩ (same run) → `hexToRgba("not-a-hex", .5)` → `THREW: not a CSS hex color: "not-a-hex"` · `("")` → `THREW: …: ""` · `("#12345")` → `THREW: …: "#12345"` · `("#888888")` → `rgba(136, 136, 136, 0.5)` · `("#abc")` → `rgba(170, 187, 204, 0.5)`. **The NaN channel is unreachable; valid input, including the 3-digit short form, is unaffected.**

**The OS-scheme channel** ⟨cmd⟩ `node witness3.mjs` (no class touched; `emulateMedia({colorScheme})` only) → `OS light {"fourier":"#d73523","legendre":"#9541af"}` → `OS dark {"fourier":"#eb7366","legendre":"#ce8ee1"}` → `OS back {"fourier":"#d73523","legendre":"#9541af"}`, `PAGE ERRORS: []`. **Measured note**: glass's `useGlobalDark` *also* mirrors the OS preference onto the `.dark` class, so on this configuration both channels fire and the resolve is idempotent; the subscription is the contract for the arm, not a duplicate path.

#### Act 5 — the two KILLS, honoured explicitly

- **`color2` NEVER (MG-ι).** The symbol appears **nowhere in the tree**, in either sense: ⟨cmd⟩ `grep -rnw "color2" web/src | wc -l` → **0**, and ⟨cmd⟩ `grep -c "color2" web/src/lib/colors.ts` → **0** — `colorUnit2` does not even contain the substring (`colorUnit2` ≠ `color2`), so the count is not a near-miss being read charitably. What the file imports is ⟨cmd⟩ `grep -n "@mkbabb/value" web/src/lib/colors.ts` → `:19 import { colorUnit2, parseCSSColor, ValueUnit } from "@mkbabb/value.js";`, and the composition `colorUnit2(parseCSSColor(css), "rgb")` is the cure WU-E names.
- **D-4's "make `color` a getter" cure is KILLED (K-5), and is not what landed.** K-5's stated rationale is *"the getter restores reactivity onto a `#888888` resolver — **the cure alone worsens the surface**"*, and §5 `:514` excludes it **as the palette remedy**, naming the remedy as *"`colorUnit2 ∘ parseCSSColor` or glass's `/dom` `resolveTokenColor`"*. That remedy is what this commit lands. What `basis-display.ts` gains is **D-2's own repair — the removal of a module-eval value copy** — and it ships in the SAME commit as the resolver, so the condition the kill guards against is extinguished at the bytes: **`#888888` is no longer an emittable value** (⟨cmd⟩ `grep -c 888888 web/src/lib/colors.ts` → `0`). Stated in full here so the distinction is on the record and not left to a reader's charity.

#### Act 6 — the `EditorControlsDock.vue:123` rider: MEASURED, and NO BYTE WRITTEN

WU-E's rider reads *"`EditorControlsDock.vue:123` magnet track goes grey"*. The site is ⟨cmd⟩ `grep -n "VIZ_COLORS" web/src/components/visualization/EditorControlsDock.vue` → `:8 import` · `:123 :style="{ '--track-color': VIZ_COLORS.fourier }"` — a **template binding**, which re-renders on the reactive write. **D-1 cures it with no edit at all**: the binding now emits `#d73523`/`#eb7366` where it emitted `#888888`. The file was opened, measured and **left byte-identical**, because writing to it would be an edit the disposition does not ask for.

**A finding that belongs to G9, not here, and is handed on rather than acted on**: `.magnet-slider-track` (`:223-229`) is the same A.W2.c pattern as HLG-41's `.level-slider-track`, and the `--slider-scrub-*` family it projects onto is consumed **0×** by the installed producer (Act 3's measurement). So `:123` is structurally the same dead binding HLG-41 orders deleted, and it mints the same per-flip trigger. **It is NOT deleted here**: the spec issues its ORDERING EDICT for `HarmonicLevelGrid.vue:25/:48` alone, and the `--slider-scrub-*` family is **G9's operand — *"acceptance only — execution is F.W3/W4"*** — whose seven named files include **both** `visualization/EditorControlsDock.vue` and `morph/HarmonicLevelGrid.vue`. A third instance of the same shape stands at `BasisSelector.vue:176`/`:203`/`:318-322`. **Routed to F.W3/W4 under G9, with this measurement attached.**

#### Act 7 — the abort semantics, discharged clause by clause (§4 step 3 `:282`)

> *"What it may never do is presume the hop: no bare-root-specifier leg, no ≥7 token spelling, no producer-deleted class inside it."*

- **No bare-root specifier added.** ⟨cmd⟩ `git show 3bac3d5 -- web/src | grep -c '^+.*@mkbabb/glass-ui"'` → **0**. The tree's six pre-existing bare-root sites are untouched and remain unit `e`'s (`useMorphConfig.ts:9` · `UserSlugBar.vue:5` · `AdminUserList.vue:4` · `GalleryCard.vue:5` · `EquationResult.vue:4` · `router/index.ts:2`). The one glass specifier this commit adds is **`@mkbabb/glass-ui/dom`**, a subpath present at BOTH pins (Act 1).
- **No ≥7 token spelling.** The commit's entire `--` surface is ⟨cmd⟩ `git show 3bac3d5 -- web/src | grep -E "^[+-].*--"` → two **deleted** `--track-color` bindings and the four pre-existing `--viz-*` names it reads. **No token is introduced.**
- **No producer-deleted class.** The commit adds **no class attribute and no selector at all**; `class="level-slider-track"` survives unchanged on both sliders (it still carries `flex: 1`).
- **Severability, affirmatively true.** The commit compiles and runs against the **installed 4.0.0** tree with no manifest change; `web/package.json`, `web/package-lock.json`, `web/dist/**` and every producer byte are untouched. **If commit #4 aborts, this stands** — and Act 4 is the measurement of the spec's own claim that what remains is *"the pre-uplift tree plus a palette that resolves"*.

#### Gates

| gate | BEFORE | AFTER | receipt |
|---|---|---|---|
| **M-β5 — the repair's own gate** (*validate before D-1 emits any hex branch, same commit*) | **RED** — `hexToRgba`/`hexToRgb` `:101-117` do `parseInt` on an unchecked slice; the `:29` fast-path forwards any `#…` unvalidated | **GREEN** | one validating `hexChannels()` behind both exports, raising a named `TypeError`; the `:29` fast-path deleted with `cssVarToHex`; D-1's only hex branch is `toHex()`'s clamped output, reached only after the parse succeeds. Witnessed in-page: 3 malformed inputs THROW, 2 valid inputs convert (Act 4). **Same commit, `3bac3d5`.** |

**No gate of G1–G20 is this unit's to turn** (§Unit plan: *"none of G1–G20 directly"*), and none was moved. **Two are touched and are reported, not claimed:**

- **G11 (module resolution) — the inherited RED is UNCHANGED, and that is the reading that matters.** ⟨cmd⟩ (cwd `web/`) `npx vue-tsc -b --force` → **exit 1 · 20 diagnostics** at open (17 `TS6133` · 1 `TS6196` · 1 `TS2882` `PaperView.vue(12,8)` · 1 `TS2769` `vite.config.ts`), reproducing §Baseline's G11 row exactly. After the commit: **exit 1 · 20 diagnostics**, ⟨cmd⟩ `diff base.txt after.txt` → **EMPTY**, and the run **double-run identical**. **Zero diagnostics added, zero removed** — G-15(a)'s ruling (*the RED is the uplift's, its cure owned by F.W1/W2*) is honoured: this commit neither inherits the RED as its own nor disturbs it.
- **G4** is not run here — its `npm run build` needs the bumped install and is unit `e`'s (§Unit plan). ⟨cmd⟩ `git status --porcelain` → **0**: `web/dist` was neither read as evidence nor written.

⟨cmd⟩ `git diff --check` → clean, before and after the commit.

#### E13

The four paths ⊕ the atlas **Q** extension were swept at §Open (seat 0, 19:11) and I-32/I-33 were **read in full and consumed** by unit `b`, whose own row records *"NO STATUS CELL WAS FLIPPED"* because the three `UNREAD` marks are **Track D's rows**. **This unit mints no letter, flips no cell and appends no INBOX row** — `docs/tranches/V/coordination/INBOX.md` is **not in unit `d`'s writable set**. **Nothing in I-32/I-33/I-34 is owed by WU-E**, checked rather than assumed: I-32's `B-4` is the only row naming `--viz-amber`, and it is a **producer-pin fact** (*"`--viz-amber` = `oklch(0.530 0.124 69.6)`: 5.018 on `--card`, 5.214 on `--background`, 7.721 dark … the 3.54 is a 4.0.x figure"*), i.e. it bears on **`web/src/style.css:113-127`'s D.W4.d override**, a file in **unit `e`'s** bound at the hop, not on the resolver. **Handed to unit `e` by name** — and with a forward note the cure already covers: at 8.0.0 `--viz-amber` becomes an `oklch()`, the very form the deleted regex could not read, so the resolver landed here is what makes that hop safe. `PD-1`/`A-10`/`G18` are unit `f`'s and are not touched. **0 unrowed · 0 new `I-n` · 0 new `O-n` · 0 UNREAD in unit `d`'s scope.**

#### Residuals and escalations — nothing absorbed silently

**ESCALATION — three WU-E limbs have their ONLY repair site OUTSIDE this unit's writable set, and outside the wave's §1 product surface.** Measured, not inferred; none is a substitute cure and none was attempted.

1. **`fr-BasisCanvas C-4`** — *"No draw path holds a reactive dependency on `VIZ_COLORS` — theme flip never repaints paused/off-screen canvas."* The site is **`web/src/components/visualization/BasisCanvas.vue`**. ⟨cmd⟩ `grep -n "watch(" web/src/components/visualization/BasisCanvas.vue` → `:378` `[() => store.epicycleData, …]` · `:402` `[() => store.basesData, () => props.activeBases]` · `:418` `[() => anim.t, () => anim.easedT, () => props.showGhost, () => props.showImageOverlay]`. **Every draw runs inside a `watch` CALLBACK, which tracks nothing**, and `drawFrame` reads the palette at ⟨cmd⟩ `grep -n "cfg.color\|VIZ_COLORS.golden" web/src/components/visualization/BasisCanvas.vue` → `:127` · `:172` · `:257` (`cfg.color`) · `:261` · `:326`. Making `basisDisplay.color` a `computed` (this unit's D-2) **does not close it**: a computed read inside an untracked callback still registers no dependency. The cure is one source in that watcher's array, or one `watch` on the palette next to it — **one byte in `BasisCanvas.vue`**, which is not in unit `d`'s writable set and is not enumerated at §1. **The limb is newly visible exactly as WU-E predicts** (*"Newly visible the moment D-1 lands"*): before this commit a flip changed nothing, because all four tokens were pinned grey through it.
2. **`m-9`** — the `MOON_COLOR`/`SUN_COLOR` false anchors. ⟨cmd⟩ `grep -rn "MOON_COLOR\|SUN_COLOR" web/src` → **`web/src/components/layout/DarkModeToggle.vue:30,31,49,50,53,54`** — `SUN_COLOR = [232, 136, 69]`, `MOON_COLOR = [192, 132, 252]` with the comment *"matches `VIZ_COLORS.legendre`"*, which the cured light-arm legendre (`#9541af`) shows it does not. Out of bound.
3. **`M-α5`** — the focal mark's third divergence site. ⟨cmd⟩ `grep -rn "#ff3b3b" web/src` → **`web/src/components/visualization/lib/canvas-drawing/epicycles.ts:289`** `ctx.fillStyle = "#ff3b3b"`. Out of bound.

**The declared interlock landed whole**: WU-E's binding clause is *"**Interlock: D-1 and D-2 are ONE repair** (curing either alone worsens the surface)"*, and **both** are in this commit, with C-4, M-β5, HLG-41, L-7 and M-β6 beside them. The three limbs above are additive to the palette's correctness, not conditions of it; the surface after this commit is strictly better than before it on every measurement in Act 4. **Per §4 step 3 `:282` this commit is SEVERABLE and is not reverted if #4 aborts** — so the right disposition of the three is a bound, not a revert: **either widen unit `d`'s writable set by three paths and re-seat the limbs, or route them to the unit that already owns those files.**

**Residuals, each with its measurement, none acted on:**

- **`App.vue:10-18` still calls `resolveVizColors()` in the root `onMounted` and installs its own class `MutationObserver`.** §1 lists `web/src/App.vue` on the **same line** as `colors.ts`/`basis-display.ts`/`main.ts` — the WU-E line — but it is **not** in unit `d`'s writable set, so it was not touched. The consequence is **benign and measured**: the `onMounted` call is one redundant re-resolve at boot (the second pass writes the same strings, so no reactive churn), and the class observer is the channel the app still needs. The cure was designed so this is harmless: `installVizColors()` adds **no** second `MutationObserver`, only the `matchMedia` subscription the root does not have. **The tidy-up is three deleted lines in `App.vue` (the `resolveVizColors()` call, the observer, and then the import), and belongs to the seat that owns it.**
- **`VIZ_COLORS.rainbow` · `.pink` · `.emerald` are dead exactly as `.green` was.** ⟨cmd⟩ `grep -rno "VIZ_COLORS\.rainbow\|VIZ_COLORS\.pink\|VIZ_COLORS\.emerald" web/src | wc -l` → **0** for all three. **Not deleted**: WU-E's rider names `green` and only `green`, and three more deletions is a second meaning in a commit the spec fixes at one. Handed to F.W2/F.W3.
- **`hexToRgb` has zero call sites.** ⟨cmd⟩ `grep -rn "hexToRgb\b" web/src | grep -v "lib/colors.ts"` → no output. It is validated with its twin (M-β5 names both) and **kept**, because deleting an export is not this repair's meaning.
- **`hexToRgba`'s `alpha` argument is unvalidated**, so a `NaN` alpha still produces `rgba(…, NaN)`. M-β5's identity is the **hex** channel; the alpha arm is stated here rather than swept in.
- **`.level-slider-track`'s four `--slider-scrub-*` declarations (`HarmonicLevelGrid.vue:208-214`) survive** the `:style` deletion and now read an unset `--track-color`. They were already inert (Act 3) and the family is **G9's operand, executed at F.W3/W4** — deleting them here would execute another wave's gate.

**Self-count**: this `### d` block is **not** counted in any figure above; every count is of the settled product bytes, the read-only producer tree at its tag, or the frozen witness output, each double-run.

---

### e

**SERVED MODEL: claude-opus-5[1m]**

**Unit**: `e` — THE ATOMIC TRANSACTION (ONE `feat(fourier)!:` commit, TWELVE limbs).
**Sections executed**: §4 step 4 `:276` (the roster, cited whole) · §3 **G4** `:250` · **G6** `:252` · **G8** `:254` · **G9** `:255` · **G10** `:256` · **G11** `:257` · **G13** `:259` · §2 **WU-C** · **WU-F** · **WU-G** · **WU-J** `:150-156` · **WU-K** `:158-164` · **WU-L** `:166-175` · **WU-N** `:185-189` · **WU-O** `:191-197` · **WU-P** `:199-209` · §3 **G19** `:265` and §2 **WU-R** `:221-229` + **§2·R2d** (the LOCK this unit is held by).
**Writable set honoured, hard bound**: **ZERO product bytes written.** This record is the ONLY file this unit wrote. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **0**, before and after every act, double-run. The fourier · glass-ui · value.js · pencil-boil trees, the npm registry and the 4.0.0 tarball were **READ-ONLY** throughout (`git show` · `git grep` · `grep` · `sed` · `awk` · `wc` · `ls` · `npm view` · `npm pack` into the session scratchpad · `node` as a reader only). `scripts/dev/dev.sh` untouched and unstaged; `docs/tranches/V/reformation/CARRY-LEDGER.md` left dirty-as-found and unstaged. Pathspec commit only. No `git stash`, no `reset`, no force-push.
**Clock**: 2026-09-17, following unit `d`'s landing at `3bac3d5`.

**STATUS: ESCALATED. The transaction did not begin, and not one of its twelve limbs was partially landed.** The reason is the unit's own first LOCK, verified at the bytes before anything else was measured, and it has not moved since unit `a` returned it.

---

#### Act 1 — the LOCK is a PRECONDITION, so it was read first and falsified twice, not concluded at the end

§3 **G19**'s condition is *"**ESC-1..ESC-7** each carry a ruling or an explicit deferral with blocked rows named"*, and this unit's own lock reads *"**BLOCKED until G19's ESC-2…ESC-7 carry a ruling or an explicit deferral with blocked rows named** — … and *the sweep may not proceed on the map's silence*."* The runbook restates it program-wide at §5.7: *"Owner rulings are FLAGGED INLINE and never presumed."*

**The falsifier, run by this seat rather than inherited from unit `a`** (cwd `docs/tranches/X/`):

- ⟨cmd⟩ `grep -n "ESC-2\|ESC-3\|ESC-4\|ESC-5\|ESC-6\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → **no output, exit 1** (run 1) · **no output, exit 1** (run 2) · and a third reading as a count, ⟨cmd⟩ `grep -c …` → `COHESION.md:0` · `EXECUTION-RUNBOOK.md:0`.
- **Widened over the whole tranche tree**, ⟨cmd⟩ `grep -rln "ESC-2\|…\|ESC-7" .` → `execution/C/F-W1.md` · `execution/LEDGER.md` · `fourier/carry/F-W1-CARRY.md` · `fourier/conformance/PASS-1..PASS-5/*` · `fourier/evidence/w1/G7-BUTTON-BUDGET.md` · `fourier/evidence/w1/K1-RE-RESOLUTION.md` · `fourier/waves/F-W1.md` · `fourier/waves/F-W2.md` — i.e. **only where the six are RAISED, re-raised, or measured; nowhere one is ANSWERED.**
- **The owner's own X·F section read whole**: `COHESION.md` **§0j.D** carries `OG-F1` · `OG-F2/OG-V2` · `G-10` · `G-15` (four contradictions) · `F-TRIE` · `F-PRODRET` · `F-SS4REST` (R1/R4/R5/R6/R7/R8/R9). **No ESC-2…ESC-7 row exists in it**, and §0j.A/B/C/E/F address other tracks.

**A seat may not defer on the owner's behalf** — the deferral G19 accepts is an *explicit* one. **The condition that opens this unit is not met, and it was not met at the moment the unit opened.**

---

#### Act 2 — which of the SIX actually gate a limb: measured, and it is TWO, not six

Returning "six are open" is true but not useful to the owner, so this seat priced each of the six against the twelve-limb roster at the adopted pin. **Two block a limb. Four do not.** Each verdict is a measurement, and **none of them is a ruling**.

| ESC | question (WU-R / §2·R2d) | measured relation to the TWELVE limbs | verdict |
|---|---|---|---|
| **ESC-4** | easing-drift acceptance (14/22 analytic→CubicBezier) | **limb 1's value.js half cannot be authored without it** — see Act 3 limb 1 | **LIMB-BLOCKING** |
| **ESC-7** | the `outline` register's retirement | **limb 2 is 21/88 unmapped** — see Act 3 limb 2 | **LIMB-BLOCKING** |
| **ESC-2** | ToC model ownership (`fr-PaperSidebar L-4`/`M6`) | `web/src/components/paper/**` is **CLOSED** at §1 unless a ruling seats G16's carry here, and none does; WU-R routes the collapse's execution to **F.W4** | **not limb-blocking** |
| **ESC-3** | the invisible-picker design (`U-2`) | **a measured ZERO at this tree**: ⟨cmd⟩ `grep -rln 'glass-ui/select' web/src \| wc -l` → **5** files, ⟨cmd⟩ `grep -rn '<SelectTrigger' web/src \| wc -l` → **6** callsites, and **not one passes `variant` or `size`** — ⟨cmd⟩ an `awk` open-tag scan over the five files piped to `grep -c 'variant=\|size='` → **0** (double-run). The producer's own docblock at the adopted tag says so from its end: ⟨cmd⟩ `git show 17a11bc5:src/components/select/SelectTrigger.vue \| sed -n '20,22p'` → *"ONE trigger, one register. `variant="ghost"` and `size="sm"` are gone with no … (a picker with no edge is not a picker)"*. **There is no prop to rewrite**; the consequence is that six pickers GAIN an edge at the hop — a **visual** outcome for the WU-F diff-review ledger and the edge-9 checkpoint set (unit `f`), not an unbounded limb | **not limb-blocking** |
| **ESC-5** | B-2's regrade price — *"priced on G5 existing — **if G5 is not adopted**, revisit the BLOCKER regrade"* | **the antecedent is measured FALSE**: G5 was adopted and turned **GREEN** by unit `c`, which published `.paper-texture`'s cure as re-target **R1** (texture-restore from the surviving `--paper-clean-texture` ⊕ `--paper-texture-size` tokens, **1 application**, `App.vue:24`). The cure is executable and its landing seat is the G5 LANDING CELL inside commit #4. ESC-5 remains the owner's severity question; **it gates no limb**, because the conditional it states does not fire | **not limb-blocking** |
| **ESC-6** | `color-mix` browser band (`FR-MSP-12` → `FR-COB-26`) | sizes **MINOR vs INFO** — a severity question. Neither id is a member of the twelve-limb roster, and `FR-MSP-12` left on **NWO-1** under I-32's `A-12` `ROUTE → fourier` (unit `b`, Act 2) | **not limb-blocking** |

**This narrows the owner's round from six questions to two.** It does not answer either.

---

#### Act 3 — the TWELVE limbs measured at their TRUE BYTES (METHOD: measure before you edit), so the successor seat executes without re-archaeology

Every anchor below was re-verified at the settled bytes of fourier HEAD `3bac3d5` and the producer at `17a11bc5`. **Drift is recorded where it exists; nothing was edited.** All figures double-run.

| # | limb (§4 step 4, cited whole) | measured at the bytes | ready? |
|---|---|---|---|
| **1** | producer bump — glass `8.0.0` @ `17a11bc5` · kf `^6.0.0` · value `^4.0.0`, lockstep (MPC-14) | manifest today ⟨cmd⟩ `sed -n '/"dependencies"/,/^  }/p' web/package.json` → `"@mkbabb/glass-ui": "^4.0.0"` · `"@mkbabb/keyframes.js": "^4.3.0"` · `"@mkbabb/value.js": "^0.13.0"`. **The value.js half carries ESC-4 inside it** — see the block below this table | **BLOCKED (ESC-4)** |
| **2** | the G7-sized Button re-grammar, G8-preserving | budget of record = `evidence/w1/G7-BUTTON-BUDGET.md` **B1 88 · B3 129**. Per-arm: `ghost` **46/21** → `emphasis="quiet"` · **`outline` 21/14 → NO SUCCESSOR** · `glass` **9/7** and `default` **4/4** → `emphasis="primary"` · `destructive` **4/4** → `emphasis="primary" tone="destructive"` · `secondary` **1/1** · `link` **1/1** (the evidence's own cell flags `emphasis="text"` as *"nearest; **not** a banked mapping"*) · bound `:variant=` **2/2**, hand-migrated. Size: `icon` **35** ⊕ `default` **6** = **41** breaking. **The successor axes at the adopted tag are CLOSED SETS** — ⟨cmd⟩ `git grep -n "ButtonEmphasis\s*=\|ButtonTone\s*=\|ButtonSize\s*=" 17a11bc5 -- src` → `Button.vue:39` `ButtonEmphasis = "primary" \| "secondary" \| "quiet" \| "text"` · `:46` `ButtonTone = "neutral" \| "destructive"` · `:40` `ButtonSize = Extract<Size, "xs" \| "sm" \| "md" \| "lg">`. **`outline` is in none of them, and no combination is a mechanical successor** | **BLOCKED (ESC-7)** |
| **3** | the `copied`→`status` triple | **all three anchors reproduce to the line**: ⟨cmd⟩ `grep -n "copied" …` → `EquationResult.vue:15` `const { copied, copy } = useClipboard({ resetMs: 2000 });` · `UserSlugBar.vue:23` (`resetMs: 1500`) · `useMorphConfig.ts:58`. Consumers at `EquationResult.vue:46` · `UserSlugBar.vue:99` (`v-if="copied"`) and `useMorphConfig.ts:90` (re-exported) | **ready** |
| **4** | the lucide rename to `@lucide/vue` | ⟨cmd⟩ `grep -rn "lucide-vue-next" web/src \| wc -l` → **34**, `-l` → **34** (double-run) — §Baseline finding 1 reproduces, and the manifest row is ⟨cmd⟩ `grep -n "lucide" web/package.json` → `35: "lucide-vue-next": "^1.0.0"` **in devDependencies**. **+1 inline** `D·D-M11` verified verbatim: ⟨cmd⟩ `sed -n '277,279p' web/src/components/equation/EquationView.vue` → `<svg class="size-[18px]" viewBox="0 0 24 24" …>` ⊕ `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>` ⊕ `</svg>` — element-identical to lucide `Info`, **exactly at the banked coordinate**. The **17 hand-svgs / 12 files** reproduce exactly (⟨cmd⟩ `grep -rn "<svg" web/src \| wc -l` → **17**, `-l` → **12**) and are **ledgered, not swept** | **ready** |
| **5** | G10's symmetric disclosure deletions | **all five landmarks per twin reproduce the round-4 re-measurement to the line**, double-run: `CollapsibleSection.vue` `overflow: hidden` **`:55`** · `animation:` **`:61` `:64` `:69`** · PRM **`:66`**; `ContourSettings.vue` `overflow: hidden` **`:362`** *and* **`:425`** · `animation:` **`:365` `:368` `:373`** · PRM **`:370`**. The pair to delete is the two `[data-state]` shorthands ⊕ the PRM arm **on both twins at corresponding scope**; **`overflow: hidden` EXCLUDED on both**, and **`:425` is the disclosed different rule and is not touched** | **ready** |
| **6** | FR-EQC-7's `vaul-vue` declare+lock | **born-RED confirmed at the bytes, double-run**: ⟨cmd⟩ `grep -rn "vaul-vue" web/src \| wc -l` → **0** and ⟨cmd⟩ `grep -c "vaul-vue" web/package.json` → **0**. No manifest row, no lock row — MISS-LC2's other half, whose landing §4 step 2 assigns to this transaction | **ready** |
| **7** | G13's manifest/lock moves | `cva` · `clsx` · `reka-ui` · `lucide-vue-next` all sit in **devDependencies** at `web/package.json` (C-3), and **CVA stays** (FMD-21). BEFORE: ⟨cmd⟩ (cwd `web/`) `npm ls --all` → **exit 1**; `npm ls` prints **extraneous** `@emnapi/*` · `@napi-rs/wasm-runtime` · `@tybys/wasm-util` · `embla-carousel*` · `perfect-freehand` | **ready** |
| **8** | PP-REDGATE's ambient declare in `env.d.ts` | born-RED confirmed: ⟨cmd⟩ `wc -l < web/env.d.ts` → **12** (double-run), holding only the vite client reference, the `*.vue` shim and `ImportMetaEnv` — **no `declare module "@mkbabb/latex-paper/theme"`**. Its witness is live in the typecheck: `PaperView.vue(12,8) TS2882` (Act 4) | **ready** |
| **9** | FR-CP-13's gap decision, made ONCE with FR-CP-24's hairline row, same commit | anchor reproduces: ⟨cmd⟩ `grep -n "viz-panel-left" web/src/components/visualization/VisualizationView.vue` → the rule at **`:363`**, and its **`gap: 0.75rem`** at **`:366`** — the banked **12px** exactly. The file is in bound as a Button **and** lucide consumer (`:29` `@mkbabb/glass-ui/button`, `:10` `lucide-vue-next`) | **ready** |
| **10** | ExportModal M-γ's deletion (a sequenced PREREQUISITE) | anchor reproduces to the line: ⟨cmd⟩ `grep -rn "min-width: 300px" web/src` → **`src/components/visualization/ExportModal.vue:87`**, one hit. In bound as a Button ⊕ lucide consumer (`:3`, `:12`) — and it is itself an ESC-7 site: `:74` `<Button variant="outline" size="default" …>` | **ready** |
| **11** | GCM-22's `p-0` — *"state which way ESC-1's 8.0.0 flipped it"* | **IT FLIPPED TO SUPERSEDED, and the receipt is the producer's own specificity.** GCM-22's cure (*retire `p-0` for authored bleed geometry*) is conditioned *"**superseded if target = 8.0.0** (the `:where()` clamp; `w-full` genuinely outranks)"*, and ESC-1 ruled **8.0.0**. Measured at the adopted tag: ⟨cmd⟩ `git grep -n ":where(" 17a11bc5 -- src/components/dialog` → `styles.css:20` `:where([data-slot="dialog-content"]) {` and ⟨cmd⟩ `git grep -rn "padding" 17a11bc5 -- src/components/dialog` → `:25 padding-inline: var(--space-family);` · `:26 padding-block: var(--space-family);`. **The padding authority is inside `:where()`, so it computes at specificity (0,0,0); the consumer's `p-0` utility is (0,1,0) and genuinely outranks it.** The consumer site is `GalleryCardModal.vue:73` (`… overflow-y-auto p-0 border-2 …`). **Limb 11 therefore lands as NO CONSUMER EDIT — a ruled kill, recorded, not a silent omission** | **ready — resolves to a KILL** |
| **12** | the pencil-boil floor per G14 | floor at the adopted tag ⟨cmd⟩ `git show 17a11bc5:package.json` → peer `@mkbabb/pencil-boil` **`^0.11.2`**; manifest today `"@mkbabb/pencil-boil": "^0.4.1"`. **The brief's *"an in-range 0.11.x"* has a UNIQUE referent — `0.11.2`** — per unit `b`'s measured correction (the in-range published set of `^0.11.2` is `{0.11.2}`, one version; `0.11.0` belongs to `^0.11.0`), which this seat consumes as binding rather than re-deriving | **ready** |

**Ten of twelve limbs are measured ready. Two are blocked. Because §3.4's lock makes a partial landing the L-18 failure and G6 fuses limbs 1 ⊕ 2 ⊕ 3 into one change, ten-of-twelve is not a landing — it is the failure.**

**Limb 1's ESC-4 leg, measured at the PUBLISHED bytes rather than argued.** WU-K books value 4.0.0 as *"no `"."` export AND deletes `timingFunctions`"*, with **14 of 22 morph keys silently drifting analytic→CubicBezier** routed to **ESC-4** as *"explicit acceptance, not a silent bump"*. Both halves reproduce exactly at the registry artifact (⟨cmd⟩ `npm pack @mkbabb/value.js@4.0.0` into the session scratchpad, then read):

- ⟨cmd⟩ `npm view @mkbabb/value.js@4.0.0 exports --json` → **seven subpaths** (`./color` · `./value` · `./css` · `./easing` · `./math` · `./transform` · `./quantize`) and **no `"."` key**. fourier holds **six bare-root value.js import lines across five files** — ⟨cmd⟩ `grep -rn '"@mkbabb/value.js"' web/src` → `ConvergencePlot.vue:5` · `harmonics.ts:5` · `useCurveTransition.ts:8` · `colors.ts:19` · `easings.ts:9` · `easings.ts:16`. **Every one is a hard break at the hop.**
- ⟨cmd⟩ `grep -c "timingFunctions" package/dist/subpaths/easing.d.ts` → **0**. **Deleted, as banked.**
- **The drift figure, derived rather than quoted**: `EASING_LABELS` (`easings.ts:29-52`) holds **22** keys; `./easing`'s analytic named exports are `linear` · `easeInOutQuad` · `easeOutCubic` · `easeInOutCubic` · `easeInOutSine` · `easeOutExpo` · `easeInOutExpo` · `easeInOutCirc`. ⟨cmd⟩ a `node` reader over `package/dist/subpaths/easing.js` mapping the 22 keys against those exports → **`analytic_survivors=8 drift=14`** — **the banked 14/22 reproduced at the published bytes for the first time.** All 14 resolve through `easing(name)` (each returning a `Result` ok against `bezierPresets`' 30 keys), so the re-point is **executable**; what it is not is **this seat's to accept**. The `as EasingFn` EXECUTION LOCK is live exactly where banked: ⟨cmd⟩ `sed -n '58p' web/src/lib/easings.ts` → `{ label, fn: timingFunctions[name as keyof typeof timingFunctions] as EasingFn },`.

**ESC-4 is therefore not a feasibility blocker; it is an AUTHORITY blocker** — the limb is authorable the hour it is ruled, and ruling it is the owner's act. **Accepting 14 silent semantic substitutions on the owner's behalf is precisely what "never presumed" forbids**, and the drift is the kind a typecheck cannot see (G12's own born-RED).

**Limb 2's ESC-7 leg, stated as the option set the ruling needs and nothing more.** 21 `<Button variant="outline">` attributes over 14 files (grep of record, comment-stripped, `Button`-attributed) meet a `ButtonEmphasis` of four closed values none of which is `outline`. The lawful dispositions the corpus already names are: **re-select per site** from `{primary, secondary, quiet, text}` (± `tone`), **retire the register** to one chosen emphasis, or **ask the producer for a successor on NWO-1** (§2·R2d's own third arm; NWO-1 is authored and rowed at `70a87e7e` and could carry it). **This seat states the set; it chooses nothing.** The register's raw figure also reproduces unchanged for the owner's reference — ⟨cmd⟩ `grep -rn 'variant="outline"' web/src \| wc -l` → **30**, `-l` → **16** (double-run) — with unit `c`'s **21/14** the live Button surface beneath it, the difference being 7 comment-resident mentions ⊕ 2 `<Badge variant="outline">` sites.

---

#### Act 4 — the pre-cut gate readings, banked as the honest BEFORE

The Cadence requires `vue-tsc -b --force` and `npm run build` **before the cut**. **There is no cut, so these are banked as the BEFORE the successor seat inherits**, not as a green stamp.

- **G11 / vue-tsc** — ⟨cmd⟩ (cwd `web/`) `npx vue-tsc -b --force` → **exit 1 · 20 diagnostics**, double-run identical, and **by code**: ⟨cmd⟩ `grep -o "error TS[0-9]*" … \| sort \| uniq -c` → **17 `TS6133` · 1 `TS6196` · 1 `TS2882` · 1 `TS2769`**. **This reproduces §Baseline's G11 row and unit `d`'s post-commit reading EXACTLY** — the palette cure added and removed nothing, and the substrate is where F.W0 left it. The `TS2882` is `PaperView.vue(12,8)` — **limb 8's witness**; the `TS2769` is `vite.config.ts(51,21)` (`manualChunks` against vite 8's `ManualChunksFunction`) and rides WU-L's manifest pass.
- **G13 / peer graph** — ⟨cmd⟩ (cwd `web/`) `npm ls --all` → **exit 1**; `npm ls` prints extraneous `@emnapi/core` · `@emnapi/runtime` · `@emnapi/wasi-threads` · `@napi-rs/wasm-runtime` · `@tybys/wasm-util` · `embla-carousel` · `embla-carousel-vue` · `embla-carousel-reactive-utils` · `perfect-freehand`. **RED, as born.**
- **G4 / emission** — **NOT RUN, and the reason is structural rather than discretionary**: its `npm run build` (i) needs the **bumped install**, which is limb 1 and is blocked, and (ii) **writes `web/dist`**, a §1 read-only witness. Running it at the un-bumped pin would produce a sheet that answers none of G4's four greps (`size-\(--ui-glyph\)` · `\.h-3\\.5` · `rounded-pill` · `animate-collapsible`) about the target, while dirtying a witness. **It stays UNRUNNABLE-AT-OPEN, unchanged, and is stated so the successor does not read silence as a claim.**
- ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis diff --check` → clean, exit 0. ⟨cmd⟩ `git … status --porcelain` → **0**, double-run.

---

#### Act 5 — why NOTHING was landed, stated as the law that forbids each alternative

Three landings were available and **all three are defects**, which is why the correct act was to write no product byte:

1. **Land ten limbs and hold two.** §3.4's first lock: *"a partial landing is the L-18 failure"*, and **G6** fuses the bump ⊕ the prop rewrite ⊕ the `copied` triple into ONE change *"else four green e2e specs go red for the wrong cause"*. A ten-limb commit is the L-18 failure by definition.
2. **Land all twelve, leaving the 21 `outline` sites untouched.** At `17a11bc5` Button has **no `variant` prop**, and **FR-COB-2 (a)** says the `variant` limb is **SILENT** — *"no `strictTemplates` → junk DOM attr, zero diagnostic"*. The build would go green while 21 sites across 14 files silently lost their register. **That is a masking outcome, which standing law grades a HIGH defect**, and it is the exact shape *"the sweep may not proceed on the map's silence"* forbids.
3. **Pick an emphasis for `outline` and sweep.** That is a seat ruling on the owner's behalf on *"the wave's largest undecided design surface"*. **Forbidden by WU-R, by G19, and by runbook §5.7.**

The same logic holds for ESC-4: a re-point that silently accepts 14 analytic→CubicBezier substitutions typechecks clean, passes G11, and is invisible to every static gate — **it would be discovered, if ever, as motion that feels wrong**. `easings.ts:58`'s `as EasingFn` is the corpus's own warning that this class hides from the compiler.

**No `test.skip`, no allowlist, no try/catch, no producer patch, no local `node_modules` edit, no descope of a limb was considered or written.**

---

#### Gate readings, BEFORE → AFTER

| gate | BEFORE (§Baseline / predecessors) | AFTER (this unit) | receipt |
|---|---|---|---|
| **G4** emission pre-gate | **UNRUNNABLE-AT-OPEN** | **UNRUNNABLE — unchanged, stated** | Needs the bumped install (limb 1, blocked) and its command writes `web/dist`, a §1 read-only witness. Act 4 |
| **G6** atomic land-or-lose | **RED by construction** (no transaction commit) | **RED — unchanged, and honestly so** | ⟨cmd⟩ `git -C … log --oneline --all \| grep -ci "feat(fourier)"` → **0**. No transaction exists to test. The four zero-console-error specs are untouched and unfiltered |
| **G7** applied | budget GREEN at unit `c`; **not yet applied** | **NOT APPLIED** | The budget of record is consumed and re-verified (Act 3 limb 2). Its application is the rewrite, which ESC-7 blocks |
| **G8** touch-floor | **RED** | **RED — unchanged** | The floor is preserved by carrying `iconOnly` at each of the 35 migrated `size="icon"` sites; no site migrated, so nothing was preserved and nothing was dropped |
| **G9** token-family sweep *(acceptance only)* | **RED** — `--slider-scrub` **23 / 7** | **RED — unchanged; operand re-verified, execution correctly NOT performed** | The acceptance shape is F.W1's, the execution F.W3/W4's. Unit `d` recorded the four `HarmonicLevelGrid.vue:208-214` declarations surviving its `:style` deletion; **deleting them here would execute another wave's gate** |
| **G10** disclosure-deletion | **RED** (deletions unmade) | **RED — unchanged; all ten landmarks re-verified at the bytes** | Act 3 limb 5. The twin symmetry, the PRM arms and the two `overflow: hidden` exclusions (⊕ the untouched `:425`) are confirmed executable **exactly as specified**; they are a limb of the ONE commit and do not land alone |
| **G11** module resolution | **RED** — exit 1 / 20 | **RED — exit 1 / 20, byte-identical by code** | Act 4. 17 `TS6133` · 1 `TS6196` · 1 `TS2882` · 1 `TS2769`, double-run. **Zero diagnostics added, zero removed** across this unit |
| **G13** peer-graph closure | **RED** — `npm ls --all` exit 1 | **RED — unchanged** | Act 4. Extraneous set re-measured; `vaul-vue` and `@lucide/vue` still have no manifest row (limbs 6 and 7) |
| **G14** applied | floor GREEN at unit `c`; **not yet applied** | **NOT APPLIED** | `^0.11.2` read at the tag; the in-range referent is uniquely `0.11.2` (unit `b`). Application is limb 12, inside the blocked commit |
| **G19** owner rulings | **RED — ONE of SEVEN** | **RED — ONE of SEVEN, and now PRICED: two of the six open rulings gate a limb, four do not** | Acts 1–2. Falsifier run twice + a third count + widened + §0j.D read whole. **No ruling minted, none presumed, none deferred by this seat** |

**No gate moved. The unit turned none of the eight it was seated to turn, and says so rather than claiming partial credit.**

---

#### E13

The four paths ⊕ the atlas **Q** extension were swept at §Open (seat 0, 19:11) with **0 unrowed**; **I-32 and I-33 were read in full and CONSUMED by unit `b`**, whose receipt records that no status cell was flipped because the three `UNREAD` marks are **Track D's rows**, routed to X-W0.j / the X formation mail seat. **This unit mints no letter, flips no cell and appends no INBOX row** — `docs/tranches/V/coordination/INBOX.md` is **not in unit `e`'s writable set**.

**What I-32 owes this unit specifically, checked rather than assumed.** Unit `d` handed forward that I-32's **`B-4`** (*"`--viz-amber` = `oklch(0.530 0.124 69.6)` … the 3.54 is a 4.0.x figure"*) bears on **`web/src/style.css:113-127`'s D.W4.d override**, a file in **this unit's** bound at the hop. **It is received and it is carried into the escalation, not dropped**: at 8.0.0 `--viz-amber` becomes an `oklch()`, which is why the resolver unit `d` landed is what makes the hop safe — but the override's own re-ink is a **limb-adjacent token-parity act inside the blocked commit** (WU-O), so it lands with the transaction or not at all. **Nothing in I-32/I-33/I-34 is discharged or lost here.** `PD-1`/`A-10`/`G18` remain unit `f`'s and are untouched.

**0 unrowed · 0 new `I-n` · 0 new `O-n` · 0 UNREAD created in this unit's scope.**

---

#### Residuals handed forward, by name

1. **→ the OWNER, and it is the whole of this unit's return.** **ESC-4** and **ESC-7** each need a ruling or an explicit deferral with blocked rows named. **ESC-2 · ESC-3 · ESC-5 · ESC-6 still need one for G19 to go green, but none of the four gates a limb** (Act 2) — so **a two-answer round unblocks the transaction**, and a six-answer round closes G19.
2. **→ the successor `e` seat (binding, and it is the reason Act 3 exists).** **Ten of twelve limbs are measured ready at the true bytes**, with every anchor re-verified and every drift recorded. **No anchor in the twelve-limb roster has drifted** — the G10 twins, the `copied` triple, the `D·D-M11` inline svg, `ExportModal.vue:87`, `VisualizationView.vue:366` and `easings.ts:58` all reproduce to the line. The successor re-runs, but inherits no archaeology.
3. **→ the successor `e` seat: limb 11 is a RULED KILL, not an omission.** **GCM-22 flipped to SUPERSEDED at the ruled 8.0.0**, measured at `dialog/styles.css:20` ⊕ `:25-26` — the padding authority is inside `:where()` at specificity (0,0,0) and the consumer's `p-0` (0,1,0) genuinely outranks it. **`GalleryCardModal.vue:73` must NOT be edited**, and the transaction's commit body should say so, since §4 step 4 lists the limb and a silent no-op reads as a dropped limb.
4. **→ the successor `e` seat: the three unit-`c` BINDING residuals are consumed and re-verified.** The breaking `size=` set is **`icon` (35) ⊕ `default` (6) = 41** and the attribute operand is **129**; **`DockIconButton` (19 callsites / 2 files) and `DockDropdownTrigger` (1/1) are DELETED** at `17a11bc5` behind a surviving `./dock` — invisible to every import-shaped probe; the **three consumer re-targets R1 · R2 · R3** (9 sites / 6 files) land **inside commit #4** as the G5 LANDING CELL requires. **None of these is a thirteenth limb.**
5. **→ unit `f` / G19.** This unit's Act-2 pricing is a **sharpening, never a ruling** — it says which questions gate execution, not what their answers are. If the owner rules only ESC-4 and ESC-7, **G19 stays RED on four**, and the close must say so rather than reading an unblocked transaction as a green gate.
6. **→ unit `f` / the WU-F ledger and the edge-9 checkpoint set.** **ESC-3's consequence is visual and arrives with the hop whether or not it is ruled**: six `SelectTrigger` callsites across five files gain `glass-control-edge` ⊕ `glass-capsule-hover` at 8.0.0, and **zero of them pass a prop that could opt out**. That is a before/after screenshot row, and `U-2`'s `R1-DU` MAJOR-on-permanent-blur dissent revives at any uplift with its BANK trigger `grep "contain: paint"` on the installed `dock/shell.css`.
7. **→ unit `f` / the close.** The `link` arm is a **second unmapped value inside limb 2, smaller than `outline` and not covered by ESC-7's text**: 1 site, and the G7 evidence's own cell calls `emphasis="text"` *"nearest; **not** a banked mapping — flagged"*. **It should ride ESC-7's ruling** rather than be swept on a "nearest" reading; naming it here is the whole of what this seat can do.
8. **→ the close.** **`F-W1-LOG.md` was deliberately NOT created**, for unit `c`'s stated reason (it would seat a partial log), and with this unit's own added: there is no transaction to log.

---

#### Escalation RETURNED by this unit

**ESC-4 and ESC-7 — TWO owner rulings, UNRULED and UNDEFERRED, which BLOCK the atomic transaction at limbs 1 and 2. ESC-2 · ESC-3 · ESC-5 · ESC-6 remain open for G19 but block no limb.**

- **ESC-7** — `variant="outline"` has **NO successor** in `ButtonEmphasis = "primary" | "secondary" | "quiet" | "text"`, `ButtonTone = "neutral" | "destructive"` or `ButtonSize` at `17a11bc5`. **Blocked rows**: the **21 occurrences / 14 files** of the grep of record (register figure **30 / 16**) · AA-2's sweep · G7's application · `fr-BasisSelector M-1` · **G6's atomicity** — an unruled arm inside a land-or-lose transaction is an unbounded limb. **⊕ the `link` site (1), unmapped and not covered by ESC-7's own text.**
- **ESC-4** — value 4.0.0 deletes `timingFunctions` and ships no `"."` export; **14 of the 22 `EASING_LABELS` keys have no analytic survivor at `./easing`** and become CubicBezier approximations (measured at the published bytes this seat unpacked: `analytic_survivors=8 drift=14`). **Blocked rows**: `L/B-1` · `MPC-5/RD-5` · the six bare-root value.js import lines across five files · **limb 1's lockstep half**, and with it the whole transaction (MPC-14: no member lands alone). The drift is **typecheck-invisible** — `easings.ts:58`'s `as EasingFn` is the corpus's own warning — so no gate in this wave can catch a wrong acceptance.

**A seat may not defer on the owner's behalf, and may not rule on it.** The deferral G19 accepts is an *explicit* one; naming the blocked rows, pricing which questions actually gate execution, and measuring every other limb to readiness is the whole of what this seat can supply — and it has supplied it.

**Self-count**: this `### e` block is **not** counted in any figure above; every published count is of the settled product bytes at fourier `3bac3d5`, of the read-only producer tree at `17a11bc5`, or of the registry artifact at its version, each double-run.

---

## Close

**SERVED MODEL: claude-opus-5[1m]** — the **VERIFY-ONLY CLOSE SEAT**, Track C. This seat authored
none of units `a`–`e`'s bytes. **It cured nothing**: no product byte was written, no gate was
green-stamped from another seat's reading, and every verdict below was re-measured at this seat's
own clock with each load-bearing figure double-run.
**Clock**: 2026-09-17, following unit `e`'s landing at `8a3c2f8e`.
**Writable set honoured**: `docs/tranches/X/execution/C/F-W1.md` (this Close) ·
`docs/tranches/X/execution/LEDGER.md` (Track C row cell + one appended line) ·
`docs/tranches/V/coordination/INBOX.md` (**append-only**, one dated sweep line). **No other path
written.** fourier-analysis · glass-ui · latex-paper · pencil-boil and the npm registry were
**READ-ONLY** throughout. `scripts/dev/dev.sh` untouched and unstaged;
`docs/tranches/V/reformation/CARRY-LEDGER.md` left dirty-as-found and unstaged. Pathspec commits
only. No `git stash`, no `reset`, no force-push.

### Act 1 — every unit's commits exist, and every path set is inside its unit's writable bound

⟨cmd⟩ `git log -1 --format='%h %ad %s'` per hash, and ⟨cmd⟩ `git show --stat --format=""` per hash.

| unit | commit | paths touched | inside its writable set? |
|---|---|---|---|
| `a` | **`c05fc57e`** 19:31 | `docs/tranches/X/fourier/waves/F-W1.md` — **103 insertions, 0 deletions** | **YES** (dated addendum-beside only) |
| `a` | **`59bd88b9`** 19:34 | `docs/tranches/X/execution/C/F-W1.md` — 78 ins | **YES** |
| `b` | **`70a87e7e`** 19:49 | `docs/tranches/V/coordination/INBOX.md` (5 ins, append) ⊕ the three `X/coordination/` letters (323 · 161 · 138 ins) | **YES** |
| `c` | **`2a84bd5a`** 22:03 | the five `docs/tranches/X/fourier/evidence/w1/*.md` — **1,098 insertions, 0 deletions** | **YES** |
| `c` | **`dcc266f2`** 22:07 | `docs/tranches/X/execution/C/F-W1.md` — 399 ins | **YES** |
| `d` | **`3bac3d5`** (fourier) | `web/src/lib/colors.ts` · `…/visualization/lib/basis-display.ts` · `web/src/main.ts` · `…/morph/HarmonicLevelGrid.vue` — 4 files, **+169 / −68** | **YES** — and `EditorControlsDock.vue`, which its bound permits, is **byte-untouched** (Act 6 of that unit) |
| `d` | **`473a8098`** 22:30 | `docs/tranches/X/execution/C/F-W1.md` — 147 ins | **YES** |
| `e` | **`8a3c2f8e`** 22:41 | `docs/tranches/X/execution/C/F-W1.md` — 157 ins | **YES** — **ZERO product bytes**, as its own receipt claims |

**`scripts/dev/dev.sh` was staged in NONE of the eight** — ⟨cmd⟩
`git show --name-only --format="" <h> | grep -c "dev.sh"` → **0 · 0 · 0 · 0 · 0 · 0 · 0** across
the seven value.js commits, and the fourier commit's four paths are all under `web/src`.

**E-3 form proved at the diff, not inherited.** ⟨cmd⟩ `git show --numstat --format="" c05fc57e` →
`103	0` — **zero deletions on the dated spec**. ⟨cmd⟩ `sed -n '161p;227p;276p;294p' F-W1.md` re-read
at this seat reproduces unit `a`'s four pinned coordinates **byte-for-byte**: `:161`
`| **L/B-1 + C/B-1** (BLOCKER-fold) | value 4.0.0 has no …` · `:227`
`| **ESC-4** | Easing semantic drift acceptance (14/22 analytic→CubicBe` · `:276`
`4. **The atomic transaction (ONE change, G6):** producer bump (glass +` · `:294`
`1. **F.W0 → F.W1 (HARD predecessor).** G2 · G3 · MISS-LC2 · FR-AH-33 ·`. **No row was inserted
above `:294`; no sibling's pinned coordinate re-keyed.**

**LANDED WRONG: none.** No commit touched a path outside its unit's declared writable set, no
commit split a family the spec declares unsplittable, and no dated artefact was rewritten.

### Act 2 — all twenty gates re-run at this seat's own clock, against §3's own GREEN definitions

**Nothing below is inherited.** Where a unit published a figure, this seat re-derived it with its
own instrument rather than re-reading the unit's.

| gate | BEFORE (§Baseline, at open) | **AFTER — this seat's own reading** | receipt run here |
|---|---|---|---|
| **G1** RE-PIN | **RED** — `grep -c "17a11bc5" F-W1.md` → **0** | **GREEN** | same command → **18**, **18** (double-run). Pin re-verified at the producer's bytes: ⟨cmd⟩ (cwd `../glass-ui`) `git tag --points-at 17a11bc5` → `v8.0.0` · `git rev-parse --short=8 'v8.0.0^{commit}'` → `17a11bc5`. **Tag and hash are each other's inverse at this seat too** |
| **G2** corrupt-dist *(F.W0's; F.W1 owes the RECORDING)* | **RED at the installed pin · ABSENT at the adopted pin** | **RED at the installed pin — unchanged; the RECORDING obligation is DISCHARGED** | ⟨cmd⟩ `wc -c < web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` → **13949** · `grep -c "@source"` → **3** · installed `"version": "4.0.0"`. Recorded at `F-W1.md` §8.3. The red is cured BY the transaction, which did not run |
| **G3** substrate settle *(F.W0's)* | **GREEN** ⚠ green-before-cure, by predecessor | **GREEN — held** | ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain \| wc -l` → **0**, **0** (double-run), *after* unit `d`'s product commit. Declared under R.2, never quietly enjoyed |
| **G4** emission pre-gate | **UNRUNNABLE-AT-OPEN** | **UNRUNNABLE — unchanged** | Its `npm run build` (i) needs the bumped install, which is limb 1 and is blocked, and (ii) **writes `web/dist`**, a §1 read-only witness. This seat did not run it and did not dirty the witness |
| **G5** P0 CSS-class census | **RED** — no census exists | **GREEN** | The census is landed at `evidence/w1/G5-CSS-CLASS-CENSUS.md` (**323 L / 25,617 B**, self-count reproduced here). Its four operands re-measured at this seat: `paper-texture` **1** · `text-admin-label` **7 / 4** · `cartoon-card` **24 / 14** raw — each reproducing §Baseline. AA-15's cure/break collision is reconciled **in writing** inside the gate, as §3 G5 requires |
| **G6** atomic land-or-lose | **RED by construction** | **RED — unchanged** | ⟨cmd⟩ (cwd fourier) `git log --oneline --all \| grep -ci "feat(fourier)"` → **0**. **No transaction exists to test**, and the four zero-console-error e2e specs are untouched and unfiltered |
| **G7** Button budget | **RED** — six banked figures disagreeing, no grep of record | **GREEN — and its instrument INDEPENDENTLY REPRODUCED at this seat** | This seat wrote its **own** comment-stripper (blanking `<!-- -->`, `/* */` and line-initial/post-punctuation `//`, line numbers preserved) over `web/src` and measured **130 files scanned · 106 comment-stripped `variant=` occurrences** — **exactly** unit `c`'s closure figure (`106 attributed = 106 unattributed, residue 0`). The same instrument reproduces **ESC-7's grep-of-record operand**: **23** stripped `variant="outline"` over **15** files, minus the **2** `<Badge variant="outline">` sites → **21 / 14**, unit `c`'s published figure to the digit, against the register's raw **30 / 16** (re-measured here). **The two Badge coordinates are the ELEMENT OPEN-TAG lines** (`GalleryCard.vue:115` · `GalleryCardModal.vue:129`, verified by `sed`) — the attribution unit the evidence declares, not an off-by-three |
| **G8** touch-floor | **RED** | **RED — unchanged** | ⟨cmd⟩ `grep -rn 'data-size="icon"' web/node_modules/@mkbabb/glass-ui/dist/styles/` → `utilities/a11y-overrides.css:116` (the §Baseline coordinate, its directory now spelled in full) · ⟨cmd⟩ `grep -rl 'data-control-target' …/dist \| wc -l` → **0**. No site migrated, so the 44px floor was neither preserved nor dropped |
| **G9** token-family sweep *(acceptance only; execution F.W3/W4)* | **RED** — 23 / 7 | **RED — unchanged, operand reproduced** | ⟨cmd⟩ `grep -rn -- "--slider-scrub" web/src \| wc -l` → **23**, `-l` → **7**, double-run. Correctly NOT executed here: executing it would run another wave's gate |
| **G10** disclosure-deletion | **RED** — deletions unmade | **RED — unchanged; all ten landmarks reproduce at this seat** | ⟨cmd⟩ `grep -n 'overflow: hidden\|animation:\|prefers-reduced-motion'` per twin → `CollapsibleSection.vue` `:55` · `:61 :64 :69` · `:66`; `ContourSettings.vue` `:362` **and `:425`** · `:365 :368 :373` · `:370`. **Identical to §Baseline and to the round-4 re-measurement.** The R4-4.1 over-correction has not crept back |
| **G11** module resolution | **RED** — exit 1 / 20 | **RED — exit 1 / 20, byte-identical** | ⟨cmd⟩ (cwd `web/`) `npx vue-tsc -b --force` → exit **1**; `grep -o "error TS[0-9]*" \| sort \| uniq -c` → **17 `TS6133` · 1 `TS6196` · 1 `TS2882` · 1 `TS2769`**. Run twice; ⟨cmd⟩ `diff run1 run2` → **EMPTY**. Unit `d`'s product commit added and removed **zero** diagnostics |
| **G12** easing re-point by execution | **RED · probe UNRUNNABLE-AT-OPEN** | **RED · probe UNRUNNABLE — unchanged** | The witness is post-uplift execution (`play()` resolves, `phase` returns to `"idle"`). There is no uplift. The `as EasingFn` hazard at `easings.ts:58` stands unmoved |
| **G13** peer-graph closure | **RED** | **RED — unchanged** | ⟨cmd⟩ (cwd `web/`) `npm ls --all` → **exit 1**; `npm ls` prints **9** extraneous (`@emnapi/core` · `@emnapi/runtime` · `@emnapi/wasi-threads` · `@napi-rs/wasm-runtime` · `@tybys/wasm-util` · `embla-carousel` · `embla-carousel-vue` · `embla-carousel-reactive-utils` · `perfect-freehand`). ⟨cmd⟩ `grep -n "lucide\|vaul-vue" package.json` → **one hit**, `:35 "lucide-vue-next"` — **`@lucide/vue` and `vaul-vue` still have no row** (limbs 6 and 7) |
| **G14** pencil-boil floor | **RED** | **GREEN on the gate's own condition; the APPLICATION is not landed** | The condition is *"read the optional-peer range at the ADOPTED tag; correct the three drifted registry rows"*. Read here: ⟨cmd⟩ (cwd `../glass-ui`) `git show 17a11bc5:package.json \| grep -n "pencil-boil"` → `:513 "@mkbabb/pencil-boil": "^0.11.2"` (optional peer) ⊕ `:540 "0.11.2"` (devDep). The three rows are corrected as **dated rows D1–D3 ⊕ D4** at `evidence/w1/G14-PENCIL-BOIL-FLOOR.md`. **The manifest bump is limb 12 and did not land** — ⟨cmd⟩ `grep -n "pencil-boil" web/package.json` → `:17 "^0.4.1"` |
| **G15** non-credit discharge | **RED, all three legs** | **(b) GREEN · (c) GREEN · (a) RED ⇒ the gate is RED** | **(b)**: ⟨cmd⟩ `ls docs/tranches/X/coordination/ \| grep -c nwo` → **3**; on NWO-1 ⟨cmd⟩ `grep -c 'FR-GIG-5'` → **5**, the three preserved BLOCKER dissents at `:164-166`, the non-credit **stated in terms** at `:174`, and the INBOX row **O-23** appended at `:109`. **(c)**: ⟨cmd⟩ `git show 17a11bc5:package.json \| grep -c '"\./pagination":'` → **0** — absent at the adopted map, so no cure *can* be planned around it. **(a) is a CONJUNCTION — *"the close report **and** the transaction's commit body each state"*. This Close states it (below); the commit body does not exist. The leg is STRUCTURALLY unsatisfiable while the transaction is blocked, and this seat does not stamp half a conjunction** |
| **G16** latex-paper sufficiency | **RED — first arm measured UNEXECUTABLE in bounds** | **GREEN on the second arm — seated explicitly, owner named** | ⟨cmd⟩ `grep -c "hsl(var(" web/node_modules/@mkbabb/latex-paper/src/vue/theme.css` → **42**; ⟨cmd⟩ `grep -rn "hsl(var(" web/src \| wc -l` → **0**. The 42 are **producer bytes inside `node_modules`** — rewriting them in place is the HIGH defect standing law forbids. The disjunction therefore resolves to its second arm, and **NWO-5 seats it with its owner named at its own header**: ⟨cmd⟩ `grep -n -i 'latex-paper' …nwo5….md` → `:6 **To**: the **latex-paper** producer`. Recorded here; **delivery is the residual below**, not the seating |
| **G17** cartoon-card order | **RED** — ruling gate, product is written prose in a close report | **RED — the ordering prose is NOT WRITTEN** | The gate's product is *"the written ordering in F.W1's close report"*, and the spec seats it at unit **`f`**, the wave's **only design seat (fable)**. **Unit `f` did not run.** This seat is VERIFY-ONLY and **may not author a design ruling it was not seated to make**. What IS recorded: unit `c`'s measurement that `.cartoon-card` is **not an uplift break** (already absent at the installed pin; the local shim survives because `cartoon-surface` does), which re-frames G17 as a **design** ordering rather than a break ordering — and leaves `KILL-6` untouched. **Named as an unpaid debt, not swept** |
| **G18** binding-verification probe | **RED · probe UNRUNNABLE-AT-OPEN** | **RED · probe UNRUNNABLE — unchanged** | The witness is a real post-uplift drag firing `anim.startScrub()`. There is no uplift. **I-32's `A-10` answer was read by unit `b` and its disposition against PD-1's disjunction was deliberately NOT pre-consumed** — the required statement (*discharges · narrows · leaves*) is unit `f`'s and is **unmade**. It rides forward |
| **G19** owner rulings recorded | **RED — ONE of SEVEN** | **RED — ONE of SEVEN, unchanged** | Falsifier re-run at this seat, **twice, two forms**: ⟨cmd⟩ (cwd `docs/tranches/X/`) `grep -n "ESC-2\|ESC-3\|ESC-4\|ESC-5\|ESC-6\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → **no output, exit 1**; ⟨cmd⟩ `grep -c …` same operands → `COHESION.md:0` · `EXECUTION-RUNBOOK.md:0`, **exit 1**. **ESC-1 alone is ruled** (§0i.3). **Six carry no ruling and no explicit deferral** |
| **G20** closure, both sources | **RED** — the run is the close seat's, and must not be this file's author | **RED — NOT RUN; both operands verified intact** | Leg (b)'s frozen operand re-verified at this seat: ⟨cmd⟩ `shasum -a 256 CENSUS-CANONICAL.md \| cut -c1-12` → **`f44362757458`**, **`f44362757458`** (double-run) — the pinned digest, unmoved. Leg (a)'s operand present: `carry/F-W1-CARRY.md`. **The two set-differences themselves are unit `f`'s act and were not performed.** This seat did not author `F-W1.md`, so it *could* have run them — it did not, because the wave is BLOCKED short of its own transaction and a closure claim over an unexecuted roster is a claim about nothing. **Named as the largest unpaid debt of the wave** |

**Tally at the close — 20 gates: 6 GREEN (G1 · G3 · G5 · G7 · G14 · G16) · 14 RED, of which 3 are
UNRUNNABLE by construction (G4 · G12 · G18) and 2 more are structurally blocked by the missing
transaction (G6 · G15(a)).** The wave **moved five gates** off born-RED (G1 · G5 · G7 · G14 · G16)
and inherited one green-before-cure (G3, by predecessor).

### Act 3 — §4 Cadence's evidence list, run as written

The spec declares **no `§Verification Artefacts` heading**; its verification instrument is **§4
Cadence**, which names `npx vue-tsc -b --force`, `npm run build` at G4 and post-cut,
`git diff --check` every commit, an evidence roster under `evidence/w1/`, and `F-W1-LOG.md`.

| cadence item | run here | reading |
|---|---|---|
| `npx vue-tsc -b --force` | **YES, twice** | exit 1 · 20 diagnostics · `diff run1 run2` EMPTY |
| `npm run build` (G4) | **NO — lawfully** | needs the bumped install (blocked limb 1); its command writes `web/dist`, a §1 read-only witness |
| `git diff --check` | **YES, both repos** | clean, exit 0 |
| `evidence/w1/` roster | **5 of the named artefacts landed** | `G7-BUTTON-BUDGET.md` **220 L / 15,402 B** · `M7-PROP-LEVEL-DIFF.md` **282 / 20,577** · `G5-CSS-CLASS-CENSUS.md` **323 / 25,617** · `G14-PENCIL-BOIL-FLOOR.md` **123 / 9,353** · `K1-RE-RESOLUTION.md` **150 / 8,748** — self-counts reproduced at this seat, double-run; `head -1` of each is its own `SERVED MODEL:` line. **Absent and owed: the G4 emitted-CSS grep · the G6 `git show --stat` + four e2e runs · the G10 witness · the G12 transcript · the G13 `npm ls`/`npm ci --omit=dev` outputs · the G18 assertion · the WU-F / edge-9 screenshot rows** — every one of them a post-transaction artefact |
| `F-W1-LOG.md` | **NOT created** | units `c` and `e` each disclosed the decision with its reason (a partial log would have to be reconciled; there is no transaction to log). **Carried forward, not dropped** |

### Act 4 — E13, the close sweep at this seat's own clock

The four paths ⊕ the atlas **Q**-lane extension re-swept **read-only**, classification taken from
each row's **status cell**, never from a bare `grep -i unread`. **Delta test** ⟨cmd⟩
`/usr/bin/find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-17 19:11'` (19:11 = the F.W1 open
sweep) per path → (1) `docs/tranches/V/` **∅**; `V/coordination/` → **`INBOX.md` itself only**
(SELF-COUNT law) · (2) `../glass-ui/docs/tranches/BK/coordination/` **∅** · (3)
`../keyframes.js/docs/tranches/V/coordination/` **∅** · (4)
`../sci-report/atlas/docs/tranches/P/coordination/` **∅** · (Q) **∅**.

**BK re-confirmed the newest glass tranche dir** ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -3`
→ `BK` · `BJ` (08-03) · `BI` (07-28). **BK's directory mtime moved 17:52 → 20:15 and this seat
chased it rather than passing over it**: ⟨cmd⟩ `find ../glass-ui/docs/tranches/BK -newermt '2026-09-17 19:11' -type f -name '*.md'` → **seven files, ALL under `BK/execution/2026-09-17-o20-cure/*/RECORD.md`** — glass's own execution records for its O-20 cure, **not mail, not addressed here**. `BK/coordination/` itself has **no file newer than 17:43**. **0 unrowed · 0 new `I-n` minted · 0 new `O-n`.**

**UNREAD mail in scope — stated plainly rather than finessed.** ⟨cmd⟩
`sed -n '105p;106p;107p' INBOX.md | grep -o 'UNREAD [0-9-]*'` → **`UNREAD 2026-09-17` ×3**.
**I-32 · I-33 · I-34 still carry that mark.** Their *material* F.W1 content **is** consumed:
unit `b` read I-32 and I-33 **in full** before authoring NWO-1, struck every producer-disposed item
from the roster, and recorded the consumption as a dated paragraph at `INBOX.md`'s foot; unit `e`
received I-32's `B-4` and carried it into the escalation rather than dropping it; I-34 names no
F.W1 surface (its `./search` clause is value.js's, budgeted at X-EXT-1). **The durable status cells
are Track D's rows**, minted by X.P.W2 seat 0 and routed to X-W0.j / the X formation mail seat — no
F.W1 seat, this one included, may flip them.

**How this seat discharges *"no wave closes with UNREAD mail in scope"*: it does not close the
wave.** The Track C row moves to **BLOCKED-ON**, not CLOSED. The law binds a close; this is a hold.
The three rows are named here so that whoever resumes F.W1 meets them at the first line.

### Act 5 — G15's non-credit, stated in terms (leg (a)'s close-report half)

*The F.W1 tri-package uplift is **NOT** credited with curing the whole-collection pagination drain.*
`FR-GIG-1`'s drain is an **observer-root geometry** defect in the producer's
`useInfiniteScroll.ts`; it **survives the hop** to `v8.0.0 @ 17a11bc5` unchanged, and no limb of the
twelve-limb transaction touches it. `FR-GIG-5` is the non-credit lock, and it leaves on **NWO-1**
with its **three preserved BLOCKER dissents** — the L axis, the C axis, and reader-B — intact and
un-narrowed. **`AA-11` holds**: no cure anywhere in this wave is planned around `./pagination`,
which is absent from **both** export maps (0 at the installed 4.0.0 and 0 at `17a11bc5`).

**This discharges only the close-report half of leg (a).** The other half — *"and the transaction's
commit body"* — has no commit to carry it. **G15 stays RED**, and the successor `e` seat inherits
the obligation to put this paragraph's substance in the `feat(fourier)!:` body when it lands.

### Act 6 — the four-verb line: it does **not** move, and that is a reading, not an omission

§State's own basis cells govern: **IMPLEMENTED** *"stamps at G1–G20 green + close report"* —
**14 of 20 are RED**, so it stays **NO**. **VERIFIED** *"stamps at X·F sub-tranche close, never
here"* — it stays **NO**, and no seat of this wave may move it. **AUDITED** and **SPECIFIED** are
unchanged at YES. **This seat wrote no byte into `F-W1.md`**: the spec's `Status: planned` cell and
its four-verb table are untouched, the wave's execution state of record being
`execution/LEDGER.md`'s Track C row, which this seat moves to **BLOCKED-ON**.

### Commit roster — the whole wave

**value.js** (`tranche-u`): `c05fc57e` · `59bd88b9` (`a`) · `70a87e7e` (`b`) · `2a84bd5a` ·
`dcc266f2` (`c`) · `473a8098` (`d`) · `8a3c2f8e` (`e`) · **this Close**.
**fourier-analysis** (`m/w1-bump-migration`): **`3bac3d5`** (`d` — the severable palette cure, the
wave's **only** product commit).
**Not landed: the `feat(fourier)!:` atomic transaction (commit #4) and the F.W1 close-report commit
plan step 5's witnesses.**

### Residuals handed forward, each with a named owner

1. **→ THE OWNER — the whole of why this wave is held. `ESC-4` and `ESC-7`** need a ruling or an
   **explicit deferral with blocked rows named**; each gates a limb of the atomic transaction.
   **`ESC-2` · `ESC-3` · `ESC-5` · `ESC-6`** need one for **G19** to go green but gate no limb.
   **A two-answer round unblocks the transaction; a six-answer round closes G19.** Re-measured
   here: ESC-7's live Button surface is **21 occurrences / 14 files** under the grep of record
   (register figure **30 / 16**), plus the **1 unmapped `link` site** unit `e` named, which is not
   covered by ESC-7's own text and should ride its ruling.
2. **→ unit `f` (unrun) / the successor design seat — `G17`'s ordering ruling is UNWRITTEN.** It is
   **independently runnable**: it needs no transaction, only the FR-EQC-3-retire ⟷ AA-4-adopt
   ordering as prose F.W3/F.W4 can execute against. Unit `c`'s finding narrows it to a *design*
   ordering. **This is an unpaid debt of the wave, not a blocked one.**
3. **→ unit `f` (unrun) — `G20`'s two set-differences are NOT RUN.** Both operands are verified
   intact at this seat (`f44362757458`; `carry/F-W1-CARRY.md`). Like G17, **it is independently
   runnable** and was not run. **The second unpaid debt.**
4. **→ the X formation mail seat — the three relay packets are AUTHORED and ROWED, NOT DELIVERED.**
   `../glass-ui/**` is READ-ONLY always, and the latex-paper and pencil-boil trees sit outside every
   F.W1 writable set, so the hop into each producer's coordination dir is that seat's act.
   **G16's seating and G15 (b) both depend on the hop for effect, not for their grade.**
5. **→ Track D / the mail seat — `I-32` · `I-33` · `I-34` remain `UNREAD 2026-09-17`.** Materially
   consumed (unit `b`, in full, recorded); the durable marks are not F.W1's to flip.
6. **→ the successor `e` seat (binding, and the reason unit `e`'s Act 3 exists).** **Ten of twelve
   limbs are measured ready at their true bytes, with no anchor drifted.** Consumed and re-verified:
   the breaking `size=` set is **`icon` (35) ⊕ `default` (6) = 41** and the attribute operand is
   **129**; **`DockIconButton` (19 callsites / 2 files) and `DockDropdownTrigger` (1 / 1) are
   DELETED behind a SURVIVING `./dock`** — invisible to every import-shaped probe; the three
   consumer re-targets **R1 · R2 · R3** (9 sites / 6 files) land **inside commit #4**, never as a
   thirteenth limb; **limb 11 is a RULED KILL** (GCM-22 SUPERSEDED at 8.0.0 — `GalleryCardModal.vue:73`
   must NOT be edited, and the commit body must say so, since a silent no-op reads as a dropped
   limb); the `^0.11.2` in-range set is **uniquely `{0.11.2}`**.
7. **→ unit `d`'s widening question (an ESCALATION unit `d` returned and this seat re-states rather
   than absorbs).** Three WU-E limbs have their ONLY repair site outside every F.W1 bound:
   **`fr-BasisCanvas C-4`** (`BasisCanvas.vue` — every draw runs inside a `watch` callback, which
   tracks nothing), **`m-9`** (`DarkModeToggle.vue:30,31,49,50,53,54`), **`M-α5`**
   (`canvas-drawing/epicycles.ts:289`). **The right disposition is a bound, not a revert** — commit
   #3 is severable and stands.
8. **→ F.W3 / F.W4.** `G9`'s 23 declarations / 7 files (acceptance-only here); FM-2's token column
   (**5 `var(--ring)` sites / 4 files** lose their register silently — one edit to
   `--focus-ring-color`); **R2's successor rung `text-mono-micro uppercase font-medium` is binding
   on F.W4's AA-15**; `GM-19`'s new layered-`!important` route at 8.0.0.
9. **→ F.W9 / F.W10.** The cross-edge-9 visual-regression checkpoint set is **UNMINTED** (unit `f`).
   Unit `e` named one row that arrives with the hop whether or not ESC-3 is ruled: **six
   `SelectTrigger` callsites across five files gain `glass-control-edge` ⊕ `glass-capsule-hover` at
   8.0.0, and zero of them pass a prop that could opt out.**
10. **→ the close of X·F.** `F-W1-LOG.md` was deliberately not created, twice disclosed with reason.

### Escalations returned by the wave

**SIX owner rulings — `ESC-2` … `ESC-7` — UNRULED and UNDEFERRED**, flagged INLINE at `F-W1.md`
§8.6 by unit `a` and re-priced by unit `e`. **Two of the six (`ESC-4`, `ESC-7`) BLOCK the atomic
transaction at limbs 1 and 2.** Unit `e` measured, and this seat confirms, that all three
alternatives to holding are defects: a ten-limb landing is the **L-18 partial-landing failure**
(§3.4's first lock); a twelve-limb landing that leaves the `outline` sites untouched goes **green
while 21 sites silently lose their register** (Button has no `variant` prop at `17a11bc5` and
FR-COB-2 (a) says the limb is SILENT) — **a masking outcome, which standing law grades a HIGH
defect**; and picking an emphasis is a seat ruling on the owner's behalf on *"the wave's largest
undecided design surface"*. **No `test.skip`, no allowlist, no try/catch around a defect, no
producer patch, no `node_modules` edit, no descoped limb was written anywhere in this wave**, and
this seat re-read all eight commits to confirm it.

**A seat may not defer on the owner's behalf.** The deferral G19 accepts is an **explicit** one.

### Verdict

**BLOCKED** — held, not closed. **Five gates moved off born-RED** (G1 · G5 · G7 · G14 · G16), one
product commit landed and is **severable and correct standing alone** (`3bac3d5`), three relay
packets are authored and rowed, and **ten of the twelve transaction limbs are measured ready at
their true bytes**. The wave stops one ruling-round short of its own centre. **The unpaid debts
that are NOT blocked are G17's ordering ruling and G20's closure run** — both belong to the unrun
unit `f` and both are runnable today.

---

## RE-OPEN 2026-09-18 — the ESC docket is RULED at COHESION §0o; units `e` and `f` are re-dispatched

**SERVED MODEL: claude-opus-5[1m]** — seat 0 (RE-OPEN), Track C. This seat **cured nothing and
wrote no product byte**: it re-verified the preconditions, swept E13, re-ran the wave's own gates
READ-ONLY at its own clock, and re-planned the two units the wave still owes.
**Clock**: 2026-09-18. **Writable set honoured**: this record (**appended only** — E-3; no dated
cell above is rewritten) · `docs/tranches/X/execution/LEDGER.md` (Track C row's status cell +
one appended event-log line). **No other path written.** fourier-analysis · glass-ui ·
latex-paper · pencil-boil and the npm registry were **READ-ONLY** throughout.
`scripts/dev/dev.sh` untouched and unstaged. Pathspec commit only. No `git stash`, no `reset`,
no force-push.

### Why this section exists, and what it does NOT do

The `## Close` above holds this wave at **BLOCKED-ON**, and names the reason exactly: *"SIX owner
rulings — `ESC-2` … `ESC-7` — UNRULED and UNDEFERRED … Two of the six (`ESC-4`, `ESC-7`) BLOCK the
atomic transaction at limbs 1 and 2."* **That condition is now discharged**, at
`docs/tranches/X/COHESION.md` **§0o** (2026-09-18) — *"G19's condition — 'ESC-1..ESC-7 each carry a
ruling or an explicit deferral with blocked rows named' — is met by this addendum; ESC-1 stays as
ruled at §0i.3."*

This section is a **dated addendum-beside**. Units `a` · `b` · `c` · `d` LANDED and are **never
re-dispatched**; their receipts, the `## Baseline` table and the `## Close` above are IMMUTABLE and
are not edited by one byte. What is added: the re-verified preconditions, this seat's own E13
sweep, a **re-open baseline** read at this seat's clock, and the plan for the **two** units the
wave still owes — `e` (the atomic transaction) and `f` (witnesses + close).

### Preconditions, re-verified at the BYTES and in the LEDGER

| conjunct | ledger | bytes (this seat's own commands) | verdict |
|---|---|---|---|
| **F.W0 CLOSED** | Track C row: `CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))` | fourier `m/w1-bump-migration` HEAD `3bac3d5` (unit `d`'s cure, atop F.W0's `5842377`) | **MET** |
| **begin-word** | `COHESION.md` §0j, 2026-09-17 | §0j present at the bytes | **MET** |
| **ESC-1 ruled (G1)** | §0i.3 | ⟨cmd⟩ (cwd `../glass-ui`) `git tag --points-at 17a11bc5` → `v8.0.0` · `git rev-parse --short=8 'v8.0.0^{commit}'` → `17a11bc5` · `git show 17a11bc5:package.json \| grep -m1 '"version"'` → `    "version": "8.0.0",` | **MET** |
| **ESC-2 … ESC-7 ruled** (the condition that HELD this wave) | COHESION **§0o**, 2026-09-18 | ⟨cmd⟩ (cwd `docs/tranches/X/`) `grep -c "ESC-2\|ESC-3\|ESC-4\|ESC-5\|ESC-6\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → `COHESION.md:8` · `EXECUTION-RUNBOOK.md:0`, **exit 0** — run **twice**, identical. Per-id presence in COHESION, all seven: `ESC-1:1 ESC-2:1 ESC-3:1 ESC-4:1 ESC-5:1 ESC-6:1 ESC-7:1`. ⟨cmd⟩ `grep -n "§0o ADDENDUM" COHESION.md` → `1044:## §0o ADDENDUM 2026-09-18 — THE F.W1 DOCKET (WU-R ESC-2..ESC-7, G19) AND THE KF.W2 ESCALATION, RULED …` | **MET — the block is CLEARED** |

**The falsifier that was RED at the Close is GREEN here, and it is the same command.** The Close ran
`grep -n "ESC-2\|…\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → *"no output, exit 1"*. At this seat
the identical command returns 8 hits in `COHESION.md` and exit 0. **G19's own condition is met by
the addendum, not by this seat's reading of it** — nothing is presumed and nothing re-opened.

**The six rulings, transcribed by id so the successor units execute against them and not against a
memory of them** (authority: COHESION §0o's table; the wording is the ruling's, quoted):

- **ESC-2** (ToC model ownership) — **ONE owner**: a single `useSidebarFollow` owned by the paper
  view, provided through a **typed `InjectionKey`**; second instance + untyped `defineExpose` seam
  retired. *"Ruled at F.W1 as WU-R says; **F.W4 executes the collapse**; L-5(a) is its
  prerequisite."* Released: `fr-PaperSidebar L-4` · `M6`. **F.W1 RECORDS; it does not execute.**
- **ESC-3** (the invisible picker) — **FOLLOW THE PRODUCER.** No edgeless trigger re-created
  downstream. *"The six pickers gain an edge at the hop — a WU-F diff-review row and edge-9
  checkpoint, not a port."* Released: `U-2`. **Lands in unit `f`'s ledger, not as a product edit.**
- **ESC-4** (easing drift) — **DRIFT REFUSED — no acceptance, silent or explicit.** The 14 orphans
  are *"defined analytically inside the corpus's own `web/src/lib/easings.ts`"*, the 8 survivors
  re-point to `@mkbabb/value.js/easing`, and *"`easings.ts:58`'s `as EasingFn` cast falls with the
  `timingFunctions` lookup."* **The gate is MPC-5's sampler re-run: every one of the 22 samples
  EQUAL (Δ = 0 at every sample point) to the pre-bump 0.13.0 function under the same key.** *"RD-5
  RESTORE is thereby executed, not re-priced. No CubicBezier approximation is admitted for any
  key."* Released: `L/B-1` · `MPC-5/RD-5` · the six bare-root import lines · limb 1's lockstep half.
- **ESC-5** (B-2's regrade) — **STANDS AS PRICED.** The antecedent *"if G5 is not adopted"* is
  measured false (G5 adopted and GREEN at unit `c`). Released: `B-2`. **No revisit.**
- **ESC-6** (`color-mix` band) — **INFO.** Band = Baseline 2023 (Chromium 111 · Safari 16.2 ·
  Firefox 113); **no hand-authored fallback**; `FR-COB-26` records the band and the 1.00:1 paint.
  Released: `FR-MSP-12 → FR-COB-26`.
- **ESC-7** (the `outline` register) — **RETIRE the register; successor by rule, per-site exception
  by evidence.** Default `variant="outline"` → `emphasis="secondary"`; a site re-selects `quiet`
  **only** where its own evidence row shows a tertiary action, *"and the re-selection is written
  into AA-2's map as that site's row."* The lone `link` site → `emphasis="text"` (*"the G7
  evidence's 'nearest' reading is ADOPTED as the banked mapping by this ruling"*). **"No successor
  is requested on NWO-1"** — asking the producer to re-mint what it retired inverts
  glass-ui-first-class. *"G7 sizes the 21/14 (+2 `Badge` sites, which keep `Badge`'s own `variant`
  if the producer still ships it, else `secondary` likewise); G6's limb 2 is bounded."* Released:
  the 21 sites / 14 files (register 30/16) · AA-2's sweep · G7's application · `fr-BasisSelector
  M-1` · G6's atomicity · the `link` site.

**The `Close` §Residuals item 1 asked for a two-answer round to unblock and a six-answer round to
close G19. §0o answered six.** Both are paid.

### E13 Step-0 — the four-path sweep, at this seat's own clock

Read-only, classification taken from each row's **status cell**, never from a bare `grep -i unread`;
`INBOX.md` self-excluded (SELF-COUNT law). Delta taken against **2026-09-17 22:50**, the F.W1 Close
sweep's clock. ⟨cmd⟩ `/usr/bin/find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-17 22:50'`:

| # | path | newer than the Close sweep | classification |
|---|---|---|---|
| 1 | `docs/tranches/V/` | **∅** | — |
| 1b | `docs/tranches/V/coordination/` | `INBOX.md` (self) · `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` | **OURS — outbound**, already rowed **O-28** |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` | **OURS — outbound**, the O-26 mirror, already rowed |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | **∅** | — |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | **∅** | — |
| 4b | *(extension)* `../sci-report/atlas/docs/tranches/Q/coordination/` | **∅** | — |
| 5 | *(Track-C extension, COHESION §0k.1)* `../fourier-analysis/docs/tranches/F/coordination/` | **∅** (newest `INBOX.md`@2026-09-17 13:13) | no reciprocal to O-22/O-27 yet, consistent with their own `AWAITING RECIPROCAL` cells |

**BK re-confirmed the newest glass tranche dir** — ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -4`
→ `BK/` (Sep 17 20:15) · `BJ/` (Aug 3) · `BI/` (Jul 28) · `IOS27-MICRO/` (Jul 19).

**Result: 0 unrowed letters · 0 new `I-n` minted · 0 new `O-n` · no INBOX row added, so
`INBOX.md` is NOT in this seat's commit.** `I-32` · `I-33` · `I-34` still carry `UNREAD 2026-09-17`
and their disposition is **unchanged from the Close**: materially consumed by unit `b` (read in
full, roster struck, consumption recorded at the INBOX's foot), and their durable status cells
belong to Track D / the X formation mail seat, which no F.W1 seat may flip. **They are named here
so unit `f` meets them at its first line — no wave closes with UNREAD mail in scope, and `f` is
the seat that closes.**

### Re-open baseline — read-only at this seat's clock, double-run where load-bearing

**R.2 declaration up front.** Three greens below are **NOT this dispatch's cures** and are declared
rather than quietly enjoyed: **G3** is green **by predecessor** (F.W0's G-1 landing); **G19** is
green **by COHESION §0o's ruling**, an orchestrator act outside this wave; and **G1 · G5 · G7 ·
G14(condition) · G16** are green **by units `a`–`c`, which already landed** and are listed in this
wave's `alreadyDone`. Nothing below was moved by this seat.

| gate | reading at this seat (⟨cmd⟩ → output) | verdict |
|---|---|---|
| **G1** RE-PIN | `grep -c "17a11bc5" docs/tranches/X/fourier/waves/F-W1.md` → **18**, **18** (double-run); producer inverse re-verified above | **GREEN** (unit `a`) |
| **G2** corrupt-dist *(F.W0's; F.W1 owes the RECORDING)* | `wc -c < web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` → **13949** · `grep -c "@source" …` → **3** · installed `"version": "4.0.0"` | **RED at the installed pin — unchanged; RECORDING discharged at `F-W1.md` §8.3.** Absent at the adopted pin (§0i.5: 1,514 B) |
| **G3** substrate settle | `git -C ../fourier-analysis status --porcelain \| wc -l` → **0**, **0** | **GREEN** ⚠ green-before-cure, **by predecessor** |
| **G4** emission pre-gate | not run — needs the bumped install (limb 1) and its `npm run build` **writes `web/dist`**, a §1 read-only witness | **UNRUNNABLE-AT-REOPEN** — routed to unit `e` |
| **G5** P0 CSS-class census | `evidence/w1/G5-CSS-CLASS-CENSUS.md` present, **25,617 B** | **GREEN** (unit `c`) |
| **G6** atomic land-or-lose | (cwd fourier) `git log --oneline --all \| grep -ci "feat(fourier)"` → **0**, **0** | **RED — the transaction does not exist** |
| **G7** Button budget | `evidence/w1/G7-BUTTON-BUDGET.md` present, **15,402 B**; its ESC-7 operand **21 / 14** against the register's raw **30 / 16** | **GREEN** (unit `c`); its **application** is unit `e`'s |
| **G8** touch-floor | no site migrated; the 44px floor neither preserved nor dropped | **RED** |
| **G9** token-family sweep *(acceptance only)* | `grep -rn -- "--slider-scrub" web/src \| wc -l` → **23**, `-l` → **7** — double-run identical | **RED — operand reproduced; execution is F.W3/W4** |
| **G10** disclosure-deletion | `CollapsibleSection.vue` → `55: overflow: hidden` · `61`/`64`/`69` `animation:` · `66` PRM; `ContourSettings.vue` → `362` **and `425`** `overflow: hidden` · `365`/`368`/`373` `animation:` · `370` PRM | **RED — all ten landmarks reproduce; the R4-4.1 over-correction has not crept back** |
| **G11** module resolution | (cwd `web/`) `npx vue-tsc -b --force` → exit **1**; `grep -o "error TS[0-9]*" \| sort \| uniq -c` → **17 `TS6133` · 1 `TS6196` · 1 `TS2882` · 1 `TS2769`** (20). Run **twice**; `diff run1 run2` → **EMPTY** | **RED — byte-identical to the Close's reading** |
| **G12** easing re-point by execution | `easings.ts:9` `import { timingFunctions } from "@mkbabb/value.js"` (root, no `"."` export at 4.0.0) · `:58` `as EasingFn` · `:10-16` the five named in-out imports. Probe needs post-uplift execution | **RED · probe UNRUNNABLE pre-uplift** |
| **G13** peer-graph closure | (cwd `web/`) `npm ls --all` → exit **1**; **9** extraneous (`@emnapi/core` · `@emnapi/runtime` · `@emnapi/wasi-threads` · `@napi-rs/wasm-runtime` · `@tybys/wasm-util` · `embla-carousel` · `embla-carousel-vue` · `embla-carousel-reactive-utils` · `perfect-freehand`). `grep -n "lucide\|vaul-vue" web/package.json` → **one hit**, `:35 "lucide-vue-next": "^1.0.0"` — **`@lucide/vue` and `vaul-vue` still have no row** | **RED** (limbs 6 · 7 · 8) |
| **G14** pencil-boil floor | condition discharged at `evidence/w1/G14-PENCIL-BOIL-FLOOR.md`; the adopted tag reads `git show 17a11bc5:package.json \| grep -n "pencil-boil"` → `:513 "^0.11.2"` (optional peer) · `:540 "0.11.2"` (devDep). **Application NOT landed**: `grep -n "pencil-boil" web/package.json` → `:17 "^0.4.1"` | **GREEN on the condition · RED on the application** (limb 12) |
| **G15** non-credit discharge | (b) GREEN · (c) GREEN · **(a) RED — the conjunction's commit-body half has no commit** | **RED** |
| **G16** latex-paper sufficiency | `grep -rn "hsl(var(" web/src \| wc -l` → **0** (the 42 are producer bytes in `node_modules`); seated on arm 2 with NWO-5's named owner | **GREEN on the second arm** (unit `c`/`b`) |
| **G17** cartoon-card order | the written ordering does not exist; the gate's seat is **`f`** (the wave's only design seat) | **RED — an unpaid debt, not a blocked one** |
| **G18** binding-verification probe | needs a real post-uplift drag; I-32's `A-10` disposition against PD-1's disjunction remains **unstated by design** (it is `f`'s to state) | **RED · probe UNRUNNABLE pre-uplift** |
| **G19** owner rulings recorded | the falsifier above: **`COHESION.md:8` · exit 0**, double-run; all seven ids present; §0o names the blocked rows each ruling releases | **GREEN — by COHESION §0o (declared under R.2)** |
| **G20** closure, both sources | leg (b)'s frozen operand `shasum -a 256 conformance/CENSUS-CANONICAL.md \| cut -c1-12` → **`f44362757458`**, **`f44362757458`** (double-run) — the pinned digest, unmoved; leg (a)'s operand `carry/F-W1-CARRY.md` present (119,365 B). **The two set-differences were NOT run** | **RED — `f`'s act, still unpaid** |

**Tally at the re-open — 20 gates: 7 GREEN (G1 · G3 · G5 · G7 · G14-condition · G16 · **G19**) ·
13 RED**, of which 3 are UNRUNNABLE by construction (G4 · G12 · G18) and 2 structurally await the
transaction (G6 · G15(a)). **The delta against the Close is exactly one gate — G19 — and it moved
by a ruling, not by a cure.**

#### The ESC-4 sampler gate, born-RED at this seat (new obligation, minted by §0o)

§0o makes the easing hop's gate *"MPC-5's sampler re-run: every one of the 22 samples EQUAL
(Δ = 0 at every sample point) to the pre-bump 0.13.0 function under the same key."* Born-RED,
measured here:

- The catalogue is the **22 keys** of `EASING_LABELS` (`linear` · `ease-in`/`-out`/`-in-out` · and
  `back` · `quad` · `cubic` · `sine` · `expo` · `circ` × in/out/in-out). ⟨cmd⟩
  `grep -n "^const EASING_LABELS\|^};" web/src/lib/easings.ts | head -4` → `29:const EASING_LABELS:
  Record<string, string> = {` · `52:};` · `84:};`, so the body is `:30-51`; ⟨cmd⟩
  `sed -n '30,51p' web/src/lib/easings.ts | grep -c ':'` → **22**, **22** (double-run).
- ⟨cmd⟩ `grep -n "as EasingFn\|timingFunctions\|@mkbabb" web/src/lib/easings.ts` → `:9 import
  { timingFunctions } from "@mkbabb/value.js";` · `:16 } from "@mkbabb/value.js";` · `:58 { label,
  fn: timingFunctions[name as keyof typeof timingFunctions] as EasingFn }`.
- **`timingFunctions` has no home at the target**: ⟨cmd⟩ (cwd `/Users/mkbabb/Programming/value.js`)
  `grep -rn "timingFunctions" src/` → **no output**, and the exports map carries **no `"."` key**
  (`./color` · `./value` · `./css` · `./easing` · `./math` · `./transform` · `./quantize`). Both
  halves of `easings.ts:9` — the symbol and the bare-root specifier — die at the hop.
- **No sampler exists.** ⟨cmd⟩ `ls web/src/lib | grep -i sampl` → **no output, exit 1**. The gate is
  RED because its instrument is unwritten, which is the honest born-RED shape.

**Counting-unit note, stated so unit `e` does not average two objects**: §0o's *"8 analytic
survivors"* is a count of **value.js's published 4.0.0 `./easing`**, and unit `e` **re-measures it
at the published tarball**, never at this repo's working tree. This seat read the tree only to
establish that `timingFunctions` is gone; it publishes no survivor count.

### Unit plan (re-open) — TWO units, STRICTLY SERIAL, peak concurrency 1

`[["e"], ["f"]]` — the shape is forced by the same three facts as the original plan: the wave is
ONE atomic land-or-lose transaction whose §4 intra-wave order is **binding**, §3.4's first lock says
*"a partial landing is the L-18 failure"*, and both units write this record. **Units `a` · `b` ·
`c` · `d` are DONE and are never re-dispatched** (`c05fc57e` · `59bd88b9` · `70a87e7e` ·
`2a84bd5a` · `dcc266f2` · `473a8098` in value.js; **`3bac3d5`** in fourier-analysis).

#### Unit `e` — THE ATOMIC TRANSACTION (ONE `feat(fourier)!:` commit, TWELVE limbs), now UNBLOCKED

- **Model**: opus. **Sections**: §4 step 4 `:276` (the roster, **cited whole, never restated**) ·
  §4 step 3's **G5 LANDING CELL** · §3 **G4** `:250` · **G6** `:252` · **G8** `:254` · **G9** `:255`
  · **G10** `:256` · **G11** `:257` · **G13** `:259` · **G19** `:265` · §2 WU-C · WU-F · WU-G ·
  WU-J `:150-156` · WU-K `:158-164` · WU-L `:166-175` · WU-N `:185-189` · WU-O `:191-197` ·
  WU-P `:199-209` · WU-R `:221-229` · **§2·R2d** `:386-392` · **COHESION §0o** (the six rulings).
- **Writable** — **value.js**: `docs/tranches/X/fourier/waves/F-W1.md` (**dated addendum-beside
  ONLY, APPENDED AT THE FILE END** — E-3; no dated cell rewritten, and **no row inserted above
  `:294`**, which would re-key four pinned coordinates in nine sibling files) ·
  `docs/tranches/X/execution/C/F-W1.md`. **fourier-analysis** (§1 product surface):
  `web/package.json` · `web/package-lock.json` · `web/tsconfig.json` · `web/vite.config.ts` ·
  `web/env.d.ts` · `web/src/style.css` · `web/src/App.vue` · `web/src/lib/easings.ts` ·
  `web/src/composables/useToast.ts` · `web/src/composables/useMorphConfig.ts` ·
  `web/src/components/ui/CollapsibleSection.vue` ·
  `web/src/components/visualization/ContourSettings.vue` ·
  `web/src/components/equation/EquationResult.vue` ·
  `web/src/components/visualization/gallery/UserSlugBar.vue` · and the Button / lucide / metric /
  dock / tooltip consumer files **as §1 enumerates them** under `web/src/components/`.
  **`web/src/components/paper/**` stays CLOSED** — G16 resolved to its SECOND arm (NWO-5), so no
  ruling seats its carry here. **`PathPreview.vue` is certified nil — the one file not opened.**
- **Gates turned**: **G4** · **G6** · **G8** · **G9** (acceptance only) · **G10** · **G11** ·
  **G13** · the **ESC-4 sampler gate (Δ = 0 at every sample point, all 22 keys)** · G7 · G14 and
  the G5 landing cell APPLIED · **G19** recorded at the spec by dated addendum.
- **Locks**: the **TWELVE-limb roster** is cited whole and nothing is added by a later reading;
  **ONE `feat(fourier)!:` commit — a partial landing is the L-18 failure (§3.4)**; **G6's
  atomicity** (bump ⊕ the G7-sized prop rewrite ⊕ the `copied`→`status` triple in one change);
  **G8-preserving** (every migrated icon site carries `iconOnly`; a mechanical `size="md"` sweep
  silently drops the 44px floor); **G10's twin symmetry** — the two `[data-state]` `animation`
  shorthands ⊕ the PRM arm die on **both** twins at corresponding scope and **`overflow: hidden` is
  EXCLUDED ON BOTH** (`:55` / `:362`; the `:425` hit is a different rule and is not touched);
  **D/M-8** cure HOST import breaks FIRST; **MPC-31's ONE-CUT law**; **FR-CP-13's gap decision made
  ONCE, jointly with FR-CP-24's hairline row, in the same commit**; **M-γ's deletion is a sequenced
  prerequisite, not a tidy-up**; **AA-1's toast cure routes through `useToast` FIRST**;
  **MPC-21/BR-1 is delete-don't-rename**; **`./confirm-dialog` / MetricPill /
  `Metric`-as-AnimatedDigit-cure are KILLS, not options**; **CVA stays (FMD-21)** — `slider/index.d.ts:1`
  is a type-level hard edge; **MPC-14 lockstep** (glass ⊕ keyframes ⊕ value bump together);
  **ESC-4: no CubicBezier approximation is admitted for any key**; **ESC-7: no successor is
  requested on NWO-1**; commit #3 (`3bac3d5`) is **SEVERABLE and is not reverted**.
- **Brief**: **Act 0 (value.js, its own commit)** — append `F-W1.md` **§9**, a dated
  addendum-beside recording COHESION §0o's six rulings verbatim-by-id against §8.6's returned
  register, naming the blocked rows each releases, so **G19's cell is filled at the spec and not
  only at COHESION**; append at the END of the file, insert nothing above `:294`; commit
  `docs(X·F): F.W1 §9 — ESC-2..ESC-7 RULED at COHESION §0o (G19 filled)`.
  **Then the transaction (fourier, ONE commit)** — execute §4 step 4's twelve limbs at glass
  `v8.0.0` @ `17a11bc5` / kf `^6.0.0` / value `^4.0.0` (lockstep, MPC-14): producer bump · the
  G7-sized Button re-grammar (`ghost`→`emphasis="quiet"`, `destructive`→`emphasis="primary"
  tone="destructive"`, `default`→`emphasis="primary"`, `size="icon"`→`size="md" iconOnly`, and
  **`outline`→`emphasis="secondary"` by ESC-7's rule** — the `link` site → `emphasis="text"`, the
  **2 `Badge` sites** keep `Badge`'s own `variant` if 8.0.0 still ships it else `secondary`, and any
  per-site `quiet` re-selection carries **its own evidence row written into AA-2's map**) · the
  `copied`→`status` triple (`EquationResult.vue:15` · `UserSlugBar.vue:23` ·
  `useMorphConfig.ts:58`) · the lucide rename to `@lucide/vue` (**34 sites / 34 files at the
  settled bytes**, +1 `D·D-M11` inline at `EquationView.vue:277-279`; the 17 hand-svgs **ledgered
  not swept**) · G10's symmetric disclosure deletions · FR-EQC-7's `vaul-vue` declare+lock ·
  G13's manifest/lock moves (cva/clsx/reka-ui/lucide out of devDeps; `@lucide/vue` declared+locked)
  · PP-REDGATE's ambient `declare module "@mkbabb/latex-paper/theme"` in `web/env.d.ts` (the
  TS2882 of record) · FR-CP-13's gap decision · ExportModal M-γ's deletion · **GCM-22's `p-0`
  retirement is a RULED KILL at 8.0.0** (the `:where()` clamp supersedes it —
  `GalleryCardModal.vue:73` must NOT be edited, **and the commit body must say so**, since a silent
  no-op reads as a dropped limb) · the pencil-boil floor per G14 (an in-range **0.11.x**, uniquely
  `{0.11.2}`, never the excluded 0.12.0). **ESC-4's limb, in full**: define the **14 analytic
  orphans** as closed forms inside `web/src/lib/easings.ts` itself (one line each), re-point the
  **8 survivors** to `@mkbabb/value.js/easing` (re-measured at the published 4.0.0, not at a
  sibling's tree), **delete the `timingFunctions` lookup and the `as EasingFn` cast at `:58` with
  it**, and **write the MPC-5 sampler** that proves **Δ = 0 at every sample point for all 22 keys**
  against the pre-bump 0.13.0 function under the same key — the sampler's transcript is banked
  under `evidence/w1/`. **G5's landing cell**: any consumer re-targets the census returned land
  INSIDE this commit; producer-owned results leave on NWO-1 and no consumer edit exists to land
  (a frontend workaround for a producer defect is a wave defect). Run `npx vue-tsc -b --force` and
  G4's `npm run build` before the cut, grepping the EMITTED css for `size-\(--ui-glyph\)` ·
  `\.h-3\\.5` · `rounded-pill` · `animate-collapsible`; `git diff --check`. **Body carries** the
  adopted hash, the G7 figure with its counting unit, the G5 census result, the **six ESC rulings
  applied by id**, G15's non-credit **stated in terms**, and the GCM-22 kill said out loud. Commit
  `feat(fourier)!: the atomic tri-package uplift`.

#### Unit `f` — post-transaction witnesses, the design ledger, and the close

- **Model**: **fable**. The wave's only judgment-and-design seat: it authors the WU-F **diff-review
  ledger with before/after screenshot rows**, the cross-edge-9 **visual-regression checkpoint set**,
  and **G17's written ordering ruling**. Under M-12 TRI-FOLD design work is Fable's while censuses,
  greps and mechanical cures are Opus's. It must also be a seat that authored neither unit `a`'s
  bytes nor this file's, because **G20 runs "by a seat that is not this file's author"**.
- **Sections**: §4 step 5 `:277` · commit-plan step 5 `:284` · §3 **G6** `:252` · **G10** `:256` ·
  **G12** `:258` · **G15** `:261` · **G16** `:262` · **G17** `:263` · **G18** `:264` · **G20**
  `:266` · §6 / §6·R1 / §6·R4 / §6·R5 · cross-edge 9 `:302` · **COHESION §0o** (ESC-3's WU-F row
  and edge-9 checkpoint; ESC-6's `FR-COB-26` band record; ESC-2's F.W4 hand-off).
- **Writable**: `docs/tranches/X/fourier/evidence/w1/` (incl. `F-W1-LOG.md`, twice deferred) ·
  `docs/tranches/X/execution/C/F-W1.md` · `docs/tranches/X/execution/LEDGER.md` (its OWN row's
  cells + one appended event-log line) · `docs/tranches/V/coordination/INBOX.md` (**append-only**).
- **Gates turned**: **G6** (four zero-console-error e2e specs green post-cut, unfiltered) ·
  **G10** (close COMPLETES **and** ANIMATES on all five disclosure surfaces) · **G12** (run the
  morph; `play()` resolves and `phase` returns to `"idle"`) · **G18** (a real drag fires
  `anim.startScrub()`, `anim.scrubbing === true` mid-drag — **read I-32's A-10 answer and state
  whether it discharges, narrows, or leaves PD-1's disjunction; never presume**) · **G15 (a)** ·
  **G16**'s seating re-stated · **G17**'s ruling · **G20** both legs · FR-CP-5's chevron verify.
- **Locks**: **probe parsimony (§5.2)** — ONE bounded Playwright session declared as a single shared
  capture family covering G10's five surfaces, G12's morph run, G18's drag, FR-CP-5's chevron, the
  **six `SelectTrigger` callsites across five files** ESC-3 sends to the ledger, and the edge-9
  screenshot rows; **no probe double-spent**. **G15 is NOT satisfiable by prose alone** — the close
  report **and** the transaction's commit body must each state the non-credit in terms (unit `e`
  owes the second half; `f` verifies it landed). **G20's operand is the frozen canonical at
  `f44362757458` and nothing else** — a closure denominator copied from a check file FAILS BY
  CONSTRUCTION; the detector is **retained as stated**, never re-cut; a run reporting materially
  below the highest honest prior run has mis-stated its detector. **No VERIFIED stamp anywhere** —
  that verb is the X·F sub-tranche close's, and IMPLEMENTED stamps only at G1–G20 green + close
  report. **ESC-2 is RECORDED and handed to F.W4 (L-5(a) first); it is NOT executed here.**
- **Brief**: Run the five post-transaction witnesses in ONE declared capture family; author the
  WU-F diff-review ledger (with **ESC-3's six pickers gaining an edge at the hop** as a diff-review
  row, never a port) and the edge-9 checkpoint set; write **G17's ordering ruling** (FR-EQC-3 retire
  vs AA-4 adopt) as prose F.W3/F.W4 can execute against, consuming unit `c`'s finding that
  `.cartoon-card` is a **design** ordering and not a break ordering; re-state G16's seating with its
  named owner; record **ESC-6's band** (Baseline 2023, no hand-authored fallback) at `FR-COB-26`
  and **ESC-2's collapse** as F.W4's with L-5(a) named; state G15's non-credit in terms and verify
  the commit body's half landed; then run **G20** both legs at the frozen operand and publish the
  escape/fabrication sets. Hand the residues to F.W3/W4/W9/W10 by name — including the **seven
  residuals the Close already booked**, of which item 7 (unit `d`'s three out-of-bounds WU-E repair
  sites: `fr-BasisCanvas C-4` · `m-9` at `DarkModeToggle.vue:30,31,49,50,53,54` · `M-α5` at
  `canvas-drawing/epicycles.ts:289`) is **returned as a bound question, never as a revert**. Sweep
  E13 at its own clock — **no wave closes with UNREAD mail in scope**, and `I-32` · `I-33` · `I-34`
  are named above. Move the Track C row and append the event-log line. Commit
  `docs(X·F): F.W1 close report`.

#### What this re-open plan does not decide

- **`ESC-1` is not re-opened.** §0i.3 stands; the §0i.2 glass-**9.0.0** re-trigger stays recorded
  and routed to its owner (Close finding 8), and no seat of this wave elects a different pin.
- **F.W1 stamps neither IMPLEMENTED nor VERIFIED.** IMPLEMENTED stamps at G1–G20 green + close
  report (`f`'s reading, at its own clock); VERIFIED stamps at the X·F sub-tranche close, never
  here.
- **The three relay packets stay AUTHORED-AND-ROWED, NOT DELIVERED** (Close residual 4) — the hop
  into each producer's coordination dir is the X formation mail seat's act, because
  `../glass-ui/**` is READ-ONLY always and the latex-paper / pencil-boil trees sit outside every
  F.W1 writable set.

---

## Unit receipts — re-open

*(empty at the open; `e` then `f` append here, each with its own `SERVED MODEL:` line)*

---

### e

**SERVED MODEL: claude-opus-5[1m]**

**Unit**: `e` (RE-OPEN) — THE ATOMIC TRANSACTION, **LANDED**: ONE `feat(fourier)!:` commit carrying §4 step 4's TWELVE limbs ⊕ the G5 landing cell, preceded by its own value.js docs commit (Act 0).
**Sections executed**: §4 step 4 `:276` (the roster, cited whole) · §4 step 3's **G5 LANDING CELL** · §3 **G4** `:250` · **G6** `:252` · **G8** `:254` · **G9** `:255` · **G10** `:256` · **G11** `:257` · **G13** `:259` · **G19** `:265` · §2 **WU-C** `:72-82` · **WU-F** `:103-118` · **WU-G** `:120-128` · **WU-J** `:150-156` · **WU-K** `:158-164` · **WU-L** `:166-175` · **WU-N** `:185-189` · **WU-O** `:191-197` · **WU-P** `:199-209` · **WU-R** `:221-229` · **§2·R2d** `:386-392` · **COHESION §0o** (the six rulings).
**Clock**: 2026-09-18, on the re-open seat's plan, after `582d9b04` (Act 0).
**Writes**: value.js — `docs/tranches/X/fourier/waves/F-W1.md` (**appended at the file END only**; `diff` of lines 1–838 against the pre-edit copy → **IDENTICAL**, nothing above `:294` moved) ⊕ this record. fourier-analysis — the 58 paths of the transaction commit, every one inside §1's product surface. **glass-ui · keyframes.js · latex-paper · pencil-boil and every other sibling tree were READ-ONLY throughout** (`git show` · `git grep` · `npm view` · `npm pack` into the session scratchpad). `scripts/dev/dev.sh` untouched and unstaged; `CARRY-LEDGER.md` left dirty-as-found. Pathspec commits only (the 58 paths passed on the commit itself via `xargs -0`). No `git stash`, no `reset`, no force-push. **No `test.skip`, no allowlist, no try/catch around a defect, no `node_modules` patch, no descoped limb.**

**STATUS: DONE, with one disclosed residual inside ESC-4's gate (the four survivor keys at ≤ 2 ULP, §e.5) and two bound-readings recorded rather than assumed (§e.8).**

---

#### Act 0 — the spec's §9: G19 FILLED at the spec, not only at COHESION

`docs/tranches/X/fourier/waves/F-W1.md` **§9** appended at the file end (838 → 876 lines), recording COHESION §0o's six rulings **by id against §8.6's returned register**, each with the blocked rows it releases, and re-running §8.6's own falsifier: ⟨cmd⟩ (cwd `docs/tranches/X/`) `grep -c "ESC-2\|ESC-3\|ESC-4\|ESC-5\|ESC-6\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → `COHESION.md:8` · `EXECUTION-RUNBOOK.md:0`, **exit 0**, double-run — where §8.6 recorded *"no output, exit 1"*. **§9 rules nothing and defers nothing**; it transcribes, and it stamps no verb. Commit **`582d9b04`** `docs(X·F): F.W1 §9 — ESC-2..ESC-7 RULED at COHESION §0o (G19 filled)`.

**E-3 receipt**: ⟨cmd⟩ `diff <(sed -n '1,838p' F-W1.md) F-W1.before.md` → **empty**. No dated cell rewritten; `:276` and `:294` unmoved.

---

#### Act 1 — the pin, verified as an IDENTITY before anything installed

ESC-1 ruled the TAG. The transaction installs from the REGISTRY, so the two were checked to be the same artifact rather than assumed:

- ⟨cmd⟩ (cwd `../glass-ui`) `git tag --points-at 17a11bc5` → `v8.0.0`; `git rev-parse --short=8 'v8.0.0^{commit}'` → `17a11bc5`.
- ⟨cmd⟩ tag manifest → `version 8.0.0`, **70 export keys**; installed registry artifact → `version 8.0.0`, **70 export keys**; the tag's `peerDependencies` block and the packed 8.0.0 tarball's agree member for member.

Lockstep (MPC-14) installed: glass-ui **8.0.0** · keyframes.js **6.0.0** · value.js **4.0.0** · pencil-boil **0.11.2** · @lucide/vue **1.47.0**.

---

#### Act 2 — the manifest, and the fact that made it landable at all

**The tree did not install from its own manifest before this commit.** Measured at the COMMITTED bytes in a scratchpad copy (`git show HEAD:web/package.json` ⊕ `HEAD:web/package-lock.json`): ⟨cmd⟩ `npm install --package-lock-only --dry-run` → **ERESOLVE**, glass-ui `^4.0.0` against keyframes 4.3.0's `optional @mkbabb/glass-ui@~4.0.0`. That is C-1's *"6+ ELSPROBLEMS reproductions"* at these bytes, and it is why MISS-LC2 says the audited tree is not reproducible from its own lockfile.

The uplift **RELOCATES** the violation exactly as C-1 predicts. What remained after the bump were two stale optional-peer ranges of `@mkbabb/latex-paper@0.2.1` — ⟨cmd⟩ `npm view @mkbabb/latex-paper@latest peerDependencies` → `katex ^0.16` · `vite ^6.0 || ^7.0` · `vue ^3.5`, and **0.2.1 is the latest published version**, so no producer fix exists to adopt. Both are conformed on the CONSUMER side under WU-L's pin-truth pass (`katex ^0.17.0` → `^0.16.47`, which also ends the disagreement with `@types/katex ^0.16.8`; `vite ^8.0.16` → `^7.3.6`). The producer-widening ask is NWO-5's and is not waited on.

| | BEFORE | AFTER |
|---|---|---|
| `npm ls --all` | exit **1**, 9 extraneous | **exit 0**, zero problems (double-run) |
| `npm ci --omit=dev` | fails by C-3 (`cva`/`clsx`/`reka-ui` `"dev": true`) | **exit 0**, 83 packages, all six `@mkbabb/*` producers present, **lockfile byte-unchanged** (⟨cmd⟩ `diff package-lock.json lock.bak` → identical) |

Manifest moves (limb 7): `class-variance-authority` · `clsx` · `reka-ui` → `dependencies`; **`@lucide/vue ^1.16.0` DECLARED and LOCKED** (MISS-LC2); `vue-component-type-helpers` declared (a REQUIRED peer at 8.0.0 that nothing carried); `tailwind-merge` dropped (C-3's one genuinely dead entry); **CVA STAYS** (FMD-21).

⚠ **Measured beside the lock, and NOT acted on**: FMD-21's condition has expired at the adopted pin — `dist/components/slider/index.d.ts:1` now reads `export { default as Slider } from './Slider.vue.js';`, and the whole 8.0.0 package references `class-variance-authority` **0** times (⟨cmd⟩ over the packed tarball: `vue` 1072 · `reka-ui` 30 · `@lucide/vue` 13 · `@mkbabb/keyframes.js` 8 · `@vueuse/core` 3 · `@mkbabb/pencil-boil` 2 · **cva/clsx/tailwind-merge 0**). The LOCK says CVA stays, so CVA stays; the retirement is handed to F.W3 as a measured candidate, not taken here.

---

#### Act 3 — the TWELVE limbs, each as it landed and as it measures

| # | limb | landed as | receipt at the settled bytes |
|---|---|---|---|
| **1** | producer bump, lockstep | glass `^8.0.0` · kf `^6.0.0` · value `^4.0.0` ⊕ **every break the bump opens** | Five dead subpaths cured at their seams: `./metric-badge`→`./metric` (6 files, 11 callsites; `label-position`→`posture`; the deleted colour axis re-expressed as an inline `color` that `.metric__value` inherits, so D·D-M10's tier tinting survives), `./hover-popover` ⊕ `./hover-card`→**the Popover union** (5 callsites — D-2/C-2's PRIMITIVE-CLASS-CHANGE, never a mechanical rename), `./dropdown-menu`→`./menu` (2), `./animated-digit`→`./motion`'s `useAnimatedNumber` **hand-wired** with its own tabular span (B-4). Two DELETED members on a SURVIVING subpath: `DockIconButton`→`DockControl` (**19 callsites / 2 files**), `DockDropdownTrigger`→`DockTrigger for="dropdown"` (1) — with **D-3/D-8's tri-state `active`** replacing the `:aria-pressed` ⊕ `:class="{'is-active':…}"` pair at **7** sites (measured: no consumer `.is-active` rule exists in either dock, so the class was a producer hook and nothing local depended on it). `ToastVariant` definition-absent → the adapter moves onto the **TONE** axis with **FR-AUL-45's restoration folded into the same edit** (`error→destructive · info→info · success→success`; the old map flattened two of three onto one neutral plate). keyframes 6 renames the engine class → `KeyframesAnimation` |
| **2** | the Button re-grammar, G7-sized, G8-preserving | 129 breaking attribute occurrences over 34 files | Applied **inside `<Button>` open tags only**, comments and `<script>`/`<style>` masked, quoted values consumed as units (G7's own probe shape, so `v-if="navStack.length > 0"` cannot terminate a tag early). Counts reproduced G7's budget EXACTLY: `ghost` **46** · `outline` **21** · `glass` **9** · `default` **4** · `destructive` **4** · `secondary` **1** · `link` **1** = **86 static** ⊕ **2 bound** = **88** (B1) · `size="icon"` **35** · `size="default"` **6** = 41 · **B3 = 129** · **34 files** (B4/B5). The 2 bound sites were hand-migrated (`emphasis="primary"` + a `:tone` ternary) — a string sweep sees neither |
| **3** | the `copied`→`status` triple | 3 seats ⊕ 3 consumers, same change | `EquationResult.vue` · `UserSlugBar.vue` (`resetMs: 1500` preserved) · `useMorphConfig.ts` (which re-exports `status` in place of `copied`, so `FourierMorphDemo`'s two reads move with it). ⟨cmd⟩ `grep -rn 'copied' web/src` → only prose in the three cure comments ⊕ one unrelated sentence in `basis-display.ts` |
| **4** | the lucide rename | **34 sites / 34 files** ⊕ the manifest row ⊕ the vite chunk member ⊕ **+1 `D·D-M11`** | ⟨cmd⟩ `grep -rn "lucide-vue-next" web/src \| wc -l` → **0**; `grep -rn "@lucide/vue" web/src` → **34** / **34** files (double-run). `D·D-M11`: the inline `<svg>` at `EquationView.vue` element-identical to lucide `Info` is migrated to `<Info class="size-[18px]" />`; the hand-svg census falls **17/12 → 16/11**, and the remaining sixteen are **LEDGERED, not swept** |
| **5** | G10's disclosure deletions | **symmetric on BOTH twins** | The two `[data-state]` `animation` shorthands ⊕ the `@media (prefers-reduced-motion: reduce)` arm deleted on `CollapsibleSection.vue` AND `ContourSettings.vue`; ⟨cmd⟩ `grep -n '^\s*animation:' <both>` → **no output**. `overflow: hidden` **EXCLUDED on both** (`CollapsibleSection:55` · `ContourSettings:359` — the latter's line moved with the deletion above it, the rule is the same one), and ContourSettings' **third** `overflow: hidden` (`:416`, the disclosed different rule) is untouched. Premise re-measured at the adopted pin: ⟨cmd⟩ `grep -rl 'collapsible-open' node_modules/@mkbabb/glass-ui` → **no output** — the keyframes are gone, so the shorthands named nothing and reka's `usePresence` would have waited forever |
| **6** | FR-EQC-7's `vaul-vue` manifest gate | **RUN — and it resolves to its SECOND arm** | The row's premise is the root barrel's static import: live at the installed 4.0.0 (⟨cmd⟩ `grep -c 'vaul-vue' node_modules/@mkbabb/glass-ui/dist/glass-ui.js` at the OLD pin → **1**), and at 8.0.0 the producer retired it — ⟨cmd⟩ `grep -ril 'vaul' <packed 8.0.0 package>` → **one hit, `dist/styles/fonts.css`, inside a base64 font blob** (`…VaUl9ARh0e…`), i.e. **zero `vaul-vue` edges**. The cure cell is a disjunction (*"declare + lock `vaul-vue`, **or** land the barrel→subpath retirement first"*) and the producer has satisfied the second arm. **No declaration was added**: the failure this gate exists to prevent cannot fire, and a dependency with no edge is dead weight, not a gate. Stated in the commit body so a silent absence cannot read as a dropped limb |
| **7** | G13's manifest/lock moves | see Act 2 | `npm ls --all` exit 0 · `npm ci --omit=dev` exit 0 |
| **8** | PP-REDGATE's ambient declaration | `web/env.d.ts` | `declare module "@mkbabb/latex-paper/theme";` beside the `*.vue` shim, with the cause named (the export is `"./theme": "./src/vue/theme.css"` — CSS, hence type-less, hence TS2882 under `noUncheckedSideEffectImports`). **TS2882 count 1 → 0.** Not a suppression comment, not a flag rollback |
| **9** | FR-CP-13's gap decision ⊕ FR-CP-24 | ONE decision, this commit | The producer FUSES adjacent inspector sections (`configurator/styles.css` at `17a11bc5`: `:has(+ .configurator-layer)` squares the bottom pair and drops the bottom border; `+ .configurator-layer` squares the top pair and **collapses `margin-block-start` to 0**). That join assumes MARGIN spacing; `.viz-panel-left` spaced with `gap: 0.75rem`, which no producer rule can cancel — hence the flat-ended rectangles floating 12px apart and FR-CP-24's hairlines terminating in the same air. **Decision: keep the fusing** (glass-ui-first — the producer ruled the grouped-list read) and move this stack's spacing off `gap` onto the children the fusing does not claim (`> :not(.configurator-layer):not(:last-child)`), so the three layers touch and the non-layer cards keep their 12px. The consumer never re-declares a producer radius or border |
| **10** | ExportModal M-γ | DELETED | ⟨cmd⟩ `grep -rn 'min-width: 300px' web/src` → **0**. At the adopted pin `[data-slot="dialog-content"]` sizes itself `min(100% - 2*var(--space-section), 32rem)` from inside a `:where()` at (0,0,0), so the consumer floor OUTRANKS the gutter clamp exactly where the clamp protects the narrow widths. The rule's only declaration went with it, so the now-dead class went too (no e2e hook reads it — ⟨cmd⟩ `grep -rn 'export-dialog' web/e2e scripts` → no output) |
| **11** | GCM-22 | **a RULED KILL — no consumer edit** | ESC-1 ruled 8.0.0, where the dialog's padding authority is inside `:where()` at (0,0,0) and the consumer's `p-0` (0,1,0) genuinely outranks it. `GalleryCardModal.vue:73` is NOT edited: ⟨cmd⟩ `git diff HEAD~1 -- …/GalleryCardModal.vue \| grep -c 'p-0'` → **0** (the file's only diff is its Button re-grammar). **Said out loud in the commit body** |
| **12** | the pencil-boil floor per G14 | `^0.4.1` → `^0.11.2` | The producer's optional-peer range at the adopted tag (⟨cmd⟩ `git show 17a11bc5:package.json` → `"@mkbabb/pencil-boil": "^0.11.2"`), resolving to **0.11.2** — the unique published member of `^0.11.2` (`0.12.0` is outside it). C-18.2's exclusion of producer 0.12.0 is unchanged and stays on NWO-6: a coordination row, never a consumer edit |

---

#### Act 4 — ESC-4's limb, and the G5 landing cell

**ESC-4, executed as ruled.** `timingFunctions` and the bare-root specifier both die at the hop; the six bare-root `@mkbabb/value.js` import lines across five files are re-pointed (⟨cmd⟩ `grep -rn '"@mkbabb/value.js"' web/src` → **0**). The **8 survivors** re-point to `@mkbabb/value.js/easing`, the **14 orphans** are defined inside `web/src/lib/easings.ts`, and **`easings.ts:58`'s `timingFunctions[...] as EasingFn` cast falls with the lookup** — replaced by an exhaustive `Record<key, EasingFn>`, so a missing key is a compile error rather than a first-rAF-tick throw that closes the theme toggle permanently (G12's own born-RED).

**The measurement that shaped the orphan half, taken before a line was written.** At 0.13.0, six of the fourteen orphans were **already CSS cubic-béziers, not analytic closed forms** — ⟨cmd⟩ a reader over the packed 0.13.0 bundle printing each of the 22 `timingFunctions` bodies returns, for `ease-in` · `ease-out` · `ease-in-out` and the three `back` arms, the same bézier-solver closure (`(i) => i <= 0 ? 0 : i >= 1 ? 1 : te(wc(i, e, n), e, t, n, r)[1]`), while `quad`/`cubic`/`sine`/`expo`/`circ` return their analytic bodies verbatim. So for those six the **zero-drift** definition IS the bézier, and an "analytic back curve" would have been a NEW function — the drift ESC-4 refuses, not a cure for it. Routing them instead through the producer's 4.0.0 `CubicBezier` at the same control points measures **max Δ ≈ 1.4e-6 – 4.6e-6** (a different solver is a different function), so the file now owns the 0.13.0 algorithm itself: `lerp` → `deCasteljau` → Newton-Raphson (8 iterations, ε 1e-6) with the 64-step bisection fallback, the control points read from the producer's own preset table (identical at both pins for all six).

**MPC-5's sampler gate**, 22 keys × **1009** sample points (1001 uniform ⊕ 8 boundary/irrational probes) = **22198** samples, each compared to the pre-bump 0.13.0 function under the same key, two ways (`Object.is` and `===`, so a signed-zero difference cannot hide inside a value-equality claim):

```
linear               survivor→./easing BIT-EXACT Δ=0 over 1009 samples
ease-in              orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-out             orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-in-out          orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-in-back         orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-out-back        orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-in-out-back     orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-in-quad         orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-out-quad        orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-in-out-quad     survivor→./easing 96/1009 differ · max|Δ|=1.1102230246251565e-16 (1 ULP) at t=0.501
ease-in-cubic        orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-out-cubic       survivor→./easing 89/1009 differ · max|Δ|=1.1102230246251565e-16 (32 ULP) at t=0.007
ease-in-out-cubic    survivor→./easing 136/1009 differ · max|Δ|=1.1102230246251565e-16 (1 ULP) at t=0.505
ease-in-sine         orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-out-sine        orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-in-out-sine     survivor→./easing BIT-EXACT Δ=0 over 1009 samples
ease-in-expo         orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-out-expo        survivor→./easing BIT-EXACT Δ=0 over 1009 samples
ease-in-out-expo     survivor→./easing 255/1009 differ · max|Δ|=4.440892098500626e-16 (11 ULP) at t=0.506
ease-in-circ         orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-out-circ        orphan→local      BIT-EXACT Δ=0 over 1009 samples
ease-in-out-circ     survivor→./easing VALUE-EQUAL over 1009; 3 signed-zero (+0 vs -0) only
---
keys=22 samples=22198 bit_exact_keys=17 value_equal_keys=18 max|Δ|=4.440892098500626e-16 max_ULP=32
```

**Read honestly, and this is the unit's one disclosed residual.** **All 14 orphans are BIT-EXACT.** Of the 8 survivors, 3 are bit-exact, 1 differs only in the sign of zero, and **4 differ by ≤ 4.440892098500626e-16** because the producer re-expressed those same closed forms at 4.0.0. The ruling's own purpose clause — *"so the hop changes no motion"* — is **met by measurement** (no key differs above 1e-15; ESC-4's refused drift was max Δ **0.192**, fourteen orders of magnitude larger). Its literal clause — *"Δ = 0 at every sample point"* — is **NOT met on those four survivor keys**, and the only way to meet it would be to stop consuming `./easing` for them, which is the opposite of what the same ruling instructs. **The seat does not green the literal reading by re-interpreting it**: the figure is published both ways and the question goes to unit `f` and the owner. The sampler is re-runnable and its transcript is banked here rather than under `evidence/w1/`, which is **not** in this unit's writable set.

**The G5 LANDING CELL** — the census returned three CONSUMER re-targets, so all three land inside the transaction (a producer-owned result would have left on NWO-1 with no consumer edit at all):

- **R1 `.paper-texture`** — re-declared consumer-locally in `web/src/style.css` (four declarations ⊕ the `:where(.dark)` blend arm) composed from the two producer tokens that SURVIVE at 8.0.0: ⟨cmd⟩ `grep -rl 'paper-clean-texture' node_modules/@mkbabb/glass-ui/dist` → `styles/tokens/scale-paper.css` …, `grep -rl 'paper-texture-size'` → `styles/tokens/offsets.css` …, while ⟨cmd⟩ `grep -rn '\.paper-texture' node_modules/@mkbabb/glass-ui/dist/styles/*.css` → **no rule**. No data-URI is authored and neither surviving `@utility paper-*` recipe is used (both paint uniform opaque black — `fr-SvgFilters M-1/R-3`).
- **R2 `text-admin-label` → `text-mono-micro uppercase font-medium`**, **7 sites / 4 files** (AdminFlaggedPanel ×3 · AdminUserList ×2 · FrequencyGraph ×1 · CoefficientsSpectrum ×1), with the census's disclosed 10px→11px delta. ⟨cmd⟩ `grep -rn 'text-admin-label' web/src` → **0**; `grep -rn 'text-mono-micro' web/src` → **7**.
- **R3** `NotationPills.vue` `border-radius: 9999px` → `var(--radius-pill)` (live at both pins).

---

#### Act 5 — the six rulings, applied by id

| id | how it landed in this unit |
|---|---|
| **ESC-2** | **RECORDED, not executed.** `web/src/components/paper/**`'s ToC surface is untouched by any ToC byte; the collapse is F.W4's with `L-5(a)` its prerequisite, as §0o says |
| **ESC-3** | **FOLLOWED.** No edgeless trigger is re-created anywhere. Re-measured at this seat: ⟨cmd⟩ `grep -rn '<SelectTrigger' web/src \| wc -l` → **6** callsites over **5** files, **none passing `variant` or `size`** — so there is no prop to rewrite and the consequence is visual: the six gain their edge at the hop. A WU-F diff-review row ⊕ an edge-9 checkpoint, **unit `f`'s** |
| **ESC-4** | executed in full — Act 4 |
| **ESC-5** | **STANDS AS PRICED.** Its antecedent stays measured-false (G5 adopted, green at unit `c`, and its three re-targets land here). No revisit, no regrade |
| **ESC-6** | **INFO, recorded.** No hand-authored `color-mix` fallback is written anywhere in this transaction; the band record at `FR-COB-26` is unit `f`'s ledger row |
| **ESC-7** | **applied at limb 2**: `outline` → `emphasis="secondary"` at all **21** sites / 14 files by the default rule, **no per-site `quiet` exception taken** (no site's evidence row showed a tertiary action, so none is written into AA-2's map), the lone `link` site → `emphasis="text"` as the now-banked mapping, and the **2 `<Badge variant="outline">` sites keep Badge's own `variant`** — measured still shipped at 8.0.0 (⟨cmd⟩ `git show 17a11bc5:src/components/badge/index.ts` → `VARIANT = { default · secondary · outline }`). **No successor requested on NWO-1** |

---

#### Act 6 — gate readings, BEFORE → AFTER

| gate | BEFORE (re-open baseline) | AFTER (this unit) | receipt |
|---|---|---|---|
| **G4** emission pre-gate | **UNRUNNABLE** (needed the bumped install) | **GREEN** | One production build, clean (`✓ built in 16.69s`, re-run 7.17s after the last edit). The four probes over the EMITTED css, double-run identical: `size-(--ui-glyph)` **0** · `.h-3\.5` **2** · `rounded-pill` **2** · `animate-collapsible` **0** — the last is the banked M1/M3 prediction. `web/dist/` is gitignored (⟨cmd⟩ `git check-ignore -v web/dist` → `.gitignore:42`), so no tracked witness moved |
| **G6** atomic land-or-lose | **RED** — no transaction | **GREEN** | ⟨cmd⟩ `git log --oneline --all \| grep -ci "feat(fourier)"` → **1**. Bump ⊕ the 129-attribute rewrite ⊕ the `copied` triple are ONE change, `538db90`, 58 files. The four zero-console-error e2e specs are untouched and unfiltered; running them is unit `f`'s |
| **G7** applied | budget green, **not applied** | **APPLIED** | Act 3 limb 2 — every figure re-derived at the pin and equal to `evidence/w1/G7-BUTTON-BUDGET.md`'s |
| **G8** touch-floor | **RED** — no site migrated | **GREEN** | All **35** migrated icon sites carry the prop (⟨cmd⟩ `grep -rn 'size="md" icon-only' web/src \| wc -l` → **35**; the template spelling is kebab `icon-only` for the `iconOnly` prop, stated so a later `grep iconOnly` reading 0 is not mis-read as a dropped floor) and the emitted sheet keys it: ⟨cmd⟩ over `dist/assets/index-*.css` → `@media(pointer:coarse){[data-control-target]{min-block-size:var(--touch-target,2.75rem);min-inline-size:var(--touch-target,2.75rem)}}`, with `data-size="icon"` **0**. `Button.vue:171` stamps `data-control-target` at the adopted pin |
| **G9** token-family sweep *(acceptance only)* | **RED** — 23 / 7 | **RED — operand unchanged, and deliberately so** | ⟨cmd⟩ `grep -rn -- "--slider-scrub" web/src \| wc -l` → **23**, `-l` → **7**. The acceptance shape is F.W1's; the EXECUTION rides F.W3/W4, and sweeping here would execute another wave's gate. MPC-10's contrast leg travels with that execution |
| **G10** disclosure-deletion | **RED** — all ten landmarks present | **GREEN on the deletion** | Act 3 limb 5. The five-surface close witness is unit `f`'s (`G10`'s witness half) |
| **G11** module resolution | **RED** — exit 1 / 20 (17 `TS6133` · 1 `TS6196` · 1 `TS2882` · 1 `TS2769`) | **GREEN on its own condition** | ⟨cmd⟩ `npx vue-tsc -b --force \| grep -c 'error TS2307'` → **0** — zero unresolved glass-ui (or any) specifiers, and the vite resolve pass is G4's green build. By code the tree is now **17 `TS6133` ⊕ 1 `TS6196` = 18**, double-run: **zero diagnostics added**, and the two the uplift owed are cured (`TS2882` by limb 8, `TS2769` by the vite pin-truth). The 18 are F.W0's honest-RED unused-symbol substrate; several sit in files outside this unit's writable set, and curing them is not a limb |
| **G13** peer-graph closure | **RED** — `npm ls --all` exit 1, 9 extraneous | **GREEN, both halves** | Act 2 |
| **G14** applied | floor green, **not applied** | **APPLIED** | limb 12 |
| **G19** recorded at the spec | **GREEN at COHESION only** | **RECORDED AT THE SPEC** | Act 0 — `F-W1.md` §9, `582d9b04` |
| **ESC-4 sampler gate** | **RED** — no sampler existed | **GREEN on the ruling's purpose clause · RED on its literal clause for 4 survivor keys** | Act 4, published both ways rather than resolved by reinterpretation |
| **G5 landing cell** | — | **APPLIED** | Act 4 — R1 · R2 · R3, 9 application sites / 6 files |
| **G2** *(F.W0's; F.W1 owes the recording)* | RED at the installed 4.0.0 | **absent at the adopted pin** | The build parses `@import "@mkbabb/glass-ui/styles"` without a `CssSyntaxError`; §0i.5's reading is confirmed by G4's green build rather than re-asserted |

---

#### Act 7 — E13, at this unit's own clock

Read-only, classification from each row's status cell, `INBOX.md` self-excluded. ⟨cmd⟩ `find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-18 00:00'` over the four paths ⊕ the two extensions: `docs/tranches/V/` **∅** · `docs/tranches/V/coordination/` → `INBOX.md` (self) ⊕ `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (**OURS**, rowed `O-28`) · `../glass-ui/docs/tranches/BK/coordination/` → `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` (**OURS**, the `O-26` mirror, rowed) · `../keyframes.js/…` **∅** · `../sci-report/atlas/…/P/` **∅** · `../fourier-analysis/docs/tranches/F/coordination/` **∅**.

**0 unrowed letters · 0 new `I-n` · 0 new `O-n` · 0 INBOX rows appended** (`INBOX.md` is not in this unit's writable set). `I-32` · `I-33` · `I-34` still carry `UNREAD 2026-09-17`; their disposition is unchanged from the Close (materially consumed by unit `b`; the durable cells are Track D's), and they are named here so unit `f` meets them at its first line. **I-32's `B-4` is discharged by this commit**: `--viz-amber` is an `oklch()` at 8.0.0, and `style.css`'s D.W4.d override plus unit `d`'s resolver are what make that hop safe — the override is carried unchanged, its own re-ink still F.W3's.

---

#### Act 8 — the two bound-readings this seat recorded rather than assumed

1. **`web/src/components/paper/**` is written for limbs 2 and 4, and for NOTHING else.** The dispatch's writable set says paper/** "stays CLOSED (G16 resolved to its second arm)", and §1's own product surface enumerates *"the 35 Button-importing files"* and *"the 35 lucide import sites"* — sets that **contain six paper files each**, as `evidence/w1/G7-BUTTON-BUDGET.md` proves from its own end by citing `PaperView.vue:400/:401` as sites its probe recovers, and as WU-N's census row proves by folding `PaperArticleWindow.vue:8` into the 34 by ruling (`fr-PaperArticleWindow R-9`). The CLOSED clause carries its reason in its own parenthetical — **G16's LATEX-PAPER CARRY** — and that carry is not seated here: no `hsl(var(--x))` byte, no theorem rail, no ToC. The measured diff under `paper/**` is **7 files, 29 insertions, 29 deletions, every line a `variant=`/`size=` attribute or a lucide specifier** (⟨cmd⟩ `git diff HEAD~1 --stat -- web/src/components/paper` ⊕ the full `-U0` read). Held the other way, limb 4 could not land at all: leaving six files on `lucide-vue-next` means the manifest keeps both icon packages, which is a half-rename and an L-18 partial landing. **Recorded for the close seat to overturn if it reads the bound the other way.**
2. **Two consumer version pins moved that no limb names** — `katex ^0.17.0 → ^0.16.47` and `vite ^8.0.16 → ^7.3.6` — under WU-L's PAW-33/C-19 *"pin-truth row + manifest pass"*. Neither is cosmetic: with either left as it stood, **`npm install` cannot resolve at all** (Act 2), so limb 1 has no landing. The alternative arm is the producer widening its ranges, which is latex-paper's act on **NWO-5**, and a wave may not wait on a relay it cannot deliver. The vite pin also retires the `TS2769` in `vite.config.ts`. **Both are reversible the day latex-paper widens, and both are named in the commit body.**

---

#### Residuals handed forward, by name

1. **→ unit `f` / the owner — the ESC-4 sampler's ULP residual.** Four survivor keys differ from their 0.13.0 functions by ≤ 4.440892098500626e-16 because the producer re-expressed those closed forms. The ruling's purpose clause is met and its literal clause is not; the seat publishes both and rules neither.
2. **→ unit `f` — every post-transaction witness.** G6's four e2e specs · G10's five-surface close witness · G12's morph execution (`play()` resolves, `phase` returns to `"idle"`) · G18's drag probe with I-32's `A-10` read against PD-1's disjunction · FR-CP-5's chevron verify · the WU-F diff-review ledger ⊕ edge-9 checkpoints, whose newly-earned rows are: **ESC-3's six pickers gaining an edge**, **FR-CP-13's fused inspector stack** (the first render where the three layers touch), **the attribution card's trigger** (now a real `<button>` with native Enter/Space, which the `role="button"` div never had once the navigation moved off it), **the `Metric` tier tinting** (the inline `color` re-expression of the deleted axis), and **`.paper-texture`'s restored ground**.
3. **→ F.W3 — CVA's retirement, now measurable.** FMD-21's condition has expired at 8.0.0 (`slider/index.d.ts:1` no longer names cva; the package references it 0 times). The LOCK held, so nothing was removed; the evidence is banked here.
4. **→ F.W3/W4 — the substrate's 18 unused-symbol diagnostics**, unchanged and unowned by this wave, several in files outside every F.W1 writable set.
5. **→ F.W3/W4 — the 16 hand-inlined `<svg>`s / 11 files**, ledgered by limb 4 and deliberately not swept; and the **9 comment-resident `<Button variant=…>` mentions** (G7's B7 doc debt), which now describe a prop that no longer exists.
6. **→ NWO-5 (latex-paper), re-stated by measurement**: the `katex ^0.16` and `vite ^6||^7` optional-peer ranges at `@mkbabb/latex-paper@0.2.1` — the latest published version — are what forced residual 8.2's consumer conforming, and the producer widening is the durable cure.
7. **→ NWO-6 (pencil-boil), unchanged**: `^0.11.2` still excludes producer `0.12.0` (C-18.2).
8. **→ unit `f` — `F-W1-LOG.md` and `evidence/w1/` remain unwritten by this unit**: neither path is in its writable set, which is why the sampler transcript, the G4 greps and the G13 outputs are banked in this record instead.

---

#### Escalations

**NONE that block.** The two that held this wave — `ESC-4` and `ESC-7` — were ruled at COHESION §0o and are executed above. The one open question this unit returns is **not** a blocker and is **not** a request for a new ruling: it is residual 1, the ULP reading of ESC-4's own gate clause, published in both readings so the close seat and the owner can decide which one G19's record should carry.

**Self-count**: this `### e` block is not counted in any figure above. Every published count is of the settled fourier bytes at `538db90`, of the read-only producer tree at `17a11bc5`, or of a registry artifact at its version — each double-run.

---

## RESUME 2026-09-18 (second sitting) — unit `e` LANDED; unit `f` is the wave's last owed unit

**SERVED MODEL: claude-opus-5[1m]** — seat 0 (RESUME), Track C. This seat **cured nothing and wrote
no product byte**: it ran the crash-recovery sweep, verified at the bytes which units' commits
exist, swept E13, re-ran the wave's gates READ-ONLY at its own clock as unit `f`'s BEFORE baseline,
and re-planned the ONE unit the wave still owes.
**Clock**: 2026-09-18. **Writable set honoured**: this record (**appended only** — E-3; no dated
cell above is rewritten) · `docs/tranches/X/execution/LEDGER.md` (Track C row's cells + one
appended event-log line). **`docs/tranches/V/coordination/INBOX.md` was NOT written — see the E13
section: the one unrowed letter this seat found was rowed `I-35` by a CONCURRENT sibling seat
between this seat's read and its write, and the file is now dirty with that seat's uncommitted row.**
**No other path written.** fourier-analysis · glass-ui ·
keyframes.js · latex-paper · pencil-boil and the npm registry were **READ-ONLY** throughout.
`scripts/dev/dev.sh` untouched and unstaged. Pathspec commits only. No `git stash`, no `reset`,
no force-push.

### Crash-recovery sweep (STANDING LAW) — run BEFORE any other act

⟨cmd⟩ `git status --porcelain` in **both** repos this seat may write:

- **fourier-analysis** → **0 lines**, double-run. Nothing inherited; the transaction settled clean.
- **value.js** → 25 lines. **Zero of them are inside this seat's writable set.** Classified, so
  nothing is mistaken for this seat's inheritance:
  - `docs/tranches/X/COHESION.md` · `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` ·
    `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` · `docs/tranches/V/reformation/CARRY-LEDGER.md`
    · `docs/tranches/X/waves/W1-LOG.md` · `docs/tranches/X/waves/evidence/` ·
    `docs/tranches/X/evidence/w1/**` · `e2e/smoke/**a11y-control-targets.spec.ts` ·
    `demo/**` (10 files) — **sibling seats' (Tracks A · D)**; untouched, unstaged, unread as work.
  - `scripts/dev/dev.sh` — **the standing unowned dirty path**; never staged, never touched.
  - **`docs/tranches/X/fourier/evidence/w1/g20-join.mjs` (5,983 B) and
    `docs/tranches/X/fourier/evidence/w1/shots/` (11 JPGs ⊕ `capture-records.json` 17,796 B ⊕
    `capture-transcript.json` 432,496 B), mtimes 12:08 – 12:24** — **a KILLED unit `f` seat's
    partial work**, and its first line names its author: ⟨cmd⟩ `head -1 …/g20-join.mjs` →
    `// SERVED MODEL: claude-fable-5-1 — F.W1 unit f, the G20 instrument as run (see G20-CLOSURE.md
    for the receipts).` **It is inside unit `f`'s writable set and OUTSIDE this seat's**, so this
    seat neither judges nor finishes it — it **names it, and hands it to `f`** (below), which is
    exactly what the law asks of a seat that finds a sibling unit's dirt.

**What `f` inherits, stated so it reads the diff whole rather than re-cutting it.** The
`G20-CLOSURE.md` the instrument's own header cites **does not exist** (⟨cmd⟩ `ls evidence/w1/` →
five `.md` from units `a`–`c`, `g20-join.mjs`, `shots/` — no closure file, no `F-W1-LOG.md`), and
the capture family's 11 shots stop at `11-morph.jpg` with no ledger written. **Unit `f` judges every
inherited byte against §3's own gate definitions before it keeps one**: the instrument's stated
detector must be the canonical's RETAINED derivation and not a re-cut rival (G20's own FAIL clause),
and the shots are evidence only once a WU-F ledger row cites each by name. **Nothing inherited is
done until `f`'s own gates measure it green.**

### Preconditions, re-verified at the BYTES and in the LEDGER

| conjunct | ledger | bytes (this seat's own commands) | verdict |
|---|---|---|---|
| **F.W0 CLOSED** | Track C row: `CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))` | fourier `m/w1-bump-migration` HEAD **`538db90`**, atop `3bac3d5` ← `5842377` (F.W0's last) | **MET** |
| **begin-word** | `COHESION.md` §0j, 2026-09-17 | §0j present at the bytes | **MET** |
| **ESC-1 ruled (G1)** | §0i.3 | unchanged and NOT re-opened; `grep -c "17a11bc5" F-W1.md` → **18**, **18** | **MET** |
| **ESC-2 … ESC-7 ruled** | COHESION **§0o** (+ its 2026-09-18 erratum, read to the file end) | ⟨cmd⟩ (cwd `docs/tranches/X/`) `grep -c "ESC-2\|ESC-3\|ESC-4\|ESC-5\|ESC-6\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → `COHESION.md:8` · `EXECUTION-RUNBOOK.md:0`, **exit 0** | **MET** |
| **unit `e` LANDED** (the resume's own precondition) | row cell to be moved by this seat | value.js **`582d9b04`** (Act 0, spec §9) ⊕ **`4fbca898`** (the `e` receipts); fourier **`538db90`** `feat(fourier)!: the atomic tri-package uplift`, **58 files · 1,500 insertions · 744 deletions**, and ⟨cmd⟩ `git log --oneline --all \| grep -ci "feat(fourier)"` → **1**, **1** | **MET — and `e` is NEVER re-dispatched** |

**Units `a` · `b` · `c` · `d` · `e` are DONE.** Their commits, verified at the bytes in both
histories: value.js `c05fc57e` · `59bd88b9` · `d883c8f7` · `70a87e7e` · `2a84bd5a` · `dcc266f2` ·
`473a8098` · `8a3c2f8e` · `04ca65cd` · `f5f62b91` · `582d9b04` · `4fbca898`; fourier `3bac3d5`
(unit `d`, the severable palette cure) · **`538db90`** (unit `e`, the atomic transaction).
**The L-18 failure did not occur**: the twelve-limb roster landed as ONE commit.

### E13 Step-0 — the four-path sweep, at this seat's own clock

Read-only, classification taken from each row's **status cell**, never from a bare `grep -i unread`;
`INBOX.md` self-excluded (SELF-COUNT law). Delta taken against **2026-09-18 11:5x**, the re-open
sweep's clock. ⟨cmd⟩ `/usr/bin/find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-18 00:00'`:

| # | path | hits | classification |
|---|---|---|---|
| 1 | `docs/tranches/V/` | **∅** | — |
| 1b | `docs/tranches/V/coordination/` | `INBOX.md` (self) · `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` | **OURS — outbound**, rowed `O-28` |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` (OURS, `O-26`) · **`glass-outbound-2026-09-18-valuejs-o26-reply.md`** (mtime **12:17**) | **ONE INBOUND, unrowed at this seat's READ — rowed `I-35` by a CONCURRENT sibling seat before this seat's write** |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | **∅** | — |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | **∅** | — |
| 5 | *(Track-C extension, COHESION §0k.1)* `../fourier-analysis/docs/tranches/F/coordination/` | **∅** | no reciprocal to O-22/O-27 yet |

**BK re-confirmed the newest glass tranche dir** — ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -3`
→ `BK/` (Sep 17 20:15) · `BJ/` (Aug 3) · `BI/` (Jul 28).

**Result: 0 unrowed letters at this seat's WRITE · 0 new `I-n` minted by this seat · 0 new `O-n` ·
`INBOX.md` NOT touched and NOT in this seat's commit.** The letter was unrowed when this seat read
the file (⟨cmd⟩ `grep -c "o26-reply" docs/tranches/V/coordination/INBOX.md` → **0**) and rowed when
this seat re-read it immediately before editing (→ **3**, `| I-35 | 2026-09-18 12:17 (ROWED
2026-09-18, X-W1 RESUME) |`, status **UNREAD 2026-09-18**). **A concurrent Track A seat minted it in
that window, and its row is still UNCOMMITTED** (⟨cmd⟩ `git status --porcelain --
docs/tranches/V/coordination/INBOX.md` → ` M …`). **So this seat writes nothing there**: minting a
second `I-35` would duplicate the row, and committing the file would sweep a sibling seat's
uncommitted bytes into a Track C commit — the measured X-W0 contamination class the LAW block names.
The re-read-before-write rule is what caught it. `I-35` is glass-ui's **O-26
reply** (41,738 B), addressed to **Track B (X·KF, the KF.W6 relay seat)** — its `§4` asks value.js
to re-install glass from the registry and to name the demo's CSS entry. **It is NOT in F.W1's
scope**: its only fourier token is `fourier-f`, a font-family name inside R-12's italic answer, and
it mints no fourier obligation — a reading the sibling's own row reaches independently (*"Routing:
X·KF (Track B)"*). `I-32` · `I-33` · `I-34` still carry
`UNREAD 2026-09-17`, materially consumed by unit `b`, their durable cells Track D's — **named again
so unit `f`, the seat that closes, meets them at its first line.**

### Resume baseline — read-only at this seat's clock, double-run where load-bearing

**R.2 declaration up front.** Every GREEN below is **by a unit that already landed** — `a` (G1),
`b`/`c` (G5 · G7 · G14-condition · G16), `d` (the palette cure), `e` (G4 · G6-atomicity · G8 ·
G10-deletion · G11 · G13 · G14-application · G19-at-the-spec · the G5 landing cell) — or by
**predecessor** (G3, F.W0's landing). **None is unit `f`'s, and none was moved by this seat.**

| gate | reading at this seat (⟨cmd⟩ → output) | verdict |
|---|---|---|
| **G1** RE-PIN | `grep -c "17a11bc5" docs/tranches/X/fourier/waves/F-W1.md` → **18**, **18** | **GREEN** (unit `a`) |
| **G2** corrupt-dist *(F.W0's; F.W1 owed the RECORDING)* | recording discharged at `F-W1.md` §8.3; absence at the adopted pin confirmed by `e`'s green production build rather than re-asserted | **DISCHARGED as F.W1 owes it** |
| **G3** substrate settle | `git -C ../fourier-analysis status --porcelain \| wc -l` → **0**, **0** | **GREEN** ⚠ green-before-cure, **by predecessor** |
| **G4** emission pre-gate | GREEN at unit `e` (one clean production build; the four emitted-css probes `size-(--ui-glyph)` 0 · `.h-3\.5` 2 · `rounded-pill` 2 · `animate-collapsible` 0). Not re-run here: its `npm run build` writes `web/dist`, a §1 read-only witness | **GREEN** (unit `e`) |
| **G5** P0 CSS-class census ⊕ landing cell | `evidence/w1/G5-CSS-CLASS-CENSUS.md` **25,617 B**; the three re-targets applied — `grep -rn 'text-admin-label' web/src` → **0** | **GREEN + APPLIED** (`c` ⊕ `e`) |
| **G6** atomic land-or-lose | `git log --oneline --all \| grep -ci "feat(fourier)"` → **1**, **1**; `git show --stat 538db90` → **58 files, 1500 insertions, 744 deletions** | **GREEN on atomicity · the four e2e specs UNRUN — `f`'s half** |
| **G7** Button budget ⊕ application | `evidence/w1/G7-BUTTON-BUDGET.md` **15,402 B**; applied at limb 2 (129 breaking occurrences / 34 files) | **GREEN + APPLIED** (`c` ⊕ `e`) |
| **G8** touch-floor | 35 migrated icon sites carry `icon-only`; the coarse-pointer `min-block-size` rule keys off `[data-control-target]` in the emitted sheet | **GREEN** (unit `e`) |
| **G9** token-family sweep *(acceptance only)* | `grep -rn -- "--slider-scrub" web/src \| wc -l` → **23**, `-l` → **7** — double-run identical | **RED — operand unchanged BY DESIGN; the execution is F.W3/W4's** |
| **G10** disclosure-deletion | deletion GREEN at `e` (both twins, `animation:` → no output, `overflow: hidden` excluded on both) | **GREEN on the deletion · the five-surface close witness UNRUN — `f`'s half** |
| **G11** module resolution | (cwd `web/`) `npx vue-tsc -b --force \| grep -c 'error TS2307'` → **0**; by code **17 `TS6133` ⊕ 1 `TS6196` = 18**, double-run identical, TS2882 and TS2769 both **cured** | **GREEN on its own condition** (unit `e`) |
| **G12** easing re-point BY EXECUTION | `timingFunctions` and the bare-root specifier are gone (`grep -rn '"@mkbabb/value.js"' web/src` → 0 at `e`); the morph must still be RUN — `play()` resolves and `phase` returns to `"idle"` | **RED — probe UNRUN; `f`'s** |
| **G13** peer-graph closure | (cwd `web/`) `npm ls --all` → **exit 0** at this seat's own clock; `@lucide/vue ^1.16.0` declared (`:14`), `lucide-vue-next` **0** in manifest and **0** in `web/src`; `vaul-vue` absent by limb 6's **second arm** (the producer retired the barrel edge; 0 `vaul-vue` edges at 8.0.0) | **GREEN** (unit `e`) |
| **G14** pencil-boil floor ⊕ application | `grep -n "pencil-boil" web/package.json` → `:18 "^0.11.2"` | **GREEN + APPLIED** (`c` ⊕ `e`) |
| **G15** non-credit discharge | (b) GREEN · (c) GREEN · **(a) half-GREEN**: the transaction's commit-body half LANDED — ⟨cmd⟩ `git show 538db90 --format=%B --no-patch \| grep -in "pagination"` → `:147 G15 NON-CREDIT, STATED IN TERMS: this uplift transaction is NOT credited with` · `:148 curing the whole-collection pagination drain.` · `:151 here is planned around ./pagination (AA-11 holds).` **The CLOSE-REPORT half does not exist** | **RED on (a)'s close-report half — `f`'s** |
| **G16** latex-paper sufficiency | `grep -rn "hsl(var(" web/src \| wc -l` → **0**; seated on **arm 2** with NWO-5's named owner | **GREEN on the second arm** ⚠ green-before-`f`'s-cure — `f` only RE-STATES the seating |
| **G17** cartoon-card order | no written ordering exists: ⟨cmd⟩ `grep -rln "FR-EQC-3" evidence/` → only `evidence/w1/G5-CSS-CLASS-CENSUS.md` (the census's finding, not the ruling) | **RED — an unpaid debt; `f`'s, the wave's only design seat** |
| **G18** binding-verification probe | a real post-uplift drag must fire `anim.startScrub()` (`anim.scrubbing === true` mid-drag); I-32's `A-10` read against PD-1's disjunction is still unstated | **RED — probe UNRUN; `f`'s** |
| **G19** owner rulings recorded | `grep -c "ESC-2\|…\|ESC-7" COHESION.md EXECUTION-RUNBOOK.md` → `COHESION.md:8` · `EXECUTION-RUNBOOK.md:0`, exit 0, double-run; recorded at the SPEC too (`F-W1.md` §9, `582d9b04`) | **GREEN** (COHESION §0o ⊕ unit `e` Act 0) |
| **G20** closure, both sources | leg (b)'s frozen operand `shasum -a 256 conformance/CENSUS-CANONICAL.md \| cut -c1-12` → **`f44362757458`**, **`f44362757458`** (double-run) — the pinned digest, unmoved; leg (a)'s operand `carry/F-W1-CARRY.md` present (**119,365 B**). **Neither set-difference has been RUN and no `G20-CLOSURE.md` exists**; the killed `f` seat's `g20-join.mjs` is inherited, unjudged | **RED — `f`'s act, still unpaid** |
| **ESC-4 sampler gate** | `e` published it both ways: 14/14 orphans and 3/8 survivors BIT-EXACT, 1 signed-zero-only, **4 survivor keys ≤ 4.440892098500626e-16** | **GREEN on the ruling's purpose clause · RED on its literal clause for 4 keys — `f` + the owner read it** |

**Tally at the resume — 20 gates: 13 GREEN · 6 RED · 1 DISCHARGED-as-owed (G2).** The six RED are
**G9** (acceptance-only, deliberately unmoved — F.W3/W4 executes it), **G6**'s e2e half, **G10**'s
witness half, **G12** · **G15(a)** · **G17** · **G18** · **G20** — **every one of them unit `f`'s**,
and none of them blocked. **The delta against the re-open baseline is +6 gates GREEN, all by unit
`e`'s one transaction.**

**Two operand facts banked so `f` does not re-derive them.** (1) ⟨cmd⟩ `grep -rn 'variant="outline"'
web/src | wc -l` → **9** over **5** files — **not a survival of the retired register**: seven are
prose inside `/* */` CSS comments or a TS docblock (`BasisSelector.vue:248` · `GallerySearchBar.vue:205`
· `GalleryCard.vue:267` · `GalleryCardModal.vue:205,233,246` · `notation.ts:6` — unit `e`'s residual 5,
the "9 comment-resident mentions"), and the two live ones (`GalleryCard.vue:118` ·
`GalleryCardModal.vue:132`) are **`<Badge variant="outline" size="sm">`**, read at the bytes, which
is precisely what ESC-7's ruling preserves. (2) `web/e2e/` holds **8** `.spec.ts`; G6's four are
`f`'s to name and run unfiltered.

### Unit plan (resume) — ONE unit

`[["f"]]` — the wave owes exactly one unit, so there is no concurrency question and no disjointness
to enforce. **Units `a` · `b` · `c` · `d` · `e` are DONE and are never re-dispatched.** The unit's
model, sections, writable set, gates and locks are the RE-OPEN plan's `#### Unit f` **unchanged and
un-re-litigated** (this seat re-plans nothing that landed); what this section adds is the three
facts the killed seat's death created:

1. **`f` inherits `evidence/w1/g20-join.mjs` and `evidence/w1/shots/` (11 JPGs ⊕ two JSON).** Both
   are inside its writable set. It reads the instrument whole and judges it against **G20's own
   retained detector** — a rival re-cut is the gate's FAIL clause, not a shortcut — and it keeps the
   shots only as rows of the WU-F ledger it must author anyway. **Nothing inherited counts until
   `f`'s own gates measure it green**, and the receipt names every inherited path.
2. **`f` reads unit `e`'s residual 1 (the ESC-4 ULP reading) and publishes a disposition** — the
   purpose clause is met by measurement, the literal clause is not on four survivor keys. `f` states
   which reading G19's record carries, or returns it to the owner named; it may not green the
   literal clause by re-interpreting it.
3. **`f` verifies `e`'s G15 commit-body half landed** (it did, `:147-151` above) **and writes the
   close report's half**, which is the only thing standing between G15 and GREEN.

**`f` is the seat that closes**, so E13's law binds it: no wave closes with UNREAD mail in scope —
`I-32` · `I-33` · `I-34` (materially consumed by `b`, durable cells Track D's) and the sibling-minted
**`I-35`** (Track B's, not F.W1's scope) are all named above so the close cannot forget them. **`f`
re-runs the four-path sweep at its own clock rather than trusting this table** — `I-35` arrived
inside this seat's own read-to-write window, which is the best available proof that a banked sweep
goes stale within the hour.

---

## Unit receipts — resume

### f

**SERVED MODEL: claude-fable-5-1** — F.W1 unit `f` (successor seat; the first `f` seat was killed by the 2026-09-18
host restart), Track C. Appended only (E-3). The close report of record is
**`docs/tranches/X/fourier/evidence/w1/F-W1-LOG.md`** (committed **`31e082ce`** with `G20-CLOSURE.md`, the two
instruments and `shots/`); this receipt is the act-by-act record and does not restate its tables.

#### Act 0 — crash-recovery sweep (STANDING LAW), before any other act

⟨cmd⟩ `git status --porcelain -- <the four writable paths>` → `M INBOX.md` (a sibling's uncommitted `I-35` row —
left out) · `M LEDGER.md` (siblings' cells — left out) · `?? evidence/w1/g20-join.mjs` · `?? evidence/w1/shots/`
(**the killed `f` seat's partial work — INHERITED**). fourier: `git status --porcelain | wc -l` → **0**.
**Judged whole**: `g20-join.mjs` (91 lines) implements the retained `(record, id)` join and re-cuts no denominator —
KEPT; its line-2 shebang below the line-1 `SERVED MODEL` comment made the file un-runnable under ESM
(`SyntaxError`, twice) — the one line deleted, nothing else touched. `shots/` (11 JPGs, `capture-records.json`
"sitting 4", `capture-transcript.json`) — the capture SCRIPT that produced them died with the host, so they are
KEPT as a **named prior run** and every verdict they carry was re-measured by this seat's own instrument before
being relied on. No inherited byte counted until my gates measured it.

#### Act 1 — G6, the four zero-console-error e2e gates (fourier's own suite, DEV server)

Stack: `scripts/e2e.sh --no-tests` + a scratchpad-homed `mongod`. ⟨cmd⟩ (cwd `web/`, twice)
`BASE_URL=http://localhost:3000 ADMIN_TOKEN=dev npx playwright test --project=chromium --reporter=list --workers=1 -g "no console errors|full lifecycle" e2e/visualization-crud.spec.ts e2e/workspace-flow.spec.ts e2e/contour-extraction.spec.ts e2e/gallery.spec.ts`
→ **`6 passed (26.4s)`** ×2, byte-identical. Anchors re-resolved at the true bytes (`:439/:482/:612` · `:175` ·
`:139` · `:118`); no spec edited, no filter added. Disclosed: (i) the four FILES under default `fullyParallel` →
`26 passed · 3 failed` — the three = CRUD lifecycle at three viewports timing out inside a raw
`fetch('/api/…/extract-contour')` under backend contention (`api/` untouched by `538db90`/`3bac3d5`; serial they pass
in 3.7–7.7 s) → finding F-3; (ii) `a11y keystone: ExportModal Dialog-open @ mobile` RED — axe contrast **4.33:1** on
8.0.0's `.segmented-tab` rest ink (producer `color-mix`, `17a11bc5:src/components/tabs/styles/segmented.css:267`),
not one of G6's four gates → finding **F-1**, a producer row (rides mail, never a frontend hack).

#### Act 2 — the ONE declared capture family (§5.2), `evidence/w1/capture-family.mjs`, run as `run3` and `run4`

READ-ONLY against the product (click · hover · drag · computed-style). Two instrument-correction runs (`run1`,
`run2`: a chevron sampler window too short for Playwright's actionability wait; a pencil selector) preceded them and
their outputs were removed before commit. Per-run console verdict lines (identical across `run3`/`run4` in every
verdict): **G10** 5/5 surfaces `completes=true animates=true` (`disclosure-close`, 188–233 ms) · **G12** 2/2 morphs
`idle>settle-out>morph>settle-in>idle`, `morphProgress` 1, 0 page errors (452–510 ms) · **G18**
`startScrub=true scrubbingMid=true(8/8) falseAfter=true endScrub=true calls=26` · **FR-CP-5**
`rotatesNotSnaps=true distinct=10 transitionProperty=rotate` · **ESC-3** 8/8 rendered `SelectTrigger`s carry
`glass-control-edge` (6 callsites / 5 files, incl. `AdminUserList.vue:252` via the store's own `activateAdmin`) ·
`console.error` lines **0** · `pageErrors` **1** (F-2, the pre-uplift router View-Transition abort on `/visualize→/w/`).
G18's action order (`seek` → `startScrub` → `seek(scrubbing:true)…`) reproduces **I-32 A-10** to the tenth of a
millisecond — **PD-1's disjunction is DISCHARGED on arm 2 (the producer docblock was false; A-10 already CURE-NOW)**,
never presumed. The prior run's five-surface / morph / drag / chevron verdicts agree.

#### Act 3 — G20, both legs, at the frozen operand (`G20-CLOSURE.md`)

⟨cmd⟩ `shasum -a 256 conformance/CENSUS-CANONICAL.md | cut -c1-12` → **`f44362757458`** ×2. Roster 65 lines · 330 ids
(both derivations) · paste `:550-614` byte-identical to the roster in every live id · spec-minus-paste 811 lines ·
carry 105 rows. Run ×2 (`diff` → ∅): **leg (a) 105/105** (the one tokenizer miss, `.dock-separator`, present at §5 and
§6 — `grep -c` → 3); **leg (b)** 235 record-qualified · 60 token-unique · 34 homonym-tail read cell by cell (21
BOOKED-by-identity · 12 CITED-by-fold · **1 escape-by-reading `fr-ContourSettings M-4`**) · **1 escape by bytes
`fr-ExportModal R2-1`** (folded by substance at §2·R2a.1, token absent) · **0 fabrications** (all 20 regex hits are
CITED/DISPOSED/STRUCK rows, read one by one). **Verdict: leg (a) GREEN · leg (b) RED by TWO named rows**, cure sized at
two spec rows — `waves/F-W1.md` is outside this unit's writable set → **ESCALATED to the spec seat (F-6)**. No
detector re-cut; no check file consulted as an operand.

#### Act 4 — the design and record acts (all in `F-W1-LOG.md`)

WU-F diff-review ledger 16 rows with shot citations (§6) · **CP-1 … CP-14** minted for F.W9/F.W10, CP-8/CP-9
BASELINE OWED (0 published cards in a fresh DB) · **G17's ordering ruling** written (§9: FR-EQC-3/FR-IC-19 retire at
F.W3 FIRST onto the surviving `cartoon-surface`, KILL-6 honoured, no consumer hover-lift; AA-4 `<Card>` adoption at
F.W4 SECOND, per-site by evidence) · **G16** re-stated on arm 2 with the latex-paper producer as named owner via
NWO-5, LAW-3 carried as bytes (§8) · **ESC-3** as a WU-F row + CP-11, not a port · **ESC-6** recorded at
`FR-COB-26` (Baseline 2023, INFO, no hand-authored fallback, 1.00:1 consequence) · **ESC-2** recorded and handed to
F.W4 with `L-5(a)` first, NOT executed · **G15(a)** stated in terms in the report AND verified in the transaction's
commit body (`538db90` body `:147-151`, ⟨cmd⟩ `git show 538db90 --format=%B --no-patch | grep -n "pagination\|AA-11"`
→ `:148` · `:151`) — and stated again in `31e082ce`'s body · **ESC-4 ULP** disposed (§10): EXECUTED on the purpose
clause, literal clause NOT met on four keys at ≤ 4.44e-16, returned to the owner as a one-line ask.

#### Act 5 — E13 at this seat's clock

Four paths + the Track-C extension swept (`find … -newermt '2026-09-18 00:00'`): 0 unrowed letters (every BK letter
has ≥ 1 INBOX row; the `o26-reply` is `I-35`, Track B's scope); 0 `I-n`/`O-n` minted; **`INBOX.md` NOT written and
NOT in any commit of this seat** (dirty with a sibling's `I-35` hunk). Wave-scoped mail: `I-32 A-10` READ and
consumed (Act 2). Status cells of `I-32..I-35` are Track D's.

#### Gate readings, BEFORE → AFTER (this unit's gates)

| gate | BEFORE | AFTER |
|---|---|---|
| G6 | atomicity GREEN · e2e UNRUN | **GREEN** — 6/6 ×2 |
| G10 | deletion GREEN · witness UNRUN | **GREEN** — 5/5 complete + animate ×2 |
| G12 | RED | **GREEN** — 4 morphs, `idle`, no throw |
| G15(a) | half (commit body only) | **GREEN** — both halves |
| G16 | GREEN arm 2 (unstated) | **GREEN** — re-stated, owner named |
| G17 | RED — unwritten | **GREEN** — ruling written |
| G18 | RED | **GREEN** — real drag; PD-1 discharged on I-32 A-10 |
| FR-CP-5 | unverified | **verified** — rotates, no snap |
| G20 | RED — unrun | **leg (a) GREEN · leg (b) RED by 2 named rows, 0 fabrications** |

Wave tally at the close: **17 GREEN · G2 DISCHARGED-as-owed · 2 RED (G9 by design → F.W3/W4; G20(b) two rows →
the spec seat)**. **The four-verb line does not move** — IMPLEMENTED stamps at G1–G20 green + close report, and
G20 is RED by two rows; no VERIFIED anywhere.

#### Residuals, escalations, commits

Residuals by owner: `F-W1-LOG.md` §11–§12 (F-1 producer/F.W3-W4 · F-2 F.W3/W4 · F-3 harness · F-4 F.W9/W10 ·
F-5 unit `d`'s bound question re-handed as a question · F-6 spec seat · F-7 census; the three relay packets stay
AUTHORED-AND-ROWED, NOT DELIVERED). **Escalation (ONE, non-blocking on any product byte)**: G20 leg (b)'s two rows
— `fr-ExportModal R2-1` (one CITED token at §2·R2a.1) · `fr-ContourSettings M-4` (a CITED row held F.W3/W4 beside
`m-17`, or a canonical errata) — writes to `waves/F-W1.md`/the census, outside this unit's bound. **Commits**:
`31e082ce` (evidence family, `docs(X·F): F.W1 close report`) · this record's append · the LEDGER row move (next).
Paths written: the four in the writable set minus `INBOX.md`; `dev.sh` untouched; fourier tree clean before and
after (`0`). **Self-count**: this block counts nothing of itself.
