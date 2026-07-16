# Value 4 capability entries

Each file in this directory maps one-to-one to a public `package.json.exports`
entry and may re-export only the code owned by that capability.

| Barrel | Public entry | Owner |
|---|---|---|
| `color.ts` | `@mkbabb/value.js/color` | immutable 17-space color objects, conversion, mixing, gamut, contrast, RGBA projection |
| `value.ts` | `@mkbabb/value.js/value` | structural CSS value types and layout-tracking unit classification |
| `css.ts` | `@mkbabb/value.js/css` | CSS color/value/stylesheet/keyframe/timeline grammar and collectors |
| `easing.ts` | `@mkbabb/value.js/easing` | parser-free numeric easing functions and constructors |
| `math.ts` | `@mkbabb/value.js/math` | numeric interpolation and Bézier primitives |
| `transform.ts` | `@mkbabb/value.js/transform` | matrix decomposition/interpolation and DOM-free path geometry |
| `quantize.ts` | `@mkbabb/value.js/quantize` | perceptual image palette extraction |

There is no root barrel, `/parsing`, or `/units`. Do not introduce an alias,
prefix externalization, compatibility shim, dual path, or fallback for those
removed entries.

The entry filenames and their literal declaration/runtime targets are public
API. A change to an entry name, export name, signature, failure shape, or
semantic domain is versioned deliberately and kept in lockstep with
`package.json`, `vite.config.ts`, `vite.library.ts`, the public tests, and
the packed strict-consumer verification.

Every capability remains immutable and failure-explicit. `/easing`, `/math`,
`/transform`, and `/quantize` are parser-free. `/css` is the sole text
grammar owner. `/color` never grows a second CSS parser.
