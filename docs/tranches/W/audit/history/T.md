# HISTORICAL AUDIT — TRANCHE T (hostile, adversarial; product = the next mega-tranche)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, running as an
Opus seat in the historical-audit fleet. Knowledge cutoff May 2026; the repo clock reads
2026-07-24. Nothing below is taken from a close document's own claim; every row is a command I
ran, a git object, or a `file:line` in the tree at `HEAD c654824e` (branch `tranche-u`).

---

## §0 — SCOPE, METHOD, AND THE HEADLINE

**Scope audited**: `docs/tranches/T/` (167 markdown files + 45 committed probe/log artefacts +
3470 untracked PNGs, 1.8 GB total), plus the T→U→V carry chain wherever a T commitment was said
to inherit, plus the live tree/CI/deploy at HEAD.

**Method**: (1) `ls -R` the scope; (2) build the commitment ledger from the mandate, the charter,
the 12 wave specs, the census of record and the close; (3) verify status against the CURRENT tree
and git history, never against the close's own claim; (4) extract every deferral/carry/book/
residual verbatim; (5) hunt renames across closes; (6) hunt promises that never appear again.

**Provenance sanity first.** I resolved every one of the 104 SHAs cited across `FINAL.md` and
`T-MARK-2026-07-12.md` against the object database. **All 104 resolve to real commits.** The merge
`6e14e90` and the annotated tag `tranche-t-close` both exist. T does not fabricate git objects.
That is the good news, and it is where the good news ends.

### THE HEADLINE

