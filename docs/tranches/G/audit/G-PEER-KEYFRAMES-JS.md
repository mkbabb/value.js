# G — keyframes.js deep audit (value.js-side actions)

**Lane**: G-PEER-KEYFRAMES-JS (deferred-tool deep audit of keyframes.js from the value.js-consumer + value.js-publisher angle).
**Posture**: READ-ONLY across both repos; WRITE only this artefact.
**Successor to**: `G-AUDIT-4 §3` (cross-repo state — keyframes.js section). Where G-AUDIT-4 catalogued the 14-commit divergence and the precept-pin lag, this audit goes deeper into **what value.js can ship to address that state**.
**Reference SHAs**:
- value.js HEAD `0b9832c` (`tranche-g` @ G.W0-close-ratification commit).
- keyframes.js HEAD `470814e` (F.W2 codemod LOCAL-ONLY).
- value.js precept pin `68d9b20`; keyframes.js precept pin `458c2d1`; precept upstream `3310a8c`.
- F2 ratification R11 = "Leave LOCAL until next keyframes.js work-window" (user, 2026-05-21 at G open).

---

## §1 — Tranche state at keyframes.js

`ls /Users/mkbabb/Programming/keyframes.js/docs/tranches/` → **NO `tranches/` directory exists**.

keyframes.js does NOT operate under value.js's tranche/wave ceremony at all. Its tracked artefacts are:

- `docs/precepts/` (submodule, pinned at `458c2d1`).
- No `tranches/` dir; no `FINAL.md`-class close documents; no per-wave `coordination/Q.md`.

The 14 unpushed commits operate under glass-ui-tranche LETTERS (`Q.W1`, `Q.W5`, `Q.W6`, `W8-γ`, `W9-phase2`, `W10-γ`, `W12-δ`, `W12-unblocker`) — i.e. **keyframes.js is consumer-letter-stamped against glass-ui's tranche ceremony**, not its own. The most-recent commit body confirms this: `470814e` cites `value.js docs/tranches/F/waves/F.W2.md` + `coordination/Q.md §3` as the authority.

**Implication for value.js**: there is no peer-tranche FINAL.md to consult; the most-recent close-ceremony from keyframes.js's perspective IS value.js's F.W2 + F FINAL.md. value.js carries the close-ceremony burden for both repos in F2's window. No additional peer tranche is open or planned at keyframes.js post-F.W2.

**Disposition**: This is structural, not actionable from value.js's side. No value.js artifact is being missed by keyframes.js's absent-tranche-ceremony shape. **RETIRE-MOOT** for this lane.

---

## §2 — 14-commit unpushed chain (per-commit class)

Full chain via `git -C /Users/mkbabb/Programming/keyframes.js log origin/master..HEAD --pretty=format:'%h %s'`:

