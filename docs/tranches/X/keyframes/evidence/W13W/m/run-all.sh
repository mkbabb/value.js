#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — census at 390x844 · 844x390 · 430x932 · 932x430, light + dark.
# $1 = prefix (before|after|after2), $2 = base URL (before: the pre-cure worktree's dev server)
cd "$(dirname "$0")"
P="$1"; B="${2:-http://localhost:5173}"
for v in "390 844" "844 390" "430 932" "932 430"; do set -- $v; for t in light dark; do
  node census.mjs --base "$B" --w $1 --h $2 --theme $t --out "$P-$1x$2-$t.json" > "$P-$1x$2-$t.log" 2>&1; echo "$P $1x$2 $t: $(head -1 "$P-$1x$2-$t.log")"; done; done
