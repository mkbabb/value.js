<script setup>
import { Katex } from "@components/custom/katex";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";

</script>

### Attributes

-   `R`: Red channel (`00` to `FF`, i.e. 0 to 255)
-   `G`: Green channel (`00` to `FF`, i.e. 0 to 255)
-   `B`: Blue channel (`00` to `FF`, i.e. 0 to 255)
-   `A`: Alpha channel (`00` to `FF`, optional)

### Historical Context

Hex color notation arrived with CSS1 in 1996, borrowing the `#` prefix convention from X11 color names. It's a compact, human-readable encoding of sRGB values in base 16—six characters instead of three decimal numbers separated by commas. Two decades later it remains the most widely recognized color format on the web, appearing in CSS, HTML attributes, SVGs, design tools, and brand guidelines alike.

---

## Key Characteristics

1. **Compact sRGB encoding**: each pair of hexadecimal digits maps directly to one 8-bit RGB channel. `#FF8000` is just `rgb(255, 128, 0)` in a trench coat.
2. **Case-insensitive**: `#ff8000`, `#FF8000`, and `#Ff8000` are identical.
3. **Shorthand forms**: `#RGB` expands to `#RRGGBB` by doubling each digit; `#RGBA` expands to `#RRGGBBAA`.

### Advantages

-   Extremely compact—6 characters encode a full color
-   Universal recognition across tools, platforms, and specifications
-   Copy-paste friendly: no parentheses, commas, or units
-   The `#` prefix makes it instantly identifiable in source code

### Disadvantages

-   Not perceptually uniform—equal numerical steps don't produce equal visual steps
-   Device-dependent (same gamut limitations as sRGB)
-   No separate lightness or saturation axis—adjusting perceived brightness requires changing all three channels
-   Limited to 8 bits per channel (256 steps), unlike `rgb()` which accepts decimals and percentages

### Color Gamut

Hex encodes the same sRGB cube as `rgb()`: (0,0,0) black to (255,255,255) white. It cannot represent colors outside the sRGB gamut—no Display P3, no Rec. 2020.

---

## Color Model

### Notation Variants

1. **6-digit** (`#RRGGBB`): the standard form. Two hex digits per channel, 16,777,216 possible colors.

2. **3-digit shorthand** (`#RGB`): each digit is doubled—`#F80` becomes `#FF8800`.

3. **8-digit with alpha** (`#RRGGBBAA`): appends a two-digit alpha channel. `#FF800080` is 50% transparent orange.

4. **4-digit shorthand with alpha** (`#RGBA`): shorthand of the above—`#F808` becomes `#FF880088`.

### Hex to Decimal Conversion

Each pair of hex digits encodes a value from 0 to 255. The conversion from a two-digit hex string to decimal:

<Katex expression="V = 16 \cdot d_1 + d_0" />

where `d_1` is the high nibble and `d_0` is the low nibble, each in `\{0\text{–}9, A\text{–}F\}`.

The reverse—decimal to hex:

<Katex expression="d_1 = \lfloor V / 16 \rfloor, \quad d_0 = V \bmod 16" />

### Shorthand Expansion

The 3-digit form `#RGB` expands by duplicating each nibble:

<Katex expression="\#d_R d_G d_B \;\longrightarrow\; \#d_R d_R \, d_G d_G \, d_B d_B" />

So `#F80` becomes `#FF8800`, and `#F808` becomes `#FF880088`.

---

## Color Conversions

### Hex to RGB

Strip the `#` prefix, parse each two-character pair as a base-16 integer, then normalize to [0, 1]:

<Katex expression="R = \frac{\text{parseInt}(h_1 h_2, 16)}{255}, \quad G = \frac{\text{parseInt}(h_3 h_4, 16)}{255}, \quad B = \frac{\text{parseInt}(h_5 h_6, 16)}{255}" />

For shorthand, expand first: `#RGB` → `#RRGGBB`.

### RGB to Hex

Scale each [0, 1] component to [0, 255], round, then format as two-digit hex:

<Katex expression="\text{hex}(c) = \text{toString}_{16}\!\left(\text{round}(c \times 255)\right).\text{padStart}(2, \texttt{0})" />

<Katex expression="\#\text{hex}(R)\;\text{hex}(G)\;\text{hex}(B)" />

### Hex to XYZ (and Beyond)

Hex → RGB → linearize via sRGB transfer function → multiply by the sRGB-to-XYZ matrix. From XYZ, any other color space is reachable. Hex is syntactic sugar over sRGB—the math is identical once you've parsed the digits.

---

## Applications

1. **CSS and HTML**: the original web color format—still the most common in stylesheets and inline styles.
2. **Brand guidelines**: hex codes are the standard for specifying brand colors across digital and print.
3. **Design tools**: Figma, Sketch, Photoshop, and every color picker on Earth speak hex.
4. **Source code**: compact and greppable—`#FF0000` is easier to spot than `rgb(255, 0, 0)`.
5. **Serialization**: no spaces, no special characters (after `#`)—ideal for URLs, JSON, databases.
