import { parseCssValue } from "../../../src/css/index";
for (const f of ["calc(env(é) + 1px)", "calc(env(\\31 a) + 1px)", "calc(env(safe-area-inset-top) + 1px)", "calc(var(--x) + 1px)", "calc(var(-) + 1px)", "calc(var(--) + 1px)"]) console.log(JSON.stringify(f), JSON.stringify(parseCssValue(f)).slice(0, 140));
