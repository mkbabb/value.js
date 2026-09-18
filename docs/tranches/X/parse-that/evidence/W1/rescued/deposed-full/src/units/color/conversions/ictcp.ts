/**
 * ICtCp (ITU-R BT.2100) ↔ XYZ — the `color2()`-dispatch Color wrappers.
 *
 * S.W1 remediation (3.1.0 · Q9): the ICtCp *transform* math already ships inside
 * `difference.ts` (`rawXyz2ictcp` / `rawIctcp2xyz` — the BT.2100/BT.2124 matrices +
 * PQ constants, the "cheapest net-new space" the ratification named). This module
 * is the thin space wrapper the dispatch table needs: it adapts those raw
 * `[number,number,number]` functions to the `{ to, from }` XYZColor signature the
 * `XYZ_FUNCTIONS` hub keys by, applying the [0,1] ⇄ physical normalization every
 * other conversion module honours (see `oklab.ts`).
 *
 * CONVENTION: the XYZ hub carries RELATIVE physical XYZ (D65, media white Y=1 —
 * exactly what `rawXyz2ictcp` consumes); the ICtCpColor carries [0,1]-normalized
 * channels (physical I/Ct/Cp scaled against `COLOR_SPACE_RANGES.ictcp`). Forward
 * normalizes physical → [0,1]; inverse denormalizes [0,1] → physical against the
 * SAME bounds, so `color2` roundtrips are bound-consistent by construction.
 */

import { ICtCpColor, XYZColor } from "..";
import { scale } from "../../../math";
import { COLOR_SPACE_RANGES } from "../constants";
import { rawIctcp2xyz, rawXyz2ictcp } from "../difference";

const R = COLOR_SPACE_RANGES.ictcp;

/** XYZ (relative, Y=1) → ICtCp. Physical [I,Ct,Cp] normalized to [0,1]. */
export function xyz2ictcp(xyz: XYZColor): ICtCpColor {
    const [I, Ct, Cp] = rawXyz2ictcp(xyz.x, xyz.y, xyz.z);
    return new ICtCpColor(
        scale(I, R.i.number.min, R.i.number.max),
        scale(Ct, R.ct.number.min, R.ct.number.max),
        scale(Cp, R.cp.number.min, R.cp.number.max),
        xyz.alpha,
    );
}

/** ICtCp → XYZ (relative, Y=1). [0,1] channels denormalized to physical. */
export function ictcp2xyz(color: ICtCpColor): XYZColor {
    const I = scale(color.i, 0, 1, R.i.number.min, R.i.number.max);
    const Ct = scale(color.ct, 0, 1, R.ct.number.min, R.ct.number.max);
    const Cp = scale(color.cp, 0, 1, R.cp.number.min, R.cp.number.max);
    const [x, y, z] = rawIctcp2xyz(I, Ct, Cp);
    return new XYZColor(x, y, z, color.alpha);
}
