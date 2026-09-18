import type { CssDiagnostic, CssParseResult } from "./result.js";
import { parseComplete } from "./result.js";
import type { CubicBezierCst, OklchCst, StylesheetCst } from "./cst.js";
import type {
  CubicBezierValue,
  DeclarationValue,
  OklchValue,
  StylesheetValue,
} from "./value.js";
import { completeColor } from "./grammar/l4/color.js";
import { completeEasing } from "./grammar/l4/easing.js";

function scalar(value: number, unit: string | null): number {
  return unit === "%" ? value / 100 : value;
}

function degrees(value: number, unit: string | null): number {
  if (unit === "turn") return value * 360;
  if (unit === "grad") return value * 0.9;
  if (unit === "rad") return value * 180 / Math.PI;
  return value;
}

function location(source: string, offset: number): Pick<CssDiagnostic, "line" | "column"> {
  const prefix = source.slice(0, offset);
  const newline = prefix.lastIndexOf("\n");
  return { line: prefix.split("\n").length, column: offset - newline - 1 };
}

export function lowerColor(cst: OklchCst): OklchValue {
  return {
    type: "color",
    space: "oklch",
    channels: [
      scalar(cst.lightness.value, cst.lightness.unit),
      cst.chroma.value,
      degrees(cst.hue.value, cst.hue.unit),
    ],
    alpha: cst.alpha === null ? 1 : scalar(cst.alpha.value, cst.alpha.unit),
  };
}

export function lowerEasing(
  cst: CubicBezierCst,
  source: string = cst.raw,
  baseOffset = 0,
): CssParseResult<CubicBezierValue> {
  const coordinates = cst.coordinates.map((coordinate) => coordinate.value) as [
    number,
    number,
    number,
    number,
  ];
  if (coordinates[0] < 0 || coordinates[0] > 1 || coordinates[2] < 0 || coordinates[2] > 1) {
    const offset = baseOffset + cst.span.start;
    return {
      ok: false,
      diagnostics: [
        {
          code: "CSS_PARSE",
          message: "cubic-bezier x coordinates must lie in [0, 1].",
          offset,
          ...location(source, offset),
          expected: ["x1 and x2 in [0, 1]"],
          found: cst.raw,
        },
      ],
    };
  }
  return {
    ok: true,
    value: { type: "easing", name: "cubic-bezier", coordinates },
    diagnostics: [],
  };
}

function rebaseDiagnostic(diagnostic: CssDiagnostic, offset: number, source: string): CssDiagnostic {
  const absolute = diagnostic.offset + offset;
  return { ...diagnostic, offset: absolute, ...location(source, absolute) };
}

function lowerDeclaration(
  name: string,
  raw: string,
  offset: number,
  source: string,
): CssParseResult<DeclarationValue> {
  const value = raw.replace(/!\s*important\s*$/i, "").trim();
  if (name === "color") {
    const result = parseComplete(completeColor, value);
    return result.ok
      ? { ok: true, value: lowerColor(result.value), diagnostics: [] }
      : { ok: false, diagnostics: result.diagnostics.map((item) => rebaseDiagnostic(item, offset, source)) };
  }
  if (name === "animation-timing-function") {
    const result = parseComplete(completeEasing, value);
    if (!result.ok) {
      return { ok: false, diagnostics: result.diagnostics.map((item) => rebaseDiagnostic(item, offset, source)) };
    }
    return lowerEasing(result.value, source, offset);
  }
  return { ok: true, value, diagnostics: [] };
}

export function lowerStylesheet(cst: StylesheetCst, source: string): CssParseResult<StylesheetValue> {
  const diagnostics: CssDiagnostic[] = [];
  const cssRules = cst.rules.map((rule) => {
    const declarations: Record<string, DeclarationValue> = {};
    for (const declaration of rule.declarations) {
      const name = declaration.name.raw;
      const lowered = lowerDeclaration(name, declaration.value.raw, declaration.value.span.start, source);
      if (lowered.ok) declarations[name] = lowered.value;
      else diagnostics.push(...lowered.diagnostics);
    }
    return {
      type: "style-rule" as const,
      selectorText: rule.selector.raw.trim(),
      declarations,
    };
  });
  return diagnostics.length > 0
    ? { ok: false, diagnostics }
    : { ok: true, value: { type: "stylesheet", cssRules }, diagnostics: [] };
}
