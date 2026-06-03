> **Mode: planning-only. NO code.** Post-K.W2 re-spec (2026-06-03 audit, Wave 2).
> The BINDING cross-lane corrections (Wave 3) live in
> `../audit/path-forward-2026-06-03-postW2.md §2–§3` — notably: the parseCSSColor
> typing root-fix is **value.js-owned, lands at K.W3** (value.js 0.11.0, before
> glass-ui 3.2.0); the demo `Palette` id-honesty **simplifies** to `id?:` + guards;
> all consumption is **from glass-ui 3.2.0 published dist** (mechanism-C). Cohort
> peer specs: `../coordination/cohort-glassui-3.2.0-keyframes-3.0.0.md`.


# K.W5 — modern-web parity + router, type-hardening, inv-K-5 resilience, dispatch hue-extraction

# K.W5 (re-specced) — modern-web parity + router · demo type-hardening · inv-K-5 demo-resilience · dispatch hue-extraction

**Status**: DESIGN (tranche development, planning-only — authors no code).
**Substrate**: lands on the **K.W2.5-corrected** topology (the `development` export condition deleted both repos; demo consumes glass-ui from its PUBLISHED dist; the 4 band-aids retired; plain `vue-tsc -p` typecheck; the tsconfig.lib/demo split KEPT). The original K.W1 work-order (`docs/tranches/K/design/K.W1-modern-web-router.md`) is the parent contract; this re-spec **refines** it against the W1-audit verdict, **splits** the W5 levers into keyframes-independent vs keyframes-gated, and **adds** three lanes the audit folded in (demo type-hardening at root, inv-K-5 first-class degraded state, dispatch hue-cluster extraction).

**Tranche identity**: this is a CONTINUATION OF K. K.W2.5 lands first; W5 re-specs on the clean substrate. The K.W2 dedup (inv-K-2), the tsconfig split (inv-K-1), the api-lane, dispatch hygiene, and CI/CD stand.

---

## §0 — What changed vs the K.W1 W5 work-order (verify-don't-trust deltas)

The W1 spec is mostly sound; this re-spec carries five corrections/refinements, each grounded:

1. **The vue-router 4→5 bump is keyframes-GATED, not free-standing.** K.md §3/§4/§5 explicitly pair the bump with the sibling fleet ESM-major: "`vue-router ^4.6.4 → ^5` (zero-breaking ESM bump; align with sibling `keyframes.js@5.0.7`)" (`K.md:75`). The grand-audit corrected the keyframes versioning (2.2.0 was a semver-violation → **3.0.0**). The demo consumes keyframes via `package.json:70` `@mkbabb/keyframes.js: file:../keyframes.js` and via glass-ui's `--spring-*` tokens (regenerated from keyframes' spring emitter). The router bump is an ESM-only major that should land **in lockstep with the keyframes 3.0.0 ESM-major** so the fleet flips ESM-posture once. → **§5 books router v5 behind keyframes 3.0.0.**

2. **The View-Transition lever is keyframes-INDEPENDENT and can dispatch NOW.** Lever 1 consumes glass-ui's `startViewTransition` (`glass-ui/src/composables/motion/useViewTransition.ts:78`, root-barrel re-exported) — no keyframes dependency. Its side-effect is deleting the `.pane-slide`/`.pane-left`/`.pane-right` keyframe blocks at `App.vue:244-281`, which are the **only `--spring-snappy` consumers in the pane layer** (`App.vue:245,257,271`). Deleting them via VT also removes the demo's last spring-token-CSS pane coupling — a clean win that needs no keyframes bump. → **§3 dispatches VT on the W2.5 substrate now.**

3. **`--spring-*` token authoring is keyframes-gated; W5 only DELETES spring consumers (adds none).** VAL-9 (the `spring()→LinearStop[]` emitter) was **KILLED at J** per the W1-audit (the emitter exists, glass-ui consumes it). Do NOT invent a "VAL-9 spring emitter" for keyframes 3.0.0; the K.md §7 `VAL-9 BOOKED` and L.md §10 re-bookings are STRUCK (corrections folded below). No W5 lever authors a new spring token; the VT lever removes the three `--spring-snappy` references. → no spring-token gating burden lands on W5.

4. **The `parseCSSColor` public return type is too loose at root — a 9-site cast epidemic.** `src/parsing/color.ts:614` declares the memoised parser as `(input: string): ValueUnit` — a bare `ValueUnit` with default generics. This forces 9 demo callsites to re-assert `as ValueUnit<Color<ValueUnit<number>>, "color">` (and `as any`), plus the glass-ui aurora `cssToOklch` cast (cross-repo). This is a ROOT defect in `src/`, not a demo problem; the W1 spec scoped W5 as "zero `src/` edits" (`K.W1-modern-web-router.md:531`) — that constraint is **relaxed** for this one root-fix (the audit mandates "fix at root in value.js"). → **§6 tightens the `parseCSSColor` return type at root + deletes the 9 demo casts + the glass-ui aurora cast (coordination note).**

5. **inv-K-5 is currently an e2e env-override + a CORS env-noise clause — both band-aids.** The degraded-backend path is handled by (a) `playwright.config.ts:53` `env: { VITE_API_URL: "http://localhost:8090" }` pointing the demo at the same-origin dev server, and (b) the `blocked by CORS policy` clause in `e2e/smoke/fixtures/env-noise.ts:37-48`. The audit directs: make degraded-backend a **typed first-class state** (defined empty/fallback, NO console output by design in prod+test) so the e2e needs no env override and the CORS env-noise clause DELETES. → **§7 makes degraded-backend first-class.**

6. **The dispatch hue-cluster "extraction" at K.W2e was comment-condensation gate-gaming.** Commit `5d97030` ("dispatch.ts 372→349 LoC (G3 ≤350 cap)") cleared the cap by *condensing two over-verbose tranche-archaeology comment blocks* — not by decomposing. The genuine decomposition is to extract the ~133-LoC hue cluster (`interpolateHue`/`mixColors`/`CYLINDRICAL_HUE_COMPONENT`, `dispatch.ts:217-349`) into `mix.ts` (its cohesion-honest home — `mix.ts` already imports `mixColors` FROM dispatch, a backwards dependency this inverts), restoring the deleted archaeology comments. → **§8 specs the real extraction.**

---

## §1 — The keyframes-independent / keyframes-gated split (the central re-spec axis)

Every W5 item is classified. **keyframes-independent** items dispatch on the K.W2.5 substrate immediately. **keyframes-gated** items are BOOKED behind the keyframes 3.0.0 ESM-major fleet flip.

### keyframes-INDEPENDENT (dispatch now on the W2.5 substrate)

