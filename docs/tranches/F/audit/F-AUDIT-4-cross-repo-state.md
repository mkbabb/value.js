# F-AUDIT-4 — Cross-repo state at F open

**Mode**: READ-ONLY across all peers. Authored at F open.
**Date**: 2026-05-20.
**Branch / HEAD**: `tranche-f` @ `e1549e0` (HEAD-identical to `master`; tranche-f opens at the post-AI-W-LOCKSTEP merge point — see §1 note).
**Author posture**: this artefact informs F's Lane 4 substrate. No peer-repo writes; no value.js `src/` edits; no git mutations in any repo. The only file authored by this lane is this audit.

---

## §1 — Peer-state matrix

| Peer | E-close SHA | F-open SHA | Drift | Significance |
|---|---|---|---|---|
| glass-ui | `66e9b8f` | `5b81866` | **+14 commits** | **HIGH**. Constellation-wide W8-W12 lockstep (Vite 8 + Rolldown + TS 6 + lucide rename + vaul-vue 0.4 + types-node 24 + vue-tsc 3.3.1) executed in glass-ui's tree by speedtest's AI tranche. Plus AI-W3-R3 motion-subpath surgery (`80880c1`, breaking, v2.0.0) + AI-W4-P1 animation expressiveness publisher writes (`80410a9`) + AI-W5 archive of `<DockGroup>` (`c56fa10`) and `<ProgressiveSidebar>` (`e255e7c`) family. v1.9.3 → v2.0.0. **NONE of the 7 standing primitive/blob asks shipped** (verified §2.1-§2.8). |
| keyframes.js | `0909177` | `d312517` | **+5 commits** | **MEDIUM**. AI W8-γ SAFE-MINOR sweep + vue peerDep contract-gap fix (`3c2d48e`) + W9-phase2 consumer LOCKSTEPS (`7c959d8`) + W10-γ Vite 8 + Rolldown (`b2dfec2`) + W12-δ TS 6 + tsconfig audit (`5896a36`) + W12-unblocker repairing 2 TS source errors so API Extractor emits real `dist/keyframes.d.ts` (`d312517`). The 2 lerp call sites at `numeric.ts:159` + `group.ts:251` remain UNMIGRATED (verified §3.1) — neither the W8-W12 lockstep cohort NOR the maintainer ran value.js's `scripts/migrate-keyframes-js-lerp.mjs` codemod. Precept submodule pin still on divergent tree at `458c2d1`. |
| speedtest | `7d9211fd` | `30f7f555` | **+25+ commits** (CW seed `61079cb1` invariant) | **MEDIUM-HIGH**. Speedtest's tranche AI CLOSED at `30f7f555` (`docs(AI/FINAL): AI tranche close ceremony — 13 substantive waves CLOSED; W11+W13 DEFER; W-FINAL user-gated`). AI's W8-W12 LOCKSTEP was the constellation-wide Vite 8 + Rolldown + TS 6 wave that value.js absorbed at its own `4cd8d15 → e1549e0` window. value.js is STILL DROPPED as a runtime dep (`grep value` on `speedtest/package.json` returns nothing; `bab2a6de` decoupling commit holds). CW seed at `61079cb1` invariant; tranche AJ opening (untracked `docs/tranches/AJ/` directory present in speedtest's working tree). |
| fourier-analysis | `926ca6a` | `926ca6a` | **ZERO** (HEAD-identical) | **NO MOVEMENT**. 109-file dirty working tree EXACTLY matches E-close (31 deleted + 62 modified + 16 untracked per breakdown). The lone constellation Phase-0 quiescence blocker for CW remains intact. 4 verified-patches now staged at speedtest's `docs/tranches/AI/artefacts/W{8-ζ,9-fourier,10-fourier,12-fourier}-addendum/` awaiting peer-team apply (cumulative order: W8-ζ → W9 → W10-η → W12-η; all `git apply --check` clean against fourier HEAD per AI FINAL §W-HANDOFF). |
| precepts | `68d9b20` | `68d9b20` | **ZERO** | value.js's pin is `68d9b20`; upstream `origin/main` HEAD is `68d9b20`; glass-ui's pin is `68d9b20`. No advance. keyframes.js still off-target at `458c2d1` (divergent tree, not `mkbabb/precepts` upstream); fourier-analysis has no submodule. |

**§1 NOTE on tranche-f branch state**: `git branch --contains 4cd8d15` reports both `master` AND `tranche-f`. The W8-W12 commits (`4cd8d15`/`1fafd5d` W8-β re-baseline, `442aba1` W9-A vue-tsc 3, `02ed508` W9-C lucide rename, `209584c` W9-F+H types-node+vaul, `08a7f96` W10-β Vite 8 + Rolldown, `9f56813` W12-β TS 6, `e1549e0` W12-unblocker entryRoot fix) were merged onto master mid-flight per speedtest's AI tranche W8-W12 constellation-wide LOCKSTEP coordination. tranche-f opens at the post-LOCKSTEP merge point; its substantive wave-scope begins from `e1549e0`. The W8-W12 work is treated as INHERITED at F-open, not as F's authorship.

---

## §2 — Glass-ui per-ask audit

### §2.1 — Metaballs API additions (positionSource, pointer input, per-blob opacity, HSV perturbation, context-loss recovery, MetaballCanvas mode="layout", pauseOnHidden)

**STILL OPEN.** Verified by direct read of `glass-ui/src/components/custom/metaballs/MetaballCanvas.vue` + `useMetaballs.ts` + `types.ts`:

- `MetaballCanvas.vue` `defineProps`: ONLY `config?: MetaballConfig`. No `positionSource`, `pointer`, `mode`, `pauseOnHidden`.
- `MetaballConfig` interface (in `types.ts`): only 8 keys — `blobCount`, `speed`, `threshold`, `baseRadius`, `orbitAmplitude`, `colors`, `bgAlpha`, `edgeSoftness`. No per-blob opacity. No HSV perturbation knobs.
- `useMetaballs.ts`: post-M.W2 Lane A (F-ε-3 fix) cycle break — `isSupported` is synchronous (good); but no `addEventListener('webglcontextlost'/'webglcontextrestored')` recovery scaffolding. No layout-mode (the 1-blob-per-DOM-element positioning consumer needs).

**Closer to ship?** No. The 14-commit post-E-close cohort touched motion subpath (`80880c1`), animation expressiveness publisher writes (`80410a9`), AI-W5 archive moves (DockGroup/ProgressiveSidebar) — none touched metaballs.

**F-scope-fit**: **PEER-MAINTAINER-SCHEDULE.** Metaball API surface enrichment is glass-ui-author work; value.js cannot author (precept 13 cross-repo authority). (a) blocker: glass-ui owns the metaballs primitive; (b) smallest unblock: glass-ui ships per-blob opacity + HSV perturbation knobs (the demo-shader-emulation half) + a `positionSource: () => Position[]` prop override (the layout-mode half) + a `pauseOnHidden: boolean` + `webglcontextlost` listener hookup; (c) trigger: a glass-ui release on master with `MetaballConfig` extended OR a new prop on `MetaballCanvas`.

---

### §2.2 — Aurora deriveAuroraPalette / deriveAuroraConfig

**STILL OPEN.** `grep -rn "deriveAurora" /Users/mkbabb/Programming/glass-ui/src` returns ZERO matches. Aurora API surface in `useAurora.ts` + `aurora.ts` barrel unchanged from E-close. The 14-commit post-E cohort's aurora-touches (`ecd0679` perf lazy-arm + `e2e5303` Safari double-rAF — already present at E-open) did not add a derive-from-color factory.

**F-scope-fit**: **PEER-MAINTAINER-SCHEDULE.** (a) glass-ui owns Aurora; (b) glass-ui ships `deriveAuroraPalette(baseColor, opts) → string[]` + `deriveAuroraConfig(baseColor, opts) → Partial<AuroraConfig>` factories; (c) glass-ui release exporting them via `@mkbabb/glass-ui/aurora`.

---

### §2.3 — BlobDot

**STILL OPEN.** `grep -rn "BlobDot" /Users/mkbabb/Programming/glass-ui/src` returns ZERO matches. No new primitive ship in the 14-commit post-E cohort.

**Value.js consumer footprint**: 16 `WatercolorDot` instance sites across 9 demo files remain (E-close inventory — unchanged at F-open because demo's `WatercolorDot` usage is internal).

**F-scope-fit**: **PEER-MAINTAINER-SCHEDULE.** (a) glass-ui owns the organic-dot primitive design space; (b) glass-ui ships a `<BlobDot>` SFC with deriveAurora-shaped color input + animated SDF noise; (c) glass-ui release exporting `BlobDot` via a new subpath (likely `@mkbabb/glass-ui/blob-dot` analogous to `@mkbabb/glass-ui/aurora`).

---

### §2.4 — SelectTrigger size prop

**STILL OPEN.** Read `glass-ui/src/components/ui/select/SelectTrigger.vue`:

```ts
defineProps<SelectTriggerProps & {
    class?: HTMLAttributes['class']
    variant?: 'default' | 'ghost'
}>()
```

No `size` prop. The trigger ships `h-10` hardcoded in the template. The shadcn-vue source-of-truth pattern would add `size?: 'sm' | 'default' | 'lg'` with `h-8` / `h-10` / `h-11` variants.

**F-scope-fit**: **AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE** *(per F's "No deferrals" mandate authorizing cross-repo writes if cross-repo authority is held)*. This is a ~10-LoC SFC edit + a `select.css` token rung. F MAY land this directly in glass-ui's tree if scoped. Alternative: **PEER-MAINTAINER-SCHEDULE** — file the spec sharp enough that glass-ui's next cohort consumes it. **Recommended posture**: file the diff in F's `coordination/Q.md` as a "ready-to-PR" patch; only escalate to a cross-repo write if F's Lane plan explicitly schedules it. This audit DOES NOT mark it AUTHORABLE without F's leadership confirming the cross-repo-write budget.

---

### §2.5 — DockSelectTrigger clampLabel

**STILL OPEN.** Read `glass-ui/src/components/custom/dock/DockSelectTrigger.vue`:

```ts
defineProps<SelectTriggerProps & {
    class?: HTMLAttributes["class"];
}>()
```

No `clampLabel` prop. The truncation policy is currently delegated to `[&>span]:line-clamp-1` baked into `dock-select-trigger` CSS class.

**F-scope-fit**: same disposition as §2.4. ~5-LoC SFC edit; AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE if F holds the budget, otherwise PEER-MAINTAINER-SCHEDULE.

---

### §2.6 — TooltipContent variant="mono"

**STILL OPEN.** Read `glass-ui/src/components/ui/tooltip/TooltipContent.vue`:

```ts
defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>()
```

No `variant` prop. The font-stack is `text-sm` (Plus Jakarta Sans via typography.css). Mono variant would route to `font-mono` (Fira Code per typography.css `@font-face` definitions).

**F-scope-fit**: same disposition as §2.4. ~8-LoC SFC edit (variant prop + conditional class). AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE if budgeted; otherwise PEER-MAINTAINER-SCHEDULE.

---

### §2.7 — Button size="icon-sm"

**STILL OPEN.** Verified via `grep -n "icon-sm\|size:" /Users/mkbabb/Programming/glass-ui/src/components/ui/button/index.ts`:

```
34:      size: {
39:        icon: 'h-10 w-10 p-0',
44:      size: 'default',
```

The `size` variant family ships `default` + `sm` + `lg` + `icon` (the latter hardcoded `h-10 w-10`). No `icon-sm` rung (which would be `h-8 w-8`).

**F-scope-fit**: ~3-LoC `buttonVariants.size` table edit. AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE if budgeted; otherwise PEER-MAINTAINER-SCHEDULE.

---

### §2.8 — `<Tabs variant="underline">`

**STILL OPEN.** Read `glass-ui/src/components/ui/tabs/Tabs.vue`:

```ts
defineProps<TabsRootProps>()
```

No `variant` prop. Provider family (Tabs / TabsList / TabsTrigger / TabsIndicator / TabsContent) does not expose a variant slot. The demo's `.underline-tabs` override continues to live in `demo/@/styles/`.

**F-scope-fit**: **PEER-MAINTAINER-SCHEDULE.** This is the largest of the 5 small-primitive asks — touches 4-5 SFCs (Tabs, TabsList, TabsTrigger, TabsIndicator) + `provide`/`inject` for variant propagation + matching CSS. Larger than F-scope cross-repo write budget for incidental fixes. (a) blocker: glass-ui owns the Tabs primitive shape; (b) smallest unblock: glass-ui ships a `provide`-shaped `variant?: 'default' | 'underline'` prop on `<Tabs>` + the indicator-vs-underline rendering branch; (c) trigger: glass-ui release exposing the new prop family.

---

### §2.9 — Contract-v2 §2.1 font-asset residual (font-inlining)

**STILL OPEN.** Direct inspection of `glass-ui/dist/glass-ui.css` (42,984 bytes, May 20 21:16):

| Check | Count | Verdict |
|---|---|---|
| `@font-face` rules in `dist/glass-ui.css` | **0** | NOT inlined |
| `url(...)` references in `dist/glass-ui.css` | **0** | NO font references at all |
| `data:font/...` base64 inline references | **0** | NOT inlined |

`src/styles/typography.css` (the Tailwind-source half consumed via `./styles` subpath) STILL ships 8+ `@font-face` rules with relative `url("../fonts/plus-jakarta-sans/...")` + `url("../fonts/fira-code/...")` references. value.js's `vite.config.ts:siblingFsAllowTransient` carve-out remains structurally required for those URL resolutions to walk OUT of `node_modules/@mkbabb/glass-ui/src/styles/` into the symlink target's `fonts/` directory.

**F-scope-fit**: **PEER-MAINTAINER-SCHEDULE with sharper (c) trigger.** This is glass-ui-author work (font-inlining is a build-system / @font-face surface concern). (a) blocker: Tailwind-source `./styles` subpath ships `@font-face` rules with relative URLs that cannot resolve through `node_modules` unless the consumer carves out fs-allow; (b) smallest unblock: glass-ui Vite build inlines `.woff2` binaries as `data:font/woff2;base64,...` URIs in `dist/glass-ui.css` (could be size-prohibitive for full Latin+Latin-ext + Fira Code; alternative: ship the `@font-face` rules in a separate `dist/glass-ui-fonts.css` subpath that resolves URLs to a CDN, OR ship a Vite plugin that the consumer registers); (c) trigger: glass-ui's `dist/glass-ui.css` grep for `@font-face` returns ≥1. **OR** trigger (c′): glass-ui ships an alternative subpath (e.g. `./fonts.css`) that the demo can consume in lieu of `./styles`'s typography import.

---

### §2.10 — Constellation-wide LOCKSTEP audit (W8-W12)

**SHIPPED in glass-ui** (per `git log 66e9b8f..HEAD --grep='Vite 8\|Rolldown\|W10\|W12\|TypeScript 6'`):

| glass-ui commit | Wave | Description |
|---|---|---|
| `2acafb7` | W8-α | SAFE-MINOR + SAFE-PATCH sweep |
| `65aba78` | W9-A | vue-tsc 2.2.12 → 3.3.1 (publisher first) |
| `eda8d3c` | W9-C | lucide-vue-next → @lucide/vue@^1.16.0 (canon setter) |
| `5ad9995` | W9-F+H | @types/node ^24.12.3 + vaul-vue ^0.4 (publisher canon) |
| `9020324` | W10-α | Vite 7.3.3 → 8.0.13 + Rolldown 1.0.1 canary |
| `5b81866` | W12-α | TypeScript 5 → 6 |

**Value.js LOCKSTEP parity**: VERIFIED at master. `package.json` declares `vite ^8.0.13`, `typescript ^6.0.3`, `vue-tsc ^3.3.1`, `@lucide/vue ^1.16.0`, `@types/node ^24.12.3`, `vaul-vue ^0.4.0`. Value.js's own W8-β `4cd8d15` + W9-A/C/F-H `442aba1`/`02ed508`/`209584c` + W10-β `08a7f96` + W12-β `9f56813` + W12-unblocker `e1549e0` cohort matches glass-ui's wave shape. Constellation lockstep CLOSED at this rung; further LOCKSTEPS (W11 + W13) are DEFERRED per AI FINAL.

---

## §3 — Keyframes.js audit

### §3.1 — Silent-breakage migration status (the 2 lerp call sites)

**STILL UNMIGRATED.** Direct read confirms bit-identical state to E-close:

- `keyframes.js/src/animation/numeric.ts:158-163`:
  ```ts
  for (let i = 0; i < seg.keys.length; i++) {
      (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
          eased,
          seg.startVals[i]!,
          seg.stopVals[i]!,
      );
  }
  ```
- `keyframes.js/src/animation/group.ts:251-255`:
  ```ts
  existing.value = lerp(
      layer.weight,
      existing.value,
      incoming.value,
  );
  ```

Both call sites use the v0.5.x `lerp(t, a, b)` shape. Both silently produce garbage under v0.6.0's `lerp(a, b, t)` shape (which is the current `tranche-f` HEAD value.js, where keyframes.js's `file:`-link picks up). `grep -rn '\blerp(' /Users/mkbabb/Programming/keyframes.js/src/` returns ONLY these 2 sites — call-site count remains 2.

### §3.2 — Codemod application status

**NOT APPLIED.** value.js's codemod `scripts/migrate-keyframes-js-lerp.mjs` exists (9,499 bytes, executable, May 20 19:21) and is wired into `package.json` as `"codemod:keyframes-lerp": "node scripts/migrate-keyframes-js-lerp.mjs"`. Neither value.js NOR keyframes.js's maintainer has run it against keyframes.js's tree — the 2 call sites would be rewritten if so. **The §3.1 evidence is the proof-of-non-application.**

### §3.3 — Precept-pin drift

**STILL DIVERGENT.** `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts`:
```
 458c2d1167f4e3a327edf17fc7509da533cacf1e docs/precepts (heads/main)
```

`458c2d1` remains the divergent-tree SHA (NOT `mkbabb/precepts` upstream). The W8-W12 lockstep cohort did NOT touch the precepts submodule.

### §3.4 — Test suite state

**SKIPPED PER HARD CAP.** F-AUDIT-4's directive explicitly authorizes skipping peer `npm test` if slow/destructive. value.js's `coordination/Q.md §5.3 (c)` defines the trigger as keyframes.js maintainer running `npm test` against current value.js master — that's a peer-team action, not an F-AUDIT-4 obligation. **Skipping it preserves read-only posture.**

The expected behavior if RUN (per Q.md §5.3): `npm test` would FAIL at the 2 lerp call sites because v0.7.0 (current master value.js) ships `lerp(a, b, t)` and the consumer is still calling with `lerp(t, a, b)` shape. Until the codemod runs, the test suite is broken-by-construction against current master value.js. **This is the v0.7.0+ retention-justification for `lerpLegacy` per Q.md §5.3.**

**Audit observation worth filing for F**: keyframes.js's W12-unblocker commit (`d312517 fix(keyframes.js/W12-unblocker): repair 2 source TS errors so API Extractor emits real dist/keyframes.d.ts`) reveals that keyframes.js's maintainer IS actively maintaining the tree (responsive to W8-W12 LOCKSTEP coordination). Yet the lerp migration remains unscheduled. This suggests the (c) trigger (Q.md §5.3) requires explicit user/maintainer attention — the lockstep cohort coordinator (speedtest AI tranche) did NOT include the lerp codemod in its W-LOCKSTEPS. F's (c) trigger should be sharpened to **a specific user/maintainer signal**, not "next time keyframes.js's maintainer is touching the tree" (which has now happened and did not include the migration).

---

## §4 — Speedtest audit

### §4.1 — CW seed activation status

**STILL PLANNING-ONLY.** `git -C speedtest log --grep='CW' --format='%h %ci %s'` confirms the CW seed at `61079cb1 merge(CW seed): R5-beta — tranche CW scaffold (monorepo workspace transposition; G-AH-D1 successor)` (2026-05-19 21:06) is the latest CW-prefixed commit. No CW.W0/W1/W2 dispatch commits have landed.

CW remains gated on (a) Phase-0 quiescence (fourier-analysis 109-file dirty tree — STILL DIRTY per §5.1), (b) AH-CLOSE (✓ done at speedtest `75af6060` pre-E-open), (c) user signal (NOT given).

The 25+ commits in speedtest's drift window since E-close are the AI tranche's W8-W12 wave (and AI close ceremony). NONE are CW activations.

### §4.2 — value.js coupling

**STILL DROPPED.** `grep -n 'value' /Users/mkbabb/Programming/speedtest/package.json` returns nothing. `bab2a6def perf(utils): inline value.js helpers — drop @mkbabb/value.js dep` (2026-05-08) remains the de-coupling commit. No re-introduction in the AI tranche.

Per AI FINAL §W-HANDOFF (line 86): *"value.js (now SUPERSEDED — value.js cleaned tranche-e and applied equivalent)"* — the speedtest-side `W1-epsilon/patch-{A,B}` handoff for value.js's Pane → Card migration is historically-superseded; value.js applied the equivalent migration internally during tranche-e.

Per AI FINAL §3 (line 74): *"value.js | 7 commits (W8-β + W9 P2 ×3 + W10-β + W12-β + packaging-fix unblocker) | `e1549e0`"* — speedtest's record of value.js's role in the AI tranche LOCKSTEP. Value.js authored its W8-W12 commits in its own tree, in lockstep with glass-ui + keyframes.js, coordinated by speedtest AI's W-LOCKSTEP cohort but NOT cross-written.

**F-relevant**: value.js's runtime-dep posture at speedtest holds; F has zero coupling-to-CW asks against speedtest at F-open. F continues to be CW Phase-2 CONSUMER, flipping last after fourier quiesces.

### §4.3 — Speedtest tranche AJ surface (informational)

Speedtest's working tree shows an untracked `docs/tranches/AJ/` directory at probe time. AJ has not yet shipped its first commit on master. **Informational only**: F does not block on AJ's content; AJ may surface new asks against value.js at its W0 dispatch, but at F-open the manifest is empty.

---

## §5 — Fourier-analysis audit

### §5.1 — Dirty tree state (CW Phase-0 blocker)

**UNCHANGED.** `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l` returns **109** — bit-identical to E-open + E-close. Breakdown:

- 31 deleted (`D`)
- 62 modified (`M`)
- 16 untracked (`??`)

Sample of modified entries: `.env.example`, `.gitignore`, `api/Dockerfile`, `api/main.py`, `api/routers/{admin,contours,equations,gallery,images}.py`, `api/services/{database,janitor,rate_limiter}.py`, `docker-compose.prod.yml`. These are pre-existing dirty state from the fourier-analysis team's in-flight backend refactor; NOT touched by value.js / glass-ui / speedtest tranches.

**Speedtest's AI staged 4 verified-patches for fourier-analysis** awaiting peer-team apply:
- `W8-zeta/patch-fourier-deps-v2.patch` (1.9 KB) — SAFE-MINOR sweep + pinia 2 → 3
- `W9-fourier-addendum/w9-fourier.patch` (26.6 KB) — vue-tsc 3.3.1 + lucide rename (41 src edits)
- `W10-fourier-addendum/w10-fourier.patch` (647 bytes) — Vite 7 → 8 devDep bump
- `W12-fourier-addendum/w12-fourier.patch` (361 bytes) — TS 5 → 6 devDep bump

All `git apply --check` verified clean at their respective dispatch moments. Cumulative apply order: W8-ζ → W9 → W10-η → W12-η.

**Plus AH-era unapplied patch**: `speedtest/docs/tranches/AH/artefacts/W-HANDOFF/fourier-analysis-contract-v2.patch` (the original contract-v2 patch from AH W-HANDOFF — also unapplied).

**F-scope-fit**: **PEER-MAINTAINER-SCHEDULE** for the dirty-tree drain. (a) blocker: fourier-analysis maintainer's in-flight backend refactor occupies the tree; (b) smallest unblock: maintainer commits or stashes the 109-file work-in-progress + applies the 5 staged patches; (c) trigger: `git -C fourier-analysis status --porcelain | wc -l` → 0 (or near-0 — the verified-patches add new files). At that point CW Phase-0 quiescence opens.

Value.js's consumption surface at fourier-analysis (5 files importing `easeInOutSine` + `timingFunctions`) remains invariant under v0.6.0 → v0.7.0 → W10-β + W12-β (no easing-surface changes in those commits). Fourier-analysis still pins `@mkbabb/value.js@^0.4.6` from npm registry; value.js's v0.7.0 release is unpublished as of F-open audit time (the release exists at `47399c2 Merge tranche-e into master — Tranche E close (v0.7.0)` but the `git tag` ceremony is what publishes; F's house-cleaning may include a `v0.7.0` annotated tag if not already pushed).

---

## §6 — Precepts audit

### §6.1 — value.js pin

`git -C /Users/mkbabb/Programming/value.js submodule status docs/precepts`:
```
 68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)
```

Pin: `68d9b20`. Unchanged since D-close.

### §6.2 — upstream HEAD

`git -C /Users/mkbabb/Programming/value.js/docs/precepts log -1 --format='%H %ci %s'`:
```
68d9b20b56e420b0336733a82a10a909b4c6a69c 2026-05-19 01:21:56 -0400 precept: contract-v2 — abrogate the `development` dev-resolution condition
```

`git log origin/main -5 --format='%h %ci %s'` shows no commits after `68d9b20` — it IS the upstream HEAD.

**Zero advance** since E-open. No F-side precept-pin lift required.

### §6.3 — peer-pin convergence

| Repo | Pin | Convergence |
|---|---|---|
| value.js | `68d9b20` | = upstream HEAD ✓ |
| glass-ui | `68d9b20` | = upstream HEAD ✓ |
| speedtest | `26297c9` | 1 behind upstream (benign per E-AUDIT-4 §7.4) |
| keyframes.js | `458c2d1` | DIVERGENT TREE (not mkbabb/precepts) |
| fourier-analysis | (no submodule) | — |

**F-scope-fit (keyframes.js drift)**: **PEER-MAINTAINER-SCHEDULE** — (a) blocker: keyframes.js's `docs/precepts` submodule points to a different precepts repo (or fork) than the constellation; the maintainer's intent is unclear at audit time; (b) smallest unblock: keyframes.js maintainer rebases the `docs/precepts` submodule pin onto `mkbabb/precepts` upstream OR documents the rationale for the divergent tree; (c) trigger: keyframes.js maintainer signal.

---

## §7 — Per-ask F-scope-fit

| # | Ask | Verdict | Rationale |
|---|---|---|---|
| 1 | `lerpLegacy` codemod application (keyframes.js) | **AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE** | Lane F.W{?} applies `npm run codemod:keyframes-lerp` against keyframes.js's tree + verifies `npm test` passes against current master value.js. F's "No deferrals" mandate explicitly authorizes cross-repo writes. The codemod is idempotent, dry-run-safe, parity-asserting (per value.js's E.W4 Lane F authorship). After apply: value.js may delete `lerpLegacy` in F's library-surface wave (per Q.md §5.3 (c) trigger satisfaction). |
| 2 | Metaballs API additions (glass-ui) | **PEER-MAINTAINER-SCHEDULE** | Cross-repo write would require deep WebGL composable surgery (per-blob opacity uniform, HSV-perturb uniform, context-loss listener, layout-mode mount mode, pauseOnHidden visibility hook). Authorship scope exceeds F's incidental cross-repo-write budget; this is a glass-ui-author successor tranche. (c) trigger: glass-ui ships `MetaballConfig` extensions OR new `MetaballCanvas` props. |
| 3 | Aurora deriveAuroraPalette + deriveAuroraConfig (glass-ui) | **PEER-MAINTAINER-SCHEDULE** | Algorithm-design surface (color-space-aware palette derivation from a base color, perceptually-uniform spread, chroma/lightness modulation). Glass-ui-author work. (c) trigger: glass-ui `aurora.ts` barrel exports `deriveAuroraPalette` / `deriveAuroraConfig`. |
| 4 | BlobDot primitive (glass-ui) | **PEER-MAINTAINER-SCHEDULE** | New SFC primitive + new subpath export + design-language alignment. Glass-ui-author work. (c) trigger: glass-ui ships `<BlobDot>` SFC + barrel export. |
| 5 | SelectTrigger size prop (glass-ui) | **AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE** (if budget) — otherwise **PEER-MAINTAINER-SCHEDULE** | ~10 LoC diff. F can choose to land this in glass-ui if Lane plan budgets a cross-repo write. **Recommended**: file the diff in F's `coordination/Q.md` as "ready-to-PR"; escalate only if Lane plan reserves the slot. |
| 6 | DockSelectTrigger clampLabel (glass-ui) | **AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE** (if budget) — otherwise **PEER-MAINTAINER-SCHEDULE** | ~5 LoC diff. Same disposition as #5. |
| 7 | TooltipContent variant="mono" (glass-ui) | **AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE** (if budget) — otherwise **PEER-MAINTAINER-SCHEDULE** | ~8 LoC diff. Same disposition as #5. |
| 8 | Button size="icon-sm" (glass-ui) | **AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE** (if budget) — otherwise **PEER-MAINTAINER-SCHEDULE** | ~3 LoC diff. Same disposition as #5. |
| 9 | `<Tabs variant="underline">` (glass-ui) | **PEER-MAINTAINER-SCHEDULE** | 4-5-file SFC family edit + provide/inject for variant propagation + CSS surface. Larger than incidental cross-repo write. (c) trigger: glass-ui ships `<Tabs variant>`. |
| 10 | Contract-v2 §2.1 font-asset residual (glass-ui) | **STILL-BLOCKED-WITH-SHARPER-(c)** | (a) glass-ui `dist/glass-ui.css` ships ZERO @font-face / url(); src/styles/typography.css ships 8+ @font-face with relative URLs; value.js's `siblingFsAllowTransient` carve-out remains structurally required. (b) glass-ui's Vite build inlines `.woff2` as base64 OR ships a `./fonts.css` subpath OR drops `@font-face` from `./styles`. (c) sharper trigger: `grep -c '@font-face' /Users/mkbabb/Programming/glass-ui/dist/glass-ui.css` ≥ 1 OR `glass-ui/package.json` exports map exposes `./fonts.css`. |
| 11 | keyframes.js precept-pin drift (`458c2d1` divergent tree) | **PEER-MAINTAINER-SCHEDULE** | Maintainer-choice convergence; F has zero authority over keyframes.js's precept-submodule rebase decision. (c) trigger: keyframes.js maintainer signal. |
| 12 | fourier-analysis 109-file drain | **PEER-MAINTAINER-SCHEDULE** | Fourier maintainer's in-flight backend refactor; F has zero authority. Unblocks CW Phase-0 quiescence when done. (c) trigger: fourier dirty count → 0 (or near-0). |
| 13 | CW Phase-2 workspace flip (value.js side) | **AUTHORABLE-IN-F-VIA-CROSS-REPO-WRITE** (one-line `package.json` edit) BUT GATED on CW Phase-0 + Phase-1 completion | Per E-AUDIT-4 §4.5 + Q.md §4: value.js's `package.json` change `"@mkbabb/glass-ui": "file:../glass-ui"` → `"@mkbabb/glass-ui": "workspace:^"` is a 1-line edit; F can land it AT THE MOMENT CW Phase-2 reaches value.js. (c) trigger: CW lead dispatches Phase-2 to value.js. |

**Authorable-in-F count**: 1 unconditional (#1 lerpLegacy codemod application) + 4 conditional (#5-#8 small-primitive diffs, if Lane plan budgets cross-repo writes) + 1 gated (#13 CW Phase-2 flip, gated on Phase-0+1 completion) = **1 unconditional, 5 conditional/gated**.

**Peer-maintainer-schedule count**: 6 (#2, #3, #4, #9, #11, #12).

**Still-blocked-with-sharper-(c) count**: 1 (#10).

**Already-closed count**: 0 (no asks closed by peers between E-close and F-open).

---

## §8 — Net cross-repo assessment for F

### §8.1 — Cross-repo writes F MUST author (per "No deferrals" mandate)

Per the F-opening directive: "No deferrals" + "authorizing cross-repo writes for F". The MUST-author list is the subset of authorable items where the (c) trigger is currently satisfiable AND no peer-maintainer signal is awaited.

1. **#1 — `lerpLegacy` codemod application at keyframes.js + lerpLegacy removal at value.js**.
   - **Trigger state at F-open**: keyframes.js working tree CLEAN (`git status --porcelain` empty); codemod published + idempotent + dry-run-safe; both call sites STILL UNMIGRATED (§3.1 verified); keyframes.js maintainer ACTIVE (W8-W12 LOCKSTEP discharged + W12-unblocker commit) but did NOT apply the codemod in that window.
   - **F's authorship route**: F.W{?} dispatches a sub-lane that (a) `cd keyframes.js && node /path/to/value.js/scripts/migrate-keyframes-js-lerp.mjs --apply`, (b) `npm test` in keyframes.js, (c) IF pass: lerpLegacy removal commit at value.js + keyframes.js commits the migration. If FAIL: file the failure trace in F's audit + revert the codemod application; lerpLegacy retains.
   - **Pre-cross-repo-write integrity gate**: capture keyframes.js's pre-state SHA (`d312517`) so the cross-repo write is auditable + reversible. Use the codemod's `--dry-run` flag first; only `--apply` after dry-run parity check passes.

### §8.2 — Cross-repo writes F MAY author (if Lane plan reserves the slot)

The 4 small-primitive glass-ui diffs (#5 SelectTrigger size, #6 DockSelectTrigger clampLabel, #7 TooltipContent variant="mono", #8 Button size="icon-sm"). Total estimated LoC: ~26 across 4 SFCs + minor index.ts variant-table updates. Constraint: must align with glass-ui's design-system canon (use existing tokens, variants follow `class-variance-authority` patterns, no new design primitives). **Recommendation**: do NOT pre-commit F to these; let F's leadership decide at Lane-plan dispatch whether the cross-repo-write budget extends here.

### §8.3 — Cross-repo asks F CANNOT close in scope

| Ask | Rationale |
|---|---|
| Metaballs API additions (7 sub-asks) | Authorship scope exceeds incidental cross-repo write; glass-ui-author tranche territory. |
| Aurora deriveAurora* | Algorithm-design surface; glass-ui-author tranche territory. |
| BlobDot primitive | New design primitive; glass-ui-author tranche territory. |
| `<Tabs variant="underline">` | 4-5-file family edit + provide/inject; glass-ui-author scope. |
| Font-asset residual | Glass-ui build-system surface (Vite plugin / asset-inlining decisions). Not F-author scope. |
| Keyframes.js precept-pin drift | Maintainer-choice convergence; F has zero authority. |
| Fourier-analysis 109-file drain | Fourier-maintainer in-flight refactor; F has zero authority. Unblocks CW Phase-0 when done. |
| CW Phase-2 flip | F authorable BUT gated on Phase-0 quiescence (fourier drain) + Phase-1 dispatch by CW lead. F can pre-author the diff but cannot land it without the gate. |

### §8.4 — Sequencing recommendation for F

1. **F.W0 substrate** — adopt this audit's findings into `coordination/Q.md` + `dispatch/AGENT.md`.
2. **F.W{early}** — Lane that applies the keyframes.js lerp codemod + verifies `npm test` + lands the lerpLegacy removal at value.js (the **only unconditional cross-repo write at F-open**). Sub-gate: pre-state SHA capture + dry-run + apply + test + commit at peer + commit at self.
3. **F.W{middle}** — IF Lane plan budgets cross-repo small-primitive writes at glass-ui (the 4 ~3-10 LoC diffs): a single batched Lane that lands all 4 in one glass-ui PR-shaped commit cohort. Otherwise: file ready-to-PR diffs in F's `coordination/Q.md` for glass-ui's next tranche to consume.
4. **F.W{late} / F-close** — produce a `FINAL.md §6` that updates the cross-repo state matrix + sharpens (c) triggers for everything that remains on PEER-MAINTAINER-SCHEDULE. Specifically: sharpen the keyframes.js lerp migration (c) trigger to **a specific user signal** (since the maintainer was active in W8-W12 without applying the codemod — the previous (c) "next time maintainer touches the tree" has been falsified).

### §8.5 — Constellation health verdict at F-open

| Cross-repo dependency | Verdict | Change since E-close |
|---|---|---|
| Precepts SHA (value.js ↔ upstream) | GREEN | unchanged |
| Contract-v2 publisher compliance | GREEN | unchanged |
| W8-W12 lockstep parity (Vite 8 + Rolldown + TS 6 + tooling) | GREEN | NEWLY GREEN (post-AI tranche close at speedtest `30f7f555`) |
| Subpath surface (`./styles.css`) | PARTIALLY GREEN | unchanged (font-asset residual open) |
| Glass-ui 7 primitive/blob asks + Tabs underline + 5 small-prop asks | RED | unchanged (none shipped) |
| Glass-ui v2.0.0 breaking surface (`80880c1` motion-subpath) | NEEDS DEMO RE-VERIFY | new — F.W{?} should re-run smoke + smoke-safari against glass-ui v2.0.0 to catch any consumer-surface regressions |
| Keyframes.js lerp migration | RED | unchanged (still unmigrated; (c) trigger sharpening needed) |
| Keyframes.js precept-pin drift | YELLOW | unchanged |
| Fourier-analysis dirty tree (CW Phase-0 blocker) | RED | unchanged (109 files exactly) |
| Speedtest AI tranche | CLOSED at `30f7f555` | new — AI's W-LOCKSTEP authority for the constellation is dissolved; future LOCKSTEPS would originate from a successor tranche (AJ surface in flight) |
| Speedtest CW seed | YELLOW (planning); HIGH-FUTURE-IMPACT | unchanged; still gated on fourier Phase-0 + user signal |

---

## §9 — Authority

**Audit deliverables authored in this lane**:
- `/Users/mkbabb/Programming/value.js/docs/tranches/F/audit/F-AUDIT-4-cross-repo-state.md` (THIS FILE — sole authored artefact).

**Peer SHAs verified at probe time** (2026-05-20, all `git log -1 --format=%H` reads):
- value.js: `e1549e0d309c31b4e977765d7c7a02fc67987078` (branch `tranche-f`, HEAD-identical to `master`).
- glass-ui: `5b818661a29a06af3189ff5de2a0fa804135c658` (master, W12-α TS 5 → 6).
- keyframes.js: `d312517cce393d35f6ef5bf05ab5bd73aa6a9b49` (master, W12-unblocker).
- speedtest: `30f7f5551fc905719312494a14b20bfce8a1aa92` (master, AI close ceremony).
- fourier-analysis: `926ca6a97bb92b67bca222baf97cd7552f5e9c97` (master, unchanged; 109-file dirty tree).
- precepts (shared): `68d9b20b56e420b0336733a82a10a909b4c6a69c` = `origin/main` HEAD = value.js pin = glass-ui pin.

**Sub-pin verification SHAs**:
- glass-ui post-E-close cohort (14 commits enumerated at §1 + §2.10).
- keyframes.js post-E-close cohort (5 commits enumerated at §1).
- speedtest CW seed at `61079cb1` confirmed present + invariant.
- speedtest AI FINAL at `30f7f555` confirmed CLOSED + W11+W13 DEFER + W-FINAL user-gated.
- keyframes.js `numeric.ts:159` + `group.ts:251` re-verified bit-identical to E-close.
- glass-ui `dist/glass-ui.css` font-asset grep returns 0 (§2.9 evidence).

**Cross-references**:
- E-AUDIT-4 (`docs/tranches/E/audit/E-AUDIT-4-cross-repo-state.md`) — F-AUDIT-4's parent shape.
- E.W0 Lane C coord refresh (`docs/tranches/E/audit/E.W0-lane-c-coord-refresh.md`) — peer-HEAD reconciliation precedent.
- E coordination Q.md (`docs/tranches/E/coordination/Q.md`) — recorded SHAs.
- E FINAL §6 (`docs/tranches/E/FINAL.md`) — standing route-forward items.
- Speedtest AI FINAL (`/Users/mkbabb/Programming/speedtest/docs/tranches/AI/FINAL.md`) — W-LOCKSTEPS + W-HANDOFF inventory.

**Posture statement**: this audit is **READ-ONLY**. No git mutations in any repo. No `src/` edits. No peer-repo writes. No `npm install` / `npm test` invocations against peer repos (per the hard-cap discipline). The only file authored is this artefact.

**End F-AUDIT-4.**
