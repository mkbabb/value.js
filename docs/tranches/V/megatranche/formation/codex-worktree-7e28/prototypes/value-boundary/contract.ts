<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/prototypes/value-boundary/contract.ts
  original-mtime: 2026-07-29T17:34:49
  original-sha256: f943d9f74b1266155606e57819d1b5d25070377c404e4ed2d0e897299a4f13d2
  original-bytes: 7735
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
/**
 * ISOLATED FORMATION PROTOTYPE.
 *
 * This file is not product source and must not enter package exports or builds.
 * P2 freezes placement and a narrow grounded operation-name set, not the
 * illustrative record shapes below.
 */

declare const sourceSpanBrand: unique symbol;

/**
 * The canonical parse-that successor must provide exact UTF-16 coordinates.
 * Parsed-node/source-map projection remains open, so this prototype keeps the
 * representation opaque.
 */
export interface SourceSpan {
  readonly [sourceSpanBrand]: true;
}

export interface ValueIssue {
  /**
   * Public code/cause/actual stability remains an execution-wave decision.
   * The prototype deliberately does not copy parse-that diagnostics.
   */
  readonly code: string;
  readonly span?: SourceSpan;
  readonly message: string;
}

export type Result<T, E = ValueIssue> =
  | {
      readonly ok: true;
      readonly value: T;
      /**
       * Stylesheet success may carry immutable recovery diagnostics. Strict
       * leaf parsers may still require this to be empty.
       */
      readonly diagnostics: readonly E[];
    }
  | {
      readonly ok: false;
      readonly diagnostics: readonly [E, ...E[]];
    };

declare const opaqueStylesheetItemBrand: unique symbol;

/**
 * Only the parser can mint this byte-preserving unknown item. There is no
 * public raw-string constructor or competing children/prelude/body shape.
 */
export interface OpaqueStylesheetItem {
  readonly kind: "opaque";
  readonly [opaqueStylesheetItemBrand]: true;
  readonly span: SourceSpan;
}

declare const svgPathDataBrand: unique symbol;

/**
 * Full command and span projection comes from the SVG denominator; the
 * prototype intentionally avoids freezing an incomplete command union.
 */
export interface SvgPathData {
  readonly [svgPathDataBrand]: true;
}

export interface SvgPathGrammarPrototype {
  parse(source: string): Result<SvgPathData>;
  serialize(path: SvgPathData): Result<string>;
}

/**
 * P2 ruling: every admitted parser-produced finite SvgPathData value is
 * geometrically constructible. Empty data is origin/length zero; move-only
 * data samples its move point; subpath moves create no phantom segment.
 */
export declare class PathGeometry {
  constructor(path: SvgPathData);
  readonly path: SvgPathData;
  readonly totalLength: number;
}

declare const parsedPath: SvgPathData;
new PathGeometry(parsedPath);

// @ts-expect-error A geometry constructor is not a parser.
new PathGeometry("M0 0");

declare const cssTransformListBrand: unique symbol;

export interface CssTransformList {
  /**
   * Derive the union from full Webref/WPT coverage, including axis forms and
   * unresolved var()/calc().
   */
  readonly [cssTransformListBrand]: true;
}

declare const cssMotionPropertiesBrand: unique symbol;

export interface CssMotionProperties {
  readonly [cssMotionPropertiesBrand]: true;
}

/**
 * These method labels describe capabilities, not frozen public operation
 * names. V.L4 derives its smallest names after denominator tests are RED.
 */
export interface CssTransformMotionPrototype {
  parseTransformList(source: string): Result<CssTransformList>;
  serializeTransformList(value: CssTransformList): Result<string>;
  parseMotionProperties(source: string): Result<CssMotionProperties>;
  serializeMotionProperties(value: CssMotionProperties): Result<string>;
}

declare const parsedAnimationShorthandBrand: unique symbol;

export interface ParsedAnimationShorthand {
  readonly [parsedAnimationShorthandBrand]: true;
}

export interface CssDeclaration {
  readonly property: string;
  readonly value: unknown;
}

export interface CSSAnimationOptions {
  readonly playState?: "running" | "paused";
  readonly composition?: "replace" | "add" | "accumulate";
}

export interface AnimationInversePrototype {
  invertParsedShorthand(
    value: ParsedAnimationShorthand,
  ): Result<string>;

