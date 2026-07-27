import { describe, it, expect } from "vitest";
import { parseCssColor } from "../../../../../../src/css/grammar";

const HOSTILE = [
  "oklch()", "rgb()", "hsl()", "lab()", "lch()", "color()", "oklab()",
  "rgb(", "oklch(1", "rgb(,,)", "hsl(  )", "color(display-p3)",
  "#", "#z", "#12345", "rgb(1,2)", "oklch(0.5 0.1)", "", " ",
  "rgb(999999999999999999999,0,0)", "hsl(NaN,0%,0%)", "var(--x)",
  "color-mix(in oklch, red, blue)", "light-dark(red, blue)",
  "rgb(from red r g b)", "oklch(from red l c h)",
];
describe("R1 hostile parseCssColor", () => {
  for (const s of HOSTILE) {
    it(`does not throw on ${JSON.stringify(s)}`, () => {
      let threw: unknown = null;
      let out: unknown = null;
      try { out = parseCssColor(s); } catch (e) { threw = e; }
      if (threw) console.log("THREW", JSON.stringify(s), String(threw).slice(0,120));
      else console.log("ok   ", JSON.stringify(s), JSON.stringify(out)?.slice(0,90));
      expect(threw).toBeNull();
    });
  }
});
