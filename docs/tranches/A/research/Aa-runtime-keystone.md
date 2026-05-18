# A.Rα — Runtime keystone audit

**Angle**: the functional regression — why the demo does not boot, and what the boot failure cascades into.
**Method**: Playwright live probe (Vite dev server, 2026-05-18) + source read of value.js demo, glass-ui aurora subsystem, keyframes.js manifest.
**Verdict**: four independent faults on one consumer. Three are fatal in sequence; one is cosmetic. None is a single regression — each is a half-finished migration that the others masked.

> **Correction note (2026-05-18, `audit/HARDEN-2`).** The hardening pass re-verified every citation against current source and corrected three points in this round-1 doc. They are recorded here; the body below is left as the round-1 artefact. (1) §4/§8 cite A-key-3 at `useMetaballRenderer.ts:131` — the actual null-canvas `canvasRef.value!` dereference is at `:178-179`; line 131 is a `blendFunc` call. (2) §3's "cascade" — the throw does not abort an App `mounted` hook tail; `App.vue`'s own `onMounted` holds only `loadCustomColorNames()` and `useAurora` registers its own separate `onMounted`. The throw propagates from `App.vue`'s `setup` and tears down the App component subtree mid-mount. (3) §2's keyframes.js dependency is discharged — keyframes.js HEAD `8d824ee` already carries the `development` export condition, so A.W0 Lane A needs no keyframes.js-side work. See `audit/HARDEN-2` for the full re-verification.

## §1 — The fault stack

A consumer this broken usually has one cause. value.js has four, and they hid each other: whichever fault Vite hit first is the only one a casual run surfaced, so each prior repair exposed the next.

| ID | Fault | Stage it kills | Severity |
|---|---|---|---|
| A-key-1 | keyframes.js resolution desync | Vite import-analysis (dev boot) | P0 — dev-fatal |
| A-key-2 | Aurora integration never migrated | App `mounted` hook | P0 — mount-fatal |
| A-key-3 | GooBlob null-canvas render | post-mount RAF | P1 |
| A-key-4 | stale `<Card variant="pane">` | render (cosmetic) | P1 |

## §2 — A-key-1: keyframes.js resolution desync

`vite.config.ts:30`:

```ts
"@mkbabb/keyframes.js": path.resolve(import.meta.dirname, "../keyframes.js/dist/keyframes.js"),
```

A hard alias to a sibling package's build artefact. `keyframes.js/dist/` no longer contains `keyframes.js` — it holds `assets/` + `index.html`, the `gh-pages` demo build. The library artefact was removed by keyframes.js's AD.W4 freshness-retire wave; the directory now carries the demo build instead. The same self-clobber pattern is A-key-1's cousin in value.js (see §6).

keyframes.js's `package.json` advertises:

```json
"exports": { ".": {
  "development": "./src/animation/index.ts",
  "types": "./dist/keyframes.d.ts",
  "import": "./dist/keyframes.js"
} }
```

`development` resolves to `src/` and works under a dev server. `import` and `types` point at deleted files. glass-ui's `src/composables/motion/useSpringOrchestrator.ts:2` imports the bare specifier `@mkbabb/keyframes.js`. When value.js's hard alias is in force, it shadows conditional exports entirely and forces the `dist/` path — the deleted file. Vite fails import-analysis:

```
[plugin:vite:import-analysis] Failed to resolve import "@mkbabb/keyframes.js"
  from "../glass-ui/src/composables/motion/useSpringOrchestrator.ts". Does the file exist?
```

Evidence: `research/screenshots/A-crash-375-vite-resolution-overlay.png`.

This is glass-ui Q's Q-break-1 (keyframes.js manifest) + Q-break-2 (value.js alias). The fix is two-sided: keyframes.js restores or re-points its `exports` (Q owns), value.js retires the fossil alias and lets conditional exports resolve (A owns, A.W0). value.js must also declare `resolve.conditions` so the `development` condition is selected deterministically rather than by Vite serve-mode auto-injection — Q-break-5.

The intermittent character the user saw — "works sometimes" — is the `development`-condition mask. A warm Vite dep cache serves the old resolution; a cold restart re-runs import-analysis and fails. The cosmetic-looking flicker is a cache artefact, not a race.

## §3 — A-key-2: Aurora integration never migrated

