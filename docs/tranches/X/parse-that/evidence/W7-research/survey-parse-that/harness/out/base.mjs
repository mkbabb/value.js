// ../../../../private/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-retired-2155142bad8b/src/foundation/result.ts
var ok = (value) => ({ ok: true, value });
var err = (error) => ({ ok: false, error });

// ../../../../private/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-retired-2155142bad8b/src/color/model.ts
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

// ../../../../private/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-retired-2155142bad8b/src/color/anchors.ts
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

// ../../../../private/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-retired-2155142bad8b/src/css/named-colors.ts
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

// ../../../../private/var/folders/ld/20j4p2791k5_90_0ccgx2txm0000gr/T/value-js-retired-2155142bad8b/src/css/grammar.ts
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
function splitTopLevel(source, separator) {
  const parts = [];
  let depth = 0;
  let quote = "";
  let start = 0;
  for (let i = 0; i < source.length; i++) {
    const char = source.charAt(i);
    if (quote) {
      if (char === quote && source[i - 1] !== "\\") quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === "(") depth++;
    else if (char === ")") depth--;
    else if (depth === 0 && (separator === "space" ? /\s/.test(char) : char === separator)) {
      const part = source.slice(start, i).trim();
      if (part) parts.push(part);
      if (separator === "space") while (/\s/.test(source[i + 1] ?? "")) i++;
      start = i + 1;
    }
  }
  const tail = source.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}
