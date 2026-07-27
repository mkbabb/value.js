// Hostile-input probe over the ./transform public surface — the two files carrying
// 150 of src/'s 297 non-null assertions (decompose.ts 113, path.ts 37).
import { describe, it, expect } from "vitest";
import {
  decomposeMatrix2D, decomposeMatrix3D, recomposeMatrix2D, recomposeMatrix3D,
  slerp, interpolateDecomposed,
} from "../../../../../src/transform/decompose";
import { PathGeometry, getTotalLength, getPointAtLength } from "../../../../../src/transform/path";

const M2 = [1, 0, 0, 1, 0, 0];
const M3 = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

const bad2: unknown[] = [[], [1], [1,2,3], M2.slice(0,5), new Array(6).fill(NaN),
  new Array(6).fill(Infinity), [0,0,0,0,0,0], null, undefined, "matrix(1,0,0,1,0,0)", {}];
const bad3: unknown[] = [[], [1], M3.slice(0,15), new Array(16).fill(NaN),
  new Array(16).fill(0), null, undefined, {}];

function guard(label: string, fn: () => unknown) {
  let threw: unknown = null;
  try { fn(); } catch (e) { threw = e; }
  if (threw) console.log("THREW", label, String(threw).slice(0, 110));
  return threw;
}

describe("hostile ./transform", () => {
  for (const [i, m] of bad2.entries())
    it(`decomposeMatrix2D #${i} ${JSON.stringify(m)?.slice(0,28)}`, () => {
      expect(guard(`decompose2D#${i}`, () => decomposeMatrix2D(m as never))).toBeNull();
    });
  for (const [i, m] of bad3.entries())
    it(`decomposeMatrix3D #${i} ${JSON.stringify(m)?.slice(0,28)}`, () => {
      expect(guard(`decompose3D#${i}`, () => decomposeMatrix3D(m as never))).toBeNull();
    });
  it("recompose2D on garbage", () => { expect(guard("recompose2D", () => recomposeMatrix2D({} as never))).toBeNull(); });
  it("recompose3D on garbage", () => { expect(guard("recompose3D", () => recomposeMatrix3D({} as never))).toBeNull(); });
  it("slerp on garbage", () => { expect(guard("slerp", () => slerp([0,0,0,0] as never, [0,0,0,0] as never, 0.5))).toBeNull(); });
  it("interpolateDecomposed on garbage", () => { expect(guard("interp", () => interpolateDecomposed({} as never, {} as never, 0.5))).toBeNull(); });

  const paths = ["", "   ", "M", "M 0", "Z", "L 10 10", "M 0 0 L", "M 0 0 C 1 1",
    "M0,0A1,1,0,0,1", "M 0 0 h NaN", "garbage", "M 1e400 0 L 0 0", "m 0 0 z z z"];
  for (const [i, d] of paths.entries()) {
    it(`PathGeometry #${i} ${JSON.stringify(d)}`, () => {
      expect(guard(`path#${i} ${JSON.stringify(d)}`, () => {
        const g = new PathGeometry(d);
        const len = getTotalLength(g as never);
        getPointAtLength(g as never, Number.isFinite(len) ? len / 2 : 0);
      })).toBeNull();
    });
  }
});
