# Mega-tranche visual audit — Safari (WebKit), desktop + mobile, light + dark

Origin: `http://localhost:9000` · 4 matrices × 15 routes = **60 captures**

## Defect summary

### blankOrNearBlank — 0

_none_

### pageErrors — 0

_none_

### consoleErrors — 1

- safari-desktop-light /#/: WebGL: context lost.

### horizontalOverflow — 0

_none_

### darkClassMissing — 0

_none_

### mainCountNotOne — 0

_none_

### smallTapTargets — 60

- safari-desktop-light /#/: 8
- safari-desktop-light /#/palettes: 8
- safari-desktop-light /#/browse: 4
- safari-desktop-light /#/extract: 6
- safari-desktop-light /#/mix: 8
- safari-desktop-light /#/generate: 5
- safari-desktop-light /#/gradient: 6
- safari-desktop-light /#/atmosphere: 7
- safari-desktop-light /#/blob: 39
- safari-desktop-light /#/admin/users: 4
- safari-desktop-light /#/admin/names: 4
- safari-desktop-light /#/admin/audit: 4
- safari-desktop-light /#/admin/flagged: 4
- safari-desktop-light /#/admin/tags: 4
- safari-desktop-light /#/does-not-exist: 8
- safari-desktop-dark /#/: 8
- safari-desktop-dark /#/palettes: 8
- safari-desktop-dark /#/browse: 4
- safari-desktop-dark /#/extract: 6
- safari-desktop-dark /#/mix: 8
- safari-desktop-dark /#/generate: 5
- safari-desktop-dark /#/gradient: 6
- safari-desktop-dark /#/atmosphere: 7
- safari-desktop-dark /#/blob: 39
- safari-desktop-dark /#/admin/users: 4
- safari-desktop-dark /#/admin/names: 4
- safari-desktop-dark /#/admin/audit: 4
- safari-desktop-dark /#/admin/flagged: 4
- safari-desktop-dark /#/admin/tags: 4
- safari-desktop-dark /#/does-not-exist: 8
- safari-mobile-light /#/: 8
- safari-mobile-light /#/palettes: 4
- safari-mobile-light /#/browse: 4
- safari-mobile-light /#/extract: 6
- safari-mobile-light /#/mix: 4
- safari-mobile-light /#/generate: 5
- safari-mobile-light /#/gradient: 6
- safari-mobile-light /#/atmosphere: 7
- safari-mobile-light /#/blob: 8
- safari-mobile-light /#/admin/users: 4
- safari-mobile-light /#/admin/names: 4
- safari-mobile-light /#/admin/audit: 4
- safari-mobile-light /#/admin/flagged: 4
- safari-mobile-light /#/admin/tags: 4
- safari-mobile-light /#/does-not-exist: 8
- safari-mobile-dark /#/: 8
- safari-mobile-dark /#/palettes: 4
- safari-mobile-dark /#/browse: 4
- safari-mobile-dark /#/extract: 6
- safari-mobile-dark /#/mix: 4
- safari-mobile-dark /#/generate: 5
- safari-mobile-dark /#/gradient: 6
- safari-mobile-dark /#/atmosphere: 7
- safari-mobile-dark /#/blob: 8
- safari-mobile-dark /#/admin/users: 4
- safari-mobile-dark /#/admin/names: 4
- safari-mobile-dark /#/admin/audit: 4
- safari-mobile-dark /#/admin/flagged: 4
- safari-mobile-dark /#/admin/tags: 4
- safari-mobile-dark /#/does-not-exist: 8

### namelessButtons — 18

- safari-desktop-light /#/: 1
- safari-desktop-light /#/palettes: 1
- safari-desktop-light /#/extract: 3
- safari-desktop-light /#/mix: 1
- safari-desktop-light /#/gradient: 1
- safari-desktop-light /#/blob: 1
- safari-desktop-light /#/does-not-exist: 1
- safari-desktop-dark /#/: 1
- safari-desktop-dark /#/palettes: 1
- safari-desktop-dark /#/extract: 3
- safari-desktop-dark /#/mix: 1
- safari-desktop-dark /#/gradient: 1
- safari-desktop-dark /#/blob: 1
- safari-desktop-dark /#/does-not-exist: 1
- safari-mobile-light /#/extract: 3
- safari-mobile-light /#/gradient: 1
- safari-mobile-dark /#/extract: 3
- safari-mobile-dark /#/gradient: 1

