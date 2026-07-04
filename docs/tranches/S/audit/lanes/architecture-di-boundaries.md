# Tranche S — Audit Lane: Encapsulation / Service-Boundary / DI / Pipeline Architecture

**Auditor mode:** AUDIT ONLY (tranche development). No product-code edits.
**Repo:** value.js @ c5aa091 (branch tranche-q). Live dev server: localhost:9000.
**Scope:** demo `provide/inject` vs `pm.*` facade vs free composables vs module singletons; api/ inject-services truth; the DI-absent hard imports (CSS-color resolver, availability latch, quantize worker); pipeline orchestration (color model → derived surfaces).

---

## 0. VERDICT (≤ read this first)

The demo and api are **two-tier architectures where one tier is disciplined and the other leaks**, and the leaks are structural, not cosmetic:

- **demo DI**: color-state uses clean injection-keys (`COLOR_MODEL_KEY`, `CSS_COLOR_KEY`, `SAFE_ACCENT_KEY`, `EDIT_TARGET_KEY`, `AURORA_ATOMS_KEY`, `BLOB_CONFIG_KEY`) — GOOD. But three heavy runtime capabilities are **hard-imported module singletons with zero DI seam**: the availability latch (`apiAvailability` + module-level `sessionToken`), the quantize worker (`?worker` URL import), and the palette-API transport (`request`/`adminRequest` module-scoped `let sessionToken`). None are injectable → none are swappable in dev, test, or Safari-fallback.
- **api service boundary**: **split-brain**. `services/palette/*` (9 files) take a pure `Services` DI object — clean, framework-agnostic, testable. `services/admin/*` + `services/color/*` + `services/session/*` (**30 functions across 12 files**) take the raw Hono `Context<AppEnv>` and reach into `c.var.services` / `c.var.sessionToken` themselves. The CLAUDE.md pipeline doc claims "service — receives `Services` from `c.var.services`" as canonical; two-thirds of the service layer violates it.
- **S-11 root-caused**: the "palette API is broken against local dev" is an **architecture/config gap, not a bug** — there is NO local api (`:8130`/`:3000` refused), `VITE_API_URL` is empty, so localhost:9000 hits **prod** `api.color.babb.dev`, which reflects `access-control-allow-origin: https://color.babb.dev` — the localhost origin is CORS-denied → the availability latch trips → "backend offline." The API itself is healthy (prod `/palettes` → 200).

The transposition wave should: (1) unify the api service signature onto `Services`-in (excise `Context` from the service layer), (2) introduce a thin **api-client provider** seam in the demo so transport + availability + session-token are injected not module-global, (3) close the two per-instance styling-cascade leaks (S-1, S-21) at the component root.

---

## 1. Current architecture map — the four patterns in play

### 1a. Injection-key DI (the disciplined tier) — GOOD
`demo/@/components/custom/color-picker/keys.ts:5-8` + `panes/keys.ts:13`:

| Key | Provided at | Consumers |
|---|---|---|
| `COLOR_MODEL_KEY` | `ColorPicker.vue:112`; **re-provided** `dock/layers/ActionBarLayer.vue:22` | ParseEchoReadout, ColorInput, SpectrumCanvas, HeroBlob, ComponentSliders, ColorSpaceSelector (6) |
| `CSS_COLOR_KEY` | `App.vue:147` | color-picker subtree |
| `SAFE_ACCENT_KEY` | `App.vue:150` | ColorInput, ColorSpaceSelector, ActionBarLayer |
| `EDIT_TARGET_KEY` | `App.vue:146` | edit surfaces |
| `AURORA_ATOMS_KEY` / `BLOB_CONFIG_KEY` | `useAtmosphere.ts:46,101` | AuroraPane, BlobPane, HeroBlob |
| `VIEW_MANAGER_KEY` | `App.vue:168` | view-aware panes |
| `PALETTE_MANAGER_KEY` | `usePaletteManager.ts:147` | **23 components** inject `pm` |

This is idiomatic Vue 3.5 and should be the template the leaky tiers migrate onto.

