export interface OklchValue {
  readonly type: "color";
  readonly space: "oklch";
  readonly channels: readonly [number, number, number];
  readonly alpha: number;
}

export interface CubicBezierValue {
  readonly type: "easing";
  readonly name: "cubic-bezier";
  readonly coordinates: readonly [number, number, number, number];
}

export type DeclarationValue = string | OklchValue | CubicBezierValue;

export interface StyleRuleValue {
  readonly type: "style-rule";
  readonly selectorText: string;
  readonly declarations: Readonly<Record<string, DeclarationValue>>;
}

export interface StylesheetValue {
  readonly type: "stylesheet";
  readonly cssRules: readonly StyleRuleValue[];
}
