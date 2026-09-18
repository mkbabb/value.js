# V6 hostile B — compatible-state denominator

Verdict: `AMEND_SOURCE_CONTRACT / SOURCE_RED`

Reviewed bytes: JSON `d4820f25e3b2668e1dc1929be6967e4e499353587fb9277d22821c5ca8d8124a`;
Markdown `2351ffca48167de78fabd18a21d548a873ae99fe7f3d5487e0c03fbc3e0ffe6c`.

## First falsifier

`COMPATIBLE_STATE_PROFILE_JOIN_DENOMINATOR_ABSENT`

V6 authenticates axis tuples and platform profiles, but the next denominator
is only the scalar `compatibleRequiredJoinCountDecimal`. There is no closed
join record, exact join-registry member, or root over subject, tuple, state
kind, state vector, platform profile, and compatibility disposition.

A coherent false green can change one compatibility predicate from true to
false, delete its state case, cell, and 98 expectations, decrement the scalar,
and rederive every downstream count and root. The remaining law ranges only
over what is now called compatible. Controls C001–C007 do not own this
omission.

The bounded future remainder is an exact compatible-state-profile join
registry covering every subject by tuple by state kind by profile, with
witnessed REQUIRED/N-A/OPEN dispositions, state-case bijection, dual-deriver
root equality, and one coherent compatibility-descendant deletion control.

No bytes were changed. Authority and credit remain zero.