### 1b. The `pm.*` facade (the aggregate) — GOOD shape, watch the size
`usePaletteManager.ts` (153 LoC) composes **15 sub-composables** and spreads them into one object provided under `PALETTE_MANAGER_KEY`; 23 components inject it. The facade-sub-object idiom (`pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit`) keeps the 100+-member surface navigable. `PaletteManager = ReturnType<typeof usePaletteManager>` avoids a hand-mirror. The wiring (cross-module watchers) is correctly lifted to `usePaletteManagerWiring.ts`. **No god module here** (153 LoC). The one smell: the facade is provided AND returned AND its deps are threaded through `usePaletteManagerWiring` — a 3-hop bridge (App → wiring → manager) that exists only to adapt `colorPickerRef` timing (`usePaletteManagerWiring.ts:11-13`).

### 1c. Free composables (per-feature) — MOSTLY GOOD
`useAppColorModel`, `useAtmosphere`, `useImageQuantize`, `useColorModel`, etc. Colocated, single-responsibility. These are fine as free composables. The problem is what they **hard-import** (§2).

### 1d. Module singletons (the ungoverned tier) — THE LEAK
Three module-level mutable singletons with no DI seam:
- `demo/@/lib/palette/api/availability.ts:26` — `export const apiAvailability = ref(...)` + module `let unavailableSince`. Global reactive cell imported directly by `ApiOfflineChip.vue:15`, `PaletteCardMenu.vue:159`.
- `demo/@/lib/palette/api/client.ts:37` — `let sessionToken: string | null` module-scoped; `setSessionToken` mutates it. The auth token is a **hidden global**, not injected.
- `BASE_URL` (`client.ts:35`) — resolved once at module-load from `import.meta.env.VITE_API_URL`. No runtime override seam.

---

## 2. Boundary-leak inventory (evidence)

### 2a. Components reaching into raw lib/api (bypassing the `pm` facade)
CLAUDE.md sanctions "2 direct-import KEEPs." Live count is **4**:

| Site | Import | Verdict |
|---|---|---|
| `color-picker/composables/useCustomColorNames.ts:5` | `getApprovedColorNames` | sanctioned KEEP |
| `color-picker/controls/ColorInput.vue:123` | `proposeColorName` | sanctioned KEEP |
| `palette-browser/ApiOfflineChip.vue:15` | `apiAvailability` | **NEW leak** — component imports the module singleton directly |
| `palette-browser/PaletteCardMenu.vue:159` | `apiAvailability` | **NEW leak** — same |

The two `apiAvailability` imports are the availability latch consumed as a global, not injected. Root: no `useApiClient()` provider seam exists.

### 2b. Cross-feature (lateral) component imports — nested-import precept pressure
Measured `custom/<feature>` → `custom/<other-feature>` import edges (excludes shell dirs). `color-picker` is a legitimate hub (types/keys/helpers). The **questionable lateral edges**:

| Edge | Count | Note |
|---|---|---|
| `mix` → `palette-browser` | 3 | feature reaching sideways into another feature's components |
| `image-palette-extractor` → `palette-browser` | 3 | same |
| `mix` → `gradient` | 1 | |
| `generate` → `palette-browser` | 1 | |
| `palette-browser` → `image-palette-extractor` | 1 | |

`panes → *` (16 to palette-browser, 7 color-picker, 5 mix…) is EXPECTED — panes is the composition shell. The `mix`/`extractor`/`generate` → `palette-browser` edges are the real cross-feature coupling; likely shared primitives (EmptyState, PaletteColorStrip, MiniColorPicker) that should live in a neutral `palette-browser/primitives` or be lifted to a shared surface rather than deep-imported across feature roots.

### 2c. api routes → repositories — CLEAN (no leak)
`grep routes/ for services.repositories / repositories import` → **0 hits**. The route→service→repository boundary holds. Good.

### 2d. api services → Hono Context — THE LEAK (split-brain service layer)
| Tier | Signature | Files | Fns |
|---|---|---|---|
| CLEAN | `fn(services: Services, …)` | `services/palette/*` (9) | pure DI |
| LEAKY | `fn(c: Context<AppEnv>, …)` then `c.var.services` / `c.var.sessionToken` | `services/admin/*` (9), `services/color/*` (2), `services/session/auth.ts` | **30 fns** |

