#!/bin/bash
# F-REL.d (RESUME k) PD-1 on prod (ADDENDUM (f) .pd arm (a)). A fresh session uploads the
# repo asset, saves a drawn contour (no compute), creates a draft visualization; then
# GET under Accept-Encoding: gzip must carry the strong ETag; PATCH with that If-Match
# -> 200; PATCH replaying the now-stale tag -> 412; the draft is deleted by its owner.
# Prints codes and headers only, never the session token. Usage: pd1-prod.sh <image.jpg>
set -u
API=https://api.fourier.babb.dev; O=https://fourier.babb.dev; IMG="${1:?image}"
j() { python3 -c "import json,sys; d=json.load(sys.stdin); print($1)"; }
H=(-H "Origin: $O")
tok=$(curl -s -X POST "${H[@]}" "$API/api/sessions" | j 'd["token"]')
T=(-H "X-Session-Token: $tok")
img=$(curl -s -X POST "${H[@]}" "${T[@]}" -F "file=@$IMG;type=image/jpeg" "$API/api/images" | j 'd.get("image_slug","")')
hash=$(curl -s -X POST "${H[@]}" "${T[@]}" -H 'Content-Type: application/json' -d "{\"image_slug\":\"$img\",\"points\":{\"x\":[0,1,1,0,0],\"y\":[0,0,1,1,0]}}" "$API/api/contours" | j 'd.get("contour_hash","")')
viz=$(curl -s -X POST "${H[@]}" "${T[@]}" -H 'Content-Type: application/json' -d "{\"image_slug\":\"$img\",\"contour_hash\":\"$hash\",\"active_bases\":[\"fourier-epicycles\"],\"n_harmonics\":16,\"title\":\"F.REL .d PD-1 probe\"}" "$API/api/visualizations" | j 'd.get("slug","")')
echo "draft: image=${img:+yes} contour=${hash:+yes} viz=${viz:-<none>}"
[ -n "$viz" ] || exit 1
hdr=$(curl -s -D - -o /dev/null --compressed -H 'Accept-Encoding: gzip' "${H[@]}" "${T[@]}" "$API/api/visualizations/$viz")
echo "$hdr" | grep -i '^HTTP\|^content-encoding\|^etag\|^access-control-expose\|^vary' | tr -d '\r'
etag=$(echo "$hdr" | grep -i '^etag:' | sed 's/^[^:]*: *//' | tr -d '\r')
pt() { curl -s -o /dev/null -w '%{http_code}' -X PATCH "${H[@]}" "${T[@]}" -H "If-Match: $etag" -H 'Content-Type: application/json' -d "{\"title\":\"$1\"}" "$API/api/visualizations/$viz"; }
p1=$(pt "F.REL .d PD-1 probe — edited"); p2=$(pt "F.REL .d PD-1 probe — stale")
d=$(curl -s -o /dev/null -w '%{http_code}' -X DELETE "${H[@]}" "${T[@]}" -H 'If-Match: *' "$API/api/visualizations/$viz")
weak=no; case "$etag" in W/*) weak=yes;; esac
echo "gzip-etag-present=$([ -n "$etag" ] && echo yes || echo no) weak=$weak PATCH(If-Match)=$p1 PATCH(stale)=$p2 DELETE=$d"
[ -n "$etag" ] && [ "$weak" = no ] && [ "$p1" = 200 ] && [ "$p2" = 412 ] && [ "$d" = 204 ] && echo "PD-1 PASS" || { echo "PD-1 FAIL"; exit 1; }
