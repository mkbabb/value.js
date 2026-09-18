// node_modules/@mkbabb/parse-that/dist/diagnostics-DDazRHgl.js
var diagnosticsEnabled = false;
function isDiagnosticsEnabled() {
  return diagnosticsEnabled;
}
function mergeErrorState(state, label) {
  if (state.offset > state.furthest) {
    state.furthest = state.offset;
    state.expected = diagnosticsEnabled && label ? [label] : void 0;
    state.suggestions = [];
    state.secondarySpans = [];
  } else if (state.offset === state.furthest) {
    if (diagnosticsEnabled && label) {
      if (state.expected) {
        if (!state.expected.includes(label)) {
          state.expected.push(label);
        }
      } else {
        state.expected = [label];
      }
    }
  }
  return state;
}
function addSuggestion(state, suggestion) {
  if (diagnosticsEnabled) {
    state.suggestions.push(suggestion);
  }
}
function addSecondarySpan(state, offset, label) {
  if (diagnosticsEnabled) {
    state.secondarySpans.push({ offset, label });
  }
}
function reportUnclosedDelimiter(state, openText, openOffset) {
  if (!diagnosticsEnabled) return;
  const closeText = openText === "{" ? "}" : openText === "[" ? "]" : openText === "(" ? ")" : openText;
  addSuggestion(state, {
    kind: "unclosed-delimiter",
    message: `close the delimiter with \`${closeText}\``,
    openOffset
  });
  addSecondarySpan(state, openOffset, `unclosed \`${openText}\` opened here`);
}
var collectedDiagnostics = [];
function collectDiagnostic(state, errorOffset) {
  const src = state.src;
  const furthest = state.furthest >= 0 ? state.furthest : errorOffset;
  const before = src.slice(0, furthest);
  const lastNl = before.lastIndexOf("\n");
  const line = lastNl === -1 ? 1 : before.slice(0, lastNl + 1).split("\n").length;
  const column = lastNl === -1 ? furthest : furthest - lastNl - 1;
  const found = src.slice(furthest, furthest + 20).replace(/\n/g, "\\n");
  collectedDiagnostics.push({
    offset: errorOffset,
    furthestOffset: furthest,
    line,
    column,
    expected: state.expected ? [...state.expected] : [],
    suggestions: [...state.suggestions],
    secondarySpans: [...state.secondarySpans],
    found
  });
  resetErrorState(state);
}
function resetErrorState(state) {
  state.furthest = -1;
  state.expected = void 0;
  state.suggestions = [];
  state.secondarySpans = [];
}
function popLastDiagnostic() {
  return collectedDiagnostics.pop();
}

