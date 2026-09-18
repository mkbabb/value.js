# CHALLENGE-C — `PaginationBar.vue` implementation audit

Source `demo/palettes/browser/admin/PaginationBar.vue`, lines 1–48, SHA-256 `3006c9b99288b591c70272dada3b587fb5b30a88ef8bf775b67ea8e78b73322c`. Source-only.

**Verdict: SOURCE-RED.** Contradictory inputs can produce false labels and active commands.

## Findings

1. `pageCount > 1` is the sole guard. `page=0`, `page>pageCount`, non-integer, or negative values are rendered verbatim.
2. `hasPrev`/`hasNext` are trusted instead of derived, allowing “Page 1 of 2” with Previous enabled or Next disabled.
3. Events do not include the destination, so parent and child can race against changing props.
4. No pending guard prevents double activation.
5. `aria-live` announces page-text mutations, which are not explicitly bound to completion of the corresponding list request.

Required tests must cover the invalid Cartesian product, rapid activation, deletion reducing `pageCount`, out-of-order responses, and assistive announcement ordering.
