#!/bin/sh
# pass-6 novelty scan: every term below must return 0 across passes 1-5 for a
# finding to be claimed as new. Run from the BrowsePane audit directory.
for t in UserSortMenu MixSourceSelector GenerateControls ExtractWorkbench \
         SKELETON_COUNT SearchVariant searchVariants "palettes/mix" "wrong home"; do
  printf "%-22s" "$t"
  for f in challenge-L-library-pass1.md challenge-L-library-pass2.md \
           challenge-L-library-pass3.md challenge-L-library-pass4.md \
           challenge-L-library-pass5.md; do
    printf "%4s" "$(grep -c "$t" $f)"
  done; echo ""
done
echo "                      p1  p2  p3  p4  p5"
