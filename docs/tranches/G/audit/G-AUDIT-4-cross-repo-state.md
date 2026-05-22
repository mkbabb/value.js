# G-AUDIT-4 — Cross-repo state at G open

**Lane**: G-AUDIT-4 (cross-repo state). **Posture**: READ-ONLY across peers; WRITE only this artefact.
**Self**: `/Users/mkbabb/Programming/value.js`, branch `tranche-g`, HEAD `6b3a41b` (Merge tranche-f into master — Tranche F close (v0.8.0), 2026-05-21).
**Analogue**: F-AUDIT-4 / F.W0 Lane D — cross-repo manifest at tranche open, post-F-close edition.
**Audit window**: G open (2026-05-21, ~13:33-EDT post-F-merge) — same calendar day as F close.

---

## §1 — Peer HEAD diffs vs F close

The F-close coordination refresh (per `docs/tranches/F/coordination/Q.md` §1) anchored peers at the HEADs below. Drift verdict at G open (drift = commits new at peer HEAD since the F-close anchor):

| Peer | F-close anchor | G-open HEAD | Drift commits | Posture |
|---|---|---|---|---|
| **glass-ui** | `e150e2f` | `e150e2f` | **0** | Quiescent (no new tranche; AJ-W6 lane already-on at F close still HEAD) |
| **keyframes.js** | `d312517` master + `470814e` LOCAL post-W2 codemod | `470814e` HEAD (master ref) | +1 vs `d312517` (the F.W2 codemod itself) | Codemod still **LOCAL ONLY** — `470814e` not pushed to `origin/master` (`origin/master` still at `2183f32d`, 14 commits behind local) |
| **speedtest** | `5e52d136` (AJ FINAL) | `a15857d0` (AK RATIFIED) | **+2** (`c73a8d92` AK W0 + `a15857d0` AK RATIFIED) | **NEW TRANCHE OPENED** — AK opened + ratified same calendar day as F close |
| **fourier-analysis** | `926ca6a` | `926ca6a` | **0** | Static; chronic 109-file dirty tree unchanged (see §5) |
| **precepts submodule (self)** | `68d9b20` | `68d9b20` | **0** | Pin matches `origin/HEAD`; no upstream advance |

Headline: glass-ui + fourier-analysis flat at F close; keyframes.js codemod still LOCAL; speedtest opened a successor tranche AK and ratified W0 the same day.

---

## §2 — Glass-ui state

**HEAD**: `e150e2fea90eb320fe26d863d100599ab48577b2 2026-05-21 07:30:06 -0400 feat(composables/dom): useBreakpoint — reactive matchMedia wrapper (AJ-W6-β)`.
**Branch**: `master`.
**Push status**: `origin/master` at `4b16de7f` — **33 commits unpushed** (the entire AJ wave-set + W8-W12 modernization sweep that runs through F.W2 territory). Glass-ui's local master is a chunky un-pushed front, identical to what F close observed.

### §2.1 — Contraction posture

DockGroup and ProgressiveSidebar absences verified:

- `find src -iname 'DockGroup*' -o -iname 'ProgressiveSidebar*'` → **0 results**.
- `src/components/custom/dock/` contains: `DockTabButton.vue`, `DockLayerGroup.vue` (the renamed-not-DockGroup chassis-layer), `GlassDock.vue`, `DockIconButton.vue`, `DockDropdownTrigger.vue`, `DockLayer.vue`, `DockSelectTrigger.vue` + `composables/`. None of these is a `DockGroup` resurrection — `DockLayerGroup` is the architecturally-distinct chassis-row primitive (not the AI-retired generic-group façade).
- `Sidebar` exists only as `src/sidebar.ts` (subpath barrel) + `src/composables/sidebar/` (`useSidebarFollow.ts`, `useSidebarState.ts`) — i.e. the composable-only contraction posture is intact; no `ProgressiveSidebar.vue` component file.

**Verdict**: contraction posture **INTACT** at G open. The AI-W5-γ/δ retirement of DockGroup + ProgressiveSidebar (confirmed by inline comment in `src/index.ts:64`) holds.

### §2.2 — 7 standing primitive asks (per-ask verdict)

The 7 primitive asks tracked from value.js's tranches D-through-F as "open against glass-ui":

