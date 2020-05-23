const assert = require('assert').strict;

const Values = require('../..');

const { equal, deepEqual } = assert;

const test = (keyword, h, r) => {
  it(keyword, () => {
    const color = new Values(keyword);
    const { hex, rgb, alpha } = color;
    equal(hex, h);
    deepEqual(rgb, r);
    equal(alpha, 1);
    equal(color.hexString(), `#${h}`);
  });
};

describe('keywords', () => {
  test('red', 'ff0000', [255, 0, 0]);
  test('purple', '800080', [128, 0, 128]);
  test('fuchsia', 'ff00ff', [255, 0, 255]);
  test('aliceblue', 'f0f8ff', [240, 248, 255]);
  test('blanchedalmond', 'ffebcd', [255, 235, 205]);
  test('cornflowerblue', '6495ed', [100, 149, 237]);
  test('fuchsia', 'ff00ff', [255, 0, 255]);
  test('indigo', '4b0082', [75, 0, 130]);
  test('lightgoldenrodyellow', 'fafad2', [250, 250, 210]);
  test('mediumslateblue', '7b68ee', [123, 104, 238]);
  test('springgreen', '00ff7f', [0, 255, 127]);
  test('tomato', 'ff6347', [255, 99, 71]);
  test('rebeccapurple', '663399', [102, 51, 153]);
});
