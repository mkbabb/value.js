SERVED MODEL: claude-opus-5-5

# X.KF.W13V — execution record (one idiom for every animation view + the two audit registers)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W13.md` — the KF.W13V addenda (`:338-364` §0bl/§0bn/§0bq · `:379-386` OA-40 · OA-46 §0by · OA-47/49 §0bz · `:388-395` §0ca/§0cb · `:419-435` OA-51 §0ce). **Authority**: the owner's 2026-09-23 words verbatim in those addenda; frame `keyframes/evidence/W13U/owner-2026-09-23-easing-page.png`; COHESION §0bl · §0bn · §0bq · §0by-note (OA-46 lives in the spec addendum) · §0bz · §0ca · §0cb · §0ce; begin-word §0j; Opus 5.5 every seat (spec addendum "Model", owner 2026-09-23). **Track**: B (X·KF). **Seat 0**: `claude-opus-5-5`, VERIFY-AND-BANK — zero keyframes.js bytes, zero glass-ui bytes, zero product bytes.

## Open

**Date**: 2026-09-23 (sitting of record 2026-09-17, the owner's begin-word, COHESION §0j).

**Crash-recovery sweep** — ⟨`git -C keyframes.js status --porcelain`⟩ → 2 untracked value.js inbound mail packets (2026-07-24, 2026-07-27; standing), 0 modified paths. ⟨`git -C value.js status --porcelain`⟩ → `M demo/color-session/ColorSpaceSelector.vue` · `M CARRY-LEDGER.md` · `M execution/C/F-W14.md` · `M scripts/dev/dev.sh` + untracked W13R/W12 evidence — **none inside this seat's writable set** (this record, LEDGER, INBOX); none touched. `execution/B/KF-W13V.md` did not exist → FRESH open, not RESUME.

**Frontier** — ⟨`git -C keyframes.js log --oneline -1`⟩ → `d94017ff` (KF.W13R `.d`); ⟨`rev-parse --short origin/master`⟩ → `d94017ff` (pushed). Pins: `@mkbabb/glass-ui` `10.0.1` · `@mkbabb/value.js` `4.0.0` (package.json `:78` · `:71`).

### Preconditions ("Opens after", spec `:340` as amended `:367`)

| # | condition | at the bytes | in the LEDGER | verdict |
|---|---|---|---|---|
| P-1 | KF.W13U CLOSED | record `execution/B/KF-W13U.md` present | row `:59` `CLOSED 2026-09-17 (honest-RED: QUIET-FOCUS-RING · DRAWER-DETENT-REACH · DOCK-MORPH-ROOT · DARK-MENU-ITEM)` | MET |
| P-2 | KF.W13R CLOSED (§0bs: KF.W13V now opens after KF.W13R) | record `execution/B/KF-W13R.md` `## Check 1` CONFORMANT-HONEST-RED; kf `d94017ff` = origin | row `:60` `CLOSED 2026-09-17 (honest-RED: SHEET-POSITION · B7 SPECULAR-REST · DOCK-MORPH-ROOT · GLASS-VEIL-GREY · DOCK-TRIGGER-CLIP · DARK-MENU-ITEM)` | MET |
| P-3 | register KFA (OA-30) | `keyframes/audit/KF-ANIMATION-AUDIT.md` present; ⟨`grep -o "KFA-[0-9]*" … \| sort -u \| wc -l`⟩ → **228** (§0bn: 228) | — | MET |
| P-4 | register UIA-KF (OA-36) | `audit/UI-AUDIT-keyframes.md` present (`372b4d41`); ⟨`grep -o "UIA-KF-[0-9]*" … \| sort -u \| wc -l`⟩ → **323** unique ids, max id `UIA-KF-322` (§0ca: 322 rows — one extra id string, recorded not re-derived) | — | MET |

**Inherited residual**: KF.W13R Check 1 **C1-1 (MEDIUM, seat-routed, unruled)** — the `easing/desktop/closed` e2e occlusion (dock covers the subject's content rect), a consumer regression KF.W13R introduced; routed to `.c`. It is carried into `.c`'s brief as a cure-at-the-consumer-root obligation (the rail bounded above the menubar band; never an oracle change), measured by the kf e2e occlusion case at `--workers=1`.

### E13 Step-0 mail sweep (four paths, read-only)

- Glass newest tranche dirs: ⟨`ls -dt glass-ui/docs/tranches/*/ | head -3`⟩ → `BL/ BK/ BJ/`. BL carries `CHARTER.md FORMATION-PROGRESS.md audit design` and **no `coordination/`** — BK/coordination stays the live mail path (as every 09-23 sweep read it).
- ⟨`find <four paths> -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-09-23 20:11:58) → **0 files**.
- Newest BK entries: our own outbound mirrors (O-64 `kf-w13r-dock-morph`, O-63 `dock-trigger-clip`, O-62 `glass-veil-grey`, …) and `chicago-inbound-2026-09-23-dock-live-veil-and-hover-lens.md` (17:27) — chicago → glass (C-2), **not addressed to value.js**; unrowed by design.
- INBOX tail I-45..I-47 statuses: READ / READ awaiting BL's cut ×3. ⟨`grep -c UNREAD`⟩ on I-4x rows → 0 in scope.
- **Result: 0 unrowed addressed to value.js · 0 UNREAD in scope.** Sweep line appended at INBOX's end.

## Baseline (BEFORE, read-only, kf `d94017ff`, 2026-09-23 20:14–20:2x EDT)

The KF.W13V addenda state their gates in prose on the SERVED page (headed, 1440 + 390, both themes; §0be instrument rule) — they are owed to the units, each of which first reproduces the owner's observation on the served page and pastes it (R.2). Seat 0 banks the literal, byte-readable proxies of each gate and the toolchain floor, double-run. Dev server ⟨`curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/`⟩ → `200` (up; not probed further here — probe parsimony §5.2; the served-page reads belong to each unit's own capture family).

| gate (proxy) | unit | command | BEFORE ×2 | reading |
|---|---|---|---|---|
| B-s1 scene-local keyframes editors | `.s` | ⟨`grep -rln "KeyframesEditor\|CSSCodeEditor\|useSpringKeyframesEditor\|keyframes (editable)" demo/scenes`⟩ | **4 files** · 4 (`spring/useSpringKeyframesEditor.ts` · `spring/SpringPhysicsFacet.vue` · `spring/useSpringDemo.ts` · `spring/SpringScene.vue`) | RED (target 0; the Spring inline `@keyframes (editable)` block at `SpringPhysicsFacet.vue:120`) |
| B-s2 inline-editor module size | `.s` | ⟨`wc -l spring/useSpringKeyframesEditor.ts spring/SpringPhysicsFacet.vue`⟩ | 77 · 347 | RED (the one-off exists) |
| B-p1 `rounded-full`/`9999px` in demo | `.p` `.y` | ⟨`grep -rn "rounded-full\|9999px" demo --include='*.vue' --include='*.css' --include='*.ts' \| wc -l`⟩ | **16** · 16 | census (single-line badges lawful; multi-line ones RED — per-element height read is the unit's) |
| B-p2 same, `demo/scenes` only | `.y` | same, `demo/scenes` | **7** · 7 (3 `status-badge rounded-full` · `SequencePlayhead.vue:77` · `SpringHeatmap.vue:544/581/608` `var(--radius-pill, 9999px)`) | census |
| B-p3 multi-line holders on the card rung | `.p` | ⟨`grep -rn "radius-field" demo --include='*.vue' --include='*.css' \| wc -l`⟩ | **0** · 0 | RED (target: every multi-line selectable tile on `--radius-field`, O-58 canon `DESIGN.md:386`) |
| B-p4 `--radius-pill` consumers | `.p` `.y` | ⟨`grep -rn "radius-pill" demo --include='*.vue' --include='*.css' \| wc -l`⟩ | **16** · 16 | census |
| B-c1 divider above the easing group | `.c` | ⟨`grep -n -i "separator\|divider\|<hr" demo/components/instrument/transport/AnimationControlsGroup.vue`⟩ | **0 hits** · 0 | RED (OA-47) |
| B-t1 vue-tsc | all | ⟨`npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'`⟩ | **0** · 0 (load 34.59 · 24.56) | GREEN floor |
| B-t2 `npm run check` | close | ⟨`npm run check; echo $?`⟩ | **EXIT 0** · EXIT 0 (load 23.31 · 25.16) | GREEN floor |
| B-t3 demo vitest | close | ⟨`npx vitest run --project demo \| grep -E "Test Files\|Tests "`⟩ | **66/66 · 518/518** · 66/66 · 518/518 | GREEN floor |
| B-k1 KFA register | `.k` | ⟨`grep -o "KFA-[0-9]*" keyframes/audit/KF-ANIMATION-AUDIT.md \| sort -u \| wc -l`⟩ | 228 · 228 | the denominator; per-row open/cured split is `.k`'s first act |
| B-u1 UIA-KF register | `.u` | ⟨`grep -o "UIA-KF-[0-9]*" audit/UI-AUDIT-keyframes.md \| sort -u \| wc -l`⟩ | 323 · 323 (max id 322) | the denominator |
| B-c2 C1-1 occlusion (inherited, KF.W13R Check 1) | `.c` | ⟨`KF_PLAYWRIGHT_DIR=<value.js> node scripts/observe/demo/occlusion.mjs`⟩ (tail 14 lines; controls closed axis) | **FAIL (1)** · FAIL (1) — identical both runs: `✗ easing/desktop/closed dock covers the subject's CONTENT RECT (real occlusion; scene is not dockFloatAllowed)`; the other 12 visible cells ✓ (load 25.52 · 28.37) | RED |

**R.2 (GREEN before its cure)**: none of the owed unit gates reads GREEN at open. The four GREEN rows (B-t1..B-t3, and the occlusion cells other than easing/desktop) are the toolchain/regression floor each unit must hold, not gates a unit cures — no finding.

## Unit plan

**Order (binding, spec `:386` §0bz + orchestrator note)**: strictly serial, one unit at a time — `[.s] → [.c] → [.y] → [.p] → [.k] → [.u]`, then the close (served-page gates re-read by the check seat; `npm run check` 0; vitest + kf e2e GREEN at `--workers=1`, load recorded). **Every seat Opus 5.5** (spec "Model"; owner 2026-09-23 — `.y` is the design-author seat at effort high, still Opus). ESCALATED units do not halt the wave. Peak concurrency 1 — no two concurrent units, so overlapping writable sets never collide.

**Standing for every unit**: served-page instrument rule (§0be) — each gate read on `http://localhost:5173/` headed real-GPU AND the gh-pages build, ×2; reproduce the owner's observation first and paste it; a harness-only GREEN does not count. Glass is READ-ONLY: glass rows are routed by id (relay addendum under `value.js:docs/tranches/X/relay/` + an INBOX O-row), never copied; honest-RED ids carried and never cured locally: `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM` · `SHEET-POSITION` · `B7 SPECULAR-REST` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`. Frames stay uncommitted where they are bulk (`.git/info/exclude`, §0bn/§0ca); committed evidence = scripts, logs, and the named before/after frames. §0bt ADJACENT-LINE RULE applies. Each unit appends its own `### KF.W13V.<u>` receipt under `## Unit receipts` and one LEDGER event line; value.js writes common to all units: `docs/tranches/X/keyframes/evidence/W13V/<u>/**`, this record (own receipt only), LEDGER (append-only).

| unit | model | spec sections | writable (kf = keyframes.js) | gates | locks |
|---|---|---|---|---|---|
| `.s` | opus | KF-W13 `:338-344` (§0bl `.s`) · `:356` OA-39 (§0bq) · `:377-378` OA-40 · `:380` OA-46 (§0by) · `:419-435` OA-51 (§0ce, `.s`+`.y` one redesign — `.s` owns the surfaces/dock-item/shell half) | kf `demo/app/**` · `demo/scenes/**` · `demo/state/**` · `demo/components/instrument/**` · `demo/composables/**` · `demo/styles/**` · `test/demo/**` · `scripts/observe/demo/**` (oracle re-seat on moved DOM only, property unchanged) | G-W13V-s1..s4 | the Spring inline editor's retirement (`useSpringKeyframesEditor.ts` + its `SpringPhysicsFacet.vue:120` block + `useSpringDemo.ts`/`SpringScene.vue` wiring) is ONE commit; dock item set is one shared descriptor (no per-scene item invention); `selectedSurfaceFrom` fallback + static per-scene surface table stay forbidden (§0cd) |
| `.c` | opus | `:384` OA-47 (§0bz) · `:421-435` OA-51 "one control idiom" · inherited C1-1 (KF-W13R.md Check 1 `:468,:474`) | kf `demo/components/instrument/transport/**` · `demo/components/instrument/shell/**` · `demo/app/App.vue` · `demo/styles/**` · `test/demo/**` | G-W13V-c1..c5 | C1-1 cured at the consumer root, never an oracle change; one control-row idiom lands as one commit family |
| `.y` | opus (design-author, effort high) | `:385` OA-49 (§0bz) · `:419-435` OA-51 (§0ce) | kf `demo/scenes/**` · `demo/components/**` · `demo/styles/**` · `demo/app/**` · `test/demo/**`; value.js `…/evidence/W13V/y/DESIGN-NOTE.md` + mocks | G-W13V-y1..y5 | design note FIRST (committed before any product byte); `demo/DESIGN.md` read whole (read-only); DOM census must equal `.s`'s canonical row |
| `.p` | opus | `:345` OA-35 · `:350-351` (§0bl second addendum, O-58 canon `glass-ui/DESIGN.md:385-391`) | kf `demo/**/*.vue` · `demo/styles/**` · `test/demo/**`; value.js relay addendum + INBOX (O-58 follow-up only) | G-W13V-p1..p3 | a canon re-point to `--radius-field`, never a new local style; `TILE-PRIMITIVE` honest-RED with O-58 if BL's primitive is not installable at 10.0.1 |
| `.k` | opus (effort high) | `:346` (§0bl `.k`) · `:353-354` (§0bn) · `:390-395` (§0cb glass facts) | kf `demo/**` · `src/**` · `test/**` · `scripts/observe/**`; kf `package.json`+`package-lock.json` ONLY for a `@mkbabb/value.js` bump to a PUBLISHED version carrying X-W12 `.l` (KFA-14); value.js relay addendum (O-60 batch) + INBOX | G-W13V-k1..k4 | KFA-14 cures in value.js only (X-W12 `.l`) — never a kf-side colour workaround; the 13 producer-live rows (§0cb) relay-only; the 12 cured-at-HEAD rows verify after the landing repin (§0cb R-5), honest-RED by id until then |
| `.u` | opus (effort high) | `:347` (§0bl `.u`) · `:388-389` (§0ca) · `:391-392` (§0cb: KFA-61/95/134/136/228) | kf `demo/**` · `test/demo/**` · `scripts/observe/demo/**`; value.js relay addendum (glass UIA rows beside O-59) + INBOX | G-W13V-u1..u4 | glass rows routed by id beside O-59, never copied; every row with no frame gets one before its cure |

### Gate definitions (from the addenda's prose; served page, headed, ×2)

- **G-W13V-s1** (OA-37/46/51): per scene (Cube · Amiga · Square · Easing · Spring · Sequence), 0 inline editors in the stage region (DOM census) and B-s1 grep → 0; exactly one keyframes editor, the shared pane. **s2** (OA-46): the dock shows the same item set (Keyframes · Timeline · Controls · the scene facet) on every scene, a scene may disable but never invent; each item opens the shared pane with that scene's data (1440 + 390). **s3** (OA-39): landing at 390×844 + 360×740, both themes — cube bbox centre ±4 px of the stage centre, headline ∩ cube = ∅, headline centred ±2 px; 1440×900 unchanged. **s4** (OA-40): drawer/sheet card insets equal ±1 px; transport ∩ open drawer content box = ∅; every control row visible; top dock one row.
- **G-W13V-c1** (OA-47): every Controls-pane row one line at 1440 (label/control ±2 px); **c2** a separator element precedes the easing group; **c3** Cube pane total height before/after pasted, after < before; **c4** at 390 rows stack only where min width forces; **c5** (C1-1) `occlusion.mjs` `easing/desktop/closed` ✓ ×2 (BEFORE: ✗ ×2).
- **G-W13V-y1** design note + 1440/390 mocks committed first; **y2** per scene before/after frames 1440 + 390, both themes; **y3** 0 `rounded-full`/`9999px` on multi-line elements; **y4** each scene's DOM census = `.s`'s canonical row; **y5** (OA-51) one control idiom (label + value one line, a real slider with a visible thumb), presets a glass tile/segmented control on `--radius-field` with no inner sliders, figures one title line + one legend line, the stage one primary readout in plain words (no code identifiers).
- **G-W13V-p1** every multi-line tile's radius ≤ `--radius-field` (computed); **p2** 0 `rounded-full`/`9999px` on elements taller than one line; **p3** BL's tile primitive adopted if installable, else `TILE-PRIMITIVE` honest-RED with O-58.
- **G-W13V-k1** every KFA row not cured by KF.W13U/R: cured at cause or honest-RED by id with owner; **k2** each cure re-captured frame by frame with the audit's own script; **k3** the critic gaps captured and judged (matrix-editor tweens, toasts, tooltips, tab-panel `@keyframes enter`, the 6-scene × {Play, Pause, Reset, Reverse, scrub} matrix one frame per cell, dark legs of the cube re-light + Amiga grid/shadow, the mobile Sheet); **k4** KFA-17 / C6-3 `[real-cube]` intermittent resolved at cause.
- **G-W13V-u1** every UIA-KF row cured or routed to glass by id; **u2** every row without a frame gets one on the served page before its cure; **u3** the catch-all route visited and audited; **u4** KFA-61 · 95 · 134 · 136 · 228 cured at keyframes' root.
- **Floor (every unit, and the close)**: vue-tsc 0 · `npm run check` EXIT 0 · demo vitest GREEN (BEFORE 66/518) · kf e2e `demo:correctness` at `--workers=1`, load recorded.

## Unit receipts

### KF.W13V.s

**Seat**: `claude-opus-5-5` (effort high). **Spec**: KF-W13 `:338-344` (§0bl `.s`) · `:356` OA-39 (§0bq) · `:377-378` OA-40 · `:380` OA-46 (§0by) · `:419-435` OA-51 (§0ce — `.s` owns the surfaces / dock-item / shell half; `.y` owns the per-scene redesign). **Rulings consumed**: COHESION §0bl · §0bq · §0cd (selectedSurfaceFrom fallback + static per-scene table still forbidden — neither touched) · §0ce · §0bt (ADJACENT-LINE). **Frontier at open**: kf `d94017ff`. **Evidence**: `keyframes/evidence/W13V/s/` (probes `census.mjs` · `items.mjs` · `landing.mjs` · `sheet.mjs` · `frames.mjs` · `peek.mjs` · `run-gates.sh`; logs `logs/`; frames `before/`).

**Crash-recovery** — ⟨`git -C keyframes.js status --porcelain`⟩ → the 2 standing untracked value.js inbound letters only; 0 paths inside the writable set dirty; `## Unit receipts` held no `.s` receipt → FRESH, nothing inherited.

#### Acts, in order

1. **Served page first (§0be) — the owner's four frames reproduced on dev** (headed Chromium, `localhost:5173`, dark/light as framed):
   - *easing-page / spring-page* (Spring, 1440): the Physics pane mixed the physics facet with an inline `@keyframes (editable)` block (`SpringPhysicsFacet.vue:120`, the engine `KeyframesEditor` capped at 26rem); the dock carried ONE `Controls tab` Select (a dropdown of Controls/Keyframes/Timeline/Physics) + a separate `Controls panel` toggle — no per-kind dock items. ⟨`node census.mjs http://localhost:5173/ 1 before-dev.json`⟩ → every non-home scene's dock `Scene | Controls tab | Controls panel | @mbabb menu`; sequence `Scene | @mbabb menu` (frame `before/before-dev-{spring,sequence,easing,square}-1440x900-light.png`).
   - *mobile-landing* (390×844): ⟨`node landing.mjs … 390x844 light`⟩ → cube centre y **551.6** vs stage centre **407.3** (dy **+144.3**, the owner's "≈65 % down"); headline ∩ cube **true** (left-ragged beside the die). Root: the home recede rule padded the cube's centring region down to `--start-hero-band` (294.9 px) while the hero band sat at `0.52 × work-area` — the two bands overlapped by construction.
   - *mobile-controls* (390×844): ⟨`node sheet.mjs … 390x844 dark`⟩ → the sheet's inner card inset **41 / 53 px** (Δ 12; the owner's frame read ≈60/0 at an older pad) from the scroller's desktop `pl-4 pr-7`; the sheet's lift `--dock-band-reserve-stable` (72 px) omitted the bottom anchor (49.4 px), so its declared bottom edge (772) sat INSIDE the transport (729–785) — the pill over "fill mode"; the top dock at 390 overflowed its producer cap (layer scrollWidth 400 > clientWidth 366, `@mbabb` clipped) once the four items landed (read before the compact cure, below).
2. **Scene census — the CANONICAL ROW** (the row `.y` must match, G-W13V-y4). Read on the served page (⟨`census.mjs`⟩ — the top dock's controls by accessible name; every visible `input/textarea/select/[contenteditable]/[role=slider|combobox|spinbutton|textbox]/.monaco-editor` inside the stage `.scene-host`) plus the source (`surfacesFor` facilities, `tabsContent` mounts).

   **Canonical row (Cube/Amiga idiom)**: STAGE = the scene's subject only (the subject's own direct-manipulation handle counts as the subject, never as an editor) · TOP DOCK (one row) = `Scene` · `Controls` · `Keyframes` · `Timeline` · `<facet>` · `@mbabb` — the four items from ONE descriptor, a surface without data DISABLED, never dropped or invented · ONE shared controls pane (desktop rail / mobile sheet) opened by those items · ONE transport (bottom dock). Home: `Scene` · `@mbabb`, no items (no scene).

   | scene | facility (surfacesFor) | dock items BEFORE → AFTER | editors in the pane BEFORE → AFTER | stage inline editors BEFORE → AFTER | vs canonical row |
   |---|---|---|---|---|---|
   | Home | none | Scene · @mbabb → same | — | 0 → 0 | MATCH |
   | Cube | Rotations etc. paint → triad; Matrix channel adds `matrix-controls` | Controls-tab Select + panel toggle → C · K · T · facet (Matrix Controls live only while the Matrix channel is selected, else disabled) | shared panes → same | 0 → 0 | MATCH |
   | Amiga | painting channel → triad | Select + toggle → C · K · T · facet(off) | shared → same | 0 → 0 | MATCH |
   | Square | painting channel → triad | Select + toggle → C · K · T · facet(off) | shared → same | 2 → 2: `Horizontal position` / `Vertical position` = the square's OWN drag handles (the subject), not an editor | MATCH (subject handles) |
   | Easing | Easing channel → triad + `easing` (Curve) | Select + toggle → C · K · T · Curve | Curve = `EasingSidebar` in the shared pane → same | 0 → 0 | MATCH |
   | Spring | Sweep + Entry → triad + `spring` (Physics) | Select + toggle → C · K · T · Physics | **Physics pane held an inline `@keyframes (editable)` KeyframesEditor → RETIRED** (the Sweep keyframes are edited in the shared Keyframes pane) | 1 → 1: `Spring target` = the ball's rail (the subject: "tap or drag the rail") | MATCH (subject rail) |
   | Sequence | one light channel, no `animation` → [] | none → C · K · T · facet, ALL disabled | none → none | **6 → 6**: five `Re-time row n start offset` handles + `Scrub the sequence master clock` — an inline timeline | **RED — ESC-s-1** (below) |
3. **Spring's inline editor RETIRED — ONE commit (the lock)** — kf **`e69f7731`** ⟨`git show --stat e69f7731`⟩ → 8 files: `SpringPhysicsFacet.vue` (the `@keyframes (editable)` section, its `KeyframesEditor` import and the `.keyframes-section`/`.keyframes-editor-scroll` CSS deleted; the facet keeps ONE action, "Write physics to keyframes" = the explicit `seedKeyframes()` re-seed) · `useSpringKeyframesEditor.ts` → **`useSpringSweepAnimation.ts`** (rename; it builds the Sweep channel's `CSSKeyframesAnimation`, the one the shared Keyframes pane edits) · `useSpringDemo.ts` + `SpringScene.vue` wiring/comments. **Adjacent edits (§0bt)**: `test/demo/instrument/apply-css-identity.test.ts:127,243` · `keyframes-editor-honest.test.ts:239` · `keyframe-card-offset-loop.test.ts:260` — docblock anchors re-pointed to the renamed file (comments only; no assertion touched). ⟨`grep -rln "KeyframesEditor\|CSSCodeEditor\|useSpringKeyframesEditor\|keyframes (editable)" demo/scenes | wc -l`⟩ → **0** · **0** (B-s1 BEFORE 4 · 4).
4. **The ONE dock-item descriptor + the dock** — kf **`e11db5a1`**: `surfaceTabs.ts` gains `DOCK_ITEM_KINDS` + `dockSurfaceItems(surfaces)` (pure, total: the three built-in kinds + ≥1 facet item; liveness read off the derived `surfacesFor` set — no per-scene table; `selectedSurfaceFrom` untouched, §0cd). `ChromeDock.vue`: the Controls-tab `<Select>` and the separate `Controls panel` toggle give way to four `DockControl shape="icon" compact` items (`data-dock-surface-item`, `data-surface`, `data-selected` on the scene's selected surface, `:active` = the open pane is showing it, `:disabled` → the producer's focusable `aria-disabled`); a press opens the shared pane on that surface, a press on the showing item closes it; the scene word is visually hidden below 400 px (still the trigger's value) so the dock is ONE row at 360. New witness `test/demo/app/dock-surface-items.test.ts` (6 cases: same four kinds on all six scenes · disable-not-drop · rendered names · press opens · press-showing closes · disabled inert + home empty). **Oracle re-seat (property unchanged)**: `scripts/observe/demo/live-session.mjs:909,957` (2 reads) + a note at `:220-223` and `live-session-mobile.mjs:767,785` (2 reads) read the projected surface from `[data-dock-surface-item][data-selected]`'s name instead of the deleted `[aria-label='Controls tab']`'s text; **adjacent edit (§0bt)** `scripts/lib/demo-driver.mjs:919-922` `navToScene`, the same selector.
5. **OA-39 — the landing column** — kf **`07fd5b7a`** (`layout.css` · `CubeScene.vue` · `EditorStartScreen.vue`): tokens `--home-cube-side` · `--home-cube-extent` (1.3 × side, the idle pose's projected footprint) · `--stage-top-inset` · `--stage-bottom-inset` replace `--start-hero-band` (its sole consumer was the recede rule). Phone only (max-width 1023 px): the cube centres in the stage (host's lower edge lifted by `--stage-bottom-inset − --stage-top-inset`); the start screen's band spans the same stage as three rows — headline centred above the cube's footprint, deck + hint (one new `.hero-sub` block) centred below it; text centred. Desktop bytes untouched.
6. **OA-40 — the sheet** — kf **`317fae99`** (`ChannelControls.vue` ×2 sites · `RibbonBar.vue` · `ControlsPaneWrapper.vue`): pane inline inset `pl-4 pr-4 lg:pr-7` (symmetric in the sheet, rail byte-identical); the sheet's lift `var(--stage-bottom-inset)` (anchor + stable band) so its bottom edge rests on the transport, never under it. The sheet's placement itself stays glass's: honest-RED **SHEET-POSITION** (BL F-21 — `.glass-floating` computes the sheet `position: relative`, in flow below the fold) — no consumer `fixed` written.

#### Gates — BEFORE → AFTER (served, headed Chromium; dev `localhost:5173` ×2 + gh-pages build `dist/gh-pages` served at `127.0.0.1:4176` ×2; ⟨`run-gates.sh`⟩, logs `evidence/W13V/s/logs/`; load avg at the runs 40.31 · 38.10 · 35.10 · 30.28)

| gate | BEFORE | AFTER dev-1 · dev-2 · gh-1 · gh-2 | verdict |
|---|---|---|---|
| **G-W13V-s1** B-s1 grep (`demo/scenes`) | 4 · 4 | **0 · 0** (grep, settled bytes ×2) | GREEN (grep) |
| s1 DOM — `@keyframes (editable)` anywhere in a stage | Spring: in the Physics pane | 0 on 21 scene×viewport cells, ×4 | GREEN |
| s1 DOM — stage inline editors per scene | Sequence 6 (inline timeline) · Square 2 / Spring 1 (subject handles) · rest 0 | identical ×4 (Sequence **6**) | **RED at Sequence only — ESC-s-1**; the other five scenes MATCH the canonical row |
| **G-W13V-s2** identical item set, each opens the shared pane (1440 + 390) | a Controls-tab Select (no per-kind items); Sequence none | every scene `Controls · Keyframes · Timeline · <facet>` (facet disabled on Cube*/Amiga/Square, all four disabled on Sequence); ⟨`items.mjs`⟩ each enabled item → pressed + pane open with content: **fails=0** at 1440 and 390, ×4 | GREEN (Sequence's items disabled — no data; its data move is ESC-s-1) |
| **G-W13V-s3** OA-39 landing (390×844, 360×740, light + dark) | dy **+144.3** · headline ∩ cube **true** | cube-box centre − stage centre = **(0.0, 0.0)** on 16/16 phone cells (2 viewports × 2 themes × 4 runs); headline ∩ painted cube **false**, deck ∩ cube **false**; headline ink centred **0.0** px, deck **0.0**; 1440×900 = BEFORE (painted centre 734.4, 464.4 — unchanged) | GREEN (stage = the layout's band-to-band region; see note) |
| **G-W13V-s4** OA-40 — sheet card insets | 41 / 53 (Δ 12) | **41 / 41 (Δ 0.0)** 16/16 cells (390 + 360 × light + dark × dev ×2 + gh ×2) | GREEN |
| s4 — transport ∩ open sheet | declared sheet bottom 772 inside transport 729–785 | declared bottom edge **722.6 < 729.1** (390) · **618.6 < 625.1** (360) — clear by construction; the LIVE sheet is `position: relative` in flow (SHEET-POSITION), so the live rect still reads transport ∩ sheet = 5 | consumer GREEN · live **honest-RED SHEET-POSITION** (glass BL F-21) |
| s4 — top dock one row | 390: layer scroll 400 > 366 with the items (pre-compact) | one row (all controls share one mid-line ±4, layer does not scroll) **21/21** cells ×4 (1440 · 390 · 360) | GREEN |
| floor — vue-tsc | 0 · 0 | **0 · 0** | GREEN |
| floor — `npm run check` | EXIT 0 · 0 | **EXIT 0 · EXIT 0** | GREEN |
| floor — demo vitest | 66/518 · 66/518 | **67/524 · 67/524** (+1 file / +6 cases, `dock-surface-items.test.ts`) | GREEN |

*Cube's facet item is LIVE while its Matrix channel is selected (`matrix-controls`, a channel facet — the derivation, not a table).

**Note on s3's "stage region"**: read as the layout's declared stage — the band-to-band region the stage cell reserves (`--stage-top-inset` … `100dvh − --stage-bottom-inset`). Against the visible dock EDGES instead (top dock bottom · transport top) the centre sits **+4.7 px** (390) / **+4.7 px** (360) below — the transport floats ≈9.6 px inside its band while the top dock sits at its band's top; the painted (rotated, projected) die's union box sits (+6.9, +6.9) off its rotation centre. Both figures are published, not folded.

#### Commits (keyframes.js, pathspec each, not pushed)

`e69f7731` Spring inline editor retired (the ONE-commit lock) · `e11db5a1` the ONE dock-item descriptor + the dock + oracle re-seat · `07fd5b7a` OA-39 landing column · `317fae99` OA-40 sheet insets + lift. ⟨`git log --oneline d94017ff..HEAD | wc -l`⟩ → 4. Every path inside the writable set except the declared §0bt adjacent edits (`scripts/lib/demo-driver.mjs:919-922`; the three test docblocks).

#### Escalation

- **ESC-s-1 — Sequence's inline timeline has no shared-pane seat (G-W13V-s1 RED at Sequence).** Measured: the Sequence stage carries five `Re-time row n start offset` handles + a `Scrub the sequence master clock` slider (`SequenceTarget.vue:151` · `SequenceScrubber.vue:27`) — an inline timeline. Its facility declares ONE light channel with no `animation` and no `surfaces` (`useSequenceDemo.ts:490-505`, so `surfacesFor` → []), so every dock item is honestly DISABLED (no data). Moving the editors onto the dock items is not a relocation: a row's start offset is the child's `at` insertion point on the master `Sequence` (`seq.add(childAnims[i], at[i])`, `useSequenceDemo.ts:166`; ⟨`grep -n delay src/animation/orchestration/sequence/sequence.ts`⟩ → **0** — the engine honours no child `delay`), which neither the shared Timeline pane (one Animation's keyframe offsets) nor the Controls pane (`ChannelOptions` → `anim.options`) can express. The two cures are both design acts outside `.s`'s charter and not substituted here: (a) Sequence's rows become transport channels (the T.B1 "rows are storyboard, not channels" decision reversed) with the Controls pane's delay mapped onto the Sequence placement, or (b) a Sequence mode for the shared Timeline pane (a new pane capability). Routed to **`.y`** (the design-author seat that owns Sequence's redesign, OA-49/51) for a ruling; the master-clock scrubber's move onto the ONE transport (a Sequence ribbon) rides the same ruling.

#### Residuals (carried by id)

- **SHEET-POSITION** (glass BL F-21) — the live sheet's placement; the consumer lift is correct by declaration (s4 row).
- **R-s-1 — the expanded-detent floor prose**: `ControlsPaneWrapper.vue:370-400` derives `EXPANDED_SUBJECT 0.36` against a lift b ≈ 0.08; with the lift now the whole transport band (b ≈ 0.144 at 844) the documented 0.45 unoccluded-stage floor reads ≈0.39 at 844. Constants unchanged (no gate names the floor); routed to `.c` (the controls-pane space unit, OA-47) with the derivation.
- **R-s-2** — the Spring stage prose still names code identifiers (`response / dampingFraction`), and its three readouts compete (OA-51 "the stage shows the subject … plain words"): `.y`'s (G-W13V-y5), untouched here.
- Honest-RED ids carried, none cured locally: `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM` · `SHEET-POSITION` · `B7 SPECULAR-REST` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`. 0 glass bytes.

**Status: PARTIAL** — G-W13V-s2 · s3 · s4 (consumer) · floor GREEN ×2 on dev and gh-pages; G-W13V-s1 GREEN on five scenes and by grep, RED at Sequence (ESC-s-1).

### KF.W13V.c

**Seat**: `claude-opus-5-5`. **Spec**: KF-W13 `:384` OA-47 (§0bz) · `:421-435` OA-51 "one control idiom" (§0ce) · inherited C1-1 (`execution/B/KF-W13R.md` Check 1 `:468`,`:474`; `.m` R-m-3). **Rulings consumed**: COHESION §0bz · §0ce · §0bt (ADJACENT-LINE — not needed, 0 adjacent edits) · §0bw (OA-45's control-row question rides KF.W13V via the registers — read, no act). **Frontier at open**: kf `317fae99` (`.s`'s last). **Evidence**: `keyframes/evidence/W13V/c/` — probes `probe.mjs` (Controls-pane rows / separator / pane + rail rects, per scene × viewport) · `rail.mjs` (the rail vs the menubar band) · `run-gates.sh` · `summarize.py`; logs `logs/`; frames `before/` · `after/`.

**Crash-recovery** — ⟨`git -C keyframes.js status --porcelain`⟩ → the 2 standing untracked value.js inbound letters only; 0 paths inside the writable set dirty; `## Unit receipts` held no `.c` receipt → FRESH, nothing inherited.

#### Acts, in order

1. **Served page first — the owner's frame reproduced** (`owner-2026-09-23-controls-space.png`: the `easing ✎` label alone on one line, the select on the next). ⟨`node probe.mjs http://localhost:5173 cube 1440x900`⟩ (headed) → Controls card rows `duration · delay · iterations · direction · fill mode` each one line (label/control mid-line Δ 0), **`easing` two lines (Δ 44 px, row 84 px)**, no separator before the easing group (`sepBeforeEasing false`), card **392 px**, rail **632 px**; frame `before/cube-1440x900.png`. The easing label also wore a second register (`text-small font-medium text-muted-foreground`, hand-rolled) beside the fields' glass `Label` (`.label{color:var(--foreground);font-size:var(--control-label)}`).
2. **C1-1 reproduced** — ⟨`KF_PLAYWRIGHT_DIR=<value.js> node scripts/observe/demo/occlusion.mjs`⟩ (fresh `dist/gh-pages` at `317fae99`) ×2 → **FAIL (1) · FAIL (1)**: `✗ easing/desktop/closed dock covers the subject's CONTENT RECT` (logs `occlusion-before-{1,2}.log`, load 17.25 / 22.27). Cause read (⟨`rail.mjs … easing 1440x900`⟩): `.controls-layout` is `items-start`, so the desktop rail is content-sized — at 10.0.1 metrics the easing Curve surface grows it to **798.1 px** (54 → 852.1) past its own [stage] area (792; grid rows `[top] 0px [stage] 792px [bottom] 0px`) and into the menubar band (758.6 → 831.1); the subject the oracle picks is the persistent ribbon's ball at 762 → 810, under the band. The stage cell reserves the dock bands (`.stage-cell{padding-block:var(--dock-band-reserve)}`); the rail reserved nothing.
3. **Anchor drift, recorded (INTENT at the true bytes)** — the baseline's B-c1 proxy grepped `AnimationControlsGroup.vue` (⟨`grep -n -i 'separator\|divider\|<hr' …AnimationControlsGroup.vue \| wc -l`⟩ → `0 · 0`, still), but the Controls card is `channel-controls/ChannelOptions.vue`: ⟨`git show 317fae99:…/ChannelOptions.vue \| grep -c '<Separator'`⟩ → `1 · 1` (the one above "advanced"; none above easing) → HEAD `2 · 2`. The served-page gate (a separator element is the easing group's previous sibling) is the reading of record.
4. **The control-row idiom — ONE commit family** — kf **`c1f3f39d`** ⟨`git show --stat c1f3f39d`⟩ → 3 files changed, 81 insertions(+), 16 deletions(-): `ChannelOptions.vue` (a glass `Separator` precedes the easing group inside `.labeled-field-grid`; the easing group is ONE subgrid row — the producer `Label` (`@mkbabb/glass-ui/label`) + the edit pencil in the label track, the `SelectTrigger` in the value track (`col-start-2 min-w-0`, was `col-span-full` on a second line); the `.gold-shimmer` detail cue rides an inner span, so KF-CO-18's "never a colour utility beside the shimmer" holds against `.label`'s own ink; the stale KF-CO-41 prose corrected) · `design-idioms.css` (`.labeled-field-grid` gaps onto glass's rungs: `column-gap: var(--space-atom)` — the gap every glass `.labeled-field` subgrid row already renders (`glass-ui.css`: `.labeled-field{gap:var(--space-atom)}`), which a subgrid honours over the parent's, so the 0.75rem literal was a value the rows never rendered and the composed easing row sat **2 px right** of the fields' value edge (measured 191.25 vs 189.25 → 187.25 = 187.25 after); `row-gap: var(--space-residue)`) · `channel-options-render-edge.test.ts` (case (7): the separator is the easing group's previous sibling; the label is glass's `Label` with an id; the group is two cells). Glass primitives only (`Separator`, `Label`, `Select*`); no producer selector copied.
5. **C1-1 — the rail bounded above the menubar band, at the consumer root** — kf **`3b5f483d`** ⟨`git show --stat 3b5f483d`⟩ → 2 files changed, 48 insertions(+), 2 deletions(-): `ControlsPaneWrapper.css` (desktop `@media (min-width:1024px)` only: the rail's block budget `max-block-size: min(100%, calc(100dvh − var(--dock-menubar-reserve) − var(--work-area-vertical-slack) / 2))` — its grid area, and the menubar band's top edge (layout.css's viewport-bottom → pill-top exclusion zone) less the rail's own top (the card centres with `margin:auto`); the wrapper → pane → content chain a flex column so the bound reaches the pane; `.controls-surface` the ONE scroller, the ribbon `flex-shrink-0` in view) · `ControlsPaneWrapper.vue` (the surface host gains `class="controls-surface"` + a comment). The mobile sheet's bytes are untouched (the rules ride the desktop media block). **The oracle is untouched** (⟨`git diff 317fae99..HEAD --stat -- scripts \| wc -l`⟩ → 0).
6. **OA-51 "a real slider with a visible thumb" — read, not in this unit's bytes.** The Controls card holds no slider (its rows are inputs + selects); the pane's sliders are `EasingSidebar.vue`'s `LabeledSlider` (`demo/scenes/easing/**`, `.y`'s) and `LayerConfigPanel.vue`'s (the advanced sub-pane). Both ride glass's default `Slider` recipe: ⟨`grep -n 'scrubber' node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts`⟩ → *"`scrubber` is the continuous-cylinder recipe — one glass segment whose leading edge IS the handle, with no visible thumb. `spectrum` is the gradient colour-picker recipe"*. A thumbed parameter slider is not an installed recipe (spectrum is a colour recipe — adopting it would be a misuse, not a cure) → **R-c-2**, routed below; no local thumb painted.

#### Gates — BEFORE → AFTER (served, headed Chromium; dev `localhost:5173` ×2 + gh-pages build of `3b5f483d` at `127.0.0.1:4176` ×2; BEFORE on a gh-pages build of `317fae99` at `127.0.0.1:4177` ×2; ⟨`run-gates.sh`⟩ · ⟨`python3 summarize.py`⟩; load avg at the runs 17.39–20.49)

| gate | BEFORE (`317fae99`) ×2 | AFTER dev-1 · dev-2 · gh-1 · gh-2 | verdict |
|---|---|---|---|
| **G-W13V-c1** every Controls row one line at 1440 (label/control mid-line ±2 px) | Cube 5/6 · 5/6 (`easing` Δ **44**) | **6/6, max Δ 0** on Cube · Amiga · Square · Easing · Spring × 4 runs (20/20 cells); Sequence has no Controls data (its items are disabled — ESC-s-1) | GREEN |
| **G-W13V-c2** a separator element precedes the easing group | `false · false` (B-c1 at the true file: 1 `<Separator>`, above "advanced" only) | `true` on 40/40 cells (5 scenes × 1440/390 × 4 runs); B-c1 at the true file → 2 · 2; test (7) GREEN | GREEN |
| **G-W13V-c3** Cube pane height, after < before | card **392 · 392** px, rail **632 · 632** px (1440×900); card 388.6 · 388.6 (390×844) | card **361** ×4, rail **601** ×4 (1440); card **357.6** ×4 (390) | GREEN — **−31 px** card / rail at 1440 (−7.9 %), −31 px at 390 |
| **G-W13V-c4** at 390 rows stack only where min width forces | Cube `easing` stacked (Δ 44) with a 268-px trigger | **6/6 one line, max Δ 0** on 5 scenes × 4 runs (20/20 cells); value track 180.7 px holds the glyph + curve name (`truncate` guards longer names) — no row's min width forces a stack | GREEN |
| **G-W13V-c5** `occlusion.mjs` `easing/desktop/closed` (C1-1) | **✗ · ✗** (FAIL (1) ×2) | **✓ · ✓** — `PASS: every observed scene × viewport × controls-state is occlusion-free` ×2, exit 0 ×2 (logs `occlusion-after-{1,2}.log`); rail 54 → **758.1** < band top **758.6** ×4, ribbon ball 668 → 716 ×4 | GREEN |
| floor — vue-tsc | 0 · 0 | **0 · 0** | GREEN |
| floor — `npm run check` | EXIT 0 · 0 | **EXIT 0 · EXIT 0** | GREEN |
| floor — demo vitest | 67/524 · 67/524 | **67/525 · 67/525** (+1 case, (7)) | GREEN |

#### Commits (keyframes.js, pathspec each, not pushed)

`c1f3f39d` the control-row idiom (ONE family: the card, the shared grid idiom, its mounted test) · `3b5f483d` C1-1 the rail bound. ⟨`git log --oneline 317fae99..HEAD | wc -l`⟩ → 2. Every path inside the writable set (`transport/**` · `styles/**` · `test/demo/**`); 0 adjacent edits; 0 glass bytes; 0 oracle bytes.

#### Residuals (carried by id)

- **R-c-1 — the Easing/Spring Curve·Physics surfaces exceed the bounded rail at 1440×900.** The rail now stops at the band (704.1 px budget); the easing Curve surface's content was 798.1 px, so the surface scrolls ≈94 px inside `.controls-surface` (derived: 798.1 − 704.1), with a hard edge (no scroll-fade on desktop — the fade idiom is the mobile sheet's). The surfaces' own height is `.y`'s redesign (OA-49/OA-51: "space used by the subject not by chrome"); `.y` re-reads it.
- **R-c-2 — SLIDER-THUMB (OA-51 "a real slider with a visible thumb")** — glass 10.0.1's `Slider` ships `scrubber` (no visible thumb, by recipe) and `spectrum` (a colour recipe); a thumbed parameter-slider recipe is a producer row. The Controls card holds no slider; the thumbless sliders sit in `.y`'s scenes (`EasingSidebar`, `SpringPhysicsFacet`) and the advanced sub-pane (`LayerConfigPanel`). **Route**: to glass by id beside O-58 at the next relay-writing seat (`.y`/`.u` hold the relay grant; this unit's writable set holds none) — never a consumer-painted thumb.
- **R-s-1 (received from `.s`) — the expanded-detent floor** (`ControlsPaneWrapper.vue` `EXPANDED_SUBJECT 0.36`): re-derived here — at b ≈ 0.144 (844) the floor needs t ≤ 0.44 − b ≈ 0.296, so 0.36 reads ≈0.39 < 0.45. **Not spent**: no gate of this unit names the floor, the live sheet is `position: relative` in flow (SHEET-POSITION, BL F-21) so no detent is measurable on the served page, and changing the rung would move `.s`'s landed s4 geometry — carried to the close with the derivation.
- Honest-RED ids carried, none cured locally: `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM` · `SHEET-POSITION` · `B7 SPECULAR-REST` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`.

**Escalations**: none.

**SELF-COUNT**: gates owned 6 (c1 · c2 · c3 · c4 · c5 · floor) → GREEN 6, RED 0; commits 2; residuals 3 (R-c-1 · R-c-2 · R-s-1).

**Status: DONE** — G-W13V-c1 · c2 · c3 · c4 · c5 · floor GREEN ×2 on dev and gh-pages (c5 ×2 on the built dist); C1-1 cured at the consumer root.

### KF.W13V.y

**Seat**: `claude-opus-5-5` (design-author, effort high). **Spec**: KF-W13 `:385` OA-49 (§0bz) · `:419-435` OA-51 (§0ce). **Rulings consumed**: COHESION §0bz · §0ce · §0bt (ADJACENT-LINE) · §0ci R-4 (frames local by default — the y1/y2 gates name their frames "committed", so the named mocks and before/after frames are force-added; bulk stays out). **Frontier at open**: kf `3b5f483d` (after `.c`). **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → 2 untracked standing mail letters, 0 modified paths; value.js — nothing inside this seat's writable set dirty → FRESH, no inherited hunks. **Evidence**: `keyframes/evidence/W13V/y/` (`DESIGN-NOTE.md` · `mocks/` · `before/` · `after/` · probes `frames.mjs` `shape.mjs` `mocks.mjs` · `logs/`). `demo/DESIGN.md` read whole (278 L, read-only; cited §§1–3, 5, 7–8). Owner frames read: `owner-2026-09-23-spring-page.png`, `…-easing-page.png`.

#### Acts, in order

1. **BEFORE on the served page** (dev `localhost:5173`, kf `3b5f483d`): ⟨`node frames.mjs http://localhost:5173/ before before`⟩ → 48 frames (6 scenes × stage+pane × 1440/390 × light/dark; pane = the scene's facet — Curve/Physics — else Controls). Reproduced (spring 1440): title `SpringProgress`; four violet readouts; verb line naming `response / dampingFraction`; sliders as bars with no value; figure title wrapping to 2 lines, legend to 3; presets as stadium pills each holding a mini-track; easing specimen tiles are stadium pills whose names wrap (`ease-in-out-` / `quad`); sequence shows two violet clock readouts; the square's badge stretched to a header-wide bar.
2. **Design note FIRST — value.js `7277a3c1`** (G-W13V-y1): `DESIGN-NOTE.md` — N-1 surfaces (stage = subject + one specimen head; editors = dock items opening the shared pane, `.s`'s canonical row unchanged), N-2 one control idiom (param row: label + live value on one line, slider beneath; presets = ONE glass ToggleGroup of tiles on `--radius-field`, no inner track), N-3 type scale (glass rungs; mono only for data), N-4 radius canon (glass `DESIGN.md:385-391`; stadium only single-line; glyph marks excepted), N-5 figures (one title line, one legend line, axis labels on the caption rung), N-6 stage specimen (one violet primary readout, plain-words verb line); per-scene subject/editor table. 7 mocks at 1440/390 from the served page (`mocks.mjs` injects the note's rules into the live page; no product byte). Committed before any kf byte (the first kf commit `9262899b` follows it).
3. **Instrument** — `shape.mjs` (y3 + y5 on the served page, per scene × vp × theme, stage and facet pane): y3 = elements whose computed radius is a stadium AND whose text lays out on > 1 line (a line = a cluster of vertically-overlapping text rects; visually-hidden 1-px boxes skipped — both refinements made BEFORE the banked baseline, recorded: the first cut counted the producer dock's hidden scene word as a second line); y5 = preset tiles' radius 16 px + 0 inner rail/ball/slider, `[data-figure-title]`/`[data-figure-legend]` each one line, stage `[data-readout=primary]` = 1 and 0 code tokens in the verb line (Cube/Amiga/Square exempt from the readout clause — their readout is one x/y pair or none, §8). BEFORE read on a copy of the gh-pages build of `3b5f483d` served at `127.0.0.1:4178` so the dev server stayed free for the edits: ⟨`node shape.mjs http://127.0.0.1:4178/`⟩ ×2 → **fails=12 · fails=12** (easing ×4: 16 multi-line stadium tiles at 1440, tiles `9999px`, no primary marker; spring ×4: 6 multi-line stadiums at 1440, tiles `9999px`, inner=8, violet=4, code=2; sequence ×4: violet=2, no primary).
4. **Spring — kf `9262899b`** (N-2 · N-3 · N-4 · N-5 · N-6): Physics facet = two param rows (`response 0.50 s`, `damping ζ 0.86` on the label line; glass `LabeledSlider` beneath; `valueText` for AT) — the new **`.param-row` idiom** in `demo/styles/design-idioms.css` (a grid cell stacking the producer field and an `<output class="param-value">`; the stacked full-width layout the easing facet carried locally is now the idiom's) · glass `Separator` · the parameter-space figure: ONE title line `Peak overshoot` + y-axis label `damping ζ ↕`, the live pair kept only as the field's sr-only `aria-describedby`, ONE legend line `0 → 53 % overshoot · set by damping alone`, field block 16rem → 12rem · `Separator` · four preset **tiles** on `--radius-field` (name + `0.5 s · ζ 0.86`), the in-tile rail/ball and its 60 Hz painter RETIRED (the four presets race on the stage's derby). Stage: title `Spring`; ONE violet readout (`position`, `data-readout="primary"`); velocity / sweep / trace numbers muted; verb line "Tap or drag the rail — the ball springs to the new target. Tune response and damping in the Physics pane."; `Timing-function sweep` and `Sampled curve` each one title + one legend line (x axis `time (ms) · 26 stops`). Tests re-seated (same property, new copy/register): `spring-heatmap-reversibility` (4) keeps the four analytic peaks and their order; (5b) SPF-3's painter case → "a preset tile holds its name and ONE parameter line, and no rail, ball or slider"; the legend oracle reads the new line; `spring-trace-truth` (5b) reads `[data-figure-legend].code-token` (lowercase ζ, tabular, nowrap, not accent); the glass stub gains `Separator`. **Declared retirement**: `BALL_HEADROOM` / `ballTravel` (the in-tile geometry) and their assertions leave with the track OA-51 removed — the owner ruling names the deletion; nothing else weakened.
5. **Easing — kf `0c8c690d`**: specimen tiles on `--radius-field` (the producer item's stadium held two lines); each name ONE line (tracking 0, nowrap, ellipsis, the item's `title` = the whole name); the literal is the stage's primary readout. Curve facet: duration → a param row (`1500 ms`) behind a `Separator`; the local `:deep` full-width block deleted (now the idiom). **Adjacent edit (§0bt)**: `test/demo/easing-catalogue.test.ts:105-107` — the glass stub gains `Separator` (the mounted sidebar imports it; no assertion touched).
6. **Sequence — kf `06b4d103`**: the header Metric (`clock … ms`) is the ONE primary readout; the scrubber's violet `0.000` fraction with its phosphor halo (a second readout of the same clock) becomes a muted caption; the `.seq-timecode` halo rule retires with the accent. The inline re-time handles are unchanged (ESC-s-1, `.s`'s).
7. **Square — kf `4fafc186`**: the `SETTLED/TRACKING` badge sized to its word (`self-start`; the telemetry column stretched the stadium into a bar).
8. **Cube · Amiga** — read on the note, no bytes: stage = subject, pane = `.c`'s row idiom; y3/y5 PASS at BEFORE and AFTER.
9. **AFTER** — gh-pages build of `4fafc186` (⟨`npm run gh-pages`⟩ → `✓ built`, EXIT 0) served from a copy at `127.0.0.1:4179`; frames ⟨`node frames.mjs http://localhost:5173/ after after`⟩ → 48; evidence commit value.js **`7a8a3a60`** (96 before/after frames + logs + the probe).

#### Gates — BEFORE → AFTER (served, headed Chromium; dev `localhost:5173` ×2 + gh-pages build served from a copy ×2 — BEFORE `3b5f483d` at `:4178`, AFTER `4fafc186` at `:4179`; load avg at the runs 12.35–28.16, `logs/*-load.txt`)

| gate | BEFORE | AFTER | reading |
|---|---|---|---|
| **y1** design note + 1440/390 mocks committed first | none | value.js `7277a3c1` (note + 7 mocks) precedes kf `9262899b` | **GREEN** |
| **y2** per-scene before/after frames 1440 + 390, both themes | — | 48 BEFORE + 48 AFTER (6 scenes × stage+pane × 1440/390 × light/dark), value.js `7a8a3a60` | **GREEN** |
| **y3** 0 stadium on multi-line elements (⟨`shape.mjs`⟩, 24 cells) | easing 16 + spring 6 at 1440 ×2 themes, ×2 runs | **0** in all 24 cells — dev ×2, gh ×2 | **GREEN** |
| **y4** DOM census = `.s`'s canonical row (⟨`node ../s/census.mjs <url> 1`⟩, 21 rows) | = `.s` | dev ×2 + gh ×2 **identical** to `.s`'s `census-gh-2.txt` (⟨`diff`⟩ → 0 lines) — Sequence's 6 stage handles = ESC-s-1, carried by `.s` | **GREEN** (row matched; ESC-s-1 not this unit's) |
| **y5** one idiom · tiles on `--radius-field`, no inner sliders · figures 1 title + 1 legend line · 1 plain-words readout (⟨`shape.mjs`⟩) | fails=12 ·12 (tiles `9999px`, spring inner=8, violet 4/2, code=2, no primary) | **fails=0 · 0 (dev), 0 · 0 (gh)**: tiles `16px`, inner 0, spring figure titles `[1,1,1]` legends `[1,1]`, primary=1 violet=1 code=0 on Easing/Spring/Sequence | **GREEN except the thumb clause** — SLIDER-THUMB (R-c-2), producer, honest-RED |
| floor vue-tsc | 0 (seat-0 bank) | **0 · 0** | GREEN |
| floor `npm run check` | EXIT 0 | **EXIT 0 · EXIT 0** | GREEN |
| floor demo vitest | 66/66 · 518/518 (seat-0) | **67/67 · 525/525 ×2** | GREEN |

#### Commits

- value.js: `7277a3c1` (design note + mocks + probes, FIRST) · `7a8a3a60` (evidence) · this record's commit.
- keyframes.js (pathspec each, not pushed): `9262899b` spring · `0c8c690d` easing · `06b4d103` sequence · `4fafc186` square.

#### Residuals (carried by id)

- **SLIDER-THUMB (R-c-2, producer)** — OA-51's "a real slider with a visible thumb": glass 10.0.1 ships `scrubber` (thumbless by recipe) and `spectrum` (a colour recipe); the param rows ride `scrubber`. No consumer thumb painted, `spectrum` not borrowed. This seat's writable set holds no relay path → **routed to `.u`** (the relay-holding seat) to write the O-row beside O-58.
- **R-y-1 — the Physics facet still scrolls inside the bounded rail at 1440×900** (R-c-1, narrowed): the field is 64 px shorter and the figure copy lost three wrapped lines (title 2 → 1, legend 3 → 1), but params + figure + tiles + action exceed the rail's budget less the ribbon card, so the preset tiles sit below the fold of `.controls-surface` (frame `after/after-spring-pane-1440x900-*.png`). The ribbon card's own height is the transport family's; carried to the close.
- **R-y-2 — the Sequence master-clock ball overhangs the card's left edge at progress 0** (frames `after-sequence-stage-*`): the scrubber rail starts at the row's padding edge and the 36 px ball centres on it. Pre-existing, outside OA-49's named defects; carried by id.
- **ESC-s-1** (`.s`'s) — the Sequence inline timeline; the census row matches `.s`'s with it carried.
- Honest-RED ids carried, none cured locally: `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM` · `SHEET-POSITION` · `B7 SPECULAR-REST` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`. 0 glass bytes.

**Escalations**: none.

**SELF-COUNT**: gates owned 6 (y1 · y2 · y3 · y4 · y5 · floor) → GREEN 6 (y5 with the SLIDER-THUMB clause honest-RED, producer), RED 0; commits 6 before this record (value.js 2 · kf 4); residuals 3 own (SLIDER-THUMB routed · R-y-1 · R-y-2) + ESC-s-1 carried.

**Status: DONE** — G-W13V-y1 · y2 · y3 · y4 · y5 · floor GREEN ×2 on dev and gh-pages; the thumb clause is the producer's (SLIDER-THUMB).

### KF.W13V.p

**Seat**: `claude-opus-5-5`. **Spec**: KF-W13 `:345` OA-35 (§0bl `.p`) · `:350-351` (§0bl second addendum, the O-58 canon `glass-ui/DESIGN.md:385-391`). **Rulings consumed**: COHESION §0bl · §0cb (O-58 "tiles use `--radius-pill`" glass-side; R-5 landing likely 11.0.0) · §0bt (ADJACENT-LINE: none needed). **Frontier at open**: kf `4fafc186` (after `.y`), glass installed `10.0.1`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → the 2 standing untracked mail letters, 0 modified; value.js inside the writable set → **inherited** `keyframes/evidence/W13V/p/tiles.mjs` (81 L, a killed predecessor's probe, uncommitted) + an empty `logs/`. Read whole and judged: the census and the p1/p2 laws conform to the gates. Its line law was text-only, which does not meet the brief's "by computed height", so this seat widened it (act 2). **E13**: ⟨`find <four paths> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 files. 0 UNREAD in scope.

#### Acts, in order

1. **Text-law census** (the inherited probe as found; dev): ⟨`node tiles.mjs http://localhost:5173/`⟩ → `tile-reads=80 p1-fail=0 p2-fail=0` (`logs/textlaw-dev-1.txt`). It caught only the 4 spring presets. The 28 easing specimens escaped because each has a one-line name over a sparkline, which the text-only law reads as one line.
2. **Probe widened to the height law** (the brief says "by computed height"): a painted graphic leaf (svg/canvas/img/video) now counts as a row box, so a sparkline stacked over a name reads 2 rows. An icon beside its label still overlaps vertically and reads 1 row. The census summary also records each tile's computed height range.
3. **Census, height law, served page** (7 routes × stage + every enabled dock-surface pane × 1440×900 / 390×844 × light / dark; ×2 dev, ×2 gh-pages build of `4fafc186`, ⟨`npm run gh-pages`⟩ → `✓ built`, EXIT 0, served from a copy at `127.0.0.1:4181`). Distinct multi-line selectable tiles: **32**. There are **28** easing specimens (`button.toggle-group__item[role=radio]`, 2 rows, h 98–101 px, r 16) and **4** spring presets Smooth/Snappy/Bouncy/Gentle (same element, 2 rows, h 58–65 px, r 16). No other route or pane holds a multi-line selectable tile. Sequence exposes no enabled dock surface to this probe, so only its stage was read.
4. **UIA-KF-046's third site, the "Curve preset strip"**: ⟨`node curve-popup.mjs <base>`⟩ ×2 dev + ×2 gh. At glass 10.0.1 it is the Curve facet's `Easing preset` Select. Its listbox holds **31** `div.glass-menu-row[role=option]`, each 1 row, h 44, **r 12** (glass's own menu row; ≤ 16). No multi-line tile there. The ten category chips (All…Steps) are 1-row stadiums, which is lawful.
5. **The re-point is already at the bytes**. `.y` landed it under OA-49/51 (N-4): `SpringPhysicsFacet.vue:198` `.preset-cell { border-radius: var(--radius-field) }` (kf `9262899b`) and `EasingTarget.css:116` `.specimen-tile { border-radius: var(--radius-field) }` (kf `0c8c690d`). Both are canon re-points to the producer token. ⟨`grep -rn radius-field demo --include=*.vue --include=*.css | wc -l`⟩ ×2 → **3 · 3** (2 declarations + 1 comment; seat-0 B-p3 was 0). The census finds no multi-line tile outside those two sites, so **this seat writes 0 keyframes.js bytes**. That follows the brief ("re-point each"): every tile is already re-pointed. A second local rule would be the "new local style" the lock forbids. **R.2 note:** p1/p2 read GREEN at this seat's open because `.y` cured them under its own gate y3 and y5 ("presets … on `--radius-field`"). Seat-0's RED B-p3 was banked before `.y`.
6. **Primitive check at 10.0.1 (p3)**: `ToggleGroupItem` has no shape axis (`dist/components/toggle-group/ToggleGroupItem.vue.d.ts`: value/disabled/class). `dist/glass-ui.css` `.toggle-group__item{…border-radius:var(--radius-pill)…}` applies unconditionally. `Card` has `selected?: boolean` (`Card.vue.d.ts:29`, "makes the card an option") but no group, roving focus or radio semantics. BL's ruling lives in D4 (`glass-ui:docs/tranches/BL/FORMATION-PROGRESS.md:20`): round 0 DONE `91dbcbd8`, pass 1 **PAUSED**. ⟨`npm view @mkbabb/glass-ui version`⟩ → `10.0.1`. BL's primitive is not installable, so this seat records **`TILE-PRIMITIVE` honest-RED with O-58**. `Card selected` is not adopted unilaterally, because which primitive owns the tile is BL's ruling (spec `:351`).
7. **Relay**: `docs/tranches/X/relay/X-KF-BK-O58-TILE-PRIMITIVE.md`, an addendum beside O-58, plus INBOX row **O-67** (FILED), both in value.js `e3a7ece5`. Evidence (probes + 24 logs): value.js `bda1d75d`. The one frame `logs/curve-popup-1440-light.png` stays local (`.gitignore:34` `*.png`; not a named gate frame).

#### Gates — BEFORE → AFTER (served, headed Chromium; dev `localhost:5173` ×2 + gh-pages build of `4fafc186` ×2; load 15.98 / 19.93 / 22.51 / 19.98, `logs/*-load.txt`)

| gate | BEFORE | AFTER (this seat's reading) | reading |
|---|---|---|---|
| **p1** every multi-line tile computed radius ≤ `--radius-field` | seat-0 B-p3 **0** (kf `d94017ff`, before `.y`) | ⟨`tiles.mjs`⟩ dev ×2, gh ×2 → `tile-reads=640 p1-fail=0` each; 32 distinct tiles at 16 px = field (16 px) | **GREEN** (0 → all 32) |
| **p2** 0 `rounded-full`/`9999px` on elements taller than one line | `.y` BEFORE: 22 multi-line stadiums at 1440 | `p2-fail=0` ×4 (every painted stadium on the page, 28 cells × views); the 16 byte hits (⟨`grep -rn "rounded-full\|9999px" demo \| wc -l`⟩ → 16 · 16) all lay out on one row | **GREEN** |
| **p3** BL tile primitive adopted if installable at 10.0.1, else `TILE-PRIMITIVE` honest-RED with O-58 | — | not installable (D4 pass 1 paused; npm `10.0.1`); O-67 relay filed | **honest-RED `TILE-PRIMITIVE`** (owner: glass BL D4) |
| floor vue-tsc | 0 | **0 · 0** | GREEN |
| floor `npm run check` | EXIT 0 | **EXIT 0 · EXIT 0** | GREEN |
| floor demo vitest | 67/67 · 525/525 (`.y`) | **67/67 · 525/525 ×2** | GREEN |

#### Commits

- value.js: `bda1d75d` (evidence: `tiles.mjs` · `curve-popup.mjs` · 24 logs) · `e3a7ece5` (relay addendum + INBOX O-67) · this record's commit.
- keyframes.js: none. Every tile was already on the canon token (act 5).

#### Residuals (carried by id)

- **`TILE-PRIMITIVE`** (producer, glass BL D4; O-58 / O-67 / UIA-KF-046): honest-RED. On landing, the consumer adopts the primitive and deletes the two consumer radius rules (relay §5).
- **UIA-KF-047** (matrix cells as discs, single-value fields) is not a multi-line tile. It stays with `.u` (routed with the UIA register).
- Honest-RED ids carried, none touched: `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM` · `SHEET-POSITION` · `B7 SPECULAR-REST` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`. 0 glass bytes.

**Adjacent edits**: none. **Escalations**: none.

**SELF-COUNT**: gates owned 4 (p1 · p2 · p3 · floor) → GREEN 3 (p1 · p2 · floor), honest-RED 1 (p3 `TILE-PRIMITIVE`, producer), RED 0. Commits before this record: 2 (value.js). Tiles in the census: 32 (28 + 4). Inherited paths: 1 (`tiles.mjs`).

**Status: DONE**. p1 and p2 are GREEN ×2 on dev and gh-pages, and the floor is GREEN ×2. p3 is `TILE-PRIMITIVE` honest-RED with O-58 (O-67 filed).

### KF.W13V.k

**SERVED MODEL**: `claude-opus-5-5` (Opus 5.5, effort high). **Spec sections executed**: KF-W13.md `:346` (§0bl `.k`) · `:353-354` (§0bn) · `:390-395` (§0cb glass round-2 facts); COHESION §0bn · §0cb · §0ci R-1 read for the rulings consumed. **Writable set** as briefed (kf `demo/**` · `src/**` · `test/**` · `scripts/observe/**`; value.js relay/INBOX O-row/evidence `W13V/k/**`/this receipt/LEDGER line).

**Crash-recovery** — ⟨`git -C keyframes.js status --porcelain`⟩ → 2 untracked coordination letters (standing), **0 modified paths**; ⟨`git -C value.js status --porcelain -- docs/tranches/X/relay docs/tranches/X/keyframes/evidence/W13V docs/tranches/X/execution/B/KF-W13V.md`⟩ → empty. No inherited partial work; FRESH seat. kf HEAD at open `4fafc186` (the `.y` tail).

**Anchor drift at true bytes (INTENT kept, recorded)** — KFA-1's `CubeTarget.vue:15` gate and `useTransformState.ts` watcher: live, moved (watcher at `:262-290`, not `:276-293`); the cube is already one-element-per-owner since KF.W13U.w (`.cube-bob > .cube-pose > .cube`), so KFA-2's "paintTarget writes `.cube`" was still live via `cubeElRef`. KFA-12 `view-transition.ts:233-243` live at `:233-236`. KFA-17 `useSequenceDemo.ts:254/271` live at `:253-268`; `lifecycle.ts:108` live. KFA-18's `ChannelOptions.vue:933-941` onMounted drifted to `:1002-1010`; `useTimingFunctionEditor.ts:148-152` live at `:149-152`. KFA-181 `frame.ts:130-134` live. KFA-3 `SequenceTarget.css:239-244` live. KFA-15 `KeyframesEditor.vue:253` + `KeyframesAddDialog.vue:51` live.

#### Acts in order (each cure: BEFORE → AFTER with the audit's own capture script, ×2 AFTER; tests born-RED verified by swapping the HEAD copy of the cured file in and out)

1. **KFA-1 · KFA-2 · KFA-29 — one playing-state authority, one writer per element** → kf **`027b6f99`**. CubeScene's `isPlaying`/`isStarted` are read-only projections of `machine.status` (the house `useSceneTransport`; autoplay PLAY now counts) and are no longer exposed (no shell write-back); the orbit container ALWAYS composes its `rotate3d`; the drag→`matrix3dEnd` watcher (+ its translate write-back / echo guard / `updateTransformations`) is deleted, so only cell/Reset intents write the Matrix channel; the pre-start painter targets `.cube-pose` and writes only while the group is idle. ⟨`node evidence/W13V/k/kfa-1-2/writers.mjs`⟩ (the audit's `cube-orbital-drag-inertia/writers.mjs`) BEFORE ×2 → `{"cube:rotateX":295,"cube:matrix3d":135,"pose:matrix3d":290}` / `cube frames with >1 writer kind: 134` · `…131…` / `130`; AFTER ×2 → `{"cube:rotateX":292,"orb:translate3d":10}` / `0` · `{"cube:rotateX":293,"orb:translate3d":10}` / `0`. Tests: `cube-roll-and-prestart.test.ts` — #53's case and the start→end-delta case **re-seated onto the cell intent** (the property each guards is kept: a serialized `matrix3d` painted; a real start→end delta), + `KFA-1/KFA-29 — an orbit drag never writes the Matrix channel` + `KFA-2 — once the group has started, the painter never writes`.
2. **KFA-33 — the orbit container follows the whole Euler triple** → kf **`505f6a0c`**. `containerStyle` depended on `rotate.x` alone (a pure yaw froze the container). Test born-RED ⟨swap HEAD `OrbitalDrag.vue`; `npx vitest run --project demo test/demo/scenes/orbital-rotate3d.test.ts`⟩ → `× KFA-33 …`; GREEN 5/5 after. Served ⟨`writers.mjs` ×2⟩ orbit writes over a horizontal fling+coast **10/10 → 246/257**, `.cube` two-writer frames 0/0.
3. **KFA-3 — the sequence ball travels on the individual `translate`** → kf **`28e97ec3`**. ⟨`node summarize.mjs before|after|after2`⟩ over the audit's `sequence-staggered-rows/capture.mjs` → rest offset ball-vs-gate per row **[0,-22.5,-45,-67.5,-90.1] → [0,0,0,0,0] ×2**; the worst rail-end overrun BEFORE was bp 0.75 × scale 1.15 (+9.1 px); AFTER only the glide spring's own 2.3 % overshoot at bp 1.023 (+9.6 px — lawful spring physics, not KFA-3). No jsdom test (CSS composition is not computable there; the served capture is the gate).
4. **KFA-12 — `startViewTransition` called as a method; the swap spring follows the dispatch handle** → kf **`cb9e1aa5`**. Library: `const start = doc.startViewTransition!.bind(doc)`; the two unit stubs now throw `Illegal invocation` on a wrong receiver (born-RED ⟨swap HEAD `view-transition.ts`⟩ → `2 failed | 5 passed`; GREEN 7/7). Demo: `useSceneTransition` exposes `lastSwapBackend` from the handle; `useSceneSwap` stands its spring down only when that reads `view-transition` (consumed per swap; a hash/back-forward switch falls through to the spring) — the one-shot `supportsViewTransitions()` probe is retired. +2 cases in `e-w1-encapsulation.test.ts`. Served ⟨`node evidence/W13V/k/kfa-12/probe-vt-binding.mjs`⟩ (the audit's) BEFORE → `[{this===document:false, threw:"Illegal invocation"} ×2]`; AFTER ×2 → `[{doc:true,native:true}]`, `#/amiga`; ⟨`vt-anims.mjs`⟩ ×2 → `maxViewTransitionPseudoAnims: 10` · `10` (audit: 0).
5. **KFA-17 (sequence leg) — Play after a scrub runs the master** → kf **`47f2627e`**. `Sequence.resume()` on a seeked-only sequence silently returned (no `_playingPromise`); it now begins a play FROM the retained playhead through the one loop-start body `play()` shares (`playFrom`; `play() = playFrom(0)`). The demo reflects the natural end once per play promise (`reflectNaturalEnd(sequence.finished)`). Library test born-RED ⟨swap HEAD `lifecycle.ts`⟩ → `1 failed | 20 passed`; GREEN 21/21. Served (the audit's `sequence-reel-egg/dockprobe3.mjs`, `dockprobe4.mjs` + a no-cancel variant `heldplay.mjs` of dockprobe4, ×2): scrub → Play **970 frozen PLAYING (audit) → 970→1409 in 450 ms → 1940 READY** ×2; scrub → reel → held Play **frozen (audit) → honoured at the reel's settle, 1940 READY** ×2.
6. **KFA-18 · KFA-21 — the running animation is the truth at mount** → kf **`b84fa236`**. An empty store bucket for a LIVE animation is seeded FROM its options (duration/delay/iterations/fill/direction + the easing as the catalogue literal: CSS twin, else the engine-registry name hyphenated); `ChannelOptions` no longer re-applies the stored easing on mount; an easing edit goes through the engine's identity-preserving `animation.setTimingFunction` (re-seats inherited frames only). Tests: `test/demo/state/kfa-18-authored-timing.test.ts` (+2, born-RED ⟨swap HEAD store + editor⟩ → `2 failed`); the render-edge fixture now builds its channels FROM the store the way the cube does (the mount re-apply that used to impose the bucket on the fixture is gone; every assertion kept). Served ⟨`node summarize.mjs`⟩ over the audit's `amiga-boing-composite/probe-easing.mjs`: BEFORE (audit `easing-probe.json`) ease-in-out on **12/12** compiled frames → AFTER ×2 **0/12** (Spin + X linear `0.1,0.25,0.5,0.75`; Y its FALL/RISE pair, 2 distinct frame curves); ⟨`kfa21-store.mjs` ×2⟩ the pane's buckets → Spin/X `8000ms normal linear infinite`, Y `1600ms normal` (the dark-leg frame `critic/legs/amiga-dark.png` shows the pane reading 8000ms · normal · linear).
7. **KFA-181 — a non-final wrap carries its overshoot** → kf **`5ae589ab`** + **`d4085ab4`** (the setter folded to one line to hold `proof:structure`'s 500-line ceiling: ⟨`npm run proof:structure`⟩ R4 `animation.ts 502` → PASS, 497 L). The next iteration begins one duration after the last began (`carriedStartTime`, consumed by the next lazy start; cleared by settle and by any external `startTime` write). Tests: `test/engine/iteration-carry.test.ts` (+2, born-RED ⟨swap HEAD `frame.ts`⟩ → `2 failed`); the two event-order locks (`event-ordering.test.ts` clause 2, `sync-step.test.ts` clause 2) **re-seat their DRIVE onto the true clock** (3×100 ms ends at 300, not after six re-based steps) — every ordering assertion kept. Served (the audit's `amiga-boing-composite/capture.mjs` ×2; ⟨`node summarize.mjs`⟩): floor-minimum offset from each wall hit **[+33,+84,+117,+167] ms → [0,0,0,0] ×2**; child clocks while playing `(X mod 1600) − Y` **183.1 ms → 0 · 0**.
8. **KFA-15 — the edit-feedback sweep's rest sits on its own property** → kf **`431e5bcc`**. Both twins rest at `[transform:scaleX(0)]` (Tailwind 4's `scale-x-0` is the individual `scale: 0 1`, which multiplied the animated `transform` by zero). **Adjacent edit** (§0bt): `test/demo/instrument/KeyframesAddDialog.test.ts:253` — the rest-class assertion names the new class (property kept: rests at zero). **Served re-capture OWED**: the audit's path (`keyframes-editor-cards/capture.mjs` reaches the Spring scene's inline section) was retired by `.s`; an adapted probe (`kfa-15/sweep.mjs`, `look.mjs`) found the dock's Keyframes item (button at 880,71) but no card editor opened in 2.5 s (0 `.progress-bar`, 0 editable cards) — the instrument did not reach the surface; recorded, not claimed.

**Commits (keyframes.js, pathspec, in order)**: `027b6f99` · `505f6a0c` · `28e97ec3` · `cb9e1aa5` · `47f2627e` · `b84fa236` · `5ae589ab` · `431e5bcc` · `d4085ab4`. Not pushed (the branch was already ahead of origin with sibling units' commits; the push is the close's act).

#### G-W13V-k3 — the critic's gaps, captured and judged (headed, dev page, kf `d4085ab4`)

- **6-scene × {Play, Pause, Reset, Reverse, scrub}** — ⟨`node evidence/W13V/k/critic/transport-matrix.mjs`⟩ ×2 (one frame per cell under `critic/matrix/`; the playhead read on the transport's own scrub slider `[role=slider][aria-label*=crub]`). Run 1 ≡ run 2 cell-for-cell:

| scene | Play | Pause | Reset (while paused) | Reverse | scrub |
|---|---|---|---|---|---|
| cube | ok (3695→4114→4522) | ok (holds) | **FAIL** (4450→4450) | ok (4645→4339→4034) | ok |
| amiga | ok (0→429→837) | ok | **FAIL** (800→800) | ok (929→623→317) | ok |
| square | ok | ok | **FAIL** (660→660) | ok | ok |
| easing | ok | ok | **FAIL** (1350→1350) | **FAIL** (pressed, playhead keeps rising 864→1210→1385) | ok |
| spring | ok | ok | **FAIL** (420→420) | ok (wraps 1181→87) | ok |
| sequence | ok (0→21→41) | ok | **FAIL** (82→82) | n/a (no Reverse on the surface in view) | ok |

  Judged: **Reset-while-paused leaves the readout at the paused value on all six scenes** — cause measured at the bytes (`useAnimationSync.ts`: the rAF mirror idles after 30 stable paused frames; `useAnimationGroupActions.reset` → `group.stop()` writes the markRaw clock with no reactive signal, and `isPlaying` does not change, so nothing wakes the mirror). A Play afterwards runs from 0 (⟨`kfa-17-cube/reset-paused.mjs` ×2⟩ → `afterReset 4255.7 … trace [122.4, 234.7, …]`) — the rewind happens, the readout lies. This is KF.W13U's `R-x-1`. **Not cured this seat** (the wake needs one transport-epoch authority the Reset path and the channel mirror share — a cross-component design act, not a line) → honest-RED **`RESET-READOUT-STALE`**, owner the `.k` successor. **Easing Reverse** keeps the sweep forward (new reading; the same family as KFA-44 on the spring Sweep) → honest-RED by the same owner.
- **Dark legs** — ⟨`node evidence/W13V/k/critic/legs.mjs`⟩ → `cube-dark` html `dark` bg `rgb(11,10,9)`; `amiga-dark` likewise; light twins `rgb(251,250,248)`. Judged from the frames: the cube re-light reads in dark (top face brightest, the turned-away faces shaded — no inversion); the Amiga grid composes (floor + back wall legible on the dark ground); the ball rests mid-room at load with no floor contact, so the contact-shadow leg is not exercised at rest (the live leg is covered by the KFA-181 capture). No new defect filed from the dark legs.
- **Mobile Sheet (390×844, cube)** — the dock's Controls opens the Sheet at its peek detent (`controls-drawer-content`, y 716.1, h 171). Judged: the Sheet's transport shows **both faces at rest** — a grey ghost of the collapsed summary capsule behind the expanded Pause/"Rotations" face (`critic/legs/mobile-sheet-open.png`); producer family KFA-50/189 → relayed in O-69 (no consumer copy). The top dock's collapsed mark is an irregular soft shape → DOCK-MORPH-ROOT (O-56/O-64), relayed.
- **Matrix-editor cell/reset tweens · toasts · tooltips · the tab-panel `@keyframes enter` slide** — **NOT captured this seat** (the budget went to the ten cures above). Honest-RED **`CRITIC-GAPS-UNCAPTURED`** (4 of the 7 critic items), owner the `.k` successor. G-W13V-k3 therefore reads **RED (3 of 7 captured and judged)**.

#### G-W13V-k4 — KFA-17 / C6-3 `[real-cube]` intermittent

- The sequence leg of KFA-17 is **cured at cause** (act 5).
- The cube leg: ⟨`KF_PLAYWRIGHT_DIR=<value.js> node scripts/run-demo-roster.mjs --only=subject-animates`⟩ ×4 on a fresh `npm run gh-pages` build at `47f2627e`+ (load 117 · 131 · 134 · 188) → **`✓ [real-cube]` 4/4** (e.g. `playhead held 61 … 61 → 67.5 → 1344.3`, nodes `{"bob":40,"pose":1,"spin":40}`). The recorded failure signature (KF.W13U R-close-2: playhead 0 → −1275 → −33.3 counting UP, nodes held `{1,1,1}`) is the engine's paused-clock arithmetic when a child with a stale `pausedTime` restarts with `startTime` undefined (`frame.ts` `begin()` anchors at `t`, then `advanceBody` subtracts `t − pausedTime` → local = −(paused span)); the cure this seat landed (act 1) removed the one path that re-authored a PLAYING channel every frame (`adoptCompiled` from the drag watcher) — but **no run reproduced the failure before or after**, so the mechanism is inferred, not isolated. **G-W13V-k4 reads RED (not resolved at cause)**: honest-RED **`REAL-CUBE-INTERMITTENT`**, owner the `.k` successor (next act: an instrumented roster read that logs each child's `startTime`/`pausedTime` at the Play edge).

#### Glass rows (§0cb) — O-69

⟨`node evidence/W13V/k/split.mjs`⟩ → the 33 glass-touching rows: **13** producer-live relay-only · **12** cured-at-glass-HEAD, honest-RED until the landing repin (§0cb R-5) · **3** reframed, re-read still-live by KF.W13R `.v` · **5** consumer halves → `.u`. Installed glass 10.0.1 carries none of the 28 producer cures (§0cb) → nothing adopted, nothing copied. Batched addendum written: `docs/tranches/X/relay/X-KF-BK-O60-W13V-K-ADDENDUM.md` (O-69, beside O-60; adds the mobile-Sheet ghost-face and collapsed-mark readings) + INBOX O-69 row.

**KFA-14** — ⟨`npm view @mkbabb/value.js versions`⟩ → `… "4.0.0"` (latest); value.js `package.json` `4.1.0` carries the legacy-comma grammar (`acb7dca7` / `7e60d700`) **unpublished**; §0ci R-1: value.js publishes at X-W11. kf pin stays `4.0.0` (no bump to an unpublished version; no kf colour workaround). → honest-RED **`VALUEJS-LEGACY-RGBA`**, owner value.js X-W11 publish → kf bump.

#### G-W13V-k1 — the open/cured split of all 228 KFA rows (per-row table)

⟨`node evidence/W13V/k/split.mjs '<cured map>'`⟩ ×2 → `{"rows":228,"unique":228,"tally":{"CURED":11,"OPEN — honest-RED, not cured this seat":183,"honest-RED relay-only":13,"honest-RED until the landing repin":12,"honest-RED":1,"routed":5,"honest-RED relay":3}}` — SELF-COUNT 11 + 183 + 13 + 12 + 1 + 5 + 3 = **228**. Prior-wave credit: KF.W13U's receipts name no KFA row cured (they cite KFA-1/-17 as open, owned here); KF.W13R `.v` read 12 rows CURED-BY-REPIN, which §0cb R-5 does not credit (carried as "until the landing repin"). The 183 OPEN rows are consumer rows whose causes the register places in keyframes.js; none was re-read or cured this seat, and none is claimed cured by `.s`/`.c`/`.y`/`.p` without a read (several — e.g. KFA-9, 40, 43 — sit on surfaces those units rebuilt; the successor re-reads them first). **G-W13V-k1 reads RED** (183 consumer rows open, owner named).

| row | sev | surface | disposition | owner / evidence |
|---|---|---|---|---|
| KFA-1 | BROKEN | cube-orbital-drag-inertia, cube-relit-fa | CURED (this seat) | `027b6f99` · writers.mjs ×2 |
| KFA-2 | BROKEN | cube-orbital-drag-inertia, cube-group-sp | CURED (this seat) | `027b6f99` · writers.mjs ×2 |
| KFA-3 | BROKEN | sequence-staggered-rows, sequence-reel-e | CURED (this seat) | `28e97ec3` · staggered-rows capture ×2 |
| KFA-4 | BROKEN | square-drag-spring-tether | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-5 | BROKEN | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-6 | BROKEN | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-7 | BROKEN | transport-dock | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-8 | BROKEN | chrome-dock-expand-collapse | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-9 | BROKEN | easing-gallery-race | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-10 | BROKEN | easing-gallery-race | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-11 | BROKEN | easing-picker-curve | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-12 | BROKEN | scene-swap-transition | CURED (this seat) | `cb9e1aa5` · probe-vt-binding ×2 |
| KFA-13 | BROKEN | transport-dock, cube-group-spin-matrix-b | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-14 | BROKEN | timeline-panel | honest-RED `VALUEJS-LEGACY-RGBA` | value.js X-W12 `.l` — grammar fix in value.js 4.1.0 (acb7dca7/7e60d700), UNPUBLISHED (npm 4.0.0); publish at X-W11 (§0ci R-1) → kf bumps then |
| KFA-15 | BROKEN | keyframes-editor-cards | CURED (this seat) | `431e5bcc` · served re-capture OWED (audit path retired by `.s`) |
| KFA-16 | BROKEN | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-17 | BROKEN | sequence-reel-egg | CURED (this seat) | `47f2627e` · dockprobe3/4 + heldplay ×2 |
| KFA-18 | HIGH | amiga-boing-composite, amiga-contact-sha | CURED (this seat) | `b84fa236` · probe-easing ×2 |
| KFA-19 | HIGH | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-20 | HIGH | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-21 | HIGH | square-tour, amiga-boing-composite, amig | CURED (this seat) | `b84fa236` · kfa21-store ×2 |
| KFA-22 | HIGH | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-23 | HIGH | home-landing-cube, home-hero-aurora | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-24 | HIGH | scene-swap-transition | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-25 | HIGH | scene-swap-transition | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-26 | HIGH | scene-swap-transition | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-27 | HIGH | scene-skeleton-shimmer | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-28 | HIGH | home-typing-dots | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-29 | HIGH | cube-group-spin-matrix-bob | CURED (this seat) | `027b6f99` · writers.mjs ×2 (pose writes 290 → 0) |
| KFA-30 | HIGH | cube-orbital-drag-inertia | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-31 | HIGH | cube-relit-faces, cube-group-spin-matrix | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-32 | HIGH | cube-relit-faces | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-33 | HIGH | cube-relit-faces | CURED (this seat) | `505f6a0c` · writers.mjs ×2 |
| KFA-34 | HIGH | square-drag-spring-tether | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-35 | HIGH | easing-gallery-race | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-36 | HIGH | easing-picker-curve | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-37 | HIGH | easing-picker-curve | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-38 | HIGH | spring-live-solver, spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-39 | HIGH | spring-live-solver | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-40 | HIGH | spring-derby-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-41 | HIGH | spring-derby-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-42 | HIGH | spring-derby-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-43 | HIGH | spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-44 | HIGH | spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-45 | HIGH | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-46 | HIGH | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-47 | HIGH | sequence-staggered-rows, sequence-reel-e | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-48 | HIGH | sequence-reel-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-49 | HIGH | sequence-power-on-cascade | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-50 | HIGH | chrome-dock-expand-collapse, chrome-dock | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-51 | HIGH | chrome-dock-expand-collapse | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-52 | HIGH | chrome-dock-expand-collapse | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-53 | HIGH | chrome-dock-expand-collapse, transport-d | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-54 | HIGH | transport-dock | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-55 | HIGH | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-56 | HIGH | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-57 | HIGH | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-58 | HIGH | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-59 | HIGH | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-60 | HIGH | playback-ribbon-visualizer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-61 | HIGH | playback-ribbon-visualizer | routed (§0cb consumer half) | KF.W13V `.u` |
| KFA-62 | HIGH | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-63 | HIGH | copy-button-feedback | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-64 | MEDIUM | amiga-grid-room-backdrop | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-65 | MEDIUM | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-66 | MEDIUM | amiga-boing-composite, amiga-grid-room-b | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-67 | MEDIUM | amiga-grid-room-backdrop | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-68 | MEDIUM | amiga-grid-room-backdrop | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-69 | MEDIUM | amiga-boing-composite, cube-group-spin-m | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-70 | MEDIUM | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-71 | MEDIUM | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-72 | MEDIUM | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-73 | MEDIUM | home-hero-aurora | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-74 | MEDIUM | home-animated-text | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-75 | MEDIUM | scene-swap-transition | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-76 | MEDIUM | scene-swap-transition | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-77 | MEDIUM | scene-swap-transition | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-78 | MEDIUM | scene-skeleton-shimmer | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-79 | MEDIUM | scene-skeleton-shimmer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-80 | MEDIUM | scene-skeleton-shimmer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-81 | MEDIUM | cube-group-spin-matrix-bob | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-82 | MEDIUM | cube-orbital-drag-inertia | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-83 | MEDIUM | cube-orbital-drag-inertia | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-84 | MEDIUM | cube-orbital-drag-inertia | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-85 | MEDIUM | cube-relit-faces | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-86 | MEDIUM | cube-roll-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-87 | MEDIUM | cube-roll-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-88 | MEDIUM | cube-axis-lines | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-89 | MEDIUM | cube-loader-spin | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-90 | MEDIUM | square-tour, square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-91 | MEDIUM | square-tour, square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-92 | MEDIUM | square-drag-spring-tether | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-93 | MEDIUM | square-drag-spring-tether | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-94 | MEDIUM | square-drag-spring-tether | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-95 | MEDIUM | square-drag-spring-tether, playback-ribb | routed (§0cb consumer half) | KF.W13V `.u` |
| KFA-96 | MEDIUM | square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-97 | MEDIUM | square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-98 | MEDIUM | square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-99 | MEDIUM | easing-gallery-race | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-100 | MEDIUM | easing-gallery-race | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-101 | MEDIUM | easing-picker-curve | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-102 | MEDIUM | spring-live-solver, spring-derby-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-103 | MEDIUM | spring-live-solver | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-104 | MEDIUM | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-105 | MEDIUM | sequence-staggered-rows | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-106 | MEDIUM | sequence-power-on-cascade | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-107 | MEDIUM | sequence-reel-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-108 | MEDIUM | sequence-reel-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-109 | MEDIUM | chrome-dock-expand-collapse | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-110 | MEDIUM | chrome-dock-expand-collapse | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-111 | MEDIUM | chrome-dock-expand-collapse | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-112 | MEDIUM | chrome-dock-menus | honest-RED relay (§0cb reframed; KF.W13R .v re-read: still-live on kf 10.0.1) | glass BL |
| KFA-113 | MEDIUM | chrome-dock-menus | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-114 | MEDIUM | chrome-dock-menus | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-115 | MEDIUM | chrome-dock-menus | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-116 | MEDIUM | controls-pane-drawer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-117 | MEDIUM | controls-pane-drawer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-118 | MEDIUM | controls-pane-drawer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-119 | MEDIUM | controls-pane-drawer, timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-120 | MEDIUM | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-121 | MEDIUM | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-122 | MEDIUM | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-123 | MEDIUM | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-124 | MEDIUM | copy-button-feedback | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-125 | LOW | amiga-contact-shadow | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-126 | LOW | amiga-boing-composite | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-127 | LOW | amiga-boing-composite | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-128 | LOW | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-129 | LOW | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-130 | LOW | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-131 | LOW | home-landing-cube, cube-roll-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-132 | LOW | home-hero-aurora | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-133 | LOW | home-hero-aurora | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-134 | LOW | home-animated-text | routed (§0cb consumer half) | KF.W13V `.u` |
| KFA-135 | LOW | home-typing-dots | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-136 | LOW | scene-swap-transition | routed (§0cb consumer half) | KF.W13V `.u` |
| KFA-137 | LOW | scene-skeleton-shimmer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-138 | LOW | cube-group-spin-matrix-bob | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-139 | LOW | cube-group-spin-matrix-bob | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-140 | LOW | cube-roll-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-141 | LOW | cube-roll-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-142 | LOW | cube-roll-egg, cube-axis-lines | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-143 | LOW | cube-axis-lines | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-144 | LOW | cube-loader-spin | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-145 | LOW | square-tour | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-146 | LOW | square-tour | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-147 | LOW | square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-148 | LOW | square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-149 | LOW | easing-picker-curve | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-150 | LOW | easing-picker-curve | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-151 | LOW | spring-live-solver | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-152 | LOW | spring-live-solver | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-153 | LOW | spring-derby-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-154 | LOW | spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-155 | LOW | spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-156 | LOW | spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-157 | LOW | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-158 | LOW | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-159 | LOW | sequence-staggered-rows | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-160 | LOW | sequence-staggered-rows | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-161 | LOW | sequence-power-on-cascade | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-162 | LOW | sequence-reel-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-163 | LOW | chrome-dock-menus | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-164 | LOW | chrome-dock-menus | honest-RED relay (§0cb reframed; KF.W13R .v re-read: still-live on kf 10.0.1) | glass BL |
| KFA-165 | LOW | transport-dock | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-166 | LOW | transport-dock | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-167 | LOW | transport-dock | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-168 | LOW | controls-pane-drawer | honest-RED relay-only (O-60, §0cb producer-live) | glass BL |
| KFA-169 | LOW | controls-pane-drawer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-170 | LOW | controls-pane-drawer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-171 | LOW | controls-pane-drawer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-172 | LOW | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-173 | LOW | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-174 | LOW | playback-ribbon-visualizer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-175 | LOW | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-176 | LOW | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-177 | LOW | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-178 | LOW | copy-button-feedback | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-179 | LOW | copy-button-feedback | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-180 | LOW | copy-button-feedback | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-181 | HIGH | amiga-boing-composite | CURED (this seat) | `5ae589ab`+`d4085ab4` · boing capture ×2 |
| KFA-182 | HIGH | cube-orbital-drag-inertia | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-183 | MEDIUM | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-184 | MEDIUM | scene-skeleton-shimmer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-185 | MEDIUM | cube-orbital-drag-inertia | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-186 | MEDIUM | square-drag-spring-tether | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-187 | MEDIUM | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-188 | MEDIUM | easing-picker-curve | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-189 | MEDIUM | transport-dock | honest-RED relay (§0cb reframed; KF.W13R .v re-read: still-live on kf 10.0.1) | glass BL |
| KFA-190 | MEDIUM | sequence-power-on-cascade | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-191 | MEDIUM | spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-192 | MEDIUM | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-193 | MEDIUM | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-194 | LOW | amiga-grid-room-backdrop | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-195 | LOW | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-196 | LOW | amiga-sphere-spin-gesture | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-197 | LOW | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-198 | LOW | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-199 | LOW | home-landing-cube | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-200 | LOW | home-typing-dots | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-201 | LOW | scene-swap-transition | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-202 | LOW | scene-skeleton-shimmer | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-203 | LOW | cube-group-spin-matrix-bob | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-204 | LOW | cube-loader-spin | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-205 | LOW | cube-loader-spin | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-206 | LOW | square-tour | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-207 | LOW | square-tumble-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-208 | LOW | easing-gallery-race | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-209 | LOW | easing-picker-curve | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-210 | LOW | spring-live-solver | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-211 | LOW | spring-live-solver | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-212 | LOW | spring-derby-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-213 | LOW | spring-derby-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-214 | LOW | spring-physics-facet | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-215 | LOW | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-216 | LOW | spring-starting-style-entry | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-217 | LOW | sequence-staggered-rows | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-218 | LOW | sequence-power-on-cascade | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-219 | LOW | sequence-reel-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-220 | LOW | sequence-reel-egg | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-221 | LOW | chrome-dock-menus | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-222 | LOW | transport-dock | honest-RED until the landing repin (§0cb R-5; cured at glass HEAD) | glass BL → landing-repin wave |
| KFA-223 | LOW | controls-pane-drawer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-224 | LOW | timeline-panel | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-225 | LOW | playback-ribbon-visualizer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-226 | LOW | playback-ribbon-visualizer | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-227 | LOW | keyframes-editor-cards | OPEN — honest-RED, not cured this seat | KF.W13V `.k` successor (consumer; cause in keyframes.js) |
| KFA-228 | LOW | square-tour, amiga-grid-room-backdrop, e | routed (§0cb consumer half) | KF.W13V `.u` |

#### Gate readings BEFORE → AFTER (×2)

| gate | BEFORE | AFTER (this seat) | reading |
|---|---|---|---|
| G-W13V-k1 every open KFA row cured or honest-RED by id with owner | 228 open (B-k1) | 11 CURED · 34 honest-RED/routed by id (glass 28 · KFA-14 · `.u` 5) · **183 OPEN** consumer, owner the `.k` successor | **RED** |
| G-W13V-k2 each cure re-captured with the audit's own script | — | 10 of 11 re-captured ×2 (KFA-1/2/29/33 writers · 3 staggered-rows · 12 probe-vt-binding · 17 dockprobe3/4 · 18/21 probe-easing · 181 boing capture); KFA-15 OWED (audit path retired by `.s`) | **RED (1 owed)** |
| G-W13V-k3 critic gaps captured + judged | 0 of 7 | 3 of 7 (transport matrix · dark legs · mobile Sheet); 4 uncaptured (`CRITIC-GAPS-UNCAPTURED`) | **RED** |
| G-W13V-k4 KFA-17 / C6-3 resolved at cause | open | sequence leg CURED at cause; `[real-cube]` 4/4 PASS, mechanism inferred not isolated (`REAL-CUBE-INTERMITTENT`) | **RED** |
| floor: vue-tsc | 0 | ⟨`npm run check`⟩ (vue-tsc app + test + proof:structure) → **EXIT 0 · EXIT 0** (a first read went EXIT 1 on R4 `animation.ts 502` — cured in `d4085ab4`, re-read) | GREEN |
| floor: demo vitest | 66/518 | ⟨`npx vitest run --project demo`⟩ → **68 files · 532/532 ×2** | GREEN |
| floor: library vitest | — | ⟨`npx vitest run --project library`⟩ → **114 passed · 5 skipped · 1262 passed · 2 expected fail · 14 skipped ×2** | GREEN |

**Residuals (honest-RED ids, owners)**: `RESET-READOUT-STALE` (all 6 scenes; cause `useAnimationSync` idle + markRaw reset with no signal) · easing Reverse keeps the sweep forward · `REAL-CUBE-INTERMITTENT` · `CRITIC-GAPS-UNCAPTURED` (matrix tweens, toasts, tooltips, tab-panel slide) · the KFA-15 served re-capture · the 183 OPEN consumer rows — all owner **the `.k` successor unit**; `VALUEJS-LEGACY-RGBA` (KFA-14) → value.js X-W11 publish then the kf bump; the 28 glass rows → BL via O-60/O-69; KFA-61/95/134/136/228 → `.u`. **Persisted-bucket note (R-k-1)**: a store bucket persisted by an earlier session for an animation-AUTHORED scene (the Amiga) is no longer imposed on the running animation at mount (the KFA-18 fix shape: "apply only on a user edit"); a stale persisted bucket therefore displays its old edit until expiry (`checkAndResetExpiredStore`) or an edit — recorded, not cured.

**Adjacent edits (§0bt)**: `keyframes.js/test/demo/instrument/KeyframesAddDialog.test.ts:253` (+ its `:33` docblock line) — the string the oracle asserts for the rest class this seat changed (KFA-15). **Escalations**: none (every cure landed inside the writable set; no package bump — value.js 4.1.0 is unpublished).

**Evidence** (value.js, scripts + JSON + text only; the frames — 3,263 jpg + 3,544 png, 1.3 GB — stay on disk uncommitted): `docs/tranches/X/keyframes/evidence/W13V/k/{kfa-1-2,kfa-3,kfa-12,kfa-15,kfa-17,kfa-17-cube,kfa-18,kfa-181,critic}/` + `split.mjs` + `split-table.md`.

## RESUME plan (2026-09-24, SEAT 0 re-dispatch, `claude-opus-5-5`, VERIFY-ONLY — 0 kf/glass/product bytes)

⟨`grep -n "KF.W13V" LEDGER.md`⟩ → row `:61` `OPEN 2026-09-17`; receipts present for `.s` (`6107889a`) · `.c` (`30e9c24c`) · `.y` (`c84a3a4c`) · `.p` (`ed91f62b`) · `.k` (`9618c461`, PARTIAL). ⟨`git -C keyframes.js log --oneline -3`⟩ → `ab94125c` KFA-136 · `047bedfe` KFA-134 · `e26cdddf` KFA-61 — all tagged `X.KF.W13V.u`, **no `.u` receipt, no `.u` LEDGER line** (the `.u` seat was killed after its third commit). ⟨`git status --porcelain -- …/evidence/W13V/u`⟩ → untracked `W13V/u/` (catch-all 27 · kfa-61 13 · kfa-134 10 · kfa-136 7 · kfa-228 9 · kfa-95 5 · `parse-register.mjs` · `rows.json` · `dockdump.mjs`) = the killed seat's partial evidence. kf tree: 0 modified paths.

- **alreadyDone** (commits exist, never re-dispatched): `.s` `.c` `.y` `.p` `.k` `.u`.
- **Owed**: one continuation seat **`KF.W13V.u2`** (Opus, effort high) on `.u`'s spec rows and writable set — inherits the 3 kf `.u` commits (verify, do not redo) and the untracked `W13V/u/` evidence (read, judge, finish); owes KFA-95 · KFA-228 (u4 remainder), u1..u3 (every UIA-KF row cured or routed to glass by id beside O-59; a frame before every cure; the catch-all route audited), the floor, and the `### KF.W13V.u` receipt + LEDGER event naming all `.u` shas. The `.k` successor rows (183 consumer OPEN) stay with the close/repair cycle, not this plan.

### KF.W13V.u2

SERVED MODEL: claude-opus-5-5 · continuation of the killed `.u` seat (and of a killed first `.u2` seat) · the `### KF.W13V.u` receipt the RESUME plan owes · appended under the RESUME plan (the `## Unit receipts` block precedes it; this is its `.u` entry).

**Status: PARTIAL.** u2 · u3 · u4 and the floor are GREEN; u1 is not total: 240 consumer UIA-KF rows are OPEN-CARRIED by id (BROKEN 24 · HIGH 41 · MEDIUM 96 · LOW 79), never silently dropped.

#### Acts, in order

1. **Crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → 0 modified paths (2 standing untracked inbound packets, not mine). ⟨`git -C keyframes.js log --oneline e26cdddf^..HEAD`⟩ at open → 7 `.u` commits, not the 3 the brief named: the killed `.u` seat's `e26cdddf` KFA-61 · `047bedfe` KFA-134 · `ab94125c` KFA-136, and a killed first `.u2` seat's `87bcc597` KFA-95 · `11704ae8` UIA-KF-227 · `56244f0d` UIA-KF-001/002 · `dd7eae52` UIA-KF-003. Each message carries its born-RED test and its served ×2 capture; the evidence dirs (`W13V/u/kfa-61`, `kfa-134`, `kfa-136`, `kfa-95`, `catch-all`, `uia-001`, `uia-003`) hold the named scripts and runs. Judged conforming and **kept, not redone**. ⟨`git diff --name-only e26cdddf^ HEAD | grep -v '^demo/\|^test/demo/\|^scripts/observe/demo/'`⟩ → **0 lines** (37 paths, all in bounds; the favicon move's old path `assets/icons/favicon.svg` is `11704ae8`'s §0bt adjacent edit, named in its message). value.js: untracked `W13V/u/` (the killed seats' evidence, incl. `DISPOSITION.md` + `disposition.mjs` + `rows.json`) and the untracked relay `X-KF-BK-UI-AUDIT-ADDENDUM-2026-09-24-KFW13VU.md` (O-70); its INBOX O-row was already committed (`86250c4b`, INBOX `:512`). Inherited paths judged, finished and committed at act 7.
2. **u4 remainder.** **KFA-95** — `87bcc597` (inherited): LANDED-BY the glass 10.0.1 repin `dca116e1` (the registry returns on a consumed event), locked by a 12-case contract test; GREEN-BEFORE-CURE recorded in its message; served ×2 dev + gh. **KFA-228** — reads cured at HEAD, landed by `cd2cd88f` (X.KF.W13U.e, the glass `SelectValue` slot; its witness case (6) in `channel-options-render-edge.test.ts` was born RED then). Served ⟨`node kfa-228/label.mjs <tag> <base>`⟩ → the trigger on amiga/square/cube reads `"linear"` / `"ease-in-out-cubic"` / `"ease-in-out"` + a curve glyph, no description run-on — `dev-u2-1`, `dev-u2-2`, `gh-u2-1`, `gh-u2-2` identical (and `run1` of the killed seat). No new byte is owed: no re-cure of a cured row.
3. **u1 · u2 — the UIA-KF walk.** The register is 322 rows (⟨`node parse-register.mjs`⟩ → `rows.json`); the ledger is generated, not hand-written: ⟨`node W13V/u/disposition.mjs`⟩ → `DISPOSITION.md`, double-run, identical tally. Each cure below framed on the served page BEFORE the edit, then a born-RED test, then the cure, then the same script AFTER ×2 dev + ×2 gh-pages (a build of the working tree served at `127.0.0.1:4190`):
   - **UIA-KF-011** (BROKEN) → kf **`0d2c06af`**. Frame ⟨`node uia-011/roundtrip.mjs before-dev-1`⟩ → `{"before":{"duration":"5s"},"after":{"duration":"5ms"}}` — reproduced. Cause: value.js `collectAnimationOptions` reports seconds; `parseAnimationCSS` passed them to the engine (ms) unscaled. Cure at the one boundary (×1000 for duration and delay, the type names the unit). Test `parse-animation-units.test.ts` born-RED 3/4 → GREEN 4/4. AFTER → `"5s"` → `"5s"` at `after-dev-1`, `after-dev-2`, `after-gh-1`, `after-gh-2`.
   - **UIA-KF-004** (BROKEN) → kf **`1a397a4e`**. Frame ⟨`node uia-004/pick.mjs before-dev-1`⟩ → options `[Rotations, Matrix, Hover]`, picked `Matrix`, lands `#/cube` naming `"Rotations"` — reproduced. Cause: home's pick lands in HOME's control bucket; cube selects from its own. Cure in the home→cube intercept (`useSceneMachineShellBinding.ts`): carry the pick into cube's bucket and consume it. Test `home-pick-carry.test.ts` born-RED 1/2 → GREEN 2/2. AFTER → `"Matrix"` ×2 dev + ×2 gh.
   - **UIA-KF-012** (BROKEN) → kf **`15edd312`**, **consumer half**. Frame ⟨`node uia-012/hardfail.mjs before-dev-1`⟩ → `"}}} @@ nope {"` toasts `"Keyframes parsed 🎉"` — reproduced. Cause: the projection refused `PARSE_ERROR` only, so an `EMPTY_PARSE` buffer (0 `@keyframes` rules) was adopted. Cure: `EMPTY_PARSE` also refuses adoption. Test `parse-animation-reject.test.ts` born-RED 2/3 at the HEAD bytes (swapped in and out) → GREEN 3/3. AFTER → `"Failed to parse keyframes … zero @keyframes rules"` ×2 dev + ×2 gh. **Carried**: the Monaco marker and the shake (`markers: 0` in every run) and the engine's dropped-declaration diagnostic (kf `src/`, outside `.u`'s bounds).
   - **UIA-KF-013** (BROKEN) → **NOT-REPRODUCED at HEAD**. Frame ⟨`node uia-013/sticky.mjs before-dev-1`⟩ and `gh-1` → duration/delay/iterations: `abc`+Enter → `aria-invalid="true"` with the engine message; the persisted value +Enter → cleared. No byte.
   - **UIA-KF-017** → PARTIAL-by-others: Share half LANDED-BY `9aa93cae` (X.KF.W13U.d4); Dark mode half = honest-RED `DARK-MENU-ITEM` (O-61 R-3), carried, not cured locally.
   - Inherited cures kept: UIA-KF-001/002 `56244f0d`, 003 `dd7eae52`, 227 `11704ae8`; UIA-KF-009/010 LANDED-BY `b84fa236` (`.k`); 041 SURFACE-RETIRED `e69f7731` (`.s`); 025 honest-RED `QUIET-FOCUS-RING`.
   - **u2**: the 16 rows with no audit frame (123 128 129 162 177 232 234 240 241 249 254 255 276 277 289 322) — **none was cured**, so no cure landed without a frame. Every cure at this sitting has a BEFORE frame on the served page (above).
4. **Glass rows (u1, routed by id).** 36 GLASS rows + 17 split glass halves stay under **O-59**, and UIA-KF-078 goes to **O-70**, the addendum beside O-59 (`relay/X-KF-BK-UI-AUDIT-ADDENDUM-2026-09-24-KFW13VU.md`). At installed 10.0.1, 078 reads cured: ⟨`node uia-078/mark.mjs`⟩ → 8×8 `rgb(28, 25, 23)` at dev-1, dev-2, gh-1 and gh-2. It also carries the UIA-F-51 Toaster witness and the landed registry `defaultPrevented` half. INBOX O-70 is at `:512` (committed at `86250c4b`). There is 1 ROUTED-VALUE.JS row and 14 PIN-CARRIED rows (§0cb R-5). No glass selector, token or primitive was copied.
5. **u3: the catch-all route.** `catch-all/AUDIT.md` covers `router.ts:31` `/:pathMatch(.*)*` → `/`. ⟨`node catch-all/visit.mjs`⟩ ran 8 links × {1440 light, 1440 dark, 390 light}: `run1` on dev by the killed seat, `run2-dev`, `run3-gh`. CA-1..CA-7 are dispositioned. The only defect was the dev favicon 404, cured as UIA-KF-227 (`11704ae8`). ⟨`node catch-all/r404.mjs`⟩ → icon 200, 0 responses ≥ 400, dev ×2 + gh ×2. No "not found" notice was invented, because the router states that silent-home is its design.
6. **Floor ×2** at kf `15edd312`. The load was 21.23 before run 1 and 21.84 before run 2.

#### Gates: BEFORE → AFTER

| gate | BEFORE | AFTER (×2) | reading |
|---|---|---|---|
| G-W13V-u1 (every UIA-KF row cured or routed to glass by id) | 0 of 322 dispositioned at the RESUME open | the ledger covers all 322 rows: CURED-u 6 · PARTIAL-u 2 · NOT-REPRODUCED 1 · LANDED-BY 2 · SURFACE-RETIRED 1 · HONEST-RED 1 · PIN-CARRIED 14 · ROUTED-GLASS 37 · ROUTED-VALUE.JS 1 · SPLIT 17 · **OPEN-CARRIED 240** | **RED** (not total: 240 consumer rows are carried by id) |
| G-W13V-u2 (a frame before every cure) | — | every cure at this sitting (011 · 004 · 012) and every inherited one has a served BEFORE frame; none of the 16 frameless rows was cured | GREEN |
| G-W13V-u3 (the catch-all route) | never visited | `catch-all/AUDIT.md`: 8 links × 3 legs, dev + gh; the favicon 404 is cured | GREEN |
| G-W13V-u4 (KFA-61 · 95 · 134 · 136 · 228) | 3 of 5 committed | 61 `e26cdddf` · 134 `047bedfe` · 136 `ab94125c` · 95 `87bcc597` (landed at 10.0.1, locked by a test) · 228 landed at `cd2cd88f`, served ×2 dev + ×2 gh | GREEN |
| vue-tsc | 0 | 0 · 0 | GREEN |
| `npm run check` | EXIT 0 | EXIT 0 · EXIT 0 | GREEN |
| demo vitest | 66/518 (open) | **75/75 · 558/558** · 75/75 · 558/558 | GREEN |
| kf e2e `demo:correctness --workers=1` (`KF_PLAYWRIGHT_DIR=value.js`, dist rebuilt at `15edd312`) | 3/6 (KF.W13R close) | run 1 (load 22.16) **3/6**: ✗ subject-animates `[real-cube]` (the KFA-17 / C6-3 intermittent, `.k`'s k4) · ✗ live-session B7 (`maxRest 0.16`, honest-RED `B7 SPECULAR-REST`) · ✗ live-session-mobile M1 OPEN/SCROLL/RE-OPEN (`SHEET-POSITION` / drawer detent). Run 2 (load 18.60) **4/6**: the same reds without `[real-cube]`. occlusion ✓ in both runs (C1-1 stays cured) | recorded; no new red |

#### Commits

- keyframes.js (pathspec each, not pushed): inherited `e26cdddf` · `047bedfe` · `ab94125c` (killed `.u`) · `87bcc597` · `11704ae8` · `56244f0d` · `dd7eae52` (killed first `.u2`); this seat `0d2c06af` UIA-KF-011 · `1a397a4e` UIA-KF-004 · `15edd312` UIA-KF-012 (consumer half).
- value.js: `363e8835` (the evidence `W13V/u/**`, the disposition ledger and the O-70 relay addendum) and this record.

#### Residuals (carried by id)

- **240 OPEN-CARRIED consumer UIA-KF rows**, each named in `W13V/u/DISPOSITION.md` (BROKEN 24 · HIGH 41 · MEDIUM 96 · LOW 79). They go to a successor `.u` seat or the repair cycle, the same way `.k`'s 183 went.
- The 17 SPLIT rows' consumer halves are still owed. Their glass halves are routed under O-59.
- The rest of UIA-KF-012 is still owed: the Monaco marker, the shake, and the engine's dropped-declaration diagnostic in kf `src/`.
- Honest-RED ids are carried and were not cured locally: `DARK-MENU-ITEM` (017's Dark half) · `QUIET-FOCUS-RING` (025) · `B7 SPECULAR-REST` · `SHEET-POSITION` · `DOCK-MORPH-ROOT` · `GLASS-VEIL-GREY` · `KF-TIMELINE-FILL` · `GLASS-SURFACE-PAINT-CONTAIN` · `DOCK-SCROLL-MORPH`.
- The `vue-sonner` dependency is now unread after `56244f0d`. Removing it is a `package.json` pin, which is outside `.u`'s bounds (§0bt).
- The `[real-cube]` intermittent (KFA-17 / C6-3) read ✗ once in 2 e2e runs. It belongs to `.k` (k4).

#### Escalation

None. No write went outside the writable set, and no specified cure was impossible at the bytes.

## Close

**Seat**: `claude-opus-5-5`, VERIFY-ONLY (0 kf / glass / product bytes). **Date**: 2026-09-24 (sitting of record 2026-09-17, COHESION §0j). **kf HEAD**: `15edd312`; kf `origin/master` at open `d94017ff` (29 W13V shas unpushed — pushed at this close, below). **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → 2 standing untracked inbound letters, 0 modified; ⟨`git -C value.js status --porcelain`⟩ → `M` CARRY-LEDGER · X-W12.md · F-W14.md · X-P-W7.md · `scripts/dev/dev.sh` (siblings' / unowned) — none in this seat's writable set (this record, LEDGER); nothing inherited.

### Commit roster (act 1) — every sha exists, every path in its unit's writable set

⟨`git -C keyframes.js log --oneline d94017ff..HEAD | wc -l`⟩ → **29**; ⟨`… --invert-grep --grep=W13V | wc -l`⟩ → **0** (every sha tagged by its unit). Per-unit ⟨`git show --name-only`⟩ union filtered against the unit's writable set (record `## Unit plan`):

| unit | kf shas | paths | outside the set | disposition |
|---|---|---|---|---|
| `.s` | `e69f7731` · `e11db5a1` · `07fd5b7a` · `317fae99` | 20 | 1: `scripts/lib/demo-driver.mjs` | §0bt adjacent, declared in `.s`'s receipt (`:919-922`, oracle re-seat on moved DOM) — lawful |
| `.c` | `c1f3f39d` · `3b5f483d` | 5 | 0 | — |
| `.y` | `9262899b` · `0c8c690d` · `06b4d103` · `4fafc186` | 14 | 0 | — |
| `.p` | — (0 kf bytes; value.js `bda1d75d` · `e3a7ece5`) | 0 | 0 | — |
| `.k` | `027b6f99` · `505f6a0c` · `28e97ec3` · `cb9e1aa5` · `47f2627e` · `b84fa236` · `5ae589ab` · `431e5bcc` · `d4085ab4` | 32 | 0 | adjacent `KeyframesAddDialog.test.ts:253` declared |
| `.u`/`.u2` | `e26cdddf` · `047bedfe` · `ab94125c` · `87bcc597` · `11704ae8` · `56244f0d` · `dd7eae52` · `0d2c06af` · `1a397a4e` · `15edd312` | 37 | 0 (rename-detected; the old `assets/icons/favicon.svg` is the §0bt adjacent named in `11704ae8`) | — |

value.js receipts/evidence: `6107889a` (.s) · `30e9c24c` (.c) · `c84a3a4c` (.y) · `bda1d75d` `e3a7ece5` `ed91f62b` (.p) · `9618c461` (.k) · `363e8835` `74c9d668` `df7687de` (.u2) — each ⟨`git show --name-only`⟩ inside `execution/B/KF-W13V.md` · `keyframes/evidence/W13V/**` · `relay/` · INBOX · LEDGER. **Landed-wrong: 0.**

### Gate table (act 2) — BEFORE (Baseline, kf `d94017ff`) → AFTER (this close, kf `15edd312`, ×2)

The served-page gates were read headed ×2 on dev + ×2 on gh-pages by each owning unit (receipts above); the addenda assign their re-read to the check seat. This close re-runs every byte-readable proxy, the unit ledgers' tallies, and the whole floor, double-run; the served readings are cited from the unit receipts, not re-claimed.

| gate | BEFORE | AFTER (this close, ×2 unless noted) | verdict |
|---|---|---|---|
| G-W13V-s1 grep ⟨`grep -rln "KeyframesEditor\|CSSCodeEditor\|useSpringKeyframesEditor\|keyframes (editable)" demo/scenes \| wc -l`⟩ | 4 · 4 | **0 · 0** | GREEN (grep) |
| G-W13V-s1 DOM (served, `.s` ×4, `.y` y4 ×4 identical) | Sequence 6 inline | Sequence **6** (5 re-time handles + master scrub) | **RED at Sequence — ESC-s-1, unruled** |
| G-W13V-s2 · s3 · s4 (served, `.s` ×4) | — | GREEN (s4's live sheet placement = `SHEET-POSITION`, producer) | GREEN |
| G-W13V-c1..c5 (served, `.c` ×4) · c2 at the true file ⟨`grep -c '<Separator' …/channel-controls/ChannelOptions.vue`⟩ | 1 | **2 · 2** | GREEN |
| G-W13V-y1..y5 (served, `.y` ×4) | — | GREEN (y5's thumb clause = `SLIDER-THUMB`, producer) | GREEN |
| G-W13V-p1 · p2 (served, `.p` ×4) · ⟨`grep -rn radius-field demo --include=*.vue --include=*.css \| wc -l`⟩ | 0 | **3 · 3** | GREEN |
| G-W13V-p3 | — | `TILE-PRIMITIVE` honest-RED (O-58 / O-67) | honest-RED |
| G-W13V-k1 (`.k` split) | 228 open | 11 CURED · 34 routed/honest-RED by id · **183 OPEN** consumer | **RED** |
| G-W13V-k2 | — | 10 of 11 re-captured; KFA-15 owed | **RED** |
| G-W13V-k3 | 0 of 7 | 3 of 7 (`CRITIC-GAPS-UNCAPTURED`) | **RED** |
| G-W13V-k4 | open | sequence leg cured; `[real-cube]` mechanism inferred, not isolated (`REAL-CUBE-INTERMITTENT`) | **RED** |
| G-W13V-u1 — ⟨awk tally of `W13V/u/DISPOSITION.md` rows⟩ | 0 of 322 | 322 rows: CURED-u 6 · PARTIAL-u 2 · NOT-REPRODUCED 1 · LANDED-BY 2 · SURFACE-RETIRED 1 · HONEST-RED 1 · PIN-CARRIED 14 · ROUTED-GLASS 37 · ROUTED-VALUE.JS 1 · SPLIT 17 · **OPEN-CARRIED 240** (identical ×2; = the ledger's own tally line) | **RED** |
| G-W13V-u2 · u3 · u4 (served, `.u2` ×4) | — | GREEN | GREEN |
| floor — `npm run check` (vue-tsc app + test + proof:structure) | EXIT 0 | **EXIT 0 · EXIT 0** (load 22.72 · 21.38) | GREEN |
| floor — demo vitest ⟨`npx vitest run --project demo`⟩ | 66/66 · 518/518 | **75/75 · 558/558 · 75/75 · 558/558** (load 19.61 · 27.55) | GREEN |
| §Verification — ⟨`npx eslint demo/app demo/components/instrument/transport demo/components/playback demo/scenes`⟩ | — | **EXIT 0 · EXIT 0** (`demo/styles` is wholly ignored by `eslint.config.js` — passing it exits 2 "all files ignored"; CSS is not an eslint surface) | GREEN |
| §Verification — ⟨`git diff --check d94017ff..HEAD \| wc -l`⟩ | — | **0** | GREEN |
| kf e2e ⟨`KF_PLAYWRIGHT_DIR=value.js node scripts/run-demo-roster.mjs --workers=1`⟩ on a fresh ⟨`npm run gh-pages`⟩ of `15edd312` | 3/6 (KF.W13R close) | run 1 (load 30.37) **4/6**: ✗ live-session B7 (`maxRest 0.16`, `B7 SPECULAR-REST`) · ✗ live-session-mobile M1 OPEN/SCROLL/RE-OPEN (`SHEET-POSITION`). Run 2 (load 19.61) **3/6**: the same two + ✗ subject-animates `[real-cube]` (`rest=false`, autoplay true — `REAL-CUBE-INTERMITTENT`, KFA-17 / C6-3). occlusion ✓ ×2, usability ✓ ×2, demo-smoke ✓ ×2 | GREEN-WITH-HONEST-RED for B7 + M1 (§0cd relief classes); `[real-cube]` **RED** (1 of 2, as `.u2` measured) |

### E13 (act 4)

⟨`find value.js/docs/tranches/V value.js/docs/tranches/V/coordination glass-ui/docs/tranches/BK/coordination glass-ui/docs/tranches/BL keyframes.js/docs/tranches/V/coordination sci-report/atlas/docs/tranches/P/coordination -maxdepth 1 -type f -newer INBOX.md`⟩ (INBOX mtime 2026-09-24 10:28) → 1: `glass-ui/docs/tranches/BL/FORMATION-PROGRESS.md` (glass's internal cursor, not addressed to value.js → no row, as every 09-24 sweep read it). INBOX tail: O-70 SENT (this wave's), I-49..I-51 answered/registered. ⟨`grep -c '| UNREAD'`⟩ on rows → 0 (the one textual hit `:406` is a sweep line). **0 unrowed · 0 UNREAD in scope.**

### Residuals (named owners)

- **ESC-s-1** (G-W13V-s1 at Sequence: the inline re-time handles + master scrub have no shared-pane seat) — unruled; owner: the orchestrator/COHESION (a Timeline-pane seat for Sequence), then a `.s` successor. Not relieved by any §0 ruling (⟨`grep -n ESC-s-1 COHESION.md`⟩ → 0).
- **183 OPEN consumer KFA rows** + `RESET-READOUT-STALE` · easing Reverse sweep · `CRITIC-GAPS-UNCAPTURED` · the KFA-15 served re-capture · `REAL-CUBE-INTERMITTENT` (✗ in run 2 here) — owner: the `.k` successor unit.
- **240 OPEN-CARRIED consumer UIA-KF rows** (BROKEN 24 · HIGH 41 · MEDIUM 96 · LOW 79, named in `W13V/u/DISPOSITION.md`) + the 17 SPLIT consumer halves + UIA-KF-012's remainder (Monaco marker/shake; the engine's dropped-declaration diagnostic in kf `src/`) — owner: a `.u` successor unit.
- **`vue-sonner`** unread after `56244f0d` — a `package.json` removal; owner: a seat granted the kf pin (§0bt excludes pins).
- **`VALUEJS-LEGACY-RGBA`** (KFA-14) — owner: value.js X-W11 publish → kf bump.
- **R-s-1** (expanded-detent floor prose) → `.c`'s successor; **R-y-1 · R-y-2** as in `.y`'s receipt.
- Honest-RED producer ids, carried, never cured locally: `TILE-PRIMITIVE` (O-58/O-67) · `SLIDER-THUMB` · `SHEET-POSITION` · `B7 SPECULAR-REST` · `DARK-MENU-ITEM` · `QUIET-FOCUS-RING` (UIA-KF-025) · `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`; 28 KFA glass rows via O-60/O-69; 53 UIA glass rows via O-59 + UIA-KF-078 via O-70 — owner glass BL.

### Escalations

- **ESC-s-1** (above) — the only unit escalation standing; carried by `.c`, `.y` receipts unchanged.
- None from this seat: 0 writes outside the writable set.

### Four-verb line (the addenda's §State: this wave moves IMPLEMENTED; no clause designates this seat to stamp VERIFIED)

| verb | state |
|---|---|
| AUDITED | YES (the KFA 228 + UIA-KF 322 registers) |
| SPECIFIED | YES (KF-W13.md, the KF.W13V addenda) |
| IMPLEMENTED | **NO — PARTIAL**: `.c` `.y` `.p` DONE; `.s` PARTIAL (ESC-s-1); `.k` PARTIAL (k1..k4 RED); `.u` PARTIAL (u1 RED) |
| VERIFIED | NO (the check seat's) |

**Status: PARTIAL** — s2..s4 · c1..c5 · y1..y5 · p1..p2 · u2..u4 and the floor GREEN; s1 (Sequence) · k1..k4 · u1 RED; kf e2e 4/6 · 3/6 with B7 + M1 honest-RED and `[real-cube]` intermittent RED.

**SELF-COUNT**: gate rows in the table above 18 (⟨`sed -n` the section `| grep -c`⟩ → 18 · 18) → GREEN 11 · honest-RED 1 (p3) · RED 6 (s1-DOM · k1 · k2 · k3 · k4 · u1) · mixed 1 (kf e2e: GREEN-WITH-HONEST-RED for B7/M1, RED for `[real-cube]` — the same defect as k4). kf shas audited 29 (s 4 · c 2 · y 4 · k 9 · u 10), landed-wrong 0; value.js unit shas 10.

**Push (act 7)**: ⟨`git -C keyframes.js push origin HEAD`⟩ → `d94017ff..15edd312  HEAD -> master`; ⟨`rev-parse --short origin/master`⟩ → `15edd312`. value.js pushed after this record and the LEDGER commit.

## Check 1 (L-20 pass 1 on the Close)

**Seat**: `claude-opus-5-5`, VERIFY-ONLY (0 kf / glass / product bytes). **Date**: 2026-09-24 (sitting of record 2026-09-17). **kf HEAD** `15edd312` = `origin/master`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → 2 standing untracked inbound letters, 0 modified; value.js dirty paths (CARRY-LEDGER · X-W12.md · `scripts/dev/dev.sh`) are outside this seat's set (this record, LEDGER) and untouched.

**Verdict: NOT-CONFORMANT.** Every GREEN the close claims reproduces, and bounds, masking, families, E-3 and mail are clean. But six gates stay RED with no relief in the spec. The spec's `.k` relief covers glass rows only ("glass rows → the batched glass letter"). `.u`'s relief is "routed to glass by id". No COHESION section after §0ce grants or relieves ESC-s-1 or the carried consumer rows: ⟨`grep -n 'ESC-s-1\|OPEN-CARRIED\|REAL-CUBE\|CRITIC-GAPS' COHESION.md KF-W13.md`⟩ → 0. A "successor unit of this wave" is not an owner the spec names.

### Reproduced (×2 unless noted; load 20.17 at open)

| axis / gate | command | result | reads as claimed |
|---|---|---|---|
| s1 grep | ⟨`grep -rln "KeyframesEditor\|CSSCodeEditor\|useSpringKeyframesEditor\|keyframes (editable)" demo/scenes \| wc -l`⟩ | 0 · 0 | yes |
| s1 DOM (served, dev) | ⟨`node W13V/s/census.mjs http://localhost:5173/ 1 …`⟩ | sequence `stageEditors=6` (5 re-time sliders + master scrub) at 1440/390/360, dock `Controls(off) · Keyframes(off) · Timeline(off) · Scene facet(off)` · others 0 inline kf blocks | RED as the close says |
| s2 (served, dev, 1440) | ⟨`node W13V/s/items.mjs http://localhost:5173/ 1440x900`⟩ | `fails=0` · `fails=0` | yes (script-GREEN; see C1-1: Sequence has all four items off) |
| p1 proxy | ⟨`grep -rn radius-field demo --include='*.vue' --include='*.css' \| wc -l`⟩ | 3 · 3 | yes |
| c2 | ⟨`grep -c '<Separator' demo/components/instrument/transport/channel-controls/ChannelOptions.vue`⟩ | 2 · 2 | yes |
| floor check | ⟨`npm run check; echo $?`⟩ | EXIT 0 · EXIT 0 | yes |
| floor vitest | ⟨`npx vitest run --project demo`⟩ | 75/75 · 558/558 · 75/75 · 558/558 | yes |
| eslint | ⟨`npx eslint demo/app demo/components/instrument/transport demo/components/playback demo/scenes`⟩ | EXIT 0 | yes |
| diff --check | ⟨`git diff --check d94017ff..15edd312 \| wc -l`⟩ | 0 · 0 | yes |
| u1 tally | ⟨awk col 4 of `W13V/u/DISPOSITION.md` \| uniq -c⟩ | CURED-u 6 · HONEST-RED 1 · LANDED-BY 2 · NOT-REPRODUCED 1 · OPEN-CARRIED 240 · PARTIAL-u 2 · PIN-CARRIED 14 · ROUTED-GLASS 37 · ROUTED-VALUE.JS 1 · SPLIT 17 · SURFACE-RETIRED 1 (=322); OPEN by severity BROKEN 24 · HIGH 41 · MEDIUM 96 · LOW 79 | yes (figures) |
| k1 tally | ⟨`grep -c '^\| KFA-.*\| OPEN — honest-RED, not cured this seat' W13V/k/split-table.md`⟩ | 183 · 183 of 228 | yes (figures) |

Served readings not re-run here (c1/c3–c5, y1–y5, p2, s3/s4, u2–u4): I cite them from the unit receipts. Because the verdict is already NOT-CONFORMANT on the unrelieved REDs, re-running them would not change it (probe parsimony, §5.2). kf e2e was not re-run. The close's 4/6 · 3/6 is taken as the record's figure.

### Axes

- **(2) bounds**: 29 kf shas `d94017ff..15edd312`, and ⟨`--invert-grep --grep=W13V \| wc -l`⟩ → 0. Paths outside `demo/ test/ scripts/observe/ src/` → 1: `scripts/lib/demo-driver.mjs`, a §0bt adjacent declared by `.s`. `src/` (7 files, +53/−11) is inside `.k`'s set. package.json, the lock and node_modules have 0 lines of diff. value.js unit commits touch only the record, `evidence/W13V/**`, `relay/`, INBOX and LEDGER. ⟨`git log $B^..HEAD -- scripts/dev/dev.sh`⟩ → 0. Clean.
- **(3) masking**: I grepped the added lines for `.skip` / `.only` / `@ts-expect-error` / `@ts-ignore` / catch / allowlist. The only hit is a white-box `seq as any` in the new KFA-17 test (`test/orchestration/sequence-transport.test.ts`), which follows the file's existing `s._time` idiom. Assertion removals (`spring-heatmap-reversibility` −18/+9, `scene-entries` −2/+1, …) follow deleted or redesigned subjects: `sceneIndex` deleted by `ab94125c`, and the inner preset slider retired by `9262899b`. None is a narrowed oracle. Clean.
- **(4) families**: the Spring inline-editor retirement is ONE sha (`e69f7731`), and so is the one dock descriptor (`e11db5a1`). One meaning per sha. Clean.
- **(5) E-3**: ⟨`git diff --stat ad69b2a9^..HEAD -- KF-W13.md registry/adjudicated/ keyframes/audit/ audit/UI-AUDIT-keyframes.md`⟩ → KF-W13.md +62/−0 only. Those lines are the orchestrator's dated addenda (§0co/§0cq/§0cs/§0ct), not this wave's commits. The registry and both registers are untouched. Clean.
- **(6) mail**: ⟨`grep -c '| UNREAD' INBOX.md`⟩ → 1, and that hit is the `:406` sweep line, not a row. ⟨find -newer INBOX⟩ → `glass-ui/…/BL/FORMATION-PROGRESS.md` only, which is glass-internal. 0 UNREAD in scope.
- **(7) four-verb**: IMPLEMENTED = NO — PARTIAL, and VERIFIED = NO. That is lawful and honest.
- **(8) goal at the bytes**: NOT MET. The owner's OA-46 words name "the sequcne … NOT inline". The Sequence scene still renders six inline editors, and all four of its dock items are disabled.
- **(9) figures**: the u1 and k1 tallies reproduce exactly. So do check, vitest and the grep proxies.

### Register (severity · claim · receipt · cure)

- **C1-1 HIGH**: G-W13V-s1 is RED at Sequence, and ESC-s-1 is unruled. The receipt is census ×2 above: `stageEditors=6`, and Controls, Keyframes, Timeline and the facet are all `(off)`. OA-46 says "a scene may disable an item it has no data for". Sequence has keyframes and timing data, but it disables every item and keeps its editors inline. The same defect makes s2 read GREEN only in form. **Cure**: an orchestrator grant (a Timeline/Keyframes shared-pane seat for Sequence's re-time rows and master scrub), then a `.s` successor that moves them and enables the items.
- **C1-2 HIGH**: G-W13V-k1 is RED. 183 of 228 KFA rows are consumer-caused and stay OPEN. The split table labels them "honest-RED" with owner "KF.W13V `.k` successor". The spec's honest-RED relief is for glass rows (§0bl `.k`; §0bn "glass rows (O-60) … else honest-RED by id"), and consumer rows are "cured at cause". **Cure**: a `.k` successor seat (or an owner/COHESION ruling that re-homes the rows to a named later wave) cures them at their cause.
- **C1-3 HIGH**: G-W13V-u1 is RED. 240 consumer UIA-KF rows are OPEN-CARRIED, as are the 17 SPLIT consumer halves. The spec (§0bl `.u`) says "Every UIA-KF-n row: cured … or routed to glass by id", and no relief covers consumer rows. **Cure**: a `.u` successor seat, or a dated ruling that re-homes the rows by id.
- **C1-4 HIGH**: G-W13V-k3 is RED. Only 3 of the 7 critic gaps are captured (`CRITIC-GAPS-UNCAPTURED`), and §0bn makes each capture a `.k` obligation. **Cure**: the `.k` successor captures and judges the other four: the 6-scene × verb matrix, dark legs, the mobile Sheet, and tooltips/toasts as listed.
- **C1-5 HIGH**: G-W13V-k4 and the kf e2e close clause are RED. `[real-cube]` failed in 1 of 2 runs at the close. §0cd assigns C6-3 (KFA-17) to KF.W13V `.k`, so no other owner holds it. The mechanism is inferred, not isolated. **Cure**: isolate the cause of `rest=false` under autoplay and cure it, then run e2e `--workers=1` ×2 with the load recorded.
- **C1-6 MEDIUM**: G-W13V-k2 is RED. KFA-15's served re-capture is owed (10 of 11). **Cure**: the `.k` successor re-captures it with the audit's script.
- **C1-7 INFO**: `vue-sonner` is unread after `56244f0d`. Removing it is a pin edit, owned by a seat granted `package.json` (§0bt excludes pins).
- **C1-8 INFO**: the white-box `as any` in the KFA-17 test follows the file's idiom. It is not a mask.

### Honest-RED set (relieved, owner-named)

- `TILE-PRIMITIVE` (p3): named by id in the spec's second addendum (§0bl), with O-58/O-67. Owner: glass BL.
- `SHEET-POSITION` (e2e M1): relieved at KF.W13R Check 1 by id. Owner: glass BL F-21.
- `B7 SPECULAR-REST` (e2e B7): relieved at KF.W13R Check 1 by id. Owner: glass.
- `SLIDER-THUMB` (y5's thumb clause): producer-owned. Green only upstream.
- `DARK-MENU-ITEM` (UIA-KF-017 dark half, O-61 R-3) and `QUIET-FOCUS-RING` (UIA-KF-025): named by id in §0br/§0cd.
- Carried producer ids `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`: named in §0br/§0cf/§0cj. The glass KFA rows go via O-60/O-69, and the glass UIA rows via O-59/O-70.

**Unrelieved**: s1-DOM (Sequence) · k1 · k2 · k3 · k4 / e2e `[real-cube]` · u1.

### Successors

KF.W13W opens after "KF.W13V" (spec `:447`). That conjunct is **RED**: this row is not CLOSED. KF.W13W is lawfully **BLOCKED** until a repair closes C1-1..C1-6 or a dated ruling relieves them.

**SELF-COUNT**: gates reproduced 10 (s1-grep · s2 · p1 · c2 · check · vitest · eslint · diff-check · u1-tally · k1-tally). Gates failed 6 (s1-DOM · k1 · k2 · k3 · k4/e2e · u1). Register 8 rows: HIGH 5 · MEDIUM 1 · INFO 2 (⟨`grep -c '^- \*\*C1-'`⟩ on this section → 8).

## Repair 1 (on Check 1's register)

**Seat**: `claude-opus-5-5`, REPAIR round 1. **Date**: 2026-09-24 (sitting of record 2026-09-17, COHESION §0j). **kf HEAD at open**: `15edd312` = `origin/master`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → 2 standing untracked inbound letters, 0 modified; value.js dirty paths (`demo/workbenches/mix/MixSourceSelector.vue` · CARRY-LEDGER · `src/css/bbnf/generated/*` · `scripts/dev/dev.sh`) all outside this seat's set and untouched. Nothing inherited.

**Writable set used**: `.k`'s (kf `demo/**` · `test/**`; value.js `evidence/W13V/**` · `relay/` · INBOX) and this record.

### C1-5 (HIGH): the `[real-cube]` rest=false, isolated and cured at cause (G-W13V-k4 · the kf e2e close clause)

- **Reproduced first.** ⟨`node scripts/run-demo-roster.mjs --only=subject-animates`⟩ ×6 on the gh-pages build of `15edd312` gave **2 FAIL of 6**, with loads 13.7–15.0. Run 2 read `rest=false (autoplay true; playhead 451 → 458.9; nodes {1,1,1})` and the other failing run read `141.7 → 150`. In both, the playhead moved about 8 ms, one frame, **while the transport read "Play"**, and the nodes held still. The earlier "negative playhead" signature (KF.W13U R-close-2) did not appear in 6 runs.
- **Isolated.** ⟨`node evidence/W13V/k/repair1-real-cube/oracletrace.mjs`⟩ follows the oracle's own path: gh-pages dist, localStorage cleared, `navToScene(cube, Controls)`, then the driver's synthetic down+up on Pause. A MutationObserver records the readout at the DOM mutation that flips the face to "Play". **6 of 6 were stale at the flip.** The face flips about 2.4 ms after the press, while the readout is still one frame behind (for example `2041.7`); the next frame settles it (`2050`). A trace that samples only per rAF (`pausetrace.mjs`, real mouse) never sees the window: 0 of 5.
- **Cause, at the bytes.** `useAnimationSync.ts` samples `effectiveT` once per demo-ticker frame, so while playing the readout trails the engine by up to a frame. The transport face flips on the play-state change. The engine's paused `t` is final at `group.pause()`, because `lifecycle.ts` records `lastTickTime`. So for one frame after Pause, the face read "paused" and the ribbon showed the previous frame's time. The oracle's rest read (`readSlider` right after `waitForFunction(Play face)`) sometimes landed inside that frame. The subject was never at fault: `rest=false` came from the readout clause alone.
- **Cure.** kf **`5cf0f58a`**: the play-state watcher now calls `read()` (the ticker's body, extracted) before `wake()`. It runs in the pre-render flush, so the face and the readout land in the same render. This is not a mask. The oracle is unchanged and the ticker is unchanged, and the readout now states the engine's time at the moment the face does.
- **Test.** `test/demo/instrument/animation-sync-pause-edge.test.ts` has 2 cases (pause edge; resume/reverse/started edge), with no rAF, only `nextTick()`. Born-RED 2/2 at `15edd312` (`expected 100 to be 108.3`); GREEN 2/2.
- **Served, AFTER.** `oracletrace.mjs` gives stale-at-flip **0/5 · 0/5 on dev** (`after-dev-{1,2}.txt`) and **0/5 · 0/5 on gh-pages** (`after-gh-{1,2}.txt`). ⟨`--only=subject-animates`⟩ ×8 on the rebuilt dist gives **8 PASS of 8** (loads 14.5–19.4; `roster-before-after.txt`).
- **The kf e2e close clause.** ⟨`KF_PLAYWRIGHT_DIR=value.js node scripts/run-demo-roster.mjs --workers=1`⟩ on a fresh `npm run gh-pages` of `5cf0f58a`:
  - Run 1 (load 18.65 → 33.04) was **4/6**.
  - Run 2 (load 33.04 → 16.89) was **4/6**.
  - Both runs failed only live-session B7 (`maxRest 0.16`, **`B7 SPECULAR-REST`**) and live-session-mobile M1 OPEN/SCROLL/RE-OPEN (**`SHEET-POSITION`**). Both are relieved by id at KF.W13R Check 1 under §0cd's classes.
  - subject-animates ✓ ×2 (`[real-cube]` ✓), occlusion ✓ ×2, usability ✓ ×2, demo-smoke ✓ ×2 (`e2e-after.txt`).
- **G-W13V-k4 → GREEN.** The sequence leg was already cured by `.k`. The cube leg's mechanism is now isolated (6/6 deterministic at the face flip) and cured at cause (0/20 after, 8/8 oracle, e2e ✓ ×2). **Kf e2e → GREEN-WITH-HONEST-RED** for B7 and M1 only.

### C1-6 (MEDIUM): KFA-15's served re-capture (G-W13V-k2)

- **Why `.k`'s instrument never reached the surface.** KFA-15's surface (`KeyframesEditor.vue`'s edit-feedback sweep `.progress-bar` and its twin in `KeyframesAddDialog.vue`) **is mounted by no product file**:
  - ⟨`git -C keyframes.js grep -n "import KeyframesEditor\|<KeyframesEditor" HEAD -- demo | wc -l`⟩ → **0**.
  - ⟨`git grep -n KeyframesAddDialog HEAD -- demo`, filtered to mounts outside the component's own folder⟩ → **0**.
  - The last mount was `SpringPhysicsFacet.vue`'s `<KeyframesEditor :animation="demo.springEditAnim">`, which **`.s`'s `e69f7731` retired** under OA-37/46/51. The shared Keyframes pane mounts `KeyframesStringControls.vue`, which has no sweep.
  - The built bytes agree. ⟨`grep -l "progress-bar origin-left" dist/gh-pages/assets/*.js | wc -l`⟩ → **0**, and ⟨`grep -l "The feedback sweep" dist/gh-pages/assets/*.js | wc -l`⟩ → **0**. The component is tree-shaken out of the served build.
- **Served census.** ⟨`node evidence/W13V/k/kfa-15/retired.mjs http://localhost:5173/ 1440x900`⟩ is `W13V/s/items.mjs` adapted. It visits home plus the six scenes and opens every enabled dock item, then counts `.progress-bar` + `pre[contenteditable]` at load and in each open pane. Result: **0 surface nodes · 0 items not opened**, run twice (`retired-dev-{1,2}.txt`).
- **Reading.** A frame-by-frame re-capture of a sweep that no served page renders cannot be taken. The surface is **SURFACE-RETIRED** on the served page, the class `.u`'s DISPOSITION already uses. The cure (`431e5bcc`, rest on `transform`) stays proven by its unit oracle (`KeyframesAddDialog.test.ts:253`). **G-W13V-k2 → GREEN: 10 of 11 re-captured with the audit's scripts, and 1 surface-retired with a served census ×2 plus the dist-byte proof.**
- **Residual, named rather than cured.** `KeyframesEditor.vue` and `KeyframesAddDialog.vue` are now **orphan product components**: no demo mount, but live tests (`keyframes-editor-honest`, `kf-toolbar-keyboard`, `KeyframesAddDialog`). Retiring them is a component-structure act, and the KF.W13W OA-64-era "no duplicate component" audit (spec §0cq) is its home. It is recorded as **`KFE-ORPHAN`** and routed there. No test is deleted here.

### C1-4 (HIGH): the four uncaptured critic gaps, captured and judged (G-W13V-k3)

Check 1's cure line named the wrong four. By `.k`'s own table (`:306-322`), the transport matrix, the dark legs and the mobile Sheet were captured. The four owed were the **tab-panel `@keyframes enter` slide · tooltips · toasts · the matrix-editor cell/reset tweens**.

⟨`node evidence/W13V/k/critic/gaps.mjs http://localhost:5173/ run{1,2}`⟩ ran headed at 1440×900 on the dev page of kf `5cf0f58a`. Each leg samples its node per rAF. The readings are `gaps-run{1,2}.json`, and the curated frames are `critic/gaps/run1-*.png` (5).

| gap | run 1 | run 2 | judged |
|---|---|---|---|
| A · tab-panel `enter` (cube, Controls → Keyframes) | old panel (node0) at opacity 1 until the switch; new panel (node1) enters at opacity **0** with `translate 8px`, then eases over ~200 ms: 13 distinct transforms, animation `enter` | identical shape (14 distinct transforms) | **lawful** — no flash: the entering panel's first painted frame is opacity 0 |
| B · tooltip (transport Play/Pause, glass `<Tooltip>`) | first paint **198 ms**, already **opacity 1**, `scale none`, `translate none`, **no animation**, `data-state=delayed-open` | 186 ms, same | **DEFECT, producer**: glass `reveal.css` keys the whole entrance on `[data-state="open"]`, but reka's TooltipContent writes `delayed-open`/`instant-open`. The reveal never matches and the tooltip pops in. The bug is still live at glass HEAD `f4946674` (`src/styles/glass/reveal.css:136`). Relayed as **O-72** (`relay/X-KF-BK-O72-TOOLTIP-REVEAL-STATE.md`; INBOX O-72 SENT). Honest-RED **`TOOLTIP-REVEAL-STATE`**, with no consumer copy. |
| C · toast (Mod+S Copy CSS → glass `[data-slot=toast]`) | enters as an opacity 0 → 1 CSS transition over ~500 ms at 1036,798, 388×86 ("CSS copied to clipboard"); exits by `glass-vaporize-*` and is gone at **3994 ms** | enter same; gone at **4017 ms** | **lawful** — enters, dwells, exits by glass's own vaporize, nothing cut |
| D · matrix editor (cube → Matrix channel via the transport list → Matrix Controls; ArrowUp ×3 on a cell, then Reset) | cell nudge: `.cube-pose` traverses **42** distinct transforms (a tween, not a jump); Reset: **34** distinct, easing to `matrix(1,0,0,1,0,0)` by ~600 ms with a small spring undershoot (0.99884) and holding after | 39 · 34, same end | **lawful** — both edits tween and Reset settles to identity |

**G-W13V-k3 → GREEN: 7 of 7 captured and judged** (3 by `.k`, 4 here). The one new defect is a producer row, routed by id (O-72) and never copied, and the spec's `.k` relief covers it ("glass rows → the batched glass letter").

### C1-1 · C1-2 · C1-3 (HIGH): escalated, with the measured reason

- **C1-1 — ESC-s-1, the Sequence inline timeline (G-W13V-s1 at Sequence). ESCALATED to the orchestrator for the grant and ruling that Check 1's own cure names.**
  - What was measured this seat: the shared **Timeline** surface is the built-in triad member. `surfacesFor` grants it only to a channel that carries an `animation` (`demo/state/controlSurfaces.ts:105-117`). Its pane content is `KeyframeTimeline` bound to that one Animation's keyframe offsets (`channel-controls/ChannelControls.vue:135-178`).
  - Sequence's lone channel is a progress scalar with no `animation` (`useSequenceDemo.ts:497-505`). Its five re-time rows are `seq.add(child, at)` insertion points on the master `Sequence`, which the timeline pane cannot express.
  - Moving them is therefore not a relocation. It needs either (a) Sequence's rows re-cut as transport channels, reversing T.B1's "rows are storyboard, not channels", or (b) a new Sequence mode for the shared Timeline pane.
  - Both are design acts. `.s` routed the choice to `.y`, and `.y` did not rule (`:206`, `:234`). No COHESION section after §0ce rules it: ⟨`grep -c 'ESC-s-1' COHESION.md`⟩ → 0.
  - A repair seat that picked (a) or (b) itself would be authoring an unratified design across the KF.W7-era timeline surface. The spec's KF.W13W (OA-64, component-structure audit) and OA-51 redesign are the natural homes.
- **C1-2 — 183 OPEN consumer KFA rows (G-W13V-k1). ESCALATED for a dated re-home ruling, or successor `.k` seats.**
  - Tally: ⟨`grep -c 'OPEN — honest-RED, not cured this seat' W13V/k/split-table.md`⟩ → **183 · 183**, unchanged by this seat.
  - Each row's lawful cure is a root cause, a born-RED test and a served re-capture with the audit's script run twice on dev and twice on gh-pages. `.k` spent a whole effort-high seat on 11 such rows.
  - At that measured rate, 183 rows is about 17 seat-equivalents. That is not one repair round's cure, and a batch "cure" without per-row served evidence would be a mask.
  - This round cured the cross-cutting `REAL-CUBE-INTERMITTENT`, and it relieved C1-6 and C1-4.
  - The rows need either a dated owner/COHESION ruling that re-homes them by id to a named wave, or a set of `.k` successor seats granted by the orchestrator.
- **C1-3 — 240 OPEN-CARRIED + 17 SPLIT consumer UIA-KF rows (G-W13V-u1). ESCALATED on the same ground.**
  - Tally: ⟨awk of `W13V/u/DISPOSITION.md` column 4⟩ → OPEN-CARRIED **240 · 240** and SPLIT **17 · 17**, unchanged.
  - `.u`/`.u2` cured 8 rows across two effort-high seats.
  - The rows need either a dated re-home ruling by id or granted `.u` successor seats.

### C1-7 · C1-8 (INFO)

- **C1-7**: removing `vue-sonner` is a kf `package.json` pin edit, which §0bt excludes. It stays with a seat granted the pin, and this seat does not touch it.
- **C1-8**: no cure needed (Check 1: not a mask).

### Commits

| repo | sha | meaning |
|---|---|---|
| kf | `5cf0f58a` | C1-5 cure + its born-RED test (2 paths: `useAnimationSync.ts`, `animation-sync-pause-edge.test.ts`); pushed `15edd312..5cf0f58a` |
| value.js | `91218014` | the served evidence (21 paths under `evidence/W13V/k/`), relay O-72, INBOX O-72 row |
| value.js | this record's commit | `## Repair 1` |

**Adjacent edits (§0bt)**: none.

### Gate re-reading (every gate a cure could move; ×2)

| gate | Check 1 | after Repair 1 | reading |
|---|---|---|---|
| G-W13V-k4 (`[real-cube]`) | RED (mechanism inferred; 1 of 2 e2e ✗) | isolated 6/6 → cured; oracletrace 0/5 ×4; subject-animates 8/8 | **GREEN** |
| kf e2e `--workers=1` (fresh gh-pages of `5cf0f58a`) | 4/6 · 3/6 | **4/6 · 4/6** (loads 18.65→33.04 · 33.04→16.89); ✗ only B7 (`B7 SPECULAR-REST`) + M1 (`SHEET-POSITION`) | **GREEN-WITH-HONEST-RED** (§0cd classes) |
| G-W13V-k2 | RED (10 of 11) | 10 re-captured + KFA-15 SURFACE-RETIRED (census 0 nodes ×2; dist bytes 0) | **GREEN** |
| G-W13V-k3 | RED (3 of 7) | **7 of 7** captured ×2 and judged; 1 producer defect → O-72 `TOOLTIP-REVEAL-STATE` | **GREEN** (glass row relieved by id) |
| G-W13V-k1 | 183 OPEN | **183 · 183** | **RED — ESCALATED (C1-2)** |
| G-W13V-u1 | OPEN-CARRIED 240 · SPLIT 17 | **240 · 240 · 17 · 17** | **RED — ESCALATED (C1-3)** |
| G-W13V-s1 DOM (Sequence) | 6 inline | no cure touched it (unchanged, not re-run: probe parsimony) | **RED — ESCALATED (C1-1)** |
| floor `npm run check` | EXIT 0 ×2 | **EXIT 0 · EXIT 0** (load 15.52 · 15.31) | GREEN |
| floor demo vitest | 75/75 · 558/558 ×2 | **76/76 · 560/560 · 76/76 · 560/560** (+1 file, +2 cases; load 20.10 · 19.28) | GREEN |
| eslint ⟨`npx eslint demo/components/instrument/transport test/demo/instrument/animation-sync-pause-edge.test.ts`⟩ | — | EXIT 0 | GREEN |
| `git diff --check 15edd312..5cf0f58a` | — | 0 | GREEN |

**E13**: this seat sent O-72, recorded as a SENT row. It read no new inbound mail. The one `-newer` hit in scope is still glass's internal `BL/FORMATION-PROGRESS.md`, and it gets no row.

**Status after Repair 1: PARTIAL.** k2, k3 and k4 plus the e2e clause moved RED → GREEN. s1 (Sequence), k1 and u1 stay RED, each escalated with its measured reason. KF.W13W stays blocked on them unless a dated ruling relieves them.

**Residuals (new this seat)**: `TOOLTIP-REVEAL-STATE` (O-72, glass) · `KFE-ORPHAN` (KeyframesEditor/KeyframesAddDialog have no mount → KF.W13W component-structure audit) · `RESET-READOUT-STALE` unchanged (the Reset-while-paused path writes the markRaw clock with no play-state edge; this seat's edge read does not reach it; owner as `.k` named).

**SELF-COUNT**: defects in the register **8**:
- **cured 3**: C1-4, C1-5, C1-6.
- **escalated 3**: C1-1, C1-2, C1-3.
- **INFO 2**: C1-7 (out of bounds, a pin edit) and C1-8 (no cure needed).
- Gates re-read: 11 rows (⟨`grep -c` on the table⟩).
- Commits: kf 1 and value.js 2 (the evidence commit and this record).

## Check 2 (L-20 pass 2 on Repair 1)

**Seat**: `claude-opus-5-5`, VERIFY-ONLY (0 kf / glass / product bytes). **Date**: 2026-09-24 (sitting of record 2026-09-17). **kf HEAD** `5cf0f58a` = `origin/master`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → 2 standing untracked inbound letters, 0 modified; value.js dirty paths (admin panels · CARRY-LEDGER · X-P-W7.md · LEDGER · `scripts/dev/dev.sh`) belong to sibling seats or are unowned; none touched except this record and minimal LEDGER appends.

**Verdict: NOT-CONFORMANT.** Every GREEN that Repair 1 and the Close claim reproduces. Bounds, masking, families, E-3 and mail are clean. Three gates stay RED with no relief in the spec: s1 at Sequence, k1 and u1. Repair 1 escalated each of them with a measured reason. No dated ruling has landed since: ⟨`grep -n 'ESC-s-1\|OPEN-CARRIED' COHESION.md`⟩ → 0. The COHESION tail is §0cv (F.W14), and §0cq..§0cu route nothing to these rows. The spec's relief for `.k` covers glass rows only, and the relief for `.u` is "routed to glass by id". Neither covers consumer rows.

### Reproduced (×2 unless noted)

| axis / gate | command | result | reads as claimed |
|---|---|---|---|
| floor `npm run check` | ⟨`npm run check; echo $?`⟩ (load 11.74 at start) | EXIT 0 · EXIT 0 | yes |
| floor demo vitest | ⟨`npx vitest run --project demo \| grep -E "Test Files\|Tests "`⟩ (load 19.30 · 21.56) | 76/76 · 560/560 · 76/76 · 560/560 | yes |
| k4 / C1-5 `[real-cube]` | ⟨`KF_PLAYWRIGHT_DIR=value.js node scripts/run-demo-roster.mjs --only=subject-animates --workers=1`⟩ on the dist built 11:44, after `5cf0f58a` (load 24.29 · 21.64) | PASS 1/1 · PASS 1/1: `[real-cube]` ✓, playhead held at rest (24.1 · 34.1), then advanced on Play; nodes bob 40 / spin 40 | yes (my 2 runs join Repair 1's 8/8 and its e2e ✓ ×2) |
| C1-5 test | ⟨`npx vitest run --project demo test/demo/instrument/animation-sync-pause-edge.test.ts`⟩ | 2/2 | yes (born-RED at `15edd312` is cited from the commit message, not re-run) |
| eslint | ⟨`npx eslint demo/components/instrument/transport test/demo/instrument/animation-sync-pause-edge.test.ts`⟩ | EXIT 0 | yes |
| diff --check | ⟨`git diff --check 15edd312..5cf0f58a \| wc -l`⟩ | 0 | yes |
| s1 grep | ⟨`grep -rln "KeyframesEditor\|CSSCodeEditor\|useSpringKeyframesEditor\|keyframes (editable)" demo/scenes \| wc -l`⟩ | 0 | yes |
| k2 / KFA-15 surface-retired | ⟨`git grep -n "import KeyframesEditor\|<KeyframesEditor\b" HEAD -- demo \| wc -l`⟩ · ⟨`grep -l "progress-bar origin-left" dist/gh-pages/assets/*.js \| wc -l`⟩ | 0 · 0. The `KeyframesAddDialog` hit in `timeline/CSSPasteDialog.vue:121` is a docblock, not a mount | yes |
| k3 / O-72 producer fact | ⟨`grep -n 'data-state="open"' glass-ui/src/styles/glass/reveal.css`⟩ | `:136 .glass-reveal[data-state="open"]` (keyed on `open`; reka writes `delayed-open`) | yes, a producer row |
| k1 tally | ⟨`grep -c 'OPEN — honest-RED, not cured this seat' W13V/k/split-table.md`⟩ | 183 | yes (RED) |
| u1 tally | ⟨awk col 4 of `W13V/u/DISPOSITION.md` \| sort \| uniq -c⟩ | OPEN-CARRIED 240 · ROUTED-GLASS 37 · SPLIT 17 · PIN-CARRIED 14 · CURED-u 6 · PARTIAL-u 2 · LANDED-BY 2 · 1 each of the rest | yes (RED) |

Served s1-DOM at Sequence was not re-run. No byte since Check 1 touched it: `5cf0f58a` changes only `useAnimationSync.ts` and its test. Check 1's census ×2 (`stageEditors=6`) stands. I did not re-run the full 6-case e2e roster. The only case a Repair 1 byte can move is `[real-cube]`, and I re-ran that one ×2 above.

### Axes

- **(2) bounds**: ⟨`git show --stat 5cf0f58a`⟩ → 2 paths (`demo/…/useAnimationSync.ts`, `test/demo/instrument/animation-sync-pause-edge.test.ts`), both inside `.k`'s set. value.js `91218014` touches 21 paths under `evidence/W13V/k/**` + `relay/X-KF-BK-O72-…md` + INBOX, and `3cf8c284` touches this record + LEDGER. ⟨`git log d1c2ac84^..HEAD -- scripts/dev/dev.sh \| wc -l`⟩ → 0. Clean.
- **(3) masking**: the cure is a root-cause read at the play-state edge. The ticker and the oracle are unchanged, and no try/catch, skip or allowlist was added. The new test asserts the engine time at the edge, with no rAF. Clean.
- **(4) families**: one meaning per sha (the kf cure + its test; value.js evidence; the record). Clean.
- **(5) E-3**: every commit in `d1c2ac84^..HEAD` that touches `KF-W13.md` is an orchestrator `docs(X·§0…)` dated addendum. No wave-tagged commit touches KF-W13.md, `registry/adjudicated/`, `keyframes/audit/`, `audit/UI-AUDIT-keyframes.md` or CONFORMANCE (a per-sha name filter over ⟨`git log --grep=W13V`⟩ → only the §0 cohesion shas). Clean.
- **(6) mail**: ⟨`grep -c '| UNREAD' INBOX.md`⟩ → 1, the `:406` sweep line, not a row. O-72 is a SENT row at `:520`. ⟨find -newer INBOX⟩ → `glass-ui/…/BL/FORMATION-PROGRESS.md` only, which is glass-internal. 0 UNREAD in scope.
- **(7) four-verb**: IMPLEMENTED = PARTIAL, VERIFIED = NO. Lawful.
- **(8) goal at the bytes**: NOT MET. OA-46 names "the sequcne … NOT inline", and Sequence still renders its re-time editors inline with all four dock items off. §0bl/§0bn also require every consumer KFA row "cured at cause" and every UIA-KF row "cured … or routed to glass". 183 and 240 are not.
- **(9) figures**: Repair 1's vitest 76/560, check EXIT 0, eslint, diff-check, the 183 and 240/17 tallies and the `[real-cube]` PASS all reproduce.
- **(10) honest-RED adjudication**: below.

### Register (severity · claim · receipt · cure)

- **C2-1 HIGH** (= C1-1, standing): G-W13V-s1 is RED at Sequence. ESC-s-1 is escalated and still unruled. Receipt: Check 1 census ×2 `stageEditors=6`; ⟨`grep -c ESC-s-1 COHESION.md`⟩ → 0; no kf byte since touches Sequence. **Cure**: an orchestrator/COHESION ruling picks (a) re-cut rows as channels or (b) a Sequence mode for the shared Timeline pane, then a granted `.s` successor lands it. Alternatively, a dated ruling re-homes s1-Sequence by id to a named wave, for example KF.W13W.
- **C2-2 HIGH** (= C1-2, standing): G-W13V-k1 is RED, with 183 consumer KFA rows OPEN. The spec relieves glass rows only. **Cure**: granted `.k` successor seats, or a dated re-home ruling by id.
- **C2-3 HIGH** (= C1-3, standing): G-W13V-u1 is RED, with 240 OPEN-CARRIED and 17 SPLIT consumer UIA-KF rows. **Cure**: granted `.u` successor seats, or a dated re-home ruling by id.
- **C2-4 INFO**: `KFE-ORPHAN` (KeyframesEditor/KeyframesAddDialog have no mount but still have live tests). Repair 1 routed it to the KF.W13W component-structure audit (§0cq). That is reasonable and not a mask, but §0cq names no row for it yet, so it is carried to the orchestrator.
- **C2-5 INFO**: `vue-sonner` unread (C1-7): still a pin edit, outside every W13V grant.
- Repair 1's cures of C1-4, C1-5 and C1-6 verify: k2, k3 and k4 plus the e2e `[real-cube]` clause read GREEN, with no new defect.

### Honest-RED set (relieved, owner-named)

- `TILE-PRIMITIVE` (p3): named by id in the §0bl second addendum, with O-58/O-67. Owner: glass BL.
- `SHEET-POSITION` (e2e M1) · `B7 SPECULAR-REST` (e2e B7): relieved by id at KF.W13R Check 1 under the §0cd classes. Owner: glass.
- `SLIDER-THUMB` (y5 thumb clause) and `TOOLTIP-REVEAL-STATE` (k3 tooltip, O-72): producer-owned under the `.k`/`.y` relief ("glass rows → the batched glass letter"). They go green only upstream.
- `DARK-MENU-ITEM` · `QUIET-FOCUS-RING`: named in §0br/§0cd. `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP`: named in §0br/§0cf/§0cj. The glass KFA rows go via O-60/O-69/O-72, and the glass UIA rows via O-59/O-70. Owner: glass BL.

**Unrelieved**: s1-DOM (Sequence) · k1 · u1.

### Successors

KF.W13W opens after "KF.W13V" (spec `:447`). That conjunct is **RED** because this row is not CLOSED, so KF.W13W is lawfully **BLOCKED**. The other conjuncts: the Model/Record clauses are not gating. The §0co/§0cq routings into KF.W13W are GREEN as written. KF.W13W unblocks only when an orchestrator grant or ruling relieves C2-1..C2-3, or when successor seats cure them. A third repair round without such a grant cannot move them: Repair 1 measured this, and no grant has landed since.

**SELF-COUNT**: gates reproduced 11 (the table rows: check · vitest · `[real-cube]` · C1-5 test · eslint · diff-check · s1-grep · k2 · k3 · k1-tally · u1-tally). Gates failed 3 (s1-DOM Sequence · k1 · u1). Register 5 rows: HIGH 3 · INFO 2 (⟨`grep -c '^- \*\*C2-'`⟩ on this section → 5).

## Repair 2 (on Check 2's register)

**Seat**: `claude-opus-5-5`, REPAIR round 2. **Date**: 2026-09-24. **kf HEAD** `5cf0f58a` = the Check 2 HEAD (⟨`git log --oneline 5cf0f58a..HEAD | wc -l`⟩ → 0). **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → 2 standing untracked inbound letters (not in any W13V set), 0 modified. There is no inherited partial work. **Bytes**: 0 kf, 0 glass, 0 product. This record and a LEDGER line only.

### Defect → cure → commit → gate re-reading

| defect | cure | commit | gate re-reading (×2, settled bytes) |
|---|---|---|---|
| C2-1 HIGH s1-Sequence | **ESCALATED (unchanged ESC-s-1).** The register's own cure is a design choice the orchestrator owns: (a) re-cut the re-time rows as transport channels, or (b) a Sequence mode on the shared Timeline pane. It can also be a dated re-home ruling. This seat was not granted `.s` successor authority, and picking (a) or (b) here would decide the owner's OA-46 design without a ruling. | — | ⟨`grep -c ESC-s-1 COHESION.md`⟩ → 0 · 0. No kf byte since Check 1: `stageEditors=6` (Check 1 census) stands. RED. |
| C2-2 HIGH k1 | **ESCALATED.** Its cure is `.k` successor seats (183 rows, cured at cause per §0bl/§0bn) or a dated re-home by id. Neither is granted to a repair seat. A partial sweep would not change the gate verdict. | — | ⟨`grep -c 'OPEN — honest-RED, not cured this seat' W13V/k/split-table.md`⟩ → 183 · 183. RED. |
| C2-3 HIGH u1 | **ESCALATED.** Its cure is `.u` successor seats (240 OPEN-CARRIED and the 17 SPLIT consumer halves) or a dated re-home by id. | — | ⟨awk col 4 of `W13V/u/DISPOSITION.md` \| grep OPEN-CARRIED\|SPLIT \| uniq -c⟩ → 240 · 17 and 240 · 17. RED. |
| C2-4 INFO KFE-ORPHAN | Carried to the orchestrator, which names the row in KF.W13W or AUDIT-2. It is below MEDIUM and has no one-command cure inside the bounds, because deleting live tests is barred. | — | n/a |
| C2-5 INFO vue-sonner | Carried. Removing it is a keyframes.js `package.json` pin edit, which no W13V grant covers and the adjacent-line rule excludes. | — | n/a |

**Verdict**: NOT-CONFORMANT, unchanged. KF.W13V stays PARTIAL and KF.W13W stays BLOCKED until an orchestrator grant or a dated COHESION ruling relieves C2-1..C2-3. This is the second consecutive repair round that measured the same three RED gates, so a third round without such a ruling cannot move them.

**SELF-COUNT**: cured 0 · escalated 3 (C2-1, C2-2, C2-3) · INFO carried 2 · gates re-read 3 ×2.

## Check 3 (L-20 pass 3 on Repair 2)

**Seat**: `claude-opus-5-5`, VERIFY-ONLY (0 kf / glass / product bytes). **Date**: 2026-09-24 (sitting of record 2026-09-17). **kf HEAD** `5cf0f58a` = `origin/master` (⟨`git -C keyframes.js log --oneline -1`⟩ · ⟨`rev-parse --short origin/master`⟩). **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → 2 standing untracked inbound letters, 0 modified; value.js dirty paths (AdminTagsPanel · CARRY-LEDGER · X-P-W7.md · `scripts/dev/dev.sh` · untracked evidence) are sibling or unowned; none touched except this record and one LEDGER line.

**Verdict: NOT-CONFORMANT, unchanged.** Repair 2 landed 0 bytes and re-escalated C2-1..C2-3. No ruling or grant has landed since: ⟨`grep -c ESC-s-1 COHESION.md`⟩ → 0; the COHESION tail is still §0cv (F.W14), and ⟨`git log 3cf8c284..HEAD -- KF-W13.md`⟩ → 0 commits. The three gates therefore stay RED with no relief in the spec.

### Reproduced (×2, load 12.83 at start)

| gate | command | result |
|---|---|---|
| floor `npm run check` | ⟨`npm run check; echo $?`⟩ | EXIT 0 · EXIT 0 |
| floor demo vitest | ⟨`npx vitest run --project demo \| grep -E "Test Files\|Tests "`⟩ | 76/76 · 560/560 · 76/76 · 560/560 |
| s1 grep | ⟨`grep -rln "KeyframesEditor\|…\|keyframes (editable)" demo/scenes \| wc -l`⟩ | 0 |
| k1 tally | ⟨`grep -c 'OPEN — honest-RED, not cured this seat' W13V/k/split-table.md`⟩ | 183 · 183 (RED) |
| u1 tally | ⟨awk col 4 of `W13V/u/DISPOSITION.md` \| grep OPEN-CARRIED\|SPLIT \| uniq -c⟩ | 240 · 17 (RED) |

s1-DOM at Sequence is not re-run: no kf byte has landed since Check 1's census ×2 (`stageEditors=6`), so it stands RED.

### Axes

- **(1)** every GREEN claimed reproduces (above). **(2) bounds**: ⟨`git show --stat 7ca4c366`⟩ → this record + LEDGER only; ⟨`git log -1 -- scripts/dev/dev.sh`⟩ → `85cfea2c` (pre-X); clean. **(3) masking**: no byte, none. **(4) families**: one meaning per sha. **(5) E-3**: 0 commits to the spec, registry, audits since Check 2's base. **(6) mail**: ⟨`grep -c '| UNREAD' INBOX.md`⟩ → 1, the `:406` sweep line, not a row; ⟨find BK/coordination -newer INBOX⟩ → 0. Clean. **(7) four-verb**: IMPLEMENTED PARTIAL, VERIFIED NO; lawful. **(8) goal**: NOT MET (OA-46 Sequence inline; consumer KFA/UIA rows uncured). **(9) figures**: Repair 2's 183 and 240/17 reproduce. **(10)** below.

### Register (severity · claim · receipt · cure)

- **C3-1 HIGH** (= C2-1): G-W13V-s1 RED at Sequence (ESC-s-1 unruled). Receipt: `stageEditors=6` (Check 1) + kf HEAD unchanged; ESC-s-1 count 0. **Cure**: an orchestrator ruling picks (a) or (b) and grants an `.s` successor, or re-homes s1-Sequence by id to a named wave (e.g. KF.W13W).
- **C3-2 HIGH** (= C2-2): G-W13V-k1 RED, 183 consumer KFA rows OPEN; the spec relieves glass rows only. **Cure**: granted `.k` successor seats or a dated re-home by id.
- **C3-3 HIGH** (= C2-3): G-W13V-u1 RED, 240 OPEN-CARRIED + 17 SPLIT consumer UIA-KF rows. **Cure**: granted `.u` successor seats or a dated re-home by id.
- **C3-4 INFO** (= C2-4 KFE-ORPHAN) · **C3-5 INFO** (= C2-5 vue-sonner): carried to the orchestrator.
- **C3-6 INFO — the loop is dry.** Three checks and two repairs have measured the same three RED gates; only an orchestrator/COHESION act moves them. A further repair round without one is waste.

### Honest-RED set (relieved, owner-named) — unchanged from Check 2

`TILE-PRIMITIVE` (O-58/O-67, glass BL) · `SHEET-POSITION` · `B7 SPECULAR-REST` (KF.W13R §0cd classes, glass) · `SLIDER-THUMB` · `TOOLTIP-REVEAL-STATE` (O-72, glass) · `DARK-MENU-ITEM` · `QUIET-FOCUS-RING` · `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `GLASS-VEIL-GREY` · `DOCK-TRIGGER-CLIP` (§0br/§0cd/§0cf/§0cj, glass BL). **Unrelieved**: s1-DOM (Sequence) · k1 · u1.

### Successors

KF.W13W "Opens after: KF.W13V" (spec `:447`) is **RED**; KF.W13W is lawfully **BLOCKED**. Its §0co/§0cq routings are GREEN as written; they do not gate.

**SELF-COUNT**: gates reproduced 5 (check · vitest · s1-grep · k1-tally · u1-tally). Gates failed 3 (s1-DOM Sequence · k1 · u1). Register 6 ids on 5 lines (⟨`grep -c "^- \*\*C3-"`⟩ → 5; C3-4 and C3-5 share a line): HIGH 3 · INFO 3.
