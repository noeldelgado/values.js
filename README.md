# Values.js
The lightness or darkness of a color is called its value.
Tints are light values that are made by mixing a color with white, which increases lightness.
Shades are dark values that are made by mixing a color with black, which reduces lightness.

http://noeldelgado.github.io/Values.js/

## Dependencies
None

## Installation

### Browser

Just download [values.min.js](https://raw.githubusercontent.com/noeldelgado/Values.js/master/dist/values.min.js) and add it to your env.

### Node

`npm install values.js`

### Bower

`bower install values.js`

## Usage
```js
// node
var Values = require('Values.js');

// browser
<script src="values.js"></script>
```
### Example
```js
var color = new Values('#0099ff');

console.log(color.hex) 			// => "#0099ff"
console.log(color.rgb) 			// => "rgb(0, 153, 255)"
console.log(color.hsl) 			// => "hsl(204, 100%, 50%)"

console.log(color._rgb) 		// => { r: 0, g: 153, b: 255 }
console.log(color._hsl) 		// => { h: 204, s: 100, l: 50 }

console.log(color.brightness)	// => 53

color.getTints().forEach(function(tint) {
	console.log(tint); 			
	// => [Object] all the properties as above
});

color.getShades().forEach(function(shade) {
	console.log(shade); 			
	// => [Object] all the properties as above
});

// tints, shades and the original color
color.getAll().forEach(function(color) {
  console.log(color); // => Object
});
```

## Methods

### setColor
```js
/**
 * Update the base color as well as its tints and shades.
 * @property setColor <pubilc> [Function]
 * @argument value <required> [String] valid hex, rgb or hsl color format.
 * @return this [Values]
 * /

color.setColor('ff0');
color.setColor('rgb(255,255,0)');
color.setColor('hsl(60,100%,50%)');
```

### getTints
```js
/**
 * Return the tints of the instantiated color.
 * The base color information is excluded by default from the Array.
 * You can include the base color to the results passing true as argument.
 * @property getTints <public> [Function]
 * @argument include_base_color <optional> [Boolean] (false)
 * @return tints [Array]
 */
 
var tints = color.getTints();
```

### getShades
```js
/**
 * Return the shades of the instantiated color.
 * The base color information is excluded by default from the Array.
 * You can include the base color to the results passing true as argument.
 * @property getShades <public> [Function]
 * @argument include_base_color <optional> [Boolean] (false)
 * @return shades [Array]
 */
 
var shades = color.getShades();
```

### getAll
```js
/**
 * Return the base color, the tints and shades of the color.
 * @property getAll <public> [Function]
 * @return this.all [Array]
 */
 
var allValues = color.getAll();
// this is the same as accessing the 'all' property (color.all)
```

### setStep
```js
/**
 * The percentage distance that will be used to generate the tints and shades.
 * @property setStep <public> [Function]
 * @argument step <required> [Number] (1)
 * @return this [Values]
 */
 
color.setStep(10);
// console.log(color.getAll().length) => 11

color.setStep(5);
// console.log(color.getAll().length) => 21

color.setStep(1);
// console.log(color.getAll().length) => 101
```

## Extras

### lightness
```js
/**
 * Returns a new Object with the lightness applied (increased or decreased).
 * It accepts a positive or negative number.
 * @property lightness <public> [Function]
 * @argument value <required> [Number]
 * @return obj [Object]
 */
 
var lighten = color.lightness(20);
var darken = color.lightness(-20);
```

## Values.Utils

### isHex(color)
```js
Values.Utils.isHEX('09c')     => true
Values.Utils.isHEX('#09c')    => true
Values.Utils.isHEX('#0099cc') => true
Values.Utils.isHEX('09cc')    => false
```

### isRGB(color)
```js
Values.Utils.isRGB('rgb(0,0,0)')    => true
Values.Utils.isRGB('rgba(0,0,0,0)') => true
Values.Utils.isRGB('0,0,0')         => false
```

### isHSL(color)
```js
Values.Utils.isHSL('hsl(198,58%,1%)')      => true
Values.Utils.isHSL('hsla(360,10%,10%, 1)') => true
Values.Utils.isHSl('hsl(361,10%,10%)')     => false
```

### RGBA(hex-color, alpha)
```js
Values.Utils.RGBA('#09c', 0.5) => "rgba(0, 153, 204, 0.5)"
```
