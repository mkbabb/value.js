# Direct CSS Syntax foundation G4 — normative comment correction

This generation corrects only the G3 `SYNTAX-COMMENT` boundary. CSS Syntax
§4.3.2 consumes one or more immediately adjacent comments before returning.
The operation is therefore `SYNTAX-COMMENTS`, exported as `cssComments`:

```ts
type CssComments = { error: null | "unexpected-eof" };
```

It must consume every adjacent `/*…*/`. An unterminated final comment consumes
through EOF and returns `unexpected-eof`. Whitespace terminates the operation
and remains for the parent. Empty input or non-comment input fails
transactionally. The production is static direct parse-that composition; the
standing prohibitions on lexers, scanners, cursors, atom/CST layers, broad
remainder capture, and per-parse construction remain in force.

The other four G3 operations are unchanged. H is represented by the exact
self-contained integration tree. B and S preserve their independently authored
G2/G3 feature implementations and add independently structured plural-comment
corrections.

