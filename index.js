/**
 * values.js - Get the tints and shades of a color
 * @version v1.1.0
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

      var value = new Values(Utils.RGBtoHEX(r, g, b));
      value.percentage = percentage;

      return value;
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
    var i = percentage = (percentage || 10)
      , tints = []
      , tint;

    while (i <= 100) {
      tint = this.tint(i);
      tint.isTint = true;
      tints.push(tint);
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
    var i = percentage = (percentage || 10), shades = [];

    while (i <= 100) {
      shade = this.shade(i);
      shade.isShade = true;
      shades.push(shade);
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

    tints.push(Object.assign(this, { isBaseColor: true }));
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

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Values;
  } else {window.Values = Values;}
})();
