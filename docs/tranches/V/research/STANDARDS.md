# Tranche V — Primary Standards Basis

This note records the small external basis used to formulate product semantics. It does not create a compliance framework or a second gate suite; live code, real-stack behavior and rendered interaction remain decisive.

## HTTP mutation truth

- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) defines strong validators, `If-Match`, conditional-request ordering and `412 Precondition Failed`. V therefore associates each validator with one resource and performs the comparison in the database mutation filter; Publish supplies both mutable resource clocks explicitly.
- [RFC 5789 — PATCH Method for HTTP](https://www.rfc-editor.org/rfc/rfc5789.html) calls out collision/lost-update risk for patching a shared resource. V does not treat an earlier route-level ETag check as concurrency control.

## Accessibility and motion

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) is the normative behavioral basis for keyboard operation, dragging alternatives, focus appearance/not-obscured, target size, reflow, status/error semantics and pause/stop of moving content. V's product policy is intentionally stricter at coarse-pointer hit regions (44px) while retaining small visual specimens where the effective hit polygon is proven.
- Conformance is not inferred from a score. W30 records keyboard, VoiceOver/Safari, NVDA/Chrome and touch-screen-reader journeys; W32 reruns those affected by later loading/font/renderer tuning.

## Performance vocabulary

- [Largest Contentful Paint](https://www.w3.org/TR/largest-contentful-paint/) exposes candidate entries, not a dependable in-session “final LCP happened” scheduling signal. V queues eligible renderers after critical paint/idle and later verifies their request follows the recorded critical candidate without creating a larger later candidate.
- [Core Web Vitals threshold methodology](https://web.dev/articles/defining-core-web-vitals-thresholds) defines the good thresholds used here: LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at p75. W31 labels controlled results **lab Web Vitals**; only deployment RUM may support field claims.

The plan's 20-run release sample and two-hardware renderer budgets are V execution decisions, not claims that these sources prescribe that exact lab protocol.
