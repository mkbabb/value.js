import assert from "node:assert/strict";
import test from "node:test";
import { completeCssValue } from "../../../../../src/css/grammar/l4/values.js";

test("values composes each currently mirrored value responsibility", () => {
  for (const source of [
    "oklch(50% .1 20)",
    "cubic-bezier(.2, .3, .4, 1)",
    "blur(2px)",
    "translateX(2rem)",
  ]) {
    const state = completeCssValue.parseState(source);
    assert.equal(state.isError, false, source);
    assert.equal(state.offset, source.length, source);
  }
});
