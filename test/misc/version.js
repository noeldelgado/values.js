const assert = require('assert').strict;

const Values = require('../..');
const pkg = require('../../package.json');

const { equal, ok } = assert;

describe('version', () => {
  it('should include static prop VERSION', () => ok(Values.VERSION));
  it('version should be equal to pkg.version', () => equal(Values.VERSION, `v${pkg.version}`));
});
