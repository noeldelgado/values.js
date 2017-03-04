var main = (function () {
function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module) {
/**
 * values.js - Get the tints and shades of a color
 * @version v1.0.3
 * @link http://noeldelgado.github.io/values.js/
 * @license MIT
 */
(function () {
  var Utils = {
    reHash: new RegExp('^#'),
    reHEX: new RegExp('^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$'),
    reRGB: new RegExp('rgba?\\s*\\((\\d+)\\,\\s*(\\d+)\\,\\s*(\\d+)(,\\s*((\\d+)?(\\.\\d+)?))?\\)', 'i'),
    reHSL: new RegExp('hsla?\\((\\d+),\\s*([\\d.]+)%,\\s*([\\d.]+)%,?\\s*(?:0?(\\.\\d+)?|1(\\.0)?)?\\)', 'i'),

    isHEX: function isHEX(value) {
      return this.reHEX.test(value);
    },

    isRGB: function isRGB(value) {
      var rgb = value.match(this.reRGB);

      if (rgb) {
        if ((rgb[1] <= 255) && (rgb[2] <= 255) && (rgb[3] <= 255)) {
          return true;
        }
      }

      return false;
    },

    isHSL: function isHSL(value) {
      var hsl = value.match(this.reHSL);

      if (hsl) {
        if ((hsl[1] <= 360) && (hsl[2] <= 100) && (hsl[3] <= 100)) {
          return true;
        }
      }

      return false;
    },

    HEXtoRGB: function HEXtoRGB(hex) {
      hex = hex.replace('#', '');

      if (hex.length === 3) {
        var h1 = hex.charAt(0), h2 = hex.charAt(1), h3 = hex.charAt(2);
        hex = h1 + h1 + h2 + h2 + h3 + h3;
      }
      var bw = parseInt(hex, 16);

      return {r: (bw >> 16) & 255, g: (bw >> 8) & 255, b: bw & 255};
    },

    RGBtoHEX: function RGBtoHEX(r, g, b) {
      return (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },

    RGBtoHSL: function RGBtoHSL(r, g, b) {
      var min, max, h, s, l;

      r = (r / 255);
      g = (g / 255);
      b = (b / 255);

      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = ((max + min) / 2);

      if (max === min) {h = s = 0;}
      else {
        var d = (max - min);
        s = (l > 0.5) ? (d / (2 - max - min)) : (d / (max + min));

        if (max === r) {h = ((g - b) / d + (g < b ? 6 : 0));}
        else if (max === g) {h = ((b - r) / d + 2);}
        else if (max === b) {h = ((r - g) / d + 4);}

        h /= 6;
      }

      return {h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100)};
    },

    HUEtoRGB: function HUEtoRGB(v1, v2, vh) {
      if (vh < 0) {vh += 1;}
      if (vh > 1) {vh -= 1;}

      if ((6 * vh) < 1) {return (v1 + (v2 - v1) * 6 * vh);}
      if ((2 * vh) < 1) {return v2;}
      if ((3 * vh) < 2) {return (v1 + (v2 - v1) * ((2 / 3) - vh) * 6);}
      return v1;
    },

    HSLtoRGB: function HSLtoRGB(h, s, l) {
      var r, g, b;

      h /= 360;
      s /= 100;
      l /= 100;

      if (s === 0) {r = g = b = l;} else {
        var q = (l < 0.5) ? (l * (1 + s)) : (l + s - l * s);
        var p = (2 * l - q);
        r = this.HUEtoRGB(p, q, h + 1 / 3);
        g = this.HUEtoRGB(p, q, h);
        b = this.HUEtoRGB(p, q, h - 1 / 3);
      }

      return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
    },

    mix: function mix(color1, color2, percentage) {
      percentage = (typeof percentage === 'undefined') ? 50 : percentage;

      var weight = (percentage / 100.0);
      var w = (weight * 2 - 1);
      var a = 0;

      var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
      var w2 = (1 - w1);

      var r = Math.round(color1.rgb.r * w1 + color2.rgb.r * w2);
      var g = Math.round(color1.rgb.g * w1 + color2.rgb.g * w2);
      var b = Math.round(color1.rgb.b * w1 + color2.rgb.b * w2);

      return new Values(Utils.RGBtoHEX(r, g, b));
    }
  };

  function Values (color) {
    this.hex = '';
    this.hsl = {};
    this.rgb = {};

    if (color) {
      return this.setColor(color);
    }

    return this;
  }

  Values.Utils = Utils;

  /* Sets the base color for which all operations are based. Updates the instance’s properties.
   * @public
   * @param {string} color - A valid color format (#000, rgb(0,0,0), hsl(0,0%,0%))
   * @return {Values|Error}
   */
  Values.prototype.setColor = function setColor (color) {
    if (Utils.isHEX(color)) {
      return this._setFromHexString(color);
    } else if (Utils.isRGB(color)) {
      return this._setFromRGBString(color);
    } else if (Utils.isHSL(color)) {
      return this._setFromHSLString(color);
    }

    return new Error('Invalid Color Format');
  };

  /* Lightens the instance by mixing it with white as specified by @percentage.
   * @public
   * @param {number} [percentage]
   * @return {Values}
   */
  Values.prototype.tint = function tint (percentage) {
    return Utils.mix({rgb: {r: 255, g: 255, b: 255}}, this, percentage);
  };

  /* Darkens the instance color by mixing it with black as specified by @percentage.
   * @public
   * @param {number} [percentage]
   * @return {Values}
   */
  Values.prototype.shade = function shade (percentage) {
    return Utils.mix({rgb: {r: 0, g: 0, b: 0}}, this, percentage);
  };

  /* Generates the tints of the instance color as specified by @percentage.
   * @public
   * @param {number} [percentage=10]
   * @return {Array<Values>}
   */
  Values.prototype.tints = function tint (percentage) {
    var this$1 = this;

    var i = percentage = (percentage || 10), tints = [];

    while (i <= 100) {
      tints.push(this$1.tint(i));
      i += percentage;
    }

    return tints;
  };

  /* Generates the shades of the instance color as specified by @percentage.
   * @public
   * @param {number} [percentage=10]
   * @return {Array<Values>}
   */
  Values.prototype.shades = function tint (percentage) {
    var this$1 = this;

    var i = percentage = (percentage || 10), shades = [];

    while (i <= 100) {
      shades.push(this$1.shade(i));
      i += percentage;
    }

    return shades;
  };

  /* Generates the tints and shades of the instance color as specified by @percentage.
   * @public
   * @param {number} [percentage]
   * @return {Array<Values>}
   */
  Values.prototype.all = function all (percentage) {
    var tints = this.tints(percentage).reverse()
      , shades = this.shades(percentage);

    tints.push(this);
    return tints.concat(shades);
  };

  /* Calculates the brightness of the instance base-color.
   * @return {number} the base-color brightness.
   */
  Values.prototype.getBrightness = function getBrightness () {
    var sum = (this.rgb.r + this.rgb.g + this.rgb.b);
    return Math.round(sum / (255 * 3) * 100);
  };

  /* Returns the instance color in hexadecimal string form.
   * @returns {string} e.g. '#000000'
   */
  Values.prototype.hexString = function hexString () {
    return ('#' + this.hex);
  };

  /* Returns the instance color in rgb string form.
   * @returns {string} e.g. 'rgb(0, 0, 0)'
   */
  Values.prototype.rgbString = function rgbString () {
    return ('rgb(' + this.rgb.r + ', ' + this.rgb.g + ', ' + this.rgb.b + ')');
  };

  /* Returns the instance color in hsl string form.
   * @returns {string} e.g. 'hsl(0, 0%, 0%)'
   */
  Values.prototype.hslString = function hslString () {
    return ('hsl(' + this.hsl.h + ', ' + this.hsl.s + '%, ' + this.hsl.l + '%)');
  };

  /* Updates the instance base-color properties from a valid hex string.
   * @private
   * @param {string} color
   */
  Values.prototype._setFromHexString = function _setFromHexString (color) {
    this.hex = (Utils.reHash.test(color)) ? color.replace('#', '') : color;
    this.rgb = Utils.HEXtoRGB(color);
    this.hsl = Utils.RGBtoHSL(this.rgb.r, this.rgb.g, this.rgb.b);

    return this;
  };

  /* Updates the instance base-color properties from a valid rgb string.
   * @private
   * @param {string} color
   */
  Values.prototype._setFromRGBString = function _setFromRGBString(color) {
    var rgb = color.replace(/[^\d,]/g, '').split(',')
      , r = parseInt(rgb[0], 10)
      , g = parseInt(rgb[1], 10)
      , b = parseInt(rgb[2], 10);

    this.rgb = {r: r, g: g, b: b};
    this.hex = Utils.RGBtoHEX(r, g, b);
    this.hsl = Utils.RGBtoHSL(this.rgb.r, this.rgb.g, this.rgb.b);

    return this;
  };

  /* Updates the instance base-color properties from a valid hsl string.
   * @private
   * @param {string} color
   */
  Values.prototype._setFromHSLString = function _setFromHSLString (color) {
    var hsl = color.match(Utils.reHSL)
      , h = Math.round(hsl[1])
      , s = Math.round(hsl[2])
      , l = Math.round(hsl[3]);

    this.hsl = {h: h, s: s, l: l};
    this.rgb = Utils.HSLtoRGB(h, s, l);
    this.hex = Utils.RGBtoHEX(this.rgb.r, this.rgb.g, this.rgb.b);

    return this;
  };

  {
    module.exports = Values;
  }
})();
});

