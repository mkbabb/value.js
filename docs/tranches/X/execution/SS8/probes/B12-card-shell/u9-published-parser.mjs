// SS8-0348 cure seat: the API's validator is the PUBLISHED @mkbabb/value.js parseCssColor.
// Run from api/: node ../docs/tranches/X/execution/SS8/probes/B12-card-shell/u9-published-parser.mjs
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const dir = join(process.cwd(), "node_modules/@mkbabb/value.js");
const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
const css = pkg.exports["./css"];
const entry = typeof css === "string" ? css : css.import?.default ?? css.import ?? css.default;
const { parseCssColor } = await import(pathToFileURL(join(dir, entry)).href);
console.log("published @mkbabb/value.js", pkg.version);
for (const s of ["rgb(1 2 3 / )", 'rgb(1 2 3 / )"/><script>x</script>', "rgb(1 2 3 / 0.5)"]) {
    let r; try { r = parseCssColor(s); } catch (e) { r = "THROW " + e.message; }
    console.log(JSON.stringify(s), JSON.stringify(r).slice(0, 110));
}
