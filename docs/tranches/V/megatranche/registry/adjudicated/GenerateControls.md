# GenerateControls — Adjudicated Apotheosis (M-12 tri-fold, arbiter seat)

**Component:** `demo/workbenches/generate/GenerateControls.vue` (+ its closure: GeneratePane.vue, useColorGeneration.ts, generate-color.ts, PaletteColorStrip.vue, usePaneRouter.ts, App.vue, foundation.css, o20 spec)
**Arbiter:** arbiter-F · model receipt `claude-fable-5` (Fable 5) — observed, not inherited
**Date:** 2026-07-27 · tranche-u HEAD, authority `c654824e`
**Workers adjudicated:** worker-F (`claude-fable-5`) · worker-O (`claude-opus-5[1m]`) — both receipts on file
**Pin re-verified this session:** sha256(GenerateControls.vue) = `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` — byte-identical to the CARRY-LEDGER §D glass BJ W4 receiver pin (§D re-read verbatim; exactly four receivers named; GeneratePane.vue `009c71a2…fbc7` is NOT among them).

---

## 1 · Corpus reconciliation (the arbiter's own count)

Raw harvest re-enumerated from `registry/harvest/area-workbenches.json`: the four GenerateControls
seats carry **14 + 10 + 14 + 13 = 51 raw rows** — worker-F's count exact. Deduplicated across
blind-rediscovery, the canonical corpus is **30 rows** (worker-F's row set; worker-O's 40 fold into it).
Unique BLOCKERs = 5: swatch-inert, save-name-drop, a11y-palette-absent, oracle-red/CI-dark, variant-inert.

**Worker-O's reconciliation claim ("40 blocks, exact match, none dropped") is REFUTED against the
harvest.** O's extraction demonstrably dropped: `D·D-3` (**BLOCKER** — a11y palette absent),
`C·D2` (**BLOCKER** — oracle red + CI dark), `L·L-4` ×2 (**MAJOR** — synthesis stranded),
`L·L-5` ×2 (**MAJOR** — tsconfig paths drift), `C·D8` (MINOR), `C·D14` (INFO), plus `D·D-7/-9/-11/-12`.
Each dropped row was re-read in the harvest JSON this session. Consequence: O's wave spec has no
CI gate, no exports-mirror gate, and no a11y row. Worker-F covered all of them.

## 2 · Rulings on the worker disagreements

| # | Question | worker-F | worker-O | RULING | Deciding evidence |
|---|----------|----------|----------|--------|-------------------|
| R-A | o20 spec state today | 2/2 RED fresh | passes (vacuously) | **BOTH CORRECTED** | Arbiter re-ran `npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --project=smoke`: **1 failed / 1 passed (51.7s)** — test 2 deterministically RED on the exact encoding mismatch (`oklch(82.71…% … 250.47…deg)` stamped vs `oklch(0.827116 0.0895035 250.475)` computed, spec:105); test 1 GREEN on this run. F's test-1 failure was a transient of the s3:D14 instability class (corroborative, not deterministic); O's "passes" ignores the deterministically red leg the C-seat filed as BLOCKER. Stable truth: **one leg RED, one leg green-but-vacuous, CI runs neither.** |
| R-B | Which Regenerate dies (verb dedup cure site) | plate cluster violates VC:194; banked | delete the DOCK set now (unpinned) | **worker-F** | `VISUAL-CONSTITUTION.md:194` read verbatim: "Regenerate, Save/Publish and Copy live in **one Dock control set**." O's G6 cure inverts the binding V canon. The dedup (retire the PLATE cluster) edits the pinned file → BANKED to the canon's W25 executor. O's *mechanism* survives: the duplicate dock seat is `visibility:hidden` and `getByRole` cannot see it — the o20:38-40 orphan assert is vacuous (adopted), and the o20 T-era containment law collides with VC:194 at W25 (both workers flagged; registered as a W25 carry). |
| R-C | `.generate-swatch` hook disposition | glass relay G-4 / banked | delete NOW from foundation.css | **worker-O** | Producer render fn read in dist bytes: `class: l([c.value, "watercolor-swatch", e.animate && "watercolor-animated"])` — **unconditional**. foundation.css :689–694 and :834–837 read: `.generate-swatch` and `.watercolor-swatch` sit in the SAME comma selector lists, so the former is redundant today; deletion is behavior-preserving and touches only unpinned foundation.css. F's relay target is refuted: `[data-color-surface]` has **zero producers** repo-wide (grep demo/ src/ + glass dist) — a dead selector, also deletable. |
| R-D | Swatch-inert causation | (leaned glass-seam framing) | ours — glass never promised `tag` | **worker-O** | WatercolorDot.vue.d.ts props: `{color, variant?, animate?, cycleDuration?, range?, seed?}` — no `tag` was ever in the contract; `inheritAttrs:!1` on an aria-hidden decorative face is a defensible producer choice. The dead `tag="button"` at :203 is consumer debt. Cure (named geometric seat per VC:91/P051) still edits the pinned file → banked on the §D re-trigger. The 6-site dead-`tag` census still rides the glass relay as *migration input* only. |
| R-E | Preview perf claim verdict | CONFIRMED (false) | RESCOPED (count-dependent) | **worker-O** | O's independent bench: 0.96ms at default count 5 (claim HOLDS), 2.80ms at count 12 (claim FAILS ~2.8×). The comment at :87-93 is false only at high count. Cap asymmetry re-verified by arbiter: `STRIP_SEGMENT_CAP=7` module-private at PreviewStrip.vue:25 vs `RAMP_SAMPLE_COUNT` exported (sample.ts:36, barrel :28). |
| R-F | Rail gradient copies | 4 copies of the computed | 2 twins + 2 one-liners | **worker-O** | MixResultDisplay.vue:112 read: `` `linear-gradient(to right, ${result.colors.map(c => c.css).join(', ')})` `` — a single expression with neither the length-guard nor the pct-stop logic. Only GenerateControls:65-73 and useExtractSession.ts:~111 are structural twins. Direction unchanged; count corrected. |
| R-G | PaletteColorStrip relocation | hold-gated | "mostly landable now" | **worker-F** | Moving the file forces an import-path edit inside pinned GenerateControls.vue:16; a forwarding stub is a forbidden shim (edict 2/3). The relocation is hold-gated whole. (O's sharpening adopted: the strip never reads `position` — grep returns nothing — yet `demo/palettes/types.ts:4` declares it REQUIRED, so :55-57's fabrication is *type-mandated*; retype on the move.) |
| R-H | Corpus coverage | 51 raw / 37 unique, full | 40, "none dropped" | **worker-F** | §1 above. Two BLOCKER accusations and two MAJOR pairs absent from O's adjudication and wave. |

