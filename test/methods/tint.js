const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

describe('methods / tint', () => {
  it('should default to 50% tint', () => {
    const color = new Values('hsl(0 100% 50%)');
    const shade = color.tint();
    const { hex, rgb, alpha, type, weight } = shade;
    equal(hex, 'ff8080');
    deepEqual(rgb, [255, 128, 128]);
    equal(alpha, 1);
    equal(type, 'tint');
    equal(weight, 50);
    equal(shade.hexString(), '#ff8080');
  });

  it('should calculate independent tints', () => {
    const color = new Values('#00ffff');
    equal(color.tint(10).hexString(), '#19ffff');
    equal(color.tint(20).hexString(), '#33ffff');
    equal(color.tint(30).hexString(), '#4dffff');
    equal(color.tint(40).hexString(), '#66ffff');
    equal(color.tint(50).hexString(), '#80ffff');
    equal(color.tint(10).rgbString(), 'rgb(25, 255, 255)');
  });

  it('should include shade type', () => {
    const color = new Values('#00ffff');
    equal(color.tint().type, 'tint');
    equal(color.tint(22).type, 'tint');
  });

  it('should include tint weight', () => {
    const color = new Values('green');
    equal(color.tint(10).weight, 10);
    equal(color.tint(24).weight, 24);
    equal(color.tint(47).weight, 47);
    equal(color.tint(52).weight, 52);
    equal(color.tint(89).weight, 89);
    equal(color.tint(100).weight, 100);
  });

  it('should clip mixed results to 0..100', () => {
    const color = new Values('cyan');
    equal(color.tint(-100).hexString(), '#00ffff');
    equal(color.tint(0).hexString(), '#00ffff');
    equal(color.tint(+100).hexString(), '#ffffff');
    equal(color.tint(200).hexString(), '#ffffff');
  });

  it('should mix with opacity', () => {
    equal(new Values('rgba(0 0 255 / 0.5)').tint().hexString(), '#bfbfffbf');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint().rgbString(), 'rgba(255, 227, 227, 0.61)');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint(10).rgbString(), 'rgba(255, 121, 121, 0.298)');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint(25).rgbString(), 'rgba(255, 186, 186, 0.415)');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint(100).hexString(), '#ffffff');
    equal(new Values('rgba(255 0 255 / 0.16)').tint().rgbString(), 'rgba(255, 235, 255, 0.58)');
  });
});
