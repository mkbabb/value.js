# B — User-prompt + precept recapitulation

Authoritative record of every prompt and binding precept that frames Tranche B, gathered before the audit dispatches. Tranche B reads this as its directive ledger.

## §1 — User prompts, in order

### Original tranche-A opening (turn 1, prior session)
> Recently, a series of changes were made to this core app and glass-ui that has broken many dropdowns, animations, and core features. [pasted `stops.length` crash + `fira-code-latin.woff2` 403]. Develop a new tranche … alongside a value.js-focused design and functionality audit:
> 1. Audit the frontend for **styling quality and resilience** — (a) non-idiomatic Tailwind / non-idiomatic glass-ui usage; (b) monolithic/global stylesheet patterns that should be colocated or component-scoped; (c) deprecated/archaic CSS; (d) fragile rules (magic numbers, brittle `calc()/min()/max()` chains, viewport-unit traps, z-index coupling, browser-specific breakage).
> 2. A **design audit** — consistent, coherent, idiomatic design language with proper tokens (Tailwind utilities and plugins); `@apply` for custom styling; audit font sizes, border radii, box shadows in cards, hover states, pop-ups.
> 3. Every button has **four-state actions**: hovered, toggled, disabled, standard.
> 4. Audit **modals, dropdowns, pop-ups, hover-over elements** for styling consistency, state handling, visual hierarchy; clear affordances and feedback.
> 5. **Duplicated components** consistently styled — reused tabs headers/items, dropdown navs and items.
> 6. **Golden-ratio-backed hierarchies** for fonts, cards, visual elements; abrogate spreadsheet-like lists in favor of structured, content-rich approaches.
> 7. Favor **colocation + idiomatic Tailwind `@apply` and plugin usage**.
> 8. **Root-level component restyling** — reusable core components (shadcn, reka) edited at their roots, not with ad-hoc styles.
> 9. Use **glass-ui for all styling and component usage when possible** — cards, typography, z-index tiering, radii, tokens.
> 10. **Flatten** unnecessarily complex or overly-deep components (HTML, Vue).
> 11. Skip duplicates; avoid generic advice.
> 12. Identify **gaps in value.js AND glass-ui** for better cohesion, coverage, design affordance.
> 13. **Playwright** validation of user and admin flows; idiomatic usage of glass-ui's **blob system** and **aurora system** — what gaps exist, how to abstract onto them.

### Mid-session amendment (turn 1)
> The panels seem to be broken largely, and the dock is broken as well.

### Scope clarifications (turn 1)
> This is for a tranche created herein, not glass-ui per-se. Glass-ui has a tranche development process underway right now. This is a tranche that should be developed herein, tranche A (but we should still develop glass-ui fixes, idiomatically, at the root, too).
>
> This is tranche development only in this session.

### Tranche A hardening prompt (turn 2)
> Properly de-dup from Q, and then take another pass to harden this tranche, A, with 6 agents in parallel. Recap the plan first, and identify gaps, challenge and harden for an augmented wave-set.

### Current-session opening (turn 3)
> Begin and continue the current tranche. You must read any and all appurtenant documentation and adhere exactly to the plan, in particular regarding agent orchestration and deep parallelization. Do not edit items directly unless befitting and fully orchestrate the processes as team lead.
>
> Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt approaches.

### Current-session interruption (turn 4 — this prompt)
> These items, like for the dock sizing, layout, seem contrived, overfit, and over-engineered. Harden and perform the following:
>
> DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein.
>
> Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable.
>
> NO legacy code.
>
> Delineate any chronically deferred items and fold them into this new tranche.
>
> Delineate any deferred items and fold them into this new tranche.
>
> Recap ALL of our prompts and requests hitherto and ensure they've been addressed.
>
> This is NOT an implementation phase. Tranche development only.
>
> How might we simplify layout structure (preserving rendered styling), component structure, etc.
>
> This seems hung on e2e.

## §2 — Binding precepts (from `docs/precepts/instructions/README.md`)

The full edict list condensed. Every B finding and wave is checked against these.