// node_modules/@mkbabb/parse-that/dist/packrat-entry-CS1td-8B.js
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
var MAX_LINES = 4;
var MAX_LINE_WIDTH = 74;
var debugDepth = 0;
function summarizeLine(line, columnNum = 0) {
  const trimmed = line.trimEnd();
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
  const { line: lineNum, column: columnNum } = state.getLineAndColumn();
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
    const expected = state.expected ?? [];
    if (expected.length > 0) {
      output += `
   ${cyan(formatExpected(expected))}`;
    }
    const secondarySpans = state.secondarySpans;
    if (secondarySpans.length > 0) {
      output += `
${formatSecondarySpans(state.src, secondarySpans)}`;
    }
    const suggestions = state.suggestions;
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
    const indented = s.split("\n").map((line) => indentStr + line).join("\n");
    logger(indented);
    debugDepth--;
    return newState;
  };
  return new Parser(debug, createParserContext("debug", parser, logger));
}
var ParserState = class _ParserState {
  constructor(src, value = void 0, offset = 0, isError = false, furthest = -1) {
    this.src = src;
    this.value = value;
    this.offset = offset;
    this.isError = isError;
    this.furthest = furthest;
  }
  /**
   * Furthest-offset error tracking, threaded per-parse (the Rust port's
   * `state.furthest_offset` model). `expected` is the accumulated label set
   * at `furthest`; `suggestions`/`secondarySpans` are the diagnostic extras
   * collected at `furthest` when diagnostics are enabled.
   */
  expected;
  suggestions = [];
  secondarySpans = [];
  ok(value, offset = 0) {
    this.offset += offset;
    this.unsafeSetValue(value);
    this.isError = false;
    return this;
  }
  err(value, offset = 0) {
    this.offset += offset;
    this.unsafeSetValue(value);
    this.isError = true;
    return this;
  }
  from(value, offset = 0) {
    this.offset += offset;
    this.unsafeSetValue(value);
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
  /** Type-erased value setter — single choke point for the mutable-state cast pattern. */
  unsafeSetValue(value) {
    this.value = value;
  }
  /** Type-erased parser invocation via .call() — single choke point for combinator type casts. */
  unsafeCall(parser) {
    parser.call(this);
  }
  /** Type-erased raw parser invocation via .parser() — for internal combinator plumbing. */
  unsafeCallRaw(parser) {
    parser.parser(this);
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
    const line = lastNewline === -1 ? 1 : this.src.slice(0, lastNewline + 1).split("\n").length;
    const column = lastNewline === -1 ? offset : offset - lastNewline - 1;
    return { line, column };
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
function makeParser(parser, context) {
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
  return makeParser(
    eof2,
    createParserContext("eof", void 0)
  );
}
function any(...parsers) {
  const n = parsers.length;
  let anyParser;
  if (n === 2) {
    const p0 = parsers[0];
    const p1 = parsers[1];
    anyParser = (state) => {
      const savedOffset = state.offset;
      p0.parser(state);
      if (!state.isError) return state;
      state.offset = savedOffset;
      state.isError = false;
      p1.parser(state);
      if (!state.isError) return state;
      state.offset = savedOffset;
      state.isError = false;
      mergeErrorState(state);
      state.isError = true;
      return state;
    };
  } else {
    anyParser = (state) => {
      const savedOffset = state.offset;
      for (let i = 0; i < n; i++) {
        parsers[i].parser(state);
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
  }
  return makeParser(
    n === 1 ? parsers[0].parser : anyParser,
    createParserContext("any", void 0, ...parsers)
  );
}
function dispatch(table) {
  const tbl = new Int8Array(128).fill(-1);
  const parsers = [];
  const internParser = (parser) => {
    let idx = parsers.indexOf(parser);
    if (idx === -1) {
      idx = parsers.length;
      parsers.push(parser);
    }
    return idx;
  };
  for (const [chars, parser] of Object.entries(table)) {
    const idx = internParser(parser);
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
    const off = state.offset;
    const ch2 = state.src.charCodeAt(off);
    const idx = ch2 < 128 ? tbl[ch2] : -1;
    if (idx >= 0) {
      return parsers[idx].parser(state);
    }
    mergeErrorState(state, label);
    state.isError = true;
    return state;
  };
  return makeParser(
    dispatchParser,
    createParserContext("dispatch", void 0, ...parsers)
  );
}
function all(...parsers) {
  return makeParser(
    parsers.length === 1 ? parsers[0].parser : fuseAll(parsers),
    createParserContext("all", void 0, ...parsers)
  );
}
function fuseAll(parsers) {
  const n = parsers.length;
  if (n === 2) {
    const p0 = parsers[0];
    const p1 = parsers[1];
    return (state) => {
      const savedOffset = state.offset;
      let w = 0;
      const out = [void 0, void 0];
      p0.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      if (state.value !== void 0) out[w++] = state.value;
      p1.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      if (state.value !== void 0) out[w++] = state.value;
      if (w !== 2) out.length = w;
      return state.ok(out);
    };
  }
  if (n === 3) {
    const p0 = parsers[0];
    const p1 = parsers[1];
    const p2 = parsers[2];
    return (state) => {
      const savedOffset = state.offset;
      let w = 0;
      const out = [void 0, void 0, void 0];
      p0.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      if (state.value !== void 0) out[w++] = state.value;
      p1.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      if (state.value !== void 0) out[w++] = state.value;
      p2.parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      if (state.value !== void 0) out[w++] = state.value;
      if (w !== 3) out.length = w;
      return state.ok(out);
    };
  }
  return (state) => {
    const savedOffset = state.offset;
    const out = new Array(n);
    let w = 0;
    for (let i = 0; i < n; i++) {
      parsers[i].parser(state);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      if (state.value !== void 0) out[w++] = state.value;
    }
    if (w !== n) out.length = w;
    return state.ok(out);
  };
}
function string(str) {
  const len = str.length;
  const label = `"${str}"`;
  let stringParser;
  if (len === 1) {
    const code = str.charCodeAt(0);
    stringParser = (state) => {
      if (state.src.charCodeAt(state.offset) === code) {
        state.offset += 1;
        state.unsafeSetValue(str);
        state.isError = false;
        return state;
      }
      mergeErrorState(state, label);
      state.isError = true;
      return state;
    };
  } else {
    stringParser = (state) => {
      if (state.src.startsWith(str, state.offset)) {
        state.offset += len;
        state.unsafeSetValue(str);
        state.isError = false;
        return state;
      }
      mergeErrorState(state, label);
      state.isError = true;
      return state;
    };
  }
  return makeParser(
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
        state.unsafeSetValue(state.src.substring(savedOffset, end));
        state.isError = false;
        return state;
      }
      state.unsafeSetValue(void 0);
      state.isError = false;
      return state;
    }
    mergeErrorState(state, label);
    state.isError = true;
    return state;
  };
  return makeParser(
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
var MEMO_OFFSET_BITS = 32;
var MEMO_OFFSET_SPAN = 2 ** MEMO_OFFSET_BITS;
var MEMO_MAX_ID = Math.floor(Number.MAX_SAFE_INTEGER / MEMO_OFFSET_SPAN);
var MEMO = /* @__PURE__ */ new Map();
var HEADS = /* @__PURE__ */ new Map();
var LR_STACK;
var PACKRAT_ARMED = false;
var CURRENT_SRC;
var GROWING = /* @__PURE__ */ new Map();
function packratEnter() {
  if (!PACKRAT_ARMED) return null;
  const saved = {
    memo: MEMO,
    heads: HEADS,
    growing: GROWING,
    lrStack: LR_STACK,
    currentSrc: CURRENT_SRC
  };
  MEMO = /* @__PURE__ */ new Map();
  HEADS = /* @__PURE__ */ new Map();
  GROWING = /* @__PURE__ */ new Map();
  LR_STACK = void 0;
  CURRENT_SRC = void 0;
  return saved;
}
function packratExit(saved) {
  if (saved === null) return;
  MEMO = saved.memo;
  HEADS = saved.heads;
  GROWING = saved.growing;
  LR_STACK = saved.lrStack;
  CURRENT_SRC = saved.currentSrc;
}
var PARSER_ID = 0;
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
  parseState(val) {
    const epoch = packratEnter();
    try {
      return this.parseStateInner(val);
    } finally {
      packratExit(epoch);
    }
  }
  parseStateInner(val) {
    const state = new ParserState(val);
    this.parser(state);
    if (state.isError) {
      const furthest = state.furthest >= 0 ? state.furthest : state.offset;
      const errorState = new ParserState(val, void 0, furthest, true);
      errorState.expected = state.expected;
      errorState.suggestions = state.suggestions;
      errorState.secondarySpans = state.secondarySpans;
      errorState.furthest = furthest;
      this.state = errorState;
      if (isDiagnosticsEnabled()) {
        console.error(this.state.toString());
      }
    } else {
      this.state = state;
    }
    return state;
  }
  parse(val) {
    return this.parseState(val).value;
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
  chain(fn) {
    const chain = (state) => {
      this.parser(state);
      if (state.isError) {
        return state;
      }
      return fn(state.value).parser(state);
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
        state.unsafeCallRaw(parser);
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
          state.unsafeSetValue(value1);
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
      state.unsafeCallRaw(excluded);
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
      state.unsafeCallRaw(lookahead);
      if (state.isError) {
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      state.offset = offsetAfterSelf;
      state.unsafeSetValue(value);
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
      state.unsafeCallRaw(start);
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
      state.unsafeCallRaw(end);
      if (state.isError) {
        mergeErrorState(state);
        reportUnclosedDelimiter(state, state.src.slice(savedOffset, openEnd), savedOffset);
        state.offset = savedOffset;
        state.isError = true;
        return state;
      }
      state.unsafeSetValue(value);
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
        addSuggestion(state, {
          kind: "trailing-content",
          message: "unexpected trailing content after parsed value"
        });
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
        (state) => inner.call(state),
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
      const matches = est > 0 ? new Array(est) : [];
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
          matches[len] = state.value;
        } else {
          matches.push(state.value);
        }
        len++;
      }
      if (len < est) matches.length = len;
      if (len >= min) {
        return state.ok(matches);
      }
      mergeErrorState(state);
      state.isError = true;
      state.unsafeSetValue([]);
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
  sepBy(sep3, min = 0, max = Infinity) {
    const sepBy = (state) => {
      const est = min > 0 ? min : 0;
      const matches = est > 0 ? new Array(est) : [];
      let len = 0;
      {
        const savedOffset = state.offset;
        this.parser(state);
        if (state.isError) {
          state.offset = savedOffset;
          state.isError = false;
        } else if (state.offset !== savedOffset) {
          if (len < est) {
            matches[len] = state.value;
          } else {
            matches.push(state.value);
          }
          len++;
        }
      }
      while (len > 0 && len < max) {
        const cpBeforeSep = state.offset;
        sep3.parser(state);
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
          matches[len] = state.value;
        } else {
          matches.push(state.value);
        }
        len++;
      }
      if (len < est) matches.length = len;
      if (len >= min) {
        return state.ok(matches);
      }
      mergeErrorState(state);
      state.isError = true;
      state.unsafeSetValue([]);
      return state;
    };
    return new _Parser(
      sepBy,
      createParserContext("sepBy", this, sep3)
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
      collectDiagnostic(state, checkpoint);
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

// deposed-full/src/units/color/color-names.ts
var customColorNames = /* @__PURE__ */ new Map();
var changeListeners = /* @__PURE__ */ new Set();
function onColorNamesChange(listener) {
  changeListeners.add(listener);
  return () => {
    changeListeners.delete(listener);
  };
}
function getCustomColorNamesMap() {
  return customColorNames;
}
var COLOR_NAMES = {
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
  transparent: "rgba(0, 0, 0, 0)",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
  padaleckipink: "oklch(100% 0.42 360deg / 71.70%)",
  "lodge blu color": "rgb(53	101	144)",
  lavendi: "oklch(79.90% 0.11 318.24deg / 100%)",
  shadyshroom: "oklch(53% 0.07 21.60deg / 100%)",
  patriarchalplum: "oklch(31.20% 0.11 19.80deg / 100%)",
  winterwind: "oklch(21.80% 0.28 210.96deg / 82.70%)",
  blackwellberry: "oklch(53.60% 0.35 267.12deg / 100%)"
};

// deposed-full/src/utils.ts
var FRAME_RATE = 1e3 / 60;
var isObject = (value) => {
  return !!value && value.constructor === Object;
};
function clone(obj) {
  if (isObject(obj)) {
    const out = {};
    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        out[k] = clone(obj[k]);
      }
    }
    return out;
  } else if (obj != null && typeof obj.clone === "function") {
    return obj.clone();
  } else if (Array.isArray(obj)) {
    return obj.map(clone);
  } else {
    return obj;
  }
}
function memoize2(func, options = {}) {
  const cache = /* @__PURE__ */ new Map();
  const {
    maxCacheSize = Infinity,
    ttl = Infinity,
    keyFn = JSON.stringify,
    shouldCache
  } = options;
  const hasTtl = ttl !== Infinity;
  const memoized = function(...args) {
    const key = keyFn.apply(this, args);
    if (cache.has(key)) {
      const cached = cache.get(key);
      if (!hasTtl || Date.now() - cached.timestamp <= ttl) {
        cache.delete(key);
        cache.set(key, cached);
        return cached.value;
      } else {
        cache.delete(key);
      }
    }
    const result = func.apply(this, args);
    if (!shouldCache || shouldCache(result, ...args)) {
      cache.set(key, { value: result, timestamp: hasTtl ? Date.now() : 0 });
      if (cache.size > maxCacheSize) {
        const lruKey = cache.keys().next().value;
        cache.delete(lruKey);
      }
    }
    return result;
  };
  memoized.cache = cache;
  return memoized;
}

// deposed-full/src/units/constants.ts
var ABSOLUTE_LENGTH_UNITS = ["px", "cm", "mm", "Q", "in", "pc", "pt"];
var RELATIVE_LENGTH_UNITS = [
  "em",
  "ex",
  "ch",
  "cap",
  "ic",
  "rem",
  "lh",
  "rlh",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "vb",
  "vi",
  "svw",
  "svh",
  "svi",
  "svb",
  "svmin",
  "svmax",
  "lvw",
  "lvh",
  "lvi",
  "lvb",
  "lvmin",
  "lvmax",
  "dvw",
  "dvh",
  "dvi",
  "dvb",
  "dvmin",
  "dvmax",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax"
];
var LENGTH_UNITS = [
  ...ABSOLUTE_LENGTH_UNITS,
  ...RELATIVE_LENGTH_UNITS
];
var TIME_UNITS = ["s", "ms"];
var ANGLE_UNITS = ["deg", "rad", "grad", "turn"];
var PERCENTAGE_UNITS = ["%"];
var FREQUENCY_UNITS = ["Hz", "kHz"];
var RESOLUTION_UNITS = ["dpi", "dpcm", "dppx"];
var FLEX_UNITS = ["fr"];
var COMPUTED_UNITS = ["var", "calc"];
var STRING_UNITS = ["string"];
var COLOR_UNITS = ["color", "color-keyword"];
var UNITS = [
  ...LENGTH_UNITS,
  ...TIME_UNITS,
  ...ANGLE_UNITS,
  ...PERCENTAGE_UNITS,
  ...FREQUENCY_UNITS,
  ...RESOLUTION_UNITS,
  ...FLEX_UNITS,
  ...COMPUTED_UNITS,
  ...STRING_UNITS,
  ...COLOR_UNITS,
  "",
  void 0
];
var BLACKLISTED_COALESCE_UNITS = ["string", "var", "calc"];

// deposed-full/src/units/index.ts
var ValueUnit = class _ValueUnit {
  constructor(value, unit, superType, subProperty, property, targets, fnName) {
    this.value = value;
    this.unit = unit;
    this.superType = superType;
    this.subProperty = subProperty;
    this.property = property;
    this.targets = targets;
    this.fnName = fnName;
  }
  /**
   * Fully unwrap a (possibly nested) `ValueUnit`, returning the innermost
   * non-`ValueUnit` value.
   *
   * **G.W2 Lane D (G-OPP-5)** — codifies the Mar 2026 iOS Safari
   * stack-overflow fix as a first-class `ValueUnit` primitive. The
   * `while (raw instanceof ValueUnit) raw = raw.value` idiom was inlined
   * across the color pipeline + the parser; each inline copy was a place the
   * `VU<VU<…>>` accumulation guard could silently drift. This static is the
   * single source of truth — see `test/recursion-guard.test.ts`.
   *
   * The conditional return type peels exactly one `ValueUnit` layer at the
   * type level (`ValueUnit` payloads can themselves be `ValueUnit` only via
   * the bug class this guards against, so one peel is the honest static
   * type); at runtime the `while` loop peels every layer.
   */
  static unwrapDeep(x) {
    let raw = x;
    while (raw instanceof _ValueUnit) raw = raw.value;
    return raw;
  }
  setSubProperty(subProperty) {
    this.subProperty = subProperty;
  }
  setProperty(property) {
    this.property = property;
  }
  setTargets(targets) {
    this.targets = targets;
  }
  valueOf() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
  toString() {
    if (this.value == null) {
      return "";
    }
    if (this.unit == null || this.unit === "string") {
      return `${this.value}`;
    }
    if (this.unit === "color" || this.unit === "color-keyword" || this.unit === "system-color") {
      return `${this.value}`;
    } else if (this.unit === "var") {
      return `var(${this.value})`;
    } else if (this.unit === "calc") {
      return `calc(${this.value})`;
    } else {
      return `${this.value}${this.unit}`;
    }
  }
  toJSON() {
    return this.valueOf();
  }
  toFixed(fractionDigits = 2) {
    let value = Number(this.value).toFixed(fractionDigits);
    if (value.includes(".")) {
      value = value.replace(/0+$/, "").replace(/\.$/, "");
    }
    return new _ValueUnit(value).coalesce(this, true).toString();
  }
  clone() {
    const value = new _ValueUnit(
      clone(this.value),
      this.unit,
      clone(this.superType),
      this.subProperty,
      this.property,
      // `targets` is intentionally NOT cloned (DOM nodes are not deep-
      // copyable; the historical clone omitted them).
      void 0,
      // VJ-Q4 (1.2.0) — preserve the function-name provenance across the
      // clone so a flattened leaf survives `clone()` WITH its `fnName`.
      this.fnName
    );
    return value;
  }
  coalesce(right, inplace = false) {
    if (right == null) {
      return this;
    }
    const blacklisted = BLACKLISTED_COALESCE_UNITS;
    if (this.unit != null && blacklisted.includes(this.unit)) {
      return this;
    }
    if (inplace) {
      this.unit ??= right.unit;
      this.superType ??= right.superType;
      this.subProperty ??= right.subProperty;
      this.property ??= right.property;
      this.targets ??= right.targets;
      this.fnName ??= right.fnName;
      return this;
    } else {
      const value = new _ValueUnit(
        clone(this.value),
        this.unit ?? right.unit,
        clone(this.superType ?? right.superType),
        this.subProperty ?? right.subProperty,
        this.property ?? right.property,
        this.targets ?? right.targets,
        this.fnName ?? right.fnName
      );
      return value;
    }
  }
};
var FunctionValue = class _FunctionValue {
  constructor(name, values) {
    this.name = name;
    this.values = values;
    values.forEach((v) => {
      v.setSubProperty(name);
    });
  }
  setSubProperty(subProperty) {
    this.values.forEach((v) => v.setSubProperty(subProperty));
  }
  setProperty(property) {
    this.values.forEach((v) => v.setProperty(property));
  }
  setTargets(targets) {
    this.values.forEach((v) => v.setTargets(targets));
  }
  setValue(value, index) {
    if (index != null) {
      this.values[index].setValue(value);
    } else {
      this.values.forEach((v) => v.setValue(value));
    }
  }
  valueOf() {
    return this.values.map((v) => v.valueOf());
  }
  toString() {
    if ((this.name === "+" || this.name === "-" || this.name === "*" || this.name === "/") && this.values.length === 2) {
      return `${this.values[0].toString()} ${this.name} ${this.values[1].toString()}`;
    }
    if (this.name === "if" && this.values.length >= 3) {
      const clauses = [];
      const vals = this.values;
      let i = 0;
      for (; i + 1 < vals.length; i += 2) {
        clauses.push(`${vals[i].toString()}: ${vals[i + 1].toString()}`);
      }
      if (i < vals.length) {
        clauses.push(`else: ${vals[i].toString()}`);
      }
      return `if(${clauses.join("; ")})`;
    }
    if (this.name === "linear") {
      const stops = [];
      for (const v of this.values) {
        const isHint = v instanceof ValueUnit && v.unit === "%";
        if (isHint && stops.length > 0) {
          stops[stops.length - 1] += ` ${v.toString()}`;
        } else {
          stops.push(v.toString());
        }
      }
      return `${this.name}(${stops.join(", ")})`;
    }
    if (this.name === "color") {
      return `${this.name}(${this.values.map((v) => v.toString()).join(" ")})`;
    }
    if (this.name.endsWith("-gradient")) {
      const stops = [];
      for (const v of this.values) {
        const isPosition = v instanceof ValueUnit && (v.superType?.includes("length") === true || v.superType?.includes("percentage") === true);
        if (isPosition && stops.length > 0) {
          stops[stops.length - 1] += ` ${v.toString()}`;
        } else {
          stops.push(v.toString());
        }
      }
      return `${this.name}(${stops.join(", ")})`;
    }
    return `${this.name}(${this.values.map((v) => v.toString()).join(", ")})`;
  }
  toJSON() {
    return {
      [this.name]: this.values.map((v) => v.toJSON())
    };
  }
  clone() {
    return new _FunctionValue(
      this.name,
      this.values.map((v) => v.clone())
    );
  }
};
var ValueArray = class _ValueArray extends Array {
  constructor(...args) {
    super(...args);
  }
  setSubProperty(subProperty) {
    this.forEach((v) => v.setSubProperty(subProperty));
  }
  setProperty(property) {
    this.forEach((v) => v.setProperty(property));
  }
  setTargets(targets) {
    this.forEach((v) => v.setTargets(targets));
  }
  setValue(value, index) {
    if (index != null) {
      this[index].setValue(value);
    } else {
      this.forEach((v) => v.setValue(value));
    }
  }
  valueOf() {
    return this.map((v) => v.valueOf());
  }
  toString() {
    return this.map((v) => v.toString()).join(" ");
  }
  toJSON() {
    return this.map((v) => v.toJSON());
  }
  clone() {
    return new _ValueArray(...this.map((v) => v.clone()));
  }
};

// deposed-full/src/parsing/utils.ts
var PARSE_MEMO_MAX_ENTRIES = 4096;
var CC_MINUS = 45;
var CC_DOT = 46;
var CC_0 = 48;
var CC_9 = 57;
var CC_e = 101;
var CC_E = 69;
var CC_PLUS = 43;
function isDigit(c) {
  return c >= CC_0 && c <= CC_9;
}
function isAsciiLetter(c) {
  return c >= 65 && c <= 90 || c >= 97 && c <= 122;
}
function isIdentContinue(c) {
  return isAsciiLetter(c) || isDigit(c) || c === CC_MINUS;
}
function scanIdentFast(src, pos) {
  const len = src.length;
  let i = pos;
  if (i < len && src.charCodeAt(i) === CC_MINUS) i++;
  if (i >= len || !isAsciiLetter(src.charCodeAt(i))) return pos;
  i++;
  while (i < len && isIdentContinue(src.charCodeAt(i))) i++;
  return i;
}
function scanNumberFast(src, pos) {
  const len = src.length;
  let i = pos;
  if (i < len && src.charCodeAt(i) === CC_MINUS) i++;
  const c = i < len ? src.charCodeAt(i) : -1;
  if (isDigit(c)) {
    if (c === CC_0) {
      i++;
    } else {
      i++;
      while (i < len && isDigit(src.charCodeAt(i))) i++;
    }
    if (i < len && src.charCodeAt(i) === CC_DOT) {
      let j = i + 1;
      let frac = false;
      while (j < len && isDigit(src.charCodeAt(j))) {
        j++;
        frac = true;
      }
      if (frac) i = j;
    }
  } else if (c === CC_DOT) {
    let j = i + 1;
    let frac = false;
    while (j < len && isDigit(src.charCodeAt(j))) {
      j++;
      frac = true;
    }
    if (!frac) return pos;
    i = j;
  } else {
    return pos;
  }
  if (i < len) {
    const e = src.charCodeAt(i);
    if (e === CC_e || e === CC_E) {
      let j = i + 1;
      if (j < len) {
        const sign = src.charCodeAt(j);
        if (sign === CC_PLUS || sign === CC_MINUS) j++;
      }
      let exp = false;
      let k = j;
      while (k < len && isDigit(src.charCodeAt(k))) {
        k++;
        exp = true;
      }
      if (exp) i = k;
    }
  }
  return i;
}
var identFastParser = new Parser((state) => {
  const end = scanIdentFast(state.src, state.offset);
  if (end === state.offset) return state.err(void 0, 0);
  return state.ok(state.src.slice(state.offset, end), end - state.offset);
});
var numberFastParser = new Parser((state) => {
  const end = scanNumberFast(state.src, state.offset);
  if (end === state.offset) return state.err(void 0, 0);
  return state.ok(
    Number(state.src.slice(state.offset, end)),
    end - state.offset
  );
});
var istring = (str) => {
  const re = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  return regex(re);
};
var unitToken = regex(/[a-zA-Z]+/);
var unitParser = (units) => {
  const lut = /* @__PURE__ */ new Map();
  for (const u of units) lut.set(u.toLowerCase(), u);
  return unitToken.chain((token) => {
    const canonical = lut.get(token.toLowerCase());
    return canonical != null ? succeed(canonical) : fail(`unit:${token}`);
  });
};
var identifier = identFastParser;
function scanDashedIdentFast(src, pos) {
  const len = src.length;
  let i = pos;
  if (i + 1 >= len) return pos;
  if (src.charCodeAt(i) !== CC_MINUS || src.charCodeAt(i + 1) !== CC_MINUS) {
    return pos;
  }
  i += 2;
  if (i >= len || !isIdentContinue(src.charCodeAt(i))) return pos;
  i++;
  while (i < len && isIdentContinue(src.charCodeAt(i))) i++;
  return i;
}
var dashedIdentifier = new Parser(
  (state) => {
    const end = scanDashedIdentFast(state.src, state.offset);
    if (end === state.offset) return state.err(void 0, 0);
    return state.ok(
      state.src.slice(state.offset, end),
      end - state.offset
    );
  }
);
var none = istring("none");
var BRACKETS_ROUND = { round: true };
var BRACKETS_ROUND_SQUARE = { round: true, square: true };
var BRACKETS_ALL = { round: true, square: true, curly: true };
function walkBalanced(input, atTop, opts = {}) {
  const strings = opts.strings ?? true;
  const b = opts.brackets;
  const round = b ? b.round === true : true;
  const square = b ? b.square === true : true;
  const curly = b ? b.curly === true : true;
  const stopUnbalanced = opts.stopOnUnbalancedClose ?? false;
  let paren = 0;
  let brack = 0;
  let curlyD = 0;
  let inString = null;
  let i = opts.start ?? 0;
  for (; i < input.length; i++) {
    const ch2 = input[i];
    if (strings && inString) {
      if (ch2 === "\\" && i + 1 < input.length) {
        i++;
        continue;
      }
      if (ch2 === inString) inString = null;
      continue;
    }
    if (strings && (ch2 === '"' || ch2 === "'")) {
      inString = ch2;
      continue;
    }
    if (paren === 0 && brack === 0 && curlyD === 0 && atTop(i)) {
      return i;
    }
    if (round && ch2 === "(") paren++;
    else if (round && ch2 === ")") {
      if (paren === 0 && stopUnbalanced) return i;
      paren--;
    } else if (square && ch2 === "[") brack++;
    else if (square && ch2 === "]") {
      if (brack === 0 && stopUnbalanced) return i;
      brack--;
    } else if (curly && ch2 === "{") curlyD++;
    else if (curly && ch2 === "}") {
      if (curlyD === 0 && stopUnbalanced) return i;
      curlyD--;
    }
  }
  return i;
}
var pushSegment = (out, seg, trim, keepEmpty) => {
  const s = trim ? seg.trim() : seg;
  if (keepEmpty || s.length > 0) out.push(s);
};
function splitTopLevel(input, isDelim, opts = {}) {
  const trim = opts.trim ?? true;
  const keepEmpty = opts.keepEmpty ?? false;
  const out = [];
  let segStart = opts.start ?? 0;
  walkBalanced(
    input,
    (i) => {
      if (isDelim(input[i])) {
        pushSegment(out, input.slice(segStart, i), trim, keepEmpty);
        segStart = i + 1;
      }
      return false;
    },
    opts
  );
  pushSegment(out, input.slice(segStart), trim, keepEmpty);
  return out;
}
function findTopLevel(input, isDelim, opts = {}) {
  let found = -1;
  walkBalanced(
    input,
    (i) => {
      if (isDelim(input[i])) {
        found = i;
        return true;
      }
      return false;
    },
    opts
  );
  return found;
}
var balancedText = (stop) => new Parser((state) => {
  const start = state.offset;
  const end = walkBalanced(state.src, (i) => stop(state.src, i, 0), {
    start,
    brackets: BRACKETS_ALL,
    strings: true,
    stopOnUnbalancedClose: true
  });
  return state.ok(state.src.slice(start, end), end - start);
});
var splitTopLevelCommas = (input) => splitTopLevel(input, (ch2) => ch2 === ",", { brackets: BRACKETS_ROUND });
var integer = regex(/-?\d+/).map(Number);
var number = numberFastParser;
function succeed(value) {
  return new Parser((state) => {
    return state.ok(value, 0);
  });
}
function fail(message) {
  return new Parser((state) => {
    mergeErrorState(state, message);
    return state.err(void 0, 0);
  });
}
function buildDiagnostic(state, input) {
  const offset = state.furthest ?? state.offset;
  const start = Math.max(0, offset - 8);
  const end = Math.min(input.length, offset + 8);
  const context = input.slice(start, end);
  const lc = state.getLineAndColumn?.(offset) ?? { line: 1, column: offset };
  return {
    message: `Parse error at offset ${offset}: "...${context}..."`,
    offset,
    line: lc.line,
    column: lc.column,
    // Only attach `expected` when parse-that recorded it (exactOptional).
    ...state.expected ? { expected: state.expected } : {},
    input
  };
}
function tryParse(parser, input, onParseError) {
  const state = parser.parseState(input);
  if (state.isError) {
    const diagnostic = buildDiagnostic(state, input);
    onParseError?.(diagnostic);
    throw new Error(diagnostic.message);
  }
  return state.value;
}
function parseResult(parser, input, onParseError) {
  const state = parser.parseState(input);
  if (state.isError && onParseError) {
    onParseError(buildDiagnostic(state, input));
  }
  return { status: !state.isError, value: state.value };
}

// deposed-full/src/math.ts
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function scale(value, fromMin, fromMax, toMin = 0, toMax = 1) {
  const slope = (toMax - toMin) / (fromMax - fromMin);
  if (fromMax === fromMin) {
    throw new Error("fromMax and fromMin cannot be equal");
  }
  return (value - fromMin) * slope + toMin;
}
function lerp(start, end, t) {
  return (1 - t) * start + t * end;
}

// deposed-full/src/units/color/matrix.ts
function transformMat3(v, m) {
  const [x, y, z] = v;
  return [
    m[0] * x + m[1] * y + m[2] * z,
    m[3] * x + m[4] * y + m[5] * z,
    m[6] * x + m[7] * y + m[8] * z
  ];
}
function transformMat3Into(v, m, out) {
  const x = v[0];
  const y = v[1];
  const z = v[2];
  out[0] = m[0] * x + m[1] * y + m[2] * z;
  out[1] = m[3] * x + m[4] * y + m[5] * z;
  out[2] = m[6] * x + m[7] * y + m[8] * z;
  return out;
}
function invertMat3(m) {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h;
  const B = -(d * i - f * g);
  const C = d * h - e * g;
  const det = a * A + b * B + c * C;
  const invDet = 1 / det;
  return [
    A * invDet,
    (c * h - b * i) * invDet,
    (b * f - c * e) * invDet,
    B * invDet,
    (a * i - c * g) * invDet,
    (c * d - a * f) * invDet,
    C * invDet,
    (b * g - a * h) * invDet,
    (a * e - b * d) * invDet
  ];
}

// deposed-full/src/units/color/constants.ts
var RGBA_MAX = 255;
var ALPHA_RANGE = {
  "%": { min: 0, max: 100 },
  number: { min: 0, max: 1 }
};
var RGB_RANGE = {
  "%": ALPHA_RANGE["%"],
  number: { min: 0, max: RGBA_MAX }
};
var UNIT_RANGE = {
  "%": ALPHA_RANGE["%"],
  number: ALPHA_RANGE.number
};
var HUE_RANGE = {
  deg: { min: 0, max: 360 },
  number: { min: 0, max: 360 },
  "%": ALPHA_RANGE["%"]
};
var COLOR_SPACE_RANGES = {
  rgb: {
    r: RGB_RANGE,
    g: RGB_RANGE,
    b: RGB_RANGE,
    alpha: ALPHA_RANGE
  },
  hsl: {
    h: HUE_RANGE,
    s: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    alpha: ALPHA_RANGE
  },
  hsv: {
    h: HUE_RANGE,
    s: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    v: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    alpha: ALPHA_RANGE
  },
  hwb: {
    h: HUE_RANGE,
    w: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    b: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    alpha: ALPHA_RANGE
  },
  lab: {
    l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE["%"] },
    a: { number: { min: -125, max: 125 }, "%": { min: -100, max: 100 } },
    b: { number: { min: -125, max: 125 }, "%": { min: -100, max: 100 } },
    alpha: ALPHA_RANGE
  },
  lch: {
    l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE["%"] },
    c: { number: { min: 0, max: 150 }, "%": ALPHA_RANGE["%"] },
    h: HUE_RANGE,
    alpha: ALPHA_RANGE
  },
  oklab: {
    l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    a: { number: { min: -0.4, max: 0.4 }, "%": { min: -100, max: 100 } },
    b: { number: { min: -0.4, max: 0.4 }, "%": { min: -100, max: 100 } },
    alpha: ALPHA_RANGE
  },
  oklch: {
    l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    c: { number: { min: 0, max: 0.5 }, "%": ALPHA_RANGE["%"] },
    h: HUE_RANGE,
    alpha: ALPHA_RANGE
  },
  xyz: {
    x: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    y: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    z: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    alpha: ALPHA_RANGE
  },
  kelvin: {
    kelvin: { number: { min: 1e3, max: 4e4 } },
    alpha: ALPHA_RANGE
  },
  "srgb-linear": {
    r: UNIT_RANGE,
    g: UNIT_RANGE,
    b: UNIT_RANGE,
    alpha: ALPHA_RANGE
  },
  "display-p3": {
    r: UNIT_RANGE,
    g: UNIT_RANGE,
    b: UNIT_RANGE,
    alpha: ALPHA_RANGE
  },
  "a98-rgb": {
    r: UNIT_RANGE,
    g: UNIT_RANGE,
    b: UNIT_RANGE,
    alpha: ALPHA_RANGE
  },
  "prophoto-rgb": {
    r: UNIT_RANGE,
    g: UNIT_RANGE,
    b: UNIT_RANGE,
    alpha: ALPHA_RANGE
  },
  rec2020: {
    r: UNIT_RANGE,
    g: UNIT_RANGE,
    b: UNIT_RANGE,
    alpha: ALPHA_RANGE
  },
  // ICtCp (BT.2100) — S.W1-6/Q9 remediation (3.1.0). Physical coordinates:
  // I ∈ [0,1] (PQ-lightness), Ct/Cp ∈ ~[-0.5,0.5] (tritan/protan opponent
  // axes). The `%` views mirror the oklab a/b convention ([-100,100] ↔ the
  // physical opponent span). The forward wrapper (`conversions/ictcp.ts`)
  // normalizes physical → [0,1] against these exact bounds; the inverse
  // denormalizes back, so the roundtrip is bound-consistent by construction.
  ictcp: {
    i: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
    ct: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
    cp: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
    alpha: ALPHA_RANGE
  },
  // Jzazbz (Safdar 2017) — S.W1-11/Q9 remediation (3.1.0). Physical
  // coordinates: Jz ∈ [0,0.222] (the colorjs `xyz-abs-d65` convention — D65
  // media white lands at Jz≈0.2220652, so the bound normalizes white to ~1),
  // az/bz ∈ ~[-0.5,0.5] (red-green / yellow-blue opponent axes).
  jzazbz: {
    jz: { "%": ALPHA_RANGE["%"], number: { min: 0, max: 0.222 } },
    az: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
    bz: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
    alpha: ALPHA_RANGE
  }
};
var ALPHA_DENORM_UNIT = "%";
var COLOR_SPACE_DENORM_UNITS = {
  rgb: {
    r: "",
    g: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  hsl: {
    h: "deg",
    s: "%",
    l: "%",
    alpha: ALPHA_DENORM_UNIT
  },
  hsv: {
    h: "deg",
    s: "%",
    v: "%",
    alpha: ALPHA_DENORM_UNIT
  },
  hwb: {
    h: "deg",
    w: "%",
    b: "%",
    alpha: ALPHA_DENORM_UNIT
  },
  lab: {
    l: "%",
    a: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  lch: {
    l: "%",
    c: "",
    h: "deg",
    alpha: ALPHA_DENORM_UNIT
  },
  oklab: {
    l: "%",
    a: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  oklch: {
    l: "%",
    c: "",
    h: "deg",
    alpha: ALPHA_DENORM_UNIT
  },
  xyz: {
    x: "%",
    y: "%",
    z: "%",
    alpha: ALPHA_DENORM_UNIT
  },
  kelvin: {
    kelvin: "K",
    alpha: ALPHA_DENORM_UNIT
  },
  "srgb-linear": {
    r: "",
    g: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  "display-p3": {
    r: "",
    g: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  "a98-rgb": {
    r: "",
    g: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  "prophoto-rgb": {
    r: "",
    g: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  rec2020: {
    r: "",
    g: "",
    b: "",
    alpha: ALPHA_DENORM_UNIT
  },
  // ICtCp / Jzazbz emit their true physical coordinates (bare numbers, unit
  // "") — a reader of `ictcp(0.58 0 0)` / `jzazbz(0.222 -0.0002 -0.0001)` sees
  // the actual I/Ct/Cp / Jz/az/bz, not a % re-scale (S.W1 remediation, 3.1.0).
  ictcp: {
    i: "",
    ct: "",
    cp: "",
    alpha: ALPHA_DENORM_UNIT
  },
  jzazbz: {
    jz: "",
    az: "",
    bz: "",
    alpha: ALPHA_DENORM_UNIT
  }
};
var COLOR_FUNCTION_FORM = {
  rgb: "named",
  hsl: "named",
  hwb: "named",
  hsv: "named",
  lab: "named",
  lch: "named",
  oklab: "named",
  oklch: "named",
  // CSS `color()` predefined / xyz spaces — the bare-name form is invalid CSS.
  xyz: "color",
  kelvin: "named",
  "srgb-linear": "color",
  "display-p3": "color",
  "a98-rgb": "color",
  "prophoto-rgb": "color",
  rec2020: "color",
  // Bare functional form `ictcp(…)` / `jzazbz(…)` (the CSS Color HDR draft
  // syntax; mirrors the `hsv(…)` non-CSS-native precedent).
  ictcp: "named",
  jzazbz: "named"
};
var getColorSpaceBound = (colorSpace, component, unit) => {
  const space2 = COLOR_SPACE_RANGES[colorSpace];
  const ranges = space2[component] ?? {};
  return ranges[unit] ?? ranges.number;
};
var getColorSpaceDenormUnit = (colorSpace, component) => {
  const units = COLOR_SPACE_DENORM_UNITS[colorSpace];
  return units[component] ?? "";
};
var WHITE_POINT_D65 = [
  0.3127 / 0.329,
  1,
  (1 - 0.3127 - 0.329) / 0.329
];
var WHITE_POINT_D50 = [
  0.3457 / 0.3585,
  1,
  (1 - 0.3457 - 0.3585) / 0.3585
];
var WHITE_POINT_D65_D50 = [
  1.0479297925449969,
  0.022946870601609652,
  -0.05019226628920524,
  0.02962780877005599,
  0.9904344267538799,
  -0.017073799063418826,
  -0.009243040646204504,
  0.015055191490298152,
  0.7518742814281371
];
var WHITE_POINT_D50_D65 = invertMat3(WHITE_POINT_D65_D50);
var WHITE_POINTS = {
  D65: WHITE_POINT_D65,
  D50: WHITE_POINT_D50
};

// deposed-full/src/units/color/serialize.ts
var hasToFixed = (value) => value != null && typeof value.toFixed === "function";
var formatNumber = (value, digits = 2) => {
  if (typeof value === "number" && !Number.isFinite(value)) return "none";
  const fixed = hasToFixed(value) ? value.toFixed(digits) : String(value);
  return fixed.trim().replace(/\.0+$/, "");
};
var formatAnimationNumber = (value, digits) => {
  if (Number.isNaN(value)) return "none";
  const fixed = value.toFixed(digits);
  return fixed.includes(".") ? fixed.replace(/0+$/, "").replace(/\.$/, "") : fixed;
};
var formatColor = (colorSpace, values, alpha) => {
  const wrap = COLOR_FUNCTION_FORM[colorSpace] === "color";
  const head = wrap ? `color(${colorSpace} ` : `${colorSpace}(`;
  if (Number(alpha) === 1) {
    return `${head}${values.join(" ")})`;
  }
  return `${head}${values.join(" ")} / ${alpha})`;
};
var ANIMATION_SCRATCH = [];
var formatAnimationColor = (colorSpace, channelCount, alpha) => {
  let channels = ANIMATION_SCRATCH[0];
  for (let i = 1; i < channelCount; i++) channels += " " + ANIMATION_SCRATCH[i];
  const body = COLOR_FUNCTION_FORM[colorSpace] === "color" ? `color(${colorSpace} ${channels}` : `${colorSpace}(${channels}`;
  return Number(alpha) === 1 ? `${body})` : `${body} / ${alpha})`;
};
var writeAnimationScratch = (channels, read, digits) => {
  for (let i = 0; i < channels.length; i++) {
    ANIMATION_SCRATCH[i] = formatAnimationNumber(read(channels[i]), digits);
  }
  return channels.length;
};
var asChannelWrapper = (v) => {
  if (v != null && typeof v === "object" && v.constructor?.name === "ValueUnit") {
    return v;
  }
  return void 0;
};
var _color2;
var _gamutMap;
var registerColorConverters = (color22, gamutMap2) => {
  _color2 = color22;
  _gamutMap = gamutMap2;
};
var EMIT_GAMUT_SPACES = /* @__PURE__ */ new Set([
  "rgb",
  "srgb-linear",
  "display-p3",
  "a98-rgb",
  "prophoto-rgb",
  "rec2020"
]);
var convertColorSpaceDenorm = (color, to) => {
  if (_color2 === void 0 || _gamutMap === void 0) {
    throw new Error(
      "color serialize: space converters not registered \u2014 import the color dispatch module before an output-space toAnimationString()."
    );
  }
  const from = color.colorSpace;
  const normalized = color.clone();
  for (const k of normalized.channels) {
    const channel = color[k];
    const wrapper = asChannelWrapper(channel);
    const raw = wrapper ? wrapper.value : channel;
    const unit = wrapper ? wrapper.unit ?? "" : "";
    const { min, max } = getColorSpaceBound(from, k, unit);
    normalized[k] = scale(raw, min, max, 0, 1);
  }
  let converted = _color2(normalized, to);
  if (EMIT_GAMUT_SPACES.has(to)) {
    converted = _gamutMap(converted, to);
  }
  for (const k of converted.channels) {
    const { min, max } = getColorSpaceBound(to, k, "number");
    converted[k] = scale(converted[k], 0, 1, min, max);
  }
  return converted;
};

// deposed-full/src/units/color/base.ts
var ch = (v) => v;
var channelOf = (color, key) => color[key];
var setChannel = (color, key, value) => {
  color[key] = value;
};
var Color = class _Color {
  constructor(colorSpace, alpha = 1) {
    this.colorSpace = colorSpace;
    this.alpha = alpha;
  }
  /**
   * Reference white point for this color instance.
   *
   * E.W1 Lane B (WhitePointColor lift): hoisted from the deleted
   * `WhitePointColor<T>` intermediate class to the base. Optional with a
   * D65 default — the historically D50 spaces (`LABColor`, `OKLABColor`)
   * set `"D50"` explicitly in their constructors; `XYZColor` keeps the
   * D65 default to mirror its prior `super(…, "D65")` call.
   *
   * Subclasses that don't carry a meaningful white point (HSL/HSV/HWB
   * cylindrical, KelvinColor) leave it as the inherited default; reads
   * are harmless and the field is monomorphic across all 14 subclasses
   * (V8 hidden-class stable — verified by `bench/color-channel-access.mjs`).
   */
  whitePoint = "D65";
  // L8 hardening primitive (b) — dev-only nesting assertion.
  // Static helper invoked from subclass constructors, gated behind the
  // dev flag. The production build inlines the flag to false and esbuild
  // minify-DCE strips the call site (verified by an audit-doc grep).
  static _assertChannel(value) {
    if (value instanceof _Color) {
      throw new Error(
        "Color channel nesting detected: tried to assign a Color into a channel slot. This is the iOS Safari stack-overflow pattern. Unwrap before assigning."
      );
    }
    const vu = value;
    const inner = vu?.value;
    if (value != null && typeof value === "object" && vu.constructor?.name === "ValueUnit" && inner != null && typeof inner === "object" && inner.constructor?.name === "ValueUnit") {
      throw new Error(
        "ValueUnit double-wrap detected: tried to assign ValueUnit<ValueUnit<\u2026>>. Unwrap before assigning."
      );
    }
  }
  // L8 hardening primitive (d) — clone() depth-guard.
  // Single static counter; tripped if the structure exceeds 16 levels.
  // Legitimate chains bottom out at depth 3 — threshold is generous.
  static _cloneDepth = 0;
  static CLONE_DEPTH_LIMIT = 16;
  toString() {
    const values = this.values().slice(0, -1).map(
      (v) => Number.isNaN(Number(v)) ? "none" : v
    );
    const alpha = Number.isNaN(Number(this.alpha)) ? "none" : this.alpha;
    return formatColor(this.colorSpace, values, alpha);
  }
  toFormattedString(digits = 2) {
    const values = this.values().slice(0, -1).map((value) => formatNumber(value, digits));
    const alpha = formatNumber(this.alpha, digits);
    return formatColor(this.colorSpace, values, alpha);
  }
  /**
   * The apply-path color serializer (N.W7.A B1 + B2).
   *
   * Emits a compact (`digits`-precision) **CSS-valid** color string for the
   * keyframes apply path. Two halves:
   *
   * **B1 — zero-alloc.** Channels are written into a reused module scratch
   * buffer (`ANIMATION_SCRATCH`) rather than `values().slice().map()`, so a
   * per-frame call allocates no channel array. The alpha clause routes through
   * the single B1b choke point (`formatAnimationColor`) — `/ 1` is omitted at
   * full opacity. `none`/NaN channels serialize as `"none"`.
   *
   * **B2 — output-space emit (the corrected emit-space rule).**
   * `<color-interpolation-method>` is a CSS data type, not a settable property;
   * for a WAAPI keyframe the UA picks the interp space *implicitly* from the
   * value's syntax family (CSS Color 4 §12). So `outputSpace` requests the
   * interp space and the serializer emits the color **in a syntax family whose
   * implicit interp space equals the request**:
   *   - a non-legacy request (`oklab` default, `oklch`, `display-p3`, …) emits
   *     that space's non-legacy syntax — even if the color was authored
   *     `rgb(...)` — so the UA interpolates in the requested space;
   *   - a legacy `srgb`/`rgb` request emits the legacy `rgb(...)` form (the
   *     correct family for explicit-sRGB / gradient / `color-mix` contexts).
   *
   * `toString` / `toFormattedString` stay the canonical round-trip
   * serializers; this is the separate apply-path emitter.
   */
  toAnimationString(digits = 4, outputSpace) {
    const requested = outputSpace === "srgb" ? "rgb" : outputSpace;
    const emit = requested != null && requested !== this.colorSpace ? convertColorSpaceDenorm(this, requested) : this;
    const space2 = emit.colorSpace;
    const count = writeAnimationScratch(
      emit.channels,
      (k) => Number(emit[k]),
      digits
    );
    const alpha = formatAnimationNumber(Number(emit.alpha), digits);
    return formatAnimationColor(space2, count, alpha);
  }
  valueOf() {
    return [...this.values(), this.alpha];
  }
  toJSON() {
    const obj = {};
    for (const [key, value] of this.entries()) {
      obj[key] = value;
    }
    obj["alpha"] = this.alpha;
    return obj;
  }
  clone() {
    if (++_Color._cloneDepth > _Color.CLONE_DEPTH_LIMIT) {
      _Color._cloneDepth = 0;
      throw new Error(
        `Color.clone() exceeded depth ${_Color.CLONE_DEPTH_LIMIT}. This is the iOS Safari stack-overflow precursor. Inspect the structure for ValueUnit/Color self-nesting.`
      );
    }
    try {
      const C = this.constructor;
      const cloned = new C();
      cloned.alpha = clone(this.alpha);
      for (const k of this.channels) {
        setChannel(cloned, k, clone(channelOf(this, k)));
      }
      return cloned;
    } finally {
      _Color._cloneDepth--;
    }
  }
  /**
   * Return the ordered list of channel keys followed by `"alpha"`.
   *
   * E.W1 Lane C — cached as a static-per-subclass `readonly` tuple
   * (`channelKeysWithAlpha`). Pre-Lane-C this allocated a new array on every
   * call via `[...this.channels, "alpha"]`; the demo gradient interpolation
   * + `lerpColorValue` + `mixColors` + `normalizeColor` all hit this path
   * per frame, so the per-call array churn was measurable.
   *
   * Subclasses define their own `static readonly channelKeysWithAlpha`
   * (frozen tuple); the base falls back to a synthesized array for the
   * abstract case (never reached in normal flow — there is no abstract
   * `Color` instance — but kept for type safety).
   */
  keys() {
    const C = this.constructor;
    return C.channelKeysWithAlpha ?? [...this.channels, "alpha"];
  }
  values() {
    const out = [];
    const keys = this.channels;
    for (let i = 0; i < keys.length; i++) out.push(channelOf(this, keys[i]));
    out.push(this.alpha);
    return out;
  }
  entries() {
    const out = [];
    const keys = this.channels;
    for (let i = 0; i < keys.length; i++) {
      out.push([keys[i], channelOf(this, keys[i])]);
    }
    out.push(["alpha", this.alpha]);
    return out;
  }
};

// deposed-full/src/units/color/spaces.ts
var _RGB_CHANNELS = ["r", "g", "b"];
var _HSL_CHANNELS = ["h", "s", "l"];
var _HSV_CHANNELS = ["h", "s", "v"];
var _HWB_CHANNELS = ["h", "w", "b"];
var _LAB_CHANNELS = ["l", "a", "b"];
var _LCH_CHANNELS = ["l", "c", "h"];
var _XYZ_CHANNELS = ["x", "y", "z"];
var _KELVIN_CHANNELS = ["kelvin"];
var _ICTCP_CHANNELS = ["i", "ct", "cp"];
var _JZAZBZ_CHANNELS = ["jz", "az", "bz"];
var _RGB_KEYS_A = ["r", "g", "b", "alpha"];
var _HSL_KEYS_A = ["h", "s", "l", "alpha"];
var _HSV_KEYS_A = ["h", "s", "v", "alpha"];
var _HWB_KEYS_A = ["h", "w", "b", "alpha"];
var _LAB_KEYS_A = ["l", "a", "b", "alpha"];
var _LCH_KEYS_A = ["l", "c", "h", "alpha"];
var _XYZ_KEYS_A = ["x", "y", "z", "alpha"];
var _KELVIN_KEYS_A = ["kelvin", "alpha"];
var _ICTCP_KEYS_A = ["i", "ct", "cp", "alpha"];
var _JZAZBZ_KEYS_A = ["jz", "az", "bz", "alpha"];
var RGBColor = class extends Color {
  static channelKeysWithAlpha = _RGB_KEYS_A;
  get channels() {
    return _RGB_CHANNELS;
  }
  constructor(r, g, b, alpha) {
    super("rgb", alpha);
    if (false) {
      Color._assertChannel(r);
      Color._assertChannel(g);
      Color._assertChannel(b);
    }
    this.r = r;
    this.g = g;
    this.b = b;
  }
};
var HSLColor = class extends Color {
  static channelKeysWithAlpha = _HSL_KEYS_A;
  get channels() {
    return _HSL_CHANNELS;
  }
  constructor(h, s, l, alpha) {
    super("hsl", alpha);
    if (false) {
      Color._assertChannel(h);
      Color._assertChannel(s);
      Color._assertChannel(l);
    }
    this.h = h;
    this.s = s;
    this.l = l;
  }
};
var HSVColor = class extends Color {
  static channelKeysWithAlpha = _HSV_KEYS_A;
  get channels() {
    return _HSV_CHANNELS;
  }
  constructor(h, s, v, alpha) {
    super("hsv", alpha);
    if (false) {
      Color._assertChannel(h);
      Color._assertChannel(s);
      Color._assertChannel(v);
    }
    this.h = h;
    this.s = s;
    this.v = v;
  }
};
var HWBColor = class extends Color {
  static channelKeysWithAlpha = _HWB_KEYS_A;
  get channels() {
    return _HWB_CHANNELS;
  }
  constructor(h, w, b, alpha) {
    super("hwb", alpha);
    if (false) {
      Color._assertChannel(h);
      Color._assertChannel(w);
      Color._assertChannel(b);
    }
    this.h = h;
    this.w = w;
    this.b = b;
  }
};
var LABColor = class extends Color {
  static channelKeysWithAlpha = _LAB_KEYS_A;
  get channels() {
    return _LAB_CHANNELS;
  }
  constructor(l, a, b, alpha) {
    super("lab", alpha);
    this.whitePoint = "D50";
    if (false) {
      Color._assertChannel(l);
      Color._assertChannel(a);
      Color._assertChannel(b);
    }
    this.l = l;
    this.a = a;
    this.b = b;
  }
};
var LCHColor = class extends Color {
  static channelKeysWithAlpha = _LCH_KEYS_A;
  get channels() {
    return _LCH_CHANNELS;
  }
  constructor(l, c, h, alpha) {
    super("lch", alpha);
    if (false) {
      Color._assertChannel(l);
      Color._assertChannel(c);
      Color._assertChannel(h);
    }
    this.l = l;
    this.c = c;
    this.h = h;
  }
};
var OKLABColor = class extends Color {
  static channelKeysWithAlpha = _LAB_KEYS_A;
  get channels() {
    return _LAB_CHANNELS;
  }
  constructor(l, a, b, alpha) {
    super("oklab", alpha);
    this.whitePoint = "D50";
    if (false) {
      Color._assertChannel(l);
      Color._assertChannel(a);
      Color._assertChannel(b);
    }
    this.l = l;
    this.a = a;
    this.b = b;
  }
};
var OKLCHColor = class extends Color {
  static channelKeysWithAlpha = _LCH_KEYS_A;
  get channels() {
    return _LCH_CHANNELS;
  }
  constructor(l, c, h, alpha) {
    super("oklch", alpha);
    if (false) {
      Color._assertChannel(l);
      Color._assertChannel(c);
      Color._assertChannel(h);
    }
    this.l = l;
    this.c = c;
    this.h = h;
  }
};
var XYZColor = class extends Color {
  static channelKeysWithAlpha = _XYZ_KEYS_A;
  get channels() {
    return _XYZ_CHANNELS;
  }
  constructor(x, y, z, alpha) {
    super("xyz", alpha);
    if (false) {
      Color._assertChannel(x);
      Color._assertChannel(y);
      Color._assertChannel(z);
    }
    this.x = x;
    this.y = y;
    this.z = z;
  }
};
var KelvinColor = class extends Color {
  static channelKeysWithAlpha = _KELVIN_KEYS_A;
  get channels() {
    return _KELVIN_CHANNELS;
  }
  constructor(kelvin2, alpha) {
    super("kelvin", alpha);
    if (false) {
      Color._assertChannel(kelvin2);
    }
    this.kelvin = kelvin2;
  }
};
var LinearSRGBColor = class extends Color {
  static channelKeysWithAlpha = _RGB_KEYS_A;
  get channels() {
    return _RGB_CHANNELS;
  }
  constructor(r, g, b, alpha) {
    super("srgb-linear", alpha);
    if (false) {
      Color._assertChannel(r);
      Color._assertChannel(g);
      Color._assertChannel(b);
    }
    this.r = r;
    this.g = g;
    this.b = b;
  }
};
var DisplayP3Color = class extends Color {
  static channelKeysWithAlpha = _RGB_KEYS_A;
  get channels() {
    return _RGB_CHANNELS;
  }
  constructor(r, g, b, alpha) {
    super("display-p3", alpha);
    if (false) {
      Color._assertChannel(r);
      Color._assertChannel(g);
      Color._assertChannel(b);
    }
    this.r = r;
    this.g = g;
    this.b = b;
  }
};
var AdobeRGBColor = class extends Color {
  static channelKeysWithAlpha = _RGB_KEYS_A;
  get channels() {
    return _RGB_CHANNELS;
  }
  constructor(r, g, b, alpha) {
    super("a98-rgb", alpha);
    if (false) {
      Color._assertChannel(r);
      Color._assertChannel(g);
      Color._assertChannel(b);
    }
    this.r = r;
    this.g = g;
    this.b = b;
  }
};
var ProPhotoRGBColor = class extends Color {
  static channelKeysWithAlpha = _RGB_KEYS_A;
  get channels() {
    return _RGB_CHANNELS;
  }
  constructor(r, g, b, alpha) {
    super("prophoto-rgb", alpha);
    if (false) {
      Color._assertChannel(r);
      Color._assertChannel(g);
      Color._assertChannel(b);
    }
    this.r = r;
    this.g = g;
    this.b = b;
  }
};
var Rec2020Color = class extends Color {
  static channelKeysWithAlpha = _RGB_KEYS_A;
  get channels() {
    return _RGB_CHANNELS;
  }
  constructor(r, g, b, alpha) {
    super("rec2020", alpha);
    if (false) {
      Color._assertChannel(r);
      Color._assertChannel(g);
      Color._assertChannel(b);
    }
    this.r = r;
    this.g = g;
    this.b = b;
  }
};
var ICtCpColor = class extends Color {
  static channelKeysWithAlpha = _ICTCP_KEYS_A;
  get channels() {
    return _ICTCP_CHANNELS;
  }
  constructor(i, ct, cp, alpha) {
    super("ictcp", alpha);
    if (false) {
      Color._assertChannel(i);
      Color._assertChannel(ct);
      Color._assertChannel(cp);
    }
    this.i = i;
    this.ct = ct;
    this.cp = cp;
  }
};
var JzazbzColor = class extends Color {
  static channelKeysWithAlpha = _JZAZBZ_KEYS_A;
  get channels() {
    return _JZAZBZ_CHANNELS;
  }
  constructor(jz, az, bz, alpha) {
    super("jzazbz", alpha);
    if (false) {
      Color._assertChannel(jz);
      Color._assertChannel(az);
      Color._assertChannel(bz);
    }
    this.jz = jz;
    this.az = az;
    this.bz = bz;
  }
};

// deposed-full/src/units/color/conversions/matrices.ts
var XYZ_TO_LMS_MATRIX = [
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
var LMS_TO_XYZ_MATRIX = invertMat3(XYZ_TO_LMS_MATRIX);
var LMS_TO_OKLAB_MATRIX = [
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
var OKLAB_TO_LMS_MATRIX = invertMat3(LMS_TO_OKLAB_MATRIX);
var LMS_TO_LINEAR_SRGB = [
  4.0767416621,
  -3.3077115913,
  0.2309699292,
  -1.2684380046,
  2.6097574011,
  -0.3413193965,
  -0.0041960863,
  -0.7034186147,
  1.707614701
];
var LINEAR_SRGB_TO_LMS = [
  0.4122214708,
  0.5363325363,
  0.0514459929,
  0.2119034982,
  0.6806995451,
  0.1073969566,
  0.0883024619,
  0.2817188376,
  0.6299787005
];
var OKLAB_TO_LMS_COEFF = {
  l: [1, 0.3963377774, 0.2158037573],
  m: [1, -0.1055613458, -0.0638541728],
  s: [1, -0.0894841775, -1.291485548]
};

// deposed-full/src/units/color/conversions/transfer.ts
var SRGB_GAMMA = 2.4;
var SRGB_OFFSET = 0.055;
var SRGB_SLOPE = 12.92;
var SRGB_TRANSITION = 0.04045;
var SRGB_LINEAR_TRANSITION = SRGB_TRANSITION / SRGB_SLOPE;
function srgb2linear(channel) {
  const sign = channel < 0 ? -1 : 1;
  const abs = channel * sign;
  if (abs <= SRGB_TRANSITION) {
    return channel / SRGB_SLOPE;
  } else {
    return sign * ((abs + SRGB_OFFSET) / (1 + SRGB_OFFSET)) ** SRGB_GAMMA;
  }
}
function linear2srgb(channel) {
  const sign = channel < 0 ? -1 : 1;
  const abs = channel * sign;
  if (abs <= SRGB_LINEAR_TRANSITION) {
    return channel * SRGB_SLOPE;
  } else {
    return sign * ((1 + SRGB_OFFSET) * abs ** (1 / SRGB_GAMMA) - SRGB_OFFSET);
  }
}
var linearTransfer = (c) => c;
var ADOBE_RGB_GAMMA = 563 / 256;
function adobeRgb2linear(c) {
  const sign = c < 0 ? -1 : 1;
  return sign * Math.abs(c) ** ADOBE_RGB_GAMMA;
}
function linear2adobeRgb(c) {
  const sign = c < 0 ? -1 : 1;
  return sign * Math.abs(c) ** (1 / ADOBE_RGB_GAMMA);
}
var PROPHOTO_ET = 1 / 512;
var PROPHOTO_GAMMA = 1.8;
function proPhoto2linear(c) {
  const sign = c < 0 ? -1 : 1;
  const abs = Math.abs(c);
  return sign * (abs <= PROPHOTO_ET * 16 ? abs / 16 : abs ** PROPHOTO_GAMMA);
}
function linear2proPhoto(c) {
  const sign = c < 0 ? -1 : 1;
  const abs = Math.abs(c);
  return sign * (abs >= PROPHOTO_ET ? abs ** (1 / PROPHOTO_GAMMA) : abs * 16);
}
var REC2020_ALPHA = 1.09929682680944;
var REC2020_BETA = 0.018053968510807;
function rec20202linear(c) {
  const sign = c < 0 ? -1 : 1;
  const abs = Math.abs(c);
  if (abs < REC2020_BETA * 4.5) {
    return sign * abs / 4.5;
  }
  return sign * ((abs + REC2020_ALPHA - 1) / REC2020_ALPHA) ** (1 / 0.45);
}
function linear2rec2020(c) {
  const sign = c < 0 ? -1 : 1;
  const abs = Math.abs(c);
  if (abs >= REC2020_BETA) {
    return sign * (REC2020_ALPHA * abs ** 0.45 - (REC2020_ALPHA - 1));
  }
  return sign * 4.5 * abs;
}

// deposed-full/src/units/color/gamut/gamut.ts
var GAMUT_SECTOR_COEFFICIENTS = [
  {
    // Red sector: -1.88170328*a - 0.80936493*b > 1
    test: (a, b) => -1.88170328 * a - 0.80936493 * b > 1,
    k0: 1.19086277,
    k1: 1.76576728,
    k2: 0.59662641,
    k3: 0.75515197,
    k4: 0.56771245,
    wl: 4.0767416621,
    wm: -3.3077115913,
    ws: 0.2309699292
  },
  {
    // Green sector: 1.81444104*a - 1.19445276*b > 1
    test: (a, b) => 1.81444104 * a - 1.19445276 * b > 1,
    k0: 0.73956515,
    k1: -0.45954404,
    k2: 0.08285427,
    k3: 0.1254107,
    k4: 0.14503204,
    wl: -1.2684380046,
    wm: 2.6097574011,
    ws: -0.3413193965
  },
  {
    // Blue sector (fallback)
    test: () => true,
    k0: 1.35733652,
    k1: -915799e-8,
    k2: -1.1513021,
    k3: -0.50559606,
    k4: 692167e-8,
    wl: -0.0041960863,
    wm: -0.7034186147,
    ws: 1.707614701
  }
];
var DELTA_E_OK_JND = 0.02;
function deltaEOK(L1, a1, b1, L2, a2, b2) {
  const dL = L1 - L2;
  const da = a1 - a2;
  const db = b1 - b2;
  return Math.sqrt(dL * dL + da * da + db * db);
}
function oklab2linearSrgb(L, a, b) {
  const l_ = L + OKLAB_TO_LMS_COEFF.l[1] * a + OKLAB_TO_LMS_COEFF.l[2] * b;
  const m_ = L + OKLAB_TO_LMS_COEFF.m[1] * a + OKLAB_TO_LMS_COEFF.m[2] * b;
  const s_ = L + OKLAB_TO_LMS_COEFF.s[1] * a + OKLAB_TO_LMS_COEFF.s[2] * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return [
    LMS_TO_LINEAR_SRGB[0] * l + LMS_TO_LINEAR_SRGB[1] * m + LMS_TO_LINEAR_SRGB[2] * s,
    LMS_TO_LINEAR_SRGB[3] * l + LMS_TO_LINEAR_SRGB[4] * m + LMS_TO_LINEAR_SRGB[5] * s,
    LMS_TO_LINEAR_SRGB[6] * l + LMS_TO_LINEAR_SRGB[7] * m + LMS_TO_LINEAR_SRGB[8] * s
  ];
}
function isInSRGBGamut(r, g, b) {
  return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1;
}
function computeMaxSaturation(a_, b_) {
  const sector = GAMUT_SECTOR_COEFFICIENTS.find((s) => s.test(a_, b_));
  const { k0, k1, k2, k3, k4, wl, wm, ws: ws2 } = sector;
  let S = k0 + k1 * a_ + k2 * b_ + k3 * a_ * a_ + k4 * a_ * b_;
  const k_l = OKLAB_TO_LMS_COEFF.l[1] * a_ + OKLAB_TO_LMS_COEFF.l[2] * b_;
  const k_m = OKLAB_TO_LMS_COEFF.m[1] * a_ + OKLAB_TO_LMS_COEFF.m[2] * b_;
  const k_s = OKLAB_TO_LMS_COEFF.s[1] * a_ + OKLAB_TO_LMS_COEFF.s[2] * b_;
  {
    const l_ = 1 + S * k_l;
    const m_ = 1 + S * k_m;
    const s_ = 1 + S * k_s;
    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;
    const l_dS = 3 * k_l * l_ * l_;
    const m_dS = 3 * k_m * m_ * m_;
    const s_dS = 3 * k_s * s_ * s_;
    const l_dS2 = 6 * k_l * k_l * l_;
    const m_dS2 = 6 * k_m * k_m * m_;
    const s_dS2 = 6 * k_s * k_s * s_;
    const f = wl * l + wm * m + ws2 * s;
    const f1 = wl * l_dS + wm * m_dS + ws2 * s_dS;
    const f2 = wl * l_dS2 + wm * m_dS2 + ws2 * s_dS2;
    S = S - f * f1 / (f1 * f1 - 0.5 * f * f2);
  }
  return S;
}
function findCusp(a_, b_) {
  const S_cusp = computeMaxSaturation(a_, b_);
  const [r, g, b] = oklab2linearSrgb(1, S_cusp * a_, S_cusp * b_);
  const L_cusp = Math.cbrt(1 / Math.max(r, g, b));
  const C_cusp = L_cusp * S_cusp;
  return { L: L_cusp, C: C_cusp };
}
function findGamutIntersection(a_, b_, L1, C1, L0, cusp) {
  let t;
  if ((L1 - L0) * cusp.C - (cusp.L - L0) * C1 <= 0) {
    t = cusp.C * L0 / (C1 * cusp.L + cusp.C * (L0 - L1));
  } else {
    t = cusp.C * (L0 - 1) / (C1 * (cusp.L - 1) + cusp.C * (L0 - L1));
    const dL = L1 - L0;
    const dC = C1;
    const k_l = OKLAB_TO_LMS_COEFF.l[1] * a_ + OKLAB_TO_LMS_COEFF.l[2] * b_;
    const k_m = OKLAB_TO_LMS_COEFF.m[1] * a_ + OKLAB_TO_LMS_COEFF.m[2] * b_;
    const k_s = OKLAB_TO_LMS_COEFF.s[1] * a_ + OKLAB_TO_LMS_COEFF.s[2] * b_;
    const l_dt = dL + dC * k_l;
    const m_dt = dL + dC * k_m;
    const s_dt = dL + dC * k_s;
    {
      const L = L0 * (1 - t) + t * L1;
      const C = t * C1;
      const l_ = L + C * k_l;
      const m_ = L + C * k_m;
      const s_ = L + C * k_s;
      const l = l_ * l_ * l_;
      const m = m_ * m_ * m_;
      const s = s_ * s_ * s_;
      const ldt = 3 * l_dt * l_ * l_;
      const mdt = 3 * m_dt * m_ * m_;
      const sdt = 3 * s_dt * s_ * s_;
      const ldt2 = 6 * l_dt * l_dt * l_;
      const mdt2 = 6 * m_dt * m_dt * m_;
      const sdt2 = 6 * s_dt * s_dt * s_;
      const r = LMS_TO_LINEAR_SRGB[0] * l + LMS_TO_LINEAR_SRGB[1] * m + LMS_TO_LINEAR_SRGB[2] * s - 1;
      const r1 = LMS_TO_LINEAR_SRGB[0] * ldt + LMS_TO_LINEAR_SRGB[1] * mdt + LMS_TO_LINEAR_SRGB[2] * sdt;
      const r2 = LMS_TO_LINEAR_SRGB[0] * ldt2 + LMS_TO_LINEAR_SRGB[1] * mdt2 + LMS_TO_LINEAR_SRGB[2] * sdt2;
      const u_r = r1 / (r1 * r1 - 0.5 * r * r2);
      let t_r = -r * u_r;
      const g = LMS_TO_LINEAR_SRGB[3] * l + LMS_TO_LINEAR_SRGB[4] * m + LMS_TO_LINEAR_SRGB[5] * s - 1;
      const g1 = LMS_TO_LINEAR_SRGB[3] * ldt + LMS_TO_LINEAR_SRGB[4] * mdt + LMS_TO_LINEAR_SRGB[5] * sdt;
      const g2 = LMS_TO_LINEAR_SRGB[3] * ldt2 + LMS_TO_LINEAR_SRGB[4] * mdt2 + LMS_TO_LINEAR_SRGB[5] * sdt2;
      const u_g = g1 / (g1 * g1 - 0.5 * g * g2);
      let t_g = -g * u_g;
      const b_val = LMS_TO_LINEAR_SRGB[6] * l + LMS_TO_LINEAR_SRGB[7] * m + LMS_TO_LINEAR_SRGB[8] * s - 1;
      const b1 = LMS_TO_LINEAR_SRGB[6] * ldt + LMS_TO_LINEAR_SRGB[7] * mdt + LMS_TO_LINEAR_SRGB[8] * sdt;
      const b2 = LMS_TO_LINEAR_SRGB[6] * ldt2 + LMS_TO_LINEAR_SRGB[7] * mdt2 + LMS_TO_LINEAR_SRGB[8] * sdt2;
      const u_b = b1 / (b1 * b1 - 0.5 * b_val * b2);
      let t_b = -b_val * u_b;
      t_r = u_r >= 0 ? t_r : Infinity;
      t_g = u_g >= 0 ? t_g : Infinity;
      t_b = u_b >= 0 ? t_b : Infinity;
      t += Math.min(t_r, t_g, t_b);
    }
  }
  return t;
}
var GAMUT_EPS = 1e-5;
var GAMUT_ALPHA = 1;
function gamutMapOKLab(L, a, b) {
  const [rLin, gLin, bLin] = oklab2linearSrgb(L, a, b);
  if (isInSRGBGamut(rLin, gLin, bLin)) {
    return [L, a, b];
  }
  const C = Math.max(GAMUT_EPS, Math.sqrt(a * a + b * b));
  const a_ = a / C;
  const b_ = b / C;
  const cusp = findCusp(a_, b_);
  const Ld = L - 0.5;
  const e1 = 0.5 + Math.abs(Ld) + GAMUT_ALPHA * C;
  const L0 = 0.5 * (1 + Math.sign(Ld) * (e1 - Math.sqrt(e1 * e1 - 2 * Math.abs(Ld))));
  const t = findGamutIntersection(a_, b_, L, C, L0, cusp);
  const L_mapped = L0 * (1 - t) + t * L;
  const C_mapped = t * C;
  return [L_mapped, C_mapped * a_, C_mapped * b_];
}
function srgb2oklab(r, g, b) {
  const rLin = srgb2linear(r);
  const gLin = srgb2linear(g);
  const bLin = srgb2linear(b);
  const l_ = Math.cbrt(LINEAR_SRGB_TO_LMS[0] * rLin + LINEAR_SRGB_TO_LMS[1] * gLin + LINEAR_SRGB_TO_LMS[2] * bLin);
  const m_ = Math.cbrt(LINEAR_SRGB_TO_LMS[3] * rLin + LINEAR_SRGB_TO_LMS[4] * gLin + LINEAR_SRGB_TO_LMS[5] * bLin);
  const s_ = Math.cbrt(LINEAR_SRGB_TO_LMS[6] * rLin + LINEAR_SRGB_TO_LMS[7] * gLin + LINEAR_SRGB_TO_LMS[8] * bLin);
  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  ];
}
function gamutMapSRGB(r, g, b) {
  if (r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
    return [r, g, b];
  }
  const [L, a, bOk] = srgb2oklab(r, g, b);
  const [Lm, am, bm] = gamutMapOKLab(L, a, bOk);
  const [rM, gM, bM] = oklab2linearSrgb(Lm, am, bm);
  return [
    clamp(linear2srgb(rM), 0, 1),
    clamp(linear2srgb(gM), 0, 1),
    clamp(linear2srgb(bM), 0, 1)
  ];
}
function oklch2xyzTuple(l, c, h, out) {
  const cDenorm = scale(c, 0, 1, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);
  const hRad = h * 2 * Math.PI;
  const aRaw = Math.cos(hRad) * cDenorm;
  const bRaw = Math.sin(hRad) * cDenorm;
  const a = scale(
    scale(aRaw, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max),
    0,
    1,
    COLOR_SPACE_RANGES.oklab.a.number.min,
    COLOR_SPACE_RANGES.oklab.a.number.max
  );
  const b = scale(
    scale(bRaw, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max),
    0,
    1,
    COLOR_SPACE_RANGES.oklab.b.number.min,
    COLOR_SPACE_RANGES.oklab.b.number.max
  );
  const lLms = OKLAB_TO_LMS_MATRIX[0] * l + OKLAB_TO_LMS_MATRIX[1] * a + OKLAB_TO_LMS_MATRIX[2] * b;
  const mLms = OKLAB_TO_LMS_MATRIX[3] * l + OKLAB_TO_LMS_MATRIX[4] * a + OKLAB_TO_LMS_MATRIX[5] * b;
  const sLms = OKLAB_TO_LMS_MATRIX[6] * l + OKLAB_TO_LMS_MATRIX[7] * a + OKLAB_TO_LMS_MATRIX[8] * b;
  const lLin = lLms * lLms * lLms;
  const mLin = mLms * mLms * mLms;
  const sLin = sLms * sLms * sLms;
  out[0] = LMS_TO_XYZ_MATRIX[0] * lLin + LMS_TO_XYZ_MATRIX[1] * mLin + LMS_TO_XYZ_MATRIX[2] * sLin;
  out[1] = LMS_TO_XYZ_MATRIX[3] * lLin + LMS_TO_XYZ_MATRIX[4] * mLin + LMS_TO_XYZ_MATRIX[5] * sLin;
  out[2] = LMS_TO_XYZ_MATRIX[6] * lLin + LMS_TO_XYZ_MATRIX[7] * mLin + LMS_TO_XYZ_MATRIX[8] * sLin;
  return out;
}

// deposed-full/src/units/color/conversions/hex.ts
var HEX_BASE = 16;
var hex2rgb = (hex2) => {
  hex2 = hex2.slice(1);
  if (hex2.length <= 4) {
    const r = parseInt(hex2[0] + hex2[0], HEX_BASE);
    const g = parseInt(hex2[1] + hex2[1], HEX_BASE);
    const b = parseInt(hex2[2] + hex2[2], HEX_BASE);
    const alpha = hex2[3] ? parseInt(hex2[3] + hex2[3], HEX_BASE) / RGBA_MAX : 1;
    return new RGBColor(r, g, b, alpha);
  } else {
    const r = parseInt(hex2.slice(0, 2), HEX_BASE);
    const g = parseInt(hex2.slice(2, 4), HEX_BASE);
    const b = parseInt(hex2.slice(4, 6), HEX_BASE);
    const alpha = hex2.length === 8 ? parseInt(hex2.slice(6, 8), HEX_BASE) / RGBA_MAX : 1;
    return new RGBColor(r, g, b, alpha);
  }
};

// deposed-full/src/units/color/conversions/xyz-extended.ts
var RGB_XYZ_MATRIX = [
  0.41239079926595934,
  0.357584339383878,
  0.1804807884018343,
  0.21263900587151027,
  0.715168678767756,
  0.07219231536073371,
  0.01933081871559182,
  0.11919477979462598,
  0.9505321522496607
];
var XYZ_RGB_MATRIX = invertMat3(RGB_XYZ_MATRIX);
function rgb2xyz({ r, g, b, alpha }) {
  const linearRGB = [srgb2linear(r), srgb2linear(g), srgb2linear(b)];
  const [x, y, z] = transformMat3(linearRGB, RGB_XYZ_MATRIX);
  return new XYZColor(x, y, z, alpha);
}
var xyz2rgb = ({ x, y, z, alpha }, correctGamut = true) => {
  const linearRGB = transformMat3([x, y, z], XYZ_RGB_MATRIX);
  const r = linear2srgb(linearRGB[0]);
  const g = linear2srgb(linearRGB[1]);
  const b = linear2srgb(linearRGB[2]);
  if (correctGamut) {
    const rgb = gamutMap(new RGBColor(r, g, b, alpha));
    return new RGBColor(rgb.r, rgb.g, rgb.b, alpha);
  } else {
    return new RGBColor(r, g, b, alpha);
  }
};
var DISPLAY_P3_XYZ_MATRIX = [
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
var XYZ_DISPLAY_P3_MATRIX = invertMat3(DISPLAY_P3_XYZ_MATRIX);
var ADOBE_RGB_XYZ_MATRIX = [
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
var XYZ_ADOBE_RGB_MATRIX = invertMat3(ADOBE_RGB_XYZ_MATRIX);
var PROPHOTO_XYZ_D50_MATRIX = [
  0.7977604896723027,
  0.13518583717574031,
  0.0313493495815248,
  0.2880711282292934,
  0.7118432178101014,
  8565396060525902e-20,
  0,
  0,
  0.8251046025104602
];
var XYZ_D50_PROPHOTO_MATRIX = invertMat3(PROPHOTO_XYZ_D50_MATRIX);
var REC2020_XYZ_MATRIX = [
  0.6369580483012914,
  0.14461690358620832,
  0.1688809751641721,
  0.2627002120112671,
  0.6779980715188708,
  0.05930171646986196,
  0,
  0.028072693049087428,
  1.0609850577107909
];
var XYZ_REC2020_MATRIX = invertMat3(REC2020_XYZ_MATRIX);
function rgbFamily2xyz({ r, g, b, alpha }, transferDecode, toXyzMatrix) {
  const linear = [transferDecode(r), transferDecode(g), transferDecode(b)];
  const [x, y, z] = transformMat3(linear, toXyzMatrix);
  return new XYZColor(x, y, z, alpha);
}
function xyz2rgbFamily({ x, y, z, alpha }, fromXyzMatrix, transferEncode, wrap) {
  const linear = transformMat3([x, y, z], fromXyzMatrix);
  return wrap(
    transferEncode(linear[0]),
    transferEncode(linear[1]),
    transferEncode(linear[2]),
    alpha
  );
}
function linearSrgb2xyz(color) {
  return rgbFamily2xyz(color, linearTransfer, RGB_XYZ_MATRIX);
}
function xyz2linearSrgb(xyz) {
  return xyz2rgbFamily(
    xyz,
    XYZ_RGB_MATRIX,
    linearTransfer,
    (r, g, b, a) => new LinearSRGBColor(r, g, b, a)
  );
}
function displayP32xyz(color) {
  return rgbFamily2xyz(color, srgb2linear, DISPLAY_P3_XYZ_MATRIX);
}
function xyz2displayP3(xyz) {
  return xyz2rgbFamily(
    xyz,
    XYZ_DISPLAY_P3_MATRIX,
    linear2srgb,
    (r, g, b, a) => new DisplayP3Color(r, g, b, a)
  );
}
function adobeRgb2xyz(color) {
  return rgbFamily2xyz(color, adobeRgb2linear, ADOBE_RGB_XYZ_MATRIX);
}
function xyz2adobeRgb(xyz) {
  return xyz2rgbFamily(
    xyz,
    XYZ_ADOBE_RGB_MATRIX,
    linear2adobeRgb,
    (r, g, b, a) => new AdobeRGBColor(r, g, b, a)
  );
}
function proPhoto2xyz({ r, g, b, alpha }) {
  const linear = [proPhoto2linear(r), proPhoto2linear(g), proPhoto2linear(b)];
  const xyzD50 = transformMat3(linear, PROPHOTO_XYZ_D50_MATRIX);
  const [x, y, z] = transformMat3(xyzD50, WHITE_POINT_D50_D65);
  return new XYZColor(x, y, z, alpha);
}
function xyz2proPhoto({ x, y, z, alpha }) {
  const xyzD50 = transformMat3([x, y, z], WHITE_POINT_D65_D50);
  const linear = transformMat3(xyzD50, XYZ_D50_PROPHOTO_MATRIX);
  return new ProPhotoRGBColor(
    linear2proPhoto(linear[0]),
    linear2proPhoto(linear[1]),
    linear2proPhoto(linear[2]),
    alpha
  );
}
function rec20202xyz(color) {
  return rgbFamily2xyz(color, rec20202linear, REC2020_XYZ_MATRIX);
}
function xyz2rec2020(xyz) {
  return xyz2rgbFamily(
    xyz,
    XYZ_REC2020_MATRIX,
    linear2rec2020,
    (r, g, b, a) => new Rec2020Color(r, g, b, a)
  );
}
var _xyzFamilyVec = [0, 0, 0];
function xyz2rgbFamilyInto({ x, y, z, alpha }, fromXyzMatrix, transferEncode, out) {
  _xyzFamilyVec[0] = x;
  _xyzFamilyVec[1] = y;
  _xyzFamilyVec[2] = z;
  const linear = transformMat3Into(_xyzFamilyVec, fromXyzMatrix, _xyzFamilyVec);
  setChannel(out, "r", ch(transferEncode(linear[0])));
  setChannel(out, "g", ch(transferEncode(linear[1])));
  setChannel(out, "b", ch(transferEncode(linear[2])));
  out.alpha = ch(alpha);
  return out;
}
function xyz2linearSrgbInto(xyz, out) {
  return xyz2rgbFamilyInto(xyz, XYZ_RGB_MATRIX, linearTransfer, out);
}
function xyz2displayP3Into(xyz, out) {
  return xyz2rgbFamilyInto(xyz, XYZ_DISPLAY_P3_MATRIX, linear2srgb, out);
}
function xyz2adobeRgbInto(xyz, out) {
  return xyz2rgbFamilyInto(xyz, XYZ_ADOBE_RGB_MATRIX, linear2adobeRgb, out);
}
function xyz2rec2020Into(xyz, out) {
  return xyz2rgbFamilyInto(xyz, XYZ_REC2020_MATRIX, linear2rec2020, out);
}
function xyz2proPhotoInto({ x, y, z, alpha }, out) {
  _xyzFamilyVec[0] = x;
  _xyzFamilyVec[1] = y;
  _xyzFamilyVec[2] = z;
  transformMat3Into(_xyzFamilyVec, WHITE_POINT_D65_D50, _xyzFamilyVec);
  const linear = transformMat3Into(_xyzFamilyVec, XYZ_D50_PROPHOTO_MATRIX, _xyzFamilyVec);
  setChannel(out, "r", ch(linear2proPhoto(linear[0])));
  setChannel(out, "g", ch(linear2proPhoto(linear[1])));
  setChannel(out, "b", ch(linear2proPhoto(linear[2])));
  out.alpha = ch(alpha);
  return out;
}

// deposed-full/src/units/color/conversions/kelvin.ts
var MIN_TEMP = 1e3;
var MAX_TEMP = 4e4;
var TEMP_SCALE = 100;
var kelvin2rgb = ({ kelvin: kelvin2, alpha }) => {
  kelvin2 = ch(clamp(kelvin2, MIN_TEMP, MAX_TEMP) / TEMP_SCALE);
  let r, g, b;
  if (kelvin2 <= 66) {
    r = RGBA_MAX;
  } else {
    r = kelvin2 - 60;
    r = 329.698727446 * r ** -0.1332047592;
  }
  r = clamp(r, 0, RGBA_MAX) / RGBA_MAX;
  if (kelvin2 <= 66) {
    g = kelvin2;
    g = 99.4708025861 * Math.log(g) - 161.1195681661;
  } else {
    g = kelvin2 - 60;
    g = 288.1221695283 * g ** -0.0755148492;
  }
  g = clamp(g, 0, RGBA_MAX) / RGBA_MAX;
  if (kelvin2 >= 66) {
    b = RGBA_MAX;
  } else if (kelvin2 <= 19) {
    b = 0;
  } else {
    b = kelvin2 - 10;
    b = 138.5177312231 * Math.log(b) - 305.0447927307;
  }
  b = clamp(b, 0, RGBA_MAX) / RGBA_MAX;
  return new RGBColor(r, g, b, alpha);
};
var rgb2kelvin = ({ r, g, b, alpha }) => {
  r = ch(clamp(r * RGBA_MAX, 0, RGBA_MAX));
  g = ch(clamp(g * RGBA_MAX, 0, RGBA_MAX));
  b = ch(clamp(b * RGBA_MAX, 0, RGBA_MAX));
  let kelvin2;
  if (b === RGBA_MAX) {
    kelvin2 = 6600;
  } else if (b === 0) {
    kelvin2 = 1900;
  } else {
    kelvin2 = Math.exp((b + 305.0447927307) / 138.5177312231) + 10;
  }
  if (r < RGBA_MAX) {
    const redTemp = (329.698727446 / r) ** (1 / -0.1332047592) + 60;
    kelvin2 = Math.max(kelvin2, redTemp);
  }
  const greenTemp = kelvin2 <= 6600 ? Math.exp((g + 161.1195681661) / 99.4708025861) : (288.1221695283 / g) ** (1 / -0.0755148492) + 60;
  kelvin2 = (kelvin2 + greenTemp) / 2;
  kelvin2 = clamp(Math.round(kelvin2 * TEMP_SCALE), MIN_TEMP, MAX_TEMP);
  return new KelvinColor(kelvin2, alpha);
};
function kelvin2xyz(kelvin2) {
  const rgb = kelvin2rgb(kelvin2);
  return rgb2xyz(rgb);
}
function xyz2kelvin(xyz) {
  const rgb = xyz2rgb(xyz);
  return rgb2kelvin(rgb);
}

// deposed-full/src/units/color/conversions/cylindrical.ts
var hsv2hsl = ({ h, s, v, alpha }) => {
  const l = v - v * s / 2;
  let sl;
  if (l === 0 || l === 1) {
    sl = 0;
  } else {
    sl = (v - l) / Math.min(l, 1 - l);
  }
  return new HSLColor(h, sl, l, alpha);
};
var hsl2hsv = ({ h, s, l, alpha }) => {
  const v = l + s * Math.min(l, 1 - l);
  let sv;
  if (v === 0) {
    sv = 0;
  } else {
    sv = 2 * (1 - l / v);
  }
  return new HSVColor(h, sv, v, alpha);
};
var hwb2hsl = ({ h, w, b, alpha }) => {
  let s, v;
  const sum = w + b;
  if (sum >= 1) {
    v = w / sum;
    s = 0;
  } else {
    v = 1 - b;
    s = v === 0 ? 0 : 1 - w / v;
  }
  return hsv2hsl(new HSVColor(h, s, v, alpha));
};
var hsl2hwb = ({ h, s, l, alpha }) => {
  const { h: hh, s: ss, v } = hsl2hsv(new HSLColor(h, s, l, alpha));
  return new HWBColor(hh, v * (1 - ss), 1 - v, alpha);
};
var rgb2hsl = ({ r, g, b, alpha }) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let [h, s, l] = [0, 0, (max + min) / 2];
  const c = max - min;
  if (c === 0) return new HSLColor(0, 0, l, alpha);
  s = c / (1 - Math.abs(2 * l - 1));
  switch (max) {
    case r:
      h = (g - b) / c + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / c + 2;
      break;
    case b:
      h = (r - g) / c + 4;
      break;
  }
  h /= 6;
  if (s < 0) {
    h = (h + 0.5) % 1;
    s = Math.abs(s) % 1;
  }
  if (h >= 1) {
    h -= 1;
  }
  return new HSLColor(h, s, l, alpha);
};
function hsl2rgb({ h, s, l, alpha }) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h * 6 % 2 - 1));
  const m = l - c / 2;
  let r, g, b;
  if (h < 1 / 6) {
    [r, g, b] = [c, x, 0];
  } else if (h < 2 / 6) {
    [r, g, b] = [x, c, 0];
  } else if (h < 3 / 6) {
    [r, g, b] = [0, c, x];
  } else if (h < 4 / 6) {
    [r, g, b] = [0, x, c];
  } else if (h < 5 / 6) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  return new RGBColor(r + m, g + m, b + m, alpha);
}
function hsl2xyz(hsl) {
  const rgb = hsl2rgb(hsl);
  return rgb2xyz(rgb);
}
function xyz2hsl(xyz) {
  const rgb = xyz2rgb(xyz);
  return rgb2hsl(rgb);
}
function hsv2xyz(hsv) {
  const hsl = hsv2hsl(hsv);
  return hsl2xyz(hsl);
}
function xyz2hsv(xyz) {
  const hsl = xyz2hsl(xyz);
  return hsl2hsv(hsl);
}
function hwb2xyz(hwb) {
  const hsl = hwb2hsl(hwb);
  return hsl2xyz(hsl);
}
function xyz2hwb(xyz) {
  const hsl = xyz2hsl(xyz);
  return hsl2hwb(hsl);
}

// deposed-full/src/units/color/conversions/lab.ts
function xyzToD50(xyz) {
  if (xyz.whitePoint === "D50") return [xyz.x, xyz.y, xyz.z];
  if (xyz.whitePoint === "D65")
    return transformMat3([xyz.x, xyz.y, xyz.z], WHITE_POINT_D65_D50);
  throw new Error(`Unsupported white point: ${xyz.whitePoint}`);
}
function xyzToD65(xyz) {
  if (xyz.whitePoint === "D65") return [xyz.x, xyz.y, xyz.z];
  if (xyz.whitePoint === "D50")
    return transformMat3([xyz.x, xyz.y, xyz.z], WHITE_POINT_D50_D65);
  throw new Error(`Unsupported white point: ${xyz.whitePoint}`);
}
var LAB_EPSILON = 216 / 24389;
var LAB_EPSILON_3 = 24 / 116;
var LAB_KAPPA = 24389 / 27;
var LAB_KAPPA_EPSILON = 8;
var LAB_OFFSET = 16;
var LAB_SCALE_L = 116;
var LAB_SCALE_A = 500;
var LAB_SCALE_B = 200;
function xyz2lab(xyz, toWhitePoint = "D50") {
  const labFunction = (value) => value > LAB_EPSILON ? Math.cbrt(value) : (LAB_KAPPA * value + LAB_OFFSET) / LAB_SCALE_L;
  const whitePoint = WHITE_POINTS[toWhitePoint];
  const [x, y, z] = xyzToD50(xyz);
  const xr = x / whitePoint[0], yr = y / whitePoint[1], zr = z / whitePoint[2];
  const fx = labFunction(xr), fy = labFunction(yr), fz = labFunction(zr);
  const l = LAB_SCALE_L * fy - LAB_OFFSET;
  const a = LAB_SCALE_A * (fx - fy);
  const b = LAB_SCALE_B * (fy - fz);
  const lab = new LABColor(
    scale(
      l,
      COLOR_SPACE_RANGES.lab.l.number.min,
      COLOR_SPACE_RANGES.lab.l.number.max
    ),
    scale(
      a,
      COLOR_SPACE_RANGES.lab.a.number.min,
      COLOR_SPACE_RANGES.lab.a.number.max
    ),
    scale(
      b,
      COLOR_SPACE_RANGES.lab.b.number.min,
      COLOR_SPACE_RANGES.lab.b.number.max
    ),
    xyz.alpha
  );
  lab.whitePoint = toWhitePoint;
  return lab;
}
function lab2xyz(lab) {
  const labFunctionXZ = (value) => value > LAB_EPSILON_3 ? value ** 3 : (LAB_SCALE_L * value - LAB_OFFSET) / LAB_KAPPA;
  const labFunctionY = (value) => value > LAB_KAPPA_EPSILON ? ((value + LAB_OFFSET) / LAB_SCALE_L) ** 3 : value / LAB_KAPPA;
  const whitePoint = WHITE_POINTS[lab.whitePoint];
  let { l, a, b, alpha } = lab;
  l = ch(scale(
    l,
    0,
    1,
    COLOR_SPACE_RANGES.lab.l.number.min,
    COLOR_SPACE_RANGES.lab.l.number.max
  ));
  a = ch(scale(
    a,
    0,
    1,
    COLOR_SPACE_RANGES.lab.a.number.min,
    COLOR_SPACE_RANGES.lab.a.number.max
  ));
  b = ch(scale(
    b,
    0,
    1,
    COLOR_SPACE_RANGES.lab.b.number.min,
    COLOR_SPACE_RANGES.lab.b.number.max
  ));
  const fy = (l + LAB_OFFSET) / LAB_SCALE_L;
  const fx = a / LAB_SCALE_A + fy;
  const fz = fy - b / LAB_SCALE_B;
  const [xr, yr, zr] = [labFunctionXZ(fx), labFunctionY(l), labFunctionXZ(fz)];
  let x = xr * whitePoint[0], y = yr * whitePoint[1], z = zr * whitePoint[2];
  const xyz = new XYZColor(x, y, z, alpha);
  xyz.whitePoint = lab.whitePoint;
  [x, y, z] = xyzToD65(xyz);
  xyz.whitePoint = "D65";
  xyz.x = ch(x);
  xyz.y = ch(y);
  xyz.z = ch(z);
  return xyz;
}
function lch2lab({ l, c, h, alpha }) {
  c = ch(scale(
    c,
    0,
    1,
    COLOR_SPACE_RANGES.lch.c.number.min,
    COLOR_SPACE_RANGES.lch.c.number.max
  ));
  const hRad = h * 2 * Math.PI;
  const a = Math.cos(hRad) * c;
  const b = Math.sin(hRad) * c;
  return new LABColor(
    l,
    scale(
      a,
      COLOR_SPACE_RANGES.lab.a.number.min,
      COLOR_SPACE_RANGES.lab.a.number.max
    ),
    scale(
      b,
      COLOR_SPACE_RANGES.lab.b.number.min,
      COLOR_SPACE_RANGES.lab.b.number.max
    ),
    alpha
  );
}
function lab2lch({ l, a, b, alpha }) {
  a = ch(scale(
    a,
    0,
    1,
    COLOR_SPACE_RANGES.lab.a.number.min,
    COLOR_SPACE_RANGES.lab.a.number.max
  ));
  b = ch(scale(
    b,
    0,
    1,
    COLOR_SPACE_RANGES.lab.b.number.min,
    COLOR_SPACE_RANGES.lab.b.number.max
  ));
  const c = Math.hypot(a, b);
  let h = Math.atan2(b, a) / (2 * Math.PI);
  if (h < 0) h += 1;
  return new LCHColor(
    l,
    scale(
      c,
      COLOR_SPACE_RANGES.lch.c.number.min,
      COLOR_SPACE_RANGES.lch.c.number.max
    ),
    h,
    alpha
  );
}
function lch2xyz(lch) {
  const lab = lch2lab(lch);
  return lab2xyz(lab);
}
function xyz2lch(xyz) {
  const lab = xyz2lab(xyz);
  return lab2lch(lab);
}

// deposed-full/src/units/color/conversions/oklab.ts
var _scratchA = [0, 0, 0];
var _scratchB = [0, 0, 0];
function oklab2xyz({ l, a, b, alpha }) {
  a = ch(scale(
    a,
    0,
    1,
    COLOR_SPACE_RANGES.oklab.a.number.min,
    COLOR_SPACE_RANGES.oklab.a.number.max
  ));
  b = ch(scale(
    b,
    0,
    1,
    COLOR_SPACE_RANGES.oklab.b.number.min,
    COLOR_SPACE_RANGES.oklab.b.number.max
  ));
  _scratchA[0] = l;
  _scratchA[1] = a;
  _scratchA[2] = b;
  transformMat3Into(_scratchA, OKLAB_TO_LMS_MATRIX, _scratchB);
  _scratchB[0] = _scratchB[0] * _scratchB[0] * _scratchB[0];
  _scratchB[1] = _scratchB[1] * _scratchB[1] * _scratchB[1];
  _scratchB[2] = _scratchB[2] * _scratchB[2] * _scratchB[2];
  transformMat3Into(_scratchB, LMS_TO_XYZ_MATRIX, _scratchA);
  return new XYZColor(_scratchA[0], _scratchA[1], _scratchA[2], alpha);
}
function xyz2oklab(xyz) {
  const { x, y, z } = xyz;
  _scratchA[0] = x;
  _scratchA[1] = y;
  _scratchA[2] = z;
  transformMat3Into(_scratchA, XYZ_TO_LMS_MATRIX, _scratchB);
  _scratchB[0] = Math.cbrt(_scratchB[0]);
  _scratchB[1] = Math.cbrt(_scratchB[1]);
  _scratchB[2] = Math.cbrt(_scratchB[2]);
  transformMat3Into(_scratchB, LMS_TO_OKLAB_MATRIX, _scratchA);
  const l = _scratchA[0];
  const a = _scratchA[1];
  const b = _scratchA[2];
  return new OKLABColor(
    l,
    scale(
      a,
      COLOR_SPACE_RANGES.oklab.a.number.min,
      COLOR_SPACE_RANGES.oklab.a.number.max
    ),
    scale(
      b,
      COLOR_SPACE_RANGES.oklab.b.number.min,
      COLOR_SPACE_RANGES.oklab.b.number.max
    ),
    xyz.alpha
  );
}
function oklab2oklch({ l, a, b, alpha }) {
  a = ch(scale(a, 0, 1, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max));
  b = ch(scale(b, 0, 1, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max));
  const c = Math.hypot(a, b);
  let h = Math.atan2(b, a) / (2 * Math.PI);
  if (h < 0) h += 1;
  return new OKLCHColor(
    l,
    scale(c, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max),
    h,
    alpha
  );
}
function oklch2oklab({ l, c, h, alpha }) {
  c = ch(scale(c, 0, 1, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max));
  const hRad = h * 2 * Math.PI;
  const a = Math.cos(hRad) * c;
  const b = Math.sin(hRad) * c;
  return new OKLABColor(
    l,
    scale(a, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max),
    scale(b, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max),
    alpha
  );
}
function oklch2xyz(oklch) {
  const oklab = oklch2oklab(oklch);
  return oklab2xyz(oklab);
}
function xyz2oklch(xyz) {
  const oklab = xyz2oklab(xyz);
  return oklab2oklch(oklab);
}

// deposed-full/src/units/color/difference.ts
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;
var POW25_7 = 25 ** 7;
var ITP_YW = 203;
var PQ_M1 = 0.1593017578125;
var PQ_M2 = 78.84375;
var PQ_C1 = 0.8359375;
var PQ_C2 = 18.8515625;
var PQ_C3 = 18.6875;
function pqEncode(v) {
  if (v < 0) return 0;
  const c = (v / 1e4) ** PQ_M1;
  return ((PQ_C1 + PQ_C2 * c) / (1 + PQ_C3 * c)) ** PQ_M2;
}
function rawXyz2ictcp(x, y, z) {
  const absX = Math.max(x * ITP_YW, 0);
  const absY = Math.max(y * ITP_YW, 0);
  const absZ = Math.max(z * ITP_YW, 0);
  const l = pqEncode(
    0.3592832590121217 * absX + 0.6976051147779502 * absY - 0.0358915932320289 * absZ
  );
  const m = pqEncode(
    -0.1920808463704995 * absX + 1.1004767970374323 * absY + 0.0753748658519118 * absZ
  );
  const s = pqEncode(
    0.0070797844607477 * absX + 0.0748396662186366 * absY + 0.8433265453898765 * absZ
  );
  const I = 0.5 * l + 0.5 * m;
  const Ct = 1.61376953125 * l - 3.323486328125 * m + 1.709716796875 * s;
  const Cp = 4.378173828125 * l - 4.24560546875 * m - 0.132568359375 * s;
  return [I, Ct, Cp];
}
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
var LMS_TO_XYZ_ICTCP = invertMat3(XYZ_TO_LMS_ICTCP);
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
var ICTCP_TO_LMSP = invertMat3(LMSP_TO_ICTCP);
function pqDecode(N) {
  const p = Math.max(N, 0) ** (1 / PQ_M2);
  const num = Math.max(p - PQ_C1, 0);
  const den = PQ_C2 - PQ_C3 * p;
  return 1e4 * (num / den) ** (1 / PQ_M1);
}
function rawIctcp2xyz(I, Ct, Cp) {
  const [lp, mp, sp] = transformMat3([I, Ct, Cp], ICTCP_TO_LMSP);
  const lms = [pqDecode(lp), pqDecode(mp), pqDecode(sp)];
  const [ax, ay, az] = transformMat3(lms, LMS_TO_XYZ_ICTCP);
  return [ax / ITP_YW, ay / ITP_YW, az / ITP_YW];
}

// deposed-full/src/units/color/conversions/ictcp.ts
var R = COLOR_SPACE_RANGES.ictcp;
function xyz2ictcp(xyz) {
  const [I, Ct, Cp] = rawXyz2ictcp(xyz.x, xyz.y, xyz.z);
  return new ICtCpColor(
    scale(I, R.i.number.min, R.i.number.max),
    scale(Ct, R.ct.number.min, R.ct.number.max),
    scale(Cp, R.cp.number.min, R.cp.number.max),
    xyz.alpha
  );
}
function ictcp2xyz(color) {
  const I = scale(color.i, 0, 1, R.i.number.min, R.i.number.max);
  const Ct = scale(color.ct, 0, 1, R.ct.number.min, R.ct.number.max);
  const Cp = scale(color.cp, 0, 1, R.cp.number.min, R.cp.number.max);
  const [x, y, z] = rawIctcp2xyz(I, Ct, Cp);
  return new XYZColor(x, y, z, color.alpha);
}

// deposed-full/src/units/color/conversions/jzazbz.ts
var JZ_B = 1.15;
var JZ_G = 0.66;
var JZ_C1 = 3424 / 2 ** 12;
var JZ_C2 = 2413 / 2 ** 7;
var JZ_C3 = 2392 / 2 ** 7;
var JZ_N = 2610 / 2 ** 14;
var JZ_P = 1.7 * 2523 / 2 ** 5;
var JZ_D = -0.56;
var JZ_D0 = 16295499532821565e-27;
var JZ_YW = 203;
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
var JZ_LMS_TO_XYZ = invertMat3(JZ_XYZ_TO_LMS);
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
var JZ_IAB_TO_LMSP = invertMat3(JZ_LMSP_TO_IAB);
function jzPqEncode(v) {
  if (v < 0) v = 0;
  const c = (v / 1e4) ** JZ_N;
  return ((JZ_C1 + JZ_C2 * c) / (1 + JZ_C3 * c)) ** JZ_P;
}
function jzPqDecode(N) {
  const p = Math.max(N, 0) ** (1 / JZ_P);
  const num = Math.max(p - JZ_C1, 0);
  const den = JZ_C2 - JZ_C3 * p;
  return 1e4 * (num / den) ** (1 / JZ_N);
}
function rawXyz2jzazbz(x, y, z) {
  const Xa = Math.max(x * JZ_YW, 0);
  const Ya = Math.max(y * JZ_YW, 0);
  const Za = Math.max(z * JZ_YW, 0);
  const Xm = JZ_B * Xa - (JZ_B - 1) * Za;
  const Ym = JZ_G * Ya - (JZ_G - 1) * Xa;
  const [l, m, s] = transformMat3([Xm, Ym, Za], JZ_XYZ_TO_LMS);
  const lp = jzPqEncode(l);
  const mp = jzPqEncode(m);
  const sp = jzPqEncode(s);
  const [Iz, az, bz] = transformMat3([lp, mp, sp], JZ_LMSP_TO_IAB);
  const Jz = (1 + JZ_D) * Iz / (1 + JZ_D * Iz) - JZ_D0;
  return [Jz, az, bz];
}
function rawJzazbz2xyz(Jz, az, bz) {
  const Iz = (Jz + JZ_D0) / (1 + JZ_D - JZ_D * (Jz + JZ_D0));
  const [lp, mp, sp] = transformMat3([Iz, az, bz], JZ_IAB_TO_LMSP);
  const lms = [jzPqDecode(lp), jzPqDecode(mp), jzPqDecode(sp)];
  const [Xm, Ym, Zm] = transformMat3(lms, JZ_LMS_TO_XYZ);
  const Xa = (Xm + (JZ_B - 1) * Zm) / JZ_B;
  const Ya = (Ym + (JZ_G - 1) * Xa) / JZ_G;
  return [Xa / JZ_YW, Ya / JZ_YW, Zm / JZ_YW];
}
var JR = COLOR_SPACE_RANGES.jzazbz;
function xyz2jzazbz(xyz) {
  const [Jz, az, bz] = rawXyz2jzazbz(xyz.x, xyz.y, xyz.z);
  return new JzazbzColor(
    scale(Jz, JR.jz.number.min, JR.jz.number.max),
    scale(az, JR.az.number.min, JR.az.number.max),
    scale(bz, JR.bz.number.min, JR.bz.number.max),
    xyz.alpha
  );
}
function jzazbz2xyz(color) {
  const Jz = scale(color.jz, 0, 1, JR.jz.number.min, JR.jz.number.max);
  const az = scale(color.az, 0, 1, JR.az.number.min, JR.az.number.max);
  const bz = scale(color.bz, 0, 1, JR.bz.number.min, JR.bz.number.max);
  const [x, y, z] = rawJzazbz2xyz(Jz, az, bz);
  return new XYZColor(x, y, z, color.alpha);
}

// deposed-full/src/units/color/conversions/direct.ts
function directOklab2rgb(oklab) {
  const a = scale(
    oklab.a,
    0,
    1,
    COLOR_SPACE_RANGES.oklab.a.number.min,
    COLOR_SPACE_RANGES.oklab.a.number.max
  );
  const b = scale(
    oklab.b,
    0,
    1,
    COLOR_SPACE_RANGES.oklab.b.number.min,
    COLOR_SPACE_RANGES.oklab.b.number.max
  );
  const L = oklab.l;
  const l_ = L + OKLAB_TO_LMS_COEFF.l[1] * a + OKLAB_TO_LMS_COEFF.l[2] * b;
  const m_ = L + OKLAB_TO_LMS_COEFF.m[1] * a + OKLAB_TO_LMS_COEFF.m[2] * b;
  const s_ = L + OKLAB_TO_LMS_COEFF.s[1] * a + OKLAB_TO_LMS_COEFF.s[2] * b;
  const lLin = l_ * l_ * l_;
  const mLin = m_ * m_ * m_;
  const sLin = s_ * s_ * s_;
  const rLin = LMS_TO_LINEAR_SRGB[0] * lLin + LMS_TO_LINEAR_SRGB[1] * mLin + LMS_TO_LINEAR_SRGB[2] * sLin;
  const gLin = LMS_TO_LINEAR_SRGB[3] * lLin + LMS_TO_LINEAR_SRGB[4] * mLin + LMS_TO_LINEAR_SRGB[5] * sLin;
  const bLin = LMS_TO_LINEAR_SRGB[6] * lLin + LMS_TO_LINEAR_SRGB[7] * mLin + LMS_TO_LINEAR_SRGB[8] * sLin;
  const rgb = gamutMap(new RGBColor(
    linear2srgb(rLin),
    linear2srgb(gLin),
    linear2srgb(bLin),
    oklab.alpha
  ));
  return new RGBColor(rgb.r, rgb.g, rgb.b, oklab.alpha);
}
function directRgb2oklab(rgb) {
  const rLin = srgb2linear(rgb.r);
  const gLin = srgb2linear(rgb.g);
  const bLin = srgb2linear(rgb.b);
  const l_ = Math.cbrt(
    LINEAR_SRGB_TO_LMS[0] * rLin + LINEAR_SRGB_TO_LMS[1] * gLin + LINEAR_SRGB_TO_LMS[2] * bLin
  );
  const m_ = Math.cbrt(
    LINEAR_SRGB_TO_LMS[3] * rLin + LINEAR_SRGB_TO_LMS[4] * gLin + LINEAR_SRGB_TO_LMS[5] * bLin
  );
  const s_ = Math.cbrt(
    LINEAR_SRGB_TO_LMS[6] * rLin + LINEAR_SRGB_TO_LMS[7] * gLin + LINEAR_SRGB_TO_LMS[8] * bLin
  );
  const l = LMS_TO_OKLAB_MATRIX[0] * l_ + LMS_TO_OKLAB_MATRIX[1] * m_ + LMS_TO_OKLAB_MATRIX[2] * s_;
  const a = LMS_TO_OKLAB_MATRIX[3] * l_ + LMS_TO_OKLAB_MATRIX[4] * m_ + LMS_TO_OKLAB_MATRIX[5] * s_;
  const b = LMS_TO_OKLAB_MATRIX[6] * l_ + LMS_TO_OKLAB_MATRIX[7] * m_ + LMS_TO_OKLAB_MATRIX[8] * s_;
  return new OKLABColor(
    l,
    scale(
      a,
      COLOR_SPACE_RANGES.oklab.a.number.min,
      COLOR_SPACE_RANGES.oklab.a.number.max
    ),
    scale(
      b,
      COLOR_SPACE_RANGES.oklab.b.number.min,
      COLOR_SPACE_RANGES.oklab.b.number.max
    ),
    rgb.alpha
  );
}
function directOklch2rgb(oklch) {
  const c = scale(
    oklch.c,
    0,
    1,
    COLOR_SPACE_RANGES.oklch.c.number.min,
    COLOR_SPACE_RANGES.oklch.c.number.max
  );
  const hRad = oklch.h * 2 * Math.PI;
  const a = Math.cos(hRad) * c;
  const b = Math.sin(hRad) * c;
  const L = oklch.l;
  const l_ = L + OKLAB_TO_LMS_COEFF.l[1] * a + OKLAB_TO_LMS_COEFF.l[2] * b;
  const m_ = L + OKLAB_TO_LMS_COEFF.m[1] * a + OKLAB_TO_LMS_COEFF.m[2] * b;
  const s_ = L + OKLAB_TO_LMS_COEFF.s[1] * a + OKLAB_TO_LMS_COEFF.s[2] * b;
  const lLin = l_ * l_ * l_;
  const mLin = m_ * m_ * m_;
  const sLin = s_ * s_ * s_;
  const rLin = LMS_TO_LINEAR_SRGB[0] * lLin + LMS_TO_LINEAR_SRGB[1] * mLin + LMS_TO_LINEAR_SRGB[2] * sLin;
  const gLin = LMS_TO_LINEAR_SRGB[3] * lLin + LMS_TO_LINEAR_SRGB[4] * mLin + LMS_TO_LINEAR_SRGB[5] * sLin;
  const bLin = LMS_TO_LINEAR_SRGB[6] * lLin + LMS_TO_LINEAR_SRGB[7] * mLin + LMS_TO_LINEAR_SRGB[8] * sLin;
  const rgb = gamutMap(new RGBColor(
    linear2srgb(rLin),
    linear2srgb(gLin),
    linear2srgb(bLin),
    oklch.alpha
  ));
  return new RGBColor(rgb.r, rgb.g, rgb.b, oklch.alpha);
}
function directRgb2oklch(rgb) {
  const rLin = srgb2linear(rgb.r);
  const gLin = srgb2linear(rgb.g);
  const bLin = srgb2linear(rgb.b);
  const l_ = Math.cbrt(
    LINEAR_SRGB_TO_LMS[0] * rLin + LINEAR_SRGB_TO_LMS[1] * gLin + LINEAR_SRGB_TO_LMS[2] * bLin
  );
  const m_ = Math.cbrt(
    LINEAR_SRGB_TO_LMS[3] * rLin + LINEAR_SRGB_TO_LMS[4] * gLin + LINEAR_SRGB_TO_LMS[5] * bLin
  );
  const s_ = Math.cbrt(
    LINEAR_SRGB_TO_LMS[6] * rLin + LINEAR_SRGB_TO_LMS[7] * gLin + LINEAR_SRGB_TO_LMS[8] * bLin
  );
  const l = LMS_TO_OKLAB_MATRIX[0] * l_ + LMS_TO_OKLAB_MATRIX[1] * m_ + LMS_TO_OKLAB_MATRIX[2] * s_;
  const a = LMS_TO_OKLAB_MATRIX[3] * l_ + LMS_TO_OKLAB_MATRIX[4] * m_ + LMS_TO_OKLAB_MATRIX[5] * s_;
  const b = LMS_TO_OKLAB_MATRIX[6] * l_ + LMS_TO_OKLAB_MATRIX[7] * m_ + LMS_TO_OKLAB_MATRIX[8] * s_;
  const c = Math.hypot(a, b);
  let h = Math.atan2(b, a) / (2 * Math.PI);
  if (h < 0) h += 1;
  return new OKLCHColor(
    l,
    scale(
      c,
      COLOR_SPACE_RANGES.oklch.c.number.min,
      COLOR_SPACE_RANGES.oklch.c.number.max
    ),
    h,
    rgb.alpha
  );
}
function directHsl2rgb(hsl) {
  const rgb = hsl2rgb(hsl);
  return gamutMap(rgb);
}
function directRgb2hsl(rgb) {
  return rgb2hsl(rgb);
}
var DIRECT_PATHS = {
  // OKLab ↔ RGB — skips XYZ + chromatic adaptation. Highest-frequency
  // interpolation pair in the demo + library hot paths.
  "oklab->rgb": directOklab2rgb,
  "rgb->oklab": directRgb2oklab,
  // OKLCH ↔ RGB — polar form of OKLab; direct path inlines the polar
  // conversion + the OKLab→LMS→sRGB chain.
  "oklch->rgb": directOklch2rgb,
  "rgb->oklch": directRgb2oklch,
  // HSL ↔ RGB — closed-form cylindrical conversion (no XYZ at all).
  "hsl->rgb": directHsl2rgb,
  "rgb->hsl": directRgb2hsl
};
var getDirectPath = (from, to) => {
  const directKey = `${from}->${to}`;
  return DIRECT_PATHS[directKey];
};

// deposed-full/src/units/color/dispatch.ts
var XYZ_FUNCTIONS = {
  rgb: { to: rgb2xyz, from: xyz2rgb },
  hsl: { to: hsl2xyz, from: xyz2hsl },
  hsv: { to: hsv2xyz, from: xyz2hsv },
  hwb: { to: hwb2xyz, from: xyz2hwb },
  lab: { to: lab2xyz, from: xyz2lab },
  lch: { to: lch2xyz, from: xyz2lch },
  oklab: { to: oklab2xyz, from: xyz2oklab },
  oklch: { to: oklch2xyz, from: xyz2oklch },
  kelvin: { to: kelvin2xyz, from: xyz2kelvin },
  xyz: { to: (color) => color, from: (color) => color },
  "srgb-linear": { to: linearSrgb2xyz, from: xyz2linearSrgb },
  "display-p3": { to: displayP32xyz, from: xyz2displayP3 },
  "a98-rgb": { to: adobeRgb2xyz, from: xyz2adobeRgb },
  "prophoto-rgb": { to: proPhoto2xyz, from: xyz2proPhoto },
  rec2020: { to: rec20202xyz, from: xyz2rec2020 },
  // HDR perceptual spaces (S.W1 remediation, 3.1.0 — Q9 + widening).
  ictcp: { to: ictcp2xyz, from: xyz2ictcp },
  jzazbz: { to: jzazbz2xyz, from: xyz2jzazbz }
};
var getXyzToFn = (from) => XYZ_FUNCTIONS[from]?.to;
var getXyzFromFn = (to) => XYZ_FUNCTIONS[to]?.from;
var XYZ_FROM_INTO = {
  "srgb-linear": xyz2linearSrgbInto,
  "display-p3": xyz2displayP3Into,
  "a98-rgb": xyz2adobeRgbInto,
  "prophoto-rgb": xyz2proPhotoInto,
  rec2020: xyz2rec2020Into
};
var getXyzFromIntoFn = (to) => XYZ_FROM_INTO[to];
function color2(color, to, opts) {
  if (color.colorSpace === to) {
    return color;
  }
  const rawSrgb = opts?.gamut === "raw" && to === "rgb";
  if (!rawSrgb) {
    const direct = getDirectPath(color.colorSpace, to);
    if (direct) {
      return direct(color);
    }
  }
  const toXYZFn = getXyzToFn(color.colorSpace);
  if (!toXYZFn) {
    throw new Error(`Unknown source color space: "${color.colorSpace}"`);
  }
  const xyz = toXYZFn(color);
  if (rawSrgb) {
    return xyz2rgb(xyz, false);
  }
  const fromXYZFn = getXyzFromFn(to);
  if (!fromXYZFn) {
    throw new Error(`Unknown target color space: "${to}"`);
  }
  return fromXYZFn(xyz);
}
function copyChannelsInto(src, out) {
  const keys = src.channels;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    setChannel(out, k, ch(channelOf(src, k)));
  }
  out.alpha = src.alpha;
  return out;
}
var _color2IntoXyzScratch;
var _color2IntoXyzTuple = [0, 0, 0];
function color2Into(src, to, out) {
  if (src.colorSpace === to) {
    return copyChannelsInto(src, out);
  }
  const direct = getDirectPath(src.colorSpace, to);
  if (direct) {
    const converted2 = direct(src);
    return copyChannelsInto(converted2, out);
  }
  if (src.colorSpace === "oklch") {
    const oklch = src;
    const xyz = _color2IntoXyzScratch ??= new XYZColor(0, 0, 0, 1);
    oklch2xyzTuple(
      oklch.l,
      oklch.c,
      oklch.h,
      _color2IntoXyzTuple
    );
    xyz.x = ch(_color2IntoXyzTuple[0]);
    xyz.y = ch(_color2IntoXyzTuple[1]);
    xyz.z = ch(_color2IntoXyzTuple[2]);
    xyz.alpha = src.alpha;
    const fromXYZIntoFn = getXyzFromIntoFn(to);
    if (fromXYZIntoFn) {
      fromXYZIntoFn(xyz, out);
      return out;
    }
    const fromXYZFn = getXyzFromFn(to);
    if (!fromXYZFn) {
      throw new Error(`Unknown target color space: "${to}"`);
    }
    const egress = fromXYZFn(xyz);
    return copyChannelsInto(egress, out);
  }
  const converted = color2(src, to);
  return copyChannelsInto(converted, out);
}
var GAMUT_EPSILON = 1e-6;
var RGB_GAMUT_SPACES = /* @__PURE__ */ new Set([
  "rgb",
  "srgb-linear",
  "display-p3",
  "a98-rgb",
  "prophoto-rgb",
  "rec2020"
]);
var rgbInGamut = (r, g, b, eps) => r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps;
var CHROMA_SEARCH_STEPS = 24;
var _scratchProbe;
var _egressScratch = {};
function gamutMapToRgbSpace(color, target) {
  const probe = _scratchProbe ??= new OKLCHColor(0, 0, 0, 1);
  const oklch = color2(color, "oklch");
  const L = oklch.l;
  const H = oklch.h;
  const cHigh = oklch.c;
  const alpha = color.alpha;
  probe.l = ch(L);
  probe.h = ch(H);
  probe.alpha = alpha;
  probe.c = ch((0 + cHigh) / 2);
  let egress = _egressScratch[target];
  if (egress === void 0) {
    egress = color2(probe, target);
    _egressScratch[target] = egress;
  } else {
    color2Into(probe, target, egress);
  }
  let lo = 0;
  let hi = cHigh;
  for (let i = 0; i < CHROMA_SEARCH_STEPS; i++) {
    const mid = (lo + hi) / 2;
    probe.c = ch(mid);
    const rgb2 = color2Into(
      probe,
      target,
      egress
    );
    if (rgbInGamut(rgb2.r, rgb2.g, rgb2.b, GAMUT_EPSILON)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  probe.c = ch(lo);
  const rgb = color2Into(
    probe,
    target,
    egress
  );
  const clamped = new rgb.constructor(
    clamp(rgb.r, 0, 1),
    clamp(rgb.g, 0, 1),
    clamp(rgb.b, 0, 1),
    alpha
  );
  return color2(clamped, color.colorSpace);
}
function gamutMap(color, targetSpace = "rgb") {
  const target = RGB_GAMUT_SPACES.has(targetSpace) ? targetSpace : "rgb";
  const egress = color2(color, target);
  const r = Number.isNaN(egress.r) ? 0 : egress.r;
  const g = Number.isNaN(egress.g) ? 0 : egress.g;
  const b = Number.isNaN(egress.b) ? 0 : egress.b;
  if (r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
    return color;
  }
  if (rgbInGamut(r, g, b, GAMUT_EPSILON)) {
    const EgressClass2 = egress.constructor;
    const clamped2 = new EgressClass2(
      clamp(r, 0, 1),
      clamp(g, 0, 1),
      clamp(b, 0, 1),
      color.alpha
    );
    return color2(clamped2, color.colorSpace);
  }
  if (target === "rgb") {
    const [sR, sG, sB] = gamutMapSRGB(r, g, b);
    const mappedRGB = new RGBColor(sR, sG, sB, color.alpha);
    return color2(mappedRGB, color.colorSpace);
  }
  const EgressClass = egress.constructor;
  const clamped = new EgressClass(
    clamp(r, 0, 1),
    clamp(g, 0, 1),
    clamp(b, 0, 1),
    color.alpha
  );
  const srcOKLab = color2(color, "oklab");
  const clampedOKLab = color2(clamped, "oklab");
  if (deltaEOK(
    srcOKLab.l,
    srcOKLab.a,
    srcOKLab.b,
    clampedOKLab.l,
    clampedOKLab.a,
    clampedOKLab.b
  ) < DELTA_E_OK_JND) {
    return color2(clamped, color.colorSpace);
  }
  return gamutMapToRgbSpace(color, target);
}
registerColorConverters(
  color2,
  gamutMap
);

// deposed-full/src/units/color/mix.ts
var CYLINDRICAL_HUE_COMPONENT = {
  hsl: "h",
  hsv: "h",
  hwb: "h",
  lch: "h",
  oklch: "h"
};
function interpolateHue(h1, h2, t, method = "shorter") {
  if (Number.isNaN(h1) && Number.isNaN(h2)) return 0;
  if (Number.isNaN(h1)) return h2;
  if (Number.isNaN(h2)) return h1;
  let diff = h2 - h1;
  switch (method) {
    case "shorter":
      if (diff > 0.5) h1 += 1;
      else if (diff < -0.5) h2 += 1;
      break;
    case "longer":
      if (diff > 0 && diff < 0.5) h1 += 1;
      else if (diff > -0.5 && diff <= 0) h2 += 1;
      break;
    case "increasing":
      if (diff < 0) h2 += 1;
      break;
    case "decreasing":
      if (diff > 0) h1 += 1;
      break;
  }
  let result = h1 + t * (h2 - h1);
  result = (result % 1 + 1) % 1;
  return result;
}
function mixColors(col1, col2, p1, p2, space2 = "oklab", hueMethod = "shorter") {
  const c1 = color2(col1, space2);
  const c2 = color2(col2, space2);
  if (p1 < 0) p1 = 0;
  if (p2 < 0) p2 = 0;
  const sum = p1 + p2;
  if (sum === 0) {
    p1 = 0.5;
    p2 = 0.5;
  } else if (sum !== 1) {
    p1 = p1 / sum;
    p2 = p2 / sum;
  }
  const alphaMultiplier = Math.min(sum, 1);
  const hueComponent = CYLINDRICAL_HUE_COMPONENT[space2];
  const keys = c1.keys().filter((k) => k !== "alpha");
  const a1 = Number.isNaN(c1.alpha) ? c2.alpha : c1.alpha;
  const a2 = Number.isNaN(c2.alpha) ? c1.alpha : c2.alpha;
  const resultAlpha = lerp(a1, a2, p2) * alphaMultiplier;
  const resultComponents = [];
  for (const key of keys) {
    let v1 = c1[key];
    let v2 = c2[key];
    if (Number.isNaN(v1) && Number.isNaN(v2)) {
      resultComponents.push(0);
      continue;
    }
    if (Number.isNaN(v1)) v1 = v2;
    if (Number.isNaN(v2)) v2 = v1;
    if (key === hueComponent) {
      resultComponents.push(interpolateHue(v1, v2, p2, hueMethod));
    } else {
      const premul1 = v1 * a1;
      const premul2 = v2 * a2;
      const mixed = lerp(premul1, premul2, p2);
      resultComponents.push(resultAlpha > 0 ? mixed / resultAlpha : 0);
    }
  }
  const ResultClass = c1.constructor;
  const result = new ResultClass(...resultComponents, resultAlpha);
  return result;
}

// deposed-full/src/units/color/normalize.ts
var normalizeColorUnitComponent = (v, unit, colorSpace, component, inverse = false) => {
  unit = inverse ? getColorSpaceDenormUnit(colorSpace, component) : unit;
  const { min, max } = getColorSpaceBound(colorSpace, component, unit ?? "");
  const [toMin, toMax, fromMin, fromMax] = inverse ? [min, max, 0, 1] : [0, 1, min, max];
  const value = scale(v, fromMin, fromMax, toMin, toMax);
  return new ValueUnit(value, inverse ? unit : "");
};
var normalizeColor = (color, inverse = false) => {
  const colorSpace = color.colorSpace;
  color.keys().forEach((component) => {
    const channel = color[component];
    const value = ValueUnit.unwrapDeep(channel);
    const unit = channel instanceof ValueUnit ? channel.unit : void 0;
    color[component] = normalizeColorUnitComponent(
      value,
      unit,
      colorSpace,
      component,
      inverse
    );
  });
  return color;
};
var normalizeColorUnit = (color, inverse = false, inplace = false) => {
  color = inplace ? color : color.clone();
  const normalizedColor = normalizeColor(color.value, inverse);
  if (inplace) {
    return color;
  } else {
    return new ValueUnit(normalizedColor).coalesce(color, true);
  }
};

// deposed-full/src/units/color/contrast.ts
var WCAG_R_COEFF = 0.2126;
var WCAG_G_COEFF = 0.7152;
var WCAG_B_COEFF = 0.0722;
function wcagRelativeLuminance(color) {
  const normalized = normalizeColor(
    color.clone()
  );
  const lin = normalized.colorSpace === "srgb-linear" ? normalized : color2(normalized, "srgb-linear");
  return WCAG_R_COEFF * lin.r + WCAG_G_COEFF * lin.g + WCAG_B_COEFF * lin.b;
}
function contrastColor(color) {
  const black = new RGBColor(0, 0, 0, 1);
  const white = new RGBColor(255, 255, 255, 1);
  const lum = wcagRelativeLuminance(color);
  const contrastWhite = 1.05 / (lum + 0.05);
  const contrastBlack = (lum + 0.05) / 0.05;
  return contrastWhite > contrastBlack ? white : black;
}

// deposed-full/src/units/style-names.ts
var STYLE_NAMES = [
  "accentColor",
  "additiveSymbols",
  "alignContent",
  "alignItems",
  "alignSelf",
  "alignmentBaseline",
  "all",
  "anchorName",
  "animation",
  "animationComposition",
  "animationDelay",
  "animationDirection",
  "animationDuration",
  "animationFillMode",
  "animationIterationCount",
  "animationName",
  "animationPlayState",
  "animationRange",
  "animationRangeEnd",
  "animationRangeStart",
  "animationTimeline",
  "animationTimingFunction",
  "appRegion",
  "appearance",
  "ascentOverride",
  "aspectRatio",
  "backdropFilter",
  "backfaceVisibility",
  "background",
  "backgroundAttachment",
  "backgroundBlendMode",
  "backgroundClip",
  "backgroundColor",
  "backgroundImage",
  "backgroundOrigin",
  "backgroundPosition",
  "backgroundPositionX",
  "backgroundPositionY",
  "backgroundRepeat",
  "backgroundSize",
  "basePalette",
  "baselineShift",
  "baselineSource",
  "blockSize",
  "border",
  "borderBlock",
  "borderBlockColor",
  "borderBlockEnd",
  "borderBlockEndColor",
  "borderBlockEndStyle",
  "borderBlockEndWidth",
  "borderBlockStart",
  "borderBlockStartColor",
  "borderBlockStartStyle",
  "borderBlockStartWidth",
  "borderBlockStyle",
  "borderBlockWidth",
  "borderBottom",
  "borderBottomColor",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderBottomStyle",
  "borderBottomWidth",
  "borderCollapse",
  "borderColor",
  "borderEndEndRadius",
  "borderEndStartRadius",
  "borderImage",
  "borderImageOutset",
  "borderImageRepeat",
  "borderImageSlice",
  "borderImageSource",
  "borderImageWidth",
  "borderInline",
  "borderInlineColor",
  "borderInlineEnd",
  "borderInlineEndColor",
  "borderInlineEndStyle",
  "borderInlineEndWidth",
  "borderInlineStart",
  "borderInlineStartColor",
  "borderInlineStartStyle",
  "borderInlineStartWidth",
  "borderInlineStyle",
  "borderInlineWidth",
  "borderLeft",
  "borderLeftColor",
  "borderLeftStyle",
  "borderLeftWidth",
  "borderRadius",
  "borderRight",
  "borderRightColor",
  "borderRightStyle",
  "borderRightWidth",
  "borderSpacing",
  "borderStartEndRadius",
  "borderStartStartRadius",
  "borderStyle",
  "borderTop",
  "borderTopColor",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderTopStyle",
  "borderTopWidth",
  "borderWidth",
  "bottom",
  "boxShadow",
  "boxSizing",
  "breakAfter",
  "breakBefore",
  "breakInside",
  "bufferedRendering",
  "captionSide",
  "caretColor",
  "clear",
  "clip",
  "clipPath",
  "clipRule",
  "color",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorRendering",
  "colorScheme",
  "columnCount",
  "columnFill",
  "columnGap",
  "columnRule",
  "columnRuleColor",
  "columnRuleStyle",
  "columnRuleWidth",
  "columnSpan",
  "columnWidth",
  "columns",
  "contain",
  "containIntrinsicBlockSize",
  "containIntrinsicHeight",
  "containIntrinsicInlineSize",
  "containIntrinsicSize",
  "containIntrinsicWidth",
  "container",
  "containerName",
  "containerType",
  "content",
  "contentVisibility",
  "counterIncrement",
  "counterReset",
  "counterSet",
  "cursor",
  "cx",
  "cy",
  "d",
  "descentOverride",
  "direction",
  "display",
  "dominantBaseline",
  "emptyCells",
  "fallback",
  "fieldSizing",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "flex",
  "flexBasis",
  "flexDirection",
  "flexFlow",
  "flexGrow",
  "flexShrink",
  "flexWrap",
  "float",
  "floodColor",
  "floodOpacity",
  "font",
  "fontDisplay",
  "fontFamily",
  "fontFeatureSettings",
  "fontKerning",
  "fontOpticalSizing",
  "fontPalette",
  "fontSize",
  "fontStretch",
  "fontStyle",
  "fontSynthesis",
  "fontSynthesisSmallCaps",
  "fontSynthesisStyle",
  "fontSynthesisWeight",
  "fontVariant",
  "fontVariantAlternates",
  "fontVariantCaps",
  "fontVariantEastAsian",
  "fontVariantLigatures",
  "fontVariantNumeric",
  "fontVariantPosition",
  "fontVariationSettings",
  "fontWeight",
  "forcedColorAdjust",
  "gap",
  "grid",
  "gridArea",
  "gridAutoColumns",
  "gridAutoFlow",
  "gridAutoRows",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnGap",
  "gridColumnStart",
  "gridGap",
  "gridRow",
  "gridRowEnd",
  "gridRowGap",
  "gridRowStart",
  "gridTemplate",
  "gridTemplateAreas",
  "gridTemplateColumns",
  "gridTemplateRows",
  "height",
  "hyphenateCharacter",
  "hyphenateLimitChars",
  "hyphens",
  "imageOrientation",
  "imageRendering",
  "inherits",
  "initialLetter",
  "initialValue",
  "inlineSize",
  "inset",
  "insetArea",
  "insetBlock",
  "insetBlockEnd",
  "insetBlockStart",
  "insetInline",
  "insetInlineEnd",
  "insetInlineStart",
  "isolation",
  "justifyContent",
  "justifyItems",
  "justifySelf",
  "left",
  "letterSpacing",
  "lightingColor",
  "lineBreak",
  "lineGapOverride",
  "lineHeight",
  "listStyle",
  "listStyleImage",
  "listStylePosition",
  "listStyleType",
  "margin",
  "marginBlock",
  "marginBlockEnd",
  "marginBlockStart",
  "marginBottom",
  "marginInline",
  "marginInlineEnd",
  "marginInlineStart",
  "marginLeft",
  "marginRight",
  "marginTop",
  "marker",
  "markerEnd",
  "markerMid",
  "markerStart",
  "mask",
  "maskClip",
  "maskComposite",
  "maskImage",
  "maskMode",
  "maskOrigin",
  "maskPosition",
  "maskRepeat",
  "maskSize",
  "maskType",
  "mathDepth",
  "mathShift",
  "mathStyle",
  "maxBlockSize",
  "maxHeight",
  "maxInlineSize",
  "maxWidth",
  "minBlockSize",
  "minHeight",
  "minInlineSize",
  "minWidth",
  "mixBlendMode",
  "navigation",
  "negative",
  "objectFit",
  "objectPosition",
  "objectViewBox",
  "offset",
  "offsetAnchor",
  "offsetDistance",
  "offsetPath",
  "offsetPosition",
  "offsetRotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outlineColor",
  "outlineOffset",
  "outlineStyle",
  "outlineWidth",
  "overflow",
  "overflowAnchor",
  "overflowClipMargin",
  "overflowWrap",
  "overflowX",
  "overflowY",
  "overlay",
  "overrideColors",
  "overscrollBehavior",
  "overscrollBehaviorBlock",
  "overscrollBehaviorInline",
  "overscrollBehaviorX",
  "overscrollBehaviorY",
  "pad",
  "padding",
  "paddingBlock",
  "paddingBlockEnd",
  "paddingBlockStart",
  "paddingBottom",
  "paddingInline",
  "paddingInlineEnd",
  "paddingInlineStart",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "page",
  "pageBreakAfter",
  "pageBreakBefore",
  "pageBreakInside",
  "pageOrientation",
  "paintOrder",
  "perspective",
  "perspectiveOrigin",
  "placeContent",
  "placeItems",
  "placeSelf",
  "pointerEvents",
  "position",
  "positionAnchor",
  "positionTry",
  "positionTryOptions",
  "positionTryOrder",
  "positionVisibility",
  "prefix",
  "quotes",
  "r",
  "range",
  "resize",
  "right",
  "rotate",
  "rowGap",
  "rubyPosition",
  "rx",
  "ry",
  "scale",
  "scrollBehavior",
  "scrollMargin",
  "scrollMarginBlock",
  "scrollMarginBlockEnd",
  "scrollMarginBlockStart",
  "scrollMarginBottom",
  "scrollMarginInline",
  "scrollMarginInlineEnd",
  "scrollMarginInlineStart",
  "scrollMarginLeft",
  "scrollMarginRight",
  "scrollMarginTop",
  "scrollPadding",
  "scrollPaddingBlock",
  "scrollPaddingBlockEnd",
  "scrollPaddingBlockStart",
  "scrollPaddingBottom",
  "scrollPaddingInline",
  "scrollPaddingInlineEnd",
  "scrollPaddingInlineStart",
  "scrollPaddingLeft",
  "scrollPaddingRight",
  "scrollPaddingTop",
  "scrollSnapAlign",
  "scrollSnapStop",
  "scrollSnapType",
  "scrollTimeline",
  "scrollTimelineAxis",
  "scrollTimelineName",
  "scrollbarColor",
  "scrollbarGutter",
  "scrollbarWidth",
  "shapeImageThreshold",
  "shapeMargin",
  "shapeOutside",
  "shapeRendering",
  "size",
  "sizeAdjust",
  "speak",
  "speakAs",
  "src",
  "stopColor",
  "stopOpacity",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "suffix",
  "symbols",
  "syntax",
  "system",
  "tabSize",
  "tableLayout",
  "textAlign",
  "textAlignLast",
  "textAnchor",
  "textCombineUpright",
  "textDecoration",
  "textDecorationColor",
  "textDecorationLine",
  "textDecorationSkipInk",
  "textDecorationStyle",
  "textDecorationThickness",
  "textEmphasis",
  "textEmphasisColor",
  "textEmphasisPosition",
  "textEmphasisStyle",
  "textIndent",
  "textOrientation",
  "textOverflow",
  "textRendering",
  "textShadow",
  "textSizeAdjust",
  "textSpacingTrim",
  "textTransform",
  "textUnderlineOffset",
  "textUnderlinePosition",
  "textWrap",
  "timelineScope",
  "top",
  "touchAction",
  "transform",
  "transformBox",
  "transformOrigin",
  "transformStyle",
  "transition",
  "transitionBehavior",
  "transitionDelay",
  "transitionDuration",
  "transitionProperty",
  "transitionTimingFunction",
  "translate",
  "types",
  "unicodeBidi",
  "unicodeRange",
  "userSelect",
  "vectorEffect",
  "verticalAlign",
  "viewTimeline",
  "viewTimelineAxis",
  "viewTimelineInset",
  "viewTimelineName",
  "viewTransitionClass",
  "viewTransitionName",
  "visibility",
  "webkitAlignContent",
  "webkitAlignItems",
  "webkitAlignSelf",
  "webkitAnimation",
  "webkitAnimationDelay",
  "webkitAnimationDirection",
  "webkitAnimationDuration",
  "webkitAnimationFillMode",
  "webkitAnimationIterationCount",
  "webkitAnimationName",
  "webkitAnimationPlayState",
  "webkitAnimationTimingFunction",
  "webkitAppRegion",
  "webkitAppearance",
  "webkitBackfaceVisibility",
  "webkitBackgroundClip",
  "webkitBackgroundOrigin",
  "webkitBackgroundSize",
  "webkitBorderAfter",
  "webkitBorderAfterColor",
  "webkitBorderAfterStyle",
  "webkitBorderAfterWidth",
  "webkitBorderBefore",
  "webkitBorderBeforeColor",
  "webkitBorderBeforeStyle",
  "webkitBorderBeforeWidth",
  "webkitBorderBottomLeftRadius",
  "webkitBorderBottomRightRadius",
  "webkitBorderEnd",
  "webkitBorderEndColor",
  "webkitBorderEndStyle",
  "webkitBorderEndWidth",
  "webkitBorderHorizontalSpacing",
  "webkitBorderImage",
  "webkitBorderRadius",
  "webkitBorderStart",
  "webkitBorderStartColor",
  "webkitBorderStartStyle",
  "webkitBorderStartWidth",
  "webkitBorderTopLeftRadius",
  "webkitBorderTopRightRadius",
  "webkitBorderVerticalSpacing",
  "webkitBoxAlign",
  "webkitBoxDecorationBreak",
  "webkitBoxDirection",
  "webkitBoxFlex",
  "webkitBoxOrdinalGroup",
  "webkitBoxOrient",
  "webkitBoxPack",
  "webkitBoxReflect",
  "webkitBoxShadow",
  "webkitBoxSizing",
  "webkitClipPath",
  "webkitColumnBreakAfter",
  "webkitColumnBreakBefore",
  "webkitColumnBreakInside",
  "webkitColumnCount",
  "webkitColumnGap",
  "webkitColumnRule",
  "webkitColumnRuleColor",
  "webkitColumnRuleStyle",
  "webkitColumnRuleWidth",
  "webkitColumnSpan",
  "webkitColumnWidth",
  "webkitColumns",
  "webkitFilter",
  "webkitFlex",
  "webkitFlexBasis",
  "webkitFlexDirection",
  "webkitFlexFlow",
  "webkitFlexGrow",
  "webkitFlexShrink",
  "webkitFlexWrap",
  "webkitFontFeatureSettings",
  "webkitFontSmoothing",
  "webkitHyphenateCharacter",
  "webkitJustifyContent",
  "webkitLineBreak",
  "webkitLineClamp",
  "webkitLocale",
  "webkitLogicalHeight",
  "webkitLogicalWidth",
  "webkitMarginAfter",
  "webkitMarginBefore",
  "webkitMarginEnd",
  "webkitMarginStart",
  "webkitMask",
  "webkitMaskBoxImage",
  "webkitMaskBoxImageOutset",
  "webkitMaskBoxImageRepeat",
  "webkitMaskBoxImageSlice",
  "webkitMaskBoxImageSource",
  "webkitMaskBoxImageWidth",
  "webkitMaskClip",
  "webkitMaskComposite",
  "webkitMaskImage",
  "webkitMaskOrigin",
  "webkitMaskPosition",
  "webkitMaskPositionX",
  "webkitMaskPositionY",
  "webkitMaskRepeat",
  "webkitMaskSize",
  "webkitMaxLogicalHeight",
  "webkitMaxLogicalWidth",
  "webkitMinLogicalHeight",
  "webkitMinLogicalWidth",
  "webkitOpacity",
  "webkitOrder",
  "webkitPaddingAfter",
  "webkitPaddingBefore",
  "webkitPaddingEnd",
  "webkitPaddingStart",
  "webkitPerspective",
  "webkitPerspectiveOrigin",
  "webkitPerspectiveOriginX",
  "webkitPerspectiveOriginY",
  "webkitPrintColorAdjust",
  "webkitRtlOrdering",
  "webkitRubyPosition",
  "webkitShapeImageThreshold",
  "webkitShapeMargin",
  "webkitShapeOutside",
  "webkitTapHighlightColor",
  "webkitTextCombine",
  "webkitTextDecorationsInEffect",
  "webkitTextEmphasis",
  "webkitTextEmphasisColor",
  "webkitTextEmphasisPosition",
  "webkitTextEmphasisStyle",
  "webkitTextFillColor",
  "webkitTextOrientation",
  "webkitTextSecurity",
  "webkitTextSizeAdjust",
  "webkitTextStroke",
  "webkitTextStrokeColor",
  "webkitTextStrokeWidth",
  "webkitTransform",
  "webkitTransformOrigin",
  "webkitTransformOriginX",
  "webkitTransformOriginY",
  "webkitTransformOriginZ",
  "webkitTransformStyle",
  "webkitTransition",
  "webkitTransitionDelay",
  "webkitTransitionDuration",
  "webkitTransitionProperty",
  "webkitTransitionTimingFunction",
  "webkitUserDrag",
  "webkitUserModify",
  "webkitUserSelect",
  "webkitWritingMode",
  "whiteSpace",
  "whiteSpaceCollapse",
  "widows",
  "width",
  "willChange",
  "wordBreak",
  "wordSpacing",
  "wordWrap",
  "writingMode",
  "x",
  "y",
  "zIndex",
  "zoom"
];

// deposed-full/src/units/utils.ts
var setStyleNames = new Set(STYLE_NAMES);
function convertToDegrees(value, unit) {
  if (unit === "grad") {
    value *= 0.9;
  } else if (unit === "rad") {
    value *= 180 / Math.PI;
  } else if (unit === "turn") {
    value *= 360;
  }
  return value;
}

// deposed-full/src/parsing/color/color-unit.ts
var createColorValueUnit = (value) => {
  return new ValueUnit(
    value,
    "color",
    ["color", value.colorSpace],
    void 0,
    "color"
  );
};
function resolveToPlainColor(colorUnit) {
  const normalized = normalizeColorUnit(
    colorUnit
  );
  const color = normalized.value;
  const plain = color.clone();
  for (const key of color.keys()) {
    setChannel(plain, key, ch(ValueUnit.unwrapDeep(channelOf(color, key))));
  }
  return plain;
}

// deposed-full/src/parsing/math.ts
var lparen = string("(");
var rparen = string(")");
var comma = string(",");
function createCalcParser(valueParser, mathFunctionParser) {
  const calcValue = Parser.lazy(
    () => any(
      // Nested parenthesized expression
      calcSum.trim(whitespace).wrap(lparen, rparen),
      // Math function (min, max, etc.) — must come before plain value
      mathFunctionParser,
      // Plain value (number, dimension, percentage)
      valueParser
    ).trim(whitespace)
  );
  const unaryCalcValue = Parser.lazy(
    () => any(
      all(string("-").trim(whitespace), calcValue).map(
        ([, val]) => new FunctionValue("*", [new ValueUnit(-1), val])
      ),
      all(string("+").trim(whitespace), calcValue).map(([, val]) => val),
      calcValue
    )
  );
  const mulOp = any(string("*"), string("/")).trim(whitespace);
  const addOp = any(string("+"), string("-")).trim(whitespace);
  const calcProduct = all(
    unaryCalcValue,
    all(mulOp, unaryCalcValue).many()
  ).map(([first, rest]) => {
    let result = first;
    for (const [op, right] of rest) {
      result = new FunctionValue(op, [result, right]);
    }
    return result;
  });
  const calcSum = all(
    calcProduct,
    // CSS spec requires whitespace around + and - in calc
    all(addOp, calcProduct).many()
  ).map(([first, rest]) => {
    let result = first;
    for (const [op, right] of rest) {
      result = new FunctionValue(op, [result, right]);
    }
    return result;
  });
  return calcSum;
}
function createMathFunctionParsers(valueParser) {
  const mathFunction = Parser.lazy(() => allMathFunctions);
  const calcSum = createCalcParser(valueParser, mathFunction);
  const calcFn = istring("calc").next(calcSum.trim(whitespace).wrap(lparen, rparen)).map((expr) => new FunctionValue("calc", [expr]));
  const calcArg = calcSum.trim(whitespace);
  const calcArgList = calcArg.sepBy(comma.trim(whitespace));
  const minFn = istring("min").next(calcArgList.wrap(lparen, rparen)).map((args) => new FunctionValue("min", args));
  const maxFn = istring("max").next(calcArgList.wrap(lparen, rparen)).map((args) => new FunctionValue("max", args));
  const clampFn = istring("clamp").next(calcArgList.wrap(lparen, rparen)).map((args) => {
    if (args.length !== 3) throw new Error("clamp() requires exactly 3 arguments");
    return new FunctionValue("clamp", args);
  });
  const roundStrategy = any(
    istring("nearest"),
    istring("up"),
    istring("down"),
    istring("to-zero")
  ).trim(whitespace);
  const roundFn = istring("round").next(
    any(
      // branch 1: explicit <rounding-strategy>, comma, then A, B
      all(
        roundStrategy.skip(comma.trim(whitespace)),
        calcArgList
      ),
      // branch 2: strategy OMITTED (spec-legal) — defaults to "nearest"
      calcArgList.map(
        (args) => ["nearest", args]
      )
    ).wrap(lparen, rparen)
  ).map(([strategy, args]) => {
    const strategyVal = new ValueUnit(strategy, "string");
    return new FunctionValue("round", [strategyVal, ...args]);
  });
  const twoArgFn = (name) => istring(name).next(calcArgList.wrap(lparen, rparen)).map((args) => {
    if (args.length !== 2) throw new Error(`${name}() requires exactly 2 arguments`);
    return new FunctionValue(name, args);
  });
  const singleArgFn = (name) => istring(name).next(calcArg.trim(whitespace).wrap(lparen, rparen)).map((arg) => new FunctionValue(name, [arg]));
  const powFn = twoArgFn("pow");
  const atan2Fn = twoArgFn("atan2");
  const hypotFn = istring("hypot").next(calcArgList.wrap(lparen, rparen)).map((args) => new FunctionValue("hypot", args));
  const logFn = istring("log").next(calcArgList.wrap(lparen, rparen)).map((args) => {
    if (args.length < 1 || args.length > 2) throw new Error("log() requires 1 or 2 arguments");
    return new FunctionValue("log", args);
  });
  const identContinuation = regex(/[a-zA-Z0-9_-]/);
  const cssConstants = any(
    istring("infinity").not(identContinuation).map(() => new ValueUnit(Infinity)),
    istring("-infinity").not(identContinuation).map(() => new ValueUnit(-Infinity)),
    istring("NaN").not(identContinuation).map(() => new ValueUnit(NaN)),
    istring("pi").not(identContinuation).map(() => new ValueUnit(Math.PI)),
    istring("e").not(identContinuation).map(() => new ValueUnit(Math.E))
  );
  const allMathFunctions = any(
    calcFn,
    minFn,
    maxFn,
    clampFn,
    roundFn,
    twoArgFn("mod"),
    twoArgFn("rem"),
    singleArgFn("abs"),
    singleArgFn("sign"),
    singleArgFn("sin"),
    singleArgFn("cos"),
    singleArgFn("tan"),
    singleArgFn("asin"),
    singleArgFn("acos"),
    singleArgFn("atan"),
    atan2Fn,
    powFn,
    singleArgFn("sqrt"),
    hypotFn,
    logFn,
    singleArgFn("exp"),
    cssConstants
  );
  return {
    calcFn,
    mathFunction: allMathFunctions,
    calcSum
  };
}
function resolveToNumber(node) {
  if (node instanceof ValueUnit) {
    if (node.unit === "var" || node.unit === "calc") {
      return null;
    }
    if (typeof node.value === "number") {
      return node.value;
    }
    return null;
  }
  if (node instanceof FunctionValue) {
    return evaluateMathFunctionInternal(node);
  }
  if (typeof node === "number") {
    return node;
  }
  return null;
}
function resolveToRadians(node) {
  if (node instanceof ValueUnit) {
    if (typeof node.value !== "number") return null;
    if (node.unit && node.superType?.[0] === "angle") {
      const deg = convertToDegrees(
        node.value,
        node.unit
      );
      return deg * Math.PI / 180;
    }
    return node.value;
  }
  if (node instanceof FunctionValue) {
    const val = evaluateMathFunctionInternal(node);
    return val;
  }
  return null;
}
function evaluateMathFunctionInternal(fn) {
  const name = fn.name;
  const args = fn.values;
  switch (name) {
    // Arithmetic operators (from calc AST)
    case "+": {
      const l = resolveToNumber(args[0]);
      const r = resolveToNumber(args[1]);
      if (l == null || r == null) return null;
      return l + r;
    }
    case "-": {
      const l = resolveToNumber(args[0]);
      const r = resolveToNumber(args[1]);
      if (l == null || r == null) return null;
      return l - r;
    }
    case "*": {
      const l = resolveToNumber(args[0]);
      const r = resolveToNumber(args[1]);
      if (l == null || r == null) return null;
      return l * r;
    }
    case "/": {
      const l = resolveToNumber(args[0]);
      const r = resolveToNumber(args[1]);
      if (l == null || r == null || r === 0) return null;
      return l / r;
    }
    // calc() wrapper
    case "calc": {
      return resolveToNumber(args[0]);
    }
    // Comparison functions
    case "min": {
      const vals = args.map(resolveToNumber);
      if (vals.some((v) => v == null)) return null;
      return Math.min(...vals);
    }
    case "max": {
      const vals = args.map(resolveToNumber);
      if (vals.some((v) => v == null)) return null;
      return Math.max(...vals);
    }
    case "clamp": {
      if (args.length !== 3) return null;
      const [lo, val, hi] = args.map(resolveToNumber);
      if (lo == null || val == null || hi == null) return null;
      return Math.max(lo, Math.min(val, hi));
    }
    // Stepped value functions
    case "round": {
      if (args.length < 3) return null;
      const strategy = args[0] instanceof ValueUnit ? String(args[0].value) : "nearest";
      const a = resolveToNumber(args[1]);
      const b = resolveToNumber(args[2]);
      if (a == null || b == null || b === 0) return null;
      switch (strategy) {
        case "nearest":
          return Math.round(a / b) * b;
        case "up":
          return Math.ceil(a / b) * b;
        case "down":
          return Math.floor(a / b) * b;
        case "to-zero":
          return Math.trunc(a / b) * b;
        default:
          return null;
      }
    }
    case "mod": {
      const a = resolveToNumber(args[0]);
      const b = resolveToNumber(args[1]);
      if (a == null || b == null || b === 0) return null;
      return (a % b + b) % b;
    }
    case "rem": {
      const a = resolveToNumber(args[0]);
      const b = resolveToNumber(args[1]);
      if (a == null || b == null || b === 0) return null;
      return a % b;
    }
    // Sign-related
    case "abs": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      return Math.abs(v);
    }
    case "sign": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      return Math.sign(v);
    }
    // Trigonometric (input in angle units → converted to radians)
    case "sin": {
      const v = resolveToRadians(args[0]);
      if (v == null) return null;
      return Math.sin(v);
    }
    case "cos": {
      const v = resolveToRadians(args[0]);
      if (v == null) return null;
      return Math.cos(v);
    }
    case "tan": {
      const v = resolveToRadians(args[0]);
      if (v == null) return null;
      return Math.tan(v);
    }
    case "asin": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      return Math.asin(v);
    }
    case "acos": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      return Math.acos(v);
    }
    case "atan": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      return Math.atan(v);
    }
    case "atan2": {
      const y = resolveToNumber(args[0]);
      const x = resolveToNumber(args[1]);
      if (y == null || x == null) return null;
      return Math.atan2(y, x);
    }
    // Exponential
    case "pow": {
      const base = resolveToNumber(args[0]);
      const exp = resolveToNumber(args[1]);
      if (base == null || exp == null) return null;
      return Math.pow(base, exp);
    }
    case "sqrt": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      return Math.sqrt(v);
    }
    case "hypot": {
      const vals = args.map(resolveToNumber);
      if (vals.some((v) => v == null)) return null;
      return Math.hypot(...vals);
    }
    case "log": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      if (args.length === 2) {
        const base = resolveToNumber(args[1]);
        if (base == null) return null;
        return Math.log(v) / Math.log(base);
      }
      return Math.log(v);
    }
    case "exp": {
      const v = resolveToNumber(args[0]);
      if (v == null) return null;
      return Math.exp(v);
    }
    default:
      return null;
  }
}
function evaluateMathFunction(fn) {
  const result = evaluateMathFunctionInternal(fn);
  if (result == null) return null;
  const unit = inferResultUnit(fn);
  return new ValueUnit(result, unit?.unit, unit?.superType);
}
function inferResultUnit(node) {
  if (node instanceof ValueUnit) {
    if (node.unit && node.unit !== "string" && typeof node.value === "number") {
      const result = { unit: node.unit };
      if (node.superType) result.superType = node.superType;
      return result;
    }
    return void 0;
  }
  if (node instanceof FunctionValue) {
    if (["sin", "cos", "tan"].includes(node.name)) {
      return void 0;
    }
    if (["asin", "acos", "atan", "atan2"].includes(node.name)) {
      return { unit: "rad", superType: ["angle"] };
    }
    for (const arg of node.values) {
      const u = inferResultUnit(arg);
      if (u) return u;
    }
  }
  return void 0;
}

// deposed-full/src/parsing/color/relative-color.ts
var _relativeCalcExpr = null;
function getRelativeCalcExpr() {
  if (_relativeCalcExpr) return _relativeCalcExpr;
  const { mathFunction } = createMathFunctionParsers(CSSValueUnit.Value);
  _relativeCalcExpr = createCalcParser(CSSValueUnit.Value, mathFunction);
  return _relativeCalcExpr;
}
function evaluateRelativeCalc(expr) {
  const ast = tryParse(getRelativeCalcExpr(), expr);
  if (ast instanceof ValueUnit) {
    return ast.value;
  }
  if (ast instanceof FunctionValue) {
    const result = evaluateMathFunction(ast);
    if (result == null || typeof result.value !== "number") {
      throw new Error(`Could not evaluate calc expression: ${expr}`);
    }
    return result.value;
  }
  throw new Error(`Could not evaluate calc expression: ${expr}`);
}
function resolveExpr(expr, bindings) {
  switch (expr.type) {
    case "ref":
      return bindings[expr.name] ?? 0;
    case "literal":
      return expr.value;
    case "none":
      return NaN;
    case "calc": {
      let s = expr.expr;
      const keys = Object.keys(bindings).sort((a, b) => b.length - a.length);
      for (const k of keys) {
        s = s.replace(new RegExp(`\\b${k}\\b`, "g"), String(bindings[k]));
      }
      return evaluateRelativeCalc(s);
    }
  }
}
function resolveRelativeColor(originUnit, targetSpace, componentExprs, alphaExpr) {
  const plainOrigin = resolveToPlainColor(originUnit);
  const converted = color2(plainOrigin, targetSpace);
  const originAlpha = ValueUnit.unwrapDeep(
    converted.alpha
  );
  const physical = normalizeColor(converted, true);
  const bindings = {};
  for (const key of physical.keys()) {
    bindings[key] = key === "alpha" ? originAlpha : ValueUnit.unwrapDeep(physical[key]);
  }
  const channels = physical.channels;
  const values = componentExprs.map((expr, i) => {
    const key = channels[i];
    const unit = physical[key].unit;
    return new ValueUnit(resolveExpr(expr, bindings), unit);
  });
  const alpha = new ValueUnit(
    alphaExpr ? resolveExpr(alphaExpr, bindings) : originAlpha ?? 1
  );
  const CONSTRUCTORS = {
    rgb: RGBColor,
    hsl: HSLColor,
    hwb: HWBColor,
    lab: LABColor,
    lch: LCHColor,
    oklab: OKLABColor,
    oklch: OKLCHColor,
    xyz: XYZColor,
    "srgb-linear": LinearSRGBColor,
    "display-p3": DisplayP3Color,
    "a98-rgb": AdobeRGBColor,
    "prophoto-rgb": ProPhotoRGBColor,
    rec2020: Rec2020Color
  };
  const Ctor = CONSTRUCTORS[targetSpace] ?? RGBColor;
  const result = new Ctor(...values, alpha);
  return createColorValueUnit(result);
}

// deposed-full/src/parsing/color/color.ts
var COLOR_MIX_SPACE_MAP = {
  srgb: "rgb",
  "srgb-linear": "srgb-linear",
  "display-p3": "display-p3",
  "a98-rgb": "a98-rgb",
  "prophoto-rgb": "prophoto-rgb",
  rec2020: "rec2020",
  lab: "lab",
  oklab: "oklab",
  oklch: "oklch",
  hsl: "hsl",
  hwb: "hwb",
  lch: "lch",
  xyz: "xyz",
  "xyz-d65": "xyz",
  "xyz-d50": "xyz"
};
var COLOR_FUNCTION_SPACES = {
  srgb: { space: "rgb", ctor: RGBColor },
  "srgb-linear": { space: "srgb-linear", ctor: LinearSRGBColor },
  "display-p3": { space: "display-p3", ctor: DisplayP3Color },
  "a98-rgb": { space: "a98-rgb", ctor: AdobeRGBColor },
  "prophoto-rgb": { space: "prophoto-rgb", ctor: ProPhotoRGBColor },
  rec2020: { space: "rec2020", ctor: Rec2020Color },
  xyz: { space: "xyz", ctor: XYZColor },
  "xyz-d65": { space: "xyz", ctor: XYZColor },
  "xyz-d50": { space: "xyz", ctor: XYZColor }
};
var comma2 = string(",");
var space_ = regex(/\s+/);
var div = string("/");
var lparen2 = string("(");
var rparen2 = string(")");
var sep = any(comma2.trim(whitespace), space_);
var alphaSep = any(div.trim(whitespace), sep);
var colorValue = Parser.lazy(() => any(
  CSSValueUnit.Percentage,
  CSSValueUnit.Angle.map((x) => {
    const deg = convertToDegrees(
      x.value,
      x.unit
    );
    return new ValueUnit(deg, "deg", ["angle"]);
  }),
  any(number, integer).map((x) => new ValueUnit(x)),
  none.map(() => new ValueUnit(NaN))
));
var componentExpr = any(
  // calc(...)
  istring("calc").next(
    regex(/\(([^)]+)\)/, (m) => m?.[1] ?? null)
  ).map((expr) => ({ type: "calc", expr })),
  // none
  none.map(() => ({ type: "none" })),
  // component reference (alpha must be tried before single 'a')
  regex(/\b(alpha|r|g|b|h|s|l|c|w|a|x|y|z)\b/).map(
    (name) => ({ type: "ref", name })
  ),
  // literal number / percentage / angle
  colorValue.map((v) => ({ type: "literal", value: v.value }))
);
var colorOptionalAlpha = (colorSpace) => {
  const name = istring(colorSpace).skip(istring("a").opt());
  const optionalAlpha = any(
    all(colorValue.skip(alphaSep), colorValue),
    colorValue.map((v) => [v])
  );
  const args = all(
    colorValue.skip(sep),
    colorValue.skip(sep),
    optionalAlpha
  ).trim(whitespace).wrap(lparen2, rparen2);
  return name.next(args).map(([x, y, [z, a]]) => {
    return [x, y, z, a ?? new ValueUnit(1)];
  });
};
function relativeColorParser(cssName, targetSpace) {
  return istring(cssName).skip(istring("a").opt()).next(
    all(
      istring("from").skip(whitespace).next(Parser.lazy(() => CSSColor.Value)),
      whitespace.next(componentExpr),
      whitespace.next(componentExpr),
      whitespace.next(componentExpr),
      div.trim(whitespace).next(componentExpr).opt()
    ).trim(whitespace).wrap(lparen2, rparen2)
  ).map(([origin, c1, c2, c3, alphaExpr]) => {
    return resolveRelativeColor(origin, targetSpace, [c1, c2, c3], alphaExpr);
  });
}
var hex = regex(/#[0-9a-fA-F]{3,8}/).map((x) => {
  const { r, g, b, alpha } = hex2rgb(x);
  return createColorValueUnit(new RGBColor(r, g, b, alpha));
});
var kelvin = number.skip(istring("k")).map((k) => {
  const rgb = kelvin2rgb(new KelvinColor(k));
  return createColorValueUnit(rgb);
});
var rgbParser = any(
  relativeColorParser("rgb", "rgb"),
  colorOptionalAlpha("rgb").map(
    ([r, g, b, alpha]) => createColorValueUnit(new RGBColor(r, g, b, alpha))
  )
);
var hslParser = any(
  relativeColorParser("hsl", "hsl"),
  colorOptionalAlpha("hsl").map(
    ([h, s, l, alpha]) => createColorValueUnit(new HSLColor(h, s, l, alpha))
  )
);
var hsvParser = colorOptionalAlpha("hsv").map(
  ([h, s, v, alpha]) => {
    return createColorValueUnit(new HSVColor(h, s, v, alpha));
  }
);
var hwbParser = any(
  relativeColorParser("hwb", "hwb"),
  colorOptionalAlpha("hwb").map(
    ([h, w, b, alpha]) => createColorValueUnit(new HWBColor(h, w, b, alpha))
  )
);
var labParser = any(
  relativeColorParser("lab", "lab"),
  colorOptionalAlpha("lab").map(
    ([l, a, b, alpha]) => createColorValueUnit(new LABColor(l, a, b, alpha))
  )
);
var lchParser = any(
  relativeColorParser("lch", "lch"),
  colorOptionalAlpha("lch").map(
    ([l, c, h, alpha]) => createColorValueUnit(new LCHColor(l, c, h, alpha))
  )
);
var oklabParser = any(
  relativeColorParser("oklab", "oklab"),
  colorOptionalAlpha("oklab").map(
    ([l, a, b, alpha]) => createColorValueUnit(new OKLABColor(l, a, b, alpha))
  )
);
var oklchParser = any(
  relativeColorParser("oklch", "oklch"),
  colorOptionalAlpha("oklch").map(
    ([l, c, h, alpha]) => createColorValueUnit(new OKLCHColor(l, c, h, alpha))
  )
);
var xyzParser = any(
  relativeColorParser("xyz", "xyz"),
  colorOptionalAlpha("xyz").map(
    ([x, y, z, alpha]) => createColorValueUnit(new XYZColor(x, y, z, alpha))
  )
);
var ictcpParser = colorOptionalAlpha("ictcp").map(
  ([i, ct, cp, alpha]) => createColorValueUnit(new ICtCpColor(i, ct, cp, alpha))
);
var jzazbzParser = colorOptionalAlpha("jzazbz").map(
  ([jz, az, bz, alpha]) => createColorValueUnit(new JzazbzColor(jz, az, bz, alpha))
);
var colorMixSpace = any(
  istring("srgb-linear").map(() => "srgb-linear"),
  istring("srgb").map(() => "srgb"),
  istring("display-p3").map(() => "display-p3"),
  istring("a98-rgb").map(() => "a98-rgb"),
  istring("prophoto-rgb").map(() => "prophoto-rgb"),
  istring("rec2020").map(() => "rec2020"),
  istring("oklab").map(() => "oklab"),
  istring("oklch").map(() => "oklch"),
  istring("lab").map(() => "lab"),
  istring("lch").map(() => "lch"),
  istring("hsl").map(() => "hsl"),
  istring("hwb").map(() => "hwb"),
  istring("xyz-d65").map(() => "xyz-d65"),
  istring("xyz-d50").map(() => "xyz-d50"),
  istring("xyz").map(() => "xyz")
);
var colorMixHueMethod = any(
  istring("shorter"),
  istring("longer"),
  istring("increasing"),
  istring("decreasing")
).skip(whitespace).skip(istring("hue"));
var colorMixColorPct = Parser.lazy(
  () => all(
    CSSColor.Value,
    whitespace.next(CSSValueUnit.Percentage).opt()
  )
);
var colorMix = istring("color-mix").next(
  all(
    // "in <space> [<hueMethod>]"
    istring("in").skip(whitespace).next(
      all(
        colorMixSpace,
        whitespace.next(colorMixHueMethod).opt()
      )
    ),
    // ", <color> [<pct>]?"
    string(",").trim(whitespace).next(colorMixColorPct),
    // ", <color> [<pct>]?"
    string(",").trim(whitespace).next(colorMixColorPct)
  ).trim(whitespace).wrap(lparen2, rparen2)
).map(([[spaceName, hueMethod], [color1Unit, pct1], [color2Unit, pct2]]) => {
  const space2 = COLOR_MIX_SPACE_MAP[spaceName] ?? "oklab";
  const method = hueMethod ?? "shorter";
  let p1 = pct1 != null ? pct1.value / 100 : -1;
  let p2 = pct2 != null ? pct2.value / 100 : -1;
  if (p1 < 0 && p2 < 0) {
    p1 = 0.5;
    p2 = 0.5;
  } else if (p1 < 0) {
    p1 = 1 - p2;
  } else if (p2 < 0) {
    p2 = 1 - p1;
  }
  const c1 = resolveToPlainColor(color1Unit);
  const c2 = resolveToPlainColor(color2Unit);
  const mixed = mixColors(c1, c2, p1, p2, space2, method);
  const alpha = mixed.alpha;
  const physical = normalizeColor(mixed, true);
  for (const key of physical.channels) {
    const channel = physical[key];
    const raw = ValueUnit.unwrapDeep(channel);
    physical[key] = new ValueUnit(
      Number(raw.toPrecision(12)),
      channel.unit
    );
  }
  physical.alpha = new ValueUnit(alpha);
  return createColorValueUnit(physical);
});
var contrastColorFn = istring("contrast-color").next(
  Parser.lazy(() => CSSColor.Value).trim(whitespace).wrap(lparen2, rparen2)
).map((colorUnit) => {
  const parsed = colorUnit.value;
  return createColorValueUnit(
    contrastColor(parsed)
  );
});
var colorFunctionSpaces = any(
  istring("srgb-linear").map(() => "srgb-linear"),
  istring("srgb").map(() => "srgb"),
  istring("display-p3").map(() => "display-p3"),
  istring("a98-rgb").map(() => "a98-rgb"),
  istring("prophoto-rgb").map(() => "prophoto-rgb"),
  istring("rec2020").map(() => "rec2020"),
  istring("xyz-d65").map(() => "xyz-d65"),
  istring("xyz-d50").map(() => "xyz-d50"),
  istring("xyz").map(() => "xyz")
);
var colorFunction = istring("color").next(
  all(
    colorFunctionSpaces.skip(whitespace),
    colorValue.skip(whitespace),
    colorValue.skip(whitespace),
    any(
      all(
        colorValue.skip(div.trim(whitespace)),
        colorValue
      ),
      colorValue.map((v) => [v, void 0])
    )
  ).trim(whitespace).wrap(lparen2, rparen2)
).map(([spaceName, c1, c2, [c3, alphaVal]]) => {
  const mapping = COLOR_FUNCTION_SPACES[spaceName];
  if (!mapping) {
    throw new Error(`Unknown color() space: ${spaceName}`);
  }
  const alpha = alphaVal ?? new ValueUnit(1);
  if (spaceName === "srgb") {
    const s = (v) => v.value * 255;
    return createColorValueUnit(new RGBColor(s(c1), s(c2), s(c3), alpha.value));
  }
  const result = new mapping.ctor(c1, c2, c3, alpha);
  if (spaceName === "xyz-d50" && result instanceof XYZColor) {
    result.whitePoint = "D50";
  }
  return createColorValueUnit(result);
});
var KNOWN_COLOR_NAMES = new Set(Object.keys(COLOR_NAMES));
var namedColorIdent = regex(/[a-zA-Z][a-zA-Z0-9-]*/);
var nameParser = namedColorIdent.chain((x) => {
  const key = x.toLowerCase();
  if (KNOWN_COLOR_NAMES.has(key)) {
    const c = COLOR_NAMES[key];
    if (c) {
      const value = parseCSSValueUnit(c);
      if (value) {
        return succeed(value);
      }
    }
  }
  return fail(`Invalid color name: ${x}`);
});
var SYSTEM_COLOR_NAMES = [
  // CSS Color 4 §6.2
  "Canvas",
  "CanvasText",
  "LinkText",
  "VisitedText",
  "ActiveText",
  "ButtonFace",
  "ButtonText",
  "ButtonBorder",
  "Field",
  "FieldText",
  "Highlight",
  "HighlightText",
  "SelectedItem",
  "SelectedItemText",
  "Mark",
  "MarkText",
  "GrayText",
  "AccentColor",
  "AccentColorText",
  // Legacy / deprecated CSS Color 3 §4.5 set
  "ActiveBorder",
  "ActiveCaption",
  "AppWorkspace",
  "Background",
  "ButtonHighlight",
  "ButtonShadow",
  "CaptionText",
  "InactiveBorder",
  "InactiveCaption",
  "InactiveCaptionText",
  "InfoBackground",
  "InfoText",
  "Menu",
  "MenuText",
  "Scrollbar",
  "ThreeDDarkShadow",
  "ThreeDFace",
  "ThreeDHighlight",
  "ThreeDLightShadow",
  "ThreeDShadow",
  "Window",
  "WindowFrame",
  "WindowText"
];
var SYSTEM_COLOR_LUT = new Map(
  SYSTEM_COLOR_NAMES.map((n) => [n.toLowerCase(), n])
);
var systemColorParser = namedColorIdent.chain((x) => {
  const canonical = SYSTEM_COLOR_LUT.get(x.toLowerCase());
  if (canonical != null) {
    return succeed(new ValueUnit(canonical, "system-color", ["color"]));
  }
  return fail(`Not a system color: ${x}`);
});
var CURRENT_COLOR_KEYWORD = "currentColor";
var currentColorParser = istring(CURRENT_COLOR_KEYWORD).map(() => new ValueUnit(CURRENT_COLOR_KEYWORD, "color-keyword", ["color"]));
var lightDarkParser = istring("light-dark").next(
  all(
    Parser.lazy(() => Value).skip(sep),
    Parser.lazy(() => Value)
  ).trim(whitespace).wrap(lparen2, rparen2).map(([light, dark]) => {
    const fn = new FunctionValue("light-dark", [light, dark]);
    return new ValueUnit(fn, "color-keyword", ["color"]);
  })
);
var namedThenSystem = any(nameParser, systemColorParser);
var letterBuckets = {
  c: any(
    currentColorParser,
    colorMix,
    contrastColorFn,
    colorFunction,
    namedThenSystem
  ),
  r: any(rgbParser, namedThenSystem),
  h: any(hslParser, hsvParser, hwbParser, namedThenSystem),
  l: any(labParser, lchParser, lightDarkParser, namedThenSystem),
  o: any(oklabParser, oklchParser, namedThenSystem),
  x: any(xyzParser, namedThenSystem),
  // `ictcp(…)` sits ahead of the `i…` named colors (indianred/indigo/ivory);
  // `jzazbz(…)` has no `j…` named-color collision but keeps the fallback for
  // uniformity (S.W1 remediation, 3.1.0).
  i: any(ictcpParser, namedThenSystem),
  j: any(jzazbzParser, namedThenSystem)
};
var dispatchTable = {
  "#": hex,
  "0-9": kelvin,
  "+": kelvin,
  "-": kelvin,
  ".": kelvin
};
for (let cc = 97; cc <= 122; cc++) {
  const lower = String.fromCharCode(cc);
  const upper = lower.toUpperCase();
  const bucket = letterBuckets[lower] ?? namedThenSystem;
  dispatchTable[lower] = bucket;
  dispatchTable[upper] = bucket;
}
var Value = dispatch(dispatchTable).trim(whitespace);
var CSSColor = {
  Value,
  colorValue,
  componentExpr,
  sep,
  alphaSep,
  div
};
onColorNamesChange(() => {
  parseCSSColor.cache.clear();
});
var parseCSSColor = memoize2(
  (input) => {
    const customColorNames2 = getCustomColorNamesMap();
    if (customColorNames2.size > 0) {
      const key = input.trim().toLowerCase();
      const resolved = customColorNames2.get(key);
      if (resolved) {
        return tryParse(Value, resolved);
      }
    }
    const result = parseResult(Value, input);
    if (result.status) {
      return result.value;
    }
    return tryParse(Value, input);
  },
  { keyFn: (input) => input, maxCacheSize: PARSE_MEMO_MAX_ENTRIES }
);

// deposed-full/src/parsing/units.ts
var lengthUnit = unitParser(LENGTH_UNITS);
var angleUnit = unitParser(ANGLE_UNITS);
var timeUnit = unitParser(TIME_UNITS);
var frequencyUnit = unitParser(FREQUENCY_UNITS);
var resolutionUnit = unitParser(RESOLUTION_UNITS);
var flexUnit = unitParser(FLEX_UNITS);
var percentageUnit = any(...PERCENTAGE_UNITS.map(istring));
var comma3 = string(",");
var space = string(" ");
var sep2 = any(comma3, space).trim(whitespace);
var Length = all(number, lengthUnit).map(([value, unit]) => {
  const superType = ["length"];
  if (RELATIVE_LENGTH_UNITS.includes(unit)) {
    superType.push("relative");
  } else if (ABSOLUTE_LENGTH_UNITS.includes(unit)) {
    superType.push("absolute");
  }
  return new ValueUnit(value, unit, superType);
});
var Angle = all(number, angleUnit).map(([value, unit]) => {
  return new ValueUnit(value, unit, ["angle"]);
});
var Time = all(number, timeUnit).map(([value, unit]) => {
  return new ValueUnit(value, unit, ["time"]);
});
var TimePercentage = Parser.lazy(() => any(Percentage, Time));
var Frequency = all(number, frequencyUnit).map(([value, unit]) => {
  return new ValueUnit(value, unit, ["frequency"]);
});
var Resolution = all(number, resolutionUnit).map(([value, unit]) => {
  return new ValueUnit(value, unit, ["resolution"]);
});
var Flex = all(number, flexUnit).map(([value, unit]) => {
  return new ValueUnit(value, unit, ["flex"]);
});
var Percentage = any(
  all(number, percentageUnit),
  istring("from").map(() => [0, "%"]),
  istring("to").map(() => [100, "%"])
).map(([value, unit]) => {
  return new ValueUnit(value, unit, ["percentage"]);
});
var Color7 = Parser.lazy(() => CSSColor.Value);
var Slash = string("/").trim(whitespace).map(() => new ValueUnit("/", "string"));
var Value2 = any(
  Length,
  Angle,
  Time,
  Frequency,
  Resolution,
  Flex,
  Percentage,
  Color7,
  Slash,
  number.map((x) => new ValueUnit(x)),
  none.map(() => new ValueUnit(NaN))
).trim(whitespace);
var CSSValueUnit = {
  Length,
  Angle,
  Time,
  TimePercentage,
  Frequency,
  Resolution,
  Flex,
  Percentage,
  Color: Color7,
  Slash,
  Value: Value2,
  sep: sep2
};
var parseCSSValueUnit = memoize2(
  (input) => {
    if (input == null || input.trim() === "") {
      return new ValueUnit(0);
    }
    return tryParse(Value2, input);
  },
  { keyFn: (input) => input, maxCacheSize: PARSE_MEMO_MAX_ENTRIES }
);

// deposed-full/src/parsing/index.ts
var lparen3 = string("(");
var rparen3 = string(")");
var comma4 = string(",");
var FunctionArgs = Parser.lazy(
  () => Value3.sepBy(any(comma4, whitespace)).trim(whitespace).map((v) => new ValueArray(...v))
);
var handleFunc = (name) => {
  return all(
    name ? name : identifier,
    FunctionArgs.wrap(lparen3, rparen3)
  );
};
var handleVar = () => {
  const varContent = Parser.lazy(
    () => any(
      regex(/[^()]+/),
      varContent.many(1).wrap(lparen3, rparen3).map((nested) => `(${nested.flat().join("")})`)
    ).many(1)
  );
  return string("var").next(
    varContent.trim(whitespace).wrap(lparen3, rparen3).map((parts) => [parts].flat(Infinity).join(""))
  ).map((value) => {
    return new ValueUnit(value, "var");
  });
};
var { mathFunction: MathFunction, calcFn: CalcFunction } = createMathFunctionParsers(CSSValueUnit.Value);
var TRANSFORM_FUNCTIONS = ["translate", "scale", "rotate", "skew"];
var TRANSFORM_DIMENSIONS = ["x", "y", "z"];
var TRANSFORM_SINGLE_ARG_AXES = {
  translate: ["x"],
  scale: ["x", "y"],
  rotate: ["z"],
  skew: ["x"]
};
var transformDimensions = TRANSFORM_DIMENSIONS.map(istring);
var transformFunctions = TRANSFORM_FUNCTIONS.map(istring);
var handleTransform = () => {
  const nameParser2 = all(
    any(...transformFunctions),
    any(...transformDimensions, string(""))
  );
  const makeTransformName = (name, dim) => {
    return name + dim.toUpperCase();
  };
  const p = handleFunc(nameParser2);
  return p.map(([[name, dim], values]) => {
    const lowerName = name.toLowerCase();
    const dimensions = lowerName === "skew" ? TRANSFORM_DIMENSIONS.filter((d) => d !== "z") : TRANSFORM_DIMENSIONS;
    const transformObject = {};
    if (dim) {
      const newName = lowerName + dim.toUpperCase();
      transformObject[newName] = values[0];
    } else if (values.length === 1) {
      const axes = TRANSFORM_SINGLE_ARG_AXES[lowerName] ?? dimensions;
      axes.forEach((d) => {
        const newName = makeTransformName(lowerName, d);
        transformObject[newName] = values[0];
      });
    } else {
      values.forEach((v, i) => {
        const newName = makeTransformName(lowerName, dimensions[i]);
        transformObject[newName] = v;
      });
    }
    const newValues = Object.entries(transformObject).map(([k, v]) => {
      return new FunctionValue(k, [v]);
    });
    return new ValueArray(...newValues);
  });
};
var gradientDirections = {
  left: 270,
  right: 90,
  top: 0,
  bottom: 180
};
var twoKeywordCorners = {
  "top left": 315,
  "left top": 315,
  "top right": 45,
  "right top": 45,
  "bottom right": 135,
  "right bottom": 135,
  "bottom left": 225,
  "left bottom": 225
};
var handleGradient = () => {
  const gradientNames = [
    "linear-gradient",
    "radial-gradient",
    "conic-gradient",
    "repeating-linear-gradient",
    "repeating-radial-gradient",
    "repeating-conic-gradient"
  ];
  const name = any(...gradientNames.map(istring));
  const sideKeyword = any(...["left", "right", "top", "bottom"].map(istring));
  const twoKeywordCorner = all(
    string("to").skip(whitespace),
    sideKeyword.skip(whitespace),
    sideKeyword
  ).map(([, d1, d2]) => {
    const key = `${d1.toLowerCase()} ${d2.toLowerCase()}`;
    const deg = twoKeywordCorners[key];
    if (deg == null) throw new Error(`Invalid gradient corner: to ${d1} ${d2}`);
    return new ValueUnit(deg, "deg");
  });
  const singleSide = all(
    string("to").skip(whitespace),
    sideKeyword
  ).map(([, direction2]) => {
    return new ValueUnit(gradientDirections[direction2.toLowerCase()], "deg");
  });
  const sideOrCorner = any(twoKeywordCorner, singleSide);
  const fromAngle = all(
    istring("from").skip(whitespace),
    CSSValueUnit.Angle
  ).map(([, angle]) => angle);
  const direction = any(CSSValueUnit.Angle, sideOrCorner);
  const lengthPercentage = any(CSSValueUnit.Length, CSSValueUnit.Percentage);
  const linearColorStop = all(
    CSSValueUnit.Color,
    lengthPercentage.sepBy(whitespace)
  ).map(([color, stops]) => {
    if (!stops || stops.length === 0) {
      return [color];
    } else {
      return [color, ...stops];
    }
  });
  const colorStopList = all(
    linearColorStop,
    comma4.trim(whitespace).next(any(linearColorStop, lengthPercentage)).many()
  ).map(([first, rest]) => {
    return [first, ...rest];
  });
  const gradientBody = any(
    // branch 1: direction-first (angle OR side-or-corner, comma, then stops)
    all(
      any(fromAngle, direction).skip(comma4.trim(whitespace)),
      colorStopList
    ).map(([dir, stops]) => [dir, ...stops].flat()),
    // branch 2: stops-only (no direction)
    colorStopList.map((stops) => stops.flat())
  ).trim(whitespace).wrap(lparen3, rparen3);
  const linearGradient = all(name, gradientBody).map(
    ([name2, values]) => {
      return new FunctionValue(name2, values);
    }
  );
  return linearGradient;
};
var handleCubicBezier = () => {
  return handleFunc(string("cubic-bezier")).map((v) => {
    return new FunctionValue("cubic-bezier", v[1]);
  });
};
var splitIfClauses = (body) => {
  const branches = splitTopLevel(body, (c) => c === ";", {
    brackets: BRACKETS_ALL,
    strings: false,
    trim: false,
    keepEmpty: true
  });
  if (branches.length > 0 && branches[branches.length - 1].trim() === "") {
    branches.pop();
  }
  return branches.map((branch) => {
    const colon2 = findTopLevel(branch, (c) => c === ":", {
      brackets: BRACKETS_ALL,
      strings: false
    });
    if (colon2 < 0) {
      return { condition: null, value: branch.trim() };
    }
    const condRaw = branch.slice(0, colon2).trim();
    const value = branch.slice(colon2 + 1).trim();
    const condition = condRaw.toLowerCase() === "else" ? null : condRaw;
    return { condition, value };
  });
};
var handleIf = () => {
  const scanBody = new Parser((state) => {
    const { src, offset } = state;
    if (src[offset] !== "(") {
      return state.err(void 0, offset);
    }
    let depth = 0;
    let i = offset;
    for (; i < src.length; i++) {
      const c = src[i];
      if (c === "(") depth++;
      else if (c === ")") {
        depth--;
        if (depth === 0) break;
      }
    }
    if (depth !== 0 || src[i] !== ")") {
      return state.err(void 0, offset);
    }
    const body = src.slice(offset + 1, i);
    return state.ok(body, i + 1);
  });
  return istring("if").next(scanBody).map((body) => {
    const clauses = splitIfClauses(body);
    const values = [];
    for (const c of clauses) {
      if (c.condition !== null) {
        values.push(new ValueUnit(c.condition, "string"));
      }
      values.push(new ValueUnit(c.value, "string"));
    }
    if (values.length === 0) {
      values.push(
        new ValueUnit("", "string"),
        new ValueUnit("", "string"),
        new ValueUnit("", "string")
      );
    }
    return new FunctionValue("if", values);
  });
};
var CSS_WIDE_KEYWORDS = ["inherit", "initial", "unset", "revert", "revert-layer"];
var CSSWideKeyword = any(
  ...CSS_WIDE_KEYWORDS.map(istring)
).map((keyword) => new ValueUnit(keyword.toLowerCase(), "string", ["keyword"]));
var CSSString = regex(/[^\(\)\{\}\s,;]+/).map((x) => new ValueUnit(x));
var fnTransform = handleTransform();
var fnVar = handleVar();
var fnIf = handleIf();
var fnMath = MathFunction;
var fnGradient = handleGradient();
var fnCubicBezier = handleCubicBezier();
var fnGeneric = handleFunc().map(
  ([name, values]) => new FunctionValue(name, values)
);
var fnDashed = handleFunc(dashedIdentifier).map(
  ([name, values]) => new FunctionValue(name, values)
);
var bucketT = any(fnTransform, fnGeneric);
var bucketV = any(fnVar, fnGeneric);
var bucketI = any(fnIf, fnMath, fnGeneric);
var bucketC = any(fnMath, fnGradient, fnCubicBezier, fnGeneric);
var bucketL = any(fnMath, fnGradient, fnGeneric);
var bucketR = any(fnTransform, fnMath, fnGradient, fnGeneric);
var bucketS = any(fnTransform, fnMath, fnGeneric);
var bucketMath = any(fnMath, fnGeneric);
var bucketDash = any(fnDashed, fnMath, fnGeneric);
var Function_ = dispatch({
  // generic fallback across the entire identifier-start space
  "a-z": fnGeneric,
  "A-Z": fnGeneric,
  // specific first-char buckets (lowercase + uppercase)
  "-": bucketDash,
  // --ident(args) call arm, then -infinity(const) math, then generic
  tT: bucketT,
  vV: bucketV,
  iI: bucketI,
  cC: bucketC,
  lL: bucketL,
  rR: bucketR,
  sS: bucketS,
  mM: bucketMath,
  aA: bucketMath,
  pP: bucketMath,
  hH: bucketMath,
  eE: bucketMath,
  nN: bucketMath
});
var Value3 = any(CSSWideKeyword, CSSValueUnit.Value, Function_, CSSString).trim(whitespace);
var CSSJSON = all(string("{"), regex(/[^{}]+/), string("}")).map(
  (x) => {
    const s = x.join("\n");
    let obj = JSON.parse(s);
    return new ValueUnit(obj, "json");
  }
);
var ValuesValue = any(CSSWideKeyword, MathFunction, CSSValueUnit.Value, Function_, CSSJSON, CSSString).trim(whitespace);
var CSSValues = {
  Value: ValuesValue,
  Values: ValuesValue.sepBy(whitespace)
};
var CSSParseError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "CSSParseError";
  }
};
var ValuesValueEOF = ValuesValue.eof();
var parseCSSValue = memoize2(
  (input) => {
    try {
      return tryParse(ValuesValueEOF, input);
    } catch (cause) {
      throw new CSSParseError(
        `parseCSSValue could not fully parse ${JSON.stringify(input)}: it parses a SINGLE CSS value and rejects unconsumed trailing tokens \u2014 use parseCSSValues for a whitespace/comma-separated list.`,
        { cause }
      );
    }
  },
  // maxCacheSize (W1-5): bound the cache — see PARSE_MEMO_MAX_ENTRIES.
  { keyFn: (input) => input, maxCacheSize: PARSE_MEMO_MAX_ENTRIES }
);
var parseCSSPercent = memoize2(
  (input) => tryParse(CSSValueUnit.Percentage, String(input)).valueOf(),
  {
    keyFn: (input) => String(input),
    maxCacheSize: PARSE_MEMO_MAX_ENTRIES
  }
);
var parseCSSTime = memoize2(
  (input) => {
    return tryParse(
      CSSValueUnit.Time.map((v) => {
        if (v.unit === "ms") {
          return v.value;
        } else if (v.unit === "s") {
          return v.value * 1e3;
        } else {
          return v.value;
        }
      }),
      input
    );
  },
  // maxCacheSize (W1-5): bound the cache — see PARSE_MEMO_MAX_ENTRIES.
  { keyFn: (input) => input, maxCacheSize: PARSE_MEMO_MAX_ENTRIES }
);

