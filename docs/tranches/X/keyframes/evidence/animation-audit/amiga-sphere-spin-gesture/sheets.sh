#!/bin/zsh
# contact sheets: 24 frames per sheet, cropped to the ball+shadow box, labelled with frame index.
set -e
for d in "$@"; do
  mkdir -p $d/crop; rm -f $d/crop/*.png(N) $d/sheet-*.png(N)
  for f in $d/f*.jpg; do b=${f:t:r}; magick $f -crop 280x280+1774+760 +repage $d/crop/$b.png; done
  files=($d/crop/*.png); n=${#files}; s=0
  for ((i=1;i<=n;i+=24)); do
    chunk=(${files[@]:$((i-1)):24})
    montage -label '%t' -font /System/Library/Fonts/Supplemental/Arial.ttf -pointsize 14 $chunk -tile 8x3 -geometry 150x150+2+2 $d/sheet-$(printf %02d $s).png; s=$((s+1))
  done
  echo "$d $n frames -> $s sheets"
done
