# S.W9 — CLOSE probes + sweeps (the verification act)

**Wave**: S.W9 — CLOSE. **Lane**: PROBES + SWEEPS (the reconciliation + book-reverify +
sweep + budget + spec-status + relay lane).
**Probe date**: 2026-07-06. **value.js head**: `tranche-q` @ `a4e45f7` (S.W7 close board).
**Spec of record**: `waves/S.W9.md` · `S.md §7` (books) · `S.md §10` (zero-drop ledger) ·
`audit/SYNTHESIS.md §3.11/§6.2` · the `S.md §13` process lessons.
**Live-world stamps at probe**: glass-ui `../glass-ui` @ `c3ea22a8` (`tranche/BG`, 4.2.0) ·
keyframes.js `../keyframes.js` @ `8da4447` (`tranche-t-impl`, 5.1.0) · parse-that
`../parse-that` @ `ef10d5b` (`master`).

**Discipline (binding, from `waves/S.W9.md §No-workaround prohibitions`)**: no silent
reconciliation of number drift (both figures on the record); no paperwork close over a red
probe (gates-pass-goal-unmet = `complete_with_misses`, named). A defect found in `src/`,
`demo/`, `api/`, or `../glass-ui`/`../keyframes.js` routes to a report row here — **never a
silent patch** (`waves/S.W9.md §File bounds`).

**Gate suite at this head** (re-run this lane): `npm run lint` **0** · `npm run typecheck`
(lib+demo) **0** · `npx vitest run` **2158/2158 (68 files)** · `npm run gh-pages` **built,
exit 0**. (e2e 5/6-project: the standing smoke suite was green at W7 close `2a322459` — 66/66
across 6 projects; not re-driven this lane, see §5 frame-budget note.)

---

## §RED-PROBE SUMMARY (the honest close verdict)

The close is **`complete_with_misses`**. The tranche's own gates hold against the live tree;
the misses below are named, none is a silent reconciliation, and every one routes to a fix
lane or an open book — no paperwork close over any of them.

| # | Red probe | Class | Routes to |
|---|---|---|---|
| RP-1 | **`demo/color-picker/App.vue` = 408 LoC** — over the ≤400 demo cap. Cured to 398 at S.W5 (`035b02c`); **re-breached in W7** (W7-3 `7549772` + W7-4 `33ba703` added the field-canvas thread + accent-axis provide) with no cap-check row. The W7 gate carried no cap row, so it landed uncaught — lesson 2 exactly ("wave closes green ≠ repo stays green"). | demo ≤400 cap sweep (§4) | a demo cohesion-lift fix lane (App.vue is off-limits to W9) |
| RP-2 | **JS-eager budget over gate** — 347.9 KiB gz vs ≤280 (67.9 over). Standing RE-BASELINE from W3 (`w3-chunk-census.md §9`); the L20 producer cure (`goo-blob/config` subpath) is **NOT landed** (verified absent, §2/§6), so the 33 KiB barrel anchor persists. +2.5 KiB drift vs W3 close from W4–W7 demo shell growth. | §6.2 JS-eager row (§5) | the L20 producer ask + S.W8 adopt re-verify |

Everything else — the §10 ledger, the book slate, the legacy grep, the `as any` ledger, the
CSS budget, the spec-status lane, the relays, and the ι integrity sweep — reconciles green or
to a recorded open book. The producer-gap rows (GAP-L2, GAP-L5, GAP-ARM, PRM-expand, L20) all
ride the **un-fired 5.0.0 adopt** (glass-ui registry `latest=4.2.0`, no v5 tag) → S.W8; they
are books-never-gates, not close blockers.

---

## §1 — The §10 zero-drop ledger reconciliation (row-by-row, evidence-cited)

Method: every `S.md §10` disposition reconciled against the landed tree. A row that neither
landed nor is booked/killed-with-rationale = a synthesis-integrity RED PROBE. **Result: zero
true drops.** Every S-anchor landed at a CLOSED wave (W0–W7 all closed per PROGRESS.md) or
carries a recorded producer-gap/book routing to the un-fired S.W8 adopt.

### §10.1 — S-1..S-24 anchors

