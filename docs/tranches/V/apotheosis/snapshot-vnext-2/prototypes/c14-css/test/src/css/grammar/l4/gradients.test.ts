import assert from "node:assert/strict";
import test from "node:test";
import { completeGradient } from "../../../../../src/css/grammar/l4/gradients.js";

test("gradients witnesses color and value-unit edges", () => {
  const source = "linear-gradient(45deg, oklch(50% .1 20), oklch(80% .2 40))";
  const state = completeGradient.parseState(source);
  assert.equal(state.isError, false);
  assert.equal(state.offset, source.length);
});
