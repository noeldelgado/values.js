const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

describe('input / hex', () => {
  // it('new Values(0xFF0000)', () => {
  //   const color = new Values(0xFF0000)
  //   equal(color.hex, 'f00')
  //   deepEqual(color.rgb, { r: 255, g: 0, b: 0 })
  //   deepEqual(color.hsl, { h: 0, s: 100, l: 50 })
  // })

  it('new Values("#00f")', () => {
    const color = new Values('#00f');
    const { hex, rgb, alpha, type, weight } = color;
    equal(hex, '0000ff');
    deepEqual(rgb, [0, 0, 255]);
    equal(alpha, 1);
    equal(type, 'base');
    equal(weight, 0);
    equal(color.hexString(), '#0000ff');
    equal(color.rgbString(), 'rgb(0, 0, 255)');
  });

  it('new Values("#00ff")', () => {
    const color = new Values('#00ff');
    const { hex, rgb, alpha, type, weight } = color;
    equal(hex, '0000ff');
    deepEqual(rgb, [0, 0, 255]);
    equal(alpha, 1);
    equal(type, 'base');
    equal(weight, 0);
    equal(color.hexString(), '#0000ff');
    equal(color.rgbString(), 'rgb(0, 0, 255)');
  });

  it('new Values("#00f8")', () => {
    const color = new Values('#00f8');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 0.5333333333333333);
    equal(color.hexString(), '#0000ff88');
  });

  it('new Values("#0000ff")', () => {
    const color = new Values('#0000ff');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#0000ff');
  });

  it('new Values("#0000ffff")', () => {
    const color = new Values('#0000ffff');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#0000ff');
  });

  it('new Values("#0000ff80")', () => {
    const color = new Values('#0000ff80');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 0.5019607843137255);
    equal(color.hexString(), '#0000ff80');
  });

  it('new Values("#0000ff00")', () => {
    const { rgb, alpha } = new Values('#0000ff00');
    // equal(hex, '0000ff');
    // deepEqual(rgb, { r: 0, g: 0, b: 255 });
    deepEqual(rgb, [0, 0, 255]);
    // deepEqual(hsl, { h: 240, s: 100, l: 50 });
    equal(alpha, 0);
  });
});
