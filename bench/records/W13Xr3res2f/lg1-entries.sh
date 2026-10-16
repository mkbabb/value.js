# SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r3res2f per-entry emitted-bytes driver (S = a scratch dir holding head/src and work/src)
S=$1; cd /Users/mkbabb/Programming/value.js
for e in parseCssColor parseCssScalar parseCssValue parseCssValues parseKeyframeSelector parseTimingFunction parseStylesheet collectAnimationOptions; do
  for t in head work; do
    printf 'export { %s } from "%s/%s/src/css/index.ts";\n' $e $S $t > $S/$t-$e.ts
    npx esbuild $S/$t-$e.ts --bundle --minify-whitespace --minify-syntax --format=esm --platform=neutral --log-level=error --outfile=$S/$t-$e.mjs || echo FAIL $t $e
  done
  h=$(shasum -a 256 < $S/head-$e.mjs | cut -c1-16); w=$(shasum -a 256 < $S/work-$e.mjs | cut -c1-16)
  echo "$e head=$(wc -c < $S/head-$e.mjs | tr -d ' ') $h work=$(wc -c < $S/work-$e.mjs | tr -d ' ') $w $([ $h = $w ] && echo SAME || echo CHANGED)"
done