| Anchor | Wave | Landed? | Evidence |
|---|---|---|---|
| S-1 catalog title | W4-1 | ✅ | `a3c4bb8` title-as-component; W4 close taste MET `0d942c0` |
| S-2 (+L6, W8) | W4-3 | ✅ (L6 producer at W8) | `4e6c178` thumb ink; L6 slider token rides W8 adopt |
| S-3 letter-rail | W4-5 (+book) | ✅ FIRED | `38d83e4` — SegmentedTabs pill can't yield to the ring; **S-3 letter-rail book SANCTIONED-FIRED** (§2) |
| S-4 blob (+L5, W8) | W6-4 | ✅ demo / producer→W8 | `d843ae7` corner-break + Q7 full presence; L5 co-rebuild + GAP-L5 → W8 (§2) |
| S-5 dock casing | W7-6 | ✅ | `dfb8feb` Tools grammar + @mbabb un-eyebrowed |
| S-6 (+W1-6) | W5-8 | ✅ | `50c7da5`/`ee087fd` perceived-space plate on `sampleOKLChSliceBoundary` |
| S-7 (+L8) | W7-2 | ✅ demo / L8 producer open | `60f552c` mobile dock fit; L8 clampLabel ask un-actioned but consume-need dissolved by the seal (§2) |
| S-8 seal | W7-1 | ✅ | `96a12ed` the wax seal — label+chevron deleted |
| S-9 perf family | W3-1..5, W7-5 | ✅ (JS-eager re-baselined) | `95b5c75`/`3824b95`; JS-eager RE-BASELINE (RP-2/§5) |
| S-10 (+L9) | W5-1 | ✅ demo / L9 producer open | `52acad46` loading grammar; L9 skeleton-shimmer producer ask (§2) |
| S-11 (+W0-3,W5-5) | W0-1 | ✅ | `12af143` honest dev-backend; X1/X2 books carry (§2) |
| S-12 | W5-7 | ✅ | `5b4893df` superfluity excision |
| S-13 (+L7,W1-6) | W5-9 | ✅ demo / L7 producer open | `a83a074e` easing pane v2; L7 EasingPicker `defineExpose(playTravel)` producer rider (§2) |
| S-14 | W4-1 | ✅ | `a3c4bb8` |
| S-15 (+L10) | W5-10 | ✅ demo / L10 producer open | `635cefe3` integer-snap; L10 aliasing producer asks (§2) |
| S-16 (+L6) | W4-3 | ✅ | `4e6c178` |
| S-17 (+W8) | W5-3 | ✅ | `391b72fe` one input species |
| S-18 aurora composite | W6-1 (+W2-1,W6-2,W6-3,L1,L2) | ✅ w/ producer gaps | `e9ef5b2` boot seed; **L1 CURED** (§2/§6); **GAP-L2** (L2 door) + **GAP-ARM** → W8 (§2) |
| S-19 | W4-2 | ✅ | `e384d7f` header re-composition |
| S-20 (+W7-3,W8) | W5-2 | ✅ | `d8de145` card grammar; W7-3 luma thread `7549772` |
| S-21 precept | every item | ✅ | producer-owned → letters, never demo forks (18 GLASSUI asks, §6) |
| S-22 (fixes L1,W3-6,W6-5,L10c,L16) | W0-2 | ✅ | `b339e37` oracle floor; W6-5 Safari `9341361` |
| S-23 (+W3-9) budget regime | W3-2 | ✅ (JS re-baselined) | `21e5b50`/`7c3c597`; §6.2 gates as rows (§5) |
| S-24 library family | W1-1 (W1-1..9) | ✅ | `789061a` srgb cure; 3.0.0+3.1.0 published (§2) |

**Zero drops.** Every anchor landed; the producer halves (L1 cured; L2/L5/L7/L8/L9/L10 open)
are recorded books/gap-rows routing to the un-fired W8 adopt.

### §10.2 — Lane P0/P1 dispositions

