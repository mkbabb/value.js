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

// ../../../../var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-w7-judge/aot-names-stub.mjs
var RULE_NAMES = ["ws", "ws1", "comma", "slash", "close", "number", "percentage", "dimension", "angle", "none", "ident", "dashedIdent", "string", "balanced", "mathFn", "calc", "minMax", "clampFn", "signAbs", "calcSum", "calcAddOp", "calcProduct", "calcMulOp", "calcValue", "calcGroup", "calcConstant", "calcKeyword", "varFn", "color", "component", "hueValue", "alphaValue", "alphaTail", "rgbFn", "rgbModern", "rgbLegacyPct", "rgbLegacyNum", "legacyPct", "legacyNum", "legacyHue", "legacyAlpha", "hslFn", "hslModern", "hslLegacy", "hwbFn", "labFn", "lchFn", "oklabFn", "oklchFn", "colorFn", "colorSpace", "relativeColor", "relativeHead", "relativeTail", "relativeComp", "colorMix", "mixMethod", "mixPolar", "mixRect", "polarSpace", "rectSpace", "hueMethod", "mixItem", "mixLead", "mixTrail", "mixPercent", "lightDark", "hex", "colorKeyword", "valueTop", "commaList", "slashList", "spaceList", "termSep", "valueTerm", "badTerm", "varCall", "varBody", "colorCall", "colorHead", "call", "callName", "numeric", "operator", "identTerm", "scalarTop", "scalarTerm", "colorTop", "keyframeSelector", "selectorKeyword", "selectorNamed", "timingFunction", "timingKeyword", "cubicBezier", "stepsFn", "stepPosition", "linearFn", "linearStop", "quoted", "textGroup", "textBody", "commaRun", "commaItems", "semiRun", "semiItems", "spaceRun", "spaceItems", "restText", "comment", "ruleGap", "preludeRun", "blockBody", "openQuote", "semiTail", "blockTail", "ruleBlock", "openComment", "openBlock", "openRule", "ruleList", "atPrelude", "atKeyframes", "atProperty", "atFunction", "atScope", "atStartingStyle", "atScrollTimeline", "atViewTimeline", "atOther", "atName", "atRest", "propertyName", "syntaxText", "syntaxCore", "syntaxPart", "syntaxAlts", "scopeGroup", "scopeLimit", "scopePrelude", "functionName", "functionParams", "functionHead", "colonRun", "paramDefault", "functionParam", "paramName", "paramSyntax", "paramHead", "declName", "declValue", "declImportant", "declaration", "listComma", "commaSpans", "argRun", "timelineArgs", "scrollFn", "viewFn", "timelineLead", "timelineLength"];

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
  const angle = ANGLE[unit];
  if (angle !== void 0) return quantity("angle", angle(value));
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
    const refusal = items.find(isRefused);
    if (refusal !== void 0) return refusal;
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

// docs/tranches/X/parse-that/evidence/W7-research/route-aot-codegen/gen/manifest-entry.ts
console.log(JSON.stringify(actionManifest(grammar())));
