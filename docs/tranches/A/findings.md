# A — Findings

**Tranche letter**: A (value.js repo; first tranche authored here).
**Date opened**: 2026-05-18.
**Repo HEAD at open**: `70e61e9` on branch `w.w2.1-value-js-prebuild`.
**glass-ui peer tranche**: Q (in flight; glass-ui HEAD `d244dd5`). See `coordination/Q.md`.
**Mode**: tranche development only. No source edits this session per user directive ("This is tranche development only in this session.").

## §1 — Verbatim user directive

The user opened A on a functional-regression report. Quoted intake:

> Recently, a series of changes were made to this core app and glass-ui that has broken many dropdowns, animations, and core features.
>
> ```
> [Error] TypeError: undefined is not an object (evaluating 'stops.length')
>     logError (chunk-YBQ6UP62.js:2593)
>     handleError (chunk-YBQ6UP62.js:2580)
>     callWithErrorHandling (chunk-YBQ6UP62.js:2526)
>     callWithAsyncErrorHandling (chunk-YBQ6UP62.js:2531)
>     (anonymous function) (chunk-YBQ6UP62.js:5408)
>     flushPostFlushCbs (chunk-YBQ6UP62.js:2709)
>     render2 (chunk-YBQ6UP62.js:9110)
>     mount (chunk-YBQ6UP62.js:6553)
> [Error] Failed to load resource: the server responded with a status of 403 (Forbidden) (fira-code-latin.woff2)
> ```

Plus, mid-session: "the panels seem to be broken largely, and the dock is broken as well."

The directive bundles a value.js-focused design and functionality audit under glass-ui's tranche methodology. Quoted scope, condensed to its mandates:

1. Audit the frontend for **styling quality and resilience** — (1) non-idiomatic Tailwind / non-idiomatic glass-ui usage; (2) monolithic/global stylesheet patterns that should be colocated or component-scoped; (3) deprecated/archaic CSS; (4) fragile rules (magic numbers, brittle `calc()/min()/max()` chains, viewport-unit traps, z-index coupling, browser-specific breakage).
2. A **design audit** — consistent, coherent, idiomatic design language with proper tokens (Tailwind utilities and plugins); `@apply` for custom styling; audit font sizes, border radii, box shadows in cards, hover states, pop-ups.
3. Every button has **four-state actions**: hovered, toggled, disabled, standard.
4. Audit **modals, dropdowns, pop-ups, hover-over elements** for styling consistency, state handling, visual hierarchy; clear affordances and feedback.
5. **Duplicated components** consistently styled — reused tabs headers/items, dropdown navs and items.
6. **Golden-ratio-backed hierarchies** for fonts, cards, visual elements; abrogate spreadsheet-like lists in favor of structured, content-rich approaches.
7. Favor **colocation + idiomatic Tailwind `@apply` and plugin usage**.
8. **Root-level component restyling** — reusable core components (shadcn, reka) edited at their roots, not with ad-hoc styles.
9. Use **glass-ui for all styling and component usage when possible** — cards, typography, z-index tiering, radii, tokens.
10. **Flatten** unnecessarily complex or overly-deep components (HTML, Vue).
11. Skip duplicates; avoid generic advice.
12. Identify **gaps in value.js AND glass-ui** for better cohesion, coverage, design affordance.
13. **Playwright** validation of user and admin flows; idiomatic usage of glass-ui's **blob system** and **aurora system** — what gaps exist, how to abstract onto them.

A follow-up clarified scope twice: the tranche is authored in value.js as **tranche A** (not glass-ui); glass-ui fixes are still designed idiomatically at the root and coordinated with glass-ui's in-flight tranche; and this session is **tranche development only** — no implementation.

## §2 — Runtime evidence (Playwright, 2026-05-18)

The directive's "validate user and admin flows with Playwright" could not run as a flow sweep: the demo does not boot far enough to drive a flow. The probe instead became the primary diagnostic. Three captures in `research/screenshots/`:

- `A-crash-default-partial-render.png` — cold dev boot, ~980px viewport. The app partials-renders: color-picker card, sliders, and the color-space panel paint, but the dock is reduced to a bare "Home" pill, the Aurora atmosphere is absent, the color-space `Select` trigger shows a chevron with no label, and the picker card carries a hard black drop-shadow.
- `A-crash-1440-hmr-collapse.png` — after a viewport resize triggered an HMR cycle, the page collapses to a flat pink fill. The HMR reload failed (`[vite] Failed to reload /App.vue`) and left the DOM in a `NotFoundError: insertBefore` state.
- `A-crash-375-vite-resolution-overlay.png` — on a clean dev-server restart, the boot fails outright with a Vite overlay: `[plugin:vite:import-analysis] Failed to resolve import "@mkbabb/keyframes.js" from "../glass-ui/src/composables/motion/useSpringOrchestrator.ts". Does the file exist?`

Console (verbatim, deduplicated):

```
TypeError: Cannot read properties of undefined (reading 'length')
    at flattenPalette (glass-ui/.../aurora/composables/color.ts:67:28)
    at setConfig (glass-ui/.../aurora/composables/runtime.ts:180:5)
    at createAurora (glass-ui/.../aurora/composables/runtime.ts:249:3)
    at useAurora.ts:16:14  → App <mounted> hook
Failed to load resource: 404  @ keyframes.js/dist/keyframes.js
Failed to load resource: 403  @ glass-ui/src/fonts/fira-code/fira-code-latin.woff2
TypeError: Cannot read properties of null (reading 'width')
    at render (demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:131:47)
```