| # | SHA | Class | Tranche-letter (peer) | F-window? | F.W2 lockstep? | Independent peer work? |
|---|---|---|---|---|---|---|
| 1 | `8d824ee` | refactor (dep / freshness-gate retiral) | `AD.W4.T1+T3` (precept) | NO — pre-F | n/a | YES (glass-ui-coordinated) |
| 2 | `6af80ad` | fix (resolution contract) | `glass-ui Q.W1 Lane A+H` | NO — pre-F | n/a | YES (glass-ui keystone) |
| 3 | `84f1659` | fix (demo scene crash) | `glass-ui Q.W5 Lane A` | NO — pre-F | n/a | YES (demo restoration) |
| 4 | `5861d18` | fix (demo CSS / typography) | `glass-ui Q.W5 Lanes B/C/E` | NO — pre-F | n/a | YES (demo restoration) |
| 5 | `e073dac` | feat (glass-ui adoption + dead-code purge) | `glass-ui Q.W5 Lanes D/F` | NO — pre-F | n/a | YES (consumer-adoption) |
| 6 | `b721a0c` | chore (v2.1.1 + untrack dist/) | `glass-ui Q.W5` | NO — pre-F | n/a | YES (release hygiene) |
| 7 | `19d1a1b` | fix (build — split gh-pages from dist/) | `glass-ui Q.W6` | NO — pre-F | n/a | YES (build hygiene) |
| 8 | `0909177` | build (BREAKING — abrogate `development` condition) | `AG-GU0.L-a` (contract-v2) | NO — pre-F | n/a | YES (contract-v2 alignment) |
| 9 | `3c2d48e` | chore (SAFE-MINOR sweep + vue peerDep) | `W8-γ` (no peer letter) | YES — W8 lockstep | F.W2 PRE-REQ | NO — peer-window-paired |
| 10 | `7c959d8` | chore (consumer LOCKSTEP — @lucide/vue + @types/node + vaul-vue) | `W9-phase2` | YES — W9 lockstep | F.W2 PRE-REQ | NO — peer-window-paired |
| 11 | `b2dfec2` | feat (BREAKING — Vite 7 → 8 + Rolldown) | `W10-γ` | YES — W10 lockstep | F.W2 PRE-REQ | NO — peer-window-paired |
| 12 | `5896a36` | chore (TypeScript 5.8.3 → 6.0.3) | `W12-δ` | YES — W12 lockstep | F.W2 PRE-REQ | NO — peer-window-paired |
| 13 | `d312517` | fix (W12 TS-errors / dist/keyframes.d.ts) | `W12-unblocker` | YES — W12 lockstep | F.W2 PRE-REQ | NO — peer-window-paired |
| 14 | `470814e` | fix (F.W2 lerp codemod apply) | (value.js F.W2 Lane A) | YES — F.W2 | YES — IS F.W2 | NO — value.js-authored |

### §2.1 — Class tally

- **dep lift / refactor / build (pre-F)**: 8 commits (1-8) — Q.W1 through Q.W6 + contract-v2 abrogation. All glass-ui-tranche stamped; pre-F-window peer activity.
- **W8-W12 dep lockstep cohort (F-window pre-requisite)**: 5 commits (9-13). These are the lockstep cohort F1+F4 codified in `docs/tranches/F/W8-W12-consumer-lockstep.md`.
- **F.W2 codemod (value.js-authored peer write)**: 1 commit (14). The only F3-authorised cross-repo write in F's window.

### §2.2 — value.js relevance per commit

- Commits 1-8 are purely keyframes.js↔glass-ui coupling — value.js is not in the chain.
- Commit 8 (`0909177`, contract-v2 `development`-condition abrogation) is value.js-aligned per precept `68d9b20`: keyframes.js dropped the same condition value.js dropped at D.W1 Lane L1 — i.e. keyframes.js IS at the same contract-v2 surface as value.js. No further action needed.
- Commits 9-13 are the lockstep cohort that F4-§3 mandates value.js+keyframes.js advance together. They were applied at keyframes.js pre-F, the corresponding value.js advances landed at value.js's pre-F `47399c2..e1549e0` window (per F FINAL.md §6 + W8-W12-consumer-lockstep.md). **Both sides are in sync** at the lockstep cohort.
- Commit 14 is value.js's F.W2 deliverable; value.js owns this.

**Verdict**: **Zero commit in the 14-chain represents value.js-side technical debt or missed coordination**. The chain is a publish-discipline issue (un-pushed local), not a coordination defect.

---

## §3 — value.js as consumer of keyframes.js (likely NO)

`grep -rn "@mkbabb/keyframes" /Users/mkbabb/Programming/value.js/src/ /Users/mkbabb/Programming/value.js/demo/` returns **zero JS/TS import sites**. The only matches across the value.js repo are:

- `package.json:72` — `"@mkbabb/keyframes.js": "file:../keyframes.js"` in **devDependencies**.
- `package-lock.json` — 5 lock-graph references (the file:../ pointer + a stale `^2.0.0` shadow).
- `docs/precepts/cross-repo-dev-resolution.md:280` — documentation of the dev-resolution contract using keyframes.js as the example.
- `docs/tranches/A/audit/HARDEN-5-coverage-gaps.md:195` — historical reference to `optimizeDeps.exclude: ["@mkbabb/keyframes.js"]` in `vite.config.ts:84`.
- `docs/tranches/A/research/Aa-runtime-keystone.md:43` + `docs/tranches/A/findings.md:54` — historical: glass-ui's import crash diagnostic.
- `docs/tranches/{B,D,E,F}` — coordination + audit references.

