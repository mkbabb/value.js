# t-deferred-census — THE DEFERRED CENSUS (E-4: fold ALL deferred items into T)

**Lane**: `t-deferred-census` (forensics / development-only) · **Substrate**: `tranche-t` @ `e12fd09`
(= the S-close source tree + the T corpus docs only). `git diff --stat cc4f4fa..HEAD -- src/ demo/ api/`
and `tranche-s-close..HEAD -- src/ demo/ api/` are **BOTH EMPTY** — ZERO source drift; every
`file:line` / grep below reads the S-close tree exactly. `tranche-s-close` = `5bb2d59` ≠ the mandate's
cited `cc4f4fa`, but both diff-empty against HEAD → identical source across `cc4f4fa`/`5bb2d59`/`e12fd09`.

**Mandate**: E-4 — *"ALL deferred items — chronic and recent — delineated and FOLDED INTO THIS
TRANCHE"* + the owner's own verbatim §0 pair: *"Delineate any chronically deferred items and fold
them into this tranche. Delineate any deferred items and fold them into this tranche."* This lane is
the E-4 register: every open deferral across R + S, each with an owner, a CHRONIC flag, a T wave
candidate, and a fold verdict.

**Method**: walked `S/FINAL.md §5` (the 23-book table the `tranche-s-close` tag counts),
`S/audit/w9-close-probes.md §2/§3/§6` (the dated live re-probes), `R/FINAL.md §5/§7/§8`, the S-era
predecessor of this exact lane (`S/audit/lanes/deferred-books-census.md` — the tranche-age lineage
source), and the two T plan-audit lanes (`t-plan-audit-1/2` — which surfaced the off-ledger `proof:*`
legacy carry E-4 also binds). Every live-tree claim was re-verified this pass (greps cited inline),
not transcribed. Sibling repos (`../glass-ui`, `../keyframes.js`, `../parse-that`) are READ-ONLY.

