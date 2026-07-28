#!/usr/bin/env python3
"""CHALLENGE-D (second seat) — is the inset ring PAINTED?

Element screenshots are captured at deviceScaleFactor 4, so 1 CSS px = 4
device px. If the inset 1px ring were painted, the outermost 4 device rows /
columns would be a 12%-foreground composite over the payload and would differ
measurably from the interior. Sampled at mid-width/mid-height to avoid the
corner radii.
"""
import sys
from PIL import Image

DSF = 4


def probe(path, label):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    cx, cy = w // 2, h // 2
    top = im.getpixel((cx, 0))
    top_in = im.getpixel((cx, DSF + 1))
    bot = im.getpixel((cx, h - 1))
    left = im.getpixel((0, cy))
    left_in = im.getpixel((DSF + 1, cy))
    interior = im.getpixel((cx, cy))

    def d(a, b):
        return max(abs(a[i] - b[i]) for i in range(3))

    print(f"--- {label}  ({path.split('/')[-1]}, {w}x{h} device px, DSF={DSF})")
    print(f"    interior(mid,mid)        = {interior}")
    print(f"    top edge   row 0         = {top}   maxΔ vs interior = {d(top, interior)}")
    print(f"    row {DSF+1} (just inside ring) = {top_in}   maxΔ vs interior = {d(top_in, interior)}")
    print(f"    bottom row h-1           = {bot}   maxΔ vs interior = {d(bot, interior)}")
    print(f"    left col 0 (mid height)  = {left}   maxΔ vs interior = {d(left, interior)}")
    print(f"    col {DSF+1} (just inside)     = {left_in}  maxΔ vs interior = {d(left_in, interior)}")
    verdict = "RING PAINTED" if max(d(top, interior), d(left, interior)) >= 3 else "NO RING IN THE PIXELS"
    print(f"    => {verdict}\n")
    return verdict


if __name__ == "__main__":
    for path, label in [(a, b) for a, b in zip(sys.argv[1::2], sys.argv[2::2])]:
        probe(path, label)
