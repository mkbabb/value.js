// Minimal flat ESLint config — hygiene gate for D.W1 §L7.
//
// Goal: `npm run lint` exits 0 cleanly. The rule set is intentionally
// permissive — this is a smoke gate (CI must pass), not opinionated linting.
// Tightening is deferred to a later wave.
//
// Relaxations (rationale):
//   - `@typescript-eslint/no-explicit-any` — codebase has ~hundreds of intentional `any`
//     usages (parser combinators, dynamic CSS values). Tightening is a separate epic.
//   - `@typescript-eslint/no-unused-vars` — many destructure-and-discard patterns
//     in tests + composables; would generate >100 churn-only diffs.
//   - `@typescript-eslint/no-empty-object-type` / `@typescript-eslint/no-unsafe-function-type`
//     — appears in tests for type assertions; not worth gating on.
//   - `no-irregular-whitespace` — tests use non-ASCII separators intentionally.
//   - `prefer-const` — same as no-unused-vars rationale.
//   - `no-prototype-builtins`, `no-useless-escape`, `no-empty`, `no-control-regex` —
//     parser code uses these patterns intentionally.
//   - `vue/multi-word-component-names` — many single-word components by design.
//   - `vue/no-mutating-props` — handled at design level; rule too aggressive.
//   - `vue/no-v-html` — markdown rendering uses it intentionally.
//   - `vue/no-reserved-component-names` — glass-ui re-exports clash; intentional.
//   - `vue/no-unused-vars` / `vue/no-unused-components` — same as TS unused-vars.
//   - `vue/require-default-prop` — Vue 3.5 reactive-props destructure handles defaults.
//   - `vue/no-parsing-error` — fragments in templates parse fine at runtime.
//   - `vue/valid-template-root` — some markdown-injected components are technically empty.
//   - `vue/return-in-computed-property` — false positives with `if/throw` patterns.
//   - `no-undef` — TypeScript handles symbol resolution; ESLint can't see TS types.