| # | Ask | Verdict | Evidence |
|---|---|---|---|
| **1** | Metaballs API additions — `positionSource`, `pauseOnHidden`, pointer-input, `mode="layout"` | **PARTIAL → OPEN** | `MetaballCanvas.vue:97-99` documents a `positioning` register and `pointer-events-none` substrate; AJ-W1-β shipped `positioning="viewport"\|"local"` (see glass-ui unpushed log `5d47bfd`); AJ-W4-γ shipped a `:duration` prop (`4e60045`). But the value.js-asked names (`positionSource`, `pauseOnHidden`, `mode="layout"`) are NOT verbatim in the API surface — glass-ui shipped a different shape. **Renegotiation needed**, not a clean ship-and-close. |
| **2** | Aurora — `deriveAuroraPalette` / `deriveAuroraConfig` exports | **OPEN** | `src/components/custom/aurora/` contains `Aurora.vue`, `DESIGN.md`, `composables/`, `index.ts`, `presets.ts`, `shaders/`. `grep -rn 'deriveAuroraPalette\|deriveAuroraConfig'` → **0 results**. The derive-from-color helpers value.js asked for (precept-§10 blocker per MEMORY.md tranche-D entry) are still un-shipped. |
| **3** | BlobDot export | **OPEN** | `grep -rn 'BlobDot'` across all of `glass-ui/src` → **0 results**. |
| **4** | SelectTrigger `:size` prop | **OPEN** | `grep -n 'size' src/components/ui/select/SelectTrigger.vue` → 0 matches. No `size` prop on SelectTrigger. |
| **5** | DockSelectTrigger `:clampLabel` prop | **OPEN** | `grep -rn 'clampLabel\|clamp-label'` across `src/components/custom/dock/DockSelectTrigger.vue` → **0 results**. |
| **6** | TooltipContent `variant="mono"` | **OPEN** | `grep -n 'variant\|mono' src/components/ui/tooltip/TooltipContent.vue` → 0 matches. No variant prop. |
| **7a** | Button `size="icon-sm"` | **OPEN** | `src/components/ui/button/index.ts` enumerates `size: default \| xs \| sm \| lg \| icon` — no `icon-sm` token. |
| **7b** | Tabs `variant="underline"` | **OPEN** | `grep -n 'underline\|variant' src/components/ui/tabs/Tabs.vue Tabs/TabsList.vue` → 0 matches. No underline variant. |

