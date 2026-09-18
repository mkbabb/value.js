#!/usr/bin/env python3
"""CHALLENGE-D (second seat) — vertical edge profile of the chip.

Element screenshots at deviceScaleFactor 4 (1 CSS px = 4 device px) can carry
one bleed row of page background when the box sits on a fractional coordinate,
so a naive "row 0" test is confounded. This prints the whole profile down a
single column inside one segment: page bleed, then (if the ring is painted) a
~4-device-px band of ring composite, then the payload.
"""
import sys
from PIL import Image


def profile(path, label, col_frac=0.5, rows=12):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    x = int(w * col_frac)
    print(f"--- {label}")
    print(f"    {path.split('/')[-1]}  {w}x{h} device px @ DSF 4  (column x={x})")
    top = [im.getpixel((x, y)) for y in range(rows)]
    bot = [im.getpixel((x, h - 1 - y)) for y in range(rows)]
    mid = im.getpixel((x, h // 2))
    print(f"    interior            = {mid}")
    print("    top rows  0..{}      = {}".format(rows - 1, top))
    print("    bottom rows h-1..h-{} = {}".format(rows, bot))
    # first row (from the top) that equals the interior payload exactly
    first = next((y for y in range(h) if im.getpixel((x, y)) == mid), None)
    print(f"    first row equal to interior payload: y={first}"
          f"  ({first/4:.2f} CSS px from the captured top edge)")
    print()


if __name__ == "__main__":
    args = sys.argv[1:]
    for i in range(0, len(args), 3):
        profile(args[i], args[i + 1], float(args[i + 2]))
