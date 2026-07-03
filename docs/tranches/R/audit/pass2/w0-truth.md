# w0-truth — Pass-2 lane, R.W0 sweep-inventory re-verification

**AMENDED-AT-PASS-3** (2026-07-02, lane L3-doc-sweeps, discharging PASS2-VERDICT §3 M7 / CRIT-w0-truth.md mustFix 1): line 31's per-file attribution corrected — `sequence-C_DCiOIQ.js` imports only `@mkbabb/value.js/math`, not both value.js specifiers. Conclusion (KEEP the keyframes devDep) unchanged.

**Lane:** w0-truth (seed 10) · **Pass:** 2 · **Date:** 2026-07-02 · **Branch:** `tranche-q` @ `e80b359` (1.2.0)
**Method:** every row re-verified against the LIVE tree (git, working tree, `package.json`, installed `node_modules/@mkbabb/{glass-ui,keyframes.js}`, npm registry) — 3 weeks past R1-ASBUILT's inventory. Amends R1-ASBUILT §b + SYNTHESIS §3.1 (R.W0) + PASS1-VERDICT §5-P1#6.

---

## §0 — Verdict in one paragraph

The R.W0 inventory is **substantially accurate but drifted in five places**, all corrected below. The load-bearing correction is part (a): the `@mkbabb/keyframes.js` devDep is **NOT a phantom to delete** (N.W9′'s premise is refuted) — it is the demo build's **provision of glass-ui's `keyframes.js` peerDependency `^5.0.0`**, and keyframes is a live transitive consumer of value.js's own `/math` subpath. **KEEP it.** Four smaller drifts: CONTRIBUTING/VENDOR present as **unstaged** worktree deletions (not "staged"); the two frontend-design file sizes are **swapped** in R1-ASBUILT; the 80-PNG w6 shots corpus is **gitignored** (`*.png`) so it needs zero W0 action; and the **P/Q close-record dirs do not exist** (only `N/` and `O/` do; N has no FINAL.md). The retro-tag count is confirmed **10, not 7**, with all ten publish commits pinned.

---

## (a) The `@mkbabb/keyframes.js` devDep — verify-then-disposition (part-a deliverable)

### The import chain (traced, LIVE)

```
demo/color-picker/App.vue  →  @mkbabb/glass-ui/{aurora, goo-blob, dock ×16, motion, tabs, …}
   glass-ui dist entrypoints {dock,deck,drawer,motion,motion-curves, useSpring,
   useAnimatedNumber, useDragMorph, useDockCtaReceive, uniformBridgeWGPU}.js
        →  import "@mkbabb/keyframes.js"
   keyframes.js dist/sequence-C_DCiOIQ.js
        →  import { clamp, lerpArray, scale } from "@mkbabb/value.js/math"
   keyframes.js dist/{animation,compile,delegation,easing-registry,engine,
   format,grammar,group,morph-svg,parse-flatten,presets,validate}-*.js
        →  import … from "@mkbabb/value.js"          [pass-3: moved off sequence-C_DCiOIQ.js]
```

Evidence:
- `demo/color-picker/App.vue:112` imports `@mkbabb/glass-ui/aurora`; `:115` imports `/goo-blob`; demo consumes `/dock` 16× + `/motion`/`/tabs` (grep over `demo/`).
- glass-ui dist entrypoints that `import "@mkbabb/keyframes.js"`: `dock.js, deck.js, drawer.js, motion.js, motion-curves.js, useSpring-*.js, useAnimatedNumber-*.js, useDragMorph-*.js, useDockCtaReceive-*.js, uniformBridgeWGPU-*.js` (grep `node_modules/@mkbabb/glass-ui/dist/*.js`).
- keyframes.js dist `sequence-C_DCiOIQ.js` imports **only** `@mkbabb/value.js/math` (verified this pass, both the direct `dist/sequence-C_DCiOIQ.js:1` line and a per-file recount: 0 bare-specifier hits, 1 `/math` hit). **[pass-3 correction]** the earlier "imports both" wording mis-attributed the bare `@mkbabb/value.js` specifier to this file; it in fact appears only in *other* keyframes dist chunks (`animation-BGyzfzBq.js`, `compile-CcSUwM8R.js`, `delegation-DWwr4IXr.js`, `easing-registry-DHV2-5gA.js`, `engine-DEVgCTUy.js`, `format-C-Gi9r7L.js`, `grammar-BLucehC4.js`, `group-vJcsHKN9.js`, `morph-svg-BToeumw5.js`, `parse-flatten-ZZUSEQEL.js`, `presets-BG2Fczzq.js`, `validate-DDeGnvSt.js` — 12 files, one bare import apiece, duplicated identically in the nested `glass-ui/node_modules/@mkbabb/keyframes.js` copy). CRIT-w0-truth.md:34 recorded the dist-wide aggregate as **48** bare `@mkbabb/value.js` + 1 `/math` at its own audit time; this pass's live recount of the two copies installed in the current tree finds 12 per copy (24 across both) — a count drift against the critic's figure, not against the conclusion. Either way the two specifiers (bare + `/math`) are the *only* value.js specifiers keyframes emits, `/math` lives exclusively in `sequence-C_DCiOIQ.js`, and the KEEP disposition is unaffected by which chunk carries which specifier.
- **No direct importer**: `grep "@mkbabb/keyframes" demo/ src/` = **0**. Nothing in value.js's own source touches keyframes.

### The peer-dependency fact (the disposition pivot)

`../glass-ui/package.json` declares:
```
peerDependencies: { "@mkbabb/keyframes.js": "^5.0.0" }
devDependencies:  { "@mkbabb/keyframes.js": "^5.1.0" }
```
glass-ui **peer-requires** keyframes `^5.0.0`. A peer dependency is satisfied by the **consumer**, not auto-installed. value.js's top-level `@mkbabb/keyframes.js: file:../keyframes.js` (package.json:128, symlink → `../../../keyframes.js`, resolves 5.1.0) is exactly that provision for the demo build graph. glass-ui also carries its own **nested** `node_modules/@mkbabb/keyframes.js` (its devDep copy), which is what the boot error trace happened to resolve — but relying on a producer's nested devDep is luck, not contract; the peer is meant to be provided top-level.

### Disposition — KEEP (refutes N.W9′ "phantom devDep")

**VERDICT: keep `@mkbabb/keyframes.js: file:../keyframes.js`. It is non-inert.** N.W9′ / R1-ASBUILT constellation-note called it a "phantom devDep to delete"; that premise is **refuted**. It looks phantom only because value.js the *library* never imports it — but value.js's `package.json` is also the *demo build manifest*, and the demo consumes glass-ui, which peer-requires keyframes, which consumes value.js's own `/math` surface. Deleting it would (i) violate glass-ui's `^5.0.0` peer contract and (ii) leave the demo graph depending on glass-ui's nested devDep by accident — which evaporates the moment glass-ui is consumed as a packed tarball.

### Verify-then-disposition wording for R.W0 / R.W2

> **R.W0 — keyframes devDep (KEEP, record):** VERIFIED non-phantom. (i) No direct import in `src/` or `demo/` (grep=0). (ii) glass-ui declares `@mkbabb/keyframes.js` as **peerDependency `^5.0.0`**; the demo consumes glass-ui `/dock`(×16)`/motion``/aurora``/goo-blob` whose dist imports `@mkbabb/keyframes.js` — the top-level devDep is the demo build's provision of that peer. (iii) keyframes.js dist imports `@mkbabb/value.js/math` (`clamp`/`lerpArray`/`scale`) + `@mkbabb/value.js` — keyframes is a **live transitive consumer of value.js's `/math` externalization surface**. **Do NOT delete.** Record it deliberately under the §3.4 `file:`-dep pin policy (same rationale as `file:../glass-ui`).

> **R.W2 — the coupling (boot cure + `/math` contract):** because keyframes imports the **subpath** `@mkbabb/value.js/math`, the current object-form prefix alias (`vite.config.ts:50`, unfixed on `tranche-q`) mangles it to `dist/value.js/math` → "Not a directory" (proto-boot-cascade §1). The boot cure (array-form regex alias mirroring the exports map) lands here and is the direct consequence of keyframes being live. Add a RELEASE.md doc line (KF-4): **`/math` is a load-bearing externalization leaf keyframes consumes — it must never break, and non-npm hosts must map it.**

---

## (b) Re-verification of every other R.W0-slated item

### b.1 The two frontend-design treatments — SALVAGE + COMMIT (confirmed; sizes corrected)

- `docs/frontend-design/` is **untracked** (`?? docs/frontend-design/` in porcelain).
- Two files, both mtime **Jun 17 00:18**: `color-picker.md` = **25,113 B (~25 KB)**, `hero-lab.md` = **32,228 B (~32 KB)**.
- **DRIFT CORRECTION:** R1-ASBUILT §b (Session 2) lists these swapped — "`hero-lab.md` (25 KB), `color-picker.md` (32 KB)." Live truth: color-picker is the 25 KB file, hero-lab the 32 KB file. (SYNTHESIS §2.1/§3 treat color-picker.md as the R.W3 spec regardless — no downstream impact, but the byte tags are backwards.)
- **Disposition:** SALVAGE + COMMIT (at-risk untracked design seed for R.W3/W5). **Gate:** both tracked.

### b.2 `.w6a-audit*.mjs` + `mix-1440-snapshot.md` + dataurls + `$OUT` — DISCARD (with the reconciled w6a tension)

Working-tree scratch, all untracked (`??`):
| file | size | disposition |
|---|---|---|
| `.w6a-audit.mjs` | 8,220 B | DISCARD |
| `.w6a-audit2.mjs` | 6,150 B | DISCARD |
| `.w6a-audit3.mjs` | 2,399 B | DISCARD |
| `.w6a-audit4.mjs` | 2,146 B | DISCARD |
| `.w6a-audit5.mjs` | 2,620 B | DISCARD |
| `mix-1440-snapshot.md` | 2,197 B | DISCARD (raw a11y snapshot; findings canonized in LEDGER) |
| `shot3-dataurl.txt` | 11,548 B | DISCARD (base64 PNG frame scratch) |
| `suffuse-dataurl.txt` | 13,380 B | DISCARD |
| `$OUT` | 66,726 B | DISCARD (botched `> $OUT` redirect, 2026-06-03 glass-ui deep-dive dump; superseded, lives on branch `docs/constellation-grand-audit-2026-06-03`) |

**The reconciled tension (PASS1-VERDICT §2.6 vs "discard"):** `.w6a-audit.mjs` is a Playwright **probe script** (it injects a `SHIM` at `:8-14` to *simulate* the desktop dual-pane the broken cascade annihilates). PASS1-VERDICT §2.6 / proto-boot-cascade §2 call **the SHIM mechanism** load-bearing for the 1440 defect — but "load-bearing" means the *knowledge* the SHIM encodes (that a `display:flex !important` override is the only thing rendering the panes at 1440) is the falsifiable oracle, **not that this scratch `.mjs` file must live in the tree**. Reconciliation:
- The 1440 defect and its cure are already **fully canonized**: proto-boot-cascade §2/§3 (mechanism pinned to `glass-ui/dist/styles/index.css:258` unlayered `components.css`), the `CURED-1440.png` proof, and the LEDGER U11 row. The knowledge is preserved independent of the file.
- SYNTHESIS §3.1 R.W3 gate ("re-run w6a-equivalent probes as the falsifiable before/after oracle") means R.W3 **re-authors** an equivalent probe against the *cured* substrate — it does not resurrect these five throwaway scripts.
- Therefore: **DISCARD the scratch files** but **preserve the probe technique** by (i) folding the SHIM-equivalence oracle into the R.W2/R.W3 gate wording (proto-boot-cascade already did), and (ii) noting in the R.W2 gate that the "renders without the w6a shim" bar is **blocked on the glass-ui D8-1 relay** (external — see §b.7). The `.w6a` shim stays load-bearing *as a documented oracle*, never as tracked source. No contradiction.

**Gate:** clean `git status`; the five `.w6a` + snapshot + dataurls + `$OUT` gone; the SHIM-oracle wording present in R.W2/R.W3 gates.

**Bonus (mint the .gitignore class):** SYNTHESIS §3.1 asks for a `.gitignore` class for probe scratch. Current `.gitignore` already ignores `*.png` (line 17, `!demo/**/*.png` exception) — which is why the 80-PNG w6 corpus never appears in status (see b.6). Add a probe-scratch class (e.g. `/.w6a-audit*.mjs`, `/*-dataurl.txt`, `/$OUT`, `/mix-*-snapshot.md`) so future probe deposits self-ignore.

### b.3 CONTRIBUTING.md / VENDOR-POLICY.md — COMMIT THE DELETION (state corrected: unstaged, not staged)

- Porcelain: ` D CONTRIBUTING.md`, ` D VENDOR-POLICY.md` → **worktree (unstaged) deletions**. `git ls-files -s` shows both still in the index (blobs `4ad5906`, `cd5896d`, stage 0); `git diff --cached --stat` = empty.
- **DRIFT CORRECTION:** R1-ASBUILT §b (Session 3) + SYNTHESIS §3.1 call these "staged deletions (`D` in index)." Porcelain says **unstaged** — tracked-in-index, deleted-in-worktree. (The system-prompt snapshot showed `D CONTRIBUTING.md` staged + ` D VENDOR-POLICY.md` unstaged — a transient index state; current authoritative porcelain is both unstaged.) **Disposition is identical regardless of stage state.**
- These are the tail of the **2026-06-02 proof-idiom purge** (MEMORY `feedback-proof-idiom-retired`; last content commit `d8bc2b7`). **Disposition:** `git rm CONTRIBUTING.md VENDOR-POLICY.md && commit` — align with the standing user decision. **Gate:** both gone from HEAD; index clean.

### b.4 `docs/precepts` submodule — RESOLVE INSIDE THE SUBMODULE

- Porcelain ` m docs/precepts` (modified content). Submodule pinned at `63240e6` (`heads/main-26-g63240e6`; parent gitlink unchanged).
- Inside the submodule: two **uncommitted** edits — `M instructions/LESSONS-LEARNED.md`, `M instructions/tranche/SPEC.md`. Submodule HEAD `63240e6` = "infra: promote tls/blob-backend-dr/deploy + new domains precept (fourier D.W2)".
- **Disposition:** investigate + commit **inside** `docs/precepts` (its own history), or discard if stray — never dangle across a tranche close. Not value.js source. **Gate:** ` m docs/precepts` cleared (either the submodule commits + parent gitlink bumps, or the edits are reverted).

### b.5 Retro-tags — CONFIRMED **10, not 7** (all publish commits pinned)

Registry (`npm view @mkbabb/value.js versions`) vs local `git tag`:
- **Pre-modernization carve-out:** registry `0.1.0 … 0.5.1` = **11 versions**, all under the single `pre-modernization` tag. (Registry has no 0.6.0–0.9.0; those exist only as git tags v0.6.0–v0.9.0, unpublished — irrelevant to the gap.)
- **Tagged + published:** v0.10.0, v0.11.0, v0.11.1 — tags match registry.
- **Already tagged (P/Q):** v1.1.0, v1.1.1, v1.2.0 exist (point to `tranche-q` commits `23d1a91`/`fd3c7ce`/`e80b359`). **Not part of the gap.**

**The gap = 10 published-but-untagged versions (0.11.2 → 1.0.2):**

| # | version | publish commit | subject |
|---|---|---|---|
| 1 | 0.11.2 | `0cb5dd2` | parseCSSValueUnit empty-input contract (kf Tranche I B1 dep) |
| 2 | 0.12.0 | `3f4f0ed` | N.W7 library wave (parse-that ^0.9 + parseCSSColor typing) |
| 3 | 0.13.0 | `9fce504` | N: kf-K grammar fold (N.W11.D sampleColorRamp + N.W11′ scroll-timeline) |
| 4 | 0.13.1 | `650a8cd` | O.W0: two P0 crashes + linear() stop-spacing |
| 5 | 0.14.0 | `9ae9df0` | O.W1+O.W2: subpath split (7 per-tier subpaths) |
| 6 | 0.15.0 | `1670c90` | O.W3+W4+W4b: grammar + zero-alloc |
| 7 | 0.16.0 | `0b0d9ee` | O.W5: semantic-idempotence + spring() supersede |
| 8 | 1.0.0 | `dd9beb5` | O.W6: SOTA perf — dispatch() table + byte scanners |
| 9 | 1.0.1 | `f1d9bab` | ValueUnit U default → string (cross-package instanceof) |
| 10 | 1.0.2 | `15b0382` | subpath chunks → dist/subpaths/ (units shadow fix) |

- Task-named spot-checks confirmed: **0.13.0 = `9fce504`, 1.0.1 = `f1d9bab`, 1.0.2 = `15b0382`** ✓.
- All 10 commits are reachable from `master` (HEAD `15b0382` = 1.0.2, back through O + N). P/Q tags already resolve on `tranche-q`.
- **PASS1-VERDICT §5-P1#6 confirmed:** "7 → 10; add v0.13.0, v1.0.1, v1.0.2." **Disposition:** annotated retro-tags at the exact publish commits; scope the W0 gate to **"tags == registry for ≥ v0.6.0"** with the pre-modernization carve-out (11 registry versions 0.1.0–0.5.1) recorded. **Gate:** `git tag` (post-mint) == registry list for ≥ v0.6.0.

### b.6 (new) w6 shots corpus — NO W0 ACTION (gitignored)

- `docs/tranches/N/audit/impl/shots/w6/` = **80 PNGs** on disk; `git ls-files` = 0 (untracked); **ignored** by `.gitignore:17 *.png` (`git check-ignore -v` → `.gitignore:17:*.png`). Never surfaces in `git status`.
- R1-ASBUILT §b guessed "likely gitignored" and said 82 PNGs — **confirmed gitignored, count is 80.** **Disposition:** none required — persists on disk as salvageable N.W10–W17 visual baseline; the `*.png` ignore already keeps it out of commits. **Gate:** n/a.

### b.7 (carried caution) R.W2 dual-pane gate — EXTERNAL dependency

Not strictly a W0 tree item, but it re-scopes the W0→W2 handoff: proto-boot-cascade §3.3 + PASS1-VERDICT §2.6 prove the 1440 cascade cure is a **glass-ui producer fix** (`src/styles/index.css` → `@import "./components.css" layer(components);`), not value.js work. R.W2's "renders at 1440 without the w6a shim" gate is **blocked on the glass-ui D8-1 relay**. W0 discards the `.w6a` scratch (b.2); the *cure* is a booked/relayed glass-ui item, and the SHIM-oracle knowledge stays alive in the gate wording.

### b.8 (carried) master-merge posture — 3 commits deep, plus P/Q-tags-ahead-of-master

- `git rev-list --count master..tranche-q` = **3**: `23d1a91` (P 1.1.0), `fd3c7ce` (Q 1.1.1), `e80b359` (Q 1.2.0).
- `master` HEAD = `15b0382` (1.0.2); carries O through 1.0.2. P + Q live only on `tranche-q`.
- **Nuance:** the v1.1.0/v1.1.1/v1.2.0 **tags already exist** and point at unmerged `tranche-q` commits — so master's history does not yet contain the commits its released tags reference. Merging `tranche-q → master` heals both the 3-commit debt and this tag/branch skew in one move.
- **Disposition:** merge `tranche-q → master` at R.W0. **Gate:** `master` carries 1.2.0; all tags (including the 10 retro-tags) resolve on master's first-parent history.

### b.9 (carried) O/P/Q close records + N/FINAL.md

- **DRIFT / CRIT-SPEC #18 confirmed:** `docs/tranches/P` and `docs/tranches/Q` **do not exist** (only `N/` and `O/`). O has `O.md`, `PROGRESS.md`, `waves/`. `docs/tranches/N/FINAL.md` **absent**.
- SYNTHESIS §3.1 says "author the lean P/Q close records (empty dirs today)" — the dirs are **not empty, they are absent**. Use the corrected phrasing. **Disposition:** author lean `P/FINAL.md`, `Q/FINAL.md`, and `N/FINAL.md` (a fold-forward pointer to R, dropping the obsolete v1.0.0 framing). **Gate:** the three records exist and are lean.

---

## §c — FINAL R.W0 work-order table (item → verify-step → disposition → gate)

| # | Item | Verify-step (done, live) | Disposition | Gate |
|---|---|---|---|---|
| W0-1 | frontend-design treatments | `?? docs/frontend-design/`; color-picker.md 25 KB, hero-lab.md 32 KB (sizes **swapped** in R1-ASBUILT) | **SALVAGE + COMMIT** (R.W3/W5 seed) | both tracked |
| W0-2 | `.w6a-audit{,.2..5}.mjs` | 5 untracked probe scripts; SHIM at `:8-14` | **DISCARD**; preserve SHIM *oracle* in R.W2/W3 gate wording (not the files) | files gone; oracle wording present |
| W0-3 | `mix-1440-snapshot.md` + `shot3/suffuse-dataurl.txt` | 3 untracked scratch (a11y snapshot + base64 PNGs) | **DISCARD** (findings in LEDGER) | gone |
| W0-4 | `$OUT` | 66 KB botched `> $OUT` redirect (2026-06-03 dump) | **DISCARD** (superseded; on grand-audit branch) | gone |
| W0-5 | `.gitignore` probe class | `*.png` already ignores w6 corpus | **MINT** probe-scratch class (`.w6a-audit*.mjs`, `*-dataurl.txt`, `$OUT`, `mix-*-snapshot.md`) | class present; scratch self-ignores |
| W0-6 | CONTRIBUTING.md / VENDOR-POLICY.md | ` D` **unstaged** (not staged); in index, deleted in worktree; proof-purge tail | **`git rm` + COMMIT** the deletion | gone from HEAD; index clean |
| W0-7 | `docs/precepts` submodule | ` m`; HEAD `63240e6`; 2 uncommitted edits (LESSONS-LEARNED.md, tranche/SPEC.md) inside | **RESOLVE INSIDE submodule** (commit or revert); bump gitlink if committed | ` m docs/precepts` cleared |
| W0-8 | keyframes devDep (part a) | glass-ui peer `^5.0.0`; demo→glass-ui→keyframes→value.js/math; grep direct=0 | **KEEP** (non-phantom; refutes N.W9′); record per §3.4 pin policy | devDep retained + recorded; RELEASE.md `/math` line (KF-4) |
| W0-9 | Retro-tags | **10** untagged published (0.11.2→1.0.2); commits pinned (table b.5); P/Q already tagged; pre-mod carve-out 11 versions | **ANNOTATED retro-tags ×10** at publish commits | `git tag` == registry for ≥ v0.6.0 |
| W0-10 | master-merge | `master..tranche-q` = 3 (`23d1a91`/`fd3c7ce`/`e80b359`); P/Q tags point at unmerged commits | **MERGE `tranche-q → master`** | master carries 1.2.0; all tags resolve on master |
| W0-11 | P/Q/N close records | `docs/tranches/{P,Q}` **absent** (not empty); no `N/FINAL.md` | **AUTHOR** lean P/FINAL, Q/FINAL, N/FINAL (fold-forward to R) | three records exist, lean |
| W0-12 | doc-truth pass | CLAUDE.md parse-that `^0.7.0` (Deps §) — registry is `^0.13.0` | **AMEND** CLAUDE.md + RELEASE.md `/math` line | docs spot-check true |
| W0-13 | w6 shots corpus (info) | 80 PNGs, `*.png`-ignored | **NO ACTION** (salvageable evidence, already ignored) | n/a |

**W0 close gate (composite):** clean `git status`; `master` carries 1.2.0; `git tag` == registry (≥ v0.6.0); the 10 retro-tags + P/Q + N records land; keyframes devDep KEPT + recorded; docs spot-check true.

---

## §d — Drift corrections summary (what moved / was wrong since R1-ASBUILT)

1. **keyframes devDep = KEEP, not delete** (part a) — glass-ui peer-requires it; live `/math` consumer. N.W9′ "phantom" premise refuted.
2. **CONTRIBUTING/VENDOR are unstaged** worktree deletions, not "staged" (R1-ASBUILT §b / SYNTHESIS §3.1). Disposition unchanged.
3. **frontend-design sizes swapped** in R1-ASBUILT: color-picker.md = 25 KB, hero-lab.md = 32 KB.
4. **P/Q dirs do not exist** (R1/SYNTHESIS imply "empty dirs"); only `N/` + `O/` exist; no `N/FINAL.md`. (CRIT-SPEC #18.)
5. **w6 shots = 80 PNGs, gitignored** by `*.png` (R1 guessed "likely gitignored," said 82) — confirmed, no W0 action.
6. **Retro-tags = 10** (0.11.2→1.0.2), all commits pinned (confirms PASS1-VERDICT §5-P1#6 over SYNTHESIS §3.1's stale "7").
7. **w6a scratch tension reconciled:** discard the files; the SHIM stays load-bearing as a *documented oracle* in the R.W2/R.W3 gate, and the 1440 *cure* is a glass-ui D8-1 relay (external to R.W2).
