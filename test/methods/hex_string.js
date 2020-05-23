const assert = require('assert').strict;

const Values = require('../..');

const { equal } = assert;

const test = (input, output) =>
  it(`${input} -> ${output}`, () => equal(new Values(input).hexString(), output));

describe('methods / hexString', () => {
  const hex = '#ff0000';
  const hex0 = '#ff000000';
  const hex25 = '#ff000040';
  const hex50 = '#ff000080';
  const hex75 = '#ff0000bf';

  test('red', hex);

  test('#f00', hex);
  test('#f000', hex0);
  test('#ff000040', hex25);
  test('#ff000080', hex50);
  test('#ff0000bf', hex75);
  test('#f00f', hex);

  test('rgb(255 0 0)', hex);
  test('rgb(255 0 0 / 0.25)', hex25);
  test('rgb(255, 0, 0, 25%)', hex25);
  test('rgb(255 0 0 / 0.5)', hex50);
  test('rgba(255, 0, 0, 50%)', hex50);
  test('rgb(255 0 0 / 0.75)', hex75);
  test('rgb(255 0 0 / 75%)', hex75);

  test('hsl(0 100% 50%)', hex);
  test('hsl(0 100% 50% / 0.25)', hex25);
  test('hsla(0 100% 50% / 25%)', hex25);
  test('hsl(0deg 100% 50% / 0.5)', hex50);
  test('hsla(0turn, 100%, 50%, 50%)', hex50);
  test('hsl(0rad 100% 50% / 0.75)', hex75);
  test('hsl(0 100% 50% / 75%)', hex75);
});
