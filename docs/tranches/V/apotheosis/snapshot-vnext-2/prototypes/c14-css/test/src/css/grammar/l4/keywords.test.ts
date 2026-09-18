import assert from "node:assert/strict";
import test from "node:test";
import { completeKeyword } from "../../../../../src/css/grammar/l4/keywords.js";

test("keywords recognizes the CSS-wide set", () => {
  assert.equal(completeKeyword.parseState("revert-layer").value, "revert-layer");
  assert.equal(completeKeyword.parseState("unknown").isError, true);
});
