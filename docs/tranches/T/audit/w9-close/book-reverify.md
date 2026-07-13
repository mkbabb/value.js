# T.W9 — BOOK RE-VERIFICATION + SPEC-STATUS RECHECK (the close-verification act)

**Wave**: T.W9 — CLOSE. **Lane**: books-specstatus (book re-verification + the spec-status
recheck; `T.W9.md §Scope 5/6`, `T.md §7`).
**Probe date**: 2026-07-12 (UTC). **Governing law**: `waves/T.W9.md` · `T.md §7` (the BOOKS
table, §7.1 inherited + §7.2 T-minted) · `S/FINAL.md §8` (the X1/X2 firing ops, restated
verbatim below) · `S/FINAL.md §5` + `S/audit/w9-close-probes.md §2/§3` (the inherited book-state
+ the S-era live probes this lane re-runs).

**Live-world stamps at probe** (sibling trees are in active flux — the U formation is committing
on `tranche-t` and the siblings have advanced into their own successor tranches; stamps captured
2026-07-12):

| Repo | HEAD | Branch | pkg |
|---|---|---|---|
| value.js | `f619004` (moving; U docs landing on `tranche-t`) | `tranche-t` | 3.1.0 (registry `latest`) |
| glass-ui | `690fef91` | `tranche/BI` | **5.0.0 (IN-DEV — greenlit 2026-07-12, NOT cut/tagged)** |
| keyframes.js | `b1ca5ee9` | `tranche-u-impl` | 5.2.0 |
| parse-that | `ef10d5b` | `master` | (tranche-A / 0.11.0; PT-E no reply) |
| fourier-analysis | `cd26c65` | `m/w1-bump-migration` | (unchanged since 2026-07-03) |

**Discipline (binding)**: no book discharges silently — every `T.md §7` row re-probed against the
live world (S lesson 4). No number drift silently reconciled — both figures on the record. A
defect found routes to a row, never a silent patch. Sibling trees READ-ONLY.

---

## §RESULT — the honest verdict

**Zero book found silently discharged/fired-unnoticed.** Every `T.md §7.1`/`§7.2` row re-probed
live. The T-internal books (L1, TA-4, dup-`useDark`, `proof:*`, oracle-floor) **DISCHARGED in
T's waves** (verified in the live tree). The producer-side cluster (the 5.0.0 adopt, GAP-ARM/L2/
L5, PRM-expand, L20, L17 rename, CI un-pin, L2..L16 asks) **rides the UNFIRED W7 adopt trigger**
(`git -C ../glass-ui tag --list 'v5*'` = **empty**; registry `latest=4.2.0`) → **HANDS TO the
successor tranche U** as a class. **X1/X2 were EXECUTED at W0-X1/W0-X2** (not a 3rd re-book) and
**re-verified STILL LIVE at close** (§A). The chronic cross-repo 7-set: **no fired trigger
crosses value.js's consume-edge** — three honest spec-status drifts recorded (§D), none
value.js-actionable.

Three recordable drifts (both figures on the record, no silent reconciliation):
1. `Color.try()` soft-demand **12 → 3** try-wraps (still parked, does not clear the bar).
2. dup-`useDark` **4 → 0 live parallel-store sites** — folded onto the glass-ui `useGlobalDark`
   singleton (DISCHARGED; the 2 grep hits are historical past-tense comments).
3. CSS `random()` **Safari-TP-only → Safari 26.2 stable** (still Safari-only, not Baseline).

---

## §A — X1 / X2: the W0-executed outcomes restated VERBATIM + re-verified live at close

X1/X2 were **RULED-AT-RATIFICATION §2 (cascade 5) into W0-EXECUTABLE** items (W0-X1/W0-X2),
moved off the maintainer-book track. Per `T.W9.md §Scope 6`, this close **RESTATES their
executed W0 outcomes with their firing records** — and re-probes them LIVE (a close verifies the
deployed lineage, never assumes it).

### A.1 — The firing records (verbatim)

**`S/FINAL.md §8` (the residual OPS, verbatim-carried — "nothing here is agent-executable" as it
stood at S; superseded by the W0 firing):**

