import assert from "node:assert/strict";
import test from "node:test";
import { completeMediaRule } from "../../../../../src/css/grammar/l4/media.js";

test("media witnesses the shared token edge", () => {
  const source = "@media screen { color: red; }";
  const state = completeMediaRule.parseState(source);
  assert.equal(state.isError, false);
  assert.equal(state.offset, source.length);
});
