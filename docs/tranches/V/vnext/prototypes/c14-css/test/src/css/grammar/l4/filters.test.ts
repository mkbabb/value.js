import assert from "node:assert/strict";
import test from "node:test";
import { completeFilter } from "../../../../../src/css/grammar/l4/filters.js";

test("filters witnesses its value-unit edge", () => {
  const state = completeFilter.parseState("blur(2px)");
  assert.equal(state.isError, false);
  assert.equal(state.offset, state.src.length);
});
