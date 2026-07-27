import assert from "node:assert/strict";
import test from "node:test";
import { completeFunctionBody } from "../../../../../src/css/grammar/l4/func-body.js";

test("func-body witnesses a typed numeric calc body", () => {
  const state = completeFunctionBody.parseState("calc(2px)");
  assert.equal(state.isError, false);
  assert.equal(state.offset, state.src.length);
});
