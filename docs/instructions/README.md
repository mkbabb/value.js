# Instructions

Read `docs/precepts/instructions/` first. Local value.js rules:

- Value.js is the CSS value, color, unit, transform, and quantization library.
  Public API exports from `src/index.ts`; package output is `dist/value.js`
  and `dist/index.d.ts`.
- Parser work depends on `@mkbabb/parse-that`; keep grammar/parser changes
  grounded in tests and documented CSS behavior.
- Color changes must preserve the XYZ hub, gamut-mapping semantics, and
  documented spaces under `assets/docs/` and `docs/colors/`.
- Verify library changes with `npm test` or focused Vitest filters and
  `npm run build`. Use `npm run test:e2e` for browser/demo workflows.
- Demo/UI changes are verified through Vite dev mode and browser evidence.
  Do not treat source grep as proof of rendered color, drag, dock, or
  extraction behavior.
- `plugins/vite-source-export.ts` and package export shape are release
  surfaces; change them only in waves that own build output.
- Keep generated/package output separate from source work unless the tranche
  explicitly owns a release refresh.
