var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/css/bbnf/index.ts
var bbnf_exports = {};
__export(bbnf_exports, {
  grammar: () => grammar,
  parseCssColor: () => parseCssColor,
  parseCssScalar: () => parseCssScalar,
  parseCssValue: () => parseCssValue,
  parseCssValues: () => parseCssValues,
  parseKeyframeSelector: () => parseKeyframeSelector,
  parseTimingFunction: () => parseTimingFunction,
  splitTopLevel: () => splitTopLevel
});

// src/css/result.ts
function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}
var EMPTY_DIAGNOSTICS = Object.freeze([]);
var success = (value) => Object.freeze({
  ok: true,
  value: deepFreeze(value),
  diagnostics: EMPTY_DIAGNOSTICS
});
var failure = (source, code = "css_syntax", expected = [], start = 0, end = source.length) => {
  const issue = Object.freeze({
    code,
    start,
    end,
    expected: Object.freeze([...expected]),
    actual: source.slice(start, end) || null
  });
  const diagnostics = Object.freeze([issue]);
  return Object.freeze({ ok: false, diagnostics });
};

// src/foundation/result.ts
var ok = (value) => ({ ok: true, value });
var err = (error) => ({ ok: false, error });

// src/color/model.ts
var SPACE_SCHEMA = {
  rgb: { channels: ["r", "g", "b"], css: true },
  hsl: { channels: ["h", "s", "l"], hueIndex: 0, css: true },
  hsv: { channels: ["h", "s", "v"], hueIndex: 0, css: false },
  hwb: { channels: ["h", "w", "b"], hueIndex: 0, css: true },
  lab: { channels: ["l", "a", "b"], css: true },
  lch: { channels: ["l", "c", "h"], hueIndex: 2, css: true },
  oklab: { channels: ["l", "a", "b"], css: true },
  oklch: { channels: ["l", "c", "h"], hueIndex: 2, css: true },
  xyz: { channels: ["x", "y", "z"], css: true },
  kelvin: { channels: ["kelvin"], css: false },
  "srgb-linear": { channels: ["r", "g", "b"], css: true },
  "display-p3": { channels: ["r", "g", "b"], css: true },
  "a98-rgb": { channels: ["r", "g", "b"], css: true },
  "prophoto-rgb": { channels: ["r", "g", "b"], css: true },
  rec2020: { channels: ["r", "g", "b"], css: true },
  ictcp: { channels: ["i", "ct", "cp"], css: false },
  jzazbz: { channels: ["jz", "az", "bz"], css: false }
};
var SPACE_IDS = Object.freeze(Object.keys(SPACE_SCHEMA));
function createColor(space, channels, alpha = 1) {
  if (!Array.isArray(channels) || channels.length !== SPACE_SCHEMA[space].channels.length) {
    return err({ code: "color_invalid_input" });
  }
  if (channels.some((channel) => channel !== "none" && !Number.isFinite(channel))) {
    return err({ code: "color_non_finite" });
  }
  if (alpha !== "none" && !Number.isFinite(alpha)) return err({ code: "color_non_finite" });
  if (alpha !== "none" && (alpha < 0 || alpha > 1)) return err({ code: "color_out_of_range" });
  if (space === "kelvin" && channels[0] !== "none" && (channels[0] < 1e3 || channels[0] > 4e4)) {
    return err({ code: "color_out_of_range" });
  }
  return ok(Object.freeze({
    space,
    channels: Object.freeze([...channels]),
    alpha
  }));
}
var factory = (space) => ((...args) => {
  const count = SPACE_SCHEMA[space].channels.length;
  const channels = args.slice(0, count);
  const alpha = args.length > count ? args[count] : 1;
  return createColor(space, channels, alpha);
});
var rgb = factory("rgb");
var hsl = factory("hsl");
var hsv = factory("hsv");
var hwb = factory("hwb");
var lab = factory("lab");
var lch = factory("lch");
var oklab = factory("oklab");
var oklch = factory("oklch");
var xyz = factory("xyz");
var kelvin = factory("kelvin");
var linearSrgb = factory("srgb-linear");
var displayP3 = factory("display-p3");
var a98Rgb = factory("a98-rgb");
var prophotoRgb = factory("prophoto-rgb");
var rec2020 = factory("rec2020");
var ictcp = factory("ictcp");
var jzazbz = factory("jzazbz");
function isAnyColor(value) {
  if (!value || typeof value !== "object") return false;
  const candidate = value;
  if (typeof candidate.space !== "string" || !(candidate.space in SPACE_SCHEMA)) return false;
  if (!Array.isArray(candidate.channels) || candidate.channels.length !== SPACE_SCHEMA[candidate.space].channels.length) return false;
  if (candidate.alpha !== "none" && typeof candidate.alpha !== "number") return false;
  return candidate.channels.every((channel) => channel === "none" || typeof channel === "number");
}

// src/color/anchors.ts
var multiply = ([x, y, z], m) => [
  m[0] * x + m[1] * y + m[2] * z,
  m[3] * x + m[4] * y + m[5] * z,
  m[6] * x + m[7] * y + m[8] * z
];
function invert(m) {
  const a = m[0], b = m[1], c = m[2];
  const d = m[3], e = m[4], f = m[5];
  const g = m[6], h = m[7], i = m[8];
  const A = e * i - f * h;
  const B = c * h - b * i;
  const C = b * f - c * e;
  const D = f * g - d * i;
  const E = a * i - c * g;
  const F = c * d - a * f;
  const G = d * h - e * g;
  const H = b * g - a * h;
  const I = a * e - b * d;
  const determinant = a * A + b * D + c * G;
  return [A, B, C, D, E, F, G, H, I].map((v) => v / determinant);
}
var P3_TO_XYZ = [
  0.4865709486482162,
  0.26566769316909306,
  0.1982172852343625,
  0.22897456406974884,
  0.6917385218365064,
  0.079286914093745,
  0,
  0.04511338185890264,
  1.043944368900976
];
var XYZ_TO_P3 = invert(P3_TO_XYZ);
var A98_TO_XYZ = [
  0.5766690429101305,
  0.1855582379065463,
  0.1882286462349947,
  0.29734497525053605,
  0.6273635662554661,
  0.07529145849399788,
  0.02703136138641234,
  0.07068885253582723,
  0.9913375368376388
];
var XYZ_TO_A98 = invert(A98_TO_XYZ);
var D50_TO_D65 = [
  0.955473421488075,
  -0.02309845494876464,
  0.06325924320057069,
  -0.028369709333863888,
  1.0099953980813041,
  0.021041441191917334,
  0.012314014864481979,
  -0.020507649298898967,
  1.330365926242124
];
var adaptXyzD50ToD65 = (xyz2) => multiply(xyz2, D50_TO_D65);
var EPSILON = 216 / 24389;
var KAPPA = 24389 / 27;
var XYZ_TO_LMS_OKLAB = [
  0.819022437996703,
  0.3619062600528904,
  -0.1288737815209879,
  0.0329836539323885,
  0.9292868615863434,
  0.0361446663506424,
  0.0481771893596242,
  0.2642395317527308,
  0.6335478284694309
];
var LMS_TO_XYZ_OKLAB = invert(XYZ_TO_LMS_OKLAB);
var LMS_TO_OKLAB = [
  0.210454268309314,
  0.7936177747023054,
  -0.0040720430116193,
  1.9779985324311684,
  -2.42859224204858,
  0.450593709617411,
  0.0259040424655478,
  0.7827717124575296,
  -0.8086757549230774
];
var OKLAB_TO_LMS = invert(LMS_TO_OKLAB);
var XYZ_TO_LMS_ICTCP = [
  0.3592832590121217,
  0.6976051147779502,
  -0.0358915932320289,
  -0.1920808463704995,
  1.1004767970374323,
  0.0753748658519118,
  0.0070797844607477,
  0.0748396662186366,
  0.8433265453898765
];
var LMS_TO_XYZ_ICTCP = invert(XYZ_TO_LMS_ICTCP);
var LMSP_TO_ICTCP = [
  0.5,
  0.5,
  0,
  1.61376953125,
  -3.323486328125,
  1.709716796875,
  4.378173828125,
  -4.24560546875,
  -0.132568359375
];
var ICTCP_TO_LMSP = invert(LMSP_TO_ICTCP);
var JZ_C1 = 3424 / 4096;
var JZ_C2 = 2413 / 128;
var JZ_C3 = 2392 / 128;
var JZ_N = 2610 / 16384;
var JZ_P = 1.7 * 2523 / 32;
var JZ_XYZ_TO_LMS = [
  0.41478972,
  0.579999,
  0.014648,
  -0.20151,
  1.120649,
  0.0531008,
  -0.0166008,
  0.2648,
  0.6684799
];
var JZ_LMS_TO_XYZ = invert(JZ_XYZ_TO_LMS);
var JZ_LMSP_TO_IAB = [
  0.5,
  0.5,
  0,
  3.524,
  -4.066708,
  0.542708,
  0.199076,
  1.096799,
  -1.295875
];
var JZ_IAB_TO_LMSP = invert(JZ_LMSP_TO_IAB);

// src/css/named-colors.ts
var NAMED_COLORS = Object.freeze(Object.assign(/* @__PURE__ */ Object.create(null), {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
}));

