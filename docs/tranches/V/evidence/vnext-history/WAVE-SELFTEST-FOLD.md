# Wave self-test fold

The apparatus diet displaced two standalone formation self-tests after their
mechanisms were folded into the retained validators. They remain byte-preserved
history only and grant no current green credit.

| Historical path | Bytes | SHA-256 | Retained owner |
|---|---:|---|---|
| `tools/selftest-wave-edge-policy.active-standalone.mjs` | 4701 | `7224b1457ffa6993acce0538383c72d232b6682389e17306683f4187c7faf66b` | `vnext/tools/validate-wave-contracts.mjs` |
| `tools/selftest-wave-table-contract.active-standalone.mjs` | 2483 | `7509c7fe6639a2c17fcfb72a69102006b29b5f29df9ebff31b75ca1d310a83b0` | `vnext/tools/validate-formation.mjs` |

The paths are relative to this evidence root. Any future edit creates a new
historical row; it cannot silently replace either byte identity.
