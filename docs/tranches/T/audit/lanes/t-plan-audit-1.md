# t-plan-audit-1 — DEEP plan-vs-landed audit, part 1 (S waves W0·W1·W2·W3)

**Lane**: `t-plan-audit-1` (forensics / development-only) · **Substrate**: `tranche-t` @ `e12fd09`
(= master `cc4f4fa` + the T corpus docs only). `git diff --stat tranche-s-close..HEAD -- src/ demo/ api/`
and `cc4f4fa..HEAD -- src/ demo/ api/` are **BOTH EMPTY** (re-verified at this head): ZERO source
drift, so every `file:line` below reads the **S-close tree exactly** — post-close "drift" here means
*drift WITHIN S between an item's landing head and the S close*, not post-close edits.
**Method**: the S PLAN for W0–W3 (`waves/S.W{0,1,2,3}.md` §Goal / §Scope / §Hard-gate, their
spec-of-record `audit/SYNTHESIS.md §3.2/§3.3/§3.4/§3.5` + the RATIFICATION amendments) reconciled
against (a) the LANDED tree today (live source / LoC / grep cites), (b) the close records
(`FINAL.md §1`, `PROGRESS.md`, `audit/w{1,2,3}-close-artefacts.md`, `w0-{7,9}` artefacts,
`w9-close-probes.md`), and (c) `S.md §10` anchors verified present in the live tree. Each divergence
is classed by the **kind of plan↔landed relationship** it exposes (the taxonomy the sibling
`t-plan-audit-2` minted for W4–W9, reused here so the two halves compose): **A** taste/verification
miss inside a green gate · **B** landed-to-spec, owner now reverses · **C** honestly-recorded miss the
owner now sees · **D** plan under-scoped the surface · **L(egacy)** an E-3 no-legacy carry.

**Companion**: `t-plan-audit-2.md` (W4·W5·W6·W7·W9) — the disjoint-by-wave partner, LANDED at this
head. This lane owns the **substrate + library + spine + perf** half, whose findings are mostly *not*
owner-pixel findings (W0–W3 are infrastructural) but **verification-method + legacy-carry findings**
that size how much T can *trust* the S floor it builds on. The one-line thesis: **W0–W3 landed their
mechanical scope faithfully; the two things that slid were (1) a large `proof:*` legacy tooling carry
the docs claim was already deleted, and (2) three gates that certify geometry/mechanism but are blind
to the exact appearance/permanence axes the owner's T-25/T-27/T-9 findings now name.**

---

## §0 — Headline verdict + the §10-anchor certification

**Every `S.md §10` anchor routed to a W0–W3 item is present and correct in the live tree — ZERO
drops, ZERO reverted anchors** (§6 carries the row-by-row). The W0–W3 mechanical scope is the most
faithfully-landed quarter of S: the dev entrypoint delegates to `scripts/dev.sh up`
(`package.json:71`), the 3.0.0/3.1.0 library breaks all landed (logerp t-last, color-soa excised,
ICtCp/Jzazbz full spaces, raytrace), the one color spine is `useColorPipeline` (old models deleted),
vue-router is `^5.1.0`, the CSS gate is genuinely MET, the mix clock is Safari-true by construction.

The findings below are therefore **not** "W0–W3 got the build wrong." They are the *seams* an owner
audit of a green tree exposes: a legacy carry the close docs assert was gone (F1), a
deliberately-landed affordance the owner now rejects (F2), and gates that passed while blind to the
axis the owner is now judging (F3, F4). These are the W0–W3 contribution to the mandate's central
question — *where the landed work is trustworthy vs where the green gate was measuring the wrong
thing*.

---

## §1 — F1 · [W0-6 / W0-9, CLASS L — the load-bearing W0–W3 finding] The `proof:*` idiom the docs say was RETIRED is fully present, unwired, and orphaned in the S-close tree

