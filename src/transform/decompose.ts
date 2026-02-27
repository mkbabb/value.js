/**
 * CSS Transform Matrix Decomposition and Recomposition.
 *
 * Implements the CSSOM View spec algorithm (§15.1) for 2D matrices
 * and polar decomposition for 3D matrices.
 * Also includes quaternion slerp for smooth rotation interpolation.
 */

export type Vec4 = [number, number, number, number];
export type Mat4 = number[]; // 16 elements, column-major (WebGL/CSS convention)

export interface DecomposedMatrix2D {
    translateX: number;
    translateY: number;
    scaleX: number;
    scaleY: number;
    angle: number; // radians
    skew: number; // tan(skew angle)
}

export interface DecomposedMatrix3D {
    translate: [number, number, number];
    scale: [number, number, number];
    skew: [number, number, number]; // [XY, XZ, YZ]
    quaternion: Vec4;
    perspective: Vec4;
}

// ────────────────────────────────────────────────────────────────
// 2D Decomposition — CSSOM View spec §15.1
// ────────────────────────────────────────────────────────────────

/**
 * Decompose a 2D CSS matrix(a, b, c, d, e, f) into translate, scale, rotation, and skew.
 *
 * The matrix maps like:
 *   | a c e |
 *   | b d f |
 *   | 0 0 1 |
 */
export function decomposeMatrix2D(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
): DecomposedMatrix2D {
    // Step 1: translate
    const translateX = e;
    const translateY = f;

    // Step 2: compute column vectors of the 2x2 sub-matrix
    let row0x = a,
        row0y = b;
    let row1x = c,
        row1y = d;

    // Step 3: scaleX = length of first column vector
    let scaleX = Math.sqrt(row0x * row0x + row0y * row0y);
    if (scaleX !== 0) {
        row0x /= scaleX;
        row0y /= scaleX;
    }

    // Step 4: skew = dot product of first and second column vectors
    let skew = row0x * row1x + row0y * row1y;
    // Make second column orthogonal to first
    row1x -= row0x * skew;
    row1y -= row0y * skew;

    // Step 5: scaleY = length of second column vector (after orthogonalization)
    let scaleY = Math.sqrt(row1x * row1x + row1y * row1y);
    if (scaleY !== 0) {
        row1x /= scaleY;
        row1y /= scaleY;
        skew /= scaleY;
    }

    // Step 6: check determinant — if negative, negate scaleX and flip row0
    const det = row0x * row1y - row0y * row1x;
    if (det < 0) {
        scaleX = -scaleX;
        row0x = -row0x;
        row0y = -row0y;
    }

    // Step 7: rotation = atan2(row0y, row0x)
    const angle = Math.atan2(row0y, row0x);

    return { translateX, translateY, scaleX, scaleY, angle, skew };
}

// ────────────────────────────────────────────────────────────────
// 3D Decomposition — Polar decomposition approach
// ────────────────────────────────────────────────────────────────

/** Create a 4x4 identity matrix (column-major) */
function mat4Identity(): Mat4 {
    // prettier-ignore
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
}

/** Get element at (row, col) from a column-major 4x4 matrix */
function m4Get(m: Mat4, row: number, col: number): number {
    return m[col * 4 + row];
}

/** Set element at (row, col) in a column-major 4x4 matrix */
function m4Set(m: Mat4, row: number, col: number, val: number): void {
    m[col * 4 + row] = val;
}

/** Multiply two column-major 4x4 matrices: result = A * B */
function mat4Multiply(a: Mat4, b: Mat4): Mat4 {
    const result = new Array(16).fill(0);
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += m4Get(a, row, k) * m4Get(b, k, col);
            }
            m4Set(result, row, col, sum);
        }
    }
    return result;
}

/** Transpose a column-major 4x4 matrix */
function mat4Transpose(m: Mat4): Mat4 {
    const result = new Array(16).fill(0);
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            m4Set(result, col, row, m4Get(m, row, col));
        }
    }
    return result;
}

