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
