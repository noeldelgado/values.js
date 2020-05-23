const assert = require('assert').strict;

const Values = require('../..');

const { equal } = assert;

describe('methods / getBrightness', () => {
  const color = new Values('#00ffff');

  it('should return brightness', () => {
    equal(color.getBrightness(), 67);
  });
});
