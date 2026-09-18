# CHALLENGE-C — `ConsoleRail.vue` implementation audit

Source `demo/picker/controls/ComponentSliders/ConsoleRail.vue`, lines 1–329, SHA-256 `a37d644bfda320772782c72ccb67e8433a04a691ad9101f36467abcfd5b6e279`. Static inspection only.

**Verdict: SOURCE-RED.** Happy-path navigation is thoughtful, but invalid inputs and dynamic channel changes can leave focus state broken or stale.

## Findings

1. `const selected = active ?? components[0]` treats an unknown non-null `active` as authoritative; every tab then gets `-1`.
2. `railItemEls` is only assigned. Removed channels are never deleted, so dynamic space changes retain stale element references.
3. Duplicate component IDs produce duplicate keys and overwrite the element registry.
4. `componentDescription` uses prefix matching after an `any` cast. In current ICtCp metadata, `cp` uppercases to `C` and can match `Ct (tritan)` before the correct `Cp (protan)` row.
5. `currentColorRanges[component]` is rendered without an unavailable fallback.
6. The tab pattern emits selection and moves focus but does not bind `aria-controls` or verify a selected panel. Semantic behavior and accessibility role can diverge.
7. The live surface probe is triggered at mount; provider/theme changes before a stable style read rely on external cache semantics not represented here.

## Required verification

Empty/duplicate/reordered/dynamic components, invalid active ID, all color spaces, provider absence, rapid theme/color changes, keyboard wrap, focus after channel deletion, screen-reader role/relationship, and forced-colors. Source closure also requires removing `any` from metadata lookup.
