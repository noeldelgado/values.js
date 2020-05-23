const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual, ok } = assert;

const setDefaultValue = (input) => {
  const color = new Values(input);
  const { hex, rgb, alpha, type, weight } = color;
  it('should set default value #000', () => {
    ok(color instanceof Values);
    equal(hex, '000000');
    deepEqual(rgb, [0, 0, 0]);
    equal(alpha, 1);
    equal(type, 'base');
    equal(weight, 0);
    equal(color.hexString(), '#000000');
    equal(color.rgbString(), 'rgb(0, 0, 0)');
  });
};

describe('input / use default', () => {
  describe('new Values(<empty>)', () => setDefaultValue());
  describe('new Values(<null>)', () => setDefaultValue(null));
  describe('new Values(<undefined>)', () => setDefaultValue(undefined)); // eslint-disable-line no-undefined
});