The reported "`stops.length`" symbol is `flattenPalette`'s parameter, renamed `stops`→`palette` in a later glass-ui revision; the user's stack and the live stack are the same fault.

## §3 — Root-cause attribution

The breakage is not one fault. It is three independent faults stacked on one consumer, plus one cosmetic regression. A.Rα carries the full chain; the summary:

- **A-key-1 — keyframes.js resolution desync (P0, dev-fatal).** `vite.config.ts:30` hard-aliases `@mkbabb/keyframes.js` → `../keyframes.js/dist/keyframes.js`, a file keyframes.js's own working tree deleted in the AD.W4 freshness-retire wave. glass-ui's `useSpringOrchestrator.ts` imports the same specifier. The dev server now fails import-analysis. This is the same root cause glass-ui Q catalogues as Q-break-1 / Q-break-2.
- **A-key-2 — Aurora integration never migrated (P0, mount-fatal).** `App.vue:321-334` constructs `auroraConfig` against the retired `useAuroraBlobs` / `AuroraBlobsConfig` schema (`colorMode`, `colors`, `surfaceMode`, `blobCount`, ...). The current `AuroraConfig` requires `palette: OklchStop[]` and `nuclei: AuroraNucleus[]`; neither is present. `useAurora` throws in `flattenPalette(cfg.palette=undefined)`. The throw propagates from `App.vue`'s `setup` and tears down the App component subtree mid-mount — `audit/HARDEN-2 §1` corrected the earlier "aborts the App mounted hook" description: `App.vue`'s own `onMounted` holds only `loadCustomColorNames()`, and `useAurora` registers its own separate `onMounted`. The visible partial render is App's own mount teardown. The call is also wrong-arity (`cssColorOpaque` passed where `AuroraRuntimeOptions` is expected) and destructures a non-existent `{ config }` from `UseAuroraReturn`, so `provide("auroraConfig", undefined)` poisons every downstream `inject`.
- **A-key-3 — GooBlob null-canvas crash (P1).** `useMetaballRenderer.ts:178-179` dereferences `canvasRef.value!` for a `.width`/`.height` read in an RAF frame that outran `destroy()`. (`audit/HARDEN-2 §1` corrected the line from `:131`, which is a `blendFunc` call.)
- **A-key-4 — stale `<Card variant="pane">` (P1, cosmetic).** value.js passes a `variant` prop glass-ui's `Card` never declared; `Card` silently falls back to `tier:"resting"` + `shadow:true`, which is the hard black drop-shadow visible in the default-viewport capture. glass-ui Q catalogues this as Q-card-1 / Q-card-2.

**Attribution correction.** glass-ui Q's `findings.md` states the consumer breakage "is NOT a glass-ui substrate regression" and that "glass-ui's demo renders every probed surface cleanly." That probe ran against glass-ui's *own* demo. The first live probe of *value.js's* demo (this tranche) shows A-key-2 — a mount-fatal Aurora crash that Q's ledger does not list. A-key-2 is the fault that produced the user's pasted stack. Tranche A's W0 carries it; `coordination/Q.md` hands the correction to Q.

## §4 — Inheritance from glass-ui Q

value.js is a named consumer in glass-ui Q's `coordination/CONSTELLATION.md` (status: "REPORTED BROKEN — dock / animations / dropdowns / glass-cards"). Q's ledger items that land in value.js:

| Q ID | Item | A disposition |
|---|---|---|
| Q-break-2 | value.js hard alias to keyframes.js deleted `dist/` | A owns the value.js write (A.W0); conforms to Q's W0 dev-resolution contract |
| Q-break-3 | value.js `gh-pages` build clobbers its own library `dist/` | A owns the value.js write (A.W0) |
| Q-break-5 | value.js Vite `resolve.conditions` unswept post-AD.W4 | A owns the value.js write (A.W0) |
| Q-card-1 | value.js 11 `<Card variant="pane">` sites stale | A owns the migration (A.W1) |
| Q-chron-1 | PD-3 — value.js WIP-vs-master branch split re-opens | A.W0 resolves the canonical branch |

Q owns every glass-ui-side substrate change (the dev-resolution contract, `Card` props fail-explicit, the cohesion transpositions). A consumes Q's contract and supplies the value.js-side conformance. The writer/reader boundary and the overlapping-scope reconciliation are in `coordination/Q.md`.

## §5 — Scope boundary

In scope for A: the value.js demo (`demo/color-picker/`, `demo/@/`), `vite.config.ts`, `package.json` consumer-resolution surface, and the design/functionality audit of the demo. glass-ui API gaps the audit surfaces (blob/aurora abstraction, missing primitives/variants/tokens) are authored as **coordination items handed to glass-ui**, designed at the root, not written from this tranche.

Out of scope: the value.js library itself (`src/` — parsing, color, units, transform) has no part in the regression and no audit mandate. The `api/` directory (Hono + MongoDB) is a backend surface unrelated to the frontend regression. The `demo/hero-lab/` second demo is repaired at the boot level as a side effect of A.W0's `vite.config.ts` resolution fix, but a hero-lab design audit routes to a named successor (value.js tranche B) — see `A.md §5`. The `gh-pages` demo build output is a release surface touched only by A.W0's clobber fix.

This section and the scope decisions in it were hardened by `audit/HARDEN-5` (coverage gaps) and `audit/HARDEN-1` (the precepts submodule and the A↔Q boundary).
