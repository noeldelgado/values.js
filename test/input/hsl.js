const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

describe('input HSL', () => {
  it('new Values("hsl(0, 100%, 50%)")', () => {
    const color = new Values('hsl(0, 100%, 50%)');
    const { hex, rgb, alpha, type, weight } = color;
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
    equal(type, 'base');
    equal(weight, 0);
    equal(color.hexString(), '#ff0000');
    equal(color.rgbString(), 'rgb(255, 0, 0)');
  });

  it('new Values("hsl(-240, 100%, 50%)")', () => {
    const { hex, rgb } = new Values('hsl(-240, 100%, 50%)');
    equal(hex, '00ff00');
    deepEqual(rgb, [0, 255, 0]);
  });

  it('new Values("hsl(120, -100%, 50%)")', () => {
    const { hex, rgb } = new Values('hsl(120, -100%, 50%)');
    equal(hex, '808080');
    deepEqual(rgb, [128, 128, 128]);
  });

  it('new Values("hsl(120, 100%, -50%)")', () => {
    const { rgb, hex } = new Values('hsl(120, 100%, -50%)');
    equal(hex, '000000');
    deepEqual(rgb, [0, 0, 0]);
  });

  it('new Values("hsl(120, 200%, 50%)")', () => {
    const { rgb, hex } = new Values('hsl(120, 200%, 50%)');
    equal(hex, '00ff00');
    deepEqual(rgb, [0, 255, 0]);
  });

  it('new Values("hsl(120, 100%, 200%)")', () => {
    const { rgb, hex } = new Values('hsl(120, 100%, 200%)');
    equal(hex, 'ffffff');
    deepEqual(rgb, [255, 255, 255]);
  });

  // hsla --------------------------------------------
  it('new Values("hsla(0, 100%, 50%, 0.5)")', () => {
    const { rgb, hex, alpha } = new Values('hsla(0, 100%, 50%, 0.5)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("hsla(0, 100%, 50%, 50%)")', () => {
    const { rgb, hex, alpha } = new Values('hsla(0, 100%, 50%, 50%)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("hsla(0, 100%, 50%, 0)")', () => {
    const { rgb, hex, alpha } = new Values('hsla(0, 100%, 50%, 0)');
    equal(hex, 'ff000000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0);
  });

  it('new Values("hsla(0, 100%, 50%, 50)")', () => {
    const { rgb, hex, alpha } = new Values('hsla(0, 100%, 50%, 50)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("hsla(0, -100%, 50%, 1)")', () => {
    const { rgb, hex } = new Values('hsla(0, -100%, 50%, 1)');
    equal(hex, '808080');
    deepEqual(rgb, [128, 128, 128]);
  });

  it('new Values("hsla(0, 100%, -50%, 1)")', () => {
    const { rgb, hex } = new Values('hsla(0, 100%, -50%, 1)');
    equal(hex, '000000');
    deepEqual(rgb, [0, 0, 0]);
  });

  it('new Values("hsla(0, 100%, 50%, 200%)")', () => {
    const { rgb, hex } = new Values('hsla(0, 100%, 50%, 200%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
  });

  it('new Values("hsla(0, 100%, 50%, -200%)")', () => {
    const { rgb, hex } = new Values('hsla(0, 100%, 50%, -200%)');
    equal(hex, 'ff000000');
    deepEqual(rgb, [255, 0, 0]);
  });

  // hsl level 4 ----------------------------------------
  it('new Values("hsl(0deg 100% 50%)")', () => {
    const { rgb, hex } = new Values('hsl(0deg 100% 50%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
  });

  it('new Values("hsla(0deg 100% 50%)")', () => {
    const { rgb, hex } = new Values('hsla(0deg 100% 50%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
  });

  it('new Values("hsl(0deg -100% 50%)")', () => {
    const { rgb, hex } = new Values('hsl(0deg -100% 50%)');
    equal(hex, '808080');
    deepEqual(rgb, [128, 128, 128]);
  });

  it('new Values("hsl(0deg 100% -50%)")', () => {
    const { rgb, hex } = new Values('hsl(0deg 100% -50%)');
    equal(hex, '000000');
    deepEqual(rgb, [0, 0, 0]);
  });

  it('new Values("hsl(0deg 100% 200%)")', () => {
    const { rgb, hex } = new Values('hsl(0deg 100% 200%)');
    equal(hex, 'ffffff');
    deepEqual(rgb, [255, 255, 255]);
  });

  it('new Values("hsl(0deg 100% 50% / 100%)")', () => {
    const { rgb, hex } = new Values('hsl(0deg 100% 50% / 100%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
  });

  it('new Values("hsl(0deg 100% 50% / 1)")', () => {
    const { rgb, hex } = new Values('hsl(0deg 100% 50% / 1)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
  });

  it('new Values("hsl(0deg 100% 50% / 50%)")', () => {
    const { rgb, hex, alpha } = new Values('hsl(0deg 100% 50% / 50%)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("hsl(0deg 100% 50% / 0.5)")', () => {
    const { rgb, hex, alpha } = new Values('hsl(0deg 100% 50% / 0.5)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("hsla(0deg 100% 50% / 50)")', () => {
    const { rgb, hex, alpha } = new Values('hsla(0deg 100% 50% / 50)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("hsla(0deg 100% 50% / 200%)")', () => {
    const { rgb, hex } = new Values('hsla(0deg 100% 50% / 200%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
  });

  it('new Values("hsla(0deg 100% 50% / -200)")', () => {
    const { rgb, hex } = new Values('hsla(0deg 100% 50% / -200)');
    equal(hex, 'ff000000');
    deepEqual(rgb, [255, 0, 0]);
  });
});
