<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/CLEAN-A-CA01-ABSORPTION-RECEIPT-2026-07-29.md
  original-mtime: 2026-07-29T20:07:27
  original-sha256: 6521250dc250a7ea45a3b06fba48a1193404fd16ebe23ae9a1ec7e2bf6c7a2b6
  original-bytes: 4643
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value Clean A CA-01 — owner absorption receipt

Date: 2026-07-29
Mode: formation-only
Owner verdict: **AMEND ACCEPTED AND ABSORBED; REPLACEMENT CLEAN A REQUIRED**
Execution credit: **0**

## Clean A intake

Root and the Value owner independently verified exactly three immutable files:

```text
c90203db8cd7b539721d318f69ad6c58f7ac8ea0da86a9d5ddf6a2bc99c35b76  VALUE-FORMATION-CLEAN-A.md
0e63126722aaa039d02520a0131fd11632db33bc93f07128886b28cab2f60598  CLEAN-A-VALIDATION.json
c858f9545460fb3ae161cf069b1205d27cfa5f40664e01c2c134315b4399739e  RECEIPT.md
```

Clean A's `AMEND` verdict and sole finding CA-01 are accepted. Final P3
registry
`00fd0b7957cad35643addf31b8c990eb83515414841c6bc9f2452b16672216dc`
is sound and unchanged.

## Smallest absorption

Only two formation documents changed:

```text
packet:  aa6840601388258246677c1c619deeadd763d5dbddb56f9feb92b2b803961840
      -> 359262b6bc5ffd7285e0305499d31b4dfc44b592207b772823d932a4d3c6017b

surface: 94057b63ee10d68ee51eba1df4a79082c7758f79a4862abf378b159ee4c612ee
      -> f9a98d7df6addf6e0d61d2adfad7340e667f503486668da0403f1861c3965b96
```

The post-absorption contract is exact:

```text
53 /css references across 51 files
= 49 direct imports across 47 files
+ 2 import.meta.resolve probes
+ 2 bench HTML import-map keys
```

V.L6 Born RED, completion, and artifacts now require terminal classification
for all 53 references and explicit classification of all four non-import
literals. The Keyframes surface's census and W2 freeze condition require the
same complete denominator. A 49-site map can no longer false-close the
contract.

No family ID, terminal disposition, owning wave, wave order, package
placement, public signature, product source, or P3 registry changed.

## Coverage reseal

The new machine authority is:

```text
fa2c4959937338465abc7609f4e631c77b01112035f2497ce5bad0cf1caa312e  CLEAN-A-ABSORPTION-MANIFEST-2026-07-29.json
838c01c1f6137289b31b009daa0cdc6039ecace712133372903119b66a3c603b  validate-clean-a-absorption.mjs
```

The manifest preserves the old packet/surface hashes as historical pass
coordinates, binds the new packet/surface hashes as post-absorption authority,
binds all three Clean-A output hashes and unchanged P3, records the exact
53/51 class counts, and keeps replacement Clean A and Clean B blocked pending
root coordination.

The existing 18-family denominator remains immutable:

```text
1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85
```

It continues to bind P1/P2/P3 historical coverage. It is not rewritten to
pretend CA-01 existed before Clean A. The new absorption manifest is the
post-Clean-A coverage authority.

## Independent validation

The owner ran:

```text
node validate-clean-a-absorption.mjs \
  CLEAN-A-ABSORPTION-MANIFEST-2026-07-29.json \
  VALUE-FORMATION-PACKET-2026-07-29.md \
  KEYFRAMES-VALUE-SURFACE-2026-07-29.md
```

Exit 0 reported manifest `fa2c4959…`, packet `359262b6…`, surface
`f9a98d7d…`, exact class counts, no stale 49-site map, no failures, and
`ok: true`.

The stock full-subject validator rerun against final P3, predecessor
`82a8b33e…`, and denominator `1d6df52a…` also exited 0 with 18/18 families
and no failures.

Fresh read-only Keyframes census under `src demo test bench` returned:

```text
all references:       53
all files:            51
direct imports:       49
direct-import files:  47
import.meta.resolve:   2
bench HTML keys:       2
```

The non-import witnesses are:

```text
bench/computed-real-dom.bench.ts
bench/playwright.bench.ts
bench/loaf-scene.html
bench/computed-scene.html
```

`git diff --check` is green.

## Root reseal gate

Before root absorbs this receipt, the live constellation validator correctly
fails one evidence-byte gate:

```text
V.form.packet-candidate evidence bytes do not match
.../VALUE-FORMATION-PACKET-2026-07-29.md
```

That RED state is expected because the graph still binds pre-absorption packet
SHA `aa684060…` at the now-amended packet path. Root must not waive it. Root
must:

1. bind current packet `359262b6…` and surface `f9a98d7d…`;
2. add/bind CA-01 absorption manifest `fa2c4959…` as post-Clean-A coverage;
3. preserve old packet/surface hashes only as historical P1/P2/P3/Clean-A
   coordinates;
4. reseal graph JSON, Markdown, validator, and validation receipt together;
5. rerun all graph mutants and exact evidence-byte checks; and
6. return the immutable post-absorption tuple.

Only after that tuple exists may the Value owner finalize a bounded
replacement fresh-Clean-A dispatch. Clean B remains blocked until the
replacement Clean A is clean, immutable, owner-intaken, and absorbed.
