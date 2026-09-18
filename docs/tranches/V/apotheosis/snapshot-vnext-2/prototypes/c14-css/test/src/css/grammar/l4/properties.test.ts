import assert from "node:assert/strict";
import test from "node:test";
import { declaration, propertyAtom } from "../../../../../src/css/grammar/l4/properties.js";

test("properties preserves declaration text and exercises typed atoms", () => {
  const source = "color: oklch(50% .2 30);";
  const state = declaration.parseState(source);
  assert.equal(state.isError, false);
  assert.equal(state.offset, source.length);
  assert.equal(propertyAtom.parseState("inherit").isError, false);
});