## 3 · Final per-defect verdicts (30 canonical rows)

Tally: **22 CONFIRMED · 6 RESCOPED · 2 GLASS-OWNED · 0 REFUTED-whole · 0 UNVERIFIABLE-HERE.**
Every CONFIRMED row cites a reproduction a fresh session can run. GLASS-OWNED rows ride the INBOX
I-20 evidence-cell law (chromium ≠ webkit ≠ safari-app; nothing inferred across cells).

### BLOCKERs

**1 · SWATCH-INERT** [s0:D-1, s3:D1] — **CONFIRMED.** Producer contract has no `tag` prop;
`inheritAttrs:!1`; renders `span` with `aria-hidden:"true"` + inline `pointerEvents:"none"`
(dist bytes read this session). GenerateControls:199-208's `tag="button"`, `:aria-label`, `@click`
silently drop; `copyColor()` (:111-113) is dead code while `cursor-pointer active:scale-95` (:205)
still advertise the verb. *Repro:* load `/#/generate`, `document.querySelector('.generate-swatch')`
→ SPAN, aria-hidden, tabIndex -1, pointerEvents none; click copies nothing. Causation: **ours**
(ruling R-D). Cure: named geometric seat per VC:91 (verified verbatim) — **BANKED** (pinned file, §D re-trigger).
Five sibling dead-`tag` sites (MixSourceSelector:168,215; SwatchHoverMenu:17,32; CurrentPaletteEditor:98) ride the same bank.