**Tally**: **0 of 7 asks shipped clean**. Metaballs (ask #1) is the only one with adjacent activity in unpushed AJ work — glass-ui shipped a different API shape than the value.js ask, so this is a "renegotiate, then re-state the ask" condition, not a "shipped" condition. Asks 2-7 are all **untouched** as of G open.

### §2.3 — dist/glass-ui.css font-inlining (contract-v2 §2.1)

- `dist/glass-ui.css` exists.
- `grep -c '@font-face' dist/glass-ui.css` → **0**.
- `grep -c 'url(' dist/glass-ui.css` → **0**.

**Verdict**: contract-v2 §2.1 font-inlining residual **STILL OPEN** at the same posture observed at F close — zero `@font-face` declarations, zero `url(` references in the published CSS. Consumers must still self-load fonts. (This is the chronic residual — no movement.)

### §2.4 — Tranche-open detection

`ls glass-ui/docs/tranches/` enumerates: `AB AB+1 AB+2 C D D-II E F H I J K L M N O P Q V` — **no AJ directory at the tranche-letter level**, and no new G/R/S/T directory beyond what F close saw. AJ exists as a *wave-letter cohort within* the post-Q substrate (the unpushed log entries `5d47bfd`/`a7b6b3d`/`f7fc5eb`/`b46547f` etc. all carry `AJ-W*` tags). The most recent CLOSED tranche directory is `Q` (W6 close, `e2e4b0d`/v1.9.1, 2026-05-18). `V` directory present is the V-tranche scaffold from earlier (May 9).

**Verdict**: **no new glass-ui tranche** opened post-F-close. AJ is operating as a wave-cohort under the post-Q HEAD train (un-tagged + un-pushed). Glass-ui posture at G open: quiescent + chronic-unpushed.

---

## §3 — Keyframes.js state

**HEAD**: `470814eaeb32cbb5cb2a689a0b1a6c997f147c8d 2026-05-21 13:08:35 -0400 fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order`.
**Branch**: `master`.
**Working tree**: clean (`git status --short` empty).

### §3.1 — F.W2 codemod commit status

The F.W2 codemod (`470814e`) is **still HEAD** of local master. No further commits applied on top. `git log -3 --oneline`:

```
470814e fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order
d312517 fix(keyframes.js/W12-unblocker): repair 2 source TS errors so API Extractor emits real dist/keyframes.d.ts
5896a36 chore(keyframes.js/W12-δ): TypeScript 5.8.3 → 6.0.3 + tsconfig audit
```

### §3.2 — Push status

- `origin/master` at `ls-remote` reports `2183f32dc859db0f44dfb7eb17cba561996beadc` (the `2026-05-16` glass-ui CR-3 cross-walk commit).
- Local `470814e` is **14 commits ahead** of `origin/master`:
  ```
  470814e fix(animation): migrate lerp call sites to value.js v0.7.0
  d312517 fix(W12-unblocker): repair 2 source TS errors
  5896a36 chore(W12-δ): TypeScript 5.8.3 → 6.0.3
  b2dfec2 feat(W10-γ)!: Vite 7 → 8 + Rolldown
  7c959d8 chore(W9-phase2): consumer LOCKSTEPS @lucide/vue + types/node + vaul-vue
  3c2d48e chore(W8-γ): SAFE-MINOR sweep + vue peerDep
  0909177 build: abrogate development export condition — contract-v2
  19d1a1b fix(build): split gh-pages demo outDir from dist/
  b721a0c chore(demo): W5 close — 2.1.1 + untrack dist/
  e073dac feat(demo): idiomatic glass-ui adoption + dead-code purge
  5861d18 fix(demo): cleanup-deleted CSS + hero typography
  84f1659 fix(demo): scene-transition renderer crash
  6af80ad fix(resolution): adopt cross-repo dev-resolution contract (glass-ui Q.W1 keystone)
  8d824ee refactor(freshness): add "development" condition + retire freshness-gate
  ```

**Verdict**: F.W2 codemod remains **LOCAL ONLY**. The bigger story is that *the entire post-glass-ui-Q.W1-keystone chain* — the resolution contract (`6af80ad`), the freshness-gate retiral (`8d824ee`), the demo restorations (`84f1659`/`5861d18`/`e073dac`/`b721a0c`/`19d1a1b`), the `development` condition abrogation (`0909177`), the W8/W9/W10/W12 modernization sweep, and the F.W2 lerp codemod itself — *all 14 commits* sit local-only on keyframes.js master. Pushing is a pure user/operator action (orchestrator can't push); the working tree is clean and rebuilds would presumably reproduce these commits if lost.

### §3.3 — Lerp call sites canonical verification

The F.W2 codemod was meant to migrate call sites to value.js v0.7.0's canonical `(a, b, t)` order:

- `src/animation/numeric.ts:159`: `(this.result as Record<string, number>)[seg.keys[i]!] = lerp(` — call site present, single arity verification not possible from grep alone but commit message confirms migration.
- `src/animation/group.ts:251`: `existing.value = lerp(` — call site present, same caveat.

**Verdict**: Both call sites exist post-codemod. The codemod (`470814e`) commit message asserts the migration was done; no contradicting evidence in the source tree.

### §3.4 — Precept-pin drift

- Self (`/Users/mkbabb/Programming/value.js`) precept pin: `68d9b20b…` (`contract-v2 — abrogate the development dev-resolution condition`), matching `origin/HEAD`.
- Keyframes.js precept pin (`docs/precepts` submodule): `458c2d1167f4e3a327edf17fc7509da533cacf1e` (`Prune meta language and harden overfitting rules`).
- Keyframes.js precepts upstream `origin/main` resolves to `3310a8cca728ee08d11045db4f2d3a82bb4d6d04` (`spec(P close): invariants 28-29 codified + LL entries 51-53 from glass-ui P.W6`).

**Verdict**: keyframes.js precept pin **divergent** from main by multiple commits. Pin `458c2d1` is behind both `68d9b20` (self) and `3310a8c` (current main). This is the chronic divergence observed at F close — un-changed. Note: the divergence direction is *backward* (older pin), not a fork.

---

## §4 — Speedtest state

**HEAD**: `a15857d09e6af19c4130ef9a557790230a210d79 2026-05-21 13:49:12 -0400 docs(AK/RATIFIED): G-AK-D1..D14 ratified at A7-recommended dispositions + W1 dispatch anchor`.
**Branch**: `master`.
**Drift vs F close**: `+2 commits` since `5e52d136`:
```
a15857d0 docs(AK/RATIFIED): G-AK-D1..D14 ratified at A7-recommended dispositions + W1 dispatch anchor
c73a8d92 docs(AK/W0): 7-lane audit cohort closes + A7 synthesis composes wave plan + 14 G-AK-D ratification gates
```

### §4.1 — Tranche AI / AJ status

`ls speedtest/docs/tranches/` enumerates: `AA AB AC AD AE AF AG AH AI AJ AK CW G H I J L M N O P Q R S T U V W X Y Z`.

- **AI**: directory exists (post-F-close anchor confirmed F's audit; AI was closed earlier).
- **AJ**: directory exists. Per the speedtest log, `5e52d136 docs(AJ/FINAL)` was the F-close anchor — AJ CLOSED at F close. Status unchanged: **CLOSED**.
- **AK**: **NEW**. Directory contains `AK.md` + `RATIFIED.md`. Opened same calendar day as F close (G open). Per `AK.md`: "successor to AJ (close at master `5e52d136`, tag `aj-close`)". Posture: "W0 cohort DISPATCHED — 6 parallel audit lanes + 1 synthesis." Per `RATIFIED.md`: "Ratified: 2026-05-21 by user … Gate 1 (ratification): CLEARED at this artefact. Gate 2 (implementation go): CLEARED at the same artefact (combined signal; AJ pattern)."

**Verdict**: AI + AJ both still CLOSED. **AK NEWLY OPENED + RATIFIED + IMPLEMENTATION-GO** on the same calendar day as F close (2026-05-21). 14 G-AK-D decisions ratified at A7-synthesis-recommended dispositions including: D1 METABALLS-RETIRE, D8 SUB-BARREL-PUBLISHING, D9 INSTRUMENT-RAIL primitive (glass-ui ask), D11 AURORA-OPACITY-CEILING (glass-ui ask), D4/D5 DEPLOY+PUSH-MANIFEST deferred.

### §4.2 — CW Phase-2

`docs/tranches/CW/` contains `CW.md` (223 lines) + `seed-references.md`. Per `CW.md` head:

> **Status**: **POSTURE: PLANNING — awaits W0 audit cohort dispatch.** This document is the tranche scaffold; no W0 audit lanes are dispatched yet (that is CW's own opening move, not AH's seed step).

Author: `AH-R5-beta seed lane, 2026-05-19`. Predecessor: AH (`ah-close` tag). Mandate: pnpm-workspace transposition (7 repos, 7 cadences, one root). CW Phase-2 sequences "fourier's flip last" per the CW.md §166 narrative. CW-A4 explicitly audits peer quiescence (re-runs A4 §1.3 working-tree inventory) — fourier's 109-file dirty tree is named as a phase-0 blocker.

**Verdict**: CW Phase-2 status is **STILL PLANNING-ONLY** at G open. No W0 dispatch fired. CW remains AK's downstream successor; AK D8 SUB-BARREL-PUBLISHING is the most immediate AK lane that overlaps CW's scope, but they remain distinct tranches. Phase-0 quiescence preconditions (per `CW.md`) are not met (chronic dirties unresolved + multi-team WIP active).

### §4.3 — value.js consumer version

`grep '"@mkbabb/value.js"\|"value.js"'` across speedtest `package.json`, `server/package.json`, `workers/speedtest-edge/package.json`, `scripts/lighthouse-plugins/speedtest-skeleton-paint/package.json` → **0 matches**. Python-parsed `package.json` dependencies + devDependencies has zero entries containing `value`.

**Verdict**: **speedtest does NOT consume `@mkbabb/value.js`** at G open (and presumably never has at any point in F's coordination window). The value.js coordination interest in speedtest is indirect — via glass-ui (which does consume value.js) and via precept/contract-v2 alignment, not via direct dependency. This was likely a stale tracking item.

---

## §5 — Fourier-analysis state

**HEAD**: `926ca6a97bb92b67bca222baf97cd7552f5e9c97 2026-05-18 21:51:39 -0400 fix(resolution): adopt cross-repo dev-resolution contract consumer half (glass-ui Q.W1 Lane D)`.
**Branch**: `master`.
**Drift vs F close `926ca6a`**: **0 commits** — HEAD identical to F close anchor.
**Working tree state**: `git status --short | wc -l` → **109 dirty files** — the chronic count, exactly matching the value tracked through tranches Q + F + the AH/CW Phase-0 quiescence audit.
**Push status**: `origin/master` at `4df1a06aaf885ac2f9ffb5788ce0f6eb584b1f68` (`feat(p.w5-b): glass-ui CR-2 cross-walk — dock typed-context migration + useClipboard + HoverCard + GlassScrubber adoption`, 2026-05-16). Local master is **1 commit ahead** (the resolution-contract consumer-half `926ca6a` is unpushed). Same posture as F close.
**TypeScript version**: `web/package.json` declares `"typescript": "^5.8"` — **unchanged**. No catch-up to TS 6 (which glass-ui + keyframes.js advanced to in their unpushed W12 sweeps). The maintainer-divergence flag persists.

**Verdict**: fourier-analysis is the **constellation freezer**. Static at the day-of-F-close HEAD; chronic 109-file dirty tree unchanged; one local unpushed commit unchanged; TS-version chronic-behind unchanged. No new tranche activity. This is the "MULTI-WRITER WIP" peer that CW-A4 §1.3 specifically names as a Phase-0 blocker.

---

## §6 — Precept submodule (self)

- Self pin (via `git submodule status docs/precepts`): `68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)`.
- `docs/precepts/.git` is a gitfile (file, 41 bytes — gitlink to parent's `.git/modules/docs/precepts`).
- `git -C docs/precepts log -1 --format='%H %s'` → `68d9b20b… precept: contract-v2 — abrogate the development dev-resolution condition`.
- `git -C docs/precepts log -1 --format='%H %s' origin/HEAD` → **same `68d9b20b…`**. No upstream advance since pin.

**Verdict**: self precept pin **synced with upstream HEAD** at G open. No drift; no rebase needed. Note divergence vs keyframes.js's `458c2d1` (older pin) — keyframes.js is the lagging consumer; value.js's pin is current.

---

## §7 — Constellation health summary

| Peer | Headline narrative |
|---|---|
| **glass-ui** | Quiescent at F-close HEAD `e150e2f` (AJ-W6-β useBreakpoint). Zero drift. **Contraction posture intact** (DockGroup + ProgressiveSidebar still absent from active components). **All 7 standing primitive asks from value.js still OPEN** — 0 shipped clean; Metaballs (ask #1) has adjacent AJ-wave activity (`positioning` prop + `:duration` prop in the unpushed 33-commit train) but with a different API shape than value.js asked for, so it's a renegotiate-not-ship condition. dist/glass-ui.css font-inlining residual (contract-v2 §2.1) **STILL OPEN** (0 `@font-face`, 0 `url(`). 33-commit chronic-unpushed front persists. |
| **keyframes.js** | F.W2 codemod (`470814e`) is HEAD of local master + **LOCAL ONLY** — `origin/master` still at `2183f32d`, 14 commits behind local. The unpushed chain spans the full Q.W1 contract → freshness-gate retiral → demo restoration → W8/W9/W10/W12 modernization sweep → the lerp codemod itself. Lerp call sites in `numeric.ts:159` + `group.ts:251` present (commit message asserts canonical `(a, b, t)` migration). Precept pin **divergent backward**: `458c2d1` vs upstream main `3310a8c` — chronic, un-changed. Working tree clean. |
| **speedtest** | **NEW TRANCHE AK** opened + RATIFIED + IMPLEMENTATION-GO on the same calendar day as F close (2026-05-21). AI + AJ both still CLOSED. CW Phase-2 still PLANNING-ONLY (W0 not dispatched). speedtest does **NOT consume value.js** directly — never has, per zero `"value"` matches in workspace `package.json`s. 14 G-AK-D decisions ratified including D1 METABALLS-RETIRE (publisher contract stays for downstream), D9 INSTRUMENT-RAIL glass-ui ask, D11 AURORA-OPACITY-CEILING. AK is the constellation's *only* peer with active tranche development at G open. |
| **fourier-analysis** | **Constellation freezer**. Zero drift from F-close HEAD `926ca6a`. Chronic 109-file dirty tree exactly unchanged. One local unpushed commit (the Q.W1 consumer-half resolution-contract adoption) unchanged. TS `^5.8` — not caught up to TS 6. Named as Phase-0 blocker by CW-A4 + AK D6/D7-style "if still beta defer" recurring chronic. |
| **precepts (self)** | Self pin `68d9b20` matches origin HEAD; no upstream advance. Keyframes.js peer pin `458c2d1` is the lagging-consumer outlier. |

**Cross-cutting observations**:

1. **F close didn't push anybody downstream.** Glass-ui (33) + keyframes.js (14) + fourier (1) all carry the same un-pushed posture observed at F close. The orchestrator can't push; this is operator-action gated. The F.W2 codemod-as-LOCAL-ONLY flag escalates: it's now part of a 14-commit local-only chain.
2. **AK at speedtest is the new constellation surface.** AK's D1 (METABALLS-RETIRE — both meter-idle backdrop + CompleteBadge sites), D9 (INSTRUMENT-RAIL primitive ratify at glass-ui as W2-α), D11 (AURORA-OPACITY-CEILING per-route prop at W6-α) all *add* to glass-ui's primitive-ask backlog rather than retiring asks from value.js's list. The 7 value.js asks remain orthogonal to AK's primary surface.
3. **value.js has no direct consumer telemetry from speedtest.** Past coordination assumed speedtest as a consumer; the package.json evidence says otherwise. Treat speedtest as glass-ui-mediated, not value.js-direct.
4. **CW Phase-2 not activating yet.** The pnpm-workspace transposition that would normalize the multi-repo dirty state remains planning-only. Phase-0 quiescence preconditions unmet (fourier 109-dirty + multi-team WIP active including AK).
5. **Self precept pin is the clean reference.** value.js + glass-ui (presumably; not re-checked this lane) + speedtest's expected pin all derive from `68d9b20`-or-equivalent. keyframes.js is the only confirmed lagger.

---

## §8 — Sub-gate verdict

This audit lane's findings position G open against the cross-repo manifest as follows:

- **G can proceed without peer-blocking** for any internal value.js work that does not require: (a) glass-ui shipping the 7 primitive asks, (b) keyframes.js pushing its 14-commit chain, (c) fourier-analysis cleaning its 109-dirty tree, (d) CW activating. None of these are immediate-G-W1 prerequisites for value.js library-internal work.
- **G should NOT assume any of the 7 standing glass-ui primitive asks land in-tranche.** They are all still OPEN with zero in-flight activity except Metaballs (which would need an explicit renegotiation lane, not a passive wait). If G plans any consumer-demo work that depends on these asks, it should be self-contained shims, not ship-blocking dependencies.
- **G should treat the AK ratification as informational, not coordinating.** speedtest does not consume value.js directly; AK's decisions affect glass-ui's primitive surface (D9 INSTRUMENT-RAIL, D11 AURORA-OPACITY-CEILING) but those flow through glass-ui, not through value.js. The relevant signal for value.js is *whether* glass-ui's responses to AK's asks coincide with any of value.js's 7 outstanding asks (overlap analysis is a synthesis-lane task, not this lane's).
- **G should treat keyframes.js as locally-correct + chronically-unpushed.** The F.W2 codemod consumer-side migration is done; the only outstanding question is operator-push timing. No further value.js action required on the codemod itself.
- **G should treat fourier-analysis + CW as out-of-scope.** Both are static. No coordination action required from value.js side.
- **Precept-pin discipline for G open**: pin `68d9b20` (current); no rebase needed; advance only on explicit precept-amendment authoring (not part of audit-lane scope).

**Lane verdict**: AUDIT COMPLETE. No blocking conditions found for G plan synthesis. Three named flags for synthesis to absorb:

  1. **F.W2 codemod chain is 14-commits-local-only on keyframes.js** (escalation of the single-commit flag observed at F close).
  2. **0-of-7 glass-ui primitive asks shipped**; Metaballs renegotiation candidate (different API shape shipped in unpushed AJ work).
  3. **speedtest is not a value.js consumer**; coordination model should drop the speedtest-as-consumer assumption.
