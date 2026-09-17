# src/transform/

CSS matrix decomposition, recomposition, quaternion interpolation, and DOM-free
SVG path geometry.

## Files

```
transform/
├── decompose.ts    # matrix decompose/recompose + quaternion slerp
│                     decomposeMatrix2D(a,b,c,d,e,f)   — CSSOM View §15.1
│                     decomposeMatrix3D(cssValues[16]) — polar/Gram-Schmidt "unmatrix"
│                     recomposeMatrix2D(decomposed)    — reconstruct matrix() values (§15.1 inverse)
│                     recomposeMatrix3D(decomposed)    — reconstruct matrix3d() values
│                     slerp(qa, qb, t)                 — quaternion spherical linear interpolation
│                     interpolateDecomposed(a, b, t)   — full transform interpolation (2D + 3D)
└── path.ts         # DOM-free SVG path geometry (VJ-F1, tranche-N W7)
                      getTotalLength(d)                — cumulative arc-length of a `d` string
                      getPointAtLength(d, length)      — point at an absolute length
                      PathGeometry                     — parse-once class; sample point + tangent
                                                         at a length or normalized t, over every
                                                         command (M/L/H/V/C/S/Q/T/A/Z + relatives)
```

> LoC counts intentionally omitted — `wc -l` is the source of truth.

## Algorithms

**2D decomposition**: extract translate → column norms → orthogonalize → rotation angle. Per CSSOM spec.

**3D decomposition** (12-step):
1. Normalize by homogeneous coordinate
2. Extract perspective (invert+transpose right column)
3. Extract translation
4. Gram-Schmidt orthogonalization of 3x3 submatrix → scale + skew
5. Cross product sign check → coordinate system flip
6. Rotation matrix → quaternion (trace-based, 4-case)

**Slerp**: shorter-arc selection, NLERP fallback for dot > 0.9995 (numerical stability).

**Path sampling** (`path.ts`): parse the `d` string into absolute segments → flatten
each curve to a polyline via adaptive recursive Bézier subdivision against a flatness
tolerance → build the cumulative arc-length table once at parse time. `getPointAtLength`
is then a binary search over that table + a local segment interpolation; the tangent
angle (`atan2` of the path derivative) rides alongside for `rotate: auto`. Elliptical
arcs (`A`) apply the SVG 1.1 §F.6 out-of-range radius correction; smooth shortcuts
(`S`/`T`) reflect the previous control point.

## Matrix convention

4x4 matrices are **column-major** (CSS/WebGL convention). The 3x3 color matrices in `units/color/matrix.ts` are **row-major**—different storage order, don't mix them up.

## Types

- `Vec4` — 4-element tuple
- `Mat4` — 16-element array (column-major)
- `DecomposedMatrix2D` — translateX/Y, scaleX/Y, angle (rad), skew (tan)
- `DecomposedMatrix3D` — translate (Vec3), scale (Vec3), skew (3-tuple), quaternion (Vec4), perspective (Vec4)
- `Point` — `{ x, y }` (path.ts)
- `PathSample` — `Point` + `angle` (radians, the path tangent for orient-along-path)