**2 · SAVE-NAME-DROP** [s0:D-2, s1:L-1, s3:D3, s5:L-1] — **CONFIRMED, CURABLE NOW.** Arbiter re-read
both sides: GenerateControls:48-50 declares `save: [colors: string[], name: string]`, :103 emits
`paletteName.value`; GeneratePane:14 declares `onSave(colors: string[])` — narrower handler arity is
legally assignable, so the checker is silent — and :19 hardcodes `pm.createPalette("Generated Palette", …)`.
O reproduced live end-to-end (typed probe name → persisted literal). The :44-47 comment defends a wire
never landed. GeneratePane is unpinned (hash `009c71a2…fbc7`, not in §D). Severity: BLOCKER (silent
user data loss; F's dissent adopted). *Repro:* type a name, Save, read `localStorage['color-palettes']`.

**3 · A11Y-PALETTE-ABSENT** [s0:D-3] — **CONFIRMED.** (Dropped by worker-O — restored.) Both specimen
depictions statically aria-hidden: PaletteColorStrip.vue:2-5 (`aria-hidden="true" role="presentation"`,
re-read) and the producer dot span. No color value reaches AT anywhere on the plate. Canon VC:83 /
OBC:108 (data-bearing static faces remain present as named noninteractive content — verified verbatim).
*Repro:* enumerate `[aria-label]` inside `[data-generate-plate]` → 3 entries, none a color. Falls out of
the same seat transposition — **BANKED** with row 1.

**4 · ORACLE-RED-CI-DARK** [s3:D2] — **CONFIRMED** (arbiter's own run, ruling R-A). The component's only
oracle: test 2 deterministically RED (encoding mismatch, spec:105); test 1 green-but-VACUOUS (the :38-40
orphan count uses `getByRole`, which excludes the `visibility:hidden` 32×32 dock Regenerate — O's
mechanism, adopted); CI dark — `.github/workflows/{ci,deploy-pages,release}.yml` contain zero
playwright/`test:e2e` invocation (re-grepped). Spec + ci.yml unpinned — **this wave.**
*Repro:* the run command in ruling R-A.

**5 · BUTTON-VARIANT-INERT** [s5:L-0, s3:D4] — **CONFIRMED.** Button.vue.d.ts has `emphasis`
(+tone/size/iconOnly/loading), no `variant` (re-grepped: only emphasis lines). Census re-run: **51**
`<Button variant=…>` sites in demo/ vs 2 files using `emphasis=`. GenerateControls :158 (`primary-audacious`),
:167/:177 (`ghost`) all fall through as junk DOM attrs (O's line correction :177 exact). Correctly scoped:
Badge (:150) and Slider (:299) legitimately KEEP `variant` — never sweep by filename. The 3 in-file sites
pinned (banked); the ~48 others + lint wall — **this wave.** *Repro:* live DOM shows `data-emphasis="secondary"`
alongside the raw `variant` attribute on all three plate buttons.

### MAJORs

**6 · TRIPLE-DEPICTION** [s0:D-4] — **CONFIRMED** (identity from source, which needs no pixels):
PaletteColorStrip (:135 ← stripColors :55-57), the dot row (:200), and the count-rail gradient (:65-73)
all render `palette.value` — one datum, three depictions. The 2.63×-area/61.8% clauses are canon design
pricing (VC:46/OBC:108 verified), not mechanics — struck from the confirmation, carried to W25. **BANKED/W25.**

**7 · SLIDER-DUAL-AXIS** [s0:D-5] — **CONFIRMED** arithmetically: :69 paints stop *i* at `(i/(len-1))·100%`
(index axis, full track) while the thumb sits at `(count-1)/11` (cardinality axis) — at count 5 the last
existing color paints at 100% of a track whose thumb sits at ~36.4%. O re-measured live (thumbCentreFrac
0.367 ✓). The :62-64 comment is inverted. Pinned — **BANKED.**

**8 · VERB-DUPLICATION** [s0:D-6] — **CONFIRMED**; cure site RULED (R-B): VC:194 says ONE Dock control
set, so the PLATE cluster (:157-184) is the violation and usePaneRouter.ts:190-201's dock set (re-read:
regenerate/save/copy with the same icons) is canonical. Dedup is pinned-file work → **BANKED to W25**,
with the o20 T-era containment-law collision registered (the spec's plate-containment assert must be
re-pointed at the Dock when W25 lands, or the gate will assert the violation).

**9 · TAP-TARGETS** [s0:D-7, s1:L-7, s3:D8, s5:L-7] — **RESCOPED** (split by ownership, both workers
concordant): the 12×24 thumb is producer geometry → **GLASS-OWNED, relay G-1** (no consumer override —
masking-fallback ban). Consumer-chosen sub-44 seats ride the chassis/seat carry. s3:D8's scoping upheld:
only 1 of the visual audit's 5 small-target rows on this route belongs to this component; the 160×23
nameless input is dock/slug chrome, not the plate title input (398px, aria-labeled).

**10 · WRAP-COMMENT-FALSE** [s0:D-8, s3:D7, s1:L-8, s5:L-8] — **CONFIRMED.** The /generate two-pane
desktop scene gives the plate a ~460px content box at EVERY supported width; basis-[10rem] + badge +
verb cluster exceed it, so the row always wraps — the :137-142 "at 390" comment documents a state with
no rendered instance. Two workers measured concordant offsets (10/12.2/46.5) independently; O's caution
adopted: the "exactly 3px" overflow arithmetic is unsupported precision. basis-0 cure + comment — pinned,
**BANKED.**

**11 · NESTED-CASTERS** [s0:D-9] — **CONFIRMED.** (Dropped by O — restored.) Arbiter verified both lines:
GenerateControls:132 `border border-card-edge bg-well shadow-cartoon-sm` inside GeneratePane:31
`<Card tier="resting">` — border+fill+cartoon-shadow twice-nested; OBC:75 binds Generate to
boundaries `[]`/reserve none (verified verbatim). Chassis adoption — **BANKED/W25.**

**12 · NO-CHASSIS-NO-LABEL** [s0:D-10] — **RESCOPED** (O's split adopted over F's whole-confirm):
arm (b) CONFIRMED — the count instrument's only visible text is the bare numeral ({{count}} at :287-291,
verified; Preset/Harmony have section-labels, count does not). Arm (a) — chassis adoption + 61.8/38.2 —
is a canon *design synthesis* obligation (VC:46, W25 executor; O verified InstrumentChassis ships in
glass 7 with zero demo consumers), not a mechanically adjudicable defect. **Label arm banked; chassis → W25.**

**13 · DARK-CHROMA** [s0:D-11] — **RESCOPED** (F's own split, arbiter re-verified the tokens): light
`--card: hsl(30 85% 96%)` vs dark `--card: hsl(26 22% 17%)` in glass dist tokens (read this session) —
origin is producer dark-arm → **relay**; the well derivation `--well-bg: color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)`
(foundation.css:328, verified) is value-owned → root-token design-lane carry. Never per-instance.

**14 · UNCHECKED-CASTS** [s3:D6] — **RESCOPED** to latent type-unsoundness in the core: mechanism
verified (GENERATION_PRESETS[preset] unguarded at ~:220 → TypeError on `p.l[0]`; generateHues switch
:99-146 has NO default → silent `[]` that save() would persist — arbiter grepped the switch: six cases,
no default). Reachability through reka-ui REFUTED (O: SelectRoot only assigns member `:value`s; no
clear path) — no live crash path in this component. Cure = totality in unpinned generate-color.ts — **this wave.**

**15 · CLIPBOARD-RESULT-DROPPED** [s3:D5, part s0:D-14] — **CONFIRMED.** `CopyResult` discriminated
union verified in useClipboard.d.ts; both call sites (:107, :112) discard it; no aria-live/role=status
under the generate workbench. O's correction booked: `liveRegions: []` was literally false — one
page-level role=alert exists (the dock status lamp, an API-less environment artifact, not a confirmation).
Insecure-origin arm stays a labeled hypothesis. Pinned call sites — **BANKED**; the confirmation surface
rides G1's persistence leg.

**16 · ANY-CHAIN-OPTIONAL-MASKS** [s5:L-6, s3:D11, part s0:D-14] — **CONFIRMED.** Arbiter re-read the
chain: App.vue:317-319 `ref<any>` ×3 → usePaneRouter.ts:108-110 `Ref<any>` ×3 (the file's ONLY `any`
lines — grep verified) → :195-197 `?.` on the METHOD → GeneratePane:22-26 double-optional re-expose →
defineExpose :115. Rename `regenerate` and the dock silently no-ops. O's diagnosis adopted: the `any`
is the symptom, state homed in a component instance is the disease; the session transposition is the
idiomatic cure and makes SAVE-NAME-DROP unrepresentable. Shell half unpinned — **this wave**; composable
instantiation site pinned — banked.

**17 · DEMO-UI-SHIMS** [s1:L-2, s5:L-2, s3:D10] — **CONFIRMED.** All 19 demo/ui dirs are index.ts-only
(arbiter loop: zero non-index files). Three specifier registers in twelve lines in the subject file.
F's sequencing correction stands (R-G class): shim dirs imported by the four pinned receivers
(select/slider/button/badge/card at minimum) are hold-gated; others curable; the lint wall prevents new
sites — **this wave (partial) + bank.** Honest scoping kept: structural/legibility cost, no bundle claim
(`sideEffects:["*.css"]`).

**18 · CROSS-FEATURE-STRIP** [s1:L-3, s5:L-3] — **CONFIRMED**; relocation **hold-gated** (ruling R-G).
Import edges verified (:16, :21); the strip reads only `.css`/`.weight` (grep: zero `position` hits)
while types.ts:4 requires `position: number` — type-mandated fabrication at :55-57. 3 consumers.
**BANKED** with the v8 re-trigger; retype on the move.

**19 · SYNTHESIS-STRANDED** [s1:L-4, s5:L-4] — **CONFIRMED.** (Dropped by O — restored.)
generate-color.ts = 243 lines (wc verified), Vue/DOM-free, seeded, calling only published primitives;
src/ has zero generatePalette/harmony hits; quantize IS the published structural twin. Promotion to a
published `/palette` subpath is a src-side wave — **BUILD carry**, not deferred-by-name.

**20 · TSCONFIG-PATHS-DRIFT** [s1:L-5, s5:L-5] — **CONFIRMED**, arbiter re-derived whole. (Dropped by
O — restored.) exports = 7 keys, no bare root (`./color ./value ./css ./easing ./math ./transform ./quantize`);
tsconfig.demo.json maps 8 `@mkbabb/value.js*` entries including three PHANTOMS (root → `dist/index.d.ts`,
`/parsing`, `/units` — all three targets verified ABSENT on disk) and omits `./value` + `./css`. `paths`
substitution pre-empts exports resolution — the demo typecheck is a false proof of the published surface.
Unpinned — **this wave, born-RED gate.**

### MINORs / INFO

**21 · NO-MOTION-REGISTER** [s0:D-12] — **CONFIRMED** (source: no transition utility on plate/strip/
gradient; the dot's morph register never fires — animate defaults false, active:scale dead per row 1;
regenerate hard-cuts). The latent-hazard flag upheld: never give a height-varying container
`transition: all`. **BANKED/W25 design.**

**22 · DEAD-EMPTY-BRANCH** [s0:D-13] — **CONFIRMED**: :66-67 unreachable (count slider-bound min 1).
O's refinement adopted: `generatePalette(0|NaN)` → `[]`, so the guard is dead only via a template
attribute — bound count in the TYPE, and cure as one unit with row 14 (validate boundary first, then
delete). Pinned — **BANKED.**

**23 · CLIPBOARD-ROOT-REGISTER** [s1:L-6] — **CONFIRMED**: 12 root-barrel files / 9 `/dom` sites
(arbiter: 9 occurrence-lines across 8 files — both workers' "9 sites" exact; `./dom` is a real subpath).
11 non-pinned sites curable; this file's line banked. Dev-graph cost only.

**24 · PREVIEW-PERF-CLAIM** [s1:L-9, s5:L-9, s3:D9] — **RESCOPED** (ruling R-E): the sub-millisecond
claim HOLDS at default count 5 (0.96ms), FAILS ~2.8× at count 12. presetStops/harmonyStops are
unmemoized plain template calls (:94-100 verified). Anti-cure warning load-bearing: truncating
generation to the cap would break seed-exactness (analogous derives step from count). Cure = export the
cap + computed-memoize; falls out of the session transposition. R37's mobile-WebKit extrapolation stays
struck (I-20 — no WebKit measurement exists; that *clause* is UNVERIFIABLE-HERE).

**25 · RAIL-4-COPIES** [s1:L-10, s5:L-10] — **GLASS-OWNED** (count rescoped per R-F: 2 structural twins +
2 one-liners; 4 `--slider-track-bg` per-instance sites). The SAMPLING-LAW divergence is real in the bytes
(sample.ts header vs the raw CSS gradient eleven lines below the import). The pinned transparent-underlay
arrangement is §D-sanctioned ("Preserve … transparent K/count underlays … add no `--track-bg`" — re-read
verbatim) — no value.js row may be booked on it. Cure = producer first-class track-stops → **relay G-2**;
the spectrum-seam blur ramp stays un-booked (glass 07-25 §3 prefix trap, cured in 8.0.0). Cites INBOX I-20.

**26 · GENERATE-SWATCH-HOOK** [s5:L-11] — **CONFIRMED, disposition corrected to CURABLE NOW**
(ruling R-C — the fleet's most under-valued row): `.generate-swatch` is redundant today (producer applies
`watercolor-swatch` unconditionally — dist render fn read; same comma-lists at foundation.css:689-694,
:834-837) and `[data-color-surface]` is a dead selector (zero producers). Delete both from unpinned
foundation.css — **this wave**, with the paired DOM assertion guarding the premise.

**27 · STALE-DOCSTRING** [s5:L-12] — **CONFIRMED**: useColorGeneration.ts:7 cites the killed
`@composables/color/generate-color` alias (tsconfig.demo.json records the W43/RF-15 kill; no mapping
survives anywhere). Third stale load-bearing prose assertion in this closure. Unpinned — **this wave.**

**28 · COUNT-BADGE-DUP** [s3:D12] — **CONFIRMED**: Badge {{count}} (:150-152, no accessible name — AT
announces a bare numeral) + the slider label (:287-291), tripled by aria-valuenow. O's boundary note
adopted: the duplication straddles the plate boundary (the badge is model input rendered as specimen
metadata). Folds into the chassis/label carry; the badge deletion frees the ~30px feeding row 10's wrap.

**29 · NOT-A-DEFECT-TRACK** [s3:D13] — **GLASS-OWNED / RETIRED, upheld exactly as recorded**: the
transparent-track + underlay arrangement is producer-sanctioned and PINNED by §D (verbatim re-read).
No seat may "fix" it; preserved in BANKS as the standing do-not-touch note. Cites INBOX I-20.

**30 · ROUTE-DRIFT** [s3:D14] — **RESCOPED** to the shell/routing lane (the seat itself scoped it out).
Intermittent, not deterministic: worker-F's o20 test-1 flake corroborates the class; the arbiter's fresh
run passed test 1. Handed to the shell lane as a BUILD carry with the o20 run as the mechanically
checkable re-trigger.

---

## 4 · The ONE re-authored wave spec

**waveId:** `V·MEGA-W-GEN-1` · **title:** Generate seam truth — the name-wire, the honest oracle, the
total core, the exports mirror, the typed pane seam, and the variant lint wall (pin-respecting)
**bornRed:** true

**SCOPE (all verified unpinned):** `demo/workbenches/generate/GeneratePane.vue` ·
`demo/workbenches/generate/composables/useColorGeneration.ts` · `demo/color-session/generate-color.ts`
(totality only — never the pinned consumer) · `demo/styles/foundation.css` (the two redundant selectors
only) · `demo/shell/usePaneRouter.ts` + `demo/color-picker/App.vue` (typed PaneActionSurface; the dock
`/generate` action set is **NOT deleted** — ruling R-B) · `e2e/smoke/oracles/o20-generate-plate.spec.ts` ·
NEW `test/generate-pane-save.test.ts` · NEW `test/generate-color.test.ts` · NEW
`e2e/smoke/oracles/o21-generate-pin-residue.spec.ts` · `.github/workflows/ci.yml` · `tsconfig.demo.json` ·
eslint config · the ~48 non-pinned `<Button variant=>` sites.
**NEVER TOUCH:** the four §D-pinned receivers (GenerateControls.vue `4f95c57c…24f6` re-verified
byte-exact this session; ExtractControls.vue; ComponentSliders.vue; ConfigSliderPane.vue), `vnext/`
(Codex READ-ONLY), `scripts/dev/dev.sh` (unowned dirty row).

**STRUCTURE (L-8 — unrepresentable first, gates only where structure cannot reach):**
(1) The save-name seam vanishes: GeneratePane binds the full emit tuple and forwards `name` — no arity
for the drop to hide in; the banked session transposition later deletes the seam entirely.
(2) generateHues gains an exhaustive `default: { const _x: never = harmony; throw … }` arm; the preset
lookup gains a total form with a named throw — an unlisted harmony becomes a COMPILE error, a silent `[]`
impossible (O's scratch-SFC experiment proved the checker sees typed-member errors but not unknown attrs —
typing is exactly what converts this class from invisible to checked).
(3) `PaneActionSurface` replaces the six `any` refs; the method-level `?.` masks die — a renamed handler
is a compile error, not a silently dead dock button.
(4) Unknown Button props become non-writable: eslint `no-restricted-syntax` bans the `variant` attribute
on glass Button elements (Badge/Slider exempt — they keep the prop legitimately); the four pinned files
config-excluded until the hold lifts; exclusion removal IS the bank re-trigger.
(5) The hand-written `@mkbabb/value.js*` paths block in tsconfig.demo.json is DELETED — TypeScript
resolves the self-reference through the one genuine `package.json#exports` map.
(6) `.generate-swatch` and `[data-color-surface]` leave foundation.css (redundant + dead — licensed by
the producer's unconditional class, premise guarded in-gate).

**GATES (each with today's RED input, arbiter-verified):**
- **G1 · o20 honest oracle** — `npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --project=smoke`
  RED today (arbiter ran it: 1/2 failed — test 2's cross-encoding compare at spec:105). Repair: pass both
  sides through the app's own parser (one encoding, the sample.ts truth law); replace the vacuous :38-40
  orphan assert with a DOM-seat census annotated to the VC:194/W25 collision (asserts existence + the
  plate/page seat inventory, NOT containment — the containment law moves at W25); add the leg "typed name
  persists on Save" (localStorage `color-palettes` carries the typed string, not the literal).
- **G2 · the name-wire carries** — `npx vitest run test/generate-pane-save.test.ts` — authored first;
  mounts GeneratePane with a stubbed LIBRARY_PORT_KEY, drives `save` with `(colors, "WITNESS-NAME")`,
  asserts createPalette receives it. Deterministically RED: GeneratePane:14 one-param handler + :19 literal.
- **G3 · the core is total** — `npx vitest run test/generate-color.test.ts` — RED on two arms (invalid
  harmony → length 0; invalid preset → TypeError reading 'l') + RED-by-absence (zero test files reference
  generate-color today — grep verified). Asserts named throws + `length===count` across 10 presets ×
  6 harmonies × count 1..12.
- **G4 · exports-mirror truth** — `npx vue-tsc -p tsconfig.demo.json --noEmit && node --input-type=module -e "await import('@mkbabb/value.js/css'); await import('@mkbabb/value.js/color')"`
  — RED by construction today: three phantom paths targets verified absent (`dist/index.d.ts`,
  `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts`), `./value`/`./css` unmapped.
- **G5 · variant lint wall** — `npx eslint demo/ --ext .vue,.ts` — RED with 51 hits (census re-verified);
  GREEN when the ~48 non-pinned sites migrate (`primary-audacious`→`emphasis="primary"`, ghost→quiet,
  outline→secondary per the producer axis); any new `variant=` site re-reddens.
- **G6 · CI runs the e2e suite** — `grep -q 'test:e2e' .github/workflows/ci.yml && gh run list --workflow ci.yml --limit 1 --json conclusion -q '.[0].conclusion' | grep -qx success`
  — RED: zero workflows invoke playwright today (verified). The second clause holds the product property
  (an actually-green hard run, the D59 shared-runner timeout lesson applied).
- **G7 · typed pane seam** — `grep -cE 'Ref<any>|ref<any>' demo/shell/usePaneRouter.ts demo/color-picker/App.vue`
  expect 0 (today: 6 — verified) **and** the rename-experiment: renaming `regenerate` in GeneratePane's
  defineExpose must turn `npx vue-tsc -p tsconfig.demo.json --noEmit` non-zero (today it stays 0 — O verified).
- **G8 · dead-selector + dead-alias sweep** — `grep -c 'generate-swatch\|data-color-surface' demo/styles/foundation.css`
  expect 0 (today 4: :689, :694, :834, :837) and `grep -rc '@composables/' demo/workbenches/generate/`
  expect 0 (today 1 at useColorGeneration.ts:7). Paired DOM assertion in G1's run guards the
  `watercolor-swatch`-premise.
- **G9 · executable pin-residue record** — `npx playwright test e2e/smoke/oracles/o21-generate-pin-residue.spec.ts`
  — RED by absence today. At close: one `test.fail()`-annotated assertion per pin-locked row with this
  session's measured RED inputs (SPAN/pointerEvents:none swatch; data-emphasis + dead variant attr ×3;
  row child-tops 10/12.2/46.5; rail stops 0-100% vs thumb 0.367; count row's whole visible text "5").
  A `test.fail()` PASSES only while the defect persists and turns RED the instant a cure lands — the
  bank's re-trigger written as a command, structure not prose. (Worker-O's invention, adopted whole.)

**piObligations:** playwright-chromium 1440×900, route `/#/generate`, selectors
`[data-generate-plate]`, `input[aria-label="Palette name"]`, `[role=slider][aria-label="Color count"]`,
`button[aria-label="Save palette"]`; localStorage key `color-palettes` as persistence witness. Committed
captures under `docs/tranches/V/megatranche/audit/components/wb-generate-controls/pi/` — NOTE
(worker-O's L-7 catch, adopted): `.gitignore:34 *.png` swallows capture paths — `git add -f` each
committed witness or make no visual claim. chromium, webkit, safari-app remain SEPARATE evidence cells
(I-20); none inferred from another.

**CARRIES/BANKS** (shared mechanical re-trigger: glass major ≥8 via
`node -e "process.exit(+require('./node_modules/@mkbabb/glass-ui/package.json').version.split('.')[0]>=8?0:1)"`
AND the §D two-Sol-critic packet-equality gate; G9 records every bank executably):
B1 swatch seat transposition (rows 1+3: named `<button>` ≥44px wrapping the aria-hidden dot; retires the
5 sibling dead-`tag` sites). B2 pinned-file variant→emphasis (3 sites) + eslint exclusion removal.
B3 basis-0 wrap cure + :137-142 comment correction. B4 strip relocation to color-chips + retype
(position optional) + shim-dir deletion for pinned-consumer dirs. B5 clipboard CopyResult + one polite
live region. B6 boundary-validated handlers + dead-branch deletion + count bound in type (one unit).
B7 session transposition (typed InjectionKey; deletes the any-chain remnants, both defineExpose blocks,
the `?.` masks; memoizes the preview truth functions; export STRIP_SEGMENT_CAP).
**W25 executor rows:** verb dedup per VC:194 (plate cluster retires INTO the Dock set; re-point o20's
census) · chassis/proportion gestalt (rows 6, 11, 12, 21, 28) · dark-well derivation (row 13).
**BUILD:** synthesis promotion to a published `/palette` subpath (row 19) · shell route-drift (row 30,
re-trigger: G1 flaking on navigation).
**GLASS RELAYS (BH inbox, standing edict):** G-1 Slider thumb ≥24×24 hit-area via pseudo-element ·
G-2 first-class track-stops affordance (collapses the twins) · G-3 ButtonProps closed to unknown attrs /
dev-assert on `variant` reaching Button root + axis-naming reconciliation · dead-`tag` consumer census as
v8 migration input. **G-4 (data-color-surface) WITHDRAWN** — dead selector, ruling R-C. No spectrum-seam
visual rows re-booked (prefix trap, glass-owned, 8.0.0). **RETIRE:** row 29 preserved as the do-not-touch note.

**completableAlone:** YES — every gate closes with edits confined to verified-unpinned files; no API/mongo,
no glass release, no owner packet. ENV limits (L-12): the local witness is API-less (blank data surfaces
are environment facts); real Safari is a separate cell (safaridriver :4599 if ever needed); the banked
pinned-file cures cannot be witnessed until the v8 hold releases — which is why they are banked with a
mechanical re-trigger AND recorded executably by G9 rather than half-landed.

---

## 5 · Addendum clause (E-3 — append to DEFECT-LEDGER, never rewrite rows)

ADDENDUM · GenerateControls tri-fold apotheosis, arbiter-F (`claude-fable-5`), 2026-07-27: 51 raw seat
rows re-reconciled against the harvest (worker-F's count exact; worker-O's "40, none dropped" REFUTED —
O dropped D·D-3 BLOCKER, C·D2 BLOCKER, L·L-4 ×2, L·L-5 ×2, C·D8, C·D14, D·D-7/-9/-11/-12). 30 canonical
rows adjudicated: 22 CONFIRMED · 6 RESCOPED · 2 GLASS-OWNED · 0 REFUTED-whole · 0 UNVERIFIABLE-HERE.
Pin re-verified byte-exact. Arbiter's own o20 run: 1 failed / 1 passed — test 2 deterministically RED
(encoding), test 1 green-but-vacuous (getByRole blind to the visibility:hidden dock seat); both workers'
o20 state claims corrected. Corrections of record this seat adds: (1) VC:194 RULES the verb dedup — the
Dock set is canonical, the plate cluster the violation; worker-O's delete-the-dock-set cure is
canon-inverted and is struck from the merged wave. (2) `.generate-swatch` + `[data-color-surface]` are
deletable NOW (producer's unconditional `watercolor-swatch` verified in dist bytes; zero
`data-color-surface` producers) — worker-F's G-4 relay withdrawn. (3) The preview-perf claim is
count-dependent (holds at 5, fails at 12) — flat falsity claims struck. (4) Rail duplication is 2 twins +
2 one-liners, not 4 copies. (5) Strip relocation and pinned-consumer shim-dir deletion are hold-gated
(imports INTO pinned files are inside the pin's blast radius — the §D hold text should say so explicitly).
All pinned cures BANKED on the v8/§D re-trigger and recorded executably (G9); none deferred-by-name.

---

## 6 · DISSENT (preserved verbatim where unresolved)

**Resolved by this seat** (recorded, no longer open): O's dissent (2) causation → ruled ours (R-D);
O's dissent (3) which-Regenerate-dies → ruled by VC:194 (R-B); F's dissent (1) severity splits → BLOCKER
adopted for both name-drop and variant-inert; O's dissent (4) oracle-audit-first → adopted as G1/G9 ordering.

**Unresolved — preserved verbatim for the owner:**

1. Worker-F, model law: "Model law: this seat ran as declared Fable (worker-F) under a memory-recorded
all-Opus owner override re-asserted 3x for the mega-tranche; the spawn declaration governs per the tiering
law and 'Fable sparingly' (E-5) permits it, but the tension deserves an owner ruling rather than silent
precedent." — The arbiter seat itself also ran as Fable by explicit spawn declaration; the same tension
applies and the same ruling is requested.

2. Worker-O, bank-rot path: "One structural risk I flag rather than bury: any future wave that DOES edit
this file silently invalidates the glass BJ W4 receiver identity unless it re-pins the hash in the same
commit — that is an unguarded bank-rot path in the hold itself, and it belongs in the next §D sweep."

3. Worker-F, pin blast radius: "two seats' 'CURABLE NOW' markings on hold-gated cures show the pin's
blast radius (imports INTO pinned files) is easy to under-read — the §D hold text should name it."

4. Arbiter's own residual: the o20 test-1 flake (F's run) vs pass (arbiter's run) means the route/click
instability class (row 30) is real but nondeterministic — neither worker's characterization of test 1's
today-state is stable across runs; only test 2's RED is. G1's repair must therefore not treat test 1's
current green as load-bearing.