> **T's close is honest in its prose and hollow in its machinery.** The document names its misses
> with unusual candour — and then hands every hard thing forward under a doctrine ("books are
> never gates", PP-16, "zero silent drops = every row is *mentioned*") that makes it structurally
> impossible for the close to fail. Two tranches later the verification apparatus T built to cure
> its predecessor's disease — the O-1..O-26 oracle slate, the e2e suite, the CSS-emission probe,
> the HARD Lighthouse budget, the `test:dist` proof gates — **has been deleted from CI wholesale**
> (`ci.yml` 593 → 71 lines), the oldest chronics (**GAP-L2 / GAP-L5 / GAP-ARM**) appear **zero
> times in the entire tranche V corpus** despite their trigger event finally firing at V.W44, 19
> of the 20 taste brackets that constitute T.W8's certification package appear **zero times** in
> tranche U, and the production deploy still builds `color.babb.dev` against a glass-ui branch
> that **cannot resolve two of the demo's current imports**.

---

## §1 — THE COMMITMENT LEDGER (149 distinct commitments across 6 registers)

Built by enumeration, not by trusting the close's own counts.

| Register | Source | Count | Verified landed & surviving at HEAD |
|---|---|---|---|
| **A** — owner findings T-1..T-61 | `MANDATE-2026-07-06.md §0` + §0.5/§0.6/§0.7/§0.8 | **61** | **36** claimed LANDED-at-root; I spot-verified 12 in the tree, 12/12 survive |
| **B** — load-bearing fleet finds | `SYNTHESIS §1.2` (MOB-1/2 · CC-1 · A11Y-F1..F4 · LEG-1..9 · PI-1..6 · DOC-1..13) | **35** | **21** (DOC-1..13 landed at U then **deleted** at V — see §4-S4; CC-1 producer-gated) |
| **C** — E-4 deferred-fold rows | `FINAL §2.3` bullets (S books → T homes) | **14** | **6** durably (L1 · TA-4 · dup-`useDark` · oracle-floor F3/F4 · X1 · X2); `proof:*`/`test:dist` landed then **deleted** |
| **D** — edicts E-1..E-7 | `MANDATE` + `SYNTHESIS` | **7** | **7** executed in form; E-5's object (the owner-line index) rides an **unruled** package |
| **E** — the W8 taste brackets B-01..B-20 | `w8-certification/PACKAGE.md §2` | **20** | **0 ruled** (HG6 stub empty at HEAD); 11 had a landed cure presented, 9 never landed |
| **F** — wave gates | `waves/T.W0..T.W9` (incl. W4.5, W6.5) | **12** | 2 `complete` · 9 `complete_with_misses` · 1 `TRIGGER-NOT-FIRED` · **0 FAILED** |
| | | **149** | **70** |

**Census-integrity check (T's own claim, verified).** `FINAL §2.1` asserts *"every integer in
[1,61] appears exactly once in the census of record, `audit/T-MARK-2026-07-12.md §2`"*. I
enumerated the table rows:

```
$ sed -n '72,151p' docs/tranches/T/audit/T-MARK-2026-07-12.md | grep -cE '^\| \*\*T-[0-9]+\*\*'
60
# T-1 … T-60, each exactly once; T-61 lives at MANDATE §0.8:326.
```

**The claim holds arithmetically.** It is the *only* zeroDrop sub-claim that survives contact
intact — and it proves only that 61 integers were written down.

### 1.1 — The census of record is STALE relative to the close it certifies

`FINAL §2.1`: *"the per-finding state table this close certifies rather than duplicates"* →
`T-MARK-2026-07-12.md`. But T-MARK is stamped at head `95d806d` (T-MARK:15) and its own §1 row for
W8 reads:

> `T-MARK-2026-07-12.md:51` — **"T.W8 … DISPATCHABLE / IN FLIGHT (round 5) — NOT CLOSED …
> passes filed 8/≈11; Remediate phase NOT started; package NOT assembled"**

`FINAL §1` reports W8 as `complete_with_misses` with **11 passes filed, 29 LAND rows merged, the
package assembled** (`286619e`). So the close **certifies a census that predates the wave it is
certifying**, and never regenerates it. §3 of that same stale document is explicitly *"the
successor's inbound work list"* (T-MARK:7, :156) — meaning **tranche U's declared inbound backlog
was a pre-remediation snapshot**. This is not a lie; it is a load-bearing staleness that the close
paragraph papers over with the word "certifies".

### 1.2 — An arithmetic contradiction the close admits but never fixes

`FINAL §1` W8 row and §7.2 both carry the parenthetical *"the 29 LAND rows [§7.2 enumeration; the
pre-P9 scalar read 24]"*. Confirmed live:

```
$ rg -n "24 LAND|LAND rows" docs/tranches/T/audit/w8-certification/ROWS.md
202:- **Landed defects (this wave)**: 24 LAND rows across 6 lanes …
```

The **census of record still says 24**; the close says 29 and annotates the discrepancy rather
than correcting the source. A ledger that documents its own wrong number instead of fixing it is
not a ledger; it is a footnote. **Successor risk**: any U/V/W automation that counts LAND rows
from `ROWS.md` inherits 24.

---

## §2 — VERIFIED LANDINGS (the sample; T does land real work)

Hostility requires acknowledging what is real. Twelve spot-checks against HEAD:

| Row | Claim | Verification at HEAD |
|---|---|---|
| **MOB-1** (the sole W1 FAIL, discharged W6 `a92f501`) | `data-layout` witness stamped | **CONFIRMED** `demo/color-picker/App.vue:2` — `:data-layout="isDesktop ? 'desktop' : 'mobile'"` |
| **T-12** `.search-seated` | W3-3 `e4dd2ee` | **CONFIRMED** `demo/styles/utils.css` + 3 pane consumers |
| **T-9** dock status lamp | W6-6 `e4ddd32` | **CONFIRMED** `demo/shell/dock/DockStatusLamp.vue`, `status-lamp.ts` |
| **T-56 / WR-8** ramp resolver (the A-class near-black clamp) | `ccf4b30` | **CONFIRMED** `demo/color-session/palettes-ramp.ts` + the O-14 feasibility leg `e2e/smoke/oracles/o14-preview-truth.spec.ts:141,253,404` guards `L≈0.02` |
| **T-57 / WR-9** `--dock-h` floor | `31e7c09` | **CONFIRMED** `demo/styles/foundation.css:422` `--dock-band-min-h`; `shell.css:44` consumes it. Live probe `pi/u-gestalt/probe-log-dock.txt` measures `scene-shift=0` (was +3.0px) |
| **T-49c / WR-2** fission armed | `5cecdf2` | **CONFIRMED** `demo/picker/visual/HeroBlob.vue:170` `fissionAmp: HERO_FISSION_AMP` |
| **X1 / X2** | prod api + NCSU 301 | Records restated; **UNVERIFIED at this seat** (network) — see §6-M6 |
| **L17** `GooBlob`→`Blob` consume | booked to W7 | **LANDED late** — demo imports `@mkbabb/glass-ui/blob`, zero `goo-blob` subpath imports |
| **Root-barrel sweep** | demo root-barrel imports = 0 | **CONFIRMED** `grep -c 'from "@mkbabb/value.js"' demo/` → 0 |
| **`export *` = 0 in src** | W1 claim | **CONFIRMED** — zero hits |
| **Boot screencast 1543 frames** | PACKAGE §4 | **CONFIRMED on disk**: 383+392+357+411 = **1543** |
| **T-48 motion captures, 8 hops** | PACKAGE §1 | **CONFIRMED on disk**: 8 dirs under `pi/w8/motion/` |

T's design work is real, and its probe corpus is real. The failures below are **structural**, not
fabricated-evidence failures.

---

## §3 — THE DISEASE ROWS (chronics: deferred at close N, re-deferred at close N+1)

This is the highest-value section. An item that rode ≥2 closes un-decided is a disease row.

### D-1 · GAP-L5 — the blob `settled` seam · **6 CLOSES** · **THE DISEASE ROW OF RECORD**

**Aliases across closes**: `GAP-L5` (K→N→M→S→T, T's own §7.1 lesson 2 names the chain) ·
"satellites never meatball off" (**T-8**) · "blob halves / `settled` seam NOW load-bearing"
(`FINAL §5`) · "**WR-2** fission register" (`ROWS.md:171`) · "**T-49** blob gray fade-in +
satellites" · "**U-F5** blob-card-seat … producer GAP-L5→ADOPT" (`U/FINAL.md:43`).

**T's disposition**: `FINAL §5` — *"rides the blob co-rebuild; no `settled` export at HEAD;
**anchors the Q14 RP-2 clear**"* → U.W-ADOPT + U.W-PERF.
**U's disposition**: rode the unfired v5 cut (51 mentions in U's corpus).
**V's disposition**: **NONE.**

```
$ rg -c "GAP-L5" docs/tranches/V -g '*.md'
(no output — ZERO matches in the entire tranche V corpus)
```

**Why this is the disease row and not merely a carry**: the trigger **FIRED**. `CARRY-LEDGER.md:103`
— *"W44 CLOSED GREEN-WITH-RESIDUALS 2026-07-17 — **Glass 7.0.0 ADOPTED WHOLE**"*. The adopt event
that GAP-L5 waited six closes for happened, and GAP-L5 was not in the room. Verified consequences
at HEAD:

1. **The producer still has no cure.** `rg "settled|isQuiescent|quiesc" ../glass-ui/dist/blob.d.ts
   ../glass-ui/dist/blob-config.d.ts` → **zero hits** at glass-ui 7.0.0.
2. **The demo still ships the interim**, with its own source comment naming the dead book:

   > `demo/picker/visual/HeroBlob.vue:202-212`
   > ```
   > // WR-2 / T-49c — THE PARK RUNWAY EXTENSION: one fission BEAT is 5.2s … the former 2.7s park
   > // froze the resting colony mid-split … The idle-CPU cost of the longer live window is the demo
   > // INTERIM; the producer `settled`/park-from-quiescence seam (GAP-L5, booked at the 5.0.0
   > // adopt) restores the tight park by consulting the engine's quiescence read instead of the
   > // wall clock (t49-research §2.3).
   > const BLOB_IDLE_MS = 2000;
   > const SLEEPY_POSE_MS = 3300;
   > ```
3. **The book cites a version that was skipped.** "booked at the 5.0.0 adopt" — the tree went
   4.2.0 → **7.0.0**. The waypoint the book named no longer exists on the adoption path.
4. **A named idle-CPU cost is shipping in production** as the price of the missing seam — on a
   product whose binding defect is TBT ~20× over budget (§7).

### D-2 · GAP-L2 — the aurora variance-atom / `lBand` door · **3+ CLOSES, T calls it "OLDEST"**

`FINAL §5`: *"door surface now present in-tree … verify-at-adopt (**OLDEST, S→T**)"*.
U: 11 mentions. **V: `rg -c "GAP-L2" docs/tranches/V -g '*.md'` → zero.**

The tree still carries it as a live obligation against a wave that closed TRIGGER-NOT-FIRED:

- `demo/color-picker/composables/boot/useAtmosphere.ts:234` — *"the atoms door ships no
  scheme/lBand (**GAP-L2**, probed at this dist …) — that half rides packet P1 and **the W7
  re-verify**; the ground meets the dark field the day the atom lands."*
- `demo/color-picker/composables/boot/atmosphere-calibration.ts:24-26` — *"**Q2-FULL (P1-GATED,
  re-judged at W7 — deliberately NOT landed here)**: chroma-adaptive hueSpread … the dark lBand —
  all atom-unreachable at the consumed dist"*