// deposed-full/src/parsing/stylesheet/stylesheet.ts
var ws = whitespace;
var lcurly = string("{");
var rcurly = string("}");
var lparen4 = string("(");
var rparen4 = string(")");
var lbrack = string("[");
var rbrack = string("]");
var semi = string(";");
var colon = string(":");
var comma5 = string(",");
var at = string("@");
var customPropertyName = regex(/--[a-zA-Z_][a-zA-Z0-9_-]*/);
var declarationName = any(
  customPropertyName,
  identifier
);
var stripCSSComments = (input) => input.replace(/\/\*[\s\S]*?\*\//g, "");
var balancedText2 = balancedText;
var declarationValueText = balancedText2((input, i) => {
  const ch2 = input[i];
  if (ch2 === ";" || ch2 === "}") return true;
  if (ch2 === "!") {
    return /^!important\b/i.test(input.slice(i));
  }
  return false;
});
var selectorListText = balancedText2(
  (input, i) => input[i] === "{" || input[i] === ";"
);
var blockBody = balancedText2(
  (input, i) => input[i] === "}"
);
var atRulePrelude = balancedText2((input, i) => {
  const ch2 = input[i];
  return ch2 === "{" || ch2 === ";";
});
var importantFlag = string("!").skip(ws).next(istring("important")).map(() => true);
var parseDeclarationValue = (text) => {
  const trimmed = text.trim();
  if (trimmed.length === 0) return new ValueArray();
  const result = parseResult(CSSValues.Values, trimmed);
  if (result.status && Array.isArray(result.value) && result.value.length > 0) {
    const flat = [];
    for (const v of result.value) {
      if (Array.isArray(v)) {
        for (const inner of v) flat.push(inner);
      } else {
        flat.push(v);
      }
    }
    return new ValueArray(...flat);
  }
  return new ValueArray(new ValueUnit(trimmed, "string"));
};
var declaration = all(
  declarationName.skip(colon.trim(ws)),
  declarationValueText,
  importantFlag.opt()
).skip(semi.opt()).trim(ws).map(([name, valueText, important]) => {
  const value = parseDeclarationValue(valueText);
  value.setProperty(name);
  return {
    name,
    value,
    important: important === true
  };
});
var declarationList = declaration.many();
var namedKeyframeSelector = any(
  istring("entry"),
  istring("exit"),
  istring("cover"),
  istring("contain")
).map((name) => ({
  kind: "named",
  name: name.toLowerCase()
}));
var fromKeyword = istring("from").map(
  () => ({ kind: "percent", value: 0 })
);
var toKeyword = istring("to").map(
  () => ({ kind: "percent", value: 100 })
);
var percentSelector = CSSValueUnit.Percentage.map(
  (v) => ({
    kind: "percent",
    value: Number(v.valueOf())
  })
);
var bareNumberSelector = number.map(
  (n) => ({ kind: "percent", value: n })
);
var keyframeSelector = any(
  percentSelector,
  fromKeyword,
  toKeyword,
  namedKeyframeSelector,
  bareNumberSelector
).trim(ws);
var keyframeSelectorList = keyframeSelector.sepBy(comma5.trim(ws));
var KEYFRAME_TIMING_PROPERTY = "animation-timing-function";
var KEYFRAME_COMPOSITION_PROPERTY = "animation-composition";
var liftKeyframeMetadata = (declarations) => {
  const out = { declarations: [] };
  for (const d of declarations) {
    if (d.important) {
      continue;
    }
    if (d.name === KEYFRAME_TIMING_PROPERTY) {
      out.timingFunction = d.value.toString().trim();
      continue;
    }
    if (d.name === KEYFRAME_COMPOSITION_PROPERTY) {
      const v = d.value.toString().trim().toLowerCase();
      if (v === "replace" || v === "add" || v === "accumulate") {
        out.composition = v;
      }
      continue;
    }
    out.declarations.push(d);
  }
  return out;
};
var keyframeRule = all(
  keyframeSelectorList,
  declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws))
).trim(ws).map(([selectors, declarations]) => {
  const lifted = liftKeyframeMetadata(declarations);
  const out = {
    selectors,
    declarations: lifted.declarations
  };
  if (lifted.timingFunction != null) {
    out.timingFunction = lifted.timingFunction;
  }
  if (lifted.composition != null) {
    out.composition = lifted.composition;
  }
  return out;
});
var keyframesBody = all(
  identifier.trim(ws).opt(),
  keyframeRule.many().trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws))
).map((parts) => {
  const rules = parts[parts.length - 1];
  const name = parts.length === 2 ? parts[0] : void 0;
  const out = name != null ? { kind: "keyframes", name, rules } : { kind: "keyframes", rules };
  return out;
});
var buildPropertyDescriptor = (declarations) => {
  const desc = {};
  for (const d of declarations) {
    if (d.name === "syntax") {
      const raw = d.value.toString().trim();
      desc.syntax = raw.replace(/^["']|["']$/g, "");
    } else if (d.name === "inherits") {
      const v = d.value.toString().trim().toLowerCase();
      desc.inherits = v === "true";
    } else if (d.name === "initial-value") {
      desc.initialValue = d.value;
    }
  }
  return desc;
};
var propertyBody = all(
  customPropertyName.trim(ws),
  declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws))
).map(
  ([name, decls]) => ({
    kind: "property",
    name,
    descriptor: buildPropertyDescriptor(decls)
  })
);
var splitSelectorList = (text) => splitTopLevel(text, (ch2) => ch2 === ",", {
  brackets: BRACKETS_ROUND_SQUARE
});
var styleBlockItem = Parser.lazy(
  () => any(
    // A nested qualified rule or at-rule. Attempted BEFORE `declaration`
    // because a selector like `.b { … }` would otherwise be mis-consumed as a
    // (malformed) declaration name. `atRule`/`styleRule` only succeed on real
    // nested rules, so a plain `color: red;` still falls through to `declaration`.
    any(atRule, styleRule).map(
      (c) => ({ t: "child", c })
    ),
    declaration.map((d) => ({ t: "decl", d }))
  )
);
var styleBlockContent = styleBlockItem.many().map((items) => {
  const declarations = [];
  const children = [];
  for (const item of items) {
    if (item.t === "decl") declarations.push(item.d);
    else children.push(item.c);
  }
  return { declarations, children };
});
var styleRule = all(
  selectorListText,
  styleBlockContent.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws))
).trim(ws).map(
  ([selectorText, body]) => {
    const item = {
      kind: "style",
      selectors: splitSelectorList(selectorText),
      declarations: body.declarations
    };
    if (body.children.length > 0) item.children = body.children;
    return item;
  }
);
var lazyStylesheetItems = Parser.lazy(
  () => stylesheetItem.many().trim(ws)
);
var recursiveBlock = lazyStylesheetItems.wrap(
  lcurly.trim(ws),
  rcurly.trim(ws)
);
var unknownBody = (atName) => all(
  atRulePrelude.map((s) => s.trim()),
  any(
    semi.map(() => ({ kind: "semi" })),
    recursiveBlock.map((children) => ({
      kind: "block",
      children
    }))
  )
).map(
  ([prelude, bodyPart]) => bodyPart.kind === "semi" ? { kind: "unknown", atName, prelude, body: null } : {
    kind: "unknown",
    atName,
    prelude,
    body: null,
    children: bodyPart.children
  }
);
var topLevelColonIndex = (text) => findTopLevel(text, (ch2) => ch2 === ":", {
  brackets: BRACKETS_ROUND_SQUARE
});
var parseFunctionParameters = (raw) => {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return [];
  return splitSelectorList(trimmed).map((segment) => {
    const colonIdx = topLevelColonIndex(segment);
    const decl = (colonIdx === -1 ? segment : segment.slice(0, colonIdx)).trim();
    const wsIdx = decl.search(/\s/);
    const name = wsIdx === -1 ? decl : decl.slice(0, wsIdx).trim();
    const syntax = wsIdx === -1 ? "" : decl.slice(wsIdx).trim();
    const param = { name };
    if (syntax.length > 0) param.syntax = syntax;
    if (colonIdx !== -1) {
      const def = segment.slice(colonIdx + 1).trim();
      if (def.length > 0) param.default = def;
    }
    return param;
  });
};
var buildFunctionDescriptor = (paramsRaw, declarations) => {
  const desc = {};
  const parameters = parseFunctionParameters(paramsRaw);
  if (parameters.length > 0) desc.parameters = parameters;
  const localDecls = [];
  for (const d of declarations) {
    if (d.name === "result") {
      desc.result = d.value;
    } else {
      localDecls.push(d);
    }
  }
  if (localDecls.length > 0) desc.declarations = localDecls;
  return desc;
};
var functionParamList = balancedText2(
  (input, i) => input[i] === ")"
).wrap(lparen4.trim(ws), rparen4.trim(ws));
var functionBody = all(
  customPropertyName.trim(ws),
  functionParamList.trim(ws),
  declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws))
).map(
  ([name, paramsRaw, decls]) => ({
    kind: "function",
    name,
    descriptor: buildFunctionDescriptor(paramsRaw, decls)
  })
);
var parenSelectorList = balancedText2(
  (input, i) => input[i] === ")"
).wrap(lparen4, rparen4).map((s) => splitSelectorList(s));
var scopeBody = all(
  parenSelectorList.trim(ws).opt(),
  istring("to").trim(ws).next(parenSelectorList.trim(ws)).opt(),
  recursiveBlock.trim(ws)
).map((parts) => {
  const children = parts[parts.length - 1];
  const head = parts.slice(0, parts.length - 1);
  const item = { kind: "scope", children };
  const [root, limit] = head;
  if (root) item.root = root;
  if (limit) item.limit = limit;
  return item;
});
var startingStyleBody = recursiveBlock.trim(ws).map((children) => ({
  kind: "starting-style",
  children
}));
var buildScrollTimelineDescriptor = (declarations) => {
  const desc = {};
  for (const d of declarations) {
    const v = d.value.toString().trim();
    if (d.name === "source") desc.source = v;
    else if (d.name === "orientation") desc.orientation = v;
  }
  return desc;
};
var buildViewTimelineDescriptor = (declarations) => {
  const desc = {};
  for (const d of declarations) {
    const v = d.value.toString().trim();
    if (d.name === "subject") desc.subject = v;
    else if (d.name === "axis") desc.axis = v;
    else if (d.name === "inset") desc.inset = v;
  }
  return desc;
};
var scrollTimelineBody = all(
  customPropertyName.trim(ws),
  declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws))
).map(
  ([name, decls]) => ({
    kind: "scroll-timeline",
    name,
    descriptor: buildScrollTimelineDescriptor(decls)
  })
);
var viewTimelineBody = all(
  customPropertyName.trim(ws),
  declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws))
).map(
  ([name, decls]) => ({
    kind: "view-timeline",
    name,
    descriptor: buildViewTimelineDescriptor(decls)
  })
);
var atRule = at.next(identifier).chain((name) => {
  const lower = name.toLowerCase();
  if (lower === "keyframes") return keyframesBody;
  if (lower === "property") return propertyBody;
  if (lower === "function") return functionBody;
  if (lower === "scope") return scopeBody;
  if (lower === "starting-style") return startingStyleBody;
  if (lower === "scroll-timeline") return scrollTimelineBody;
  if (lower === "view-timeline") return viewTimelineBody;
  return unknownBody(lower);
});
var stylesheetItem = any(atRule, styleRule).trim(ws);
var stylesheet = stylesheetItem.many().trim(ws).eof();
var parseCSSStylesheet = memoize2(
  (input) => tryParse(stylesheet, stripCSSComments(input)),
  // keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see
  // comment in src/parsing/index.ts. maxCacheSize (W1-5): bound the cache.
  { keyFn: (input) => input, maxCacheSize: PARSE_MEMO_MAX_ENTRIES }
);

