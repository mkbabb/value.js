SERVED MODEL: claude-opus-5[1m]

# GATE-ROSTER — the authoritative dated gate inventory (KF.W0 · G-0.7)

**Date**: 2026-09-17 · **Seat**: KF.W0.e · **Substrate**: `/Users/mkbabb/Programming/keyframes.js`
at `origin/master` `81a56990736ced5b5edde0b84c527680ac7689b1` (== `HEAD` after OP-1's settle;
local `8281638c` **DISQUALIFIED**).
**Authority**: `docs/tranches/X/keyframes/waves/KF-W0.md` §Gates **G-0.7** (`:607-645`), §Scope 8
(`:312`), §Carry **C-12** (`:372`), §Agent Units **KF.W0.e** (`:677`).
**Raw transcript**: `docs/tranches/X/keyframes/artefacts/W0/gate-roster.txt` — every figure below is
the literal output of a command printed there, **re-run at authoring and double-run**.

> **THIS WAVE EXECUTES NO STRIKE.** Every byte this seat wrote is under `value.js/docs/**`. Every
> dead-name site lives under `keyframes.js/demo/**`, a surface KF.W0's §Bounds forbids and the
> §Triumvirate Dispatch calls wave-invalidating. **Roster + route is the whole of W0's act**; the
> strikes and repoints are other waves' bytes, on their own clocks.

---

## §1 — THE INVENTORY: 3 npm entry points over 9 gate files

**Three `proof:*` npm entry points** ⟨`git show origin/master:package.json | grep -n 'proof:'`⟩:

| script               | line              | command                                  |
| -------------------- | ----------------- | ---------------------------------------- |
| `proof:structure`    | `package.json:50` | `node scripts/gates/structure/index.mjs` |
| `proof:publish`      | `package.json:51` | `node scripts/gates/surface/index.mjs`   |
| `proof:owner-golden` | `package.json:52` | `node scripts/gates/visual/index.mjs`    |

Adjacent, stated so nothing is inferred: `:37` `"check": "tsc --noEmit && tsc --noEmit -p
tsconfig.test.json && npm run proof:structure"` — **NO `vue-tsc`** · `:43` `"gh-pages": "vite build
--mode gh-pages"` · `:44` `"lint": "depcruise src"`. ⟨`git grep -c 'build:gh-pages' origin/master`⟩
→ **no hits** — **no `build:gh-pages` exists at any coordinate** (R-11 re-verified at execution).

**Nine `scripts/gates/` files, BY PATH** ⟨`git ls-tree -r --name-only origin/master scripts/gates/`
→ 9⟩ — three directories, nine files:

```
scripts/gates/structure/index.mjs
scripts/gates/surface/agent-surface.mjs
scripts/gates/surface/boundary.mjs
scripts/gates/surface/consume-bundle.mjs
scripts/gates/surface/index.mjs
scripts/gates/surface/published-surface.mjs
scripts/gates/surface/readme-runs.mjs
scripts/gates/surface/verify-diff.mjs
scripts/gates/visual/index.mjs
```

`surface/index.mjs` is a **family barrel**: it spawns `boundary.mjs · published-surface.mjs ·
consume-bundle.mjs · readme-runs.mjs · agent-surface.mjs` in sequence ⟨`sed -n '16,22p'`⟩ — which is
why the roster states the **9 files by path** and not the 3 scripts alone. The frontier roster is the
denominator (R-17); the _"surface, visual"_ two-script figure is a stale-worktree reading and is not
this roster's basis.

---

## §2 — THE DENOMINATOR: 53 dead names, re-derived at authoring

```
git grep -ho 'proof:[a-z0-9-]*' origin/master -- demo/ | grep -v -- '-$' | sort -u   → 55 tokens
   … | grep -cx 'proof:'                                                             →  1  (bare token)
   … | grep -vx 'proof:' | wc -l                                                     → 54  DISTINCT NAMES
   … | grep -E 'proof:(publish|structure|owner-golden)$'                              → proof:publish
                                                                    54 − 1 runnable  → 53 DEAD
git grep -c 'proof:' origin/master -- demo/                          → 51 files / 116 citation lines
```

Reproduces the spec's re-derivation **exactly**. The four names the bank and the fold happen to name
(`brittleness` · `font-census` · `styling-idioms` · `demo-no-oversize`) and D-13's seven are **worked
examples inside this 53, never its denominator** (R2-17).

### §2.1 The arithmetic that closes the set — stated because two different 116s coincide

