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
var Values = require('Values');

// browser
<script src="values.js"></script>
```

```js
var color = new Values('#0099ff');
color.all.forEach(function(e, i) {
  console.log(e); // => Object
});
```

## Methods

#### getTints ( include_base_color = false : boolean )
```js
var tints = color.getTints(); // => returns an array of objects with the tints
/*
 * The base color is excluded by default.
 * You can include the base color to the results passing true as an argument.
 * ex: color.getTints( true )
*/
```

#### getShades ( include_base_color = false : boolean )
```js
var shades = color.getShades(); // => returns an array of objects with the shades
/*
 * The base color is excluded by default.
 * You can include the base color to the results passing true as an argument.
 * ex: color.getShades( true )
*/
```

#### getAll() || obj.all
```js
var allValues = color.getAll();
// this is the same as accessing the 'all' property (color.all)
// returns an array of objects with both the tints and shades (Base color always included)
```

#### setColor(string) # valid hex or rgb color
```js
color.setColor('#ff0000');
color.setColor('rgb(255, 0, 0)');
```

#### setStep (number) // percentage
```js
color.setStep(10);
color.setStep(5);
```

## Extras

#### lightness ( value : number )
Accepts a positive or negative number
```js
var lighten = color.lightness( 20 );
// returns an array with a single object with lightness increased

var darken = color.lightness( -20 );
// returns an array with a single object with lightness decreased
```

## Values.Utils

#### isHex(color)
```js
Values.Utils.isHEX('09c')     => true
Values.Utils.isHEX('#09c')    => true
Values.Utils.isHEX('#0099cc') => true
Values.Utils.isHEX('09cc')    => false
```

#### isRGB(color)
```js
Values.Utils.isRGB('rgb(0,0,0)')    => true
Values.Utils.isRGB('rgba(0,0,0,0)') => true
Values.Utils.isRGB('0,0,0')         => false
```

#### RGBA(hex-color, alpha)
```js
Values.Utils.RGBA('#09c', 0.5) => "rgba(0, 153, 204, 0.5)"
```
