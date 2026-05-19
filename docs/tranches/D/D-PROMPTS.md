# D — User-prompt + precept recap

**Anchor doc** for tranche D. The plan substrate (`D.md`, `findings.md`, `waves/D.W*.md`) traces every clause here to a wave assignment or a named cross-repo destination.

## §1 — The verbatim D-opening directive (2026-05-19)

Quoted as the user issued it, mid-session between B.W4's commits 1 and 2:

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
> Recap ALL of our prompts and requests hitherto and ensure they've been adressed.
>
> This is NOT an implementation phase. Tranche development only.
>
> We need a full playwright audit of every view, and every admin view, too. We need full, proper, aurora implementation that can be derived from a singular color/set of colors — not the cloud default — analyze our older aurora implementation and ensure that our background facilities are augmented to handle that (derived from the current, normalized, color);
>
> Full validation and extirpation of the blob faciilities — align, update, and augment the glass-ui glob facilities to be what we require, and then remove the hard-coded bespoke versions herein to leverage that. Perfect and refine our extant and basal implementations to be better encapsulated, generalized, beautiful — same for aurora. Two research agents in parallel to accomplish this, too.
>
> Analyze the extant backend codebase for any legacy code, deprecated code, temporary workarounds, fallback or fall-through behavior: in all instances, either excise the code entirely, or fail explicitly therein: no silent or graceful handling unless befitting.
>
> This should be a fastidious and surgical refactor: thoroughly identify all areas herein with legacy behavior and get everything explicitly migrated to whatever new API — or facility — present.
>
> Divine an approach to achieve better encapsulation, consistency in service boundaries, dependency injection patterns, and pipeline orchestration.
>
> NO god modules: break large files (>500 lines especially) into smaller, cohesive sub-modules when appropriate and expedient; leverage better and modern patterns.
>
> NO workarounds, NO fallbacks, NO special cases. No effusive dynamicsim. NO nested imports. NO test files in src files.
>
> NO duplicated effort: DRY. KISS.
>
> Run linting and type checking to validate your changes at every interval.
>
> Alongside: Assay the frontend components herein to look for areas of better encapsulation, consistency in composables, useX's, state management and store management, etc.
>
> We should break large components (>500 lines especially) into smaller sub-components when befitting; leverage better and modern Vue patterns. Components and composeables should be colocated together when befitting in functionality. Complex components should be structured into sub-component dirs with components, composeables, constants, skeletons, thereof, if needed.
>
> Logical grouping of files, modules, components, into directories without contrivance or over-engineering. KISS.
>
> Audit for deeply nested or brittle selector usage insofar as CSS or reactivity.
>
> Analyze for non-idiomatic tailwind or tenuous, brittle, bespoke styling in therein, too. Ensure that any style changes are perfectly isomorphic thereto, unless HIGHLY befitting otherwise. For styling focus on: (1) non-idiomatic Tailwind usage (2) monolithic/global stylesheet patterns that should be colocated or component-scoped (3) deprecated/archaic CSS (4) fragile rules (magic numbers, brittle `calc()/min()/max()` chains, viewport-unit traps, z-index coupling, browser-specific breakage) — unless highly befitting
>
> Ensure that we're using idiomatic tailwind applies for style, animations, colors: we should have a localized area that defines all of our design idioms — but still leverages proper colocation. Ensure design cohesion within our chosen aesthetic.
>
> In plan mode, deploy 8 agents in parallel. Fastidious assay with conservative and judicious changes. No legacy or deprecated codepaths: this is a development product.
>
> Once the above is completed. Tranche development only, no implementation.

## §2 — Recap of all prior user prompts (A + B + D-open)

`research/Da-hitherto-deferrals.md §1` carries the verbatim ledger of every prior user prompt: A turn-1 (the `stops.length` regression report + the 13-mandate audit), A turn-2 (the panels/dock broken-largely follow-up), A turn-3 (the planning-only + 6-agent harden directive that opened the A hardening), B turn-4 (the deep-audit + hardening + abrogate-overfits directive that opened B), B turn-5/6 (the Q-close realignment + keyframes.js parity), B turn-7 (the *complete-in-totality* execution authorization), plus this D-open directive. Each is addressed-by mapped: A.W0–W7 + B.W0–W4 commits, plus the unaddressed clauses now folded into D's waves.

`docs/tranches/A/FINAL.md` and `docs/tranches/B/FINAL.md` are the close ledgers. A closed with all 13 mandates FULL or routed; B closed with every research finding (rows A–N) landed or named-routed. D inherits the routed-forward items and adds the new D-directive scope.

## §3 — Precept recap

D opens against `docs/precepts` `3c32fae`. The contract-v1 invariants 30–33 (cross-repo dev-resolution, props fail-explicit, phantom-class corpus-grep, dead-code corpus-grep) governed B. **glass-ui has since shipped contract-v2** (`ce5aad8` / v1.9.3) — abrogates the `development` dev-resolution condition, mandates `build:watch`, inverts `proof-resolution-contract.mjs` to forbid-what-it-once-required. The shared precepts submodule's contract-v2 codification lands at SHA **`68d9b20`** (per `research/Dh-contract-v2.md` §1). D.W0 advances value.js's pin to `68d9b20` and D.W1 ships the contract-v2 alignment (`package.json` `default`-only, drop `development`, `build:watch`, port `proof-resolution-contract.mjs`).

Invariants 30–33 remain in force; invariant 30 is **redefined in-place** at `68d9b20` (per `research/Dh-contract-v2.md §3`) — not a new invariant 34.

## §4 — Bounded scope (what D is and is not)

**D IS**: a value.js-only tranche that aligns to contract-v2, surgically refactors the `api/` backend (kills god modules + introduces a service/repo layer + fails-explicit), splits one frontend god module (`PaletteDialog.vue`), surfaces design idioms into a catalog without breaking rendered styling, expands the Playwright smoke suite from 3 specs to ~20 covering every view + admin path. Six implementation waves + a HEADLINE close.

**D IS NOT**: an aurora-derive-from-color implementation wave (glass-ui must ship `deriveAuroraPalette` first — filed `coordination/Q.md §3` row 2); a blob-extirpation implementation wave (glass-ui must ship the metaballs `positionSource` hook + `BlobDot` first — filed `coordination/Q.md §3` rows 1+3). These are precept-§10 ("wire before retire") blocked: the bespoke `useMetaballRenderer.ts` is wired and working — retirement requires glass-ui ship. D files them sharper and routes them to a value.js *demo-abstraction* tranche opened once glass-ui ships.

D also is not the palette-CRUD / fourier cohort tranche scaffolded untracked at `docs/tranches/C/` — that is a separately-scoped effort owned elsewhere; D does not consume or alter it.

## §5 — Plan substrate

`D.md` (master plan), `D-PROMPTS.md` (this file), `findings.md` (audit-to-wave mapping), `research/Da..Dh` (the 8 audit lanes), `coordination/Q.md` (cross-repo manifest, inherits B's §2a/§3 state + adds the contract-v2 / aurora-blob filings), `dispatch/AGENT.md` (D agent contract, inherits B's hardened clauses), `waves/D.W0..D.W6.md` (seven wave specs), `PROGRESS.md`.

D is **planning-only at open** per the directive's "This is NOT an implementation phase. Tranche development only." The plan opens with B closed and the substrate authored; the execution session that lifts the planning-only constraint will begin at D.W0.
