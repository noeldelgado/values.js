const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;
const { round } = Math;

describe('methods / all', () => {
  const color = new Values('#00ffff');

  describe('default weight 10', () => {
    const all = color.all();
    const { length } = all;

    it('should get all', () => {
      const { 0: first, [round(length / 2) - 1]: middle, [length - 1]: last } = all;

      equal(length, 21);

      let { hex, rgb, alpha, type, weight } = first;
      equal(hex, 'ffffff');
      deepEqual(rgb, [255, 255, 255]);
      equal(alpha, 1);
      equal(type, 'tint');
      equal(weight, 100);
      equal(first.hexString(), '#ffffff');
      equal(first.rgbString(), 'rgb(255, 255, 255)');

      ({ hex, rgb, alpha, type, weight } = middle);
      equal(hex, '00ffff');
      deepEqual(rgb, [0, 255, 255]);
      equal(alpha, 1);
      equal(type, 'base');
      equal(weight, 0);
      equal(middle.hexString(), '#00ffff');
      equal(middle.rgbString(), 'rgb(0, 255, 255)');

      ({ hex, rgb, alpha, type, weight } = last);
      equal(hex, '000000');
      deepEqual(rgb, [0, 0, 0]);
      equal(alpha, 1);
      equal(type, 'shade');
      equal(weight, 100);
      equal(last.hexString(), '#000000');
      equal(last.rgbString(), 'rgb(0, 0, 0)');
    });

    it('tints should be of type "tint"', () => {
      const start = 0;
      const end = round(length / 2 - 1);
      for (let i = start; i < end; i++) equal(all[i].type, 'tint');
    });

    it('base color should be of type "base"', () => {
      // get the base color, located in the middle of the array
      const index = round(length / 2 - 1);
      equal(all[index].type, 'base');
    });

    it('shades should be of type "shade"', () => {
      const start = round(length / 2);
      const end = all.length;
      for (let i = start; i < end; i++) equal(all[i].type, 'shade');
    });
  });
});