### §3.1 — B.W3-K1 verdict revisited at G open

The B.W3 library-gap audit (`docs/tranches/B/audit/B.W3-library-gap.md` row K1) found **the `@mkbabb/keyframes.js` devDependency has zero import sites in `src/` or `demo/`** — every `keyframes` hit is either (a) a doc comment, (b) the `@keyframes` CSS at-rule in the stylesheet parser, or (c) literal `@keyframes` blocks in demo SFC `<style>`. B.W3 disposition was **"recommend REMOVE"** but the orchestrator preserved it.

At G open, the situation is unchanged. Re-confirmed:

- `grep -rn '@mkbabb/keyframes' src/` → 0 matches.
- `grep -rn '@mkbabb/keyframes' demo/` → 0 matches.
- `vite.config.ts` was the only consumer of the file:../ link historically (the `optimizeDeps.exclude` mention).

**Verdict**: value.js is **NOT a runtime consumer of keyframes.js**. The keyframes.js state (14 unpushed commits, codemod-LOCAL, precept-pin lag) is **purely PUBLISHER-side from value.js's perspective**. value.js publishes the lerp contract; keyframes.js consumes it. The 14 unpushed commits do not affect value.js's library, demo, or test surface in any way.

### §3.2 — But: the file:../ devDependency is "rationale-vestigial"

The K1 disposition note from B.W3 reads: "*if the `file:../keyframes.js` link exists to keep the sibling checkout present for cross-repo work, document that rationale instead*." This is now the de-facto reality:

- F.W2 Lane A used `node ./scripts/migrate-keyframes-js-lerp.mjs ../keyframes.js` — a sibling-checkout sibling-cwd execution model.
- The codemod's expected path is `../keyframes.js` (relative to value.js's repo root); the devDependency keeps that path live in any fresh `npm install` of value.js.
- Without the devDependency, a clean checkout of value.js would not know that `keyframes.js` is a sibling; the link exists to **document and enforce the cross-repo work-pair**.

So K1 is not vestigial — it is **rationale-documented-only**, and that rationale is not in any source comment. **FOLD candidate**: add a comment in `package.json` (via top-level `_` key or co-located doc) explaining the devDependency's cross-repo-pairing purpose, OR document it in CONTRIBUTING.md / a precept.

---

## §4 — value.js as publisher to keyframes.js

This is the substantive section. value.js IS a publisher to keyframes.js (the lerp contract + the codemod). The audit surfaces multiple gaps in the publication surface.

### §4.1 — codemod publication state

**Codemod**: `scripts/migrate-keyframes-js-lerp.mjs` (257 LoC). Header comment + JSDoc are excellent (Lines 1-50): describes provenance (E.W4 Lane F), strategy (conservative refusal mode), `--dry-run` semantics, exit codes. The codemod is **production-quality**:

- Idempotent (`[already-migrated]` skip arm at line 218).
- Parity-asserting (`countLerpCalls` invariant at line 127).
- Dry-run-safe (line 140 + line 214).
- Refusal-mode (`[unmatched]` arm at line 223).
- Hermetic (no `diff(1)` dependency; inline `renderSiteDiff` at line 115).

**npm-published**: `npm pack --dry-run` enumerates 150 files / 1.4 MB tarball. The manifest contains **only `dist/**` and `package.json`** — `scripts/` is NOT in the `files:` array (`package.json:42-44`), so the codemod is **NOT shipped with the npm tarball**.

Consequence: `npx @mkbabb/value.js/scripts/migrate-keyframes-js-lerp.mjs <path>` is impossible. The codemod is reachable ONLY via:

1. A sibling-checkout `node ./scripts/migrate-keyframes-js-lerp.mjs ../keyframes.js` (the F.W2 mode).
2. A `git clone + node scripts/...` flow (no npm-distribution path).