import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "coverage/**",
            // Documentation and banked tooling (tranche workflow/probe
            // scripts), not product code (COHESION §0bt.3).
            "docs/**",
            ".playwright-mcp/**",
            // Session-harness worktrees + symlinks (e.g. a `keyframes.js`
            // symlink to a sibling DIRECTORY, which `eslint .` globs as a .js
            // file and EISDIR-crashes on). Never lintable content.
            ".claude/**",
            "test-results/**",
            "playwright-report/**",
            "demo/**/dist/**",
            "api/**/dist/**",
            "api/node_modules/**",
            "**/*.glsl",
            "**/*.md",
        ],
    },
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            // Disable all type-aware rules + most stylistic rules.
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-wrapper-object-types": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/triple-slash-reference": "off",
            "no-unused-vars": "off",
            "no-undef": "off",
            "no-empty": "off",
            "no-empty-pattern": "off",
            "no-prototype-builtins": "off",
            "no-useless-escape": "off",
            "no-control-regex": "off",
            "no-irregular-whitespace": "off",
            "no-cond-assign": "off",
            "no-constant-condition": "off",
            "no-fallthrough": "off",
            "no-misleading-character-class": "off",
            "no-self-assign": "off",
            "no-sparse-arrays": "off",
            "no-unsafe-finally": "off",
            "no-unsafe-optional-chaining": "off",
            "no-useless-catch": "off",
            "prefer-const": "off",
            "prefer-rest-params": "off",
            "prefer-spread": "off",
            "no-case-declarations": "off",
            "no-async-promise-executor": "off",
            "no-func-assign": "off",
            "getter-return": "off",
            "valid-typeof": "off",
            "no-redeclare": "off",
            "no-import-assign": "off",
            "no-setter-return": "off",
        },
    },
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "no-unused-vars": "off",
            "no-undef": "off",
            "no-empty": "off",
            "no-prototype-builtins": "off",
            "no-useless-escape": "off",
            "no-irregular-whitespace": "off",
            "prefer-const": "off",
            "no-control-regex": "off",
            "no-cond-assign": "off",
            "no-constant-condition": "off",
            "no-case-declarations": "off",
            "no-fallthrough": "off",
        },
    },
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: "latest",
                sourceType: "module",
                extraFileExtensions: [".vue"],
            },
        },
        plugins: {
            vue,
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            // Disable all vue stylistic rules — KISS hygiene gate only.
            "vue/multi-word-component-names": "off",
            "vue/no-mutating-props": "off",
            "vue/no-v-html": "off",
            "vue/no-reserved-component-names": "off",
            "vue/no-unused-vars": "off",
            "vue/no-unused-components": "off",
            "vue/require-default-prop": "off",
            "vue/no-parsing-error": "off",
            "vue/valid-template-root": "off",
            "vue/return-in-computed-property": "off",
            "vue/no-template-shadow": "off",
            "vue/no-side-effects-in-computed-properties": "off",
            "vue/no-dupe-keys": "off",
            "vue/no-use-v-if-with-v-for": "off",
            "vue/require-v-for-key": "off",
            "vue/valid-v-slot": "off",
            "vue/no-deprecated-slot-attribute": "off",
            "vue/no-deprecated-v-bind-sync": "off",
            "vue/no-deprecated-dollar-listeners-api": "off",
            "vue/no-deprecated-events-api": "off",
            "vue/no-deprecated-filter": "off",
            "vue/no-deprecated-html-element-is": "off",
            "vue/no-deprecated-props-default-this": "off",
            "vue/no-deprecated-router-link-tag-prop": "off",
            "vue/no-deprecated-scope-attribute": "off",
            "vue/no-deprecated-slot-scope-attribute": "off",
            "vue/no-deprecated-v-is": "off",
            "vue/no-deprecated-v-on-native-modifier": "off",
            "vue/no-deprecated-v-on-number-modifiers": "off",
            "vue/no-deprecated-vue-config-keys": "off",
            "vue/no-lone-template": "off",
            "vue/no-multiple-template-root": "off",
            "vue/no-textarea-mustache": "off",
            "vue/no-unused-properties": "off",
            "vue/comment-directive": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": "off",
            "no-undef": "off",
            "no-empty": "off",
            "no-prototype-builtins": "off",
            "no-useless-escape": "off",
            "no-irregular-whitespace": "off",
            "prefer-const": "off",
        },
    },
    {
        // inv-K-1 (K.W2) — STRUCTURAL enforcement of the acyclic color topology.
        // The published library (`src/`) imports glass-ui NEVER; the edge is
        // glass-ui → value.js(lib), never the reverse. The `tsconfig.lib` split
        // only makes a `src/`→glass-ui import UNTYPED while glass-ui's dist is
        // absent (it resolves to dist when present) — so the typecheck alone is
        // build-state-dependent. This lint rule makes the ban deterministic and
        // build-state-independent (caught by the K.W2 adversarial review). The
        // demo (`demo/`) may import glass-ui freely; only the library may not.
        files: ["src/**/*.ts"],
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["@mkbabb/glass-ui", "@mkbabb/glass-ui/*"],
                            message:
                                "inv-K-1: the value.js LIBRARY (src/) must never import glass-ui — the topology is glass-ui → value.js(lib), one direction, no cycle.",
                        },
                    ],
                },
            ],
        },
    },
    {
        // G5 (X.W9.a) — the crash SHAPE, not the instance.
        //
        // The shipped `parseCssColor("oklch()")` TypeError was authored by a
        // `!` that silenced `noUncheckedIndexedAccess` on a parse-derived index
        // (`grammar.ts:181`'s `slash[0]!`). Until this object landed, eslint had
        // no rule that could see it: X.W9.a retired 94 assertions under
        // `src/css/` and X.W9.b 155 under the two trees below, but a measured
        // absence is not a ratchet — nothing stopped the next `!` from
        // returning. Authored by X.W9.a, written here by X.W9.f, which is this
        // file's sole writer in the wave (§Disjointness 4a).
        files: ["src/css/**/*.ts"],
        rules: {
            "@typescript-eslint/no-non-null-assertion": "error",
        },
    },
    {
        // G10 (X.W9.b) — the same ratchet over the two trees whose assertions
        // that unit retired: `src/transform/` (decompose 113 · path 35, the
        // matrix family retiring with its module) and `src/foundation/`
        // (math 7, retired by the stated precondition protocol at X.W9.c).
        // Scoped, not src-wide: `src/easing.ts`'s `linearEasing` reads are
        // bounded by its own loop conditions and are outside both authoring
        // units' cures, so widening this glob would assert a green no unit
        // measured. Authored by X.W9.b, written here by X.W9.f (§4a).
        files: ["src/transform/**/*.ts", "src/foundation/**/*.ts"],
        rules: {
            "@typescript-eslint/no-non-null-assertion": "error",
        },
    },
    {
        // G-6 (X.W8.b · CC-078) — THE SHADCN BARRELS STAY DEAD.
        //
        // The 19 `demo/ui/<family>/index.ts` forwarding barrels were pure
        // re-exports of `@mkbabb/glass-ui` (deleted at X-W12U.k `2ae7344d2`);
        // every consumer imports its real owner, the narrowest published glass
        // subpath. This ban makes a re-grown barrel import an error at the
        // product boundary. A segment-exact `ui` match: `@mkbabb/glass-ui/*`
        // and `demo/shared/ui/*` components are not barrel paths and pass.
        //
        // It replaces the two U.W-DEMO objects (G-DEMO-1 · 3a · 3b) whose six
        // globs under the shadcn-era demo tree matched 0 files after W43 and whose
        // patterns named a path alias with 0 importers. One object over the
        // whole demo tree: flat config resolves `no-restricted-imports` by
        // last match wins, so a second demo-region object would clobber it.
        files: ["demo/**/*.ts", "demo/**/*.vue"],
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "**/ui/alert",
                                "**/ui/avatar",
                                "**/ui/badge",
                                "**/ui/button",
                                "**/ui/card",
                                "**/ui/checkbox",
                                "**/ui/collapsible",
                                "**/ui/dialog",
                                "**/ui/dropdown-menu",
                                "**/ui/input",
                                "**/ui/label",
                                "**/ui/popover",
                                "**/ui/radio-group",
                                "**/ui/select",
                                "**/ui/separator",
                                "**/ui/skeleton",
                                "**/ui/slider",
                                "**/ui/switch",
                                "**/ui/tooltip",
                            ],
                            message:
                                "G-6 (X.W8.b): the demo/ui shadcn barrels are deleted — import the real owner, the narrowest @mkbabb/glass-ui subpath.",
                        },
                    ],
                },
            ],
        },
    },
    // G-14 (X.W8.e · CC-082 ⊕ CC-090's measured-cap half) — THE LoC CAP IS A
    // WIRED RATCHET, NOT A CANON NUMBER.
    //
    // One `max-lines` object per band, each pinned at that band's measured
    // worst file at HEAD 62fdd2b3b (2026-10-17; `wc -l` = eslint's own count,
    // blank lines and comments included). GREEN at HEAD by construction: the
    // ratchet forbids growth, it does not claim the cure. A band's number only
    // ever DESCENDS — when a split lands (demo: X-W5/X-W6 owners; src: X-W9's
    // CC-090), the lander lowers the pin to the new measured worst; raising a
    // pin is a canon change, never a lint fix. `docs/tranches/V/ARCHITECTURE.md`
    // §Colocation idiom states the same pins.
    {
        // demo — GradientStopRail.vue
        files: ["demo/**/*.ts", "demo/**/*.vue"],
        rules: { "max-lines": ["error", { max: 1013 }] },
    },
    {
        // src (the library's authored `.ts`; the BBNF-generated `.js` under
        // src/css/bbnf/generated/ is emitted, not authored) — transform/path.ts
        files: ["src/**/*.ts"],
        rules: { "max-lines": ["error", { max: 672 }] },
    },
    {
        // api/src product modules — palette/service/crud-list.ts
        files: ["api/src/**/*.ts"],
        ignores: ["api/src/**/__tests__/**"],
        rules: { "max-lines": ["error", { max: 357 }] },
    },
    {
        // api/src tests — palette/__tests__/palette-versions.test.ts
        files: ["api/src/**/__tests__/**/*.ts"],
        rules: { "max-lines": ["error", { max: 539 }] },
    },
    {
        // X-W4 · X.W4.d gate D2 (CC-043) — THE ACTION PATH CARRIES NO UNTYPED HOP.
        //
        // The repo-wide `@typescript-eslint/no-explicit-any` is "off" (the two
        // objects above, for `**/*.ts` and `**/*.vue`); this object re-arms it as
        // an ERROR over the action path and nothing else. Flat config resolves a
        // rule by LAST MATCH WINS, so this object must stay last for the files it
        // names.
        //
        // The file list is `W4.md` §5 "X.W4.d"'s own Files enumeration — the
        // wave's definition of "the action-path files", authored before the
        // measurement — minus `demo/picker/ColorPicker.vue`, whose single
        // `any` is a display-space bridge on a `ColorSpaceSelector` that types
        // its `modelValue` as `string` (the selector is X-W6/X-W7's file, and
        // §6 D2's own RED census never counted it). Its action-path bytes carry
        // no `any`, and the residual is recorded in the unit receipt rather than
        // silently globbed away.
        //
        // SCOPE, STATED EXACTLY (X-W4 Repair 1 · Check 1 defect 4). D2's gate
        // command's third leg is the GLOB `demo/shell/dock/**`; this object arms
        // seven NAMED files, two of which sit in that glob. The two files inside
        // the glob that carried a type-level `any` the armed run could not see
        // were both `catch (e: any)` and both pre-date this wave (`6dde42ad`):
        //   · `demo/shell/dock/layers/SlugEditLayer.vue:57` — a W4 §4 row, CURED
        //     at Repair 1 to `catch (e: unknown)`;
        //   · `demo/shell/dock/ColorInput.vue:242` — in NO W4 §4 row, so arming
        //     the literal glob here would make D2 unfixable in bounds. It is
        //     NAMED and escalated (Check 1 defects 3 and 4) — not excluded by a
        //     silent glob and not padded away.
        files: [
            "demo/app/App.vue",
            "demo/shell/usePaneRouter.ts",
            "demo/shell/dock/Dock.vue",
            "demo/shell/dock/layers/ActionBarLayer.vue",
            "demo/shell/dock/layers/GenericActionBar.vue",
            "demo/color-session/keys.ts",
        ],
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
        },
    },
];
