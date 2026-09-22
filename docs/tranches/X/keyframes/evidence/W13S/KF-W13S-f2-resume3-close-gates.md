SERVED MODEL: claude-opus-5-5[1m]

# KF.W13S · `.f2` (RESUME 3) — close gate transcripts, 2026-09-22

Seat: VERIFY-ONLY. 0 keyframes.js / glass-ui / product / test bytes. kf HEAD `084a3679` = origin/master (⟨cmd⟩ `git fetch; git rev-list --left-right --count origin/master...HEAD` → `0 0`). All commands from the keyframes.js root; each run's full log lived in the seat scratchpad and the figures below are read from those logs.

## §0ai close literal (double-run, serial: leg1 → check → test:demo → library, ×2)

| limb | ⟨cmd⟩ | run 1 | run 2 |
|---|---|---|---|
| leg 1 | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | 0 (exit 0) | 0 (exit 0) |
| check | `npm run check; echo $?` | exit 0 — `vue-tsc` ×2 then `proof:structure — PASS: scope=src clean (0 violations across R1–R6)`; `grep -c 'error TS'` → 0 | exit 0, same |
| test:demo | `npm run test:demo` | Test Files 59 passed (59) · Tests 494 passed (494) · exit 0 | same |
| library | `CI=1 npx vitest run --project library` | Test Files 113 passed \| 5 skipped (118) · Tests 1259 passed \| 2 expected fail \| 14 skipped (1275) · exit 0 | same |

## `.t2` sha audit

⟨cmd⟩ `git show --stat aba106f6` → 4 files (animation · group · platform-adopt · scroll-scene), +5/−13 · `b05e7e75` → 5 files (diagnostics-channel · value4-easing-contract · strict-options · w0-crashes · waapi-lifecycle), +7/−1 · `084a3679` → 1 file (platform-adopt), +2/−1. ⟨cmd⟩ `git diff --name-only 6705d4d8..HEAD` → exactly the nine §0ap files; `--stat` → **9 files, +14/−15**.
⟨cmd⟩ `git diff 6705d4d8..HEAD -- test | grep -c 'as any\|as unknown as\|@ts-ignore\|\.skip\|\.only('` → 0 · 0. `^+.*@ts-expect-error` → 5 · 5 (the five idiom-(ii) rows, each with a reason). `git diff --check 6705d4d8..HEAD` → exit 0.

## G-KFW13-0..-7 byte clauses (double-run, identical)

G-0 `grep -rc useOptionalDockContext demo | grep -v ':0'` → ChromeDock.vue:1 · MbabbMenu.vue:3 (post-cure: MbabbMenu now calls it) · G-1 round-trip grep 0 · `v-model:open="open"` 1 · false claim 0 · OP-8 0 · G-2 `git diff 9d814f6c..HEAD -- demo/app | grep -c headerLeft` 0 · CheckboxItem 1 · G-3 `.stop` TD 0 / ChromeDock 0 (symmetric) · `registerShortcut("Space"` 1 · G-4 `instanceof HTMLElement` 0 · blur/orphan/stale 8 · G-5 aria-label 2 · valueCommit 3 · `:step` 2 · gatedSliderDown 0 · G-6 `box-shadow: var(--focus-ring-shadow)` in playback-idiom.css 0 · G-7 sweeps below; skip/only since open `9d814f6c` 0.

## G-KFW13-7 sweeps beside RULINGS-4 (E-3: neither amended)

⟨cmd⟩ `git grep -l 'btn-playback' HEAD -- demo | wc -l` → **9 · 9** (RULINGS-4 R4-4 Census 2: **7**; KF-W13 authoring: 8). The 9: DESIGN.md · KeyframeTimeline.vue (KF.W7's, routed, not edited) · PlaybackRibbon.vue · EasingScene.vue · SpringScene.vue · StartingStyleTarget.vue · design-idioms.css · font-roles.json · playback-idiom.css.
⟨cmd⟩ `grep -rn 'focus-ring' demo | grep '\.vue:' | grep -v 'kf-focus-ring' | grep -v 'focus-ring-shadow' | grep -c 'class='` → **0 · 0** (RULINGS-4: **4**; KF-W13 authoring: 2). The sole residual `.vue` hit is prose at `SquareScene.vue:45`.

## Lint (§Verification with the §0ap erratum)

⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → exit 1 · 1, **7 errors** in 3 files: `App.skeleton.vue:1` (multi-word) · `TimingFunctionPanel.vue:151/152/156` · `ControlsPaneWrapper.vue:62/328/366` (no-mutating-props). ⟨cmd⟩ `git log --oneline 9d814f6c..HEAD -- <the three>` → 0 commits (pre-existing, untouched by this wave); homed at **KF.W13T.k2** by §0ap.
