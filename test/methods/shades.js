const assert = require('assert').strict;

const Values = require('../..');

const { equal } = assert;

describe('method:shades', () => {
  const color = new Values('#00ffff');

  it('should calculate shades', () => {
    const shades = color.shades();
    equal(shades.length, 10);
    equal(shades[0].hexString(), '#00e6e6');
    equal(shades[2].hexString(), '#00b3b3');
    equal(shades[4].hexString(), '#008080');
    equal(shades[6].hexString(), '#004d4d');
    equal(shades[8].hexString(), '#001919');
    equal(shades[9].hexString(), '#000000');
  });

  it('should include shades weight', () => {
    const shades = color.shades();
    assert.equal(shades[0].weight, 10);
    assert.equal(shades[2].weight, 30);
    assert.equal(shades[4].weight, 50);
    assert.equal(shades[6].weight, 70);
    assert.equal(shades[8].weight, 90);
    assert.equal(shades[9].weight, 100);
  });
});