- **PLAN / DOC-OF-RECORD**: `CLAUDE.md` §Test+verify states flatly: *"The grep-based `proof:*`
  invariant scripts (G/H-era) were retired as overfit; the disciplines they guarded stand by the type
  system + eslint + review."* `MEMORY.md` → `feedback-proof-idiom-retired.md` (2026-06-02): *"the user
  judged the grep-based `proof:*` invariant-codification idiom 'overfit junk' + deleted it … Never
  re-introduce."* W0-9 §3 additionally bound: *"removing the self-dep must be paired with
  retiring/repointing those `proof-subpath-*.mjs` scripts."*
- **LANDED** (live tree, S-close): **12 `proof:*` npm scripts** survive (`package.json:86-97`) backed
  by **11 `scripts/proof-*.mjs` files** (`proof-css-parity`, `proof-subpath-budget`,
  `proof-subpath-resolve`, `proof-contrast-color`, `proof-gamut-alloc`, `proof-serialize-fidelity`,
  `proof-grammar-q`, `proof-color-arch-q`, `proof-round-trip-idempotent`, `proof-perf-target`,
  `proof-progress-honesty`). They are **invoked by NOTHING** — `grep proof: .github/ scripts/dev.sh
  scripts/deploy.sh` returns zero; no CI step, no `dev.sh`, no `pretest`/`prebuild` hook runs them.
  Their last substantive touch is tranche **O** (`9ae9df0`, `15b0382` — the subpath split), i.e. they
  **predate** the 2026-06-02 retirement and **survived it**. The self-dep excision W0-9 paired them
  to *did* land (`package.json` `dependencies` is now `{"@mkbabb/parse-that":"^1.0.0"}` only), but the
  proof-subpath scripts were **not** retired/repointed — they still read `dist/value.js` /
  `pkg.exports["."]` directly (`proof-subpath-budget.mjs:178`, `proof-subpath-resolve.mjs:51-52`).
  (Note: the S.W0 `36f918d` commit body itself *ran* `proof:contrast-color 3/3 (C1–C3)` as a live
  gate — so at S.W0 the fleet was actively using an idiom its own root doc calls retired.)
- **ROOT-CAUSE**: the 2026-06-02 "retirement" deleted the *ceremony docs* (CHANGELOG/CONTRIBUTING/
  VENDOR-POLICY per the feedback record) and the CLAUDE.md prose was updated to past-tense, but the
  **11 script files + 12 npm entries were never deleted** — the doc claimed a state the tree never
  reached. Every S wave then inherited the false "already gone" premise, so no wave (incl. W9's
  repo-wide sweeps) treated them as legacy to excise; they are invisible to the type/eslint/review
  disciplines that supposedly replaced them because they are neither typed, linted, nor reviewed —
  they are inert `.mjs` in `scripts/`.
- **OWNER**: demo/repo (tooling + doc-truth).
- **CLASS L (+ the E-3/E-4/E-5 triple binds)**: E-3 (NO legacy code) — this is 11 files of
  self-described-retired legacy; E-4 (delineate + fold ALL deferred, chronic and recent) — this is the
  *chronic* deferred carry par excellence, a retirement that never completed; E-5 (recap ALL prompts
  addressed) — the proof-idiom-retired feedback is a standing owner prompt whose tree-state
  contradicts its doc-state.
- **CURE DIRECTION (gestalt, not a patch)**: T must *finish the retirement the docs already claim*.
  Either (a) **excise the whole `proof-*.mjs` + `proof:*` family** and make CLAUDE.md true by
  construction — the disciplines they guarded (subpath resolution, contrast, round-trip) are
  now owned by the type system + the vitest suites + the standing e2e oracles, exactly as the doc
  asserts; OR (b) if any one script encodes a discipline NOT otherwise gated (candidate:
  `proof-subpath-resolve` — the `exports` map integrity), **promote it into a real vitest/CI gate** and
  delete the other ten. The half-state — retired-in-docs, alive-in-tree, wired-to-nothing — is the
  precise anti-pattern the feedback named. Do not "keep them around just in case" (that IS the
  overfit-junk the owner deleted).

---

## §2 — F2 · [T-9 / W0-1 seed-rider-1, CLASS B] The banner the owner wants removed IS the deliberately-landed honest-dev affordance