// deposed-full/src/parsing/animation-shorthand.ts
var tokeniseShorthand = (input) => splitTopLevel(input, (ch2) => /\s/.test(ch2), { brackets: BRACKETS_ROUND });
var TIME_RE = /^-?(?:\d+\.?\d*|\.\d+)(?:s|ms)$/i;
var NUMBER_RE = /^\d+\.?\d*$/;
var NAMED_TIMING = /* @__PURE__ */ new Set([
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "step-start",
  "step-end"
]);
var TIMING_FUNCTIONS = /* @__PURE__ */ new Set([
  "cubic-bezier",
  "steps",
  "linear"
]);
var DIRECTIONS = /* @__PURE__ */ new Set([
  "normal",
  "reverse",
  "alternate",
  "alternate-reverse"
]);
var FILL_MODES = /* @__PURE__ */ new Set(["none", "forwards", "backwards", "both"]);
var COMPOSITIONS = /* @__PURE__ */ new Set(["replace", "add", "accumulate"]);
var PLAY_STATES = /* @__PURE__ */ new Set(["running", "paused"]);
var isTimingToken = (token) => {
  const lower = token.toLowerCase();
  if (NAMED_TIMING.has(lower)) return true;
  const fnName = lower.split("(", 1)[0];
  return TIMING_FUNCTIONS.has(fnName);
};
var isAnimationName = (token) => {
  return /^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(token);
};
var parseSingleAnimation = (input) => {
  const out = {};
  const tokens = tokeniseShorthand(input);
  let timesSeen = 0;
  let nameAssigned = false;
  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (TIME_RE.test(token)) {
      const ms = parseCSSTime(token);
      if (timesSeen === 0) out.duration = ms;
      else if (timesSeen === 1) out.delay = ms;
      timesSeen++;
      continue;
    }
    if (lower === "infinite") {
      out.iterationCount = Infinity;
      continue;
    }
    if (NUMBER_RE.test(token)) {
      const n = Number(token);
      if (Number.isFinite(n) && n >= 0) {
        out.iterationCount = n;
        continue;
      }
    }
    if (DIRECTIONS.has(lower)) {
      out.direction = lower;
      continue;
    }
    if (FILL_MODES.has(lower) && nameAssigned) {
      out.fillMode = lower;
      continue;
    }
    if (FILL_MODES.has(lower) && lower !== "none") {
      out.fillMode = lower;
      continue;
    }
    if (COMPOSITIONS.has(lower)) {
      out.composition = lower;
      continue;
    }
    if (PLAY_STATES.has(lower)) {
      continue;
    }
    if (isTimingToken(token) && out.timingFunction == null) {
      out.timingFunction = token;
      continue;
    }
    if (!nameAssigned && isAnimationName(token)) {
      out.name = token;
      nameAssigned = true;
      continue;
    }
  }
  return out;
};
var parseAnimationShorthand = memoize2(
  (input) => {
    const segments = splitTopLevelCommas(input);
    return segments.map((seg) => parseSingleAnimation(seg));
  },
  // keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see
  // comment in src/parsing/index.ts. maxCacheSize (W1-5): bound the cache.
  { keyFn: (input) => input, maxCacheSize: PARSE_MEMO_MAX_ENTRIES }
);
export {
  CSSValues,
  parseCSSStylesheet,
  parseCSSValue
};
