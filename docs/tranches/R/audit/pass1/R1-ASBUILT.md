# R1-ASBUILT — value.js as-built truth, tranche N → Q

**Lane:** R1-ASBUILT · **Pass:** 1 · **Date:** 2026-07-02 · **Repo:** `/Users/mkbabb/Programming/value.js`
**Method:** every verdict verified against the LIVE tree (git log, working tree, `src/`, `demo/`, `package.json`, installed `node_modules/@mkbabb/glass-ui`) — not against the doc board.

---

## TL;DR (the three load-bearing truths)

1. **The library shipped; the demo/design block did NOT.** Tranches O, P, Q are **library-only** — every commit since N-close (`9fce504`) touches `src/`, `package.json`, or docs, and **zero** touch `demo/`. The last `demo/` commit is `199fd15` (2026-06-12, N.W5 remediation), *before* the N.W8–W18 block was even written. `docs/tranches/O/PROGRESS.md:5-8` states it plainly: "N demo/design block (N.W10–N.W18): RATIFIED, not yet implemented."
2. **The two N *library* sub-waves DID land** — N.W11 (color-SOTA) + N.W11′ (scroll-grammar) + N.W11.D (sampleColorRamp) all shipped at **0.13.0** in commit `9fce504`, one beat before O opened. These are the only members of the `N.W10..N.W18` list that landed.
3. **The close/consume waves (W8′/W9′/W18) are structurally impossible as-written and now STALE.** The v1.0.0 cut happened via **O.W6** (`dd9beb5`), *not* N.W9′; the glass-ui pin is still `file:../glass-ui` (W18/W9′ never discharged it); the phantom `@mkbabb/keyframes.js` devDep W9′ meant to delete is still present; `tranche-q` is **not merged to master**; and W18's pin target ("glass-ui BA cut 4.0.0") is stale — **glass-ui 4.2.0 is installed** and the sibling is now at BG/BH toward 5.0.0.

---

## (a) Per-wave verdict table

