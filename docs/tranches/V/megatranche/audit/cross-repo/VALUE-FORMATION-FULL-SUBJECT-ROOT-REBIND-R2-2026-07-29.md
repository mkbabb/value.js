# Value full-subject formation — root rebind R2

**Date:** 2026-07-29  
**Mode:** tranche development only  
**Ruling:** `FORMATION ADMITTED — ORDERED EXECUTION NOT STARTED`

## Supersession

The first root rebind receipt at SHA
`e5ccabd0c7708a0a9d19de26f639168e86f0c0e9cb479fa187324f3ed9cf01e4`
and its quartet are preserved as historical, non-closing evidence.

A post-bind hostile critic verified the underlying Value P1/P2/P3, replacement
Clean A, Clean B, denominator, and admission bytes, but falsified the root
validator:

1. admission could reuse Clean B's secondary `RECEIPT.md`;
2. Clean B could omit its validation, receipt, or owner intake;
3. zero execution/product/visual/release credit existed only in prose;
4. root-node membership was not owned by an immutable manifest.

No Value pass, audit, component, wave, source, or product bytes were rerun or
changed to repair those root-only defects.

## Immutable binding

Root now binds
`VALUE-FORMATION-ADMISSION-BINDING-2026-07-29.json`, SHA
`a27d72a4aac639995f45959aa4086b423db04c5b633b45b1eccfa3140baa44ad`.
That manifest owns:

- the exact eighteen-family denominator path and SHA
  `1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85`;
- the six covered formation nodes P1, P2, P3, Clean A, Clean B, and admission;
- Clean B's ordered report, validation, receipt, and owner-intake tuple;
- admission's exact owner receipt;
- both predecessor SHAs and required satisfied inputs;
- typed credit for formation audit/admission, execution, product, visual,
  release, and constellation close.

The denominator file remains the authority for the eighteen-family subject.
The root binding manifest is the authority for mapping that denominator and
the exact evidence tuples to root DAG nodes.

## Fail-closed controls

The validator now rejects all 29 named wrong answers. The Value admission
family is explicit:

- `M22`: wrong Clean B predecessor;
- `M23`: admission coverage drift;
- `M24`: missing Clean B required input;
- `M25`: incomplete or reordered Clean B evidence tuple;
- `M26`: admission receipt replay;
- `M27`: forbidden credit;
- `M28`: wrong admission predecessor;
- `M29`: missing admission required input.

Every Value Clean B/admission field named in the binding manifest is compared
exactly. Evidence paths remain byte-rehashed on every validator run.

## Resealed root coordinate

| Artifact | SHA-256 |
|---|---|
| Value admission binding manifest | `a27d72a4aac639995f45959aa4086b423db04c5b633b45b1eccfa3140baa44ad` |
| constellation DAG JSON | `b4d46ec1a6b95f9cb7059ef7fa6a8cda3e18e7486c391f4df3757888e45373ae` |
| constellation DAG Markdown | `f77870b0727b89d0c98b6a72b95bb18d018de79859d968e0b25e163227650036` |
| DAG validator | `9073d0f74cbd425c712340239a058df54e7990804f09c170854097a4812558c0` |
| DAG validation receipt | `f2cc76f14edd59e77091b0d772d859749b60354a6b24c51cb570bfa8df4c4544` |

Validation exits zero at 130 unique nodes, 177 unique edges, and 29 of 29
wrong-answer mutants rejected. JSON parsing and `git diff --check` are green.

## Credit boundary

`V.form.cleanB` carries formation-audit evidence only.
`V.form.admission` carries formation admission only. Both carry typed `false`
for execution, product, visual, release, and constellation close. Parse-that
and Fourier formation remain open, so constellation Clean A remains blocked.
