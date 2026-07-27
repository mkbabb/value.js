import assert from "node:assert/strict";
import test from "node:test";
import { completeValueUnit } from "../../../../../src/css/grammar/l4/value-unit.js";

test("value-unit distinguishes number, percentage, angle, and dimension", () => {
  for (const source of [".25", "62.8%", "0.5turn", "2rem"]) {
    const state = completeValueUnit.parseState(source);
    assert.equal(state.isError, false, source);
    assert.equal(state.offset, source.length, source);
  }
});