/** Compute the determinant of a 4x4 matrix */
function mat4Determinant(m: Mat4): number {
    const a00 = m[0], a01 = m[4], a02 = m[8], a03 = m[12];
    const a10 = m[1], a11 = m[5], a12 = m[9], a13 = m[13];
    const a20 = m[2], a21 = m[6], a22 = m[10], a23 = m[14];
    const a30 = m[3], a31 = m[7], a32 = m[11], a33 = m[15];

    return (
        a00 * (a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31)) -
        a01 * (a10 * (a22 * a33 - a23 * a32) - a12 * (a20 * a33 - a23 * a30) + a13 * (a20 * a32 - a22 * a30)) +
        a02 * (a10 * (a21 * a33 - a23 * a31) - a11 * (a20 * a33 - a23 * a30) + a13 * (a20 * a31 - a21 * a30)) -
        a03 * (a10 * (a21 * a32 - a22 * a31) - a11 * (a20 * a32 - a22 * a30) + a12 * (a20 * a31 - a21 * a30))
    );
}

/** Invert a 4x4 matrix. Returns null if singular. */
function mat4Inverse(m: Mat4): Mat4 | null {
    const det = mat4Determinant(m);
    if (Math.abs(det) < 1e-12) return null;

    const inv = new Array(16).fill(0);

    // Adjugate matrix / det via cofactor expansion
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            // Build 3x3 minor
            const minor: number[] = [];
            for (let c2 = 0; c2 < 4; c2++) {
                if (c2 === col) continue;
                for (let r2 = 0; r2 < 4; r2++) {
                    if (r2 === row) continue;
                    minor.push(m4Get(m, r2, c2));
                }
            }
            // 3x3 determinant of the minor
            const d3 =
                minor[0] * (minor[4] * minor[8] - minor[5] * minor[7]) -
                minor[3] * (minor[1] * minor[8] - minor[2] * minor[7]) +
                minor[6] * (minor[1] * minor[5] - minor[2] * minor[4]);

            const sign = ((row + col) & 1) === 0 ? 1 : -1;
            // Cofactor transpose (adjugate): (row, col) → (col, row)
            m4Set(inv, col, row, (sign * d3) / det);
        }
    }

    return inv;
}

/** Normalize a 3D vector */
function vec3Length(x: number, y: number, z: number): number {
    return Math.sqrt(x * x + y * y + z * z);
}

function vec3Cross(
    a: [number, number, number],
    b: [number, number, number],
): [number, number, number] {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ];
}

function vec3Dot(a: [number, number, number], b: [number, number, number]): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Decompose a CSS matrix3d (16 values in column-major CSS order) into
 * translate, scale, skew, rotation (quaternion), and perspective.
 *
 * CSS `matrix3d(a1,b1,c1,d1, a2,b2,c2,d2, a3,b3,c3,d3, a4,b4,c4,d4)` maps to:
 *   | a1 a2 a3 a4 |
 *   | b1 b2 b3 b4 |
 *   | c1 c2 c3 c4 |
 *   | d1 d2 d3 d4 |
 * The parameter order is already column-major: [a1,b1,c1,d1, a2,b2,c2,d2, ...].
 *
 * Based on the "unmatrix" algorithm from the CSS Transforms spec.
 */
