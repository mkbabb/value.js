import{k as t}from"./vendor-katex-Dehg5p_Y.js";import{C as o,ad as e,o as s,w as b,J as r,V as c}from"./vendor-highlight-sMWp9TLU.js";import{_ as i}from"./index-Q19pIqw1.js";const m="const kelvin2rgb = ({ kelvin, alpha }",y="const rgb2kelvin = ({ r, g, b, alpha }",S="const hsv2hsl = ({ h, s, v, alpha }",E="const hsl2hsv = ({ h, s, l, alpha }",C="const hwb2hsl = ({ h, w, b, alpha }",f="const hsl2hwb = ({ h, s, l, alpha }",z="const rgb2hsl = ({ r, g, b, alpha }",O="function hsl2rgb({ h, s, l, alpha }",P=`function xyz2lab(xyz: XYZColor, toWhitePoint: WhitePoint = "D50"): LABColor {
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
}`,p=`function lab2xyz(lab: LABColor): XYZColor {
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
}`,v="function rgb2xyz({ r, g, b, alpha }",R=`const xyz2rgb = (
    { x, y, z, alpha }`,k="function lch2lab({ l, c, h, alpha }",B="function lab2lch({ l, a, b, alpha }",w="function oklab2xyz({ l, a, b, alpha }",Y=`function xyz2oklab(xyz: XYZColor): OKLABColor {
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
}`,N="function oklab2oklch({ l, a, b, alpha }",F="function oklch2oklab({ l, c, h, alpha }",h=o({__name:"Katex",props:{expression:{},displayMode:{type:Boolean,default:!0}},setup(n){const a=e("katexElement"),l=()=>{a.value&&t.render(n.expression,a.value,{displayMode:n.displayMode,throwOnError:!1,output:"mathml"})};return s(l),b(()=>n.expression,l),(A,_)=>(r(),c("div",{class:"inline-block",ref_key:"katexElement",ref:a},null,512))}}),d=i(h,[["__scopeId","data-v-aaeb860d"]]);export{d as K,z as a,S as b,E as c,f as d,C as e,P as f,B as g,O as h,k as i,Y as j,F as k,p as l,N as m,m as n,w as o,y as p,v as r,R as x};