This is the fault behind the user's pasted stack and the one glass-ui Q's audit did not catch.

`App.vue:321-334`:

```ts
const auroraConfig = reactive<AuroraConfig>({
    colorMode: "derived",
    colors: [],
    surfaceMode: "color", surfaceAlpha: 0.70,
    blur: 100, speed: 0.40,
    blobCount: 10, baseRadius: 0.16, radiusVariance: 0.03,
    viewportAnchorRatio: 1.0,
    alphaLight: 0.80, alphaDark: 0.60,
    lShiftLarge: 0.15, lShiftSmall: 0.10, hueShiftLarge: 25, hueShiftSmall: 55,
    orbitAmplitude: 0.25, blendMode: "source-over",
    gradStop2: 0.30, gradStop3: 0.60, gradStop4: 1.00,
});
const { config: auroraConfigResult } = useAurora(atmosphereCanvas, auroraConfig, cssColorOpaque);
provide("auroraConfig", auroraConfigResult);
```

Every field here belongs to the retired `useAuroraBlobs` / `AuroraBlobsConfig` API. glass-ui rewrote the subsystem: the current `AuroraConfig` (`glass-ui/src/components/custom/aurora/presets.ts`) is a nucleus-and-palette model. It requires `palette: OklchStop[]` (2..8 stops) and `nuclei: AuroraNucleus[]` (1..6), plus `softmaxBeta`, `warpAmount`, `medium`, `flow`, and ~30 other keys. The demo's object carries none of the required keys and ~25 keys that no longer exist.

Three distinct breaks in one statement:

1. **Schema** — `useAurora` → `createAurora` → `setConfig` → `flattenPalette(cfg.palette, ...)`. `cfg.palette` is `undefined`; `flattenPalette` reads `.length` on it and throws `TypeError: Cannot read properties of undefined (reading 'length')` at `color.ts:67`. The user's reported symbol `stops.length` is this parameter under its earlier name; the rename `stops`→`palette` happened in a glass-ui revision between the demo's last touch and now.
2. **Arity** — `useAurora(canvasRef, configSource, runtimeOptions)`. The third argument is `AuroraRuntimeOptions` (`{ onInitError?, mode? }`). The demo passes `cssColorOpaque`, a color ref, so the color ref is silently mis-bound as runtime options and the real `onInitError` escape hatch is unavailable.
3. **Return shape** — `useAurora` returns `UseAuroraReturn` (`setCursor`, `clearCursor`, `setCursorRadius`, `renderAt`, `pause`, `resume`). It has no `config` member. `const { config: auroraConfigResult }` binds `undefined`, and `provide("auroraConfig", undefined)` poisons every consumer that injects it.

**The cascade.** `useAurora` runs inside the App `mounted` hook. The throw is caught by Vue's error handler (`callWithAsyncErrorHandling`), logged, and the hook abandoned. Everything in `mounted` after the `useAurora` call never executes. Dock layers, pane registration, and dropdown context wiring depend on that tail. This is why the dock degrades to a bare "Home" pill and the panes render half-initialized (`research/screenshots/A-crash-default-partial-render.png`) — not because the dock or panes are themselves broken, but because their setup was amputated mid-hook.

`AuroraPane.vue` is broken by the same migration debt independently of the cascade. It does `inject<AuroraConfig>("auroraConfig")!` (`AuroraPane.vue:13`) — a non-null assertion over the poisoned `undefined` — and its entire slider table (`VALUE_JS_DEFAULTS` at line 15, typed `Partial<AuroraConfig>`) targets the deleted fields `colorMode`, `surfaceMode`, `surfaceAlpha`, `blur`, `blobCount`, and the rest. The pane is dead controls over a dead inject.

**Attribution correction.** glass-ui Q's `findings.md §1` states the breakage "is NOT a glass-ui substrate regression" and "glass-ui's demo renders every probed surface cleanly (Qζ Playwright probe)." Q probed glass-ui's own demo. A-key-2 is mount-fatal in value.js's demo and is not in Q's inheritance ledger. It is a consumer-side un-migrated integration, so Q's "not a substrate regression" conclusion holds — but the user's crash is A-key-2, and W0 of this tranche owns it. `coordination/Q.md` carries the correction.

