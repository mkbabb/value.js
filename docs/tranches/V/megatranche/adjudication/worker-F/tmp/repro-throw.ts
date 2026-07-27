import { parseGradientCSS } from "../../../../../../../demo/workbenches/gradient/composables/gradientParse";
for (const css of [
  "linear-gradient(90deg, oklch(), blue)",
  "linear-gradient(90deg, rgb(), blue)",
  "linear-gradient(90deg, red, blue)",
]) {
  try {
    const r = parseGradientCSS(css);
    console.log(JSON.stringify(css), "->", r.ok ? "ok" : "reject: " + r.reason);
  } catch (e: any) {
    console.log(JSON.stringify(css), "-> UNCAUGHT", e.constructor.name, e.message.slice(0, 55));
  }
}
