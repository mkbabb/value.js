# X.P.W7P — the release chain (GATE-KEYED on the owner's npm one-time password)

**Minted by:** COHESION §0cp (2026-09-24). **Opens when:** the owner supplies an npm one-time password, or publishes step 1 themselves, **and** X.P.W7 has CLOSED its engineering gates. **Model:** Opus 5.5. **Record:** `docs/tranches/X/execution/D/X-P-W7P.md`.

## Chain, strictly serial (from the X.P.W7 close residuals)
1. **parse-that 2.0.0.** From `/Users/mkbabb/Programming/parse-that-x-p-w7/typescript`: `npm whoami`, `git status --porcelain` clean, `npm run build`, then `npm publish --access public --otp=<code>`. Push the tag.
2. **bbnf-lang lockfile.** In `/Users/mkbabb/Programming/bbnf-lang-x-p-w7-typescript/typescript`: remove the linked `node_modules/@mkbabb/parse-that`, run `npm install` (the lockfile regenerates against the published 2.0.0), run vitest, tsc and build, and commit the lockfile on the branch.
3. **bbnf-lang 0.2.0.** `npm publish --access public --otp=<code>` from the same directory.
4. **value.js dependency move (ESC-W7v-1).**
   - Run `npm uninstall @mkbabb/parse-that @mkbabb/bbnf-lang && npm install --save-dev --save-exact @mkbabb/bbnf-lang@0.2.0`.
   - Re-read the `package.json` diff.
   - Run `node scripts/gen-grammar.mjs --check`.
   - Add that check as a CI step after the equivalence step.
   - Run `npm test` and the equivalence program.
   - Commit.
5. **`.z` re-opens.**
   - Z-1..Z-2: re-read the bench of record on the published pins after a fresh install, both input halves, all engines.
   - Z-3: send the relays and write the COHESION row: RES-x-1 and OC-1's speed half GREEN, BBNF-TS-TOOLCHAIN discharged.
   - Z-4: merge bbnf-lang PR #1 by `gh pr merge --merge`. Local bbnf-lang master is never touched.

## Law
Each publish runs only after its package's own gate is GREEN on a clean tree. A one-time password is used once and never written to any file.