**CHRONIC rule (mandate)**: deferred across ≥2 tranches ⇒ flagged **CHRONIC**. Age lineage taken
from `deferred-books-census.md §2/§3` (which dated each book's origin tranche).

**T wave candidates are ROLES, not numbers.** T is development-only; the wave DAG is a synthesis
decision downstream of this fleet. This lane assigns each item to a candidate wave-*role* (below);
the synthesizer numbers them. The roles, inferred from the mandate edicts + the forensics clusters:

| Role handle | What it is | Binds |
|---|---|---|
| **T-SUBSTRATE** | legacy-truth + doc-truth + the E-1 colocation grand restructure + oracle-floor reform | E-1, E-3, E-5 |
| **T-LIB** | `src/` color/parsing waves against the settled 3.1.0 tree | E-3 |
| **T-PACKETS** | the E-2 glass-ui/keyframes REQUEST-PACKET authoring wave (producer-root items) | E-2, E-3 |
| **T-ADOPT** | the glass-ui 5.0.0 / BG-BH adopt event = **S.W8 handed intact** (trigger-gated) | E-2 |
| **T-COHESION** | demo + api cohesion lane (dedup, dead-route excision, dev-vehicle strands) | E-1, E-3 |
| **T-DESIGN-*** | the surface design waves (aurora/blob/card/easing/…) the 18 sibling `t-*` lanes root-cause | E-6 |
| **T-CLOSE** | maintainer residuals + cross-repo/spec-gated KEEP-BOOKED + the close ceremony | — |
| **T-E7-HARDEN** | the §0.2 / E-7 late-stage Fable+frontend-design hardening/critique gate | E-7 |

---

## §1 — Headline (read first)

1. **The FINAL.md §5 "23-book" table folds cleanly: 23 rows, ZERO maintainer-only exceptions that
   escape T.** Every row folds into a T wave-role — even the two maintainer-on-host residuals (X1/X2)
   and the four cross-repo/spec-gated KEEP-BOOKEDs (FN-7, kf resolveEasing, S.H3 Pratt, the CH/R8/R
   spec cluster) fold *as recorded maintainer/producer residuals in T-CLOSE*, which is the honest E-4
   discharge for an item value.js-agents cannot execute. "Maintainer-only" is a **routing**, not an
   escape from the fold (§2, §5.2).

2. **The single largest find is OFF the §5 ledger entirely: the `proof:*` legacy carry** (`t-plan-audit-1
   F1`, re-verified this pass). **11 `scripts/proof-*.mjs` files + 12 `proof:*` npm scripts survive in
   the S-close tree** (`package.json:86-97`), invoked by **NOTHING** (`grep proof: .github/ scripts/dev.sh
   scripts/deploy.sh` = 0). CLAUDE.md §Test+verify and `MEMORY.md → feedback-proof-idiom-retired.md`
   (2026-06-02) both state flatly they were **RETIRED as "overfit junk"**. The retirement deleted the
   ceremony docs and the prose but never the files. This is the **CHRONIC legacy carry par excellence**:
   a retirement booked pre-R, claimed done, alive-in-tree across R and S, invisible to every wave because
   every wave inherited the false "already gone" premise. E-3 (no legacy), E-4 (fold ALL deferred), and
   E-5 (recap prompts addressed) **all three bind it**. Not in FINAL §5 because the docs say it doesn't
   exist. → **T-SUBSTRATE, the first structural act** (§4.1).

3. **The deferral corpus splits ~⅓ CHRONIC (≥2 tranches), ~⅔ S-recent.** The CHRONIC spine is almost
   entirely **producer/cross-repo/spec-gated** (the glass-ui adopt fan-out, X1/X2, FN-7, CH-10/CH-13/
   R8-23, S.H3 Pratt, Color.try) — items whose triggers value.js does not control. The S-recent set is
   almost entirely **value.js-actionable** (W2-3 brand, dup-useDark, PI-DRIFT-1, /remix hygiene,
   doc-truth, RP-2). **T's actionable fold is dominated by recent items; T's CHRONIC fold is dominated
   by things it can only re-verify or escalate.** This is the correct reading of the mandate's two-clause
   ask: the chronic ones need *delineation + a firing/escalation plan*; the recent ones need *doing*.

4. **Zero silent drops, and three S-discharged items correctly retired** (§3): srgbToLinear (shipped
   3.0.0), the ICtCp/Jzazbz spaces (shipped 3.1.0), K-W5RT / vue-router 5 (`^5.1.0` landed), parse-that
   `^1.0.0` re-pin (2.0.1), the missing `[2.0.0]` CHANGELOG entry (now present, `CHANGELOG.md:165`). These
   are NOT re-folded — recording them keeps the census zero-drop against a reader who remembers them open.

---

## §2 — THE FOLD TABLE (the E-4 deliverable)

Every open deferral → owner (`demo`/`producer`/`joint`/`src`/`maintainer`) → CHRONIC? → T wave
candidate → fold verdict. Clustered by wave-role. **`†` = live-verified this pass; cite in the row.**
"Producer" spans glass-ui + keyframes; "maintainer" = on-host / on-VPN human ops.

### 2.1 — T-ADOPT cluster (= S.W8 handed intact; the trigger-gated fold)

| # | Item | Owner | CHRONIC | Fold → verdict + rationale |
|---|---|---|---|---|
| A1 | **glass-ui 5.0.0 adopt event** | producer | **CHRONIC** (~10+ tranches; the A→B→E→F→G "7 glass-ui primitive/blob asks" thread terminates here — `deferred-books-census.md §6.3`) | **FOLD → T-ADOPT (= S.W8, handed intact).** Trigger UNFIRED †: registry `latest=4.2.0`, no v5 tag; `../glass-ui` @ `c3ea22a8` `tranche/BG`; `package.json:124` still `file:../glass-ui`. The wave doc + MIGRATION walk hand forward whole. T-ADOPT runs the walk **at the cut**, not before (E-3: no pre-pin). |
| A2 | **CI checkout un-pin from `tranche/BG`** | producer/repo | **CHRONIC** (R.W7 `102b37b` → S → T; second tranche) | **FOLD → T-ADOPT.** Live †: `deploy-pages.yml:76-80` + `ci.yml:59` still pin `ref: tranche/BG`. Un-pins the moment 5.0.0 lands on glass-ui master. Gated on A1. |
| A3 | **L17 GooBlob→`Blob` rename consume** | producer/demo | **CHRONIC** (N L17 → R → S → T) | **FOLD → T-ADOPT.** Exports still `./goo-blob` only †. Rides the 5.0.0 cut; the demo import-site rename is the consume half. |
| A4 | **GAP-L2 — aurora lightness-scheme atoms door** | producer | recent (S.W6), but aurora-derive lineage (K/N) | **FOLD → T-PACKETS (author the packet) + T-ADOPT (re-verify).** `atoms.ts` grep `lightnessScheme\|lBand\|hueSpread\|chromaVariance` = NONE †; dark L band `[0.18,0.42]` unreachable. **T-26 gives this its dimensioning spec** (the variance bracket becomes the atom sizing) — so this is not a bare re-verify, it is a *specced* producer ask now. |
| A5 | **GAP-ARM — aurora cold-load arm-replay** | **joint** | recent (S.W6 / variance-webbing STEP-0), **user-visible on prod** | **FOLD → T-PACKETS (producer replay) + T-DESIGN-aurora (the DEMO half) + T-ADOPT re-verify.** `useAurora.ts:212-228` unchanged † (no `inst.update(getCfg())` after `arm()`, no `{immediate:true}`). **NEW this pass (plan-audit F12): GAP-ARM has a DEMO half** — hydration runs after derivation, so cold load seeds pink independent of the producer replay. T must fold BOTH halves + a real-hydration cold-load gate, or the false-green recurs. Feeds T-1/T-25/T-27. |
| A6 | **GAP-L5 — blob producer halves (HERO preset · `uSatColor[]` · satellites-at-rest)** | **joint** | **CHRONIC** (blob-extirpation/co-rebuild lineage K→N→M→S→T) | **FOLD → T-PACKETS + T-DESIGN-blob + T-ADOPT.** Demo geometry halves landed (`d843ae7`); producer halves absent † (genesis brief in producer inbox `3188171`). Feeds T-8; **must land with L20 (A8) so RP-2 clears** (§2.6). |
| A7 | **PRM-expand — dock never expands under prefers-reduced-motion** | producer (keyframes) | recent (S.W7) | **FOLD → T-PACKETS (keyframes) + T-ADOPT.** Root-caused †: `../keyframes.js …/managed-play.ts` `springPlay` PRM arm emits subscribers-only, never `_onFrame`; the one-line cure (`onFrame?.()` in the snap arm) unlanded. Cross-repo — packet + re-verify at adopt. |
| A8 | **L20 — `goo-blob/config` subpath** | producer | recent (S.W3) | **FOLD → T-PACKETS + T-ADOPT.** Absent † (exports only `./goo-blob`). Landing ≈ −33 KiB eager → **directly clears RP-2** (A9). The 33 KiB barrel is the JS-eager anchor. |
| A9 | **RP-2 — JS-eager RE-BASELINE (347.9 KiB gz vs ≤280)** | demo + producer | recent (S.W3), perf-budget regime lineage | **FOLD → T-DESIGN-blob + T-ADOPT (L20).** The ≤280 gate is unreachable by demo deferral (vendor 109.5 K prohibited + goo-blob barrel 33 K + src off-bounds). Not owner-visible (bundle weight); a pure fold-forward that **must land WITH A8/A6** or the re-baseline carries a 3rd tranche (`t-plan-audit-1 §9`). |
| A10 | **GLASSUI-S-ASKS L2·L3·L5·L6·L7·L8·L9·L10·L11·L12·L13·L14·L15·L16** + the R-relay **EasingPicker SelectTrigger a11y** (relay item 8) + the **`/easing` GAP-3 17th/`/styles/fonts` 18th subpath-watch** | producer | mixed (the primitive/blob asks CHRONIC; L2-L16 S-dispatched `6dce9b5b`) | **FOLD → T-PACKETS (E-2 authoring) + T-ADOPT walk.** Per-item live table at `w9-close-probes.md §6`; **CURED: L1/L4/L18; CONSUMED: L19 pointer door.** No demo shim exists (S-21 fence held). L12 is time-sensitive (before BH.B4e's MIGRATION table). **E-2 makes these the request-packet corpus** — the `t-request-packets` lane owns the packet SHAPE; this census confirms the fold set is complete. |

### 2.2 — T-CLOSE cluster (maintainer / cross-repo / spec-gated — fold-as-recorded-residual)

| # | Item | Owner | CHRONIC | Fold → verdict + rationale |
|---|---|---|---|---|
| C1 | **X1 — prod api deploy (webhook dead)** | **maintainer** | **CHRONIC** (R.W7 residue → S → T; "second-tranche carry") | **FOLD → T-CLOSE as the standing maintainer op.** Live †: `api.color.babb.dev/health` 404, still I-era; `deploy.babb.dev/hooks/value-js` 404. Un-actionable by agents *by construction* (hook registration + `master` push are on-host). **This IS the backend half of T-9** (`t-plan-audit-1 F6`) — the owner's *"why does the backend not work"*. T must **split T-9's two halves**: the banner (F2/T-9, demo, actionable now) vs the dead prod backend (C1, maintainer). Exact op: register the hook, push `master` (`FINAL.md §8.1`). |
| C2 | **X2 — NCSU-alias retirement** | **maintainer** | **CHRONIC** (R.W7 residue → S → T; second carry) | **FOLD → T-CLOSE.** `mbabb.fi.ncsu.edu/colors/` answers 200, no redirect †. Maintainer-on-NCSU-VPN op (remove the `/colors/` proxy block, let DNS/cert lapse). Sequenced after C1 confirms `color.babb.dev` serves HEAD lineage. |
| C3 | **FN-7 — fourier doc-relocation co-decision + CONSTELLATION.md pointer** | cross-repo (fourier) | **CHRONIC** (R.W6 → S → T; age ≈7 tranches) | **FOLD → T-CLOSE, KEEP-BOOKED.** fourier still tranche-N; the in-tree contract-of-record note (R.W6 §8) holds the binding. No value.js action; de-urgented. Re-probe at T close. |
| C4 | **kf `resolveEasing` convergence** | cross-repo (keyframes) | recent (S NEW book) | **FOLD → T-CLOSE, KEEP-BOOKED.** KF-COURTESY delivered `ad1b811`; no kf easing-surface touch. Fires at kf's next easing touch — not value.js-gated. Re-probe at adopt. |
| C5 | **CH-10 · CH-13 · R8-23 · R-5 · R-10** (spec/maintainer-gated grammar + HDR + convergence) | spec / cross-repo | **CHRONIC** (CH-10 ≈9 tranches, CH-13 ≈7, R8-23 chronic) | **FOLD → T-CLOSE, KEEP-BOOKED.** `w9-close-probes.md §3` re-verified live 2026-07: `if()`=Chromium-only, `random()`=Safari-TP-only (neither Baseline); scroll/view-timeline longhands not universal Baseline (value.js already PARSES them, `scroll-timeline.ts` 658 LoC); rec2100 HDR still W3C draft. **No fired-but-unnoticed trigger.** T re-runs the spec-status recheck at close (the "~late-2026" window is now its own midpoint+; do not carry the guess stale). |

### 2.3 — T-LIB cluster (`src/`-owned)

| # | Item | Owner | CHRONIC | Fold → verdict + rationale |
|---|---|---|---|---|
| L1 | **W2-3 — Normalized/Display brand (src re-book)** | **src** | recent (S.W2 DECLINED-mechanical → re-book) | **FOLD → T-LIB.** NOT a brand-and-cast: per `w2-3-brand-decision.md`, the norm/denorm state is a **runtime boolean param**, so this is a **boolean-literal-param + conditional-return-type redesign of `normalize.ts` across ~58 callsites** against the settled S.W1 color tree. A real src design wave item, sequenced after the 3.1.0 tree settled — which it now has. E-3: redesign at the root, no cast-shim. |
| L2 | **`Color.try()`** | **src** | **CHRONIC** (born R.W1 → S → T) | **FOLD → T-LIB, but STILL demand-gated (soft).** Signal drifted 11→12 demo try-wraps across S (recorded, not reconciled) †. Does not clear the "books never fire on vibes" bar on its own. **T posture: re-justify or park** — if T-LIB opens a parsing wave, a non-throwing `Color.try` that neither drags parse-that into the `/color` subpath nor duplicates the memoized custom-name path is cheap to add; otherwise it stays booked. Not a standalone wave trigger. |
| L3 | **S.H3 Pratt consume-edge** | src / cross-repo (parse-that) | **CHRONIC** (R.W6 → S → T) | **FOLD → T-LIB as KEEP-DORMANT — re-justified, do NOT pull forward.** parse-that 1.0.0 shipped WITHOUT a Pratt/binding-power combinator (`deferred-books-census.md §3`); value.js's `calc()` 2-tier fold (`math.ts`) is "tiny duplication, does not clear a KISS/DRY bar" even if offered. PT-E delivered, no reply expected (parse-that at 0.11.0). **The mandate asked me to re-justify-or-fold: I re-justify DORMANT** — folding it forward as active work would be the contrivance E-3 forbids. It stays a trigger-gated book, folded as *dormant with a firing condition* (parse-that presents the sketch). |

### 2.4 — T-COHESION cluster (demo + api)

| # | Item | Owner | CHRONIC | Fold → verdict + rationale |
|---|---|---|---|---|
| H1 | **dup-`useDark` demo residue** | **demo** | recent (S.W4-noted) | **FOLD → T-COHESION.** Live †: `useContrastSafeColor.ts:56,77` (×2) + `useViewAccents.ts` + the two markdown composables run **private `useDark` instances** while `useGlobalDark` is the intended single home (`App.vue`, dark-mode-toggle, dock menus consume it). Fold the private instances onto `useGlobalDark`. Architectural, not a correctness break — **but E-1 colocation makes this a natural cargo of the restructure** (the dark store is a global-level composable that belongs in ONE `composables/` home). |
| H2 | **PI-DRIFT-1 — `mode="out-in"` dev-vehicle strand** | **demo** | recent (S.W9 π review) | **FOLD → T-COHESION (natural cargo beside H1).** `ExtractWorkbench.vue:88` `<Transition name="vj-morph" mode="out-in">` † — the extract developed plate never mounts on the DEV vehicle (the R.W3 PaneSlot `out-in` dev-remount class). **10 `out-in` sites live in demo †** (MixResultDisplay, ImageDropZone, ExtractWorkbench, MixPane, PaneSlot, PaletteSlugBar, DockViewSelect, Dock, ActionBarLayer + the DESIGN.md doc) — the book named "7 further to audit"; the live count is higher. Shipped bundle verified healthy; this is a DEV-vehicle correctness strand. **Rider (S lesson 6): make `pi-w5b`'s swallowed developed-plate wait HARD-FAIL** — a wait for the state a shot exists to record is a gate. |
| H3 | **`/remix`+`/diff` api-hygiene (physical route deletion)** | **demo/api** | recent (S.W5), K-W3DIFF lineage (R/K) | **FOLD → T-COHESION (the api half).** Demo-side retired (K-W3DIFF alt-exit TAKEN at W5-13); physical routes still live †: `api/src/routes/palettes/forks.ts` + `services/palette/forks.ts` (`remixPalette`, `atomDiff`, `/diff` all present). E-3 (no legacy) + the L-era api-fastidious-closure precept bind: **delete the dead routes at the root**, do not leave write-only `atomDiff`. Interacts with the E-1 *backend* colocation edict (§0 owner text: "similar treatment… for all backend files"). |
| H4 | **`usePaletteStore` schema migration** | demo | recent (S NEW book, DORMANT) | **FOLD → T-COHESION as DORMANT.** `usePaletteStore.ts:8` still `version: 1` † — trigger (first bump past 1) UNFIRED. No action unless T's demo work bumps the schema; folded as a recorded dormant book so a future version bump doesn't ship un-migrated. |

### 2.5 — T-SUBSTRATE cluster (legacy-truth + doc-truth)

| # | Item | Owner | CHRONIC | Fold → verdict + rationale |
|---|---|---|---|---|
| S1 | **`proof:*` legacy carry** (11 `scripts/proof-*.mjs` + 12 npm scripts) | **demo/repo** | **CHRONIC** (retirement claimed 2026-06-02, pre-R; alive across R + S) | **FOLD → T-SUBSTRATE, the first structural act.** Live †: 11 files, 12 npm entries, **0 invocations** in CI/dev/deploy. CLAUDE.md + MEMORY.md declare them retired. **Finish the retirement the docs already claim**: either (a) excise the whole family (the disciplines are now owned by types + vitest + e2e oracles, exactly as the doc asserts) OR (b) promote the ONE that guards an otherwise-ungated discipline (`proof-subpath-resolve` — exports-map integrity) into a real vitest/CI gate and delete the other ten. **Not "keep just in case" — that IS the overfit-junk the owner deleted.** E-3+E-4+E-5 all bind (§4.1). |
| S2 | **doc-truth 5→6 e2e projects drift** | demo/docs | recent (S.W3 added smoke-perf) | **FOLD → T-SUBSTRATE doc pass.** Live †: CLAUDE.md `:28`+`:89` say "5 projects"; `S/waves/S.W9.md:87` says "e2e 5-project" — the 6th (`smoke-perf`) landed at W3. Flagged at S close as "the successor's first doc pass", never patched (`FINAL.md §6`, `w9-close-probes.md §Handoff`). One-line doc correction, folds into T's CLAUDE.md/doc truth-up. |
| S3 | **`ci.yml` Lighthouse stale soft-launch comment (N2)** | repo | recent (S.W0) | **FOLD → T-SUBSTRATE doc pass.** Live †: `ci.yml:358` step is correctly HARD, but the nested comment `:362` still reads *"Soft-launch (continue-on-error)… never blocks the ladder"* — the hard flip landed, the old-state comment survived. E-3 legacy-comment class, trivial, folds beside S2. |
| S4 | **The oracle-floor gate-BLINDNESS reform (F3 appearance-truth boot oracle + F4 pacing gate)** | demo | recent (S.W0/W3) | **FOLD → T-SUBSTRATE (mint) + T-E7-HARDEN (consume).** NOT a deferred *item* per se — a **verification-method gap** the plan-audit lanes surfaced: W0-2's WebGL oracle certifies draw-issuance, not pixel/colour truth (`preserveDrawingBuffer:false` swap); W3's "budgets as gates" is freeze-guards under SwiftShader, not real-GPU numerics. **The owner's T-25/T-27 boot-animation findings judge the exact axis these gates are blind to.** T must MINT a colour-truth boot oracle + a software-invariant pacing oracle (inter-frame variance) BEFORE E-7, or E-7 certifies against the same blind gates S did. Folded here because it is the substrate T's design waves rest on. |

### 2.6 — T-PACKETS / T-DESIGN joint items already routed above

`S-3 letter-rail` (fired W4-5 `38d83e4`) → **FOLD → T-PACKETS (producer letter-rail variant) + T-DESIGN
(T-5 sliders/hierarchy).** The mandate flags *"T-5 may fire it"* — it DOES: `t-plan-audit-2 F3` shows
T-5 UPGRADES S-3 from a booked deferral to a **mandated producer packet** (the owner now demands the
surface, plus a real 1.01:1 dark-mode letter-contrast defect the S-3 book-out left ungated). Do NOT
wait on the book — author the packet AND fix the demo ink referent immediately. This is the census's
one item where a *recorded deferral* (Class C) and an *un-recorded defect* (Class A) share a surface.

---

## §3 — Discharged in S (retire; do NOT re-fold — recorded for zero-drop)

These were open at R-close and a reader may remember them; S closed each. Recording them so the census
is provably zero-drop, not silently pruned.

| Item | R-state | S discharge (live-verified †) |
|---|---|---|
| `srgbToLinear` decode-threshold defect | R §5 OPEN → S | **DISCHARGED** — `transfer.ts:40` pivots on `SRGB_TRANSITION` (0.04045); the `gamut.ts` inline twin deleted; shipped **3.0.0** |
| R-6 ICtCp / Jzazbz spaces | R §5 / R.md §4 | **DISCHARGED** — full public space classes at **3.1.0** (`spaces.ts:416,445`) |
| R-4 raytrace N-gamut | R §5 | **DISCHARGED-BY-RATIFICATION** — Q8 FLIP → W1-10 (`gamut-raytrace.ts`, Ottosson oracle ≤4.05e-4) |
| K-W5RT / vue-router 4→5 | R §5 WAITING (age ≈8) | **DISCHARGED** — `package.json:157` `^5.1.0`, code-free (W2-7) |
| parse-that `^1.0.0` re-pin + color2Into currency + D8-1 | R §5 | **DISCHARGED** cross-instance (kf-executed **2.0.1** `a7eabcc`) |
| Missing `[2.0.0]` CHANGELOG entry (S-census §1 candidate) | S-census flagged | **DISCHARGED** — present at `CHANGELOG.md:165` |
| K-INV5 typed degraded-backend affordance | R §5 | **DISCHARGED** at R.W3 (`c4eb9d2`); S found no residual |
| VAL-1 OKLab aurora-LUT (chronic A→J) | KILLED at N.W5 | **KILL stands** — not a book; noted only as S-18/aurora root-context |
| KILLS: R-8 gamut-relative · sibling-index/count · device-cmyk · ICC | census KILLS | **carried unchanged** — grep-verified none reintroduced |

---

## §4 — The two off-ledger CHRONIC legacy finds (E-4 binds; not in FINAL §5)

### §4.1 — `proof:*` — the chronic retirement that never completed (row S1)

The load-bearing E-4/E-5 test case. `t-plan-audit-1 F1` found it; I re-verified every claim this pass:

- **12 npm scripts** `package.json:86-97` (`proof:css-parity`, `proof:subpath-budget`,
  `proof:subpath-resolve`, `proof:contrast-color`, `proof:gamut-alloc`, `proof:grammar-2026`,
  `proof:serialize-fidelity`, `proof:grammar-q`, `proof:color-arch-q`, `proof:round-trip-idempotent`,
  `proof:perf-target`, `proof:progress-honesty`) †.
- **11 `scripts/proof-*.mjs`** files † (all except `proof:grammar-2026`, which points at real vitest specs).
- **Invocations: 0** — `grep proof: .github/ scripts/dev.sh scripts/deploy.sh` = empty †. No CI step,
  no `pretest`/`prebuild`, no dev/deploy hook runs them. They are inert `.mjs` wired to nothing.
- **The doc-state contradicts the tree-state**: CLAUDE.md §Test+verify — *"The grep-based `proof:*`
  invariant scripts (G/H-era) were retired as overfit; the disciplines they guarded stand by the type
  system + eslint + review."* MEMORY.md → `feedback-proof-idiom-retired.md` (2026-06-02, file present †) —
  the owner *"judged the grep-based `proof:*` idiom 'overfit junk' + deleted it… Never re-introduce."*

**Why it matters beyond hygiene**: it is the concrete proof that a *doc-claimed* retirement is not a
*tree* retirement — and T's E-1 colocation grand restructure + the backend-abstraction edict are
about to move the ENTIRE tree on the strength of doc-claims. If T's first structural pass cannot true
*this one already-claimed retirement*, it inherits doc-vs-tree drift at scale. **Fold it as T-SUBSTRATE's
first act; make CLAUDE.md true by construction.**

### §4.2 — the doc-truth pair (rows S2, S3)

Neither is a "book" — both are drift the S close explicitly **recorded and declined to patch** (leaving
it honest for the successor). CLAUDE.md "5 projects" ×2 and `S.W9.md` "5-project" (smoke-perf is the 6th);
the `ci.yml:362` stale soft-launch Lighthouse comment. Both fold into a single T-SUBSTRATE doc truth-up
pass. E-5 (recap prompts addressed) binds: the doc must not describe a floor it no longer has.

---

## §5 — CHRONIC roll-call (age lineage; the mandate's "chronically deferred" delineation)

**≥2-tranche items, oldest first** (age from `deferred-books-census.md §2/§3` + this pass):

| CHRONIC item | Age / lineage | Owner | Fold |
|---|---|---|---|
| The **7 glass-ui primitive/blob asks** → **5.0.0 adopt** (A1) | ~10+ tranches (A→B→E→F→G) | producer | T-ADOPT (the terminal book that subsumes the thread) |
| **CH-10** kf precept-pin convergence (C5) | ≈9 tranches (K→…→R) | cross-repo | T-CLOSE KEEP-BOOKED |
| **`proof:*` legacy carry** (S1) | retirement claimed 2026-06-02 (pre-R); alive R+S | demo/repo | **T-SUBSTRATE (first act)** |
| **CH-13** fourier Phase-0 quiescence (C5) | ≈7 tranches | cross-repo (fourier) | T-CLOSE KEEP-BOOKED |
| **FN-7** doc-relocation (C3) | ≈7 tranches (R.W6→S→T) | cross-repo (fourier) | T-CLOSE KEEP-BOOKED |
| **GAP-L5 / blob co-rebuild** (A6) | K→N→M→S→T (blob-extirpation) | joint | T-PACKETS + T-DESIGN-blob + T-ADOPT |
| **X1** prod api deploy (C1) | R.W7→S→T ("second carry") | maintainer | T-CLOSE maintainer op |
| **X2** NCSU-alias retirement (C2) | R.W7→S→T (second carry) | maintainer | T-CLOSE maintainer op |
| **R8-23** scroll/view-timeline longhands (C5) | chronic (R8 census) | spec | T-CLOSE KEEP-BOOKED |
| **CI un-pin** from tranche/BG (A2) | R.W7→S→T | producer/repo | T-ADOPT |
| **L17** GooBlob→Blob rename (A3) | N→R→S→T | producer/demo | T-ADOPT |
| **Color.try()** (L2) | R.W1→S→T | src | T-LIB (still soft/demand-gated) |
| **S.H3 Pratt** (L3) | R.W6→S→T | src/parse-that | T-LIB DORMANT (re-justified) |
| **`/easing` GAP-3 subpath watch** (in A10) | R.W4→S→T | producer | T-ADOPT MIGRATION walk |
| **EasingPicker SelectTrigger a11y** (in A10) | R.W4→S→T | producer | T-PACKETS / T-ADOPT |

**Reading**: the CHRONIC spine is **producer + cross-repo + maintainer + spec** almost end-to-end. The
ONE chronic item value.js can fully execute unilaterally is **`proof:*`** (S1) — which is exactly why it
is the highest-value chronic fold and belongs first. Everything else chronic is *fire-when-the-trigger-
fires* (adopt) or *escalate-and-record* (maintainer/cross-repo/spec).

### §5.2 — "maintainer-only" is a routing, not a fold-escape

The mandate asks each §5 row to be "fold-into-T or maintainer-only rationale". **No row is maintainer-only
in the sense of escaping T.** X1/X2/FN-7/kf/CH-cluster fold into T-CLOSE **as recorded residuals with a
named firing op** — that IS the E-4 discharge for an item agents cannot execute. The alternative (dropping
them because "not agent-actionable") is the silent drop E-4 forbids. T carries them as standing ops,
re-probed at close, amended in place when a maintainer fires them (the R/S precedent).

---

## §6 — Ranked findings (top of this lane)

1. **The `proof:*` legacy carry is the census's headline** — 11 files + 12 npm scripts, self-described
   retired 2026-06-02, alive & unwired across R+S, off the §5 ledger. CHRONIC, unilateral, E-3+E-4+E-5.
   → **T-SUBSTRATE, first act** (§4.1).
2. **The FINAL §5 23-book table folds cleanly with ZERO true maintainer-only escapes** — every row lands
   in a T wave-role; X1/X2/FN-7/kf/CH fold as *recorded residuals with a firing op*, not drops (§2, §5.2).
3. **GAP-ARM has a newly-found DEMO half** (A5, plan-audit F12) — the pink cold-load is not only the
   producer replay gap; demo hydration-ordering seeds pink independently. T must fold both + a
   real-hydration cold-load gate, or T-1/T-25/T-27 re-close false-green.
4. **RP-2 clears only if A8(L20)+A6(GAP-L5)+A9 land together at T-ADOPT** — the JS-eager re-baseline
   carries a 3rd tranche otherwise; the blob co-rebuild and the config subpath are one landing.
5. **S-3/T-5 is the lone Class-C+A shared surface** — the recorded letter-rail deferral AND an ungated
   1.01:1 dark-mode contrast defect coexist; author the packet AND fix the ink referent now, don't wait
   on the book.
6. **The oracle-floor is blind on the exact axis the owner judges** (S4/F3/F4) — appearance-truth and
   pacing gates must be MINTED before E-7, or the hardening wave certifies against S's blind gates.

**Coverage ledger (zero-drop)**: FINAL §5 = 23 rows → all folded (A1-A10, C1-C5, L1-L3, H1-H4, S-3 =
23). Mandate-named extras: api-hygiene→H3, dup-useDark→H1, W2-3→L1, PI-DRIFT-1→H2, doc-truth→S2,
Color.try→L2, S.H3 Pratt→L3, FN-7→C3, usePaletteStore→H4, kf resolveEasing→C4, RP-2→A9, S-3→§2.6 —
all present. Off-ledger E-4 folds: proof:*→S1, ci.yml comment→S3, oracle-blindness→S4, EasingPicker
a11y + GAP-3 watch→A10. **Discharged-in-S retired (§3): 9 items, none re-folded.**
</content>
</invoke>
