# F.W0 Lane A — gh-pages unblock (`Github` lucide alias-hygiene fix)

**Wave**: F.W0 Lane A.
**Authority**: `docs/tranches/F/waves/F.W0.md` (Lane A) + `F-AUDIT-3` §3 + §4.1 + `F-AUDIT-5` §5.1.
**HEAD at dispatch**: `188bd6b` (verified: `git log -1 --format=%H` matches).
**Branch**: `tranche-f`.

## §1 — Pre-fix state

### §1.1 `npm run gh-pages` failure trace (excerpt)

```
✗ Build failed in 979ms
error during build:
Build failed with 2 errors:

[MISSING_EXPORT] "Github" is not exported by "node_modules/@lucide/vue/dist/esm/lucide-vue.mjs".
   ╭─[ demo/@/components/custom/dock/menus/MobileMenuDropdown.vue?vue&type=script&setup=true&lang.ts:12:25 ]
   │ import { Share2, Check, Github, LogIn, LogOut, Copy, RefreshCw, MoreVertical } from "@lucide/vue";
   │                         ───┬──
   │                            ╰──── Missing export

[MISSING_EXPORT] "Github" is not exported by "node_modules/@lucide/vue/dist/esm/lucide-vue.mjs".
   ╭─[ demo/@/components/custom/dock/menus/ProfileSection.vue?vue&type=script&setup=true&lang.ts:21:25 ]
   │ import { Share2, Check, Github, LogIn, LogOut, Copy, RefreshCw, UserCircle } from "@lucide/vue";
```

### §1.2 vue-tsc baseline

`npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` → **120** (matches F-AUDIT-3 §3 gate 2 at F open).

## §2 — Investigation: is there a canonical `Github` rename in `@lucide/vue@1.16.0`?

W9-C commit body (`02ed508`) explicitly punts:

> Per W9-C-spec §1.3 the alias-hygiene pass (AlertCircle->CircleAlert, etc.) and brand-icon removal (e.g., `Github` no longer exported from `@lucide/vue@1.x`) are explicitly out-of-scope for this LOCKSTEP — they fold into a follow-up wave.

That is a **removal**, not a rename. Direct enumeration of @lucide/vue@1.16.0's 5874 exports for any git/hub/brand/fork/repo substring (`Object.keys(require('@lucide/vue')).filter(k => /git|hub|brand|fork|repo/i.test(k))`) returned the full `Git*` family (`GitBranch`, `GitCommit`, `GitFork`, `GitMerge`, `GitPullRequest*`, `FolderGit*`, …) and the `Fork*` family — but **NO `Github` brand-mark**. F-AUDIT-5 §5.1 confirms: "Lucide 1.x line stripped vendor brand glyphs by design".

None of the surviving `Git*` icons (branch, commit, fork, graph, merge, pull-request) are the semantically-correct substitute for a "View on GitHub" / "Visit GitHub repository" dock entry — they refer to git-workflow concepts (branching, merging, pull-requests), not to the GitHub platform brand.

The canonical fix surfaced in F-AUDIT-5 §5.1: **inline-SVG the GitHub brand mark**. The audit ranks 3 candidates (`Code` generic; inline SVG; `@iconify-json/radix-icons` substitute) and selects the inline-SVG path as the semantically-correct one. Rationale: the GitHub brand mark has no Lucide canonical because Lucide-1.x intentionally stripped vendor brand glyphs; substituting a non-brand Lucide icon loses the platform-recognition affordance for end users.

## §3 — Files modified

### §3.1 `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue`

**Before** (lines 3-5):
```ts
import {
    Share2, Check, Github, LogIn, LogOut, Copy, RefreshCw, MoreVertical,
} from "@lucide/vue";
```

**After**:
```ts
import {
    Share2, Check, LogIn, LogOut, Copy, RefreshCw, MoreVertical,
} from "@lucide/vue";
```

**Before** (template, the "GitHub" dock entry):
```html
<DropdownMenuItem class="text-small gap-2 cursor-pointer" as-child>
    <a href="https://github.com/mkbabb/value.js" target="_blank" rel="noopener noreferrer" class="no-underline text-foreground">
        <Github class="w-3.5 h-3.5" /> GitHub
    </a>
</DropdownMenuItem>
```

**After**:
```html
<DropdownMenuItem class="text-small gap-2 cursor-pointer" as-child>
    <a href="https://github.com/mkbabb/value.js" target="_blank" rel="noopener noreferrer" class="no-underline text-foreground">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91…"/>
        </svg>
        GitHub
    </a>
</DropdownMenuItem>
```

### §3.2 `demo/@/components/custom/dock/menus/ProfileSection.vue`

Same shape of change: `Github` removed from the `@lucide/vue` named-import list; `<Github class="w-3.5 h-3.5" />` replaced with the inline-SVG `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">…</svg>` element. The surrounding `<a href="https://github.com/mkbabb/value.js">` link and `DropdownMenuItem` wrapper are unchanged.

## §4 — Substitute glyph: rationale

