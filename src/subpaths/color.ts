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
