SERVED MODEL: claude-opus-5-5

# KF.W3 — execution record (Track B · X·KF · Parser Consumption)

Spec: `docs/tranches/X/keyframes/waves/KF-W3.md` (read whole at this open). Authority: COHESION §0hb (2026-11-02, binding) · §0fl.2 (UIA-KF-177 grant) · §0j.E (OC-1) · O-117 packet `docs/tranches/X/close/packets/keyframes-rd11.md`. Execution site (OP-2, ruled §0hb.1): `/Users/mkbabb/Programming/keyframes.js` on `master`, Track B's hand, pathspec commits only.

## Open

**Date**: 2026-11-02 (seat 0, `claude-opus-5-5`). Ledger status before: `GATE-KEYED` (row 66: *"never scheduled; opens or it does not"*); no prior record → fresh open, not RESUME.

### Crash-recovery read (before any act)

⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only — the sibling's pre-existing dirty file (§0hb.1: never staged, restored or edited). **0 inherited paths inside any KF.W3 writable set.** kf `master` = `origin/master` = `5c48e3da9bbb0df8a93ac04d1b1d136af20951e2`.

### OP-1 — `RC-P(4.1.0)`, re-run by this seat (never read off a status word)

Form of record: RELEASE-CONDITION.md + addendum `0eb6732e1` (conjunct 4 ADMITTED retired) → RC-P = 1 · 2 · 3 · 5 · 6. Commands are X-W11.e act 7's (X-W11.md:6079; FINAL.md §RC-P table). Scratch = session scratchpad `rcp/` (non-durable bytes; readings pasted here).