- **PLAN** (W0-1, `S.W0.md:32`, SEEDS.md w0 rider 1 folded at ratification — *"the seed proved the
  mechanism VIABLE"*): *"surface the `misconfigured` state in an **always-mounted dev banner**, not
  only the save-conditional chip (`ApiOfflineChip` mounts only inside `CurrentPaletteEditor` under
  `v-if=…` — the misconfig state is not guaranteed visible at first paint)."*
- **LANDED** (`12af143`): `demo/@/components/custom/palette-browser/DevMisconfigBanner.vue` exists and
  is mounted **unconditionally** at `demo/color-picker/App.vue:115` (`<DevMisconfigBanner />`, no
  `v-if`) — exactly the always-mounted-at-first-paint affordance the rider specified. This is the
  literal, correct realization of the ratified W0-1 seed rider.
- **OWNER** (T-9, t-2004-32): *"This banner should be removed. And why does the backend not work
  hereof?"*
- **ROOT-CAUSE**: none — the banner does precisely what W0-1 designed it to do (make the CORS/dev
  misconfig state visible without a silent prod-fallback, `api-broken-rootcause`). The owner has
  **reversed the affordance form**, not found a defect. The mandate §3 already names T-9-vs-W0-1 as
  a known interaction; this finding supplies the exact anchor (`App.vue:115`) and the class.
- **OWNER of cure**: demo.
- **CLASS B (spec-overrule)**: the *honest-dev STATE* (loud `console.error` + a distinct UI signal on
  the unset-`VITE_API_URL` + loopback + cross-origin-prod precondition) is load-bearing and W0-1's
  `§No-workaround` bars re-hiding it behind a filtered console. So T must **retire the banner FORM
  while preserving the misconfig STATE** — the state migrates to a quieter, in-context affordance (e.g.
  the existing `ApiOfflineChip` register promoted to first-paint reliability, or a dock/status-line
  chip), never a page-top banner and never a silent prod fallback (E-3: retire the old form by name,
  do not shim it). The reversal must be *recorded* so a future audit does not "restore" the banner as
  a regression. The second clause of T-9 ("why does the backend not work") is F6 (the X1 book).

---

## §3 — F3 · [W0-2, CLASS A — verification-blindness on the T-25/T-27 axis] The WebGL appearance oracle certifies geometry + draw-issuance, never pixel/colour truth

- **PLAN** (W0-2(d), `S.W0.md:33` + §Hard-gate item 2): *"WebGL canvas-appearance assertions
  (**readPixels non-blank** + bbox ≥N + not-clipped-past-card) in the 2 existing WebGL specs"* — the
  oracle floor's whole purpose (S-22): *"stops the suite being blind to … rendered appearance."*
- **LANDED**: the **bbox + not-clipped** halves landed and are real — `webgl-atmosphere.spec.ts:66-73`
  asserts the canvas spans viewport width/height; `webgl-goo-blob.spec.ts:69-86` asserts the blob
  ≥100×100 and not off-screen (the S-4 smudge floor). But the **`readPixels non-blank`** half was
  **silently swapped for per-canvas draw-call counting** (`e2e/smoke/fixtures/webgl-appearance.ts:8-47`:
  *"readPixels … `preserveDrawingBuffer:false` … most frames read blank, so [we] install per-canvas
  WebGL2 draw-call counting"* — increments on `drawArrays`/`drawElements`/instanced variants).
- **OWNER** (T-25 *"the loading colour animation + the aurora … leave much to be desired"*; T-27
  *"too gray / too slow / too jittery"*): the owner is judging the **rendered appearance** of the boot
  aurora — the exact axis this oracle was minted to cover and the exact axis it was quietly narrowed
  off.
- **ROOT-CAUSE**: the `preserveDrawingBuffer:false` raciness rationale is *legitimate for readPixels*
  — but the substitute answers a **weaker question**. "Draw calls fired" proves the GL program *ran*;
  it says **nothing** about whether the canvas painted the *derived / correct / non-gray* field. A
  boot that draws a gray, desaturated, or hot-pink-default frame (GAP-ARM) issues draw calls and
  **passes**. FINAL §1 records the substitution as a mere *"recorded deviation … per-canvas draw-call
  counting"* — under-stating that it **abandons the appearance-truth goal S-22 named**, leaving the
  suite blind on the precise axis T-25/T-27 now flag.
- **OWNER of cure**: demo (the oracle).
- **CLASS A (a real verification gap inside a green gate)**: the W0-2 gate went green certifying
  "appearance" while the appearance-truth predicate had been swapped for a liveness predicate. This is
  the §5 pattern (a gate measuring the wrong thing) at the oracle-floor itself.
- **CURE DIRECTION**: T must mint a **colour-truth boot oracle** that survives
  `preserveDrawingBuffer:false` — e.g. a settle-stamped single `readPixels` *after* an explicit
  `requestAnimationFrame` fence at a known post-hydration frame (or an offscreen re-render with
  `preserveDrawingBuffer:true` reserved for the test build), asserting the sampled centre pixel matches
  the DERIVED seed's hue family within ΔE tolerance (not merely "non-black"). This is the same gate
  `t-load-sync`/`t-aurora-boot-active` need for T-1/T-25/T-27; it belongs in the oracle floor, not
  per-lane. The lesson for T's E-7: *a substituted oracle must answer the same question, or the
  substitution is a silent de-scope of the gate's goal.*

---

## §4 — F4 · [W3, CLASS A — gate-permanence] "Budgets as gates" is, in the standing suite, "freeze-guards as gates"; the §6.2 numbers are a one-time manual snapshot no CI reproduces

- **PLAN** (W3 §Goal, `S.W3.md:15`): *"Every color interaction and view swap lands inside the §6.2
  budgets on real hardware"* — the whole wave's framing is **budgets AS GATES** (drag p50 ≤20ms ·
  idle ≤13ms · view-switch first frame ≤100ms · long task ≤50ms · mix ≤1.2s). §Hard-gate item 1:
  *"The 3 transition-family frame-budget e2e specs green at the §6.2 numbers (numeric p95 assertions),
  measured on the built bundle."*
- **LANDED**: the tight §6.2 numbers were MET **once**, on a **manual M5-Max real-GPU headed drive**
  (`w3-frame-budget-measure.md §1`: drag 8.4ms, idle 8.3ms, view 8.3ms, mix 1.13s). But the
  **standing** `smoke-perf` project runs under **ANGLE-SwiftShader software raster**
  (`playwright.config.ts` headless-stability requirement) where those numbers are *unreachable by
  construction* — so the committed specs assert only **generous freeze/liveness ceilings**, NOT the
  budgets (`e2e/smoke/perf/frame-budget.ts:33-36`: *"The software ceilings are NOT the gate; they are
  a floor … The authoritative §6.2 gate is the built-bundle real-GPU measurement archived at wave
  close"*; software drag p50 measures 58–100ms and *passes*). FINAL §6.2 is candid — *"headless GPU
  re-drive unreliable — recorded honestly, not re-asserted … carried green from the W3/W7 standing
  oracle"* — i.e. the tight budgets are a **point-in-time snapshot**, not a re-runnable gate.
- **OWNER** (T-27 *"the loading … animations … too slow / too jittery … frame pacing"*): a real-
  hardware frame-pacing / jitter regression is exactly what a *standing* budget gate exists to catch —
  and the standing gate cannot see it (SwiftShader tolerates it; the M5-Max drive is manual and
  un-scheduled).
- **ROOT-CAUSE**: the §6.2 budgets are **120Hz-hardware numbers** but the CI renderer is software; the
  wave resolved the mismatch by asserting the budgets only on a hand-run headed config and downgrading
  the automated project to freeze-guards. Defensible for a *close snapshot*; but it means the wave's
  headline goal ("budgets as gates") is met as a **measurement**, not as a **gate** — a
  jitter/pacing regression on the owner's real machine ships green.
- **OWNER of cure**: demo (the perf oracle) + a scheduled real-GPU runner (infra).
- **CLASS A (the gate does not drive the state it certifies — the §5 pattern)**: not a hidden defect
  (FINAL names it), but a *permanence* gap the wave's §Goal language over-claims. T-27 needs the thing
  W3 has only as a snapshot.
- **CURE DIRECTION**: T must make frame-pacing a **standing, engine-honest** gate — either a
  scheduled/opt-in **real-GPU CI lane** (Metal/self-hosted) that re-runs the §6.2 numerics, or a
  **software-invariant pacing oracle** (inter-frame-delta *variance* / dropped-frame ratio, which is
  renderer-independent even when absolute p50 is not) so "jittery" has a red line. The boot-animation
  quality triple (T-25/T-27) cannot be certified by the current freeze-guard floor.

---

## §5 — F5 · [W1 cap-ledger, CLASS A-doc — reconciled-by-W9, under-stated by the W1 artefact alone] The W1 close cap table is stale; the 3.1.0 remediation grew two ledger files it never re-measured

- **PLAN** (W1 gate rider, `S.W1.md:44-66` + §Hard-gate item 9): *"post-W1 cap check … no
  SPLIT-WORTHY `src/` file remains over-cap without a recorded ledger row"*; the rider explicitly
  pre-books `units/utils.ts` and the sequenced-LAST `color.ts`/`stylesheet.ts` decompositions.
- **LANDED / DRIFT**: `w1-close-artefacts.md §3` recorded the cap table at the **3.0.0 publish head
  `1537fed`** — `parsing/color.ts` **696**, `units/color/dispatch.ts` **512**. But the **3.1.0
  remediation `964c399`** (which the *same* artefact §6 documents as adding the `ictcp()`/`jzazbz()`
  parsing + the `color2()` HDR dispatch arms) grew both files **after** that table was written, and §3
  was **not re-measured**. Live tree today: `parsing/color.ts` **718** (+22), `dispatch.ts` **518**
  (+6). So the W1 close artefact's cap table is stale by construction — it snapshots a head that
  predates its own wave's remediation.
- **RECONCILED**: `w9-close-probes.md §4` (the close-wide caps sweep) **did** re-measure at the S-close
  head and recorded `color.ts 718 (W1-close 696) … +22 = the ictcp()/jzazbz() parse arms (3.1.0), same
  spine`, `dispatch.ts 518 (512) … +6 = the HDR arms`, verdict **"src caps: CLEAN."** So the **close
  AS A WHOLE is accurate** — W9's machinery caught exactly this. The gap is only that the **W1 wave
  artefact read in isolation gives stale numbers**, and the growth-during-remediation is the same
  class as the W1 §7 process blemish (the 3.0.0 publish lane certifying a head it had moved past).
- **OWNER**: demo/docs (no code action — the files are verdict-clean SPLIT-WORTHY spines).
- **CLASS A-doc (a green-gate reconciled by a later gate)**: this is the *counter-example* that
  validates the W9 close model (F19 in the sibling lane) — the caps sweep-per-close worked. T inherits
  it unchanged; the only lesson is *a wave's cap snapshot must be re-taken at the wave's FINAL head,
  not its first publish head* (the W1 remediation moved the head).
- **CURE DIRECTION**: none structural. T should treat W9's `§4` table (not `w1-close-artefacts §3`) as
  the authoritative W1 cap record, and — per S lesson 5 (the sibling F19) — run the cap sweep at each
  wave's *close* head, not an intermediate one.

---

## §6 — F6 · [T-9 backend half / W0-3, CLASS C — recorded-miss now owner-visible] "Why does the backend not work" is the X1 book, live-probed OPEN at S close

- **PLAN** (W0-3, `S.W0.md:34`): read-only prod probe — confirm prod serves R-era api; if the webhook
  is dead, repair + deploy. **The retirement/repair itself is maintainer-on-host, NOT S-agent work**
  (X1/X2 books).
- **LANDED** (`a9c5854` probe record): W0-3 probed and recorded honestly — prod **STILL I-era**
  (`/health` 404, `/diff` 404, `/openapi.json` 404), webhook `deploy.babb.dev/hooks/value-js` **STILL
  404** (`FINAL.md §5` X1 row + `§8.1`). Re-probed at W9 close, still OPEN. This is un-actionable by
  agents *by construction* (the hook registration + `master` push are on-host maintainer ops).
- **OWNER** (T-9 second clause, t-2004-32): *"And why does the backend not work hereof?"* — on the
  **live prod site** the palette API is the pre-R I-era deploy, so R/S-era routes (`/diff`,
  `/publish`, the visibility affordances S.W5 wired) 404 in production.
- **CLASS C (a recorded, live-probed miss the owner now feels)**: no re-diagnosis needed — this is the
  X1 residual, twice-tranche-carried, verbatim in `FINAL.md §8.1`. T **folds it forward** (E-4) as the
  standing maintainer op; it is *not* an S execution failure (S-agents cannot reach the host).
- **CURE DIRECTION**: T records X1 as a maintainer-gated residual (exact op: register the
  `value-js` hook on `deploy.babb.dev`, then push `master` so `deploy-hook.sh` lands the current api —
  `FINAL.md §8.1`), and — critically — **separates the two halves of T-9 in the corpus**: the *banner*
  (F2, demo, actionable now) vs the *dead prod backend* (F6, maintainer, un-actionable) — so the owner
  finding is not mis-scoped as one fix. The dev-UX redesign (F2) must make the *local honest-dev*
  state legible without implying the *prod* backend is the same failure.

---

## §7 — Secondary notes (recorded, below the top-6 bar)

- **N1 · W0-2 smoke-safari is SOFT + never fired cleanly in a real CI run.** `ci.yml:277-279` runs
  `--project=smoke-safari` with `continue-on-error: true` *by design* (the L1 producer aurora-shader
  P0 reddens WebKit). Combined with the **one recorded W0 MISS** (the CI-LOG deferral: `ci.yml` fires
  only on master push/PR, the tranche-q pushes fired no run, and the close-merge run `28828848774`
  **auto-cancelled by GH concurrency** — `FINAL.md §1 W0` + `w9-close-probes.md §c.4`), there is **no
  standing CI log that demonstrates smoke-safari green**; the evidence is the *local* merged-tree
  re-run (e2e 66/66). Honestly recorded, but the oracle-floor's own "runs in CI (workflow-log
  evidence)" hard-gate clause (W0-2 §Hard-gate item 2) is satisfied only by a local run + an
  auto-cancelled CI run. T should verify the first real `master`-HEAD run is green before trusting the
  Safari floor.
- **N2 · `ci.yml` Lighthouse comment is self-contradictory.** The step is correctly HARD
  (`ci.yml:358` name *"Lighthouse CI (budget gate — HARD, W0-2b)"*, `continue-on-error` removed per
  the `:352-357` block), but a stale nested comment at `:362-364` still reads *"Soft-launch
  (continue-on-error) … never blocks the ladder."* A doc-truth residual inside the workflow (the hard
  flip landed, the comment describing the old soft state was not deleted) — E-3 legacy-comment class,
  trivial, fold into the T CI pass.
