// SERVED MODEL: claude-opus-5-5 — X.P.W8 RESUME 4 close: if() branch-separator probe on a given product root
const root = process.argv[2];
const { parseCssValue } = await import(`${root}/src/css/index`);
for (const s of ["if(supports(color: red): red; else: blue)", "if(supports(color: lch(0 0 0)): red; else: blue)", "if(style(--x: 1): red; else: blue)"]) {
    const r = parseCssValue(s);
    console.log(JSON.stringify(s), r.ok ? "ACCEPTED" : `refused ${r.error?.code ?? JSON.stringify(r).slice(0, 120)}`);
}
// CORRECTION 2026-10-15 (X.P.W8 Repair 1, C1-2): `export {}` makes this probe a module, so its top-level await type-checks under tsconfig.test.json (was TS1375 at 3:27); behaviour unchanged.
export {};
