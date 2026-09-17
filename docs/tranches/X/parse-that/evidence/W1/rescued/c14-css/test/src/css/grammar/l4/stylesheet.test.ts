import assert from "node:assert/strict";
import test from "node:test";
import { parseStylesheet } from "../../../../../src/css/api.js";
import { stylesheet } from "../../../../../src/css/grammar/l4/stylesheet.js";
import { parseComplete } from "../../../../../src/css/result.js";
import { serializeExact, sourceDocument } from "../../../../../src/css/serialize.js";

test("stylesheet closes parse, lowering, exact print, and one-edit W0", () => {
  const source = ".swatch:hover { color: oklch(62.8% .257 29.23 / 85%); animation-timing-function: cubic-bezier(.25, .1, .25, 1); }";
  const parsed = parseComplete(stylesheet, source);
  assert.equal(parsed.ok, true);
  assert.equal(parseStylesheet(source).ok, true);
  if (!parsed.ok) return;
  const document = sourceDocument(source, parsed.value);
  assert.equal(serializeExact(document), source);
  const color = parsed.value.rules[0]?.declarations[0]?.value;
  assert.ok(color);
  assert.equal(
    serializeExact(document, [{ span: color.span, replacement: "oklch(70% .1 250)" }]),
    ".swatch:hover { color: oklch(70% .1 250); animation-timing-function: cubic-bezier(.25, .1, .25, 1); }",
  );
  assert.throws(
    () => serializeExact(document, [
      { span: { start: 0, end: 10 }, replacement: "a" },
      { span: { start: 5, end: 12 }, replacement: "b" },
    ]),
    RangeError,
  );
  for (const span of [
    { start: Number.NaN, end: Number.NaN },
    { start: 1.5, end: 2.5 },
    { start: -1, end: 0 },
  ]) assert.throws(() => serializeExact(document, [{ span, replacement: "x" }]), RangeError);
});

test("stylesheet preserves trivia and refuses unsupported at-rules", () => {
  const source = ".a { color: oklch(50% .1 20); } /*KEEP*/";
  const parsed = parseComplete(stylesheet, source);
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  const document = sourceDocument(source, parsed.value);
  assert.equal(serializeExact(document), source);
  assert.match(serializeExact(document, [{ span: parsed.value.span, replacement: ".b {}" }]), /KEEP/);
  assert.equal(parseStylesheet("@media screen { color: red; }").ok, false);
});

test("stylesheet diagnostics are rebased to the original source", () => {
  for (const source of [
    ".a {\n  color: oklch(nope);\n}",
    ".a {\n  animation-timing-function: cubic-bezier(2, 0, .5, 1);\n}",
  ]) {
    const result = parseStylesheet(source);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.diagnostics[0]?.line, 2);
  }
});
