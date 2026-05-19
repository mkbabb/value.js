# A — Challenge pass

Adversarial review of `research/Aa..Ae` before the plan is synthesized. Per the tranche lifecycle, research without challenge is input, not authority. Five challenges; each is resolved or routed.

## C1 — Does A's runtime probe actually contradict glass-ui Q, or is it the same fault?

`research/Aa` claims A's Playwright probe found a mount-fatal Aurora crash (A-key-2) that glass-ui Q's audit missed. Challenge: Q's `findings.md` lists Q-break-1/2 (keyframes resolution) as the value.js headline; could A-key-2 be a downstream symptom of that, already covered?

Resolved — no. The two faults sit at different stages. A-key-1 (keyframes resolution) fails at Vite import-analysis, before any module evaluates. A-key-2 fails inside the App `mounted` hook, after the module graph is built and the component tree is mounting. The live console proves both fire independently: the `flattenPalette` stack and the keyframes 404 appear in the same session at different lifecycle points (`research/Aa §2`, console excerpt). With a warm Vite dep cache the keyframes resolution succeeds and A-key-2 is the only crash — which is exactly the state of the first cold-load capture (`A-crash-default-partial-render.png`), where the app partial-renders and the only console error is `flattenPalette`. A-key-2 is real, separate, and not in Q's ledger. The §1 attribution correction stands.

## C2 — Is the glass-ui-side gap list overreach?

`research/Ae §C/§D` proposes six glass-ui additions (metaballs `positionSource` hook, pointer input, color perturbation, per-blob opacity, `deriveAuroraPalette`, `BlobDot`, `ConfigSliderPane`), and `research/Ad` proposes five more (`SelectTrigger size`, `clampLabel`, `TooltipContent variant="mono"`, `Button size="icon-sm"`, `DropdownMenuContent` font default). Challenge: a value.js tranche proposing eleven glass-ui API additions is scope dilation dressed as coordination.

Partly upheld. The audit must not author glass-ui API from inside value.js — invariant A4 says A files gaps, it does not design the substrate. The eleven items are evidence-grounded (each has consumer count and file:line), so they are valid *findings*, but their concrete API shape (prop names, hook signatures) is a glass-ui design decision. Resolution: `coordination/Q.md §3` carries the gaps as **problem statements with consumer evidence**, not as finished API. The proposed shapes in `research/Ad`/`Ae` are retained as illustrative, marked non-binding. A.W5 consumes whatever glass-ui ships; it does not require glass-ui to ship A's exact proposal.

## C3 — Can W5 close under zero deferral if glass-ui never ships the blob API?

Invariant A5 forbids un-destinationed deferral. A.W5's blob abstraction depends on a glass-ui extension set absent from glass-ui Q's plan (`A.md §9`). Challenge: if glass-ui Q closes without it, W5 cannot land, and "wait for a future glass-ui tranche" is the deferral A5 bans.

Resolved by the §9 brittleness window. The dependency has a named destination: if glass-ui declines, A.W5 re-scopes to the demo-side work that does not need the API (the A-key-3 null-guard already landed at W0; the duplication stays documented), and the abstraction routes to a named pair — a glass-ui successor tranche plus value.js tranche B. A named cross-repo destination is an explicit close-state under A5 and the precept `SPEC §Close`. W5 closes honestly either way; what it cannot do is close *silently* with the duplication un-noted.

## C4 — Are the "undefined class" findings real, or Tailwind v4 arbitrary values?

`research/Ac` (Ac-2/3/4) claims `font-mono-code`, `text-2xs`, `text-pane-description` are undefined and silently dropped. Challenge: Tailwind v4 generates utilities on demand; could these resolve through `@theme` or a safelist?

Spot-verified, upheld. Tailwind v4 generates a utility only when its theme namespace key exists — `text-2xs` would require a `--text-2xs` theme entry, `font-mono-code` a `--font-mono-code`. `research/Ac` confirms none is registered in `demo/@/styles/*`, glass-ui `typography.css`, or any config. v4 silently emits nothing for an unknown utility; it does not error. These are real visual bugs (mono text rendering as serif, descriptors at inherited size), correctly P1 in `research/Ac`. W1 carries them. One refinement: the W1 agent must re-run the grep against HEAD before editing, since a glass-ui token addition between audit and wave could make one of the three resolve.

## C5 — Is W0 truly closed-form, or does it hide design space?

`A.md §4` declares W0 closed-form (no research wave). Challenge: A-key-2's fix rebuilds `auroraConfig` against the v4.1 `AuroraConfig`, which means choosing a `palette` and `nuclei` — a design choice (what should the atmosphere look like?), not a mechanical port.

Upheld in part. The *boot fix* is closed-form: construct a valid `AuroraConfig` from `DEFAULT_AURORA_CONFIG`, correct the `useAurora` arity, drop the dead `{ config }` destructure. That makes the app boot and is W0's gate. The *atmosphere should track the picker color* intent (`research/Ae` Ae-9) is genuine design space — it needs `deriveAuroraPalette`, which is a glass-ui gap. Resolution: W0 ships the boot fix with a static valid config (atmosphere renders, app boots); W5 makes the atmosphere picker-derived once glass-ui ships the palette helper. W0 stays closed-form for its stated gate; the design space is correctly deferred to W5 with a destination, not smuggled into W0.

## Disposition

All five challenges resolved or routed. Two changed the plan: C2 reshaped `coordination/Q.md §3` from API proposals to evidenced problem statements; C5 split the Aurora work cleanly across W0 (boot) and W5 (picker-derived). C3's resolution is the §9 brittleness window. The research is challenged authority; the plan in `A.md` is synthesized from it.
