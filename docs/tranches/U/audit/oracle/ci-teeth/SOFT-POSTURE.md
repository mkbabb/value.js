# U.W-ORACLE · CI-TEETH — the OWNED soft-posture record (U-F1 + U-F55-CI-teeth-half)

**Gate:** G-ORACLE-1 (`scripts/ci/oracle-slate-teeth.mjs`).
**Cite token:** `G-ORACLE-1 SOFT-POSTURE-CITE:` (the machine-checkable marker each
soft oracle/perf-slate step carries in `.github/workflows/ci.yml`, pointing here).
**Default posture:** SOFT-but-OWNED (this document). **Final ruling:** the
blocking-vs-ratified-soft decision is BOOKED to **U.W-CLOSE** (see §BOOK).
**Review date:** U.W-CLOSE (the ledger walk that ratifies or promotes).

---

## §0 · Why this record exists (the U-F1 defect, verbatim scope)

Registry §1 (`ci-oracle-slate-nonblocking`, CONFIRMED source-read + grep) + §16
(U-F55 `ci-oracle-slate-no-teeth`, merges U-F1+U-F15+U-F42) + §20 (the a11y-half
RETIRED — lighthouse a11y MEASURED → PASSES 1.0, only the CI-teeth half lands
here) + §21 (sharpened: "`page-load.spec.ts` is the SOLE hard e2e gate — smoke +
smoke-safari are BOTH continue-on-error").

Before this record: `page-load.spec.ts` was the SOLE hard e2e CI step; the full
`smoke` project (which HOSTS o1..o26) ran `continue-on-error: true`; `smoke-safari`
ran soft; and `smoke-perf` / `smoke-reactivity` / `smoke-mobile` / `smoke-admin`
were invoked by NO workflow (VERIFIED: 0 `--project=<name>` matches across
`ci.yml` + `deploy-pages.yml` + `release.yml`). Net: a green CI was ZERO evidence
any visual oracle or built-bundle perf gate passed — the toothless drift U-F1
names. The SHARP CONTRAST proving it is drift, not design: the CWV Lighthouse
gate IS blocking (`ci.yml`, "continue-on-error removed"); the perf instrument had
teeth the VISUAL oracle instrument lacked.

The E-3 cure is REAL teeth OR a ratified soft-posture cite — never an un-owned
`continue-on-error` drift. This lane, per the CI-SEMANTICS RESERVATION, lands the
GAP-closure + the OWNED cite (this record), and PREPARES the Pole-A hard step;
the final blocking-vs-ratified-soft ruling is the owner's, booked to U.W-CLOSE.

---

## §1 · What this lane LANDED (the cure that flips G-ORACLE-1)

1. **GAP-closure (not a semantics flip):** the four previously-unrun projects —
   `smoke-perf` (O-5's home + O-24 + the frame budgets), `smoke-reactivity`,
   `smoke-mobile`, `smoke-admin` — are WIRED into CI as a new parallel
   `e2e-slate` job (`ci.yml`), soft + cited. `smoke-perf` is now RUN
   (the built-bundle frame-budget slate had NO workflow before).

2. **OWNED cites (the un-owned → owned transition):** every soft oracle/perf
   slate step in `ci.yml` now carries the `G-ORACLE-1 SOFT-POSTURE-CITE:` marker
   pointing here. The three soft slate steps are enumerated in §2. "Soft" now
   means "a named-red-or-GPU-only annex with an owned cure map", never
   "unwatched".

3. **The page-load HARD gate is guarded:** G-ORACLE-1 CHECK C reddens if the one
   hard e2e gate ever acquires `continue-on-error`.

G-ORACLE-1 flips GREEN on (1)+(2)+(3): every project invoked, every soft step
owned + cited, page-load still hard. This is the disjunction's owned-soft form.

---

## §2 · The soft slate steps — each owned, each mapped to its cure

| Step (ci.yml) | Project(s) | Soft rationale | Owner / cure wave | Flip condition |
|---|---|---|---|---|
| "Playwright — full smoke project" (e2e-smoke job) | `smoke` (hosts o1..o26) | Hosts the 3 producer/GPU-gated reds O-16, O-26, O-3 that CANNOT be cured in-window; the rest of the slate is not yet certified-green in this lane (no full e2e run — expensive/contended) | value.js (register) + glass-ui producer (O-16/O-26) — `docs/tranches/U/audit/oracle/born-red-register/REGISTER.md` | Pole-A hard subset (§3) once the cured subset is certified green |
| "Playwright — smoke-safari (WebKit)" (e2e-safari job) | `smoke-safari` | Surfaces the L1 aurora-shader WebGL2 P0 (known-live producer defect value.js is prohibited from shimming); FLIP to hard at the glass-ui adopt-event once the shader defect lands | glass-ui producer — communiqué `17e0f522` §2b; U.W-ADOPT | the aurora shader P0 cures (producer) |
| "Playwright — the previously-unrun slate" (e2e-slate job) | `smoke-perf`, `smoke-reactivity`, `smoke-mobile`, `smoke-admin` | Gap-closure wiring; `smoke-perf` hosts O-5 (`test.fail`, adopt-gated payload cut); the projects were never CI-certified, so soft-on-first-wire is honest (E-3: no unproven blocking flip) | value.js (register) + O-5 → U.W-PERF/U.W-ADOPT (RP-2 payload cut) | O-5 flips on the payload cut; the rest promote once certified green |

**The born-RED tripwires these steps host** (owned BY NAME; the full register is
`docs/tranches/U/audit/oracle/born-red-register/REGISTER.md`, authored in
parallel by the U.W-ORACLE born-RED-register lane; cited by path, not duplicated):

- **O-16** `e2e/smoke/oracles/o16-computed-cascade.spec.ts:34` (`test.fail()`) —
  the dist `:root` 150ms transition-default clobber. Producer cure → **U.W-ADOPT**
  / communiqué `17e0f522` §2b.
- **O-26** `e2e/smoke/oracles/o26-aurora-perceptibility.spec.ts:57` (`test.fail()`)
  — aurora perceptibility; producer + GPU-only. Cure → **U.W-ADOPT** / communiqué
  `17e0f522` §2b; the headed-GPU frame → **U.W-CLOSE / U-F54** annex.
- **O-3** `e2e/smoke/oracles/o3-headed-gpu-probe.spec.ts:44` (`test.skip` on
  software-GL) — the real-GPU chroma probe; GPU-only. → **U.W-CLOSE / U-F54**
  owner-attested annex (NOT a flip-on-headless gate — the §21 caveat).
- **O-5** `e2e/smoke/perf/o5-boot-pacing.spec.ts:48` (`test.fail()`) — the
  boot-pacing spike; adopt-gated RP-2 payload cut. → **U.W-PERF / U.W-ADOPT**.

> Playwright semantics (standing law): `test.fail()` reports GREEN while the test
> keeps failing and reddens only if it UNEXPECTEDLY passes — so a HARD job
> containing O-16/O-26/O-5 does NOT redden from their expected failure. `test.skip`
> (O-3) reports green-skipped. The soft posture above is therefore NOT required by
> these reds alone; it is the honest first-wire posture for a slate this lane has
> not certified green end-to-end, plus the GPU-only annex for O-26/O-3.

---

## §3 · The PREPARED Pole-A hard step (RESERVED — not activated this wave)

Per the CI-SEMANTICS RESERVATION, the Pole-A promotion is PREPARED and RECORDED
here, NOT activated (a whole-slate blocking flip is out of reach in-window because
O-16/O-26/O-5 are producer/adopt-gated and O-26/O-3 are GPU-only). The final
promotion is the owner's ruling at U.W-CLOSE. When activated, the cured GREEN
subset moves to a HARD step with the still-red / GPU-only specs excluded **BY
NAME**, cited to `docs/tranches/U/audit/oracle/born-red-register/REGISTER.md`.

**Reserved ci.yml step — the cured `smoke` subset, HARD** (add to the e2e-smoke
job, replacing/augmenting the soft full-smoke step; drop `continue-on-error`):

```yaml
            # PREPARED Pole-A (RESERVED — activate at U.W-CLOSE's blocking ruling).
            # The cured GREEN smoke subset, HARD. Excludes BY NAME the producer/
            # GPU-only reds (cited: docs/tranches/U/audit/oracle/born-red-register/REGISTER.md):
            #   · O-16 computed-cascade — the dist :root clobber (test.fail; → U.W-ADOPT)
            #   · O-26 aurora perceptibility        (test.fail + GPU-only; → U.W-ADOPT / U-F54)
            #   · O-3 headed real-GPU cold-load     (GPU-only skip; → U-F54 annex)
            - name: "Playwright — smoke oracle slate (cured subset, HARD)"
              run: >-
                  npx playwright test --project=smoke
                  --grep-invert "O-16 computed-cascade — the dist|O-26 aurora perceptibility|O-3 headed real-GPU"
```

**Reserved ci.yml step — the cured `smoke-perf` subset, HARD** (add to the
e2e-slate job; drop `continue-on-error` for perf):

```yaml
            # PREPARED Pole-A (RESERVED — activate at U.W-CLOSE's blocking ruling).
            # The cured built-bundle perf subset, HARD. Excludes BY NAME:
            #   · O-5 boot pacing — the boot spike (test.fail; → U.W-PERF / U.W-ADOPT RP-2)
            - name: "Playwright — smoke-perf built-bundle slate (cured subset, HARD)"
              run: >-
                  npx playwright test --project=smoke-perf
                  --grep-invert "O-5 boot pacing"
```

> Excluded spec files (BY NAME, the register's referents):
> `o16-computed-cascade.spec.ts` (the clobber test only — its W5-census sibling
> test is green and stays IN the subset), `o26-aurora-perceptibility.spec.ts`,
> `o3-headed-gpu-probe.spec.ts`, `o5-boot-pacing.spec.ts`. The `--grep-invert`
> matches test TITLES so the mixed-file O-16 spec keeps its green W5-census test.

Activation precondition (owner-held): the cured subset is certified green on the
CI SwiftShader runner (a full e2e run this lane did not perform — expensive /
contended). U.W-CLOSE runs that certification or ratifies the soft posture.

---

## §4 · Default posture + the residual owner-gated decision

**Default (this lane's landed state):** SOFT-but-OWNED. Every project is invoked;
every soft slate step is cited to this record; the born-RED tripwires are mapped
by name; the Pole-A promotion is prepared and reserved. G-ORACLE-1 is GREEN on
the OWNED-soft condition.

**Residual (owner-gated, → U.W-CLOSE):** the choice between
- **Pole A** — activate the reserved hard step(s) in §3 (promote the cured green
  subset to blocking), or
- **Pole B** — formally ratify the soft posture through U (a cited launch
  decision with this record as its rationale + a review date).

Either way the posture is EXPLICIT + OWNED — never the un-owned `continue-on-error`
nobody re-decided (the U-F1 defect). U-F61 attested-flags the CI-TBT-red +
born-RED-cure-ownership single-sourced claims at close.

---

## §5 · G-ORACLE-1 born-RED → GREEN transcript + teeth verification

The gate (`scripts/ci/oracle-slate-teeth.mjs`) was authored born-RED against the
un-cured workflow, witnessed RED, then the cure landed and it was witnessed GREEN.

**born-RED (before cure):** exit 1 —
- CHECK A FAIL: 4 projects invoked by NO workflow (`smoke-admin`, `smoke-mobile`,
  `smoke-reactivity`, `smoke-perf`).
- CHECK B FAIL: 2 soft slate steps with NO owned cite (`full smoke`,
  `smoke-safari`).
- CHECK C PASS: page-load carried no continue-on-error.

**GREEN (after cure):** exit 0 —
- CHECK A PASS: all 6 projects invoked (the `e2e-slate` job wires the 4).
- CHECK B PASS: 3 soft slate steps, all carry an owned SOFT-POSTURE cite.
- CHECK C PASS: page-load stays hard.

**Teeth verified (the gate RE-REDDENS on regression, not a pass-once):**
- Softening the page-load hard gate → CHECK C FAIL (exit 1).
- Stripping a soft step's cite → CHECK B FAIL, un-owned drift returns (exit 1).
- Un-wiring any project (the born-RED state) → CHECK A FAIL (exit 1).

The gate is a config-parse assertion (headless-verifiable), born-RED IFF it
guards a LIVE defect (E-3) — it does. It is invoked in CI directly as
`node scripts/ci/oracle-slate-teeth.mjs` (see §6).

## §6 · The gate is WIRED into CI (a HARD lib-gate step)

G-ORACLE-1 asserts the *shape* of `ci.yml`, so it is a lib-gate step in the
`build-and-test` job — no browser, no dist, pure file read, invoked DIRECTLY
(no package.json script, per the lane's file-ownership rule):

```yaml
            - name: "G-ORACLE-1 — oracle-slate CI-teeth assertion (U-F1 · U-F55-CI-teeth)"
              run: node scripts/ci/oracle-slate-teeth.mjs
```

It is HARD (no continue-on-error) — and it MUST be: a born-RED gate that no
workflow runs is the exact "invoked by no workflow" defect this lane closes. It
is GREEN today (the cure landed), so wiring it hard reddens CI only on a future
regression: an un-owned `continue-on-error` returning to the slate, an unrun
project, or a softened page-load gate. The gate guards its OWN posture from
drifting back.

## §BOOK — the U.W-CLOSE book (recorded here; the close ledger rolls it up)

> **CI-teeth soft-posture DECISION → U.W-CLOSE.** U.W-ORACLE (CI-teeth lane)
> landed: (a) gap-closure — the four previously-unrun projects wired into CI
> (`e2e-slate` job); (b) OWNED cites on every soft oracle/perf slate step
> (`G-ORACLE-1 SOFT-POSTURE-CITE:` → this record); (c) the PREPARED-but-RESERVED
> Pole-A hard step(s) (§3), still-red/GPU-only excluded BY NAME, cited to
> `docs/tranches/U/audit/oracle/born-red-register/REGISTER.md`. The DEFAULT
> POSTURE is SOFT-but-OWNED. **U.W-CLOSE rules** the residual: promote the cured
> green subset to BLOCKING (activate §3, Pole A) OR formally ratify the cited
> soft posture through U (Pole B). Not re-decided un-owned; the ledger records
> the ruling. Related books (cited by name, no second book): O-16/O-26 producer
> flips ride **U.W-ADOPT** / communiqué `17e0f522` §2b; O-5/RP-2 flip rides
> **U.W-PERF / U.W-ADOPT**; the O-26/O-3 headed-GPU annex attestation rides
> **U.W-CLOSE / U-F54**.
