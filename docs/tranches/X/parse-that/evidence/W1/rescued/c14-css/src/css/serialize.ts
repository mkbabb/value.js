import type { Span } from "@mkbabb/parse-that";
import type { Captured } from "./cst.js";

export interface SourceEdit {
  readonly span: Span;
  readonly replacement: string;
}

interface SourceSegment {
  readonly kind: "token" | "trivia";
  readonly span: Span;
}

export interface SourceDocument<T extends Captured = Captured> {
  readonly source: string;
  readonly root: T;
  readonly segments: readonly SourceSegment[];
}

const segment = /(?:\s+|\/\*[\s\S]*?\*\/)|(?:[^/\s]+|\/)/gy;

export function sourceDocument<T extends Captured>(source: string, root: T): SourceDocument<T> {
  if (!Number.isSafeInteger(root.span.start) || !Number.isSafeInteger(root.span.end)
    || root.span.start < 0 || root.span.end < root.span.start || root.span.end > source.length
    || source.slice(root.span.start, root.span.end) !== root.raw) {
    throw new RangeError("CSS root span/raw does not match its source.");
  }
  const segments: SourceSegment[] = [];
  for (let cursor = 0; cursor < source.length;) {
    segment.lastIndex = cursor;
    const match = segment.exec(source);
    if (!match || match.index !== cursor) throw new RangeError(`CSS source coverage gap at ${cursor}.`);
    const end = segment.lastIndex;
    segments.push({
      kind: /^(?:\s|\/\*)/.test(match[0]) ? "trivia" : "token",
      span: { start: cursor, end },
    });
    cursor = end;
  }
  return { source, root, segments };
}

export function serializeExact(document: SourceDocument, edits: readonly SourceEdit[] = []): string {
  const { source, root, segments } = document;
  let covered = 0;
  for (const item of segments) {
    if (item.span.start !== covered || item.span.end <= covered || item.span.end > source.length) {
      throw new RangeError("CSS token/trivia coverage must partition the source.");
    }
    covered = item.span.end;
  }
  if (covered !== source.length) throw new RangeError("CSS token/trivia coverage is incomplete.");
  if (edits.length === 0) return segments.map(({ span }) => source.slice(span.start, span.end)).join("");

  const ordered = [...edits].sort((left, right) => left.span.start - right.span.start);
  let cursor = 0;
  let output = "";
  for (const edit of ordered) {
    const { start, end } = edit.span;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)
      || start < cursor || start < root.span.start || end < start
      || end > root.span.end || end > source.length) {
      throw new RangeError("CSS source edits must be integral, in-root, in-bounds, and non-overlapping.");
    }
    output += source.slice(cursor, start) + edit.replacement;
    cursor = end;
  }
  return output + source.slice(cursor);
}
