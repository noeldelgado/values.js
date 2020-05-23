# values.js

[![NPM Version][npm-image]][npm-url]
![][github-actions-nodejs-image]
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

## Usage
```js
import Values from 'values.js'
const color = new Values('hsl(204deg 100% 50% / 1)'), { log } = console

log(color.tint(25))
//> { rgb: [64, 179, 255], alpha: 1, type: "tint", weight: 25, ...methods }
log(color.shade(12))
//> { rgb: [0, 135, 224], alpha: 1, type: "shade", weight: 12, ...methods }
log(color.tints(8))
//> (12) [Values...]
log(color.shades(23))
//> (4) [Values...]
log(color.all(20))
//> (11) [Values...]

// instance example for 'red'
Values {
  alpha: 1
  rgb: (3) [255, 0, 0]
  type: "base"
  weight: 0
  get hex: ƒ(...)
  setColor: ƒ setColor(color)
  tint: ƒ tint(weight=50)
  tints: ƒ tints(weight=10)
  shade: ƒ shade(weight=50)
  shades: ƒ shades(weight=10)
  all: ƒ all(weight=10)
  hexString: ƒ hexString()
  rgbString: ƒ rgbString()
  getBrightness: ƒ getBrightness()
}
```
See [tests](https://github.com/noeldelgado/values.js/tree/master/test) for more cases.

## API

### constructor(color)
Throws if the color is not accepted.

- `@param {string} color` — a valid CSS color string

### setColor(color)
Sets a new base color, returns `null` if color has not been accepted.

- `@param {string} color` - a valid CSS color string
- `@return {Values|null}`

### tint([weight=50])
Lightens the base color by mixing it with white as specified by weight.

- `@param {number} [weight=50]`
- `@return {Values}`

### shade([weight=50)
Darkens the base color by mixing it with black as specified by weight.

- `@param {number} [weight=50]`
- `@return {Values}`

### tints([weight=10])
Generates the tints of the base color as specified by weight.

- `@param {number} [weight=10]`
- `@return {Array<Values>}`

### shades([percentage=10])
Generates the shades of the base color as specified by weight.

- `@param {number} [weight=10]`
- `@return {Array<Values>}`

### all([weight=10])
Generates the tints and shades of the base color as specified by weight.

- `@param {number} [weight=10]`
- `@return {Array<Values>}`

### hexString()
Returns the color in hexadecimal RGB notation.

- `@returns {string}` @example `#000000` or `#00000080`

### rgbString()
Returns the color in rgb() functional notation.

- `@returns {string}` @example `rgb(0, 0, 0)` or `rgba(0, 0, 0, 0.5)`

### getBrightness()
Calculates the brightness of the color.

- `@return {number}` — the base-color brightness.

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
[github-actions-nodejs-image]: https://github.com/noeldelgado/values.js/workflows/Node.js%20CI/badge.svg
[github-actions-lighthouse-image]: https://github.com/noeldelgado/values.js/workflows/Lighthouse/badge.svg
[license-image]: https://img.shields.io/npm/l/values.js.svg
[license-url]: https://github.com/noeldelgado/values.js/blob/master/LICENSE
[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/values.js?label=size
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
