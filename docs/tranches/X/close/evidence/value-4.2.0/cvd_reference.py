"""value.js 4.2.0 — independent CVD reference generator (SPEC §7, COHESION §0hf.3).

Writes `test/fixtures/cvd/reference.json`, the frozen vectors `test/color-vision.test.ts`
checks `simulateColorVision` against. It is NOT run in CI: the fixture is committed and
the test reads it. Re-run only to re-derive the fixture:

    python3 -m venv ~/.dev-logs/value-4.2.0/venv
    ~/.dev-logs/value-4.2.0/venv/bin/python -I -m pip install \
        colorspacious==1.1.2 daltonlens==0.1.5 numpy
    ~/.dev-logs/value-4.2.0/venv/bin/python -I test/support/cvd_reference.py \
        test/fixtures/cvd/reference.json

The two libraries are independent of value.js and of each other:
  - colorspacious 1.1.2 `MACHADO_ET_AL_MATRICES` / `machado_et_al_2009_matrix` (the
    authors' supplementary table, and the interpolation rule value.js adopts);
  - DaltonLens 0.1.5 `machado_2009_matrices` (a second transcription of the same table),
    `Simulator_Vienot1999` with `LMSModel_sRGB_SmithPokorny75` (the Viénot matrices), and
    `simulate_cvd` (the uint8 end-to-end reference).
Matrix application below is plain float64 numpy on the sRGB EOTF (IEC 61966-2-1, knee
0.04045), pre-clip, so value.js's clip is checked separately.
"""

import json
import sys
from importlib.metadata import version

import numpy as np
from colorspacious.cvd import MACHADO_ET_AL_MATRICES, machado_et_al_2009_matrix
from daltonlens import convert, simulate

KINDS = {
    "protan": ("protanomaly", simulate.Deficiency.PROTAN),
    "deutan": ("deuteranomaly", simulate.Deficiency.DEUTAN),
    "tritan": ("tritanomaly", simulate.Deficiency.TRITAN),
}
GRID_HEX = [
    "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffff00",
    "#808080", "#982a6b", "#1a5fa0",
    # SPEC §7 B seed inputs outside the grid
    "#338c00", "#a88f42", "#008e84",
]
GRID_SEVERITY = [0, 0.05, 0.1, 0.25, 0.5, 0.55, 0.7, 0.9, 0.93, 1]


def hex_bytes(h):
    h = h.lstrip("#")
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def eotf(byte):
    v = byte / 255.0
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def linear(h):
    return np.array([eotf(b) for b in hex_bytes(h)], dtype=np.float64)


def colorspacious_matrix(kind, severity):
    return np.asarray(machado_et_al_2009_matrix(KINDS[kind][0], severity * 100), dtype=np.float64)


def matrix_list(m):
    return [[float(x) for x in row] for row in np.asarray(m, dtype=np.float64)]


def main(out_path):
    tables = {
        kind: [matrix_list(MACHADO_ET_AL_MATRICES[cs][10 * i]) for i in range(11)]
        for kind, (cs, _) in KINDS.items()
    }
    dalton_tables = {
        kind: [matrix_list(simulate.machado_2009_matrices[dl][i]) for i in range(11)]
        for kind, (_, dl) in KINDS.items()
    }

    grid = []
    for kind in KINDS:
        for s in GRID_SEVERITY:
            m = colorspacious_matrix(kind, s)
            for h in GRID_HEX:
                grid.append({
                    "kind": kind, "severity": s, "hex": h,
                    "linear": [float(x) for x in m @ linear(h)],
                })

    # Off-grid interpolation: colorspacious (fraction / 10 per tenth) vs DaltonLens
    # (`alpha = severity - lower/10`, i.e. NOT scaled by 10). Both recorded at s = 0.55.
    dl_lower = simulate.machado_2009_matrices[simulate.Deficiency.DEUTAN][5]
    dl_upper = simulate.machado_2009_matrices[simulate.Deficiency.DEUTAN][6]
    dl_alpha = 0.55 - 5 / 10.0
    off_grid = {
        "kind": "deutan", "severity": 0.55,
        "colorspacious": matrix_list(colorspacious_matrix("deutan", 0.55)),
        "daltonlens": matrix_list(dl_alpha * dl_upper + (1.0 - dl_alpha) * dl_lower),
        "daltonlensAlpha": dl_alpha,
    }

    model = convert.LMSModel_sRGB_SmithPokorny75()
    vienot = {}
    for kind in ("protan", "deutan"):
        sim = simulate.Simulator_Vienot1999(model)
        sim._simulate_dichromacy_linear_rgb(np.zeros((1, 1, 3), dtype=np.float32), KINDS[kind][1])
        vienot[kind] = matrix_list(sim.cvd_linear_rgb)

    end_to_end = []
    cases = [("machado", "protan", "#338c00"), ("vienot", "protan", "#338c00"),
             ("machado", "deutan", "#982a6b"), ("vienot", "deutan", "#982a6b"),
             ("machado", "tritan", "#1a5fa0"), ("machado", "protan", "#0000ff")]
    for method, kind, h in cases:
        sim = simulate.Simulator_Machado2009() if method == "machado" else simulate.Simulator_Vienot1999(model)
        image = np.array([[hex_bytes(h)]], dtype=np.uint8)
        out = sim.simulate_cvd(image, KINDS[kind][1], 1.0)
        end_to_end.append({"method": method, "kind": kind, "hex": h,
                           "uint8": [int(x) for x in out[0, 0]]})

    fixture = {
        "header": {
            "generator": "test/support/cvd_reference.py",
            "command": "~/.dev-logs/value-4.2.0/venv/bin/python -I test/support/cvd_reference.py test/fixtures/cvd/reference.json",
            "python": sys.version.split()[0],
            "colorspacious": version("colorspacious"),
            "daltonlens": version("daltonlens"),
            "numpy": version("numpy"),
            "eotf": "IEC 61966-2-1 sRGB, knee 0.04045, float64",
        },
        "machado": {"colorspacious": tables, "daltonlens": dalton_tables},
        "grid": grid,
        "offGrid": off_grid,
        "vienot": {
            "daltonlens": vienot,
            "LMS_from_XYZ": matrix_list(model.LMS_from_XYZ),
            "XYZ_from_linearRGB": matrix_list(model.XYZ_from_linearRGB),
        },
        "endToEnd": end_to_end,
    }
    with open(out_path, "w") as f:
        json.dump(fixture, f, indent=1)
        f.write("\n")
    print(json.dumps(fixture["header"]))
    print(f"grid rows: {len(grid)}")
    print(f"off-grid deutan s=0.55 colorspacious: {off_grid['colorspacious']}")
    print(f"off-grid deutan s=0.55 daltonlens (alpha {dl_alpha}): {off_grid['daltonlens']}")
    print(f"vienot: {json.dumps(vienot)}")
    print(f"end-to-end: {json.dumps(end_to_end)}")


if __name__ == "__main__":
    main(sys.argv[1])
