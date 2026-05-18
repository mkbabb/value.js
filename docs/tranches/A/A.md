# A — Consumer un-break + frontend design-resilience audit

**Tranche letter**: A (value.js repo; first tranche authored in this repo).
**Successor to**: none. value.js HEAD `70e61e9` on branch `w.w2.1-value-js-prebuild`.
**glass-ui peer tranche**: Q (in flight; glass-ui HEAD `95098d1`). keyframes.js peer state: HEAD `8d824ee`. See `coordination/Q.md`.
**Cohort identity**: restore the value.js demo to a working boot; close the styling-resilience, design-token, interactive-state, component-structure, accessibility, and animation fractures the audit surfaced; move the demo onto glass-ui as its single design system; hand glass-ui the blob, aurora, and primitive gaps the migration exposes.
**Mode**: planning-only at this open per user directive ("This is tranche development only in this session."). Plan hardened 2026-05-18 by a 6-lane audit (`audit/HARDEN-1..6`); wave-set augmented from 6 waves to 8.
**Open**: 2026-05-18.

## §1 — Thesis

The user opened A on a regression report: dropdowns, animations, and core features "broken", with a pasted `stops.length` stack. The five-angle audit (`research/Aa..Ae`) plus the six-lane hardening pass (`audit/HARDEN-1..6`) attribute the breakage and show it is the visible tip of one structural fact: value.js consumes glass-ui across a `file:` link with no verification gate, so a glass-ui API rename, a sibling package's artefact retirement, and a stale component prop all reached the working tree without a single red signal.

The crash is three fatal faults stacked on one consumer:

- A-key-1 — `vite.config.ts:30` hard-aliases `@mkbabb/keyframes.js` to a `dist/keyframes.js` that keyframes.js's AD.W4 wave deleted. The dev server fails Vite import-analysis. keyframes.js HEAD `8d824ee` already carries the `development` export condition, so the keyframes.js side is fixed; A.W0 needs only to retire the value.js alias and add a mode-scoped `resolve.conditions`.
- A-key-2 — `App.vue:321-334` builds `auroraConfig` against the retired `useAuroraBlobs`/`AuroraBlobsConfig` schema. `useAurora` throws in `flattenPalette(cfg.palette=undefined)`. The throw propagates from `App.vue`'s `setup` and tears down the App component subtree mid-mount (`audit/HARDEN-2 §1` corrects the earlier "amputated hook tail" description). This is the user's pasted stack.
- A-key-3 — `useMetaballRenderer.ts:178-179` dereferences `canvasRef.value!` in an RAF frame that outran `destroy()`.

Plus one cosmetic regression, A-key-4: the stale `<Card variant="pane">` at 11 sites, which `Card` silently swallows into a hard black drop-shadow.

A's remediation does not add machinery. Every fix deletes a fossil that fights an existing mechanism: a hard alias that shadows working conditional exports, an Aurora config object three schema-versions stale, a `variant` prop the component never had. The audit's wider findings follow the same shape — the demo opts out of glass-ui's token system and rebuilds surfaces, shadows, type scales, and overlay conventions by hand, then drifts. A moves the demo onto glass-ui and deletes the hand-built duplicates.

Attribution correction handed to glass-ui Q: Q's `findings.md` concluded the consumer breakage "is NOT a glass-ui substrate regression" because Q's Playwright probe ran against glass-ui's own demo. The first live probe of value.js's demo (this tranche, `research/screenshots/`) found A-key-2, a mount-fatal crash absent from Q's ledger. Q's conclusion holds — A-key-2 is a consumer-side un-migrated integration — but the user's crash is A-key-2, and A owns it. `coordination/Q.md §4` carries the correction.

## §2 — Binding invariants

value.js's first tranche. A reads `docs/precepts/instructions/` and adopts five invariants; the precept zero-deferral discipline (glass-ui invariant 28) is adopted as A5. The precept submodule is registered at A.W0 (`coordination/Q.md §6`); these invariants are value.js-A-local until then.

