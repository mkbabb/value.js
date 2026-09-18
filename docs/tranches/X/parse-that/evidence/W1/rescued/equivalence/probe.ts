import { parseCssColor, parseTimingFunction, parseStylesheet } from "/Users/mkbabb/Programming/value.js/dist/subpaths/css.js";
import { parseColor as c14Color, parseEasing as c14Easing, parseStylesheet as c14Sheet } from "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css/src/css/api.js";

const live = parseCssColor("oklch(62.8% 0.257 29.23 / 85%)");
console.log("LIVE oklch:", JSON.stringify(live));
const c = c14Color("oklch(62.8% 0.257 29.23 / 85%)");
console.log("C14  oklch:", JSON.stringify(c));
console.log("LIVE cubic:", JSON.stringify(parseTimingFunction("cubic-bezier(0.25, 0.1, 0.25, 1)")));
console.log("C14  cubic:", JSON.stringify(c14Easing("cubic-bezier(0.25, 0.1, 0.25, 1)")));
const sheetSrc = ".swatch:hover { color: oklch(62.8% .257 29.23 / 85%); animation-timing-function: cubic-bezier(.25, .1, .25, 1); }";
console.log("LIVE sheet:", JSON.stringify(parseStylesheet(sheetSrc)));
console.log("C14  sheet:", JSON.stringify(c14Sheet(sheetSrc)));