All 30 lane rows reconcile to their named wave items (all closed). Spot-reconciled the
load-bearing ones: **legacy-sweep-src** srgb P0 → W1-1 `789061a` ✅ · ledger P0 → W0-5 ✅ ·
**lib-parsing** F-1/F-2 P0 → W1-2 `b670086`/W1-3 `1f1d351` ✅ · **api-crud** F-4 P0 →
W5-13+Q1 `ce64b8d` ✅ · **state-color-pipeline** P0-1/P0-2 → W2-1 `94e3e43`/W0-1 ✅ ·
**perf-general** P0 zombie → L3 (producer, W8) · P0 eager → W3-2 (re-baselined, RP-2) ·
**perf-transitions** P0-1/P0-2 → W3-1/W3-3+L5 ✅ · **safari-truth** P0 shader → L1+W0-2 gate
(**L1 CURED** §2) · **motion-animation-inventory** P0-M → W3-6 `5c700fe` (one clock, §6) ·
S-13 → W5-9/L7 · **M3-M6** → W3-5/W3-5-L13/W3-4/**W9 inventory patch** (§6 — applied). No
P0/P1 row is unaccounted.

### §10.3 — Census verdicts

ADOPTED set intact (all §1 discharges at W0-4; K-W5RT FOLD → W2-7 `f6a34fa`; R-6 FOLD → Q9;
srgb KEEP-then-fires-at-W1; R-4 KEEP+flag → Q8/W1-10 `60bb64e`; spec-recheck → W9 §3). KILLS
carried unchanged (R-8 mechanism · sibling-index/count · device-cmyk · ICC — none reintroduced;
verified: no `device-cmyk`/`gamut-relative` parse arms in `src/parsing/color.ts`). OVERRIDDEN:
none. **Ledger reconciles — no RED PROBE at the synthesis-integrity level.**

---

## §2 — Book re-verification (S.md §7, dated probes 2026-07-06)

Books discharge silently unless re-checked (S lesson 4). Every `S.md §7` row re-probed against
the live world.

### The X-residuals (live curl, 2026-07-06)

| Book | Probe | Result | Disposition |
|---|---|---|---|
| **X1 — prod api deploy** | `curl api.color.babb.dev` | `/health` **404** · `/palettes/foo/diff` **404** · `POST /palettes/foo/publish` **404** · `/openapi.json` **404** · `/` **200** `{"status":"ok","service":"palette-api"}` (I-era shape) · `/palettes` **200** | **STILL I-ERA — book stays OPEN.** Identical to the W0-3 2026-07-05 probe; prod still serves pre-R api |
| **X1 webhook** | `curl deploy.babb.dev/hooks/value-js` | **404** "Hook not found." | **STILL DEAD** — the value-js hook remains unregistered on-host (receiver root up). Escalation unchanged: register the hook + push `master`. Book OPEN |
| **X2 — NCSU alias** | `curl mbabb.fi.ncsu.edu/colors/` | **200** (alive, no redirect) | **STILL ALIVE — book stays OPEN.** Retirement is a maintainer-on-NCSU-VPN op; the alias answering 200 keeps it open |

Both X-residuals hand to the successor **unchanged** (the R.W7 residue carries a second tranche).

### The 5.0.0 adopt / un-pin state (registry + branches)

| Book | Probe | Result | Disposition |
|---|---|---|---|
| glass-ui 5.0.0 adopt (→ S.W8) | `registry.npmjs.org/@mkbabb/glass-ui` dist-tags | `latest: 4.2.0`; versions end `…4.1.0, 4.2.0` — **NO v5 tag**; `../glass-ui` HEAD `c3ea22a8` still `tranche/BG` @ 4.2.0 (BH B3 in flight) | **NOT FIRED** — S.W8 stays trigger-gated + PENDING. Re-stamped 2026-07-06 (W7 close said 4.2.0; unchanged) |
| CI checkout un-pin from `tranche/BG` | (gated on the 5.0.0 master landing) | 5.0.0 not landed | **KEEP-BOOKED** — carries (the R.W7 `102b37b` book) |
| L17 GooBlob→`Blob` rename | glass-ui `package.json` exports | still `./goo-blob` (`dist/goo-blob.{js,d.ts}`); no `./blob` | **NOT FIRED** — rides the 5.0.0 cut / W8 adopt |

### Producer-gap re-check against the CURRENT `../glass-ui` READ-ONLY tree (@ `c3ea22a8`)

The hard-gate-mapped P0s that S's waves DEPENDED on are **CURED**; the hedged-and-recorded
gap rows remain **OPEN**, all riding the un-fired W8 adopt.

| Item | Probe (live, READ-ONLY) | State | Disposition |
|---|---|---|---|
| **L1** WebKit aurora shader (P0, →W6-5) | `aurora/constants/shaders/`: `flat` reserved-keyword local **gone** (only comments/`METAL_GRADIENT_FLATTEN`); `flow.glsl.ts:22` fwd-decl **`vec4`** = `mediums.glsl.ts:43` def **`vec4`**; `brush.glsl.ts:332` **`vec4 tf =`** (vec4→vec4) | **CURED** ✅ | matches W6-5 "L1 cure confirmed live on WebKit". Verify-at-cut at W8 |
| **L4** backdrop-luma truth (P0, →W7-3) | `dock/GlassDock.vue`: writes `--glass-backdrop-luma` + derives `--glass-backdrop:light\|dark` bucket from the painted field; declarative bucket is the FLOOR ("REFINES") | **CURED** ✅ | matches W7-3 "L4 producer cure VERIFIED LANDED" |
| **L18** Select chevron rotation (P1) | `ui/select/SelectTrigger.vue:139` `ChevronDown class="… in-data-[state=open]:rotate-180 …"` | **CURED** ✅ | exactly the letter's proposed fix; matches W4 "L18 discharged-by-producer" |
| **W6-7 pointer door** (L19) | `aurora` runtime carries `setCursor`/`injectCursorVelocity`; consumed at W6-7 `cd177d7` | **CONSUMED** ✅ | L19 never needed to fire; richer field-warp door stays open (ADDENDUM A4) |
| **GAP-L2** aurora lightness-scheme atoms door | `aurora/composables/atoms.ts`: grep `lightnessScheme\|lBand\|hueSpread\|chromaVariance` → **NONE** | **NOT CURED — OPEN** | door still absent; the dark L band `[0.18,0.42]` unreachable. Re-verify W8 (`w6-producer-gap-rows.md`) |
| **GAP-ARM** aurora cold-load arm-replay | `aurora/composables/useAurora.ts:212–228`: `armRuntime()` does `inst.arm()` then `watch(getCfg, …, {deep:true})` with **no** immediate replay (`inst.update(getCfg())`) and **no** `{immediate:true}` on that watch | **NOT CURED — OPEN** | S-18 "field answers the picker" still broken on cold load. Re-verify W8 |
| **GAP-L5** satellite/bead HERO preset + `uSatColor[]` | glass-ui 4.2.0/tranche-BG; no HERO preset export; `uSatColor[]` (F9.R1) named-owner+cut but PENDING | **NOT CURED — OPEN** | demo geometry halves LANDED (`d843ae7`); producer halves → W8 (`w6-producer-gap-rows.md`) |
| **PRM-expand** dock never expands under PRM (W7 gap-row) | `../keyframes.js/src/animation/physics/spring/managed-play.ts` `springPlay`: PRM arm is `() => spring.snap()` (→ `_snapSettled` → `emit()` → **subscribers only**, `progress.ts:461` iterates `this.subscribers`, never `_onFrame`); the non-PRM arm's settled case DOES `onFrame?.(…)` | **NOT CURED — OPEN** | the exact W7-6 asymmetry intact; the one-line cure (`onFrame?.()` in the snap arm) never landed. No keyframes commit on those files since 2026-07-06. Re-verify W8 (`w7-furniture-records.md §1`) |
| **L20** `goo-blob/config` subpath (W3 JS-eager producer ask) | glass-ui `package.json` exports: only `./goo-blob` (whole component); **no `./goo-blob/config`** | **NOT CURED — OPEN** | the 33 KiB barrel anchor persists → RP-2 / §5 JS-eager miss. Dispatched (W3 addendum A5); not landed. Re-verify W8 |

### The remaining §7 rows

| Book | Probe | Disposition |
|---|---|---|
| `srgbToLinear` decode defect | fired at S.W1 (`789061a`) | **DISCHARGED** — 3.0.0 cut; dark-band goldens (`w1-close-artefacts.md §2`) |
| vue-router 4→5 (K-W5RT) | folded → W2-7 `f6a34fa` (`^5.1.0`) | **DISCHARGED** |
| parse-that `^1.0.0` re-pin · color2Into · D8-1 | W0-4 re-verified | **DISCHARGED** (unchanged) |
| R-6 ICtCp (+Q9 Jzazbz) | folded → W1-6/W1-11; 3.1.0 (`964c399`) | **DISCHARGED** — full space classes at 3.1.0 (`color-hdr-spaces.test.ts`) |
| R-4 raytrace N-gamut | Q8 FLIP → W1-10 `60bb64e` | **DISCHARGED-BY-RATIFICATION** (Ottosson oracle ≤4.05e-4) |
| **W2-3 Normalized/Display brand** | re-booked src-owned post-W1 (`w2-3-brand-decision.md`) | **OPEN (NEW BOOK)** — declined-mechanical at W2; the ~58-callsite boolean-literal + conditional-return-type redesign against the settled color tree. Not landed in S; hand to successor |
| **`Color.try()`** | demo soft-demand: `tryParse`/try-wrap hits in demo color/lib = **12** (book recorded 11) | **KEEP-BOOKED** — count drift 11→12 recorded (no silent reconciliation); still soft, does not clear the bar |
| K-W3DIFF PaletteDiff | alt-exit TAKEN at W5-13 (demo `/remix` retired) | **DISCHARGED** (alt-exit); physical api routes → the `/remix`+`/diff` deferral below |
| **`/remix`+`/diff` api-hygiene** | api still carries `POST /:slug/remix` + `remixPalette` + `atomDiff` + `/diff` (grep confirms live in `api/src/routes/palettes/forks.ts`, `services/palette/forks.ts`) | **OPEN (recorded deferral)** — demo-side retired (K-W3DIFF alt-exit); physical route deletion deferred to a future api-hygiene pass (W5 close). Unchanged |
| **S.H3 Pratt** | parse-that PT-E delivered, NO reply (§6); no sketch presented | **KEEP-DORMANT** — do not pull forward (unchanged) |
| **FN-7** doc-relocation | fourier-N not executed | **KEEP-BOOKED** — de-urgented (unchanged) |
| **`usePaletteStore` schema** | `usePaletteStore.ts:8` `version: 1` — no bump past 1 | **KEEP-BOOKED (NEW), DORMANT** — trigger (first bump past 1) un-fired |
| **kf `resolveEasing` convergence** | KF-COURTESY delivered `ad1b811` (§6); no kf easing-surface touch | **KEEP-BOOKED (NEW)** — courtesy record stands (unchanged) |
| **CH-10 · CH-13 · R8-23 · R-5 · R-10** | spec-status recheck lane, §3 | **KEEP-BOOKED** — no fired-but-unnoticed trigger (§3): none reached Baseline/consume-readiness at 2026-07 |
| **dup-`useDark` residue** (W4 close noted) | grep `useDark` in demo: `useContrastSafeColor.ts` **×2** (:56,:77), `useViewAccents.ts` **×1** (:71), + markdown composables note "three parallel dark stores" | **OPEN (recorded residue)** — the W4-noted "fold onto useGlobalDark" is NOT landed in S; hand to successor (architectural, not a correctness break; off-limits to W9) |
| **L20 goo-blob/config** | producer subpath absent (above) | **OPEN** — RP-2 / §5 |

**No book found silently discharged/fired without a record.** The one drift (Color.try
11→12) is recorded, not reconciled. The S-3 letter-rail and the un-fired W8/L17/CI-un-pin books
hand to the successor via the FINAL.md books table.

---

## §3 — Spec-status recheck lane (R-10 · R8-23 · R-5, live-verified 2026-07-06)

The `S.md §7` "~late-2026" guess was mid-window and never live-verified. Verified now:

| Book | Spec surface | Live status (2026-07) | Verdict |
|---|---|---|---|
| **R-10** CSS `if()` / `random()` | CSS Values L5 | `if()` = **Chromium-only** (Chrome/Edge + Chrome-Android; Safari + Firefox in development). `random()` = **Safari Technology Preview only** (first implementer). **Neither is Baseline**; both need a fallback | **KEEP-BOOKED stands** — no cross-browser consume-edge; no fired trigger |
| **R8-23** scroll/view-timeline longhands | CSS Scroll-driven Animations (`scroll-timeline-name/-axis`, `view-timeline-name/-axis/-inset`) | Documented + maintained (MDN Mar–Apr 2026); scroll-driven animations shipped in Chromium; **not yet universal Baseline** (Safari/Firefox lagging). value.js already PARSES these (`src/parsing/scroll-timeline.ts`, 658 LoC) | **KEEP-BOOKED stands** — the parser surface is present; no consume-edge change; no fired trigger |
| **R-5** `rec2100-pq/hlg/linear` | CSS Color HDR Module **L1 (draft)** | Specced as `color()` predefined spaces but the module is an early W3C **draft** with open issues (black-luminance #10459, common-ize conversions #111); **not Baseline / not broadly shipped**. value.js shipped ICtCp+Jzazbz at 3.1.0 (HDR-adjacent) but not rec2100 | **KEEP-BOOKED stands** — HDR module still draft; no consume-demand; no fired trigger |

**All three: no fired-but-unnoticed trigger.** The mid-window guess resolves to "none reached
Baseline/consume-readiness at 2026-07-06." Hand to the successor unchanged.

Sources: [MDN `if()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if) ·
[MDN `random()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random) ·
[caniuse css-if](https://caniuse.com/css-if) ·
[MDN scroll-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-timeline) ·
[W3C CSS Color HDR L1](https://www.w3.org/TR/css-color-hdr-1/).

---

## §4 — Repo-wide sweeps (re-run, not touched-surfaces-only)

### src caps (census cohesion verdict governs; no hard LoC cap)

Every `src/` file >400 LoC maps to an accepted census verdict or a recorded W1 ledger row.
**No NEW split-worthy god-module crossed the line.** The two files that grew since the W1-close
snapshot (`w1-close-artefacts.md §3`) grew for the 3.1.0 ICtCp/Jzazbz landing, staying the same
cohesive spine:

| File | LoC now | W1-close | Verdict |
|---|---|---|---|
| `parsing/color.ts` | 718 | 696 | SPLIT-WORTHY, sequenced-LAST recursive grammar spine — **ledger row (stopped short)**; +22 = the `ictcp()`/`jzazbz()` parse arms (3.1.0). Same spine, not a new module |
| `units/color/dispatch.ts` | 518 | 512 | accepted-by-verdict (booked ICtCp/Jzazbz dispatch-arm growth); +6 = the HDR arms |
| `parsing/scroll-timeline.ts` (658) · `parsing/stylesheet.ts` (643, ledger) · `easing.ts` (643) · `units/style-names.ts` (641) · `parsing/utils.ts` (603, ledger) · `units/utils.ts` (601, ledger) · `parsing/index.ts` (586) · `transform/path.ts` (562) · `transform/decompose.ts` (541) · `parsing/math.ts` (525) · `units/color/constants.ts` (500) | unchanged | all accepted-by-verdict or recorded W1 ledger rows |

The sub-500 color-space modules (`gamut` 498, `spaces` 486, `mix` 479, `boundary` 454,
`src/index` 443, `units/index` 422) are the W1-8 split results — cohesive, none a god-module.
**src caps: CLEAN.**

### demo ≤400 (excl. `ui/`)

`find demo … | wc -l` over `*.vue`/`*.ts` (excl. `/components/ui/`): **one file over 400** —
`demo/color-picker/App.vue` **= 408**. **RED PROBE RP-1** (§RED-PROBE SUMMARY). Cured to 398 at
S.W5 `035b02c`; re-breached +10 in W7 (`7549772` field-canvas thread + `33ba703`
accent-axis) with no W7 cap-check row. Routes to a demo cohesion-lift fix lane; App.vue is
off-limits to W9. Everything else ≤400.

**CURED same-day: `2522656` — App.vue 399 LoC** (useAtmosphereBoot 84 → 94). The +10 was
all COMMENT (the W7-3 luma-truth block + a duplicate of useAtmosphereBoot's own header):
`useViewAccents` was already lifted at `33ba703` and `data-glass-field-canvas` is template
truth, so the cohesion lift continued by consolidating the field-canvas / luma-truth
provenance into the atmosphere owner's doc block, leaving terse pointers in App.vue. Verify:
lint 0 · typecheck 0 · vitest 2158 green · atmosphere-cold-load e2e 3/3 · view-accents 13/13.

### legacy grep (standing patterns)

| Pattern | Result | Verdict |
|---|---|---|
| `Loader2` (demo, excl ui/) | ~8 files, all **inline action-spinners** (`proposing`/`submitting`/`slugSwitching`/`pruning`/`searching`) | CLEAN — the W5 "3 Loader2 sites dead" gate targeted the CENTERED admin/list skeleton sites (confirmed by `AdminListSkeleton.vue` header "Replaces the generic centered `Loader2` spinner in every admin panel"); inline spinners are legitimate affordances |
| `sessionToken` (api) | present, but all = the branded `SessionToken` type + `c.var.sessionToken` session-identity (the canonical post-L design; `models.ts:49`) | CLEAN — NOT the L-era-excised palette FIELD; canonical state is `(visibility, tier)` |
| `status:` 4-state on palette | absent | CLEAN — excised at L |
| `savedColors`/`slug-status` polls | W2-6 cured (`87dd7d2`) | CLEAN |
| `atomDiff`/`/remix`/`/diff` (api) | present (deferred, §2) | recorded deferral, not a leak |

### `as any` / `as unknown as` ledger (REGENERATED — both figures on record)

| Surface | `as any` | `as unknown as` | CLAUDE.md claim | Verdict |
|---|---|---|---|---|
| `src/` | `grep -c` = **1** BUT the single hit is a **comment** (`parsing/index.ts:509` `// so no cross-realm as any cast is needed.`) → **0 actual casts** | **8** | "src/ holds 0 `as any`"; "8 at tranche S" | **MATCHES** — 0 real `as any` casts (the grep line is a comment); the 8 `as unknown as` are the documented class (layout-cache DOM ×1 · dispatch Color<T> erasure ×4 · contrast WCAG ×1 · parsing color-unit/color clone-reinterpret ×2) |
| `api/src` | **0** | **1** (`index.ts:189` `server.close()` handle) | "0 `as any`, 1 `as unknown as`" | **MATCHES** exactly |

The `as unknown as` count regenerable ledger (`grep -rn 'as unknown as' src/ | wc -l`) = 8 — no
drift from CLAUDE.md. **Ledger CLEAN.**

---

## §5 — §6.2 budget re-run on the built bundle (2026-07-06)

`npm run gh-pages` clean (exit 0). Method reproduced from `w3-chunk-census.md`: eager set =
entry `<script type=module>` + every `<link rel=modulepreload>` + the render-blocking
`<link rel=stylesheet>` in `dist/gh-pages/index.html` (`<noscript>` twins + `media=print onload`
deferrals excluded); gzip level 6; KiB = ÷1024. Bundle: `index-BVVcoT_A.js` / `index-DCurCBZi.css`.

| Gate | W3 close (`7819526`) | **W9 close (`a4e45f7`)** | Gate | Verdict |
|---|---|---|---|---|
| **JS eager** gzip | 345.4 KiB (353,653 B) | **347.9 KiB (356,260 B)** | ≤ 280 | **RE-BASELINE — 67.9 over**; drift **+2.5 KiB** = W4–W7 demo shell (title/accent/seal) in `index` (196.8→198.9 K gz) |
| **Render-blocking CSS** gzip | 85.5 KiB (87,517 B) | **86.5 KiB (88,533 B)** | ≤ 120 | **MET** (33.5 KiB headroom); drift **+1.0 KiB** |
| Eager cold-load (JS+CSS) | 430.9 KiB | **434.4 KiB** | measured | recorded (+3.5 KiB) |

Per-chunk eager JS at close: `index` 198.9 K · `glass-ui` (vendor) 109.5 K · `color-utils`
21.0 K · `dispatch` 11.5 K · `packrat-entry` 4.6 K · `createLucideIcon` 1.6 K ·
`useDocumentVisibility` 0.2 K · `rolldown-runtime` 0.4 K · `prng` 0.2 K = **347.9 K gz**. The
render-blocking CSS is the single local `index-*.css` 86.5 K; the 98.1 K `glass-fonts-*.css`
stays deferred via `media=print onload` (W3-9 discipline holds; its `<noscript>` twin excluded).

**JS-eager verdict**: the RE-BASELINE stands (RP-2). The ≤280 gate is unreachable by demo
deferral — the 33 KiB `@mkbabb/glass-ui/goo-blob` barrel anchor (L20, **confirmed unlanded**
§2) + vendor-prohibited 109.5 K + `src/`-off-bounds 32.5 K + irreducible App shell. Drift +2.5
KiB is recorded, not silently reconciled (R lesson 3). Re-verify at W8 (L20 landed → −33 KiB).

**Frame budgets**: the standing `smoke-perf` project (3 frame-budget specs) was GREEN at W3
close (drag p50 8.4 ms · view-switch first-frame 8.3 ms · idle p50 8.3 ms · mix 1.13 s,
`w3-frame-budget-measure.md`) and re-reproduced at W7 close (full-swap 5.7 ms / 0 long tasks,
`2a322459`). The eager graph did not change class since (only +2.5 KiB shell). A headless
re-drive in this lane is GPU-dependent and unreliable; the frame-budget row is **carried green
from the W3/W7 standing oracle** — recorded honestly, not re-asserted from a fresh run.

---

## §6 — Relay / letter dispositions (2026-07-06)

### GLASSUI-S-ASKS L1..L20 — per-item, verified against `../glass-ui` @ `c3ea22a8`

| L# | Sev | State | Evidence |
|---|---|---|---|
| L1 | P0 | **CURED** | 3 GLSL defects all resolved (§2): `flat` local gone · fwd-decl vec4 = def vec4 · vec4→vec4 assign |
| L2 | P1 | **OPEN (GAP-L2)** | `atoms.ts` lightnessScheme/lBand/hueSpread door still absent → W8 |
| L3 | P0 | **OPEN (producer)** | `useWatercolorBlob` zombie rAF → `useRAFLoop`; rides the blob co-rebuild / W8 |
| L4 | P0 | **CURED** | `GlassDock.vue` `--glass-backdrop-luma` observer + declarative floor (§2) |
| L5 | P0/P1 | **OPEN (GAP-L5)** | blob first-principles co-rebuild; HERO preset + `uSatColor[]` + satellites-at-rest absent → W8 (genesis brief relayed `3188171`) |
| L6 | P1 | **OPEN (producer)** | slider thumb-border token / spectrum hover recipe → W8 adopt |
| L7 | P1 | **OPEN (producer rider)** | EasingPicker `defineExpose(playTravel)` for consumer PRM auto-trace not present; W5-9 gap-row stands |
| L8 | P1 | **OPEN (ask un-actioned)** | `clampLabel` absent in glass-ui src; value.js consume-need dissolved by the W7-1 seal (no dock label) |
| L9 | P1 | **OPEN (producer)** | skeleton `::after` `--skeleton-shimmer-delay` → W8 |
| L10 | P1/P2 | **OPEN (producer)** | mask-based corner clip / dither → W8; demo integer-snap half LANDED (`635cefe3`) |
| L11 | P2 | **OPEN** | dropdown-menu glass tokens → W8 |
| L12 | P2 | **OPEN (time-sensitive)** | `/styles/fonts` 18th specifier before BH.B4e MIGRATION table |
| L13 | P1/P2 | **OPEN (producer)** | dock hover-morph off `--duration-panel` → W8 |
| L14 | P2 | **OPEN** | ConfiguratorRow label API → W8 |
| L15 | P2 | **OPEN** | ONE gold/admin shimmer primitive (≥2-consumer bar) → W8 |
| L16 | P2 | **OPEN** | `-webkit-backdrop-filter` policy across 10 stylesheets → W8 |
| L17 | P1 | **NOT FIRED** | GooBlob→`Blob` rename; rides 5.0.0 cut (exports still `./goo-blob`) |
| L18 | P1 | **CURED** | `SelectTrigger.vue:139` `in-data-[state=open]:rotate-180` (§2) — the exact proposed fix |
| L19 | (ADDENDUM A4) | **CONSUMED** (pointer door) | setCursor/injectCursorVelocity consumed at W6-7; richer field-warp door stays open |
| L20 | (W3 addendum A5) | **OPEN** | `goo-blob/config` subpath absent → JS-eager RP-2 / §5; re-verify W8 |

**Pattern**: the P0 hard-gate-mapped items S DEPENDED on (L1, L4) are CURED; L18 CURED; the
pointer door CONSUMED. The rest ride the un-fired 5.0.0 adopt (S.W8). No demo shim was authored
for any open item (S-21 fence held; S touched ZERO glass-ui files).

### PT-E (parse-that) · KF courtesy · motion-inventory patch

- **PT-E**: DELIVERED at `../parse-that` `docs/tranches/A/VALUEJS-PT-E-2026-07-05.md` @ `ef10d5b`
  (`master`). **NO reply** — HEAD is the letter commit; parse-that is at tranche-A/0.11.0 and
  the asks are 1.1.0+ future work. Hand to successor (no reply expected).
- **KF-COURTESY**: DELIVERED at `../keyframes.js` `docs/tranches/S/VALUEJS-KF-COURTESY-2026-07-05.md`
  @ `ad1b811` (`tranche-t-impl`). Courtesy (no ask) — record stands.
- **Motion-inventory W9 docs-patch (M6)**: APPLIED in-bounds as a W9-close disposition appended
  to `audit/lanes/motion-animation-inventory.md` (the S corpus — R's `transition-inventory.md`
  is closed history + outside the W9 file bounds, so it is NOT edited). The patch records: **M1**
  (mix phase-clock) CONSUMED by W3-6/Q10 — one 900 ms clock (`mixStage.ts MIX_CONVERGE_MS=900`),
  spinner killed; **M3** (Tailwind bare-utility) LANDED at the `@theme` root
  (`style.css:119-120` aliases `--default-transition-duration`/`-timing-function`); **M5**
  (pane-wrapper) retuned W3-4/W3-5. The original R-inventory §3 "add the 2.9 s mix beat" content
  is **superseded** (the beat was re-authored, not documented).

---

## §7 — ι integrity sweep (commit-scope honesty)

Scanned every S-tranche commit `46ff8d3..a4e45f7` (the substrate → W7 close). Per-commit
top-dir spread + file-count reviewed; the ≥10-file commits spot-audited for the R `4963f33`
blemish class (an unrelated sweep tucked into a scoped commit).

**Result: CLEAN — no unscoped sweeps.** Every large commit's file set is coherent with its
subject: `dc9f1cb` (W2-8, 32f) = all `api/src` service unification · `964c399` (3.1.0 remed,
15f) = `src/units/color` + parsing + demo DisplayColorSpace metadata + CHANGELOG/pkg (the
declared ICtCp/Jzazbz landing) · `695cca1` (alpha checker, 14f) = demo picker/gradient +
verification screenshots · `33ba703` (W7-4, 13f) = demo dock/color + the accent-table test +
`vitest.config` registration · `fe30d68` (variance, 16f) = demo panes + π screenshots. No
commit crosses src+demo improperly, no docs-labeled commit touches source, and no foreign-tree
write appears in the value.js log (all cross-repo dispatches were separate commits in the sibling
repos). The `1adf468 chore(eslint): ignore .claude/**` infra fix is scoped to eslint config.

---

## §Handoff (to the successor tranche's FINAL.md books table)

Open at close: **X1** (prod api I-era; webhook dead) · **X2** (NCSU alias 200) · **glass-ui
5.0.0 adopt / CI un-pin / L17 rename** (un-fired; → S.W8) · the producer-gap rows **GAP-L2 /
GAP-ARM / GAP-L5 / PRM-expand / L20** + open L-asks (L2/L3/L5/L6/L7/L8/L9/L10/L11/L12/L13/L14/
L15/L16) → the W8 adopt walk · **W2-3 brand** (NEW, src-owned) · **`/remix`+`/diff` api-hygiene**
deferral · **dup-`useDark`** demo residue · **Color.try()** (soft, 12 wraps) · **S.H3 Pratt**
(dormant) · **FN-7** · **usePaletteStore schema** (dormant) · **kf resolveEasing** · **CH-10/
CH-13/R8-23/R-5/R-10** (all KEEP-BOOKED; no fired trigger at 2026-07). Plus the two RED PROBES:
**RP-1** (App.vue 408 → demo cohesion-lift) and **RP-2** (JS-eager RE-BASELINE → L20 + W8).

Doc-truth drift noted for the FINAL/doc-truth commit (not reconciled here): CLAUDE.md
"5 projects" is now **6** (smoke-perf added at W3); `waves/S.W9.md §Hard gate 7` "e2e 5-project"
likewise. Both are the smoke-perf standing oracle, added at W3.

---

## §ceremony — the S close ceremony (fired 2026-07-06 by the orchestrator)

The verification act above discharged the reconciliation; this section records the mechanical
close ceremony (`waves/S.W9.md §Commit plan` · `docs/RELEASE.md §3`). It is appended **after**
FINAL.md, per the FINAL.md header note that reserved the merge/tag/worktree-cleanup for the
orchestrator.

### §c.1 — Final suite on the merged-tree candidate (tranche-q @ `4a166c9`)

The merge is a `--no-ff` of `tranche-q` into `master`, and `tranche-q` is **166 ahead / 0
behind** `master` — so the merged tree is bit-for-bit `tranche-q`'s tree, and the suite re-run
on `tranche-q @ 4a166c9` **is** the merged-tree-candidate run. Re-driven end-to-end
2026-07-06 (not carried from the W7 head this time — the e2e 6-project suite was re-run cold):

| Gate | Command | Result |
|---|---|---|
| lint | `npm run lint` (`eslint . --max-warnings=0`) | **0** (exit 0) |
| typecheck | `npm run typecheck` (vue-tsc lib + demo) | **0** (exit 0) |
| unit | `npx vitest run` | **2158 / 2158** passed · **68 files** (exit 0) |
| gh-pages | `npm run gh-pages` (`vite build --mode gh-pages`) | **built** (exit 0, `✓ built`) |
| e2e | `npx playwright test` (6 projects) | **66 / 66** passed (exit 0; smoke · smoke-admin · smoke-mobile · smoke-reactivity · smoke-safari · smoke-perf — the safari sustained-30s + smoke-perf frame-budget gates green on this run) |

No red. The ceremony proceeds (no paperwork close over a red probe — none present).

### §c.2 — Worktree hygiene (`waves/S.W9.md` step 2)

FINAL.md's header note named the 5 stale `wf_01c28a82-3c2-*` seed-fleet worktrees at `7cd45c4`
as pre-ceremony debris. The live sweep found those **plus** 3 orphaned dead-lane branches and
symlink litter:

- **Removed (registered worktrees)**: `.claude/worktrees/wf_01c28a82-3c2-{1,2,3,4,5}` — all at
  `7cd45c4` (= master/R-close, 0 unique commits) — via `git worktree remove --force` +
  `git worktree prune`.
- **Deleted branches (8, all `wf_*`, all merged / 0 unique commits vs master)**:
  `worktree-wf_01c28a82-3c2-{1..5}` (the seed set) + `worktree-wf_45c5309a-78d-{2,3,4}` (dead-lane
  orphans whose worktrees were already gone — branch-only litter). Each verified
  `git rev-list --count master..<branch> == 0` **before** deletion (the unmerged-with-unique-
  commits = record guard; none qualified).
- **Symlink litter removed**: `.claude/worktrees/glass-ui` → `/Users/mkbabb/Programming/glass-ui`
  and `.claude/worktrees/keyframes.js` → `/Users/mkbabb/Programming/keyframes.js` (convenience
  symlinks that only served the now-removed lane worktrees' `file:../glass-ui`/`../keyframes.js`
  resolution; `rm` on a symlink removes the link, never the sibling repo).
- **Preserved (out of the named `wf_*` scope, conservative)**: the `worktree-palette-deploy`
  branch (`34a4df5`, a pre-R ancestor, 0 unique commits, non-`wf`, dated Feb-25) + its leftover
  `.claude/worktrees/palette-deploy/` dir — **not** a registered git worktree (absent from
  `git worktree list --porcelain` and `.git/worktrees/`), so it does not affect the end-state
  criterion. Left untouched rather than delete a non-scoped branch.

**End state**: `git worktree list` = the main tree only:

```
/Users/mkbabb/Programming/value.js  4a6b62b [master]
```

### §c.3 — The merge, the tag, the pushes

- **Merge** (`--no-ff`, `master` `7cd45c4` ← `tranche-q` `4a166c9`), **no conflicts**:
  - merge commit **`4a6b62b5eeba5257715b01d25dc72a1c61b26e13`**
  - parents: `7cd45c4` (master / R-close) + `4a166c9` (tranche-q / S FINAL)
  - message: `merge(tranche-s): S CLOSE — complete_with_misses: oracle floor + 3.0.0/3.1.0
    one-color-spine + budgets-as-gates + four Fable waves; 2 RED PROBES named (RP-1 cured,
    RP-2 JS-eager re-baseline)`
- **Tag** (annotated): **`tranche-s-close`** → tag object `5bb2d59` → merge commit `4a6b62b`.
  Message carries the FINAL verdict (`complete_with_misses`) + the publishes (3.0.0/`v3.0.0`
  immutable · 3.1.0/`v3.1.0` `dist-tags.latest`) + the 23-book hand-off count.
- **Push**: `git push origin master --follow-tags` → `7cd45c4..4a6b62b  master -> master` +
  `[new tag] tranche-s-close`. `git push origin tranche-q` → `Everything up-to-date`
  (`origin/tranche-q` already at `4a166c9`).

### §c.4 — CI on master (the W0 CI-log deferral discharges here)

The merge push is the **first master-targeting CI run** — the W0 gate's deferred workflow-log
proof (the `ci.yml` fires only on master push/PR):

- **Run**: `28828848774` — workflow **CI** (`node.js.yml`), event `push`, headSha `4a6b62b`,
  created `2026-07-06T22:54:51Z`.
- **URL**: https://github.com/mkbabb/value.js/actions/runs/28828848774
- **Jobs**: `build-and-test (22)` + `build-and-test (24)` (Node 22 / Node 24 matrix).
- **Terminal conclusion of run `28828848774`: `cancelled`** — and the *why* is a mechanical
  record, not a red: this merge-commit run was **auto-cancelled by GitHub Actions concurrency**
  when the ceremony-captures commit (`3afde6c`, the very commit that first bore this §c.4
  record) pushed to `master` ~1 min later. A newer push to the same branch cancels the older
  in-progress run. The `deploy-pages` triggered by this run's completion therefore correctly
  **`skipped`** (run `28829079578` — deploy is conditioned on CI success, not cancellation).
- **The authoritative CI run rolls forward to `master` HEAD.** After the captures commit the
  live run is on `3afde6c` (run `28829064701`, CI, `in_progress` at this correction). **No
  further ceremony-docs push follows this one** — precisely so the concurrency chain terminates
  and the latest `master`-HEAD run is allowed to complete and fire the owner-authorized
  `deploy-pages` (CF-Pages `color.babb.dev`). The successor observes the terminal conclusion of
  the latest `master` CI run at
  https://github.com/mkbabb/value.js/actions?query=branch%3Amaster.
- **This does not gate the close.** Per `waves/S.W9.md` step 3 the CI run status is *captured*,
  not re-gated; a red-from-env-gaps (or a concurrency `cancelled`) is a RECORD. The authoritative
  green is the merged-tree local suite in §c.1 (lint 0 · typecheck 0 · vitest 2158/2158 · e2e
  66/66 across 6 projects · gh-pages built), re-run cold on `tranche-q@4a166c9` = the merged tree.
- **Note**: this docs-capture commit itself lands on `master` and fires a *second* CI run (a
  docs-only push + its `deploy-pages` follow-on); it is the informational follow-up, not the
  close-gate run (the R-close precedent — the FINAL docs commit records the earlier run).

### §c.5 — Post-ceremony state captures

- `git status --porcelain`: **empty** (clean working tree).
- `git worktree list`: **main tree only** (§c.2 block above).
- Remote refs after push:
  - `refs/heads/master` → `4a6b62b`
  - `refs/heads/tranche-q` → `4a166c9`
  - `refs/tags/tranche-s-close` → `5bb2d59` (→ `4a6b62b`)

**Tranche S is closed.** The successor opens on the FINAL.md §5 books table (S.W8 glass-ui
5.0.0 adopt un-fired + the producer-gap rows + X1/X2 residuals), the §7 process lessons, and
the §6 standing oracle slate as its inherited floor.