1. **KISS. DRY.** Simplest complete mechanism. Remove duplication before adding policy.
2. **No quick fixes.** Workarounds, stubs, disabled gates, compatibility shims are debt unless a bounded brittleness window with restoration is declared.
3. **Architectural transposition wins.** Elegance, simplicity, performance through structural change are mandatory and desirable. Reject sprawling multi-PR sweeps when a single transposition lands cleaner.
4. **Abrogate before patch.** Ask "can we delete?" before "can we patch?". Workarounds on a doomed surface accumulate debt.
5. **One path.** Two orthogonal codepaths for the same logic is a smell, not a feature flag.
6. **No legacy code.** Delete dead code. Do not rename, hide behind a flag, or leave commented remnants.
7. **No silent deferrals.** Planned work lands, retires with rationale, or moves to a named destination. Cross-tranche deferral is a scope-reveal trigger.
8. **Substrate with consumer.** New abstractions land with a runtime caller, test, benchmark, or proof.
9. **No overfitting.** Single-use helpers inline. Unused public surfaces delete.
10. **Wire before retire.** An under-wired primitive defaults to WIRE; retirement requires explicit rationale.
11. **Every wave is named.** `W<N> - <Title>` canonical form.
12. **Evidence beats claims.** Agent reports checked against artefacts.
13. **Indefatigability belongs to the orchestrator.** Stuck sub-agents halt + report; orchestrator replans/redispatches.
14. **Voice and style.** Direct assertions, sparing unspaced em-dashes, no epanorthosis, no AI-writing signs.
15. **Fail-explicit on library-internal contract violations.** Library-internals throw; browser-API degradation paths stay silent fallbacks.

Plus from the **Code Discipline** section: root-cause repairs over wrappers; no additive replacement surfaces (`*_v2`, fallback paths) unless an intentional cutover window is named; scope to declared file bounds; no god modules; splits use directory modules; typed-key + helper-pair DI; tests outside `src/`; documentation updates in the same wave.

Plus from **Commit Discipline**: Conventional Commits with concrete module/wave scopes; body required for multi-subsystem/generated/deletion/gate commits; no AI authorship; one-line subjects only for self-explanatory mechanical edits.

Plus from **Gates**: hard gate is valid only when verifiable by an artefact — build/lint output, focused test output, runtime observation, benchmark, generated-code diff, deletion proof, or explicit document update; grep-only is supplementary.

## §3 — Tranche A invariants A1–A5 (binding into B)

From `docs/tranches/A/A.md §2`:

- **A1 — glass-ui-first consumption.** Demo styling and components consume glass-ui tokens/surfaces/primitives; no rebuilt surface where glass-ui ships one.
- **A2 — Consumer-resolution integrity.** No `dist/` aliases to sibling `@mkbabb/*`; mode-scoped `resolve.conditions`.
- **A3 — Runtime-evidence gate.** Demo-touching waves close on Playwright probe + console + network, not on grep.
- **A4 — Root-level restyle.** Reusable components restyled at their root (glass-ui change), never per-instance overrides.
- **A5 — Zero deferral at close.** Every research finding lands, retires with rationale, or has a named cross-repo destination. "Deferred to later tranche" without a destination is not a close-state.

## §4 — The B audit dispatch covers (the user's points)

Mapped to the audit lanes dispatched alongside this document:

- **Bα** — chronically deferred + deferred items across A: every marker comment, every `coordination/Q.md` row, every "recorded-deferred" finding, the W2 plan deviation, the 246 pre-existing typecheck baseline, the `.underline-tabs` marker, the `font-mono-code`/`text-2xs` history (resolved), the `floating-panel-item` glass-ui gap, AuroraPane stub, etc. Build the master ledger.
- **Bβ** — layout simplification (the user's explicit point): the dock calc chain, `--dock-pos` centring vs pinning, `.app-layout` grid-rows vs simpler structures, `--content-max-h` clamp coupling. Is the current structure idiomatic or contrived?
- **Bγ** — component-structure simplification: the W4 decomposition (`useDockLayers`, `useDockAdminMode`, `DockViewSelect`, `DockMainLayer`, `PaneSlot`, `useDesktopPaneRouter`, `useMobilePaneRouter`, `useAtmosphere`, `usePaletteManagerWiring`, `ConfigSliderPane`). Clean transposition or over-fitted scaffolding? "One path" — are `useMobilePaneRouter`/`useDesktopPaneRouter` legitimate parallels or a One-Path violation?
- **Bδ** — W5 reality + the global-reduced-motion sledgehammer + the a11y granularity + the e2e suite (the user's "hung on e2e" remark).
- **Bε** — original-mandate completeness: each of the 13 turn-1 mandates checked against tranche-A outputs. What's under-addressed.
- **Bζ** — legacy / dead / over-fitted code: residual marker comments, unused tokens, unused composables, orphaned files, the under-rework AuroraPane stub, the duplicate-Vue dedup story.

## §5 — Mode

Tranche B opens in **planning-only mode**. No implementation in this session per the user's explicit directive.
