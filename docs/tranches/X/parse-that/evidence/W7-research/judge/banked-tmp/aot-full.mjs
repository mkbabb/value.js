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

// ../../../../var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-w7-judge/css-grammar.full.generated.js
var RULE_NAMES = ["ws", "ws1", "comma", "slash", "close", "number", "percentage", "dimension", "angle", "none", "ident", "dashedIdent", "string", "balanced", "mathFn", "calc", "minMax", "clampFn", "signAbs", "calcSum", "calcAddOp", "calcProduct", "calcMulOp", "calcValue", "calcGroup", "calcConstant", "calcKeyword", "varFn", "color", "component", "hueValue", "alphaValue", "alphaTail", "rgbFn", "rgbModern", "rgbLegacyPct", "rgbLegacyNum", "legacyPct", "legacyNum", "legacyHue", "legacyAlpha", "hslFn", "hslModern", "hslLegacy", "hwbFn", "labFn", "lchFn", "oklabFn", "oklchFn", "colorFn", "colorSpace", "relativeColor", "relativeHead", "relativeTail", "relativeComp", "colorMix", "mixMethod", "mixPolar", "mixRect", "polarSpace", "rectSpace", "hueMethod", "mixItem", "mixLead", "mixTrail", "mixPercent", "lightDark", "hex", "colorKeyword", "valueTop", "commaList", "slashList", "spaceList", "termSep", "valueTerm", "badTerm", "varCall", "varBody", "colorCall", "colorHead", "call", "callName", "numeric", "operator", "identTerm", "scalarTop", "scalarTerm", "colorTop", "keyframeSelector", "selectorKeyword", "selectorNamed", "timingFunction", "timingKeyword", "cubicBezier", "stepsFn", "stepPosition", "linearFn", "linearStop", "quoted", "textGroup", "textBody", "commaRun", "commaItems", "semiRun", "semiItems", "spaceRun", "spaceItems", "restText", "comment", "ruleGap", "preludeRun", "blockBody", "openQuote", "semiTail", "blockTail", "ruleBlock", "openComment", "openBlock", "openRule", "ruleList", "atPrelude", "atKeyframes", "atProperty", "atFunction", "atScope", "atStartingStyle", "atScrollTimeline", "atViewTimeline", "atOther", "atName", "atRest", "propertyName", "syntaxText", "syntaxCore", "syntaxPart", "syntaxAlts", "scopeGroup", "scopeLimit", "scopePrelude", "functionName", "functionParams", "functionHead", "colonRun", "paramDefault", "functionParam", "paramName", "paramSyntax", "paramHead", "declName", "declValue", "declImportant", "declaration", "listComma", "commaSpans", "argRun", "timelineArgs", "scrollFn", "viewFn", "timelineLead", "timelineLength"];
var ACTION_MANIFEST = { "number": "map", "percentage": "map", "dimension": "map", "angle": "map", "none": "map", "string": "map", "calc": "map", "minMax": "map", "clampFn": "map", "signAbs": "map", "calcSum": "map", "calcProduct": "map", "calcConstant": "map", "calcKeyword": "map", "varFn": "map", "rgbModern": "map", "rgbLegacyPct": "map", "rgbLegacyNum": "map", "hslModern": "map", "hslLegacy": "map", "hwbFn": "map", "labFn": "map", "lchFn": "map", "oklabFn": "map", "oklchFn": "map", "colorFn": "map", "relativeColor": "map", "colorMix": "map", "mixPolar": "map", "mixRect": "map", "mixLead": "map", "mixTrail": "map", "lightDark": "map", "hex": "map", "colorKeyword": "map", "commaList": "map", "slashList": "map", "spaceList": "map", "badTerm": "span", "varCall": "map", "colorCall": "map", "call": "map", "numeric": "map", "operator": "map", "identTerm": "map", "scalarTerm": "map", "selectorKeyword": "map", "selectorNamed": "map", "timingKeyword": "map", "cubicBezier": "map", "stepsFn": "map", "linearFn": "map", "linearStop": "map", "commaRun": "map", "commaItems": "map", "semiRun": "map", "semiItems": "map", "spaceRun": "map", "spaceItems": "map", "restText": "map", "preludeRun": "map", "semiTail": "map", "blockTail": "map", "ruleBlock": "map", "openComment": "span", "openBlock": "span", "openRule": "span", "ruleList": "map", "atKeyframes": "map", "atProperty": "map", "atFunction": "map", "atScope": "map", "atStartingStyle": "map", "atScrollTimeline": "map", "atViewTimeline": "map", "atOther": "map", "atName": "map", "atRest": "map", "syntaxText": "map", "syntaxCore": "map", "syntaxPart": "map", "syntaxAlts": "map", "scopeGroup": "map", "scopeLimit": "map", "scopePrelude": "map", "functionName": "map", "functionParams": "map", "functionHead": "map", "colonRun": "map", "paramDefault": "map", "functionParam": "map", "paramName": "map", "paramSyntax": "map", "paramHead": "map", "declName": "map", "declValue": "map", "declImportant": "map", "declaration": "map", "listComma": "span", "commaSpans": "map", "argRun": "map", "timelineArgs": "map" };
var FAIL = Object.freeze({ fail: true });
var RE0 = new RegExp("\\s*,\\s*", "y");
var RE1 = new RegExp("\\s*\\/\\s*", "y");
var RE2 = new RegExp("\\s*\\)", "y");
var RE3 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+(?!\\.\\d))(?:[eE][+-]?\\d+)?(?![\\w%\\\\])", "y");
var RE4 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?%", "y");
var RE5 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?[a-zA-Z_][\\w-]*", "y");
var RE6 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?(?:[dD]eg|[gG]rad|[rR]ad|[tT]urn)(?![\\w-])", "iy");
var RE7 = new RegExp("[nN]one(?![\\w-])", "iy");
var RE8 = new RegExp("-?[a-zA-Z_][\\w-]*|--[\\w-]*", "y");
var RE9 = new RegExp("--[\\w-]+", "y");
var RE10 = new RegExp(`"(?:\\\\[\\s\\S]|[^"\\\\])*"|'(?:\\\\[\\s\\S]|[^'\\\\])*'`, "y");
var RE11 = new RegExp("[cC]alc\\(\\s*", "iy");
var RE12 = new RegExp("(?:[mM]in|[mM]ax)(?=\\()", "iy");
var RE13 = new RegExp("\\(\\s*", "y");
var RE14 = new RegExp("[cC]lamp\\(\\s*", "iy");
var RE15 = new RegExp("(?:[sS]ign|[aA]bs)(?=\\()", "iy");
var RE16 = new RegExp("\\s+[+-]\\s+", "y");
var RE17 = new RegExp("\\s*[*\\/]\\s*", "y");
var RE18 = new RegExp("(?:-?[iI]nfinity|[nN]an|[pP]i|[eE])(?![\\w-])", "iy");
var RE19 = new RegExp("[a-zA-Z][\\w-]*(?![\\w(-])", "y");
var RE20 = new RegExp("(?:[vV]ar|[eE]nv)(?=\\()", "iy");
var RE21 = new RegExp("[rR]gba?\\(\\s*", "iy");
var RE22 = new RegExp("[hH]sla?\\(\\s*", "iy");
var RE23 = new RegExp("[hH]wb\\(\\s*", "iy");
var RE24 = new RegExp("[lL]ab\\(\\s*", "iy");
var RE25 = new RegExp("[lL]ch\\(\\s*", "iy");
var RE26 = new RegExp("[oO]klab\\(\\s*", "iy");
var RE27 = new RegExp("[oO]klch\\(\\s*", "iy");
var RE28 = new RegExp("[cC]olor\\(\\s*", "iy");
var RE29 = new RegExp("(?:[sS]rgb-linear|[sS]rgb|[dD]isplay-p3-linear|[dD]isplay-p3|[aA]98-rgb|[pP]rophoto-rgb|[rR]ec2020|[xX]yz-d50|[xX]yz-d65|[xX]yz)(?![\\w-])", "iy");
var RE30 = new RegExp("[cC]olor\\(\\s*from(?![\\w-])", "iy");
var RE31 = new RegExp("(?:[rR]gba?|[hH]sla?|[hH]wb|[lL]ab|[lL]ch|[oO]klab|[oO]klch)\\(\\s*from(?![\\w-])", "iy");
var RE32 = new RegExp("[cC]olor-mix\\(\\s*", "iy");
var RE33 = new RegExp("[iI]n(?![\\w-])", "iy");
var RE34 = new RegExp("(?:[sS]rgb-linear|[sS]rgb|[dD]isplay-p3-linear|[dD]isplay-p3|[aA]98-rgb|[pP]rophoto-rgb|[rR]ec2020|[lL]ab|[oO]klab|[xX]yz-d50|[xX]yz-d65|[xX]yz)(?![\\w-])", "iy");
var RE35 = new RegExp("(?:[hH]sl|[hH]wb|[lL]ch|[oO]klch)(?![\\w-])", "iy");
var RE36 = new RegExp("(?:[sS]horter|[lL]onger|[iI]ncreasing|[dD]ecreasing)\\s+hue(?![\\w-])", "iy");
var RE37 = new RegExp("[lL]ight-dark\\(\\s*", "iy");
var RE38 = new RegExp("#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\\w-])", "y");
var RE39 = new RegExp("\\s+|(?=[:;])|(?<=[:;])", "y");
var RE40 = new RegExp("\\s*,", "y");
var RE41 = new RegExp("(?:[rR]gba?|[hH]sla?|[hH]wb|[lL]ab|[lL]ch|[oO]klab|[oO]klch|[cC]olor)\\(", "iy");
var RE42 = new RegExp("(?:--[\\w-]*|[a-zA-Z_-][\\w-]*)(?=\\()", "y");
var RE43 = new RegExp("[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?[%a-zA-Z-]*(?![\\w\\\\.])", "y");
var RE44 = new RegExp("<=|>=|==|!=|[+*<>=:;]|-(?![\\w-])", "y");
var RE45 = new RegExp("[-_a-zA-Z][-_a-zA-Z\\d]*(?![\\w(-])", "y");
var RE46 = new RegExp("(?:[fF]rom|[tT]o)(?![\\w-])", "iy");
var RE47 = new RegExp("(?:[eE]ntry|[eE]xit|[cC]over|[cC]ontain)(?![\\w-])", "iy");
var RE48 = new RegExp("(?:[lL]inear|[eE]ase-in-out|[eE]ase-in|[eE]ase-out|[eE]ase|[sS]tep-start|[sS]tep-end)(?![\\w(-])", "iy");
var RE49 = new RegExp("[cC]ubic-bezier\\(\\s*", "iy");
var RE50 = new RegExp("[sS]teps\\(\\s*", "iy");
var RE51 = new RegExp("(?:[jJ]ump-start|[jJ]ump-end|[jJ]ump-none|[jJ]ump-both|[sS]tart|[eE]nd)(?![\\w-])", "iy");
var RE52 = new RegExp("[lL]inear\\(\\s*", "iy");
var RE53 = new RegExp("\\/\\*[\\s\\S]*?\\*\\/", "y");
var RE54 = new RegExp(`["'][\\s\\S]*`, "y");
var RE55 = new RegExp("\\/\\*[\\s\\S]*", "y");
var RE56 = new RegExp("@[kK]eyframes ", "iy");
var RE57 = new RegExp("@[pP]roperty ", "iy");
var RE58 = new RegExp("@[fF]unction ", "iy");
var RE59 = new RegExp("@[sS]cope", "iy");
var RE60 = new RegExp("@[sS]tarting-style$", "iy");
var RE61 = new RegExp("@[sS]croll-timeline ", "iy");
var RE62 = new RegExp("@[vV]iew-timeline ", "iy");
var RE63 = new RegExp("@[^ ]*", "y");
var RE64 = new RegExp("--[-_a-zA-Z][-_a-zA-Z\\d]*", "y");
var RE65 = new RegExp(`['"]`, "y");
var RE66 = new RegExp(`(?:(?!['"]$)[\\s\\S])+`, "y");
var RE67 = new RegExp("[tT][oO]", "y");
var RE68 = new RegExp("--[-\\w]+", "y");
var RE69 = new RegExp("[\\s\\S]*(?=\\)$)", "y");
var RE70 = new RegExp("@[fF]unction\\s+", "iy");
var RE71 = new RegExp("\\s*\\(", "y");
var RE72 = new RegExp("(?:(?![!][iI]mportant\\s*$)[\\s\\S])+", "iy");
var RE73 = new RegExp("![iI]mportant\\s*$", "iy");
var RE74 = new RegExp("[sS]croll\\(", "iy");
var RE75 = new RegExp("[vV]iew\\(", "iy");
var RE76 = new RegExp("(?:[aA]uto|[nN]one|--|[sS]croll\\(|[vV]iew\\()[\\s\\S]*", "iy");
var RE77 = new RegExp("[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:%|[a-zA-Z]+)?", "y");
var RE78 = new RegExp("[aA]uto", "iy");
var NA0 = new RegExp("\\s", "y");
var T0 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T3 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T4 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T5 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T6 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
var T7 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T8 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D10 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T9 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var D12 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T10 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T11 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T12 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T13 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T14 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D18 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 6, 5, 5, 5, 7, 5, 5, 5, 4, 7, 5, 7, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 6, 5, 5, 5, 7, 5, 5, 5, 4, 7, 5, 7, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 0, 0, 0, 0, 0]);
var T15 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T16 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
var T17 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D22 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0]);
var D23 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 4, 2, 2, 5, 2, 2, 2, 6, 2, 2, 7, 2, 2, 8, 2, 2, 2, 4, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 4, 2, 2, 5, 2, 2, 2, 6, 2, 2, 7, 2, 2, 8, 2, 2, 2, 4, 2, 2, 2, 2, 0, 0, 0, 0, 0]);
var D24 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D25 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D26 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T18 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D28 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D29 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D30 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D31 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D32 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T19 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D34 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T20 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T21 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T22 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var D38 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T23 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D40 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 4, 3, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 4, 3, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3, 3, 0, 0, 0, 0, 0]);
var T24 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D42 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 3, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 3, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var T25 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var T26 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T27 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D46 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
var D47 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T28 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D49 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 0, 0, 0, 3, 1, 1, 2, 5, 1, 6, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 2, 2, 2, 0, 0, 9, 9, 10, 9, 11, 9, 9, 10, 9, 9, 9, 10, 9, 9, 10, 9, 9, 10, 9, 9, 9, 11, 9, 9, 9, 9, 0, 0, 0, 0, 9, 0, 9, 9, 10, 9, 11, 9, 9, 10, 9, 9, 9, 10, 9, 9, 10, 9, 9, 10, 9, 9, 9, 11, 9, 9, 9, 9, 0, 0, 0, 0, 0]);
var NA1 = new RegExp(`[^\\s(),\\/:;"']`, "y");
var T29 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var D52 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T30 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T31 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D55 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 2, 0, 0, 1, 4, 0, 5, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 0, 0, 7, 7, 8, 7, 7, 7, 7, 9, 7, 7, 7, 10, 7, 7, 9, 7, 7, 9, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 7, 0, 7, 7, 8, 7, 7, 7, 7, 9, 7, 7, 7, 10, 7, 7, 9, 7, 7, 9, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0]);
var D56 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T32 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T33 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D59 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T34 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T35 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T36 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D63 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D64 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T37 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var D66 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T38 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var D68 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var NA2 = new RegExp(`[^()\\s"']`, "y");
var T39 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var T40 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var T41 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D73 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var NA3 = new RegExp("[\\s;]", "y");
var T42 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D76 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0]);
var T43 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]);
var D78 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0]);
var T44 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1]);
var D80 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0]);
var D81 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D82 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T45 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T46 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1]);
var T47 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T48 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D87 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T49 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var T50 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var T51 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var T52 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D92 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 2, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var NA4 = new RegExp(`[^()\\s,"']`, "y");
var T53 = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
var NA5 = new RegExp("[\\s,]", "y");
var T54 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T55 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var D98 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var T56 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
function createParser(A) {
  const A_angle = A["angle"];
  if (typeof A_angle !== "function") throw new Error("missing action angle");
  const A_argRun = A["argRun"];
  if (typeof A_argRun !== "function") throw new Error("missing action argRun");
  const A_atFunction = A["atFunction"];
  if (typeof A_atFunction !== "function") throw new Error("missing action atFunction");
  const A_atKeyframes = A["atKeyframes"];
  if (typeof A_atKeyframes !== "function") throw new Error("missing action atKeyframes");
  const A_atName = A["atName"];
  if (typeof A_atName !== "function") throw new Error("missing action atName");
  const A_atOther = A["atOther"];
  if (typeof A_atOther !== "function") throw new Error("missing action atOther");
  const A_atProperty = A["atProperty"];
  if (typeof A_atProperty !== "function") throw new Error("missing action atProperty");
  const A_atRest = A["atRest"];
  if (typeof A_atRest !== "function") throw new Error("missing action atRest");
  const A_atScope = A["atScope"];
  if (typeof A_atScope !== "function") throw new Error("missing action atScope");
  const A_atScrollTimeline = A["atScrollTimeline"];
  if (typeof A_atScrollTimeline !== "function") throw new Error("missing action atScrollTimeline");
  const A_atStartingStyle = A["atStartingStyle"];
  if (typeof A_atStartingStyle !== "function") throw new Error("missing action atStartingStyle");
  const A_atViewTimeline = A["atViewTimeline"];
  if (typeof A_atViewTimeline !== "function") throw new Error("missing action atViewTimeline");
  const A_badTerm = A["badTerm"];
  if (typeof A_badTerm !== "function") throw new Error("missing action badTerm");
  const A_blockTail = A["blockTail"];
  if (typeof A_blockTail !== "function") throw new Error("missing action blockTail");
  const A_calc = A["calc"];
  if (typeof A_calc !== "function") throw new Error("missing action calc");
  const A_calcConstant = A["calcConstant"];
  if (typeof A_calcConstant !== "function") throw new Error("missing action calcConstant");
  const A_calcKeyword = A["calcKeyword"];
  if (typeof A_calcKeyword !== "function") throw new Error("missing action calcKeyword");
  const A_calcProduct = A["calcProduct"];
  if (typeof A_calcProduct !== "function") throw new Error("missing action calcProduct");
  const A_calcSum = A["calcSum"];
  if (typeof A_calcSum !== "function") throw new Error("missing action calcSum");
  const A_call = A["call"];
  if (typeof A_call !== "function") throw new Error("missing action call");
  const A_clampFn = A["clampFn"];
  if (typeof A_clampFn !== "function") throw new Error("missing action clampFn");
  const A_colonRun = A["colonRun"];
  if (typeof A_colonRun !== "function") throw new Error("missing action colonRun");
  const A_colorCall = A["colorCall"];
  if (typeof A_colorCall !== "function") throw new Error("missing action colorCall");
  const A_colorFn = A["colorFn"];
  if (typeof A_colorFn !== "function") throw new Error("missing action colorFn");
  const A_colorKeyword = A["colorKeyword"];
  if (typeof A_colorKeyword !== "function") throw new Error("missing action colorKeyword");
  const A_colorMix = A["colorMix"];
  if (typeof A_colorMix !== "function") throw new Error("missing action colorMix");
  const A_commaItems = A["commaItems"];
  if (typeof A_commaItems !== "function") throw new Error("missing action commaItems");
  const A_commaList = A["commaList"];
  if (typeof A_commaList !== "function") throw new Error("missing action commaList");
  const A_commaRun = A["commaRun"];
  if (typeof A_commaRun !== "function") throw new Error("missing action commaRun");
  const A_commaSpans = A["commaSpans"];
  if (typeof A_commaSpans !== "function") throw new Error("missing action commaSpans");
  const A_cubicBezier = A["cubicBezier"];
  if (typeof A_cubicBezier !== "function") throw new Error("missing action cubicBezier");
  const A_declImportant = A["declImportant"];
  if (typeof A_declImportant !== "function") throw new Error("missing action declImportant");
  const A_declName = A["declName"];
  if (typeof A_declName !== "function") throw new Error("missing action declName");
  const A_declValue = A["declValue"];
  if (typeof A_declValue !== "function") throw new Error("missing action declValue");
  const A_declaration = A["declaration"];
  if (typeof A_declaration !== "function") throw new Error("missing action declaration");
  const A_dimension = A["dimension"];
  if (typeof A_dimension !== "function") throw new Error("missing action dimension");
  const A_functionHead = A["functionHead"];
  if (typeof A_functionHead !== "function") throw new Error("missing action functionHead");
  const A_functionName = A["functionName"];
  if (typeof A_functionName !== "function") throw new Error("missing action functionName");
  const A_functionParam = A["functionParam"];
  if (typeof A_functionParam !== "function") throw new Error("missing action functionParam");
  const A_functionParams = A["functionParams"];
  if (typeof A_functionParams !== "function") throw new Error("missing action functionParams");
  const A_hex = A["hex"];
  if (typeof A_hex !== "function") throw new Error("missing action hex");
  const A_hslLegacy = A["hslLegacy"];
  if (typeof A_hslLegacy !== "function") throw new Error("missing action hslLegacy");
  const A_hslModern = A["hslModern"];
  if (typeof A_hslModern !== "function") throw new Error("missing action hslModern");
  const A_hwbFn = A["hwbFn"];
  if (typeof A_hwbFn !== "function") throw new Error("missing action hwbFn");
  const A_identTerm = A["identTerm"];
  if (typeof A_identTerm !== "function") throw new Error("missing action identTerm");
  const A_labFn = A["labFn"];
  if (typeof A_labFn !== "function") throw new Error("missing action labFn");
  const A_lchFn = A["lchFn"];
  if (typeof A_lchFn !== "function") throw new Error("missing action lchFn");
  const A_lightDark = A["lightDark"];
  if (typeof A_lightDark !== "function") throw new Error("missing action lightDark");
  const A_linearFn = A["linearFn"];
  if (typeof A_linearFn !== "function") throw new Error("missing action linearFn");
  const A_linearStop = A["linearStop"];
  if (typeof A_linearStop !== "function") throw new Error("missing action linearStop");
  const A_listComma = A["listComma"];
  if (typeof A_listComma !== "function") throw new Error("missing action listComma");
  const A_minMax = A["minMax"];
  if (typeof A_minMax !== "function") throw new Error("missing action minMax");
  const A_mixLead = A["mixLead"];
  if (typeof A_mixLead !== "function") throw new Error("missing action mixLead");
  const A_mixPolar = A["mixPolar"];
  if (typeof A_mixPolar !== "function") throw new Error("missing action mixPolar");
  const A_mixRect = A["mixRect"];
  if (typeof A_mixRect !== "function") throw new Error("missing action mixRect");
  const A_mixTrail = A["mixTrail"];
  if (typeof A_mixTrail !== "function") throw new Error("missing action mixTrail");
  const A_none = A["none"];
  if (typeof A_none !== "function") throw new Error("missing action none");
  const A_number = A["number"];
  if (typeof A_number !== "function") throw new Error("missing action number");
  const A_numeric = A["numeric"];
  if (typeof A_numeric !== "function") throw new Error("missing action numeric");
  const A_oklabFn = A["oklabFn"];
  if (typeof A_oklabFn !== "function") throw new Error("missing action oklabFn");
  const A_oklchFn = A["oklchFn"];
  if (typeof A_oklchFn !== "function") throw new Error("missing action oklchFn");
  const A_openBlock = A["openBlock"];
  if (typeof A_openBlock !== "function") throw new Error("missing action openBlock");
  const A_openComment = A["openComment"];
  if (typeof A_openComment !== "function") throw new Error("missing action openComment");
  const A_openRule = A["openRule"];
  if (typeof A_openRule !== "function") throw new Error("missing action openRule");
  const A_operator = A["operator"];
  if (typeof A_operator !== "function") throw new Error("missing action operator");
  const A_paramDefault = A["paramDefault"];
  if (typeof A_paramDefault !== "function") throw new Error("missing action paramDefault");
  const A_paramHead = A["paramHead"];
  if (typeof A_paramHead !== "function") throw new Error("missing action paramHead");
  const A_paramName = A["paramName"];
  if (typeof A_paramName !== "function") throw new Error("missing action paramName");
  const A_paramSyntax = A["paramSyntax"];
  if (typeof A_paramSyntax !== "function") throw new Error("missing action paramSyntax");
  const A_percentage = A["percentage"];
  if (typeof A_percentage !== "function") throw new Error("missing action percentage");
  const A_preludeRun = A["preludeRun"];
  if (typeof A_preludeRun !== "function") throw new Error("missing action preludeRun");
  const A_relativeColor = A["relativeColor"];
  if (typeof A_relativeColor !== "function") throw new Error("missing action relativeColor");
  const A_restText = A["restText"];
  if (typeof A_restText !== "function") throw new Error("missing action restText");
  const A_rgbLegacyNum = A["rgbLegacyNum"];
  if (typeof A_rgbLegacyNum !== "function") throw new Error("missing action rgbLegacyNum");
  const A_rgbLegacyPct = A["rgbLegacyPct"];
  if (typeof A_rgbLegacyPct !== "function") throw new Error("missing action rgbLegacyPct");
  const A_rgbModern = A["rgbModern"];
  if (typeof A_rgbModern !== "function") throw new Error("missing action rgbModern");
  const A_ruleBlock = A["ruleBlock"];
  if (typeof A_ruleBlock !== "function") throw new Error("missing action ruleBlock");
  const A_ruleList = A["ruleList"];
  if (typeof A_ruleList !== "function") throw new Error("missing action ruleList");
  const A_scalarTerm = A["scalarTerm"];
  if (typeof A_scalarTerm !== "function") throw new Error("missing action scalarTerm");
  const A_scopeGroup = A["scopeGroup"];
  if (typeof A_scopeGroup !== "function") throw new Error("missing action scopeGroup");
  const A_scopeLimit = A["scopeLimit"];
  if (typeof A_scopeLimit !== "function") throw new Error("missing action scopeLimit");
  const A_scopePrelude = A["scopePrelude"];
  if (typeof A_scopePrelude !== "function") throw new Error("missing action scopePrelude");
  const A_selectorKeyword = A["selectorKeyword"];
  if (typeof A_selectorKeyword !== "function") throw new Error("missing action selectorKeyword");
  const A_selectorNamed = A["selectorNamed"];
  if (typeof A_selectorNamed !== "function") throw new Error("missing action selectorNamed");
  const A_semiItems = A["semiItems"];
  if (typeof A_semiItems !== "function") throw new Error("missing action semiItems");
  const A_semiRun = A["semiRun"];
  if (typeof A_semiRun !== "function") throw new Error("missing action semiRun");
  const A_semiTail = A["semiTail"];
  if (typeof A_semiTail !== "function") throw new Error("missing action semiTail");
  const A_signAbs = A["signAbs"];
  if (typeof A_signAbs !== "function") throw new Error("missing action signAbs");
  const A_slashList = A["slashList"];
  if (typeof A_slashList !== "function") throw new Error("missing action slashList");
  const A_spaceItems = A["spaceItems"];
  if (typeof A_spaceItems !== "function") throw new Error("missing action spaceItems");
  const A_spaceList = A["spaceList"];
  if (typeof A_spaceList !== "function") throw new Error("missing action spaceList");
  const A_spaceRun = A["spaceRun"];
  if (typeof A_spaceRun !== "function") throw new Error("missing action spaceRun");
  const A_stepsFn = A["stepsFn"];
  if (typeof A_stepsFn !== "function") throw new Error("missing action stepsFn");
  const A_string = A["string"];
  if (typeof A_string !== "function") throw new Error("missing action string");
  const A_syntaxAlts = A["syntaxAlts"];
  if (typeof A_syntaxAlts !== "function") throw new Error("missing action syntaxAlts");
  const A_syntaxCore = A["syntaxCore"];
  if (typeof A_syntaxCore !== "function") throw new Error("missing action syntaxCore");
  const A_syntaxPart = A["syntaxPart"];
  if (typeof A_syntaxPart !== "function") throw new Error("missing action syntaxPart");
  const A_syntaxText = A["syntaxText"];
  if (typeof A_syntaxText !== "function") throw new Error("missing action syntaxText");
  const A_timelineArgs = A["timelineArgs"];
  if (typeof A_timelineArgs !== "function") throw new Error("missing action timelineArgs");
  const A_timingKeyword = A["timingKeyword"];
  if (typeof A_timingKeyword !== "function") throw new Error("missing action timingKeyword");
  const A_varCall = A["varCall"];
  if (typeof A_varCall !== "function") throw new Error("missing action varCall");
  const A_varFn = A["varFn"];
  if (typeof A_varFn !== "function") throw new Error("missing action varFn");
  let src = "", pos = 0, len = 0, GEN = 0;
  function h5() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T9[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h6() {
    let v;
    L7: {
      const s8 = pos;
      let t9;
      if (src.charCodeAt(pos) === 40) {
        pos += 1;
        t9 = "(";
      } else t9 = FAIL;
      if (t9 === FAIL) {
        v = FAIL;
        break L7;
      }
      let t10;
      t10 = r_balanced();
      if (t10 === FAIL) {
        pos = s8;
        v = FAIL;
        break L7;
      }
      let t11;
      if (src.charCodeAt(pos) === 41) {
        pos += 1;
        t11 = ")";
      } else t11 = FAIL;
      if (t11 === FAIL) {
        pos = s8;
        v = FAIL;
        break L7;
      }
      const a12 = [];
      a12.push(t9);
      if (t10 !== void 0) a12.push(t10);
      a12.push(t11);
      v = a12;
    }
    return v;
  }
  function h343() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T10[c] === 1 : pos < len) {
        RE30.lastIndex = pos;
        if (RE30.test(src)) {
          const e = RE30.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function h344() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T23[c] === 1 : pos < len) {
        RE31.lastIndex = pos;
        if (RE31.test(src)) {
          const e = RE31.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function h626() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T9[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h631() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T37[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h649() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T38[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h667() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T39[c] === 0 : !(NA2.lastIndex = e, NA2.test(src))) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h686() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T42[c] === 0 : !(NA3.lastIndex = e, NA3.test(src))) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h691() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T43[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h696() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T44[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h697() {
    let v;
    L698: {
      const s699 = pos;
      let t700;
      if (src.charCodeAt(pos) === 123) {
        pos += 1;
        t700 = "{";
      } else t700 = FAIL;
      if (t700 === FAIL) {
        v = FAIL;
        break L698;
      }
      let t701;
      t701 = r_blockBody();
      if (t701 === FAIL) {
        pos = s699;
        v = FAIL;
        break L698;
      }
      let t702;
      if (src.charCodeAt(pos) === 125) {
        pos += 1;
        t702 = "}";
      } else t702 = FAIL;
      if (t702 === FAIL) {
        pos = s699;
        v = FAIL;
        break L698;
      }
      const a703 = [];
      a703.push(t700);
      if (t701 !== void 0) a703.push(t701);
      a703.push(t702);
      v = a703;
    }
    return v;
  }
  function h849() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T49[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h894() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T53[c] === 0 : !(NA4.lastIndex = e, NA4.test(src))) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function h923() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T4[c] === 1 : pos < len) {
        RE77.lastIndex = pos;
        if (RE77.test(src)) {
          const e = RE77.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function h924() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T56[c] === 1 : pos < len) {
        RE78.lastIndex = pos;
        if (RE78.test(src)) {
          const e = RE78.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_ws() {
    let v;
    let t0;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T0[c] === 0 : !(NA0.lastIndex = e, NA0.test(src))) break;
      }
      if (e > pos) {
        t0 = src.substring(pos, e);
        pos = e;
      } else t0 = void 0;
    } else t0 = FAIL;
    v = t0 === FAIL ? void 0 : t0;
    return v;
  }
  function r_ws1() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T0[c] === 0 : !(NA0.lastIndex = e, NA0.test(src))) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function r_comma() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T1[c] === 1 : pos < len) {
        RE0.lastIndex = pos;
        if (RE0.test(src)) {
          const e = RE0.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_slash() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T2[c] === 1 : pos < len) {
        RE1.lastIndex = pos;
        if (RE1.test(src)) {
          const e = RE1.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_close() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T3[c] === 1 : pos < len) {
        RE2.lastIndex = pos;
        if (RE2.test(src)) {
          const e = RE2.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_number() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T4[c] === 1 : pos < len) {
        RE3.lastIndex = pos;
        if (RE3.test(src)) {
          const e = RE3.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_number(v);
  }
  function r_percentage() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T4[c] === 1 : pos < len) {
        RE4.lastIndex = pos;
        if (RE4.test(src)) {
          const e = RE4.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_percentage(v);
  }
  function r_dimension() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T4[c] === 1 : pos < len) {
        RE5.lastIndex = pos;
        if (RE5.test(src)) {
          const e = RE5.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_dimension(v);
  }
  function r_angle() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T4[c] === 1 : pos < len) {
        RE6.lastIndex = pos;
        if (RE6.test(src)) {
          const e = RE6.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_angle(v);
  }
  function r_none() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T5[c] === 1 : pos < len) {
        RE7.lastIndex = pos;
        if (RE7.test(src)) {
          const e = RE7.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_none(v);
  }
  function r_ident() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T6[c] === 1 : pos < len) {
        RE8.lastIndex = pos;
        if (RE8.test(src)) {
          const e = RE8.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_dashedIdent() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T7[c] === 1 : pos < len) {
        RE9.lastIndex = pos;
        if (RE9.test(src)) {
          const e = RE9.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_string() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T8[c] === 1 : pos < len) {
        RE10.lastIndex = pos;
        if (RE10.test(src)) {
          const e = RE10.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_string(v);
  }
  function r_balanced() {
    let v;
    {
      const a3 = [];
      for (; ; ) {
        const s2 = pos;
        let t1;
        {
          const c = src.charCodeAt(pos);
          let t4;
          switch (c < 128 ? D10[c] : 3) {
            case 0:
              t4 = h5();
              if (t4 !== FAIL) {
                t1 = t4;
                break;
              }
              t1 = FAIL;
              break;
            case 1:
              t4 = r_string();
              if (t4 !== FAIL) {
                t1 = t4;
                break;
              }
              t1 = FAIL;
              break;
            case 2:
              t4 = h6();
              if (t4 !== FAIL) {
                t1 = t4;
                break;
              }
              t1 = FAIL;
              break;
            case 3:
              t1 = FAIL;
              break;
          }
        }
        if (t1 === FAIL || pos === s2) break;
        a3.push(t1);
      }
      v = a3;
    }
    return v;
  }
  function r_mathFn() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t13;
      switch (c < 128 ? D12[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t13 = r_signAbs();
          if (t13 !== FAIL) {
            v = t13;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t13 = r_calc();
          if (t13 !== FAIL) {
            v = t13;
            break;
          }
          t13 = r_clampFn();
          if (t13 !== FAIL) {
            v = t13;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t13 = r_varFn();
          if (t13 !== FAIL) {
            v = t13;
            break;
          }
          v = FAIL;
          break;
        case 4:
          t13 = r_minMax();
          if (t13 !== FAIL) {
            v = t13;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_calc() {
    let v;
    {
      const s16 = pos;
      let t14;
      {
        const s19 = pos;
        let t17;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T10[c] === 1 : pos < len) {
            RE11.lastIndex = pos;
            if (RE11.test(src)) {
              const e = RE11.lastIndex;
              if (e > pos) {
                t17 = 0;
                pos = e;
              } else t17 = 0;
            } else t17 = FAIL;
          } else t17 = FAIL;
        }
        if (t17 === FAIL) t14 = FAIL;
        else {
          let t18;
          t18 = r_calcSum();
          if (t18 === FAIL) {
            pos = s19;
            t14 = FAIL;
          } else t14 = t18;
        }
      }
      if (t14 === FAIL) v = FAIL;
      else {
        let t15;
        t15 = q_close();
        if (t15 === FAIL) {
          pos = s16;
          v = FAIL;
        } else v = t14;
      }
    }
    return v === FAIL ? FAIL : A_calc(v);
  }
  function r_minMax() {
    let v;
    L20: {
      const s21 = pos;
      let t22;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T11[c] === 1 : pos < len) {
          RE12.lastIndex = pos;
          if (RE12.test(src)) {
            const e = RE12.lastIndex;
            if (e > pos) {
              t22 = src.substring(pos, e);
              pos = e;
            } else t22 = void 0;
          } else t22 = FAIL;
        } else t22 = FAIL;
      }
      if (t22 === FAIL) {
        v = FAIL;
        break L20;
      }
      let t23;
      {
        const s27 = pos;
        let t25;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T12[c] === 1 : pos < len) {
            RE13.lastIndex = pos;
            if (RE13.test(src)) {
              const e = RE13.lastIndex;
              if (e > pos) {
                t25 = 0;
                pos = e;
              } else t25 = 0;
            } else t25 = FAIL;
          } else t25 = FAIL;
        }
        if (t25 === FAIL) t23 = FAIL;
        else {
          let t26;
          t26 = r_calcSum();
          if (t26 === FAIL) {
            pos = s27;
            t23 = FAIL;
          } else t23 = t26;
        }
      }
      if (t23 === FAIL) {
        pos = s21;
        v = FAIL;
        break L20;
      }
      let t24;
      {
        const s30 = pos;
        let t28;
        {
          const a33 = [];
          for (; ; ) {
            const s32 = pos;
            let t31;
            {
              const s36 = pos;
              let t34;
              t34 = q_comma();
              if (t34 === FAIL) t31 = FAIL;
              else {
                let t35;
                t35 = r_calcSum();
                if (t35 === FAIL) {
                  pos = s36;
                  t31 = FAIL;
                } else t31 = t35;
              }
            }
            if (t31 === FAIL || pos === s32) break;
            a33.push(t31);
          }
          t28 = a33;
        }
        if (t28 === FAIL) t24 = FAIL;
        else {
          let t29;
          t29 = q_close();
          if (t29 === FAIL) {
            pos = s30;
            t24 = FAIL;
          } else t24 = t28;
        }
      }
      if (t24 === FAIL) {
        pos = s21;
        v = FAIL;
        break L20;
      }
      const a37 = [];
      if (t22 !== void 0) a37.push(t22);
      if (t23 !== void 0) a37.push(t23);
      a37.push(t24);
      v = a37;
    }
    return v === FAIL ? FAIL : A_minMax(v);
  }
  function r_clampFn() {
    let v;
    L38: {
      const s39 = pos;
      let t40;
      {
        const s45 = pos;
        let t43;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T10[c] === 1 : pos < len) {
            RE14.lastIndex = pos;
            if (RE14.test(src)) {
              const e = RE14.lastIndex;
              if (e > pos) {
                t43 = 0;
                pos = e;
              } else t43 = 0;
            } else t43 = FAIL;
          } else t43 = FAIL;
        }
        if (t43 === FAIL) t40 = FAIL;
        else {
          let t44;
          t44 = r_calcSum();
          if (t44 === FAIL) {
            pos = s45;
            t40 = FAIL;
          } else t40 = t44;
        }
      }
      if (t40 === FAIL) {
        v = FAIL;
        break L38;
      }
      let t41;
      {
        const s48 = pos;
        let t46;
        t46 = q_comma();
        if (t46 === FAIL) t41 = FAIL;
        else {
          let t47;
          t47 = r_calcSum();
          if (t47 === FAIL) {
            pos = s48;
            t41 = FAIL;
          } else t41 = t47;
        }
      }
      if (t41 === FAIL) {
        pos = s39;
        v = FAIL;
        break L38;
      }
      let t42;
      {
        const s51 = pos;
        let t49;
        {
          const s54 = pos;
          let t52;
          t52 = q_comma();
          if (t52 === FAIL) t49 = FAIL;
          else {
            let t53;
            t53 = r_calcSum();
            if (t53 === FAIL) {
              pos = s54;
              t49 = FAIL;
            } else t49 = t53;
          }
        }
        if (t49 === FAIL) t42 = FAIL;
        else {
          let t50;
          t50 = q_close();
          if (t50 === FAIL) {
            pos = s51;
            t42 = FAIL;
          } else t42 = t49;
        }
      }
      if (t42 === FAIL) {
        pos = s39;
        v = FAIL;
        break L38;
      }
      const a55 = [];
      if (t40 !== void 0) a55.push(t40);
      if (t41 !== void 0) a55.push(t41);
      if (t42 !== void 0) a55.push(t42);
      v = a55;
    }
    return v === FAIL ? FAIL : A_clampFn(v);
  }
  function r_signAbs() {
    let v;
    L56: {
      const s57 = pos;
      let t58;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T13[c] === 1 : pos < len) {
          RE15.lastIndex = pos;
          if (RE15.test(src)) {
            const e = RE15.lastIndex;
            if (e > pos) {
              t58 = src.substring(pos, e);
              pos = e;
            } else t58 = void 0;
          } else t58 = FAIL;
        } else t58 = FAIL;
      }
      if (t58 === FAIL) {
        v = FAIL;
        break L56;
      }
      let t59;
      {
        const s62 = pos;
        let t60;
        {
          const s65 = pos;
          let t63;
          {
            const c = src.charCodeAt(pos);
            if (c < 128 ? T12[c] === 1 : pos < len) {
              RE13.lastIndex = pos;
              if (RE13.test(src)) {
                const e = RE13.lastIndex;
                if (e > pos) {
                  t63 = 0;
                  pos = e;
                } else t63 = 0;
              } else t63 = FAIL;
            } else t63 = FAIL;
          }
          if (t63 === FAIL) t60 = FAIL;
          else {
            let t64;
            t64 = r_calcSum();
            if (t64 === FAIL) {
              pos = s65;
              t60 = FAIL;
            } else t60 = t64;
          }
        }
        if (t60 === FAIL) t59 = FAIL;
        else {
          let t61;
          t61 = q_close();
          if (t61 === FAIL) {
            pos = s62;
            t59 = FAIL;
          } else t59 = t60;
        }
      }
      if (t59 === FAIL) {
        pos = s57;
        v = FAIL;
        break L56;
      }
      const a66 = [];
      if (t58 !== void 0) a66.push(t58);
      if (t59 !== void 0) a66.push(t59);
      v = a66;
    }
    return v === FAIL ? FAIL : A_signAbs(v);
  }
  function r_calcSum() {
    let v;
    L67: {
      const s68 = pos;
      let t69;
      t69 = r_calcProduct();
      if (t69 === FAIL) {
        v = FAIL;
        break L67;
      }
      let t70;
      {
        const a73 = [];
        for (; ; ) {
          const s72 = pos;
          let t71;
          L74: {
            const s75 = pos;
            let t76;
            t76 = r_calcAddOp();
            if (t76 === FAIL) {
              t71 = FAIL;
              break L74;
            }
            let t77;
            t77 = r_calcProduct();
            if (t77 === FAIL) {
              pos = s75;
              t71 = FAIL;
              break L74;
            }
            const a78 = [];
            if (t76 !== void 0) a78.push(t76);
            if (t77 !== void 0) a78.push(t77);
            t71 = a78;
          }
          if (t71 === FAIL || pos === s72) break;
          a73.push(t71);
        }
        t70 = a73;
      }
      if (t70 === FAIL) {
        pos = s68;
        v = FAIL;
        break L67;
      }
      const a79 = [];
      if (t69 !== void 0) a79.push(t69);
      a79.push(t70);
      v = a79;
    }
    return v === FAIL ? FAIL : A_calcSum(v);
  }
  function r_calcAddOp() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T0[c] === 1 : pos < len) {
        RE16.lastIndex = pos;
        if (RE16.test(src)) {
          const e = RE16.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_calcProduct() {
    let v;
    L80: {
      const s81 = pos;
      let t82;
      t82 = r_calcValue();
      if (t82 === FAIL) {
        v = FAIL;
        break L80;
      }
      let t83;
      {
        const a86 = [];
        for (; ; ) {
          const s85 = pos;
          let t84;
          L87: {
            const s88 = pos;
            let t89;
            t89 = r_calcMulOp();
            if (t89 === FAIL) {
              t84 = FAIL;
              break L87;
            }
            let t90;
            t90 = r_calcValue();
            if (t90 === FAIL) {
              pos = s88;
              t84 = FAIL;
              break L87;
            }
            const a91 = [];
            if (t89 !== void 0) a91.push(t89);
            if (t90 !== void 0) a91.push(t90);
            t84 = a91;
          }
          if (t84 === FAIL || pos === s85) break;
          a86.push(t84);
        }
        t83 = a86;
      }
      if (t83 === FAIL) {
        pos = s81;
        v = FAIL;
        break L80;
      }
      const a92 = [];
      if (t82 !== void 0) a92.push(t82);
      a92.push(t83);
      v = a92;
    }
    return v === FAIL ? FAIL : A_calcProduct(v);
  }
  function r_calcMulOp() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T14[c] === 1 : pos < len) {
        RE17.lastIndex = pos;
        if (RE17.test(src)) {
          const e = RE17.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_calcValue() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t93;
      switch (c < 128 ? D18[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t93 = r_calcGroup();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t93 = r_percentage();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_angle();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_number();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_dimension();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t93 = r_calcConstant();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_percentage();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_angle();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_number();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_dimension();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          v = FAIL;
          break;
        case 4:
          t93 = r_mathFn();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_calcKeyword();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          v = FAIL;
          break;
        case 5:
          t93 = r_calcKeyword();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          v = FAIL;
          break;
        case 6:
          t93 = r_mathFn();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_calcConstant();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_calcKeyword();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          v = FAIL;
          break;
        case 7:
          t93 = r_calcConstant();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          t93 = r_calcKeyword();
          if (t93 !== FAIL) {
            v = t93;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_calcGroup() {
    let v;
    {
      const s96 = pos;
      let t94;
      {
        const s99 = pos;
        let t97;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T12[c] === 1 : pos < len) {
            RE13.lastIndex = pos;
            if (RE13.test(src)) {
              const e = RE13.lastIndex;
              if (e > pos) {
                t97 = 0;
                pos = e;
              } else t97 = 0;
            } else t97 = FAIL;
          } else t97 = FAIL;
        }
        if (t97 === FAIL) t94 = FAIL;
        else {
          let t98;
          t98 = r_calcSum();
          if (t98 === FAIL) {
            pos = s99;
            t94 = FAIL;
          } else t94 = t98;
        }
      }
      if (t94 === FAIL) v = FAIL;
      else {
        let t95;
        t95 = q_close();
        if (t95 === FAIL) {
          pos = s96;
          v = FAIL;
        } else v = t94;
      }
    }
    return v;
  }
  function r_calcConstant() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T15[c] === 1 : pos < len) {
        RE18.lastIndex = pos;
        if (RE18.test(src)) {
          const e = RE18.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_calcConstant(v);
  }
  function r_calcKeyword() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T16[c] === 1 : pos < len) {
        RE19.lastIndex = pos;
        if (RE19.test(src)) {
          const e = RE19.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_calcKeyword(v);
  }
  function r_varFn() {
    let v;
    L100: {
      const s101 = pos;
      let t102;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T17[c] === 1 : pos < len) {
          RE20.lastIndex = pos;
          if (RE20.test(src)) {
            const e = RE20.lastIndex;
            if (e > pos) {
              t102 = src.substring(pos, e);
              pos = e;
            } else t102 = void 0;
          } else t102 = FAIL;
        } else t102 = FAIL;
      }
      if (t102 === FAIL) {
        v = FAIL;
        break L100;
      }
      let t103;
      {
        const s107 = pos;
        let t105;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T12[c] === 1 : pos < len) {
            RE13.lastIndex = pos;
            if (RE13.test(src)) {
              const e = RE13.lastIndex;
              if (e > pos) {
                t105 = 0;
                pos = e;
              } else t105 = 0;
            } else t105 = FAIL;
          } else t105 = FAIL;
        }
        if (t105 === FAIL) t103 = FAIL;
        else {
          let t106;
          {
            const c = src.charCodeAt(pos);
            let t108;
            switch (c < 128 ? D22[c] : 1) {
              case 0:
                t106 = FAIL;
                break;
              case 1:
                t108 = r_dashedIdent();
                if (t108 !== FAIL) {
                  t106 = t108;
                  break;
                }
                t108 = r_ident();
                if (t108 !== FAIL) {
                  t106 = t108;
                  break;
                }
                t106 = FAIL;
                break;
              case 2:
                t108 = r_ident();
                if (t108 !== FAIL) {
                  t106 = t108;
                  break;
                }
                t106 = FAIL;
                break;
            }
          }
          if (t106 === FAIL) {
            pos = s107;
            t103 = FAIL;
          } else t103 = t106;
        }
      }
      if (t103 === FAIL) {
        pos = s101;
        v = FAIL;
        break L100;
      }
      let t104;
      {
        const s111 = pos;
        let t109;
        let t112;
        {
          const s115 = pos;
          let t113;
          t113 = q_comma();
          if (t113 === FAIL) t112 = FAIL;
          else {
            let t114;
            t114 = r_balanced();
            if (t114 === FAIL) {
              pos = s115;
              t112 = FAIL;
            } else t112 = t114;
          }
        }
        t109 = t112 === FAIL ? void 0 : t112;
        if (t109 === FAIL) t104 = FAIL;
        else {
          let t110;
          t110 = q_close();
          if (t110 === FAIL) {
            pos = s111;
            t104 = FAIL;
          } else t104 = t109;
        }
      }
      if (t104 === FAIL) {
        pos = s101;
        v = FAIL;
        break L100;
      }
      const a116 = [];
      if (t102 !== void 0) a116.push(t102);
      if (t103 !== void 0) a116.push(t103);
      if (t104 !== void 0) a116.push(t104);
      v = a116;
    }
    return v === FAIL ? FAIL : A_varFn(v);
  }
  function r_color() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t117;
      switch (c < 128 ? D23[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t117 = r_hex();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t117 = r_colorKeyword();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t117 = r_colorMix();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_relativeColor();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_colorFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_colorKeyword();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
        case 4:
          t117 = r_varFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_colorKeyword();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
        case 5:
          t117 = r_relativeColor();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_hslFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_hwbFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_colorKeyword();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
        case 6:
          t117 = r_lightDark();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_relativeColor();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_labFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_lchFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_colorKeyword();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
        case 7:
          t117 = r_relativeColor();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_oklabFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_oklchFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_colorKeyword();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
        case 8:
          t117 = r_relativeColor();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_rgbFn();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          t117 = r_colorKeyword();
          if (t117 !== FAIL) {
            v = t117;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_component() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t118;
      switch (c < 128 ? D24[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t118 = r_percentage();
          if (t118 !== FAIL) {
            v = t118;
            break;
          }
          t118 = r_number();
          if (t118 !== FAIL) {
            v = t118;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t118 = r_mathFn();
          if (t118 !== FAIL) {
            v = t118;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t118 = r_none();
          if (t118 !== FAIL) {
            v = t118;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_hueValue() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t119;
      switch (c < 128 ? D25[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t119 = r_angle();
          if (t119 !== FAIL) {
            v = t119;
            break;
          }
          t119 = r_number();
          if (t119 !== FAIL) {
            v = t119;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t119 = r_mathFn();
          if (t119 !== FAIL) {
            v = t119;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t119 = r_none();
          if (t119 !== FAIL) {
            v = t119;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_alphaValue() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t120;
      switch (c < 128 ? D26[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t120 = r_percentage();
          if (t120 !== FAIL) {
            v = t120;
            break;
          }
          t120 = r_number();
          if (t120 !== FAIL) {
            v = t120;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t120 = r_mathFn();
          if (t120 !== FAIL) {
            v = t120;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t120 = r_none();
          if (t120 !== FAIL) {
            v = t120;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_alphaTail() {
    let v;
    let t121;
    {
      const s124 = pos;
      let t122;
      t122 = q_slash();
      if (t122 === FAIL) t121 = FAIL;
      else {
        let t123;
        t123 = r_alphaValue();
        if (t123 === FAIL) {
          pos = s124;
          t121 = FAIL;
        } else t121 = t123;
      }
    }
    v = t121 === FAIL ? void 0 : t121;
    return v;
  }
  function r_rgbFn() {
    let v;
    {
      const s127 = pos;
      let t125;
      {
        const s130 = pos;
        let t128;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T18[c] === 1 : pos < len) {
            RE21.lastIndex = pos;
            if (RE21.test(src)) {
              const e = RE21.lastIndex;
              if (e > pos) {
                t128 = 0;
                pos = e;
              } else t128 = 0;
            } else t128 = FAIL;
          } else t128 = FAIL;
        }
        if (t128 === FAIL) t125 = FAIL;
        else {
          let t129;
          {
            const c = src.charCodeAt(pos);
            let t131;
            switch (c < 128 ? D28[c] : 1) {
              case 0:
                t129 = FAIL;
                break;
              case 1:
                t131 = r_rgbModern();
                if (t131 !== FAIL) {
                  t129 = t131;
                  break;
                }
                t131 = r_rgbLegacyPct();
                if (t131 !== FAIL) {
                  t129 = t131;
                  break;
                }
                t131 = r_rgbLegacyNum();
                if (t131 !== FAIL) {
                  t129 = t131;
                  break;
                }
                t129 = FAIL;
                break;
              case 2:
                t131 = r_rgbModern();
                if (t131 !== FAIL) {
                  t129 = t131;
                  break;
                }
                t129 = FAIL;
                break;
            }
          }
          if (t129 === FAIL) {
            pos = s130;
            t125 = FAIL;
          } else t125 = t129;
        }
      }
      if (t125 === FAIL) v = FAIL;
      else {
        let t126;
        t126 = q_close();
        if (t126 === FAIL) {
          pos = s127;
          v = FAIL;
        } else v = t125;
      }
    }
    return v;
  }
  function r_rgbModern() {
    let v;
    L132: {
      const s133 = pos;
      let t134;
      t134 = r_component();
      if (t134 === FAIL) {
        v = FAIL;
        break L132;
      }
      let t135;
      {
        const s140 = pos;
        let t138;
        t138 = q_ws();
        if (t138 === FAIL) t135 = FAIL;
        else {
          let t139;
          t139 = r_component();
          if (t139 === FAIL) {
            pos = s140;
            t135 = FAIL;
          } else t135 = t139;
        }
      }
      if (t135 === FAIL) {
        pos = s133;
        v = FAIL;
        break L132;
      }
      let t136;
      {
        const s143 = pos;
        let t141;
        t141 = q_ws();
        if (t141 === FAIL) t136 = FAIL;
        else {
          let t142;
          t142 = r_component();
          if (t142 === FAIL) {
            pos = s143;
            t136 = FAIL;
          } else t136 = t142;
        }
      }
      if (t136 === FAIL) {
        pos = s133;
        v = FAIL;
        break L132;
      }
      let t137;
      t137 = r_alphaTail();
      if (t137 === FAIL) {
        pos = s133;
        v = FAIL;
        break L132;
      }
      const a144 = [];
      if (t134 !== void 0) a144.push(t134);
      if (t135 !== void 0) a144.push(t135);
      if (t136 !== void 0) a144.push(t136);
      if (t137 !== void 0) a144.push(t137);
      v = a144;
    }
    return v === FAIL ? FAIL : A_rgbModern(v);
  }
  function r_rgbLegacyPct() {
    let v;
    L145: {
      const s146 = pos;
      let t147;
      t147 = r_legacyPct();
      if (t147 === FAIL) {
        v = FAIL;
        break L145;
      }
      let t148;
      {
        const s153 = pos;
        let t151;
        t151 = q_comma();
        if (t151 === FAIL) t148 = FAIL;
        else {
          let t152;
          t152 = r_legacyPct();
          if (t152 === FAIL) {
            pos = s153;
            t148 = FAIL;
          } else t148 = t152;
        }
      }
      if (t148 === FAIL) {
        pos = s146;
        v = FAIL;
        break L145;
      }
      let t149;
      {
        const s156 = pos;
        let t154;
        t154 = q_comma();
        if (t154 === FAIL) t149 = FAIL;
        else {
          let t155;
          t155 = r_legacyPct();
          if (t155 === FAIL) {
            pos = s156;
            t149 = FAIL;
          } else t149 = t155;
        }
      }
      if (t149 === FAIL) {
        pos = s146;
        v = FAIL;
        break L145;
      }
      let t150;
      t150 = r_legacyAlpha();
      if (t150 === FAIL) {
        pos = s146;
        v = FAIL;
        break L145;
      }
      const a157 = [];
      if (t147 !== void 0) a157.push(t147);
      if (t148 !== void 0) a157.push(t148);
      if (t149 !== void 0) a157.push(t149);
      if (t150 !== void 0) a157.push(t150);
      v = a157;
    }
    return v === FAIL ? FAIL : A_rgbLegacyPct(v);
  }
  function r_rgbLegacyNum() {
    let v;
    L158: {
      const s159 = pos;
      let t160;
      t160 = r_legacyNum();
      if (t160 === FAIL) {
        v = FAIL;
        break L158;
      }
      let t161;
      {
        const s166 = pos;
        let t164;
        t164 = q_comma();
        if (t164 === FAIL) t161 = FAIL;
        else {
          let t165;
          t165 = r_legacyNum();
          if (t165 === FAIL) {
            pos = s166;
            t161 = FAIL;
          } else t161 = t165;
        }
      }
      if (t161 === FAIL) {
        pos = s159;
        v = FAIL;
        break L158;
      }
      let t162;
      {
        const s169 = pos;
        let t167;
        t167 = q_comma();
        if (t167 === FAIL) t162 = FAIL;
        else {
          let t168;
          t168 = r_legacyNum();
          if (t168 === FAIL) {
            pos = s169;
            t162 = FAIL;
          } else t162 = t168;
        }
      }
      if (t162 === FAIL) {
        pos = s159;
        v = FAIL;
        break L158;
      }
      let t163;
      t163 = r_legacyAlpha();
      if (t163 === FAIL) {
        pos = s159;
        v = FAIL;
        break L158;
      }
      const a170 = [];
      if (t160 !== void 0) a170.push(t160);
      if (t161 !== void 0) a170.push(t161);
      if (t162 !== void 0) a170.push(t162);
      if (t163 !== void 0) a170.push(t163);
      v = a170;
    }
    return v === FAIL ? FAIL : A_rgbLegacyNum(v);
  }
  function r_legacyPct() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t171;
      switch (c < 128 ? D29[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t171 = r_percentage();
          if (t171 !== FAIL) {
            v = t171;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t171 = r_mathFn();
          if (t171 !== FAIL) {
            v = t171;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_legacyNum() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t172;
      switch (c < 128 ? D30[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t172 = r_number();
          if (t172 !== FAIL) {
            v = t172;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t172 = r_mathFn();
          if (t172 !== FAIL) {
            v = t172;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_legacyHue() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t173;
      switch (c < 128 ? D31[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t173 = r_angle();
          if (t173 !== FAIL) {
            v = t173;
            break;
          }
          t173 = r_number();
          if (t173 !== FAIL) {
            v = t173;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t173 = r_mathFn();
          if (t173 !== FAIL) {
            v = t173;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_legacyAlpha() {
    let v;
    let t174;
    {
      const s177 = pos;
      let t175;
      t175 = q_comma();
      if (t175 === FAIL) t174 = FAIL;
      else {
        let t176;
        {
          const c = src.charCodeAt(pos);
          let t178;
          switch (c < 128 ? D32[c] : 0) {
            case 0:
              t176 = FAIL;
              break;
            case 1:
              t178 = r_percentage();
              if (t178 !== FAIL) {
                t176 = t178;
                break;
              }
              t178 = r_number();
              if (t178 !== FAIL) {
                t176 = t178;
                break;
              }
              t176 = FAIL;
              break;
            case 2:
              t178 = r_mathFn();
              if (t178 !== FAIL) {
                t176 = t178;
                break;
              }
              t176 = FAIL;
              break;
          }
        }
        if (t176 === FAIL) {
          pos = s177;
          t174 = FAIL;
        } else t174 = t176;
      }
    }
    v = t174 === FAIL ? void 0 : t174;
    return v;
  }
  function r_hslFn() {
    let v;
    {
      const s181 = pos;
      let t179;
      {
        const s184 = pos;
        let t182;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T19[c] === 1 : pos < len) {
            RE22.lastIndex = pos;
            if (RE22.test(src)) {
              const e = RE22.lastIndex;
              if (e > pos) {
                t182 = 0;
                pos = e;
              } else t182 = 0;
            } else t182 = FAIL;
          } else t182 = FAIL;
        }
        if (t182 === FAIL) t179 = FAIL;
        else {
          let t183;
          {
            const c = src.charCodeAt(pos);
            let t185;
            switch (c < 128 ? D34[c] : 1) {
              case 0:
                t183 = FAIL;
                break;
              case 1:
                t185 = r_hslModern();
                if (t185 !== FAIL) {
                  t183 = t185;
                  break;
                }
                t185 = r_hslLegacy();
                if (t185 !== FAIL) {
                  t183 = t185;
                  break;
                }
                t183 = FAIL;
                break;
              case 2:
                t185 = r_hslModern();
                if (t185 !== FAIL) {
                  t183 = t185;
                  break;
                }
                t183 = FAIL;
                break;
            }
          }
          if (t183 === FAIL) {
            pos = s184;
            t179 = FAIL;
          } else t179 = t183;
        }
      }
      if (t179 === FAIL) v = FAIL;
      else {
        let t180;
        t180 = q_close();
        if (t180 === FAIL) {
          pos = s181;
          v = FAIL;
        } else v = t179;
      }
    }
    return v;
  }
  function r_hslModern() {
    let v;
    L186: {
      const s187 = pos;
      let t188;
      t188 = r_hueValue();
      if (t188 === FAIL) {
        v = FAIL;
        break L186;
      }
      let t189;
      {
        const s194 = pos;
        let t192;
        t192 = q_ws();
        if (t192 === FAIL) t189 = FAIL;
        else {
          let t193;
          t193 = r_component();
          if (t193 === FAIL) {
            pos = s194;
            t189 = FAIL;
          } else t189 = t193;
        }
      }
      if (t189 === FAIL) {
        pos = s187;
        v = FAIL;
        break L186;
      }
      let t190;
      {
        const s197 = pos;
        let t195;
        t195 = q_ws();
        if (t195 === FAIL) t190 = FAIL;
        else {
          let t196;
          t196 = r_component();
          if (t196 === FAIL) {
            pos = s197;
            t190 = FAIL;
          } else t190 = t196;
        }
      }
      if (t190 === FAIL) {
        pos = s187;
        v = FAIL;
        break L186;
      }
      let t191;
      t191 = r_alphaTail();
      if (t191 === FAIL) {
        pos = s187;
        v = FAIL;
        break L186;
      }
      const a198 = [];
      if (t188 !== void 0) a198.push(t188);
      if (t189 !== void 0) a198.push(t189);
      if (t190 !== void 0) a198.push(t190);
      if (t191 !== void 0) a198.push(t191);
      v = a198;
    }
    return v === FAIL ? FAIL : A_hslModern(v);
  }
  function r_hslLegacy() {
    let v;
    L199: {
      const s200 = pos;
      let t201;
      t201 = r_legacyHue();
      if (t201 === FAIL) {
        v = FAIL;
        break L199;
      }
      let t202;
      {
        const s207 = pos;
        let t205;
        t205 = q_comma();
        if (t205 === FAIL) t202 = FAIL;
        else {
          let t206;
          t206 = r_legacyPct();
          if (t206 === FAIL) {
            pos = s207;
            t202 = FAIL;
          } else t202 = t206;
        }
      }
      if (t202 === FAIL) {
        pos = s200;
        v = FAIL;
        break L199;
      }
      let t203;
      {
        const s210 = pos;
        let t208;
        t208 = q_comma();
        if (t208 === FAIL) t203 = FAIL;
        else {
          let t209;
          t209 = r_legacyPct();
          if (t209 === FAIL) {
            pos = s210;
            t203 = FAIL;
          } else t203 = t209;
        }
      }
      if (t203 === FAIL) {
        pos = s200;
        v = FAIL;
        break L199;
      }
      let t204;
      t204 = r_legacyAlpha();
      if (t204 === FAIL) {
        pos = s200;
        v = FAIL;
        break L199;
      }
      const a211 = [];
      if (t201 !== void 0) a211.push(t201);
      if (t202 !== void 0) a211.push(t202);
      if (t203 !== void 0) a211.push(t203);
      if (t204 !== void 0) a211.push(t204);
      v = a211;
    }
    return v === FAIL ? FAIL : A_hslLegacy(v);
  }
  function r_hwbFn() {
    let v;
    L212: {
      const s213 = pos;
      let t214;
      {
        const s220 = pos;
        let t218;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T19[c] === 1 : pos < len) {
            RE23.lastIndex = pos;
            if (RE23.test(src)) {
              const e = RE23.lastIndex;
              if (e > pos) {
                t218 = 0;
                pos = e;
              } else t218 = 0;
            } else t218 = FAIL;
          } else t218 = FAIL;
        }
        if (t218 === FAIL) t214 = FAIL;
        else {
          let t219;
          t219 = r_hueValue();
          if (t219 === FAIL) {
            pos = s220;
            t214 = FAIL;
          } else t214 = t219;
        }
      }
      if (t214 === FAIL) {
        v = FAIL;
        break L212;
      }
      let t215;
      {
        const s223 = pos;
        let t221;
        t221 = q_ws();
        if (t221 === FAIL) t215 = FAIL;
        else {
          let t222;
          t222 = r_component();
          if (t222 === FAIL) {
            pos = s223;
            t215 = FAIL;
          } else t215 = t222;
        }
      }
      if (t215 === FAIL) {
        pos = s213;
        v = FAIL;
        break L212;
      }
      let t216;
      {
        const s226 = pos;
        let t224;
        t224 = q_ws();
        if (t224 === FAIL) t216 = FAIL;
        else {
          let t225;
          t225 = r_component();
          if (t225 === FAIL) {
            pos = s226;
            t216 = FAIL;
          } else t216 = t225;
        }
      }
      if (t216 === FAIL) {
        pos = s213;
        v = FAIL;
        break L212;
      }
      let t217;
      {
        const s229 = pos;
        let t227;
        t227 = r_alphaTail();
        if (t227 === FAIL) t217 = FAIL;
        else {
          let t228;
          t228 = q_close();
          if (t228 === FAIL) {
            pos = s229;
            t217 = FAIL;
          } else t217 = t227;
        }
      }
      if (t217 === FAIL) {
        pos = s213;
        v = FAIL;
        break L212;
      }
      const a230 = [];
      if (t214 !== void 0) a230.push(t214);
      if (t215 !== void 0) a230.push(t215);
      if (t216 !== void 0) a230.push(t216);
      if (t217 !== void 0) a230.push(t217);
      v = a230;
    }
    return v === FAIL ? FAIL : A_hwbFn(v);
  }
  function r_labFn() {
    let v;
    L231: {
      const s232 = pos;
      let t233;
      {
        const s239 = pos;
        let t237;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T20[c] === 1 : pos < len) {
            RE24.lastIndex = pos;
            if (RE24.test(src)) {
              const e = RE24.lastIndex;
              if (e > pos) {
                t237 = 0;
                pos = e;
              } else t237 = 0;
            } else t237 = FAIL;
          } else t237 = FAIL;
        }
        if (t237 === FAIL) t233 = FAIL;
        else {
          let t238;
          t238 = r_component();
          if (t238 === FAIL) {
            pos = s239;
            t233 = FAIL;
          } else t233 = t238;
        }
      }
      if (t233 === FAIL) {
        v = FAIL;
        break L231;
      }
      let t234;
      {
        const s242 = pos;
        let t240;
        t240 = q_ws();
        if (t240 === FAIL) t234 = FAIL;
        else {
          let t241;
          t241 = r_component();
          if (t241 === FAIL) {
            pos = s242;
            t234 = FAIL;
          } else t234 = t241;
        }
      }
      if (t234 === FAIL) {
        pos = s232;
        v = FAIL;
        break L231;
      }
      let t235;
      {
        const s245 = pos;
        let t243;
        t243 = q_ws();
        if (t243 === FAIL) t235 = FAIL;
        else {
          let t244;
          t244 = r_component();
          if (t244 === FAIL) {
            pos = s245;
            t235 = FAIL;
          } else t235 = t244;
        }
      }
      if (t235 === FAIL) {
        pos = s232;
        v = FAIL;
        break L231;
      }
      let t236;
      {
        const s248 = pos;
        let t246;
        t246 = r_alphaTail();
        if (t246 === FAIL) t236 = FAIL;
        else {
          let t247;
          t247 = q_close();
          if (t247 === FAIL) {
            pos = s248;
            t236 = FAIL;
          } else t236 = t246;
        }
      }
      if (t236 === FAIL) {
        pos = s232;
        v = FAIL;
        break L231;
      }
      const a249 = [];
      if (t233 !== void 0) a249.push(t233);
      if (t234 !== void 0) a249.push(t234);
      if (t235 !== void 0) a249.push(t235);
      if (t236 !== void 0) a249.push(t236);
      v = a249;
    }
    return v === FAIL ? FAIL : A_labFn(v);
  }
  function r_lchFn() {
    let v;
    L250: {
      const s251 = pos;
      let t252;
      {
        const s258 = pos;
        let t256;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T20[c] === 1 : pos < len) {
            RE25.lastIndex = pos;
            if (RE25.test(src)) {
              const e = RE25.lastIndex;
              if (e > pos) {
                t256 = 0;
                pos = e;
              } else t256 = 0;
            } else t256 = FAIL;
          } else t256 = FAIL;
        }
        if (t256 === FAIL) t252 = FAIL;
        else {
          let t257;
          t257 = r_component();
          if (t257 === FAIL) {
            pos = s258;
            t252 = FAIL;
          } else t252 = t257;
        }
      }
      if (t252 === FAIL) {
        v = FAIL;
        break L250;
      }
      let t253;
      {
        const s261 = pos;
        let t259;
        t259 = q_ws();
        if (t259 === FAIL) t253 = FAIL;
        else {
          let t260;
          t260 = r_component();
          if (t260 === FAIL) {
            pos = s261;
            t253 = FAIL;
          } else t253 = t260;
        }
      }
      if (t253 === FAIL) {
        pos = s251;
        v = FAIL;
        break L250;
      }
      let t254;
      {
        const s264 = pos;
        let t262;
        t262 = q_ws();
        if (t262 === FAIL) t254 = FAIL;
        else {
          let t263;
          t263 = r_hueValue();
          if (t263 === FAIL) {
            pos = s264;
            t254 = FAIL;
          } else t254 = t263;
        }
      }
      if (t254 === FAIL) {
        pos = s251;
        v = FAIL;
        break L250;
      }
      let t255;
      {
        const s267 = pos;
        let t265;
        t265 = r_alphaTail();
        if (t265 === FAIL) t255 = FAIL;
        else {
          let t266;
          t266 = q_close();
          if (t266 === FAIL) {
            pos = s267;
            t255 = FAIL;
          } else t255 = t265;
        }
      }
      if (t255 === FAIL) {
        pos = s251;
        v = FAIL;
        break L250;
      }
      const a268 = [];
      if (t252 !== void 0) a268.push(t252);
      if (t253 !== void 0) a268.push(t253);
      if (t254 !== void 0) a268.push(t254);
      if (t255 !== void 0) a268.push(t255);
      v = a268;
    }
    return v === FAIL ? FAIL : A_lchFn(v);
  }
  function r_oklabFn() {
    let v;
    L269: {
      const s270 = pos;
      let t271;
      {
        const s277 = pos;
        let t275;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T21[c] === 1 : pos < len) {
            RE26.lastIndex = pos;
            if (RE26.test(src)) {
              const e = RE26.lastIndex;
              if (e > pos) {
                t275 = 0;
                pos = e;
              } else t275 = 0;
            } else t275 = FAIL;
          } else t275 = FAIL;
        }
        if (t275 === FAIL) t271 = FAIL;
        else {
          let t276;
          t276 = r_component();
          if (t276 === FAIL) {
            pos = s277;
            t271 = FAIL;
          } else t271 = t276;
        }
      }
      if (t271 === FAIL) {
        v = FAIL;
        break L269;
      }
      let t272;
      {
        const s280 = pos;
        let t278;
        t278 = q_ws();
        if (t278 === FAIL) t272 = FAIL;
        else {
          let t279;
          t279 = r_component();
          if (t279 === FAIL) {
            pos = s280;
            t272 = FAIL;
          } else t272 = t279;
        }
      }
      if (t272 === FAIL) {
        pos = s270;
        v = FAIL;
        break L269;
      }
      let t273;
      {
        const s283 = pos;
        let t281;
        t281 = q_ws();
        if (t281 === FAIL) t273 = FAIL;
        else {
          let t282;
          t282 = r_component();
          if (t282 === FAIL) {
            pos = s283;
            t273 = FAIL;
          } else t273 = t282;
        }
      }
      if (t273 === FAIL) {
        pos = s270;
        v = FAIL;
        break L269;
      }
      let t274;
      {
        const s286 = pos;
        let t284;
        t284 = r_alphaTail();
        if (t284 === FAIL) t274 = FAIL;
        else {
          let t285;
          t285 = q_close();
          if (t285 === FAIL) {
            pos = s286;
            t274 = FAIL;
          } else t274 = t284;
        }
      }
      if (t274 === FAIL) {
        pos = s270;
        v = FAIL;
        break L269;
      }
      const a287 = [];
      if (t271 !== void 0) a287.push(t271);
      if (t272 !== void 0) a287.push(t272);
      if (t273 !== void 0) a287.push(t273);
      if (t274 !== void 0) a287.push(t274);
      v = a287;
    }
    return v === FAIL ? FAIL : A_oklabFn(v);
  }
  function r_oklchFn() {
    let v;
    L288: {
      const s289 = pos;
      let t290;
      {
        const s296 = pos;
        let t294;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T21[c] === 1 : pos < len) {
            RE27.lastIndex = pos;
            if (RE27.test(src)) {
              const e = RE27.lastIndex;
              if (e > pos) {
                t294 = 0;
                pos = e;
              } else t294 = 0;
            } else t294 = FAIL;
          } else t294 = FAIL;
        }
        if (t294 === FAIL) t290 = FAIL;
        else {
          let t295;
          t295 = r_component();
          if (t295 === FAIL) {
            pos = s296;
            t290 = FAIL;
          } else t290 = t295;
        }
      }
      if (t290 === FAIL) {
        v = FAIL;
        break L288;
      }
      let t291;
      {
        const s299 = pos;
        let t297;
        t297 = q_ws();
        if (t297 === FAIL) t291 = FAIL;
        else {
          let t298;
          t298 = r_component();
          if (t298 === FAIL) {
            pos = s299;
            t291 = FAIL;
          } else t291 = t298;
        }
      }
      if (t291 === FAIL) {
        pos = s289;
        v = FAIL;
        break L288;
      }
      let t292;
      {
        const s302 = pos;
        let t300;
        t300 = q_ws();
        if (t300 === FAIL) t292 = FAIL;
        else {
          let t301;
          t301 = r_hueValue();
          if (t301 === FAIL) {
            pos = s302;
            t292 = FAIL;
          } else t292 = t301;
        }
      }
      if (t292 === FAIL) {
        pos = s289;
        v = FAIL;
        break L288;
      }
      let t293;
      {
        const s305 = pos;
        let t303;
        t303 = r_alphaTail();
        if (t303 === FAIL) t293 = FAIL;
        else {
          let t304;
          t304 = q_close();
          if (t304 === FAIL) {
            pos = s305;
            t293 = FAIL;
          } else t293 = t303;
        }
      }
      if (t293 === FAIL) {
        pos = s289;
        v = FAIL;
        break L288;
      }
      const a306 = [];
      if (t290 !== void 0) a306.push(t290);
      if (t291 !== void 0) a306.push(t291);
      if (t292 !== void 0) a306.push(t292);
      if (t293 !== void 0) a306.push(t293);
      v = a306;
    }
    return v === FAIL ? FAIL : A_oklchFn(v);
  }
  function r_colorFn() {
    let v;
    L307: {
      const s308 = pos;
      let t309;
      {
        const s316 = pos;
        let t314;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T10[c] === 1 : pos < len) {
            RE28.lastIndex = pos;
            if (RE28.test(src)) {
              const e = RE28.lastIndex;
              if (e > pos) {
                t314 = 0;
                pos = e;
              } else t314 = 0;
            } else t314 = FAIL;
          } else t314 = FAIL;
        }
        if (t314 === FAIL) t309 = FAIL;
        else {
          let t315;
          t315 = r_colorSpace();
          if (t315 === FAIL) {
            pos = s316;
            t309 = FAIL;
          } else t309 = t315;
        }
      }
      if (t309 === FAIL) {
        v = FAIL;
        break L307;
      }
      let t310;
      {
        const s319 = pos;
        let t317;
        t317 = q_ws1();
        if (t317 === FAIL) t310 = FAIL;
        else {
          let t318;
          t318 = r_component();
          if (t318 === FAIL) {
            pos = s319;
            t310 = FAIL;
          } else t310 = t318;
        }
      }
      if (t310 === FAIL) {
        pos = s308;
        v = FAIL;
        break L307;
      }
      let t311;
      {
        const s322 = pos;
        let t320;
        t320 = q_ws();
        if (t320 === FAIL) t311 = FAIL;
        else {
          let t321;
          t321 = r_component();
          if (t321 === FAIL) {
            pos = s322;
            t311 = FAIL;
          } else t311 = t321;
        }
      }
      if (t311 === FAIL) {
        pos = s308;
        v = FAIL;
        break L307;
      }
      let t312;
      {
        const s325 = pos;
        let t323;
        t323 = q_ws();
        if (t323 === FAIL) t312 = FAIL;
        else {
          let t324;
          t324 = r_component();
          if (t324 === FAIL) {
            pos = s325;
            t312 = FAIL;
          } else t312 = t324;
        }
      }
      if (t312 === FAIL) {
        pos = s308;
        v = FAIL;
        break L307;
      }
      let t313;
      {
        const s328 = pos;
        let t326;
        t326 = r_alphaTail();
        if (t326 === FAIL) t313 = FAIL;
        else {
          let t327;
          t327 = q_close();
          if (t327 === FAIL) {
            pos = s328;
            t313 = FAIL;
          } else t313 = t326;
        }
      }
      if (t313 === FAIL) {
        pos = s308;
        v = FAIL;
        break L307;
      }
      const a329 = [];
      if (t309 !== void 0) a329.push(t309);
      if (t310 !== void 0) a329.push(t310);
      if (t311 !== void 0) a329.push(t311);
      if (t312 !== void 0) a329.push(t312);
      if (t313 !== void 0) a329.push(t313);
      v = a329;
    }
    return v === FAIL ? FAIL : A_colorFn(v);
  }
  function r_colorSpace() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T22[c] === 1 : pos < len) {
        RE29.lastIndex = pos;
        if (RE29.test(src)) {
          const e = RE29.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_relativeColor() {
    let v;
    L330: {
      const s331 = pos;
      let t332;
      t332 = r_relativeHead();
      if (t332 === FAIL) {
        v = FAIL;
        break L330;
      }
      let t333;
      {
        const s337 = pos;
        let t335;
        t335 = q_ws1();
        if (t335 === FAIL) t333 = FAIL;
        else {
          let t336;
          t336 = r_color();
          if (t336 === FAIL) {
            pos = s337;
            t333 = FAIL;
          } else t333 = t336;
        }
      }
      if (t333 === FAIL) {
        pos = s331;
        v = FAIL;
        break L330;
      }
      let t334;
      {
        const s340 = pos;
        let t338;
        t338 = r_relativeTail();
        if (t338 === FAIL) t334 = FAIL;
        else {
          let t339;
          t339 = q_close();
          if (t339 === FAIL) {
            pos = s340;
            t334 = FAIL;
          } else t334 = t338;
        }
      }
      if (t334 === FAIL) {
        pos = s331;
        v = FAIL;
        break L330;
      }
      const a341 = [];
      if (t332 !== void 0) a341.push(t332);
      if (t333 !== void 0) a341.push(t333);
      a341.push(t334);
      v = a341;
    }
    return v === FAIL ? FAIL : A_relativeColor(v);
  }
  function r_relativeHead() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t342;
      switch (c < 128 ? D38[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t342 = h343();
          if (t342 !== FAIL) {
            v = t342;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t342 = h344();
          if (t342 !== FAIL) {
            v = t342;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_relativeTail() {
    let v;
    L345: {
      const s346 = pos;
      let t347;
      let t352;
      {
        const s355 = pos;
        let t353;
        t353 = q_ws1();
        if (t353 === FAIL) t352 = FAIL;
        else {
          let t354;
          t354 = r_colorSpace();
          if (t354 === FAIL) {
            pos = s355;
            t352 = FAIL;
          } else t352 = t354;
        }
      }
      t347 = t352 === FAIL ? void 0 : t352;
      if (t347 === FAIL) {
        v = FAIL;
        break L345;
      }
      let t348;
      {
        const s358 = pos;
        let t356;
        t356 = q_ws1();
        if (t356 === FAIL) t348 = FAIL;
        else {
          let t357;
          t357 = r_relativeComp();
          if (t357 === FAIL) {
            pos = s358;
            t348 = FAIL;
          } else t348 = t357;
        }
      }
      if (t348 === FAIL) {
        pos = s346;
        v = FAIL;
        break L345;
      }
      let t349;
      {
        const s361 = pos;
        let t359;
        t359 = q_ws();
        if (t359 === FAIL) t349 = FAIL;
        else {
          let t360;
          t360 = r_relativeComp();
          if (t360 === FAIL) {
            pos = s361;
            t349 = FAIL;
          } else t349 = t360;
        }
      }
      if (t349 === FAIL) {
        pos = s346;
        v = FAIL;
        break L345;
      }
      let t350;
      {
        const s364 = pos;
        let t362;
        t362 = q_ws();
        if (t362 === FAIL) t350 = FAIL;
        else {
          let t363;
          t363 = r_relativeComp();
          if (t363 === FAIL) {
            pos = s364;
            t350 = FAIL;
          } else t350 = t363;
        }
      }
      if (t350 === FAIL) {
        pos = s346;
        v = FAIL;
        break L345;
      }
      let t351;
      let t365;
      {
        const s368 = pos;
        let t366;
        t366 = q_slash();
        if (t366 === FAIL) t365 = FAIL;
        else {
          let t367;
          t367 = r_relativeComp();
          if (t367 === FAIL) {
            pos = s368;
            t365 = FAIL;
          } else t365 = t367;
        }
      }
      t351 = t365 === FAIL ? void 0 : t365;
      if (t351 === FAIL) {
        pos = s346;
        v = FAIL;
        break L345;
      }
      const a369 = [];
      if (t347 !== void 0) a369.push(t347);
      if (t348 !== void 0) a369.push(t348);
      if (t349 !== void 0) a369.push(t349);
      if (t350 !== void 0) a369.push(t350);
      if (t351 !== void 0) a369.push(t351);
      v = a369;
    }
    return v;
  }
  function r_relativeComp() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t370;
      switch (c < 128 ? D40[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t370 = r_percentage();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          t370 = r_angle();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          t370 = r_number();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t370 = r_mathFn();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          t370 = r_calcKeyword();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t370 = r_calcKeyword();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          v = FAIL;
          break;
        case 4:
          t370 = r_none();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          t370 = r_calcKeyword();
          if (t370 !== FAIL) {
            v = t370;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_colorMix() {
    let v;
    L371: {
      const s372 = pos;
      let t373;
      {
        const s378 = pos;
        let t376;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T10[c] === 1 : pos < len) {
            RE32.lastIndex = pos;
            if (RE32.test(src)) {
              const e = RE32.lastIndex;
              if (e > pos) {
                t376 = 0;
                pos = e;
              } else t376 = 0;
            } else t376 = FAIL;
          } else t376 = FAIL;
        }
        if (t376 === FAIL) t373 = FAIL;
        else {
          let t377;
          let t379;
          {
            const s382 = pos;
            let t380;
            t380 = r_mixMethod();
            if (t380 === FAIL) t379 = FAIL;
            else {
              let t381;
              t381 = q_comma();
              if (t381 === FAIL) {
                pos = s382;
                t379 = FAIL;
              } else t379 = t380;
            }
          }
          t377 = t379 === FAIL ? void 0 : t379;
          if (t377 === FAIL) {
            pos = s378;
            t373 = FAIL;
          } else t373 = t377;
        }
      }
      if (t373 === FAIL) {
        v = FAIL;
        break L371;
      }
      let t374;
      t374 = r_mixItem();
      if (t374 === FAIL) {
        pos = s372;
        v = FAIL;
        break L371;
      }
      let t375;
      {
        const s385 = pos;
        let t383;
        {
          const a388 = [];
          for (; ; ) {
            const s387 = pos;
            let t386;
            {
              const s391 = pos;
              let t389;
              t389 = q_comma();
              if (t389 === FAIL) t386 = FAIL;
              else {
                let t390;
                t390 = r_mixItem();
                if (t390 === FAIL) {
                  pos = s391;
                  t386 = FAIL;
                } else t386 = t390;
              }
            }
            if (t386 === FAIL || pos === s387) break;
            a388.push(t386);
          }
          t383 = a388;
        }
        if (t383 === FAIL) t375 = FAIL;
        else {
          let t384;
          t384 = q_close();
          if (t384 === FAIL) {
            pos = s385;
            t375 = FAIL;
          } else t375 = t383;
        }
      }
      if (t375 === FAIL) {
        pos = s372;
        v = FAIL;
        break L371;
      }
      const a392 = [];
      if (t373 !== void 0) a392.push(t373);
      if (t374 !== void 0) a392.push(t374);
      a392.push(t375);
      v = a392;
    }
    return v === FAIL ? FAIL : A_colorMix(v);
  }
  function r_mixMethod() {
    let v;
    {
      const s395 = pos;
      let t393;
      {
        const s398 = pos;
        let t396;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T24[c] === 1 : pos < len) {
            RE33.lastIndex = pos;
            if (RE33.test(src)) {
              const e = RE33.lastIndex;
              if (e > pos) {
                t396 = 0;
                pos = e;
              } else t396 = 0;
            } else t396 = FAIL;
          } else t396 = FAIL;
        }
        if (t396 === FAIL) t393 = FAIL;
        else {
          let t397;
          t397 = q_ws1();
          if (t397 === FAIL) {
            pos = s398;
            t393 = FAIL;
          } else t393 = t397;
        }
      }
      if (t393 === FAIL) v = FAIL;
      else {
        let t394;
        {
          const c = src.charCodeAt(pos);
          let t399;
          switch (c < 128 ? D42[c] : 3) {
            case 0:
              t394 = FAIL;
              break;
            case 1:
              t399 = r_mixRect();
              if (t399 !== FAIL) {
                t394 = t399;
                break;
              }
              t394 = FAIL;
              break;
            case 2:
              t399 = r_mixPolar();
              if (t399 !== FAIL) {
                t394 = t399;
                break;
              }
              t394 = FAIL;
              break;
            case 3:
              t399 = r_mixPolar();
              if (t399 !== FAIL) {
                t394 = t399;
                break;
              }
              t399 = r_mixRect();
              if (t399 !== FAIL) {
                t394 = t399;
                break;
              }
              t394 = FAIL;
              break;
          }
        }
        if (t394 === FAIL) {
          pos = s395;
          v = FAIL;
        } else v = t394;
      }
    }
    return v;
  }
  function r_mixPolar() {
    let v;
    L400: {
      const s401 = pos;
      let t402;
      t402 = r_polarSpace();
      if (t402 === FAIL) {
        v = FAIL;
        break L400;
      }
      let t403;
      let t404;
      {
        const s407 = pos;
        let t405;
        t405 = q_ws1();
        if (t405 === FAIL) t404 = FAIL;
        else {
          let t406;
          t406 = r_hueMethod();
          if (t406 === FAIL) {
            pos = s407;
            t404 = FAIL;
          } else t404 = t406;
        }
      }
      t403 = t404 === FAIL ? void 0 : t404;
      if (t403 === FAIL) {
        pos = s401;
        v = FAIL;
        break L400;
      }
      const a408 = [];
      if (t402 !== void 0) a408.push(t402);
      if (t403 !== void 0) a408.push(t403);
      v = a408;
    }
    return v === FAIL ? FAIL : A_mixPolar(v);
  }
  function r_mixRect() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T25[c] === 1 : pos < len) {
        RE34.lastIndex = pos;
        if (RE34.test(src)) {
          const e = RE34.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_mixRect(v);
  }
  function r_polarSpace() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T26[c] === 1 : pos < len) {
        RE35.lastIndex = pos;
        if (RE35.test(src)) {
          const e = RE35.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_rectSpace() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T25[c] === 1 : pos < len) {
        RE34.lastIndex = pos;
        if (RE34.test(src)) {
          const e = RE34.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_hueMethod() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T27[c] === 1 : pos < len) {
        RE36.lastIndex = pos;
        if (RE36.test(src)) {
          const e = RE36.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_mixItem() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t409;
      switch (c < 128 ? D46[c] : 3) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t409 = r_mixTrail();
          if (t409 !== FAIL) {
            v = t409;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t409 = r_mixLead();
          if (t409 !== FAIL) {
            v = t409;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t409 = r_mixLead();
          if (t409 !== FAIL) {
            v = t409;
            break;
          }
          t409 = r_mixTrail();
          if (t409 !== FAIL) {
            v = t409;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_mixLead() {
    let v;
    L410: {
      const s411 = pos;
      let t412;
      t412 = r_mixPercent();
      if (t412 === FAIL) {
        v = FAIL;
        break L410;
      }
      let t413;
      {
        const s416 = pos;
        let t414;
        t414 = q_ws();
        if (t414 === FAIL) t413 = FAIL;
        else {
          let t415;
          t415 = r_color();
          if (t415 === FAIL) {
            pos = s416;
            t413 = FAIL;
          } else t413 = t415;
        }
      }
      if (t413 === FAIL) {
        pos = s411;
        v = FAIL;
        break L410;
      }
      const a417 = [];
      if (t412 !== void 0) a417.push(t412);
      if (t413 !== void 0) a417.push(t413);
      v = a417;
    }
    return v === FAIL ? FAIL : A_mixLead(v);
  }
  function r_mixTrail() {
    let v;
    L418: {
      const s419 = pos;
      let t420;
      t420 = r_color();
      if (t420 === FAIL) {
        v = FAIL;
        break L418;
      }
      let t421;
      let t422;
      {
        const s425 = pos;
        let t423;
        t423 = q_ws();
        if (t423 === FAIL) t422 = FAIL;
        else {
          let t424;
          t424 = r_mixPercent();
          if (t424 === FAIL) {
            pos = s425;
            t422 = FAIL;
          } else t422 = t424;
        }
      }
      t421 = t422 === FAIL ? void 0 : t422;
      if (t421 === FAIL) {
        pos = s419;
        v = FAIL;
        break L418;
      }
      const a426 = [];
      if (t420 !== void 0) a426.push(t420);
      if (t421 !== void 0) a426.push(t421);
      v = a426;
    }
    return v === FAIL ? FAIL : A_mixTrail(v);
  }
  function r_mixPercent() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t427;
      switch (c < 128 ? D47[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t427 = r_percentage();
          if (t427 !== FAIL) {
            v = t427;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t427 = r_mathFn();
          if (t427 !== FAIL) {
            v = t427;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_lightDark() {
    let v;
    L428: {
      const s429 = pos;
      let t430;
      {
        const s434 = pos;
        let t432;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T20[c] === 1 : pos < len) {
            RE37.lastIndex = pos;
            if (RE37.test(src)) {
              const e = RE37.lastIndex;
              if (e > pos) {
                t432 = 0;
                pos = e;
              } else t432 = 0;
            } else t432 = FAIL;
          } else t432 = FAIL;
        }
        if (t432 === FAIL) t430 = FAIL;
        else {
          let t433;
          t433 = r_color();
          if (t433 === FAIL) {
            pos = s434;
            t430 = FAIL;
          } else t430 = t433;
        }
      }
      if (t430 === FAIL) {
        v = FAIL;
        break L428;
      }
      let t431;
      {
        const s437 = pos;
        let t435;
        {
          const s440 = pos;
          let t438;
          t438 = q_comma();
          if (t438 === FAIL) t435 = FAIL;
          else {
            let t439;
            t439 = r_color();
            if (t439 === FAIL) {
              pos = s440;
              t435 = FAIL;
            } else t435 = t439;
          }
        }
        if (t435 === FAIL) t431 = FAIL;
        else {
          let t436;
          t436 = q_close();
          if (t436 === FAIL) {
            pos = s437;
            t431 = FAIL;
          } else t431 = t435;
        }
      }
      if (t431 === FAIL) {
        pos = s429;
        v = FAIL;
        break L428;
      }
      const a441 = [];
      if (t430 !== void 0) a441.push(t430);
      if (t431 !== void 0) a441.push(t431);
      v = a441;
    }
    return v === FAIL ? FAIL : A_lightDark(v);
  }
  function r_hex() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T28[c] === 1 : pos < len) {
        RE38.lastIndex = pos;
        if (RE38.test(src)) {
          const e = RE38.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_hex(v);
  }
  function r_colorKeyword() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T16[c] === 1 : pos < len) {
        RE19.lastIndex = pos;
        if (RE19.test(src)) {
          const e = RE19.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_colorKeyword(v);
  }
  function r_valueTop() {
    let v;
    {
      const s444 = pos;
      let t442;
      {
        const s447 = pos;
        let t445;
        t445 = q_ws();
        if (t445 === FAIL) t442 = FAIL;
        else {
          let t446;
          t446 = r_commaList();
          if (t446 === FAIL) {
            pos = s447;
            t442 = FAIL;
          } else t442 = t446;
        }
      }
      if (t442 === FAIL) v = FAIL;
      else {
        let t443;
        t443 = q_ws();
        if (t443 === FAIL) {
          pos = s444;
          v = FAIL;
        } else v = t442;
      }
    }
    return v;
  }
  function r_commaList() {
    let v;
    L448: {
      const s449 = pos;
      let t450;
      t450 = r_slashList();
      if (t450 === FAIL) {
        v = FAIL;
        break L448;
      }
      let t451;
      {
        const a454 = [];
        for (; ; ) {
          const s453 = pos;
          let t452;
          {
            const s457 = pos;
            let t455;
            t455 = q_comma();
            if (t455 === FAIL) t452 = FAIL;
            else {
              let t456;
              t456 = r_slashList();
              if (t456 === FAIL) {
                pos = s457;
                t452 = FAIL;
              } else t452 = t456;
            }
          }
          if (t452 === FAIL || pos === s453) break;
          a454.push(t452);
        }
        t451 = a454;
      }
      if (t451 === FAIL) {
        pos = s449;
        v = FAIL;
        break L448;
      }
      const a458 = [];
      if (t450 !== void 0) a458.push(t450);
      a458.push(t451);
      v = a458;
    }
    return v === FAIL ? FAIL : A_commaList(v);
  }
  function r_slashList() {
    let v;
    L459: {
      const s460 = pos;
      let t461;
      t461 = r_spaceList();
      if (t461 === FAIL) {
        v = FAIL;
        break L459;
      }
      let t462;
      {
        const a465 = [];
        for (; ; ) {
          const s464 = pos;
          let t463;
          {
            const s468 = pos;
            let t466;
            t466 = q_slash();
            if (t466 === FAIL) t463 = FAIL;
            else {
              let t467;
              t467 = r_spaceList();
              if (t467 === FAIL) {
                pos = s468;
                t463 = FAIL;
              } else t463 = t467;
            }
          }
          if (t463 === FAIL || pos === s464) break;
          a465.push(t463);
        }
        t462 = a465;
      }
      if (t462 === FAIL) {
        pos = s460;
        v = FAIL;
        break L459;
      }
      const a469 = [];
      if (t461 !== void 0) a469.push(t461);
      a469.push(t462);
      v = a469;
    }
    return v === FAIL ? FAIL : A_slashList(v);
  }
  function r_spaceList() {
    let v;
    L470: {
      const s471 = pos;
      let t472;
      t472 = r_valueTerm();
      if (t472 === FAIL) {
        v = FAIL;
        break L470;
      }
      let t473;
      {
        const a476 = [];
        for (; ; ) {
          const s475 = pos;
          let t474;
          {
            const s479 = pos;
            let t477;
            t477 = q_termSep();
            if (t477 === FAIL) t474 = FAIL;
            else {
              let t478;
              t478 = r_valueTerm();
              if (t478 === FAIL) {
                pos = s479;
                t474 = FAIL;
              } else t474 = t478;
            }
          }
          if (t474 === FAIL || pos === s475) break;
          a476.push(t474);
        }
        t473 = a476;
      }
      if (t473 === FAIL) {
        pos = s471;
        v = FAIL;
        break L470;
      }
      const a480 = [];
      if (t472 !== void 0) a480.push(t472);
      a480.push(t473);
      v = a480;
    }
    return v === FAIL ? FAIL : A_spaceList(v);
  }
  function r_termSep() {
    let v;
    if (pos < len) {
      RE39.lastIndex = pos;
      if (RE39.test(src)) {
        const e = RE39.lastIndex;
        if (e > pos) {
          v = src.substring(pos, e);
          pos = e;
        } else v = void 0;
      } else v = FAIL;
    } else v = FAIL;
    return v;
  }
  function r_valueTerm() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t481;
      switch (c < 128 ? D49[c] : 1) {
        case 0:
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 1:
          v = FAIL;
          break;
        case 2:
          t481 = r_operator();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t481 = r_string();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 4:
          t481 = r_colorCall();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 5:
          t481 = r_numeric();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_operator();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 6:
          t481 = r_call();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_numeric();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_operator();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_identTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 7:
          t481 = r_numeric();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 8:
          t481 = r_operator();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 9:
          t481 = r_call();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_identTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 10:
          t481 = r_colorCall();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_call();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_identTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
        case 11:
          t481 = r_varCall();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_call();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_identTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          t481 = r_badTerm();
          if (t481 !== FAIL) {
            v = t481;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_badTerm() {
    const s0 = pos;
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T29[c] === 0 : !(NA1.lastIndex = e, NA1.test(src))) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v === FAIL ? FAIL : A_badTerm(v, s0, pos);
  }
  function r_varCall() {
    let v;
    L482: {
      const s483 = pos;
      let t484;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T17[c] === 1 : pos < len) {
          RE20.lastIndex = pos;
          if (RE20.test(src)) {
            const e = RE20.lastIndex;
            if (e > pos) {
              t484 = src.substring(pos, e);
              pos = e;
            } else t484 = void 0;
          } else t484 = FAIL;
        } else t484 = FAIL;
      }
      if (t484 === FAIL) {
        v = FAIL;
        break L482;
      }
      let t485;
      {
        const s488 = pos;
        let t486;
        {
          const s491 = pos;
          let t489;
          {
            const c = src.charCodeAt(pos);
            if (c < 128 ? T12[c] === 1 : pos < len) {
              RE13.lastIndex = pos;
              if (RE13.test(src)) {
                const e = RE13.lastIndex;
                if (e > pos) {
                  t489 = 0;
                  pos = e;
                } else t489 = 0;
              } else t489 = FAIL;
            } else t489 = FAIL;
          }
          if (t489 === FAIL) t486 = FAIL;
          else {
            let t490;
            t490 = r_varBody();
            if (t490 === FAIL) {
              pos = s491;
              t486 = FAIL;
            } else t486 = t490;
          }
        }
        if (t486 === FAIL) t485 = FAIL;
        else {
          let t487;
          t487 = q_close();
          if (t487 === FAIL) {
            pos = s488;
            t485 = FAIL;
          } else t485 = t486;
        }
      }
      if (t485 === FAIL) {
        pos = s483;
        v = FAIL;
        break L482;
      }
      const a492 = [];
      if (t484 !== void 0) a492.push(t484);
      if (t485 !== void 0) a492.push(t485);
      v = a492;
    }
    return v === FAIL ? FAIL : A_varCall(v);
  }
  function r_varBody() {
    let v;
    {
      const s495 = pos;
      let t493;
      t493 = r_commaList();
      if (t493 === FAIL) v = FAIL;
      else {
        let t494;
        let t496;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T1[c] === 1 : pos < len) {
            RE40.lastIndex = pos;
            if (RE40.test(src)) {
              const e = RE40.lastIndex;
              if (e > pos) {
                t496 = 0;
                pos = e;
              } else t496 = 0;
            } else t496 = FAIL;
          } else t496 = FAIL;
        }
        t494 = t496 === FAIL ? void 0 : t496;
        if (t494 === FAIL) {
          pos = s495;
          v = FAIL;
        } else v = t493;
      }
    }
    return v;
  }
  function r_colorCall() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t497;
      switch (c < 128 ? D52[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t497 = r_hex();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t497 = r_relativeColor();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_colorFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t497 = r_relativeColor();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_hslFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_hwbFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          v = FAIL;
          break;
        case 4:
          t497 = r_relativeColor();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_labFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_lchFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          v = FAIL;
          break;
        case 5:
          t497 = r_relativeColor();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_oklabFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_oklchFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          v = FAIL;
          break;
        case 6:
          t497 = r_relativeColor();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          t497 = r_rgbFn();
          if (t497 !== FAIL) {
            v = t497;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v === FAIL ? FAIL : A_colorCall(v);
  }
  function r_colorHead() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T30[c] === 1 : pos < len) {
        RE41.lastIndex = pos;
        if (RE41.test(src)) {
          const e = RE41.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_call() {
    let v;
    L498: {
      const s499 = pos;
      let t500;
      {
        const s503 = pos;
        let t502;
        t502 = q_colorHead();
        if (t502 !== FAIL) {
          pos = s503;
          t500 = FAIL;
        } else {
          t500 = r_callName();
        }
      }
      if (t500 === FAIL) {
        v = FAIL;
        break L498;
      }
      let t501;
      {
        const s506 = pos;
        let t504;
        {
          const s509 = pos;
          let t507;
          {
            const c = src.charCodeAt(pos);
            if (c < 128 ? T12[c] === 1 : pos < len) {
              RE13.lastIndex = pos;
              if (RE13.test(src)) {
                const e = RE13.lastIndex;
                if (e > pos) {
                  t507 = 0;
                  pos = e;
                } else t507 = 0;
              } else t507 = FAIL;
            } else t507 = FAIL;
          }
          if (t507 === FAIL) t504 = FAIL;
          else {
            let t508;
            let t510;
            t510 = r_commaList();
            t508 = t510 === FAIL ? void 0 : t510;
            if (t508 === FAIL) {
              pos = s509;
              t504 = FAIL;
            } else t504 = t508;
          }
        }
        if (t504 === FAIL) t501 = FAIL;
        else {
          let t505;
          t505 = q_close();
          if (t505 === FAIL) {
            pos = s506;
            t501 = FAIL;
          } else t501 = t504;
        }
      }
      if (t501 === FAIL) {
        pos = s499;
        v = FAIL;
        break L498;
      }
      const a511 = [];
      if (t500 !== void 0) a511.push(t500);
      if (t501 !== void 0) a511.push(t501);
      v = a511;
    }
    return v === FAIL ? FAIL : A_call(v);
  }
  function r_callName() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T6[c] === 1 : pos < len) {
        RE42.lastIndex = pos;
        if (RE42.test(src)) {
          const e = RE42.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_numeric() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T4[c] === 1 : pos < len) {
        RE43.lastIndex = pos;
        if (RE43.test(src)) {
          const e = RE43.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_numeric(v);
  }
  function r_operator() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T31[c] === 1 : pos < len) {
        RE44.lastIndex = pos;
        if (RE44.test(src)) {
          const e = RE44.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_operator(v);
  }
  function r_identTerm() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T6[c] === 1 : pos < len) {
        RE45.lastIndex = pos;
        if (RE45.test(src)) {
          const e = RE45.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_identTerm(v);
  }
  function r_scalarTop() {
    let v;
    {
      const s514 = pos;
      let t512;
      {
        const s517 = pos;
        let t515;
        t515 = q_ws();
        if (t515 === FAIL) t512 = FAIL;
        else {
          let t516;
          t516 = r_scalarTerm();
          if (t516 === FAIL) {
            pos = s517;
            t512 = FAIL;
          } else t512 = t516;
        }
      }
      if (t512 === FAIL) v = FAIL;
      else {
        let t513;
        t513 = q_ws();
        if (t513 === FAIL) {
          pos = s514;
          v = FAIL;
        } else v = t512;
      }
    }
    return v;
  }
  function r_scalarTerm() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t518;
      switch (c < 128 ? D55[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t518 = r_operator();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t518 = r_string();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 3:
          t518 = r_colorCall();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 4:
          t518 = r_numeric();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_operator();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 5:
          t518 = r_numeric();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_operator();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_identTerm();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 6:
          t518 = r_numeric();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 7:
          t518 = r_identTerm();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 8:
          t518 = r_colorMix();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_colorCall();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_identTerm();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 9:
          t518 = r_colorCall();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_identTerm();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
        case 10:
          t518 = r_lightDark();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_colorCall();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          t518 = r_identTerm();
          if (t518 !== FAIL) {
            v = t518;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v === FAIL ? FAIL : A_scalarTerm(v);
  }
  function r_colorTop() {
    let v;
    {
      const s521 = pos;
      let t519;
      {
        const s524 = pos;
        let t522;
        t522 = q_ws();
        if (t522 === FAIL) t519 = FAIL;
        else {
          let t523;
          t523 = r_color();
          if (t523 === FAIL) {
            pos = s524;
            t519 = FAIL;
          } else t519 = t523;
        }
      }
      if (t519 === FAIL) v = FAIL;
      else {
        let t520;
        t520 = q_ws();
        if (t520 === FAIL) {
          pos = s521;
          v = FAIL;
        } else v = t519;
      }
    }
    return v;
  }
  function r_keyframeSelector() {
    let v;
    {
      const s527 = pos;
      let t525;
      {
        const s530 = pos;
        let t528;
        t528 = q_ws();
        if (t528 === FAIL) t525 = FAIL;
        else {
          let t529;
          {
            const c = src.charCodeAt(pos);
            let t531;
            switch (c < 128 ? D56[c] : 0) {
              case 0:
                t529 = FAIL;
                break;
              case 1:
                t531 = r_percentage();
                if (t531 !== FAIL) {
                  t529 = t531;
                  break;
                }
                t529 = FAIL;
                break;
              case 2:
                t531 = r_selectorNamed();
                if (t531 !== FAIL) {
                  t529 = t531;
                  break;
                }
                t529 = FAIL;
                break;
              case 3:
                t531 = r_selectorKeyword();
                if (t531 !== FAIL) {
                  t529 = t531;
                  break;
                }
                t529 = FAIL;
                break;
            }
          }
          if (t529 === FAIL) {
            pos = s530;
            t525 = FAIL;
          } else t525 = t529;
        }
      }
      if (t525 === FAIL) v = FAIL;
      else {
        let t526;
        t526 = q_ws();
        if (t526 === FAIL) {
          pos = s527;
          v = FAIL;
        } else v = t525;
      }
    }
    return v;
  }
  function r_selectorKeyword() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T32[c] === 1 : pos < len) {
        RE46.lastIndex = pos;
        if (RE46.test(src)) {
          const e = RE46.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_selectorKeyword(v);
  }
  function r_selectorNamed() {
    let v;
    L532: {
      const s533 = pos;
      let t534;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T33[c] === 1 : pos < len) {
          RE47.lastIndex = pos;
          if (RE47.test(src)) {
            const e = RE47.lastIndex;
            if (e > pos) {
              t534 = src.substring(pos, e);
              pos = e;
            } else t534 = void 0;
          } else t534 = FAIL;
        } else t534 = FAIL;
      }
      if (t534 === FAIL) {
        v = FAIL;
        break L532;
      }
      let t535;
      let t536;
      {
        const s539 = pos;
        let t537;
        t537 = q_ws1();
        if (t537 === FAIL) t536 = FAIL;
        else {
          let t538;
          t538 = r_percentage();
          if (t538 === FAIL) {
            pos = s539;
            t536 = FAIL;
          } else t536 = t538;
        }
      }
      t535 = t536 === FAIL ? void 0 : t536;
      if (t535 === FAIL) {
        pos = s533;
        v = FAIL;
        break L532;
      }
      const a540 = [];
      if (t534 !== void 0) a540.push(t534);
      if (t535 !== void 0) a540.push(t535);
      v = a540;
    }
    return v === FAIL ? FAIL : A_selectorNamed(v);
  }
  function r_timingFunction() {
    let v;
    {
      const s543 = pos;
      let t541;
      {
        const s546 = pos;
        let t544;
        t544 = q_ws();
        if (t544 === FAIL) t541 = FAIL;
        else {
          let t545;
          {
            const c = src.charCodeAt(pos);
            let t547;
            switch (c < 128 ? D59[c] : 0) {
              case 0:
                t545 = FAIL;
                break;
              case 1:
                t547 = r_cubicBezier();
                if (t547 !== FAIL) {
                  t545 = t547;
                  break;
                }
                t545 = FAIL;
                break;
              case 2:
                t547 = r_timingKeyword();
                if (t547 !== FAIL) {
                  t545 = t547;
                  break;
                }
                t545 = FAIL;
                break;
              case 3:
                t547 = r_linearFn();
                if (t547 !== FAIL) {
                  t545 = t547;
                  break;
                }
                t547 = r_timingKeyword();
                if (t547 !== FAIL) {
                  t545 = t547;
                  break;
                }
                t545 = FAIL;
                break;
              case 4:
                t547 = r_stepsFn();
                if (t547 !== FAIL) {
                  t545 = t547;
                  break;
                }
                t547 = r_timingKeyword();
                if (t547 !== FAIL) {
                  t545 = t547;
                  break;
                }
                t545 = FAIL;
                break;
            }
          }
          if (t545 === FAIL) {
            pos = s546;
            t541 = FAIL;
          } else t541 = t545;
        }
      }
      if (t541 === FAIL) v = FAIL;
      else {
        let t542;
        t542 = q_ws();
        if (t542 === FAIL) {
          pos = s543;
          v = FAIL;
        } else v = t541;
      }
    }
    return v;
  }
  function r_timingKeyword() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T34[c] === 1 : pos < len) {
        RE48.lastIndex = pos;
        if (RE48.test(src)) {
          const e = RE48.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_timingKeyword(v);
  }
  function r_cubicBezier() {
    let v;
    L548: {
      const s549 = pos;
      let t550;
      {
        const s556 = pos;
        let t554;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T10[c] === 1 : pos < len) {
            RE49.lastIndex = pos;
            if (RE49.test(src)) {
              const e = RE49.lastIndex;
              if (e > pos) {
                t554 = 0;
                pos = e;
              } else t554 = 0;
            } else t554 = FAIL;
          } else t554 = FAIL;
        }
        if (t554 === FAIL) t550 = FAIL;
        else {
          let t555;
          t555 = r_number();
          if (t555 === FAIL) {
            pos = s556;
            t550 = FAIL;
          } else t550 = t555;
        }
      }
      if (t550 === FAIL) {
        v = FAIL;
        break L548;
      }
      let t551;
      {
        const s559 = pos;
        let t557;
        t557 = q_comma();
        if (t557 === FAIL) t551 = FAIL;
        else {
          let t558;
          t558 = r_number();
          if (t558 === FAIL) {
            pos = s559;
            t551 = FAIL;
          } else t551 = t558;
        }
      }
      if (t551 === FAIL) {
        pos = s549;
        v = FAIL;
        break L548;
      }
      let t552;
      {
        const s562 = pos;
        let t560;
        t560 = q_comma();
        if (t560 === FAIL) t552 = FAIL;
        else {
          let t561;
          t561 = r_number();
          if (t561 === FAIL) {
            pos = s562;
            t552 = FAIL;
          } else t552 = t561;
        }
      }
      if (t552 === FAIL) {
        pos = s549;
        v = FAIL;
        break L548;
      }
      let t553;
      {
        const s565 = pos;
        let t563;
        {
          const s568 = pos;
          let t566;
          t566 = q_comma();
          if (t566 === FAIL) t563 = FAIL;
          else {
            let t567;
            t567 = r_number();
            if (t567 === FAIL) {
              pos = s568;
              t563 = FAIL;
            } else t563 = t567;
          }
        }
        if (t563 === FAIL) t553 = FAIL;
        else {
          let t564;
          t564 = q_close();
          if (t564 === FAIL) {
            pos = s565;
            t553 = FAIL;
          } else t553 = t563;
        }
      }
      if (t553 === FAIL) {
        pos = s549;
        v = FAIL;
        break L548;
      }
      const a569 = [];
      if (t550 !== void 0) a569.push(t550);
      if (t551 !== void 0) a569.push(t551);
      if (t552 !== void 0) a569.push(t552);
      if (t553 !== void 0) a569.push(t553);
      v = a569;
    }
    return v === FAIL ? FAIL : A_cubicBezier(v);
  }
  function r_stepsFn() {
    let v;
    L570: {
      const s571 = pos;
      let t572;
      {
        const s576 = pos;
        let t574;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T35[c] === 1 : pos < len) {
            RE50.lastIndex = pos;
            if (RE50.test(src)) {
              const e = RE50.lastIndex;
              if (e > pos) {
                t574 = 0;
                pos = e;
              } else t574 = 0;
            } else t574 = FAIL;
          } else t574 = FAIL;
        }
        if (t574 === FAIL) t572 = FAIL;
        else {
          let t575;
          t575 = r_number();
          if (t575 === FAIL) {
            pos = s576;
            t572 = FAIL;
          } else t572 = t575;
        }
      }
      if (t572 === FAIL) {
        v = FAIL;
        break L570;
      }
      let t573;
      {
        const s579 = pos;
        let t577;
        let t580;
        {
          const s583 = pos;
          let t581;
          t581 = q_comma();
          if (t581 === FAIL) t580 = FAIL;
          else {
            let t582;
            t582 = r_stepPosition();
            if (t582 === FAIL) {
              pos = s583;
              t580 = FAIL;
            } else t580 = t582;
          }
        }
        t577 = t580 === FAIL ? void 0 : t580;
        if (t577 === FAIL) t573 = FAIL;
        else {
          let t578;
          t578 = q_close();
          if (t578 === FAIL) {
            pos = s579;
            t573 = FAIL;
          } else t573 = t577;
        }
      }
      if (t573 === FAIL) {
        pos = s571;
        v = FAIL;
        break L570;
      }
      const a584 = [];
      if (t572 !== void 0) a584.push(t572);
      if (t573 !== void 0) a584.push(t573);
      v = a584;
    }
    return v === FAIL ? FAIL : A_stepsFn(v);
  }
  function r_stepPosition() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T36[c] === 1 : pos < len) {
        RE51.lastIndex = pos;
        if (RE51.test(src)) {
          const e = RE51.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_linearFn() {
    let v;
    L585: {
      const s586 = pos;
      let t587;
      {
        const s591 = pos;
        let t589;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T20[c] === 1 : pos < len) {
            RE52.lastIndex = pos;
            if (RE52.test(src)) {
              const e = RE52.lastIndex;
              if (e > pos) {
                t589 = 0;
                pos = e;
              } else t589 = 0;
            } else t589 = FAIL;
          } else t589 = FAIL;
        }
        if (t589 === FAIL) t587 = FAIL;
        else {
          let t590;
          t590 = r_linearStop();
          if (t590 === FAIL) {
            pos = s591;
            t587 = FAIL;
          } else t587 = t590;
        }
      }
      if (t587 === FAIL) {
        v = FAIL;
        break L585;
      }
      let t588;
      {
        const s594 = pos;
        let t592;
        {
          const a597 = [];
          for (; ; ) {
            const s596 = pos;
            let t595;
            {
              const s600 = pos;
              let t598;
              t598 = q_comma();
              if (t598 === FAIL) t595 = FAIL;
              else {
                let t599;
                t599 = r_linearStop();
                if (t599 === FAIL) {
                  pos = s600;
                  t595 = FAIL;
                } else t595 = t599;
              }
            }
            if (t595 === FAIL || pos === s596) break;
            a597.push(t595);
          }
          t592 = a597;
        }
        if (t592 === FAIL) t588 = FAIL;
        else {
          let t593;
          t593 = q_close();
          if (t593 === FAIL) {
            pos = s594;
            t588 = FAIL;
          } else t588 = t592;
        }
      }
      if (t588 === FAIL) {
        pos = s586;
        v = FAIL;
        break L585;
      }
      const a601 = [];
      if (t587 !== void 0) a601.push(t587);
      a601.push(t588);
      v = a601;
    }
    return v === FAIL ? FAIL : A_linearFn(v);
  }
  function r_linearStop() {
    let v;
    L602: {
      const s603 = pos;
      let t604;
      t604 = r_number();
      if (t604 === FAIL) {
        v = FAIL;
        break L602;
      }
      let t605;
      let t607;
      {
        const s610 = pos;
        let t608;
        t608 = q_ws1();
        if (t608 === FAIL) t607 = FAIL;
        else {
          let t609;
          t609 = r_percentage();
          if (t609 === FAIL) {
            pos = s610;
            t607 = FAIL;
          } else t607 = t609;
        }
      }
      t605 = t607 === FAIL ? void 0 : t607;
      if (t605 === FAIL) {
        pos = s603;
        v = FAIL;
        break L602;
      }
      let t606;
      let t611;
      {
        const s614 = pos;
        let t612;
        t612 = q_ws1();
        if (t612 === FAIL) t611 = FAIL;
        else {
          let t613;
          t613 = r_percentage();
          if (t613 === FAIL) {
            pos = s614;
            t611 = FAIL;
          } else t611 = t613;
        }
      }
      t606 = t611 === FAIL ? void 0 : t611;
      if (t606 === FAIL) {
        pos = s603;
        v = FAIL;
        break L602;
      }
      const a615 = [];
      if (t604 !== void 0) a615.push(t604);
      if (t605 !== void 0) a615.push(t605);
      if (t606 !== void 0) a615.push(t606);
      v = a615;
    }
    return v === FAIL ? FAIL : A_linearStop(v);
  }
  function r_quoted() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T8[c] === 1 : pos < len) {
        RE10.lastIndex = pos;
        if (RE10.test(src)) {
          const e = RE10.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_textGroup() {
    let v;
    L616: {
      const s617 = pos;
      let t618;
      if (src.charCodeAt(pos) === 40) {
        pos += 1;
        t618 = "(";
      } else t618 = FAIL;
      if (t618 === FAIL) {
        v = FAIL;
        break L616;
      }
      let t619;
      t619 = r_textBody();
      if (t619 === FAIL) {
        pos = s617;
        v = FAIL;
        break L616;
      }
      let t620;
      if (src.charCodeAt(pos) === 41) {
        pos += 1;
        t620 = ")";
      } else t620 = FAIL;
      if (t620 === FAIL) {
        pos = s617;
        v = FAIL;
        break L616;
      }
      const a621 = [];
      a621.push(t618);
      if (t619 !== void 0) a621.push(t619);
      a621.push(t620);
      v = a621;
    }
    return v;
  }
  function r_textBody() {
    let v;
    {
      const a624 = [];
      for (; ; ) {
        const s623 = pos;
        let t622;
        {
          const c = src.charCodeAt(pos);
          let t625;
          switch (c < 128 ? D63[c] : 3) {
            case 0:
              t625 = h626();
              if (t625 !== FAIL) {
                t622 = t625;
                break;
              }
              t622 = FAIL;
              break;
            case 1:
              t625 = r_quoted();
              if (t625 !== FAIL) {
                t622 = t625;
                break;
              }
              t622 = FAIL;
              break;
            case 2:
              t625 = r_textGroup();
              if (t625 !== FAIL) {
                t622 = t625;
                break;
              }
              t622 = FAIL;
              break;
            case 3:
              t622 = FAIL;
              break;
          }
        }
        if (t622 === FAIL || pos === s623) break;
        a624.push(t622);
      }
      v = a624;
    }
    return v;
  }
  function r_commaRun() {
    let v;
    {
      const a629 = [];
      for (; ; ) {
        const s628 = pos;
        let t627;
        {
          const c = src.charCodeAt(pos);
          let t630;
          switch (c < 128 ? D64[c] : 3) {
            case 0:
              t630 = h631();
              if (t630 !== FAIL) {
                t627 = t630;
                break;
              }
              t627 = FAIL;
              break;
            case 1:
              t630 = r_quoted();
              if (t630 !== FAIL) {
                t627 = t630;
                break;
              }
              t627 = FAIL;
              break;
            case 2:
              t630 = r_textGroup();
              if (t630 !== FAIL) {
                t627 = t630;
                break;
              }
              t627 = FAIL;
              break;
            case 3:
              t627 = FAIL;
              break;
          }
        }
        if (t627 === FAIL || pos === s628) break;
        a629.push(t627);
      }
      v = a629;
    }
    return v === FAIL ? FAIL : A_commaRun(v);
  }
  function r_commaItems() {
    let v;
    L632: {
      const s633 = pos;
      let t634;
      t634 = r_commaRun();
      if (t634 === FAIL) {
        v = FAIL;
        break L632;
      }
      let t635;
      {
        const a638 = [];
        for (; ; ) {
          const s637 = pos;
          let t636;
          L639: {
            const s640 = pos;
            let t641;
            if (src.charCodeAt(pos) === 44) {
              pos += 1;
              t641 = ",";
            } else t641 = FAIL;
            if (t641 === FAIL) {
              t636 = FAIL;
              break L639;
            }
            let t642;
            t642 = r_commaRun();
            if (t642 === FAIL) {
              pos = s640;
              t636 = FAIL;
              break L639;
            }
            const a643 = [];
            a643.push(t641);
            if (t642 !== void 0) a643.push(t642);
            t636 = a643;
          }
          if (t636 === FAIL || pos === s637) break;
          a638.push(t636);
        }
        t635 = a638;
      }
      if (t635 === FAIL) {
        pos = s633;
        v = FAIL;
        break L632;
      }
      const a644 = [];
      if (t634 !== void 0) a644.push(t634);
      a644.push(t635);
      v = a644;
    }
    return v === FAIL ? FAIL : A_commaItems(v);
  }
  function r_semiRun() {
    let v;
    {
      const a647 = [];
      for (; ; ) {
        const s646 = pos;
        let t645;
        {
          const c = src.charCodeAt(pos);
          let t648;
          switch (c < 128 ? D66[c] : 3) {
            case 0:
              t648 = h649();
              if (t648 !== FAIL) {
                t645 = t648;
                break;
              }
              t645 = FAIL;
              break;
            case 1:
              t648 = r_quoted();
              if (t648 !== FAIL) {
                t645 = t648;
                break;
              }
              t645 = FAIL;
              break;
            case 2:
              t648 = r_textGroup();
              if (t648 !== FAIL) {
                t645 = t648;
                break;
              }
              t645 = FAIL;
              break;
            case 3:
              t645 = FAIL;
              break;
          }
        }
        if (t645 === FAIL || pos === s646) break;
        a647.push(t645);
      }
      v = a647;
    }
    return v === FAIL ? FAIL : A_semiRun(v);
  }
  function r_semiItems() {
    let v;
    L650: {
      const s651 = pos;
      let t652;
      t652 = r_semiRun();
      if (t652 === FAIL) {
        v = FAIL;
        break L650;
      }
      let t653;
      {
        const a656 = [];
        for (; ; ) {
          const s655 = pos;
          let t654;
          L657: {
            const s658 = pos;
            let t659;
            if (src.charCodeAt(pos) === 59) {
              pos += 1;
              t659 = ";";
            } else t659 = FAIL;
            if (t659 === FAIL) {
              t654 = FAIL;
              break L657;
            }
            let t660;
            t660 = r_semiRun();
            if (t660 === FAIL) {
              pos = s658;
              t654 = FAIL;
              break L657;
            }
            const a661 = [];
            a661.push(t659);
            if (t660 !== void 0) a661.push(t660);
            t654 = a661;
          }
          if (t654 === FAIL || pos === s655) break;
          a656.push(t654);
        }
        t653 = a656;
      }
      if (t653 === FAIL) {
        pos = s651;
        v = FAIL;
        break L650;
      }
      const a662 = [];
      if (t652 !== void 0) a662.push(t652);
      a662.push(t653);
      v = a662;
    }
    return v === FAIL ? FAIL : A_semiItems(v);
  }
  function r_spaceRun() {
    let v;
    {
      const a665 = [];
      for (; ; ) {
        const s664 = pos;
        let t663;
        {
          const c = src.charCodeAt(pos);
          let t666;
          switch (c < 128 ? D68[c] : 1) {
            case 0:
              t666 = h667();
              if (t666 !== FAIL) {
                t663 = t666;
                break;
              }
              t663 = FAIL;
              break;
            case 1:
              t663 = FAIL;
              break;
            case 2:
              t666 = r_quoted();
              if (t666 !== FAIL) {
                t663 = t666;
                break;
              }
              t663 = FAIL;
              break;
            case 3:
              t666 = r_textGroup();
              if (t666 !== FAIL) {
                t663 = t666;
                break;
              }
              t663 = FAIL;
              break;
          }
        }
        if (t663 === FAIL || pos === s664) break;
        a665.push(t663);
      }
      v = a665.length === 0 ? FAIL : a665;
    }
    return v === FAIL ? FAIL : A_spaceRun(v);
  }
  function r_spaceItems() {
    let v;
    L668: {
      const s669 = pos;
      let t670;
      t670 = r_ws();
      if (t670 === FAIL) {
        v = FAIL;
        break L668;
      }
      let t671;
      {
        const a674 = [];
        for (; ; ) {
          const s673 = pos;
          let t672;
          L675: {
            const s676 = pos;
            let t677;
            t677 = r_spaceRun();
            if (t677 === FAIL) {
              t672 = FAIL;
              break L675;
            }
            let t678;
            t678 = r_ws();
            if (t678 === FAIL) {
              pos = s676;
              t672 = FAIL;
              break L675;
            }
            const a679 = [];
            if (t677 !== void 0) a679.push(t677);
            if (t678 !== void 0) a679.push(t678);
            t672 = a679;
          }
          if (t672 === FAIL || pos === s673) break;
          a674.push(t672);
        }
        t671 = a674;
      }
      if (t671 === FAIL) {
        pos = s669;
        v = FAIL;
        break L668;
      }
      const a680 = [];
      if (t670 !== void 0) a680.push(t670);
      a680.push(t671);
      v = a680;
    }
    return v === FAIL ? FAIL : A_spaceItems(v);
  }
  function r_restText() {
    let v;
    let t681;
    if (pos < len) {
      const e = len;
      if (e === pos) t681 = FAIL;
      else {
        t681 = src.substring(pos, e);
        pos = e;
      }
    } else t681 = FAIL;
    v = t681 === FAIL ? void 0 : t681;
    return v === FAIL ? FAIL : A_restText(v);
  }
  function r_comment() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T41[c] === 1 : pos < len) {
        RE53.lastIndex = pos;
        if (RE53.test(src)) {
          const e = RE53.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_ruleGap() {
    let v;
    {
      const a684 = [];
      for (; ; ) {
        const s683 = pos;
        let t682;
        {
          const c = src.charCodeAt(pos);
          let t685;
          switch (c < 128 ? D73[c] : 0) {
            case 0:
              t682 = FAIL;
              break;
            case 1:
              t685 = h686();
              if (t685 !== FAIL) {
                t682 = t685;
                break;
              }
              t682 = FAIL;
              break;
            case 2:
              t685 = r_comment();
              if (t685 !== FAIL) {
                t682 = t685;
                break;
              }
              t682 = FAIL;
              break;
          }
        }
        if (t682 === FAIL || pos === s683) break;
        a684.push(t682);
      }
      v = a684;
    }
    return v;
  }
  function r_preludeRun() {
    let v;
    {
      const a689 = [];
      for (; ; ) {
        const s688 = pos;
        let t687;
        {
          const c = src.charCodeAt(pos);
          let t690;
          switch (c < 128 ? D76[c] : 3) {
            case 0:
              t690 = h691();
              if (t690 !== FAIL) {
                t687 = t690;
                break;
              }
              t687 = FAIL;
              break;
            case 1:
              t690 = r_quoted();
              if (t690 !== FAIL) {
                t687 = t690;
                break;
              }
              t687 = FAIL;
              break;
            case 2:
              t690 = r_textGroup();
              if (t690 !== FAIL) {
                t687 = t690;
                break;
              }
              t687 = FAIL;
              break;
            case 3:
              t687 = FAIL;
              break;
          }
        }
        if (t687 === FAIL || pos === s688) break;
        a689.push(t687);
      }
      v = a689;
    }
    return v === FAIL ? FAIL : A_preludeRun(v);
  }
  function r_blockBody() {
    let v;
    {
      const a694 = [];
      for (; ; ) {
        const s693 = pos;
        let t692;
        {
          const c = src.charCodeAt(pos);
          let t695;
          switch (c < 128 ? D78[c] : 3) {
            case 0:
              t695 = h696();
              if (t695 !== FAIL) {
                t692 = t695;
                break;
              }
              t692 = FAIL;
              break;
            case 1:
              t695 = r_quoted();
              if (t695 !== FAIL) {
                t692 = t695;
                break;
              }
              t695 = r_openQuote();
              if (t695 !== FAIL) {
                t692 = t695;
                break;
              }
              t692 = FAIL;
              break;
            case 2:
              t695 = h697();
              if (t695 !== FAIL) {
                t692 = t695;
                break;
              }
              t692 = FAIL;
              break;
            case 3:
              t692 = FAIL;
              break;
          }
        }
        if (t692 === FAIL || pos === s693) break;
        a694.push(t692);
      }
      v = a694;
    }
    return v;
  }
  function r_openQuote() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T8[c] === 1 : pos < len) {
        RE54.lastIndex = pos;
        if (RE54.test(src)) {
          const e = RE54.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_semiTail() {
    let v;
    if (src.charCodeAt(pos) === 59) {
      pos += 1;
      v = ";";
    } else v = FAIL;
    return v === FAIL ? FAIL : A_semiTail(v);
  }
  function r_blockTail() {
    let v;
    {
      const s706 = pos;
      let t704;
      {
        const s709 = pos;
        let t707;
        if (src.charCodeAt(pos) === 123) {
          pos += 1;
          t707 = 0;
        } else t707 = FAIL;
        if (t707 === FAIL) t704 = FAIL;
        else {
          let t708;
          t708 = r_blockBody();
          if (t708 === FAIL) {
            pos = s709;
            t704 = FAIL;
          } else t704 = t708;
        }
      }
      if (t704 === FAIL) v = FAIL;
      else {
        let t705;
        if (src.charCodeAt(pos) === 125) {
          pos += 1;
          t705 = 0;
        } else t705 = FAIL;
        if (t705 === FAIL) {
          pos = s706;
          v = FAIL;
        } else v = t704;
      }
    }
    return v === FAIL ? FAIL : A_blockTail(v);
  }
  function r_ruleBlock() {
    let v;
    {
      const s711 = pos;
      let t710;
      t710 = q_openComment();
      if (t710 !== FAIL) {
        pos = s711;
        v = FAIL;
      } else {
        L712: {
          const s713 = pos;
          let t714;
          t714 = r_preludeRun();
          if (t714 === FAIL) {
            v = FAIL;
            break L712;
          }
          let t715;
          {
            const c = src.charCodeAt(pos);
            let t716;
            switch (c < 128 ? D80[c] : 0) {
              case 0:
                t715 = FAIL;
                break;
              case 1:
                t716 = r_semiTail();
                if (t716 !== FAIL) {
                  t715 = t716;
                  break;
                }
                t715 = FAIL;
                break;
              case 2:
                t716 = r_blockTail();
                if (t716 !== FAIL) {
                  t715 = t716;
                  break;
                }
                t715 = FAIL;
                break;
            }
          }
          if (t715 === FAIL) {
            pos = s713;
            v = FAIL;
            break L712;
          }
          const a717 = [];
          if (t714 !== void 0) a717.push(t714);
          if (t715 !== void 0) a717.push(t715);
          v = a717;
        }
      }
    }
    return v === FAIL ? FAIL : A_ruleBlock(v);
  }
  function r_openComment() {
    const s0 = pos;
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T41[c] === 1 : pos < len) {
        RE55.lastIndex = pos;
        if (RE55.test(src)) {
          const e = RE55.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_openComment(v, s0, pos);
  }
  function r_openBlock() {
    const s0 = pos;
    let v;
    L718: {
      const s719 = pos;
      let t720;
      t720 = r_preludeRun();
      if (t720 === FAIL) {
        v = FAIL;
        break L718;
      }
      let t721;
      if (src.charCodeAt(pos) === 123) {
        pos += 1;
        t721 = "{";
      } else t721 = FAIL;
      if (t721 === FAIL) {
        pos = s719;
        v = FAIL;
        break L718;
      }
      let t722;
      t722 = r_restText();
      if (t722 === FAIL) {
        pos = s719;
        v = FAIL;
        break L718;
      }
      const a723 = [];
      if (t720 !== void 0) a723.push(t720);
      a723.push(t721);
      if (t722 !== void 0) a723.push(t722);
      v = a723;
    }
    return v === FAIL ? FAIL : A_openBlock(v, s0, pos);
  }
  function r_openRule() {
    const s0 = pos;
    let v;
    if (pos < len) {
      const e = len;
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v === FAIL ? FAIL : A_openRule(v, s0, pos);
  }
  function r_ruleList() {
    let v;
    L724: {
      const s725 = pos;
      let t726;
      t726 = r_ruleGap();
      if (t726 === FAIL) {
        v = FAIL;
        break L724;
      }
      let t727;
      {
        const a731 = [];
        for (; ; ) {
          const s730 = pos;
          let t729;
          L732: {
            const s733 = pos;
            let t734;
            t734 = r_ruleBlock();
            if (t734 === FAIL) {
              t729 = FAIL;
              break L732;
            }
            let t735;
            t735 = r_ruleGap();
            if (t735 === FAIL) {
              pos = s733;
              t729 = FAIL;
              break L732;
            }
            const a736 = [];
            if (t734 !== void 0) a736.push(t734);
            a736.push(t735);
            t729 = a736;
          }
          if (t729 === FAIL || pos === s730) break;
          a731.push(t729);
        }
        t727 = a731;
      }
      if (t727 === FAIL) {
        pos = s725;
        v = FAIL;
        break L724;
      }
      let t728;
      let t737;
      {
        const c = src.charCodeAt(pos);
        let t738;
        switch (c < 128 ? D81[c] : 2) {
          case 0:
            t738 = r_openBlock();
            if (t738 !== FAIL) {
              t737 = t738;
              break;
            }
            t738 = r_openRule();
            if (t738 !== FAIL) {
              t737 = t738;
              break;
            }
            t737 = FAIL;
            break;
          case 1:
            t738 = r_openRule();
            if (t738 !== FAIL) {
              t737 = t738;
              break;
            }
            t737 = FAIL;
            break;
          case 2:
            t738 = r_openComment();
            if (t738 !== FAIL) {
              t737 = t738;
              break;
            }
            t738 = r_openBlock();
            if (t738 !== FAIL) {
              t737 = t738;
              break;
            }
            t738 = r_openRule();
            if (t738 !== FAIL) {
              t737 = t738;
              break;
            }
            t737 = FAIL;
            break;
        }
      }
      t728 = t737 === FAIL ? void 0 : t737;
      if (t728 === FAIL) {
        pos = s725;
        v = FAIL;
        break L724;
      }
      const a739 = [];
      a739.push(t726);
      a739.push(t727);
      if (t728 !== void 0) a739.push(t728);
      v = a739;
    }
    return v === FAIL ? FAIL : A_ruleList(v);
  }
  function r_atPrelude() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t740;
      switch (c < 128 ? D82[c] : 1) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t740 = r_atKeyframes();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          t740 = r_atProperty();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          t740 = r_atFunction();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          t740 = r_atScope();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          t740 = r_atStartingStyle();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          t740 = r_atScrollTimeline();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          t740 = r_atViewTimeline();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          t740 = r_atOther();
          if (t740 !== FAIL) {
            v = t740;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function r_atKeyframes() {
    let v;
    L741: {
      const s742 = pos;
      let t743;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T45[c] === 1 : pos < len) {
          RE56.lastIndex = pos;
          if (RE56.test(src)) {
            const e = RE56.lastIndex;
            if (e > pos) {
              t743 = src.substring(pos, e);
              pos = e;
            } else t743 = void 0;
          } else t743 = FAIL;
        } else t743 = FAIL;
      }
      if (t743 === FAIL) {
        v = FAIL;
        break L741;
      }
      let t744;
      t744 = r_restText();
      if (t744 === FAIL) {
        pos = s742;
        v = FAIL;
        break L741;
      }
      const a745 = [];
      if (t743 !== void 0) a745.push(t743);
      if (t744 !== void 0) a745.push(t744);
      v = a745;
    }
    return v === FAIL ? FAIL : A_atKeyframes(v);
  }
  function r_atProperty() {
    let v;
    L746: {
      const s747 = pos;
      let t748;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T45[c] === 1 : pos < len) {
          RE57.lastIndex = pos;
          if (RE57.test(src)) {
            const e = RE57.lastIndex;
            if (e > pos) {
              t748 = src.substring(pos, e);
              pos = e;
            } else t748 = void 0;
          } else t748 = FAIL;
        } else t748 = FAIL;
      }
      if (t748 === FAIL) {
        v = FAIL;
        break L746;
      }
      let t749;
      t749 = r_restText();
      if (t749 === FAIL) {
        pos = s747;
        v = FAIL;
        break L746;
      }
      const a750 = [];
      if (t748 !== void 0) a750.push(t748);
      if (t749 !== void 0) a750.push(t749);
      v = a750;
    }
    return v === FAIL ? FAIL : A_atProperty(v);
  }
  function r_atFunction() {
    let v;
    L751: {
      const s752 = pos;
      let t753;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T45[c] === 1 : pos < len) {
          RE58.lastIndex = pos;
          if (RE58.test(src)) {
            const e = RE58.lastIndex;
            if (e > pos) {
              t753 = src.substring(pos, e);
              pos = e;
            } else t753 = void 0;
          } else t753 = FAIL;
        } else t753 = FAIL;
      }
      if (t753 === FAIL) {
        v = FAIL;
        break L751;
      }
      let t754;
      t754 = r_restText();
      if (t754 === FAIL) {
        pos = s752;
        v = FAIL;
        break L751;
      }
      const a755 = [];
      if (t753 !== void 0) a755.push(t753);
      if (t754 !== void 0) a755.push(t754);
      v = a755;
    }
    return v === FAIL ? FAIL : A_atFunction(v);
  }
  function r_atScope() {
    let v;
    L756: {
      const s757 = pos;
      let t758;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T45[c] === 1 : pos < len) {
          RE59.lastIndex = pos;
          if (RE59.test(src)) {
            const e = RE59.lastIndex;
            if (e > pos) {
              t758 = src.substring(pos, e);
              pos = e;
            } else t758 = void 0;
          } else t758 = FAIL;
        } else t758 = FAIL;
      }
      if (t758 === FAIL) {
        v = FAIL;
        break L756;
      }
      let t759;
      t759 = r_restText();
      if (t759 === FAIL) {
        pos = s757;
        v = FAIL;
        break L756;
      }
      const a760 = [];
      if (t758 !== void 0) a760.push(t758);
      if (t759 !== void 0) a760.push(t759);
      v = a760;
    }
    return v === FAIL ? FAIL : A_atScope(v);
  }
  function r_atStartingStyle() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T45[c] === 1 : pos < len) {
        RE60.lastIndex = pos;
        if (RE60.test(src)) {
          const e = RE60.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_atStartingStyle(v);
  }
  function r_atScrollTimeline() {
    let v;
    L761: {
      const s762 = pos;
      let t763;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T45[c] === 1 : pos < len) {
          RE61.lastIndex = pos;
          if (RE61.test(src)) {
            const e = RE61.lastIndex;
            if (e > pos) {
              t763 = src.substring(pos, e);
              pos = e;
            } else t763 = void 0;
          } else t763 = FAIL;
        } else t763 = FAIL;
      }
      if (t763 === FAIL) {
        v = FAIL;
        break L761;
      }
      let t764;
      t764 = r_restText();
      if (t764 === FAIL) {
        pos = s762;
        v = FAIL;
        break L761;
      }
      const a765 = [];
      if (t763 !== void 0) a765.push(t763);
      if (t764 !== void 0) a765.push(t764);
      v = a765;
    }
    return v === FAIL ? FAIL : A_atScrollTimeline(v);
  }
  function r_atViewTimeline() {
    let v;
    L766: {
      const s767 = pos;
      let t768;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T45[c] === 1 : pos < len) {
          RE62.lastIndex = pos;
          if (RE62.test(src)) {
            const e = RE62.lastIndex;
            if (e > pos) {
              t768 = src.substring(pos, e);
              pos = e;
            } else t768 = void 0;
          } else t768 = FAIL;
        } else t768 = FAIL;
      }
      if (t768 === FAIL) {
        v = FAIL;
        break L766;
      }
      let t769;
      t769 = r_restText();
      if (t769 === FAIL) {
        pos = s767;
        v = FAIL;
        break L766;
      }
      const a770 = [];
      if (t768 !== void 0) a770.push(t768);
      if (t769 !== void 0) a770.push(t769);
      v = a770;
    }
    return v === FAIL ? FAIL : A_atViewTimeline(v);
  }
  function r_atOther() {
    let v;
    L771: {
      const s772 = pos;
      let t773;
      t773 = r_atName();
      if (t773 === FAIL) {
        v = FAIL;
        break L771;
      }
      let t774;
      let t775;
      t775 = r_atRest();
      t774 = t775 === FAIL ? void 0 : t775;
      if (t774 === FAIL) {
        pos = s772;
        v = FAIL;
        break L771;
      }
      const a776 = [];
      if (t773 !== void 0) a776.push(t773);
      if (t774 !== void 0) a776.push(t774);
      v = a776;
    }
    return v === FAIL ? FAIL : A_atOther(v);
  }
  function r_atName() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T45[c] === 1 : pos < len) {
        RE63.lastIndex = pos;
        if (RE63.test(src)) {
          const e = RE63.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_atName(v);
  }
  function r_atRest() {
    let v;
    {
      const s779 = pos;
      let t777;
      if (src.charCodeAt(pos) === 32) {
        pos += 1;
        t777 = 0;
      } else t777 = FAIL;
      if (t777 === FAIL) v = FAIL;
      else {
        let t778;
        t778 = r_restText();
        if (t778 === FAIL) {
          pos = s779;
          v = FAIL;
        } else v = t778;
      }
    }
    return v === FAIL ? FAIL : A_atRest(v);
  }
  function r_propertyName() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T7[c] === 1 : pos < len) {
        RE64.lastIndex = pos;
        if (RE64.test(src)) {
          const e = RE64.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_syntaxText() {
    let v;
    L780: {
      const s781 = pos;
      let t782;
      let t785;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T8[c] === 1 : pos < len) {
          RE65.lastIndex = pos;
          if (RE65.test(src)) {
            const e = RE65.lastIndex;
            if (e > pos) {
              t785 = src.substring(pos, e);
              pos = e;
            } else t785 = void 0;
          } else t785 = FAIL;
        } else t785 = FAIL;
      }
      t782 = t785 === FAIL ? void 0 : t785;
      if (t782 === FAIL) {
        v = FAIL;
        break L780;
      }
      let t783;
      let t786;
      t786 = r_syntaxCore();
      t783 = t786 === FAIL ? void 0 : t786;
      if (t783 === FAIL) {
        pos = s781;
        v = FAIL;
        break L780;
      }
      let t784;
      let t787;
      {
        const c = src.charCodeAt(pos);
        if (c < 128 ? T8[c] === 1 : pos < len) {
          RE65.lastIndex = pos;
          if (RE65.test(src)) {
            const e = RE65.lastIndex;
            if (e > pos) {
              t787 = src.substring(pos, e);
              pos = e;
            } else t787 = void 0;
          } else t787 = FAIL;
        } else t787 = FAIL;
      }
      t784 = t787 === FAIL ? void 0 : t787;
      if (t784 === FAIL) {
        pos = s781;
        v = FAIL;
        break L780;
      }
      const a788 = [];
      if (t782 !== void 0) a788.push(t782);
      if (t783 !== void 0) a788.push(t783);
      if (t784 !== void 0) a788.push(t784);
      v = a788;
    }
    return v === FAIL ? FAIL : A_syntaxText(v);
  }
  function r_syntaxCore() {
    let v;
    if (pos < len) {
      RE66.lastIndex = pos;
      if (RE66.test(src)) {
        const e = RE66.lastIndex;
        if (e > pos) {
          v = src.substring(pos, e);
          pos = e;
        } else v = void 0;
      } else v = FAIL;
    } else v = FAIL;
    return v === FAIL ? FAIL : A_syntaxCore(v);
  }
  function r_syntaxPart() {
    let v;
    let t789;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T46[c] === 0 : false) break;
      }
      if (e === pos) t789 = FAIL;
      else {
        t789 = src.substring(pos, e);
        pos = e;
      }
    } else t789 = FAIL;
    v = t789 === FAIL ? void 0 : t789;
    return v === FAIL ? FAIL : A_syntaxPart(v);
  }
  function r_syntaxAlts() {
    let v;
    L790: {
      const s791 = pos;
      let t792;
      t792 = r_syntaxPart();
      if (t792 === FAIL) {
        v = FAIL;
        break L790;
      }
      let t793;
      {
        const a796 = [];
        for (; ; ) {
          const s795 = pos;
          let t794;
          L797: {
            const s798 = pos;
            let t799;
            if (src.charCodeAt(pos) === 124) {
              pos += 1;
              t799 = "|";
            } else t799 = FAIL;
            if (t799 === FAIL) {
              t794 = FAIL;
              break L797;
            }
            let t800;
            t800 = r_syntaxPart();
            if (t800 === FAIL) {
              pos = s798;
              t794 = FAIL;
              break L797;
            }
            const a801 = [];
            a801.push(t799);
            if (t800 !== void 0) a801.push(t800);
            t794 = a801;
          }
          if (t794 === FAIL || pos === s795) break;
          a796.push(t794);
        }
        t793 = a796;
      }
      if (t793 === FAIL) {
        pos = s791;
        v = FAIL;
        break L790;
      }
      const a802 = [];
      if (t792 !== void 0) a802.push(t792);
      a802.push(t793);
      v = a802;
    }
    return v === FAIL ? FAIL : A_syntaxAlts(v);
  }
  function r_scopeGroup() {
    let v;
    {
      const s805 = pos;
      let t803;
      {
        const s808 = pos;
        let t806;
        if (src.charCodeAt(pos) === 40) {
          pos += 1;
          t806 = 0;
        } else t806 = FAIL;
        if (t806 === FAIL) t803 = FAIL;
        else {
          let t807;
          t807 = r_textBody();
          if (t807 === FAIL) {
            pos = s808;
            t803 = FAIL;
          } else t803 = t807;
        }
      }
      if (t803 === FAIL) v = FAIL;
      else {
        let t804;
        if (src.charCodeAt(pos) === 41) {
          pos += 1;
          t804 = 0;
        } else t804 = FAIL;
        if (t804 === FAIL) {
          pos = s805;
          v = FAIL;
        } else v = t803;
      }
    }
    return v === FAIL ? FAIL : A_scopeGroup(v);
  }
  function r_scopeLimit() {
    let v;
    {
      const s811 = pos;
      let t809;
      {
        const s814 = pos;
        let t812;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T47[c] === 1 : pos < len) {
            RE67.lastIndex = pos;
            if (RE67.test(src)) {
              const e = RE67.lastIndex;
              if (e > pos) {
                t812 = 0;
                pos = e;
              } else t812 = 0;
            } else t812 = FAIL;
          } else t812 = FAIL;
        }
        if (t812 === FAIL) t809 = FAIL;
        else {
          let t813;
          t813 = q_ws();
          if (t813 === FAIL) {
            pos = s814;
            t809 = FAIL;
          } else t809 = t813;
        }
      }
      if (t809 === FAIL) v = FAIL;
      else {
        let t810;
        t810 = r_scopeGroup();
        if (t810 === FAIL) {
          pos = s811;
          v = FAIL;
        } else v = t810;
      }
    }
    return v === FAIL ? FAIL : A_scopeLimit(v);
  }
  function r_scopePrelude() {
    let v;
    L815: {
      const s816 = pos;
      let t817;
      t817 = r_ws();
      if (t817 === FAIL) {
        v = FAIL;
        break L815;
      }
      let t818;
      let t819;
      L820: {
        const s821 = pos;
        let t822;
        t822 = r_scopeGroup();
        if (t822 === FAIL) {
          t819 = FAIL;
          break L820;
        }
        let t823;
        let t825;
        {
          const s828 = pos;
          let t826;
          t826 = q_ws();
          if (t826 === FAIL) t825 = FAIL;
          else {
            let t827;
            t827 = r_scopeLimit();
            if (t827 === FAIL) {
              pos = s828;
              t825 = FAIL;
            } else t825 = t827;
          }
        }
        t823 = t825 === FAIL ? void 0 : t825;
        if (t823 === FAIL) {
          pos = s821;
          t819 = FAIL;
          break L820;
        }
        let t824;
        t824 = r_ws();
        if (t824 === FAIL) {
          pos = s821;
          t819 = FAIL;
          break L820;
        }
        const a829 = [];
        if (t822 !== void 0) a829.push(t822);
        if (t823 !== void 0) a829.push(t823);
        if (t824 !== void 0) a829.push(t824);
        t819 = a829;
      }
      t818 = t819 === FAIL ? void 0 : t819;
      if (t818 === FAIL) {
        pos = s816;
        v = FAIL;
        break L815;
      }
      const a830 = [];
      if (t817 !== void 0) a830.push(t817);
      if (t818 !== void 0) a830.push(t818);
      v = a830;
    }
    return v === FAIL ? FAIL : A_scopePrelude(v);
  }
  function r_functionName() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T7[c] === 1 : pos < len) {
        RE68.lastIndex = pos;
        if (RE68.test(src)) {
          const e = RE68.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_functionName(v);
  }
  function r_functionParams() {
    let v;
    if (pos < len) {
      RE69.lastIndex = pos;
      if (RE69.test(src)) {
        const e = RE69.lastIndex;
        if (e > pos) {
          v = src.substring(pos, e);
          pos = e;
        } else v = void 0;
      } else v = FAIL;
    } else v = FAIL;
    return v === FAIL ? FAIL : A_functionParams(v);
  }
  function r_functionHead() {
    let v;
    L831: {
      const s832 = pos;
      let t833;
      {
        const s837 = pos;
        let t835;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T45[c] === 1 : pos < len) {
            RE70.lastIndex = pos;
            if (RE70.test(src)) {
              const e = RE70.lastIndex;
              if (e > pos) {
                t835 = 0;
                pos = e;
              } else t835 = 0;
            } else t835 = FAIL;
          } else t835 = FAIL;
        }
        if (t835 === FAIL) t833 = FAIL;
        else {
          let t836;
          t836 = r_functionName();
          if (t836 === FAIL) {
            pos = s837;
            t833 = FAIL;
          } else t833 = t836;
        }
      }
      if (t833 === FAIL) {
        v = FAIL;
        break L831;
      }
      let t834;
      {
        const s840 = pos;
        let t838;
        {
          const s843 = pos;
          let t841;
          {
            const c = src.charCodeAt(pos);
            if (c < 128 ? T48[c] === 1 : pos < len) {
              RE71.lastIndex = pos;
              if (RE71.test(src)) {
                const e = RE71.lastIndex;
                if (e > pos) {
                  t841 = 0;
                  pos = e;
                } else t841 = 0;
              } else t841 = FAIL;
            } else t841 = FAIL;
          }
          if (t841 === FAIL) t838 = FAIL;
          else {
            let t842;
            t842 = r_functionParams();
            if (t842 === FAIL) {
              pos = s843;
              t838 = FAIL;
            } else t838 = t842;
          }
        }
        if (t838 === FAIL) t834 = FAIL;
        else {
          let t839;
          if (src.charCodeAt(pos) === 41) {
            pos += 1;
            t839 = 0;
          } else t839 = FAIL;
          if (t839 === FAIL) {
            pos = s840;
            t834 = FAIL;
          } else t834 = t838;
        }
      }
      if (t834 === FAIL) {
        pos = s832;
        v = FAIL;
        break L831;
      }
      const a844 = [];
      if (t833 !== void 0) a844.push(t833);
      if (t834 !== void 0) a844.push(t834);
      v = a844;
    }
    return v === FAIL ? FAIL : A_functionHead(v);
  }
  function r_colonRun() {
    let v;
    {
      const a847 = [];
      for (; ; ) {
        const s846 = pos;
        let t845;
        {
          const c = src.charCodeAt(pos);
          let t848;
          switch (c < 128 ? D87[c] : 3) {
            case 0:
              t848 = h849();
              if (t848 !== FAIL) {
                t845 = t848;
                break;
              }
              t845 = FAIL;
              break;
            case 1:
              t848 = r_quoted();
              if (t848 !== FAIL) {
                t845 = t848;
                break;
              }
              t845 = FAIL;
              break;
            case 2:
              t848 = r_textGroup();
              if (t848 !== FAIL) {
                t845 = t848;
                break;
              }
              t845 = FAIL;
              break;
            case 3:
              t845 = FAIL;
              break;
          }
        }
        if (t845 === FAIL || pos === s846) break;
        a847.push(t845);
      }
      v = a847;
    }
    return v === FAIL ? FAIL : A_colonRun(v);
  }
  function r_paramDefault() {
    let v;
    {
      const s852 = pos;
      let t850;
      if (src.charCodeAt(pos) === 58) {
        pos += 1;
        t850 = 0;
      } else t850 = FAIL;
      if (t850 === FAIL) v = FAIL;
      else {
        let t851;
        t851 = r_restText();
        if (t851 === FAIL) {
          pos = s852;
          v = FAIL;
        } else v = t851;
      }
    }
    return v === FAIL ? FAIL : A_paramDefault(v);
  }
  function r_functionParam() {
    let v;
    L853: {
      const s854 = pos;
      let t855;
      t855 = r_colonRun();
      if (t855 === FAIL) {
        v = FAIL;
        break L853;
      }
      let t856;
      let t857;
      t857 = r_paramDefault();
      t856 = t857 === FAIL ? void 0 : t857;
      if (t856 === FAIL) {
        pos = s854;
        v = FAIL;
        break L853;
      }
      const a858 = [];
      if (t855 !== void 0) a858.push(t855);
      if (t856 !== void 0) a858.push(t856);
      v = a858;
    }
    return v === FAIL ? FAIL : A_functionParam(v);
  }
  function r_paramName() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T7[c] === 1 : pos < len) {
        RE68.lastIndex = pos;
        if (RE68.test(src)) {
          const e = RE68.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_paramName(v);
  }
  function r_paramSyntax() {
    let v;
    {
      const s861 = pos;
      let t859;
      if (pos < len) {
        let e = pos;
        for (; e < len; e++) {
          const c = src.charCodeAt(e);
          if (c < 128 ? T0[c] === 0 : !(NA0.lastIndex = e, NA0.test(src))) break;
        }
        if (e === pos) t859 = FAIL;
        else {
          t859 = 0;
          pos = e;
        }
      } else t859 = FAIL;
      if (t859 === FAIL) v = FAIL;
      else {
        let t860;
        if (pos < len) {
          let e = pos;
          for (; e < len; e++) {
            const c = src.charCodeAt(e);
            if (c < 128 ? T50[c] === 0 : false) break;
          }
          if (e === pos) t860 = FAIL;
          else {
            t860 = src.substring(pos, e);
            pos = e;
          }
        } else t860 = FAIL;
        if (t860 === FAIL) {
          pos = s861;
          v = FAIL;
        } else v = t860;
      }
    }
    return v === FAIL ? FAIL : A_paramSyntax(v);
  }
  function r_paramHead() {
    let v;
    L862: {
      const s863 = pos;
      let t864;
      t864 = r_paramName();
      if (t864 === FAIL) {
        v = FAIL;
        break L862;
      }
      let t865;
      let t866;
      t866 = r_paramSyntax();
      t865 = t866 === FAIL ? void 0 : t866;
      if (t865 === FAIL) {
        pos = s863;
        v = FAIL;
        break L862;
      }
      const a867 = [];
      if (t864 !== void 0) a867.push(t864);
      if (t865 !== void 0) a867.push(t865);
      v = a867;
    }
    return v === FAIL ? FAIL : A_paramHead(v);
  }
  function r_declName() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T51[c] === 0 : false) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = src.substring(pos, e);
        pos = e;
      }
    } else v = FAIL;
    return v === FAIL ? FAIL : A_declName(v);
  }
  function r_declValue() {
    let v;
    let t868;
    if (pos < len) {
      RE72.lastIndex = pos;
      if (RE72.test(src)) {
        const e = RE72.lastIndex;
        if (e > pos) {
          t868 = src.substring(pos, e);
          pos = e;
        } else t868 = void 0;
      } else t868 = FAIL;
    } else t868 = FAIL;
    v = t868 === FAIL ? void 0 : t868;
    return v === FAIL ? FAIL : A_declValue(v);
  }
  function r_declImportant() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T52[c] === 1 : pos < len) {
        RE73.lastIndex = pos;
        if (RE73.test(src)) {
          const e = RE73.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v === FAIL ? FAIL : A_declImportant(v);
  }
  function r_declaration() {
    let v;
    L869: {
      const s870 = pos;
      let t871;
      t871 = r_declName();
      if (t871 === FAIL) {
        v = FAIL;
        break L869;
      }
      let t872;
      if (src.charCodeAt(pos) === 58) {
        pos += 1;
        t872 = ":";
      } else t872 = FAIL;
      if (t872 === FAIL) {
        pos = s870;
        v = FAIL;
        break L869;
      }
      let t873;
      t873 = r_declValue();
      if (t873 === FAIL) {
        pos = s870;
        v = FAIL;
        break L869;
      }
      let t874;
      let t875;
      t875 = r_declImportant();
      t874 = t875 === FAIL ? void 0 : t875;
      if (t874 === FAIL) {
        pos = s870;
        v = FAIL;
        break L869;
      }
      const a876 = [];
      if (t871 !== void 0) a876.push(t871);
      a876.push(t872);
      if (t873 !== void 0) a876.push(t873);
      if (t874 !== void 0) a876.push(t874);
      v = a876;
    }
    return v === FAIL ? FAIL : A_declaration(v);
  }
  function r_listComma() {
    const s0 = pos;
    let v;
    if (src.charCodeAt(pos) === 44) {
      pos += 1;
      v = ",";
    } else v = FAIL;
    return v === FAIL ? FAIL : A_listComma(v, s0, pos);
  }
  function r_commaSpans() {
    let v;
    L877: {
      const s878 = pos;
      let t879;
      t879 = r_commaRun();
      if (t879 === FAIL) {
        v = FAIL;
        break L877;
      }
      let t880;
      {
        const a883 = [];
        for (; ; ) {
          const s882 = pos;
          let t881;
          L884: {
            const s885 = pos;
            let t886;
            t886 = r_listComma();
            if (t886 === FAIL) {
              t881 = FAIL;
              break L884;
            }
            let t887;
            t887 = r_commaRun();
            if (t887 === FAIL) {
              pos = s885;
              t881 = FAIL;
              break L884;
            }
            const a888 = [];
            if (t886 !== void 0) a888.push(t886);
            if (t887 !== void 0) a888.push(t887);
            t881 = a888;
          }
          if (t881 === FAIL || pos === s882) break;
          a883.push(t881);
        }
        t880 = a883;
      }
      if (t880 === FAIL) {
        pos = s878;
        v = FAIL;
        break L877;
      }
      const a889 = [];
      if (t879 !== void 0) a889.push(t879);
      a889.push(t880);
      v = a889;
    }
    return v === FAIL ? FAIL : A_commaSpans(v);
  }
  function r_argRun() {
    let v;
    {
      const a892 = [];
      for (; ; ) {
        const s891 = pos;
        let t890;
        {
          const c = src.charCodeAt(pos);
          let t893;
          switch (c < 128 ? D92[c] : 1) {
            case 0:
              t893 = h894();
              if (t893 !== FAIL) {
                t890 = t893;
                break;
              }
              t890 = FAIL;
              break;
            case 1:
              t890 = FAIL;
              break;
            case 2:
              t893 = r_quoted();
              if (t893 !== FAIL) {
                t890 = t893;
                break;
              }
              t890 = FAIL;
              break;
            case 3:
              t893 = r_textGroup();
              if (t893 !== FAIL) {
                t890 = t893;
                break;
              }
              t890 = FAIL;
              break;
          }
        }
        if (t890 === FAIL || pos === s891) break;
        a892.push(t890);
      }
      v = a892.length === 0 ? FAIL : a892;
    }
    return v === FAIL ? FAIL : A_argRun(v);
  }
  function r_timelineArgs() {
    let v;
    L895: {
      const s896 = pos;
      let t897;
      let t899;
      if (pos < len) {
        let e = pos;
        for (; e < len; e++) {
          const c = src.charCodeAt(e);
          if (c < 128 ? T1[c] === 0 : !(NA5.lastIndex = e, NA5.test(src))) break;
        }
        if (e > pos) {
          t899 = src.substring(pos, e);
          pos = e;
        } else t899 = void 0;
      } else t899 = FAIL;
      t897 = t899 === FAIL ? void 0 : t899;
      if (t897 === FAIL) {
        v = FAIL;
        break L895;
      }
      let t898;
      {
        const a902 = [];
        for (; ; ) {
          const s901 = pos;
          let t900;
          L903: {
            const s904 = pos;
            let t905;
            t905 = r_argRun();
            if (t905 === FAIL) {
              t900 = FAIL;
              break L903;
            }
            let t906;
            let t907;
            if (pos < len) {
              let e = pos;
              for (; e < len; e++) {
                const c = src.charCodeAt(e);
                if (c < 128 ? T1[c] === 0 : !(NA5.lastIndex = e, NA5.test(src))) break;
              }
              if (e > pos) {
                t907 = src.substring(pos, e);
                pos = e;
              } else t907 = void 0;
            } else t907 = FAIL;
            t906 = t907 === FAIL ? void 0 : t907;
            if (t906 === FAIL) {
              pos = s904;
              t900 = FAIL;
              break L903;
            }
            const a908 = [];
            if (t905 !== void 0) a908.push(t905);
            if (t906 !== void 0) a908.push(t906);
            t900 = a908;
          }
          if (t900 === FAIL || pos === s901) break;
          a902.push(t900);
        }
        t898 = a902;
      }
      if (t898 === FAIL) {
        pos = s896;
        v = FAIL;
        break L895;
      }
      const a909 = [];
      if (t897 !== void 0) a909.push(t897);
      a909.push(t898);
      v = a909;
    }
    return v === FAIL ? FAIL : A_timelineArgs(v);
  }
  function r_scrollFn() {
    let v;
    {
      const s912 = pos;
      let t910;
      {
        const s915 = pos;
        let t913;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T35[c] === 1 : pos < len) {
            RE74.lastIndex = pos;
            if (RE74.test(src)) {
              const e = RE74.lastIndex;
              if (e > pos) {
                t913 = 0;
                pos = e;
              } else t913 = 0;
            } else t913 = FAIL;
          } else t913 = FAIL;
        }
        if (t913 === FAIL) t910 = FAIL;
        else {
          let t914;
          t914 = r_timelineArgs();
          if (t914 === FAIL) {
            pos = s915;
            t910 = FAIL;
          } else t910 = t914;
        }
      }
      if (t910 === FAIL) v = FAIL;
      else {
        let t911;
        if (src.charCodeAt(pos) === 41) {
          pos += 1;
          t911 = 0;
        } else t911 = FAIL;
        if (t911 === FAIL) {
          pos = s912;
          v = FAIL;
        } else v = t910;
      }
    }
    return v;
  }
  function r_viewFn() {
    let v;
    {
      const s918 = pos;
      let t916;
      {
        const s921 = pos;
        let t919;
        {
          const c = src.charCodeAt(pos);
          if (c < 128 ? T54[c] === 1 : pos < len) {
            RE75.lastIndex = pos;
            if (RE75.test(src)) {
              const e = RE75.lastIndex;
              if (e > pos) {
                t919 = 0;
                pos = e;
              } else t919 = 0;
            } else t919 = FAIL;
          } else t919 = FAIL;
        }
        if (t919 === FAIL) t916 = FAIL;
        else {
          let t920;
          t920 = r_timelineArgs();
          if (t920 === FAIL) {
            pos = s921;
            t916 = FAIL;
          } else t916 = t920;
        }
      }
      if (t916 === FAIL) v = FAIL;
      else {
        let t917;
        if (src.charCodeAt(pos) === 41) {
          pos += 1;
          t917 = 0;
        } else t917 = FAIL;
        if (t917 === FAIL) {
          pos = s918;
          v = FAIL;
        } else v = t916;
      }
    }
    return v;
  }
  function r_timelineLead() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T55[c] === 1 : pos < len) {
        RE76.lastIndex = pos;
        if (RE76.test(src)) {
          const e = RE76.lastIndex;
          if (e > pos) {
            v = src.substring(pos, e);
            pos = e;
          } else v = void 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function r_timelineLength() {
    let v;
    {
      const c = src.charCodeAt(pos);
      let t922;
      switch (c < 128 ? D98[c] : 0) {
        case 0:
          v = FAIL;
          break;
        case 1:
          t922 = h923();
          if (t922 !== FAIL) {
            v = t922;
            break;
          }
          v = FAIL;
          break;
        case 2:
          t922 = h924();
          if (t922 !== FAIL) {
            v = t922;
            break;
          }
          v = FAIL;
          break;
      }
    }
    return v;
  }
  function q_close() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T3[c] === 1 : pos < len) {
        RE2.lastIndex = pos;
        if (RE2.test(src)) {
          const e = RE2.lastIndex;
          if (e > pos) {
            v = 0;
            pos = e;
          } else v = 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function q_comma() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T1[c] === 1 : pos < len) {
        RE0.lastIndex = pos;
        if (RE0.test(src)) {
          const e = RE0.lastIndex;
          if (e > pos) {
            v = 0;
            pos = e;
          } else v = 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function q_slash() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T2[c] === 1 : pos < len) {
        RE1.lastIndex = pos;
        if (RE1.test(src)) {
          const e = RE1.lastIndex;
          if (e > pos) {
            v = 0;
            pos = e;
          } else v = 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function q_ws() {
    let v;
    let t925;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T0[c] === 0 : !(NA0.lastIndex = e, NA0.test(src))) break;
      }
      if (e > pos) {
        t925 = 0;
        pos = e;
      } else t925 = 0;
    } else t925 = FAIL;
    v = t925 === FAIL ? void 0 : t925;
    return v;
  }
  function q_ws1() {
    let v;
    if (pos < len) {
      let e = pos;
      for (; e < len; e++) {
        const c = src.charCodeAt(e);
        if (c < 128 ? T0[c] === 0 : !(NA0.lastIndex = e, NA0.test(src))) break;
      }
      if (e === pos) v = FAIL;
      else {
        v = 0;
        pos = e;
      }
    } else v = FAIL;
    return v;
  }
  function q_termSep() {
    let v;
    if (pos < len) {
      RE39.lastIndex = pos;
      if (RE39.test(src)) {
        const e = RE39.lastIndex;
        if (e > pos) {
          v = 0;
          pos = e;
        } else v = 0;
      } else v = FAIL;
    } else v = FAIL;
    return v;
  }
  function q_colorHead() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T30[c] === 1 : pos < len) {
        RE41.lastIndex = pos;
        if (RE41.test(src)) {
          const e = RE41.lastIndex;
          if (e > pos) {
            v = 0;
            pos = e;
          } else v = 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  function q_openComment() {
    let v;
    {
      const c = src.charCodeAt(pos);
      if (c < 128 ? T41[c] === 1 : pos < len) {
        RE55.lastIndex = pos;
        if (RE55.test(src)) {
          const e = RE55.lastIndex;
          if (e > pos) {
            v = 0;
            pos = e;
          } else v = 0;
        } else v = FAIL;
      } else v = FAIL;
    }
    return v;
  }
  const ENTRY = { "ws": r_ws, "ws1": r_ws1, "comma": r_comma, "slash": r_slash, "close": r_close, "number": r_number, "percentage": r_percentage, "dimension": r_dimension, "angle": r_angle, "none": r_none, "ident": r_ident, "dashedIdent": r_dashedIdent, "string": r_string, "balanced": r_balanced, "mathFn": r_mathFn, "calc": r_calc, "minMax": r_minMax, "clampFn": r_clampFn, "signAbs": r_signAbs, "calcSum": r_calcSum, "calcAddOp": r_calcAddOp, "calcProduct": r_calcProduct, "calcMulOp": r_calcMulOp, "calcValue": r_calcValue, "calcGroup": r_calcGroup, "calcConstant": r_calcConstant, "calcKeyword": r_calcKeyword, "varFn": r_varFn, "color": r_color, "component": r_component, "hueValue": r_hueValue, "alphaValue": r_alphaValue, "alphaTail": r_alphaTail, "rgbFn": r_rgbFn, "rgbModern": r_rgbModern, "rgbLegacyPct": r_rgbLegacyPct, "rgbLegacyNum": r_rgbLegacyNum, "legacyPct": r_legacyPct, "legacyNum": r_legacyNum, "legacyHue": r_legacyHue, "legacyAlpha": r_legacyAlpha, "hslFn": r_hslFn, "hslModern": r_hslModern, "hslLegacy": r_hslLegacy, "hwbFn": r_hwbFn, "labFn": r_labFn, "lchFn": r_lchFn, "oklabFn": r_oklabFn, "oklchFn": r_oklchFn, "colorFn": r_colorFn, "colorSpace": r_colorSpace, "relativeColor": r_relativeColor, "relativeHead": r_relativeHead, "relativeTail": r_relativeTail, "relativeComp": r_relativeComp, "colorMix": r_colorMix, "mixMethod": r_mixMethod, "mixPolar": r_mixPolar, "mixRect": r_mixRect, "polarSpace": r_polarSpace, "rectSpace": r_rectSpace, "hueMethod": r_hueMethod, "mixItem": r_mixItem, "mixLead": r_mixLead, "mixTrail": r_mixTrail, "mixPercent": r_mixPercent, "lightDark": r_lightDark, "hex": r_hex, "colorKeyword": r_colorKeyword, "valueTop": r_valueTop, "commaList": r_commaList, "slashList": r_slashList, "spaceList": r_spaceList, "termSep": r_termSep, "valueTerm": r_valueTerm, "badTerm": r_badTerm, "varCall": r_varCall, "varBody": r_varBody, "colorCall": r_colorCall, "colorHead": r_colorHead, "call": r_call, "callName": r_callName, "numeric": r_numeric, "operator": r_operator, "identTerm": r_identTerm, "scalarTop": r_scalarTop, "scalarTerm": r_scalarTerm, "colorTop": r_colorTop, "keyframeSelector": r_keyframeSelector, "selectorKeyword": r_selectorKeyword, "selectorNamed": r_selectorNamed, "timingFunction": r_timingFunction, "timingKeyword": r_timingKeyword, "cubicBezier": r_cubicBezier, "stepsFn": r_stepsFn, "stepPosition": r_stepPosition, "linearFn": r_linearFn, "linearStop": r_linearStop, "quoted": r_quoted, "textGroup": r_textGroup, "textBody": r_textBody, "commaRun": r_commaRun, "commaItems": r_commaItems, "semiRun": r_semiRun, "semiItems": r_semiItems, "spaceRun": r_spaceRun, "spaceItems": r_spaceItems, "restText": r_restText, "comment": r_comment, "ruleGap": r_ruleGap, "preludeRun": r_preludeRun, "blockBody": r_blockBody, "openQuote": r_openQuote, "semiTail": r_semiTail, "blockTail": r_blockTail, "ruleBlock": r_ruleBlock, "openComment": r_openComment, "openBlock": r_openBlock, "openRule": r_openRule, "ruleList": r_ruleList, "atPrelude": r_atPrelude, "atKeyframes": r_atKeyframes, "atProperty": r_atProperty, "atFunction": r_atFunction, "atScope": r_atScope, "atStartingStyle": r_atStartingStyle, "atScrollTimeline": r_atScrollTimeline, "atViewTimeline": r_atViewTimeline, "atOther": r_atOther, "atName": r_atName, "atRest": r_atRest, "propertyName": r_propertyName, "syntaxText": r_syntaxText, "syntaxCore": r_syntaxCore, "syntaxPart": r_syntaxPart, "syntaxAlts": r_syntaxAlts, "scopeGroup": r_scopeGroup, "scopeLimit": r_scopeLimit, "scopePrelude": r_scopePrelude, "functionName": r_functionName, "functionParams": r_functionParams, "functionHead": r_functionHead, "colonRun": r_colonRun, "paramDefault": r_paramDefault, "functionParam": r_functionParam, "paramName": r_paramName, "paramSyntax": r_paramSyntax, "paramHead": r_paramHead, "declName": r_declName, "declValue": r_declValue, "declImportant": r_declImportant, "declaration": r_declaration, "listComma": r_listComma, "commaSpans": r_commaSpans, "argRun": r_argRun, "timelineArgs": r_timelineArgs, "scrollFn": r_scrollFn, "viewFn": r_viewFn, "timelineLead": r_timelineLead, "timelineLength": r_timelineLength };
  return function entry(name) {
    const f = ENTRY[name];
    if (f === void 0) throw new Error(`no rule ${name}`);
    return function run2(source) {
      src = source;
      pos = 0;
      len = source.length;
      GEN++;
      const v = f();
      if (v === FAIL || pos !== len) return { ok: false, furthest: pos };
      return { ok: true, value: v, end: pos };
    };
  };
}

// docs/tranches/X/parse-that/evidence/W7-research/route-aot-codegen/gen/load-aot.ts
var GRAMMAR_MODULES = Object.freeze({});
var NEXT = { value: void 0, offset: 0, ok: (x) => x };
var PREV = { value: void 0, offset: 0 };
var Slot = class _Slot {
  constructor(name, fn, kind) {
    this.name = name;
    this.fn = fn;
    this.kind = kind;
  }
  name;
  fn;
  kind;
  map(f) {
    const prev = this.fn;
    return new _Slot(this.name, prev ? (v, s, e) => f(prev(v, s, e)) : f, this.kind ?? "map");
  }
  mapState(f) {
    if (this.fn) throw new Error("mapState over an existing action is not modelled");
    return new _Slot(this.name, (v, s, e) => {
      NEXT.value = v;
      NEXT.offset = e;
      PREV.offset = s;
      return f(NEXT, PREV);
    }, "span");
  }
  /** A TEXT action: `f` receives exactly the source text the rule matched (its span), and the
   *  generated rule builds no value — the landing form of stylesheet.ts's `text`/`trimmed`. */
  text(f) {
    if (this.fn) throw new Error("text over an existing action is not modelled");
    return new _Slot(this.name, (s, e, src) => f(src.slice(s, e)), "text");
  }
  /** A value-free SPAN action: `f` receives only the offsets its rule matched between. */
  range(f) {
    if (this.fn) throw new Error("range over an existing action is not modelled");
    return new _Slot(this.name, (s, e) => f(s, e), "text");
  }
  reset() {
  }
};
var LAST;
var entry_;
var runners = /* @__PURE__ */ new WeakMap();
function compileGrammar() {
  const table = {};
  for (const n of RULE_NAMES) table[n] = new Slot(n);
  LAST = table;
  entry_ = void 0;
  return table;
}
function ruleOf(rules, name) {
  const rule = rules[name];
  if (rule === void 0) throw new Error(`BBNF grammar has no rule \`${name}\``);
  return rule;
}
function actionManifest(rules) {
  const m = {};
  for (const [n, s] of Object.entries(rules)) if (s.fn) m[n] = s.kind;
  return m;
}
function run(rule, source) {
  let r = runners.get(rule);
  if (r === void 0) {
    if (entry_ === void 0) {
      const table = LAST;
      const m = actionManifest(table);
      if (JSON.stringify(Object.entries(m).sort()) !== JSON.stringify(Object.entries(ACTION_MANIFEST).sort()))
        throw new Error("generated parser is stale: action manifest differs (regenerate)");
      const A = {};
      for (const [n, s] of Object.entries(table)) if (s.fn) A[n] = s.fn;
      entry_ = createParser(A);
    }
    r = entry_(rule.name);
    runners.set(rule, r);
  }
  return r(source);
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
  const made = factory2(x, y, z, w);
  return made.ok ? colorNode(made.value) : invalid(made.error.code);
}
var LEGACY_ALPHA = ALPHA;
function hexColor(token) {
  const digits = token.slice(1);
  const full = digits.length <= 4 ? [...digits].map((d) => d + d).join("") : digits;
  const byte = (i) => parseInt(full.slice(i, i + 2), 16);
  const made = rgb(byte(0), byte(2), byte(4), full.length === 8 ? byte(6) / 255 : 1);
  return made.ok ? colorNode(made.value) : invalid(made.error.code);
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

// src/css/bbnf/stylesheet.ts
function textOf(value) {
  if (Array.isArray(value)) return value.map(textOf).join("");
  return typeof value === "string" ? value : "";
}
var isTag = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
function tagsOf(value) {
  if (isTag(value)) return [value];
  return Array.isArray(value) ? value.flatMap(tagsOf) : [];
}
function tag(value, key) {
  return tagsOf(value).find((t) => key in t)?.[key];
}
function attachStylesheetActions(rules) {
  const on = (name, action) => {
    rules[name] = ruleOf(rules, name).map(action);
  };
  const spanned = (name, action) => {
    rules[name] = ruleOf(rules, name).mapState((next, prev) => next.ok(action(next.value, prev.offset, next.offset)));
  };
  const text = (key) => (value) => ({ [key]: textOf(value) });
  const trimmed = (key) => (value) => ({ [key]: textOf(value).trim() });
  const items = (value) => tagsOf(value).filter((t) => "item" in t).map((t) => t.item);
  for (const run2 of ["commaRun", "semiRun", "spaceRun", "argRun", "syntaxPart"]) on(run2, trimmed("item"));
  for (const list of ["commaItems", "semiItems", "spaceItems"]) on(list, (v) => items(v).filter(Boolean));
  on("syntaxAlts", items);
  on("timelineArgs", items);
  spanned("listComma", (_, start) => ({ comma: start }));
  on("commaSpans", (v) => tagsOf(v));
  on("restText", text("rest"));
  on("preludeRun", text("prelude"));
  on("semiTail", () => ({ body: null }));
  on("blockTail", text("body"));
  on("ruleBlock", (v) => ({
    block: { prelude: (tag(v, "prelude") ?? "").trim(), body: tag(v, "body") ?? null }
  }));
  spanned("openComment", (_, start) => ({ fault: { expected: "closing comment", start } }));
  spanned("openBlock", (v, start) => ({ fault: { expected: "closing brace", start: start + (tag(v, "prelude") ?? "").length } }));
  spanned("openRule", (_, start) => ({ fault: { expected: "rule", start } }));
  on("ruleList", (v) => ({
    blocks: tagsOf(v).filter((t) => "block" in t).map((t) => t.block),
    fault: tag(v, "fault")
  }));
  const at = (kind) => (v) => ({ at: kind, name: kind, rest: (tag(v, "rest") ?? "").trim() });
  on("atKeyframes", at("keyframes"));
  on("atProperty", at("property"));
  on("atFunction", at("function"));
  on("atScope", at("scope"));
  on("atStartingStyle", () => ({ at: "starting-style", name: "starting-style", rest: "" }));
  on("atScrollTimeline", at("scroll-timeline"));
  on("atViewTimeline", at("view-timeline"));
  on("atName", (v) => ({ name: v.slice(1) }));
  on("atRest", (v) => ({ other: tag(v, "rest") ?? "" }));
  on("atOther", (v) => ({ at: "other", name: tag(v, "name") ?? "", rest: tag(v, "other") ?? "" }));
  on("syntaxCore", text("core"));
  on("syntaxText", (v) => tag(v, "core") ?? "");
  on("scopeGroup", text("group"));
  on("scopeLimit", (v) => ({ limit: tag(v, "group") }));
  on("scopePrelude", (v) => ({ root: tag(v, "group"), limit: tag(v, "limit") }));
  on("functionName", text("name"));
  on("functionParams", text("params"));
  on("functionHead", (v) => ({ name: tag(v, "name") ?? "", params: tag(v, "params") ?? "" }));
  on("colonRun", trimmed("head"));
  on("paramDefault", (v) => ({ default: (tag(v, "rest") ?? "").trim() }));
  on("functionParam", (v) => ({ head: tag(v, "head") ?? "", default: tag(v, "default") }));
  on("paramName", text("name"));
  on("paramSyntax", trimmed("syntax"));
  on("paramHead", (v) => ({ name: tag(v, "name") ?? "", syntax: tag(v, "syntax") }));
  on("declName", (v) => ({ name: v.trim().toLowerCase() }));
  on("declValue", (v) => ({ value: textOf(v).trim() }));
  on("declImportant", () => ({ important: true }));
  on("declaration", (v) => ({
    name: tag(v, "name") ?? "",
    value: tag(v, "value") ?? "",
    important: tag(v, "important") === true
  }));
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
