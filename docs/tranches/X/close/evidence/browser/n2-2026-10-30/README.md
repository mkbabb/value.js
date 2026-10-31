SERVED MODEL: claude-opus-5-5

# X.W11.n2: SS8-0363 light (COHESION §0gy.5)

## Cell

- Docker Linux Chromium: `mcr.microsoft.com/playwright:v1.60.0-noble`, `--cpus 4`, `CI=1`, `--project=smoke --workers=1 --retries=0`.
- Every run went through `~/.claude/guard/guarded --timeout 60 -- probe/go.sh <tree> <tag> <grep> 2 <specs>`.
- The trees are `git archive dc245575f` under `~/.dev-logs/n2/<tree>/`. Their `node_modules` are APFS clones of earlier Linux installs whose `package-lock.json` is byte-equal (`cmp`) to the tree's lock: glass 10.1.3 from `hld/tree` and glass 10.1.2 from `e2a/tree`.
- Counterfactual trees are `git show <c> | git apply -R` on the archive. tranche-u is never reset.

`probe/zz-n2-tokens.spec.ts.txt` is the probe. It uses the oracle's own `chipRatio` setup, copied byte for byte from `ss8-b12-card-shell.spec.ts:1-93`, and logs the chip's computed colour and the root and pane plate tokens under each contrast preference. It goes into the scratch tree only. The oracle is untouched.

## Bisect (SS8-0363 light, ×2 each, `runs/summary.txt`)

| tree | normal | more | verdict |
|---|---|---|---|
| head (`dc245575f`) | 12.1007 ink [0,0,0] | 10.2056 ink [51,48,46] | RED ×2 |
| head − `8573b45ca` (.ref) | 8.0855 ink [46,43,43] | 10.0588 ink [52,49,47] | GREEN ×2 |
| head − `b14ed7945` (.cut) | 12.1007 | 10.2056 | RED ×2 |
| head − `64e8a3816` (.g13, glass 10.1.2) | 12.1007 | 10.2056 | RED ×2 |

The named commit is **`8573b45ca` (.ref)**. Neither `.cut` nor `.g13` moves a byte of the reading, so there is no glass A/B row and no escalation.

## Mechanism (`runs/tokens-head-light.txt`, light)

- **no-preference:** `--ink-primary` L 4.38 % and `--ink-muted` L 4.63 %. The chip's `--muted-foreground` is the pane's `--ink-muted`, so its ink is [0,0,0].
- **more:** `--ink-primary` L 21.61 % and `--ink-muted` L 46.68 %. The pane's SS8-0363 rule `color-mix(--ink-muted, --ink-primary 61.8%)` gives ink [51,48,46].

Why the two preferences diverge:

1. `.ref` moved the light plate pair's referent from the field mean to maximin, which is the darkest stop clamped at the pole crossover.
2. With the glass tint present (`--glass-tint-strength: 4%`), that resting plate sits where `floor + headroom` (5.625) is out of reach. `certify` bisects to the guard's ceiling, and the ink walks to the pole.
3. The elevated-contrast layer drops the tint (`--glass-tint-strength: 0%` and `--glass-level: 0.1`, `foundation.css:924`). The live plate probe (`resolveLiveTintCached`) reads that lighter plate, where 5.625 is reachable, so `certify` returns the nearest ink that clears it. That ink is lighter than the pole.

So `more` certified a weaker ink than no-preference. It sat on a cleaner ground, but no-preference had landed at the pole. Before `.ref` the mean referent left both preferences at the nearest sufficient ink, and `more` still read higher (8.09 → 10.06).

## Cure (`demo/color-session/ink.ts` `certifyFor`, `useContrastSafeColor.ts` `plateContrast`)

Under `prefers-contrast: more`, the neutral plate pairs (resting, floating, modal: primary and muted) certify at the guard's ceiling. That ceiling is the highest ratio the guard admits for the seed on that plate: the pole, or the pick where the pick reads higher.

- The target is `floor + max(CERTIFY_HEADROOM, ceiling − floor)`. `TEXT_CONTRAST_FLOOR` and `CERTIFY_HEADROOM` keep their bytes.
- Identity inks (gold, destructive, accent) keep their hue law.
- No-preference keeps every byte it had: `plateInk`'s third parameter defaults to `"no-preference"`.
- The preference is read through `@vueuse/core` `usePreferredContrast`, so a live change re-certifies.

After the cure (`runs/tokens-cured-light.txt`): under `more`, `--ink-primary` = `--ink-muted` = L 0.00015 %, and the chip ink is [0,0,0] on [236,225,219], reading **16.36** against the normal 12.10. Dark reads 11.31 ([255,255,255]) against 6.50.

## Gates after the cure (`runs/cured-r{1,2}.json`)

- ⟨`go.sh cured cured "SS8-0363|N2-TOKENS|O-18|SS8-0440|caption leg" 2 <ss8-b12-card-shell> <zz-n2-tokens> <o18-contrast-census> <ss8r-ruled-rows> <o11-header-gates>`⟩ → r1 `expected 44 · unexpected 0` and r2 `expected 44 · unexpected 0`.
- The 44 tests cover SS8-0363 light and dark, the census legs of o18 in both schemes, SS8-0440 (4), and the four O-11 caption-leg cells, `:272` among them.
- Unit locks: `test/ink.test.ts`, under the describe "prefers-contrast: more never lowers a plate ink's ratio", has 3 tests. With `certifyFor` mutated to ignore the preference, those 3 tests fail and the other 35 pass. With the cure, 38 of 38 pass.
