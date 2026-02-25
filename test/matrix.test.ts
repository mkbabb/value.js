import { describe, expect, it } from "vitest";
import type { Vec3, Mat3 } from "../src/units/color/matrix";
import { transformMat3, transposeMat3, invertMat3, multiplyMat3 } from "../src/units/color/matrix";
import { WHITE_POINT_D65_D50 } from "../src/units/color/constants";

const EPSILON = 1e-10;

const IDENTITY: Mat3 = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
];

function mat3ApproxEqual(a: Mat3, b: Mat3, eps = EPSILON) {
    for (let i = 0; i < 9; i++) {
        expect(a[i]).toBeCloseTo(b[i], -Math.log10(eps));
    }
}

function vec3ApproxEqual(a: Vec3, b: Vec3, eps = EPSILON) {
    for (let i = 0; i < 3; i++) {
        expect(a[i]).toBeCloseTo(b[i], -Math.log10(eps));
    }
}

describe("transformMat3", () => {
    it("identity matrix returns input unchanged", () => {
        const v: Vec3 = [0.3, 0.7, 0.5];
        const result = transformMat3(v, IDENTITY);
        vec3ApproxEqual(result, v);
    });

    it("scales correctly with a diagonal matrix", () => {
        const scale: Mat3 = [
            2, 0, 0,
            0, 3, 0,
            0, 0, 4,
        ];
        const v: Vec3 = [1, 2, 3];
        const result = transformMat3(v, scale);
        vec3ApproxEqual(result, [2, 6, 12]);
    });

    it("produces known result with RGB→XYZ matrix", () => {
        // sRGB linear white (1,1,1) → D65 white point ≈ (0.9505, 1.0, 1.089)
        const RGB_XYZ: Mat3 = [
            0.41239079926595934, 0.357584339383878, 0.1804807884018343,
            0.21263900587151027, 0.715168678767756, 0.07219231536073371,
            0.01933081871559182, 0.11919477979462598, 0.9505321522496607,
        ];
        const white: Vec3 = [1, 1, 1];
        const result = transformMat3(white, RGB_XYZ);
        // Sum of each row
        expect(result[0]).toBeCloseTo(0.9505, 3);
        expect(result[1]).toBeCloseTo(1.0, 3);
        expect(result[2]).toBeCloseTo(1.089, 2);
    });

    it("zero vector always gives zero", () => {
        const v: Vec3 = [0, 0, 0];
        const result = transformMat3(v, WHITE_POINT_D65_D50);
        vec3ApproxEqual(result, [0, 0, 0]);
    });
});

describe("transposeMat3", () => {
    it("transpose of identity is identity", () => {
        mat3ApproxEqual(transposeMat3(IDENTITY), IDENTITY);
    });

    it("transpose of transpose equals original", () => {
        const m: Mat3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        mat3ApproxEqual(transposeMat3(transposeMat3(m)), m);
    });

    it("swaps off-diagonal elements correctly", () => {
        const m: Mat3 = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ];
        const expected: Mat3 = [
            1, 4, 7,
            2, 5, 8,
            3, 6, 9,
        ];
        mat3ApproxEqual(transposeMat3(m), expected);
    });
});

describe("invertMat3", () => {
    it("inverse of identity is identity", () => {
        mat3ApproxEqual(invertMat3(IDENTITY), IDENTITY);
    });

    it("M × M⁻¹ ≈ identity", () => {
        const inv = invertMat3(WHITE_POINT_D65_D50);
        // Multiply M × M⁻¹ by testing each basis vector
        const e1 = transformMat3(transformMat3([1, 0, 0], WHITE_POINT_D65_D50), inv);
        const e2 = transformMat3(transformMat3([0, 1, 0], WHITE_POINT_D65_D50), inv);
        const e3 = transformMat3(transformMat3([0, 0, 1], WHITE_POINT_D65_D50), inv);

        vec3ApproxEqual(e1, [1, 0, 0]);
        vec3ApproxEqual(e2, [0, 1, 0]);
        vec3ApproxEqual(e3, [0, 0, 1]);
    });

    it("inverse of a diagonal matrix is element-wise reciprocal", () => {
        const diag: Mat3 = [
            2, 0, 0,
            0, 4, 0,
            0, 0, 8,
        ];
        const inv = invertMat3(diag);
        const expected: Mat3 = [
            0.5, 0, 0,
            0, 0.25, 0,
            0, 0, 0.125,
        ];
        mat3ApproxEqual(inv, expected);
    });

    it("singular matrix produces Infinity values", () => {
        const singular: Mat3 = [
            1, 2, 3,
            2, 4, 6,
            0, 0, 0,
        ];
        const inv = invertMat3(singular);
        // det = 0, so 1/det = Infinity — all entries should be non-finite
        const hasNonFinite = inv.some((v) => !Number.isFinite(v));
        expect(hasNonFinite).toBe(true);
    });
});

describe("multiplyMat3", () => {
    it("identity × M = M", () => {
        const m: Mat3 = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ];
        mat3ApproxEqual(multiplyMat3(IDENTITY, m), m);
    });

    it("M × identity = M", () => {
        const m: Mat3 = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ];
        mat3ApproxEqual(multiplyMat3(m, IDENTITY), m);
    });

    it("M × M⁻¹ ≈ identity", () => {
        const inv = invertMat3(WHITE_POINT_D65_D50);
        const result = multiplyMat3(WHITE_POINT_D65_D50, inv);
        mat3ApproxEqual(result, IDENTITY, 1e-8);
    });

    it("is associative with transformMat3: (A×B)v = A(Bv)", () => {
        const A: Mat3 = [
            2, 0, 1,
            0, 3, 0,
            1, 0, 2,
        ];
        const B: Mat3 = [
            1, 2, 0,
            0, 1, 3,
            2, 0, 1,
        ];
        const v: Vec3 = [1, 2, 3];

        const AB = multiplyMat3(A, B);
        const result1 = transformMat3(v, AB);
        const result2 = transformMat3(transformMat3(v, B), A);

        vec3ApproxEqual(result1, result2);
    });
});
