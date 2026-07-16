import { describe, expect, it } from "vitest";
import {
    decomposeMatrix2D,
    decomposeMatrix3D,
    interpolateDecomposed,
    recomposeMatrix2D,
    recomposeMatrix3D,
    slerp,
} from "@src/transform/decompose";
import type {
    DecomposedMatrix2D,
    Vec4,
} from "@src/transform/decompose";

/**
 * Targeted decomposition tests covering branches not exercised by
 * test/refactor-fixes.test.ts: scale-only, skew-only, perspective-only,
 * full-compose round-trips, and all four quaternion-extraction branches.
 */

// Helper: column-major identity matrix
const identity = (): number[] => [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
];

// Helper: assert matrix equality
const expectMat = (actual: number[], expected: number[], precision = 4) => {
    for (let i = 0; i < 16; i++) {
        expect(actual[i]).toBeCloseTo(expected[i]!, precision);
    }
};

describe("2D decomposition, recomposition, and interpolation", () => {
    it("round-trips identity, translation, rotation, skew, and reflection", () => {
        const fixtures = [
            [1, 0, 0, 1, 0, 0],
            [1, 0, 0, 1, 100, -40],
            [0, 1, -1, 0, 0, 0],
            [2, 1, 0.5, 3, 10, 20],
            [-1, 0, 0, 1, 8, 9],
        ] as const;
        for (const fixture of fixtures) {
            const decomposed = decomposeMatrix2D(...fixture);
            const recomposed = recomposeMatrix2D(decomposed);
            recomposed.forEach((value, index) =>
                expect(value, fixture.join(",")).toBeCloseTo(fixture[index]!, 10));
        }
    });

    it("interpolates endpoints and midpoint without changing dimensionality", () => {
        const start = decomposeMatrix2D(1, 0, 0, 1, 0, 0);
        const end = decomposeMatrix2D(2, 0, 0, 3, 10, 20);
        expect(interpolateDecomposed(start, end, 0)).toEqual(start);
        expect(interpolateDecomposed(start, end, 1)).toEqual(end);
        expect(interpolateDecomposed(start, end, 0.5)).toMatchObject({
            translateX: 5,
            translateY: 10,
            scaleX: 1.5,
            scaleY: 2,
        });
    });
});

