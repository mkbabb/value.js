// CHALLENGE-D probe: what the ColorInput parse path actually does with MT-F001 inputs.
// Runs the EXACT function ColorInput.vue calls: useColorParsing.parseColor ->
// picker-color.parsePickerColor -> src/css/grammar.parseCssColor.
import { createServer } from "vite";

const server = await createServer({ configFile: "vite.config.ts", mode: "development", server: { middlewareMode: true }, appType: "custom" });
const { parsePickerColor } = await server.ssrLoadModule("/Users/mkbabb/Programming/value.js/demo/color-session/picker-color.ts");
const { parseCssColor } = await server.ssrLoadModule("/Users/mkbabb/Programming/value.js/src/css/grammar.ts");

const INPUTS = ["oklch(", "oklch()", "rgb()", "hsl()", "lab()", "lch()", "color()", "oklab()", "hsl(  )", "zzz", "oklch(0.7 0.15 200)"];
const rows = [];
for (const s of INPUTS) {
  const input = s.trim().toLowerCase();          // exactly what parseAndSetColor does
  let low = "", high = "";
  try { const r = parseCssColor(input); low = "returned " + JSON.stringify(r).slice(0, 70); }
  catch (e) { low = "THREW " + (e?.constructor?.name) + ": " + e?.message; }
  try { const r = parsePickerColor(input); high = "returned " + JSON.stringify(r).slice(0, 70); }
  catch (e) { high = "THREW " + (e?.constructor?.name) + ": " + e?.message; }
  rows.push({ input: JSON.stringify(s), parseCssColor: low, parsePickerColor: high });
}
console.table(rows);
await server.close();
