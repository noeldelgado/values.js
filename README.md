# values.js

[![NPM Version][npm-image]][npm-url]
![][github-actions-nodejs-image]
![][github-actions-lighthouse-image]
[![License][license-image]][license-url]
[![Minzipped size][bundlephobia-image]][bundlephobic-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![Dependencies][david-image]][david-url]
[![Dev Dependencies][david-dev-image]][david-dev-url]
[![Total alerts][lgtm-image]][lgtm-url]
[![Language grade: JavaScript][lgtm-grade-image]][lgtm-grade-url]

Get tints and shades of a CSS color

> _The lightness or darkness of a color is called its value.
Tints are light values that are made by mixing a color with white, which increases lightness. Shades are dark values that are made by mixing a color with black, which reduces lightness._

https://noeldelgado.github.io/values.js/

### Supports
* \<color value\>
	* Hexadecimal RGB value: #RGB #RRGGBB
	* #RGBA #RRGGBBAA (4 and 8-digit hexadecimal RGBA notation)
	* RGB/A - CSS Color Module Level 3 and 4 (number, percentage)
	* HSL/A - CSS Color Module Level 3 and 4 (number, deg, rad, turn)
* \<color keyword\>
	* One of the [pre-defined color keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords).
* transparent
	* Shorthand for transparent black, rgba(0,0,0,0).

## Installation

**NPM**

```sh
npm install values.js --save
```

Or as a `<script>` tag from a CDN as `Values`:

**Unpkg CDN**

```html
<script src="https://unpkg.com/values.js"></script>
```

**jsDelivr CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/values.js"></script>
```

## Usage Example
```js
import Values from 'values.js'
const color = new Values('hsl(204deg 100% 50% / 1)'), { log } = console

log(color.rgb)   //> [0, 153, 255]
log(color.alpha) //> 1
log(color.hex)   //> "0099ff" (without token)

log(color.hexString()) //> "#0099ff" (with token)
log(color.rgbString()) //> "rgb(0, 153, 255)"
log(color.getBrightness()) //> 53

color.tints().forEach((tint) => {
  log(tint) //> [Values instance]
  // do stuff with `tint`, e.g.: tint.hexString()
});

color.shades().forEach((shade) => {
  log(shade) //> [Values instance]
  // do stuff with `shade`
});

// tints, original color and shades
color.all().forEach((value) => {
  log(value); //> [Value instance]
  // do stuff with value,
  // e.g.: if value.type === 'base' then addClass etc
  // if value.getBrightness() > 50 then set color white
});
```
## Instance Signature Example
```js
// log(new Values('#09f'))
{
  // properties
  /* oneOf("base", "tint", "shade") */
  type: "base"
  /* percentage balance point between the two colors */
  weight: 0
  rgb: [0, 153, 255]
  /* number within 0 and 1 */
  alpha: 1
  // getters
  /* return its #RGB hexadecimal notation without the token */
  hex: (...)
  // methods
  ƒ setColor(color)
  ƒ shade(weight = 50)
  ƒ shades(weight = 10)
  ƒ tint(weight = 50)
  ƒ tints(weight = 10)
  ƒ all(weight = 10)
  ƒ hexString()
  ƒ rgbaString()
  ƒ getBrightness()
}
```

## API

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

## Dev
```sh
npm install 	# install dev-dependencies
npm test		# run the tests
npm run dev 	# watch for changes and run tests
```

## Related
- [shadowlord](https://github.com/noeldelgado/shadowlord) - Tints and shades generator tool
- [mix-css-color](https://github.com/noeldelgado/mix-css-color) - Mix two CSS colors together in variable proportion. Opacity is included in the calculations.
- [parse-css-color](https://github.com/noeldelgado/parse-css-color) - Parse a CSS color string

## License
MIT © [Noel Delgado](https://pixelia.me/)

[npm-image]: https://img.shields.io/npm/v/values.js.svg?logo=npm&label=NPM
[npm-url]: https://www.npmjs.com/package/values.js
[github-actions-nodejs-image]: https://github.com/noeldelgado/values.js/workflows/Node.js%20CI/badge.svg?branch=feature/v2
[github-actions-lighthouse-image]: https://github.com/noeldelgado/values.js/workflows/Lighthouse/badge.svg?branch=feature/v2
[license-image]: https://img.shields.io/npm/l/values.js.svg
[license-url]: https://github.com/noeldelgado/values.js/blob/master/LICENSE
[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/values.js
[bundlephobic-url]: https://bundlephobia.com/result?p=values.js
[snyk-image]: https://snyk.io/test/npm/values.js/badge.svg
[snyk-url]: https://snyk.io/test/npm/values.js
[david-image]: https://img.shields.io/david/noeldelgado/values.js.svg
[david-url]: https://david-dm.org/noeldelgado/values.js
[david-dev-image]: https://img.shields.io/david/dev/noeldelgado/values.js.svg
[david-dev-url]: https://david-dm.org/noeldelgado/values.js?type=dev
[lgtm-image]: https://img.shields.io/lgtm/alerts/g/noeldelgado/values.js.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/noeldelgado/values.js/alerts/
[lgtm-grade-image]: https://img.shields.io/lgtm/grade/javascript/g/noeldelgado/values.js.svg?logo=lgtm&logoWidth=18
[lgtm-grade-url]: https://lgtm.com/projects/g/noeldelgado/values.js/context:javascript
