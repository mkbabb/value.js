#!/usr/bin/env python3
"""
T.W4-2 — the tnum MINT for the self-hosted Fraunces (O-10c's face).

THE ARTIFACT TRUTH (verified 2026-07-10, the F5 discipline — "verify on the
artifact, not the docs"): NO Fraunces build ships tabular figures. The
Google-served face, the google/fonts variable TTF, AND the undercasetype
1.000 upstream release all carry GSUB {case, liga, rvrn, ss01} only — no
`tnum` feature, no `.tf` glyph set, digits proportional at every instance
(zero 1461 vs one 1024 at default). t-title-typography F5's premise
("upstream Fraunces ships the feature") is REFUTED on the artifact; the
ratified alternative (re-voice the readout digits to Fira Code) is reserved
as an OWNER ruling (SYNTHESIS §8 annex rider ii). The wave's letter —
"self-host a Fraunces build with a VERIFIED tnum" — is therefore honored by
BUILDING the build: this script mints the tabular set the foundry never cut,
the way foundries commonly do (the same outlines on a constant advance).

WHAT IT DOES (to `fraunces-latin-normal.woff2` — the readout's face; the
italic/ext faces have no tabular consumers):

  1 · Ten `.tf` COMPOSITE glyphs (zero.tf … nine.tf), each referencing its
      base digit outline (gvar-varied through the component — outlines stay
      design-true at every instance) at a CONSTANT advance = the widest
      digit at the readout's own design-space point (wght 600 / opsz ~41),
      x-offset centering the default outline in the cell. A constant tabular
      advance across weights is standard foundry practice (columns align
      across the readout's 600/300 int/frac mix by construction).
  2 · Explicit HVAR AdvWidthMap entries pointing the new glyphs at a fresh
      ALL-ZERO VarData row — never the spec's out-of-range clamp (which
      would apply the LAST entry's deltas and re-proportionalize the mint).
  3 · A real GSUB `tnum` feature (single-substitution digits → `.tf`),
      registered on every script/LangSys — so the readout's declared
      `font-variant-numeric: tabular-nums` ACTIVATES it (the "declared but
      dead" F5 class dies), and prose digits stay proportional/design-true.

Verification: O-10c (e2e/smoke/oracles/o10-type-locks.spec.ts) asserts equal
RENDERED digit advance on the shipped face — never the declaration.

Run from the repo root:  python3 scripts/fonts/build-fraunces-tnum.py
(idempotent — skips if the face already carries tnum).
"""

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import Glyph, GlyphComponent
from fontTools.ttLib.tables import otTables as ot

FONT = Path("demo/color-picker/public/fonts/fraunces-latin-normal.woff2")

DIGITS = "0123456789"
# The readout's design-space point: fig-int wght 600, font-optical-sizing
# auto at the ~55px rung → opsz ≈ 41. Measured max digit advance there
# (instancer probe 2026-07-10): zero = 1333/2000 upm. 1340 rounds up for
# side-bearing air; heavier/wider instances render marginally tighter cells
# (documented, invisible at instrument scale).
TABULAR_ADVANCE = 1340