| Lever / lane | § | glass-ui substrate consumed | Disposition |
|---|---|---|---|
| L1 View Transitions (pane morph) | §3 | `startViewTransition` (root barrel) — NOT keyframes | USE (deletes the `--spring-snappy` pane keyframes) |
| L2 `@layer` cascade order | §3 | pattern (glass-ui layers its own styles) | USE |
| L3 `@container` on component grids | §3 | pattern | USE (narrowed) |
| L4 Popover API / anchor (dock-Popover lane) | §3 | `HoverPopover` native path (root barrel) | USE (SwatchHoverMenu); dropdowns anchor-only |
| L5 `scheduler.yield()` on the one list loop | §3 | `useYieldToMain` (`/motion-core` subpath) | USE-or-REFUTE |
| L7 `content-visibility` + `decoding=async` | §3 | none (pure CSS) | USE (lazy/fetchpriority REFUTED) |
| L8 `.browserslistrc` + `light-dark()` | §3 | pattern (`tokens.css`) | USE (light-dark color-scheme caveat) |
| VIEW_MAP single-source (`componentFor` deletion) | §4 | none | USE |
| Typed routes (retire `as-string` casts) | §4 | none (hand-typed `RouteNamedMap`) | USE |
| Action-bar `Ref<any>` → typed handles | §4 | none | USE |
| Demo `Palette` discriminated union | §5 | none | USE |
| inv-K-5 first-class degraded state | §7 | none | USE |
| `parseCSSColor` root return-type tighten | §6 | none (src/ root) | USE |
| Dispatch hue-cluster → `mix.ts` extraction | §8 | none (src/ root) | USE |

### keyframes-GATED (BOOKED behind keyframes 3.0.0)

| Lever / lane | § | Why gated | Disposition |
|---|---|---|---|
| `vue-router ^4.6.4 → ^5` ESM-major bump | §5-router | Fleet ESM-major lockstep with keyframes 3.0.0 (K.md §3/§4 pairing) | BOOKED |
| Any `--spring-*` token authoring | §0.3 | keyframes owns the spring emitter; VAL-9 KILLED-at-J | N/A — W5 deletes spring consumers, authors none |

**The gating boundary is clean**: the typed-routes adoption (§4), VIEW_MAP single-source (§4), and `RouteNamedMap` augmentation are written against the **v4/v5-common API** (`createRouter`/`createWebHashHistory`/`RouteRecordRaw`/`RouteNamedMap` all survive v5). They dispatch NOW; only the `package.json` version bump + the lockfile-resolves-5.x evidence waits for the keyframes 3.0.0 flip. There is no code rewrite gated on the bump — the single-source and typed-route work is independently valuable and runs on v4.

---

## §2 — REFUTED-in-record (carried from W1, no W5 work)

- **L6 `Intl.DurationFormat`** — `dateFormat.ts:2-25` formats absolute timestamps via `toLocaleString` (already the modern `Intl.DateTimeFormat` path); `DurationFormat` is for durations, of which the demo has none. REFUTED.
- **L9 Navigation API** — gh-pages static hosting needs `createWebHashHistory` (`router/index.ts:39`). REFUTED, carried.
- **L10 `oklch()`/`color-mix()`** — already used both repos. No work.
- **`scheduler.yield()` on image-quantization** — already off-main-thread in a Web Worker (`useImageQuantize.ts:11,84`). REFUTED; the real consumer is the list loop (§3·L5).
- **`loading=lazy`/`fetchpriority`** — the demo has one `<img>` (`ImageDropZone.vue`), an above-the-fold focal element; lazy/fetchpriority are the wrong fit. REFUTED.

---

## §3 — Modern-web parity levers (keyframes-independent; dispatch now)

Each lever's consumer site + glass-ui substrate is grounded in the W1 spec §4; this re-spec restates only the deltas vs W1 and confirms each is W2.5-substrate-ready.

### L1 — View Transitions (pane/route morph) — USE

- **Consumer**: the hand-rolled `<Transition :name="transitionName" mode="out-in">` at `PaneSlot.vue:35`, driven by `transition-name` from `App.vue:40,52,67`; the keyframes are `App.vue`'s scoped `.pane-slide-*` (`:244-253`), `.pane-left-*` (`:256-267`), `.pane-right-*` (`:270-281`). The view change fires through `useViewManager.switchView` → `router.push` (`useViewManager.ts:57`).
- **Substrate**: glass-ui `startViewTransition(mutate)` + `supportsViewTransitions()` (`glass-ui/src/composables/motion/useViewTransition.ts:78,56`, root-barrel re-exported) — wraps the sync DOM mutation in `document.startViewTransition` with a ≤20-LOC instant fallback, handles PRM, returns `finished` for focus-routing. The paired CSS recipe is glass-ui's `view-transition.css`. **On the W2.5 substrate the demo consumes this from glass-ui's PUBLISHED dist** (not mid-edit source), per the consumption model.
- **Work-order**: replace the `<Transition>` in `PaneSlot.vue:35` with a `startViewTransition(() => /* route push */)` call sited in `switchView` (`useViewManager.ts:53-60`) — the route push IS the synchronous mutation. Assign `view-transition-name` on the pane wrappers in CSS, consuming glass-ui's `view-transition.css` group. **DELETE** the `.pane-slide-*`/`.pane-left-*`/`.pane-right-*` blocks (`App.vue:243-281`) — this is the only `--spring-snappy` consumer in the pane layer (`:245,257,271`). Keep the `viewManager.ready` gate (`App.vue:40`) — under VT it gates whether `switchView` wraps in `startViewTransition`.
- **Reactivity guard (K.md §6, hard)**: `startViewTransition` runs the mutation synchronously, so the model update is not deferred. The smoke-reactivity project's slider-keyboard/spectrum-drag instant-update medians MUST stay green; the VT swap must not regress them.

### L2 — `@layer` cascade order — USE

- **Consumer**: `style.css` declares only `@layer base { … }` at `:214`; no explicit ordered layer statement (the `.underline-tabs` override at `:196` and the `.dark` fork at `:179` are the specificity-war symptoms). 
- **Work-order**: add one explicit `@layer reka, tailwind-base, glass-components, tailwind-utilities, app;` at the TOP of `style.css` (K.md §6 order). Assign demo rules to `app`. This makes the `.underline-tabs` specificity hack unnecessary (it wins by layer order). No new glass-ui authoring.

### L3 — `@container` container queries — USE (narrowed)

- **Consumer**: component-local `@media` inside `PaletteCardGrid.vue` + `EditDrawer.vue` (card-grid column count should respond to its *pane* width, not the viewport). The `style.css:110/118/166` blocks are app-shell viewport breakpoints — they STAY `@media` (REFUTED for `@container`).
- **Work-order**: `container-type: inline-size` on the grid wrapper; convert component-local column-count `@media` → `@container`. W5 grep-step confirms each converted `@media` is component-local.

