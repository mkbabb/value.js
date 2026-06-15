# N.W18 — Cross-repo consume-at-pin: the glass-ui BA-cut (4.0.0) re-pin, the full inv-N-10 abrogation sweep, the enumerated adopt checklist (the interims DIE here), the easing-configurator consume, kf/fourier coordination

**Status: RATIFIED** (the WAVES-2 second block ratified 2026-06-15 — `EXECUTION-ORCHESTRATION.md §0`/`§5`).
No longer PLANNED.

**Round:** R4 (the cut consume — `EXECUTION-ORCHESTRATION.md §2`, `:75`). The ONE BA-gated wave: it runs
after the R3 design body (N.W13 controls, N.W14 cards, N.W15 perf, N.W16 per-pane, N.W17 shell/motion)
have landed their `[data-*]`/in-repo INTERIMS, and **gates on the glass-ui BA cut (4.0.0)** —
the registry publish that carries the U-fix mass (`EXECUTION-ORCHESTRATION.md §0` "the BA cut carries
the U-fix mass"; `WAVES-2.md:38,280`). Precedes N.W8′ (hygiene + master-merge + wire-deploy) only for the
pin-discharge dependency; **may lag on the BA cut without blocking N.W8′** (`WAVES-2.md:281,287` —
"W18 may lag on the BA cut without blocking W8′; W9′ waits for both"). N.W9′'s v1.0.0 pin is DISCHARGED
HERE (`WAVES-2.md:263` — "the registry pin is discharged by W18.A").

**Disposition:** IMPL cross-repo (consume-on-their-land). value.js writes NO glass-ui code (inv-16 / the
foreign-repo fence; `N.md §8`, `cross-repo-dev-resolution.md`); every producer-side fix in registers
A/A′/B/C/F of the BA letter is glass-ui's to author and value.js's to CONSUME at the published cut. The
wave's work is value.js-side: the re-pin off `file:../glass-ui`, the abrogation sweep against the
4.0.0 retired set, the enumerated adopt + π-verify checklist, the deletion of every R3 interim shim, the
`EasingSelector` → `EasingConfigurator` consume, and the kf-notify / fourier-carry coordination rows.

**Idiom:** matches `N.md §4` + `WAVES-2.md §N.W18` + the N.W10–N.W17 wave-spec precedent — §-structured,
hard-gate-per-lane, file:line-grounded; every claim cites a `demo/` (or `src/`) file:line, the installed
`node_modules/@mkbabb/glass-ui` dist (3.13.0 today — the BA cut at consume), a BA-letter register
(`../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md`), or a command+output run TODAY
against the working tree (inv ε). **DEVELOPMENT doc — nothing implemented; no source/test/CI edits.**
Every anchor is a SPEC binding-site, not a change.

---

## §0 — One-paragraph reading

N.W18 is the wave where the constellation's value-layer COMMITS to glass-ui's published shape and every
N-interim DIES. value.js consumes glass-ui through a `file:../glass-ui` symlink today
(`package.json:79` — a live local-tree link, the exact thing `inv-N-6` / contract-v2 says must become a
registry pin), and `inv-N-6`'s pin target MOVED from 3.13.0 to the BA cut (4.0.0) because BA's tranche
carries the U-fix mass — the producer-side fixes for ~16 of the 33 U-findings (`N.md §3.1` AMENDED;
`WAVES-2.md:324`; the BA letter Register E `:312-315`). W18.A discharges the pin: it re-points the
manifest to `^4.0.0`, declares the 3.12.0+ transitive peers, drops the phantom `@mkbabb/keyframes.js`
devDep, and runs the FULL inv-N-10 abrogation sweep (`scripts/abrogation-sweep.mjs` — the exports-map diff
+ the `.retired-classes.txt` sweep) against a **dts-complete** 4.0.0 dist (the C-DTS precondition; the
dist-flap that broke this audit's visual lanes twice — BA letter F-1 `:370-372`, R1 §6). Then it adopts
and π-verifies, export-by-export, the producer fixes the R3 waves filed asks for and held interims
against: the dark-material/no-gray tokens (U1 gray half), the spring-clock `--spring-*-duration` pairs
(the U6/U12/U23 root), the dock-FLIP measure fix (U6/U16 CLOSE — the W15.D harness flips green), the
Select content-bound + font-rung prop (U8/U7 — the W13.B interims die), the slider size axis (U28 — the
`[data-size]` interim dies), the `uSatColor[]` satellites (U3's satellite half), the `WatercolorDot
variant="ghost"` (U18/U22 — the W14.E `.dashed-well`/`watercolor-swatch` interim dies), the Skeleton
`surface="glass"`, the menu-glass register, the GooBlob visibility/PRM + zombie-canvas fixes, the
card-shrink composited keyframes, the `--dock-morph-t` cascade narrowing, the aurora DPR cap, the
per-density dock glyph, the `AuroraConfig` descriptor, AND the four enumerated AZ-fleet second-consumer
adopts (`Button size="icon-sm"`, `Select size`-rung, `clampLabel`, `Tooltip` mono — checklist-driven, un-named
adopts skip quietly). W18.B consumes the published `EasingConfigurator` (the C-3 cross-repo primitive),
deleting `EasingSelector.vue` and the W16.B interim per the three-way boundary law (math = value.js ·
time/spring = kf · component = glass-ui). W18.C records the kf-notify state (0.12.0 DISCHARGED; the
witness-flips are kf's L-side) + the two genuine net-new value.js grammars for the post-N successor
(VJ.W1 scroll-timeline, VJ.W2 `sampleColorRamp` — recommended FOLDED into N's library track per
`GRAMMAR-FOLD.md`, not deferred). W18.D carries the fourier rows unchanged. The hard gate: the BA cut on
the registry; the abrogation sweep green vs a dts-complete dist; the producer fixes π'd one by one; ZERO
interim shims surviving (grep the named interims → 0). The whole wave is a PUBLISHED-consume — never a
`file:` link or vendored copy across the acyclic spine (glass-ui → value.js → keyframes, each one tranche
behind).

---

## §Provenance — the audit lanes + file:line roots

| Source | What it provides | Locus |
|---|---|---|
| User audit **U-fix mass** (U1/U3/U6/U7/U8/U16/U18/U22/U23/U27/U28/U33) | the ~16-of-33 findings that "collapse to consume the BA cut" — the producer-side halves the R3 waves filed asks for | `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md` (cited per finding below); `docs/tranches/N/audit/lanes2/X-GU.md §5.2` (the overlap matrix) |
| Lane **X-GU** | the overlap matrix (~16 U-findings → "consume the BA cut"); §5.2 the pin-target move 3.13.0 → 4.0.0; the abrogation-sweep-against-dts-complete-dist precondition | `docs/tranches/N/audit/lanes2/X-GU.md §5.2` |
| Lane **X-KF** | the census correction, the 12-row witness-flip slate, the does-NOT-flip ledger, the easing hand-off, the VJ statuses — "verified clean at the fold, no addendum owed" | `docs/tranches/N/audit/lanes2/X-KF.md §§0-1,6` |
| **The BA ask letter** (the binding cross-repo input) | the X-GU-ITEMS registers — A (shipped mechanisms broken), A′ (the perf producer cluster), B (the P9 emission class), C (new capabilities: C-1 `uSatColor[]`, C-2 watercolor ghost, C-3 easing-configurator), D (confirmations), E (the cut), F (the standing `N.md §8` carries) + the fold-by-batch deadline table | `../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md` (registers A `:27-180`, B `:184-205`, C `:209-290`, D `:294-306`, E `:310-321`, A′ `:333-366`, F `:368-383`, deadlines `:385-393`) |
| **The kf ask letter** (X-KF-ITEMS) | the keyframes-side N2 asks — census correction, witness-flip slate, the easing hand-off, VJ statuses; verified clean, no addendum owed | `../keyframes.js/docs/tranches/K/VALUEJS-N2-ASKS.md` |
| **The kf grammar asks** (the post-N successor dispatch) | VJ.W1 scroll-timeline grammar + VJ.W2 `sampleColorRamp` — the two net-new value.js grammars kf-K's Band-II W9/W10 gate on | `../keyframes.js/docs/tranches/K/KF-TO-VALUEJS-GRAMMAR-ASKS.md`; `EXECUTION-ORCHESTRATION.md §3`; `GRAMMAR-FOLD.md` |
| WAVES-2 §N.W18 | the ratified lane table A–D + the preamble (the registers cited by id; BA GREENLIT-and-executing) + the hard gate (the cut, the abrogation sweep vs dts-complete dist, the π'd verifications, zero interim shims) | `docs/tranches/N/WAVES-2.md:204-231` |
| WAVES-2 §4 (inv deltas) | inv-N-6 pin AMENDED 3.13.0 → the BA cut, discharged at W18.A, gated only on the cut | `docs/tranches/N/WAVES-2.md:324` |
| WAVES-2 §5 (coverage) | the W18.A-routed rows: every "→ W18.A" parenthetical (the blocked halves' landing site); U27 → W18.B; the AZ-fleet adopt rows; the glass-ui cohort rows | `docs/tranches/N/WAVES-2.md:341-376` |
| WAVES-2 §6 (critic fold) | K1-F4 (3.13.0 IS cut, pin = the BA cut 4.0.0); K3-D1/D2 (the A′/F registers FILED); K3-D3 (BA GREENLIT-executing); K3-D4 (the `dist/components/` `.vue.d.ts`-only mechanism); K3-D5 (inv-N-6 in-place echoes amended) | `docs/tranches/N/WAVES-2.md:415,426-436` |
| EXECUTION-ORCHESTRATION §0/§2/§4/§5 | R4 placement; the cross-repo gate (BA 4.0.0 → N.W18 + N.W9′); the acyclic-spine cadence; the dispatch gate (the BA cut is the only external blocker) | `docs/tranches/N/EXECUTION-ORCHESTRATION.md:30,34,46-50,75,128-159` |
| `cross-repo-dev-resolution.md` (contract-v2) | the resolution edict — consumers resolve `dist/`, NO `file:` link as a tracked target, NO vendored copy; the 3-key exports shape; the abrogation hazard the pin-move closes | `docs/precepts/cross-repo-dev-resolution.md §1.2,§2.1,§2.4,§6` |
| `N.md §3,§6,§8,§9` | the topology (value.js the pure sink; the pin move; inv-N-6 / inv-N-10); §8 the cohort-coordination asks (now all FILED in the BA letter); §9 the BOOK-with-trigger pin | `docs/tranches/N/N.md:121-138,182-213,227-256` |

**Source-tree roots (the live consume substrate + the interim-shim sites, all verified 2026-06-15 at `tranche-f-handoff`):**

| File:line | What lives there | Lane |
|---|---|---|
| `package.json:79` | `"@mkbabb/glass-ui": "file:../glass-ui"` — the LOCAL link that W18.A re-points to `^4.0.0` (the inv-N-6 / contract-v2 close) | A |
| `package.json:80` | `"@mkbabb/keyframes.js": "file:../keyframes.js"` — the phantom devDep (value.js imports it nowhere; `N.md §3.2` "drop the phantom") | A |
| `node_modules/@mkbabb/glass-ui` → `../../../glass-ui` | the live `file:` symlink resolving to glass-ui's WIP tree at 3.13.0 — the resolution W18.A converts to a registry consume | A |
| `node_modules/@mkbabb/glass-ui/.retired-classes.txt` | the BA-retired-class manifest the abrogation sweep reads (today carries `glass-elevated`/`glass-subtle`/`dock-group`/… ; the 4.0.0 cut appends the BA-retired set — tabs breaks, Dialog `variant`, `.scroll-fade-*`, `sparkle-sweep`, `btn-audacious`) | A |
| `scripts/abrogation-sweep.mjs:1-40` | the inv-N-10 sweep machinery: step 1 EXPORTS-MAP DIFF (every `@mkbabb/glass-ui/<subpath>` import resolves to a live `exports` entry) + step 2 RETIRED-CLASSES SWEEP (every manifest class grepped against demo usage) | A |
| `demo/@/components/custom/mix/MixSourceSelector.vue:4`, `demo/@/components/custom/panes/PaneSegmentedControl.vue:18` | `import { SegmentedTabs } from "@mkbabb/glass-ui/tabs"` — the tabs consume the 4.0.0 `segmented`→`pill` / `ui/Tabs`-leaving abrogation row hits BY NAME (BA letter E `:316-320`) | A |
| `demo/@/styles/utils.css:52,56`, `demo/@/components/custom/mix/MixSourceSelector.vue:115,148` | the W14.E watercolor-ghost INTERIM: the minted `.dashed-well` (`utils.css:56`) + the bare `watercolor-swatch` class on the add-slot (`MixSourceSelector.vue:148`) — DIES at the `WatercolorDot variant="ghost"` consume (C-2) | A |
| `demo/@/components/custom/gradient/EasingSelector.vue` (the whole 66-LoC component) | the W16.B easing INTERIM — restyled in place at W16.B, DELETED at W18.B when the `EasingConfigurator` publishes (C-3) | B |
| `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16,21,32` | the `size="icon"` sites carrying a literal `<!-- TODO: collapse to <Button size='icon-sm'> when glass-ui ships the rung -->` — the AZ-fleet `icon-sm` adopt, checklist-driven | A |
| `demo/@/components/custom/dock/DockViewSelect.vue:50` | the `line-clamp-1 ... Root fix is a clampLabel` comment — the AZ-fleet `clampLabel` adopt site | A |
| `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:16-18` | the `Tooltip`/`TooltipTrigger` sites — the AZ-fleet `Tooltip` mono adopt | A |
| `demo/@/components/custom/palette-browser/PaletteCardSkeleton.vue` | the bespoke skeleton (`bg-foreground/[0.04]` over `bg-card` — the "too black" composite) re-authored onto `<Skeleton surface="glass">` at the pin (BA letter D-1 `:296-300`) | A |
| `src/composables/...` (consume-only — the `uSatColor[]`/`AuroraConfig` consume is glass-ui-shader-side; value.js's `deriveBlobPalette` already plumbs `paletteStops`) | the value.js-side consume surface for C-1/F-3 (value.js authors NO shader; it consumes the producer's new uniform routing) | A |

---

## §State-verified — the defect/absence proven TODAY (2026-06-15)

Every claim below is a command run against the working tree at `tranche-f-handoff` / the installed
`node_modules/@mkbabb/glass-ui` (3.13.0) / the BA ask letter. No repo edits. The probes are the born-RED
witnesses the §Hard gate inverts. For the BA-gated halves the born-RED is the **capability-present-but-
consumed-from-WIP** sense (the pin is `file:`, not a registry tag) and the **producer-fix-not-yet-landed**
sense (the 4.0.0 fixes are filed asks, the dist is still 3.13.0); both are falsifiable TODAY.

### SV-1 — The pin is a `file:` LOCAL link, not a registry consume; inv-N-6 / contract-v2 is born-RED (lane A) — LIVE

```
$ grep -n "glass-ui\|keyframes" package.json
79:        "@mkbabb/glass-ui": "file:../glass-ui",
80:        "@mkbabb/keyframes.js": "file:../keyframes.js",
$ ls -la node_modules/@mkbabb/glass-ui
lrwxr-xr-x  …  glass-ui -> ../../../glass-ui          ← a live symlink into glass-ui's WIP tree
$ cat node_modules/@mkbabb/glass-ui/package.json | grep -m1 version
    "version": "3.13.0",
```

**Confirmed born-RED.** value.js resolves glass-ui through a `file:../glass-ui` symlink
(`package.json:79`) into glass-ui's live working tree (currently 3.13.0). This is exactly the resolution
`inv-N-6` ("registry consumption at close — glass-ui `^3.13.0`/the BA cut, no `file:`"; `N.md §6.6`) and
contract-v2 (`cross-repo-dev-resolution.md §2.4` "no checked-in `dist/` artefact as a tracked resolution
target"; §6 "the sibling resolves to `dist/` — never `src/`") forbid at close. W18.A converts it to
`^4.0.0` at the BA cut. The phantom `@mkbabb/keyframes.js` devDep (`:80`) — imported NOWHERE in value.js
(`N.md §3.2`, E6) — is dropped in the same lane. Born-RED: the `file:` link + the phantom devDep are live.

### SV-2 — The BA cut (4.0.0) is NOT on the registry; the dist is 3.13.0 (the wait gate) (lane A) — LIVE

```
$ cat node_modules/@mkbabb/glass-ui/package.json | grep -m1 version   →  3.13.0
$ node -e "const p=require('@mkbabb/glass-ui/package.json'); console.log(JSON.stringify(Object.keys(p.exports['.'])))"
["types","import","default"]                                          ← contract-v2 3-key shape (no `development`)
```

**Confirmed.** The installed glass-ui is **3.13.0**, not the BA cut. W18 GATES on the 4.0.0 publish
(`EXECUTION-ORCHESTRATION.md §5` "glass-ui BA 4.0.0 cut → unblocks N.W18 + N.W9′"; the dispatch table).
The cut is LIVE and on track (`EXECUTION-ORCHESTRATION.md §0` "tranche/BA cutting 4.0.0 — LIVE, 'Batch 4
closed, six glass-grammar waves live-verified'"). The 3.13.0 dist ALREADY carries the contract-v2 3-key
exports shape (`types`/`import`/`default`, no `development` branch) — so the pin-move is a version bump,
not an exports-shape migration. Born-RED in the **producer-fix-not-yet-published** sense: the U-fix mass
lands at 4.0.0, which is not yet on the registry.

### SV-3 — The abrogation sweep machinery EXISTS and reads the `.retired-classes.txt` manifest (lane A) — LIVE-GREEN-WILL-RED-AT-BUMP

```
$ head -25 scripts/abrogation-sweep.mjs
… inv-N-10 pin-bump abrogation sweep …
  1 · EXPORTS-MAP DIFF — every `@mkbabb/glass-ui/<subpath>` import specifier used across demo/
      must resolve to a live entry in the installed glass-ui `package.json#exports`.
  2 · RETIRED-CLASSES SWEEP — every class name in glass-ui's upstream abrogation manifest
      (`.retired-classes.txt`) is grepped against demo/ class usage.
$ cat node_modules/@mkbabb/glass-ui/.retired-classes.txt | grep -v '^#' | grep .
glass-subtle  glass-medium  glass-default  glass-elevated  glass-cartoon  cartoon-card
elevated-card  icon-tooltip-trigger  dock-group  instrument-rail  instrument-rail-status
```

**Confirmed.** `scripts/abrogation-sweep.mjs` is the inv-N-10 sweep (the exports-map diff + the
retired-classes grep). The manifest currently lists the historical glass-ui retirals (all green in the
demo since N.W5.E extirpated `glass-elevated`/`glass-subtle`). At the 4.0.0 cut the manifest appends BA's
retired set (the tabs `segmented`→`pill` break, the Dialog `variant`→`surface` move, `.scroll-fade-*`,
`sparkle-sweep`, `btn-audacious` — BA letter E `:316-320`), and the sweep RE-RUNS against the demo's
new-consume surface. Born-RED: the sweep is green TODAY against 3.13.0; it is EXPECTED to surface any
demo site that still references a 4.0.0-retired class at the bump (the inv-N-10 "break loudly at the
bump, never silently" posture; `N.md §6.10`). The C-DTS precondition (BA letter F-1) means the typecheck
arm of the sweep runs against a dts-complete 4.0.0 dist — the dist-flap that RED-flapped earlier audits
must be closed before the sweep is trustworthy (R1 §6).

### SV-4 — The tabs consume hits the 4.0.0 abrogation row BY NAME (lane A) — LIVE

```
$ grep -rn '@mkbabb/glass-ui/tabs\|SegmentedTabs' demo --include="*.vue" | head
MixSourceSelector.vue:4:    import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
MixSourceSelector.vue:104:  <SegmentedTabs …>
PaneSegmentedControl.vue:6:  <SegmentedTabs …>
PaneSegmentedControl.vue:18:   import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
```

**Confirmed born-RED.** value.js consumes `SegmentedTabs` from `@mkbabb/glass-ui/tabs` at two live sites
(`MixSourceSelector.vue:4`, `PaneSegmentedControl.vue:18`). BA's 4.0.0 cut notes owe value.js BY NAME the
tabs break (`SegmentedTabs` `segmented`→`pill`, `ui/Tabs` leaving the public surface; BA letter E `:316`).
W18.A's abrogation sweep verifies this consume against the 4.0.0 exports-map (step 1) and the retired
manifest (step 2): if BA renames the `segmented` variant, the demo's call sites must follow at the same
bump or the sweep reds. Born-RED: the consume is live on a surface BA renames at the cut.

### SV-5 — The watercolor-ghost INTERIM is live in the demo; the `WatercolorDot variant="ghost"` is unconsumed (lane A, U18/U22) — LIVE

```
$ grep -rn "dashed-well\|watercolor-swatch" demo --include="*.vue" --include="*.css"
utils.css:52:  * used `.dashed-well` as a never-defined phantom (inv-N-7); this mints the
utils.css:56:.dashed-well { … }                                              ← the W14.E interim
MixSourceSelector.vue:115:  <div class="dashed-well">
MixSourceSelector.vue:148:  class="… watercolor-swatch border-2 border-dashed border-primary/30 …"   ← CSS dashed rect
```

**Confirmed born-RED.** The empty-palette-slot affordance is a CSS dashed rectangle
(`MixSourceSelector.vue:148` — `border-dashed border-primary/30`) inside a minted `.dashed-well`
(`utils.css:56`) — the W14.E INTERIM. The user rejected exactly this ("not a proper watercolor ghost",
U22; "the dashed outline = a dashed/GHOST variant of the watercolor dot, abstracted to glass-ui", U18; BA
letter C-2 `:245-260`). `WatercolorDot.vue` ships NO `variant`/`ghost`/`outline` axis today (BA letter
C-2 `:250-253`); the 4.0.0 cut adds it, and W18.A DELETES the `.dashed-well` + `watercolor-swatch`
interim for the published ghost register. Born-RED: the dashed-rect interim is live; the ghost variant is
a filed-not-yet-shipped ask.

### SV-6 — The easing INTERIM (`EasingSelector.vue`) is live; the `EasingConfigurator` primitive does not exist (lane B, U27) — LIVE

```
$ ls -la demo/@/components/custom/gradient/EasingSelector.vue
-rw-r--r--  …  2399  EasingSelector.vue                              ← the W16.B interim, live
$ grep -rl "EasingConfigurator\|easing-configurator" node_modules/@mkbabb/glass-ui/dist 2>/dev/null
(none)                                                                ← the primitive is unpublished
```

**Confirmed born-RED (capability-ABSENT sense).** `EasingSelector.vue` is the W16.B in-repo INTERIM
(restyled in place at W16.B; the `hsl(248,88%,71%)` literal killed there). glass-ui ships NO
`EasingConfigurator`/`EasingPicker` — the C-3 ask is the ONE genuinely net-new cross-repo primitive (the
three-way boundary law: curve MATH = value.js · playback/spring = kf · editor COMPONENT = glass-ui; BA
letter C-3 `:262-290`; X-KF §0-1). The kf trio is the richest donor (`EasingEditor.vue` + the 385-LoC
`EasingCurveCanvas.vue` + `EasingSelect.vue`), BA's `BezierEditor` folds in, value.js supplies the math
(`bezierPresets`/`CSSCubicBezier`/`timingFunctions` — barrel-exported, `src/index.ts:226-238`). W18.B
consumes the published primitive and DELETES `EasingSelector.vue`. Born-RED: the interim is live; the
primitive is absent from the glass-ui dist.

### SV-7 — The AZ-fleet adopt sites carry explicit "when glass-ui ships the rung" markers (lane A) — LIVE

```
$ grep -rn "icon-sm\|clampLabel\|when glass-ui ships" demo --include="*.vue"
PaletteSlugBar.vue:16:  <!-- TODO: collapse to <Button size='icon-sm'> when glass-ui ships the rung (Q.md ask #7) -->
PaletteSlugBar.vue:21:    size="icon"                                   ← the interim full-icon rung
DockViewSelect.vue:50:   line-clamp-1 on the trigger label span. Root fix is a `clampLabel`
$ grep -rn "TooltipTrigger\|TooltipProvider" demo/@/components/custom/color-picker/controls/ComponentSliders.vue
16:  <TooltipProvider :delay-duration="300">
17:  <Tooltip v-for="[component] in componentEntries" …>
18:  <TooltipTrigger as-child>
```

**Confirmed born-RED.** The demo carries the FOUR enumerated AZ-fleet second-consumer adopt sites with
explicit in-source markers: `Button size="icon-sm"` (`PaletteSlugBar.vue:16` — a literal
"when glass-ui ships the rung" TODO over the `size="icon"` interim), `clampLabel`
(`DockViewSelect.vue:50` — "Root fix is a `clampLabel`"), the `Select size`-rung (the U7 font-rung prop,
BA letter A-2/WO-3 `:99-108`), and `Tooltip` mono (`ComponentSliders.vue:16-18`). These are
CHECKLIST-DRIVEN: a named adopt that the 4.0.0 cut ships gets consumed; an un-named/un-shipped adopt
skips QUIETLY at the pin (`WAVES-2.md:223` "checklist-driven — un-named adopts skip quietly at the pin").
Born-RED: the interim full-icon rung + the manual `line-clamp-1` are live, marked for the rung.

### SV-8 — The BA letter registers are FILED and carry fold-by-batch deadlines (lane A/B) — LIVE

```
$ ls -la ../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md   →  29640 bytes, present
$ grep -nE "^### (A-[0-9]|A′-[0-9]|C-[0-9]|F-[0-9])|^## Register" \
     ../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md | head
## Register A — shipped mechanisms broken …
### A-1 — the dock morph FLIP measures … to:0px …
### A-2 — the Select/dropdown work-order …
### A-3 — the Slider size axis is structurally dead …
### A-4 — the aurora breathing motion register is dead …
### A-5 — the SegmentedTabs pill indicator …
## Register B — the systemic class … (the P9 class)
## Register C — new capability …  (C-1 uSatColor[], C-2 ghost, C-3 easing-configurator)
### A′-1 … GooBlob … zombie second canvas …  ### A′-2 … no visibility/PRM gate …
### F-1 — C-DTS …  ### F-2 — the value.js version ranges …
```

**Confirmed.** Every glass-ui ask W18 consumes is FILED in the BA letter with a live trace and a
fold-by-batch deadline (the letter `:385-393` deadline table). The K3 coverage hole is closed — the A′
perf cluster (GooBlob zombie/visibility/PRM, card-shrink keyframes, `--dock-morph-t` cascade, aurora DPR,
per-density glyph) and the F register (C-DTS, the version ranges, `AuroraConfig`, the retired-classes
manifest) are ALL named (`WAVES-2.md:426-432`, the K3-D1/D2 fold). BA is GREENLIT-and-executing (the
letter addendum `:329` "Batch 0 underway"). Born-RED in the **producer-fix-pending** sense: the asks are
filed, the fixes land at the 4.0.0 cut, the consume is W18's.

### SV-9 — The kf 0.12.0 notify is DISCHARGED; the two net-new grammars are recorded for the successor (lane C) — LIVE

```
$ grep -n "value.js" ../keyframes.js/package.json | head
179:        "@mkbabb/value.js": "^0.11.2",                            ← kf pins ^0.11.2 (satisfied)
$ ls -la ../keyframes.js/docs/tranches/K/KF-TO-VALUEJS-GRAMMAR-ASKS.md   →  20703 bytes, present
$ grep -n "VJ.W1\|VJ.W2\|sampleColorRamp\|scroll-timeline" docs/tranches/N/WAVES-2.md | head
308: …VJ.W1 scroll-timeline grammar · VJ.W2 `sampleColorRamp` (kf-L gates; correctly absent from N)
```

**Confirmed.** keyframes pins `@mkbabb/value.js ^0.11.2` (`../keyframes.js/package.json:179`), satisfied
by the published 0.12.0; the 0.12.0 notify is DISCHARGED (`WAVES-2.md:225` "0.12.0 notify DISCHARGED; the
witness flips are kf's L-tranche side — no N work owed"). The two genuine net-new value.js grammars kf-K
gates on — **VJ.W1** (the `CSSTimelineOptions` scroll-timeline grammar) and **VJ.W2**
(`sampleColorRamp`) — were originally W18.C's "record for the post-N successor" line, but are now
**FOLDED into N's R2 library track and RATIFIED (2026-06-15)**: VJ.W2 → **N.W11.D**, VJ.W1 → **N.W11′**,
both shipping in **0.13.0** (`N.md §3`/§4.1; `EXECUTION-ORCHESTRATION.md §3`; `GRAMMAR-FOLD.md`; the
post-N Tranche O fallback was NOT elected). Born-RED: the kf consume edge for the grammars is unlit
(the symbols are absent at 0.12.0) and lights on the 0.13.0 publish; W18.C carries only the kf NOTIFY at
the cut — the grammar IMPLEMENTATION itself rides N.W11.D / N.W11′, not this cross-repo wave.

### SV-gate-opener — The R3 interims this wave KILLS are themselves born-RED-pending-W13/W14 (cross-wave) — LIVE-IN-DESIGN

The interims W18 deletes (the `[data-size]` slider scope, the Select `max-h-[min(24rem,60dvh)]` cap, the
`WatercolorDot variant="ghost"` stand-in) are MINTED by the R3 waves (W13.A/B, W14.E) — they do not all
exist at HEAD because those waves are unratified-future. What IS live at HEAD is the SUBSTRATE they
replace: the `.dashed-well`/`watercolor-swatch` dashed-rect (SV-5), the manual `line-clamp-1` +
`size="icon"` (SV-7), and the `file:` pin itself (SV-1). The W18 interim-death gate (grep the named
interims → 0) is therefore a TWO-PHASE born-RED: the W13/W14-minted interims are born-RED the moment
their wave lands, and W18 is the wave that PROVES they are gone. This is the ratified ordering
(`WAVES-2.md:74` "each carries `[data-*]` interims for the BA-axis fixes that close at W18";
`EXECUTION-ORCHESTRATION.md §2` R3→R4). The probes above (SV-5/SV-7) witness the live substrate; the
interim-death is the W18-specific gate over the R3-minted scaffolding.

---

## §Goal

**Goal criterion.** value.js consumes glass-ui as a PUBLISHED registry dependency at the BA cut, and
every N-interim is dead.

- **The pin is registry, not `file:`.** `@mkbabb/glass-ui` resolves to `^4.0.0` from the registry (the
  `file:../glass-ui` link gone), the 3.12.0+ transitive peers (`pencil-boil`, `perfect-freehand`) are
  declared, and the phantom `@mkbabb/keyframes.js` devDep is dropped (`N.md §3` / inv-N-6 / contract-v2).
  The resolution is `dist/`-through-`exports`, dev and prod alike — never `src/`, never a vendored copy.
- **The abrogation sweep is GREEN against a dts-complete 4.0.0 dist.** `scripts/abrogation-sweep.mjs` runs
  the full inv-N-10 sweep (exports-map diff + `.retired-classes.txt` sweep) against the 4.0.0 retired set
  (the tabs `segmented`→`pill`, Dialog `variant`→`surface`, `.scroll-fade-*`, `sparkle-sweep`,
  `btn-audacious`); the C-DTS precondition holds (the dist emits declarations, so the typecheck arm is
  trustworthy); zero surviving demo references to any retired class.
- **The producer fixes are ADOPTED and π-VERIFIED, export-by-export.** The dark-material/no-gray tokens
  (U1 gray half), the spring-clock `--spring-*-duration` pairs (U6/U12/U23 root), the dock-FLIP measure
  fix (U6/U16 CLOSE — the W15.D morph-truth harness flips green), the Select content-bound + font-rung
  prop (U8/U7 — the W13.B interims die), the slider size axis (U28 — the `[data-size]` interim dies), the
  `uSatColor[]` satellites (U3's satellite half — π'd visibly shaded), the `WatercolorDot variant="ghost"`
  (U18/U22 — the dashed-rect interim dies), the `Skeleton surface="glass"`, the menu-glass register, the
  dark-arm atmosphere re-verify (D5-10), the GooBlob visibility/PRM + zombie-canvas (A′-1/A′-2), the
  card-shrink composited keyframes (A′-3), the `--dock-morph-t` cascade narrowing (A′-4), the aurora DPR
  cap (A′-5), the per-density dock glyph (A′-6), the `AuroraConfig` descriptor (F-3) — each consumed and
  its π pair captured.
- **The four AZ-fleet adopts land or skip by checklist.** `Button size="icon-sm"`, `Select size`-rung,
  `clampLabel`, `Tooltip` mono — each consumed if the 4.0.0 cut ships it; un-named/un-shipped adopts skip
  quietly. No interim full-icon rung, no manual `line-clamp-1`, where the published rung exists.
- **The easing-configurator is consumed; the interim is deleted.** `EasingSelector.vue` and the W16.B
  in-repo restyle are DELETED; value.js consumes the published `EasingConfigurator` per D2's consume spec
  (chip rail + one configurator per selected interval), honoring the three-way boundary law.
- **kf/fourier coordination is recorded.** The kf 0.12.0 notify is discharged; the witness-flips are kf's
  L-side (no N work owed); the two net-new grammars (VJ.W1 scroll-timeline, VJ.W2 `sampleColorRamp`) are
  recorded for the successor (or folded into the library track per `GRAMMAR-FOLD.md`); fourier's rows
  (conformance-matrix corrections + the `^0.11.0` web bump) carry unchanged (fourier-owned).

**Completion criterion.** All §Hard-gate clauses verify against artefacts: the manifest pins `^4.0.0`
(no `file:`); the abrogation sweep exits 0 vs a dts-complete dist; each producer fix's π pair is captured
(dock morph monotone non-zero `to`, dropdown bounded + inner-scroll, slider 20/28px, satellites visibly
shaded, ghost watercolor-true); ZERO interim shims surviving (grep the named interims → 0);
`EasingSelector.vue` absent; the AZ-fleet adopts landed-or-skipped by checklist; the kf/fourier rows
recorded. The wave GATES on the BA cut being on the registry — if the cut lags, W18 holds (the pin is the
gate, not the work; `WAVES-2.md:263`).

---

## §Scope — the lanes, each at the gestalt seam

The wave touches exactly: the `package.json` glass-ui pin + the transitive peers + the phantom devDep
(lane A); the abrogation-sweep run + the demo's retired-class-consuming sites (lane A); the demo's
interim-shim sites that the producer fixes retire (lane A); `EasingSelector.vue` + the gradient pane's
easing consume (lane B); and the kf/fourier coordination records (lanes C/D — DOC rows, no value.js code).
It CONSUMES the published glass-ui 4.0.0 dist through the `exports` map; it authors NO glass-ui code (the
producer fixes are glass-ui's — inv-16 / the foreign-repo fence). No library `src/` change beyond the
consume surface (the `uSatColor[]`/`AuroraConfig` consume is shader-side in glass-ui; value.js's
`deriveBlobPalette` already plumbs `paletteStops`). No test/CI edits beyond re-running the existing
abrogation sweep + boot-smoke against the new pin. (DEVELOPMENT doc — SPEC bounds, not an implementation.)

| Lane | Work | Anchors | Seam |
|---|---|---|---|
| **A — The BA-cut consume sweep** | **The pin re-target**: `@mkbabb/glass-ui` `file:../glass-ui` → `^4.0.0` (`package.json:79`); declare the 3.12.0+ transitive peers (`pencil-boil`, `perfect-freehand`); drop the phantom `@mkbabb/keyframes.js` devDep (`:80`). **The full inv-N-10 abrogation sweep** (`scripts/abrogation-sweep.mjs`) against the 4.0.0 retired set, **against a dts-complete dist** (the C-DTS precondition; F-1). **Adopt + π-verify**, export-by-export: dark-material/no-gray tokens (U1 gray half); spring-clock `--spring-*-duration` (U6/U12/U23 root); dock-FLIP fix (U6/U16 CLOSE — the W15.D harness flips green; A-1); Select content-bound + font-rung prop (U8/U7 — the W13.B `max-h-[…]`/font-override interims DIE; A-2/WO-1/WO-3); slider size axis (U28 — the `[data-size]` interim DIES; A-3); `uSatColor[]` satellites (U3 satellite half; C-1) + the `bodyLightness` floor companion; `WatercolorDot variant="ghost"` (U18/U22 — the `.dashed-well`/`watercolor-swatch` interim DIES; C-2); `Skeleton surface="glass"` (D-1); menu-glass (W-MENU-GLASS); dark-arm re-verify (D5-10); GooBlob visibility/PRM + zombie canvas (A′-1/A′-2); card-shrink composited keyframes (A′-3); the `--dock-morph-t` cascade narrowing (A′-4); aurora DPR cap (A′-5); per-density dock glyph (A′-6 — the `--dock-icon-glyph` override DIES); `AuroraConfig` descriptor (F-3 — BlobPane/AuroraPane refinement); **the four AZ-fleet adopts** (`Button size="icon-sm"` · `Select size`-rung · `clampLabel` · `Tooltip` mono — checklist-driven; un-named adopts skip quietly) | `package.json:79-80`; `scripts/abrogation-sweep.mjs`; `node_modules/@mkbabb/glass-ui/.retired-classes.txt`; `MixSourceSelector.vue:4,115,148`; `PaneSegmentedControl.vue:18`; `utils.css:56`; `PaletteSlugBar.vue:16,21`; `DockViewSelect.vue:50`; `ComponentSliders.vue:16-18`; `PaletteCardSkeleton.vue` | the consume-at-pin seam — the registry tag replaces the local link; every producer fix consumed + π'd; every interim deleted |
| **B — Easing-configurator consume (U27)** | The three-way boundary law holds (math = value.js · time/spring = kf · component = glass-ui): when glass-ui publishes `EasingConfigurator` (the C-3 ask — D2 §1.3 is the port spec; the kf trio is the donor, BA's `BezierEditor` folds in, U8's bound ships inside it), value.js DELETES `EasingSelector.vue` and the W16.B interim, consuming `EasingConfigurator` per D2's consume spec (chip rail + one configurator per selected interval) | `EasingSelector.vue` (DELETE); the gradient pane's easing-section consume site; `src/index.ts:226-238` (the math barrel the configurator consumes) | the boundary-law seam — value.js the math substrate, glass-ui the component, the donor's editor consumed not re-forked |
| **C — keyframes coordination** | 0.12.0 notify DISCHARGED; the witness-flips (MCI-5 et al.) are kf's L-tranche side — no N work owed; **record for the post-N successor**: VJ.W1 scroll-timeline grammar + VJ.W2 `sampleColorRamp` (the two genuine net-new value.js grammars kf-K's Band-II gates on — recorded absent from N; the `GRAMMAR-FOLD.md` recommendation folds them into N's library track → 0.13.0) | `../keyframes.js/package.json:179` (the `^0.11.2` pin, satisfied); `../keyframes.js/docs/tranches/K/VALUEJS-N2-ASKS.md`; `../keyframes.js/docs/tranches/K/KF-TO-VALUEJS-GRAMMAR-ASKS.md`; `GRAMMAR-FOLD.md` | the kf-coordination seam — the notify discharged, the grammars handed to the successor (or folded), the spine acyclic |
| **D — fourier coordination** | Carries unchanged: conformance-matrix corrections (the fictional value.js test paths; the URN rows per the W3.H decision) + fourier-web `@mkbabb/value.js ^0.10.0 → ^0.11.0` bump — both fourier-OWNED (value.js files the ask, fourier executes) | `N.md §8` (fourier-owned rows); the cross-repo conformance matrix | the fourier-coordination seam — the matrix correction + the peer bump, fourier's to land |

**Note on lane A vs the producer fence.** Every adopt in lane A consumes a glass-ui-AUTHORED fix. value.js
writes no glass-ui code (inv-16; `N.md §8` "asks, not value.js writes"). The dock-FLIP fix (A-1), the
Select bound (A-2), the slider size axis (A-3), the `uSatColor[]` routing (C-1), the GooBlob gates
(A′-1/A′-2), the card keyframes (A′-3) — all land in glass-ui's BA waves and value.js consumes the
published result. The value.js-side work is the pin, the sweep, the consume-wiring, the interim deletions,
and the π capture. The `[data-size]`/`max-h-[…]`/`.dashed-well` interims that DIE are demo-side (W13/W14
minted them; W18 deletes them) — the producer fix makes them unnecessary.

---

## §Hard gate — FALSIFIABLE, born-RED-witnessable on a named defect tree TODAY

The wave closes when ALL clauses verify against artefacts. Each is falsifiable and born-RED today (per the
SV-N probes). The born-RED senses, named: (a) **`file:`-not-registry** (SV-1 — the pin is a local link);
(b) **producer-fix-pending** (SV-2/SV-8 — the 4.0.0 fixes are filed asks, the dist is 3.13.0); (c)
**interim-live** (SV-5/SV-7 — the dashed-rect / manual line-clamp / full-icon-rung substrate is live); (d)
**capability-ABSENT** (SV-6 — the `EasingConfigurator` is unpublished). P6 posture (the π / measured-
evidence discipline) is named per clause. **This rides N.W18's WAVES-2 gate verbatim** (`WAVES-2.md:228-231`
— "the BA cut on the registry; abrogation sweep green vs a dts-complete dist; the producer-fix
verifications π'd one by one … zero interim shims surviving (grep the named interims → 0)") — the clauses
below decompose it.

| # | Clause | Falsifiable test | Born-RED today | P6 posture |
|---|---|---|---|---|
| **HG-A1** | The pin is `^4.0.0` from the REGISTRY — no `file:../glass-ui`; the 3.12.0+ transitive peers declared; the phantom `@mkbabb/keyframes.js` devDep dropped | `grep '"@mkbabb/glass-ui"' package.json` shows `^4.0.0` (not `file:`); `grep '@mkbabb/keyframes.js' package.json` = 0; `pencil-boil`/`perfect-freehand` present | YES — SV-1: `file:../glass-ui` (`:79`) + the phantom devDep (`:80`) | **manifest assert** (the pin shape is the measured property) |
| **HG-A2** | The BA cut (4.0.0) is on the registry; the installed dist resolves to `^4.0.0` through `exports`, NOT a `src/` redirect | `npm view @mkbabb/glass-ui version` ≥ 4.0.0; the resolved `node_modules/@mkbabb/glass-ui/package.json` version = 4.x; the `exports["."]` 3-key shape (no `development`) | YES — SV-2: the dist is 3.13.0; 4.0.0 not yet cut | **registry probe** (the cut is the external gate) |
| **HG-A3** | The full inv-N-10 abrogation sweep exits 0 against a DTS-COMPLETE 4.0.0 dist — the exports-map diff clean (every `@mkbabb/glass-ui/<subpath>` import resolves) AND the `.retired-classes.txt` sweep clean (no surviving demo reference to a 4.0.0-retired class) | `node scripts/abrogation-sweep.mjs` exits 0; the 4.0.0 dist emits `.d.ts` (the C-DTS precondition holds — `test` the dist `.d.ts` present); the tabs/`SegmentedTabs` consume follows the 4.0.0 rename | YES — SV-3 (the sweep reads the manifest; green vs 3.13.0, RE-RUNS vs 4.0.0) + SV-4 (the tabs consume on a renamed surface) | **gate run** (exit 0) + **dts-completeness probe** (the C-DTS precondition) |
| **HG-A4** | The dock-FLIP fix is consumed; the W15.D morph-truth harness flips GREEN (the dock morph arms `from:40 → to:≈261`, never `to:0`; zero dead-hold, zero snap; ≥50fps) — U6/U16 CLOSE | the W15.D morph-truth e2e green under 4.0.0 (per-rAF width ∈ span ±5%, no >40% jump, 1%-settle ≤450ms); the four-cycle probe reads a non-zero `to` every cycle (BA letter A-1 acceptance `:55-58`) | YES — born-RED until A-1 (the W15.D harness is born-RED by design; `WAVES-2.md:155-162`) | **π morph-truth e2e** (the harness flips green at the pin) |
| **HG-A5** | The Select content-bound + font-rung prop are consumed; the W13.B interims DIE (the dropdown computes a real `maxHeight`, bottoms inside the viewport, scrolls within; the trigger+items re-resolve on one font rung) | a DOM probe on a 900px viewport: the 16-item color-space dropdown `getComputedStyle(content).maxHeight !== "none"`, bottoms inside the viewport; `grep "max-h-\[min(24rem" demo` = 0 (the W13.B cap interim gone) | YES — born-RED until A-2 (the bound is authored-but-never-emits; the W13.B `max-h-[…]` interim is the stand-in) | **π dropdown-bound DOM probe** + **grep-absence** (the interim → 0) |
| **HG-A6** | The slider size axis is consumed; the `[data-size]` interim DIES (a `size=md` glass-ui Slider renders its track at the real height, not the 6px fallback; the spectrum thumb stays the slim 12px bar) | a DOM probe: `--slider-track-height` resolves (track ≥ 20px at `size=md`, 28px at `lg`); `grep "data-size" demo` (the W13.A interim) = 0 | YES — born-RED until A-3 (the `size` prop is inert in every consumer; the `[data-size]` interim is the stand-in) | **π slider-geometry DOM probe** + **grep-absence** |
| **HG-A7** | The `uSatColor[]` satellites are consumed (the goo blob's satellites render as DERIVED in-family shades, visibly distinct from the body — U3's satellite half) | the π blob pair showing visibly-shaded satellites (the smin neck cross-fades satellite color into body color); a pixel probe of a satellite center vs the body center → non-equal hue/lightness | YES — born-RED until C-1 (`grep uSatColor` in the glass-ui shader = 0; satellites render from the same field) | **π blob element pair** + **pixel-distinctness probe** |
| **HG-A8** | The `WatercolorDot variant="ghost"` is consumed; the W14.E interim DIES (the empty-slot affordance is a PROPER watercolor ghost — the PRNG silhouette as a stroke — not a CSS dashed rectangle) | the π empty-slot pair showing the watercolor ghost; `grep "dashed-well\|watercolor-swatch" demo` = 0 (the W14.E interim gone) | YES — SV-5: the `.dashed-well` dashed-rect + bare `watercolor-swatch` are live | **π ghost element pair** + **grep-absence** (the interim → 0) |
| **HG-A9** | The A′ perf cluster is consumed: GooBlob → exactly one canvas (zombie gone) with a visibility/PRM gate; the card-shrink keyframes composited (scroll-trace CLS ≤ 0.1); the `--dock-morph-t` cascade narrowed (dock morph ≥ 50fps); the aurora DPR capped | a DOM count: one `<canvas>` under `.goo-blob-wrapper`; a PRM-emulated run pauses the blob loop; a scroll-trace CLS ≤ 0.1 with zero non-composited card-shrink flags; the aurora backing ≤ 1.5×DPR | YES — born-RED until A′-1..A′-5 (the producer cluster is FILED; the demo exercises the zombie/CLS/morph live) | **π perf-trace** (CLS, fps, canvas count, PRM-pause) |
| **HG-A10** | The four AZ-fleet adopts land or skip BY CHECKLIST: `Button size="icon-sm"`, `Select size`-rung, `clampLabel`, `Tooltip` mono — each consumed if 4.0.0 ships it (no interim full-icon rung / manual line-clamp where the rung exists); un-named/un-shipped adopts skip quietly | for each adopt the 4.0.0 cut ships: the consume present + the interim gone (`grep 'size="icon"' PaletteSlugBar.vue` → `icon-sm`; `grep "line-clamp-1" DockViewSelect.vue` → `clampLabel`); for each NOT shipped: the interim KEPT, recorded as skipped | YES — SV-7: the `size="icon"` + manual `line-clamp-1` interims carry "when glass-ui ships the rung" markers | **per-adopt checklist** (consume-or-skip, recorded) |
| **HG-B** | `EasingSelector.vue` is DELETED; the gradient pane consumes the published `EasingConfigurator` (chip rail + one configurator per selected interval) per D2's consume spec | `test -f demo/@/components/custom/gradient/EasingSelector.vue` → absent; the gradient pane imports `EasingConfigurator` from the glass-ui subpath; the π easing pair showing the configurator | YES — SV-6: `EasingSelector.vue` live; the `EasingConfigurator` unpublished (capability-ABSENT) | **deletion proof** + **π configurator pair** |
| **HG-C** | The kf coordination is recorded: 0.12.0 notify DISCHARGED (kf pins satisfied); the VJ.W1/VJ.W2 grammars recorded for the successor (or folded per `GRAMMAR-FOLD.md`) — no N library work owed beyond the optional fold | `grep "value.js" ../keyframes.js/package.json` shows a satisfied pin; the WAVES-2/GRAMMAR-FOLD records present; no N.W18 value.js code change for the grammars | YES — SV-9: the notify discharged; the grammars recorded-not-implemented | **record/reconciliation** (the hand-off is a doc row) |
| **HG-D** | The fourier rows carry unchanged (fourier-owned): the conformance-matrix corrections + the fourier-web `^0.11.0` bump are FILED, fourier executes | the fourier asks recorded (`N.md §8`); no value.js code change (the matrix fix + the bump are fourier-side) | YES — `N.md §8`: the fourier rows are asks, not value.js writes | **record** (fourier-owned, no value.js write) |
| **HG-interim-death** | The named R3 interims grep to ZERO across `demo/` — the `[data-size]` slider scope, the Select `max-h-[…]` cap, the `--dock-icon-glyph` override, the `.dashed-well`/`watercolor-swatch` dashed-rect, the `size="icon"`/`line-clamp-1` AZ stand-ins, `EasingSelector.vue` | `grep -rE "data-size\|max-h-\[min\|dock-icon-glyph\|dashed-well\|watercolor-swatch" demo` = 0 (for each producer-fix-landed axis); `test ! -f EasingSelector.vue` | YES — SV-5/SV-7/SV-gate-opener: the live substrate + the W13/W14-minted interims | **grep-census** (the interim count → 0) — the wave's keystone gate |
| **HG-gate-opener** | The producer-fix π pairs (HG-A4..A9, HG-B) are captured against the PUBLISHED 4.0.0 dist (the cut on the registry) AND on a RENDERING desktop (W10.D's cascade kill closed) — until both, the π is structurally blind | the π captured against `npm`-resolved 4.0.0 + a desktop where `display ≠ none @1440` (W10.D green); the abrogation sweep + boot-smoke green on the new pin | YES — SV-2 (the cut pending) + the W10.D cross-wave precondition (the cascade kill is the substrate every π stands on) | **cross-wave precondition** — the BA cut AND W10.D are the substrate gates |

**The gate-opener precondition (cross-wave, BINDING).** W18 is doubly-gated: (1) on the **BA cut (4.0.0)
being on the registry** — the producer fixes do not exist to consume until BA publishes (SV-2; the ONE
external dispatch gate, `EXECUTION-ORCHESTRATION.md §5`); and (2) on **N.W10.D's cascade kill** — until
the desktop renders, every producer-fix π pair (the dock morph, the dropdown bound, the slider geometry,
the satellite shading, the ghost) is structurally blind (the same blindspot class the gate-opener names;
`EXECUTION-ORCHESTRATION.md:56-62`; inv-N-11). W18's SOURCE-SHAPE gates (HG-A1 the pin, HG-A3 the sweep,
HG-A5/A6/A8 the grep-absences, HG-B the deletion, HG-interim-death the census) are demo-INDEPENDENT and
provable WITHOUT the demo rendering — only the VISUAL π pairs sit behind the cut + W10.D. The pin, the
sweep, and the interim-death grep do not wait on the desktop; the π does. **If the BA cut lags, W18 holds
— the pin is the gate, not the work** (`WAVES-2.md:263`; the BOOK-with-trigger posture, `N.md §9`).

---

## §No-workaround — the named forbidden shortcuts for THIS wave

- **NO `file:` link / vendored copy across the spine.** glass-ui is consumed as a PUBLISHED registry
  dependency at `^4.0.0` — NEVER the `file:../glass-ui` link (SV-1), NEVER a `dist/` alias, NEVER a
  vendored copy of any glass-ui component in `demo/` (contract-v2; `cross-repo-dev-resolution.md §2.4`
  "no checked-in `dist/` artefact as a tracked resolution target"; §6 "the sibling resolves to `dist/`
  — never `src/`"). The acyclic spine is glass-ui → value.js → keyframes, each consuming the PUBLISHED
  predecessor one tranche behind (`EXECUTION-ORCHESTRATION.md §4`). Holding the `file:` link "until CI is
  green" is the forbidden shortcut — the pin IS the close gate (inv-N-6).

- **NO authoring the producer fix into glass-ui (the foreign-repo fence).** Every register A/A′/B/C/F fix
  is glass-ui's to author and value.js's to CONSUME (inv-16; `N.md §8` "asks, not value.js writes"). The
  dock-FLIP measure fix (A-1), the Select bound (A-2), the slider size axis (A-3), the `uSatColor[]`
  shader routing (C-1), the `EasingConfigurator` (C-3), the GooBlob gates (A′-1/A′-2) — value.js does NOT
  patch glass-ui's tree to land them early. Reaching into `../glass-ui/src` to "just fix the measure" is
  the acyclic-spine violation (the producer owns the fix; value.js owns the consume + the π verify).

- **NO keeping a `[data-size]`/`max-h-[…]`/`.dashed-well`/`--dock-icon-glyph` interim "because it works".**
  The R3 interims are EXPLICITLY measure-first stand-ins that DIE at the pin (`WAVES-2.md:74,116-118,134,
  223,230`; the interim-death ledger). The producer fix makes them UNNECESSARY — keeping a working
  `[data-size]` scope beside the consumed `size` axis is the legacy-beside-replacement anti-pattern
  (NO-legacy; `WAVES-2.md:18` "interim shims DIE at the consume — no parallel forks"). The W18 hard gate
  greps the named interims → 0 (HG-interim-death); a surviving interim reds the gate.

- **NO consuming a BA-RETIRED class.** The 4.0.0 cut retires `sparkle-sweep`, `btn-audacious`, the tabs
  `segmented` variant, the Dialog `variant` prop, `.scroll-fade-*` (BA letter E `:316-320`). Consuming a
  to-be-deleted class is the inv-N-10 fossil anti-pattern (a phantom the instant BA cuts). The abrogation
  sweep's retired-classes step (SV-3) is the structural guard — but the SPEC forbids it at authoring time:
  the celebration beats (W17.D), the tabs consume (SV-4), the Dialog consume each follow the 4.0.0 rename,
  never the retired name.

- **NO re-forking the `EasingConfigurator` demo-side.** The configurator is glass-ui-OWNED (the three-way
  boundary law: math = value.js · time/spring = kf · component = glass-ui; BA letter C-3 `:288-290`).
  value.js CONSUMES the published primitive at W18.B and DELETES `EasingSelector.vue` (SV-6). Authoring a
  demo-side `EasingConfigurator` twin — or keeping `EasingSelector.vue` "as a fallback" — vendors a
  component the constellation has a producer for (the acyclic-spine violation) and leaves legacy beside
  the replacement. The W16.B interim was the SANCTIONED in-repo restyle (it dies here); a NEW demo
  configurator is forbidden.

- **NO running the abrogation sweep against a dts-INCOMPLETE dist.** The sweep's typecheck arm is only
  trustworthy against a dts-complete 4.0.0 dist (the C-DTS precondition; BA letter F-1 `:370-372`; R1 §6
  — the dist-flap broke this audit's visual lanes twice). Running the sweep against a `.d.ts`-less dist
  produces 74-error `TS7016` noise that masks real breaks (`N.md §1` — the HEAD boot-truth). The
  precondition is BINDING: confirm the 4.0.0 dist emits declarations (HG-A3's dts-completeness probe)
  BEFORE the sweep's verdict is consumed.

- **NO skipping a NAMED adopt silently; NO consuming an un-shipped adopt.** The four AZ-fleet adopts are
  CHECKLIST-DRIVEN (SV-7): an adopt the 4.0.0 cut ships gets consumed (the interim deleted); an adopt NOT
  shipped is RECORDED as skipped (the interim kept, the marker preserved). Consuming a `size="icon-sm"`
  rung glass-ui did not ship re-creates the `glass-carousel` boot-fatal class (`N.md §1` — a symbol no
  published version exported). Silently dropping a shipped adopt leaves a manual `line-clamp-1` where the
  `clampLabel` exists (the un-idiomatic stand-in). The checklist is the discipline.

- **NO pinning `^4.0.0` before the cut is on the registry (no speculative pin).** W18 GATES on the BA cut
  (SV-2 — the dist is 3.13.0). Pinning `^4.0.0` while 4.0.0 is unpublished produces an unresolvable
  install (or silently resolves the stale `file:` symlink — the worst case, masking the wait). The pin
  lands WHEN the cut is on the registry; until then W18 holds (the pin is the gate, not the work). This is
  the BOOK-with-trigger posture, not a workaround: the wait is one-directional and gates only the final
  pin (`N.md §9`; `EXECUTION-ORCHESTRATION.md §4`).

---

## §Folds — the rows this wave discharges (each citing its audit lane + finding-id)

| Row | Finding / lane | Lane here | Discharge |
|---|---|---|---|
| **inv-N-6** — registry consumption at close (the pin) | `N.md §6.6` AMENDED; `WAVES-2.md:324`; X-GU §5.2 | **A** | `@mkbabb/glass-ui` `file:` → `^4.0.0` (the BA cut); transitive peers declared; the phantom keyframes devDep dropped — the inv-N-6 close |
| **inv-N-10** — abrogation-truth (the sweep) | `N.md §6.10`; `audit/abrogation-ledger.md §4`; `scripts/abrogation-sweep.mjs` | **A** | the full exports-map-diff + retired-classes sweep against the 4.0.0 set, vs a dts-complete dist — break-loudly-at-the-bump |
| **U1** (gray half) — the dark-material/no-gray tokens | `LEDGER.md` U1; D6 §root-2; BA letter D-3 `:304` | **A** | consume W-DARK-MATERIAL + W-NO-GRAY (the W12.B gray-token interim's producer root) |
| **U6 / U16** — the dock morph slow/jittery (the FLIP measure bug) | `LEDGER.md` U6/U16; U-DOCK §1; BA letter A-1 `:27-58` | **A** | consume the A-1 nested-measure fix; the W15.D morph-truth harness flips GREEN — U6/U16 CLOSE |
| **U7** — one prop scales the whole picker family (the font rung) | `LEDGER.md` U7; U-DROPDOWN; BA letter A-2/WO-3 `:99-108` | **A** | consume the `Select size`-rung font register; the W13.B trigger-override interim dies |
| **U8 / U23** — the Select collision-bound + inner-scroll + open-jerk | `LEDGER.md` U8/U23; U-DROPDOWN; BA letter A-2/WO-1/WO-2 `:60-97` | **A** | consume the precompiled content-bound; the dropdown bottoms in-viewport + scrolls within; the W13.B `max-h-[…]` interim dies |
| **U18 / U22** — the watercolor ghost (the dashed/outline register) | `LEDGER.md` U18/U22; X-GU §1F; BA letter C-2 `:245-260` | **A** | consume `WatercolorDot variant="ghost"`; the W14.E `.dashed-well`/`watercolor-swatch` dashed-rect dies |
| **U28** — the slider size axis (sliders bigger) | `LEDGER.md` U28; U-CONTROLS §U28; BA letter A-3 `:118-143` | **A** | consume the real `[data-size]`/precompiled size rules; the W13.A `[data-size]` interim dies (20/28px tracks) |
| **U3** (satellite half) — `uSatColor[]` derived-shade satellites | `LEDGER.md` U3; U-BLOB §U3.c; BA letter C-1 `:211-243` | **A** | consume the `uSatColor[]` per-satellite routing + the `bodyLightness` floor; satellites visibly shaded |
| **U33** (cohort half) — the aurora `breathing` motion register | `LEDGER.md` U33; U-AURORA; BA letter A-4 `:145-169` | **A** | consume the honest `breathing` motion-fields fix (the W10.B demo-side `drifting` default stands beside it) |
| **D5-10** — the dark-arm atmosphere re-verify | D5 WO-D5-10; BA letter D-3 | **A** | re-verify the aurora reads through dark glass at the W-DARK-MATERIAL/W-STAGE pin |
| **U20a** — Skeleton glass | `LEDGER.md` U20a; U-CONTROLS §U20a; BA letter D-1 `:296-300` | **A** | re-author `PaletteCardSkeleton.vue` onto `<Skeleton surface="glass">` (the "too black" composite cured) |
| **A′-1..A′-6** — the perf producer cluster (GooBlob zombie/PRM, card-shrink keyframes, dock-morph cascade, aurora DPR, per-density glyph) | L-PERF2/3; BA letter A′ `:333-366` | **A** | consume the GooBlob gates, the composited card keyframes, the `--dock-morph-t` narrowing, the aurora DPR cap, the per-density glyph (the `--dock-icon-glyph` override dies) |
| **F-3** — `AuroraConfig` descriptor | `N.md §8`; BA letter F-3 `:377` | **A** | consume the slider-section descriptor (the BlobPane/AuroraPane admin-tuning substrate) |
| **AZ-fleet adopts** — Button `icon-sm` · Select `size` · `clampLabel` · Tooltip mono | `WAVES-2.md:223`; SV-7 (`PaletteSlugBar.vue:16`, `DockViewSelect.vue:50`) | **A** | each consumed-or-skipped by checklist; the `size="icon"`/`line-clamp-1` interims die where the rung ships |
| **U27 / U25** — the easing-configurator consume | `LEDGER.md` U27; D2 §1.3; X-KF §0-1; BA letter C-3 `:262-290` | **B** | DELETE `EasingSelector.vue` + the W16.B interim; consume the published `EasingConfigurator` (the three-way boundary law) |
| **kf 0.12.0 notify** — discharged; the witness-flips are kf's L-side | `WAVES-2.md:225`; X-KF §6 | **C** | recorded DISCHARGED; the VJ.W1/VJ.W2 grammars handed to the successor (or folded per `GRAMMAR-FOLD.md`) |
| **fourier rows** — conformance-matrix + the `^0.11.0` web bump | `N.md §8` (fourier-owned); `WAVES-2.md:226` | **D** | the matrix correction + the bump FILED, fourier executes (no value.js write) |
| **F-1 (C-DTS)** — the dts-complete dist precondition | BA letter F-1 `:370-372`; R1 §6 | **A** | the abrogation sweep runs against a dts-complete 4.0.0 dist (the typecheck arm trustworthy) |
| **F-2 / F-4** — the value.js version ranges + the retired-classes manifest currency | BA letter F-2 `:373-376`, F-4 `:379-383` | **A** | confirm the 4.0.0 peer range admits 0.12.0+; the `.retired-classes.txt` (or the MIGRATION.md substitute) is current at the cut |

**NOT folded here (explicitly routed elsewhere — zero drops, P-Inv 28):**
- **The R3 INTERIMS themselves** (the `[data-size]` slider scope, the Select `max-h-[…]` cap, the
  `.dashed-well`/`watercolor-swatch` dashed-rect, the `--dock-icon-glyph` override) → MINTED at
  **N.W13.A/B / N.W14.E / N.W17.A**; W18 DELETES them, it does not mint them (`WAVES-2.md:116-118,134,
  223`). W18 owns the death, the R3 waves own the birth.
- **The W15.D morph-truth HARNESS** (the per-rAF width-in-span e2e) → **N.W15.D** (born-RED until A-1);
  W18 VERIFIES it flips green at the pin, it does not author it (`WAVES-2.md:152,155-162`).
- **The wire-deploy ceremony + master-merge + the v1.0.0 publish** → **N.W8′ / N.W9′** — W18 discharges
  the PIN (the v1.0.0 gate); the deploy ceremony + the publish are W8′/W9′ (`WAVES-2.md:235-269`).
- **The VJ.W1/VJ.W2 grammar IMPLEMENTATION** → the **post-N successor** (or the recommended fold into N's
  library track, `GRAMMAR-FOLD.md`); W18.C RECORDS the hand-off, it does not implement the grammars
  (`WAVES-2.md:225`; `EXECUTION-ORCHESTRATION.md §3`).

---

## §Hand-off — the BINDING cross-wave + cross-repo boundaries

### Cross-wave (within N)

| Boundary | Direction | Binding contract |
|---|---|---|
| **N.W13/W14/W17 → N.W18 (interim death)** | R3 lands FIRST | The `[data-size]` slider scope (W13.A), the Select `max-h-[…]` cap (W13.B), the `.dashed-well`/`watercolor-swatch` dashed-rect (W14.E), the `--dock-icon-glyph` override (W17.A) are MINTED by R3 as measure-first interims; W18 DELETES them when the producer fix lands. The HG-interim-death grep (→ 0) is W18's keystone gate; the R3 waves own the birth, W18 owns the death (`WAVES-2.md:74`). |
| **N.W15.D → N.W18.A (morph verify)** | W15 lands the harness born-RED FIRST | The dock morph-truth e2e (the per-rAF width-in-span assert) is W15.D's, born-RED until glass-ui A-1 (`WAVES-2.md:152`). W18.A consumes A-1 and the harness FLIPS GREEN — U6/U16 CLOSE only at this pin verify. W18 does not author the harness. |
| **N.W16.B → N.W18.B (easing consume)** | W16 lands the interim FIRST | `EasingSelector.vue` is restyled in place at W16.B (the in-repo interim — the `hsl(248…)` literal killed there); W18.B DELETES it and consumes the published `EasingConfigurator`. The interim dies at the pin (`WAVES-2.md:174,224`; N.W16.md §No-workaround). |
| **N.W10.D → N.W18 (π)** | W10 lands the cascade kill FIRST | Until the desktop renders, every producer-fix π pair (dock morph, dropdown, slider, satellites, ghost) is structurally blind (inv-N-11; `EXECUTION-ORCHESTRATION.md:56-62`). W18's SOURCE gates (the pin, the sweep, the grep-absences) are demo-independent; only the π waits. |
| **N.W18.A → N.W9′ (pin discharge)** | W18 discharges, W9′ closes | The v1.0.0 registry pin is DISCHARGED at W18.A (`WAVES-2.md:263`); W9′ confirms it + publishes v1.0.0. If the BA cut lags, v1.0.0 holds (the pin is the gate). W18 may lag without blocking W8′ (`WAVES-2.md:281`). |

### Cross-repo (the acyclic spine — glass-ui one tranche ahead, PUBLISHED-consume)

| Boundary | Direction | Binding contract |
|---|---|---|
| **glass-ui BA cut (4.0.0) → N.W18.A** | glass-ui publishes BA; value.js consumes one beat behind | The ENTIRE U-fix mass — registers A (dock-FLIP, Select bound/font-rung, slider size, aurora motion), A′ (the perf cluster), B (the P9 emission fix), C (`uSatColor[]`, ghost, configurator), D (Skeleton glass, menu-glass), F (C-DTS, version ranges, `AuroraConfig`, the retired manifest) — lands at the 4.0.0 cut and is CONSUMED from the PUBLISHED registry tag (`^4.0.0`), NEVER the `file:` link (SV-1), NEVER a vendored copy (contract-v2 §2.4). The wait is one-directional (value.js never blocks BA); it gates only the final pin, not the work (`EXECUTION-ORCHESTRATION.md §4`; BA letter E `:310-315`). The fold-by-batch deadline table (BA letter `:385-393`) binds the producer side. |
| **glass-ui `EasingConfigurator` (C-3) → N.W18.B** | glass-ui publishes the primitive; value.js consumes | The configurator is glass-ui-OWNED (the three-way boundary law). When glass-ui publishes it (reconciling the kf donor trio + BA's `BezierEditor` + value.js's math barrel), value.js DELETES `EasingSelector.vue` and consumes it. value.js authors NO configurator (inv-16; BA letter C-3 `:288-290`). |
| **value.js 0.12.0 → keyframes K (DISCHARGED)** | value.js publishes; kf consumes | kf pins `@mkbabb/value.js ^0.11.2` (`../keyframes.js/package.json:179`), satisfied by 0.12.0; the notify is DISCHARGED (`WAVES-2.md:225`). The witness-flips (MCI-5 et al.) are kf's L-tranche side — no N work owed. |
| **value.js → keyframes K (the grammar successor edge)** | value.js publishes the grammars; kf-K consumes | VJ.W1 (scroll-timeline) + VJ.W2 (`sampleColorRamp`) are the two genuine net-new value.js grammars kf-K's Band-II W9/W10 gate on (`KF-TO-VALUEJS-GRAMMAR-ASKS.md`; `EXECUTION-ORCHESTRATION.md §3`). W18.C RECORDS the edge; the RECOMMENDATION (`GRAMMAR-FOLD.md`) folds them into N's library track → 0.13.0, un-blocking kf-K in the same beat. The acyclic spine holds: value.js publishes 0.13.0, kf-K consumes one beat behind. |
| **value.js → fourier (the matrix + bump)** | value.js files; fourier executes | The conformance-matrix corrections + the fourier-web `^0.11.0` bump are fourier-OWNED (`N.md §8`; `WAVES-2.md:226`). value.js files the ask; fourier lands it. No value.js write. |

### The interim-death ledger (what dies at W18, named — the HG-interim-death census)

| Interim | Minted at | Dies on consuming | Grep witness (→ 0) |
|---|---|---|---|
| `file:../glass-ui` pin | (HEAD) | the BA cut (`^4.0.0`) | `grep 'file:../glass-ui' package.json` |
| The phantom `@mkbabb/keyframes.js` devDep | (HEAD) | the pin discharge | `grep '@mkbabb/keyframes.js' package.json` |
| The `[data-size]` slider scope | W13.A | the slider size axis (A-3) | `grep "data-size" demo` |
| The Select `max-h-[min(24rem,60dvh)]` cap | W13.B | the Select content-bound (A-2/WO-1) | `grep "max-h-\[min(24rem" demo` |
| The trigger font-override (`sm:text-display`) | (HEAD / W13.B) | the `Select size`-rung (A-2/WO-3) | `grep "sm:text-display" ColorSpaceSelector.vue` |
| The `.dashed-well`/`watercolor-swatch` dashed-rect | W14.E | `WatercolorDot variant="ghost"` (C-2) | `grep "dashed-well\|watercolor-swatch" demo` |
| The `--dock-icon-glyph` ratio override | W17.A | the per-density glyph (A′-6) | `grep "dock-icon-glyph" demo` |
| The `size="icon"` / manual `line-clamp-1` AZ stand-ins | (HEAD) | `Button size="icon-sm"` / `clampLabel` (if shipped) | `grep 'size="icon"' PaletteSlugBar.vue`; `grep "line-clamp-1" DockViewSelect.vue` |
| `EasingSelector.vue` + the W16.B restyle | W16.B | the published `EasingConfigurator` (C-3) | `test -f EasingSelector.vue` |
| The W15.D morph-truth harness born-RED | W15.D | the glass-ui A-1 FLIP-measure fix | the harness flips green |

The W18 hard gate greps the named interims → 0 (HG-interim-death; `WAVES-2.md:230` "zero interim shims
surviving"). An interim survives ONLY if its producer fix did NOT ship at the cut — in which case it is
RECORDED as skipped (the checklist discipline; HG-A10), never silently kept.

---

## §Design-decisions — trade-offs RESOLVED

1. **The pin is the registry tag, not the `file:` link (the inv-N-6 close).** RESOLVED: `@mkbabb/glass-ui`
   moves from `file:../glass-ui` (SV-1) to `^4.0.0` from the registry. The `file:` link was the SANCTIONED
   dev resolution through N.W5–W17 (against a clean-rebuilt local dist; `N.md §3.1`), but contract-v2 and
   inv-N-6 are explicit that the CLOSE pin is a registry tag — a `file:` link is a non-reproducible
   resolution target (`cross-repo-dev-resolution.md §2.4`). Keeping the link "because it works in dev" is
   the legacy-beside-replacement anti-pattern at the constellation level. The registry pin is the close.

2. **The pin target is the BA cut (4.0.0), not 3.13.0.** RESOLVED: inv-N-6's target MOVED from 3.13.0 to
   the BA cut because BA's tranche carries the U-fix mass — the producer-side fixes for ~16 of the 33
   U-findings (`N.md §3.1` AMENDED; `WAVES-2.md:324`; X-GU §5.2). A 3.13.0 pin would ship EVERY U-defect
   BA fixes (the dead dock morph, the unbounded dropdown, the 6px slider, the same-shade satellites). The
   wait is one-directional (value.js never blocks BA) and gates only the final pin (`EXECUTION-
   ORCHESTRATION.md §4`). Pinning 3.13.0 to "close sooner" would ship the defect surface the whole tranche
   exists to repair — rejected.

3. **The producer fix is CONSUMED, not authored demo-side (the foreign-repo fence).** RESOLVED: every
   register A/A′/B/C/F fix is glass-ui's (inv-16; `N.md §8`). The dock-FLIP measure bug is a glass-ui
   ORDERING defect (`dockMorphContext.ts` measures the nested group at its collapsed span — BA letter A-1
   `:36-50`); the fix is glass-ui's, the verify is value.js's (the W15.D harness). value.js does NOT reach
   into `../glass-ui/src` to patch the measure early — that vendors the fix and forks the spine. The
   consume-at-pin discipline is the whole point: value.js is the pure sink, glass-ui the producer.

4. **The R3 interims DIE; no parallel fork survives.** RESOLVED: the `[data-size]` scope, the
   `max-h-[…]` cap, the `.dashed-well` dashed-rect, the `--dock-icon-glyph` override are measure-first
   stand-ins minted by R3 EXPLICITLY to die at this pin (`WAVES-2.md:18,74`). Once the producer fix lands,
   keeping a working interim beside it is NO-legacy-violating (`WAVES-2.md:18` "interim shims DIE at the
   consume — no parallel forks"). The HG-interim-death grep (→ 0) is the structural enforcement: the
   interim is not "deprecated", it is DELETED. The single exception is the checklist skip (decision 7).

5. **The abrogation sweep runs against a dts-complete dist (the C-DTS precondition is BINDING).**
   RESOLVED: the sweep's typecheck arm is only trustworthy against a 4.0.0 dist that emits `.d.ts`
   (the C-DTS ask, BA letter F-1; the dist-flap broke this audit's visual lanes twice, R1 §6). A
   `.d.ts`-less dist produces 74-error `TS7016` noise (`N.md §1` — the HEAD boot-truth class) that masks
   real abrogation breaks. The precondition is checked (HG-A3's dts-completeness probe) BEFORE the sweep's
   verdict is consumed — running the sweep against an incomplete dist and trusting a green is the silent-
   pass anti-pattern inv-N-10 exists to defeat.

6. **The `EasingConfigurator` is consumed from glass-ui, never re-forked (the three-way boundary law).**
   RESOLVED: curve MATH = value.js (the `bezierPresets`/`CSSCubicBezier`/`timingFunctions` barrel,
   `src/index.ts:226-238`); playback/spring = kf (the donor trio); the editor COMPONENT = glass-ui (the
   published primitive). value.js CONSUMES it at W18.B and DELETES `EasingSelector.vue` (SV-6; BA letter
   C-3 `:288-290`). The tempting shortcut — keep `EasingSelector.vue` "as a fallback" or author a demo
   configurator twin — vendors a component the constellation has a producer for (three repos hand-rolling
   three editors on the same math is the exact defect C-3 resolves; X-KF §0). The interim dies; the
   published primitive is the one.

7. **The AZ-fleet adopts are CHECKLIST-driven (consume-or-skip, never silent).** RESOLVED: `Button
   icon-sm`, `Select size`-rung, `clampLabel`, `Tooltip` mono each have a known interim with an in-source
   marker (SV-7 — `PaletteSlugBar.vue:16` "when glass-ui ships the rung"). The discipline: if 4.0.0 ships
   the rung, consume it (delete the interim); if NOT, RECORD the skip (keep the marker). Consuming an
   un-shipped rung re-creates the `glass-carousel` boot-fatal (`N.md §1` — a symbol no version exported);
   silently dropping a shipped adopt leaves an un-idiomatic stand-in. The checklist is the only safe
   posture for second-consumer adopts the producer ships on its own schedule (`WAVES-2.md:223`
   "un-named adopts skip quietly at the pin").

8. **W18 may lag on the BA cut without blocking the rest of the close.** RESOLVED: W18 GATES on the 4.0.0
   publish (SV-2 — the dist is 3.13.0), but it does NOT block N.W8′ (hygiene + master-merge + wire-deploy)
   — W8′ runs after W10–W17 green, independent of the cut (`WAVES-2.md:281,287`). Only N.W9′'s v1.0.0 pin
   waits for both. If the cut lags, the tranche makes progress on W8′ and HOLDS v1.0.0 (the pin is the
   gate, not the work; `N.md §9` BOOK-with-trigger). Forcing W18 to "fix it value.js-side to close" is the
   forbidden workaround (decision 3) — the wait is structural and one-directional.

9. **The two net-new grammars are RECORDED for the successor, with a fold recommendation.** RESOLVED:
   VJ.W1 (scroll-timeline) + VJ.W2 (`sampleColorRamp`) are genuine net-new value.js GRAMMARS kf-K gates on
   (`KF-TO-VALUEJS-GRAMMAR-ASKS.md`). N.W18.C RECORDS them for the post-N successor (`WAVES-2.md:225`); the
   orchestrator RECOMMENDS folding them into N's library track (0.13.0) rather than spinning a post-N
   tranche for two items (`EXECUTION-ORCHESTRATION.md §3`; `GRAMMAR-FOLD.md`). The fold is the better
   constellation move (value.js and keyframes advance together, as at 0.12.0); the post-N Tranche O is the
   clean fallback. Either way, W18.C is a DOC row — the implementation is not W18's (it is library-track or
   successor work). W18 records the edge; the fold is a separate ratification.

10. **fourier's rows are filed, not executed (fourier-owned).** RESOLVED: the conformance-matrix
    corrections (the fictional value.js test paths) + the fourier-web `^0.11.0` bump are fourier-OWNED
    (`N.md §8`; `WAVES-2.md:226`). value.js FILES the ask; fourier lands it on its own schedule. W18.D is a
    coordination record, not a value.js write — value.js does not patch fourier's repo (the same foreign-
    repo fence as the glass-ui producer fixes, decision 3). The cross-repo matrix is honest on value.js's
    side (the URN decision is W3.H's); the fourier-side correction is fourier's.
