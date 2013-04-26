Values.js
=========

The lightness or darkness of a color is called its value.
Tints are light values that are made by mixing a color with white, which increases lightness.
Shades are dark values that are made by mixing a color with black, which reduces lightness.

### Usage
```js
var myColor = new Values();
myColor.setColor('#0099ff');
```

#### Tints
```js
var tints = myColor.getTints();
// returns an array of objects width the tints
```

#### Shades
```js
var shades = myColor.getShades();
// returns an array of objects with the shades
```

#### Both tints and shades
```js
var allValues = myColor.getTintsAndShades();
// returns an array of objects with both the tints and shades
```

#### Lightness
Accepts a positive or negative number
```js
var lighten = myColor.lightness( 20 );
// returns a single object with lightness increased
// => { hex: "#33ccff", hsl: { h: 195, s: 100, l: 60 }, rgb: { r: 51, b: 255, g: 204 }

var darken = myColor.lightness( -20 );
// returns a single object with lightness decreased
// => { hex: "#004d66", hsl: { h: 195, s: 100, l: 20 }, rgb: { r: 0, b: 102, g: 77 }
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
