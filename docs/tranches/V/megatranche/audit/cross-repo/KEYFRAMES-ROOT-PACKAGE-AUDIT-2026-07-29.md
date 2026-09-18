# Keyframes root package audit

**Date:** 2026-07-29  
**Mode:** independent read-only census; tranche development only  
**Product-source edits:** none

The current Keyframes `package.json` and lock directly retain
`class-variance-authority` and `reka-ui` as development dependencies. A fresh
import-declaration census across `src/**` and `demo/**` finds zero direct
imports of either package. Remaining live-source matches are comments and CSS
descriptions of DOM emitted by Glass components; an implementation detail of a
producer does not create a Keyframes package owner.

## Required fold

- Expand W7.a's package bounds from only the Glass coordinate to the complete
  direct UI dependency slice.
- PRUNE the two direct dependency and lock edges unless a generated, build, or
  test consumer is proven before W7 executes.
- Do not infer direct ownership from `node_modules` or source-DAG edges inside
  Glass.
- Keep the intended end state: Keyframes declares one immutable built Glass
  producer, with no shadcn residue, copied component path, source alias, or
  compatibility dependency.

The Keyframes lane received this batch as `K-PKG-01`.