export function decomposeMatrix3D(cssValues: number[]): DecomposedMatrix3D | null {
    if (cssValues.length !== 16) return null;

    // CSS matrix3d parameter order is already column-major — use directly
    const m: Mat4 = [...cssValues];

    // Step 1: Normalize — divide by m[15] (m44)
    const w = m[15];
    if (Math.abs(w) < 1e-12) return null;
    for (let i = 0; i < 16; i++) m[i] /= w;

    // Step 2: Perspective
    const perspective: Vec4 = [0, 0, 0, 1];
    if (
        Math.abs(m[3]) > 1e-12 ||
        Math.abs(m[7]) > 1e-12 ||
        Math.abs(m[11]) > 1e-12
    ) {
        // perspectiveMatrix = m with last column = [0,0,0,1]
        const pm = [...m];
        pm[3] = 0;
        pm[7] = 0;
        pm[11] = 0;
        pm[15] = 1;

        const pmInv = mat4Inverse(pm);
        if (!pmInv) return null;

        const pmInvT = mat4Transpose(pmInv);
        // Multiply transposed inverse by the original perspective column
        perspective[0] = pmInvT[0] * m[3] + pmInvT[4] * m[7] + pmInvT[8] * m[11] + pmInvT[12] * m[15];
        perspective[1] = pmInvT[1] * m[3] + pmInvT[5] * m[7] + pmInvT[9] * m[11] + pmInvT[13] * m[15];
        perspective[2] = pmInvT[2] * m[3] + pmInvT[6] * m[7] + pmInvT[10] * m[11] + pmInvT[14] * m[15];
        perspective[3] = pmInvT[3] * m[3] + pmInvT[7] * m[7] + pmInvT[11] * m[11] + pmInvT[15] * m[15];
    }

    // Step 3: Translation
    const translate: [number, number, number] = [m[12], m[13], m[14]];

    // Step 4: Extract 3x3 sub-matrix (upper-left) from column-major 4x4
    // Column 0: m[0], m[1], m[2]
    // Column 1: m[4], m[5], m[6]
    // Column 2: m[8], m[9], m[10]
    let row0: [number, number, number] = [m[0], m[1], m[2]];
    let row1: [number, number, number] = [m[4], m[5], m[6]];
    let row2: [number, number, number] = [m[8], m[9], m[10]];

    // Step 5: Compute scale X
    const scaleX = vec3Length(...row0);
    row0 = [row0[0] / scaleX, row0[1] / scaleX, row0[2] / scaleX];

    // Step 6: Compute skew XY
    let skewXY = vec3Dot(row0, row1);
    row1 = [
        row1[0] - row0[0] * skewXY,
        row1[1] - row0[1] * skewXY,
        row1[2] - row0[2] * skewXY,
    ];

    // Step 7: Compute scale Y
    const scaleY = vec3Length(...row1);
    row1 = [row1[0] / scaleY, row1[1] / scaleY, row1[2] / scaleY];
    skewXY /= scaleY;

    // Step 8: Compute skew XZ
    let skewXZ = vec3Dot(row0, row2);
    row2 = [
        row2[0] - row0[0] * skewXZ,
        row2[1] - row0[1] * skewXZ,
        row2[2] - row0[2] * skewXZ,
    ];

    // Step 9: Compute skew YZ
    let skewYZ = vec3Dot(row1, row2);
    row2 = [
        row2[0] - row1[0] * skewYZ,
        row2[1] - row1[1] * skewYZ,
        row2[2] - row1[2] * skewYZ,
    ];

    // Step 10: Compute scale Z
    const scaleZ = vec3Length(...row2);
    row2 = [row2[0] / scaleZ, row2[1] / scaleZ, row2[2] / scaleZ];
    skewXZ /= scaleZ;
    skewYZ /= scaleZ;

    // Step 11: Check for coordinate system flip
    const cross = vec3Cross(row1, row2);
    if (vec3Dot(row0, cross) < 0) {
        row0 = [-row0[0], -row0[1], -row0[2]];
        row1 = [-row1[0], -row1[1], -row1[2]];
        row2 = [-row2[0], -row2[1], -row2[2]];
    }

    // Step 12: Extract rotation as quaternion from rotation matrix
    // rotation matrix (row-major): [row0[0], row1[0], row2[0], row0[1], row1[1], row2[1], row0[2], row1[2], row2[2]]
    const quaternion = matrixToQuaternion(
        row0[0], row1[0], row2[0],
        row0[1], row1[1], row2[1],
        row0[2], row1[2], row2[2],
    );

    return {
        translate,
        scale: [scaleX, scaleY, scaleZ],
        skew: [skewXY, skewXZ, skewYZ],
        quaternion,
        perspective,
    };
}

