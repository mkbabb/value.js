# Frontend pre-execution source contract v2 — hostile C

Verdict: `AMEND / SOURCE_CONTRACT_RED`

Reviewed coordinate:

- Markdown `eab76261d8481f2d48ea929b4936e83f06a4efc795a6e6ffa42b14292be06a68`;
- JSON `da91064fb49b2d38fbf2160c10b6262a4e1296c6b3a7f0defd15211c1d28d08e`.

JSON parsing is green and duplicate keys are zero. No edits or execution
occurred.

## First material falsifier

`EXTERNAL_AUTHORIZATION_ISSUER_UNAUTHENTICATED`, validation gate 1.

The authorization has no trusted issuer lineage, canonical root/checksum
coordinate, signature, controller receipt, or independently pinned
authorization identity. The writer copies `SOURCE-PACKET-AUTHORIZATION.json`
into the inner payload and compares only against that copy. The validator is
simultaneously required to make zero external reads.

A writer can therefore author the absence receipt, authorization, lineage
trust, packet, and terminal tuple consistently. Outside-root location proves
location, not provenance.

## Secondary defects

1. Hostiles A/B's expected-membership and snapshot-root trust gap remains.
2. D2 has no subject or member-subject foreign key, and there is no exact
   subject-to-D1-to-D2 closure bijection.
3. Cells do not exact-join their axis tuple to applicability and state-case
   tuples, do not prove all 14 expectation products, and do not bind a
   platform profile.
4. Runtime authorization omits argv, cwd, environment, stdin, and the receipt
   controller.
5. Process receipts seal only stream counts/hashes, not raw stream artifacts.
6. control leaves and non-owner denominators remain caller-supplied.
7. The external terminal tuple lacks an exact schema, issuer, controller, and
   authorization-SHA join.

## Smallest repair

A root-issued authorization receipt must be checksum-bound in a canonical
coordination coordinate before writer dispatch and consumed as an exact
allowlisted external validator input. It must pin issuer lineage,
authorization bytes, capture receipt, snapshot/expected-membership/axis roots,
runtime controller and invocation, control denominator, and terminal-tuple
schema. The later tuple must bind the same authorization identity.
