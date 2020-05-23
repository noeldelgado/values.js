const assert = require('assert').strict;

const Values = require('../..');

const { equal } = assert;

describe('values.method.tints', () => {
  const color = new Values('#00ffff');

  it('should calculate tints', () => {
    const tints = color.tints();
    equal(tints.length, 10);
    equal(tints[0].hexString(), '#19ffff');
    equal(tints[2].hexString(), '#4dffff');
    equal(tints[4].hexString(), '#80ffff');
    equal(tints[6].hexString(), '#b3ffff');
    equal(tints[8].hexString(), '#e6ffff');
    equal(tints[9].hexString(), '#ffffff');
  });

  it('should include tints weight', () => {
    const tints = color.tints();
    equal(tints[0].weight, 10);
    equal(tints[2].weight, 30);
    equal(tints[4].weight, 50);
    equal(tints[6].weight, 70);
    equal(tints[8].weight, 90);
    equal(tints[9].weight, 100);
  });
});