  /**
   * Ordered longhands are distinct from shorthand inversion. Explicit
   * composition="replace" must produce animation-composition: replace.
   */
  projectOrderedLonghands(
    value: CSSAnimationOptions,
  ): Result<readonly CssDeclaration[]>;
}

export interface LinearTimingFunction {
  readonly kind: "linear";
  readonly stops: readonly unknown[];
}

export interface ExplicitCssLinearStopPrototype {
  readonly output: number;
  readonly positions: readonly number[];
}

export interface ExplicitCssLinearBoundaryPrototype {
  /**
   * Value owns CSS-representable explicit-stop validation only. Standards
   * vectors, not an adaptive brand, settle arity/range/fix-up.
   */
  construct(
    stops: readonly ExplicitCssLinearStopPrototype[],
  ): Result<LinearTimingFunction>;
  validate(value: LinearTimingFunction): Result<LinearTimingFunction>;
}

/**
 * Keyframes-owned evidence boundary; never a Value package export.
 */
interface KeyframesSamplingReceipt {
  readonly error: number;
  readonly maxStops: number;
  readonly thrownSampleCount: number;
  readonly nonFiniteSampleCount: number;
}

declare const paletteIdBrand: unique symbol;
declare const paletteSlugBrand: unique symbol;
declare const revisionNoBrand: unique symbol;
declare const releaseHashBrand: unique symbol;
declare const payloadHashBrand: unique symbol;

export type PaletteId = string & {
  readonly [paletteIdBrand]: true;
};

export type PaletteSlug = string & {
  readonly [paletteSlugBrand]: true;
};

export type RevisionNo = number & {
  readonly [revisionNoBrand]: true;
};

export type ReleaseHash = string & {
  readonly [releaseHashBrand]: true;
};

export type PayloadHash = string & {
  readonly [payloadHashBrand]: true;
};

export interface PaletteReleaseMembership {
  readonly paletteId: PaletteId;
  readonly revisionNo: RevisionNo;
  readonly releaseHash: ReleaseHash;
  readonly authorId: string;
  readonly createdAt: string;
  readonly payloadHash: PayloadHash;
  readonly parentRevisionNo?: RevisionNo;
  readonly visibilityAtRelease: "private" | "public";
  readonly moderationAtRelease: "clear" | "withdrawn";
  readonly strongEtag: string;
}

export interface PaletteWorkspace {
  readonly paletteId: PaletteId;
  readonly workspaceRevision: number;
  readonly savedPrivateContent: unknown;
}

export interface ForkSourceEdge {
  readonly childPaletteId: PaletteId;
  readonly sourcePaletteId: PaletteId;
  readonly sourceRevisionNo: RevisionNo;
  readonly sourceReleaseHash: ReleaseHash;
}

export interface PaletteReleasePayload {
  readonly payloadHash: PayloadHash;
  readonly canonicalPalette: unknown;
}

export interface ReleaseRepository {
  resolveSlug(slug: PaletteSlug): Promise<PaletteId | null>;

  findMembership(
    paletteId: PaletteId,
    revisionNo: RevisionNo,
  ): Promise<PaletteReleaseMembership | null>;

  findPayload(
    payloadHash: PayloadHash,
  ): Promise<PaletteReleasePayload | null>;
}

export type PaletteAccessOperation =
  | "detail"
  | "fork"
  | "fork-list"
  | "provenance"
  | "release-list"
  | "release-read"
  | "revert";

export interface PalettePolicySubject {
  readonly owner: boolean;
  readonly administrator: boolean;
  readonly authenticated: boolean;
  readonly visibility: "private" | "public";
  readonly lifecycle: "active" | "trashed";
  readonly moderation: "clear" | "withdrawn";
}

export type PalettePolicyDecision =
  | { readonly allowed: true }
  | {
      readonly allowed: false;
      readonly status: 401 | 404 | 410;
    };

export interface PalettePolicy {
  decideObject(
    operation: PaletteAccessOperation,
    subject: PalettePolicySubject,
  ): PalettePolicyDecision;

  decideRelease(
    operation: PaletteAccessOperation,
    subject: PalettePolicySubject,
    membership: PaletteReleaseMembership,
  ): PalettePolicyDecision;
}
