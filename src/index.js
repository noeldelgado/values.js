/**
 * values.js - Get the tints and shades of a color
 * @version __VERSION__
 * @link http://noeldelgado.github.io/values.js/
 * @license MIT
 */
import mix from 'mix-css-color';
import parse from 'parse-css-color';
import hsl2rgb from 'pure-color/convert/hsl2rgb';
import rgb2hex from 'pure-color/convert/rgb2hex';

export default class Values {
  constructor(color = '#000', type = 'base', weight = 0) {
    const c = color === null ? '#000' : color;
    [this.rgb, this.alpha, this.type, this.weight] = [[0, 0, 0], 1, type, weight];
    this.setColor(c);
  }

  get hex() {
    return this.hexString().replace(/^#/, '');
  }

  setColor(color) {
    if (typeof color !== 'string') throw new TypeError(`Input should be a string: ${color}`);

    try {
      const { type, values, alpha } = parse(color);
      return this[`_setFrom${type.toUpperCase()}`]([...values, alpha]);
    } catch (err) {
      throw new Error(`Unable to parse color from string: ${color}`);
    }
  }

  tint(weight = 50) {
    return new Values(`rgb(${mix('#fff', this.rgbaString(), weight).rgba})`, 'tint', weight);
  }

  shade(weight = 50) {
    return new Values(`rgb(${mix('#000', this.rgbaString(), weight).rgba})`, 'shade', weight);
  }

  tints(weight = 10) {
    return Array.from({ length: 100 / weight }, (_, i) => this.tint((i + 1) * weight));
  }

  shades(weight = 10) {
    return Array.from({ length: 100 / weight }, (_, i) => this.shade((i + 1) * weight));
  }

  all(weight = 10) {
    return [...this.tints(weight).reverse(), Object.assign(this), ...this.shades(weight)];
  }

  hexString() {
    return rgb2hex(this.alpha >= 1 ? this.rgb : [...this.rgb, this.alpha]);
  }

  rgbaString() {
    return `rgba(${this.rgb.join(', ')}, ${this.alpha})`;
  }

  getBrightness() {
    return Math.round((this.rgb.reduce((a, b) => a + b) / (255 * 3)) * 100);
  }

  _setFromRGB([r, g, b, a]) {
    [this.rgb, this.alpha] = [[r, g, b], a];
    return this;
  }

  _setFromHSL([h, s, l, a]) {
    const [r, g, b] = hsl2rgb([h, s, l]).map(Math.round);
    [this.rgb, this.alpha] = [[r, g, b], a];
    return this;
  }
}

Values.VERSION = '__VERSION__';