## §4 — A-key-3: GooBlob null-canvas render

`useMetaballRenderer.ts:131` throws `TypeError: Cannot read properties of null (reading 'width')` during the half-mounted window. The renderer's RAF loop runs before its canvas ref resolves, or after the aborted `mounted` left the canvas unattached. It is downstream of A-key-2's cascade and may clear once the mount completes, but the renderer should still guard a null canvas rather than throw into the RAF queue. A.Rε carries GooBlob in full (it is a bespoke WebGL2 system that duplicates glass-ui's blob subsystem); A-key-3 is the runtime symptom that the guard is missing.

## §5 — A-key-4: stale `<Card variant="pane">`

The picker card's hard black drop-shadow (`A-crash-default-partial-render.png`) is a stale prop. value.js passes `<Card variant="pane">` at 11 sites. glass-ui's `Card` never declared `variant` — it takes `tier`, `shadow`, `grain`. Vue drops the unknown prop onto `$attrs`, `Card` sees no `tier`, and falls back to `tier:"resting"` + `shadow:true`, which renders the cartoon offset shadow at full strength against a pane that wants a flat surface.

This is glass-ui Q's Q-card-1 (the 11-site consumer migration) + Q-card-2 (`Card` should warn on unknown props — Q invariant 31, component-prop fail-explicit). A owns the value.js migration to `tier`; Q owns the `Card` substrate change. The migration is mechanical once the correct `tier` per call-site is chosen (`A.Rδ` recommends the surface convention).

## §6 — value.js self-clobber (Q-break-3)

Adjacent fault, not in the user's crash but in the same family. `npm run build` (production, library) writes `dist/value.js`. `npm run gh-pages` (`vite build --mode gh-pages`) writes `outDir: ./dist/` (`vite.config.ts:97`) — the same directory. A demo build overwrites the library artefacts that `package.json` `exports` advertises (`import: ./dist/value.js`, `types: ./dist/index.d.ts`). Any consumer resolving value.js after a `gh-pages` build gets the demo `index.html` where the library should be. keyframes.js has the identical defect — its `dist/` already holds the demo build, which is the proximate cause of A-key-1. The fix routes the demo build to `dist/gh-pages/` (A.W0).

## §7 — Why this passed ungated

No fault here is exotic. They survived because:

- The `development` export condition masks A-key-1 under a warm dev cache (§2).
- A-key-2 is a TypeScript error (`reactive<AuroraConfig>({colorMode: ...})` does not satisfy the current `AuroraConfig`), but the dev server runs esbuild, which strips types without checking them. `vue-tsc` would catch it; the demo has no typecheck gate in `package.json` scripts and no consumer CI ran one.
- The `gh-pages` self-clobber (§6) only bites a consumer resolving the package after a demo build, which no test exercises.

The structural finding: value.js consumes glass-ui and keyframes.js across a `file:` link with zero verification gate. A glass-ui API rename, a sibling's artefact retirement, and a stale prop all reached `master`-adjacent state without a single red signal. A.W5 carries a consumer build/typecheck gate so the next desync fails loud.

## §8 — Disposition

| ID | Wave | Fix |
|---|---|---|
| A-key-1 | A.W0 | Retire `vite.config.ts:30` alias; declare `resolve.conditions: ["development", ...]`; consume keyframes.js via conditional exports. Depends on Q-break-1 (keyframes.js manifest fix). |
| A-key-2 | A.W0 | Rebuild `auroraConfig` from `DEFAULT_AURORA_CONFIG`; correct `useAurora` arity; drop the `{ config }` destructure; re-provide a real config ref. Rewrite `AuroraPane.vue` slider table against the live `AuroraConfig`. |
| A-key-3 | A.W0 | Null-guard the `useMetaballRenderer` RAF loop. Folds into A.Rε's GooBlob disposition. |
| A-key-4 | A.W1 | Migrate 11 `<Card variant="pane">` → `tier`. Depends on Q-card-2 (`Card` fail-explicit) landing first so the migration is verified by a warning, not by inspection. |
| Q-break-3 | A.W0 | Route `gh-pages` build to `dist/gh-pages/`. |

A.W0 closes on a clean Playwright boot — three viewports, zero console errors — which is the runtime gate the directive asked for and the proof A-key-1/2/3 are gone.
