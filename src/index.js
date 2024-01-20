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

const defaultNumberParam = (v, d) => (v === null || isNaN(v) || typeof v === 'string' ? d : v);

export default class Values {
  constructor(color = '#000', type = 'base', weight = 0) {
    [this.rgb, this.alpha, this.type, this.weight] = [[0, 0, 0], 1, type, weight];

    const c = color === null ? '#000' : color;
    if (typeof c !== 'string') throw new TypeError(`Input should be a string: ${c}`);

    const parsed = parse(c);
    if (!parsed) throw new Error(`Unable to parse color from string: ${c}`);
    return this[`_setFrom${parsed.type.toUpperCase()}`]([...parsed.values, parsed.alpha]);
  }

  get hex() {
    return this.hexString().replace(/^#/, '');
  }

  setColor(color) {
    const parsed = parse(color);
    if (!parsed) return null;
    return this[`_setFrom${parsed.type.toUpperCase()}`]([...parsed.values, parsed.alpha]);
  }

  tint(weight, w = defaultNumberParam(weight, 50)) {
    return new Values(`rgb(${mix('#fff', this.rgbString(), w).rgba})`, 'tint', w);
  }

  shade(weight, w = defaultNumberParam(weight, 50)) {
    return new Values(`rgb(${mix('#000', this.rgbString(), w).rgba})`, 'shade', w);
  }

  tints(weight, w = defaultNumberParam(weight, 10)) {
    return Array.from({ length: 100 / w }, (_, i) => this.tint((i + 1) * w));
  }

  shades(weight, w = defaultNumberParam(weight, 10)) {
    return Array.from({ length: 100 / w }, (_, i) => this.shade((i + 1) * w));
  }

  all(weight = 10) {
    const numberWeight = parseInt(weight)
    return [...this.tints(numberWeight).reverse(), Object.assign(this), ...this.shades(numberWeight)];
  }

  hexString() {
    return rgb2hex(this.alpha >= 1 ? this.rgb : [...this.rgb, this.alpha]);
  }

  rgbString() {
    const channels = (this.alpha >= 1 ? this.rgb : [...this.rgb, this.alpha]).join(', ');
    return `${this.alpha >= 1 ? 'rgb' : 'rgba'}(${channels})`;
  }

  getBrightness() {
    return Math.round((this.rgb.reduce((a, b) => a + b) / (255 * 3)) * 100);
  }

  _setFromRGB([r, g, b, a]) {
    [this.rgb, this.alpha] = [[r, g, b], a];
    return this;
  }

  _setFromHSL([h, s, l, a]) {
    [this.rgb, this.alpha] = [hsl2rgb([h, s, l]).map(Math.round), a];
    return this;
  }
}

Values.VERSION = '__VERSION__';
