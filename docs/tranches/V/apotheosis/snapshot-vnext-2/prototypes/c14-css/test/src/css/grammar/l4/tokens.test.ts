import assert from "node:assert/strict";
import test from "node:test";
import { completeToken } from "../../../../../src/css/grammar/l4/tokens.js";

test("tokens recognizes identifiers and quoted strings", () => {
  assert.equal(completeToken.parseState("--water-color").isError, false);
  assert.equal(completeToken.parseState("\"a\\\"b\"").isError, false);
});
