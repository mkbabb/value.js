# value.js truth table — tranches A..M

**Seat**: B:value-tranches-AM (Opus banausic band, M-14 excavation swarm).
**Model observed**: `claude-opus-5[1m]` (system-declared; `ANTHROPIC_MODEL` env unset — no override in force).
**Date**: 2026-07-27. **Repo**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
**Corpus read**: `docs/tranches/{A..M}` — every `FINAL.md` (where present), every charter (`X.md`), every `PROGRESS.md`, plus wave specs and audit docs where a claim needed grounding.

**Evidence rule honored**: every LANDED cell carries a commit SHA that I resolved with `git log --oneline -1 <sha>`; every SILENT-DROP cell carries either a pasted `find`/`grep`/`ls` result against the live tree or a `git log --diff-filter=D` deletion commit. Memory recall was used for **navigation only**, never as evidence — every memory-suggested claim in this file was re-derived from the tree.

---

## §0 — Corpus census (the first finding)

| Tranche | `FINAL.md` | Waves promised | Waves executed | Close form |
|---|---|---|---|---|
| A | ✅ (72 ln) | 8 (W0–W7) | 6 executed + 1 re-scoped + 1 ceremony | **closed by its SUCCESSOR** — B.W0 wrote A's FINAL |
| B | ✅ (68 ln) | 5 (W0–W4) | 5 | self-closed |
| C | ✅ (153 ln) | 5 (W0–W4) | **0** | **RETIRED retroactively** (AB+1 pattern), 7 days after authoring |
| D | ✅ (229 ln) | 7 (W0–W6) | 7 | self-closed, `v0.6.0` |
| E | ✅ (256 ln) | 6 (W0–W5) | 6 | self-closed, `v0.7.0` |
| F | ✅ (207 ln) | 5 (W0–W4) | 5 | self-closed, `v0.8.0` |
| G | ✅ (225 ln) | 5 (W0–W4) | 5 **+ an undocumented W5** | self-closed, `v0.9.0` |
| H | ✅ (142 ln) | 6 (W0–W5) | 6 | self-closed, `v0.10.0` |
| I | ✅ (102 ln) | 6 (W0–W5) | 6 (W4 "GREEN-partial") | paired close w/ fourier-E |
| J | ✅ (71 ln) | 6 (W0–W5) | 3 executed, 1 booked, 1 partial | **FINAL committed under a K commit; no J-attributed code commit exists** |
| K | ❌ **ABSENT** | 9 (W0,W1,W2,W2.5,W2.6,W3,W4,W5,W6) | **3** (W0,W1,W2) | **NEVER CLOSED** |
| L | ✅ (129 ln) | 5 (W0–W4) | 5 (W4 re-scoped) | self-closed |
| M | ❌ **ABSENT** | 10 (W0–W9) | **1** (W0 = the charter) | **NEVER RATIFIED, NEVER CLOSED** — superseded by N |

> **Finding C-0 / K-0 / M-0 — three of thirteen tranches never reached a close ceremony under their own letter.** C retired without executing a single wave; K stopped at W2 of nine and has no `FINAL.md` (`ls docs/tranches/K/FINAL.md` → *No such file*); M authored a 10-wave charter, dispatched nothing, and has no `FINAL.md`. An unclosed tranche is a finding: **23% of the A..M corpus is a plan that never met a close-honesty checklist.**

---

