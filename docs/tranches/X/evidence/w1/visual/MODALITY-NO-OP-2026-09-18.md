SERVED MODEL: claude-opus-5[1m]

# Two modality arms were silent no-ops, and 28 committed goldens witness nothing

**Dated addendum-beside (E-3), 2026-09-18.** Nothing under `evidence/w1/visual/` is edited by this
file; `MANIFEST.json`, `TOLERANCE.md`, `DENOMINATOR.md`, `G9-INJECTION.md`,
`FIRST-MINT-VERIFICATION.md` and `R54-RESIDUE-WITNESS.md` stand at their committed bytes. This file
records what the X-W1 REPAIR SEAT (round 1) measured while curing **Check 1 · D-3 (G-1)**, and what
it costs.

## The finding

`e2e/visual/modality.visual.spec.ts` declared two of its six arms like this:

```ts
use: { viewport: { width: 1024, height: 768 }, reducedMotion: "reduce" },   // :92
use: { viewport: { width: 1024, height: 768 }, forcedColors: "active" },    // :100
```

**Neither key is a Playwright test option.** Both are `BrowserContextOptions` members, reachable
only through the `contextOptions` test option. Written at the top level they are accepted without
error, ignored, and the arm runs anyway — so the frames mint, the filenames claim the modality, and
the browser never had it.

The compiler said so, in the two diagnostics D-3 counted among G-1's fourteen:

```
e2e/visual/modality.visual.spec.ts(92,56): error TS2353: Object literal may only specify known
  properties, and 'reducedMotion' does not exist in type 'Fixtures<…>'.
e2e/visual/modality.visual.spec.ts(100,56): error TS2353: … 'forcedColors' does not exist …
```

This is the concrete answer to the close's own LW-1 — *"the 'and passes' half of G-1 was never
measured by any seat of this wave"*. The half nobody measured was hiding a live defect in the
wave's own product.

## Receipts — by command, at this seat's clock

| ⟨command⟩ | output |
|---|---|
| `grep -c 'reducedMotion' node_modules/playwright/types/test.d.ts` | **1** — and that one hit is a *doc example* at `:7501`, showing the key nested **inside** `contextOptions` |
| `grep -rn 'reducedMotion\|forcedColors' node_modules/playwright/lib/` | **0** — the runtime never reads such a fixture |
| `PlaywrightTestOptions` member list (`types/test.d.ts:7027`+) | 20 keys: `acceptDownloads · bypassCSP · colorScheme · clientCertificates · deviceScaleFactor · extraHTTPHeaders · geolocation · hasTouch · httpCredentials · ignoreHTTPSErrors · isMobile · javaScriptEnabled · locale · offline · permissions · proxy · storageState · timezoneId · userAgent · viewport` — plus `contextOptions`. **Neither modality key is among them.** `viewport` and `deviceScaleFactor` ARE, which is why the other four arms typechecked and only these two did not |
| `lib/index.js` `_combinedContextOptions` | assembles the context from the enumerated option fixtures and spreads `contextOptions` beneath them: `await use({ ...contextOptions, ...options })`. A key in neither list reaches no browser |

### The differential probe — run, not reasoned

Two describe blocks, one Playwright run, `about:blank`, chromium, this machine, 2026-09-18:

```ts
test.describe("AS-WRITTEN (test.use top-level keys)", () => {
    test.use({ reducedMotion: "reduce", forcedColors: "active" } as never);
    …matchMedia("(prefers-reduced-motion: reduce)").matches / ("(forced-colors: active)").matches
});
test.describe("VIA contextOptions", () => {
    test.use({ contextOptions: { reducedMotion: "reduce", forcedColors: "active" } });
    …the same two reads
});
```

```
AS-WRITTEN         {"reduced":false,"forced":false}
VIA-CONTEXTOPTIONS {"reduced":true,"forced":true}
2 passed (784ms)
```

**Both arms were off.** One knob, two arms, opposite readings — a differential, not an assertion.

## The cure landed

`modality.visual.spec.ts` now declares both arms through `contextOptions`, with the measurement
above written into the `Modality.use` doc comment so the next reader does not have to re-derive it.
G-1 measures **0 `error TS`** over `tsconfig.e2e.json`, double-run, and `npm run typecheck`
(four programs) exits **0**.

## What this costs — stated, not glossed

**28 of the 207 committed goldens do not witness what their filenames claim.**

| arm | committed goldens | the label they carry | what was actually captured |
|---|---|---|---|
| `reduced-motion-desktop` | **14** (⟨`git ls-files 'e2e/visual/goldens/**/*.png' \| grep -c reduced-motion`⟩) | `…-real-…` | `prefers-reduced-motion: no-preference` — the ordinary animated product |
| `forced-colors-desktop` | **14** (same command, `forced-colors`) | `…-emulated-…` | `forced-colors: none` — the ordinary themed product |

The other four arms are unaffected: `zoom-200-desktop` (viewport + `deviceScaleFactor`),
`rtl-desktop` and `rtl-mobile` (`dir="rtl"` applied in the test body by `applyRtl`), and
`keyboard-focus-desktop` (12 Tab presses by `tabTo`) all use levers that were genuinely applied.

**Consequence, disclosed rather than absorbed:** with the cure in place those 28 cells now capture a
genuinely different frame, so the `visual` job REDS on them until they are re-minted. That RED is
honest and it is the correct state: the stale goldens are the false evidence, not the failure.

## Why this seat did not re-mint them

`scripts/visual/regenerate-goldens.mjs` refuses a tree that is dirty in any path that can change a
pixel — `demo/`, `src/`, `plugins/`, the build config, `e2e/`, `scripts/visual/`,
`playwright.config.ts`, and the goldens. At this seat's clock the primary tree carries **ten
uncommitted `demo/**/*.vue` edits belonging to sibling seats of other tracks**, which the standing
law forbids this seat to touch, stash or restore. The visual suite's dev server serves that same
tree (`reuseExistingServer` is on outside CI), so any frame minted now would photograph a sibling
seat's half-finished edit and ratify it as the product's appearance — the exact condition G-9's
dirty-tree refusal exists to prevent. A worktree does not escape it: the port is shared and the
product source is the same.

So the re-mint is **owed, named, and owner-assigned**, not quietly carried:

> **The first seat that can run `node scripts/visual/regenerate-goldens.mjs --accept -g
> "reduced-motion-desktop|forced-colors-desktop"` on a pixel-clean tree re-mints those 28 cells and
> commits them with this file cited.** Until then the `visual` job's RED on exactly those 28 names
> IS the record. A re-mint on a dirty tree, an allowlist, a tolerance raise, or a `test.skip` of the
> two arms would each be the masking fallback the standing law names.

## Provenance

- Raised as **Check 1 · D-3** (HIGH) — *"G-1 is RED on bytes THIS WAVE minted"*.
- Files minted at `e2347c0e`; the program that caught them at `75636b16`; wired into CI at
  `ec654158`.
- Cure commit: the `fix(e2e/visual)` commit that carries this file's sibling edits.