**Chosen substitute**: inline `<svg>` element carrying the canonical GitHub brand-mark path (Octicons-style filled mark, viewBox `0 0 24 24`, `fill="currentColor"`).

**Rationale**:

1. **No canonical Lucide replacement**: @lucide/vue@1.16.0's 5874-export enumeration contains zero brand-mark candidates. The `Git*` family refers to git-workflow concepts (not the GitHub platform), so substituting any of them loses the platform-recognition affordance.
2. **Semantic preservation**: F-AUDIT-5 §5.1 explicitly recommends inline-SVG ("The semantically-correct path is the inline SVG (GitHub's brand mark has no Lucide canonical because Lucide-1.x stripped vendor brand glyphs)").
3. **Consumer-contract parity**: the inline SVG uses `viewBox="0 0 24 24"` (matching Lucide's standard) and `fill="currentColor"` (matching Lucide's stroke-currentColor theming pattern). The existing `class="w-3.5 h-3.5"` Tailwind classes carry through unchanged — the SVG is a drop-in replacement, no callsite-level prop renaming.
4. **`aria-hidden="true"`**: the adjacent visible "GitHub" text label carries the a11y semantics; the icon is decorative.
5. **No new file**: the F.W0 Lane A hard file-bound forbids any new component file (only the 2 demo SFCs + this audit doc). Inlining the SVG at each site (≈ +5 LoC per site) satisfies the bound; a shared `GithubIcon.vue` brand-glyph (audit-suggested alternative at "≈ +30 LoC" total) would breach the file-bound and is correctly deferred to a future lane.

## §5 — Post-fix verification

| Gate | Before | After | Verdict |
|---|---|---|---|
| `npm run gh-pages` exit code | non-zero (`[MISSING_EXPORT]` × 2) | **0** | **PASS** (chronic closed) |
| `npm run build` exit code | 0 | 0 | **PASS (flat)** |
| `npx vue-tsc --noEmit` error TS count | 120 | **118** | **PASS (−2)** |
| Stale `Github` references in `demo/@/components/custom/dock/menus/` | 4 (import × 2, template × 2) | **0** | **PASS** |

### §5.1 `gh-pages` post-fix trace (tail)

```
dist/gh-pages/assets/index-DdRf60Hh.js                         320.94 kB │ gzip: 104.86 kB
dist/gh-pages/assets/glass-ui-BM-QRmvM.js                      409.64 kB │ gzip: 116.48 kB
✓ built in 5.62s
```

### §5.2 Library `npm run build` post-fix trace (tail)

```
dist/standalone-CSWytAYg.js  113.61 kB │ gzip: 36.19 kB
dist/value.js                124.98 kB │ gzip: 38.36 kB
dist/postcss-Crs0wH0W.js     197.35 kB │ gzip: 47.16 kB
✓ built in 3.73s
```

`dist/value.js` size flat at 124.98 kB (matches F-AUDIT-3 §3 gate 4 post-W10-β baseline). Library surface unaffected.

### §5.3 vue-tsc delta (120 → 118)

The 2-error drop matches F-AUDIT-3 §3 "Gate 2 (vue-tsc): … the W9-C lucide rename added +2 (Github icon gap)". With the `Github` symbol removed from both import lists, the 2 TS2305 errors ("Module '\"@lucide/vue\"' has no exported member 'Github'") close, returning the count to the pre-W9-C 118 baseline. Net: −8 from the vue-tsc 2→3 lift is preserved; +2 W9-C chronic is closed.

### §5.4 Residual `Github` references in modified subtree

```
$ grep -rn "Github" demo/@/components/custom/dock/menus/
(no output)
```

No stale references. The hyperlinks (`href="https://github.com/mkbabb/value.js"`) and the visible label text "GitHub" remain — those are URL/UI-string content, not symbol imports, so they are correctly preserved.

## §6 — Sub-gate verdict

**Sub-gate A**: **PASS**.

- 2 demo files migrated off the missing `Github` symbol (inline-SVG brand-mark substitute).
- `build:gh-pages` GREEN (was BROKEN at F open per F-AUDIT-3 §3 gate 12).
- vue-tsc count dropped exactly 2 (120 → 118), matching the audit prediction.
- Library build remains GREEN (gate 4 unaffected).
- Zero stale `Github` symbol references in the modified subtree.

## §7 — Cross-references

- **F-AUDIT-3 §3 gate 12**: was REGRESS ("`build:gh-pages` BROKEN — Github icon missing from @lucide/vue"); at F.W0 Lane A close, this gate transitions to **PASS**.
- **F-AUDIT-3 §4.1** ("NEW REGRESSION — `build:gh-pages` blocked by missing `Github` icon"): chronic CLOSED at F.W0 Lane A.
- **F-AUDIT-5 §5.1** ("Migrate the 2 dock-menu `Github` imports off @lucide/vue"): transposition COMPLETED at F.W0 Lane A; wave-slot estimate 0.1 was accurate (mechanical 2-file edit + audit doc).
- **W9-C commit `02ed508` open question** ("See open question on `Github` regression (2 demo files; pre-existing baseline already failing typecheck red)"): RESOLVED at F.W0 Lane A.
