# src/transform/

CSS matrix decomposition, recomposition, and quaternion interpolation.

## Files

```
transform/
└── decompose.ts    # 541 loc
                      decomposeMatrix2D(a,b,c,d,e,f)  — CSSOM View §15.1
                      decomposeMatrix3D(cssValues[16]) — polar/Gram-Schmidt "unmatrix"
                      recomposeMatrix3D(decomposed)    — reconstruct matrix3d() values
                      slerp(qa, qb, t)                 — quaternion spherical linear interpolation
                      interpolateDecomposed(a, b, t)    — full transform interpolation
```

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

## Matrix convention

4x4 matrices are **column-major** (CSS/WebGL convention). The 3x3 color matrices in `units/color/matrix.ts` are **row-major**—different storage order, don't mix them up.

## Types

- `Vec4` — 4-element tuple
- `Mat4` — 16-element array (column-major)
- `DecomposedMatrix2D` — translateX/Y, scaleX/Y, angle (rad), skew (tan)
- `DecomposedMatrix3D` — translate (Vec3), scale (Vec3), skew (3-tuple), quaternion (Vec4), perspective (Vec4)