> 1. **X1 — prod api deploy** (second-tranche carry). The `value-js` hook is unregistered in the
>    adnanh/webhook config on `deploy.babb.dev` (receiver root answers 200; the hook 404s).
>    **Op**: register the hook on-host, then push `master` (the webhook fires on `ref==master`)
>    so `deploy-hook.sh` lands the current api. Until then `api.color.babb.dev` serves the
>    pre-R I-era api (R-era routes 404). Exact instructions: R `FINAL.md §7`.
> 2. **X2 — NCSU-alias retirement** (owner order "no ncsu alias"; second-tranche carry).
>    SSH to `mbabb.fi.ncsu.edu` times out off-campus — a named human trigger. **Op** (on the
>    NCSU VPN/campus): remove the `/colors/` proxy block (`api/apache-vhost.conf:19-27`), let
>    its DNS/cert lapse, AFTER confirming `color.babb.dev` serves HEAD lineage. Verification =
>    the alias going non-200; the observation amends this row + the S/R book records.

**`S/FINAL.md §5` firing notes (the book FIRED into T, verbatim):**

> **[FIRING NOTE 2026-07-09 — the book FIRED into T: the T ratification's §2 CI/DEPLOY MANDATE
> (`T/audit/RATIFICATION-2026-07-09.md`, cascade 5) moved X1 from maintainer-book to the
> W0-EXECUTABLE item T.W0 W0-X1 (executed-or-honest-record)]**

> **[FIRING NOTE 2026-07-09 — the book FIRED into T: VPN/SSH access to
> `mbabb.fridayinstitute.net` GRANTED per the T ratification §2; X2 moved to the W0-EXECUTABLE
> item T.W0 W0-X2 (probe-first caution law; executed-or-honest-record)]**

### A.2 — The W0-executed outcomes (from `audit/w0-xhost-record.md`, verbatim verdict)

> **X1 LANDED · X2 LANDED.** api.color.babb.dev restored to HEAD lineage and left I-era; the
> value.js deploy webhook repaired end-to-end; the NCSU `/colors/` alias retired to a
> 301-redirect to color.babb.dev. All executed on `mbabb.fridayinstitute.net` (the babb.dev
> spine host) over the granted SSH access.