| quantity                                                          | reading            |
| ----------------------------------------------------------------- | ------------------ |
| `proof:`-bearing lines in `demo/`                                 | **116** (51 files) |
| lines reached by at least one of the 54 names                     | **109**            |
| lines carrying **two** names each                                 | **7**              |
| lines carrying **no** full name (line-wrapped / brace-set / bare) | **7**              |
| name↔site pairs (the per-name inventory's column sum)             | **116**            |

`109 + 7 unnamed = 116 lines`. `109 + 7 double-named = 116 pairs`. **The two 116s are different
quantities that coincide because both residues happen to be 7** — recorded so no later seat reads one
as a confirmation of the other. The seven double-named lines: `DESIGN.md:224` · `:250` · `:251` ·
`:252` · `:253` · `useSceneTransport.ts:17` · `style.css:146`.

### §2.2 The +5 names the `-$` filter drops — a LOUD addendum-beside, not a correction of the 53

The denominator's own command discards any token ending in `-`, which is exactly how a **line-wrapped
name** and a **brace-set** spell themselves. Six such tokens exist ⟨`git grep -ho 'proof:[a-z0-9-]*'
origin/master -- demo/ | grep -- '-$' | sort -u`⟩, on six lines; resolved at their bytes:

| token                   | site                                                     | resolves to                                  | already in the 54?                      |
| ----------------------- | -------------------------------------------------------- | -------------------------------------------- | --------------------------------------- |
| `proof:easing-sidebar-` | `ChannelControls.vue:28`                                 | `proof:easing-sidebar-{normalized, minimal}` | `normalized` **yes** · **`minimal` NO** |
| `proof:bezier-`         | `ChannelOptions.vue:168`                                 | `proof:bezier-{no-scroll,single-card,grown}` | **all three NO**                        |
| `proof:amiga-decay-`    | `AmigaScene.vue:182` (tail `visible` at `:183`)          | `proof:amiga-decay-visible`                  | **NO**                                  |
| `proof:demo-no-`        | `ChannelControls.vue:341` (tail `oversize` at `:342`)    | `proof:demo-no-oversize`                     | yes — a **17th** site                   |
| `proof:crayon-`         | `CubeTarget.vue:132` (tail `preserved` at `:133`)        | `proof:crayon-preserved`                     | yes — a **6th** site                    |
| `proof:scene-contract-` | `scenePlaybackAdapters.ts:18` (tail `identity` at `:19`) | `proof:scene-contract-identity`              | yes — a **2nd** site                    |

The seventh unnamed line, `useSequenceDemo.ts:27` — _"This scene is that proof:"_ — is **English
prose ending in a colon, not a citation**; it is named here so a later sweep does not book it.

**Five further dead names**, none of them in the 53: `proof:easing-sidebar-minimal` ·
`proof:amiga-decay-visible` · `proof:bezier-no-scroll` · `proof:bezier-single-card` ·
`proof:bezier-grown`. The bezier trio already carries a banked home (**OPTIONS-UNIT @ KF.W12**,
`KF-W4.md` §Excluded 21); the other two are rostered at §4 below. **The banked 16×13 for
`proof:demo-no-oversize` is NOT rewritten** (E-3) — it reproduces exactly under its own command; the
wrapped 17th site is recorded beside it.

---

## §3 — THE ROUTING RULE (stated so every disposition below reproduces)

- **R1 — struck-in-owner-wave `KF.W4`.** A site inside KF.W4's **eight enumerated citation targets**
  (`KF-W4.md` §Bounds, the _Citation targets_ row) dies under **G-KFW4-8**, per R-7 cell (a).
  Re-derived at this seat: `DESIGN.md` 13 · `EditorStartScreen.vue` 5 · `App.vue` 3 ·
  `HeroAurora.vue` 3 · `TypingDots.vue` 3 · `layout.css` 3 · `design-idioms.css` 2 ·
  `SpringPhysicsFacet.vue` 1 = **33 lines / 19 names** — reproduces that row to the digit.
  **116 − 33 = 83 lines lie outside KF.W4's reach.** Two declared exceptions: `proof:brittleness` at
  `layout.css:152` (carved OUT of G-KFW4-8's denominator by name, R2-13) and `proof:publish` (live).
- **R2 — `proof:brittleness` travels as a FAMILY to KF.W6** (R2-13, banked routing).
- **R3 — routed-with-a-named-owner: the wave whose §Bounds carries the file with a grant wide enough
  to reach its prose.** The grant word is printed beside every routing. A path-literal grep over a
  sibling §Bounds is a **floor**, never a ceiling — `KF-W6.md` writes `CubeTarget.vue`/`.css` and
  `AmigaScene.vue` + `utils.ts` as one cell each, so the compressed spellings were read row-by-row
  (banked at §12b of the transcript).
- **R4 — where the holder's grant is a declared CARVE that does not name the citation, or is
  READ-ONLY, the site routes to the NO-WAVE-OWNER packet whose subject the file is**, homed by
  KF.W4's lists at **KF.W11** (scenes ×9) / **KF.W12** (units ×6) / **KF.W13** (dock-menu ·
  transport/ribbon). Precedents taken from the bank, by name: `KF-W4.md` §Excluded **18**
  (`proof:accent-census` → CARD-UNIT / KFED-UNIT @ KF.W12) and §Excluded **19**
  (`proof:stage-visible` → the OPTIONS/controls surface @ KF.W12). **Homing stays SS-1/SS-2's act;
  this roster supplies the ground and homes nothing.**
- **R5 — otherwise a LOUD `NO-WAVE-OWNER` line**, terminalized at **`KF-W10.md` §E ·
  `NWO-TERMINAL-SWEEP` · gate `G-2`** (anchor-only). **Routed, never dropped.**
- **R6 — REPOINT beats strike.** A name that resolves to a live instrument is not a phantom (§5).

---

## §4 — THE ROSTER: 53 dead names + the 1 live one, each with its sites and a disposition

Legend — **S/W4** struck-in-owner-wave KF.W4 · **→Wn** routed to that wave (grant word in brackets) ·
**→pkt@Wn** routed to a NO-WAVE-OWNER packet homed at that wave · **NWO** loud NO-WAVE-OWNER,
terminalized at KF.W10 §E G-2 · **RP** repoint (a live instrument exists — §5).

| #   | name                                  | sites (`file:line`, `demo/`-relative)                                                                                                                                      | disposition                                                                                                                                                                                                                                                                                                               |
| --- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `proof:accent-census`                 | `components/instrument/keyframes/KeyframeCard.vue:19`                                                                                                                      | **→CARD-UNIT / KFED-UNIT @ KF.W12** — banked, `KF-W4.md` §Excluded 18 (kf-KeyframeCard KF-KC-35 / kf-KeyframesEditor KF-KE-62)                                                                                                                                                                                            |
| 2   | `proof:amiga-subject-is-pivot`        | `scenes/amiga/useAmigaDemo.ts:20`                                                                                                                                          | **RP → amiga pkt @ KF.W11** — live label `[B3]` in `scripts/observe/demo/live-session.mjs:63` + `scripts/lib/console-budget.mjs:119`; the cure is a repoint to the harness, not a deletion                                                                                                                                |
| 3   | `proof:amiga-tessellate-tilecount`    | `scenes/amiga/utils.ts:49`                                                                                                                                                 | **→KF.W6** [modify — `AmigaScene.vue` + `utils.ts` row]                                                                                                                                                                                                                                                                   |
| 4   | `proof:app-is-shell`                  | `app/App.vue:322` · `app/scene/useSceneMachineShellBinding.ts:8`                                                                                                           | `App.vue:322` **S/W4** · `useSceneMachineShellBinding.ts:8` **NWO** (no wave §Bounds, no packet subject)                                                                                                                                                                                                                  |
| 5   | `proof:appearance-suffusion`          | `DESIGN.md:251` · `styles/layout.css:31`                                                                                                                                   | **S/W4** (both inside the eight targets)                                                                                                                                                                                                                                                                                  |
| 6   | `proof:boundary`                      | `app/main.ts:27` · `kf-engine.ts:24`                                                                                                                                       | **RP → NWO** — **the name is LIVE**: `scripts/gates/surface/boundary.mjs:532` prints `"proof:boundary — light-surface static module graphs"` and runs inside `npm run proof:publish`. No wave §Bounds carries either citing file → the repoint target is named, the act is terminal-sweep business                        |
| 7   | `proof:brittleness`                   | `styles/style.css:38` · `styles/layout.css:152`                                                                                                                            | **→KF.W6, FAMILY WHOLE** (R2-13). Third site outside `demo/`: `scripts/lib/demo-driver.mjs:69` (a comment mirror). `layout.css:152` is the **declared carve** out of G-KFW4-8. **68 keyframes `docs/**` files carry the name and are OUT OF SCOPE by bounds\*\* — declared, never silently inherited                      |
| 8   | `proof:colocation`                    | `DESIGN.md:224` · `:239` · `:240` · `:252`                                                                                                                                 | **S/W4**                                                                                                                                                                                                                                                                                                                  |
| 9   | `proof:crayon-preserved`              | `DESIGN.md:251` · `styles/style.css:117` · `:146` · `scenes/cube/CubeTarget.css:107` · `CubeTarget.vue:132` (wrapped) · `scenes/cube/useCubeRelit.ts:17`                   | `DESIGN.md:251` **S/W4** · `style.css` ×2 **→KF.W6** [modify] · `CubeTarget.*` **→cube pkt @ KF.W11** (W6 holds the file under a carve naming D-7/#58/#60/KF-AX-_/ME-_) · `useCubeRelit.ts:17` **→cube pkt @ KF.W11**                                                                                                     |
| 10  | `proof:cursor-light-subtle`           | `app/App.vue:49` · `shell/HeroAurora.vue:18` · `:44`                                                                                                                       | **S/W4** (KF-HA-4)                                                                                                                                                                                                                                                                                                        |
| 11  | `proof:demo-no-oversize`              | **16 sites / 13 files** (+1 wrapped) — see §4.1                                                                                                                            | **SPLIT per site, §4.1** — the L-6 family, whose lock is _"a fix confined to this file leaves twelve files standing; the fold owns the sweep"_: the fold is this roster                                                                                                                                                   |
| 12  | `proof:demo-title`                    | `app/index.html:11`                                                                                                                                                        | **NWO** — `KF-W9.md` §Bounds holds `demo/app/index.html` as a **READ-ONLY WITNESS SURFACE** (its grant is struck); a read-only holder cannot strike a citation                                                                                                                                                            |
| 13  | `proof:design-refinement`             | `shell/EditorStartScreen.vue:56` · `scenes/sequence/SequenceTarget.css:211`                                                                                                | `:56` **S/W4** · `SequenceTarget.css:211` **→sequence pkt @ KF.W11** (W6 holds the file under a carve naming KF-SCR-2/D·D-7/D4/D22)                                                                                                                                                                                       |
| 14  | `proof:dfa-derived`                   | `state/controlSurfaces.ts:143`                                                                                                                                             | **NWO** — `demo/state/**` behavioural stores are explicitly _"not touched by any seat"_ in `KF-W6.md` §Bounds                                                                                                                                                                                                             |
| 15  | `proof:dock-grammar`                  | `composables/scene-runtime/useSceneTransport.ts:17`                                                                                                                        | **NWO**                                                                                                                                                                                                                                                                                                                   |
| 16  | `proof:dock-zorder`                   | `transport/AnimationControlsGroup.css:132`                                                                                                                                 | **NWO** — D-13 family, banked NO-WAVE-OWNER (prose-truth hygiene)                                                                                                                                                                                                                                                         |
| 17  | `proof:dogfood`                       | `scenes/sequence/useSequenceDemo.ts:44`                                                                                                                                    | **→sequence pkt @ KF.W11**                                                                                                                                                                                                                                                                                                |
| 18  | `proof:drag-gesture`                  | `components/playback/PlaybackRibbon.vue:162`                                                                                                                               | **RP → transport/ribbon pkt @ KF.W13** — live label `[B6/B8]` at `live-session.mjs:64`; W6 holds `PlaybackRibbon.vue` under a carve                                                                                                                                                                                       |
| 19  | `proof:easing-sidebar`                | `transport/channel-controls/ChannelControls.vue:94`                                                                                                                        | **→KF.W6** [modify]                                                                                                                                                                                                                                                                                                       |
| 20  | `proof:easing-sidebar-normalized`     | `scenes/spring/SpringPhysicsFacet.vue:118` · `ChannelControls.vue:28` (brace)                                                                                              | `:118` **S/W4** (SPF-27's citation half, KF-W4 §Carry row 13) · `ChannelControls.vue:28` **→KF.W6** [modify]                                                                                                                                                                                                              |
| 21  | `proof:font-census`                   | `DESIGN.md:29` · `:250` · `shell/EditorStartScreen.vue:180` · `styles/font-roles.json:2` · `:62`                                                                           | the three inside the eight targets **S/W4** — `:29` **REPOINTED, not deleted**, at G-KFW4-10 (R-7's own carve) · `font-roles.json:2`/`:62` **→KF.W6** [modify] (KF.W4's `font-roles.json` grant is carved to `:16-26` and `:34-38`, which do not reach `:2`/`:62`)                                                        |
| 22  | `proof:glass-and-cartoon`             | `styles/style.css:196`                                                                                                                                                     | **→KF.W6** [modify]                                                                                                                                                                                                                                                                                                       |
| 23  | `proof:group-snapshot-identity`       | `state/scenePlaybackAdapters.ts:19` (+ `:18` wrapped)                                                                                                                      | **RP → NWO** — **LIVE**: `test/group/group-snapshot-identity.test.ts`. `demo/state/**` has no wave holder, so the repoint is terminal-sweep business                                                                                                                                                                      |
| 24  | `proof:hero-deck-voice`               | `shell/EditorStartScreen.vue:134`                                                                                                                                          | **S/W4**                                                                                                                                                                                                                                                                                                                  |
| 25  | `proof:hero-two-focal`                | `shell/EditorStartScreen.vue:15`                                                                                                                                           | **S/W4** — R-4's ruling; the site is **styled as an OWNER lock**, which is why KF-EST-1 calls it _binding authority_                                                                                                                                                                                                      |
| 26  | `proof:icon-paint-live`               | `app/App.vue:117` · `app/transition/useSceneTransition.ts:21`                                                                                                              | `App.vue:117` **S/W4** · `useSceneTransition.ts:21` **RP → NWO** — live at `demo-driver.mjs:372` + `live-session.mjs:64`                                                                                                                                                                                                  |
| 27  | `proof:idioms`                        | `styles/design-idioms.css:3` · `:43` · `styles/layout.css:10`                                                                                                              | **S/W4** — all three, per R-7's round-3 D-6 correction                                                                                                                                                                                                                                                                    |
| 28  | `proof:lighthouse-a11y`               | `scenes/spring/SpringHeatmap.vue:26`                                                                                                                                       | **→KF.W6** [modify — the canvas-colour / theme-flip row]                                                                                                                                                                                                                                                                  |
| 29  | `proof:live-session-mobile`           | `transport/AnimationControlsGroup.css:165` · `transport/TransportDock.vue:274` · `:282`                                                                                    | **RP** — **LIVE, prefix-less**: `DEMO_ROSTER` **row 6** (`scripts/demo-roster.mjs:11`) → `scripts/observe/demo/live-session-mobile.mjs`, present at the frontier. `.css` site **NWO** (D-13 family) · `TransportDock.vue` ×2 **→transport/ribbon pkt @ KF.W13** (W6 holds the file under a carve)                         |
| 30  | `proof:mobile-single-page`            | `app/scene/scenes.ts:46` · `transport/AnimationControlsGroup.css:113` · `:162` · `transport/TransportDock.vue:285` · `transport/controls-pane/ControlsPaneWrapper.vue:272` | `scenes.ts:46` **NWO** · `.css` ×2 **NWO** (D-13) · `TransportDock.vue:285` **→transport/ribbon pkt @ KF.W13** · `ControlsPaneWrapper.vue:272` **→OPTIONS-UNIT @ KF.W12** (§Excluded 19 precedent)                                                                                                                        |
| 31  | `proof:no-hand-rolled-cursor-tracker` | `shell/HeroAurora.vue:5`                                                                                                                                                   | **S/W4** (KF-HA-4)                                                                                                                                                                                                                                                                                                        |
| 32  | `proof:no-shadow-playback-authority`  | `transport/AnimationControlsGroup/useAnimationGroupActions.ts:57` · `useAnimationGroupPlayback.ts:35`                                                                      | **RP → transport/ribbon pkt @ KF.W13** — **LIVE**: `test/demo/state/no-shadow-playback-authority.test.ts`, whose own `:1` reads _"proof:no-shadow-playback-authority — T.B8 (lane 30 rec 1), the vitest half."_ and which `KF-W6.md` §Bounds already carries. **A citation of a live suite is a repoint, never a strike** |
| 33  | `proof:one-adapter`                   | `app/scene/useSceneMachineShellBinding.ts:54` · `:65` · `:130`                                                                                                             | **NWO**                                                                                                                                                                                                                                                                                                                   |
| 34  | `proof:panel-naked-rail`              | `transport/AnimationControlsGroup.vue:17` · `transport/controls-pane/ControlsPaneWrapper.css:26`                                                                           | ACG site **NWO** (D-13) · `.css:26` **→OPTIONS-UNIT @ KF.W12**                                                                                                                                                                                                                                                            |
| 35  | `proof:perf-counters`                 | `scenes/cube/CubeTarget.css:32` · `scenes/easing/EasingScene.vue:123` · `scenes/spring/SpringScene.vue:192`                                                                | `CubeTarget.css` **→cube pkt @ KF.W11** · `EasingScene.vue:123` **NWO** (W6 holds it under a carve naming KF-ET-10/-17/-21, KF-ES-21/-45; **there is no easing packet in the canonical 17**) · `SpringScene.vue:192` **→spring pkt @ KF.W11**                                                                             |
| 36  | `proof:phi-leaf-zero`                 | `scenes/sequence/SequenceTarget.css:95`                                                                                                                                    | **→sequence pkt @ KF.W11**                                                                                                                                                                                                                                                                                                |
| 37  | `proof:publish`                       | `DESIGN.md:235` · `:243` · `:253`                                                                                                                                          | **LIVE — NOT DEAD, NOT IN THE 53.** `npm run proof:publish` = `node scripts/gates/surface/index.mjs`. R-7 cell (c)                                                                                                                                                                                                        |
| 38  | `proof:scene-contract-identity`       | `scenes/easing/EasingScene.vue:129` (+ `state/scenePlaybackAdapters.ts:18` wrapped)                                                                                        | **RP → NWO** — **LIVE**: `test/demo/scenes/scene-contract-identity.test.ts`                                                                                                                                                                                                                                               |
| 39  | `proof:scene-control-dfa`             | `channel-controls/ChannelControls.vue:73` · `:343` · `composables/useSelectedControlSurface.ts:31`                                                                         | `ChannelControls.vue` ×2 **→KF.W6** [modify] · `useSelectedControlSurface.ts:31` **→OPTIONS-UNIT @ KF.W12**                                                                                                                                                                                                               |
| 40  | `proof:scene-facility`                | `composables/scene-facility/index.ts:18`                                                                                                                                   | **RP → NWO** — **LIVE**: `test/demo/scenes/scene-facility.test.ts`                                                                                                                                                                                                                                                        |
| 41  | `proof:scene-icons`                   | `app/scene/scenes.ts:87`                                                                                                                                                   | **RP → NWO** — named live at `scripts/lib/demo-driver.mjs:137` (_"the SAME shape `proof:scene-icons` uses…"_)                                                                                                                                                                                                             |
| 42  | `proof:scene-machine-irrefragable`    | `state/controlSurfaces.ts:27` · `state/useSceneMachine.ts:305`                                                                                                             | **RP → NWO** — named live inside `test/demo/state/control-surface-dfa.test.ts`; `demo/state/**` has no wave holder                                                                                                                                                                                                        |
| 43  | `proof:sequence-rows-draggable`       | `scenes/sequence/SequenceTarget.css:162`                                                                                                                                   | **→sequence pkt @ KF.W11**                                                                                                                                                                                                                                                                                                |
| 44  | `proof:single-writer`                 | `state/useSceneMachine.ts:12`                                                                                                                                              | **NWO**                                                                                                                                                                                                                                                                                                                   |
| 45  | `proof:stage-inventory`               | `scenes/amiga/AmigaScene.vue:11`                                                                                                                                           | **→KF.W6** [modify]                                                                                                                                                                                                                                                                                                       |
| 46  | `proof:stage-not-clipped`             | `transport/AnimationControlsGroup.vue:62`                                                                                                                                  | **NWO** — D-13                                                                                                                                                                                                                                                                                                            |
| 47  | `proof:stage-visible`                 | `transport/controls-pane/ControlsPaneWrapper.css:21`                                                                                                                       | **→OPTIONS-UNIT @ KF.W12** — banked, `KF-W4.md` §Excluded 19 (kf-ControlsPaneWrapper D-M3 / mi-5 / C-14)                                                                                                                                                                                                                  |
| 48  | `proof:stage-within-docks`            | `transport/AnimationControlsGroup.css:127` · `:153`                                                                                                                        | **NWO** — D-13                                                                                                                                                                                                                                                                                                            |
| 49  | `proof:style-file-ceiling`            | `DESIGN.md:224` · `:236` · `:252`                                                                                                                                          | **S/W4** — `:236` is KF-CO-33's second surviving limb, cured in-wave at KF.W4                                                                                                                                                                                                                                             |
| 50  | `proof:styling-idioms`                | `DESIGN.md:237` · `:250` · `shell/EditorStartScreen.vue:159` · `scenes/sequence/SequenceTarget.css:212`                                                                    | the three inside the eight targets **S/W4** · `SequenceTarget.css:212` **→sequence pkt @ KF.W11**                                                                                                                                                                                                                         |
| 51  | `proof:transport-action-order`        | `composables/scene-runtime/useSceneTransport.ts:17`                                                                                                                        | **NWO**                                                                                                                                                                                                                                                                                                                   |
| 52  | `proof:typing-dots`                   | `shell/TypingDots.vue:45` · `:51` · `:59`                                                                                                                                  | **S/W4** — KF-EST-1's three, entered by name. **Fold note (C-21)**: this file is the substrate-INVERSION exemplar, so all three sites are stamped against the frontier and any HEAD-based reading of them is stale by construction                                                                                        |
| 53  | `proof:visual-lock`                   | `styles/style.css:146`                                                                                                                                                     | **RP → KF.W6** [modify] — **the successor is named in the live gate**: `scripts/gates/visual/index.mjs:4/:8/:38` declares itself the oracle that _"SUPERSEDES proof:visual-lock's"_ hygiene tier ⇒ repoint to **`npm run proof:owner-golden`**                                                                            |
| 54  | `proof:zone-cohesion`                 | `DESIGN.md:238` · `:253`                                                                                                                                                   | **S/W4**                                                                                                                                                                                                                                                                                                                  |

**Counting rule** — one row per distinct name from §2's command; rows 1–54 each appear exactly once,
in the command's own sort order. **53 dead + 1 live (`proof:publish`) = 54.** No row carries
_"noted"_, _"carried"_ or _"hygiene"_: falsifier (b) reds on silence, and every row above resolves to
a strike-in-owner-wave, a route with a named owner, a repoint with a named instrument, or a loud
NO-WAVE-OWNER line terminalized at KF.W10 §E G-2.

### §4.1 `proof:demo-no-oversize` — the L-6 family, split per site (16 hits / 13 files)

Re-measured: `git grep -c … -- demo/` → **13 files / 16 hits**, reproducing kf-DemoGlobalChrome
**L-6** exactly. **Scope word is load-bearing**: repo-wide the same name reads **121 hits / 70 files,
57 of those under `docs/`**, and keyframes `docs/**` is outside **every** X·KF wave's §Bounds — so
the record's lock discharges **at demo scope** and the `docs/**` surface is **loudly out of scope**.

| site                                                                   | disposition                                                                                                                                                                        |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transport/AnimationControlsGroup.vue:117` · `:301` · `:309`           | **→transport/ribbon pkt @ KF.W13** (W6's grant is a carve naming KF-SKEL-9's nine stage-class emissions ONLY)                                                                      |
| `AnimationControlsGroup/useAnimationGroupActions.ts:31`                | **→transport/ribbon pkt @ KF.W13**                                                                                                                                                 |
| `AnimationControlsGroup/useAnimationGroupPlayback.ts:151`              | **→transport/ribbon pkt @ KF.W13**                                                                                                                                                 |
| `AnimationControlsGroup/useControlsKeyboardShortcuts.ts:28`            | **→transport/ribbon pkt @ KF.W13** — `KF-W8.md` §Bounds holds the file **read-only**, so W8 cannot strike it                                                                       |
| `transport/ControlsPaneWrapper/usePaneRegister.ts:23`                  | **→OPTIONS-UNIT @ KF.W12**                                                                                                                                                         |
| `channel-controls/ChannelControls.vue:383` · `:397` (+ `:341` wrapped) | **→KF.W6** [modify]                                                                                                                                                                |
| `channel-controls/composables/useKeyframesPaneReveal.ts:38`            | **→OPTIONS-UNIT @ KF.W12**                                                                                                                                                         |
| `channel-controls/composables/useSelectedControlSurface.ts:29`         | **→OPTIONS-UNIT @ KF.W12**                                                                                                                                                         |
| `channel-controls/composables/useTabStripScroll.ts:18`                 | **→KF.W6** [**delete** — the citation dies with the file]                                                                                                                          |
| `transport/components/DemoGlobalChrome.vue:4`                          | **→transport/ribbon pkt @ KF.W13** (W6's grant is a carve). **The record's consequence travels**: this header's SOLE stated reason for the file's existence cites the retired gate |
| `scenes/cube/useCubeRelit.ts:9`                                        | **→cube pkt @ KF.W11**                                                                                                                                                             |
| `scenes/spring/useSpringHotPath.ts:36`                                 | **→spring pkt @ KF.W11**                                                                                                                                                           |
| `scenes/square/useSquareKeyboard.ts:8`                                 | **→square pkt @ KF.W11**                                                                                                                                                           |

**13 rows · 16 sites · 13 files — every site disposed, none dropped.**

---

## §5 — THE LIVENESS SWEEP: 12 of the 53 are NOT phantoms

The three prior readings of this gate asked only _"is the name an npm script?"_. That predicate
cannot tell a phantom from an **unrouted citation of a live instrument**, and the difference decides
whether the cure is a deletion or a repoint. Both arms were run over all 54 names:

```
file-basename-match : grep -iE "(^|/)<name minus prefix>(\.|-)"  over  git ls-tree -r --name-only origin/master test/ scripts/
named-inside        : git grep -l "proof:<name>" origin/master -- test/ scripts/
```

**14 of 54 hit.** Two are not part of the result: `proof:publish` (already runnable) and
`proof:brittleness` (whose only hit is a **comment mirror** at `demo-driver.mjs:69` — a comment is
not an instrument). **12 of the 53 dead names therefore resolve to a LIVE instrument:**

| name                                 | live instrument                                                                                         | how it is run                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `proof:boundary`                     | `scripts/gates/surface/boundary.mjs` (`:532` prints the name) · `test/engine/boundary-cohesion.test.ts` | `npm run proof:publish` (the barrel spawns it first) or `node scripts/gates/surface/boundary.mjs` |
| `proof:no-shadow-playback-authority` | `test/demo/state/no-shadow-playback-authority.test.ts` (`:1` names it)                                  | vitest                                                                                            |
| `proof:scene-contract-identity`      | `test/demo/scenes/scene-contract-identity.test.ts`                                                      | vitest                                                                                            |
| `proof:group-snapshot-identity`      | `test/group/group-snapshot-identity.test.ts`                                                            | vitest                                                                                            |
| `proof:scene-facility`               | `test/demo/scenes/scene-facility.test.ts`                                                               | vitest                                                                                            |
| `proof:scene-machine-irrefragable`   | named inside `test/demo/state/control-surface-dfa.test.ts`                                              | vitest                                                                                            |
| `proof:live-session-mobile`          | `scripts/observe/demo/live-session-mobile.mjs`, `DEMO_ROSTER` row 6                                     | `node scripts/observe/demo/live-session-mobile.mjs`                                               |
| `proof:amiga-subject-is-pivot`       | `scripts/observe/demo/live-session.mjs:63` `[B3]` · `scripts/lib/console-budget.mjs:119`                | `node scripts/observe/demo/live-session.mjs`                                                      |
| `proof:drag-gesture`                 | `live-session.mjs:64` `[B6/B8]`                                                                         | same harness                                                                                      |
| `proof:icon-paint-live`              | `demo-driver.mjs:372` · `live-session.mjs:64`                                                           | same harness                                                                                      |
| `proof:scene-icons`                  | `demo-driver.mjs:137`                                                                                   | same harness                                                                                      |
| `proof:visual-lock`                  | `scripts/gates/visual/index.mjs:4`/`:8`/`:38` — declares itself its **successor**                       | `npm run proof:owner-golden`                                                                      |

**53 − 12 = 41 true phantoms.** Each of the 12 carries **RP** in §4: its owning wave repoints the
citation at the named instrument instead of deleting a true sentence. D-13's own carve-out
(_"one cited name matches a DEMO_ROSTER observation, prefix-less"_) is this class's first member,
banked by that record and now generalised by measurement rather than by inference.

---

## §6 — THE THREE R-8 RESIDUE FAMILIES, RECEIVED BY NAME **AND** BY FAMILY

KF.W4 routes these here at its §Excluded residue table (stable anchor only, LAW C(3)); **one roster,
one owner, one sweep.**

### (i) kf-AnimationControlsGroup **D-13** — _"seven `proof:_` gate citations resolve to zero runnable gates"\*

Re-derived over the record's subject surface ⟨`git grep -ho 'proof:[a-z0-9-]*' origin/master --
'demo/components/instrument/transport/AnimationControlsGroup*'`⟩ — **8 distinct names over 16
citations**:

`proof:demo-no-oversize` ×6 · `proof:stage-within-docks` ×2 · `proof:no-shadow-playback-authority`
×2 · `proof:mobile-single-page` ×2 · `proof:stage-not-clipped` ×1 · `proof:panel-naked-rail` ×1 ·
`proof:dock-zorder` ×1 · `proof:live-session-mobile` ×1.

The eighth is the record's own carve-out: `live-session-mobile` is **row 6** of `DEMO_ROSTER`
(`scripts/demo-roster.mjs:11`) with `scripts/observe/demo/live-session-mobile.mjs` present.
**8 − 1 = the banked seven**, reproduced by measurement, no bank correction owed. Family disposition:
**NO-WAVE-OWNER (prose-truth hygiene)** as banked — each of the seven carries its own row above, and
`no-shadow-playback-authority` is additionally **RP** (§5). The row's _"two `proof:` scripts exist"_
is the stale-worktree reading this roster corrects to **three** at §1.

### (ii) kf-DemoGlobalChrome **L-6** — `proof:demo-no-oversize` at 16 hits / 13 files

Enumerated per site at **§4.1**. Verbatim lock carried: _"A fix confined to this file leaves twelve
files standing; **the fold owns the sweep**."_ The fold is this roster; the twelve other files each
carry a named owner at §4.1.

### (iii) kf-EditorStartScreen **KF-EST-1** — eight sites over six names, two files

⟨`kf-EditorStartScreen.md:58`⟩ _"Eight `proof:_`citations across two files name gates deleted by`70b32501`/`92746148`as **binding authority**."* All eight re-measured at`origin/master` at this
seat:

| site                        | name                                                 | disposition |
| --------------------------- | ---------------------------------------------------- | ----------- |
| `EditorStartScreen.vue:15`  | `proof:hero-two-focal` (**styled as an OWNER lock**) | S/W4        |
| `EditorStartScreen.vue:56`  | `proof:design-refinement`                            | S/W4        |
| `EditorStartScreen.vue:134` | `proof:hero-deck-voice`                              | S/W4        |
| `EditorStartScreen.vue:159` | `proof:styling-idioms`                               | S/W4        |
| `EditorStartScreen.vue:180` | `proof:font-census`                                  | S/W4        |
| `TypingDots.vue:45`         | `proof:typing-dots`                                  | S/W4        |
| `TypingDots.vue:51`         | `proof:typing-dots`                                  | S/W4        |
| `TypingDots.vue:59`         | `proof:typing-dots`                                  | S/W4        |

**Six distinct names over eight sites**, every one a member of the 53 and disposed at §4 by name.
`TypingDots.vue`'s three enter the roster **by name**, and the family, its id and its second file are
named — the accounting the roster's falsifier (b) turns on.

---

## §7 — GATE READING

**G-0.7 — GATE-INVENTORY TRUTH.**

| clause                                           | reading                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(i) THE ROSTER**                               | **GREEN** — this artifact, dated, in the tree: the 3 npm entry points and the 9 gate files **by path** (§1), the **53 dead names** enumerated as measured at `81a56990` by the §2 command block re-run at authoring, each with its site list (§4)                                                                   |
| **(ii) EVERY NAME DISPOSED, W0 STRIKES NOTHING** | **GREEN** — 54 rows, each struck-in-owner-wave / routed-with-a-named-owner / repointed-with-a-named-instrument / a loud NO-WAVE-OWNER line terminalized at KF.W10 §E G-2. `proof:brittleness` → **KF.W6**, family whole (R2-13). Every byte this seat wrote is `value.js/docs/**`; **zero `demo/**` bytes moved\*\* |

**Falsifiers, run against this roster**

- **(a) short roster** — the command block was **re-run at authoring** and returns **54 distinct
  names / 1 runnable / 53 dead / 116 hits / 51 files**; the roster's name count **is** the sweep's,
  and §2.2 additionally declares the **+5** the sweep's own filter drops. Not RED.
- **(b) a non-disposition** — no row reads _"noted"_, _"carried"_ or _"hygiene"_; D-13's seven are
  **enumerated** (§6(i)), L-6's 16×13 are **enumerated per site** (§4.1), KF-EST-1's eight are
  **enumerated with their names** (§6(iii)). Not RED.
- **(c) a `demo/**` strike by W0** — none. ⟨`git -C /Users/mkbabb/Programming/keyframes.js status
  --short`⟩ shows no modification under `demo/\*\*` from this seat. Not RED.

**The demo-typechecking arm is NOT this gate's** — it routes to KF.W4 against the single banked
no-SFC-typecheck identity (KF-APP-4 ≡ KF-CE-16 ≡ KF-CO-7 ≡ MM-36 ≡ LP-7 ≡ KF-AT-12 ≡ KF-HA-5 ≡
L-4/C-6 ≡ B-1 ≡ RB B-1), booked ONCE and never re-booked here.

**Precondition discharged**: G-0.7's own falsifier states _"this gate must precede KF.W4"_. It does —
this roster is dated 2026-09-17 and KF.W4 stands `planned` at `LEDGER.md` Track B.
