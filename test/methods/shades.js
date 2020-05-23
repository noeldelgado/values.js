const assert = require('assert').strict;

const Values = require('../..');

const { equal } = assert;

const defaultWeight = (w) => {
  it(`${w} should default to 10% weight shades`, () => {
    const { length } = new Values('hsl(0 100% 50%)').shades(w);
    equal(length, 10);
  });
};

describe('method:shades', () => {
  defaultWeight();
  defaultWeight('');
  defaultWeight('foo');
  defaultWeight(NaN);
  defaultWeight(null);
  defaultWeight(undefined); // eslint-disable-line no-undefined

  it('should calculate shades', () => {
    const shades = new Values('#00ffff').shades();
    equal(shades.length, 10);
    equal(shades[0].hexString(), '#00e6e6');
    equal(shades[2].hexString(), '#00b3b3');
    equal(shades[4].hexString(), '#008080');
    equal(shades[6].hexString(), '#004d4d');
    equal(shades[8].hexString(), '#001919');
    equal(shades[9].hexString(), '#000000');
  });

  it('should include shades weight', () => {
    const shades = new Values('#00ffff').shades();
    assert.equal(shades[0].weight, 10);
    assert.equal(shades[2].weight, 30);
    assert.equal(shades[4].weight, 50);
    assert.equal(shades[6].weight, 70);
    assert.equal(shades[8].weight, 90);
    assert.equal(shades[9].weight, 100);
  });
});
