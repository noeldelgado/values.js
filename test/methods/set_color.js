const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

const test = (str) => {
  const color = new Values('#bada55').setColor(str);
  let { hex, rgb, alpha, type, weight } = color;

  it(`${str}`, () => {
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
    equal(type, 'base');
    equal(weight, 0);
    equal(color.hexString(), '#ff0000');
    equal(color.rgbString(), 'rgb(255, 0, 0)');
  });

  it(`should calc 50% tint based on ${str}`, () => {
    const tint = color.tint();
    ({ hex, rgb, alpha, type, weight } = tint);
    equal(hex, 'ff8080');
    deepEqual(rgb, [255, 128, 128]);
    equal(alpha, 1);
    equal(type, 'tint');
    equal(weight, 50);
    equal(tint.hexString(), '#ff8080');
    equal(tint.rgbString(), 'rgb(255, 128, 128)');
  });

  it(`should calc 50% shade based on ${str}`, () => {
    const shade = color.shade();
    ({ hex, rgb, alpha, type, weight } = shade);
    equal(hex, '800000');
    deepEqual(rgb, [128, 0, 0]);
    equal(alpha, 1);
    equal(type, 'shade');
    equal(weight, 50);
    equal(shade.hexString(), '#800000');
    equal(shade.rgbString(), 'rgb(128, 0, 0)');
  });
};

describe('methods / setColor', () => {
  test('red');
  test('#f00');
  test('rgb(255 0 0)');
  test('rgb(255 0 0 / 1)');
  test('rgba(255, 0, 0, 1)');
  test('rgba(255, 0, 0, 100%)');
  test('hsl(0 100% 50%)');
  test('hsl(0 100% 50% / 1.0)');
  test('hsl(0 100% 50% / 5.0)');
  test('hsl(0, 100%, 50%, 100%)');
  test('hsl(0, 100%, 50%, 500%)');
  test('hsla(0, 100%, 50%, 1)');

  it('should return null for not recognized input', () => {
    equal(new Values('red').setColor(), null);
    equal(new Values('red').setColor(null), null);
    equal(new Values('red').setColor(undefined), null); // eslint-disable-line no-undefined
    equal(new Values('red').setColor('lkajsf'), null);
    equal(new Values('red').setColor('255 255 255'), null);
    equal(new Values('red').setColor('rgb()'), null);
    equal(new Values('red').setColor('hsl()'), null);
  });
});
