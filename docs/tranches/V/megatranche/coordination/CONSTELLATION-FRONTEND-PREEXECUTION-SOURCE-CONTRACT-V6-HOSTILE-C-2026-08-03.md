# V6 hostile C — incomplete validator projection

Verdict: `AMEND_SOURCE_CONTRACT / SOURCE_RED`

Reviewed bytes: JSON `d4820f25e3b2668e1dc1929be6967e4e499353587fb9277d22821c5ca8d8124a`;
Markdown `2351ffca48167de78fabd18a21d548a873ae99fe7f3d5487e0c03fbc3e0ffe6c`.

## First falsifier

`ANSWER_KEY_PROJECTION_FORBIDDEN_SET_INCOMPLETE`

Legacy `CONTROL-MUTATIONS.json` remains a mandatory source member but is not
in the validator projection's forbidden-path set. Projection membership is
chosen through an author-assigned role rather than a closed path-to-role
bijection. A bundle can label the legacy mutation file as candidate semantic
input, carry control-to-target or expected-leaf semantics in it, and let the
validator read it through an authorized, fully traced open. The sandbox,
read-set equality, and sandbox control then all false-green.

`CONTROL-OF-CONTROL-DENOMINATOR.json` has the same classification problem.
Separately, only `CONTROL-BLOB-REGISTRY.json` is mandatory; the exact
before/after blob members themselves are absent from the source denominator.

The bounded future remainder must delete or explicitly forbid every legacy
answer-key path, use an exact path-to-visible-role bijection rather than an
author label, and materialize every registered mutation blob as a forbidden
source member.

No bytes were changed. Authority and credit remain zero.
