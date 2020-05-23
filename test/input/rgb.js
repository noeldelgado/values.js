const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

describe('input RGB', () => {
  it('new Values("rgb(255, 0, 0)")', () => {
    const color = new Values('rgb(255, 0, 0)');
    deepEqual(color.rgb, [255, 0, 0]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#ff0000');
  });

  it('new Values("rgb(100%, 0%, 0%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100%, 0%, 0%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(200%, 0%, 0%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(200%, 0%, 0%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, -10%, 0%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100%, -10%, 0%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, 0%, -10%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100%, 0%, -10%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, 101%, 0%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100%, 101%, 0%)');
    equal(hex, 'ffff00');
    deepEqual(rgb, [255, 255, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, 0%, 200%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100%, 0%, 200%)');
    equal(hex, 'ff00ff');
    deepEqual(rgb, [255, 0, 255]);
    equal(alpha, 1);
  });

  it('new Values("rgb(500, 0, 0)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(500, 0, 0)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(255, 500, 0)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255, 500, 0)');
    equal(hex, 'ffff00');
    deepEqual(rgb, [255, 255, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(255, 0, 500)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255, 0, 500)');
    equal(hex, 'ff00ff');
    deepEqual(rgb, [255, 0, 255]);
    equal(alpha, 1);
  });

  it('new Values("rgb(-255, 0, 500)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(-255, 0, 500)');
    equal(hex, '0000ff');
    deepEqual(rgb, [0, 0, 255]);
    equal(alpha, 1);
  });

  it('new Values("rgb(0, -2, 500)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(0, -2, 500)');
    equal(hex, '0000ff');
    deepEqual(rgb, [0, 0, 255]);
    equal(alpha, 1);
  });

  it('new Values("rgb(255, 0, -500)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255, 0, -500)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgba(255, 0, 0, 0.5)")', () => {
    const { hex, rgb, alpha } = new Values('rgba(255, 0, 0, 0.5)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgba(255, 0, 0, 50%)")', () => {
    const { hex, rgb, alpha } = new Values('rgba(255, 0, 0, 50%)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgba(100%, 0%, 0%, 50%)")', () => {
    const { hex, rgb, alpha } = new Values('rgba(100%, 0%, 0%, 50%)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgba(100%, 0%, 0%, 0.5)")', () => {
    const { hex, rgb, alpha } = new Values('rgba(100%, 0%, 0%, 0.5)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgb(255 0 0)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255 0 0)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(255 0 0 / 100%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255 0 0 / 100%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(255 0 0 / 50%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255 0 0 / 50%)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgb(255 0 0 / 0%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255 0 0 / 0%)');
    equal(hex, 'ff000000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0);
  });

  it('new Values("rgb(255 0 0 / 0)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255 0 0 / 0)');
    equal(hex, 'ff000000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0);
  });

  it('new Values("rgb(255 0 0 / 0.5)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255 0 0 / 0.5)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgb(255 0 0 / 1)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(255 0 0 / 1)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(100% 0% 0% / 100%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100% 0% 0% / 100%)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(100% 0% 0% / 50%)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100% 0% 0% / 50%)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgb(100% 0% 0% / 1)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100% 0% 0% / 1)');
    equal(hex, 'ff0000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 1);
  });

  it('new Values("rgb(100% 0% 0% / 0.5)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100% 0% 0% / 0.5)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgb(100% 0% 0% / 0)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100% 0% 0% / 0)');
    equal(hex, 'ff000000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0);
  });

  it('new Values("rgb(200% 0% 0% / 0)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(200% 0% 0% / 0)');
    equal(hex, 'ff000000');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0);
  });

  it('new Values("rgb(200% 200% 0% / 0.5)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(200% 200% 0% / 0.5)');
    equal(hex, 'ffff0080');
    deepEqual(rgb, [255, 255, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgb(100% 0% 101% / 1)")', () => {
    const { hex, rgb, alpha } = new Values('rgb(100% 0% 101% / 1)');
    equal(hex, 'ff00ff');
    deepEqual(rgb, [255, 0, 255]);
    equal(alpha, 1);
  });

  it('new Values("rgba(255 0 0 / 50%)")', () => {
    const { hex, rgb, alpha } = new Values('rgba(255 0 0  / 50%)');
    equal(hex, 'ff000080');
    deepEqual(rgb, [255, 0, 0]);
    equal(alpha, 0.5);
  });

  it('new Values("rgba(255 500 0 / 25%)")', () => {
    const { hex, rgb, alpha } = new Values('rgba(255 500 0  / 25%)');
    equal(hex, 'ffff0040');
    deepEqual(rgb, [255, 255, 0]);
    equal(alpha, 0.25);
  });
});