1. glass-ui-first consumption. Demo styling and components consume glass-ui tokens, surface classes, and primitives. The demo does not rebuild a surface, shadow, type rung, radius, or overlay that glass-ui ships. A local primitive is permitted only with a filed glass-ui gap (`coordination/Q.md §3`) or a value.js-specific rationale recorded in the wave spec.
2. Consumer-resolution integrity. No `package.json` or Vite config in value.js carries a hard `dist/` alias to a sibling `@mkbabb/*` package. Sibling packages resolve through conditional exports with a mode-scoped `resolve.conditions` — `development` for dev and demo builds, never the `production` library build (`audit/HARDEN-2 §3`). Mirrors glass-ui Q invariant 30.
3. Runtime-evidence gate. A wave that changes the demo closes on a Playwright probe — at minimum 3 viewports (375×667, 1280×800, 1440×900), zero uncaught console errors, and zero non-2xx same-origin asset responses — not on source grep. A grep result is a necessary check, never the load-bearing gate (`audit/HARDEN-3`, `HARDEN-6`).
4. Root-level restyle. A reusable component is restyled at its root — a glass-ui variant, prop, or token — never by ad-hoc per-instance class overrides. Because `demo/@/components/ui/*` are one-line re-exports of `@mkbabb/glass-ui`, a root fix is a glass-ui change; A files it as a coordination item, not a `ui/`-directory edit.
5. Zero deferral at close. Every finding in `research/Aa..Ae` lands in A, retires with recorded rationale, or has a named cross-repo destination in `coordination/Q.md`. "Deferred to a later tranche" without a destination is not a close-state.

## §3 — Wave schedule (8 waves)

The hardening pass augmented the schedule from 6 waves to 8: it split the former W5 (which illegally combined an open cross-repo dependency with the close ceremony, `audit/HARDEN-4`) and added W5 for accessibility, animation, and e2e scope the five-angle audit never covered (`audit/HARDEN-5`).

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| W0 HEADLINE | open | Consumer un-break + repo hygiene — keyframes alias retire + mode-scoped `resolve.conditions` + Aurora boot fix + GooBlob null-guard + `gh-pages` clobber fix + `dist/` clear + `vue-tsc` install + `server.fs` font fix + precepts submodule register + branch fast-forward | cold-start Playwright boot ×3 viewports, zero console errors, zero non-2xx assets; `npm run build` clean with `dist/` library-only; observed `vue-tsc` run |
| W1 | W0 close + glass-ui Q.W2 | Card surface + real-bug sweep — `<Card variant="pane">`→`tier` (10 wash panes batched, `ColorPicker.vue` resting-plate separate); undefined-class bugs; `ColorInput` radius bug | the 11 Card sites render their intended surface; 3 undefined classes resolve; Playwright re-probe shows no black-shadow regression |
| W2 | W1 close | Style co-location + resilience — dock `calc()` chain de-tangle + z-tier; unscoped-style leak split + `style.css` extraction; deprecated-CSS retire; non-idiomatic-usage + fragile-rule sweep (`@theme`/`@layer` included) | `style.css` holds only global concerns; no unscoped component selectors; dock position stable across breakpoints; the 11 prior-unassigned findings landed |
| W3 | W2 close | Design tokens + hierarchy — shadow-language consolidation; radius semantic aliases; φ type-scale adoption; hierarchy repair; `@apply` consolidation; duplicated-component normalization; admin-list restructure; `.dark` token-pair coverage | one shadow language, runtime-probed; one radius vocabulary; demo type roles on the φ scale; admin lists read as structured items |
| W4 | W3 close | Interactive states + structure — four-state button completion (full control list); overlay-surface convention; ad-hoc-override retirement; `Dock.vue`/`App.vue` decomposition with a behavioral gate; `<PaneSlot>` flatten; `ConfigSliderPane` dedup | every interactive control has 4 states; one overlay convention; `Dock.vue` ≤ ~120 lines; the 5 `DockLayer`s walk green post-decomposition |
| W5 | W4 close | Accessibility + animation + e2e integrity — ARIA/focus-trap/focus-visible/contrast/reduced-motion sweep; animation correctness (`animations.css`, scoped keyframes, scroll-driven, RAF); e2e suite green against the new DOM; dark-mode re-probe | a11y sweep clean; animations render correctly across the demo; `npm run test:e2e` green |
| W6 | W5 close + glass-ui blob/aurora API | Blob/aurora idiomatic abstraction (conditional) — consume glass-ui blob `positionSource` and delete `useMetaballRenderer` duplication; Aurora `deriveAuroraPalette`; `WatercolorDot`→glass-ui `BlobDot`; adopt glass-ui `./configurator` for the config panes | the duplication is deleted (deletion proof) or, if glass-ui declines, the dependency routes to a named successor and the wave re-scopes |
| W7 HEADLINE close | W6 close/re-scope | Strengthened close — read-only close audit (plan-vs-actual, substrate-without-consumer, doc-drift, idiomatic-gestalt, performance, visual-runtime, integrity sweep); Playwright re-probe; `FINAL.md` | every finding dispositioned; the close audit returns clean; `FINAL.md` cites every commit and artefact |

