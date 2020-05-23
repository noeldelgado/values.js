const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

describe('methods / shade', () => {
  it('should default to 50% shade', () => {
    const color = new Values('hsl(0 100% 50%)');
    const shade = color.shade();
    const { hex, rgb, alpha, type, weight } = shade;
    equal(hex, '800000');
    deepEqual(rgb, [128, 0, 0]);
    equal(alpha, 1);
    equal(type, 'shade');
    equal(weight, 50);
    equal(shade.hexString(), '#800000');
    equal(shade.rgbString(), 'rgb(128, 0, 0)');
  });

  it('should calculate independent shades', () => {
    const color = new Values('#00ffff');
    equal(color.shade(10).hexString(), '#00e6e6');
    equal(color.shade(20).hexString(), '#00cccc');
    equal(color.shade(30).hexString(), '#00b3b3');
    equal(color.shade(40).hexString(), '#009999');
    equal(color.shade(50).hexString(), '#008080');
    equal(color.shade(10).rgbString(), 'rgb(0, 230, 230)');
  });

  it('should include shade type', () => {
    const color = new Values('#00ffff');
    equal(color.shade().type, 'shade');
    equal(color.shade(22).type, 'shade');
  });

  it('should include shade weight', () => {
    const color = new Values('green');
    equal(color.shade(10).weight, 10);
    equal(color.shade(24).weight, 24);
    equal(color.shade(47).weight, 47);
    equal(color.shade(52).weight, 52);
    equal(color.shade(89).weight, 89);
    equal(color.shade(100).weight, 100);
  });

  it('should clip mixed results to 0..100', () => {
    const color = new Values('cyan');
    equal(color.shade(-100).hexString(), '#00ffff');
    equal(color.shade(0).hexString(), '#00ffff');
    equal(color.shade(+100).hexString(), '#000000');
    equal(color.shade(200).hexString(), '#000000');
  });

  it('should mix with opacity', () => {
    equal(new Values('rgba(0 0 255 / 0.5)').shade().hexString(), '#000040bf');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade().rgbString(), 'rgba(28, 0, 0, 0.61)');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade(10).rgbString(), 'rgba(134, 0, 0, 0.298)');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade(22).rgbString(), 'rgba(78, 0, 0, 0.3916)');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade(100).rgbString(), 'rgb(0, 0, 0)');
    equal(new Values('rgba(255 0 255 / 0.16)').shade().rgbString(), 'rgba(20, 0, 20, 0.58)');
  });
});
