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
var factory = (space) => (...args) => {
  const count = SPACE_SCHEMA[space].channels.length;
  const channels = args.slice(0, count);
  const alpha = args.length > count ? args[count] : 1;
  return createColor(space, channels, alpha);
};
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
var NAMED_COLORS = Object.freeze({
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
});

// src/css/grammar.ts
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
    const char = source[i];
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
    const char = source[i];
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
function channelToken(token, percentScale, angle2 = false) {
  if (token.toLowerCase() === "none") return "none";
  if (token.endsWith("%")) {
    const value = numberToken(token.slice(0, -1));
    return value === null ? null : value * percentScale / 100;
  }
  if (angle2) {
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
var CONTEXT_COLOR = /^(?:currentcolor|accentcolor|accentcolortext|activetext|buttonborder|buttonface|buttontext|canvas|canvastext|field|fieldtext|graytext|highlight|highlighttext|linktext|mark|marktext|selecteditem|selecteditemtext|visitedtext)$/i;
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
function colorResult(source, result) {
  return result.ok ? success(result.value) : failure(source, "css_syntax", [result.error.code]);
}
function parseFunctionalColor(source, name, body) {
  if (/\bfrom\b/i.test(body)) return failure(source, "color_context_required", ["context-free color"]);
  const slash = splitTopLevel(body, "/");
  if (slash.length > 2) return failure(source);
  const alpha = alphaToken(slash[1]?.trim());
  if (alpha === null) return failure(source, "css_syntax", ["alpha"]);
  const components = splitTopLevel(slash[0].replace(/,/g, " "), "space");
  const lower = name.toLowerCase();
  if ((lower === "rgb" || lower === "rgba") && components.length === 3) {
    const values = components.map((part) => channelToken(part, 255));
    return values.some((value) => value === null) ? failure(source) : colorResult(source, rgb(values[0], values[1], values[2], alpha));
  }
  if ((lower === "hsl" || lower === "hsla") && components.length === 3) {
    const values = [channelToken(components[0], 360, true), channelToken(components[1], 1), channelToken(components[2], 1)];
    return values.some((value) => value === null) ? failure(source) : colorResult(source, hsl(values[0], values[1], values[2], alpha));
  }
  if (lower === "hwb" && components.length === 3) {
    const values = [channelToken(components[0], 360, true), channelToken(components[1], 1), channelToken(components[2], 1)];
    return values.some((value) => value === null) ? failure(source) : colorResult(source, hwb(values[0], values[1], values[2], alpha));
  }
  if (lower === "lab" && components.length === 3) {
    const values = [channelToken(components[0], 100), channelToken(components[1], 125), channelToken(components[2], 125)];
    return values.some((value) => value === null) ? failure(source) : colorResult(source, lab(values[0], values[1], values[2], alpha));
  }
  if (lower === "lch" && components.length === 3) {
    const values = [channelToken(components[0], 100), channelToken(components[1], 150), channelToken(components[2], 360, true)];
    return values.some((value) => value === null) ? failure(source) : colorResult(source, lch(values[0], values[1], values[2], alpha));
  }
  if (lower === "oklab" && components.length === 3) {
    const values = [channelToken(components[0], 1), channelToken(components[1], 0.4), channelToken(components[2], 0.4)];
    return values.some((value) => value === null) ? failure(source) : colorResult(source, oklab(values[0], values[1], values[2], alpha));
  }
  if (lower === "oklch" && components.length === 3) {
    const values = [channelToken(components[0], 1), channelToken(components[1], 0.4), channelToken(components[2], 360, true)];
    return values.some((value) => value === null) ? failure(source) : colorResult(source, oklch(values[0], values[1], values[2], alpha));
  }
  if (lower === "color" && components.length === 4) {
    const rawSpace = components.shift().toLowerCase();
    const space = rawSpace === "xyz-d65" || rawSpace === "xyz-d50" ? "xyz" : rawSpace;
    const values = components.map((part) => channelToken(part, 1));
    if (values.some((value) => value === null)) return failure(source);
    const numeric2 = values;
    if (rawSpace === "srgb") {
      return colorResult(source, rgb(
        numeric2[0] === "none" ? "none" : numeric2[0] * 255,
        numeric2[1] === "none" ? "none" : numeric2[1] * 255,
        numeric2[2] === "none" ? "none" : numeric2[2] * 255,
        alpha
      ));
    }
    if (rawSpace === "xyz-d50") {
      if (numeric2.some((value) => value === "none")) return failure(source, "css_syntax", ["concrete xyz-d50"]);
      const [x, y, z] = adaptXyzD50ToD65(numeric2);
      return colorResult(source, xyz(x, y, z, alpha));
    }
    switch (space) {
      case "xyz":
        return colorResult(source, xyz(values[0], values[1], values[2], alpha));
      case "srgb-linear":
        return colorResult(source, linearSrgb(values[0], values[1], values[2], alpha));
      case "display-p3":
        return colorResult(source, displayP3(values[0], values[1], values[2], alpha));
      case "a98-rgb":
        return colorResult(source, a98Rgb(values[0], values[1], values[2], alpha));
      case "prophoto-rgb":
        return colorResult(source, prophotoRgb(values[0], values[1], values[2], alpha));
      case "rec2020":
        return colorResult(source, rec2020(values[0], values[1], values[2], alpha));
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
  if (named) return parseCssColor(named);
  const hex = input.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);
  if (hex) {
    const digits = hex[1];
    const expanded = digits.length <= 4 ? [...digits].map((digit) => digit + digit).join("") : digits;
    const alpha = expanded.length === 8 ? parseInt(expanded.slice(6, 8), 16) / 255 : 1;
    return colorResult(source, rgb(
      parseInt(expanded.slice(0, 2), 16),
      parseInt(expanded.slice(2, 4), 16),
      parseInt(expanded.slice(4, 6), 16),
      alpha
    ));
  }
  const call = input.match(/^([a-z][\w-]*)\((.*)\)$/is);
  return call ? parseFunctionalColor(source, call[1], call[2]) : failure(source, "css_syntax", ["color"]);
}
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
function parseScalarInternal(source) {
  const color = parseCssColor(source);
  if (color.ok) return success({ kind: "scalar", payload: { type: "color", value: color.value } });
  const numeric2 = source.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)([%a-z-]*)$/i);
  if (numeric2) {
    const value = Number(numeric2[1]);
    if (!Number.isFinite(value)) return failure(source);
    return success({ kind: "scalar", payload: { type: "number", value, unit: numeric2[2] ?? "" } });
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
  const call = input.match(/^([a-z_-][\w-]*)\((.*)\)$/is);
  if (call && !/^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)$/i.test(call[1])) {
    const name = call[1];
    const body = call[2].trim();
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
  const named = input.match(/^(entry|exit|cover|contain)(?:\s+([+-]?(?:\d+\.?\d*|\.\d+))%)?$/i);
  if (!named) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
  const name = named[1].toLowerCase();
  if (named[2] === void 0) return success({ kind: "named", name });
  const offset = Number(named[2]) / 100;
  return Number.isFinite(offset) && offset >= 0 && offset <= 1 ? success({ kind: "named", name, offset }) : failure(source, "keyframe_selector_invalid", ["0%..100%"]);
}
function parseTimingFunction(source) {
  const input = source.trim().toLowerCase();
  if (["linear", "ease", "ease-in", "ease-out", "ease-in-out"].includes(input)) {
    return success({ kind: "keyword", name: input });
  }
  if (input === "step-start" || input === "step-end") {
    return success({ kind: "steps", count: 1, position: input === "step-start" ? "jump-start" : "jump-end" });
  }
  const bezier = input.match(/^cubic-bezier\((.*)\)$/s);
  if (bezier) {
    const values = splitTopLevel(bezier[1], ",").map(numberToken);
    if (values.length !== 4 || values.some((value) => value === null)) return failure(source);
    const [x1, y1, x2, y2] = values;
    return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1 ? success({ kind: "cubic-bezier", x1, y1, x2, y2 }) : failure(source);
  }
  const steps = input.match(/^steps\((.*)\)$/s);
  if (steps) {
    const args = splitTopLevel(steps[1], ",");
    const count = numberToken(args[0] ?? "");
    const aliases = {
      start: "jump-start",
      end: "jump-end",
      "jump-start": "jump-start",
      "jump-end": "jump-end",
      "jump-none": "jump-none",
      "jump-both": "jump-both"
    };
    const position = aliases[args[1]?.toLowerCase() ?? "jump-end"];
    return count !== null && Number.isInteger(count) && count > 0 && position !== void 0 && !(position === "jump-none" && count < 2) ? success({ kind: "steps", count, position }) : failure(source);
  }
  const linear = input.match(/^linear\((.*)\)$/s);
  if (linear) {
    const rows = splitTopLevel(linear[1], ",");
    const stops = [];
    for (const row of rows) {
      const parts = splitTopLevel(row, "space");
      const output = numberToken(parts.shift() ?? "");
      if (output === null || parts.length > 2) return failure(source);
      const positions = parts.map((part) => part.endsWith("%") ? numberToken(part.slice(0, -1)) : null);
      if (positions.some((position) => position === null)) return failure(source);
      stops.push({ output, input: positions.map((position) => position / 100) });
    }
    return stops.length >= 2 ? success({ kind: "linear-function", stops }) : failure(source);
  }
  return failure(source, "css_syntax", ["timing function"]);
}

// src/css/syntax.ts
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
  const alternatives = syntax.split("|").map((part) => part.trim());
  return alternatives.length > 0 && alternatives.every((part) => part === "*" || SYNTAX_COMPONENTS.has(part)) ? alternatives : null;
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
    return value.kind === "scalar" && value.payload.type === "keyword" && !/^(?:initial|inherit|unset|revert|revert-layer|default)$/i.test(value.payload.value);
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
  const matches = alternatives.some((alternative) => matchesSyntax(value.value, alternative));
  return matches ? value : failure(source, "syntax_mismatch", alternatives);
}

// src/css/timeline.ts
var AXES = /* @__PURE__ */ new Set(["block", "inline", "x", "y"]);
var SCROLLERS = /* @__PURE__ */ new Set(["nearest", "root", "self"]);
var LENGTH_PERCENTAGE = /^auto$|^[+-]?(?:\d+\.?\d*|\.\d+)(?:%|[a-z]+)?$/i;
function parseAnimationTimeline(source) {
  const input = source.trim();
  const lower = input.toLowerCase();
  if (lower === "auto" || lower === "none") return success({ kind: lower });
  const scroll = input.match(/^scroll\((.*)\)$/i);
  if (scroll) {
    const args = splitTopLevel(scroll[1].replace(/,/g, " "), "space");
    const result = { kind: "scroll" };
    for (const arg of args) {
      const token = arg.toLowerCase();
      if (SCROLLERS.has(token) && result.scroller === void 0) {
        result.scroller = token;
      } else if (AXES.has(token) && result.axis === void 0) {
        result.axis = token;
      } else return failure(source, "timeline_option_invalid", ["scroll timeline"]);
    }
    return success(result);
  }
  const view = input.match(/^view\((.*)\)$/i);
  if (view) {
    const args = splitTopLevel(view[1].replace(/,/g, " "), "space");
    const result = { kind: "view" };
    const inset = [];
    for (const arg of args) {
      const token = arg.toLowerCase();
      if (AXES.has(token) && result.axis === void 0) result.axis = token;
      else if (LENGTH_PERCENTAGE.test(arg) && inset.length < 2) inset.push(arg);
      else return failure(source, "timeline_option_invalid", ["view timeline"]);
    }
    if (inset[0]) result.inset = inset[1] ? { start: inset[0], end: inset[1] } : { start: inset[0] };
    return success(result);
  }
  return /^--[-\w]+$/.test(input) ? success({ kind: "name", name: input }) : failure(source, "timeline_option_invalid", ["timeline"]);
}
var RANGE_PHASES = /* @__PURE__ */ new Set(["normal", "cover", "contain", "entry", "exit", "entry-crossing", "exit-crossing"]);
function rangeBoundary(tokens) {
  if (tokens.length === 0 || tokens.length > 2) return null;
  const phase = tokens[0]?.toLowerCase();
  if (RANGE_PHASES.has(phase)) {
    return tokens[1] === void 0 ? { phase } : LENGTH_PERCENTAGE.test(tokens[1]) ? { phase, offset: tokens[1] } : null;
  }
  return tokens.length === 1 && tokens[0] !== void 0 && LENGTH_PERCENTAGE.test(tokens[0]) ? { offset: tokens[0] } : null;
}
function parseAnimationRange(source) {
  const input = source.trim();
  const comma = splitTopLevel(input, ",");
  if (comma.length > 2) return failure(source, "timeline_option_invalid", ["animation range"]);
  if (comma.length === 2) {
    const start = rangeBoundary(splitTopLevel(comma[0], "space"));
    const end = rangeBoundary(splitTopLevel(comma[1], "space"));
    return start && end ? success({ start, end }) : failure(source, "timeline_option_invalid", ["animation range"]);
  }
  const tokens = splitTopLevel(input, "space");
  const single = rangeBoundary(tokens);
  if (single) return success({ start: single });
  for (const split of [2, 1]) {
    const start = rangeBoundary(tokens.slice(0, split));
    const end = rangeBoundary(tokens.slice(split));
    if (start && end) return success({ start, end });
  }
  return failure(source, "timeline_option_invalid", ["animation range"]);
}

// src/css/stylesheet.ts
var TRIGGER_TYPES = /* @__PURE__ */ new Set(["once", "repeat", "alternate", "state"]);
function parseTimelineScope(source) {
  const input = source.trim();
  if (input === "none" || input === "all") return success({ kind: input });
  const names = splitTopLevel(input, ",");
  return names.length > 0 && names.every((name) => /^--[-\w]+$/.test(name)) ? success({ kind: "names", names }) : failure(source, "timeline_option_invalid", ["timeline scope"]);
}
function parseAnimationTrigger(source) {
  const tokens = splitTopLevel(source.trim(), "space");
  const result = {};
  const range = [];
  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (TRIGGER_TYPES.has(lower) && result.type === void 0) {
      result.type = lower;
      continue;
    }
    if (result.timeline === void 0 && /^(?:auto|none|--|scroll\(|view\()/i.test(token)) {
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
function serializeCssValue(value) {
  if (value.kind === "scalar") {
    if (value.payload.type === "number") return `${value.payload.value}${value.payload.unit}`;
    if (value.payload.type === "keyword") return value.payload.value;
    const serialized = serializeCssColor(value.payload.value);
    if (!serialized.ok) throw new TypeError(`Cannot serialize CSS color: ${serialized.error.code}`);
    return serialized.value;
  }
  if (value.kind === "call") return `${value.name}(${value.args.map(serializeCssValue).join(", ")})`;
  const separator = value.separator === "comma" ? ", " : value.separator === "slash" ? " / " : " ";
  const result = value.items.map(serializeCssValue).join(separator);
  return value.separator === "space" ? result.replace(/\s+([:;])/g, "$1") : result;
}
function splitDeclarations(body) {
  return splitTopLevel(body, ";");
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
    if (value.args.length < 1 || value.args.length > 2) return void 0;
    const count = scalarNumberValue(value.args[0]);
    const aliases = {
      start: "jump-start",
      end: "jump-end",
      "jump-start": "jump-start",
      "jump-end": "jump-end",
      "jump-none": "jump-none",
      "jump-both": "jump-both"
    };
    const authoredPosition = scalarKeyword(value.args[1])?.toLowerCase();
    const position = authoredPosition === void 0 ? "jump-end" : aliases[authoredPosition];
    if (!position) return void 0;
    return count !== void 0 && Number.isInteger(count) && count > 0 && !(position === "jump-none" && count < 2) ? Object.freeze({ kind: "steps", count, position }) : void 0;
  }
  if (name !== "linear" || value.args.length < 2) return void 0;
  const stops = [];
  for (const argument of value.args) {
    const tokens = spaceItems(argument);
    const output = scalarNumberValue(tokens[0]);
    if (output === void 0 || tokens.length > 3) return void 0;
    const positions = tokens.slice(1).map((token) => scalarNumberValue(token, ["%"]));
    if (positions.some((position) => position === void 0)) return void 0;
    stops.push(Object.freeze({
      output,
      input: Object.freeze(positions.map((position) => position / 100))
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
var listValue = (items) => items.length === 1 ? items[0] : Object.freeze({ kind: "list", separator: "comma", items: Object.freeze([...items]) });
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
function emptyComma(source) {
  let depth = 0;
  let quote = "";
  let start = 0;
  let comma = -1;
  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (quote) {
      if (char === quote && source[index - 1] !== "\\") quote = "";
    } else if (char === '"' || char === "'") quote = char;
    else if (char === "(") depth++;
    else if (char === ")") depth--;
    else if (char === "," && depth === 0) {
      if (!source.slice(start, index).trim()) return index;
      start = index + 1;
      comma = index;
    }
  }
  return comma >= 0 && !source.slice(start).trim() ? comma : void 0;
}
function parseDeclarations(body) {
  const declarations = [];
  for (const row of splitDeclarations(body)) {
    const colon = row.indexOf(":");
    if (colon <= 0) return failure(row, "css_syntax", ["declaration"]);
    const name = row.slice(0, colon).trim().toLowerCase();
    let source = row.slice(colon + 1).trim();
    const important = /!important\s*$/i.test(source);
    if (important) source = source.replace(/!important\s*$/i, "").trim();
    const empty = name === "animation" || name.startsWith("animation-") ? emptyComma(source) : void 0;
    if (empty !== void 0) {
      return failure(source, "animation_option_invalid", ["nonempty animation list item"], empty, empty + 1);
    }
    const value = parseCssValue(source);
    if (!value.ok) return value;
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
function blocks(source) {
  const result = [];
  let cursor = 0;
  while (cursor < source.length) {
    while (cursor < source.length) {
      while (/\s|;/.test(source[cursor] ?? "")) cursor++;
      if (!source.startsWith("/*", cursor)) break;
      const end2 = source.indexOf("*/", cursor + 2);
      if (end2 < 0) return failure(source, "css_syntax", ["closing comment"], cursor);
      cursor = end2 + 2;
    }
    if (cursor >= source.length) break;
    let quote = "";
    let parens = 0;
    let boundary = -1;
    for (let i = cursor; i < source.length; i++) {
      const char = source[i];
      if (quote) {
        if (char === quote && source[i - 1] !== "\\") quote = "";
        continue;
      }
      if (char === '"' || char === "'") quote = char;
      else if (char === "(") parens++;
      else if (char === ")") parens--;
      else if (parens === 0 && (char === "{" || char === ";")) {
        boundary = i;
        break;
      }
    }
    if (boundary < 0) return failure(source, "css_syntax", ["rule"], cursor);
    const prelude = source.slice(cursor, boundary).trim();
    if (source[boundary] === ";") {
      result.push({ prelude, body: null });
      cursor = boundary + 1;
      continue;
    }
    let depth = 1;
    quote = "";
    let end = boundary + 1;
    for (; end < source.length && depth > 0; end++) {
      const char = source[end];
      if (quote) {
        if (char === quote && source[end - 1] !== "\\") quote = "";
        continue;
      }
      if (char === '"' || char === "'") quote = char;
      else if (char === "{") depth++;
      else if (char === "}") depth--;
    }
    if (depth !== 0) return failure(source, "css_syntax", ["closing brace"], boundary);
    result.push({ prelude, body: source.slice(boundary + 1, end - 1) });
    cursor = end;
  }
  return success(result);
}
function parseKeyframes(name, body) {
  const rows = blocks(body);
  if (!rows.ok) return rows;
  const rules = [];
  for (const row of rows.value) {
    if (row.body === null) return failure(body, "css_syntax", ["keyframe block"]);
    const selectors = [];
    for (const token of splitTopLevel(row.prelude, ",")) {
      const selector = parseKeyframeSelector(token);
      if (!selector.ok) return selector;
      selectors.push(selector.value);
    }
    const declarations = parseDeclarations(row.body);
    if (!declarations.ok) return declarations;
    const timingDeclaration = collectDeclarations(declarations.value).get("animation-timing-function");
    const compositionDeclaration = collectDeclarations(declarations.value).get("animation-composition");
    const timing = timingDeclaration ? parseTimingFunction(serializeCssValue(timingDeclaration.value)) : null;
    if (timing && !timing.ok) return timing;
    const compositionText = compositionDeclaration ? serializeCssValue(compositionDeclaration.value) : void 0;
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
function parseScopePrelude(source) {
  const input = source.trim();
  if (!input) return {};
  const groups = [];
  let cursor = 0;
  while (cursor < input.length) {
    while (/\s/.test(input[cursor] ?? "")) cursor++;
    if (groups.length === 1) {
      if (input.slice(cursor, cursor + 2).toLowerCase() !== "to") return null;
      cursor += 2;
      while (/\s/.test(input[cursor] ?? "")) cursor++;
    }
    if (input[cursor] !== "(") return null;
    let depth = 1;
    let quote = "";
    const start = ++cursor;
    for (; cursor < input.length && depth > 0; cursor++) {
      const char = input[cursor];
      if (quote) {
        if (char === quote && input[cursor - 1] !== "\\") quote = "";
      } else if (char === '"' || char === "'") quote = char;
      else if (char === "(") depth++;
      else if (char === ")") depth--;
    }
    if (depth !== 0) return null;
    groups.push(input.slice(start, cursor - 1));
    if (groups.length > 2) return null;
  }
  if (groups.length === 0) return null;
  return {
    root: splitTopLevel(groups[0], ","),
    ...groups[1] === void 0 ? {} : { limit: splitTopLevel(groups[1], ",") }
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
function topLevelColon(source) {
  let depth = 0;
  let quote = "";
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quote) {
      if (char === quote && source[i - 1] !== "\\") quote = "";
    } else if (char === '"' || char === "'") quote = char;
    else if (char === "(") depth++;
    else if (char === ")") depth--;
    else if (depth === 0 && char === ":") return i;
  }
  return -1;
}
function parseFunctionPrelude(source) {
  const match = source.match(/^@function\s+(--[-\w]+)\s*\(([\s\S]*)\)$/i);
  if (!match) return failure(source, "css_syntax", ["custom function signature"]);
  const parameters = [];
  const body = match[2].trim();
  for (const row of body ? splitTopLevel(body, ",") : []) {
    const colon = topLevelColon(row);
    const head = row.slice(0, colon < 0 ? void 0 : colon).trim();
    const parameter = head.match(/^(--[-\w]+)(?:\s+(.+))?$/);
    if (!parameter) return failure(row, "css_syntax", ["custom function parameter"]);
    const defaultSource = colon < 0 ? void 0 : row.slice(colon + 1).trim();
    if (defaultSource === "") return failure(row, "css_syntax", ["parameter default"]);
    const parsedDefault = defaultSource === void 0 ? void 0 : parseCssValue(defaultSource);
    if (parsedDefault && !parsedDefault.ok) return parsedDefault;
    parameters.push({
      name: parameter[1],
      ...parameter[2] ? { syntax: parameter[2].trim() } : {},
      ...parsedDefault?.ok ? { default: parsedDefault.value } : {}
    });
  }
  return success({ name: match[1], parameters });
}
function parseItems(source) {
  const sourceBlocks = blocks(source);
  if (!sourceBlocks.ok) return sourceBlocks;
  const result = [];
  for (const row of sourceBlocks.value) {
    const prelude = row.prelude.trim();
    const lower = prelude.toLowerCase();
    if (lower.startsWith("@keyframes ")) {
      if (row.body === null) return failure(source, "css_syntax", ["keyframes body"]);
      const parsed = parseKeyframes(prelude.slice(11).trim(), row.body);
      if (!parsed.ok) return parsed;
      result.push(parsed.value);
      continue;
    }
    if (lower.startsWith("@property ")) {
      if (row.body === null) return failure(source, "css_syntax", ["property body"]);
      const declarations = descriptorDeclarations(row.body);
      if (!declarations) return failure(source);
      const name = prelude.slice(10).trim();
      if (!/^--[-_a-z][-_a-z\d]*$/i.test(name)) {
        return failure(source, "css_syntax", ["custom property name"]);
      }
      const syntaxDeclaration = declarations.get("syntax");
      const inheritsDeclaration = declarations.get("inherits");
      const initial = declarations.get("initial-value");
      if (!syntaxDeclaration || !inheritsDeclaration) {
        return failure(source, "css_syntax", ["syntax and inherits descriptors"]);
      }
      const syntax = serializeCssValue(syntaxDeclaration.value).replace(/^['"]|['"]$/g, "");
      if (!isSupportedSyntaxDescriptor(syntax)) {
        return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
      }
      const inheritsText = serializeCssValue(inheritsDeclaration.value).toLowerCase();
      if (inheritsText !== "true" && inheritsText !== "false") {
        return failure(source, "css_syntax", ["true or false"]);
      }
      if (!initial && syntax !== "*") {
        return failure(source, "css_syntax", ["initial-value descriptor"]);
      }
      if (initial) {
        const coerced = coerceToSyntax(serializeCssValue(initial.value), syntax);
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
    if (lower.startsWith("@function ")) {
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
    if (lower.startsWith("@scope") || lower === "@starting-style") {
      if (row.body === null) return failure(source, "css_syntax", ["nested body"]);
      const children = parseItems(row.body);
      if (!children.ok) return children;
      if (lower === "@starting-style") result.push({ kind: "starting-style", children: children.value });
      else {
        const parsedPrelude = parseScopePrelude(prelude.slice(6));
        if (!parsedPrelude) return failure(source, "css_syntax", ["scope prelude"]);
        result.push({ kind: "scope", ...parsedPrelude, children: children.value });
      }
      continue;
    }
    if (lower.startsWith("@scroll-timeline ") || lower.startsWith("@view-timeline ")) {
      if (row.body === null) return failure(source, "css_syntax", ["timeline body"]);
      const declarations = descriptorDeclarations(row.body);
      if (!declarations) return failure(source);
      if (lower.startsWith("@scroll")) {
        const descriptor = {
          ...declarations.get("source") ? { source: serializeCssValue(declarations.get("source").value) } : {},
          ...declarations.get("orientation") ? { orientation: serializeCssValue(declarations.get("orientation").value) } : {}
        };
        result.push({ kind: "scroll-timeline", name: prelude.slice(17).trim(), descriptor });
      } else {
        const descriptor = {
          ...declarations.get("subject") ? { subject: serializeCssValue(declarations.get("subject").value) } : {},
          ...declarations.get("axis") ? { axis: serializeCssValue(declarations.get("axis").value) } : {},
          ...declarations.get("inset") ? { inset: serializeCssValue(declarations.get("inset").value) } : {}
        };
        result.push({ kind: "view-timeline", name: prelude.slice(15).trim(), descriptor });
      }
      continue;
    }
    if (prelude.startsWith("@")) {
      const firstSpace = prelude.indexOf(" ");
      const parsedChildren = row.body === null ? null : parseItems(row.body);
      result.push({
        kind: "unknown",
        atName: prelude.slice(1, firstSpace < 0 ? void 0 : firstSpace),
        prelude: firstSpace < 0 ? "" : prelude.slice(firstSpace + 1),
        body: row.body,
        ...parsedChildren?.ok ? { children: parsedChildren.value } : {}
      });
      continue;
    }
    if (row.body === null) return failure(source, "css_syntax", ["style body"]);
    const body = parseStyleBody(row.body);
    if (!body.ok) return body;
    result.push({ kind: "style", selectors: splitTopLevel(prelude, ","), ...body.value });
  }
  return success(result);
}
function parseStylesheet(source) {
  return parseItems(source);
}
function collectDeclarations(declarations) {
  const result = /* @__PURE__ */ new Map();
  for (const declaration of declarations) {
    const current = result.get(declaration.name);
    if (!current || declaration.important || !current.important) result.set(declaration.name, declaration);
  }
  return result;
}
export {
  parseCssValue,
  parseStylesheet
};
