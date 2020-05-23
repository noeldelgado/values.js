const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

describe('input special cases: transparent', () => {
  it('new Values(<"transparent">)', () => {
    const color = new Values('transparent');
    const { hex, rgb, alpha, type, weight } = color;
    equal(hex, '00000000');
    deepEqual(rgb, [0, 0, 0]);
    equal(alpha, 0);
    equal(type, 'base');
    equal(weight, 0);
    equal(color.hexString(), '#00000000');
    equal(color.rgbString(), 'rgba(0, 0, 0, 0)');
  });
});
