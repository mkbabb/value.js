import type { Span } from "@mkbabb/parse-that";

export interface Captured {
  readonly raw: string;
  readonly span: Span;
}

export interface NumericCst extends Captured {
  readonly kind: "number" | "percentage" | "dimension" | "angle";
  readonly value: number;
  readonly unit: string | null;
}

export interface OklchCst extends Captured {
  readonly kind: "oklch";
  readonly lightness: NumericCst;
  readonly chroma: NumericCst;
  readonly hue: NumericCst;
  readonly alpha: NumericCst | null;
}

export interface CubicBezierCst extends Captured {
  readonly kind: "cubic-bezier";
  readonly coordinates: readonly [NumericCst, NumericCst, NumericCst, NumericCst];
}

export interface SelectorCst extends Captured {
  readonly kind: "selector";
}

export interface DeclarationCst extends Captured {
  readonly kind: "declaration";
  readonly name: Captured;
  readonly value: Captured;
  readonly important: boolean;
}

export interface QualifiedRuleCst extends Captured {
  readonly kind: "qualified-rule";
  readonly selector: SelectorCst;
  readonly declarations: readonly DeclarationCst[];
}

export interface StylesheetCst extends Captured {
  readonly kind: "stylesheet";
  readonly rules: readonly QualifiedRuleCst[];
}
