### Where it came from

The ICC chose D50 as the white of its profile connection space, the common ground every printer and screen profile converts through, because print is judged under D50 light. CSS Color 4 names it `xyz-d50`, and it's the XYZ that CIELAB is computed from.

### How to read it

The same X, Y and Z as XYZ D65, measured against a warmer white. value.js turns it into D65 with the Bradford matrix in the steps above, and back with its inverse.

### What to watch for

- XYZ D50 and XYZ D65 numbers for one colour differ, and mixing them up tints everything. value.js keeps them as two spaces for that reason.