- `demo/test/glass/aurora-bracket.test.ts:29` — *"the FULL-composition re-run (hueSpread formula ·
  counterpoint · drift · lBand) is a **W7 verify-at-cut row** (Q2-FULL, P1-gated)"*

**T.W7 is a wave of tranche T. It closed TRIGGER-NOT-FIRED on 2026-07-12. The source tree at
2026-07-24 still points three obligations at it.** Two producer cuts have shipped since.

### D-3 · GAP-ARM — the cold-load arm-replay · S→T→U, **V: zero**

`FINAL §5`: *"REWORKED toward the cure in-tree … verify-at-adopt"*. U: 9 mentions. V: **0**.
Same shape as D-1/D-2: a verify-at-adopt obligation whose adopt fired unattended.

### D-4 · The `tranche/BG` CI un-pin — T→U→V, **still pinned, and now BREAKING**

`FINAL §5` books *"CI un-pin from `tranche/BG`"* into the adopt-event class. `U/FINAL.md:40`
records U-F2 *"the 7 `tranche/BG` pin-retirement … authored"*. At HEAD:

```
.github/workflows/deploy-pages.yml:76  - name: "Checkout glass-ui @ tranche/BG (… un-pin at the 5.0.0 master landing)"
.github/workflows/deploy-pages.yml:80    ref: tranche/BG
```

This is **the deploy-of-record for color.babb.dev** (deploy-pages.yml:1-9). See §7-G3 for the
resulting live break. **The un-pin has ridden three closes and is not merely undone — it is now
actively wrong**, because the tree it deploys has moved to glass-ui 7.0.0.

### D-5 · HG5 — the demo ≤400 LoC cap · T.W8 → U.W-DEMO → **breach GREW**

T booked it explicitly as *"a remediation act, not a gate act"* (`FINAL §5:313`). U re-booked it
with the vacuity stated out loud:

> `U/FINAL.md:145` — *"**U.W-DEMO §BOOKS** — a demo-hygiene lane (re-encapsulate below ≤400),
> verify-at-execution, **NO gate**"*

At HEAD the breach has **doubled**:

```
417  demo/color-picker/App.vue
414  demo/picker/ColorPicker.vue
408  demo/scenes/about/markdown/Markdown.vue     ← T-close figure, byte-unchanged
406  demo/color-picker/composables/boot/useAtmosphere.ts
```

T close: 2 files over cap. HEAD: **4** (excluding `demo/test/export/byte-exact.test.ts` 453).
`Markdown.vue` is still **exactly 408**, i.e. untouched in two tranches.

### D-6 · HG6 — the owner taste verdict · **STILL EMPTY, AND SILENTLY NARROWED**

T's HG6 is the T.W8 §Hard gate row 6: the owner's verdict over the **20-bracket certification
package**. At HEAD:

```
$ cat docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md
…
## THE RULING (owner writes below — verbatim)
> _(empty — the owner's verdict lands here)_
```

**Empty 11 days and two tranches later**, and T was **merged and tagged anyway** — see §8.

**The alias smuggle.** In U, HG6 is redefined into something far smaller:

> `U/audit/w-close/annex-packet.md:239-243` — *"**The verify-at-execution half** (the HG6
> demo-caps re-encapsulation) rides U.W-DEMO's BOOK … **The TASTE verdict — whether the HG6
> re-encapsulation READS right** — is the owner's terminal call"*

That is **HG5's** subject (the ≤400 re-encapsulation), wearing **HG6's** name. The 20 taste
brackets — the actual object of T's HG6 — are absent from U's stub. A gate over the whole
product's taste was, at the T→U boundary, re-described as a gate over whether two split files
read nicely. **This is the single cleanest instance of alias smuggling in the corpus.**

### D-7 · Q14 LCP/TBT — **escalated at S, escalated at T, escalated at U, unmeasured at V**