**FOLD-INTO-G candidate (G-PUB-1)**: add `scripts/migrate-keyframes-js-lerp.mjs` (or `scripts/` directory entirely) to `package.json` `files:` array; add a `bin:` mapping for `npx`-discoverability; add a `proof:codemod-publication` script that asserts the codemod is in the tarball + on a stable path. Trade-off: bin: would pollute the consumer's PATH; a safer shape is a `scripts/migrations/` subdir in `files:` + documenting `npx -p @mkbabb/value.js -- node node_modules/@mkbabb/value.js/scripts/migrations/migrate-keyframes-js-lerp.mjs <path>`.

### §4.2 — README / CHANGELOG / MIGRATION.md guidance

- `README.md` (124 LoC): **zero mentions** of `lerp`, `migrate`, `codemod`, or migration. The README catalogs features (Color L4, 15 spaces, gamut mapping, etc.) but has no "Upgrading from v0.6 → v0.7+" section, no "Breaking changes" section, no link to CHANGELOG.
- `CHANGELOG.md` (well-maintained): v0.8.0 entry (head) DOES reference the codemod and the keyframes.js cross-repo write explicitly ("Value.js's published codemod (`scripts/migrate-keyframes-js-lerp.mjs`) handles the keyframes.js-shape migration; manual migration is straightforward for other consumers..."). v0.7.0 entry deferred `lerpLegacy` removal and cited the migration diff. **CHANGELOG is the authoritative migration narrative.**
- `MIGRATION.md` / `UPGRADING.md` at repo root: **DOES NOT EXIST**.
- No top-level migration cookbook for consumers other than keyframes.js (the `lerp(t,a,b) → lerp(a,b,t)` change is silently breaking — old code compiles but produces garbage values).

**FOLD-INTO-G candidate (G-PUB-2)**: extend `README.md` with a brief "Breaking changes & migrations" section that links to `CHANGELOG.md` AND points to the codemod for the lerp arg-order migration. Lower-friction than authoring a separate `MIGRATION.md`. A single Markdown section at e.g. `README.md:84` (before "Install") with a heading "## Upgrading" + 6-10 lines pointing at the codemod + the swap pattern would cover the gap. Cost: minimal; benefit: any consumer hitting the silently-broken-lerp issue can find the codemod from the project front door.

### §4.3 — codemod expansion candidates

The codemod is hardcoded for 2 specific call sites (`numeric.ts:159` + `group.ts:251`) with **byte-exact match** including indentation. This is the conservative shape per F.W2 — but it leaves **every other consumer of v0.6.0/v0.7.0 lerp uncovered**.

Generic shape:

```js
// Source pattern: lerp(<expr_t>, <expr_a>, <expr_b>)
// Target pattern: lerp(<expr_a>, <expr_b>, <expr_t>)
```

A generic AST-walking rewriter (TypeScript Compiler API or `jscodeshift` or `ts-morph`) could rewrite any `lerp(t, a, b)` call where `lerp` is imported from `@mkbabb/value.js` (the import-source filter is the safety gate — avoid clobbering `Math.lerp` or other-library `lerp` calls).

**RAISE-AS-NEW-ASK** (NOT G-fold): `scripts/migrate-lerp-arg-order.mjs` — a generic AST-driven codemod that:

1. Walks the consumer's TS/JS files with `ts.createSourceFile`.
2. Filters call expressions to `lerp` calls where the binding traces to an import from `@mkbabb/value.js` (or `value.js` package-name match).
3. Rewrites the arg order.
4. Preserves the existing conservative codemod as `migrate-keyframes-js-lerp.mjs` (still byte-exact, still refusal-mode).

This is a larger artefact (~300-500 LoC + a TypeScript compiler dependency). It is NOT a F1-class deferral — there are no known consumers other than keyframes.js needing it. The shape is preserved here for the FIRST future report-of-issue from a third consumer to trigger.

### §4.4 — README links to keyframes.js work-pair

README mentions "easing functions" (line 51 — `math.ts # lerp, bezier, clamp, scale, deCasteljau`) but does NOT mention keyframes.js as an animation-companion library. The two are paired in coordination + tranche docs but invisible to a casual READAR.