## §1 — Tranche A (2026-05-18 → 2026-05-19)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| W0 consumer un-break + repo hygiene | ✅ `bc7ad2c` (verified: *"chore(tranche-a/w0): register docs/precepts submodule + commit tranche A plan substrate"*) + `c20f609`, `c43fc76` | — | — | — |
| W1 Card `variant`→`tier` (11 sites) | ✅ `92fe64d` (verified: *"fix(tranche-a/w1): migrate 11 Card sites off the stale variant prop to tier"*) | — | — | — |
| W2–W5 (style, tokens, states, a11y) | ✅ per `A/FINAL.md §2` | **W5 "was complete in the working tree but committed nowhere"** — `A/FINAL.md` header. B.W0 Lane A had to ratify-and-commit it. | — | — |
| W6 blob/aurora abstraction (conditional on glass-ui API) | re-scoped `065c6fe` | Gate was *"the duplication is deleted (deletion proof)"*; it was neither deleted nor shipped for **8 more tranches** — `useMetaballRenderer.ts` finally died at `e32111c7` (**N**.W5, 2026-06-11). | — | — |
| W7 close ceremony | ran **inside B.W0** | A's own close was structurally impossible — `A.md §3` sequenced W7 after W6, which was gated on a peer repo. | — | — |
| 13 user mandates (`A/FINAL.md §3`) | 9 FULL | **4 PARTIAL** (#8 root-level restyle, #9 glass-ui for all, #12 library-side AND, #13 Playwright flows + blob/aurora) | `Ab-16` PointerDebugOverlay hardcoded colors (*"dev-only iOS-Safari debugging surface … no design-token obligation"*); `Ad-20` SelectContent literals (*"genuinely not worth fixing as a single change"*); `Ae-12` aurora cursor seam (*"a known seam, not a blocker"*) | — |
| The 7 standing glass-ui gaps (`coordination/Q.md §3`) | filed | — | — | **SILENT DROP by attrition.** Carried verbatim A→B→D→E→F→G→H (7 tranches of "STAND — NOT SHIPPED"). At K.W1 the grounded re-audit found *"The '8 glass-ui asks' collapse to ~4 net-new: Tabs-underline already ships (`UnderlineTabs.vue`); BlobDot = the WatercolorDot lift; Metaballs API = the GooBlob lift"* (`K/PROGRESS.md`, K.W1 grounding corrections). **Half the ask-list had been satisfiable the whole time and nobody re-grounded it for a year of tranches.** |

---

## §2 — Tranche B (2026-05-18 → 2026-05-19)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| B.W0 close A + precept advance `3310a8c`→`3c32fae` | ✅ `de8c573` (verified: *"chore(precepts): advance shared submodule to 3c32fae (glass-ui Q.W6 — invariants 30-33)"*) | — | — | — |
| B.W1 a11y corrections + `--dock-pos` deletion + `floating-panel-item` strip | ✅ `bda38b6`…`5db9746` | — | — | — |
| B.W2 `usePaneRouter` transposition + hero-lab + UnderlineTabs | ✅ `9091e12` (verified: *"fix(tranche-b/w2): hero-lab pass — index narrowing (-31 type errors), prefers-reduced-motion on 4 RAF loops"*) | UnderlineTabs migration **RE-FILED, not landed** — *"glass-ui shipped the wrong shape (header-only); demo keeps reka-ui `<Tabs>`"* (`B/FINAL.md §3` row F) | — | — |
| B.W3 library gap audit + **e2e abrogation 16 specs → 3-spec smoke** | ✅ `7b6b473`…`31da0d6` | — | The 16-spec Playwright suite — deliberately deleted as *"brittle"*. | **Reversed by accretion**: D.W5 took it 3→21, E.W3 21→36, today `find e2e -name '*.spec.ts' \| wc -l` → **71** across 6 projects. The abrogation thesis lasted exactly one tranche. |
| B.W4 close | ✅ `6d1cb40`, `719d2a6` | — | — | — |
| Routed: 11 `src/` library gaps → *"a value.js library-maintenance effort"* | — | — | — | **SILENT DROP.** No tranche letter was ever assigned. The phrase "library-maintenance effort" appears in `B/FINAL.md §3` and **never again in C..M**. Individual gaps were absorbed opportunistically into D.W1's barrel lane; the ledger `audit/B.W3-library-gap.md` was never reconciled. |
| Routed: ~126 generated shadcn-vue typecheck cluster → *"generator-update / vendoring-policy effort"* | ✅ discharged at F.W1 Lane C `1401d75` (verified: *"chore(demo/w1): zero-consumer shadcn-vue subdir sweep + VENDOR-POLICY refresh"*) | — | — | The **VENDOR-POLICY.md** that F refreshed no longer exists: `ls VENDOR-POLICY.md` → *No such file or directory*. Deleted in K's de-ceremony (see §11). |

---

## §3 — Tranche C (authored 2026-05-18 · RETIRED 2026-05-26)

**Zero waves executed. Zero C-attributed commits exist.** This is the corpus's purest silent-drop instrument, and — to its credit — the only one that documented itself as such.

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| C.W0 open on a ratified cross-repo `CRUD-CONTRACT.md` | — | — | — | **NEVER MET.** `find . -name 'CRUD-CONTRACT.md' -not -path './node_modules/*'` → **empty**. The 973-line fourier-side contract was never ratified by value.js. |
| C.W1 library `Palette` domain at `src/palette/` + `colorScale` + `sampleToSVGPath` | — | — | — | **ORPHANED — still absent 14 months later.** Live probes 2026-07-27: `find src -iname 'palette*'` → **empty**; `grep -rn "export.*colorScale" src/` → **empty**; `grep -rn "sampleToSVGPath" src/` → **empty**. |
| C.W2 api alignment (`formatPalette ??`, `cron.ts $nin`, schema migration, `api/src/crud/`) | ✅ discharged **under D and E theses** — `ee8bfa4` (verified: *"chore(api/w2): excise legacy + fail-explicit revisions…"*) and `417c3a5` (verified: *"refactor(api/w2): retire two-speed backend + wire client.withTransaction…"*) | The discharge is **attribution-only**; C's own `api/src/crud/` 8-file utility-module shape was never built. | `api/src/crud/` utility-module shape — **OBVIATED**: *"D.W2 Lane C's parallel evolution chose a different shape … No successor."* | — |
| C.W3 demo native `Palette` consumption | — | — | — | ORPHANED (follow-on of W1). |
| `slugWords.ts` → shared `coordination/SLUG-WORDS.md` precepts data (U2 spec) | — | — | — | **SILENT DROP, confirmed live.** `find . -name 'SLUG-WORDS*'` → **empty**. `api/src/modules/session/slugWords.ts` still opens with `const ADJECTIVES = [ "ancient", "arctic", "astral", … ]` — hardcoded, exactly as C described it in May 2026. C called this *"PENDING-NO-PULL"*; nothing has pulled since. |
| Cohort invariant 15 — *domain model in the library, persistence in the app* | — | — | — | **UNMET and named as the load-bearing miss** in `C/FINAL.md §4`. Still unmet. |

> **Honest note**: C is the corpus's best-behaved failure. Its `FINAL.md` names each miss, prints the deletion-proof-as-absence (`find … → empty`), and refuses to launder the D/E discharge as C's own. It is the template for how the mega-tranche should retire a plan.

---

## §4 — Tranche D (2026-05-19 → 2026-05-20, `v0.6.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| D.W0 precept advance `3c32fae`→`68d9b20` | ✅ `11abd86` (verified: *"chore(precepts): advance shared submodule to 68d9b20 (contract-v2 codification)"*) | — | — | — |
| D.W1 contract-v2 + barrel + `Color<T>` flatten | ✅ `73fdabc`, `14d35fa`, `6ca2046`, `059cf72` (verified: *"refactor(library/w1): flatten Color<T> Map → own properties + 4 recursion-prevention hardening primitives"*) | — | — | — |
| D.W2 api refactor, 4 lanes | ✅ `626b107` (verified: *"feat(api/w2): introduce service+repository+errors+events+DI middleware+zod pipeline rails"*), `491a5d8`, `b7d7c63`, `ee8bfa4` | — | — | — |
| D.W3 frontend cohesion | ✅ `3359a97`, `4d439bf`, `ea08102`, `cea5e3f` | — | — | `viewSchema.ts` **survives** (`demo/shell/viewSchema.ts`) — a rare durable D artefact. |
| D.W4 styling — 51 token reaches → 0 + `demo/DESIGN.md` 24→133 lines | ✅ `5674d1f` (verified) | Pixel-diff gate **substituted** by "byte-isomorphism analysis" to *"preserve the 120-min cap"* — the runtime visual gate the wave promised never ran. | — | `demo/DESIGN.md` survives at **38 KB** (grew ~10×; no longer the 133-line catalog D specified). |
| D.W5 Playwright 3 → 21 specs, 3 projects, **CI runs all 3** | ✅ `707d1be` (verified: *"test(e2e/w5): expand smoke suite 3 → 20 specs…"*), `f374f13` (verified: *"…3-project playwright config + CI runs all 3"*) | — | — | **SILENT DROP.** Today `.github/workflows/ci.yml` is 71 lines and runs `lint`, two `vue-tsc` invocations, `build`, `test`, a pack step, and `verify-packed-surface.mjs`. **There is no Playwright step at all.** 71 e2e specs across 6 projects exist and nothing in CI runs them. |
| Gate #5 `proof:resolution` (the contract-v2 gate, ported from glass-ui `ce5aad8`, 366 lines) | ✅ landed D.W1 | — | — | **DELETED.** `git log --oneline --diff-filter=D -1 -- scripts/proof-resolution-contract.mjs` → `c4c58421 feat(K.W2a): tsconfig.lib/demo split…`. Gone from `package.json` scripts and from CI. |
| Gate #8 L8 microbench ≥5× (`bench/color-channel-access.mjs`) | ✅ 10.09× at close | — | — | **DELETED.** The whole `bench/` tree (11 files incl. `color-channel-access.mjs`, `color2-direct-paths.mjs`, `parser-namelookup.mjs`) was removed at `164343c1 feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees`. Every bench gate D/E/F/G/H asserted is now unrunnable. |
| Successor #2 "value.js demo-abstraction post-glass-ui-ship — deletes `useMetaballRenderer.ts` (333 LoC) + `WatercolorDot/`" | ✅ eventually — `e32111c7` (**N**.W5: *"blob fork (1270 LoC) → glass-ui goo-blob … watercolor fork + global #watercolor-filter extirpated"*) | Carried A→B→D→E→F→G→H→K→M before landing at N. **9 tranches.** | 12 library-perf claims (`LIB-RX`) rejected at the KISS gate; reasoning preserved. | — |
| `FINAL.md §10` authority block | — | **`Close-ceremony commit SHA: <this commit> (to be filled by orchestrator at commit time)` and `Merge commit SHA: TBD` — NEVER FILLED.** Read verbatim from `docs/tranches/D/FINAL.md:219,221` today. | — | — |

---

## §5 — Tranche E (2026-05-20, `v0.7.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| E.W1 library transposition (5 lanes) | ✅ `8db0e89` (verified: *"chore(library/w1): retire 51-export barrel surface + vue-router devDep + dead unit-tuple exports + lerpLegacy E5 JSDoc"*), `b4bc8ea`, `5cf4271`, `2413d61`, `762c11c` | *"13 of 15 transposition opportunities landed; 1 deferred; 2 routed"* — 2 of 15 quietly reclassified as routing. | — | — |
| E.W2 api pipeline parity (6 lanes) | ✅ `417c3a5` (verified), `6945a0d` (verified: *"refactor(api/w2): split api/src/middleware.ts (279 LoC god module) into middleware/{cors,rate-limit,…}"*), `a8e4de3`, `1e1b248`, `bf29b71` | — | — | — |
| E.W3 e2e 21 → 36 specs + `smoke-safari` WebKit project | ✅ `0f490cc`, `aa2d62a`, `0d74e05` | — | — | `smoke-safari` **survives** in `playwright.config.ts:252` — but see D's row: CI runs no Playwright, so the WebKit project E built to catch iOS-Safari engine bugs has never gated anything since K. |
| E.W4 vendor policy + **CI bench gate** + motion canon | ✅ `8e42a2d`, `f1d2005` | — | Motion-canon "Family B" reviewed + **not adopted** with rationale. | **SILENT DROP ×2.** (a) `VENDOR-POLICY.md` — `ls` → *No such file*. (b) The CI bench gate — `bench/` deleted at `164343c1`; no bench step in `ci.yml`. |
| `lerpLegacy` retirement, DEFERRED with (a)(b)(c) trigger | ✅ discharged at F.W3 `1ead49e` (verified: *"feat(library/w3)!: delete lerpLegacy — F2 invariant satisfied + v0.8.0 BREAKING"*). Live check: `grep -rn "lerpLegacy" src/` → **empty**; `grep -rn "@deprecated" src/` → **empty**. | — | — | — |
| `scripts/migrate-keyframes-js-lerp.mjs` — the **published** consumer codemod | ✅ authored E.W4 | — | — | **SILENT DROP.** `git log --diff-filter=D -1 -- scripts/migrate-keyframes-js-lerp.mjs` → `c4c58421` (K.W2a). Today `scripts/` contains only `ci/`, `deploy/`, `dev/`, `fonts/`, and `package.json`'s `files` field is `["dist","!dist/gh-pages","!dist/gh-pages/**"]` — the migration path E published for downstream consumers, and that G gated on being *"in the npm tarball"*, is gone from both the repo and the package. |
| `FINAL.md §2` E.W5 commit inventory | — | **Placeholders, never filled**: *"(close-audit synthesis + FINAL.md)"*, *"(chore(release): v0.7.0 …)"*, *"Merge commit + v0.7.0 tag"* — three parenthetical stubs where SHAs belong. | — | — |

---

## §6 — Tranche F (2026-05-21, `v0.8.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| F1 "No deferrals" — 18 inherited items disposed | ✅ per `audit/F-AUDIT-2` | 3 items reclassified PEER-AUTHORSHIP-REQUIRED (a disposition that never resolves by value.js action) | 5 items RETIRE-MOOT | — |
| F2 `lerpLegacy` retires | ✅ `1ead49e` (verified) | — | — | — |
| F3 cross-repo write boundary — 1 authorized write to keyframes.js `470814e` | ✅ | **"LOCAL ONLY; user-discretionary push"** — carried unpushed through G (*"R11 = LEAVE LOCAL per user ratification"*, `G/FINAL.md §3`) and H (*"status unchanged from G ratification"*, `H/FINAL.md §7`). A cross-repo commit that satisfied an invariant while never reaching the peer's remote. | — | — |
| F.W1 Lane C — 29 zero-consumer shadcn subdirs swept (165→22 files, −588 KiB) | ✅ `1401d75` (verified) | — | — | — |
| **F-NEW gate #13** — `proof:dts-layout` dts-shape invariant + CI step | ✅ `cf42c6c` (verified: *"feat(ci/w3): CI substrate hygiene — broaden CHANGELOG-gate + tighten vue-tsc + dts-shape guard + bundle…"*) | — | — | **SILENT DROP.** `git log --diff-filter=D -1 -- scripts/proof-dts-layout.mjs` → `c4c58421` (K.W2a). No dts-shape gate in today's `ci.yml`. |
| **F-NEW gate #14** — `dist/value.js` ≤ 148,480 B bundle gate | ✅ landed F.W3 Lane E | — | — | **SILENT DROP.** `grep -rn "bundle\|148480\|145" .github/workflows/` → one unrelated hit. No bundle-size gate survives. |
| CHANGELOG-changed CI gate (broadened at F.W3, base-ref defect fixed at G.W1 `96894eb`) | ✅ | — | — | **SILENT DROP.** No CHANGELOG step in `ci.yml`. |
| `FINAL.md §4` commit inventory rows 11–13 | — | **`(this commit)` / `(next)` / `(merge)`** — three unresolved SHA cells. | — | — |

---

## §7 — Tranche G (2026-05-22, `v0.9.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| **G2** — `as any` in `src/` 35 → ≤5 | ✅ **0** — `23ec904`, `ef8a80b` | — | Public `Color<T>` channel-accessor BREAKING change ran the decision protocol and resolved **INTERNAL** (index signature kept). | — |
| **G3** — `color/utils.ts` 1,430 LoC → 9 modules ≤350 | ✅ `413b47e` (verified: *"refactor(library/w1): decompose src/units/color/utils.ts 1430 LoC → 9 focused modules (G3; G.W1 Lane B)"*) | The wave itself regressed: `dispatch.ts` grew to **391 LoC**, caught only by the close audit, remediated `9902036` (verified). Then re-breached at 372 LoC by K.W0's measurement — *"OVER the G3 ≤350 cap (monitor trigger FIRED)"* (`K/PROGRESS.md`). A cap that needed re-fixing in two consecutive tranches. | — | — |
| **G4** — *"6 new proof scripts codify the F-thesis + G-thesis invariants as runtime-checkable artefacts"* (one of the three declared axes of G's thesis) | ✅ `61314fa` (verified: *"feat(scripts/w3): codify 6 invariant proof scripts + extend proof:resolution (G4; G.W3 Lanes A,B,C,D,H,I,J,K)"*) | — | **REJECTED 12 DAYS LATER, by the owner.** `K/PROGRESS.md`: *"`proof:*` codification idiom RETIRED as overfit. … The 9 `scripts/proof-*.mjs` + `package.json` `proof:*` entries are **deleted**."* Deletion commit `c4c58421` removes `proof-as-any-budget.mjs`, `proof-as-unknown-as-budget.mjs`, `proof-codemod-publication.mjs`, `proof-dts-layout.mjs`, `proof-resolution-contract.mjs`, `migrate-keyframes-js-lerp.mjs`. **An entire declared tranche axis, deleted as overfit within a fortnight.** | — |
| G gates #15–#21 (the 7 G-NEW proof gates) | all PASS at close | — | — | **All 7 gates are now unrunnable.** Every `npm run proof:*` in `G/FINAL.md §5` refers to a script that no longer exists. |
| **G.W5** | — | — | — | **SILENT DROP — an undocumented wave.** `f895048e chore(release): G.W5 — CI workflows + changesets + release-readiness baseline` (2026-05-28) exists in git. `grep -n "W5\|changeset" docs/tranches/G/FINAL.md` → **zero hits**. `grep -n "W5" docs/tranches/G/PROGRESS.md` → one hit, and it refers to *speedtest's* AK-W5, not value.js. G's FINAL declares a complete 24-row commit inventory ending at the merge; **a whole wave ran after the close and is recorded in neither the FINAL nor the PROGRESS board.** It is cited exactly once in the corpus — as the baseline row in `I/FINAL.md §2`. |
| Changesets apparatus (installed at the undocumented G.W5) | `.changeset/README.md` + `config.json` | — | — | **DEAD ON ARRIVAL.** `ls -a .changeset` → only `README.md` and `config.json`; **zero changeset files ever authored**. `grep -n "changeset" .github/workflows/release.yml` → **zero hits**. Fourteen months of releases (v0.9.0 → v4.0.0) shipped without it. |
| `FINAL.md §4` rows 20–24 | — | **SHA column contains the literal words `audit`, `docs`, `docs`, `chore`, `merge`** — five commits with no hashes. | — | — |

---

## §8 — Tranche H (2026-05-26, `v0.10.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| **H1** — `withTransaction` coverage 9 → 16 sites + standing reference doc | ✅ `ef39ad9` (verified: *"fix(api/w1): close H1 cascade-correctness (16 wrapped sites) + lift api/tsconfig to root strictness"*), `9c32e7a` | — | 3 documented carve-outs (D1/D2/D3) | **Quietly reduced later**: `fe3c00c7` (N.W3) — *"txns 18→14 justified-each"*. H's 16-site invariant was renegotiated downward two tranches on without an H-facing record. |
| **H2** — `as unknown as` 4 → ≤2, budget tightened to no-headroom | ✅ `62fe15d`, `3b0d933` | Budget enforced by `proof:as-unknown-as-budget` — **deleted at `c4c58421`**. The invariant now rests on nothing. | — | — |
| **H3** — every `demo/` file ≤400 LoC | ✅ `f4ba240` | — | Lane B recorded *"zero 'cohesion-tight, leave + document' cases"* | — |
| **H4** — *"all 9 proof scripts run at full applicability"* (the fourth declared axis) | ✅ `da8b68d` (verified: *"feat(scripts/w3): H4 invariant codification — proof:no-ts-ignore +demo/, proof:no-bare-builtins +plugins/+scripts/+bench/"*) | — | — | **Same fate as G4** — the whole axis deleted at `c4c58421` eight days later. H's gate matrix rows #4, #8–#13, #15, #22 are all dead. |
| Gate #17 *"Playwright 5 projects PASS"* | claimed PASS | **"(CI-deterministic; host-environmental flake noted in audit Lane 6)"** — the gate passed by classification, not by a green run. The same "environmental" escape appears at F.W4 Lane 6 and G Lane 6. Three consecutive tranches closed a Playwright gate they did not observe green. | — | — |
| `docs/RELEASE.md` + CONTRIBUTING +6 (H.W4 Lane D/E) | ✅ `d8bc2b7` | — | — | `docs/RELEASE.md` **survives**; `CONTRIBUTING.md` does not (`ls` → *No such file*) — deleted in K's de-ceremony. |
| `FINAL.md §4` rows 12–15 | — | **`(this)` ×4** — four unresolved SHA cells. | — | — |

---

## §9 — Tranche I (2026-05-28, paired close with fourier-E)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| I.W1 visibility split `status`(4-state) → `visibility`+`tier` | ✅ `f3a67a9` (verified: *"feat(I.W0+W1): open value.js-I + visibility split — palettes.status → (visibility, tier)"*) | Backward-compat `status` field **dual-written** through the transition; the drop was *"scheduled at value.js-J after consumer audit"*. J did not do it; it landed at **L.W3** `17b6148` (verified: *"feat(L.W3): full-stack excision — Palette.sessionToken + legacy 4-state status"*) — two tranches late. | — | — |
| I.W2 soft-delete + grace + restore | ✅ `d22a9d1` (verified: *"feat(I.W2): soft-delete + grace + restore — palettes.deletedAt lifecycle"*) | — | — | — |
| I.W3 + I.W4 admin idempotent setter + SOTA envelopes | ✅ `23a7b27` (verified: *"feat(I.W3+I.W4): admin idempotent setter + SOTA envelopes (problem+json/ETag/If-Match/RateLimit)"*) | I.W4 is marked **"GREEN-partial"** in its own wave table — two hard gates read DEFERRED. | — | — |
| Idempotency-Key server-side middleware | DEFERRED to "I-tail or value.js-J" | — | — | **Discharged, but under K's letter, not J's**: `59aab42c feat(K.W2 api-lane): J-substrate fold + I-tail residuals (idempotency · conformance · id-removal · ifMatch)`. Live today at `api/src/platform/http/idempotency.ts` (moved by T.W1's package-by-feature transposition `919cc698`). |
| Per-repo conformance suite at `api/test/conformance/` | DEFERRED, and self-described as *"decorative"* | ✅ exists (`api/test/conformance`) | — | — |
| `id` field hard-removal from the palette envelope | DEFERRED to "value.js-J" | ✅ landed at K.W2 `59aab42c` — and the K adversarial review caught that it **broke remote-card expand** (`BrowsePane` keyed on `palette.id`), re-keyed on slug. A deferral that shipped a P1 when it finally fired. | — | — |

---

## §10 — Tranche J (authored 2026-06-02; "executed" 2026-06-03)

**The corpus's most consequential attribution failure.**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| J.W2 atom-diff CORE (`atomdiff.ts`, `remixPalette`, `POST /:slug/remix`, `GET /:slug/diff`) | `J/FINAL.md` declares **"EXECUTED + GREEN"** with a green-CI table | **There is no J-attributed code commit.** `git log --diff-filter=A -- api/src/lib/crud/atomdiff.ts` → **`59aab42c feat(K.W2 api-lane): J-substrate fold`**. `git log -- docs/tranches/J/FINAL.md` → **`b8afd1cf docs: constellation grand-audit + tranche doc-set (K)`**. J's FINAL was written and committed *by K*, about code *K* landed. J's own three commits (`5558f8d3`, `2f7fc873`, `b8afd1cf`) are documentation only. | **VAL-9** `spring()→LinearStop[]` emitter — **KILL** (*"Lifting to value.js adds a THIRD home … No de-dup is won"*). Re-struck at K. | — |
| J.W1c publish/visibility + the **[P0]** `visibility:"public"` list filter | same commit `59aab42c` | — | — | — |
| J.W3 demo diff render (`PaletteDiff.vue`, CSS Custom Highlight) | **BOOKED**, trigger *"dispatch at K.W2 close"* | — | — | **SILENT DROP → then destructive.** `find demo -name 'PaletteDiff*'` → **empty**. K.W3 never ran. With no consumer, T.W1 excised the entire backend apparatus: `a8ff7792 refactor(T.W1 · api · TA-4): excise the write-only atom-diff apparatus` — *"The J.W2 atom-diff feature was write-only legacy: the demo consumes neither `/remix` nor `/diff` … the persisted `PaletteVersion.atomDiff` column has NO reader … `computePaletteDiff` had zero consumers besides its own route."* **A cross-repo cohort CORE, declared GREEN, lived ~4 weeks unconsumed, and was deleted whole.** |
| **VAL-1** OKLab aurora-LUT — *"BOOK + kill-date. Trigger: fires at K.W4; if not live by K.W4 close, KILL"* | — | — | — | **SILENT DROP by non-arrival of the trigger.** K.W4 never dispatched (`K/PROGRESS.md`: **BOOKED**, gated on glass-ui 3.2.0 + keyframes 3.0.0). The kill-date was bound to a wave that never happened, so the item neither shipped nor died — it was inherited by M.W5 (never ratified) and then N. **A kill-date is not a kill-date if its clock is another tranche's unrun wave.** |
| **CH-6** `TooltipContent variant="mono"` — a **6-tranche** glass-ui chronic, *"UNBLOCKED → K.W3 ship-or-kill"* | — | — | — | **SILENT DROP.** K.W3 never ran. The item's blocker was declared dissolved and its resolution handed to a wave that never dispatched. |
| J.W4 Idempotency-Key replay store | BOOKED as *"optional"* | ✅ landed under K.W2 (§9) | — | — |

---

## §11 — Tranche K (opened 2026-06-02) — **NO FINAL.md**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| K.W0 six-lane audit + 3 ratification gates | ✅ CLOSED 2026-06-02; all 3 gates user-resolved | — | J **retired via C-precedent** (supersede-and-fold) | — |
| K.W1 five CORE design specs | ✅ CLOSED 2026-06-02 | — | Modern-web refutes: `scheduler.yield` on image-quantization **REFUTED** (already a Web Worker); `Intl.DurationFormat` **REFUTED**; the "8 glass-ui asks" **collapse to ~4 net-new** | — |
| K.W2 substrate restoration (6 lanes) | ✅ CLOSED 2026-06-03 — `c4c5842` (verified), `5d97030`, `13587f9` (verified: *"feat(K.W2b): inv-K-5 demo e2e console-clean vs no backend + dual-Vue dedupe fix"*), `59aab42` (verified), `57c0928`, `de0c60a` | **Its own central mechanism was a precept violation.** The post-W2 audit: *"K.W2's `inv-K-4` mechanism-A (the `development` export condition) is a **contract-v2 precept violation** — it FAILS glass-ui's own `proof:resolution` gate on both repos and is the **root cause** of the dual-instance fragility"*. A wave closed **all gates GREEN** while shipping the defect the next audit called its root cause. | The `proof:*` idiom — **owner-rejected as overfit**, 9 scripts + CHANGELOG/CONTRIBUTING/VENDOR-POLICY/migrate-keyframes/mongo-init/backup.sh deleted | — |
| **K.W2.5** resolution transposition (mechanism-C by deletion) | **SPECCED ONLY** — `git log --all --grep="K.W2.5"` returns three *docs* commits (`6f325ec3 docs(K): post-W2 deep audit → resolution transposition + re-specced waves (**NO impl**)`) and zero impl commits | — | — | **Never executed under K.** Re-homed as **M.W1** — which was never ratified. |
| **K.W2.6** desktop pane-visibility **P0** (Tailwind v4 `@source` emission gap; *"desktop secondary-view panels render off-screen-left/blank"*) | **SPECCED ONLY** — `e03bde69 docs(K): visual-grounded audit round — 84-capture screenshot session + the desktop-P0 (**NO impl**)` | — | — | **A live P0, reproduced in 84 pixel captures, specced, and never dispatched under K.** Re-homed to M.W2 (never ratified). |
| K.W3 glass-ui-first consummation (blob lift + 8 asks + `parseCSSColor` typing + the J.W3 orphan) | **BOOKED** | — | — | Never dispatched. Its contents scattered to M.W3/M.W7 (unratified) and eventually N. |
| K.W4 aurora-derive + VAL-1 ship-or-kill | **BOOKED** — gated on glass-ui 3.2.0 + keyframes 3.0.0 | — | — | Never dispatched; carried VAL-1's kill-date into the void (§10). Aurora finally landed at N.W5 — `demo/color-picker/composables/boot/useAtmosphere.ts` now cites `deriveAurora`. |
| K.W5 modern-web parity + vue-router 4→5 | **BOOKED** | — | — | Router bump finally landed at **S.W2-7** (`f6a34fae feat(S.W2-7 · router): vue-router 4→5 — the fired K-W5RT book, code-free version bump`) — **8 tranches later**. |
| K.W6 close + π visual-runtime + **v1.0.0 verdict** (user-ratified at K.W0 gate 2: *"approved, cut at K.W6 close"*) | — | — | — | **SILENT DROP of a user-ratified decision.** K.W6 never ran; `v1.0.0` exists as a tag but was cut under a different tranche's authority. The K.W6 π-lane, `scripts/capture-visual-runtime.mjs`, and the 84-capture baseline as a binding assertion set — none dispatched. |
| `docs/dev-deploy-standard.md` (session-mandate #1, K.W2 micro-lane f) | claimed impl'd | — | — | Not verified present in this pass; flagged for the census seat. |

---

## §12 — Tranche L (2026-06-04)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| L.W1 boundary fail-explicit (6 envelopes, 4 repo-leaks) | ✅ `c690118` (verified: *"feat(L.W1): boundary fail-explicit — typed envelopes, ownership service, votes invariant, resolveOrigin…"*) | — | — | — |
| L.W2 `SessionToken`/`UserSlug` brands + DI rewire | ✅ `d86d75d` (verified: *"feat(L.W2): atomic transposition — SessionToken/UserSlug brands + resolve-session DI rewire"*) | Brands landed in `models.ts`, **not** the planned `types.ts` — documented acyclic deviation. | — | — |
| L.W3 full-stack legacy-field excision | ✅ `17b6148` (verified) | **The first run crashed**: *"the status-api agent crashed mid-excision (a `StructuredOutput` emission failure that left the tree RED at the bottom-up handoff); reverted to clean L.W2, re-ran hardened"*. The scan phase also *"caught 5 ledger inventory-misses"* — the 26-item ledger was 19% incomplete at dispatch. | — | — |
| L.W4 decompose `crud.ts`/`forks.ts`/`users.ts` into read/write/barrel triplets | — | — | **RE-SCOPED to verify-not-split, with a stated principle**: *"Splitting cohesive ~250–300 LoC service modules purely to execute the plan … is precisely the KISS/no-contrivance anti-pattern"*. This is the corpus's best example of a plan item correctly refused. | — |
| 9 invariants inv-L-1..L-9 | ✅ verified by a 3-auditor independent close audit — *"not a committed `proof:*` script (that idiom is retired)"* | — | — | — |
| Close gate: **playwright "12 passed / 24 failed / 1 did-not-run — identical to the dispatch baseline"** | — | **A tranche closed GREEN with a two-thirds-red e2e suite**, admitted as *"identical to the dispatch baseline … all failures pre-existing"*. The suite D and E built to 36 specs was, by L, a number recorded rather than a gate enforced. | — | — |
| L-SEED monitor: *"bench-gate script extraction — re-check at any `bench/` change"* | — | — | — | **SILENT DROP by target deletion.** `bench/` was removed wholesale at `164343c1`. A trigger bound to "any change in X" cannot fire when X is deleted. |
| L-SEED monitor: *"cron transactional semantics — re-check at any `api/src/cron.ts` change"* | — | — | — | Not re-verified in this pass; the file has since moved under the T.W1 `modules/`/`platform/` regroup — the path the trigger names no longer exists. |

---

## §13 — Tranche M (opened 2026-06-04) — **NO FINAL.md, NEVER RATIFIED**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| M.W0 charter + 12-agent audit ledgers | ✅ `62f7e008` (verified: *"docs(M.W0): open tranche M — post-L deep audit (2 waves x 6 agents) + the consummation charter"*) | — | **Supersede-K** proposed with a stated diagnosis: *"K's wave numbering became corrective. K.W2.5 and K.W2.6 are patch-sub-waves — the signature of a plan that broke mid-flight. When the corrections need corrections, you re-baseline."* | — |
| M.W1–M.W9 (precept remediation, WithId, elegance, 0.11.0 publish, aurora, router, glass-ui cohort, infra, v1.0.0 close) | **ZERO dispatched** | — | — | **The entire execution plan.** `M/PROGRESS.md`: all nine rows read **PLANNED**; *"Gate: explicit user ratification … **Status: OPEN (awaiting ratification)**"*. Ratification never came; N superseded M on 2026-06-11. |
| inv-M-1..inv-M-6 (exports-map cleanliness, WithId completeness, one color-resolution path, PRM-completeness, no bespoke design-system facility in demo/, registry consumption) | — | — | — | Six invariants declared and never verified under M. The **PRM hole** (inv-M-4) was independently rediscovered a week later as *"the PRM-RAF epidemic (~40 ungated loops)"* in the constellation grand audit — i.e. M had correctly diagnosed it, and the diagnosis sat in an unratified charter while the defect spread. |
| M's own audit finding: *"the version anchors are spent … glass-ui cut 3.2.0 against value.js **0.10.0**; 0.11.0 was never published; the aurora `cssToOklch` cast the plan said would delete **survived**"* | — | **The publish spine K specified never executed in order** — M diagnosed it precisely, and M's remedy (M.W4 publish 0.11.0) also never executed under M. `v0.11.0` exists as a tag, cut later under N. | — | — |

---

## §14 — The silent-drop register (the payload)

Ranked by consequence. Every row carries a live-tree probe or a deletion SHA.

| # | Dropped thing | Promised in | Evidence of the drop | Consequence |
|---|---|---|---|---|
| **1** | **The entire `proof:*` invariant apparatus** — 9 scripts, 2 declared tranche axes (G4, H4), 10 of G's 21 close gates, 9 of H's 22 | G.W3 `61314fa`, H.W3 `da8b68d` | `git log --diff-filter=D -1 -- scripts/proof-*.mjs` → **`c4c58421` (K.W2a, 2026-06-03)**; owner rationale in `K/PROGRESS.md`: *"RETIRED as overfit"* | Two tranches' headline theses evaporated in 12 days. Every invariant they codified (`as any`=0, `as unknown as`≤2, no `@deprecated`, no `@ts-ignore`, dts layout, bundle size, codemod publication, no `:deep()`, no bare builtins) now rests on review discipline alone. |
| **2** | **e2e in CI** | D.W5 `f374f13` (*"CI runs all 3"*), E.W3 (5 projects), G.W3 (6th spec) | Today: `ci.yml` is 71 lines with **no Playwright step**; `find e2e -name '*.spec.ts' \| wc -l` → **71**; `playwright.config.ts` declares 6 projects | 71 specs and 6 browser projects — including the `smoke-safari` WebKit project E built specifically to catch iOS-Safari engine bugs — gate nothing. |
| **3** | **The whole `bench/` tree and every bench gate** | D.W1 (L8 ≥5×), E.W1 (DIRECT_PATHS ≥2×, nameParser ≥5×), E.W4 (CI bench gate) | `git log --diff-filter=D --name-only` → **`164343c1`** deletes 11 bench files incl. `color-channel-access.mjs`, `color2-direct-paths.mjs`, `parser-namelookup.mjs` | Four consecutive tranches (D,E,F,G,H) closed on bench medians; the measurement apparatus is gone and L's "re-check at any `bench/` change" monitor can never fire. |
| **4** | **J's cohort CORE — atom-diff + `/remix` + `/diff`** | J.W2/J.W1c, declared *"EXECUTED + GREEN"* | Created at `59aab42c` (a **K** commit); excised whole at `a8ff7792` (T.W1) as *"write-only legacy … the demo consumes neither `/remix` nor `/diff` … `PaletteVersion.atomDiff` has NO reader"* | A cross-repo cohort deliverable shipped without its consumer (J.W3 booked to K.W3, which never ran) and was deleted. `find demo -name 'PaletteDiff*'` → **empty**. |
| **5** | **K.W2.6 — the desktop pane-visibility P0** | K, 2026-06-04, after an 84-capture instrumented session | `e03bde69 docs(K): … the desktop-P0 (**NO impl**)`; zero impl commits for K.W2.6 | A P0 that only pixels could reveal (*"desktop secondary-view panels render off-screen-left/blank"*), root-caused to a Tailwind v4 `@source` emission gap, specced — then orphaned across K→M(unratified)→N. |
| **6** | **VAL-1's kill-date** | J.W0: *"Trigger: fires at K.W4; if not live by K.W4 close, KILL"* | K.W4 status in `K/PROGRESS.md` → **BOOKED**, never dispatched | The corpus's clearest structural lesson: **a kill-date bound to another tranche's unrun wave neither ships nor kills.** VAL-1 survived as an undead book into M and N. |
| **7** | **The C axis-2 library `Palette` domain** | C.W1 (2026-05-18) | 2026-07-27 live: `find src -iname 'palette*'` → empty; `grep "export.*colorScale" src/` → empty; `grep "sampleToSVGPath" src/` → empty | Fourteen months. The cohort invariant C named as load-bearing (*"domain model in the library, persistence in the app"*) is still unmet. |
| **8** | **`slugWords.ts` → shared precepts data** | C U2 spec | `find . -name 'SLUG-WORDS*'` → empty; `api/src/modules/session/slugWords.ts` still opens `const ADJECTIVES = ["ancient","arctic","astral",…]` | Named PENDING-NO-PULL at C's retirement; nothing has pulled in 14 months. |
| **9** | **`scripts/migrate-keyframes-js-lerp.mjs`** — the *published* consumer migration path | E.W4; G gate #19 asserted it was *"in the npm tarball"* | Deleted at `c4c58421`; `package.json` `files` is now `["dist","!dist/gh-pages","!dist/gh-pages/**"]` | A breaking change (`v0.8.0` lerp arg-order) shipped with a codemod that was withdrawn from the package two weeks later. |
| **10** | **`VENDOR-POLICY.md`, `CONTRIBUTING.md`** | E.W4, H.W4 | `ls VENDOR-POLICY.md CONTRIBUTING.md` → both *No such file or directory* | Swept in K's de-ceremony alongside the proof scripts. `docs/RELEASE.md` and `CHANGELOG.md` survived. |
| **11** | **Changesets** | the undocumented **G.W5** `f895048e` | `ls -a .changeset` → only `README.md`+`config.json`, **zero changeset files**; `grep changeset .github/workflows/release.yml` → **zero hits** | Release tooling installed and never once used across v0.9.0→v4.0.0. |
| **12** | **G.W5 itself** | — | `grep "W5\|changeset" docs/tranches/G/FINAL.md` → **zero hits**; G's FINAL declares a complete 24-row inventory ending at the merge | A wave ran after a close ceremony and is recorded in **neither** the FINAL nor the PROGRESS board. Its only trace in the corpus is a baseline row in `I/FINAL.md §2`. |
| **13** | **B's "value.js library-maintenance effort"** (11 recorded `src/` gaps) | B.W3 `audit/B.W3-library-gap.md` | The phrase appears in `B/FINAL.md §3` and **never again in C..M** | A named-destination that never got a letter — the exact failure mode B's own invariant B5 ("zero deferral … or a named cross-repo destination") was written to prevent. |
| **14** | **The K.W0-ratified `v1.0.0` cut at K.W6** | K.W0 gate 2, **user verdict recorded**: *"RESOLVED — approved, cut at K.W6 close"* | K.W6 status → **BLOCKED on W3–W5**; no K.W6 commits | A user ratification discharged by a wave that never ran. The tag exists; the ceremony that was authorized to cut it does not. |
| **15** | **Un-SHA'd close ceremonies** | D §10, E §2, F §4 rows 11–13, G §4 rows 20–24, H §4 rows 12–15 | Verbatim in-tree today: `<this commit> (to be filled by orchestrator at commit time)`, `TBD`, `(this commit)`, `(next)`, `(merge)`, and five rows whose SHA column holds the words `audit`/`docs`/`chore`/`merge` | **Five consecutive tranches** left their own close-commit hashes unresolved. Every `FINAL.md` asserts *"cites every commit"* in its close-honesty checklist; five of them do not cite their own. |

---

## §15 — Cross-cutting patterns (for the mega-tranche formation)

1. **The gate-that-never-runs-again.** Every gate D..H added was real at close and dead within two tranches. The survival rate of a codified gate across the A..M window is roughly zero: `proof:*` (9 scripts) deleted, bench (11 files) deleted, CHANGELOG gate deleted, bundle gate deleted, dts gate deleted, Playwright-in-CI deleted. **The only gates that survived are the ones a build fails without**: `lint`, `vue-tsc`, `build`, `test`, `verify-packed-surface.mjs`. Recommendation: the mega-tranche should assume any gate not on the critical build path will be gone in ~30 days, and either put it on the critical path or not write it.

2. **"Environmental" as a close-honesty escape hatch.** F.W4 Lane 6, G Lane 6, and H gate #17 each closed a Playwright gate by *classifying* failures rather than observing green. By L, the classification had become an explicit accepted baseline of **12 passed / 24 failed**. The vocabulary degraded from "0 console errors across 473 requests" (A.W0) to "identical to the dispatch baseline" (L) in eleven tranches.

3. **Booking to an unrun wave is the dominant silent-drop mechanism.** VAL-1 (→K.W4), CH-6 (→K.W3), J.W3 PaletteDiff (→K.W3), K.W2.5 and K.W2.6 (→M.W1/M.W2), all of M (→ratification). Every one of these had a *named destination* and therefore passed the zero-deferral invariant — while dropping just as silently as an unnamed one. **A named destination is only a destination if the destination executes.**

4. **Attribution drift.** A's FINAL was written by B. C's discharge was written into C by C, about D's and E's commits. J's FINAL was committed by K, about code K landed. G's W5 was written by nobody. The tranche letter is a weaker record of who did what than the commit log — and the commit log, spot-checked at 28/28 hashes, is accurate.

5. **The re-grounding gap.** K.W1 is the corpus's single most valuable wave: it took the doc-only carry-forward ledgers at face value, went and read the peer code, and found *"Tabs-underline already ships"*, *"BlobDot = the WatercolorDot lift"*, *"the `file:` phantom is a registry devDep"*, *"`scheduler.yield` REFUTED — already a Web Worker"*, *"`Intl.DurationFormat` REFUTED"*. **Seven tranches of carried asks were partly fiction.** Any mega-tranche formation that consumes a carry-ledger without a K.W1-style grounding pass will inherit the same fiction.

---

## §16 — Spot-verification log

All 28 SHAs resolved with `git log --oneline -1 <sha>` at 2026-07-27; **28/28 exist and their subjects match the FINAL's claim.**

- **A**: `bc7ad2c` ✓, `92fe64d` ✓
- **B**: `de8c573` ✓, `9091e12` ✓
- **C**: no commits to verify (that *is* the finding); absence proofs run instead
- **D**: `11abd86` ✓, `626b107` ✓, `ee8bfa4` ✓, `059cf72` ✓, `5674d1f` ✓, `707d1be` ✓, `f374f13` ✓
- **E**: `417c3a5` ✓, `8db0e89` ✓, `6945a0d` ✓
- **F**: `1401d75` ✓, `1ead49e` ✓, `cf42c6c` ✓
- **G**: `413b47e` ✓, `61314fa` ✓, `9902036` ✓, `f895048` ✓ (the undocumented W5)
- **H**: `ef39ad9` ✓, `da8b68d` ✓
- **I**: `f3a67a9` ✓, `d22a9d1` ✓, `23a7b27` ✓, `13281fc` ✓
- **J**: `59aab42c` ✓ (K-attributed), `b8afd1cf` ✓ (K-attributed), `a8ff7792` ✓ (T-attributed excision)
- **K**: `c4c58421` ✓, `13587f9` ✓, `6f325ec3` ✓, `e03bde69` ✓
- **L**: `c690118` ✓, `d86d75d` ✓, `17b6148` ✓
- **M**: `62f7e008` ✓
- **Post-M discharges cited**: `e32111c7` ✓ (N.W5 blob extirpation), `fe3c00c7` ✓ (N.W3 txn reduction), `f6a34fae` ✓ (S.W2-7 router), `919cc698` ✓ (T.W1 regroup), `164343c1` ✓ (v4 bench deletion)

Live-tree probes run: `find src -iname 'palette*'`, `find . -name 'CRUD-CONTRACT.md'`, `find . -name 'SLUG-WORDS*'`, `grep "export.*colorScale" src/`, `grep sampleToSVGPath src/`, `grep lerpLegacy src/`, `grep @deprecated src/`, `ls scripts/ -R`, `node -e` on `package.json` scripts + files + version, `ls CHANGELOG.md CONTRIBUTING.md VENDOR-POLICY.md docs/RELEASE.md`, `ls -a .changeset`, `grep -n "run:|name:" .github/workflows/ci.yml`, `wc -l .github/workflows/*.yml`, `find e2e -name '*.spec.ts' | wc -l`, `grep -n "name:" playwright.config.ts`, `ls bench/`, `find demo -name 'PaletteDiff*'`, `find demo -name 'useMetaballRenderer*'`, `find api/src -iname '*idempot*'`, `sed -n '1,12p' api/src/modules/session/slugWords.ts`, `git tag`.