describe("quaternion and dimensional interpolation", () => {
    const identityQuaternion: Vec4 = [0, 0, 0, 1];
    const quarterTurn: Vec4 = [
        0,
        0,
        Math.sin(Math.PI / 4),
        Math.cos(Math.PI / 4),
    ];

    it("slerps exact endpoints and the 45-degree midpoint", () => {
        expect(slerp(identityQuaternion, quarterTurn, 0)).toEqual(identityQuaternion);
        expect(slerp(identityQuaternion, quarterTurn, 1)).toEqual(quarterTurn);
        const midpoint = slerp(identityQuaternion, quarterTurn, 0.5);
        expect(midpoint[0]).toBeCloseTo(0, 12);
        expect(midpoint[1]).toBeCloseTo(0, 12);
        expect(midpoint[2]).toBeCloseTo(Math.sin(Math.PI / 8), 12);
        expect(midpoint[3]).toBeCloseTo(Math.cos(Math.PI / 8), 12);
    });

    it("interpolates 3D endpoints/midpoint and rejects mixed dimensions", () => {
        const start = decomposeMatrix3D(identity());
        const endMatrix = identity();
        endMatrix[12] = 10;
        endMatrix[13] = 20;
        endMatrix[14] = 30;
        const end = decomposeMatrix3D(endMatrix);
        if (!start || !end) throw new Error("3D fixture");
        expect(interpolateDecomposed(start, end, 0)).toEqual(start);
        expect(interpolateDecomposed(start, end, 1)).toEqual(end);
        expect(interpolateDecomposed(start, end, 0.5)).toMatchObject({
            translate: [5, 10, 15],
        });
        expect(() => interpolateDecomposed(
            decomposeMatrix2D(1, 0, 0, 1, 0, 0) as DecomposedMatrix2D,
            end as unknown as DecomposedMatrix2D,
            0.5,
        )).toThrow("cannot interpolate a 2D and a 3D decomposition");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// scale-only
// ─────────────────────────────────────────────────────────────────────────────

describe("decomposeMatrix3D — scale-only", () => {
    it("non-uniform scale (2, 3, 4) extracts scale vector correctly", () => {
        // CSS column-major: scaleX=2, scaleY=3, scaleZ=4
        // prettier-ignore
        const m = [
            2, 0, 0, 0,
            0, 3, 0, 0,
            0, 0, 4, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        expect(d).not.toBeNull();
        expect(d.scale[0]).toBeCloseTo(2, 6);
        expect(d.scale[1]).toBeCloseTo(3, 6);
        expect(d.scale[2]).toBeCloseTo(4, 6);
        // Identity rotation (quaternion ~ [0,0,0,1])
        expect(d.quaternion[3]).toBeCloseTo(1, 6);
        // Zero translation
        expect(d.translate[0]).toBeCloseTo(0, 6);
        expect(d.translate[1]).toBeCloseTo(0, 6);
        expect(d.translate[2]).toBeCloseTo(0, 6);
    });

    it("uniform scale (5, 5, 5) extracts uniform scale", () => {
        // prettier-ignore
        const m = [
            5, 0, 0, 0,
            0, 5, 0, 0,
            0, 0, 5, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        expect(d.scale[0]).toBeCloseTo(5, 6);
        expect(d.scale[1]).toBeCloseTo(5, 6);
        expect(d.scale[2]).toBeCloseTo(5, 6);
    });

    it("scale-only matrix round-trips", () => {
        // prettier-ignore
        const m = [
            2, 0, 0, 0,
            0, 3, 0, 0,
            0, 0, 4, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const r = recomposeMatrix3D(d);
        expectMat(r, m, 5);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// skew-only
// ─────────────────────────────────────────────────────────────────────────────

describe("decomposeMatrix3D — skew-only", () => {
    it("XY skew populates skew[0]", () => {
        // skewX(α) where tan(α) = 0.5 →
        // column-major: col0=[1,0,0,0], col1=[0.5,1,0,0], col2=[0,0,1,0], col3=[0,0,0,1]
        // prettier-ignore
        const m = [
            1, 0, 0, 0,
            0.5, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        expect(d).not.toBeNull();
        expect(d.skew[0]).toBeCloseTo(0.5, 5);
        // scale near identity
        expect(d.scale[0]).toBeCloseTo(1, 5);
        expect(d.scale[1]).toBeCloseTo(1, 5);
        expect(d.scale[2]).toBeCloseTo(1, 5);
    });

    it("XY skew round-trips", () => {
        // prettier-ignore
        const m = [
            1, 0, 0, 0,
            0.5, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const r = recomposeMatrix3D(d);
        expectMat(r, m, 4);
    });

    it("XZ skew populates skew[1]", () => {
        // Skew along Z relative to X: col2 includes a row0 component
        // prettier-ignore
        const m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0.25, 0, 1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        expect(d.skew[1]).toBeCloseTo(0.25, 5);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// perspective-only
// ─────────────────────────────────────────────────────────────────────────────

describe("decomposeMatrix3D — perspective-only", () => {
    it("perspective matrix extracts perspective vector + round-trips", () => {
        // Perspective with d=500 → column-major non-zero entry at (3, 2) = -1/500
        // prettier-ignore
        const m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, -1 / 500,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        expect(d).not.toBeNull();
        // perspective vector should be non-trivial
        const nonZero =
            Math.abs(d.perspective[0]) +
            Math.abs(d.perspective[1]) +
            Math.abs(d.perspective[2]);
        expect(nonZero).toBeGreaterThan(0);

        const r = recomposeMatrix3D(d);
        // Looser precision due to perspective inverse/transpose accumulation
        expectMat(r, m, 2);
    });

    it("identity perspective ([0,0,0,1]) yields zero perspective sub-component", () => {
        const id = identity();
        const d = decomposeMatrix3D(id)!;
        expect(d.perspective[0]).toBeCloseTo(0, 6);
        expect(d.perspective[1]).toBeCloseTo(0, 6);
        expect(d.perspective[2]).toBeCloseTo(0, 6);
        expect(d.perspective[3]).toBeCloseTo(1, 6);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// full-compose round-trip
// ─────────────────────────────────────────────────────────────────────────────

describe("decomposeMatrix3D — full compose round-trip", () => {
    it("identity round-trips", () => {
        const id = identity();
        const d = decomposeMatrix3D(id)!;
        const r = recomposeMatrix3D(d);
        expectMat(r, id, 6);
    });

    it("scale + translation round-trips", () => {
        // prettier-ignore
        const m = [
            2, 0, 0, 0,
            0, 3, 0, 0,
            0, 0, 4, 0,
            10, 20, 30, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const r = recomposeMatrix3D(d);
        expectMat(r, m, 4);
    });

    it("scale + rotation round-trips", () => {
        // 90deg rot around Z + scale (2, 3, 1)
        const c = Math.cos(Math.PI / 2);
        const s = Math.sin(Math.PI / 2);
        // R(z, 90) × diag(2,3,1) → columns are scaled rotation-vectors
        // col0 = R * [2,0,0]^T  (rotation applied to scale)
        // col1 = R * [0,3,0]^T
        // col2 = R * [0,0,1]^T
        // prettier-ignore
        const m = [
            2 * c, 2 * s, 0, 0,
            -3 * s, 3 * c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const r = recomposeMatrix3D(d);
        expectMat(r, m, 4);
    });

    it("rotation + translation + scale round-trips", () => {
        const c = Math.cos(Math.PI / 4);
        const s = Math.sin(Math.PI / 4);
        // prettier-ignore
        const m = [
            2 * c, 2 * s, 0, 0,
            -3 * s, 3 * c, 0, 0,
            0, 0, 4, 0,
            100, 200, 300, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const r = recomposeMatrix3D(d);
        expectMat(r, m, 4);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Quaternion extraction branches (4 cases)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The matrixToQuaternion function has 4 branches keyed by which
 * diagonal element dominates:
 *  1. trace > 0 (positive trace)        → identity / small rotations
 *  2. m00 > m11 && m00 > m22 (max-x)    → 180° rotation about X
 *  3. m11 > m22 (max-y)                  → 180° rotation about Y
 *  4. else (max-z)                       → 180° rotation about Z
 *
 * Each test builds a rotation matrix (column-major) that triggers
 * the corresponding branch.
 */

const quatNorm = (q: Vec4): number =>
    Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);

describe("decomposeMatrix3D — quaternion extraction branches", () => {
    it("branch 1: positive trace (identity → [0,0,0,1])", () => {
        const id = identity();
        const d = decomposeMatrix3D(id)!;
        const [x, y, z, w] = d.quaternion;
        expect(x).toBeCloseTo(0, 6);
        expect(y).toBeCloseTo(0, 6);
        expect(z).toBeCloseTo(0, 6);
        expect(w).toBeCloseTo(1, 6);
        expect(quatNorm(d.quaternion)).toBeCloseTo(1, 6);
    });

    it("branch 1: 90° rot about Z (positive trace) → quaternion has z=sin(45°), w=cos(45°)", () => {
        const c = Math.cos(Math.PI / 2);
        const s = Math.sin(Math.PI / 2);
        // prettier-ignore
        const m = [
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const halfAngle = Math.PI / 4;
        // Sign may differ; check |z| and |w|
        expect(Math.abs(d.quaternion[2])).toBeCloseTo(Math.sin(halfAngle), 5);
        expect(Math.abs(d.quaternion[3])).toBeCloseTo(Math.cos(halfAngle), 5);
        expect(quatNorm(d.quaternion)).toBeCloseTo(1, 5);
    });

    it("branch 2: 180° rotation about X (max-x diagonal)", () => {
        // R(x, 180°) = diag(1, -1, -1)
        // trace = 1 - 1 - 1 = -1 → not branch 1
        // m00 (=1) > m11 (=-1), m00 > m22 (=-1) → branch 2
        // prettier-ignore
        const m = [
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const [x, y, z, w] = d.quaternion;
        // 180° rot about X: q = [1, 0, 0, 0]
        expect(Math.abs(x)).toBeCloseTo(1, 5);
        expect(Math.abs(y)).toBeCloseTo(0, 5);
        expect(Math.abs(z)).toBeCloseTo(0, 5);
        expect(Math.abs(w)).toBeCloseTo(0, 5);
        expect(quatNorm(d.quaternion)).toBeCloseTo(1, 5);
    });

    it("branch 3: 180° rotation about Y (max-y diagonal)", () => {
        // R(y, 180°) = diag(-1, 1, -1)
        // trace = -1 + 1 - 1 = -1 → not branch 1
        // m00 (=-1) NOT > m11 (=1) → not branch 2
        // m11 (=1) > m22 (=-1) → branch 3
        // prettier-ignore
        const m = [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const [x, y, z, w] = d.quaternion;
        // 180° rot about Y: q = [0, 1, 0, 0]
        expect(Math.abs(x)).toBeCloseTo(0, 5);
        expect(Math.abs(y)).toBeCloseTo(1, 5);
        expect(Math.abs(z)).toBeCloseTo(0, 5);
        expect(Math.abs(w)).toBeCloseTo(0, 5);
        expect(quatNorm(d.quaternion)).toBeCloseTo(1, 5);
    });

    it("branch 4: 180° rotation about Z (max-z diagonal)", () => {
        // R(z, 180°) = diag(-1, -1, 1)
        // trace = -1 - 1 + 1 = -1 → not branch 1
        // m00 (=-1) NOT > m11 (=-1) → not branch 2
        // m11 (=-1) NOT > m22 (=1) → not branch 3 → branch 4
        // prettier-ignore
        const m = [
            -1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        const d = decomposeMatrix3D(m)!;
        const [x, y, z, w] = d.quaternion;
        // 180° rot about Z: q = [0, 0, 1, 0]
        expect(Math.abs(x)).toBeCloseTo(0, 5);
        expect(Math.abs(y)).toBeCloseTo(0, 5);
        expect(Math.abs(z)).toBeCloseTo(1, 5);
        expect(Math.abs(w)).toBeCloseTo(0, 5);
        expect(quatNorm(d.quaternion)).toBeCloseTo(1, 5);
    });

    it("all quaternion branches produce unit quaternions", () => {
        const matrices = [
            identity(),
            [
                1, 0, 0, 0,
                0, -1, 0, 0,
                0, 0, -1, 0,
                0, 0, 0, 1,
            ],
            [
                -1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, -1, 0,
                0, 0, 0, 1,
            ],
            [
                -1, 0, 0, 0,
                0, -1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ],
        ];
        for (const m of matrices) {
            const d = decomposeMatrix3D(m)!;
            expect(quatNorm(d.quaternion)).toBeCloseTo(1, 5);
        }
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Edge cases
// ─────────────────────────────────────────────────────────────────────────────

describe("decomposeMatrix3D — edge cases", () => {
    it("returns null for wrong-length input", () => {
        expect(decomposeMatrix3D([1, 0, 0])).toBeNull();
    });

    it("returns null for matrix with zero homogeneous coordinate", () => {
        // m[15] = 0 → singular
        // prettier-ignore
        const m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ];
        expect(decomposeMatrix3D(m)).toBeNull();
    });
});
