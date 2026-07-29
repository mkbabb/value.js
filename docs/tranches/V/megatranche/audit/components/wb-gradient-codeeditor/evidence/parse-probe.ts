import { parseCssColor } from "/Users/mkbabb/Programming/value.js/src/css/grammar";
import { parseGradientCSS } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/gradientParse";

const colorInputs = ["oklch()", "rgb()", "hsl()", "lab()", "lch()", "color()", "oklab()", "hsl(  )", "hwb()", "rgba()"];
for (const i of colorInputs) {
  try { const r = parseCssColor(i); console.log("COLOR OK   ", JSON.stringify(i), "->", r.ok); }
  catch (e) { console.log("COLOR THROW", JSON.stringify(i), "->", (e as Error).constructor.name + ": " + (e as Error).message); }
}

const gradInputs = [
  "linear-gradient(90deg, oklch(), blue)",
  "linear-gradient(90deg, oklch(0.7 0.1 200), rgb())",
  "linear-gradient(90deg, red, hsl(  ))",
  "linear-gradient(oklch())",
  "linear-gradient(90deg, red, blue)",
  "",
  "linear-gradient()",
  "linear-gradient(90deg, red 50%, blue 20%)",
  "linear-gradient(90deg, red -50%, blue 200%)",
  "linear-gradient(90deg, red NaN%, blue)",
  "linear-gradient(90deg, red Infinity%, blue)",
  "linear-gradient(1e400deg, red, blue)",
  "linear-gradient(90deg, red 1e400%, blue)",
  "linear-gradient(NaNdeg, red, blue)",
];
for (const i of gradInputs) {
  try { const r = parseGradientCSS(i); console.log("GRAD  ", JSON.stringify(i), "->", r.ok ? "OK " + JSON.stringify(r.model.stops.map(s=>[s.cssColor,s.position])) + " dir=" + r.model.direction : "REJECT: " + r.reason); }
  catch (e) { console.log("GRAD THROW", JSON.stringify(i), "->", (e as Error).constructor.name + ": " + (e as Error).message); }
}
