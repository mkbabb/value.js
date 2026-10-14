// SERVED MODEL: claude-opus-5-5
// X.P.W8.semi: the diagnostic `parseCssValue` answers for a value holding a `;`.
import { parseCssValue } from "../../../src/css/index";
for (const s of process.argv.slice(2)) { const r = parseCssValue(s); console.log(JSON.stringify(s), r.ok ? "ACCEPTED" : JSON.stringify(r.diagnostics.map(({ code, start, end, actual, expected }) => ({ code, start, end, actual, expected })))); }
