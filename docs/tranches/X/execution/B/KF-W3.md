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
