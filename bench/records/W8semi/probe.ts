// SERVED MODEL: claude-opus-5-5
// X.P.W8.semi probe: `parseStylesheet(s).ok` and the first diagnostic code per source.
import { parseStylesheet } from "../../../src/css/index";
const sources = process.argv.slice(2);
for (const s of sources) {
    const r = parseStylesheet(s);
    console.log(JSON.stringify(s), r.ok ? "ACCEPTED" : `refused ${r.diagnostics.map((d) => d.code).join(",")}`);
}
