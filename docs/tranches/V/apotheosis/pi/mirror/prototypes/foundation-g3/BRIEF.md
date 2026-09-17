# Direct CSS Syntax foundation G3 — corrected operation boundaries

This correction retains the three independently authored G2 escape,
identifier, string, whitespace, and comment constructions. It changes the
review boundary exposed by G2's gestalt rejection:

- `SYNTAX-ESCAPE`
- `SYNTAX-IDENT`
- `SYNTAX-STRING`
- `SYNTAX-WHITESPACE`
- `SYNTAX-COMMENT`

There is no `SYNTAX-SPACING` feature and no canonical aggregate parser.
Whitespace and comments have different semantic consequences; a parent CSS
production decides whether and how to combine them.

G2's direct-parser architecture and exact result contracts otherwise remain
in force. This generation introduces no lexer, token objects, atom/CST layer,
cursor, scanner, broad remainder capture, or per-parse parser construction.
The original G2 files remain the exact escape/identifier/string candidate
closures. The split whitespace and comment files below preserve each seat's
independent G2 construction while removing the rejected aggregate.