### L4 — Popover API / anchor positioning (the dock-Popover lane) — USE

- **Consumers** (3): `dock/menus/ProfileSection.vue` (reka DropdownMenu), `dock/menus/MobileMenuDropdown.vue`, `palette-browser/SwatchHoverMenu.vue:7-24,59` (reka Popover + hover Teleport, consumes the demo's `useHoverPopover.ts`).
- **Substrate**: glass-ui `HoverPopover` native path (`HoverPopover.vue:211,218` — `interestfor` + `popover="hint"`), root-barrel re-exported.
- **Work-order**: route `SwatchHoverMenu.vue`'s hover+touch popover through glass-ui `HoverPopover` (native opt-in where Baseline permits), retiring the local `useHoverPopover.ts` + the hand-paired reka Popover/Teleport. The dock dropdowns (`ProfileSection`/`MobileMenuDropdown`) take **anchor positioning only** — keep reka-ui's focus-trap/roving-tabindex (a `popover="hint"` is the wrong role for an interactive action menu).
- **Orthogonality (audit-mandated)**: this **dock-Popover lane stays orthogonal to the dock-Select**, which is fixed by K.W2.5 (the dedupe/dual-instance corrective). The dock-Select dual-instance hazard is GONE on the W2.5 substrate; the dock-Popover work here is the hover-hint/anchor lane and must not be conflated with it.

### L5 — `scheduler.yield()` on the one real list loop — USE-or-REFUTE

- **Consumer**: the genuine main-thread long-task is palette-list processing — the synchronous transforms over `pm.filteredSaved`/the browse list building card view-models for the `PaletteCardGrid.vue` `v-for` (fed by `useBrowsePalettes.ts`/`usePaletteManager`). W5 grep-step: identify the one synchronous O(n) main-thread loop on filter/sort change; if found → chunk with `await ctx.yield()`. If the only list work is already small/RAF-batched → REFUTE-in-record.
- **Substrate**: glass-ui `useYieldToMain()`/`yieldToMain()` (`/motion-core` subpath). On the W2.5 substrate this resolves from glass-ui's **published dist** (the subpath export), not source.

### L7 — `content-visibility` + `decoding=async` — USE (narrowed)

- **Work-order**: `content-visibility: auto` + `contain-intrinsic-size` on the `PaletteCardGrid.vue` card-grid wrapper (extends the D.W4 containment hints at `style.css:125-126`); `decoding="async"` on `ImageDropZone.vue`'s `<img>`. Refute `loading=lazy`/`fetchpriority` (no below-fold image surface).

### L8 — `.browserslistrc` + `light-dark()` — USE

- **Work-order**: add `.browserslistrc` at repo root (currently ABSENT — confirmed) mirroring glass-ui's Baseline floor (Chrome 111+ / Safari 16.2+) — this is what makes the Newly/Limited adoptions above safe with the `@supports`/feature-detect gating glass-ui already models. Collapse the `.dark { … }` re-declarations (`style.css:179-189` — `--popover`, `--border`, `--input`, `--shadow`, `--shadow-cartoon*`) into `light-dark(<light>, <dark>)` tokens in `:root`. **Caveat (verify at W5)**: `light-dark()` keys off the `color-scheme` property, while the demo toggles a `.dark` *class* via glass-ui's `dark` composable (`App.vue:105,116`). The collapse requires the dark toggle to set `color-scheme: dark` on the root — verify glass-ui's `dark` composable does (or add `color-scheme` to the `.dark` rule); if it cannot reach a token, keep the class-fork for that token only. Record the outcome (the one place this lever could partially REFUTE).

---

## §4 — Router single-source + typed routes + action-bar typing (keyframes-independent; v4/v5-common)

These dispatch on v4 NOW; only the version bump (§5) waits for keyframes 3.0.0.

### §4.1 — VIEW_MAP single-source (delete `componentFor`)

- **The divergence** (3 hand-synced tables): `VIEW_MAP` (`viewSchema.ts:83`, the canonical `Record<ViewId, PaneConfig>`); `routes` (`router/index.ts:19-36`, 14 hand-enumerated `RouteRecordRaw`s + catch-all); `componentFor` (`usePaneRouter.ts:80-94`, an if-ladder mapping slot-name → Component with the `return ColorPicker` escape hatch at `:93`).
- **Collapse**: introduce a single `PANE_COMPONENTS: Record<LeftPane | NonNullable<RightPane>, Component>` table in `usePaneRouter.ts` (the runtime/Vue surface — NOT `viewSchema.ts`, which is documented pure-data, `:11-14`), replacing the if-ladder. Exhaustive over the slot unions by type (a missing slot is a `tsc` error). The `admin-*` → `AdminPane` collapse replaces the `name.startsWith("admin-")` branch (`:92`) since the slot unions enumerate the admin slots. **DELETE `componentFor` including the `return ColorPicker` escape hatch (`:93`)** — a lookup miss becomes a type error at authoring, not a silent picker render. `desktopLeft`/`desktopRight` (`:161-173`) read `PANE_COMPONENTS[slot]` directly.
- **Derive `routes` from `VIEW_MAP` keys** (`router/index.ts:19-36`): `Object.keys(VIEW_MAP).map(...)` with a single residual `PATHS: Record<ViewId, string>` hand-table (the one non-derivable fact — the URL path, e.g. `admin-users` → `/admin/users`). The `meta.admin` flag derives from the `admin-` prefix. The catch-all redirect (`:35`) stays. `Stub` (`:17`) stays.
- **Result**: `VIEW_MAP` + the two derived `Record<…>`-exhaustive satellites (`PANE_COMPONENTS`, `PATHS`) is the single source; adding a view is one entry each, compiler-forced.

### §4.2 — Typed routes (retire the `as-string` casts)

- **The two debts** (the only two): `useViewManager.ts:44` `const name = route.name as string;` and `useViewManager.ts:73` `currentView as unknown as Ref<ViewId>`.
- **Adoption (hand-typed, no `unplugin-vue-router` — the KISS path)**: a new `demo/@/router/typed-routes.d.ts` augmenting `vue-router`'s `RouteNamedMap` keyed by `ViewId`, so `useRoute().name` narrows to `ViewId | undefined`. Both casts delete. The `isViewId` guard (`viewSchema.ts:199`) STAYS — it guards the catch-all-redirect path where `route.name` can be the fallback.
- **Dual-tsconfig interaction (K.md §6 risk)**: the augmentation lives under `demo/` and MUST be in `tsconfig.demo.json`'s `include` (the existing `include: ["demo/"]` glob carries it — no extra entry), NEVER `tsconfig.lib.json` (the library graph stays router-free, inv-K-1). On the W2.5 substrate the typecheck is plain `vue-tsc -p tsconfig.demo.json` (check-types.mjs DELETED). W5 verification: `vue-tsc` green under the split with the augmentation present; it does NOT leak into the lib emit (structural — different program).

### §4.3 — Action-bar `Ref<any>` bridge → typed handles

- **The debt**: `usePaneRouter.ts:107-109` declares `PaneActionRefs` as three `Ref<any>` (generate/gradient/mix); `App.vue:150-152` creates them as `ref<any>(null)`; `App.vue:156,163` have `(el: any)` mount params. The action bar (`usePaneRouter.ts:194-220`) calls optional methods on them.
- **Fix (structural)**: declare one handle interface per pane (the methods enumerated at `:194-220`): `GeneratePaneHandle{ regenerate(); save(); copyColors(); }`, `GradientPaneHandle{ reset(); copyCSS(); seedFromPalette(); }`, `MixPaneHandle{ clearSelection(); startMix(); copyResult(); }`. Each pane SFC exposes its handle via `defineExpose`. `PaneActionRefs` becomes `{ generate: Ref<GeneratePaneHandle | null>; … }`; `App.vue:150-152,156,163` type likewise. The `?.()` optional-call guards stay (the ref is `null` until mount); member names are now type-checked. Retires 6 `any` sites; feeds the K.md §7 demo-`as any`-floor (tsc + close-review, no `proof:*` script).

### §4.4 — Prune `goBack`/`previousView` (if zero consumers)

- `useViewManager.ts:62-70` `goBack()` + the `previousView` ref (`:48`) + the interface members (`:28,22`). W5 grep-step for callers; if zero, delete both with the interface members. If a consumer surfaces, REFUTE-in-record (KISS).

---

## §5 — Router v5 bump (keyframes-GATED) + the demo Palette discriminated union (keyframes-independent)

### §5-router — `vue-router ^4.6.4 → ^5` — BOOKED behind keyframes 3.0.0

- **Site**: `package.json:111` `"vue-router": "^4.6.4"` → `"^5"`. Zero-breaking for this demo (no `unplugin-vue-router`; `createWebHashHistory` survives v5; no deep CJS imports; no removed deprecated options).
- **Gating rationale**: K.md §3/§4 pair the bump with the sibling fleet ESM-major (`keyframes.js@5.0.7`, corrected to the **keyframes 3.0.0** ESM-major per the grand-audit). Flip the fleet ESM-posture once. The §4 single-source + typed-routes work runs on v4 NOW and is unblocked by the gate; only the version line + the lockfile-resolves-5.x evidence waits.
- **Evidence at execution**: lockfile resolves `vue-router` to `5.x`.

### §5-palette — the demo `Palette` discriminated union (keyframes-independent; dispatch now)

This is the audit's "audit ALL 11 palette.id read sites + no-legacy idiom, mirrors L brands" lane.

- **The latent crash**: `demo/@/lib/palette/utils.ts:24` `palette.id.startsWith(p)` throws if a remote `Palette` arrives with `id` undefined. `Palette.id` is REQUIRED in the current type (`types.ts:8`), but its provenance differs by origin: saved-local mints `crypto.randomUUID()` (`usePaletteStore.ts:62`); temporary mints `gen-${seed}` (`GenerateControls.vue:41,43`), `__extracted__` (`ImagePaletteExtractor.vue:132`), `mix-result*` (`MixResultDisplay.vue`); remote carries the server document id (from `request<...>` in `api/palettes.ts:51`). The remote id is a server contract the demo cannot guarantee — the `id`-required type papers over the local-vs-remote split.
- **The discriminated union (no-legacy, mirrors L brands)**: replace the flat `Palette` with a discriminated union keyed on origin:
  - `LocalPalette` — carries `tempId` (the `gen-`/`mix-`/`__extracted__`/`uuid` local key) + `isLocal: true`; the `slug` is local-minted.
  - `RemotePalette` — carries `slug` (the server identity) + `isLocal: false`; the optional server `id` lives here, never read for kind-discrimination.
  - The discriminant is `isLocal` (already present, `types.ts:17`) — no new tag field needed; the union narrows on it. `getPaletteKind` (`utils.ts:22`) discriminates on `isLocal` first (already does, `:23`), then on the `tempId` prefix for the local branch (the `startsWith` moves to `LocalPalette.tempId`, which is always a string — the crash is structurally impossible).
- **Audit ALL 11 palette.id read sites** (grounded inventory):
  1. `lib/palette/utils.ts:24` — `palette.id.startsWith(p)` → reads `LocalPalette.tempId` (the crash site; now total).
  2. `composables/palette/usePaletteStore.ts:75,88,93,119,127` — store CRUD keyed on `id` → key on the union's discriminated identity (`tempId` for local; this store holds only `isLocal` palettes per `:62-68,114`, so `tempId` is the store key).
  3. `composables/palette/usePaletteActions.ts:32,56,62,75,89,90,103` — delete/update/expand/edit/find keyed on `id` → the local-store paths key on `tempId`; the `:89-90` find-across-saved-and-remote keys on the union identity (`tempId` for saved, `slug` for remote — the lookup must accept both).
  4. `components/custom/mix/MixSourceSelector.vue:53,57,58,168,188,204,206,207,210` + `mix/composables/useMixingState.ts:56,61` — selection set keyed on `id`; mix sources can be remote → key on the union identity (slug-or-tempId), not bare `id`.
  5. `components/custom/panes/PalettesPane.vue:53,54,56,60,131,142` — `cardRefs`/expand keyed on `id` (these are saved-local) → `tempId`.
  6. `components/custom/palette-browser/AdminUsersPanel.vue:101,105` + `PaletteDialog/components/PaletteSavedTab.vue:42,44,47` — expand keyed on `id` → union identity.
  7. `components/custom/palette-browser/CurrentPaletteEditor.vue:243` — `duplicateTarget.value.id` → `tempId`.
  - The non-`Palette` `.id` reads (gradient `stop.id`, color-queue `item.id`, audit `entry.id`, tag `id`, user `slug`) are OUT of scope — they are other entities.
- **Idiom**: no backward-compat shim (`feedback_no_backwards_compat`); migrate every consumer to the union at root. The `status`/`tier`/`visibility` legacy-compat fields (`types.ts:20-26`) are an independent concern (I.W1 transition) — NOT touched here.

---

## §6 — `parseCSSColor` root return-type tightening (keyframes-independent; src/ root-fix)

The audit's "fix at root in value.js" mandate.

- **The defect**: `src/parsing/color.ts:614` types the memoised parser as `(input: string): ValueUnit` — bare `ValueUnit` with default generics. The true runtime shape is `ValueUnit<Color<ValueUnit<number>>, "color">` (a parsed color always wraps a `Color` whose channels are `ValueUnit<number>`).
- **The 9-site cast epidemic** (grounded): `useContrastSafeColor.ts:80`, `useAppColorModel.ts:53`, `useMarkdownColors.ts:24`, `index.ts` (color-picker):41, `useColorParsing.ts:31,34,88` (3 sites), `useColorModel.ts:29`, `useColorUrl.ts:36` — each re-asserts `as ValueUnit<Color<ValueUnit<number>>, "color"> | null`. Plus the `as any` sites: `useCustomColorNames.ts:34` (`parseCSSColor(entry.css)` then `colorUnit2(parsed as any, ...)`), `usePaletteManagerWiring.ts:54`, `useImageSampler.ts:47`, `lib/color-utils.ts:22` consume the loose return untyped. **Cross-repo**: the glass-ui aurora `cssToOklch` cast on `parseCSSColor`.
- **Root fix**: tighten the `parseCSSColor` return type to `ValueUnit<Color<ValueUnit<number>>, "color">` at the declaration (`color.ts:613-631`). The parser always returns a color-typed `ValueUnit` (the `Value` combinator's color branch); the memoise wrapper's signature should carry that. **Caveat to verify**: the fallback `utils.tryParse(Value, input)` path (`:628`) on parse failure — confirm it either returns the color-typed unit or throws (it throws on hard failure; the demo callers wrap in try/catch), so the non-null return type holds. The public barrel re-export (`src/index.ts:274`, `parsing/units.ts:18`) inherits the tightened type.
- **Result**: all 9 demo casts + the 4 `as any` consumers delete (the return narrows directly); the glass-ui aurora cast deletes (coordination note to glass-ui — its `cssToOklch` consumes the tightened type). This is the one `src/` edit W5 takes (the W1 "zero src/ edits" constraint is relaxed for this root-fix per the audit).
- **Memoise note**: the return is shared/memoised (`color.ts:604-607` — callers MUST NOT mutate). The type-tightening does not change the mutation contract; callers that clone (e.g. `useAppColorModel.ts`) are unaffected.

---

## §7 — inv-K-5 demo-resilience: degraded-backend as a typed first-class state (keyframes-independent)

The audit's "make degraded-backend a typed first-class state (defined empty/fallback, NO console output by design in prod+test) so the e2e needs no env override + the CORS env-noise clause DELETES."

- **Current band-aids**: (a) `playwright.config.ts:53` `env: { VITE_API_URL: "http://localhost:8090" }` — the same-origin hack that points the demo at the dev server so no production fetch fires under e2e; (b) the `blocked by CORS policy` clause in `env-noise.ts:37-48`. Both are documented as band-aids (the config comment at `playwright.config.ts:46-53` calls the env an inv-K-5 hack; the env-noise comment calls the CORS clause "a guard, not the mechanism").
- **The first-class design**: the degraded-backend path is already partially first-class — `useCustomColorNames.ts:45-50` swallows the failed read SILENTLY (the inv-K-5 comment: "must fail SILENTLY — no console output — so the e2e zero-console-errors assertion holds"). Generalize this to a **typed degraded state** across every optional-read composable:
  - Define a typed `BackendState` (e.g. `"ok" | "degraded"`) the optional-read composables expose, with a **defined empty/fallback value** as the degraded payload (custom names → the 147 built-in CSS names; remote browse → empty list with a typed `degraded` flag, not a thrown error logged to console).
  - **No console output by design in prod+test**: the optional-read failure paths (`useCustomColorNames.ts:45`, and the analogous `useBrowsePalettes.ts:58-61` which currently `console.warn`s) route to the typed degraded state, NOT `console.warn`. The browse `console.warn("Failed to load remote palettes")` at `:61` is the noise that the CORS env-noise clause was absorbing — it becomes a typed degraded transition, silent.
  - **Distinguish optional vs required reads**: this is for OPTIONAL enhancement reads (color names, remote browse) that have a defined fallback. Required user-action paths (publish/save/vote that the user explicitly triggered) keep their error surfacing — the audit's "NO console output" clause is for the *ambient/optional* reads that fire on boot, not user-initiated mutations.
- **The band-aids DELETE**:
  - `playwright.config.ts:53` `env: { VITE_API_URL: ... }` — DELETE. With degraded-state first-class, the production-default `api.color.babb.dev` fetch fails silently into the typed degraded state; no console error fires; the e2e needs no env override. (The demo's production default at `api/client.ts:28` is unchanged.)
  - `env-noise.ts:37-48` `blocked by CORS policy` clause — DELETE (the audit's "CORS env-noise clause DELETES"). The remaining `429/503/504`/`Failed to load resource` clauses are genuine rate-limiter network conditions under parallel-worker load and STAY (they are real env noise, not a band-aid).
- **e2e verification**: the 5-project smoke suite + smoke-reactivity stay green with the env override removed and the CORS clause gone — the proof that degraded-state is genuinely first-class (no console error escapes on a no-backend boot).

---

## §8 — Dispatch hue-cluster extraction to `mix.ts` (keyframes-independent; src/ root — the real decomposition)

The audit's "the real decomposition vs the comment-condensation gate-gaming."

- **What was gate-gamed**: commit `5d97030` cleared the G3 ≤350-LoC cap on `dispatch.ts` (372→349) by condensing two tranche-archaeology comment blocks (and dropping a contrast pass-through re-export), NOT by decomposing. `dispatch.ts` sits at exactly 349 LoC — one under the cap — a comment-shave, not a structural fix.
- **The genuine extraction**: move the hue cluster (`dispatch.ts:217-349`, ~133 LoC) — `CYLINDRICAL_HUE_COMPONENT` (`:221`), `HueInterpolationMethod` type (`:219`), `interpolateHue` (`:234`), `mixColors` (`:277`) — into `src/units/color/mix.ts` (its cohesion-honest home; `mix.ts` is the N-color mixing module that ALREADY imports `mixColors` FROM dispatch at `:13`, a backwards dependency this extraction INVERTS). **Restore the deleted archaeology comments** (the `--- Phase 2: Hue interpolation ---` / `--- Phase 3: Color mixing ---` lineage markers and the premultiplied-alpha spec prose) that the condensation stripped.
- **Dependency direction after the move**:
  - `mix.ts` gains the hue cluster; it imports `color2`, `Color`, `ColorSpace`, `clamp`, `lerp` from dispatch/math (forward deps — `dispatch.ts` no longer depends on `mix.ts`, breaking the current backwards import at `mix.ts:13`).
  - `dispatch.ts` shrinks to the conversion-dispatch core (`color2`, `gamutMap`, `XYZ_FUNCTIONS`, `getFormattedColorSpaceRange`) — comfortably under the cap WITH its full archaeology comments restored (the cap is met by real decomposition, not comment-shaving).
- **Repoint the 4 consumers** (grounded): `src/units/interpolate.ts:7` (`CYLINDRICAL_HUE_COMPONENT`, `interpolateHue`) → import from `mix.ts`; `src/parsing/color.ts:28` (`mixColors`) → `mix.ts`; `src/index.ts:122-124` (the public barrel re-export of `interpolateHue`/`mixColors`/`CYLINDRICAL_HUE_COMPONENT` + `:131` `HueInterpolationMethod` type) → `mix.ts`; `src/units/color/index.ts:709-711` (the color barrel re-export) → `mix.ts`. **Public surface byte-identical** — the barrel re-exports the same 4 symbols, just sourced from `mix.ts`. `mixColorsN` (`mix.ts:28`) now calls the co-located `mixColors` directly (no cross-module import).
- **Verification**: `wc -l` on both files (dispatch under cap WITH restored comments; mix.ts gains the cluster); typecheck 0; vitest green; the 4-symbol public barrel intact; no consumer rewrite beyond the import-source repoint.

---

## §9 — Invariant + cohort honoring

- **inv-K-1 (tsconfig split KEPT)**: the `RouteNamedMap` augmentation (§4.2) lives in `tsconfig.demo`, never `tsconfig.lib`; the library graph stays router-free. The §6 `parseCSSColor` + §8 dispatch root-fixes are lib-program edits under `tsconfig.lib`; they carry no demo/router dependency.
- **inv-K-2/K-3 (single core, glass-ui-first)**: every modern-web lever (§3) consumes a glass-ui helper that exists at the W2.5-published dist — none re-authors an effect. The CSS additions (`@layer`, `light-dark()`, `@container`, `content-visibility`) are demo-side cascade declarations.
- **inv-K-4 (source resolution — W2.5-corrected)**: the `development` export condition is DELETED both repos; the demo consumes glass-ui from its PUBLISHED dist (the §3 substrate — `startViewTransition`, `useYieldToMain`, `HoverPopover` — comes from dist, NOT mid-edit source). This re-spec assumes that corrected substrate; no lever here re-introduces source-consumption (which would re-open the dual-instance hazard).
- **inv-K-5 (demo-resilience)**: §7 makes degraded-backend first-class, retiring the env-override + CORS band-aids — the invariant moves from band-aid-enforced to structurally-enforced.
- **Cohort (coordination/glass-ui.md)**: §3 needs no glass-ui-side change (all substrate shipped). The two cohort touchpoints are the L2 Tabs `underline` variant + the L8 `light-dark()` `color-scheme` parity (both W3 glass-ui asks). The §6 `parseCSSColor` tightening produces ONE coordination note to glass-ui (its aurora `cssToOklch` cast deletes against the tightened type) — a consume-side simplification, not a glass-ui ask.
- **K.W3 carry (audit-folded)**: the J.W3 `PaletteDiff.vue` fired-trigger orphan is to be re-homed in K.W3 (not W5) — noted here only because the audit folds it; it is OUT of W5 scope.
- **Corrections folded**: VAL-9 spring-emitter re-bookings in K.md §7 + L.md §10 are STRUCK (VAL-9 was KILLED at J — the emitter exists, glass-ui consumes it; keyframes 3.0.0 does NOT need a new value.js spring emitter). The keyframes versioning is **3.0.0** (the grand-audit semver-violation correction), not 2.2.0.

---

## §10 — Sequencing within W5

1. **Now, on W2.5 substrate (keyframes-independent)**: §6 `parseCSSColor` root-fix → §8 dispatch hue-extraction → §4 router single-source + typed-routes + action-bar typing → §5-palette discriminated union → §3 modern-web levers (VT/`@layer`/`@container`/Popover/yield/content-visibility/browserslistrc/light-dark) → §7 inv-K-5 first-class degraded state (and the band-aid deletions).
2. **Gated on keyframes 3.0.0 flip**: §5-router `package.json` bump + lockfile-5.x evidence (the only deferred item; all its dependent code already shipped on v4).
3. **Gate before close**: the 5-project e2e + smoke-reactivity green WITHOUT the env override and WITHOUT the CORS env-noise clause (the §7 proof); typecheck 0 under the tsconfig.lib/demo split; the dispatch/mix barrel byte-identical; the demo `as any` count at-or-below its post-W5 floor (tsc + close-review, no `proof:*` script — idiom retired).


## EDIT LEDGER

- [value.js] src/parsing/color.ts:613-631 — tighten parseCSSColor memoised return type from bare `ValueUnit` to `ValueUnit<Color<ValueUnit<number>>, "color">` (root-fix for the 9-site demo cast epidemic + glass-ui aurora cast); verify the fallback tryParse path holds the non-null color-typed return (keyframes-independent)
- [value.js] src/units/color/mix.ts — receive the extracted hue cluster (CYLINDRICAL_HUE_COMPONENT, HueInterpolationMethod, interpolateHue, mixColors) from dispatch.ts:217-349; restore the deleted Phase-2/Phase-3 archaeology + premultiplied-alpha comments; mixColorsN calls co-located mixColors directly; invert the current `import { mixColors } from ./dispatch` (keyframes-independent)
- [value.js] src/units/color/dispatch.ts:217-349 — remove the hue cluster (moved to mix.ts); restore full archaeology comments now under the G3 cap by real decomposition not comment-shave; keep color2/gamutMap/XYZ_FUNCTIONS core (keyframes-independent)
- [value.js] src/units/interpolate.ts:7 — repoint CYLINDRICAL_HUE_COMPONENT + interpolateHue import from ./color/dispatch to ./color/mix (keyframes-independent)
- [value.js] src/parsing/color.ts:28 — repoint mixColors import from ../units/color/dispatch to ../units/color/mix (keyframes-independent)
- [value.js] src/index.ts:122-131 — repoint interpolateHue/mixColors/CYLINDRICAL_HUE_COMPONENT/HueInterpolationMethod barrel re-export source to ./units/color/mix; public surface byte-identical (keyframes-independent)
- [value.js] src/units/color/index.ts:709-712 — repoint the same 4 hue-cluster symbols' barrel re-export to ./mix (keyframes-independent)
- [value.js] demo/@/composables/color/useAppColorModel.ts:53 — delete the parseCSSColor `as ValueUnit<Color<ValueUnit<number>>, "color">` cast (return now narrows); also tighten the `c as any`/`color: any` debounce sites in the same file where the tightened type permits (keyframes-independent)
- [value.js] demo/@/composables/color/useContrastSafeColor.ts:80 — delete the parseCSSColor color-cast (keyframes-independent)
- [value.js] demo/@/components/custom/markdown/composables/useMarkdownColors.ts:24 — delete the parseCSSColor color-cast (keyframes-independent)
- [value.js] demo/@/components/custom/color-picker/index.ts:41 — delete the parseCSSColor color-cast (keyframes-independent)
- [value.js] demo/@/components/custom/color-picker/composables/useColorParsing.ts:31,34,88 — delete the 3 parseCSSColor color-casts (keyframes-independent)
- [value.js] demo/@/components/custom/color-picker/composables/useColorModel.ts:29 — delete the parseCSSColor color-cast (keyframes-independent)
- [value.js] demo/@/components/custom/color-picker/composables/useColorUrl.ts:36 — delete the parseCSSColor color-cast (keyframes-independent)
- [value.js] demo/@/components/custom/color-picker/composables/useCustomColorNames.ts:34 — drop the `parsed as any` now that parseCSSColor returns the color-typed unit; route the catch (:45-50) into the typed degraded BackendState (no console output) (keyframes-independent)
- [value.js] demo/@/composables/palette/usePaletteManagerWiring.ts:54 / demo/@/components/custom/image-palette-extractor/ImageEyedropper/composables/useImageSampler.ts:47 / demo/@/lib/color-utils.ts:22 — tighten the untyped parseCSSColor consumers against the new return (keyframes-independent)
- [value.js] demo/@/composables/useViewManager.ts:44 — delete `route.name as string` (typed RouteNamedMap narrows route.name to ViewId|undefined) (keyframes-independent, v4/v5-common)
- [value.js] demo/@/composables/useViewManager.ts:73 — delete `currentView as unknown as Ref<ViewId>` (computed<ViewId> already narrows) (keyframes-independent)
- [value.js] demo/@/composables/useViewManager.ts:62-70,48,22,28 — prune goBack() + previousView ref + the two ViewManager interface members IF grep finds zero consumers; else REFUTE-in-record (keyframes-independent)
- [value.js] demo/@/router/typed-routes.d.ts — NEW: augment vue-router RouteNamedMap keyed by ViewId; lives under demo/ so tsconfig.demo include carries it, never tsconfig.lib (keyframes-independent, v4/v5-common)
- [value.js] demo/@/composables/usePaneRouter.ts:80-94 — replace componentFor if-ladder with PANE_COMPONENTS: Record<LeftPane|NonNullable<RightPane>,Component>; DELETE the `return ColorPicker` escape hatch (:93); desktopLeft/desktopRight read the table directly (keyframes-independent)
- [value.js] demo/@/composables/usePaneRouter.ts:107-109 — type PaneActionRefs as Ref<GeneratePaneHandle|null>/Ref<GradientPaneHandle|null>/Ref<MixPaneHandle|null>; declare the 3 handle interfaces from the action-bar method enumeration (:194-220) (keyframes-independent)
- [value.js] demo/@/components/custom/panes/GeneratePane.vue / GradientPane.vue / MixPane.vue — defineExpose the typed handle (regenerate/save/copyColors; reset/copyCSS/seedFromPalette; clearSelection/startMix/copyResult) (keyframes-independent)
- [value.js] demo/color-picker/App.vue:150-152,156,163 — type generatePaneRef/gradientPaneRef/mixPaneRef as Ref<…Handle|null> (was ref<any>); tighten onDesktopLeftMount/onDesktopRightMount (el: any) to the handle union (keyframes-independent)
- [value.js] demo/@/router/index.ts:19-36 — derive routes from Object.keys(VIEW_MAP); add the single residual PATHS: Record<ViewId,string> hand-table for URL paths; derive meta.admin from the admin- prefix; keep Stub + catch-all redirect (keyframes-independent)
- [value.js] demo/@/composables/useViewManager.ts:53-60 — wrap the router.push in switchView with glass-ui startViewTransition (consumed from published dist); gate on viewManager.ready (keyframes-independent)
- [value.js] demo/@/components/custom/panes/PaneSlot.vue:35 — remove the hand-rolled <Transition name=… mode=out-in> (View Transitions own the morph now) (keyframes-independent)
- [value.js] demo/color-picker/App.vue:243-281 — DELETE the .pane-slide-*/.pane-left-*/.pane-right-* keyframe blocks (the only --spring-snappy pane consumers, :245,257,271); assign view-transition-name on the pane wrappers consuming glass-ui view-transition.css (keyframes-independent)
- [value.js] demo/@/styles/style.css top — add explicit `@layer reka, tailwind-base, glass-components, tailwind-utilities, app;`; assign demo rules to app; the .underline-tabs specificity hack (:196) wins by layer order (keyframes-independent)
- [value.js] demo/@/components/custom/palette-browser/PaletteCardGrid.vue + demo/@/components/custom/color-picker/editing/EditDrawer.vue — container-type: inline-size on the grid wrapper; convert component-local column @media to @container (grep-confirm component-local; viewport @media at style.css:110/118/166 STAY) (keyframes-independent)
- [value.js] demo/@/components/custom/palette-browser/SwatchHoverMenu.vue:7-24,59 — route hover+touch popover through glass-ui HoverPopover native opt-in; retire the local useHoverPopover.ts + hand-paired reka Popover/Teleport; dock ProfileSection/MobileMenuDropdown take anchor-positioning only (keep reka focus-trap) — dock-Popover lane stays orthogonal to the W2.5-fixed dock-Select (keyframes-independent)
- [value.js] demo/@/composables/palette/useBrowsePalettes.ts (the one main-thread list loop) — grep-step: chunk the synchronous O(n) palette-list transform with glass-ui useYieldToMain (/motion-core, published dist) between chunks, OR REFUTE-in-record if RAF-batched/trivial (keyframes-independent)
- [value.js] demo/@/components/custom/palette-browser/PaletteCardGrid.vue — content-visibility: auto + contain-intrinsic-size on the card-grid wrapper (extends D.W4 hints at style.css:125-126) (keyframes-independent)
- [value.js] demo/@/components/custom/image-palette-extractor/ImageDropZone.vue — add decoding="async" on the one <img> (lazy/fetchpriority REFUTED) (keyframes-independent)
- [value.js] .browserslistrc — NEW at repo root: mirror glass-ui Baseline floor (Chrome 111+ / Safari 16.2+) (keyframes-independent)
- [value.js] demo/@/styles/style.css:179-189 — collapse the .dark token re-declarations (--popover/--border/--input/--shadow/--shadow-cartoon*) into light-dark() tokens in :root; verify glass-ui dark composable sets color-scheme: dark (or add it to .dark); keep class-fork for any token light-dark cannot reach (keyframes-independent)
- [value.js] demo/@/lib/palette/types.ts:7-34 — replace flat Palette with discriminated union LocalPalette{tempId; isLocal:true} | RemotePalette{slug; isLocal:false; id?}; discriminant is isLocal; no-legacy (no shim) (keyframes-independent)
- [value.js] demo/@/lib/palette/utils.ts:22-26 — getPaletteKind discriminates on isLocal then LocalPalette.tempId.startsWith (the crash at :24 becomes structurally impossible — tempId always a string) (keyframes-independent)
- [value.js] demo/@/composables/palette/usePaletteStore.ts:62,75,88,93,114,119,127 + usePaletteActions.ts:32,56,62,75,89,90,103 + components/custom/mix/MixSourceSelector.vue + mix/composables/useMixingState.ts + panes/PalettesPane.vue + palette-browser/AdminUsersPanel.vue + PaletteDialog/components/PaletteSavedTab.vue + CurrentPaletteEditor.vue:243 — migrate all 11 palette.id read sites to the union identity (tempId for local, slug for remote); audit each per §5-palette inventory (keyframes-independent)
- [value.js] demo/@/composables/palette/useBrowsePalettes.ts:58-61 + useCustomColorNames.ts:45-50 — route optional-read failures into a typed BackendState ("ok"|"degraded") with defined empty/fallback payload; NO console.warn (silent by design, prod+test); keep error-surfacing on user-initiated mutations (publish/save/vote) (keyframes-independent)
- [value.js] playwright.config.ts:53 — DELETE the inv-K-5 `env: { VITE_API_URL: "http://localhost:8090" }` same-origin hack (degraded-state first-class makes the production-default fetch fail silently) (keyframes-independent)
- [value.js] e2e/smoke/fixtures/env-noise.ts:37-48 — DELETE the `blocked by CORS policy` clause; keep the 429/503/504/Failed-to-load-resource rate-limiter clauses (keyframes-independent)
- [value.js] package.json:111 — `vue-router ^4.6.4 → ^5` ESM-major bump; lockfile resolves 5.x [KEYFRAMES-GATED behind keyframes 3.0.0 fleet ESM flip; all dependent §4 code ships on v4 first]
- [value.js] docs/tranches/K/K.md §7 + (successor) docs/tranches/L/L.md §10 — STRIKE the VAL-9 spring-emitter re-bookings (VAL-9 KILLED at J; keyframes 3.0.0 needs no new value.js spring emitter); correct keyframes version reference to 3.0.0 (doc-only)
- [glass-ui] (coordination note, not a value.js edit) aurora cssToOklch — delete the cast on parseCSSColor against value.js's tightened color-typed return (consume-side simplification once §6 lands)


## GATES

- typecheck 0 under the KEPT tsconfig.lib/demo split via plain vue-tsc -p (check-types.mjs DELETED at W2.5); the RouteNamedMap augmentation present in tsconfig.demo, absent from tsconfig.lib emit
- vitest green; the dispatch/mix hue-cluster public barrel byte-identical (4 symbols: interpolateHue, mixColors, CYLINDRICAL_HUE_COMPONENT, HueInterpolationMethod) sourced from mix.ts; wc -l dispatch.ts under the G3 ≤350 cap WITH restored archaeology comments (real decomposition, not comment-shave)
- the 9 demo parseCSSColor casts + the 4 untyped `as any` consumers deleted (parseCSSColor returns ValueUnit<Color<ValueUnit<number>>,"color"> at root); the demo `as any` count at-or-below its post-W5 floor (tsc + close-review, NO proof:* script)
- componentFor deleted (incl. the `return ColorPicker` escape hatch); routes derived from VIEW_MAP keys (PATHS residual); PANE_COMPONENTS exhaustive over the slot unions (a missing slot is a tsc error); route.name as-string + as-unknown-as casts gone (typed routes); the action-bar Ref<any> bridge typed (6 any sites retired)
- pane switching uses glass-ui startViewTransition (consumed from published dist); the .pane-slide/.pane-left/.pane-right keyframes (App.vue:243-281, the --spring-snappy consumers) deleted; @layer order declared; @container replaces component-local @media (viewport @media stays); light-dark() collapses the .dark fork (color-scheme caveat recorded); .browserslistrc present
- the demo Palette discriminated union (LocalPalette{tempId} | RemotePalette{slug}) lands; all 11 palette.id read sites migrated; the utils.ts:24 latent crash structurally impossible (LocalPalette.tempId always a string); no-legacy (no shim)
- inv-K-5 first-class: the 5-project e2e + smoke-reactivity stay green WITH the playwright.config VITE_API_URL env-override DELETED and the CORS env-noise clause DELETED (proof the degraded-backend state is genuinely first-class — no console error escapes a no-backend boot; optional reads silent by design, user-mutations still surface)
- the View-Transition swap does not regress the smoke-reactivity slider-keyboard/spectrum-drag instant-update medians (synchronous mutation, K.md §6 hard guard)
- [KEYFRAMES-GATED] vue-router lockfile resolves 5.x — verified only after the keyframes 3.0.0 fleet ESM flip; the §4 single-source/typed-routes code is green on v4 independently before the bump


## DEPENDENCIES

- K.W2.5 (the corrective lane) MUST land first: the development export condition deleted both repos; glass-ui gate green; demo consumes glass-ui DIST (single externalized vue/reka instance); the 4 band-aids retired; plain vue-tsc -p typecheck (check-types.mjs deleted); tsconfig.lib/demo split KEPT; reka-ui refreshed to ^2.9 + lockfile guard; dev.sh SIBLING_WATCH_BUILDS=(../glass-ui) populated
- glass-ui published dist at the W2.5 pin must ship startViewTransition + supportsViewTransitions (root barrel), useYieldToMain (/motion-core subpath), HoverPopover native path (root barrel), view-transition.css, and the dark composable's color-scheme behavior — all verified present at HEAD 756acc/@3.1.1; consumed from DIST not source (the K.W3 primitive-lift consumption model: glass-ui-author → publish-3.2.0 → value.js-consume-from-dist)
- keyframes 3.0.0 ESM-major (the corrected version; was 2.2.0 semver-violation) — GATES ONLY the §5-router vue-router 4→5 bump (fleet ESM lockstep, K.md §3/§4 pairing); every other W5 lane is keyframes-independent and dispatches on the W2.5 substrate now
- §6 parseCSSColor root-fix is a prerequisite for the 9 demo cast deletions + the glass-ui aurora cast deletion (cross-repo coordination note); it is the one src/ edit W5 takes (W1 zero-src/ constraint relaxed per the audit)
- §5-palette discriminated union depends on no other lane but blocks the 11 palette.id read-site migrations; §7 inv-K-5 first-class state must land before the playwright env-override + CORS env-noise deletions (else the e2e regresses)
- K.W3 owns the J.W3 PaletteDiff.vue fired-trigger orphan re-home + the Tabs underline variant + the light-dark color-scheme glass-ui asks — NOT W5 (noted as cohort touchpoints only)