Evidence: `services/color/proposals.ts:31` `const sessionToken = c.var.sessionToken`; `services/admin/colors.ts:65`, `admin/palettes.ts:34,55`, `admin/users.ts:45,108,150`, `color/queries.ts:75,93,135` all `c.var.services.repositories.*`. The palette tier proves the clean shape is achievable across the whole layer. This is the single largest api transposition target — the leaky services can't be unit-tested without a mock Hono Context and are coupled to the framework at the business-logic layer.

---

## 3. DI-absent inventory — hard imports that should be injected

| Capability | Current wiring | Why it should be injected | Root |
|---|---|---|---|
| **Palette-API transport + session token** | module singletons `request`/`adminRequest` + `let sessionToken` (`client.ts:37`); auth via side-effect `setSessionToken` | token is hidden global state; no per-test/per-env client; `BASE_URL` frozen at module-load | demo |
| **Availability latch** | `apiAvailability` global ref (`availability.ts:26`) imported by 2 components + gated inside `fetchWithRateLimitRetry` (`client.ts:57`) | degraded-state is app-scoped runtime state masquerading as a module global; can't reset between tests; can't be provided a dev-local override | demo |
| **Quantize worker** | `?worker` URL import + `new QuantizeWorkerURL()` inside `useImageQuantize.ts:11-14` | worker construction is non-injectable → no fake worker in unit tests; Safari worker quirks can't be swapped; one worker-per-composable-instance not pooled | demo |
| **CSS-color resolver** | now internal to glass-ui (`deriveBlobPalette`/`oklchStopToHex` from `@mkbabb/glass-ui/color`, `useAtmosphere.ts:33`) | already producer-owned — NO demo resolver remains (the 1x1-canvas fork is gone). ✅ no action | — |
| **`VITE_API_URL` / BASE_URL** | `import.meta.env` read once (`client.ts:35`) | dev has no local api + empty env → hits prod → CORS-denied (S-11). Needs a dev-time client target seam | demo/config |

**The unifying fix**: a single `useApiClient()` composable that owns `{ request, adminRequest, sessionToken, availability, baseUrl }`, provided once at `App.vue` under an `API_CLIENT_KEY`, injected by the palette composables. This collapses the three demo module-singletons behind one DI seam without inventing a framework (idiomatic Vue provide/inject — same pattern as `COLOR_MODEL_KEY`).

---

## 4. Pipeline orchestration — color model → derived surfaces

The derive-flow is a **fan-out from one source** and is well-shaped:

```
model: shallowRef<ColorModel>            (App.vue:131)
  └─ useAppColorModel(model)             (useAppColorModel.ts)
       ├─ cssColor           ─────────────► pane props
       ├─ cssColorOpaque     ─┬───────────► provide(CSS_COLOR_KEY)      → color-picker subtree
       │                      ├───────────► useContrastSafeColor → safeAccentCss
       │                      │                └─ provide(SAFE_ACCENT_KEY) + --accent-live token (App.vue:158)
       │                      │                    └─ style.css derives --accent-view via CSS relative color
       │                      └───────────► useAtmosphere(canvas, cssColorOpaque)
       │                                       ├─ watch → auroraAtoms.seed  → useAurora (WebGL/CSS tier)
       │                                       └─ watch → blobConfig.color.paletteStops (deriveBlobPalette)
       └─ savedColorStrings ──────────────► palette manager
```

**Strengths**: ONE color-resolution path (inv-N-3); the accent axis is a single CSS-token derivation (zero JS color math downstream of `--accent-live`); atmosphere seed + blob ramp both deep-watch `cssColorOpaque` with last-good-value guards (`useAtmosphere.ts:84-95, 108-122`) so a transient un-parseable string never dead-faults the reactive effect.