## Per-capture table

| matrix | route | text | overflowX | main | h1 | canvas | pageErr | consoleErr | settle ms |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| safari-desktop-light | `/#/` | 859 | 0 | 1 | 0 | 1 | 0 | 1 | 18905 |
| safari-desktop-light | `/#/palettes` | 237 | 0 | 1 | 0 | 2 | 0 | 0 | 3139 |
| safari-desktop-light | `/#/browse` | 280 | 0 | 1 | 0 | 1 | 0 | 0 | 3595 |
| safari-desktop-light | `/#/extract` | 299 | 0 | 1 | 0 | 1 | 0 | 0 | 3568 |
| safari-desktop-light | `/#/mix` | 186 | 0 | 1 | 0 | 3 | 0 | 0 | 4201 |
| safari-desktop-light | `/#/generate` | 310 | 0 | 1 | 0 | 1 | 0 | 0 | 3553 |
| safari-desktop-light | `/#/gradient` | 611 | 0 | 1 | 0 | 1 | 0 | 0 | 3586 |
| safari-desktop-light | `/#/atmosphere` | 299 | 0 | 1 | 0 | 1 | 0 | 0 | 3606 |
| safari-desktop-light | `/#/blob` | 713 | 0 | 1 | 0 | 2 | 0 | 0 | 3515 |
| safari-desktop-light | `/#/admin/users` | 273 | 0 | 1 | 0 | 1 | 0 | 0 | 3494 |
| safari-desktop-light | `/#/admin/names` | 274 | 0 | 1 | 0 | 1 | 0 | 0 | 3506 |
| safari-desktop-light | `/#/admin/audit` | 259 | 0 | 1 | 0 | 1 | 0 | 0 | 3451 |
| safari-desktop-light | `/#/admin/flagged` | 256 | 0 | 1 | 0 | 1 | 0 | 0 | 3473 |
| safari-desktop-light | `/#/admin/tags` | 244 | 0 | 1 | 0 | 1 | 0 | 0 | 3488 |
| safari-desktop-light | `/#/does-not-exist` | 859 | 0 | 1 | 0 | 2 | 0 | 0 | 3496 |
| safari-desktop-dark | `/#/` | 859 | 0 | 1 | 0 | 2 | 0 | 0 | 3515 |
| safari-desktop-dark | `/#/palettes` | 237 | 0 | 1 | 0 | 2 | 0 | 0 | 3443 |
| safari-desktop-dark | `/#/browse` | 280 | 0 | 1 | 0 | 1 | 0 | 0 | 3470 |
| safari-desktop-dark | `/#/extract` | 299 | 0 | 1 | 0 | 1 | 0 | 0 | 3450 |
| safari-desktop-dark | `/#/mix` | 186 | 0 | 1 | 0 | 3 | 0 | 0 | 3491 |
| safari-desktop-dark | `/#/generate` | 310 | 0 | 1 | 0 | 1 | 0 | 0 | 3498 |
| safari-desktop-dark | `/#/gradient` | 611 | 0 | 1 | 0 | 1 | 0 | 0 | 3498 |
| safari-desktop-dark | `/#/atmosphere` | 299 | 0 | 1 | 0 | 1 | 0 | 0 | 3438 |
| safari-desktop-dark | `/#/blob` | 713 | 0 | 1 | 0 | 2 | 0 | 0 | 3435 |
| safari-desktop-dark | `/#/admin/users` | 273 | 0 | 1 | 0 | 1 | 0 | 0 | 3454 |
| safari-desktop-dark | `/#/admin/names` | 274 | 0 | 1 | 0 | 1 | 0 | 0 | 3427 |
| safari-desktop-dark | `/#/admin/audit` | 259 | 0 | 1 | 0 | 1 | 0 | 0 | 3452 |
| safari-desktop-dark | `/#/admin/flagged` | 256 | 0 | 1 | 0 | 1 | 0 | 0 | 3454 |
| safari-desktop-dark | `/#/admin/tags` | 244 | 0 | 1 | 0 | 1 | 0 | 0 | 3485 |
| safari-desktop-dark | `/#/does-not-exist` | 859 | 0 | 1 | 0 | 2 | 0 | 0 | 3499 |
| safari-mobile-light | `/#/` | 70 | 0 | 1 | 0 | 2 | 0 | 0 | 3317 |
| safari-mobile-light | `/#/palettes` | 169 | 0 | 1 | 0 | 1 | 0 | 0 | 3365 |
| safari-mobile-light | `/#/browse` | 124 | 0 | 1 | 0 | 1 | 0 | 0 | 3457 |
| safari-mobile-light | `/#/extract` | 142 | 0 | 1 | 0 | 1 | 0 | 0 | 3422 |
| safari-mobile-light | `/#/mix` | 118 | 0 | 1 | 0 | 2 | 0 | 0 | 3413 |
| safari-mobile-light | `/#/generate` | 148 | 0 | 1 | 0 | 1 | 0 | 0 | 3417 |
| safari-mobile-light | `/#/gradient` | 449 | 0 | 1 | 0 | 1 | 0 | 0 | 3377 |
| safari-mobile-light | `/#/atmosphere` | 286 | 0 | 1 | 0 | 1 | 0 | 0 | 3357 |
| safari-mobile-light | `/#/blob` | 69 | 0 | 1 | 0 | 2 | 0 | 0 | 3308 |
| safari-mobile-light | `/#/admin/users` | 122 | 0 | 1 | 0 | 1 | 0 | 0 | 3352 |
| safari-mobile-light | `/#/admin/names` | 123 | 0 | 1 | 0 | 1 | 0 | 0 | 3353 |
| safari-mobile-light | `/#/admin/audit` | 108 | 0 | 1 | 0 | 1 | 0 | 0 | 3371 |
| safari-mobile-light | `/#/admin/flagged` | 107 | 0 | 1 | 0 | 1 | 0 | 0 | 3364 |
| safari-mobile-light | `/#/admin/tags` | 92 | 0 | 1 | 0 | 1 | 0 | 0 | 3364 |
| safari-mobile-light | `/#/does-not-exist` | 70 | 0 | 1 | 0 | 2 | 0 | 0 | 3307 |
| safari-mobile-dark | `/#/` | 70 | 0 | 1 | 0 | 2 | 0 | 0 | 3287 |
| safari-mobile-dark | `/#/palettes` | 169 | 0 | 1 | 0 | 1 | 0 | 0 | 3353 |
| safari-mobile-dark | `/#/browse` | 124 | 0 | 1 | 0 | 1 | 0 | 0 | 3414 |
| safari-mobile-dark | `/#/extract` | 142 | 0 | 1 | 0 | 1 | 0 | 0 | 3355 |
| safari-mobile-dark | `/#/mix` | 118 | 0 | 1 | 0 | 2 | 0 | 0 | 3361 |
| safari-mobile-dark | `/#/generate` | 148 | 0 | 1 | 0 | 1 | 0 | 0 | 3423 |
| safari-mobile-dark | `/#/gradient` | 449 | 0 | 1 | 0 | 1 | 0 | 0 | 3397 |
| safari-mobile-dark | `/#/atmosphere` | 286 | 0 | 1 | 0 | 1 | 0 | 0 | 3392 |
| safari-mobile-dark | `/#/blob` | 69 | 0 | 1 | 0 | 2 | 0 | 0 | 3277 |
| safari-mobile-dark | `/#/admin/users` | 122 | 0 | 1 | 0 | 1 | 0 | 0 | 3333 |
| safari-mobile-dark | `/#/admin/names` | 123 | 0 | 1 | 0 | 1 | 0 | 0 | 3372 |
| safari-mobile-dark | `/#/admin/audit` | 108 | 0 | 1 | 0 | 1 | 0 | 0 | 3376 |
| safari-mobile-dark | `/#/admin/flagged` | 107 | 0 | 1 | 0 | 1 | 0 | 0 | 3339 |
| safari-mobile-dark | `/#/admin/tags` | 92 | 0 | 1 | 0 | 1 | 0 | 0 | 3351 |
| safari-mobile-dark | `/#/does-not-exist` | 70 | 0 | 1 | 0 | 2 | 0 | 0 | 3353 |
