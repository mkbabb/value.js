import { completeColor } from "./grammar/l4/color.js";
import { completeEasing } from "./grammar/l4/easing.js";
import { stylesheet } from "./grammar/l4/stylesheet.js";
import { lowerColor, lowerEasing, lowerStylesheet } from "./lower.js";
import { parseComplete, type CssParseResult } from "./result.js";
import type { CubicBezierValue, OklchValue, StylesheetValue } from "./value.js";

export function parseColor(source: string): CssParseResult<OklchValue> {
  const parsed = parseComplete(completeColor, source);
  return parsed.ok
    ? { ok: true, value: lowerColor(parsed.value), diagnostics: [] }
    : parsed;
}

export function parseEasing(source: string): CssParseResult<CubicBezierValue> {
  const parsed = parseComplete(completeEasing, source);
  return parsed.ok ? lowerEasing(parsed.value, source) : parsed;
}

export function parseStylesheet(source: string): CssParseResult<StylesheetValue> {
  const parsed = parseComplete(stylesheet, source);
  return parsed.ok ? lowerStylesheet(parsed.value, source) : parsed;
}
