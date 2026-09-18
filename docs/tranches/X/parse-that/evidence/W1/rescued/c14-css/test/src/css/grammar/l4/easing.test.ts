import assert from "node:assert/strict";
import test from "node:test";
import { parseEasing } from "../../../../../src/css/api.js";

test("easing owns cubic-bezier syntax and semantic x bounds", () => {
  const result = parseEasing("cubic-bezier(0.25, 0.1, 0.25, 1)");
  assert.equal(result.ok, true);
  if (result.ok) assert.deepEqual(result.value.coordinates, [0.25, 0.1, 0.25, 1]);
  assert.equal(parseEasing("cubic-bezier(2, 0, -1, 1)").ok, false);
});