function splitValueTokens(source) {
  const parts = [];
  let token = "";
  let depth = 0;
  let quote = "";
  const flush = () => {
    const part = token.trim();
    if (part) parts.push(part);
    token = "";
  };
  for (let i = 0; i < source.length; i++) {
    const char = source.charAt(i);
    if (quote) {
      token += char;
      if (char === quote && source[i - 1] !== "\\") quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      token += char;
    } else if (char === "(") {
      depth++;
      token += char;
    } else if (char === ")") {
      depth--;
      token += char;
    } else if (depth === 0 && /\s/.test(char)) {
      flush();
    } else if (depth === 0 && (char === ":" || char === ";")) {
      flush();
      parts.push(char);
    } else {
      token += char;
    }
  }
  flush();
  return parts;
}
function numberToken(token) {
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(token)) return null;
  const value = Number(token);
  return Number.isFinite(value) ? value : null;
}
function channelToken(token, percentScale, angle = false) {
  if (token.toLowerCase() === "none") return "none";
  if (token.endsWith("%")) {
    const value = numberToken(token.slice(0, -1));
    return value === null ? null : value * percentScale / 100;
  }
  if (angle) {
    const match = token.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(deg|grad|rad|turn)?$/i);
    if (!match) return null;
    const value = Number(match[1]);
    if (!Number.isFinite(value)) return null;
    switch (match[2]?.toLowerCase()) {
      case "grad":
        return value * 0.9;
      case "rad":
        return value * 180 / Math.PI;
      case "turn":
        return value * 360;
      default:
        return value;
    }
  }
  return numberToken(token);
}
function alphaToken(token) {
  if (token === void 0) return 1;
  return channelToken(token, 1);
}
var chan = (percentScale, angle = false) => (token) => channelToken(token, percentScale, angle);
function channelTriple(components, readers) {
  const [first, second, third] = components;
  if (first === void 0 || second === void 0 || third === void 0) return null;
  const a = readers[0](first);
  const b = readers[1](second);
  const c = readers[2](third);
  return a === null || b === null || c === null ? null : [a, b, c];
}
var CONTEXT_COLOR = /^(?:currentcolor|accentcolor|accentcolortext|activetext|buttonborder|buttonface|buttontext|canvas|canvastext|field|fieldtext|graytext|highlight|highlighttext|linktext|mark|marktext|selecteditem|selecteditemtext|visitedtext)$/i;
var COLOR_FUNCTION = /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)$/i;
function colorResult(source, result) {
  return result.ok ? success(result.value) : failure(source, "css_syntax", [result.error.code]);
}
function parseFunctionalColor(source, name, body) {
  if (/\bfrom\b/i.test(body)) return failure(source, "color_context_required", ["context-free color"]);
  const slash = splitTopLevel(body, "/");
  if (slash.length > 2) return failure(source);
  const alpha = alphaToken(slash[1]?.trim());
  if (alpha === null) return failure(source, "css_syntax", ["alpha"]);
  const head = slash[0];
  if (head === void 0) return failure(source, "css_syntax", ["color components"]);
  const components = splitTopLevel(head.replace(/,/g, " "), "space");
  const lower = name.toLowerCase();
  const triple = (a, b, c) => channelTriple(components, [a, b, c]);
  if ((lower === "rgb" || lower === "rgba") && components.length === 3) {
    const values = triple(chan(255), chan(255), chan(255));
    return values === null ? failure(source) : colorResult(source, rgb(...values, alpha));
  }
  if ((lower === "hsl" || lower === "hsla") && components.length === 3) {
    const values = triple(chan(360, true), chan(1), chan(1));
    return values === null ? failure(source) : colorResult(source, hsl(...values, alpha));
  }
  if (lower === "hwb" && components.length === 3) {
    const values = triple(chan(360, true), chan(1), chan(1));
    return values === null ? failure(source) : colorResult(source, hwb(...values, alpha));
  }
  if (lower === "lab" && components.length === 3) {
    const values = triple(chan(100), chan(125), chan(125));
    return values === null ? failure(source) : colorResult(source, lab(...values, alpha));
  }
  if (lower === "lch" && components.length === 3) {
    const values = triple(chan(100), chan(150), chan(360, true));
    return values === null ? failure(source) : colorResult(source, lch(...values, alpha));
  }
  if (lower === "oklab" && components.length === 3) {
    const values = triple(chan(1), chan(0.4), chan(0.4));
    return values === null ? failure(source) : colorResult(source, oklab(...values, alpha));
  }
  if (lower === "oklch" && components.length === 3) {
    const values = triple(chan(1), chan(0.4), chan(360, true));
    return values === null ? failure(source) : colorResult(source, oklch(...values, alpha));
  }
  if (lower === "color" && components.length === 4) {
    const [spaceToken, ...rest] = components;
    if (spaceToken === void 0) return failure(source);
    const rawSpace = spaceToken.toLowerCase();
    const space = rawSpace === "xyz-d65" || rawSpace === "xyz-d50" ? "xyz" : rawSpace;
    const numeric = channelTriple(rest, [chan(1), chan(1), chan(1)]);
    if (numeric === null) return failure(source);
    const [x, y, z] = numeric;
    if (rawSpace === "srgb") {
      return colorResult(source, rgb(
        x === "none" ? "none" : x * 255,
        y === "none" ? "none" : y * 255,
        z === "none" ? "none" : z * 255,
        alpha
      ));
    }
    if (rawSpace === "xyz-d50") {
      if (x === "none" || y === "none" || z === "none") {
        return failure(source, "css_syntax", ["concrete xyz-d50"]);
      }
      const adapted = adaptXyzD50ToD65([x, y, z]);
      return colorResult(source, xyz(...adapted, alpha));
    }
    switch (space) {
      case "xyz":
        return colorResult(source, xyz(...numeric, alpha));
      case "srgb-linear":
        return colorResult(source, linearSrgb(...numeric, alpha));
      case "display-p3":
        return colorResult(source, displayP3(...numeric, alpha));
      case "a98-rgb":
        return colorResult(source, a98Rgb(...numeric, alpha));
      case "prophoto-rgb":
        return colorResult(source, prophotoRgb(...numeric, alpha));
      case "rec2020":
        return colorResult(source, rec2020(...numeric, alpha));
      default:
        return failure(source, "css_syntax", ["CSS color space"]);
    }
  }
  return failure(source, "css_syntax", ["CSS color"]);
}
function parseCssColor(source) {
  const input = source.trim();
  if (!input) return failure(source, "css_syntax", ["color"]);
  if (/^(?:var|env)\(/i.test(input) || CONTEXT_COLOR.test(input)) {
    return failure(source, "color_context_required", ["context-free color"]);
  }
  if (/^(?:hsv|kelvin|ictcp|jzazbz)\(/i.test(input)) return failure(source, "css_syntax", ["CSS-native color"]);
  if (input.toLowerCase() === "transparent") return colorResult(source, rgb(0, 0, 0, 0));
  const named = NAMED_COLORS[input.toLowerCase()];
  if (typeof named === "string") return parseCssColor(named);
  const digits = input.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i)?.[1];
  if (digits !== void 0) {
    const expanded = digits.length <= 4 ? [...digits].map((digit) => digit + digit).join("") : digits;
    const alpha = expanded.length === 8 ? parseInt(expanded.slice(6, 8), 16) / 255 : 1;
    return colorResult(source, rgb(
      parseInt(expanded.slice(0, 2), 16),
      parseInt(expanded.slice(2, 4), 16),
      parseInt(expanded.slice(4, 6), 16),
      alpha
    ));
  }
  const [, callName, callBody] = input.match(/^([a-z][\w-]*)\((.*)\)$/is) ?? [];
  return callName !== void 0 && callBody !== void 0 ? parseFunctionalColor(source, callName, callBody) : failure(source, "css_syntax", ["color"]);
}
function parseScalarInternal(source) {
  const color = parseCssColor(source);
  if (color.ok) return success({ kind: "scalar", payload: { type: "color", value: color.value } });
  const numeric = source.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)([%a-z-]*)$/i);
  if (numeric) {
    const value = Number(numeric[1]);
    if (!Number.isFinite(value)) return failure(source);
    return success({ kind: "scalar", payload: { type: "number", value, unit: numeric[2] ?? "" } });
  }
  if (/^(["'])(?:\\.|(?!\1)[\s\S])*\1$/.test(source)) {
    return success({ kind: "scalar", payload: { type: "keyword", value: source } });
  }
  if (/^(?:[+*]|-|<=|>=|==|!=|<|>|=|:|;)$/.test(source)) {
    return success({ kind: "scalar", payload: { type: "keyword", value: source } });
  }
  if (/^[-_a-z][-_a-z\d]*$/i.test(source)) return success({ kind: "scalar", payload: { type: "keyword", value: source } });
  return failure(source, "css_syntax", ["scalar"]);
}
function parseCssScalar(source) {
  return parseScalarInternal(source.trim());
}
function parseValueInternal(source) {
  const input = source.trim();
  const comma = splitTopLevel(input, ",");
  if (comma.length > 1) {
    const items = [];
    for (const part of comma) {
      const parsed = parseValueInternal(part);
      if (!parsed.ok) return parsed;
      items.push(parsed.value);
    }
    return success({ kind: "list", separator: "comma", items });
  }
  const slash = splitTopLevel(input, "/");
  if (slash.length > 1) {
    const items = [];
    for (const part of slash) {
      const parsed = parseValueInternal(part);
      if (!parsed.ok) return parsed;
      items.push(parsed.value);
    }
    return success({ kind: "list", separator: "slash", items });
  }
  const spaces = splitValueTokens(input);
  if (spaces.length > 1) {
    const items = [];
    for (const part of spaces) {
      const parsed = parseValueInternal(part);
      if (!parsed.ok) return parsed;
      items.push(parsed.value);
    }
    return success({ kind: "list", separator: "space", items });
  }
  const [, name, rawBody] = input.match(/^([a-z_-][\w-]*)\((.*)\)$/is) ?? [];
  if (name !== void 0 && rawBody !== void 0 && !COLOR_FUNCTION.test(name)) {
    const body = rawBody.trim();
    if (/^(?:sibling-index|sibling-count)$/i.test(name)) {
      return body ? failure(source, "css_syntax", ["zero-argument function"]) : success({ kind: "call", name, args: [] });
    }
    if (!body && (name.startsWith("--") || /^(?:scroll|view)$/i.test(name))) {
      return success({ kind: "call", name, args: [] });
    }
    if (!body) return failure(source, "css_syntax", ["function argument"]);
    const parsedArgs = parseValueInternal(body);
    if (!parsedArgs.ok) return parsedArgs;
    const args = parsedArgs.value.kind === "list" && parsedArgs.value.separator === "comma" ? parsedArgs.value.items : [parsedArgs.value];
    return success({ kind: "call", name, args });
  }
  return parseScalarInternal(input);
}
function parseCssValue(source) {
  return parseValueInternal(source);
}
function parseCssValues(source) {
  const parsed = parseValueInternal(source);
  if (!parsed.ok) return parsed;
  return parsed.value.kind === "list" ? success(parsed.value) : success({ kind: "list", separator: "space", items: [parsed.value] });
}
function parseKeyframeSelector(source) {
  const input = source.trim();
  const keyword = input.toLowerCase();
  if (keyword === "from" || keyword === "to") {
    return success({ kind: "percent", value: keyword === "from" ? 0 : 1 });
  }
  const percent = input.match(/^([+-]?(?:\d+\.?\d*|\.\d+))%$/);
  if (percent) {
    const value = Number(percent[1]);
    return Number.isFinite(value) && value >= 0 && value <= 100 ? success({ kind: "percent", value: value / 100 }) : failure(source, "keyframe_selector_invalid", ["0%..100%"]);
  }
  const [, rawName, rawOffset] = input.match(/^(entry|exit|cover|contain)(?:\s+([+-]?(?:\d+\.?\d*|\.\d+))%)?$/i) ?? [];
  if (rawName === void 0) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
  const name = rawName.toLowerCase();
  if (rawOffset === void 0) return success({ kind: "named", name });
  const offset = Number(rawOffset) / 100;
  return Number.isFinite(offset) && offset >= 0 && offset <= 1 ? success({ kind: "named", name, offset }) : failure(source, "keyframe_selector_invalid", ["0%..100%"]);
}
var JUMP_ALIASES = /* @__PURE__ */ new Map([
  ["start", "jump-start"],
  ["end", "jump-end"],
  ["jump-start", "jump-start"],
  ["jump-end", "jump-end"],
  ["jump-none", "jump-none"],
  ["jump-both", "jump-both"]
]);
function parseTimingFunction(source) {
  const input = source.trim().toLowerCase();
  if (["linear", "ease", "ease-in", "ease-out", "ease-in-out"].includes(input)) {
    return success({ kind: "keyword", name: input });
  }
  if (input === "step-start" || input === "step-end") {
    return success({ kind: "steps", count: 1, position: input === "step-start" ? "jump-start" : "jump-end" });
  }
  const bezierBody = input.match(/^cubic-bezier\((.*)\)$/s)?.[1];
  if (bezierBody !== void 0) {
    const values = splitTopLevel(bezierBody, ",").map(numberToken);
    const [x1, y1, x2, y2] = values;
    if (values.length !== 4 || x1 === null || y1 === null || x2 === null || y2 === null || x1 === void 0 || y1 === void 0 || x2 === void 0 || y2 === void 0) {
      return failure(source);
    }
    return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1 ? success({ kind: "cubic-bezier", x1, y1, x2, y2 }) : failure(source);
  }
  const stepsBody = input.match(/^steps\((.*)\)$/s)?.[1];
  if (stepsBody !== void 0) {
    const args = splitTopLevel(stepsBody, ",");
    const count = numberToken(args[0] ?? "");
    const position = JUMP_ALIASES.get(args[1]?.toLowerCase() ?? "jump-end");
    return count !== null && Number.isInteger(count) && count > 0 && position !== void 0 && !(position === "jump-none" && count < 2) ? success({ kind: "steps", count, position }) : failure(source);
  }
  const linearBody = input.match(/^linear\((.*)\)$/s)?.[1];
  if (linearBody !== void 0) {
    const stops = [];
    for (const row of splitTopLevel(linearBody, ",")) {
      const parts = splitTopLevel(row, "space");
      const output = numberToken(parts.shift() ?? "");
      if (output === null || parts.length > 2) return failure(source);
      const positions = [];
      for (const part of parts) {
        const position = part.endsWith("%") ? numberToken(part.slice(0, -1)) : null;
        if (position === null) return failure(source);
        positions.push(position / 100);
      }
      stops.push({ output, input: positions });
    }
    return stops.length >= 2 ? success({ kind: "linear-function", stops }) : failure(source);
  }
  return failure(source, "css_syntax", ["timing function"]);
}
export {
  parseCssColor,
  parseCssScalar,
  parseCssValue,
  parseCssValues,
  parseKeyframeSelector,
  parseTimingFunction
};