(function(){
  var Values = index;

  var dom = {
    e1: document.querySelector('.ex-01'),
    e2: document.querySelector('.ex-02'),
    e3: document.querySelector('.ex-03'),
    e4: document.querySelector('.ex-04'),
    e5: document.querySelector('.ex-05'),
    e6: document.querySelector('.ex-06')
  };

  // Helper Function
  var f = function (obj, values, section, container, brightnessSample) {
    var frag = document.createDocumentFragment();

    for (var i = 0; i < values.length; i += 1) {
      var e = document.createElement('div');
      e.className = "color";
      e.style.backgroundColor = values[i].hexString();

      if (values[i].hex === obj.hex) {
        e.className += " orig";
      }

      if (brightnessSample) {
        var brightness = values[i].getBrightness();
        e.textContent = brightness;
        e.style.color = (brightness < 50) ? "#fff" : "#000";
      }

      frag.appendChild(e);
    }

    container.appendChild( frag );
  };

  var ex1 = new Values('#2ecc71');
  f(ex1, ex1.all(5), dom.e1, dom.e1.querySelector('.colors'));

  var ex3 = new Values('#9b59b6');
  f(ex3, ex3.tints(10), dom.e3, dom.e3.querySelector('.colors'));

  var ex2 = new Values('#3498db');
  f(ex2, ex2.shades(10), dom.e2, dom.e2.querySelector('.colors'));

  var ex4 = new Values('#e74c3c');
  f(ex4, [ex4].concat(ex4.tint(20)), dom.e4, dom.e4.querySelector('.colors'));

  var ex5 = new Values('#f1c40f');
  f(ex5, [ex5].concat(ex5.shade(10)), dom.e5, dom.e5.querySelectorAll('.colors')[0]);

  var ex6 = new Values('#ee0');
  f(ex6, ex6.all(10), dom.e6, dom.e6.querySelector('.colors'), true);
}());

