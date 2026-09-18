import assert from "node:assert/strict";
import test from "node:test";
import { completeTransform } from "../../../../../src/css/grammar/l4/transforms.js";

test("transforms witnesses its value-unit edge", () => {
  const state = completeTransform.parseState("translateX(2rem)");
  assert.equal(state.isError, false);
  assert.equal(state.offset, state.src.length);
});
