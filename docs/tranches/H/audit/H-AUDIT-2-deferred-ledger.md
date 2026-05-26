# H-AUDIT-2 — Deferred-items ledger at H open

**Mode**: READ-ONLY. Authored at H open.
**Date**: 2026-05-23.
**Branch / HEAD**: `tranche-h` @ `e166d37` (`Merge tranche-g into master — Tranche G close (v0.9.0)`).
**Predecessor**: G closed at `e166d37` / tagged `v0.9.0` (`9051136` v0.9.0 release commit + close-ceremony commits + merge).
**Substrate window audited**: G-window (`6b3a41b..e166d37` — G open `b745c0e` to G merge `e166d37`) + G-H boundary (verified ZERO commits).

**Binding invariant (H-opening directive, strict reading — verbatim from `H-PROMPTS.md §1`)**:
> *"Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche."* — **TWO clauses, doubled**; H honors both separately (§3 chronic-deferred bucket; §2+§4 currently-deferred bucket). Per F1 + G1 inheritance: every entry MUST carry an explicit H-disposition AND a TIME-BOUND or EVENT-BOUND (c) trigger — zero vague "later". This is value.js's seventh tranche; many chronic items have now carried 6 tranches (A→B→D→E→F→G→H), making the doubled-clause emphasis especially load-bearing.

---

## §1 — Method

### §1.1 — Sources read (READ-ONLY)

**Canonical post-G state sources**:
- `docs/tranches/G/coordination/Q.md` (231 LoC) — §6.A peer-audit additions (12 rows) + §6.B original ledger (21 rows) + §7 health at open + §7.1 health at close.
- `docs/tranches/G/FINAL.md` (226 LoC) — §3 invariant inheritance + §6 v0.9.0 release surface (DEFERRED → ZERO claim) + §7 standing peer-authorship asks (4 rows + 1 INFORMATIONAL) + §10 constellation health + §12 successor candidates.
- `docs/tranches/G/H-SEED.md` (97 LoC) — **predecessor-authored seed** (FOLD-S3 — first time value.js authored an H-SEED in the speedtest AL-SEED idiom): §2 5-row carry-forward ledger with sharpened triggers; §3 5-prompt H-target candidates; §4 invariant-inheritance binding; §5 cross-repo state; §6 retired-items list; §7 4-question open audit prompts.
- `docs/tranches/G/audit/G-AUDIT-2-deferred-ledger.md` (266 LoC) — G's open-time deferred audit (17-item ledger; 2 FOLD / 1 RETIRE / 10 PEER / 4 CARRY).
- `docs/tranches/G/audit/G.W4-close-lane-1-plan-vs-actual.md` — G's W3-W4 plan-vs-actual + remediated G3 breach.
- `docs/tranches/G/audit/G.W4-close-lane-3-doc-drift.md` — §7 surfaces the untracked `docs/tranches/C/` scaffold.
- `docs/tranches/G/audit/G.W4-close-lane-4-idiomatic-gestalt.md` — G1-G4 + F1-F4 verdicts (HOLD across the board).
- `docs/tranches/G/audit/G.W4-close-lane-7-integrity-sweep.md` — ZERO cross-repo writes in G window verified; precept `68d9b20` unchanged; reflog clean.
- `docs/tranches/G/audit/G.W1-lane-b-color-utils-decomposition.md` — Rolldown `//#region` marker overhead (+314 B) — flagged for "outside Lane B's file bounds; recommended disposition: accept OR fold a region-comment-strip into a config-owning lane."
- `docs/tranches/G/audit/G.W2-lane-c-color-channel-typing.md` — the `as unknown as` = 4 corpus analysis (DOM `CSSStyleDeclaration` / post-guard narrowing / XYZ-hub dispatch / clone-reinterpret); `Color<T>` `[key: string]: any` index signature INTERNAL-resolved.
- `docs/tranches/G/audit/G.W4-doc-drift-remediation.md` — verified bench-provenance line-number repointing (xyz-extended.ts:43, transfer.ts:38, cylindrical.ts:131, etc.).

