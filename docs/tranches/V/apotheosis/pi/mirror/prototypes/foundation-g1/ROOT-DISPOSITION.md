# Foundation G1 root disposition

**Verdict: REJECTED AS AN INTEGRATION UNIT.** No synthesis seat may run and no
candidate may be promoted from this subject.

The exact subject is
`687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764`.
Its five exact skeptic reports are:

- semantic: `ddce315957019fb841c2d170ee7a651643382e622b5ed4544e6bbc4c08d6ad65`
- architecture: `6628be978ac103145ab484435d660363498059486328b54c998e90a8fc7a1c91`
- state/hostile: `07214eb7d6834228210f3007463f445abd290153054d8cd76b70436c6990d728`
- benchmark: `583e087cb12594fe42d51f8df0b97ca3effb9e2185142a133a18dd99319574ac`
- gestalt: `68253a2d39dc9c794cff0e2803d5fd8df30626dd16aa67e215db901ef900b5c2`

The first four reviews establish useful candidate evidence: all three direct
parse-that implementations satisfy the frozen narrow semantics, exhaustive
Unicode domain, parser-state, hostile, browser, and candidate-local performance
rails. The fifth review establishes blocking tranche defects shared by the
contract:

1. the omnibus subject conflates independently owned grammar features;
2. `CssNumber` is wrongly re-declared by percentage and dimension depends on it;
3. generic dimension parsing is improperly fused with an unsettled closed unit
   classifier;
4. EOF recovery in escapes, comments, and strings is not observable;
5. exported nullable `cssTrivia` is unsafe as an ordinary alternative.

G2 may reuse the candidates only as historical evidence. It must expose
separate feature verdicts, keep generic dimensions outside the foundation,
make recovery outcomes explicit in the direct productions, and export only a
consuming spacing production. There is no lexer, token tape, atom, CST, cursor,
or generic remainder authorization.