| # | conjunct | command (this seat, ×2) | reading |
| --- | --- | --- | --- |
| 1 | PUBLISHED(4.1.0) | ⟨`npm view @mkbabb/value.js@4.1.0 dist.shasum`⟩ · ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ · ⟨`shasum -a 1 mkbabb-value.js-4.1.0.tgz`⟩ · ⟨`guarded --light -- node scripts/ci/verify-packed-surface.mjs <tgz>`⟩ | registry `d488535c9bfc747e318895417c28a753a3b7b3d6` = packed sha1 (byte identity); `dist-tags.latest` = `4.1.0`; verify exit 0 ×2, `"ok":true` 129 / `"ok":false` 0, `achromaticRows 132`, `runtime css 20` · `runtimeExports 83`; run 1 ≡ run 2 (`cmp` identical). **TRUE** |
| 2 | TOTALITY(4.1.0) | §2.2 scratch mirror: untar the registry tarball, **symlink** the unmodified probe (sha256 `77678a574d7c6b11448b19b6ab8fc0686dddf405a01cd7ea16757bc0837ad4ec`) at its six-deep path, ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs`⟩ | `ok` ×9 parsers (`0/172 throw` each) · `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.` · exit 0 ×2, outputs identical. **TRUE** |
| 3 | EQUIVALENCE(4.1.0) | ⟨`guarded --timeout 30 -- npx vitest run -c bench/vitest.config.ts --maxWorkers=2`⟩ | `Test Files 2 passed (2)` · `Tests 19 passed (19)` ×2; `MIRROR-DEFECTS` lines 24 per run, **0 non-zero**; `STYLESHEET DEFECTS 0` (6 lines, all 0). **TRUE** |
| 5 | BAR-DISCHARGED | the one permitted document read: COHESION.md:1407 *"OC-1 (OP-3) — ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING"* (§0j.E, 2026-09-17); ⟨`git ls-files bench/records \| wc -l`⟩ → 744; `evidence/W3/bench-three-leg.md` 16916 B | **TRUE** |
| 6 | ROUTED(4.1.0) | ⟨`ls -l docs/tranches/X/parse-that/RELEASE-PACKET.md`⟩ · ⟨`grep -c` RC-P / RELEASE-PACKET / SS-6 INBOX.md⟩ · ⟨`grep -c parse-that ../fourier-analysis/package.json ../fourier-analysis/web/package.json`⟩ | packet 30555 B; INBOX `RC-P` 6 (×2) · `RELEASE-PACKET` 4 · `SS-6` 41; forbidden edge `0` · `0`. **TRUE** |

**`RC-P(4.1.0)` = TRUE** (all five conjuncts measured in this process, ×2). **The wave opens.**

Instrument notes (stated, not substituted): (i) the first TOTALITY attempt, run **without** `npm_config_ignore_scripts`, failed at the probe's internal `npm pack` (the tarball's `prepare` = `rm -rf dist && npm run build` → `Could not resolve entry module "index.html"`) and its `rm -rf dist` emptied that mirror; the mirror was re-extracted fresh and the conjunct read with FINAL §8 (ii)'s exact command — the probe was never edited. (ii) conjunct 3's bench reads `src`: ⟨`git diff --stat 'v4.1.0^{commit}' HEAD -- src bench`⟩ → `bench/retired.ts` only (`5d8ff8c43`, the retired-parser oracle fixture's cache location, §0gz.5 R17-9); **`src` diff empty**, so the subject equals the tag `d25c4514b`.

### OP-2 … OP-7 (§0 Open preconditions), at the bytes and in the ledger

| # | precondition | receipt | state |
| --- | --- | --- | --- |
| OP-2 | write authority named | COHESION §0hb.1 (2026-11-02): keyframes.js `master`, Track B, pathspec only; `KeyframeTimeline.vue` never staged | **RULED** |
| OP-3 | owning seat | §0b ADDENDUM 2026-08-28 (SS-1) + §0hb.1 | **DISCHARGED** |
| OP-4 | KF.W0 | LEDGER:49 `CLOSED 2026-09-17` | **MET** |
| OP-5 | KF.W1 (O-11 §B/§D2 exec-visible) | LEDGER:50 `CLOSED 2026-09-17`; O-21 re-delivered O-11 to the exec clone (INBOX:111) | **MET** |
| OP-6 | KF.W4 (easing trap + chassis) | LEDGER:51 `CLOSED 2026-09-17 (honest-RED …)`; ⟨`git -C keyframes.js grep -nE 'cssTwinFor\("(easeOutCubic\|bounceInEase)"\)' HEAD -- test`⟩ → **0** (phantom trail gone); kf `check` = `vue-tsc --noEmit` ×2 projects + `proof:structure` (chassis present) | **MET** |
| OP-7 | KF.W2 | LEDGER:52 `CLOSED 2026-09-17 (honest-RED …)` | **MET** |
| — | X-W11 (the coordinate's wave) | LEDGER:43 `CLOSED`; X-W11.md:6079 act 7 | **MET** |

### E13 Step-0 mail sweep (2026-11-02)

Paths: value `V/` + `V/coordination/` · glass `BK/coordination/` + `BL/` + `BL/audit/` (⟨`ls -dt glass-ui/docs/tranches/*/`⟩ → `BL BK BJ`: **BL is newest**, BK still swept as named) · keyframes.js `V/coordination/` · atlas `P/coordination/` + `U/` + `U/coordination/` (atlas newest = `U`). ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-11-02 01:59) → `glass-ui/docs/tranches/BL/FORMATION-PROGRESS.md` only; ⟨`git -C glass-ui log --since='2026-11-02 01:59' -- docs/tranches/BL docs/tranches/BK/coordination`⟩ → 5 glass-internal BL D2/D5 pass-11/12 cursor commits (`3fe62e668`…`d00eaa3b3`); their diff carries **0** lines naming value.js / keyframes. **0 unrowed mail addressed to value.js.** Strict UNREAD (status cell of an `I-n` row begins `UNREAD`) ⟨awk over `^| I-[0-9]+` rows⟩ → `0` ×2. Sweep line appended at INBOX end.

## Baseline

Measured READ-ONLY at kf `5c48e3da` (= origin/master; the spec's ref of record `81a56990` is superseded by the frontier — anchors re-resolved below, KF.W0 §B-12 / L-2) and value.js `a4ffb7114`, 2026-11-02.

| gate | BEFORE | basis |
| --- | --- | --- |
| G-KF3-1 | **RED** (conj 3 owed) | conj (1) the sentence stands verbatim (spec :9); conj (2) ⟨`grep -rn 'RC-P' docs/tranches/X/fourier/`⟩ → **1** (F-W0.md:459, *"…an admitted, packed value.js release satisfying `RC-P`…"*) — **GREEN before cure** (fourier's own file, as the gate requires); conj (3) the evaluator paste into `keyframes/evidence/W3/` — ⟨`ls docs/tranches/X/keyframes/evidence/W3`⟩ → *No such file* |
| G-KF3-2 | **GREEN before cure** | TOTALITY row above: `TOTAL 0 throws / 1548 calls` ×2 at the 4.1.0 tarball — the entry condition, turned by X-W9's value-side cure (E-2), not by this wave |
| G-KF3-3 | **RED** | kf declares `"@mkbabb/value.js": "4.0.0"` (`package.json:71`), ⟨`npm ls @mkbabb/value.js`⟩ → `4.0.0` (glass 10.1.2's copy deduped). Banked trial at 4.1.0 (X-W11.md:6072, O-117 packet §2): typecheck exit 2 (3 × TS2305 `TimelineHoverPreview.vue:276-277`), vitest `13 failed / 2303` in 4 files; control at 4.0.0 on those 4 files `105 passed (105)`. Cited, not re-run (context economy: `.c1` re-measures at the repin) |
| G-KF3-4 | **RED** | `css-text.ts:53 export const serializeCssValue` (spec's `:41` drifted +12) · `:66 if (!serialized.ok) throw new TypeError("Value returned an unserializable CSS color.");`; ⟨`git grep -lE 'emit/css-text\|from "\.{1,2}/css-text"' HEAD -- src demo test scripts \| wc -l`⟩ → **22** importing modules (spec census 1 counted 14 at `81a56990`; `.c2` re-derives the census at the frontier, LAW A). Routing target **now exists**: 4.1.0 packed `dist/subpaths/css.d.ts` exports `serializeCssValue` (⟨`grep -oE 'serialize[A-Za-z]*' css.d.ts \| sort -u`⟩ → `serializeCssColor serializeCssValue serializeTimelineOptions`). No O-11 §B discharge row in INBOX |
| G-KF3-5 | **RED** | one implementation `css-text.ts:29 export const reverseAnimationShorthand`; sole import `format/options.ts:20` (from `../css-text`), call `:122`; provider-naming prose standing at `backward.ts:20` · `options.ts:10` · `options.ts:81` · `index.ts:232` (+ provider-silent `backward.ts:256/:306`, `compile-roundtrip.test.ts:23`); `backward.ts:46` no longer matches (`.c3` re-reads the whole partition). 4.1.0 publishes **no** `reverseAnimationShorthand` on any of the seven subpaths (⟨`grep -oE` over `dist/subpaths/*.d.ts`⟩ → 0) ⇒ only discharge **(b) UNIFY-BY-TRUTH** is reachable |
| G-KF3-6 | **RED** | no kf-side dated ledger row acknowledging O-11 §D2 (⟨`grep -n 'O-11' INBOX.md \| grep D2`⟩ → 0) |
| G-KF3-7 | **RED** | no CALL-MAP exists (evidence/W3 absent) |
| G-KF3-8 (floor) | **GREEN before cure** | KF.W4's cure landed: phantom `cssTwinFor` asserts → 0 (OP-6 row). Not this wave's |
| G-KF3-9 (floor) | inherited, chassis present | kf `check` typechecks demo via `vue-tsc` ⟨`guarded --light -- npm run check`⟩ → exit 0, `proof:structure — PASS … 0 violations across R1–R6` |
| kf CI | **RED (pre-existing, both jobs)** | ⟨`gh run list -R mkbabb/keyframes.js --workflow ci.yml`⟩ → 8 latest runs `failure` back to `6ab81299` (2026-10-21), incl. push + schedule at `5c48e3da`. Run `40605561480` ⟨`--log-failed`⟩: **(1)** `demo correctness` — `test/compile/entry-roundtrip.test.ts` 2 failed (S1 *"expected … to match /display 350ms allow-discrete/"*; S4 *"expected 'block' to be 'none'"*); **(2)** `library gates` — `proof:published-surface — FAIL (1 finding)`: 5 public exports *"NEITHER README-taught NOR manifested"*: `cssIdent` · `resolveTimingFunction` · `reverseCSSTime` · `serializeTimingFunction` · `timingFunctionEntries`. `deploy-pages` `skipped` (gated on ci success) |
| G9 (X-W11) | **RED** | `npm ls --prefix ../keyframes.js @mkbabb/value.js` → `4.0.0` |
| glass pin | 10.1.2 | kf `package.json:78` `"@mkbabb/glass-ui": "10.1.2"` exact |

O-117 sites at the frontier: `demo/components/instrument/timeline/components/TimelineHoverPreview.vue:276` `import { decomposeMatrix2D, decomposeMatrix3D } from "@mkbabb/value.js/transform";` · `:277 import type { Mat4 } from "@mkbabb/value.js/transform";` · calls `:346` / `:356`. 4.1.0 `transform.d.ts` exports only `getPointAtLength` · `getTotalLength` · `PathSample` · `Point` (+ `PathGeometry` per the packet). `durationUnit` / `delayUnit`: 4.1.0 `css.d.ts:93,97`; ⟨`git grep -n durationUnit HEAD -- src demo test`⟩ → 0 in kf.

## Unit plan

Spec shape: 3 seats / 2 phases (`.a` ∥ `.b`, then `.c`). This plan keeps the spec's ids and order and **splits `.c` into five serial sub-units** along the spec's own one-commit-per-meaning lines (L-7) plus §0hb.2's separate glass commit, and adds `.d` for §0hb.2's GREEN ×2 + CI and §0hb.3's deploy. Concurrency cap 1 (orchestrator) ⇒ every group is a singleton; no two units share a modify path concurrently. All seats `opus` (no Fable / adjudicator seat is named in the spec; owner Opus-only law). Repo roots: **kf** = `/Users/mkbabb/Programming/keyframes.js`, **vjs** = `/Users/mkbabb/Programming/value.js`. Evidence home (spec §B.2): `vjs/docs/tranches/X/keyframes/evidence/W3/`. Every run through `guarded`; vitest `--maxWorkers=2`; playwright `--workers=1`; browser runs never `--light`. `KeyframeTimeline.vue` is never staged/restored/edited by any unit.

Order: `[.a] → [.b] → [.c1] → [.c2] → [.c3] → [.c4] → [.c5] → [.d]`.

| unit | sections (spec) | writable | gates | locks |
| --- | --- | --- | --- | --- |
| `.a` R1 call-map + attribution harness | §Carry C-1..C-5 (:203-207) · §B.3 (:89-106) · G-KF3-7 (:253-259) · E-14.5/E-15 (:333-418) · G-KF3-1 conj 3 (:217-222) · G-KF3-2 (:224-227) | vjs `docs/tranches/X/keyframes/evidence/W3/{CALL-MAP.md,rc-p-4.1.0.md,attribution-harness.mjs}` | G-KF3-7 · G-KF3-1 (conj 3) · G-KF3-2 (paste) | L-5 reachability only; C-3 CALL not import; C-4/C-5 pair reading; LAW A |
| `.b` DUAL-1 / fork unification design | §B.5 censuses 1/1b/2 (:114-150) · G-KF3-4 (:235-239) · G-KF3-5 (:241-245) · L-6/L-7 (:284-285) | vjs `…/evidence/W3/DUAL-1-DESIGN.md` | design input to G-KF3-4/-5 (turns none) | names discharge (a)/(b) BEFORE any edit; LAW A; SUBJECT-IDENTITY |
| `.c1` repin 4.0.0→4.1.0 + O-117 | §B.2 `package.json` row (:71-88) · G-KF3-3 (:229-233) · G-KF3-8 (:261-265) · §0hb.2 bullets 1-3 · O-117 packet §2-§3 | kf `package.json` (the value.js line) · `package-lock.json` · `demo/components/instrument/timeline/components/TimelineHoverPreview.vue` · `test/demo/instrument/timeline-hover-preview.test.ts` · `test/ingest/keyframes-name-escapes.test.ts` · `test/compile/easing-identity.test.ts` · `test/compile/grammar-fuzz.test.ts` · `test/fixtures/keyframes/manifest.json` (append) · `test/compile/{roundtrip-fidelity,compile-roundtrip}.test.ts` (attribution only) · a new kf-owned demo decomposition module if the seat's design needs one; vjs `…/evidence/W3/REPIN-ATTRIBUTION.md` | G-KF3-3 · kf typecheck · G-KF3-8 floor re-read | L-7 (repin + attribution = ONE commit); re-aim never weaken/delete; no compat shim; L-3 |
| `.c2` `serializeCssValue` fork retirement | §B.2 css-text row (:71-88) · §B.5 census 1/1b (:118-131) · G-KF3-4 (:235-239) · L-7 (:285) | kf `src/animation/compile/emit/css-text.ts` · every importer the frontier census returns (src/ · `demo/components/instrument/timeline/utils/timelineEngine.ts` · test/) · `test/fixtures/keyframes/manifest.json` (append) · fixture-arm tests; vjs `docs/tranches/V/coordination/INBOX.md` (append O-11 §B row) | G-KF3-4 | L-7 (retirement + divergence row + INBOX row = ONE commit); LAW A; `:66` throw dies |
| `.c3` DUAL-1 by truth + 8-curve ack + BH relay | §B.5 census 2 partition (:132-150) · G-KF3-5 (:241-245) · G-KF3-6 (:247-251) · SS-6 cross-edge (:292-313) · L-6 (:284) | kf `src/animation/compile/emit/{format/options.ts,backward/backward.ts}` · `src/animation/index.ts` (comment) · `test/compile/compile-roundtrip.test.ts` (comment only) · `src/animation/compile/easing/registry.ts` (guarded: only what the delta forces); vjs INBOX.md (append O-11 §D2 row + BH relay O-row) · `docs/tranches/V/coordination/<dated BH relay packet>.md` · `…/evidence/W3/EIGHT-CURVE-DELTA.md` | G-KF3-5 · G-KF3-6 | KF-CE-41; no rename; name-hygiene is KF.W4's; glass read-only |
| `.c4` UIA-KF-177 `durationUnit`/`delayUnit` | §0fl.2 grant · O-117 packet §3.4 | kf `src/animation/compile/parse-facade.ts` · `src/animation/compile/emit/css-text.ts` + the other emit sites the unit fields reach · one new falsifier test under `test/compile/` | UIA-KF-177 falsifier RED → GREEN ×2 | authored unit survives; no default-unit fallback masking |
| `.c5` glass 10.1.2 → 10.1.3 | §0hb.2 bullet 5 | kf `package.json` (the glass line) · `package-lock.json` | lock integrity = registry | SEPARATE commit; exact pin |
| `.d` GREEN ×2 + CI + deploy + G9 | §0hb.2 last bullet · §0hb.3 | kf paths only where a CI RED is this wave's own concern (else escalate); vjs `…/evidence/W3/CLOSE-RECEIPTS.md` · this record · LEDGER (row cells + log) | kf typecheck ×2 · kf vitest ×2 · kf CI GREEN · deploy-pages + post-deploy probe ×2 · G9 `npm ls` → 4.1.0 | no test.skip / allowlist; pre-existing CI REDs cured at root or escalated |

### Briefs (≤700 chars each; the dispatched brief is this text)

- **`.a`** — Build G-KF3-7's R1 CALL-MAP at kf `master` + value.js **4.1.0**: re-resolve every §B.3 site (6 demo hits = 3 imports + 3 calls; CSSCodeEditor ingress anchor re-resolved), the channel-(ii) easing seeds (`parseTimingFunction` ×3, `bezierPresets` consumers), and all 27 denominator ids (E-15's 26 + KF-HA-19), each REACHABLE / UNREACHABLE with mechanism, from the CALL graph (C-3), stating `useSquareTumble` token-path UNREACHABLE (C-4) AND `:23` `!ok` throw REACHABLE (C-5). Write `attribution-harness.mjs` (classifies a RED value-side vs kf-side by running the same test at 4.0.0 vs 4.1.0 in a scratch copy). Paste this record's RC-P table as `rc-p-4.1.0.md` (G-KF3-1 conj 3, G-KF3-2). Docs commit in vjs.
- **`.b`** — Design only, no product bytes. Re-derive LAW A census 1 for `serializeCssValue` at the frontier (every spelling incl. `@src` alias + relative depths; baseline reads 22 importing modules vs the spec's 14) and census 2 for `reverseAnimationShorthand` (provider-naming vs provider-silent partition, re-read line by line). Census 1b at 4.1.0's packed seven subpaths: `serializeCssValue` IS on `./css`, `reverseAnimationShorthand` is NOT. Diff kf's fork vs value's `serializeCssValue` output over the 14 fixtures (the `"a : b"`→`"a: b"` divergence) and name every text change. Name discharge (b) UNIFY-BY-TRUTH for G-KF3-5 before any edit. Write `DUAL-1-DESIGN.md`; docs commit.
- **`.c1`** — In kf: `npm install @mkbabb/value.js@4.1.0 --save-exact` (lock integrity = `sha512-K7wcvd…95SQ==`). Re-home `TimelineHoverPreview.vue:276-277` off retired `decomposeMatrix2D/3D` + `Mat4` at the root (current library surface; a kf-owned decomposition if none — no shim, no forwarding re-export). Re-aim the four 4.0.0-behaviour tests (`timeline-hover-preview`, `keyframes-name-escapes`, `easing-identity`, `grammar-fuzz`) at 4.1.0's contract — assert the new behaviour, keep each negative control with a real subject; never weaken or delete. Run G-KF3-3 arms (a)(b)(c) with per-RED attribution (via `.a`'s harness); dated manifest row for any changed fixture text. typecheck + vitest GREEN. ONE commit (L-7).
- **`.c2`** — Per `.b`'s census: delete kf's `serializeCssValue` fork (`css-text.ts:53-68` incl. the `:66` throw), route every importer (src/ · `timelineEngine.ts` via `@src` · test/) and the in-file uses to `@mkbabb/value.js/css`'s published `serializeCssValue`. Reconcile each fixture whose text changes with a **dated** divergence row in `test/fixtures/keyframes/manifest.json` (never a silent re-baseline). Append an INBOX row discharging **O-11 §B** (fork retired at 4.1.0). Re-run G-KF3-3 + typecheck; ONE commit in kf (+ the vjs INBOX append as its own pathspec commit in vjs, same act).
- **`.c3`** — G-KF3-5 by discharge (b): kf's `reverseAnimationShorthand` stands as the sole, acknowledged implementation; rewrite every PROVIDER-NAMING sentence (`backward.ts:20`, `options.ts:10/:80-81`, `index.ts:232`, + any census-2 re-read finds) to name kf as provider, and reword the provider-silent echoes under KF-CE-41; no rename. G-KF3-6: measure the bezierPresets key set and the 8 curves' `max|Δ|` 4.0.0 vs 4.1.0 (`EIGHT-CURVE-DELTA.md`), confirm the `registry.ts` boot fence survives, append a dated kf-side INBOX row acknowledging **O-11 §D2** with the deltas AND the DECLINED `approximated` discriminant. Batch any producer row met into one BH relay packet + O-row. Commits by meaning.
- **`.c4`** — UIA-KF-177 kf half (§0fl.2 grant): author a falsifier test first (an authored `durationUnit`/`delayUnit`, e.g. `ms` vs `s`, must survive ingest → emit round-trip) and bank it RED; plumb 4.1.0's `AnimationOptions` unit fields (`css.d.ts:93,97`) through `compile/parse-facade.ts` (ingest) and `css-text.ts` + the other emit sites at the root; falsifier GREEN ×2; typecheck + vitest GREEN. One commit.
- **`.c5`** — Separate commit: `npm install @mkbabb/glass-ui@10.1.3 --save-exact`; lock integrity equal to ⟨`npm view @mkbabb/glass-ui@10.1.3 dist.integrity`⟩; dedupe `@mkbabb/value.js` onto 4.1.0 (`npm ls` shows one copy); kf typecheck + vitest demo project GREEN; bounded live probe of the dock anchor (one browser, `--workers=1`) per §0hb.2's 10.1.3 dock-anchor cure.
- **`.d`** — kf `npm run check` ×2 + `vitest run --maxWorkers=2` ×2 GREEN; push kf `master` (ordinary push); kf CI must be GREEN. Baseline CI is RED pre-existing (entry-roundtrip S1/S4 allow-discrete; `proof:published-surface` 5 exports incl. `cssIdent`/`serializeTimingFunction`/`timingFunctionEntries`): cure at the root only what is this wave's concern, else ESCALATE with the measurement — never skip/allowlist. Then `deploy-pages` (workflow_run) + its §6 round-trip, plus a post-deploy probe ×2 of `https://keyframes.babb.dev`. Re-read X-W11 G9: `npm ls --prefix ../keyframes.js @mkbabb/value.js` → 4.1.0. Close receipts; LEDGER row.

## Unit receipts


### a

**Seat**: `.a` (claude-opus-5-5), 2026-11-02. Sections: §Carry C-1..C-5 · §B.3 · G-KF3-7 · E-14.5/E-15 · G-KF3-1 conj 3 · G-KF3-2. kf READ-ONLY (every kf byte via `git show HEAD:` / `git grep … HEAD`).

**Crash-recovery** ⟨`git status --porcelain -- docs/tranches/X/keyframes/evidence/W3 docs/tranches/X/execution/B/KF-W3.md`⟩ → empty; `evidence/W3` absent → **0 inherited paths**. kf ⟨`git rev-parse HEAD origin/master`⟩ → both `5c48e3da9bbb…`; kf dirty = `KeyframeTimeline.vue` only (sibling; read at `HEAD`, never the working tree).

**Acts, in order**

1. **Coordinates packed fresh** ⟨`npm pack @mkbabb/value.js@{4.0.0,4.1.0}`⟩ + ⟨`shasum -a1`⟩ → `ccb962e5…8b9d` (4.0.0) · `d488535c…b3d6` (4.1.0) = ⟨`npm view … dist.shasum`⟩ for 4.1.0. Scratch = session scratchpad `kfw3a/` (non-durable; readings pasted into CALL-MAP §0).
2. **Failure modes by execution** ⟨`guarded --light -- node reach.mjs <v>/package`⟩ ×2 per coordinate, `cmp` identical both → 31 lines each; **THROW 9 at 4.0.0 · 0 at 4.1.0** (`parseCssColor` empty-body ×5, `parseCssScalar("oklch()")`, `parseTimingFunction(null|42|{})`). `bezierPresets` 30 keys + 10 kf names → `easing()` 0 `!ok` at both. `"serializeCssValue" in css` false→true; `reverseAnimationShorthand` false at both. Instrument note: the first launch, named `probe.mjs`, was held by the guard's browser pool (name match) — killed and re-run as `reach.mjs`, script unchanged. ⟨`node sercolor.mjs`⟩ (18 colour spellings): serialize `!ok`/throw on parsed-ok colours = **0 at both** (→ `css-text.ts:66` UNREACHABLE on parsed input); `color-mix(in srgb, red, blue)` `ok=false`@4.0.0 → `ok=true`@4.1.0.
3. **§B.3 re-resolved** ⟨`git grep -n 'parseCssColor\|parseCssScalar\|parseCssValues' HEAD -- demo/`⟩ → **6 hits = 2 imports + 3 calls + 1 comment** (spec: 3+3; `KeyframesEditor.vue` deleted at kf `5e56d266`). **CSSCodeEditor ingress re-resolved**: `emitNow` `:435-438` / `debounce` `:440` → consumer `KeyframesStringControls.vue:200-215` (`await updateFromString` inside `try`) — contained. Every drifted anchor recorded with its TRUE bytes at CALL-MAP §5 (14 rows).
4. **Channel (ii)** ⟨`git grep -n 'parseTimingFunction\|bezierPresets' HEAD -- src demo`⟩: `parseTimingFunction` calls `registry.ts:165` (REACHABLE, kf-authored `requireParsed` throw) · `options.ts:105` (UNREACHABLE for registry curves) · `animationDescriptions.ts:74` (total) + `useTimingFunctionEditor.ts:231` (total; not in the spec seed, booked for completeness). `bezierPresets`: `registry.ts:4/:28` only; demo consumers ×7 → **0 calls** (5 comment hits) — blast radius = one module.
5. **Denominator** — 27 ids (E-15's 26 + KF-HA-19) entered with banked owner/classification + frontier re-check (per-component direct-edge census). Two mechanisms drifted and are restated (OrbitalDrag gained a `/math` edge; TimelineHoverPreview gained `/math` + runtime `/transform`), classification unchanged; O-117's retired-export break named for `.c1`.
6. **C-4/C-5 pair** (CALL-MAP §4): token path **UNREACHABLE** (empty → declared-literal fallback `:84`; shipped tokens all `ok=true`); `!ok` arm **REACHABLE** on authored CSS. **Intent at the true bytes**: the spec's `:23` `throw` no longer exists — KF.W13X MISS-4/D-27 made the arm (`:86-92`) degrade-not-throw; reachability unchanged, blast radius *"loop wedged"* → *"recolour off, reported once"*.
7. **`attribution-harness.mjs`** written (255 lines; `node --check` OK): copies kf bytes (`git archive <ref>` or `--source worktree`) twice into scratch, APFS-clones `node_modules`, installs the registry tarball of OLD vs NEW (sha1-verified) over every installed `@mkbabb/value.js` copy, runs the same `vitest run <files> --maxWorkers=2 --reporter=json` **serially through `guarded`**, classifies per file and per test id: VALUE-SIDE · KF-SIDE · VALUE-SIDE-CURED · GREEN · NOT-RUN · UNATTRIBUTABLE; exit 0/1/2. **Smoke** (files `easing-identity` · `selector-value4` · `entry-roundtrip`): run 1 exposed that env-gated browser-oracle tests (skipped at both) fell to UNATTRIBUTABLE → added the named **NOT-RUN** verdict (never counted GREEN); runs 2 ≡ 3 (`rows equal: true`) → `{"VALUE-SIDE":1,"GREEN":2}`, exit 1: `easing-identity` K1 *"NEGATIVE CONTROL — value.js's own easing() is unstable for 21 of the 40"* passed@4.0.0 / failed@4.1.0 = **VALUE-SIDE** (agrees with the banked trial, X-W11.md:6072); `selector-value4` GREEN; `entry-roundtrip`'s 5 browser-oracle ids NOT-RUN locally (its CI S1/S4 RED is therefore not attributable by this harness on this host — stated, not guessed).
8. **`rc-p-4.1.0.md`** = this record's OP-1 body (lines 16-30) pasted byte-for-byte ⟨`diff <(sed -n 16,30p KF-W3.md) <(tail -n +11 rc-p-4.1.0.md)`⟩ → identical.
9. **Commit** `a487be784` — `docs/tranches/X/keyframes/evidence/W3/{CALL-MAP.md,rc-p-4.1.0.md,attribution-harness.mjs}` (3 files, +412), pathspec.

**Gates BEFORE → AFTER** (read off the committed bytes ×2)

| gate | before | after | reading |
|---|---|---|---|
| G-KF3-7 | RED (no map) | **GREEN** | `CALL-MAP.md` 132 lines: CALL-graph method §0; channel (i) 8 sites §1 + channel (ii) 6 seeds §2; denominator ⟨awk over §3⟩ → `rows 27 · UNREACHABLE 21 · REACHABLE 3 · REACHABLE-but-correct 1 · POSTURE 1 · DECLINED 1 · other 0` ×2 (= spec `21+3+1+1+1`); C-4 UNREACHABLE ∧ C-5 REACHABLE both stated §4 |
| G-KF3-1 (conj 3) | RED (`evidence/W3` absent) | **GREEN** | ⟨`ls evidence/W3`⟩ → `CALL-MAP.md attribution-harness.mjs rc-p-4.1.0.md` ×2; paste carries 5 conjunct rows + `RC-P(4.1.0) = TRUE` (`grep -c` 5 · 1, ×2). Conj 1/2 GREEN at baseline → G-KF3-1 whole **GREEN** |
| G-KF3-2 (paste) | GREEN before cure (entry condition) | **GREEN, pasted** | conj-2 row `TOTAL 0 throws / 1548 calls` ×2 in `rc-p-4.1.0.md`; corroborated at kf's routed inputs: THROW 0 at 4.1.0 (act 2) |

**Adjacent edits**: none. **Escalations**: none. **Residuals**: (i) the harness cannot attribute env-gated browser-oracle tests (NOT-RUN) — `entry-roundtrip` S1/S4 (the pre-existing kf CI RED) need a browser-capable run for attribution (`.d`'s concern); (ii) §5 drifts are recorded at their true bytes, the spec text is untouched (E-3).

### b

**Seat**: `.b` (claude-opus-5-5), 2026-11-02. Sections: §B.5 censuses 1/1b/2 · G-KF3-4 · G-KF3-5 · L-6/L-7. **Design only — no product byte.** kf READ-ONLY at `HEAD` = `origin/master` = `5c48e3da`.

**Crash-recovery** ⟨`git status --porcelain -- docs/tranches/X/keyframes/evidence/W3/ docs/tranches/X/execution/B/KF-W3.md`⟩ → empty → **0 inherited paths**.

**Discharges named before any edit**: **G-KF3-5 → (b) UNIFY-BY-TRUTH** (4.1.0 publishes no `reverseAnimationShorthand`: 0 on all seven subpaths; value.js `v4.1.0:src` → 0). **G-KF3-4 → retire onto `@mkbabb/value.js/css` `serializeCssValue`** (present on `./css`).

**Acts, in order**

1. **Coordinate packed fresh** ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ · ⟨`shasum -a1`⟩ → `d488535c…b3d6` (= OP-1 registry sha). Scratch `kfw3b/` (non-durable; readings pasted into the design).
2. **Census 1 (LAW A)** — five greps (alias `emit/css-text`, every relative depth, any-specifier/any-quote, dynamic `import()`, symbol) + alias alphabet from `tsconfig.json` `paths` / `vite.config.ts` `alias`. The baseline's **22** = 19 `css-text` importers + 3 prose-only (`helpers.ts:71`, `constants/types.ts:83`, `public.ts:157`); of the 19, 6 import other symbols only ⇒ **delete consumer set = 13 modules** (8 src = the spec's eight, anchors drifted · 5 test = identical) + 3 surviving in-file callers (`:98 :115 :121`). **demo 1 → 0, and a FINDING**: `timelineEngine.ts` left `@src/…/css-text` at kf `b0d378b0` (2026-09-18) for **a second copy of the fork** at `demo/utils/helpers.ts:75-96` (same algorithm, same `TypeError` text `:93`), whose docblock premise *"value.js publishes no value serializer"* is false at 4.1.0. Design: `.c2` deletes it with the fork (§0bt twin-site adjacent edit), routes `timelineEngine.ts:196` to `./css`.
3. **Census 1b** ⟨`guarded --light -- node c1b.mjs <tgz>/package`⟩ ×2, `cmp` identical → `color 31 · value 1 · css 20 · easing 17 · math 9 · transform 3 · quantize 2 · TOTAL 83`; `serializeCssValue` on `./css` only; `reverseAnimationShorthand` on none; `./css` has no shorthand inverse under any name. Signature `css.d.ts:303` → `Result<string, ColorIssue>` ⇒ the retirement is an **unwrap per site**, not a specifier swap.
4. **Differential** fork (verbatim from `css-text.ts:53-68`, bound to 4.1.0's own `serializeCssColor`) vs published, ×2 `cmp` identical: **14 fixtures → `VALUES 39 DIVERGENT 0`** (no 14-fixture manifest row owed by the retirement); controls reproduce `"a : b"`→`"a: b"` and the `if(supports(…))` witness. Arm-(c) inputs: 27 literals from the five census-1 test modules, every sub-node → `NODES 151 DIVERGENT 28`, **all 28 the one class** (space-list whitespace before `:`/`;` collapsed, value `serialize.ts:100`), all inside the 7 `if()` inputs. Named behaviour changes: `conditional.ts:84` condition text to `env.supports`/`matchMedia` (mocks are argument-blind → no assertion changes) · `:119` style compare (unexercised) · emit of an `if()`-bearing declared value · `!ok` Result instead of the `TypeError`.
5. **Unwrap design** (§4): per-site table routing `!ok` to each site's existing refusal channel (`function.ts:36` `param.default ?? DROP` · `conditional.ts` `undefined`/`false` · `browser.ts` `BrowserScalarResolutionError` · `format.ts:332` `{refused,key}`); the string-only emitters propagate to the nearest existing channel, else a Triumvirate trigger for `.c2` — **no `serializeOrThrow` wrapper, no fallback string, no try/catch**.
6. **Census 2** ⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src demo test scripts`⟩ → 10 lines (1 def `css-text.ts:29` · 1 import `options.ts:20` in block `:19-23` ← `../css-text` · 1 call `:122` · 7 prose), each sentence re-read whole: **4 PROVIDER-NAMING** (`backward.ts:20-21` · `options.ts:10` · `options.ts:80-86` · `index.ts:232-233`) · **3 PROVIDER-SILENT** (`backward.ts:256` · `:306` · `compile-roundtrip.test.ts:23`). **Delta vs spec (5·3)**: `backward.ts:46` left the partition (now names colour kernels only). Per-row corrections for `.c3` written. Neighbour booked to `.c4`: `css-text.ts:13-18` *"`CSSAnimationOptions` carries no unit"* false at 4.1.0.
7. **Write** `DUAL-1-DESIGN.md` (163 lines ⟨`wc -l`⟩ ×2, written in pieces, every anchor re-verified at the bytes after writing; 4 drifted line cites in my own draft corrected before commit). **Commit `d97d62f1e`** (pathspec, 1 file).

**Gates**: design input to G-KF3-4 and G-KF3-5 — **turns none** (both stay RED: BEFORE RED → AFTER RED, as planned). **Adjacent edits**: none. **Escalations**: none. **Residuals / for the orchestrator**: (i) `.c2`'s planned writable set omits `demo/utils/helpers.ts` — the twin fork's delete is in-concern (§0bt), named here so `.c2` lists it under adjacent edits (or the plan widens it); (ii) the string-only emit sites (`format.ts:67` · `densify.ts:51` · `entry.ts:166` · `css-text.ts:98/:115/:121` · `metadata.ts:158` · `interp-slot.ts:333/:336` · `timelineEngine.ts:196`) need a refusal channel `.c2` must find at the bytes — if none is reachable without widening a public signature, `.c2` escalates rather than throwing.

### c1

**Seat**: `.c1` (claude-opus-5-5), 2026-11-02. Sections: §B.2 `package.json` row · G-KF3-3 · G-KF3-8 · COHESION §0hb.2 bullets 1-3 · O-117 packet §2-§3. Writes in kf `master` + vjs `evidence/W3/REPIN-ATTRIBUTION.md` + this record.

**Crash-recovery** ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling; never staged/edited) · vjs ⟨`git status --porcelain -- <record> evidence/W3/`⟩ → empty ⇒ **0 inherited paths**.

**Acts, in order**

1. **Repin** ⟨`guarded --light -- npm install @mkbabb/value.js@4.1.0 --save-exact`⟩ → `package.json:71` `4.1.0`; lock 4 lines, `integrity sha512-K7wcvd…95SQ==` = ⟨`npm view … dist.integrity`⟩; ⟨`npm ls`⟩ one copy `4.1.0` (glass 10.1.2's deduped).
2. **BEFORE at 4.1.0, uncured** ⟨`guarded --light -- npm run check`⟩ → exit 2, 3 × TS2305 `TimelineHoverPreview.vue(276,10)(276,29)(277,15)`; ⟨`guarded -- vitest run <the 4 O-117 files>`⟩ → `13 failed | 92 passed (105)` (= packet §2).
3. **Re-home at the root** — no kf decomposition existed (⟨`git grep -n -i decompose -- src demo test`⟩ → prose only), 4.1.0 `./transform` has none ⇒ new kf-owned `demo/components/instrument/timeline/utils/decomposeMatrix.ts`: CSSOM §15.1 2D + unmatrix Gram–Schmidt 3D, computing only what the ghost reads (rotation, scale, 2D skew; translation dropped and perspective unrepresented, as the component already states); 3D returns `null` on a degenerate linear part instead of writing `NaN`. `TimelineHoverPreview.vue` imports it (`:276`), `Mat4` cast removed (`:355`), the `:347` comment naming the retired `recomposeMatrix2D` corrected. No shim, no forwarding export, value.js untouched.
4. **Re-aim the four** (each re-measured at 4.1.0 by a throwaway probe, deleted after): `timeline-hover-preview` +2 (volumetric arm had no assertion: `matrix3d` rotateY(90°) → `rotate3d(0,1,0,π/2)` `scale3d(1, 1, 1)`, translate dropped; degenerate control → no ghost transform) · `keyframes-name-escapes` clause (b) asserts end-to-end linkage (diag `[]`, 2500ms) for the 5 names 4.1.0 accepts; clause (c) asserts the 4.0.0 refusal gone for `pu\+lse` and keeps the real refused subject `a\(b` (rule-level `PARSE_ERROR`, sibling `input`, 0 frames) · `easing-identity` asserts 4.1.0 `easing()` stable ×40 and equal to the registry's reference; negative control re-cut onto a non-registry `cubic-bezier()` (fresh ref per call, grid-equal) · `grammar-fuzz` tripwire PROMOTED: no throw, `PARSE_ERROR` naming `${fn}()`, `parseStylesheet(css).ok === false`. No assertion deleted or relaxed; docblocks restated with the 4.0.0 → 4.1.0 history.
5. **Gates** — 4 files `108 passed (108)`; ⟨`npm run check`⟩ exit 0 ×2; ⟨`guarded -- vitest run --maxWorkers=2`⟩ ×4: runs 1, 4 `2290 passed | 2 expected fail | 14 skipped (2306)`, runs 2, 3 `1 failed` = `r4dock-share-fallback` (2) `[145,145]` vs `[0,145]`, the pre-existing banked flake (`pass-46/test-demo-flake-r4dock.log`), isolated ×3 GREEN.
6. **Commit kf `c18a9bd9`** (pathspec, 8 paths: `package.json` · `package-lock.json` · `TimelineHoverPreview.vue` · `utils/decomposeMatrix.ts` · the four tests) — L-7 one commit. Not pushed (`.d`).
7. **G-KF3-3 attribution** — arm (c) roster re-derived by the spec's command at `HEAD` (18 paths; worktree identical; spec's 12 + 6) ∪ the 3 O-117 files = 21. ⟨`attribution-harness.mjs --source HEAD`⟩ → `{"GREEN":17,"VALUE-SIDE":4}` (13 ids, all O-117, 0 KF-SIDE); ⟨`--source worktree`⟩ → `{"GREEN":18,"VALUE-SIDE-CURED":3}`. Arms (a)(b) GREEN at both coordinates, both runs; no fixture text changed ⇒ no manifest row owed. **`REPIN-ATTRIBUTION.md`** written (100 lines, in pieces; anchors re-verified).
8. **G-KF3-8 floor re-read** — 0 phantom asserts (3 prose hits); boot fence evaluates at 4.1.0.

**Gates BEFORE → AFTER**

| gate | before | after | reading |
| --- | --- | --- | --- |
| G-KF3-3 | RED (no `V ≠ 4.0.0` run; uncured 4.1.0: 13 RED) | **GREEN** | arms (a)(b)(c) GREEN at 4.1.0 over the re-derived roster; every RED attributed (13/13 VALUE-SIDE); `REPIN-ATTRIBUTION.md` §2-§4 |
| kf typecheck | exit 2 (4.1.0 uncured) | **exit 0 ×2** | `npm run check` |
| kf vitest | 13 failed | **2290/2290 ×2** (runs 1, 4) | flake run 2-3 named above |
| G-KF3-8 (floor) | GREEN before cure | **holds** | `REPIN-ATTRIBUTION.md` §6; pageerror probe = `.d` |

**Adjacent edits**: none (the `:347` comment is inside `TimelineHoverPreview.vue`, in the set). **Escalations**: none. **Residuals**: (i) `registry.ts:51-52` declares the kf memo *deleted in KF.W3's repin commit* once 4.1's memoised `easing()` lands — premise measured TRUE, but `registry.ts` is `.c3`'s guarded path / the G-KF3-6 boot fence: orchestrator to route; (ii) `parse-facade.ts:33-38` *"ABSORB IS UNREACHABLE … 4.0.0's parseStylesheet THROWS"* false at 4.1.0 → `.c4` (owns the file); (iii) `r4dock-share-fallback` flake → `.d`.

### c2

**Seat**: `.c2` (claude-opus-5-5), 2026-11-02. Sections: §B.2 css-text row · §B.5 census 1/1b · G-KF3-4 · L-7. **Status: ESCALATED — no product byte written, no INBOX row (L-7: the O-11 §B row rides only with the retirement).**

**Crash-recovery** ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling; untouched) · vjs ⟨`git status --porcelain -- INBOX.md <this record>`⟩ → empty ⇒ **0 inherited paths**. kf `HEAD` = `c18a9bd9` (`.c1`).

**Acts, in order (all read-only)**

1. **Census 1 re-derived at `HEAD`** ⟨`git grep -n '\bserializeCssValue\b' HEAD -- src demo test scripts`⟩ + ⟨`git grep -n css-text HEAD -- src demo test scripts | grep -E 'import|from|export'`⟩ → **= `.b` §1.2 exactly**: 13 importing modules (8 src · 5 test) + in-file `:98 :115 :121` + the demo twin `helpers.ts:75` → `timelineEngine.ts:4,:196`. No barrel re-exports the symbol (`emit/index.ts:57,:64` carry other names). No drift since `.b`.
2. **Census 1b re-read** — installed `node_modules/@mkbabb/value.js` `4.1.0`; `dist/subpaths/css.d.ts:303` `export declare function serializeCssValue(value: CssValue): Result<string, ColorIssue>;` — the only `CssValue → string` serializer on the seven subpaths (⟨`grep -n '): string;' dist/subpaths/*.d.ts`⟩ → `math.d.ts:25 cubicBezierToString` only). The retirement is therefore an **unwrap at every site** (`.b` §2), with `ColorIssue.code` ∈ 7 codes (`css.d.ts:84-86`).
3. **Channel measurement per string-only site** (`.b` §4 left these to `.c2` "at the bytes, under (iii)/(v)": no throw, no wrapper, no fallback string, no try/catch; *"If a site has no reachable channel without widening a public signature, that is a Triumvirate trigger for `.c2`, not a licence for a throw"*):

| site (kf `HEAD`) | returns | nearest caller with a refusal channel | measured |
| --- | --- | --- | --- |
| `function.ts:34` · `conditional.ts:84/:119` · `browser.ts:146/:217` · `format.ts:338` · `metadata.ts:158` | — | own channel (`param.default ?? DROP` · `undefined`/`false` · `BrowserScalarResolutionError` · `{refused,key}` · the `syntax == null` `continue` skip `:151`) | **channel exists** (`.b` §4 holds) |
| `format.ts:67` `declaredDeclarationsFor` | `DeclaredDeclaration[]` (`value: string`) | none: → `declaredKeyframeBody :151` → **`CSSKeyframesToStrings` `:168`, public** (`public.ts:201`, `load-engine.ts:111`, `Promise<string[]>`); → `view-transition.ts:164` | **no channel without widening a public signature** |
| `css-text.ts:98/:115/:121` (`serializeDeclaration` · `serializeStylesheetItem`) | `string` | none: → `parse-facade.ts:206 serializeDeclarationBlock` (string); → `options.ts:166 propertyRegistryToString` → `format.ts:409` → `keyframesBlock` → **`CSSKeyframesToString`, public** (`public.ts:200`) | **no channel without widening** |
| `densify.ts:51` · `format.ts:257 keyframesBlock` | `string` | `backward.ts:274-275` → `compileToCSS` `refusals: CompileRefusal[]` — but `CompileRefusalReason` (`refusal-probes.ts:4`) is **public** (`emit/index.ts:37` → `public.ts`) and the *"CC-3 four named refusals"* trust surface (`backward.ts:78`, `:176-178`); a 5th reason widens it | **channel only by widening a public union** |
| `entry.ts:166` `frameDecls` | `Decl[]` | `EntryRefusal` taxonomy (`entry.ts:77-106`), **public** (`public.ts:190`, consumed by `demo/scenes/spring/StartingStyleTarget.vue:233`) | **channel only by widening a public union** |
| `interp-slot.ts:333/:336` `serializeInterpSlot` | `string` | none: → `compile/value/compile.ts:261 serializeCompiledValue` → `sink.ts:45/:77` (the per-frame style writer). Its own colour arm `:325-328` already **throws** `TypeError(\`Color serialization failed: ${code}.\`)` (pre-existing, kf-authored) | **no channel**; the frame tier's only precedent is a throw |
| demo `timelineEngine.ts:196` (after the `helpers.ts:66-96` twin delete) | `flatVars` string | none in the engine | **no channel** |

**Why not land the channel-bearing half**: G-KF3-4 is GREEN only when the fork **and** its `:66` throw are deleted **and every** consumer imports `./css` (spec G-KF3-4 (i)); L-7 binds retirement + divergence row + O-11 §B row to ONE act. A partial re-route leaves the fork live and discharges nothing; landing it would be a line-count discharge (LAW A).

**ESCALATION (Triumvirate trigger named by `.b` §4, measured above).** Retiring the fork onto value 4.1.0's `Result`-returning `serializeCssValue` with no throw / wrapper / fallback / try-catch requires widening **public** kf signatures (`CSSKeyframesToString(s)`, `CompileRefusalReason`, `EntryRefusal`, the view-transition and per-frame sink paths). That is a kf public-surface decision outside a unit's hand. Rulings that would make it executable (owner/arbiter picks one):
- **(A) widen** — the string emitters return a typed refusal; `CompileRefusalReason`/`EntryRefusal` gain an `unserializable-value` reason (the trust surface's "four" restated); `CSSKeyframesToString(s)` + `serializeDeclarationBlock` return `Result`; the sink path gets a declared channel. Semver-major for kf's public surface.
- **(B) totality by construction** — refuse an un-serializable colour leaf at INGEST (`parse-facade` / `parseAndFlattenObject` already carry diagnostics), so every `CssValue` reaching emit is serializable; the emit-side `!ok` arm then still needs a ruled disposition (types force it).
- **(C) ruled boundary throw** — a typed kf error carrying `ColorIssue.code` at the emit tier (the `interp-slot.ts:327` precedent), explicitly authorized; today barred by `.b` §4(iii) and G-KF3-4's "re-implement under another name" arm.

Reachability (L-5, recorded): parse-sourced colours never serialize `!ok` at 4.1.0 (`.a` `sercolor.mjs`: 0/18); the arm is reached only by programmatic `CssValue`s (demo HSV, `canonicalizeColors`, computed channels).

**Gates BEFORE → AFTER**: G-KF3-4 **RED → RED** (fork `css-text.ts:53-68` + `:66` throw standing; twin `helpers.ts:75-96` standing; 0 consumers on `./css`; no O-11 §B row). G-KF3-3: not re-run (no byte changed; `.c1`'s GREEN stands at `c18a9bd9`). **Commits**: this record only. **Adjacent edits**: none. **Residual noted for the ruling**: `compile/value/compile.ts:259-268 serializeCompiledValue` renders space-lists with `" "` (no `:`/`;` collapse) — a third list serializer the ruling's census should name.

### c3

**Seat**: `.c3` (claude-opus-5-5), 2026-11-02. Sections: §B.5 census 2 partition · G-KF3-5 · G-KF3-6 · SS-6 cross-edge · L-6. **Discharge named before any edit: G-KF3-5 → (b) UNIFY-BY-TRUTH** (`.b` §5; 4.1.0 publishes no `reverseAnimationShorthand` on any subpath).

**Crash-recovery** ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling; untouched) · vjs ⟨`git status --porcelain -- V/coordination evidence/W3 <this record>`⟩ → empty ⇒ **0 inherited paths**. kf `HEAD` = `c18a9bd9`.

**Acts, in order**

1. **Census 2 re-read at `HEAD`** ⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src demo test scripts`⟩ → **10 lines** = `.b` §5 exactly (1 def `css-text.ts:29` · 1 import `options.ts:20` ← `../css-text` · 1 call `:122` · 7 prose). Partition unchanged: **4 PROVIDER-NAMING** (`backward.ts:20-21` · `options.ts:10` · `options.ts:80-86` · `index.ts:232-233`) · **3 PROVIDER-SILENT** (`backward.ts:256` · `:306` · `compile-roundtrip.test.ts:23`); spec's `backward.ts:46` stays out (colour kernels only). **Neighbour found by the re-read** ⟨`git grep -n -i 'published inverse\|shorthand grammar\|0\.12\.0 inverse' HEAD -- src test demo`⟩ → beyond the four: `options.ts:149` *"via value.js's `serializeStylesheetItem` (the published inverse of the `@property` parser)"* — the same false-provider class on a sibling symbol (kf's own `css-text.ts:103`; ⟨`grep -c serializeStylesheetItem dist/subpaths/*.d.ts`⟩ at 4.1.0 → 0 on all seven). Not G-KF3-5's predicate subject; in-file, same KF-CE-41 concern ⇒ corrected.
2. **Prose correction** (comment-only; no rename, alias, or delete): rows 1-4 now name kf's `reverseAnimationShorthand` (`../css-text`) as the sole implementation, the inverse over value.js's `CSSAnimationOptions` model (`@mkbabb/value.js/css` `collectAnimationOptions`, `css.d.ts:59`); *"value.js's OWN"* / *"published 0.12.0 inverse"* / *"value.js's OWN shorthand grammar"* struck; `index.ts` names the true HEAVY edge (value.js colour kernels via `backward/color.ts:32`) and drops the phantom `sampleColorRamp` edge (⟨`git grep -n sampleColorRamp HEAD -- src`⟩ → that comment only). Provider-silent rows 5-7 true as written under (b) — left (so `compile-roundtrip.test.ts` is untouched). ⟨`guarded --light -- npm run check`⟩ ×2 → **exit 0 ×2**. **Commit kf `bc37f98f`** (pathspec: `backward.ts` · `format/options.ts` · `src/animation/index.ts`).
3. **G-KF3-6 measurement** — fresh ⟨`npm pack @mkbabb/value.js@4.0.0 @mkbabb/value.js@4.1.0`⟩ (sha1 `ccb962e5…8b9d` / `d488535c…b3d6`; 4.1.0 `easing.js` `cmp` = kf installed), ⟨`node delta.mjs v400 v410`⟩ ×2 `cmp`-identical → `bezierPresets` 30 → 30 **identical** (0 added / 0 removed); `changed(>1e-9) 8`: `ease-out-circ` **1.923e-1** · `ease-in-expo` 6.930e-2 · `ease-in-circ` 4.489e-2 · `ease-in-quad` 4.157e-2 · `ease-in-cubic` 3.162e-2 · `ease-out-sine` 3.082e-2 · `ease-in-sine` 3.038e-2 · `ease-out-quad` 2.520e-2 (= O-11 §D2 to 4 s.f.); 22 others Δ = 0.
4. **Boot fence** ⟨`node fence.mjs <kf node_modules/@mkbabb/value.js>`⟩ ×2 → `registryNames 40 rejected 0 · eight∩bezierPresets 8`; module evaluated by kf tests ⟨`guarded --timeout 10 -- npx vitest run --maxWorkers=2 easing-identity + orchestration-api`⟩ ×2 → `59 passed (59)`; ⟨`… public-surface + timing-function-names`⟩ ×2 → `51 passed (51)`. Fence anchors drifted (spec `:31`/`:37-48`/`:43-46` → `:28`/`:54-65`/`:60-62`), intent unchanged. **`registry.ts` untouched** — the delta forces no byte.
5. **Wrote `EIGHT-CURVE-DELTA.md`** (in pieces; the embedded script `diff`-verified verbatim against the run script; anchors re-read after writing — two corrected before commit: O-11 decline `:209-211`, and the demo blast radius re-measured ⟨`git grep -n bezierPresets -- demo`⟩ → 5 comment lines, 0 code reads, superseding the spec's `TimingFunctionPanel.vue`/`EasingSidebar.vue` consumer anchors). **Appended INBOX `I-77`** (after `I-76`, in-table): dated kf-side acknowledgement of O-11 §D2 with the 8 deltas AND the DECLINED `approximated` discriminant (accepted, no dissent; 4.1.0 `easing.d.ts` `approximated` → 0). **Commit vjs `f3e409656`** (pathspec: INBOX.md · EIGHT-CURVE-DELTA.md).
6. **SS-6** — producer rows met while mapping: **0** (no glass surface consulted for a cure; `EasingSidebar.vue:148`'s note that glass's bezier catalogue is value.js `bezierPresets` is satisfied by §2's identical key set). ⇒ **no BH relay packet minted, no O-row** (a packet over zero rows would be ceremony).

**Gates BEFORE → AFTER** (each reading ×2 at the settled bytes)

| gate | before | after | reading |
| --- | --- | --- | --- |
| G-KF3-5 | RED (4 provider-naming sentences false) | **GREEN** | at kf `HEAD` `bc37f98f` ⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src demo test scripts \| wc -l`⟩ → 10 · implementations (`export const reverseAnimationShorthand`) → **1** (`css-text.ts:29`) · sentences attributing it to value.js / a published inverse ⟨`git grep -nE "value\.js's[^.]{0,60}reverseAnimationShorthand\|published[^.]{0,20}inverse" HEAD -- src test demo \| wc -l`⟩ → **0** · imports from `@mkbabb/value.js` → **0**; ×2 identical. Discharge (b); no rename/alias/delete |
| G-KF3-6 | RED (no kf-side row) | **GREEN** | ⟨`grep -c '^\| I-77 .*O-11 §D2.*1.923e-1.*DECLINED' INBOX.md`⟩ → 1 ×2; the row carries all 8 measured deltas + the DECLINED discriminant, as an INBOX ledger row (E13), not prose |
| kf typecheck | exit 0 (`.c1`) | **exit 0 ×2** | `npm run check` after the prose commit |

**Adjacent edits**: none (`options.ts:149` is inside the writable set). **Escalations**: none. **Residuals (for the orchestrator)**: (i) `registry.ts:33-53` still describes 4.0.0's un-memoised `easing()` and schedules the memo's deletion *"in KF.W3's repin commit"*, which `.c1` landed without it — not forced by the 8-curve delta, so untouched under this unit's lock (`registry.ts` name/memo hygiene is not `.c3`'s); route to a seat that owns it. (ii) Provider-silent rows 5-7 left verbatim (true under (b)). (iii) G-KF3-4 stays RED on `.c2`'s escalation; `.c3` neither depends on nor touches it.

### c4

**Seat**: `claude-opus-5-5`, 2026-11-02. **Sections**: COHESION §0fl.2 (ESC-W13X-r3res2f-1, UIA-KF-177 kf half GRANTED at the repin) · O-117 packet `close/packets/keyframes-rd11.md` §3 item 4 · §0hb.2 bullet 4. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, untouched) → **0 inherited paths** in this unit's set. kf `HEAD` at open = `bc37f98f`.

**Anchors at the true bytes (INTENT recorded)**: value.js 4.1.0 `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` ⟨`grep -n durationUnit\|delayUnit`⟩ → `:93 durationUnit?: CssTimeUnit;` · `:97 delayUnit?: CssTimeUnit;` (= packet). Live shape probe (scratch, `guarded --light -- node`): `animation: x 500ms linear 2s` → `{"duration":0.5,"durationUnit":"ms","delay":2,"delayUnit":"s",…}`; longhands `0.25s`/`1500ms` → `"s"`/`"ms"`. **Drifted ingest anchor**: `compile/parse-facade.ts` only re-exports `collectAnimationOptions` (`:49`, `:74`) — no mapping lives there, so nothing to change in it; the seconds→ms mapping that dropped the unit is `src/animation/engine/css/metadata.ts:66,76` (`recoverAnimationOptionsBase`), merged by `engine/css/animation.ts:205-207` into `setOptions` → `engine/option-setters.ts applyOptions`. kf `AnimationOptions`/`InputAnimationOptions` (`constants/types.ts:183`, `:242`) carried no unit field. Emit sites reading an option-sourced time (⟨`git grep -n reverseCSSTime -- src`⟩): `css-text.ts:32,34` · `format/options.ts:46,58` (+ `animationShorthand` `:114`) · `entry.ts:401,417` · `view-transition.ts:408` (via `groupTiming`) · `backward.ts:312` (an EXTERNAL stagger offset, `child.delay`, no authored unit — left on the shortest form by design).

**Acts**
1. Falsifier authored FIRST: `keyframes.js/test/compile/uia-kf-177-authored-unit.test.ts` (6 cases: ingest keeps `durationUnit`/`delayUnit`; longhand emit `500ms`/`0.05s`; shorthand emit `^0\.05s linear 250ms `; entry emit `opacity 350ms linear` and no `0.35s`; re-ingest fixed point; explicit-unit `reverseCSSTime` + unit-less shortest control). Each authored spelling is one the shortest-exact rule rewrites, so a dropped unit reads RED. Two input re-aims before banking (the shorthand case authored `linear` explicitly, since the default easing serializes to `linear(…)`; the entry case uses longhands, since a sibling `animation:` shorthand routes `compileToEntry` to its pre-existing `entry-scroll-grammar` refusal — measured by a scratch probe, deleted).
   ⟨`guarded --light -- npx vitest run test/compile/uia-kf-177-authored-unit.test.ts --maxWorkers=2`⟩ ×2 → **`Tests 5 failed | 1 passed (6)`** both runs; failures: `expected undefined to be 'ms'` · `…to contain 'animation-duration: 500ms;'` · `expected '50ms linear 0.25s 1 normal forwards x' to match /^0\.05s linear 250ms /` · `…to match /opacity 350ms linear/` · `expected '0.5s' to be '500ms'`. The passing case is the fixed-point control (true before and after). **RED banked ×2.**
2. Cure at the root (one commit, kf **`4ed542d5`**, 8 files, +158/−21):
   - **ingest**: `metadata.ts` carries `opt.durationUnit` / `opt.delayUnit` beside the ms number into the option base;
   - **model**: `AnimationOptions` gains `durationUnit?` / `delayUnit?: CssTimeUnit` (type-only import from `@mkbabb/value.js/css`, the light-edge invariant kept), `InputAnimationOptions` the same two keys;
   - **setters**: `applyDuration` / `applyDelay` take the unit and pair it with the number they set (`applyTimeUnit`): a bag carrying the number sets its unit; a unit-less number (`setDuration(2000)`, an omitted delay reset to the default) clears a stale unit — so a unit never re-spells a value the author did not write in it, and no default unit is ever invented;
   - **emit**: `reverseCSSTime(ms, unit?)` writes `s`/`ms` as authored; only when NO unit was authored does it keep the r4lib shortest-exact spelling (seconds on a tie) — the existing behaviour for programmatic numbers, not a fallback over a lost unit; threaded through `reverseAnimationShorthand` (`options.durationUnit/delayUnit`), `animationOptionsToString` (`:46,:58`), `animationShorthand` (the `CSSAnimationOptions` bag now carries the units, conditional spreads under `exactOptionalPropertyTypes`), `compileToEntry` enter/exit, and `view-transition.ts` `groupTiming` (animation-sourced branches carry `durationUnit`; the bare `{duration, timingFunction}` group bag has none).
3. Gates (WRITE-THEN-MEASURE, after the commit's bytes):
   - ⟨`guarded --light -- npx vitest run test/compile/uia-kf-177-authored-unit.test.ts --maxWorkers=2`⟩ ×2 → `Tests 6 passed (6)` ×2; with the r4lib falsifier `uia-kf-177-css-time.test.ts` alongside → `Tests 17 passed (17)` (the shortest-exact contract for unit-less times stands).
   - ⟨`guarded --light -- npm run check`⟩ ×2 → exit 0 ×2 (`vue-tsc` ×2 projects, then `proof:structure — PASS … 0 violations across R1–R6`). One intermediate TS2741 at `view-transition.ts:314` (the bare-bag branch) cured by declaring the field optional before the commit.
   - ⟨`guarded --timeout 30 -- npx vitest run --maxWorkers=2`⟩ ×2 → `Test Files 294 passed | 5 skipped (299)` · `Tests 2296 passed | 2 expected fail | 14 skipped (2312)` · rc 0, both runs (= `.c1`'s 2290 + this unit's 6).

| gate | BEFORE | AFTER |
| --- | --- | --- |
| UIA-KF-177 falsifier | RED ×2 (5/6 failed) | **GREEN ×2** (6/6) |
| kf typecheck | exit 0 (`.c3`) | **exit 0 ×2** |
| kf vitest | 2290/2290 (`.c1`) | **2296/2296 ×2** |

**Adjacent edits** (§0bt — the ingest seam and the option model are where the unit was dropped; same concern, same repo, a few lines each): `keyframes.js/src/animation/constants/types.ts:18` (type import), `:186-193`, `:196-198` (`AnimationOptions` unit fields), `:255-256`, `:258-259` (`InputAnimationOptions` unit keys) — the model the grant names ("kf's `AnimationOptions` unit plumbing"); `src/animation/engine/css/metadata.ts:66-69`, `:79-82` — the true ingest site (the grant's `parse-facade.ts` anchor drifted: it only re-exports); `src/animation/engine/option-setters.ts:28` (type import), `:77-91` (`applyTimeUnit`), `:95`, `:109`, `:115`, `:118`, `:200`, `:202` — the pairing of unit to number. `parse-facade.ts` itself: **unchanged** (nothing to plumb at the true bytes).

**Escalations**: none. **Residuals (for the orchestrator)**: (i) the demo instrument path `demo/components/instrument/keyframes/composables/useKeyframeOps.ts:45-46` (`stored.duration = reverseCSSTime(animation.options.duration)`) and its own ingest `utils/parseAnimationCSS.ts:58` sit outside this unit's set and grant (demo, not the library emit); the library now exposes the unit on `animation.options`, so passing it there is a two-argument change for a demo-owning unit. (ii) A constructor-explicit numeric `duration` merged over a CSS-ingested base (`engine/css/animation.ts:207`, `{ ...base, ...ctorOptions }`) rides the CSS rule's authored unit, the bag's pairing — stated, not changed. (iii) A programmatic CSS-time STRING (`setOptions({ duration: "500ms" })`) is parsed to ms by `engine/options.ts tryParseTime` without recording its unit — outside the grant (the grant is value.js's unit fields), unchanged behaviour.

### c5

**Seat**: `claude-opus-5-5`, 2026-11-02. **Sections**: COHESION §0hb.2 bullet 5 (glass `10.1.3` exact, a SEPARATE commit from the value.js repin; the release carries the dock-anchor cure, value O-114 / glass O-110). **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, untouched) → **0 inherited paths** in this unit's set. kf `HEAD` at open = `4ed542d5`; ⟨`grep -n glass-ui package.json`⟩ → `:78 "@mkbabb/glass-ui": "10.1.2"` (anchor holds).

**Acts**
1. ⟨`npm view @mkbabb/glass-ui@10.1.3 dist.integrity`⟩ → `sha512-URKzGBjP3cwx9GUoyzH6/dGInNlRE0RjIivaqXg+SdeOT1dQ4lJ9gnTJK2tIQNIcFp1en/i97k7rw/iDOi+0lg==`; peer `@mkbabb/value.js: ^4.0.0` (4.1.0 satisfies).
2. ⟨`guarded --light -- npm install @mkbabb/glass-ui@10.1.3 --save-exact`⟩ → `package.json` +1/−1 (`:78` → `"10.1.3"`), `package-lock.json` +4/−4 (root devDep + the `node_modules/@mkbabb/glass-ui` version/resolved/integrity; nothing else moved). ⟨`node -e` lock entry⟩ → `10.1.3 sha512-URKzGBjP…OiDOi+0lg==` = registry, **byte-equal**. ⟨`npm ls @mkbabb/value.js @mkbabb/glass-ui`⟩ → `@mkbabb/glass-ui@10.1.3 └── @mkbabb/value.js@4.1.0 deduped` · `@mkbabb/value.js@4.1.0` — **one copy**.
3. **Adjacent edit (§0bt — the oracle that asserts the pin I changed)**: `keyframes.js/test/demo/app/scene-skeleton-shimmer.test.ts:6-9` (header names 10.1.3 + §0hb.2), `:17-18` (`GLASS_10_1_3_INTEGRITY` = the registry string above), `:22,:24,:27,:28` (`10.1.2` → `10.1.3`). The pin witness advances exactly as `5c48e3da` advanced it for 10.1.2; no assertion removed or relaxed.
4. Commit kf **`17a5c34d`** (pathspec: `package.json package-lock.json test/demo/app/scene-skeleton-shimmer.test.ts`; separate from `.c1`'s value.js repin `c18a9bd9`). Erratum, stated: the subject's abbreviated integrity reads `…OUJ0lg==`; the true tail is `…OiDOi+0lg==` (full value in act 1 and in the committed lock/test bytes).

**Gates (WRITE-THEN-MEASURE, on the settled bytes = `17a5c34d`)**
- ⟨`guarded --light -- npm run check`⟩ ×2 → exit 0 ×2 (`vue-tsc` ×2 projects; `proof:structure — PASS: scope=src clean (0 violations across R1–R6)`).
- ⟨`guarded --timeout 20 -- npx vitest run --project demo --maxWorkers=2`⟩ × 4 runs (run 1 overlapped the act-3 edit, so runs 2–4 are the settled reading): run 2 `166 passed (166)` · `981 passed (981)` rc 0; run 3 `981 passed (981)` rc 0; runs 1 and 4 `1 failed | 980 passed (981)`, both the same test: `test/demo/app/r4dock-share-fallback.test.ts` (2) — `AssertionError: expected [ 145, 145 ] to deeply equal [ +0, 145 ]` (the fallback link field's selection at `:70`). Isolated ⟨5× that file + the pin witness⟩ → 3 pass / 2 fail (same assertion); pin witness passes every run.
- **Attribution of that RED (A/B, not a cure)**: (i) ⟨`diff -rq` 10.1.2 tarball `dist/` vs installed 10.1.3 `dist/`⟩ → 7 differing files, **all dock** (`dock.js`, `components/dock/styles/{index,layers,shape,shell}.css`, two dock `.d.ts`); `SharePopover.vue` imports glass `button` · `popover` · `input` · `labeled-field` · `separator` (+ test-mocked `toast`), none of which references `dock` (⟨grep⟩ → 0 each) — every glass byte the test loads is identical across the repin. (ii) A/B at 10.1.2 (the published tarball swapped into `node_modules` for the run, then the 10.1.3 tree restored; ⟨`npm ls`⟩ re-read `10.1.3` / value 4.1.0 deduped): 6× isolated → 5 pass / **1 fail**. **Verdict: a pre-existing, glass-independent timing race in the UIA-KF-321 limb (focus → `select()` vs the field's value write), not caused by this unit**; its cure lives in `demo/app/dock/menu/SharePopover.vue` / the test, outside `.c5`'s set → residual for `.d` (below). Not skipped, not retried into green.
- **Live probe — the 10.1.3 dock-anchor cure** (⟨`guarded --timeout 20 -- npx vite --port 5199 --strictPort`⟩ background, stopped after; ⟨`guarded --timeout 5 -- node <scratch>/c5-dock-anchor.mjs`⟩ non-light, ONE headless Chromium, one context per cell, closed in `finally`; per-rAF trace of both `.glass-dock` plates through a hover expand and a pointer-away collapse on `#/cube`, a control counted as visible overflow only when the plate does not clip):

| cell | phase | frames | width px | centre offset `cx−vw/2` max | visible-overflow px / frames | morph frames (unclipped) | pageerrors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 | expand | 168 · 160 | 56→333.4 | 0 · 0 | 0 / 0 · 0 / 0 | 63 (0) · 62 (0) | 0 · 0 |
| 1440 | collapse | 587 · 562 | 333.4→56 | 0 · 0 | 0 / 0 · 0 / 0 | 68 (0) · 65 (0) | 0 · 0 |
| 390 | expand | 189 · 191 | 56→257 | 0 · 0 | 0 / 0 · 0 / 0 | 73 (0) · 75 (0) | 0 · 0 |
| 390 | collapse | 645 · 647 | 257→56 | 0 · 0 | 0 / 0 · 0 / 0 | 74 (0) · 74 (0) | 0 · 0 |

(run 1 · run 2.) The plate holds its anchor (kf's ChromeDock is viewport-centred, so the anchor is `cx = 0`, held every frame; y fixed 43.3 / 29.5; the transport dock's left/right edges 1 value each); controls beyond the reserved-box geometry during the morph (raw 114.8 px at 1440, 83.2 px at 390) are inside glass's `[data-morphing]` `overflow: clip` in every morph frame (0 unclipped) — none paints outside the plate. **GREEN ×2.** Scratch probe + JSON in the session scratchpad (non-durable; readings pasted here).

| gate | BEFORE | AFTER |
| --- | --- | --- |
| lock integrity = registry `dist.integrity` (glass 10.1.3) | n/a (10.1.2 pinned, `sha512-6ePtoIFA…QQ0yQ==`) | **GREEN** — byte-equal |
| one `@mkbabb/value.js` copy at 4.1.0 | 4.1.0 deduped under 10.1.2 | **GREEN** — 4.1.0 deduped under 10.1.3 |
| kf typecheck | exit 0 (`.c4`) | **exit 0 ×2** |
| kf vitest demo project | 979/979 at 10.1.2 (`5c48e3da`) / full 2296 (`.c4`) | **981/981 ×2 (runs 2, 3)**; runs 1, 4 RED 1 on the pre-existing r4dock race (A/B-attributed glass-independent) |
| dock-anchor live probe | — | **GREEN ×2** |

**Adjacent edits**: `keyframes.js/test/demo/app/scene-skeleton-shimmer.test.ts:6-9,:17-18,:22,:24,:27-28` — the pin oracle for the version this unit changed (§0bt).

**Escalations**: none. **Residual (for `.d`)**: `test/demo/app/r4dock-share-fallback.test.ts:70` (UIA-KF-321) is intermittent (full demo 2/4 RED, isolated 2/5 at 10.1.3, 1/6 at 10.1.2): `selectionStart/End` read `[145,145]` — the fallback field is focused but its whole-link selection is lost to a later value write. It will redden `.d`'s GREEN ×2 / CI at random; the cure is at the root of `demo/app/dock/menu/SharePopover.vue`'s focus-then-select ordering (or the limb's wait), owned by a demo seat — never a retry/skip.

### d

**Seat**: `.d` (claude-opus-5-5), 2026-11-02. **Sections**: COHESION §0hb.2 last bullet · §0hb.3. **Status: ESCALATED.** Full receipts are in `docs/tranches/X/keyframes/evidence/W3/CLOSE-RECEIPTS.md`.

**Crash recovery**: kf has `MM KeyframeTimeline.vue` only (the sibling's, never staged). The vjs set is clean, so **0 inherited paths**.

**Acts, in order**
1. Ran ⟨`guarded --light -- npm run check`⟩ ×2 at `17a5c34d` → rc 0 ×2.
2. Ran ⟨`guarded --timeout 20 -- npx vitest run --maxWorkers=2`⟩ ×2 at `17a5c34d` → rc 0 ×2 (`2296 passed | 2 expected fail | 14 skipped (2312)`).
3. **Baseline CI attribution** (`41433228470`): two pre-existing REDs, both present since at least `39071539437` (2026-10-17).
   - **R-1** `entry-roundtrip` S1/S4. This is the wave's concern: `ca8c0433` (UIA-KF-177, seconds on a tie) left this chromium-gated oracle at `350ms`. Reproduced locally with `KF_PLAYWRIGHT_DIR` → 2/5 RED.
   - **R-2** `proof:published-surface` (b). Five HEAVY exports from KF.W5's `2e0d91ae` publication door are neither taught nor manifested.
4. **Cure R-1**: kf **`d4148cdc`** (`test/compile/entry-roundtrip.test.ts` only).
   - S1 asserts `display 0.35s allow-discrete`.
   - S4's strip regex matches any `<time>`.
   - No assertion is removed or relaxed.
   - Chromium reading ×2 → 5/5 · 5/5.
5. On the settled `d4148cdc`:
   - check ×2 → rc 0 ×2.
   - vitest ×2 → rc 1 (`1 failed | 2295 passed`, `r4dock-share-fallback.test.ts` (2) `[145,145]` vs `[0,145]`, which is `.c5`'s UIA-KF-321 residual) · rc 0 (2296 passed).
6. Pushed ⟨`git push origin master`⟩ → `5c48e3da..d4148cdc` (ordinary push).
7. Read CI `41450770277` → **failure**.
   - Every library-gates step is green up to `publish boundary`, which fails on R-2.
   - `browser oracles` is **success** (R-1 cured).
   - The demo job fails at `publish artifact boundary (post-build)`, on R-2. Behind it, `demo roster` and `record last-demo-green` were skipped.
8. `deploy-pages` `41451374073` → **skipped** (it is gated on ci success). The break-glass dispatch was not used, because it would bypass a RED gate. The §6 round-trip and the post-deploy probe ×2 were **not run**.
9. Read G9 ⟨`npm ls --prefix ../keyframes.js @mkbabb/value.js`⟩ ×2 → `4.1.0` (deduped under glass 10.1.3) ×2 → **GREEN**.

**Gates BEFORE → AFTER**

| gate | BEFORE | AFTER |
| --- | --- | --- |
| check ×2 | — | **GREEN** ×2, at both coordinates |
| vitest ×2 | — | GREEN ×2 at `17a5c34d`, but only 1 of 2 at `d4148cdc` (r4dock race) |
| kf CI | RED (R-1 + R-2) | **RED** (R-2 only) |
| deploy + §6 | — | **BLOCKED** |
| post-deploy probe ×2 | — | **NOT RUN** |
| G9 | RED (4.0.0) | **GREEN** (4.1.0) |

**Commits**: kf `d4148cdc`, plus this record and `CLOSE-RECEIPTS.md` (vjs). **Adjacent edits**: none.

**Escalations**:
- **ESC-KFW3-d-1** (R-2): a publication-doc ruling is needed for the five KF.W5 doors. The proposed root cure is five `docs/published-surface.md` rows, one per name (tier · README anchor or `manifest-only: <reason>`), plus the stale *"exact `@mkbabb/value.js@4.0.0` pin"* prose at `:17`, in one docs commit. Never an allowlist.
- **ESC-KFW3-d-2**: the UIA-KF-321 race in `demo/app/dock/menu/SharePopover.vue`. The cure is the focus-then-`select()` ordering at the root, by a demo seat; it is not retried here.

**Residual**: `.c2`'s escalation still stands, so G-KF3-4 stays RED.

## Close

**Seat**: CLOSE (VERIFY-ONLY, `claude-opus-5-5`), 2026-11-02. Cured nothing. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, untouched); vjs ⟨`git status --porcelain`⟩ over this record + LEDGER → clean ⇒ **0 inherited paths**. kf `HEAD` = `origin/master` = `d4148cdc` (status `## master...origin/master`, 0 ahead).

**Verdict: PARTIAL.** Six of seven close gates are GREEN at this seat's own double-run. **G-KF3-4 stays RED** on `.c2`'s escalation, which is a Triumvirate trigger. kf CI is RED on R-2 (ESC-KFW3-d-1), so deploy and the post-deploy probe are still owed.

### Act 1 — commit roster and bounds (⟨`git show --stat`⟩ on each commit)

| unit | repo | commit | paths | in writable set? |
| --- | --- | --- | --- | --- |
| open | vjs | `3e89df9f3` | record · LEDGER · INBOX (sweep line) | yes |
| `.a` | vjs | `a487be784` · `381a31e2e` | `evidence/W3/{CALL-MAP.md,attribution-harness.mjs,rc-p-4.1.0.md}` · record | yes |
| `.b` | vjs | `d97d62f1e` · `c577f3569` | `evidence/W3/DUAL-1-DESIGN.md` · record | yes |
| `.c1` | kf | `c18a9bd9` | `package.json` · `package-lock.json` · `TimelineHoverPreview.vue` · `timeline/utils/decomposeMatrix.ts` (new, plan-licensed) · the 4 re-aimed tests | yes |
| `.c1` | vjs | `b10555f6b` | `evidence/W3/REPIN-ATTRIBUTION.md` · record | yes |
| `.c2` | vjs | `d5cf129c7` | record only (ESCALATED, no product byte) | yes |
| `.c3` | kf | `bc37f98f` | `backward.ts` · `format/options.ts` · `src/animation/index.ts` (comment only) | yes |
| `.c3` | vjs | `f3e409656` · `5fd046ff2` | INBOX (`I-77`) · `evidence/W3/EIGHT-CURVE-DELTA.md` · record | yes |
| `.c4` | kf | `4ed542d5` | `css-text.ts` · `entry.ts` · `format/options.ts` · `view-transition.ts` (emit sites) · falsifier test; adjacent §0bt: `constants/types.ts` · `engine/css/metadata.ts` · `engine/option-setters.ts` (declared in the receipt) | yes (adjacent edits declared) |
| `.c4` | vjs | `015dc855a` | record | yes |
| `.c5` | kf | `17a5c34d` | `package.json` · `package-lock.json`; adjacent §0bt `scene-skeleton-shimmer.test.ts` (declared) | yes, and kept separate from `.c1` |
| `.c5` | vjs | `04b4f6701` | record | yes |
| `.d` | kf | `d4148cdc` | `test/compile/entry-roundtrip.test.ts` (R-1, this wave's concern: UIA-KF-177) | yes |
| `.d` | vjs | `791b95b1f` | record · LEDGER (+1 line) · `evidence/W3/CLOSE-RECEIPTS.md` | yes |

**Landed-wrong: 0.** No commit touches a path outside its unit's set or its declared adjacent edits. glass-ui, sibling trees and `scripts/dev/dev.sh` were untouched.

### Act 2 — every spec gate re-run by this seat (×2 where a run is involved)

| gate | BEFORE (Baseline) | AFTER (this seat) | reading |
| --- | --- | --- | --- |
| G-KF3-1 | RED (conj 3 owed) | **GREEN** | conj 1: ⟨`grep -c 'evaluates TRUE per …RELEASE-CONDITION.md` §6a' KF-W3.md`⟩ → 1 · conj 2: ⟨`grep -rn 'RC-P' docs/tranches/X/fourier/ \| wc -l`⟩ → 1 (fourier's own file) · conj 3: `evidence/W3/rc-p-4.1.0.md` (4083 B) present, with ⟨`grep -c 'GREEN — every public parser is total'`⟩ → 1 |
| G-KF3-2 | GREEN before cure | **GREEN** | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc…b3d6` = ⟨`npm view … dist.shasum`⟩. The probe is unmodified (sha256 `77678a57…d4ec`) and symlinked into the untarred mirror. ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → rc 0 ×2, `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.`; the two outputs are `cmp`-identical |
| G-KF3-3 | RED | **GREEN** | I re-derived the arm (c) roster with the spec's `git grep -l -E …` at kf `HEAD` `d4148cdc` → 18 paths (= `.c1`'s 18). I ran that roster ∪ the 3 O-117 files (21 files, including arm (a) `roundtrip-fidelity` over the 14 `.css` + manifest, and arm (b) `compile-roundtrip`) with ⟨`guarded --timeout 10 -- npx vitest run <21> --maxWorkers=2`⟩ ×2 → `Test Files 21 passed (21)` · `Tests 306 passed (306)`, rc 0 ×2. The attribution of every RED (13/13 VALUE-SIDE, O-117) stands in `REPIN-ATTRIBUTION.md`. The worktree diff over `test src` is empty |
| G-KF3-4 | RED | **RED** | ⟨`git grep -n serializeCssValue HEAD -- …/css-text.ts`⟩ → the fork still stands at `:59` with its recursive self-calls `:61 :66`. The throw survives at `:72` (`throw new TypeError("Value returned an unserializable CSS color.")`), and its demo twin at `helpers.ts:93`. Consumers importing it from `@mkbabb/value.js/css` → **0**. INBOX rows reading O-11 §B retired → **0**. Cause: `.c2` ESCALATED (Triumvirate) |
| G-KF3-5 | RED | **GREEN** | at `HEAD`: implementations (`export const reverseAnimationShorthand`) → **1** · sentences attributing it to value.js or to a published inverse → **0** · total symbol lines → 10 (= `.c3`'s partition re-read). Discharge (b) UNIFY-BY-TRUTH |
| G-KF3-6 | RED | **GREEN** | ⟨`grep -c '^\| I-77 .*O-11 §D2.*1.923e-1.*DECLINED' INBOX.md`⟩ → 1 |
| G-KF3-7 | RED | **GREEN** | `CALL-MAP.md` exists (28061 B, line 1 SERVED MODEL). It covers both organs (channel (i) and channel (ii) rows), §3 lists the 27-id denominator (E-15's 26 + `KF-HA-19`), and the C-4/C-5 pair is stated (row 1b, the `!ok` arm, REACHABLE) |
| G-KF3-8 (floor) | GREEN before cure | **holds** | ⟨`git grep -nE 'cssTwinFor\("(easeOutCubic\|bounceInEase)"\)' HEAD -- test \| wc -l`⟩ → 0. The `/#/easing` and `/#/spring` pageerror probe needs a deploy, so it is owed with `.d` |
| G-KF3-9 (floor) | inherited, chassis present | **holds** | ⟨`guarded --light -- npm run check`⟩ at `d4148cdc` → rc 0, `proof:structure — PASS … 0 violations across R1–R6` (vue-tsc typechecks the demo) |
| G9 (X-W11) | RED (4.0.0) | **GREEN** | ⟨`npm ls --prefix ../keyframes.js @mkbabb/value.js`⟩ → `@mkbabb/value.js@4.1.0` (deduped under glass 10.1.3) |
| kf CI | RED (R-1 + R-2) | **RED** (R-2 only) | ⟨`gh run list -R mkbabb/keyframes.js --workflow ci.yml -L 3`⟩ → `41450770277` push `d4148cdc` **failure** (= `.d`'s reading). `deploy-pages` was skipped, so §6 and the post-deploy probe ×2 are owed |

**§Verification Artefacts**: the spec has no section by that name (⟨`grep -n 'Verification Artefact' KF-W3.md`⟩ → 0). Its artefacts are the §B.2 `evidence/W3/**` files, and all seven are present (`CALL-MAP` · `CLOSE-RECEIPTS` · `DUAL-1-DESIGN` · `EIGHT-CURVE-DELTA` · `REPIN-ATTRIBUTION` · `attribution-harness.mjs` · `rc-p-4.1.0`).

### Act 4 — E13

I re-swept the four paths: value `V/` + `V/coordination` · glass `BL` (newest; `ls -dt` → `BL BK`) + `BL/audit` + `BK/coordination` · keyframes.js `V/coordination` · atlas (`sci-report/atlas/docs/tranches/`, newest `U`) `U` + `U/coordination` + `P/coordination`. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-11-02 07:36) → **0 files**. ⟨`git -C glass-ui log --since='2026-11-02 07:36' -- docs/tranches/BL docs/tranches/BK/coordination`⟩ → 0. UNREAD `I-n` rows → **0**. **No UNREAD mail in scope.**

### Residuals (named owners)

1. **G-KF3-4 RED** — `.c2` ESC (Triumvirate trigger). Retiring the fork onto 4.1.0's `Result`-returning `serializeCssValue` without a throw, wrapper, fallback or try/catch would widen public kf signatures (`CSSKeyframesToString(s)`, `CompileRefusalReason`, `EntryRefusal`, the sink path). **Owner/arbiter** must rule (A) widen, (B) totality at ingest, or (C) a ruled boundary throw. After the ruling, a KF.W3 repair seat lands the retirement, the dated manifest divergence row and the INBOX O-11 §B row as **one** act (L-7), and deletes the demo twin `demo/utils/helpers.ts:75-96` with it.
2. **ESC-KFW3-d-1** (kf CI R-2, `proof:published-surface`): five KF.W5 HEAVY exports are unmanifested. The fix needs a **publication-doc ruling (owner)**: five `docs/published-surface.md` rows plus the stale `4.0.0` pin prose at `:17`. After that, a KF.W3 `.d` repair seat lands it, pushes, confirms CI GREEN, runs `deploy-pages` + §6, and runs the post-deploy probe ×2 (this also discharges G-KF3-8's pageerror arm).
3. **ESC-KFW3-d-2 / UIA-KF-321**: the `r4dock-share-fallback` selection race in `demo/app/dock/menu/SharePopover.vue`. The cure is the root focus-then-`select()` ordering, owned by a **demo seat** (KF demo wave). It is intermittent and makes vitest ×2 flaky.
4. `registry.ts:33-53` still describes the 4.0.0 un-memoised `easing()` and schedules the memo for deletion "in KF.W3's repin commit". **Owner: the KF easing-hygiene seat** (`.c1`/`.c3` residual). Not forced by the delta.
5. `.c4` residuals: the demo `useKeyframeOps.ts:45-46` unit pass-through (**demo seat**), and the stated ctor-merge unit ride (`engine/css/animation.ts:207`).
6. `compile/value/compile.ts:259-268` is a third list serializer that the G-KF3-4 ruling's census should name (`.c2`).

### Escalations

`.c2` Triumvirate (G-KF3-4) · ESC-KFW3-d-1 · ESC-KFW3-d-2, each carried as filed by its unit. This seat adds none.

### Four-verb line

Unmoved. The spec's IMPLEMENTED row requires *"gates green + bytes landed"*. G-KF3-4 is RED, so the wave is **not IMPLEMENTED**, and VERIFIED is not this wave's seat to stamp (R-A). The LEDGER row reads **PARTIAL**.

### Act 7 — push

kf was already at `origin/master` `d4148cdc` (`.d` pushed it). vjs `tranche-u` is pushed after this close commit (ordinary push).

## Check 1

**Seat**: CHECK 1 (fresh adversarial L-20 pass 1, VERIFY-ONLY, `claude-opus-5-5`), 2026-11-02. Authored no byte of the wave, its units or its Close. **Crash-recovery**: ⟨`git status --porcelain` over this record + LEDGER⟩ → clean; kf ⟨`git status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling; untouched) ⇒ 0 inherited paths. kf `HEAD` = `origin/master` = `d4148cdc`.

**Verdict: NOT-CONFORMANT.** Every GREEN the Close claims reproduces at this seat (9 of 9 readings). The verdict turns on one gate: **G-KF3-4 is a RED close gate with no relief in the spec** (axis 10).

### Axis 1 / 9 — the claimed GREENs, re-run by this seat

| gate | this seat's command | reading | reproduces? |
| --- | --- | --- | --- |
| G-KF3-1 | ⟨`grep -c 'evaluates TRUE per …RELEASE-CONDITION.md` §6a' KF-W3.md`⟩ · ⟨`grep -rn RC-P docs/tranches/X/fourier/ \| wc -l`⟩ · ⟨`grep -c 'GREEN — every public parser is total' evidence/W3/rc-p-4.1.0.md`⟩ | 1 · 1 · 1 | yes |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ → sha1 `d488535c…b3d6` = ⟨`npm view … dist.shasum`⟩; untarred into a scratch mirror, the unmodified probe (sha256 `77678a57…`) symlinked in; ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 | rc 0 ×2 · `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `cmp` identical | yes |
| G-KF3-3 | roster re-derived with the spec's `git grep -l -E …` at kf `HEAD` → **18** paths; ∪ the 3 O-117 files outside it (`timeline-hover-preview`, `easing-identity`, `grammar-fuzz`); ⟨`guarded --timeout 10 -- npx vitest run <21> --maxWorkers=2`⟩ ×2 | rc 0 ×2 · `Test Files 21 passed (21)` · `Tests 306 passed (306)` ×2; ⟨`git diff --stat 5c48e3da..HEAD -- test/fixtures`⟩ → empty (no silent re-baseline, epsilon untouched) | yes |
| G-KF3-5 | ⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src test`⟩ | 10 lines; one implementation (`css-text.ts:35`); every attributing sentence names kf (`backward.ts:20`, `options.ts:10/:82`, `index.ts:233`); 0 name value.js. Discharge (b) | yes |
| G-KF3-6 | ⟨`grep -c '^\| I-77 .*O-11 §D2.*1.923e-1.*DECLINED' INBOX.md`⟩ | 1 | yes |
| G-KF3-7 | ⟨`head -1 CALL-MAP.md`⟩ · ⟨`grep -cE 'REACHABLE\|UNREACHABLE'`⟩ · ⟨`grep -c KF-HA-19`⟩ | `SERVED MODEL: claude-opus-5-5` · 48 · 2 | yes |
| G-KF3-8 (floor) | ⟨`git grep -nE 'cssTwinFor\("(easeOutCubic\|bounceInEase)"\)' HEAD -- test \| wc -l`⟩ | 0 (pageerror arm owed with deploy) | yes |
| G-KF3-9 (floor) | ⟨`guarded --light -- npm run check`⟩ | rc 0 (vue-tsc ×2 projects + proof:structure) | yes |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ in kf | `@mkbabb/value.js@4.1.0` (+ deduped under glass 10.1.3) | yes |

Readings the Close left RED, also reproduced: G-KF3-4 RED (⟨`git grep -n serializeCssValue HEAD -- …/css-text.ts`⟩ → fork `:59`, self-calls `:61 :66`; consumers on `value.js/css` → 0). kf CI RED (⟨`gh run list -R mkbabb/keyframes.js --workflow ci.yml -L 2`⟩ → `41450770277` push `d4148cdc` **failure**).

### Axes 2–7

- **(2) Bounds.** ⟨`git show --stat`⟩ on all 5 kf commits (`c18a9bd9 bc37f98f 4ed542d5 17a5c34d d4148cdc`) and all 13 vjs commits (`3e89df9f3` … `7fe705060`): every path is in its unit's writable set or is a declared §0bt adjacent edit (`.c4`: `constants/types.ts`, `engine/css/metadata.ts`, `engine/option-setters.ts`; `.c5`: `scene-skeleton-shimmer.test.ts`). `scripts/dev/dev.sh`, glass-ui and sibling trees untouched. **Landed-wrong 0.**
- **(3) Masking.** ⟨`git show <5 kf commits> | grep -E '^\+' | grep -E 'test\.skip|it\.skip|\.todo|catch *\(|try *\{|allowlist'`⟩ → 0. The re-aimed `.c1` tests assert 4.1.0's behaviour with positive subjects (`toThrow` → a named refusal plus `parseStylesheet(css).ok === false`; `unstable.length` 21 → 0 with a per-name identity clause). `.d`'s `entry-roundtrip` change follows the ruled UIA-KF-177 spelling (`0.35s`); its strip regex widens to `\d*\.?\d+m?s`. That widening matches the ruled spelling and silences no assertion (INFO). No patched node_modules. No copied producer selector.
- **(4) Commit families.** The repin (`c18a9bd9`) and the glass bump (`17a5c34d`) are separate commits, as §0hb.2 requires. L-7's retirement family was never split, because it never landed.
- **(5) E-3.** ⟨`git diff --stat 3e89df9f3^..HEAD -- docs/tranches/X/keyframes/waves docs/tranches/V/megatranche/registry/adjudicated scripts/dev/dev.sh`⟩ → empty.
- **(6) Mail.** ⟨`find <the 4-path sweep> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0. No `I-n` row has an UNREAD status: the three status cells that mention UNREAD read `was UNREAD` or `READ → FOLDED`. **Clean.**
- **(7) Four-verb line.** Unmoved, which is lawful: the spec's IMPLEMENTED row requires *"gates green + bytes landed"*, and one close gate is RED.
- **(8) Goal criterion.** **NOT MET at the bytes.** The wave's title acts are *"the repin, the `serializeCssValue` fork retirement, the DUAL-1 unification, the 8-curve ack, the R1 call-map"*. The fork retirement has not happened: `css-text.ts:59` and its throw at `:72` stand, the demo twin `helpers.ts:75-96` stands, and no O-11 §B row exists.

### Axis 10 — honest-RED adjudication

**G-KF3-4 has no relief.** The spec gives this gate no producer-gated relief: its one producer conjunct, *"`serializeCssValue` enumerable on `V`'s packed `./css` surface"*, is **MET** (4.1.0 `dist/subpaths/css.d.ts`: `serializeCssValue(value: CssValue): Result<string, ColorIssue>`, re-read by this seat). The spec does not route the retirement to a later wave: §Excluded/E-rows and §Sequencing assign it to no successor, and L-5 sends only *posture* elsewhere, while this gate's own falsifier keeps the `:54` throw's death inside G-KF3-4. The spec also names no honest-RED id for it. The blocker is a kf public-surface design decision (`.c2`: (A) widen · (B) ingest totality · (C) ruled boundary throw). The escalation itself is honest and well measured, and the residual register names an owner (owner/arbiter, then a KF.W3 repair seat). But an owner-pending ruling is a reason to escalate, not spec relief, so the gate is an **unrelieved RED close gate**.

**Honest-RED set: none** that meets axis 10's bar. The non-gate items are kf CI R-2 (ESC-KFW3-d-1, `proof:published-surface`; red on master since 2026-10-21, before this wave), the deploy, §6 and the G-KF3-8 pageerror arm. None of them is one of the seven close gates, and each has a named owner in the residual register.

**Successors.** No LEDGER row and no X·KF spec names KF.W3 as an *Opens after* conjunct. ⟨`awk` over LEDGER col 2⟩ → no row keyed on KF.W3; KF.W3 is GATE-KEYED, a leaf. **No successor is blocked** by this verdict.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| **HIGH** | G-KF3-4 (close gate) is RED with no spec relief; the fork retirement (a title act of the wave) has not landed | `css-text.ts:59` fork + `:72` throw at kf `d4148cdc`; 0 `value.js/css` consumers; 0 O-11 §B rows; 4.1.0 publishes the target | owner/arbiter rules `.c2`'s (A)/(B)/(C); a KF.W3 repair seat lands retirement + every census-1 consumer + `helpers.ts` twin delete + dated manifest row + INBOX O-11 §B as ONE L-7 act; G-KF3-3 re-run ×2 |
| MINOR | kf CI RED (R-2, `proof:published-surface`), so the deploy, §6 and the G-KF3-8 pageerror arm are owed | run `41450770277` failure | ESC-KFW3-d-1 publication-doc ruling (owner), then a `.d` repair; not a close gate |
| MINOR | vitest ×2 intermittency from UIA-KF-321 (`SharePopover.vue` select race) | `.c5`/`.d` receipts; not reproduced here (the roster excludes it) | demo seat (ESC-KFW3-d-2) |
| INFO | `entry-roundtrip` strip regex widened to `\d*\.?\d+m?s` | `d4148cdc` diff | follows the UIA-KF-177 ruled spelling; none |

**LEDGER**: not promoted. The row stays **PARTIAL**, and one event line is appended.

## Repair 1

**Seat**: REPAIR 1 (`claude-opus-5-5`), 2026-11-02. Read: the spec whole; this record's header through the Unit plan, `.c2`'s receipt, and §Check 1. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; untouched) ⇒ **0 inherited paths**. kf `HEAD` = `origin/master` = `d4148cdc`.

**Ruling search (the HIGH's cure precondition)**: ⟨`awk 'NR>4988 && /serializeCssValue|\(A\) widen|boundary throw|ESC-KFW3/' COHESION.md`⟩ → **no output**. The newest sections are §0hb (KF.W3 opens) and §0hc (fourier). No owner/arbiter ruling on `.c2`'s (A)/(B)/(C) exists. The Check 1 cure is conditional on that ruling, and the spec forbids every unruled substitute: G-KF3-4's falsifier rejects a re-implementation under another name, and `.b` §4(iii) bars a new throw, wrapper, fallback or try/catch.

### Defect → disposition

| # | severity | defect | disposition | commit |
| --- | --- | --- | --- | --- |
| 1 | HIGH | G-KF3-4 RED with no relief; the fork retirement has not landed | **ESCALATED, not cured.** The only conforming cure (the ONE L-7 act) needs the owner/arbiter's pick of `.c2` (A) widen kf's public signatures, semver-major · (B) totality at ingest · (C) a ruled typed boundary throw. All three are kf public-surface decisions outside a repair seat's hand. Landing the channel-bearing half alone would be a line-count discharge (LAW A) and would split L-7's family | none (product) |
| 2 | MINOR | kf CI RED on R-2 (`proof:published-surface`), so deploy, §6 and the G-KF3-8 pageerror arm are owed | **ESCALATED.** The cure is ESC-KFW3-d-1's owner publication-doc ruling, which no single command supplies. It is not a close gate | none |
| 3 | MINOR | vitest ×2 intermittent on UIA-KF-321 (`SharePopover.vue` select race) | **ESCALATED (out of bounds).** `demo/app/dock/menu/SharePopover.vue` is in no KF.W3 §B.2 row and no unit writable set, and the item is a different concern (demo focus ordering vs parser consumption), so the §0bt adjacent-line rule does not reach it. Owner: the KF demo seat (ESC-KFW3-d-2). The cure is a root focus-then-select ordering fix, more than one command | none |
| 4 | INFO | `entry-roundtrip` strip regex widened | no cure owed | — |

**Cured: 0.** No kf product byte written, and no INBOX row (L-7: the O-11 §B row rides only with the retirement).

### Gate re-reading (no cure landed, so no gate could move; G-KF3-4 re-read ×2 at kf `d4148cdc`)

- ⟨`git grep -c '\bserializeCssValue\b' HEAD -- src/animation/compile/emit/css-text.ts`⟩ → `6` ×2 (fork `:59`, self-calls `:61 :66`, callers `:104 :121 :127`)
- ⟨`git grep -n unserializable HEAD -- src/animation/compile/emit/css-text.ts demo/utils/helpers.ts`⟩ → `css-text.ts:72` + `helpers.ts:93`, ×2 (both throws stand)
- consumers importing `serializeCssValue` from `@mkbabb/value.js/css` → `0` ×2
- ⟨`grep -c 'O-11 §B' docs/tranches/V/coordination/INBOX.md`⟩ → `0`
- ⟨`gh run list -R mkbabb/keyframes.js --workflow ci.yml -L 1`⟩ → `41450770277` push `master` **failure** (unchanged)

**G-KF3-4 RED → RED.** G-KF3-3 was not re-run: no byte changed, and Check 1's `21 files / 306 tests` ×2 at `d4148cdc` stands. Every other gate keeps Check 1's reading.

**Escalations (to owner/arbiter)**: (E-R1-1) rule `.c2` (A)/(B)/(C); after that ruling a KF.W3 repair seat lands the L-7 act and re-runs G-KF3-3 ×2. (E-R1-2) the ESC-KFW3-d-1 publication-doc ruling, then a `.d` repair. (E-R1-3) UIA-KF-321 goes to the KF demo seat (ESC-KFW3-d-2).

**Adjacent edits**: none. **LEDGER**: the row stays **PARTIAL**, and one event line is appended.

## Check 2

**Seat**: CHECK 2 (fresh adversarial L-20 pass 2, VERIFY-ONLY, `claude-opus-5-5`), 2026-11-02. Authored no byte of the wave, its units, its Close, Check 1 or Repair 1. **Crash-recovery**: ⟨`git status --porcelain` over this record + LEDGER⟩ → clean; kf ⟨`git status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; untouched) ⇒ 0 inherited paths. kf `HEAD` = `origin/master` = `d4148cdc` (unmoved since Repair 1).

**Verdict: NOT-CONFORMANT.** All 9 claimed GREEN readings reproduce at this seat. **G-KF3-4 is still a RED close gate with no spec relief.** No owner/arbiter ruling on `.c2`'s (A)/(B)/(C) has landed: ⟨`git log -3 -- COHESION.md`⟩ → newest `4d05351c1` §0hc (fourier), and §0hb is silent on the fork.

### Axes 1 / 9 — reproduction (this seat's own runs)

| gate | command | reading | reproduces? |
| --- | --- | --- | --- |
| G-KF3-1 | ⟨`grep -c` opening sentence KF-W3.md⟩ · ⟨`grep -rn RC-P docs/tranches/X/fourier/ \| wc -l`⟩ · ⟨`grep -c 'GREEN — every public parser is total' evidence/W3/rc-p-4.1.0.md`⟩ | 1 · 1 · 1 | yes |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c…b3d6` = ⟨`npm view … dist.shasum`⟩; untarred into a scratch mirror; unmodified probe (sha256 `77678a574d7c6b11…`) symlinked at its path; ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 | rc 0 ×2 · `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `cmp` identical | yes |
| G-KF3-3 | roster re-derived by the spec's `git grep -l -E …` at kf `HEAD` → **18**; ∪ the 3 O-117 files outside it → 21; ⟨`guarded --timeout 10 -- npx vitest run <21> --maxWorkers=2`⟩ ×2 | rc 0 ×2 · `Test Files 21 passed (21)` · `Tests 306 passed (306)` ×2 | yes |
| G-KF3-5 | ⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src test`⟩ | 10 lines; one implementation `css-text.ts:35`; attributing sentences name kf (`backward.ts:20`, `options.ts:10/:82`, `index.ts:233`); 0 name value.js | yes |
| G-KF3-6 | ⟨`grep -c '^\| I-77 .*O-11 §D2.*1.923e-1.*DECLINED' INBOX.md`⟩ | 1 | yes |
| G-KF3-7 | ⟨`head -1`⟩ · ⟨`grep -cE 'REACHABLE\|UNREACHABLE'`⟩ · ⟨`grep -c KF-HA-19`⟩ on CALL-MAP.md | `SERVED MODEL: claude-opus-5-5` · 48 · 2 | yes |
| G-KF3-8 (floor) | ⟨`git grep -nE 'cssTwinFor\("(easeOutCubic\|bounceInEase)"\)' HEAD -- test \| wc -l`⟩ | 0 (pageerror arm owed with deploy) | yes |
| G-KF3-9 (floor) | ⟨`guarded --light -- npm run check`⟩ | rc 0 (vue-tsc + proof:structure) | yes |
| G9 | ⟨`guarded --light -- npm ls @mkbabb/value.js`⟩ in kf | `@mkbabb/value.js@4.1.0` (+ deduped under glass 10.1.3) | yes |

RED, reproduced: **G-KF3-4**. ⟨`git grep -n unserializable HEAD -- src demo`⟩ → `css-text.ts:72` + `demo/utils/helpers.ts:93` (both throws stand). `serializeCssValue` importers from `@mkbabb/value.js/css` → 0. ⟨`grep -c 'O-11 §B' INBOX.md`⟩ → 0. **kf CI** ⟨`gh run list -L 2`⟩ → `41450770277` push `d4148cdc` failure and `41433228470` schedule failure.

### Axes 2–8

- **(2) Bounds.** ⟨`git show --stat`⟩ over all 5 kf commits `5c48e3da..d4148cdc`: every path is in its unit's set or is a declared §0bt adjacent edit, the same as Check 1. vjs commits since Check 1 (`6e841b7d6`, `3b1794e80`) touch only this record + LEDGER. `scripts/dev/dev.sh`, glass-ui and sibling trees untouched. **Landed-wrong 0.**
- **(3) Masking.** ⟨`git show 5c48e3da..HEAD \| grep '^+' \| grep -cE 'test\.skip|it\.skip|\.todo\(|catch *\(|try *\{|allowlist'`⟩ → **0**. No patched node_modules. No copied producer selector.
- **(4) Commit families.** The repin `c18a9bd9` and the glass bump `17a5c34d` are separate. The L-7 retirement family is unsplit because it never landed.
- **(5) E-3.** ⟨`git diff --stat 3e89df9f3^..HEAD -- docs/tranches/X/keyframes/waves docs/tranches/V/megatranche/registry/adjudicated scripts/dev/dev.sh`⟩ → empty.
- **(6) Mail.** No `I-n` row is UNREAD. Since Check 1, no mail file has been added in the sweep paths. **Clean.**
- **(7) Four-verb.** Unmoved, which is lawful: IMPLEMENTED needs *"gates green + bytes landed"*.
- **(8) Goal.** **NOT MET.** The title act *"the `serializeCssValue` fork retirement"* has not happened (`css-text.ts` fork + `:72` throw; demo twin `helpers.ts:75-96`).

### Axis 10 — honest-RED adjudication

**G-KF3-4: unrelieved.** Check 1's reading stands at the spec bytes. The gate's only producer conjunct (`serializeCssValue` on `V`'s packed `./css`) is **MET** at 4.1.0, so this is not a producer-owned RED. No §Excluded / §Sequencing row routes the retirement to a successor. L-5 sends only *posture* elsewhere, and the gate's own falsifier keeps the throw's death inside G-KF3-4. No honest-RED id names it. An owner-pending public-surface ruling is a lawful **escalation**, and the residual register names its owner (owner/arbiter, then a KF.W3 repair seat). It is not **spec relief**.

**Honest-RED set: none.** The non-gate items each have a named owner: kf CI R-2 (ESC-KFW3-d-1), deploy + §6 + the G-KF3-8 pageerror arm, and UIA-KF-321 (demo seat). §0hb.2 also rules *"its own CI must be GREEN ×2"*, and that stays owed with ESC-KFW3-d-1.

**Successors.** ⟨`grep -rln 'Opens after.*KF\.W3' keyframes/waves/`⟩ → only `KF-W10.md`, and its `Opens after` (line 22) reads W0·W1·W9 + W2·W4–W9, **not** KF.W3. KF.W10 is CLOSED anyway. No LEDGER row is keyed on KF.W3, so **no successor is blocked**. Downstream of §0hb.3: X-W11's G9 is GREEN (4.1.0), but the step *"keyframes ships through its own deploy path"* waits on ESC-KFW3-d-1.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| **HIGH** | G-KF3-4 (close gate) RED with no spec relief; the fork retirement has not landed | `css-text.ts:72` + `helpers.ts:93` throws at kf `d4148cdc`; 0 `value.js/css` importers; 0 `O-11 §B` rows; no ruling in COHESION after §0hc | owner/arbiter rules `.c2` (A)/(B)/(C); then a KF.W3 repair seat lands it as ONE L-7 act: retirement, every census-1 consumer, the `helpers.ts` twin, the dated manifest row and the INBOX O-11 §B row; G-KF3-3 re-run ×2 |
| MINOR | kf CI RED (R-2 `proof:published-surface`), so §0hb.2's CI ×2, the deploy, §6 and the G-KF3-8 pageerror arm are owed | runs `41450770277`, `41433228470` failure | ESC-KFW3-d-1 owner publication-doc ruling, then a `.d` repair |
| MINOR | vitest intermittency UIA-KF-321 (`SharePopover.vue`) | `.c5`/`.d` receipts; outside the G-KF3-3 roster | KF demo seat (ESC-KFW3-d-2) |
| INFO | `entry-roundtrip` strip regex widened to the ruled UIA-KF-177 spelling | `d4148cdc` | none |

**LEDGER**: not promoted. The row stays **PARTIAL**, and one event line is appended.

## Repair 2

**Seat**: REPAIR 2 (`claude-opus-5-5`), 2026-11-02. Read: the spec's G-KF3-4/-5 cells and §Sequencing L-7; this record's §Repair 1 and §Check 2. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; untouched) ⇒ **0 inherited paths**. kf `HEAD` = `origin/master` = `d4148cdc` (unmoved).

**Ruling search**: ⟨`git log -1 --format=%h -- COHESION.md`⟩ → `4d05351c1` (§0hc, unchanged since Check 2). ⟨`awk 'NR>4988 && /serializeCssValue|\(A\) widen|boundary throw|ESC-KFW3/' COHESION.md | wc -l`⟩ → `0`. There is still no owner/arbiter ruling on `.c2` (A)/(B)/(C), and no ESC-KFW3-d-1 ruling either.

### Defect → disposition

| # | severity | defect | disposition | commit |
| --- | --- | --- | --- | --- |
| 1 | HIGH | G-KF3-4 RED, fork retirement unlanded | **ESCALATED (unchanged from E-R1-1).** The one L-7 act needs the `.c2` public-surface pick first. Any unruled substitute is barred by G-KF3-4's falsifier (a re-implementation under another name) and by `.b` §4(iii) (a new throw, wrapper, fallback or try/catch) | none |
| 2 | MINOR | kf CI RED R-2; deploy/§6/G-KF3-8 pageerror arm owed | **ESCALATED (E-R1-2).** It needs the ESC-KFW3-d-1 publication-doc ruling, and no single command cures it | none |
| 3 | MINOR | UIA-KF-321 vitest intermittency | **ESCALATED (E-R1-3), out of bounds.** `SharePopover.vue` is in no KF.W3 writable set, so it goes to the KF demo seat | none |
| 4 | INFO | strip regex widened | no cure owed | — |

**Cured: 0.** No kf byte written. No INBOX row (L-7: the O-11 §B row rides only with the retirement).

### Gate re-reading (×2 at kf `d4148cdc`)

- ⟨`git grep -c '\bserializeCssValue\b' HEAD -- src/animation/compile/emit/css-text.ts`⟩ → `6` ×2
- ⟨`git grep -n unserializable HEAD -- css-text.ts demo/utils/helpers.ts`⟩ → `css-text.ts:72` + `helpers.ts:93` ×2
- ⟨`git grep -nE "import.*serializeCssValue.*from '@mkbabb/value.js/css'" HEAD | wc -l`⟩ → `0` ×2
- ⟨`grep -c 'O-11 §B' docs/tranches/V/coordination/INBOX.md`⟩ → `0`
- ⟨`gh run list -R mkbabb/keyframes.js --workflow ci.yml -L 2`⟩ → `41450770277` push failure · `41433228470` schedule failure

**G-KF3-4 RED → RED.** No byte moved, so G-KF3-3 was not re-run; Check 2's `21 files / 306 tests` ×2 stands. **Adjacent edits**: none. **LEDGER**: the row stays **PARTIAL**, and one event line is appended.

## Check 3

**Seat**: CHECK 3 (fresh adversarial L-20 pass 3, VERIFY-ONLY, `claude-opus-5-5`), 2026-11-02. Authored no byte of the wave, its units, its Close, or any prior Check or Repair. **Crash-recovery**: ⟨`git status --porcelain` over this record + LEDGER⟩ → clean. kf ⟨`git status -sb`⟩ → `## master...origin/master` + `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; untouched) ⇒ **0 inherited paths**. kf `HEAD` = `origin/master` = `d4148cdc` (unmoved since Repair 2).

**Verdict: NOT-CONFORMANT.** All 9 claimed GREENs reproduce at this seat. G-KF3-4 is still RED with no spec relief. ⟨`git log -1 -- COHESION.md`⟩ → `4d05351c1` §0hc (unchanged), and ⟨`awk 'NR>4988 && /serializeCssValue|\(A\) widen|boundary throw|ESC-KFW3/' COHESION.md`⟩ → 0 lines. No owner/arbiter `.c2` ruling exists, and no ESC-KFW3-d-1 ruling either.

### Axes 1 / 9 — reproduction (this seat's own runs, ×2 where a run is involved)

| gate | command | reading | reproduces? |
| --- | --- | --- | --- |
| G-KF3-1 | ⟨`grep -c` opening sentence in KF-W3.md⟩ · ⟨`grep -rn RC-P docs/tranches/X/fourier/ \| wc -l`⟩ · ⟨`grep -c 'GREEN — every public parser is total' rc-p-4.1.0.md`⟩ | 1 · 1 · 1 | yes |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc747e318895417c28a753a3b7b3d6` = ⟨`npm view … dist.shasum`⟩. Untarred into a fresh scratch mirror, with the unmodified probe (sha256 `77678a574d7c6b11…d4ec`) symlinked in. ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 | rc 0 ×2 · `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `cmp` identical | yes |
| G-KF3-3 | Roster re-derived with the spec's `git grep -l -E '@mkbabb/value\.js/css\|parseCss(Color\|Scalar\|Values)\|…\|cssIdent' HEAD -- test/` → **18**, ∪ the 3 O-117 files → 21 (includes `roundtrip-fidelity` + `compile-roundtrip`). ⟨`guarded --timeout 10 -- npx vitest run <21> --maxWorkers=2`⟩ ×2 | rc 0 ×2 · `Test Files 21 passed (21)` · `Tests 306 passed (306)` ×2 | yes |
| G-KF3-5 | ⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src test \| wc -l`⟩ · ⟨`git grep -n 'export const reverseAnimationShorthand' HEAD \| wc -l`⟩ · value.js-/published-attribution grep | 10 · 1 · 0 | yes |
| G-KF3-6 | ⟨`grep -c '^\| I-77 .*O-11 §D2.*1.923e-1.*DECLINED' INBOX.md`⟩ | 1 | yes |
| G-KF3-7 | ⟨`head -1`⟩ · ⟨`grep -cE 'REACHABLE\|UNREACHABLE'`⟩ · ⟨`grep -c KF-HA-19`⟩ on CALL-MAP.md | `SERVED MODEL: claude-opus-5-5` · 48 · 2 | yes |
| G-KF3-8 (floor) | ⟨`git grep -nE 'cssTwinFor\("(easeOutCubic\|bounceInEase)"\)' HEAD -- test \| wc -l`⟩ | 0 (the pageerror arm is owed with the deploy) | yes |
| G-KF3-9 (floor) | ⟨`guarded --light -- npm run check`⟩ | rc 0 · `proof:structure — PASS … 0 violations across R1–R6` | yes |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ in kf | `@mkbabb/value.js@4.1.0` (+ deduped under glass 10.1.3) | yes |

**RED, reproduced: G-KF3-4.** ⟨`git grep -n unserializable HEAD -- src demo`⟩ → `css-text.ts:72` + `demo/utils/helpers.ts:93` (both throws stand). ⟨`git grep -nE "serializeCssValue.*from ['\"]@mkbabb/value.js/css" HEAD \| wc -l`⟩ → 0. ⟨`grep -c 'O-11 §B' INBOX.md`⟩ → 0. **kf CI** ⟨`gh run list -L 2`⟩ → `41450770277` push `d4148cdc` failure, `41433228470` schedule failure.

### Axes 2–8

- **(2) Bounds.** ⟨`git show --stat`⟩ on `c18a9bd9 bc37f98f 4ed542d5 17a5c34d d4148cdc`: every path is in its unit's set or is a §0bt adjacent edit its receipt declares. The vjs commits since Repair 2 touch nothing in this wave. `scripts/dev/dev.sh`, glass-ui and sibling trees are untouched. **Landed-wrong 0.**
- **(3) Masking.** ⟨`git show 5c48e3da..HEAD \| grep '^+' \| grep -cE 'test\.skip|it\.skip|\.todo\(|catch *\(|try *\{|allowlist'`⟩ → **0**. No node_modules patch and no copied producer selector.
- **(4) Commit families.** The repin `c18a9bd9` and the glass bump `17a5c34d` are separate. The L-7 retirement family never landed, so it cannot be split.
- **(5) E-3.** ⟨`git diff --stat 3e89df9f3^..HEAD -- docs/tranches/X/keyframes/waves docs/tranches/V/megatranche/registry/adjudicated scripts/dev/dev.sh`⟩ → empty.
- **(6) Mail.** ⟨awk over INBOX's Status column (col 5) for a leading `UNREAD`⟩ → 0 rows. A plain `grep UNREAD` hits 6 rows, but each is prose: "was UNREAD" or the routing text. ⟨`find <the 9 E13 sweep dirs> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 (glass newest `BL`). **Clean.**
- **(7) Four-verb.** Unmoved, which is lawful. IMPLEMENTED needs *"gates green + bytes landed"* (spec :26).
- **(8) Goal.** **NOT MET.** The title act *"the `serializeCssValue` fork retirement"* has not happened: the fork + `:72` throw remain in `css-text.ts`, and so does the demo twin `helpers.ts:93`.

### Axis 10 — honest-RED adjudication

**G-KF3-4: unrelieved.** I re-read the spec bytes: the G-KF3-4 cell (:235-243), §Sequencing L-7 (:285), and a grep of §Excluded (:315-418) for `serializeCssValue|css-text|G-KF3-4|throw`. That grep returns only the R1 parser-class rows, none of them the fork. The gate's single producer conjunct (`serializeCssValue` on `V`'s packed `./css`) is MET at 4.1.0, so the RED is not producer-owned. No successor-routing row takes the retirement. The falsifier keeps the throw's death inside this gate. No honest-RED id names it. The owner-pending `.c2` (A)/(B)/(C) ruling is a lawful escalation with a named owner (owner/arbiter, then a KF.W3 repair seat). It is **not spec relief**.

**Honest-RED set: none.** The non-gate items each have a named owner: kf CI R-2 (ESC-KFW3-d-1, publication-doc ruling, then a `.d` repair), deploy + §6 + the G-KF3-8 pageerror arm (rides with it), and UIA-KF-321 (KF demo seat).

**Successors.** ⟨`grep -rln 'Opens after.*KF\.W3' docs/tranches/X/keyframes/waves/`⟩ → `KF-W10.md` only, and its `Opens after` does not name KF.W3 (KF.W10 is CLOSED). **No successor is blocked.** X-W11's G9 conjunct is GREEN (4.1.0). §0hb.3's *"keyframes ships through its own deploy path"* still waits on ESC-KFW3-d-1.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| **HIGH** | G-KF3-4 (close gate) is RED with no spec relief; the fork retirement has not landed | `css-text.ts:72` + `helpers.ts:93` throws at kf `d4148cdc`; 0 `value.js/css` importers; 0 `O-11 §B` rows; COHESION newest is still `4d05351c1` with 0 ruling lines | owner/arbiter rules `.c2` (A)/(B)/(C); then a KF.W3 repair seat lands it as ONE L-7 act (the retirement, all 14 census-1 consumers, the `helpers.ts` twin, the dated manifest row, the INBOX O-11 §B row); G-KF3-3 re-run ×2 |
| MINOR | kf CI RED (R-2 `proof:published-surface`), so CI ×2, the deploy, §6 and the G-KF3-8 pageerror arm are owed | runs `41450770277`, `41433228470` failure | ESC-KFW3-d-1 owner ruling, then a `.d` repair |
| MINOR | vitest intermittency UIA-KF-321 (`SharePopover.vue`), outside the G-KF3-3 roster | `.c5`/`.d` receipts; this seat's roster runs ×2 are clean | KF demo seat (ESC-KFW3-d-2) |
| INFO | the `entry-roundtrip` strip regex is widened to the ruled UIA-KF-177 spelling | `d4148cdc` | none |

**LEDGER**: not promoted. The row stays **PARTIAL**, and one event line is appended.

## RESUME 2 — Open (2026-11-02, seat 0, `claude-opus-5-5`, on COHESION §0hd)

**Mode**: RESUME (second). Ledger row 66 status before: `PARTIAL — G-KF3-4 RED …` (not CLOSED) and this record exists ⇒ resume. Authority: COHESION §0hd (2026-11-02, `376bbecb7`, read whole: §0hd.1 G-KF3-4 arm **(B)** totality-at-ingest + one named invariant, A and C refused; §0hd.2 ESC-KFW3-d-1 published-surface rows; §0hd.3 ESC-KFW3-d-2 SharePopover grant; §0hd.4 registry memo deletion; §0hd.5 then CI → deploy → §6 → probe ×2 → close + fresh check) + §0hb.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; never staged) ⇒ **0 inherited paths** in any owed unit's set. vjs record/LEDGER/INBOX clean. kf `HEAD` = `origin/master` = `d4148cdc` (no commit since Check 3; ⟨`git log --oneline -3`⟩ → `d4148cdc 17a5c34d 4ed542d5`).

**Already done (commits exist, never re-dispatched)**: `.a` · `.b` (vjs evidence/W3) · `.c1` kf `c18a9bd9` · `.c3` `bc37f98f` · `.c4` `4ed542d5` · `.c5` `17a5c34d` (glass 10.1.3 pinned — §0hd.5's glass rider is discharged; ⟨`grep glass-ui package.json`⟩ → `10.1.3`) · `.d`'s entry-roundtrip oracle `d4148cdc`. The original `.c2` is **superseded** by `.c2b` (its ruling did not exist until §0hd); `.d` is superseded by `.d2`.

**Preconditions**: RC-P(4.1.0) TRUE banked at this record's Open and reproduced ×2 by Checks 1–3 (G-KF3-2 `TOTAL 0 throws / 1548 calls`); the owed acts' only new precondition is the §0hd ruling, which exists (`git log -1 -- COHESION.md` → `376bbecb7`). **MET.**

**E13 Step-0 sweep**: 9 paths (value V/ + V/coordination · glass BK/coordination + BL + BL/audit, ⟨`ls -dt`⟩ → `BL BK BJ` · kf V/coordination · atlas P/coordination + U + U/coordination, atlas newest `U`). ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-11-02 07:36) → **0 files**; ⟨`git log --since='2026-11-02 07:36' -- docs/tranches`⟩ in glass-ui · keyframes.js · sci-report → **0 commits**; INBOX Status-column UNREAD rows → **0**. **No unrowed mail; INBOX not touched.**

### RESUME 2 — Baseline (READ-ONLY, kf `d4148cdc`, value.js `376bbecb7`)

Only the owed units' gates are re-run; every other gate cites Check 3's ×2 readings (all 9 reproduced).

| gate | BEFORE | reading |
| --- | --- | --- |
| G-KF3-4 | **RED** | ⟨`git grep -n unserializable HEAD -- src demo`⟩ → `src/animation/compile/emit/css-text.ts:72` + `demo/utils/helpers.ts:93` (both fork throws stand); ⟨`git grep -nE "serializeCssValue.*from ['\"]@mkbabb/value.js/css" HEAD \| wc -l`⟩ → **0**; ⟨`grep -c 'O-11 §B' INBOX.md`⟩ → **0**. Symbol census ⟨`git grep -l '\bserializeCssValue\b' HEAD -- src demo test scripts`⟩ → **16 files** = the fork (`css-text.ts`) + the demo twin (`demo/utils/helpers.ts`) + the 14 census-1 consumers (8 src: `emit/densify.ts` `emit/entry.ts` `emit/format/format.ts` `frame/interp-slot.ts` `engine/css/metadata.ts` `resolve/{browser,conditional,function}.ts` · 1 demo: `timeline/utils/timelineEngine.ts` · 5 test: `compile/structural-emit` `resolve/emerging-css-resolve-{fn,now,p2}` `resolve/value4-immutable-resolve`). Third list serializer `src/animation/compile/value/compile.ts:259-268` `serializeCompiledValue` (own `separatorText`) stands; stale unit prose `css-text.ts:13-18` stands |
| G-KF3-3 (regression net for `.c2b`) | GREEN (Check 3 ×2: `21 passed (21)` · `306 passed (306)`) | cited, not re-run |
| G-KF3-6 boot fence (regression net for `.reg`) | GREEN | ⟨`guarded --timeout 10 -- npx vitest run test/_root/public-surface.test.ts test/compile/easing-identity.test.ts test/compile/timing-function-names.test.ts test/orchestration/orchestration-api.test.ts --maxWorkers=2`⟩ → `Test Files 4 passed (4)` · `Tests 110 passed (110)`. Memo stands at `src/animation/compile/easing/registry.ts:35-53` (its own `:51-52` schedule: *"deleted in KF.W3's repin commit"*); `useKeyframeOps.ts:45-46` `stored.duration/delay = reverseCSSTime(animation.options.duration/delay)` drop the authored unit (the `.c4` residual) |
| UIA-KF-321 (`.sp`) | **RED alone** | ⟨`guarded --timeout 10 -- npx vitest run test/demo/app/r4dock-share-fallback.test.ts --maxWorkers=2`⟩ → `× (2) the surface stays open with the link read-only, focused and selected; no address-bar fallback` · `Tests 1 failed (1)` — born-RED in isolation at this run (prior receipts: intermittent) |
| kf CI R-2 (`.ps`) | **RED** | ⟨`guarded --light -- node scripts/gates/surface/index.mjs`⟩ → `proof:published-surface — FAIL (1 finding(s))` · `(b) 5 public export(s) are NEITHER README-taught NOR manifested`: `cssIdent` `resolveTimingFunction` `reverseCSSTime` `serializeTimingFunction` `timingFunctionEntries` (all HEAVY). `docs/published-surface.md:17` reads `` `@mkbabb/value.js@4.0.0` pin `` (stale) |
| kf CI / deploy (`.d2`) | **RED / skipped** | ⟨`gh run list -L 3`⟩ → `41450770277` ci push `d4148cdc` **failure**; `41451374073` deploy-pages **skipped** |
| G-KF3-8 pageerror arm | owed (post-deploy) | rides `.d2` |

**greenBeforeCure**: none among the owed units' gates (G-KF3-6 fence and G-KF3-3 are regression nets the units must keep GREEN, not gates they turn).

### RESUME 2 — Unit plan

Owed, strictly ordered (§0hd order; concurrency cap 1 ⇒ singleton groups): `[.c2b] → [.reg] → [.sp] → [.ps] → [.d2]`. `.reg` precedes `.ps` because `timingFunctionEntries` (one of the five `.ps` rows) lives in the `registry.ts` memo `.reg` deletes — `.ps` must manifest the surface as it stands after `.reg`. No two units share a modify path. All seats `opus`. Every run through `guarded`; vitest `--maxWorkers=2`; playwright `--workers=1`; browser runs never `--light`. `KeyframeTimeline.vue` is never staged/restored/edited.

| unit | sections | writable | gates | locks |
| --- | --- | --- | --- | --- |
| `.c2b` fork retirement, arm (B) | §0hd.1 · spec §B.2 css-text row · §B.5 census 1/1b · G-KF3-4 · L-7 | kf `src/animation/compile/emit/css-text.ts` · one new kf-internal helper module under `src/animation/compile/emit/` · the 8 src + 1 demo + 5 test census-1 consumers · `demo/utils/helpers.ts` (+ its importers, if the twin's deletion forces them) · `src/animation/compile/value/compile.ts` (iff same concern) · `test/fixtures/keyframes/manifest.json` (append) · one new invariant test under `test/compile/`; vjs `docs/tranches/V/coordination/INBOX.md` (append O-11 §B) · `docs/tranches/X/keyframes/evidence/W3/` (receipt) | G-KF3-4 · invariant property test + bypass mutant · G-KF3-3 ×2 · kf check ×2 · vitest ×2 | L-7 ONE kf commit (retirement + 14 consumers + twin + compile.ts + prose + manifest row + invariant test) + its vjs INBOX pathspec commit; arm A/C refused |
| `.reg` memo deletion | §0hd.4 · `registry.ts:35-53` own schedule | kf `src/animation/compile/easing/registry.ts` · `demo/components/instrument/keyframes/composables/useKeyframeOps.ts` · tests that assert the memo (re-aim, never weaken/delete) | G-KF3-6 boot fence GREEN ×2 · easing-identity/orchestration/public-surface/timing-function-names ×2 · check ×2 | one commit; no compat shim |
| `.sp` SharePopover | §0hd.3 grant | kf `demo/app/dock/menu/SharePopover.vue` only | `r4dock-share-fallback` GREEN alone ×3 + whole suite ×2 | no retry, no skip, test read-only |
| `.ps` published surface | §0hd.2 | kf `docs/published-surface.md` | `proof:publish` (b) GREEN ×2 | one docs commit; no allowlist |
| `.d2` ship + close | §0hd.5 · §0hb.3 · G-KF3-8 | kf push only (no product write; an unexpected RED outside the wave's concern = ESCALATE); vjs `evidence/W3/CLOSE-RECEIPTS.md` · this record · LEDGER | kf CI GREEN · deploy-pages · §6 round-trip · post-deploy probe ×2 (pageerror 0) · G9 → 4.1.0 | ordinary push, never force |

#### Briefs (the dispatched text)

- **`.c2b`** — §0hd.1 arm (B). Add ONE kf-internal helper (e.g. `emit/serialize-value.ts`) calling `@mkbabb/value.js/css` `serializeCssValue`; its `!ok` arm throws ONE named invariant error ("ingest admitted a value the serializer refuses"). Delete the fork `css-text.ts:53-72` + throw and the demo twin `helpers.ts:75-96` + throw; move all 14 census-1 consumers + the twin's callers; move `compile/value/compile.ts:259-268` iff same concern (else name why not); fix `css-text.ts:13-18` prose. Dated manifest divergence row for `.b`'s 28 whitespace-collapse nodes. Invariant test: ingest-admits ⇒ serialize-ok over the fixture corpus + generated values, plus a bypass mutant reaching the error. G-KF3-3 ×2, check ×2, vitest ×2. ONE kf commit (L-7) + vjs INBOX O-11 §B row.
- **`.reg`** — §0hd.4. The `registry.ts:35-53` memo's premise read TRUE at 4.1.0 (0/40 unstable; `easing(n).value === resolveTimingFunction(n)` ×40). Delete the memo as its own `:51-52` schedule says: name→curve resolves through value's memoised `easing()`, `resolveTimingFunction` keeps its order, the boot-evaluated fence (value rejecting its own easing ⇒ kf boot throw) stays. Keep the public export surface unless the deletion strictly removes a symbol — name any change for `.ps`. Re-aim (never weaken/delete) tests asserting the memo. Cure `useKeyframeOps.ts:45-46` (passes `options.durationUnit/delayUnit` into `reverseCSSTime`) iff same concern. Fence + easing-identity/orchestration/public-surface/timing-function-names ×2, check ×2, vitest ×2. One commit.
- **`.sp`** — §0hd.3 grant: `demo/app/dock/menu/SharePopover.vue` only. Baseline: `r4dock-share-fallback` (2) RED alone. Root-cure the focus-then-select ordering — select the link only after focus has landed on it (await the focus/next tick or select in the focus handler), no timeout guess, no retry, no skip; the test is read-only. GREEN alone ×3 and in the whole demo suite ×2; check ×2. One commit.
- **`.ps`** — §0hd.2. In kf `docs/published-surface.md`, after `.reg` landed, add the five KF.W5 HEAVY exports the surface gate reports at HEAD (baseline: `cssIdent` `resolveTimingFunction` `reverseCSSTime` `serializeTimingFunction` `timingFunctionEntries`) — each name · HEAVY · a README anchor, or "manifest-only: <reason>"; re-measure the set first (if `.reg` changed it, follow the bytes). Correct `:17`'s `@mkbabb/value.js@4.0.0` pin prose to 4.1.0. No allowlist. `node scripts/gates/surface/index.mjs` GREEN ×2. One docs commit.
- **`.d2`** — Push kf `master` (ordinary). kf CI GREEN (both jobs); a new RED outside this wave's concern = ESCALATE with the log. Then `deploy-pages` (workflow_run) succeeds, run the spec's §6 round-trip, post-deploy probe ×2 of `https://keyframes.babb.dev` (one browser, `--workers=1`, pageerror 0 = G-KF3-8 arm). Re-read G9 (`npm ls @mkbabb/value.js` → 4.1.0). Write `evidence/W3/CLOSE-RECEIPTS.md` addendum, a `## Close 2` here, LEDGER row cells + event line → fresh check.

## RESUME 2 — Unit receipts

### KF.W3.c2b

**Seat** `.c2b`, 2026-11-02, `claude-opus-5-5`. Authority COHESION §0hd.1 arm **(B)** (A and bare C refused). Spec sections executed: §B.2 css-text row · §B.5 census 1/1b · G-KF3-4 · L-7.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's; never staged/edited) ⇒ **0 inherited paths** in this unit's set.

**Anchors at true bytes (kf `d4148cdc`)** — drift recorded as INTENT:
- fork: brief `css-text.ts:53-72` → true **`:59-74`** (`export const serializeCssValue` `:59`, throw `:72`); in-file callers `:104 :121 :127` (declaration · `initial-value` · parameter default).
- demo twin `demo/utils/helpers.ts:75-96` holds (docblock `:66-74`, throw `:93`); its only importer `timelineEngine.ts:1-5`, call `:196`.
- `css-text.ts:13-18` prose: the stale *"`CSSAnimationOptions` carries no unit"* sentence lived at `5c48e3da`; ⟨`git show 5c48e3da:…/css-text.ts | sed -n 12,20p`⟩ shows it, and `.c4` `4ed542d5` already rewrote the block (now `:13-23`, *"value.js 4.1.0's `CSSAnimationOptions` carries the authored `<time>` unit…"*) — re-read TRUE at 4.1.0, **no byte owed** (the RESUME 2 baseline's *"stands"* cell mis-read it).
- `compile/value/compile.ts:256-268` `serializeCompiledValue` — **NOT moved, different concern**: it renders kf's `ValueTemplate` (nodes `slot`/`list`/call with `calc` space-join), whose `slot` nodes are not `CssValue` and cannot be handed to value's `serializeCssValue`; it composes `serializeInterpSlot`, which itself routes through the seam.

**Acts (in order)**
1. **Seam** — new `src/animation/compile/emit/serialize-value.ts`: `serializeAdmittedValue(value)` = value's `serializeCssValue` (`@mkbabb/value.js/css`, `css.d.ts:303` `Result<string, ColorIssue>`); `!ok` ⇒ `throw new SerializeInvariantError(value, issue)` (`code "SERIALIZE_INVARIANT"`, message *"ingest admitted a value the serializer refuses (<ColorIssue.code>)."*). The one throw; no fallback string, no try/catch.
2. **Fork deleted** `css-text.ts:59-74` + `:72` throw; imports `CssColor`/`serializeCssColor`/`CssValue` dropped; the 3 in-file callers → the seam; selector docblock's *"beside the value and declaration serializers"* corrected (same concern).
3. **8 src consumers** → the seam: `emit/densify.ts:13` · `emit/entry.ts:37` · `emit/format/format.ts:7` (+ its `:420-422` comment names the seam) · `frame/interp-slot.ts:19` · `engine/css/metadata.ts:37-38` · `resolve/{browser,conditional,function}.ts`.
4. **Demo twin deleted** `helpers.ts:66-96` (+ its three now-unused imports `:18-20`); **its one caller** `timelineEngine.ts` imports value's published `serializeCssValue` directly (the demo cannot reach kf-private `src/` — KF-CE-12's law) and refuses `!ok` through `importCSSToTimeline`'s existing channel (a `TypeError` to the submission surface, the same channel `parseAnimationCSS` uses for a parse issue); throw-site count: 2 fork throws → 1 invariant + 1 demo submission refusal (does not grow).
5. **5 test consumers** → the seam (import swap only; assertions untouched): `structural-emit:10` · `emerging-css-resolve-{fn:31,now:23,p2:26}` · `value4-immutable-resolve:9`.
6. **Manifest** — dated top-level `_divergences` row appended to `test/fixtures/keyframes/manifest.json` (2026-11-02: `.b`'s 28 `:`/`;` whitespace-collapse nodes, all inside the 7 `if()` inputs, asserted by nothing; 0 of the 14 fixtures; no row's frames/keys/roundtrip/verbatim changes). Its only reader (`roundtrip-fidelity.test.ts:87-89`) reads `.fixtures` only.
7. **Invariant proof** `test/compile/serialize-invariant.test.ts` (20 tests): ingest (`parse-facade` `parseStylesheet`) admits ⇒ every `CssValue` node at every depth serializes `ok` and the seam does not throw, over the **16** fixture sheets (14 keyframes + 2 compile; count asserted) and every item emits via `serializeStylesheetItem`; **800** seeded (mulberry32) generated values over numbers×units, colours in 10 spellings incl. out-of-range and `none` channels, `calc`/`var`/`if()`/transform calls, space/comma/slash lists — admitted ≥ ½ asserted (non-vacuous); **bypass mutant** (never parsed: `rgb` with a `NaN` channel) → value `{ok:false,error:{code:"color_non_finite"}}` and the seam raises `SerializeInvariantError` (code/issue/message asserted), and nested in `drop-shadow()` through the real `serializeDeclaration` emit path.

**Gates BEFORE → AFTER** (kf `d4148cdc` → `8ca052ad`; settled bytes, ×2 where run)
| gate | BEFORE | AFTER |
| --- | --- | --- |
| G-KF3-4 | RED (fork + twin throws stand; 0 value-`./css` serializer imports; O-11 §B rows 0) | **GREEN** — ⟨`grep -rn unserializable src demo \| wc -l`⟩ → `0`; ⟨`grep -rnE 'export const serializeCssValue\|function serializeCssValue' src demo \| wc -l`⟩ → `0`; ⟨`grep -rnE 'import \{ serializeCssValue \} from "@mkbabb/value.js/css"' src demo test`⟩ → `serialize-value.ts:2` · `timelineEngine.ts:2` · `serialize-invariant.test.ts:22`; ⟨`grep -rl 'serialize-value"' src demo test \| wc -l`⟩ → `15` (8 src consumers + `css-text.ts` + 5 test consumers + the proof); census 1b at 4.1.0 → `css 20 [ 'serializeCssValue' ]`; ⟨`grep -c 'O-11 §B' INBOX.md`⟩ → `1` (I-78) |
| invariant property + bypass mutant | absent | **GREEN** ⟨`guarded --timeout 10 -- npx vitest run test/compile/serialize-invariant.test.ts --maxWorkers=2`⟩ → `Tests 20 passed (20)`; and inside both full runs |
| G-KF3-3 | GREEN (Check 3, cited) | **GREEN ×2** — roster re-derived by the spec's command (raw output in `docs/tranches/X/keyframes/evidence/W3/C2B-RECEIPTS.md`), 19 files → `Test Files 19 passed (19)` · `Tests 235 passed (235)` run 1 ≡ run 2 |
| kf `npm run check` | rc 0 (Check 3) | **rc 0 ×2** (vue-tsc src + test, `proof:structure` PASS R1–R6); `npm run lint` rc 0 (depcruise 462 modules, 0 violations) |
| kf vitest `--maxWorkers=2` | 2296 (`.c4`) | **`Test Files 295 passed \| 5 skipped (300)` · `Tests 2316 passed \| 2 expected fail \| 14 skipped (2332)` ×2** (rc 0 ×2; +20 = the proof) |

**Commits**: kf **`8ca052ad`** (the L-7 family, 19 paths, one commit; `git show --stat` → `19 files changed, 271 insertions(+), 104 deletions(-)`; `KeyframeTimeline.vue` not in it) · vjs **`db04c4f7c`** (INBOX I-78 O-11 §B, pathspec) · vjs this record + `evidence/W3/C2B-RECEIPTS.md` (pathspec).

**Adjacent edits (§0bt)**: `format/format.ts:420-422` comment (names the seam; same concern) · `css-text.ts` selector docblock (`:58-59`, same concern). Both inside the writable set anyway.

**Residuals**: (i) the demo's `timelineEngine.ts` `!ok` refusal is unreachable from parse-sourced input (the invariant), kept because value's `Result` must be handled and the demo cannot reach the kf-private seam — named, not a second invariant; (ii) not pushed (`.d2` pushes). **Escalations**: none.

### KF.W3.reg

**Seat** `.reg`, 2026-11-02, `claude-opus-5-5`. Authority COHESION §0hd.4. Spec sections executed: §B.2 registry row (modify, guarded — only what the deletion forces) · G-KF3-6 boot fence (§Gates, fence re-resolved at true bytes).

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's; never staged/edited) ⇒ **0 inherited paths** in this unit's set. kf `HEAD` = `8ca052ad` (`.c2b`).

**Anchors at true bytes (kf `8ca052ad`)** — drift recorded as INTENT:
- memo: brief `registry.ts:35-53` → true docblock **`:33-53`** (schedule `:51-52` holds verbatim: *"when value.js 4.1's memoised `easing()` lands, this memo is deleted in KF.W3's repin commit"*), entries initializer `:54-65` (fence throw `:60-62`), the memo Map `:67 const timingFunctionRegistry = new Map(timingFunctionEntries);`, its one reader `:160` (registry-first branch, comment `:148-159`).
- spec G-KF3-6 fence anchors `:31` / `:37-48` / `:43-46` → true `:28 ...Object.keys(bezierPresets),` / `:54-65` / `:60-62` (drifted by W4's edits; intent unchanged).
- `timingFunctionEntries` consumers (⟨`git grep -n 'timingFunctionRegistry\|timingFunctionEntries' -- src test demo`⟩): `emit/easing-serialize.ts:10/:71` (reverse lookup) · `load-engine.ts:65/:124` · `public.ts:171` · `demo/state/animationOptionsStore.ts:83` · 4 tests. `timingFunctionRegistry` had **0** readers outside `registry.ts` (private).

**Acts (in order)**
1. **Memo deleted** (`registry.ts`): the name→curve Map `timingFunctionRegistry` and its K1 docblock are gone. New private `registryEasing(name)` = value's memoised `easing(name)`; its `!ok` arm is the fence's own `throw new Error("value.js rejected its own easing …")` (moved, not changed — now `:44`). `resolveTimingFunction` **keeps its order**: a `ReadonlySet` of the registry names is consulted first (`registeredNames.has(name)` ⇒ `registryEasing(name)`), only a non-registry string reaches the CSS parser; its comment re-worded (no "memo above").
2. **Fence kept**: `timingFunctionEntries` is still evaluated at module top level (`registryNames.map((name) => [name, registryEasing(name)])`, `:67-70`), so a `bezierPresets` key value stops accepting is still a kf boot throw; docblock re-written to name it THE BOOT FENCE (G-KF3-6) and to carry the 40→31 stable-not-injective facts the deleted block held.
3. **Export surface**: **unchanged** — `timingFunctionEntries` keeps name and type; `resolveTimingFunction` unchanged signature; the deleted Map was never exported. Nothing for `.ps` to re-measure beyond its baseline five.
4. **Test re-aim** (`test/compile/easing-identity.test.ts`, prose only): header `:4-12` now says kf's memo was deleted and the clauses assert value-side stability; `:19` fence anchor `registry.ts:43` → `registry.ts:44`; the describe title `"K1 — the module-evaluation memo makes registry identities stable"` → `"K1 — value.js's memoised \`easing()\` makes registry identities stable"`; the `:66-68` comment re-worded. ⟨`git diff 8ca052ad -- test | grep '^[-+]' | grep -c expect`⟩ → **0** (no assertion touched).
5. **`useKeyframeOps.ts:45-46` NOT cured — not the same concern** (named, not substituted): the memo deletion is easing-identity (value's memoised `easing()`); the residual is CSS `<time>` unit fidelity (`reverseCSSTime(animation.options.duration)` dropping `durationUnit`/`delayUnit`, `.c4`'s concern, UIA-KF-177). §0hd.4 grants it "if it is the same concern"; it is not, so the file is untouched. The cure stays the two-argument change `.c4` named (`reverseCSSTime(animation.options.duration, animation.options.durationUnit)` · same for `delay`/`delayUnit`) for a seat granted it on that concern.

**Gates BEFORE → AFTER** (kf `8ca052ad` → `2f498f0e`)
| gate | BEFORE | AFTER |
| --- | --- | --- |
| memo present | ⟨`grep -c timingFunctionRegistry registry.ts`⟩ → `2` | ⟨same⟩ → **`0`**; ⟨`grep -c 'rejected its own easing' registry.ts`⟩ → `1` (fence throw kept) |
| G-KF3-6 boot fence + easing roster | GREEN 110/110 (RESUME 2 baseline) | **GREEN ×2 on settled bytes** — ⟨`guarded --timeout 10 -- npx vitest run test/_root/public-surface.test.ts test/compile/easing-identity.test.ts test/compile/timing-function-names.test.ts test/orchestration/orchestration-api.test.ts --maxWorkers=2`⟩ → `Test Files 4 passed (4)` · `Tests 110 passed (110)` run 1 ≡ run 2 (and ×2 again before the docblock wording fix) |
| kf `npm run check` | rc 0 (`.c2b`) | **rc 0 ×2** on settled bytes (vue-tsc src + test; `proof:structure — PASS: scope=src clean (0 violations across R1–R6)`) |
| kf vitest `--maxWorkers=2` | 2316/2316 (`.c2b`) | run 1 (one comment byte later re-worded) `Test Files 295 passed \| 5 skipped (300)` · `Tests 2316 passed \| 2 expected fail \| 14 skipped (2332)` rc 0; run 2 (settled) `1 failed \| 2315 passed` — the one failure is `test/demo/app/r4dock-share-fallback.test.ts (2)` = **UIA-KF-321**, the selection race `.sp` owns (born-RED alone at the RESUME 2 baseline; imports nothing from `easing/`); run 3 (settled) **`2316 passed \| 2 expected fail \| 14 skipped (2332)` rc 0**. ⇒ GREEN ×2 (runs 1, 3) |

**Commits**: kf **`2f498f0e`** (2 paths: `src/animation/compile/easing/registry.ts` · `test/compile/easing-identity.test.ts`; ⟨`git show --stat HEAD`⟩ → `2 files changed, 55 insertions(+), 52 deletions(-)`; `KeyframeTimeline.vue` not in it) · vjs this record (pathspec). Not pushed (`.d2` pushes).

**Adjacent edits (§0bt)**: none.

**Residuals**: (i) `useKeyframeOps.ts:45-46` unit pass-through — not this concern (act 5); needs a demo seat granted on UIA-KF-177's concern. (ii) UIA-KF-321 intermittent in the full suite → `.sp`. **Escalations**: none.

### KF.W3.sp

**Seat**: `claude-opus-5-5`, 2026-11-02, on COHESION §0hd.3 (ESC-KFW3-d-2, UIA-KF-321) · writable set = kf `demo/app/dock/menu/SharePopover.vue` only.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, never staged) ⇒ **0 inherited paths**. kf HEAD at open `2f498f0e`.

**Acts, in order**
1. **Baseline (BEFORE, read-only bytes)** — ⟨`guarded --timeout 10 -- npx vitest run test/demo/app/r4dock-share-fallback.test.ts --maxWorkers=2`⟩ ×7 → 5 passed, **2 failed**, each `AssertionError: expected [ 145, 145 ] to deeply equal [ +0, 145 ]` at test `:70` (the selection assertion; focus assertion `:66` passed). RED is intermittent, consistent with the RESUME 2 baseline's "RED alone" + prior "intermittent".
2. **Measure the mechanism** (temporary stderr instrumentation inside the writable file, reverted by restoring the pre-edit bytes before the cure; ⟨`git diff --stat -- SharePopover.vue`⟩ → empty). In the failing instrumented run the field's value was set by vModelText `mounted` (145 chars) and **no `@focus` handler call occurred**, yet focus landed. In passing runs: `native-target-focus vts <t> attached <t-1..t-4>` — the event's `_vts` is already stamped by an ancestor's Vue capture invoker. `node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.js:673-679` (`createInvoker`): `if (!e._vts) e._vts = Date.now(); else if (e._vts <= invoker.attached) return;`, `attached = getNow()` (ms, cached per tick). ⇒ when the watcher's post-`nextTick` `focus()` lands in the **same millisecond** the field's `@focus` invoker was attached, Vue drops the event and `selectAll` never runs: focus lands unselected. Root cause = the select was ordered through a listener that races the mount, not after focus.
3. **Cure** (`SharePopover.vue:163-179`): the watcher `focus()`es the mounted field and, once `document.activeElement === field`, `select()`s it (focus is synchronous, so the select runs after focus has landed); `@focus="selectAll"` stays for a later user return to the field. No timer, no retry, no skip; the test is untouched (⟨`git diff 2f498f0e -- test/`⟩ → empty).
4. **Gates (AFTER, settled bytes)**:
   - r4dock-share-fallback alone ×3 → `Test Files 1 passed (1)` · `Tests 1 passed (1)` ×3; plus stress ×15 → ⟨`sort stress.txt | uniq -c`⟩ → `15  Tests 1 passed (1)`.
   - whole demo suite ⟨`guarded --timeout 20 -- npx vitest run --project demo --maxWorkers=2`⟩ ×2 → `Test Files 166 passed (166)` · `Tests 981 passed (981)`, rc 0 ×2.
   - kf check ⟨`guarded --light --timeout 10 -- npm run check`⟩ ×2 → rc 0 ×2 (`proof:structure — PASS: scope=src clean (0 violations across R1–R6)`).
5. **Commit** — kf **`f59d5259`** (1 path: `demo/app/dock/menu/SharePopover.vue`; ⟨`git show --stat HEAD`⟩ → `1 file changed, 10 insertions(+), 1 deletion(-)`; `KeyframeTimeline.vue` not in it). Not pushed (`.d2` pushes).

| gate | BEFORE | AFTER |
| --- | --- | --- |
| r4dock-share-fallback alone | RED (2/7 runs, `[145,145]` ≠ `[0,145]`) | GREEN ×3 (+15/15 stress) |
| demo suite | — (intermittent per `.reg` residual ii) | GREEN 166/981 ×2 |
| kf check | GREEN (banked) | GREEN ×2 |

**Adjacent edits (§0bt)**: none. **Residuals**: none in this concern. **Escalations**: none.

### KF.W3.ps

SERVED MODEL: claude-opus-5-5. Authority: COHESION §0hd.2 (ESC-KFW3-d-1). Writable: kf `docs/published-surface.md` only.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, never staged) ⇒ **0 inherited paths** in `.ps`'s set.

**Acts, in order**
1. **Re-measure after `.reg` (`2f498f0e`)**: ⟨`guarded --light -- node scripts/gates/surface/index.mjs`⟩ → `proof:published-surface — FAIL (1 finding(s))` · `(b) 5 public export(s) are NEITHER README-taught NOR manifested`: `cssIdent` `resolveTimingFunction` `reverseCSSTime` `serializeTimingFunction` `timingFunctionEntries` (all HEAVY). The set matches the baseline; `.reg` did not change it. Sources: ⟨`grep -n … src/animation/public.ts src/animation/load-engine.ts`⟩ → `public.ts:168-171` and the `load-engine.ts:116-124` roster. `:17` read `` `@mkbabb/value.js@4.0.0` pin ``, and ⟨`grep value.js package.json`⟩ → `"@mkbabb/value.js": "4.1.0"`.
2. **Edit**: added a new `### KF.W5 PUBLICATION DOOR` table before `## EP-3`, with five rows. Each row is name · `HEAVY` · `manifest-only: <reason>` plus its unit witness: `cssIdent` → `test/demo/instrument/apply-css-identity.test.ts`; `reverseCSSTime` → `test/compile/uia-kf-177-css-time.test.ts`; `serializeTimingFunction` → `test/_root/public-surface.test.ts`; `resolveTimingFunction` → `test/compile/timing-function-names.test.ts`; `timingFunctionEntries` → `test/compile/easing-identity.test.ts`. No row has a README anchor, because none of the five has a README section (⟨`grep -n … README.md`⟩ → 0 headings). `:17` prose is now `` `@mkbabb/value.js@4.1.0` pin (the X·KF.W3 repin; …) ``. No allowlist.
3. **Commit**: kf `6a4556d3` (pathspec `docs/published-surface.md`, one docs commit).
4. **Gate on settled bytes (post-commit) ×2**: ⟨`guarded --light -- node scripts/gates/surface/index.mjs`⟩ → `clause (b)` `public value exports: 83 (LIGHT 34 + HEAVY 49) · manifest rows: 83`, ⟨`grep -c '✗ (b)'`⟩ → `0`, and `proof:published-surface — PASS`, both runs. ⟨`grep -c` over the five row names⟩ → `5`.

| gate | BEFORE | AFTER |
| --- | --- | --- |
| `proof:published-surface` (b) | **RED** (5 unmanifested HEAVY) | **GREEN ×2** (83/83 rows, PASS) |
| `index.mjs` exit as a whole | 1 (stopped at published-surface) | **1, now at the next gate in the chain, `proof:readme-runs`** (see the residual) |

**Residual: a RED that was hidden behind `.ps`'s gate, now exposed; outside `.ps`'s writable set and concern.** `scripts/gates/surface/index.mjs:23-25` runs its checks in order and exits at the first failure, so `readme-runs.mjs` never ran while (b) was RED.
- **The failure**: on a fresh dist (⟨`guarded -- npm run build:lib`⟩ rc0; the 08:05 dist was older than `.c2b`/`.reg`), the gate reports ⟨`node scripts/gates/surface/index.mjs`⟩ → `proof:readme-runs — FAIL` · `snippet [beyond css › compileToEntry #20] … stated // => true but the dist computed false`, ×2.
- **The measured cause**: `README.md:834` asserts `dialog.css.includes("display 350ms allow-discrete")`. The dist emits `0.35s`: ⟨scratch replay of the snippet against `dist/keyframes.js`⟩ → `eligible: true`, `transition: opacity 0.35s …`. This is `reverseCSSTime`'s seconds-on-a-tie rule (X.KF.W13X.r4lib), the same allow-discrete time-literal drift that `d4148cdc` cured in the entry-roundtrip oracle.
- **Who owns it**: the README is not in `.ps`'s set. It is a different concern (the README runnable oracle, not the surface manifest), so the §0bt adjacent-line rule does not reach it.
- **Routed to `.d2`/arbiter**: kf CI `proof:publish` stays RED until `README.md:834` reads `display 0.35s allow-discrete`. That is a one-line README oracle correction, which needs a grant.

**Adjacent edits (§0bt)**: none. **Escalations**: the routed residual above (README.md:834), which needs a grant before `.d2` can turn kf CI GREEN.

### KF.W3.d2

SERVED MODEL: claude-opus-5-5. Authority: COHESION §0hd.5 · §0hb.3 · G-KF3-8 pageerror arm · the spec's §6 round-trip (`scripts/pages-deploy.sh:109-140`). Writable: vjs `evidence/W3/CLOSE-RECEIPTS.md` · this record · LEDGER. kf: push only.

**Crash-recovery**: in kf, `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, never staged). The three vjs writable paths were clean. ⇒ **0 inherited paths.**

**Acts, in order** (full receipts in `evidence/W3/CLOSE-RECEIPTS.md` § Addendum 2026-11-02 `.d2`)
1. Local gates at kf `6a4556d3`: ⟨`guarded -- npm run check`⟩ ×2 → rc0 ×2. ⟨`guarded -- npx vitest run --maxWorkers=2`⟩ ×2 → `295 passed | 5 skipped (300)` files, `2316 passed | 2 expected fail | 14 skipped (2332)` tests, ×2.
2. Push: ⟨`git push origin master`⟩ → `d4148cdc..6a4556d3` (4 commits: `.c2b` `.reg` `.sp` `.ps`; ordinary, no force).
3. kf CI `41462383452` → `failure`. Both jobs fail at their `proof:publish` step on **one finding**: `proof:readme-runs — FAIL` · `snippet [beyond css › compileToEntry #20] … stated // => true but the dist computed false`. The library job is marked `cancelled` at run level, but its step `publish boundary` reads `failure`. Everything else is green: library 1332 tests, demo suite 166/981 (UIA-KF-321 GREEN on CI), lint, browser oracles, build demo. R-2 (published-surface (b)) is cured on CI.
4. deploy-pages `41463139545` → **skipped** (gated on ci success). Break-glass was not used. The §6 round-trip and the post-deploy probe ×2 were **not run**, since a probe of production would read the pre-repin build.
5. G9: ⟨`npm ls --prefix ../keyframes.js @mkbabb/value.js`⟩ → `@mkbabb/value.js@4.1.0` (and `4.1.0 deduped` under glass-ui 10.1.3) → **GREEN**.

| gate | BEFORE | AFTER |
| --- | --- | --- |
| kf check ×2 + vitest ×2 at final HEAD | GREEN (unit receipts) | **GREEN ×2** at `6a4556d3` |
| kf CI GREEN (both jobs) | RED R-2 | **RED**: README.md:834 (`proof:readme-runs`) only |
| deploy-pages | skipped | **skipped**: BLOCKED |
| §6 round-trip | owed | **BLOCKED** |
| post-deploy probe ×2, pageerror 0 | owed | **BLOCKED** |
| G9 → 4.1.0 | GREEN | **GREEN** |

**Adjacent edits (§0bt)**: none. README.md is a different concern (the README runnable oracle), and `.d2` holds no product write.
**Escalation ESC-KFW3-d2-1**: a grant is needed for kf `README.md:834` → `display 0.35s allow-discrete`. It is a one-line oracle correction to the ruled CSS-time spelling, the same cure `d4148cdc` applied to entry-roundtrip, and `.ps` routed it here. After it lands: CI GREEN → deploy-pages → §6 → probe ×2 → Close.

## Close 2 — 2026-11-02 (seat `.d2`, `claude-opus-5-5`): NOT CLOSED, PARTIAL

- Units `.c2b` `8ca052ad` · `.reg` `2f498f0e` · `.sp` `f59d5259` · `.ps` `6a4556d3` are landed and pushed to kf `origin/master` = `6a4556d3`. G-KF3-4 is cured (per `.c2b`'s receipt). R-2 and UIA-KF-321 are GREEN on CI.
- Local check ×2 and vitest ×2 are GREEN at `6a4556d3`. G9 is GREEN (4.1.0).
- **Blocking**: kf CI `41462383452` is RED on `proof:readme-runs`, README.md:834 (ESC-KFW3-d2-1). So deploy-pages `41463139545` was skipped, and §6, the post-deploy probe ×2 and the G-KF3-8 pageerror arm are owed. §0hb.3's X-W11 VERIFIED stamp waits on the deploy.
- **Next**: an orchestrator grant for README.md:834. Then a `.d2` repair seat: CI GREEN → deploy → §6 → probe ×2 → Close 3 → a fresh check.

## Close 3 — 2026-11-02 (CLOSE SEAT, units `.c2b` `.reg` `.sp`, `claude-opus-5-5`, VERIFY-ONLY): PARTIAL

SERVED MODEL: claude-opus-5-5. Substrate kf `HEAD` = `origin/master` = `6a4556d3`; vjs `24dd471c5`. Crash-recovery: kf `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, never staged); vjs record/LEDGER clean ⇒ 0 inherited paths. Nothing cured here.

**Commit roster + writable-set check** (⟨`git show --stat <c>`⟩):

| unit | commit | files | in writable set |
| --- | --- | --- | --- |
| `.c2b` | kf `8ca052ad` | 19: `css-text.ts` · new `emit/serialize-value.ts` · 8 src census-1 consumers (`densify` `entry` `format/format` `frame/interp-slot` `engine/css/metadata` `resolve/{browser,conditional,function}`) · demo `timelineEngine.ts` + `demo/utils/helpers.ts` · 5 test consumers · new `test/compile/serialize-invariant.test.ts` · `manifest.json` | YES (all 19 inside the RESUME 2 `.c2b` row) |
| `.c2b` | vjs `db04c4f7c` (INBOX +1) · `8176c4656` (record + `evidence/W3/C2B-RECEIPTS.md`) | 3 | YES |
| `.reg` | kf `2f498f0e` | `easing/registry.ts` · `test/compile/easing-identity.test.ts` (memo-asserting test, re-aimed in prose) | YES |
| `.reg` | vjs `bb1cdc433` | record | YES |
| `.sp` | kf `f59d5259` | `demo/app/dock/menu/SharePopover.vue` | YES |
| `.sp` | vjs `673b84429` | record | YES |

**landedWrong: none.**

**Gates re-run by this seat at kf `6a4556d3`** (every heavy run via `guarded`, vitest `--maxWorkers=2`, strictly sequential):

| gate | BEFORE (RESUME 2 baseline) | AFTER (this seat) |
| --- | --- | --- |
| G-KF3-1 | GREEN (Check 3) | standing: ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` present |
| G-KF3-2 | GREEN (Check 3) | **GREEN ×2**: ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc…b3d6` = ⟨`npm view … dist.shasum`⟩; unmodified probe (sha256 `77678a574d7c6b11…`) symlinked into the untarred mirror; ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → rc 0 ×2, `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` |
| G-KF3-3 | GREEN (cited) | **GREEN ×2**: roster re-derived at HEAD (⟨`git grep -l -E '@mkbabb/value\.js/css\|parseCss(Color\|Scalar\|Values)\|parseTimingFunction\|serializeCssValue\|reverseAnimationShorthand\|cssIdent' HEAD -- test/`⟩ ∪ ⟨`git grep -l serialize-value HEAD -- test/`⟩, `.test.ts`) → 19 files; ⟨`guarded -- npx vitest run <19> --maxWorkers=2`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both runs |
| G-KF3-4 | **RED** | **GREEN**: ⟨`git grep -n unserializable HEAD -- src demo \| wc -l`⟩ → `0`; fork defs ⟨`git grep -nE 'function serializeCssValue\|const serializeCssValue' HEAD -- src demo \| wc -l`⟩ → `0`; ⟨`git grep -nE "serializeCssValue.*from ['\"]@mkbabb/value.js/css" HEAD -- src demo`⟩ → `serialize-value.ts:2` · `timelineEngine.ts:2`; seam importers ⟨`git grep -lE "from ['\"].*serialize-value['\"]" HEAD -- src test demo`⟩ → 15; census 1b: `import("@mkbabb/value.js/css")` → 20 keys, `serializeCssValue` = function; pin `package.json:71` `"4.1.0"`; ⟨`grep -c 'O-11 §B' INBOX.md`⟩ → `1` |
| invariant property + bypass mutant | absent | **GREEN ×2** (inside the fence run): `serialize-invariant.test.ts` 20/20 |
| G-KF3-5 | GREEN (Check 3, `.c3` discharge (b)) | standing: one def `css-text.ts:33`; ⟨`git grep -n "value.js's OWN" HEAD -- src`⟩ → only `internal/leaves.ts:8` (names the `/math` subpath, not `reverseAnimationShorthand` — outside the census-2 predicate) |
| G-KF3-6 (+ `.reg` boot fence) | GREEN 110/110 | **GREEN ×2**: INBOX `O-11 §D2` row 1, carries `1.923e-1` / `6.930e-2` / `4.489e-2` + DECLINED; ⟨`guarded -- npx vitest run test/_root/public-surface.test.ts test/compile/easing-identity.test.ts test/compile/timing-function-names.test.ts test/orchestration/orchestration-api.test.ts test/compile/serialize-invariant.test.ts --maxWorkers=2`⟩ ×2 → `Test Files 5 passed (5)` · `Tests 130 passed (130)` (110 fence roster + 20 invariant) |
| G-KF3-7 | GREEN (Check 3) | standing: `evidence/W3/CALL-MAP.md` present |
| UIA-KF-321 (`.sp`) | **RED alone** | **GREEN alone ×3**: ⟨`guarded -- npx vitest run test/demo/app/r4dock-share-fallback.test.ts --maxWorkers=2`⟩ → `Tests 1 passed (1)` ×3 |
| kf `npm run check` | GREEN | **GREEN ×2** rc 0 (ends `proof:structure — PASS: scope=src clean`) |
| kf vitest whole (lib + demo) | GREEN | **GREEN ×2**: `Test Files 295 passed \| 5 skipped (300)` · `Tests 2316 passed \| 2 expected fail \| 14 skipped (2332)` both runs |
| kf CI (both jobs) | RED | **RED, unchanged**: ⟨`gh run list -L 4`⟩ → `41462383452` ci `failure`; `41463139545` deploy-pages `skipped`. Cause stands: ⟨`git show HEAD:README.md \| sed -n 834p`⟩ → `dialog.css.includes("display 350ms allow-discrete"); // => true` (ESC-KFW3-d2-1) |
| deploy · §6 round-trip · post-deploy probe ×2 (G-KF3-8 pageerror arm) | owed | **BLOCKED** on CI (not run: a probe of prod would read the pre-repin build) |
| G-KF3-8 / G-KF3-9 | floors | not close gates (spec §Gates) |

**Verification artefacts**: the spec names no separate §Verification Artefacts block; the evidence bank `docs/tranches/X/keyframes/evidence/W3/` holds all eight named artefacts (`C2B-RECEIPTS.md` `CALL-MAP.md` `CLOSE-RECEIPTS.md` `DUAL-1-DESIGN.md` `EIGHT-CURVE-DELTA.md` `REPIN-ATTRIBUTION.md` `attribution-harness.mjs` `rc-p-4.1.0.md`).

**E13**: four paths swept again (value V/ + V/coordination · glass BK/coordination + BL + BL/audit, newest `BL` · keyframes.js V/coordination). ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-11-02 08:54) → 0, except glass `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md` = glass commits `2edc9cc3b` / `9051506d1` (glass's O-118 owner-delegated rulings + "atlas adopts O-118"); neither names value.js or keyframes.js ⇒ out of scope. INBOX status-column UNREAD rows → 0. **No UNREAD mail in scope.**

**Residuals (named owners)**:
1. ESC-KFW3-d2-1: kf `README.md:834` oracle reads `display 350ms`; needs an orchestrator grant, then the `.d2` repair seat (CI GREEN → deploy-pages → §6 → probe ×2, pageerror 0 = G-KF3-8 arm → close + fresh check). Owner: orchestrator → `.d2` repair.
2. `useKeyframeOps.ts:45-46` drops the authored `<time>` unit (two-argument `reverseCSSTime`); a different concern from `.reg`. Owner: a seat granted on UIA-KF-177 (`.c4`'s concern).
3. Throw sites 2 → 2 after `.c2b` (one seam invariant + one demo refusal in `timelineEngine.ts`, via `importCSSToTimeline`'s throw-to-submission channel). Owner: KF.W7 / KF.W2 posture (L-5).
4. §0hb.3's X-W11 VERIFIED stamp waits on the deploy. Owner: Track A after `.d2`.

**Escalations**: none new (ESC-KFW3-d2-1 stands). **Adjacent edits**: none.

**Four-verb line**: IMPLEMENTED — **NOT advanced** (spec §State: *"gates green + bytes landed in the named execution site stamps this"*; kf CI is RED and the deploy/§6/probe acts are owed). VERIFIED — not this seat's to stamp. Row stays **PARTIAL**.

## Check 1 (pass 1 after Close 3; record sequence Check 4) — 2026-11-02 (fresh adversarial L-20, VERIFY-ONLY, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate kf `HEAD` = `origin/master` = `6a4556d3`; vjs `96ecc12db`. I authored none of the wave's bytes, its receipts, or Close 1–3. kf working tree: `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; never staged, not read as wave work).

**Verdict: NOT-CONFORMANT.** All 7 close gates (G-KF3-1…7) and every GREEN Close 3 claims reproduce at this seat. One RED remains on the close path that §0hd.5 orders: kf CI on `proof:readme-runs` (`README.md:834`), which skipped the deploy and left the §6 round-trip and the post-deploy probe ×2 unrun. The spec gives this RED no relief: it is not producer-owned and not routed to a later wave, and it is not a spec-named honest-RED id. ESC-KFW3-d2-1 is an escalation that awaits a grant; it is not a relief. Close 3 itself is PARTIAL. The LEDGER row is **not** promoted.

### Axis 1 — reproduction at this seat (kf `6a4556d3`; every heavy run through `guarded`, vitest `--maxWorkers=2`, strictly sequential)

| gate | reading |
| --- | --- |
| G-KF3-1 | ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` present — **GREEN** |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc` = ⟨`npm view … dist.shasum`⟩ `d488535c9bfc`; the unmodified probe (sha256 `77678a574d7c6b11`, last touched `c0078d962`) symlinked into the untarred mirror; ⟨`guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` both — **GREEN ×2** |
| G-KF3-3 | roster re-derived at HEAD (the spec's `git grep -l -E …` ∪ `git grep -l serialize-value`, `.test.ts`) → 19 files; ⟨`guarded -- npx vitest run <19> --maxWorkers=2`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both — **GREEN ×2** |
| G-KF3-4 | ⟨`git grep -n unserializable HEAD -- src demo \| wc -l`⟩ → `0`; fork defs ⟨`git grep -nE 'function serializeCssValue\|const serializeCssValue' HEAD -- src demo \| wc -l`⟩ → `0`; value's `./css` import → `serialize-value.ts:2` · `timelineEngine.ts:2`; seam importers → 15 (8 src census-1 + `css-text.ts` + 5 test census-1 + the invariant test); pin `package.json:71` `"4.1.0"`, ⟨`npm ls @mkbabb/value.js`⟩ → one `4.1.0` (glass deduped); ⟨`grep -c 'O-11 §B' INBOX.md`⟩ → `1` — **GREEN** |
| G-KF3-5 | one def `css-text.ts:33`; ⟨`git grep -n "value.js's OWN\|published 0.12.0 inverse" HEAD -- src test`⟩ → only `internal/leaves.ts:8`, which names the `/math` subpath and is outside the census-2 predicate — **GREEN** (discharge (b)) |
| G-KF3-6 | INBOX `O-11 §D2` carries `1.923e-1` · `6.930e-2` · `4.489e-2` · `DECLINED`; fence + invariant roster ⟨`guarded -- npx vitest run test/_root/public-surface.test.ts test/compile/easing-identity.test.ts test/compile/timing-function-names.test.ts test/orchestration/orchestration-api.test.ts test/compile/serialize-invariant.test.ts --maxWorkers=2`⟩ ×2 → `Test Files 5 passed (5)` · `Tests 130 passed (130)` both — **GREEN ×2** |
| G-KF3-7 | `evidence/W3/CALL-MAP.md` present (8 artefacts in `evidence/W3/`) — **GREEN** |
| UIA-KF-321 | ⟨`guarded -- npx vitest run test/demo/app/r4dock-share-fallback.test.ts --maxWorkers=2`⟩ ×3 → `Tests 1 passed (1)` ×3 — **GREEN** |
| kf `npm run check` | ×2 rc 0, ends `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` — **GREEN ×2** |
| kf vitest whole (lib + demo) | ⟨`guarded -- npx vitest run --maxWorkers=2`⟩ ×2 → `Test Files 295 passed \| 5 skipped (300)` · `Tests 2316 passed \| 2 expected fail \| 14 skipped (2332)` both — **GREEN ×2** |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ → `4.1.0` — **GREEN** |
| kf CI / `proof:readme-runs` | ⟨`gh run list -L 4`⟩ → `41462383452` ci push `6a4556d3` **failure**; `41463139545` deploy-pages **skipped**. Reproduced locally: ⟨`guarded --light -- node scripts/gates/surface/index.mjs`⟩ → rc 1, `proof:published-surface — PASS` (R-2 cured) then `proof:readme-runs — FAIL (1 finding(s))` · `snippet [beyond css › compileToEntry #20] … line 14: stated // => true but the dist computed false`; ⟨`sed -n 834p README.md`⟩ → `dialog.css.includes("display 350ms allow-discrete"); // => true` — **RED** |
| deploy · §6 round-trip · post-deploy probe ×2 (G-KF3-8 pageerror arm) | not run: blocked by CI (§0hd.5 order) — **OWED** |
| G-KF3-8 / G-KF3-9 | floors, not close gates (spec §Gates) |

**Count**: 14 claimed GREENs reproduced (G-KF3-1…7, the invariant + bypass mutant inside the G-KF3-6 run, UIA-KF-321, check, whole vitest, G9, R-2 `proof:published-surface`, and the 0-landed-wrong roster). 0 claimed GREENs failed. The one RED is the RED that Close 3 itself reports.

### Axes 2–9

- **(2) Bounds.** ⟨`git show --stat`⟩ for the RESUME 2 commits: `8ca052ad` touches 19 paths, all inside the `.c2b` row, and none outside it. `2f498f0e` touches `registry.ts` and `easing-identity.test.ts`. `f59d5259` touches `SharePopover.vue` only. `6a4556d3` touches `docs/published-surface.md` only. The earlier units (`c18a9bd9` `bc37f98f` `4ed542d5` `17a5c34d` `d4148cdc`) were adjudicated by Checks 1–3, and their stats are unchanged. ⟨`git log --format=%h 3e89df9f3^..HEAD -- scripts/dev/dev.sh`⟩ → empty, so dev.sh is untouched. **Clean.**
- **(3) Masking.** ⟨`git show <c> \| grep -nE '^\+.*(\.skip|try|catch|allowlist|setTimeout|\.todo)\|^-.*expect\('`⟩ over the 5 newest commits finds only three things. (i) A `try/catch` in `serialize-invariant.test.ts` that captures the raised error so it can be asserted (it is not around a defect). (ii) Three `expect(serializeCssValue(…))` lines in `8ca052ad` that were re-pointed to `serializeAdmittedValue(…)` with the same expected text. (iii) `d4148cdc`'s 350ms→0.35s ruled-spelling re-aim, already adjudicated as INFO. The seam `serialize-value.ts` raises one named `SerializeInvariantError` and has no fallback string. The demo `timelineEngine.ts` refuses through `importCSSToTimeline`'s existing throw channel. `SharePopover.vue` has no timer and no retry. **Clean.**
- **(4) Commit families.** L-7 holds: `.c2b` is ONE kf commit, plus its vjs INBOX commit (`db04c4f7c`). `.reg`, `.sp` and `.ps` are one commit each. **Clean.**
- **(5) E-3.** ⟨`git diff --stat 3e89df9f3^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/conformance`⟩ → empty. **Held.**
- **(6) Mail.** INBOX mtime is `Nov 2 08:54`. ⟨`find V/coordination kf/V/coordination -maxdepth 1 -newer INBOX.md`⟩ → 0. Glass commits since then are `9051506d1` and `2edc9cc3b` (BL O-118 cursor/INBOUND, out of scope, as Close 3 already judged). INBOX Status-column UNREAD rows → 0 (the 6 hits on the `| UNREAD |` regex are sweep prose and O-115…117 note text, not status cells). **Clean.**
- **(7) Four-verb line.** Close 3 left IMPLEMENTED not advanced and the row PARTIAL. That is lawful, because the §0hd.5 close path is unfinished. **Lawful.**
- **(8) Goal criterion at the bytes.** It is MET. kf owns no value serializer: `serialize-value.ts` wraps value's published one, and the demo imports value's directly. Exactly one `reverseAnimationShorthand` exists (`css-text.ts:33`), and its provider prose is true. The call-map spans both organs. `serializeCompiledValue` renders kf's `ValueTemplate`, which is a different concern, as named in `8ca052ad`.
- **(9) Published figures.** Close 3's figures reproduce byte for byte: 0/1548, 19/235, 5/130, 295|5 / 2316|2|14, and 15 seam importers.

### Axis 10 — honest-RED adjudication

**kf CI `proof:readme-runs` (README.md:834) → deploy → §6 → probe ×2: UNRELIEVED.** COHESION §0hd.5 (`:5077`) makes these acts the close path: *"kf CI GREEN → deploy-pages → the §6 round-trip → the post-deploy probe ×2 … → close and a fresh check"*. The RED fails each relief test:
- **Producer-owned?** No. Both the README and the oracle are kf's, and value 4.1.0 is MET.
- **Routed to a later wave by the spec?** No. No §Excluded or cross-edge row names it.
- **A spec-named honest-RED id?** No.

Attribution: the README line dates from 2026-07 (`4749e318`). It went false when KF.W13X `ca8c0433` (2026-10-08, UIA-KF-177 r4lib) ruled seconds-on-tie, which spells a programmatic 350 ms as `0.35s`. The RED was then masked behind R-2 `proof:published-surface` until KF.W3 `.ps` cured R-2. So the bytes that caused it are not this wave's, but the RED sits on this wave's ruled close path and no seat has discharged it. ESC-KFW3-d2-1 names an owner (orchestrator grant, then the `.d2` repair). That is an owner, not a relief.

G-KF3-8's pageerror arm is a FLOOR, not a gate, so it is not in the honest-RED set.

**Honest-RED set: none.**

### Successor conjuncts

KF.W3 is GATE-KEYED, and no wave's "Opens after" conjunct names it. ⟨`grep -nE '[Oo]pens after' X/*/waves/*.md \| grep KF.W3`⟩ → 0. KF-W10 §head carves KF.W3 out by name, and KF.W10 is CLOSED. The only downstream dependant is X-W11's G9 VERIFIED stamp (§0hb.3, Track A), which waits on this wave's deploy. That stamp is **lawfully blocked**. Its G9 conjunct (`npm ls` → 4.1.0) is GREEN, and its deploy conjunct is RED.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| HIGH | §0hd.5's close path stands unfinished. kf CI is RED on `proof:readme-runs`, so deploy-pages was skipped, and the §6 round-trip and the post-deploy probe ×2 were never run. The spec gives no relief. | CI `41462383452` failure / deploy `41463139545` skipped. This seat reproduced it locally (rc 1, `beyond css › compileToEntry #20 line 14`). `README.md:834` reads `display 350ms`. | Change `README.md:834` to the ruled spelling `display 0.35s allow-discrete`. This is the string the oracle asserts for the UIA-KF-177 spelling, and it is arguably within the §0bt adjacent-line rule for the seat that owns that concern. Otherwise it needs the ESC-KFW3-d2-1 grant. Then: CI GREEN ×1 → deploy-pages → §6 → probe ×2 (pageerror 0) → Close 4 → fresh check. |
| MINOR | `useKeyframeOps.ts:45-46` drops the authored `<time>` unit (Close 3 residual 2). | Close 3 §Residuals 2 | A seat granted on UIA-KF-177. |
| INFO | 2 → 2 throw sites after `.c2b` (the seam invariant and the demo refusal) | Close 3 §Residuals 3 | KF.W7 / KF.W2 posture (L-5) |
| INFO | `KeyframeTimeline.vue` in kf is dirty (`MM`). It belongs to a sibling seat (§0hb.1) and is untouched by the wave. All local runs above include that dirty file in the tree, as Close 3's did. | ⟨`git status --porcelain`⟩ | none (sibling's) |

**LEDGER**: the row is not promoted, and it stays PARTIAL. An event line is appended.

## Repair 1 (round 1 after Check 1 post-Close 3; record sequence Repair 3) — 2026-11-02 (REPAIR SEAT, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate at open: kf `HEAD` = `origin/master` = `6a4556d3`; vjs `2ed512a4d`. Crash-recovery: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; never staged) ⇒ **0 inherited paths**.

### Defect → cure → commit

| # | sev | defect | cure | commit |
| --- | --- | --- | --- | --- |
| 1 | HIGH | §0hd.5 close path unfinished: kf CI RED on `proof:readme-runs` (`README.md:834` `display 350ms allow-discrete`), deploy skipped, §6 + probe ×2 unrun | **Adjacent edit (§0bt)**: `README.md:834` → `dialog.css.includes("display 0.35s allow-discrete"); // => true` — the string the runnable-README oracle asserts for the UIA-KF-177 ruled spelling (the concern `.d` `d4148cdc` re-aimed in the browser oracle); same repo, same concern, one line, no assertion removed. Then push → CI → deploy-pages (§6 inside `scripts/pages-deploy.sh`) → probe ×2 | kf `fb87dbcd` (pushed `6a4556d3..fb87dbcd`, ordinary) |
| 2 | MINOR | `useKeyframeOps.ts:45-46` drops the authored `<time>` unit | **ESCALATED**, not cured: the file is outside the spec §B.2 writable set (its only grant was `.reg`'s "iff same concern", which Close 3 judged a different concern); not a one-command cure (needs the unit fields threaded through `reverseCSSTime` + its oracles). Owner: a seat granted on UIA-KF-177 | — |
| 3 | INFO | 2 → 2 throw sites | none (KF.W7 / KF.W2, L-5) | — |
| 4 | INFO | `KeyframeTimeline.vue` dirty | none (sibling's) | — |

**Adjacent edits**: kf `README.md:834` — the README runnable oracle string for the UIA-KF-177 ruled spelling (§0bt "the string an oracle asserts"); ESC-KFW3-d2-1 discharged by this edit.

### Gate re-reading (WRITE-THEN-MEASURE, settled bytes kf `fb87dbcd`)

| gate | reading |
| --- | --- |
| `proof:readme-runs` / `proof:publish` local | ⟨`guarded --light -- node scripts/gates/surface/index.mjs`⟩ ×2 → `proof:published-surface — PASS` · `proof:readme-runs — PASS: 20 snippet(s) executed against the built dist, 29 stated result(s) verified, the runnable set covers the taught roster (19).` · `proof:publish — PASS: package boundary, consumption, and runnable docs are green.` both; rc `0` — **GREEN ×2** |
| kf CI `41466910668` (push `fb87dbcd`) library job | every step `success` incl. `publish boundary` (log: `proof:readme-runs — PASS: 20 snippet(s) … 29 stated result(s)` · `proof:publish — PASS`); job conclusion reads `cancelled` (the repo's sibling-fail cancellation, the same shape as `41462383452`/`41450770277`) — **the HIGH's RED is CURED on CI** |
| kf CI `41466910668` demo job | `browser oracles` · `build demo` · `publish artifact boundary (post-build)` all `success` (the step that was RED in `41462383452` and `41450770277`) — then **`demo roster (report-all)` FAILURE**: `passed: 4/6` · `✗ failed: live-session, live-session-mobile` (S5 `visited 2/7`, `cube`/`amiga` `trigger=null (want "Controls")`; M1 sheet SCROLL/CLOSE; M2 dock SWITCH `trigger=null`). Excerpt: `docs/tranches/X/keyframes/evidence/W3/repair1-ci-41466910668-demo-roster.log.txt` |
| deploy-pages | ⟨`gh run list -L 2`⟩ → `41468193578 deploy-pages fb87dbcd completed skipped` (gated on ci success) — **BLOCKED** |
| §6 round-trip · post-deploy probe ×2 (G-KF3-8 pageerror arm) | **not run** — no deploy; no break-glass `workflow_dispatch` (it would bypass a RED gate) |

### Escalation ESC-KFW3-r1-1 (newly exposed RED, outside this wave's concern)

The README cure lets CI reach the `demo roster` step for the first time since at least `40567329956` (2026-10-27): every CI run from then through `41462383452` died earlier (`browser oracles` or `publish artifact boundary`). The roster's two REDs are demo dock/sheet UI behaviour (the control-tab projection after a scene switch, the touch sheet scroll/close), not parser consumption. **Measured attribution window**: at KF.W13X close6 (`keyframes/evidence/W13X/close6/e2e-r2.log.txt:87,102`) S5 was `PASS · visited 8` and M2 dock SWITCH was `PASS` (control-tab `"Curve" PROJECTS`); M1 sheet SCROLL was already RED there (the banked honest-RED SHEET-POSITION). So the S5 + M2 regression entered between W13X close6 (`389e31d2`) and `fb87dbcd`; candidates are OD19 (`cc1a8669`, glass 10.1.2 `5c48e3da`), KF.W3 `.c5` glass 10.1.3 `17a5c34d`, and `.c2b`/`.reg`/`.sp`. No local bisect was run: a local build would include the sibling's dirty `KeyframeTimeline.vue` and overwrite the shared `dist/`. A cure lies in demo dock/glass-consumption files outside spec §B.2, and glass is read-only. **Owner**: the orchestrator, who must rule an attribution bisect and the owning seat. The deploy, the §6 round-trip and the probe ×2 stay owed behind it.

**Verdict**: the HIGH's named RED (`README.md:834`) is **cured** (local ×2 + CI). The close path is **still blocked**, now on ESC-KFW3-r1-1. MINOR #2 is escalated. The row stays **PARTIAL**, and there is no Close 4 until CI is GREEN.

## Check 2 (pass 2 after Close 3; record sequence Check 5) — 2026-11-02 (fresh adversarial L-20, VERIFY-ONLY, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate kf `HEAD` = `origin/master` = `fb87dbcd`; vjs `bf3728be9`. I authored none of the wave's bytes, receipts, closes, Check 1 or Repair 1. kf tree: `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; never staged). vjs record/LEDGER clean ⇒ 0 inherited paths.

**Verdict: NOT-CONFORMANT.** Every claimed GREEN reproduces at `fb87dbcd`, including Repair 1's `proof:readme-runs` cure. The §0hd.5 close path is still unfinished. kf CI `41466910668` is RED on `demo roster (report-all)` (4/6; `live-session` S5 and `live-session-mobile` M1/M2), so deploy-pages `41468193578` was skipped, and the §6 round-trip and the post-deploy probe ×2 were never run. ESC-KFW3-r1-1 names an owner, the orchestrator, but the RED has no spec relief. The row is **not** promoted.

### Axis 1 — reproduction (kf `fb87dbcd`; every run through `guarded`, vitest `--maxWorkers=2`, strictly sequential)

| gate | reading |
| --- | --- |
| G-KF3-1 | ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` present — **GREEN** |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc` = ⟨`npm view … dist.shasum`⟩ `d488535c9bfc`. I symlinked the unmodified probe (sha256 `77678a574d7c6b11`) into the untarred scratch mirror. ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN`, rc 0 both runs — **GREEN ×2** |
| G-KF3-3 | Roster re-derived at HEAD (the spec's `git grep -l -E …` ∪ `git grep -l serialize-value`, `.test.ts`) → 19 files. ⟨`guarded -- npx vitest run <19> --maxWorkers=2`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both runs — **GREEN ×2** |
| G-KF3-4 | ⟨`git grep -n unserializable HEAD -- src demo \| wc -l`⟩ → `0`. Fork defs → `0`. Value's `./css` `serializeCssValue` imports → `serialize-value.ts:2` · `timelineEngine.ts:2`. Seam importers → `15`. Pin `package.json:71` `"4.1.0"`. ⟨`npm ls`⟩ → one `4.1.0` (glass 10.1.3 deduped). INBOX `O-11 §B` → `1` — **GREEN** |
| G-KF3-5 | One def at `css-text.ts:33`. ⟨`git grep -n "value.js's OWN\|published 0.12.0 inverse" HEAD -- src test`⟩ → only `internal/leaves.ts:8`, which concerns the `/math` subpath and is outside the census-2 predicate — **GREEN** (discharge (b)) |
| G-KF3-6 + boot fence + invariant/bypass mutant | The INBOX `O-11 §D2` row carries `1.923e-1` · `6.930e-2` · `4.489e-2` · `DECLINED`. ⟨`guarded -- npx vitest run test/_root/public-surface.test.ts test/compile/easing-identity.test.ts test/compile/timing-function-names.test.ts test/orchestration/orchestration-api.test.ts test/compile/serialize-invariant.test.ts --maxWorkers=2`⟩ ×2 → `Test Files 5 passed (5)` · `Tests 130 passed (130)` both runs — **GREEN ×2** |
| G-KF3-7 | `evidence/W3/CALL-MAP.md` present (9 files in `evidence/W3/`, incl. Repair 1's CI excerpt) — **GREEN** |
| `proof:publish` (R-2 + Repair 1's `proof:readme-runs`) | ⟨`guarded --light -- node scripts/gates/surface/index.mjs`⟩ ×2 → `proof:published-surface — PASS` · `proof:readme-runs — PASS: 20 snippet(s) … 29 stated result(s) verified` · `proof:publish — PASS` both runs — **GREEN ×2** |
| kf `npm run check` | ⟨`guarded --light -- npm run check`⟩ ×2 → rc 0, ends `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` — **GREEN ×2** |
| kf vitest whole (lib + demo) | ⟨`guarded --timeout 20 -- npx vitest run --maxWorkers=2`⟩ ×2 → `Test Files 295 passed \| 5 skipped (300)` · `Tests 2316 passed \| 2 expected fail \| 14 skipped (2332)` both runs — **GREEN ×2** |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ → `4.1.0` — **GREEN** |
| kf CI | ⟨`gh run view 41466910668 --json jobs`⟩ → `demo correctness (browser roster)` **failure**, `library gates` cancelled (sibling-fail). ⟨`--log-failed`⟩ → `passed: 4/6` · `✗ failed: live-session, live-session-mobile` (S5 `visited 2`; M1 sheet SCROLL/CLOSE; M2 dock SWITCH `trigger=null`). ⟨`gh run list -L 6`⟩ shows no newer run — **RED** |
| deploy-pages · §6 · post-deploy probe ×2 (G-KF3-8 pageerror arm) | `41468193578` **skipped**. Not run: blocked behind CI — **OWED** |

### Axes 2–9

- **(2) Bounds.** The only kf commit since Check 1 is `fb87dbcd`. ⟨`git show --stat`⟩ → `README.md | 2 +-`, a one-line oracle-string swap (`350ms` → `0.35s`). That is a lawful §0bt adjacent edit (the string an oracle asserts, same repo, same UIA-KF-177 spelling concern), and it is listed under the receipt's "Adjacent edits". vjs `bf3728be9` touches the record, the LEDGER (+1 line) and one evidence excerpt, all in-set. Earlier commits were adjudicated by Checks 1–4, and their stats are unchanged. ⟨`git log 3e89df9f3^..HEAD -- scripts/dev/dev.sh \| wc -l`⟩ → `0`. **Clean.**
- **(3) Masking.** The `fb87dbcd` diff is one `-`/`+` pair. No assertion was removed, the oracle was not edited, and there is no skip and no allowlist. Repair 1 refused a break-glass `workflow_dispatch` deploy, which is correct. **Clean.**
- **(4) Commit families.** One commit per meaning holds (README cure = 1 kf commit; record = 1 vjs commit). **Clean.**
- **(5) E-3.** ⟨`git diff --stat 3e89df9f3^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/conformance`⟩ → empty. **Held.**
- **(6) Mail.** INBOX mtime is `Nov 2 08:54`. Files newer than it across the swept paths: glass `BL/FORMATION-PROGRESS.md` and `BL/audit/INBOUND.md` only (commits `9051506d1` and `2edc9cc3b`, the O-118 rulings and cursor; they name neither value.js nor keyframes.js, so they are out of scope). INBOX status-cell UNREAD → 0. **Clean.**
- **(7) Four-verb line.** IMPLEMENTED is not advanced and the row stays PARTIAL. That is lawful while §0hd.5 is unfinished. **Lawful.**
- **(8) Goal criterion.** MET at the bytes, as Check 1 found. Nothing in that finding has moved (`fb87dbcd` is README-only).
- **(9) Published figures.** These reproduce: 0/1548, 19/235, 5/130, 15 seam importers, readme-runs 20 snippets / 29 results, roster 4/6.

### Axis 10 — honest-RED adjudication

**kf CI `demo roster` (S5 · M1 · M2) → deploy → §6 → probe ×2: UNRELIEVED.** §0hd.5 (`COHESION.md`) names *kf CI GREEN → deploy-pages → §6 → post-deploy probe ×2 → close* as this wave's close path. The RED fails each relief test:
- **Producer-owned?** Not shown. Glass is a candidate (`.c5` 10.1.3 · OD19 10.1.2), but no measurement attributes the RED to the producer.
- **Routed to a later wave by the spec?** No §Excluded row or cross-edge does so.
- **A spec-named honest-RED id?** No.

One part is narrower. M1 sheet SCROLL was already RED at W13X close6 as the banked honest-RED SHEET-POSITION, and that relief is another wave's, not KF.W3's. It does not relieve S5 or M2. Those regressed inside a window (`389e31d2`..`fb87dbcd`) that contains three of this wave's own commits: `.c5` `17a5c34d`, `.c2b` `8ca052ad` and `.sp` `f59d5259`. So the RED may be this wave's own. ESC-KFW3-r1-1 names an owner (the orchestrator: an attribution bisect, then the owning seat), which is an owner, not a relief.

G-KF3-8's pageerror arm is a FLOOR and is not in the set. **Honest-RED set: none.**

### Successor conjuncts

⟨`grep -nE '[Oo]pens after' X/*/waves/*.md \| grep KF.W3`⟩ → 5 hits, all citations inside prose or bounds cells. None is an "Opens after" conjunct on KF.W3, so no successor wave is gated on this row. The one dependant is X-W11's G9 VERIFIED stamp (§0hb.3, Track A). Its `npm ls` → 4.1.0 conjunct is GREEN; its deploy conjunct is RED. It is **lawfully blocked**.

**Count**: 12 claimed GREENs reproduced: G-KF3-1…7, the invariant + bypass mutant, `proof:publish` (incl. Repair 1's readme-runs cure), check, whole vitest and G9. 0 claimed GREENs failed.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| HIGH | §0hd.5's close path stands unfinished. kf CI is RED on `demo roster (report-all)` (4/6: `live-session` S5, `live-session-mobile` M1/M2), so deploy-pages was skipped, and §6 and the post-deploy probe ×2 (the G-KF3-8 pageerror arm) were never run. There is no spec relief, and the S5/M2 regression window holds three of this wave's own commits. | CI `41466910668` demo job failure; deploy `41468193578` skipped; `evidence/W3/repair1-ci-41466910668-demo-roster.log.txt`; ESC-KFW3-r1-1 | The orchestrator rules ESC-KFW3-r1-1: bisect `389e31d2`..`fb87dbcd` (candidates OD19 glass 10.1.2, `.c5` `17a5c34d`, `.c2b`, `.sp`) in a clean worktree, never the sibling-dirty tree. Then the owning seat cures at the root (a glass cause rides mail, not a frontend hack; M1 rides its banked SHEET-POSITION honest-RED only if the spec-of-record relief is extended to it by ruling). Then CI GREEN → deploy-pages → §6 → probe ×2 → Close 4 → fresh check. |
| MINOR | `useKeyframeOps.ts:45-46` drops the authored `<time>` unit. | Close 3 residual 2; Repair 1 escalation | A seat granted on UIA-KF-177. |
| INFO | 2 → 2 throw sites after `.c2b`. | Close 3 residual 3 | KF.W7 / KF.W2 posture (L-5) |
| INFO | `KeyframeTimeline.vue` in kf is dirty (sibling's), and all local runs include it. | ⟨`git status --porcelain`⟩ | none |

**LEDGER**: not promoted; the row stays PARTIAL; an event line is appended.

## Repair 2 (round 2 after Check 2 post-Close 3; record sequence Repair 4) — 2026-11-02 (REPAIR SEAT, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate at open: kf `HEAD` = `origin/master` = `fb87dbcd`; vjs `78837ac70`. Crash-recovery: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged) ⇒ **0 inherited paths**. No kf product byte was written by this seat.

### Defect → cure → commit

| # | sev | defect | disposition | commit |
| --- | --- | --- | --- | --- |
| 1 | HIGH | kf CI `demo roster` RED (S5 · M1 · M2) blocks deploy → §6 → probe ×2 | **ATTRIBUTED, NOT KF.W3's — ESCALATED** (the cure lies outside §B.2; see the attribution below). The S5/M2 cause is in the window, but it is not in any KF.W3 commit | vjs (this record + evidence) |
| 2 | MINOR | `useKeyframeOps.ts:45-46` drops the authored `<time>` unit | **ESCALATED, re-stated**: the file is outside §B.2, and it is not a one-command cure (the unit fields have to be threaded through `reverseCSSTime` and its oracles). Owner: a seat granted on UIA-KF-177 | — |
| 3 | INFO | 2 → 2 throw sites | none (KF.W7 / KF.W2, L-5) | — |
| 4 | INFO | `KeyframeTimeline.vue` dirty | none (sibling's) | — |

### ESC-KFW3-r1-1 attribution (the bisect Check 2 asked for, run at its decisive endpoint)

**Pre-wave endpoint, measured.** kf `5c48e3da` is the last commit before KF.W3's first byte (`c18a9bd9`). It carries glass **10.1.2** (OD19) and value **4.0.0**, so it excludes `.c1`, `.c5` (glass 10.1.3), `.c2b`, `.reg`, `.sp`, `.ps`, `.d` and Repair 1. Method: a clean detached worktree (never the sibling-dirty tree) and `npm ci` (rc 0). Then ⟨`KF_PLAYWRIGHT_DIR=<value.js> guarded --timeout 25 -- npm run demo:correctness -- --only=live-session,live-session-mobile --timeout=600`⟩ ×2 → both runs `passed: 0/2` · `✗ failed: live-session, live-session-mobile`, rc 1. The REDs are byte-for-byte the CI `41466910668` REDs:
- S5: `visited 2`, `cube: ENTRY red — … trigger=null (want "Controls")`.
- M1 sheet SCROLL: `scrollTop=0; 702px content in a 85px body`.
- M1 sheet CLOSE: `closed=false, --detent-t=0`.
- M2 dock SWITCH: `machine=easing, trigger=null`.

The excerpt for both runs is at `docs/tranches/X/keyframes/evidence/W3/repair2-attribution-5c48e3da.log.txt`. The worktree was removed after the runs, and no browser or roster process was left (`ps` → 0). **KF.W3's own commits (incl. glass 10.1.3) are exonerated: the RED predates the wave.**

**Root cause (S5 + M2), read from the bytes.** Both oracles read `document.querySelector('[data-dock-surface-item][aria-checked="true"]')?.getAttribute("aria-label")` with the dock at rest (`scripts/observe/demo/live-session.mjs:910,958`; `live-session-mobile.mjs` twin).
- At W13X close6 `389e31d2`, `ChromeDock.vue:510-513` rendered the surface items as **dock-level** buttons carrying `data-selected` and `aria-label="item.title"`, and S5/M2 were GREEN.
- **OD19-K6 `13762e6e`** (2026-10-19) moved them into a glass `DropdownMenu` (`ChromeDock.vue:561-586` at `5c48e3da`). Those rows mount only while the menu is open, and they carry no `aria-label`.
- OD19 repair 1 `2457f241` then re-spelled the probe selector (`[data-selected]` → `[aria-checked="true"]`) but never re-aimed the at-rest read. So the oracle has been unsatisfiable since `13762e6e`.

CI never reached the `demo roster` step from 2026-10-27 through Repair 1 (Repair 1 §ESC), so this went unseen. **M1 SCROLL/CLOSE** are also RED at `5c48e3da`. SCROLL is the banked SHEET-POSITION honest-RED. CLOSE was GREEN at close6, so it too regressed before the wave, inside OD19.

**Why no cure lands here.** The cure is either the probe oracle (`scripts/observe/demo/live-session*.mjs`) re-aimed at the at-rest surface fact (the `data-dock-surface-trigger` face's `data-surface`), or a dock change. Neither is in KF.W3's §B.2 writable set, and neither is KF.W3's concern (parser consumption). Either is the OD19 dock/probe owner's. §0bt does not stretch to it: it is a different concern, and the files belong to another unit. An edit here would also be an oracle rewrite made to get to green, which is a HIGH. M1 CLOSE is a glass-Drawer or kf-sheet regression, also OD19's.

### Gate re-reading

| gate | reading |
| --- | --- |
| roster live-session + live-session-mobile @ `5c48e3da` (pre-wave) | ×2 → `passed: 0/2`, identical REDs to CI — **RED predates KF.W3** |
| kf CI / deploy-pages / §6 / probe ×2 | unchanged from Check 2: CI `41466910668` RED, deploy `41468193578` skipped, §6 + probe ×2 **OWED**. No kf byte moved, so no gate re-run is owed (every G-KF3-* GREEN stands as Check 2 reproduced it at `fb87dbcd`) |

**Verdict.** The HIGH is **escalated with a measured attribution**: ESC-KFW3-r1-1 → the OD19 dock/probe owner (S5 + M2 = `13762e6e` probe-oracle staleness; M1 CLOSE = an OD19-window sheet regression; M1 SCROLL = the banked SHEET-POSITION). KF.W3's close path stays blocked behind that owner's cure, then CI GREEN → deploy-pages → §6 → probe ×2 → Close 4. The MINOR stays escalated. The row stays **PARTIAL**.

## Check 3 (pass 3 after Close 3; record sequence Check 6) — 2026-11-02 (fresh adversarial L-20, VERIFY-ONLY, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate: kf `HEAD` = `origin/master` = `fb87dbcd` (⟨`git ls-remote origin master`⟩ → `fb87dbcd26b9…`; no kf commit since Check 2); vjs `df1759e91`. I authored none of the wave's bytes, closes, checks or repairs. kf tree: `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; never staged). vjs record/LEDGER clean ⇒ 0 inherited paths.

**Verdict: NOT-CONFORMANT.** Every claimed GREEN reproduces at `fb87dbcd`. Repair 2's attribution also holds at the bytes: the demo-roster RED predates the wave, so KF.W3's commits are exonerated. But §0hd.5's ruled close order (*kf CI GREEN → deploy-pages → §6 → probe ×2 → close*) is still unfinished, and the RED blocking it has no relief under axis 10. The owner Repair 2 named is a **closed** unit, OD19, CLOSED 2026-10-21, and OD19's own `CLOSE.md:48` books this exact probe staleness as a *"residual outside the set … a script fix, not a product row"* with no owner. The row is **not** promoted.

### Axis 1 — reproduction (kf `fb87dbcd`; every run through `guarded`, vitest `--maxWorkers=2`, strictly sequential)

| gate | reading |
| --- | --- |
| G-KF3-1 | ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` present (10 files in `evidence/W3/`) — **GREEN** |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc` = ⟨`npm view … dist.shasum`⟩ `d488535c9bfc`. The unmodified probe (sha256 `77678a574d7c6b11`) was symlinked into the untarred scratch mirror, then ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.` both runs — **GREEN ×2** |
| G-KF3-3 | Roster re-derived at HEAD (the spec's `git grep -l -E '@mkbabb/value\.js/css\|parseCss(Color\|Scalar\|Values)\|parseTimingFunction\|serializeCssValue\|reverseAnimationShorthand\|cssIdent' HEAD -- test/` ∪ `git grep -l serialize-value HEAD -- test/`, `.test.ts`) → 19. ⟨`guarded -- npx vitest run <19> --maxWorkers=2`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both — **GREEN ×2** |
| G-KF3-4 | `unserializable` in src+demo → `0`. Fork defs → `0`. `@mkbabb/value.js/css` `serializeCssValue` imports → `serialize-value.ts:2` · `timelineEngine.ts:2`. Seam importers → `15`. Pin `package.json:71` `"4.1.0"`. ⟨`npm ls @mkbabb/value.js`⟩ → `4.1.0` (glass's copy deduped). INBOX `O-11 §B` → `1` — **GREEN** |
| G-KF3-5 | One def, `css-text.ts:33`. ⟨`git grep -n "value.js's OWN\|published 0.12.0 inverse" HEAD -- src test`⟩ → `internal/leaves.ts:8` only (the `/math` subpath; outside the census-2 predicate) — **GREEN** (discharge (b)) |
| G-KF3-6 + boot fence + invariant/bypass mutant | The INBOX `O-11 §D2` row (I-77) carries `1.923e-1` · `6.930e-2` · `4.489e-2` · `DECLINED`. The 5-file fence run ×2 → `Test Files 5 passed (5)` · `Tests 130 passed (130)` both — **GREEN ×2** |
| G-KF3-7 | `evidence/W3/CALL-MAP.md` present — **GREEN** |
| UIA-KF-321 | ⟨`guarded -- npx vitest run test/demo/app/r4dock-share-fallback.test.ts --maxWorkers=2`⟩ ×3 → `Tests 1 passed (1)` ×3 — **GREEN ×3** |
| `proof:publish` (incl. readme-runs) | ⟨`guarded --light -- node scripts/gates/surface/index.mjs`⟩ run 1 → `proof:readme-runs — PASS: 20 snippet(s) … 29 stated result(s) verified` · `proof:publish — PASS`, rc 0, both runs — **GREEN ×2** |
| kf CI | ⟨`gh run view 41466910668 --json jobs`⟩ → `demo correctness (browser roster)` **failure**, `library gates` cancelled (sibling-fail). ⟨`--log-failed`⟩ → `passed: 4/6` · `✗ failed: live-session, live-session-mobile`. ⟨`gh run list -L 6`⟩ shows no newer run — **RED** |
| deploy-pages · §6 · post-deploy probe ×2 (G-KF3-8 pageerror arm) | `41468193578` **skipped**; not run, blocked behind CI — **OWED** |
| kf `npm run check` | ⟨`guarded --light -- npm run check`⟩ ×2 → rc 0, ends `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` — **GREEN ×2** |
| kf vitest whole (lib + demo) | ⟨`guarded --timeout 25 -- npx vitest run --maxWorkers=2`⟩ ×2 → `Test Files 295 passed \| 5 skipped (300)` · `Tests 2316 passed \| 2 expected fail \| 14 skipped (2332)` both runs — **GREEN ×2** |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ → `4.1.0` — **GREEN** |

### Axes 2–9

- **(2) Bounds.** No kf commit since Check 2 (`origin/master` = `fb87dbcd`). The only commit since Check 2 is vjs `df1759e91`. ⟨`git show --stat`⟩ → record +41 · LEDGER +1 · `evidence/W3/repair2-attribution-5c48e3da.log.txt` +26, all in-set. Repair 2 wrote no kf byte, and its bisect ran in a clean detached worktree that it then removed. ⟨`git log --oneline 3e89df9f3^..HEAD -- scripts/dev/dev.sh \| wc -l`⟩ → `0`. **Clean.**
- **(3) Masking.** Nothing changed in the diff. Repair 2 explicitly refused to re-aim the probe oracle to get to green, which is correct: that edit is outside the set and of a different concern. **Clean.**
- **(4) Commit families.** One record commit per meaning. **Clean.**
- **(5) E-3.** ⟨`git diff --stat 3e89df9f3^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/conformance`⟩ → empty. **Held.**
- **(6) Mail.** INBOX mtime is `Nov 2 08:54`. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value V/ + V/coordination · glass BK/coordination + BL + BL/audit (BL is the newest) · kf V/coordination → glass `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md` only. The added lines of glass commits `2edc9cc3b` / `9051506d1` / `e410b7f21` contain `value.js\|keyframes` → `0` hits, so they are out of scope. The `UNREAD` tokens inside INBOX table rows are all prose ("was UNREAD", sweep notes); no status cell reads UNREAD. **Clean.**
- **(7) Four-verb line.** IMPLEMENTED is not advanced and the row stays PARTIAL. That is lawful while §0hd.5 is unfinished.
- **(8) Goal criterion.** MET at the bytes. The R1 call-map spans both organs (`CALL-MAP.md`). There is exactly one `serializeCssValue` provider reachable from the emit tier (value's `./css`, through the `serialize-value.ts` seam; 0 kf fork defs). There is exactly one `reverseAnimationShorthand` (`css-text.ts:33`), and its provider prose is true (discharge (b)).
- **(9) Published figures.** These reproduce: 0/1548, 19/235, 5/130, 15 seam importers, readme-runs 20 snippets / 29 results, roster 4/6, and the vitest whole figures in the table above.

### Axis 10 — honest-RED adjudication

**Repair 2's attribution, re-verified at the bytes.**
- ⟨`git merge-base --is-ancestor 13762e6e 5c48e3da`⟩ and ⟨`… 5c48e3da c18a9bd9`⟩ both hold, so OD19-K6 predates KF.W3's first byte.
- The probe reads `[data-dock-surface-item][aria-checked="true"]` → `aria-label` at rest (`scripts/observe/demo/live-session.mjs:910,958`).
- At HEAD, `ChromeDock.vue:574`'s `data-dock-surface-item` sits on a `DropdownMenuRadioItem` inside `DropdownMenuContent`. That item mounts only while the menu is open and carries no `aria-label`. At `389e31d2:ChromeDock.vue:510-513` the item was a dock-level button with `:aria-label="item.title"`.
- **The S5/M2 RED is OD19's probe staleness, not this wave's.** I did not repeat the 2×-run pre-wave roster. It is a heavy browser run whose result the byte reading already settles, and Repair 2's banked log stands.

**The close-path RED (kf CI demo roster S5 · M1 · M2 → deploy → §6 → probe ×2): still UNRELIEVED.**
- **Producer-owned?** No. The S5/M2 root is a kf probe script, not glass.
- **Routed to a later wave by the spec?** No §Excluded row, cross-edge or lock routes the demo roster.
- **A spec-named honest-RED id?** No. M1 SCROLL alone matches the banked SHEET-POSITION honest-RED, and that relief is W13X's, not KF.W3's.
- **The owner named for it does not exist.** X-OD19 is **CLOSED 2026-10-21** (LEDGER `:119`). `OD19/CLOSE.md:48` books this exact staleness (*"`scripts/lib/demo-driver.mjs:941` and `scripts/observe/demo/live-session{,-mobile}.mjs` still read `[data-dock-surface-item][data-selected]` (a script fix, not a product row)"*) as a residual outside its set, with no successor. ⟨`grep -rn ESC-KFW3-r1-1 COHESION.md INBOX.md`⟩ → `0`, so no ruling has landed.
- **Consequence.** The RED is not KF.W3's fault, but it is not relieved either. §0hd.5 binds the close to CI GREEN, and only an orchestrator act clears that: a grant to a seat for the script fix, or a dated ruling that relieves the CI conjunct.

G-KF3-8's pageerror arm is a FLOOR and is outside the close set. **Honest-RED set: none.**

### Successor conjuncts

⟨`grep -nE '[Oo]pens after' X/*/waves/*.md \| grep KF.W3`⟩ → 5 hits: KF-W1 `:415` `:461`, KF-W4 `:55`, KF-W7 `:61` and KF-W10 `:47`. Each is a citation inside a bounds, provenance or carve-out cell. KF-W10 `:47` states its *"Opens after"* is *"not widened"* by KF.W3. None is a conjunct on KF.W3, so **no successor wave is gated on this row**. The one dependant is X-W11 G9's VERIFIED stamp (§0hb.3, Track A). Its `npm ls` → 4.1.0 conjunct is GREEN and its deploy conjunct is RED, so it is **lawfully blocked**.

**Count**: 13 claimed GREENs reproduced: G-KF3-1…7, the invariant + bypass mutant, UIA-KF-321, `proof:publish` (incl. readme-runs), check, whole vitest and G9. 0 claimed GREENs failed.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| HIGH | §0hd.5's ruled close order is unfinished. kf CI is RED on `demo roster (report-all)` (4/6: `live-session` S5, `live-session-mobile` M1/M2), so deploy-pages was skipped, and §6 and the post-deploy probe ×2 (the G-KF3-8 pageerror arm) were never run. KF.W3 is now exonerated by measurement (the RED predates the wave: OD19-K6 `13762e6e` probe-oracle staleness). The RED is still **unrelieved**: no spec routing, no honest-RED id, not producer-owned. Its named owner, OD19, is a **closed** unit that booked the very script fix as an unowned residual (`OD19/CLOSE.md:48`). | CI `41466910668` demo job failure; deploy `41468193578` skipped; `evidence/W3/repair2-attribution-5c48e3da.log.txt`; `ChromeDock.vue:574` (radio item inside `DropdownMenuContent`, no `aria-label`) vs `389e31d2:ChromeDock.vue:510-513`; `live-session.mjs:910,958`; LEDGER `:119` X-OD19 CLOSED; ⟨`grep ESC-KFW3-r1-1 COHESION.md`⟩ → 0 | Orchestrator act on ESC-KFW3-r1-1, either way: **(a)** grant a seat the script-fix concern OD19 left unowned. It would re-aim `scripts/observe/demo/live-session{,-mobile}.mjs` and `scripts/lib/demo-driver.mjs:941` at the at-rest surface fact (the `data-dock-surface-trigger` face's `data-surface`), never by loosening the assertion. The M1 CLOSE sheet regression gets the same grant or its own root cure. Then CI GREEN → deploy-pages → §6 → probe ×2 → Close 4 → fresh check. **(b)** A dated COHESION ruling that relieves §0hd.5's CI conjunct for this pre-wave RED by name, then deploy by the ruled path. |
| MINOR | `useKeyframeOps.ts:45-46` drops the authored `<time>` unit. | Close 3 residual 2; Repairs 1–2 escalation | A seat granted on UIA-KF-177. |
| INFO | 2 → 2 throw sites after `.c2b`. | Close 3 residual 3 | KF.W7 / KF.W2 posture (L-5) |
| INFO | `KeyframeTimeline.vue` in kf is dirty (sibling's), and all local runs include it. | ⟨`git status --porcelain`⟩ | none |

**LEDGER**: not promoted; the row stays PARTIAL; an event line is appended.

## RESUME 3 — Open (2026-11-02, seat 0, `claude-opus-5-5`, on COHESION §0he)

SERVED MODEL: claude-opus-5-5.

**Mode**: RESUME (third). Ledger row 66 status before: `PARTIAL — RESUME 2 Close 2 …` (not CLOSED), and this record exists, so this is a resume. Authority: COHESION §0he (2026-11-02, `665e4d604`, read whole). §0he.1 rules ESC-KFW3-r1-1: attribution bisect first, then the oracle / kf / glass arm by attribution, with M1 SHEET-POSITION relief only under a producer O-id and no CI step skipped. §0he.2 grants UIA-KF-177. §0he.3 is §0hd.5's close order, then X-W11's VERIFIED stamp. §0he.4 books the keyframes letters for a post-W3 minor, outside this wave. §0hd and §0hb stand.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only. That path is the sibling's (§0hb.1) and is never staged, so **0 inherited paths** sit in any owed unit's set. vjs record/LEDGER/INBOX: clean at open. kf `HEAD` = `origin/master` = `fb87dbcd` (⟨`git ls-remote origin master`⟩ → `fb87dbcd26b9`), and no kf commit has landed since Check 3.

**Already done (commits exist, never re-dispatched)**:
- `.a` · `.b` (vjs evidence/W3)
- `.c1` `c18a9bd9` · `.c3` `bc37f98f` · `.c4` `4ed542d5` · `.c5` `17a5c34d` (glass 10.1.3)
- `.d` oracle `d4148cdc`
- `.c2b` `8ca052ad` · `.reg` `2f498f0e` · `.sp` `f59d5259` · `.ps` `6a4556d3`
- Repair 1 README `fb87dbcd`

G9 ⟨`npm ls @mkbabb/value.js`⟩ → `4.1.0` (Check 3). `.d2` is superseded by `.d3`. ⟨`git log --oneline`⟩ shows no `.bis` or `.u177` commit.

**Preconditions**: RC-P(4.1.0) TRUE was banked at this record's Open and reproduced ×2 by Check 3 (G-KF3-2 `TOTAL 0 throws / 1548 calls`). The owed units' only new precondition is the §0he ruling, which exists (`665e4d604`). **MET.**

**E13 Step-0 sweep**: 9 paths. Value: V/ + V/coordination. Glass: BK/coordination + BL + BL/audit (⟨`ls -dt`⟩ → `BL BK BJ`). kf: V/coordination. Atlas: P/coordination + U + U/coordination (newest `U`). ⟨`find -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 08:54) returned files on two repos:
- **Glass.** `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md`, from commits `2edc9cc3b` `9051506d1` `e410b7f21` (O-118 to atlas, BL cursor). They name value.js/keyframes in 0 lines: out of scope.
- **Atlas.** `U/STATE.md` + `U/RULINGS-2026-09-23.md`. `STATE.md:329-331` record the atlas U/B7 keyframes letter (`U/build/KEYFRAMES-LETTER-2026-11-02.md`: K-1, KF-1..KF-3), delivered to this session and accepted at §0he.4 but **never rowed**. It is **rowed as I-79** (UNREAD; routed by §0he.4 to the post-KF.W3 keyframes minor, outside KF.W3's units), and a dated sweep line is appended.

**UNREAD in KF.W3 scope: 0.**

### RESUME 3 — Baseline (READ-ONLY, kf `fb87dbcd`, value.js `665e4d604`)

Only the owed units' gates are read. Every other gate cites Check 3's ×2 readings: 13/13 claimed GREENs reproduced.

| gate | BEFORE | reading |
| --- | --- | --- |
| kf CI demo roster (`.bis`) | **RED** | ⟨`gh run view 41466910668 --json jobs`⟩ → `demo correctness (browser roster) failure` · `library gates … cancelled`. Check 3's `--log-failed` → `passed: 4/6` · `✗ failed: live-session, live-session-mobile` (S5; M1/M2). Pre-wave reproduction at `5c48e3da` ×2 is Repair 2's banked log `evidence/W3/repair2-attribution-5c48e3da.log.txt`. The two attribution readings still disagree (§0he.1), so the bisect is owed. Not re-run here: it is a heavy browser run and it is the unit's own act |
| deploy-pages · §6 · post-deploy probe ×2 (`.d3`) | **skipped / owed** | ⟨`gh run list -L 4`⟩ → `41468193578 deploy-pages skipped` (behind CI `41466910668`) |
| UIA-KF-177 residual (`.u177`) | **RED at the bytes** | ⟨`sed -n 44-46p demo/components/instrument/keyframes/composables/useKeyframeOps.ts`⟩ → `stored.duration = reverseCSSTime(animation.options.duration);` · `stored.delay = reverseCSSTime(animation.options.delay);` (the one-argument call drops the authored unit). Signature ⟨`git grep -n "export const reverseCSSTime" HEAD -- src`⟩ → `css-text.ts:22 (milliseconds: number, unit?: CssTimeUnit)`. Sibling sites already thread the unit: `css-text.ts:36` · `emit/entry.ts:402,418` · `format/options.ts:46`. No round-trip falsifier exists yet for the demo-store path (its test importers are `test/demo/scenes/square-editor-seam.test.ts` and `test/engine/adopt-compiled-renderer.test.ts`) |
| G9 (`npm ls` → 4.1.0) | GREEN | cited (Check 3) |

**greenBeforeCure**: none.

### RESUME 3 — Unit plan

Owed: `[.bis] → [.u177] → [.d3]`. §0he orders `.bis ∥ .u177 → .d3`. The concurrency cap is 1, so each group is a singleton. `.bis` and `.u177` share no modify path: `.bis` writes scripts/dock/sheet, `.u177` writes `useKeyframeOps.ts` + tests. `.d3` needs both. All seats `opus` (owner: Opus only).

Machine law:
- Every run goes through `guarded`. vitest `--maxWorkers=2`, playwright `--workers=1`.
- Browser runs never use `--light`. Roster/probe runs take one browser per run.
- `KeyframeTimeline.vue` is never staged, restored or edited, and never enters the bisect worktree.

| unit | sections | writable | gates | locks |
| --- | --- | --- | --- | --- |
| `.bis` attribution bisect + cure by attribution | §0he.1 · §0hd.5 · Check 3 Register HIGH | **bisect:** a clean detached kf worktree under a durable non-/tmp dir (removed after) with its own `npm ci` + `dist/`. **cure, by arm:** *(oracle)* kf `scripts/observe/demo/live-session.mjs` · `scripts/observe/demo/live-session-mobile.mjs` · `scripts/lib/demo-driver.mjs`; *(kf product)* kf `demo/app/dock/**` + the kf demo sheet files the attribution names (never `KeyframeTimeline.vue`); *(glass)* vjs `docs/tranches/V/coordination/INBOX.md` (an O-n relay row; the orchestrator delivers). Always: vjs `docs/tranches/X/keyframes/evidence/W3/` (the bisect log) | roster ×2 per bisect step · after the cure, the roster (`live-session`, `live-session-mobile` + the 4 GREEN) ×2 locally · kf check ×2 | One commit per meaning. The assertion is never loosened; no skip, no allowlist, no copied producer selector. Glass is read-only. M1 SHEET-POSITION relief only under a cited producer O-id |
| `.u177` UIA-KF-177 unit threading | §0he.2 · Close 3 residual 2 | kf `demo/components/instrument/keyframes/composables/useKeyframeOps.ts` · its reverseCSSTime oracles (`test/compile/uia-kf-177-{css-time,authored-unit}.test.ts`, re-aim only) · one new round-trip falsifier test under `test/demo/` | the round-trip falsifier RED before → GREEN ×2 · uia-kf-177 oracles ×2 · kf check ×2 · vitest whole ×2 | one commit; no compat shim; never weaken an oracle |
| `.d3` ship + close | §0he.3 · §0hd.5 · §0hb.3 · G-KF3-8 | kf push only (an unexpected RED outside the wave's concern = ESCALATE) · vjs `evidence/W3/CLOSE-RECEIPTS.md` (addendum) · this record · LEDGER | kf CI GREEN (both jobs) · deploy-pages success · §6 round-trip (`scripts/pages-deploy.sh:109-140`) · post-deploy probe ×2 of `https://keyframes.babb.dev` (pageerror 0) · G9 → 4.1.0 | ordinary push, never force; then close + fresh check; then X-W11 VERIFIED (§0hb.3, Track A's) |

#### Briefs (the dispatched text)

- **`.bis`** (§0he.1): bisect the kf CI roster RED (live-session S5, live-session-mobile M1/M2).
  1. Work in a CLEAN detached kf worktree in a durable non-/tmp dir, with its own `npm ci` + `dist/`. Never use the shared `dist/` or the dirty `KeyframeTimeline.vue`.
  2. Run the roster ×2 at each step, in order: `389e31d2` → `cc1a8669` → `5c48e3da` → `13762e6e` → `17a5c34d` → `8ca052ad`/`2f498f0e`/`f59d5259` → `fb87dbcd`.
  3. Bank the log in evidence/W3.
  4. Cure by attribution:
     - **Stale oracle:** re-aim `live-session{,-mobile}.mjs` + `demo-driver.mjs:941` at the trigger face's at-rest `data-surface`. Never loosen.
     - **kf product:** a root cure in the dock/sheet files.
     - **Glass:** A/B against the prior pin, then an INBOX relay row with the numbers. Hold under the O-id.
     - **M1 SHEET-POSITION:** keeps its relief only with a producer O-id; otherwise cure it.
  5. Roster ×2 GREEN, check ×2. Remove the worktree.
- **`.u177`** (§0he.2):
  1. Write a round-trip falsifier first (authored `0.35s`/`350ms` duration and delay through the demo store path `useKeyframeOps` → stored options → re-emit; RED at baseline).
  2. Thread `animation.options.durationUnit`/`delayUnit` into the two-argument `reverseCSSTime` at `useKeyframeOps.ts:45-46`. Re-aim (never weaken) the uia-kf-177 oracles if their asserted text moves.
  3. Falsifier GREEN ×2, oracles ×2, check ×2, vitest whole ×2. One commit.
- **`.d3`** (§0he.3 / §0hd.5):
  1. Push kf `master` (ordinary push).
  2. kf CI GREEN on both jobs. Any new RED outside the concern: ESCALATE with the log.
  3. deploy-pages succeeds; run the §6 round-trip (`scripts/pages-deploy.sh:109-140`).
  4. Post-deploy probe ×2 of `https://keyframes.babb.dev` (one browser, `--workers=1`, pageerror 0 on `/#/easing` + `/#/spring` = the G-KF3-8 arm).
  5. G9 → 4.1.0.
  6. Write the CLOSE-RECEIPTS addendum, a `## Close 4`, and the LEDGER cells + an event line, then hand to a fresh check.

## RESUME 3 — Unit receipts

### KF.W3.bis

SERVED MODEL: claude-opus-5-5. Sections: COHESION §0he.1 (ESC-KFW3-r1-1) · §0hd.5 · Check 3 Register HIGH. **Status: DONE** (the stale-oracle arm, both halves; no kf product byte, no glass row).

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged, never in the worktree). The vjs evidence/W3, record and INBOX were clean ⇒ **0 inherited paths**.

**Act 1: the bisect** (§0he.1, in a clean worktree).
- Worktree: ⟨`git worktree add --detach /Users/mkbabb/Programming/.kf-bis-wt 389e31d2`⟩. It is durable and outside /tmp.
- Per step: `git checkout --detach <c>`; `guarded npm ci` when the lock changed; `rm -rf dist`; `guarded npm run gh-pages`, so each step has its own `dist/`.
- Then ⟨`KF_PLAYWRIGHT_DIR=<value.js> guarded --timeout 25 -- npm run demo:correctness -- --only=live-session,live-session-mobile --timeout=600`⟩ ×2.
- The ruled order ran in full. I added two steps: `13762e6e^`, the OD19-K6 parent, and the glass A/B pair `8876e82e^` → `8876e82e`.
- The bank is `evidence/W3/bis-bisect-roster.log.txt`: every ✗ and REPORT line per run, plus a chronological summary read by `grep -c` from the raw runs. The runner is `evidence/W3/bis-step.sh`.

Chronological readings (1 = the clause's ✓ line present; every step identical across its 2 runs; every step `passed: 0/2`):

| step (glass) | S5 | M2 SWITCH | M1 OPEN | M1 SCROLL | M1 CLOSE | B7 |
| --- | --- | --- | --- | --- | --- | --- |
| `389e31d2` (10.1.0) | 1 | 1 | 0 | 0 | 1 | RED |
| `13762e6e^` (10.1.0) | 1 | 1 | 0 | 0 | 1 | RED |
| **`13762e6e`** OD19-K6 (10.1.0) | **0** | **0** | 0 | 0 | 1 | — |
| `8876e82e^` (10.1.0) | 0 | 0 | 0 | 0 | 1 | — |
| **`8876e82e`** (10.1.1) | 0 | 0 | **1** | 0 | **0** | — |
| `cc1a8669` (10.1.1) · `5c48e3da` (10.1.2) · `17a5c34d` `8ca052ad` `2f498f0e` `f59d5259` `fb87dbcd` (10.1.3) | 0 | 0 | 1 | 0 | 0 | — |

The ruled order is not chronological: `13762e6e` (10-19) predates `cc1a8669` (10-27). The table re-sorts it. B7 is the banked honest-RED B7 SPECULAR-REST. It measured the dock-level `dock-icon-button`s that `13762e6e` removed, and it is outside this unit.

**Act 2: attribution.** Both halves are stale oracles. Neither is a kf product regression, a glass regression, or KF.W3's.
- **S5 + M2 = `13762e6e` (OD19-K6).** Both turn GREEN → RED across one kf edge, with glass at 10.1.0 on both sides. Repair 2's reading holds, and the two §0he.1 readings reconcile: S5/M2 *were* GREEN at `389e31d2`, and `13762e6e` is where they broke.
  - Mechanism: the four dock-level surface items moved into a glass `DropdownMenu`. Its rows mount only while the menu is open, and they carry no `aria-label`.
  - OD19 repair 1 `2457f241` re-spelled the selector but kept the at-rest read.
  - So `demo-driver.mjs` `navToScene` (brief anchor `:941`, true bytes `:936-945`), S5's `assertEntry`/`dockSwitchTo` (`live-session.mjs:910,958`) and M2 (`live-session-mobile.mjs:767,785`) had no subject. The product state they meant is present on the trigger face (`ChromeDock.vue:554-555`).
- **M1 = glass 10.1.0 → 10.1.1.** It flips at `8876e82e^` → `8876e82e`. That diff's kf files are ChromeDock/scenes/tests/observe scripts, with no sheet file. 10.1.1's G-1 made `SheetContent` `position: fixed`, which *cured* SHEET-POSITION (O-74c; `ControlsPaneWrapper.vue` note since `f8d6077b`).
  - The O-74c relief therefore no longer names a live producer defect, so M1 is **cured, not held**.
  - Measured ×2 at `fb87dbcd`: ⟨`guarded --timeout 10 -- node bis-m1probe.mjs`⟩. One browser, one context per run, both closed in `finally`. Bank: `evidence/W3/bis-m1-sheet-geometry-fb87dbcd.raw.txt`.
  - PEEK (`--detent-t` 0.12) sits at `top 545 / h 171` = **visible 0.354**, above the probe's Drawer-era cuts: open > 0.35, closed < 0.30.
  - So M1 OPEN skipped its expand drag on a parked sheet (`geo.open` true at PEEK). SCROLL then swiped the 85 px PEEK body, and CLOSE could never read closed.
  - The product walks PEEK → FULL (t 1, top 107) → OPEN (0.36) → PEEK on real touch drags. A 360 px drag from FULL lands one rung down, on OPEN. A 480 px drag lands on PEEK (the measured FULL → PEEK travel is 438 px).
- **Glass arm:** not taken. There is no glass regression, so there is **no INBOX O-n row**.
- **kf-product arm:** not taken. No dock or sheet byte was touched.

**Act 3: the cures** (kf, oracle arm). One commit per meaning, pathspec commits, not pushed; the push is `.d3`'s.
- **kf `2582da86`: the surface oracle reads the at-rest face.**
  - The read is now `[data-dock-surface-trigger]` → `data-surface`. Its subject is `faceItem`, the selected surface the pane holds, which `test/demo/app/dock-surface-items.test.ts` already asserts.
  - Paths: `scripts/lib/demo-driver.mjs` (`navToScene(page, sceneId, expectedSurface)`), `scripts/observe/demo/live-session.mjs` and `live-session-mobile.mjs` (the M2 hunks).
  - S5 `SWEEP_META` expects surface ids: controls ×3, easing (= Curve), spring (= Physics), timeline; home expects no face. M2 expects a face carrying a surface. Same predicates, re-aimed.
  - Three in-set easing callers passed `null`, a wait that only resolved because the read was stale. They now name `"easing"`.
  - **Adjacent edits (§0bt):** `scripts/observe/demo/subject-animates.mjs:254` and `scripts/observe/demo/usability.mjs:426`, `"Controls"` → `"controls"`. These are the twin call sites of the re-aimed `navToScene`.
- **kf `608748e2`: M1 reads the sheet's live detent rung.**
  - `open` = `--detent-t` ≥ `SHEET_OPEN_T` 0.36 **and** the old visible > 0.35 floor, which is kept.
  - `closed` = the `SHEET_PEEK_T` 0.12 rung. Both are the portrait `ControlsPaneWrapper.vue` `PEEK_SNAP`/`OPEN_SNAP`.
  - The collapse drag is 480 px (the measured travel). RE-OPEN's wait and predicate read the same rung fact.
- **Not used:** no clause removed, no assertion loosened, no skip, no allowlist, no producer selector.
- **Write-then-measure:** the five committed blobs at `608748e2` `cmp` byte-equal to the worktree files that ran the gates below.

**Gates (BEFORE → AFTER).**

| gate | BEFORE | AFTER |
| --- | --- | --- |
| roster S5 / M1 / M2, ×2 per bisect step | — | 12 steps × 2 runs banked, attribution above |
| roster `fb87dbcd` (live-session + live-session-mobile) | ×2 `passed: 0/2` (S5 · M1 SCROLL · M1 CLOSE · M2 ✗) | — |
| **full roster** (`demo:correctness`, all 6), fb87dbcd + the cure bytes, clean worktree | CI `41466910668` `4/6` | ⟨`guarded --timeout 40 -- npm run demo:correctness -- --timeout=600`⟩ ×2 → **`passed: 6/6` · `6/6`** (S5 `visited 8, sceneFails []`; M1 OPEN `--detent-t=1` · SCROLL `scrollTop=179px of 179px` · CLOSE `--detent-t=0.12`; M2 `surface "easing"`). No SHEET-POSITION relief used |
| kf `npm run check` | GREEN (Check 3) | ⟨`guarded --light -- npm run check`⟩ ×2 → rc 0 ×2, `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` |
| probe-adjacent unit tests | — | ⟨`guarded -- npx vitest run test/demo/instrument/live-session-spring-interact.test.ts test/demo/app/dock-surface-items.test.ts --maxWorkers=2`⟩ → `Test Files 2 passed (2)` · `Tests 13 passed (13)` |

**Teardown.** ⟨`git worktree remove --force /Users/mkbabb/Programming/.kf-bis-wt`⟩ → removed (`--force` because the measured cure hunks were applied there; those bytes are committed). ⟨`pgrep -fl 'kf-bis|run-demo-roster'`⟩ → none. The raw per-run logs stay durable at `/Users/mkbabb/Programming/.kf-bis-logs/`, outside every repo.

**Residuals.**
1. `scripts/gates/visual/index.mjs:181,310` and `scripts/gates/register-census.mjs:354` call `navToScene` with `null`/omitted. With the face read, a non-home scene now spends that wait's 12 s ceiling, the same as before `13762e6e`. It is only a wait, not an assertion. Those files are outside the set and are not roster members, so they are untouched.
2. `faceItem` falls back to the first live surface when `selectedControl` names no enabled row (`ChromeDock.vue:187-189`). The re-aimed oracle inherits that ruled product semantics.
3. Not pushed: kf `master` is 2 commits ahead of `origin` (`fb87dbcd` → `608748e2`), and kf CI is RED until `.d3` pushes.

**Escalations:** none. **INBOX:** no row (the glass arm was not attributed).

### KF.W3.u177

SERVED MODEL: claude-opus-5-5. Sections: COHESION §0he.2 (UIA-KF-177 grant) · Close 3 residual 2 · RESUME 3 Baseline/Unit plan. **Status: DONE.**

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; outside this set, never staged) ⇒ **0 inherited paths**. kf `HEAD` at open = `608748e2` (`.bis`).

**Act 1: anchors at the true bytes.** ⟨`sed -n 44-46p useKeyframeOps.ts`⟩ → `stored.duration = reverseCSSTime(animation.options.duration);` · `stored.delay = reverseCSSTime(animation.options.delay);` (anchor HOLDS, `:45-46`). Signature `css-text.ts:22 reverseCSSTime(milliseconds: number, unit?: CssTimeUnit)`; sibling two-argument sites confirmed at `css-text.ts:36` · `emit/entry.ts:402,418` · `format/options.ts:46`. `parseAnimationCSS` spreads value.js `CSSAnimationOptions` (`...rest`, which carries `durationUnit`/`delayUnit`) into the engine options, so the unit reaches `animation.options` after `adoptCompiled`.

**Act 2: the falsifier, RED at baseline.** New `test/demo/instrument/uia-kf-177-store-roundtrip.test.ts`: square demo animation → `useKeyframeOps(...).updateFromString(buffer)` → `getStoredAnimationOptions(anim).animationOptions` → feed the stored spellings back through the same op (fixed point) → `animationOptionsToString` re-emit. Two cases author 350 ms in both spellings, one per field (`0.35s`/`350ms` and `350ms`/`0.35s`), so a dropped unit on either field reads RED.
⟨`guarded --light -- npx vitest run test/demo/instrument/uia-kf-177-store-roundtrip.test.ts --maxWorkers=2`⟩ → `Tests 2 failed (2)`: `expected '0.35s' to be '350ms'` at `:51` (delay) and `:50` (duration). It is RED for the intended reason: the one-argument call takes the shortest-exact spelling with seconds on the tie.

**Act 3: the cure.** `useKeyframeOps.ts:45-46` now reads `reverseCSSTime(animation.options.duration, animation.options.durationUnit)` and `reverseCSSTime(animation.options.delay, animation.options.delayUnit)`. This is the sibling idiom, with no shim and no fallback. The two uia-kf-177 oracles' asserted text did not move, so **neither oracle was re-aimed** (both files byte-unchanged).

**Commit (kf, pathspec, not pushed; the push is `.d3`'s).** **`8294a715`** `fix(X·KF.W3.u177 · UIA-KF-177, COHESION §0he.2): the demo store keeps the authored <time> unit …`. ⟨`git show --stat HEAD`⟩ → `useKeyframeOps.ts | 12 +++-` · `uia-kf-177-store-roundtrip.test.ts | 72 +++` · `2 files changed, 82 insertions(+), 2 deletions(-)`. The committed bytes are the bytes the gates below ran on: no edit landed between the gate runs and the commit. Adjacent edits: none.

**Gates (BEFORE → AFTER).**

| gate | BEFORE | AFTER |
| --- | --- | --- |
| round-trip falsifier | **RED** `2 failed (2)` | ⟨`guarded --light -- npx vitest run <falsifier> <uia-kf-177-css-time> <uia-kf-177-authored-unit> --maxWorkers=2`⟩ ×2 → `Test Files 3 passed (3)` · `Tests 19 passed (19)` ×2 |
| uia-kf-177 oracles (css-time + authored-unit) | GREEN (Check 3) | in the same run, ×2 GREEN, unchanged |
| kf `npm run check` | GREEN (Check 3) | ⟨`guarded --light -- npm run check`⟩ ×2 → rc 0 ×2, `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` |
| kf vitest whole | — | ⟨`guarded --timeout 30 -- npx vitest run --maxWorkers=2`⟩ ×2 → rc 0 ×2: `Test Files 296 passed \| 5 skipped (301)` · `Tests 2318 passed \| 2 expected fail \| 14 skipped (2334)`, the same both runs |

The whole-suite runs read the shared working tree, which includes the sibling's uncommitted `KeyframeTimeline.vue`. Both runs were GREEN. Logs are durable at `/Users/mkbabb/Programming/.kf-u177-logs/`.

**Residuals.**
1. `demo/state/animationOptionsStore.ts:95-96` (`storedOptionsFrom`) seeds a *fresh* store entry as `${duration}ms` / `${delay}ms`. That is a lossless ms spelling, not the authored unit. It is a different site from the §0he.2 grant (`useKeyframeOps.ts:45-46`) and lies outside this set, so it is untouched and recorded for the owner.
2. kf `master` is now 3 commits ahead of `origin` (`fb87dbcd` → `8294a715`). The push is `.d3`'s.

**Escalations:** none.

### KF.W3.d3

SERVED MODEL: claude-opus-5-5. Sections: COHESION §0he.3 · §0hd.5 · §0hb.3 · spec G-KF3-8 · RESUME 3 Unit plan. **Status: ESCALATED (ESC-KFW3-d3-1).** The full receipts are at `keyframes/evidence/W3/CLOSE-RECEIPTS.md` § Addendum `.d3` (d3.1–d3.5).

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → `MM …/KeyframeTimeline.vue` only (the sibling's; never staged). The vjs writable paths are clean. **0 inherited paths.**

**Acts, in order.**
1. **Push.** ⟨`git push origin master`⟩ → `fb87dbcd..8294a715  master -> master`, an ordinary push carrying `.bis` `2582da86` `608748e2` and `.u177` `8294a715`.
2. **kf CI `41504991466`** → run `cancelled`.
   - The **demo correctness (browser roster)** job is **success**, with `passed: 6/6`. ESC-KFW3-r1-1 is cured on CI.
   - The **library gates** job is **cancelled**. All 11 steps passed: correctness `127 passed | 5 skipped (132)` files, demo correctness `167 passed (167)`, lint, `proof:publish`. The annotation then reads `The job has exceeded the maximum execution time of 4m0s` (`ci.yml:31 timeout-minutes: 4`; the job ran 18:54:45Z–18:59:25Z).
   - The same timeout cancelled the library job at `41450770277` / `41462383452` / `41466910668`. Earlier seats read that as collateral of the demo RED. The last GREEN library job was `35251074426` (2026-09-17, 1 m 50 s).
3. **deploy-pages `41505833861` → skipped**, gated on CI success at `deploy-pages.yml:39-41`. The break-glass dispatch was not used. The §6 round-trip and the post-deploy probe ×2 were **not run**, because there was no deploy. The probe is staged at `/Users/mkbabb/Programming/.kf-d3-logs/d3-probe.mjs`.
4. **G9.** ⟨`npm ls @mkbabb/value.js`⟩ ×2 → `4.1.0` (2 hits, 0 other versions). **GREEN.**

**Gates BEFORE → AFTER.**
- kf CI both jobs: RED (4/6 + cancelled) → **RED** (demo GREEN; library cancelled by the time budget).
- deploy-pages: skipped → **skipped**.
- §6: not run → **not run**.
- probe ×2: not run → **not run**.
- G9: GREEN → **GREEN**.

**Escalation ESC-KFW3-d3-1.**
- The kf `ci.yml:31` library-job budget of 4 min is below the measured step sum of about 4 m 31 s. The job is cancelled with every step GREEN. This is a new RED outside the wave's concern, and the cure is a `ci.yml` write outside `.d3`'s set.
- The ruling is needed on either a budget fitting the measured sum or a job split. No step is skipped and no assertion is relaxed.
- Logs: `/Users/mkbabb/Programming/.kf-d3-logs/ci-41504991466-{library,demo}.log`.
- After the ruling: re-run `.d3` from act 2.

**Residuals.** `.u177` residual 1 (`animationOptionsStore.ts:95-96`) stands untouched.

## Close 4 — 2026-11-02 (seat `.d3`, `claude-opus-5-5`): NOT CLOSED, PARTIAL

kf origin/master is `8294a715`. Demo roster CI is GREEN, 6/6. kf CI is RED on ESC-KFW3-d3-1 alone: the library-job 4-minute budget, with every step GREEN. deploy-pages was skipped, so the §6 round-trip and the post-deploy probe ×2 (the G-KF3-8 arm) are still owed. G9 is GREEN (4.1.0). The row stays PARTIAL, and X-W11's VERIFIED stamp (§0hb.3) is not reached. The next acts are: rule ESC-KFW3-d3-1 → `.d3` re-run → close → fresh check.

## Close 5 — 2026-11-02 (CLOSE SEAT, RESUME 3 units `.bis` `.u177` `.d3`, `claude-opus-5-5`, VERIFY-ONLY): PARTIAL

SERVED MODEL: claude-opus-5-5. Substrate: kf `HEAD` = `origin/master` = `8294a715` (⟨`git fetch && git log -1 origin/master`⟩). Crash-recovery: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged). The vjs record and LEDGER were clean. **0 inherited paths.** This seat cured nothing.

**Commit roster and writable-set check** (⟨`git show --stat <c>`⟩):

| unit | commit | files | in writable set |
| --- | --- | --- | --- |
| `.bis` | kf `2582da86` | `scripts/lib/demo-driver.mjs` · `scripts/observe/demo/live-session.mjs` · `scripts/observe/demo/live-session-mobile.mjs` + §0bt adjacent `subject-animates.mjs` (1 line) and `usability.mjs` (1 line), both declared in the receipt | YES (oracle arm + declared adjacent) |
| `.bis` | kf `608748e2` | `scripts/observe/demo/live-session-mobile.mjs` | YES |
| `.bis` | vjs `9edd3d8d3` | record · `evidence/W3/bis-bisect-roster.log.txt` · `bis-m1-sheet-geometry-fb87dbcd.raw.txt` · `bis-m1probe.mjs` · `bis-step.sh` | YES |
| `.u177` | kf `8294a715` | `demo/components/instrument/keyframes/composables/useKeyframeOps.ts` · new `test/demo/instrument/uia-kf-177-store-roundtrip.test.ts` | YES |
| `.u177` | vjs `17ac66620` | record | YES |
| `.d3` | kf push `fb87dbcd..8294a715` (no product write) · vjs `506c35bcf` | record · LEDGER · `evidence/W3/CLOSE-RECEIPTS.md` | YES |

**landedWrong: none.** No commit touches glass-ui, a pin, or `KeyframeTimeline.vue`.

**Gates re-run by this seat at kf `8294a715`.** Every heavy run went through `guarded`, with vitest `--maxWorkers=2`, one run at a time.

| gate | BEFORE (RESUME 3 baseline / Close 4) | AFTER (this seat) |
| --- | --- | --- |
| G-KF3-1 | GREEN | **GREEN**: ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` present (14 files in `evidence/W3/`) |
| G-KF3-2 | GREEN | **GREEN ×2**: ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc` = ⟨`npm view … dist.shasum`⟩ `d488535c9bfc`. The unmodified probe (sha256 `77678a574d7c6b11`) was symlinked into the untarred mirror, then ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.`, rc 0 both runs |
| G-KF3-3 | GREEN | **GREEN ×2**: the roster re-derived at HEAD (the spec's `git grep -l -E '@mkbabb/value\.js/css\|parseCss(Color\|Scalar\|Values)\|parseTimingFunction\|serializeCssValue\|reverseAnimationShorthand\|cssIdent' HEAD -- test/` ∪ `git grep -l serialize-value HEAD -- test/`, `.test.ts`) → 19 files; ⟨`xargs guarded -- npx vitest run --maxWorkers=2 < roster`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both runs |
| G-KF3-4 | GREEN | **GREEN**: `unserializable` in src+demo → `0`; fork defs → `0`; `@mkbabb/value.js/css` `serializeCssValue` imports → `serialize-value.ts:2` · `timelineEngine.ts:2`; seam importers → `15`; pin `package.json:71` `"4.1.0"`; INBOX `O-11 §B` → `1` |
| G-KF3-5 | GREEN | **GREEN**: one def, `css-text.ts:33`; ⟨`git grep -n "value.js's OWN" HEAD -- src`⟩ → `internal/leaves.ts:8` only (the `/math` subpath, outside the census-2 predicate) |
| G-KF3-6 + boot fence + invariant/bypass mutant | GREEN | **GREEN ×2**: INBOX `O-11 §D2` → `1`; the 5-file fence run (`public-surface` · `easing-identity` · `timing-function-names` · `orchestration-api` · `serialize-invariant`) ×2 → `Test Files 5 passed (5)` · `Tests 130 passed (130)` both runs |
| G-KF3-7 | GREEN | **GREEN**: `evidence/W3/CALL-MAP.md` present |
| UIA-KF-177 (`.u177`) | RED at the bytes | **GREEN ×2**: ⟨`guarded -- npx vitest run test/demo/instrument/uia-kf-177-store-roundtrip.test.ts test/compile/uia-kf-177-css-time.test.ts test/compile/uia-kf-177-authored-unit.test.ts --maxWorkers=2`⟩ ×2 → `Test Files 3 passed (3)` · `Tests 19 passed (19)` both runs |
| demo roster (`.bis`, ESC-KFW3-r1-1) | RED 4/6 | **GREEN on CI**: ⟨`gh run view 41504991466 --json jobs`⟩ → `demo correctness (browser roster) success`; ⟨`--log`⟩ → `passed: 6/6`. Not re-run locally: it is a browser run, and `.bis` banked it ×2 at the cure bytes; CI is the independent reading |
| kf `npm run check` | GREEN | **GREEN ×2**: ⟨`guarded --light -- npm run check`⟩ rc 0 ×2; ends `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` |
| kf vitest whole (lib + demo) | GREEN | **GREEN ×2**: ⟨`guarded --timeout 25 -- npx vitest run --maxWorkers=2`⟩ ×2 → rc 0 both; `Test Files 296 passed \| 5 skipped (301)` · `Tests 2318 passed \| 2 expected fail \| 14 skipped (2334)` both runs. The runs read the shared tree, which includes the sibling's uncommitted `KeyframeTimeline.vue`. Logs at `/Users/mkbabb/Programming/.kf-close5-logs/` |
| kf CI (both jobs) | RED | **RED, unchanged** (ESC-KFW3-d3-1): ⟨`gh run list -L 6`⟩ → `41504991466` ci `cancelled`, with no newer run. ⟨`gh run view 41504991466 --json jobs`⟩ → `library gates … cancelled` (18:54:45Z–18:59:25Z), and all 11 of its steps are `success` (`npm ci` → `publish boundary`). kf `ci.yml:31` still reads `timeout-minutes: 4`. ⟨`grep -n ESC-KFW3-d3-1 COHESION.md`⟩ → 0, so there is no ruling yet |
| deploy-pages · §6 round-trip · post-deploy probe ×2 (G-KF3-8 pageerror arm) | skipped / owed | **BLOCKED** behind CI: `41505833861` deploy-pages `skipped`. These were not run, because probing prod now would read the pre-W3 build |
| G9 | GREEN | **GREEN**: ⟨`npm ls @mkbabb/value.js`⟩ → `4.1.0` (2 hits, 0 other versions) |
| G-KF3-8 / G-KF3-9 | floors | not close gates (spec §Gates) |

**Verification artefacts.** The spec names no separate §Verification Artefacts block. The evidence bank `docs/tranches/X/keyframes/evidence/W3/` holds the eight named artefacts plus the `.bis` bank (`bis-bisect-roster.log.txt` · `bis-m1-sheet-geometry-fb87dbcd.raw.txt` · `bis-m1probe.mjs` · `bis-step.sh`). That is 14 files.

**E13.** The paths were swept again: value V/ + V/coordination · glass BK/coordination + BL + BL/audit (newest `BL`) · keyframes V/coordination. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-11-02 10:40) returned files only for glass `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md` (commits `97352c0e8`…`ed1bc0cd8`: the glass 10.1.4 cursor and O-119 Gregg inventory). Their added lines carry no keyframes.js or KF.W3 row, so they are out of scope. INBOX `UNREAD` status rows: I-79 is the only open one. It is routed by §0he.4 to the post-KF.W3 keyframes minor, outside this wave. **UNREAD in KF.W3 scope: 0.**

**Residuals (named owners).**
1. ESC-KFW3-d3-1: the kf `ci.yml:31` library-job budget (4 min) is below the measured step sum. It needs an orchestrator ruling (a budget fitting the sum, or a job split; no step skipped). After that, the `.d3` re-run from act 2: CI GREEN → deploy-pages → §6 → probe ×2 (pageerror 0 = G-KF3-8 arm) → close + fresh check. Owner: orchestrator → `.d3` re-run.
2. `demo/state/animationOptionsStore.ts:95-96` seeds fresh entries as `${duration}ms` (lossless, not the authored unit). This is a separate site from the §0he.2 grant. Owner: the post-W3 keyframes minor (§0he.4) or a seat granted on it.
3. `.bis` residual: `scripts/gates/visual/index.mjs` + `scripts/gates/register-census.mjs` pass null to `navToScene`, so each non-home scene waits out the 12 s ceiling. It is a wait, not an assertion, and those files are not roster members. Owner: the post-W3 keyframes minor.
4. Throw sites 2 → 2 (seam invariant + `timelineEngine.ts` refusal). Owner: KF.W7 / KF.W2 posture (L-5).
5. §0hb.3's X-W11 VERIFIED stamp waits on the deploy. Owner: Track A after the `.d3` re-run.

**Escalations**: none new (ESC-KFW3-d3-1 stands). **Adjacent edits**: none.

**Four-verb line**: IMPLEMENTED — **NOT advanced**. Spec §State says *"gates green + bytes landed in the named execution site stamps this"*, and kf CI is RED with the deploy, §6 and probe acts still owed. VERIFIED is not this seat's to stamp. The row stays **PARTIAL**.

## Check 1 (pass 1 after Close 5; record sequence Check 7) — 2026-11-02 (fresh adversarial L-20, VERIFY-ONLY, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate: kf `HEAD` = `origin/master` = `8294a715` (⟨`git fetch && git log -1 origin/master`⟩; no kf commit since Close 5); vjs `337fd9d40`. I authored none of the wave's bytes, closes, checks or repairs. Crash-recovery: ⟨`git status --porcelain -- <record> <LEDGER>`⟩ → empty; the kf tree carries `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged) ⇒ **0 inherited paths**.

**Verdict: NOT-CONFORMANT.** Every GREEN Close 5 claims reproduces at `8294a715`, and the RESUME 3 commits are in-set and unmasked. But §0he.3 (restating §0hd.5) rules the close order *kf CI GREEN → deploy-pages → §6 → probe ×2 → close*, and kf CI is still not GREEN: run `41504991466`'s `library gates` job is `cancelled` by the `ci.yml:31` `timeout-minutes: 4` budget, deploy-pages `41505833861` is `skipped`, and §6 + the post-deploy probe ×2 were never run. ESC-KFW3-d3-1 has no ruling (⟨`grep -n ESC-KFW3-d3-1 docs/tranches/X/COHESION.md`⟩ → 0, staged index included). The row is **not** promoted.

### Axis 1 — reproduction (kf `8294a715`; every run through `guarded`, vitest `--maxWorkers=2`, strictly sequential)

| gate | reading |
| --- | --- |
| G-KF3-1 | ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` present; `evidence/W3/` holds 14 files — **GREEN** |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc` = ⟨`npm view @mkbabb/value.js@4.1.0 dist.shasum`⟩ `d488535c9bfc`; probe sha256 `77678a574d7c6b11` (unmodified), symlinked into the untarred scratch mirror; ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.` rc 0 both — **GREEN ×2** |
| G-KF3-3 | roster re-derived at HEAD (spec's `git grep -l -E …` ∪ `git grep -l serialize-value`, `.test.ts`) → `19`; ⟨`xargs guarded -- npx vitest run --maxWorkers=2 < roster`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both — **GREEN ×2** |
| G-KF3-4 | `unserializable` in src+demo → `0`; fork defs (`export (const\|function) serializeCssValue`) → `0`; `@mkbabb/value.js/css` imports → `serialize-value.ts:2` · `timelineEngine.ts:2`; pin `package.json:71` `"4.1.0"`; INBOX `O-11 §B` → `1` — **GREEN** |
| G-KF3-5 | one def `css-text.ts:33`; ⟨`git grep -n "value.js's OWN\|published 0.12.0 inverse" HEAD -- src test`⟩ → `internal/leaves.ts:8` only (`/math` subpath; outside the census-2 predicate) — **GREEN** (discharge (b)) |
| G-KF3-6 + boot fence + invariant/bypass mutant | INBOX `O-11 §D2` → `1`; 5-file fence (`_root/public-surface` · `compile/easing-identity` · `compile/serialize-invariant` · `compile/timing-function-names` · `orchestration/orchestration-api`) ×2 → `Test Files 5 passed (5)` · `Tests 130 passed (130)` both — **GREEN ×2** |
| G-KF3-7 | `evidence/W3/CALL-MAP.md` present — **GREEN** |
| UIA-KF-177 | the 3 files ×1 → `Test Files 3 passed (3)` · `Tests 19 passed (19)` — **GREEN** (Close 5 banked ×2) |
| kf `npm run check` | ⟨`guarded --light -- npm run check`⟩ ×2 → rc 0 both — **GREEN ×2** |
| kf vitest whole | ⟨`guarded --timeout 25 -- npx vitest run --maxWorkers=2`⟩ ×1 → rc 0, `Test Files 296 passed \| 5 skipped (301)` · `Tests 2318 passed \| 2 expected fail \| 14 skipped (2334)` = Close 5's figure exactly (Close 5 banked ×2) — **GREEN** |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ → `4.1.0` + glass's copy `deduped` — **GREEN** |
| demo roster (CI) | ⟨`gh run view 41504991466 --json jobs`⟩ → `demo correctness (browser roster) success` — **GREEN** (CI reading; not re-run locally, a browser run) |
| kf CI (library job) | same run → `library gates … cancelled` 18:54:45Z–18:59:25Z (4m40s); its steps `npm ci` … `publish boundary` all `success`; `ci.yml:31` reads `timeout-minutes: 4`; ⟨`gh run list -L 5`⟩ → no newer run — **RED** |
| deploy-pages · §6 · probe ×2 | `41505833861` → `skipped`; not run — **OWED** |

### Axes 2–9

- **(2) Bounds.** ⟨`git show --stat`⟩: kf `2582da86` = `scripts/lib/demo-driver.mjs` · `scripts/observe/demo/live-session{,-mobile}.mjs` + the two declared §0bt one-line adjacents (`subject-animates.mjs`, `usability.mjs`); kf `608748e2` = `live-session-mobile.mjs`; kf `8294a715` = `useKeyframeOps.ts` + new `test/demo/instrument/uia-kf-177-store-roundtrip.test.ts` — all inside the §0he.1/§0he.2 grants. vjs `9edd3d8d3` · `17ac66620` · `506c35bcf` · `2076808c3` touch only the record, LEDGER and `evidence/W3/**`. ⟨`git diff --stat fb87dbcd..8294a715 -- package.json package-lock.json`⟩ → empty (no pin moved). ⟨`git log --oneline 9edd3d8d3^..HEAD -- scripts/dev/dev.sh \| wc -l`⟩ → `0`. **Clean.**
- **(3) Masking.** The `.u177` diff threads `durationUnit`/`delayUnit` into the two-argument `reverseCSSTime` (root cure, no fallback). ⟨`git show 2582da86 608748e2 \| grep -nE '^\+.*(skip\|catch\|allow\|\|\| true\|tolerance\|optional)'`⟩ → no output. The `.bis` re-aims read the at-rest dock fact and the live detent rung; no assertion was loosened. **Clean.**
- **(4) Commit families.** One kf commit per meaning (`.bis` oracle re-aim · `.bis` M1 · `.u177` cure+falsifier), one record commit per seat. **Clean.**
- **(5) E-3.** ⟨`git diff --stat 9edd3d8d3^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/conformance`⟩ → empty. **Held.**
- **(6) Mail.** INBOX mtime `Nov 2 10:40`. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value V/ + V/coordination · glass BK/coordination + BL + BL/audit · kf V/coordination → glass `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md` only. Their added lines since 10:40 (`97352c0e8` … `b4b6b76ee`) carry one `keyframes` hit: the O-119 Gregg inventory row, whose keyframes item is KF-4, booked by §0he.4 to the post-KF.W3 keyframes minor. No INBOX status cell reads UNREAD in KF.W3 scope (I-79 is routed by §0he.4 outside this wave). **UNREAD in scope: 0.**
- **(7) Four-verb line.** IMPLEMENTED not advanced; row PARTIAL. Lawful while §0he.3's close order is unfinished.
- **(8) Goal criterion.** MET at the bytes: `CALL-MAP.md` spans both organs; exactly one `serializeCssValue` provider reachable from the emit tier (value's `./css` through `serialize-value.ts`; 0 kf fork defs); exactly one `reverseAnimationShorthand` (`css-text.ts:33`) with its provider prose true (discharge (b)).
- **(9) Published figures.** Reproduce: 0/1548, sha1 `d488535c9bfc`, 19/235, 5/130, 3/19, 296|5 (301) · 2318|2|14 (2334), 14 evidence files, 4m40s library job with all steps success, deploy skipped.

### Axis 10 — honest-RED adjudication

**kf CI `library gates` cancelled (ESC-KFW3-d3-1) → deploy-pages skipped → §6 + probe ×2 owed: UNRELIEVED.**
- **Producer-owned?** No. The budget is kf's own `.github/workflows/ci.yml:31`.
- **Routed to a later wave by the spec?** No. The spec's seven close gates are G-KF3-1…7 (all GREEN); the CI → deploy → §6 → probe order is COHESION §0hd.5 / §0he.3's ruled close conjunct, and no §Excluded row, lock or cross-edge routes it elsewhere.
- **A spec-named honest-RED id?** No.
- **Owner.** Close 5's residual 1 names it: orchestrator ruling (a budget fitting the measured step sum, or a job split; no step skipped), then the `.d3` re-run from act 2. No ruling has landed. The RED is not a product defect of this wave (every step is `success`), but it is not relieved, and §0he.3 binds the close to CI GREEN.

G-KF3-8's pageerror arm is a FLOOR, outside the close set. **Honest-RED set: none.**

### Successor conjuncts

⟨`grep -nE '[Oo]pens after' docs/tranches/X/*/waves/*.md \| grep 'KF\.W3'`⟩ → 3 hits: KF-W10 `:47`, KF-W4 `:55`, KF-W7 `:61`. Each is a citation inside a provenance or bounds cell, not a conjunct on KF.W3 (KF-W10 `:47` states its *"Opens after"* is not widened by it). **No successor wave is gated on this row.** The dependant X-W11 VERIFIED stamp (§0hb.3, Track A) has its `npm ls → 4.1.0` conjunct GREEN and its deploy conjunct RED: **lawfully blocked**.

**Count**: 14 claimed GREENs reproduced (G-KF3-1…7, the invariant/bypass fence, UIA-KF-177, check, vitest whole, G9, demo roster on CI, the library job's 11 steps); 0 claimed GREENs failed.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| HIGH | §0he.3 / §0hd.5's ruled close order is unfinished: kf CI is not GREEN (library job `cancelled` at the 4-minute `ci.yml:31` budget, every step `success`), so deploy-pages was skipped and §6 + the post-deploy probe ×2 (G-KF3-8 pageerror arm) never ran. No spec relief, no honest-RED id, not producer-owned; ESC-KFW3-d3-1 unruled. | CI `41504991466` (library `cancelled` 4m40s); deploy `41505833861` `skipped`; ⟨`grep -n ESC-KFW3-d3-1 COHESION.md`⟩ → 0 | Orchestrator rules ESC-KFW3-d3-1 (budget fitting the measured sum, or a job split; no step skipped); then the `.d3` re-run: CI GREEN → deploy-pages → §6 → probe ×2 → close → fresh check |
| MINOR | `demo/state/animationOptionsStore.ts:95-96` seeds fresh entries as `${duration}ms` (lossless, not the authored unit) | Close 5 residual 2 | post-W3 keyframes minor (§0he.4) or a granted seat |
| INFO | `scripts/gates/visual/index.mjs` + `register-census.mjs` pass null to `navToScene` (12 s waits, not assertions) | Close 5 residual 3 | post-W3 keyframes minor |
| INFO | throw sites 2 → 2 | Close 5 residual 4 | KF.W7 / KF.W2 posture (L-5) |
| INFO | the sibling's dirty `KeyframeTimeline.vue` is in every local run's tree | ⟨`git status --porcelain`⟩ | none |

**LEDGER**: not promoted; the row stays PARTIAL; an event line is appended.

## Repair 1 (after Check 1) — 2026-11-02 (REPAIR SEAT round 1, `claude-opus-5-5`): 0 cured · 2 escalated · nothing in bounds to cure

Crash-recovery: ⟨`git status --porcelain`, keyframes.js⟩ → only `MM demo/components/instrument/timeline/KeyframeTimeline.vue` (the sibling seat's, outside this unit's set, left alone). ⟨`git status --porcelain docs/tranches/X/execution/B/KF-W3.md`⟩ → clean. Nothing inherited.

| defect | cure | commit | gate re-reading |
|---|---|---|---|
| HIGH: close order unfinished; library-gates job cancelled at the 4-min budget | **ESCALATED.** The cure needs an orchestrator ruling on ESC-KFW3-d3-1: ⟨`grep -c ESC-KFW3-d3-1 docs/tranches/X/COHESION.md`⟩ → **0**, so no ruling exists. The budget sits at ⟨`grep -n timeout-minutes keyframes.js/.github/workflows/ci.yml`⟩ → `:31 timeout-minutes: 4` (gates) and `:103 timeout-minutes: 50`. `.github/workflows/ci.yml` is not in KF-W3 §B.2's writable set (library `src/animation/compile/**` + `test/**` + the named rows). Re-budgeting a CI job is a different concern from the parser wave, so the adjacent-line rule does not reach it. | none | not re-run: no cure landed, so no gate could move. Check 1's readings stand. |
| MINOR: `demo/state/animationOptionsStore.ts:95-96` seeds `${duration}ms` | **ESCALATED.** Re-read: `:95 duration: \`${duration}ms\`,` and `:96 delay: \`${delay}ms\`,`. `demo/state/**` is not in §B.2. Keeping the author's unit needs a change to the store's seeding data flow, which is more than a one-command cure. Routed to the post-W3 keyframes minor (§0he.4) or a seat granted on it. | none | — |
| INFO ×3 (navToScene null waits; throw sites = 2; sibling-dirty tree) | no cure owed (INFO) | none | — |

**Next act**: the orchestrator rules ESC-KFW3-d3-1, then the `.d3` seat runs CI GREEN → deploy-pages → §6 → probe ×2 → close → fresh check. **LEDGER**: untouched; the row stays PARTIAL.

## Check 2 (pass 2 after Close 5; record sequence Check 8) — 2026-11-02 (fresh adversarial L-20, VERIFY-ONLY, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate: kf `HEAD` = `origin/master` = `8294a715` (⟨`git fetch && git log -5 origin/master`⟩; no kf commit since Close 5 / Check 1 / Repair 1); vjs `779116ab2`. I authored none of the wave's bytes, closes, checks or repairs. Crash-recovery: ⟨`git status --porcelain -- <record> <LEDGER>`⟩ → empty; kf tree `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged) ⇒ **0 inherited paths**.

**Verdict: NOT-CONFORMANT.** Nothing moved since Check 1. Repair 1 cured nothing (both rows escalated) and ⟨`grep -n ESC-KFW3-d3-1 docs/tranches/X/COHESION.md`⟩ → no output, so ESC-KFW3-d3-1 is still unruled. kf `ci.yml:31` still reads `timeout-minutes: 4`. ⟨`gh run list -R mkbabb/keyframes.js -L 6`⟩ → newest ci `41504991466` `cancelled`, deploy-pages `41505833861` `skipped`; no newer run. §0he.3's ruled close order (*kf CI GREEN → deploy-pages → §6 round-trip → post-deploy probe ×2 → close → fresh check*, COHESION.md:5096) is still unfinished. Every claimed GREEN reproduces.

### Axis 1 — reproduction (kf `8294a715`; every run through `guarded`, vitest `--maxWorkers=2`, strictly sequential)

| gate | reading |
| --- | --- |
| G-KF3-1 | ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` + `CALL-MAP.md` present; ⟨`ls evidence/W3 \| wc -l`⟩ → `14` — **GREEN** |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ → ⟨`shasum -a 1`⟩ `d488535c9bfc747e318895417c28a753a3b7b3d6` = ⟨`npm view … dist.shasum`⟩; probe sha256 `77678a574d7c6b11` (unmodified, symlinked into the untarred scratch mirror); ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.`, rc 0 both, logs `cmp`-identical — **GREEN ×2** |
| G-KF3-3 | roster re-derived at HEAD (spec's `git grep -l -E '@mkbabb/value\.js/css\|parseCss(Color\|Scalar\|Values)\|parseTimingFunction\|serializeCssValue\|reverseAnimationShorthand\|cssIdent' HEAD -- test/` ∪ `git grep -l serialize-value HEAD -- test/`, `.test.ts`, `sort -u`) → `19`; ⟨`xargs guarded -- npx vitest run --maxWorkers=2 < roster`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both, rc 0 — **GREEN ×2** |
| G-KF3-4 | `unserializable` in src+demo → `0`; ⟨`git grep -nE 'export (const\|function) serializeCssValue' HEAD -- src demo`⟩ → `0`; `serializeCssValue` from `@mkbabb/value.js/css` → `serialize-value.ts:2` · `timelineEngine.ts:2`; pin `package.json:71` `"4.1.0"`; INBOX `O-11 §B` → `1` — **GREEN** |
| G-KF3-5 | ⟨`git grep -nE 'export (const\|function) reverseAnimationShorthand' HEAD -- src`⟩ → `css-text.ts:33` only; ⟨`git grep -n "value.js's OWN\|published 0.12.0 inverse" HEAD -- src test`⟩ → `internal/leaves.ts:8` only (`/math` subpath; outside census 2) — **GREEN** (discharge (b)) |
| G-KF3-6 + boot fence + invariant/bypass mutant + UIA-KF-177 | INBOX `O-11 §D2` → `1`; one run over the 5 fence files (`_root/public-surface` · `compile/easing-identity` · `compile/serialize-invariant` · `compile/timing-function-names` · `orchestration/orchestration-api`) plus the 3 UIA-KF-177 files → `Test Files 8 passed (8)` · `Tests 149 passed (149)` = 130 + 19, Close 5's two figures summed — **GREEN** (Close 5 + Check 1 banked ×2) |
| G-KF3-7 | `evidence/W3/CALL-MAP.md` present — **GREEN** |
| kf `npm run check` | ⟨`guarded --light -- npm run check`⟩ → rc 0, ends `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` — **GREEN** (banked ×2 twice) |
| kf vitest whole | ⟨`guarded --timeout 25 -- npx vitest run --maxWorkers=2`⟩ ×1 → rc 0, `Test Files 296 passed \| 5 skipped (301)` · `Tests 2318 passed \| 2 expected fail \| 14 skipped (2334)`, which is Close 5's figure exactly (Close 5 banked ×2). The run read the shared tree, so the sibling's dirty `KeyframeTimeline.vue` was included — **GREEN** |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ → `@mkbabb/value.js@4.1.0` + glass 10.1.3's copy `deduped` — **GREEN** |
| demo roster (CI) | ⟨`gh run view 41504991466 --json jobs`⟩ → `demo correctness (browser roster) success` 18:54:45Z–19:00:07Z — **GREEN** (CI reading; a browser run, not re-run locally) |
| kf CI (library job) | same run → `library gates … cancelled` 18:54:45Z–18:59:25Z (4m40s); `ci.yml:31` `timeout-minutes: 4`; no newer run — **RED** |
| deploy-pages · §6 · probe ×2 | `41505833861` → `skipped`; never run — **OWED** |

### Axes 2–9

- **(2) Bounds.** No new product commit since Check 1. Since Close 5 vjs carries only `4fceffc30` (Check 1: record + LEDGER) and `779116ab2` (Repair 1: record), by ⟨`git show --stat`⟩. Check 1's roster of `2582da86` · `608748e2` · `8294a715` (in the §0he.1/§0he.2 grants) stands at unchanged bytes. ⟨`git log --oneline 9edd3d8d3^..HEAD -- scripts/dev/dev.sh \| wc -l`⟩ → `0`. **Clean.**
- **(3) Masking.** No new diff. Check 1's masking sweep of the RESUME 3 diffs stands. Repair 1 left `ci.yml:31` alone rather than skipping a step, which is lawful. **Clean.**
- **(4) Commit families.** One commit per meaning, one record commit per seat. **Clean.**
- **(5) E-3.** ⟨`git diff --stat 9edd3d8d3^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/conformance`⟩ → empty. **Held.**
- **(6) Mail.** INBOX mtime `Nov 2 10:40`. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value V/ + V/coordination · glass BK/coordination + BL + BL/audit (newest `BL`, ⟨`ls -dt`⟩) · kf V/coordination → glass `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md` only, the same pair Check 1 adjudicated. ⟨`git -C glass-ui log --oneline b4b6b76ee..HEAD -- docs/tranches/BL`⟩ → empty, so there are no new lines. No INBOX status cell reads UNREAD in KF.W3 scope (I-79 is routed by §0he.4 outside this wave). **UNREAD in scope: 0.**
- **(7) Four-verb line.** IMPLEMENTED was not advanced and the row stays PARTIAL. That is lawful, because the spec's *"gates green + bytes landed"* plus §0he.3's close order are not complete.
- **(8) Goal criterion.** **MET at the bytes:** `CALL-MAP.md` spans both organs; exactly one `serializeCssValue` provider (value `./css`, 0 kf fork defs); exactly one `reverseAnimationShorthand` (`css-text.ts:33`) with its provider prose true.
- **(9) Published figures.** These reproduce: 0/1548, sha1 `d488535c9bfc`, 19 / 235, 130 + 19 = 149, 14 evidence files, the 4m40s cancelled library job, deploy skipped.

### Axis 10 — honest-RED adjudication

**kf CI `library gates` cancelled (ESC-KFW3-d3-1) → deploy-pages skipped → §6 + probe ×2 owed: UNRELIEVED, and unchanged since Check 1.**
- **Producer-owned?** No. The budget is kf's own `.github/workflows/ci.yml:31`.
- **Routed to a later wave by the spec?** No. The close conjunct is COHESION §0he.3 / §0hd.5. No §Excluded row, lock or cross-edge of KF-W3.md routes it elsewhere.
- **A spec-named honest-RED id?** No.
- **Owner named?** Yes: the orchestrator ruling on ESC-KFW3-d3-1 (a budget fitting the measured step sum, or a job split, with no step skipped), then the `.d3` re-run (Close 5 residual 1; Repair 1 next-act). A named owner does not make a RED honest without a spec relief, so the HIGH stands.

G-KF3-8's pageerror arm is a FLOOR (spec §Gates), outside the close set. **Honest-RED set: none.**

### Successor conjuncts

⟨`grep -nE '[Oo]pens after' docs/tranches/X/*/waves/*.md \| grep 'KF\.W3'`⟩ → 3 hits: KF-W7 `:61`, KF-W10 `:47`, KF-W4 `:55`. Each is a citation inside a bounds or provenance cell, not a conjunct on KF.W3. **No successor wave is gated on this row.** Two dependants are lawfully blocked on the deploy conjunct:
- X-W11's VERIFIED stamp (§0hb.3, §0he.3 tail). Its `npm ls → 4.1.0` conjunct is GREEN.
- §0he.4's post-KF.W3 keyframes minor (K-1, KF-1..KF-4), whose vehicle is *"after KF.W3 ships"*.

**Count**: 13 claimed GREENs reproduced: G-KF3-1…7, the fence + UIA-KF-177, check, vitest whole, G9, the demo roster on CI, and the library job's steps (`success` up to the cancel). 0 claimed GREENs failed. 1 RED (the library job cancel) and 3 owed acts.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| HIGH | §0he.3 / §0hd.5's ruled close order is still unfinished, with no change since Check 1. kf CI is not GREEN: the library job was `cancelled` at the 4-minute `ci.yml:31` budget. As a result deploy-pages was skipped, and §6 and the post-deploy probe ×2 (the G-KF3-8 pageerror arm) never ran. It has no spec relief, no honest-RED id, and is not producer-owned. ESC-KFW3-d3-1 is unruled (Repair 1 escalated it; there is no COHESION hit). | CI `41504991466` (library `cancelled` 4m40s, demo `success`); deploy `41505833861` `skipped`; ⟨`grep -n ESC-KFW3-d3-1 docs/tranches/X/COHESION.md`⟩ → none; ⟨`sed -n 31p keyframes.js/.github/workflows/ci.yml`⟩ → `timeout-minutes: 4` | The orchestrator rules ESC-KFW3-d3-1: a budget that fits the measured step sum, or a job split, with no step skipped. Then the `.d3` re-run: CI GREEN → deploy-pages → §6 → probe ×2 → close → fresh check |
| MINOR | `demo/state/animationOptionsStore.ts:95-96` seeds fresh entries as `${duration}ms`. That is lossless, but it is not the authored unit. | Close 5 residual 2; Repair 1 escalated | the post-W3 keyframes minor (§0he.4) or a granted seat |
| INFO | `scripts/gates/visual/index.mjs` + `register-census.mjs` pass null to `navToScene`, which costs 12 s waits but no assertions | Close 5 residual 3 | the post-W3 keyframes minor |
| INFO | throw sites 2 → 2 | Close 5 residual 4 | KF.W7 / KF.W2 posture (L-5) |
| INFO | every local run's tree includes the sibling's dirty `KeyframeTimeline.vue` | ⟨`git status --porcelain`⟩ | none |

**LEDGER**: not promoted. The row stays PARTIAL, and an event line is appended.

## Repair 2 (after Check 2, post-Close 5) — 2026-11-02 (REPAIR SEAT round 2, `claude-opus-5-5`): 0 cured · 2 escalated · nothing in bounds to cure

Crash-recovery: ⟨`git status --porcelain`, keyframes.js⟩ → only `MM demo/components/instrument/timeline/KeyframeTimeline.vue`. That path belongs to a sibling seat, is outside this unit's set, and was left alone. ⟨`git status --porcelain docs/tranches/X/execution/B/KF-W3.md`⟩ → clean. Nothing inherited.

| defect | cure | commit | gate re-reading |
|---|---|---|---|
| HIGH: close order unfinished; library-gates job cancelled at the 4-min budget | **ESCALATED, unchanged since Repair 1.** ⟨`grep -c ESC-KFW3-d3-1 docs/tranches/X/COHESION.md`⟩ → **0**, so there is still no ruling. ⟨`grep -n timeout-minutes .github/workflows/ci.yml`⟩ (kf) → `31: timeout-minutes: 4` · `103: timeout-minutes: 50`. ⟨`gh run list --limit 4`⟩ → ci 41504991466 `cancelled` and deploy-pages 41505833861 `skipped` at `8294a715`, with no newer run. `.github/workflows/ci.yml` is not in §B.2. A CI budget is a different concern from the parser wave, so the adjacent-line rule does not reach it. | none | not re-run: no cure landed, so no gate could move. Check 2's readings stand. |
| MINOR: `demo/state/animationOptionsStore.ts:95-96` seeds `${duration}ms` / `${delay}ms` (re-read, unchanged) | **ESCALATED.** `demo/state/**` is not in §B.2, and the fix changes the store's seeding data flow, which is more than a one-command cure. Routed to the post-W3 keyframes minor (§0he.4) or a seat granted on it. | none | — |
| INFO ×2 (navToScene null waits; throw sites = 2) | no cure owed (INFO) | none | — |

**Next act**: the orchestrator rules ESC-KFW3-d3-1, either with a budget that fits the measured step sum or with a job split, with no step skipped. Then the `.d3` seat runs CI GREEN → deploy-pages → §6 → probe ×2 → close, followed by a fresh check. **LEDGER**: untouched; the row stays PARTIAL.

## Check 3 (pass 3 after Close 5; record sequence Check 9) — 2026-11-02 (fresh adversarial L-20, VERIFY-ONLY, `claude-opus-5-5`)

SERVED MODEL: claude-opus-5-5. Substrate: kf `HEAD` = `origin/master` = `8294a715` (⟨`git fetch && git log -3 origin/master`⟩; no kf commit since Close 5, Check 1, Repair 1, Check 2 or Repair 2); vjs `0733bc45b`. I authored none of the wave's bytes, closes, checks or repairs. Crash-recovery: ⟨`git status --porcelain -- <record> <LEDGER>`⟩ → empty; kf tree `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged) ⇒ **0 inherited paths**.

**Verdict: NOT-CONFORMANT.** Nothing has moved since Check 2. Repair 2 cured nothing and escalated both rows. ⟨`grep -n ESC-KFW3-d3-1 docs/tranches/X/COHESION.md`⟩ → no output, so ESC-KFW3-d3-1 is still unruled. kf `ci.yml:31` still reads `timeout-minutes: 4`. ⟨`gh run list -L 5`⟩ → newest ci `41504991466` `cancelled`, deploy-pages `41505833861` `skipped`, no newer run. §0he.3's ruled close order (kf CI GREEN → deploy-pages → §6 → probe ×2 → close → fresh check) is still unfinished. Every claimed GREEN that I re-ran reproduces.

### Axis 1 — reproduction (kf `8294a715`; every run through `guarded`, vitest `--maxWorkers=2`, strictly sequential)

| gate | reading |
| --- | --- |
| G-KF3-1 | ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` + `CALL-MAP.md` present; ⟨`ls evidence/W3 \| wc -l`⟩ → `14` — **GREEN** |
| G-KF3-2 | ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ → ⟨`shasum -a 1`⟩ `d488535c9bfc747e318895417c28a753a3b7b3d6` = ⟨`npm view … dist.shasum`⟩; probe sha256 `77678a574d7c6b11` (unmodified, symlinked into the untarred scratch mirror at its own relative path); ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.`, rc 0 both, logs `cmp`-identical — **GREEN ×2** |
| G-KF3-3 | roster re-derived at HEAD by the spec's `git grep -l -E …` ∪ `git grep -l serialize-value`, `.test.ts`, `sort -u` → `19`; ⟨`xargs guarded -- npx vitest run --maxWorkers=2 < roster`⟩ → rc 0, `Test Files 19 passed (19)` · `Tests 235 passed (235)` — **GREEN** (banked ×2 at Close 5, Check 1, Check 2) |
| G-KF3-4 | `unserializable` in src+demo → `0`; ⟨`git grep -nE 'export (const\|function) serializeCssValue' HEAD -- src demo`⟩ → `0`; `serializeCssValue` from `@mkbabb/value.js/css` → `serialize-value.ts:2` · `timelineEngine.ts:2`; pin `package.json:71` `"4.1.0"`; INBOX `O-11 §B` → `1` — **GREEN** |
| G-KF3-5 | ⟨`git grep -nE 'export (const\|function) reverseAnimationShorthand' HEAD -- src`⟩ → `css-text.ts:33` only; ⟨`git grep -n "value.js's OWN\|published 0.12.0 inverse" HEAD -- src test`⟩ → `internal/leaves.ts:8` only (the `/math` subpath, outside census 2) — **GREEN** (discharge (b)) |
| G-KF3-6 + boot fence + invariant/bypass mutant + UIA-KF-177 | INBOX `O-11 §D2` → `1`; one run over the 5 fence files + the 3 UIA-KF-177 files → rc 0, `Test Files 8 passed (8)` · `Tests 149 passed (149)` — **GREEN** |
| G-KF3-7 | `evidence/W3/CALL-MAP.md` present — **GREEN** |
| kf `npm run check` | ⟨`guarded --light -- npm run check`⟩ → rc 0, ends `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` — **GREEN** |
| kf vitest whole | ⟨`guarded --timeout 25 -- npx vitest run --maxWorkers=2`⟩ was started by this seat but had not settled when the seat had to return, so I do **not** count it as reproduced here. It stands on the bank: Close 5 ×2 and Check 2 ×1 → `Test Files 296 passed \| 5 skipped (301)` · `Tests 2318 passed \| 2 expected fail \| 14 skipped (2334)`, at unchanged kf bytes `8294a715` — **GREEN (banked; not re-read by this seat)** |
| G9 | ⟨`npm ls @mkbabb/value.js`⟩ → `@mkbabb/value.js@4.1.0` + glass 10.1.3's copy `deduped` — **GREEN** |
| demo roster (CI) | ⟨`gh run view 41504991466 --json jobs`⟩ → `demo correctness (browser roster) success` 18:54:45Z–19:00:07Z — **GREEN** (CI reading; a browser run, not re-run locally) |
| kf CI (library job) | same run → `library gates (library tests + proof:publish) cancelled` 18:54:45Z–18:59:25Z (4m40s); `ci.yml:31` `timeout-minutes: 4`; no newer run — **RED** |
| deploy-pages · §6 · probe ×2 | `41505833861` → `skipped`; never run — **OWED** |

### Axes 2–9

- **(2) Bounds.** No new product commit since Close 5. Since Check 1, vjs carries only `779116ab2` (Repair 1: record), `175506586` (Check 2: record + LEDGER) and `0733bc45b` (Repair 2: record), by ⟨`git show --stat`⟩. Check 1's roster of `2582da86` · `608748e2` · `8294a715` (inside the §0he.1/§0he.2 grants) stands at unchanged bytes. ⟨`git log --oneline 9edd3d8d3^..HEAD -- scripts/dev/dev.sh \| wc -l`⟩ → `0`. **Clean.**
- **(3) Masking.** There is no new diff, so Check 1's masking sweep of the RESUME 3 diffs stands. Both repairs left `ci.yml:31` alone and skipped no step, which is lawful. **Clean.**
- **(4) Commit families.** One commit per meaning, one record commit per seat. **Clean.**
- **(5) E-3.** ⟨`git diff --stat 9edd3d8d3^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/conformance`⟩ → empty. **Held.**
- **(6) Mail.** ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ over value V/ + V/coordination · glass BK/coordination + BL + BL/audit (newest `BL`, ⟨`ls -dt`⟩) · kf V/coordination → glass `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md` only. That is the same pair Checks 1 and 2 adjudicated. ⟨`git -C glass-ui log -1 -- docs/tranches/BL`⟩ → `b4b6b76ee`, which is Check 2's tip, so there are no new lines. INBOX has no UNREAD row in KF.W3 scope (I-79 is routed by §0he.4 outside this wave). **UNREAD in scope: 0.**
- **(7) Four-verb line.** IMPLEMENTED was not advanced and the row stays PARTIAL. That is lawful, because the close order is not complete.
- **(8) Goal criterion.** **MET at the bytes.** `CALL-MAP.md` spans both organs. There is exactly one `serializeCssValue` provider (value `./css`, with 0 kf fork defs). There is exactly one `reverseAnimationShorthand` (`css-text.ts:33`), and its provider prose is true.
- **(9) Published figures.** These reproduce: 0/1548, sha1 `d488535c9bfc`, 19 / 235, 130 + 19 = 149, 14 evidence files, the 4m40s cancelled library job, and the skipped deploy.

### Axis 10 — honest-RED adjudication

**kf CI `library gates` cancelled (ESC-KFW3-d3-1) → deploy-pages skipped → §6 + probe ×2 owed: UNRELIEVED, unchanged since Check 1.**
- It is not producer-owned: the budget is kf's own `.github/workflows/ci.yml:31`.
- The spec does not route it to a later wave. The conjunct is COHESION §0he.3 / §0hd.5, and no §Excluded row, lock or cross-edge in KF-W3.md routes it elsewhere.
- It has no spec-named honest-RED id.
- An owner is named: the orchestrator ruling on ESC-KFW3-d3-1, then the `.d3` re-run. A named owner without spec relief does not make the RED honest, so the HIGH stands.

G-KF3-8's pageerror arm is a FLOOR (spec §Gates), outside the close set. **Honest-RED set: none.**

### Successor conjuncts

⟨`grep -nE '[Oo]pens after' docs/tranches/X/*/waves/*.md \| grep 'KF\.W3'`⟩ → KF-W7 `:61`, KF-W10 `:47` and KF-W4 `:55`. Each is a citation inside a bounds or provenance cell, not a conjunct on KF.W3, so no successor wave is gated on this row. Two dependants are lawfully blocked on the deploy conjunct:
- X-W11's VERIFIED stamp (§0hb.3). Its `npm ls → 4.1.0` conjunct is GREEN.
- §0he.4's post-KF.W3 keyframes minor.

**Count**: I reproduced 12 claimed GREENs: G-KF3-1…7, the fence + UIA-KF-177, check, G9, the demo roster on CI, and the library job steps (`success` up to the cancel). 0 claimed GREENs failed. kf vitest whole is banked, not re-read. There is 1 RED (the library job cancel) and 3 acts are owed.

### Register

| severity | claim | receipt | cure |
| --- | --- | --- | --- |
| HIGH | §0he.3 / §0hd.5's ruled close order is still unfinished, with no change since Check 1. kf CI is not GREEN because the library job was `cancelled` at the 4-minute `ci.yml:31` budget. As a result deploy-pages was skipped, and §6 and the post-deploy probe ×2 (the G-KF3-8 pageerror arm) never ran. It has no spec relief and no honest-RED id, and it is not producer-owned. ESC-KFW3-d3-1 is unruled. | CI `41504991466` (library `cancelled` 4m40s, demo `success`); deploy `41505833861` `skipped`; ⟨`grep -n ESC-KFW3-d3-1 docs/tranches/X/COHESION.md`⟩ → none; ⟨`grep -n timeout-minutes .github/workflows/ci.yml`⟩ (kf) → `31: 4` · `103: 50` | the orchestrator rules ESC-KFW3-d3-1 (a budget that fits the measured step sum, or a job split, with no step skipped). Then the `.d3` re-run: CI GREEN → deploy-pages → §6 → probe ×2 → close → fresh check |
| MINOR | `demo/state/animationOptionsStore.ts:95-96` seeds fresh entries as `${duration}ms`. That is lossless, but it is not the authored unit. | Close 5 residual 2; Repairs 1–2 escalated | the post-W3 keyframes minor (§0he.4) or a granted seat |
| INFO | `scripts/gates/visual/index.mjs` + `register-census.mjs` pass null to `navToScene`, which costs 12 s waits but no assertions | Close 5 residual 3 | the post-W3 keyframes minor |
| INFO | throw sites 2 → 2 | Close 5 residual 4 | KF.W7 / KF.W2 posture (L-5) |
| INFO | every local run's tree includes the sibling's dirty `KeyframeTimeline.vue` | ⟨`git status --porcelain`⟩ | none |

**LEDGER**: not promoted. The row stays PARTIAL, and an event line is appended.

## RESUME 4 — Open (2026-11-02, seat 0, `claude-opus-5-5`, on COHESION §0hg)

SERVED MODEL: claude-opus-5-5.

**Mode**: RESUME (fourth). Ledger row 66 status before: `OPEN 2026-09-17 (RESUME 3 …) · PARTIAL — …` (not CLOSED), and this record exists, so this is a resume. Authority: COHESION §0hg (2026-11-02, read whole, `COHESION.md:5151-5158`). §0hg.1 rules ESC-KFW3-d3-1: kf `ci.yml:31` `timeout-minutes: 4 → 10`, a hang guard re-set to fit the measured step sum (~4m31s), with a one-line YAML comment citing the sum and §0hg. §0hg.2: no job split; no step skipped, reordered or relaxed. §0hg.3: not a lucky re-run; the cure is written, pushed, and the §0he.3 close order resumes from its CI step. §0hg.4 routes Close 5's residuals (`animationOptionsStore.ts:95-96`; the two gate scripts' `navToScene(null)` waits) to the post-W3 keyframes minor (§0he.4), outside this wave. §0he, §0hd, §0hb stand.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged); ⟨`git status --porcelain -- .github`⟩ → empty. vjs record / LEDGER / INBOX / evidence/W3 → empty. **0 inherited paths.** kf `HEAD` = `origin/master` = `8294a715` (⟨`git ls-remote origin master`⟩ → `8294a7156f85`); no kf commit since Close 5.

**Already done (commits exist, never re-dispatched)**: `.a` · `.b` · `.c1` `c18a9bd9` · `.c3` `bc37f98f` · `.c4` `4ed542d5` · `.c5` `17a5c34d` · `.d` `d4148cdc` · `.c2b` `8ca052ad` · `.reg` `2f498f0e` · `.sp` `f59d5259` · `.ps` `6a4556d3` · Repair 1 README `fb87dbcd` · `.bis` `2582da86`+`608748e2` · `.u177` `8294a715` (all pushed). `.d2` and `.d3` are superseded by `.d4` (the same ship-and-close act, now with the §0hg cure in front of it).

**Preconditions**: RC-P(4.1.0) TRUE banked at this record's Open and reproduced ×2 at Check 3 post-Close 5 (`TOTAL 0 throws / 1548 calls`). The owed unit's only new precondition is the §0hg ruling, which exists (`grep -n '§0hg' COHESION.md` → `5151`). **MET.**

**E13 Step-0 sweep** (9 paths): value V/ + V/coordination · glass BK/coordination + BL + BL/audit (⟨`ls -dt`⟩ → `BL BK BJ`) · kf V/coordination · atlas P/coordination + U + U/coordination (newest `U`). ⟨`find -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 10:40) → glass `BL/FORMATION-PROGRESS.md` + `BL/audit/INBOUND.md` (⟨`git -C glass-ui log -1 -- docs/tranches/BL`⟩ → `b4b6b76ee`, the tip Checks 1–3 adjudicated; out of scope) and atlas `U/STATE.md` + `U/REGISTRY.md` (untracked dir; their value.js/keyframes lines are the K-1/KF-1..KF-3 letter already rowed as I-79 and routed by §0he.4, and the U-F04 analysis note naming the kf pin — not mail addressed to value.js). **0 new rows; UNREAD in KF.W3 scope: 0.** A dated sweep line is appended to INBOX.

### RESUME 4 — Baseline (READ-ONLY, kf `8294a715`, value.js `291add68c`)

Only the owed unit's gates are read. Every other gate cites Check 3 post-Close 5's readings (12 claimed GREENs reproduced, 0 failed).

| gate | BEFORE | reading |
| --- | --- | --- |
| kf `ci.yml:31` budget (§0hg.1) | **RED at the bytes** | ⟨`grep -n timeout-minutes .github/workflows/ci.yml`⟩ → `31:        timeout-minutes: 4` · `103:        timeout-minutes: 50` |
| kf CI both jobs GREEN | **RED** | ⟨`gh run list -L 4`⟩ → `41504991466 ci cancelled 5m25s` (library job cancelled at the 4m budget; demo roster `success` per Check 3) · `41466910668 ci cancelled` |
| deploy-pages · §6 · post-deploy probe ×2 (G-KF3-8 arm) | **skipped / owed** | ⟨`gh run list -L 4`⟩ → `41505833861 deploy-pages skipped` · `41468193578 deploy-pages skipped`; §6 = `scripts/pages-deploy.sh:109-140` (⟨`sed -n 109p`⟩ → `# ── 6. Post-deploy validation — the round-trip oracle`) |
| G9 (`npm ls` → 4.1.0) | GREEN | cited (Check 3 post-Close 5) |

Note for `.d4`: the deploy job carries its own budget, ⟨`grep -n timeout-minutes .github/workflows/deploy-pages.yml`⟩ → `43: 5` · `79: 20`. It is not in §0hg's grant; a cancel there is a new ESCALATION, never a silent edit.

**greenBeforeCure**: none.

### RESUME 4 — Unit plan

Owed: `[.d4]`, one group. All seats `opus` (owner: Opus only). Machine law: every run through `guarded`; browser runs never `--light`; one browser per probe run, closed in `finally`.

| unit | sections | writable | gates | locks |
| --- | --- | --- | --- | --- |
| `.d4` the §0hg budget cure, ship + close | COHESION §0hg.1–3 · §0he.3 · §0hd.5 · §0hb.3 · spec §Gates G-KF3-8 (`KF-W3.md:261-265`) | kf `.github/workflows/ci.yml` (`:31` + one comment line only) · kf push (ordinary) · vjs `docs/tranches/X/keyframes/evidence/W3/CLOSE-RECEIPTS.md` (dated addendum) · this record · LEDGER (row 66 cells + event line) | `ci.yml:31` reads `10` with the §0hg comment · kf CI GREEN on BOTH jobs at that head (no re-run, no `workflow_dispatch`) · deploy-pages `success` · §6 round-trip · post-deploy probe ×2 `/#/easing` + `/#/spring` pageerror 0 · G9 → 4.1.0 | one commit (the budget line + comment); no job split, no step skipped/reordered/relaxed (§0hg.2); never force-push; then close + fresh check; X-W11 VERIFIED stamp is Track A's (§0hb.3) |

#### Brief (the dispatched text)

- **`.d4`** (§0hg):
  1. In kf, edit `.github/workflows/ci.yml:31` `timeout-minutes: 4` → `10`, with a one-line YAML comment citing the measured step sum (~4m31s: npm ci 35s · types 22s · build 9s · correctness 56s · demo correctness 1m55s · lint 5s · proof:publish 16s) and COHESION §0hg. Change nothing else.
  2. Pathspec commit, ordinary push to `origin master`.
  3. Watch the push-triggered ci run: BOTH jobs GREEN. Never re-run, never `workflow_dispatch`. A new RED outside the concern = ESCALATE with the log.
  4. deploy-pages `success`; run the §6 round-trip (`scripts/pages-deploy.sh:109-140`).
  5. Post-deploy probe ×2 of `https://keyframes.babb.dev` `/#/easing` + `/#/spring`, pageerror 0 (G-KF3-8 arm), via `guarded`, one browser per run, closed in `finally`.
  6. G9 → 4.1.0. Write the CLOSE-RECEIPTS addendum, a `## Close 6`, the LEDGER cells + an event line; hand to a fresh check.

## RESUME 4 — Unit receipts

### .d4

SERVED MODEL: claude-opus-5-5. Sections: COHESION §0hg.1–3 · §0he.3 · §0hd.5 · §0hb.3 · spec G-KF3-8 (`KF-W3.md:261-265`) · RESUME 4 Unit plan. Full receipts: `keyframes/evidence/W3/CLOSE-RECEIPTS.md` § Addendum `.d4` (d4.1–d4.6).

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged). vjs writable paths: clean. **0 inherited paths.** kf `HEAD` = `origin/master` = `8294a715` before the act.

**Acts, in order.**
1. **The §0hg.1 cure.** Anchor at true bytes: ⟨`sed -n 31p .github/workflows/ci.yml`⟩ → `        timeout-minutes: 4` (holds). Edited `:31` alone to `timeout-minutes: 10` with the one-line comment trailing on the same line (keeps the `:31` anchor; one comment, no other line): `# hang guard, not a perf bar: ~2.2x the measured step sum ~4m31s (npm ci 35s, types 22s, build 9s, correctness 56s, demo correctness 1m55s, lint 5s, proof:publish 16s); COHESION §0hg`. ⟨`git diff --stat`⟩ (ci.yml) → `1 file changed, 1 insertion(+), 1 deletion(-)`. ⟨`ruby -ryaml … ["jobs"]["gates"]["timeout-minutes"]`⟩ → `10`. ⟨`grep -n timeout-minutes ci.yml`⟩ → `31: … 10 …` · `103: 50` (unchanged). No job split, no step touched (§0hg.2).
2. **Commit + push.** Pathspec commit **`1fd86e04`** (`-- .github/workflows/ci.yml`; ⟨`git show --stat`⟩ → `1 file changed`). ⟨`git push origin master`⟩ → `8294a715..1fd86e04  master -> master` (ordinary, no force).
3. **kf CI `41512393978`** (push, `1fd86e04`) → run `success`: library job `success` (3 m 29 s; correctness `127 passed | 5 skipped (132)` files, demo correctness `167 passed (167)`, lint, publish boundary) · demo job `success` (oracles `5 passed (5)`, roster `passed: 6/6`). No re-run, no dispatch. This run's library time would have fit 4 m too; the prior four cancels (4 m 05 s – 4 m 36 s) are the variance §0hg.1 absorbs.
4. **deploy-pages `41513147414` → success** (preflight + ship). §6 in-job: `Round-trip VALIDATED: https://keyframes.babb.dev serves the built bundle (index-CoV850J-.js), HTTP 200.`; re-read ×2 by this seat → `200 assets/index-CoV850J-.js`.
5. **Probe ×2** via `guarded` (browser pool, one headless chromium, context per route, closed in `finally`): the staged `d3-probe.mjs` could not resolve `playwright` from kf (kf has none installed; `Cannot find module`, not counted); re-staged as `/Users/mkbabb/Programming/.kf-d3-logs/d4/d4-probe.mjs` resolving from value.js → runs 1 and 2: `/#/easing pageerror=0` · `/#/spring pageerror=0` · `TOTAL pageerror=0`; `leftovers_killed=0`.
6. **G9** ⟨`npm ls @mkbabb/value.js`⟩ ×2 → `2 value.js@4.1.0`, 0 other. GREEN.

**Commits.** kf `1fd86e04` (ci.yml:31, pushed). vjs: this record + CLOSE-RECEIPTS addendum `.d4` + LEDGER (one record commit).

**Gates BEFORE → AFTER.** ci.yml:31 RED→**GREEN** · kf CI both jobs RED→**GREEN** · deploy-pages skipped→**GREEN** · §6 not run→**GREEN** · probe ×2 not run→**GREEN** · G9 GREEN→**GREEN**.

**Adjacent edits:** none. **Escalations:** none. **Residuals:** §0hg.4's routed rows (`animationOptionsStore.ts:95-96`; gate scripts' `navToScene(null)` waits) stand, routed to the post-W3 keyframes minor (§0he.4); deploy log's pre-existing `Could not capture rollback target` line (not this concern).

## Close 6 — 2026-11-02 (seat `.d4`, `claude-opus-5-5`): CLOSE-READY, handed to a fresh check

kf origin/master is `1fd86e04`. ESC-KFW3-d3-1 is cured at the root per §0hg (budget 4→10, hang guard). The §0he.3 / §0hd.5 close order is discharged: kf CI `41512393978` GREEN on both jobs → deploy-pages `41513147414` success → §6 round-trip VALIDATED → post-deploy probe ×2 pageerror 0 on `/#/easing` + `/#/spring` (G-KF3-8 arm) → G9 4.1.0. Every other gate cites Check 3 post-Close 5 (12 GREENs reproduced). The row moves to CLOSE-READY pending a fresh adversarial check; X-W11's VERIFIED stamp (§0hb.3) is Track A's after that check.

## Close 7 — 2026-11-02 (CLOSE SEAT, RESUME 4 unit `.d4`, `claude-opus-5-5`, VERIFY-ONLY): IMPLEMENTED

SERVED MODEL: claude-opus-5-5. Substrate: kf `HEAD` = `origin/master` = `1fd86e04` (⟨`git fetch && git log -1 --format=%h origin/master`⟩ → `1fd86e04`); value.js `65b93354a`. Crash-recovery: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (the sibling's, §0hb.1; never staged); vjs record / LEDGER / evidence/W3 clean. **0 inherited paths.** This seat cured nothing. Logs: `/Users/mkbabb/Programming/.kf-close7-logs/`.

**Commit roster and writable-set check** (⟨`git show --stat <c>`⟩):

| unit | commit | files | in writable set |
| --- | --- | --- | --- |
| `.d4` | kf `1fd86e04` | `.github/workflows/ci.yml` (`1 file changed, 1 insertion(+), 1 deletion(-)`; the diff is `:31` `timeout-minutes: 4` → `10 # hang guard … COHESION §0hg`) | YES (`:31` + the one comment, trailing on the same line) |
| `.d4` | vjs `65b93354a` | `execution/B/KF-W3.md` · `execution/LEDGER.md` · `keyframes/evidence/W3/CLOSE-RECEIPTS.md` | YES |

**landedWrong: none.** No commit touches glass-ui, a pin, a step, a job, or `KeyframeTimeline.vue`; `ci.yml:103` still reads `timeout-minutes: 50`.

**Gates re-run by this seat at kf `1fd86e04`.** Every heavy run went through `guarded`; vitest `--maxWorkers=2`; one heavy run at a time.

| gate | BEFORE (RESUME 4 baseline / Close 5) | AFTER (this seat) |
| --- | --- | --- |
| G-KF3-1 | GREEN | **GREEN**: ⟨`grep -rln RC-P docs/tranches/X/fourier/ \| wc -l`⟩ → `1`; `evidence/W3/rc-p-4.1.0.md` present (14 files in `evidence/W3/`) |
| G-KF3-2 | GREEN | **GREEN ×2**: ⟨`npm pack @mkbabb/value.js@4.1.0`⟩ sha1 `d488535c9bfc` = ⟨`npm view … dist.shasum`⟩ `d488535c9bfc`; the unmodified probe (sha256 `77678a574d7c6b11`) symlinked into the untarred mirror, ⟨`npm_config_ignore_scripts=true guarded --light -- node --preserve-symlinks-main --preserve-symlinks …/r1-published-totality.mjs`⟩ ×2 → `TOTAL 0 throws / 1548 calls` · `DISTINCT FAILURE MODES: 0` · `GREEN — every public parser is total.`, rc 0 both |
| G-KF3-3 | GREEN | **GREEN ×2**: roster re-derived at HEAD by the spec's command (`git grep -l -E '@mkbabb/value\.js/css\|parseCss(Color\|Scalar\|Values)\|parseTimingFunction\|serializeCssValue\|reverseAnimationShorthand\|cssIdent' HEAD -- test/` ∪ `git grep -l serialize-value HEAD -- test/`, `.test.ts`) → 19 files; ⟨`guarded -- npx vitest run --maxWorkers=2 <roster>`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` both |
| G-KF3-4 | GREEN | **GREEN**: `unserializable` in src+demo → `0`; fork defs → `0`; `serializeCssValue` from `@mkbabb/value.js/css` → `serialize-value.ts:2` · `timelineEngine.ts:2`; pin `package.json:71` `"4.1.0"`; INBOX `O-11 §B` → `1` |
| G-KF3-5 | GREEN | **GREEN**: one def `css-text.ts:33`; ⟨`git grep -n "value.js's OWN" HEAD -- src`⟩ → `internal/leaves.ts:8` only (the `/math` subpath, outside the census-2 predicate) |
| G-KF3-6 + boot fence + invariant/bypass | GREEN | **GREEN ×2**: INBOX `O-11 §D2` → `1`; the 5-file fence (`public-surface` · `easing-identity` · `timing-function-names` · `orchestration-api` · `serialize-invariant`) ×2 → `Test Files 5 passed (5)` · `Tests 130 passed (130)` both |
| G-KF3-7 | GREEN | **GREEN**: `evidence/W3/CALL-MAP.md` present |
| UIA-KF-177 | GREEN | **GREEN ×2**: the 3 files ×2 → `Test Files 3 passed (3)` · `Tests 19 passed (19)` both |
| kf `npm run check` | GREEN | **GREEN ×2**: ⟨`guarded --light -- npm run check`⟩ rc 0 ×2; ends `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` |
| kf vitest whole | GREEN | **GREEN ×2**: ⟨`guarded --timeout 25 -- npx vitest run --maxWorkers=2`⟩ rc 0 ×2 → `Test Files 296 passed \| 5 skipped (301)` · `Tests 2318 passed \| 2 expected fail \| 14 skipped (2334)` both (shared tree incl. the sibling's uncommitted `KeyframeTimeline.vue`) |
| kf `ci.yml:31` budget (§0hg.1) | RED (`4`) | **GREEN**: ⟨`grep -n timeout-minutes ci.yml`⟩ → `31: … 10 # hang guard …` · `103: 50`; ⟨`ruby -ryaml … ["jobs"]["gates"]["timeout-minutes"]`⟩ → `10` |
| kf CI both jobs | RED (cancelled) | **GREEN**: ⟨`gh run view 41512393978 --json jobs,headSha,event`⟩ → head `1fd86e04`, event `push`; `library gates … success` (19:42:16Z–19:45:45Z, 3m29s) · `demo correctness (browser roster) success` (–19:47:02Z). No re-run, no dispatch (one ci run at that head in ⟨`gh run list -L 5`⟩) |
| deploy-pages | skipped | **GREEN**: `41513147414` head `1fd86e04` → `preflight … success` · `build demo + ship → Cloudflare Pages success` |
| §6 round-trip | owed | **GREEN**: in-job log `Round-trip VALIDATED: https://keyframes.babb.dev serves the built bundle (index-CoV850J-.js)`; this seat ⟨`curl -s https://keyframes.babb.dev/ \| grep -o 'assets/index-…js'`⟩ ×2 → `assets/index-CoV850J-.js`, asset HTTP `200` ×2 |
| post-deploy probe ×2 (G-KF3-8 pageerror arm) | owed | **GREEN ×2**: ⟨`guarded --timeout 5 -- node .kf-close7-logs/c7-probe.mjs`⟩ (the `.d4` probe, copied unchanged; one headless chromium, context per route, closed in `finally`) ×2 → `/#/easing status=200 pageerror=0` · `/#/spring status=200 pageerror=0` · `TOTAL pageerror=0`, rc 0 both |
| G9 | GREEN | **GREEN ×2**: ⟨`npm ls @mkbabb/value.js`⟩ ×2 → `2 value.js@4.1.0`, 0 other versions |
| G-KF3-8 / G-KF3-9 | floors | not close gates (spec §Gates) |

**Verification artefacts.** The spec names no separate §Verification Artefacts block; the evidence bank `docs/tranches/X/keyframes/evidence/W3/` holds 14 files (⟨`ls | wc -l`⟩ → `14`), incl. `rc-p-4.1.0.md`, `CALL-MAP.md` and `CLOSE-RECEIPTS.md` (Addendum `.d4` present).

**E13.** Swept again: value V/ + V/coordination · glass BK/coordination + BL + BL/audit (⟨`ls -dt`⟩ newest `BL`) · keyframes V/coordination · atlas P/coordination + U + U/coordination. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-11-02 14:40) → only atlas `U/STATE.md` (its new lines are the B7e/B8 atlas+glass log, N-1 traced to glass; no row addressed to value.js or keyframes.js; the KF-1..KF-3/K-1 letter is I-79, already rowed). INBOX open row: I-79 `UNREAD`, routed by §0he.4 to the post-KF.W3 keyframes minor — outside this wave's scope. **No UNREAD mail in scope.**

**Residuals (named owners).**
1. `demo/state/animationOptionsStore.ts:95-96` seeds fresh entries as `${duration}ms` (not the authored unit). Owner: the post-W3 keyframes minor (§0he.4 / §0hg.4).
2. `scripts/gates/visual/index.mjs` + `scripts/gates/register-census.mjs` pass null to `navToScene` (12 s ceiling wait, not an assertion). Owner: the post-W3 keyframes minor (§0hg.4).
3. Throw sites 2 → 2 (seam invariant + `timelineEngine.ts` refusal). Owner: KF.W7 / KF.W2 posture (L-5).
4. deploy log `Could not capture rollback target` (pre-existing `pages-deploy.sh` rollback-capture line, outside §0hg). Owner: the post-W3 keyframes minor.
5. I-79 (atlas K-1 + KF-1..KF-3 letter). Owner: the post-KF.W3 keyframes minor (§0he.4).
6. X-W11's VERIFIED stamp (§0hb.3). Owner: Track A, after a fresh check of this close.

**Escalations**: none (ESC-KFW3-d3-1 cured at kf `1fd86e04`). **Adjacent edits**: none.

**Four-verb line**: **IMPLEMENTED — ADVANCED** (spec §State: *"gates green + bytes landed in the named execution site stamps this"*; all seven close gates plus the §0he.3 close order — CI GREEN both jobs → deploy-pages → §6 → probe ×2 — are GREEN at kf `1fd86e04`). VERIFIED is **not** this seat's to stamp (spec §State; §0hb.3 → Track A).
