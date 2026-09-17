import assert from "node:assert/strict";
import test from "node:test";
import { parseColor } from "../../../../../src/css/api.js";
import { completeColor } from "../../../../../src/css/grammar/l4/color.js";
import { parseComplete } from "../../../../../src/css/result.js";

test("color owns a complete typed oklch W0 vertical", () => {
  const result = parseColor("oklch(62.8% 0.257 29.23 / 85%)");
  assert.deepEqual(result, {
    ok: true,
    value: { type: "color", space: "oklch", channels: [0.628, 0.257, 29.23], alpha: 0.85 },
    diagnostics: [],
  });
  assert.deepEqual(parseColor("oklch(50% .1 .5turn)"), {
    ok: true,
    value: { type: "color", space: "oklch", channels: [0.5, 0.1, 180], alpha: 1 },
    diagnostics: [],
  });
  assert.deepEqual(parseColor("oklch(50% .1 200grad)"), {
    ok: true,
    value: { type: "color", space: "oklch", channels: [0.5, 0.1, 180], alpha: 1 },
    diagnostics: [],
  });
  assert.equal(parseColor("oklch(50% .1 20 /)").ok, false);
  const invalid = parseComplete(completeColor, "oklch(nope)");
  assert.equal(invalid.ok, false);
  if (!invalid.ok) assert.equal(invalid.diagnostics[0]?.code, "CSS_PARSE");
});
