// Probe N-12: does tsconfig `paths` admit a specifier the package `exports`
// map does not publish? `@mkbabb/value.js/parsing` is declared in
// tsconfig.demo.json's `paths` but is absent from package.json#exports.
import { parseCssColor } from "@mkbabb/value.js/parsing";
export const x = parseCssColor("oklch(0.5 0.1 200)");