**CARRY-FORWARD candidate** (NOT G-fold): a README section mentioning `@mkbabb/keyframes.js` as the animation-engine companion. Sub-priority because the README does not currently advertise companion libraries at all (no mention of `glass-ui`, `parse-that`, etc. either) — adding ONE companion mention without the others is asymmetric.

---

## §5 — Precept-pin drift status

`git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts` → `458c2d1167f4e3a327edf17fc7509da533cacf1e docs/precepts (heads/main)`.

`git -C /Users/mkbabb/Programming/keyframes.js/docs/precepts log -1 --format='%H %s'` → `458c2d1167f4e3a327edf17fc7509da533cacf1e Prune meta language and harden overfitting rules`.

- value.js precept pin: `68d9b20` (contract-v2 — `development`-condition abrogation, the upstream-HEAD-aligned pin).
- keyframes.js precept pin: `458c2d1` (an older general-prose-pruning commit).
- Upstream `origin/main`: `3310a8c` (`spec(P close): invariants 28-29 codified + LL entries 51-53 from glass-ui P.W6`) per G-AUDIT-4 §5.

The keyframes.js precept pin is **chronically behind** — direction is BACKWARD (older), not a fork.

### §5.1 — Could value.js-side action help?

Possible actions:

1. **Documentation note in value.js explaining the divergence (read-only):** filed in `docs/tranches/F/coordination/Q.md` already + restated in `docs/tranches/G/coordination/Q.md §3`. The fact-pattern is documented; the resolution (keyframes.js maintainer advances the submodule pin) is keyframes.js-side, outside value.js's F3 boundary.

2. **A precept-pin coord-doc:** a top-level `docs/peer-precept-pins.md` (or similar) summarizing peer precept-pin lag across the constellation. Status (G open): glass-ui at unknown pin; keyframes.js at `458c2d1`; fourier-analysis at unknown pin; speedtest at unknown pin; precepts main at `3310a8c`. Value: low — this is what `audit/G-AUDIT-4 §5` already captures; not worth lifting out of the tranche-audit ledger.

3. **A `proof:peer-precept-pin` script:** read each sibling submodule's pin, assert no divergence > N commits. Cost: medium (filesystem-walk + git-log); benefit: catches drift earlier than the manual audit. **But**: it cannot ACT on divergence (the resolution is in the peer repo), and the orchestrator already catches it in every cross-repo audit. **Marginal**.

**Verdict**: no value.js-side action meaningfully helps the keyframes.js precept-pin lag. The fix is keyframes.js-internal (`git -C keyframes.js submodule update --remote docs/precepts && git commit`). Per F3, value.js doesn't write keyframes.js. **CARRY-FORWARD** with the (c) trigger already present in `coordination/Q.md §3 R10` ("Re-check at keyframes.js maintainer's next submodule-rebase signal").

---

## §6 — Origin push status (R11 holds)

User-ratified at G open: **R11 = "Leave LOCAL until next keyframes.js work-window"**. The F.W2 codemod commit `470814e` + the 13 prior commits stay un-pushed.

### §6.1 — Does CHANGELOG.md v0.8.0 reference keyframes.js explicitly?

YES — verified at `CHANGELOG.md:13` ("INTERNAL" subsection):

> *keyframes.js cross-repo write: applied published lerp codemod against `/Users/mkbabb/Programming/keyframes.js` per F3 invariant (LOCAL-ONLY commit; user-discretionary push).*

The CHANGELOG entry is **truthful + complete**: it cites the cross-repo write, the F3 invariant, the LOCAL-ONLY status, the user-discretionary push. **No drift here.**

What CHANGELOG.md does NOT do:

- Cite the specific peer commit SHA `470814e` (F FINAL.md does — `§4 line 13` of FINAL.md table — but CHANGELOG is the user-facing surface and SHAs are abnormally verbose there).
- Direct bug-report consumers to a contact / fallback if they hit the silently-broken-lerp shape (the "if you see garbage interpolated values, your consumer is at v0.6+ but your call sites are at the legacy arg order — run the codemod" diagnostic).

### §6.2 — Should value.js add a CHANGELOG/MIGRATION note for the LOCAL-state?

