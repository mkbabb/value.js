import { parseStylesheet as liveSheet } from "/Users/mkbabb/Programming/value.js/dist/subpaths/css.js";
import { parseStylesheet as c14Sheet } from "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css/src/css/api.js";

const cases = [
  ".stagger-children > * { animation: stagger-child-in var(--duration-normal) var(--ease-standard) both; }",
  ".stagger-children > *:nth-child(n + 7) { animation-delay: calc(var(--stagger-base, 0ms) + 240ms); }",
  ".pane-shell > :first-child { animation: plate-land var(--overture-plate-land, 440ms) var(--spring-snappy) var(--overture-appear-delay, 0ms) backwards; }",
  ".specimen-seg { --specimen-ink: color-mix( in oklab, var(--skeleton-ink) 78%, oklch(from var(--accent-live) l 0.12 calc(h + var(--i, 0) * 36deg)) ); }",
  ".dark { /* c */\n --code-comment: hsl(34 14% 66%); /* warm */\n --code-keyword: oklch(0.75 0.15 27); }",
  "*,\n    *::before,\n    *::after { animation-duration: 0.01ms !important; }",
];
for (const s of cases) {
  const L = liveSheet(s) as any;
  const C = c14Sheet(s) as any;
  console.log("\n=== INPUT:", JSON.stringify(s.slice(0, 90)));
  console.log("LIVE ok:", L.ok, L.ok ? JSON.stringify(L.value).slice(0, 400) : JSON.stringify(L.diagnostics).slice(0, 200));
  console.log("C14  ok:", C.ok, C.ok ? JSON.stringify(C.value).slice(0, 400) : JSON.stringify(C.diagnostics).slice(0, 200));
}
