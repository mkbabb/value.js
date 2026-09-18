# Auth-cookie response order — terminal V ruling

## Finding

The former V draft inferred a browser-global ordering guarantee from a 30-second IndexedDB lease, a ten-second edge-to-origin deadline, and a drain interval. That inference is false. The deadline can prevent the edge from accepting a late **origin** response; it cannot bound delivery of a response the edge has already emitted, nor can JavaScript observe or conditionally reject an HttpOnly `Set-Cookie`. [RFC 6265 §4.1.1](https://www.rfc-editor.org/rfc/rfc6265.html#section-4.1.1) explicitly identifies concurrent `Set-Cookie` responses as a race with unpredictable behavior; its storage model replaces an existing cookie when name/domain/path coincide.

## DECIDED disposition

**RETIRE the no-late-overwrite claim.** V keeps the single host-only HttpOnly session-cookie design and does not add a JavaScript bearer, alias cookie, multi-cookie event log, device fingerprint, receipt endpoint, or second auth path merely to manufacture an ordering claim the browser does not expose.

The exact retained contract is narrower and security-complete:

1. The edge buffers the full origin response and emits the session cookie only when the origin response settles within ten seconds and 65,536 bytes. This is an edge/origin settlement guarantee only.
2. Server authorization never trusts arrival order. A superseded, revoked, expired, or stale-policy token cannot authorize `/sessions/me` or a new effect; only its exact receipt-bound replay exception may retrieve already-authorized non-secret bytes.
3. The IndexedDB lease and drain remain a best-effort reduction of concurrent browser transitions, not evidence about the network after emission.
4. If a same-name stale response nevertheless wins the user agent's cookie race, `/sessions/me` resolves to 401 and the Account surface enters one explicit signed-out/recovery state while retaining every non-secret operation result. It never reports the newer session as preserved, silently retries with another credential, deletes data, or calls the stale cookie current.
5. W16 and W33 prove both sides separately: deterministic origin settlement/failure at the edge, and a browser negative probe showing that an injected post-emission stale response can cause fail-closed reauthentication but never stale authorization or false UI success.

This is a terminal product decision, not a banked protocol. A future requirement for seamless cross-response auth continuity would require a new, independently reviewed browser-bound credential protocol; it cannot be smuggled into V as a gate or lease tweak.