**Disposition**: NO direct action. The current CHANGELOG.md entry plus the codemod's own README/header is sufficient. Adding a "if keyframes.js is broken at HEAD, here's why" note in value.js's CHANGELOG would conflate **publisher concerns** with **peer-consumer state**.

However, the existing CHANGELOG entry uses an absolute filesystem path (`/Users/mkbabb/Programming/keyframes.js`) which is **personal-machine-specific**. This is a documentation hygiene defect.

**FOLD-INTO-G candidate (G-PUB-3)**: edit `CHANGELOG.md:13` to replace the absolute path with a relative or symbolic reference: `applied published lerp codemod against the keyframes.js sibling repo (HEAD 470814e)`. 1-line fix; restores documentation hygiene; cites the peer SHA explicitly (better forensic trail).

---

## §7 — value.js-side actions surfaced

### §7.1 FOLD-INTO-G candidates

| # | ID | Title | File:line | Proposed change | Wave |
|---|---|---|---|---|---|
| 1 | **G-PUB-1** | Codemod npm-publishability (CRITICAL gap) | `package.json:42-44` (`files:` array) + new `scripts/proof-codemod-publication.mjs` | Add `"scripts/migrate-*.mjs"` to `files:`. Add a new proof script that asserts the codemod ships in the npm tarball + has a stable invocable path. Wire into CI (similar to F's `proof:dts-layout`). | G.W3 (Lane I — proof-codemod-publication, analogous to F11/F12) |
| 2 | **G-PUB-2** | README "Upgrading" section | `README.md:~25-35` (before "Install" section) | Add a 6-10 line "Upgrading from v0.6.x → v0.7+" section that points to CHANGELOG + lists the lerp arg-order swap + names the codemod. | G.W4 (close-ceremony documentation) |
| 3 | **G-PUB-3** | CHANGELOG.md absolute-path hygiene | `CHANGELOG.md:13` | Replace `/Users/mkbabb/Programming/keyframes.js` with `the keyframes.js sibling repo (HEAD 470814e)`. | G.W4 (close-ceremony doc hygiene) — TRIVIAL |
| 4 | **G-PUB-4** | Document the cross-repo-pairing rationale for the `file:../keyframes.js` devDep | `CONTRIBUTING.md` or new `docs/peer-checkout-layout.md`; `package.json` comment-via-`_comment` if pursued | Codifies the K1 disposition: explain that the devDep links the sibling-checkout cwd assumption baked into `scripts/migrate-keyframes-js-lerp.mjs` + the historical `optimizeDeps.exclude` (vite.config). | G.W4 (lightweight doc) |

### §7.2 CARRY-FORWARD (no G-action; refresh trigger only)

| # | Item | Carry-trigger |
|---|---|---|
| C-1 | keyframes.js precept-pin drift (`458c2d1` vs upstream `3310a8c`) | Re-check at keyframes.js maintainer's next submodule-rebase signal. Mirror of `coordination/Q.md §3 R10`. |
| C-2 | keyframes.js 14-commit unpushed chain | Re-check on user-signal-to-push OR next keyframes.js work-window. Mirror of `coordination/Q.md §3 R11`. |
| C-3 | Companion-library cross-link in README (`@mkbabb/keyframes.js` named as animation engine) | Re-check when README gets first dedicated "Companion libraries" section, or when keyframes.js publishes its own README change recommending value.js. Asymmetric to add unilaterally. |

### §7.3 RAISE-AS-NEW-ASK

| # | Ask ID | Title | Justification | Cost estimate |
|---|---|---|---|---|
| N-1 | **NEW-ASK-LERP-GENERIC** | Generic AST-driven `lerp(t,a,b) → lerp(a,b,t)` codemod (`scripts/migrate-lerp-arg-order.mjs`) | Today's codemod is byte-exact-match to keyframes.js's 2 sites. Any other v0.6/v0.7-pinning consumer hitting the silent-break needs manual migration. NO known consumer needs it today, but the codemod-scaffolding skill is captured + ready for the first third-consumer report. | Medium: ~300-500 LoC + a `typescript` devDep (already present) for the AST API; or `recast`/`jscodeshift` if a heavier toolchain is acceptable. |
| N-2 | **NEW-ASK-CODEMOD-CADENCE** | A precept (or `docs/precepts/codemod-publication-discipline.md`) codifying the "every BREAKING change ships with a codemod where mechanically possible" pattern. | F.W2 was opportunistic; the discipline pattern (refusal-mode, parity-assert, --dry-run) is precept-worthy if value.js + glass-ui + keyframes.js will recurringly ship BREAKING changes. | Low: docs-only. Could be folded into precept §11 (analogous to the §10 derive-from-color block keyframes.js is tracking). |

### §7.4 RETIRE-MOOT

| # | Item | Rationale |
|---|---|---|
| RM-1 | "keyframes.js has no `tranches/` dir → value.js should help author one" | Not value.js's concern. keyframes.js operates under glass-ui's tranche-letter ceremony for its dep-lift commits; F.W2 used value.js's. There is no missed coordination. |
| RM-2 | "value.js should help push the 14-commit chain to origin" | Push-discipline is user/operator action; per R11 the user explicitly chose LEAVE-LOCAL. |
| RM-3 | "Add the second silently-broken call site (group.ts:251) to a codemod" | Already done. The codemod (`SITES` array at scripts:78-109) covers BOTH sites. Confirmed via Lane F audit per the codemod header (line 33). |

---

## §8 — Synthesis & disposition tally

### §8.1 — Item tally

| Disposition | Count | Items |
|---|---|---|
| **FOLD-INTO-G** | **4** | G-PUB-1 (codemod publishability) / G-PUB-2 (README upgrading section) / G-PUB-3 (CHANGELOG path hygiene) / G-PUB-4 (file:../ devDep rationale doc) |
| **CARRY-FORWARD** | 3 | C-1 (precept-pin lag) / C-2 (14-commit push status) / C-3 (companion README link, asymmetry blocker) |
| **RAISE-AS-NEW-ASK** | 2 | N-1 (generic AST codemod) / N-2 (codemod-discipline precept) |
| **RETIRE-MOOT** | 3 | RM-1/RM-2/RM-3 |
| **TOTAL surfaced** | **12** | |

### §8.2 — Headline finding

**The substantive value.js-side gap is publication hygiene of the F.W2 codemod, NOT any technical defect in keyframes.js itself**:

1. The codemod is excellent (idempotent, refusal-mode, dry-run-safe).
2. It is **not shipped in the npm tarball** (`scripts/` not in `files:`).
3. The README does not direct consumers to it.
4. The CHANGELOG entry naming it carries a personal-machine absolute path.

These are **all value.js-side fixes** — orthogonal to the 14-commit keyframes.js unpushed chain, to the precept-pin lag, and to the R11 "leave LOCAL" ratification.

### §8.3 — Recommended G-fold (minimal viable)

The user's `coordination/Q.md §3 R11` decision held LOCAL on keyframes.js's push. The 4 FOLD-INTO-G candidates are **independent of that decision** and address value.js's own publication surface:

- **G.W3** absorbs G-PUB-1 (codemod publishability + proof script) as Lane I — fits the F11-class invariant-guard pattern (`proof:no-deprecated`, `proof:no-ts-ignore`, etc.).
- **G.W4** absorbs G-PUB-2 + G-PUB-3 + G-PUB-4 as close-ceremony documentation fixes.

Net cost: ~1 new proof script (~80 LoC) + 4 file edits (~20 LoC + ~15 LoC + 1 LoC + ~40 LoC docs). All trivial. All compatible with F3 (zero peer writes).

### §8.4 — RAISE-AS-NEW-ASK summary

The 2 NEW-ASK items are **not G-fold candidates** — they are future-tranche capacity items:

- **N-1** (generic AST codemod) is on-hold pending FIRST report from a third consumer.
- **N-2** (codemod-publication discipline precept) is a precept-authorship request; routes to the upstream precepts repo at the maintainer's discretion, not to value.js's G window.

Filed for visibility; carried in `coordination/Q.md` as RAISE-NEW-ASK class with no triggering event.

---

**Audit complete**. 12 items surfaced. 4 FOLD-INTO-G. Zero peer writes proposed (F3 honored).
