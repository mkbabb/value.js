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
