// SS8-0348 cure seat: does the library parser (src, HEAD) admit the malformed rgb the API stored?
import { parseCssColor } from "../../../../../../../src/css/bbnf/color-parse.ts";
for (const s of ["rgb(1 2 3 / )", 'rgb(1 2 3 / )"/><script>x</script>', "rgb(1 2 3 / 0.5)", "hsl(1 2% 3% / )", "oklch(50% 0.1 20 / )", "lab(50% 1 2 / )", "color(srgb 1 0 0 / )", "rgb(1, 2, 3, )"]) {
    let r: unknown; try { r = parseCssColor(s); } catch (e) { r = "THROW " + (e as Error).message; }
    console.log(JSON.stringify(s), JSON.stringify(r).slice(0, 110));
}
