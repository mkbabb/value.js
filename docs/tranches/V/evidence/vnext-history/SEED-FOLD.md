# Seed-authority fold

This evidence epoch preserves the superseded verbose seed inventory and its
separate formation-root projection. The active formation replaces both with a
single compact, lossless 149-row authority whose decoder reconstructs the same
owner projections and terminal decisions.

- files: 2
- bytes: 80,806
- canonical ledger SHA-256: `8f546a5cfa8047a95782e34eeed0e8d79a7e2dc6a68446e14d4b029d4e1e6dc7`

Canonical ledger rows are `sha256<TAB>bytes<TAB>path<LF>` in path order:

```text
f26fb966a24433aecd58f8cc8d40f759324a52d3e126af9d9c0d58d6fa932cac	3674	data/FORMATION-ROOT-SEED-CONTRACT.json
c794c808a54f1025459a595a125f29b4535b545113aac55dd9cf15f9c551e267	77132	data/SEED-ROW-INVENTORY.json
```

These files are historical evidence only. They are not active formation
authority and validators must not import them.