Critical path: W0 → W1 → W2 → W3 → W4 → W5 → W6 → W7, linear. Cross-repo gates are W1 (depends on glass-ui Q.W2 `Card` fail-explicit) and W6 (depends on glass-ui shipping the `coordination/Q.md §3` extension set). W2, W3, W4, W5 have no cross-repo gate and proceed on their predecessor's close regardless of glass-ui Q's progress (`audit/HARDEN-1 §5`).

## §4 — Phases and wave specs

Each wave has a spec under `waves/`. W0 is closed-form — the faults are reproduced, not designed. W1–W5 draw their scope from `research/Aa..Ae`, the challenge pass `research/A-challenge.md`, and the hardening audits `audit/HARDEN-1..6`. W6 is conditional on a glass-ui dependency. W7 is the close.

- `waves/W0.md` — consumer un-break + repo hygiene.
- `waves/W1.md` — Card surface + real-bug sweep.
- `waves/W2.md` — style co-location + resilience.
- `waves/W3.md` — design tokens + hierarchy.
- `waves/W4.md` — interactive states + structure.
- `waves/W5.md` — accessibility + animation + e2e integrity.
- `waves/W6.md` — blob/aurora idiomatic abstraction (conditional).
- `waves/W7.md` — strengthened close.

## §5 — Critical files and ownership

| Surface | Files | Owning wave |
|---|---|---|
| Consumer resolution | `vite.config.ts`, `package.json`, `.gitmodules` + `docs/precepts` registration | W0 |
| Aurora integration | `demo/color-picker/App.vue`, `demo/@/components/custom/panes/AuroraPane.vue` | W0 (boot fix), W6 (idiomatic abstraction) |
| GooBlob | `demo/@/components/custom/goo-blob/**` | W0 (null-guard), W6 (consume glass-ui blob) |
| Card consumers | 11 SFCs passing `<Card variant="pane">` | W1 |
| Global stylesheet | `demo/@/styles/style.css`, `animations.css`, `utils.css` | W2, W3, W5 (animations) |
| Dock | `demo/@/components/custom/dock/**` | W2 (calc chain), W4 (decomposition) |
| Panes | `demo/@/components/custom/panes/**` | W3 (admin lists), W4 (`<PaneSlot>`, `ConfigSliderPane`) |
| Overlays | dialog/popover/hover-card consumers | W4 |
| Accessibility / animation | demo-wide | W5 |
| e2e suite | `e2e/**`, `playwright.config.ts` | W5 |

