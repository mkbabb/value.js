var __defProp = Object.defineProperty;
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
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

// node_modules/@mkbabb/parse-that/dist/parse.js
var LAZY_PARSER_CACHE = /* @__PURE__ */ new WeakMap();
function getLazyParser(fn) {
  const cached = LAZY_PARSER_CACHE.get(fn);
  if (cached !== void 0) {
    return cached;
  }
  const parser = fn();
  LAZY_PARSER_CACHE.set(fn, parser);
  return parser;
}
function createLazyCached(fn) {
  let cached;
  return (state) => {
    if (!cached) cached = fn();
    return cached.parser(state);
  };
}
var enabled = typeof process !== "undefined" && process.stderr?.isTTY === true && !process.env.NO_COLOR;
var bold = (s) => enabled ? `\x1B[1m${s}\x1B[22m` : s;
var italic = (s) => enabled ? `\x1B[3m${s}\x1B[23m` : s;
var red = (s) => enabled ? `\x1B[31m${s}\x1B[39m` : s;
var green = (s) => enabled ? `\x1B[32m${s}\x1B[39m` : s;
var yellow = (s) => enabled ? `\x1B[33m${s}\x1B[39m` : s;
var cyan = (s) => enabled ? `\x1B[36m${s}\x1B[39m` : s;
var gray = (s) => enabled ? `\x1B[90m${s}\x1B[39m` : s;
var bgRed = (s) => enabled ? `\x1B[41m${s}\x1B[49m` : s;
var bgGreen = (s) => enabled ? `\x1B[42m${s}\x1B[49m` : s;
var diagnosticsEnabled = false;
function isDiagnosticsEnabled() {
  return diagnosticsEnabled;
}
var lastFurthestOffset = -1;
var lastState;
var lastExpected = [];
var lastSuggestions = [];
var lastSecondarySpans = [];
function mergeErrorState(state, label) {
  if (state.offset > lastFurthestOffset) {
    lastFurthestOffset = state.offset;
    lastState = state;
    if (diagnosticsEnabled && label) {
      lastExpected = [label];
    } else {
      lastExpected = [];
    }
    lastSuggestions = [];
    lastSecondarySpans = [];
    if (label) {
      state.expected = [label];
    } else {
      state.expected = void 0;
    }
  } else if (state.offset === lastFurthestOffset) {
    if (diagnosticsEnabled && label) {
      if (!lastExpected.includes(label)) {
        lastExpected.push(label);
      }
    }
    if (label) {
      const target = lastState;
      if (!target) {
        throw new Error("mergeErrorState invariant violated: lastState missing");
      }
      if (target.expected) {
        if (!target.expected.includes(label)) {
          target.expected.push(label);
        }
      } else {
        target.expected = [label];
      }
    }
  }
  return lastState;
}
function addSuggestion(suggestion) {
  if (diagnosticsEnabled) {
    lastSuggestions.push(suggestion);
  }
}
function addSecondarySpan(offset, label) {
  if (diagnosticsEnabled) {
    lastSecondarySpans.push({ offset, label });
  }
}
function reportUnclosedDelimiter(openText, openOffset) {
  if (!diagnosticsEnabled) return;
  const closeText = openText === "{" ? "}" : openText === "[" ? "]" : openText === "(" ? ")" : openText;
  addSuggestion({
    kind: "unclosed-delimiter",
    message: `close the delimiter with \`${closeText}\``,
    openOffset
  });
  addSecondarySpan(openOffset, `unclosed \`${openText}\` opened here`);
}
function resetErrorState() {
  lastState = void 0;
  lastFurthestOffset = -1;
  lastExpected = [];
  lastSuggestions = [];
  lastSecondarySpans = [];
}
function getLastState() {
  return lastState;
}
function getLastFurthestOffset() {
  return lastFurthestOffset;
}
function getLastExpected() {
  return lastExpected;
}
function getLastSuggestions() {
  return lastSuggestions;
}
function getLastSecondarySpans() {
  return lastSecondarySpans;
}
var collectedDiagnostics = [];
function collectDiagnostic(src, errorOffset) {
  const furthest = lastFurthestOffset >= 0 ? lastFurthestOffset : errorOffset;
  const before = src.slice(0, furthest);
  const lastNl = before.lastIndexOf("\n");
  const line2 = lastNl === -1 ? 1 : before.slice(0, lastNl + 1).split("\n").length;
  const column = lastNl === -1 ? furthest : furthest - lastNl - 1;
  const found = src.slice(furthest, furthest + 20).replace(/\n/g, "\\n");
  collectedDiagnostics.push({
    offset: errorOffset,
    furthestOffset: furthest,
    line: line2,
    column,
    expected: [...lastExpected],
    suggestions: [...lastSuggestions],
    secondarySpans: [...lastSecondarySpans],
    found
  });
  resetErrorState();
}
function popLastDiagnostic() {
  return collectedDiagnostics.pop();
}
var MAX_LINES = 4;
var MAX_LINE_WIDTH = 74;
var debugDepth = 0;
function summarizeLine(line2, columnNum = 0) {
  const trimmed = line2.trimEnd();
  const len = trimmed.length;
  const half = Math.floor(MAX_LINE_WIDTH / 2);
  if (len <= MAX_LINE_WIDTH) return trimmed;
  const mid = Math.min(columnNum, len);
  let start = Math.min(Math.max(mid - half, 0), len);
  let end = Math.min(mid + half, len);
  if (start === 0) {
    return trimmed.slice(0, end) + "...";
  } else if (end >= len) {
    return "..." + trimmed.slice(start);
  }
  return "..." + trimmed.slice(start, end) + "...";
}
function formatExpected(expected) {
  switch (expected.length) {
    case 0:
      return "";
    case 1:
      return `expected ${expected[0]}`;
    case 2:
      return `expected ${expected[0]} or ${expected[1]}`;
    default: {
      const last = expected[expected.length - 1];
      const rest = expected.slice(0, -1).join(", ");
      return `expected ${rest}, or ${last}`;
    }
  }
}
function lineNumberWidth(maxLine) {
  return String(maxLine).length;
}
function addCursor(state, cursor = "^", error = false) {
  const lines = state.src.split("\n");
  const { line: lineNum, column: columnNum } = state.getLineAndColumn ? state.getLineAndColumn() : { line: state.getLineNumber() + 1, column: state.getColumnNumber() };
  const lineIdx = lineNum - 1;
  const startIdx = Math.max(lineIdx - MAX_LINES, 0);
  const endIdx = Math.min(lineIdx + MAX_LINES + 1, lines.length);
  const lnWidth = lineNumberWidth(endIdx);
  const result = [];
  for (let i = startIdx; i < endIdx; i++) {
    const ln = i + 1;
    const isActive = i === lineIdx;
    const lineContent = summarizeLine(lines[i], isActive ? columnNum : 0);
    const pipe = gray("|");
    if (isActive) {
      const lnStr = bold(String(ln).padStart(lnWidth));
      const lineDisplay = error ? bold(red(lineContent)) : bold(green(lineContent));
      result.push(` ${lnStr} ${pipe} ${lineDisplay}`);
      if (cursor) {
        const pad = " ".repeat(lnWidth + 4 + columnNum);
        const cursorStr = error ? red(cursor) : green(cursor);
        result.push(`${pad}${cursorStr}`);
      }
    } else {
      const lnStr = gray(String(ln).padStart(lnWidth));
      result.push(` ${lnStr} ${pipe} ${lineContent}`);
    }
  }
  return result.join("\n");
}
function formatSecondarySpans(src, spans) {
  const lines = src.split("\n");
  const result = [];
  for (const span of spans) {
    let offsetAcc = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineEnd = offsetAcc + lines[i].length + 1;
      if (span.offset < lineEnd) {
        const col = span.offset - offsetAcc;
        const lnWidth = Math.max(String(i + 1).length, 3);
        const pipe = gray("|");
        result.push(` ${" ".repeat(lnWidth)} ${pipe}`);
        result.push(
          ` ${gray(String(i + 1).padStart(lnWidth))} ${pipe} ${lines[i]}`
        );
        const markerPad = " ".repeat(lnWidth + 4 + col);
        result.push(`${markerPad}${cyan("-")} ${cyan(span.label)}`);
        break;
      }
      offsetAcc = lineEnd;
    }
  }
  return result.join("\n");
}
function formatSuggestions(suggestions) {
  const result = [];
  for (const s of suggestions) {
    const prefix = s.kind === "unclosed-delimiter" ? bold(yellow("help")) : bold(cyan("note"));
    result.push(`   = ${prefix}: ${s.message}`);
  }
  return result.join("\n");
}
function statePrint(state, name = "", parserString = "") {
  const finished = state.offset >= state.src.length;
  const isError = state.isError;
  let badge;
  if (isError) {
    badge = bgRed(bold(" Err x "));
  } else if (finished) {
    badge = bgGreen(bold(" Done \u221A "));
  } else {
    badge = bgGreen(bold(" Ok \u221A "));
  }
  const namePart = name ? `    ${yellow(italic(name))}` : "";
  const offsetPart = `    ${green(String(state.offset))}`;
  const parserPart = parserString ? `    ${green(parserString)}` : "";
  const header = `${badge}${namePart}${offsetPart}${parserPart}`;
  const cursor = isError ? "^^^" : finished ? "" : "^";
  const body = addCursor(state, cursor, isError);
  let output = `${header}
${body}`;
  if (isError && isDiagnosticsEnabled()) {
    const expected = getLastExpected();
    if (expected.length > 0) {
      output += `
   ${cyan(formatExpected(expected))}`;
    }
    const secondarySpans = getLastSecondarySpans();
    if (secondarySpans.length > 0) {
      output += `
${formatSecondarySpans(state.src, secondarySpans)}`;
    }
    const suggestions = getLastSuggestions();
    if (suggestions.length > 0) {
      output += `
${formatSuggestions(suggestions)}`;
    }
  }
  return output;
}
var PARSER_STRINGS = /* @__PURE__ */ new Map();
function parserPrint(parser) {
  if (PARSER_STRINGS.has(parser.id)) {
    return PARSER_STRINGS.get(parser.id);
  }
  const print = (innerParser, id) => {
    if (PARSER_STRINGS.has(innerParser.id)) {
      return PARSER_STRINGS.get(innerParser.id);
    }
    const { name, args, parser: innerInnerParser } = innerParser.context;
    const parserString = innerInnerParser != null ? print(innerInnerParser, id) : "unknown";
    const s2 = (() => {
      switch (name) {
        case "string":
          return `"${args[0]}"`;
        case "regex":
          return `${args[0]}`;
        case "wrap":
        case "trim": {
          const [left, right] = args;
          return `${print(left, id)} ${parserString} ${print(right, id)}`;
        }
        case "trimWhitespace":
          return `${parserString}?w`;
        case "not":
          return `!${parserString}`;
        case "opt":
          return `${parserString}?`;
        case "next": {
          const [next] = args;
          return `${parserString} >> ${print(next, id)}`;
        }
        case "skip": {
          const [skip] = args;
          return `${parserString} << ${print(skip, id)}`;
        }
        case "map":
          return parserString;
        case "all":
        case "then": {
          const items = args.map(
            (x) => print(x, id)
          );
          return `[${items.join(", ")}]`;
        }
        case "any":
        case "or": {
          const items = args.map(
            (x) => print(x, id)
          );
          return items.join(" | ");
        }
        case "many": {
          const [min, max] = args;
          const bounds = max === Infinity ? `${min},` : `${min},${max}`;
          return `${parserString} {${bounds}}`;
        }
        case "sepBy":
          return `${parserString} sepBy ${print(args[0], id)}`;
        case "lazy": {
          const [lazy2] = args;
          const p = getLazyParser(lazy2);
          if (!id) {
            const s3 = print(p, p.id);
            PARSER_STRINGS.set(p.id, s3);
            return s3;
          } else {
            return name;
          }
        }
        case "debug":
          return parserString;
        default:
          return void 0;
      }
    })();
    const result = s2 ?? name;
    if (!result) {
      throw new Error("parserPrint: missing parser context name");
    }
    if (id) {
      PARSER_STRINGS.set(innerParser.id, result);
    }
    return result;
  };
  const s = print(parser);
  PARSER_STRINGS.set(parser.id, s);
  return s;
}
function parserDebug(parser, name = "", recursivePrint = false, logger = console.error) {
  const debug = (state) => {
    debugDepth++;
    const indentStr = "  ".repeat(debugDepth - 1);
    const newState = parser.parser(state);
    const parserString = recursivePrint ? parserPrint(parser) : parser.context.name ?? "";
    const s = statePrint(
      newState,
      name,
      parserString
    );
    const indented = s.split("\n").map((line2) => indentStr + line2).join("\n");
    logger(indented);
    debugDepth--;
    return newState;
  };
  return new Parser(debug, createParserContext("debug", parser, logger));
}
var ParserState = class _ParserState {
  constructor(src, value = void 0, offset = 0, isError = false, furthest = 0) {
    this.src = src;
    this.value = value;
    this.offset = offset;
    this.isError = isError;
    this.furthest = furthest;
  }
  /** Parser names/descriptions that were expected at the failure point. */
  expected;
  ok(value, offset = 0) {
    this.offset += offset;
    this.value = value;
    this.isError = false;
    return this;
  }
  err(value, offset = 0) {
    this.offset += offset;
    this.value = value;
    this.isError = true;
    return this;
  }
  from(value, offset = 0) {
    this.offset += offset;
    this.value = value;
    return this;
  }
  save() {
    return { offset: this.offset, value: this.value };
  }
  restore(saved) {
    this.offset = saved.offset;
    this.value = saved.value;
    this.isError = false;
    return this;
  }
  clone() {
    return new _ParserState(
      this.src,
      this.value,
      this.offset,
      this.isError,
      this.furthest
    );
  }
  getColumnNumber() {
    const offset = this.offset;
    const lastNewline = this.src.lastIndexOf("\n", offset);
    const columnNumber = lastNewline === -1 ? offset : offset - (lastNewline + 1);
    return Math.max(0, columnNumber);
  }
  getLineNumber() {
    const newlineIndex = this.src.lastIndexOf("\n", this.offset);
    return newlineIndex >= 0 ? this.src.slice(0, newlineIndex).split("\n").length : 0;
  }
  /** Returns 1-based line and 0-based column for any offset. */
  getLineAndColumn(offset = this.offset) {
    const lastNewline = this.src.lastIndexOf("\n", offset - 1);
    const line2 = lastNewline === -1 ? 1 : this.src.slice(0, lastNewline + 1).split("\n").length;
    const column = lastNewline === -1 ? offset : offset - lastNewline - 1;
    return { line: line2, column };
  }
  toString() {
    return statePrint(this);
  }
};
function createParserContext(name, parser, ...args) {
  return {
    name,
    parser,
    args
  };
}
function makeParser$1(parser, context) {
  return new Parser(parser, context);
}
function eof() {
  const eof2 = (state) => {
    if (state.offset >= state.src.length) {
      return state.ok(void 0);
    } else {
      mergeErrorState(state, "<end of input>");
      state.isError = true;
      return state;
    }
  };
  return makeParser$1(
    eof2,
    createParserContext("eof", void 0)
  );
}
function any(...parsers) {
  const anyParser = (state) => {
    const savedOffset = state.offset;
    for (const parser of parsers) {
      parser.parser(state);
      if (!state.isError) {
        return state;
      }
      state.offset = savedOffset;
      state.isError = false;
    }
    mergeErrorState(state);
    state.isError = true;
    return state;
  };
  return makeParser$1(
    parsers.length === 1 ? parsers[0].parser : anyParser,
    createParserContext("any", void 0, ...parsers)
  );
}
function dispatch(table) {
  const tbl = new Int8Array(128).fill(-1);
  const parsers = [];
  for (const [chars, parser] of Object.entries(table)) {
    let idx = parsers.indexOf(parser);
    if (idx === -1) {
      idx = parsers.length;
      parsers.push(parser);
    }
    if (chars.length === 3 && chars[1] === "-") {
      const lo = chars.charCodeAt(0);
      const hi = chars.charCodeAt(2);
      for (let c = lo; c <= hi; c++) tbl[c] = idx;
    } else {
      for (let i = 0; i < chars.length; i++) {
        tbl[chars.charCodeAt(i)] = idx;
      }
    }
  }
  const labelChars = Object.keys(table).map((k) => {
    if (k.length === 3 && k[1] === "-") return `'${k[0]}'-'${k[2]}'`;
    return [...k].map((c) => `'${c}'`).join(", ");
  }).join(", ");
  const label = `one of [${labelChars}]`;
  const dispatchParser = (state) => {
    const ch = state.src.charCodeAt(state.offset);
    const idx = ch < 128 ? tbl[ch] : -1;
    if (idx >= 0) {
      return parsers[idx].parser(state);
    }
    mergeErrorState(state, label);
    state.isError = true;
    return state;
  };
  return makeParser$1(
    dispatchParser,
    createParserContext("dispatch", void 0, ...parsers)
  );
}
function all(...parsers) {
  const allParser = (state) => {
    const matches2 = [];
    const savedOffset = state.offset;
    for (const parser of parsers) {
      parser.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      if (state.value !== void 0) {
        matches2.push(state.value);
      }
    }
    return state.ok(matches2);
  };
  return makeParser$1(
    parsers.length === 1 ? parsers[0].parser : allParser,
    createParserContext("all", void 0, ...parsers)
  );
}
function string(str) {
  const len = str.length;
  const label = `"${str}"`;
  let stringParser;
  if (len === 1) {
    const code = str.charCodeAt(0);
    stringParser = ((state) => {
      if (state.src.charCodeAt(state.offset) === code) {
        state.offset += 1;
        state.value = str;
        state.isError = false;
        return state;
      }
      mergeErrorState(state, label);
      state.isError = true;
      return state;
    });
  } else {
    stringParser = ((state) => {
      if (state.src.startsWith(str, state.offset)) {
        state.offset += len;
        state.value = str;
        state.isError = false;
        return state;
      }
      mergeErrorState(state, label);
      state.isError = true;
      return state;
    });
  }
  return makeParser$1(
    stringParser,
    createParserContext("string", void 0, str)
  );
}
function regex(r, matchFunction) {
  const flags = r.flags.replace(/y/g, "");
  const sticky = new RegExp(r, flags + "y");
  const hasCustomMatch = matchFunction != null;
  const label = `/${r.source}/${r.flags}`;
  const regexParser = (state) => {
    if (state.offset >= state.src.length) {
      state.isError = true;
      return state;
    }
    const savedOffset = state.offset;
    sticky.lastIndex = savedOffset;
    if (hasCustomMatch) {
      const execResult = sticky.exec(state.src);
      const match = matchFunction(execResult);
      if (match) {
        return state.ok(match, sticky.lastIndex - savedOffset);
      } else if (match === "") {
        return state.ok(void 0);
      }
    } else if (sticky.test(state.src)) {
      const end = sticky.lastIndex;
      if (end > savedOffset) {
        state.offset = end;
        state.value = state.src.substring(savedOffset, end);
        state.isError = false;
        return state;
      }
      state.value = void 0;
      state.isError = false;
      return state;
    }
    mergeErrorState(state, label);
    state.isError = true;
    return state;
  };
  return makeParser$1(
    regexParser,
    createParserContext("regex", void 0, r)
  );
}
var trimStateWhitespace = (state) => {
  const src = state.src;
  const len = src.length;
  let offset = state.offset;
  if (offset >= len || src.charCodeAt(offset) > 32) return state;
  while (offset < len) {
    const c = src.charCodeAt(offset);
    if (c === 32 || c >= 9 && c <= 13) {
      offset++;
    } else {
      break;
    }
  }
  state.offset = offset;
  return state;
};
var whitespace;
function _initWhitespace() {
  whitespace = regex(/\s*/);
  whitespace.context.name = "whitespace";
}
var PARSER_ID = 0;
var MEMO = /* @__PURE__ */ new Map();
var LEFT_RECURSION_COUNTS = /* @__PURE__ */ new Map();
var MEMO_OFFSET_BITS = 20;
var MEMO_MAX_OFFSET = (1 << MEMO_OFFSET_BITS) - 1;
var FLAG_NONE = 0;
var FLAG_TRIM_WS = 1;
var FLAG_EOF = 2;
var Parser = class _Parser {
  constructor(parser, context = {}) {
    this.parser = parser;
    this.context = context;
  }
  id = PARSER_ID++;
  state;
  flags = FLAG_NONE;
  reset() {
    resetErrorState();
    MEMO.clear();
    LEFT_RECURSION_COUNTS.clear();
  }
  parseState(val) {
    this.reset();
    const state = new ParserState(val);
    this.parser(state);
    const lastState2 = getLastState();
    if (state.isError && lastState2) {
      const lastFurthestOffset2 = getLastFurthestOffset();
      const errorState = new ParserState(val, void 0, lastFurthestOffset2, true);
      this.state = errorState;
      console.error(this.state.toString());
    } else {
      this.state = state;
      if (state.isError) {
        console.error(state.toString());
      }
    }
    return state;
  }
  parse(val) {
    return this.parseState(val).value;
  }
  getCijKey(state) {
    return this.id << MEMO_OFFSET_BITS | state.offset & MEMO_MAX_OFFSET;
  }
  atLeftRecursionLimit(state) {
    const cij = LEFT_RECURSION_COUNTS.get(this.getCijKey(state)) ?? 0;
    return cij > state.src.length - state.offset;
  }
  memoize() {
    const memoize = (state) => {
      const cijKey = this.getCijKey(state);
      const cij = LEFT_RECURSION_COUNTS.get(cijKey) ?? 0;
      const cached = MEMO.get(this.id);
      if (cached && cached.offset >= state.offset) {
        state.offset = cached.offset;
        state.value = cached.value;
        state.isError = cached.isError;
        return state;
      } else if (this.atLeftRecursionLimit(state)) {
        state.isError = true;
        return state;
      }
      LEFT_RECURSION_COUNTS.set(cijKey, cij + 1);
      this.parser(state);
      const cachedAfter = MEMO.get(this.id);
      if (cachedAfter && cachedAfter.offset > state.offset) {
        state.offset = cachedAfter.offset;
      } else if (!cachedAfter) {
        MEMO.set(this.id, state.clone());
      }
      return state;
    };
    return new _Parser(
      memoize,
      createParserContext("memoize", this)
    );
  }
  mergeMemos() {
    const mergeMemo = (state) => {
      const cached = MEMO.get(this.id);
      if (cached) {
        state.offset = cached.offset;
        state.value = cached.value;
        state.isError = cached.isError;
        return state;
      } else if (this.atLeftRecursionLimit(state)) {
        state.isError = true;
        return state;
      }
      this.parser(state);
      const cachedAfter = MEMO.get(this.id);
      if (!cachedAfter) {
        MEMO.set(this.id, state.clone());
      }
      return state;
    };
    return new _Parser(
      mergeMemo,
      createParserContext("mergeMemo", this)
    );
  }
  then(next) {
    const then = (state) => {
      const savedOffset = state.offset;
      this.parser(state);
      if (!state.isError) {
        const value1 = state.value;
        next.parser(state);
        if (!state.isError) {
          return state.ok([value1, state.value]);
        }
      }
      mergeErrorState(state);
      state.offset = savedOffset;
      state.isError = true;
      return state;
    };
    return new _Parser(
      then,
      createParserContext("then", this, this, next)
    );
  }
  or(other) {
    const or = (state) => {
      const savedOffset = state.offset;
      this.parser(state);
      if (!state.isError) {
        return state;
      }
      state.offset = savedOffset;
      state.isError = false;
      return other.parser(state);
    };
    return new _Parser(
      or,
      createParserContext("or", this, this, other)
    );
  }
  chain(fn, chainError = false) {
    const chain = (state) => {
      this.parser(state);
      if (state.isError) {
        return state;
      } else if (state.value || chainError) {
        return fn(state.value).parser(state);
      }
      return state;
    };
    return new _Parser(
      chain,
      createParserContext("chain", this, fn)
    );
  }
  map(fn, mapError = false) {
    const map = (state) => {
      this.parser(state);
      if (!state.isError || mapError) {
        return state.ok(fn(state.value));
      }
      return state;
    };
    return new _Parser(
      map,
      createParserContext("map", this)
    );
  }
  mapState(fn) {
    const mapState = (state) => {
      const oldOffset = state.offset;
      const oldValue = state.value;
      this.parser(state);
      if (state.isError) {
        return state;
      }
      const oldView = Object.create(state);
      oldView.offset = oldOffset;
      oldView.value = oldValue;
      return fn(state, oldView);
    };
    return new _Parser(
      mapState,
      createParserContext("mapState", this)
    );
  }
  skip(parser) {
    const skip = (state) => {
      const savedOffset = state.offset;
      this.parser(state);
      if (!state.isError) {
        const value1 = state.value;
        parser.parser(state);
        if (!state.isError) {
          return state.ok(value1);
        }
      }
      mergeErrorState(state);
      state.offset = savedOffset;
      state.isError = true;
      return state;
    };
    return new _Parser(
      skip,
      createParserContext("skip", this, parser)
    );
  }
  next(parser) {
    const next = (state) => {
      const savedOffset = state.offset;
      this.parser(state);
      if (!state.isError) {
        parser.parser(state);
        if (!state.isError) {
          return state;
        }
      }
      mergeErrorState(state);
      state.offset = savedOffset;
      state.isError = true;
      return state;
    };
    return new _Parser(
      next,
      createParserContext("next", this, parser)
    );
  }
  opt() {
    const opt = (state) => {
      const savedOffset = state.offset;
      this.parser(state);
      if (state.isError) {
        mergeErrorState(state);
        state.offset = savedOffset;
        return state.ok(void 0);
      }
      return state;
    };
    return new _Parser(
      opt,
      createParserContext("opt", this)
    );
  }
  not(parser) {
    const negate = (state) => {
      const savedOffset = state.offset;
      const savedValue = state.value;
      this.parser(state);
      if (state.isError) {
        mergeErrorState(state);
        state.offset = savedOffset;
        return state.ok(savedValue);
      } else {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
    };
    const not = (state) => {
      const savedOffset = state.offset;
      this.parser(state);
      if (state.isError) {
        mergeErrorState(state);
        state.offset = savedOffset;
        state.isError = true;
        return state;
      } else {
        const value1 = state.value;
        const offset1 = state.offset;
        parser.parser(state);
        if (state.isError) {
          state.offset = offset1;
          state.value = value1;
          state.isError = false;
          return state;
        } else {
          mergeErrorState(state);
          state.offset = savedOffset;
          state.isError = true;
          return state;
        }
      }
    };
    return new _Parser(
      parser ? not : negate,
      createParserContext("not", this, parser)
    );
  }
  /**
   * Set difference: match `this` only if `excluded` would NOT match at the
   * same starting position. Used for EBNF/BNF exception (`-`) semantics.
   */
  minus(excluded) {
    const inner = this;
    const minus = (state) => {
      const savedOffset = state.offset;
      excluded.parser(state);
      if (!state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      state.offset = savedOffset;
      state.isError = false;
      inner.parser(state);
      return state;
    };
    return new _Parser(
      minus,
      createParserContext("minus", this, excluded)
    );
  }
  /**
   * Zero-width positive assertion: succeeds with `this`'s value when
   * `this` matches, but does NOT consume any input. The dual of
   * `not()` (no argument): where `not()` is zero-width negative
   * assertion, `peek()` is zero-width positive assertion.
   */
  peek() {
    const inner = this;
    const peek = (state) => {
      const savedOffset = state.offset;
      inner.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        return state;
      }
      const value = state.value;
      state.offset = savedOffset;
      state.value = value;
      return state;
    };
    return new _Parser(
      peek,
      createParserContext("peek", this)
    );
  }
  /**
   * Consuming positive lookahead: parse `this`, then check that
   * `lookahead` matches at the resulting position without consuming it.
   * Returns `this`'s value; the lookahead is zero-width.
   * Mirrors Rust's `look_ahead()`.
   */
  lookAhead(lookahead) {
    const inner = this;
    const la = (state) => {
      const savedOffset = state.offset;
      inner.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        return state;
      }
      const value = state.value;
      const offsetAfterSelf = state.offset;
      lookahead.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      state.offset = offsetAfterSelf;
      state.value = value;
      return state;
    };
    return new _Parser(
      la,
      createParserContext("lookAhead", this, lookahead)
    );
  }
  wrap(start, end, discard = true) {
    if (!discard) {
      return all(start, this, end);
    }
    const inner = this;
    const wrapParser = (state) => {
      const savedOffset = state.offset;
      start.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        return state;
      }
      const openEnd = state.offset;
      inner.parser(state);
      if (state.isError) {
        mergeErrorState(state);
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      const value = state.value;
      end.parser(state);
      if (state.isError) {
        mergeErrorState(state);
        reportUnclosedDelimiter(state.src.slice(savedOffset, openEnd), savedOffset);
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      state.value = value;
      return state;
    };
    return new _Parser(
      wrapParser,
      createParserContext("wrap", this, start, end)
    );
  }
  /**
   * Call the parser with flag-based pre/post processing.
   * Fast path: flags === 0 just calls parser directly.
   */
  call(state) {
    if (this.flags === 0) {
      return this.parser(state);
    }
    if (this.flags === FLAG_TRIM_WS) {
      trimStateWhitespace(state);
      const savedOffset2 = state.offset;
      this.parser(state);
      if (state.isError) {
        mergeErrorState(state);
        state.offset = savedOffset2;
        state.isError = true;
        return state;
      }
      trimStateWhitespace(state);
      return state;
    }
    if (this.flags & FLAG_TRIM_WS) trimStateWhitespace(state);
    const savedOffset = state.offset;
    this.parser(state);
    if (state.isError) {
      mergeErrorState(state);
      state.offset = savedOffset;
      state.isError = true;
      return state;
    }
    if (this.flags & FLAG_TRIM_WS) trimStateWhitespace(state);
    if (this.flags & FLAG_EOF) {
      if (state.offset < state.src.length) {
        mergeErrorState(state, "<end of input>");
        if (isDiagnosticsEnabled()) {
          addSuggestion({
            kind: "trailing-content",
            message: "unexpected trailing content after parsed value"
          });
        }
        state.offset = savedOffset;
        state.isError = true;
      }
    }
    return state;
  }
  trim(parser = whitespace, discard = true) {
    if (!discard) {
      return all(parser, this, parser);
    }
    if (parser.context?.name === "whitespace") {
      const inner = this;
      const flaggedParser = new _Parser(
        ((state) => inner.call(state)),
        createParserContext("trimWhitespace", this)
      );
      flaggedParser.flags = this.flags | FLAG_TRIM_WS;
      const whitespaceTrim = (state) => {
        trimStateWhitespace(state);
        const savedOffset = state.offset;
        inner.parser(state);
        if (state.isError) {
          mergeErrorState(state);
          state.offset = savedOffset;
          state.isError = true;
          return state;
        } else {
          trimStateWhitespace(state);
          return state;
        }
      };
      return new _Parser(
        whitespaceTrim,
        createParserContext("trimWhitespace", this)
      );
    }
    return this.wrap(parser, parser);
  }
  many(min = 0, max = Infinity) {
    const many = (state) => {
      const est = min > 0 ? min : 0;
      const matches2 = est > 0 ? new Array(est) : [];
      let len = 0;
      for (let i = 0; i < max; i += 1) {
        const savedOffset = state.offset;
        this.parser(state);
        if (state.isError) {
          state.offset = savedOffset;
          state.isError = false;
          break;
        }
        if (state.offset === savedOffset) break;
        if (len < est) {
          matches2[len] = state.value;
        } else {
          matches2.push(state.value);
        }
        len++;
      }
      if (len < est) matches2.length = len;
      if (len >= min) {
        return state.ok(matches2);
      }
      mergeErrorState(state);
      state.isError = true;
      state.value = [];
      return state;
    };
    return new _Parser(
      many,
      createParserContext("many", this, min, max)
    );
  }
  /**
   * Strictly interleaving: `elem (sep elem)*`. Never accepts a trailing
   * separator — trailing sep acceptance is a grammar concern.
   */
  sepBy(sep, min = 0, max = Infinity) {
    const sepBy = (state) => {
      const est = min > 0 ? min : 0;
      const matches2 = est > 0 ? new Array(est) : [];
      let len = 0;
      {
        const savedOffset = state.offset;
        this.parser(state);
        if (state.isError) {
          state.offset = savedOffset;
          state.isError = false;
        } else if (state.offset !== savedOffset) {
          if (len < est) {
            matches2[len] = state.value;
          } else {
            matches2.push(state.value);
          }
          len++;
        }
      }
      while (len > 0 && len < max) {
        const cpBeforeSep = state.offset;
        sep.parser(state);
        if (state.isError) {
          state.offset = cpBeforeSep;
          state.isError = false;
          break;
        }
        const savedOffset = state.offset;
        this.parser(state);
        if (state.isError || state.offset === savedOffset) {
          state.offset = cpBeforeSep;
          state.isError = false;
          break;
        }
        if (len < est) {
          matches2[len] = state.value;
        } else {
          matches2.push(state.value);
        }
        len++;
      }
      if (len < est) matches2.length = len;
      if (len >= min) {
        return state.ok(matches2);
      }
      mergeErrorState(state);
      state.isError = true;
      state.value = [];
      return state;
    };
    return new _Parser(
      sepBy,
      createParserContext("sepBy", this, sep)
    );
  }
  eof() {
    const p = this.skip(eof());
    p.context = createParserContext("eof", this);
    return p;
  }
  /**
   * Error recovery combinator. On success, returns the result normally.
   * On failure, snapshots the current diagnostic into the collected
   * diagnostics list, then runs `sync` to skip past the bad content
   * and returns `sentinel`.
   *
   * This enables `many()` / `sepBy()` loops to keep going — each failed
   * element produces a diagnostic but doesn't halt the overall parse.
   */
  recover(sync, sentinel) {
    const inner = this;
    const recover = (state) => {
      const checkpoint = state.offset;
      inner.parser(state);
      if (!state.isError) {
        return state;
      }
      collectDiagnostic(state.src, checkpoint);
      state.isError = false;
      state.offset = checkpoint;
      sync.parser(state);
      if (state.isError) {
        popLastDiagnostic();
        state.offset = checkpoint;
        state.isError = true;
        return state;
      }
      return state.ok(sentinel);
    };
    return new _Parser(
      recover,
      createParserContext("recover", this, sync, sentinel)
    );
  }
  debug(name = "", recursivePrint = false, logger = console.log) {
    return parserDebug(this, name, recursivePrint, logger);
  }
  toString() {
    return parserPrint(this);
  }
  static lazy(fn) {
    return new _Parser(
      createLazyCached(fn),
      createParserContext("lazy", void 0, fn)
    );
  }
};
_initWhitespace();
function makeParser(parser, context) {
  return new Parser(parser, context);
}
function regexSpan(r) {
  const flags = r.flags.replace(/y/g, "");
  const sticky = new RegExp(r, flags + "y");
  const label = `/${r.source}/${r.flags}`;
  const regexSpanParser = (state) => {
    if (state.offset >= state.src.length) {
      state.isError = true;
      return state;
    }
    const savedOffset = state.offset;
    sticky.lastIndex = savedOffset;
    if (sticky.test(state.src)) {
      const end = sticky.lastIndex;
      if (end > savedOffset) {
        state.offset = end;
        state.value = { start: savedOffset, end };
        state.isError = false;
        return state;
      }
      state.value = { start: savedOffset, end: savedOffset };
      state.isError = false;
      return state;
    }
    mergeErrorState(state, label);
    state.isError = true;
    return state;
  };
  return makeParser(
    regexSpanParser,
    createParserContext("regexSpan", void 0, r)
  );
}
var comma = string(",").trim();
var colon = string(":").trim();
var jsonNull = string("null").map(() => null);
var jsonBool = string("true").or(string("false")).map((v) => v === "true");
var jsonNumber = regex(/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/).map(Number);
var jsonString = regex(/"(?:[^"\\]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"/).map(
  (s) => s.indexOf("\\") === -1 ? s.slice(1, -1) : JSON.parse(s)
);
var jsonArray = Parser.lazy(
  () => jsonValue.sepBy(comma).trim().wrap(string("["), string("]"))
);
var jsonObject = Parser.lazy(
  () => jsonString.skip(colon).then(jsonValue.trim()).sepBy(comma).trim().wrap(string("{"), string("}")).map((pairs) => Object.fromEntries(pairs))
);
var jsonValue = dispatch({
  "{": jsonObject,
  "[": jsonArray,
  '"': jsonString,
  "-": jsonNumber,
  "0-9": jsonNumber,
  "t": jsonBool,
  "f": jsonBool,
  "n": jsonNull
});
var jsonParser = jsonValue.trim();
var COLOR_FUNCTIONS = /* @__PURE__ */ new Set([
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hwb",
  "lab",
  "lch",
  "oklab",
  "oklch",
  "color",
  "color-mix"
]);
function tryParse(parser, state) {
  const saved = state.offset;
  parser.call(state);
  if (state.isError) {
    state.offset = saved;
    state.isError = false;
    return void 0;
  }
  return state.value;
}
function skipWs(state) {
  const src = state.src;
  let i = state.offset;
  while (i < src.length && src.charCodeAt(i) <= 32) i++;
  state.offset = i;
}
function skipWsAndComments(state) {
  const src = state.src;
  let i = state.offset;
  while (i < src.length) {
    const ch = src.charCodeAt(i);
    if (ch <= 32) {
      i++;
      continue;
    }
    if (ch === 47 && i + 1 < src.length && src.charCodeAt(i + 1) === 42) {
      const end = src.indexOf("*/", i + 2);
      if (end === -1) break;
      i = end + 2;
      continue;
    }
    break;
  }
  state.offset = i;
}
function isAtEnd(state) {
  return state.offset >= state.src.length;
}
function charAt(state) {
  return state.src.charCodeAt(state.offset);
}
function matchStr(state, s) {
  if (state.src.startsWith(s, state.offset)) {
    state.offset += s.length;
    return true;
  }
  return false;
}
var cssIdent = regex(/[-]?[a-zA-Z_][\w-]*|--[\w-]+/);
var cssString_ = regex(/"(?:[^"\\]|\\[\s\S])*"|'(?:[^'\\]|\\[\s\S])*'/);
regex(/\/\*[\s\S]*?\*\//);
var cssNumberRe = regex(/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);
var cssUnitRe = regex(
  /(?:px|em|rem|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|Q|cap|ic|lh|rlh|vi|vb|svw|svh|lvw|lvh|dvw|dvh|cqw|cqh|cqi|cqb|cqmin|cqmax|deg|rad|grad|turn|ms|s|Hz|kHz|dpi|dpcm|dppx|fr)/i
);
function parseIdent(state) {
  return tryParse(cssIdent, state);
}
function parseString(state) {
  return tryParse(cssString_, state);
}
function parseNumber(state) {
  return tryParse(cssNumberRe, state);
}
function parseUnit(state) {
  return tryParse(cssUnitRe, state);
}
function parseSingleValue(state) {
  if (isAtEnd(state)) return void 0;
  const ch = charAt(state);
  if (ch === 35) {
    const m = state.src.slice(state.offset).match(/^#[0-9a-fA-F]{3,8}/);
    if (m) {
      state.offset += m[0].length;
      return { type: "color", color: { type: "hex", value: m[0] } };
    }
  }
  if (ch === 34 || ch === 39) {
    const s = parseString(state);
    if (s !== void 0) return { type: "string", value: s };
  }
  if (ch === 44) {
    state.offset++;
    return { type: "comma" };
  }
  if (ch === 47 && (state.offset + 1 >= state.src.length || state.src.charCodeAt(state.offset + 1) !== 42)) {
    state.offset++;
    return { type: "slash" };
  }
  const isDoubleDash = ch === 45 && state.offset + 1 < state.src.length && state.src.charCodeAt(state.offset + 1) === 45;
  if (!isDoubleDash && (ch >= 48 && ch <= 57 || ch === 45 || ch === 43 || ch === 46)) {
    const numStr = parseNumber(state);
    if (numStr !== void 0) {
      const num = Number(numStr);
      if (matchStr(state, "%")) return { type: "percentage", value: num };
      const unit = parseUnit(state);
      if (unit !== void 0) return { type: "dimension", value: num, unit };
      return { type: "number", value: num };
    }
    if (ch === 43 || ch === 45) {
      state.offset++;
      return { type: "operator", value: String.fromCharCode(ch) };
    }
  }
  const saved = state.offset;
  const name = parseIdent(state);
  if (name !== void 0) {
    if (matchStr(state, "(")) {
      const args = parseFunctionArgs(state);
      if (args === void 0) {
        state.offset = saved;
        return void 0;
      }
      if (COLOR_FUNCTIONS.has(name)) {
        return { type: "color", color: { type: "function", name, args } };
      }
      return { type: "function", name, args };
    }
    return { type: "ident", value: name };
  }
  return void 0;
}
function parseFunctionArgs(state) {
  const args = [];
  while (true) {
    skipWsAndComments(state);
    if (isAtEnd(state)) return void 0;
    if (matchStr(state, ")")) return args;
    const v = parseSingleValue(state);
    if (v !== void 0) {
      args.push(v);
    } else {
      state.offset++;
    }
  }
}
function parseSelectorList(state) {
  const first = parseComplexSelector(state);
  if (first === void 0) return void 0;
  const list = [first];
  while (true) {
    skipWsAndComments(state);
    if (!matchStr(state, ",")) break;
    skipWsAndComments(state);
    const sel = parseComplexSelector(state);
    if (sel === void 0) break;
    list.push(sel);
  }
  return list;
}
function parseComplexSelector(state) {
  const left = parseCompoundSelector(state);
  if (left === void 0) return void 0;
  const cp = state.offset;
  skipWs(state);
  let combinator;
  const ch = isAtEnd(state) ? 0 : charAt(state);
  if (ch === 62 || ch === 43 || ch === 126) {
    combinator = state.src[state.offset];
    state.offset++;
    skipWs(state);
  } else if (state.offset > cp && !isAtEnd(state)) {
    const next = charAt(state);
    if (next === 46 || next === 35 || next === 91 || next === 58 || next === 42 || next >= 97 && next <= 122 || next >= 65 && next <= 90 || next === 95) {
      combinator = " ";
    } else {
      state.offset = cp;
    }
  } else {
    state.offset = cp;
  }
  if (combinator !== void 0) {
    const right = parseComplexSelector(state);
    if (right !== void 0) {
      return { type: "complex", left, combinator, right };
    }
    state.offset = cp;
  }
  return left;
}
function parseCompoundSelector(state) {
  const parts = [];
  if (matchStr(state, "*")) {
    parts.push({ type: "universal" });
  } else {
    const saved = state.offset;
    const name = parseIdent(state);
    if (name !== void 0) {
      if (!isAtEnd(state) && charAt(state) === 40) {
        state.offset = saved;
      } else {
        parts.push({ type: "type", value: name });
      }
    }
  }
  while (true) {
    const s = parseSimpleSelectorSuffix(state);
    if (s === void 0) break;
    parts.push(s);
  }
  if (parts.length === 0) return void 0;
  if (parts.length === 1) return parts[0];
  return { type: "compound", parts };
}
function parseSimpleSelectorSuffix(state) {
  if (isAtEnd(state)) return void 0;
  const ch = charAt(state);
  if (ch === 46) {
    state.offset++;
    const name = parseIdent(state);
    if (name === void 0) {
      state.offset--;
      return void 0;
    }
    return { type: "class", value: "." + name };
  }
  if (ch === 35) {
    state.offset++;
    const name = parseIdent(state);
    if (name === void 0) {
      state.offset--;
      return void 0;
    }
    return { type: "id", value: "#" + name };
  }
  if (ch === 91) return parseAttributeSelector(state);
  if (ch === 58) return parsePseudoSelector(state);
  if (ch === 42) {
    state.offset++;
    return { type: "universal" };
  }
  return void 0;
}
function parseAttributeSelector(state) {
  if (!matchStr(state, "[")) return void 0;
  skipWs(state);
  const name = parseIdent(state);
  if (name === void 0) return void 0;
  skipWs(state);
  let matcher = null;
  let value = null;
  const m = state.src.slice(state.offset).match(/^[~|^$*]?=/);
  if (m) {
    matcher = m[0];
    state.offset += m[0].length;
    skipWs(state);
    value = parseString(state) ?? parseIdent(state) ?? null;
    skipWs(state);
  }
  if (!matchStr(state, "]")) return void 0;
  return { type: "attribute", name, matcher, value };
}
function parsePseudoSelector(state) {
  const isElement = matchStr(state, "::");
  if (!isElement && !matchStr(state, ":")) return void 0;
  const name = parseIdent(state);
  if (name === void 0) return void 0;
  if (matchStr(state, "(")) {
    skipWsAndComments(state);
    if (name.startsWith("nth-")) {
      const m = state.src.slice(state.offset).match(
        /^(?:(?:[+-]?\d*n\s*(?:[+-]\s*\d+)?)|(?:[+-]?\d+)|even|odd)/
      );
      if (m) state.offset += m[0].length;
      skipWsAndComments(state);
      if (!matchStr(state, ")")) return void 0;
      return {
        type: "pseudoFunction",
        name,
        args: m ? [{ type: "type", value: m[0] }] : []
      };
    }
    const args = parseSelectorList(state) ?? [];
    skipWsAndComments(state);
    if (!matchStr(state, ")")) return void 0;
    return { type: "pseudoFunction", name, args };
  }
  return isElement ? { type: "pseudoElement", value: name } : { type: "pseudoClass", value: name };
}
function parseRangeOp(state) {
  if (isAtEnd(state)) return void 0;
  const ch = charAt(state);
  if (ch === 60) {
    if (state.src.charCodeAt(state.offset + 1) === 61) {
      state.offset += 2;
      return "<=";
    }
    state.offset++;
    return "<";
  }
  if (ch === 62) {
    if (state.src.charCodeAt(state.offset + 1) === 61) {
      state.offset += 2;
      return ">=";
    }
    state.offset++;
    return ">";
  }
  if (ch === 61) {
    state.offset++;
    return "=";
  }
  return void 0;
}
function parseMediaFeature(state) {
  if (isAtEnd(state) || charAt(state) !== 40) return void 0;
  state.offset++;
  skipWsAndComments(state);
  const cp = state.offset;
  const name = parseIdent(state);
  if (name === void 0) {
    state.offset = cp;
    return void 0;
  }
  skipWsAndComments(state);
  const rangeCp = state.offset;
  const op = parseRangeOp(state);
  if (op !== void 0) {
    skipWsAndComments(state);
    const value = parseSingleValue(state);
    if (value !== void 0) {
      skipWsAndComments(state);
      const rangeCp2 = state.offset;
      const op2 = parseRangeOp(state);
      if (op2 !== void 0) {
        skipWsAndComments(state);
        const value2 = parseSingleValue(state);
        if (value2 !== void 0) {
          skipWsAndComments(state);
          if (!isAtEnd(state) && charAt(state) === 41) {
            state.offset++;
            return { type: "rangeInterval", name, lo: value, loOp: op, hi: value2, hiOp: op2 };
          }
        }
        state.offset = rangeCp2;
      }
      if (!isAtEnd(state) && charAt(state) === 41) {
        state.offset++;
        return { type: "range", name, op, value };
      }
    }
    state.offset = rangeCp;
  }
  if (!isAtEnd(state) && charAt(state) === 58) {
    state.offset++;
    skipWsAndComments(state);
    const value = parseSingleValue(state) ?? null;
    skipWsAndComments(state);
    if (!isAtEnd(state) && charAt(state) === 41) {
      state.offset++;
      return { type: "plain", name, value };
    }
    state.offset = cp;
    return void 0;
  }
  if (!isAtEnd(state) && charAt(state) === 41) {
    state.offset++;
    return { type: "plain", name, value: null };
  }
  state.offset = cp;
  return void 0;
}
function parseMediaCondition(state) {
  skipWsAndComments(state);
  const cp = state.offset;
  const ident = parseIdent(state);
  if (ident === "not") {
    skipWsAndComments(state);
    const inner = parseMediaCondition(state);
    if (inner !== void 0) {
      return { type: "not", condition: inner };
    }
    state.offset = cp;
  } else if (ident !== void 0) {
    state.offset = cp;
  }
  const feature = parseMediaFeature(state);
  if (feature === void 0) return void 0;
  let result = { type: "feature", feature };
  while (true) {
    skipWsAndComments(state);
    const kwCp = state.offset;
    const kw = parseIdent(state);
    if (kw === "and") {
      skipWsAndComments(state);
      const next = parseMediaCondition(state);
      if (next !== void 0) {
        const conditions = result.type === "and" ? result.conditions : [result];
        conditions.push(next);
        result = { type: "and", conditions };
        continue;
      }
      state.offset = kwCp;
      break;
    } else if (kw === "or") {
      skipWsAndComments(state);
      const next = parseMediaCondition(state);
      if (next !== void 0) {
        const conditions = result.type === "or" ? result.conditions : [result];
        conditions.push(next);
        result = { type: "or", conditions };
        continue;
      }
      state.offset = kwCp;
      break;
    } else {
      if (kw !== void 0) state.offset = kwCp;
      break;
    }
  }
  return result;
}
function parseMediaQuery(state) {
  skipWsAndComments(state);
  let modifier = null;
  let mediaType = null;
  const conditions = [];
  const cp = state.offset;
  const ident = parseIdent(state);
  if (ident !== void 0) {
    if (ident === "not" || ident === "only") {
      modifier = ident;
      skipWsAndComments(state);
      const mt = parseIdent(state);
      if (mt !== void 0) {
        mediaType = mt;
      } else {
        state.offset = cp;
        modifier = null;
      }
    } else {
      mediaType = ident;
    }
  }
  if (mediaType !== null) {
    skipWsAndComments(state);
    const kwCp = state.offset;
    const kw = parseIdent(state);
    if (kw === "and") {
      skipWsAndComments(state);
      const cond = parseMediaCondition(state);
      if (cond !== void 0) {
        conditions.push(cond);
      }
    } else {
      if (kw !== void 0) state.offset = kwCp;
    }
  } else {
    state.offset = cp;
    modifier = null;
    const cond = parseMediaCondition(state);
    if (cond === void 0) return void 0;
    conditions.push(cond);
  }
  return { modifier, mediaType, conditions };
}
function parseMediaQueryList(state) {
  const queries = [];
  const q = parseMediaQuery(state);
  if (q === void 0) return queries;
  queries.push(q);
  while (true) {
    skipWsAndComments(state);
    if (isAtEnd(state) || charAt(state) !== 44) break;
    state.offset++;
    skipWsAndComments(state);
    const next = parseMediaQuery(state);
    if (next === void 0) break;
    queries.push(next);
  }
  return queries;
}
function parseSupportsConditionChain(result, state) {
  while (true) {
    skipWsAndComments(state);
    const kwCp = state.offset;
    const kw = parseIdent(state);
    if (kw === "and") {
      skipWsAndComments(state);
      const next = parseSupportsCondition(state);
      if (next !== void 0) {
        const conds = result.type === "and" ? result.conditions : [result];
        conds.push(next);
        result = { type: "and", conditions: conds };
        continue;
      }
      state.offset = kwCp;
    } else if (kw === "or") {
      skipWsAndComments(state);
      const next = parseSupportsCondition(state);
      if (next !== void 0) {
        const conds = result.type === "or" ? result.conditions : [result];
        conds.push(next);
        result = { type: "or", conditions: conds };
        continue;
      }
      state.offset = kwCp;
    } else {
      if (kw !== void 0) state.offset = kwCp;
    }
    break;
  }
  return result;
}
function parseSupportsCondition(state) {
  skipWsAndComments(state);
  const cp = state.offset;
  const ident = parseIdent(state);
  if (ident === "not") {
    skipWsAndComments(state);
    const inner = parseSupportsCondition(state);
    if (inner !== void 0) {
      const result = { type: "not", condition: inner };
      return parseSupportsConditionChain(result, state);
    }
    state.offset = cp;
  } else if (ident !== void 0) {
    state.offset = cp;
  }
  if (!isAtEnd(state) && charAt(state) === 40) {
    state.offset++;
    skipWsAndComments(state);
    const innerCp = state.offset;
    const inner = parseSupportsCondition(state);
    if (inner !== void 0) {
      skipWsAndComments(state);
      if (!isAtEnd(state) && charAt(state) === 41) {
        state.offset++;
        return parseSupportsConditionChain(inner, state);
      }
      state.offset = innerCp;
    }
    const property = parseIdent(state);
    if (property !== void 0) {
      skipWsAndComments(state);
      if (!isAtEnd(state) && charAt(state) === 58) {
        state.offset++;
        skipWsAndComments(state);
        const values = [];
        while (true) {
          skipWsAndComments(state);
          if (isAtEnd(state) || charAt(state) === 41) break;
          const v = parseSingleValue(state);
          if (v === void 0) break;
          values.push(v);
        }
        if (!isAtEnd(state) && charAt(state) === 41) {
          state.offset++;
          const result = { type: "declaration", property, value: values };
          return parseSupportsConditionChain(result, state);
        }
      }
    }
    state.offset = cp;
  }
  return void 0;
}
function parseDeclaration(state) {
  skipWsAndComments(state);
  const property = parseIdent(state);
  if (property === void 0) return void 0;
  skipWsAndComments(state);
  if (!matchStr(state, ":")) return void 0;
  skipWsAndComments(state);
  const values = [];
  while (true) {
    skipWsAndComments(state);
    if (isAtEnd(state)) break;
    const ch = charAt(state);
    if (ch === 59 || ch === 125) break;
    const v = parseSingleValue(state);
    if (v === void 0) break;
    values.push(v);
  }
  matchStr(state, ";");
  return { property, values, important: false };
}
function parseDeclarationBlock(state) {
  if (!matchStr(state, "{")) return void 0;
  const declarations = [];
  while (true) {
    skipWsAndComments(state);
    if (isAtEnd(state)) return void 0;
    if (matchStr(state, "}")) break;
    const d = parseDeclaration(state);
    if (d !== void 0) {
      declarations.push(d);
    } else {
      const rest = state.src.slice(state.offset);
      const idx = rest.search(/[;}]/);
      if (idx >= 0) {
        state.offset += idx;
        matchStr(state, ";");
      } else {
        break;
      }
    }
  }
  return declarations;
}
function parseKeyframeStop(state) {
  if (matchStr(state, "from")) return { type: "from" };
  if (matchStr(state, "to")) return { type: "to" };
  const numStr = parseNumber(state);
  if (numStr !== void 0 && matchStr(state, "%")) {
    return { type: "percentage", value: Number(numStr) };
  }
  return void 0;
}
function parseKeyframeBlock(state) {
  skipWsAndComments(state);
  const stops = [];
  const first = parseKeyframeStop(state);
  if (first === void 0) return void 0;
  stops.push(first);
  while (true) {
    skipWsAndComments(state);
    if (!matchStr(state, ",")) break;
    skipWsAndComments(state);
    const s = parseKeyframeStop(state);
    if (s === void 0) break;
    stops.push(s);
  }
  skipWsAndComments(state);
  const declarations = parseDeclarationBlock(state);
  if (declarations === void 0) return void 0;
  return { stops, declarations };
}
function parseRuleBody(state) {
  const body = [];
  while (true) {
    skipWsAndComments(state);
    if (isAtEnd(state)) return void 0;
    if (matchStr(state, "}")) break;
    const node = parseRule(state);
    if (node !== void 0) {
      body.push(node);
    } else {
      const skip = state.src.slice(state.offset).search(/[;}]/);
      if (skip >= 0) {
        state.offset += skip;
        matchStr(state, ";");
      } else break;
    }
  }
  return body;
}
function parseAtRule(state) {
  if (!matchStr(state, "@")) return void 0;
  const name = parseIdent(state);
  if (name === void 0) return void 0;
  skipWsAndComments(state);
  switch (name) {
    case "media": {
      const queries = parseMediaQueryList(state);
      skipWsAndComments(state);
      if (!matchStr(state, "{")) return void 0;
      const body = parseRuleBody(state);
      if (body === void 0) return void 0;
      return { type: "atMedia", queries, body };
    }
    case "supports": {
      const condition = parseSupportsCondition(state);
      if (condition === void 0) return void 0;
      skipWsAndComments(state);
      if (!matchStr(state, "{")) return void 0;
      const body = parseRuleBody(state);
      if (body === void 0) return void 0;
      return { type: "atSupports", condition, body };
    }
    case "font-face": {
      skipWsAndComments(state);
      const declarations = parseDeclarationBlock(state);
      if (declarations === void 0) return void 0;
      return { type: "atFontFace", declarations };
    }
    case "import": {
      skipWsAndComments(state);
      const values = [];
      while (true) {
        skipWsAndComments(state);
        if (isAtEnd(state) || charAt(state) === 59) break;
        const v = parseSingleValue(state);
        if (v === void 0) break;
        values.push(v);
      }
      matchStr(state, ";");
      return { type: "atImport", values };
    }
    case "keyframes":
    case "-webkit-keyframes":
    case "-moz-keyframes": {
      skipWsAndComments(state);
      const kfName = parseIdent(state) ?? parseString(state);
      if (kfName === void 0) return void 0;
      skipWsAndComments(state);
      if (!matchStr(state, "{")) return void 0;
      const blocks2 = [];
      while (true) {
        skipWsAndComments(state);
        if (isAtEnd(state)) return void 0;
        if (matchStr(state, "}")) break;
        const block = parseKeyframeBlock(state);
        if (block !== void 0) {
          blocks2.push(block);
        } else {
          const skip = state.src.slice(state.offset).search(/}/);
          if (skip >= 0) state.offset += skip;
          else break;
        }
      }
      return { type: "atKeyframes", name: kfName, blocks: blocks2 };
    }
    default: {
      const rest = state.src.slice(state.offset);
      const idx = rest.search(/[{;]/);
      let prelude = "";
      let hasBlock = false;
      if (idx >= 0) {
        prelude = rest.slice(0, idx).trim();
        state.offset += idx;
        if (matchStr(state, "{")) hasBlock = true;
        else matchStr(state, ";");
      }
      let body = null;
      if (hasBlock) {
        body = parseRuleBody(state) ?? [];
      }
      return { type: "genericAtRule", name, prelude, body };
    }
  }
}
function parseQualifiedRule(state) {
  const selectorList = parseSelectorList(state);
  if (selectorList === void 0) return void 0;
  skipWsAndComments(state);
  const declarations = parseDeclarationBlock(state);
  if (declarations === void 0) return void 0;
  return { type: "qualifiedRule", selectorList, declarations };
}
function parseRule(state) {
  skipWs(state);
  if (isAtEnd(state)) return void 0;
  if (charAt(state) === 47 && state.offset + 1 < state.src.length && state.src.charCodeAt(state.offset + 1) === 42) {
    const end = state.src.indexOf("*/", state.offset + 2);
    if (end === -1) return void 0;
    const value = state.src.slice(state.offset, end + 2);
    state.offset = end + 2;
    return { type: "comment", value };
  }
  if (charAt(state) === 64) return parseAtRule(state);
  return parseQualifiedRule(state);
}
var cssParser = new Parser((state) => {
  const nodes = [];
  while (true) {
    skipWs(state);
    if (isAtEnd(state)) break;
    const node = parseRule(state);
    if (node !== void 0) {
      nodes.push(node);
    } else {
      if (isAtEnd(state)) break;
      const rest = state.src.slice(state.offset);
      const skip = rest.search(/[;}]/);
      if (skip >= 0) {
        state.offset += skip;
        if (!matchStr(state, ";") && !matchStr(state, "}")) {
          if (!isAtEnd(state)) state.offset++;
          else break;
        }
      } else {
        if (!isAtEnd(state)) state.offset++;
        else break;
      }
    }
  }
  return state.ok(nodes);
});
var delim = string(",").trim();
var doubleQuotes = string('"');
var singleQuotes = string("'");
var token = any(
  regex(/[^"]+/).wrap(doubleQuotes, doubleQuotes),
  regex(/[^']+/).wrap(singleQuotes, singleQuotes),
  regex(/[^,]+/)
);
var line = token.sepBy(delim).trim();
var csvParser = line.many();

// node_modules/@mkbabb/bbnf-lang/dist/bbnf.js
var operatorToType = {
  "|": "alternation",
  ",": "concatenation",
  "-": "minus",
  "<<": "skip",
  ">>": "next",
  "*": "many",
  "+": "many1",
  "?": "optional",
  "?w": "optionalWhitespace"
};
var reduceBinaryExpression = ([left, rightExpression]) => {
  if (rightExpression.length === 0) {
    return left;
  }
  return rightExpression.reduce((acc, [op, right]) => {
    return {
      type: operatorToType[op],
      value: [acc, right]
    };
  }, left);
};
var mapFactor = ([term, op]) => {
  if (op === void 0) {
    return term;
  }
  const type = operatorToType[op];
  return {
    type,
    value: term
  };
};
function mapStatePosition(parser) {
  return parser.mapState((newState, oldState) => {
    if (newState.value && newState.value.range === void 0) {
      newState.value.range = {
        start: oldState.offset,
        end: newState.offset
      };
    }
    return newState;
  });
}
var defaultOptions = {
  debug: false,
  comments: true
};
var BBNFGrammar = class {
  options;
  // Backing fields for lazy-memoized parsers
  _blockComment;
  _lineComment;
  _comment;
  _group;
  _regex;
  _optionalGroup;
  _manyGroup;
  _lhs;
  _term;
  _factor;
  _binaryFactor;
  _concatenation;
  _alternation;
  _rhs;
  _productionRule;
  _grammar;
  _importDirective;
  _recoverDirective;
  _prettyDirective;
  _noCollapseDirective;
  _grammarWithImports;
  constructor(options) {
    this.options = {
      ...defaultOptions,
      ...options ?? {}
    };
  }
  identifier() {
    return regex(/[_a-zA-Z][_a-zA-Z0-9-]*/);
  }
  literal() {
    return any(
      regex(/(\\.|[^"\\])*/).wrap(string('"'), string('"')),
      regex(/(\\.|[^'\\])*/).wrap(string("'"), string("'")),
      regex(/(\\.|[^`\\])*/).wrap(string("`"), string("`"))
    ).map((value) => {
      value = value.replace(/\\(.)/g, "$1");
      return {
        type: "literal",
        value
      };
    });
  }
  epsilon() {
    return any(string("epsilon"), string("\u03B5")).map(() => {
      return {
        type: "epsilon"
      };
    });
  }
  nonterminal() {
    return this.identifier().map((value) => {
      return {
        type: "nonterminal",
        value
      };
    });
  }
  blockComment() {
    return this._blockComment ??= Parser.lazy(
      () => mapStatePosition(
        regex(/\/\*[^\*]*\*\//).map((v) => {
          return {
            type: "comment",
            value: v
          };
        })
      )
    );
  }
  lineComment() {
    return this._lineComment ??= Parser.lazy(
      () => mapStatePosition(
        regex(/\/\/.*/).map((v) => {
          return {
            type: "comment",
            value: v
          };
        })
      )
    );
  }
  comment() {
    return this._comment ??= Parser.lazy(
      () => any(this.blockComment(), this.lineComment())
    );
  }
  trimBigComment(e) {
    return e.trim(this.blockComment().trim().many(), false).map(([left, expression, right]) => {
      expression.comment = {
        left,
        right
      };
      return expression;
    });
  }
  group() {
    return this._group ??= Parser.lazy(
      () => this.rhs().trim().wrap(string("("), string(")")).map((value) => {
        return {
          type: "group",
          value
        };
      })
    );
  }
  regexRule() {
    return this._regex ??= Parser.lazy(
      () => regex(/(\\.|[^\/])+/).wrap(string("/"), string("/")).then(regex(/[gimuy]*/).opt()).map(([r, flags]) => {
        return {
          type: "regex",
          value: new RegExp(r, flags ?? void 0)
        };
      })
    );
  }
  optionalGroup() {
    return this._optionalGroup ??= Parser.lazy(
      () => this.rhs().trim().wrap(string("["), string("]")).map((value) => {
        return {
          type: "optional",
          value: {
            type: "group",
            value
          }
        };
      })
    );
  }
  manyGroup() {
    return this._manyGroup ??= Parser.lazy(
      () => this.rhs().trim().wrap(string("{"), string("}")).map((value) => {
        return {
          type: "many",
          value: {
            type: "group",
            value
          }
        };
      })
    );
  }
  lhs() {
    return this._lhs ??= Parser.lazy(
      () => mapStatePosition(this.nonterminal())
    );
  }
  term() {
    return this._term ??= Parser.lazy(
      () => mapStatePosition(
        any(
          this.epsilon(),
          this.group(),
          this.optionalGroup(),
          this.manyGroup(),
          this.nonterminal(),
          this.literal(),
          this.regexRule()
        )
      )
    );
  }
  factor() {
    return this._factor ??= Parser.lazy(
      () => this.trimBigComment(
        mapStatePosition(
          all(
            this.term(),
            any(
              string("?w"),
              string("?"),
              string("*"),
              string("+")
            ).trim().opt()
          ).map(mapFactor)
        )
      )
    );
  }
  binaryFactor() {
    return this._binaryFactor ??= Parser.lazy(
      () => mapStatePosition(
        all(
          this.factor(),
          all(
            any(string("<<"), string(">>"), string("-")).trim(),
            this.factor()
          ).many()
        ).map(reduceBinaryExpression)
      )
    );
  }
  concatenation() {
    return this._concatenation ??= Parser.lazy(
      () => mapStatePosition(
        this.binaryFactor().sepBy(string(",").trim())
      ).map((value) => {
        if (value.length === 1) {
          return value[0];
        }
        return {
          type: "concatenation",
          value
        };
      })
    );
  }
  alternation() {
    return this._alternation ??= Parser.lazy(
      () => mapStatePosition(
        this.concatenation().sepBy(string("|").trim())
      ).map((value) => {
        if (value.length === 1) {
          return value[0];
        }
        return {
          type: "alternation",
          value
        };
      })
    );
  }
  rhs() {
    return this._rhs ??= Parser.lazy(
      () => this.alternation()
    );
  }
  productionRule() {
    return this._productionRule ??= Parser.lazy(
      () => all(
        this.lhs(),
        string("=").trim(),
        this.rhs(),
        any(string(";"), string(".")).trim()
      ).map(([name, , expression]) => {
        return { name, expression };
      })
    );
  }
  grammar() {
    return this._grammar ??= Parser.lazy(
      () => this.productionRule().trim(this.lineComment().trim().many(), false).map(([above, rule, below]) => {
        rule.comment = {
          above,
          below
        };
        return rule;
      }).many(1).trim()
    );
  }
  importDirective() {
    return this._importDirective ??= Parser.lazy(() => {
      const importPath = regex(/(\\.|[^"\\])*/).wrap(string('"'), string('"'));
      const importItems = this.identifier().sepBy(string(",").trim(), 1).trim().wrap(string("{"), string("}"));
      const selective = all(
        importItems,
        string("from").trim(),
        importPath
      ).map(([items, , path]) => ({
        path,
        items
      }));
      const glob = importPath.map((path) => ({
        path
      }));
      return mapStatePosition(
        all(
          string("@import").trim(),
          any(selective, glob),
          any(string(";"), string(".")).trim().opt()
        ).map(([, directive]) => directive)
      );
    });
  }
  recoverDirective() {
    return this._recoverDirective ??= Parser.lazy(() => {
      return mapStatePosition(
        all(
          string("@recover").trim(),
          this.identifier().trim(),
          this.rhs().trim(),
          any(string(";"), string(".")).trim().opt()
        ).map(([, ruleName, syncExpr]) => ({
          ruleName,
          syncExpr
        }))
      );
    });
  }
  prettyDirective() {
    return this._prettyDirective ??= Parser.lazy(() => {
      const quotedArg = regex(/(\\.|[^"\\])*/).wrap(string('"'), string('"'));
      const hintWithArg = all(
        this.identifier(),
        quotedArg.wrap(string("("), string(")"))
      ).map(([name, arg]) => ({ name, arg }));
      const bareHint = this.identifier().map(
        (name) => ({ name })
      );
      const hint = any(hintWithArg, bareHint);
      return mapStatePosition(
        all(
          string("@pretty").trim(),
          this.identifier().trim(),
          hint.trim().many(1),
          any(string(";"), string(".")).trim().opt()
        ).map(([, ruleName, hints]) => ({
          ruleName,
          hints
        }))
      );
    });
  }
  noCollapseDirective() {
    return this._noCollapseDirective ??= Parser.lazy(() => {
      return mapStatePosition(
        all(
          string("@no_collapse").trim(),
          this.identifier().trim(),
          any(string(";"), string(".")).trim().opt()
        ).map(([, ruleName]) => ({
          ruleName
        }))
      );
    });
  }
  grammarWithImports() {
    return this._grammarWithImports ??= Parser.lazy(() => {
      const commentTrim = this.lineComment().trim().many();
      const rule = this.productionRule().trim(commentTrim, false).map(([above, rule2, below]) => {
        rule2.comment = {
          above,
          below
        };
        return rule2;
      });
      const importDir = this.importDirective().trim(commentTrim, false).map(([above, directive, below]) => directive);
      const recoverDir = this.recoverDirective().trim(commentTrim, false).map(([above, directive, below]) => directive);
      const prettyDir = this.prettyDirective().trim(commentTrim, false).map(([above, directive, below]) => directive);
      const noCollapseDir = this.noCollapseDirective().trim(commentTrim, false).map(([above, directive, below]) => directive);
      const item = any(
        importDir.map((d) => ({ type: "import", value: d })),
        recoverDir.map((d) => ({ type: "recover", value: d })),
        noCollapseDir.map((d) => ({ type: "no_collapse", value: d })),
        prettyDir.map((d) => ({ type: "pretty", value: d })),
        rule.map((r) => ({ type: "rule", value: r }))
      );
      return item.many(1).trim().map((items) => {
        const imports = [];
        const recovers = [];
        const no_collapses = [];
        const pretties = [];
        const rules = [];
        for (const item2 of items) {
          if (item2.type === "import") {
            imports.push(item2.value);
          } else if (item2.type === "recover") {
            recovers.push(item2.value);
          } else if (item2.type === "no_collapse") {
            no_collapses.push(item2.value);
          } else if (item2.type === "pretty") {
            pretties.push(item2.value);
          } else {
            rules.push(item2.value);
          }
        }
        const rulesMap = new Map(
          rules.map((r) => [r.name.value, r])
        );
        return { imports, recovers, no_collapses, pretties, rules: rulesMap };
      });
    });
  }
};
function topologicalSort(ast) {
  const visited = /* @__PURE__ */ new Set();
  const order = [];
  function visit(node, stack) {
    if (stack.has(node) || visited.has(node)) {
      return;
    }
    stack.add(node);
    const productionRule = ast.get(node);
    if (!productionRule) {
      return;
    }
    const expr = productionRule.expression;
    if (expr.type === "nonterminal") {
      visit(expr.value, stack);
    } else if (expr.value instanceof Array) {
      for (const child of expr.value) {
        if (child.type === "nonterminal") {
          visit(child.value, stack);
        }
      }
    }
    visited.add(node);
    stack.delete(node);
    order.unshift(ast.get(node));
  }
  for (const [name] of ast) {
    visit(name, /* @__PURE__ */ new Set());
  }
  const newAST = /* @__PURE__ */ new Map();
  for (const rule of order) {
    newAST.set(rule.name.value, rule);
  }
  return newAST;
}
var findCommonPrefix = (e1, e2) => {
  if (!e1?.type || !e2?.type || e1.type !== e2.type) {
    return void 0;
  }
  switch (e1.type) {
    case "literal":
    case "nonterminal": {
      if (e1.value !== e2.value) {
        return void 0;
      } else {
        return [
          e1,
          { type: "epsilon" },
          { type: "epsilon" }
        ];
      }
    }
    case "group":
    case "optional":
    case "optionalWhitespace":
    case "many":
    case "many1": {
      const common = findCommonPrefix(
        e1.value,
        e2.value
      );
      if (!common) {
        return void 0;
      } else {
        return [
          { type: e1.type, value: common[0] },
          { type: e1.type, value: common[1] },
          { type: e1.type, value: common[2] }
        ];
      }
    }
    case "concatenation": {
      const e1Vals = e1.value;
      const e2Vals = e2.value;
      const commons = e1Vals.map(
        (_, i) => findCommonPrefix(e1Vals[i], e2Vals[i])
      );
      if (commons.some((x) => x === void 0)) {
        return void 0;
      }
      const prefixes = commons.map((x) => x[0]);
      const e1s = commons.map((x) => x[1]);
      const e2s = commons.map((x) => x[2]);
      const startIx = prefixes.lastIndexOf(null);
      if (startIx === prefixes.length - 1) {
        return void 0;
      }
      const prefix = prefixes.slice(startIx + 1);
      return [
        {
          type: "concatenation",
          value: prefix
        },
        {
          type: "concatenation",
          value: e1s
        },
        {
          type: "concatenation",
          value: e2s
        }
      ];
    }
    case "alternation": {
      const e1Alts = e1.value;
      const e2Alts = e2.value;
      for (const e of e1Alts) {
        const common = findCommonPrefix(e, e2);
        if (common) {
          return common;
        }
      }
      for (const e of e2Alts) {
        const common = findCommonPrefix(e1, e);
        if (common) {
          return common;
        }
      }
      return void 0;
    }
  }
  return void 0;
};
var comparePrefix = (prefix, expr) => {
  if (prefix.type !== expr.type) {
    return false;
  }
  switch (prefix.type) {
    case "literal":
    case "nonterminal":
      return prefix.value === expr.value;
    case "group":
    case "optional":
    case "many":
    case "many1":
      return comparePrefix(
        prefix.value,
        expr.value
      );
    case "minus":
    case "skip":
    case "next":
      return comparePrefix(
        prefix.value[0],
        expr.value[0]
      ) && comparePrefix(
        prefix.value[1],
        expr.value[1]
      );
    case "concatenation":
      return prefix.value.every(
        (e, i) => comparePrefix(e, expr.value[i])
      );
    case "alternation":
      return prefix.value.some(
        (e, i) => comparePrefix(e, expr.value[i])
      );
    case "epsilon":
      return true;
    default:
      return false;
  }
};
function rewriteTreeLeftRecursion(name, expr) {
  const prefixMap = /* @__PURE__ */ new Map();
  let commonPrefix = null;
  const exprVals = expr.value;
  for (let i = 0; i < exprVals.length - 1; i++) {
    const e1 = exprVals[i];
    const e2 = exprVals[i + 1];
    const common = findCommonPrefix(e1, e2);
    if (common) {
      const [prefix, te1, te2] = common;
      if (commonPrefix !== null && prefix !== null && comparePrefix(prefix, commonPrefix)) {
        prefixMap.get(commonPrefix).push(te2);
      } else if (prefix !== null) {
        prefixMap.set(prefix, [te1, te2]);
        commonPrefix = prefix;
      }
      if (i === exprVals.length - 2) {
        exprVals.shift();
      }
      exprVals.shift();
      i -= 1;
    }
  }
  for (const [prefix, expressions] of prefixMap) {
    const alternation = {
      type: "alternation",
      value: expressions
    };
    const newExpr = {
      type: "concatenation",
      value: [
        {
          type: "group",
          value: alternation
        },
        {
          type: "group",
          value: prefix
        }
      ]
    };
    exprVals.push(newExpr);
  }
}
var removeDirectLeftRecursionProduction = (name, expr, tailName) => {
  const head = [];
  const tail = [];
  const APrime = {
    type: "nonterminal",
    value: tailName
  };
  const exprVals = expr.value;
  for (let i = 0; i < exprVals.length; i++) {
    const e = exprVals[i];
    if (e.type === "concatenation" && e.value[0].value === name) {
      tail.push({
        type: "concatenation",
        value: [...e.value.slice(1), APrime]
      });
    } else {
      head.push({
        type: "concatenation",
        value: [e, APrime]
      });
    }
  }
  if (tail.length === 0) {
    return [void 0, void 0];
  }
  tail.push({
    type: "epsilon"
  });
  return [
    {
      type: "alternation",
      value: head
    },
    {
      type: "alternation",
      value: tail
    }
  ];
};
function removeDirectLeftRecursion(ast) {
  const newNodes = /* @__PURE__ */ new Map();
  let uniqueIndex = 0;
  for (const [name, productionRule] of ast) {
    const { expression } = productionRule;
    if (expression.type === "alternation") {
      const tailName = `${name}_${uniqueIndex++}`;
      const [head, tail] = removeDirectLeftRecursionProduction(
        name,
        expression,
        tailName
      );
      if (head && tail) {
        newNodes.set(tailName, {
          name: {
            type: "nonterminal",
            value: tailName
          },
          expression: tail
        });
        newNodes.set(name, {
          name: productionRule.name,
          expression: head,
          comment: productionRule.comment
        });
      }
    }
  }
  if (newNodes.size === 0) {
    return ast;
  }
  for (const [name, productionRule] of newNodes) {
    ast.set(name, productionRule);
  }
  for (const [name, productionRule] of ast) {
    const { expression } = productionRule;
    if (expression.type === "alternation") {
      rewriteTreeLeftRecursion(name, expression);
    }
  }
}
function removeIndirectLeftRecursion(ast, analysis) {
  const indirectCyclicSCCs = analysis.sccs.filter((scc) => scc.length > 1);
  if (indirectCyclicSCCs.length === 0) return ast;
  for (const scc of indirectCyclicSCCs) {
    for (let i = 0; i < scc.length; i++) {
      const nameI = scc[i];
      const ruleI = ast.get(nameI);
      if (!ruleI) continue;
      for (let j = 0; j < i; j++) {
        const nameJ = scc[j];
        const ruleJ = ast.get(nameJ);
        if (!ruleJ) continue;
        const substituted = substituteLeadingNonterminal(
          ruleI.expression,
          nameJ,
          ruleJ.expression
        );
        if (substituted) {
          ruleI.expression = substituted;
        }
      }
    }
  }
  return ast;
}
function substituteLeadingNonterminal(expr, targetName, targetExpr) {
  if (expr.type === "alternation") {
    const branches = expr.value;
    let anyChanged = false;
    const newBranches = [];
    for (const branch of branches) {
      const sub = substituteLeadingNonterminal(branch, targetName, targetExpr);
      if (sub) {
        if (sub.type === "alternation") {
          newBranches.push(...sub.value);
        } else {
          newBranches.push(sub);
        }
        anyChanged = true;
      } else {
        newBranches.push(branch);
      }
    }
    return anyChanged ? { type: "alternation", value: newBranches } : null;
  }
  if (expr.type === "concatenation") {
    const elems = expr.value;
    if (elems.length === 0) return null;
    const first = elems[0];
    if (first.type === "nonterminal" && first.value === targetName) {
      const rest = elems.slice(1);
      if (targetExpr.type === "alternation") {
        const targetAlts = targetExpr.value;
        const newBranches = targetAlts.map((alt) => ({
          type: "concatenation",
          value: [alt, ...rest]
        }));
        return {
          type: "alternation",
          value: newBranches
        };
      } else {
        return {
          type: "concatenation",
          value: [targetExpr, ...rest]
        };
      }
    }
    return null;
  }
  if (expr.type === "nonterminal" && expr.value === targetName) {
    return targetExpr;
  }
  return null;
}
function removeAllLeftRecursion(ast, analysis) {
  const newAST = topologicalSort(ast);
  if (analysis) {
    const hasIndirectCycles = analysis.sccs.some((scc) => scc.length > 1);
    if (hasIndirectCycles) {
      removeIndirectLeftRecursion(newAST, analysis);
    }
  }
  removeDirectLeftRecursion(newAST);
  return newAST;
}
function collectDependencies(expr, deps) {
  if (!expr?.type) return;
  if (expr.type === "nonterminal") {
    deps.add(expr.value);
    return;
  }
  if (expr.value instanceof Array) {
    for (const child of expr.value) {
      collectDependencies(child, deps);
    }
  } else if (expr.value && typeof expr.value === "object" && "type" in expr.value) {
    collectDependencies(expr.value, deps);
  }
}
function buildDepGraphs(ast) {
  const depGraph = /* @__PURE__ */ new Map();
  const rdepGraph = /* @__PURE__ */ new Map();
  for (const [name] of ast) {
    depGraph.set(name, /* @__PURE__ */ new Set());
    rdepGraph.set(name, /* @__PURE__ */ new Set());
  }
  for (const [name, rule] of ast) {
    const deps = /* @__PURE__ */ new Set();
    collectDependencies(rule.expression, deps);
    depGraph.set(name, deps);
    for (const dep of deps) {
      if (!rdepGraph.has(dep)) rdepGraph.set(dep, /* @__PURE__ */ new Set());
      rdepGraph.get(dep).add(name);
    }
  }
  return { depGraph, rdepGraph };
}
function traverseAST(ast, callback) {
  const recurse = (node, parentNode) => {
    if (!node?.type) return;
    node = callback(node, parentNode) ?? node;
    parentNode = node;
    if (node?.value instanceof Array) {
      for (let i = node.value.length - 1; i >= 0; i--) {
        recurse(node.value[i], parentNode);
      }
    } else if (node?.value && typeof node.value === "object") {
      recurse(node.value, parentNode);
    }
  };
  for (const [, productionRule] of ast.entries()) {
    recurse(productionRule.expression);
  }
}
function dedupGroups(ast) {
  traverseAST(ast, (node, parentNode) => {
    const parentType = parentNode?.type;
    if (parentType === "group" && parentNode && (node.type === "group" || node.type === "nonterminal")) {
      parentNode.value = node.value;
      parentNode.range = node.range;
      parentNode.type = node.type;
      parentNode.comment = {
        left: [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...parentNode.comment?.left ?? [],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...node.comment?.left ?? []
        ],
        right: [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...parentNode.comment?.right ?? [],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...node.comment?.right ?? []
        ]
      };
      return node.value;
    }
    return void 0;
  });
}
function tarjanSCC(depGraph) {
  let index = 0;
  const stack = [];
  const onStack = /* @__PURE__ */ new Set();
  const indices = /* @__PURE__ */ new Map();
  const lowlinks = /* @__PURE__ */ new Map();
  const sccs = [];
  function strongconnect(v) {
    indices.set(v, index);
    lowlinks.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);
    for (const w of depGraph.get(v) ?? []) {
      if (!depGraph.has(w)) continue;
      if (!indices.has(w)) {
        strongconnect(w);
        lowlinks.set(
          v,
          Math.min(lowlinks.get(v), lowlinks.get(w))
        );
      } else if (onStack.has(w)) {
        lowlinks.set(
          v,
          Math.min(lowlinks.get(v), indices.get(w))
        );
      }
    }
    if (lowlinks.get(v) === indices.get(v)) {
      const scc = [];
      let w;
      do {
        w = stack.pop();
        onStack.delete(w);
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }
  for (const v of depGraph.keys()) {
    if (!indices.has(v)) strongconnect(v);
  }
  const sccIndex = /* @__PURE__ */ new Map();
  const cyclicRules = /* @__PURE__ */ new Set();
  for (let i = 0; i < sccs.length; i++) {
    const scc = sccs[i];
    for (const name of scc) {
      sccIndex.set(name, i);
    }
    if (scc.length > 1) {
      for (const name of scc) cyclicRules.add(name);
    } else {
      const name = scc[0];
      if (depGraph.get(name)?.has(name)) {
        cyclicRules.add(name);
      }
    }
  }
  return { sccs, sccIndex, cyclicRules };
}
function classifyAcyclicDeps(depGraph) {
  const acyclic = /* @__PURE__ */ new Set();
  const nonAcyclic = /* @__PURE__ */ new Set();
  for (const name of depGraph.keys()) {
    const visited = /* @__PURE__ */ new Set();
    if (isAcyclicDfs(name, depGraph, visited)) {
      acyclic.add(name);
    } else {
      nonAcyclic.add(name);
    }
  }
  return { acyclic, nonAcyclic };
}
function isAcyclicDfs(name, depGraph, visited) {
  if (visited.has(name)) return false;
  visited.add(name);
  const deps = depGraph.get(name);
  if (deps) {
    for (const dep of deps) {
      if (!depGraph.has(dep)) continue;
      if (!isAcyclicDfs(dep, depGraph, visited)) return false;
    }
  }
  return true;
}
function computeRefCounts(ast) {
  const counts = /* @__PURE__ */ new Map();
  for (const [name] of ast) counts.set(name, 0);
  for (const [, rule] of ast) {
    const deps = /* @__PURE__ */ new Set();
    collectDependencies(rule.expression, deps);
    for (const dep of deps) {
      counts.set(dep, (counts.get(dep) ?? 0) + 1);
    }
  }
  return counts;
}
function findAliases(ast, cyclicRules) {
  const aliases = /* @__PURE__ */ new Map();
  for (const [name, rule] of ast) {
    if (cyclicRules.has(name)) continue;
    let expr = rule.expression;
    while (expr.type === "group") expr = expr.value;
    if (expr.type === "nonterminal") {
      const target = expr.value;
      if (ast.has(target)) {
        aliases.set(name, target);
      }
    }
  }
  return aliases;
}
function findTransparentAlternations(ast, cyclicRules) {
  const transparent = /* @__PURE__ */ new Set();
  for (const [name, rule] of ast) {
    if (!cyclicRules.has(name)) continue;
    const expr = rule.expression;
    if (expr.type !== "alternation") continue;
    const branches = expr.value;
    if (branches.every((b) => b.type === "nonterminal")) {
      transparent.add(name);
    }
  }
  return transparent;
}
var CharSet = class _CharSet {
  bits;
  constructor() {
    this.bits = new Uint32Array(4);
  }
  add(code) {
    if (code >= 0 && code < 128) {
      this.bits[code >> 5] |= 1 << (code & 31);
    }
  }
  has(code) {
    if (code < 0 || code >= 128) return false;
    return (this.bits[code >> 5] & 1 << (code & 31)) !== 0;
  }
  addRange(from, to) {
    for (let i = from; i <= to && i < 128; i++) {
      this.add(i);
    }
  }
  union(other) {
    this.bits[0] |= other.bits[0];
    this.bits[1] |= other.bits[1];
    this.bits[2] |= other.bits[2];
    this.bits[3] |= other.bits[3];
  }
  isDisjoint(other) {
    return (this.bits[0] & other.bits[0]) === 0 && (this.bits[1] & other.bits[1]) === 0 && (this.bits[2] & other.bits[2]) === 0 && (this.bits[3] & other.bits[3]) === 0;
  }
  isEmpty() {
    return this.bits[0] === 0 && this.bits[1] === 0 && this.bits[2] === 0 && this.bits[3] === 0;
  }
  /**
   * Returns a new CharSet containing only characters present in both sets.
   */
  intersection(other) {
    const result = new _CharSet();
    result.bits[0] = this.bits[0] & other.bits[0];
    result.bits[1] = this.bits[1] & other.bits[1];
    result.bits[2] = this.bits[2] & other.bits[2];
    result.bits[3] = this.bits[3] & other.bits[3];
    return result;
  }
  /**
   * Number of characters in the set (popcount).
   */
  len() {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      let w = this.bits[i];
      while (w) {
        w &= w - 1;
        count++;
      }
    }
    return count;
  }
  /**
   * Iterate over all character codes present in the set.
   */
  *[Symbol.iterator]() {
    for (let code = 0; code < 128; code++) {
      if (this.has(code)) yield code;
    }
  }
  clone() {
    const c = new _CharSet();
    c.bits.set(this.bits);
    return c;
  }
};
function regexFirstChars(re) {
  const src = re.source;
  if (!src) return null;
  const result = new CharSet();
  const branches = splitTopLevelAlternation(src);
  for (const branch of branches) {
    const branchChars = extractBranchFirstChars(branch);
    if (!branchChars) return null;
    result.union(branchChars);
  }
  return result.isEmpty() ? null : result;
}
function splitTopLevelAlternation(src) {
  const branches = [];
  let depth = 0;
  let inBracket = false;
  let start = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "\\" && i + 1 < src.length) {
      i++;
      continue;
    }
    if (inBracket) {
      if (ch === "]") inBracket = false;
      continue;
    }
    if (ch === "[") {
      inBracket = true;
    } else if (ch === "(") {
      depth++;
    } else if (ch === ")") {
      depth--;
    } else if (ch === "|" && depth === 0) {
      branches.push(src.slice(start, i));
      start = i + 1;
    }
  }
  branches.push(src.slice(start));
  return branches;
}
function extractBranchFirstChars(branch) {
  const result = new CharSet();
  let i = 0;
  while (i < branch.length) {
    const atomResult = extractAtomFirstChars(branch, i);
    if (!atomResult) return null;
    const { chars, end } = atomResult;
    result.union(chars);
    if (end < branch.length) {
      const qch = branch[end];
      if (qch === "?" || qch === "*") {
        i = end + 1;
        if (i < branch.length && branch[i] === "?") i++;
        continue;
      }
    }
    break;
  }
  return result;
}
function extractAtomFirstChars(src, i) {
  if (i >= src.length) return null;
  const ch = src[i];
  if (ch === "^" || ch === "$") {
    return extractAtomFirstChars(src, i + 1);
  }
  if (ch === "[") {
    const end = findClosingBracket(src, i);
    if (end < 0) return null;
    const chars2 = parseCharClass(src.slice(i + 1, end));
    if (!chars2) return null;
    return { chars: chars2, end: end + 1 };
  }
  if (ch === "(") {
    const end = findClosingParen(src, i);
    if (end < 0) return null;
    let inner = src.slice(i + 1, end);
    if (inner.startsWith("?:")) inner = inner.slice(2);
    else if (inner.startsWith("?=") || inner.startsWith("?!")) {
      return { chars: new CharSet(), end: end + 1 };
    }
    const chars2 = regexFirstCharsFromSource(inner);
    if (!chars2) return null;
    return { chars: chars2, end: end + 1 };
  }
  if (ch === "\\") {
    if (i + 1 >= src.length) return null;
    const next = src[i + 1];
    const chars2 = new CharSet();
    if (next === "d") {
      chars2.addRange(48, 57);
    } else if (next === "w") {
      chars2.addRange(48, 57);
      chars2.addRange(65, 90);
      chars2.addRange(97, 122);
      chars2.add(95);
    } else if (next === "s") {
      chars2.add(9);
      chars2.add(10);
      chars2.add(13);
      chars2.add(32);
    } else if (next === "D" || next === "W" || next === "S") {
      return null;
    } else {
      chars2.add(next.charCodeAt(0));
    }
    return { chars: chars2, end: i + 2 };
  }
  if (ch === ".") return null;
  const chars = new CharSet();
  chars.add(ch.charCodeAt(0));
  return { chars, end: i + 1 };
}
function regexFirstCharsFromSource(src) {
  const branches = splitTopLevelAlternation(src);
  const result = new CharSet();
  for (const branch of branches) {
    const chars = extractBranchFirstChars(branch);
    if (!chars) return null;
    result.union(chars);
  }
  return result;
}
function findClosingBracket(src, start) {
  for (let i = start + 1; i < src.length; i++) {
    if (src[i] === "\\" && i + 1 < src.length) {
      i++;
      continue;
    }
    if (src[i] === "]") return i;
  }
  return -1;
}
function findClosingParen(src, start) {
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "\\" && i + 1 < src.length) {
      i++;
      continue;
    }
    if (src[i] === "(") depth++;
    else if (src[i] === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}
function parseCharClass(inner) {
  const negated = inner.startsWith("^");
  if (negated) inner = inner.slice(1);
  const chars = new CharSet();
  let i = 0;
  while (i < inner.length) {
    let code;
    if (inner[i] === "\\" && i + 1 < inner.length) {
      const next = inner[i + 1];
      if (next === "d") {
        chars.addRange(48, 57);
        i += 2;
        continue;
      } else if (next === "w") {
        chars.addRange(48, 57);
        chars.addRange(65, 90);
        chars.addRange(97, 122);
        chars.add(95);
        i += 2;
        continue;
      } else if (next === "s") {
        chars.add(9);
        chars.add(10);
        chars.add(13);
        chars.add(32);
        i += 2;
        continue;
      }
      const escapeMap = {
        n: 10,
        r: 13,
        t: 9,
        f: 12,
        v: 11,
        "0": 0
      };
      code = escapeMap[next] ?? next.charCodeAt(0);
      i += 2;
    } else {
      code = inner.charCodeAt(i);
      i++;
    }
    if (i < inner.length - 1 && inner[i] === "-" && inner[i + 1] !== "]") {
      let endCode;
      if (inner[i + 1] === "\\" && i + 2 < inner.length) {
        endCode = inner.charCodeAt(i + 2);
        i += 3;
      } else {
        endCode = inner.charCodeAt(i + 1);
        i += 2;
      }
      chars.addRange(code, endCode);
    } else {
      chars.add(code);
    }
  }
  if (negated) {
    const inverted = new CharSet();
    for (let c = 0; c < 128; c++) {
      if (!chars.has(c)) inverted.add(c);
    }
    return inverted;
  }
  return chars;
}
function computeFirstSets(ast, analysis) {
  const firstSets = /* @__PURE__ */ new Map();
  const nullable = /* @__PURE__ */ new Map();
  for (const [name] of ast) {
    firstSets.set(name, new CharSet());
    nullable.set(name, false);
  }
  let changed = true;
  let iterations = 0;
  const maxIterations = ast.size * 3;
  while (changed && iterations++ < maxIterations) {
    changed = false;
    for (const [name, rule] of ast) {
      const oldFirst = firstSets.get(name).clone();
      const oldNullable = nullable.get(name);
      const exprFirst = exprFirstSet(rule.expression, firstSets, nullable);
      const exprNullable = exprIsNullable(rule.expression, nullable);
      firstSets.get(name).union(exprFirst);
      if (exprNullable && !oldNullable) {
        nullable.set(name, true);
        changed = true;
      }
      const newFirst = firstSets.get(name);
      for (let w = 0; w < 4; w++) {
        if (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          oldFirst.bits[w] !== newFirst.bits[w]
        ) {
          changed = true;
          break;
        }
      }
    }
  }
  return { firstSets, nullable };
}
function exprFirstSet(expr, firstSets, nullable, ast) {
  if (!expr?.type) return new CharSet();
  switch (expr.type) {
    case "literal": {
      const s = expr.value;
      const cs = new CharSet();
      if (s.length > 0) cs.add(s.charCodeAt(0));
      return cs;
    }
    case "regex": {
      const cs = regexFirstChars(expr.value);
      return cs ?? new CharSet();
    }
    case "nonterminal": {
      const name = expr.value;
      return firstSets.get(name)?.clone() ?? new CharSet();
    }
    case "epsilon":
      return new CharSet();
    case "group":
      return exprFirstSet(
        expr.value,
        firstSets,
        nullable
      );
    case "optionalWhitespace":
      return exprFirstSet(
        expr.value,
        firstSets,
        nullable
      );
    case "optional":
    case "many":
      return exprFirstSet(
        expr.value,
        firstSets,
        nullable
      );
    case "many1":
      return exprFirstSet(
        expr.value,
        firstSets,
        nullable
      );
    case "skip":
    case "next": {
      const [a, b] = expr.value;
      const cs = exprFirstSet(a, firstSets, nullable);
      if (exprIsNullable(a, nullable)) {
        cs.union(exprFirstSet(b, firstSets, nullable));
      }
      return cs;
    }
    case "minus": {
      const [a] = expr.value;
      return exprFirstSet(a, firstSets, nullable);
    }
    case "concatenation": {
      const elems = expr.value;
      const cs = new CharSet();
      for (const elem of elems) {
        cs.union(exprFirstSet(elem, firstSets, nullable));
        if (!exprIsNullable(elem, nullable)) break;
      }
      return cs;
    }
    case "alternation": {
      const alts = expr.value;
      const cs = new CharSet();
      for (const alt of alts) {
        cs.union(exprFirstSet(alt, firstSets, nullable));
      }
      return cs;
    }
  }
  return new CharSet();
}
function exprIsNullable(expr, nullable, ast) {
  if (!expr?.type) return false;
  switch (expr.type) {
    case "literal":
      return expr.value.length === 0;
    case "regex":
      return false;
    case "nonterminal":
      return nullable.get(expr.value) ?? false;
    case "epsilon":
      return true;
    case "group":
    case "optionalWhitespace":
      return exprIsNullable(expr.value, nullable);
    case "optional":
    case "many":
      return true;
    case "many1":
      return exprIsNullable(expr.value, nullable);
    case "skip":
    case "next": {
      const [a, b] = expr.value;
      return exprIsNullable(a, nullable) && exprIsNullable(b, nullable);
    }
    case "minus":
      return false;
    case "concatenation": {
      return expr.value.every(
        (e) => exprIsNullable(e, nullable)
      );
    }
    case "alternation": {
      return expr.value.some(
        (e) => exprIsNullable(e, nullable)
      );
    }
  }
  return false;
}
function buildDispatchTable(alternatives, firstSets, nullable) {
  const altFirstSets = [];
  for (const alt of alternatives) {
    if (exprIsNullable(alt, nullable)) return null;
    const cs = exprFirstSet(alt, firstSets, nullable);
    if (cs.isEmpty()) return null;
    altFirstSets.push(cs);
  }
  for (let i = 0; i < altFirstSets.length; i++) {
    for (let j = i + 1; j < altFirstSets.length; j++) {
      if (!altFirstSets[i].isDisjoint(altFirstSets[j])) {
        return null;
      }
    }
  }
  const table = new Int8Array(128).fill(-1);
  for (let i = 0; i < altFirstSets.length; i++) {
    for (let ch = 0; ch < 128; ch++) {
      if (altFirstSets[i].has(ch)) {
        table[ch] = i;
      }
    }
  }
  return { table, isPerfect: true };
}
function buildPartialDispatchTable(alternatives, firstSets, nullable) {
  const n = alternatives.length;
  if (n < 3) return null;
  const altFirstSets = [];
  const fallbackIndices = [];
  const dispatchableIndices = [];
  for (let i = 0; i < n; i++) {
    if (exprIsNullable(alternatives[i], nullable)) {
      altFirstSets.push(null);
      fallbackIndices.push(i);
    } else {
      const cs = exprFirstSet(alternatives[i], firstSets, nullable);
      if (cs.isEmpty()) {
        altFirstSets.push(null);
        fallbackIndices.push(i);
      } else {
        altFirstSets.push(cs);
        dispatchableIndices.push(i);
      }
    }
  }
  if (dispatchableIndices.length < 2) return null;
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;
  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  function merge(a, b) {
    parent[find(a)] = find(b);
  }
  for (let ch = 0; ch < 128; ch++) {
    let first = -1;
    for (const i of dispatchableIndices) {
      if (altFirstSets[i].has(ch)) {
        if (first >= 0) merge(first, i);
        else first = i;
      }
    }
  }
  const groupMap = /* @__PURE__ */ new Map();
  for (const i of dispatchableIndices) {
    const root = find(i);
    if (!groupMap.has(root)) groupMap.set(root, []);
    groupMap.get(root).push(i);
  }
  const groups = [...groupMap.values()];
  if (groups.length <= 1) return null;
  const altToGroup = new Int8Array(n).fill(-1);
  for (let g = 0; g < groups.length; g++) {
    for (const i of groups[g]) {
      altToGroup[i] = g;
    }
  }
  const table = new Int8Array(128).fill(-1);
  for (let ch = 0; ch < 128; ch++) {
    for (const i of dispatchableIndices) {
      if (altFirstSets[i].has(ch)) {
        table[ch] = altToGroup[i];
        break;
      }
    }
  }
  return { table, groups, fallbackIndices };
}
function analyzeGrammar(ast) {
  const { depGraph, rdepGraph } = buildDepGraphs(ast);
  const { sccs, sccIndex, cyclicRules } = tarjanSCC(depGraph);
  const topoOrder = [];
  for (const scc of sccs) {
    for (const name of scc) {
      topoOrder.push(name);
    }
  }
  const refCounts = computeRefCounts(ast);
  const aliases = findAliases(ast, cyclicRules);
  const transparentAlternations = findTransparentAlternations(ast, cyclicRules);
  const { acyclic: acyclicRules, nonAcyclic: nonAcyclicRules } = classifyAcyclicDeps(depGraph);
  return {
    depGraph,
    rdepGraph,
    sccs,
    sccIndex,
    cyclicRules,
    topoOrder,
    refCounts,
    aliases,
    transparentAlternations,
    acyclicRules,
    nonAcyclicRules
  };
}
function BBNFToAST(input) {
  const parser = new BBNFGrammar().grammar().eof();
  const parsed = parser.parse(input);
  if (!parsed) {
    return [parser];
  }
  const ast = parsed.reduce(
    (acc, productionRule) => {
      return acc.set(productionRule.name.value, productionRule);
    },
    /* @__PURE__ */ new Map()
  );
  return [parser, ast];
}
function BBNFToASTWithImports(input) {
  const parser = new BBNFGrammar().grammarWithImports().eof();
  const parsed = parser.parse(input);
  if (!parsed) {
    return [parser];
  }
  const grammar2 = parsed;
  return [parser, { imports: grammar2.imports, recovers: grammar2.recovers ?? [], no_collapses: grammar2.no_collapses ?? [], pretties: grammar2.pretties ?? [], rules: grammar2.rules }];
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function findSccEntryPoints(cache) {
  const { depGraph, sccIndex, cyclicRules, sccs } = cache;
  const entryPoints = /* @__PURE__ */ new Set();
  for (const [src, deps] of depGraph) {
    const srcScc = sccIndex.get(src);
    for (const dep of deps) {
      if (!cyclicRules.has(dep)) continue;
      const depScc = sccIndex.get(dep);
      if (srcScc !== depScc) {
        entryPoints.add(dep);
      }
    }
  }
  for (const scc of sccs) {
    if (scc.length <= 1) {
      const name = scc[0];
      if (cyclicRules.has(name) && !entryPoints.has(name)) {
        entryPoints.add(name);
      }
      continue;
    }
    const hasEntry = scc.some((name) => entryPoints.has(name));
    if (!hasEntry) {
      entryPoints.add(scc[0]);
    }
  }
  return entryPoints;
}
function ASTToParser(ast, analysis, firstNullable, recovers, tagAlternations = false, enableMemoization = false) {
  const cache = analysis ?? analyzeGrammar(ast);
  const { cyclicRules, topoOrder } = cache;
  const fnData = firstNullable ?? computeFirstSets(ast);
  const nonterminals = {};
  function resolveToTerminal(expr) {
    if (!expr?.type) return null;
    if (expr.type === "literal" || expr.type === "regex") return expr;
    if (expr.type === "group") return resolveToTerminal(expr.value);
    if (expr.type === "nonterminal") {
      const rule = ast.get(expr.value);
      if (rule && !cyclicRules.has(expr.value)) {
        return resolveToTerminal(rule.expression);
      }
    }
    return null;
  }
  function tryWrapRegexCoalesce(expr) {
    let leftStr = null;
    let rightStr = null;
    let innerExpr = null;
    let quantifier = null;
    if (expr.type === "next") {
      const [left, right] = expr.value;
      const resolvedLeft = resolveToTerminal(left);
      if (resolvedLeft?.type === "literal" && right.type === "skip") {
        const [middle, end] = right.value;
        const resolvedEnd = resolveToTerminal(end);
        if (resolvedEnd?.type === "literal") {
          leftStr = resolvedLeft.value;
          rightStr = resolvedEnd.value;
          if (middle.type === "many") {
            innerExpr = middle.value;
            quantifier = "*";
          } else if (middle.type === "many1") {
            innerExpr = middle.value;
            quantifier = "+";
          }
        }
      }
    }
    if (expr.type === "skip" && !leftStr) {
      const [left, right] = expr.value;
      const resolvedRight = resolveToTerminal(right);
      if (resolvedRight?.type === "literal" && left.type === "next") {
        const [start, middle] = left.value;
        const resolvedStart = resolveToTerminal(start);
        if (resolvedStart?.type === "literal") {
          leftStr = resolvedStart.value;
          rightStr = resolvedRight.value;
          if (middle.type === "many") {
            innerExpr = middle.value;
            quantifier = "*";
          } else if (middle.type === "many1") {
            innerExpr = middle.value;
            quantifier = "+";
          }
        }
      }
    }
    if (!leftStr || !rightStr || !innerExpr || !quantifier) return null;
    const resolved = resolveToTerminal(innerExpr);
    if (!resolved || resolved.type !== "regex") return null;
    const re = resolved.value;
    const escapedLeft = escapeRegex(leftStr);
    const escapedRight = escapeRegex(rightStr);
    const combinedSource = `${escapedLeft}(${re.source})${quantifier}${escapedRight}`;
    try {
      return regex(new RegExp(combinedSource));
    } catch {
      return null;
    }
  }
  function trySepByDetect(name, expr) {
    if (expr.type !== "many" && expr.type !== "many1") return null;
    const inner = expr.value;
    let unwrapped = inner;
    if (unwrapped.type === "group") unwrapped = unwrapped.value;
    if (unwrapped.type !== "skip") return null;
    const [item, sepOpt] = unwrapped.value;
    if (sepOpt.type !== "optional") return null;
    const sep = sepOpt.value;
    const itemParser = generateParser(name, item);
    const sepParser = generateParser(name, sep);
    if (expr.type === "many") {
      return itemParser.sepBy(sepParser);
    } else {
      return itemParser.sepBy(sepParser, 1);
    }
  }
  function tryWrapDetect(name, expr) {
    if (expr.type === "group") {
      return tryWrapDetect(name, expr.value);
    }
    if (expr.type === "skip") {
      const [left, right] = expr.value;
      let unwrappedLeft = left;
      while (unwrappedLeft.type === "group") unwrappedLeft = unwrappedLeft.value;
      if (unwrappedLeft.type === "next") {
        const [l, m] = unwrappedLeft.value;
        return generateParser(name, m).wrap(
          generateParser(name, l),
          generateParser(name, right)
        );
      }
    }
    return null;
  }
  function tryAllLiteralsAlternation(name, alts) {
    if (alts.length < 2) return null;
    if (!alts.every((a) => {
      const resolved = resolveToTerminal(a);
      return resolved?.type === "literal";
    })) return null;
    const table = {};
    for (const alt of alts) {
      const resolved = resolveToTerminal(alt);
      const lit = resolved.value;
      if (lit.length === 0) {
        return null;
      }
      const firstChar = lit[0];
      if (table[firstChar]) {
        return null;
      }
      table[firstChar] = string(lit);
    }
    return dispatch(table);
  }
  function generateParser(name, expr, discarded = false) {
    const wrapResult = tryWrapRegexCoalesce(expr);
    if (wrapResult) return wrapResult;
    const wrapDetectResult = tryWrapDetect(name, expr);
    if (wrapDetectResult) return wrapDetectResult;
    const sepByResult = trySepByDetect(name, expr);
    if (sepByResult) return sepByResult;
    switch (expr.type) {
      case "literal":
        return string(expr.value);
      case "nonterminal": {
        const refName = expr.value;
        const l = Parser.lazy(() => nonterminals[refName]);
        l.context.name = refName;
        return l;
      }
      case "epsilon":
        return eof().opt();
      case "group":
        return generateParser(name, expr.value, discarded);
      case "regex":
        return discarded ? regexSpan(expr.value) : regex(expr.value);
      case "optionalWhitespace":
        return generateParser(name, expr.value, discarded).trim();
      case "optional":
        return generateParser(name, expr.value).opt();
      case "many":
        return generateParser(name, expr.value).many();
      case "many1":
        return generateParser(name, expr.value).many(1);
      case "skip":
        return generateParser(
          name,
          expr.value[0]
        ).skip(
          generateParser(
            name,
            expr.value[1],
            true
            // right side of skip is discarded
          )
        );
      case "next":
        return generateParser(
          name,
          expr.value[0],
          true
          // left side of next is discarded
        ).next(
          generateParser(
            name,
            expr.value[1]
          )
        );
      case "minus":
        return generateParser(
          name,
          expr.value[0]
        ).minus(
          generateParser(
            name,
            expr.value[1]
          )
        );
      case "concatenation": {
        const parsers = expr.value.map(
          (x) => generateParser(name, x)
        );
        if (parsers.at(-1)?.context?.name === "eof") {
          parsers.pop();
        }
        if (parsers.length === 2) {
          const [p1, p2] = parsers;
          const all2 = (state) => {
            const savedOffset = state.offset;
            p1.parser(state);
            if (state.isError) {
              state.offset = savedOffset;
              return state;
            }
            const v1 = state.value;
            p2.parser(state);
            if (state.isError) {
              state.offset = savedOffset;
              state.isError = true;
              return state;
            }
            const v2 = state.value;
            if (v1 !== void 0) {
              return v2 !== void 0 ? state.ok([v1, v2]) : state.ok([v1]);
            }
            return v2 !== void 0 ? state.ok([v2]) : state.ok([]);
          };
          return new Parser(
            all2,
            createParserContext("all", void 0, p1, p2)
          );
        }
        return all(...parsers);
      }
      case "alternation": {
        const alts = expr.value;
        const litDispatch = tryAllLiteralsAlternation(name, alts);
        if (litDispatch) return litDispatch;
        let parsers = alts.map((x) => generateParser(name, x));
        if (tagAlternations) {
          parsers = parsers.map((p, i) => p.map((v) => ({ _branch: i, value: v })));
        }
        if (parsers.length >= 2) {
          const perfectDispatch = buildDispatchTable(
            alts,
            fnData.firstSets,
            fnData.nullable
          );
          if (perfectDispatch?.isPerfect) {
            const tbl = perfectDispatch.table;
            const dispatchParser = (state) => {
              const ch = state.src.charCodeAt(state.offset);
              const idx = ch < 128 ? tbl[ch] : -1;
              if (idx >= 0) {
                return parsers[idx].parser(state);
              }
              mergeErrorState(state);
              return state.err(void 0);
            };
            return new Parser(
              dispatchParser,
              createParserContext("dispatch", void 0, ...parsers)
            );
          }
          const partial = buildPartialDispatchTable(
            alts,
            fnData.firstSets,
            fnData.nullable
          );
          if (partial) {
            const tbl = partial.table;
            const groupParsers = partial.groups.map(
              (indices) => indices.length === 1 ? parsers[indices[0]] : any(...indices.map((i) => parsers[i]))
            );
            const fallbackParser = partial.fallbackIndices.length > 0 ? any(...partial.fallbackIndices.map((i) => parsers[i])) : null;
            const dispatchParser = (state) => {
              const ch = state.src.charCodeAt(state.offset);
              const groupIdx = ch < 128 ? tbl[ch] : -1;
              if (groupIdx >= 0) {
                const result = groupParsers[groupIdx].parser(state);
                if (!state.isError) return result;
                if (fallbackParser) {
                  state.isError = false;
                  return fallbackParser.parser(state);
                }
                return result;
              }
              if (fallbackParser) {
                return fallbackParser.parser(state);
              }
              mergeErrorState(state);
              return state.err(void 0);
            };
            return new Parser(
              dispatchParser,
              createParserContext("dispatch", void 0, ...parsers)
            );
          }
        }
        return any(...parsers);
      }
    }
  }
  const sccEntryPoints = enableMemoization ? findSccEntryPoints(cache) : /* @__PURE__ */ new Set();
  const { refCounts } = cache;
  const SELECTIVE_THRESHOLD = 3;
  for (const name of topoOrder) {
    const rule = ast.get(name);
    if (!rule) continue;
    let parser = generateParser(name, rule.expression);
    if (enableMemoization) {
      if (sccEntryPoints.has(name)) {
        parser = parser.memoize();
      } else if (!cyclicRules.has(name) && (refCounts.get(name) ?? 0) > SELECTIVE_THRESHOLD) {
        parser = parser.mergeMemos();
      }
    }
    nonterminals[name] = parser;
  }
  for (const [name, rule] of ast) {
    if (!nonterminals[name]) {
      nonterminals[name] = generateParser(name, rule.expression);
    }
  }
  for (const [name, rule] of ast) {
    if (cyclicRules.has(name)) continue;
    let expr = rule.expression;
    while (expr.type === "group") expr = expr.value;
    if (expr.type === "nonterminal") {
      const target = expr.value;
      if (nonterminals[target]) {
        nonterminals[name] = nonterminals[target];
      }
    }
  }
  if (recovers && recovers.length > 0) {
    for (const recover of recovers) {
      const original = nonterminals[recover.ruleName];
      if (original) {
        const syncParser = generateParser(recover.ruleName + "$sync", recover.syncExpr, true);
        nonterminals[recover.ruleName] = original.recover(syncParser, null);
      }
    }
  }
  return nonterminals;
}
function BBNFToParser(input, optimizeGraph = false, tagAlternations = false) {
  const importResult = BBNFToASTWithImports(input);
  let ast;
  let recovers = [];
  if (importResult.length >= 2 && importResult[1]) {
    ast = importResult[1].rules;
    recovers = importResult[1].recovers ?? [];
  } else {
    const [, plainAst] = BBNFToAST(input);
    if (!plainAst) {
      throw new Error("Failed to parse BBNF grammar");
    }
    ast = plainAst;
  }
  dedupGroups(ast);
  const analysis = analyzeGrammar(ast);
  const finalAst = optimizeGraph ? removeAllLeftRecursion(ast, analysis) : ast;
  const finalAnalysis = finalAst !== ast ? analyzeGrammar(finalAst) : analysis;
  const firstNullable = computeFirstSets(finalAst);
  const nonterminals = ASTToParser(finalAst, finalAnalysis, firstNullable, recovers, tagAlternations, optimizeGraph);
  return [nonterminals, finalAst];
}

// raw:/Users/mkbabb/Programming/value.js/src/css/grammar/tokens.bbnf
var tokens_default = "// SERVED MODEL: claude-opus-5-5\n//\n// value.js's CSS grammar \u2014 the SOURCE OF TRUTH (X.P.W6 \xB7 the owner's ruling 2026-09-23,\n// \"No custom grammar, unless it's BBNF\"). These `.bbnf` modules are compiled at load by the\n// published BBNF toolchain (`@mkbabb/bbnf-lang` `BBNFToParser`) into `@mkbabb/parse-that`\n// parsers; `src/css/bbnf/` attaches the semantic actions (values, never grammar).\n//\n// The modules are concatenated in one order \u2014 tokens \xB7 math \xB7 color \xB7 value \u2014 because\n// bbnf-lang 0.1.4's `@import` loader is unusable in its published build (see `load.ts`).\n//\n// tokens.bbnf \u2014 css-syntax-3 \xA74 tokens, as the value and colour productions read them.\n// Keywords and function names are ASCII case-insensitive (`/\u2026/i`); every keyword carries an\n// ident-boundary lookahead so `nonesuch` is never `none`. Each case-insensitive regex also spells\n// the FIRST letter of every alternative as a class (`/[nN]one/i`): bbnf-lang 0.1.4 builds its\n// alternation dispatch tables from a regex's `source` alone (`regexFirstChars` never reads\n// `flags`), so `/none/i` would be dispatched on `n` only and `NONE` refused before it is tried.\n\n// `?`: parse-that's regex leaf fails at end of input even when the pattern matches empty.\nws       = /\\s*/ ? ;\nws1      = /\\s+/ ;\ncomma    = /\\s*,\\s*/ ;\nslash    = /\\s*\\/\\s*/ ;\nclose    = /\\s*\\)/ ;\n\n// <number> \u2014 a bare number is never the prefix of a dimension or a percentage, and never the\n// integer part of a longer number (`0` of `0.15deg`): css-syntax-3 \xA74.3.12 consumes digits greedily.\nnumber     = /[+-]?(?:\\d*\\.\\d+|\\d+(?!\\.\\d))(?:[eE][+-]?\\d+)?(?![\\w%\\\\])/ ;\npercentage = /[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?%/ ;\ndimension  = /[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?[a-zA-Z_][\\w-]*/ ;\nangle      = /[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?(?:[dD]eg|[gG]rad|[rR]ad|[tT]urn)(?![\\w-])/i ;\n\nnone       = /[nN]one(?![\\w-])/i ;\nident      = /-?[a-zA-Z_][\\w-]*|--[\\w-]*/ ;\ndashedIdent = /--[\\w-]+/ ;\nstring     = /\"(?:\\\\[\\s\\S]|[^\"\\\\])*\"|'(?:\\\\[\\s\\S]|[^'\\\\])*'/ ;\n\n// An opaque balanced run \u2014 the body of `var()`/`env()` fallbacks, whose grammar is the\n// property's own and is checked only at computed-value time (css-variables-1 \xA73).\nbalanced   = ( /[^()\"']+/ | string | \"(\" , balanced , \")\" ) * ;\n";

// raw:/Users/mkbabb/Programming/value.js/src/css/grammar/math.bbnf
var math_default = "// SERVED MODEL: claude-opus-5-5\n//\n// math.bbnf \u2014 css-values-4 \xA710 math functions, as a colour channel, an alpha or a\n// `color-mix()` percentage reads them (css-color-4 admits `calc()` in every channel).\n// `+`/`-` need whitespace on both sides (\xA710.1); `*` and `/` do not. The TYPE of each\n// expression (\xA710.8: number \xB7 percentage \xB7 angle \xB7 length \u2026) is checked when it is\n// resolved (`src/css/bbnf/math.ts`), because it depends on where the expression stands.\n\nmathFn     = calc | minMax | clampFn | signAbs | varFn ;\n\ncalc       = /[cC]alc\\(\\s*/i >> calcSum << close ;\nminMax     = /(?:[mM]in|[mM]ax)(?=\\()/i , /\\(\\s*/ >> calcSum , ( comma >> calcSum ) * << close ;\nclampFn    = /[cC]lamp\\(\\s*/i >> calcSum , comma >> calcSum , comma >> calcSum << close ;\nsignAbs    = /(?:[sS]ign|[aA]bs)(?=\\()/i , /\\(\\s*/ >> calcSum << close ;\n\ncalcSum     = calcProduct , ( calcAddOp , calcProduct ) * ;\ncalcAddOp   = /\\s+[+-]\\s+/ ;\ncalcProduct = calcValue , ( calcMulOp , calcValue ) * ;\ncalcMulOp   = /\\s*[*\\/]\\s*/ ;\ncalcValue   = mathFn | calcGroup | calcConstant | percentage | angle | number | dimension | calcKeyword ;\ncalcGroup   = /\\(\\s*/ >> calcSum << close ;\ncalcConstant = /(?:-?[iI]nfinity|[nN]an|[pP]i|[eE])(?![\\w-])/i ;\n// A bare keyword inside a calculation: a relative colour's channel name (`r`, `alpha`, \u2026).\n// Outside a relative colour it names nothing and the colour is refused as syntax.\ncalcKeyword = /[a-zA-Z][\\w-]*(?![\\w(-])/ ;\n\n// var() \u2014 its value is unknown until computed-value time (css-variables-1 \xA73).\nvarFn      = /(?:[vV]ar|[eE]nv)(?=\\()/i , /\\(\\s*/ >> ( dashedIdent | ident ) , ( comma >> balanced ) ? << close ;\n";

// raw:/Users/mkbabb/Programming/value.js/src/css/grammar/color.bbnf
var color_default = "// SERVED MODEL: claude-opus-5-5\n//\n// color.bbnf \u2014 CSS Color 4 (https://www.w3.org/TR/css-color-4/) and the CSS Color 5\n// functions `color-mix()` and `light-dark()` (https://www.w3.org/TR/css-color-5/).\n// Every numeric component admits a math function (css-color-4 \xA74, `calc()` in channels).\n// Channel scales, clamps and the `none`\u2192missing reading are the semantic layer's\n// (`src/css/bbnf/color.ts`); every syntactic rule of the specification is here.\n\ncolor = colorMix | lightDark | relativeColor | rgbFn | hslFn | hwbFn | labFn | lchFn\n      | oklabFn | oklchFn | colorFn | varFn | hex | colorKeyword ;\n\n// \u2500\u2500 components (css-color-4 \xA74.1) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\ncomponent  = mathFn | percentage | number | none ;\nhueValue   = mathFn | angle | number | none ;\nalphaValue = mathFn | percentage | number | none ;\nalphaTail  = ( slash >> alphaValue ) ? ;\n\n// \u2500\u2500 rgb() / rgba() \u2014 \xA75.1 modern, and <legacy-rgb-syntax> \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// The legacy comma forms admit neither `none` nor a mix of numbers and percentages\n// (KFA-14; css-color-4's changelog: \"Made explicit that legacy forms do not support none\").\nrgbFn        = /[rR]gba?\\(\\s*/i >> ( rgbModern | rgbLegacyPct | rgbLegacyNum ) << close ;\nrgbModern    = component , ws >> component , ws >> component , alphaTail ;\nrgbLegacyPct = legacyPct , comma >> legacyPct , comma >> legacyPct , legacyAlpha ;\nrgbLegacyNum = legacyNum , comma >> legacyNum , comma >> legacyNum , legacyAlpha ;\nlegacyPct    = mathFn | percentage ;\nlegacyNum    = mathFn | number ;\nlegacyHue    = mathFn | angle | number ;\nlegacyAlpha  = ( comma >> ( mathFn | percentage | number ) ) ? ;\n\n// \u2500\u2500 hsl() / hsla() \u2014 \xA77, and <legacy-hsl-syntax> \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nhslFn     = /[hH]sla?\\(\\s*/i >> ( hslModern | hslLegacy ) << close ;\nhslModern = hueValue , ws >> component , ws >> component , alphaTail ;\nhslLegacy = legacyHue , comma >> legacyPct , comma >> legacyPct , legacyAlpha ;\n\n// \u2500\u2500 hwb() \xA78 \xB7 lab()/lch() \xA79.1\u20139.2 \xB7 oklab()/oklch() \xA79.3\u20139.4 \u2014 modern only \u2500\u2500\u2500\u2500\u2500\nhwbFn   = /[hH]wb\\(\\s*/i >> hueValue , ws >> component , ws >> component , alphaTail << close ;\nlabFn   = /[lL]ab\\(\\s*/i >> component , ws >> component , ws >> component , alphaTail << close ;\nlchFn   = /[lL]ch\\(\\s*/i >> component , ws >> component , ws >> hueValue , alphaTail << close ;\noklabFn = /[oO]klab\\(\\s*/i >> component , ws >> component , ws >> component , alphaTail << close ;\noklchFn = /[oO]klch\\(\\s*/i >> component , ws >> component , ws >> hueValue , alphaTail << close ;\n\n// \u2500\u2500 color() \u2014 \xA710, the predefined spaces (display-p3-linear included) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\ncolorFn    = /[cC]olor\\(\\s*/i >> colorSpace , ws1 >> component , ws >> component , ws >> component , alphaTail << close ;\ncolorSpace = /(?:[sS]rgb-linear|[sS]rgb|[dD]isplay-p3-linear|[dD]isplay-p3|[aA]98-rgb|[pP]rophoto-rgb|[rR]ec2020|[xX]yz-d50|[xX]yz-d65|[xX]yz)(?![\\w-])/i ;\n\n// \u2500\u2500 relative colour \u2014 css-color-5 \xA74: `<fn>(from <color> \u2026)` \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// Parsed whole; its value depends on the origin colour's resolution, so the semantic\n// layer answers `color_context_required` (the contract value.js carries for it).\nrelativeColor = relativeHead , ws1 >> color , relativeTail << close ;\nrelativeHead  = /(?:[rR]gba?|[hH]sla?|[hH]wb|[lL]ab|[lL]ch|[oO]klab|[oO]klch)\\(\\s*from(?![\\w-])/i\n              | /[cC]olor\\(\\s*from(?![\\w-])/i ;\nrelativeTail  = ( ws1 >> colorSpace ) ? , ws1 >> relativeComp , ws >> relativeComp , ws >> relativeComp ,\n                ( slash >> relativeComp ) ? ;\nrelativeComp  = mathFn | percentage | angle | number | none | calcKeyword ;\n\n// \u2500\u2500 color-mix() \u2014 css-color-5 \xA73 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// color-mix() = color-mix( <color-interpolation-method>? , [ <color> && <percentage [0,100]>? ]# )\ncolorMix     = /[cC]olor-mix\\(\\s*/i >> ( mixMethod << comma ) ? , mixItem , ( comma >> mixItem ) * << close ;\nmixMethod    = /[iI]n(?![\\w-])/i >> ws1 >> ( mixPolar | mixRect ) ;\nmixPolar     = polarSpace , ( ws1 >> hueMethod ) ? ;\nmixRect      = rectSpace ;\npolarSpace   = /(?:[hH]sl|[hH]wb|[lL]ch|[oO]klch)(?![\\w-])/i ;\nrectSpace    = /(?:[sS]rgb-linear|[sS]rgb|[dD]isplay-p3-linear|[dD]isplay-p3|[aA]98-rgb|[pP]rophoto-rgb|[rR]ec2020|[lL]ab|[oO]klab|[xX]yz-d50|[xX]yz-d65|[xX]yz)(?![\\w-])/i ;\nhueMethod    = /(?:[sS]horter|[lL]onger|[iI]ncreasing|[dD]ecreasing)\\s+hue(?![\\w-])/i ;\nmixItem      = mixLead | mixTrail ;\nmixLead      = mixPercent , ws >> color ;\nmixTrail     = color , ( ws >> mixPercent ) ? ;\nmixPercent   = mathFn | percentage ;\n\n// \u2500\u2500 light-dark() \u2014 css-color-5 \xA72 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nlightDark = /[lL]ight-dark\\(\\s*/i >> color , comma >> color << close ;\n\n// \u2500\u2500 hex (\xA75.2) and the keyword colours (\xA76: named, transparent, currentcolor, system)\nhex          = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\\w-])/ ;\ncolorKeyword = /[a-zA-Z][\\w-]*(?![\\w(-])/ ;\n";

// raw:/Users/mkbabb/Programming/value.js/src/css/grammar/value.bbnf
var value_default = "// SERVED MODEL: claude-opus-5-5\n//\n// value.bbnf \u2014 component values (css-values-4 \xA72, css-syntax-3 \xA75.4.8), keyframe selectors\n// (css-animations-1 \xA73.2 + scroll-animations-1 \xA74.2 named ranges) and <easing-function>\n// (css-easing-2 \xA72\u2013\xA74), as `/css`'s `parseCssValue` \xB7 `parseCssValues` \xB7 `parseCssScalar` \xB7\n// `parseKeyframeSelector` \xB7 `parseTimingFunction` read them.\n\n// \u2500\u2500 component values \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// Precedence, loosest first: the comma list, the slash list, the space list.\nvalueTop   = ws >> commaList << ws ;\ncommaList  = slashList , ( comma >> slashList ) * ;\nslashList  = spaceList , ( slash >> spaceList ) * ;\nspaceList  = valueTerm , ( termSep >> valueTerm ) * ;\n// Juxtaposed terms are separated by whitespace, or stand directly against a `:`/`;` token.\ntermSep    = /\\s+|(?=[:;])|(?<=[:;])/ ;\n\nvalueTerm  = colorCall | varCall | call | numeric | string | operator | identTerm | badTerm ;\n// A component no production above reads (`@` in `calc(1px @ 2px)`). It is matched only to be\n// REFUSED \u2014 its action answers `css_syntax` expecting a scalar, with the diagnostic spanning exactly\n// this run \u2014 so a malformed value names its offending component rather than the whole input.\nbadTerm    = /[^\\s(),\\/:;\"']+/ ;\n\n// var() / env(): the fallback is a `<declaration-value>?` (css-variables-1 \xA72), which may end in a\n// comma or be empty \u2014 `var(--a, red,)` and `var(--a,)` are valid; the trailing comma carries no item.\nvarCall    = /(?:[vV]ar|[eE]nv)(?=\\()/i , /\\(\\s*/ >> varBody << close ;\nvarBody    = commaList << ( /\\s*,/ ? ) ;\n\n// A colour function is a colour, never a generic call: `rgb(1)` is a malformed colour.\ncolorCall  = relativeColor | rgbFn | hslFn | hwbFn | labFn | lchFn | oklabFn | oklchFn | colorFn | hex ;\ncolorHead  = /(?:[rR]gba?|[hH]sla?|[hH]wb|[lL]ab|[lL]ch|[oO]klab|[oO]klch|[cC]olor)\\(/i ;\ncall       = ( callName - colorHead ) , /\\(\\s*/ >> ( commaList ? ) << close ;\ncallName   = /(?:--[\\w-]*|[a-zA-Z_-][\\w-]*)(?=\\()/ ;\n\n// `1.` is not a number (css-syntax-3 \xA74.3.12, PB-12): a numeric is never followed by a `.`.\nnumeric    = /[+-]?(?:\\d*\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?[%a-zA-Z-]*(?![\\w\\\\.])/ ;\noperator   = /<=|>=|==|!=|[+*<>=:;]|-(?![\\w-])/ ;\nidentTerm  = /[-_a-zA-Z][-_a-zA-Z\\d]*(?![\\w(-])/ ;\n\n// A single scalar \u2014 `parseCssScalar`: a colour, a number with its unit, a string, an\n// operator token or a keyword.\nscalarTop  = ws >> scalarTerm << ws ;\nscalarTerm = colorMix | lightDark | colorCall | numeric | string | operator | identTerm ;\n\n// A whole colour \u2014 `parseCssColor`.\ncolorTop   = ws >> color << ws ;\n\n// \u2500\u2500 keyframe selectors \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nkeyframeSelector = ws >> ( selectorKeyword | selectorNamed | percentage ) << ws ;\nselectorKeyword  = /(?:[fF]rom|[tT]o)(?![\\w-])/i ;\nselectorNamed    = /(?:[eE]ntry|[eE]xit|[cC]over|[cC]ontain)(?![\\w-])/i , ( ws1 >> percentage ) ? ;\n\n// \u2500\u2500 <easing-function> \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\ntimingFunction = ws >> ( cubicBezier | stepsFn | linearFn | timingKeyword ) << ws ;\ntimingKeyword  = /(?:[lL]inear|[eE]ase-in-out|[eE]ase-in|[eE]ase-out|[eE]ase|[sS]tep-start|[sS]tep-end)(?![\\w(-])/i ;\ncubicBezier    = /[cC]ubic-bezier\\(\\s*/i >> number , comma >> number , comma >> number , comma >> number << close ;\nstepsFn        = /[sS]teps\\(\\s*/i >> number , ( comma >> stepPosition ) ? << close ;\nstepPosition   = /(?:[jJ]ump-start|[jJ]ump-end|[jJ]ump-none|[jJ]ump-both|[sS]tart|[eE]nd)(?![\\w-])/i ;\nlinearFn       = /[lL]inear\\(\\s*/i >> linearStop , ( comma >> linearStop ) * << close ;\nlinearStop     = number , ( ws1 >> percentage ) ? , ( ws1 >> percentage ) ? ;\n";

// raw:/Users/mkbabb/Programming/value.js/src/css/grammar/stylesheet.bbnf
var stylesheet_default = '// SERVED MODEL: claude-opus-5-5\n//\n// stylesheet.bbnf \u2014 every text the stylesheet layer (`../stylesheet.ts` \xB7 `../rules.ts` \xB7\n// `../timeline.ts` \xB7 `../syntax.ts`, through `../bbnf/sheet.ts`) reads above the component value:\n// top-level lists (css-syntax-3 \xA75.4.8 \u2014 a delimiter inside a `()` block or a string does not\n// separate), rule lists, at-rule preludes, declarations, the `@property`/`@function`/`@scope`\n// preludes and the timeline functions. X.P.W6.x: these rules replace the hand scanners the retired\n// `grammar.ts` (`splitTopLevel`) and the stylesheet layer (the block, prelude, colon and empty-comma\n// scanners) carried.\n//\n// Every rule here yields TEXT, or tags carrying text: its leaves are the matched code units, and the\n// actions (`../bbnf/stylesheet.ts`) join them \u2014 the grammar alone decides where a run ends. `quoted`\n// and `textGroup` are this module\'s own leaves because `value.bbnf` gives `string` a value action.\n\nquoted     = /"(?:\\\\[\\s\\S]|[^"\\\\])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\])*\'/ ;\ntextGroup  = "(" , textBody , ")" ;\ntextBody   = ( /[^()"\']+/ | quoted | textGroup ) * ;\n\n// \u2500\u2500 top-level lists \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\ncommaRun   = ( /[^(),"\']+/ | quoted | textGroup ) * ;\ncommaItems = commaRun , ( "," , commaRun ) * ;\nsemiRun    = ( /[^();"\']+/ | quoted | textGroup ) * ;\nsemiItems  = semiRun , ( ";" , semiRun ) * ;\nspaceRun   = ( /[^()\\s"\']+/ | quoted | textGroup ) + ;\nspaceItems = ws , ( spaceRun , ws ) * ;\n// The trailing text of a production, possibly empty (`?`: a regex leaf fails at end of input).\nrestText   = /[\\s\\S]+/ ? ;\n\n// \u2500\u2500 rule lists (css-syntax-3 \xA75.4.1) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// Between rules: whitespace, a stray `;`, comments. A rule is a prelude \u2014 any text outside a `()`\n// block or a string, up to a `{` or `;` \u2014 closed by `;` or by a `{}` block whose body is read as\n// text (braces nest; strings are opaque; the body is parsed by its own reader). A sheet that does\n// not end on a rule boundary ends on exactly one of three named faults: an unclosed comment, an\n// unclosed block, or a prelude no `{`/`;` closes.\ncomment      = /\\/\\*[\\s\\S]*?\\*\\// ;\nruleGap      = ( /[\\s;]+/ | comment ) * ;\npreludeRun   = ( /[^{;()"\']+/ | quoted | textGroup ) * ;\nblockBody    = ( /[^{}"\']+/ | quoted | openQuote | "{" , blockBody , "}" ) * ;\n// A string a block body never closes runs to the end of input (the block is then unclosed).\nopenQuote    = /["\'][\\s\\S]*/ ;\nsemiTail     = ";" ;\nblockTail    = "{" >> blockBody << "}" ;\n// A rule never starts inside a comment: at a rule boundary `/*` opens one (css-syntax-3 \xA74.3.2).\nruleBlock    = ( preludeRun , ( semiTail | blockTail ) ) - openComment ;\nopenComment  = /\\/\\*[\\s\\S]*/ ;\nopenBlock    = preludeRun , "{" , restText ;\nopenRule     = /[\\s\\S]+/ ;\nruleList     = ruleGap , ( ruleBlock , ruleGap ) * , ( openComment | openBlock | openRule ) ? ;\n\n// \u2500\u2500 at-rule preludes (a rule\'s trimmed prelude) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\natPrelude        = atKeyframes | atProperty | atFunction | atScope | atStartingStyle\n                 | atScrollTimeline | atViewTimeline | atOther ;\natKeyframes      = /@[kK]eyframes /i , restText ;\natProperty       = /@[pP]roperty /i , restText ;\natFunction       = /@[fF]unction /i , restText ;\natScope          = /@[sS]cope/i , restText ;\natStartingStyle  = /@[sS]tarting-style$/i ;\natScrollTimeline = /@[sS]croll-timeline /i , restText ;\natViewTimeline   = /@[vV]iew-timeline /i , restText ;\natOther          = atName , atRest ? ;\natName           = /@[^ ]*/ ;\natRest           = " " >> restText ;\n\n// `@property <custom-property-name>` (css-properties-values-api-1 \xA73).\npropertyName = /--[-_a-zA-Z][-_a-zA-Z\\d]*/ ;\n// A `syntax` descriptor\'s text, its one leading and one trailing quote set aside.\nsyntaxText   = /[\'"]/ ? , syntaxCore ? , /[\'"]/ ? ;\nsyntaxCore   = /(?:(?![\'"]$)[\\s\\S])+/ ;\n// css-properties-values-api-1 \xA75: `<syntax-component> [ \'|\' <syntax-component> ]*`, or `*`.\nsyntaxPart   = /[^|]+/ ? ;\nsyntaxAlts   = syntaxPart , ( "|" , syntaxPart ) * ;\n\n// `@scope (<scope-start>)? [to (<scope-end>)]?` (css-cascade-6 \xA72.5): each group\'s text.\nscopeGroup   = "(" >> textBody << ")" ;\nscopeLimit   = /[tT][oO]/ >> ws >> scopeGroup ;\nscopePrelude = ws , ( scopeGroup , ( ws >> scopeLimit ) ? , ws ) ? ;\n\n// `@function <dashed-function>( <function-parameter>#? )` (css-mixins-1 \xA72.1). The parameter\n// list is the text up to the prelude\'s last `)`; each parameter is `<custom-property-name>\n// <syntax>? [ : <default> ]?`, its colon the first outside a `()` block or a string.\nfunctionName   = /--[-\\w]+/ ;\nfunctionParams = /[\\s\\S]*(?=\\)$)/ ;\nfunctionHead   = /@[fF]unction\\s+/i >> functionName , /\\s*\\(/ >> functionParams << ")" ;\ncolonRun       = ( /[^():"\']+/ | quoted | textGroup ) * ;\nparamDefault   = ":" >> restText ;\nfunctionParam  = colonRun , paramDefault ? ;\nparamName      = /--[-\\w]+/ ;\nparamSyntax    = /\\s+/ >> /[^\\n]+/ ;\nparamHead      = paramName , paramSyntax ? ;\n\n// \u2500\u2500 declarations (css-syntax-3 \xA75.4.6) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// `name: value !important?` \u2014 the name is the text before the first `:`.\ndeclName       = /[^:]+/ ;\ndeclValue      = /(?:(?![!][iI]mportant\\s*$)[\\s\\S])+/i ? ;\ndeclImportant  = /![iI]mportant\\s*$/i ;\ndeclaration    = declName , ":" , declValue , declImportant ? ;\n// A comma list with its separators kept, so an empty item is found where it stands.\nlistComma      = "," ;\ncommaSpans     = commaRun , ( listComma , commaRun ) * ;\n\n// \u2500\u2500 timelines (scroll-animations-1 \xA72\u2013\xA74) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// `scroll(\u2026)` / `view(\u2026)`: the arguments as space- or comma-separated runs.\nargRun         = ( /[^()\\s,"\']+/ | quoted | textGroup ) + ;\ntimelineArgs   = /[\\s,]*/ ? , ( argRun , /[\\s,]*/ ? ) * ;\nscrollFn       = /[sS]croll\\(/i >> timelineArgs << ")" ;\nviewFn         = /[vV]iew\\(/i >> timelineArgs << ")" ;\n// The text that opens a timeline in an `animation-trigger` (a keyword, a name, or a function).\ntimelineLead   = /(?:[aA]uto|[nN]one|--|[sS]croll\\(|[vV]iew\\()[\\s\\S]*/i ;\n// A timeline inset or range offset: `auto` or a length-percentage.\ntimelineLength = /[aA]uto/i | /[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:%|[a-zA-Z]+)?/ ;\n';

// src/css/bbnf/load.ts
var GRAMMAR_MODULES = Object.freeze({ tokens: tokens_default, math: math_default, color: color_default, value: value_default, stylesheet: stylesheet_default });
function compileGrammar() {
  const [rules] = BBNFToParser(Object.values(GRAMMAR_MODULES).join("\n"));
  return rules;
}
function ruleOf(rules, name) {
  const rule = rules[name];
  if (rule === void 0) throw new Error(`BBNF grammar has no rule \`${name}\``);
  return rule;
}
function run(rule, source) {
  rule.reset();
  const state = rule.call(new ParserState(source));
  if (state.isError || state.offset !== source.length) {
    return { ok: false, furthest: Math.max(state.offset, state.furthest ?? 0) };
  }
  return { ok: true, value: state.value, end: state.offset };
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
function tokenQuantity(token2) {
  const [, digits = "", rawUnit = ""] = NUMERIC.exec(token2) ?? [];
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
function constantQuantity(token2) {
  switch (token2.toLowerCase()) {
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
function rgbToHue(red2, green2, blue) {
  const max = Math.max(red2, green2, blue);
  const min = Math.min(red2, green2, blue);
  const d = max - min;
  let hue = NaN;
  if (d !== 0) {
    switch (max) {
      case red2:
        hue = (green2 - blue) / d + (green2 < blue ? 6 : 0);
        break;
      case green2:
        hue = (blue - red2) / d + 2;
        break;
      default:
        hue = (red2 - green2) / d + 4;
    }
    hue *= 60;
  }
  if (hue >= 360) hue -= 360;
  return hue;
}
function rgbToHsl([red2, green2, blue]) {
  const max = Math.max(red2, green2, blue);
  const min = Math.min(red2, green2, blue);
  let hue = rgbToHue(red2, green2, blue);
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
    const gray2 = white / (white + black);
    return [gray2, gray2, gray2];
  }
  return map3(hslToRgb([hue, 1, 0.5]), (c) => c * (1 - white - black) + white);
}
function rgbToHwb([red2, green2, blue]) {
  const hue = rgbToHue(red2, green2, blue);
  const white = Math.min(red2, green2, blue);
  const black = 1 - Math.max(red2, green2, blue);
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
function hexColor(token2) {
  const digits = token2.slice(1);
  const full = digits.length <= 4 ? [...digits].map((d) => d + d).join("") : digits;
  const byte = (i) => parseInt(full.slice(i, i + 2), 16);
  const made = rgb(byte(0), byte(2), byte(4), full.length === 8 ? byte(6) / 255 : 1);
  return made.ok ? colorNode(made.value) : invalid(made.error.code);
}
function keywordColor(token2) {
  const key = token2.toLowerCase();
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
var hueMethodOf = (token2) => token2.toLowerCase().split(/\s+/)[0];
function attachColorActions(rules) {
  const on = (name, action) => {
    rules[name] = ruleOf(rules, name).map(action);
  };
  for (const token2 of ["number", "percentage", "angle", "dimension"]) on(token2, tokenQuantity);
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
function identScalar(token2, color) {
  const key = token2.toLowerCase();
  return key === "transparent" || typeof NAMED_COLORS[key] === "string" ? colorScalar(color(token2)) : keyword(token2);
}
var NUMERIC2 = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)(.*)$/;
function numericScalar(token2) {
  const [, digits = "", unit = ""] = NUMERIC2.exec(token2) ?? [];
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
function timingKeyword(token2) {
  const name = token2.toLowerCase();
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
  on("identTerm", (token2) => identScalar(token2, color));
  on("colorCall", colorScalar);
  on("scalarTerm", (v) => v.kind === "color" || v.kind === "context" || v.kind === "invalid" ? colorScalar(v) : v);
  on("call", callValue);
  on("varCall", callValue);
  rules.badTerm = ruleOf(rules, "badTerm").mapState((next, prev) => next.ok(Object.freeze({ ...refused("css_syntax", "scalar"), span: Object.freeze({ start: prev.offset, end: next.offset }) })));
  on("spaceList", listOf("space"));
  on("slashList", listOf("slash"));
  on("commaList", listOf("comma"));
  on("selectorKeyword", (token2) => ({ kind: "percent", value: token2.toLowerCase() === "from" ? 0 : 1 }));
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
var parseRule2 = (name, source) => run(ruleOf(grammar(), name), source);
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
  const parsed = parseRule2("colorTop", source);
  return parsed.ok ? colorResult(source, asColorNode(parsed.value)) : failure(source, "css_syntax", ["color"]);
}
function valueResult(source, node) {
  return node.kind === "refused" ? refusal(source, node) : success(node);
}
function parseCssValue(source) {
  const parsed = parseRule2("valueTop", source);
  return parsed.ok ? valueResult(source, parsed.value) : failure(source, "css_syntax", ["scalar"]);
}
function parseCssValues(source) {
  const parsed = parseCssValue(source);
  if (!parsed.ok) return parsed;
  return parsed.value.kind === "list" ? success(parsed.value) : success({ kind: "list", separator: "space", items: [parsed.value] });
}
function parseCssScalar(source) {
  const parsed = parseRule2("scalarTop", source);
  return parsed.ok ? valueResult(source, parsed.value) : failure(source, "css_syntax", ["scalar"]);
}
function parseKeyframeSelector(source) {
  const parsed = parseRule2("keyframeSelector", source);
  if (!parsed.ok) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
  const node = keyframeSelector(parsed.value);
  return node.kind === "refused" ? refusal(source, node) : success(node);
}
function parseTimingFunction(source) {
  const parsed = parseRule2("timingFunction", source);
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
    const comma2 = part.comma;
    if (!item) return comma2;
    last = comma2;
    item = "";
  }
  return last !== void 0 && !item ? last : void 0;
}
var timelineArgs = (kind, source) => read(kind === "scroll" ? "scrollFn" : "viewFn", source);
var opensTimeline = (token2) => matches("timelineLead", token2);
var isTimelineLength = (token2) => matches("timelineLength", token2);
var isDashedIdent = (token2) => matches("dashedIdent", token2);

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
  const token2 = numeric(value);
  if (!token2) return false;
  const unit = token2.unit.toLowerCase();
  switch (component) {
    case "<number>":
      return unit === "";
    case "<integer>":
      return unit === "" && Number.isInteger(token2.value);
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
      const token2 = arg.toLowerCase();
      if (SCROLLERS.has(token2) && result.scroller === void 0) {
        result.scroller = token2;
      } else if (AXES.has(token2) && result.axis === void 0) {
        result.axis = token2;
      } else return failure(source, "timeline_option_invalid", ["scroll timeline"]);
    }
    return success(result);
  }
  const viewArgs = timelineArgs("view", input);
  if (viewArgs !== null) {
    const result = { kind: "view" };
    const inset = [];
    for (const arg of viewArgs) {
      const token2 = arg.toLowerCase();
      if (AXES.has(token2) && result.axis === void 0) result.axis = token2;
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
  const comma2 = splitTopLevel(input, ",");
  if (!comma2 || comma2.length > 2) return failure(source, "timeline_option_invalid", ["animation range"]);
  const [commaStart, commaEnd] = comma2;
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
  for (const token2 of tokens) {
    const lower = token2.toLowerCase();
    if (TRIGGER_TYPES.has(lower) && result.type === void 0) {
      result.type = lower;
      continue;
    }
    if (result.timeline === void 0 && opensTimeline(token2)) {
      const timeline = parseAnimationTimeline(token2);
      if (!timeline.ok) return timeline;
      result.timeline = timeline.value;
      continue;
    }
    range.push(token2);
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
    for (const token2 of rest) {
      const position = scalarNumberValue(token2, ["%"]);
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
      const token2 = scalarKeyword(argument)?.toLowerCase();
      if (["nearest", "root", "self"].includes(token2 ?? "") && result2.scroller === void 0) {
        result2.scroller = token2;
      } else if (["block", "inline", "x", "y"].includes(token2 ?? "") && result2.axis === void 0) {
        result2.axis = token2;
      } else return void 0;
    }
    return Object.freeze(result2);
  }
  if (name !== "view") return void 0;
  const result = { kind: "view" };
  const inset = [];
  for (const argument of args) {
    const token2 = scalarKeyword(argument)?.toLowerCase();
    if (["block", "inline", "x", "y"].includes(token2 ?? "") && result.axis === void 0) {
      result.axis = token2;
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
  for (const token2 of tokens) {
    const time = scalarNumberValue(token2, ["s", "ms"]);
    if (time !== void 0) {
      if (!duration) {
        if (time < 0) return void 0;
        duration = token2;
      } else if (!delay) delay = token2;
      else return void 0;
      continue;
    }
    if (!timing && timingFunctionValue(token2)) {
      timing = token2;
      continue;
    }
    const word = scalarKeyword(token2)?.toLowerCase();
    const count = scalarNumberValue(token2);
    if (!iteration && (word === "infinite" || count !== void 0 && count >= 0)) {
      iteration = token2;
      continue;
    }
    if (!direction && DIRECTIONS.has(word ?? "")) {
      direction = token2;
      continue;
    }
    if (!fill && FILL_MODES.has(word ?? "")) {
      fill = token2;
      continue;
    }
    if (!playState && PLAY_STATES.has(word ?? "")) {
      playState = token2;
      continue;
    }
    if (!name && animationNameValue(token2)) {
      name = token2;
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
    for (const token2 of tokens) {
      const selector = parseKeyframeSelector(token2);
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
