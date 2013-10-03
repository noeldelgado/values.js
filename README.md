# Values.js
The lightness or darkness of a color is called its value.
Tints are light values that are made by mixing a color with white, which increases lightness.
Shades are dark values that are made by mixing a color with black, which reduces lightness.

http://noeldelgado.github.io/Values.js/

## Dependencies
None

## Usage Example
```js
// include values.js to your project
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

#### lightness ( value : number )
Accepts a positive or negative number
```js
var lighten = color.lightness( 20 );
// returns an array with a single object with lightness increased

var darken = color.lightness( -20 );
// returns an array with a single object with lightness decreased
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
