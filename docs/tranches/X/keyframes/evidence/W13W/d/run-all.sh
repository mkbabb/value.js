#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.KF.W13W.d — the collapsed-dock census, 1440x900 + 390x844, light + dark, 6 scenes.
# Usage: sh run-all.sh <tag> <base>   (tag = before | after | after2)
TAG=$1; BASE=$2; cd "$(dirname "$0")"
for cfg in "1440 900" "390 844"; do set -- $cfg
  for th in light dark; do
    node probe-collapsed-dock.mjs --base "$BASE" --w $1 --h $2 --theme $th --frames "$TAG" > "$TAG-$1-$th.json" 2> "$TAG-$1-$th.log"
  done
done