**Gaps vs the S-ledger**:
- **S-18 (aurora doesn't track color / weak)**: `useAtmosphere.ts:88` writes ONLY `auroraAtoms.seed = css`. Whether H/C actually vary is entirely inside glass-ui's `deriveAurora(seed)`. The demo side is correct (seed flows); if the effect is weak/lightness-only, the root is **glass-ui producer** (`deriveAurora` / `resolveAtoms`), not the demo. The demo has no knob to force H/C spread beyond the single seed — S-18's "vary H and C across a few elements" needs either a richer atoms surface from glass-ui or the demo driving multiple derived seeds. **Root: glass-ui producer** (verify `deriveAurora` chroma/hue spread), demo may need to widen the atoms it writes.
- **S-19 (dock readout cramped)**: there are **two** live `COLOR_MODEL` instances — the pane `ColorPicker.vue:112` and the dock `ActionBarLayer.vue:22` re-provides `actionBar.colorModel` (a distinct model). The dock action-bar readout is a separate render path; its horizontal-space problem is a dock-layer layout issue, isolated from the pane picker. **Root: demo (dock layer)**.

---

## 5. api inject-services factory — the truth

`middleware/inject-services.ts` is the DI seam and it is **correct**:
- `getServices()` lazy-builds ONCE per process, caches (`cachedServices`), returns `{ collections, repositories, withTransaction }`.
- `injectServices` middleware hangs it off `c.set("services", …)`.
- `makeWithTransaction(client)` is the transactional boundary factory — clean.
- `__resetServicesForTest()` gives a test seam. Good.
- Repositories are the ONLY `db.collection()` callers (verified §2c).

The **only** api architectural defect is §2d: the service layer consumes this DI object inconsistently — half via a clean `Services` param, half by re-reaching through `c.var` after taking the whole `Context`. The factory is right; the consumers are split.

---

## 6. Target architecture sketch (idiomatic Vue 3.5 + Hono — no framework invention)

### demo
1. **`useApiClient()` + `API_CLIENT_KEY`** — one provider owning `request`, `adminRequest`, reactive `availability`, `sessionToken` (a real `ref`, not a module `let`), and `baseUrl`. Provided at `App.vue`; injected by `usePaletteStore`/`useBrowsePalettes`/`useSession`/etc. Collapses the 3 module singletons (§3) behind the SAME provide/inject seam color-state already uses. `ApiOfflineChip`/`PaletteCardMenu` inject `client.availability` instead of importing the global.
2. **Quantize worker as an injected factory** — `useImageQuantize` accepts an optional `workerFactory` (default = the `?worker` import) so tests/Safari-fallback can swap it.
3. **Lateral-import cure** — lift the 3-4 shared palette primitives (`EmptyState`, `PaletteColorStrip`, `MiniColorPicker`) that `mix`/`extractor`/`generate` reach into `palette-browser` for, into a neutral shared location, killing the cross-feature edges (§2b).
4. **Component styling self-containment (S-1/S-21)** — see §7.

### api
1. **Unify the service signature onto `Services`-in.** Every `services/{admin,color,session}/*` fn changes `fn(c: Context<AppEnv>, …)` → `fn(services: Services, actor: {sessionToken?, userSlug?}, …)`; routes pass `c.var.services` + the resolved actor. This makes the whole service layer framework-agnostic and matches the `palette/*` tier that already works. No new abstraction — it's making the leaky two-thirds look like the clean one-third.

---

## 7. S-1 / S-21 — the styling-encapsulation leak (root-routed)

S-1 says the picker-card space dropdown and the About-page space dropdown are inconsistent (About "paints the wrong face / wrong font"). **They are the SAME component** — `AboutPane.vue:10,49` imports and renders `ColorSpaceSelector.vue`. So the inconsistency is NOT two implementations; it is that `ColorSpaceSelector` is **not visually self-contained**: its trigger face deliberately inherits the ambient cascade — the code comment at `ColorSpaceSelector.vue:23-28` states the display face "rides the CardHeader's `font-display` surface + the cloned specimen-row class." In the picker card that CardHeader context exists; in the About `PaneHeader` it does not → the face renders with a different font. This is a **per-instance cascade dependency** — exactly the anti-pattern S-21 forbids. **Root: fix in the component (demo)** — make `ColorSpaceSelector` carry its own display-face typography (or take an explicit `variant`/`titlePart` prop) so it renders identically regardless of parent header context. The ledger's "restyle as pure component of the title: no bg, no pill" is then a single root-level restyle of that one component, satisfying both instances. The `— 06 / 16` counter (S-14) is `ColorSpaceSelector.vue:9` (`{{ pad(activeIndex+1) }} / {{ pad(...) }}`) — also a one-site root removal.

---

## 8. Gap table (ranked, each with migration shape + root)

| # | Sev | Gap | Evidence | Migration shape | Root |
|---|---|---|---|---|---|
| A1 | **P0** | api service layer split-brain: 30 fns take Hono `Context`, bypassing the `Services` DI contract | `services/{admin,color,session}/*`; `color/proposals.ts:31`, `admin/users.ts:108` | change signatures to `fn(services, actor, …)`; routes pass `c.var.services`+actor; mirror the `palette/*` tier | **api** |
| A2 | **P0** | S-11: no local api + empty `VITE_API_URL` → localhost hits prod → CORS-denied (`allow-origin: https://color.babb.dev`) → latch trips | curl probe §0; `client.ts:35`; `api/.env.example:14` | dev: run api via compose + set `VITE_API_URL=http://localhost:8130`, OR add localhost to a dev CORS allowlist; document the dev backend contract | **demo/config (+ api CORS)** |
| B1 | P1 | Transport + `sessionToken` + `availability` are module singletons with no DI seam | `client.ts:37`, `availability.ts:26`; direct imports `ApiOfflineChip.vue:15`, `PaletteCardMenu.vue:159` | `useApiClient()` + `API_CLIENT_KEY` provider; inject not import | **demo** |
| B2 | P1 | S-1/S-21: `ColorSpaceSelector` face depends on parent cascade (`font-display` from CardHeader) → renders differently in About vs picker | `ColorSpaceSelector.vue:23-28`; `AboutPane.vue:10` | give the component self-contained display typography or an explicit variant prop; remove per-instance cascade reliance | **demo (component root)** |
| B3 | P1 | S-18: aurora tracks color only via single `seed`; H/C spread lives in producer | `useAtmosphere.ts:88` | verify `deriveAurora` varies H+C not just L; if not, widen glass-ui atoms surface; demo may drive multi-element seeds | **glass-ui producer** (verify), demo secondary |
| C1 | P2 | Cross-feature lateral imports (`mix`/`extractor`/`generate` → `palette-browser`) | §2b (8 edges) | lift shared primitives to neutral location; kill deep cross-feature imports | **demo** |
| C2 | P2 | Quantize worker non-injectable (no test/Safari swap seam) | `useImageQuantize.ts:11-14` | optional `workerFactory` param, default = `?worker` import | **demo** |
| C3 | P2 | S-14: `— 06 / 16` counter baked into the selector eyebrow | `ColorSpaceSelector.vue:9` | remove the `pad(i)/pad(n)` fragment at the one site | **demo (component root)** |
| C4 | P2 | 3-hop palette-manager bridge (App → wiring → manager) exists only for `colorPickerRef` mount-timing | `usePaletteManagerWiring.ts:11-13,74-99` | acceptable; revisit only if the retry-loop `setTimeout(…,50)` polling (`:79,:99`) can be replaced by a ref-ready promise | **demo** |

---

## 9. Candidate wave-items (seed for the transposition wave)

1. **[api, P0]** Excise `Context` from the service layer — unify all `services/*` onto `fn(services: Services, actor, …)`. Single largest boundary win; makes business logic framework-agnostic + unit-testable. (~30 fns, mechanical.)
2. **[demo/config, P0]** Establish the dev-backend contract: local api compose + `VITE_API_URL` wiring (or dev CORS allowlist) so localhost:9000 stops silently degrading to the offline latch. Documents S-11 as a config seam, not a bug.
3. **[demo, P1]** Introduce `useApiClient()` + `API_CLIENT_KEY`; collapse `client.ts` transport, `sessionToken`, and `availability` behind it; migrate the 2 direct `apiAvailability` importers to injection. Brings the api tier onto the same DI discipline color-state already has.
4. **[demo, P1]** Make `ColorSpaceSelector` self-contained (root-level restyle per S-1: no bg/pill, own Fraunces face + caret, remove the S-14 counter) — one component fix satisfies both instances (S-21 at-the-root).
5. **[glass-ui verify, P1]** Confirm `deriveAurora` varies OKLCh H+C (not lightness-only); if not, the S-18 richness fix is producer-side.
6. **[demo, P2]** Lift shared palette primitives out of `palette-browser` to kill the 8 cross-feature import edges; add the quantize `workerFactory` seam.

---

*Lane complete. Findings are file:line-grounded and cross-referenced to S-1, S-11, S-14, S-18, S-19, S-21. Root-routing verdicts assigned per finding. No product code modified.*