Out of A's bounds: the value.js library (`src/` — parsing, color, units, transform) has no part in the regression and no audit mandate. The `api/` directory (Hono + MongoDB) is a backend surface unrelated to the frontend regression and is not audited. The `demo/hero-lab/` second demo consumes the same glass-ui `Card`/`Badge`/`Tabs` and the same keyframes.js resolution path; A.W0's `vite.config.ts` resolution fix covers all build modes including `hero-lab`, so hero-lab's boot is repaired as a side effect, but a hero-lab design audit is explicitly out of scope for A and routes to a named successor (value.js tranche B). This decision is recorded here per `audit/HARDEN-5`.

glass-ui-side surfaces — the `Card` fail-explicit, the `SelectTrigger`/`TooltipContent`/`DockSelectTrigger` variants, the metaballs/aurora API, `BlobDot` — are owned by glass-ui's tranche. A files them in `coordination/Q.md §3` and consumes the result.

## §6 — Hard gates

- W0 — cold-start `npm run dev` boots with no Vite resolution overlay; Playwright probe at 375×667 / 1280×800 / 1440×900 shows the full App tree (dock, panes, an opened color-space dropdown) with zero uncaught console errors and zero non-2xx same-origin asset responses; `dist/` is cleared then `npm run build` exits clean and `dist/` holds library artefacts only; `npm run gh-pages` writes `dist/gh-pages/`; `vue-tsc --noEmit` is a committed devDependency and runs observed-clean over the changed surface; `npm test` stays green. The hardened gate detail is in `waves/W0.md`.
- W1–W5 — each wave closes on its row in §3 plus a Playwright re-probe (3 viewports, light and dark) showing no regression against the prior baseline, and a `vue-tsc` + `npm test` pass. Design outcomes (one shadow language, the φ scale, four-state controls) are verified by the runtime probe, not by grep alone.
- W6 — `useMetaballRenderer.ts` and the demo metaball shader are deleted (deletion proof) and the demo blob/atmosphere consume `@mkbabb/glass-ui`; or, if glass-ui declines the API, the wave re-scopes per `waves/W6.md` and the duplication's named successor is recorded.
- W7 — the read-only close audit returns clean; the integrity sweep shows zero unauthorized agent git mutations; `FINAL.md` cites every commit and the Playwright re-probe artefact.

No gate closes on "the API exists" or "grep found the string."

## §7 — Cross-tranche debt

A inherits five items from glass-ui Q's `coordination/CONSTELLATION.md` that land in value.js: Q-break-2 (the alias), Q-break-3 (the `gh-pages` clobber), Q-break-5 (`resolve.conditions`), Q-card-1 (the 11 Card sites), Q-chron-1 (the WIP-vs-master question). A owns the value.js write for each; W0 absorbs the three resolution items and the branch decision, W1 absorbs the Card migration.

The de-duplication is not complete on A's side alone. glass-ui Q's wave specs still carry Q.W1 Lane C ("value.js un-break") and Q.W2 Lane B ("value.js Card migration") — direct value.js writes that duplicate A.W0 and A.W1 (`audit/HARDEN-1 §1`). Closing the boundary requires those two lanes to be deleted from Q's plan, which is a write in glass-ui's repo that A cannot perform. A files the request through `coordination/Q.md §1`; until Q's orchestrator acts, the boundary is contested on paper and the merged sequencing in `coordination/Q.md §5` is the protocol that prevents a double-write.

A hands glass-ui a gap list — the metaballs/aurora API extensions, the `BlobDot` primitive, the `SelectTrigger`/`TooltipContent`/`DockSelectTrigger` variants, the `Button size="icon-sm"` rung, the `Card` fail-explicit, the Tabs `underline` variant. These are catalogued in `coordination/Q.md §3` with a named destination. A cross-repo handoff with a named destination is a valid close-state under invariant A5.

## §8 — Finding disposition (zero deferral)

