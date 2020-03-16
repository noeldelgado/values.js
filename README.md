# values.js
[![npm-image](https://img.shields.io/npm/v/values.js.svg)](https://www.npmjs.com/package/values.js)
![bower-image](https://img.shields.io/bower/v/values.js.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/values.js/1.1.0/badge.svg)](https://snyk.io/test/npm/values.js/1.1.0)
![license-image](https://img.shields.io/npm/l/values.js.svg)

The lightness or darkness of a color is called its value.
Tints are light values that are made by mixing a color with white, which increases lightness.
Shades are dark values that are made by mixing a color with black, which reduces lightness.

## Demo
https://noeldelgado.github.io/values.js/

## Dependencies
None

## Installation

**NPM**

```sh
npm install values.js --save
```

**Bower**

```sh
bower install values.js --save
```

## Usage Example
```js
var Values = require('values.js')
  , color = new Values('#0099ff');

console.log(color.hex)              // => "0099ff"
console.log(color.rgb)              // => {r:0, g:153, b:255}
console.log(color.hsl) 	            // => {h:204, s: 100, l: 50}

console.log(color.hexString())      // => "#0099ff"
console.log(color.rgbString()) 	    // => "rgb(0, 153, 255)"
console.log(color.hslString())      // => "hsl(204, 100%, 50%)"

console.log(color.getBrightness())  // => 53

color.tints().forEach(function(tint) {
  console.log(tint);     // => [Values instance]
});

color.shades().forEach(function(shade) {
  console.log(shade);    // => [Values instance]
});

// tints, original color and shades
color.all().forEach(function(color) {
  console.log(color);   // => [Value instance]
});
```
## Instance
```js
// console.log(new Values('#09f'))
{
	hex: "09c"
	hsl: { h: 195, s: 100, l: 40 }
	rgb: { r: 0, g: 153, b: 204 }
	...
}
```

## Instance Methods

### setColor(String:color)
```js
/* Sets the base color for which all operations are based. Updates the instance's properties.
 * @param {string} color - A valid color format (#000, rgb(0,0,0), hsl(0,0%,0%))
 * @return {Values|Error}
 */

color.setColor('ff0');
color.setColor('rgb(255,255,0)');
color.setColor('hsl(60,100%,50%)');
```

### tint([Number:percentage=50])
```js
/* Lightens the instance by mixing it with white as specified by @percentage.
 * @param {number} [percentage=50]
 * @return {Values}
 */

color.tint();
color.tint(10);
color.tint(24);
```

### shade([Number:percentage=50)
```js
/* Darkens the instance color by mixing it with black as specified by @percentage.
 * @param {number} [percentage=50]
 * @return {Values}
 */

color.shade();
color.shade(9);
color.shade(31);
```

### tints([Number:percentage=10])
````js
/* Generates the tints of the instance color as specified by @percentage.
 * @param {number} [percentage=10]
 * @return {Array<Values>}
 */

color.tints(20).forEach(function (tint) {
    console.log(tint)
})
````

### shades([Number:percentage=10])
````js
/* Generates the shades of the instance color as specified by @percentage.
 * @param {number} [percentage=10]
 * @return {Array<Values>}
*/

color.shades(20).forEach(function (shade) {
    console.log(shade)
})
````

### all([Number:percentage=10])
```js
/* Generates the tints and shades of the instance color as specified by @percentage.
 * @param {number} [percentage=10]
 * @return {Array<Values>}
 */

color.all().forEach(function (color) {
    console.log(color)
})
```

### getBrightness()
````js
/* Calculates the brightness of the instance base-color.
 * @return {number} the base-color brightness.
 */
color.getBrightness();
````

### hexString()
```js
/* Returns the instance color in hexadecimal string form.
 * @returns {string} e.g. '#000000'
 */
 color.hexString();
```

### rgbString()
```js
/* Returns the instance color in rgb string form.
 * @returns {string} e.g. 'rgb(0, 0, 0)'
 */
color.rgbString();
```

### hslString()
```js
/* Returns the instance color in hsl string form.
 * @returns {string} e.g. 'hsl(0, 0%, 0%)'
 */
color.hslString();
```

## Static Methods (Utils)

### isHex(String:color)
```js
Values.Utils.isHEX('09c')     => true
Values.Utils.isHEX('#09c')    => true
Values.Utils.isHEX('#0099cc') => true
Values.Utils.isHEX('09cc')    => false
```

### isRGB(String:color)
```js
Values.Utils.isRGB('rgb(0,0,0)')    => true
Values.Utils.isRGB('rgba(0,0,0,.0)') => true
Values.Utils.isRGB('0,0,0')         => false
```

### isHSL(String:color)
```js
Values.Utils.isHSL('hsl(198,58%,1%)')      => true
Values.Utils.isHSL('hsla(360,10%,10%, 1)') => true
Values.Utils.isHSl('hsl(361,10%,10%)')     => false
```

## Dev
```sh
npm install 	# install dev-dependencies
npm test		# run the tests
npm run dev 	# watch for changes and run tests
```

## Related
- [Shadowlord](https://github.com/noeldelgado/shadowlord) - Tints and shades generator tool

## License
MIT © [Noel Delgado](http://pixelia.me/)