var _00 = {

};

return _00;

}());

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQvanMvMDAuanMiLCJzb3VyY2VzIjpbInNyYy9qcy9fZW50cmllcy8wMC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFVBQVU7RUFDVCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0VBRXJDLElBQUksR0FBRyxHQUFHO0lBQ1IsRUFBRSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3BDLEVBQUUsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxFQUFFLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDcEMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3BDLEVBQUUsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxFQUFFLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7R0FDckMsQ0FBQzs7O0VBR0YsSUFBSSxDQUFDLEdBQUcsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7SUFDbkUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7O0lBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDekMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUN0QyxDQUFDLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztNQUN0QixDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7O01BRWhELElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxFQUFFO1FBQzdCLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDO09BQ3hCOztNQUVELElBQUksZ0JBQWdCLEVBQUU7UUFDcEIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNDLENBQUMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDckQ7O01BRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQjs7SUFFRCxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO0dBQy9CLENBQUM7O0VBRUYsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDaEMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7RUFFNUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDO0VBQy9CLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0VBRS9ELElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ2hDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0VBRWhFLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ2hDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7RUFFNUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDaEMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0VBRW5GLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQzdCLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3BFLEVBQUUsQ0FBQyxDQUFDOyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICB2YXIgVmFsdWVzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vJyk7XG5cbiAgdmFyIGRvbSA9IHtcbiAgICBlMTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4LTAxJyksXG4gICAgZTI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5leC0wMicpLFxuICAgIGUzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXgtMDMnKSxcbiAgICBlNDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4LTA0JyksXG4gICAgZTU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5leC0wNScpLFxuICAgIGU2OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXgtMDYnKVxuICB9O1xuXG4gIC8vIEhlbHBlciBGdW5jdGlvblxuICB2YXIgZiA9IGZ1bmN0aW9uIChvYmosIHZhbHVlcywgc2VjdGlvbiwgY29udGFpbmVyLCBicmlnaHRuZXNzU2FtcGxlKSB7XG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGUuY2xhc3NOYW1lID0gXCJjb2xvclwiO1xuICAgICAgZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZXNbaV0uaGV4U3RyaW5nKCk7XG5cbiAgICAgIGlmICh2YWx1ZXNbaV0uaGV4ID09PSBvYmouaGV4KSB7XG4gICAgICAgIGUuY2xhc3NOYW1lICs9IFwiIG9yaWdcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGJyaWdodG5lc3NTYW1wbGUpIHtcbiAgICAgICAgdmFyIGJyaWdodG5lc3MgPSB2YWx1ZXNbaV0uZ2V0QnJpZ2h0bmVzcygpO1xuICAgICAgICBlLnRleHRDb250ZW50ID0gYnJpZ2h0bmVzcztcbiAgICAgICAgZS5zdHlsZS5jb2xvciA9IChicmlnaHRuZXNzIDwgNTApID8gXCIjZmZmXCIgOiBcIiMwMDBcIjtcbiAgICAgIH1cblxuICAgICAgZnJhZy5hcHBlbmRDaGlsZChlKTtcbiAgICB9XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoIGZyYWcgKTtcbiAgfTtcblxuICB2YXIgZXgxID0gbmV3IFZhbHVlcygnIzJlY2M3MScpO1xuICBmKGV4MSwgZXgxLmFsbCg1KSwgZG9tLmUxLCBkb20uZTEucXVlcnlTZWxlY3RvcignLmNvbG9ycycpKTtcblxuICB2YXIgZXgzID0gbmV3IFZhbHVlcygnIzliNTliNicpXG4gIGYoZXgzLCBleDMudGludHMoMTApLCBkb20uZTMsIGRvbS5lMy5xdWVyeVNlbGVjdG9yKCcuY29sb3JzJykpO1xuXG4gIHZhciBleDIgPSBuZXcgVmFsdWVzKCcjMzQ5OGRiJyk7XG4gIGYoZXgyLCBleDIuc2hhZGVzKDEwKSwgZG9tLmUyLCBkb20uZTIucXVlcnlTZWxlY3RvcignLmNvbG9ycycpKTtcblxuICB2YXIgZXg0ID0gbmV3IFZhbHVlcygnI2U3NGMzYycpO1xuICBmKGV4NCwgW2V4NF0uY29uY2F0KGV4NC50aW50KDIwKSksIGRvbS5lNCwgZG9tLmU0LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvcnMnKSk7XG5cbiAgdmFyIGV4NSA9IG5ldyBWYWx1ZXMoJyNmMWM0MGYnKTtcbiAgZihleDUsIFtleDVdLmNvbmNhdChleDUuc2hhZGUoMTApKSwgZG9tLmU1LCBkb20uZTUucXVlcnlTZWxlY3RvckFsbCgnLmNvbG9ycycpWzBdKTtcblxuICB2YXIgZXg2ID0gbmV3IFZhbHVlcygnI2VlMCcpO1xuICBmKGV4NiwgZXg2LmFsbCgxMCksIGRvbS5lNiwgZG9tLmU2LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvcnMnKSwgdHJ1ZSk7XG59KCkpO1xuIl19