T (`FINAL §3`): LCP **5141 ms** vs ≤2500 (2.1×), TBT **5988 ms** vs ≤300 (20×) → the RULED
ESCALATION → U.W-PERF. U (`U/FINAL.md:41`): *"ESCALATE DELIVERED-as-structural-fact … LCP ~4919
local/5141 CI … `lighthouserc.json:13` untouched (Q14 verbatim)"*. V: booked to **W55**
(`CARRY-LEDGER.md:29` — *"CH-4: p75 LCP ≤2.5s … the ~5s boot dies or V′ does not close"*), a wave
that has not run. `POST-U-AUDIT.md:43` measures *"the standing mobile LCP is roughly 4.9–5.1s"*.

**Three closes, three escalations, zero movement.** And the enforcement is now gone — §5-V5.

### D-8 · PRM-expand (keyframes `springPlay`) — K-era → S → T → U(3) → **V: 0**
### D-9 · The PARK/DORMANT set — `Color.try()` (3 wraps) · `usePaletteStore` migration v1 · S.H3 Pratt (PT-E no reply) — parked at S, re-parked at T (`FINAL §5:317`), re-parked at U. Never decided.
### D-10 · L8 — glass-ui ask, **"5th booking, ESCALATED"** at T (`FINAL §5:314`); folded into U-F2's constraint list; not visible as a decided row anywhere.

**Chronic tally: 10 disease rows. Three of them (D-1/D-2/D-3) vanish entirely at V, at the exact
moment their trigger fired.**

---

## §4 — SILENT DROPS (promised, never appears again, not in the tree)

### S-1 · **19 of the 20 W8 taste brackets** — zero mentions in tranche U

The certification package's core deliverable is `PACKAGE.md §2`, 20 bracket rows B-01..B-20, each
with two named reproducible poles. I searched all of `docs/tranches/U/`:

```
B-01: 6 hits      B-02..B-20: 0 hits each
```

**B-01 alone crosses** (as `T-61/T-42 B-01` inside U-F9; re-cured `cfa8c31`/`be807ce` — a genuine
landing). Eight more cross **under their T-# names only** (B-08/09→T-49, B-10→T-50, B-11→T-51,
B-12→T-53, B-13→T-55, B-14→T-56, B-15→T-59), losing the two-pole bracket framing that made them
owner-rulable. **Nine have no T-# anchor at all** and cross by no route whatsoever:

| Bracket | Subject | hits in U | hits in V |
|---|---|---|---|
| **B-03** | R3/T-26 sage-whisper floor (`vividness(0)=0`, band C≈0.004) | 0 | 6 (unrelated "whisper" prose) |
| **B-04** | R5/C-4 rail α face (Fraunces-fallback Greek α↔Latin a) | 0 | 0 |
| **B-06** | R8/Q2 boot-settle target (measured 1732–2059ms vs ratified [1.4,1.7]s) | 0 | 0 |
| **B-07** | C-2/P1-B2 header 4th-alpha cell (T-7 "x, y, z, or more if needed") | 0 | 0 |
| **B-16** | AB-5 content-heading weight (does T-2's non-bold extend to body?) | 0 | 0 |
| **B-17** | E1-B1 extract track-voice | 0 | 0 |
| **B-18** | P7-B1 gradient hatch-dominance (`AXIS_HEADROOM = 1.15`) | 0 | 1 |
| **B-19** | P8-B1 easing authoring-canvas (304px, 119px right gutter) | 0 | 11 (surface reworked; bracket unruled) |
| **B-20** | A-1 loading-skeleton register (T-41 "shimmer as a proper skeleton") | 0 | 0 |

**SILENT DROP — 9 rows.** These were assembled, photographed, bracketed, and handed to an owner
who has not ruled; then the successor's ledger did not carry them.

### S-2 · The **W4.5 seven** — `"W4.5"` appears **zero times** in tranche U

T.W4.5 dispositioned 17 rows: *"5 LAND-NOW · **7→W8** · 3→W6 · 2→producer"* (`FINAL §1`). The
seven (R3/R5/R7/R8/C-2/C-3/C-4) became W8 brackets (`T-MARK:176`). U never names the wave or the
seven. They ride only inside B-03/B-04/B-05/B-06/B-07 — which are themselves S-1 drops.

### S-3 · `test:dist` and the 5 retained proof gates — **DELETED**

`FINAL §2.3`: *"**`proof:*` carry (Q13)** → W0-2, **DISCHARGED** (`test:dist` = the 5 retained
gates; 7 excised)"* — one of only six rows T marked RETIRE-not-handed. At HEAD:

```
$ grep -n '"proof:\|"test:dist' package.json     # → no matches
$ git log --oneline -S'"test:dist"' -- package.json
164343c1 feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees
```

`164343c1` (2026-07-17) deleted `scripts/gates/proof-*.mjs` (8 files), `scripts/ci/abrogation-sweep.mjs`,
the whole `bench/` tree (12 files), and 730 lines of `ci.yml`. **A RETIRED-not-handed discharge was
itself retired, with no successor row.** Note the compounding irony: U's own close gate
`proof:close-ledger` — the instrument that "PROVED" U's zero-silent-drop contract
(`U/PROGRESS.md:126`) — was wired via this same `test:dist` and died with it.

### S-4 · DOC-1..13 — landed at U, then **the deliverable AND its gate deleted at V**

T (`FINAL §2.2`): *"**LANDED-partial** … the demo/api CLAUDE.md + root Structure rewrites are the
W9 doc-rewrite lane's deliverable"* → handed to U. U discharged it properly:

> `U/FINAL.md:59` — *"U-F21 … **LANDED** `a31f2d1` — G-CANON-2 born-RED→GREEN; canon-sync-lies 4→0
> (root+api Structure regen · README "15"→17 · +`demo/CLAUDE.md` +`demo/DESIGN.md`);
> `test/dist/canon-sync.test.ts` (regenerable)"*

At HEAD:

