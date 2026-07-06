import type { ValueArray } from "../units";

// ─── Public AST types ─────────────────────────────────────────────────────
//
// The stylesheet parser's output-shape contract. Extracted from `stylesheet.ts`
// (W1-8 · god-module-dry-census) because it is a SEPARABLE, shared surface: the
// `extract.ts` / `serialize.ts` / `scroll-timeline.ts` siblings each consume
// ONLY these types (`import type`), never the parser combinators. Keeping the
// AST contract in its own leaf module lets those consumers depend on the shape
// without pulling in the recursive-grammar parser. `stylesheet.ts` re-exports
// every type here verbatim, so the `./stylesheet` import surface is unchanged.

export type Declaration = {
    name: string; // CSS-faithful: "background-color" or "--my-prop"
    value: ValueArray;
    important: boolean;
};

export type KeyframeSelector =
    | { kind: "percent"; value: number }
    | {
          kind: "named";
          name: "entry" | "exit" | "cover" | "contain";
      };

export type KeyframeRule = {
    selectors: KeyframeSelector[];
    declarations: Declaration[];
    timingFunction?: string; // hoisted from animation-timing-function
    composition?: "replace" | "add" | "accumulate";
};

export type PropertyDescriptor = {
    syntax?: string;
    inherits?: boolean;
    initialValue?: ValueArray;
};

// CSS Functions and Mixins Level 1 (O.W4 S7): `@function --name(params) { result }`.
export type CustomFunctionParameter = {
    name: string; // a <dashed-ident>, e.g. "--x"
    syntax?: string; // the <css-type> declaration, e.g. "<length>" (VERBATIM)
    default?: string; // the optional default value, VERBATIM
};

export type CustomFunctionDescriptor = {
    parameters?: CustomFunctionParameter[];
    result?: ValueArray; // the `result:` descriptor, hoisted
    declarations?: Declaration[]; // any other local declarations
};

// CSS Scroll-Driven Animations Level 1 (O.W4b S3): named-timeline registration
// at-rules. Descriptor blocks are declaration lists; the `source`/`subject`
// `selector(...)` notation is captured VERBATIM (division-of-labour law).
export type ScrollTimelineDescriptor = {
    source?: string; // "auto" | "selector(...)" | raw token, VERBATIM
    orientation?: string; // block | inline | x | y | ... VERBATIM
};

export type ViewTimelineDescriptor = {
    subject?: string; // "auto" | "selector(...)" | raw token, VERBATIM
    axis?: string; // block | inline | x | y | ... VERBATIM
    inset?: string; // raw <length-percentage>{1,2}, VERBATIM
};

export type StylesheetItem =
    | { kind: "keyframes"; name?: string; rules: KeyframeRule[] }
    | { kind: "property"; name: string; descriptor: PropertyDescriptor }
    | {
          kind: "function";
          name: string; // the <dashed-ident> function name, e.g. "--double"
          descriptor: CustomFunctionDescriptor;
      }
    | {
          // CSS Cascading and Inheritance Level 6 (O.W4 S10): `@scope (root) to
          // (limit) { ... }`. The block body is a recursively-parsed stylesheet.
          kind: "scope";
          root?: string[]; // the (<scope-start>) selector list
          limit?: string[]; // the to (<scope-end>) selector list
          children: StylesheetItem[];
      }
    | {
          // CSS Transitions Level 2 (O.W4 S11): `@starting-style { ... }`.
          kind: "starting-style";
          children: StylesheetItem[];
      }
    | {
          // CSS Scroll-Driven Animations Level 1 (O.W4b S3).
          kind: "scroll-timeline";
          name: string; // the <dashed-ident> name, e.g. "--my-tl"
          descriptor: ScrollTimelineDescriptor;
      }
    | {
          kind: "view-timeline";
          name: string;
          descriptor: ViewTimelineDescriptor;
      }
    | {
          kind: "style";
          selectors: string[];
          declarations: Declaration[];
          // CSS Nesting L1 (O.W0): qualified rules / at-rules nested inside this
          // style rule's body. Optional + only present when non-empty so the
          // non-nested shape is byte-identical to pre-O.W0.
          children?: StylesheetItem[];
      }
    | {
          kind: "unknown";
          atName: string;
          prelude: string;
          // Semicolon form (`@layer base;`) keeps `body: null`. For block-body
          // at-rules (`@layer base { ... }`, `@media`, `@container`, `@supports`,
          // …) the block is recursively parsed into `children` (O.W4 S8) and
          // `body` is `undefined`. Existing consumers reading `body` still see
          // `null` for the semicolon form; `children` is additive + optional.
          body: string | null;
          children?: StylesheetItem[];
      };

export type Stylesheet = StylesheetItem[];
