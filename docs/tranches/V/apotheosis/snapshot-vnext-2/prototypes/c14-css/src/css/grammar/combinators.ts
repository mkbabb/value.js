import { Parser, regex, string, type Span } from "@mkbabb/parse-that";
import type { Captured } from "../cst.js";

export const trivia = regex(/(?:\s+|\/\*[\s\S]*?\*\/)+/).opt();
const trailingTrivia = /(?:\s+|\/\*[\s\S]*?\*\/)+$/;

export function token(text: string): Parser<string> {
  return string(text).skip(trivia);
}

export function pattern(pattern: RegExp): Parser<Captured> {
  return capture(regex(pattern)).skip(trivia);
}

export function capture(parser: Parser<string>): Parser<Captured> {
  return parser
    .map((raw) => ({ raw }))
    .mapState<Captured>((next, previous) =>
      next.ok({
        ...next.value,
        span: { start: previous.offset, end: next.offset } satisfies Span,
      }),
    );
}

export function spanned<T extends object>(parser: Parser<T>): Parser<T & Captured> {
  return parser.mapState<T & Captured>((next, previous) =>
    {
      const consumed = next.src.slice(previous.offset, next.offset);
      const end = next.offset - (consumed.match(trailingTrivia)?.[0].length ?? 0);
      return next.ok({
        ...next.value,
        raw: next.src.slice(previous.offset, end),
        span: { start: previous.offset, end },
      });
    },
  );
}

export function whole<T>(parser: Parser<T>): Parser<T> {
  return trivia.next(parser).eof();
}