/**
 * Convert a 3x3 rotation matrix (row-major) to a quaternion [x, y, z, w].
 */
function matrixToQuaternion(
    m00: number, m01: number, m02: number,
    m10: number, m11: number, m12: number,
    m20: number, m21: number, m22: number,
): Vec4 {
    const trace = m00 + m11 + m22;
    let x: number, y: number, z: number, w: number;

    if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1);
        w = 0.25 / s;
        x = (m21 - m12) * s;
        y = (m02 - m20) * s;
        z = (m10 - m01) * s;
    } else if (m00 > m11 && m00 > m22) {
        const s = 2 * Math.sqrt(1 + m00 - m11 - m22);
        w = (m21 - m12) / s;
        x = 0.25 * s;
        y = (m01 + m10) / s;
        z = (m02 + m20) / s;
    } else if (m11 > m22) {
        const s = 2 * Math.sqrt(1 + m11 - m00 - m22);
        w = (m02 - m20) / s;
        x = (m01 + m10) / s;
        y = 0.25 * s;
        z = (m12 + m21) / s;
    } else {
        const s = 2 * Math.sqrt(1 + m22 - m00 - m11);
        w = (m10 - m01) / s;
        x = (m02 + m20) / s;
        y = (m12 + m21) / s;
        z = 0.25 * s;
    }

    return [x, y, z, w];
}

// ────────────────────────────────────────────────────────────────
// Quaternion Slerp
// ────────────────────────────────────────────────────────────────

/**
 * Spherical linear interpolation between two quaternions.
 * Both quaternions should be normalized.
 */
export function slerp(qa: Vec4, qb: Vec4, t: number): Vec4 {
    let dot = qa[0] * qb[0] + qa[1] * qb[1] + qa[2] * qb[2] + qa[3] * qb[3];

    // If dot < 0, negate one quaternion to take the shorter arc
    if (dot < 0) {
        qb = [-qb[0], -qb[1], -qb[2], -qb[3]];
        dot = -dot;
    }

    // If quaternions are very close, use linear interpolation
    if (dot > 0.9995) {
        const result: Vec4 = [
            qa[0] + t * (qb[0] - qa[0]),
            qa[1] + t * (qb[1] - qa[1]),
            qa[2] + t * (qb[2] - qa[2]),
            qa[3] + t * (qb[3] - qa[3]),
        ];
        // Normalize
        const len = Math.sqrt(
            result[0] * result[0] + result[1] * result[1] +
            result[2] * result[2] + result[3] * result[3],
        );
        return [result[0] / len, result[1] / len, result[2] / len, result[3] / len];
    }

    const theta = Math.acos(dot);
    const sinTheta = Math.sin(theta);
    const wa = Math.sin((1 - t) * theta) / sinTheta;
    const wb = Math.sin(t * theta) / sinTheta;

    return [
        qa[0] * wa + qb[0] * wb,
        qa[1] * wa + qb[1] * wb,
        qa[2] * wa + qb[2] * wb,
        qa[3] * wa + qb[3] * wb,
    ];
}

// ────────────────────────────────────────────────────────────────
// Recomposition
// ────────────────────────────────────────────────────────────────

/**
 * Recompose a 3D decomposed matrix back into a CSS matrix3d() value array (16 values, column-major CSS order).
 */