```
$ ls CLAUDE.md api/CLAUDE.md demo/CLAUDE.md test/dist/canon-sync.test.ts
(all four absent)
$ git log --oneline --diff-filter=D --all -- CLAUDE.md api/CLAUDE.md demo/CLAUDE.md
a68ecdc1 feat(demo)!: v4 consumer migration + ruled retirements
164343c1 feat(v4)!: value 4.0 producer surface + packed-surface gate
$ git log --all --oneline -- test/dist/canon-sync.test.ts | head -2
3b5956d0 test(v4): producer-surface behavior tests
7334c793 feat(package-v4): cut the exact-seven immutable capability surface   ← deleted here
```

**The full cycle: T defers → U lands with a regenerable gate → V deletes both the docs and the
gate.** And T's `FINAL §6.2` sweep asserts *"**Matches CLAUDE.md exactly**"* — the referent no
longer exists, so that sweep is now unanchored (and the number has drifted: `as unknown as` in
`src/` was **8** at T close, is **17** at HEAD, 12 of them in `src/color/anchors.ts` alone).

### S-5 · **THE VERIFICATION APPARATUS ITSELF** — the largest drop in the corpus

At T close (`git show 6e14e90:.github/workflows/ci.yml`), CI was **593 lines** with five jobs:

```
38:    build-and-test:
262:   e2e-smoke:
358:   e2e-safari:
456:   gh-pages:          ← CSS emission probe (BLOCKING) + Lighthouse CI (HARD, S.W0 W0-2b)
541:   boot-smoke:
```

At HEAD, `ci.yml` is **71 lines** with two jobs: `producer` and `api`. **`e2e-smoke`,
`e2e-safari`, `gh-pages` (CSS-emission probe + Lighthouse), and `boot-smoke` are all gone.**

The tree still holds **71 Playwright spec files** across **6 configured projects**, including
`e2e/smoke/oracles/` (25 specs: O-1, O-7, O-9, O-10, O-10d, O-11, O-12, O-14, O-15, O-16, O-17,
O-18, O-19, O-20, O-21, O-22, O-26, O-27, T-31 dock-band, readout-seam…) and the three standing
born-RED `test.fail()` legs (`o16-computed-cascade.spec.ts:34`, `o26-aurora-perceptibility.spec.ts:57`,
`perf/o5-boot-pacing.spec.ts:48`). **No workflow runs any of them** — `rg "playwright|test:e2e|
boot-smoke|css-emission|e2e" .github/workflows/*.yml` → zero hits.

Read this against T's own §7.1 lesson 1:

> `FINAL §7.1:390` — *"**The named-site-not-population verification method was T's own indictment,
> and §6's oracle slate is the fix.** … the census classes (O-7, O-9, O-14, O-18) are population
> gates **by construction**."*

The cure T minted for its predecessor's disease is now dead code. **A born-RED leg that nothing
executes is not an honest red; it is a comment.**

### S-6 · The HG7 cure was **reverted**

T.W6.5 closed a GENUINE FAIL by two cohesion lifts (`69500b7`): `ink.ts` 423→292 via
`ink-walk.ts`, and `useColorPipeline.ts` 403→373 via `useAtmosphereFrameCoalesce.ts`. At
`a68ecdc1` (V-era): `demo/@/composables/color/ink-walk.ts` **deleted** (−152), `ink.ts` rewritten.
`useAtmosphereFrameCoalesce.ts` survives; `ink-walk.ts` does not. The cap-cure that flipped a
GENUINE FAIL to PASS was undone without a row.

### S-7 · `pi/u-gestalt/` — 74 artefacts of live gestalt evidence, **never committed, never cited**