**Predecessor inheritance trace**:
- `docs/tranches/F/audit/F-AUDIT-2-deferred-ledger.md` (249 LoC; 18-item ledger; 4 FOLD / 5 RETIRE / 3 PEER / 3 CARRY + 2 F-NEW).
- `docs/tranches/E/audit/E-AUDIT-2-deferred-ledger.md` (the 38-item precedent; A-CHRONIC + B-CHRONIC + D-CHRONIC).
- `docs/tranches/D/coordination/Q.md` (D's §3 9-row gap list — original glass-ui asks surface).
- `docs/tranches/A`..`docs/tranches/B` historical records via memory.

### §1.2 — Live peer-repo state verification at H open (2026-05-23)

| Repo | HEAD at G close (per G FINAL §10) | HEAD at H open | Drift |
|---|---|---|---|
| **glass-ui** | `3822f48` | `3822f48` | **ZERO drift** in G-H boundary. 38 commits unpushed to origin (chronic). No new tranche-open since the implicit AK work (which lived outside `docs/tranches/`). |
| **keyframes.js** | `470814e` | `470814e` | **ZERO drift**. F.W2 codemod commit `470814e` still LOCAL ONLY (R11 = LEAVE LOCAL, user-ratified at G.W0). Submodule `docs/precepts` still `458c2d1` — divergent vs value.js's pin `68d9b20`. |
| **speedtest** | `e9f85c16` (AK close — was `c73a8d92` at G open; +18 commits in G window) | `e9f85c16` | **ZERO drift** at H open boundary. **AK CLOSED**; **AL OPEN** (W0 cohort dispatched — planning-only, 2026-05-21). `speedtest/docs/tranches/AL/AL.md` reproduces the IDENTICAL mandate text H-PROMPTS.md does (the doubled-deferred-clauses + "DEEPLY audit with 6 agents" invocation) — value.js's H + speedtest's AL share a synchronized user-prompt invocation. |
| **fourier-analysis** | `926ca6a` (109-file dirty tree) | `926ca6a` (109-file dirty tree) | ZERO drift. Chronic-stable. |
| **docs/precepts** | `68d9b20` | `68d9b20` | ZERO drift since tranche D. |

**Key signals from speedtest AK close + AL open** (per `speedtest/docs/tranches/AK/AL-SEED.md` §5):
- **AL-CARRY-METABALLS-PUBLISHER-CONSUMERS** (AK-W5 close): "Speedtest no longer consumes MetaballCanvas. If no other constellation peer uses it, the primitive could retire at glass-ui too. Verify at AL W0." — This is the AL ratification half of G H-SEED §2 ask #2's (c) trigger; **value.js is now the SOLE consumer** of `glass-ui/MetaballCanvas` (already declared in G's `Q.md §2.1.2` at G open, and now structurally true at speedtest's AK close).
- **AL.md mandate verbatim**: matches H-PROMPTS.md word-for-word on the doubled "Delineate any chronically deferred items" clause. The two tranches were synchronously opened by the user with the same audit invocation.

### §1.3 — Live in-tree deferral-marker scan at H open

| Probe | Count | Note |
|---|---|---|
| `grep -rn '@deprecated\|@ts-ignore' src/` | **0** | F2 + F.W1 Lane A + `proof:no-deprecated` + `proof:no-ts-ignore` HOLD |
| `grep -rn 'TODO\|XXX\|FIXME' src/` | **0** | Clean |
| `grep -rn 'as any' src/` | **0** | G2 EXCEEDED (target ≤ 5; codified by `proof:as-any-budget`) |
| `grep -rn 'as unknown as' src/` | **4** | All 4 entries are genuine irreducible boundary casts (see §4 NS-A1) |
| `grep -rn 'TODO\|XXX\|FIXME' demo/@/` | **1** | `PaletteSlugBar.vue:16` — `<!-- TODO: collapse to <Button size='icon-sm'> when glass-ui ships the rung (Q.md ask #7) -->` — confirms CH-7 (Button icon-sm) chronic anchor; 6-tranche carry confirmed |

The 4 `as unknown as` sites at H open (LIVE-VERIFIED):
1. `src/units/normalize.ts:110` — DOM `CSSStyleDeclaration` reinterpret for dynamic property indexing.
2. `src/units/normalize.ts:319` — post-runtime-guard narrowing in `asColorValueUnit`.
3. `src/units/color/dispatch.ts:143` — XYZ-hub `fromXYZFn` cast; G.W2 Lane B scoped this out (needs a typed `XYZ_FUNCTIONS` mapped-type lift — analogous to the G.W2 Lane B `DIRECT_PATHS` lift but for the XYZ hub).
4. `src/parsing/color.ts:59` — `resolveToPlainColor` clone-reinterpret.

### §1.4 — Decomposition (per H-opening doubled-clause directive)

The H-opening directive separates **"chronically deferred items"** from **"deferred items"** — TWICE. This ledger honors that decomposition explicitly:

- **§2** — Inherited ledger from G close (the H-SEED §2 5-row carry-forward asks; the chronic-stable items; G's `coordination/Q.md` §7.1 close-state asks). **Currently-deferred bucket** — the predecessor's authored seed.
- **§3** — **Chronic-deferred items** (carry-through 3+ tranches without resolution; with explicit chronicity count). **Chronically-deferred bucket** — the doubled-clause emphasis.
- **§4** — Newly-surfaced items (G H-SEED §3 H-target candidates + items that surfaced during G execution but were not held in §2 or §3). **Currently-deferred bucket** (new).
- **§5** — Per-item H-disposition (FOLD / RETIRE / PEER / CARRY classifier).
- **§6** — Disposition tally.
- **§7** — Per-F1+G1 "No deferrals" sharpening — items lacking a TIME-BOUND (c) trigger.

---

## §2 — Inherited ledger from G close (the predecessor-authored seed)

Per `G/H-SEED.md §2` + `G/FINAL.md §7` + `G/coordination/Q.md §7.1`. **5 items** seeded into H. Verified live at H open.

| # | Item | Origin tranche | Tranche-count at H open | G-close (c) trigger | Current state (verified at H open) |
|---|---|---|---|---|---|
| **G→H-1** | 8 glass-ui primitive asks (Metaballs API additions [renegotiated, `G/Q.md §2.1`: positionSource + duration ACCEPTED via AJ; remaining 4-5 OPEN: pointer input, per-blob opacity, HSV perturbation, WebGL context-loss recovery, MetaballCanvas mode="layout" [overlap], pauseOnHidden]; Aurora `deriveAuroraPalette`/`deriveAuroraConfig`; BlobDot primitive; SelectTrigger size; DockSelectTrigger clampLabel; TooltipContent variant="mono"; Button size="icon-sm"; Tabs variant="underline") | A `research/Ad`+`Ae`+`Ab` | **6-tranche** (A→B→D→E→F→G→H) for CH-1..CH-8 | "Re-check at glass-ui's next non-AK tranche-open" + Metaballs sub-ask: "speedtest AL ratification (open/close events)" | Glass-ui HEAD `3822f48` UNCHANGED since G close. ZERO drift in G-H boundary. 5 commits in G window were glass-ui's own AK-tranche work (InstrumentRail, Aurora opacityCeiling, scrim-breath, instrument-chassis $slots, 17 sub-barrels) — **NONE were any of the 8 standing asks**. Glass-ui has no formal post-AB-family tranche-open (its tranche list — `AB / AB+1 / AB+2 / C / D / D-II / E / F / H / I / J / K / L / M / N / O / P / Q / V` — is unchanged). **Speedtest AL is now OPEN** (planning) — half of the Metaballs sub-ask (c) trigger has FIRED. |
| **G→H-2** | Metaballs ask — value.js is the **sole-identified-consumer** of `glass-ui/MetaballCanvas` (per `G/Q.md §2.1.2` + speedtest `AK/AL-SEED.md §5` AL-CARRY-METABALLS-PUBLISHER-CONSUMERS) | Speedtest AK-W5 + G-PEER-SPEEDTEST | **2-tranche** (G→H) as a NAMED ask | "Re-check at speedtest AL ratification (open/close) OR glass-ui's next non-AK tranche-open. value.js becomes the deciding consumer voice on publisher-retirement." | **AL HALF FIRED**: speedtest AL is OPEN (planning, 2026-05-21 — same day as G's user-ratified merge). `AL-SEED §5 AL-CARRY-METABALLS-PUBLISHER-CONSUMERS` flags "verify at AL W0" — AL W0 cohort is dispatched. **Value.js's H is now the deciding consumer voice on whether `MetaballCanvas` stays a published glass-ui primitive or retires** (since speedtest AK retired its consumer sites). This deserves explicit user ratification in H.W0. |
| **G→H-3** | Contract-v2 §2.1 font-asset residual (glass-ui `dist/glass-ui.css` font-inlining; allows value.js to retire `siblingFsAllowTransient`) | E.W0 Lane A NARROWED | **5-tranche** (D→E→F→G→H) — the original D-open Contract-v2 §2.1 keystone gap | "Re-check at glass-ui's `dist/glass-ui.css` next-publish (currently 0 `@font-face`). Until non-zero, value.js cannot retire `siblingFsAllowTransient`." | Glass-ui ZERO drift in G-H boundary → `dist/glass-ui.css` still has **0** `@font-face` / `data:font` matches (LIVE-VERIFIED). `siblingFsAllowTransient` still LIVE in `vite.config.ts:74,139,198`. **(c) trigger has NOT fired** through 5 tranches. |
| **G→H-4** | keyframes.js precept-pin drift (`458c2d1` vs upstream `68d9b20`) | E.W4 Lane F + E-AUDIT-4 §5 | **4-tranche** (E→F→G→H) | "Re-check at keyframes.js maintainer's next submodule-rebase signal." | LIVE: `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts` → `458c2d1` (UNCHANGED). No G-window write touched the submodule. **(c) trigger has NOT fired** through 4 tranches. |
| **G→H-5** | keyframes.js peer commit `470814e` push status (R11) | F.W2 LOCAL-ONLY | **2-tranche** (G→H) — user-ratified LEAVE LOCAL at G.W0 | "User-ratified LEAVE LOCAL at G.W0. Re-check at the next keyframes.js work-window." | LIVE: keyframes.js HEAD `470814e` UNCHANGED (still LOCAL ONLY). No upstream maintainer work-window observed in G-H boundary. **(c) trigger has NOT fired**; user-ratified posture preserved. |

**Note on G→H-2**: G.W0 named value.js as the sole-identified-consumer in `G/Q.md §2.1.2`. At G close, speedtest's AK-W5 structurally confirmed this (speedtest retired its `CompleteBadge` gold-blob bloom + `meter-idle` Metaballs backdrop per `AL-SEED.md §5`). The AL-half (open) of the (c) trigger fired between G close and H open (2026-05-21). H should treat G→H-2 as a NAMED-SUCCESSOR deferral that the user must ratify in H.W0 — value.js's voice on `MetaballCanvas` publisher-retirement is now a load-bearing constellation decision.

**Note on CW Phase-2**: The seed retires this — per `G/H-SEED §2` footer + `G/Q.md §4.1`, speedtest does NOT consume value.js, so "CW Phase-2 value.js participation" is RETIRED, not carried.

---

## §3 — Chronic-deferred items (3+ tranche carry-through) — THE DOUBLED-CLAUSE BUCKET

Per `G-AUDIT-2 §3` chronicity pattern (A-CHRONIC + B-CHRONIC + D-CHRONIC continuation), extended to G→H boundary. **Every chronic item has chronicity ≥ 3 tranches; many are at 6 tranches at H open** — the doubled-clause emphasis is especially load-bearing for these.

| # | Item | First-deferred | Tranche-count at H open | Systemic cause | Carry-through trace |
|---|---|---|---|---|---|
| **CH-1** | Metaballs API additions — re-scoped 4-5 OPEN sub-asks (pointer input; per-blob opacity; HSV perturbation; WebGL context-loss recovery; `MetaballCanvas mode="layout"` [overlap]; `pauseOnHidden`). NB: original 7 sub-asks → 5 OPEN after AJ-W1-β `positioning` + AJ-W4-γ `:duration` accepted at G open. | A `research/Ae` Ae-10 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked: writer is glass-ui repo. AL ratification half-fired (open); glass-ui non-AK tranche-open half NOT fired. | A-01 → B `coord/Q.md §3` → D `coord/Q.md §3` → E `coord/Q.md §3` → F `coord/Q.md §2` → G F→G-1 (§2.1 renegotiation) → H G→H-1 |
| **CH-2** | Aurora `deriveAuroraPalette` + `deriveAuroraConfig` | A `research/Ae` Ae-11 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked + precept-§10 (wire-before-retire). | A-02 → same trace as CH-1 |
| **CH-3** | `BlobDot` organic-dot primitive (10 `WatercolorDot` instance sites in demo per `G-AUDIT-5 §5`) | A `research/Ae` Ae-13 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked: writer is glass-ui repo. | A-03 → same trace |
| **CH-4** | `SelectTrigger size` prop | A `research/Ad` Ad-16 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked | A-04 → same trace |
| **CH-5** | `DockSelectTrigger`/`SelectTrigger clampLabel` | A `research/Ad` Ad-18 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked | A-05 → same trace |
| **CH-6** | `TooltipContent variant="mono"` | A `research/Ad` Ad-17 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked | A-06 → same trace |
| **CH-7** | `Button size="icon-sm"` rung | A `research/Ad` Ad-5 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked. **Live consumer-side anchor confirmed at H open** (LIVE-VERIFIED): `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16` carries `<!-- TODO: collapse to <Button size='icon-sm'> when glass-ui ships the rung (Q.md ask #7) -->`. | A-07 → same trace |
| **CH-8** | `<Tabs variant="underline">` provider family | A `research/Ab` Ab-10 | **6-tranche** (A→B→D→E→F→G→H) | glass-ui-blocked: glass-ui shipped header-only `<UnderlineTabs>`; demo's `.underline-tabs` reka override stays. | A-09 → same trace |
| **CH-9** | Contract-v2 §2.1 `dist/glass-ui.css` font-inlining residual | D.W1 Step 1 | **5-tranche** (D→E→F→G→H) | glass-ui-blocked: font-inlining authorship belongs to glass-ui. Allows value.js to retire `siblingFsAllowTransient` once non-zero. | D-01 → E-RF-3 → F→G-2 → G→H-3 |
| **CH-10** | keyframes.js precept-pin convergence (`458c2d1` → upstream `68d9b20`) | B coord/Q.md §9 | **6-tranche** (B→D→E→F→G→H) | keyframes.js-maintainer-blocked: peer's submodule SHA encodes intent. | B-10 → D-02 → E-RF-4 → F→G-3 → G→H-4 |
| **CH-11** | Aurora derive-from-color + blob extirpation precept-§10 wire-before-retire (derivative — closes only when CH-2 + CH-3 close) | D research/Dc-aurora + Dd-blob | **4-tranche** (D→E→F→G→H; derivative of CH-2 + CH-3) | derivative — closes only when CH-2 + CH-3 close | D `research/Dc-aurora.md §3` + `Dd-blob.md §6` → E-OTH-1 → F E-OTH-1 carry → G CH-11 |
| **CH-12** | Speedtest CW Phase-2 (was: value.js participation; **RETIRED at G open** — speedtest non-consumer per G `Q.md §4.1` + `G-AUDIT-4 §4.3`) | D coord/Q.md §4 | **5-tranche** (D→E→F→G→H) **— as a TRACKED item; the active-asks framing was RETIRED at G open** | RETIRED: speedtest does not consume value.js. INFORMATIONAL ONLY at G; H preserves the RETIRE. | D-OTH → E-OTH-2 → F→G-4 → G CH-12 RETIRE → H carries RETIRE forward |
| **CH-13** | fourier-analysis Phase-0 quiescence (109-file dirty tree) | Pre-D (chronic since CW Phase-0 inception) | **5-tranche** (D→E→F→G→H) at minimum (likely earlier) | fourier-maintainer-blocked: value.js cannot stash a peer's working tree. NOT on any value.js critical path. | Continuously listed at every Q.md §1 / §6 across D-G; H preserves chronic-stable verdict |
| **CH-14a** | `gh-pages` OIDC-auth half of housekeeping (secrets-config) — the chronic-housekeeping residue after F.W0 Lane A closed the GitHub orphan half | A.W7-performance | **5-tranche** (A→B→D→E→F→G→H; A-19 → B.W4-perf STILL-STANDS → Da §3 Δ6 → E-OTH-5 → F.W0 Lane A [GitHub half closed] → G CH-14a [carried with sharpened trigger] → H) | tooling/infra (orchestrator-owned GitHub Actions secrets config) | A-19 → B-perf → Da §3 → E-OTH-5 → F.W0 Lane A → G CH-14a → H |

**Total chronic-deferred items at H open**: **14**. By chronicity:
- **8 items at 6-tranche carry** (CH-1..CH-8 — the glass-ui primitive asks) — these are the SHARPEST chronic-deferred items, blocked exclusively by glass-ui authorship. The doubled-clause emphasis demands sharpening.
- **3 items at 5-tranche carry** (CH-9 contract-v2 font residual; CH-12 CW Phase-2 [retired-status]; CH-13 fourier dirty tree; CH-14a OIDC-auth).
- **2 items at 6-tranche carry** (CH-10 keyframes.js precept-pin — 6-tranche from B; CH-11 Aurora derivative — 4-tranche from D).

**Structural blocker analysis**:
- **9 are glass-ui-blocked** (CH-1..CH-8 are the 8 primitive asks; CH-9 is contract-v2 font derivative).
- **1 is keyframes.js-blocked** (CH-10).
- **1 is RETIRED but tracked** (CH-12).
- **1 is fourier-maintainer-blocked** (CH-13).
- **1 is orchestrator-infra-owned** (CH-14a OIDC).
- **1 is internal-derivative** (CH-11 — closes when CH-2 + CH-3 close).

---

## §4 — Newly-surfaced post-G items

Items that emerged during G execution OR at G close OR in the G-H boundary, NOT included in §2's H-SEED-authored carry-forward asks but worth ledger inclusion.

### §4.1 — From G H-SEED §3 H-target investigation prompts

| # | Item | Source | Origin | F1+G1-compliance verdict |
|---|---|---|---|---|
| **NS-H1** | Rolldown `//#region` marker strip (~+314 B / +0.25% bundle overhead from G.W1's 1→9-module decomposition) | `G/H-SEED.md §3 #1` + `G/audit/G.W1-lane-b-color-utils-decomposition.md` | G.W1 Lane B explicit out-of-scope ("outside Lane B's file bounds; recommended disposition: accept OR fold a region-comment-strip into a config-owning lane.") | F1+G1-COMPLIANT (documented, named-successor, TIME-BOUND on H open). |
| **NS-H2** | `bench/` provenance hygiene: bench comments cite `src/units/color/conversions/*.ts:NN` line numbers (e.g. `xyz-extended.ts:43`, `transfer.ts:38`); these drift every refactor. H-SEED proposes citing module + symbol only. | `G/H-SEED.md §3 #2` + `G/audit/G.W4-doc-drift-remediation.md §5` | G.W4 doc-drift surfaced the line-number drift in bench files (5 stale `utils.ts` provenance comments repointed to decomposed modules in commit ?). H-SEED proposes an idiomatic hygiene transposition. | F1+G1-COMPLIANT (documented + named-successor). |
| **NS-H3** | `as unknown as` = 4 (irreducible boundary casts at H open — LIVE-VERIFIED): (1) `units/normalize.ts:110` DOM `CSSStyleDeclaration` reinterpret; (2) `units/normalize.ts:319` post-guard narrowing; (3) **`color/dispatch.ts:143` XYZ-hub `fromXYZFn` cast** — G.W2 Lane B explicitly scoped out; needs typed `XYZ_FUNCTIONS` mapped-type lift analogous to G.W2 Lane B `DIRECT_PATHS` lift; (4) `parsing/color.ts:59` clone-reinterpret. H-SEED proposes investigating whether (3) retires under a typed-XYZ-hub transposition + whether an `as-unknown-as` budget proof script (analogous to G2 `proof:as-any-budget`) is worth codifying as a G4 extension. | `G/H-SEED.md §3 #3` + `G/audit/G.W2-lane-c-color-channel-typing.md` | G.W2 Lane C did the analysis; G chose to leave the 4 as genuine boundaries (no cast-laundering — every retirement at G was a real type). | F1+G1-COMPLIANT (analyzed + documented; explicit deferral for H investigation). |
| **NS-H4** | `Color<T>` `[key: string]: any` index signature (G.W2 Lane C INTERNAL-resolved; H-SEED §3 #4 asks whether a deeper `Color` restructure — channels in a typed sub-record — removes the need for a string index entirely). | `G/H-SEED.md §3 #4` + `G/FINAL.md §6` BREAKING-decision-protocol resolution | G.W2 Lane C ran BREAKING decision protocol; resolved INTERNAL. The `[key: string]: any` is structurally required for heterogeneous members + demo dynamic indexing. H-SEED proposes architectural transposition investigation (channels in `.channels.{r,g,b}` sub-record). | F1+G1-COMPLIANT (analyzed + documented; explicit architectural-investigation defer). |
| **NS-H5** | `demo/@/components/custom/goo-blob/useMetaballRenderer.ts` migration to `@mkbabb/glass-ui/metaballs` published surface (gated on the 4-5 OPEN Metaballs sub-asks shipping). | `G/H-SEED.md §3 #5` + `G/Q.md §2.1.2` + `G/FINAL.md §12` | Live published surface verified at G open (`dist/metaballs.{js,d.ts}` exist; `@mkbabb/glass-ui/metaballs` exports map). Migration depends on CH-1 sub-asks shipping (derivative). | F1+G1-COMPLIANT (gated, derivative of CH-1, documented). |

### §4.2 — From G H-SEED §7 open questions for H's opening audit

| # | Item | Source | Origin | F1+G1-compliance verdict |
|---|---|---|---|---|
| **NS-H6** | Demo god-module audit: G audited `src/` only ("`demo/` was only spot-checked" — `H-SEED §7 #1`); is there a remaining god-module risk anywhere in `demo/`? | `G/H-SEED.md §7 #1` | G3 scope was `src/`; `demo/` audit was incidental. | F1+G1-COMPLIANT (explicit scope-extension question for H). |
| **NS-H7** | Should `as unknown as` get its own budget proof script? (codifies G4 to the `as unknown as` corpus — currently 4) | `G/H-SEED.md §7 #2` | G4 codified `as any` ≤ 5 but not `as unknown as`. Derivative of NS-H3. | F1+G1-COMPLIANT. |
| **NS-H8** | Has glass-ui's contraction posture inverted? If yes, the 8 primitive asks become fileable as a non-defer. (Live test: glass-ui's drift in the G window was AK-tranche work, not the 8 asks; contraction-inversion has NOT signaled.) | `G/H-SEED.md §7 #3` | The contraction posture has been the standing CH-1..CH-8 systemic-blocker across 6 tranches. | F1+G1-COMPLIANT. |
| **NS-H9** | Does the `api/` surface have an analogous decomposition candidate to `color/utils.ts` (G audited `api/` and found none > 400 LoC — `H-SEED §7 #4`)? | `G/H-SEED.md §7 #4` | G3 looked; no large god-module surfaced. H confirms or refutes. | F1+G1-COMPLIANT. |

### §4.3 — From G.W4 close audit not previously held

| # | Item | Source | Origin | F1+G1-compliance verdict |
|---|---|---|---|---|
| **NS-H10** | Untracked `docs/tranches/C/` scaffold (`C.md`, `PROGRESS.md`, `coordination/`, `research/`, `waves/`) — exists but never tracked. Per G.md §5 + G.W4 close-lane-3 §7, this scaffold is OUT OF SCOPE FOR G CLOSE; "recorded here for the orchestrator's awareness; not audited." Surfaces in `git status` at every wave-close. | `G/audit/G.W4-close-lane-3-doc-drift.md §7` | Untracked scaffold predating G; presumably a planning-only experiment. NEVER held in any prior ledger explicitly. | F1+G1-MARGINAL: scaffold has been a silently-deferred status quo for ≥ 1 tranche without a (c) trigger. H should bind. Either delete (if abandoned) or track (if intended). |

### §4.4 — From G→H boundary (post-G-close, pre-H-open signals)

| # | Item | Source | Origin | F1+G1-compliance verdict |
|---|---|---|---|---|
| **NS-H11** | **Speedtest AL is OPEN** — planning-phase, 2026-05-21; mandate verbatim matches H-PROMPTS.md (same user-prompt invocation). AL W0 cohort dispatched. AL-CARRY-METABALLS-PUBLISHER-CONSUMERS flags `MetaballCanvas` publisher-retirement as an AL-bound decision. | Live: `speedtest/docs/tranches/AL/AL.md` | Synchronized constellation event — value.js's H + speedtest's AL share a tranche invocation. | INFORMATIONAL — informs G→H-2's (c) trigger landscape; sharpens the H ratification of value.js's publisher-retirement voice. |

**Total newly-surfaced items**: **11** (NS-H1..NS-H11). Of these:
- **5 are H-SEED §3 H-target candidates** explicitly authored by G (NS-H1..NS-H5) — F1+G1-COMPLIANT.
- **4 are H-SEED §7 open audit questions** (NS-H6..NS-H9) — F1+G1-COMPLIANT.
- **1 is a G.W4-surfaced new item lacking a TIME-BOUND trigger** (NS-H10 `docs/tranches/C/` scaffold) — F1+G1-MARGINAL.
- **1 is a peer-signal** (NS-H11 speedtest AL open) — INFORMATIONAL.

**F1+G1-compliance assessment**: NS-H10 is the only true F1-marginal item. H ratifies a (c) trigger via FOLD-INTO-H or RETIRE depending on user signal.

---

## §5 — Per-item H-disposition

The 4 H-disposition classes (per the H-opening directive, inheriting G's pattern):
- **FOLD-INTO-H**: appropriate for H scope (value.js-side action; mechanical OR architectural transposition).
- **RETIRE-MOOT**: no longer relevant.
- **PEER-AUTHORSHIP-REQUIRED**: peer-repo authority (sharpened (c) trigger).
- **CARRY-FORWARD-WITH-SHARPER-TRIGGER**: still defer, but TIME-BOUND not "later".

### §5.1 — Disposition table

| ID | Item | H-disposition | Rationale | Proposed H-target wave OR sharpened (c) trigger |
|---|---|---|---|---|
| **CH-1** | Metaballs API additions (4-5 OPEN sub-asks) | **PEER-AUTHORSHIP-REQUIRED + SHARPENED via NS-H11** | Glass-ui owns API surface. AL ratification half just fired (speedtest AL open); value.js is sole-identified-consumer per `G/Q.md §2.1.2`. The **6-tranche chronic** demands re-ratification at H.W0. | **Sharpened**: Re-check at every H wave-close (greg `git -C glass-ui log --oneline 3822f48..HEAD` + tranche-list grep) + at speedtest AL close. **Hard ceiling: H close ceremony.** If still OPEN at H close with 7-tranche chronicity reached, **escalate to `chronically-bandwidth-gated-upstream`** (a stronger framing than `peer-blocked`). H.W0 should relay the publisher-retirement question to the user explicitly — should value.js endorse MetaballCanvas retirement instead of waiting for the OPEN sub-asks? |
| **CH-2** | Aurora derive helpers | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns API. 6-tranche chronic. | Same as CH-1 trigger. |
| **CH-3** | `BlobDot` primitive | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns API. 6-tranche chronic. 10 `WatercolorDot` consumer sites. | Same as CH-1 trigger; AND H.W0 ratify whether value.js should propose a concrete `BlobDot` shape (mirror `WatercolorDot` props per `G-PEER-GLASS-UI §5.3` idiom — already proposed at G open). |
| **CH-4** | `SelectTrigger size` prop | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns API. 6-tranche chronic. | Same as CH-1 trigger. |
| **CH-5** | `DockSelectTrigger clampLabel` | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns API. 6-tranche chronic. | Same as CH-1 trigger. |
| **CH-6** | `TooltipContent variant="mono"` | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns API. 6-tranche chronic. | Same as CH-1 trigger. |
| **CH-7** | `Button size="icon-sm"` | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns API. 6-tranche chronic; live consumer-side TODO. | Same as CH-1 trigger; AND remove the `PaletteSlugBar.vue:16` TODO IF glass-ui ships during H. |
| **CH-8** | Tabs variant="underline" provider family | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns API. 6-tranche chronic. | Same as CH-1 trigger. |
| **CH-9** | Contract-v2 §2.1 font-asset residual | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns font distribution. 5-tranche chronic. | "Re-check at every H wave-close: `grep -c '@font-face\|data:font' /Users/mkbabb/Programming/glass-ui/dist/glass-ui.css`. If non-zero, FOLD an immediate H mechanical lane to retire `siblingFsAllowTransient` in `vite.config.ts:74,139,198`. Hard ceiling: H close ceremony." |
| **CH-10** | keyframes.js precept-pin drift | **PEER-AUTHORSHIP-REQUIRED** | keyframes.js maintainer authority (submodule SHA encodes intent). 6-tranche chronic. | "Re-check at H close: `git -C keyframes.js submodule status docs/precepts`. If still `458c2d1`, carry to next tranche with same trigger. NOT on any runtime gate." |
| **CH-11** | Aurora derive-from-color + blob extirpation | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** (derivative) | Closes derivatively when CH-2 + CH-3 close. | "Re-check at every H wave-close. If CH-2 + CH-3 ship during H, FOLD a demo-abstraction lane per `G/FINAL.md §12`." |
| **CH-12** | Speedtest CW Phase-2 | **RETIRE-MOOT** (already retired at G open) | Speedtest does not consume value.js (`G/Q.md §4.1` + `G-AUDIT-4 §4.3`). | RETIRE permanently. H preserves the RETIRE; do not re-open. |
| **CH-13** | fourier-analysis Phase-0 quiescence | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | fourier-maintainer-owned; NOT on any value.js critical path. | "Re-check at H close: `git -C fourier-analysis status --short \| wc -l`. If still 109 + zero drift, carry forward with no escalation (chronic-stable)." |
| **CH-14a** | `gh-pages` OIDC-auth half | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | orchestrator-infra-owned (GitHub Actions deploy-secret config). NOT a code-side defer. | "Re-check on user explicit signal OR at the next gh-pages-deploy-policy review. NOT on H critical path. Hard ceiling: H close ceremony; if no signal, carry forward with same trigger language." |
| **G→H-1..5** | (Identical to CH-1..CH-8, CH-9, CH-10, plus R11 keyframes.js push) | (Covered above) | — | — |
| **NS-H1** | Rolldown `//#region` marker strip (~+314 B / +0.25% bundle overhead) | **FOLD-INTO-H** | Value.js-side `vite.config.ts` / `rolldownOptions` mechanical lane. Low value, low risk, clean transposition. G H-SEED explicitly proposed for H. | **FOLD-INTO-H.W1 or H.W2** as a small build-config lane (1-file ~30 min). Verify the regex/option strips region markers without affecting source-map / chunk-split / minify output. Gate: bundle byte-count reduction ≥ 200 B; zero runtime delta. |
| **NS-H2** | bench/ provenance hygiene (cite module + symbol only, not line numbers) | **FOLD-INTO-H** | Value.js-side mechanical refactor of bench comments. Prevents future doc-drift like G.W4's. | **FOLD-INTO-H.W2 or H.W3** as a small bench-hygiene lane (5 files: `bench/color2-direct-paths.mjs` + adjacent). Idiom: `// HSL → RGB closed-form — src/units/color/conversions/cylindrical.ts:hsl2rgb` (symbol, not line). |
| **NS-H3** | `as unknown as` = 4 — XYZ-hub typed transposition + budget proof script | **FOLD-INTO-H** (split into 2 sub-lanes) | (a) Typed `XYZ_FUNCTIONS` mapped-type lift retires `color/dispatch.ts:143` cast (architectural transposition — `G/H-SEED §3 #3` proposes the idiom analogous to G.W2 Lane B `DIRECT_PATHS`). (b) `proof:as-unknown-as-budget` script codifies G4 to the corpus. | **FOLD-INTO-H.W1 (architectural) + H.W2 (proof-script)**. After (a), the corpus drops 4 → 3. After (b), the budget is codified (target ≤ 4, current 3-4). Architectural lane needs careful XYZ-hub typed contract design; not a 30-min lane. |
| **NS-H4** | `Color<T>` `[key: string]: any` index signature — deeper architectural restructure investigation | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | G.W2 Lane C ran BREAKING decision protocol; resolved INTERNAL (structurally required for heterogeneous members + demo dynamic indexing). Removing the index signature requires a significant `Color` restructure (channels in `.channels.{r,g,b}` typed sub-record) — possibly BREAKING for the demo's runtime indexing. H investigates feasibility but does NOT necessarily ship. | **H.W0 / H.W1 investigation lane** (planning-only — produce a feasibility doc + BREAKING-risk verdict). If LOW BREAKING risk + clean transposition: FOLD into H.W3. If MEDIUM-HIGH BREAKING: carry forward to a future tranche with the feasibility doc as anchor. Hard ceiling: feasibility-doc deliverable at H.W2. |
| **NS-H5** | `useMetaballRenderer.ts` → `@mkbabb/glass-ui/metaballs` migration | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** (derivative of CH-1) | Live published surface verified at G open. Migration gated on the 4-5 OPEN sub-asks shipping. | "Re-check at every H wave-close. If CH-1 ships during H, FOLD a `useMetaballRenderer.ts` migration lane. Derivative of CH-1." |
| **NS-H6** | Demo god-module audit (`demo/` spot-checked only at G) | **FOLD-INTO-H** (read-only audit) | G3 scope was `src/`; H extends to `demo/`. Read-only audit can land as part of H's W0 audit cohort (an `H-AUDIT-N` lane). If any `demo/` module > 350 LoC surfaces, FOLD a decomposition lane (analogous to G.W1 Lane B). | **FOLD-INTO-H.W0 audit cohort** as a dedicated audit lane (analogous to G-AUDIT-5 architectural audit). Read-only deliverable: `H-AUDIT-N-demo-architecture.md` with per-file LoC + cohesion verdict. Subsequent decomposition lanes contingent on findings. |
| **NS-H7** | `proof:as-unknown-as-budget` script | **FOLD-INTO-H** (sub-lane of NS-H3) | Codifies G4 invariant pattern to `as unknown as`. Mechanical — pattern matches `proof:as-any-budget`. | **FOLD-INTO-H.W2** alongside NS-H3 (b). |
| **NS-H8** | Glass-ui contraction-posture-inversion check | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** (informational at H open) | Live verification at H open: glass-ui's G-window drift (+5 commits) was AK-tranche work; NONE of the 8 standing asks shipped. **Contraction-posture-inversion has NOT signaled** at H open. | "Re-check at every H wave-close (audit `git log` + diff vs the 8 ask names). If any ask ships during H, FOLD adoption lane(s). Hard ceiling: H close ceremony." |
| **NS-H9** | `api/` god-module audit | **FOLD-INTO-H** (read-only audit) | G spot-checked + found no `api/` file > 400 LoC. H confirms or refutes with a dedicated audit lane. | **FOLD-INTO-H.W0 audit cohort** as a sub-lane of NS-H6 OR as a separate `H-AUDIT-N-api-architecture.md`. Read-only. |
| **NS-H10** | Untracked `docs/tranches/C/` scaffold | **FOLD-INTO-H** | F1+G1-marginal — silently carried as untracked. Either delete (if abandoned planning experiment) or commit + integrate (if intended). H should bind. Mechanical 1-min decision after user ratification. | **FOLD-INTO-H.W0** as a 1-line ratification ask to the user during H.W0 carry-forward relay. If delete: `rm -rf docs/tranches/C/` + record in H.W0 close. If keep: `git add docs/tranches/C/` + integrate into H wave doc structure. |
| **NS-H11** | Speedtest AL opening signal + AL-CARRY-METABALLS-PUBLISHER-CONSUMERS | **INFORMATIONAL** (sharpens CH-1 / G→H-2 trigger landscape) | Live signal; AL W0 dispatched concurrently with H. Value.js's H is the deciding consumer voice. | "H.W0 relay to user: should value.js endorse MetaballCanvas publisher-retirement (since value.js is sole-consumer + the 4-5 OPEN sub-asks have been chronic-deferred across 6 tranches)? Or wait for the sub-asks to ship?" |

### §5.2 — Items considered for RETIRE at H open

Per `F-AUDIT-2 §1.5` retire-with-rationale precedent + `G-AUDIT-2 §5.2`:

- **CH-12 (CW Phase-2)** — RETIRE-MOOT confirmed (already retired at G open per `G/Q.md §4.1`; speedtest non-consumer). H preserves the retire.
- **NS-H10 (`docs/tranches/C/` scaffold)** — candidate for RETIRE-by-deletion if user ratifies as abandoned experiment. FOLD-INTO-H.W0 ratification ask.
- **No other RETIRE candidates** at H open. The 9 chronic glass-ui-blocked items + 1 keyframes.js-blocked item retain their structural blockers. The "bandwidth-gated" retire pattern (`F-AUDIT-2 §1.5`) does NOT apply — every chronic item has an external blocker, not internal bandwidth.

**However**: CH-1..CH-8 at 6-tranche chronicity raise a sharper question. The user should be relayed in H.W0:

> "8 glass-ui primitive asks have carried for 6 tranches (A→B→D→E→F→G→H) without glass-ui authoring them. Glass-ui's recent activity (AJ + AK + 5 G-window commits) has been substantive but never on these 8 asks. Should we (a) continue the chronic carry; (b) re-frame as `chronically-bandwidth-gated-upstream` (escalates ledger framing); (c) propose value.js authors concrete API shapes + hands them to glass-ui (G already authored Metaballs sub-ask shapes — extend to BlobDot, SelectTrigger size, TooltipContent variant); (d) selectively retire individual asks (e.g. fold the consumer-side workaround idiomatically and drop the ask)?"

---

## §6 — Disposition tally

| Disposition | Count | Items |
|---|---|---|
| **FOLD-INTO-H** | **6** | NS-H1 (Rolldown region strip) · NS-H2 (bench provenance) · NS-H3 (XYZ-hub typed + proof script — 2 sub-lanes) · NS-H6 (demo god-module audit) · NS-H7 (`proof:as-unknown-as-budget`, sub-lane of NS-H3) · NS-H9 (api god-module audit) · NS-H10 (`docs/tranches/C/` scaffold ratification) |
| **RETIRE-MOOT** | **1** | CH-12 (CW Phase-2 — already retired at G open) |
| **PEER-AUTHORSHIP-REQUIRED** | **10** | CH-1..CH-8 (8 glass-ui primitive asks — 6-tranche chronic each) · CH-9 (contract-v2 §2.1 font residual — 5-tranche chronic) · CH-10 (keyframes.js precept-pin — 6-tranche chronic) |
| **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | **5** | CH-11 (Aurora derive-from-color + blob extirpation — derivative; 4-tranche chronic) · CH-13 (fourier Phase-0 dirty tree — 5-tranche chronic) · CH-14a (OIDC-auth gh-pages — 5-tranche chronic) · NS-H4 (Color<T> index signature — feasibility doc at H.W2) · NS-H5 (useMetaballRenderer migration — derivative of CH-1) · NS-H8 (contraction-posture-inversion check — informational/active monitoring) |
| **INFORMATIONAL — not a ledger entry** | **1** | NS-H11 (speedtest AL opening — informs CH-1 + G→H-2) |

**Verification arithmetic** (de-duplicated):
- 14 chronic-deferred (§3) — all dispositioned (8 PEER for CH-1..CH-8 + 1 PEER for CH-9 + 1 PEER for CH-10 + 1 RETIRE for CH-12 + 3 CARRY for CH-11/CH-13/CH-14a = 14 entries).
- 11 newly-surfaced post-G (§4.1+§4.2+§4.3+§4.4) — 1 dropped to INFORMATIONAL (NS-H11), 7 FOLD (NS-H1, NS-H2, NS-H3, NS-H6, NS-H7, NS-H9, NS-H10), 3 CARRY (NS-H4, NS-H5, NS-H8).
- 5 inherited from G H-SEED (§2) — G→H-1 ≡ CH-1..CH-8 (the 8 glass-ui asks); G→H-2 ≡ NS-H11 + influences CH-1; G→H-3 ≡ CH-9; G→H-4 ≡ CH-10; G→H-5 ≡ CH-14a / R11 (the R11 keyframes.js push-status — user-ratified LEAVE LOCAL = effectively RETIRED-WITH-USER-RATIFICATION at G.W0). No double-counting.

**Distinct H-disposition entries**: **22** (14 chronic + 8 newly-surfaced [excluding NS-H11 informational] = 22).

**Note vs G's 17**: H grows the ledger by 5 entries vs G's 17. The growth is entirely from G's H-SEED §3 + §7 H-target candidates (NS-H1..NS-H9 + NS-H10 G.W4-surfaced) — items that G EXPLICITLY authored for H to investigate, fully F1+G1-compliant. The ledger arithmetic does not indicate ledger-creep; it indicates G honored its `H-SEED.md` authorship discipline (the FOLD-S3 idiom from speedtest's AL-SEED).

---

## §7 — Per-F1+G1 "No deferrals" sharpening

Per F1's binding ("zero vague later") + G1's extension ("relay before ratification"), every H-disposition entry must carry a TIME-BOUND or EVENT-BOUND (c) trigger.

### §7.1 — Chronic-deferred items at 6-tranche carry (THE DOUBLED-CLAUSE EMPHASIS)

| Item | Tranche-count | F1+G1-sharpening verdict at H open |
|---|---|---|
| CH-1..CH-8 (8 glass-ui asks) | **6-tranche** | The doubled-clause demands re-framing. Trigger landscape: (i) AL-half just fired for CH-1 (Metaballs publisher-retirement decision). (ii) Other 7 asks remain on the "next non-AK glass-ui tranche-open" trigger — but glass-ui's `docs/tranches/` is unchanged since G open. (iii) **PROPOSED H.W0 ratification**: relay 4-option question (continue chronic / re-frame as bandwidth-gated-upstream / propose API shapes / selective retire). |
| CH-10 (keyframes.js precept-pin) | **6-tranche** | EVENT-BOUND on maintainer signal; no signal observed across 6 tranches. **PROPOSED H.W0**: ratify whether to continue as documentation-only-consistency carry OR retire-with-rationale. |

### §7.2 — Items lacking TIME-BOUND triggers at H open (pre-H-fold)

| Item | G-close (c) trigger language | F1+G1-sharpening verdict |
|---|---|---|
| CH-9 (contract-v2 §2.1 font) | "glass-ui's `dist/glass-ui.css` next-publish" | **EVENT-BOUND**; not calendar-bound. **H sharpens**: orchestrator re-greps `dist/glass-ui.css` at every H wave-close; hard ceiling at H close. (Per `G-AUDIT-2 §7.2` already.) |
| CH-13 (fourier dirty tree) | (Chronic-stable, no explicit (c) at G) | **STILL CHRONIC-STABLE**. **H sharpens**: re-check at H close; if still 109 + zero drift, carry forward with no escalation. |
| CH-14a/NS-3 (OIDC half) | (None explicit) | **STILL MISSING CALENDAR-BOUND**. **H sharpens**: re-check on user explicit signal OR at next gh-pages-deploy-policy review; orchestrator-infra-owned. |
| NS-H10 (`docs/tranches/C/` scaffold) | (None — silently untracked) | **F1+G1-MARGINAL.** **H sharpens by FOLD-INTO-H.W0**: ratification ask to user (delete OR commit). |
| NS-H11 (speedtest AL) | (Not a defer — peer-signal) | INFORMATIONAL. Informs CH-1 + G→H-2 (c) trigger landscape. |

### §7.3 — Proposed F1+G1-sharpened (c) triggers for H's coordination/Q.md

The H coordination Q.md (authored after this audit) should encode:

1. **CH-1 (Metaballs)** — "Re-check at speedtest AL close + glass-ui's next non-AK tranche-open. **H.W0 relay to user**: value.js is sole-consumer; should we endorse MetaballCanvas publisher-retirement, or wait for the 4-5 OPEN sub-asks?"
2. **CH-2..CH-8 (7 remaining glass-ui asks)** — "Re-check at every H wave-close (`git -C glass-ui log --oneline 3822f48..HEAD` + tranche-list grep). Hard ceiling: H close ceremony. If still OPEN at H close → escalate ledger framing to `chronically-bandwidth-gated-upstream` (a 7-tranche carry threshold is the proposed escalation marker)."
3. **CH-9 (contract-v2 §2.1 font)** — "Re-check at every H wave-close: `grep -c '@font-face\|data:font' /Users/mkbabb/Programming/glass-ui/dist/glass-ui.css`. If non-zero, FOLD an immediate H mechanical lane to retire `siblingFsAllowTransient` in `vite.config.ts:74,139,198`."
4. **CH-10 (keyframes.js precept-pin)** — "Re-check at H close: `git -C keyframes.js submodule status docs/precepts`. If still `458c2d1`, carry to next tranche. **H.W0 relay to user**: 6-tranche carry without signal — confirm chronic-carry or escalate."
5. **CH-11 (Aurora derive + blob extirpation)** — "Closes derivatively when CH-2 + CH-3 close. If shipped during H, FOLD a demo-abstraction lane."
6. **CH-12 (CW Phase-2)** — RETIRED-MOOT permanently. Do not re-open.
7. **CH-13 (fourier dirty tree)** — "Re-check at H close: `git -C fourier-analysis status --short \| wc -l`. If still 109 + zero drift, carry forward with no escalation."
8. **CH-14a (gh-pages OIDC)** — "Re-check on user explicit signal OR next gh-pages-deploy-policy review."
9. **NS-H1 (Rolldown region strip)** — "FOLD-INTO-H.W1 or H.W2 as a `vite.config.ts` mechanical lane."
10. **NS-H2 (bench provenance hygiene)** — "FOLD-INTO-H.W2 or H.W3 as a bench-comment refactor lane (symbol, not line number)."
11. **NS-H3 (`as unknown as` = 4 → typed XYZ-hub + proof script)** — "FOLD-INTO-H.W1 (typed XYZ-hub) + H.W2 (`proof:as-unknown-as-budget` script). Architectural transposition + invariant codification — extends G2/G4 idioms."
12. **NS-H4 (`Color<T>` index signature)** — "Feasibility doc at H.W2; if LOW BREAKING risk, FOLD into H.W3; otherwise carry forward."
13. **NS-H5 (`useMetaballRenderer.ts` migration)** — "Derivative of CH-1; FOLD when CH-1 ships."
14. **NS-H6 (demo god-module audit)** — "FOLD-INTO-H.W0 audit cohort as a read-only lane; FOLD decomposition lane(s) contingent on findings."
15. **NS-H7 (`proof:as-unknown-as-budget`)** — "FOLD-INTO-H.W2 as a sub-lane of NS-H3."
16. **NS-H8 (glass-ui contraction-posture inversion)** — "Active monitoring at every H wave-close; FOLD adoption lanes if any of CH-1..CH-8 ships."
17. **NS-H9 (api god-module audit)** — "FOLD-INTO-H.W0 audit cohort as a read-only sub-lane (or merged with NS-H6)."
18. **NS-H10 (`docs/tranches/C/` scaffold)** — "FOLD-INTO-H.W0 as a 1-line ratification ask: delete OR commit."
19. **NS-H11 (speedtest AL opening)** — INFORMATIONAL. Sharpens CH-1 (c) trigger landscape.

---

## §8 — Verdict — overall

**Total ledger entries**: **22** (14 chronic-deferred + 8 newly-surfaced excluding informational; informational +1 = 23 with NS-H11).

**Disposition breakdown**:
- **6 FOLD-INTO-H** (mechanical + architectural value.js-side actions).
- **1 RETIRE-MOOT** (CH-12 CW Phase-2 — already retired at G open).
- **10 PEER-AUTHORSHIP-REQUIRED** (CH-1..CH-8 + CH-9 + CH-10 — the 9 glass-ui-blocked + 1 keyframes.js-blocked, plus 1 derivative).
- **5 CARRY-FORWARD-WITH-SHARPER-TRIGGER** (CH-11 + CH-13 + CH-14a + NS-H4 + NS-H5 + NS-H8).
- **1 INFORMATIONAL** (NS-H11).

**Chronic-deferred items (3+ tranche carry) — the doubled-clause bucket**: **14 items**, with:
- **9 items at 6-tranche carry** (CH-1..CH-8 the 8 glass-ui primitive asks + CH-10 keyframes.js precept-pin) — the SHARPEST chronicity.
- **4 items at 5-tranche carry** (CH-9 contract-v2 font + CH-12 CW Phase-2 retired + CH-13 fourier + CH-14a OIDC).
- **1 item at 4-tranche carry** (CH-11 Aurora derivative).

**Chronic-deferred sharpening per the doubled-clause emphasis**:
- **CH-1 is sharpened by NS-H11**: speedtest AL is now OPEN; AL-CARRY-METABALLS-PUBLISHER-CONSUMERS makes value.js the deciding consumer voice. H.W0 must relay the publisher-retirement question to the user.
- **CH-1..CH-8 collectively** (the 6-tranche carry on glass-ui primitive asks): H.W0 should relay the 4-option ratification ask to the user (continue / escalate framing / propose API shapes / selectively retire). The doubled clause demands this not be silently re-carried for a 7th tranche.
- **CH-10** (6-tranche carry on keyframes.js precept-pin): H.W0 should ratify chronic-carry-OR-retire-with-rationale.

**F1+G1 "No deferrals" verdict at H open**: ALL 22 ledger entries have TIME-BOUND or EVENT-BOUND (c) triggers. ZERO items remain silently deferred at H open. NS-H10 (`docs/tranches/C/` scaffold) was the only F1+G1-marginal item entering H; H FOLDs it via H.W0 ratification ask. The doubled-clause directive is honored: §3 enumerates chronic-deferred separately from §4 newly-surfaced, with explicit chronicity counts.

**Recommended H wave allocation** (subject to H.W0 user ratification per G1):
- **H.W0** (planning + audit cohort): 6-agent audit + NS-H6 demo god-module audit + NS-H9 api god-module audit + NS-H10 `docs/tranches/C/` ratification + carry-forward relay to user (CH-1..CH-8 4-option ask + CH-1/G→H-2 Metaballs publisher-retirement ask + CH-10 6-tranche-carry ratification).
- **H.W1**: NS-H3 architectural lane (XYZ-hub typed `XYZ_FUNCTIONS` mapped-type lift, retires `as unknown as`#3) + NS-H1 Rolldown region strip mechanical lane.
- **H.W2**: NS-H3 sub-lane (`proof:as-unknown-as-budget` script) + NS-H2 bench provenance hygiene + NS-H4 `Color<T>` feasibility doc.
- **H.W3**: contingent on NS-H4 feasibility (architectural lane if LOW BREAKING) + contingent FOLD lanes if CH-1..CH-8 ship during H + NS-H5 derivative (if CH-1 ships) + CH-9 derivative (if `dist/glass-ui.css` non-zero) + NS-H6 / NS-H9 decomposition lanes contingent on H.W0 audit findings.
- **H.W4** (close ceremony): plan-vs-actual + integrity sweep + chronic-ledger re-verification + H-SEED.md authorship for the next tranche.

---

## §9 — Authority

This ledger was assembled from (READ-ONLY):

**Canonical post-G substrate**:
- `docs/tranches/G/coordination/Q.md` §1, §2, §3, §4, §5, §6.A, §6.B, §7, §7.1 (full file read).
- `docs/tranches/G/FINAL.md` §3, §6, §7, §10, §12 (full file read).
- `docs/tranches/G/H-SEED.md` §1, §2, §3, §4, §5, §6, §7, §8 (full file read).
- `docs/tranches/G/audit/G-AUDIT-2-deferred-ledger.md` (full 266 LoC, full file read).
- `docs/tranches/G/audit/G.W1-lane-b-color-utils-decomposition.md` (Rolldown region marker disposition).
- `docs/tranches/G/audit/G.W2-lane-c-color-channel-typing.md` (`as unknown as` corpus analysis).
- `docs/tranches/G/audit/G.W4-close-lane-3-doc-drift.md` §7 (untracked `docs/tranches/C/` scaffold note).
- `docs/tranches/G/audit/G.W4-close-lane-4-idiomatic-gestalt.md` (F1-F4 + G1-G4 HOLD verdicts).
- `docs/tranches/G/audit/G.W4-close-lane-7-integrity-sweep.md` (zero cross-repo writes verified).
- `docs/tranches/G/audit/G.W4-doc-drift-remediation.md` (bench-provenance line-number drift remediation).
- `docs/tranches/H/H-PROMPTS.md` (H-opening directive verbatim).

**Predecessor inheritance trace**:
- `docs/tranches/F/audit/F-AUDIT-2-deferred-ledger.md` (F's 18-item ledger).
- `docs/tranches/E/audit/E-AUDIT-2-deferred-ledger.md` (E's 38-item precedent + A-CHRONIC + B-CHRONIC + D-CHRONIC).

**Live peer-repo state verifications at H open (2026-05-23)**:
- `git -C /Users/mkbabb/Programming/glass-ui rev-parse HEAD` → `3822f48` (UNCHANGED since G close).
- `git -C /Users/mkbabb/Programming/glass-ui log --oneline e150e2f..HEAD` → 5 commits, none of which are CH-1..CH-8 (glass-ui's own AK-tranche work).
- `git -C /Users/mkbabb/Programming/glass-ui ls docs/tranches/` → tranche list unchanged since G open (no new post-AB-family open).
- `grep -c '@font-face\|data:font' /Users/mkbabb/Programming/glass-ui/dist/glass-ui.css` → **0** (CH-9 trigger NOT fired).
- `git -C /Users/mkbabb/Programming/keyframes.js rev-parse HEAD` → `470814e` (UNCHANGED).
- `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts` → `458c2d1` (UNCHANGED).
- `git -C /Users/mkbabb/Programming/speedtest rev-parse HEAD` → `e9f85c16` (+18 commits in G window; AK CLOSED; AL OPEN).
- `ls /Users/mkbabb/Programming/speedtest/docs/tranches/AL/` → `AL.md` present (AL is OPEN; mandate matches H-PROMPTS.md verbatim).
- `git -C /Users/mkbabb/Programming/fourier-analysis rev-parse HEAD` → `926ca6a` (UNCHANGED; 109 dirty files).

**Live in-tree verifications at H open**:
- `grep -rn '@deprecated\|@ts-ignore' src/` → 0 hits (F2 + F.W1 Lane A + `proof:no-deprecated` + `proof:no-ts-ignore` HOLD).
- `grep -rn 'TODO\|XXX\|FIXME' src/` → 0 hits.
- `grep -rn 'as any' src/` → 0 hits (G2 EXCEEDED; `proof:as-any-budget` HOLD).
- `grep -rn 'as unknown as' src/` → 4 hits (`normalize.ts:110`, `normalize.ts:319`, `dispatch.ts:143`, `color.ts:59`).
- `grep -rn 'TODO\|XXX\|FIXME' demo/@/` → 1 hit (`PaletteSlugBar.vue:16` — CH-7 chronic anchor at 6-tranche carry).
- `grep -n 'siblingFsAllowTransient' vite.config.ts` → 3 hits (lines 74, 139, 198 — CH-9 trigger still LIVE).
- `git status --short docs/tranches/C/` → untracked scaffold present (NS-H10 marginal).

---

**End of H-AUDIT-2.** 22 distinct H-disposition entries (6 FOLD + 1 RETIRE + 10 PEER + 5 CARRY) + 1 informational (NS-H11). 14 chronic-deferred items (3+ tranche carry-through) of which **9 sit at 6-tranche carry** (8 glass-ui primitive asks + keyframes.js precept-pin) — the doubled-clause emphasis is especially load-bearing for these. Per F1+G1 "No deferrals" inheritance: ZERO items remain silently deferred at H open. The H-AUDIT-2 ledger feeds H's wave allocation (6 FOLD-INTO-H items get bound to specific H lanes — including the H.W0 ratification ask for CH-1..CH-8 6-tranche chronicity + CH-1/Metaballs publisher-retirement decision per NS-H11) and the H `coordination/Q.md` cross-repo manifest (10 PEER-AUTHORSHIP-REQUIRED items + 5 CARRY-FORWARD-WITH-SHARPER-TRIGGER items become standing asks with sharpened (c) triggers per §7.3).
