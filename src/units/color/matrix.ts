/**
 * Minimal 3×3 matrix and 3-element vector math.
 * Replaces gl-matrix dependency — uses native number[] for full f64 precision
 * (gl-matrix uses Float32Array).
 *
 * Mat3 is stored in row-major order:
 *   [m00, m01, m02, m10, m11, m12, m20, m21, m22]
 */

export type Vec3 = [number, number, number];

export type Mat3 = [
    number, number, number,
    number, number, number,
    number, number, number,
];

/** Multiply a Mat3 (row-major) by a Vec3: result = M * v */
export function transformMat3(v: Vec3, m: Mat3): Vec3 {
    const [x, y, z] = v;
    return [
        m[0] * x + m[1] * y + m[2] * z,
        m[3] * x + m[4] * y + m[5] * z,
        m[6] * x + m[7] * y + m[8] * z,
    ];
}

/** Transpose a Mat3 (row-major → row-major transpose) */
export function transposeMat3(m: Mat3): Mat3 {
    return [
        m[0], m[3], m[6],
        m[1], m[4], m[7],
        m[2], m[5], m[8],
    ];
}

/** Multiply two Mat3 matrices (row-major): result = A × B */
export function multiplyMat3(a: Mat3, b: Mat3): Mat3 {
    return [
        a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
        a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
        a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
        a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
        a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
        a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
        a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
        a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
        a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
    ];
}

/** Invert a 3×3 matrix via cofactor expansion. Returns the inverse. */
export function invertMat3(m: Mat3): Mat3 {
    const [a, b, c, d, e, f, g, h, i] = m;

    const A = e * i - f * h;
    const B = -(d * i - f * g);
    const C = d * h - e * g;

    const det = a * A + b * B + c * C;

    const invDet = 1 / det;

    return [
        A * invDet,
        (c * h - b * i) * invDet,
        (b * f - c * e) * invDet,
        B * invDet,
        (a * i - c * g) * invDet,
        (c * d - a * f) * invDet,
        C * invDet,
        (b * g - a * h) * invDet,
        (a * e - b * d) * invDet,
    ];
}