- **X1** — the prod api was CRASH-LOOPING (503, not R-era's 404) on a MongoDB
  `IndexOptionsConflict`. Cure: dropped the stale `sessions.expiresAt_1` index (app recreated
  the canonical `sessions_ttl_expiresAt` TTL on boot); redeployed `/srv/constellation/palette-api`
  **@ `0441aba`** via the documented `scripts/deploy-hook.sh`; repointed the `value.js` webhook
  (dot-URL `.../hooks/value.js`, HMAC intact) from the legacy dead-dir `dispatch.sh` arm to the
  git-checkout `deploy-hook.sh`. **prod left I-era; `/health` `commit` == `origin/master` tip
  `0441aba`.**
- **X2** — the `/colors/` proxy block in `mbabb.fi.ncsu.edu`'s Apache vhost replaced with a
  `RewriteRule ^/colors(/.*)?$ https://color.babb.dev/ [R=301,L]`. **`mbabb.fi.ncsu.edu/colors/`
  → 301 → color.babb.dev** (the alias no longer serves the palette API).

### A.3 — Live re-probe at close (2026-07-12) — BOTH STILL HOLD

| Probe | Result at close | vs W0 |
|---|---|---|
| `curl api.color.babb.dev/health` | **200** `{"status":"ok",...,"commit":"0441abafba8437a29dbe3d366f05111c6792ad4b","checks":{"mongo":"ok"},"uptime":242382}` | **HOLDS** — HEAD lineage `0441aba`, mongo ok, ~2.8-day uptime |
| `curl api.color.babb.dev/` | **200** | HOLDS |
| `curl deploy.babb.dev/hooks/value.js` | **200** `"Hook rules were not satisfied."` | HOLDS — hook present, HMAC intact (unsigned poke rejected) |
| `curl -I mbabb.fi.ncsu.edu/colors/` | **301** `Location: https://color.babb.dev/` | HOLDS — X2 retirement live |
| `curl color.babb.dev/` | **200** | HOLDS (frontend unaffected) |

**X1 EXECUTED + LIVE · X2 EXECUTED + LIVE. Never a silent 3rd re-book** — the no-silent-3rd-
re-book law is satisfied by EXECUTION (not an honest-blocked record). O-25 (the prod-lineage
oracle) is GREEN against the deployed artifact. **RETIRE — both discharged by execution**;
recorded to U as historical CLOSED residuals (not open books).

---

## §B — The 5.0.0 adopt / W7 trigger state (record as-is, TRIGGER-NOT-FIRED)

Per `T.W9.md §Scope 6`: the W7 adopt state is recorded as-is; an unfired trigger hands the book
to the successor (the R→S→T precedent).

**`git -C ../glass-ui tag --list 'v5*'` → (empty).** `git describe --tags --abbrev=0` → `v4.2.0`.
Registry `@mkbabb/glass-ui` `dist-tags.latest` → **`4.2.0`** (versions end `…4.1.0, 4.2.0`; **no
v5**). **TRIGGER NOT FIRED.**

**Honest nuance (S lesson 4 — the fired-but-unnoticed hunt).** The glass-ui `package.json`
version is now **5.0.0** and HEAD is `690fef91` "**BI GREENLIGHT (user 2026-07-12): execution
begins; Decision-0 ruled 5.0.0**" on branch `tranche/BI`. The 5.0.0 WORK **began today**, mid-
execution — but the ADOPT trigger is a **cut/tagged/published** glass-ui 5.0.0 that value.js
re-pins to (per §3.4 the `file:` pin adopts at the CUT + the by-name MIGRATION table), and no v5
tag / no registry v5 exists. So **trigger-not-fired STANDS**; the cut is **imminent** (very
likely to fire early in U's life). T.W7 itself re-probed this 2026-07-12 at the T.W8 close and
recorded **TRIGGER-NOT-FIRED**; T.W7 is `PENDING + TRIGGER-GATED` on the BG/BH joint cut.

**L17 GooBlob→`Blob` rename** · **L20 `goo-blob/config` subpath**: glass-ui `exports` still carry
only `./goo-blob` (no `./blob`, no `./goo-blob/config`). **NOT FIRED / NOT LANDED** — ride the cut.
**CI un-pin from `tranche/BG`**: gated on the 5.0.0 master landing (R.W7 `102b37b`) → stays pinned.
**All → HAND TO U** (the adopt-event class).

---

## §C — Producer-gap re-check against the glass-ui 5.0.0-IN-DEV tree (READ-ONLY, `690fef91`)

The gap rows all ride the un-fired adopt (books-never-gates). Re-probed against the CURRENT
`tranche/BI` tree — several show **in-tree progress toward the cure** (the 5.0.0 work is exactly
where these land). The definitive verdict is the **adopt-time re-verify** (T.W7 / U's adopt wave),
not this close; recorded here as the live state at hand-off.

| Gap | S-era state (`w9-close-probes.md §2`) | Live probe at close (2026-07-12, `690fef91`) | Disposition |
|---|---|---|---|
| **GAP-ARM** cold-load arm-replay | `useAurora.ts:212–228` — `arm()` then a watch with **no** immediate replay, **no** `{immediate:true}` | **REWORKED toward the cure** — `useAurora.ts` now runs `armRuntime()` inside a `watch(..., { immediate: true })` (`:340–343`) + synchronous `armRuntime()` on the createAurora-armed path (`:276–279`); the immediate-replay shape GAP-ARM demanded is present in-tree | verify-at-adopt → **U** |
| **GAP-L2** variance atoms door | `atoms.ts` grep `lightnessScheme\|lBand\|hueSpread\|chromaVariance` → **NONE** | door surface **now present** — the terms resolve in `aurora/composables/atoms.ts` + new `atoms-fields.ts` (was absent at S) | verify-at-adopt → **U** |
| **GAP-L5** blob HERO preset + `uSatColor[]` | no HERO preset export; `uSatColor[]` cut but PENDING | rides the blob co-rebuild; still `./goo-blob` whole-component export | verify-at-adopt → **U** |
| **PRM-expand** (keyframes) `springPlay` reduced-motion arm | one-line cure never landed at 5.2.0 | re-dispatched `VALUEJS-KF-PRM-EXPAND-2026-07-09` (keyframes inbox); the letter re-verified STILL LIVE at `e3d0ae5`/2026-07-10; keyframes has since advanced (`tranche-u-impl`, 5.2.0, U.F easing-surface refactors) — the fix state at the newest HEAD is the adopt re-verify's; **not value.js-gated** | KEEP-BOOKED → **U** |
| **L20** `goo-blob/config` subpath (JS-eager anchor) | absent | still absent (`exports` = `./goo-blob` only) → the 33 KiB barrel anchor persists (RP-2 / the Q14 perf gate — the perf lane owns) | **U** |
| **GLASSUI L2..L16 open set** | producer asks, un-fired | ride the 5.0.0 cut / the W7 walk (the letter/packet-dispositions W9 lane records the P1–P10 packet status) | **U** |

---

## §D — The chronic cross-repo 7-set (spec-status recheck, live 2026-07-12)

Each probed for a **fired-but-unnoticed trigger** (S lesson 4). **None crosses value.js's
consume-edge.** value.js's own consume surfaces re-confirmed statically (unchanged).

### D.1 — CSS spec-status set (R-10 · R8-23 · R-5) — live web re-verify + static consume-surface

| Book | Live spec status (2026-07-12) | value.js consume surface | Verdict |
|---|---|---|---|
| **R-10** CSS `if()` / `random()` (CSS Values L5) | `if()` still experimental, **not Baseline** (Chromium-only). `random()` **DRIFT: now shipped Safari 26.2 stable** (was Safari-TP-only at S's 2026-07-06 probe) — still **Safari-only, not Baseline** (Firefox/Chrome absent) | value.js does **not** consume `if()`/`random()` (grep-confirmed: no consume arms in `src/parsing/`) | **KEEP-BOOKED** — drift recorded, no consume-edge, no fired trigger |
| **R8-23** scroll/view-timeline longhands (Scroll-driven Animations) | **DRIFT toward Baseline**: Chrome ≥115, Safari ≥18, **Firefox 152 (Jun 2026) still behind `layout.css.scroll-driven-animations.enabled` flag** — Interop 2026 priority; **not yet Baseline** (Firefox stable unflipped) | value.js already **PARSES** these — `src/parsing/timeline/scroll-timeline.ts` present (path moved from `src/parsing/scroll-timeline.ts` in T's colocation restructure) | **KEEP-BOOKED** — parser present, no consume-edge change, no fired trigger |
| **R-5** `rec2100-pq/hlg/linear` (CSS Color HDR L1) | still a **W3C draft** (18 Aug 2025 Process; open issues #10459 black-luminance, #111 common-ize conversions, #11616 headroom syntax); **not Baseline / not broadly shipped** | value.js ships **ICtCp + Jzazbz** (HDR-adjacent, 3.1.0) — **not** rec2100 (grep-confirmed: no `rec2100` in `src/`); no consume-demand | **KEEP-BOOKED** — HDR module still draft, no fired trigger |

Sources (T-close re-verify): [MDN `if()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if) ·
[MDN `random()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random) ·
[MDN scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) ·
[W3C CSS Color HDR L1](https://www.w3.org/TR/css-color-hdr-1/).

### D.2 — Cross-repo convergence set (CH-10 · CH-13 · FN-7 · kf `resolveEasing`)

| Book | Live probe (2026-07-12) | Verdict |
|---|---|---|
| **CH-10** kf precept-pin convergence (≈9 tranches K→R) | keyframes @ `b1ca5ee9`, `tranche-u-impl`, 5.2.0 — kf-side convergence, no value.js action required | **KEEP-BOOKED** — no value.js-actionable trigger → **U** |
| **CH-13** fourier Phase-0 quiescence (≈7 tranches) | fourier-analysis @ `cd26c65` (2026-07-03, `m/w1-bump-migration`) — **unchanged since S**, quiescent | **KEEP-BOOKED** — no fired trigger → **U** |
| **FN-7** fourier doc-relocation + CONSTELLATION.md pointer (≈7 tranches R.W6→S→T) | fourier HEAD unchanged (2026-07-03); relocation **not executed**; the in-tree contract-of-record note (R.W6 §8) holds the binding | **KEEP-BOOKED** — de-urgented, no value.js action → **U** |
| **kf `resolveEasing`** convergence (S-new) | **fired-but-unnoticed HUNT PAID OFF**: keyframes **DID touch its easing surface** (U.F commits — "route easing default through published subpath", `6161215c`). This meets the book's trigger condition ("kf's next easing-surface touch"). BUT the touch is a **kf-internal subpath refactor**, not a decision to consume value.js's `resolveEasing`; the book is **explicitly NOT value.js-gated** (courtesy record). value.js's host is present + unchanged (`src/easing.ts:517`) | **KEEP-BOOKED** — kf-side touch recorded, no value.js action; the convergence is kf's call at kf tranche U → **U** |

---

## §E — T-internal book landings (verified DISCHARGED in the live tree)

These `T.md §7.1` rows were T-owned (src/demo/api/repo) and serviced in T's waves. Re-probed
live — **all discharged**; **RETIRE** (not handed to U).

| Book | T home | Live probe (2026-07-12) | Disposition |
|---|---|---|---|
| **L1** Normalized/Display brand (S's `W2-3`, renamed) | W1-src | `L1-normalized-display-brand-decision.md`: **CLOSE — the runtime-flag design RATIFIED; the brand does NOT land; no re-book (permanent constraint)** — the load-bearing form is a forbidden semver-MAJOR to 5 frozen exports; the FORBIDS-legal form is decorative no-op | **RETIRE** — killed-with-rationale |
| **`/remix`+`/diff` api-hygiene (TA-4)** — stored `atomDiff` WRITE-ONLY | W1-api (module move) | `atomDiff` **excised** — `grep atomDiff api/src/modules/palette/service/forks.ts` = empty; the forks path now uses a **content-hash diff** (`routes/crud.ts:137`), no write-only stored diff | **RETIRE** — discharged in the W1-api colocation move |
| **dup-`useDark` · PI-DRIFT-1** | W1-demo cargo | **folded onto `useGlobalDark`** — `useMarkdownColors.ts:1` imports `useGlobalDark from "@mkbabb/glass-ui/dark"` ("The ONE app dark store … singleton"); the `useContrastSafeColor`/`useViewAccents` sites migrated; the 2 grep hits are **past-tense historical comments** ("parallel stores raced …") | **RETIRE** — discharged (drift 4→0 live sites) |
| **`proof:*` carry (Q13 split)** | W0-2 | `package.json` `test:dist` = build + the **5 retained** gates (`css-parity`, `round-trip-idempotent`, `perf-target`, `serialize-fidelity`, `subpath-budget`); the other 7 + favicon + `globals` excised | **RETIRE** — discharged (Q13 executed) |
| **oracle-floor blindness (F3/F4)** | W0-5 | `e2e/smoke/oracles/` present (`o10-type-locks`, `o11-header-gates`, …) — the oracle-floor mints landed | **RETIRE** — discharged |
| **doc-truth set (DOC-1..13)** | W0-4 + W9 rewrites | W0-4 landed the pre-E-1-safe set; the demo/api CLAUDE.md + root Structure rewrites are the **W9 doc-rewrite lane's** deliverable (item 8; not this lane) | partial → the W9 doc-rewrite lane owns the remainder |

**DORMANT / PARKED (unchanged, hand to U as dormant):**

| Book | Live probe | Disposition |
|---|---|---|
| **`Color.try()`** | demo try-wraps **12 → 3** (drift recorded); still soft, does not clear the bar | **PARK → U** |
| **`usePaletteStore` migration** | `usePaletteStore.ts:8` `version: 1` — no bump past 1 | **DORMANT → U** (trigger unfired) |
| **S.H3 Pratt** | parse-that @ `ef10d5b` (`master`), PT-E no reply; no easing/parse wave opened | **KEEP-DORMANT → U** |

---

## §F — §7.2 T-minted books (the producer-consume swap set + watches)

Every §7.2 booked swap is triggered by a **P-packet landing at the W7 adopt** (P3/P5/P6/P7) or a
PKT landing — and **W7 is UNFIRED** (§B). So the **entire §7.2 swap set hands to U** as a class;
the demo interims stay live until the producer primitives land at the cut.

| Book | Trigger | State at close | → |
|---|---|---|---|
| W3-1 `--well-bg` → P3 WELL rung · W3-3 search seat → P3 · W3-4 feather → P3 rest-floor | P3 lands | demo interims live; P3 un-landed (W7 unfired) | **U** |
| W4-4 seal-recipe ring → P5 letter-rail primitive (S-3 demo half LANDED — `ConsoleRail`/`--seal-ink` live) | P5 lands | demo interim live; P5 un-landed | **U** |
| W4-5 wall-clock park → P6 seam · W2-4 emerge beat → P6 row-F | P6 lands | interim `emerging`-state live | **U** |
| W2-3 dock reveal veil → P7 arrive-expanded hook · W6-3 regex autoplay → P7 declarative door | P7 lands | interims live | **U** |
| Q12-ALTERNATIVE (conditional) fitted seal-ring → P5 solid-ring | P5 lands AND Q12 rules fitted | conditional; Q12 RULED ABROGATE (default) | **U** (conditional, likely moot) |
| O-16 R1 bare-utility default **EXPECTED-RED** | PKT-1 lands | red carries the packet cite; PKT-1 → W7 | **U** |
| W5 Tranche B (R6/R7 compositor collapses) | PKT-3 lands | untouched until PKT-3 | **U** |
| `.underline-tabs` MARKER (`style.css`) + A6 `backdrop-filter:none` MARKER retire-checks | P7 Tabs `underline` / P8 minifier | retire-checks at the W7 legacy-sweep | **U** |
| `/easing` 17th-subpath GAP-3 verify-watch | the WS12 export regen | watch (P9-J3 row) | **U** |
| `easing.ts` @643 | — | watch-only (do not over-restructure) | **U** |
| Q16 candidates (`EmptyState` + picker action controls) | producer ≥2-consumer call | flagged in the letter; interim as-is | **U** |

---

## §G — The successor hand-off table (HAND-TO-U vs RETIRE)

The T FINAL.md §5 books table (supersedes `S/FINAL.md §5`) inherits this routing. **U's supersedes
this one.**

### HAND TO TRANCHE U (open at T close)

- **The 5.0.0 adopt-event class** (rides the unfired W7 trigger — the CUT is imminent, glass-ui
  5.0.0 greenlit 2026-07-12): the glass-ui 5.0.0 adopt · CI un-pin from `tranche/BG` · **L17**
  `Blob` rename · **L20** `goo-blob/config` subpath · **GAP-ARM** (reworked toward cure in-tree)
  · **GAP-L2** (door now present in-tree) · **GAP-L5** blob halves · **GLASSUI L2..L16** open
  asks · the whole **§7.2 producer-consume swap set** (P3/P5/P6/P7-gated).
- **PRM-expand** (keyframes) — re-dispatched, STILL LIVE at the last verified kf HEAD; not
  value.js-gated.
- **The chronic cross-repo 7-set** — CH-10 · CH-13 · FN-7 · kf `resolveEasing` · R8-23 · R-5 ·
  R-10 — all KEEP-BOOKED, no fired trigger crosses value.js's consume-edge (3 drifts recorded,
  none actionable).
- **DORMANT/PARK**: `Color.try()` (park, 3 wraps) · `usePaletteStore` migration (dormant, no
  version bump) · **S.H3 Pratt** (dormant, PT-E no reply).
- **Cross-referenced (owned by sibling W9 lanes, named here for zero-drop)**: the W8-booked
  demo-caps re-encapsulation row (`useAtmosphere.ts` 411 · `Markdown.vue` 408 over ≤400 — the
  repo-sweeps/fix lane) · the Q14 perf-redemption disposition (the perf lane — L20 barrel + the
  producer cure) · the doc-rewrite remainder (the doc lane) · the P1–P10 packet dispositions (the
  letter/packet lane).

### RETIRE (discharged/killed in T — NOT handed to U)

- **X1** (prod api deploy) — **EXECUTED at W0-X1**, `0441aba` live, webhook repaired; re-verified
  live at close. Historical CLOSED residual.
- **X2** (NCSU alias) — **EXECUTED at W0-X2**, 301→color.babb.dev live; re-verified at close.
  Historical CLOSED residual.
- **L1** Normalized/Display brand — CLOSED (runtime-flag ratified; brand killed-with-rationale;
  permanent constraint, no re-book).
- **TA-4** `/remix`+`/diff` api-hygiene — atomDiff write-only excised (W1-api module move).
- **dup-`useDark`** — folded onto the `useGlobalDark` singleton (W1-demo).
- **`proof:*` carry** — Q13 split executed (`test:dist` = 5 retained gates).
- **oracle-floor F3/F4** — mints landed (W0-5).

### The Discharged-in-S set — NOT re-folded (recorded for zero-drop)

`srgbToLinear` decode · vue-router 4→5 · parse-that `^1.0.0` re-pin / `color2Into` / D8-1 · R-6
ICtCp (+Q9 Jzazbz) · R-4 raytrace N-gamut · K-W3DIFF PaletteDiff (alt-exit) — all DISCHARGED at
S, not re-folded into T, not re-verified here (S's record is closed history).

---

## §H — Close re-verification stamp (2026-07-12, re-probe against the live world at T-close)

A close verifies the deployed lineage, never assumes it: the §A–§F probes above were **re-run at
the close seam** (value.js HEAD `71af4c9`). **Every probe HOLDS; zero disposition changes.**

| Re-probe | Result | vs the §-record above |
|---|---|---|
| `git -C ../glass-ui tag --list 'v5*'` | **(empty)** · `describe`→`v4.2.0` | **UNCHANGED — TRIGGER-NOT-FIRED** (§B) |
| glass-ui registry `dist-tags.latest` | **`4.2.0`** (tail `…4.0.1, 4.1.0, 4.2.0`; **no v5**) | UNCHANGED (§B) |
| `curl api.color.babb.dev/health` | **200** `commit:"0441aba…"`, `mongo:"ok"`, uptime `245296` | **X1 HOLDS** — same `0441aba` deploy, no restart (§A) |
| `curl deploy.babb.dev/hooks/value.js` | **200** `"Hook rules were not satisfied."` | X1 webhook HOLDS (§A) |
| `curl -I mbabb.fi.ncsu.edu/colors/` | **301** `Location: https://color.babb.dev/` | **X2 HOLDS** (§A) |
| `useMarkdownColors.ts:1` `useGlobalDark` import + `:18` singleton use | present; the 2 `useDark` hits = past-tense comments (`:16`/`:76`) | dup-`useDark` DISCHARGED HOLDS (§E) |
| `atomDiff` in `api/…/service/forks.ts` | **empty** (excised) | TA-4 DISCHARGED HOLDS (§E) |
| `package.json` `test:dist` | build + the **5** retained proof gates | `proof:*` Q13 split HOLDS (§E) |
| `e2e/smoke/oracles/` | present (`o10-type-locks`, `o11-header-gates`, …) | oracle-floor HOLDS (§E) |
| `usePaletteStore.ts:8` `version` | **1** (no bump) | DORMANT HOLDS (§E) |
| `src/easing.ts:517` `resolveEasing` host | present | kf `resolveEasing` courtesy host HOLDS (§D.2) |

**The three immaterial live-flux deltas (both figures on the record, no silent reconciliation — S
lesson 4):**
1. glass-ui HEAD advanced `690fef91` → **`910dfffd`** (`tranche/BI`, "BI B0 encap-redrain"); still
   5.0.0-**IN-DEV**, v5 tag STILL empty, registry latest STILL `4.2.0` — **trigger-not-fired
   unchanged** (this is exactly the "sibling trees are in active flux" the header stamps flagged).
2. keyframes HEAD advanced `b1ca5ee9` → **`3e3ebc67`** (`tranche-u-impl`, 5.2.0) — kf-side, PRM-
   expand + `resolveEasing` dispositions **unchanged** (§C / §D.2).
3. X1 `/health` uptime `242382` → **`245296`** (+~48 min, **no restart** — same `0441aba`
   artifact) — X1 stability **re-confirmed**, not a re-deploy.

**Verdict: the committed record (`7d2d38b`) is faithful to the live world at close.** Every T.md
§7.1 inherited + §7.2 minted book is re-probed, dated, and routed (HAND-TO-U vs RETIRE, §G). No
book silently discharged; no fired-but-unnoticed trigger crosses value.js's consume-edge.

---

## §Method note (probe-parsimony)

Static-first per the owner's PROBE-PARSIMONY law: the X1/X2/webhook curls (5 read-only GETs, no
`:9000` touch); the sibling-tree probes are `git`/`node -e require(pkg)` reads (READ-ONLY, no
sibling write); the CSS spec-status re-verify is 3 compact web searches (the S-era live probes
were 2026-07-06, 6 days prior — a Baseline transition, requiring ~30 months cross-browser
stability, cannot occur in that window, so the drifts found are the honest deltas, not stale
carry). value.js's own consume surfaces confirmed by `grep` over `src/`. No `src/`/`demo/`/`api/`
patched (a close never silently patches — the two demo-caps files route to the repo-sweeps lane).
