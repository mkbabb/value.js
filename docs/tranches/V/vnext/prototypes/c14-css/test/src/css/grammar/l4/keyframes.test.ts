import assert from "node:assert/strict";
import test from "node:test";
import { completeKeyframeSelector } from "../../../../../src/css/grammar/l4/keyframes.js";

test("keyframes owns a typed percentage selector witness", () => {
  const state = completeKeyframeSelector.parseState("50%");
  assert.equal(state.isError, false);
  assert.equal(state.value.offset.value, 50);
});
