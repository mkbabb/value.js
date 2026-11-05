# X realization — the PLANNING pass (2026-11-04)

**Order.** The owner, 2026-11-04, verbatim: "Ensure that our tranche extant, the megatranche, items aare fully realized and refined with design and planning passes thereof. What of the bbnf and parse-that items, too, fro mthe above?" Standing orders: the 2026-09-17 begin-word ("NO quick solutions, NO workarounds … completed the plan IN TOTALITY") and the post-reboot "No deferring any item to another time."

**Inputs.** The three DESIGN passes in this directory: `value-DESIGN.md` (V-D1..V-D12, A-1..A-16), `keyframes-DESIGN.md` (K-D1..K-D13, K-A1..K-A7) and `fourier-DESIGN.md` (F-D1..F-D14, O-F1..O-F6). The X·P track (parse-that and bbnf-lang) is `parse-that/waves/W9.md` and `W10.md`, executed per `execution/D/X-P-W9.md` and `X-P-W10.md` (COHESION §0ht/§0hu/§0ht.1/§0hv). This plan orders every unit, names each unit's exit gate, and records the relays sent. It adds no new cure: each cure and falsifier is the DESIGN text, cited by unit id.

**Substrate read at planning (2026-11-04).**

| Coordinate | Value |
|---|---|
| value.js | tranche-u local `0f38a7004`, origin `ea610c4e8`; CI `41947389018` + webkit-hosted `41947388833` in progress on `d7dd55353` (another seat's push). npm latest **4.2.0**. |
| keyframes.js | master `36a73f89`; npm latest **6.2.1**; pins value **4.2.0** exact and glass **10.1.3** exact. |
| fourier-analysis | master `5001d2f`; pins glass **10.1.3**, value `^4.0.0` (installs 4.0.0), kf `^6.0.0`. |
| glass-ui | npm latest **10.1.4**; **10.1.5 not published** (`npm view @mkbabb/glass-ui version` → 10.1.4). Live session **glass-ui-c7** (glass-ui-b5 not live). |
| parse-that / bbnf-lang | npm 2.0.0 / 0.2.0, both without provenance; bbnf-lang 0.3.0 merged (`7bd8e7a14`) and unpublished; bbnf-lang has `release.yml`, parse-that does not yet. |

**Law in every unit.** `~/.claude/guard/guarded` for every run; browser runs never `--light`; WebKit `--exclusive webkit`; vitest `--maxWorkers=2`; playwright `--workers=1`; pytest without `-n`; fourier `COMPUTE_CONCURRENCY=1`; one heavy run per seat; probes close in `finally`. Falsifier RED before, GREEN after, ×2; frames Read. Commits by pathspec; COHESION, LEDGER and sealed docs take addenda only (E-3). Glass read-only; identity colour/type/motion are owner rulings. Durable scratch in `~/.dev-logs/`. Goldens re-minted only by counterfactual attribution.

**Universal unit exit gate (U-GATE).** A unit closes only when: (1) its falsifier is RED-before and GREEN-after ×2 (or, for a records unit, its check script exits 0 ×2); (2) its frames are Read and banked; (3) any re-mint has its attribution table; (4) it is committed by pathspec; (5) CI is green on the head; (6) a deployed unit has its served reads ×2 on prod; (7) one COHESION addendum and one LEDGER event name it. Below, "gate" names the unit-specific conjuncts on top of U-GATE.

---

## 1 · Gates between apps and releases

```
X·P .rel ─► parse-that/bbnf-lang publish ─► .pin ─► value 4.2.1 ─► W10 (.t10 .m10 .s10 .v10 .r10 .k10) + V-D4.2 ─► value 4.3.0
                                                                                                             │
                     kf K-D5 ─► 6.2.2 ; K-D6 ─► 6.3.0 ─────────────────────────────────┐                     ├─► kf KV (repin value 4.3.0)
                                                                                       ├─► fourier F-D11 (exact repins, last in fourier web)
glass 10.1.5 (npm) ─► V-G1 · K-G1 · F-G1 ─► V-D10 (Playwright, after V-G1)              └─► glass K-1 (O-141, 10.2.0 pins kf exact)
glass 10.2.0 (npm) ─► V-G2 · K-G2 · F-G2 (+ F-D13 if O-147 rides it)
glass 11.0.0 (npm) ─► V-G3 · K-G3 · F-G3
```

- **Value before kf consumers.** kf pins value exact; kf's repin (KV) runs only after a value cut is on npm, and fourier's F-D11 repins whatever is the latest exact value and kf versions at its execution (4.3.0 and 6.3.0 if cut by then).
- **Glass gates.** Each glass-held unit opens on two facts read at the time: glass's publish ping, and `npm view @mkbabb/glass-ui version` showing the version. 10.1.5 is adopted when it is on npm; 10.1.4 is skipped by ruling in all three apps.
- **Playwright after 10.1.5.** V-D10 lands after V-G1 so the two re-mint sets never mix attribution.
- **Records first.** V-D8 authors `records-check.mjs`; K-D9 extends it, so V-D8 precedes K-D9.
- **Deploy truth first in fourier.** F-D1 precedes every fourier served read.

---

## 2 · value.js waves (serial)

| Wave | Units | Opens on |
|---|---|---|
| VW0 | V-D2, V-D8 | now |
| VW1 | V-D1, V-D6 | VW0 |
| VW2 | V-D3, V-D4, V-D5, V-D7 | VW1 |
| VW3 | V-D9, V-D11 | VW2 |
| VW4 (library) | 4.2.1 at X·P `.pin`; 4.3.0 at W10 + V-D4.2 | X·P (§5) |
| VG | V-G1 → V-D10 → V-G2 → V-G3 | glass publishes |

| Unit | Items | Cure (DESIGN §) | Falsifier | Exit gate |
|---|---|---|---|---|
| V-D2 | OD-PROD-REREADS | Re-run OD-12 light (the r1 desk log is 0 B), then one "§0hu prod readings" addendum quoting r1..r3 rows verbatim | addendum rows byte-equal to log JSON; OD-12 light log non-empty ×2 cells | diff empty; OD-12 teal 0.057 reported under A-2, never loosened |
| V-D8 | O-132/O-133 id, Annex A `ESC-R1-XP-REST.`, LEDGER:28–42 labels, MT-REGISTER, X-W12 lineage (value half), CARRY-LEDGER §B–§F, INDEX hygiene | dated addenda (INBOX erratum, Annex A regenerated, wave-label + MT→X + CARRY crosswalks); lineage rows written at each adoption | `records-check.mjs` RED today on every leg | `records-check.mjs` exit 0 ×2; never commits with the bare index |
| V-D1 | OD-19-SPECTRUM + 844×390 cell | `.spectrum-figure` size container; one `block-size: clamp(100cqi/φ√φ, 20svh, 100cqi/φ)`; tokens in foundation.css + DESIGN §3.1 | `e2e/smoke/od19-spectrum-aspect.spec.ts` (8 viewports × picker/mix × themes): RED 3.741 / 2.648 | 1.6 ≤ aspect ≤ 2.5 everywhere, ≤ 2.07 where the min binds; Z-chassis-2/3, Z-LG-3, pointer mapping unchanged; prod ×2 at 844×390/1440/1800/2560/3440. Coordinate with `wf_014d8c52` (it holds the dirty `SpectrumCanvas.vue`): one rule lands, the other seat reads F-V-D1 |
| V-D6 | BC-PCS-30 / H-c | delete the inert `@mkbabb/value.js*` paths block in `tsconfig.demo.json` | planted `@mkbabb/value.js/parsing` import errors after | vue-tsc clean; alias/exports parity equal |
| V-D3 | BC-R-4/6/14/15/16/18/19/22/24/26, BC-PCS-10 | chip module pass: `aspect-ratio: 2.618`, `data-color-surface`, one `stopsToGradient`, dead code, k guard, memo, totality, map truth, `data-stops` kept as contract, one `CompactPalette` | `color-chips.test.ts` (NaN k, bad stop, byte-equal serializer); e2e φ² at 12/16/24 px, forced-colors, "+k" at 390 | all RED→GREEN ×2; `grep 'linear-gradient(to right' demo` = 0 |
| V-D4 | BC-CNL-4/8/9/11/16/17/24/25 | `defineProps<{space}>`; library `contrastInk → Result` (ships in 4.3.0); linear-light composite; φ rhythm, no Separators; `<dl>` grids; drop hover; `<bdi>`; aria-hidden icons | unit `contrastInk` refusal + composite 1e-6; e2e 0 separators, gutter ≤ φ3+1 at 1800, rtl, axe, keyboard | ×2 GREEN; library export lands in the 4.3.0 cut (VW4) |
| V-D5 | BC-PCS-9, D57, BC-PCS-31 | `demo/palettes/index.ts` seam + eslint restriction; move `usePaletteExport` beside serializers; D57 terminal row; rtl SVG order | planted deep import fails lint; rtl SVG unit | lint RED→GREEN; vue-tsc clean |
| V-D7 | AB-4/AB-5 | PaneShell-local `onErrorCaptured` boundary with Retry | `e2e/smoke/pane-boundary.spec.ts` (9 panes, `?__throw=` e2e-mode only) | siblings and dock live ×2 |
| V-D9 | WEBKIT-HOSTED | scoped `@no-gl` manifest on hosted; WebGL truth on the darwin cell (ruled via A-16) | 2 consecutive hosted greens; planted GL spec refused | green ×2, non-gating until then |
| V-D11 | RC-P 4.2.0, R-2 drift, L-G1 (value half), O-104 acks | RC-P on the 4.2.0 tarball; new `scripts/probes/drift-subpath.mjs` | RC-P 5 conjuncts ×2; drift probe exit 0 at 4.2.0 | banked to `bench/records/rc-p-4.2.0/`; L-G1 and O-104 close with X·P `.rd` / `.o104` |
| V-G1 | 10.1.5: OD-1/5/5b, OD-16, OD-17/13, D-5, D-6, D-9, D-23 | exact repin `@mkbabb/glass-ui@10.1.5`, lock integrity = registry | served reads ×2: rx==ry; seal settle ≤ 0.5 px (WebKit+Chromium); ring ⊂ clip; thumb equal min/mid/max; input/subtitle ≤ 1.25 | **opens when 10.1.5 is on npm** + O-134 answered; CI 8/8; §0ga merge; deploy |
| V-D10 | R19-5 | Playwright bump on its own branch; binary-only attribution re-mint | `--version` = pin; 100 % attributed; e2e ×2 | after V-G1; CI 8/8; darwin WebKit ×2; §0ga merge |
| V-G2 | 10.2.0: OD-12-DARK/D-10, OD-14/18, D-11/12, VITEST-HELD ×5, O-87/88, ESC-SS8r-0132, 5 O-104 rows | flip `DARK_FIELD_SEED_FAITHFUL`, unwrap `it.fails` | ss8-b09 6/6; ΔE table ×2; tool-click traces ×2; Tools ink ≥ 4.5 | **opens on 10.2.0 on npm** + O-135 answered; producer-held shrinks by exactly these rows |
| V-G3 | 11.0.0: E2E-HELD ×4, 14 O-104, perf rows, D-35, O-106 | repin; delete `test.fail` rows | each row GREEN ×2; perf on the real-GPU cell ×2; O-106 `--exclusive webkit` ×2 | **opens on 11.0.0** + O-136 answered; grep for those O-ids in `test.fail`/`it.fails` = 0 |

---

## 3 · keyframes.js waves (serial)

| Wave | Units | Opens on |
|---|---|---|
| KW0 | K-D9, K-D8 | V-D8's `records-check.mjs` exists |
| KW1 | K-D5 (→ 6.2.2), K-D6 (→ 6.3.0), K-D7 | KW0 |
| KW2 | K-D1 + K-D2 (one deploy), then K-D4, K-D3 | KW1 |
| KW3 | K-D11, K-D13 (→ K-A3), K-D10, then the K-A7 gauntlet | KW2 deployed |
| KV | repin value 4.3.0 exact | value 4.3.0 on npm |
| KG | K-G1 (10.1.5) → K-G2 (10.2.0) → K-G3 (11.0.0) | glass publishes |

| Unit | Items | Cure | Falsifier | Exit gate |
|---|---|---|---|---|
| K-D9 | KF-REC-1, G-ID, G-TAX, INBOX O-63/65/66/67/68 | LEDGER events (`9bd5b335`, kf-m-checker, B7), COHESION addendum, evidence commit, INBOX erratum (fresh ids at write time), `KF-W5-ADDENDUM-GID.md`, G-TAX SUPERSEDED addenda | kf legs of `records-check.mjs` (RED today) | exit 0 ×2; kf-m-checker = 5 tracked files |
| K-D8 | CH-05 | ci.yml comments "nightly" → "weekly" | `grep -c nightly` 4 → 0; YAML parse clean | next scheduled run name matches |
| K-D5 | G-FROMSTRING | `this.templateFrames = []` at ingest head (and `fromKeyframes`) | unwrap two `it.fails` at `fromstring-idempotence.test.ts:73,88` + custom-transform `it` | library vitest ×2; **6.2.2 via release.yml** |
| K-D6 | KF.W8 G1/G2/G3 | `AnimationEngine.bumpLayoutEpoch` on the heavy accessor; `serializeSelector` to a value-free leaf on the light barrel; demo repointed | `from "@src/"` in demo 1 → 0; serializer bodies 2 → 1; `proof:publish` rows present | `proof:boundary` GREEN; **6.3.0 via release.yml** (feeds glass K-1, O-141) |
| K-D7 | KF.W8 G5 | `git mv` TimelineCaret into `components/`; repoint 2 importers (never touch the other seat's dirty `KeyframeTimeline.vue`) | `proof:structure` single-consumer leg 1 → 0 | vue-tsc + timeline vitest ×2 |
| K-D1 | D-28 sliver + instrument | `[data-rung="peek"] .fading-scroll { --fade-scroll-width: 0px }`; drop `+ ramp` in `rowBoundaryPeek` | probe leg `d28c`: no row straddles the clip edge (RED 690–730/698–739 vs 702) | `d28`, G2.x, M1 legs unchanged; gh-pages ×2 then prod ×2 |
| K-D2 | plate overflow at 844/390/1440, spring carriage phantom | `container: stage / size`; one short-plate rung; one SceneStageHeader row; bodies as remainders; plates stop scrolling; carriages in the plot | `scripts/probe/kf-stage-fit.mjs` (6 scenes × 6 viewports × themes) + SpringTrace unit | pointer-mapping and `kf-stage-and-orbit.mjs` unchanged; ×2 local, ×2 prod; attributed re-mint |
| K-D4 | KF-M-O2 | trace only (`kf-sheet-glide.mjs`) | CLS 0, stage Δ 0 px, p95 dt ≤ 20 ms, no frame > 33 ms | GREEN ×2 on the K-D1/K-D2 deploy; a RED re-opens K-D1 |
| K-D3 | KF-M-O1 (host half) | WebKit orbit witness (`--engine webkit`) | deltas match Chromium within G2.x; gesture* and touchmove write 0 | `guarded --exclusive webkit` ×2, banked to `evidence/realize/kf-o1/` |
| K-D11 | G-KFW9-2/4/6/7/8/9 | `MATRIX.md` + `ss13-residue.json`; -7 live PRM pair; -6 `.b` row | every cell has a verb; 0 verbless residue rows | -7 GREEN ×2; -8/-9 per K-A5 |
| K-D13 | OD-V3 | 16-cell transport-home packet | 16/16 cells Read and indexed | packet sent as K-A3; ruling appended to kf OWNER-DECISIONS |
| K-D10 | §0gf.6 | fresh adversarial critic over the deployed build | pass record with every finding dispositioned | discharged only by a CLEAN pass (pass 5+ if not) |
| KV | value 4.3.0 consumer | exact repin, lock integrity = registry | check + vitest ×2; CI both jobs | opens on value 4.3.0 on npm |
| K-G1 | KF-PIN-G, D-6, OD-16/17, seal | repin 10.1.5 | seal uniform per frame, settle ≤ 0.5 px, rings whole, thumb/input | **10.1.5 on npm** + O-139 |
| K-G2 | D-12, D-26 (after K-A2), KF-M-R2, O-89, O-62/66, K-1, OD19-K3/K5/K7, warm-swap, O-61/O-63/O-94/95/96/97 if placed | repin 10.2.0; delete the workarounds each seam replaces | 1440 expand dt ≤ 20 ms; no 844×390 ellipsis; EasingPicker round-trip; warm-swap ≤ 50 ms ×2 | **10.2.0 on npm** + O-137/O-138/O-141 answered |
| K-G3 | D-35, O-67 edge, DOCK-COLLAPSED-FORM, O-74a, O-92/O-93, OD-V5 | repin 11.0.0; subpath repoints | tooltip on every seat; OD-V5 row with frames | **11.0.0 on npm** + O-140/O-142 answered; W13R/W13V/W13X terminal addenda |

---

## 4 · fourier-analysis waves (serial)

| Wave | Units | Opens on |
|---|---|---|
| FW0 | F-D1 | now (host-log leg per O-F5) |
| FW1 | F-D3, F-D9, F-D10 | F-D1 records OK |
| FW2 (API) | F-D4 → F-D5 → F-D6, then F-D7, F-D12 | FW1 |
| FW3 (web) | F-D8 → F-D2 → F-D14a/b (F-D14c on O-F6 yes) → F-D11 | FW2 |
| FG | F-G1 (10.1.5) → F-G2 (10.2.0, with F-D13 if O-147 rides it) → F-G3 | glass publishes |
| F-TAIL | the inventory rows after O-97 (cut off in the design seat's input) | a follow-up design seat now; never dropped |

| Unit | Items | Cure | Falsifier | Exit gate |
|---|---|---|---|---|
| F-D1 | DEPLOY-ALERT-5001d2f (#3) | `RECORDED` flag + EXIT trap writes ABORTED; `flock -w` → TIMEOUT; REFUSED on dirty tree; deploy-alert learns ABORTED/TIMEOUT | 4 forced exits in `deploy-alert-fixture.sh` (RED: no record) | existing fixtures GREEN ×2; `/deploy-record.json` OK at master ×2, 60 s apart; #3 closed with the record |
| F-D3 | 0HM-F-RECORDS, D-27 | prod run ×2 (D-8, D-21, D-22, D-25, D-27); RED-before on `5001d2f^` worktree | each row's local falsifier on `5001d2f^` (RED) and `5001d2f` (GREEN) | prod rows ×2; `/equation` loads ≥ 20 s apart; COHESION §0hm addendum + LEDGER event |
| F-D9 | O-119/O-133, O-132 collision, G-F10-1/2 | fourier INBOX rows with verbs; co-sign conditional on F-D4; ADOPTION-ASKS addendum; value erratum | grep ≥ 11 verbed rows (0 today) | O-133 delivered when a fourier session is live; value INBOX READ+ACKED |
| F-D10 | G-12, G-15(d), G20(b), G-F4 carry(b)/census/anchors | dated addenda-beside each canonical doc | each gate's own leg RED→GREEN ×2 | anchors re-resolved at HEAD |
| F-D4 | FW6-G1..G4 | one `_write_version`; PATCH splits metadata/atoms; remix idiom; transaction | `tests/api/test_patch_versions.py` (4 cases) | pytest ×2 no `-n`; remix/provenance tests GREEN |
| F-D5 | FW6-G5/G6/G11 | `_readable_or_none` the only gate; unavailable crumbs; image readability; GETs never write; `POST …/view`; `DELETE /images/:slug` | pytest (a)–(d) | ×2; FR-GV-24 lock holds |
| F-D6 | FW6-G8/G9/G10/G12 | `actor` field; tier transition table; cascade by `content_hash`; response_model on every admin route | pytest (a)–(d) | ×2; 13/13 routes |
| F-D7 | FW6-G13/G14 | `EXTRACTION_FIELDS` + `_v` 4 + ast walk; editor bounds on POST; editor assets never overwritten | (a)–(c) | ×2 with `COMPUTE_CONCURRENCY=1` |
| F-D12 | F.W8 G3 (i) | `tests/conformance/test_c31_two_sided.py` as specified | control arm RED by construction, match arm GREEN | ×2 on the non-prod compose stack |
| F-D8 | g15, g16 | `normalizeBasisKey`; stylelint `no-naked-layer` in CI | grep 1 → 0; mutant fixture fails | ×2; CI lint step |
| F-D2 | D-17, D-17-GPU | static-layer OffscreenCanvas + cached Sum prefix (`useStaticLayer`) | software raster p50 ≤ 8.4 / p95 ≤ 16.7 ms at 1440 and 1800; real-GPU cell (`chrome`, ANGLE-Metal, need cited, `--cpu-cores 0`) p50 ≤ 8.4 ms, 0 frames > 33 ms; pixel guard at t=0.5/1 | ×2 before and after; darwin+linux pixel equality |
| F-D14a/b | proportion (/morph 844×390, readout) | shared short-landscape rule with /equation; readout inside the stage card | stage bottom ≤ 390, first slider visible; readout ⊂ card | ×2 both themes; 390/1440 goldens unchanged |
| F-D14c | breath of life (/equation first tab) | Canvas first at 390/430 | first-visit canvas in view, sweep p50 ≤ 9 ms | **only on O-F6 yes** (identity motion) |
| F-D11 | FOURIER-REPIN, ESC-4 | exact value repin (latest: 4.3.0 if cut, else 4.2.0) + kf latest + latex-paper 0.3.0; migrate retired names; glass stays 10.1.3 until F-G1 | `npm ls` exact; integrity = registry; sampler ≤ 4.563e-6 | vue-tsc, vitest, e2e ×2; ESC-4 bar per O-F3, literal RED without a ruling |
| F-G1 | D-9 (min+max), D-34 | repin 10.1.5 | thumb box equal at min/mid/max; c3g row deleted | **10.1.5 on npm** + O-143/O-144 |
| F-G2 | O-90 rows 4–7, contrast pairs, D-26 | repin 10.2.0 | admin axe GREEN ×2; pairs ≥ 3:1 | **10.2.0 on npm** + O-145/O-146/O-148 |
| F-D13 | F.W10-ACCEPTED, G-F9-8 | delete the `test.fixme` at `visualization-crud.spec.ts:641` on the pin that lifts the underline | keystone RED at 4.33:1, GREEN on the new pin; alone ×3, suite ×2 | on the release named in reply to O-147; LEDGER ACCEPTED event |
| F-G3 | any 11.0.0-placed fourier rows | repin | rows GREEN ×2 | 11.0.0 on npm |

---

## 5 · X·P (the bbnf and parse-that items) — the owner's second question

State (§0hu/§0ht.1/§0hv): `.e6`, `.pt`, `.vc9` (re-run r1), `.bl` (bbnf-lang 0.3.0 merged, unpublished), `.n` and W10 `.c10` (17,316 cases, 6,226 MISS born RED) are done. `.rel` is ruled ARM A (§0hv). The `parse-that-bbnf` workflow owns these repos and value `src/css`; value seats do not touch them.

| Wave | Unit | Items | Cure | Falsifier | Exit gate |
|---|---|---|---|---|---|
| PW9a | `.rel` | PT-4, BL-5 | tag-triggered `release.yml` with `--provenance` in parse-that (absent today) and bbnf-lang (present); `NPM_TOKEN` seeded; OIDC replaces it after O-131 | `npm view … dist.attestations` non-empty | parse-that 2.0.x and bbnf-lang 0.3.0 on npm with provenance |
| PW9b | `.pin` | ESC-W9-2 | value pins the published bbnf-lang/parse-that exactly; E-6 ceilings set to 15,050 / 6,050 gz | E-6 ×2 under the new ceilings; MIRROR 0 | **value 4.2.1** via release.yml with provenance |
| PW9c | `.rd` | L-G1 (+ V-D11 value half) | read only in a real quiet window (1-min load < 8) | the L-G1 cell ×2 | waited for, never claimed |
| PW9d | `.o104` | XP-5 | live delivery to parse-that, bbnf-lang, latex-paper sessions | rowed acks in INBOX | retried at W9 close; UNREACHABLE recorded until a session is live |
| PW10 | `.t10`, `.m10`, `.s10`, `.v10` | XP-11, W8t-COLOR-SPACE-NONE, `<urange>`, `var()` args | per W10.md (BBNF grammar only) | the `.c10` corpus slices RED→GREEN ×2 | open after `.pin` headroom |
| PW10 | `.r10` | XP-14 / DR-c | absolute-origin relative colour resolved at parse (ruled arm) | `.c10` relative-colour slice | after `.pin` |
| PW10 | `.k10` | XP-13 | calc-size → sibling-* → progress → anchor/anchor-size (ruled order) | per-claim slices | after `.pin` |
| PW10z | V-C close + cut | ESC-W9-1 | all W10 cures + V-D4.2 `contrastInk` | V-C MISS → 0 on claimed rows ×2 | **value 4.3.0** (one release); then KV and F-D11 |

Owner rulings still owed for X·P: **DR-a** (property-aware grammars; recommend keep) and **DR-b** (canonical specified-value serialization; recommend keep). Both go in the §7 packet.

---

## 6 · Relays sent (2026-11-04, SendMessage → glass-ui-c7; INBOX rows appended)

glass-ui-b5 was not live at send time; the live glass session was glass-ui-c7. Ids were allocated at send time (max on disk O-132). kf-DESIGN and fourier-DESIGN had both drafted O-137..O-142, so fourier's six are **O-143..O-148**.

| Id | Draft | Subject | Gates |
|---|---|---|---|
| O-133 | value V-D8.1 / F-D9 | fourier follow-up to O-119 (renumbered from value O-132) — **reserved, not sent**; deliver when a fourier session is live | F-D9 |
| O-134 | R-G1 | value 10.1.5 adoption + contents | V-G1 |
| O-135 | R-G2 | value 10.2.0 read set; D-26 hold; D-35 question | V-G2 |
| O-136 | R-G3 | value 11.0.0 placement; X-W12 lineage | V-G3, V-D8.5 |
| O-137 | R-K1 | PEEK 171 px floor | K-G2 (easing/sequence PEEK) |
| O-138 | R-K2 | 844×390 title ellipsis witness | K-G2 |
| O-139 | R-K3 | kf 10.1.5 adoption | K-G1 |
| O-140 | R-K4 | O-72 TOOLTIP-REVEAL re-send | K-G3 |
| O-141 | R-K5 | book O-69/O-70; place unplaced kf rows; K-1 | K-G2/K-G3 |
| O-142 | R-K6 | TILE-PRIMITIVE | K-G3 |
| O-143 | R-F1 | Slider thumb at min and max | F-G1 |
| O-144 | R-F2 | menu icon gap (r7) | F-G1 |
| O-145 | R-F3 | toast focus proxy | F-G2 |
| O-146 | R-F4 | contrast-floor pairs (value O-97 = glass O-98) | F-G2 |
| O-147 | R-F5 | SegmentedTabs inactive underline ≥ 4.5 | F-D13 |
| O-148 | R-F6 | D-22 token withdrawn; D-26 hold | F-G2 |

---

## 7 · Owner packet (one message; shared asks merged)

| Merged id | Sources | Ask (exact text in the DESIGN docs) | Recommendation |
|---|---|---|---|
| OA-1 | A-4 = K-A2 = O-F2 | dock press direction and depth; kf adopts? | press in, 0.96, every app, via `--dock-press-spring` |
| OA-2 | A-15 = O-F1 | fourier gallery is empty: publish daraksha.jpg + one portrait? | publish; no client-side fake |
| OA-3 | A-8 = K-A7 | arbiter seat under the Opus-only order | a fresh Opus arbiter |
| OA-4 | A-1 | color.babb.dev account slug for the Daraksha transfer | — |
| OA-5 | A-2 | OD-12 vs F-6; teal 0.057 seam floor | (a) OD-12 supersedes; (b) accept, re-read at V-G2 |
| OA-6 | A-3 | dead band: identity chroma or floor | — (identity) |
| OA-7 | A-5 | `@mbabb` mono handle | — (identity) |
| OA-8 | A-6 | chip hard stops vs amended law | hard stops |
| OA-9 | A-7 | npm trusted publishers (O-131) | — |
| OA-10 | A-9 | guard contention accepted as designed | accept |
| OA-11 | A-10 | `__Host-` HttpOnly session cookie | yes |
| OA-12 | A-11 | migrate-palettes dialog | — |
| OA-13 | A-12 | `scripts/dev/dev.sh`: commit or restore | — (no seat touches it) |
| OA-14 | A-13 | stale CARRY-LEDGER +34 lines | discard (V-D8.6 carries the substance) |
| OA-15 | A-14 | `.worktrees` adopt/discard | discard all but od19-mint until V-D1 |
| OA-16 | A-16 | webkit-hosted scoped green | yes |
| OA-17 | K-A1 | cube pan/zoom coast | keep (no coast) |
| OA-18 | K-A3 | transport home (after K-D13) | — (identity) |
| OA-19 | K-A4 | 10-min iOS Safari session | — |
| OA-20 | K-A5 | WHC cells UNREACHABLE-IN-CELL | rule unreachable |
| OA-21 | K-A6 | home hero over M. cubert at ≥ 1440 | — (identity) |
| OA-22 | O-F3 | ESC-4 ≤ 1e-5 with equivalence | accept |
| OA-23 | O-F4 | sun/moon contours: frozen or re-authored | re-author |
| OA-24 | O-F5 | read-only ssh for the deploy-hook log | allow |
| OA-25 | O-F6 | /equation opens on Canvas at phone widths | yes |
| OA-26 | X·P DR-a, DR-b | property-aware grammars; canonical specified-value serialization | keep both |

Units gated on a ruling (F-D14c on OA-25, K-D13's close on OA-18, the K-G2 press read on OA-1) run every other conjunct now and close their ruled conjunct on the answer. No unit is deferred; each waits only on an event that is not ours.

---

## 8 · Seating

- Max 4 concurrent workflows (owner cap); one heavy run per seat. value, kf and fourier waves run on separate tracks; within a track, waves are serial.
- Before any push: `git fetch`; integrate an ahead origin with an ordinary merge; never push while a CI run another seat started is in progress on the branch; master merges by §0ga (`merge-tree` + `commit-tree`, push `"${M}:refs/heads/master"`, gated on CI green).
- Every glass-level finding during execution is relayed to the live glass session by SendMessage and rowed in INBOX, never shimmed.
