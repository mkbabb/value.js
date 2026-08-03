# CHALLENGE-L — `PaginationBar.vue` library-boundary audit

Source `demo/palettes/browser/admin/PaginationBar.vue`, lines 1–48, SHA-256 `3006c9b99288b591c70272dada3b587fb5b30a88ef8bf775b67ea8e78b73322c`. Static audit only.

**Verdict: SOURCE-RED.** The component uses a producer button through a stale axis and carries pagination truth as four unrelated scalars.

## Findings

- `Button` arrives via a forwarding barrel; `variant="outline"` is not the installed glass-ui Button API and becomes dead intent.
- `page`, `pageCount`, `hasNext`, and `hasPrev` can contradict each other. A library boundary should accept one normalized pagination state.
- Events `prev`/`next` carry no target page, query generation, or request identity.
- The live-region sentence is locally authored; other paginated surfaces can announce at a different phase.
- This generic pattern belongs either in glass-ui or in a shared application collection package, not independently in each admin panel.

Target: `PaginationState = unknown | ready({page,count}) | loading({from,to}) | error(...)` plus a named command result, using real producer emphasis/tone axes.