// ../../../../var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-w7-judge/css-grammar.synth-fb3.generated.js
var RULE_NAMES = ["ws", "ws1", "comma", "slash", "close", "number", "percentage", "dimension", "angle", "none", "ident", "dashedIdent", "string", "balanced", "mathFn", "calc", "minMax", "clampFn", "signAbs", "calcSum", "calcAddOp", "calcProduct", "calcMulOp", "calcValue", "calcGroup", "calcConstant", "calcKeyword", "varFn", "color", "component", "hueValue", "alphaValue", "alphaTail", "rgbFn", "rgbModern", "rgbLegacyPct", "rgbLegacyNum", "legacyPct", "legacyNum", "legacyHue", "legacyAlpha", "hslFn", "hslModern", "hslLegacy", "hwbFn", "labFn", "lchFn", "oklabFn", "oklchFn", "colorFn", "colorSpace", "relativeColor", "relativeHead", "relativeTail", "relativeComp", "colorMix", "mixMethod", "mixPolar", "mixRect", "polarSpace", "rectSpace", "hueMethod", "mixItem", "mixLead", "mixTrail", "mixPercent", "lightDark", "hex", "colorKeyword", "valueTop", "commaList", "slashList", "spaceList", "termSep", "valueTerm", "badTerm", "varCall", "varBody", "colorCall", "colorHead", "call", "callName", "numeric", "operator", "identTerm", "scalarTop", "scalarTerm", "colorTop", "keyframeSelector", "selectorKeyword", "selectorNamed", "timingFunction", "timingKeyword", "cubicBezier", "stepsFn", "stepPosition", "linearFn", "linearStop", "quoted", "textGroup", "textBody", "commaRun", "commaItems", "semiRun", "semiItems", "spaceRun", "spaceItems", "restText", "comment", "ruleGap", "preludeRun", "blockBody", "openQuote", "semiTail", "blockTail", "ruleBlock", "openComment", "openBlock", "openRule", "ruleList", "atPrelude", "atKeyframes", "atProperty", "atFunction", "atScope", "atStartingStyle", "atScrollTimeline", "atViewTimeline", "atOther", "atName", "atRest", "propertyName", "syntaxText", "syntaxCore", "syntaxPart", "syntaxAlts", "scopeGroup", "scopeLimit", "scopePrelude", "functionName", "functionParams", "functionHead", "colonRun", "paramDefault", "functionParam", "paramName", "paramSyntax", "paramHead", "declName", "declValue", "declImportant", "declaration", "listComma", "commaSpans", "argRun", "timelineArgs", "scrollFn", "viewFn", "timelineLead", "timelineLength"];
var ACTION_KINDS = { "number": "map", "percentage": "map", "dimension": "map", "angle": "map", "none": "map", "string": "map", "calc": "map", "minMax": "map", "clampFn": "map", "signAbs": "map", "calcSum": "map", "calcProduct": "map", "calcConstant": "map", "calcKeyword": "map", "varFn": "map", "rgbModern": "map", "rgbLegacyPct": "map", "rgbLegacyNum": "map", "hslModern": "map", "hslLegacy": "map", "hwbFn": "map", "labFn": "map", "lchFn": "map", "oklabFn": "map", "oklchFn": "map", "colorFn": "map", "relativeColor": "map", "colorMix": "map", "mixPolar": "map", "mixRect": "map", "mixLead": "map", "mixTrail": "map", "lightDark": "map", "hex": "map", "colorKeyword": "map", "commaList": "map", "slashList": "map", "spaceList": "map", "badTerm": "span", "varCall": "map", "colorCall": "map", "call": "map", "numeric": "map", "operator": "map", "identTerm": "map", "scalarTerm": "map", "selectorKeyword": "map", "selectorNamed": "map", "timingKeyword": "map", "cubicBezier": "map", "stepsFn": "map", "linearFn": "map", "linearStop": "map", "commaRun": "text", "commaItems": "map", "semiRun": "text", "semiItems": "map", "spaceRun": "text", "spaceItems": "map", "restText": "text", "preludeRun": "text", "semiTail": "map", "blockTail": "text", "ruleBlock": "map", "openComment": "span", "openBlock": "span", "openRule": "span", "ruleList": "map", "atKeyframes": "map", "atProperty": "map", "atFunction": "map", "atScope": "map", "atStartingStyle": "map", "atScrollTimeline": "map", "atViewTimeline": "map", "atOther": "map", "atName": "map", "syntaxText": "map", "syntaxCore": "text", "syntaxPart": "text", "syntaxAlts": "map", "scopeGroup": "text", "scopePrelude": "map", "functionName": "text", "functionParams": "text", "functionHead": "map", "colonRun": "text", "paramDefault": "map", "functionParam": "map", "paramName": "text", "paramSyntax": "text", "paramHead": "map", "declName": "map", "declValue": "text", "declImportant": "map", "declaration": "map", "listComma": "span", "commaSpans": "map", "argRun": "text", "timelineArgs": "map" };
function createParser(A) {
  "use strict";
  let V;
  const K0 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K1 = new RegExp("\\s", "y");
  const K2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K3 = new RegExp("\\s", "y");
  const K4 = new RegExp("\\s*,\\s*", "y");
  const K5 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K6 = new RegExp("\\s*\\/\\s*", "y");
  const K7 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K8 = new RegExp("\\s*\\)", "y");
  const K9 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K10 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+(?!\\.\\d))(?:[eE][+-]?\\d+)?(?![\\w%\\\\])", "y");
  const K11 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K12 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?%", "y");
  const K13 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K14 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?[a-zA-Z_][\\w-]*", "y");
  const K15 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K16 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:e[+-]?\\d+)?(?:deg|grad|rad|turn)(?![\\w-])", "iy");
  const K17 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K18 = new RegExp("none(?![\\w-])", "iy");
  const K19 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K20 = new RegExp("-?[a-zA-Z_][\\w-]*|--[\\w-]*", "y");
  const K21 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
  const K22 = new RegExp("--[\\w-]+", "y");
  const K23 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K24 = new RegExp(`"(?:\\\\[\\s\\S]|[^"\\\\])*"|'(?:\\\\[\\s\\S]|[^'\\\\])*'`, "y");
  const K25 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K26 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K27 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K28 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K29 = new RegExp(`[^()"']`, "y");
  const K30 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 1, -1, 2, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 0, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 1, -1, 2, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 0, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K31 = new RegExp("calc\\(\\s*", "iy");
  const K32 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K33 = new RegExp("(?:min|max)(?=\\()", "iy");
  const K34 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K35 = new RegExp("\\(\\s*", "y");
  const K36 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K37 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K38 = new RegExp("clamp\\(\\s*", "iy");
  const K39 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K40 = new RegExp("(?:sign|abs)(?=\\()", "iy");
  const K41 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K42 = new RegExp("\\(\\s*", "y");
  const K43 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K44 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K45 = new RegExp("\\s+[+-]\\s+", "y");
  const K46 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K47 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K48 = new RegExp("\\s*[*\\/]\\s*", "y");
  const K49 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K50 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, 1, -1, 2, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 3, 4, 5, 4, 4, 4, 6, 4, 4, 4, 3, 6, 4, 6, 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, -1, -1, -1, -1, -1, -1, 3, 4, 3, 4, 5, 4, 4, 4, 6, 4, 4, 4, 3, 6, 4, 6, 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, -1, -1, -1, -1, -1]);
  const K51 = new RegExp("\\(\\s*", "y");
  const K52 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K53 = new RegExp("(?:-?infinity|nan|pi|e)(?![\\w-])", "iy");
  const K54 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K55 = new RegExp("[a-zA-Z][\\w-]*(?![\\w(-])", "y");
  const K56 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
  const K57 = new RegExp("(?:var|env)(?=\\()", "iy");
  const K58 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K59 = new RegExp("\\(\\s*", "y");
  const K60 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K61 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1]);
  const K62 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K63 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 2, 1, 3, 1, 1, 4, 1, 1, 1, 5, 1, 1, 6, 1, 1, 7, 1, 1, 1, 3, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 2, 1, 3, 1, 1, 4, 1, 1, 1, 5, 1, 1, 6, 1, 1, 7, 1, 1, 1, 3, 1, 1, 1, 1, -1, -1, -1, -1, -1]);
  const K64 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K65 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K66 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K67 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K68 = new RegExp("rgba?\\(\\s*", "iy");
  const K69 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K70 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 1, -1, -1, -1, -1, 0, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 1, -1, -1, -1, -1, 0, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K71 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K72 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K73 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K74 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K75 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K76 = new RegExp("hsla?\\(\\s*", "iy");
  const K77 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K78 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 1, -1, -1, -1, -1, 0, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 1, -1, -1, -1, -1, 0, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K79 = new RegExp("hwb\\(\\s*", "iy");
  const K80 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K81 = new RegExp("lab\\(\\s*", "iy");
  const K82 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K83 = new RegExp("lch\\(\\s*", "iy");
  const K84 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K85 = new RegExp("oklab\\(\\s*", "iy");
  const K86 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K87 = new RegExp("oklch\\(\\s*", "iy");
  const K88 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K89 = new RegExp("color\\(\\s*", "iy");
  const K90 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K91 = new RegExp("(?:srgb-linear|srgb|display-p3-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz-d50|xyz-d65|xyz)(?![\\w-])", "iy");
  const K92 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
  const K93 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K94 = new RegExp("color\\(\\s*from(?![\\w-])", "iy");
  const K95 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K96 = new RegExp("(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\\(\\s*from(?![\\w-])", "iy");
  const K97 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K98 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K99 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K100 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, -1, -1, -1, -1, -1, -1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, -1, -1, -1, -1, -1]);
  const K101 = new RegExp("color-mix\\(\\s*", "iy");
  const K102 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K103 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K104 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K105 = new RegExp("in(?![\\w-])", "iy");
  const K106 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K107 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, 0, -1, -1, -1, 1, -1, -1, -1, 2, -1, -1, 2, 0, -1, 0, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, 0, -1, -1, -1, 1, -1, -1, -1, 2, -1, -1, 2, 0, -1, 0, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1]);
  const K108 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K109 = new RegExp("(?:hsl|hwb|lch|oklch)(?![\\w-])", "iy");
  const K110 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K111 = new RegExp("(?:srgb-linear|srgb|display-p3-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz-d50|xyz-d65|xyz)(?![\\w-])", "iy");
  const K112 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
  const K113 = new RegExp("(?:shorter|longer|increasing|decreasing)\\s+hue(?![\\w-])", "iy");
  const K114 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K115 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, -1, -1, -1, -1, -1]);
  const K116 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K117 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K118 = new RegExp("light-dark\\(\\s*", "iy");
  const K119 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K120 = new RegExp("#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\\w-])", "y");
  const K121 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K122 = new RegExp("[a-zA-Z][\\w-]*(?![\\w(-])", "y");
  const K123 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
  const K124 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K125 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K126 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K127 = new RegExp("\\s+|(?=[:;])|(?<=[:;])", "y");
  const K128 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, 2, 3, 0, 0, 0, 2, -1, -1, 1, 4, -1, 5, 6, -1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 1, 1, 1, 0, 0, 8, 8, 9, 8, 10, 8, 8, 9, 8, 8, 8, 9, 8, 8, 9, 8, 8, 9, 8, 8, 8, 10, 8, 8, 8, 8, 0, 0, 0, 0, 8, 0, 8, 8, 9, 8, 10, 8, 8, 9, 8, 8, 8, 9, 8, 8, 9, 8, 8, 9, 8, 8, 8, 10, 8, 8, 8, 8, 0, 0, 0, 0, 0]);
  const K129 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K130 = new RegExp(`[^\\s(),\\/:;"']`, "y");
  const K131 = new RegExp("(?:var|env)(?=\\()", "iy");
  const K132 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K133 = new RegExp("\\(\\s*", "y");
  const K134 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K135 = new RegExp("\\s*,", "y");
  const K136 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K137 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K138 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 2, -1, -1, -1, 3, -1, -1, 4, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 2, -1, -1, -1, 3, -1, -1, 4, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K139 = new RegExp("(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\\(", "iy");
  const K140 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K141 = new RegExp("\\(\\s*", "y");
  const K142 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K143 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K144 = new RegExp("(?:--[\\w-]*|[a-zA-Z_-][\\w-]*)(?=\\()", "y");
  const K145 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
  const K146 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?[%a-zA-Z-]*(?![\\w\\\\.])", "y");
  const K147 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K148 = new RegExp("<=|>=|==|!=|[+*<>=:;]|-(?![\\w-])", "y");
  const K149 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K150 = new RegExp("[-_a-zA-Z][-_a-zA-Z\\d]*(?![\\w(-])", "y");
  const K151 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
  const K152 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, -1, -1, -1, 1, -1, -1, 0, 3, -1, 4, 5, -1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, -1, -1, 6, 6, 7, 6, 6, 6, 6, 8, 6, 6, 6, 9, 6, 6, 8, 6, 6, 8, 6, 6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, 6, -1, 6, 6, 7, 6, 6, 6, 6, 8, 6, 6, 6, 9, 6, 6, 8, 6, 6, 8, 6, 6, 6, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1]);
  const K153 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K154 = new RegExp("(?:from|to)(?![\\w-])", "iy");
  const K155 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K156 = new RegExp("(?:entry|exit|cover|contain)(?![\\w-])", "iy");
  const K157 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K158 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K159 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K160 = new RegExp("(?:linear|ease-in-out|ease-in|ease-out|ease|step-start|step-end)(?![\\w(-])", "iy");
  const K161 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K162 = new RegExp("cubic-bezier\\(\\s*", "iy");
  const K163 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K164 = new RegExp("steps\\(\\s*", "iy");
  const K165 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K166 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K167 = new RegExp("(?:jump-start|jump-end|jump-none|jump-both|start|end)(?![\\w-])", "iy");
  const K168 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K169 = new RegExp("linear\\(\\s*", "iy");
  const K170 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K171 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K172 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K173 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K174 = new RegExp(`"(?:\\\\[\\s\\S]|[^"\\\\])*"|'(?:\\\\[\\s\\S]|[^'\\\\])*'`, "y");
  const K175 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K176 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K177 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K178 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K179 = new RegExp(`[^()"']`, "y");
  const K180 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K181 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K182 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K183 = new RegExp(`[^(),"']`, "y");
  const K184 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K185 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K186 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K187 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K188 = new RegExp(`[^();"']`, "y");
  const K189 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K190 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K191 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K192 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K193 = new RegExp(`[^()\\s"']`, "y");
  const K194 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K195 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K196 = new RegExp("\\/\\*[\\s\\S]*?\\*\\/", "y");
  const K197 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K198 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K199 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K200 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K201 = new RegExp("[\\s;]", "y");
  const K202 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]);
  const K203 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0]);
  const K204 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]);
  const K205 = new RegExp(`[^{;()"']`, "y");
  const K206 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]);
  const K207 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, -1, 0, 0]);
  const K208 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1]);
  const K209 = new RegExp(`[^{}"']`, "y");
  const K210 = new RegExp(`["'][\\s\\S]*`, "y");
  const K211 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K212 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1]);
  const K213 = new RegExp("\\/\\*[\\s\\S]*", "y");
  const K214 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K215 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K216 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K217 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K218 = new RegExp("@keyframes ", "iy");
  const K219 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K220 = new RegExp("@property ", "iy");
  const K221 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K222 = new RegExp("@function ", "iy");
  const K223 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K224 = new RegExp("@scope", "iy");
  const K225 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K226 = new RegExp("@starting-style$", "iy");
  const K227 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K228 = new RegExp("@scroll-timeline ", "iy");
  const K229 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K230 = new RegExp("@view-timeline ", "iy");
  const K231 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K232 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K233 = new RegExp("@[^ ]*", "y");
  const K234 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K235 = new RegExp("--[-_a-zA-Z][-_a-zA-Z\\d]*", "y");
  const K236 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K237 = new RegExp(`['"]`, "y");
  const K238 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K239 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K240 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K241 = new RegExp(`['"]`, "y");
  const K242 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K243 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K244 = new RegExp(`(?:(?!['"]$)[\\s\\S])+`, "y");
  const K245 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K246 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1]);
  const K247 = new RegExp("[^|]", "y");
  const K248 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1]);
  const K249 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]);
  const K250 = new RegExp("[tT][oO]", "y");
  const K251 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K252 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K253 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K254 = new RegExp("--[-\\w]+", "y");
  const K255 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K256 = new RegExp("[\\s\\S]*(?=\\)$)", "y");
  const K257 = new RegExp("@function\\s+", "iy");
  const K258 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K259 = new RegExp("\\s*\\(", "y");
  const K260 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K261 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K262 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K263 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K264 = new RegExp(`[^():"']`, "y");
  const K265 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K266 = new RegExp("--[-\\w]+", "y");
  const K267 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K268 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K269 = new RegExp("\\s", "y");
  const K270 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K271 = new RegExp("[^\\n]", "y");
  const K272 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K273 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K274 = new RegExp("[^:]", "y");
  const K275 = new RegExp("(?:(?![!]important\\s*$)[\\s\\S])+", "iy");
  const K276 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K277 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K278 = new RegExp("!important\\s*$", "iy");
  const K279 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K280 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K281 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K282 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K283 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K284 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K285 = new RegExp(`[^()\\s,"']`, "y");
  const K286 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K287 = new RegExp("[\\s,]", "y");
  const K288 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K289 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K290 = new RegExp("[\\s,]", "y");
  const K291 = new RegExp("scroll\\(", "iy");
  const K292 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K293 = new RegExp("view\\(", "iy");
  const K294 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K295 = new RegExp("(?:auto|none|--|scroll\\(|view\\()[\\s\\S]*", "iy");
  const K296 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K297 = new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const K298 = new RegExp("[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:%|[a-zA-Z]+)?", "y");
  const K299 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K300 = new RegExp("auto", "iy");
  const K301 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K302 = new RegExp("\\s*\\)", "y");
  const K303 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K304 = new RegExp("\\s*,\\s*", "y");
  const K305 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K306 = new RegExp("\\s*\\/\\s*", "y");
  const K307 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K308 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K309 = new RegExp("\\s", "y");
  const K310 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K311 = new RegExp("\\s", "y");
  const K312 = new RegExp("\\s+|(?=[:;])|(?<=[:;])", "y");
  const K313 = new RegExp("(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\\(", "iy");
  const K314 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K315 = new RegExp(`"(?:\\\\[\\s\\S]|[^"\\\\])*"|'(?:\\\\[\\s\\S]|[^'\\\\])*'`, "y");
  const K316 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K317 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]);
  const K318 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, -1, 0, 0]);
  const K319 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1]);
  const K320 = new RegExp(`[^{}"']`, "y");
  const K321 = new RegExp("\\/\\*[\\s\\S]*", "y");
  const K322 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K323 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K324 = new Int16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const K325 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const K326 = new RegExp(`[^()"']`, "y");
  const K327 = new RegExp(`["'][\\s\\S]*`, "y");
  const K328 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const AK0 = A["number"];
  const AK1 = A["percentage"];
  const AK2 = A["dimension"];
  const AK3 = A["angle"];
  const AK4 = A["none"];
  const AK5 = A["string"];
  const AK6 = A["calc"];
  const AK7 = A["minMax"];
  const AK8 = A["clampFn"];
  const AK9 = A["signAbs"];
  const AK10 = A["calcSum"];
  const AK11 = A["calcProduct"];
  const AK12 = A["calcConstant"];
  const AK13 = A["calcKeyword"];
  const AK14 = A["varFn"];
  const AK15 = A["rgbModern"];
  const AK16 = A["rgbLegacyPct"];
  const AK17 = A["rgbLegacyNum"];
  const AK18 = A["hslModern"];
  const AK19 = A["hslLegacy"];
  const AK20 = A["hwbFn"];
  const AK21 = A["labFn"];
  const AK22 = A["lchFn"];
  const AK23 = A["oklabFn"];
  const AK24 = A["oklchFn"];
  const AK25 = A["colorFn"];
  const AK26 = A["relativeColor"];
  const AK27 = A["colorMix"];
  const AK28 = A["mixPolar"];
  const AK29 = A["mixRect"];
  const AK30 = A["mixLead"];
  const AK31 = A["mixTrail"];
  const AK32 = A["lightDark"];
  const AK33 = A["hex"];
  const AK34 = A["colorKeyword"];
  const AK35 = A["commaList"];
  const AK36 = A["slashList"];
  const AK37 = A["spaceList"];
  const AK38 = A["badTerm"];
  const AK39 = A["varCall"];
  const AK40 = A["colorCall"];
  const AK41 = A["call"];
  const AK42 = A["numeric"];
  const AK43 = A["operator"];
  const AK44 = A["identTerm"];
  const AK45 = A["scalarTerm"];
  const AK46 = A["selectorKeyword"];
  const AK47 = A["selectorNamed"];
  const AK48 = A["timingKeyword"];
  const AK49 = A["cubicBezier"];
  const AK50 = A["stepsFn"];
  const AK51 = A["linearFn"];
  const AK52 = A["linearStop"];
  const AK53 = A["commaRun"];
  const AK54 = A["commaItems"];
  const AK55 = A["semiRun"];
  const AK56 = A["semiItems"];
  const AK57 = A["spaceRun"];
  const AK58 = A["spaceItems"];
  const AK59 = A["restText"];
  const AK60 = A["preludeRun"];
  const AK61 = A["semiTail"];
  const AK62 = A["blockTail"];
  const AK63 = A["ruleBlock"];
  const AK64 = A["openComment"];
  const AK65 = A["openBlock"];
  const AK66 = A["openRule"];
  const AK67 = A["ruleList"];
  const AK68 = A["atKeyframes"];
  const AK69 = A["atProperty"];
  const AK70 = A["atFunction"];
  const AK71 = A["atScope"];
  const AK72 = A["atStartingStyle"];
  const AK73 = A["atScrollTimeline"];
  const AK74 = A["atViewTimeline"];
  const AK75 = A["atOther"];
  const AK76 = A["atName"];
  const AK77 = A["syntaxText"];
  const AK78 = A["syntaxCore"];
  const AK79 = A["syntaxPart"];
  const AK80 = A["syntaxAlts"];
  const AK81 = A["scopeGroup"];
  const AK82 = A["scopePrelude"];
  const AK83 = A["functionName"];
  const AK84 = A["functionParams"];
  const AK85 = A["functionHead"];
  const AK86 = A["colonRun"];
  const AK87 = A["paramDefault"];
  const AK88 = A["functionParam"];
  const AK89 = A["paramName"];
  const AK90 = A["paramSyntax"];
  const AK91 = A["paramHead"];
  const AK92 = A["declName"];
  const AK93 = A["declValue"];
  const AK94 = A["declImportant"];
  const AK95 = A["declaration"];
  const AK96 = A["listComma"];
  const AK97 = A["commaSpans"];
  const AK98 = A["argRun"];
  const AK99 = A["timelineArgs"];
  function r_ws_v(s, i) {
    let o;
    {
      let t0;
      if (i >= s.length) t0 = -1;
      else {
        let q1 = i;
        for (; q1 < s.length; q1++) {
          const c2 = s.charCodeAt(q1);
          if (c2 < 128) {
            if (K0[c2] === 0) break;
          } else {
            K1.lastIndex = q1;
            if (!K1.test(s)) break;
          }
        }
        if (q1 - i < 0) t0 = -1;
        else {
          V = q1 > i ? s.substring(i, q1) : void 0;
          t0 = q1;
        }
      }
      if (t0 < 0) {
        V = void 0;
        o = i;
      } else o = t0;
    }
    return o;
  }
  function r_ws1_v(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      let q3 = i;
      for (; q3 < s.length; q3++) {
        const c4 = s.charCodeAt(q3);
        if (c4 < 128) {
          if (K2[c4] === 0) break;
        } else {
          K3.lastIndex = q3;
          if (!K3.test(s)) break;
        }
      }
      if (q3 - i < 1) o = -1;
      else {
        V = q3 > i ? s.substring(i, q3) : void 0;
        o = q3;
      }
    }
    return o;
  }
  function r_comma_v(s, i) {
    let o;
    {
      const c5 = s.charCodeAt(i);
      if (!(c5 < 128 ? K5[c5] === 1 : c5 === c5)) o = -1;
      else {
        K4.lastIndex = i;
        if (K4.test(s)) {
          o = K4.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_slash_v(s, i) {
    let o;
    {
      const c6 = s.charCodeAt(i);
      if (!(c6 < 128 ? K7[c6] === 1 : c6 === c6)) o = -1;
      else {
        K6.lastIndex = i;
        if (K6.test(s)) {
          o = K6.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_close_v(s, i) {
    let o;
    {
      const c7 = s.charCodeAt(i);
      if (!(c7 < 128 ? K9[c7] === 1 : c7 === c7)) o = -1;
      else {
        K8.lastIndex = i;
        if (K8.test(s)) {
          o = K8.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_number_v(s, i) {
    let o;
    {
      const c8 = s.charCodeAt(i);
      if (!(c8 < 128 ? K11[c8] === 1 : false)) o = -1;
      else {
        K10.lastIndex = i;
        if (K10.test(s)) {
          o = K10.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK0(V);
    return o;
  }
  function r_percentage_v(s, i) {
    let o;
    {
      const c9 = s.charCodeAt(i);
      if (!(c9 < 128 ? K13[c9] === 1 : false)) o = -1;
      else {
        K12.lastIndex = i;
        if (K12.test(s)) {
          o = K12.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK1(V);
    return o;
  }
  function r_dimension_v(s, i) {
    let o;
    {
      const c10 = s.charCodeAt(i);
      if (!(c10 < 128 ? K15[c10] === 1 : false)) o = -1;
      else {
        K14.lastIndex = i;
        if (K14.test(s)) {
          o = K14.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK2(V);
    return o;
  }
  function r_angle_v(s, i) {
    let o;
    {
      const c11 = s.charCodeAt(i);
      if (!(c11 < 128 ? K17[c11] === 1 : false)) o = -1;
      else {
        K16.lastIndex = i;
        if (K16.test(s)) {
          o = K16.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK3(V);
    return o;
  }
  function r_none_v(s, i) {
    let o;
    {
      const c12 = s.charCodeAt(i);
      if (!(c12 < 128 ? K19[c12] === 1 : false)) o = -1;
      else {
        K18.lastIndex = i;
        if (K18.test(s)) {
          o = K18.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK4(V);
    return o;
  }
  function r_ident_v(s, i) {
    let o;
    {
      const c13 = s.charCodeAt(i);
      if (!(c13 < 128 ? K21[c13] === 1 : false)) o = -1;
      else {
        K20.lastIndex = i;
        if (K20.test(s)) {
          o = K20.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_dashedIdent_v(s, i) {
    let o;
    {
      const c14 = s.charCodeAt(i);
      if (!(c14 < 128 ? K23[c14] === 1 : false)) o = -1;
      else {
        K22.lastIndex = i;
        if (K22.test(s)) {
          o = K22.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_string_v(s, i) {
    let o;
    {
      const c15 = s.charCodeAt(i);
      if (!(c15 < 128 ? K25[c15] === 1 : false)) o = -1;
      else {
        K24.lastIndex = i;
        if (K24.test(s)) {
          o = K24.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK5(V);
    return o;
  }
  function r_balanced_v(s, i) {
    let o;
    {
      let q16 = i, n18 = 0;
      const a19 = [];
      for (; ; ) {
        const c20 = s.charCodeAt(q16);
        if (!(c20 < 128 ? K26[c20] === 1 : c20 === c20)) break;
        let t17;
        L21: {
          const c32 = s.charCodeAt(q16);
          const g33 = c32 < 128 ? K27[c32] : c32 === c32 ? 0 : -1;
          switch (g33) {
            case 0: {
              if (q16 >= s.length) t17 = -1;
              else {
                let q34 = q16;
                for (; q34 < s.length; q34++) {
                  const c35 = s.charCodeAt(q34);
                  if (c35 < 128) {
                    if (K28[c35] === 0) break;
                  } else {
                    K29.lastIndex = q34;
                    if (!K29.test(s)) break;
                  }
                }
                if (q34 - q16 < 1) t17 = -1;
                else {
                  V = q34 > q16 ? s.substring(q16, q34) : void 0;
                  t17 = q34;
                }
              }
              break L21;
            }
            case 1: {
              t17 = r_string_v(s, q16);
              break L21;
            }
            case 2: {
              t17 = h_22(s, q16);
              break L21;
            }
            default:
              t17 = -1;
          }
        }
        if (t17 < 0 || t17 === q16) break;
        a19.push(V);
        n18++;
        q16 = t17;
      }
      if (n18 < 0) o = -1;
      else {
        V = a19;
        o = q16;
      }
    }
    return o;
  }
  function r_mathFn_v(s, i) {
    let o;
    L36: {
      const c37 = s.charCodeAt(i);
      const g38 = c37 < 128 ? K30[c37] : c37 === c37 ? -1 : -1;
      switch (g38) {
        case 0: {
          o = r_signAbs_v(s, i);
          break L36;
        }
        case 1: {
          o = r_calc_v(s, i);
          if (o >= 0) break L36;
          o = r_clampFn_v(s, i);
          break L36;
        }
        case 2: {
          o = r_varFn_v(s, i);
          break L36;
        }
        case 3: {
          o = r_minMax_v(s, i);
          break L36;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_calc_v(s, i) {
    let o;
    {
      let t39;
      {
        let t42;
        {
          const c43 = s.charCodeAt(i);
          if (!(c43 < 128 ? K32[c43] === 1 : false)) t42 = -1;
          else {
            K31.lastIndex = i;
            if (K31.test(s)) {
              t42 = K31.lastIndex;
            } else t42 = -1;
          }
        }
        if (t42 < 0) t39 = -1;
        else {
          t39 = r_calcSum_v(s, t42);
        }
      }
      if (t39 < 0) o = -1;
      else {
        const v41 = V;
        let u40;
        u40 = r_close_r(s, t39);
        if (u40 < 0) o = -1;
        else {
          V = v41;
          o = u40;
        }
      }
    }
    if (o >= 0) V = AK6(V);
    return o;
  }
  function r_minMax_v(s, i) {
    let o;
    L44: {
      o = -1;
      let t45;
      {
        const c51 = s.charCodeAt(i);
        if (!(c51 < 128 ? K34[c51] === 1 : false)) t45 = -1;
        else {
          K33.lastIndex = i;
          if (K33.test(s)) {
            t45 = K33.lastIndex;
            V = s.substring(i, t45);
          } else t45 = -1;
        }
      }
      if (t45 < 0) break L44;
      const v48 = V;
      let t46;
      {
        let t52;
        {
          const c53 = s.charCodeAt(t45);
          if (!(c53 < 128 ? K36[c53] === 1 : false)) t52 = -1;
          else {
            K35.lastIndex = t45;
            if (K35.test(s)) {
              t52 = K35.lastIndex;
            } else t52 = -1;
          }
        }
        if (t52 < 0) t46 = -1;
        else {
          t46 = r_calcSum_v(s, t52);
        }
      }
      if (t46 < 0) break L44;
      const v49 = V;
      let t47;
      {
        let t54;
        {
          let q57 = t46, n59 = 0;
          const a60 = [];
          for (; ; ) {
            const c61 = s.charCodeAt(q57);
            if (!(c61 < 128 ? K37[c61] === 1 : c61 === c61)) break;
            let t58;
            {
              let t62;
              t62 = r_comma_r(s, q57);
              if (t62 < 0) t58 = -1;
              else {
                t58 = r_calcSum_v(s, t62);
              }
            }
            if (t58 < 0 || t58 === q57) break;
            a60.push(V);
            n59++;
            q57 = t58;
          }
          if (n59 < 0) t54 = -1;
          else {
            V = a60;
            t54 = q57;
          }
        }
        if (t54 < 0) t47 = -1;
        else {
          const v56 = V;
          let u55;
          u55 = r_close_r(s, t54);
          if (u55 < 0) t47 = -1;
          else {
            V = v56;
            t47 = u55;
          }
        }
      }
      if (t47 < 0) break L44;
      const v50 = V;
      const a63 = [];
      if (v48 !== void 0) a63.push(v48);
      if (v49 !== void 0) a63.push(v49);
      if (v50 !== void 0) a63.push(v50);
      V = a63;
      o = t47;
    }
    if (o >= 0) V = AK7(V);
    return o;
  }
  function r_clampFn_v(s, i) {
    let o;
    L64: {
      o = -1;
      let t65;
      {
        let t71;
        {
          const c72 = s.charCodeAt(i);
          if (!(c72 < 128 ? K39[c72] === 1 : false)) t71 = -1;
          else {
            K38.lastIndex = i;
            if (K38.test(s)) {
              t71 = K38.lastIndex;
            } else t71 = -1;
          }
        }
        if (t71 < 0) t65 = -1;
        else {
          t65 = r_calcSum_v(s, t71);
        }
      }
      if (t65 < 0) break L64;
      const v68 = V;
      let t66;
      {
        let t73;
        t73 = r_comma_r(s, t65);
        if (t73 < 0) t66 = -1;
        else {
          t66 = r_calcSum_v(s, t73);
        }
      }
      if (t66 < 0) break L64;
      const v69 = V;
      let t67;
      {
        let t74;
        {
          let t77;
          t77 = r_comma_r(s, t66);
          if (t77 < 0) t74 = -1;
          else {
            t74 = r_calcSum_v(s, t77);
          }
        }
        if (t74 < 0) t67 = -1;
        else {
          const v76 = V;
          let u75;
          u75 = r_close_r(s, t74);
          if (u75 < 0) t67 = -1;
          else {
            V = v76;
            t67 = u75;
          }
        }
      }
      if (t67 < 0) break L64;
      const v70 = V;
      const a78 = [];
      if (v68 !== void 0) a78.push(v68);
      if (v69 !== void 0) a78.push(v69);
      if (v70 !== void 0) a78.push(v70);
      V = a78;
      o = t67;
    }
    if (o >= 0) V = AK8(V);
    return o;
  }
  function r_signAbs_v(s, i) {
    let o;
    L79: {
      o = -1;
      let t80;
      {
        const c84 = s.charCodeAt(i);
        if (!(c84 < 128 ? K41[c84] === 1 : false)) t80 = -1;
        else {
          K40.lastIndex = i;
          if (K40.test(s)) {
            t80 = K40.lastIndex;
            V = s.substring(i, t80);
          } else t80 = -1;
        }
      }
      if (t80 < 0) break L79;
      const v82 = V;
      let t81;
      {
        let t85;
        {
          let t88;
          {
            const c89 = s.charCodeAt(t80);
            if (!(c89 < 128 ? K43[c89] === 1 : false)) t88 = -1;
            else {
              K42.lastIndex = t80;
              if (K42.test(s)) {
                t88 = K42.lastIndex;
              } else t88 = -1;
            }
          }
          if (t88 < 0) t85 = -1;
          else {
            t85 = r_calcSum_v(s, t88);
          }
        }
        if (t85 < 0) t81 = -1;
        else {
          const v87 = V;
          let u86;
          u86 = r_close_r(s, t85);
          if (u86 < 0) t81 = -1;
          else {
            V = v87;
            t81 = u86;
          }
        }
      }
      if (t81 < 0) break L79;
      const v83 = V;
      const a90 = [];
      if (v82 !== void 0) a90.push(v82);
      if (v83 !== void 0) a90.push(v83);
      V = a90;
      o = t81;
    }
    if (o >= 0) V = AK9(V);
    return o;
  }
  function r_calcSum_v(s, i) {
    let o;
    L91: {
      o = -1;
      let t92;
      t92 = r_calcProduct_v(s, i);
      if (t92 < 0) break L91;
      const v94 = V;
      let t93;
      {
        let q96 = t92, n98 = 0;
        const a99 = [];
        for (; ; ) {
          const c100 = s.charCodeAt(q96);
          if (!(c100 < 128 ? K44[c100] === 1 : c100 === c100)) break;
          let t97;
          L101: {
            t97 = -1;
            let t102;
            t102 = r_calcAddOp_v(s, q96);
            if (t102 < 0) break L101;
            const v104 = V;
            let t103;
            t103 = r_calcProduct_v(s, t102);
            if (t103 < 0) break L101;
            const v105 = V;
            const a106 = [];
            if (v104 !== void 0) a106.push(v104);
            if (v105 !== void 0) a106.push(v105);
            V = a106;
            t97 = t103;
          }
          if (t97 < 0 || t97 === q96) break;
          a99.push(V);
          n98++;
          q96 = t97;
        }
        if (n98 < 0) t93 = -1;
        else {
          V = a99;
          t93 = q96;
        }
      }
      if (t93 < 0) break L91;
      const v95 = V;
      const a107 = [];
      if (v94 !== void 0) a107.push(v94);
      if (v95 !== void 0) a107.push(v95);
      V = a107;
      o = t93;
    }
    if (o >= 0) V = AK10(V);
    return o;
  }
  function r_calcAddOp_v(s, i) {
    let o;
    {
      const c108 = s.charCodeAt(i);
      if (!(c108 < 128 ? K46[c108] === 1 : c108 === c108)) o = -1;
      else {
        K45.lastIndex = i;
        if (K45.test(s)) {
          o = K45.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_calcProduct_v(s, i) {
    let o;
    L109: {
      o = -1;
      let t110;
      t110 = r_calcValue_v(s, i);
      if (t110 < 0) break L109;
      const v112 = V;
      let t111;
      {
        let q114 = t110, n116 = 0;
        const a117 = [];
        for (; ; ) {
          const c118 = s.charCodeAt(q114);
          if (!(c118 < 128 ? K47[c118] === 1 : c118 === c118)) break;
          let t115;
          L119: {
            t115 = -1;
            let t120;
            t120 = r_calcMulOp_v(s, q114);
            if (t120 < 0) break L119;
            const v122 = V;
            let t121;
            t121 = r_calcValue_v(s, t120);
            if (t121 < 0) break L119;
            const v123 = V;
            const a124 = [];
            if (v122 !== void 0) a124.push(v122);
            if (v123 !== void 0) a124.push(v123);
            V = a124;
            t115 = t121;
          }
          if (t115 < 0 || t115 === q114) break;
          a117.push(V);
          n116++;
          q114 = t115;
        }
        if (n116 < 0) t111 = -1;
        else {
          V = a117;
          t111 = q114;
        }
      }
      if (t111 < 0) break L109;
      const v113 = V;
      const a125 = [];
      if (v112 !== void 0) a125.push(v112);
      if (v113 !== void 0) a125.push(v113);
      V = a125;
      o = t111;
    }
    if (o >= 0) V = AK11(V);
    return o;
  }
  function r_calcMulOp_v(s, i) {
    let o;
    {
      const c126 = s.charCodeAt(i);
      if (!(c126 < 128 ? K49[c126] === 1 : c126 === c126)) o = -1;
      else {
        K48.lastIndex = i;
        if (K48.test(s)) {
          o = K48.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_calcValue_v(s, i) {
    let o;
    L127: {
      const c128 = s.charCodeAt(i);
      const g129 = c128 < 128 ? K50[c128] : c128 === c128 ? -1 : -1;
      switch (g129) {
        case 0: {
          o = r_calcGroup_v(s, i);
          break L127;
        }
        case 1: {
          o = r_percentage_v(s, i);
          if (o >= 0) break L127;
          o = r_angle_v(s, i);
          if (o >= 0) break L127;
          o = r_number_v(s, i);
          if (o >= 0) break L127;
          o = r_dimension_v(s, i);
          break L127;
        }
        case 2: {
          o = r_calcConstant_v(s, i);
          if (o >= 0) break L127;
          o = r_percentage_v(s, i);
          if (o >= 0) break L127;
          o = r_angle_v(s, i);
          if (o >= 0) break L127;
          o = r_number_v(s, i);
          if (o >= 0) break L127;
          o = r_dimension_v(s, i);
          break L127;
        }
        case 3: {
          o = r_mathFn_v(s, i);
          if (o >= 0) break L127;
          o = r_calcKeyword_v(s, i);
          break L127;
        }
        case 4: {
          o = r_calcKeyword_v(s, i);
          break L127;
        }
        case 5: {
          o = r_mathFn_v(s, i);
          if (o >= 0) break L127;
          o = r_calcConstant_v(s, i);
          if (o >= 0) break L127;
          o = r_calcKeyword_v(s, i);
          break L127;
        }
        case 6: {
          o = r_calcConstant_v(s, i);
          if (o >= 0) break L127;
          o = r_calcKeyword_v(s, i);
          break L127;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_calcGroup_v(s, i) {
    let o;
    {
      let t130;
      {
        let t133;
        {
          const c134 = s.charCodeAt(i);
          if (!(c134 < 128 ? K52[c134] === 1 : false)) t133 = -1;
          else {
            K51.lastIndex = i;
            if (K51.test(s)) {
              t133 = K51.lastIndex;
            } else t133 = -1;
          }
        }
        if (t133 < 0) t130 = -1;
        else {
          t130 = r_calcSum_v(s, t133);
        }
      }
      if (t130 < 0) o = -1;
      else {
        const v132 = V;
        let u131;
        u131 = r_close_r(s, t130);
        if (u131 < 0) o = -1;
        else {
          V = v132;
          o = u131;
        }
      }
    }
    return o;
  }
  function r_calcConstant_v(s, i) {
    let o;
    {
      const c135 = s.charCodeAt(i);
      if (!(c135 < 128 ? K54[c135] === 1 : false)) o = -1;
      else {
        K53.lastIndex = i;
        if (K53.test(s)) {
          o = K53.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK12(V);
    return o;
  }
  function r_calcKeyword_v(s, i) {
    let o;
    {
      const c136 = s.charCodeAt(i);
      if (!(c136 < 128 ? K56[c136] === 1 : false)) o = -1;
      else {
        K55.lastIndex = i;
        if (K55.test(s)) {
          o = K55.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK13(V);
    return o;
  }
  function r_varFn_v(s, i) {
    let o;
    L137: {
      o = -1;
      let t138;
      {
        const c144 = s.charCodeAt(i);
        if (!(c144 < 128 ? K58[c144] === 1 : false)) t138 = -1;
        else {
          K57.lastIndex = i;
          if (K57.test(s)) {
            t138 = K57.lastIndex;
            V = s.substring(i, t138);
          } else t138 = -1;
        }
      }
      if (t138 < 0) break L137;
      const v141 = V;
      let t139;
      {
        let t145;
        {
          const c146 = s.charCodeAt(t138);
          if (!(c146 < 128 ? K60[c146] === 1 : false)) t145 = -1;
          else {
            K59.lastIndex = t138;
            if (K59.test(s)) {
              t145 = K59.lastIndex;
            } else t145 = -1;
          }
        }
        if (t145 < 0) t139 = -1;
        else {
          L147: {
            const c148 = s.charCodeAt(t145);
            const g149 = c148 < 128 ? K61[c148] : c148 === c148 ? -1 : -1;
            switch (g149) {
              case 0: {
                t139 = r_dashedIdent_v(s, t145);
                if (t139 >= 0) break L147;
                t139 = r_ident_v(s, t145);
                break L147;
              }
              case 1: {
                t139 = r_ident_v(s, t145);
                break L147;
              }
              default:
                t139 = -1;
            }
          }
        }
      }
      if (t139 < 0) break L137;
      const v142 = V;
      let t140;
      {
        let t150;
        {
          const c155 = s.charCodeAt(t139);
          if (!(c155 < 128 ? K62[c155] === 1 : c155 === c155)) {
            V = void 0;
            t150 = t139;
          } else {
            let t153;
            {
              let t154;
              t154 = r_comma_r(s, t139);
              if (t154 < 0) t153 = -1;
              else {
                t153 = r_balanced_v(s, t154);
              }
            }
            if (t153 < 0) {
              V = void 0;
              t150 = t139;
            } else t150 = t153;
          }
        }
        if (t150 < 0) t140 = -1;
        else {
          const v152 = V;
          let u151;
          u151 = r_close_r(s, t150);
          if (u151 < 0) t140 = -1;
          else {
            V = v152;
            t140 = u151;
          }
        }
      }
      if (t140 < 0) break L137;
      const v143 = V;
      const a156 = [];
      if (v141 !== void 0) a156.push(v141);
      if (v142 !== void 0) a156.push(v142);
      if (v143 !== void 0) a156.push(v143);
      V = a156;
      o = t140;
    }
    if (o >= 0) V = AK14(V);
    return o;
  }
  function r_color_v(s, i) {
    let o;
    L157: {
      const c158 = s.charCodeAt(i);
      const g159 = c158 < 128 ? K63[c158] : c158 === c158 ? -1 : -1;
      switch (g159) {
        case 0: {
          o = r_hex_v(s, i);
          break L157;
        }
        case 1: {
          o = r_colorKeyword_v(s, i);
          break L157;
        }
        case 2: {
          o = r_colorMix_v(s, i);
          if (o >= 0) break L157;
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L157;
          o = r_colorFn_v(s, i);
          if (o >= 0) break L157;
          o = r_colorKeyword_v(s, i);
          break L157;
        }
        case 3: {
          o = r_varFn_v(s, i);
          if (o >= 0) break L157;
          o = r_colorKeyword_v(s, i);
          break L157;
        }
        case 4: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L157;
          o = r_hslFn_v(s, i);
          if (o >= 0) break L157;
          o = r_hwbFn_v(s, i);
          if (o >= 0) break L157;
          o = r_colorKeyword_v(s, i);
          break L157;
        }
        case 5: {
          o = r_lightDark_v(s, i);
          if (o >= 0) break L157;
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L157;
          o = r_labFn_v(s, i);
          if (o >= 0) break L157;
          o = r_lchFn_v(s, i);
          if (o >= 0) break L157;
          o = r_colorKeyword_v(s, i);
          break L157;
        }
        case 6: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L157;
          o = r_oklabFn_v(s, i);
          if (o >= 0) break L157;
          o = r_oklchFn_v(s, i);
          if (o >= 0) break L157;
          o = r_colorKeyword_v(s, i);
          break L157;
        }
        case 7: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L157;
          o = r_rgbFn_v(s, i);
          if (o >= 0) break L157;
          o = r_colorKeyword_v(s, i);
          break L157;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_component_v(s, i) {
    let o;
    L160: {
      const c161 = s.charCodeAt(i);
      const g162 = c161 < 128 ? K64[c161] : c161 === c161 ? -1 : -1;
      switch (g162) {
        case 0: {
          o = r_percentage_v(s, i);
          if (o >= 0) break L160;
          o = r_number_v(s, i);
          break L160;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          break L160;
        }
        case 2: {
          o = r_none_v(s, i);
          break L160;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_hueValue_v(s, i) {
    let o;
    L163: {
      const c164 = s.charCodeAt(i);
      const g165 = c164 < 128 ? K65[c164] : c164 === c164 ? -1 : -1;
      switch (g165) {
        case 0: {
          o = r_angle_v(s, i);
          if (o >= 0) break L163;
          o = r_number_v(s, i);
          break L163;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          break L163;
        }
        case 2: {
          o = r_none_v(s, i);
          break L163;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_alphaValue_v(s, i) {
    let o;
    L166: {
      const c167 = s.charCodeAt(i);
      const g168 = c167 < 128 ? K66[c167] : c167 === c167 ? -1 : -1;
      switch (g168) {
        case 0: {
          o = r_percentage_v(s, i);
          if (o >= 0) break L166;
          o = r_number_v(s, i);
          break L166;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          break L166;
        }
        case 2: {
          o = r_none_v(s, i);
          break L166;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_alphaTail_v(s, i) {
    let o;
    {
      const c171 = s.charCodeAt(i);
      if (!(c171 < 128 ? K67[c171] === 1 : c171 === c171)) {
        V = void 0;
        o = i;
      } else {
        let t169;
        {
          let t170;
          t170 = r_slash_r(s, i);
          if (t170 < 0) t169 = -1;
          else {
            t169 = r_alphaValue_v(s, t170);
          }
        }
        if (t169 < 0) {
          V = void 0;
          o = i;
        } else o = t169;
      }
    }
    return o;
  }
  function r_rgbFn_v(s, i) {
    let o;
    {
      let t172;
      {
        let t175;
        {
          const c176 = s.charCodeAt(i);
          if (!(c176 < 128 ? K69[c176] === 1 : false)) t175 = -1;
          else {
            K68.lastIndex = i;
            if (K68.test(s)) {
              t175 = K68.lastIndex;
            } else t175 = -1;
          }
        }
        if (t175 < 0) t172 = -1;
        else {
          L177: {
            const c178 = s.charCodeAt(t175);
            const g179 = c178 < 128 ? K70[c178] : c178 === c178 ? -1 : -1;
            switch (g179) {
              case 0: {
                t172 = r_rgbModern_v(s, t175);
                if (t172 >= 0) break L177;
                t172 = r_rgbLegacyPct_v(s, t175);
                if (t172 >= 0) break L177;
                t172 = r_rgbLegacyNum_v(s, t175);
                break L177;
              }
              case 1: {
                t172 = r_rgbModern_v(s, t175);
                break L177;
              }
              default:
                t172 = -1;
            }
          }
        }
      }
      if (t172 < 0) o = -1;
      else {
        const v174 = V;
        let u173;
        u173 = r_close_r(s, t172);
        if (u173 < 0) o = -1;
        else {
          V = v174;
          o = u173;
        }
      }
    }
    return o;
  }
  function r_rgbModern_v(s, i) {
    let o;
    L180: {
      o = -1;
      let t181;
      t181 = r_component_v(s, i);
      if (t181 < 0) break L180;
      const v185 = V;
      let t182;
      {
        let t189;
        t189 = r_ws_r(s, t181);
        if (t189 < 0) t182 = -1;
        else {
          t182 = r_component_v(s, t189);
        }
      }
      if (t182 < 0) break L180;
      const v186 = V;
      let t183;
      {
        let t190;
        t190 = r_ws_r(s, t182);
        if (t190 < 0) t183 = -1;
        else {
          t183 = r_component_v(s, t190);
        }
      }
      if (t183 < 0) break L180;
      const v187 = V;
      let t184;
      t184 = r_alphaTail_v(s, t183);
      if (t184 < 0) break L180;
      const v188 = V;
      const a191 = [];
      if (v185 !== void 0) a191.push(v185);
      if (v186 !== void 0) a191.push(v186);
      if (v187 !== void 0) a191.push(v187);
      if (v188 !== void 0) a191.push(v188);
      V = a191;
      o = t184;
    }
    if (o >= 0) V = AK15(V);
    return o;
  }
  function r_rgbLegacyPct_v(s, i) {
    let o;
    L192: {
      o = -1;
      let t193;
      t193 = r_legacyPct_v(s, i);
      if (t193 < 0) break L192;
      const v197 = V;
      let t194;
      {
        let t201;
        t201 = r_comma_r(s, t193);
        if (t201 < 0) t194 = -1;
        else {
          t194 = r_legacyPct_v(s, t201);
        }
      }
      if (t194 < 0) break L192;
      const v198 = V;
      let t195;
      {
        let t202;
        t202 = r_comma_r(s, t194);
        if (t202 < 0) t195 = -1;
        else {
          t195 = r_legacyPct_v(s, t202);
        }
      }
      if (t195 < 0) break L192;
      const v199 = V;
      let t196;
      t196 = r_legacyAlpha_v(s, t195);
      if (t196 < 0) break L192;
      const v200 = V;
      const a203 = [];
      if (v197 !== void 0) a203.push(v197);
      if (v198 !== void 0) a203.push(v198);
      if (v199 !== void 0) a203.push(v199);
      if (v200 !== void 0) a203.push(v200);
      V = a203;
      o = t196;
    }
    if (o >= 0) V = AK16(V);
    return o;
  }
  function r_rgbLegacyNum_v(s, i) {
    let o;
    L204: {
      o = -1;
      let t205;
      t205 = r_legacyNum_v(s, i);
      if (t205 < 0) break L204;
      const v209 = V;
      let t206;
      {
        let t213;
        t213 = r_comma_r(s, t205);
        if (t213 < 0) t206 = -1;
        else {
          t206 = r_legacyNum_v(s, t213);
        }
      }
      if (t206 < 0) break L204;
      const v210 = V;
      let t207;
      {
        let t214;
        t214 = r_comma_r(s, t206);
        if (t214 < 0) t207 = -1;
        else {
          t207 = r_legacyNum_v(s, t214);
        }
      }
      if (t207 < 0) break L204;
      const v211 = V;
      let t208;
      t208 = r_legacyAlpha_v(s, t207);
      if (t208 < 0) break L204;
      const v212 = V;
      const a215 = [];
      if (v209 !== void 0) a215.push(v209);
      if (v210 !== void 0) a215.push(v210);
      if (v211 !== void 0) a215.push(v211);
      if (v212 !== void 0) a215.push(v212);
      V = a215;
      o = t208;
    }
    if (o >= 0) V = AK17(V);
    return o;
  }
  function r_legacyPct_v(s, i) {
    let o;
    L216: {
      const c217 = s.charCodeAt(i);
      const g218 = c217 < 128 ? K71[c217] : c217 === c217 ? -1 : -1;
      switch (g218) {
        case 0: {
          o = r_percentage_v(s, i);
          break L216;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          break L216;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_legacyNum_v(s, i) {
    let o;
    L219: {
      const c220 = s.charCodeAt(i);
      const g221 = c220 < 128 ? K72[c220] : c220 === c220 ? -1 : -1;
      switch (g221) {
        case 0: {
          o = r_number_v(s, i);
          break L219;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          break L219;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_legacyHue_v(s, i) {
    let o;
    L222: {
      const c223 = s.charCodeAt(i);
      const g224 = c223 < 128 ? K73[c223] : c223 === c223 ? -1 : -1;
      switch (g224) {
        case 0: {
          o = r_angle_v(s, i);
          if (o >= 0) break L222;
          o = r_number_v(s, i);
          break L222;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          break L222;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_legacyAlpha_v(s, i) {
    let o;
    {
      const c230 = s.charCodeAt(i);
      if (!(c230 < 128 ? K75[c230] === 1 : c230 === c230)) {
        V = void 0;
        o = i;
      } else {
        let t225;
        {
          let t226;
          t226 = r_comma_r(s, i);
          if (t226 < 0) t225 = -1;
          else {
            L227: {
              const c228 = s.charCodeAt(t226);
              const g229 = c228 < 128 ? K74[c228] : c228 === c228 ? -1 : -1;
              switch (g229) {
                case 0: {
                  t225 = r_percentage_v(s, t226);
                  if (t225 >= 0) break L227;
                  t225 = r_number_v(s, t226);
                  break L227;
                }
                case 1: {
                  t225 = r_mathFn_v(s, t226);
                  break L227;
                }
                default:
                  t225 = -1;
              }
            }
          }
        }
        if (t225 < 0) {
          V = void 0;
          o = i;
        } else o = t225;
      }
    }
    return o;
  }
  function r_hslFn_v(s, i) {
    let o;
    {
      let t231;
      {
        let t234;
        {
          const c235 = s.charCodeAt(i);
          if (!(c235 < 128 ? K77[c235] === 1 : false)) t234 = -1;
          else {
            K76.lastIndex = i;
            if (K76.test(s)) {
              t234 = K76.lastIndex;
            } else t234 = -1;
          }
        }
        if (t234 < 0) t231 = -1;
        else {
          L236: {
            const c237 = s.charCodeAt(t234);
            const g238 = c237 < 128 ? K78[c237] : c237 === c237 ? -1 : -1;
            switch (g238) {
              case 0: {
                t231 = r_hslModern_v(s, t234);
                if (t231 >= 0) break L236;
                t231 = r_hslLegacy_v(s, t234);
                break L236;
              }
              case 1: {
                t231 = r_hslModern_v(s, t234);
                break L236;
              }
              default:
                t231 = -1;
            }
          }
        }
      }
      if (t231 < 0) o = -1;
      else {
        const v233 = V;
        let u232;
        u232 = r_close_r(s, t231);
        if (u232 < 0) o = -1;
        else {
          V = v233;
          o = u232;
        }
      }
    }
    return o;
  }
  function r_hslModern_v(s, i) {
    let o;
    L239: {
      o = -1;
      let t240;
      t240 = r_hueValue_v(s, i);
      if (t240 < 0) break L239;
      const v244 = V;
      let t241;
      {
        let t248;
        t248 = r_ws_r(s, t240);
        if (t248 < 0) t241 = -1;
        else {
          t241 = r_component_v(s, t248);
        }
      }
      if (t241 < 0) break L239;
      const v245 = V;
      let t242;
      {
        let t249;
        t249 = r_ws_r(s, t241);
        if (t249 < 0) t242 = -1;
        else {
          t242 = r_component_v(s, t249);
        }
      }
      if (t242 < 0) break L239;
      const v246 = V;
      let t243;
      t243 = r_alphaTail_v(s, t242);
      if (t243 < 0) break L239;
      const v247 = V;
      const a250 = [];
      if (v244 !== void 0) a250.push(v244);
      if (v245 !== void 0) a250.push(v245);
      if (v246 !== void 0) a250.push(v246);
      if (v247 !== void 0) a250.push(v247);
      V = a250;
      o = t243;
    }
    if (o >= 0) V = AK18(V);
    return o;
  }
  function r_hslLegacy_v(s, i) {
    let o;
    L251: {
      o = -1;
      let t252;
      t252 = r_legacyHue_v(s, i);
      if (t252 < 0) break L251;
      const v256 = V;
      let t253;
      {
        let t260;
        t260 = r_comma_r(s, t252);
        if (t260 < 0) t253 = -1;
        else {
          t253 = r_legacyPct_v(s, t260);
        }
      }
      if (t253 < 0) break L251;
      const v257 = V;
      let t254;
      {
        let t261;
        t261 = r_comma_r(s, t253);
        if (t261 < 0) t254 = -1;
        else {
          t254 = r_legacyPct_v(s, t261);
        }
      }
      if (t254 < 0) break L251;
      const v258 = V;
      let t255;
      t255 = r_legacyAlpha_v(s, t254);
      if (t255 < 0) break L251;
      const v259 = V;
      const a262 = [];
      if (v256 !== void 0) a262.push(v256);
      if (v257 !== void 0) a262.push(v257);
      if (v258 !== void 0) a262.push(v258);
      if (v259 !== void 0) a262.push(v259);
      V = a262;
      o = t255;
    }
    if (o >= 0) V = AK19(V);
    return o;
  }
  function r_hwbFn_v(s, i) {
    let o;
    L263: {
      o = -1;
      let t264;
      {
        let t272;
        {
          const c273 = s.charCodeAt(i);
          if (!(c273 < 128 ? K80[c273] === 1 : false)) t272 = -1;
          else {
            K79.lastIndex = i;
            if (K79.test(s)) {
              t272 = K79.lastIndex;
            } else t272 = -1;
          }
        }
        if (t272 < 0) t264 = -1;
        else {
          t264 = r_hueValue_v(s, t272);
        }
      }
      if (t264 < 0) break L263;
      const v268 = V;
      let t265;
      {
        let t274;
        t274 = r_ws_r(s, t264);
        if (t274 < 0) t265 = -1;
        else {
          t265 = r_component_v(s, t274);
        }
      }
      if (t265 < 0) break L263;
      const v269 = V;
      let t266;
      {
        let t275;
        t275 = r_ws_r(s, t265);
        if (t275 < 0) t266 = -1;
        else {
          t266 = r_component_v(s, t275);
        }
      }
      if (t266 < 0) break L263;
      const v270 = V;
      let t267;
      {
        let t276;
        t276 = r_alphaTail_v(s, t266);
        if (t276 < 0) t267 = -1;
        else {
          const v278 = V;
          let u277;
          u277 = r_close_r(s, t276);
          if (u277 < 0) t267 = -1;
          else {
            V = v278;
            t267 = u277;
          }
        }
      }
      if (t267 < 0) break L263;
      const v271 = V;
      const a279 = [];
      if (v268 !== void 0) a279.push(v268);
      if (v269 !== void 0) a279.push(v269);
      if (v270 !== void 0) a279.push(v270);
      if (v271 !== void 0) a279.push(v271);
      V = a279;
      o = t267;
    }
    if (o >= 0) V = AK20(V);
    return o;
  }
  function r_labFn_v(s, i) {
    let o;
    L280: {
      o = -1;
      let t281;
      {
        let t289;
        {
          const c290 = s.charCodeAt(i);
          if (!(c290 < 128 ? K82[c290] === 1 : false)) t289 = -1;
          else {
            K81.lastIndex = i;
            if (K81.test(s)) {
              t289 = K81.lastIndex;
            } else t289 = -1;
          }
        }
        if (t289 < 0) t281 = -1;
        else {
          t281 = r_component_v(s, t289);
        }
      }
      if (t281 < 0) break L280;
      const v285 = V;
      let t282;
      {
        let t291;
        t291 = r_ws_r(s, t281);
        if (t291 < 0) t282 = -1;
        else {
          t282 = r_component_v(s, t291);
        }
      }
      if (t282 < 0) break L280;
      const v286 = V;
      let t283;
      {
        let t292;
        t292 = r_ws_r(s, t282);
        if (t292 < 0) t283 = -1;
        else {
          t283 = r_component_v(s, t292);
        }
      }
      if (t283 < 0) break L280;
      const v287 = V;
      let t284;
      {
        let t293;
        t293 = r_alphaTail_v(s, t283);
        if (t293 < 0) t284 = -1;
        else {
          const v295 = V;
          let u294;
          u294 = r_close_r(s, t293);
          if (u294 < 0) t284 = -1;
          else {
            V = v295;
            t284 = u294;
          }
        }
      }
      if (t284 < 0) break L280;
      const v288 = V;
      const a296 = [];
      if (v285 !== void 0) a296.push(v285);
      if (v286 !== void 0) a296.push(v286);
      if (v287 !== void 0) a296.push(v287);
      if (v288 !== void 0) a296.push(v288);
      V = a296;
      o = t284;
    }
    if (o >= 0) V = AK21(V);
    return o;
  }
  function r_lchFn_v(s, i) {
    let o;
    L297: {
      o = -1;
      let t298;
      {
        let t306;
        {
          const c307 = s.charCodeAt(i);
          if (!(c307 < 128 ? K84[c307] === 1 : false)) t306 = -1;
          else {
            K83.lastIndex = i;
            if (K83.test(s)) {
              t306 = K83.lastIndex;
            } else t306 = -1;
          }
        }
        if (t306 < 0) t298 = -1;
        else {
          t298 = r_component_v(s, t306);
        }
      }
      if (t298 < 0) break L297;
      const v302 = V;
      let t299;
      {
        let t308;
        t308 = r_ws_r(s, t298);
        if (t308 < 0) t299 = -1;
        else {
          t299 = r_component_v(s, t308);
        }
      }
      if (t299 < 0) break L297;
      const v303 = V;
      let t300;
      {
        let t309;
        t309 = r_ws_r(s, t299);
        if (t309 < 0) t300 = -1;
        else {
          t300 = r_hueValue_v(s, t309);
        }
      }
      if (t300 < 0) break L297;
      const v304 = V;
      let t301;
      {
        let t310;
        t310 = r_alphaTail_v(s, t300);
        if (t310 < 0) t301 = -1;
        else {
          const v312 = V;
          let u311;
          u311 = r_close_r(s, t310);
          if (u311 < 0) t301 = -1;
          else {
            V = v312;
            t301 = u311;
          }
        }
      }
      if (t301 < 0) break L297;
      const v305 = V;
      const a313 = [];
      if (v302 !== void 0) a313.push(v302);
      if (v303 !== void 0) a313.push(v303);
      if (v304 !== void 0) a313.push(v304);
      if (v305 !== void 0) a313.push(v305);
      V = a313;
      o = t301;
    }
    if (o >= 0) V = AK22(V);
    return o;
  }
  function r_oklabFn_v(s, i) {
    let o;
    L314: {
      o = -1;
      let t315;
      {
        let t323;
        {
          const c324 = s.charCodeAt(i);
          if (!(c324 < 128 ? K86[c324] === 1 : false)) t323 = -1;
          else {
            K85.lastIndex = i;
            if (K85.test(s)) {
              t323 = K85.lastIndex;
            } else t323 = -1;
          }
        }
        if (t323 < 0) t315 = -1;
        else {
          t315 = r_component_v(s, t323);
        }
      }
      if (t315 < 0) break L314;
      const v319 = V;
      let t316;
      {
        let t325;
        t325 = r_ws_r(s, t315);
        if (t325 < 0) t316 = -1;
        else {
          t316 = r_component_v(s, t325);
        }
      }
      if (t316 < 0) break L314;
      const v320 = V;
      let t317;
      {
        let t326;
        t326 = r_ws_r(s, t316);
        if (t326 < 0) t317 = -1;
        else {
          t317 = r_component_v(s, t326);
        }
      }
      if (t317 < 0) break L314;
      const v321 = V;
      let t318;
      {
        let t327;
        t327 = r_alphaTail_v(s, t317);
        if (t327 < 0) t318 = -1;
        else {
          const v329 = V;
          let u328;
          u328 = r_close_r(s, t327);
          if (u328 < 0) t318 = -1;
          else {
            V = v329;
            t318 = u328;
          }
        }
      }
      if (t318 < 0) break L314;
      const v322 = V;
      const a330 = [];
      if (v319 !== void 0) a330.push(v319);
      if (v320 !== void 0) a330.push(v320);
      if (v321 !== void 0) a330.push(v321);
      if (v322 !== void 0) a330.push(v322);
      V = a330;
      o = t318;
    }
    if (o >= 0) V = AK23(V);
    return o;
  }
  function r_oklchFn_v(s, i) {
    let o;
    L331: {
      o = -1;
      let t332;
      {
        let t340;
        {
          const c341 = s.charCodeAt(i);
          if (!(c341 < 128 ? K88[c341] === 1 : false)) t340 = -1;
          else {
            K87.lastIndex = i;
            if (K87.test(s)) {
              t340 = K87.lastIndex;
            } else t340 = -1;
          }
        }
        if (t340 < 0) t332 = -1;
        else {
          t332 = r_component_v(s, t340);
        }
      }
      if (t332 < 0) break L331;
      const v336 = V;
      let t333;
      {
        let t342;
        t342 = r_ws_r(s, t332);
        if (t342 < 0) t333 = -1;
        else {
          t333 = r_component_v(s, t342);
        }
      }
      if (t333 < 0) break L331;
      const v337 = V;
      let t334;
      {
        let t343;
        t343 = r_ws_r(s, t333);
        if (t343 < 0) t334 = -1;
        else {
          t334 = r_hueValue_v(s, t343);
        }
      }
      if (t334 < 0) break L331;
      const v338 = V;
      let t335;
      {
        let t344;
        t344 = r_alphaTail_v(s, t334);
        if (t344 < 0) t335 = -1;
        else {
          const v346 = V;
          let u345;
          u345 = r_close_r(s, t344);
          if (u345 < 0) t335 = -1;
          else {
            V = v346;
            t335 = u345;
          }
        }
      }
      if (t335 < 0) break L331;
      const v339 = V;
      const a347 = [];
      if (v336 !== void 0) a347.push(v336);
      if (v337 !== void 0) a347.push(v337);
      if (v338 !== void 0) a347.push(v338);
      if (v339 !== void 0) a347.push(v339);
      V = a347;
      o = t335;
    }
    if (o >= 0) V = AK24(V);
    return o;
  }
  function r_colorFn_v(s, i) {
    let o;
    L348: {
      o = -1;
      let t349;
      {
        let t359;
        {
          const c360 = s.charCodeAt(i);
          if (!(c360 < 128 ? K90[c360] === 1 : false)) t359 = -1;
          else {
            K89.lastIndex = i;
            if (K89.test(s)) {
              t359 = K89.lastIndex;
            } else t359 = -1;
          }
        }
        if (t359 < 0) t349 = -1;
        else {
          t349 = r_colorSpace_v(s, t359);
        }
      }
      if (t349 < 0) break L348;
      const v354 = V;
      let t350;
      {
        let t361;
        t361 = r_ws1_r(s, t349);
        if (t361 < 0) t350 = -1;
        else {
          t350 = r_component_v(s, t361);
        }
      }
      if (t350 < 0) break L348;
      const v355 = V;
      let t351;
      {
        let t362;
        t362 = r_ws_r(s, t350);
        if (t362 < 0) t351 = -1;
        else {
          t351 = r_component_v(s, t362);
        }
      }
      if (t351 < 0) break L348;
      const v356 = V;
      let t352;
      {
        let t363;
        t363 = r_ws_r(s, t351);
        if (t363 < 0) t352 = -1;
        else {
          t352 = r_component_v(s, t363);
        }
      }
      if (t352 < 0) break L348;
      const v357 = V;
      let t353;
      {
        let t364;
        t364 = r_alphaTail_v(s, t352);
        if (t364 < 0) t353 = -1;
        else {
          const v366 = V;
          let u365;
          u365 = r_close_r(s, t364);
          if (u365 < 0) t353 = -1;
          else {
            V = v366;
            t353 = u365;
          }
        }
      }
      if (t353 < 0) break L348;
      const v358 = V;
      const a367 = [];
      if (v354 !== void 0) a367.push(v354);
      if (v355 !== void 0) a367.push(v355);
      if (v356 !== void 0) a367.push(v356);
      if (v357 !== void 0) a367.push(v357);
      if (v358 !== void 0) a367.push(v358);
      V = a367;
      o = t353;
    }
    if (o >= 0) V = AK25(V);
    return o;
  }
  function r_colorSpace_v(s, i) {
    let o;
    {
      const c368 = s.charCodeAt(i);
      if (!(c368 < 128 ? K92[c368] === 1 : false)) o = -1;
      else {
        K91.lastIndex = i;
        if (K91.test(s)) {
          o = K91.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_relativeColor_v(s, i) {
    let o;
    L369: {
      o = -1;
      let t370;
      t370 = r_relativeHead_v(s, i);
      if (t370 < 0) break L369;
      const v373 = V;
      let t371;
      {
        let t376;
        t376 = r_ws1_r(s, t370);
        if (t376 < 0) t371 = -1;
        else {
          t371 = r_color_v(s, t376);
        }
      }
      if (t371 < 0) break L369;
      const v374 = V;
      let t372;
      {
        let t377;
        t377 = r_relativeTail_v(s, t371);
        if (t377 < 0) t372 = -1;
        else {
          const v379 = V;
          let u378;
          u378 = r_close_r(s, t377);
          if (u378 < 0) t372 = -1;
          else {
            V = v379;
            t372 = u378;
          }
        }
      }
      if (t372 < 0) break L369;
      const v375 = V;
      const a380 = [];
      if (v373 !== void 0) a380.push(v373);
      if (v374 !== void 0) a380.push(v374);
      if (v375 !== void 0) a380.push(v375);
      V = a380;
      o = t372;
    }
    if (o >= 0) V = AK26(V);
    return o;
  }
  function r_relativeHead_v(s, i) {
    let o;
    L381: {
      const c382 = s.charCodeAt(i);
      const g383 = c382 < 128 ? K93[c382] : c382 === c382 ? -1 : -1;
      switch (g383) {
        case 0: {
          {
            const c384 = s.charCodeAt(i);
            if (!(c384 < 128 ? K95[c384] === 1 : false)) o = -1;
            else {
              K94.lastIndex = i;
              if (K94.test(s)) {
                o = K94.lastIndex;
                V = s.substring(i, o);
              } else o = -1;
            }
          }
          break L381;
        }
        case 1: {
          {
            const c385 = s.charCodeAt(i);
            if (!(c385 < 128 ? K97[c385] === 1 : false)) o = -1;
            else {
              K96.lastIndex = i;
              if (K96.test(s)) {
                o = K96.lastIndex;
                V = s.substring(i, o);
              } else o = -1;
            }
          }
          break L381;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_relativeTail_v(s, i) {
    let o;
    L386: {
      o = -1;
      let t387;
      {
        const c399 = s.charCodeAt(i);
        if (!(c399 < 128 ? K98[c399] === 1 : c399 === c399)) {
          V = void 0;
          t387 = i;
        } else {
          let t397;
          {
            let t398;
            t398 = r_ws1_r(s, i);
            if (t398 < 0) t397 = -1;
            else {
              t397 = r_colorSpace_v(s, t398);
            }
          }
          if (t397 < 0) {
            V = void 0;
            t387 = i;
          } else t387 = t397;
        }
      }
      if (t387 < 0) break L386;
      const v392 = V;
      let t388;
      {
        let t400;
        t400 = r_ws1_r(s, t387);
        if (t400 < 0) t388 = -1;
        else {
          t388 = r_relativeComp_v(s, t400);
        }
      }
      if (t388 < 0) break L386;
      const v393 = V;
      let t389;
      {
        let t401;
        t401 = r_ws_r(s, t388);
        if (t401 < 0) t389 = -1;
        else {
          t389 = r_relativeComp_v(s, t401);
        }
      }
      if (t389 < 0) break L386;
      const v394 = V;
      let t390;
      {
        let t402;
        t402 = r_ws_r(s, t389);
        if (t402 < 0) t390 = -1;
        else {
          t390 = r_relativeComp_v(s, t402);
        }
      }
      if (t390 < 0) break L386;
      const v395 = V;
      let t391;
      {
        const c405 = s.charCodeAt(t390);
        if (!(c405 < 128 ? K99[c405] === 1 : c405 === c405)) {
          V = void 0;
          t391 = t390;
        } else {
          let t403;
          {
            let t404;
            t404 = r_slash_r(s, t390);
            if (t404 < 0) t403 = -1;
            else {
              t403 = r_relativeComp_v(s, t404);
            }
          }
          if (t403 < 0) {
            V = void 0;
            t391 = t390;
          } else t391 = t403;
        }
      }
      if (t391 < 0) break L386;
      const v396 = V;
      const a406 = [];
      if (v392 !== void 0) a406.push(v392);
      if (v393 !== void 0) a406.push(v393);
      if (v394 !== void 0) a406.push(v394);
      if (v395 !== void 0) a406.push(v395);
      if (v396 !== void 0) a406.push(v396);
      V = a406;
      o = t391;
    }
    return o;
  }
  function r_relativeComp_v(s, i) {
    let o;
    L407: {
      const c408 = s.charCodeAt(i);
      const g409 = c408 < 128 ? K100[c408] : c408 === c408 ? -1 : -1;
      switch (g409) {
        case 0: {
          o = r_percentage_v(s, i);
          if (o >= 0) break L407;
          o = r_angle_v(s, i);
          if (o >= 0) break L407;
          o = r_number_v(s, i);
          break L407;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          if (o >= 0) break L407;
          o = r_calcKeyword_v(s, i);
          break L407;
        }
        case 2: {
          o = r_calcKeyword_v(s, i);
          break L407;
        }
        case 3: {
          o = r_none_v(s, i);
          if (o >= 0) break L407;
          o = r_calcKeyword_v(s, i);
          break L407;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_colorMix_v(s, i) {
    let o;
    L410: {
      o = -1;
      let t411;
      {
        let t417;
        {
          const c418 = s.charCodeAt(i);
          if (!(c418 < 128 ? K102[c418] === 1 : false)) t417 = -1;
          else {
            K101.lastIndex = i;
            if (K101.test(s)) {
              t417 = K101.lastIndex;
            } else t417 = -1;
          }
        }
        if (t417 < 0) t411 = -1;
        else {
          {
            const c423 = s.charCodeAt(t417);
            if (!(c423 < 128 ? K103[c423] === 1 : false)) {
              V = void 0;
              t411 = t417;
            } else {
              let t419;
              {
                let t420;
                t420 = r_mixMethod_v(s, t417);
                if (t420 < 0) t419 = -1;
                else {
                  const v422 = V;
                  let u421;
                  u421 = r_comma_r(s, t420);
                  if (u421 < 0) t419 = -1;
                  else {
                    V = v422;
                    t419 = u421;
                  }
                }
              }
              if (t419 < 0) {
                V = void 0;
                t411 = t417;
              } else t411 = t419;
            }
          }
        }
      }
      if (t411 < 0) break L410;
      const v414 = V;
      let t412;
      t412 = r_mixItem_v(s, t411);
      if (t412 < 0) break L410;
      const v415 = V;
      let t413;
      {
        let t424;
        {
          let q427 = t412, n429 = 0;
          const a430 = [];
          for (; ; ) {
            const c431 = s.charCodeAt(q427);
            if (!(c431 < 128 ? K104[c431] === 1 : c431 === c431)) break;
            let t428;
            {
              let t432;
              t432 = r_comma_r(s, q427);
              if (t432 < 0) t428 = -1;
              else {
                t428 = r_mixItem_v(s, t432);
              }
            }
            if (t428 < 0 || t428 === q427) break;
            a430.push(V);
            n429++;
            q427 = t428;
          }
          if (n429 < 0) t424 = -1;
          else {
            V = a430;
            t424 = q427;
          }
        }
        if (t424 < 0) t413 = -1;
        else {
          const v426 = V;
          let u425;
          u425 = r_close_r(s, t424);
          if (u425 < 0) t413 = -1;
          else {
            V = v426;
            t413 = u425;
          }
        }
      }
      if (t413 < 0) break L410;
      const v416 = V;
      const a433 = [];
      if (v414 !== void 0) a433.push(v414);
      if (v415 !== void 0) a433.push(v415);
      if (v416 !== void 0) a433.push(v416);
      V = a433;
      o = t413;
    }
    if (o >= 0) V = AK27(V);
    return o;
  }
  function r_mixMethod_v(s, i) {
    let o;
    {
      let t434;
      {
        let t435;
        {
          const c436 = s.charCodeAt(i);
          if (!(c436 < 128 ? K106[c436] === 1 : false)) t435 = -1;
          else {
            K105.lastIndex = i;
            if (K105.test(s)) {
              t435 = K105.lastIndex;
            } else t435 = -1;
          }
        }
        if (t435 < 0) t434 = -1;
        else {
          t434 = r_ws1_r(s, t435);
        }
      }
      if (t434 < 0) o = -1;
      else {
        L437: {
          const c438 = s.charCodeAt(t434);
          const g439 = c438 < 128 ? K107[c438] : c438 === c438 ? -1 : -1;
          switch (g439) {
            case 0: {
              o = r_mixRect_v(s, t434);
              break L437;
            }
            case 1: {
              o = r_mixPolar_v(s, t434);
              break L437;
            }
            case 2: {
              o = r_mixPolar_v(s, t434);
              if (o >= 0) break L437;
              o = r_mixRect_v(s, t434);
              break L437;
            }
            default:
              o = -1;
          }
        }
      }
    }
    return o;
  }
  function r_mixPolar_v(s, i) {
    let o;
    L440: {
      o = -1;
      let t441;
      t441 = r_polarSpace_v(s, i);
      if (t441 < 0) break L440;
      const v443 = V;
      let t442;
      {
        const c447 = s.charCodeAt(t441);
        if (!(c447 < 128 ? K108[c447] === 1 : c447 === c447)) {
          V = void 0;
          t442 = t441;
        } else {
          let t445;
          {
            let t446;
            t446 = r_ws1_r(s, t441);
            if (t446 < 0) t445 = -1;
            else {
              t445 = r_hueMethod_v(s, t446);
            }
          }
          if (t445 < 0) {
            V = void 0;
            t442 = t441;
          } else t442 = t445;
        }
      }
      if (t442 < 0) break L440;
      const v444 = V;
      const a448 = [];
      if (v443 !== void 0) a448.push(v443);
      if (v444 !== void 0) a448.push(v444);
      V = a448;
      o = t442;
    }
    if (o >= 0) V = AK28(V);
    return o;
  }
  function r_mixRect_v(s, i) {
    let o;
    o = r_rectSpace_v(s, i);
    if (o >= 0) V = AK29(V);
    return o;
  }
  function r_polarSpace_v(s, i) {
    let o;
    {
      const c449 = s.charCodeAt(i);
      if (!(c449 < 128 ? K110[c449] === 1 : false)) o = -1;
      else {
        K109.lastIndex = i;
        if (K109.test(s)) {
          o = K109.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_rectSpace_v(s, i) {
    let o;
    {
      const c450 = s.charCodeAt(i);
      if (!(c450 < 128 ? K112[c450] === 1 : false)) o = -1;
      else {
        K111.lastIndex = i;
        if (K111.test(s)) {
          o = K111.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_hueMethod_v(s, i) {
    let o;
    {
      const c451 = s.charCodeAt(i);
      if (!(c451 < 128 ? K114[c451] === 1 : false)) o = -1;
      else {
        K113.lastIndex = i;
        if (K113.test(s)) {
          o = K113.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_mixItem_v(s, i) {
    let o;
    L452: {
      const c453 = s.charCodeAt(i);
      const g454 = c453 < 128 ? K115[c453] : c453 === c453 ? -1 : -1;
      switch (g454) {
        case 0: {
          o = r_mixTrail_v(s, i);
          break L452;
        }
        case 1: {
          o = r_mixLead_v(s, i);
          break L452;
        }
        case 2: {
          o = r_mixLead_v(s, i);
          if (o >= 0) break L452;
          o = r_mixTrail_v(s, i);
          break L452;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_mixLead_v(s, i) {
    let o;
    L455: {
      o = -1;
      let t456;
      t456 = r_mixPercent_v(s, i);
      if (t456 < 0) break L455;
      const v458 = V;
      let t457;
      {
        let t460;
        t460 = r_ws_r(s, t456);
        if (t460 < 0) t457 = -1;
        else {
          t457 = r_color_v(s, t460);
        }
      }
      if (t457 < 0) break L455;
      const v459 = V;
      const a461 = [];
      if (v458 !== void 0) a461.push(v458);
      if (v459 !== void 0) a461.push(v459);
      V = a461;
      o = t457;
    }
    if (o >= 0) V = AK30(V);
    return o;
  }
  function r_mixTrail_v(s, i) {
    let o;
    L462: {
      o = -1;
      let t463;
      t463 = r_color_v(s, i);
      if (t463 < 0) break L462;
      const v465 = V;
      let t464;
      {
        const c469 = s.charCodeAt(t463);
        if (!(c469 < 128 ? K116[c469] === 1 : c469 === c469)) {
          V = void 0;
          t464 = t463;
        } else {
          let t467;
          {
            let t468;
            t468 = r_ws_r(s, t463);
            if (t468 < 0) t467 = -1;
            else {
              t467 = r_mixPercent_v(s, t468);
            }
          }
          if (t467 < 0) {
            V = void 0;
            t464 = t463;
          } else t464 = t467;
        }
      }
      if (t464 < 0) break L462;
      const v466 = V;
      const a470 = [];
      if (v465 !== void 0) a470.push(v465);
      if (v466 !== void 0) a470.push(v466);
      V = a470;
      o = t464;
    }
    if (o >= 0) V = AK31(V);
    return o;
  }
  function r_mixPercent_v(s, i) {
    let o;
    L471: {
      const c472 = s.charCodeAt(i);
      const g473 = c472 < 128 ? K117[c472] : c472 === c472 ? -1 : -1;
      switch (g473) {
        case 0: {
          o = r_percentage_v(s, i);
          break L471;
        }
        case 1: {
          o = r_mathFn_v(s, i);
          break L471;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_lightDark_v(s, i) {
    let o;
    L474: {
      o = -1;
      let t475;
      {
        let t479;
        {
          const c480 = s.charCodeAt(i);
          if (!(c480 < 128 ? K119[c480] === 1 : false)) t479 = -1;
          else {
            K118.lastIndex = i;
            if (K118.test(s)) {
              t479 = K118.lastIndex;
            } else t479 = -1;
          }
        }
        if (t479 < 0) t475 = -1;
        else {
          t475 = r_color_v(s, t479);
        }
      }
      if (t475 < 0) break L474;
      const v477 = V;
      let t476;
      {
        let t481;
        {
          let t484;
          t484 = r_comma_r(s, t475);
          if (t484 < 0) t481 = -1;
          else {
            t481 = r_color_v(s, t484);
          }
        }
        if (t481 < 0) t476 = -1;
        else {
          const v483 = V;
          let u482;
          u482 = r_close_r(s, t481);
          if (u482 < 0) t476 = -1;
          else {
            V = v483;
            t476 = u482;
          }
        }
      }
      if (t476 < 0) break L474;
      const v478 = V;
      const a485 = [];
      if (v477 !== void 0) a485.push(v477);
      if (v478 !== void 0) a485.push(v478);
      V = a485;
      o = t476;
    }
    if (o >= 0) V = AK32(V);
    return o;
  }
  function r_hex_v(s, i) {
    let o;
    {
      const c486 = s.charCodeAt(i);
      if (!(c486 < 128 ? K121[c486] === 1 : false)) o = -1;
      else {
        K120.lastIndex = i;
        if (K120.test(s)) {
          o = K120.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK33(V);
    return o;
  }
  function r_colorKeyword_v(s, i) {
    let o;
    {
      const c487 = s.charCodeAt(i);
      if (!(c487 < 128 ? K123[c487] === 1 : false)) o = -1;
      else {
        K122.lastIndex = i;
        if (K122.test(s)) {
          o = K122.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK34(V);
    return o;
  }
  function r_valueTop_v(s, i) {
    let o;
    {
      let t488;
      {
        let t491;
        t491 = r_ws_r(s, i);
        if (t491 < 0) t488 = -1;
        else {
          t488 = r_commaList_v(s, t491);
        }
      }
      if (t488 < 0) o = -1;
      else {
        const v490 = V;
        let u489;
        u489 = r_ws_r(s, t488);
        if (u489 < 0) o = -1;
        else {
          V = v490;
          o = u489;
        }
      }
    }
    return o;
  }
  function r_commaList_v(s, i) {
    let o;
    L492: {
      o = -1;
      let t493;
      t493 = r_slashList_v(s, i);
      if (t493 < 0) break L492;
      const v495 = V;
      let t494;
      {
        let q497 = t493, n499 = 0;
        const a500 = [];
        for (; ; ) {
          const c501 = s.charCodeAt(q497);
          if (!(c501 < 128 ? K124[c501] === 1 : c501 === c501)) break;
          let t498;
          {
            let t502;
            t502 = r_comma_r(s, q497);
            if (t502 < 0) t498 = -1;
            else {
              t498 = r_slashList_v(s, t502);
            }
          }
          if (t498 < 0 || t498 === q497) break;
          a500.push(V);
          n499++;
          q497 = t498;
        }
        if (n499 < 0) t494 = -1;
        else {
          V = a500;
          t494 = q497;
        }
      }
      if (t494 < 0) break L492;
      const v496 = V;
      const a503 = [];
      if (v495 !== void 0) a503.push(v495);
      if (v496 !== void 0) a503.push(v496);
      V = a503;
      o = t494;
    }
    if (o >= 0) V = AK35(V);
    return o;
  }
  function r_slashList_v(s, i) {
    let o;
    L504: {
      o = -1;
      let t505;
      t505 = r_spaceList_v(s, i);
      if (t505 < 0) break L504;
      const v507 = V;
      let t506;
      {
        let q509 = t505, n511 = 0;
        const a512 = [];
        for (; ; ) {
          const c513 = s.charCodeAt(q509);
          if (!(c513 < 128 ? K125[c513] === 1 : c513 === c513)) break;
          let t510;
          {
            let t514;
            t514 = r_slash_r(s, q509);
            if (t514 < 0) t510 = -1;
            else {
              t510 = r_spaceList_v(s, t514);
            }
          }
          if (t510 < 0 || t510 === q509) break;
          a512.push(V);
          n511++;
          q509 = t510;
        }
        if (n511 < 0) t506 = -1;
        else {
          V = a512;
          t506 = q509;
        }
      }
      if (t506 < 0) break L504;
      const v508 = V;
      const a515 = [];
      if (v507 !== void 0) a515.push(v507);
      if (v508 !== void 0) a515.push(v508);
      V = a515;
      o = t506;
    }
    if (o >= 0) V = AK36(V);
    return o;
  }
  function r_spaceList_v(s, i) {
    let o;
    L516: {
      o = -1;
      let t517;
      t517 = r_valueTerm_v(s, i);
      if (t517 < 0) break L516;
      const v519 = V;
      let t518;
      {
        let q521 = t517, n523 = 0;
        const a524 = [];
        for (; ; ) {
          const c525 = s.charCodeAt(q521);
          if (!(c525 < 128 ? K126[c525] === 1 : c525 === c525)) break;
          let t522;
          {
            let t526;
            t526 = r_termSep_r(s, q521);
            if (t526 < 0) t522 = -1;
            else {
              t522 = r_valueTerm_v(s, t526);
            }
          }
          if (t522 < 0 || t522 === q521) break;
          a524.push(V);
          n523++;
          q521 = t522;
        }
        if (n523 < 0) t518 = -1;
        else {
          V = a524;
          t518 = q521;
        }
      }
      if (t518 < 0) break L516;
      const v520 = V;
      const a527 = [];
      if (v519 !== void 0) a527.push(v519);
      if (v520 !== void 0) a527.push(v520);
      V = a527;
      o = t518;
    }
    if (o >= 0) V = AK37(V);
    return o;
  }
  function r_termSep_v(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      K127.lastIndex = i;
      if (K127.test(s)) {
        o = K127.lastIndex;
        V = o > i ? s.substring(i, o) : void 0;
      } else o = -1;
    }
    return o;
  }
  function r_valueTerm_v(s, i) {
    let o;
    L528: {
      const c529 = s.charCodeAt(i);
      const g530 = c529 < 128 ? K128[c529] : c529 === c529 ? 0 : -1;
      switch (g530) {
        case 0: {
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 1: {
          o = r_operator_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 2: {
          o = r_string_v(s, i);
          break L528;
        }
        case 3: {
          o = r_colorCall_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 4: {
          o = r_numeric_v(s, i);
          if (o >= 0) break L528;
          o = r_operator_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 5: {
          o = r_call_v(s, i);
          if (o >= 0) break L528;
          o = r_numeric_v(s, i);
          if (o >= 0) break L528;
          o = r_operator_v(s, i);
          if (o >= 0) break L528;
          o = r_identTerm_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 6: {
          o = r_numeric_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 7: {
          o = r_operator_v(s, i);
          break L528;
        }
        case 8: {
          o = r_call_v(s, i);
          if (o >= 0) break L528;
          o = r_identTerm_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 9: {
          o = r_colorCall_v(s, i);
          if (o >= 0) break L528;
          o = r_call_v(s, i);
          if (o >= 0) break L528;
          o = r_identTerm_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        case 10: {
          o = r_varCall_v(s, i);
          if (o >= 0) break L528;
          o = r_call_v(s, i);
          if (o >= 0) break L528;
          o = r_identTerm_v(s, i);
          if (o >= 0) break L528;
          o = r_badTerm_v(s, i);
          break L528;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_badTerm_v(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      let q531 = i;
      for (; q531 < s.length; q531++) {
        const c532 = s.charCodeAt(q531);
        if (c532 < 128) {
          if (K129[c532] === 0) break;
        } else {
          K130.lastIndex = q531;
          if (!K130.test(s)) break;
        }
      }
      if (q531 - i < 1) o = -1;
      else {
        V = q531 > i ? s.substring(i, q531) : void 0;
        o = q531;
      }
    }
    if (o >= 0) V = AK38(V, i, o);
    return o;
  }
  function r_varCall_v(s, i) {
    let o;
    L533: {
      o = -1;
      let t534;
      {
        const c538 = s.charCodeAt(i);
        if (!(c538 < 128 ? K132[c538] === 1 : false)) t534 = -1;
        else {
          K131.lastIndex = i;
          if (K131.test(s)) {
            t534 = K131.lastIndex;
            V = s.substring(i, t534);
          } else t534 = -1;
        }
      }
      if (t534 < 0) break L533;
      const v536 = V;
      let t535;
      {
        let t539;
        {
          let t542;
          {
            const c543 = s.charCodeAt(t534);
            if (!(c543 < 128 ? K134[c543] === 1 : false)) t542 = -1;
            else {
              K133.lastIndex = t534;
              if (K133.test(s)) {
                t542 = K133.lastIndex;
              } else t542 = -1;
            }
          }
          if (t542 < 0) t539 = -1;
          else {
            t539 = r_varBody_v(s, t542);
          }
        }
        if (t539 < 0) t535 = -1;
        else {
          const v541 = V;
          let u540;
          u540 = r_close_r(s, t539);
          if (u540 < 0) t535 = -1;
          else {
            V = v541;
            t535 = u540;
          }
        }
      }
      if (t535 < 0) break L533;
      const v537 = V;
      const a544 = [];
      if (v536 !== void 0) a544.push(v536);
      if (v537 !== void 0) a544.push(v537);
      V = a544;
      o = t535;
    }
    if (o >= 0) V = AK39(V);
    return o;
  }
  function r_varBody_v(s, i) {
    let o;
    {
      let t545;
      t545 = r_commaList_v(s, i);
      if (t545 < 0) o = -1;
      else {
        const v547 = V;
        let u546;
        {
          const c550 = s.charCodeAt(t545);
          if (!(c550 < 128 ? K137[c550] === 1 : c550 === c550)) {
            u546 = t545;
          } else {
            let t548;
            {
              const c549 = s.charCodeAt(t545);
              if (!(c549 < 128 ? K136[c549] === 1 : c549 === c549)) t548 = -1;
              else {
                K135.lastIndex = t545;
                if (K135.test(s)) {
                  t548 = K135.lastIndex;
                } else t548 = -1;
              }
            }
            if (t548 < 0) {
              u546 = t545;
            } else u546 = t548;
          }
        }
        if (u546 < 0) o = -1;
        else {
          V = v547;
          o = u546;
        }
      }
    }
    return o;
  }
  function r_colorCall_v(s, i) {
    let o;
    L551: {
      const c552 = s.charCodeAt(i);
      const g553 = c552 < 128 ? K138[c552] : c552 === c552 ? -1 : -1;
      switch (g553) {
        case 0: {
          o = r_hex_v(s, i);
          break L551;
        }
        case 1: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L551;
          o = r_colorFn_v(s, i);
          break L551;
        }
        case 2: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L551;
          o = r_hslFn_v(s, i);
          if (o >= 0) break L551;
          o = r_hwbFn_v(s, i);
          break L551;
        }
        case 3: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L551;
          o = r_labFn_v(s, i);
          if (o >= 0) break L551;
          o = r_lchFn_v(s, i);
          break L551;
        }
        case 4: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L551;
          o = r_oklabFn_v(s, i);
          if (o >= 0) break L551;
          o = r_oklchFn_v(s, i);
          break L551;
        }
        case 5: {
          o = r_relativeColor_v(s, i);
          if (o >= 0) break L551;
          o = r_rgbFn_v(s, i);
          break L551;
        }
        default:
          o = -1;
      }
    }
    if (o >= 0) V = AK40(V);
    return o;
  }
  function r_colorHead_v(s, i) {
    let o;
    {
      const c554 = s.charCodeAt(i);
      if (!(c554 < 128 ? K140[c554] === 1 : false)) o = -1;
      else {
        K139.lastIndex = i;
        if (K139.test(s)) {
          o = K139.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_call_v(s, i) {
    let o;
    L555: {
      o = -1;
      let t556;
      {
        let t560;
        t560 = r_colorHead_r(s, i);
        if (t560 >= 0) t556 = -1;
        else {
          t556 = r_callName_v(s, i);
        }
      }
      if (t556 < 0) break L555;
      const v558 = V;
      let t557;
      {
        let t561;
        {
          let t564;
          {
            const c565 = s.charCodeAt(t556);
            if (!(c565 < 128 ? K142[c565] === 1 : false)) t564 = -1;
            else {
              K141.lastIndex = t556;
              if (K141.test(s)) {
                t564 = K141.lastIndex;
              } else t564 = -1;
            }
          }
          if (t564 < 0) t561 = -1;
          else {
            {
              const c567 = s.charCodeAt(t564);
              if (!(c567 < 128 ? K143[c567] === 1 : c567 === c567)) {
                V = void 0;
                t561 = t564;
              } else {
                let t566;
                t566 = r_commaList_v(s, t564);
                if (t566 < 0) {
                  V = void 0;
                  t561 = t564;
                } else t561 = t566;
              }
            }
          }
        }
        if (t561 < 0) t557 = -1;
        else {
          const v563 = V;
          let u562;
          u562 = r_close_r(s, t561);
          if (u562 < 0) t557 = -1;
          else {
            V = v563;
            t557 = u562;
          }
        }
      }
      if (t557 < 0) break L555;
      const v559 = V;
      const a568 = [];
      if (v558 !== void 0) a568.push(v558);
      if (v559 !== void 0) a568.push(v559);
      V = a568;
      o = t557;
    }
    if (o >= 0) V = AK41(V);
    return o;
  }
  function r_callName_v(s, i) {
    let o;
    {
      const c569 = s.charCodeAt(i);
      if (!(c569 < 128 ? K145[c569] === 1 : false)) o = -1;
      else {
        K144.lastIndex = i;
        if (K144.test(s)) {
          o = K144.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_numeric_v(s, i) {
    let o;
    {
      const c570 = s.charCodeAt(i);
      if (!(c570 < 128 ? K147[c570] === 1 : false)) o = -1;
      else {
        K146.lastIndex = i;
        if (K146.test(s)) {
          o = K146.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK42(V);
    return o;
  }
  function r_operator_v(s, i) {
    let o;
    {
      const c571 = s.charCodeAt(i);
      if (!(c571 < 128 ? K149[c571] === 1 : false)) o = -1;
      else {
        K148.lastIndex = i;
        if (K148.test(s)) {
          o = K148.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK43(V);
    return o;
  }
  function r_identTerm_v(s, i) {
    let o;
    {
      const c572 = s.charCodeAt(i);
      if (!(c572 < 128 ? K151[c572] === 1 : false)) o = -1;
      else {
        K150.lastIndex = i;
        if (K150.test(s)) {
          o = K150.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK44(V);
    return o;
  }
  function r_scalarTop_v(s, i) {
    let o;
    {
      let t573;
      {
        let t576;
        t576 = r_ws_r(s, i);
        if (t576 < 0) t573 = -1;
        else {
          t573 = r_scalarTerm_v(s, t576);
        }
      }
      if (t573 < 0) o = -1;
      else {
        const v575 = V;
        let u574;
        u574 = r_ws_r(s, t573);
        if (u574 < 0) o = -1;
        else {
          V = v575;
          o = u574;
        }
      }
    }
    return o;
  }
  function r_scalarTerm_v(s, i) {
    let o;
    L577: {
      const c578 = s.charCodeAt(i);
      const g579 = c578 < 128 ? K152[c578] : c578 === c578 ? -1 : -1;
      switch (g579) {
        case 0: {
          o = r_operator_v(s, i);
          break L577;
        }
        case 1: {
          o = r_string_v(s, i);
          break L577;
        }
        case 2: {
          o = r_colorCall_v(s, i);
          break L577;
        }
        case 3: {
          o = r_numeric_v(s, i);
          if (o >= 0) break L577;
          o = r_operator_v(s, i);
          break L577;
        }
        case 4: {
          o = r_numeric_v(s, i);
          if (o >= 0) break L577;
          o = r_operator_v(s, i);
          if (o >= 0) break L577;
          o = r_identTerm_v(s, i);
          break L577;
        }
        case 5: {
          o = r_numeric_v(s, i);
          break L577;
        }
        case 6: {
          o = r_identTerm_v(s, i);
          break L577;
        }
        case 7: {
          o = r_colorMix_v(s, i);
          if (o >= 0) break L577;
          o = r_colorCall_v(s, i);
          if (o >= 0) break L577;
          o = r_identTerm_v(s, i);
          break L577;
        }
        case 8: {
          o = r_colorCall_v(s, i);
          if (o >= 0) break L577;
          o = r_identTerm_v(s, i);
          break L577;
        }
        case 9: {
          o = r_lightDark_v(s, i);
          if (o >= 0) break L577;
          o = r_colorCall_v(s, i);
          if (o >= 0) break L577;
          o = r_identTerm_v(s, i);
          break L577;
        }
        default:
          o = -1;
      }
    }
    if (o >= 0) V = AK45(V);
    return o;
  }
  function r_colorTop_v(s, i) {
    let o;
    {
      let t580;
      {
        let t583;
        t583 = r_ws_r(s, i);
        if (t583 < 0) t580 = -1;
        else {
          t580 = r_color_v(s, t583);
        }
      }
      if (t580 < 0) o = -1;
      else {
        const v582 = V;
        let u581;
        u581 = r_ws_r(s, t580);
        if (u581 < 0) o = -1;
        else {
          V = v582;
          o = u581;
        }
      }
    }
    return o;
  }
  function r_keyframeSelector_v(s, i) {
    let o;
    {
      let t584;
      {
        let t587;
        t587 = r_ws_r(s, i);
        if (t587 < 0) t584 = -1;
        else {
          L588: {
            const c589 = s.charCodeAt(t587);
            const g590 = c589 < 128 ? K153[c589] : c589 === c589 ? -1 : -1;
            switch (g590) {
              case 0: {
                t584 = r_percentage_v(s, t587);
                break L588;
              }
              case 1: {
                t584 = r_selectorNamed_v(s, t587);
                break L588;
              }
              case 2: {
                t584 = r_selectorKeyword_v(s, t587);
                break L588;
              }
              default:
                t584 = -1;
            }
          }
        }
      }
      if (t584 < 0) o = -1;
      else {
        const v586 = V;
        let u585;
        u585 = r_ws_r(s, t584);
        if (u585 < 0) o = -1;
        else {
          V = v586;
          o = u585;
        }
      }
    }
    return o;
  }
  function r_selectorKeyword_v(s, i) {
    let o;
    {
      const c591 = s.charCodeAt(i);
      if (!(c591 < 128 ? K155[c591] === 1 : false)) o = -1;
      else {
        K154.lastIndex = i;
        if (K154.test(s)) {
          o = K154.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK46(V);
    return o;
  }
  function r_selectorNamed_v(s, i) {
    let o;
    L592: {
      o = -1;
      let t593;
      {
        const c597 = s.charCodeAt(i);
        if (!(c597 < 128 ? K157[c597] === 1 : false)) t593 = -1;
        else {
          K156.lastIndex = i;
          if (K156.test(s)) {
            t593 = K156.lastIndex;
            V = s.substring(i, t593);
          } else t593 = -1;
        }
      }
      if (t593 < 0) break L592;
      const v595 = V;
      let t594;
      {
        const c600 = s.charCodeAt(t593);
        if (!(c600 < 128 ? K158[c600] === 1 : c600 === c600)) {
          V = void 0;
          t594 = t593;
        } else {
          let t598;
          {
            let t599;
            t599 = r_ws1_r(s, t593);
            if (t599 < 0) t598 = -1;
            else {
              t598 = r_percentage_v(s, t599);
            }
          }
          if (t598 < 0) {
            V = void 0;
            t594 = t593;
          } else t594 = t598;
        }
      }
      if (t594 < 0) break L592;
      const v596 = V;
      const a601 = [];
      if (v595 !== void 0) a601.push(v595);
      if (v596 !== void 0) a601.push(v596);
      V = a601;
      o = t594;
    }
    if (o >= 0) V = AK47(V);
    return o;
  }
  function r_timingFunction_v(s, i) {
    let o;
    {
      let t602;
      {
        let t605;
        t605 = r_ws_r(s, i);
        if (t605 < 0) t602 = -1;
        else {
          L606: {
            const c607 = s.charCodeAt(t605);
            const g608 = c607 < 128 ? K159[c607] : c607 === c607 ? -1 : -1;
            switch (g608) {
              case 0: {
                t602 = r_cubicBezier_v(s, t605);
                break L606;
              }
              case 1: {
                t602 = r_timingKeyword_v(s, t605);
                break L606;
              }
              case 2: {
                t602 = r_linearFn_v(s, t605);
                if (t602 >= 0) break L606;
                t602 = r_timingKeyword_v(s, t605);
                break L606;
              }
              case 3: {
                t602 = r_stepsFn_v(s, t605);
                if (t602 >= 0) break L606;
                t602 = r_timingKeyword_v(s, t605);
                break L606;
              }
              default:
                t602 = -1;
            }
          }
        }
      }
      if (t602 < 0) o = -1;
      else {
        const v604 = V;
        let u603;
        u603 = r_ws_r(s, t602);
        if (u603 < 0) o = -1;
        else {
          V = v604;
          o = u603;
        }
      }
    }
    return o;
  }
  function r_timingKeyword_v(s, i) {
    let o;
    {
      const c609 = s.charCodeAt(i);
      if (!(c609 < 128 ? K161[c609] === 1 : false)) o = -1;
      else {
        K160.lastIndex = i;
        if (K160.test(s)) {
          o = K160.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK48(V);
    return o;
  }
  function r_cubicBezier_v(s, i) {
    let o;
    L610: {
      o = -1;
      let t611;
      {
        let t619;
        {
          const c620 = s.charCodeAt(i);
          if (!(c620 < 128 ? K163[c620] === 1 : false)) t619 = -1;
          else {
            K162.lastIndex = i;
            if (K162.test(s)) {
              t619 = K162.lastIndex;
            } else t619 = -1;
          }
        }
        if (t619 < 0) t611 = -1;
        else {
          t611 = r_number_v(s, t619);
        }
      }
      if (t611 < 0) break L610;
      const v615 = V;
      let t612;
      {
        let t621;
        t621 = r_comma_r(s, t611);
        if (t621 < 0) t612 = -1;
        else {
          t612 = r_number_v(s, t621);
        }
      }
      if (t612 < 0) break L610;
      const v616 = V;
      let t613;
      {
        let t622;
        t622 = r_comma_r(s, t612);
        if (t622 < 0) t613 = -1;
        else {
          t613 = r_number_v(s, t622);
        }
      }
      if (t613 < 0) break L610;
      const v617 = V;
      let t614;
      {
        let t623;
        {
          let t626;
          t626 = r_comma_r(s, t613);
          if (t626 < 0) t623 = -1;
          else {
            t623 = r_number_v(s, t626);
          }
        }
        if (t623 < 0) t614 = -1;
        else {
          const v625 = V;
          let u624;
          u624 = r_close_r(s, t623);
          if (u624 < 0) t614 = -1;
          else {
            V = v625;
            t614 = u624;
          }
        }
      }
      if (t614 < 0) break L610;
      const v618 = V;
      const a627 = [];
      if (v615 !== void 0) a627.push(v615);
      if (v616 !== void 0) a627.push(v616);
      if (v617 !== void 0) a627.push(v617);
      if (v618 !== void 0) a627.push(v618);
      V = a627;
      o = t614;
    }
    if (o >= 0) V = AK49(V);
    return o;
  }
  function r_stepsFn_v(s, i) {
    let o;
    L628: {
      o = -1;
      let t629;
      {
        let t633;
        {
          const c634 = s.charCodeAt(i);
          if (!(c634 < 128 ? K165[c634] === 1 : false)) t633 = -1;
          else {
            K164.lastIndex = i;
            if (K164.test(s)) {
              t633 = K164.lastIndex;
            } else t633 = -1;
          }
        }
        if (t633 < 0) t629 = -1;
        else {
          t629 = r_number_v(s, t633);
        }
      }
      if (t629 < 0) break L628;
      const v631 = V;
      let t630;
      {
        let t635;
        {
          const c640 = s.charCodeAt(t629);
          if (!(c640 < 128 ? K166[c640] === 1 : c640 === c640)) {
            V = void 0;
            t635 = t629;
          } else {
            let t638;
            {
              let t639;
              t639 = r_comma_r(s, t629);
              if (t639 < 0) t638 = -1;
              else {
                t638 = r_stepPosition_v(s, t639);
              }
            }
            if (t638 < 0) {
              V = void 0;
              t635 = t629;
            } else t635 = t638;
          }
        }
        if (t635 < 0) t630 = -1;
        else {
          const v637 = V;
          let u636;
          u636 = r_close_r(s, t635);
          if (u636 < 0) t630 = -1;
          else {
            V = v637;
            t630 = u636;
          }
        }
      }
      if (t630 < 0) break L628;
      const v632 = V;
      const a641 = [];
      if (v631 !== void 0) a641.push(v631);
      if (v632 !== void 0) a641.push(v632);
      V = a641;
      o = t630;
    }
    if (o >= 0) V = AK50(V);
    return o;
  }
  function r_stepPosition_v(s, i) {
    let o;
    {
      const c642 = s.charCodeAt(i);
      if (!(c642 < 128 ? K168[c642] === 1 : false)) o = -1;
      else {
        K167.lastIndex = i;
        if (K167.test(s)) {
          o = K167.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_linearFn_v(s, i) {
    let o;
    L643: {
      o = -1;
      let t644;
      {
        let t648;
        {
          const c649 = s.charCodeAt(i);
          if (!(c649 < 128 ? K170[c649] === 1 : false)) t648 = -1;
          else {
            K169.lastIndex = i;
            if (K169.test(s)) {
              t648 = K169.lastIndex;
            } else t648 = -1;
          }
        }
        if (t648 < 0) t644 = -1;
        else {
          t644 = r_linearStop_v(s, t648);
        }
      }
      if (t644 < 0) break L643;
      const v646 = V;
      let t645;
      {
        let t650;
        {
          let q653 = t644, n655 = 0;
          const a656 = [];
          for (; ; ) {
            const c657 = s.charCodeAt(q653);
            if (!(c657 < 128 ? K171[c657] === 1 : c657 === c657)) break;
            let t654;
            {
              let t658;
              t658 = r_comma_r(s, q653);
              if (t658 < 0) t654 = -1;
              else {
                t654 = r_linearStop_v(s, t658);
              }
            }
            if (t654 < 0 || t654 === q653) break;
            a656.push(V);
            n655++;
            q653 = t654;
          }
          if (n655 < 0) t650 = -1;
          else {
            V = a656;
            t650 = q653;
          }
        }
        if (t650 < 0) t645 = -1;
        else {
          const v652 = V;
          let u651;
          u651 = r_close_r(s, t650);
          if (u651 < 0) t645 = -1;
          else {
            V = v652;
            t645 = u651;
          }
        }
      }
      if (t645 < 0) break L643;
      const v647 = V;
      const a659 = [];
      if (v646 !== void 0) a659.push(v646);
      if (v647 !== void 0) a659.push(v647);
      V = a659;
      o = t645;
    }
    if (o >= 0) V = AK51(V);
    return o;
  }
  function r_linearStop_v(s, i) {
    let o;
    L660: {
      o = -1;
      let t661;
      t661 = r_number_v(s, i);
      if (t661 < 0) break L660;
      const v664 = V;
      let t662;
      {
        const c669 = s.charCodeAt(t661);
        if (!(c669 < 128 ? K172[c669] === 1 : c669 === c669)) {
          V = void 0;
          t662 = t661;
        } else {
          let t667;
          {
            let t668;
            t668 = r_ws1_r(s, t661);
            if (t668 < 0) t667 = -1;
            else {
              t667 = r_percentage_v(s, t668);
            }
          }
          if (t667 < 0) {
            V = void 0;
            t662 = t661;
          } else t662 = t667;
        }
      }
      if (t662 < 0) break L660;
      const v665 = V;
      let t663;
      {
        const c672 = s.charCodeAt(t662);
        if (!(c672 < 128 ? K173[c672] === 1 : c672 === c672)) {
          V = void 0;
          t663 = t662;
        } else {
          let t670;
          {
            let t671;
            t671 = r_ws1_r(s, t662);
            if (t671 < 0) t670 = -1;
            else {
              t670 = r_percentage_v(s, t671);
            }
          }
          if (t670 < 0) {
            V = void 0;
            t663 = t662;
          } else t663 = t670;
        }
      }
      if (t663 < 0) break L660;
      const v666 = V;
      const a673 = [];
      if (v664 !== void 0) a673.push(v664);
      if (v665 !== void 0) a673.push(v665);
      if (v666 !== void 0) a673.push(v666);
      V = a673;
      o = t663;
    }
    if (o >= 0) V = AK52(V);
    return o;
  }
  function r_quoted_v(s, i) {
    let o;
    {
      const c674 = s.charCodeAt(i);
      if (!(c674 < 128 ? K175[c674] === 1 : false)) o = -1;
      else {
        K174.lastIndex = i;
        if (K174.test(s)) {
          o = K174.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_textGroup_v(s, i) {
    let o;
    L675: {
      o = -1;
      let t676;
      if (s.charCodeAt(i) === 40) {
        V = "(";
        t676 = i + 1;
      } else t676 = -1;
      if (t676 < 0) break L675;
      const v679 = V;
      let t677;
      t677 = r_textBody_v(s, t676);
      if (t677 < 0) break L675;
      const v680 = V;
      let t678;
      if (s.charCodeAt(t677) === 41) {
        V = ")";
        t678 = t677 + 1;
      } else t678 = -1;
      if (t678 < 0) break L675;
      const v681 = V;
      V = [v679, v680, v681];
      o = t678;
    }
    return o;
  }
  function r_textBody_v(s, i) {
    let o;
    {
      let q682 = i, n684 = 0;
      const a685 = [];
      for (; ; ) {
        const c686 = s.charCodeAt(q682);
        if (!(c686 < 128 ? K176[c686] === 1 : c686 === c686)) break;
        let t683;
        L687: {
          const c688 = s.charCodeAt(q682);
          const g689 = c688 < 128 ? K177[c688] : c688 === c688 ? 0 : -1;
          switch (g689) {
            case 0: {
              if (q682 >= s.length) t683 = -1;
              else {
                let q690 = q682;
                for (; q690 < s.length; q690++) {
                  const c691 = s.charCodeAt(q690);
                  if (c691 < 128) {
                    if (K178[c691] === 0) break;
                  } else {
                    K179.lastIndex = q690;
                    if (!K179.test(s)) break;
                  }
                }
                if (q690 - q682 < 1) t683 = -1;
                else {
                  V = q690 > q682 ? s.substring(q682, q690) : void 0;
                  t683 = q690;
                }
              }
              break L687;
            }
            case 1: {
              t683 = r_quoted_v(s, q682);
              break L687;
            }
            case 2: {
              t683 = r_textGroup_v(s, q682);
              break L687;
            }
            default:
              t683 = -1;
          }
        }
        if (t683 < 0 || t683 === q682) break;
        a685.push(V);
        n684++;
        q682 = t683;
      }
      if (n684 < 0) o = -1;
      else {
        V = a685;
        o = q682;
      }
    }
    return o;
  }
  function r_commaRun_v(s, i) {
    let o;
    {
      let q692 = i, n694 = 0;
      for (; ; ) {
        const c696 = s.charCodeAt(q692);
        if (!(c696 < 128 ? K180[c696] === 1 : c696 === c696)) break;
        let t693;
        L697: {
          const c698 = s.charCodeAt(q692);
          const g699 = c698 < 128 ? K181[c698] : c698 === c698 ? 0 : -1;
          switch (g699) {
            case 0: {
              if (q692 >= s.length) t693 = -1;
              else {
                let q700 = q692;
                for (; q700 < s.length; q700++) {
                  const c701 = s.charCodeAt(q700);
                  if (c701 < 128) {
                    if (K182[c701] === 0) break;
                  } else {
                    K183.lastIndex = q700;
                    if (!K183.test(s)) break;
                  }
                }
                if (q700 - q692 < 1) t693 = -1;
                else {
                  t693 = q700;
                }
              }
              break L697;
            }
            case 1: {
              t693 = r_quoted_r(s, q692);
              break L697;
            }
            case 2: {
              t693 = r_textGroup_r(s, q692);
              break L697;
            }
            default:
              t693 = -1;
          }
        }
        if (t693 < 0 || t693 === q692) break;
        n694++;
        q692 = t693;
      }
      if (n694 < 0) o = -1;
      else {
        o = q692;
      }
    }
    if (o >= 0) V = AK53(s.substring(i, o));
    return o;
  }
  function r_commaItems_v(s, i) {
    let o;
    L702: {
      o = -1;
      let t703;
      t703 = r_commaRun_v(s, i);
      if (t703 < 0) break L702;
      const v705 = V;
      let t704;
      {
        let q707 = t703, n709 = 0;
        const a710 = [];
        for (; ; ) {
          const c711 = s.charCodeAt(q707);
          if (!(c711 < 128 ? K184[c711] === 1 : false)) break;
          let t708;
          L712: {
            t708 = -1;
            let t713;
            if (s.charCodeAt(q707) === 44) {
              V = ",";
              t713 = q707 + 1;
            } else t713 = -1;
            if (t713 < 0) break L712;
            const v715 = V;
            let t714;
            t714 = r_commaRun_v(s, t713);
            if (t714 < 0) break L712;
            const v716 = V;
            V = [v715, v716];
            t708 = t714;
          }
          if (t708 < 0 || t708 === q707) break;
          a710.push(V);
          n709++;
          q707 = t708;
        }
        if (n709 < 0) t704 = -1;
        else {
          V = a710;
          t704 = q707;
        }
      }
      if (t704 < 0) break L702;
      const v706 = V;
      V = [v705, v706];
      o = t704;
    }
    if (o >= 0) V = AK54(V);
    return o;
  }
  function r_semiRun_v(s, i) {
    let o;
    {
      let q717 = i, n719 = 0;
      for (; ; ) {
        const c721 = s.charCodeAt(q717);
        if (!(c721 < 128 ? K185[c721] === 1 : c721 === c721)) break;
        let t718;
        L722: {
          const c723 = s.charCodeAt(q717);
          const g724 = c723 < 128 ? K186[c723] : c723 === c723 ? 0 : -1;
          switch (g724) {
            case 0: {
              if (q717 >= s.length) t718 = -1;
              else {
                let q725 = q717;
                for (; q725 < s.length; q725++) {
                  const c726 = s.charCodeAt(q725);
                  if (c726 < 128) {
                    if (K187[c726] === 0) break;
                  } else {
                    K188.lastIndex = q725;
                    if (!K188.test(s)) break;
                  }
                }
                if (q725 - q717 < 1) t718 = -1;
                else {
                  t718 = q725;
                }
              }
              break L722;
            }
            case 1: {
              t718 = r_quoted_r(s, q717);
              break L722;
            }
            case 2: {
              t718 = r_textGroup_r(s, q717);
              break L722;
            }
            default:
              t718 = -1;
          }
        }
        if (t718 < 0 || t718 === q717) break;
        n719++;
        q717 = t718;
      }
      if (n719 < 0) o = -1;
      else {
        o = q717;
      }
    }
    if (o >= 0) V = AK55(s.substring(i, o));
    return o;
  }
  function r_semiItems_v(s, i) {
    let o;
    L727: {
      o = -1;
      let t728;
      t728 = r_semiRun_v(s, i);
      if (t728 < 0) break L727;
      const v730 = V;
      let t729;
      {
        let q732 = t728, n734 = 0;
        const a735 = [];
        for (; ; ) {
          const c736 = s.charCodeAt(q732);
          if (!(c736 < 128 ? K189[c736] === 1 : false)) break;
          let t733;
          L737: {
            t733 = -1;
            let t738;
            if (s.charCodeAt(q732) === 59) {
              V = ";";
              t738 = q732 + 1;
            } else t738 = -1;
            if (t738 < 0) break L737;
            const v740 = V;
            let t739;
            t739 = r_semiRun_v(s, t738);
            if (t739 < 0) break L737;
            const v741 = V;
            V = [v740, v741];
            t733 = t739;
          }
          if (t733 < 0 || t733 === q732) break;
          a735.push(V);
          n734++;
          q732 = t733;
        }
        if (n734 < 0) t729 = -1;
        else {
          V = a735;
          t729 = q732;
        }
      }
      if (t729 < 0) break L727;
      const v731 = V;
      V = [v730, v731];
      o = t729;
    }
    if (o >= 0) V = AK56(V);
    return o;
  }
  function r_spaceRun_v(s, i) {
    let o;
    {
      let q742 = i, n744 = 0;
      for (; ; ) {
        const c746 = s.charCodeAt(q742);
        if (!(c746 < 128 ? K190[c746] === 1 : c746 === c746)) break;
        let t743;
        L747: {
          const c748 = s.charCodeAt(q742);
          const g749 = c748 < 128 ? K191[c748] : c748 === c748 ? 0 : -1;
          switch (g749) {
            case 0: {
              if (q742 >= s.length) t743 = -1;
              else {
                let q750 = q742;
                for (; q750 < s.length; q750++) {
                  const c751 = s.charCodeAt(q750);
                  if (c751 < 128) {
                    if (K192[c751] === 0) break;
                  } else {
                    K193.lastIndex = q750;
                    if (!K193.test(s)) break;
                  }
                }
                if (q750 - q742 < 1) t743 = -1;
                else {
                  t743 = q750;
                }
              }
              break L747;
            }
            case 1: {
              t743 = r_quoted_r(s, q742);
              break L747;
            }
            case 2: {
              t743 = r_textGroup_r(s, q742);
              break L747;
            }
            default:
              t743 = -1;
          }
        }
        if (t743 < 0 || t743 === q742) break;
        n744++;
        q742 = t743;
      }
      if (n744 < 1) o = -1;
      else {
        o = q742;
      }
    }
    if (o >= 0) V = AK57(s.substring(i, o));
    return o;
  }
  function r_spaceItems_v(s, i) {
    let o;
    L752: {
      o = -1;
      let t753;
      t753 = r_ws_v(s, i);
      if (t753 < 0) break L752;
      const v755 = V;
      let t754;
      {
        let q757 = t753, n759 = 0;
        const a760 = [];
        for (; ; ) {
          const c761 = s.charCodeAt(q757);
          if (!(c761 < 128 ? K194[c761] === 1 : c761 === c761)) break;
          let t758;
          L762: {
            t758 = -1;
            let t763;
            t763 = r_spaceRun_v(s, q757);
            if (t763 < 0) break L762;
            const v765 = V;
            let t764;
            t764 = r_ws_v(s, t763);
            if (t764 < 0) break L762;
            const v766 = V;
            V = [v765, v766];
            t758 = t764;
          }
          if (t758 < 0 || t758 === q757) break;
          a760.push(V);
          n759++;
          q757 = t758;
        }
        if (n759 < 0) t754 = -1;
        else {
          V = a760;
          t754 = q757;
        }
      }
      if (t754 < 0) break L752;
      const v756 = V;
      V = [v755, v756];
      o = t754;
    }
    if (o >= 0) V = AK58(V);
    return o;
  }
  function r_restText_v(s, i) {
    let o;
    {
      const c768 = s.charCodeAt(i);
      if (!(c768 < 128 ? K195[c768] === 1 : c768 === c768)) {
        o = i;
      } else {
        let t767;
        if (i >= s.length) t767 = -1;
        else {
          t767 = s.length;
        }
        if (t767 < 0) {
          o = i;
        } else o = t767;
      }
    }
    if (o >= 0) V = AK59(s.substring(i, o));
    return o;
  }
  function r_comment_v(s, i) {
    let o;
    {
      const c769 = s.charCodeAt(i);
      if (!(c769 < 128 ? K197[c769] === 1 : false)) o = -1;
      else {
        K196.lastIndex = i;
        if (K196.test(s)) {
          o = K196.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_ruleGap_v(s, i) {
    let o;
    {
      let q770 = i, n772 = 0;
      const a773 = [];
      for (; ; ) {
        const c774 = s.charCodeAt(q770);
        if (!(c774 < 128 ? K198[c774] === 1 : c774 === c774)) break;
        let t771;
        L775: {
          const c776 = s.charCodeAt(q770);
          const g777 = c776 < 128 ? K199[c776] : c776 === c776 ? 0 : -1;
          switch (g777) {
            case 0: {
              if (q770 >= s.length) t771 = -1;
              else {
                let q778 = q770;
                for (; q778 < s.length; q778++) {
                  const c779 = s.charCodeAt(q778);
                  if (c779 < 128) {
                    if (K200[c779] === 0) break;
                  } else {
                    K201.lastIndex = q778;
                    if (!K201.test(s)) break;
                  }
                }
                if (q778 - q770 < 1) t771 = -1;
                else {
                  V = q778 > q770 ? s.substring(q770, q778) : void 0;
                  t771 = q778;
                }
              }
              break L775;
            }
            case 1: {
              t771 = r_comment_v(s, q770);
              break L775;
            }
            default:
              t771 = -1;
          }
        }
        if (t771 < 0 || t771 === q770) break;
        a773.push(V);
        n772++;
        q770 = t771;
      }
      if (n772 < 0) o = -1;
      else {
        V = a773;
        o = q770;
      }
    }
    return o;
  }
  function r_preludeRun_v(s, i) {
    let o;
    {
      let q780 = i, n782 = 0;
      for (; ; ) {
        const c784 = s.charCodeAt(q780);
        if (!(c784 < 128 ? K202[c784] === 1 : c784 === c784)) break;
        let t781;
        L785: {
          const c786 = s.charCodeAt(q780);
          const g787 = c786 < 128 ? K203[c786] : c786 === c786 ? 0 : -1;
          switch (g787) {
            case 0: {
              if (q780 >= s.length) t781 = -1;
              else {
                let q788 = q780;
                for (; q788 < s.length; q788++) {
                  const c789 = s.charCodeAt(q788);
                  if (c789 < 128) {
                    if (K204[c789] === 0) break;
                  } else {
                    K205.lastIndex = q788;
                    if (!K205.test(s)) break;
                  }
                }
                if (q788 - q780 < 1) t781 = -1;
                else {
                  t781 = q788;
                }
              }
              break L785;
            }
            case 1: {
              t781 = r_quoted_r(s, q780);
              break L785;
            }
            case 2: {
              t781 = r_textGroup_r(s, q780);
              break L785;
            }
            default:
              t781 = -1;
          }
        }
        if (t781 < 0 || t781 === q780) break;
        n782++;
        q780 = t781;
      }
      if (n782 < 0) o = -1;
      else {
        o = q780;
      }
    }
    if (o >= 0) V = AK60(s.substring(i, o));
    return o;
  }
  function r_blockBody_v(s, i) {
    let o;
    {
      let q790 = i, n792 = 0;
      const a793 = [];
      for (; ; ) {
        const c794 = s.charCodeAt(q790);
        if (!(c794 < 128 ? K206[c794] === 1 : c794 === c794)) break;
        let t791;
        L795: {
          const c805 = s.charCodeAt(q790);
          const g806 = c805 < 128 ? K207[c805] : c805 === c805 ? 0 : -1;
          switch (g806) {
            case 0: {
              if (q790 >= s.length) t791 = -1;
              else {
                let q807 = q790;
                for (; q807 < s.length; q807++) {
                  const c808 = s.charCodeAt(q807);
                  if (c808 < 128) {
                    if (K208[c808] === 0) break;
                  } else {
                    K209.lastIndex = q807;
                    if (!K209.test(s)) break;
                  }
                }
                if (q807 - q790 < 1) t791 = -1;
                else {
                  V = q807 > q790 ? s.substring(q790, q807) : void 0;
                  t791 = q807;
                }
              }
              break L795;
            }
            case 1: {
              t791 = r_quoted_v(s, q790);
              if (t791 >= 0) break L795;
              t791 = r_openQuote_v(s, q790);
              break L795;
            }
            case 2: {
              t791 = h_796(s, q790);
              break L795;
            }
            default:
              t791 = -1;
          }
        }
        if (t791 < 0 || t791 === q790) break;
        a793.push(V);
        n792++;
        q790 = t791;
      }
      if (n792 < 0) o = -1;
      else {
        V = a793;
        o = q790;
      }
    }
    return o;
  }
  function r_openQuote_v(s, i) {
    let o;
    {
      const c809 = s.charCodeAt(i);
      if (!(c809 < 128 ? K211[c809] === 1 : false)) o = -1;
      else {
        K210.lastIndex = i;
        if (K210.test(s)) {
          o = K210.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_semiTail_v(s, i) {
    let o;
    if (s.charCodeAt(i) === 59) {
      V = ";";
      o = i + 1;
    } else o = -1;
    if (o >= 0) V = AK61(V);
    return o;
  }
  function r_blockTail_v(s, i) {
    let o;
    {
      let t810;
      {
        let t813;
        if (s.charCodeAt(i) === 123) {
          t813 = i + 1;
        } else t813 = -1;
        if (t813 < 0) t810 = -1;
        else {
          t810 = r_blockBody_r(s, t813);
        }
      }
      if (t810 < 0) o = -1;
      else {
        let u811;
        if (s.charCodeAt(t810) === 125) {
          u811 = t810 + 1;
        } else u811 = -1;
        if (u811 < 0) o = -1;
        else {
          o = u811;
        }
      }
    }
    if (o >= 0) V = AK62(s.substring(i, o));
    return o;
  }
  function r_ruleBlock_v(s, i) {
    let o;
    {
      let t814;
      t814 = r_openComment_r(s, i);
      if (t814 >= 0) o = -1;
      else {
        L815: {
          o = -1;
          let t816;
          t816 = r_preludeRun_v(s, i);
          if (t816 < 0) break L815;
          const v818 = V;
          let t817;
          L820: {
            const c821 = s.charCodeAt(t816);
            const g822 = c821 < 128 ? K212[c821] : c821 === c821 ? -1 : -1;
            switch (g822) {
              case 0: {
                t817 = r_semiTail_v(s, t816);
                break L820;
              }
              case 1: {
                t817 = r_blockTail_v(s, t816);
                break L820;
              }
              default:
                t817 = -1;
            }
          }
          if (t817 < 0) break L815;
          const v819 = V;
          V = [v818, v819];
          o = t817;
        }
      }
    }
    if (o >= 0) V = AK63(V);
    return o;
  }
  function r_openComment_v(s, i) {
    let o;
    {
      const c823 = s.charCodeAt(i);
      if (!(c823 < 128 ? K214[c823] === 1 : false)) o = -1;
      else {
        K213.lastIndex = i;
        if (K213.test(s)) {
          o = K213.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK64(V, i, o);
    return o;
  }
  function r_openBlock_v(s, i) {
    let o;
    L824: {
      o = -1;
      let t825;
      t825 = r_preludeRun_v(s, i);
      if (t825 < 0) break L824;
      const v828 = V;
      let t826;
      if (s.charCodeAt(t825) === 123) {
        V = "{";
        t826 = t825 + 1;
      } else t826 = -1;
      if (t826 < 0) break L824;
      const v829 = V;
      let t827;
      t827 = r_restText_v(s, t826);
      if (t827 < 0) break L824;
      const v830 = V;
      V = [v828, v829, v830];
      o = t827;
    }
    if (o >= 0) V = AK65(V, i, o);
    return o;
  }
  function r_openRule_v(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      V = s.substring(i);
      o = s.length;
    }
    if (o >= 0) V = AK66(V, i, o);
    return o;
  }
  function r_ruleList_v(s, i) {
    let o;
    L831: {
      o = -1;
      let t832;
      t832 = r_ruleGap_v(s, i);
      if (t832 < 0) break L831;
      const v835 = V;
      let t833;
      {
        let q838 = t832, n840 = 0;
        const a841 = [];
        for (; ; ) {
          const c842 = s.charCodeAt(q838);
          if (!(c842 < 128 ? K215[c842] === 1 : c842 === c842)) break;
          let t839;
          L843: {
            t839 = -1;
            let t844;
            t844 = r_ruleBlock_v(s, q838);
            if (t844 < 0) break L843;
            const v846 = V;
            let t845;
            t845 = r_ruleGap_v(s, t844);
            if (t845 < 0) break L843;
            const v847 = V;
            V = [v846, v847];
            t839 = t845;
          }
          if (t839 < 0 || t839 === q838) break;
          a841.push(V);
          n840++;
          q838 = t839;
        }
        if (n840 < 0) t833 = -1;
        else {
          V = a841;
          t833 = q838;
        }
      }
      if (t833 < 0) break L831;
      const v836 = V;
      let t834;
      {
        const c852 = s.charCodeAt(t833);
        if (!(c852 < 128 ? K217[c852] === 1 : c852 === c852)) {
          V = void 0;
          t834 = t833;
        } else {
          let t848;
          L849: {
            const c850 = s.charCodeAt(t833);
            const g851 = c850 < 128 ? K216[c850] : c850 === c850 ? 0 : -1;
            switch (g851) {
              case 0: {
                t848 = r_openBlock_v(s, t833);
                if (t848 >= 0) break L849;
                t848 = r_openRule_v(s, t833);
                break L849;
              }
              case 1: {
                t848 = r_openRule_v(s, t833);
                break L849;
              }
              case 2: {
                t848 = r_openComment_v(s, t833);
                if (t848 >= 0) break L849;
                t848 = r_openBlock_v(s, t833);
                if (t848 >= 0) break L849;
                t848 = r_openRule_v(s, t833);
                break L849;
              }
              default:
                t848 = -1;
            }
          }
          if (t848 < 0) {
            V = void 0;
            t834 = t833;
          } else t834 = t848;
        }
      }
      if (t834 < 0) break L831;
      const v837 = V;
      V = [v835, v836, v837];
      o = t834;
    }
    if (o >= 0) V = AK67(V);
    return o;
  }
  function r_atPrelude_v(s, i) {
    let o;
    L853: {
      o = r_atKeyframes_v(s, i);
      if (o >= 0) break L853;
      o = r_atProperty_v(s, i);
      if (o >= 0) break L853;
      o = r_atFunction_v(s, i);
      if (o >= 0) break L853;
      o = r_atScope_v(s, i);
      if (o >= 0) break L853;
      o = r_atStartingStyle_v(s, i);
      if (o >= 0) break L853;
      o = r_atScrollTimeline_v(s, i);
      if (o >= 0) break L853;
      o = r_atViewTimeline_v(s, i);
      if (o >= 0) break L853;
      o = r_atOther_v(s, i);
    }
    return o;
  }
  function r_atKeyframes_v(s, i) {
    let o;
    L854: {
      o = -1;
      let t855;
      {
        const c859 = s.charCodeAt(i);
        if (!(c859 < 128 ? K219[c859] === 1 : false)) t855 = -1;
        else {
          K218.lastIndex = i;
          if (K218.test(s)) {
            t855 = K218.lastIndex;
            V = s.substring(i, t855);
          } else t855 = -1;
        }
      }
      if (t855 < 0) break L854;
      const v857 = V;
      let t856;
      t856 = r_restText_v(s, t855);
      if (t856 < 0) break L854;
      const v858 = V;
      V = [v857, v858];
      o = t856;
    }
    if (o >= 0) V = AK68(V);
    return o;
  }
  function r_atProperty_v(s, i) {
    let o;
    L860: {
      o = -1;
      let t861;
      {
        const c865 = s.charCodeAt(i);
        if (!(c865 < 128 ? K221[c865] === 1 : false)) t861 = -1;
        else {
          K220.lastIndex = i;
          if (K220.test(s)) {
            t861 = K220.lastIndex;
            V = s.substring(i, t861);
          } else t861 = -1;
        }
      }
      if (t861 < 0) break L860;
      const v863 = V;
      let t862;
      t862 = r_restText_v(s, t861);
      if (t862 < 0) break L860;
      const v864 = V;
      V = [v863, v864];
      o = t862;
    }
    if (o >= 0) V = AK69(V);
    return o;
  }
  function r_atFunction_v(s, i) {
    let o;
    L866: {
      o = -1;
      let t867;
      {
        const c871 = s.charCodeAt(i);
        if (!(c871 < 128 ? K223[c871] === 1 : false)) t867 = -1;
        else {
          K222.lastIndex = i;
          if (K222.test(s)) {
            t867 = K222.lastIndex;
            V = s.substring(i, t867);
          } else t867 = -1;
        }
      }
      if (t867 < 0) break L866;
      const v869 = V;
      let t868;
      t868 = r_restText_v(s, t867);
      if (t868 < 0) break L866;
      const v870 = V;
      V = [v869, v870];
      o = t868;
    }
    if (o >= 0) V = AK70(V);
    return o;
  }
  function r_atScope_v(s, i) {
    let o;
    L872: {
      o = -1;
      let t873;
      {
        const c877 = s.charCodeAt(i);
        if (!(c877 < 128 ? K225[c877] === 1 : false)) t873 = -1;
        else {
          K224.lastIndex = i;
          if (K224.test(s)) {
            t873 = K224.lastIndex;
            V = s.substring(i, t873);
          } else t873 = -1;
        }
      }
      if (t873 < 0) break L872;
      const v875 = V;
      let t874;
      t874 = r_restText_v(s, t873);
      if (t874 < 0) break L872;
      const v876 = V;
      V = [v875, v876];
      o = t874;
    }
    if (o >= 0) V = AK71(V);
    return o;
  }
  function r_atStartingStyle_v(s, i) {
    let o;
    {
      const c878 = s.charCodeAt(i);
      if (!(c878 < 128 ? K227[c878] === 1 : false)) o = -1;
      else {
        K226.lastIndex = i;
        if (K226.test(s)) {
          o = K226.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK72(V);
    return o;
  }
  function r_atScrollTimeline_v(s, i) {
    let o;
    L879: {
      o = -1;
      let t880;
      {
        const c884 = s.charCodeAt(i);
        if (!(c884 < 128 ? K229[c884] === 1 : false)) t880 = -1;
        else {
          K228.lastIndex = i;
          if (K228.test(s)) {
            t880 = K228.lastIndex;
            V = s.substring(i, t880);
          } else t880 = -1;
        }
      }
      if (t880 < 0) break L879;
      const v882 = V;
      let t881;
      t881 = r_restText_v(s, t880);
      if (t881 < 0) break L879;
      const v883 = V;
      V = [v882, v883];
      o = t881;
    }
    if (o >= 0) V = AK73(V);
    return o;
  }
  function r_atViewTimeline_v(s, i) {
    let o;
    L885: {
      o = -1;
      let t886;
      {
        const c890 = s.charCodeAt(i);
        if (!(c890 < 128 ? K231[c890] === 1 : false)) t886 = -1;
        else {
          K230.lastIndex = i;
          if (K230.test(s)) {
            t886 = K230.lastIndex;
            V = s.substring(i, t886);
          } else t886 = -1;
        }
      }
      if (t886 < 0) break L885;
      const v888 = V;
      let t887;
      t887 = r_restText_v(s, t886);
      if (t887 < 0) break L885;
      const v889 = V;
      V = [v888, v889];
      o = t887;
    }
    if (o >= 0) V = AK74(V);
    return o;
  }
  function r_atOther_v(s, i) {
    let o;
    L891: {
      o = -1;
      let t892;
      t892 = r_atName_v(s, i);
      if (t892 < 0) break L891;
      const v894 = V;
      let t893;
      {
        const c897 = s.charCodeAt(t892);
        if (!(c897 < 128 ? K232[c897] === 1 : false)) {
          V = void 0;
          t893 = t892;
        } else {
          let t896;
          t896 = r_atRest_v(s, t892);
          if (t896 < 0) {
            V = void 0;
            t893 = t892;
          } else t893 = t896;
        }
      }
      if (t893 < 0) break L891;
      const v895 = V;
      V = [v894, v895];
      o = t893;
    }
    if (o >= 0) V = AK75(V);
    return o;
  }
  function r_atName_v(s, i) {
    let o;
    {
      const c898 = s.charCodeAt(i);
      if (!(c898 < 128 ? K234[c898] === 1 : false)) o = -1;
      else {
        K233.lastIndex = i;
        if (K233.test(s)) {
          o = K233.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK76(V);
    return o;
  }
  function r_atRest_v(s, i) {
    let o;
    {
      let t899;
      if (s.charCodeAt(i) === 32) {
        t899 = i + 1;
      } else t899 = -1;
      if (t899 < 0) o = -1;
      else {
        o = r_restText_v(s, t899);
      }
    }
    return o;
  }
  function r_propertyName_v(s, i) {
    let o;
    {
      const c900 = s.charCodeAt(i);
      if (!(c900 < 128 ? K236[c900] === 1 : false)) o = -1;
      else {
        K235.lastIndex = i;
        if (K235.test(s)) {
          o = K235.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_syntaxText_v(s, i) {
    let o;
    L901: {
      o = -1;
      let t902;
      {
        const c910 = s.charCodeAt(i);
        if (!(c910 < 128 ? K239[c910] === 1 : false)) {
          V = void 0;
          t902 = i;
        } else {
          let t908;
          {
            const c909 = s.charCodeAt(i);
            if (!(c909 < 128 ? K238[c909] === 1 : false)) t908 = -1;
            else {
              K237.lastIndex = i;
              if (K237.test(s)) {
                t908 = K237.lastIndex;
                V = s.substring(i, t908);
              } else t908 = -1;
            }
          }
          if (t908 < 0) {
            V = void 0;
            t902 = i;
          } else t902 = t908;
        }
      }
      if (t902 < 0) break L901;
      const v905 = V;
      let t903;
      {
        const c912 = s.charCodeAt(t902);
        if (!(c912 < 128 ? K240[c912] === 1 : c912 === c912)) {
          V = void 0;
          t903 = t902;
        } else {
          let t911;
          t911 = r_syntaxCore_v(s, t902);
          if (t911 < 0) {
            V = void 0;
            t903 = t902;
          } else t903 = t911;
        }
      }
      if (t903 < 0) break L901;
      const v906 = V;
      let t904;
      {
        const c915 = s.charCodeAt(t903);
        if (!(c915 < 128 ? K243[c915] === 1 : false)) {
          V = void 0;
          t904 = t903;
        } else {
          let t913;
          {
            const c914 = s.charCodeAt(t903);
            if (!(c914 < 128 ? K242[c914] === 1 : false)) t913 = -1;
            else {
              K241.lastIndex = t903;
              if (K241.test(s)) {
                t913 = K241.lastIndex;
                V = s.substring(t903, t913);
              } else t913 = -1;
            }
          }
          if (t913 < 0) {
            V = void 0;
            t904 = t903;
          } else t904 = t913;
        }
      }
      if (t904 < 0) break L901;
      const v907 = V;
      V = [v905, v906, v907];
      o = t904;
    }
    if (o >= 0) V = AK77(V);
    return o;
  }
  function r_syntaxCore_v(s, i) {
    let o;
    {
      const c916 = s.charCodeAt(i);
      if (!(c916 < 128 ? K245[c916] === 1 : c916 === c916)) o = -1;
      else {
        K244.lastIndex = i;
        if (K244.test(s)) {
          o = K244.lastIndex;
        } else o = -1;
      }
    }
    if (o >= 0) V = AK78(s.substring(i, o));
    return o;
  }
  function r_syntaxPart_v(s, i) {
    let o;
    {
      const c920 = s.charCodeAt(i);
      if (!(c920 < 128 ? K248[c920] === 1 : c920 === c920)) {
        o = i;
      } else {
        let t917;
        if (i >= s.length) t917 = -1;
        else {
          let q918 = i;
          for (; q918 < s.length; q918++) {
            const c919 = s.charCodeAt(q918);
            if (c919 < 128) {
              if (K246[c919] === 0) break;
            } else {
              K247.lastIndex = q918;
              if (!K247.test(s)) break;
            }
          }
          if (q918 - i < 1) t917 = -1;
          else {
            t917 = q918;
          }
        }
        if (t917 < 0) {
          o = i;
        } else o = t917;
      }
    }
    if (o >= 0) V = AK79(s.substring(i, o));
    return o;
  }
  function r_syntaxAlts_v(s, i) {
    let o;
    L921: {
      o = -1;
      let t922;
      t922 = r_syntaxPart_v(s, i);
      if (t922 < 0) break L921;
      const v924 = V;
      let t923;
      {
        let q926 = t922, n928 = 0;
        const a929 = [];
        for (; ; ) {
          const c930 = s.charCodeAt(q926);
          if (!(c930 < 128 ? K249[c930] === 1 : false)) break;
          let t927;
          L931: {
            t927 = -1;
            let t932;
            if (s.charCodeAt(q926) === 124) {
              V = "|";
              t932 = q926 + 1;
            } else t932 = -1;
            if (t932 < 0) break L931;
            const v934 = V;
            let t933;
            t933 = r_syntaxPart_v(s, t932);
            if (t933 < 0) break L931;
            const v935 = V;
            V = [v934, v935];
            t927 = t933;
          }
          if (t927 < 0 || t927 === q926) break;
          a929.push(V);
          n928++;
          q926 = t927;
        }
        if (n928 < 0) t923 = -1;
        else {
          V = a929;
          t923 = q926;
        }
      }
      if (t923 < 0) break L921;
      const v925 = V;
      V = [v924, v925];
      o = t923;
    }
    if (o >= 0) V = AK80(V);
    return o;
  }
  function r_scopeGroup_v(s, i) {
    let o;
    {
      let t936;
      {
        let t939;
        if (s.charCodeAt(i) === 40) {
          t939 = i + 1;
        } else t939 = -1;
        if (t939 < 0) t936 = -1;
        else {
          t936 = r_textBody_r(s, t939);
        }
      }
      if (t936 < 0) o = -1;
      else {
        let u937;
        if (s.charCodeAt(t936) === 41) {
          u937 = t936 + 1;
        } else u937 = -1;
        if (u937 < 0) o = -1;
        else {
          o = u937;
        }
      }
    }
    if (o >= 0) V = AK81(s.substring(i, o));
    return o;
  }
  function r_scopeLimit_v(s, i) {
    let o;
    {
      let t940;
      {
        let t941;
        {
          const c942 = s.charCodeAt(i);
          if (!(c942 < 128 ? K251[c942] === 1 : false)) t941 = -1;
          else {
            K250.lastIndex = i;
            if (K250.test(s)) {
              t941 = K250.lastIndex;
            } else t941 = -1;
          }
        }
        if (t941 < 0) t940 = -1;
        else {
          t940 = r_ws_r(s, t941);
        }
      }
      if (t940 < 0) o = -1;
      else {
        o = r_scopeGroup_v(s, t940);
      }
    }
    return o;
  }
  function r_scopePrelude_v(s, i) {
    let o;
    L943: {
      o = -1;
      let t944;
      t944 = r_ws_v(s, i);
      if (t944 < 0) break L943;
      const v946 = V;
      let t945;
      {
        const c959 = s.charCodeAt(t944);
        if (!(c959 < 128 ? K253[c959] === 1 : false)) {
          V = void 0;
          t945 = t944;
        } else {
          let t948;
          L949: {
            t948 = -1;
            let t950;
            t950 = r_scopeGroup_v(s, t944);
            if (t950 < 0) break L949;
            const v953 = V;
            let t951;
            {
              const c958 = s.charCodeAt(t950);
              if (!(c958 < 128 ? K252[c958] === 1 : c958 === c958)) {
                V = void 0;
                t951 = t950;
              } else {
                let t956;
                {
                  let t957;
                  t957 = r_ws_r(s, t950);
                  if (t957 < 0) t956 = -1;
                  else {
                    t956 = r_scopeLimit_v(s, t957);
                  }
                }
                if (t956 < 0) {
                  V = void 0;
                  t951 = t950;
                } else t951 = t956;
              }
            }
            if (t951 < 0) break L949;
            const v954 = V;
            let t952;
            t952 = r_ws_v(s, t951);
            if (t952 < 0) break L949;
            const v955 = V;
            V = [v953, v954, v955];
            t948 = t952;
          }
          if (t948 < 0) {
            V = void 0;
            t945 = t944;
          } else t945 = t948;
        }
      }
      if (t945 < 0) break L943;
      const v947 = V;
      V = [v946, v947];
      o = t945;
    }
    if (o >= 0) V = AK82(V);
    return o;
  }
  function r_functionName_v(s, i) {
    let o;
    {
      const c960 = s.charCodeAt(i);
      if (!(c960 < 128 ? K255[c960] === 1 : false)) o = -1;
      else {
        K254.lastIndex = i;
        if (K254.test(s)) {
          o = K254.lastIndex;
        } else o = -1;
      }
    }
    if (o >= 0) V = AK83(s.substring(i, o));
    return o;
  }
  function r_functionParams_v(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      K256.lastIndex = i;
      if (K256.test(s)) {
        o = K256.lastIndex;
      } else o = -1;
    }
    if (o >= 0) V = AK84(s.substring(i, o));
    return o;
  }
  function r_functionHead_v(s, i) {
    let o;
    L961: {
      o = -1;
      let t962;
      {
        let t966;
        {
          const c967 = s.charCodeAt(i);
          if (!(c967 < 128 ? K258[c967] === 1 : false)) t966 = -1;
          else {
            K257.lastIndex = i;
            if (K257.test(s)) {
              t966 = K257.lastIndex;
            } else t966 = -1;
          }
        }
        if (t966 < 0) t962 = -1;
        else {
          t962 = r_functionName_v(s, t966);
        }
      }
      if (t962 < 0) break L961;
      const v964 = V;
      let t963;
      {
        let t968;
        {
          let t971;
          {
            const c972 = s.charCodeAt(t962);
            if (!(c972 < 128 ? K260[c972] === 1 : c972 === c972)) t971 = -1;
            else {
              K259.lastIndex = t962;
              if (K259.test(s)) {
                t971 = K259.lastIndex;
              } else t971 = -1;
            }
          }
          if (t971 < 0) t968 = -1;
          else {
            t968 = r_functionParams_v(s, t971);
          }
        }
        if (t968 < 0) t963 = -1;
        else {
          const v970 = V;
          let u969;
          if (s.charCodeAt(t968) === 41) {
            u969 = t968 + 1;
          } else u969 = -1;
          if (u969 < 0) t963 = -1;
          else {
            V = v970;
            t963 = u969;
          }
        }
      }
      if (t963 < 0) break L961;
      const v965 = V;
      V = [v964, v965];
      o = t963;
    }
    if (o >= 0) V = AK85(V);
    return o;
  }
  function r_colonRun_v(s, i) {
    let o;
    {
      let q973 = i, n975 = 0;
      for (; ; ) {
        const c977 = s.charCodeAt(q973);
        if (!(c977 < 128 ? K261[c977] === 1 : c977 === c977)) break;
        let t974;
        L978: {
          const c979 = s.charCodeAt(q973);
          const g980 = c979 < 128 ? K262[c979] : c979 === c979 ? 0 : -1;
          switch (g980) {
            case 0: {
              if (q973 >= s.length) t974 = -1;
              else {
                let q981 = q973;
                for (; q981 < s.length; q981++) {
                  const c982 = s.charCodeAt(q981);
                  if (c982 < 128) {
                    if (K263[c982] === 0) break;
                  } else {
                    K264.lastIndex = q981;
                    if (!K264.test(s)) break;
                  }
                }
                if (q981 - q973 < 1) t974 = -1;
                else {
                  t974 = q981;
                }
              }
              break L978;
            }
            case 1: {
              t974 = r_quoted_r(s, q973);
              break L978;
            }
            case 2: {
              t974 = r_textGroup_r(s, q973);
              break L978;
            }
            default:
              t974 = -1;
          }
        }
        if (t974 < 0 || t974 === q973) break;
        n975++;
        q973 = t974;
      }
      if (n975 < 0) o = -1;
      else {
        o = q973;
      }
    }
    if (o >= 0) V = AK86(s.substring(i, o));
    return o;
  }
  function r_paramDefault_v(s, i) {
    let o;
    {
      let t983;
      if (s.charCodeAt(i) === 58) {
        t983 = i + 1;
      } else t983 = -1;
      if (t983 < 0) o = -1;
      else {
        o = r_restText_v(s, t983);
      }
    }
    if (o >= 0) V = AK87(V);
    return o;
  }
  function r_functionParam_v(s, i) {
    let o;
    L984: {
      o = -1;
      let t985;
      t985 = r_colonRun_v(s, i);
      if (t985 < 0) break L984;
      const v987 = V;
      let t986;
      {
        const c990 = s.charCodeAt(t985);
        if (!(c990 < 128 ? K265[c990] === 1 : false)) {
          V = void 0;
          t986 = t985;
        } else {
          let t989;
          t989 = r_paramDefault_v(s, t985);
          if (t989 < 0) {
            V = void 0;
            t986 = t985;
          } else t986 = t989;
        }
      }
      if (t986 < 0) break L984;
      const v988 = V;
      V = [v987, v988];
      o = t986;
    }
    if (o >= 0) V = AK88(V);
    return o;
  }
  function r_paramName_v(s, i) {
    let o;
    {
      const c991 = s.charCodeAt(i);
      if (!(c991 < 128 ? K267[c991] === 1 : false)) o = -1;
      else {
        K266.lastIndex = i;
        if (K266.test(s)) {
          o = K266.lastIndex;
        } else o = -1;
      }
    }
    if (o >= 0) V = AK89(s.substring(i, o));
    return o;
  }
  function r_paramSyntax_v(s, i) {
    let o;
    {
      let t992;
      if (i >= s.length) t992 = -1;
      else {
        let q993 = i;
        for (; q993 < s.length; q993++) {
          const c994 = s.charCodeAt(q993);
          if (c994 < 128) {
            if (K268[c994] === 0) break;
          } else {
            K269.lastIndex = q993;
            if (!K269.test(s)) break;
          }
        }
        if (q993 - i < 1) t992 = -1;
        else {
          t992 = q993;
        }
      }
      if (t992 < 0) o = -1;
      else {
        if (t992 >= s.length) o = -1;
        else {
          let q995 = t992;
          for (; q995 < s.length; q995++) {
            const c996 = s.charCodeAt(q995);
            if (c996 < 128) {
              if (K270[c996] === 0) break;
            } else {
              K271.lastIndex = q995;
              if (!K271.test(s)) break;
            }
          }
          if (q995 - t992 < 1) o = -1;
          else {
            o = q995;
          }
        }
      }
    }
    if (o >= 0) V = AK90(s.substring(i, o));
    return o;
  }
  function r_paramHead_v(s, i) {
    let o;
    L997: {
      o = -1;
      let t998;
      t998 = r_paramName_v(s, i);
      if (t998 < 0) break L997;
      const v1000 = V;
      let t999;
      {
        const c1003 = s.charCodeAt(t998);
        if (!(c1003 < 128 ? K272[c1003] === 1 : c1003 === c1003)) {
          V = void 0;
          t999 = t998;
        } else {
          let t1002;
          t1002 = r_paramSyntax_v(s, t998);
          if (t1002 < 0) {
            V = void 0;
            t999 = t998;
          } else t999 = t1002;
        }
      }
      if (t999 < 0) break L997;
      const v1001 = V;
      V = [v1000, v1001];
      o = t999;
    }
    if (o >= 0) V = AK91(V);
    return o;
  }
  function r_declName_v(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      let q1004 = i;
      for (; q1004 < s.length; q1004++) {
        const c1005 = s.charCodeAt(q1004);
        if (c1005 < 128) {
          if (K273[c1005] === 0) break;
        } else {
          K274.lastIndex = q1004;
          if (!K274.test(s)) break;
        }
      }
      if (q1004 - i < 1) o = -1;
      else {
        V = q1004 > i ? s.substring(i, q1004) : void 0;
        o = q1004;
      }
    }
    if (o >= 0) V = AK92(V);
    return o;
  }
  function r_declValue_v(s, i) {
    let o;
    {
      const c1008 = s.charCodeAt(i);
      if (!(c1008 < 128 ? K277[c1008] === 1 : c1008 === c1008)) {
        o = i;
      } else {
        let t1006;
        {
          const c1007 = s.charCodeAt(i);
          if (!(c1007 < 128 ? K276[c1007] === 1 : c1007 === c1007)) t1006 = -1;
          else {
            K275.lastIndex = i;
            if (K275.test(s)) {
              t1006 = K275.lastIndex;
            } else t1006 = -1;
          }
        }
        if (t1006 < 0) {
          o = i;
        } else o = t1006;
      }
    }
    if (o >= 0) V = AK93(s.substring(i, o));
    return o;
  }
  function r_declImportant_v(s, i) {
    let o;
    {
      const c1009 = s.charCodeAt(i);
      if (!(c1009 < 128 ? K279[c1009] === 1 : false)) o = -1;
      else {
        K278.lastIndex = i;
        if (K278.test(s)) {
          o = K278.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    if (o >= 0) V = AK94(V);
    return o;
  }
  function r_declaration_v(s, i) {
    let o;
    L1010: {
      o = -1;
      let t1011;
      t1011 = r_declName_v(s, i);
      if (t1011 < 0) break L1010;
      const v1015 = V;
      let t1012;
      if (s.charCodeAt(t1011) === 58) {
        V = ":";
        t1012 = t1011 + 1;
      } else t1012 = -1;
      if (t1012 < 0) break L1010;
      const v1016 = V;
      let t1013;
      t1013 = r_declValue_v(s, t1012);
      if (t1013 < 0) break L1010;
      const v1017 = V;
      let t1014;
      {
        const c1020 = s.charCodeAt(t1013);
        if (!(c1020 < 128 ? K280[c1020] === 1 : false)) {
          V = void 0;
          t1014 = t1013;
        } else {
          let t1019;
          t1019 = r_declImportant_v(s, t1013);
          if (t1019 < 0) {
            V = void 0;
            t1014 = t1013;
          } else t1014 = t1019;
        }
      }
      if (t1014 < 0) break L1010;
      const v1018 = V;
      V = [v1015, v1016, v1017, v1018];
      o = t1014;
    }
    if (o >= 0) V = AK95(V);
    return o;
  }
  function r_listComma_v(s, i) {
    let o;
    if (s.charCodeAt(i) === 44) {
      V = ",";
      o = i + 1;
    } else o = -1;
    if (o >= 0) V = AK96(V, i, o);
    return o;
  }
  function r_commaSpans_v(s, i) {
    let o;
    L1021: {
      o = -1;
      let t1022;
      t1022 = r_commaRun_v(s, i);
      if (t1022 < 0) break L1021;
      const v1024 = V;
      let t1023;
      {
        let q1026 = t1022, n1028 = 0;
        const a1029 = [];
        for (; ; ) {
          const c1030 = s.charCodeAt(q1026);
          if (!(c1030 < 128 ? K281[c1030] === 1 : false)) break;
          let t1027;
          L1031: {
            t1027 = -1;
            let t1032;
            t1032 = r_listComma_v(s, q1026);
            if (t1032 < 0) break L1031;
            const v1034 = V;
            let t1033;
            t1033 = r_commaRun_v(s, t1032);
            if (t1033 < 0) break L1031;
            const v1035 = V;
            V = [v1034, v1035];
            t1027 = t1033;
          }
          if (t1027 < 0 || t1027 === q1026) break;
          a1029.push(V);
          n1028++;
          q1026 = t1027;
        }
        if (n1028 < 0) t1023 = -1;
        else {
          V = a1029;
          t1023 = q1026;
        }
      }
      if (t1023 < 0) break L1021;
      const v1025 = V;
      V = [v1024, v1025];
      o = t1023;
    }
    if (o >= 0) V = AK97(V);
    return o;
  }
  function r_argRun_v(s, i) {
    let o;
    {
      let q1036 = i, n1038 = 0;
      for (; ; ) {
        const c1040 = s.charCodeAt(q1036);
        if (!(c1040 < 128 ? K282[c1040] === 1 : c1040 === c1040)) break;
        let t1037;
        L1041: {
          const c1042 = s.charCodeAt(q1036);
          const g1043 = c1042 < 128 ? K283[c1042] : c1042 === c1042 ? 0 : -1;
          switch (g1043) {
            case 0: {
              if (q1036 >= s.length) t1037 = -1;
              else {
                let q1044 = q1036;
                for (; q1044 < s.length; q1044++) {
                  const c1045 = s.charCodeAt(q1044);
                  if (c1045 < 128) {
                    if (K284[c1045] === 0) break;
                  } else {
                    K285.lastIndex = q1044;
                    if (!K285.test(s)) break;
                  }
                }
                if (q1044 - q1036 < 1) t1037 = -1;
                else {
                  t1037 = q1044;
                }
              }
              break L1041;
            }
            case 1: {
              t1037 = r_quoted_r(s, q1036);
              break L1041;
            }
            case 2: {
              t1037 = r_textGroup_r(s, q1036);
              break L1041;
            }
            default:
              t1037 = -1;
          }
        }
        if (t1037 < 0 || t1037 === q1036) break;
        n1038++;
        q1036 = t1037;
      }
      if (n1038 < 1) o = -1;
      else {
        o = q1036;
      }
    }
    if (o >= 0) V = AK98(s.substring(i, o));
    return o;
  }
  function r_timelineArgs_v(s, i) {
    let o;
    L1046: {
      o = -1;
      let t1047;
      {
        let t1051;
        if (i >= s.length) t1051 = -1;
        else {
          let q1052 = i;
          for (; q1052 < s.length; q1052++) {
            const c1053 = s.charCodeAt(q1052);
            if (c1053 < 128) {
              if (K286[c1053] === 0) break;
            } else {
              K287.lastIndex = q1052;
              if (!K287.test(s)) break;
            }
          }
          if (q1052 - i < 0) t1051 = -1;
          else {
            V = q1052 > i ? s.substring(i, q1052) : void 0;
            t1051 = q1052;
          }
        }
        if (t1051 < 0) {
          V = void 0;
          t1047 = i;
        } else t1047 = t1051;
      }
      if (t1047 < 0) break L1046;
      const v1049 = V;
      let t1048;
      {
        let q1054 = t1047, n1056 = 0;
        const a1057 = [];
        for (; ; ) {
          const c1058 = s.charCodeAt(q1054);
          if (!(c1058 < 128 ? K288[c1058] === 1 : c1058 === c1058)) break;
          let t1055;
          L1059: {
            t1055 = -1;
            let t1060;
            t1060 = r_argRun_v(s, q1054);
            if (t1060 < 0) break L1059;
            const v1062 = V;
            let t1061;
            {
              let t1064;
              if (t1060 >= s.length) t1064 = -1;
              else {
                let q1065 = t1060;
                for (; q1065 < s.length; q1065++) {
                  const c1066 = s.charCodeAt(q1065);
                  if (c1066 < 128) {
                    if (K289[c1066] === 0) break;
                  } else {
                    K290.lastIndex = q1065;
                    if (!K290.test(s)) break;
                  }
                }
                if (q1065 - t1060 < 0) t1064 = -1;
                else {
                  V = q1065 > t1060 ? s.substring(t1060, q1065) : void 0;
                  t1064 = q1065;
                }
              }
              if (t1064 < 0) {
                V = void 0;
                t1061 = t1060;
              } else t1061 = t1064;
            }
            if (t1061 < 0) break L1059;
            const v1063 = V;
            V = [v1062, v1063];
            t1055 = t1061;
          }
          if (t1055 < 0 || t1055 === q1054) break;
          a1057.push(V);
          n1056++;
          q1054 = t1055;
        }
        if (n1056 < 0) t1048 = -1;
        else {
          V = a1057;
          t1048 = q1054;
        }
      }
      if (t1048 < 0) break L1046;
      const v1050 = V;
      V = [v1049, v1050];
      o = t1048;
    }
    if (o >= 0) V = AK99(V);
    return o;
  }
  function r_scrollFn_v(s, i) {
    let o;
    {
      let t1067;
      {
        let t1070;
        {
          const c1071 = s.charCodeAt(i);
          if (!(c1071 < 128 ? K292[c1071] === 1 : false)) t1070 = -1;
          else {
            K291.lastIndex = i;
            if (K291.test(s)) {
              t1070 = K291.lastIndex;
            } else t1070 = -1;
          }
        }
        if (t1070 < 0) t1067 = -1;
        else {
          t1067 = r_timelineArgs_v(s, t1070);
        }
      }
      if (t1067 < 0) o = -1;
      else {
        const v1069 = V;
        let u1068;
        if (s.charCodeAt(t1067) === 41) {
          u1068 = t1067 + 1;
        } else u1068 = -1;
        if (u1068 < 0) o = -1;
        else {
          V = v1069;
          o = u1068;
        }
      }
    }
    return o;
  }
  function r_viewFn_v(s, i) {
    let o;
    {
      let t1072;
      {
        let t1075;
        {
          const c1076 = s.charCodeAt(i);
          if (!(c1076 < 128 ? K294[c1076] === 1 : false)) t1075 = -1;
          else {
            K293.lastIndex = i;
            if (K293.test(s)) {
              t1075 = K293.lastIndex;
            } else t1075 = -1;
          }
        }
        if (t1075 < 0) t1072 = -1;
        else {
          t1072 = r_timelineArgs_v(s, t1075);
        }
      }
      if (t1072 < 0) o = -1;
      else {
        const v1074 = V;
        let u1073;
        if (s.charCodeAt(t1072) === 41) {
          u1073 = t1072 + 1;
        } else u1073 = -1;
        if (u1073 < 0) o = -1;
        else {
          V = v1074;
          o = u1073;
        }
      }
    }
    return o;
  }
  function r_timelineLead_v(s, i) {
    let o;
    {
      const c1077 = s.charCodeAt(i);
      if (!(c1077 < 128 ? K296[c1077] === 1 : false)) o = -1;
      else {
        K295.lastIndex = i;
        if (K295.test(s)) {
          o = K295.lastIndex;
          V = s.substring(i, o);
        } else o = -1;
      }
    }
    return o;
  }
  function r_timelineLength_v(s, i) {
    let o;
    L1078: {
      const c1079 = s.charCodeAt(i);
      const g1080 = c1079 < 128 ? K297[c1079] : c1079 === c1079 ? -1 : -1;
      switch (g1080) {
        case 0: {
          {
            const c1081 = s.charCodeAt(i);
            if (!(c1081 < 128 ? K299[c1081] === 1 : false)) o = -1;
            else {
              K298.lastIndex = i;
              if (K298.test(s)) {
                o = K298.lastIndex;
                V = s.substring(i, o);
              } else o = -1;
            }
          }
          break L1078;
        }
        case 1: {
          {
            const c1082 = s.charCodeAt(i);
            if (!(c1082 < 128 ? K301[c1082] === 1 : false)) o = -1;
            else {
              K300.lastIndex = i;
              if (K300.test(s)) {
                o = K300.lastIndex;
                V = s.substring(i, o);
              } else o = -1;
            }
          }
          break L1078;
        }
        default:
          o = -1;
      }
    }
    return o;
  }
  function r_close_r(s, i) {
    let o;
    {
      const c1083 = s.charCodeAt(i);
      if (!(c1083 < 128 ? K303[c1083] === 1 : c1083 === c1083)) o = -1;
      else {
        K302.lastIndex = i;
        if (K302.test(s)) {
          o = K302.lastIndex;
        } else o = -1;
      }
    }
    return o;
  }
  function r_comma_r(s, i) {
    let o;
    {
      const c1084 = s.charCodeAt(i);
      if (!(c1084 < 128 ? K305[c1084] === 1 : c1084 === c1084)) o = -1;
      else {
        K304.lastIndex = i;
        if (K304.test(s)) {
          o = K304.lastIndex;
        } else o = -1;
      }
    }
    return o;
  }
  function r_slash_r(s, i) {
    let o;
    {
      const c1085 = s.charCodeAt(i);
      if (!(c1085 < 128 ? K307[c1085] === 1 : c1085 === c1085)) o = -1;
      else {
        K306.lastIndex = i;
        if (K306.test(s)) {
          o = K306.lastIndex;
        } else o = -1;
      }
    }
    return o;
  }
  function r_ws_r(s, i) {
    let o;
    {
      let t1086;
      if (i >= s.length) t1086 = -1;
      else {
        let q1087 = i;
        for (; q1087 < s.length; q1087++) {
          const c1088 = s.charCodeAt(q1087);
          if (c1088 < 128) {
            if (K308[c1088] === 0) break;
          } else {
            K309.lastIndex = q1087;
            if (!K309.test(s)) break;
          }
        }
        if (q1087 - i < 0) t1086 = -1;
        else {
          t1086 = q1087;
        }
      }
      if (t1086 < 0) {
        o = i;
      } else o = t1086;
    }
    return o;
  }
  function r_ws1_r(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      let q1089 = i;
      for (; q1089 < s.length; q1089++) {
        const c1090 = s.charCodeAt(q1089);
        if (c1090 < 128) {
          if (K310[c1090] === 0) break;
        } else {
          K311.lastIndex = q1089;
          if (!K311.test(s)) break;
        }
      }
      if (q1089 - i < 1) o = -1;
      else {
        o = q1089;
      }
    }
    return o;
  }
  function r_termSep_r(s, i) {
    let o;
    if (i >= s.length) o = -1;
    else {
      K312.lastIndex = i;
      if (K312.test(s)) {
        o = K312.lastIndex;
      } else o = -1;
    }
    return o;
  }
  function r_colorHead_r(s, i) {
    let o;
    {
      const c1091 = s.charCodeAt(i);
      if (!(c1091 < 128 ? K314[c1091] === 1 : false)) o = -1;
      else {
        K313.lastIndex = i;
        if (K313.test(s)) {
          o = K313.lastIndex;
        } else o = -1;
      }
    }
    return o;
  }
  function r_quoted_r(s, i) {
    let o;
    {
      const c1092 = s.charCodeAt(i);
      if (!(c1092 < 128 ? K316[c1092] === 1 : false)) o = -1;
      else {
        K315.lastIndex = i;
        if (K315.test(s)) {
          o = K315.lastIndex;
        } else o = -1;
      }
    }
    return o;
  }
  function r_textGroup_r(s, i) {
    let o;
    L1093: {
      o = -1;
      let t1094;
      if (s.charCodeAt(i) === 40) {
        t1094 = i + 1;
      } else t1094 = -1;
      if (t1094 < 0) break L1093;
      let t1095;
      t1095 = r_textBody_r(s, t1094);
      if (t1095 < 0) break L1093;
      let t1096;
      if (s.charCodeAt(t1095) === 41) {
        t1096 = t1095 + 1;
      } else t1096 = -1;
      if (t1096 < 0) break L1093;
      o = t1096;
    }
    return o;
  }
  function r_blockBody_r(s, i) {
    let o;
    {
      let q1100 = i, n1102 = 0;
      for (; ; ) {
        const c1104 = s.charCodeAt(q1100);
        if (!(c1104 < 128 ? K317[c1104] === 1 : c1104 === c1104)) break;
        let t1101;
        L1105: {
          const c1115 = s.charCodeAt(q1100);
          const g1116 = c1115 < 128 ? K318[c1115] : c1115 === c1115 ? 0 : -1;
          switch (g1116) {
            case 0: {
              if (q1100 >= s.length) t1101 = -1;
              else {
                let q1117 = q1100;
                for (; q1117 < s.length; q1117++) {
                  const c1118 = s.charCodeAt(q1117);
                  if (c1118 < 128) {
                    if (K319[c1118] === 0) break;
                  } else {
                    K320.lastIndex = q1117;
                    if (!K320.test(s)) break;
                  }
                }
                if (q1117 - q1100 < 1) t1101 = -1;
                else {
                  t1101 = q1117;
                }
              }
              break L1105;
            }
            case 1: {
              t1101 = r_quoted_r(s, q1100);
              if (t1101 >= 0) break L1105;
              t1101 = r_openQuote_r(s, q1100);
              break L1105;
            }
            case 2: {
              t1101 = h_1106(s, q1100);
              break L1105;
            }
            default:
              t1101 = -1;
          }
        }
        if (t1101 < 0 || t1101 === q1100) break;
        n1102++;
        q1100 = t1101;
      }
      if (n1102 < 0) o = -1;
      else {
        o = q1100;
      }
    }
    return o;
  }
  function r_openComment_r(s, i) {
    let o;
    {
      const c1119 = s.charCodeAt(i);
      if (!(c1119 < 128 ? K322[c1119] === 1 : false)) o = -1;
      else {
        K321.lastIndex = i;
        if (K321.test(s)) {
          o = K321.lastIndex;
        } else o = -1;
      }
    }
    return o;
  }
  function r_textBody_r(s, i) {
    let o;
    {
      let q1120 = i, n1122 = 0;
      for (; ; ) {
        const c1124 = s.charCodeAt(q1120);
        if (!(c1124 < 128 ? K323[c1124] === 1 : c1124 === c1124)) break;
        let t1121;
        L1125: {
          const c1126 = s.charCodeAt(q1120);
          const g1127 = c1126 < 128 ? K324[c1126] : c1126 === c1126 ? 0 : -1;
          switch (g1127) {
            case 0: {
              if (q1120 >= s.length) t1121 = -1;
              else {
                let q1128 = q1120;
                for (; q1128 < s.length; q1128++) {
                  const c1129 = s.charCodeAt(q1128);
                  if (c1129 < 128) {
                    if (K325[c1129] === 0) break;
                  } else {
                    K326.lastIndex = q1128;
                    if (!K326.test(s)) break;
                  }
                }
                if (q1128 - q1120 < 1) t1121 = -1;
                else {
                  t1121 = q1128;
                }
              }
              break L1125;
            }
            case 1: {
              t1121 = r_quoted_r(s, q1120);
              break L1125;
            }
            case 2: {
              t1121 = r_textGroup_r(s, q1120);
              break L1125;
            }
            default:
              t1121 = -1;
          }
        }
        if (t1121 < 0 || t1121 === q1120) break;
        n1122++;
        q1120 = t1121;
      }
      if (n1122 < 0) o = -1;
      else {
        o = q1120;
      }
    }
    return o;
  }
  function r_openQuote_r(s, i) {
    let o;
    {
      const c1130 = s.charCodeAt(i);
      if (!(c1130 < 128 ? K328[c1130] === 1 : false)) o = -1;
      else {
        K327.lastIndex = i;
        if (K327.test(s)) {
          o = K327.lastIndex;
        } else o = -1;
      }
    }
    return o;
  }
  function h_22(s, i) {
    let o23;
    L24: {
      o23 = -1;
      let t25;
      if (s.charCodeAt(i) === 40) {
        V = "(";
        t25 = i + 1;
      } else t25 = -1;
      if (t25 < 0) break L24;
      const v28 = V;
      let t26;
      t26 = r_balanced_v(s, t25);
      if (t26 < 0) break L24;
      const v29 = V;
      let t27;
      if (s.charCodeAt(t26) === 41) {
        V = ")";
        t27 = t26 + 1;
      } else t27 = -1;
      if (t27 < 0) break L24;
      const v30 = V;
      const a31 = [];
      if (v28 !== void 0) a31.push(v28);
      if (v29 !== void 0) a31.push(v29);
      if (v30 !== void 0) a31.push(v30);
      V = a31;
      o23 = t27;
    }
    return o23;
  }
  function h_796(s, i) {
    let o797;
    L798: {
      o797 = -1;
      let t799;
      if (s.charCodeAt(i) === 123) {
        V = "{";
        t799 = i + 1;
      } else t799 = -1;
      if (t799 < 0) break L798;
      const v802 = V;
      let t800;
      t800 = r_blockBody_v(s, t799);
      if (t800 < 0) break L798;
      const v803 = V;
      let t801;
      if (s.charCodeAt(t800) === 125) {
        V = "}";
        t801 = t800 + 1;
      } else t801 = -1;
      if (t801 < 0) break L798;
      const v804 = V;
      V = [v802, v803, v804];
      o797 = t801;
    }
    return o797;
  }
  function h_1106(s, i) {
    let o1107;
    L1108: {
      o1107 = -1;
      let t1109;
      if (s.charCodeAt(i) === 123) {
        t1109 = i + 1;
      } else t1109 = -1;
      if (t1109 < 0) break L1108;
      let t1110;
      t1110 = r_blockBody_r(s, t1109);
      if (t1110 < 0) break L1108;
      let t1111;
      if (s.charCodeAt(t1110) === 125) {
        t1111 = t1110 + 1;
      } else t1111 = -1;
      if (t1111 < 0) break L1108;
      o1107 = t1111;
    }
    return o1107;
  }
  return { rules: { "ws": r_ws_v, "ws1": r_ws1_v, "comma": r_comma_v, "slash": r_slash_v, "close": r_close_v, "number": r_number_v, "percentage": r_percentage_v, "dimension": r_dimension_v, "angle": r_angle_v, "none": r_none_v, "ident": r_ident_v, "dashedIdent": r_dashedIdent_v, "string": r_string_v, "balanced": r_balanced_v, "mathFn": r_mathFn_v, "calc": r_calc_v, "minMax": r_minMax_v, "clampFn": r_clampFn_v, "signAbs": r_signAbs_v, "calcSum": r_calcSum_v, "calcAddOp": r_calcAddOp_v, "calcProduct": r_calcProduct_v, "calcMulOp": r_calcMulOp_v, "calcValue": r_calcValue_v, "calcGroup": r_calcGroup_v, "calcConstant": r_calcConstant_v, "calcKeyword": r_calcKeyword_v, "varFn": r_varFn_v, "color": r_color_v, "component": r_component_v, "hueValue": r_hueValue_v, "alphaValue": r_alphaValue_v, "alphaTail": r_alphaTail_v, "rgbFn": r_rgbFn_v, "rgbModern": r_rgbModern_v, "rgbLegacyPct": r_rgbLegacyPct_v, "rgbLegacyNum": r_rgbLegacyNum_v, "legacyPct": r_legacyPct_v, "legacyNum": r_legacyNum_v, "legacyHue": r_legacyHue_v, "legacyAlpha": r_legacyAlpha_v, "hslFn": r_hslFn_v, "hslModern": r_hslModern_v, "hslLegacy": r_hslLegacy_v, "hwbFn": r_hwbFn_v, "labFn": r_labFn_v, "lchFn": r_lchFn_v, "oklabFn": r_oklabFn_v, "oklchFn": r_oklchFn_v, "colorFn": r_colorFn_v, "colorSpace": r_colorSpace_v, "relativeColor": r_relativeColor_v, "relativeHead": r_relativeHead_v, "relativeTail": r_relativeTail_v, "relativeComp": r_relativeComp_v, "colorMix": r_colorMix_v, "mixMethod": r_mixMethod_v, "mixPolar": r_mixPolar_v, "mixRect": r_mixRect_v, "polarSpace": r_polarSpace_v, "rectSpace": r_rectSpace_v, "hueMethod": r_hueMethod_v, "mixItem": r_mixItem_v, "mixLead": r_mixLead_v, "mixTrail": r_mixTrail_v, "mixPercent": r_mixPercent_v, "lightDark": r_lightDark_v, "hex": r_hex_v, "colorKeyword": r_colorKeyword_v, "valueTop": r_valueTop_v, "commaList": r_commaList_v, "slashList": r_slashList_v, "spaceList": r_spaceList_v, "termSep": r_termSep_v, "valueTerm": r_valueTerm_v, "badTerm": r_badTerm_v, "varCall": r_varCall_v, "varBody": r_varBody_v, "colorCall": r_colorCall_v, "colorHead": r_colorHead_v, "call": r_call_v, "callName": r_callName_v, "numeric": r_numeric_v, "operator": r_operator_v, "identTerm": r_identTerm_v, "scalarTop": r_scalarTop_v, "scalarTerm": r_scalarTerm_v, "colorTop": r_colorTop_v, "keyframeSelector": r_keyframeSelector_v, "selectorKeyword": r_selectorKeyword_v, "selectorNamed": r_selectorNamed_v, "timingFunction": r_timingFunction_v, "timingKeyword": r_timingKeyword_v, "cubicBezier": r_cubicBezier_v, "stepsFn": r_stepsFn_v, "stepPosition": r_stepPosition_v, "linearFn": r_linearFn_v, "linearStop": r_linearStop_v, "quoted": r_quoted_v, "textGroup": r_textGroup_v, "textBody": r_textBody_v, "commaRun": r_commaRun_v, "commaItems": r_commaItems_v, "semiRun": r_semiRun_v, "semiItems": r_semiItems_v, "spaceRun": r_spaceRun_v, "spaceItems": r_spaceItems_v, "restText": r_restText_v, "comment": r_comment_v, "ruleGap": r_ruleGap_v, "preludeRun": r_preludeRun_v, "blockBody": r_blockBody_v, "openQuote": r_openQuote_v, "semiTail": r_semiTail_v, "blockTail": r_blockTail_v, "ruleBlock": r_ruleBlock_v, "openComment": r_openComment_v, "openBlock": r_openBlock_v, "openRule": r_openRule_v, "ruleList": r_ruleList_v, "atPrelude": r_atPrelude_v, "atKeyframes": r_atKeyframes_v, "atProperty": r_atProperty_v, "atFunction": r_atFunction_v, "atScope": r_atScope_v, "atStartingStyle": r_atStartingStyle_v, "atScrollTimeline": r_atScrollTimeline_v, "atViewTimeline": r_atViewTimeline_v, "atOther": r_atOther_v, "atName": r_atName_v, "atRest": r_atRest_v, "propertyName": r_propertyName_v, "syntaxText": r_syntaxText_v, "syntaxCore": r_syntaxCore_v, "syntaxPart": r_syntaxPart_v, "syntaxAlts": r_syntaxAlts_v, "scopeGroup": r_scopeGroup_v, "scopeLimit": r_scopeLimit_v, "scopePrelude": r_scopePrelude_v, "functionName": r_functionName_v, "functionParams": r_functionParams_v, "functionHead": r_functionHead_v, "colonRun": r_colonRun_v, "paramDefault": r_paramDefault_v, "functionParam": r_functionParam_v, "paramName": r_paramName_v, "paramSyntax": r_paramSyntax_v, "paramHead": r_paramHead_v, "declName": r_declName_v, "declValue": r_declValue_v, "declImportant": r_declImportant_v, "declaration": r_declaration_v, "listComma": r_listComma_v, "commaSpans": r_commaSpans_v, "argRun": r_argRun_v, "timelineArgs": r_timelineArgs_v, "scrollFn": r_scrollFn_v, "viewFn": r_viewFn_v, "timelineLead": r_timelineLead_v, "timelineLength": r_timelineLength_v }, value: () => V };
}

// docs/tranches/X/parse-that/evidence/W7-research/judge/harness/synth/rule.ts
var NEXT = { value: void 0, offset: 0, ok(v) {
  this.value = v;
  return this;
} };
var PREV = { offset: 0 };
var Rule = class _Rule {
  constructor(table, name, action) {
    this.table = table;
    this.name = name;
    this.action = action;
  }
  table;
  name;
  action;
  /** The parse function bound on this rule's first parse. */
  k = void 0;
  map(fn) {
    return new _Rule(this.table, this.name, { kind: "map", fn });
  }
  text(fn) {
    return new _Rule(this.table, this.name, { kind: "text", fn });
  }
  mapState(fn) {
    return new _Rule(this.table, this.name, {
      kind: "span",
      fn: (v, start, end) => {
        NEXT.value = v;
        NEXT.offset = end;
        PREV.offset = start;
        return fn(NEXT, PREV).value;
      }
    });
  }
};
function ruleOf(rules, name) {
  const rule = rules[name];
  if (rule === void 0) throw new Error(`BBNF grammar has no rule \`${name}\``);
  return rule;
}

// docs/tranches/X/parse-that/evidence/W7-research/judge/harness/synth/load-run.ts
var GRAMMAR_MODULES = Object.freeze({});
var made;
function compileGrammar() {
  const rules = {};
  for (const name of RULE_NAMES) rules[name] = new Rule(rules, name);
  made = void 0;
  return rules;
}
function bind(table) {
  const A = {};
  const kinds = ACTION_KINDS;
  for (const [name, r] of Object.entries(table)) {
    if (r.action === void 0) continue;
    if (kinds[name] !== r.action.kind) throw new Error(`generated parser is stale: \`${name}\` is ${r.action.kind}, module says ${kinds[name]}`);
    A[name] = r.action.fn;
  }
  for (const name of Object.keys(kinds)) if (!(name in A)) throw new Error(`generated parser is stale: no action for \`${name}\``);
  return createParser(A);
}
function run(rule, source) {
  let p = rule.k;
  if (p === void 0) {
    made ??= bind(rule.table);
    p = made.rules[rule.name];
    rule.k = p;
  }
  const end = p(source, 0);
  if (end < 0 || end !== source.length) return { ok: false, furthest: end < 0 ? 0 : end };
  return { ok: true, value: made.value(), end };
}

// src/css/bbnf/math.ts
var NONE = Object.freeze({ kind: "none" });
var unresolved = (reason) => Object.freeze({ kind: "unresolved", reason });
var CONTEXT = unresolved("context");
var KEYWORD = unresolved("keyword");
var INVALID = unresolved("invalid");
var quantity = (type, value) => Object.freeze({ kind: "quantity", type, value });
var ANGLE = {
  deg: (v) => v,
  grad: (v) => v * 0.9,
  rad: (v) => v * 180 / Math.PI,
  turn: (v) => v * 360
};
var ABSOLUTE_LENGTH = {
  px: 1,
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  q: 96 / 101.6,
  in: 96,
  pt: 4 / 3,
  pc: 16
};
var RELATIVE_LENGTH = /^(?:r?(?:em|ex|cap|ch|ic|lh)|[sld]?v(?:w|h|i|b|min|max)|cq(?:w|h|i|b|min|max))$/;
var NUMERIC = /^([+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)(.*)$/;
function tokenQuantity(token) {
  const [, digits = "", rawUnit = ""] = NUMERIC.exec(token) ?? [];
  const value = Number(digits);
  const unit = rawUnit.toLowerCase();
  if (unit === "") return quantity("number", value);
  if (unit === "%") return quantity("percentage", value);
  const angle2 = ANGLE[unit];
  if (angle2 !== void 0) return quantity("angle", angle2(value));
  const length = ABSOLUTE_LENGTH[unit];
  if (length !== void 0) return quantity("length", value * length);
  if (RELATIVE_LENGTH.test(unit)) return CONTEXT;
  return quantity(unit, value);
}
function constantQuantity(token) {
  switch (token.toLowerCase()) {
    case "e":
      return quantity("number", Math.E);
    case "pi":
      return quantity("number", Math.PI);
    case "infinity":
      return quantity("number", Infinity);
    case "-infinity":
      return quantity("number", -Infinity);
    default:
      return quantity("number", NaN);
  }
}
function firstUnresolved(operands) {
  const open = operands.filter((o) => o.kind === "unresolved");
  if (open.length === 0) return null;
  return open.find((o) => o.reason === "invalid") ?? open.find((o) => o.reason === "context") ?? KEYWORD;
}
function fold(first, steps) {
  let acc = first;
  for (const [rawOp, operand] of steps) {
    const op = rawOp.trim();
    const open = firstUnresolved([acc, operand]);
    if (open !== null) {
      acc = open;
      continue;
    }
    const a = acc;
    const b = operand;
    switch (op) {
      case "+":
      case "-":
        acc = a.type === b.type ? quantity(a.type, op === "+" ? a.value + b.value : a.value - b.value) : INVALID;
        break;
      case "*":
        acc = a.type === "number" ? quantity(b.type, a.value * b.value) : b.type === "number" ? quantity(a.type, a.value * b.value) : INVALID;
        break;
      default:
        acc = b.type === "number" ? quantity(a.type, a.value / b.value) : INVALID;
    }
  }
  return acc;
}
function comparison(name, args) {
  const open = firstUnresolved(args);
  if (open !== null) return open;
  const qs = args;
  const type = qs[0]?.type;
  if (type === void 0 || qs.some((q) => q.type !== type)) return INVALID;
  const values = qs.map((q) => q.value);
  if (values.some(Number.isNaN)) return quantity(type, NaN);
  if (name === "min") return quantity(type, Math.min(...values));
  if (name === "max") return quantity(type, Math.max(...values));
  const [lo = NaN, mid = NaN, hi = NaN] = values;
  return quantity(type, Math.max(lo, Math.min(mid, hi)));
}
function signAbs(name, arg) {
  if (arg.kind === "unresolved") return arg;
  return name.toLowerCase() === "sign" ? quantity("number", Number.isNaN(arg.value) ? NaN : Math.sign(arg.value)) : quantity(arg.type, Math.abs(arg.value));
}
var calculated = (q) => q.kind === "quantity" ? Object.freeze({ ...q, math: true }) : q;

// src/css/bbnf/mix.ts
var D50 = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585];
var mul = (M, [x, y, z]) => [
  M[0][0] * x + M[0][1] * y + M[0][2] * z,
  M[1][0] * x + M[1][1] * y + M[1][2] * z,
  M[2][0] * x + M[2][1] * y + M[2][2] * z
];
var map3 = (v, f) => [f(v[0], 0), f(v[1], 1), f(v[2], 2)];
var SRGB_TO_XYZ = [
  [506752 / 1228815, 87881 / 245763, 12673 / 70218],
  [87098 / 409605, 175762 / 245763, 12673 / 175545],
  [7918 / 409605, 87881 / 737289, 1001167 / 1053270]
];
var XYZ_TO_SRGB = [
  [12831 / 3959, -329 / 214, -1974 / 3959],
  [-851781 / 878810, 1648619 / 878810, 36519 / 878810],
  [705 / 12673, -2585 / 12673, 705 / 667]
];
var P3_TO_XYZ2 = [
  [608311 / 1250200, 189793 / 714400, 198249 / 1000160],
  [35783 / 156275, 247089 / 357200, 198249 / 2500400],
  [0 / 1, 32229 / 714400, 5220557 / 5000800]
];
var XYZ_TO_P32 = [
  [446124 / 178915, -333277 / 357830, -72051 / 178915],
  [-14852 / 17905, 63121 / 35810, 423 / 17905],
  [11844 / 330415, -50337 / 660830, 316169 / 330415]
];
var PROPHOTO_TO_XYZ_D50 = [
  [0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
  [0.2880748288194013, 0.711835234241873, 8993693872564e-17],
  [0, 0, 0.8251046025104602]
];
var XYZ_D50_TO_PROPHOTO = [
  [1.3457868816471583, -0.25557208737979464, -0.05110186497554526],
  [-0.5446307051249019, 1.5082477428451468, 0.02052744743642139],
  [0, 0, 1.2119675456389452]
];
var A98_TO_XYZ2 = [
  [573536 / 994567, 263643 / 1420810, 187206 / 994567],
  [591459 / 1989134, 6239551 / 9945670, 374412 / 4972835],
  [53769 / 1989134, 351524 / 4972835, 4929758 / 4972835]
];
var XYZ_TO_A982 = [
  [1829569 / 896150, -506331 / 896150, -308931 / 896150],
  [-851781 / 878810, 1648619 / 878810, 36519 / 878810],
  [16779 / 1248040, -147721 / 1248040, 1266979 / 1248040]
];
var REC2020_TO_XYZ = [
  [63426534 / 99577255, 20160776 / 139408157, 47086771 / 278816314],
  [26158966 / 99577255, 472592308 / 697040785, 8267143 / 139408157],
  [0 / 1, 19567812 / 697040785, 295819943 / 278816314]
];
var XYZ_TO_REC2020 = [
  [30757411 / 17917100, -6372589 / 17917100, -4539589 / 17917100],
  [-19765991 / 29648200, 47925759 / 29648200, 467509 / 29648200],
  [792561 / 44930125, -1921689 / 44930125, 42328811 / 44930125]
];
var D65_TO_D50 = [
  [1.0479297925449969, 0.022946870601609652, -0.05019226628920524],
  [0.02962780877005599, 0.9904344267538799, -0.017073799063418826],
  [-0.009243040646204504, 0.015055191490298152, 0.7518742814281371]
];
var D50_TO_D652 = [
  [0.955473421488075, -0.02309845494876471, 0.06325924320057072],
  [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
  [0.012314014864481998, -0.020507649298898964, 1.330365926242124]
];
var XYZ_TO_LMS = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
];
var LMS_TO_OKLAB2 = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
];
var LMS_TO_XYZ = [
  [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
  [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
  [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
];
var OKLAB_TO_LMS2 = [
  [1, 0.3963377773761749, 0.2158037573099136],
  [1, -0.1055613458156586, -0.0638541728258133],
  [1, -0.0894841775298119, -1.2914855480194092]
];
var signed = (f) => (v) => v < 0 ? -f(-v) : f(v);
var linSrgb = signed((a) => a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4));
var gamSrgb = signed((a) => a > 31308e-7 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : 12.92 * a);
var linProPhoto = signed((a) => a <= 16 / 512 ? a / 16 : Math.pow(a, 1.8));
var gamProPhoto = signed((a) => a >= 1 / 512 ? Math.pow(a, 1 / 1.8) : 16 * a);
var linA98 = signed((a) => Math.pow(a, 563 / 256));
var gamA98 = signed((a) => Math.pow(a, 256 / 563));
var lin2020 = signed((a) => Math.pow(a, 2.4));
var gam2020 = signed((a) => Math.pow(a, 1 / 2.4));
var LAB_E = 216 / 24389;
var LAB_K = 24389 / 27;
function xyzD50ToLab(XYZ) {
  const f = map3(XYZ, (v, i) => {
    const r = v / D50[i];
    return r > LAB_E ? Math.cbrt(r) : (LAB_K * r + 16) / 116;
  });
  return [116 * f[1] - 16, 500 * (f[0] - f[1]), 200 * (f[1] - f[2])];
}
function labToXyzD50([L, a, b]) {
  const f1 = (L + 16) / 116;
  const f0 = a / 500 + f1;
  const f2 = f1 - b / 200;
  const xyz2 = [
    Math.pow(f0, 3) > LAB_E ? Math.pow(f0, 3) : (116 * f0 - 16) / LAB_K,
    L > LAB_K * LAB_E ? Math.pow((L + 16) / 116, 3) : L / LAB_K,
    Math.pow(f2, 3) > LAB_E ? Math.pow(f2, 3) : (116 * f2 - 16) / LAB_K
  ];
  return map3(xyz2, (v, i) => v * D50[i]);
}
var xyzToOklab = (XYZ) => mul(LMS_TO_OKLAB2, map3(mul(XYZ_TO_LMS, XYZ), Math.cbrt));
var oklabToXyz = (Lab) => mul(LMS_TO_XYZ, map3(mul(OKLAB_TO_LMS2, Lab), (c) => c ** 3));
function toPolar([L, a, b], epsilon) {
  const C = Math.sqrt(a * a + b * b);
  let H = Math.atan2(b, a) * 180 / Math.PI;
  if (H < 0) H += 360;
  return [L, C, C <= epsilon ? NaN : H];
}
var fromPolar = ([L, C, H]) => [L, C * Math.cos(H * Math.PI / 180), C * Math.sin(H * Math.PI / 180)];
function hslToRgb([hue, sat, light]) {
  const f = (n) => {
    const k = (n + hue / 30) % 12;
    const a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0), f(8), f(4)];
}
function rgbToHue(red, green, blue) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const d = max - min;
  let hue = NaN;
  if (d !== 0) {
    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / d + 2;
        break;
      default:
        hue = (red - green) / d + 4;
    }
    hue *= 60;
  }
  if (hue >= 360) hue -= 360;
  return hue;
}
function rgbToHsl([red, green, blue]) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let hue = rgbToHue(red, green, blue);
  let sat = 0;
  const light = (min + max) / 2;
  if (max - min !== 0) sat = light === 0 || light === 1 ? 0 : (max - light) / Math.min(light, 1 - light);
  if (sat < 0) {
    hue += 180;
    sat = Math.abs(sat);
  }
  if (hue >= 360) hue -= 360;
  if (sat <= 1 / 1e5) hue = NaN;
  return [hue, sat, light];
}
function hwbToRgb([hue, white, black]) {
  if (white + black >= 1) {
    const gray = white / (white + black);
    return [gray, gray, gray];
  }
  return map3(hslToRgb([hue, 1, 0.5]), (c) => c * (1 - white - black) + white);
}
function rgbToHwb([red, green, blue]) {
  const hue = rgbToHue(red, green, blue);
  const white = Math.min(red, green, blue);
  const black = 1 - Math.max(red, green, blue);
  return [white + black >= 1 - 1 / 1e5 ? NaN : hue, white, black];
}
var RGB_CATS = ["R", "G", "B"];
var rgbSpace = (toLinearXyz, fromXyzLinear, lin, gam) => ({
  cats: RGB_CATS,
  toXyz: (c) => toLinearXyz(lin ? map3(c, lin) : c),
  fromXyz: (x) => gam ? map3(fromXyzLinear(x), gam) : fromXyzLinear(x)
});
var copy = (c) => [c[0], c[1], c[2]];
var srgb = {
  ...rgbSpace((c) => mul(SRGB_TO_XYZ, c), (x) => mul(XYZ_TO_SRGB, x), linSrgb, gamSrgb),
  toSrgb: copy,
  fromSrgb: copy
};
var lab2 = {
  cats: ["L", "A", "O"],
  toXyz: (c) => mul(D50_TO_D652, labToXyzD50(c)),
  fromXyz: (x) => xyzD50ToLab(mul(D65_TO_D50, x))
};
var oklab2 = { cats: ["L", "A", "O"], toXyz: oklabToXyz, fromXyz: xyzToOklab };
var SPACES = Object.freeze({
  srgb,
  "srgb-linear": rgbSpace((c) => mul(SRGB_TO_XYZ, c), (x) => mul(XYZ_TO_SRGB, x)),
  "display-p3": rgbSpace((c) => mul(P3_TO_XYZ2, c), (x) => mul(XYZ_TO_P32, x), linSrgb, gamSrgb),
  "display-p3-linear": rgbSpace((c) => mul(P3_TO_XYZ2, c), (x) => mul(XYZ_TO_P32, x)),
  "a98-rgb": rgbSpace((c) => mul(A98_TO_XYZ2, c), (x) => mul(XYZ_TO_A982, x), linA98, gamA98),
  "prophoto-rgb": rgbSpace(
    (c) => mul(D50_TO_D652, mul(PROPHOTO_TO_XYZ_D50, c)),
    (x) => mul(XYZ_D50_TO_PROPHOTO, mul(D65_TO_D50, x)),
    linProPhoto,
    gamProPhoto
  ),
  rec2020: rgbSpace((c) => mul(REC2020_TO_XYZ, c), (x) => mul(XYZ_TO_REC2020, x), lin2020, gam2020),
  lab: lab2,
  oklab: oklab2,
  "xyz-d65": { cats: RGB_CATS, toXyz: copy, fromXyz: copy },
  "xyz-d50": { cats: RGB_CATS, toXyz: (c) => mul(D50_TO_D652, c), fromXyz: (x) => mul(D65_TO_D50, x) },
  hsl: {
    cats: ["H", "C", "L"],
    hue: 0,
    chroma: 1,
    epsilon: 1 / 1e5,
    toXyz: (c) => srgb.toXyz(hslToRgb(c)),
    fromXyz: (x) => rgbToHsl(srgb.fromXyz(x)),
    toSrgb: hslToRgb,
    fromSrgb: rgbToHsl
  },
  hwb: {
    cats: ["H", null, null],
    hue: 0,
    toXyz: (c) => srgb.toXyz(hwbToRgb(c)),
    fromXyz: (x) => rgbToHwb(srgb.fromXyz(x)),
    toSrgb: hwbToRgb,
    fromSrgb: rgbToHwb
  },
  lch: {
    cats: ["L", "C", "H"],
    hue: 2,
    chroma: 1,
    epsilon: 15e-4,
    toXyz: (c) => lab2.toXyz(fromPolar(c)),
    fromXyz: (x) => toPolar(lab2.fromXyz(x), 15e-4)
  },
  oklch: {
    cats: ["L", "C", "H"],
    hue: 2,
    chroma: 1,
    epsilon: 4e-6,
    toXyz: (c) => oklab2.toXyz(fromPolar(c)),
    fromXyz: (x) => toPolar(oklab2.fromXyz(x), 4e-6)
  }
});
var displayP3LinearToXyz = (c) => mul(P3_TO_XYZ2, c);
var mixSpaceOf = (name) => name === "xyz" ? "xyz-d65" : name;
function fromCssColor(color) {
  const v = (x) => x === "none" ? null : x;
  const [a, b, c] = color.channels;
  const alpha = v(color.alpha);
  if (color.space === "rgb") {
    const s = (x) => x === "none" ? null : x / 255;
    return { space: "srgb", ch: [s(a), s(b), s(c)], alpha };
  }
  return { space: mixSpaceOf(color.space), ch: [v(a), v(b), v(c)], alpha };
}
function toInterpolationSpace(color, space) {
  if (color.space === space) return { ch: [...color.ch], alpha: color.alpha };
  const src = SPACES[color.space];
  const dst = SPACES[space];
  const INDEX = [0, 1, 2];
  const carried = /* @__PURE__ */ new Set();
  INDEX.forEach((i) => {
    const cat = src.cats[i];
    if (color.ch[i] === null && cat !== null && dst.cats.includes(cat)) carried.add(dst.cats.indexOf(cat));
  });
  const srcRest = INDEX.filter((i) => src.cats[i] === null || !dst.cats.includes(src.cats[i]));
  const dstRest = INDEX.filter((j) => dst.cats[j] === null || !src.cats.includes(dst.cats[j]));
  if (srcRest.length > 0 && srcRest.every((i) => color.ch[i] === null)) dstRest.forEach((j) => carried.add(j));
  const zeros = [color.ch[0] ?? 0, color.ch[1] ?? 0, color.ch[2] ?? 0];
  const converted = src.toSrgb && dst.fromSrgb ? dst.fromSrgb(src.toSrgb(zeros)) : dst.fromXyz(src.toXyz(zeros));
  const present = (x) => Number.isNaN(x) ? null : x;
  const ch = [present(converted[0]), present(converted[1]), present(converted[2])];
  if (dst.hue !== void 0 && ch[dst.hue] === null && dst.chroma !== void 0 && dst.epsilon !== void 0) {
    const c = ch[dst.chroma];
    if (c !== null && c > 0 && c <= dst.epsilon) ch[dst.chroma] = 0;
  }
  for (const j of carried) ch[j] = null;
  return { ch, alpha: color.alpha };
}
var mod360 = (h) => (h % 360 + 360) % 360;
function fixHues(h1, h2, method) {
  const d = h2 - h1;
  switch (method) {
    case "longer":
      if (d > 0 && d < 180) h1 += 360;
      else if (d > -180 && d <= 0) h2 += 360;
      break;
    case "increasing":
      if (d < 0) h2 += 360;
      break;
    case "decreasing":
      if (d > 0) h1 += 360;
      break;
    default:
      if (d > 180) h1 += 360;
      else if (d < -180) h2 += 360;
  }
  return [h1, h2];
}
function interpolate(a, b, t, space, method) {
  const hue = SPACES[space].hue;
  const fill = (x, y) => [x[0] ?? y[0], x[1] ?? y[1], x[2] ?? y[2]];
  const A = fill(a.ch, b.ch);
  const B = fill(b.ch, a.ch);
  const aAlpha = a.alpha ?? b.alpha;
  const bAlpha = b.alpha ?? a.alpha;
  if (hue !== void 0) {
    const h1 = A[hue];
    const h2 = B[hue];
    if (h1 !== null && h2 !== null) [A[hue], B[hue]] = fixHues(mod360(h1), mod360(h2), method);
  }
  const premultiply = (ch2, alpha2) => alpha2 === null ? ch2 : ch2.map((x, i) => x === null || i === hue ? x : x * alpha2);
  const P = premultiply(A, aAlpha);
  const Q = premultiply(B, bAlpha);
  const lerp = (i) => {
    const x = P[i];
    const y = Q[i];
    return x === null || y === null ? null : x + (y - x) * t;
  };
  const ch = [lerp(0), lerp(1), lerp(2)];
  const alpha = aAlpha === null || bAlpha === null ? null : aAlpha + (bAlpha - aAlpha) * t;
  const out = alpha === null || alpha === 0 ? ch : ch.map((x, i) => x === null || i === hue ? x : x / alpha);
  if (hue !== void 0) {
    const h = out[hue];
    if (h !== null) out[hue] = mod360(h);
  }
  return { ch: out, alpha };
}
function normalizeMixPercentages(percentages) {
  const given = percentages.filter((p) => p !== void 0);
  const specifiedSum = given.length === 0 ? 0 : Math.min(100, given.reduce((s, p) => s + p, 0));
  const omitted = percentages.length - given.length;
  const weights = percentages.map((p) => p === void 0 ? (100 - specifiedSum) / omitted : p);
  const total = weights.reduce((s, p) => s + p, 0);
  const scaled = total > 0 ? weights.map((p) => p * 100 / total) : weights;
  return { weights: scaled, leftover: total < 100 ? 100 - total : 0 };
}
function toCssColor({ ch, alpha }, space) {
  const none = (x) => x === null ? "none" : x;
  const zero = [ch[0] ?? 0, ch[1] ?? 0, ch[2] ?? 0];
  const linear = (M) => ({ space: "xyz", channels: mul(M, zero), alpha: none(alpha) });
  const channels = [none(ch[0]), none(ch[1]), none(ch[2])];
  switch (space) {
    case "srgb": {
      const s = (x) => x === null ? "none" : x * 255;
      return { space: "rgb", channels: [s(ch[0]), s(ch[1]), s(ch[2])], alpha: none(alpha) };
    }
    case "xyz-d65":
      return { space: "xyz", channels, alpha: none(alpha) };
    case "xyz-d50":
      return linear(D50_TO_D652);
    case "display-p3-linear":
      return linear(P3_TO_XYZ2);
    default:
      return { space, channels, alpha: none(alpha) };
  }
}
var finite = (x) => x === "none" || Number.isFinite(x);
function resolveColorMix(mix) {
  const space = mixSpaceOf(mix.space ?? "oklab");
  const method = mix.hue ?? "shorter";
  const colors = mix.items.map((item) => toInterpolationSpace(fromCssColor(item.color), space));
  const { weights, leftover } = normalizeMixPercentages(mix.items.map((item) => item.percentage));
  const [first, ...rest] = colors;
  if (first === void 0) return null;
  let acc = first;
  let accWeight = weights[0] ?? 0;
  rest.forEach((color, k) => {
    const weight = weights[k + 1] ?? 0;
    const combined = accWeight + weight;
    acc = interpolate(acc, color, combined > 0 ? weight / combined : 0.5, space, method);
    accWeight = combined;
  });
  const alphaMult = 1 - leftover / 100;
  const result = toCssColor({ ch: acc.ch, alpha: acc.alpha === null ? null : acc.alpha * alphaMult }, space);
  return result.channels.every(finite) && finite(result.alpha) ? result : null;
}

// src/css/bbnf/color.ts
var CONTEXT_NODE = Object.freeze({ kind: "context" });
var invalid = (expected) => Object.freeze({ kind: "invalid", expected });
var colorNode = (color) => Object.freeze({ kind: "color", color });
var CONTEXT_KEYWORDS = /* @__PURE__ */ new Set([
  "currentcolor",
  "accentcolor",
  "accentcolortext",
  "activetext",
  "buttonborder",
  "buttonface",
  "buttontext",
  "canvas",
  "canvastext",
  "field",
  "fieldtext",
  "graytext",
  "highlight",
  "highlighttext",
  "linktext",
  "mark",
  "marktext",
  "selecteditem",
  "selecteditemtext",
  "visitedtext"
]);
function readChannel(component, reading) {
  if (component.kind === "none") return "none";
  if (component.kind === "unresolved") {
    return component.reason === "context" ? CONTEXT_NODE : invalid(component.reason === "keyword" ? "channel keyword outside a relative colour" : "calculation type");
  }
  let value;
  const type = component.type === "number" && reading.numberIsPercent === true ? "percentage" : component.type;
  if (type === "percentage" && reading.percent !== void 0) value = component.value * reading.percent / 100;
  else if (type === "number" && reading.number !== void 0) value = component.value * reading.number;
  else if (type === "angle" && reading.angle === true) value = component.value;
  else return invalid(reading.angle === true ? "<hue>" : "<number> or <percentage>");
  if (reading.angle === true) return Number.isFinite(value) ? value : 0;
  const lo = reading.min ?? -Infinity;
  const hi = reading.max ?? Infinity;
  if (Number.isNaN(value)) return Number.isFinite(lo) ? lo : 0;
  return Math.min(hi, Math.max(lo, value));
}
var RGB = { percent: 255, number: 1, min: 0, max: 255 };
var RGB_PCT = { percent: 255, min: 0, max: 255 };
var RGB_NUM = { number: 1, min: 0, max: 255 };
var UNIT = { percent: 1, numberIsPercent: true, min: 0, max: 1 };
var UNIT_PCT = { percent: 1, min: 0, max: 1 };
var HUE = { number: 1, angle: true };
var ALPHA = { percent: 1, number: 1, min: 0, max: 1 };
var LAB_L = { percent: 100, number: 1, min: 0, max: 100 };
var LAB_AB = { percent: 125, number: 1 };
var LCH_C = { percent: 150, number: 1, min: 0 };
var OK_L = { percent: 1, number: 1, min: 0, max: 1 };
var OK_AB = { percent: 0.4, number: 1 };
var OK_C = { percent: 0.4, number: 1, min: 0 };
var COLOR_FN = { percent: 1, number: 1 };
function build(parts, readings, alphaReading, factory2) {
  const [a, b, c, alpha] = parts;
  if (a === void 0 || b === void 0 || c === void 0) return invalid("three components");
  const values = [
    readChannel(a, readings[0]),
    readChannel(b, readings[1]),
    readChannel(c, readings[2]),
    alpha === void 0 ? 1 : readChannel(alpha, alphaReading)
  ];
  const refused2 = values.find((v) => typeof v === "object");
  if (refused2 !== void 0) return refused2;
  const [x, y, z, w] = values;
  const made2 = factory2(x, y, z, w);
  return made2.ok ? colorNode(made2.value) : invalid(made2.error.code);
}
var LEGACY_ALPHA = ALPHA;
function hexColor(token) {
  const digits = token.slice(1);
  const full = digits.length <= 4 ? [...digits].map((d) => d + d).join("") : digits;
  const byte = (i) => parseInt(full.slice(i, i + 2), 16);
  const made2 = rgb(byte(0), byte(2), byte(4), full.length === 8 ? byte(6) / 255 : 1);
  return made2.ok ? colorNode(made2.value) : invalid(made2.error.code);
}
function keywordColor(token) {
  const key = token.toLowerCase();
  if (key === "transparent") return hexColor("#00000000");
  if (CONTEXT_KEYWORDS.has(key)) return CONTEXT_NODE;
  const named = NAMED_COLORS[key];
  return typeof named === "string" ? hexColor(named) : invalid("<named-color>");
}
function predefined(space, parts) {
  const R3 = [COLOR_FN, COLOR_FN, COLOR_FN];
  const scaled = (k) => (x) => x === "none" ? x : x * k;
  const concrete = (convert) => (a, b, c, alpha) => a === "none" || b === "none" || c === "none" ? { ok: false, error: { code: "color_missing_channel" } } : xyz(...convert([a, b, c]), alpha);
  switch (space.toLowerCase()) {
    case "srgb":
      return build(parts, R3, ALPHA, (a, b, c, alpha) => rgb(scaled(255)(a), scaled(255)(b), scaled(255)(c), alpha));
    case "srgb-linear":
      return build(parts, R3, ALPHA, linearSrgb);
    case "display-p3":
      return build(parts, R3, ALPHA, displayP3);
    case "a98-rgb":
      return build(parts, R3, ALPHA, a98Rgb);
    case "prophoto-rgb":
      return build(parts, R3, ALPHA, prophotoRgb);
    case "rec2020":
      return build(parts, R3, ALPHA, rec2020);
    case "xyz":
    case "xyz-d65":
      return build(parts, R3, ALPHA, xyz);
    //  The two spaces `CssColorSpace` has no member for are written as the exact `xyz` they
    //  name; a `none` there has no `xyz` channel to stay missing in, so it is refused
    //  ("concrete xyz-d50", the contract value.js already carries for xyz-d50).
    case "xyz-d50":
      return build(parts, R3, ALPHA, concrete(adaptXyzD50ToD65));
    default:
      return build(parts, R3, ALPHA, concrete(([a, b, c]) => displayP3LinearToXyz([a, b, c])));
  }
}
function collect(value, kinds) {
  const out = [];
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v !== null && typeof v === "object" && kinds.includes(v.kind)) out.push(v);
  };
  walk(value);
  return out;
}
var COMPONENT_KINDS = ["quantity", "unresolved", "none"];
var components = (value) => collect(value, COMPONENT_KINDS);
var NODE_KINDS = ["color", "context", "invalid", "unresolved"];
function asColorNode(value) {
  const [node] = collect(value, NODE_KINDS);
  if (node === void 0) return invalid("<color>");
  if (node.kind === "unresolved") return node.reason === "context" ? CONTEXT_NODE : invalid("<color>");
  if (node.kind === "quantity") return invalid("<color>");
  return node;
}
function firstRefusal(nodes) {
  return nodes.find((n) => n.kind === "invalid") ?? nodes.find((n) => n.kind === "context") ?? null;
}
function colorMix(value) {
  const [method] = collect(value, ["method"]);
  const items = collect(value, ["mixItem"]);
  const refused2 = firstRefusal(items.map((item) => item.color));
  if (refused2 !== null) return refused2;
  const mixItems = [];
  for (const item of items) {
    const color = item.color.color;
    if (item.percent === void 0) {
      mixItems.push({ color });
      continue;
    }
    const q = item.percent;
    if (q.kind === "unresolved") return q.reason === "context" ? CONTEXT_NODE : invalid("<percentage [0,100]>");
    if (q.type !== "percentage") return invalid("<percentage [0,100]>");
    if (q.math !== true && (q.value < 0 || q.value > 100)) return invalid("<percentage [0,100]>");
    const p = Number.isNaN(q.value) ? 0 : Math.min(100, Math.max(0, q.value));
    mixItems.push({ color, percentage: p });
  }
  const resolved = resolveColorMix({
    ...method === void 0 ? {} : { space: method.space.toLowerCase() },
    ...method?.hue === void 0 ? {} : { hue: method.hue },
    items: mixItems
  });
  return resolved === null ? invalid("<finite-number>") : colorNode(resolved);
}
var hueMethodOf = (token) => token.toLowerCase().split(/\s+/)[0];
function attachColorActions(rules) {
  const on = (name, action) => {
    rules[name] = ruleOf(rules, name).map(action);
  };
  for (const token of ["number", "percentage", "angle", "dimension"]) on(token, tokenQuantity);
  on("none", () => NONE);
  on("calcConstant", constantQuantity);
  on("calcKeyword", () => KEYWORD);
  on("varFn", () => CONTEXT);
  on("calc", calculated);
  on("calcSum", ([first, steps]) => fold(first, steps));
  on("calcProduct", ([first, steps]) => fold(first, steps));
  on("minMax", ([name, first, rest]) => calculated(comparison(name.toLowerCase() === "min" ? "min" : "max", [first, ...rest])));
  on("clampFn", (args) => calculated(comparison("clamp", args)));
  on("signAbs", ([name, arg]) => calculated(signAbs(name, arg)));
  on("rgbModern", (v) => build(components(v), [RGB, RGB, RGB], ALPHA, rgb));
  on("rgbLegacyPct", (v) => build(components(v), [RGB_PCT, RGB_PCT, RGB_PCT], LEGACY_ALPHA, rgb));
  on("rgbLegacyNum", (v) => build(components(v), [RGB_NUM, RGB_NUM, RGB_NUM], LEGACY_ALPHA, rgb));
  on("hslModern", (v) => build(components(v), [HUE, UNIT, UNIT], ALPHA, hsl));
  on("hslLegacy", (v) => build(components(v), [HUE, UNIT_PCT, UNIT_PCT], LEGACY_ALPHA, hsl));
  on("hwbFn", (v) => build(components(v), [HUE, UNIT, UNIT], ALPHA, hwb));
  on("labFn", (v) => build(components(v), [LAB_L, LAB_AB, LAB_AB], ALPHA, lab));
  on("lchFn", (v) => build(components(v), [LAB_L, LCH_C, HUE], ALPHA, lch));
  on("oklabFn", (v) => build(components(v), [OK_L, OK_AB, OK_AB], ALPHA, oklab));
  on("oklchFn", (v) => build(components(v), [OK_L, OK_C, HUE], ALPHA, oklch));
  on("colorFn", ([space, ...rest]) => predefined(space, components(rest)));
  on("hex", hexColor);
  on("colorKeyword", keywordColor);
  on("relativeColor", (v) => {
    const origin = collect(v, ["color", "context", "invalid"]);
    return origin.find((n) => n.kind === "invalid") ?? CONTEXT_NODE;
  });
  on("lightDark", (v) => {
    const arms = collect(v, NODE_KINDS).map(asColorNode);
    return arms.find((n) => n.kind === "invalid") ?? CONTEXT_NODE;
  });
  on("mixPolar", (v) => {
    const [space, hue] = Array.isArray(v) ? v : [v];
    return Object.freeze({ kind: "method", space, ...hue === void 0 ? {} : { hue: hueMethodOf(hue) } });
  });
  on("mixRect", (space) => Object.freeze({ kind: "method", space }));
  on("mixLead", ([percent, color]) => Object.freeze({ kind: "mixItem", color: asColorNode(color), percent }));
  on("mixTrail", (v) => {
    const percent = Array.isArray(v) && v.length > 1 ? v[v.length - 1] : void 0;
    const color = asColorNode(Array.isArray(v) ? v[0] : v);
    return Object.freeze({ kind: "mixItem", color, ...percent === void 0 ? {} : { percent } });
  });
  on("colorMix", colorMix);
}

// docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/shim/stylesheet-positional.ts
function attachStylesheetActions(rules) {
  const on = (name, action) => {
    rules[name] = ruleOf(rules, name).map(action);
  };
  const onText = (name, action) => {
    rules[name] = ruleOf(rules, name).text(action);
  };
  const spanned = (name, action) => {
    rules[name] = ruleOf(rules, name).mapState((next, prev) => next.ok(action(next.value, prev.offset, next.offset)));
  };
  const trim = (t) => t.trim();
  const same = (t) => t;
  const inner = (t) => t.slice(1, -1);
  const list = (first, rest, at2) => [first, ...rest.map((pair) => pair[at2])];
  for (const run2 of ["commaRun", "semiRun", "spaceRun", "argRun", "syntaxPart"]) onText(run2, trim);
  on("commaItems", ([first, rest]) => list(first, rest, 1).filter(Boolean));
  on("semiItems", ([first, rest]) => list(first, rest, 1).filter(Boolean));
  on("spaceItems", ([, rest]) => rest.map((pair) => pair[0]).filter(Boolean));
  on("syntaxAlts", ([first, rest]) => list(first, rest, 1));
  on("timelineArgs", ([, rest]) => rest.map((pair) => pair[0]));
  spanned("listComma", (_, start) => ({ comma: start }));
  on("commaSpans", ([first, rest]) => {
    const parts = [{ item: first }];
    for (const [comma, item] of rest) parts.push(comma, { item });
    return parts;
  });
  onText("restText", same);
  onText("preludeRun", same);
  on("semiTail", () => null);
  onText("blockTail", inner);
  on("ruleBlock", ([prelude, body]) => ({ prelude: prelude.trim(), body }));
  spanned("openComment", (_, start) => ({ expected: "closing comment", start }));
  spanned("openBlock", ([prelude], start) => ({ expected: "closing brace", start: start + prelude.length }));
  spanned("openRule", (_, start) => ({ expected: "rule", start }));
  on("ruleList", ([, rest, fault]) => ({
    blocks: rest.map((pair) => pair[0]),
    fault
  }));
  const at = (kind) => ([, rest]) => ({ at: kind, name: kind, rest: rest.trim() });
  on("atKeyframes", at("keyframes"));
  on("atProperty", at("property"));
  on("atFunction", at("function"));
  on("atScope", at("scope"));
  on("atStartingStyle", () => ({ at: "starting-style", name: "starting-style", rest: "" }));
  on("atScrollTimeline", at("scroll-timeline"));
  on("atViewTimeline", at("view-timeline"));
  on("atName", (v) => v.slice(1));
  on("atOther", ([name, other]) => ({ at: "other", name, rest: other ?? "" }));
  onText("syntaxCore", same);
  on("syntaxText", ([, core]) => core ?? "");
  onText("scopeGroup", inner);
  on("scopePrelude", ([, part]) => ({ root: part?.[0], limit: part?.[1] }));
  onText("functionName", same);
  onText("functionParams", same);
  on("functionHead", ([name, params]) => ({ name, params }));
  onText("colonRun", trim);
  on("paramDefault", (rest) => rest.trim());
  on("functionParam", ([head, def]) => ({ head, default: def }));
  onText("paramName", same);
  onText("paramSyntax", trim);
  on("paramHead", ([name, syntax]) => ({ name, syntax }));
  on("declName", (v) => v.trim().toLowerCase());
  onText("declValue", trim);
  on("declImportant", () => true);
  on("declaration", ([name, , value, important]) => ({ name, value, important: important === true }));
}

// src/css/bbnf/value.ts
var refused = (code, expected) => Object.freeze({ kind: "refused", code, expected });
function colorScalar(node) {
  switch (node.kind) {
    case "color":
      return { kind: "scalar", payload: { type: "color", value: node.color } };
    case "context":
      return refused("color_context_required", "context-free color");
    default:
      return refused("css_syntax", node.expected);
  }
}
var keyword = (value) => ({ kind: "scalar", payload: { type: "keyword", value } });
function identScalar(token, color) {
  const key = token.toLowerCase();
  return key === "transparent" || typeof NAMED_COLORS[key] === "string" ? colorScalar(color(token)) : keyword(token);
}
var NUMERIC2 = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)(.*)$/;
function numericScalar(token) {
  const [, digits = "", unit = ""] = NUMERIC2.exec(token) ?? [];
  const value = Number(digits);
  return Number.isFinite(value) ? { kind: "scalar", payload: { type: "number", value, unit } } : refused("css_syntax", "scalar");
}
var isRefused = (v) => typeof v === "object" && v !== null && v.kind === "refused";
function listOf(separator) {
  return ([first, rest]) => {
    const items = [first, ...rest];
    const refusal2 = items.find(isRefused);
    if (refusal2 !== void 0) return refusal2;
    return items.length === 1 ? first : { kind: "list", separator, items };
  };
}
var ZERO_ARGUMENT = /^(?:sibling-index|sibling-count)$/i;
var MAY_BE_EMPTY = /^(?:--.*|scroll|view)$/i;
function callValue([name, body]) {
  if (ZERO_ARGUMENT.test(name)) return body === void 0 ? { kind: "call", name, args: [] } : refused("css_syntax", "zero-argument function");
  if (body === void 0) return MAY_BE_EMPTY.test(name) ? { kind: "call", name, args: [] } : refused("css_syntax", "function argument");
  if (isRefused(body)) return body;
  const args = body.kind === "list" && body.separator === "comma" ? body.items : [body];
  return { kind: "call", name, args };
}
var selectorRange = refused("keyframe_selector_invalid", "0%..100%");
function keyframeSelector(value) {
  if (typeof value === "object" && value !== null && value.kind === "quantity") {
    const q = value;
    return q.value >= 0 && q.value <= 100 ? { kind: "percent", value: q.value / 100 } : selectorRange;
  }
  return value;
}
function namedSelector(v) {
  const [rawName, offset] = Array.isArray(v) ? v : [v];
  const name = rawName.toLowerCase();
  if (offset === void 0) return { kind: "named", name };
  if (offset.kind !== "quantity") return selectorRange;
  const at = offset.value / 100;
  return at >= 0 && at <= 1 ? { kind: "named", name, offset: at } : selectorRange;
}
var timingRefused = refused("css_syntax", "timing function");
var numberOf = (q) => q?.kind === "quantity" && q.type === "number" ? q.value : null;
var JUMP_ALIASES = /* @__PURE__ */ new Map([
  ["start", "jump-start"],
  ["end", "jump-end"],
  ["jump-start", "jump-start"],
  ["jump-end", "jump-end"],
  ["jump-none", "jump-none"],
  ["jump-both", "jump-both"]
]);
function timingKeyword(token) {
  const name = token.toLowerCase();
  if (name === "step-start") return { kind: "steps", count: 1, position: "jump-start" };
  if (name === "step-end") return { kind: "steps", count: 1, position: "jump-end" };
  return { kind: "keyword", name };
}
function cubicBezier(args) {
  const [x1, y1, x2, y2] = args.map(numberOf);
  if (x1 == null || y1 == null || x2 == null || y2 == null) return timingRefused;
  return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1 ? { kind: "cubic-bezier", x1, y1, x2, y2 } : timingRefused;
}
function stepsFn(v) {
  const [countQ, rawPosition] = Array.isArray(v) ? v : [v];
  const count = numberOf(countQ);
  const position = JUMP_ALIASES.get((rawPosition ?? "jump-end").toLowerCase());
  return count !== null && Number.isInteger(count) && count > 0 && position !== void 0 && !(position === "jump-none" && count < 2) ? { kind: "steps", count, position } : timingRefused;
}
function linearStop(v) {
  const [outputQ, ...inputs] = Array.isArray(v) ? v : [v];
  const output = numberOf(outputQ);
  if (output === null) return timingRefused;
  const positions = inputs.map((q) => q.kind === "quantity" && q.type === "percentage" ? q.value / 100 : NaN);
  return { output, input: positions };
}
function linearFn([first, rest]) {
  const stops = [first, ...rest];
  if (stops.some(isRefused)) return timingRefused;
  return stops.length >= 2 ? { kind: "linear-function", stops } : timingRefused;
}
function attachValueActions(rules, color) {
  const on = (name, action) => {
    rules[name] = ruleOf(rules, name).map(action);
  };
  on("numeric", numericScalar);
  on("string", keyword);
  on("operator", keyword);
  on("identTerm", (token) => identScalar(token, color));
  on("colorCall", colorScalar);
  on("scalarTerm", (v) => v.kind === "color" || v.kind === "context" || v.kind === "invalid" ? colorScalar(v) : v);
  on("call", callValue);
  on("varCall", callValue);
  rules.badTerm = ruleOf(rules, "badTerm").mapState((next, prev) => next.ok(Object.freeze({ ...refused("css_syntax", "scalar"), span: Object.freeze({ start: prev.offset, end: next.offset }) })));
  on("spaceList", listOf("space"));
  on("slashList", listOf("slash"));
  on("commaList", listOf("comma"));
  on("selectorKeyword", (token) => ({ kind: "percent", value: token.toLowerCase() === "from" ? 0 : 1 }));
  on("selectorNamed", namedSelector);
  on("timingKeyword", timingKeyword);
  on("cubicBezier", cubicBezier);
  on("stepsFn", stepsFn);
  on("linearStop", linearStop);
  on("linearFn", linearFn);
}

// src/css/bbnf/index.ts
var compiled;
function grammar() {
  if (compiled === void 0) {
    const rules = compileGrammar();
    attachColorActions(rules);
    attachValueActions(rules, keywordColor);
    attachStylesheetActions(rules);
    compiled = rules;
  }
  return compiled;
}
var parseRule = (name, source) => run(ruleOf(grammar(), name), source);
var refusal = (source, node) => node.span === void 0 ? failure(source, node.code, [node.expected]) : failure(source, node.code, [node.expected], node.span.start, node.span.end);
function colorResult(source, node) {
  switch (node.kind) {
    case "color":
      return success(node.color);
    case "context":
      return failure(source, "color_context_required", ["context-free color"]);
    default:
      return failure(source, "css_syntax", [node.expected]);
  }
}
function parseCssColor(source) {
  const parsed = parseRule("colorTop", source);
  return parsed.ok ? colorResult(source, asColorNode(parsed.value)) : failure(source, "css_syntax", ["color"]);
}
function valueResult(source, node) {
  return node.kind === "refused" ? refusal(source, node) : success(node);
}
function parseCssValue(source) {
  const parsed = parseRule("valueTop", source);
  return parsed.ok ? valueResult(source, parsed.value) : failure(source, "css_syntax", ["scalar"]);
}
function parseCssValues(source) {
  const parsed = parseCssValue(source);
  if (!parsed.ok) return parsed;
  return parsed.value.kind === "list" ? success(parsed.value) : success({ kind: "list", separator: "space", items: [parsed.value] });
}
function parseCssScalar(source) {
  const parsed = parseRule("scalarTop", source);
  return parsed.ok ? valueResult(source, parsed.value) : failure(source, "css_syntax", ["scalar"]);
}
function parseKeyframeSelector(source) {
  const parsed = parseRule("keyframeSelector", source);
  if (!parsed.ok) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
  const node = keyframeSelector(parsed.value);
  return node.kind === "refused" ? refusal(source, node) : success(node);
}
function parseTimingFunction(source) {
  const parsed = parseRule("timingFunction", source);
  if (!parsed.ok) return failure(source, "css_syntax", ["timing function"]);
  const node = parsed.value;
  return node.kind === "refused" ? refusal(source, node) : success(node);
}
var LISTS = { ",": "commaItems", ";": "semiItems", space: "spaceItems" };
function splitTopLevel(source, separator) {
  const parsed = run(ruleOf(grammar(), LISTS[separator]), source);
  return parsed.ok ? parsed.value : null;
}

// src/css/bbnf/sheet.ts
var sheet_exports = {};
__export(sheet_exports, {
  atPrelude: () => atPrelude,
  declaration: () => declaration,
  emptyListComma: () => emptyListComma,
  functionHead: () => functionHead,
  functionParam: () => functionParam,
  isDashedIdent: () => isDashedIdent,
  isPropertyName: () => isPropertyName,
  isTimelineLength: () => isTimelineLength,
  opensTimeline: () => opensTimeline,
  paramHead: () => paramHead,
  ruleList: () => ruleList,
  scopePrelude: () => scopePrelude,
  syntaxComponents: () => syntaxComponents,
  syntaxText: () => syntaxText,
  timelineArgs: () => timelineArgs
});
var read = (name, source) => {
  const parsed = run(ruleOf(grammar(), name), source);
  return parsed.ok ? parsed.value : null;
};
var matches = (name, source) => run(ruleOf(grammar(), name), source).ok;
function ruleList(source) {
  const parsed = read("ruleList", source);
  if (parsed === null) throw new Error("stylesheet.bbnf `ruleList` refused an input it must accept");
  return parsed;
}
var atPrelude = (prelude) => read("atPrelude", prelude);
var isPropertyName = (name) => matches("propertyName", name);
function syntaxText(serialized) {
  const parsed = read("syntaxText", serialized);
  if (parsed === null) throw new Error("stylesheet.bbnf `syntaxText` refused an input it must accept");
  return parsed;
}
var syntaxComponents = (syntax) => read("syntaxAlts", syntax);
var scopePrelude = (text) => read("scopePrelude", text);
var functionHead = (prelude) => read("functionHead", prelude);
var functionParam = (row) => read("functionParam", row);
var paramHead = (head) => read("paramHead", head);
var declaration = (row) => read("declaration", row);
function emptyListComma(source) {
  const parts = read("commaSpans", source);
  if (!parts) return void 0;
  let item = "";
  let last;
  for (const part of parts) {
    if ("item" in part) {
      item = part.item;
      continue;
    }
    const comma = part.comma;
    if (!item) return comma;
    last = comma;
    item = "";
  }
  return last !== void 0 && !item ? last : void 0;
}
var timelineArgs = (kind, source) => read(kind === "scroll" ? "scrollFn" : "viewFn", source);
var opensTimeline = (token) => matches("timelineLead", token);
var isTimelineLength = (token) => matches("timelineLength", token);
var isDashedIdent = (token) => matches("dashedIdent", token);

// src/css/syntax.ts
var RESERVED_IDENTS = /* @__PURE__ */ new Set(["initial", "inherit", "unset", "revert", "revert-layer", "default"]);
var SYNTAX_COMPONENTS = /* @__PURE__ */ new Set([
  "<angle>",
  "<color>",
  "<custom-ident>",
  "<flex>",
  "<integer>",
  "<length>",
  "<length-percentage>",
  "<number>",
  "<percentage>",
  "<resolution>",
  "<time>",
  "<transform-function>",
  "<transform-list>"
]);
var LENGTH_UNITS = /* @__PURE__ */ new Set([
  "cap",
  "ch",
  "cm",
  "cqb",
  "cqh",
  "cqi",
  "cqmax",
  "cqmin",
  "cqw",
  "dvb",
  "dvh",
  "dvi",
  "dvmax",
  "dvmin",
  "dvw",
  "em",
  "ex",
  "ic",
  "in",
  "lh",
  "lvb",
  "lvh",
  "lvi",
  "lvmax",
  "lvmin",
  "lvw",
  "mm",
  "pc",
  "pt",
  "px",
  "q",
  "rcap",
  "rch",
  "rem",
  "rex",
  "ric",
  "rlh",
  "svb",
  "svh",
  "svi",
  "svmax",
  "svmin",
  "svw",
  "vb",
  "vh",
  "vi",
  "vmax",
  "vmin",
  "vw"
]);
var TRANSFORM_FUNCTIONS = /* @__PURE__ */ new Set([
  "matrix",
  "matrix3d",
  "perspective",
  "rotate",
  "rotate3d",
  "rotatex",
  "rotatey",
  "rotatez",
  "scale",
  "scale3d",
  "scalex",
  "scaley",
  "scalez",
  "skew",
  "skewx",
  "skewy",
  "translate",
  "translate3d",
  "translatex",
  "translatey",
  "translatez"
]);
function syntaxAlternatives(syntax) {
  const alternatives = syntaxComponents(syntax);
  return alternatives !== null && alternatives.length > 0 && alternatives.every((part) => part === "*" || SYNTAX_COMPONENTS.has(part)) ? alternatives : null;
}
function isSupportedSyntaxDescriptor(syntax) {
  return syntaxAlternatives(syntax) !== null;
}
function numeric(value) {
  return value.kind === "scalar" && value.payload.type === "number" ? value.payload : null;
}
function isTransformCall(value) {
  return value.kind === "call" && TRANSFORM_FUNCTIONS.has(value.name.toLowerCase());
}
function matchesSyntax(value, component) {
  if (component === "*") return true;
  if (component === "<color>") {
    return value.kind === "scalar" && value.payload.type === "color";
  }
  if (component === "<custom-ident>") {
    return value.kind === "scalar" && value.payload.type === "keyword" && !RESERVED_IDENTS.has(value.payload.value.toLowerCase());
  }
  if (component === "<transform-function>") return isTransformCall(value);
  if (component === "<transform-list>") {
    return isTransformCall(value) || value.kind === "list" && value.separator === "space" && value.items.length > 0 && value.items.every(isTransformCall);
  }
  const token = numeric(value);
  if (!token) return false;
  const unit = token.unit.toLowerCase();
  switch (component) {
    case "<number>":
      return unit === "";
    case "<integer>":
      return unit === "" && Number.isInteger(token.value);
    case "<percentage>":
      return unit === "%";
    case "<length>":
      return LENGTH_UNITS.has(unit);
    case "<length-percentage>":
      return unit === "%" || LENGTH_UNITS.has(unit);
    case "<angle>":
      return ["deg", "grad", "rad", "turn"].includes(unit);
    case "<time>":
      return unit === "s" || unit === "ms";
    case "<resolution>":
      return ["dpi", "dpcm", "dppx", "x"].includes(unit);
    case "<flex>":
      return unit === "fr";
    default:
      return false;
  }
}
function coerceToSyntax(source, syntax) {
  const alternatives = syntaxAlternatives(syntax);
  if (!alternatives) {
    return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
  }
  const value = parseCssValue(source);
  if (!value.ok) return value;
  const matches2 = alternatives.some((alternative) => matchesSyntax(value.value, alternative));
  return matches2 ? value : failure(source, "syntax_mismatch", alternatives);
}

// src/css/timeline.ts
var AXES = /* @__PURE__ */ new Set(["block", "inline", "x", "y"]);
var SCROLLERS = /* @__PURE__ */ new Set(["nearest", "root", "self"]);
function parseAnimationTimeline(source) {
  const input = source.trim();
  const lower = input.toLowerCase();
  if (lower === "auto" || lower === "none") return success({ kind: lower });
  const scrollArgs = timelineArgs("scroll", input);
  if (scrollArgs !== null) {
    const result = { kind: "scroll" };
    for (const arg of scrollArgs) {
      const token = arg.toLowerCase();
      if (SCROLLERS.has(token) && result.scroller === void 0) {
        result.scroller = token;
      } else if (AXES.has(token) && result.axis === void 0) {
        result.axis = token;
      } else return failure(source, "timeline_option_invalid", ["scroll timeline"]);
    }
    return success(result);
  }
  const viewArgs = timelineArgs("view", input);
  if (viewArgs !== null) {
    const result = { kind: "view" };
    const inset = [];
    for (const arg of viewArgs) {
      const token = arg.toLowerCase();
      if (AXES.has(token) && result.axis === void 0) result.axis = token;
      else if (isTimelineLength(arg) && inset.length < 2) inset.push(arg);
      else return failure(source, "timeline_option_invalid", ["view timeline"]);
    }
    if (inset[0]) result.inset = inset[1] ? { start: inset[0], end: inset[1] } : { start: inset[0] };
    return success(result);
  }
  return isDashedIdent(input) ? success({ kind: "name", name: input }) : failure(source, "timeline_option_invalid", ["timeline"]);
}
var RANGE_PHASES = /* @__PURE__ */ new Set(["normal", "cover", "contain", "entry", "exit", "entry-crossing", "exit-crossing"]);
function rangeBoundary(tokens) {
  if (tokens.length === 0 || tokens.length > 2) return null;
  const phase = tokens[0]?.toLowerCase();
  if (RANGE_PHASES.has(phase)) {
    return tokens[1] === void 0 ? { phase } : isTimelineLength(tokens[1]) ? { phase, offset: tokens[1] } : null;
  }
  return tokens.length === 1 && tokens[0] !== void 0 && isTimelineLength(tokens[0]) ? { offset: tokens[0] } : null;
}
function parseAnimationRange(source) {
  const input = source.trim();
  const comma = splitTopLevel(input, ",");
  if (!comma || comma.length > 2) return failure(source, "timeline_option_invalid", ["animation range"]);
  const [commaStart, commaEnd] = comma;
  if (commaStart !== void 0 && commaEnd !== void 0) {
    const startTokens = splitTopLevel(commaStart, "space");
    const endTokens = splitTopLevel(commaEnd, "space");
    const start = startTokens && rangeBoundary(startTokens);
    const end = endTokens && rangeBoundary(endTokens);
    return start && end ? success({ start, end }) : failure(source, "timeline_option_invalid", ["animation range"]);
  }
  const tokens = splitTopLevel(input, "space");
  if (!tokens) return failure(source, "timeline_option_invalid", ["animation range"]);
  const single = rangeBoundary(tokens);
  if (single) return success({ start: single });
  for (const split of [2, 1]) {
    const start = rangeBoundary(tokens.slice(0, split));
    const end = rangeBoundary(tokens.slice(split));
    if (start && end) return success({ start, end });
  }
  return failure(source, "timeline_option_invalid", ["animation range"]);
}

// src/css/rules.ts
var TRIGGER_TYPES = /* @__PURE__ */ new Set(["once", "repeat", "alternate", "state"]);
function parseTimelineScope(source) {
  const input = source.trim();
  if (input === "none" || input === "all") return success({ kind: input });
  const names = splitTopLevel(input, ",");
  return names !== null && names.length > 0 && names.every(isDashedIdent) ? success({ kind: "names", names }) : failure(source, "timeline_option_invalid", ["timeline scope"]);
}
function parseAnimationTrigger(source) {
  const tokens = splitTopLevel(source.trim(), "space");
  if (!tokens) return failure(source, "timeline_option_invalid", ["animation trigger"]);
  const result = {};
  const range = [];
  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (TRIGGER_TYPES.has(lower) && result.type === void 0) {
      result.type = lower;
      continue;
    }
    if (result.timeline === void 0 && opensTimeline(token)) {
      const timeline = parseAnimationTimeline(token);
      if (!timeline.ok) return timeline;
      result.timeline = timeline.value;
      continue;
    }
    range.push(token);
  }
  if (range.length > 0) {
    const parsed = parseAnimationRange(range.join(" "));
    if (!parsed.ok) return parsed;
    result.range = parsed.value;
  }
  return Object.keys(result).length > 0 ? success(result) : failure(source, "timeline_option_invalid", ["animation trigger"]);
}
var DIRECTIONS = /* @__PURE__ */ new Set(["normal", "reverse", "alternate", "alternate-reverse"]);
var FILL_MODES = /* @__PURE__ */ new Set(["none", "forwards", "backwards", "both"]);
var PLAY_STATES = /* @__PURE__ */ new Set(["running", "paused"]);
var COMPOSITIONS = /* @__PURE__ */ new Set(["replace", "add", "accumulate"]);
var TIMING_KEYWORDS = /* @__PURE__ */ new Set(["linear", "ease", "ease-in", "ease-out", "ease-in-out"]);
var CSS_WIDE = /* @__PURE__ */ new Set(["initial", "inherit", "unset", "revert", "revert-layer"]);
var optionProperties = /* @__PURE__ */ new Set([
  "animation-name",
  "animation-duration",
  "animation-delay",
  "animation-iteration-count",
  "animation-direction",
  "animation-fill-mode",
  "animation-play-state",
  "animation-timing-function",
  "animation-composition"
]);
var cascadeProperties = /* @__PURE__ */ new Set([...optionProperties, "animation-timeline"]);
function commaItems(value) {
  return value.kind === "list" && value.separator === "comma" ? value.items : [value];
}
function spaceItems(value) {
  return value.kind === "list" && value.separator === "space" ? value.items : [value];
}
function scalarKeyword(value) {
  return value?.kind === "scalar" && value.payload.type === "keyword" ? value.payload.value : void 0;
}
function scalarNumberValue(value, units = [""]) {
  if (value.kind !== "scalar" || value.payload.type !== "number") return void 0;
  const unit = value.payload.unit.toLowerCase();
  if (!units.includes(unit)) return void 0;
  return unit === "ms" ? value.payload.value / 1e3 : value.payload.value;
}
function timingFunctionValue(value) {
  const word = scalarKeyword(value)?.toLowerCase();
  if (word && TIMING_KEYWORDS.has(word)) {
    return Object.freeze({ kind: "keyword", name: word });
  }
  if (word === "step-start" || word === "step-end") {
    return Object.freeze({
      kind: "steps",
      count: 1,
      position: word === "step-start" ? "jump-start" : "jump-end"
    });
  }
  if (value.kind !== "call") return void 0;
  const name = value.name.toLowerCase();
  if (name === "cubic-bezier") {
    const values = value.args.map((argument) => scalarNumberValue(argument));
    if (values.length !== 4 || values.some((item) => item === void 0)) return void 0;
    const [x1, y1, x2, y2] = values;
    return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1 ? Object.freeze({ kind: "cubic-bezier", x1, y1, x2, y2 }) : void 0;
  }
  if (name === "steps") {
    const [countArgument] = value.args;
    if (countArgument === void 0 || value.args.length > 2) return void 0;
    const count = scalarNumberValue(countArgument);
    const authoredPosition = scalarKeyword(value.args[1])?.toLowerCase();
    const position = authoredPosition === void 0 ? "jump-end" : JUMP_ALIASES.get(authoredPosition);
    if (position === void 0) return void 0;
    return count !== void 0 && Number.isInteger(count) && count > 0 && !(position === "jump-none" && count < 2) ? Object.freeze({ kind: "steps", count, position }) : void 0;
  }
  if (name !== "linear" || value.args.length < 2) return void 0;
  const stops = [];
  for (const argument of value.args) {
    const tokens = spaceItems(argument);
    const [outputToken, ...rest] = tokens;
    if (outputToken === void 0 || tokens.length > 3) return void 0;
    const output = scalarNumberValue(outputToken);
    if (output === void 0) return void 0;
    const positions = [];
    for (const token of rest) {
      const position = scalarNumberValue(token, ["%"]);
      if (position === void 0) return void 0;
      positions.push(position / 100);
    }
    stops.push(Object.freeze({
      output,
      input: Object.freeze(positions)
    }));
  }
  return Object.freeze({ kind: "linear-function", stops: Object.freeze(stops) });
}
function animationNameValue(value) {
  const name = scalarKeyword(value);
  if (!name) return void 0;
  const lower = name.toLowerCase();
  return !CSS_WIDE.has(lower) ? name : void 0;
}
function timelineValue(value) {
  const word = scalarKeyword(value);
  const lower = word?.toLowerCase();
  if (lower === "auto" || lower === "none") return Object.freeze({ kind: lower });
  if (word?.startsWith("--")) return Object.freeze({ kind: "name", name: word });
  if (value.kind !== "call") return void 0;
  const name = value.name.toLowerCase();
  const args = value.args.flatMap((argument) => spaceItems(argument));
  if (name === "scroll") {
    const result2 = { kind: "scroll" };
    for (const argument of args) {
      const token = scalarKeyword(argument)?.toLowerCase();
      if (["nearest", "root", "self"].includes(token ?? "") && result2.scroller === void 0) {
        result2.scroller = token;
      } else if (["block", "inline", "x", "y"].includes(token ?? "") && result2.axis === void 0) {
        result2.axis = token;
      } else return void 0;
    }
    return Object.freeze(result2);
  }
  if (name !== "view") return void 0;
  const result = { kind: "view" };
  const inset = [];
  for (const argument of args) {
    const token = scalarKeyword(argument)?.toLowerCase();
    if (["block", "inline", "x", "y"].includes(token ?? "") && result.axis === void 0) {
      result.axis = token;
    } else if (argument.kind === "scalar" && argument.payload.type === "number" && argument.payload.unit) {
      inset.push(`${argument.payload.value}${argument.payload.unit}`);
    } else return void 0;
  }
  if (inset.length > 2) return void 0;
  if (inset[0]) result.inset = inset[1] ? { start: inset[0], end: inset[1] } : { start: inset[0] };
  return Object.freeze(result);
}
function timelineList(value) {
  const values = commaItems(value).map(timelineValue);
  return values.every((item) => item !== void 0) ? Object.freeze(values) : void 0;
}
var keywordValue = (value) => Object.freeze({
  kind: "scalar",
  payload: Object.freeze({ type: "keyword", value })
});
var numberValue = (value, unit) => Object.freeze({
  kind: "scalar",
  payload: Object.freeze({ type: "number", value, unit })
});
var listValue = (items) => items.length === 1 && items[0] !== void 0 ? items[0] : Object.freeze({ kind: "list", separator: "comma", items: Object.freeze([...items]) });
function animationArm(value) {
  const tokens = spaceItems(value);
  if (tokens.length === 0 || value.kind === "list" && value.separator !== "space") return void 0;
  let name;
  let duration;
  let delay;
  let iteration;
  let direction;
  let fill;
  let playState;
  let timing;
  for (const token of tokens) {
    const time = scalarNumberValue(token, ["s", "ms"]);
    if (time !== void 0) {
      if (!duration) {
        if (time < 0) return void 0;
        duration = token;
      } else if (!delay) delay = token;
      else return void 0;
      continue;
    }
    if (!timing && timingFunctionValue(token)) {
      timing = token;
      continue;
    }
    const word = scalarKeyword(token)?.toLowerCase();
    const count = scalarNumberValue(token);
    if (!iteration && (word === "infinite" || count !== void 0 && count >= 0)) {
      iteration = token;
      continue;
    }
    if (!direction && DIRECTIONS.has(word ?? "")) {
      direction = token;
      continue;
    }
    if (!fill && FILL_MODES.has(word ?? "")) {
      fill = token;
      continue;
    }
    if (!playState && PLAY_STATES.has(word ?? "")) {
      playState = token;
      continue;
    }
    if (!name && animationNameValue(token)) {
      name = token;
      continue;
    }
    return void 0;
  }
  return Object.freeze({
    name: name ?? keywordValue("none"),
    duration: duration ?? numberValue(0, "s"),
    delay: delay ?? numberValue(0, "s"),
    iteration: iteration ?? numberValue(1, ""),
    direction: direction ?? keywordValue("normal"),
    fill: fill ?? keywordValue("none"),
    playState: playState ?? keywordValue("running"),
    timing: timing ?? keywordValue("ease")
  });
}
function expandAnimationShorthand(value) {
  const arms = commaItems(value).map(animationArm);
  if (arms.some((arm) => arm === void 0)) return void 0;
  const values = arms;
  return /* @__PURE__ */ new Map([
    ["animation-name", listValue(values.map((arm) => arm.name))],
    ["animation-duration", listValue(values.map((arm) => arm.duration))],
    ["animation-delay", listValue(values.map((arm) => arm.delay))],
    ["animation-iteration-count", listValue(values.map((arm) => arm.iteration))],
    ["animation-direction", listValue(values.map((arm) => arm.direction))],
    ["animation-fill-mode", listValue(values.map((arm) => arm.fill))],
    ["animation-play-state", listValue(values.map((arm) => arm.playState))],
    ["animation-timing-function", listValue(values.map((arm) => arm.timing))],
    ["animation-composition", keywordValue("replace")],
    ["animation-timeline", keywordValue("auto")]
  ]);
}
function holdsVar(value) {
  switch (value.kind) {
    case "call":
      return value.name.toLowerCase() === "var" || value.args.some(holdsVar);
    case "list":
      return value.items.some(holdsVar);
    default:
      return false;
  }
}
function optionDeclarationValid(name, value) {
  const items = commaItems(value);
  if (items.length === 0) return false;
  switch (name) {
    case "animation":
      return expandAnimationShorthand(value) !== void 0;
    case "animation-name":
      return items.every((item) => animationNameValue(item) !== void 0);
    case "animation-duration":
      return items.every((item) => (scalarNumberValue(item, ["s", "ms"]) ?? -1) >= 0);
    case "animation-delay":
      return items.every((item) => scalarNumberValue(item, ["s", "ms"]) !== void 0);
    case "animation-iteration-count":
      return items.every((item) => {
        const count = scalarNumberValue(item);
        return scalarKeyword(item)?.toLowerCase() === "infinite" || count !== void 0 && count >= 0;
      });
    case "animation-direction":
      return items.every((item) => DIRECTIONS.has(scalarKeyword(item)?.toLowerCase() ?? ""));
    case "animation-fill-mode":
      return items.every((item) => FILL_MODES.has(scalarKeyword(item)?.toLowerCase() ?? ""));
    case "animation-play-state":
      return items.every((item) => PLAY_STATES.has(scalarKeyword(item)?.toLowerCase() ?? ""));
    case "animation-composition":
      return items.every((item) => COMPOSITIONS.has(scalarKeyword(item)?.toLowerCase() ?? ""));
    case "animation-timing-function":
      return items.every((item) => timingFunctionValue(item) !== void 0);
    case "animation-timeline":
      return timelineList(value) !== void 0;
    default:
      return true;
  }
}
function parseDeclarations(body) {
  const declarations = [];
  const rows = splitTopLevel(body, ";");
  if (!rows) return failure(body, "css_syntax", ["declaration"]);
  for (const row of rows) {
    const parsedRow = declaration(row);
    if (!parsedRow) return failure(row, "css_syntax", ["declaration"]);
    const { name, value: source, important } = parsedRow;
    const empty = name === "animation" || name.startsWith("animation-") ? emptyListComma(source) : void 0;
    if (empty !== void 0) {
      return failure(source, "animation_option_invalid", ["nonempty animation list item"], empty, empty + 1);
    }
    const value = parseCssValue(source);
    if (!value.ok) return value;
    if (holdsVar(value.value)) {
      declarations.push({ name, value: value.value, important });
      continue;
    }
    if (!optionDeclarationValid(name, value.value)) {
      const expected = name === "animation-timeline" ? [`${value.value.kind === "call" && value.value.name.toLowerCase() === "view" ? "view " : value.value.kind === "call" && value.value.name.toLowerCase() === "scroll" ? "scroll " : ""}timeline`] : [name === "animation" ? "animation shorthand" : name];
      return failure(source, name === "animation-timeline" ? "timeline_option_invalid" : "animation_option_invalid", expected);
    }
    if (name === "animation-range") {
      const range = parseAnimationRange(source);
      if (!range.ok) return range;
    }
    if (name === "animation-range-start" || name === "animation-range-end") {
      const range = parseAnimationRange(source);
      if (!range.ok || range.value.end !== void 0) {
        return failure(row, "timeline_option_invalid", ["animation range boundary"]);
      }
    }
    if (name === "timeline-scope") {
      const scope = parseTimelineScope(source);
      if (!scope.ok) return scope;
    }
    if (name === "animation-trigger") {
      const trigger = parseAnimationTrigger(source);
      if (!trigger.ok) return trigger;
    }
    declarations.push({ name, value: value.value, important });
  }
  return success(declarations);
}
function collectDeclarations(declarations) {
  const result = /* @__PURE__ */ new Map();
  for (const declaration2 of declarations) {
    const current = result.get(declaration2.name);
    if (!current || declaration2.important || !current.important) result.set(declaration2.name, declaration2);
  }
  return result;
}

// src/css/serialize.ts
var CSS_COLOR_SPACES = /* @__PURE__ */ new Set([
  "rgb",
  "hsl",
  "hwb",
  "lab",
  "lch",
  "oklab",
  "oklch",
  "xyz",
  "srgb-linear",
  "display-p3",
  "a98-rgb",
  "prophoto-rgb",
  "rec2020"
]);
var format = (value) => value === "none" ? value : Number(value.toFixed(12)).toString();
var angle = (value) => value === "none" ? value : `${format(value)}deg`;
var alphaSuffix = (alpha) => alpha === 1 ? "" : ` / ${alpha === "none" ? "none" : `${format(alpha * 100)}%`}`;
function serializeCssColor(color) {
  if (!isAnyColor(color) || !CSS_COLOR_SPACES.has(color.space)) {
    return err({ code: "color_invalid_input" });
  }
  if (color.channels.some((channel) => channel !== "none" && !Number.isFinite(channel)) || color.alpha !== "none" && !Number.isFinite(color.alpha)) {
    return err({ code: "color_non_finite" });
  }
  if (color.alpha !== "none" && (color.alpha < 0 || color.alpha > 1)) {
    return err({ code: "color_out_of_range" });
  }
  const [a, b, c] = color.channels;
  const alpha = alphaSuffix(color.alpha);
  switch (color.space) {
    case "rgb":
      return ok(`rgb(${format(a)} ${format(b)} ${format(c)}${alpha})`);
    case "hsl":
      return ok(`hsl(${angle(a)} ${b === "none" ? b : `${format(b * 100)}%`} ${c === "none" ? c : `${format(c * 100)}%`}${alpha})`);
    case "hwb":
      return ok(`hwb(${angle(a)} ${b === "none" ? b : `${format(b * 100)}%`} ${c === "none" ? c : `${format(c * 100)}%`}${alpha})`);
    case "lab":
      return ok(`lab(${a === "none" ? a : `${format(a)}%`} ${format(b)} ${format(c)}${alpha})`);
    case "lch":
      return ok(`lch(${a === "none" ? a : `${format(a)}%`} ${format(b)} ${angle(c)}${alpha})`);
    case "oklab":
      return ok(`oklab(${a === "none" ? a : `${format(a * 100)}%`} ${format(b)} ${format(c)}${alpha})`);
    case "oklch":
      return ok(`oklch(${a === "none" ? a : `${format(a * 100)}%`} ${format(b)} ${angle(c)}${alpha})`);
    case "xyz":
      return ok(`color(xyz ${format(a)} ${format(b)} ${format(c)}${alpha})`);
    default:
      return ok(`color(${color.space} ${format(a)} ${format(b)} ${format(c)}${alpha})`);
  }
}
function serializeCssValue(value) {
  if (value.kind === "scalar") {
    const payload = value.payload;
    if (payload.type === "number") return ok(`${payload.value}${payload.unit}`);
    if (payload.type === "keyword") return ok(payload.value);
    return serializeCssColor(payload.value);
  }
  const items = value.kind === "call" ? value.args : value.items;
  const parts = [];
  for (const item of items) {
    const part = serializeCssValue(item);
    if (!part.ok) return part;
    parts.push(part.value);
  }
  if (value.kind === "call") return ok(`${value.name}(${parts.join(", ")})`);
  const separator = value.separator === "comma" ? ", " : value.separator === "slash" ? " / " : " ";
  const joined = parts.join(separator);
  return ok(value.separator === "space" ? joined.replace(/\s+([:;])/g, "$1") : joined);
}

// src/css/stylesheet.ts
function blocks(source) {
  const list = ruleList(source);
  return list.fault === void 0 ? success(list.blocks) : failure(source, "css_syntax", [list.fault.expected], list.fault.start);
}
function parseKeyframes(name, body) {
  const rows = blocks(body);
  if (!rows.ok) return rows;
  const rules = [];
  for (const row of rows.value) {
    if (row.body === null) return failure(body, "css_syntax", ["keyframe block"]);
    const selectors = [];
    const tokens = splitTopLevel(row.prelude, ",");
    if (!tokens) return failure(row.prelude, "keyframe_selector_invalid", ["keyframe selector"]);
    for (const token of tokens) {
      const selector = parseKeyframeSelector(token);
      if (!selector.ok) return selector;
      selectors.push(selector.value);
    }
    const declarations = parseDeclarations(row.body);
    if (!declarations.ok) return declarations;
    const collected = collectDeclarations(declarations.value);
    const timingDeclaration = collected.get("animation-timing-function");
    const compositionDeclaration = collected.get("animation-composition");
    const timingText = timingDeclaration && serializeCssValue(timingDeclaration.value);
    if (timingText && !timingText.ok) return failure(row.body, "css_syntax", ["serializable timing function"]);
    const timing = timingText?.ok ? parseTimingFunction(timingText.value) : null;
    if (timing && !timing.ok) return timing;
    const compositionResult = compositionDeclaration && serializeCssValue(compositionDeclaration.value);
    if (compositionResult && !compositionResult.ok) return failure(row.body, "css_syntax", ["serializable composition"]);
    const compositionText = compositionResult?.ok ? compositionResult.value : void 0;
    const composition = compositionText === "replace" || compositionText === "add" || compositionText === "accumulate" ? compositionText : void 0;
    const rule = { selectors, declarations: declarations.value };
    if (timing?.ok) rule.timingFunction = timing.value;
    if (composition) rule.composition = composition;
    rules.push(rule);
  }
  return success({ kind: "keyframes", name, rules });
}
function descriptorDeclarations(body) {
  const declarations = parseDeclarations(body);
  return declarations.ok ? collectDeclarations(declarations.value) : null;
}
function descriptorText(declaration2) {
  return declaration2 === void 0 ? ok(void 0) : serializeCssValue(declaration2.value);
}
function parseScopePrelude(source) {
  const groups = scopePrelude(source);
  if (!groups) return null;
  if (groups.root === void 0) return {};
  const roots = splitTopLevel(groups.root, ",");
  const limits = groups.limit === void 0 ? void 0 : splitTopLevel(groups.limit, ",");
  if (!roots || limits === null) return null;
  return {
    root: roots,
    ...limits === void 0 ? {} : { limit: limits }
  };
}
function parseStyleBody(body) {
  const plain = parseDeclarations(body);
  if (plain.ok) return success({ declarations: plain.value });
  const rows = blocks(`${body};`);
  if (!rows.ok) return rows;
  const declarations = [];
  const children = [];
  for (const row of rows.value) {
    if (row.body === null) {
      const parsed2 = parseDeclarations(`${row.prelude};`);
      if (!parsed2.ok) return parsed2;
      declarations.push(...parsed2.value);
      continue;
    }
    const parsed = parseItems(`${row.prelude}{${row.body}}`);
    if (!parsed.ok) return parsed;
    children.push(...parsed.value);
  }
  return success({ declarations, ...children.length === 0 ? {} : { children } });
}
function parseFunctionPrelude(source) {
  const signature = functionHead(source);
  if (signature === null) return failure(source, "css_syntax", ["custom function signature"]);
  const parameters = [];
  const body = signature.params.trim();
  const rows = body ? splitTopLevel(body, ",") : [];
  if (!rows) return failure(source, "css_syntax", ["custom function parameter"]);
  for (const row of rows) {
    const parameter = functionParam(row);
    const head = parameter && paramHead(parameter.head);
    if (!parameter || !head) return failure(row, "css_syntax", ["custom function parameter"]);
    if (parameter.default === "") return failure(row, "css_syntax", ["parameter default"]);
    const parsedDefault = parameter.default === void 0 ? void 0 : parseCssValue(parameter.default);
    if (parsedDefault && !parsedDefault.ok) return parsedDefault;
    parameters.push({
      name: head.name,
      ...head.syntax ? { syntax: head.syntax } : {},
      ...parsedDefault?.ok ? { default: parsedDefault.value } : {}
    });
  }
  return success({ name: signature.name, parameters });
}
function parseItems(source) {
  const sourceBlocks = blocks(source);
  if (!sourceBlocks.ok) return sourceBlocks;
  const result = [];
  for (const row of sourceBlocks.value) {
    const prelude = row.prelude.trim();
    const at = atPrelude(prelude);
    if (at?.at === "keyframes") {
      if (row.body === null) return failure(source, "css_syntax", ["keyframes body"]);
      const parsed = parseKeyframes(at.rest, row.body);
      if (!parsed.ok) return parsed;
      result.push(parsed.value);
      continue;
    }
    if (at?.at === "property") {
      if (row.body === null) return failure(source, "css_syntax", ["property body"]);
      const declarations = descriptorDeclarations(row.body);
      if (!declarations) return failure(source);
      const name = at.rest;
      if (!isPropertyName(name)) {
        return failure(source, "css_syntax", ["custom property name"]);
      }
      const syntaxDeclaration = declarations.get("syntax");
      const inheritsDeclaration = declarations.get("inherits");
      const initial = declarations.get("initial-value");
      if (!syntaxDeclaration || !inheritsDeclaration) {
        return failure(source, "css_syntax", ["syntax and inherits descriptors"]);
      }
      const serializedSyntax = serializeCssValue(syntaxDeclaration.value);
      if (!serializedSyntax.ok) return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
      const syntax = syntaxText(serializedSyntax.value);
      if (!isSupportedSyntaxDescriptor(syntax)) {
        return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
      }
      const inheritsResult = serializeCssValue(inheritsDeclaration.value);
      if (!inheritsResult.ok) return failure(source, "css_syntax", ["true or false"]);
      const inheritsText = inheritsResult.value.toLowerCase();
      if (inheritsText !== "true" && inheritsText !== "false") {
        return failure(source, "css_syntax", ["true or false"]);
      }
      if (!initial && syntax !== "*") {
        return failure(source, "css_syntax", ["initial-value descriptor"]);
      }
      if (initial) {
        const initialText = serializeCssValue(initial.value);
        if (!initialText.ok) return failure(source, "syntax_mismatch", [syntax]);
        const coerced = coerceToSyntax(initialText.value, syntax);
        if (!coerced.ok) return coerced;
      }
      const descriptor = {
        syntax,
        inherits: inheritsText === "true",
        ...initial ? { initialValue: initial.value } : {}
      };
      result.push({ kind: "property", name, descriptor });
      continue;
    }
    if (at?.at === "function") {
      if (row.body === null) return failure(source, "css_syntax", ["function body"]);
      const signature = parseFunctionPrelude(prelude);
      if (!signature.ok) return signature;
      const declarations = parseDeclarations(row.body);
      if (!declarations.ok) return declarations;
      const resultDeclaration = collectDeclarations(declarations.value).get("result");
      const descriptor = {
        ...signature.value.parameters.length > 0 ? { parameters: signature.value.parameters } : {},
        ...resultDeclaration ? { result: resultDeclaration.value } : {},
        declarations: declarations.value
      };
      result.push({ kind: "function", name: signature.value.name, descriptor });
      continue;
    }
    if (at?.at === "scope" || at?.at === "starting-style") {
      if (row.body === null) return failure(source, "css_syntax", ["nested body"]);
      const children = parseItems(row.body);
      if (!children.ok) return children;
      if (at.at === "starting-style") result.push({ kind: "starting-style", children: children.value });
      else {
        const parsedPrelude = parseScopePrelude(at.rest);
        if (!parsedPrelude) return failure(source, "css_syntax", ["scope prelude"]);
        result.push({ kind: "scope", ...parsedPrelude, children: children.value });
      }
      continue;
    }
    if (at?.at === "scroll-timeline" || at?.at === "view-timeline") {
      if (row.body === null) return failure(source, "css_syntax", ["timeline body"]);
      const declarations = descriptorDeclarations(row.body);
      if (!declarations) return failure(source);
      if (at.at === "scroll-timeline") {
        const timelineSource = descriptorText(declarations.get("source"));
        const orientation = descriptorText(declarations.get("orientation"));
        if (!timelineSource.ok || !orientation.ok) {
          return failure(source, "css_syntax", ["serializable timeline descriptor"]);
        }
        const descriptor = {
          ...timelineSource.value === void 0 ? {} : { source: timelineSource.value },
          ...orientation.value === void 0 ? {} : { orientation: orientation.value }
        };
        result.push({ kind: "scroll-timeline", name: at.rest, descriptor });
      } else {
        const subject = descriptorText(declarations.get("subject"));
        const axis = descriptorText(declarations.get("axis"));
        const inset = descriptorText(declarations.get("inset"));
        if (!subject.ok || !axis.ok || !inset.ok) {
          return failure(source, "css_syntax", ["serializable timeline descriptor"]);
        }
        const descriptor = {
          ...subject.value === void 0 ? {} : { subject: subject.value },
          ...axis.value === void 0 ? {} : { axis: axis.value },
          ...inset.value === void 0 ? {} : { inset: inset.value }
        };
        result.push({ kind: "view-timeline", name: at.rest, descriptor });
      }
      continue;
    }
    if (at !== null) {
      const parsedChildren = row.body === null ? null : parseItems(row.body);
      result.push({
        kind: "unknown",
        atName: at.name,
        prelude: at.rest,
        body: row.body,
        ...parsedChildren?.ok ? { children: parsedChildren.value } : {}
      });
      continue;
    }
    if (row.body === null) return failure(source, "css_syntax", ["style body"]);
    const body = parseStyleBody(row.body);
    if (!body.ok) return body;
    const selectors = splitTopLevel(prelude, ",");
    if (!selectors) return failure(source, "css_syntax", ["selector list"]);
    result.push({ kind: "style", selectors, ...body.value });
  }
  return success(result);
}
function parseStylesheet(source) {
  return parseItems(source);
}
export {
  bbnf_exports as bbnf,
  parseStylesheet,
  sheet_exports as sheet,
  splitTopLevel
};
