# CIE XYZ Color Space

The CIE XYZ color space is a fundamental color space in colorimetry, established by the International Commission on Illumination (CIE) in 1931. It serves as the basis for defining other color spaces and is crucial for color management systems.

## Key Characteristics

-   Device-independent color space
-   Based on human color perception
-   All visible colors can be represented using positive XYZ values
-   Y component represents luminance

## White Points

this = `L^* = 0 \text{ (black) to } 100 \text{ (diffuse white)}`

White points are crucial reference points in color spaces. Two commonly used white points are:

<Card class="mb-4 p-2">
  <CardHeader>
    <CardTitle>D50 (5000K)</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Commonly used in the printing industry</p>
    <Katex expression="X_n = 0.9642, Y_n = 1.0000, Z_n = 0.8251" />
  </CardContent>
</Card>

<Card class="mb-4">
  <CardHeader>
    <CardTitle>D65 (6500K)</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Represents average daylight and is widely used in digital imaging</p>
    <Katex expression="X_n = 0.95047, Y_n = 1.00000, Z_n = 1.08883" />
  </CardContent>
</Card>

## XYZ to RGB Conversion

Converting from XYZ to RGB involves a matrix multiplication followed by a gamma correction. The matrix depends on the specific RGB color space (e.g., sRGB, Adobe RGB).

## RGB to XYZ Conversion

To convert from RGB to XYZ, we first apply an inverse gamma correction, then multiply by the inverse of the RGB to XYZ matrix.

Then, we apply the inverse matrix multiplication:

<Alert class="m-6">
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>
    These matrices are for the sRGB color space with a D65 white point. Different RGB color spaces or white points will require different matrices.
  </AlertDescription>
</Alert>

## Importance in Color Management

The CIE XYZ color space plays a crucial role in color management systems for several reasons:

1. **Device Independence**: XYZ values are absolute, making them ideal for color communication between different devices.

2. **Gamut Mapping**: It's used as an intermediate color space when converting between different color spaces or devices.

3. **Color Appearance Models**: Many advanced color appearance models use XYZ as their starting point.

4. **Standards Compliance**: XYZ is a standard color space in many color management workflows, ensuring consistency across different systems.

By understanding and utilizing the CIE XYZ color space, color scientists and engineers can ensure accurate color reproduction across various media and devices.
