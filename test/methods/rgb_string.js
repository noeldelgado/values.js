const assert = require('assert').strict;

const Values = require('../..');

const { equal } = assert;

const test = (input, output) =>
  it(`${input} -> ${output}`, () => equal(new Values(input).rgbString(), output));

describe('methods / rgbString', () => {
  const rgb = 'rgb(255, 0, 0)';
  const rgb0 = 'rgba(255, 0, 0, 0)';
  const rgb25 = 'rgba(255, 0, 0, 0.25)';
  const rgb50 = 'rgba(255, 0, 0, 0.5)';
  const rgb75 = 'rgba(255, 0, 0, 0.75)';

  test('red', rgb);

  test('#f00', rgb);
  test('#f000', rgb0);
  test('#ff000040', 'rgba(255, 0, 0, 0.25098039215686274)');
  test('#ff000080', 'rgba(255, 0, 0, 0.5019607843137255)');
  test('#ff0000bf', 'rgba(255, 0, 0, 0.7490196078431373)');
  test('#f00f', rgb);

  test('rgb(255 0 0)', rgb);
  test('rgba(255 0 0 / 1)', rgb);
  test('rgb(255 0 0 / 0.25)', rgb25);
  test('rgb(255 0 0 / 25%)', rgb25);
  test('rgb(255 0 0 / 0.5)', rgb50);
  test('rgb(255 0 0 / 50%)', rgb50);
  test('rgb(255 0 0 / 0.75)', rgb75);
  test('rgb(255 0 0 / 75%)', rgb75);

  test('hsl(0 100% 50%)', rgb);
  test('hsl(0 100% 50% / 1)', rgb);
  test('hsl(0, 100%, 50%, 1.0)', rgb);
  test('hsla(0, 100%, 50%, 0.25)', rgb25);
  test('hsl(0 100% 50% / 25%)', rgb25);
  test('hsl(0deg 100% 50% / 0.5)', rgb50);
  test('hsl(0turn 100% 50% / 50%)', rgb50);
  test('hsl(0rad 100% 50% / 0.75)', rgb75);
  test('hsl(0 100% 50% / 75%)', rgb75);
});