Eleven instruments/logs + 64 frames, produced 2026-07-12 (in T's close window), sitting untracked
in T's audit dir. `probe2-log.txt` contains hard T-58 jank measurements nobody folded:

```
TRANSITION swap→/gradient: {"frames":14,"max":154,"median":59,"over32":10,"over50":8}
TRANSITION swap→/mix:      {"frames":19,"max":111,"median":48,"over32":12,"over50":6}
```

That is 10-of-14 frames over 32 ms on a scene hop — the exact defect T-48/T-58 escalated three
times. U preserved the directory as *"`u-gestalt` 51 MB load-bearing π-frames PRESERVED"*
(`U/PROGRESS.md:126`) — preserved, but **the measurements were never entered into any ledger**.
It is evidence in a drawer.

---

## §5 — VACUOUS GATES (a gate that cannot fail)

For each, I state the exact input that would make it RED. Where no such input exists, I say so.

### V-1 · **T.W9 §Hard gate row 4** — the Q14 close gate — **VACUOUS**

> `waves/T.W9.md:137-141` — *"**The Q14 close gate**: the §6.2 budgets re-run on the built bundle —
> **LCP/TBT GREEN, or the triumvirate-level owner escalation naming the physical blocker encoded
> in FINAL.md**"*

**What input makes this RED?** No measurement does. LCP 2400 → green arm passes. LCP 5141 → write
the escalation paragraph, escalation arm passes. LCP 50 000 → same paragraph, same pass. The gate
forbids three escape hatches (re-baseline, preset-swap, deferral) and then installs a fourth with
no acceptance precondition inside the gate. **The only RED input is failing to write the
paragraph.** T took the escalation arm (`FINAL §3`), as did U (`U/FINAL.md:41`). A gate that both
successive closes discharged by prose is a prose gate.

### V-2 · **T.W7, entire wave** — **VACUOUS BY CONSTRUCTION**

Eight hard-gate rows (`T.W7.md:109-126`) including *"row 8 — THE Q14 GATE ROW … TBT + JS-eager
deltas MEASURED at wave close"*. Every row is conditioned on a producer tag that a third party
controls. `FINAL §1`: *"**TRIGGER-NOT-FIRED** — recorded as-is (PP-5: books never gates) … **Not a
miss**"*.

**What input makes T.W7 RED?** None available to this repo. And this wave-sized vacuum swallowed
the highest-value payload in the tranche: the adopt-event class, GAP-ARM/L2/L5, L17, L20, RP-2,
the whole §7.2 producer-consume swap set, and the `/parsing` dead-payload split. **Every one of
the §4 and §3 disease rows routes through this un-failable wave.**

### V-3 · **The zero-drop completion criterion** — **VACUOUS**

> `FINAL §2:86-89` — *"**The completion criterion is zero silent drops.** Every owner finding …
> reconciles to exactly one of: **LANDED at root** · **BOOKED to tranche U by name** ·
> **PRODUCER-GATED** · **KILLED with rationale**."*

Four dispositions that exhaust the space, one of which ("BOOKED by name") is unconditionally
available for any row. **What input makes this RED?** Only forgetting to mention a row. This gate
measures **documentation completeness**, not work completion — and the close names it "the
completion criterion". §4 above demonstrates the failure mode empirically: 9 brackets that were
never even booked slipped through a gate that could not detect them, because the gate audits the
close document against itself.

### V-4 · **PP-16** — the verdict vocabulary has no failure state

*"gates-pass-goal-unmet closes `complete_with_misses`, never `complete`"*. There is no `FAILED`
and no `OPEN` in the vocabulary. Result across 12 waves: **2 `complete`, 9 `complete_with_misses`,
1 `TRIGGER-NOT-FIRED`, 0 failures** — on a tranche that shipped a product 2.1× over its LCP budget
and 20× over TBT, with its terminal certification gate un-ruled. **A naming law that guarantees a
floor is not honesty; it is a ratchet.**

### V-5 · **`lighthouserc.json`** — error-level budgets, **no runner** — **VACUOUS AT HEAD**

The file is intact at repo root, LCP `["error", {maxNumericValue: 2500}]`, TBT `["error", 300]`,
its own header comment reading *"**HARD since S.W0 W0-2(b)**"*. U's close proudly records
*"`lighthouserc.json:13` untouched (Q14 verbatim)"* — i.e. the budget was never weakened. But the
**Lighthouse CI step that consumed it was deleted** with the `gh-pages` job (§4-S5). The budget is
now a config file that no process reads. **What input makes it RED?** None; nothing runs it. This
is the purest masked fallback in the repo: the number was preserved and the enforcement was
removed, so the artifact reads as a live hard gate to any future auditor.

### V-6 · **U.W-DEMO §BOOKS / HG5** — vacuity declared in the text

*"verify-at-execution, **NO gate**"* (`U/FINAL.md:145`). Self-documenting. Breach doubled (§3-D5).

### V-7 · **`FINAL §6.2` sweeps** — unanchored at HEAD

*"**Matches CLAUDE.md exactly**"* — referent deleted (§4-S4). The `as unknown as` ledger drifted
8→17 with no gate to catch it.

**Vacuous-gate tally: 7, of which V-1/V-2/V-3 are the load-bearing ones — they are precisely the
gates guarding the perf redemption, the adopt event, and the zero-drop contract.**

---

## §6 — DECLARED CAPTURES MISSING ON DISK

I `ls`/`git cat-file`-checked every artefact class the close names.

| # | Declared | Where declared | On disk? |
|---|---|---|---|
| **M-1** | `pi/w2/screencast/` — the W2 boot baseline the W8 screencast is judged against | `PACKAGE.md:173` and `PACKAGE.md §2 B-06` (*"boot screencast `boot/*` vs W2 baseline `pi/w2/screencast/`"*) | **ABSENT.** `pi/w2/` holds 4 files (`headed-annex-log.txt`, `o24-lcp-before.md`, `w2-annex.mjs`, `w2-close-artefacts.md`). **B-06's owner bracket cites a comparand that does not exist** |
| **M-2** | `pi/t60/` — the T-60 forensic probe dir, "live at the mark" | `T-MARK §4.2:242-244` | **ABSENT.** `ls docs/tranches/T/audit/pi/` → `u-bh-communique-draft.md u-gestalt w2 w45 w8 w9` |
| **M-3** | `audit/w9-close/sweeps.log` — **Close verification act #1** | `FINAL.md:12` | **On disk but NEVER COMMITTED.** `git log --all -- …/sweeps.log` → empty; `.gitignore:` `*.log` swallows it. The primary evidence for T's static close gates exists on exactly one machine, in no git object |
| **M-4** | The entire taste-evidence corpus — 3470 PNGs, **1.8 GB** | `T-MARK §4.2` ("gitignored-by-class on-disk") | **0 tracked.** `git ls-files docs/tranches/T \| grep -c png` → **0**. `.gitignore: *.png` + `!demo/**/*.png`. **HG6 is still pending against evidence that survives only as untracked local disk.** A `git clone` of this repo cannot audit T.W8 |
| **M-5** | The tag `tranche-t-close` as the close artifact | `FINAL.md:23-33` (ceremony record) | **Tag points at `6e14e90`, whose `FINAL.md` reads "THIS DOCUMENT IS CLOSE-READY, NOT MERGED … the git ceremony is not performed."** The real close record landed after the tag at `e97a9d1`. **Checking out the immutable close artifact yields a document denying the close happened** |
| **M-6** | X1/X2 live re-probe (`/health` 200 @ `0441aba`, NCSU 301, `deploy.babb.dev` hook) | `FINAL §4:287-290` | **UNVERIFIED at this seat** (no network egress). *To verify*: `curl -s -o /dev/null -w '%{http_code}' https://api.color.babb.dev/health` and `curl -sI https://mbabb.fi.ncsu.edu/colors/`. Flagged because U itself re-classed the NCSU leg **"attested-not-verified"** (`U/FINAL.md:99`, U-F61 claim 1) — the single-sourced claim was already known-soft one tranche later |

Positive controls (so the reader knows the check has teeth): the 1543-frame boot screencast, the 8
motion-hop dirs, `w2-annex.mjs`, all 45 committed `.mjs`/`.txt` probes, `e2e-certification.md`,
`ceremony-sweep.md`, `ceremony-deploy.md`, `e2e-merged-tree.md`, and all 104 cited SHAs — **all
present**.

---

## §7 — GREEN-OVER-BROKEN, MASKED FALLBACKS, ALIAS SMUGGLING

### G-1 · The "final confirmation" e2e ran against a **reconstructed** substrate

`w9-close/e2e-merged-tree.md` is admirably explicit, and that is what makes it damning:

> *"the merged value.js tree still imports `@mkbabb/glass-ui/goo-blob` … Against the drifted live
> glass-ui the demo build **dies** at resolve (`"./goo-blob" is not exported`), so a naive re-run
> is impossible."* → cure: `git worktree add … 17e0f522`, build, re-point only the ceremony
> worktree's symlink. *"Every number below was measured against value.js master `e97a9d1` ×
> glass-ui **`17e0f522`** (the T-certified substrate)."*

So the §8 ceremony's "final confirmation on the merged sha" was measured against a **pinned
producer worktree that no consumer environment uses**. Disclosed — and still: **at the moment
`tranche-t-close` was cut, the tagged tree could not build against the live producer.** The
document calls this *"a pending cross-repo adopt-event, NOT a value.js merge defect."* For a
consumer whose product is the demo, a tree that does not build against the producer HEAD **is** a
defect; classifying it as someone else's event is the mechanism by which it survived to §7-G3.

### G-2 · The deploy trigger no longer matches its own stated invariant — **PLAUSIBLE break**

```
.github/workflows/deploy-pages.yml:28   # Must match the `name:` of .github/workflows/ci.yml exactly.
.github/workflows/deploy-pages.yml:29   workflows: ["CI"]
.github/workflows/ci.yml:1              name: ci
$ git show 6e14e90:.github/workflows/ci.yml | grep -n "^name:"
20:name: CI                       ← at T close it DID match
$ git log --oneline -S'name: ci' -- .github/workflows/ci.yml | head -1
164343c1 feat(v4)!: …            ← the case changed here
```

The file's own load-bearing comment is violated. **Failure scenario**: a green master CI run
completes; `workflow_run` does not match `["CI"]`; the deploy job never queues; `color.babb.dev`
silently stops updating with no red anywhere. Marked **PLAUSIBLE** rather than CONFIRMED — I
cannot execute a GitHub Actions run from this seat. *To verify*: `gh run list --workflow=deploy-pages.yml
--limit 10` and compare `createdAt` against master pushes since `164343c1`.

### G-3 · **The production deploy builds against a producer that cannot resolve the demo's imports** — CONFIRMED

`deploy-pages.yml:76-80` checks out `mkbabb/glass-ui @ tranche/BG` and builds its dist, then
builds the demo. Local `tranche/BG` is **glass-ui 5.0.0**. The demo at HEAD imports 20 glass-ui
specifiers. Diffing against `tranche/BG`'s exports map:

```
$ git -C ../glass-ui show tranche/BG:package.json | python3 -c "…"
BG version 5.0.0
MISSING from tranche/BG exports: ['./blob', './chip']
```

`@mkbabb/glass-ui/blob` and `@mkbabb/glass-ui/chip` **do not exist** in the pinned branch, while
`package.json:83` declares `"@mkbabb/glass-ui": "^7.0.0"` and V.W44 "adopted Glass 7.0.0 WHOLE".
**The deploy-of-record for `color.babb.dev` builds the demo against a producer missing two of its
imports.** This is the direct, still-live consequence of D-4 (the un-executed `tranche/BG` un-pin,
booked at T, re-booked at U, never done), and it is a **strong root-cause candidate for the
V.W44-carried "gh-pages prod-preview empty-mount"** residual the owner named as the first
deep-audit probe. *Caveat, stated honestly*: I verified the **local** `tranche/BG`; the workflow
checks out the **remote** `mkbabb/glass-ui` ref. *To verify*: `gh api repos/mkbabb/glass-ui/contents/package.json?ref=tranche/BG`.

Note what this does to T's own §4/§6.3 claim: **"O-25 (prod-lineage) GREEN against the deployed
artifact."** O-25 asserts sha equality, not build integrity. A stale-or-broken production build
whose sha matches passes O-25. The oracle was minted to catch "the next stale-prod window"
(`ROWS.md:598`) and is structurally blind to the failure that actually occurred.

### G-4 · Alias smuggling — HG6 → "the HG6 re-encapsulation" (§3-D6). The only clean alias smuggle found, and it is a big one: a whole-product taste gate re-scoped to a two-file hygiene question at the tranche boundary.

### G-5 · Not found (recorded for completeness). I hunted for compat shims and found none: `export *` in `src/` = **0**; demo root-barrel imports = **0**; `atomDiff` excised as claimed. T's "clean break" claims (W1 E-1, TA-4, dup-`useDark`) are **honest**.

---

## §8 — PARTIAL COUNTED AS DONE (the cardinal sin)

### P-1 · T.W8 was verdicted `complete_with_misses` while its own gate says the wave is OPEN

`T.W8.md §Hard gate` row 6, quoted verbatim inside the stub the owner never filled:

> *"**THE OWNER'S VERDICT IS THE GATE.** The wave closes on the owner's ruling over the package …
> **A package delivered but unruled leaves the wave OPEN, honestly** (never a proxy sign-off)."*

The verdict is empty at HEAD. By the wave's own text **T.W8 is OPEN**. `FINAL §1` records it as
`complete_with_misses`; `PROGRESS`/`FINAL §1` record the tranche as CLOSED; the merge fired
(`6e14e90`) and the annotated tag was cut. The close's defence — *"the honest terminal"* — is
honest **labelling** of a state, but the state was then given a completion verdict, merged, and
tagged. **A wave whose gate its own spec declares unmet is not `complete_with_misses`; it is
OPEN.** PP-16 (§5-V4) is the instrument that made "OPEN" unavailable as a verdict.

### P-2 · 9/11 WR cures "LANDED + merged" — but landed ≠ certified, by T's own law

`FINAL §5:312` is precise: *"landed, **OWNER-UNCERTIFIED** — the still-reds inherit for a live
census re-judge"*. Good. But `FINAL §1` W8 counts them toward *"Goal met to the package"*, and the
`tranche-t-close` tag message advertises the census as complete. U then re-cured several as
**CENSUS-RED** (`U/FINAL.md:177` — *"CENSUS-RED RE-CURED GREEN `cfa8c31`/`be807ce`"*) — i.e. some
"LANDED" T cures were **red when re-judged live**. That is the definition of partial-counted-as-done,
proven by the successor's own re-judgement.

### P-3 · T-8, T-25/26/27, T-1, T-5 — the "LANDED-partial" class

`FINAL §2.1` bullet 2 marks six findings LANDED-partial with a producer residual. Those residuals
are D-1/D-2/D-3 (§3) — the three that vanished at V. **A partial whose remainder later evaporates
was, retroactively, a non-completion.** T-8's remainder ("satellites never meatball off") is
literally still commented as an INTERIM in `HeroBlob.vue:208`.

### P-4 · "e2e CERTIFIED" — one hard failure re-classified as a flake by re-running it alone

`FINAL §6.1`: *"**159 passed / 2 skip / 1 failed**"*, the failure being `o7-card-census.spec.ts:190`,
dispositioned as *"a PROVEN serialization-ordering FLAKE: the exact spec re-run **in isolation**
passes 4/4"*. Passing in isolation does not prove the suite-order failure is not real — the
serialized `workers:1` run **is** the certified configuration. The row is presented as GREEN in
the §6.1 gate table. It is 1 hard red re-labelled by a differently-configured re-run. Given §4-S5
(nothing runs this suite any more), the point is now moot in the worst possible way.

---

## §9 — WHAT THE NEXT TRANCHE MUST DO (ranked; each row is a defect, not a suggestion)

1. **Restore the verification apparatus before anything else.** 71 spec files, 6 Playwright
   projects, 25 oracle specs, 3 born-RED legs, the CSS-emission probe, `boot-smoke`, and the
   Lighthouse budget are all present-but-unrun. Until CI executes them, **every green in this repo
   is a green over an unexercised product**, and every future close inherits §5-V5.
2. **Fix the deploy.** `deploy-pages.yml:80` un-pin from `tranche/BG` (§7-G3 — two unresolvable
   imports), and reconcile `workflows: ["CI"]` against `name: ci` (§7-G2). Do this before any
   further "prod-preview empty-mount" investigation; it is the likeliest root.
3. **Kill the three vanished chronics by decision, not by carry** — GAP-L2, GAP-L5, GAP-ARM. Their
   trigger fired at V.W44. Either walk the verify-at-adopt ledger against glass-ui 7.0.0 and
   retire them with evidence, or file them as producer asks with a named owner. **A fourth silent
   pass is the disease becoming terminal.** Note their live source residue: `HeroBlob.vue:202-212`,
   `useAtmosphere.ts:234`, `atmosphere-calibration.ts:24-26`, `aurora-bracket.test.ts:29` — four
   `file:line` sites still pointing at T.W7.
4. **Rule or void HG6.** The 20-bracket package is either ruled by the owner (its evidence is 1.8 GB
   of untracked PNGs on one machine — §6-M4 — so this is time-critical) or explicitly voided with
   the 9 orphan brackets (§4-S1) re-filed. It cannot ride a fourth close as a pointer, and it must
   be restored to its T-scope, not U's re-scoped version (§3-D6).
5. **Ban the escalation arm as a gate discharge.** V-1's shape — "GREEN **or** write a paragraph" —
   has discharged Q14 at three consecutive closes with zero measured movement. A gate whose second
   arm is prose is not a gate.
6. **Commit the evidence or stop citing it.** `sweeps.log` was never committed; 3470 PNGs are
   untracked; two declared probe dirs do not exist. Either carve the audit tree out of `.gitignore`
   (the repo already uses that idiom for `!test/dist/` and `!**/__tests__/`) or stop treating
   on-disk artefacts as close evidence.
7. **Retire "books are never gates" (PP-5) and PP-16's floor.** Together they guarantee that no
   wave can fail and no hard dependency can redden a close. Every disease row in §3 routes through
   one or both.
8. **Re-derive the sweep baselines.** `as unknown as` in `src/` is 8→**17**; the ≤400 demo cap is
   breached by 4 files (was 2); the `CLAUDE.md` referent for both is deleted.

---

## §10 — VERDICT

T is the most articulate close in this repository and one of the least durable. Its findings are
enumerated honestly, its SHAs are real, its probes are real, and its design work largely survives
in the tree. What does **not** survive is everything the close chose to route rather than resolve:
the adopt-event class, the perf redemption, the oracle apparatus, the taste certification, and the
doc-truth cure — each handed forward under a gate that could not fail, and each now either deleted,
unenforced, or absent from the successor's ledger entirely.

The pattern the next tranche must break is not dishonesty. **It is that this program has learned to
discharge obligations by describing them.**

---

*Audited at `HEAD c654824e` (branch `tranche-u`), 2026-07-24. Report written under
`docs/tranches/W/audit/history/` only; no source, `INBOX.md`, `vnext/`, or `scripts/dev/dev.sh`
touched. Two claims are marked non-CONFIRMED with their verification commands: §6-M6 (X1/X2 live
re-probe — network) and §7-G2 (deploy trigger — Actions history).*
