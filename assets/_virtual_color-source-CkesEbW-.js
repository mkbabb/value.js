const n="const kelvin2rgb = ({ kelvin, alpha }",l="const rgb2kelvin = ({ r, g, b, alpha }",a="const hsv2hsl = ({ h, s, v, alpha }",o="const hsl2hsv = ({ h, s, l, alpha }",t="const hwb2hsl = ({ h, w, b, alpha }",s="const hsl2hwb = ({ h, s, l, alpha }",b="const rgb2hsl = ({ r, g, b, alpha }",c="function hsl2rgb({ h, s, l, alpha }",e=`function xyz2lab(xyz: XYZColor, toWhitePoint: WhitePoint = "D50"): LABColor {
    const labFunction = (value: number) =>
        value > LAB_EPSILON
            ? Math.cbrt(value)
            : (LAB_KAPPA * value + LAB_OFFSET) / LAB_SCALE_L;

    const whitePoint = WHITE_POINTS[toWhitePoint];

    const [x, y, z] = xyzToD50(xyz);

    // Normalize XYZ values relative to the given white point
    const xr = x / whitePoint[0], yr = y / whitePoint[1], zr = z / whitePoint[2];

    const fx = labFunction(xr), fy = labFunction(yr), fz = labFunction(zr);

    // Calculate L*, a*, and b* values
    const l = LAB_SCALE_L * fy - LAB_OFFSET; // L* = 116 * f(Y/Yn) - 16
    const a = LAB_SCALE_A * (fx - fy); // a* = 500 * [f(X/Xn) - f(Y/Yn)]
    const b = LAB_SCALE_B * (fy - fz); // b* = 200 * [f(Y/Yn) - f(Z/Zn)]

    const lab = new LABColor(
        scale(
            l,
            COLOR_SPACE_RANGES.lab.l.number.min,
            COLOR_SPACE_RANGES.lab.l.number.max,
        ),
        scale(
            a,
            COLOR_SPACE_RANGES.lab.a.number.min,
            COLOR_SPACE_RANGES.lab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.lab.b.number.min,
            COLOR_SPACE_RANGES.lab.b.number.max,
        ),
        xyz.alpha,
    );

    lab.whitePoint = toWhitePoint;

    return lab;
}`,h=`function lab2xyz(lab: LABColor): XYZColor {
    const labFunctionXZ = (value: number) =>
        value > LAB_EPSILON_3
            ? value ** 3
            : (LAB_SCALE_L * value - LAB_OFFSET) / LAB_KAPPA;

    const labFunctionY = (value: number) =>
        value > LAB_KAPPA_EPSILON
            ? ((value + LAB_OFFSET) / LAB_SCALE_L) ** 3
            : value / LAB_KAPPA;

    const whitePoint = WHITE_POINTS[lab.whitePoint];

    let { l, a, b, alpha } = lab;

    l = scale(
        l,
        0,
        1,
        COLOR_SPACE_RANGES.lab.l.number.min,
        COLOR_SPACE_RANGES.lab.l.number.max,
    );
    a = scale(
        a,
        0,
        1,
        COLOR_SPACE_RANGES.lab.a.number.min,
        COLOR_SPACE_RANGES.lab.a.number.max,
    );
    b = scale(
        b,
        0,
        1,
        COLOR_SPACE_RANGES.lab.b.number.min,
        COLOR_SPACE_RANGES.lab.b.number.max,
    );

    // Inverse of the xyz2lab function
    const fy = (l + LAB_OFFSET) / LAB_SCALE_L; // f(Y/Yn) = (L* + 16) / 116
    const fx = a / LAB_SCALE_A + fy; // f(X/Xn) = a* / 500 + f(Y/Yn)
    const fz = fy - b / LAB_SCALE_B; // f(Z/Zn) = f(Y/Yn) - b* / 200

    // Apply the inverse lab function to each value
    const [xr, yr, zr] = [labFunctionXZ(fx), labFunctionY(l), labFunctionXZ(fz)];

    // Denormalize XYZ values relative to the given white point
    let x = xr * whitePoint[0], y = yr * whitePoint[1], z = zr * whitePoint[2];

    const xyz = new XYZColor(x, y, z, alpha);
    xyz.whitePoint = lab.whitePoint;

    // All XYZ outputs are relative to D65:
    [x, y, z] = xyzToD65(xyz);

    xyz.whitePoint = "D65";

    xyz.x = x;
    xyz.y = y;
    xyz.z = z;

    return xyz;
}`,r="function rgb2xyz({ r, g, b, alpha }",i=`const xyz2rgb = (
    { x, y, z, alpha }`,A="function lch2lab({ l, c, h, alpha }",L="function lab2lch({ l, a, b, alpha }",x="function oklab2xyz({ l, a, b, alpha }",u=`function xyz2oklab(xyz: XYZColor): OKLABColor {
    const { x, y, z } = xyz;

    // Convert XYZ to linear LMS
    const lmsLinear = transformMat3([x, y, z] as Vec3, XYZ_TO_LMS_MATRIX);

    // Apply non-linearity (linear LMS to LMS)
    const lms: Vec3 = [Math.cbrt(lmsLinear[0]), Math.cbrt(lmsLinear[1]), Math.cbrt(lmsLinear[2])];

    // Convert LMS to OKLab
    const [l, a, b] = transformMat3(lms, LMS_TO_OKLAB_MATRIX);

    return new OKLABColor(
        l,
        scale(
            a,
            COLOR_SPACE_RANGES.oklab.a.number.min,
            COLOR_SPACE_RANGES.oklab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.oklab.b.number.min,
            COLOR_SPACE_RANGES.oklab.b.number.max,
        ),
        xyz.alpha,
    );
}`,_="function oklab2oklch({ l, a, b, alpha }",y="function oklch2oklab({ l, c, h, alpha }",z=`function hsv2xyz(hsv: HSVColor): XYZColor {
    const hsl = hsv2hsl(hsv);
    return hsl2xyz(hsl);
}`,C=`function xyz2hsv(xyz: XYZColor): HSVColor {
    const hsl = xyz2hsl(xyz);
    return hsl2hsv(hsl);
}`,S=`function oklch2xyz(oklch: OKLCHColor): XYZColor {
    const oklab = oklch2oklab(oklch);
    return oklab2xyz(oklab);
}`,E=`function xyz2oklch(xyz: XYZColor): OKLCHColor {
    const oklab = xyz2oklab(xyz);
    return oklab2oklch(oklab);
}`;export{b as a,a as b,o as c,z as d,C as e,s as f,t as g,c as h,e as i,L as j,A as k,h as l,u as m,y as n,x as o,_ as p,S as q,r,E as s,l as t,n as u,i as x};