- **N3 · W3-7 hue-sweep tax retirement VERIFIED landed (a clean cross-wave sequence).** The mechanism
  decision recorded at W3-7 (`w3-7-hue-sweep-retirement.md`) was correctly consumed at W7-4: the
  `:root { transition: --view-hue-shift … }` tax and the `@property --view-hue-shift` registration are
  **gone** from `demo/@/styles/style.css` (only a *"The former `--view-hue-shift` … registration +
  `:root` transition"* tombstone comment at `:160` remains). No drift; noted as a positive control
  that the W3→W7 sequenced-consume contract held.
- **N4 · W2 spine + grep-gates hold on the live tree.** `useColorPipeline.ts` (383 LoC, ≤400),
  `useColorPersistence.ts` (121); `useColorModel.ts`/`useAppColorModel.ts` **deleted**; 0 `Context`
  params under `api/src/services/`; 0 `savedColors` casts; the only `apiAvailability` reference is the
  barrel re-export (`api/index.ts:35`), not a direct consumer. All W2 §Hard-gate grep rows re-verify.
- **N5 · W1 library breaks hold.** logerp is `(start, end, t)` (`math.ts:78`, zero t-first call sites
  in `src/`); `color-soa.ts` absent; `ICtCpColor`/`JzazbzColor` are full classes
  (`spaces.ts:416,445`); `gamut-raytrace.ts` present; the srgb decode pivots on `SRGB_TRANSITION`
  (`transfer.ts:18,40`) with the `gamut.ts` inline twin deleted (now `import … from
  "./conversions/transfer"` at `:30`); `package.json` version `3.1.0`, CHANGELOG `[3.0.0]`+`[3.1.0]`
  present; the W1-8 splits landed (`color/index.ts` 73-line barrel + `base.ts`/`spaces.ts`/
  `serialize.ts`; `style-names.ts`, `dom-metrics.ts`, `layout-cache.ts`, `color-names.ts`).
- **N6 · W0-6 dead-surface excision was PRECISE** (a positive control). The BBNF grammars +
  `*.bbnf?raw` decl are gone from `src/` + `eslint.config.js`/`tsconfig`; the AdminPanel quartet is
  gone; the `.gold-shimmer-icon` selector the wave-doc anchored at `Dock.vue:238` was removed **from
  Dock's dead scoped copy only** — the *live* copy in `DockViewSelect.vue:77,127` + `utils.css:82`
  correctly survives (the `36f918d` body called this out explicitly). The wave-doc anchor read as if
  the selector were globally dead; the close correctly disambiguated. (This live gold-shimmer copy is
  the admin-gold exception T-10 must preserve — cross-ref `t-nav-dropdowns`.)

---

## §8 — The §10-anchor certification table (W0–W3 rows, live-verified)

| §10 anchor | Item | Live-tree evidence | Standing |
|---|---|---|---|
| S-11 → W0-1 | dev-backend truth | `package.json:71` `"dev":"scripts/dev.sh up"`; `DevMisconfigBanner` always-mounted `App.vue:115` | ✓ present (banner = F2/T-9 reversal) |
| S-22 → W0-2 | oracle floor | smoke-safari in `ci.yml` (soft, N1); Lighthouse HARD `ci.yml:358`; bbox/not-clipped asserts real; **readPixels→draw-call substituted (F3)** | ✓ present, appearance-truth narrowed (F3) |
| — → W0-3 | X1/X2 probe | prod I-era, webhook 404 (`FINAL §8.1`) | ✓ recorded OPEN (F6/T-9) |
| — → W0-6 | dead-surface excision | BBNF/AdminPanel gone; gold-shimmer dead copy removed, live copy kept (N6) | ✓ precise |
| — → W0-7/Q11 | vue-router 5 scope | `package.json:157` `^5.1.0`, code-free (`w0-7` probe) | ✓ landed |
| — → W0-9 | dep-excision ledger | `dependencies` = parse-that only (self-dep excised); **proof-subpath repoint UNMET (F1)** | ✓ deps clean, F1 carry |
| S-24 → W1-1 | srgb decode cure | `transfer.ts:18,40` `SRGB_TRANSITION`; gamut twin deleted `:30` | ✓ landed |
| S-24 family → W1-6/-7/-8/-10/-11 | logerp / color-soa / ICtCp / Jzazbz / raytrace / splits | all verified (N5) | ✓ landed (cap drift reconciled, F5) |
| S-18 composite → W2-1 | one color spine | `useColorPipeline.ts` 383; old models deleted | ✓ landed |
| A1 (arch-di) → W2-8 | Services-in sweep | 0 `Context` under `services/` | ✓ landed |
| S-9 → W3-1 | rAF-coalesce fan-out | `useAtmosphere.ts:84,182` (coalesced seed) | ✓ landed |
| S-23 → W3-2/W3-9 | eager JS + CSS gates | CSS MET (86.5KiB); **JS eager RE-BASELINE 347.9 vs ≤280 = RP-2** | ✓ landed, JS miss recorded (§9) |
| motion/P0-M → W3-6 | mix one-clock | `MIX_CONVERGE_MS`; no `ctx.filter` (`mixStage.ts:11`) | ✓ landed, Safari-true |
| god-module §2.3/2.4 → W3-8 | RAF discipline | `useRAFLoop` consumed (`useMixingAnimation.ts:42`, `useInertiaGesture.ts:3`) | ✓ landed |
| design-dock P1-7 → W3-7 | hue-sweep tax retire | `:root` transition GONE from `style.css` (N3) | ✓ consumed at W7-4 |

**Zero dropped anchors; zero reverted anchors.** The only §10 anchors carrying an unresolved gap are
the **recorded** ones (S-23 JS-eager RP-2 re-baseline; X1/X2 maintainer residuals) — folds-forward,
not surprises.

---

## §9 — The one W0–W3 recorded miss the owner findings do NOT (yet) touch, for completeness

**RP-2 — the JS-eager budget (347.9 KiB gz vs ≤280).** W3-2/§Hard-gate item 2 required JS eager
≤280KB; it landed at **347.9** (`FINAL §6.2`), a **standing on-record re-baseline** whose owned
arithmetic is `w3-chunk-census.md §9`: the demo lever (HeroBlob async) landed but frees ~0 eager
*bytes* because the 33.1KiB metaball graph is anchored eagerly by `useAtmosphere`'s
`@mkbabb/glass-ui/goo-blob` **barrel import** (non-tree-shakeable via `sideEffects:["*.css"]` +
`GooBlob.vue`'s scoped `<style>`). The cure is the **producer L20 subpath** (`goo-blob/config`) →
`FINAL §5` book → S.W8 adopt. **No owner T-finding names this** (bundle weight is not owner-visible),
so it is a pure fold-forward — but T's blob work (sibling `t-blob-hero`, T-8) and the S.W8 adopt
**must** land L20 together, or the re-baseline persists another tranche. Recorded here so the W0–W3
half of the fold-forward ledger is complete alongside the sibling lane's W4–W9 half.

---

## §10 — What this shapes for T's design bar (the W0–W3 contribution to the mandate's question)

1. **The W0–W3 substrate is trustworthy — with two documented exceptions T must close FIRST.** The
   library, spine, router, CSS gate, and mix clock all landed to spec and verify live. But T builds
   *on top of* two false-floor items: the **`proof:*` legacy carry** (F1 — the tree contradicts the
   root doc) and the **appearance/pacing gate-blindness** (F3/F4 — the oracles that should catch the
   owner's boot-animation findings can't). Both are *infrastructure* T inherits, not surfaces T
   designs — and both must be trued before the E-7 hardening wave, or that wave certifies against the
   same blind gates S did.

2. **F3 + F4 are the W0–W3 mirror of the sibling lane's §5 meta-finding.** The sibling proved S
   certified *taste* by non-authoring proxy; this lane proves S certified *appearance and pacing* by
   proxy predicates — draw-issuance for pixel-truth, freeze-guards for budgets. Same failure shape
   (a gate measuring an easier adjacent quantity), one layer down. T's boot-animation oracle
   (T-1/T-25/T-27) is therefore **new gate work**, not a tuning of an existing green gate — the
   existing green gates are structurally blind to the axis.

3. **F1 is the concrete E-3/E-4 test case.** The mandate demands ALL legacy delineated and folded, and
   ALL prior prompts verified addressed. The proof-idiom retirement is a prior owner prompt whose
   *doc-state* says done and whose *tree-state* says 11 files alive. If T's first structural pass
   cannot resolve *this* — a retirement the docs already claim — the colocation grand edict (E-1) and
   the backend-abstraction edict will inherit the same doc-vs-tree drift at scale.

4. **F5 + N3 + N6 validate the W9 close machinery T should inherit unchanged.** The cap sweep caught
   the 3.1.0 growth (F5), the W3→W7 sequenced-consume held (N3), the dead-surface excision was
   surgical (N6). W0–W3's mechanical discipline is sound; the reform T bolts on (per the sibling F18)
   is purely the *gate-goal* alignment — appearance-truth (F3), budget-permanence (F4), and
   legacy-completion (F1) — not a repudiation of the close model.