export function recomposeMatrix3D(d: DecomposedMatrix3D): number[] {
    // Start with identity
    const m = mat4Identity();

    // Step 1: Apply perspective
    m4Set(m, 0, 3, d.perspective[0]);
    m4Set(m, 1, 3, d.perspective[1]);
    m4Set(m, 2, 3, d.perspective[2]);
    m4Set(m, 3, 3, d.perspective[3]);

    // Step 2: Apply translation
    m[12] += d.translate[0] * m[0] + d.translate[1] * m[4] + d.translate[2] * m[8];
    m[13] += d.translate[0] * m[1] + d.translate[1] * m[5] + d.translate[2] * m[9];
    m[14] += d.translate[0] * m[2] + d.translate[1] * m[6] + d.translate[2] * m[10];
    m[15] += d.translate[0] * m[3] + d.translate[1] * m[7] + d.translate[2] * m[11];

    // Step 3: Apply rotation (from quaternion)
    const rotMat = quaternionToMatrix(d.quaternion);
    const mr = mat4Multiply(m, rotMat);
    for (let i = 0; i < 16; i++) m[i] = mr[i];

    // Step 4: Apply skew
    if (d.skew[2] !== 0) {
        // YZ skew
        const skewMat = mat4Identity();
        m4Set(skewMat, 1, 2, d.skew[2]);
        const ms = mat4Multiply(m, skewMat);
        for (let i = 0; i < 16; i++) m[i] = ms[i];
    }
    if (d.skew[1] !== 0) {
        // XZ skew
        const skewMat = mat4Identity();
        m4Set(skewMat, 0, 2, d.skew[1]);
        const ms = mat4Multiply(m, skewMat);
        for (let i = 0; i < 16; i++) m[i] = ms[i];
    }
    if (d.skew[0] !== 0) {
        // XY skew
        const skewMat = mat4Identity();
        m4Set(skewMat, 0, 1, d.skew[0]);
        const ms = mat4Multiply(m, skewMat);
        for (let i = 0; i < 16; i++) m[i] = ms[i];
    }

    // Step 5: Apply scale
    const [sx, sy, sz] = d.scale;
    m[0] *= sx; m[1] *= sx; m[2] *= sx; m[3] *= sx;
    m[4] *= sy; m[5] *= sy; m[6] *= sy; m[7] *= sy;
    m[8] *= sz; m[9] *= sz; m[10] *= sz; m[11] *= sz;

    // Already in column-major order (same as CSS matrix3d parameter order)
    return [...m];
}

/**
 * Convert a quaternion [x, y, z, w] to a 4x4 rotation matrix (column-major).
 */
function quaternionToMatrix(q: Vec4): Mat4 {
    const [x, y, z, w] = q;
    const xx = x * x, yy = y * y, zz = z * z;
    const xy = x * y, xz = x * z, yz = y * z;
    const wx = w * x, wy = w * y, wz = w * z;

    return [
        1 - 2 * (yy + zz), 2 * (xy + wz), 2 * (xz - wy), 0,
        2 * (xy - wz), 1 - 2 * (xx + zz), 2 * (yz + wx), 0,
        2 * (xz + wy), 2 * (yz - wx), 1 - 2 * (xx + yy), 0,
        0, 0, 0, 1,
    ];
}

// ────────────────────────────────────────────────────────────────
// Interpolation helper
// ────────────────────────────────────────────────────────────────

/**
 * Interpolate between two decomposed 3D matrices at parameter t.
 * Uses slerp for rotation, lerp for everything else.
 */
export function interpolateDecomposed(
    a: DecomposedMatrix3D,
    b: DecomposedMatrix3D,
    t: number,
): DecomposedMatrix3D {
    const lerp = (v0: number, v1: number) => v0 + (v1 - v0) * t;

    return {
        translate: [
            lerp(a.translate[0], b.translate[0]),
            lerp(a.translate[1], b.translate[1]),
            lerp(a.translate[2], b.translate[2]),
        ],
        scale: [
            lerp(a.scale[0], b.scale[0]),
            lerp(a.scale[1], b.scale[1]),
            lerp(a.scale[2], b.scale[2]),
        ],
        skew: [
            lerp(a.skew[0], b.skew[0]),
            lerp(a.skew[1], b.skew[1]),
            lerp(a.skew[2], b.skew[2]),
        ],
        quaternion: slerp(a.quaternion, b.quaternion, t),
        perspective: [
            lerp(a.perspective[0], b.perspective[0]),
            lerp(a.perspective[1], b.perspective[1]),
            lerp(a.perspective[2], b.perspective[2]),
            lerp(a.perspective[3], b.perspective[3]),
        ],
    };
}
