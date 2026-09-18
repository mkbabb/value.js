import assert from "node:assert/strict";
import test from "node:test";
import { selector } from "../../../../../src/css/grammar/l4/selectors.js";

test("selectors captures a qualified-rule prelude without consuming the block", () => {
  const state = selector.parseState(".swatch:hover { color: red; }");
  assert.equal(state.isError, false);
  assert.equal(state.value.raw.trim(), ".swatch:hover");
  assert.equal(state.src[state.offset], "{");
});
