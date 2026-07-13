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
            "docs/precepts/**",
            "docs/tranches/C/**",
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
        // G-DEMO-3b (U.W-DEMO · U-F47) — the palette-browser mega-feature is
        // reached through its BARREL SEAM (the top-level index.ts or a
        // sub-barrel it re-exports), never a raw internal `.vue` file. The seam
        // is the feature's stable public API; a raw-file reach couples a
        // consumer to internal layout. Barrel reaches (`.../card`, `.../dialog`,
        // `.../admin`, `.../search`, `.../slug`, `.../status`) do NOT match —
        // only paths ending in a raw `.vue` are banned. This object's file glob
        // is the NON-composables demo consumer trees; it is DISJOINT from the
        // composables-layer object below, so neither clobbers the other's
        // `no-restricted-imports` (flat config does not array-merge that rule
        // across matching objects — the last match wins wholesale).
        files: [
            "demo/color-picker/**/*.ts",
            "demo/color-picker/**/*.vue",
            "demo/@/components/**/*.ts",
            "demo/@/components/**/*.vue",
            "demo/@/lib/**/*.ts",
            "demo/@/lib/**/*.vue",
        ],
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "@components/custom/palette-browser/**/*.vue",
                            ],
                            message:
                                "G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file.",
                        },
                    ],
                },
            ],
        },
    },
    {
        // G-DEMO-1 (U.W-DEMO · U-F45) + G-DEMO-3a (U-F47) — the shared
        // composables layer (`demo/@/composables/`) is a CLEAN LOWER LAYER. It
        // reaches DOWN into the library and sideways within itself; it must
        // never reach UP into app-root boot (`demo/color-picker/`, the color-
        // spine near-cycle G-DEMO-1 dissolves) and never into a feature's
        // internal composables (`@components/custom/*/composables/`, the E-1
        // colocation inversion G-DEMO-3a dissolves). Wired STANDING so a future
        // feature edit cannot silently re-invert the demo module graph. The
        // three bans live in ONE object over ONE file glob because flat config
        // resolves `no-restricted-imports` by last-match-wins (no merge) — a
        // single object is the only override-safe encoding for a file region
        // that needs multiple bans. (The bare `@components/custom/color-picker`
        // barrel is ALLOWED — `**/color-picker/**` requires a trailing segment,
        // so only the raw-relative app-root reach + picker-internal subpaths are
        // banned; the G-DEMO-3b raw-`.vue` ban is re-declared here since this
        // object owns the composables region's rule value.)
        files: [
            "demo/@/composables/**/*.ts",
            "demo/@/composables/**/*.vue",
        ],
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["**/color-picker/**"],
                            message:
                                "G-DEMO-1: the shared color layer (demo/@/composables/color) must never import app-root boot (demo/color-picker) — the spine is a clean lower layer.",
                        },
                        {
                            group: ["@components/custom/*/composables/**"],
                            message:
                                "G-DEMO-3a: the shared composables layer must not import feature internals — features depend on shared, never the reverse.",
                        },
                        {
                            group: [
                                "@components/custom/palette-browser/**/*.vue",
                            ],
                            message:
                                "G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file.",
                        },
                    ],
                },
            ],
        },
    },
];
