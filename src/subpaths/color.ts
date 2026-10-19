/**
 * `@mkbabb/value.js/color` — derived from the area barrel (PSL-1).
 *
 * The barrel `../color/index` is the one place this area's public/internal
 * line is drawn; this file forwards it whole rather than repeating it. The
 * hand-kept copy it replaces had drifted: it dropped `ColorFactory`, which is
 * the declared type of all 23 factories published here, so a consumer could
 * call them and not name what they return (G12 LEG1 · G13).
 */
export * from "../color/index";
/**
 * A colour's CSS text, both ways (X-W12U `.g2s`): `parseCssColor` over the
 * `<color>`-rooted parser (`color.bbnf` compiled alone, `../css/bbnf/color-parse`)
 * and its inverse `serializeCssColor`. They are the SAME functions `./css`
 * publishes, forwarded here rather than through `../color/index` because the
 * colour area's barrel is what the css area's colour actions import (a barrel
 * re-export would close that cycle). A page that only reads and writes colours
 * imports them from here and never loads the value and stylesheet grammar.
 * PSL-2: every type the two signatures name is nameable from this subpath.
 */
export { parseCssColor } from "../css/bbnf/color-parse";
export { serializeCssColor } from "../css/serialize";
export type { CssColor, CssColorSpace, ParseIssue, ParseResult } from "../css/types";
/**
 * The CSS named-colour table (css-color-4 §6.1), the one the colour parser
 * reads: lowercase keyword → `#rrggbb`, prototype-free and frozen. Published so
 * a consumer that resolves a colour BACK to its name (the picker's named snap)
 * reads the library's own table rather than keeping a copy that can drift.
 */
export { NAMED_COLORS } from "../css/named-colors";
