Values.js
=========

The lightness or darkness of a color is called its value.

Tints are light values that are made by mixing a color with white, which increases lightness.

Shades are dark values that are made by mixing a color with black, which reduces lightness.

### Usage

```js
var myColor = new Values();
myColor.setColor('#0099ff');

var tints = myColor.getTints();
var shades = myColor.getShades();

var allValues = myColor.getTintsAndShades();
```

### Defaults

```js
color: {
    hex: "#37D7C2",
    rgb: {r: 55,  g: 215, b: 194},
    hsl: {h: 172, s: 67,  l: 53}
},
gap: 1.1
```