def main() -> None:
    font = TTFont(str(FONT))
    gsub = font["GSUB"].table
    existing = {fr.FeatureTag for fr in gsub.FeatureList.FeatureRecord}
    if "tnum" in existing:
        print(f"{FONT.name}: tnum already present — nothing to do")
        return

    cmap = font.getBestCmap()
    glyf = font["glyf"]
    hmtx = font["hmtx"]
    # Force-decompile gvar BEFORE the glyph count grows (its parser asserts
    # its own header count against the live glyph order).
    gvar = font["gvar"] if "gvar" in font else None

    # ── 1 · the .tf composites ─────────────────────────────────────────────
    subst: dict[str, str] = {}
    new_names: list[str] = []
    for d in DIGITS:
        base = cmap[ord(d)]
        name = f"{base}.tf"
        comp = GlyphComponent()
        comp.glyphName = base
        base_adv, base_lsb = hmtx[base]
        dx = (TABULAR_ADVANCE - base_adv) // 2
        comp.x, comp.y = dx, 0
        comp.flags = 0x4  # ROUND_XY_TO_GRID
        g = Glyph()
        g.numberOfContours = -1
        g.components = [comp]
        glyf[name] = g
        hmtx[name] = (TABULAR_ADVANCE, base_lsb + dx)
        new_names.append(name)
        subst[base] = name

    # (glyf.__setitem__ maintains the font-shared glyph order itself; maxp
    # recalcs at compile — no manual order/maxp surgery. The reverse glyph
    # map was cached pre-mint; rebuild it so GSUB compile resolves .tf ids.)
    font.getReverseGlyphMap(rebuild=True)

    # gvar's header carries its own glyphCount — a lazily-copied gvar would
    # ship 245 against maxp's 255 (spec-invalid; engines may reject the
    # face). Register the composites with EMPTY variations (their outlines
    # vary through the referenced base glyph; their offsets/advances are
    # deliberately static — the constant tabular cell).
    if gvar is not None:
        for name in new_names:
            gvar.variations[name] = []

    # ── 2 · HVAR: explicit zero-delta rows (never the out-of-range clamp) ──
    if "HVAR" in font:
        hvar = font["HVAR"].table
        store = hvar.VarStore
        zero_data = ot.VarData()
        zero_data.VarRegionIndex = []
        zero_data.VarRegionCount = 0
        zero_data.ItemCount = 1
        zero_data.NumShorts = 0
        zero_data.Item = [[]]
        store.VarData.append(zero_data)
        store.VarDataCount = len(store.VarData)
        zero_idx = ((store.VarDataCount - 1) << 16) | 0
        if hvar.AdvWidthMap is None:
            raise SystemExit(
                "HVAR has no AdvWidthMap (implicit glyph-id order) — the mint "
                "would shift every subsequent varIdx; refusing. Re-derive."
            )
        mapping = hvar.AdvWidthMap.mapping
        for name in new_names:
            mapping[name] = zero_idx

    # ── 3 · the GSUB tnum feature ──────────────────────────────────────────
    single = ot.SingleSubst()
    single.mapping = dict(subst)
    lookup = ot.Lookup()
    lookup.LookupType = 1
    lookup.LookupFlag = 0
    lookup.SubTable = [single]
    lookup.SubTableCount = 1
    gsub.LookupList.Lookup.append(lookup)
    gsub.LookupList.LookupCount = len(gsub.LookupList.Lookup)
    lookup_index = gsub.LookupList.LookupCount - 1

    feature = ot.Feature()
    feature.FeatureParams = None
    feature.LookupListIndex = [lookup_index]
    feature.LookupCount = 1
    rec = ot.FeatureRecord()
    rec.FeatureTag = "tnum"
    rec.Feature = feature
    gsub.FeatureList.FeatureRecord.append(rec)
    gsub.FeatureList.FeatureCount = len(gsub.FeatureList.FeatureRecord)
    feature_index = gsub.FeatureList.FeatureCount - 1

    def add_to_langsys(langsys: ot.LangSys) -> None:
        if feature_index not in langsys.FeatureIndex:
            langsys.FeatureIndex.append(feature_index)
            langsys.FeatureCount = len(langsys.FeatureIndex)

    for script_rec in gsub.ScriptList.ScriptRecord:
        script = script_rec.Script
        if script.DefaultLangSys is not None:
            add_to_langsys(script.DefaultLangSys)
        for ls_rec in script.LangSysRecord or []:
            add_to_langsys(ls_rec.LangSys)

    font.flavor = "woff2"
    font.save(str(FONT))
    print(f"{FONT.name}: minted tnum — {len(new_names)} .tf composites @ "
          f"{TABULAR_ADVANCE}/2000 upm, zero-delta HVAR rows, GSUB feature "
          f"on every LangSys")


if __name__ == "__main__":
    main()