Every `research/Aa..Ae` finding is assigned. The hardening pass (`audit/HARDEN-3`) found 12 findings the 6-wave plan left unassigned — Ab-1 through Ab-7, Ab-16 through Ab-19, and Ag-6. The augmented schedule routes them: the Ab Category-1 non-idiomatic-usage findings (Ab-1..7) and the Ab fragile-rule findings (Ab-16..19) land in W2's added fourth lane; Ag-6 (the dead `--glass-opacity-subtle` override) lands in W3. With the augmentation, the assignment is complete — `audit/HARDEN-3 §7` and `waves/W2.md`/`W3.md` carry the per-finding table.

`research/Ag` holds 13 findings (Ag-1..Ag-13), not 14; the count is corrected here and in `PROGRESS.md`.

The glass-ui-side audit recommendations are not value.js work and are not A deferrals; they are coordination items in `coordination/Q.md §3`. `audit/HARDEN-4` struck one (Ae-15 — the demo's `@components/ui/select` already re-exports the full glass-ui `Select`; the "falls back to raw reka-ui" claim was false) and re-framed another (the config-pane gap is non-adoption of glass-ui's existing `./configurator`, not a missing primitive).

## §9 — Cross-repo dependency (W6)

W6's blob and aurora abstraction depends on glass-ui adding API surface — a metaballs `positionSource` hook, pointer input, per-blob opacity, Aurora `deriveAuroraPalette` — that is not in glass-ui Q's current wave plan. This is a cross-repo dependency, not a brittleness window: A.W6 breaks no tree and suspends no gate. W6 is sequenced last among the implementation waves and is conditional:

```yaml
breaking_changes_during_wave: no
suspended_gates: none
cross_repo_dependency: glass-ui metaballs positionSource hook + pointer input
                       + per-blob opacity + Aurora deriveAuroraPalette
blocks: A.W6 only
fallback: if glass-ui ships the API, W6 proceeds and deletes the duplication;
          if glass-ui declines or defers, W6 re-scopes to the demo-side guard
          (A-key-3 already landed at W0) and the abstraction routes to a named
          successor — a glass-ui successor tranche plus value.js tranche B.
```

W0–W5 do not depend on it and close independently. W7 (the close) opens only after W6 has either landed or re-scoped, so the close ceremony never runs over an open dependency (`audit/HARDEN-4`, `audit/HARDEN-6`). A named cross-repo destination is an explicit close-state under invariant A5.

## §10 — Authority

Plan substrate at A open, hardened: this file + `findings.md` + `research/Aa-runtime-keystone.md` (= angle α) + `research/Ab-styling-resilience.md` (β) + `research/Ag-design-tokens-hierarchy.md` (γ) + `research/Ad-interactive-states.md` (δ) + `research/Ae-structure-blob-aurora.md` (ε) + `research/A-challenge.md` + `research/screenshots/` (3 Playwright captures) + `audit/HARDEN-1..6` (the hardening pass) + `coordination/Q.md` + `dispatch/AGENT.md` + `waves/W0..W7.md` + `PROGRESS.md`.

Research-file legend: the five angles map to the Greek sequence α β γ δ ε, transliterated `a b g d e` — `Aa`=α runtime, `Ab`=β styling-resilience, `Ag`=γ tokens, `Ad`=δ interactive-states, `Ae`=ε structure. There is no `Ac`/`Af`; the sequence is contiguous in Greek.

## §11 — Revision history

- 2026-05-18 — A opened. Five-angle research wave + Playwright probe + challenge pass + plan synthesis. Mode: planning-only. 6 waves.
- 2026-05-18 — Plan hardened. 6-lane audit (`audit/HARDEN-1..6`): de-dup boundary, W0 keystone, design waves, W4-W6, coverage gaps, methodology. Wave-set augmented 6 → 8 (W5 split into W5 close-safe + W6 conditional; new W5 absorbs accessibility/animation/e2e). 12 prior-unassigned findings routed. `coordination/Q.md` hardened with the gate-handoff protocol. W0 corrected (line numbers, cascade description, `vue-tsc`/`dist`/`server.fs`/precepts-register additions).