Legend: **LANDED** (shipped, verified) · **UNTOUCHED** (spec never implemented, tree unchanged) · **STALE/WRONG** (spec's premise or targets superseded by the moved constellation) · **SUPERSEDED** (goal met by a *different* mechanism).

| Wave | Kind | Verdict | Evidence (file:line / commit) |
|------|------|---------|-------------------------------|
| **N.W11** color-SOTA gamut re-anchor + §13.2 oracle + wide-gamut egress | library | **LANDED** (0.13.0) | Shipped in `9fce504` ("feat(N): 0.13.0"); `src/units/color/mix.ts` +105 in that commit; gamut work in `src/units/color/gamut.ts`. Superseded further by P (`color2Into` zero-alloc, `23d1a91`) + O.W3 (`0118ae1`). |
| **N.W11′** scroll-grammar `CSSTimelineOptions` extractor + inverse serializer | library | **LANDED** (0.13.0) | `src/parsing/scroll-timeline.ts` **exists, 667 lines** (spec asked for exactly this new module); `test/scroll-timeline.test.ts` (350 lines). Shipped in `9fce504` (+569 LoC at cut). |
| **N.W11.D** `sampleColorRamp` perceptual ramp fold | library | **LANDED** (0.13.0) | `sampleColorRamp` present in `src/index.ts`, `src/units/color/mix.ts`, `src/subpaths/color.ts`; `test/color-ramp.test.ts` (197 lines). Shipped in `9fce504`. |
| **N.W10** functional-truth + substrate-kill (desktop dual-pane renders; save-P0; kC-placebo; single goo-blob; cascade kill) | demo | **UNTOUCHED** | No `demo/` commit since `199fd15` (2026-06-12). The `style.css` cascade-annihilation, save-with-backend-down data loss, kC placebo, and dual-mount goo-blob are all still the state the `.w6a-audit*.mjs` probes captured (they inject a `SHIM` to *simulate* the desktop layout the wave was to fix — `.w6a-audit.mjs:8-14`). |
| **N.W12** grand hierarchy (Fraunces root · accent axis · dark ladder · container-query layout · depth grammar · φ ramp) | demo | **UNTOUCHED** | No `demo/` commit since N.W5. Font-root/accent-axis/layout keystone unimplemented; the two `docs/frontend-design/*.md` treatments (Jun 17, untracked) are *design specs for this same surface*, not implementations. |
| **N.W13** controls (spectrum slider · centered letters · painting focus ring · a11y) | demo | **UNTOUCHED** | `ComponentSliders.vue` is **still 418 LoC** (spec gate: ≤400) and still carries the **raw-reka `SliderRoot` fork** (`:59,106,122`) the wave meant to delete onto the glass-ui `spectrum` primitive. `[data-size]` interim absent. |
| **N.W14** cards + skeletons + empty states (PaletteCard `material=` axis) | demo | **UNTOUCHED** | `material=`/`material:` variant **not found** in any `PaletteCard.vue`. Skeleton-as-file, watercolor-ghost phantom all unchanged. |
| **N.W15** perf (idle-floor kill · reflows · reactivity fan-out · dock-morph-truth born-RED) | demo | **UNTOUCHED** | No `demo/` commit; the zombie goo-blob canvas + eager aurora surface the wave targets are exactly what the `.w6a-audit*.mjs` session measured, uncorrected. Lane D was born-RED gated on glass-ui A-1 (never consumed). |
| **N.W16** per-pane (picker hero · gradient/easing motif · mix inv-N-9 · extract hero · router 4→5) | demo | **UNTOUCHED** | No `demo/` commit. `vue-router` is `^4.6.4` in `package.json:139` — the 4→5 carry never happened (and vue-router 5 targeting is now a moving constellation item). |
| **N.W17** shell + motion + pops (dock scale · 12→3 transition families · view-select moment · icon energy) | demo | **UNTOUCHED** | No `demo/` commit; the 12 demo-authored `*-enter-active` families still un-consolidated. |
| **N.W18** cross-repo consume-at-pin: glass-ui **BA-cut 4.0.0** re-pin + abrogation sweep + interim-death + easing-configurator consume | cross-repo close | **STALE/WRONG** | Two independent breaks: (1) `package.json:127` is still `"@mkbabb/glass-ui": "file:../glass-ui"` — the pin was **never discharged**. (2) The **pin TARGET is stale**: spec names "BA cut 4.0.0"; installed `node_modules/@mkbabb/glass-ui` is **4.2.0**, and glass-ui is now at BG/BH toward **5.0.0** (constellation state). Every R3 interim this wave was to delete was never authored (waves W13–W17 are UNTOUCHED), so there is nothing to consume against. |
| **N.W8′** hygiene + master-merge + wire-deploy + doc-truth (13-file dirty-tree sweep) | close-ceremony | **UNTOUCHED / STALE** | `tranche-q` is **not merged to master** (`git branch --merged master` omits it; `master..tranche-q` = 3 commits, master HEAD `15b0382` = value.js 1.0.2). The "13-file dirty-tree sweep" premise is stale — the dirty tree has *moved* (new untracked `.w6a-audit*.mjs`, `docs/frontend-design/`, etc. — see §b). The retro-tag/wire-deploy ceremony was designed around a pre-O tree. |
| **N.W9′** v1.0.0 close: registry-pin discharge + phantom-keyframes-devDep excision + π lane + FINAL.md | close | **SUPERSEDED (by O.W6) + partially STALE** | **v1.0.0 already shipped** — via `dd9beb5` "feat(O.W6): SOTA perf … → value.js 1.0.0", not N.W9′. Current version **1.2.0**. But the two hygiene items W9′ owned are **still undone**: glass-ui pin still `file:` (`package.json:127`), and the phantom `@mkbabb/keyframes.js` devDep is **still present** (`package.json:128` — no `node_modules/@mkbabb/keyframes.js` package it declaratively needs; it's a symlink to the sibling). No `docs/tranches/N/FINAL.md` was ever authored. |

**Roll-up:** 3 LANDED (all library: W11, W11′, W11.D) · 7 UNTOUCHED (all demo: W10, W12–W17) · W18 STALE/WRONG · W8′ UNTOUCHED+STALE · W9′ SUPERSEDED-by-O.W6 for the version cut but its hygiene tail is still open.

---

## (b) Uncommitted working-tree evidence inventory

Three distinct sessions deposited the dirty tree. Attribution by mtime + content:

### Session 1 — the 2026-06-12 W6.A per-pane Fable design audit (the "user audit 2026-06-12" / LEDGER U1–U33 source)
All mtimes Jun 12 ~04:xx. Playwright probes against a **local dev server at `http://localhost:9401`** (`.w6a-audit.mjs:5`).

| Artifact | What it is | Disposition |
|----------|-----------|-------------|
| `.w6a-audit.mjs` (8.2 KB) | Main W6.A probe: screenshots `picker-before`/`picker-desktop-restored-before`, then `page.evaluate` surface+typography probes of picker/about cards. Injects a `SHIM` stylesheet (`:8-14`) to *simulate* the desktop dual-pane the broken cascade annihilates — i.e. it documents the exact N.W10 defect. Writes into `docs/tranches/N/audit/impl/shots/w6/`. | **Discard** (ephemeral probe; its *findings* are already canonized in `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md` and the W6.A shots). It is throwaway scaffolding, not source. |
| `.w6a-audit2.mjs`..`.w6a-audit5.mjs` (6.1/2.4/2.1/2.6 KB) | Follow-on probes: mix-suffuse animation timing, canvas pixel capture, etc. | **Discard** (same rationale). |
| `mix-1440-snapshot.md` (2.2 KB) | Playwright accessibility-tree snapshot of the **Mix pane @1440** (nav rail refs, "Mix" heading, color-space/hue-method comboboxes, disabled Mix button). Probe scratch. | **Discard** (raw snapshot; no unique claim). |
| `shot3-dataurl.txt` (11.5 KB), `suffuse-dataurl.txt` (13.4 KB) | base64 `data:image/png` dumps — mix-suffuse animation frames captured by the probes. | **Discard** (ephemeral image scratch). |
| `docs/tranches/N/audit/impl/shots/w6/` (82 PNGs, ~84 MB) | The "before" screenshot corpus (`*-before.png` across picker/about/admin/browse/extract/gradient/mix/shell/palettes) + a few `*-devserve-broken.png` + `shell-desktop-patched-*` shim shots. **Untracked** (`git ls-files` = 0; likely gitignored — not in `git status`). | **Salvage-as-evidence** if any R-tranche design wave reopens; otherwise **archive**. These are the visual truth-baseline for N.W10–W17. Large; do not commit blindly. |

### Session 2 — the 2026-06-17 frontend-design treatments (post-N design specs)
| Artifact | What it is | Disposition |
|----------|-----------|-------------|
| `docs/frontend-design/hero-lab.md` (25 KB), `docs/frontend-design/color-picker.md` (32 KB) | Two `frontend-design`-skill design treatments — bold single-direction specs. `hero-lab.md` targets a `demo/hero-lab/` showcase; `color-picker.md` proposes the "gamut-boundary-as-living-contour over the kept HSL square" signature. **Verdict-bound refinements** of the taste-approved language (GLASS/PAPER/AUDACIOUS-TYPE/MATHEMATICS pillars). | **Salvage + commit.** These are genuine, high-value design artifacts (not scratch) and are the natural seed for any R-tranche demo/design wave — they supersede the raw N.W12/W16 prose with committed taste direction. Currently untracked and at risk. |

### Session 3 — pre-existing staged/submodule state (older, unrelated to N–Q impl)
| Artifact | What it is | Disposition |
|----------|-----------|-------------|
| `CONTRIBUTING.md`, `VENDOR-POLICY.md` — **staged deletions** (`D` in index) | Leftover from the **2026-06-02 "proof-idiom retired" purge** (MEMORY `feedback-proof-idiom-retired`: the user deleted CONTRIBUTING/VENDOR-POLICY/CHANGELOG/migrate/mongo-init/backup.sh as "overfit junk"). Last content commit `d8bc2b7`. Staged but never committed on `tranche-q`. | **Commit the deletion** — it aligns with a standing user decision; the staged `D` should not linger across tranche closes. |
| `docs/precepts` submodule — ` m` (modified content) | Submodule at `63240e6`; working tree carries **uncommitted edits**: `M instructions/LESSONS-LEARNED.md`, `M instructions/tranche/SPEC.md`. | **Investigate + commit inside the submodule** (or discard if stray). These are precept-doc edits that belong in the `docs/precepts` repo's own history, not dangling. Not value.js source. |
| `$OUT` (66.7 KB, Jun 3) | A **botched shell redirect** (literal filename `$OUT` — an unquoted `> $OUT` with the var unset). Content = the **constellation grand-audit DIVE-2 glass-ui deep-dive** (glass-ui 3.1.1, live `:5210`, 11 net-new a11y deepFindings on DataTable/Tabs/SortableList). | **Discard.** Superseded audit dump from 2026-06-03; its findings live on branch `docs/constellation-grand-audit-2026-06-03`. A stray redirect file. |

---

## (c) Branch topology

- **Current branch:** `tranche-q` · HEAD = `e80b359` (feat(Q · 1.2.0)).
- **master HEAD:** `15b0382` (fix(value.js 1.0.2): subpath chunks → dist/subpaths/).
- **`tranche-q` merged to master?** **NO.** `git branch --merged master` does not list it; `git rev-list --count master..tranche-q` = **3** unmerged commits:
  - `23d1a91` Tranche P (1.1.0)
  - `fd3c7ce` Q · 1.1.1 (VJ-Q1 contrast-color())
  - `e80b359` Q · 1.2.0 (VJ-Q2…Q9)
- **master's last three:** `15b0382` (1.0.2) ← `f1d9bab` (1.0.1) ← `dd9beb5` (O.W6 → 1.0.0). So **master carries O through 1.0.2; P and Q live only on `tranche-q`.** The N tranche branch itself merged into this lineage earlier (N commits `9fce504`…`4f48fca` are ancestors of both).
- **Remotes:** `origin/tranche-q` exists (pushed). `origin/master` = `15b0382` lineage. `origin/gh-pages` present.
- **Implication for N.W8′:** the master-merge ceremony N.W8′ specified never ran; P+Q (1.1.0/1.1.1/1.2.0) are published-to-registry but **git-unmerged to master** — the same "tags==registry, git-does-not" gap N.W8′ named, now three versions deeper.

---

## Constellation-drift notes (for the R planners)

- **glass-ui**: `package.json` still `file:../glass-ui`; **4.2.0 installed** (symlink resolves to sibling). N-era targeted "BA cut 4.0.0" — obsolete. Any re-pin must target 4.2.0+ (or the imminent 5.0.0), and the N.W18 abrogation sweep must be re-derived against BA→BH's actual retired set, not the 4.0.0 set.
- **keyframes.js**: `package.json:128` `"@mkbabb/keyframes.js": "file:../keyframes.js"` (symlink present). N.W9′ called this a "phantom devDep" to delete; it is still declared. Verify whether the demo actually imports it before deleting vs. discharging to a registry pin.
- **The N demo block is ~3 weeks stale against a moved constellation** — its file:line anchors (e.g. `ComponentSliders.vue:75-106`, `MixSourceSelector.vue:148`) still resolve because `demo/` is untouched, so the specs are *re-runnable in principle*, but every glass-ui interim/consume clause must be re-anchored to 4.2.0/5.0.0.
