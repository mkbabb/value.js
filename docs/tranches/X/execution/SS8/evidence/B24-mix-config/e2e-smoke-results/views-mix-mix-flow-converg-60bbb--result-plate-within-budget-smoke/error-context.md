# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/views/mix.spec.ts >> mix flow: convergence lands at the result plate within budget
- Location: e2e/smoke/views/mix.spec.ts:28:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:8125/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setupEnvNoise } from "../fixtures/env-noise";
  3  | import { openView, mainPane } from "../fixtures/dock";
  4  | 
  5  | /**
  6  |  * S.W3-6 / Q10 — the mix convergence flow (the first-principles re-work).
  7  |  *
  8  |  * The Mix view's bare "renders heading + zero console errors" mount check was
  9  |  * folded into the user-view census (walk.spec.ts) at T.W0 W0-CI; this spec now
  10 |  * carries only the behavioral convergence gate below.
  11 |  *
  12 |  * The choreography under test: startMix computes the result synchronously and
  13 |  * mounts the result plate GHOSTED (the awaiting well, `[data-mix-target]` —
  14 |  * the announced destination the canvas convergence lands on); the canvas
  15 |  * timeline is the ONE clock (MIX_CONVERGE_MS = 900ms) and its completion
  16 |  * event — not a parallel setTimeout — inks the plate in. Total choreography
  17 |  * ≤ 1.2s (§6.2 "Mix choreography wall clock" gate).
  18 |  *
  19 |  * Honest assertions vs the REPLACED choreography (enumerated per the Q10
  20 |  * commit discipline):
  21 |  *   - the generic spinner row ("Gathering…/Mixing…/Revealing…" +
  22 |  *     `.animate-spin`) is asserted ABSENT — the animation IS the progress;
  23 |  *   - the result must reveal within 2.5s of the click — the retired
  24 |  *     choreography could not reveal before its hard-coded 2.9s timer chain,
  25 |  *     so this bound both proves the ≤1.2s re-work (plus test-runner slack)
  26 |  *     and would catch a regression to timer-driven choreography.
  27 |  */
  28 | test("mix flow: convergence lands at the result plate within budget", async ({
  29 |     page,
  30 | }) => {
  31 |     const consoleErrors = setupEnvNoise(page);
  32 | 
> 33 |     await page.goto("/");
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  34 |     await openView(page, "Mix");
  35 | 
  36 |     const main = mainPane(page);
  37 | 
  38 |     // Two sources: add the picker's current color twice (a valid mix).
  39 |     // ── X-W1 · R2 (SH-8 = PP-2 = A-3 = MX-3 = MSS-2 = MR-2) ─────────────────
  40 |     // The add-slot was bound by `getByRole("button", { name: "Add current color
  41 |     // to the mix" })`, which can NEVER match. MEASURED at the running app,
  42 |     // 2026-09-18: the slot renders `<span aria-hidden="true">` with no
  43 |     // `aria-label`, no `role`, `pointer-events: none`, and a forced click adds
  44 |     // no source. ROOT: glass-ui 7.0.0's `WatercolorDot` declares
  45 |     // `inheritAttrs: false` and renders that span, so the demo's `tag="button"`,
  46 |     // `aria-label`, `:disabled` and `@click` are all dropped at the seam. The
  47 |     // affordance is DEAD in the shipped product — a live BLOCKER, not a test
  48 |     // defect. glass-ui is READ-ONLY and `demo/` is this wave's Triumvirate
  49 |     // trigger, so the cure is routed (BH relay + the consumer wave) and the
  50 |     // oracle is made honest: it binds the node that exists and asserts the
  51 |     // contract that is broken.
  52 |     const addSlot = main.locator(".add-slot-ghost").first();
  53 |     await expect(addSlot).toBeVisible();
  54 |     await expect(
  55 |         addSlot,
  56 |         "the add-slot must be an OPERABLE control, not an aria-hidden decoration — glass-ui 7.0.0 WatercolorDot drops tag/aria-label/@click (inheritAttrs:false)",
  57 |     ).toHaveAttribute("aria-label", /Add current color/, { timeout: 2000 });
  58 |     await addSlot.click();
  59 |     await addSlot.click();
  60 |     await expect(main.locator("[data-mix-source]")).toHaveCount(2);
  61 | 
  62 |     // Fire the mix.
  63 |     await main.getByRole("button", { name: "Mix", exact: true }).click();
  64 | 
  65 |     // The destination is ANNOUNCED: the result plate mounts ghosted with the
  66 |     // awaiting well — the anchor the convergence lands on.
  67 |     await expect(main.locator("[data-mix-target]")).toBeVisible({
  68 |         timeout: 2000,
  69 |     });
  70 | 
  71 |     // The spinner grammar is retired: no parallel progress row, ever.
  72 |     await expect(main.locator(".animate-spin")).toHaveCount(0);
  73 | 
  74 |     // The plate inks in on the canvas clock's settle — within the ≤1.2s
  75 |     // choreography budget plus runner slack (2.5s; the retired 2.9s-timer
  76 |     // choreography cannot pass this bound).
  77 |     await expect(main.getByText(/^oklab\(/).first()).toBeVisible({
  78 |         timeout: 2500,
  79 |     });
  80 | 
  81 |     expect(consoleErrors).toEqual([]);
  82 | });
  83 | 
```